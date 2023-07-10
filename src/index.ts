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

export type WebLabsChild = WebLabsElement | String | string | number
export type state<type> = {
    get: Function,
    set: Function,
    onUpdate: Function,
    value: Function,
    subscribe: (event: subscriptionEvent, callBack: (prev: type, newv: type) => boolean | StateModify<type> | void) => void
}

export type StateModify<value> = {
    value: value
}

export function StateModify<value>(v: value): StateModify<value> {
    return {
        value: v
    }
}

export type subscriptionEvent = "set" | "get" | "onupdate" | "value"

export type HTMLTagProps = "accept"
  | "acceptCharset"
  | "accessKey"
  | "action"
  | "allowFullScreen"
  | "allowTransparency"
  | "alt"
  | "async"
  | "autocomplete"
  | "autofocus"
  | "autoPlay"
  | "capture"
  | "cellPadding"
  | "cellSpacing"
  | "challenge"
  | "charSet"
  | "checked"
  | "cite"
  | "class"
  | "className"
  | "cols"
  | "colSpan"
  | "content"
  | "contentEditable"
  | "contextMenu"
  | "controls"
  | "coords"
  | "crossOrigin"
  | "data"
  | "dateTime"
  | "default"
  | "defer"
  | "dir"
  | "disabled"
  | "download"
  | "draggable"
  | "dropzone"
  | "enctype"
  | "for"
  | "form"
  | "formAction"
  | "formEncType"
  | "formMethod"
  | "formNoValidate"
  | "formTarget"
  | "frameBorder"
  | "headers"
  | "height"
  | "hidden"
  | "high"
  | "href"
  | "hrefLang"
  | "htmlFor"
  | "httpEquiv"
  | "icon"
  | "id"
  | "inputMode"
  | "integrity"
  | "is"
  | "itemId"
  | "itemProp"
  | "itemRef"
  | "itemScope"
  | "itemType"
  | "kind"
  | "label"
  | "lang"
  | "list"
  | "loop"
  | "low"
  | "manifest"
  | "marginHeight"
  | "marginWidth"
  | "max"
  | "maxLength"
  | "media"
  | "mediaGroup"
  | "method"
  | "min"
  | "minLength"
  | "multiple"
  | "muted"
  | "name"
  | "noValidate"
  | "nonce"
  | "open"
  | "optimum"
  | "pattern"
  | "placeholder"
  | "poster"
  | "preload"
  | "profile"
  | "radioGroup"
  | "readOnly"
  | "referrerPolicy"
  | "rel"
  | "required"
  | "reversed"
  | "role"
  | "rows"
  | "rowSpan"
  | "sandbox"
  | "scope"
  | "scoped"
  | "scrolling"
  | "seamless"
  | "selected"
  | "shape"
  | "size"
  | "sizes"
  | "slot"
  | "span"
  | "spellcheck"
  | "src"
  | "srcdoc"
  | "srclang"
  | "srcSet"
  | "start"
  | "step"
  | "style"
  | "summary"
  | "tabIndex"
  | "target"
  | "title"
  | "type"
  | "useMap"
  | "value"
  | "width"
  | "wmode"
  | "wrap";


export type WeblabsEvent = "abort"
  | "animationend"
  | "animationiteration"
  | "animationstart"
  | "auxclick"
  | "beforeinput"
  | "blur"
  | "cancel"
  | "canplay"
  | "canplaythrough"
  | "change"
  | "click"
  | "close"
  | "contextmenu"
  | "copy"
  | "cuechange"
  | "cut"
  | "dblclick"
  | "drag"
  | "dragend"
  | "dragenter"
  | "dragexit"
  | "dragleave"
  | "dragover"
  | "dragstart"
  | "drop"
  | "durationchange"
  | "emptied"
  | "ended"
  | "error"
  | "focus"
  | "focusin"
  | "focusout"
  | "fullscreenchange"
  | "fullscreenerror"
  | "gotpointercapture"
  | "input"
  | "invalid"
  | "keydown"
  | "keypress"
  | "keyup"
  | "load"
  | "loadeddata"
  | "loadedmetadata"
  | "loadstart"
  | "lostpointercapture"
  | "mousedown"
  | "mouseenter"
  | "mouseleave"
  | "mousemove"
  | "mouseout"
  | "mouseover"
  | "mouseup"
  | "pause"
  | "play"
  | "playing"
  | "pointercancel"
  | "pointerdown"
  | "pointerenter"
  | "pointerleave"
  | "pointermove"
  | "pointerout"
  | "pointerover"
  | "pointerup"
  | "progress"
  | "ratechange"
  | "reset"
  | "resize"
  | "scroll"
  | "securitypolicyviolation"
  | "seeked"
  | "seeking"
  | "select"
  | "selectionchange"
  | "selectstart"
  | "stalled"
  | "submit"
  | "suspend"
  | "timeupdate"
  | "toggle"
  | "touchcancel"
  | "touchend"
  | "touchmove"
  | "touchstart"
  | "transitioncancel"
  | "transitionend"
  | "transitionrun"
  | "transitionstart"
  | "volumechange"
  | "waiting"
  | "wheel"


export class WebLabsElement {
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
                this.coreElement.classList.add(...classname.trim().split(" "))
            }
        })
 
        return this
 
    }

    prop(name: HTMLTagProps, value: string) {
        this.coreElement.setAttribute(name, value)
        return this
    }
 
    event(name: WeblabsEvent, callback: Function) {
        this.coreElement.addEventListener(name, (e) => callback(e))
        return this
    }

    //adding reference to itself (basically binding itself to a state)
    ref(state: state<any>) {
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

export function State<StoreType>(initial: StoreType): state<StoreType> {
 
    var data: StoreType = initial
    var updateCandidates: Function[] = []
    var subscriptions: {
        set: Function[],
        get: Function[],
        onupdate: Function[],
        value: Function[]
    } = {
        get: [], set: [], onupdate: [], value: []
    }
    
    function get(): StoreType {
        subscriptions.get.forEach(callback => callback(data))
        return data
    }
 
    function set(newstore: StoreType) {

        subscriptions.set.forEach(callback => {
            
            let callbc = callback(data, newstore)
            
            if (callbc == true) {
                data = newstore
            } else if ( callbc != undefined ) {

                if ( callbc.value != undefined ) data = callbc.value
            
            }
        })

        if ( subscriptions.set.length == 0 ) {
            //there is no filtration involved
            data = newstore
        }

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
            case "value":
                subscriptions.value.push(callback)
                break
        }
    }

    function value() {
        subscriptions.value.forEach(callback => callback(data))
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

export function $(callback: Function, ...states: state<any>[]) {
 
     //using the callback's UI definition instead of
     //creating a new one to improve space and performance
    var data: WebLabsElement = callback()
 
     /**
      * This one exploits the updateCandidates, since callbacks
      * will be re-executed whenever the corresponding states
      * are updated
      */
    states.forEach((State: state<any>) => {
         State.onUpdate(() => {
 
            //We need the HTML part, so instead of replacing the
            //node (which is very inefficient)

            let tx = callback().coreElement
            data.coreElement.replaceWith(
                tx
            )
            
            data.coreElement = tx

         })
     })
 
    return data
}
 
export function When(condition: Boolean, if_true: WebLabsChild, if_false: WebLabsChild) {
    if ( condition ) {
        return if_true
    } else {
        return if_false
    }
}
 
export async function onLoad(callback: Function, ...dependency: state<any>[]) {
    callback()
    dependency.forEach(state => {
        state.onUpdate(callback)
    })
}
 
export function render(id: string, app: WebLabsElement) {
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
export type WeblabsURL = {
    url: string,
    callBack: Function
}

export function Url(base_url: string, callback: Function): WeblabsURL {
    //the element to be called
    return {
        //@ts-ignore
        url: base_url,
        callBack: callback
    }
}

export function AppRouter(base_url: string, ...urlNodes: WeblabsURL[]) {
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
    routerElement._WebLabs_remove_api = () => {
        window.removeEventListener("popstate", CallBack)
        window.removeEventListener("urlchange", CallBack)
    }

    return routerElement    
}

export function AppNavigator(base_url, ...data: any[]) {
    if ( base_url == window.location.pathname ) {
        //depends, like if the data was not same?
        if ( data.length == 0 ) {
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
}

export function AppLink(url, child: WebLabsElement, ...variables) {
    return child.prop("style", "cursor: pointer")
        .event("click", () => AppNavigator(url, ...variables))
}