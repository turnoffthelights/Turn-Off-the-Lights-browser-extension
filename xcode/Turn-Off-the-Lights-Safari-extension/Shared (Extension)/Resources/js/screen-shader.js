//================================================
/*

Turn Off the Lights
The entire page will be fading to dark, so you can watch the video as if you were in the cinema.
Copyright (C) 2022 Stefan vd
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
	for(var key in attrs){
		el.setAttribute(key, attrs[key]);
	}
}

var fg_red, fg_green, fg_blue, result_red, result_green, result_blue, result;
function newconvertHex(hex, opacity){
	hex = hex.replace("#", "");
	var alpha = opacity / 100;
	fg_red = parseInt(hex.substring(0, 2), 16);
	fg_green = parseInt(hex.substring(2, 4), 16);
	fg_blue = parseInt(hex.substring(4, 6), 16);

	result_red = fg_red * alpha + 255 * (1 - alpha);
	result_green = fg_green * alpha + 255 * (1 - alpha);
	result_blue = fg_blue * alpha + 255 * (1 - alpha);

	result = "rgb(" + result_red + "," + result_green + "," + result_blue + ")";
	return result;
}

var currentwebthemedark;
var currentwebthemelight;
function setmetatheme(a){
	const metas = document.getElementsByTagName("meta");
	var darktheme;
	var lighttheme;

	var newlightoffcolor = newconvertHex(lightcolor, interval);
	if(a == true){
		// light is off
		darktheme = currentwebthemedark;
		lighttheme = currentwebthemelight;
	}else{
		// light is on
		darktheme = newlightoffcolor;
		lighttheme = newlightoffcolor;
	}

	let i, l = metas.length;
	for(i = 0; i < l; i++){
		if(metas[i].getAttribute("name") == "theme-color"){
			if(metas[i].getAttribute("media")){
				if(metas[i].getAttribute("media") == "(prefers-color-scheme: light)"){
					metas[i].setAttribute("content", lighttheme);
				}else if(metas[i].getAttribute("media") == "(prefers-color-scheme: dark)"){
					metas[i].setAttribute("content", darktheme);
				}
			}else{
				metas[i].setAttribute("content", lighttheme);
			}
		}
	}

	var x = document.querySelector("meta[name=\"theme-color\"]");
	if(x == null){
		// create one theme-color
		var newmeta = document.createElement("meta");
		newmeta.name = "theme-color";
		newmeta.setAttribute("content", lighttheme);
		document.getElementsByTagName("head")[0].appendChild(newmeta);
	}
}

const afterBodyReadyScreenshader = () => {
	chrome.storage.sync.get(["mousespotlights", "screenshader", "lightcolor", "interval"], function(response){
		// screenshader
		mousespotlights = response["mousespotlights"];
		screenshader = response["screenshader"];
		lightcolor = response["lightcolor"]; if(lightcolor)lightcolor = response["lightcolor"]; else lightcolor = "#000000"; // default color black
		interval = response["interval"]; if(interval == null)interval = 80; // default interval 80%
		if(mousespotlights == true){
			if(screenshader == true){
				if(document.documentElement){
					var newscreenshader = document.createElement("div");
					setAttributes(newscreenshader, {"id": "stefanvdscreenshader", "class": "stefanvdscreenshader"});
					newscreenshader.style.background = lightcolor;
					newscreenshader.style.mixBlendMode = "multiply";
					newscreenshader.style.opacity = interval / 100;
					document.documentElement.insertBefore(newscreenshader, document.documentElement.firstChild);
					setmetatheme(false);
				}
			}
		}
	});
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