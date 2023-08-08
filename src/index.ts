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
    get: (arg?: { filter?: boolean }) => type,
    set: (newstore: type) => void,
    registerEvent: <argType>(eventName: string, callback: (data: argType) => any) => void,
    emitEvent: <argType>(eventName: string, args: argType) => void,
    subscribe: <Event extends subscriptionEvent>(
        event: Event,
        callBack: 
            Event extends "set" ? (prev: type, newv: type) => boolean | StateModify<type> | void :
            Event extends "set:after" ? (value: type) => void :
            Event extends "set:only" ? (value: type) => void :
            Event extends "get"? (value: type) => StateModify<type> | void :
            never
    ) => void
}

export type StateModify<value> = {
    value: value
}

export function StateModify<value>(v: value): StateModify<value> {
    return {
        value: v
    }
}

export type subscriptionEvent = "set" | "set:after" | "set:only" | "get";

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

    //new feature: dynamicClass
    dynamicClass<stateType>(value: () => string, dependency: state<stateType>) {

        let current = State<string>(value())
        this.coreElement.classList.add(current.get()) //initially set the value

        dependency.subscribe("set:after", () => {

            //updates the previous value with the new one
            this.coreElement.classList.replace(current.get(), value())
            current.set(value())

        })

        return this

    }

    prop(name: HTMLTagProps, value: string) {
        this.coreElement.setAttribute(name, value)
        return this
    }

    //new feature: dynamicProp
    dynamicProp<stateType>(name: HTMLTagProps, value: Function, dependency: state<stateType>) {

        //call the value function and see any value that needs to be created
        this.prop(name, value())

        dependency.subscribe("set:after", () => {

            //when the dependency updates, update the same prop using the value function
            this.prop(name, value())

        })

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
        set: (prev: StoreType, newv: StoreType) => boolean | StateModify<StoreType> | void,
        get: (value: StoreType) => StateModify<StoreType> | undefined,
        only: Function[]
    } = {
        get: undefined,
        set: undefined,
        only: []
    }
    
    function get(arg?: { filter?: boolean }): StoreType {
        //the get function will call each function as a series,
        //where the value is passed to the next value

        if ( arg != undefined && arg.filter == true ) {
            if ( subscriptions.get != undefined ) {
                const callbc: StateModify<StoreType> = subscriptions.get(data)
                    
                if ( callbc != undefined ) {
    
                    if ( callbc.value != undefined ) {
    
                        return callbc.value
    
                    }
    
                }
            }
        }
  
        return data
    }
 
    function set(newstore: StoreType) {

        if ( subscriptions.set != undefined ) {

            let callbc = subscriptions.set(data, newstore)
            
            if (callbc == true ) {
    
                data = newstore
                subscriptions.only.forEach(callback => callback())
    
            } else if ( callbc != undefined ) {
    
                //@ts-ignore
                if ( callbc.value != undefined ) data = callbc.value
    
            } else if ( callbc == false ) {

                return

            } else {
                data = newstore
                subscriptions.only.forEach(callback => callback())
            }

        }

        if ( subscriptions.set == undefined) {
            //there is no filtration involved
            data = newstore
            subscriptions.only.forEach(callback => callback(data))
        }

        updateCandidates.forEach(callback => callback())
    }


    function subscribe<Event extends subscriptionEvent>(
        event: Event | string, 
        callback: 
            Event extends "set" ? (prev: StoreType, newv: StoreType) => boolean | StateModify<StoreType> | void :
            Event extends "set:after" ? (value: StoreType) => void :
            Event extends "set:only" ? (value: StoreType) => void :
            Event extends "get"? (value: StoreType) => StateModify<StoreType> | undefined :
            never
        ) {
        switch(event) {
            case "get":
                //@ts-ignore
                subscriptions.get = callback
                break
            case "set:after":
                updateCandidates.push(callback)
                break
            case "set:only":
                subscriptions.only.push(callback)
                break
            case "set":
                subscriptions.set = callback
                break
        }
    }

    function registerEvent<type>(eventName: string, callback: (data: type) => any) {
        
        //a singular function as opposed to multiple functions
        subscriptions[eventName] = callback

    }

    function emitEvent<type>(eventName: string, args: type | undefined) {

        subscriptions[eventName](args) //simply call the custom event with
        //the request arguments

    }

    return {
        get,
        set,
        subscribe,
        registerEvent,
        emitEvent
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

export function $(callback: () => WebLabsElement, ...states: state<any>[]) {
 
     //using the callback's UI definition instead of
     //creating a new one to improve space and performance
    var data: WebLabsElement = callback()
 
     /**
      * This one exploits the updateCandidates, since callbacks
      * will be re-executed whenever the corresponding states
      * are updated
      */
    states.forEach((State: state<any>) => {
         State.subscribe("set:after", () => {
 
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
 
export function When(condition: Boolean, if_true: WebLabsElement, if_false: WebLabsElement) {
    if ( condition ) {
        return if_true
    } else {
        return if_false
    }
}
 
export async function onLoad(callback: Function, ...dependency: state<any>[]) {
    callback()
    dependency.forEach(state => {
        state.subscribe("set:after", () => {callback})
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

/**
 * @function
 * @description This function checks for errors in weblabs app and reports them to the main view. This function is unstable and should only be used during development.
 * @unstable 
 */
export function DebugRender(id: string, app: () => WebLabsElement) {
    function debugComponent(e) {
        let trace = `${e.stack}`.split('\n');
        trace.pop();
        return new WebLabsElement("div",
            new WebLabsElement("div",
                new WebLabsElement("div",
                    new WebLabsElement("div").prop('style', `
                        box-sizing: border-box;
                        background: #FF3131;
                        width: 20px;
                        height: 100%;
                        flex-shrink: 0;
                    `),
                    new WebLabsElement("p", `${e}`)
                ).prop('style', `
                    box-sizing: border-box;
                    width: 100%;
                    height: 70px;
                    background: #282828;
                    display: flex;
                    gap: 20px;
                    font-size: 20px;
                    color: white;
                    align-items: center;
                `),
                new WebLabsElement("p", 'Stack Trace').prop('style', 'padding: 0 20px; margin: 0px'),
                new WebLabsElement("div",
                    new WebLabsElement("div",
                        ...trace.map(line => new WebLabsElement("div", 'at: ', new WebLabsElement("span", line).prop('style', 'color: lime;')))
                    ).prop('style', `
                        box-sizing: border-box;
                        background: #282828;
                        height: 100%;
                        width: 100%;
                        display: flex;
                        gap: 10px;
                        padding: 10px;
                        color: white;
                        flex-direction: column;
                        overflow-y: scroll;
                    `) //stack trace message
                ).prop('style', `
                    box-sizing: border-box;
                    padding: 0 20px;
                    width: 100%;
                    height: 237px;
                `)
            ).prop('style', `
                display: flex;
                flex-direction: column;
                gap: 20px;
                width: 644px;
                padding-bottom: 20px;
                background: #FFF;
                box-shadow: 0px 4px 86px 0px rgba(0, 0, 0, 0.25);
                box-sizing: border-box;
            `),
        ).prop('style', `
            font-family: sans-serif;
            box-sizing: border-box;
            height: 100vh;
            width: 100%;
            display: flex;
            justify-content: center;
            align-items: center;
        `);
    }
    const message = State<string>("");
    try {
        render(id, app());
    } catch (e) {
        message.set(e);
        render(id, $(() => debugComponent(message.get()), message));
    }
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

export function AppRouter(base_url: string, ...urlNodes: WeblabsURL[]): WebLabsElement {
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

export function AppNavigator(base_url: string, ...data: any[]) {
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

export function AppLink(url: string, child: WebLabsElement, ...variables) {
    return child.prop("style", "cursor: pointer")
        .event("click", () => AppNavigator(url, ...variables))
}