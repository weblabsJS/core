import { div } from "./components";
import { WebLabsElement, State, render, $, state, WebLabsChild, WeblabsEvent} from "./index";

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