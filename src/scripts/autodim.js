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

// Global variables
var autodim = null;
var autodimonly = null;
var autodimDomains = null;
var autodimdelay = null;
var autodimdelaytime = null;
var autodimchecklistwhite = null;
var autodimchecklistblack = null;
var autodimsize = null;
var autodimsizepixelheight = null;
var autodimsizepixelwidth = null;
var aplay = null;
var apause = null;
var astop = null;
var mousespotlights = null;
var godelay;
var gracePeriod = 250, lastEvent = null, timeout = null;

// inject script for autodim
function addautodimfile(){
	if(!document.getElementById("totlautodim")){
		var script = document.createElement("script"); script.id = "totlautodim"; script.type = "text/javascript"; script.src = chrome.runtime.getURL("scripts/video-player-status.js"); document.getElementsByTagName("head")[0].appendChild(script);
	}
}

function trigger(data){
	if(gracePeriod > 0 && (lastEvent === null || String(lastEvent).split(":")[0] === String(data).split(":")[0])){
		window.clearTimeout(timeout);
		timeout = window.setTimeout(function(){ dispatch(data); }, gracePeriod);
	}else{
		dispatch(data);
	}
}

function dispatch(data){
	if(data !== lastEvent){
		lastEvent = data;
		data = String(data).split(":");
		switch(data[0]){
		case"playerStateChange":
			// console.log("received playerStateChange", data[1]);
			if(data[1] === "2" || data[1] === "0" || data[1] === "-1" || data[1] === "5"){
				if((data[1] === "2" && apause == true) || (data[1] === "0" && astop == true)){ shadesOff(this.player); }
			}else{
				// play action is active
				if(aplay == true){ shadesOn(this.player); }
			}
			break;
		default:
			// console.log("unknown event", data);
			break;
		}
	}
}

function shadesOff(player){
	if(player !== null){
		var blackon = document.getElementById("stefanvdlightareoff1");
		if(autodimsize === false || checkActiveVideosHeight()){
			if(autodimdelay == true){
				var delaytime = autodimdelaytime * 1000;
				godelay = window.setTimeout(function(){
					if(blackon){ chrome.runtime.sendMessage({name: "automatic"}); }
					window.clearTimeout(godelay);
				}, delaytime);
			}else{
				if(blackon){ chrome.runtime.sendMessage({name: "automatic"}); }
			}
		}
	}
}

function shadesOn(player){
	if(player !== null){
		var blackon = document.getElementById("stefanvdlightareoff1");
		if(autodimsize === false || checkActiveVideosHeight()){
			if(blackon == null){ chrome.runtime.sendMessage({name: "automatic"}); }
			if(autodimdelay == true){
				try{ window.clearTimeout(godelay); }catch(e){ console.error(e); }
			}
		}
	}
}

function checkActiveVideosHeight(){
	if(autodimsize === true){
		// Check if any active video has a width and height greater than X pixels
		const videos = document.querySelectorAll("video");
		for(const video of videos){
			if(video.readyState > 2 && video.offsetHeight > autodimsizepixelheight && video.offsetWidth > autodimsizepixelwidth){
				return true; // Return true if an active video with width > X and height > X is found
			}
		}
	}
	return false; // Return false if no such video is found or autodimsize is not true
}

function autodimfunction(){
	var cinemahandler;
	var messagediv = document.getElementById("stefanvdcinemamessage");
	if(messagediv == null){
		// injected code messaging
		var message = document.createElement("div");
		var bt = document.getElementsByTagName("body"); if(!bt.length)return;
		message.setAttribute("id", "stefanvdcinemamessage");
		message.style.display = "none";
		if(!bt.length)return;
		bt[0].appendChild(message);
		cinemahandler = function(){
			var eventData = document.getElementById(message.id).textContent;
			trigger(eventData);
		};
		document.getElementById(message.id).addEventListener(message.id, cinemahandler, false);
	}
}

function runautodimcheck(){
	window.checkDomainFeature(autodim == true && mousespotlights != true, autodimDomains, autodimchecklistwhite, autodimchecklistblack, autodimonly, autodimfunction);
}

// Listen for settings changes from options page (register immediately)
chrome.runtime.onMessage.addListener(function(request){
	if(request.action === "gorefreshautodim"){
		chrome.storage.sync.get(["autodim", "mousespotlights", "autodimDomains", "autodimchecklistwhite", "autodimchecklistblack", "autodimonly", "aplay", "apause", "astop", "autodimdelay", "autodimdelaytime", "autodimsize", "autodimsizepixelheight", "autodimsizepixelwidth"], function(items){
			autodim = items["autodim"];
			mousespotlights = items["mousespotlights"];
			autodimDomains = items["autodimDomains"];
			autodimchecklistwhite = items["autodimchecklistwhite"];
			autodimchecklistblack = items["autodimchecklistblack"];
			autodimonly = items["autodimonly"];
			aplay = items["aplay"];
			apause = items["apause"];
			astop = items["astop"];
			autodimdelay = items["autodimdelay"];
			autodimdelaytime = items["autodimdelaytime"];
			autodimsize = items["autodimsize"];
			autodimsizepixelheight = items["autodimsizepixelheight"];
			autodimsizepixelwidth = items["autodimsizepixelwidth"];

			if(document.getElementById("totlautodim")){
				window.removeElement("totlautodim");
			}
			if(document.getElementById("stefanvdcinemamessage")){
				window.removeElement("stefanvdcinemamessage");
			}

			if(autodim == true){
				addautodimfile();
				runautodimcheck();
			}
		});
	}
});

// Load settings and start
chrome.storage.sync.get(["autodim", "mousespotlights", "autodimDomains", "autodimchecklistwhite", "autodimchecklistblack", "autodimonly", "aplay", "apause", "astop", "autodimdelay", "autodimdelaytime", "autodimsize", "autodimsizepixelheight", "autodimsizepixelwidth"], function(items){
	autodim = items["autodim"];
	mousespotlights = items["mousespotlights"];
	autodimDomains = items["autodimDomains"];
	autodimchecklistwhite = items["autodimchecklistwhite"];
	autodimchecklistblack = items["autodimchecklistblack"];
	autodimonly = items["autodimonly"];
	aplay = items["aplay"]; if(aplay == null)aplay = true;
	apause = items["apause"]; if(apause == null)apause = true;
	astop = items["astop"]; if(astop == null)astop = true;
	autodimdelay = items["autodimdelay"];
	autodimdelaytime = items["autodimdelaytime"];
	autodimsize = items["autodimsize"];
	autodimsizepixelheight = items["autodimsizepixelheight"]; if(autodimsizepixelheight == null)autodimsizepixelheight = 220;
	autodimsizepixelwidth = items["autodimsizepixelwidth"]; if(autodimsizepixelwidth == null)autodimsizepixelwidth = 250;

	runautodimcheck();

	if(autodim == true){
		addautodimfile();
	}
});