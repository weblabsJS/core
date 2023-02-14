export type WebLabsChild = WebLabsElement | String | string | number;
export type state = {
    get: Function;
    set: Function;
    onUpdate: Function;
    value: Function;
    subscribe: (event: subscriptionEvent, callBack: Function) => void;
};
export type StatefulType = state;
export type subscriptionEvent = "set" | "get" | "onupdate";
export declare class WebLabsElement {
    coreElement: HTMLElement;
    constructor(HTMLTag: string, ...children: WebLabsChild[]);
    id(Id: string): this;
    class(...classnames: string[]): this;
    prop(name: string, value: string): this;
    event(name: string, callback: Function): this;
    ref(state: state): this;
    onRemove(callback: Function): this;
}
export declare function State<StoreType>(initial?: StoreType): state;
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
export declare function $(callback: Function, ...states: StatefulType[]): any;
export declare function When(condition: Boolean, if_true: WebLabsChild, if_false: WebLabsChild): WebLabsChild;
export declare function onLoad(callback: Function, ...dependency: StatefulType[]): Promise<void>;
export declare function render(id: string, app: WebLabsElement): void;
export type URL = {
    url: string;
    callBack: Function;
};
export declare function Url(base_url: string, callback: Function): URL;
export declare function AppRouter(base_url: string, ...urlNodes: URL[]): WebLabsElement;
export declare function AppNavigator(base_url: any, ...data: any[]): void;
