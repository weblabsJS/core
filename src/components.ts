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

import { WebLabsElement, WebLabsChild, render, State, $ } from './index'

export function a(...children: WebLabsChild[]): WebLabsElement {
    return new WebLabsElement("a", ...children)
}

export function abbr(...children: WebLabsChild[]): WebLabsElement {
    return new WebLabsElement("abbr", ...children)
}

export function acronym(...children: WebLabsChild[]): WebLabsElement {
    return new WebLabsElement("acronym", ...children)
}

export function address(...children: WebLabsChild[]): WebLabsElement {
    return new WebLabsElement("address", ...children)
}

export function applet(...children: WebLabsChild[]): WebLabsElement {
    return new WebLabsElement("applet", ...children)
}

export function area(...children: WebLabsChild[]): WebLabsElement {
    return new WebLabsElement("area", ...children)
}

export function article(...children: WebLabsChild[]): WebLabsElement {
    return new WebLabsElement("article", ...children)
}

export function aside(...children: WebLabsChild[]): WebLabsElement {
    return new WebLabsElement("aside", ...children)
}

export function audio(...children: WebLabsChild[]): WebLabsElement {
    return new WebLabsElement("audio", ...children)
}

export function b(...children: WebLabsChild[]): WebLabsElement {
    return new WebLabsElement("b", ...children)
}

export function base(...children: WebLabsChild[]): WebLabsElement {
    return new WebLabsElement("base", ...children)
}

export function basefont(...children: WebLabsChild[]): WebLabsElement {
    return new WebLabsElement("basefont", ...children)
}

export function bdi(...children: WebLabsChild[]): WebLabsElement {
    return new WebLabsElement("bdi", ...children)
}

export function bdo(...children: WebLabsChild[]): WebLabsElement {
    return new WebLabsElement("bdo", ...children)
}

export function big(...children: WebLabsChild[]): WebLabsElement {
    return new WebLabsElement("big", ...children)
}

export function blockquote(...children: WebLabsChild[]): WebLabsElement {
    return new WebLabsElement("blockquote", ...children)
}

export function body(...children: WebLabsChild[]): WebLabsElement {
    return new WebLabsElement("body", ...children)
}

export function br(): WebLabsElement {
    return new WebLabsElement("br")
}

export function button(...children: WebLabsChild[]): WebLabsElement {
    return new WebLabsElement("button", ...children)
}

export function canvas(...children: WebLabsChild[]): WebLabsElement {
    return new WebLabsElement("canvas", ...children)
}

export function caption(...children: WebLabsChild[]): WebLabsElement {
    return new WebLabsElement("caption", ...children)
}

export function center(...children: WebLabsChild[]): WebLabsElement {
    return new WebLabsElement("center", ...children)
}

export function cite(...children: WebLabsChild[]): WebLabsElement {
    return new WebLabsElement("cite", ...children)
}

export function code(...children: WebLabsChild[]): WebLabsElement {
    return new WebLabsElement("code", ...children)
}

export function col(...children: WebLabsChild[]): WebLabsElement {
    return new WebLabsElement("col", ...children)
}

export function colgroup(...children: WebLabsChild[]): WebLabsElement {
    return new WebLabsElement("colgroup", ...children)
}

export function datalist(...children: WebLabsChild[]): WebLabsElement {
    return new WebLabsElement("datalist", ...children)
}

export function dd(...children: WebLabsChild[]): WebLabsElement {
    return new WebLabsElement("dd", ...children)
}

export function del(...children: WebLabsChild[]): WebLabsElement {
    return new WebLabsElement("del", ...children)
}

export function details(...children: WebLabsChild[]): WebLabsElement {
    return new WebLabsElement("details", ...children)
}

export function dfn(...children: WebLabsChild[]): WebLabsElement {
    return new WebLabsElement("dfn", ...children)
}

export function dialog(...children: WebLabsChild[]): WebLabsElement {
    return new WebLabsElement("dialog", ...children)
}

export function dir(...children: WebLabsChild[]): WebLabsElement {
    return new WebLabsElement("dir", ...children)
}

export function div(...children: WebLabsChild[]): WebLabsElement {
    return new WebLabsElement("div", ...children)
}

export function dl(...children: WebLabsChild[]): WebLabsElement {
    return new WebLabsElement("dl", ...children)
}

export function dt(...children: WebLabsChild[]): WebLabsElement {
    return new WebLabsElement("dt", ...children)
}

export function em(...children: WebLabsChild[]): WebLabsElement {
    return new WebLabsElement("em", ...children)
}

export function embed(...children: WebLabsChild[]): WebLabsElement {
    return new WebLabsElement("embed", ...children)
}

export function fieldset(...children: WebLabsChild[]): WebLabsElement {
    return new WebLabsElement("fieldset", ...children)
}

export function figcaption(...children: WebLabsChild[]): WebLabsElement {
    return new WebLabsElement("figcaption", ...children)
}

export function figure(...children: WebLabsChild[]): WebLabsElement {
    return new WebLabsElement("figure", ...children)
}

export function font(...children: WebLabsChild[]): WebLabsElement {
    return new WebLabsElement("font", ...children)
}

export function footer(...children: WebLabsChild[]): WebLabsElement {
    return new WebLabsElement("footer", ...children)
}

export function form(...children: WebLabsChild[]): WebLabsElement {
    return new WebLabsElement("form", ...children)
}

export function frame(...children: WebLabsChild[]): WebLabsElement {
    return new WebLabsElement("frame", ...children)
}

export function frameset(...children: WebLabsChild[]): WebLabsElement {
    return new WebLabsElement("frameset", ...children)
}

export function h1(...children: WebLabsChild[]): WebLabsElement {
    return new WebLabsElement("h1", ...children)
}

export function h2(...children: WebLabsChild[]): WebLabsElement {
    return new WebLabsElement("h2", ...children)
}

export function h3(...children: WebLabsChild[]): WebLabsElement {
    return new WebLabsElement("h3", ...children)
}

export function h4(...children: WebLabsChild[]): WebLabsElement {
    return new WebLabsElement("h4", ...children)
}

export function h5(...children: WebLabsChild[]): WebLabsElement {
    return new WebLabsElement("h5", ...children)
}

export function h6(...children: WebLabsChild[]): WebLabsElement {
    return new WebLabsElement("h6", ...children)
}

export function head(...children: WebLabsChild[]): WebLabsElement {
    return new WebLabsElement("head", ...children)
}

export function header(...children: WebLabsChild[]): WebLabsElement {
    return new WebLabsElement("header", ...children)
}

export function hr(): WebLabsElement {
    return new WebLabsElement("hr")
}

export function html(...children: WebLabsChild[]): WebLabsElement {
    return new WebLabsElement("html", ...children)
}

export function i(): WebLabsElement {
    return new WebLabsElement("i")
}

export function iframe(...children: WebLabsChild[]): WebLabsElement {
    return new WebLabsElement("iframe", ...children)
}

export function img(...children: WebLabsChild[]): WebLabsElement {
    return new WebLabsElement("img", ...children)
}

export function input(...children: WebLabsChild[]): WebLabsElement {
    return new WebLabsElement("input", ...children)
}

export function ins(...children: WebLabsChild[]): WebLabsElement {
    return new WebLabsElement("ins", ...children)
}

export function kbd(...children: WebLabsChild[]): WebLabsElement {
    return new WebLabsElement("kbd", ...children)
}

export function keygen(...children: WebLabsChild[]): WebLabsElement {
    return new WebLabsElement("keygen", ...children)
}

export function label(...children: WebLabsChild[]): WebLabsElement {
    return new WebLabsElement("label", ...children)
}

export function legend(...children: WebLabsChild[]): WebLabsElement {
    return new WebLabsElement("legend", ...children)
}

export function li(...children: WebLabsChild[]): WebLabsElement {
    return new WebLabsElement("li", ...children)
}

export function link(...children: WebLabsChild[]): WebLabsElement {
    return new WebLabsElement("link", ...children)
}

export function main(...children: WebLabsChild[]): WebLabsElement {
    return new WebLabsElement("main", ...children)
}

export function map(...children: WebLabsChild[]): WebLabsElement {
    return new WebLabsElement("map", ...children)
}

export function mark(...children: WebLabsChild[]): WebLabsElement {
    return new WebLabsElement("mark", ...children)
}

export function menu(...children: WebLabsChild[]): WebLabsElement {
    return new WebLabsElement("menu", ...children)
}

export function menuitem(...children: WebLabsChild[]): WebLabsElement {
    return new WebLabsElement("menuitem", ...children)
}

export function meta(...children: WebLabsChild[]): WebLabsElement {
    return new WebLabsElement("meta", ...children)
}

export function meter(...children: WebLabsChild[]): WebLabsElement {
    return new WebLabsElement("meter", ...children)
}

export function nav(...children: WebLabsChild[]): WebLabsElement {
    return new WebLabsElement("nav", ...children)
}

export function noframes(...children: WebLabsChild[]): WebLabsElement {
    return new WebLabsElement("noframes", ...children)
}

export function noscript(...children: WebLabsChild[]): WebLabsElement {
    return new WebLabsElement("noscript", ...children)
}

export function object(...children: WebLabsChild[]): WebLabsElement {
    return new WebLabsElement("object", ...children)
}

export function ol(...children: WebLabsChild[]): WebLabsElement {
    return new WebLabsElement("ol", ...children)
}

export function optgroup(...children: WebLabsChild[]): WebLabsElement {
    return new WebLabsElement("optgroup", ...children)
}

export function option(...children: WebLabsChild[]): WebLabsElement {
    return new WebLabsElement("option", ...children)
}

export function output(...children: WebLabsChild[]): WebLabsElement {
    return new WebLabsElement("output", ...children)
}

export function p(...children: WebLabsChild[]): WebLabsElement {
    return new WebLabsElement("p", ...children)
}

export function param(...children: WebLabsChild[]): WebLabsElement {
    return new WebLabsElement("param", ...children)
}

export function picture(...children: WebLabsChild[]): WebLabsElement {
    return new WebLabsElement("picture", ...children)
}

export function pre(...children: WebLabsChild[]): WebLabsElement {
    return new WebLabsElement("pre", ...children)
}

export function progress(...children: WebLabsChild[]): WebLabsElement {
    return new WebLabsElement("progress", ...children)
}

export function q(...children: WebLabsChild[]): WebLabsElement {
    return new WebLabsElement("q", ...children)
}

export function rp(...children: WebLabsChild[]): WebLabsElement {
    return new WebLabsElement("rp", ...children)
}

export function rt(...children: WebLabsChild[]): WebLabsElement {
    return new WebLabsElement("rt", ...children)
}

export function ruby(...children: WebLabsChild[]): WebLabsElement {
    return new WebLabsElement("ruby", ...children)
}

export function s(...children: WebLabsChild[]): WebLabsElement {
    return new WebLabsElement("s", ...children)
}

export function samp(...children: WebLabsChild[]): WebLabsElement {
    return new WebLabsElement("samp", ...children)
}

export function script(...children: WebLabsChild[]): WebLabsElement {
    return new WebLabsElement("script", ...children)
}

export function section(...children: WebLabsChild[]): WebLabsElement {
    return new WebLabsElement("section", ...children)
}

export function select(...children: WebLabsChild[]): WebLabsElement {
    return new WebLabsElement("select", ...children)
}

export function small(...children: WebLabsChild[]): WebLabsElement {
    return new WebLabsElement("small", ...children)
}

export function source(...children: WebLabsChild[]): WebLabsElement {
    return new WebLabsElement("source", ...children)
}

export function span(...children: WebLabsChild[]): WebLabsElement {
    return new WebLabsElement("span", ...children)
}

export function strike(...children: WebLabsChild[]): WebLabsElement {
    return new WebLabsElement("strike", ...children)
}

export function strong(...children: WebLabsChild[]): WebLabsElement {
    return new WebLabsElement("strong", ...children)
}

export function sub(...children: WebLabsChild[]): WebLabsElement {
    return new WebLabsElement("sub", ...children)
}

export function summary(...children: WebLabsChild[]): WebLabsElement {
    return new WebLabsElement("summary", ...children)
}

export function sup(...children: WebLabsChild[]): WebLabsElement {
    return new WebLabsElement("sup", ...children)
}

export function table(...children: WebLabsChild[]): WebLabsElement {
    return new WebLabsElement("table", ...children)
}

export function tbody(...children: WebLabsChild[]): WebLabsElement {
    return new WebLabsElement("tbody", ...children)
}

export function td(...children: WebLabsChild[]): WebLabsElement {
    return new WebLabsElement("td", ...children)
}

export function template(...children: WebLabsChild[]): WebLabsElement {
    return new WebLabsElement("template", ...children)
}

export function textarea(...children: WebLabsChild[]): WebLabsElement {
    return new WebLabsElement("textarea", ...children)
}

export function tfoot(...children: WebLabsChild[]): WebLabsElement {
    return new WebLabsElement("tfoot", ...children)
}

export function th(...children: WebLabsChild[]): WebLabsElement {
    return new WebLabsElement("th", ...children)
}

export function thead(...children: WebLabsChild[]): WebLabsElement {
    return new WebLabsElement("thead", ...children)
}

export function time(...children: WebLabsChild[]): WebLabsElement {
    return new WebLabsElement("time", ...children)
}

export function title(...children: WebLabsChild[]): WebLabsElement {
    return new WebLabsElement("title", ...children)
}

export function tr(...children: WebLabsChild[]): WebLabsElement {
    return new WebLabsElement("tr", ...children)
}

export function track(...children: WebLabsChild[]): WebLabsElement {
    return new WebLabsElement("track", ...children)
}

export function tt(...children: WebLabsChild[]): WebLabsElement {
    return new WebLabsElement("tt", ...children)
}

export function u(...children: WebLabsChild[]): WebLabsElement {
    return new WebLabsElement("u", ...children)
}

export function ul(...children: WebLabsChild[]): WebLabsElement {
    return new WebLabsElement("ul", ...children)
}

export function Var(...children: WebLabsChild[]): WebLabsElement {
    return new WebLabsElement("var", ...children)
}

export function video(...children: WebLabsChild[]): WebLabsElement {
    return new WebLabsElement("video", ...children)
}

export function wbr(...children: WebLabsChild[]): WebLabsElement {
    return new WebLabsElement("wbr", ...children)
}

/**
 * @function
 * @description This function checks for errors in weblabs app and reports them to the main view. This function is unstable and should only be used during development.
 * @unstable 
 */
export function DebugRender(id: string, app: () => WebLabsElement) {

	function debugComponent(e: any) {

		let trace = `${e.stack}`.split('\n')
		trace.pop()

		return div(
			div(
				div(
					div().prop('style', `
					
						background: #FF3131;
						width: 20px;
						height: 100%;
						flex-shrink: 0;

					`),
					p(`${e}`)

				).prop('style', `
				
					width: 100%;
					height: 70px;
					background: #282828;
					display: flex;
					gap: 20px;
					font-size: 20px;
					color: white;
					align-items: center
				
				`),

				p('Stack Trace').prop('style', 'padding: 0 20px;'),

				div(

					div(

						...trace.map(line => p('at: ', span(line).prop('style', 'color: lime;')))

					).prop('style', 
					`
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

					padding: 0 20px;
					width: 100%;
					height: 237px;

				`)

			).prop('style', `
			
				display: flex;
				flex-direction: column;
				gap: 20px;
				width: 644px;
				height: 390px;
				background: #FFF;
				box-shadow: 0px 4px 86px 0px rgba(0, 0, 0, 0.25);
				
			`),

		).prop('style', `
		
			height: 100vh;
			width: 100%;
			display: flex;
			justify-content: center;
			align-items: center;

		`)
	}

	const message = State<string>("")

	try {
		render(id, app())
	} catch (e) {
		message.set(e)
		render(id, $(() => debugComponent(message.get()), message))
	}
}