// MIT License
class WebLabsElement {
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
function State(initial) {
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
function $(callback, ...states) {
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
function When(condition, if_true, if_false) {
    if (condition) {
        return if_true;
    }
    else {
        return if_false;
    }
}
async function onLoad(callback, ...dependency) {
    callback();
    dependency.forEach(state => {
        state.onUpdate(callback);
    });
}
function render(id, app) {
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
function Url(base_url, callback) {
    //the element to be called
    return {
        //@ts-ignore
        url: base_url,
        callBack: callback
    };
}
function AppRouter(base_url, ...urlNodes) {
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
function AppNavigator(base_url, ...data) {
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
} // MIT License
// Copyright (c) 2023 Mayukh Chakraborty
// Permission is hereby granted, free of charge, to any person obtaining a copy
// of this software and associated documentation files (the "Software"), to deal
// in the Software without restriction, including without limitation the rights
// to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
// copies of the Software, and to permit persons to whom the Software is
// furnished to do so, subject to the following conditions:
// The above copyright notice and this permission notice shall be included in all
// copies or substantial portions of the Software.
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
// AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
// LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
// OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
// SOFTWARE.
function a(...children) {
    return new WebLabsElement("a", ...children);
}
function abbr(...children) {
    return new WebLabsElement("abbr", ...children);
}
function acronym(...children) {
    return new WebLabsElement("acronym", ...children);
}
function address(...children) {
    return new WebLabsElement("address", ...children);
}
function applet(...children) {
    return new WebLabsElement("applet", ...children);
}
function area(...children) {
    return new WebLabsElement("area", ...children);
}
function article(...children) {
    return new WebLabsElement("article", ...children);
}
function aside(...children) {
    return new WebLabsElement("aside", ...children);
}
function audio(...children) {
    return new WebLabsElement("audio", ...children);
}
function b(...children) {
    return new WebLabsElement("b", ...children);
}
function base(...children) {
    return new WebLabsElement("base", ...children);
}
function basefont(...children) {
    return new WebLabsElement("basefont", ...children);
}
function bdi(...children) {
    return new WebLabsElement("bdi", ...children);
}
function bdo(...children) {
    return new WebLabsElement("bdo", ...children);
}
function big(...children) {
    return new WebLabsElement("big", ...children);
}
function blockquote(...children) {
    return new WebLabsElement("blockquote", ...children);
}
function body(...children) {
    return new WebLabsElement("body", ...children);
}
function br() {
    return new WebLabsElement("br");
}
function button(...children) {
    return new WebLabsElement("button", ...children);
}
function canvas(...children) {
    return new WebLabsElement("canvas", ...children);
}
function caption(...children) {
    return new WebLabsElement("caption", ...children);
}
function center(...children) {
    return new WebLabsElement("center", ...children);
}
function cite(...children) {
    return new WebLabsElement("cite", ...children);
}
function code(...children) {
    return new WebLabsElement("code", ...children);
}
function col(...children) {
    return new WebLabsElement("col", ...children);
}
function colgroup(...children) {
    return new WebLabsElement("colgroup", ...children);
}
function datalist(...children) {
    return new WebLabsElement("datalist", ...children);
}
function dd(...children) {
    return new WebLabsElement("dd", ...children);
}
function del(...children) {
    return new WebLabsElement("del", ...children);
}
function details(...children) {
    return new WebLabsElement("details", ...children);
}
function dfn(...children) {
    return new WebLabsElement("dfn", ...children);
}
function dialog(...children) {
    return new WebLabsElement("dialog", ...children);
}
function dir(...children) {
    return new WebLabsElement("dir", ...children);
}
function div(...children) {
    return new WebLabsElement("div", ...children);
}
function dl(...children) {
    return new WebLabsElement("dl", ...children);
}
function dt(...children) {
    return new WebLabsElement("dt", ...children);
}
function em(...children) {
    return new WebLabsElement("em", ...children);
}
function embed(...children) {
    return new WebLabsElement("embed", ...children);
}
function fieldset(...children) {
    return new WebLabsElement("fieldset", ...children);
}
function figcaption(...children) {
    return new WebLabsElement("figcaption", ...children);
}
function figure(...children) {
    return new WebLabsElement("figure", ...children);
}
function font(...children) {
    return new WebLabsElement("font", ...children);
}
function footer(...children) {
    return new WebLabsElement("footer", ...children);
}
function form(...children) {
    return new WebLabsElement("form", ...children);
}
function frame(...children) {
    return new WebLabsElement("frame", ...children);
}
function frameset(...children) {
    return new WebLabsElement("frameset", ...children);
}
function h1(...children) {
    return new WebLabsElement("h1", ...children);
}
function h2(...children) {
    return new WebLabsElement("h2", ...children);
}
function h3(...children) {
    return new WebLabsElement("h3", ...children);
}
function h4(...children) {
    return new WebLabsElement("h4", ...children);
}
function h5(...children) {
    return new WebLabsElement("h5", ...children);
}
function h6(...children) {
    return new WebLabsElement("h6", ...children);
}
function head(...children) {
    return new WebLabsElement("head", ...children);
}
function header(...children) {
    return new WebLabsElement("header", ...children);
}
function hr() {
    return new WebLabsElement("hr");
}
function html(...children) {
    return new WebLabsElement("html", ...children);
}
function i() {
    return new WebLabsElement("i");
}
function iframe(...children) {
    return new WebLabsElement("iframe", ...children);
}
function img(...children) {
    return new WebLabsElement("img", ...children);
}
function input(...children) {
    return new WebLabsElement("input", ...children);
}
function ins(...children) {
    return new WebLabsElement("ins", ...children);
}
function kbd(...children) {
    return new WebLabsElement("kbd", ...children);
}
function keygen(...children) {
    return new WebLabsElement("keygen", ...children);
}
function label(...children) {
    return new WebLabsElement("label", ...children);
}
function legend(...children) {
    return new WebLabsElement("legend", ...children);
}
function li(...children) {
    return new WebLabsElement("li", ...children);
}
function link(...children) {
    return new WebLabsElement("link", ...children);
}
function main(...children) {
    return new WebLabsElement("main", ...children);
}
function map(...children) {
    return new WebLabsElement("map", ...children);
}
function mark(...children) {
    return new WebLabsElement("mark", ...children);
}
function menu(...children) {
    return new WebLabsElement("menu", ...children);
}
function menuitem(...children) {
    return new WebLabsElement("menuitem", ...children);
}
function meta(...children) {
    return new WebLabsElement("meta", ...children);
}
function meter(...children) {
    return new WebLabsElement("meter", ...children);
}
function nav(...children) {
    return new WebLabsElement("nav", ...children);
}
function noframes(...children) {
    return new WebLabsElement("noframes", ...children);
}
function noscript(...children) {
    return new WebLabsElement("noscript", ...children);
}
function object(...children) {
    return new WebLabsElement("object", ...children);
}
function ol(...children) {
    return new WebLabsElement("ol", ...children);
}
function optgroup(...children) {
    return new WebLabsElement("optgroup", ...children);
}
function option(...children) {
    return new WebLabsElement("option", ...children);
}
function output(...children) {
    return new WebLabsElement("output", ...children);
}
function p(...children) {
    return new WebLabsElement("p", ...children);
}
function param(...children) {
    return new WebLabsElement("param", ...children);
}
function picture(...children) {
    return new WebLabsElement("picture", ...children);
}
function pre(...children) {
    return new WebLabsElement("pre", ...children);
}
function progress(...children) {
    return new WebLabsElement("progress", ...children);
}
function q(...children) {
    return new WebLabsElement("q", ...children);
}
function rp(...children) {
    return new WebLabsElement("rp", ...children);
}
function rt(...children) {
    return new WebLabsElement("rt", ...children);
}
function ruby(...children) {
    return new WebLabsElement("ruby", ...children);
}
function s(...children) {
    return new WebLabsElement("s", ...children);
}
function samp(...children) {
    return new WebLabsElement("samp", ...children);
}
function script(...children) {
    return new WebLabsElement("script", ...children);
}
function section(...children) {
    return new WebLabsElement("section", ...children);
}
function select(...children) {
    return new WebLabsElement("select", ...children);
}
function small(...children) {
    return new WebLabsElement("small", ...children);
}
function source(...children) {
    return new WebLabsElement("source", ...children);
}
function span(...children) {
    return new WebLabsElement("span", ...children);
}
function strike(...children) {
    return new WebLabsElement("strike", ...children);
}
function strong(...children) {
    return new WebLabsElement("strong", ...children);
}
function style(...children) {
    return new WebLabsElement("style", ...children);
}
function sub(...children) {
    return new WebLabsElement("sub", ...children);
}
function summary(...children) {
    return new WebLabsElement("summary", ...children);
}
function sup(...children) {
    return new WebLabsElement("sup", ...children);
}
function table(...children) {
    return new WebLabsElement("table", ...children);
}
function tbody(...children) {
    return new WebLabsElement("tbody", ...children);
}
function td(...children) {
    return new WebLabsElement("td", ...children);
}
function template(...children) {
    return new WebLabsElement("template", ...children);
}
function textarea(...children) {
    return new WebLabsElement("textarea", ...children);
}
function tfoot(...children) {
    return new WebLabsElement("tfoot", ...children);
}
function th(...children) {
    return new WebLabsElement("th", ...children);
}
function thead(...children) {
    return new WebLabsElement("thead", ...children);
}
function time(...children) {
    return new WebLabsElement("time", ...children);
}
function title(...children) {
    return new WebLabsElement("title", ...children);
}
function tr(...children) {
    return new WebLabsElement("tr", ...children);
}
function track(...children) {
    return new WebLabsElement("track", ...children);
}
function tt(...children) {
    return new WebLabsElement("tt", ...children);
}
function u(...children) {
    return new WebLabsElement("u", ...children);
}
function ul(...children) {
    return new WebLabsElement("ul", ...children);
}
function Var(...children) {
    return new WebLabsElement("var", ...children);
}
function video(...children) {
    return new WebLabsElement("video", ...children);
}
function wbr(...children) {
    return new WebLabsElement("wbr", ...children);
}
