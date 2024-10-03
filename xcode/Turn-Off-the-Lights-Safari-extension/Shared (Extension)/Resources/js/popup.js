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

function action1(){ chrome.tabs.create({url: linkyoutube, active:true}); }
function action2(){ chrome.runtime.openOptionsPage(); }
function action3(){ chrome.tabs.create({url: linksupport, active:true}); }
function action4(){ chrome.tabs.create({url: linkguide, active:true}); }

function eventFunc(selector, event, callback){
	document.getElementById(selector).addEventListener(event, function(){
		callback();
	});
}

var darkmode;
document.addEventListener("DOMContentLoaded", function(){
	// disable context menu
	document.addEventListener("contextmenu", function(e){
		e.preventDefault();
	}, false);

	chrome.storage.sync.get(["darkmode"], function(items){
		darkmode = items["darkmode"]; if(darkmode == null)darkmode = 2; // default Operating System

		// dark mode
		if(darkmode == 1){
			document.body.className = "dark";
		}else if(darkmode == 0){
			document.body.className = "light";
		}else if(darkmode == 2){
			if(window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches){
				document.body.className = "dark";
			}else{
				document.body.className = "light";
			}
		}
	});

	eventFunc("opentrywebsite", "click", action1);
	eventFunc("openoptions", "click", action2);
	eventFunc("opensupport", "click", action3);
	eventFunc("openwelcomeguide", "click", action4);
});