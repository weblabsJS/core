// MIT License

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

type WebLabsChild = WebLabsElement | String | string | number
type state = {
    get: Function,
    set: Function,
    onUpdate: Function,
    value: Function,
    subscribe: (event: subscriptionEvent, callBack: Function) => void
}

type StatefulType = state

type subscriptionEvent = "set" | "get" | "onupdate"
 
class WebLabsElement {
    coreElement: HTMLElement
    constructor(HTMLTag: string, ...children: WebLabsChild[]) {
        this.coreElement = document.createElement(HTMLTag)
        children.forEach((child: WebLabsChild) => {
 
            if ( typeof(child) == "string" || typeof(child) == "number" ) {
                this.coreElement.appendChild(
                    document.createTextNode(`${child}`)
                )
            } else {
                this.coreElement.appendChild(
                    //@ts-ignore
                    child.coreElement
                )
            }
 
        })
    }
 
    id(Id: string) {
        this.coreElement.id = Id
        return this
    }
 
    class(...classnames: string[]) {
 
        classnames.forEach((classname: string) => {
            if ( classname != "" ) {
                this.coreElement.classList.add(...classname.split(" "))
            }
        })
 
        return this
 
    }
 
    prop(name: string, value: string) {
        this.coreElement.setAttribute(name, value)
        return this
    }
 
    event(name: string, callback: Function) {
        this.coreElement.addEventListener(name, (e) => callback(e))
        return this
    }

    //adding reference to itself (basically binding itself to a state)
    ref(state: state) {
        state.set(this.coreElement)
        return this
    }
 
    onRemove(callback: Function) {
        //a custom object _WebLabs_remove_api to simply detect if
        //this particular node was removed or not. It is as
        //simple as that
        //@ts-ignore
        this.coreElement._WebLabs_remove_api = callback
        return this
    }
 
}

function State<StoreType>(initial?: StoreType): state {
 
    var data: StoreType | undefined = initial
    var updateCandidates: Function[] = []
    var subscriptions: {
        set: Function[],
        get: Function[],
        onupdate: Function[]
    } = {
        get: [], set: [], onupdate: []
    }
    
    function get(): StoreType | undefined {
        subscriptions.get.forEach(callback => callback(data))
        return data
    }
 
    function set(newstore?: StoreType) {
        subscriptions.set.forEach(callback => {
            if (callback(data) == true) {
                data = newstore
            }
        })
        updateCandidates.forEach(callback => callback())
    }
 
    function onUpdate(callback: Function) {
        subscriptions.onupdate.forEach(callback => callback(data))
        updateCandidates.push(callback)
    }

    function subscribe(event: subscriptionEvent, callback: Function) {
        switch(event) {
            case "get":
                subscriptions.get.push(callback)
                break
            case "set":
                subscriptions.set.push(callback)
                break
            case "onupdate":
                subscriptions.onupdate.push(callback)
                break
        }
    }

    function value() {
        return $(() => new WebLabsElement("span", `${get()}`), {
            get, set, onUpdate, value, subscribe
        })
    }

    return {
        get,
        set,
        onUpdate,
        value,
        subscribe
    }
 
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

function $(callback: Function, ...states: StatefulType[]) {
 
     //using the callback's UI definition instead of
     //creating a new one to improve space and performance
    var data = callback()
 
     /**
      * This one exploits the updateCandidates, since callbacks
      * will be re-executed whenever the corresponding states
      * are updated
      */
    states.forEach((State: StatefulType) => {
         State.onUpdate(() => {
 
             //We need the HTML part, so instead of replacing the
             //node (which is very inefficient)
             data.coreElement.innerHTML = callback().coreElement.outerHTML
 
         })
     })
 
    return data
}
 
function When(condition: Boolean, if_true: WebLabsChild, if_false: WebLabsChild) {
    if ( condition ) {
        return if_true
    } else {
        return if_false
    }
}
 
async function onLoad(callback: Function, ...dependency: StatefulType[]) {
    callback()
    dependency.forEach(state => {
        state.onUpdate(callback)
    })
}
 
function render(id: string, app: WebLabsElement) {
    //@ts-ignore
    document.getElementById(id)
    .replaceChildren(app.coreElement) //make sure the App returns a valid HTML Element
 
    new MutationObserver((mutations) => {
        Object.keys(mutations).forEach(i => {
            //@ts-ignore
            mutations[i].removedNodes.forEach((node: any) => {
                if ( node._WebLabs_remove_api != undefined ) {
                    node._WebLabs_remove_api()
                }
            })
        })
    }).observe(app.coreElement, { childList: true, subtree: true })
}

//@ts-ignore
type WeblabsURL = {
    url: string,
    callBack: Function
}

function Url(base_url: string, callback: Function): WeblabsURL {
    //the element to be called
    return {
        //@ts-ignore
        url: base_url,
        callBack: callback
    }
}

function AppRouter(base_url: string, ...urlNodes: WeblabsURL[]) {
    //this is useful for many purposes
    //the URLNodes are the functions that possess the WeblabsURL data
    //return whatever the current url is.
    var routerElement = new WebLabsElement("div")
    let currentPath = window.location.pathname
    //update the path during initialization
    urlNodes.forEach(node => {
        //@ts-ignore
        if ( currentPath == `${base_url}${node.url}` ) {
            if ( window.history.state ) {
                //@ts-ignore
                routerElement.coreElement.replaceChildren(node.callBack(...window.history.state.data).coreElement)
            } else {
                //@ts-ignore
                routerElement.coreElement.replaceChildren(node.callBack().coreElement)
            }
        }
    })

    //let's also add some event Listners in Case we
    //want to listen to back track events
    function CallBack() {
        //now do the same thing
        urlNodes.forEach(node => {
            //@ts-ignore
            if ( window.location.pathname == `${base_url}${node.url}` ) {
                if ( window.history.state ) {
                    //@ts-ignore
                    routerElement.coreElement.replaceChildren(node.callBack(...window.history.state.data).coreElement)
                } else {
                    //@ts-ignore
                    routerElement.coreElement.replaceChildren(node.callBack().coreElement)
                }
            }
        })
    }

    //this one is used to track the non-native page transition
    //or the AppNavigate events

    window.addEventListener("popstate", CallBack)
    window.addEventListener("urlchange", CallBack) //a new custom event

    //now remove the event listner, when not in Need, because
    //ofcourse why would you even need when the component is out of scope
    //@ts-ignore
    routerElement._bolt_remove_api = () => {
        window.removeEventListener("popstate", CallBack)
        window.removeEventListener("urlchange", CallBack)
    }

    return routerElement    
}

function AppNavigator(base_url, ...data: any[]) {
    if ( base_url == window.location.pathname ) {
        //depends, like if the data was not same?
        if ( data.length = 0 ) {
            return //if there is no data, means a static transition
        }
    }
    window.history.pushState({ url: base_url, data }, "", base_url)
    //Now we will trigger some other type of event, a custom
    //event that might contain some functions that could
    //change the state
    window.dispatchEvent(new Event('urlchange'))
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



function a(...children: WebLabsChild[]): WebLabsElement {
    return new WebLabsElement("a", ...children)
}

function abbr(...children: WebLabsChild[]): WebLabsElement {
    return new WebLabsElement("abbr", ...children)
}

function acronym(...children: WebLabsChild[]): WebLabsElement {
    return new WebLabsElement("acronym", ...children)
}

function address(...children: WebLabsChild[]): WebLabsElement {
    return new WebLabsElement("address", ...children)
}

function applet(...children: WebLabsChild[]): WebLabsElement {
    return new WebLabsElement("applet", ...children)
}

function area(...children: WebLabsChild[]): WebLabsElement {
    return new WebLabsElement("area", ...children)
}

function article(...children: WebLabsChild[]): WebLabsElement {
    return new WebLabsElement("article", ...children)
}

function aside(...children: WebLabsChild[]): WebLabsElement {
    return new WebLabsElement("aside", ...children)
}

function audio(...children: WebLabsChild[]): WebLabsElement {
    return new WebLabsElement("audio", ...children)
}

function b(...children: WebLabsChild[]): WebLabsElement {
    return new WebLabsElement("b", ...children)
}

function base(...children: WebLabsChild[]): WebLabsElement {
    return new WebLabsElement("base", ...children)
}

function basefont(...children: WebLabsChild[]): WebLabsElement {
    return new WebLabsElement("basefont", ...children)
}

function bdi(...children: WebLabsChild[]): WebLabsElement {
    return new WebLabsElement("bdi", ...children)
}

function bdo(...children: WebLabsChild[]): WebLabsElement {
    return new WebLabsElement("bdo", ...children)
}

function big(...children: WebLabsChild[]): WebLabsElement {
    return new WebLabsElement("big", ...children)
}

function blockquote(...children: WebLabsChild[]): WebLabsElement {
    return new WebLabsElement("blockquote", ...children)
}

function body(...children: WebLabsChild[]): WebLabsElement {
    return new WebLabsElement("body", ...children)
}

function br(): WebLabsElement {
    return new WebLabsElement("br")
}

function button(...children: WebLabsChild[]): WebLabsElement {
    return new WebLabsElement("button", ...children)
}

function canvas(...children: WebLabsChild[]): WebLabsElement {
    return new WebLabsElement("canvas", ...children)
}

function caption(...children: WebLabsChild[]): WebLabsElement {
    return new WebLabsElement("caption", ...children)
}

function center(...children: WebLabsChild[]): WebLabsElement {
    return new WebLabsElement("center", ...children)
}

function cite(...children: WebLabsChild[]): WebLabsElement {
    return new WebLabsElement("cite", ...children)
}

function code(...children: WebLabsChild[]): WebLabsElement {
    return new WebLabsElement("code", ...children)
}

function col(...children: WebLabsChild[]): WebLabsElement {
    return new WebLabsElement("col", ...children)
}

function colgroup(...children: WebLabsChild[]): WebLabsElement {
    return new WebLabsElement("colgroup", ...children)
}

function datalist(...children: WebLabsChild[]): WebLabsElement {
    return new WebLabsElement("datalist", ...children)
}

function dd(...children: WebLabsChild[]): WebLabsElement {
    return new WebLabsElement("dd", ...children)
}

function del(...children: WebLabsChild[]): WebLabsElement {
    return new WebLabsElement("del", ...children)
}

function details(...children: WebLabsChild[]): WebLabsElement {
    return new WebLabsElement("details", ...children)
}

function dfn(...children: WebLabsChild[]): WebLabsElement {
    return new WebLabsElement("dfn", ...children)
}

function dialog(...children: WebLabsChild[]): WebLabsElement {
    return new WebLabsElement("dialog", ...children)
}

function dir(...children: WebLabsChild[]): WebLabsElement {
    return new WebLabsElement("dir", ...children)
}

function div(...children: WebLabsChild[]): WebLabsElement {
    return new WebLabsElement("div", ...children)
}

function dl(...children: WebLabsChild[]): WebLabsElement {
    return new WebLabsElement("dl", ...children)
}

function dt(...children: WebLabsChild[]): WebLabsElement {
    return new WebLabsElement("dt", ...children)
}

function em(...children: WebLabsChild[]): WebLabsElement {
    return new WebLabsElement("em", ...children)
}

function embed(...children: WebLabsChild[]): WebLabsElement {
    return new WebLabsElement("embed", ...children)
}

function fieldset(...children: WebLabsChild[]): WebLabsElement {
    return new WebLabsElement("fieldset", ...children)
}

function figcaption(...children: WebLabsChild[]): WebLabsElement {
    return new WebLabsElement("figcaption", ...children)
}

function figure(...children: WebLabsChild[]): WebLabsElement {
    return new WebLabsElement("figure", ...children)
}

function font(...children: WebLabsChild[]): WebLabsElement {
    return new WebLabsElement("font", ...children)
}

function footer(...children: WebLabsChild[]): WebLabsElement {
    return new WebLabsElement("footer", ...children)
}

function form(...children: WebLabsChild[]): WebLabsElement {
    return new WebLabsElement("form", ...children)
}

function frame(...children: WebLabsChild[]): WebLabsElement {
    return new WebLabsElement("frame", ...children)
}

function frameset(...children: WebLabsChild[]): WebLabsElement {
    return new WebLabsElement("frameset", ...children)
}

function h1(...children: WebLabsChild[]): WebLabsElement {
    return new WebLabsElement("h1", ...children)
}

function h2(...children: WebLabsChild[]): WebLabsElement {
    return new WebLabsElement("h2", ...children)
}

function h3(...children: WebLabsChild[]): WebLabsElement {
    return new WebLabsElement("h3", ...children)
}

function h4(...children: WebLabsChild[]): WebLabsElement {
    return new WebLabsElement("h4", ...children)
}

function h5(...children: WebLabsChild[]): WebLabsElement {
    return new WebLabsElement("h5", ...children)
}

function h6(...children: WebLabsChild[]): WebLabsElement {
    return new WebLabsElement("h6", ...children)
}

function head(...children: WebLabsChild[]): WebLabsElement {
    return new WebLabsElement("head", ...children)
}

function header(...children: WebLabsChild[]): WebLabsElement {
    return new WebLabsElement("header", ...children)
}

function hr(): WebLabsElement {
    return new WebLabsElement("hr")
}

function html(...children: WebLabsChild[]): WebLabsElement {
    return new WebLabsElement("html", ...children)
}

function i(): WebLabsElement {
    return new WebLabsElement("i")
}

function iframe(...children: WebLabsChild[]): WebLabsElement {
    return new WebLabsElement("iframe", ...children)
}

function img(...children: WebLabsChild[]): WebLabsElement {
    return new WebLabsElement("img", ...children)
}

function input(...children: WebLabsChild[]): WebLabsElement {
    return new WebLabsElement("input", ...children)
}

function ins(...children: WebLabsChild[]): WebLabsElement {
    return new WebLabsElement("ins", ...children)
}

function kbd(...children: WebLabsChild[]): WebLabsElement {
    return new WebLabsElement("kbd", ...children)
}

function keygen(...children: WebLabsChild[]): WebLabsElement {
    return new WebLabsElement("keygen", ...children)
}

function label(...children: WebLabsChild[]): WebLabsElement {
    return new WebLabsElement("label", ...children)
}

function legend(...children: WebLabsChild[]): WebLabsElement {
    return new WebLabsElement("legend", ...children)
}

function li(...children: WebLabsChild[]): WebLabsElement {
    return new WebLabsElement("li", ...children)
}

function link(...children: WebLabsChild[]): WebLabsElement {
    return new WebLabsElement("link", ...children)
}

function main(...children: WebLabsChild[]): WebLabsElement {
    return new WebLabsElement("main", ...children)
}

function map(...children: WebLabsChild[]): WebLabsElement {
    return new WebLabsElement("map", ...children)
}

function mark(...children: WebLabsChild[]): WebLabsElement {
    return new WebLabsElement("mark", ...children)
}

function menu(...children: WebLabsChild[]): WebLabsElement {
    return new WebLabsElement("menu", ...children)
}

function menuitem(...children: WebLabsChild[]): WebLabsElement {
    return new WebLabsElement("menuitem", ...children)
}

function meta(...children: WebLabsChild[]): WebLabsElement {
    return new WebLabsElement("meta", ...children)
}

function meter(...children: WebLabsChild[]): WebLabsElement {
    return new WebLabsElement("meter", ...children)
}

function nav(...children: WebLabsChild[]): WebLabsElement {
    return new WebLabsElement("nav", ...children)
}

function noframes(...children: WebLabsChild[]): WebLabsElement {
    return new WebLabsElement("noframes", ...children)
}

function noscript(...children: WebLabsChild[]): WebLabsElement {
    return new WebLabsElement("noscript", ...children)
}

function object(...children: WebLabsChild[]): WebLabsElement {
    return new WebLabsElement("object", ...children)
}

function ol(...children: WebLabsChild[]): WebLabsElement {
    return new WebLabsElement("ol", ...children)
}

function optgroup(...children: WebLabsChild[]): WebLabsElement {
    return new WebLabsElement("optgroup", ...children)
}

function option(...children: WebLabsChild[]): WebLabsElement {
    return new WebLabsElement("option", ...children)
}

function output(...children: WebLabsChild[]): WebLabsElement {
    return new WebLabsElement("output", ...children)
}

function p(...children: WebLabsChild[]): WebLabsElement {
    return new WebLabsElement("p", ...children)
}

function param(...children: WebLabsChild[]): WebLabsElement {
    return new WebLabsElement("param", ...children)
}

function picture(...children: WebLabsChild[]): WebLabsElement {
    return new WebLabsElement("picture", ...children)
}

function pre(...children: WebLabsChild[]): WebLabsElement {
    return new WebLabsElement("pre", ...children)
}

function progress(...children: WebLabsChild[]): WebLabsElement {
    return new WebLabsElement("progress", ...children)
}

function q(...children: WebLabsChild[]): WebLabsElement {
    return new WebLabsElement("q", ...children)
}

function rp(...children: WebLabsChild[]): WebLabsElement {
    return new WebLabsElement("rp", ...children)
}

function rt(...children: WebLabsChild[]): WebLabsElement {
    return new WebLabsElement("rt", ...children)
}

function ruby(...children: WebLabsChild[]): WebLabsElement {
    return new WebLabsElement("ruby", ...children)
}

function s(...children: WebLabsChild[]): WebLabsElement {
    return new WebLabsElement("s", ...children)
}

function samp(...children: WebLabsChild[]): WebLabsElement {
    return new WebLabsElement("samp", ...children)
}

function script(...children: WebLabsChild[]): WebLabsElement {
    return new WebLabsElement("script", ...children)
}

function section(...children: WebLabsChild[]): WebLabsElement {
    return new WebLabsElement("section", ...children)
}

function select(...children: WebLabsChild[]): WebLabsElement {
    return new WebLabsElement("select", ...children)
}

function small(...children: WebLabsChild[]): WebLabsElement {
    return new WebLabsElement("small", ...children)
}

function source(...children: WebLabsChild[]): WebLabsElement {
    return new WebLabsElement("source", ...children)
}

function span(...children: WebLabsChild[]): WebLabsElement {
    return new WebLabsElement("span", ...children)
}

function strike(...children: WebLabsChild[]): WebLabsElement {
    return new WebLabsElement("strike", ...children)
}

function strong(...children: WebLabsChild[]): WebLabsElement {
    return new WebLabsElement("strong", ...children)
}

function style(...children: WebLabsChild[]): WebLabsElement {
    return new WebLabsElement("style", ...children)
}

function sub(...children: WebLabsChild[]): WebLabsElement {
    return new WebLabsElement("sub", ...children)
}

function summary(...children: WebLabsChild[]): WebLabsElement {
    return new WebLabsElement("summary", ...children)
}

function sup(...children: WebLabsChild[]): WebLabsElement {
    return new WebLabsElement("sup", ...children)
}

function table(...children: WebLabsChild[]): WebLabsElement {
    return new WebLabsElement("table", ...children)
}

function tbody(...children: WebLabsChild[]): WebLabsElement {
    return new WebLabsElement("tbody", ...children)
}

function td(...children: WebLabsChild[]): WebLabsElement {
    return new WebLabsElement("td", ...children)
}

function template(...children: WebLabsChild[]): WebLabsElement {
    return new WebLabsElement("template", ...children)
}

function textarea(...children: WebLabsChild[]): WebLabsElement {
    return new WebLabsElement("textarea", ...children)
}

function tfoot(...children: WebLabsChild[]): WebLabsElement {
    return new WebLabsElement("tfoot", ...children)
}

function th(...children: WebLabsChild[]): WebLabsElement {
    return new WebLabsElement("th", ...children)
}

function thead(...children: WebLabsChild[]): WebLabsElement {
    return new WebLabsElement("thead", ...children)
}

function time(...children: WebLabsChild[]): WebLabsElement {
    return new WebLabsElement("time", ...children)
}

function title(...children: WebLabsChild[]): WebLabsElement {
    return new WebLabsElement("title", ...children)
}

function tr(...children: WebLabsChild[]): WebLabsElement {
    return new WebLabsElement("tr", ...children)
}

function track(...children: WebLabsChild[]): WebLabsElement {
    return new WebLabsElement("track", ...children)
}

function tt(...children: WebLabsChild[]): WebLabsElement {
    return new WebLabsElement("tt", ...children)
}

function u(...children: WebLabsChild[]): WebLabsElement {
    return new WebLabsElement("u", ...children)
}

function ul(...children: WebLabsChild[]): WebLabsElement {
    return new WebLabsElement("ul", ...children)
}

function Var(...children: WebLabsChild[]): WebLabsElement {
    return new WebLabsElement("var", ...children)
}

function video(...children: WebLabsChild[]): WebLabsElement {
    return new WebLabsElement("video", ...children)
}

function wbr(...children: WebLabsChild[]): WebLabsElement {
    return new WebLabsElement("wbr", ...children)
}