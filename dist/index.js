// MIT License
export class WebLabsElement {
    coreElement;
    constructor(HTMLTag, ...children) {
        this.coreElement = document.createElement(HTMLTag);
        children.forEach((child) => {
            if (typeof (child) == "string" || typeof (child) == "number") {
                this.coreElement.appendChild(document.createTextNode(`${child}`));
            }
            else {
                this.coreElement.appendChild(
                //@ts-ignore
                child.coreElement);
            }
        });
    }
    id(Id) {
        this.coreElement.id = Id;
        return this;
    }
    class(...classnames) {
        classnames.forEach((classname) => {
            if (classname != "") {
                this.coreElement.classList.add(...classname.split(" "));
            }
        });
        return this;
    }
    prop(name, value) {
        this.coreElement.setAttribute(name, value);
        return this;
    }
    event(name, callback) {
        this.coreElement.addEventListener(name, (e) => callback(e));
        return this;
    }
    //adding reference to itself (basically binding itself to a state)
    ref(state) {
        state.set(this.coreElement);
        return this;
    }
    onRemove(callback) {
        //a custom object _WebLabs_remove_api to simply detect if
        //this particular node was removed or not. It is as
        //simple as that
        //@ts-ignore
        this.coreElement._WebLabs_remove_api = callback;
        return this;
    }
}
export function State(initial) {
    var data = initial;
    var updateCandidates = [];
    var subscriptions = {
        get: [], set: [], onupdate: []
    };
    function get() {
        subscriptions.get.forEach(callback => callback(data));
        return data;
    }
    function set(newstore) {
        subscriptions.set.forEach(callback => {
            if (callback(data) == true) {
                data = newstore;
            }
        });
        updateCandidates.forEach(callback => callback());
    }
    function onUpdate(callback) {
        subscriptions.onupdate.forEach(callback => callback(data));
        updateCandidates.push(callback);
    }
    function subscribe(event, callback) {
        switch (event) {
            case "get":
                subscriptions.get.push(callback);
                break;
            case "set":
                subscriptions.set.push(callback);
                break;
            case "onupdate":
                subscriptions.onupdate.push(callback);
                break;
        }
    }
    function value() {
        return $(() => new WebLabsElement("span", `${get()}`), {
            get, set, onUpdate, value, subscribe
        });
    }
    return {
        get,
        set,
        onUpdate,
        value,
        subscribe
    };
}
/**
  * New jquery-like definition for parts of UI
  * that changes due to change of state.
  *
  * The updated version does not even adds a new
  * div, which was a problem in the preview beta
  * and it helps reduce the tree problem.
  *
  * Try to keep inputs outside of stateful rendering
  * to create a performant app
*/
export function $(callback, ...states) {
    //using the callback's UI definition instead of
    //creating a new one to improve space and performance
    var data = callback();
    /**
     * This one exploits the updateCandidates, since callbacks
     * will be re-executed whenever the corresponding states
     * are updated
     */
    states.forEach((State) => {
        State.onUpdate(() => {
            //We need the HTML part, so instead of replacing the
            //node (which is very inefficient)
            data.coreElement.innerHTML = callback().coreElement.outerHTML;
        });
    });
    return data;
}
export function When(condition, if_true, if_false) {
    if (condition) {
        return if_true;
    }
    else {
        return if_false;
    }
}
export async function onLoad(callback, ...dependency) {
    callback();
    dependency.forEach(state => {
        state.onUpdate(callback);
    });
}
export function render(id, app) {
    //@ts-ignore
    document.getElementById(id)
        .replaceChildren(app.coreElement); //make sure the App returns a valid HTML Element
    new MutationObserver((mutations) => {
        Object.keys(mutations).forEach(i => {
            //@ts-ignore
            mutations[i].removedNodes.forEach((node) => {
                if (node._WebLabs_remove_api != undefined) {
                    node._WebLabs_remove_api();
                }
            });
        });
    }).observe(app.coreElement, { childList: true, subtree: true });
}
export function Url(base_url, callback) {
    //the element to be called
    return {
        //@ts-ignore
        url: base_url,
        callBack: callback
    };
}
export function AppRouter(base_url, ...urlNodes) {
    //this is useful for many purposes
    //the URLNodes are the functions that possess the WeblabsURL data
    //return whatever the current url is.
    var routerElement = new WebLabsElement("div");
    let currentPath = window.location.pathname;
    //update the path during initialization
    urlNodes.forEach(node => {
        //@ts-ignore
        if (currentPath == `${base_url}${node.url}`) {
            if (window.history.state) {
                //@ts-ignore
                routerElement.coreElement.replaceChildren(node.callBack(...window.history.state.data).coreElement);
            }
            else {
                //@ts-ignore
                routerElement.coreElement.replaceChildren(node.callBack().coreElement);
            }
        }
    });
    //let's also add some event Listners in Case we
    //want to listen to back track events
    function CallBack() {
        //now do the same thing
        urlNodes.forEach(node => {
            //@ts-ignore
            if (window.location.pathname == `${base_url}${node.url}`) {
                if (window.history.state) {
                    //@ts-ignore
                    routerElement.coreElement.replaceChildren(node.callBack(...window.history.state.data).coreElement);
                }
                else {
                    //@ts-ignore
                    routerElement.coreElement.replaceChildren(node.callBack().coreElement);
                }
            }
        });
    }
    //this one is used to track the non-native page transition
    //or the AppNavigate events
    window.addEventListener("popstate", CallBack);
    window.addEventListener("urlchange", CallBack); //a new custom event
    //now remove the event listner, when not in Need, because
    //ofcourse why would you even need when the component is out of scope
    //@ts-ignore
    routerElement._bolt_remove_api = () => {
        window.removeEventListener("popstate", CallBack);
        window.removeEventListener("urlchange", CallBack);
    };
    return routerElement;
}
export function AppNavigator(base_url, ...data) {
    if (base_url == window.location.pathname) {
        //depends, like if the data was not same?
        if (data.length = 0) {
            return; //if there is no data, means a static transition
        }
    }
    window.history.pushState({ url: base_url, data }, "", base_url);
    //Now we will trigger some other type of event, a custom
    //event that might contain some functions that could
    //change the state
    window.dispatchEvent(new Event('urlchange'));
    //this event is used to say that the page was changed
    //wihtout really reloading the app entierely.
    //This is performant if you have no SSR requirements
}
