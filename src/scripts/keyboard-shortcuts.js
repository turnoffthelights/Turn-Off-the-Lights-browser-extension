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

function $(id){ return document.getElementById(id); }

// Load settings from storage
var shortcutlight, interval, eyea;
var keydownListener;

function addKeyboardListener(){
	// Keyboard shortcuts for Alt key combinations
	keydownListener = function(e){
		if(e.key == "F8" && !e.ctrlKey && !e.shiftKey && e.altKey){
			// Run code for Alt+F8
			// Shortcutlight
			if(shortcutlight == true){
				if($("stefanvdlightareoff1")){
					// control opacity for all <div>
					var div = document.querySelectorAll("div.stefanvdlightareoff");
					var i;
					var l = div.length;
					for(i = 0; i < l; i++){ div[i].style.opacity = interval / 100; }
				}
			}
		}

		if(e.key == "F9" && !e.ctrlKey && !e.shiftKey && e.altKey){
			// Run code for Alt+F9
			// Shortcutlight
			if(shortcutlight == true){
				if($("stefanvdlightareoff1")){
					var F9saving = Math.round(($("stefanvdlightareoff1").style.opacity) * 100);
					chrome.runtime.sendMessage({name: "readersaveme", value: F9saving});
				}
			}
		}

		if(e.key == "ArrowUp" && !e.ctrlKey && !e.shiftKey && e.altKey){
			// Run code for Alt+arrow up
			// Shortcutlight
			if(shortcutlight == true){
				if($("stefanvdlightareoff1")){
					var shorcutcurrentopacity = $("stefanvdlightareoff1").style.opacity;
					shorcutcurrentopacity = (shorcutcurrentopacity * 100 + 1) / 100;
					// if higher then 1, stay 1
					if(shorcutcurrentopacity >= 1){ shorcutcurrentopacity = 1; }
					// control opacity for all <div>
					var divlightoff = document.querySelectorAll("div.stefanvdlightareoff");
					var lightoffi;
					var lightoffl = divlightoff.length;
					for(lightoffi = 0; lightoffi < lightoffl; lightoffi++){ divlightoff[lightoffi].style.opacity = shorcutcurrentopacity; }
				}
			}
		}

		if(e.key == "ArrowDown" && !e.ctrlKey && !e.shiftKey && e.altKey){
			// Run code for Alt+arrow down
			// Shortcutlight
			if(shortcutlight == true){
				if($("stefanvdlightareoff1")){
					let shorcutcurrentopacity = $("stefanvdlightareoff1").style.opacity;
					shorcutcurrentopacity -= 0.01;
					// if zero
					if(shorcutcurrentopacity <= 0){
						var sli;
						for(sli = 1; sli < 5; sli++){
							var lightelement = document.getElementById("stefanvdlightareoff" + sli);
							if(lightelement){ lightelement.parentNode.removeChild(lightelement); }
						}
					}else{
						// control opacity for all <div>
						let div = document.querySelectorAll("div.stefanvdlightareoff");
						let i, l = div.length;
						for(i = 0; i < l; i++){ div[i].style.opacity = shorcutcurrentopacity; }
					}
				}
			}
		}

		if(e.key == "*" && !e.ctrlKey && !e.shiftKey && e.altKey){
			// Run code for Alt+*
			// Shortcutlight
			if(shortcutlight == true){
			// all tabs lights off
				chrome.runtime.sendMessage({name: "emergencyalf"});
			}
		}

		if(e.key == "F10" && !e.ctrlKey && !e.shiftKey && e.altKey){
			// Run code for Alt+F10
			// Shortcutlight
			if(shortcutlight == true){
				var i18neyedivoff = chrome.i18n.getMessage("eyedivoff");
				var i18neyedivon = chrome.i18n.getMessage("eyedivon");
				var i18ntiteleye = chrome.i18n.getMessage("titeleye");
				var eyestatus = eyea;

				// enable/disable the "Eye Protection" feature
				var stefanvdlightseye = $("stefanvdlightseye");
				if(stefanvdlightseye){ document.body.removeChild(stefanvdlightseye); } // remove it
				// create div on top page, and say this is OFF
				var neweyediv = document.createElement("div");
				neweyediv.setAttribute("id", "stefanvdlightseye");
				if(eyea == true){
					neweyediv.textContent = "" + i18ntiteleye + " " + i18neyedivoff + "";
					eyestatus = false;
				}else{
					neweyediv.textContent = "" + i18ntiteleye + " " + i18neyedivon + "";
					eyestatus = true;
				}
				chrome.runtime.sendMessage({name: "eyesaveme", value: eyestatus});

				document.body.appendChild(neweyediv);

				// remove div after 3s
				var myVar = window.setInterval(function(){
					var stefanvdlightseye = $("stefanvdlightseye");
					if(stefanvdlightseye){ document.body.removeChild(stefanvdlightseye); } // remove it
					window.clearInterval(myVar);
				}, 3000);
			}
		}
	};
	window.addEventListener("keydown", keydownListener, false);
}

function removeKeyboardListener(){
	if(keydownListener){
		window.removeEventListener("keydown", keydownListener, false);
		keydownListener = null;
	}
}

// Listen for settings changes from options page (register immediately)
chrome.runtime.onMessage.addListener(function(request){
	if(request.action === "gorefreshshortcut"){
		chrome.storage.sync.get(["shortcutlight"], function(items){
			shortcutlight = items["shortcutlight"];
			removeKeyboardListener();
			if(shortcutlight == true){
				addKeyboardListener();
			}
		});
	}
});

// Load settings from storage
chrome.storage.sync.get(["shortcutlight", "interval", "eyea"], function(items){
	shortcutlight = items["shortcutlight"];
	interval = items["interval"];
	eyea = items["eyea"];

	if(shortcutlight == true){
		addKeyboardListener();
	}
});
