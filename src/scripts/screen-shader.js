//================================================
/*

Turn Off the Lights
The entire page will be fading to dark, so you can watch the video as if you were in the cinema.
Copyright (C) 2026 Stefan vd
www.stefanvd.net
www.turnoffthelights.com

This program is free software; you can redistribute it and/or
modify it under the terms of the GNU General Public License
as published by the Free Software Foundation; either version 2
of the License, or (at your option) any later version.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU General Public License for more details.

You should have received a copy of the GNU General Public License
along with this program; if not, write to the Free Software
Foundation, Inc., 51 Franklin Street, Fifth Floor, Boston, MA  02110-1301, USA.


To view a copy of this license, visit http://creativecommons.org/licenses/GPL/2.0/

*/
//================================================

var mousespotlights = null, screenshader = null, lightcolor = null, interval = null;

function setAttributes(el, attrs){
	for(const[key, value]of Object.entries(attrs)){
		el.setAttribute(key, value);
	}
}

function newconvertHex(hex, opacity){
	hex = hex.replace("#", "");
	const alpha = opacity / 100;
	const fgRed = parseInt(hex.substring(0, 2), 16);
	const fgGreen = parseInt(hex.substring(2, 4), 16);
	const fgBlue = parseInt(hex.substring(4, 6), 16);

	const resultRed = fgRed * alpha + 255 * (1 - alpha);
	const resultGreen = fgGreen * alpha + 255 * (1 - alpha);
	const resultBlue = fgBlue * alpha + 255 * (1 - alpha);

	return`rgb(${resultRed},${resultGreen},${resultBlue})`;
}

var currentwebthemedark;
var currentwebthemelight;
function setmetatheme(a){
	const metas = document.getElementsByTagName("meta");
	let darktheme;
	let lighttheme;

	const newlightoffcolor = newconvertHex(lightcolor, interval);
	if(a === true){
		// light is off
		darktheme = currentwebthemedark;
		lighttheme = currentwebthemelight;
	}else{
		// light is on
		darktheme = newlightoffcolor;
		lighttheme = newlightoffcolor;
	}

	for(const meta of metas){
		if(meta.getAttribute("name") === "theme-color"){
			const media = meta.getAttribute("media");
			if(media){
				if(media === "(prefers-color-scheme: light)"){
					meta.setAttribute("content", lighttheme);
				}else if(media === "(prefers-color-scheme: dark)"){
					meta.setAttribute("content", darktheme);
				}
			}else{
				meta.setAttribute("content", lighttheme);
			}
		}
	}

	const x = document.querySelector("meta[name=\"theme-color\"]");
	if(x === null){
		// create one theme-color
		const newmeta = document.createElement("meta");
		newmeta.name = "theme-color";
		newmeta.setAttribute("content", lighttheme);
		document.getElementsByTagName("head")[0].appendChild(newmeta);
	}
}

const afterBodyReadyScreenshader = async() => {
	const response = await chrome.storage.sync.get(["mousespotlights", "screenshader", "lightcolor", "interval"]);
	// screenshader
	mousespotlights = response["mousespotlights"];
	screenshader = response["screenshader"];
	lightcolor = response["lightcolor"] || "#000000"; // default color black
	interval = response["interval"] ?? 80; // default interval 80%
	if(mousespotlights === true){
		if(screenshader === true){
			if(document.documentElement){
				const newscreenshader = document.createElement("div");
				setAttributes(newscreenshader, {"id": "stefanvdscreenshader", "class": "stefanvdscreenshader"});
				newscreenshader.style.background = lightcolor;
				newscreenshader.style.mixBlendMode = "multiply";
				newscreenshader.style.opacity = interval / 100;
				document.documentElement.insertBefore(newscreenshader, document.documentElement.firstChild);
				setmetatheme(false);
			}
		}
	}
}; // afterbody

if(document.body){
	afterBodyReadyScreenshader();
}else{
	const bodyObserver = new MutationObserver((recordList, observer) => {
		// Wait for 'document.body' get the definition
		if(!document.body)return;

		afterBodyReadyScreenshader();
		observer.disconnect();
	});
	bodyObserver.observe(document.documentElement, {childList: true});
}