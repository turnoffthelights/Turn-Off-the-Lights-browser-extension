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

function $(id){ return document.getElementById(id); }

function rgbToHex(r, g, b){
	if(r > 255 || g > 255 || b > 255)
		throw"Invalid color component";
	return((r << 16) | (g << 8) | b).toString(16);
}

// Install on www.stefanvd.net
// Install on www.turnoffthelights.com
if(window.location.href.match(/^http(s)?:\/\/(www\.)?stefanvd.net/i) || window.location.href.match(/^http(s)?:\/\/(www\.)?turnoffthelights.com/i)){
	if($("turnoffthelights-" + exbrowser + "-install-button")){
		$("turnoffthelights-" + exbrowser + "-install-button").style.display = "none";
		$("turnoffthelights-" + exbrowser + "-thanks-button").style.display = "block";
	}
}

// settings
var autodim = null, eastereggs = null, shortcutlight = null, eyen = null, eyea = null, eyealist = null, excludedDomains = null, nighttime = null, begintime = null, endtime = null, ambilight = null, ambilightrangeblurradius = null, ambilightrangespreadradius = null, ambilightfixcolor = null, ambilightvarcolor = null, ambilightcolorhex = null, ambilight4color = null, ambilight1colorhex = null, ambilight2colorhex = null, ambilight3colorhex = null, ambilight4colorhex = null, ecosaver = null, ecosavertime = null, autodimonly = null, autodimDomains = null, interval = null, autowidthyoutube = null, customqualityyoutube = null, maxquality = null, atmosphereonly = null, atmosphereDomains = null, autodimdelay = null, autodimdelaytime = null, atmosvivid = null, autodimchecklistwhite = null, autodimchecklistblack = null, eyechecklistwhite = null, eyechecklistblack = null, no360youtube = null, videotool = null, reflection = null, reflectionamount = null, videotoolonly = null, videotoolDomains = null, videotoolchecklistwhite = null, videotoolchecklistblack = null, videovolume = null, videovolumecolor = null, videovolumesteps = null, videovolumelabel = null, visopacity = null, videotoolcolor = null, hovervideo = null, hovervideoamount = null, mousespotlights = null, drawatmosfps = null, aplay = null, apause = null, astop = null, videozoom = null, playrate = null, playrateamount = null, speedtoolbar = null, atmosontotlmode = null, vpause = null, videovolumeposa = null, videovolumeposb = null, videovolumeposc = null, videovolumehold = null, videovolumealt = null, atmosfpsauto = null, atmosfpsmanual = null, videovolumeonly = null, videovolumeDomains = null, videovolumechecklistwhite = null, videovolumechecklistblack = null, videovolumescrolla = null, videovolumescrollb = null, videovolumescrollc = null, videovolumeposd = null, videovolumepose = null, pipvisualtype = null, gamepad = null, gpleftstick = null, gprightstick = null, gpbtnx = null, gpbtno = null, gpbtnsquare = null, gpbtntriangle = null, gpbtnlb = null, gpbtnrb = null, gpbtnlt = null, gpbtnrt = null, gpbtnshare = null, gpbtnmenu = null, gpbtnrightstick = null, gpbtnleftstick = null, gpbtndirup = null, gpbtndirdown = null, gpbtndirleft = null, gpbtndirright = null, gpbtnlogo = null, gamepadonly = null, gamepadDomains = null, gamepadchecklistwhite = null, gamepadchecklistblack = null;
/* -------------------------------------------------- */
chrome.storage.sync.get(["autodim", "eastereggs", "shortcutlight", "eyen", "eyea", "eyealist", "excludedDomains", "nighttime", "begintime", "endtime", "ambilight", "ambilightrangeblurradius", "ambilightrangespreadradius", "ambilightfixcolor", "ambilightvarcolor", "ambilightcolorhex", "ambilight4color", "ambilight1colorhex", "ambilight2colorhex", "ambilight3colorhex", "ambilight4colorhex", "ecosaver", "ecosavertime", "autodimonly", "autodimDomains", "interval", "maxquality", "autowidthyoutube", "customqualityyoutube", "atmosphereonly", "atmosphereDomains", "autodimdelay", "autodimdelaytime", "atmosvivid", "autodimchecklistwhite", "autodimchecklistblack", "eyechecklistwhite", "eyechecklistblack", "no360youtube", "videotool", "reflection", "reflectionamount", "videotoolonly", "videotoolDomains", "videotoolchecklistwhite", "videotoolchecklistblack", "videovolume", "videovolumecolor", "videovolumesteps", "videovolumelabel", "visopacity", "videotoolcolor", "hovervideo", "hovervideoamount", "mousespotlights", "drawatmosfps", "aplay", "apause", "astop", "videozoom", "playrate", "playrateamount", "speedtoolbar", "atmosontotlmode", "vpause", "videovolumeposa", "videovolumeposb", "videovolumeposc", "videovolumehold", "videovolumealt", "atmosfpsauto", "atmosfpsmanual", "videovolumeonly", "videovolumeDomains", "videovolumechecklistwhite", "videovolumechecklistblack", "videovolumescrolla", "videovolumescrollb", "videovolumescrollc", "videovolumeposd", "videovolumepose", "pipvisualtype", "gamepad", "gpleftstick", "gprightstick", "gpbtnx", "gpbtno", "gpbtnsquare", "gpbtntriangle", "gpbtnlb", "gpbtnrb", "gpbtnlt", "gpbtnrt", "gpbtnshare", "gpbtnmenu", "gpbtnrightstick", "gpbtnleftstick", "gpbtndirup", "gpbtndirdown", "gpbtndirleft", "gpbtndirright", "gpbtnlogo", "gamepadonly", "gamepadDomains", "gamepadchecklistwhite", "gamepadchecklistblack"], function(response){
	autodim = response["autodim"];
	eastereggs = response["eastereggs"];
	shortcutlight = response["shortcutlight"];
	eyen = response["eyen"];
	eyea = response["eyea"];
	eyealist = response["eyealist"];
	excludedDomains = response["excludedDomains"];
	nighttime = response["nighttime"];
	begintime = response["begintime"];
	endtime = response["endtime"];
	ambilight = response["ambilight"];
	ambilightrangeblurradius = response["ambilightrangeblurradius"];
	ambilightrangespreadradius = response["ambilightrangespreadradius"];
	ambilightfixcolor = response["ambilightfixcolor"];
	ambilightvarcolor = response["ambilightvarcolor"];
	ambilightcolorhex = response["ambilightcolorhex"]; if(ambilightcolorhex == null)ambilightcolorhex = "#47C2FF";
	ambilight4color = response["ambilight4color"];
	ambilight1colorhex = response["ambilight1colorhex"]; if(ambilight1colorhex == null)ambilight1colorhex = "#FF0000";
	ambilight2colorhex = response["ambilight2colorhex"]; if(ambilight2colorhex == null)ambilight2colorhex = "#FFEE00";
	ambilight3colorhex = response["ambilight3colorhex"]; if(ambilight3colorhex == null)ambilight3colorhex = "#00FF00";
	ambilight4colorhex = response["ambilight4colorhex"]; if(ambilight4colorhex == null)ambilight4colorhex = "#0000FF";
	ecosaver = response["ecosaver"];
	ecosavertime = response["ecosavertime"];
	autodimonly = response["autodimonly"];
	autodimDomains = response["autodimDomains"];
	interval = response["interval"];
	maxquality = response["maxquality"];
	autowidthyoutube = response["autowidthyoutube"];
	customqualityyoutube = response["customqualityyoutube"];
	atmosphereonly = response["atmosphereonly"];
	atmosphereDomains = response["atmosphereDomains"];
	autodimdelay = response["autodimdelay"];
	autodimdelaytime = response["autodimdelaytime"];
	atmosvivid = response["atmosvivid"];
	autodimchecklistwhite = response["autodimchecklistwhite"];
	autodimchecklistblack = response["autodimchecklistblack"];
	eyechecklistwhite = response["eyechecklistwhite"];
	eyechecklistblack = response["eyechecklistblack"];
	no360youtube = response["no360youtube"];
	videotool = response["videotool"];
	reflection = response["reflection"];
	reflectionamount = response["reflectionamount"];
	videotoolonly = response["videotoolonly"];
	videotoolDomains = response["videotoolDomains"];
	videotoolchecklistwhite = response["videotoolchecklistwhite"];
	videotoolchecklistblack = response["videotoolchecklistblack"];
	videovolume = response["videovolume"];
	videovolumecolor = response["videovolumecolor"]; if(videovolumecolor == null)videovolumecolor = "#167ac6";
	videovolumesteps = response["videovolumesteps"]; if(videovolumesteps == null)videovolumesteps = 5;
	videovolumelabel = response["videovolumelabel"]; if(videovolumelabel == null)videovolumelabel = true;
	visopacity = response["visopacity"]; if(visopacity == null)visopacity = 80;
	videotoolcolor = response["videotoolcolor"]; if(videotoolcolor == null)videotoolcolor = "#000000";
	hovervideo = response["hovervideo"];
	hovervideoamount = response["hovervideoamount"]; if(hovervideoamount == null)hovervideoamount = 3;
	mousespotlights = response["mousespotlights"];
	drawatmosfps = response["drawatmosfps"]; if(drawatmosfps == null)drawatmosfps = 12;
	aplay = response["aplay"]; if(aplay == null)aplay = true;
	apause = response["apause"]; if(apause == null)apause = true;
	astop = response["astop"]; if(astop == null)astop = true;
	videozoom = response["videozoom"];
	playrate = response["playrate"];
	playrateamount = response["playrateamount"]; if(playrateamount == null)playrateamount = 1;
	speedtoolbar = response["speedtoolbar"];
	atmosontotlmode = response["atmosontotlmode"];
	vpause = response["vpause"];
	videovolumeposa = response["videovolumeposa"];
	videovolumeposb = response["videovolumeposb"];
	videovolumeposc = response["videovolumeposc"];
	videovolumehold = response["videovolumehold"];
	videovolumealt = response["videovolumealt"];
	atmosfpsauto = response["atmosfpsauto"]; if(atmosfpsauto == null)atmosfpsauto = false;
	atmosfpsmanual = response["atmosfpsmanual"]; if(atmosfpsmanual == null)atmosfpsmanual = true;
	videovolumeonly = response["videovolumeonly"];
	videovolumeDomains = response["videovolumeDomains"];
	videovolumechecklistwhite = response["videovolumechecklistwhite"];
	videovolumechecklistblack = response["videovolumechecklistblack"];
	videovolumescrolla = response["videovolumescrolla"]; if(videovolumescrolla == null)videovolumescrolla = true;
	videovolumescrollb = response["videovolumescrollb"]; if(videovolumescrollb == null)videovolumescrollb = false;
	videovolumescrollc = response["videovolumescrollc"]; if(videovolumescrollc == null)videovolumescrollc = false;
	videovolumeposd = response["videovolumeposd"];
	videovolumepose = response["videovolumepose"];
	pipvisualtype = response["pipvisualtype"]; if(pipvisualtype == null)pipvisualtype = 1;
	gamepad = response["gamepad"];
	gpleftstick = response["gpleftstick"]; if(gpleftstick == null)gpleftstick = 0;
	gprightstick = response["gprightstick"]; if(gprightstick == null)gprightstick = 1;
	gpbtnx = response["gpbtnx"]; if(gpbtnx == null)gpbtnx = 0;
	gpbtno = response["gpbtno"]; if(gpbtno == null)gpbtno = 1;
	gpbtnsquare = response["gpbtnsquare"]; if(gpbtnsquare == null)gpbtnsquare = 2;
	gpbtntriangle = response["gpbtntriangle"]; if(gpbtntriangle == null)gpbtntriangle = 3;
	gpbtnlb = response["gpbtnlb"]; if(gpbtnlb == null)gpbtnlb = 4;
	gpbtnrb = response["gpbtnrb"]; if(gpbtnrb == null)gpbtnrb = 5;
	gpbtnlt = response["gpbtnlt"]; if(gpbtnlt == null)gpbtnlt = 6;
	gpbtnrt = response["gpbtnrt"]; if(gpbtnrt == null)gpbtnrt = 7;
	gpbtnshare = response["gpbtnshare"]; if(gpbtnshare == null)gpbtnshare = 8;
	gpbtnmenu = response["gpbtnmenu"]; if(gpbtnmenu == null)gpbtnmenu = 9;
	gpbtnrightstick = response["gpbtnrightstick"]; if(gpbtnrightstick == null)gpbtnrightstick = 10;
	gpbtnleftstick = response["gpbtnleftstick"]; if(gpbtnleftstick == null)gpbtnleftstick = 10;
	gpbtndirup = response["gpbtndirup"]; if(gpbtndirup == null)gpbtndirup = 11;
	gpbtndirdown = response["gpbtndirdown"]; if(gpbtndirdown == null)gpbtndirdown = 12;
	gpbtndirleft = response["gpbtndirleft"]; if(gpbtndirleft == null)gpbtndirleft = 13;
	gpbtndirright = response["gpbtndirright"]; if(gpbtndirright == null)gpbtndirright = 14;
	gpbtnlogo = response["gpbtnlogo"]; if(gpbtnlogo == null)gpbtnlogo = 15;
	gamepadonly = response["gamepadonly"];
	gamepadDomains = response["gamepadDomains"];
	gamepadchecklistwhite = response["gamepadchecklistwhite"];
	gamepadchecklistblack = response["gamepadchecklistblack"];

	// inject script for autodim
	function addautodimfile(){
		if(!document.getElementById("totlautodim")){
			var script = document.createElement("script"); script.id = "totlautodim"; script.type = "text/javascript"; script.src = chrome.runtime.getURL("js/video-player-status.js"); document.getElementsByTagName("head")[0].appendChild(script);
		}
	}

	if(autodim == true){
		addautodimfile();
	}

	var MutationObserver = window.MutationObserver || window.WebKitMutationObserver || window.MozMutationObserver;
	// observeDOM - dynamic check
	var observeDOM = (function(){
		var eventListenerSupported = window.addEventListener;

		return function(obj, callback){
			if(MutationObserver){
				// define a new observer
				var obs = new MutationObserver(function(mutations){
					if(mutations[0].addedNodes.length || mutations[0].removedNodes.length)
						callback();
				});
				// have the observer observe foo for changes in children
				obs.observe(obj, {childList:true, subtree:true});
			}else if(eventListenerSupported){
				obj.addEventListener("DOMNodeInserted", callback, false);
				obj.addEventListener("DOMNodeRemoved", callback, false);
			}
		};
	})();

	function hexToRGB(hex, alpha){
		var r = parseInt(hex.slice(1, 3), 16),
			g = parseInt(hex.slice(3, 5), 16),
			b = parseInt(hex.slice(5, 7), 16);

		if(alpha){
			return"rgba(" + r + ", " + g + ", " + b + ", " + alpha + ")";
		}else{
			return"rgb(" + r + ", " + g + ", " + b + ")";
		}
	}

	// animation browser engine
	window.requestAnimFrame = function(){
		return(
			window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame ||
        function(/* function */ callback){ window.setTimeout(callback, 1000 / 30); } // 33.33
		);
	}();

	let redirectionHosts = [linkredirectionoptions];
	if(redirectionHosts.includes(window.location.href)){
		if($("allowpermission")){
			$("allowpermission").className = "";
			chrome.runtime.sendMessage({name: "redirectionoptions"});
		}
		if($("disallowpermission")){
			$("disallowpermission").className = "hidden";
		}
	}

	// Shortcutlight
	window.addEventListener("keydown", function(e){
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
				var eyestatus;

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

	}, false);
	window.addEventListener("keypress", function(e){
		// press the key t
		if(e.key == "t"){
			gogotheater();
		}
	}, false);

	var startautodim;
	function autodimfunction(){
		var gracePeriod = 250, lastEvent = null, timeout = null;

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
						if(data[1] === "0"){
							try{
								// playerReset(this.player);
								// playerStop(this.player);
								playerPause(this.player);
							}catch(e){ console.error(e); }
						}
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

		function playerPause(player){
			if(player !== null){
				if(typeof(player.pauseVideo) === "function"){
					player.pauseVideo();
				}else if(typeof(player.pause) === "function"){
					player.pause();
				}
			}
		}
		function playerReady(player){
			this.player = player;
			// this.playerPause(player);
			// this.playerReset(player);
		}
		/* function playerReset(player){
			if(player !== null){
				if(typeof(player.seekTo) === "function"){
					player.seekTo(0, false);
				}else if(typeof(player.currentTime) !== "undefined"){
					player.currentTime = 0;
				}
			}
		}
		function playerStop(player){
			if(player !== null){
				if(typeof(player.stopVideo) === "function"){
					player.stopVideo();
				}else if(typeof(player.pause) === "function"){
					player.pause();
				}
			}
		}*/
		var godelay;
		function shadesOff(player){
			if(player !== null){
				var blackon = $("stefanvdlightareoff1");
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
		function shadesOn(player){
			if(player !== null){
				var blackon = $("stefanvdlightareoff1");
				if(blackon == null){ chrome.runtime.sendMessage({name: "automatic"}); }
				if(autodimdelay == true){
					try{ window.clearTimeout(godelay); }catch(e){ console.error(e); }
				}
			}
		}

		// player ready check
		startautodim = window.setInterval(function(){
			try{
				var youtubeplayer = $("movie_player") || null;
				var htmlplayer = document.getElementsByTagName("video") || null;

				// check first for the HTML5 player
				// if nothing then try the flash for YouTube
				if(htmlplayer !== null){ // html5 video elements
					var j;
					var l = htmlplayer.length;
					for(j = 0; j < l; j++){
						if(htmlplayer[j].pause){ playerReady(htmlplayer[j]); }
					}
				}else{
					if(youtubeplayer !== null){ // youtube video element
						if(youtubeplayer.pauseVideo){ playerReady(youtubeplayer); }
					}
				}
			}catch(e){ console.log(e); } // I see nothing, that is good
		}, 1000); // 1000 refreshing it

		var cinemahandler;
		var messagediv = $("stefanvdcinemamessage");
		if(messagediv == null){
			// injected code messaging
			var message = document.createElement("div");
			var bt = document.getElementsByTagName("body"); if(!bt.length)return;
			message.setAttribute("id", "stefanvdcinemamessage");
			message.style.display = "none";
			if(!bt.length)return;
			bt[0].appendChild(message);
			cinemahandler = function(){
				var eventData = $(message.id).textContent;
				trigger(eventData);
			};
			$(message.id).addEventListener(message.id, cinemahandler, false);
		}
	}

	function checkregdomaininside(thaturl, websiteurl){
		// regex test
		var rxUrlSplit = /((?:http|ftp)s?):\/\/([^/]+)(\/.*)?/;
		var prepUrl = ""; var m;
		if((m = thaturl.match(rxUrlSplit)) !== null){
			prepUrl = m[1] + "://" + m[2].replace(/[?()[\]\\.+^$|]/g, "\\$&").replace(/\*\\./g, "(?:[^/]*\\.)*").replace(/\*$/, "[^/]*");
			if(m[3]){
				prepUrl += m[3].replace(/[?()[\]\\.+^$|]/g, "\\$&").replace(/\/\*(?=$|\/)/g, "(?:/[^]*)?");
			}
		}
		if(prepUrl){
			// console.log(prepUrl); // ^http://(?:[^/]*\.)*google\.com(?:/[^]*)?$
			if(websiteurl.match(RegExp("^" + prepUrl + "$", "i"))){
				return true;
			}else{
				return false;
			}
		}
		return false;
	}

	function runautodimcheck(){
		if(autodim == true && mousespotlights != true){
			if(autodimonly == true){
				var currenturl = window.location.protocol + "//" + window.location.host;
				var blackrabbit = false;
				if(typeof autodimDomains == "string"){
					autodimDomains = JSON.parse(autodimDomains);
					var abuf = [];
					var domain;
					for(domain in autodimDomains)
						abuf.push(domain);
					abuf.sort();
					var i;
					var l = abuf.length;
					for(i = 0; i < l; i++){
						if(autodimchecklistwhite == true){
							if(abuf[i].includes("*")){
								// regex test
								if(checkregdomaininside(abuf[i], currenturl) == true){
									autodimfunction();
								}
							}else{
								// regular text
								if(currenturl == abuf[i]){ autodimfunction(); }
							}
						}else if(autodimchecklistblack == true){
							if(abuf[i].includes("*")){
								// regex test
								if(checkregdomaininside(abuf[i], currenturl) == true){
									blackrabbit = true;
								}
							}else{
								// regular text
								if(currenturl == abuf[i]){ blackrabbit = true; }
							}
						}
					}
				}
				if(autodimchecklistblack == true && blackrabbit == false){ autodimfunction(); }
			}else{ autodimfunction(); }
		} // option autodim on end
	}
	runautodimcheck();

	// general ID for each HTML5 video player
	function adddatavideo(){
		var volumevideos = document.getElementsByTagName("video");
		var i;
		var l = volumevideos.length;
		for(i = 0; i < l; i++){
			var myElement = document.getElementsByTagName("video")[i];
			if(myElement.hasAttribute("data-video")){
				myElement.removeAttribute("data-video");
			}
			myElement.setAttribute("data-video", i);
		}
	}
	adddatavideo();

	var vzoom = [];
	var vrotate = [];

	function runvideotoolbarcheck(){
		if(videotool == true || gamepad == true){
			if(videotoolonly == true){
				var currenturl = window.location.protocol + "//" + window.location.host;
				var videotoolrabbit = false;
				if(typeof videotoolDomains == "string"){
					videotoolDomains = JSON.parse(videotoolDomains);
					var vtbbuf = [], domain;
					for(domain in videotoolDomains)
						vtbbuf.push(domain);
					vtbbuf.sort();
					var i, l = vtbbuf.length;
					for(i = 0; i < l; i++){
						if(videotoolchecklistwhite == true){
							if(vtbbuf[i].includes("*")){
								// regex test
								if(checkregdomaininside(vtbbuf[i], currenturl) == true){
									videotoolfunction();
								}
							}else{
								// regular text
								if(currenturl == vtbbuf[i]){
									videotoolfunction();
								}
							}
						}else if(videotoolchecklistblack == true){
							if(vtbbuf[i].includes("*")){
								// regex test
								if(checkregdomaininside(vtbbuf[i], currenturl) == true){
									videotoolrabbit = true;
								}
							}else{
								if(currenturl == vtbbuf[i]){
									videotoolrabbit = true;
								}
							}
						}
					}
				}
				if(videotoolchecklistblack == true && videotoolrabbit == false){ videotoolfunction(); }
			}else{ videotoolfunction(); }
		} // option videotool on end
	}
	runvideotoolbarcheck();

	var audiocontext = [];
	var analyser = [];
	var vissources = [];
	var visualnumber = [];
	var AudioContext = window.AudioContext || window.webkitAudioContext;

	var myListenerWithContext;
	var observervideotoolbar;
	function videotoolfunction(){
		// HTML5 video visualization
		// Videotool filters
		visopacity = visopacity / 100;
		var blockarray, bars, barx, barwidth, barheight;

		var vis; var tempvis = 0;
		var dovisenable = function(){
			vis = this.getAttribute("data-video");
			tempvis = parseInt(vis);

			if(visualnumber[tempvis] == undefined){
				visualnumber[tempvis] = 1;
			}

			if(typeof audiocontext[vis] == "undefined"){
			// I am new now
				audiocontext = new AudioContext();
				audiocontext[vis] = audiocontext;
				analyser[vis] = audiocontext[vis].createAnalyser();
			}
			var myElement = document.getElementsByTagName("video")[tempvis];

			// Fix Chrome 71
			audiocontext[vis].resume().then(() =>{
			// console.log("Turn Off the Lights - Visualization resumed successfully");
			// refresh the visualization
				if(typeof audiocontext[tempvis] != "undefined"){
					if(vissources[tempvis] == undefined){
						try{
							vissources[tempvis] = audiocontext[tempvis].createMediaElementSource(myElement);
							vissources[tempvis].connect(analyser[tempvis]);
						}catch(e){ console.error(e); }
					}
					analyser[tempvis].connect(audiocontext[tempvis].destination);
				}
			});

			if(document.getElementById("stefanvdvisualizationcanvas" + tempvis).style.display == "none"){
				document.getElementById("stefanvdvisualizationcanvas" + tempvis).style.display = "block";

				analyser[tempvis].wave = new Uint8Array(analyser[tempvis].frequencyBinCount * 2);
				analyser[tempvis].freq = new Uint8Array(analyser[tempvis].frequencyBinCount);
				videovisualloop(tempvis);
			}else{
				document.getElementById("stefanvdvisualizationcanvas" + tempvis).style.display = "none";
				// analyser.disconnect();
				// source.disconnect(audiocontext.destination);
				// source = null;
				window.cancelAnimationFrame(requestvideovisualloop[vis]);
				window.clearInterval(timeloop);
			}
		};

		var dovischoose = function(){
			var shark = this.getAttribute("data-video");
			if(document.getElementById("stefanvdvisualizationcanvas" + shark).style.display != "none"){
				if(visualnumber[shark] >= 3){ visualnumber[shark] = 0; }
				visualnumber[shark] = visualnumber[shark] + 1;
			}
		};

		var elementonevideo;
		var elementvisa;
		var currentviswidth;
		var currentvisheight;
		var currentvistop;
		var currentvisleft;
		var currentvisbottom;
		var currentvisright;
		var currentvisdisplay;
		var currentbarwidthvisualization;
		var currentbartopvisualization;
		var currentbarleftvisualization;

		var currentbarwidthzoomcanvas;
		var currentbarheightzoomcanvas;

		var currentbarleftzoomstage;
		var currentbartopzoomstage;
		var currentbarwidthzoomstage;
		var currentbarheightzoomstage;

		var currentbarleftzoom;
		var currentbartopzoom;
		var currentbarwidthzoom;
		var currentbarheightzoom;

		var currentbarleftspeed;
		var currentbartopspeed;
		var currentbarwidthspeed;
		var currentbarheightspeed;

		var dovisfull = function(potvis){
			elementonevideo = document.getElementsByTagName("video")[potvis];
			elementvisa = document.getElementById("stefanvdvisualizationcanvas" + potvis);
			if(elementonevideo.classList.contains("stefanvdvideowindow")){
				elementvisa.style.position = "absolute";
				elementvisa.style.width = currentviswidth;
				elementvisa.style.height = currentvisheight;
				elementvisa.style.top = currentvistop;
				elementvisa.style.left = currentvisleft;
				elementvisa.style.bottom = currentvisbottom;
				elementvisa.style.right = currentvisright;
				elementvisa.style.display = currentvisdisplay;
				document.getElementById("stefanvdvispanel" + potvis).style.cssText = "background:" + hexToRGB(videotoolcolor, 0.4) + ";width:" + currentbarwidthvisualization + "!important;top:" + currentbartopvisualization + "!important;left:" + currentbarleftvisualization + "!important;position:absolute!important";

				if(videozoom == true){
					document.getElementById("stefanvdzoomcanvas" + potvis).width = currentbarwidthzoomcanvas;
					document.getElementById("stefanvdzoomcanvas" + potvis).height = currentbarheightzoomcanvas;
					document.getElementById("stefanvdzoomstage" + potvis).style.cssText = "background:black;width:" + currentbarwidthzoomstage + "!important;height:" + currentbarheightzoomstage + ";top:" + currentbartopzoomstage + "!important;left:" + currentbarleftzoomstage + "!important;position:absolute!important;display:none";
					document.getElementById("stefanvdzoompanel" + potvis).style.cssText = "background:" + hexToRGB(videotoolcolor, 0.4) + ";width:" + currentbarwidthzoom + "!important;height:" + currentbarheightzoom + ";top:" + currentbartopzoom + "!important;left:" + currentbarleftzoom + "!important;position:absolute!important;padding-top:40px";
				}

				if(speedtoolbar == true){
					document.getElementById("stefanvdspeedpanel" + potvis).style.cssText = "background:" + hexToRGB(videotoolcolor, 0.4) + ";width:" + currentbarwidthspeed + "!important;height:" + currentbarheightspeed + ";top:" + currentbartopspeed + "!important;left:" + currentbarleftspeed + "!important;position:absolute!important;padding-top:40px";
				}
			}else{
				currentviswidth = elementvisa.style.width;
				currentvisheight = elementvisa.style.height;
				currentvistop = elementvisa.style.top;
				currentvisleft = elementvisa.style.left;
				currentvisbottom = elementvisa.style.bottom;
				currentvisright = elementvisa.style.right;
				currentvisdisplay = elementvisa.style.display;
				elementvisa.style.position = "fixed";
				elementvisa.style.width = "100%";
				elementvisa.style.height = "100%";
				elementvisa.style.top = 0;
				elementvisa.style.left = 0;
				elementvisa.style.bottom = 0;
				elementvisa.style.right = 0;
				currentbarwidthvisualization = document.getElementById("stefanvdvispanel" + potvis).style.width;
				currentbartopvisualization = document.getElementById("stefanvdvispanel" + potvis).style.top;
				currentbarleftvisualization = document.getElementById("stefanvdvispanel" + potvis).style.left;
				document.getElementById("stefanvdvispanel" + potvis).style.cssText = "background:" + hexToRGB(videotoolcolor, 0.4) + ";width:100%!important;top:0!important;left:0!important;position:fixed!important";

				if(videozoom == true){
					currentbarwidthzoomcanvas = document.getElementById("stefanvdzoomcanvas" + potvis).width;
					currentbarheightzoomcanvas = document.getElementById("stefanvdzoomcanvas" + potvis).height;

					currentbarleftzoomstage = document.getElementById("stefanvdzoomstage" + potvis).style.left;
					currentbartopzoomstage = document.getElementById("stefanvdzoomstage" + potvis).style.top;
					currentbarwidthzoomstage = document.getElementById("stefanvdzoomstage" + potvis).style.width;
					currentbarheightzoomstage = document.getElementById("stefanvdzoomstage" + potvis).style.height;

					currentbarleftzoom = document.getElementById("stefanvdzoompanel" + potvis).style.left;
					currentbartopzoom = document.getElementById("stefanvdzoompanel" + potvis).style.top;
					currentbarwidthzoom = document.getElementById("stefanvdzoompanel" + potvis).style.width;
					currentbarheightzoom = document.getElementById("stefanvdzoompanel" + potvis).style.height;
				}

				if(speedtoolbar == true){
					currentbarleftspeed = document.getElementById("stefanvdspeedpanel" + potvis).style.left;
					currentbartopspeed = document.getElementById("stefanvdspeedpanel" + potvis).style.top;
					currentbarwidthspeed = document.getElementById("stefanvdspeedpanel" + potvis).style.width;
					currentbarheightspeed = document.getElementById("stefanvdspeedpanel" + potvis).style.height;
				}
			}

			// Fix for the 3rd visualization size
			var w = elementvisa.width = elementvisa.clientWidth;
			var h = elementvisa.height = elementvisa.clientHeight;
			if(buffer1[potvis]){
				buffer1[potvis].width = w;
				buffer1[potvis].height = h;
				buffer2[potvis].width = w;
				buffer2[potvis].height = h;
			}
		};

		var rock;
		var currentvideostepfilter = 0;
		var filtertype = "normal";

		var videowindow = false;
		var checktheatermode;
		var initialtheatermode = false;
		var thatPrevControlEnabled = false;

		var timeout;

		var i18ntitelvideotoolnormal = chrome.i18n.getMessage("titelvideotoolnormal");
		var i18ntitelvideotoolgrayscale = chrome.i18n.getMessage("titelvideotoolgrayscale");
		var i18ntitelvideotoolsepia = chrome.i18n.getMessage("titelvideotoolsepia");
		var i18ntitelvideotoolinvert = chrome.i18n.getMessage("titelvideotoolinvert");
		var i18ntitelvideotoolcontrast = chrome.i18n.getMessage("titelvideotoolcontrast");
		var i18ntitelvideotoolsaturate = chrome.i18n.getMessage("titelvideotoolsaturate");
		var i18ntitelvideotoolhueroration = chrome.i18n.getMessage("titelvideotoolhueroration");
		var i18ntitelvideotoolbrightness = chrome.i18n.getMessage("titelvideotoolbrightness");
		var i18ntitelvisenable = chrome.i18n.getMessage("titelvisenable");
		var i18ntitelvischoose = chrome.i18n.getMessage("titelvischoose");
		var i18ntitelvisblocks = chrome.i18n.getMessage("titelvisblocks");
		var i18ntitelvisfrequency = chrome.i18n.getMessage("titelvisfrequency");
		var i18ntitelvistunnel = chrome.i18n.getMessage("titelvistunnel");
		var i18ntitelvideotoolsubscribe = chrome.i18n.getMessage("titelvideotoolsubscribe");
		var i18ntitelvideotoollike = chrome.i18n.getMessage("titelvideotoollike");
		var i18ntitelvideotoolrepeat = chrome.i18n.getMessage("titelvideotoolrepeat");
		var i18ntitelon = chrome.i18n.getMessage("titelon");
		var i18ntiteloff = chrome.i18n.getMessage("titeloff");
		var i18ntitelvideotoolfilter = chrome.i18n.getMessage("titelvideotoolfilter");
		var i18ntitelvideotoolfullwindow = chrome.i18n.getMessage("titelvideotoolfullwindow");
		var i18ntitelvideotoolscreenshot = chrome.i18n.getMessage("titelvideotoolscreenshot");

		function settoolbarrange(item, array){
			item.step = array[0];
			item.min = array[1];
			item.max = array[2];
			item.value = array[3];
		}

		var intervalRewind;
		function rewind(rewindSpeed, v){
			var onevideo = document.getElementsByTagName("video")[v];
			window.clearInterval(intervalRewind);
			var startSystemTime = new Date().getTime();
			var startVideoTime = onevideo.currentTime;

			intervalRewind = window.setInterval(function(){
				onevideo.playbackRate = 1.0;
				if(onevideo.currentTime == 0){
					window.clearInterval(intervalRewind);
					onevideo.pause();
				}else{
					var elapsed = new Date().getTime() - startSystemTime;
					onevideo.currentTime = Math.max(startVideoTime - elapsed * rewindSpeed / 1000.0, 0);
				}
			}, 30);
		}

		function playrate(num, rate){
			var onevideo = document.getElementsByTagName("video")[num];
			window.clearInterval(intervalRewind);
			onevideo.playbackRate = rate;
			if(onevideo.paused)onevideo.play();
		}

		function stefanvdblockstatus(a, b, c){
			document.getElementById(a + b).style.display = c;
		}

		function changevideotoolbarrange(){
			var brownvis = this.getAttribute("data-video");
			var onevideo = document.getElementsByTagName("video")[brownvis];
			var gsvtrange = document.getElementById("stefanvdvideotoolrange" + brownvis).value;
			if(filtertype == "grayscale"){ onevideo.style.webkitFilter = "" + filtertype + "(" + gsvtrange + ")"; }else if(filtertype == "sepia"){ onevideo.style.webkitFilter = "" + filtertype + "(" + gsvtrange + ")"; }else if(filtertype == "invert"){ onevideo.style.webkitFilter = "" + filtertype + "(" + gsvtrange + ")"; }else if(filtertype == "contrast"){ onevideo.style.webkitFilter = "" + filtertype + "(" + gsvtrange + ")"; }else if(filtertype == "saturate"){ onevideo.style.webkitFilter = "" + filtertype + "(" + gsvtrange + ")"; }else if(filtertype == "hue-rotate"){ onevideo.style.webkitFilter = "" + filtertype + "(" + gsvtrange + "deg)"; }else if(filtertype == "brightness"){ onevideo.style.webkitFilter = "" + filtertype + "(" + gsvtrange + ")"; }
		}

		function hideshowdiv(a, b){
			if(document.getElementById(a)){
				document.getElementById(a).style.display = b;
			}
		}

		function videoframestep(){
			rock = this.getAttribute("data-video");
			if($("stefanvdzoomcanvas" + rock)){
				if(!this.paused && !this.ended){
					if($("stefanvdzoomplay" + rock)){ $("stefanvdzoomplay" + rock).textContent = "❙❙"; }
					zoompaused[rock] = false;
					window.requestAnimFrame(function(){ drawframezoom(rock); });
				}else{
					if($("stefanvdzoomplay" + rock)){ $("stefanvdzoomplay" + rock).textContent = "►"; }
					zoompaused[rock] = true;
				}
			}
		}

		function addvisual(){
			var visualvideos = document.getElementsByTagName("video");
			var i, l = visualvideos.length;
			for(i = 0; i < l; i++){
				var myElement = document.getElementsByTagName("video")[i];

				var visposition = getPosition(myElement);
				var tempwidthvideo = myElement.offsetWidth;
				var tempheightvideo = myElement.offsetHeight;

				myElement.addEventListener("pointerover", function(){
					rock = this.getAttribute("data-video");
					hideshowdiv("stefanvdvispanel" + rock, "block");
					if(this.classList.contains("stefanvdvideowindow")){
						hideshowdiv("stefanvdzoompanel" + rock, "none");
						hideshowdiv("stefanvdspeedpanel" + rock, "none");
					}else{
						hideshowdiv("stefanvdzoompanel" + rock, "block");
						hideshowdiv("stefanvdspeedpanel" + rock, "block");
					}
				}, false);

				myElement.addEventListener("pointerout", function(){
					hideshowdiv("stefanvdvispanel" + rock, "none");
					hideshowdiv("stefanvdzoompanel" + rock, "none");
					hideshowdiv("stefanvdspeedpanel" + rock, "none");
				}, false);

				// var tempvisscrollleft = window.pageXOffset || document.documentElement.scrollLeft;
				// var tempvisscrolltop = window.pageYOffset || document.documentElement.scrollTop;

				//---
				vzoom[i] = 1; vrotate[i] = 0;
				if(videozoom == true){
					var newzoompanel = document.createElement("div");
					newzoompanel.setAttribute("id", "stefanvdzoompanel" + i);
					newzoompanel.setAttribute("class", "stefanvdzoom");
					newzoompanel.style.position = "absolute";
					newzoompanel.style.background = hexToRGB(videotoolcolor, 0.4);
					newzoompanel.style.display = "none";// default not visible
					newzoompanel.style.top = visposition.y + "px";
					newzoompanel.style.left = tempwidthvideo + visposition.x + "px";
					newzoompanel.style.width = "62px";
					newzoompanel.style.height = tempheightvideo - 40 + "px";
					newzoompanel.style.paddingTop = "40px";
					newzoompanel.addEventListener("pointerover", function(){
						stefanvdblockstatus("stefanvdzoompanel", rock, "block");
					}, false);
					newzoompanel.addEventListener("pointerout", function(){
						stefanvdblockstatus("stefanvdzoompanel", rock, "none");
					}, false);
					document.body.appendChild(newzoompanel);
				}
				if(videozoom == true || gamepad == true){
					// Begin zoom canvas ---
					var newzoomstage = document.createElement("div");
					newzoomstage.setAttribute("id", "stefanvdzoomstage" + i);
					newzoomstage.setAttribute("class", "stefanvdzoomstage");
					newzoomstage.setAttribute("data-video", i);
					newzoomstage.style.background = "black";
					newzoomstage.style.position = "absolute";
					newzoomstage.style.display = "none";// default not visible
					newzoomstage.style.top = visposition.y + "px";
					newzoomstage.style.left = visposition.x + "px";
					newzoomstage.style.width = tempwidthvideo + "px";
					newzoomstage.style.height = tempheightvideo + "px";
					document.body.appendChild(newzoomstage);

					var newzoomcanvas = document.createElement("canvas");
					newzoomcanvas.setAttribute("id", "stefanvdzoomcanvas" + i);
					newzoomcanvas.setAttribute("class", "stefanvdzoomcanvas");
					newzoomcanvas.setAttribute("data-video", i);
					newzoomcanvas.style.position = "absolute";
					newzoomcanvas.style.width = tempwidthvideo + "px";
					newzoomcanvas.style.height = tempheightvideo + "px";
					newzoomcanvas.style.top = 0 + "px";
					newzoomcanvas.style.left = 0 + "px";
					newzoomcanvas.width = tempwidthvideo;
					newzoomcanvas.height = tempheightvideo;
					newzoomstage.appendChild(newzoomcanvas);

					myElement.addEventListener("playing", videoframestep, 0);
					myElement.addEventListener("pause", videoframestep, 0);
					// End zoom canvas ---

					if(newzoompanel){
						var newzoombuttonplus = document.createElement("div");
						newzoombuttonplus.textContent = "+";
						newzoombuttonplus.accessKey = "i";
						newzoombuttonplus.title = "ctrl+alt+i";
						newzoombuttonplus.setAttribute("data-video", i);
						newzoombuttonplus.addEventListener("click", function(){
							camerazoomrotate(this.getAttribute("data-video"), + 0.05, "");
						}, false);
						newzoompanel.appendChild(newzoombuttonplus);

						var newzoombuttonmin = document.createElement("div");
						newzoombuttonmin.textContent = "-";
						newzoombuttonmin.accessKey = "o";
						newzoombuttonmin.title = "ctrl+alt+o";
						newzoombuttonmin.setAttribute("data-video", i);
						newzoombuttonmin.addEventListener("click", function(){
							camerazoomrotate(this.getAttribute("data-video"), -0.05, "");
						}, false);
						newzoompanel.appendChild(newzoombuttonmin);

						var newzoombuttonleft = document.createElement("div");
						newzoombuttonleft.textContent = "⇠";
						newzoombuttonleft.accessKey = "l";
						newzoombuttonleft.title = "ctrl+alt+l";
						newzoombuttonleft.setAttribute("data-video", i);
						newzoombuttonleft.addEventListener("click", function(){
							zoompaddirection(this.getAttribute("data-video"), [0, 1, 0, 0]);
						}, false);
						newzoompanel.appendChild(newzoombuttonleft);

						var newzoombuttonright = document.createElement("div");
						newzoombuttonright.textContent = "⇢";
						newzoombuttonright.accessKey = "r";
						newzoombuttonright.title = "ctrl+alt+r";
						newzoombuttonright.setAttribute("data-video", i);
						newzoombuttonright.addEventListener("click", function(){
							zoompaddirection(this.getAttribute("data-video"), [0, 0, 0, 1]);
						}, false);
						newzoompanel.appendChild(newzoombuttonright);

						var newzoombuttonup = document.createElement("div");
						newzoombuttonup.textContent = "⇡";
						newzoombuttonup.accessKey = "u";
						newzoombuttonup.title = "ctrl+alt+u";
						newzoombuttonup.setAttribute("data-video", i);
						newzoombuttonup.addEventListener("click", function(){
							zoompaddirection(this.getAttribute("data-video"), [1, 0, 0, 0]);
						}, false);
						newzoompanel.appendChild(newzoombuttonup);

						var newzoombuttondown = document.createElement("div");
						newzoombuttondown.textContent = "⇣";
						newzoombuttondown.accessKey = "d";
						newzoombuttondown.title = "ctrl+alt+d";
						newzoombuttondown.setAttribute("data-video", i);
						newzoombuttondown.addEventListener("click", function(){
							zoompaddirection(this.getAttribute("data-video"), [0, 0, 1, 0]);
						}, false);
						newzoompanel.appendChild(newzoombuttondown);

						var newzoombuttonrotateright = document.createElement("div");
						newzoombuttonrotateright.textContent = "↻";
						newzoombuttonrotateright.accessKey = "a";
						newzoombuttonrotateright.title = "ctrl+alt+a";
						newzoombuttonrotateright.setAttribute("data-video", i);
						newzoombuttonrotateright.addEventListener("click", function(){
							camerazoomrotate(this.getAttribute("data-video"), "", +5);
						}, false);
						newzoompanel.appendChild(newzoombuttonrotateright);

						var newzoombuttonrotateleft = document.createElement("div");
						newzoombuttonrotateleft.textContent = "↺";
						newzoombuttonrotateleft.accessKey = "q";
						newzoombuttonrotateleft.title = "ctrl+alt+q";
						newzoombuttonrotateleft.setAttribute("data-video", i);
						newzoombuttonrotateleft.addEventListener("click", function(){
							camerazoomrotate(this.getAttribute("data-video"), "", -5);
						}, false);
						newzoompanel.appendChild(newzoombuttonrotateleft);

						var newzoombuttonreset = document.createElement("div");
						newzoombuttonreset.textContent = "Reset";
						newzoombuttonreset.accessKey = "s";
						newzoombuttonreset.title = "ctrl+alt+s";
						newzoombuttonreset.setAttribute("data-video", i);
						newzoombuttonreset.addEventListener("click", function(){
							resetzoom(this.getAttribute("data-video"));
						}, false);
						newzoompanel.appendChild(newzoombuttonreset);

						var newzoombuttonplay = document.createElement("div");
						newzoombuttonplay.setAttribute("id", "stefanvdzoomplay" + i);
						newzoombuttonplay.setAttribute("data-video", i);
						if(myElement.paused === false){
							newzoombuttonplay.textContent = "❙❙";
						}else{
							newzoombuttonplay.textContent = "►";
						}
						newzoombuttonplay.addEventListener("click", function(){
							var bomo = this.getAttribute("data-video");
							var onevideo = document.getElementsByTagName("video")[bomo];
							if(onevideo.paused === false){
								onevideo.pause();
								$("stefanvdzoomplay" + bomo).textContent = "►";
							}else{
								onevideo.play();
								$("stefanvdzoomplay" + bomo).textContent = "❙❙";
							}
						}, false);
						newzoompanel.appendChild(newzoombuttonplay);

						var newzoombuttonexit = document.createElement("div");
						newzoombuttonexit.setAttribute("id", "stefanvdzoomexit" + i);
						newzoombuttonexit.setAttribute("data-video", i);
						newzoombuttonexit.textContent = "EXIT ZOOM EDIT";
						newzoombuttonexit.style.display = "none";
						newzoombuttonexit.addEventListener("click", function(){
							exitzoom(this.getAttribute("data-video"));
						}, false);
						newzoompanel.appendChild(newzoombuttonexit);
					}
				}
				//---
				//---
				if(speedtoolbar == true){
					myElement.addEventListener("play", function(){
						var bomo = this.getAttribute("data-video");
						var onevideo = document.getElementsByTagName("video")[bomo];
						if(playrate == true){ onevideo.playbackRate = playrateamount; }else{ onevideo.playbackRate = 1.0; }
						window.clearInterval(intervalRewind);
					});
					myElement.addEventListener("ended", function(){
						var bomo = this.getAttribute("data-video");
						var onevideo = document.getElementsByTagName("video")[bomo];
						window.clearInterval(intervalRewind);
						if(playrate == true){ onevideo.playbackRate = playrateamount; }else{ onevideo.playbackRate = 1.0; }
						onevideo.pause();
					});
					myElement.addEventListener("pause", function(){
						var bomo = this.getAttribute("data-video");
						var onevideo = document.getElementsByTagName("video")[bomo];
						if(playrate == true){ onevideo.playbackRate = playrateamount; }else{ onevideo.playbackRate = 1.0; }
						window.clearInterval(intervalRewind);
					});

					var newspeedpanel = document.createElement("div");
					newspeedpanel.setAttribute("id", "stefanvdspeedpanel" + i);
					newspeedpanel.setAttribute("class", "stefanvdspeed");
					newspeedpanel.style.position = "absolute";
					newspeedpanel.style.background = hexToRGB(videotoolcolor, 0.4);
					newspeedpanel.style.display = "none";// default not visible
					newspeedpanel.style.top = visposition.y + "px";
					newspeedpanel.style.left = visposition.x - 64 + "px";
					newspeedpanel.style.width = 64 + "px";
					newspeedpanel.style.height = tempheightvideo - 40 + "px";
					newspeedpanel.style.paddingTop = "40px";
					newspeedpanel.addEventListener("pointerover", function(){
						stefanvdblockstatus("stefanvdspeedpanel", rock, "block");
					}, false);
					newspeedpanel.addEventListener("pointerout", function(){
						stefanvdblockstatus("stefanvdspeedpanel", rock, "none");
					}, false);
					document.body.appendChild(newspeedpanel);

					var newspeedbuttonneg2 = document.createElement("div");
					newspeedbuttonneg2.setAttribute("id", "stefanvdspeedN2step" + i);
					newspeedbuttonneg2.setAttribute("data-video", i);
					newspeedbuttonneg2.textContent = "-2";
					newspeedbuttonneg2.addEventListener("click", function(){
						rewind(2.0, this.getAttribute("data-video"));
					}, false);
					newspeedpanel.appendChild(newspeedbuttonneg2);

					var newspeedbuttonneg15 = document.createElement("div");
					newspeedbuttonneg15.setAttribute("id", "stefanvdspeedN15step" + i);
					newspeedbuttonneg15.setAttribute("data-video", i);
					newspeedbuttonneg15.textContent = "-1.5";
					newspeedbuttonneg15.addEventListener("click", function(){
						rewind(1.5, this.getAttribute("data-video"));
					}, false);
					newspeedpanel.appendChild(newspeedbuttonneg15);

					var newspeedbuttonneg125 = document.createElement("div");
					newspeedbuttonneg125.setAttribute("id", "stefanvdspeedN125step" + i);
					newspeedbuttonneg125.setAttribute("data-video", i);
					newspeedbuttonneg125.textContent = "-1.25";
					newspeedbuttonneg125.addEventListener("click", function(){
						rewind(1.25, this.getAttribute("data-video"));
					}, false);
					newspeedpanel.appendChild(newspeedbuttonneg125);

					var newspeedbuttonneg1 = document.createElement("div");
					newspeedbuttonneg1.setAttribute("id", "stefanvdspeedN1step" + i);
					newspeedbuttonneg1.setAttribute("data-video", i);
					newspeedbuttonneg1.textContent = "-1";
					newspeedbuttonneg1.addEventListener("click", function(){
						rewind(1.0, this.getAttribute("data-video"));
					}, false);
					newspeedpanel.appendChild(newspeedbuttonneg1);

					var newspeedbuttonneg075 = document.createElement("div");
					newspeedbuttonneg075.setAttribute("id", "stefanvdspeedN075step" + i);
					newspeedbuttonneg075.setAttribute("data-video", i);
					newspeedbuttonneg075.textContent = "-0.75";
					newspeedbuttonneg075.addEventListener("click", function(){
						rewind(0.5, this.getAttribute("data-video"));
					}, false);
					newspeedpanel.appendChild(newspeedbuttonneg075);

					var newspeedbuttonneg05 = document.createElement("div");
					newspeedbuttonneg05.setAttribute("id", "stefanvdspeedN05step" + i);
					newspeedbuttonneg05.setAttribute("data-video", i);
					newspeedbuttonneg05.textContent = "-0.5";
					newspeedbuttonneg05.addEventListener("click", function(){
						rewind(0.5, this.getAttribute("data-video"));
					}, false);
					newspeedpanel.appendChild(newspeedbuttonneg05);

					var newspeedbuttonneg025 = document.createElement("div");
					newspeedbuttonneg025.setAttribute("id", "stefanvdspeedN025step" + i);
					newspeedbuttonneg025.setAttribute("data-video", i);
					newspeedbuttonneg025.textContent = "-0.25";
					newspeedbuttonneg025.addEventListener("click", function(){
						rewind(0.25, this.getAttribute("data-video"));
					}, false);
					newspeedpanel.appendChild(newspeedbuttonneg025);

					var newspeedbuttonzero = document.createElement("div");
					newspeedbuttonzero.setAttribute("id", "stefanvdspeedzerostep" + i);
					newspeedbuttonzero.setAttribute("data-video", i);
					newspeedbuttonzero.textContent = "0";
					newspeedbuttonzero.addEventListener("click", function(){
						var onevideo = document.getElementsByTagName("video")[this.getAttribute("data-video")];
						window.clearInterval(intervalRewind);
						onevideo.playbackRate = 1.0;
						onevideo.pause();
					}, false);
					newspeedpanel.appendChild(newspeedbuttonzero);

					var newspeedbuttonpos025 = document.createElement("div");
					newspeedbuttonpos025.setAttribute("id", "stefanvdspeedP025step" + i);
					newspeedbuttonpos025.setAttribute("data-video", i);
					newspeedbuttonpos025.textContent = "+0.25";
					newspeedbuttonpos025.addEventListener("click", function(){
						playrate(this.getAttribute("data-video"), 0.25);
					}, false);
					newspeedpanel.appendChild(newspeedbuttonpos025);

					var newspeedbuttonpos05 = document.createElement("div");
					newspeedbuttonpos05.setAttribute("id", "stefanvdspeedP05step" + i);
					newspeedbuttonpos05.setAttribute("data-video", i);
					newspeedbuttonpos05.textContent = "+0.5";
					newspeedbuttonpos05.addEventListener("click", function(){
						playrate(this.getAttribute("data-video"), 0.5);
					}, false);
					newspeedpanel.appendChild(newspeedbuttonpos05);

					var newspeedbuttonpos075 = document.createElement("div");
					newspeedbuttonpos075.setAttribute("id", "stefanvdspeedP05step" + i);
					newspeedbuttonpos075.setAttribute("data-video", i);
					newspeedbuttonpos075.textContent = "+0.75";
					newspeedbuttonpos075.addEventListener("click", function(){
						playrate(this.getAttribute("data-video"), 0.75);
					}, false);
					newspeedpanel.appendChild(newspeedbuttonpos075);

					var newspeedbuttonpos1 = document.createElement("div");
					newspeedbuttonpos1.setAttribute("id", "stefanvdspeedP1step" + i);
					newspeedbuttonpos1.setAttribute("data-video", i);
					newspeedbuttonpos1.textContent = "+1";
					newspeedbuttonpos1.addEventListener("click", function(){
						playrate(this.getAttribute("data-video"), 1.0);
					}, false);
					newspeedpanel.appendChild(newspeedbuttonpos1);

					var newspeedbuttonpos125 = document.createElement("div");
					newspeedbuttonpos125.setAttribute("id", "stefanvdspeedP125step" + i);
					newspeedbuttonpos125.setAttribute("data-video", i);
					newspeedbuttonpos125.textContent = "+1.25";
					newspeedbuttonpos125.addEventListener("click", function(){
						playrate(this.getAttribute("data-video"), 1.25);
					}, false);
					newspeedpanel.appendChild(newspeedbuttonpos125);

					var newspeedbuttonpos15 = document.createElement("div");
					newspeedbuttonpos15.setAttribute("id", "stefanvdspeedP15step" + i);
					newspeedbuttonpos15.setAttribute("data-video", i);
					newspeedbuttonpos15.textContent = "+1.5";
					newspeedbuttonpos15.addEventListener("click", function(){
						playrate(this.getAttribute("data-video"), 1.5);
					}, false);
					newspeedpanel.appendChild(newspeedbuttonpos15);

					var newspeedbuttonpos2 = document.createElement("div");
					newspeedbuttonpos2.setAttribute("id", "stefanvdspeedP2step" + i);
					newspeedbuttonpos2.setAttribute("data-video", i);
					newspeedbuttonpos2.textContent = "+2";
					newspeedbuttonpos2.addEventListener("click", function(){
						playrate(this.getAttribute("data-video"), 2.0);
					}, false);
					newspeedpanel.appendChild(newspeedbuttonpos2);
				}
				//---

				if(videotool == true){
					if($("stefanvdvisualizationcanvas" + i) == null){
						var newvisualizationvideo = document.createElement("canvas");
						newvisualizationvideo.setAttribute("id", "stefanvdvisualizationcanvas" + i);
						newvisualizationvideo.setAttribute("class", "stefanvdvisualization");
						newvisualizationvideo.style.position = "absolute";
						newvisualizationvideo.style.display = "none";// default not visible
						newvisualizationvideo.style.top = visposition.y + "px";
						newvisualizationvideo.style.left = visposition.x + "px";
						newvisualizationvideo.style.width = tempwidthvideo + "px";
						newvisualizationvideo.style.height = tempheightvideo + "px";
						document.body.appendChild(newvisualizationvideo);

						var newonvispanel = document.createElement("div");
						newonvispanel.setAttribute("id", "stefanvdvispanel" + i);
						newonvispanel.setAttribute("class", "stefanvdvis");
						newonvispanel.style.background = hexToRGB(videotoolcolor, 0.4);
						newonvispanel.style.display = "none";// default not visible
						newonvispanel.style.top = visposition.y + "px";
						newonvispanel.style.left = visposition.x + "px";
						newonvispanel.style.width = tempwidthvideo + "px";
						newonvispanel.style.height = 36 + "px";
						newonvispanel.addEventListener("pointerover", function(){
							stefanvdblockstatus("stefanvdvispanel", rock, "block");
						}, false);
						newonvispanel.addEventListener("pointerout", function(){
							stefanvdblockstatus("stefanvdvispanel", rock, "none");
						}, false);
						document.body.appendChild(newonvispanel);

						var newonbutton = document.createElement("div");
						newonbutton.setAttribute("id", "stefanvdvisbutton" + i);
						newonbutton.setAttribute("data-video", i);

						newonbutton.addEventListener("click", dovisenable, true);
						newonbutton.textContent = "✇";
						newonbutton.title = i18ntitelvisenable;
						newonvispanel.appendChild(newonbutton);

						var newonchoosebutton = document.createElement("div");
						newonchoosebutton.setAttribute("id", "stefanvdvischoosebutton" + i);
						newonchoosebutton.addEventListener("click", dovischoose, true);
						newonchoosebutton.setAttribute("data-video", i);
						newonchoosebutton.textContent = "❋ " + i18ntitelvisblocks;
						newonchoosebutton.title = i18ntitelvischoose;
						newonvispanel.appendChild(newonchoosebutton);

						var newonlikebutton = document.createElement("div");
						newonlikebutton.setAttribute("id", "stefanvdlikebutton" + i);
						newonlikebutton.addEventListener("click", function(){ window.open("https://www.turnoffthelights.com/youtube/totlfb.html", "_blank"); }, false);
						newonlikebutton.setAttribute("data-video", i);
						newonlikebutton.style.background = "url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAACdUlEQVRoQ+2Z7TEEQRCG+83AZUAEiAARIAMiQASIgAwQASJwIkAEXASIoNWrZlSf2p2Zve1Vc2rnl3K7ff1Mf/dB/snBP+GQEaQ2S/6JRVR1RUTWReQTwPMQlzA4SIB4EJGNAPAhIocA7jyBBgVpgLC673vCDAaSgSDQB4CJl1UGAWmBuBGRMxF5NcpvesWMO0gbBIADAqiqGpAdAFMPq7iCFECs/rLIBACDv/dxA8lBBGvcishe0PoFQMxkdYAsAEHFmYKvexMEAb0tUgjBm38ySj8C2PaCoJxeICUQwaWOReQiKD5jcfSKjXgZSRDTWrRd3qWp2HzmJmYn+4Kqsorvhv/xb76XPQAesw+VuJaq0vxsL0pOI0SwiE25JbLiM28hlrIpOmeRUpAURKmMFGC23nQFsabeMt/c+kWqykL4XQw7Hit/CmAn9X4nEAA/zw9VoaOyDW6dLJ7VgjTEVtK9qgVR1bnaY72hycVqBmFcXQWls+1MzSCsNUcBpDUrlhbEudT5x8HOliY2ldm+rGaL2CKaHcCqBPmdenOBTveqFcQ2mUWdcq0gtsk8B8BZP3lqBeGCgmMxT9HaqDqQMDq8m+tfA8AueLksoqqc6Tnb88wARMssHQjj4TRofQ8gLiuWDoRDVGzhTwCUTZMpzFQ+H6qNV1XGB7f3PNmBqsoWRVXnFnglhbBWkE4dr/WmTuk3LKHj+7ZIcdGWTZGZDEp3Ikh0q6JCuJBFcrnc8fNPFsQuu6+uFnHUtVUUF3h7XX9uyIFwHihKfw6E/G3xedF9cK+VqYPybiJGELerdBI0WsTpIt3EjBZxu0onQaNFnC7STcwXkMeXQh73qawAAAAASUVORK5CYII=)";
						newonlikebutton.title = i18ntitelvideotoollike;
						newonvispanel.appendChild(newonlikebutton);

						var newonytsbutton = document.createElement("div");
						newonytsbutton.setAttribute("id", "stefanvdyoutubebutton" + i);
						newonytsbutton.addEventListener("click", function(){ window.open(linkyoutube, "_blank"); }, false);
						newonytsbutton.setAttribute("data-video", i);
						newonytsbutton.style.background = "url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAACm0lEQVRoQ+1ZgXETMRDcqwA6gA6gA5IKAhUAHaQD0klCB0kFJB1ABYQOoIJl9kfnkZ3/l/SR/O+MbuZnbL9s3d7une7Phhdi9kJwoAPZGpOdkc5IowicnLRIvgbwAcBHM/vqcTkJICTfArgAcCYAO+fNdv5vFgjJ98F5Oa7XT8y2CoSkoi7HFXmxMGubARL0Hjsv/U/ZHwA/A0vDmlWBRHr/MiWZCMkvADcAbs3skaSY+rFajpAcqky45iTzD8C9HA/O/43pOTqQuEQG51OSGZw3MwGYtKMAmSqRE15JMnL+xsyk+yxrBiSnREYe3rlspPcszw8WVQVSUCKld0nFZbOn96ZAQoRfjWyiBPX6ntK7J6oAVLVsRkhqc1WYEvMSeV+i95INfG0LINL7IJulel8LiE7VrBK5xMHc7yxl5NzMqus81+mxdR1IZ+Q5+qnRohyU354jjQjB0mRXMxe3FeqP1KHqDFnFlgKZc3ZoQwA8nNqBOAdKzOkpTqCyW/IllJYwomnFWFMYN41jTaX7NcgvtC7VJZgNJCdKJJmzLuSXt/F3Zna8Nj7lYHgK/B2tO4+GZu8S349BrftgNUdtAOmTQI14UnmlPu57SV61lNansYEBSSX/5xTD4b7Y8c56Nq9qA5FEPOKqUuoAdvonqXnV9YH8dF+f6ynzTYYEtceTvKoNZG9IFpJaDMhZ3dPlppIcv9fp7BVQwFJ55aVdoOoP6EheAfiWiKyGD2dzORDmXz64E+BUaRewutN4kpcABGhs8wcAlyWJrKCQjEGlJFhv9htFVHLR5f3Ys0/4MNFxYKMSXHWInVnJ9pZFeSX57Ur7yQGJUQUVDOeVmalgDLbZf6xKmetASiPWen1npHWES3+/M1Iasdbr/wNE7m5C7M5pcAAAAABJRU5ErkJggg==)";
						newonytsbutton.title = i18ntitelvideotoolsubscribe;
						newonvispanel.appendChild(newonytsbutton);

						var newonrepeatbutton = document.createElement("div");
						newonrepeatbutton.setAttribute("id", "stefanvdrepeatbutton" + i);
						newonrepeatbutton.addEventListener("click", function(){
							var redvis = this.getAttribute("data-video");
							var onevideo;
							if(document.getElementById("stefanvdvideowindow")){
								var ytplayer_window = document.getElementById("stefanvdvideowindow").contentWindow;
								onevideo = ytplayer_window.document.getElementsByTagName("video")[redvis];
							}else{
								onevideo = document.getElementsByTagName("video")[redvis];
							}

							if(onevideo){
								onevideo.autoplay = true;
								if(onevideo.loop == true){ onevideo.loop = false; this.title = i18ntitelvideotoolrepeat + " " + i18ntiteloff; }else{ onevideo.loop = true; this.title = i18ntitelvideotoolrepeat + " " + i18ntitelon; }
							}
						}, false);
						newonrepeatbutton.setAttribute("data-video", i);
						newonrepeatbutton.style.background = "url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAABnUlEQVRoQ+3Y623DIBQF4HMmaEbpBk0nabNJO0mSSdpu0FHaCU51IyeyEK7BGAwR/IoUjO/H4xog7qTwThzokNpGso/I3IhIOpI8zNVb6/9sIyJJAE6lMLkh1uFFMCUgRTClINkxJSFZMZMQSZ8AntbKKqN2bmtG0iMAe89D4Hu+SO59dbeAWBwHkif7IekVwLFFyJmkBW8IG5EPALtSkHeSb4Evu1QbviPuIzdEaFuSbCoZ1kry1FoDEo0YOqQqyCJEbZDFiJogSYhaIPa9uGSnlLL5Yk8Jfvxsh1x7w9miRKffPiJOD/Sp1afWWouiT62JnuxZa2aKSdqR/AmdiVVmLbu0A2D7LzveBpXqIAPC9l7PzUJGCBuFNiEOok2IB9EeZAKxOWQuw/wC2JP8Hk51lp2SD1WelybfosxBll64zbXr/p8dYh84y0bXEbFbxJfYKAPqx0MCGv23iqQpTFT6DY0j2238sFZ8mPYgE5g2IR5MuxAH0zZkhLGLu+DdbxWL3RdE7HmkWkhoYLH1sqbf2GBS6ndISu/lePYP2W6YQr7GhnMAAAAASUVORK5CYII=)";
						newonrepeatbutton.title = i18ntitelvideotoolrepeat + " " + i18ntiteloff;
						newonvispanel.appendChild(newonrepeatbutton);

						var newonfilterbutton = document.createElement("div");
						newonfilterbutton.setAttribute("id", "stefanvdfilterbutton" + i);
						newonfilterbutton.setAttribute("data-video", i);
						newonfilterbutton.addEventListener("click", function(){
							var yellowvis = this.getAttribute("data-video");
							var getstefanvdvideotoolrange = document.getElementById("stefanvdvideotoolrange" + yellowvis);
							var onevideo;
							if(document.getElementById("stefanvdvideowindow")){
								onevideo = document.getElementById("stefanvdvideowindow");
							}else{
								onevideo = document.getElementsByTagName("video")[yellowvis];
							}

							if(onevideo){
								switch(currentvideostepfilter){
								case 0:
									filtertype = "grayscale";
									settoolbarrange(getstefanvdvideotoolrange, ["0.1", "0", "1", "1"]);
									onevideo.style.webkitFilter = "grayscale(1)"; currentvideostepfilter += 1; newvcpartiaspan.textContent = i18ntitelvideotoolgrayscale;
									break;
								case 1:
									filtertype = "sepia";
									settoolbarrange(getstefanvdvideotoolrange, ["0.1", "0", "1", "1"]);
									onevideo.style.webkitFilter = "sepia(1)"; currentvideostepfilter += 1; newvcpartiaspan.textContent = i18ntitelvideotoolsepia;
									break;
								case 2:
									filtertype = "invert";
									settoolbarrange(getstefanvdvideotoolrange, ["0.1", "0", "1", "1"]);
									onevideo.style.webkitFilter = "invert(1)"; currentvideostepfilter += 1; newvcpartiaspan.textContent = i18ntitelvideotoolinvert;
									break;
								case 3:
									filtertype = "contrast";
									settoolbarrange(getstefanvdvideotoolrange, ["0.1", "0", "10", "10"]);
									onevideo.style.webkitFilter = "contrast(10)"; currentvideostepfilter += 1; newvcpartiaspan.textContent = i18ntitelvideotoolcontrast;
									break;
								case 4:
									filtertype = "saturate";
									settoolbarrange(getstefanvdvideotoolrange, ["0.1", "0", "10", "10"]);
									onevideo.style.webkitFilter = "saturate(10)"; currentvideostepfilter += 1; newvcpartiaspan.textContent = i18ntitelvideotoolsaturate;
									break;
								case 5:
									filtertype = "hue-rotate";
									settoolbarrange(getstefanvdvideotoolrange, ["30", "0", "360", "90"]);
									onevideo.style.webkitFilter = "hue-rotate(90deg)"; currentvideostepfilter += 1; newvcpartiaspan.textContent = i18ntitelvideotoolhueroration;
									break;
								case 6:
									filtertype = "brightness";
									settoolbarrange(getstefanvdvideotoolrange, ["0.1", "0", "10", "0.5"]);
									onevideo.style.webkitFilter = "brightness(1.5)"; currentvideostepfilter += 1; newvcpartiaspan.textContent = i18ntitelvideotoolbrightness;
									break;
								case 7:
									filtertype = "normal";
									settoolbarrange(getstefanvdvideotoolrange, ["0.1", "0", "10", "1"]);
									onevideo.style.webkitFilter = ""; currentvideostepfilter = 0; newvcpartiaspan.textContent = i18ntitelvideotoolnormal;
									break;
								}
								document.getElementById("stefanvdvideofiltername" + yellowvis).innerText = filtertype;
							}
						}, false);
						newonfilterbutton.style.background = "url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAC80lEQVRoQ+1Z23EUMRDsjgAywEQAjgATATgC7AiACIAIgAg4R2ATASYC7AxMBkcEQ7WRKNWedvXaFWzVTtV9nE+P6Xn1jEx0EDN7D+AdgB3J8yWu5BKHDs80M/N/I7nInYscGgGyA/AKwFeSL5cwXhcgSyg+PHMRIGb2FMCe5F0PELpjdiBm9gbARwfgmORNDzBNQJzlvdJeX3njofsij+R65YKkcqlKWoGcAPhWdfPhpg8kVaarZAMis5nZEYAz93nkTHmREU7ap3Is+SmiBHBN8rrKHXMlu5lJgWdOiecphcwsDMnvJPW9SZpCy9+8Afljic0jYSxuoRVaI5UjZiaCfALgluR+tcluZj8AiPHvSD5eM5A9gAfyouaRNQPRDKJmUhPibrVAhky3AZng/uby6yqSkln9k6S0RVGbr7lFeVQtcwC5BBDO4clhys0xAu/liuRpNYrWpjF45vE6vCX5KUehwSSpLf9mHhkkrBQpfiExsysALwLgybAcM1JVaLk5RKHhR9pbACelce7ySyOAWF+iPFFo5o7Hf3HVAvFMrYN+ORBVjwwuXwTmnjAB3JA8zgnPcE0xEDP74iZCf855y6OBDjEzTZk610vx02oRkMiFCoUqT0QsHr6+6OciA2UDcSGgFxOfF6XeL10vIyn5swyVBSRCeqVK1a4XCIFJkmUukCHp6V8DxZUlE406hDBfssgyCaSF9DIVP1gWIcsk0U4CmYP0GsAUkeUokEheVJFeAxAVlZAs76fLYmaPlNpkM1ir9Ni+SHM5WpKnPBK69jNJTXjdxczUhL52F+vFXuR5IFNAwmfQps60Bf2g2Iw+5q3NI6Md9hSQsP8pYtkWD4R7I91EVY6oaoj0fFcqMHr+F9suRYYeh0hRvZeM6VsiddlHYyyf4hGNsGL1/0FOSaoARSWH2QVGnvCe6Q1KnjibAiGFkkC0yJGjAOnTs/uVB9RrzdM09nZBzX1ZHqk5uPeeDUhvi6fu2zySslDv338DROiFQsyzoMoAAAAASUVORK5CYII=)";
						newonfilterbutton.title = i18ntitelvideotoolfilter;
						newonvispanel.appendChild(newonfilterbutton);


						var newvcpartiaspan = document.createElement("div");
						newvcpartiaspan.setAttribute("id", "stefanvdvideofiltername" + i);
						newvcpartiaspan.textContent = i18ntitelvideotoolnormal;
						newvcpartiaspan.setAttribute("data-video", i);
						newvcpartiaspan.addEventListener("click", function(){
							var orangevis = this.getAttribute("data-video");
							document.getElementById("stefanvdfilterbutton" + orangevis).click();
						}, false);
						if(tempwidthvideo <= 360){ newvcpartiaspan.style.cssText = "display:none!important"; }
						newonvispanel.appendChild(newvcpartiaspan);

						var newvcpartiarange = document.createElement("input");
						newvcpartiarange.setAttribute("id", "stefanvdvideotoolrange" + i);
						newvcpartiarange.setAttribute("class", "stefanvdvideotoolrange");
						newvcpartiarange.setAttribute("data-video", i);
						newvcpartiarange.setAttribute("type", "range");
						newvcpartiarange.setAttribute("step", "0.1");
						newvcpartiarange.setAttribute("min", "0");
						newvcpartiarange.setAttribute("max", "10");
						newvcpartiarange.addEventListener("change", changevideotoolbarrange, false);
						newvcpartiarange.addEventListener("input", changevideotoolbarrange, false);
						if(tempwidthvideo <= 360){ newvcpartiarange.style.cssText = "display:none!important"; }
						newonvispanel.appendChild(newvcpartiarange);

						var newonfwbutton = document.createElement("div");
						newonfwbutton.setAttribute("id", "stefanvdyfullwindowbutton" + i);
						newonfwbutton.setAttribute("data-video", i);
						newonfwbutton.addEventListener("click", function(){
							var greenvis = this.getAttribute("data-video");

							windowfullaction();
							function windowfullaction(){
								dovisfull(greenvis);
								var onevideo = document.getElementsByTagName("video")[greenvis];
								if(onevideo){
									// icon change
									var swicon = document.getElementById("stefanvdyfullwindowbutton" + greenvis);
									if(videowindow == true){
										videowindow = false;
										swicon.style.background = "url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAACVUlEQVRoQ+2Z21EDMQxFryqADqAD6ACohNABdEAqACqAVAJ0AB1AB0kFYu7MesbjrNcvOQmw+snH+qFjKXrYgj8i8kc4MIMcmiVni/wai6jqI4CzCoXvRORjap6qngN4qFj7U0Rux+ZFXUtV3wBcVGx2JSKcGxVVvQTwWrH2u4hw7pb8W5A1gKfESb6IyFfCIqcAFhNjjgFcA+CvL6YWoaI3FW6RNUVVqTzdjv+jUJpBNgCOvFW7wEQgPr2g0wyyBEB3oLmdmMJEIFYAXrzA0A4iIveqykXNYWIQIrIIIpwNCE1hDTMFMeznh2o7EEuYFER3EAuYHIidgLTA5ELsDKQGpgRipyAlMKUQViDMrK5E+MooO8LQ/BRWqiOF6IohNlHOUAeX5dexytq0sfJCMyuBy3DToXxnZcwqIQmRVdMMg0xBBldgH8OsP9qTDDCLWF9Rorw/1hykVpHWeTNI6wlaz58tEjtRVX0GwOKO4XhLVJXh9sK6OTO1yADh8sJNCDNAEJRi2s9MXT4wCbmu8DsjIVJBP7lt5YmaFmCoBty11KY4IQZZeMnGKuFOkxBubilMt8YqhAnciZ+TGbsEZicgNRCllukO0gJRAtMVxAIiF6YbiCVEDkwXkB4QKRhzEAAnqTzRWj+NRTNGQcsLOl5e+xfKyRBbCzUCw77GdYjN91q+Xt0gJtzMfTID4emMvhh5pHxVogWjEpQdsXHsNMMbeTOQHI+ZX6wyTqnKImOmzdgLt5mPoVy/VD6KH0NLd9j3eNPGap8wM8g+T39s79kih2aRH8NkAVGMEdb6AAAAAElFTkSuQmCC)";
										// remove action hover mode
										window.clearTimeout(timeout);
										window.onpointermove = null;
									}else{
										// onevideo.pause();
										videowindow = true;
										swicon.style.background = "url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAACj0lEQVRoQ+2Z/VHDMAzFnyaAEdgANgAmYARgAsoGMAEwAbABGwAbwCZsIO5xbs9NLcsf6TVX4v96sRP/9BzpVRHsyZA94cAMMjUl918RVT0BcCkit1OIvqo+AHgVka/UfpKKBIh3AIcAXkTkepcwqvoM4ArAD4DzFIwF8gjgJtq8C6OqhD5erhGRzxR8CNJBuPYtItycOSKI5ZwnEVkMF5jviKq+8GiVwqjqGQCq+DdExArSB4DTMI3R5e/kSEDwaFGZjZF92WtgxgapgfgLnHf2S2HGBKmFKALhpBKYsUBaIIpBSmDGAGmFqALxYHpBeiCqQXIwPSC9EE0gFgyrbkv6DSk+Tqlmis0lJjdrZXL8sM7QOtDW1NSRtTXBgiTrhJddm0EMZVbPKyyI8f6alFgFLkc6tB3GXNqZlRKViiynU5kN2zF4XtbOeJV9zXZ48sbXGxTxbp+1MzOIF75JKeJtdkrXu7LWDLKFCMyKbCGoXbf8H4qERgHbMNVDRM5Ti1SVTmDVpKi48a3VCuI95oLoRXJSBTGYxg1DGEGwl8WjdzQEqwShafQ6ml+5Hljzyx4g2cdKglaCMA5uEzB3CppADIjvQaexpEG3tqYHphrEgODfXP5jrO40hp5ucUfTUqUKxIJgG7Oz+VDVnk3BFIPkIHjjHpCwvgumCMSDGAOkF8YFKYEYC6QHxqvsrBPDFJvsdvQerfjcl/SaN+qWlQVKlViuHxOkRRkr1xcrsS2QWhgL5A3ARaSW2zwb2hnrS1Rw1AwUR9Z2GDD3InJXdLTCpvhJjHbbhfAMZO/16J2hEzhLea7cN0RGbZGi791Yy3pVpQqPlnF002/LQ3exZgbZRdRHt/FTg+B+9uZo/QI21+RCJ4hK5QAAAABJRU5ErkJggg==)";
										window.addEventListener("keyup", function(e){ if(e.keyCode == 27){ if(videowindow == true){ windowfullaction(); } } }, false);
									}

									// window action
									if(window.location.href.match(/((http:\/\/(.*youtube\.com\/.*))|(https:\/\/(.*youtube\.com\/.*)))/i)){
										// YouTube website
										var playertheater = document.getElementById("player-theater-container");
										var playercontrols = document.getElementsByClassName("ytp-chrome-bottom")[0];
										var playercontainer = document.getElementById("player-container");

										var masthead = $("masthead-container");
										if(masthead)masthead.style.cssText = "z-index:auto !important";

										if(playercontainer){
											var stefanvdregularhtmlplayer = document.getElementsByClassName("stefanvdvideowindow")[0];
											var original = document.getElementsByClassName("ytp-size-button")[0];
											var watchContainer = document.querySelector("ytd-watch") || document.querySelector("ytd-watch-flexy");
											if(stefanvdregularhtmlplayer){
												if(!initialtheatermode){
													original.click();
												}
												playercontainer.classList.remove("stefanvdvideowindow");
												playertheater.classList.remove("stefanvdvideotheather");
												playercontrols.classList.remove("stefanvdvideocontrols");
												document.getElementsByTagName("video")[0].classList.remove("stefanvdvideowindow");
												videowindow = false;
											}else{
												checktheatermode = watchContainer ? watchContainer.hasAttribute("theater") : true;
												initialtheatermode = checktheatermode;
												if(!checktheatermode){
													original.click();
													checktheatermode = true;
												}
												playercontainer.classList.add("stefanvdvideowindow");
												playertheater.classList.add("stefanvdvideotheather");
												playercontrols.classList.add("stefanvdvideocontrols");
												document.getElementsByTagName("video")[0].classList.add("stefanvdvideowindow");
												videowindow = true;
											}
										}

										if(videovolume == true || videovolumehold == true || gamepad == true){
											refreshvolume();
										}
									}else{
										// regular HTML5 video
										var stefanvdregularhtmlplayerb = document.getElementsByClassName("stefanvdvideowindow")[0];
										if(stefanvdregularhtmlplayerb){
											onevideo.classList.remove("stefanvdvideowindow");
											if(thatPrevControlEnabled == true){
												onevideo.controls = true;
											}else{
												onevideo.controls = false;
											}
											videowindow = false;
										}else{
											onevideo.classList.add("stefanvdvideowindow");
											if(onevideo.hasAttribute("controls")){
												thatPrevControlEnabled = true;
											}
											onevideo.controls = true;
											videowindow = true;
										}

										if(videovolume == true || videovolumehold == true || gamepad == true){
											refreshvolume();
										}
									}
								}
							}
						}, false);
						newonfwbutton.style.background = "url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAACVUlEQVRoQ+2Z21EDMQxFryqADqAD6ACohNABdEAqACqAVAJ0AB1AB0kFYu7MesbjrNcvOQmw+snH+qFjKXrYgj8i8kc4MIMcmiVni/wai6jqI4CzCoXvRORjap6qngN4qFj7U0Rux+ZFXUtV3wBcVGx2JSKcGxVVvQTwWrH2u4hw7pb8W5A1gKfESb6IyFfCIqcAFhNjjgFcA+CvL6YWoaI3FW6RNUVVqTzdjv+jUJpBNgCOvFW7wEQgPr2g0wyyBEB3oLmdmMJEIFYAXrzA0A4iIveqykXNYWIQIrIIIpwNCE1hDTMFMeznh2o7EEuYFER3EAuYHIidgLTA5ELsDKQGpgRipyAlMKUQViDMrK5E+MooO8LQ/BRWqiOF6IohNlHOUAeX5dexytq0sfJCMyuBy3DToXxnZcwqIQmRVdMMg0xBBldgH8OsP9qTDDCLWF9Rorw/1hykVpHWeTNI6wlaz58tEjtRVX0GwOKO4XhLVJXh9sK6OTO1yADh8sJNCDNAEJRi2s9MXT4wCbmu8DsjIVJBP7lt5YmaFmCoBty11KY4IQZZeMnGKuFOkxBubilMt8YqhAnciZ+TGbsEZicgNRCllukO0gJRAtMVxAIiF6YbiCVEDkwXkB4QKRhzEAAnqTzRWj+NRTNGQcsLOl5e+xfKyRBbCzUCw77GdYjN91q+Xt0gJtzMfTID4emMvhh5pHxVogWjEpQdsXHsNMMbeTOQHI+ZX6wyTqnKImOmzdgLt5mPoVy/VD6KH0NLd9j3eNPGap8wM8g+T39s79kih2aRH8NkAVGMEdb6AAAAAElFTkSuQmCC)";
						newonfwbutton.title = i18ntitelvideotoolfullwindow;
						newonvispanel.appendChild(newonfwbutton);

						var newscreenshotbutton = document.createElement("div");
						newscreenshotbutton.setAttribute("id", "stefanvdscreenshotbutton" + i);
						newscreenshotbutton.addEventListener("click", function(){
							var brownvis = this.getAttribute("data-video");
							var onevideo = document.getElementsByTagName("video")[brownvis];
							var screenshot = document.createElement("canvas");
							var context = screenshot.getContext("2d", {desynchronized: true});
							screenshot.width = onevideo.offsetWidth;
							screenshot.height = onevideo.offsetHeight;
							context.drawImage(onevideo, 0, 0, onevideo.offsetWidth, onevideo.offsetHeight);
							try{ var dataURL = screenshot.toDataURL("image/png"); }catch(e){ console.error(e); }
							// save the video screenshot
							chrome.runtime.sendMessage({name:"screenshot", value:dataURL});
							// Note: Bug issue on Safari web browser version 15.0 and version 16.0
							// It can not capture the YouTube screenshot the canvas 'drawImage' is blank
							// On another website, if the video uses MP4 video, that work fine
						}, false);
						newscreenshotbutton.setAttribute("data-video", i);
						newscreenshotbutton.style.background = "url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAADVUlEQVRoQ+2ZgVEUMRSG/1eB2gFUoFQgVCBWoFagVKBUIFYgdiAVCBUIFYgVqBU85zvzMOzt3iW7AXZuLjM7N3C55P35X/73J2vakGYbgkNbIHNjcstIzoi7v5f0TtLjSqauJR2b2Wnl75a6T2bE3T9IAsiU9tLMvk4ZYBIQd9+R9D0x8aZ2Zd0dFj9K+i1p18z4HNWmAvkmaV/SFzN7PSYCdz+X9HzKGMx7C4i7ExRpwmdp+yNpZ+xqJlYvJT0qnVASafjJzFiERbsBMiHXJ+e3u8Pm5wog0RWhYI/+A5KYIE1oRyA2MxRldi0xCPAQmAOYCSCRp0dmdjK76HsCyjLozMwOA4invk+6ue7uqMph+v7UzI7nADQx82ORVrSUWgsg8XcE6u6w87YT+E1ePjQgd7+Jex2QX6lG7KWgqRnXZrY7BMLdqe4vEovUmWepL8rEvkNxSIfRNSNb6GIgTIYs5kB+mhkB3moJAOyVWBXGhW0kdDSgGkb67MdSaiUQqF6s/oUk/NOlmcEEysh3PCgOBZDGd6jOKDDFQFIAgImqzWZf6HZGL6nEpuPzCkbyQtWXgknuYeTpFHtSBWTVhu4wAYj90tVNv0X2ATOKmZZAIvWqQHTYDDDVatgESFrRSKlFdR0jx5mrqHbArYCEP7owsxqTuYQ3c8BVR4FWQKgH1IuqyQc2fyzKwm6UMtsKCMUROd0LiS0NoKcGMQ7jIddRs9YO1wpIr61ZO/tAhzyo0jG2QDqFEO2nBrRMrSszC3ewlphWjGzMZg+lOTezg7XLt6KDu8clRpUCtmIEb4Utxx23KIjVlxhNgGSGkrPzWK/EYoRrfhiLkoAQyCjj1zWcNZs882plB6uSvE8BRYrBDBcYK31X8lfcBaBQ1Sl1J0B6mOFfAOFghZzmByvkGpEIbzbKNd8ZkAwMx1yedbeGsMDB6qT0/DLg0dqlVo9vYt9g/Hg428MCjdWPywcuAEcdbztF+e6AlOyrVn0G5VfS0gVdq0lbjzN0QRd2o1rLWwdYOt7QlSkqEpfYnMN53zHnS+xXkuI25/8ldqdKly7KHPrdfq2Q6TLMIJ8cYefczpJ0L7/omXPUJbFNeodYMsF99dkCua+VLp1ny0jpSt1Xv41h5C+YBzxRDPItSgAAAABJRU5ErkJggg==)";
						newscreenshotbutton.title = i18ntitelvideotoolscreenshot;
						newonvispanel.appendChild(newscreenshotbutton);
					}
				}
			}
		}
		addvisual();

		var t = 0;
		function setTime(){ ++t; }

		function analamp(hz, v){
			let l = hz / audiocontext[v].sampleRate * analyser[v].freq.length | 0;
			let sum;
			let i;
			for(sum = 0, i = 0; i < l;) sum += analyser[v].freq[i++];
			return sum / l / 255;
		}

		var buffer1 = [];
		var buffer2 = [];
		var bctx1 = [];
		var bctx2 = [];
		var rtick = 0;
		var gtick = 0;
		var btick = 0;
		var requestvideovisualloop = [];
		var timeloop;
		var gradient = null;
		function videovisualloop(tovis){
			if(document.getElementById("stefanvdvisualizationcanvas" + tovis)){
				var canvas = document.getElementById("stefanvdvisualizationcanvas" + tovis);
				var ctx = canvas.getContext("2d", {desynchronized: true});

				requestvideovisualloop[tovis] = window.requestAnimFrame(function(){ videovisualloop(tovis); });
				analyser[tovis].fftSize = 2048;
				var bufferLength = analyser[tovis].fftSize;
				var dataArray = new Uint8Array(bufferLength);
				analyser[tovis].getByteTimeDomainData(dataArray);
				analyser[tovis].getByteFrequencyData(analyser[tovis].freq);
				analyser[tovis].getByteTimeDomainData(analyser[tovis].wave);
				timeloop = window.setInterval(setTime, 1000);

				var w = canvas.width = canvas.clientWidth;
				var h = canvas.height = canvas.clientHeight;

				if(visualnumber[tovis] == 1){
					document.getElementById("stefanvdvischoosebutton" + tovis).textContent = "❋ " + i18ntitelvisblocks;
					blockarray = new Uint8Array(analyser[tovis].frequencyBinCount);
					analyser[tovis].getByteFrequencyData(blockarray);
					ctx.clearRect(0, 0, w, h);
					ctx.fillStyle = "rgba(0,0,0," + visopacity + ")";
					ctx.fillRect(0, 0, w, h);

					gradient = ctx.createLinearGradient(0, 0, 0, h + h / 4);
					gradient.addColorStop(1, "#0f0");
					gradient.addColorStop(0.5, "#ff0");
					gradient.addColorStop(0, "#f00");
					ctx.fillStyle = gradient;

					bars = 500;
					var i;
					for(i = 0; i < bars; i++){
						barx = i * 5;
						barwidth = 4;
						barheight = -(blockarray[i]);
						ctx.fillRect(barx, h, barwidth, barheight);
					}
				}else if(visualnumber[tovis] == 2){
					document.getElementById("stefanvdvischoosebutton" + tovis).textContent = "❋ " + i18ntitelvisfrequency;
					ctx.clearRect(0, 0, w, h);
					analyser[tovis].getByteTimeDomainData(dataArray);

					ctx.fillStyle = "rgba(0,0,0," + visopacity + ")";
					ctx.fillRect(0, 0, w, h);
					ctx.lineWidth = 2;
					ctx.strokeStyle = "#3cfd2a";
					ctx.beginPath();

					var sliceWidth = w * 1.0 / bufferLength;
					let x = 0;
					let i;
					for(i = 0; i < bufferLength; i++){
						var v = dataArray[i] / 128.0;
						var y = v * h / 2;
						if(i === 0){
							ctx.moveTo(x, y);
						}else{
							ctx.lineTo(x, y);
						}
						x += sliceWidth;
					}
					ctx.lineTo(w, h / 2);
					ctx.stroke();
				}else if(visualnumber[tovis] == 3){
					document.getElementById("stefanvdvischoosebutton" + tovis).textContent = "❋ " + i18ntitelvistunnel;
					ctx.clearRect(0, 0, w, h);
					ctx.fillStyle = "rgba(0,0,0,1)";
					ctx.fillRect(0, 0, w, h);

					if(!buffer1[tovis]){
						buffer1[tovis] = document.createElement("canvas");
						buffer1[tovis].width = w;
						buffer1[tovis].height = h;

						buffer2[tovis] = document.createElement("canvas");
						buffer2[tovis].width = w;
						buffer2[tovis].height = h;
					}

					bctx1[tovis] = buffer1[tovis].getContext("2d", {desynchronized: true});
					bctx2[tovis] = buffer2[tovis].getContext("2d", {desynchronized: true});

					// copy buffer1 to buffer2
					bctx2[tovis].drawImage(buffer1[tovis], 0, 0);

					// get audio data
					var data = new Uint8Array(2048);
					analyser[tovis].getByteFrequencyData(data);

					var currenvisvideoplayer = document.getElementsByTagName("video")[tovis];
					var amp = currenvisvideoplayer.duration ? Math.min(1, Math.pow(1.25 * analamp(10e3, tovis), 2)) : 0.5 - 0.25 * Math.cos(t);

					// draw the audio into buffer 2
					rtick = (rtick + 1) % 255;
					gtick = (gtick + 2) % 255;
					btick = (btick + 3) % 255;
					bctx2[tovis].fillStyle = "rgba(" + rtick + "," + gtick + "," + btick + "," + amp * 3 + ")";
					bctx2[tovis].strokeStyle = "rgba(" + 20 + "," + 20 + "," + 20 + "," + amp * 3 + ")";
					bctx2[tovis].lineWidth = 2 * amp;
					bctx2[tovis].beginPath();

					let i;
					// let j = analyser[tovis].wave.length;
					let a;
					let r;
					for(i = (data.length / 2) - 1; i >= 0; i--){
						a = i / 22 * 2 * Math.PI;
						r = amp * 256 / 2 * (0.5 + analyser[tovis].wave[i] / 255);
						bctx2[tovis].lineTo(r * Math.sin(a) + w / 2, r * Math.cos(a) + h / 2);
					}

					bctx2[tovis].fill();
					bctx2[tovis].stroke();

					// copy buffer2 to buffer1, stretched
					// draw more onto buffer
					bctx1[tovis].drawImage(buffer2[tovis], 0, 0, w, h, -25, -25, w + 50, h + 50);
					// draw buffer1 back to screen
					ctx.drawImage(buffer1[tovis], 0, 0);
				}
			}
		}

		var myListenervideotoolbar = function(){
			removevideotool();
			adddatavideo(); // recheck remove and add video ID
			addvisual();
		};
		myListenerWithContext = myListenervideotoolbar.bind(this);
		window.addEventListener("resize", myListenerWithContext);

		function updatepanelsize(a, b, c){
			if(document.getElementById(a)){
				document.getElementById(a).style.width = b.target.offsetWidth + "px";
				document.getElementById(a).style.height = b.target.offsetHeight + "px";
				document.getElementById(a).style.top = c.y + "px";
				document.getElementById(a).style.left = c.x + "px";
			}
		}

		// Observe a specific DOM element
		// New Mutation Summary API Reference
		if(MutationObserver){
		// setup MutationSummary observer
			var videolist = document.body;
			observervideotoolbar = new MutationObserver(function(mutations){
				mutations.forEach(function(mutation){

					if(mutation.target.tagName == "VIDEO"){
						if(mutation.attributeName === "src" && mutation.target.currentSrc != ""){
							if(videotool == true){
								myListenervideotoolbar();
							}
						}
					}
					// dynamic add and remove video
					if(mutation.type == "childList"){
						var i, la = mutation.addedNodes.length;
						for(i = 0; i < la; i++){
							if(mutation.addedNodes[i].tagName == "VIDEO" && videotool == true){
								myListenervideotoolbar();
							}
						}
						var j, lr = mutation.removedNodes.length;
						for(j = 0; j < lr; j++){
							if(mutation.removedNodes[j].tagName == "VIDEO" && videotool == true){
								myListenervideotoolbar();
							}
						}
					}
					// detect change style - this for floating box in div detection
					if(mutation.attributeName == "style" && mutation.target.tagName == "VIDEO"){
						if(mutation.target.hasAttribute("data-video")){
						// data is available
						// update the style

							// video toolbar update location
							var potvis = mutation.target.getAttribute("data-video");
							var visposition = getPosition(mutation.target);
							if(document.getElementById("stefanvdvispanel" + potvis)){
								document.getElementById("stefanvdvispanel" + potvis).style.width = mutation.target.offsetWidth + "px";
								document.getElementById("stefanvdvispanel" + potvis).style.top = visposition.y + "px";
								document.getElementById("stefanvdvispanel" + potvis).style.left = visposition.x + "px";
							}
							// canvas update location
							updatepanelsize("stefanvdvisualizationcanvas" + potvis, mutation, visposition);

							// speed update location
							if(document.getElementById("stefanvdspeedpanel" + potvis)){
								document.getElementById("stefanvdspeedpanel" + potvis).style.top = visposition.y + "px";
								document.getElementById("stefanvdspeedpanel" + potvis).style.left = visposition.x - 64 + "px";
								document.getElementById("stefanvdspeedpanel" + potvis).style.height = mutation.target.offsetHeight - 40 + "px";
							}
							// zoom update location
							if(document.getElementById("stefanvdzoompanel" + potvis)){
								document.getElementById("stefanvdzoompanel" + potvis).style.top = visposition.y + "px";
								document.getElementById("stefanvdzoompanel" + potvis).style.left = mutation.target.offsetWidth + visposition.x + "px";
								document.getElementById("stefanvdzoompanel" + potvis).style.height = mutation.target.offsetHeight - 40 + "px";
							}
							// zoom canvas update location
							if(document.getElementById("stefanvdzoomcanvas" + potvis)){
								document.getElementById("stefanvdzoomcanvas" + potvis).width = mutation.target.offsetWidth;
								document.getElementById("stefanvdzoomcanvas" + potvis).height = mutation.target.offsetHeight;
								document.getElementById("stefanvdzoomcanvas" + potvis).style.width = mutation.target.offsetWidth + "px";
								document.getElementById("stefanvdzoomcanvas" + potvis).style.height = mutation.target.offsetHeight + "px";
							}
							// zoom stage location
							updatepanelsize("stefanvdzoomstage" + potvis, mutation, visposition);

						}else{
						// there is no data
						// create everything again
							myListenervideotoolbar();
						}
					}

				});
			});

			observervideotoolbar.observe(videolist, {
				subtree: true, // observe the subtree rooted at ...videolist...
				childList: true, // include childNode insertion/removals
				characterData: false, // include textContent changes
				attributes: true // include changes to attributes within the subtree
			});

		}
		//---

	} // end function

	function runplayratecheck(){
		if(playrate == true){
			var ratevideos = document.getElementsByTagName("video");
			var i;
			var l = ratevideos.length;
			for(i = 0; i < l; i++){
				var myElement = document.getElementsByTagName("video")[i];
				myElement.playbackRate = playrateamount;
			}
		}
	}
	runplayratecheck();

	// easter eggs
	function gogotheater(){
		if(eastereggs == true){
			// here the easter egg => movie theater
			var lightareoff = $("stefanvdlightareoff1");
			if(lightareoff != null){
				// shortcut key T
				if($("stefanvdtheater") == null){
					window.alert(chrome.i18n.getMessage("eastereggsquestion"));
					var newimg = document.createElement("img");
					newimg.setAttribute("id", "stefanvdtheater");
					newimg.src = "data:image/png;base64,/9j/4AAQSkZJRgABAQEBLAEsAAD/7TNwUGhvdG9zaG9wIDMuMAA4QklNA+oAAAAAHaY8P3htbCB2ZXJzaW9uPSIxLjAiIGVuY29kaW5nPSJVVEYtOCI/Pgo8IURPQ1RZUEUgcGxpc3QgUFVCTElDICItLy9BcHBsZSBDb21wdXRlci8vRFREIFBMSVNUIDEuMC8vRU4iICJodHRwOi8vd3d3LmFwcGxlLmNvbS9EVERzL1Byb3BlcnR5TGlzdC0xLjAuZHRkIj4KPHBsaXN0IHZlcnNpb249IjEuMCI+CjxkaWN0PgoJPGtleT5jb20uYXBwbGUucHJpbnQuUGFnZUZvcm1hdC5QTUhvcml6b250YWxSZXM8L2tleT4KCTxkaWN0PgoJCTxrZXk+Y29tLmFwcGxlLnByaW50LnRpY2tldC5jcmVhdG9yPC9rZXk+CgkJPHN0cmluZz5jb20uYXBwbGUucHJpbnRpbmdtYW5hZ2VyPC9zdHJpbmc+CgkJPGtleT5jb20uYXBwbGUucHJpbnQudGlja2V0Lml0ZW1BcnJheTwva2V5PgoJCTxhcnJheT4KCQkJPGRpY3Q+CgkJCQk8a2V5PmNvbS5hcHBsZS5wcmludC5QYWdlRm9ybWF0LlBNSG9yaXpvbnRhbFJlczwva2V5PgoJCQkJPHJlYWw+NzI8L3JlYWw+CgkJCQk8a2V5PmNvbS5hcHBsZS5wcmludC50aWNrZXQuY2xpZW50PC9rZXk+CgkJCQk8c3RyaW5nPmNvbS5hcHBsZS5wcmludGluZ21hbmFnZXI8L3N0cmluZz4KCQkJCTxrZXk+Y29tLmFwcGxlLnByaW50LnRpY2tldC5tb2REYXRlPC9rZXk+CgkJCQk8ZGF0ZT4yMDA3LTA5LTIyVDEwOjU1OjA1WjwvZGF0ZT4KCQkJCTxrZXk+Y29tLmFwcGxlLnByaW50LnRpY2tldC5zdGF0ZUZsYWc8L2tleT4KCQkJCTxpbnRlZ2VyPjA8L2ludGVnZXI+CgkJCTwvZGljdD4KCQk8L2FycmF5PgoJPC9kaWN0PgoJPGtleT5jb20uYXBwbGUucHJpbnQuUGFnZUZvcm1hdC5QTU9yaWVudGF0aW9uPC9rZXk+Cgk8ZGljdD4KCQk8a2V5PmNvbS5hcHBsZS5wcmludC50aWNrZXQuY3JlYXRvcjwva2V5PgoJCTxzdHJpbmc+Y29tLmFwcGxlLnByaW50aW5nbWFuYWdlcjwvc3RyaW5nPgoJCTxrZXk+Y29tLmFwcGxlLnByaW50LnRpY2tldC5pdGVtQXJyYXk8L2tleT4KCQk8YXJyYXk+CgkJCTxkaWN0PgoJCQkJPGtleT5jb20uYXBwbGUucHJpbnQuUGFnZUZvcm1hdC5QTU9yaWVudGF0aW9uPC9rZXk+CgkJCQk8aW50ZWdlcj4xPC9pbnRlZ2VyPgoJCQkJPGtleT5jb20uYXBwbGUucHJpbnQudGlja2V0LmNsaWVudDwva2V5PgoJCQkJPHN0cmluZz5jb20uYXBwbGUucHJpbnRpbmdtYW5hZ2VyPC9zdHJpbmc+CgkJCQk8a2V5PmNvbS5hcHBsZS5wcmludC50aWNrZXQubW9kRGF0ZTwva2V5PgoJCQkJPGRhdGU+MjAwNy0wOS0yMlQxMDo1NTowNVo8L2RhdGU+CgkJCQk8a2V5PmNvbS5hcHBsZS5wcmludC50aWNrZXQuc3RhdGVGbGFnPC9rZXk+CgkJCQk8aW50ZWdlcj4wPC9pbnRlZ2VyPgoJCQk8L2RpY3Q+CgkJPC9hcnJheT4KCTwvZGljdD4KCTxrZXk+Y29tLmFwcGxlLnByaW50LlBhZ2VGb3JtYXQuUE1TY2FsaW5nPC9rZXk+Cgk8ZGljdD4KCQk8a2V5PmNvbS5hcHBsZS5wcmludC50aWNrZXQuY3JlYXRvcjwva2V5PgoJCTxzdHJpbmc+Y29tLmFwcGxlLnByaW50aW5nbWFuYWdlcjwvc3RyaW5nPgoJCTxrZXk+Y29tLmFwcGxlLnByaW50LnRpY2tldC5pdGVtQXJyYXk8L2tleT4KCQk8YXJyYXk+CgkJCTxkaWN0PgoJCQkJPGtleT5jb20uYXBwbGUucHJpbnQuUGFnZUZvcm1hdC5QTVNjYWxpbmc8L2tleT4KCQkJCTxyZWFsPjE8L3JlYWw+CgkJCQk8a2V5PmNvbS5hcHBsZS5wcmludC50aWNrZXQuY2xpZW50PC9rZXk+CgkJCQk8c3RyaW5nPmNvbS5hcHBsZS5wcmludGluZ21hbmFnZXI8L3N0cmluZz4KCQkJCTxrZXk+Y29tLmFwcGxlLnByaW50LnRpY2tldC5tb2REYXRlPC9rZXk+CgkJCQk8ZGF0ZT4yMDA3LTA5LTIyVDEwOjU1OjA1WjwvZGF0ZT4KCQkJCTxrZXk+Y29tLmFwcGxlLnByaW50LnRpY2tldC5zdGF0ZUZsYWc8L2tleT4KCQkJCTxpbnRlZ2VyPjA8L2ludGVnZXI+CgkJCTwvZGljdD4KCQk8L2FycmF5PgoJPC9kaWN0PgoJPGtleT5jb20uYXBwbGUucHJpbnQuUGFnZUZvcm1hdC5QTVZlcnRpY2FsUmVzPC9rZXk+Cgk8ZGljdD4KCQk8a2V5PmNvbS5hcHBsZS5wcmludC50aWNrZXQuY3JlYXRvcjwva2V5PgoJCTxzdHJpbmc+Y29tLmFwcGxlLnByaW50aW5nbWFuYWdlcjwvc3RyaW5nPgoJCTxrZXk+Y29tLmFwcGxlLnByaW50LnRpY2tldC5pdGVtQXJyYXk8L2tleT4KCQk8YXJyYXk+CgkJCTxkaWN0PgoJCQkJPGtleT5jb20uYXBwbGUucHJpbnQuUGFnZUZvcm1hdC5QTVZlcnRpY2FsUmVzPC9rZXk+CgkJCQk8cmVhbD43MjwvcmVhbD4KCQkJCTxrZXk+Y29tLmFwcGxlLnByaW50LnRpY2tldC5jbGllbnQ8L2tleT4KCQkJCTxzdHJpbmc+Y29tLmFwcGxlLnByaW50aW5nbWFuYWdlcjwvc3RyaW5nPgoJCQkJPGtleT5jb20uYXBwbGUucHJpbnQudGlja2V0Lm1vZERhdGU8L2tleT4KCQkJCTxkYXRlPjIwMDctMDktMjJUMTA6NTU6MDVaPC9kYXRlPgoJCQkJPGtleT5jb20uYXBwbGUucHJpbnQudGlja2V0LnN0YXRlRmxhZzwva2V5PgoJCQkJPGludGVnZXI+MDwvaW50ZWdlcj4KCQkJPC9kaWN0PgoJCTwvYXJyYXk+Cgk8L2RpY3Q+Cgk8a2V5PmNvbS5hcHBsZS5wcmludC5QYWdlRm9ybWF0LlBNVmVydGljYWxTY2FsaW5nPC9rZXk+Cgk8ZGljdD4KCQk8a2V5PmNvbS5hcHBsZS5wcmludC50aWNrZXQuY3JlYXRvcjwva2V5PgoJCTxzdHJpbmc+Y29tLmFwcGxlLnByaW50aW5nbWFuYWdlcjwvc3RyaW5nPgoJCTxrZXk+Y29tLmFwcGxlLnByaW50LnRpY2tldC5pdGVtQXJyYXk8L2tleT4KCQk8YXJyYXk+CgkJCTxkaWN0PgoJCQkJPGtleT5jb20uYXBwbGUucHJpbnQuUGFnZUZvcm1hdC5QTVZlcnRpY2FsU2NhbGluZzwva2V5PgoJCQkJPHJlYWw+MTwvcmVhbD4KCQkJCTxrZXk+Y29tLmFwcGxlLnByaW50LnRpY2tldC5jbGllbnQ8L2tleT4KCQkJCTxzdHJpbmc+Y29tLmFwcGxlLnByaW50aW5nbWFuYWdlcjwvc3RyaW5nPgoJCQkJPGtleT5jb20uYXBwbGUucHJpbnQudGlja2V0Lm1vZERhdGU8L2tleT4KCQkJCTxkYXRlPjIwMDctMDktMjJUMTA6NTU6MDVaPC9kYXRlPgoJCQkJPGtleT5jb20uYXBwbGUucHJpbnQudGlja2V0LnN0YXRlRmxhZzwva2V5PgoJCQkJPGludGVnZXI+MDwvaW50ZWdlcj4KCQkJPC9kaWN0PgoJCTwvYXJyYXk+Cgk8L2RpY3Q+Cgk8a2V5PmNvbS5hcHBsZS5wcmludC5zdWJUaWNrZXQucGFwZXJfaW5mb190aWNrZXQ8L2tleT4KCTxkaWN0PgoJCTxrZXk+Y29tLmFwcGxlLnByaW50LlBhZ2VGb3JtYXQuUE1BZGp1c3RlZFBhZ2VSZWN0PC9rZXk+CgkJPGRpY3Q+CgkJCTxrZXk+Y29tLmFwcGxlLnByaW50LnRpY2tldC5jcmVhdG9yPC9rZXk+CgkJCTxzdHJpbmc+Y29tLmFwcGxlLnByaW50aW5nbWFuYWdlcjwvc3RyaW5nPgoJCQk8a2V5PmNvbS5hcHBsZS5wcmludC50aWNrZXQuaXRlbUFycmF5PC9rZXk+CgkJCTxhcnJheT4KCQkJCTxkaWN0PgoJCQkJCTxrZXk+Y29tLmFwcGxlLnByaW50LlBhZ2VGb3JtYXQuUE1BZGp1c3RlZFBhZ2VSZWN0PC9rZXk+CgkJCQkJPGFycmF5PgoJCQkJCQk8cmVhbD4wLjA8L3JlYWw+CgkJCQkJCTxyZWFsPjAuMDwvcmVhbD4KCQkJCQkJPHJlYWw+NzgzPC9yZWFsPgoJCQkJCQk8cmVhbD41NTk8L3JlYWw+CgkJCQkJPC9hcnJheT4KCQkJCQk8a2V5PmNvbS5hcHBsZS5wcmludC50aWNrZXQuY2xpZW50PC9rZXk+CgkJCQkJPHN0cmluZz5jb20uYXBwbGUucHJpbnRpbmdtYW5hZ2VyPC9zdHJpbmc+CgkJCQkJPGtleT5jb20uYXBwbGUucHJpbnQudGlja2V0Lm1vZERhdGU8L2tleT4KCQkJCQk8ZGF0ZT4yMDA3LTA5LTIzVDEwOjM3OjM2WjwvZGF0ZT4KCQkJCQk8a2V5PmNvbS5hcHBsZS5wcmludC50aWNrZXQuc3RhdGVGbGFnPC9rZXk+CgkJCQkJPGludGVnZXI+MDwvaW50ZWdlcj4KCQkJCTwvZGljdD4KCQkJPC9hcnJheT4KCQk8L2RpY3Q+CgkJPGtleT5jb20uYXBwbGUucHJpbnQuUGFnZUZvcm1hdC5QTUFkanVzdGVkUGFwZXJSZWN0PC9rZXk+CgkJPGRpY3Q+CgkJCTxrZXk+Y29tLmFwcGxlLnByaW50LnRpY2tldC5jcmVhdG9yPC9rZXk+CgkJCTxzdHJpbmc+Y29tLmFwcGxlLnByaW50aW5nbWFuYWdlcjwvc3RyaW5nPgoJCQk8a2V5PmNvbS5hcHBsZS5wcmludC50aWNrZXQuaXRlbUFycmF5PC9rZXk+CgkJCTxhcnJheT4KCQkJCTxkaWN0PgoJCQkJCTxrZXk+Y29tLmFwcGxlLnByaW50LlBhZ2VGb3JtYXQuUE1BZGp1c3RlZFBhcGVyUmVjdDwva2V5PgoJCQkJCTxhcnJheT4KCQkJCQkJPHJlYWw+LTE4PC9yZWFsPgoJCQkJCQk8cmVhbD4tMTg8L3JlYWw+CgkJCQkJCTxyZWFsPjgyNDwvcmVhbD4KCQkJCQkJPHJlYWw+NTc3PC9yZWFsPgoJCQkJCTwvYXJyYXk+CgkJCQkJPGtleT5jb20uYXBwbGUucHJpbnQudGlja2V0LmNsaWVudDwva2V5PgoJCQkJCTxzdHJpbmc+Y29tLmFwcGxlLnByaW50aW5nbWFuYWdlcjwvc3RyaW5nPgoJCQkJCTxrZXk+Y29tLmFwcGxlLnByaW50LnRpY2tldC5tb2REYXRlPC9rZXk+CgkJCQkJPGRhdGU+MjAwNy0wOS0yM1QxMDozNzozNlo8L2RhdGU+CgkJCQkJPGtleT5jb20uYXBwbGUucHJpbnQudGlja2V0LnN0YXRlRmxhZzwva2V5PgoJCQkJCTxpbnRlZ2VyPjA8L2ludGVnZXI+CgkJCQk8L2RpY3Q+CgkJCTwvYXJyYXk+CgkJPC9kaWN0PgoJCTxrZXk+Y29tLmFwcGxlLnByaW50LlBhcGVySW5mby5QTVBhcGVyTmFtZTwva2V5PgoJCTxkaWN0PgoJCQk8a2V5PmNvbS5hcHBsZS5wcmludC50aWNrZXQuY3JlYXRvcjwva2V5PgoJCQk8c3RyaW5nPmNvbS5hcHBsZS5wcmludC5wbS5Qb3N0U2NyaXB0PC9zdHJpbmc+CgkJCTxrZXk+Y29tLmFwcGxlLnByaW50LnRpY2tldC5pdGVtQXJyYXk8L2tleT4KCQkJPGFycmF5PgoJCQkJPGRpY3Q+CgkJCQkJPGtleT5jb20uYXBwbGUucHJpbnQuUGFwZXJJbmZvLlBNUGFwZXJOYW1lPC9rZXk+CgkJCQkJPHN0cmluZz5pc28tYTQ8L3N0cmluZz4KCQkJCQk8a2V5PmNvbS5hcHBsZS5wcmludC50aWNrZXQuY2xpZW50PC9rZXk+CgkJCQkJPHN0cmluZz5jb20uYXBwbGUucHJpbnQucG0uUG9zdFNjcmlwdDwvc3RyaW5nPgoJCQkJCTxrZXk+Y29tLmFwcGxlLnByaW50LnRpY2tldC5tb2REYXRlPC9rZXk+CgkJCQkJPGRhdGU+MjAwMy0wNy0wMVQxNzo0OTozNlo8L2RhdGU+CgkJCQkJPGtleT5jb20uYXBwbGUucHJpbnQudGlja2V0LnN0YXRlRmxhZzwva2V5PgoJCQkJCTxpbnRlZ2VyPjE8L2ludGVnZXI+CgkJCQk8L2RpY3Q+CgkJCTwvYXJyYXk+CgkJPC9kaWN0PgoJCTxrZXk+Y29tLmFwcGxlLnByaW50LlBhcGVySW5mby5QTVVuYWRqdXN0ZWRQYWdlUmVjdDwva2V5PgoJCTxkaWN0PgoJCQk8a2V5PmNvbS5hcHBsZS5wcmludC50aWNrZXQuY3JlYXRvcjwva2V5PgoJCQk8c3RyaW5nPmNvbS5hcHBsZS5wcmludC5wbS5Qb3N0U2NyaXB0PC9zdHJpbmc+CgkJCTxrZXk+Y29tLmFwcGxlLnByaW50LnRpY2tldC5pdGVtQXJyYXk8L2tleT4KCQkJPGFycmF5PgoJCQkJPGRpY3Q+CgkJCQkJPGtleT5jb20uYXBwbGUucHJpbnQuUGFwZXJJbmZvLlBNVW5hZGp1c3RlZFBhZ2VSZWN0PC9rZXk+CgkJCQkJPGFycmF5PgoJCQkJCQk8cmVhbD4wLjA8L3JlYWw+CgkJCQkJCTxyZWFsPjAuMDwvcmVhbD4KCQkJCQkJPHJlYWw+NzgzPC9yZWFsPgoJCQkJCQk8cmVhbD41NTk8L3JlYWw+CgkJCQkJPC9hcnJheT4KCQkJCQk8a2V5PmNvbS5hcHBsZS5wcmludC50aWNrZXQuY2xpZW50PC9rZXk+CgkJCQkJPHN0cmluZz5jb20uYXBwbGUucHJpbnRpbmdtYW5hZ2VyPC9zdHJpbmc+CgkJCQkJPGtleT5jb20uYXBwbGUucHJpbnQudGlja2V0Lm1vZERhdGU8L2tleT4KCQkJCQk8ZGF0ZT4yMDA3LTA5LTIyVDEwOjU1OjA1WjwvZGF0ZT4KCQkJCQk8a2V5PmNvbS5hcHBsZS5wcmludC50aWNrZXQuc3RhdGVGbGFnPC9rZXk+CgkJCQkJPGludGVnZXI+MDwvaW50ZWdlcj4KCQkJCTwvZGljdD4KCQkJPC9hcnJheT4KCQk8L2RpY3Q+CgkJPGtleT5jb20uYXBwbGUucHJpbnQuUGFwZXJJbmZvLlBNVW5hZGp1c3RlZFBhcGVyUmVjdDwva2V5PgoJCTxkaWN0PgoJCQk8a2V5PmNvbS5hcHBsZS5wcmludC50aWNrZXQuY3JlYXRvcjwva2V5PgoJCQk8c3RyaW5nPmNvbS5hcHBsZS5wcmludC5wbS5Qb3N0U2NyaXB0PC9zdHJpbmc+CgkJCTxrZXk+Y29tLmFwcGxlLnByaW50LnRpY2tldC5pdGVtQXJyYXk8L2tleT4KCQkJPGFycmF5PgoJCQkJPGRpY3Q+CgkJCQkJPGtleT5jb20uYXBwbGUucHJpbnQuUGFwZXJJbmZvLlBNVW5hZGp1c3RlZFBhcGVyUmVjdDwva2V5PgoJCQkJCTxhcnJheT4KCQkJCQkJPHJlYWw+LTE4PC9yZWFsPgoJCQkJCQk8cmVhbD4tMTg8L3JlYWw+CgkJCQkJCTxyZWFsPjgyNDwvcmVhbD4KCQkJCQkJPHJlYWw+NTc3PC9yZWFsPgoJCQkJCTwvYXJyYXk+CgkJCQkJPGtleT5jb20uYXBwbGUucHJpbnQudGlja2V0LmNsaWVudDwva2V5PgoJCQkJCTxzdHJpbmc+Y29tLmFwcGxlLnByaW50aW5nbWFuYWdlcjwvc3RyaW5nPgoJCQkJCTxrZXk+Y29tLmFwcGxlLnByaW50LnRpY2tldC5tb2REYXRlPC9rZXk+CgkJCQkJPGRhdGU+MjAwNy0wOS0yMlQxMDo1NTowNVo8L2RhdGU+CgkJCQkJPGtleT5jb20uYXBwbGUucHJpbnQudGlja2V0LnN0YXRlRmxhZzwva2V5PgoJCQkJCTxpbnRlZ2VyPjA8L2ludGVnZXI+CgkJCQk8L2RpY3Q+CgkJCTwvYXJyYXk+CgkJPC9kaWN0PgoJCTxrZXk+Y29tLmFwcGxlLnByaW50LlBhcGVySW5mby5wcGQuUE1QYXBlck5hbWU8L2tleT4KCQk8ZGljdD4KCQkJPGtleT5jb20uYXBwbGUucHJpbnQudGlja2V0LmNyZWF0b3I8L2tleT4KCQkJPHN0cmluZz5jb20uYXBwbGUucHJpbnQucG0uUG9zdFNjcmlwdDwvc3RyaW5nPgoJCQk8a2V5PmNvbS5hcHBsZS5wcmludC50aWNrZXQuaXRlbUFycmF5PC9rZXk+CgkJCTxhcnJheT4KCQkJCTxkaWN0PgoJCQkJCTxrZXk+Y29tLmFwcGxlLnByaW50LlBhcGVySW5mby5wcGQuUE1QYXBlck5hbWU8L2tleT4KCQkJCQk8c3RyaW5nPkE0PC9zdHJpbmc+CgkJCQkJPGtleT5jb20uYXBwbGUucHJpbnQudGlja2V0LmNsaWVudDwva2V5PgoJCQkJCTxzdHJpbmc+Y29tLmFwcGxlLnByaW50LnBtLlBvc3RTY3JpcHQ8L3N0cmluZz4KCQkJCQk8a2V5PmNvbS5hcHBsZS5wcmludC50aWNrZXQubW9kRGF0ZTwva2V5PgoJCQkJCTxkYXRlPjIwMDMtMDctMDFUMTc6NDk6MzZaPC9kYXRlPgoJCQkJCTxrZXk+Y29tLmFwcGxlLnByaW50LnRpY2tldC5zdGF0ZUZsYWc8L2tleT4KCQkJCQk8aW50ZWdlcj4xPC9pbnRlZ2VyPgoJCQkJPC9kaWN0PgoJCQk8L2FycmF5PgoJCTwvZGljdD4KCQk8a2V5PmNvbS5hcHBsZS5wcmludC50aWNrZXQuQVBJVmVyc2lvbjwva2V5PgoJCTxzdHJpbmc+MDAuMjA8L3N0cmluZz4KCQk8a2V5PmNvbS5hcHBsZS5wcmludC50aWNrZXQucHJpdmF0ZUxvY2s8L2tleT4KCQk8ZmFsc2UvPgoJCTxrZXk+Y29tLmFwcGxlLnByaW50LnRpY2tldC50eXBlPC9rZXk+CgkJPHN0cmluZz5jb20uYXBwbGUucHJpbnQuUGFwZXJJbmZvVGlja2V0PC9zdHJpbmc+Cgk8L2RpY3Q+Cgk8a2V5PmNvbS5hcHBsZS5wcmludC50aWNrZXQuQVBJVmVyc2lvbjwva2V5PgoJPHN0cmluZz4wMC4yMDwvc3RyaW5nPgoJPGtleT5jb20uYXBwbGUucHJpbnQudGlja2V0LnByaXZhdGVMb2NrPC9rZXk+Cgk8ZmFsc2UvPgoJPGtleT5jb20uYXBwbGUucHJpbnQudGlja2V0LnR5cGU8L2tleT4KCTxzdHJpbmc+Y29tLmFwcGxlLnByaW50LlBhZ2VGb3JtYXRUaWNrZXQ8L3N0cmluZz4KPC9kaWN0Pgo8L3BsaXN0Pgo4QklNA+kAAAAAAHgAAwAAAEgASAAAAAADDwIv/+7/7gM4AkEDZwV7A+AAAgAAAEgASAAAAAAC2AIoAAEAAABkAAAAAQADAwMAAAABf/8AAQABAAAAAAAAAAAAAAAAaAgAGQGQAAAAAAAgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA4QklNA+0AAAAAABABLAAAAAEAAgEsAAAAAQACOEJJTQQmAAAAAAAOAAAAAAAAAAAAAD+AAAA4QklNBA0AAAAAAAQAAAAeOEJJTQQZAAAAAAAEAAAAHjhCSU0D8wAAAAAACQAAAAAAAAAAAQA4QklNBAoAAAAAAAEAADhCSU0nEAAAAAAACgABAAAAAAAAAAI4QklNA/UAAAAAAEgAL2ZmAAEAbGZmAAYAAAAAAAEAL2ZmAAEAoZmaAAYAAAAAAAEAMgAAAAEAWgAAAAYAAAAAAAEANQAAAAEALQAAAAYAAAAAAAE4QklNA/gAAAAAAHAAAP////////////////////////////8D6AAAAAD/////////////////////////////A+gAAAAA/////////////////////////////wPoAAAAAP////////////////////////////8D6AAAOEJJTQQIAAAAAAAQAAAAAQAAAkAAAAJAAAAAADhCSU0EHgAAAAAABAAAAAA4QklNBBoAAAAAA0kAAAAGAAAAAAAAAAAAAAtgAAAREAAAAAoASQBNAEcAXwAzADYANQA1AF8AMgAAAAEAAAAAAAAAAAAAAAAAAAAAAAAAAQAAAAAAAAAAAAAREAAAC2AAAAAAAAAAAAAAAAAAAAAAAQAAAAAAAAAAAAAAAAAAAAAAAAAQAAAAAQAAAAAAAG51bGwAAAACAAAABmJvdW5kc09iamMAAAABAAAAAAAAUmN0MQAAAAQAAAAAVG9wIGxvbmcAAAAAAAAAAExlZnRsb25nAAAAAAAAAABCdG9tbG9uZwAAC2AAAAAAUmdodGxvbmcAABEQAAAABnNsaWNlc1ZsTHMAAAABT2JqYwAAAAEAAAAAAAVzbGljZQAAABIAAAAHc2xpY2VJRGxvbmcAAAAAAAAAB2dyb3VwSURsb25nAAAAAAAAAAZvcmlnaW5lbnVtAAAADEVTbGljZU9yaWdpbgAAAA1hdXRvR2VuZXJhdGVkAAAAAFR5cGVlbnVtAAAACkVTbGljZVR5cGUAAAAASW1nIAAAAAZib3VuZHNPYmpjAAAAAQAAAAAAAFJjdDEAAAAEAAAAAFRvcCBsb25nAAAAAAAAAABMZWZ0bG9uZwAAAAAAAAAAQnRvbWxvbmcAAAtgAAAAAFJnaHRsb25nAAAREAAAAAN1cmxURVhUAAAAAQAAAAAAAG51bGxURVhUAAAAAQAAAAAAAE1zZ2VURVhUAAAAAQAAAAAABmFsdFRhZ1RFWFQAAAABAAAAAAAOY2VsbFRleHRJc0hUTUxib29sAQAAAAhjZWxsVGV4dFRFWFQAAAABAAAAAAAJaG9yekFsaWduZW51bQAAAA9FU2xpY2VIb3J6QWxpZ24AAAAHZGVmYXVsdAAAAAl2ZXJ0QWxpZ25lbnVtAAAAD0VTbGljZVZlcnRBbGlnbgAAAAdkZWZhdWx0AAAAC2JnQ29sb3JUeXBlZW51bQAAABFFU2xpY2VCR0NvbG9yVHlwZQAAAABOb25lAAAACXRvcE91dHNldGxvbmcAAAAAAAAACmxlZnRPdXRzZXRsb25nAAAAAAAAAAxib3R0b21PdXRzZXRsb25nAAAAAAAAAAtyaWdodE91dHNldGxvbmcAAAAAADhCSU0EKAAAAAAADAAAAAE/8AAAAAAAADhCSU0EFAAAAAAABAAAAAI4QklNBAwAAAAADdEAAAABAAAAoAAAAGsAAAHgAADIoAAADbUAGAAB/9j/4AAQSkZJRgABAgEASABIAAD/7QAMQWRvYmVfQ00AAf/uAA5BZG9iZQBkgAAAAAH/2wCEAAwICAgJCAwJCQwRCwoLERUPDAwPFRgTExUTExgRDAwMDAwMEQwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwBDQsLDQ4NEA4OEBQODg4UFA4ODg4UEQwMDAwMEREMDAwMDAwRDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDP/AABEIAGsAoAMBIgACEQEDEQH/3QAEAAr/xAE/AAABBQEBAQEBAQAAAAAAAAADAAECBAUGBwgJCgsBAAEFAQEBAQEBAAAAAAAAAAEAAgMEBQYHCAkKCxAAAQQBAwIEAgUHBggFAwwzAQACEQMEIRIxBUFRYRMicYEyBhSRobFCIyQVUsFiMzRygtFDByWSU/Dh8WNzNRaisoMmRJNUZEXCo3Q2F9JV4mXys4TD03Xj80YnlKSFtJXE1OT0pbXF1eX1VmZ2hpamtsbW5vY3R1dnd4eXp7fH1+f3EQACAgECBAQDBAUGBwcGBTUBAAIRAyExEgRBUWFxIhMFMoGRFKGxQiPBUtHwMyRi4XKCkkNTFWNzNPElBhaisoMHJjXC0kSTVKMXZEVVNnRl4vKzhMPTdePzRpSkhbSVxNTk9KW1xdXl9VZmdoaWprbG1ub2JzdHV2d3h5ent8f/2gAMAwEAAhEDEQA/APPWtG9+n7v/AH1Ij9Ys/wCLCmwe9/xH/fU0frNn/Fj8qrXv5Ozw6R/v/wDfrsb7R8EONaPiUese1vy/IhRrj/EpA6rpR9I+n/Tgu8fo7fl+RTj9XP8AVTPH6O35fkU4/Vz/AFf4oE6DzXxj6pf3Jf8ASkhvH6Bv9cfkRC3V/wDVH/UlRyB+gH/GBEcNX/Af9SkTp9qBH1nyh/3bBrf0Y/qH/qSiVD6P9n/qWpmj9GP6jv8AqSp0j6H9n/qWppO7LjjqPp+SGke0/B/5SnI9p+I/KpUj2u/65+VOR7T8vyok6ohH0D+7/wBys5up+Lf4qLB73/EIjhq74tUWD3v+ISvQpMfVHzP/AHbFw/SD4n/qlIDUf1ik4fpPmf8AqgpAe4f1ilegUI6nzCGga/L+9OB7/n/BPQPd8k4HuPx/giTqWOMfRHzKG0fo2/E/lKlcP0f+amtH6Jvx/iUS0foj/ZRvbzWGPz/3B+T/AP/Q4Kse9/x/8imj9Zt/4oflRaW+9/x/iFGP1q7/AIoflVW9T5O9w6R/v/8Afsqx7W/EfkQY1xvifyKzU32s+I/IgEf0b4n/AKkoDcrpx9Mf8H/pwXeP0Nvy/IEQj9X/ALP8U1g/QW/L+CI4fq39n+KB2HmvjH1S/uH/AKUmvkD9XH/GhFcNX/1R/wBSVHJb+rj/AI5v5UV7dbP6o/6kpdB5lQj65f3Yf+pGDR7P7Dv+pU6R/N/2f+pak1v6P+w//qVOlv8AN/2f+pageq+A1H0/YgoHsd/1z/qk8ew/L/qlOhvsd/13/qki39GfgP8AqkjuqEfQP7v/AHKzhrZ8W/lUax77PiERw/nfi38qatvvt/rD8qXQqI9Ufr/3aN4/Sj+sf+qapge/+0Unj9KP6x/6pqkG/pB/XKXQKA1l9EGOPcPknj3H/Xsnxh7/ALv4pR7j/r2TurGB6B5lDaP0Lfj/ABRLR+hPwb+VRuH6Bvx/iiWj9Af6o/Kj281lfP8A3B/3T//R4qhvvs+J/Kobf1u7/ih+VHx2++34n/qlDb+tX/8AFD8qp9/J6Th0h/e/7mTKkaV/1v4Ku4aY3xP/AFJVugfzf9b+Cr2CG43xd/1LkhuunH0jzj/04MrW/oLviP8AvqI9v6r8v+/JXN/QX/H+IRHt/VPl/wB+Q6fVeI+qX9z9smvkt/Vh/wAc38qJY3Wz+qP+oKWU39WH/Ht/Ki2N1t/qN/6hyXQeZUI+uX92P/domt/RH+rZ/wBSp47dav7P/UNTtb+iP9Wz8injN91Xy/6hiBXxjr9P+9QUN9j/APrv/VhLb+jPwH/VqeO322f9d/6sJEfoj/VH/VpHdEI+geTFw0v+I/KE1Tfff5Ob+VEc3TI/17hKpv6TI/rt/Kj3UY+qP1/KaF4/Sj+uf+qaphv6Uf1z/BKxv6Uf1z/1TETb+nH9c/wS7KEdZfRq4o/Sfd+VIj3O+f8ABTxR+l+78pSe33P+f5Go9WID0DzLXuH6uz4/xRbB+r/2R+UKN4/VmfH/AL8ivH6t8ke3msrWf+zH/dP/0uRxx77Pi7/qnKMfrd3/ABQ/Kp4307Pi7/qnJo/W7v8Aiv4ql3epA0h5/sXoGtfx/ggXD2YnnP8A1LlZoHur+I/6kIF49mH8/wDqXJDddMekecf+nBJkD9Bf8f4orx+qj5f9WoZA/V8j4n8qK4fqzfiP+rQ6fVcB6pf3f++QZLf1Yf8AHj8pRbRrb/UH/UOUcgTjD/jx/wBUUSz/AAv9Rv8A1LkDsEgeqX90f90xaP0P9mz8gU8Ue6n5f9QxMwfogPFr/wDvqli80/Af9QxJdEa/T/vUOMNLR52f9WE8foz/AFR/1afFGt/xf/1af/B/2R/1YSO6ID0jyW2+3J+B/KEqR+kyv+Mb+VSaPZk/1Smp/nMr/jG/lRHVBGsfM/8ARkjtH6Yf8Yf+qYpx+sN/rn+CjcP0w/4z/vwRY/WR/WP/AH1LsoDU/Rq4o/T/AHflTPHuf/a/I1Sxf6Qfj/FKz6Vn9r8jUerHXp+pQ3j9Vr+P/fgiOH6qPgo3j9Vr+P8AEIhH6r8v4o9Pqsr1S/uD/un/0+SxuX/P/qnJh/S7f+K/inxPzvn/ANU5L/tW/wD4o/8AVKl1L1Q+WPmGVH0q/iP+pCDd9DC+P/fHItH0m/L8iFdxhDz/AO+lAfxXT2HnH/pwTZH9Hv8An/1RRXf0Zvxb/wBUh5H9Hv8An+VyI7+js/s/9Ul0Xj5j/dCO7+ij/jm/9Up2f4X+oP8AqXKFv9FH/Gt/6pTs4t/qD8hQ6BP6Uv7o/wC6ZVj2MH8l35WpYs7qf6o/6liev6Nf9U/laljc0/1R/wBS1JcDr9P+9R4vN/xf/wBWn/M/sj/qwlijXI/rO/6pL80f1R/1bUitj8v2rsHtyPg5Rx9X5P8AXb/BTrEjI+DvyIeLzefF7P4Ijqg7x8z+RWu/nR/xv8UT/tS3+t/5FDu/nP8Arv8AFFP9Kb/W/gEldT9Grj/0g/EJW/Ss/tf99Sx/6Qf6wT3fTs+B/wC+o9fox/o/U/mju/olfx/78EQ/0X5fxQ7v6JX8f4tRD/RSj0+qz9KX9wf90//U5HFOh+E/i5I/0p3/ABR/6pNjcH+qPylL/tUf+KP/AFSp9S9SD6Y/RlT9IfL8iHbzhfH/AL65Er0sA+H5EO3+cwh5/wDfSgP2FMzoP70P/SkE+QP1e/8A17uRD/R2fFv/AFSHkx9nv8x/5JTP8yz4t/6pLovHzH+6Ed2mN/11v/VtRbPo2f1B+RCv/mCPCxp/6bER59j/APiwh0Hmq/VL+6P+7Z18VebXf99Sxuaf6v8A30Jq+af6rh/1CljD+YP8k/8AUhKlwOp/l+6jxNbMgfyj/wBUmn2t/qD/AKtqfE/ncnycf71EfQb/AFB/1bUURPp+1JT/ANqPgfyIWJxd52M/K1Gp+lf5j+CDh/n+djPyhIIkfVH6qv8Ap/8AXQiH+lN/rfwQsj6R/wCMRT/SW/1v4JKvf6NXH/pB/rf3KV/85Z/Vd/BRo/pJH8r+5SyP52z+q78gR/gxX6fqfzR3f0Sv4j8rVP8A7Sn4fxULf6LX8R+UKQ/op+H8Uf4rb1P9wP8A/9XjsZzXg7HBwAAO0g6+Gickfa4gEio6afvrHd6Gk/Z+P+G/76k37P8A91/n6yrcMNfV+DvjLzND9R1GvuRdsSbGECQRBGh4H8lCsP6ziN0mTp3+ieyzW/Z5E/Z/7Hrz+CZv2f8A7rxHb1/+l+cgIw/e6Hounl5jT9RXqh/lI/vxdrJMY1k6aNknQDX/AMyUy9voMdubGhDpERPMrB/Vp/7TT/19Ofs+7/tL/wCDJcMK+f8ABcMvNcR/o/Qf5SLs5Dmmh5D2EbmnRzT+exFsexrH7nNb7ByQFgn7P/3V+XrJN9Cf+0v/AINKXDCvn69le7zXFL9Rrwj/ACkf6zvV2Me5gY5rtrSSGkGBLf3UWhriKABMt/K1qwGej7v6Px+b6sf2lH9XnX7Px29efwS4YfvfguGbmf8AxPZ/2kA7mMCbsyNYcZjWPioNI2AgggNEwRp7m/SWO37PB/mOPzfW/wBdqj+h2/8AaftEerH9pIxh+9+CI5eZr/c/73+Uh3d/HBc+0gSCORqOELB9wfth0WAEDWCOyx6vs8u3enMf4L1vx2KH6CRPodv9LP8AZ2pcMP3vwQcvM2P6P3/ykHZynNa9wcQ1xd7QSASZHAKMQftLfjx34WAPR90ehGvPqz/alR/Qzr9njy9WUuGH734KGXmdf6P2/wApF1qHMOTAc0uDiHNkSNR2U8l7G3ua57WksMNcQD4fnLId6Wxs+jEfnepH9mEmel6Zj0fl6m3/AKSNR/e/Bj93mK/mev78XTtgYjHO9rf3joOfFO1zfsjnSIDZJkRystno6R6U68erH9n81DOzdp6HPbfP4o1H97r2WnLzFn9T+j+/D/Gf/9kAOEJJTQQhAAAAAABTAAAAAQEAAAAPAEEAZABvAGIAZQAgAFAAaABvAHQAbwBzAGgAbwBwAAAAEgBBAGQAbwBiAGUAIABQAGgAbwB0AG8AcwBoAG8AcAAgAEMAUwAAAAEAOEJJTQQGAAAAAAAHAAgAAAABAQA4QklNBAQAAAAAAcIcAQAAAgAEHAFaAAMbJUccAgAAAgAEHAIFAAtSZWQgQ3VydGFpbhwCGQAJQmFja3N0YWdlHAIZAAZCZWhpbmQcAhkACEJvdW5kYXJ5HAIZAAhCcm9hZHdheRwCGQAGQ2xvc2VkHAIZAAhDb25jZXB0cxwCGQAHY3JlZGl0cxwCGQAHQ3VydGFpbhwCGQAERGFyaxwCGQANRW50ZXJ0YWlubWVudBwCGQAERmVsdBwCGQAGSGlkaW5nHAIZAAxIaWdoIFNvY2lldHkcAhkAC0lsbHVtaW5hdGVkHAIZAA1Nb3ZpZSBUaGVhdGVyHAIZAAVNb3ZpZRwCGQAHTXlzdGVyeRwCGQALUGVyZm9ybWFuY2UcAhkAA1JlZBwCGQAGU2hhZG93HAIZAARTaWxrHAIZAA1TdGFnZSBUaGVhdGVyHAIZAAVTdGFnZRwCGQAHVGhlIEVuZBwCGQAWVGhlYXRyaWNhbCBQZXJmb3JtYW5jZRwCGQAJVHVybnN0aWxlHAJ4AD8gYmVhdXRpZnVsIHJlZCBzdGFnZSBjdXJ0YWluLCBiYWNrZ3JvdW5kIHRleHR1cmUgd2l0aCBjb3B5c3BhY2X/4RIrRXhpZgAATU0AKgAAAAgADQEPAAIAAAAGAAAAqgEQAAIAAAANAAAAsAESAAMAAAABAAAAAAEaAAUAAAABAAAAvQEbAAUAAAABAAAAxQEoAAMAAAABAAIAAAExAAIAAAAdAAAAzQEyAAIAAAAUAAAA6gE+AAUAAAACAAAA/gE/AAUAAAAGAAABDgIRAAUAAAADAAABPgITAAMAAAABAAEAAIdpAAQAAAABAAABWAAABBBDYW5vbgBDYW5vbiBFT1MgNUQAAAABLAAAAAEAAAEsAAAAAUFkb2JlIFBob3Rvc2hvcCBDUyBNYWNpbnRvc2gAMjAwNzowOToyMyAxMjo0NDo1NwAAAAE5AAAD6AAAAUkAAAPoAAAAQAAAAGQAAAAhAAAAZAAAABUAAABkAAAARwAAAGQAAAAPAAAAZAAAAAYAAABkAAABKwAAA+gAAAJLAAAD6AAAAHIAAAPoAAAAGoKaAAUAAAABAAACloKdAAUAAAABAAACnogiAAMAAAABAAMAAIgnAAMAAAABAGQAAJAAAAcAAAAEMDIyMZADAAIAAAAUAAACppAEAAIAAAAUAAACupEBAAcAAAAEAQIDAJIBAAoAAAABAAACzpICAAUAAAABAAAC1pIEAAoAAAABAAAC3pIJAAMAAAABABAAAJIKAAUAAAABAAAC5pKGAAcAAAEIAAAC7qAAAAcAAAAEMDEwMKABAAMAAAAB//8AAKACAAQAAAABAAAREKADAAQAAAABAAALYKIOAAUAAAABAAAD9qIPAAUAAAABAAAD/qIQAAMAAAABAAIAAKQBAAMAAAABAAAAAKQCAAMAAAABAAAAAKQDAAMAAAABAAAAAKQGAAMAAAABAAAAAKUAAAUAAAABAAAEBgAAAAAAAAAZAAAACgAAAAgAAAABMjAwNzowOToxNyAxMjoxNjozNQAyMDA3OjA5OjE3IDEyOjE2OjM1AP/+oAAAAQAAAAYAAAABAAAAAAAAAAAAAQAAAC8AAAABAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAEKmgAAABYcALG8AAAADrgAAABYAAAAKAAAABgEDAAMAAAABAAYAAAEaAAUAAAABAAAEXgEbAAUAAAABAAAEZgEoAAMAAAABAAIAAAIBAAQAAAABAAAEbgICAAQAAAABAAANtQAAAAAAAAEsAAAAAQAAASwAAAAB/9j/4AAQSkZJRgABAgEASABIAAD/7QAMQWRvYmVfQ00AAf/uAA5BZG9iZQBkgAAAAAH/2wCEAAwICAgJCAwJCQwRCwoLERUPDAwPFRgTExUTExgRDAwMDAwMEQwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwBDQsLDQ4NEA4OEBQODg4UFA4ODg4UEQwMDAwMEREMDAwMDAwRDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDP/AABEIAGsAoAMBIgACEQEDEQH/3QAEAAr/xAE/AAABBQEBAQEBAQAAAAAAAAADAAECBAUGBwgJCgsBAAEFAQEBAQEBAAAAAAAAAAEAAgMEBQYHCAkKCxAAAQQBAwIEAgUHBggFAwwzAQACEQMEIRIxBUFRYRMicYEyBhSRobFCIyQVUsFiMzRygtFDByWSU/Dh8WNzNRaisoMmRJNUZEXCo3Q2F9JV4mXys4TD03Xj80YnlKSFtJXE1OT0pbXF1eX1VmZ2hpamtsbW5vY3R1dnd4eXp7fH1+f3EQACAgECBAQDBAUGBwcGBTUBAAIRAyExEgRBUWFxIhMFMoGRFKGxQiPBUtHwMyRi4XKCkkNTFWNzNPElBhaisoMHJjXC0kSTVKMXZEVVNnRl4vKzhMPTdePzRpSkhbSVxNTk9KW1xdXl9VZmdoaWprbG1ub2JzdHV2d3h5ent8f/2gAMAwEAAhEDEQA/APPWtG9+n7v/AH1Ij9Ys/wCLCmwe9/xH/fU0frNn/Fj8qrXv5Ozw6R/v/wDfrsb7R8EONaPiUese1vy/IhRrj/EpA6rpR9I+n/Tgu8fo7fl+RTj9XP8AVTPH6O35fkU4/Vz/AFf4oE6DzXxj6pf3Jf8ASkhvH6Bv9cfkRC3V/wDVH/UlRyB+gH/GBEcNX/Af9SkTp9qBH1nyh/3bBrf0Y/qH/qSiVD6P9n/qWpmj9GP6jv8AqSp0j6H9n/qWppO7LjjqPp+SGke0/B/5SnI9p+I/KpUj2u/65+VOR7T8vyok6ohH0D+7/wBys5up+Lf4qLB73/EIjhq74tUWD3v+ISvQpMfVHzP/AHbFw/SD4n/qlIDUf1ik4fpPmf8AqgpAe4f1ilegUI6nzCGga/L+9OB7/n/BPQPd8k4HuPx/giTqWOMfRHzKG0fo2/E/lKlcP0f+amtH6Jvx/iUS0foj/ZRvbzWGPz/3B+T/AP/Q4Kse9/x/8imj9Zt/4oflRaW+9/x/iFGP1q7/AIoflVW9T5O9w6R/v/8Afsqx7W/EfkQY1xvifyKzU32s+I/IgEf0b4n/AKkoDcrpx9Mf8H/pwXeP0Nvy/IEQj9X/ALP8U1g/QW/L+CI4fq39n+KB2HmvjH1S/uH/AKUmvkD9XH/GhFcNX/1R/wBSVHJb+rj/AI5v5UV7dbP6o/6kpdB5lQj65f3Yf+pGDR7P7Dv+pU6R/N/2f+pak1v6P+w//qVOlv8AN/2f+pageq+A1H0/YgoHsd/1z/qk8ew/L/qlOhvsd/13/qki39GfgP8AqkjuqEfQP7v/AHKzhrZ8W/lUax77PiERw/nfi38qatvvt/rD8qXQqI9Ufr/3aN4/Sj+sf+qapge/+0Unj9KP6x/6pqkG/pB/XKXQKA1l9EGOPcPknj3H/Xsnxh7/ALv4pR7j/r2TurGB6B5lDaP0Lfj/ABRLR+hPwb+VRuH6Bvx/iiWj9Af6o/Kj281lfP8A3B/3T//R4qhvvs+J/Kobf1u7/ih+VHx2++34n/qlDb+tX/8AFD8qp9/J6Th0h/e/7mTKkaV/1v4Ku4aY3xP/AFJVugfzf9b+Cr2CG43xd/1LkhuunH0jzj/04MrW/oLviP8AvqI9v6r8v+/JXN/QX/H+IRHt/VPl/wB+Q6fVeI+qX9z9smvkt/Vh/wAc38qJY3Wz+qP+oKWU39WH/Ht/Ki2N1t/qN/6hyXQeZUI+uX92P/domt/RH+rZ/wBSp47dav7P/UNTtb+iP9Wz8injN91Xy/6hiBXxjr9P+9QUN9j/APrv/VhLb+jPwH/VqeO322f9d/6sJEfoj/VH/VpHdEI+geTFw0v+I/KE1Tfff5Ob+VEc3TI/17hKpv6TI/rt/Kj3UY+qP1/KaF4/Sj+uf+qaphv6Uf1z/BKxv6Uf1z/1TETb+nH9c/wS7KEdZfRq4o/Sfd+VIj3O+f8ABTxR+l+78pSe33P+f5Go9WID0DzLXuH6uz4/xRbB+r/2R+UKN4/VmfH/AL8ivH6t8ke3msrWf+zH/dP/0uRxx77Pi7/qnKMfrd3/ABQ/Kp4307Pi7/qnJo/W7v8Aiv4ql3epA0h5/sXoGtfx/ggXD2YnnP8A1LlZoHur+I/6kIF49mH8/wDqXJDddMekecf+nBJkD9Bf8f4orx+qj5f9WoZA/V8j4n8qK4fqzfiP+rQ6fVcB6pf3f++QZLf1Yf8AHj8pRbRrb/UH/UOUcgTjD/jx/wBUUSz/AAv9Rv8A1LkDsEgeqX90f90xaP0P9mz8gU8Ue6n5f9QxMwfogPFr/wDvqli80/Af9QxJdEa/T/vUOMNLR52f9WE8foz/AFR/1afFGt/xf/1af/B/2R/1YSO6ID0jyW2+3J+B/KEqR+kyv+Mb+VSaPZk/1Smp/nMr/jG/lRHVBGsfM/8ARkjtH6Yf8Yf+qYpx+sN/rn+CjcP0w/4z/vwRY/WR/WP/AH1LsoDU/Rq4o/T/AHflTPHuf/a/I1Sxf6Qfj/FKz6Vn9r8jUerHXp+pQ3j9Vr+P/fgiOH6qPgo3j9Vr+P8AEIhH6r8v4o9Pqsr1S/uD/un/0+SxuX/P/qnJh/S7f+K/inxPzvn/ANU5L/tW/wD4o/8AVKl1L1Q+WPmGVH0q/iP+pCDd9DC+P/fHItH0m/L8iFdxhDz/AO+lAfxXT2HnH/pwTZH9Hv8An/1RRXf0Zvxb/wBUh5H9Hv8An+VyI7+js/s/9Ul0Xj5j/dCO7+ij/jm/9Up2f4X+oP8AqXKFv9FH/Gt/6pTs4t/qD8hQ6BP6Uv7o/wC6ZVj2MH8l35WpYs7qf6o/6liev6Nf9U/laljc0/1R/wBS1JcDr9P+9R4vN/xf/wBWn/M/sj/qwlijXI/rO/6pL80f1R/1bUitj8v2rsHtyPg5Rx9X5P8AXb/BTrEjI+DvyIeLzefF7P4Ijqg7x8z+RWu/nR/xv8UT/tS3+t/5FDu/nP8Arv8AFFP9Kb/W/gEldT9Grj/0g/EJW/Ss/tf99Sx/6Qf6wT3fTs+B/wC+o9fox/o/U/mju/olfx/78EQ/0X5fxQ7v6JX8f4tRD/RSj0+qz9KX9wf90//U5HFOh+E/i5I/0p3/ABR/6pNjcH+qPylL/tUf+KP/AFSp9S9SD6Y/RlT9IfL8iHbzhfH/AL65Er0sA+H5EO3+cwh5/wDfSgP2FMzoP70P/SkE+QP1e/8A17uRD/R2fFv/AFSHkx9nv8x/5JTP8yz4t/6pLovHzH+6Ed2mN/11v/VtRbPo2f1B+RCv/mCPCxp/6bER59j/APiwh0Hmq/VL+6P+7Z18VebXf99Sxuaf6v8A30Jq+af6rh/1CljD+YP8k/8AUhKlwOp/l+6jxNbMgfyj/wBUmn2t/qD/AKtqfE/ncnycf71EfQb/AFB/1bUURPp+1JT/ANqPgfyIWJxd52M/K1Gp+lf5j+CDh/n+djPyhIIkfVH6qv8Ap/8AXQiH+lN/rfwQsj6R/wCMRT/SW/1v4JKvf6NXH/pB/rf3KV/85Z/Vd/BRo/pJH8r+5SyP52z+q78gR/gxX6fqfzR3f0Sv4j8rVP8A7Sn4fxULf6LX8R+UKQ/op+H8Uf4rb1P9wP8A/9XjsZzXg7HBwAAO0g6+Gickfa4gEio6afvrHd6Gk/Z+P+G/76k37P8A91/n6yrcMNfV+DvjLzND9R1GvuRdsSbGECQRBGh4H8lCsP6ziN0mTp3+ieyzW/Z5E/Z/7Hrz+CZv2f8A7rxHb1/+l+cgIw/e6Hounl5jT9RXqh/lI/vxdrJMY1k6aNknQDX/AMyUy9voMdubGhDpERPMrB/Vp/7TT/19Ofs+7/tL/wCDJcMK+f8ABcMvNcR/o/Qf5SLs5Dmmh5D2EbmnRzT+exFsexrH7nNb7ByQFgn7P/3V+XrJN9Cf+0v/AINKXDCvn69le7zXFL9Rrwj/ACkf6zvV2Me5gY5rtrSSGkGBLf3UWhriKABMt/K1qwGej7v6Px+b6sf2lH9XnX7Px29efwS4YfvfguGbmf8AxPZ/2kA7mMCbsyNYcZjWPioNI2AgggNEwRp7m/SWO37PB/mOPzfW/wBdqj+h2/8AaftEerH9pIxh+9+CI5eZr/c/73+Uh3d/HBc+0gSCORqOELB9wfth0WAEDWCOyx6vs8u3enMf4L1vx2KH6CRPodv9LP8AZ2pcMP3vwQcvM2P6P3/ykHZynNa9wcQ1xd7QSASZHAKMQftLfjx34WAPR90ehGvPqz/alR/Qzr9njy9WUuGH734KGXmdf6P2/wApF1qHMOTAc0uDiHNkSNR2U8l7G3ua57WksMNcQD4fnLId6Wxs+jEfnepH9mEmel6Zj0fl6m3/AKSNR/e/Bj93mK/mev78XTtgYjHO9rf3joOfFO1zfsjnSIDZJkRystno6R6U68erH9n81DOzdp6HPbfP4o1H97r2WnLzFn9T+j+/D/Gf/9n/4gJASUNDX1BST0ZJTEUAAQEAAAIwQURCRQIQAABtbnRyUkdCIFhZWiAH0AAIAAsAEwAzADthY3NwQVBQTAAAAABub25lAAAAAAAAAAAAAAAAAAAAAAAA9tYAAQAAAADTLUFEQkUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAApjcHJ0AAAA/AAAADJkZXNjAAABMAAAAGt3dHB0AAABnAAAABRia3B0AAABsAAAABRyVFJDAAABxAAAAA5nVFJDAAAB1AAAAA5iVFJDAAAB5AAAAA5yWFlaAAAB9AAAABRnWFlaAAACCAAAABRiWFlaAAACHAAAABR0ZXh0AAAAAENvcHlyaWdodCAyMDAwIEFkb2JlIFN5c3RlbXMgSW5jb3Jwb3JhdGVkAAAAZGVzYwAAAAAAAAARQWRvYmUgUkdCICgxOTk4KQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAWFlaIAAAAAAAAPNRAAEAAAABFsxYWVogAAAAAAAAAAAAAAAAAAAAAGN1cnYAAAAAAAAAAQIzAABjdXJ2AAAAAAAAAAECMwAAY3VydgAAAAAAAAABAjMAAFhZWiAAAAAAAACcGAAAT6UAAAT8WFlaIAAAAAAAADSNAACgLAAAD5VYWVogAAAAAAAAJjEAABAvAAC+nP/hICNodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+Cjx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IlB1YmxpYyBYTVAgVG9vbGtpdCBDb3JlIDQuMCI+CiAgIDxyZGY6UkRGIHhtbG5zOnJkZj0iaHR0cDovL3d3dy53My5vcmcvMTk5OS8wMi8yMi1yZGYtc3ludGF4LW5zIyI+CiAgICAgIDxyZGY6RGVzY3JpcHRpb24gcmRmOmFib3V0PSIiCiAgICAgICAgICAgIHhtbG5zOmV4aWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20vZXhpZi8xLjAvIj4KICAgICAgICAgPGV4aWY6RXhwb3N1cmVUaW1lPjI1LzEwPC9leGlmOkV4cG9zdXJlVGltZT4KICAgICAgICAgPGV4aWY6Rk51bWJlcj44LzE8L2V4aWY6Rk51bWJlcj4KICAgICAgICAgPGV4aWY6RXhwb3N1cmVQcm9ncmFtPjM8L2V4aWY6RXhwb3N1cmVQcm9ncmFtPgogICAgICAgICA8ZXhpZjpFeGlmVmVyc2lvbj4wMjIxPC9leGlmOkV4aWZWZXJzaW9uPgogICAgICAgICA8ZXhpZjpEYXRlVGltZU9yaWdpbmFsPjIwMDctMDktMTdUMTI6MTY6MzUrMDI6MDA8L2V4aWY6RGF0ZVRpbWVPcmlnaW5hbD4KICAgICAgICAgPGV4aWY6RGF0ZVRpbWVEaWdpdGl6ZWQ+MjAwNy0wOS0xN1QxMjoxNjozNSswMjowMDwvZXhpZjpEYXRlVGltZURpZ2l0aXplZD4KICAgICAgICAgPGV4aWY6U2h1dHRlclNwZWVkVmFsdWU+LTkwMTEyLzY1NTM2PC9leGlmOlNodXR0ZXJTcGVlZFZhbHVlPgogICAgICAgICA8ZXhpZjpBcGVydHVyZVZhbHVlPjM5MzIxNi82NTUzNjwvZXhpZjpBcGVydHVyZVZhbHVlPgogICAgICAgICA8ZXhpZjpFeHBvc3VyZUJpYXNWYWx1ZT4wLzE8L2V4aWY6RXhwb3N1cmVCaWFzVmFsdWU+CiAgICAgICAgIDxleGlmOkZvY2FsTGVuZ3RoPjQ3LzE8L2V4aWY6Rm9jYWxMZW5ndGg+CiAgICAgICAgIDxleGlmOkZsYXNocGl4VmVyc2lvbj4wMTAwPC9leGlmOkZsYXNocGl4VmVyc2lvbj4KICAgICAgICAgPGV4aWY6Q29sb3JTcGFjZT40Mjk0OTY3Mjk1PC9leGlmOkNvbG9yU3BhY2U+CiAgICAgICAgIDxleGlmOlBpeGVsWERpbWVuc2lvbj40MzY4PC9leGlmOlBpeGVsWERpbWVuc2lvbj4KICAgICAgICAgPGV4aWY6UGl4ZWxZRGltZW5zaW9uPjI5MTI8L2V4aWY6UGl4ZWxZRGltZW5zaW9uPgogICAgICAgICA8ZXhpZjpGb2NhbFBsYW5lWFJlc29sdXRpb24+NDM2ODAwMC8xNDE1PC9leGlmOkZvY2FsUGxhbmVYUmVzb2x1dGlvbj4KICAgICAgICAgPGV4aWY6Rm9jYWxQbGFuZVlSZXNvbHV0aW9uPjI5MTIwMDAvOTQyPC9leGlmOkZvY2FsUGxhbmVZUmVzb2x1dGlvbj4KICAgICAgICAgPGV4aWY6Rm9jYWxQbGFuZVJlc29sdXRpb25Vbml0PjI8L2V4aWY6Rm9jYWxQbGFuZVJlc29sdXRpb25Vbml0PgogICAgICAgICA8ZXhpZjpDdXN0b21SZW5kZXJlZD4wPC9leGlmOkN1c3RvbVJlbmRlcmVkPgogICAgICAgICA8ZXhpZjpFeHBvc3VyZU1vZGU+MDwvZXhpZjpFeHBvc3VyZU1vZGU+CiAgICAgICAgIDxleGlmOldoaXRlQmFsYW5jZT4wPC9leGlmOldoaXRlQmFsYW5jZT4KICAgICAgICAgPGV4aWY6U2NlbmVDYXB0dXJlVHlwZT4wPC9leGlmOlNjZW5lQ2FwdHVyZVR5cGU+CiAgICAgICAgIDxleGlmOklTT1NwZWVkUmF0aW5ncz4KICAgICAgICAgICAgPHJkZjpTZXE+CiAgICAgICAgICAgICAgIDxyZGY6bGk+MTAwPC9yZGY6bGk+CiAgICAgICAgICAgIDwvcmRmOlNlcT4KICAgICAgICAgPC9leGlmOklTT1NwZWVkUmF0aW5ncz4KICAgICAgICAgPGV4aWY6Q29tcG9uZW50c0NvbmZpZ3VyYXRpb24+CiAgICAgICAgICAgIDxyZGY6U2VxPgogICAgICAgICAgICAgICA8cmRmOmxpPjE8L3JkZjpsaT4KICAgICAgICAgICAgICAgPHJkZjpsaT4yPC9yZGY6bGk+CiAgICAgICAgICAgICAgIDxyZGY6bGk+MzwvcmRmOmxpPgogICAgICAgICAgICAgICA8cmRmOmxpPjA8L3JkZjpsaT4KICAgICAgICAgICAgPC9yZGY6U2VxPgogICAgICAgICA8L2V4aWY6Q29tcG9uZW50c0NvbmZpZ3VyYXRpb24+CiAgICAgICAgIDxleGlmOkZsYXNoIHJkZjpwYXJzZVR5cGU9IlJlc291cmNlIj4KICAgICAgICAgICAgPGV4aWY6RmlyZWQ+RmFsc2U8L2V4aWY6RmlyZWQ+CiAgICAgICAgICAgIDxleGlmOlJldHVybj4wPC9leGlmOlJldHVybj4KICAgICAgICAgICAgPGV4aWY6TW9kZT4yPC9leGlmOk1vZGU+CiAgICAgICAgICAgIDxleGlmOkZ1bmN0aW9uPkZhbHNlPC9leGlmOkZ1bmN0aW9uPgogICAgICAgICAgICA8ZXhpZjpSZWRFeWVNb2RlPkZhbHNlPC9leGlmOlJlZEV5ZU1vZGU+CiAgICAgICAgIDwvZXhpZjpGbGFzaD4KICAgICAgPC9yZGY6RGVzY3JpcHRpb24+CiAgICAgIDxyZGY6RGVzY3JpcHRpb24gcmRmOmFib3V0PSIiCiAgICAgICAgICAgIHhtbG5zOnBob3Rvc2hvcD0iaHR0cDovL25zLmFkb2JlLmNvbS9waG90b3Nob3AvMS4wLyI+CiAgICAgICAgIDxwaG90b3Nob3A6SGlzdG9yeS8+CiAgICAgIDwvcmRmOkRlc2NyaXB0aW9uPgogICAgICA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIgogICAgICAgICAgICB4bWxuczp0aWZmPSJodHRwOi8vbnMuYWRvYmUuY29tL3RpZmYvMS4wLyI+CiAgICAgICAgIDx0aWZmOk1ha2U+Q2Fub248L3RpZmY6TWFrZT4KICAgICAgICAgPHRpZmY6TW9kZWw+Q2Fub24gRU9TIDVEPC90aWZmOk1vZGVsPgogICAgICAgICA8dGlmZjpPcmllbnRhdGlvbj4xPC90aWZmOk9yaWVudGF0aW9uPgogICAgICAgICA8dGlmZjpYUmVzb2x1dGlvbj4zMDAvMTwvdGlmZjpYUmVzb2x1dGlvbj4KICAgICAgICAgPHRpZmY6WVJlc29sdXRpb24+MzAwLzE8L3RpZmY6WVJlc29sdXRpb24+CiAgICAgICAgIDx0aWZmOlJlc29sdXRpb25Vbml0PjI8L3RpZmY6UmVzb2x1dGlvblVuaXQ+CiAgICAgICAgIDx0aWZmOllDYkNyUG9zaXRpb25pbmc+MTwvdGlmZjpZQ2JDclBvc2l0aW9uaW5nPgogICAgICAgICA8dGlmZjpXaGl0ZVBvaW50PgogICAgICAgICAgICA8cmRmOlNlcT4KICAgICAgICAgICAgICAgPHJkZjpsaT4zMTMvMTAwMDwvcmRmOmxpPgogICAgICAgICAgICAgICA8cmRmOmxpPjMyOS8xMDAwPC9yZGY6bGk+CiAgICAgICAgICAgIDwvcmRmOlNlcT4KICAgICAgICAgPC90aWZmOldoaXRlUG9pbnQ+CiAgICAgICAgIDx0aWZmOlByaW1hcnlDaHJvbWF0aWNpdGllcz4KICAgICAgICAgICAgPHJkZjpTZXE+CiAgICAgICAgICAgICAgIDxyZGY6bGk+NjQvMTAwPC9yZGY6bGk+CiAgICAgICAgICAgICAgIDxyZGY6bGk+MzMvMTAwPC9yZGY6bGk+CiAgICAgICAgICAgICAgIDxyZGY6bGk+MjEvMTAwPC9yZGY6bGk+CiAgICAgICAgICAgICAgIDxyZGY6bGk+NzEvMTAwPC9yZGY6bGk+CiAgICAgICAgICAgICAgIDxyZGY6bGk+MTUvMTAwPC9yZGY6bGk+CiAgICAgICAgICAgICAgIDxyZGY6bGk+Ni8xMDA8L3JkZjpsaT4KICAgICAgICAgICAgPC9yZGY6U2VxPgogICAgICAgICA8L3RpZmY6UHJpbWFyeUNocm9tYXRpY2l0aWVzPgogICAgICAgICA8dGlmZjpZQ2JDckNvZWZmaWNpZW50cz4KICAgICAgICAgICAgPHJkZjpTZXE+CiAgICAgICAgICAgICAgIDxyZGY6bGk+Mjk5LzEwMDA8L3JkZjpsaT4KICAgICAgICAgICAgICAgPHJkZjpsaT41ODcvMTAwMDwvcmRmOmxpPgogICAgICAgICAgICAgICA8cmRmOmxpPjExNC8xMDAwPC9yZGY6bGk+CiAgICAgICAgICAgIDwvcmRmOlNlcT4KICAgICAgICAgPC90aWZmOllDYkNyQ29lZmZpY2llbnRzPgogICAgICA8L3JkZjpEZXNjcmlwdGlvbj4KICAgICAgPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIKICAgICAgICAgICAgeG1sbnM6eGFwPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIj4KICAgICAgICAgPHhhcDpDcmVhdGVEYXRlPjIwMDctMDktMjJUMTM6MDA6NDMrMDI6MDA8L3hhcDpDcmVhdGVEYXRlPgogICAgICAgICA8eGFwOk1vZGlmeURhdGU+MjAwNy0wOS0yM1QxMjo0NDo1NyswMjowMDwveGFwOk1vZGlmeURhdGU+CiAgICAgICAgIDx4YXA6TWV0YWRhdGFEYXRlPjIwMDctMDktMjNUMTI6NDQ6NTcrMDI6MDA8L3hhcDpNZXRhZGF0YURhdGU+CiAgICAgICAgIDx4YXA6Q3JlYXRvclRvb2w+QWRvYmUgUGhvdG9zaG9wIENTIE1hY2ludG9zaDwveGFwOkNyZWF0b3JUb29sPgogICAgICA8L3JkZjpEZXNjcmlwdGlvbj4KICAgICAgPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIKICAgICAgICAgICAgeG1sbnM6eGFwTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iPgogICAgICAgICA8eGFwTU06RG9jdW1lbnRJRD5hZG9iZTpkb2NpZDpwaG90b3Nob3A6NTViZDA3NmItNmE5ZC0xMWRjLWIwZjUtZDY0NTIxZjkzMzNhPC94YXBNTTpEb2N1bWVudElEPgogICAgICAgICA8eGFwTU06SW5zdGFuY2VJRD51dWlkOmUyOTY2YTZhLTZiNjQtMTFkYy1iNDExLWIxMDM1ZDdiOGViNzwveGFwTU06SW5zdGFuY2VJRD4KICAgICAgPC9yZGY6RGVzY3JpcHRpb24+CiAgICAgIDxyZGY6RGVzY3JpcHRpb24gcmRmOmFib3V0PSIiCiAgICAgICAgICAgIHhtbG5zOmRjPSJodHRwOi8vcHVybC5vcmcvZGMvZWxlbWVudHMvMS4xLyI+CiAgICAgICAgIDxkYzpmb3JtYXQ+aW1hZ2UvanBlZzwvZGM6Zm9ybWF0PgogICAgICAgICA8ZGM6c3ViamVjdD4KICAgICAgICAgICAgPHJkZjpCYWc+CiAgICAgICAgICAgICAgIDxyZGY6bGk+QmFja3N0YWdlPC9yZGY6bGk+CiAgICAgICAgICAgICAgIDxyZGY6bGk+QmVoaW5kPC9yZGY6bGk+CiAgICAgICAgICAgICAgIDxyZGY6bGk+Qm91bmRhcnk8L3JkZjpsaT4KICAgICAgICAgICAgICAgPHJkZjpsaT5Ccm9hZHdheTwvcmRmOmxpPgogICAgICAgICAgICAgICA8cmRmOmxpPkNsb3NlZDwvcmRmOmxpPgogICAgICAgICAgICAgICA8cmRmOmxpPkNvbmNlcHRzPC9yZGY6bGk+CiAgICAgICAgICAgICAgIDxyZGY6bGk+Y3JlZGl0czwvcmRmOmxpPgogICAgICAgICAgICAgICA8cmRmOmxpPkN1cnRhaW48L3JkZjpsaT4KICAgICAgICAgICAgICAgPHJkZjpsaT5EYXJrPC9yZGY6bGk+CiAgICAgICAgICAgICAgIDxyZGY6bGk+RW50ZXJ0YWlubWVudDwvcmRmOmxpPgogICAgICAgICAgICAgICA8cmRmOmxpPkZlbHQ8L3JkZjpsaT4KICAgICAgICAgICAgICAgPHJkZjpsaT5IaWRpbmc8L3JkZjpsaT4KICAgICAgICAgICAgICAgPHJkZjpsaT5IaWdoIFNvY2lldHk8L3JkZjpsaT4KICAgICAgICAgICAgICAgPHJkZjpsaT5JbGx1bWluYXRlZDwvcmRmOmxpPgogICAgICAgICAgICAgICA8cmRmOmxpPk1vdmllIFRoZWF0ZXI8L3JkZjpsaT4KICAgICAgICAgICAgICAgPHJkZjpsaT5Nb3ZpZTwvcmRmOmxpPgogICAgICAgICAgICAgICA8cmRmOmxpPk15c3Rlcnk8L3JkZjpsaT4KICAgICAgICAgICAgICAgPHJkZjpsaT5QZXJmb3JtYW5jZTwvcmRmOmxpPgogICAgICAgICAgICAgICA8cmRmOmxpPlJlZDwvcmRmOmxpPgogICAgICAgICAgICAgICA8cmRmOmxpPlNoYWRvdzwvcmRmOmxpPgogICAgICAgICAgICAgICA8cmRmOmxpPlNpbGs8L3JkZjpsaT4KICAgICAgICAgICAgICAgPHJkZjpsaT5TdGFnZSBUaGVhdGVyPC9yZGY6bGk+CiAgICAgICAgICAgICAgIDxyZGY6bGk+U3RhZ2U8L3JkZjpsaT4KICAgICAgICAgICAgICAgPHJkZjpsaT5UaGUgRW5kPC9yZGY6bGk+CiAgICAgICAgICAgICAgIDxyZGY6bGk+VGhlYXRyaWNhbCBQZXJmb3JtYW5jZTwvcmRmOmxpPgogICAgICAgICAgICAgICA8cmRmOmxpPlR1cm5zdGlsZTwvcmRmOmxpPgogICAgICAgICAgICA8L3JkZjpCYWc+CiAgICAgICAgIDwvZGM6c3ViamVjdD4KICAgICAgICAgPGRjOmRlc2NyaXB0aW9uPgogICAgICAgICAgICA8cmRmOkFsdD4KICAgICAgICAgICAgICAgPHJkZjpsaSB4bWw6bGFuZz0ieC1kZWZhdWx0Ij4gYmVhdXRpZnVsIHJlZCBzdGFnZSBjdXJ0YWluLCBiYWNrZ3JvdW5kIHRleHR1cmUgd2l0aCBjb3B5c3BhY2U8L3JkZjpsaT4KICAgICAgICAgICAgPC9yZGY6QWx0PgogICAgICAgICA8L2RjOmRlc2NyaXB0aW9uPgogICAgICAgICA8ZGM6dGl0bGU+CiAgICAgICAgICAgIDxyZGY6QWx0PgogICAgICAgICAgICAgICA8cmRmOmxpIHhtbDpsYW5nPSJ4LWRlZmF1bHQiPlJlZCBDdXJ0YWluPC9yZGY6bGk+CiAgICAgICAgICAgIDwvcmRmOkFsdD4KICAgICAgICAgPC9kYzp0aXRsZT4KICAgICAgPC9yZGY6RGVzY3JpcHRpb24+CiAgIDwvcmRmOlJERj4KPC94OnhtcG1ldGE+CiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAKPD94cGFja2V0IGVuZD0idyI/Pv/bAEMAEgwNEA0LEhAOEBQTEhUbLB0bGBgbNicpICxAOURDPzk+PUdQZldHS2FNPT5ZeVphaW1yc3JFVX2GfG+FZnBybv/bAEMBExQUGxcbNB0dNG5JPklubm5ubm5ubm5ubm5ubm5ubm5ubm5ubm5ubm5ubm5ubm5ubm5ubm5ubm5ubm5ubm5ubv/AABEIBLAHCAMBEQACEQEDEQH/xAAaAAADAQEBAQAAAAAAAAAAAAABAgMABAUG/8QANRABAAMAAwABAwMBBwUAAgIDAAECMQMyQREEIUISM3GRBRQVIlFSgRNDU2GhNMEjYtEkcv/EABkBAQEBAQEBAAAAAAAAAAAAAAABAgMEBf/EACMRAQEBAQADAQEBAAMBAQEAAAABAjEDEUESEzIUIVEEQmH/2gAMAwEAAhEDEQA/APkI4Kf+/wCrH6r0Tx5aeCkeT/U90/nkY4afHX/6e6v88/8Aid6ViftC+2LmQ1aVmOsHs/MH9Ff9sJ7a/MNWlf8AbH9E9tzM/wDFIrWIyP6I1JAmI/0j+glicKzFI1GxkVgYCXxWahbZajjW8Vk/Glayp7DLr9U8R0CRE7DNKrIgaBo0AEgaMRokdhn6fwaCQaoQ0o0lbVcqVUMKaMRqDQqwZ2RanZXOpWWOdGqoeEVSMR2nDIoSIFRYa2I1eIfk04/VIwaGmpVyp4joWRCSM0stMVP8lc6eMFgwVqHqzXSHnEbLGiQyNCDACoWwlRns1HG9NAkEaUjEdIEhQgIeqNQZRajdqOWkZ1qONFUERSOrLtnhvEbPTEreWviLUJ1pxowKeo1DWwWlGT1RuBfCGkI1pwMINdK1FLdWXS8CmBAnVSnqjcT5clYxvhqdIKY4auo1OjZG6hyNxw2SNVzdHFjFejx8NZG6lbVc6NRYoNBIMIwMKaqNRrYhXPfXSPNvqfqubo40rtgL6ka0avUWcCRKEaIrVmusayKSVZqc6rnenjBsb4FTjVc1YGwkC10SK+MuqdlYpZGaEarKkI2KqyDSoWRkAGAikYy6RPkWMaJCsw1dRYaVUBDVRqE5cIzvhIbcYKNNHYWdWnqw7/E41WDzg0HoyIpoRprYLUbdlcb0YFhhol8WMaL4rBq4LBkCgaiVrKnjLqWVZpRAkSmopDI0wFlUCRBjQPCNwnJhGd8TacwGTVFgyKT1WTwjcZA8DcFFEULYhS1aczQjUTnVYvQEGFAnYBScZdPicqxWoqRRGmAJFLKslGT1RuGnEbLXVc51rI1Up1qON6bxQsiNAGgah6stww2yAWxUoVwSN6IbwaTsRjRJacxgGp9/kIeqOkadAYxBHk1qOdNTAgjRqo1Do0FhKlCsxWEbgyKwAIW+DNc9vW440PBlTjGsq+wy7Q7LYSFTlWKVWRA40MChIGjEWEjsM/TjYSI1RYacRalbVc6VUMKaMRRoVcjbUWp2WOek7Y1HOjUQ0CqVxl2hhoJEapVg26ot4h+TTj9UjEaGmlXKniOpZELIxSSrNT/JpyPAsGEah66ldIpOMuhI1WYdGmBgAC2Vmoz2acaaoQwp4ZdI0ilhUPCNwZxFRu1HHSU6041lQRFYxmu84Mo2emQlazxr4i1Gdaca0CqVRqDZVKIeqNxuTEhrjnjW3nMINdK1FLdWXX41cEhZ1SnjEahObFjGxp0gpjhq6lbnTWRqufkajhssa05r8WMV6PHw1kdKlbVc6NQikI20qAIwMB6o1GshXNya3Hm30nrTmvxs12wF9SNaNXqNQJVKEaIrVmukGyNJyrFJOqweMGmuFJGqwpGDUCQCNCKeMuidlYpZGaEaqKQjRhWAJAsqgCDAsUjGXSJ8hGNEhpiGrqNQ8qAA1StQnLhGdkhtwFGhjRZ1X8WHecTjsrP1ScRS+qgimhFjWRajbs043owLDDRL4sY0XxWD1wajSBRD0StZU8ZdSSJSqyEgagQwrAEgEqy0aB4ZrcJyYsZ3xNXMFQ1RYaQJ6rJoRuCimgago0KKFsEpaq5mgaic7Ks3oCDCjTsCH8ZdJxOVYo0CHGmAJAsqzS+iHqjUPOI2Suqx9ayLU51qOVFUCRAgDQjUPVHSGGmQC2CUK4qRvQN4ip3WMaJLTnRjAamizqkMtwJUGMRUOTWnKnrgQUaNVGoeEbCypU4GYpCNQRWUYCXwY057bLUcaHisqcZW8q+wy6zp2XQJEpJVilVG9A6KKq0gMYjXwsdhkw0EiDUWGlFqVtVzpYVBRTxgo0K1kbeItSusc9J2xpzo1wZNAsUjGXaGGgkRqlXI2xFqH5NOP1SMRsaaVcqMugSqUkjNJKsVP8mnOqQLBhFhq6ldIpOMuhI1Uh0VhWEYCWVmoz2acaeoQRo8I3GlFCFQ8MtwZwVC7UcdJTrUcaKowKxjNdpw0o2emQlbzwL4kKjOtOQwB6o2NsClVFKs1uByYQ0hGtvOMgNdKsVnGXb4FRIWdVKpXqy3OJ8uNRjfBp1gpjhq6lahrI1XPyNRw2WGnNfixivR4+GsjpUrarnRqLFUaCVKAjAwHqjUayLXPfW483k6n605L8TNd8BfUjWjx1FhZVGgRWuM11jWRU5ViknVYp4waa4tJGq5qRiNwJVAroRTxl0TsM0sqwEaqKwjYisASFCVZKIMIsVjEdInyEZ0nCucNXRqHkWgqGhGony4RnfCQ04Qw00aNTq34sO84lHZWPqk4jRfVZEU0I1GtiFRt2acr00Cww0nfFjGi+K5nqNRpAANRK1lRl0JIlKqNIg0CGGmABAlUrRoh4ZdITkxYzriauYKyeosGQJ6qGhGoKKaEahhoYRQsJSV1WDQNROdVi9AQYBrbCpT/iy6zidlYo0EhxpgCQLIyX1UPVGoecR0JXZVz+jKNVK2tRx0KoEiBAGhGz1RuGGhRS2EoVxWY3oG8Gk7kY0SWnOjGCNTsLOqQy3AlQYxFQ5OzTlT1wWCimqjUPCNhZWanAkUhG4IMDAS+Kzpz2bjhQ8GVOMreVvYYdZ0yOgSJSSrNKrLegdGjAEgMYjRY1Uh0aLKoNUIaRpK2q50sKyKKeMFGhWsjbEWpXWOdTtjUc6NRDwEUhl3gitIBVKuRtgtQ/Jpw+q+I21NKuVYxl0LIlJKs0kqxSfk05ngWDCNQ9UrcPOMuhY1UhkaYGBgJZWalPZpxvTVwQZGjwy6RpAIA9UagzgqN2o5aRnWnCiqMCsYzXacNKN09chmt5a+BpCdachgWHqjRrYLSDKlUrpA5MImkI1twEQ1dK1lScZdQqECdGaeuJW5xPk6rGN8GnSP4WmOHrqVuDZlqufkbjhssNOa/FjFd/Hw9sZdKjZpzo1FiqNhIgKMDIHqNRroVz8mtx5vJ1P1pzX4ma7eML6ka0eOo1OFkZrQqK1xl1jSipyrNJOqweMFa4tJGqwpGI1AkArqpFfGXVORiklWQjRFYG4IMKEiBIhVQYQitcR0ifIRnScKxD10ahpFoKyarLcT5cWMbLDTiI00aL9V/Fiu04SOys/TziNF9VkRTwjUCyFSt2acr0YGoZFJfFjOiQ05nriLGkAUNRK1lRl1JIlBWQkQaCw4oAEiBKo0aIerLpCcmEZ1xNpzZUpqiwZAnqsmhlqCKaMRqGGhhFCwUldVzPA1Ep0ZvQVBgRrbClP+LLpOEsrFagQ4rCsBJGaVWVKo1DTiOhI0Y+jYWpW1qOWhVkJEaAGEbh6o3Do2wBYShXBI3qobxGk7rGNJy050YwRqdhZ1SGXSBOqDGIIX7NOV6euCwUU1Ubh4RoLKlJXBmHhG4IrCMKS+LGNIW9acKXxWVOMreVo2GHadOjZZAkqxSqy3oHRowBID+KNFjVSHlGglUaqENODSVtWOdL6rIo0eMFGiVcjYaqVsWOVTtjTnRqIeAikMu8MNBIgUKuTX6ot4547NOP1XxG2rpTPVWXUsiElWKSysUn5NOZ4RRgah66ldIecZdCxohhWBgYC2Vmoz2VxvTVxSDIp4R0jSgEAeqNwZwEbrHLSMtuNFWWBWMZd5w04jVPTGa3lr4RdcQnWnEYRYpUbG2BSKilWW4HJhDSEa085pVBrpWop4y7NUIWdGaeiVuJ8uSsc98Hj6R/C0xw9dRuDZGq5+RqOGyw05r8WMV38fD2ZdKjZpimqEURsJABGAQNCNRrBXPya3Hn8nU/WnKr8WM12w19SNaNHUahZGa0KitcZrrGsipyrNJOqweMGhukKSNaYUjEbLIgRokV8R1icjFLKs0I0RSBuCKyASqBIhRBgFa4jpE+QjOk4ViHqNQ0i0FZNVluJ8qxjZYacRGmjRfq34sO84nHYZ+nnBSqggeEagWQqVuzTlejA1DI0S+LGNEhpzilcRqNIFVDUStZU8ZdYWRKVWQkDUCGFAAkQJVGjQPVluF5MIzpNpzBUpqiwZwCejJ4RuMKaMRqGFGEUJAldVg8CxKewzesqUYALbCpVI6s10nE5Ga1FSHGmBpAkjNBWT1RuGnGWyxqsfWkVO2tRy0yshINAgwjalUbhkbYAsFCozGnVKbxFid1jOk5Vyo1UavYJ1SGXQJ0DeA5792nK9UrgsZGjVRqHhGi3xUpajMPCNwRWBgJfFjGkLetRxpfFZU4ytZWjWHadOjYSCcqxSqyPoHhGxAJEN4jZa6qQ0opZVKNQhpRqpW1XOlVkYRpSMFaiVrJrC1KyuVStjUc6NRDwLFIZdoZGglUampVyN+ouuIR2acfqsYjYV0pFfGXUsiElWaSyudJ605qQjUaBYeqV0h5xl0L6IYVoAQAC2xWajPZXG9NCkGRo8MtxpFoQIeEbgzgtR5FjlpGW44URllFYxl3nDSjVPTGa6Z418IaQnVcRgailRobYLSejKlUbgcmENIRrTzmlQa6LFPGXZqhCzozT1StxPl9WOex4+kfwtMcPRmtwbYjVQ5G44bJDTmvxYxXo8Z7MulSs050aosUGgkAEYBA8I1AsFc/JrcefydT9acqvxYzXbDX1I3o0dRZwsiVoVIrXGa6RpRSSrNJOqwaPEaG5FpI1WFIwaLYShGiK+MusTsrNLKshGjKkDYorA0qhZEBUaqEVriOkJyETSUK5w9dGoeRaVWT1xmtxLlxYxssNOQitGoq0dWa7zicdhn6pODRFZGEDwNBbEKlbs053owLDI0S+LGNEhpzUqjUaQKIahWsqMusLIlKqBIhqBDI0CgSJQkZaNUUhluE5MImuJtOQCGqLBnAJ6rJ4RuMKaMRqGRRgUJFJGq5/TwNROewxegqDUAtqpVI6s10nE7DNaipDjTA0gWRml9Vk9UbhvGWyxqsNI0nbWo5aZWQkRgGEaPVG4dG2AJChUZjTqlN4ixO6s6TlY50aqjV7BOqQy6BOgbwVz37tON6pXEWMNGqjUUhGiXyVZpYCKQjUYVgYCXxYxpC3rUcaWMVhTjSt5WjWXaHR0CRE5VigI3qh4RoQCQN4jRY1UhpRosqzRqhDTg1UrarnSjJoGjxg01Eq5NYWpWWOdStjTnRqMngWKQy7QyNhKshTUq5NfBdIR2acVfEbCuhFfGXUsiUkqzS2Vip/k05KRiNRoFh6pXSKTjLoQQ0CtAogAhbYM1GezUcr08ZKkGUU0I3GkUIEikI3GnEVG7UctIy24URllFYxh3nDSjdUriVuByYQ0hOq5DAsUqNwbYFJGjKlUbgcmENIxrTgMqg10q5V8YdgqELOqzVKo3EuX1Y57Hj6QtMcPRmt5Gw1UORqOGyQ05ujixjT0ePhrMuiVmnOjVFio2WRAEbwBgDwjQWCufk1uPP5E/WnKr8TNdvG19RvRo6iwsiVoEVqy6RpFJKs0k6rBo8RobkWkjVYUjBoLBSxozFfEdYnYZpZVmhGjKkI2IogEhSyrICDGhFKo6QlyJpOFc4aujcPItKrJ64zW4ly4sc9lhpyEab1BaOrNd5xOOwz9UnBonqsjCB4RqBYKlPZpzvRgWGRot8WM6ThXJSo3GkQqoaiVvKjLoWRKVUAQ1BYZFAAlUCRlo0FIRuE5MImuJq5gqGqKMgT8lYPCNxhTRiNQyNDANIqcdlc/p4GonbsMXoKDUSBYKpHVK3OJ2Eo0VmHGmAJAsjNKrJ6o3D+MtkjVZGRUrasctMrISqNADCNHqjcOjbAEhQrokadVKaMRYnciaJLTlWqqNXsE6rDLoE6A+Cue3dpxvVIxGmFPVGoeEbJfFZpYEilUbggwABL4sY0hZpxpfFZU40rWVo1l3h4xGwkQkqzSjLegeBoQCQN4jRa6JDjRZVkaosGcGk7aOVIqGgU8dRoaJVyNhaldY51O2LHOtVWTwLFIZd4ZGglUCupSGvgukI7NOP1XxHQK6VJ1WMZdS2EJKs0sqxU/WnJSMRqNAsPVK6RScZdCiDArQAigIWwzUZ7NOV6eMCDIpoRuNIoQIeqNwZxFR5Go5aRluOFEZZRaMYd4Mo3VKpW4HJhDSM6rkMCw9UbG2BS+qyeqNwOTCGkY1pwGVQa6VrKvjDq0CknVYqkYjcS5f/0sc/Ibj6QtMcPRmumRtiLXPyNxw2SFc3RxYzXo8ZrMulStrTnRqixWMGyyIAgg0AeEaCwtc/JrcebyJzrTlV+LGa7Ya+pG6aOo1CyM1oEVrjLpGkUllZpJVk0eIo3FpI1WIpGDQSFLGiK+MuidlZpZVmhGiKQjZoBhQkSllWQEGBYpVK3CXImk4Vzhq6jcPOC0qsnriVuJ8qxz2SGnKCNN6gtHVmu84nHYZ+qTg0T1WRhFPGI1AsFSns05XowNQyKW6xnScK5qVwajSBRDUStZU8R0hZClGQlQ1AhkVgCVQsiVo0RSuJW4TkwiaTacwEPUWDIJ+qz9PCNQRRjEahkaGAaRanHZXP6eBqJ27DN6Ag1UgXEqkdUreeEsJWoqQ4rIoSqFkZpVQ9Uah/GWyRqs/RkVK2rHLTeNMhIjBBhGj1RuHRthQkQK6JBnVKMYiwlxnSctRyo1VAr2CdVhl1CdEGcFrnt3acb1SMRqCKaqNQ8I0S+KlCokPVG4IMAAS+KzpC3rThSxisqcaVrK0ay7w8I2EiElWaUZb0DwNGFLIhvEaCuhDClkZGosNKNJWajnSDIwKp4NDRKuRsLUrLHPSdsVzrVVk8CxSGXeGRoJVGrqUyN8IukI7K4zqsYOgV0qRWMZdSyISVZpZVip+tOaniK0Cw9dSumVPGXQogwKwogwhLCVGezTjengIMjRoRqNIrQEPVGoM4io8jUctoy3HCsMsotDD0QZRqqVStwOQhpD1XI0DUPUaNbBaT0YPVK6QOTCJpGNacBlUGupWor4y7RoAk6rNUjEbiXKscvIanSFpjh6M10yNsRqufkbjz7JCsOjixmu/jNZl0qVmnOjVFivg2WRGEYGgDwjTWFc/JrcebyJTrTnV+LGa64a+pG9HjqjULKs0I0RWuI6RrIpLLGaSVZNHiLBuRaSNVmKRiNBKpSxokV8ZdISys0kqyEaIpGI3DQKwBIlLKsgIMCxSuI3C8hDSUK5Q1dRuH8FpfVZPXErcS5FjnsIacow03qC0dWa7zicdhPqk4KRWRhFPCNRrBUZ7NOV6aEagilsrNThXNSuDUaQLIh6Ylayp4jpCWClGWlQaBDIrACoURo0RSuJW4XkwiaSVzBUPUWDOAn+SsnhGoIo1RqGRoYBpFTjsrH08CxO3YZvQENVSFuJVK9UreeEsJWoqQ4rIoSqFkSl9Vk9Uah/GWyRqs/RkVOyxz0HisBKo0AaEbPCNw0I0wrSBa6MwZCjGCwlxnSctOVGqoFewfVYZdYE6IM4LXPPdpxvVYxGowpqo1DwjZL4rNCBIeqNwQYAAt8Vmue3rUcKXxWVOPErWV41l3hoRsJEJZWaUZb0DwNmAJA34o0WNEhpFLIg1CGnEaSssc6RWTQKfwaGiVcjYWpWWOdTtixzrVVk8CxSGXeHRosqlaqEG+IukI7NOKsYOgV0pFoxl0LIicqzSyrFTjWnNSMRpoFh66zW8q+I6E9EEUUVlGEJYZqU9mnK9NXBYMijCNQZFaAPCNwZxFR5Go46RltwrQMt6otDD0QZRqqVStwOQhpGdVyGBqHqjRrYKRWVKpW4XkwiaRjWnA0qNXUqxXxl2jRgEnsrNUriNxLlWOezU6QVMcPRK6ZGyNVz8jccNkhXNfixmu/jPZl0qVlYo1CK+DZZEYGEaBTwjTWBz8mtx5/IlOtOVX4ma64a+pHSnjqiwkqzWgSLVxl1jWFTlWKSVZNHiKNyLS11WYeMRoJVKWNEVjGXSEsrNJKshGiKQjcMKwBIhZVAEGAilWXSFuRNJQ05w1dRqHnBS+qyeuI3EuRY57CGnOMK3qKtHVmu04SOwn084NEVg0IpoRqNYKjPZpyvTQjUEUtlZqcK5qVwajSBZENRK1lXxHSFlCkVllBohDCsAKgSIEaIpXErcLyYRNJK5gqU9RYMgn6rJ4RuCKNUWGRoYFaQT/JWL04qduwzegIaFIFxKevVK3nhLCVqKkOjTKBIhZEpVZPVGofxl0JGqx9GRU7asc9B4rAKjQBkbPCNw0I1GFacAsaMjIUYwWEuM1OWnKjVQK9hJ1WMZdYE6INsFrnnu04/VYxGmGjVRYeEbJfFZoQhDwNQQYAAtsVnTns04UqsqcSVrK9dZrvDI2EhSWGKVWWjQPA3DAEoGnBosaJDSKWRBqENOI0lZXOlVkYFP+KNDQXI2RqpWajlpO2K51qqyeBqKVZdodGiyI1dgWDyYi6Qjs04K+DoFdCKxjLoEiUkqzSSrFTjWnNSMRpoFildZrplTxGyegICisowEsM1KezTjenrgsaRaMI1BkVoA8I3BnEVG7UcdIy1HGtCst6qLQw9EGdRqq1xHSF5CJpH1XIYGoeqNQ1sFpFZUqlbheTCJpGGnE0qjV1KsWjGXaNAqc9lYvVa4jcR5VjnvhqdIKmOHoldMjZGq5+RuOGyQrmvxYzXfxntjLolZWKauixTwaCRABgYFIRoLBXPya1Hn8iU625VfixmuuBvqR0po6osLKs0IEi1cZdY0ipysYpJVk1dhFg30i0tVZh4xGglUpY0SK+MuhLKlJKsBGiKVRuGFYAkQsqgCDARSrLpC3IlSjWnOGqjUPOCl9Vk9cRuJcixz2ENOcFFD0VaOrNdoT8hPp5waIrBoRTQNNZCoz2acr00I1BGi2VmkhXI9RuDIhJEPTErWVIxHSFlClVkAGgQw0wgKgSI0aIeuI3C8mENcSVzb1WaaosGQT9Vk6NiKNcRYZGhgVpQJ+TTF6dGk79lYvSiGqpAuJT16pW88JYStRUh0aYAkCyrFKqHqjUP4y2T8lZ+jIqd1jGgVgFZaAhoRuHjEbhoRqMK0gWOwgyFGMCEuJU5acqNVSBHcSdVjGXUJ0Gt1Cofk04/VYxG4wpqo1DwjRLqzQhCHqNQQYAAt8VnSE+tONIrCnElayvGs16MmRoJCkkYpVRo0DwjUMoE6BpxGggSDIpZEGoQ04jSdlc6RWRgWKfijTUK1kbItSs1HKp2xWK1VYPCLFIR3h0bLYZrV2BYPJiRdcQr2acJ1b8UdPgV1SdVjGXSFkSklWaSyxipxquang00CxSrNdIp4y2T1QQFFYGAllZqU9mnG9PXBY0ijCNQRWgDwjYziKjdqOWkZajhWhWWjVRaGHogzqNVWuI6QvIRKj6rmMCw9UahrYLSKypVG4Xkwia4jDTiaVRq6lWLRjLtGgUk9lYvT1xG4nzerHPyDTpBUxxSmI6xrYi1z8jccNkhXN0cWM138Z7Yy6VKysUaixTwaCQARgGAPGI0Fgc/JrUefyJTrTlV+LErr4xvqOlNHVFhZVmtAkVrjLrGkVOVYpZVkY2EWDfSLSwrMPGI0EqBGjKnjLpCWVKWVYpY0RWqNwRWAJEpVQBBgIrVHSFuiVH1pzNXUaing1SeqweuJW4lyLHPYQ05wfUUPRVo6s12nCfkJ9PODRFYNCKeEaCwVGezTlemhGoIpbKlJGq5KVwbjSISRD0StZUhHWFlEpVQFQ1EWCKwgKgCNGiHqjpC8mETSSubTqsmqNQZEJ6rJoRuCKauIsFGhgUZQT/Jpi9PCKnfsrNAQaqQLiU9eqVvPCWCtTVZh0aYAlQsjNKrJ6o1D+MuhPyVijIqd1jGg8VgFZaAhoRuHhG4aEagihIFjsMmkWjXAhLiVKWnKjUSBHdU+qxjLqHoNbqQqH5NOP1WMRthTVRqHhGiXVmtCENGDUEVhAAt8VmoT6040isKcSVrK9dZr0ZMjQSFJIxSqy0CqQjUEAnVDTiNBAQZFLIyNQhpRpOysUisDAqn4o21BcjZFqVmnOp2xXOtVWDwNRSrLtDo2Wys0a+JVjcmJF1xCvZpxi3iOgV1ak6rGMuhbBSSrFJZWKnGq5q+DTCw9Wa6ZU8ZdCzqowooMDKEsM1KezTjeqVwajSDQjUEVoCHhGx8RUbtRy0jLUcKysNGqLQw9EGdRqq1R0hbkTSPquYwLFKo3BtgUisqVRuF5MImuIxrTiaVRq6ixaMZdo3gpJ7KxeqRiNxLmxY5+QadIKmOKUxHWNbEWufkbjhssK5r8WM138Z7Yy6VKysUa6LFPBoJEAGAQPVGgsDn5Nay8/kSnW3Kr8WM11wN9R0po6opZVmtUIrXGXSNIqcqzSyrAxsIsG+i0tVZikI0WVKEaMqeMukJZUpZVksaMq1RuCKwBIlCVQogwEVqjpC3QqPrTkauo1FPBonrTB4xluJcmrHPYQ05wRQ9RVo6s12hPyE+nnBovqsDCKeEaCwIzrTlemhGoYaJYZpGnI9cG4MiEkQ9ErWVIR1LKFLKsgqGoiwZFYQFQJEaNA9UbheTCJpNXMJ1WTVGoM4JSeqyaMRuCKauIsMjQwK0gnPZWL06NJ31WdAINVSBcSnp1St54WwUKarMOjTAEqlLIlKrJ6o1D+MuhPyVi9GRU7rGNB4rAKy0BDQjcPCNQyNwRQlAsdlT6aQo1wIS4lSlqOVGqpAjuJ9VjGXUPQa3US8Qjs05fVYxG2FNVGoeEaLfYVmhCEPGDbAwjAS+KzpC3rTjSK5q8WJW8rVZr0ZNKNNYKnIxSqjQCkI1BVQnRDTiNBUIMilkZGoQ04jSdlYpFYGBYp+KNtQq5GyLUrNRzpLYrnQqrB4GopVl2h0bLZWaNfEqxuTA0hXsrlFowdArokVjGXQshSSrFJbFjFTjWnNWMRphT1ZrplTxHQs6IwooMDASys1KezTleqVwWNIrQiwRWgVSEaGcRULtRy0jLThWjFZaNVItDD0QfUaqtUdIW5E0j6rmMCqVRsZwWkVhSqNwOXCJpCutOJpEGulaisYy6xhST2Vi9UjEbiXLixz8nBp0gpjilMR0jWRahyNxw2SFc1+HGa7+M9sZdKlZWKNRYr4NlkQBGAYA8I1AsDn5Najh5E51txq3FjNdfGN9R0po6osLKpWqVIrGMukaRU5VmlkZGuwEG4tLVWYpCNFlShGjKvjLqnbVZpZGSxqorVG4YGAshSyrLCNARWrLpC3Co+tORq6jUU8GieqwpGI6RHk1Y5eQIac4KNB6C0dWa7wn5CfTzgpfVYGEah4RQsFRnWnK9NCNQw0Wys1P1XJSuDcaRCCHolayojqWUSllUAQ1BYMisICgCNGiKVxG4XkwiaSVzCdVKaosGcEJ6rJoxG4MCmqiwyNDArSCc9hm9OKnfVjOgEGqkC4zT06pW8lsFCmqzDo0wBIFlWaEKyaqNQ/jLoSeysXoyNEusc9F8VgFZYIaEbh4RuGhG4IBKBfyVDTgUYwIS4lSlqOVGqoEdxPq0Yy6l9Br9QqEdmnH6t4jYCmqjUUhGiW2FZvQhCHgbYGBgJfFjGkLetONIrCvFiVvC1Wa75POI2EiVORmlVkYA8YjUFVCdRDTg2ECDIpZGaNRYecRUrKxSKwMCxT8UbahVyayLUrNRzqdsVzoVVg8CxWrNeiGRothmjUWNyYhpCvZpyi0YjoFdVJ1WMZdC2EJKs0lljFTjWnNXxG2CHqzXTKniOhZ1EaBRFYRgJZWalPZpyvVK4LGkVoRYIowKeEaacRUrtRy0hLThpoVkY7QE6tGsvRG9RVao6QtyJUfVcxgWKVRsbYLSeqwpVG4Xkwia4lXWnEQGuixWMZrtGAn5KxeqRiNxLl6rHPfBp0gpjilMR0g3RXPyNxw2SFc1+Jmu/jPbGXVK2K50aixVGyyqADCDAp4RQsFc/LrUcPInOtONW4sSuvjG+pHSmjqiwsqlaokVhl0jWFTsM0sqyNdgIN9I1otVZikYjULIgRqsqxjLpCWEpJVksaqK1RqGFYCyFKrICDARWrLpC3Co+tORq6jUU8GqT1WFIxHSI8mrHLyNDTnGRpvQWjqzXaJ/kH1ScFJOqwMI1DwihYKlOtOd6MIsMNFsM1P1pyUrg3GkQkiHolbyojoWUCyrICGoLDSKAgKBIjQIpXEbheTCJriSuYTqpTVFgzglJ6rJ4xG40CmqjUMijArSgnPZWacVO/ZWdAINVIF8GaenVK3ktgoU0ZhxpgCVCyM0FZNVGofxl0JPZWb0RSWWMaL4rmCstAQ0I3DwjcMjQitKKT8lZ+mnBa0CQtwqctRxrVEgfmqfVYxl2D0Rr9SJpCOzTnFvEaBFNUaikYjRLdlZvQhFh4GmBgYCXxWNIW9acaRWFeLEreFqs13yfxGwnBCSM0isjAHqjUMKWdA84NBAQZAkiUahDyjSVlc6RWBqNRT8UaGhVg2RalZqOek7K50tVYUgaitWXeGRothmjUWNyYGka9lcor+KOgV1UnVYxl0LYCSrFJbFYqcarmr4NtAQ9Wa6ZU8ZdCyqNCKIogEiEsrNSnWnKqVwWNItaEWCKMCnhGoM4io3ajlpCWo4VoxWRjtCpOrRrD0wfUVSqOkLciVL1XNoFUqjY2wWk9VhSqNwvJhE1xGrTiecUaNRYrGM11gip/krH1SMZbS5estRz3wadIKY4pTEdINsRa5+RuOGyQrmvxM138alsZdUbK50aixVGyzqowgAMCnhFawOflay4eRKdbcatxYzXXxjfUjpTR1RYWVStUSLRjLpAkVOwzSyrI12AG5F0FVSHjEUsqBGjKsYjrCWGaSRmljVRWqNwwMKWRKCsgI0CxWrLcC4VCdacvpq6jUU8GiTqsKRiOkR5NWOXkCGnOCNN6gtXqzXbKf5B9UnBSTqsGhGoaBQshUp7NOf0YRYYaLZWan6rkpUbjSISRD0St5UhHQsoFlWQENQWGkUABUARo0RSqNwvJgmklcwlUpqiwZwSk9Vk6NwRoaosMijArSipz2VinFTvqs6AQaqQLiU9MStZLcWhTVYig0CASoWRmgrJqo1FPGXROeys3phU7LGNFlXKgqNAQ0I2eEbhoRsQaUUk6rJ5wWtUSFuFSlqOVaqsh+Yn1aMZdS+g18Imka9mnOK+I2AHqjUPGI0S3ZU+tCENA0IADAS6saQn1pxpFYV4sSt5XozXfJkbDwQkjNIrIgeuI1DKpZ1A3g00BBkCSMjUWHnEaSsrnSKwNRqKfijVGhVg2xFqVmnOp2xXOlqrCkCxWrL0QyNFsM0alajcmETXEa9lcor4joFdVIrGMupZEJKs0lsVzqcarmr4NtAQ9Ga6ZU8ZdAkAhQUUQAQllZqX5NOVUrg1GkK0IsEUYRTwNjOII3ajnpCzUefTQrAx2hVnVo1ivRB9RVKo6QtxKkrm0DSlUahrYLSeqweqNwvJhE1xKrTiM4A10WKxjNdYIqf5Kx9UjGXRLlyWo5b4NOkfwUxxWmI6Rrotc/K3HHZIVyX4Wa7+NS2MuqNlYo0CKo2WdVGABBgU8IoWBDlajh5Ep1txq3FjNdcGvqOlNHVFhJVK1RItXGXSBYUlhmklWRrsAN9IugqqQ8I0WVShGiRWMZdISwzSyrNLGqilUbhgYUJEpVZARoFitWW4FxajOtOX0Y1Fing0SdVhSuI6RHk1Y5eRoaYZFb0Fq9Wa7ZJ+QfTzgpJ1WaaEWGgULYhUp1pzvRhFhhothKn605KVwajSIWRDUSt5VR0LKBJVkBDUFhpFAQFAEaNEUqjcLfAqSuQSqU9RY04JSeqydG4Io1RqGRRFacRU7arFPGCkvqs6KINVI1xKamJWsluLQpqsxRFAAAsqzQgZPUbh2W057KzRFJZYxoviuVBUaAhoRuHqjcMjYgyKSdVk/grQJC3CpSscqNVZhfzVPq0Yy7F9EbkwiaRr2ac4r4jbAaqNQ8I0Se0jLQLDQNDIADASysVCfWnGkVhXixK3hejNd8mRsJ9EJIzSKyIHhG4YAnQN4NBAQZAsiVq6EPKNJ2VzqasjVFik9RqjQq5GyLUrK51O2NRzpaqwpAsVqy9EMjRbDNGo1G5MSJpGutOUWjqjp8LXVSdVjGXUsiElWaS2LHOpxquavg20BD1ZrplXxHQsg0AKKwAIWys1H1pyqlcGo0itCEEUYRYeBsZxBG7Uc9IWajhpoVga9oUnVo1ivRB9RfqtUdYS5Gal6rm0DSlUaNOC0nqsHojcLy4RNJVacTTgNGixWuMu0GcBP8lZ+qRjLaXJktRy2anSP4KY4pRHWNZFc/K3HDZIVyX4Wa7+NS2MutRsrFGgsVRos6qMACGgU8IoWCuflajh5Ep1pxq3FiV18ZrajrTR1RYSVZrVKkWrjLrAsBLDNIrI17QEG5F0FVSHjEaCRCxqp9VjGXSEsJSyrNLGqypVG4YGFCRKWVZARoFitUbgXRajOtOX0a6ixTwaLOqweMR0iPJqxy20NMRkVvQWr1ZrvCfkJ9POCklWaaEWGhFCwVKdac70YRTDRbCVP1pyUrg1GkCyIaiVrKqOhZQLKslENQWGkUBAUYQI0RSqNwLhUVcglUp6ixpEpI1WT+I2KNDXRYZFEVpFTtoxTxgpOTSM6KqGqpAuJTceJWshdFpaarMUGgECQLKs0Bk9RuH8ZbTnsrN6YVOxGNF8acgVGCGhG4eqNwyNwQaUUk6rNP4K0CQtgqUrHKjVWYWe6p9WjGXYvojcmETSNezTnFfEbAD1RqHhGyTsjLQEPA0wADASys1CfWnAisK8WJW8r0Yr0ZOjRZ1QkjFJ6rIgeEbhgD0DTg00A0oFlUGuhDSjSdlYqcq5jUais9UarUKuRsi1Kyxzqdsac6WqsKVRYrVl6MmGi2Eo1FgcmJE0lXWnOLR1R0+Frqszq0Yy6ksISVZpLYsc6nGq5qjbQEUozXXKnjLZZBgEVgYQllZqPrTkrXBqNIoQhBGhhFPCNDOAjdY56Rs3HDQQrmNe0Ks6tXWK9EH1GvqtUdIS4lS9VzGBYeqNQ04LSeqypVGoTlwia4lVpxNINXRYrXGa6wZwaT/JWPqsYy2jye/wANRy2anSP4L0xxSuI6xrItc/K3HDZIVyX4ma7+NS2MutRsrFGgRXxGyzqowMIMCw8I0FhHPytRw8nEp1txq3FjNdfGa2o600YiklWaNRIrGMusaQTsM0qstXtADfSLoKqkPCNFkShGqisYy6QltEpZVmljVZUqjcNArAE4JSqyAgwKpVG410WoTrTlejCLFPBos6rB64jpEuTVjl5AhpiMit6H1avVmu84Sewh5wUkjNNAsPCNFsJUvyac/owiww0WwlT9aclK4NRpAsjJqJW8qo6FlAsqyUQ1BYaRQEYAVAjRFKo3A5MCoq5hKs09RY0iUkaqHRoYGhqiwyKIoyKlbRinjBScmrGdFENVSBfBKbjxK1kLi0tNVmKIoKBKBZVmgMnqNw/jLac9lZphSWIxonjTlQVGgWGhGoeEbh4RuMKyBZ1WabxFaFQLBUZWOVGqpCz2Vn6tGMuwegHJhGdI17NOcW8RsEDVG4dGiTsjLQEPA0wMAASys1CfWnAiuavFiV0wvRivRk6NFsqUkjNKrLAeEbMoHoGZaaAaVCyINdCGlGk7KxU5VgaixWeqN1qFMjZGqlZpyqdsVilqrmpUayrVh6IcUllZpqo1A5CJpGuq5RaMR1+Fr2VmdVjGXULCJyrNJZXOkjWnNVGwjQilGa65U8ZbLIMAisDASys1H1pxVrg1GkUIQhhoYRTI0M4CV1jnpCzccNBCsDXtATq1Wa9OR9RVao6QlxKkrmMCnqjRpwUnqsqURuE5SM64lVpxNINGixWuMu0GQT/JWfqsYjaPJ7/Cxy2anSP4KY4pRHWNZFc/K3HDZIVyX4ma7+NS2MuqVlYo0CKDZZ0SsDCDAp4RoLCOflay4+RKWnCrcWJXXxmtrLrTRgpJVmjUqRaMZdYEgnYZpVZavaBRuRdBVWYp4jRZELGqn1WMZdIWwlJKs0sarP1SqNwwrAEiUqsgAwEUqy3GuLULa05Xo1RYpGDZZ1WDxiNxLk2Fjl5AhpiMit6C1erNd4Sewh5wUk6M01RYeEaLYSpfk05/RhGoYULCVL1pyqlRqDIEkQ1ErWVYR0LKBZVCiGoLDSACMASqBGiKVRuBfAqKuYSrNPUWNbBKSNVk8I2KNDUWGRoYAZRU7arFNGDROTVZ0UZNUIF8VKbjxK1gLi0tNVmKIoAEqFkZoDJ6jcPDLZLdlZo+CktgxojTlQVGgWGhGoeEbh4RuMK0oFnVZpoxFaFAsJUbLHLQ1VmFnuqfVvGXYI0SF5cImkqdmnOLTiNgKaqNQ6NE/wBRloFh4FYVhAkCWVioy04p+qwrxYlbwvRivRk6Nltis0kiUqsMKeEaNCgeoGlG2gRpFLKs0a6ENOI0nZWKnKsDVFis9RutTCrBtiLUrK50lsac6SqualRrK1WHohholhimqVqByYkNI11pyi0YjpC17Kk6tGMuhZEqcqzSWWOdJGq5q+DYRoqlGa6RXxGySgwogwNIEsrFR9acla4NRpFaEIw0aEUw0M4gldYxpCzcefQRiuY17QLOrVZr05GNRVa4jpCXEqXquYwLD1RqGnBSeqypRG4TlwjOuJVacoaRGgWK1xmu0GRU/wAlY+qxjLaPJ7/DUctmp0j+C9XHFKYjpGsiuflbjhskK5L8TNd/GpbGXVKysUaCxRGi21UrAwDAHjEaCwjn5Wo4+TiUtOFW4sSuvjNbWXWmjqKSVZo1KRauMukCQTsM0qo1e0AN9ItCozFIwaLIUsarKsYy6QthKSVZpY1WVK4jcMKwBIlKrIAMBFKstxr4LULa05XowjUVjBok6rFPXEbiXJqxy8gQ0xGRW9BauM13hJ7IfVJxVTkYpqiw8I0FhKjPZXP6MDRhQsJUp1pyqlRqDIEkQ/GlaypCOhZQLKoUQ1BYaQAGECVRo0D1RqByYheItOYSrNPUWNYSkjVQ8I3BFGqLDIowKMip3IzTVwIXkE0RWTVCBdUpuPErWAui0tNVmKCgASoWRmhAyeo3D+Mtwluys0fBSWwZpJxpxoKgwLBhGoeEbh4RuCKCBZVKaMQaFAsFRtqxx0NVSFnsrK3jLsEaBeXFjOkqdlc4tOI2Apqo1Do0T/UZaBTwNCACBIEtkqzUZ9acE/VYV4sSt4dFMYr0ZMjYTkqlTnBilVkRTQjRlA/JA84jbQASBZVkahDziNJWVipyrBqosUnqN1qFWDZFSsrnolsac6SFc1KjWVqsPRDDRLDNNUqwORIaRrrTlFoxHQsdlSdW8ZdCyISVZqdljnSRquasYNhGosUoldMq+I6FlAAEGBpAllZqPrTkrXEajSDQLBFGEUyNG8BG6xjSFm48+ghXMadoKs6tVivTBjRVa4jpC3EqMq5jAp66jZpwUnqsKVZbhOXFjOuJVVyhpVGjRYrXGa7QZFT9Vj6r4y2jye/w1HLZqdI/gvVzxWrLpAsK5+VqOHkJDTmvxM128alsZdkrK50aCxTxGi21UrAwDAHjEaCwOflay4eTiUtuC3DjNdfGe2sutH8RSSrNGoRaMZdIEip2GaVWRr2gGvoUKhFIwUtgpY1WVYxl0LYSklWaWNVlSuI3DCsASJSqgCDARWjLca+C1C2q5XrQNRWMGiTqsU8YjcS5NWOXkCGmIKKHoq1cZrtCT2Q+qTgqcqxTVFh4RoLBUfyacvowjRoFCRKlOtOVUrg1BkCCH40rWVIR0CUUkqyUQ9BYMgAMICo0aClUaheTELxFpzCVjNPUWNYKSNVg8I6QRRrqLDI0MAIqdxmnrgsJyEZ0RWTVUgXEo8eJVy10apaarKg0AgSoWRmhAh4GodluEtqpR8AlsGaSWnGgqDAsGEah4RuHhG4KKAFsrNNGIowoWwVG2rHLQ1VmFnsrK/jLsWNCF5VjOk6aOcVHQEDVGofxGieDIwLDQNCAAEiEtkqzUf8AVpxT9lXNXixK3h0UxivTkyNBIifisFVkf9BTQjR1C/kinlGmgAkCyrNGosPOIqdlYqUqwaqLFJ6jdGmFWDZFqNlc6S2NOdJCualRrPVqsV6IZGiWVmmqjUDkwTSNdacotGI6BGqk6rGMuhZEJKs1O2K50ldVhXxG2jQPRK6ZV8R0LKDA0AwNIEssZqXquSlcGo0g0BBGhhFOND4gjdYxpCzcefQQrmNO0FXPV4Yr0xo0WdWrjLpCXVKkrm0CnrqNw84Kn6rClEbhOUjOkqq5Q0qjRosWrjLtGnBU47Kx9VjGW0eT3+Go5bNTpH8FXPFa4y6RrCubkajhskNOa/EzXbxq2ZdkbK50aCxTxGizqpWBgGAUjEaLYKhy41HDycRlpwq3DiV18Z7ay60fBSSrNGoRaMZdIEip2GaVWRr2gPrX0WtUSHjBothKEarKkYy6QthKSVZpY1WVKo3DigASIWVQBBhFitUbjXwKhbVcr1oGorGDRJ1WKpGI3EeTVjl5AhpiCih6L9XrjNdonPZBScFTlWDVFh4RoLBUfyac/pkUYFCwVKdacb1So1BkCSIfjStZUhHQJQJKoEiGoLDSKAgCBKo0aClUagcmBeIK5hKs09RYNhKnGqh4RsUUa6LDI0MAIqdyM01cFheQZ0RWTVCBdUo8eJWsjdGqWmqxDjQCBKhZGaECHqNQ8MtwluwlHxQlsGaSWnGgqDAsGEah4RuHhG4KKwEsJTVwUYVC2QqVtajlpqqzCz2Vmr+MuxY0IXlIzpOmq5xWR0BA9Uah/Bongy0Cw0I0KgAEiEtis64i04p+q5/VePEreHRRivTkyNBIifisl9Vkf9ANCNHFL+QfTyjTQDSBJVmjXRYecRU7KxUpVg1UWKT1G6NMKuRsi1GyudJbq1HOkhXNSqNZ6tVmvRDI0SVZpqJWoHJhE0jXWnKLfijp8COwk6rHVHSFnQJKsVO2LHOkjVYVG29QPRK6ZV8ZdCyDAwMDASys1L1XJSuDUaRa0BBFGEWHRofASusY057Nx56EK5jTtBVz1eGK9MaNFnVoxl0JcSpS05tAp6o3DzgqfqsKURuE5SM6SqrlDyoEaLFa4y6wZwUkdlY+qeMto8nv8NRz2enSP4L0zxSrLrGsDn5Wo4bThpzdHEzp28alsZdkbK50aCxUaJIlYGAYBSEaLYEOXGo4eTiMtOFW4cSuvjPbWXWm8FJKs0alIrGMugWFJYZpFZGvaA+tbSLWqJD+DRbCUI1WVYxl0hLBSyrJI1WFao6QwAASIVUAQYFVqy3GtgtQtquVaBYrGDRJ1WKpGI3EeTsscvIENMQUUPRfq9erLtCfkgecFJOqxTVFh0aLYKl+Suf0RTQjRbKlTnWnG9PXBqDIEkQ/HiVvKkI2FkUkqyAhqCw0igIAgSo0CKVRqByYLeIK5NKs01RYNgqcarJ4RuGRRrosFGhgBFTuRnRq4LA5MGdJqyaosC6s0eLCrkbst0tNVg40ABKpSyM0IEPA1FIxltO+qlHwCzgzU2nGgqDAsNCNQ0I3DwjcEVkCWEpq4EGFAshUba1HLTVVmFnsrNX8ZdixoQvKsZ0nx6MRWUbCQPUah/EaJ4I0AaEaFRgLIhL4rOkWnFP1XNbjxK3hemMV6c8MjQSInPqslVkZ8A8I0YUv5AdGmgGkCSrNNUWGnEVO6s1OVc6NUWKz1G61MKsGyLUrK51Ocac7wkK5qVGs9Wqw9MMiktqs09ErULyYRNI11pyi/wCKOvwsaMzqsYjpC2Alhip2xpz0Suqwr4jbRoHqldIr4y6FnQYGAQCQJZWal6rkrXBqNItCAEUYRqHFHxBK6xjTns3Hn0EK5jTtBVz1eGK9MGNFnVYxl0JcSpNMNAHqjcPOCp+qwpRG4TlIzpKquUOo0aLFa4y6xpFJGqx9UjGW0eT3+Go5bPTpH8FXPFK4y6xrYDn5Go4bJDTmvxM128alsZdkbKxRoEV8RollSiAAaBTwilsCHLjUcPJxGWnCrcOJXXxqW1l1o+DRJVijUpFYxl0jWFTsM0qstXtANYi1qiRSMGiWEoRqorGMtwlgpZVkkarKtUbhgYCyIWVRhGhFVqjca2CoX1Y5aaBYrGDRZ1WaeOqNRHk7LHLyBCsQRoPQ+r16s12hJ7IHnBSSrFNUah4RS2CpT2Vz+jApoGi2Eqc60409cGoMgSRD0xK3lSEbCyKWVZLIhqCw0igIABKowilUagcmItRacglWaaosGwVONVk8I3DI0NdKQUaGAEVO4zTUwWByYJriasGqqwLjNHjxKuRujdLTVYONAASqFkZrQIaqNRSEdInfRnQ+AWcVKnLTjQVgYGoaEbhoRqHhGxRWAthKNcFgwqBZCo21qOWmqrMLbsqVfxl1CNCE5VjGk+PRmKyNggeo1D+I0TwRoFPCKwMASqEvis6QVxTnWnP6tx4ldMOiuMV6IKNBIhJ2VZKrLf6Ip4FMKH5BDo0ANIElWTVFh5xGkrKxU5Vzo1RqKz1Gq1MKuRsi1KyudTnJac7wkarmpUrWerVYemGlFJOqzT0StQvIRNJV1pyi0Yjr8LHYZnVYR0hbBSSM1O2NOWiV1WFYxG2jQUoldYp4y2WQYBBgACWVmpeq5K0wbjWChAQRTRqNQ0Ciipcixz057NxwpYVyNTtBVz1eGHpg10anVYxlslxKlLTDQClUbhpwVP1WFKI3CcpGdJVVyh5UaNFitcZdY04KSNVj6rGMtocnv8NRz2enSP4KueKVZdI1sFrn5Wo8/kJDTmvxM138alsZdUbKxRoEV8RstlZrAAGgU8IpbYFQ5cajj5OIy089W4cSuvjUsy7UfBSSrFGhSLRjLpAsKnYZpVZavaBZ1rEK1RIp4NFsJSxqorGMtwtgpJVmkjVZVqjcMDSBZCllWWEGEWKVRuDbBahfVjloIFisYNFnVYp4xG4jydoWOXkCGmIKNNGh9Wr1ZrtCT2QPOC0kqzTVFh0UtgS/JXO9EU0YNBYSpTrTjT0wagyBJEPx4lbypDLoEgWVQsjJqCw0igIwBKoECKVRuByYFRVyCVZpqiwbBSRqsnhG4KNDXQhkaaAMKncZo0wWByYJpNWDVVY1xK3FhTI3ZbpaarBxoACVQsjNaBD1GoeGW4nfRKPgFnFSpy040FZGBYaEbhoRqHhGxRWAthKNBYIBYSo31qOWmqrMLbsrNX8ZdwjRITlWMbT49KzFpRsoHqNQ/iNE8EEU0CsgygSBLrGNIK4pzrTn9W4+qV0w6K4xXphkUsiEnZVkqstOwLTwimFCOwQ6NMASBJVk1UWH8GkrqxU5Vzo0RqKz1Gq1CrBsi1KyudTnJac6SNaclao3nq1WHpgyiknVZp6I1C8hE0lXWnOLR1R0+FjRmdVhHQLBU5GanbGnLRK6rEV8Rto0IpRK6xXxlssgACKwBIhLKzUo1XJWmDcaQoQAjRo1FhoRofAS5FjGkLNx56SFcjU7LVz1eMc3qg10WKxjLZLhUpac2gVSqNQ04KT1WT0RqF5SM64jVXKHlRo0WK1xl1jTgpI1WPqvjLaHJ7/DUctnp0j+ErWeK1xHSBbArn5Go4bJDTmvxM138alsZdUbKxRoLFUaLZWa3gABoFh4RS2BHlxqOPk4hLbzrcOM118almXaj4KSVYo0KsWjGXSBYE5GaVUavaBI1ha1QingpbCUsaqKxjLpC2EpJGaT1plWqNwwNIFkKWVZYQYRYpVG4NsFQusctBAsVjBos6rNPGI3EeTsscfIENMQUaaND6tXqw7ws6IacFJKs01RYdFLYEp7K5/RFNA0FhKlOtON6emDUGQJOiKceJW8qQjoEoEkQsqyagsNIoCMASqBAilUbjcmIVBpyCVSmqEGwUkarMPCNwUaGuhDI00AbwVO5GaNMFgcmCa4mrBqqsa4lbiKYNdlukpqsQ400gWVQsjNaBD1RuHhGiX0St4oWckSpy040FZGBYaEbhoRqHhG4KKwFsJRoLDAFhKhfWo5aaqslt2VKv4y7BAQnMsc9k49KzlWUbLIHqjcP4KQQRTQisKwgSoS6xjSDTinOq53q3H1hK6YdFcYr0wyKWRCTsqyVUadgKeEUwoR2CHRphQkQkqyauiw/iNJXVipyrnRojUVnqN1qYUyNkWpWVzqc+tOdTjWnJWmpW89XqxXpgyiknVZp6YjULyETSVdac4tHVHT4WNGYrGI6BZCpy0ynbFjnoldVzW8RsPRYpRK6RXxlssgACDA0gnZYzUo1XJWmDcawtCBIKNGjRYaEUfBUuRYxpCzceekhXI9OxWs9WjGHpg10qxWMZdC3EqMtObQLFKo1DTgpJ0ZPXBqE5SM6SqrlDyo0aLFasusGcFTjRmK+I2hy+/w1HHZ69I/hK1nitcR0gWwWufkajhskNOS/GzXfxqWxl1SsrFagsV8RosqlbwRgGEU8ClsFR5sWOPk4hLbzrcOJXXxqSy7D4KSVYo0KsWjGXSBYE5GaURq9oU+tYK0CKeDRbCUtdVPqsYy6QthKScVmk9VlWqNwwMBZClGWVBhFilUbg2FQusc9BARWMRss60xTxiNxHk7LHHbQrEYaaND6tHVh3hZ0DzgqcqwaosPCKWwJT2VzvRFNA0EiVKdacr09MFgyKSRlTjxK3lSEdAlAkiFlWTUFhpFARgCRAhUUojcbkxCoNOQSsSmqEGwUkarJ4RuCjQxosMijAD4KncZo0wWNyYJeJKwaqrGuJW4imTXZbpKarCg0AFkQJVmhAh6o3DwjZL6M6ZQs4JU5acaCsjAsNCNw0I1DwjYorClsJRqEMAWBG+tRy0FVYgW7KlWnGXYICJ8yxz2XjKzlWUbKKeqNQ/gpPBBFNCKwMAeqEurGkP9WnFOeyud6tx5CV0w6K4w9MMilkQk6rJY0QZ7Qp9NVFhhQjsE6dG2AJEJKoaqEP4NJ3GKlLTnRojWVZ6jdahTI2RalZXOpy0xSRrTirTWa3jq1Wa9MGUUk6rNUpiNwnIRnSVdVzi0dR0LGiRaMRssoJqynfGnPRK6rmt4jYRosUoldMqxjLZZAAEVhGkE7qzUo1XJamDcCwtCBIMI0aNFhxRRUeRYxpCzceekhXI9OxWsdWjGHphq6LOqxjLoS4lSlpzaBYeqNQ04KT0ZUoNRPlIzpOquRlGjRYrXGXWNOCljRmdUjEbQ5fWo47Ur0j+ErWeKVxHSNcVzcjUcNkhpyX42a74UtjLqlZWKNNFiniNFlWawrCDVFikYKWwVDmxY5eTiEujzVbgxmuvjVll2bwUkqzRoUi0Yy6BYE5GaUQa9oU+hYK0BFIwUthKWuiLRiOkJYSkkZpPVZVqNwwNIpZEAZBQYQitUbg2wVz3WOeggIrXEbLOtMU8YjUR5Oyxy8jQ0xGRpo0Pq9erDvCToHnBU1YNUWKI0WwiM9lc/oimhGglUqVtacqemCw0ipyMqceJW8qRiOgSgSRCyqGoENIoCMASqBAitUbgXxCoNOYSsZpqhBtgUkarJ4RuCjQxosMijACKnciUaBG5MC8SVzNVVjXErcRTJrsulJTVc1BoALKpQkZoQIeqNw8I2S4zWgAlUqUtONBWBgahoRuHhG4aEahkVhS2ErUCGALAjfWo5aaqsQttVKtOMuwRqCfM1HPZeIqZVlGwkD1RqH8GieDLCmhFEUABUJcY0i04pT2ac71bi6wldMOiuMPTDIpbYFJKsFjRBntAXpqiw4pY7BOnRtgCRCSqU0BDo0ncZqUtOdNRFik9RutTCkGyNVKyudJZpyqUa05LU1mt46tVl6YMopJ1WapTEbhOQjOkqa05xeOqOnwkdhJ1euI3CSgnKsp3ajnoldVzi3iOgRoKUSukV8ZbLIMDCsDSIndWalGq5LUwbgSLQgQYRo0Cw8I0PgJcixjTns3HnpI9VyPx9itY6tGMPTOGrqVYrCOhLiVKWmGhA9RuHnBU/RhSmI1CcqxnSVVcjKrRoRWMZdY04KWujMU8RtDlajjtSvWP4St54pXEbjWwVzcjUcNkhpyX42a74VtjLqjZWKNBYp4jRZVkfIFAQ1UWHjBothEOXFjl5OIS28y3AldfGrZl2HwVOVZpqFMrRjLoWQTkQoyNe0KfQkKMAeMFLYKWujM6tGI6QtgqcjFL+TTP1SqNw4rSBJEoDIKDCEUqjcNbBULrHPRYCK1xGy21pinjEbiN+yxx31oViMNNGh9Xjqw7wk6FPOCpyrB6iw6NFsIlPZXP6wpoRoJVKlbWnKnpgsGRSyMn48St5UhHQJQLIhZVDVFhpAoMIEiVoVD0RuNfEKh605hKs01Qg2CkjVZ+nhHSCijGiw06ijAD4KS4lamBGvglSVg9RYF1StxFMmuy6UlNVzUGgkCyqBIzQgQ9Ubh4Rsl9Ga0BAnFKnLUcKVWRgWGhG4eqNw8I1BRWFLYStUIYAsCN2o5aaqsQt9VKtOMuwRoJ8yxz2HEVMqSjYSB6o1D+DRBkRRhGhAABUJcYqP+rTilPZpzvVuLrCV0w6a4w9MFFLOBSSrFCFRp7QF6aqNHAsdhYojQAEiFlUowixTwVK4zUpac6aiLlS3UbrUSrk1hajZXOksrnU41txqtNZreOrVxmvVBlAk6rNUpiNwnIRjSdNViLR1HX4SNGfq9cR0JbZETkZqd2o56LXVc1fEdAjQUoldIrGMthIADCiASIndYzUo1pyWpiOkadAsCDCNGgWHhGh8BLkWMac863HnpI2Vcj8fYrWOrRjD0w1UrUVhGyXEqUtMNAHqjcPOCpzoxVKYjcJyrGNJVVzh5UCNFisMukaRS10ZiviNocrUcfIevWEreeK1xG4FsFrn5Go4bThpyi/HrNd/GrbGXVGysUaCxXxGiSqD5AAIaqLDxg0W4iPLixy8nHPLbzLcCV18assu4+AnKs01EplaMR0LYCSIVWWjQaQrQB/BS2CljRlaMR0hbBSSM0n5KwpUbhxWkCyJSjIKGhFilUag2wVC6xz0WBIrXBsLarNNHVG4jfsscfJ1oaYjI00dgnV64w7wk6B5wVNWKeosOjRbCJT2VzvWFNCNBKpUra05U9MFhpwUkjJ+PEreVIxHRpQJIhZVDUFhgKIwBIjQoeqNRr4i1D1pyCVZpqhBtgUkarMPCOkFFGuiw3qKMCmBO4lCokG+BUlYPUWBdYlbjKZPfGXSp01XNQaCQKIEqyECHqjcPCNkvpGdNCkCcBOWo4UqsjAsNCNw8I3DwjUFFYUsiVq6EOBbAjdqOWmqrELfVSrTjLs0AlzLHPYcRUypKNgB6o1D+DRBBFGEUQAAVCXVjSP+quSVuzTlercXWErph01xzeqCASCcqxQjQae6penqjUMKWOwRRGmAsgWdVkY1FingqVxmpWac6aiNRW3UarUKsGyLUbK50llc6lHZtxq1NSumOrQw9MGUCTqsqUxG4TkWMaTorEWjqjr8LHYZnVq4joS+iJyM0l2o56JXVYiviNtGhD0SukVjGWwkUAEGAJETusZqUarktTB0jSBYEgwjRoFh4RofAS5FjGnPOtx56SNlpyPx9krWOrxjD0zg1K1FYZbJcSpSrDQB6o3DziqnOjClMRuE5VjGkqq5w6jRosUhl0gyKSujMV8RtDmajj5D16x/CVvPFa4jpAtgVz8jUcNpw05RfjZrvhW2MuqNlZo1CK+I0SVQfAADVQhxothKjy9Vjlvjnlt5luDErr41pZd28BOVZpqJSLRiOgWFTkZpRlo1RpCtAKeDRLCFjRn6tGI6QtgpJGaT1WFKjcOK0gWRKUZADQLFKo1BtgqF1jGiwJFa4jYW1pinjqjcQv2WOO+tCswRQjsLOrx1YdoWdA84KnOqxTVFh0aLYRKeysXrAaEaaVKlbWo401BYaRSSMnpiVvKkI6QJQLIhZVDVFhpAoMI0hQhUUojUC6LUfWnIsqzTVCDbApI1WYeEdIZFauiw06ijAphU7jNagRr4FSVzPUWNdUocRTJ74y6VOmq5qDQSAKhZGQgD1RqKQjZLiaCFSB4CctRw10qsjAsNCNw8I3DwjYoMKWwlauhDihYRC7Uc9NVXOFvqpVpxl2aAS5ljnsOIqZUlGwA9Uah/Bok6IIpoRWBgAE7tOekVckrdmnK9W4usJXTDprjD1Q0opJEJKs0I0SNPdU+nqjUMKWOwRRGmAsgX1WRhFU8FTuM1GzTnTURrKlupGqNCrkbItRlXOkssc6l+TbjVqazXTHV4ZemNKBPVZUriNwnKsZ0nTVc4t+KOvwsaMxauI6FuIlYZpL41HPRK6rEW8RsI0IeqV0i3jLoWQABBgCQTurFSjVc1q4NxpCgEGEU0DRoRR8BLkWMac87LceekjZVyp+PsVrHV4xh6Zwa6laisI2S4lSlWKwKVRuGnFVOdGKpTEbhOVYxpKqucOo0aixSEdI0ilrozFfEbQ5slqOPkPXrH8Jet55Fa4jpAtgVz8jUcNpxrTlHRxs13wpbGXZGwxRqpFfEbJKsjGAwDVFhxS2EqPL1WOW+IS28yvDhXXxrSw7t4CcqzTUSkWjEdAsKnIzSiNGqn1pFrQIp4NEsJQjRlWMR0hbBSSM0nqsK1G4YVpAsiUogKhoRYpVGoNsGkbrHPRIGYrXEdAtrTNPHVGohfsscd9aGmYKKEdhZ10RjDtCT2FPOAnOqxTVFh0aLYSpT2Vi9YDwNBIJW1qOOj0GoNgJIh+PEreVIxG2lFJKslkQ1RTSBQYRpAFRSqNRrYioetORZVmmoEGwUkarJ4R0hkVq6LDSijAphSXGaFAjXwKmrmaosa6wocZUye+MulTprTmpKNBIBKoWRloA1UaikI3CXE0EKkDwE5ajhrpVZGBYaEbh6o3DwjQwisKEgFdEhwCwI3ajnoKqxC31WatOMuzVRUuZqOWw4iplSUbAD0RuKeCkEFFGBWBgCQTurnpFpySt2acr1fi6wldMOiuOb1Q0ilkROys0I0SNbtCpenqjUMKEdgnTo0wFkC+qyaNRT+DSdxio2VzpqDWVbdSNVqFXI2xFqVlc6nZXOpfk241bj1mumOrww9MaQJ6rKtcR0ifKsY0nRWItHVHT4WNGZ1auI6FuFTsMVO+NRz0SuqxFvEbCNCKUSukVjGWyyKACDAEgndWKlGq5rUwbjSFABhFNA0aEUfAT5FjOnNOtx56T2WnGqcfZK1jq0Yw9MNVGopGI2W4lSlWAgIpUbh5xFTnVZUpiNRPlWM6SorlDyo0aLFIZdIMilrokU8RpDmyWo4+RSvWP4S9bzyKxiOkLbArn5PWo4bJVpyi/GzXfClsZdkbKxRoEV8Rokqg+AwDCKeBS2EqPLixz3xCXR5VeHErr41pYd28AkqzRolIvGI6FsKnYZKI0dlRpFrV0RSMGiWEoR2EVriNwtgJYZpPyVhWo3DCsBZEpRkFDQiqVRqGtg0hdY56JAzFa4joFmmaeOqNRC/ZY4+TrQ0zBRWjsLOr1xh3hJ7AecBOVYpqixRGi2BGeyud63oHhGglSpW1qOWjUQhpxVJOiU/HiVvKqNhKKSRksqhqimkUojA0iUIEUoNRrYioetOQSRmjVSDYKSNVk8I6QyNNXQhp1FGBTCkuM0KBGvgVNWDVCNdYUOLSpk98ZdKnTVc1JGgkAlULIjQIeqNQ8I2S4mgjFSB4CdtajhrpVZGBYaEbh4RuHhGhRWFCQoV0ZONBYRG7Uc9hVWC3VmrzjLsECpc2rHLbcRTJ51GgBSqNw/iNEVBRTQDCsIEgldY56Rack7dmnK9W4shK6YdNcc3qgilkROys0IEa3aFS9PCNmAI7FIdG2AJEJ6rJq6in8Gk7jFRs0501ErWVbdRutTEpkbC1KyudTssc6l+TbjVuPWa6Y6vDD0tIE9Vn6rXEdE+QjGk6NMReOqOnwkaMrVxHQtskKnIxU74056JXVYi3iNhGhFKJXWK+MthIADAIBIJXWMVONVzWpg3AkKADCKaBo8CiglyLGdOezceep+yrjVOLsVrHVoxh6YaqNRWuI2S4lSnVYCAUqjcPOCpzqs1SmI1E+VYzriVFcoeVGjRYpVl0gyKWuiRXxGnPzZLUcvIpTrCVrHFa4jpAtgVzcnrUcNkq05xfjZrthW2MuyNlYo0CKeI2WdVlgADV1FingpLCVHlyVjnviEujyq8KV18a0sO4zgqcqxTUSrFoxGy2FTsM0ojR2VPrSLRjQP4KWwlLHYRauI3C2BORmk9VlWuDUOKEgWRKUZYBgWKVRqGnBUeQjOk4ViK1xHQLNM00YjURv2ajjvrQMwRWjsLOrxjDvCT2A84Cc6rNNQIojRbAlPZXO9D0U8I0EqiVtajlo9MFgyBJ0RTjxK3lSEbCUUkjJZVDUFhhQEYAkQIEUqNRreoqHrTkFlZo1CDbApI1WYpCOkFGhroQfUUYFMKS4lCoka+BU1czVFjXWFDj0qZPfGXSkprTmdGgkCyqBIywHqjUPCNkuJQjFRvAStrUcddKrmMDUNCNw9Ubh4RsUUQLIUK6JDihYEeRqOWgqrELdWavOMuwQixLm1qOW24wypKNFBSiNw/iNFlUZFNAMKwBIiV8VjSMY04p27NRy11biyErrh01xzemCKWRE7KzQgRrdoVL1SEbEAroRRGwAJEJ6rJq6ixTwaSuM1KyuVGg1lW3Ubo0SkGwtRsrFTsrlUvybcb1fj1muvj6tDD0RpwWk9Vj6rXEdE+QjGk6KxF/xR0JHZU+r1xGy2BKRipXajnotdViLeI2HosUozXTKsYjYSAAIMASCd1ZqUarktTBuBYWgIMIpoGjwiiCXIrOnPOtPPSey240/F3St+Pq0Yw9ENVG4rXEaJcSpTqsVvQh6o3DziqnOjKlMRqJ8qxnSdFcoeVUI0IpVl0gyKWuiRXxGnPzZLUcvJxSnWEvVxyK1xHWBbAc3I1HDZKtOcX42a7+NWcZdUb6rFGgsU8Ros6rLAwGqiw4pbAhy5Kxy3xCXR5atwYzXXxrSy7tOCpyrFNRKuVoxHQtgTsM0sCDHdT6E6FGugp4KSwlLGifVq4jcLYUlhmp+qx9VqNQ4oSBZEpRGAYCKVRuGnBUbkY0nCsxWuI21lZpowaiF+yxx31oVmCK1ews6vGMO8LPYDTgqc6rFNUWKIpbAlPZXP63opoRppVEba1HLR6YLBlFJKsqceJW8qQy20ikkQkqyagsPIpZEYAkRhD1Go1sRUPZacgkSmqpGtglJGqzFIR0go0NdCGRpoAwpLiUKiRr4FTVg1QjXUocelTKl8ZdKnXVc/p5GgkAlULIlaBD1RuHhGiXEoRipG8QStrccddKrAwLDwjcNVG4eEbFFECyARoikClsIjdY56CrTELdWavOMuzQioc2tRy2PEGVJRsoilUbh/EaJKoKKaAYVgCRE+TFjGkfGnFK3Zpy11biyErrh01xzeqCBZAllYoQIF9gSqQNw3gFr2RYoNMBZEJ6rJqo1FPBU7jNRsrlTUG8qX6jVGiUg2FqNlYqdljnpL8m3C9X49Zrr4+rQw9MacCl9Vj6rGI6JcpGNEorEW/FHX4SNVn6vXEbLYEraM1K7UctFrqsRfxHQsaClGa6RaMRssgACDAEgndYzUo1XJamDpGtqFKqDCKeBo0Io+AlyLGa551uPPSetONPxdkreOrRjD0w1UaitUbJcRKdVitGhD1RuH8UTnRmqUxGonyrGdJ0Vzh5UCBYpVluDYWlrokV8RtDmyWo4+Q9OkJWscVriOkCwObkajhslWnOL8bNd8KzjLqjfVYo01Fing0WdVlgYDVRYcUtgR5clY5b455beVbgK6+NZh3acFTlWKaiVcrxiNlsKnYZpYEaO6n0J0KNdBTwUlhKWNE+rVxHSFsBLDNT/JWPqtRqHFCQLIlKIwgwLFao3BnBUbjGiQrMVriNhZpmmjqjURv2ajjvrQrMZGmr2CdXjGHeF/IDzgtSnVYp6Cw6KWwVL8lc/reinhGglUqV1jlo1FWGlFTlWVOPEreVYZbCRSSISVQ9AhpFLIjAEiNAHqLBtiK552WnMLEZpqqkGwVONVlSEdIKNDXQhkaGAEUlxKFRI1sCpqwaoDdSl49KmVLYy6J01phSUaKIEqhRGgQ9Ubh4RqEuJQhUbwEra1HHXSq5mgahoRuGqjcPCNwUUQCQLGiKQKFgQ5Go56CquYXVmrTjLu1UIhza1HLRuIMnlGwA9Eah/EaLIgiiDCsASInyYsY0jGNOSV+zTjrq3FkJXXDprjm9UGQCQTsrFCBAvsKVSEaN4KWuhFEaYCyIX1UNCLD+Cp3GajZXKmoN5Uv1GqNEqwbCpWWOdSssc6l+bbher8es118fVoYemNOBSxqs/VYxG0uUjGiUVmLx1R0+EjsrK1cRstkE7arNSs1HLRK6rEX8R0LGgpRmukWjEbLIMDCsASIndWalGq5L0wdIFgpRBhGjwNGhFMCXIrFc061HnpPWnGqcXYrfj6rDD0w9UailcRslxKlKsNARSiNw84KlOqxVaYjUT5VjOkqK5w8qNAsPVluDItCoRTxGkObJajj5D06wlaxxWuI6QLBXPya1HHadWnKL8TNd8KzjLqjfRijQWK+DRPVZYGA1UU8ClsCPLixz3xzy28q3AldPGuy7hOCpyMU1CrF4xHQtgTsM0sCNHZT606Faugp4KSwlLGiLVxG4FhanIzU/yVj6rUbhwaQJIlKIwGgVSqNQ1hUbjGk4VmK0xGwsrNNHUaiN+yxx31oVmMNNXsE6vXGHeF9A84KlKsU9BYp4iksCX5K5/W9FPGI0E4qJX1Y5aNRVhrCpyMqceJW8qQy20ikkQkqh6BDSKURgCRGgD1FG+IqE7LTmWwzTVVINgqcarMUhl0gjQ10IZGhgBFLcSlqJGvgVNWDVFg3WJS8elTKl8ZdE69lY+qSNFECVQsiNAh6o3FIRqE5ApYVlvEVK2txw10qsGgWGhG4aqNw8I2KKIoSIWNEUgULYCPIsc9lq05wORUq04y7NCCHNrUctdNxFXJ5RoAUojcN4ilkQf9BRFYGgGkEuTFjnpHxpySv2acddW4chK6+N01xzeowFkE7KxQgAv4JpWBoRS11CKDTAWQL6rJqosU8FSuM1GyuVNxlbypfCNUeNKsGwqVlc6nZY51H823C9X42a6+Pq8Yw9ISFLGqz9VjEbS5SMaJRWYvHVHT4SNVn6tXEdC2RE7arNSu1HLRK6rEX8R0D0IejNdItGI2EgArAIFkRO+KzUq6rkvTEdIFgpVQ0I0aBqGhFN4CXIrOnNbZajzUn5NuVU4u0pW/H1Vh6IeqNRWqNkuJUZVitARSqNw84KlOqwrTEaifKsZ0lRXOHlRoRYeuI3BkUK6EV8Rpz83rUcfIfj6x/CVrHFq4jpC2Fc/JrUcNkq05RbjZrvhW2MuqN9GKNBYr4NEVGEYDQingUtgR5MWOeuOeXR5atwJXTxrsO7TgqUjFPQq5WjEbLYVOwzSwI0dlPrToUagfwUlgLHYZWriOkCwVOwzSfkrClRuHBpAkiFEYDQKpVGoacFRuM1ONViK0xGwlUp46ixC/ZY4760KzGGmr2CddFcYd4WdFNOAnKsU1BYojRLCVL8lY+t6B4RoJxRK6xy0agQ1lVORlTjxK3lVl0CQJIhZVDUCGkUsiMDCBAHqKN8RUJ7S05/S2GaaqkG2BU41WIpCOkFGhrosMijAGFJcSlqJGtgVNWD10WNdUpePSplS2MuideysfVJGiiBKpSyI0CHqjcUhGicgUsKzGnEVO2txw10isGgWGhG4aqNxSEbgorAEgWNEUgULAjyYsc9cLVpzDkVKtLDs0Ahza1HLR+IXJ5RooKURuHRSzoN/oAisDA0glfFjGkfGnFK/ZqOOurcOQldfG6qub1QRSyInZWKEA1/BNHjwaMKFdQig0EgWQL6rJq6iw/gqdxmo2VzpuMaypfBqjRFhrCo2Vip2WOWkfzbcL1fjZrt4+rww9ASFLGqzOqxiOiXKRz0SisxeOqOhI7Kz9XriOhbiVKwzUrtRy0SuqxF/EdQjRIpRmukVjEbCRQAQYCyInfFZ0lXVc4vTEbgWFpVZNCNGgah4RRBLkVnTmtstR5qT8m3GqcXaUrp4+rRjD0Q1UaisYjZLiVKVYoQClUbh/BU51WapTEaifKsY0nRXOHlVCAh6sukGQauhFPEac/N61HHyH4+sJetY4tXEdIWwrn5Najhsldacovxs13wrbGXVC+jFNQWKeDRPVRhGA8I1DAWQS5cWOeuOaXR5atwJXTxrsPQ04CUqxT0SrlaMR0LIJ2GaWAjfkJ9adUo1BTwaTsJSxoytXEdIFgTsM0n5Kx9VoNw4oSBJGSiMBoFUqjUNOCo3GanGqxFaI21lSmjqLEL9ljj5OsrMYaavZKs66Ixl2hZ0U04CcqxTUFiiKSwVL8lY+t6B4xGgnASu1HLRqKQ1kVOVZU4sSt5Whl0CQJIhJVDUFhpAojAwBGiKV0WDfEac89pVyvS2WM6NRSDYKnGqxFIR1hkUa6LBRRgDCkuJSwJGtgVNWD10WNfFSl49KmVLYy6p17K5qSNFECVQJEoQClUrUPCNE5MClhWY04ip21uOG+kVg0DUNCNQ1UbikI3BRRFLIhfRFIwUJBHkxY564WrTnA5FTS0sOwwK5+XWo46PxC5PKNFBSqNw/iKWQYBFYGBpBO+LGNIeNOPxK/ZqOOur8OQldfG6K45vVBAJBOys0IEa/glUjIGjeClrqEONMBZAvoyaosUjBU7iVCyuVNxjWVb4jdGmBBsKjZWKnZY5aRnu3HC9dHEzXbxrQw9ECQpY1WYtGI6I8pHPRKKzF/wAUdSRqsr1xGy3QStisVK7UctFrsKzF/EdCxokUozXTK0YjoWQABBvACQSusYqVdVzi9MR0gWEpVDQiw0DR4RRBLkVmuadlqPNSfk1HKqcWyVvx9WjGHohq6jcVjEaLyCVGVYoQEUqjcP4KnOqzVKYjUT5VjOk6K5Q8qoQhD1R0gyDV0Ip4jTn5slqOPkU4+sfwlax/lWMR0hbhXPya1HHZKtOUX42a74VtjLqjfRmjQIp4NE9VBABD1Ro/gFkEeTFjGuOaW3kq3AV08boYdwnBUpGafjKuVoxGy2BOwlCBA/IT606pRqLFPBSWEpY7DP1auI6QtgJYZqf5Kx9VqNwwrSISRAEYBgVSqNGnBUrjNSjVYitMRuNbVSmjqLEL9ljjvrQ0zGRoa9kq56vGMu0L6KecBKdVmmoEURolhKl+SsfW9A8I0E4CV2o5aNxqQ1sRU5VlTixK3laGXQJAkgSRk1FU0gWRGBgCBFKaNQb4g557K5/S2VmmqpBtgUkarEPDLrDQKNUWCKMAYUl0SlhUjWwKmrB66LGvilLx6VnKlurLqnXs05/VJRoogSqBIgQIpVG4eEbJyCUsDMGcFSvrccd9KrmMDUNCNQ1Ubh4RuGRRAJAnoikChII8mLHPZatOcC6pV5YdmgHPy9mo5a6fiRcnkbKIpRG4fxFLICAisDAWQJdYxpD8WnH4lftDUcddX4chmu3jdNcYekRS2ETsrNaBAv4RNKVyBsZwArqLFBWAsgSNGTVGlIwVO4zULK5U/GVrKl8RujTAg2FRsrFTsscqjPdtwvXRxM128a0MPQEhSxqsxaMR0R5VjnotBmL/AIo6px2VleuI2WyCUqxUrtRy0WmwrMX8R0LGifVKM11ytCNBIoAwMASCV1Y0nVXOLUxHSBYKCoMIp4RqGgUwJcgzXNOy3Hnqc9m3GqcWylb8fVoYemHqjUVjEaJcKjOqxWgIeiNRScFSnVZqlMRqJ8uLGdJ0Vyh5FCBYeEbgyK1dBTxFQ5slqOXkPx9Y/hKuORWMR1LcK5+RqOGyVacovxs13wrOMuqN9GaNAig2WVZYAEPVGjwBZBHkxYxpzy28lV4CunjdDD0BOAlYZp+Mq5XjEbJYCWEpYED8g+tOhRqpFPBSWEpY0ZWriOkLYCSJU/yVz+q0G4cUJAkjNARgGBVKo1DSKlcZqUarEVojbW1Upo6ixC/ZY4760KzGGhp2SrnrojGXeFnQNOAlOqzT0CKI0SwlS/JWPreimjEVpxRG6xy0bjDJ7YKlKsqcTNdMrI2EgSQJIyairDyBJEYGBoEPTRqDfEVzz2lXK9Cys0aqQbYFJGqzDwy6Qwo11FgyKMAYUt0SkhUa2BSKwauitfApaatZz1S2Muqdeyuf1SRoogSqBIgQClUah4RstxKSFZgyipX1uOO+lVyGBuGhGoeqOkPCNQUURQkC+jJ4FacBHkxYxslWnKBdYlXlh3aMBz8vZqOOuqcaNZNYaL6IrRG4dFLIMKINIMAAnfJWMaR/Fpx+I8mw1HLS/DkM118bprjD1QwEkROys1oEC/gmlK5A2acAtdRYoKwpZEJGiHqLD+Cp3GahZXKn40reVL4NUaYLBsCViMVKzUc9Iz3bjz3ro4ma7+JaGHoCwlCuqzFYxHRHlI56LTVTK8dUdE47Kz9XriNlsglKs1K+NRx0WmqzF/EdCxofVKMukWjEbCQABFAQJBK6xjSdVc4vTEdIFgpRBgah4RqGgDAlyYM1zTstx56nPZqONU4tlK6ePq0MvRD1RqK1xGiXBG2qxWgIpRG4ecBKdVlWmI1EuUjOk6NOcPIBGixSEbjSKNdQingrn5slqOXkPx9Y/hK1ji0YjoS4VDkajhtOrTlF+Nmu+FZxl1RuM0aCxWcFJIjA0AeophS2ER5MIxpzy6PJVeArp43Qw9DTgJWGafjKuVoxGy2BO2CUsCNHYPoSBqqKeCp2EpY0RauI3AsCdhKn+SsfVaI1DqoSBJGaAjAMCqVRqGkVO4lR9VzitEdGsqU0dRYhfuscd9ZWIw0NOyVc9dEYy7wvoGnASlWaegRRGiWEqX5Kx9b0U0IrTiiV1jloeMMntg0lOqwrxs10yqjYSKSRCSMmoqnkCSIwMDQIeg1BviK57dlcqFlSjVUg2CkjVZikMukFFGuiw0itAH8FJdEpIEG2KVNWDV0WNfApaatZz1W2Muqdeyuf08jRRAlUoSI0AeqNQ8I2W+CUkDMGRUr63HHZVcxgahoRuHqjcPCNQUURQkC+jJ4FaQR5MWMa4SrTlAusSryw7tGA5+Xs1HDXVONG8msNF9EVojcOilBhRBhQkQAJfJWMa4j+LTijybDUctL8OQzXXxuquMPVBAsgnZWKECBfwhpSvWBqGnEC00WKDTCFkCRoh4FUjBUrjNRsrlTcZW8qXxGqNMFg2BKxGKlZqOekp7tvPeujiZrv41WHoC2CUK6qRWMRtHkI56LTVTK/iOhI7Kz9WriNluglKs1K+NRx0WisxfxHUsaJOqUZrpFoxGwkAARQECQT5MWMaSqrnF6YjpAsFKIMDR4RqHgB8BLkwZrmtstx56nPZqONV4vUrp41YYeiHqNRWMRolwSnVYoQEUojcP4KlOqxVaYjUT5VjOkqK5xSRQjQh4RuNIo1QU8Fc/N61HLyH4+sfwlaxxauI6FuFc/I1HDadWnKL8bNejCs4y6I3GaagsUkaIMsDQB6inFJYRLkwjGnNLo8lV4CunjdHjD0NOCpWGKfjKuVoxGy2wE7YJSiNHYAkDVUingqdhKWvYT6tXEbgWBOwlT/ACVj6rQahxWkCSJSjLCmgFKo0aRUriVH1XP6rRHQbKgx1FiN+yxx30FZjCjTslXPXRXGXeF9A04CcqzTUCKI0SwlS/JWPrCmjEVpwErtRz0PGqQ9sRpOVYqnGldMqsttIqciEnRD0A0qFkAEYGgD0Fhr4iue3aVc70tsWM0aKkGwUldVmKQzXSCKNdRYaRRgDCksFLAy1sFqasGroDfApKatZz1W2Muqdeyuf08jRRAlUCRGgIeqNQ8I2W4lJAyMi1K+txx2VXMYGoaEah6o3DwjcFFEAkUvoh4BpwEeTFjGuEq05RrqlWlh3aMBz8nZqOGuqcaN5NI0HoKURqHnEaLIgisAgEihIid8lYxriP4tOPxHk2Go46dHDkM128bpqw9UEC2BOysUIAL5BGdKV6wNzhvBS01CKDTSBbCFjRDQKp4KnyDNQsrnTcaNZVvg1WpgsGwJXVipWVz0lPduPPeujixiu/iVhl6AkShXVSLeI2hyEc9Fpqpl0fijqnHZWPq1MRst0KnKs1G7UcdFpqsxeOqOoRon09GXSLRiNhIAKIAIEgnyKxpKqucXpiOkCwUohoGjQjR4FHwRLkGa5p2W489Tns243qvD6zXTxKww9EUqNRSMRotwqM6rAQEUqjcP4KlOqxVaYjcT5cWMaSornFJFCNCHhG40imqhD+DTn5vWo4+RTj6wlaxyK1xHQtwc/I1HHadWnKL8bNd8LTjLqhcYpqCxScGiCMI0Aeop/BS2ER5MIzpzS6PHVeErp43TGMPRAnBUpGKfjKuV4xGyWBORCiNHYPrSpRqEU8FJYKSvYZ+r1xGy2FJIzUvyVj6tQbhwCQJIlKIIDAKVRs04CVxKj6rn9VojpBsqU0dRYhfsscfJ0FZjCjTslaz10RjLsHoppwEpVimoEU8RolhKl+SsfW9FNCK0qJXWOeh41TJ7I0nKsVTiZrplZGwkUkiUkqhqIQ0qpZEYQAYFKCjfEVz27K53pbYsZo0VIawVONVmKQy6QRo1dQgijAGFJYKURpwE1YNUBvgUlNWszqturLqnXsrH1SRSCBKgSMtAQ9UbikI0W4lThWRlGk761HDZGnMYGoaEbh4RuHhGoIoorSBPRDwK0iI8mLGNFq05QLrEq0sO7RgOfk7NOGuqcaN5NI0HoKURuKeIFkGFEVgYCyInfFjGuI/i05fEeTYajjt0cGQzXXxumrD1CBZBOVYoQDXwTR6dRqcNOClpqEUgaaQLIhY2RDQKpGCp3GahdXOm40rWVb4NUaYLGsKlcYqdmo5aRnu3HnvXRxYxXfxLMvQWwlauqkV8ZdEORY56CmqmV/xR0TjsM/V6YNFuglKs1G7UcdFpqpF/xR0D0T6pRl0isYjbSBRRBgCREuTFjOkqq5xeuI6QLBSiGgU8I0aBRBPkwZrltstx5qnPduOOuq8WSzp18S0MPRD1GorGI0S4lRlWAhFilBqKeCpTqs1WnVGkuXCMaTo05w8ihGiw8I1GFNVFh/BXPzZLUcfIpx9Y/hK1ji0YjoS4OfkajjslWnKL8es13wrOMuqFximoLFJwaIIwjApUU3gpbAjyYRjTml0eSq8JW/G6Yxh6IFsFSsMVTjKuVvEbJYVORCjLV7B9aQo1VYp4KSwlJXsMr1xHSFsBLDNT/JWPqtBuHAJAkiUoggMCqVRo84CVxKj6rn9UojpBsqU0dRYhfsscd9BpmCijTslaz10RjLsX0U04CUqxTUCKo0nYSp/krP0ANCK0qJXWOeh41SHsjScqypxJW8rMugSBJEJIhqKGkUojCMDAego3xFc9uyud6W2LGaaipBuFTjVZikMukEaNVCCKMCmAtgII04CasGroo3wKSmqxOq2xl1Tr2Vz+qSNEEBUoSDQIeqNxSEaLcKnAyMip31qOOyNOQwNQ0I3D1RuHhGoKKIrSBPRDwK0iJcmLGNEq05ByKlXlh3aMkHNydmnDXVePEdMmkaL6IpRluKClkBBhWBpAsiJ8mLGNcR/Fpy+Jcmw1HHa/BkM128Tqqw9LAWQTlWawgW6iXh+PqNTh5xFLTQig0AFsIWNkQ0CqCp8gzULq50/GlbypfBqjQINhUrDFSs1HLSNu7cee9dHFjGno8S0Mu5bCVq6qRbxl0Q5FjnovHq1Mr+I6Jx2Gfq9MGi3QSsrNR5Go5aCisxeOqOhfQilGa6RaMRoJFAGBgCQS5FjGkqq5x0UxHSFsFAQYFh4Ro0CiCfJgzXLbZbjz1O3duOGurcOSzXXxKww9EPUaisYjROQRGRloA9BqKeCpTqs1WmI0ly4RnSdGnOKTgFjRYeEbgoDUWH8FQ5slqOPk4fj6x/CVrHFoxHQlwc/I1HHZK605RfjZrvhWcZdUbjNGgsUnBSiAIMAeop/BSWQS5FjGnLLo8lV4Ct+N0ww9AWwVKwxVOMrWVvEaJYVORAECvYRpCjVVivgqdhKWujK1MR0gWBOwzU/yVj6rXBuHChIEkSlEEBgVSqNH8BK4VGeyuf1SiNwbKlNHUWIX7LHHydBWYIo07JWs9dEYy7F9FNbASlWKagsV8RU7BU/yVj6AGhFaQTu1HPTcaplSyNJSrKnHsM1vKyOgSBJEJIhqBDSqlEYGEYD0FG+Irnt2VzvS2xYzTUVINgqcarMUhl0go0aosEUYA3gFsBBGnATVg9RWvgUlNVjPVp6suqVeysfVJFIICgSI0CKVRuHhGi3CpwMjItTu1HHZGnI0DUGGW4eBuHhGoI0ZAJAs6IaAaRUuTFjGuEq04hdUq8sO7eSDm5OzTjeq8WI3k0jRfRFKMtxQUAYGFEAkAkEuTFjnriX4w05fEeXWo47X4MhnTt4nVVh6RkUlhCSM0FQLdQvD8fUWcPOIpaaEUGmnAJIFjZGTQKpGCkuJXPfVcqfiSt5Uvg1RpgQbYKlYYqVmo5aRt3bjz666OLGNPR4loZdy2ErV0pFvEbQ5FjnovHqplf8AFHRP8hn6vXBot0ErKzUb41HLQU0Zi/4joX0FKay6RaMRoJFABAACQS5MWMaSqrnHRTEdIFgpRBgWHqjUPAoglyDNc07LceepW7tRw11bhyU06+JWGHoh6o1FowaT5BKlIyAHpg1FPBpKdGKrTBpLlwjOk+Npzik4KWNCHhGhFGqKp4K5+bJajj5OH4+sfwlbxxauI6EuIhyNRx2nXWnKL8esV3wrOI6o30ZpuMWKTgpBAEGAPUaP4BbII8isacs66PJVeArfjdMMPRGtgqUjFPx6NZWjEaLYVORCiNHYQJ0KaosU8VU7CUtewz9WriOkCwJ2Eqf5K5/Vao3D+KBIEkSlEEBgVSqNH8FSuJUZ7K5/VKI3DWVKMYLEL9ljj5OgrMEaGmpVz10RjLtA9FGcBKVZp6IRTwUlgqX5DH0FDxiNNIJXajloeMTJ7YNJSrKnFsM1vKyOgSBJEJIhqCw8qEEYGBhD1FNfEVzW7K53oWxYzRoqQbBU66rM6pDNdIZGhqLBkUYA/gEsgVUCcQTaYPUVr4FJTsrE6tOMuqVeysfVJFIIABKo0CHqjcUhGi3CpjJpFqV2o47I05GgagwjcPVG4eEagjRoQCQLOiGgVpBLkxYxrhKtOIXVNLyw9DeCOa/dpxvVuPEbyNhovoilWW4cVgYVgEAnQLIJ8mLHPSX4tOfxHlajhtfgyGdO3idVcYekZFLYRORkFRrdAvDcWC5POIpaCxQVpAlgCPRk0CqRgqdxK57q5U/GlbypfIGqNAg2wVKwxUrNRy0jbu1HDXXRw4zp6PEsy7lkZrU0MrfijaHIsc9F49VMuj8UdE/yGfq1cGy2RErKzUr41HLRaaMxf8R1LGifVKMukWjEaCRQAQAAkEuTFY0nVXOL1xHQLBSiDAsPVGzwAwCXIM1zTstx56lbu3HDXVuHrLNdvErDDvFKo1FYwaTuIlIyHqh6o1FPBUp1WarXEaT5cIzriXG05xSRQjQhoRoUU1RYfwVz82S1HHycPx9Y/hK3ji0YjoS4lQ5Go47TrrTlF+Niu+FpxHVC+jNNQWKSKQQAGNBSopvALbQR5PRiua2ujyXqnAVvxuqMYeiBbBUpGafjFyv4jRLCpyIURo7CRp0BqLFPFVOwlLHYZ+r0xHQtgJYSpfkrmtRG4dVLIEkZoCNApoA9UaP4KncSoT2Vz+qURuGlQYwIhydljj5OgrMEaGmpVz10xjLuX0DWwEpVmmoEVRU7BUvyVj6wGhGmkErtRz0PGJk9sFSlWVeLYZreVUdGkCSCcjJqCw8qFEAGBhD0FNbEVz37K53pbYqUaKzBvgtTjVYikMukMjQ10WGkUYAwFsgRUacBL1WD1Fg3wKnTsrE6tOMuqdeysfTyKSRAUCRK0CRSEbh4RoLhUvRk0i1K7UcdkacjQNQYZbh6jcPCNmhFGACQLIGgGkEuTFjGiVacY3IFXll3DwK5r92nC9W48R0yNhS+grRlqHFAGFYBAACQS5MWOekp6w053iPK1HDa/BkM6dvE6qsPSMilsInIyCo1ugXhuLBcntiNFpoRQaaRCWAK+iGroqkYgnfFSue+q5U/ElbyrfBqtQINsFSsMVK2NOekbd248+uunh6sad/FxVl6C2GaNNDKviNocixz0HHqplf8UdE/yGVqYNhdBGysVK+NRy0WgzHRHVHUkaqTqtNZdItGI0EigDSDAEgjyYsY0nVWI6K4jpC2ClGTQNQ9UahoA0AlyjNcs9pbjz3qVu7ccNdX4uss6dvFxWGHeHojcVjBU7hUpGAjQPUaing0nOjFVrg0ly4RnXEuNpzikihAQ0I2KBqiw/grn5slqOXk4fj6x/CVrHF4xHRO4iHJjUcdp11pyi/HrNd8LT1ZdULjNNxixScFIDCNAKVFMBbAjyekZ05ra6R49dU4St+N1RjD0QLYNJSMVTjFyt4jRLCpyJSiNHYGkKNQing0nZUpY7DP1euI3AsCdhKl+SsfVqI1DqpZAkjNARoA0CqVRo3gqdxKhbsrneqURuGlSjGBEeTsscfJ0FZjDQ8epVz10xjLuHoDbASlWabjCK+IqdgS/IYYU0CtIJ3ajnpuMTJ7YNJTqsK8WwzW8rI6BIEkCSM01BYaVUogCMDCHqKa2Irnv2Vi9LbFjNGiswbYLU66rEUhl1hkUa6LBkU0AaBS2RCKjTgJ+qwaoo3wKnXsrE6tPVl1Tr2Vj6ewpZEKASqDAkPCNw8I0FgqfoyMi1K7UcdkacjQNQYZbh40bh4RuGhFEGAkiGgUZBLkxYxpOrTjGuFXll3bwK5b92nC9W48R0yNhoPRFKMtxQAABRBgAAkE+TFjGkp6wrl8Q5W44bX4MhnTt4nVXGHqGQLYRORAVGt0kS8NxZIuT2xGi00IoNNIEsJQr6IauiqQCd8EqF9Vyp+JG8qXGqNAg2FRsM1KzTlpG/eG482uunh6saenxcV8Zdy2GaNNDKs9UbQ5FjnoOPQyvPUdE/yGFqYjYWBGysVK+NRy0WmjMdEdUdSxqp9PRl0i8YjQSKAMDAFgR5MVjSdFYjoriOkLYKUQ0Cw9UaNACCfJgzXLPaW4896lfu3HDXV+Lqzp28XFYYdz0RuKxgpLglIyWNEUoNxTwVKdGarTqKlzYRnXE+Npzh5FCNCHhG4KKNdFU8Bz82S1HLycPx9Y/hK1ni0YjoS4Vz8mNRx3xOutOMX49Yr0YWnqjohcZp+MWHnBSAwjQClRT+ASwJcnozXLbZdI8muqcBWvG6oxh6YFsFSkYqnGNZW8RolgTkQACOwjToDUFPFaTsJSx2GV6YjYWBOwlS/JWPq1Ebh1AkE5EoDIwKMCqVRTeCkuJULdlc709EbhrKU0YEQ5Oyxx8nQhWYw0PHqVrPXTGMuwegNsBKVZpqBFfEVOwJ/kM/QUNCLBkErtRz03GJlS2DSM6rFV4thmumVkbCQJIEkQ1AhrKpZEARgYRSo0NsQc9+ysXpbYsZo0VIN8CkroxOnhHWGRoa6ENIowBhQsiJiN4on6rBqiwb4FTr2VidWnqy6p17Kx9PYUkgAjSqVoCHqjUUhGi2BP0ZGRUrtRx2RpyNA1DQjcNCNw8I3DQKKDAWQGAGcBLkxYxpOrTjGuFXll3b8Qrlv3acL1fjxHTI2RovqorRluH8AAaBWBhWAsiJ8mLGNJT0hpyvEOXGo47dHBkM6dfE6q4w9TSBbCEkSlEGekqXg8OSGT2xGi00IrA00gnYQK+iHqKeBSXGa576rlo/FqN5UuNUaCwbII2Vmp2ajlUL94bjz666eHqxp6PFxVl3LYZo00WLTiNufk1Y5aDj0Muieo6JejK9MRotwSsrNRvjUcdFoMx0R1R1L6IpRHSLRiNhIAKwMIFsBHkwjGk6tMR01xHQtwpBDQLD1Ro8CiIlyYJXLPaW3mqV+8Nxw11fi6Mad/FxVl3PVGorApLglIyWBIpQbik4KlOjNWr1GkebBjSfGrnFJVSwingaFFNXRT+A5+bJajl5OH4+sfwlaxxaMR0JcHPyY1HHfCV1XKLcbNd8LTiOiFxmn4xYpI0QQBBgFKimAtgR5BmuW2y6R5NdU4ErXjdVcZemBbBUpGKpxouVvBslgJIhQCOwjToDXRVfFVOyJSV7Kz9XpiNwLAnYSpfkrF6tRG4dQJBORmgIMCjAqlUU/gqdxELarF6eiNQ8qUY6hEOTsscvJ0IViMNG49StY66Ixl2gega2AjIzTUCK+Cp30Kn+Qz9CQNAsGRUrtRy03GJlS+DVRnVYqvFsM10ysjYSKWRE5ENQDWVSyIAjAIHqKa2IOa/ZWL0tsVmjRUg3CkroxOnhHWGRo1QgyKMAeBS2QTVGETnVYNUUb4FTr2VidWnqy6p17Kx9PYUoAIEqjQEPVG4pCNFsCfowMi1K7UctkacTQNQ0Mtw0DcPGI3DQiiDAWQGAGcBK+LGdJ1acWvglXll3aeoVy37tOF6vx4jrkbIpfRFaI3FBSgwMKwCBbCJcmLGNJT0hXO8Q5cbjht0fT5DOnbxOmGHpEC2AkjJRBnpKl4bhyQye2I0SgRWMGmkE7CUK+iHqKpGCp3Ern5NVy0fi1K3lS41RpgQbIqVlYqVmo5aQv3huPPrrp4urGno8XFvGXckjNGmi5WnEbc/Jqxy0HHoZdE9R0S9GV6YjRbglZWajdqOOi00SOmOqOpPRPqlEbi0YjbTgAKEAIFsIjyYRjRKNMx0VxHQthKQQ0CxSEaNAo+CJ8mCVyT2luPNep37Q3HDXVuLozp38XFWHdSuo1FYwVO4JSJSxokUoNRScFSnRlavUaS5sIxriXGrEUlVLCEPA0KKauinnAc/NktRy8nD8eV/hK1ji8YjoncEOTGo474nXWnKLcesV3wvPVHRz30Zp+Maik4KQQBBgFKim8AsoI8is1y22XSPJrqnCVrxuquMPTAsKlYYqnGjWV/BolgTnBCg0aIAGroqngqdhKWOys/VqYjcCwqdhmp/krH1WqNw6gSBJEpRkYFNAp6osOKncEL6rnenojUPKlGMCIcnZY5eToQrEYaNx6law6Ixl2b0BtgI2GaegRXwVKwVP8AIZBQ0IsGRUrtRy03GVMqXwaSnVYqnFsM10yujoEgSRE7CGoEPKqSRGEYGgD1FNbEHPfsrF6WcVmtRUhrBU66MRSEdYKNGqEGRRgDxgpbIE9VGkEp1XM1RYN8Cp17KxOrT1ZdU69lY+nsKWQAQJVK0BFKo3DwjQWBL0YGRU+RqOW02nE0I1DQjcNA3DwjZoFFBpAJBoAZwEr4sZqdWnFr4JV5Zd2nqFctu7Ther8eI65GyKWNEVojcUFAGAJFYBALCI8mLGNJz0hXO8c/LjccNuj6frDOnbwuqMYekQLIJyM0BGnpKl4bh9Fye2I0WmiRRGmUTsJQrgh6iqQikvipXNyarlVOJK3lS41WpgQbCpWGKlZqOekL94ajza66eLqzp6PFxVl3LIzTU0XKs4jbn5NWOWm49KZXnqOiXoyvTBoLoI2Vmo3ajjoKCR0R1R1hPRPqlEbi0YjbSACgAiFsKjyYsc9EoMx0VwdIWwlKIMCxSqNmgBBPkwZrlt2luPPepX7Q1HDXV+Lozp28XFGXdSqNKxg0S4iNhKEaIpQaik4KjOjK1eo0ly4RnXEuNXOKSqljUIeBqCinroppwHPzZLUcvJxTjyP4StY4tGI6J3BDkxqOO06605RfjYrvhaeqOiF9GabjGopIpPRAEGAUqNH8EJII8gzXLbtLpHk11ThK143VXGHpjWFSsMVTjRqLeDRLCpzghRGjRGAa6Kp4KnYSljsrP1amI21hU7DNS/JWPqtEbh5UCQJIlKMjApoFPVFP4KnYEb6rnemojUPKlGMFiHJ2WOPk6CsRho3FqVrHXTGMuwegNsBKwlNQIr4CdgS9GWkBgWDIqd2o56bjGcnvg0lOqzVOLYZreV0bCRSSInYSmoKeVCSIwjA0AeuimtiK579lc70s4qVqKzDXwKnGjEUhHWCNGrqLBA1QNApbIEnVRgSnZVimqBr4FSr2VidXnqy7JV7Kx9UsKSRAECVStARSqNw8I0FgS9GBkVO7UctptOJoG4aGWoaBuHhG4eEVgaRQkRoAZwEr4Rmp1bcR5MEq0su7T1CuW3dpwvV+PEdcjZFLGiK0R0igADAwoAwBIJcmSsc9J26QrneIcuNxw2v9P1hnTt4XVDD0iBbAnIzQEGeki3g8PqmT3xFLQWKCtIJ2ErVwQ1UVSMVSXErm5NVyqnEjeVLjVGgRrIqVlYqVmo56Qv3huPNrrq4urGnp8XFGXYsjNNx6NZVtiNOfk1XLTcYuV/xG0/yGfq1MRoLgjZWajdqOOgpokdEdUdSRon1SiOkXjEaCQKKIMAWBDkwjGiUViOmuDoSwlKIMDUUqjRoA0Aly4M1y27S3Hn11K/aGo4b6vxdIZ07+LirLseqNxaMBO4I2EoQJFKDcUnqCU6MrV6jSPNgzriXGrnFJVQQNA3BRT1A3grn5slqOPk4px5CVvHItGI2nbJBDkxqOO066rlF+Nmu+Fp6o6oX0Zp+MWHkUggAMArQUwFsgjyeqxXLbtLpHk10/CVrxuurD0wLCpWGKpxo1F/BpOwqciAIEdgYBroK+CpXEpY7Ki9MRoLCp2Gal+SsfVqI3DyoWcAkiUogwBoFPVGj+AS4IX1XOmojUUlVoxgRz8nZY4+ToQrEYaNxalaw6Yxl2b0VrYIlZWaaiLFfATsCX5DLSoMI1BkE7tRz0HGM5Utg0lOqwrxbDNdMrDoEoEkQlhKagsNKhJEYGEaNA9dFNbEVz37K53pZxWaNFSDfAqcaMRSErrBRo1dFhhRgQ0ChbEE1RgSnRg1VDXwWpV7K5zq/4su0Tr2lWPp7CkkQBAlUrQEUqy3FIGi2BL0YGRU7tRy2m04nhG4MI1DQNxSEbhkUQYUsiNADOAnfBmp1bcW5MCryy7hPUSuW3dpwvXRx4jrlrIpY0FqI3DgEgwrAwADSCPJkrHPXE56QsYvEOXG48+1/p8hnTt4XVDD0iKWwicjNABnpIXg8PqmT3xGi1CKQK0gSwlCuBDVRVIUJcSubk1XLSnFqN5UuNUaYLBsgjZWKnZY56c9+8OkebXXVxdWNPT4uKMuxZEp+PRcq2xGnNyK56bj0Mr+DafoyvTqjRbgjZWajdqOWgoM5dEdUdYT0T6rTUdItGI0EgArRoMBbAjyLHPRKDMdNcHSEsFKMmhGoeBo8AIJcozXLbtLcefXUuTtDUcN9X4ukM6d/H/lVl2PVG1owVO4JWGaWBIpUbin4ipToytTBUebBnXE+NXOKSNFEhoRuCKeop/Ac/NkrHHycPx5BW8cX8RtO3oOfkajjtONVyi/HrNd8LziOrnvozT8YsPOCkEYGgFaim8AtkEeRWK5b9pdI8uuqcKVrxuquMvRAsKlIxVONGov4NJ2RU5VAECNBgGugr4KlcKWOwz9Xpg0FhU7DNS/IY+rUG4eVCyBJEpRDQLBhBSo0fwE7AhyaMU3GLFJVRjAc/J2WOPk6EKzGFNxalbw6Yxl1b0VrYCVhmmoEV8BO4J+jISBoFaRU7rHPTcas5PfBpKdVlXh2Ga3lZHQJAsgnYZpqCw1lCSIwMDRoh66intgrm5OyueizglajTMNfAqddGYpCV0hkaGuiwwowBoALIJiNKiU6MU9dUG+C1KvZWJ1f8WXVOveVY+nsKSRAECQrQEUqjUUgaLIJejBpGkrtRy2n604HhG4MI3DQNRSEbhoRRFYCyI0AM4Cdxmp1bcWvgVeWXcLdRK5Z7tOF66OPGXbLWFCNEVojZwYUAYGBgLIJcmSsc9Jz0hWLxDlxqPPtf6fITTv4XXGMPQwpbCJyIAgz0kLweFTJ74jRaBFYRoJUJYZoVwIeqKeAJdUrm5NVy11TiRvKlxqjTBYNsQRsrNTssctOe/eG482uuri6s6enxcVZdySM0/GLlW2I05uTVc9Dxhlf8R0S/IYXpiNFuCNlZqN1jloKarOXTHVHUnofVKajcXjEaLIoA0AIFkEOQjGiUViOmuDpCW0KUQ0IsUqNGgBBPlGa5Ldpbjz66lydoajhvro4ukM6d/HxSGXc9Uai0YKS4I20ZpYEilRuK/iKjPYZWrgqXNkjOuJcSucUkUoGgbhkU1RT+A5+fJWOPk4fjyCt45F/EdE7eiOfkajjskarnFuPWa7YXnqjq576M0/GLDzgpBGBo0Fain8AlgR5BmuW/Z0jyb6pwJWvG6oxl6IFhUpGarxosW8Gk7CpyIAgR2BgNUFPBU7ASOys/V6YjTWFSsJUvyHP6tQbh5UCQTsJQEGBRhBSuDR/ATsCHIMaNQWKSqjGAhydljj5OlhWYwp+LUreHTGMuoRoo2wEbDNNTQi3gqVxE/wAhlhRgUZBK6xjTcasZUvg3UZ1WFeLWa3lZHRpAkgnYZNQU0qEkSsDA0aIpXRTWxFc19WMUs4M0aNMwb4LU40YikJXSGRoa6LDCjAHgC2xAggSCc6rBqqDfBalHZWJ1f8WXVOvdWPp7YKQQBAlQYQh6o1FIGgtgJejIyKldqOW+E9acDQjcGEbho0aikI3DIoisASAQIPgJ3GanVtxbkwKvLLuFuoVzT3acPq/HjLrGsKEaIrRG4oKEgwADAwFkEuTJWOeiT1Vi8c/LjUeffHR9P1hnTv4XVDL0tIFsISRCiDPWQvB4dUye+I0WgRWMRoJAllShXBDwiqRgpLqzXNyarlrp+JHTKlxaamCxrYglZWalZY5ac9+8Nx5tddXF1hnT0+LirLsWRKbjGsq2xFc/Isc9Nx6GV/xHRL8hlemI0W4iVhmoXajloKbCs5dMdUdieifVKajcXjEaCRSgMA0gWwIcg56LRWY6K4OpLCUohoRYpUaNACCfKJXJbtLUefXUuTtDceffXRxdIZ09Hj/ypDLspVGorGCkuCN9GaEAeqNRX8VVGewytTBpLmwY1xLiVzikjRQPCNCKeopvAc/PkrHHycPx5BW8ci/iOidtkHPyNRw2Suq5xbj1mu2F56o6ue+jNPxixS2CpiMAxoK1FN4BLII8is1y37OkeTfVOFK143VXGXpgWQSlWarxo1FvBSXFTkQogR2BgNUVTwE7gSOys/V6YjbWBKwlS/JXP6tRGzyoE4CdhKAgwKaEU9RT+ASwIcgxoaCxWVVvxBDk7LHHydLCswRo3FqVrDpjGXUPRRsCNhmmoC3gqVxE/wAhGkBgWDIJ3WMaDiVnKl8GqjOqwrxazXTK0I20gSQTsIagHsoSRABgGNEPXRTWxFc/JqsaLODNajTMG+C1OujE6pCOkMjQ10UwowB4wC2QIqBIJz2GPpqqo3wKnHZWPq34suqde8qx9PbBUxGAJEowEUqjcPAoTgJejIyKlfGo5b4T1pwNCNwYRuGgailUbhoRRFYAkGgRgTuM1Orbk18Eq8sO4W6qlc092nD66OPGXaBYUI0RWiNqCgAAwMDAEgjyZKxz0SeqsXjn5erUeffHR9P1hnTv4XVGMvSMgSwhJEARp6yF4PBqmT3xGi0CKwjTSCdlShXBIeqKpGKEuI5uTVctdU4kdMqXwao0wINkEbKzUrrHLTnv3huPNrrq4usM6erxcVll2LIzT8aNZUtgtc/Jqxz03GLlf8RtKOwyvTEaLcErKzUeRY46LTVZjpjqjsT0T6pTUbi8YjYWAoDAMBbAhyEY0Wisx0V6o6FsqUghoRYpUaNApoES5MErkt3lqPPrqXJsNx599dHF0qzevR4/8xSGXZSuo1FYwUtwQtozQgIeo1FZ6ioz2GVqYNJc2SMa4lxKxFLCl9A8I1BFPAppwHPz5LUcfJxTjyP4St45FvEdE7aCHI1HHacarlFuPWa74X/FHRC+jNPxjUPbAJIAIMaCtRTASwJcmDNcl+0uk48m+qcJWvG6q4w9ECyKlKs1XjRqL+Cp2FTlEBQI7CMA1FU8BOwEjsrP1emI21gTsJUvyGL1ag0eVCyKnYSgMjApoRT1FPGCkuIhyDGjcYsUVR8Bz8nZY4+TpYVmCKbi1K3h0xjLs3oNYErDNGgLeCpXET/IRpAYFgyKndY56Di1WcqXwaqM6MLcOpXTK0I2EgSQTsIagQ9lUkiMIADGgeuga2Irn5NVjRZwStRpiDfBanXRiKQjpDI0NdFhhTQBgCyCYgSCc6rBqqpr4FSjsrH1b8WXWJ17qx9PbBSSIANIjQEUqjcPArTgIzoyMip3xqOW+J+tOJoRqDCNw0DUUhG4ZGhBgCQYRgTuJU6tuDcmBV5Zd2t1CuX82nD66OPGXWNYUsaItRGzihIADAwMKEiI8mLHPRLdVZvHPy41Hn26PpusM6dvC6oZekQJYQkiAIP4yLeNwbKpk90aCgRRGmkE7CVoxUNCKpApLqjm5NVy0pxI3lS+DVGgQbII2VmpWWOenPfvDceXXXVxdYZ09Xi4rOMuxZGafj0ailsRa5+TVc9Nxi5X/EbS/IZXpiNBcEbDNR5Go46LRWY6Y6o7E9E+qU1G4vGI2FgAGFYQsghyLGNFoMx016joSwUoyMIsUqNHFGBE+XBK5Ldpajz66jy7Dcefbo4+kfwzevR4/wDMVhl2PTUaisCluCFtGaEApVGor+KqjPYRavUVHmyRnXE+JXOHsKUDwjUMNGgDeA5+fJajjvinFkfwl66Y5FvEbTtoIcjUcdpxquUW49ZrvheeqOiF9GafjGoe2ASQAQYBaoozgFsCPJgzXJfs3Hl31ThKvjdVcZemBYEpGatxo1FpwVOwqciAAR2EaQNUU/gJ2AsdlZ+rUxG2sCdhKl+SsfVqI1DyqlkE7DNAQYFNCKeoqkYCdwR5BjTcYsVnFUYwHPydljj5OgrMYU3FqVvDpjGXZgawJWGaagK+Cp3BL8hlpAYFgyCd1jGg49VnKl8GkZ0YW4dSumVoGwlAsglYQ1APZVJIjCMDRoHrop7Yg5uTVY0WcGa1GmYNxanXRiKQjrDI0augIpo0DilsiJyI0glPZWDVFhr4pUo7Kx9W/Fl1ide6sfT2FJIgA0iVoCKVRuHgVrYCM6M0ZFTvjUct8T9acDQjcGEbhoGopCNw0I0ICBZBhGBOwlTq04jfFSryy9AX6iVy/m04fXRx4y7RrAWNEWojagpZAAYGFEC2ER5MWOei26rGbxz8uS1Hn2v9N1hnTt4eOuMZelgLYE5GQEH8Z/gX43Bv/Cpk98RoKBFEaacBOypWjBDwingUlxmubk1pz0pxI3lW+DTUCDZFRtqsVKyxz05+TvDceXXXXxdIZ09Xi/yoy7FkZqnGNRS2Irm5NVz0PGLlf8RtH8hl0UxGi3BGwzUeTGo46LRUjpr1R1hPRPqlNZbi8YNhIAAwKwEkRHkGNEorMdNeo6EshSqyMI1FKjR4ARE+TBK5Ldpajz66jy7DceffXTx9I/hmvT4+RSGXZSmosVjBS3wVz2GKEApVG4r+KiM9hFqYKjz5IxrifErEUsKX0DQjUNA0eANOA5ufJajjvinF1j+ErpjkW8RtO2ghyNRx2nGq5Rbj1mu+HR+KOjnvozT8Y1FLYCcgAgwCtRTgSyCPJis1y37Nzjy76fhWr43VXGHpgWFSkYq3GjUWnBU7CpyIABHYRp0DVFP4KnYQsdhn6vTBtrAlYSpfmMfVqDcOoWQTsM0BDQNDCKeoKRgpLAhyYMVuMIt4rTRgOfk7LHDyBCsxho3Elaw6oxl2D0GtgJWwZpuMVXwE7iJx2ECQGBYaRU7rGNF49VjKl8GkZ0YW4dR0ytCNtIEkE7CDQD2VSSIwMI0ApXUU1sBz8mqxokiVqNMQ18FqddGIeEdYZGjVAwowBxS2RE5EaQSnVYNUU1+qrUo7K5/V/wAWXWJV7qz9UsKnIyANIjQEUqjcUgULdQRnRmjIqd8ajlvifrTgaEbhoRuGgbh4RuGhFGAEAkAEYCWEqdWnFr4qVeWHoC/VU05fzacPrp48ZdoFgLGgtRG1ACQAGABRAthEeTJWMaLbqsY1xz8nWWo8+uL/AE3WGdO3h464xh6RUJYCSMlAfJBuDZVMn5MRqhQIpCNNIJ2VK0ZAh4Ro8AW4jl5NactdU4kbyrfIGq1EWDYEbKxU7LHPTn5O8Nx5d9dXF0hnXXq8X+VGXYsjKnGjcUtgObk1XPQ8YuV56jaUaMr0xGi3BGwzUeTGo5aLTVYy6a9UdoT0T6rTWXSLQNNIFARWkQlgR5CMaLRUjojqjZLBSqyaEailRowDAhOXBK47dmo8+uo8vjcefbp4+sfwzXpxyKQy7KU1GorGAW+A57DNaAPVG4rPVRH8hFqYKjzZIzrifErnFLCl9A0I3DQKeBTTgjm58lqOPk4rxdY/hmumORXwbTtoIcixx2SNac4rxs12w6PxR0c99EqnGLD2FTkRhBjYFVoBgJYEeTBK5b925x5N9PwlXxuquMvTAtiKnKsVbjRqLTgqVxSWRCqBHYRvQNUVTwVO4hI7Ki9MRprAlYSpfmMXq1BuKSoSUCWVKUQ0IowKpUDxgpLghyYMabjCLK0PgObk7LHHydCFYjDR+JK3h0xjLq3oNbARsIbjEV8FTuInHYT6E6AwLDTgqd1jGi8eqxlW+DSPowrw6jplaEbaQJIJ2ENQU1lCSIwMI0aClUU1sBz8mqxSSJWo0xDcgtSroxFIR1hkaNUWGFGBDilsiEkAkRKeysmqoa2CpR2Vz+r/AIsuqde6s/T2wVOdGQBpEaAitUbh4FC2CpToxWkVPkxY5b4n624mhGoaEbhoG4eEbhoRTAwBIAIwEsJU6tOLXxSuiWHct+ixNOWO7Th9dPHjLtAsKEaItRGzgEgAMKwMAWEQ5MlYxotupGdcc/J1luPNpf6brDOnbw8dcYw9IqEsBJEKIaMn+ADg1UyfkRsKhFIRWkE7CVoyAPAp4wC3Erl5NVy11XiHTKlxRqK1kErKzUrLHLTn5O8Nx5t9dXF0hnXXp8X+VJZdijKvGjcPbBXNyarlR4xrK89RtL0ZXpiKFwQsM1HkxqOWgpqs5dFeqOsL6H1SmstxeMGgkCgIrSBbCIcisaLTwSOiOqNlsBFZNVGopUaMAwBOXBmuO3eWo8+uo83jcefbpp1j+GK9WORSEdVKI1FowUnJgIWGQA9dRqKz1URnsItTBUub0Z1xLiVzik4NFENCNw8CmqKacEc/PktRy8inF1j+Ga3jivg2nYEORY47JGtOcW42a7YX/FHRz30SqcYsPYVORGAa7AK1FP4IncEeTBK5b9m5x5N9PwlXxuquMvTAsipyrFW40ai04KnbBU7CFAI7CNOimqCgqdxCR2E+r0waawqdhmo/kMfV6DcPKhZBOwlAQYFNCKeoKQKncEeTBihxhFv9FaHwHNydljj5OhCsRho/Elbw6Yxl1b0GtgI2ENQFvATuCUdhn6E6BqiwfBU7rGNF49VjKt8GkfRlXh1G8rQjbSBZBKwlNQU1lCSIwMI0ApVFNOA5+TVZ0SRmtRpmGuFTroxOqQjrBRo1dFhhRgQ8YKFkE5ECcESnsrNPUIa3VVqMdlc/q8dWXWJ17yrP09sFTnRlgCRBgIpVG4eBoLYCU6MVpFT5MajnvifrTgaErUNCNw0I3DwNw8IogwBIMACEuJU6tOLXxSuiWHct+sqmnLHdpwnXTTGXaBYWhGiLURs4BIADCsgKhbCI8mLGNEt1hYzrjn5MlqPPpf6bpDOnbw8dcMvQwFkCWEKIaMkA4NKZPyC0KhFIRppBOypRhA0CqRgEuI5eTsrlrqvEN5UuN0aoDYEbKzUrLHLTn5O8Nx5t9dXF0hnXXq8X+VJZdSjKvGjcPbBa5rq5U3GNZWnqNpejNdFMRS3BGwzUeTGo5bLTVZy6I6o6l9D6pTWW4vA0EgUUYBpAthEOQjGi0VI6Y6o6EsIRUNCLFKjRoA0Any4M1x27y1Hn11Hm8bjh5HVTrH8MV6cch4ZdVaDSsYKTkwRCwgAeuo1FZ6qqP5DK9MFR58kZ1xLiVzilhoohoRuHFNUU04I5+fJajl5OKcXWP4ZreOK+DadgR5FjltONacotx7DNdsL/AIo6Oe+iVXjGjWwE5EYQ1dFUqKfwQlgR5BK5OTs3Hk8nT8JV8bqrjL0wLYipzqsVbjRuLTgqdgTlAqoEdhGnRT1A4qdhCR2E+r0waawJ2EqU9xi9WoNnlQsgnYSgIMIpoFPUVSMAlwQ5MGaHGJFvFaHwHPydljj5OlViMNH4ma3h0xiOrRoNYEbCH4wV8UTuglHYZ+tOgNRYM4KndYxovHqsZVvg0j6MK8Oo65WhGmkCyCVhKagprKEkRgYQYA9RTWwHPyajOiyrNCisw18UqddGIpCOsFGjVFhhRgD+AFkE5EAEp7KxT1FNbFKj+Suf1f8AFl1ide6s/T2wVOdGawBIgwLFKo1FIGguCM6MUZFSvixz3xP1twNCNw0I1DQNw8I3DwiiDA0gAABLDNTrrTj9a+KV0Sw7l5Oqppyx3acJ100xl2gWFCNEWojZwCQAGFYBAsgjy4sc9Fv1gjOuOfkyW48+l/pukM6dvDx1Qw9LKFlEJOqhZENGSDcGyUybkGqFQikIrSCdhKMAaBVIwCXEcvJ2acr1XiZrplW6tNVCNYErKzUrLHLTn5O8Nx5t9dXD0hnXXq8X+VJZdSjKvGjcPbBXNfVcqbjGsrT1RtL1WXRTEUtwRsM1HkxqOWy01WY6K9UdoWNE+qU1luLwNBIAKwMBbAhyDnotFSOmOqOhLARWTQixSo0cGgCcuCVx27tR59dS5vG48/kdNMhivTjkPDLqrQaVgUnICFhmgCldRqKT1VUfyGVqYKlzejOkuJXOKWGigeEahhT1FGcBz82S1HHycU4usfwzW8cWnBtO2AhyLHLaca05Rbj1mu2F/wAUdXPfsM1Xjwah7YCfggAaugpUU6oSyCNxK5L9m5x5PJ0/CVfG6q4y9MC2Iqc6rNW4kai04qp2QTsACF/IQZ0U1QP4KS4Jx2Gfq9MGhsKlYSpT2GPq1MGjzihZQTsqUBBRTQKeoqkYBLgjyYM6LxiRbxWh8Bz8vZY4+QqsxpwVTiZreHTGI6tGgFgRtolPxgt4oldBOOwz9CdFGAhvBU7rGdE49Vzit8GkfRlbh1HTK0I0EilkRO2iDxinsonIjAwDAh6innEHPyarOiSM1qKzB5MUqddGYpCOkFGjVFhhTVAwBZBORGkEp7KwauimtiiP5K5/V46susTr3Vn6pbBUp0ZrAEgMBFKo2eBWsCM6M0ZBPkxY574l624HhK3BhGzQjR4G4eEUQYGAAACWGanDTl9a+KldDDuXk6qmnLHZXCddNMR3gWQoRqpFqI2cAkAFYGQFQJBDlyVjnot+sEZ1xz8mS3Hn0v8AS9IZ07eHjqjGHpECyCc6rISIMYK3BomTcg1QqhFIGmkE7DNED1FPXALcRycnZXLXVeIdMq2RpqgNsBGwzUrNRy05+XvDcebfXVxdIY116vF/lSUdijK3GjcNfArmvqudNxouVp6jaXqsuimI0W4iNhmo8mNRy2Wis5dNeqO0J6J9Uoy3F4waCRQAQACyCHIOegoqZdEdUdCWAgyaBqK1FN8gMATlwSuK3dqPPrqXN43Hn8jprkMV6scPDLorQaVj7Ck5MBCwzQBSmo1FZ6qqP5DK1MFR5sIzriXErnFbDRAPCNQ40auAacBzc+S1HHfFOLrH8M1vHItODac4CHIsctpxrTlFuPWa7YdH4o6ue+jNU48Ro9sUT8EADV0FaimEJZBG6pXJydm48vk6fhKeN1Vxl6YFsRU51WatxI1FpxVTsgnZAFQv5CDOimqKfwCWBOO0DK9MGhsKlYSpT2GPq1MGjyoSUCSqUBBhFNAp6iqRgFvgIXGaXjEi/itD4Dm5eyxx8hVZjCqcTNbw6YxHVoALYCVtENxgt4ondBKOwn0LaA1CGFTusZ0Tj1XPKt8G0fRj6tw6jplWEaGRSSCdhkaCnsoSRABgGAUqgacUc/JozSSM1qarMG6lTroxFIR1hkaNUWGFGAPAFsgSRABKeysGqKe3VVqH5K5/V46MukTr3lWfqlsFSnRmtABIDARSqNqQKFsBGdGaIJ3xY574l624HhK3BhG4aEaPVG4eBRBgYABgTsM1ONachvipV2HoLydVZ1xzV7K4zrppiO0C2oFrqpFqI2cUJ0RhWBgbwAkEOXJI56Lfr/wsZ1xz8mS3Hn0v9N0hnTt4eOqMYekVCyBLDNLIgxkitwaJk3INUKoRSMGmkE5GaMAeop4wC3Erl5OyuV6pxI6ZWsrTVQa2Co2VipWWOWnPy9objzb66uLpDGuvV4v8qSjsAyrxo3DXwHPfVc6bjRrK09RpGNGXRTBotxEbCVHkxqOOy0VmOmvVHaE/JE+qURuLxg0EigAgwEtgIcg56CmqZdMdUbJYE1ZNCNK1FN8AMQBOXBK4rd2o8+upc3jcefyOquQxXqxw8MuqlRpWMAnICNhAjRD01GorPVVR/IZWpg0jzejGuJ8SsRSwpAPCNQ40asgacBzc+S1HHfFeHrH8M3reOKzg2ScBz8ixy2nGtOUW49Zrvh0T1R0c9+yM1XjVo18BPwAENTQVoRTCEsCNxK5eTu3Hl8nTcJTxuquMvTGsipTqs1fi2Eais4qp2ZCSBQL+SoM6Bqin8AlwTjtAy6OPBprCpWESnuMfV6YNGlQsoJ2EoKhoRoYA9RVIAtgQvgzS8YkXjBoZxRzcvZY4+QqsxpFU4Wa6YdNcR0H0AtgI20Q3GCyid0Eo7jP0LaLRqEMKndWdE49Vzit8G0fRhbh9R0ytCNNIpbAlYZo0FPZQkiADAMApVA04Dn5NGaSVZamqzBvilTrozFKo6QyNGqLDCjAHgC2QJIgAlPZWKaop7dVVD8lc/rojoy6xOveRj6e2K0lIzWECQGAitUbhxQtgJTozWBPkxYxvifrbzmhG4KNmhGlKjcNCKICKEiMAASwlSjWnH6N8UroYdycnVYzpzR2VxnXTTEdoF9QpahFqDR4FaQBBlGQYAlRDlyVjGi26kZ1xz8mNx5tL/TdIZ07eHjqhh6RlQsoElWSyIMCtw6Jk3INUKosUjBWnATkZowB4FPGAW+A5eTsrlrqvEjeVbDTVFa+AlYZqNmo5ac/L2huPLvrq4ekMa69Xi/ypKOwejKvGjcNfAc99VzpuNGotPUaSjRlfj6jReQRGwlR5Go5bLRWMumvVHaF/JE+qURuLRg0EigAgwEsCHIRz0FNUy6Y6o2SwEENAsUoNHEGAT5cErjv3ajz66jzeNx5/I6qsV6scPDLqrUaUrgEvgI2ECNA9Eais9VEfRFqYKlzZIxriXFisRSRSgaEbOKasAacBzc3VqOPk4rw9Y/hmumOKzg2ScEQ5FjntKGnKL8es12yv+KOjnv2Rmq8StGvgJgwhqaKrUBkQto+wIX9RK5eTu6R5fJ03CU8bqrjL0xrI0lOqxV+NGotOCpWAlkCqF/IQfQNUVTwE7gSO0DK/Hg01hUrCVKe4x9Xpg0eVCSgnbVSgIaEaGAUqKpGAW+AhyYM0nGJF/BofAc3L2ajj5CwrMYVTiZrpjjpriOg+ihfBEbaIfjBVRO6CUdhPoW0BqEMKndYzonHqucVv1G0fRj6tw+o6ZWhGmkCyKlYQaAeyhJABBBoBSqBpwHPyaM0kqjU1WIN1Wp10YikI6QyNGqLDCjUDwAWQTkQASt2VimqKe3VVQ/JXP66I6MusTr3Vn6e2CpTozWgQJAYCK1RuHjRWsCM6M1pFT5MWOe+JtvOaErcMjcGEaUqNw0IpgYUBGAAJYSpxrTj9a+KV0MO5OTqrOnNHZXGddNMR2gWRaFdEitBpQUABBgZQRSyIhy5JGNBfqsZ1xzcmNx5tL/S9IZ07+DjqjGHoGQLYCSqUsjJqihw6Jk3INVqoRSBoJBORmmFNAqkYBLiOXk7K5XqvCjeVrK0FUUbYCNhmo2ajlpz8vaG48u+urh/bhjXXq8X+VJR2oejP1bjRsb4DnvqudNxo1F56jSPojopgpeQEbDNQ5MajlstFYy6a9UdoX1D6pRG4tGCtIpQEGkCWBDkHPTcehl0R1HQlhCCGgVWg0b0QY+4E5cEriv3ajz66jzefy3Hn8jqqxXryeGXRWo0rGAS4ISIEaB6I1FZ6qI+iLUwVLm9GNcS4sViKWGiwBoRo4p4wB8Bzc+S1HHfFeHpH8M3reOKzg2ScBDkWOe041pyi3HrNdsr/AIo6Oe/YZqvGNGvgJgwhqCq1AyhL4gjf0Zrk5O7eXl8nTcJTxuquMvTGsipTqs1fiRqLT1VU7IJ2QKoH5QIIGqKfwE7ASO0DK/Hg01hU7IlR/NWPq9Bo8qpJQTtolBUNCKaAPUVSMULbEEOQSk49GY6IwbHxUcvL2WOPkKrMHwVTiZrpjjpjEdG9FCwiNtEPxgt4ondBGO4n1raFaosN4BLrGdJ8eq5xW+DaPowvwo6ZVhGmkUsglYQ1AhrKEkAEEBgD1QNOKIciM1OVRqa0xB5BanXRiKQjpDI0aosMKNQUgC2BOUQASt2VimqKe2KqP5K5/V46MusTr3Gfp7YqpTozWgRpAYFilUaPUVrYCNtGawqd8WOe+J+tvOaErcMjYwjSlRuHhFEVgaRAAAJYSpxrTj9a+KV0MO5OTqrOnNXsrjOummI7wLIUKiRag0cUAYAAQZFLKohy5JGNBfFjOuObkxuPPp0fS9IZ07eHjqhh6GkCyBbKlJIyMCjw6GRuLWoixQUJBO2jNNApqiqVwQl8CuXk7K5a6rwo3laytBXUUbYCNhmo31qOWnPy9objy766uHpDGuvV4v8AKko7B6MrcaOg3wRz31XOm49RqLz1GkY0R0ceCl5BEbCVHkajlslFYy6a9UdoX0PqlGWovGDQSKAMDSBJBDlHPTcehl0R1HQlhCCGgVWo0b0QYgCcmCOK/dqPPrqXN5/LccPI6asV6snhl0VqNKwBOQEZELAHojUVnqoj6ItTBUubBnSXFiucUsNFgIeEah/BT1AZwHNz9Zajj5OKcPWP4ZreOKzg6EkRDlWOe041pyi3HrNdsr/ijo579hKrximvgJgwhqCq1A0qEtiCN/RmuTk7N5eXydNwlPG6q4y9UayCfqs1fiRqKziqnZFTsiABfyVB9FNAHjATsBI7QIvQaGwJWEqP5jC9Bs8qhJRU7CUFQ0IpgPUVSMULZBHkEqfHokdEYND4o5uXsscfIWFYjCqcTNdccdNcRtvRQuIjbRD0BbxRO+IqUdoGfoWBqinFTurGk6arnFr9RtD0YX4fUdMqo00ilkE7CDQDWAkgyowDAHqB5wHPyaiaTlWWpqswbqVOoxFIR1hkU1RYYUagpAFsgnIAInbsrNGoHt1VUfyVz+r16MusTr3kZ+ntiqlIzWgSBOgaBYpGI1D1wVrCo20YrCkvixz3xL1t5zQlbhkbFGlKjcPCNCDA0gAgSBLCVONacvrXxUroYdycuLGdOavZXGddVMR3hbagFdEi1EbOoAMDCsDIBIIcuLHPRb4sTXHPyY3Hm0v9L0hnTt4OOqrD0DIFkCWEJKoMAPDoZG41WqhFBQmAJOiUY0DVFUjAJfBK5eTsrleq8KOmVrDTVAbYCFhmo31qOWnPy9objy766+HpDGuvX4v8nlHUPRPq1EbNfBHNfRzp+PRqLT1GkY0R0UwUvJgI2GajyNRy2Smqxl1U6su0J6H1Smo3F4waAAARQEJIIcoxpuPQy6Y6jadhCCGqLFajQgaBCcuCVxX7tR59dS5vP5bjh5HVVivVk8MuilBpWMAnICNkQsKHojUVnqoj6ItTBUubJGNJcWKxFLDRYA9Uah4wU9RRnBHNz5LUcfJxXh6x/DN66Y4pODZJwEeVY5bSjWnKLces12y6J6o6Oa/ZEV48gaPfFEpEYDVBWoGnFC3xBC/olcnL2by8vk6bhKnjdVcZeqNZFT9Vir8SNxWcUTsip2QCRC/kqD6KaAP4KncQkdoEXoNDYErCVL8xn6vQaNKoSdRSWEoCGgUY0U9QVqoW+IIcglJx6JF4waHwHNy9mo4+QkKxBFU4ma6446YRsfRQuIjbRDUFW8VE7YipR3GfoW0VqhDip3IzpPj7NOcWv1GkPRhfh2UdMqo0MikkE7iUeMDWUJIMIwDAKVFNOA5+TUZpJVkKarMHkUqdRiKQjrDIpqjRwaoKQBbIEkCiJ27KzTVA9uqqh+Q53q9eqOsTr3GfqlsVUZGa0A0iDAsUjEaUgULCo20ZoyCd8WOe+JetvOaEbhkbGEaUqNw6NDACASACBIEsJU41py+jfFSrsO5eXFZ05a9lcZ11UxHeFtqAV0SLUGzgANIMKwMgEqIcuSRz0HJixNcc3JjcebS/0vSGdO3g46qsPSIhZAltEJKpRgB4dkMjyaNVqoRSBWkE50SjGgaoqkAW+COTk7K5XqvCjplaw01QG2AhYZqV9ajlpzcvaG48u+uvh6Qxrr1+L/J5R1aNEWojbXwRz31WKfjRqLT1FRjRHRx4KXkBGwzUeRqOWyceqzl006supfQUpqNxeMGgAAEUJEJYEOUY0PHoZdEdRtOwEGTVFitRoQGBA5eojhv3ajhrqXN5/LcefyddVWK9eTwy2pQaVjAJyAjKJSwoemo1Fp6qqM6Mq0wVLnwZ1xLixXOKWFLAsPCNRQU0CjOCObnyWo4+TivD1j+Ga6Y4rbBtOcBHkWOW0oacotx6zXbK89UdEL9kSq8eDQ3xRORGA1QVroHUJfEEL+olcnL2by8vk6fhWp43TGMvVGtiKn6MVfiG1ZxROWVJIhZAv5Kg+imjQP4CdwJHaBF6DQ2BKyJUvzVn6vTBo0qEnUCWEoCGgUfRT1BWMULfEEeQSpU0SOiMGh8Bzc3ZqOPkJCsQRVOJmuuOOmMRsY0UL4IjbQNTwFvFROyKlHcZC2itUDikuM1OnZpzit+o0j6MfVuFl1ytA00gWQSuJR4xT2BORGBhBhVUqgacUc/IjNJOKyFNVmG5FKnUYh6o6wyNGqLDIoxqoeACyBJAsiJ27KzTVA9uqqhPZXO9Xr0ZdYSvcZ+muqpSM1oBpEGBYpCNHgVrCo20ZognfFjnviXrbzmhHSGhGxhFUqNw8I0ICASACBIFsJUo1pyvRvipV2HcnLis6c1eyuU66qYy7Qt9AKiRaqNmUYGQZVZBgCQQ5clY564HJixNcc3JjUebS/0v7cJp28HHVGMPSIFkQltELOqjQBuHZFy19Ra1QikCtYE50SjAGqKpAFvglcnJ2VyvVuFHTK1hoIAbYCFhKlfWo46c3L2huPLvrr4v24Y116/F/k8surRqotTEba4jnvoxT8Y1F56jSHoy6OPBS3BGRKjyNRx2Tj1WMuqmMu8J6J9UpqNxeMGgBgYUJAthHPyjGh49DLo8GyWBMZNUVWqNGUEQnJ1BxX/cajz66ly7X+W48/k66oc69eTwjalRpWMAlxUZRKAhqaNRa3UVGdEW4+qiPPgzpPhxXOHuNFgIeEaURo0fZQbYI5ufqscfJxXi6x/CV1xxW2DRJBDlWOe0oacYtxs12yv4johfsiK8eK0N8BORBAagtUDKEughf1Erl5ezeXl8vTcK08bpjGXpjWRU/VYq/FiNxWeqicsqSwFnRC/kqGFGAU8FTuInHYReo0NgSuiVL81ZXpg0aVCygnYQFQ0Ipo0U1dBWFAsioXwZqVNEjprg03gObm1qOPkLCsRpwVXiZrrjjprg23qKF1qI21A1AW8UJfEEY7DIW0VoA4pLjNTp2ac4rfqNIRox9X4dR1ysjTSBZBK4lHjFPYE5EYGVBhBSqqacQQ5NGanOKy1NVkeRSp1GIeqOsMjRqiwyKNdEUhVLdEIBZETtqs01RTziiE9lc71evRl1hK95E+nuojIzWgGkQaosVgbPAoWBK2jNaQTvixjfEvW3mNCVuGR0GEaUqNQ8I0ICASDCBIEsJUo1pyvRvipeOhh3T5cVnTnr2VynXTTEdoW+oBXRItVGzKCAIrKMgwBIIcuLHPQcmLE1xzXxuPNpf6X9uGdO3g46qsPSIBIEtohJ1WWgDcPouWvqLWqEUFCwEnRKMAaoqkYBb4I5OTsrlercSOmVpGggBtgI30So31qOOnNy9objy766+L9uGNdevxf5Ojq0aJFuPEbHkEc9tGKbjGovPUaR9GV+PBQsCEiVHkxqOOyceqxl1Uxl3hPRFKI3F4waD0GBhWkQlgc/KMaHj0Muj8RslgTGT10aitcFEGAvJglcV/3Go8+up8m1/mG48/k66audevJ4R0VoKrGAnyAjKACHpo1FbdRUZ0RanVRHmwZ0nw4rnD3GggWGqixSEaNCg2wRzc/VqOPk4tw9Y/hl1zxSw0SQQ5VjntKNacVuNmu2V/EdEL9kRXjyFaNfASkQQNUFagZQl0EL+olcvL2by8vl6bhWnjdNcZemBZFJ6M1fiwais9VE5xlSSBZEL+Sp9MKaAPGCp3BOO0DLopg0NgRuhUvzVhemDR5UJKCciUBDQKYU9dBSFAsioXRKlTsrEdNcGxnAcvN2ajj5SxisRpFV4ma6546a4Nj6KW2IiM6B6AtGKid0VGO4y06KEBDikuM1OnZpznVb9RpGNGPq3Cy65WGmkCyCVhKPGKewJyIwMqDCKpUDeKIciM1OcVGpqsDyKVOoxFIZdYI0aosMimrqhxAsipyIEiJW7KzTVFPbqohPYYvV69EdISveRn6e+KqUjNCAjCGqixSo2eBWkEbaM1gTvixjXEm3mPCOkGEbgwjSlUah4GhAQaQAQJAlhKlGtOV6N8UroYdk+XFZ1xz17K5TrppiO0LbUKFRItVG4aFBBhQBkGAJwEOXFjGg5MWJrjmvjceXS/0v7cM6dvBx1RjD0j4ASBLCUkqy0Cm4fQy19RaNQhxWkVOdGRgDV0VSALfBK5OTsrlercSOmVpGmgGnARvozUbtRy05uXtDceXfXXxftwxrr1+L/J0dWjRItx4jbXEQt2GKbjGotPUaS9GV6YKFwRt6JUeRY5bT49arGXVTGXaE9BWmo1F4waLIMDCsBLCOfkGNG4xcuiOo0nYExk9dGorXBTAwF5OolcN/3Go8+up8m1/mG48++x01c69eTwjorQVWuATkFRlEKIemjcWt1UQnURbjxRLnGdJcOKxD20UIRT1GoeMhFNCg2wRzc+NRx8nFuHIZrrnilhokgjyLHPaUNOSvHrNdcOj8UdHPfsiK8eQNGviiciMBqoK1UMoW6Dntsojl5e0N5eby9NwrU8bprjL0wLIpPRl0ceDUUnFE5xlSSASIT8oVDCmgU8YCdwT/ACgZdFMGhsCV0Kj+asL0GjyoSUE5EoCHgaGAPXRVYxULZFQuJUq9hmOmuDQzijl5uyxx8hYVmNIK8TNds8dNcGxAt0RG2gemAtEfZUTuiox3EaQaAMKSwzU6dmnOdVv1GkY0Z+rcKOmVkaaQLIJ3EbjFPYCSIACDQCtQN4o5+XUSpzistTVYHkCp1VmKQy6QRo9MFhkUaqKQIWyKnIgSIlbVZpqinnqqoT2HO9Xr0R0hK9xPp7qJSM0IBpENVGopA0eBWkEbDNaQTvixjXEm3nPCNwYRsyNHqNQ8I0YGBpAEAlUJYRKOzTlejfFK6GHdPlxWNOevZXKddNMZdoWwrVGYrVGzQDCsDAwMBZBHlxYxpuTFia45b5LceXS/037cM6d/D/l1RjD0CAeAS2iUkqyMCm4fQyF9RaNRYcVrYCfoyMCmqCsYBLiVycnZXK9W4kdMrSNNArTgI3GajdqOOnNy9objy766+L9uGNdevxf5Ojq0ahF6YNNcSue3YYp+Mai09RpH0RemChcRG3oiPIsctp8etVjLqpjLtCzoKU1GotGDTAHoo+AEgSyI5+TVY0bjFjojqNJ3wKmMnro1FaimBgLyYJXDf9xqPPrpL9q/zDUcN9joqxXqyeEdFKirRgE5BUJRAEPTRtW2KIzqItx4qpc4xpLhxWIe4oQiw8DR4RTV+6gzH2Erm5slY4+Ti3F1hK644pYaJOAjyrHPSTTkrxbDNdcOn8UdHNfuiVXjVo1wTkGENXEFa4sDKFulHPbZRHLzdoby83l6bhWp43TVl6YFkUnozXRxDSsqJSypJ0AkC/lCsiKaBTxgJ3BP8oGXRTBobCpXRKj+asOimDRpUJKCdtEoCHgaGAPXQVjFC2RUbolRr2VmOmuDQzijl5u0LHHyFhWY04CvEzXbPHTXBsQLZBG2iHpgLRionyIqX5CBINAQwpLiVOnZpynVb9RtGNGPq3Cy6ZWGmkCyCdwrcYHsBJEABAYBSANOKOflRmknFQKarA8ilTqMxSGXSCNHoLDIo1UUgQt0E5AJETtqs0aiqT1VXPPYc71evRHSEr3E+nviiUjNCAjSIaqNRSBo0CjOAjYZrAS+LGNcRbec8I3DI3BRo1RqKQjRgYGkAAJEJYRP8mnO9a+KldDDuny4rOnPXsrjOummMu8LYK1dEitUaMAigDAwMBZBHkxYxpuRYmuOW+S3Hl0v9N+3DOuu/h/y6q4w9AyAAS2iElWaMCm4fQyF9Ra1Qig0EgT0ZGBT10FIwCcgjkv2VyvVuJHXK0itAozgIXGajdqOOnNy9objy766+L9uGNdevxf5Oy6tGhF6YNNcHPbsOd6fiGotbqNI+iLUwVriI2EqPIsctp01pzy6qdWXeFnsClNRqLxg0UG9FaQaQTsiIcmrGNG4xY6PBpO4VMQ9dFi0YKMA3oF5MEcXJ+41Hn11O/av8w1HDfY6KsV68nhG1KCrVwCcgqMohQPTRqK26gjOiLUxVS5/RjSXDisRSwpYRYeBpSBTVBrA5ubrKxx3xbixHTPD2GizgI8mLHPSTTkrxs12w6fxRtzX7olW4xobqJyDCGjBVa4IZQt0o57eolcvN2hvLzeXpuFanjdNWHpgWFL6Mr8Y0rOKqUshZAsgX8lQQNAp4wE7gn+UDLopg0NsFSuiVL81YXoNGlQkoJ2EoCHgaED1FVjFQLIqF0Sox2VmOmuDQzijl5+0LHHyFjFYjTgqvEzXbLprg2MAWwJW1EPQFYxRPkQR/IRpBoAwpbiVKndpynVr9RtCNGPq/Cy6ZVGhlQsoJXAeMD2BORAgBAYBSoG8Uc/IiUk4rIU1WB5FWp1GIpCOkFGj00WGRTQB4ULYE5RAkE76rFGop7dVVCew51evRHSEr3E+nviiUjNaAgAaqLFIGjwK0gjYZrAS+LGNcRbec8I3DI6CimqNRSEaMDAwBCASqEsCf5NRyvWvipXQw7p8uKxpz17K5TrppjLtC2FrV0SK1Ro6jCsgwMoCBZBLkVjQchDTlv63Hk0v9L+3Ca67+H/LqjGHoEGkEraJSyrNGBTcOSLngX1CtUIpGjQWAnoyMCnroKVAnIJXJfsrlercSOuVpwVoFG2AhcZqN2o46c3J2huPLvrr4v24/hjXXr8X+TsurVCL0waa4Oe2jnT8Q3FrdRUY0RagrXwRGwlR5FjlpOmtMZdVOrLtCz2BSmo1F4waKDeisDTgEsiOfk1WNG49Fjo8Gk7hSCGrosVgU3gDGgXlwRw8n7jUefXU79q/zDUcd9jpqxXqyeEbPQVaMAlxUZRCgemjUWt1URnURXjxVS5/RjSfDisQ1hoIQh40aUhFNANbFK5ubrKxx3xbixHXPFLDRJxCo8jUc9JK4q8WpXbDp/FHRzX7oi3HiqNwTnUGVD16iqVwgaFQt0ohbZRK5ObtDeXm8vTcK1PG6a4w9MCwpfRl0ceDSk4qpSyFkCyBfyVDAMCqRgJ3BP0Rego2KqV0SpfmrC9Bo0qElBOwlADxgogpUVSFQLJVRuiVCOysx016jQzgOXm7NRx8pYViNOI0txM11y6Kq2MAFvQRtqIegKwqJ8iVUfyEaQaAN4KWwlSr3lpynVb9RtGNGJ1fh1l0iw00gWRUriDxgawEkQAEBgFIA04ohyIlTnFZCmqyPIpU6jEUhl0hho1RYYU0AaAa6CciFkE76rNGoKT1VXPPYc6vTqjpC17ifTXxVSkYrQEADVRYpA0eorTgI2GawEvixjXEW3nPCNwyOgwimqNRSEaNArCNIAgEqEsIn+TUcr1r4qV0MO6fLisaQr2VynXRTGXeBbQoVEitUaOoyKwMDAAoSIjyLGNByENOW+S6R5dL/TftVZ1128H+XVXGHoEGnATtohLKzRgU3Dki54F9Qo1Fh40UJAnoyMCnjQUjAJfBK5L9lcr1fiR1i04NBUBtgIXGajfGo46c3J2huPLvrr4v24/hi9evxf5OjqNdQi1MGmuDnto51TiG4rbBUo0RemEUt/REbCVLkxY56SprTnl1ceMu0LOgpTUai8YNAKACASBLIOfk1XPXTcYsdEYNp8glIIaosWqimUaALy4VHDyfuNRw30lu1f5ajhrsdFWK9WTwjZ6irQKTkBGUQvoKU0aitsURtqIrx4olz+jOk+HFYh7jRYQh40aPCKeNUawObmxqOO1+LGXXPDWGizgI8hHPSUtOK3F4ldsOj8UdHPfsiK8aqNwTnQZEPXBVK41A0CFsghb1EcvP2hvLzeX4PCtTxumuMPTAsKWNGXRxjak4onZkJIFkC/kIZVGAUjATuCX5QI6KYKNhUr4iVL81Z+r0wU0qEQTtolADwKIKUFUqoFkojdEqMdlZXphGjTgOXn2Go4+UsKxGGluLxiuueOiuK2IBZBG2iHoCsYoTkSiP5iNIBAG8FLYSpV7tOU6rfoNoxoxOr8Oo6RYaaQLKCdwbjA9gTkQAEBgFIFNOKiHIiVOcVkKarI8gVOqsRSGXSD4NHqLDIpoUNABcCSiFkE76rNGoKW6qqE6Od6vTqjpCR3kT6a+KqUjFCAjAaqLFYwaNGCtOAlYZoAS+SsZ1xFt5jwjcNCOkGEU0DUUhGjQAgEgwBIEsIl+TUcr1r4JeOhl3T5cVjSFeyuU66KYy7wLaFCokVqjR1GFZBgYGFLIiPJ5/KsaC4act/W48unR9L+1VNddvD/l01xh6DAE4CdtkQllSjAG4eoueBfUK1QikDQWAnoyMCngFIAnJglcl+yuV6vxI6xacGggBkEbjNQu1HHTm5O0Nx5d9dfF0hjXXr8X+To6jVCL0waC4Oe2jnVOIbituoqUaIvTBS3ERsIlyYsc9JU1pyy6uPGXeFnQUpqNxeJ+woAwrAE4BLIOfk1XOn4xqLxg0nyCUkCGpqLFoGjKgegHLgjh5P3Go4b6S3av8tRw12OirFerJ4Rs9RVail5ARtqIUFKaNRWcBG2iK8eKqXP6MaS4cViHsNNCLDRoqkIpoVWtgjm58WOO1+LEdc8NYaCyCPIsc9Iy041bi1K7YdH4o6Oe/dEV41UbgnKDKHqgpXFDQqFsioX1Erl5+0N5ebzfB4VrPjdNcYemBYUsaMujjG1JxROzISQLIF/IQyqMApGAncE/ygSr0wUbCpXREvzVlegppUJKBLaJSgeBTAegqlVAslEboIfkrH10UwbNOKjl59hY4+UtVYjSjS3GzXbPHRXFaEC2SiVtEPQFYxQnJiUR/IRpFCBDClsJUq92nL6rfqNoxoxOr8OsukWgaaQLIJ3BuMIewJyIwMBqgeAN4ohyIlTnFZCmqyPIFTqrEUqy6QRo9RYZFNAGhQLIEkQsgnfVZo1BSeqqhOjnV6dEdISO4l6a4qUqxQgI0gaqLFIwaPUVrYCVhmgBL5JGdcRdHmPCNw0I6QUU0I1FIGjQKIAIyBZULIiX5NRyvWvgldDLunyqxpCvaVc46KYy7QLaFCokVqjRxWBlGQYAFCREeTYVmhcTTmv63Hl0v9L+3VnXXbwf5dVcZegQCcBOwhbCVoxQ/D0FnC31CtUWKVFCwEjRBjQPGgpAE5MErkt2VyvV+JHWLTg0EANsBGwzUL+tRx05uTtDceXfXXxftwxrr1+L/ACdHUaoReuDQXBz20YqnENRW3UVKNEWrP2FLf5BKwlS5MWOWkqa05ZdXHjLvCz2kFKI3F4wUBW8BgCQJZBz31XOn4xqLxg0nyCUgh6aLFa4jRlQI0A5MEcPL+41HDfST2r/LUcNdjoqxXqyeEbUqKrUUlwRnUQsApTRqKzgI20FePFEuf0Y1xLixWIew01UWGjRVIRoyjWEc3Pixx2vxZCOs4e2laLZBG+rHPSNmnGq8Ws12w6fxHRz27IivEKN1E5BvQPVBSqhlQtsRUL6iVy8+w3l5vN8HhWs+N01xh6YFhSxoy6OPBtSVE7MhJAtgLPaFQwpoA8YCVwJ+Qi9BRsKldES/NWV6CjOKFlBO2iVgNApgPQVWqgWSiF0EfyVj6vTBo84o5OfYWOPlLVWIyNLcbLtl0VxWhAtgSsiHoCsKE5MlBH8hGkUIEMKWwlSju05fVb9RtGNGJ1fh1l1iwrSBZBO4NxhD2BORAAQNUDwB/FHPyIlTnFZCmqyPIFTqrEUqy6QRo9RYYU0AeAC+IJyIWQTvqs0agpPUVC2qxV6dEbhI7yJ9NdVSkZoQJBkKaqLFIwaNArWwErDNACXySM64jDo8x4RuGhHQYRTQjUUqNGFEGkARAlUJIJfk1HK9G+CV0Mu6XKrGkK9lc89dNMZdoW+hQqJFao0cUQBRkGFAAkRG+x/Ks0L4JpzX9bjy6X+l/bqzrrt4P8uqGXoEAkE5ELYStGKH4eiLOFtoUaiw8ChYCRohoA0ApGATkwSuS3ZXL6vxI6xacGmgGnARuM1C/rUctObk7Q3Hk3118X7cMXr1+L/J0dRqixeuChcHPbRiqcQ1FbdRUo7CLVFLZBKVRLkxY5aSprTnl1ceMu0CewHpqNxfwUBWAAYCWQc9+yudPxjUXjBpO4lIIeg1FYxFMqBGg3Jgjg5f3Go4b6We1f5ajjrsXqxXpyeEdD1BauCk5ARnUAEPQais4olbsgpx4olzejOuJcWK5w9hpqosNCKpA0ZRrCObnyVjjtfiyEdZw9tGi2QRvqxjSNmnGq8SV1w6fxR0c9+yIrxYRRuqpyiN6B64ClVDqEsghfUSuXn2G8vN5h4VrPjdFcYemNIpY0ZdHHg2pOKJ2ZUkiBIEnsIZVNAHgE7gn6IvQaGwJWRKl+as/V6CjZQqCdgoCHgU0CnoClVGtgIWZEZ7Kx9X48I0ecUcnPqxx8pKqxBGluNh2joritGAtsBGyIegKwoS+II/mI0igIYUthKlHdpy+q36jaMaMTq/DrLrFlVgLKCdwbjCHsCYgAIGqCkCm8VHPyIlT8VkKarI8ipSVKzD1R0gyjZ6hDijAHgAvhROUQsgnfVZo1BSeqqhPYc6vTojpCV7yH011KlKM0IVBA1UWKQNGgVpwErCVvBE75JGdcRh0eY8JW8mhHQYRTQNRSqNHFYQBWECQJYRL8mo53o3xWa6GHdLlVjSFdVznXTTGXaEtoUaiRSqNH8FEABoFYRhS2ESvsfyrNC4act/W48ml/pf2qprrt4f8uqrD0CASCdhCyqUPJBXi6QjU4S3YSjUU9RQtgEjRDQBoBSuCl5MGa47dlcvq/EjrFvBpoBrYCNxmoXajjpzX7Q6R5NddfF+3Dnrr2+L/J2XQa6LF64KFwc9tGKpxjUVt1FSjsIvXBSWQTsqI8mLHPSVNaco6uPGXaBPYD0RuL+CgKACASBLIOe+q51TjGovGDSV9EpBD1GopApxAjQa+COHl/cWOG+k/Kv8txx12L1Yr1ZPCNqQClcFLcEbagHoinGNRWcURt2QU48US5/RnSfFiucNYaaqLDRqNKVFMo0iVzc+SscfJx0cWQjtOGtopZxBK6saQs1HGq8SV1w6fxR0c9+yItxYrTXBOURgUqB4UNAFsCF9lErl59hvLzeYeFaz43RGMPTGsLSxoy6eMbPKicshJFCRCTsCGVRgFIBO+gn7Ai9BRsKlZEqX5qyvTBRsoWUCWCgIaBTQKegK1VAthVRsyIT2VhfjwbPOKjk51jl5SVVzgjS3Gw7R0VxWjAW+AjKIegKxihLoIx3EaRQjRDxgpbBUY7tOP1W/QbSjRidW4dll1i0KrIFkE7g3GB7YCYjAwGqKpAhvFHPyIlJ4IWmtMDyKlJUrMPVl1hho1QPCKMKHgAvgJogSCd1ZrVBScVULdhzq9OiOkJH7kh9NdRKRmhAggaqLFIGzQDSCVhK3ghL4RnSEOjzHhG4aGXSDApoRqKVGoYUQYARAkCSqJz2WOeutfFSujxl2S5VY0hXsrnnrprjLtC20K1AildRTwqigAMKwAASqJW2P5GaF/RNOW/rceXS/0v7VWdddvB/l1RjL0CASBLCEkQPJUV4+sI1CW7CUaingULASBDRoGgFIwUnJglclu6uX1fiR0i3g00aDWwEbjNQu1HLTmv3huPJrrr4v24Y117PF/k6Ohq6ixeuDRbiVC2jFPxDUVt1FSjsIvWPsKW8faQSsJUuTFjnpGmtOU66uPGXaBPYFKI3FowaAGBgACWxBz32Fc6pTwbi0YKnfQpBk9UaitRTKgRoDyYVHBy/uNRw30n51/lpxvYvVivVk8I2pAK1wUlwRtqACKcY1FPFErdkFKYolzZIzriXFiucPI01UWH9GlKooqNYRzc+S1HHycdHHjLtODZFCcBK6xjSF2o46V4krrh0/ijo576iK8eDQ3BP0RgUqB4UOoSyCF/USuXn2G8vN5h4VrPidEYw9MawpY0R08Y0eVE5ZUk6ASISe0KhoFNAHgE76Cfoi9Bo1gRsgl+asfV6YKNlCSgWwlADQKaBTV0FoUC2AjZkQnsrH1fjGjzijk59WOXlJVXOCjS3Gy7R0VxWhALAjOohqAtGKEugj+Yn1p0UI0DwBbBUfzacfqtuo38SjRmdW4dll0i0CsASCdwDjCHtgJiAAgaoKR4KbxUc/IiUggU1pgORUpajMPDLrDDRq6B4RRhQ8YAWwE0QsgS6s1q6Ck4qoW7DnV6dUdISO4fTXxRKRmgIIGqixSBo0CtbASsJW8EJfBnXEIdHmPCNw8I6RoRYaEailRqGFEGkAECUCSqJz2ajnrrXwS8dHjLsjyqxpGuq5zrprjLsWwVqhFK6inFEAkAFEGAsiJW2P5VmhfA05b+tx5NL/AEv7VWddd/B/l1RjLuIBYCWwCSMh5Ki3H1RqJ27CUaixSBQsBIEGANAqlcAnLgzXJburn9X4kdYv4KEaDTgI3GahdqOWnNfvDceTXXXxftwxrr1+L/J2XU1dFi9cGi3EQtoxT8Y1Fb9RUo0R0Vj7Cl5MBCwlT5FjnpGnZpxjq48R3gT2RT0RqL+CgKwMAAS+IOe/aFc71Sng3FowVO+hSDJ6o1FaqphAjQHkwqODm/cWOG+k/Ov8tuV7F6sV6cqQjZoFVrgFuCNtQCBFOPBqK+KI27IKUwEubJVnXEuLFc4eRpoRYeNRo9RT+qBOCVzc/WVjjvjo48ZdpwbChIJXVjSN2o46U4krr43T+KOjnvqJVuLCNNZROdRGgFK4KpCoKhbIIciJXLz+N5ebzcHhWs+J0RjD0xpFLGiOnjwaNIEnUUsgWRCTsCGhVNAHjATuCf5QIvQaNYEboiX5qyvQUbKElAsiABoFMKeugrCjWwohZkQt2Vj6tx4NKTiq5efY/lY4+ROqucFGluNl2joritGAl8BKUQ9AVjFC3QQ/MRraKECGgUthKl+bTn9Vt1Gko0YnVuLZZdYtCqwBKKncQvGEUsCYgQAgaoKVFN4qOfkRKQQKdmmA5FSlqMw8I6QyNmroQwpoA8YAWwE0QJBO6s1qgpOKqFuwxV6dUbhI7yH011KlIyAggaqNRSBo0A0gnZEoeKEvkkYqEOjzHhG4aEdIaEagwKpVGjCiDSAIgASVROeyxz11r9VZq/jLulyZKsaRrquc66a4y7Qlgo1CKVRo4CASDCsDAWQSt2j+VZoXwZ05b+tx5tL/AEv7UM667eD/AC6oxl3EAkCSBBkJyVKtTqjSduwlGosPUULAWBBjQNAqtQT5cGa5Ld1c/ro4kdYsKEA0gjcZqN2o5bct+8OkePXXXxdIc9dezxf5OjqauosXrg0W4iFhiqcY3FLYCUaI6KdVilviCNhEr4sc9I17NOUdXGy7QJ7CqURqLeCgK0gwNIJ2xBz27QrneqU8G4tGCp30KQZPRGorUUyoEdga+FHDzfuLHn8nSx3q25XsXqxXpyeEbNCKrXFC3BGfUABTjFV8URnsgpTAS5slWbxPixXOGto0MIsNGjSkIpo1QLCOfmxY474vxsu04NtVQQSurNRu1HDSnCldfHx0/ijo576iVXjxWhsgmIwKVwVSFQ0ASwIciJXLz5H8t5efzcHhWseJ0Qw9MaRQjRHRx4NGkE51FCQLIEntAyeFUYA8YCdxU/YGV6YNDYErIiX5qz9Xrg0MqhLIFkAgQ0Cw0CnoCsKNbAQtrIhburF6txjSk4quX6jYWOPl4nVXOG9RpXjZdo6K4saEAuURlEPQFaqFulEPzgT61tFAQ0ChYKj+bTjeq26DaUaMTq3DrLrFlUQKip3AOMSHsCYAIIGqKpVUNOAhyaiVNUCnaVYDkVKWokPCOkMimqLDijAHjAa2AkiBIJ3VmtUFJwVC3ZWKvTqjcJHcPprqJSMh6IIGqjUUgaNANOIJ2EoeAS+SrNQh0eU8JW4eEdIMI1BgVSqNGFEGAEQAJOqic9ljnrrX6qlX8ZdkuXFY1xKuq5zrorjLtCWCjUIpCNHAQAGFYGAtgSt2j+VZ+hcTTmvstx5drfS/tQzrrt4f8uqMZdxFCQJYQgyE4otTEaTt2EGosPH2FC4FjBBgDx4KeoE5cGa5bd1c/q/EjrFvBWAJwEbiVG7UcdOW/eG48euuzi6Qxrr2+L/JmXQ1dFi9Rot8EQsMKcejcUvgqUaI6KT9iBb4CMiJXxY56RrrTlOurjZdoE9hVKI1FvBoJBgYAkCXxCue3eFc71Sg3FowVO+hSDJ6I1FYFMqBGg18Bw837ixw8nSx3q243sXqxXpyeEbNCKrXIULcEbIAIpxjUVURnsgpTAS5slWdcT4sVzhpGhhFho1GlIFNCgWwSufmxY47dHHiO041kUATvis1DkajjpThSunj46fxR0c99RFePBobAmI3oKUFUjFQfFC2QQuiVzc+R/LeXn83G4VrHidEMPTAkVq9hHRx4Ro0iklAsgWRCT2ENCqaBTQBOTQT9gZXpg0NgTsgj+asL1wUZUJZAsgECGgU8CmqCsKNOAjbWRC3ZWb1XjGlJxRyfULHHy8JVXOG9RpXjZdo6KYRoVC3QSnRDVBaMUJdBL/uQJ9a2ilA0AEhUvzacr1S3UaSrozOrcWsukWhVGQLKKncA49EPYEwYQQGBVK6BpxUQ5dQqYyFezTAcipS1Eh4ZdIYaNQIZFNAHjFAtgJogSCd1ZrVBSeqqhbsMVenVG4SvcPprqVKRmh6IIGqixSBswNOIqdhmh4qEvkiVCHR5TwjcPCOowiwY0VSqNGFEGBhAAkiJT2WOeujfqqVbxl2S5cWMaSr2VznXRXGXaFsFHjj5kIpCNGAQCQYVgYC2BKe8fyrP0LjNc3Jstx5trfS/tQzrrt4P8uquMu4ihIhLASRAlWVqdUbTnRKMCngULAWMEGNA8CngCcuCVyz3Vy+r8WI6xYVgC2AjcSo3xqOOnLfvDpHj112cfSP4c717fF/kzLoaujUXjALfAQsMqcejUUvgJRojopgpbgjOiJXxY56Rr2acZ108eMu8aewv1TjRqLeCgKwMASKS6I57d1c71SmjcWjqKnfQpRDVRYrUUyoHoNbAcPP+5Cxw8nSx3htxvYvVivTDwjcNCKrXFC3RUrCFEU48GlPBUp0RSmAlzZKs64nw4rnk1tGhhGoaEVSBRUCwlQ5sWOO3Rxsu841lAnEE7qzUORqOGlOHErp4+On8EdXPfUSq8eDTWAgjRoKUFUhUHxQtsQRuiVy8+R/LeevP5uNwrWPE6IYekJFavYR0ceEaNbBSSgWQLIhJ7CGgU0Kp4gRPkBP0Reg0NsBO2II/mrH1euDQyqFlFJIyEAaBTimgFKqNIJW1kQv2Vm9U4xqKzgOX6hqOPl4nVXPJvUaV42XeOiuCioW6UTkQaAtXFCXQS/7kCNfRSwBoFCwlSnurleqW6K0lXRmdW4tZdIsqjIFlFTuAceiQ9gTAPRDAMCqVA04ohy6iVMZCvZqMfQ5FTRaiQ8MukN4NGqEMimqB4Ua2AkiACd1ZrVCKW6qqFtGKvx9UbhI/cD6bkUqUjLCMBqosUgbOASKnZGaHihL5IzUYdHl+mhHSHjGXSDAsGNFUhGjwKwNOAyBRCzoiU9mo566Nuqosy7JcnqsaSpqsTrorjLtCWEp+OfgD1RowoiBIMKwMBZBKe8Kz9C4mnNya3Hl2t9L+1DOuu3g/wAuqrL0CAWAk4ISRAVFqYjadtkSjAHgULAWMEGAPAqkAny4JXLPdXL6vxYjrFowVgC2AjcSo3ajjpy37w3Hj112cXSP4YvXt8X+YZHQ1dRqL1FLcRGwyfi0ail+oqUaI6KYBbghPoid8WOeka9mnKddXHjLtGnsL9PRG4v4KUGBgYVO6I57d1c/qlNRuLx1VUr6FKIeqKpXBTKB6INsBw8/eFjh5OkjvDbjexerFenJ4Rs8IqkYoW6KlYQoKceCqeCpT2EVpgI8+DOuJ8WNOcNOo0MDUNGoqkCjABZUqHNixx26OPGXeNYAkCXyVZqHI1HHZuHE034uOr8EdnPbURXjwVrAQRo0FKCqQqDGAW2FEbolcv1Gf8tZefzcbhxqseJ0Qw9UCQavYT66ePCNDIpJQJIBIEnRk0CmjVU8CJ3FT9GV6DQ2BO2II/mrH10VwaC2gEgSRkIA0DRwNAqlVRrYCVtZEL9lZqnGLFJwVzfUNRx8vE64rnk3qNK8bLtHRXBoVC3QTkQaAtXFC3SiP5wI19FCANAoWEqNu6uV6pborSVdGZ1bi1l0i0KoyBUUlwLTRIewJzojegIDAqlQPOKOfl1EqYyFezUZ+hyKzotRMnhHSGRo1RYaUDVA8KNbASQARO4laqkUnAQtqsVenVG4WO4fR5AqUqzWEYU1UWKQNHBpBKyJQ8AlslWajDo8poR0h4xl0gxosGNRo8aKeBRBpwG8AqIWdUqVuyxy10bdWkWYdkuRYxpKuqxHRXGXaFtolGgRSqNGBgYGFYGAsglPeFZ+hcTTm5Nbjy7W+l/ahnXXbwf5dVcZdxFCQJIhJED/AEVFq9UbTnRkaiw8ChcCxggwB4FUgE+USuWe6uX10ceI6xWBWAJwEbiVG7UcdOW/aG48euuzj6Qxrr2+L/JmXQ9dGorGCluIlYZPxaNRS/UVKNEdFcAt8BCRE74rnpGvZpynXVxYy7Rp7C/T0RuL+ClnQacBhQkCXRHPburneqUG4tGDSdhKUQ9UVSuKppED0UbYI4fqO8LHDydJHeG3G9i9WK9OTwjZoRVYxQtxUpRCgpx4Kp4KlOiK1wEefBnSfFjTnDSNDVGoaNRo8AdQthKhyrHLbo48ZdmsKAhLqlQ5Go4bNwdU034uOr8UdUL6gpx9RWsBBGgFKiqRioPgFtgI3RK5fqM/5az15/NxuFqseJ0Qw9MCRWrojp48I2ayonZlSSASBLdhk0Kpo0U8AncE/Rmr0waGwJ2QS/NWPq9cGgtogSKSRAEPA0Ip6iKVUG2AjZlUL9lYqnGLFfBXL9S1HHy8TriueTeo0tRl3i9cFFQtsQTkBoItEfZQt0VH84GWuKEAaMFCwiNu8K5XqluitJV1GZ1bi1HSLKogVFJcC00SHtgJyDCCKMApUDzijn5dRKmIFe0tRi9DkVmlrhUh4ZdIYaNUU0gaqB4UC2AmgAid1StUIpPVRC2jFX4+qNwsdw+jyBUpGWVGFNVFikDRxWkErIzQ8AtslWa54dHlPCOkPGMukGNFg+iqQjRoFEGnAZABCToJW7NRz10bdVZq3jLslyKxpKmqxnrorjLtC20StUIrVGjAIBIrAwMBbAl+cKz9C4lc3Jrcebav0v7UM666+D/LrrjLuIoAWwiciB/oqLV6o2nOiUahDxgpbAHggwB40VSAT5cErknurl9dPHiOsUgUQCcBK4lQvjUcdOW/aHSPHrrs4+kOeuvb4v8AJmXQ9NGotGCkvgiVhlTiGoe+CpRojor1IFuCM6IlfFc9JR2acp10cbLtBnsKeiNxbwUPQaQYUJAl0Rzz3Vz+qU0bi0YNJ30SlEPVFilRTKB6Ia2A4PqO8LHDydJHeG3H7F6sV6cnhGzQiq1xQt8FSlEKClMFUnFVKdRFa4CPNgzrifFjTnDSjQ1GoeEaPAGULYSo8v3+FjltejLs11AQJdUqHJjUcNm4Oqab8XHV+KOqF+yCnHgrXwCCDAHpgqkKgxihbII3RK5efP8AlrPXDzcbharn4nRDD1QJBq6EdPHhGjTgJygSQCQJbtAzTKpo8FOCdwTnRmr0waNbASsgl+asfV6jQWECRSTogCGgaN4KeoKV1UG2AlZlXPydoViqcY1FPAc31GNRx8vE6Yrnk3qNRbjZd4tXBTKFsgnIDQRaMULdKI/nAjXFCANAoWEqNu8K53qk9FVKujM6txay6RaFUQKikuBaaB7YInIMIPgowClVDzgOfl1EqYgV7S1GPoXVnRalSHhl0hho1RTSA1QUjFGtgJSgAJ3Ga1FIpbqCFtVir8fVG4WO4fR5MFqUqwwjCmqixSBo4NIJW9QDxULbBmueHR5TwjpD+MugxosH0aUhFh4FYGkGQCRCTqiVuyxz10bdVZq3jLsjyYsY0nXVYnXRXGXaFtolaoRWqNGAQCRWBgYCyCf/AHIVn6W4mnNya3Hl2t9L+1DOnbwf5dVWXoEAAlhCTolD/RUXr1RtKdEGoQ8CluFbwGgQ9dFUgE+XBK5J7q5fXTx4jrFYFYAnASuJUL5LUcdOW/eHSPHrrs4ukOd69vi/zDMuh6aNRaMFLfBEbaMqcQ1D3wVKNEdFcAt8BGdESvixjSUdmnGddPFjLtGnsKeiNxfwUvoNIrACBOQRzz2Vj6pQai3g0nbRKUQ9UWKVFN8qAAzgjh+o7wscPISO8NuP2L1Yr1ZPCNmhBWMULdFSkQvgKUwWKT1FSnRFa4CPNkjOk+LGmIaUUajUPCNHjQNChZEQ5NhY5adHHjLs1wAC3VKhy5LUcd8Hg6pprxcdX4o6oX7IKceCtbJAggwB64KpCg/IgXBC6JXLz9f+Ws9cPN/luFqufidEMPVAkGroOnjwjRrYCcoFkCgS3aBmmVTQKcE7gnOjNXpg0M4CdkKl+asfV64NBdUBFJIgeiHgUYFPUVSNVBnJBKzKufk1WKfjFivgrm+pxrLj5eJ0xXLJvUbi1GXeL1wUVC2QTkBoItGKF5Eqo/nAyNhSwENAoWERt2hXPXVJ6KqVdGZ1bi1l0i0K0IhZRSXwCU0RSwJgwgimgFKqGkHPy6iUgha9pajF6F8VmhUSGhHSGRo1dFNIGqB4wGtgJSgAid1StQIpbqCFuysVfj6o3Cx3D6N8CpSrLCMKaqLFYGjCtIJW9RA8VC2wZqEa6PL9NCOkP4y6DGimRo1RYeBTAEgyASBJ1USt2WOeujbqrN4t4y7I8mKxpOuqxOuiuMu0LbRK1QitUaMKIBIMDAwFsCf/AHIVn6W5E05+RuPNtX6X9qGdddfB/l1VZegQacAlhE50QI0RavUbTnRBgDwKWwVvAaNEPAqkAnyiVyz3Vy+ujjxHWKCiASCVxKhfJajjpy27w3Hj112cfSGNde3xf5My6Hpo1FowUvIJUbaMqcQ1D8mCpRojophAt8BC2iEvixjSMdmnH66ONl2gz2FPRG4t4KHoMKwAgTkEQnsrH09BqLeDSdtEKIeqNKVwBUaNAZwRxfU9oXLh5E47w24/V6sV6sqQjcNCCkYoW+CpSiF8BSgsU8FS9EUrgJc2DOk+LGnOGlGhgah4Ro8aBlC2EqHIsctOjjxl2a+AAEuqVHlyWo474PB1TTXi46vxR1QtqCnHgrXAggwB64KeqhhAtgIX9RK5efr/AMtZ64eX/LcONVz8Tohh6oEgNdEjo48I2awJziBJ0GBO3aFZpxTRgpgTuCcjNXpg0aQSsgl+asfV6jQXEKKWRKAh6jUEU9RFKqDbASughyaM0/GLFPBXL9TjUcfLwlMVyyb1G4tRl3i9cFMoSyCcgNBFoxQt0qo/nAyNsFLUIaMFCwI37Qrjrqk9FaSrpWZ1bi1l0i0DTKBKBLgSmiKWBMQAMKaAPVQ84Dn5NRKQQsdpajF6F8VmhUqZNCOkMjRq6KaQNVA8KBbATlABE7qlagkUt1GkJ1XOr8fVG4WO4fRvgVKdVmsIyKaosUgaPGCtIJW9RKHghbYrNc8OjzXp4RuHZdBgWG9Ro1RYpArAwN4AIEtqolfssc99G3VWVfGXZLkWMaTr2VjPXRXGXaFtolGoRSqNGAYAJFYGBgLYE/8AuQrP0vIJpz8jceban0v7cM6dPB/l1VZegwoSBbCJzogeqi0dUbT9EGAPApbBW8BvRD1FUgE+UZrlnurn9dHHiOsUFEUJESsJUORqOO3LbvDpHj112cfSHPXXt8f+TsuhqDS0YKS4iVtGVOIah74KlGiOimAW4I22RE74rGkY7NOP10cbLtBnsKeiNxbwUAYVgYE+REqE9lY+npqNRfxWkr6JSiHqjSlcAVG9AZwRxfU9o/lY4eVOveG3H/8AS9WK9UUhluGjQUhQt8FSlEL4ClMFU8FSnRFa4CPNkjOuJ8WNOcNOo2NRYeEaPXQMoWwlQ5Fjjt0ceI7xroABbqlQ5slqOO+DwdYTTXi46vxR1QtqCnHgrXAgg1A9cFUqqCoW2II3RK5efp/y1nrh5f8ALcONVz8Tohh6oEhRpoR0ceEaGwEnECToMCdu0DNOqjApwTuCcjNX48GjTgJWQSjurH1euDTWAkgWRKAh6jUMB6inhUGwJXZVDk1WKbjFivgrl+oxqOPl4SmK5Z4b1HSLUZdovXFUwEsgnYDUEWjFCXSqj+cDI2FLUIaBWsIhftCxz11SeiqlXSs56txay6RaFaEQsopLASnYSKWBMAEN4KMArUDTijn5NRKQQsdmoxelurNaokNDLpDDRqijKB6geFGtgJSgEiEuJQoqRScFQnsrF6vx9UbhY/cD6PICUqzWEYU0IsUqNHFaQTsiF8ELZWahGujzfTQjcOy6DAsMNGqingUQYGAJQJbVRK/ZY576NuqsqzjLslyKxpOnZWM9dFerLsS2iU1QilUaMDQK0gwMDAWwJx+4rP0OQTTm5G4821Ppf24/lnXXXwcddWXcRQkC2ETkQI0RaOsjafogwB4FLYG8Bo0Q9RTwBOXBK5Z7q5fXRx4jrFIFH4AJBK4lQ5Go47ctv3HSPHrrs4v24c717fF/kzLoeg1Fq4KS4iVtGVOIah74KlGiOivUC3BGdETtisVGOzTj9dHGy7QZ7DSlEaivgoA0gwrSCd0RCeysfVKaNRbwaSuJSiHhGlK4BlAAZwRxfU9oWOPlTr3hr44f/perNerKkI2auoKQoXkwEpQLIKUFU8FSnRFYwEeXJVnSfFiucNOo0MDUPXUaPAGULYSocixx26OPEd41kUBC2VKhy5Kxx3wfp+sGmvFx1fijqhbUFOPBWt6BPBBqB6+inqqHAtsBC6JXL9R1az1w8v8AluHGq5+J0Qw9MCRRpoR0ceEaGxQsoJyDAnbtAzTqpoFN4CdwTkZq3HkDUPIJXQSjurC9RprKElAsiAIeo1DCnqIeFBtgJXZVDk1WKbjFis4K5vqMay4+XidMWueTeo3FqMu0XrgplC2QSsBqAtGKhLoqM9oGRtgpagaBWkRC/aFjlrqn4KqVdKk6txay6RYUVCopLYBKdhFLYCYAIYU0ApVQ04Dn5NRKQQsdmoxelurFapSGhl0hho1RYMoHoB4Ua2AnKBZEJdUoUEik9VVCewxV6dUbhY7h9G4JSM1hGFNUWKVGjitIJ2RKXwQtlZqEa6PN9NCNw7LoMCww0aqKeBRAQBAJAkiJX7NRz10bdVZVnGXZK/qsaTp2WsZ66K9WXaEtolNUIpVGjeAwrSIHgogwFsCcfuKz9DkE05uTW4821fpf24/lnTp4OOqGXoHwUJAthE5EoQItHUbT9EGNA4pbBWBhD1FUgE+XBK5fzVy+ujjxHWKQKIBIJXEqHI1HHblt+46R49ddnF0hzvXt8X+Tsuh6DUVgUlxEp0ZU4hqHvgqUaI6KdQLYEbCJ2Viox2acfro49ZdoM9hVONG4r4KE6DAwNIqdxKhPaRhSmjUWnBpKwlKIeEaUrgGUD0Q04Dh+p7QscfKnXvDbhP8AS9WK9WVIZbNXQUhQt8FSnEQoilBpScFSnRFYwEeXJGdJ8WNOcNI0MI1D1Ro8AZQthKhyrHHbo48Zd2sAAWypUeXJWOW+N9P1g0eLjq/FHZC2oKceCtcCeCDAp6+geqwMqBbEohfUSubn6y1nrh5f8hw41XPxOiGHpjSK1NCOjjI0NyhZxBOdBpwE7doVmnGjQBvATsCciVbjwU8gldBKO6sL1waayhUCSIAHrgsMKeugeFQZBKyKhyaMU1BYr4K5vqcay4+XidMWuWTeo6RajLtF64KZQtkolYDceCLRihLoqP5QMjbBS1AwrSCF+0LHHXVJ6KqVdEnVuPWXSLKrACKS2ASnYSKWwEwAQ3gpoA9VDTgIciJSCFjssYvS3aYrVCGhHSGRo1RTSgagHhRpwE5QKIS4lCikUnqohPYYq/H1RuFjuH0bhUpVmsIwpqosUqNHFaQTsiUsYIWypUI10eW9NCNw/jLoMCwyNGqLDwKIMDIAISQSv2ajnprdVZWnGXZK+SsY1xOmlYy6Y6o7J20SmrgRSqNGBhW8EAUQYC2BOP3Bn6HJippzcmtx5tqfS/tx/Mpp08HHXDD0CKEgWwiciUI1UWjqjafoyMCngUtgaQaBD1FUgE+XBK5fzVy+ujjxHWKisASCVxKhyY1HHblt+46R49ddnF0hz117fF/mHZdT1FVjBSXESkRTiFh74KlGiOivUC3wEbCJ2xWKjHZpx+ujj1HWDPZG1KI1FhS+gwMDSKncSoT2kYUpo1FpwaStolKIeEaVriggwg+A4fqe0LHHyp17w38cJ/perFerKkI0aqKpCqW4JTiIWRFaDUPOKqXqIrGAjy+jN4nxY05w06NDCNQ9dRo8AZQthKhyrHLTopjLs1gYCWVKjy5Kxy3xvp+sGl8XHVPVHZG+oh+MVrgTwQageuinqqGnFC2xBG+olc31HSWs9cPL/kOHGq5+J0RjD1QJCjTQjo4yNDYCyCc6g0gnbtCs08DRoA3gJ3BORlbjwah5wErIVKO6sfXRXBprASQJIgAauCw4p66B4VBkE7Mq5+RWKagsU8Fc/wBTjWXHy8Tpi1yyb1HSdVr4y7R0VwUfVAsglYDceCKwoS6KlPaBkZFLAhhppEQvsLHLSn4KqVdKk6txay6RZVYARS2wE6dhFLAmIAG8FNUD1A04ohyIlIIWOzUYvS3VitUpDQy6Q0DRqiwZQNQFI+yjTgicopRCXwShRUik4qoT2GL1fj6o3Cx3D6NxalKsUEQVU1UWKRo0cVpETuhS+CFsqVD10eW9PCNw3jLoMCwYGj1RTiiDAwBKISQSv2ajnoZ6qyrOMuyV8lY51OmqzHTHVl2TtolNXAilEaMDA0ihGAwMAWBOO/8AwJ9DkxWdObk1uPNtT6X9uP5lNOng464xh6BFCQLYRORK0aqKx1RtP0ZGBTwKWwgyKECHqKeAJyjNcv5q5/XRx4jrFYFYAkEr4JUOTGo47ctv3HSPHrrs4ukOd69vi/zDsuh6jUVjBSXESkZV4hqGuKnGiL16gW/oIyInbJVio/m04/V+PUdcmnsjanGjUWFL6AgANOCp2RKhPaVYUpo1FpwaStohRD1FVrgogwg+A4fqu0LHHyp17w24T/ToqxXqyaEaPCKpChbipTiIWRFaDR5wE50FIwEeX1WbxPi6q5w06jQwNRSuo0aAMoWwlQ5N/wCVjlp0U6o7NZBgLZUqPLkrHLfA+n6waPDx1T1R2QtqCnGK19AnggwB4FPXVQyhbYgjfUSub6jrLWeuPl/yHDjVcvEvDD0xpFGmhHRQjQ2AsgnOoNIJ37wrNOKMCnjATvoJyM1bjyBqHnASshUo7qx9Xrg0MqElAkiAIauCw40euiHhQZwE7eorn5RimoLFJwVzfUY1lx8vCUxa5ZN6jpOq18Zdo6K4KKgSCVkKbj9EVjFCXRUp7QMtIoRoHFCREOTYWOWj/gqxOuiTq3FrLpFoVWAEUtsETp2BS2AmIwDGCmqB6KGnAQ5ESkkQsdmoxS3VitXEpDQOkNCKao0MoGoCkKNOAnKBRCXwShRUik4qoT2GL1emI3CR3D6bkCpSrNYRgNVGopXRo4NIJ3QpfBC2VKh66PLenhG4aMZdBgWDA0eqKoKwMDACISQSv2ajnpp6tMqzjDqlfFjGiU0rOXTGI7J20SmrgRSiNGBgacFABBgLYE47qz9C+BXNya3Hl2p9L+3H8ymnTwcdcMPQIoAWwiciVo1UVjqjafogxoHgUltENOCgIeBTwBOQSuX81cvro48R1isCsASCVxKhyY1HHfHLb9x0jx3rs4v24c9de3xf5hmXQ9RpaMFJYRKRlXiwahripxoi9eoFsCNhE7YrFR/Npx+r8eo65NOo2px6jUWFKDeA0A0gnbJQQ/KVYUpo1FpwaRtolAQ8IqlcVTCMA+A4vqu0Llx8qVe8NuE/0vVivVk8I0eEVSqhb4CdkCCK0GjzgJ+gpHVRHm9GanxdVc4aRo0ajUPXUaPACoWwlQ5N/wCVjlp0U6suzWBlC2EqPL1WOW+B9P0g0eHjqnqjshbUFOMVr6BPBBqB6inqqHULZBC+olc31HSWs9cfL/kOHGq4+J0RjD1wJAaaEdFCKNgLIqfqDAnbtCs04poFMCdwTkZq3Hg1DzgJWQSr3Vh0VwaacUJKCciMIaBo4p66B4VBnATsg5+UZ0NBYr4K5vqMay4eXhKYtc8m9R0itMZdo6K4qiASCVkQ3ECsKEuipT2EacAsaCgoSCPJqxy2b8FInXRJ1bj1l0iqqIAiltgJ17CKWxRP1BvRBA0CnooaQQ5ESkkQv5NRi9LZWK1cCGhHQ0aimqNDIGoCgNOAnKBRCXwShTVSKT1VUJ7Dner0xHSEjuH03IFSlWaAgimhFilRo4NIJ3AvghbCVD10eW9PCNw0MugwLBgU9UaP4KICAAEiFkEb6sc9tPVplWWHVO6xjSdNVnPXTGMuydtEpq4ixSopgYGkVgaQAAtgJx3Vn618CuXl1uPLtT6X9v8A5lNOng464xh6RABC2BORGjsC0dRpL0ZGBT+ClnQaQYQ0CqRgE5RK5fzVy+ujjR1igogEglcSocmNRx25bfuOkeO9dnH+3H8Oeuvb4v8AJ/WXU9RVYwCWBKdGVeLBqDcUkaIvXqBLglbRE7YrF4j+bTj9X4tR1yb1G1OPUaiwpZBgaAYE7ZKCHsqwpx6NRacFSsBRD1RVK4qmEABjAcf1XaFjh5Uq94bcZ/perFerKkI0eEU9cULcE5QJ6IrTBo84Cc6CkdVEeXJGdcT4uqucPI0NUah66jR40BULbBEOXY/lY5adFOqOzWQaMULfBKjy9ZWOe+B9N0g0nh46vxR2RvqCnGKFwJ4qDCClRTVVDqEsgjfURz/UdJanXHy/5Lw41XHxOiuMPVAnRRoEdFCKMilkE51AQTv2hWaYUY0U8YCdwTkZq3Hg1DzgJXQqVe6sfXRXBppxQkoJyIwh4GjAeoHhQZwonZBDlGa1MFivgrm+oxqOHl4SmK55N6jpFq4y7RemKpgLIJWRDcYKxihLoJT2BpwAjQPAoSIjyLHPZo6KROuiRbj1l0isCj4oCKW2CJ17ApbATnRA9AwGgU9NWBpwEOREpJwQv5NRzpbKzWrgQ0I6Q0IpqijKKagKQo04CdkCiEvglCmqkUnqqoT2GL1emI3CR3D6bkFqUqxWgRhTVRYpUaODSKnZEpYxULYSoetvLengbyaGXSDAsEU9UaP4KMAwMASISQSv2WOexnqrKksuqV1YpKdlrOeumMZdk7aJTVFilUU4MACgAyDAWQTjvP8ACpOtfBK5eVuPLtT6X9v/AJlNOng464xh6BFAQtgTkRo7Kk6r+KNpjIwKbwUJ0RpFYQ0aKrGAnyYJXL+auX10ceI6xQUQLIJ3EqHJjUcduW37jpHjvXZx9I/hzvXt8X+Twy6nqLFYwUlhE50ZU4sGoNxSRoi9eoFsCNtETtgxUfzbcb1fi1HXJp1G1ONGosKWQYG9AJAl8QqHsqwpx6NRacGkpELAh4RpSuKGAIEMDi+r7QuXHypV7w38cJ/perFenKkI2eEU8KFuCcoE9EVpg0fwE50FI6qI82SM64nxdVc4aRoao1FKo0eFBAthKhy7H8rHLXXRTqkdmsDeIFsqVHl6rHPfA+m6R/JpPDx1T1R2RvqCnGKFwJ4IMAeqqeBDqEsgjyaiOf6jpLWeuPl/yThxquPidFWHqjSLRoEdNMgaadELIpJ1BgSv2hWacUYFP4CdwTkZq3HkDUPOAldCpV7qwvUaaVCygnIjCGgah4A8eCqQqNOAndBDlwTTUCK+Cub6jGsuHl4SmLXPJvUdJ1ajLtF6YRTKFnUErCU3FgKwoS6CU6A+AWNA8ChIiPIsc9mjopE67Ik6txay6RWBRUBFLbATr2EUt1BORAA0CmgD1UNOAhyIlJIhfyajnS2VmtXCmTQy6DAp6jQoGoCkKNOAnKBRC2wSlpqpFJ6qqE9hzvV6dUdISO4fTXFqUjAQqCgaBqKVGjg0gnZCljFQthKh63HlvTwNw0MukEWDGinqjR4wUQYGAJRCSCV9ajntp6qypLLqndWKXj7FZz10R1R2TnRKauIsUgU4MAeCsDAwFsCcd5/hWZ1r4FcvNrUebyKfS/t/8yab8HHXGMPSIN4BLCEsJQjRFfxG0xkRTChOiDIoCGgVWuAnyDNcv5q5/XRxo6xQUQLIJ3EqHI1HHblt+46R4712cfSP4c717fH/AJPDLoeg0rGCktgic6IpxYKNxSRoi9eoFsCMiJ2wYqM923G9X4tR1yeeyVs/HqNRYUsgwN6DSCd8BD2RhTj0ais4NJyIX0Q8I0pXAMqAAxgOP6vtCxx8qVO8NuE/06KsV6cnhGzinjALYE5QJ6IrTBo84onOoKeKI82SM64nxdVc4ZGhgailUaPACoWRKhy9o/lY4666KdWXdrAEYAWVKjy9ZWOe+F+m6/8AJpPDx1z1R2RvqCnGKFwJCoMYgeop4VDqEsgjdEc/1HSWp1y8v+aTgarh4nRDD1RpFo8YR00IrSBZRU50BBK/aFZ+nFGNA4qdwTkZq3Fg1DyCV0KlXurDoqNBKoWUVOdEb0Q1Ro8AeoHUHwE7IIcuCabjEivg05vqMhqOHl4Si1zyb1HSdWoy7RauCmULKCdtEpuIFYUJdFS9EbwAjQPABII8ixz2aOikTrslSdW4tZdIqqiAIpbYCdewilsBOQCBDQBoFPUDWxRDkRKSRC/k1HOlsrFapVyZHQ0IsGo0ZA1AUhRpwE5QKIW2CUtNVIpOKqE9hzvV6YjpCR3D6a+C1KVc6EAIGhGlKjRwaRU7IlLGCFsqVCdbjy3p4G4aGXSCLBFPVGlBWBgYAlEJIJcmtRz209WmVJYdU74rFLx6VnLojEdk50SmqixSBTAIB4KwMDAWwJx3lWZ1rBXLzbLUebyKfS/t/wDMmm/Bx1xjD0DAoSBZEJYShGiRWeo2mMjApvBQnRBkUIENAqkYBOQZrl/NXOddHGjrFRQBpBK/olQ5Majhty2/cdI8l67OPpH8Od693j/zDwy2eg0rGAS2AnOjKnFg0PIKSNEXr1AlgSkRO2DFRnu043q/Fo65PbslbU4tRqKilnQEAnQaQTvgVD2Rg/Ho1FrYKkACHrqKpGKphAAYkHJ9ZsLHHy8Rp3b+OE/0vVivTlSEbOimqoFwTlAnoitRo8gT8gP4ojzZIxpPj6wrENKNDA1FKo0cBULIlQ5e0fyscduinVHcLINABZUqPL1lY574X6br/wAmk8PHXPVHZG2oKcYoXAkYIMAeoHhQ3ihbII31Ec/P0lqdcvJ/mk4Gq4eJ0Qw9UawtHjCOmhFaQLIpJ1BgSv2hWTwKaNA3gqdwTkZqvFgsUnBUrolSr3Vl0VwaCVQs4ipzojeiHgaNAHrop4VB8BO6CHLgzW4wing05+dqOHl4SmK55N6jpOrUZdovXBR9ULKCd9EPxeApChL6gl+QN4ARoGgVpER5Vjns0dFSJxshOrcXZl0iviqIAiltgJx2EUtgJiABoA0YKpVQbCIciFJOCF/JqOdJbVYo1wayZGjQjUGoo+inqCgNOAnKBfRC2wSkpqpFZxVQnsOd6vTqjpCR3D6a+CpSrnQAQNVGopUaPANIJ2CljBC2EqE7LceXXTwNw0I6CijGinqjUPAogIBIgSBZBK+rHPYT1aZUnGHROyxml49KmXR4jqnOiU1QisI0MAKjSAIrAwFkE47yrM61grm5mo83kN9L+3/zJprwcdkYw9IgAFkCWEoRqpFZ6I2mMiKYUJ2BBkUIENAqkATk9Ga5fzVznXRxo6xUUAawJXEqF8ajhtyz+46R5L12U6R/Dnevd4/8w8Muh6CqxgEsCc6Mq8eDTcgpI0RevUgS4JSIS2DFQt3bjjer8Wo6ZPbsldIpxI1FPBQBgaQCQJfAQ9kYU49GorODSUiBAh66KpGCmED0BgHJ9ZsfyscfLxGndv44Z/06KsV6smhGjinqAXFTlEJ6IrUaPKhPUB+fsCXLkqzonH1VzhkaGBpSqNHAVCzglQ5dj+Wo47dNOrLuFkGhQJ0So8vWVjnvhfpuv/JpPDx1fijsjbUFOPFULoEgQwGqoeAN4qFsio3REOfpP8NTrl5P81Phbrh4nRDnXqjSLTcehHRQVrAWRSTqDSolbtAycU0AYVOwJyMq8eCxScFSuiVKvdWXRXFaaRCeIpJ0QPRDwKaNFPAHhQfATugjy4JQ4xIp4NOfnajh5eEornk0ajpOrUZdYvTFaEAlBK+iG4QWj1RO+oJfkDSARoGgGkEeVY57NXopE66VJ1bi7MukVhVMBUC2wVOO4ilsBORAA0AaBVKqDYRDk1EpJwC/k1HOktqsUalahoRo0I1BjRR9FUqBoAZBOUC+iFtglJTVSKziqhPYc71enUdIWO6H0b4LUpVzoAIGhGlKjR4BpBOwhYwC2EqE63Hl108DeTQy6QYFgiqVRowogIgAEgSQSvqxz209WmVJYdKndYzS8WlTC/iOpJ0SmqEUjEaPAMo0gAMisASonHeRmdCwVzczUebyG+k/b/5NNeDjsjGHpGBQELOgnbRK1dVIrPRG0xkYFNApZ0Q0ihAhoFUgE+QZrm/JXP66ONHWKCsDSCV9GahdqOO3Lb9x0jyXrtp0j+HO9e7x/wCYaGWz1GlYwCWBOdGVaYNNcUkaIvXFgSyCUiEtisVCe7Tjer8Oo6ZPbsldIpxeo1FBQBgYGBO+BUPRhTj0ais4NJSIECHqKpAphAnQGNByfWeLHHy8Rp3b+OGf9L1Yr1RSEaMKeoBYE7IE/IRWo0ecUIgaMBHl6yrGuF4+qsQRoYRqKVRo4CqFkRHm2P5ajlt0U6su4WBowCzoiXL1lY574T6br/yaTw8df4o7I21BSmChfVCCGQNVQ8aBoULbERG6FQ5+lv4anXLyf5qfA3XDxOiHN6o1hTcehHRUitYCyKSdQaQSt2hWTimgDeCp3BORlXjwWKzgqN0SpV7qy6K4NNKoT/VFJOiAIeBqGgDxgHjFB8BO+pRHlwSloJFfBpz87UcPLwlGq556eNZdJ1WrLtF64qiASCV0Sm4tBZRO+oJfkI0ilEPGCtII8qxz2avRSJ10qTq3FrLpFYFN4oCBLYCcdwUtiicogAaANGCnqqGkEOTUKScEL61HOktqsUalayZGjVRqDGiiKpXAPANIJygWdELYSkpqpFJxVRnsOd6vTqjpC/mH0b4LUpVzrAwGhGopUaODSCdkKWMVAsJXPOy3Hl108DcNDLpBgWCKeqNHFHwBgAECQLIJcmwsc9BPVpg8sOpLYsYpePSmV/EdSTolNRCKQNGgBUAGBkVgLKhK9rDMC2BXNzNR5/Ib6T9v/k0vg47IYekYAALIJ20StXVIrPRGkxkYFNAoewIMgEaBqiqQCfIM1zfkrn9dHGjrFIFYAkEr6M1G+NRx25bfuOkeS9dtOkfw53r3eP8AzDQy3D1GlfAJYEraMrUwaDkFLGiL1wCWwEp0QlsVioW7NON6vwo6ZPPZK6RTixGooASKwMAAS+AgMKcejUVtg0lIgeiHqKpGAIN6A+g5frPP5WOPl4hTu38cM9dFWK9MPVGzQinqoFwTsgT8lT6tRGjeKFnEBjqojzdZGNcLx9VYgjQwjSlUaOoIhZwSoc3aP5ajlt08fVmO4WBoAs6JUuXJWOe+E+mz/k0nh4656o7I21BXjxVLfRCQBkDVA8aoaMVC2xBG6CHN0t/DU657/wA1PgbrzeJ0Q5vXGkWm49COiorWAsiknURpwVK3aFZPApoFN4CdgTkZV48FVkVG6JUq91ZdFcVWnQJOopJ0QBDQLDwKeMgFIxRvAJfUohy4JS0wSK+DTn52o4eUlFrnk8ajpOq1ZdovXFUQLIJ3RKbi2AWUTt2QS/MRpFKIeBWsCPLixz2avRUicaUnVuLWXSKwKZQJAlkE47gpbFE5xEADQBoFPRQ0iIX1CkkQvrUc6S2qxRqVrJkaNVGoMaKIqlQPANOAnKBZ0QthKSmqkUnFEZ7DF6vTqjpC/mH0b4LUpVzrAwGhGlKjR4BgTsBYECwlc87LceXXTwNw0MugwLBFPRGocURGBgCQJIJ32Fjntp6qyeWXRK2KxW49KZX8R1TnRDUFiiKaAEAUZFYGAsgSu2VmBOBXNzNR5/Ib6T9v/k0vg464xh6TAABIJXErVCK26DScDIimgC+wBpAI0DVFUjAT5Bmub8lc510caOsUFYGBG4zUeTGo47ctv3HSPJeuynSP4cr17sf5h4RuHqNKxgEsCU6MrUGm5BSRoi9eqwJZBKdGSWxWahbs043q/DqOmT27JXSKcWSjUU8FAGBgYE+TBKgMqcejUVtgqU6AeiGqiqxiqIjegMA5frMj+VnXHy8Q4+zbz566KsV6snhGzQKauA1gTsgT8oVPq1EaN4oWUBjqojzZIxrhadVYgo0MDStUaMoIhZEQ5u0fy1HLbp4+rLuEoNGKBOiVLmxY574n9Nn/ACaZ8PHXPVHdGdQUpiqF9EIBvEDVA8KG8VC2xBGyCPN1t/Cxz3ypcDpXm8TojXN64Mijx6EdMKoSgUUkiNOAlbtAh4FNAH8USugnIivHgsUnBUr+olSr3Vl0VxVC3z8gWdQJbQoCHqLDRop4BTxRvAJdKIcuCUtBIr+Irn52o4+UlFrnk8aldJ1WrLtF65CqIBII31EPxaC3iiduyCX5iNIpRDwK1sBHlxY57NXoqROuyUnVuLsy6RWFUwAgSwJx3BS2KJojA0AeBT1VDTgIX1CknBC+tRzpLarFGuCwyNmqjUGNFEVSvgHgGnAJKBJELYSkrqsxWcVUJ7DF6vTqjpC/mA3wWpSrnQAQNCNRSuDR4BgTsFLAhbYM1CezcebXTxg3k0I6QUURT0xFh4GhBhGAJAkiJ8mwsY2E9WmVJYdErYrFbj0plf8AFHVOdGaaosURo0AKgAwrIMBZVCV2wkLbAqHM1Hn8g/SdJ/k0vg464Yek3gAKWRE7aM1qqsVt0RpMZEU3gB7ADIoCGqCkYKnyDNc35K5/XRx4jrFPRRAJBHkGajyY1HHfHJP7jo8d67adY/hyr34/zDwjpD0FVjAJYEp0ZXpg0XkAsaDop1WBLII20ZJbFZqFuzTjer8Oo6ZPbsldIrxZKNH8FABAAACcmCVAZV4xqKWwVKdED0DVFisYAg3oDGg5frMj+VnXHy8c/H3b+PPn/ToqxXqypGI2aAPXBQsCdkCflCp9WpiNGULKBo6qiHN1kZ1wvH1ViCNCjStUaNGqCIWREOXtH8tRy26adWXcsoDCgToiXNixz3xP6bJ/k0z4eOueqO6M6gpTFAvoEgDeANQVVB8AtsQRuiI8vW38LGN8qPBjpXm8Tpqw9cG2otHj0I6a4qhOoFkCSg04olPYQ8CmgDqJXQTkFeLqEUnBUriVKn3sMx0VVWtoElFJYSgIeuCw8aKaNBRRoAl8QR5cEpKYJFfxFc/M1HHyEo1XPJ41muk6rXGXZeuKpgLIJWRDcQLtCVuzIn+YgWFKIeBWkEuXFjnvg16KkTrshOrcXZl0isKpgBAtgSjsClsBMQAGAPAHrqhpBC+olJIF9ajnSW1WKNRYZGzVxGoMaKMgeoqkA04BJQLIhLCUldVlWcVUJ7DF6vTqjpC/mA3wWpSrnQEEU0I0pUU8CtIJ2ClgQLYJXPPaW48uunjBvJoR0gooinpiLDjQwIwMASBJBPk2FjnsJ6tMKTjLrUrYMVuPSmV56o6pzozTVFiiNGgBUAGBgYUtgJXbDMC2BXPy41Hn8jfSdJ/k0vg47IYekYBgKCdtVmtUWK36o0mMjAo+A0aAyAAaoKRgqfJgzXN+UK5/XRxo6xT0VgCQS5Bmo8mNRx25J/cdHjvXdTrDnevfj/MNDLpD00VXwCWETnRFaYNByaBYBenVYEsglbRklsGahbtDbjercOo6ZUnsldIpxI1FBQnQYGkAgCcglQGVeIailsFSnRG9AaiqwKIgegMA5vrchZ1x8vHPx92/jz5/06IYr1ZPXJRuHA9RQtoJ2QJHZU+rVxGjKFnUDRiohzdZGdcDj6qzGFFGlKjR4AfBCiI82x/LUctr06su4INCjSIlzYsc98T+myf5NM+HjrnqjujOoilMVQuBANGAMIKw0CIWyCN0EeXrP8LHPfKjwY6V5vE6a4xXrjW1FpuPRI6YxWglAsikkRpwVKewyeBTQBlE+RBOcEV4cFingqVxKlTsMx0Riq1gJOopLCAIeopo8FPGwCkKMBL4lEeXBKSgkV/EVz82tRx8hKNOeenjWa6zqtcZdYvTFUwFkEbIh+IFvFE7dkE/zECwoCGjBWnAS5cWOe+DXoqROuyUnVuLWXSKwKaFA9AtsQSjuClsUTRGgGgD1A9VDTAIX1EpJAvrUc6S2qxRqNQyNGriNQY0UZA9RVIECQLKBZAthKnXVZis4qoT2GL1enWB0hPyQNfBalKudAQYFNCNRWo1DQAglYKWBAtglc89m48uunrg3k0I3BRofBT0RYeBRAQAAkCSInybCxjYfi0wezLrU7YMVuPSmVpxHQk6JTVRYoNGgBUAGBhWAsohK/l/KpAkK5+XJajz7b6Trb+TR4Prshh6hjAYA9BK+qzWqLFb9UVMQYFHwAjQNIoCDUFa4Kny4M1z/krn9dHHiOsOKwBOAlyKzUeTFjjtyf8AcdHj+u6vWP4cr19DH+YaNRuKU0VQCXBOdGVaZA0HJopYEXr1UJZBK2jJLYrNQt2hpx11bh1HTKk9krpFOJGlVARQBgACcglRGVOMailsFSnRA9A1RVYwBAAGNEc/1vVZ1y8v+XNx9m3mz10VYr1w8I2cU9cBrAlYCRokWjEaMoSdQP4qOfm6yM64HH1VmG8FGNRo9UU6ggUSo82x/LUctL06suwSitCo0glzYsc98T+m9/k0z4eV1/ijujPZEUpiqFwIBoyANAKQA+KhbIJXREOXrP8ACxjfEeDHSvN43TXGK9WWtqNG4tCOmuKoSBUCSK04iJW7Kh4FNADPz8fYUlp+33ETkRXiwWKzgqNxKlTuMrxiqM4BJQJYA9EPXBTQKeAUhRgLfEohydRKSgzFPBpDmajj5CUacs9PGs12nVq4y6xauKogFsERsgfiBbxRO3ZBP8hAsAQBowVpBLl6rHPfBp1VInGyVJ1bi1l1isCmUAC2QSjuIpbqqpzgjRgNCBq7IK1UGcBC+olJOBS+tRzpJ1WKMDUMjRqo1BgUQPUVQRpFJKBZELYSp01WVfFVCewxer06o6Qv5AN8FqUq50BBgU0I0pXBo8AwJ2ELABYSueezceXXTwNw0MukEUfBT1RYcVhREaQCQLIiXJqxjbfi0wa2MOtTtisVuPSmVp6o6JiHrgsURo0AKjAAN4DClsISvv8AIQLCVDkxqOG+B9J1t/JpPB9dkYw9QwDAWdBOys0a6ixS/UVMQRR8AI0DSAANQVjAT5RK5/yVzdHHiOsOKIFsCVxmo3ajjpyf9yXR4713V+1Y/hyr6GP8w0I3FKaKoBLAnOjK1MgaLfQLGgvTqoSyCVtGSWxWahbtDUcddW4tR0ypPZK3FONG4qoCKHgMAAnyCVKRlTjGopbBUraAQIauhFYFYG9AY0RD6zos65+X/Ll4+zby5/06KsV68njEbP8A6AeorWBKyISNUi0bCNGUJOgbwRDn6yM64FOqsQYRo0aNKVFMAgURHm7R/LUctdXp1ZdglFZRpES5sWOe+J/T+/yaZ8P11z1R3RnUFaYoW4EA0YBo0FIxUHwC2QSuJUOXJ/gjGuI8GOlebxumuMV6stZGqPHokdUdVaBAopJBpESt2gQ8CmgD+KJXQTEV4hYpOCpXEqVO4y6IxVCQLKKSdEAQ1RTwKeAUhRhC3xFQ5MEqdBmK+DSHN41HHyEo05Z6eNZrrOrUxl2itcVTAW2AlZEU4wV8UTtqCf5AFgKIeMFaQS5eqxz3wadVSJx2kSdV4uzLrFo0UygToFsgl+YKW6qJ+IgQA+gaugrVQZwEL6iUk4BfWo50k6rFGBqGRo1UagxooinqCkYI0gSUUsiEsJSV1WVJxVRnsMXq9OqOkJ+QGvgtSnVc6AgwKeEailcFNArAnYQsAFhK557Nx5ddPA3DQy6QRR8FPVFhxWFGBGkCTIgfIJ8mrGNt+LTJrMulTthGK3EUytOI6J+iU9BYoijAplAkGBgYC2wKSvoQthKjyZLUcN8D6Trb/wD6NJ4Prshh6hgGAs6CdlZo10WHv1RSCCKPgBGgbwUBBqCkYKnyjNQnsrm6ONHWH8FYAsIlb0So3xqOOnJH7kujx/XdXrDlX0M8NCNxSuiqeCksInIytx9Rot9AtdBenUCXESsIS2KzUL9oajjrq3DqN5UnsldIpx4jcVULKKwN4DAlyCVKRlTiGopOCp20Cxohq6KpAGAAGNBD6zos65eX/Ll4+zdeXP8Ap01Yr1w0I0cU9RWsCVhCV0IrGinFIgfxUc/PkjGuNTqqRhTRqNRSviKZQQL6Ihzdo/mGo5a66OPqy7BOit6DTgiXNixz3xP6fZ/k0z4vrrnEd0Z7IitMVS29AngGjANGwCkKg+AWyCVxKhy9f+CM64jw46V5fG6aYxXqy1kao8eiR1R1VoPUCgUAkErbAlPApoA/iiV8QTEU4sgWKzgqVxKlTvIy6IxVCQCUVOdEAQ1RYeBVI0DwoKoS+JRDkxCp0GYr4NIczUcfISjTlnp41mu2erUxl1i1cWKIhbYKlbURTiBbxRKyCU9hGsBQPGCtOAly9Vjnvg06qkTjtIk6rx9kdYtCKZQJAtkEvyBS3VRNECFBA1UFaqDOAhfUSlnBKT1qMUk6rnRgbhvEaGqNQ0aKIHqKpGCNIElFLIhbCJ11WVJxVRnsrF6vTqjpC/kga/UVCVc6wginhGlKimFYE7CUseiBbArnns3Hl108DcNCOgoDA0euosOKwoiMBJj7iACfJsLGNt+LTBrMulTusZrcSUytOI6JyJT0FiiKMCmUCQYAAQLYCUyf5EgWCocmS1HDfA+ky3//AEaTwfXYw9QwDAX0E7KzRp2Fh79UUggwKIBXQN4AANQVjAS5RmofkrC/HiOsUFYAsIlfFSo8mLHDbkj9yXR5Prur1hyr6GeGhGopUaU8AthEpEWp1GiXAK6C1cAvIIlYQlsVmoX7Q1HHXVuHUbypbsldIpx4jcUUBBhWBgS5BKlODKnENRScFStogQBo0FIFMAAPoiH1n7azrn5P8uTj7N15c9dNWK9cPVGjinqK1gSt6IWNCKV1FP4qllA34qjn58kY01OqpGFNCNKVFMAzgFEQ5tj+Yajjvrop1ZdwnRW9EGcBHmWOe+J/T7P8rpnxfXXPVl2RnsgrXFUtgIBoA0aCkYqD4BZQSuIhydf+CMa4jw46V5vG6KsV6sjZGqPGJHXHVWioFkCgAJX7QJTxgGgU/iiV0E5EV4sFik4KjYSp07jK8YqtOAH+qKnIyHoGqLDwKpUDQoIhb4UQ5MQqdBmKeDSPN41HHyEo05Z6eNZrrnq1MZdotXFDAS2AlOoKcQLTjSJWZVKewjWAoHjBRnAR5eqxjfB4+qsxOO0iTqvF2R0i0I0KjSBbIJfkIpOKqYgAIGqgrXFBtgIXRCzgVP1qOdLKsUYGoKNQ1Uaho0UfQPUVSBAkCygWwEsISuqypOKqM9lYvV6dUdIX8kBvgqM6rnWEaAPXEbilRTQKIJ20SlEC2CVzz2bjza6eBuGhHQUBgaPXUU4rCiIwBIJzIz7TvsLGND+LTI21l0pLkZrcWlMrTiOifolPQWKf6IowKZQJBgYAALASmT/IkLcSo8mS1HHYfSZb+TSeD67Ixh6mgBlQs+oJ2VmjXRYe+IqYhhRAI0DTgoCDQFYwEuUZqH5Kwvxo6xSAYUsiJXGajyNRx25Y7y6PJ9d1esOVfQzw0I1FKjSngFsIlIi1Oo0S+gFdBeuLAnIiJ2ETt4rNQv3ajjrq3DqN5Ut2SuinGjanigSgwrAwJcglSnBlTiGopIqU6IAGjQVgUQAGES+r/alZ1z8n+a4+Ls3Xkx10xjFevJ6o2cU9BWsCUiUsahFKaqnkCeop/wAVRz82SMa41OqpGFNVGopUUwNIMJXNzbH8w1HHfXTTGXcPQb0BnAR5Vjnrif0+2/k0z4frrnqjuj+SIrXFUtgJ6AxgHjQUhQfBC2QSuCHJ1kjnriPDjpXm8boqxXqyNkao8YkdUdVaBAsgUABK/aBKaoHgU8YoldBORFOLBYrOAjb0E6dxmL+KrAHqKnIzQA0CmjRVagaFQQLfBUL4iVOgzFPBpHl8ajj5CV1pyz08ay656txsu0WqoIFtgJTqIpxCrTjSJWZVP8hAsBYA8YKM4CPL1WOe+Nx9FTJI7SJOq8fZHSKwNGjAYC2QS/MRS2KqYjCMKamgrUBnAQtqJSzgibUYpZ1XOjA3DI0MIsPA03oHroKQASBZQLYCyJU66rKniqjPZWL1amI3A/JFNfqKhOq51hGBSuI3D1wU0CiCdtEKIFhK557S3Hm108DcMjoKAwNQ9dRTiiDAwBIJzAz6TvsLGND40gzrLdJdWKPElXKs4jomJT0FiiNDAGUAGBgYC2wCUyf5EgXEqHJktRx3wPpPz/k0ng+uyMYeoYBpULKCdtVmjTRYfkxFqYgwBhQjsBvACQGoK1wEuVWah+Qx9XojpFBWFLIid1ZqHIscduWP3JdHk+u6vWHKvfnhoRuKVGlPFC2xESkRanUaJfQauiLVVSciInbBE7eKzUL92o4a6tw6jplS3ZK6RTi9RtTxQJ1BgYVgS5NEqU5AypxDUUkVO2iFA0aCsYKIB6DeiJfV/tSs65+T/NcfF2dK8mOumrnXryeqNnFPQGtgJSBY0IemiqTgEFP+Ijn5sIxpqdVSNAsNXUah64KcG9Bv9RK5uftH8w1HDfY6aYy9Aeg06AziiPLkkc9cT+n2f5XTPi+uuerLsj+SCtcVS2Aggxgp4BSBBULbEEriIcnWSMa4jw46V5vG6KsV6sjZFo8ehHVXqsaCUCyBfQCQSv2gSmqB4FP4onyIJSIpwhFZxVRshU6dhlfxVbwAlFTtoyAGqKaBVaqGgQQLfCiF0KnQZikYNI8uw1HDyErrTnOnjWa7ZWoy6xaqggW2AjOoivH4KrOKJ2QT/IQLAUDwKM4CPL1WOe+NTqqQkdpEnVePsjpFYGjCNIpZQS/MRS3VVSEEG9A1NBWoDOCIW1As4CbUc6WVc6NRqGRuDCLD1Gm9A9QPADIFlAlgLKoSuqyfwVGeysXq9MRuF/JFNbBUJ1XOsIwKVxG4eop4FaQTsIUQLCVzz2l0jzXp4RvJoR0FAYGjVRVBWAQYAkQkgnfYWOe28aZGWXSkurFHiStYVtiNpiU9BYp4ijAplQAYVgYC2wSkpk/yEC4VDkyWo4b4H0n5/wAmmfB9dkYw9YwDKFlBOys0aaLD3xFTVBQNIoV0DeAEgNNBSMBPlGahHZWPq/GjrFBWAsiJWVmo8jUcduWO8tvJ9d1esOde/PDQy3FKjSgFtgiUiK06wNFvoNXRFq4oTkQTnBE7YrNQv3acNdW4tR0ypbsldIpxeo2qoX1BgYGFS5NEqU4MqcY1FbYKjbRAENXRYrAogAjAn9X+1Kzrn5P81w8fZ0rx466q45vZk9cRs4p6g1wSnACAhqaKpOAQDzgObnwY0NOqpGgWDCNRWopgYG8Erm5+1f5hqOG+unj6yzHob8gadBpwEeXFjnon0+z/ACumfF9dU9WXZH8kFa4qlsgRUNGCmjAUjxUEC2QTtgjn5OtiMa4jw46V5vG6KsV6cjZGqPHoR1V6qoTsilQL6ASCXJ2gSmqB4FOonyYglIinCEVnFVG6InTsIuqsATiCdhKAGqKaAViRTKggW+FEboVKgzFIwaR5dhqOHkJXWnOdPXWa7ZW42XSLVVTKEtiCM6iK8SxVZwE7oJ/kIFwKB4FGQR5cWOe+NTqqQn5SJOq8XZHSKwNGBgLZBL8xFLdVVMRoEAD10VWoDbBELagW2CVNqMUsq50YGoKNGhGoeo0PoGroHgBAsgSyBZVCV1WT+Coz2VzvVqYjpAnsimv1FQnVc6wjApVG4eop4FaQTtohRAtglc/5S6R5r08JW8mhGxRRjRTVGlEVgEGAJEJIJ31Y56bxpkZZdKnZWKbiSrlW2I6JyJT0FiiKMAZQJ0AFb0GALYISmT/IQLiVDkxqOOw+k/P+TSeD664xl6RgUZQLbFROwlGgsPfIRUxBgDSKFdAwBIDTQUjAS5fRmox2ViL08R1ikA0ilkRKys1G/rUcNuWveW3l+u6OsOde/PDQy3FYGjgW2CJSIrTqNFsDVEWqoS6Cc4InOKzUL92o4a6two6ZUtqV0inFqNKyqlQYGBhUuQSpTkDKnENRWcFStohRDV2BVYFEQJBgT+q/an+FnWN/5rh4+zo8WOuquOb2Q8YjZxT0ALgnIBAGoKpOASAPOCObmwZ0NOipGgWGhFUqNGBgawlc3P2j+YajhvsdPHjMegPyAZ0GlRHlI564n9Ps/wArpnxfXXPVl2RjsgtGKpLAQQYwU8eArGKg+ASyCVsEQ5Mt/BGNcR4MdK8vjdFWK9WRsjQ8WhHVWP8AKqhOopZAvoB6CXJ2gZpoFPAplCXxBGRFeEIrKqjdEqdO4i/iqHoNOIqdhmgIaBo0ArCqYQQLfCiN0KlTRiKeDSHLsNRx8ha605zp66zXbK3Gy6RaqqIEuCU6iK8SwVnASsgT8oALgUFIFaQR5cWOe+NTqqQkdpE+q8fZHSKwNGEYUtkEvzEUt1UTkAgRp0D00VWAG2CIX1ClnBE2o50s60xRqjUFGzQLDwjQgaugeAECyBLIFlUTjVZU/EVGeyud6tTEdIE9kUbdRUZ1XKsDApUbh6opoFEE7CUohbCVD8pdI816eEbyZGxhFgxo0eop4FZAQYAkQkgnfVjnpvGmRsy6J2Vim4krWVbYjaYlPQIojQwAqBIMKIAAWwCUyf5EgXwSoXajjsPpdv8AyaTwfXXGMvSMYAiltiCdlZo0Fh74i1NUFAfBWroGAJEamhFaip8qs1COwxOr08R0igrSBZBO2KzULtRw25a95beX67oyHOvfnhqstxWBo6oWyCU6ItTBolgaoi1chQl9QTnBE7YrNQv2hqOGurcSOmVLdkropxajSqhRRAAZFS5MEqVsgZU4hqKzgqM6IAhq7AsVgURAkGBP6r9qf4WdY3/muHi7OleLHXVGMPXD1xl0h4+4HqK1wSkA8A9Y+BTzgEjQPOCObnyRjRqdVIApqoqlcGjg3qoEoVy/UbH8tR5/J8dXHksvS0bIN6Ayohykc9E4O0/yumfF9dU9UdkY7si0YqksBBBgD1FVriowFsglYRDk9IxriPBjpXl8borjFerIyjRuLQjpjFUs6KE6gHoFnQS5O0DNNAp4FMoS+IIyMq8IsVnFVG6JU6dhmL+K0ANOIJ2EoKgwingVWFDAIFthRG6FSroxDjSPLsNRx8hY1pznTV1muuV+NHWLQKIFvkgh6iLcSwVnFE7MicdgC4FgRSBppwEeXFjnsePqqROO0ifVOPsjpFhowjegWyKl+Yik9VVORAEaQPTQWgULYIjfQLOCJ/6rHOlnWmKNUago1DQjUPA0IGroHgBAJwE5AsiJxqs/T+CpT2VzvVqI6QPyRTW6ioSrlWBgPXBqKVRo0AIJ20CwIWwlQ/KXSPNenhG4ZG2gU0Ip6jRkUVBQYQJAkgnfVjnpvGmRnGXSpWVzqnFiVvKlsG00Zp6CxRGhhQwFkGFYBAthCUyf5CBf0SoX9ajjsPpdv/Jpnw/XXGMvUMYDAFgTtolGgsPdFIrLQijIrV0DAEiDTRVIUT5fRmox2GItRHSKCsoWwJWwZqPI1HDblr3lt5frujIc69+eQ1dRuKwjR4VC2wEvURamDRL6I1QWr1UJfRE59QTtis1C/aGo4a6two6ZUt2StqURtVVLOoMoyDeAlyBU7eDNPxDUVnBUZ0QBDV2BYrGCjAgToNIE+p/an+FY3/muDi7OleLHXTDFeuKVxl0PAHoRWuCU4AAaoqk4BK6B5wRzc+DGjU6qQPRTVRVa4NGBlQJErl+p8/lqOHkdPHksPTBj0AAZVEeVYxpPg7T/ACaZ8X11z1R2Rjugt4KSwEEGAPXBVK4qDghJQJcHPyerGNcR4Mbry+NerFerJpxGjcWlI6a9VUs6ihIB6BZ0EuTtAzRjRVK6oYCXRUZGVeHwWKyqo3RKnTuMxecVoAacQTlUpRDQinqKrChowBAtsKI3xBGujEU8GkeTtDUcfIWNac/p66zXXK1EdYtAo+qFviCHqItxasFZxRKzIT8gC4FgFIFacBHlxY57Hj6qkT/KRPqnH2R0iw0YRpAtsRUvzEUt1UTkAEYD00FoFC2CI31As4qJ/wCqxzpZaYGqNQUaNA1DwjQgaoHgBUCUE5QLKonGqyp4KjPZXO9WpiOkCewprdRUJHKtAMClRqHqjRoAQTtoUsCFsJUPyl0jzXp6o3kyNtCKaNFPA0YUUGUFAJwQkgnfVjnpvGmRtjLdSsrFU4kbypKNpjNPQWHGjRoGAs6DAwogWQLTJ/kSFuFc9vWo8+m+l2/8mjw/XX4y9IxgMKFsBO2jFGg1DXRaSBBARWroGAsiDTQVjFVPlwYqEdhmdXp4jpDij4BZBKys1G/rUcNuWveW3l+u6Mhzr354austxaBoyoW2IiU6C1Oo0nbRBoC1MWBbdkRKwidsVKhfs1HDXV+JHTJ7dkralEbUVQ9QYGUbxBLkwKnbwZU4hqKTgqU6IWQNXQVgB8AJBgJ9T+zP8LGN8rz+Ls6V4cddUMPZFIxl0hq6ClFVrpROcAoGqKecAtdA9sEc3Pgxo1OqkD0U1UVWuDRgYQJVK5PqfP5ajh5HXx5LEeiMK3oNOyqI8xGNJ8Haf5XTPi+uucR2RjsgtGCksBBG9BSoKRigiFlBO+Ahy5JGNcQ4XSvL43RDFeqDOI0biCOmuKpZQCY+woQBZ0EuTtAzRjRVIA0qEugjIivD4LFbKqN0Sp8fcZi/iqECtOIJyIVUNCKeoqkYoaAMIWxVRuhUa6MRQaR5O0Nxw8hY1WPp66zXbK1GXSLQqioS+II+oi/HqwUnFE74yJ/kAXwCxoKQKM4CHLixz2NOqpE/yE+qcfaEbi0DRoBpAtkVKe4ik9VE50AEYD00FoAJwEb6BZwRP/VY50s6rFGo1kUaGBqKQjQgaugpGgygSgnKIWVE47KwfwVKeysXq1MR0gT2FNbBUJHKtAMClRqHriNGgBBO2iFgC2EqH5S6PNenqjeTI2yKaBTwNG9FEBQYQJwCSCd9WOem8aZazLdTtqsVXiR0yecGk0Zp6Cw40YDeAWwNAMKIFkC06z/IkLbArnt61Hn03023/k0eH66/GXpGMBgCwJW0Zp6DUNdFTVkUUQavYDSKWRBoCtcFS5FYqMdhmL1R0hxR8AkgnZWahyetR59uaneW3m+u6uQ51788hq6y3FqjRlQtsBKdRFq4NJ20Q1AVqoS/aUROcETtipUL9mo4a6vxI6ZPbtCVtSiNqQqh6gyjAyCXJglSt4JVeIaik4KlOiBIDXQVgBgAkAAv1P7M/wAKxvlefxdnSvDjrqhh7IpGMukNXZBSgrWBMCgauiqTgFroGtgjn58GNDTqpA9FNVFitRowjKBIlcn1Pn8tR5/I6+PrLD0xo0Vo0GlUS5ljG0uDZ/k0x4vrsnqjujHZCKxgpLYBPRG9BSMBWMUbwQsoJ3wHPy5KxjXEeFuvL414Yr1QZRo3EUy6oxVLINOClQLbQS5O0DNGNFVhQfAJfEEZEU4vBYtZVRuiVPj7jK/iqECtIJyIUQyKeoqsKDAGhULbEVG6FRr2kYing0jydobjhvpfyVn6eus10ytRl1i8YqsoS+II+oi9FgpKid2RP8gC+AWoRSBRnAQ5clY57GnRUif5CfVOPtCOkWjRo0CNIFkVKe6IpPVRMGECQPx6C3gNIIX0Qs4Cf+qxzpfWmBqjWRRoYFikI2IGqCgCqFlFTkQsiJxqsnnqKlbsrFW48R0gT2FNbqKhOjlWgGA9cGopVGjQAglbRAgC2EqH5S6R5r08I3DI2wpoRYeo0b0BFEGRAnAJOAnfVjnpoxplpZbTtqsVXjxHTJ7YNJozT0Fh4FMKIBINAMKwBbBCU6hAuFc99lqPPtvptt/Jo8Pa6/GXpaMARQsIlbRmn4xqGuipqyIooNXsBpFLIg00Fa4olybIzUa6MxeqOh4VRQJKoS2CVz39ajz7c9O7bzfXbGQ51788hqstxao0ZULZBKewi1eoqdtA1AWrionfQTtiInbFZqF+0NON6vxDpk9u0M1tSiNqQqh8fdBlGAPEE+QSpWEqvHkDUUnBUp0QsiGposVgBAJABC/Ufsz/AArO+V5/F2dK8OOuqGHsikYy6Qa6CtBWsonKBRDVFUnBS0A1sEc/PgxoadVIAQ0ajUVrg0bxUYAkSuT6rz+Wo8/ldfHksPTG9FaAaVRLmWMbS4Nn+TTHi+uuesI7pV7IK+Kpb4gmI3oKQCsKN4IWUE7g5+XJ/hYxviHC3Xl8bohh6oMjR+JKkdNcVosgEorAS3gJcmwM0Y2BVKqHnATugjOiKcPgsWtiqjdEqfH3GYvOK0EA0gnKIVUNHiKeoqsYoMAZQtsQRugjHaRhTwaRv2bjhvpfyVn6eus10ytRl1i0YqioS+II+ojooodRO+sif5AFwpageBTeKIcuLHPQ06CRP8hPqlO0I6RaNFMDAWyKl+Yik9VE5BhAA/HoLQASCN9QpZxUT/1WOdL60wNUayKNDAsUqjQimqBwFUCUUkiEkE/yVj6eeoqVtVirceI3GnsNDbqCE6OdaAYD1wailRo0ICCVtECALYSoey6R5r08I3DI20YijAqkDRgGAEGAJxAk4CdtWOemjGmQllqknVZq3HiOmTWwaTRmnoLDxopvRRAJ0GgGkVgC2CUtOoQL4Fc19ajz7b6btf8Ak0nh7XXDL1MAg1sBG2jNPx6NQ10VNWRhBlUa6hDClkQagrXFEuQZqVdGYtVHSHjFUUCSCdsVmoXajz7c1O7bzTrujIc69+eGqjcWriNGVAsIlPZBWuKqdtQNQFa4oS4idsRKnbFZqFu8NON6vxI6ZPbtCVtSiNw8KrSDAwBKCfIJUrCVXjyBqKTgqUiFkQ1NFVgBgAkC+iN9R+1P8KzrjzuLs6V4cddUYxXsikYy6QaiK0xYrXFJKBPZENXRVLYKWgGsI5+fBjQ06KQI0U0IsVjBo3gg+KFsJXH9Xkfy1Hn8rs48lh6YwrQqMCXMsY0lwbP8mmPF2uucR3Sr2lCLRgJ2FKIHoKQCsKMIWUE7A5+bJWMb4hw+N15fG6IYeqDIp+JKZdNeqqWwrAE4iksCV9gZoiqVUPIJWQStolU4RYtbFVG+IlT4+wzF/FaCAaQTlEKqGgU9UVSMUNAGULbEEboIx2kYing0jfs3HDfQ9Vn6aus10ytRHWLQKKhORBGOyI6KKHnFE7esicdgC4FqJDjRpxRDlxY57GnUSJ/kJ9UpsI3FhswjAWwqX5oik4omDCBIH49BaMUCUEb6FLIif+qxzpWmBqjUFGhgWKQjQyKagHVBAsopZEJIE/JWDeCpTqsVXixG8jPYaG3UELaOdaAb0D1wailRo0ICCVtEoQBbCVD8pdI816eEbhoRtoAUaPWRYeBRgGRRVAlAlgTtqxz00Y0yEstEnVYW48R1yNsGieozT0Fh4FN6KOQAegEaAg0ChOCFp1CBYK5r9mo8++t9N2v/ACaTw9rrhl6mAYALYCdhmm49Goa6KmrIwDTgo07IQ3opZEGgK1US5BmpRozFqo3FIVppAkiJ2wZqF2o4ac1O7bzTrujIc3vnD1ZbitRoyoFhEp7ILRiqlbUDUBauKhLglbEE7YrFQt3acb1fiR0ye2wlbU40bUhQJRWUYAkE7oidxKpx5A1FLYKnIhbCDTQioogWdBvQDn/an+FZ1x53F2dK8GOumGHrisYy6DGgrRYoXRSgQQ1RVLdRQpgDbFRz8+IxoadFIWNCHrqNKxgpoUEAnRK4vq8/5ajzeV2ceSy9U4yK0YqMCXMrGkuDtb+TTHi7XXOI7pU7SgrGClsBPRA9BWoKQqNOAWQTsghzZKxjfHPw+N15cOiGHqgyKfiQy6a9VaLYowNOCp2xBK/aBmiKpVQ8qJXZE7CKcIsVsqoXRKTj7SMxfxWgjZBrAnYQohkU9RVVBgDKhbIqV0EI7SMfVPBpC3ZuOGutOqz9NXWa6ZXojrFaiionyIJR2RHRRQ84onZkJGgWwUtRIcaGcUR5cWOehp1Eif5SJ9PTYRuLDR4BgLKCX5gpOKJgwgSJT8eirQoE4gjfRKWQT/1WOdI0waqNQUaGBYpVGmkU9QP4AqhZQLIEkQkdlZN4KlOqxVeNG41uw0a3UELaOdaAb0FKjUPCNGgBBK2iUIAthKh+UujzXp4RuGhG2gBRo9YFh4FZAVURAlAlhEr6sY0MY0yFmWqT2FZW48R1hrYipjJ6Cw8Cm9Fa0iBANGiiDQKEiFp1CBYK5r9mo8++t9N3uuk8Pa64YepgGAC2AnYSm4xYa+IqasiDeCtTsEP6ilkQaBFYBLkVmpRozFa4jcVhWmkCWETtgzULtRw25qdm3mnXdGQ5vfOHqy6RWoplQLCJTqCtcVU51A1AVjFQtwSnJQTtisVC3dpxvV+JHTJ7bCNqURs8KMDRiKygSgncSp3EqvHkDUNbAJIFkQaaEVFECzoB6I3P+1P8KmuPN4tdK8GeuqrFevKtcZdRjRFaYNBYC+SBBDUFh7YKFANYRz84xoadJUhYA9UaVjBo0KggWfRK4vq//wBw1l5vK7OLJZeqcH2UAgBUS5VjGkuDtb+TTHi7XXPVl3Sp2kFoxQltRSCB6IrXRVFQfAJIJ2QQ5slYxvjn4vG68mHRDL1QZRqn4kpl1VxpSWRWgVpBO2IJX2BmiKpRYHkEroqcjNU4RYrZVQuiUvH2kZi04qhX0VrIJ20QqoMIqlRVVBgDKhbJRK6CEdpGfqn4q0hbu1HDXWnRDV1K3leiOqtRTKJcmIJ17Ii9cUPOKJ2QJHZAtsAtRIcaHxRDlWOejU6iRP8AIT6emo3Fho8YDAWUEvzBScUTEAGkD8egsoEoI37CUtgqf+qxzpGmDQjUGUaGosUhGmkU9QOIKhZQLIEkRP8AJWT+CpTqsVXjRuNbsNGtgIW0c60A3oKVGodGjQAglbRAAthKh+UujzXp4RuGRtoAUaPXBqHgGFEQQCUCWEStrUY0MKyFmWqT2FZX48R0jWGiIyeo0eoGFARoBoFGQAVpwQtOsBC2Ern5OzUeffW+m/cuujw9rrjGHqYBgAtgJzglHjCHtg0mMiDeCtTsEPOopZ0QaaCkYCd1ZqUaMxWiOkVhVaZAlsETtgzULtRw25qdm3mnXdGOT6GeHqjcVgUyoFhEp7IKx1FTnsB6aClVC3ESnJQSsrFRnu043q/Ejpk99gralGWzwoE6itGAKgTiCdxE76JVePBqHtgpJwQlhBpoRSBRAJ0AkB5v2Z/hWdceZxdnS8eDHXVVivXlWuMusb0RemLFLdFL5IEnRDVFh7YK1AGwjn5xjQ06SoWBT11FV8FNAMoEiVxfU7H8w1Hm8rs4slh6Zwf9RQjAGVEuVYxpLg7W/k0x4u11z1R3Tp3lBVQltQIBY0RaoqkKggSdBOyCHP1lYxvjn4shuvJh0Qy9UGUaqnEix0xjSktqUaACRSWyUErdoGaIqlFgeQTviKlIypwixWyqhyIlLx9hmLTitBX0BtgJW0SgI0IqlcFVhQ0YAqFtiCV0EI7SMfVPBpGe7cefXQnVKaus1vK9UdVaiiolyIhKdkF6qHnFRO3qKT1AlsECoQ8Ko+Cocixy0anUIn+Qn09NRuLDR4BgLIJfmgpPVRP0RpAsiKceirQASCN+whbBU59WOdI0waEagyijXRqKQjbSB64BokQygSikkQk4ISOysmnBUp7KxVeNG41tFNbBULaOdCFQfUVSMGoeEaNACCVtEoQBbCVD8pdHmvTwjcMjbRoGRo1cFh4FYBAQCUCWEStqxjQxjTIWZapI7KzOr0xHWDYVP1GT1Gj1A04KUQYBoFEGAJwC06wEC4lc3J2ajz76303e66PD2uuMYepgEAtgJzglHjCHtg0mMjAMK1ewkOjRZ1Uo01CKxgJ3VmpRozFao6RSMVQlAtsVErYRmo3ajhtzU7NvNOu6Mcq9+eHqjpFYFMqBIic9kFIxVTnsgegKQoW4ifiCVlYqE92nG9X4kdMnvsDZ6stxTxQvqKMfYGBpwE7CJ37CVXj6jRrYBZwCW0BoJFIFEAnQAB5f2Z/hWdceZxdnS8eDHXVVivXlWuMusb0RemLFLdFDwE/RDV0U9sFaogyo5+fxGNDXpKkCAhqo1FZwaGBBUCcErj+o7V/mGo83k66+L1l6ZwUVoUaQS5FY0lwdrfyaY8Xa656o7J07SixWFCWQIBY0FqgpDSCgSdBOyCHP1lYxvjn4shuvJh0VxmvVkZRqqcSLl0xiqS2g0ChbATtkoiVu0CGkVSiwMCd0VKRlXhFitlVDkRKXj7SMxaytBADIJW0Sh4IyKrXBTwoaoGVAtiKlfEHPHaRj6p4rSE95ajz6606FNXUreV6I7KUAyiXIgSnZEdFVDTioSyKl6gFsAtBIdVHwEORY56NTpIROewn09NhG4sNGjAECyCU9kFJ6qJ+iNIFkRTj0VaMUCUEb6JS2Cpz6sc6Rpg0I1BlFGo1FIRppA9cFNECGUCUUlgJODJPyVmmnBUp7Kxeqceo3DW0aGcBCw50IVG9QVrg3DwjRoAQStolYCWEqH5OjzXp4RuGlG2jQMjQ1FikCsAgIBKBbCJW1qMaaFZgXZapI7KzOr0R1jWFIjJ6iw9cGjeAAjA0CiAeg04Ba9YCBcK5uTs1Hm31vpu9/+F0eHtdcYw9TAINYErCUeMIe2DSYyMA3grV7CQ6NFtog0CKxgJ8is1KBmK1R0ikChIFtionfBioXajhtzU7NvPOu6Mhzr354erLpFoFFUCRE/wAkFYxVSnsgpQDwoW4icdUEreqxUZ7tON6txI6ZPbYK2ejLcU8UL6iiDA0gnYRO/YZq1MgbGwFnAJbQo00SKVFEAnQAQeT9if4VNceZxdnSvn566q4xXsyrXqy6xvRFqYqhZFDwCeiDXRT2wVqgM4I5+fwY0NekqQKiw1UWK/A0MCCoFuolcnPH+ev8w1Hn3108TD0ThpFaMUaQS5PVY0lwd7GmPF2uueqOyfHsoqsKFsgmARoK18BWNaRpAkoElBz8/WVjG+OfixuvJh0VZr1ZGcRpTiRZx0xjSknsg0CtYE7YiIz2gQ0iqUWBgJcEZRFeEWK2VUOREpePsMxa2KrVFaQStogCMKrXEU8KHqAqgWxBKyKh+cjH0/g0hPaW489606Bq6lbyvVHZSgHUR5NQLx7Ai8aBpxUTlFIgWcAtNEh1UZwEeTVjnoadAic9hn6emo6RYaPGAwFkEp7oKT1UT9EHwUkjKnHoq0KBKCN+0BS2wSpysc6Rpg0I1BlFGo1FIRtpEPQVSFGECUCyBJwE/wAlYppwVOeysXp+PUahrbA0NsFQsOdCBB9BSuDcPCNGgB8USt2RGAllSoR2lt5r06Nw0o20aBkaGoqkCsAgIBKBbAlbWo56aFZCzLVLXsrM6tRHWNIpPUZPUah6gYVvj7iBIrQAgANOAFOsAW4lc3J2ajz7b6bvf/hdJ4e111xh6xkGALYCdhKNNCKWwaTGQgB8FavYSHRothKNNCKxiiV8kZqdRIrVG4pCqE4gWcVE74MaQu3HDbnp3aeeddtchzr355D1ZdIrAplQJETnsgrGKqU9kFKKHgCcmiFiP8qCNslWKjPdpxvVuNHWHt4NHoy3FYULPZFYGAJwCSInfsM3qtMgbNYAnATsA8egpGgYCzoBIg3/AGZVK8zi7S6fHgz11VxivVlWvVl2jeiLUxYoWQCMFJOiNXRVLCjXIEacUc/1HiMaGnRSBAsPVFUmRWgDKBbqJXJzfu1/lqPPvrp4mXonB/1RRjFGkEuT/wDSsaS4O9jTHi7XXbqjsnTZRVVC2xBMAjRFqqp4VBkQk4iklBDn6ysY3xzcWQ3Xkw6Ks16sjKNKcfiLHTGNKT8kBjRQvhRK2IiX5QMmkaUosDAncEpEV4RYpYEeREpePuJFrYqhGCmnARtqJQUERSiNHhQ1QGVQLYgnKKh+cqx9P+MjSH5S1HnvWnQNXUreV6o7KUIHlRDkQDj1EXjVDTioSyKmgWVQtNQiiq04CHLquejU6BE57DN6emwjcWGzQAgWwJT2QPPVQnogxgJzoivGKtGKBKCV9gQl8EqcrGKVpgYxGoMoo10WKQjbAegqkKjegEoFsBJBP8lYppwEp7Kz9U49RqGtsDQ26ioX0c60KjeoqlcGoeBo0AKCVuwlYCWGahHZ0ef6pCNwZRsI0IdGhroqkCsAgMACBbCJW1qMaaFZC7LVLXVZi1MR1jSKT1GT1Fh64KYUQCwgQKIAATkg1OkBC3Erl5NhqPPtvpv3L/8AC6Tw9rsjIYesZBoALASwlHj0Ie2DSYyEAPgNXsEPCNFsJR49CKqJcmSM1OokVqjcUjFUJxAsqifJhGNOe7cefTnp2lpwjurkOde/PFKsuikCmVAETnUFYxVS/JBSoGhQvJolLHVBG/qsVH82nH6tx+I6ZPbwbPRltWFCzqK3gMATgEkE7dxi9Wpg2NtAJwE7BRpoh40U8ASdBpwQ1/2pVK8vj7y6XjwZ/wBOquMV6sq16o6xkFqYqhZFaMBL0Qa9hVLCjXBGlRz8+wjGhp0UgVFh6o0cBjQN8qBfBK5OX92n8tRw1108TLvOD7KKMKNIJcv/AOlc9JcHexpnxdrrt1R2TpsoqvwoWyCcgFdkRaqqeFQZEJZFIgh9R1lYxvjm4268mXRVmvTkZRuqcfiLHTGNBPUUYALYKlfERL8oENbRVKqG9BO/qCUqivALFLAjyIlLx9hIrbFVq4KbwEbaIHgMIrRGjqGqBlQLYglKKhPcY+n/ABVpD8pajz3rTqhqazW8rxiOynGQOohyIjceoLRqhpxUJf1FTQKIWuhFFVvAQ5Fjno1egROdGaeuwjcWGzQAgW2AlPYQ89RSCGjATnRKrxiqQo1gS5NhEpL4JU5ajFKrBvEajSKNdRYojbegeoqkKjegEoFkCSCc9lYozgEnsrJ+PUahrbA0NsFQuOdCFQZ1FUrg1DwNGAUEp7SI3+oEsrNQjs2831RHSDKNhGiH9Rsa6KpAregICAIFuIlbWoxplZC6NUtNGcrUxHWNIE9RD1Gj1A3gogWwjQKIAATkg1OsfwKW4zXLya3Hn23037l/+DSeH/VdkYw9YyDRgBIEtolGgsPbBUxkAHwAjsEPGorWUamoRVRLlyRmp1EitUbh/FVpwCSITkxWNOe7UefTnp2lpwjurkOde/PIpVl0UgUyoEiEnUDxiqn6grUBULy4JS16oI39Vio/nLTj9W49hHSKW8GzUZbVhQk6gPgogWcAsglbuMfVqYNjYA8BO2iUaaKcDQBZ7A04IafvxSqV5fH+5Lp8eCf6dVcYr1ZVr1R1jILUxYoWRQjqCc6INewqlgauQBpxRzc+wjGmp1lSNUWHqjRwNADCgXyRK5b/AL1Vcb10cWo7Tg+oo1UaQS5VjnpLh72NM+Ltdc9Udk+PZQW8VS2wEp1AK6ItTVVRUaRCSgSUVD6jrKxjfHNx+NvJl0VZr05GUbqtPEWLxihfn7itArWwRK2IJ/lAyNtFPVVOCdwSGVeEailiiPIiUvH2VItfBQrgG8FRtogeCMKpTUVRQ1QOqFtgJSyIW7qzen/EVCNlpw+tOqGprNbwvGI7HoQUVEORCtx6gtGqHnFRO6VU5RC+KFroQ8ij4CHIsc9Gr0Fic6M09dhGot6NnBgLbASnsiHnqqkEGMAltGarx4NKQo0oJcmwJSXwKnLUc6VWDRiNQBTV1FiiNhGgpUVRUadAJQLbQJYE57LGKM4oSdGT8eo1D38GmtgqNhilhWYM6gpXqNw8aKZFFRKe0ojAS2DNQr2dHm+qI6DKNBGh9OjY10VQUPQMAgAFsiJW1qOemhUC+Iui8YZWpiOkafQJ6iHqKaop4FEC2EaMARSg05IDTrAEvglct2o8+2+m/cv/AMLpPD2uyuMPWIN4AWwCWEo0Fik4KlOjNAB8AI0DxqK1lK1NRIr4qpcuDNJUSKVRuH8UC2AWRE+RYzpCzUefTnp2acI7q5DnXvzyKVZdFIUEQJAs6geMVU/UFK4BvVC83UZpadRUeT0Y0jHeWnH6tRHSKW8GzUZbVjFCSgPgrQAWwCzoJT3GPq1cGxsATgJ2CjTQUAYAs9gacENP7cqV5dP3bfy6fHz/AP8ATprjD1Z4tXEdYyC3H1VQuAV6oqc6INOwHkaGBB8Uc/P2gY01OkhONUWHhFPAp4wG+FAvgzXLb96quV6vxay7Q06KMKNOAlyq56S4e8mmfH2uyeqOyVPUFfFUJBKyAU0RaqqoqNIicoFlFR+o6ysY3xy8fjbyZXqzXpyaUbqlPEWOis/5VCeiniPsKW+CI3xAkd4EG+geiqYC39BEZV4RYpYVHk1EpePsqRa2ClqB5FRsJQ8EaAUp4jSihqgZUC3VBKfUELd1ZvT/AIioRstPP9adVTU1mt4XhHU9CB1VDkRKPFoKxoKTionf1KqcohfFC17IQ8qreAjfVc9Hr1FiVtGaaviNRcbPAjKFtiKlPYQ89RSeiDAEtolV4sFisKBKCXJsCUl8EqctRz0VWTRiNTgANdRqKo2EaClcFUhUYGkCTqBLBU57LGKM4onOjKnHo1DXRobYKjYYpYVmNOoK1wbh40Uwogl+UojAnbFZqEdm3m+qo6sitGgdGxroRQaCdAwDAAgW4iVtajnpoVC3xF03HgZVriOkCckC+oilRRgU9RRAthGjAHwUoNOCNXrApb4JXLff+W482m+m73/4NHh7XXXGHrhgYAkE7aIagRSRpK2jNAQYwUI0Q0aNDYKFNEi3gqPLkjFLTAilBuHgULYJSiJ8mLGNIWxqOGkKd2nCO2uQ5178cikMuikKCACFnQPGCpTqCtMAQDm6qlJWf8qES5NWOekY7y05fVqajpFLeDZqYy3FIxQvqAitABYCgl+cjH1WuDZrA09QSsFGmiKCjAF/IB8A3/blUryo/et/Lp8fPv8AuumvVivVni1cR1jIK8fVVa/qAV6ipzog07CxSQaAHxRzc37kDnro06SLONGBDVn5RqVSBT7CjQAXwZrln9+quX/6X4+zLtDTorQoacBDl8WOeicPaSs+PtdU9Edk6bKCviqEgndAtNEWqqqKjSInbUAlFc/1HSVjG+Obj8beTK9Wa9GTTiN1SuQjUXr1VQgDeKFtiCNsRKSO6oN0U9VU0bIFuCM6Mq8IsVkVDk1EocfZUitsFLUIecFRsJQ8BhFK+IqiqauiGUC/VBLyUELd1ZvT/iKhXZaef63opuPUreF4R1PQDqIciFNxaIp6KpOKid0qpz6iFjFC17BOnkVpwEb7Cuej16ixK2jNNXxGovA2bYBpALYCU9hDz1FJGiDAEvolV4sCKwqhIiXJsIUl8Eqdmo50qsmjEbnAEGuo1FUbCNEUqKooANKBQJYSpz2WM0ZxRP0ZU49RqGsNNbBUrDFLCswZ0KpXqjcPXRTCj4CXsojAnbFYqMdm3D6ojoyK0aEOjbV0Ir4NBOgaMAQBAtsEStrUc9NCsl5Ea0NI+wsUriNwI9FL6MqURYMaKaAMKWwlaMBvBQAJyRBrkClsJXJfs3Hm30fpu9/+DR4e11VYeqGFEAkCW0SjQIoNJ2EpfRkYwUvohvRTWwWhTRIt4KjyjFCuBD1RqGqqhbAoeCJ8ixjSE404VCneWnCO2uQ517scitWXU8KDIgeAX1A8dVVL1BSgHn7SoXl6iVOk/wCVEiXJqsaSr3lpy+rV1HSHt4NnpjLUU8VS+oD4KwFkAgRL8xn6rUbGQGeoJWAaaIoK0SBZ7APgh945VK8r/v3/AJdJx4L/ALrpr1Yr054tTEdYyKrx4qtdAK9RU57CDTsLFLAADGA5+X9xXO9Gn7cizg0j5gWN8fdFUgU/yoMSBb4M1zf9+P4X45f/AKi/H2ZdoM6KMaoM4CPJqueicPaTSePrq/BHVOuoK+KoTgJ3QLQRauqHBpxUJbUCoqP1HSVjG+OSnjbyR0UZr0ZMjalchGl69VAj7imAl8BG2IhY7iDcU9fBRifvKgXBH0ZV4RYpbBUOTUStxdpVIrfBS0CGnBUrCUPBGA9EWKqpq6IZQtsQT8RUL9himnqp8RrstOH1vRTcepW8L1R1PTBTqiHJqJTcWgp6B/FCWSqlPogRgFr3EPbRppwRG+wrFPXqLEraM00eI1FoGzwAiFtgqXoh56ip+iGgCX0Sq8WBFYUCUEuTYCk5MEqc61HOlENGCwBRrqEV8HQsaiK1FUUD0GkCoEsJU57KzR8UT9GT00ah7I01sBK2DNLGqzBtqFUr1G4aBTeim8BL2URgTtisVGOzbh9U8R0aEGjRTI2NdCKxg0EgaAYGAtkRG2w1HPTQrJeTfhF0eMRtSuDRY1AvqopVFgxopoAZn7ASZ+wg+CjAoegE4IMZApbCOXk7S3Hm2H0/a/8AMGjw9rrqw9UMAihIEsM0aYNRQUlhCTozWgVp0QZFNPUUKaJFvBUeXJGKFOos4aBTxgoWwSljAT5FjnpGcacahTvLThHZXrDnXuxyLVZdTKDIjTgFjUIf8RUvQU49A8/dQvL1EqdcRIlfZVz0lXtLTnOrRsI6Q9vBs9MZah4xVD1AYFD0AkQIBKO4k6rA0NtgBnATvogV7ApGijGgWewg+AavSVSvMt/+Rf8Al0nHh1/uuinVmvRnitMZrrkZRVePFULoNXqKnPcQ1NFh5+4NGgMqOXk7jnenp+2NTjUn4CNHeUVSBTAMKFuM1D/v/wDC/HL/APSvH2ZdoadVWqBvAqHJquWi8XaSnj7XV+COqddRVPFGnASugFBFa6sFAbyFRO2oN4iuf6jpKxjfHNTxt5ItRmu+To6KRkI0tXqsGgUQLefsCNkSljvCoNkU9FUY7AHICMjKvDgsUkVDk7Ilbi7SqRW+ClqBpFSsJQ8EbwDVRYr4qmroh1C26ygn4ghfVZpvwD4jTZacJ1p7SKfjSt4WriOp6AfxRDk1EpuID+gfxQtsRUv9RCxgBHcQ1tFa2BUrbCsU9eosStozRgWLwjZ4FFUJZFT9EPPUVMZNGCkvolU4sCKqrSiJcmwFJfBKnOtRzvQ8EGMGoHog11Fin4o6BGqitUU6jQASgHgJ20Skt2VmmUT9kZNUah7I01sFStgxSxqsQbI1VKYLD1GhFMCXsojf6gnbFYqXx94acKfwdI0aEb1FNKNDXRYrA0E6AgMAwEtiInbWo56aqoWY/wA3/KL9NEb/AOkaUjP+BsvxsoF9GT0Fho7CjANP3AsiH8FbwUJgAkRoj/KKFxK5eTtLcefYfTdr/wAmmfD2uqrD1w8gwrAS4zTVwahhQlAlo+6pQj7SMtOgMij+INTQis4CXJkjNCvQJw0aNQ9cRS2xUoR1BO/qxz0lMfb/AIajjZ/056d5acZ12U6w517cci1EdT/INIgTgNH2RTfiCc9gPTQPKheXBKlURK2yOdTrstMRf46o6HsNGpjLUPHVVCdQEUJAs6I0AnHaRIrXwaG0fMx8A0wKS0fIgfE/qA8R9wH0At2BvBDV6So8y/8A+TZ0nHg3/uujjj/KzXoxxWjLrBlFqtMVQvgBXEUn5iGpnyLFVA9QacVHLydxi9Up0/4Gpxq1+yLIMR/nkDxH3FP8A3x8qEvGDNRiP/8AYn+F+Of/AO1KdmXWGntKq1fvIGnAqHJquWi8feSmO10/ijqWNQP+Kq3z9gSsgFBFaaoeZEbxQiAzgrm+o6SRjfHNTxt5YtVmu2TI6KxkI0tTqsGjRRnAJcEbCBXuJBtsIp66qjHcA5MBGRlThwWKyKhydkStxdpVIrfqKSoQ9hUrYJQ8EbwDVRVYwUaaqHUC2IJeII33/lWaaegXiNfW3CDPaUX6bjjUrplaMR0NXQU8UQ5OyJTcIQ/5CqeKhL4gl5IBGAWO4hrbArWwKlbtCsVSuDSV9Ga0BFoxGzxgCBbYCf8A/kDz1FT8EGuAWwlU4wiqgSglybH8hS8glT/JpzvR+PtH/sGiPtI16KIMahFI6jcCAUr4iqeA0KBZAJwE50Qluys00SoTZENWEWQ06NDOSKlODFJGqwNkap6YLD1GjeiiInGyiN/qKnbFYqc9vj/205Xphpvj7orfH3AyNDUIrGDYToCAwAeoFtgic9oajnpvZVC2/cRfpo6yjXxSOo0WMlFL6MqV8GoNewGiPtIoCNaMARW8BpwAmPsAxkCl5I+wlcnL2bjy+RvpdvP/ALNHg+uuIj4hh6pDTWPsK01j4D00x9hSXj4GaNeqNHAlxAmfuHtvsBZVDfH2RfQ/HxH3Bqx9xIpOKJcmSM1q9BZw0bCKav3hVC3gBHURLk9WMaSt1hqOGuOeneWnGOynWHOvb4+RasfbWXU/wK1o+FRp0GjUB/EUk6IasfeBVPj7qF5IGajXYRInf/8AasVOnaWnOdWnaI6HnUaPWI/TKNnrEfpUCY/zQij9lA9QCdAIBKO0jK1dj+BWtsCjdaRO2oDE/wCcDRP+YGn7XgAmf8wD4Iev7c/wpXlcn/5N3SceHf8Auujj6s13xxak4y7QZn7/APKKtSIVS8kfEAER/kQJPcQa5AsUFaNAZj7Kjlv+6MXqnH+3/wACxq9UWNXvIHjsKf5UYC38GUK/f6if4X45/wD6Vp2ZdYP5KrV2YQMpUb94VyvS8fef5KePtdXx9kdU47f8op/xUb4/y/IJXxBuPRFKx9wNOwqDOAX4+wNPVFc/PH+SyxjfHLXYbeWL0Zrvk3qNqRH+WEaWrH2WDQKPyCdwTt4iFr3EgzsfyKeNlVGP3PgA5ASkQ/EEUn0VHk1ErceyqRWeo0WnxMQENbYAluohfj7IB8fZUNVFisR/lFGuqh/VAviCUZKCV/8A9jNGeinxGmy24RvylFU4vUrplaI/yo6GrGfcU/wIhf7zAU/DEiSGiP8A+QVSY+yiV8RCfH2kPRfJAI7QBp2BWnBE57QrNPXAStolGI+yLFqx9hs8R9gEQtoFS/8A8oHnJUL5/wAiNEfYC2gSm44n4Fi0QASCXJsCUtxKlZqOdNbrUX4MdZRYT1UGuos6rXqjYRHyIesCqfH2UaMAJhALYCcx9xCX7LGdD/ooWO0ifTUkWHnUaCckVOegzeEhXMZRqqUifgah4iUUfRR8VE/ylBv9QTtH2WMXic9oacqew3Q/KEBjsKb1GhrgRSMGgnYA3xADERIB6gW2Albs1HLTfkqEt+4i3p46o0pHUaLXJAvqIpQagx2A0YAAFpwDA3grfABbAo1yBS3wSuTl7Nx5fJ1vpsv/ACaPD9ddcYeuDIGBpwE+TwSmjEaNCgXj7CVK0fAlD5+4ntvkPZ4n5GhnEGpP3CLX+0fC1EeXJGaFegs4MaKeuIpbKNXAS5clY5bSnrDUcdcc9e8tOEdlOsOde7x8i9OrLqb/AEBrbCoIoeyA+Iqc6IpXYFP+SoXkKiNdkSJXGKSnaf5ac51a3eqOn099hGj16yjZ6dVgE9wEVpQJM/cGj0Eo7SMq12BobdoVBt9wSsijXsBo7A1u0AFtEH5/ygen7crCvL5P/wAm7pOPDv8A3V6dWa7Y4vRl3jfkgvTFil5cKBTqikt3EGgsUUCNQNOKOS37gx9V4/2hY1OosanZA/oppUaALcZqFP37fwvxzn+l+PsjrBn7XFavaRB8FR5OyuVLxdp/kp4/rr8R1SjtKB46yqtHQErYiDxgpWf80qGtP+YQZ+1VC/igE9RXPz9bfwRjfHLHjbyRaiV3yb1l0Wif8sI0vXIaARW8Al8BK3iISP3BPprdo/lVPHYVv+5ANyYCM6MrcAsP/qKhy6iVuLtKpFZ6yKXiCG5BU7dRA8gG/FA1Z+wsVjqo1AU9VAtgJRksiPJ/+xmt+CnxKvZpwnWjZFU48SumFvxR0NTwDqIX1CqcJEH5/wD5T6qviolfECeSBYyQL+UAe3goWwSp/nVWKeuT/IqVtEoxgsVriNKVwUYAtgS//wAiH8kUkdZEGvUCW0Sq8WCxRRreAly7CJScglSs1HLR7dYGvg16I1OJ+qyMdkJ1SMHQKiK1yEVTxQIBrAFsQTnRE77CxnTeKhfRDV0aik6jQWwVP8BkkKwMotUpg1FKz9ho0yDeAn+Uogf6gnbFYqc7DTjT2wdC+iD+SKZGhrgsVjBoJ0DA0APohLIVG3aGo56Geyskt+4i/VIxGzeDQV6gT0ZVojUb8hTAwBIGgUQAUt8kSmgUL4M1xcvduPN5Oj9Nlv5NHh+uurD1DIowAyKnb7yIaMRTQKFsVE7x9hmlEYBFN+Io00SK2n5BHlwZrR1gUYFikYNEsJQjBEuXJWOe0pxpx1xCveWnCddlOsOde7x8i/HiOpvQCewgisgPgqc6IpXtAH9hQvIVEK+jMTusYpOPtP8AKsZ6tbvVHT6a3g0pXojZqYAfkAisgT0QfBUY0Zi1RobT/mhQbYIlbUVqiHjRQt4DWEaMA9OkrCvN5f8A8qzc48Pk/wBrU6pXbHFqMu0H8oRV64ql5MAK9UUluwg00VXxQsaga0/aVHJP7kjneqU/aGpxqdZFjU7IRX0UfVG9Alhmo0/et/C/HOf6W49R1hp7AFe0gYEeTVc9F4u0/wAlPH9dUdR1T9lkPGSo0dRUrojceqK17AM9xGnFQJxFH8RXNzdbfwRjfHLHjbyLU1K75N6y6Kx1RpenVYB6K3gFuURsIWv7gn019gU8bANP7kCtyYCMjNV4RYp/qKhy7CJW4tlUis5KqTh2UIe4qdsED8RG/AUa4gtHVVCmiKeqNOAlHrIjyf8A7Vmt+IfEq9pbcJ1o2UWdPxpXTC/4o6GqKfxUc99QqvCRBn9wFZxRGyBZyQJGAH5QIa3grWwKn+cKxenr6KlfRmjGDU4rXEailcUaACyKl/8A5EU/EVOPRBrgEvolU4gisKrWBLk2ESkuJUbbDUcdKT1HT4avRFnEp1WWjsh9V8HQK6IrXEVSMUCNBrAE4gnOiE5NhYmg/FWS+iGro1FPUaC+AT8BE41XMbI1T0waikCmkUQS/KURv9QTtixip22GnGnnEdPhVRvUDyjYwLFa4NBOgYBgGEJbEEZ7Q1HPTT2Vktv3EW9UhGzfiNBXqBPRlWiNRp7CmAYj5AtwNACKAFvglNApb4FcfL3bjy+To/S9bfyaPDx11YeqDMiiDfIFmPuKPiAxIo7ConYSk8GWBvkD/iNDTUSKziiHKM0a4LDQKeMFJYSlqET5cWOW+JTjTleIV/clpw+uynWHOvdji/HiOpvQCdEEAgU0z9kVOdEPXYBT1QnIIjXJGUrasc6Xi7f8qznq1u8I39NbwbUr1ZbNXFA9QFVZAk6Az1BGNGYrUaG3aANbFEp1BoENGitYGnBA8BTj6yqPN5v/AMqzpOPF5P8Aa1MZrrji1MZd4MdhVq4KXkwGiJisT/qHtO3ZENXRYoqhGoDbFRyz3kY+qU/aGpxqdZFjU7IRX0UfVGAlhmo0/est45Z/0tx6jtDW0ArsgaQqPKrGicOz/JpPG6/xR1T9QPHVRowEuRAOMFa9lB24h5j7CltgN4Dl5utv4IxrjmjIbeWK0SuuT+suisYja1MWA+qMKndBKRC1/cE+mvsCnjwAt+5ADydRUJGVuHBYoKhy7CM1uLZUis4qk4tlCHuKlbBA/EQ34CtRBauKoU7CKeqNOAlGygjyZ/yM1vxD4lXZbeeNH3+Uah+NK6YX8R0GmAfxRC+olV4cIDP7gKzjQjfWQk+gWMAJ7QIa+QKFsClj9yFY+mjbCpX0SjHUWcUpiNRSMFEQLYKkIp+IqUeiGrgEvozVOIWKqrWBLk2ESp3EqVthpx0p+I6Th6dEaiVtVihHYPq3jLoSNVlWmI0rGKF9AZ0AnEE57CE5NhYmg/FWS/Ihq6LFPUbC4E/ERONVz+mtiNU1MGoeNFPIo+AlPZEb/UE7YrFTt405U89Rv4URvUDo2MCxWMGgnQMAwATohbYhUbdoajnpvyVktv3EW9PCNm/EUIwC+iK0RqNPYU8APx8CluI1QMKAEvP2EP4KW2CVx83ZuPL5B+l6T/JpfBx10YeqGkULSJQgAtYPY1n5FlNCKMChePmFZqUYMhINAhvBo3HoRWRUOUYo1wWDAp4wUthCwIny4sc9pWxqOOuIV7y04/XZTrDnXuxxfjxHU3oFnRBBoFNOIqdhKeoHjVCcozUo6iI21Y51uLVZypaf88I39PbwbUr1Rs1MAI0BBpwCeoDPWQRgSK1Ght2gDSCUgAgxP3A04AeAwH48lUedz/8A5VnSceLyf7V48Zrrji9cZrvBjsL9WrP2FLyA0T9o/wDQJ21EGuixT5VWifug1p+yo5Z7yOf1Wv7Q3OBXAanYIrCNDOqjfAFsJUOP9263jln/AFV+PUdoa2gFdAyiXLgxonF9v6lPG6o6o6J+oHjFG8BLkQCgK17KDHcRSY+yqnb7ID+IObm6z/BGNccsZDbyxaiV1yb8mXRWMRtamLAfVARSXBKUZLX9xU+mvsCngUL9oFNydRHPIzVuLBqH+fuKjy7CM1uLZUitsVScPaUIe4qU4IH4iD+Io1xBemKoV7CH9Ua2Aj+UsiXJn/Ks0PwE+JR624QaZKVrJ+PUrphbxHQ9cA3iiF9RKrw4QGe8Ap4olfUC+SISACe0B9NbBQnALX9xWPp47WFRvolGvUIeqNxWMAVAtiCXoHjqKn6IaMAltVmqcSLFYVQsglybAlJcZqVthtyp5xGzxPxVGoS0fP3EpI2FZX8R1hJGVKYLFYwUJ0BkAnEE50QnJ4sZ0H4qhRDUj7ixT1GwuBPxET9VzGcGj1xFh40aPIreCJ/kiN/qKnOKxU7tOVUnqN/CCN6B/EbaqEVjBtp0DAMCN6IW+Co27QsctB6qFt3Rb1SEbN+I0EdRCeiKVRqNOgeBTAS4NUDCgBbT9hDfqFLfBK4+bs3Hl8g/SdJ/k0eDjrqw9cNM/EBaT5+ZGW+RQkRon4FPFhfZomBpp+AS+PuMB8AAh/n7CmoLFJkKjyDFGuDUGNFOKSRCxohOXGo57SnFjjUK95acfrsr1hzr3Y4tTEdD+ilnRG+QNUVrIpfj5gRqz8SItCqnyz8jNS/ERC8/dqOOqPDBTCk9oGz28Rs9Z/yo0auA3z9xR+QCZ+wFiUGtP+UKlCsxSqNDPaBTTH2VE7VlCtFJE9D+hSxvifhFb4n4BvuIbj1Rwc//AOVZuceLyf7UoldMr1xl6I1ewReuEaJyaIHiKWwhqCw4rRoNbFSuWe8jn9Vj9sbCuA1eyEVgab4+4CqFtglQ4v3LLeOWP9Ojj1HZraDV0BBPkVil49KYdEdUdCeoHrijeKJciAURFK6qmjsIr4olyYlBjqK5ubJ/gc9cc0dYbeacVoldcm9R0VjGW1q4sB9UCUVO4iciEj9wZ+mtsDSkChyeAa/QEJGarxYNQ3qKly7Cs1uISK2xWicXaUSKWGkvJEL+IgzgDXEWLU6qNXsCioE4CM9kVLkz/kZofgJ8Tp624xq+osPx6ldMLSjoeMAfFRG2oVXhwg1u8Ar4olyIF8kQsZIFnvAHt1FLIlCn7is/Tf8AckVG+iUaYEPVGorGKo+gFsQS9A8dRU50SnjATvqs1TiFiooWES5NhEpLiVK2w241SchHT4f4/wAiN/EvurAfH3EWjEdIW2BT8eCxWMAJ0BnALOIEnRC8ixNcD4/yqyQQ9BqH9RotxAnqCXz91cxtItPXEah40aODeAn+SI0qJzgxSXac6f8AGBucII3oh/EdGjQVhGo06KYBgSh6IF8CoT2WOemr95VIW3eEW9UhGzT1GmjqBBmnojUG2gauCmAtsECophQELfqFGMFC2KlcfN2ajyeQfpP25/k0vg46qyw9UP8AETopZqJ6LPyqMDIrYqNEyBo+UajClGQEaMBSg1FJBHkGaNcFgxoH8GiSMljQT5Wo5bTtixy0jx9pacY66dYc69uOLVxHU4FnRGgU8BAlGmgG+whqrEJyaM1K32rIl455+/zLTgrxDpk894FNbxGzx1Ro1cAPRTAEgWAa/UKnAzFK4jUGe0CmlUD4+woQgbxQJxAKg0iGosSvO+o//Kn+HSceLy/7Voy65XjGXeNXQi1cGk76IMR9hSWRDUFPP2+FVvn7oNfFRy+2HNav7Y2Hx8CtH2uIrA0HoggW2DNQ4e1v5WueOujj1HZraI1dAZFRvP8Amacr1uPUrWHRHVGyeoqlcUaVEeRBqiHppBSNUP4CXIlBr1IObl9GNOaOsNvNOK0SuuDRqNq1xG1q4KPqgSCd9QJOiJ1+/IM/T32Bo9RW5I/yg0ffjBGRmq8WCw86NIcuwM1uISK26q0Xi7IkUvAqPxohfBDT1FGuCxSvz8faQGkz+oD/ADKo0/PwCNuyCfJgzQ/ALwnG24xvj4mRZ03HrNdMLeo6HjAHxURtqJVeLFGt2RVPFE+RAnkiFgAt2gQ9uo1SDLU/clU+m/7k/wACpcmiVqBk9dRpaMVWALIJeiKR1FStolPGCp31WapxfYIqNBOiJcmwiUl8VKlMfeGnKmrP3+JRZfiniOhJ0Sl9VlWJ+yOka2BTUxCK1mPhVafgGmQLMoEnRC3z7rGdcbxUJYSmrHxA1FIRol+wlC2AjOq501sFpqYiw8SNH8FGMBOewjTgJ2wYpbx/l+WmLw34QNThdED0Q/iOjRoikYjcb7/IGAYEYC3BG2rHOjXFIW0f54QvVJ2IRs058DQeAT4GaeqNQbaBoFGVAlECBTAAFvn/ACFGMFC2KzXFz63Hl8pvo+k/yml8HHVDD1HjBQkGmPkC/pVPRoj4hF9DFYkPTfpgX0MR9hS/H3RCzCoEQAYMqUFikio31WKNcRRro1Dz9oAghY1UT5FjlpO7UctoVvFPn5Vx9+nZSfmlZ/1hzr3eO/8AUWjEdTRoFnRk0QKaZ+BqFmUPZf1fEqntv1Cez0n/ADAXk0RPlxYxtH4+0/wrB+ErWD27QL9NfYRtT8UaNXAD0BFCQLGyAcnUSk8EitevyjTfnAU0qsaMkA8+RDR96gX8UUI0Rp1Q9cErzvqI/wD9q38NzjxeX/alMhK654vEfZl3jUCLVwVO/YBrgpLaIaqKecFaYVAvIlc87YYVj9sba3gofmIpGitH3sAyBb/6DNR4dn+VrnjtXojq19BoAZxRC/ZXO9Nx6layvGI2T1A8Yqj8fZRHkQCPtECKUBSJ+6ocE+TEqhXqDn5fRiuWrbzRemJXXIwjatUbVrH2AVWNIJ2QJ5MiJ07/APAzOnv4NKUgUbx81lQvH0mEEbR9xmq8Y1D2BHk2BmhxaEVnqNJ0+14Gfq18Gko9EIIaeoo0xFitY+ygU7AqqNII31BPk8EpfwIzeE423HLT2ka+n42a3hWNR0P4oPgI27IlV4lGv2QUjqolyIFj0C12QCf9f/Yh7dRaWFQKd5Ehp7z/AAKTljBKWgmTxCNqxH2VRALIJeyIrEfYVG8f5lSm8BO+jNV4xYpArTqCXJsCUl1ZqcT94mVcxtH/APILeqI6E9VkJ7BT+I2a3UGpgRWIFGRAAqBfQLy5CxnXAiflUl/6bkjPgKbwWGjBokx/mlEC2AnMfZWK1sC8NTEWHjRo4owCc9hGkE7ZAxQj70mGmZwa9IFzwI9EhfRD+I6Ro0FYxGo0wAwBoEYC3wEZ1Y50trxSPvML6ZupC8nNSJj/ADR9j0l8mfZbfWU+ftEyv5Z/vC/3379T8p/yBj63/Wsn5X/kf/xTj5q8v2jWbPTpjyTa1WXWGsKIDKgTANGosMKEiFvHzUK1PvUULYrNcf1GS3Hk8o/RdbfyaXwOqY/0Yeoa/MT8Siw0x9hWjEaacBon/KAx9/uoIBANGgWY0QKiQJEpqBFJwEZ+8yMmrg1GroQ18Fpfj/KIEfb5VlK+LHLViHNy1j5iJ+ZbkcN7nxzRH3+6uD0OL9qv8Od6+h4v8xesfMMu5vj4kAiPmwkPGihfYAlqzEiN+j5D036BPRqx8fArX7CJcn3hWNJ2j7/8LGKWvNx8e2X81ieTOS2+sp8/aJlfyl88U4/qY5r/ABFZj7JZ6bx5Zu+nV+LD0jH2iBG9FjA0/EQBIn/NIRr4JS/iB62j9Px8+npfcabRFvn5j7Hqp+oab1/1g9LNRomP07B6P1AmY+PgJYeJ/wAoe43x9xfZYj7yDeyIaojzvqZiv1c/P2+YdJx4/LfW1uP4mv2lK64ssWiPsw7xqx9gikdBU7aBokCWj0Q9e0fwNGt6DaBbaI5+S1aTabT8Qsntx1uZ6H984oiI+Z/o1+Wf+Rk0fVcVoj/N8fyn5rU8+KeOTjtb5i0f1T81v+mb9U/XX/dB6a/UaOSsT97RH/J6T9yNPLx7Nq/1PSfvP/qV/qeGNvC/msa8uZ9L9LeOSL2rH2iTU9M+Lc17dFJ+8svQNgCugNpVKhyasctDx6ldMOiMGyT2QPkSKMz9lEboDOCG49VFYA0YonyR9koWvVFQ5N/4GK4qc9fn4n7Onp4p5J7/AO3TSYmvzE/LNj0Y1LP+jI6K0RqL1xVYAFTvqInf7cciXha/a4kPf7zEf+xfpon4mRofn5kJQp9v1QqJWRKpxiw9xUb7H8jNbj2Aikz9hot/j/LMDNPM/MDScR9pAvx8SMjOCmpgRWmChWP8wVRUaQRtPzKJ7T5PBKS0/wD8axnV/wCnDH1F4n7fDp6eH+lV4eab2+LR8SWOmPJ7v/bq4/tLnXqyrHaEdD2xVN8f5QRn72Rmn4tlQ1o+bIHjqonftAhJ+1/hFoflIFnr/wAiGn71FoYrPuRKebjpP3vESv5rn/XM7S/3vjmZ+ZX8s/3yP/XpyZbw/NanlzTU1mt5PA0rWRTSKSdRCf6geJ+wpOSPv8iUZ8BO/ZUqnGClRWnUEuTRmpcs/FZn/SFjO76ntxf9fk/9OnqPF/XRv7zf2Ik9L/WrV+rrPb5hPy6588+nryUtb5i0J6rpPJmjOo3aaJRYf8Roa5AKxgN4AAE78AX1BH6mZjjmY2Fjn5L6ntx1+p5I/wBJdPUeOeXUPH1k/H+av9D8t/3v1Wv1fH8RE/MJ+W558/VK/VcX+5PzXSebH/o/9WkxPxaE9Vr+mf8A0bTE1j4Rr3LE5xWfjTgGposPGoqg0wJz2EaQQ55mvFMxqzrj5L6y5Y5+Svrp6eSeTUPX6qYj4mv9E9NzzWKV+ppO/b+U/LpPNDxatsmJT03+pVPEdJW+BVIyEag/ADADAMIW4lcP1fJatorWfj5hvMebzas/6jl1t5ut+lAf0h6H4D03wKfivPHb5hL/ANtZ1c3/AKdNPq6x2iWfy9E88+n/AL1xT7Kfmt/2yb+9cXx2PzV/rn/1v71xb+o/NP65/wDQn6vh/wB2H5p/bLf3zij7/J+an9swP77xf+/6H5p/fIf37j/9/wBF/NP+RlO31tZ+0Vk/LF/+iNH1tY/GT8n/ACI0/WxMfasr+Uv/ANH/APHNy8tuTz4hqT08+t3R/p+b/pfMTHzEpZ7b8e/w6Y+tpH2+JZ/Lv/yIP994p8n+h+Wv+Rlp+t4/9J/oflP+Rks/XV+J+Kyfg/5M/wDCz9dPlF/DF/8Apv8A4X++3+PiKwfmJ/yK0fW3j8YPzD/k6H+/X+esH5i/8nX/AIMfXW/2H5i/8m/+D/fv/wCifg/5P/8ABj6ys7WYPw1P/pitOfjt+UM/mumfLmn+0x9pRv3KNYF9nn5+AtT+PtKs+2raKx95PR+pCzz8VZj5vH2X81j+uYS31vH58yv5Yv8A9GU7fXRMfFaf/V/LF/8Ao/8AIlb6rknPiF9Rzvm1UrWvftaZVzureh+kT0aID06+Dkr+iK2n4mGNR6/FuSeq6K2r8doZ9PR+oP6q/wC6D0v6gf8AVpW33vH9T1Wf6ZnaFvquL/fC/mp/bE+hP1fDP5H5qf3x/wCh/fOGfj/Mfmp/fAx9Vw/7oPzWv74/9NH1HFP2/XCfmr/XF+njk45n7Xj+p6q/vP8A6lf6niifveF/Nc75cz65+T6un3isTLUy5a88+Oe/Nfk9+I/9LJI4a8l0n8K5miBVOG//AEuSLfHylntrGvzfbsj67j+PiazDP4euf/RBn63h/wD7fb/0fk/vks/XcUT9otP/AAfk/wCRmB/f6f7bH4P+TkJ+vrP4Sfhm/wD0z/wk/XT5T/6v4Z/5N/8ACW+s5LZWIPzGb/8ARqp25uW22lfUc75NX6T5tOzP9VZ91vif9ZEb7/6yHsY+fJn+oe636r/7p/qL+r/6P/U5P99v6i/vX/oxzcsZyWPUX+mv/TR9TzR+aeo1/bc+mj6zmifn5if+D8xZ59nj67mjyp+Yv/I05+W9uW82tsrxy1q6vuhWbVn/ACzMDMtnFa/Vc1fYn+U9R1nm3FqfX/Han9JT8uk/+i/Yp/iHH+n4/TZPw3/yInf6+s5ST8Jf/pn/AIX+/wA+ccf1X8xn/k3/AMLb63knIiF/MYvn0Sfqeafy+P4g9Rm+bf8A6H945v8AfJ6h/Xf/AKMfU8/+89Q/rv8A9afqeeZ7nqF8u79Tn9Vp+bTMz/7Vi+71v0iN8AHwDfAN8A36Qb9IOz6DkrSLUvPx8z8xLNnt38Opm/8AbuiImfmJj7ufp7pqVpmP9YX0WyEnkpWJ+bR/U9Vm+TM+pcn1fFE9vn+GvzXPXmxHPyfV/qmf0V32WpI8+vN74r9FyfP6v+paPn5Z1HXwb77dn6q/HaGfT0/qJ35eOLR/nj+p6qf0zPpLfV8PzP8AnhfzWf7Y/wDWj6vi+/8Amg/NSebH/o/9bjvH2vCfmtf1zfp/mJiPvB6b9w0faZBSAPHq+mbqQnL/AJaz8zERB6rP7iE83HSPveP6klW+TM+ubl+r44j/AC/5pWZcNefPxw/Ez923kpqzak/NZmAls46OL6n7xHJ/Vm5d8ea8rtp8WiJiYlj09c1LFq/PxA17GYmRQ+PgPafxsoJctorT/NMRCye2Nak65b/VxFp/RX5bmXm1/wDR/wB/9En6vkmfmIiF/MY/vos/Ucsz2/8Ah6jH9d36MfU80fl/8PUWebc+nr9ZyRPzMRJ+Y3PPqK8f1FeT7ZP+ks3Pp1x5pr/qumvjD0Smt94FR5bRSPm0/EQsntz1qZ65LfV2+f8AJH2/1luZeXXnvwP73y/6wv5jP99jH1nJ7ESfmL/yNHr9dMR8TT+ifluf/T67DV+spk/MJ+G5/wDRn6pHNx3y0J+a3PLm/T/MTkwz6df1KekCq8f2+SK3x91Q4BbBKjMfaUE+SYrETafiIWT2zrUnXHzfU/qrNeOPt/rLcz6eTyeb3/1EP0y087fExP2+0gtT6q1O0fKXLtjz3PV6/X0+Y+az9mfy7T/6YpH13DMfEz8f8H5rf/Iwev1fFMfH64T81uebH/rResz81tEn5S+SfFOOfvKempqU3ovuHU9+yWj/ADIz79VK/JSLfe0R7q+i+Se0b/VcUWmf1fP8L+a53z5iVvrY/Cn9V/Lnf/o/8iVvq+Wc+I/hfzHO+fVTte9+1pVzutXpf0jLfpD03xMAvx/UzTtHz/7S5dsea56vX6vinfmGfy7zz5Vj6nh+3+eD81r+2f8A00fU8X++E/Nanlz/AOlt9TxR+cH5qXzYn1G31lI+f0xMr+XO/wD0T4T++2/2fZfyx/yb/wCN/fvnaH5X/k//AMPH1lJn7xMJ+Wp/9EN/1+O+Wj5T81v+ub9V4rR86elzuVXPlPTf6jSej9RLlvWv3taIPVZ1qTrk5ueOSP00j7f6tzPp5vJ5f1/1EP0q4emmq+z0H6T2npv0h6GL3rlpFmrFI+ovGxEp+Y6TzailfrI+Pi1JT8uk/wDo/wDYev1fF7Mwn5rc8+Vq/VcPx97wn5rf9s/+m/vPD/5IPzV/rn/0J+p4v/JB+an9c/8ApJ+r4Y/P5X81P7ZJb63jjrEyflm+fPxDl57csfHx8Qsnpx35br/pL9LTl6b9Mh6D9Inppj/0HoP0h6GJtXraQlsUr9TePtaPmE9R0nl1Fa/UcdvtM/H8p+XaeaXq1PiZ+0xLPp1mpTxCNqDTSBJ0QLTFY+ZmIj/2ekupOuTn5YvH6aZ7Lcnp5fJ5P1PUR/Q04egmgeizUT03x8YAxyclctIs1qKR9TyR/pKfmNzzah6/W2jap+W5/wDRf/Dx9dHtJPy1/wAj/wDhv79T/bKflr/kRv79T/bJ+T/kQf7/AEiOtj8p/wAiFt9d89af1X8s3z/+OW1rclptafurjbdX3Q/SrPpvhFH4BvgVv0iN8AHwqB8CN8A3wDfAN8A3wDfpBvgG+Ab4AYgX03wK3wI3wHpvgPTfAN+kPTfAem+AH4RfTfpD036VT03wHpvgBra1eszAs1ZxWv1XLEeSn5jpPNqNP1fN/wCv6HqH9tJ25+W22n/hfTF3qkn5nZkZ90P0gP6Q9D8B6b4AfgPQ/CKMQKIFlULMCB+kB/SDfpBpj/0AfAN8A3wDfpBv0h6H9IDEC+h/Si+m/SHoJj4VA+BG+A9N8B6b4D03wHoYj5+wem+BfQ/CHpvgPQfAem+F9npvgPTfAB8B6b4E9N8AIvpvgG+A9N8CemiA9N9g9D8QDfEA3xAN8QL6b4Q9N8KehiIAPhFN+kPQTQPQTAN8Cem/SHpv0qGisAaKRMI1J7b9Foy0ntfzYE0tO2k9n5rf9I9p+W/6Z7Py00D0E1+BPTfCp/2T9MeiN+mAb4gPQfAGj9UZaY/5F92G/XyRH2vb+os3r/0P+ry/+S39Q/ev/Q/6nJ/5Lf1E92h8/Mfe1p/5VP8Atv01Q/7GKwKeIRfTTB7PRJhfaemibV6zMfxIe7D1+o5o+PjksNfvX/pv71zz/wByT1F/rv8A9Cfqeb/ySeof13/6Webltt5P+k/pq/S7PzaZkZvutWI9D0eKx/oi+m/Qez03/T+RfTf9MPRZp8SrI/8AV5aZefgam9T6M8/NP5ynqL/Tf/pJi1p+bTM/yrHu3oxT/wBJ7WQf+me1/Lf9P4E9B+n/ANHtPRZhfZ6D4gT00TMZMwHuw9eflrl5PUbnk1Pp6/W81fYlPzG559xSP7R5Y2tZPzGv+RoY/tK//jj+p+Yf8jTf4lyT/wBup+Yn/I0nf63mtn6a/wAH5iXz6qNrXvP+a0yrldW9GsISHiIGvQWrAWE+F9s+g+A9N+k9p6Cah6aI+M+wGi96z9rz/UWasNH1HNGXkX+mv/Tf3zn/AN56WeXU+kty8l+15kS71fpPgZb4AfgPQ/CL6GKi+jRQX0P6YF9NaPse09JzVWfQfAnoPgDT8eRECem+BfTB6GZmaxWcifk9noD2voJgT0EwHoY+YyZgP+4McnJGXt/UX9Vv+pyTt7f1D9UN37yJ01YRZD/8DTT8f6Iem+P/AEp6D4j/AEPaegn4/wBqp6Cf4E9B9v8AQ9noJ/gT0Hx/6D03wDfArfAehgPSlfhGob4Gm+EPTfpU9N+kPRZqJ6CaB6LNVZ9FmBPTR81yZj+A/wC4aOflrl5/5PUam9T6pH1nNHsf0T1Gv7aH++83xP2j+h+Yv99Ft9Ty2/L4/iD1Evl1U5mbT/mtM/yrHu3p6iw3wij4Hoswez0H6YE9BNRPRfhT0HwJ6b4D03wJ6b4g9npvg9r6b4D0eI+yNQRQ+A9G+EX0PwHpvgPRbR9lSwgywMHpg9N8KemQ9MDAwN8AwogMQDfAem+A9N8B6b4D03wi+h/SHof0i+m/SHof0B6b9IegmonoPhU9BIgfAem+A9N8B6b4AfgX0Px/6RfTfpD0MVD0Px8B6CQ9BEgMgCoHwHpviQ9D8Sh6b4lT0HxIeg+BPTKB8AIDCAi+hqNSGQ9D8C+iTX5VmwP0iem/SHof0h6b9Iem/Sez036fue19N+lD0MVPbX5H9Iflv0h+W/SH5D9J7T0H6f8A0J6aar7PQfpE9B8B6b4BoA36fsi+mmq+z0H6RPTfAnoPgX0P6T2eh/TJ7X0MVT2v5GKi/lv0h+W/TAflvgPQjXpg9N8QJ6D9In5b9Ifkf0h+Q+A9DUXJ0bCQZUYCyMVpj5D0H6RPyH6D2flv0HtfyP6D2n5CaKn5D9J7T036Q9B+kPQfAem/SHoYrJ7PRoj4F9NCKaBYEx8h6CaKz6D9EntPTfpmD2em/TJ7PTfokX036Q9GiEakEX0MDXoY+wem+RPRZ+4lhf0r7Y/LfpPZ+WiPg9n5NCNyCNemE9MHos1gZ/JZovtn0Waiei/Cp6b4D03wHpvgT03wHofg9r6GtU9rIf4+IRr00AwN+n5D036A/ITRT8h+iT2noP0Ceg/SJ6b9Iem/Sp6b4BohD0b4+RfQxVF9G+Br0wemgBFCQD4GfTfpX2eg/Qe0/LfoPZ+W/Qez00VPZ6H9KNemmp7T0E1X2noJqJYWaqnpvhD03/CnoYqi+jRHwiyDAoiiKAAJY0wJ6D9Ieg/SvtPQfpE9N+kPTfpD0H6Q9D+kPRoj4RqGGmEEVhWECQ9B8CeizVWfRf0iem+FT0H6Q9N8B6b4D0aKovo0R8DXoQHwAQAB0A+IU9N+lD0H6FPQfoE9N+gPTfoD0P6T2emFEG9QEURWAJwZpfhUD4E9N+kG/SDfAN+kX0P6Q9N+kPQfpD0MVRfQ/pD0WyoahVhvhGvTfAnpvgX03wHpvhF9CDCsA/AN8ACp6b4E9BNRLC/oE9N+gPTfpD0MVF9D8B6H4RfTfAemAJVKWRG+BDDXofgX03wHpvgPTfCL6b4D03wp+Q/SJ+W/Qe0/LfoPZ+Q/Qe0/Lfp+A9AAwKYGFH4F9N8Ceg+BfQ/AemmA9B8B6aYQ9MAwKwo/AMAfAjfAem+A9B8KnpvgS5b9In5JMfEjPo0DUMNN8Ceg/SHpvgPTfCL6ZUGEaH4Fb4D0EiFGTQNMoyAigA/ABIlCFZhoRtpBoBgLKsUYFg/CNeg9E9D8C+m+A9B8Cem+A9N8B6H9J7Py36RPyEwp+W+EX0EwM2F+FZNA1GF9DEIvo3wHoPgX03wHoPgT0E4JYHoDIowKwMoAg/AemmEPRZEGAgjTKjACHplT03wHoP0Qe0/Lf9OD2fhv+nB7T8N/04Paflv0Qe1/LfpgPy3wL6aQCBkQGBqCK3wK3wHoPgZsD9In5aaKn5D9B7PQfoPaeh/Si+h+BfTfAoisI0BGFCRK0BBFEX03wHoJE9MHphWEYPQfAlb9Inpv0wez8t+kPy3wHpgABgBGgEYBj7B6YX03wJ6b4F9N8Cem+A9N8B6D4D00wHpgYQRWFYGkQojfANEAPwHpv0/+j2eg/R/6E9N+kPQ/AofEg33VB8Bv+AD4/wDSA/ArfAD8Ct8A3x/6BvgG+P8A0DTAhZrP+ggfpn/RT29Cv9nVtWJ/XP3j5xv8Of7H/Dq/H7n/AMPwf0NH9m8fx9+Wfn+D8H9An+zoiPtdPwv9Gj+zazH35Pv/AAv4T+hv8Mp/5J/ov4P6Fn+zqxPf/wCJ+D+jf4ZH/k/+H4P6NH9mff73+38H4P6DP9mR5yf/AA/B/QI/sz5j9z/4n4X+gT/Zsx+f/wAPwf0NH9mxP/c/+L+E/oE/2bXzk/8Aifhf6D/htYn9z/4fg/o3+HcfxPzyT8/wfiH7of4ZxTP35Lf8Qv5T9U0f2ZxRnJb+h+Sbsb/DqTP25J/on4X+jT/Z1POSf6H4X+jT/ZtIj9yf6H5P6Uf8Np/5P/ifk/pWj+zKzPx/1J/ov5P6Vv8ADeP/AMk/0Pyf0o1/s3j+f83Jb4/g/B/Sm/wzi+P3Lf0Pwf0pf8Np/vn+ifg/pW/w3j/8k/0X8H9a3+G8fz+5b+i/g/pWj+zeL4+/Jb+h+E/pWn+zeP5+15/ofg/pSz/Z9I/Of6H4P6jH9nUn85/ofzP60P8ADaTPefj+E/B/Q3+Gcfz3n+h+D+lb/DKR+c/0Pwf0oT/Z1Pn7Xn4/hf5n9a0f2bSZ7z/RPwf0oz/ZvH8d7f0Pwf0of4Zx/wDkn5/g/CfutP8AZXH/AOSfj+D8H7ox/ZfD/vt/Rfwn6po/szg+Y/8A5bfH8H4X+lG39mcP4ctp/mE/DU8lCP7M4/n9yf6H4P60lv7NpFvj/qT8fwTB/Rp/s/j8vP8ARf5p/Wt/h9P90p+D+tb/AA+nz3lfwf1o/wCHcf8AvlPwf1of4dT57z8H4P6U1f7O4/bWX8H9a0f2bx/P3vb4T8H9KE/2XxzP2vb4/hfwn9K0/wBlcf8Avt/RPwfut/hVPL2/ov4P3W/wuv8A5J/ofg/pR/wyn++T8L/StH9m0/3z/Q/mf1rR/ZtZjtPyfzP61v8ADK/75P5n9aH+Gx/vn4/g/mf1rT/Zsf75/ofzP60P8Nj/AHT/AEP5n9aP+GV+O8/0P5p/Wh/hdf8AfP8AQ/mf1ox/Zlf98/0P5r/WjP8AZlfLz/Q/mf1rf4ZX28/0P5n9aH+GV/8AJMf8H8z+1NX+y+Od5Zj/AIP5p/ajb+y+P7fp5Jn/AIX+Z/ahH9mVmZ+eSY/4T+Z/at/hnHG8kz/wv8z+1Cf7N4/v8Xn+h/M/rR/wzj/8lv6H8z+tJP8AZVZn7ck/H8H82f6Uf8LrH/cn+h/Nf6BP9m1j/uT/AET+a/1v/hf8Pr/vn+h/Nf6m/wAOr/vn+h/M/t//ABv8Mr/5J/ofzT+1b/DY+f3J+P4P5r/YY/synvJP9D+af2rT/ZtPOSf6H8z+1H/Daff55J/9fY/kv96H+G085J/ofyP7Vv8ADae8k/0X+Sf2rf4Xx/8Aln+h/JP60Z/szi+PtyT8/wDuD+a/2of4ZT5+3LPx/CfzX+1/8af7MrH3/wCr/wDD+Z/aln+z6xnJ/wDD+Z/b/wDgf4fEz+5/8T+a/wBh/wAOr/5f/i/zP7f/AMb/AAyP/L/8P5p/Vo/suP8Ay/8Aw/mn9TR/ZkfH7v8A8P5r/YP8Mj3l/wDh/M/s3+G1+f3f/h/M/s0f2dWfn/8Ak/8Ah/M/s3+GV/8AL/8AD+af1ox/Zlf/AC//AA/mTzVv8Nr/AOT/AOH81/vR/wAMpP8A3Z/ofzP7UJ/s2sT+5/8AD+Z/et/h1fj9z/4fzP7X/wAD/Dqz/wB3/wCH8z+1H/Da/wDl/wDh/M/tf/B/w2n/AJf/AIfzP7X/AMD/AA6vvJ/8P5n9q3+H0/8AJ/8AD+Z/at/h1PeT/wCH8z+1b/Da/wDkn+h/M/tQn+zK/wDkn+h/NP61v8L4/wDyT/Q/mn9K0f2XX/fPwfzP6m/wzij/ALlvn+D+a/1oT/Z3HE/bkt/Q/mf1of3Hj/3z/Q/mv9qEfQ8fx97z8/wfzP7UI+ip895/on81/tTR9BxTvJb+i/zT+tb/AA/h+Lf57/Pn2P5p/Wlj+zqfHef6H8z+oz/Z3H/vn+h/M/rQ/wAPr895+P4P5n9qP9wp/vk/C/1pf7hX/fP9E/B/Wt/cK/75/ov4P61v7jWPzn+ifg/rWn6Gn+6f6H8z+tD+40/3T/Q/B/Wj/cafP2vP9F/B/Wt/cqf7pT8H9a39xp/vlfwf1rT9FT/fJ+D+tD+5U/3Sn4P61v7lT/fJ+D+tb+40/wB8/wBD8H9aP9yp8d5Pwf1rR9HSPyk/B/Wmj6PinbWhPwf1oT9HxeWsv4P60P7nx/7pPwf1rf3Lj/3W/ofg/rQt9Fx/7rf0Pwf0oR9FT/dJ+D+lH+48f+6x+E/db+5cf+6T8H9K39zp/uk/B/St/c6z8/FpPwv9aaPo+P21iYP61v7nx/7rH4P60s/R8f8ArY/B/SjH0nH7Nj8H9K3904v9bH4P6Vv7nx/7pPwf0of3On+6x+T+lb+50/3WPyf0rf3Pj/1sfg/pWj6Pj9mx+T90f7pxf62Pwf0of3Pi/wBbH5P6UY+k4v8AWx+U/pW/unH/AKyflf6Vv7pxezJ+E/pSz9LxxP5H4X+lH+7cf/8AY/B/St/dafPp+D+lH+68f/s/EP6UP7rx/wDs/EP6UP7rx/Hp+If0rf3bj/8AZ+T+lD+7cf8A7Pyf0o/3bj/9n5h/St/duP8A0n+p+U/pW/u/FMfaJ/qfk/db+78X+k/1PxD+lD+7U/8AZ+Yf0rT9Px/6T/U/EP3Q/u/H7E/1PzD90P7tT59PzD91v7vT/wBn5P3Rrwcfx8T8r+T90f7rx/6yz+V/dGPpOL39S/mH7o/3bijyf6p+Yfut/d+L/bP9T8w/db/ocf8At/8Aq+ofvTf9Hj/2z/U/MP3Wni4/9qfmH7oRxcf+1fzD90f+nx/+M/MT9Vv+lx/PQ9Q/VD/pcf8Asg/MP1W/6fHP4Qeofqh/0+OPwg9Q/Vb/AKdP9kHqH6o/op/sg9Q/VaaUn8IPUP1QmlP9kHqJ+qE8Vf8AbB6h7oxWsfhX+h6h7rfor/tg9Q/Vb9Ff9sHqL+q36K/PSp6h+q3xEfhX+h/0nutMx8/P6Kf0P+j3TfMfHWv9D/o90f1/EdaT8f8A9Q9ktb5+ftH3/wDQe6HzkfEf0T1D3TRaY8r/AEX0BMzM5H9D0B8/E/PxH9D1D3SzeLT8zNf/AIej208lYj5max/Q9Hss8vH8d6f1g/6PdNX6mlP+5x//ACT1D3Qn6rimfven9D1D2E/V8Mfb9cf0PR7L/e+H/fH9JD2H984fjZ/oIE/WcPx+U/8AAP/Z";
					newimg.onclick = function(){ document.body.removeChild(newimg); };
					document.body.appendChild(newimg);
				}
			}
		} // end easter eggs
	}

	// Video hover
	var htimer;
	var hoveractionover = function(){
		htimer = window.setTimeout(function(){
			var blackon = $("stefanvdlightareoff1");
			if(!blackon){ chrome.runtime.sendMessage({name: "automatic"}); }
		}, hovervideoamount * 1000);
	};

	var hoveractionout = function(){
		window.clearTimeout(htimer);
		var blackon = $("stefanvdlightareoff1");
		if(blackon){ chrome.runtime.sendMessage({name: "automatic"}); }
	};

	function runhovervideocheck(){
		if(hovervideo == true){
			var hvids = document.getElementsByTagName("video");
			var i;
			var l = hvids.length;
			for(i = 0; i < l; i++){
				hvids.item(i).addEventListener("pointerover", hoveractionover);
				hvids.item(i).addEventListener("pointerout", hoveractionout);
			}
		}
	}
	runhovervideocheck();

	// eye protection
	function eyeprotection(){
		// normal use only enabled -> do nothing

		// normal use -> only screensaver is enabled with a value for nighttime (true or false)
		if((ecosaver == true) && (eyen == true)){ chrome.runtime.sendMessage({name: "automatic"}); }

		if(eyea == true){ chrome.runtime.sendMessage({name: "automatic"}); }else if(eyealist == true){
			var currenturl = window.location.protocol + "//" + window.location.host;
			var eyerabbit = false;
			if(typeof excludedDomains == "string"){
				excludedDomains = JSON.parse(excludedDomains);
				var eyebuf = [];
				var domain;
				for(domain in excludedDomains)
					eyebuf.push(domain);
				eyebuf.sort();
				var i;
				var l = eyebuf.length;
				for(i = 0; i < l; i++){
					if(eyechecklistwhite == true){
						if(eyebuf[i].includes("*")){
							// regex test
							if(checkregdomaininside(eyebuf[i], currenturl) == true){
								chrome.runtime.sendMessage({name: "automatic"});
							}
						}else{
							// regular text
							if(currenturl == eyebuf[i]){ chrome.runtime.sendMessage({name: "automatic"}); }
						}
					}else if(eyechecklistblack == true){
						if(eyebuf[i].includes("*")){
							// regex test
							if(checkregdomaininside(eyebuf[i], currenturl) == true){
								eyerabbit = true;
							}
						}else{
							// regular text
							if(currenturl == eyebuf[i]){ eyerabbit = true; }
						}
					}
				}
			}
			if(eyechecklistblack == true){
				if(eyerabbit == false){ chrome.runtime.sendMessage({name: "automatic"}); }
			}
		}
	}

	var screenactiondone = false;

	var centralmove = false;
	var centralkey = false;
	var centralscroll = false;
	//---
	function checkforscreensaver(){
		if(centralmove == false && centralkey == false && centralscroll == false){
			if(screenactiondone != true){
				var blackon = $("stefanvdlightareoff1");
				if(blackon == null){
					screenactiondone = true;
					eyeprotection();
				//	outscreensaver();
				}
			}
		}else{
		// keep the lights on
		}
	}
	//---
	var ecothreadmove;
	function movemouseStopped(){
		centralmove = false;
		checkforscreensaver();
	}

	var ecomousemove = function(){
		centralmove = true;

		var blackon = $("stefanvdlightareoff1");
		if(blackon){
		// remove the dark layer, and see back the regular page
			if(screenactiondone == true){
				screenactiondone = false; eyeprotection(); eyedojob();
			}
		}else{
			screenactiondone = false;
		}

		window.clearTimeout(ecothreadmove);
		ecothreadmove = window.setTimeout(movemouseStopped, ecosavertime * 1000);
	};
	//--
	var ecothreadkey;
	function keymouseStopped(){
		centralkey = false;
		checkforscreensaver();
	}

	var ecomousekey = function(){
		centralkey = true;

		var blackon = $("stefanvdlightareoff1");
		if(blackon){
		// remove the dark layer, and see back the regular page
			if(screenactiondone == true){
				screenactiondone = false; eyeprotection(); eyedojob();
			}
		}else{
			screenactiondone = false;
		}

		window.clearTimeout(ecothreadkey);
		ecothreadkey = window.setTimeout(keymouseStopped, ecosavertime * 1000);
	};
	//--
	var ecothreadscroll;
	function scrollmouseStopped(){
		centralkey = false;
		checkforscreensaver();
	}

	var ecomousescroll = function(){
		centralkey = true;

		var blackon = $("stefanvdlightareoff1");
		if(blackon){
		// remove the dark layer, and see back the regular page
			if(screenactiondone == true){
				screenactiondone = false; eyeprotection(); eyedojob();
			}
		}else{
			screenactiondone = false;
		}

		window.clearTimeout(ecothreadscroll);
		ecothreadscroll = window.setTimeout(scrollmouseStopped, ecosavertime * 1000);
	};

	function eyedojob(){
		if(ecosaver == true){
			window.addEventListener("pointermove", ecomousemove);
			window.addEventListener("keydown", ecomousekey);
			window.addEventListener("wheel", ecomousescroll);
		}else{ eyeprotection(); }
	}

	function returntimetoseconds(a){
		return a.split(":")[0] * 3600 + a.split(":")[1] * 60;
	}

	// night time
	function gonighttime(){
		if(nighttime == true){ // yes night time
			var now = new Date(); var hours = now.getHours(); var minutes = now.getMinutes(); var gettime = hours + ":" + minutes;
			var gettimesecond = gettime.split(":")[0] * 3600 + gettime.split(":")[1] * 60;

			var seconds1 = returntimetoseconds(begintime);
			var seconds2 = returntimetoseconds(endtime);

			// example
			// if begintime set 10:00 but endtime is 18:00
			// then do this
			if(seconds1 <= seconds2){ // default for user
				if((seconds1 <= gettimesecond) && (gettimesecond <= seconds2)){ eyedojob(); }
			}else if(seconds1 > seconds2){
				var getotherdaypart = 86400; // ... to 24:00 end
				var getothernightpart = 0; // start from 0:00 to seconds2 (example 11:00)

				if((seconds1 <= gettimesecond) && (gettimesecond <= getotherdaypart)){ // 13 -> 24
					eyedojob();
				}else if((getothernightpart <= gettimesecond) && (gettimesecond <= seconds2)){ // 0 -> 11
					eyedojob();
				}
			}

		}else{ eyedojob(); } // no night time
	}
	gonighttime();

	// ambilight time
	function runambilight(){
		if(ambilight == true){
			if(atmosphereonly == true){
				var currenturl = window.location.protocol + "//" + window.location.host;
				if(typeof atmosphereDomains == "string"){
					atmosphereDomains = JSON.parse(atmosphereDomains);
					var albuf = [];
					var domain;
					for(domain in atmosphereDomains)
						albuf.push(domain);
					albuf.sort();
					var i;
					var l = albuf.length;
					for(i = 0; i < l; i++){
						if(albuf[i].includes("*")){
							// regex test
							if(checkregdomaininside(albuf[i], currenturl) == true){
								ambilightfunction();
							}
						}else{
							// regular text
							if(currenturl == albuf[i]){ ambilightfunction(); }
						}
					}
				}
			}else{ ambilightfunction(); }
		}
	}
	runambilight();

	function fixyoutubeatmos(){
		if(window.location.href.match(/((http:\/\/(.*youtube\.com\/.*))|(https:\/\/(.*youtube\.com\/.*)))/i)){
			var youtubewatchplayershadow = $("watch-player"); // YouTube video page
			if(youtubewatchplayershadow){ youtubewatchplayershadow.style.overflow = "visible"; } // show the overflow out the video element
			var youtubevideoplayershadow = $("video-player"); // YouTube video page
			if(youtubevideoplayershadow){ youtubevideoplayershadow.style.overflow = "visible"; } // show the overflow out the video element
			var youtubewatchvideoshadow = $("watch-video"); // YouTube video page
			if(youtubewatchvideoshadow){ youtubewatchvideoshadow.style.overflow = "visible"; } // show the overflow out the video element
			var youtubewindow = $("watch-player") || $("watch7-player") || $("player-api");
			if(youtubewindow){ youtubewindow.classList.add("stefanvdvideocontrolsitem"); }
			var youtubemovieplayer = $("movie_player"); // YouTube video page
			if(youtubemovieplayer){ youtubemovieplayer.style.overflow = "hidden"; youtubemovieplayer.classList.add("stefanvdvideocontrolsitem"); } // show the overflow out the video element
			var youtubeplayer = $("player"); // YouTube video page
			if(youtubeplayer){ youtubeplayer.style.overflow = "visible"; }
			var youtubeplayercontainerid = $("player-container-id"); // YouTube video page
			if(youtubeplayercontainerid){ youtubeplayercontainerid.style.overflow = "visible"; }
			var ytdwatch = document.getElementsByTagName("ytd-watch")[0];
			if(ytdwatch){ ytdwatch.style.overflow = "visible"; } // show the overflow out the video element
			var ytdpagemanager = document.getElementsByTagName("ytd-page-manager")[0];
			if(ytdpagemanager){ ytdpagemanager.style.overflow = "visible"; } // show the overflow out the video element
		}
	}

	function subDomain(url){
	// IF THERE, REMOVE WHITE SPACE FROM BOTH ENDS
		url = url.replace(new RegExp(/^\s+/), ""); // START
		url = url.replace(new RegExp(/\s+$/), ""); // END
		// IF FOUND, CONVERT BACK SLASHES TO FORWARD SLASHES
		url = url.replace(new RegExp(/\\/g), "/");
		// IF THERE, REMOVES "http://", "https://" or "ftp://" FROM THE START
		url = url.replace(new RegExp(/^http:\/\/|^https:\/\/|^ftp:\/\//i), "");
		// IF THERE, REMOVES "www." FROM THE START OF THE STRING
		url = url.replace(new RegExp(/^www\./i), "");
		// REMOVE COMPLETE STRING FROM FIRST FORWARD SLASH ON
		url = url.replace(new RegExp(/\/(.*)/), "");
		// REMOVES ".??.??" OR ".???.??" FROM END - e.g. ".CO.UK", ".COM.AU"
		if(url.match(new RegExp(/\.[a-z]{2,3}\.[a-z]{2}$/i))){
			url = url.replace(new RegExp(/\.[a-z]{2,3}\.[a-z]{2}$/i), "");
			// REMOVES ".??" or ".???" or ".????" FROM END - e.g. ".US", ".COM", ".INFO"
		}else if(url.match(new RegExp(/\.[a-z]{2,4}$/i))){
			url = url.replace(new RegExp(/\.[a-z]{2,4}$/i), "");
		}
		// CHECK TO SEE IF THERE IS A DOT "." LEFT IN THE STRING
		var subDomain = (url.match(new RegExp(/\./g))) ? true : false;

		return(subDomain);
	}

	var requestId = 0;
	var stop = false;
	// var frameCount = 0;
	// var fps, startTime;
	var fpsInterval, now, then, elapsed;
	var countA = [], countB = [], countC = []; // start from zero (blur spread) and size (left right top under) position

	function stopAnimation(){
		window.cancelAnimationFrame(requestId);
	}

	function startAnimating(fps){
		fpsInterval = 1000 / fps;
		then = window.performance.now();
		// startTime = then;
		// console.log(startTime);
		animate();
	}

	function atmostotlmode(){
		if(atmosontotlmode == true){
			if($("stefanvdlightareoff1")){
				totlmode = true;
			}else{
				totlmode = false;
			}
		}else{
			totlmode = true;
		}
	}

	var totlmode = false;
	function animate(){
		// stop
		if(stop){ return; }

		// use only for "vivi mode" and "atmosfpsauto" are both enabled
		if(atmosfpsauto == true && atmosvivid == true){
			atmostotlmode();
			if(document.visibilityState === "visible"){
				var htmlplayer = document.getElementsByTagName("video") || null;
				var playerid = null, item = null;
				var j;
				var l = htmlplayer.length;
				for(j = 0; j < l; j++){
					if(htmlplayer[j].play || htmlplayer[j].paused){
						playerid = htmlplayer[j];
						item = j + 1;
						drawAtmos(playerid, item, totlmode);
						htmlplayer[j].requestVideoFrameCallback(animate);
					}
				}
			}

			// YouTube flash detect play
			fixyoutubeatmos();
		}else{
			// request another frame
			requestId = window.requestAnimFrame(animate);

			// calc elapsed time since last loop
			now = window.performance.now();
			elapsed = now - then;

			// if enough time has elapsed, draw the next frame
			if(elapsed > fpsInterval){

				// Get ready for next frame by setting then=now, but...
				// Also, adjust for fpsInterval not being multiple of 16.67
				then = now - (elapsed % fpsInterval);

				atmostotlmode();
				if(document.visibilityState === "visible"){
					let htmlplayer = document.getElementsByTagName("video") || null;
					let playerid = null, item = null;
					let j;
					let l = htmlplayer.length;
					for(j = 0; j < l; j++){
						if(htmlplayer[j].play){ playerid = htmlplayer[j]; item = j + 1; drawAtmos(playerid, item, totlmode); }
					}
				}

				// YouTube flash detect play
				fixyoutubeatmos();

			// TESTING...Report #seconds since start and achieved fps.
			// var sinceStart = now - startTime;
			// var currentFps = Math.round(1000 / (sinceStart / ++frameCount) * 100) / 100;
			// console.log("Elapsed time= " + Math.round(sinceStart / 1000 * 100) / 100 + " secs @ " + currentFps + " fps.");
			}
		}
	}

	function autoframeglow(){
		var htmlplayer = document.getElementsByTagName("video");
		var j;
		var l = htmlplayer.length;
		for(j = 0; j < l; j++){
			htmlplayer[j].addEventListener("playing", function(){
				animate();
			});
			htmlplayer[j].addEventListener("pause", function(){
				animate();
			});
		}
	}

	// Atmosphere Lighting
	var totlshowtime;
	var youtubewindow;
	function runreal(){
		try{
			if(atmosvivid == true){
				var calcvividscale = 1 + (ambilightrangespreadradius / 100);
				if($("stefanvdvivideffect" + totlshowtime.getAttribute("data-video"))){
					var stefanvdvivideffect = $("stefanvdvivideffect" + totlshowtime.getAttribute("data-video"));
					if((stefanvdvivideffect.style.height != totlshowtime.style.height) && (totlshowtime.style.height != "")){
						stefanvdvivideffect.style.height = totlshowtime.offsetHeight;
						stefanvdvivideffect.style.width = totlshowtime.offsetWidth;
					}
					var vividctx = stefanvdvivideffect.getContext("2d", {desynchronized: true}); var vividx = Math.floor(totlshowtime.offsetWidth * 0.08); var vividy = Math.floor(totlshowtime.offsetHeight * 0.08);
					vividctx.drawImage(totlshowtime, 0, 0, vividx, vividy);
					if(!totlshowtime.classList.contains("stefanvdvideotop")){ totlshowtime.classList.add("stefanvdvideotop"); }
					// start first glow out
					stefanvdvivideffect.style.transform = "scale3d(" + calcvividscale + "," + calcvividscale + "," + calcvividscale + ")";
				}else{
					// if first run, or paused or stoped video before
					// create the vivid effect layer (again)
					if(totlshowtime.getAttribute("data-video") != null){

						if(!window.location.href.match(/((http:\/\/(.*youtube\.com\/.*))|(https:\/\/(.*youtube\.com\/.*)))/i)){
							// update background html video
							var path = [];
							var el = totlshowtime;
							do{
								var qq = path.unshift(el.nodeName);
								var yta;
								if(el.currentStyle){
									yta = qq.currentStyle["z-Index"];
								}else{
									yta = document.defaultView.getComputedStyle(el, null).getPropertyValue("z-Index");
								}
								if(yta != "auto"){
									// if it is not the <video> player element,
									// and if otherdown class is inside, then remove it
									if(el.tagName != "VIDEO"){
										if(el.classList.contains("stefanvdotherdown")){ el.classList.remove("stefanvdotherdown"); }
										el.classList.add("stefanvdvideoauto");
									}
								}
							}while((el.nodeName.toLowerCase() != "html") && (el = el.parentNode));
						}

						var newpositionvivid = getPosition(totlshowtime);
						var tempwidthvideo = totlshowtime.offsetWidth;
						var tempheightvideo = totlshowtime.offsetHeight;
						// var tempvisscrollleft = window.pageXOffset || document.documentElement.scrollLeft;
						// var tempvisscrolltop = window.pageYOffset || document.documentElement.scrollTop;
						totlshowtime.setAttribute("class", "stefanvdvideotop");
						var newvivid = document.createElement("canvas");
						newvivid.setAttribute("id", "stefanvdvivideffect" + totlshowtime.getAttribute("data-video"));
						newvivid.setAttribute("data-video", totlshowtime.getAttribute("data-video"));
						newvivid.setAttribute("class", "stefanvdvivideffect");
						newvivid.style.transform = "scale3d(0,0,0)";
						newvivid.style.webkitFilter = "blur(" + ambilightrangeblurradius + "px)";
						newvivid.style.filter = "blur(" + ambilightrangeblurradius + "px)";
						newvivid.style.top = newpositionvivid.y + "px"; // with NO    +tempvisscrolltop
						newvivid.style.left = newpositionvivid.x + "px"; // with NO    +tempvisscrollleft
						newvivid.style.width = tempwidthvideo + "px";
						newvivid.style.height = tempheightvideo + "px";
						newvivid.width = Math.floor(tempwidthvideo * 0.08);
						newvivid.height = Math.floor(tempheightvideo * 0.08);
						document.body.appendChild(newvivid);
					}
				}
			}else{
				var sourceWidth = totlshowtime.videoWidth;
				var sourceHeight = totlshowtime.videoHeight;

				var k = totlshowtime.getAttribute("data-video");

				var totlcheckcanvas = $("totlCanvas" + k + "");
				if(totlcheckcanvas == null){
					var totlnewcanvas = document.createElement("canvas");
					totlnewcanvas.setAttribute("id", "totlCanvas" + k + "");
					totlnewcanvas.width = "4";
					totlnewcanvas.height = "1";
					totlnewcanvas.style.display = "none";
					document.body.appendChild(totlnewcanvas);
				}

				var canvas = $("totlCanvas" + k + "");
				var context = canvas.getContext("2d", {desynchronized: true});

				var colorlamp1X = (sourceWidth * 50) / 100; // up midden
				var colorlamp1Y = (sourceHeight * 95) / 100;
				var colorlamp2X = (sourceWidth * 95) / 100; // right midden
				var colorlamp2Y = (sourceHeight * 50) / 100;
				var colorlamp3X = (sourceWidth * 50) / 100; // down midden
				var colorlamp3Y = (sourceHeight * 5) / 100;
				var colorlamp4X = (sourceWidth * 5) / 100; // left midden
				var colorlamp4Y = (sourceHeight * 50) / 100;

				context.drawImage(totlshowtime, colorlamp1X, colorlamp1Y, 1, 1, 0, 0, 1, 1);
				context.drawImage(totlshowtime, colorlamp2X, colorlamp2Y, 1, 1, 1, 0, 1, 1);
				context.drawImage(totlshowtime, colorlamp3X, colorlamp3Y, 1, 1, 2, 0, 1, 1);
				context.drawImage(totlshowtime, colorlamp4X, colorlamp4Y, 1, 1, 3, 0, 1, 1);

				p1 = context.getImageData(0, 0, 1, 1).data;
				p2 = context.getImageData(1, 0, 1, 1).data;
				p3 = context.getImageData(2, 0, 1, 1).data;
				p4 = context.getImageData(3, 0, 1, 1).data;
				hex1 = "#" + ("000000" + rgbToHex(p1[0], p1[1], p1[2])).slice(-6);
				hex2 = "#" + ("000000" + rgbToHex(p2[0], p2[1], p2[2])).slice(-6);
				hex3 = "#" + ("000000" + rgbToHex(p3[0], p3[1], p3[2])).slice(-6);
				hex4 = "#" + ("000000" + rgbToHex(p4[0], p4[1], p4[2])).slice(-6);

				if(window.location.href.match(/((http:\/\/(.*youtube\.com\/.*))|(https:\/\/(.*youtube\.com\/.*)))/i)){
					// var youtubewindow = $("watch-player") || $("watch7-player") || $("player-api");
					youtubewindow = $("movie_player") || document.getElementsByTagName("ytg-persistent-player")[0];
					if(youtubewindow){
						setatmosplayer(youtubewindow, [textcountC, textcountB, textcountA], [hex1, hex2, hex3, hex4]);
					}
				}else{
					setatmosplayer(totlshowtime, [textcountC, textcountB, textcountA], [hex1, hex2, hex3, hex4]);
				}
			}
		}catch(e){ rundefault(); }
	}

	// if catch error in URL
	function rundefault(){
		if(window.location.href.match(/((http:\/\/(.*youtube\.com\/.*))|(https:\/\/(.*youtube\.com\/.*)))/i)){
			// var youtubewindow = $("watch-player") || $("watch7-player") || $("player-api");
			youtubewindow = $("movie_player") || document.getElementsByTagName("ytg-persistent-player")[0];
			if(youtubewindow){
				setatmosplayer(youtubewindow, [textcountC, textcountB, textcountA], [ambilightcolorhex, ambilightcolorhex, ambilightcolorhex, ambilightcolorhex]);
			}
		}else{ setatmosplayer(totlshowtime, [textcountC, textcountB, textcountA], [ambilightcolorhex, ambilightcolorhex, ambilightcolorhex, ambilightcolorhex]); }
	}

	var textcountA;
	var textcountB;
	var textcountC;
	var p1; var p2; var p3; var p4;
	var hex1; var hex2; var hex3; var hex4;

	function setatmosplayer(v, a, b){
		v.style.boxShadow = "0px 0px 0px black , 0px -" + a[0] + " " + a[1] + " " + a[2] + " " + b[0] + ", 0px " + a[0] + " " + a[1] + " " + a[2] + " " + b[1] + ", " + a[0] + " 0px " + a[1] + " " + a[2] + " " + b[2] + ", -" + a[0] + " 0px " + a[1] + " " + a[2] + " " + b[3] + "";
	}

	function removeatmosvivid(playerid){
		if($("stefanvdvivideffect" + playerid.getAttribute("data-video"))){
			let stefanvdvivideffect = $("stefanvdvivideffect" + playerid.getAttribute("data-video"));
			stefanvdvivideffect.style.transform = "scale3d(0,0,0)"; // glow in
			stefanvdvivideffect.addEventListener("transitionend", function(){
				if(stefanvdvivideffect.parentNode){
					if(stefanvdvivideffect.style.transform == "scale3d(0, 0, 0)"){
						stefanvdvivideffect.parentNode.removeChild(stefanvdvivideffect);
					}
				}
			});
		}
	}

	// ambilight draw code
	function drawAtmos(playerid, item, totlmode){
		var statusdetectvideo;
		if(vpause == true){ statusdetectvideo = playerid.ended; }else{ statusdetectvideo = playerid.paused || playerid.ended; }

		if((statusdetectvideo) || totlmode == false){
			// animation go out
			if(ambilightfixcolor == true || ambilight4color == true || (ambilightvarcolor == true && atmosvivid == false)){
				if(typeof countA[item] == "undefined"){ countA[item] = 0; }
				if(typeof countB[item] == "undefined"){ countB[item] = 0; }
				if(typeof countC[item] == "undefined"){ countC[item] = 0; }
				countA[item] = countA[item] - 1; if(countA[item] <= 0){ countA[item] = 0; }
				countB[item] = countB[item] - 1; if(countB[item] <= 0){ countB[item] = 0; }
				countC[item] = countC[item] - 1; if(countC[item] <= 0){ countC[item] = 0; }
				textcountA = countA[item] + "px";
				textcountB = countB[item] + "px";
				textcountC = countC[item] + "px";
			}

			if(ambilightvarcolor == true){
				if(atmosvivid == true){
					// regular glow effect
				}else{
					if(typeof item == "undefined"){
						return;
					}
					var canvas = $("totlCanvas" + item + "");
					if(canvas){
						var context = canvas.getContext("2d", {desynchronized: true});

						p1 = context.getImageData(0, 0, 1, 1).data;
						p2 = context.getImageData(1, 0, 1, 1).data;
						p3 = context.getImageData(2, 0, 1, 1).data;
						p4 = context.getImageData(3, 0, 1, 1).data;
						hex1 = "#" + ("000000" + rgbToHex(p1[0], p1[1], p1[2])).slice(-6);
						hex2 = "#" + ("000000" + rgbToHex(p2[0], p2[1], p2[2])).slice(-6);
						hex3 = "#" + ("000000" + rgbToHex(p3[0], p3[1], p3[2])).slice(-6);
						hex4 = "#" + ("000000" + rgbToHex(p4[0], p4[1], p4[2])).slice(-6);
					}
					var downhex1 = hex1; if(!hex1){ hex1 = "#000000"; } // previous value
					var downhex2 = hex2; if(!hex2){ hex2 = "#000000"; } // previous value
					var downhex3 = hex3; if(!hex3){ hex3 = "#000000"; } // previous value
					var downhex4 = hex4; if(!hex4){ hex4 = "#000000"; } // previous value
				}
			}
			// ----

			if(window.location.href.match(/((http:\/\/(.*youtube\.com\/.*))|(https:\/\/(.*youtube\.com\/.*)))/i)){
				// var youtubewindow = $("watch-player") || $("watch7-player") || $("player-api");
				var youtubewindow = $("movie_player") || document.getElementsByTagName("ytg-persistent-player")[0];
				if(youtubewindow){
					if(ambilightvarcolor == true){
						if(atmosvivid == true){
							removeatmosvivid(playerid);
						}else{
							if(typeof downhex1 != "undefined" || typeof downhex2 != "undefined" || typeof downhex3 != "undefined" || typeof downhex4 != "undefined"){
								try{
									setatmosplayer(youtubewindow, [textcountC, textcountB, textcountA], [downhex1, downhex2, downhex3, downhex4]);
								}catch(e){ console.error(e); }
							}else{
								setatmosplayer(youtubewindow, [textcountC, textcountB, textcountA], [ambilightcolorhex, ambilightcolorhex, ambilightcolorhex, ambilightcolorhex]);
							}
						}
					}else if(ambilightfixcolor == true){
						setatmosplayer(youtubewindow, [textcountC, textcountB, textcountA], [ambilightcolorhex, ambilightcolorhex, ambilightcolorhex, ambilightcolorhex]);
					}else if(ambilight4color == true){
						setatmosplayer(youtubewindow, [textcountC, textcountB, textcountA], [ambilight1colorhex, ambilight2colorhex, ambilight3colorhex, ambilight4colorhex]);
					}
				}
			}else{
				if(ambilightvarcolor == true){
					if(atmosvivid == true){
						removeatmosvivid(playerid);
					}else{
						setatmosplayer(playerid, [textcountC, textcountB, textcountA], [downhex1, downhex2, downhex3, downhex4]);
					}
				}else if(ambilightfixcolor == true){
					setatmosplayer(playerid, [textcountC, textcountB, textcountA], [ambilightcolorhex, ambilightcolorhex, ambilightcolorhex, ambilightcolorhex]);
				}else if(ambilight4color == true){
					setatmosplayer(playerid, [textcountC, textcountB, textcountA], [ambilight1colorhex, ambilight2colorhex, ambilight3colorhex, ambilight4colorhex]);
				}
			}

			return false;
		}

		if(totlmode == false){ return; }

		try{
			if(typeof item == "undefined"){
				return;
			}
		}catch(e){ console.log(e); }

		totlshowtime = playerid;
		// var youtubewindow = $("watch-player") || $("watch7-player") || $("player-api");
		youtubewindow = $("movie_player") || document.getElementsByTagName("ytg-persistent-player")[0];

		// animate out and in
		// but not for the vivid mode
		if(ambilightfixcolor == true || ambilight4color == true || (ambilightvarcolor == true && atmosvivid == false)){
			if(typeof countA[item] == "undefined"){ countA[item] = 0; }
			if(typeof countB[item] == "undefined"){ countB[item] = 0; }
			if(typeof countC[item] == "undefined"){ countC[item] = 0; }
			if(countA[item] < ambilightrangespreadradius){ countA[item] = countA[item] + 1; }
			if(countB[item] < ambilightrangeblurradius){ countB[item] = countB[item] + 1; }
			if(countC[item] < 20){ countC[item] = countC[item] + .5; }
			textcountA = countA[item] + "px";
			textcountB = countB[item] + "px";
			textcountC = countC[item] + "px";
		}

		if(ambilightvarcolor == true){
			// Cross detection
			// if url is the same as the video source
			// then posible to play real ambilight
			var cross = null;

			// check for the current page URL
			var pageurl = window.location.protocol + "//" + window.location.host; // https://www.stefanvd.net
			var pageurllengt = pageurl.length; // lengte url

			var yesornosubdomain = subDomain(pageurl);

			var insideitemlengt;
			if(typeof HTMLVideoElement !== "undefined" && totlshowtime instanceof HTMLVideoElement){
				var insideitem = totlshowtime.src;
				insideitemlengt = 0;
				if(insideitem){ insideitemlengt = insideitem.length; } // length URL
			}else{ insideitemlengt = "undefined"; }

			// begin mission control
			if((insideitemlengt == 0) && (yesornosubdomain == false)){
				// check for video -> source URL
				var items = totlshowtime.getElementsByTagName("source");
				var i;
				for(i = 0; i < 1; i++){ // 1 source needed
					cross = items[i].getAttribute("src");
				}
				if(cross.substring(0, pageurllengt) == pageurl){ runreal(); }else if(cross.substring(0, 2) == "./"){ runreal(); }else if(cross.substring(0, 3) == "../"){ runreal(); }else if((cross.substring(0, 4) != "http") && (cross.substring(0, 5) != "https") && (cross.substring(0, 3) != "ftp")){ runreal(); }else{ rundefault(); }
			}else if((insideitemlengt > 0) && (yesornosubdomain == false)){
				if(insideitem.substring(0, pageurllengt) == pageurl){ runreal(); }else if(insideitem.substring(0, 2) == "./"){ runreal(); }else if(insideitem.substring(0, 3) == "../"){ runreal(); }else if((insideitem.substring(0, 4) != "http") && (insideitem.substring(0, 5) != "https") && (insideitem.substring(0, 3) != "ftp")){ runreal(); }else{ runreal(); }
				// inside not OK go to rundefault();
			}else{ rundefault(); }
			// end mission control

		}else if(ambilightfixcolor == true){
			if(window.location.href.match(/((http:\/\/(.*youtube\.com\/.*))|(https:\/\/(.*youtube\.com\/.*)))/i)){
				if(youtubewindow){
					setatmosplayer(youtubewindow, [textcountC, textcountB, textcountA], [ambilightcolorhex, ambilightcolorhex, ambilightcolorhex, ambilightcolorhex]);
				}
			}else{ totlshowtime.style.boxShadow = "0px 0px 0px black , 0px -" + textcountC + " " + textcountB + " " + textcountA + " " + ambilightcolorhex + ", 0px " + textcountC + " " + textcountB + " " + textcountA + " " + ambilightcolorhex + ", " + textcountC + " 0px " + textcountB + " " + textcountA + " " + ambilightcolorhex + ", -" + textcountC + " 0px " + textcountB + " " + textcountA + " " + ambilightcolorhex + ""; }
		}else if(ambilight4color == true){
			if(window.location.href.match(/((http:\/\/(.*youtube\.com\/.*))|(https:\/\/(.*youtube\.com\/.*)))/i)){
				if(youtubewindow){
					setatmosplayer(youtubewindow, [textcountC, textcountB, textcountA], [ambilight1colorhex, ambilight2colorhex, ambilight3colorhex, ambilight4colorhex]);
				}
			}else{ setatmosplayer(totlshowtime, [textcountC, textcountB, textcountA], [ambilight1colorhex, ambilight2colorhex, ambilight3colorhex, ambilight4colorhex]); }
		}

	}

	function ambilightfunction(){
	// yes show time
	// ambilight play detect
		if(atmosfpsauto == true && atmosvivid == true){
		// auto
			autoframeglow();
		}else{
		// regular
			startAnimating(drawatmosfps);
		}

		// Observe a specific DOM element
		// New Mutation Summary API Reference
		if(MutationObserver){
		// setup MutationSummary observer
			var videolist = document.body;
			var observer = new MutationObserver(function(mutations){
				mutations.forEach(function(mutation){

					// detect change style - this for floating box in div detection
					if(mutation.attributeName == "style"){
						if(mutation.target.tagName == "VIDEO"){
							if(mutation.target.hasAttribute("data-video")){
							// update the style
								if(ambilight == true && ambilightvarcolor == true && atmosvivid == true){
									var potvis = mutation.target.getAttribute("data-video");
									var visposition = getPosition(mutation.target);
									if(document.getElementById("stefanvdvivideffect" + potvis)){
										document.getElementById("stefanvdvivideffect" + potvis).style.width = mutation.target.offsetWidth + "px";
										document.getElementById("stefanvdvivideffect" + potvis).style.height = mutation.target.offsetHeight + "px";
										// only update is higher or equal to the value 0
										// that to preven the animation on YouTube video ended to go upwards
										if(visposition.y >= 0){
											document.getElementById("stefanvdvivideffect" + potvis).style.top = visposition.y + "px";
										}
										if(visposition.x >= 0){
											document.getElementById("stefanvdvivideffect" + potvis).style.left = visposition.x + "px";
										}
										//---
									}
									if(mutation.target.play){
										animate();
									}
								}
							//---
							}
						}
					}

				});
			});

			observer.observe(videolist, {
				subtree: true, // observe the subtree rooted at ...videolist...
				childList: true, // include childNode insertion/removals
				characterData: false, // include textContent changes
				attributes: true // include changes to attributes within the subtree
			});
		}
	}

	// Observe a specific DOM element:
	if(window.location.href.match(/((http:\/\/(.*youtube\.com\/.*))|(https:\/\/(.*youtube\.com\/.*)))/i)){
		if(document.getElementById("content")){ // from youtube website
			observeDOM(document.getElementById("content"), function(){

				// for the no360 live update
				if(no360youtube == true){
					var ytfullvideo = document.getElementsByTagName("video");
					var ytfui;
					var ytful = ytfullvideo.length;
					for(ytfui = 0; ytfui < ytful; ytfui++){ ytfullvideo[ytfui].classList.add("stefanvdvideotop"); }
					var ytwebgl = document.getElementsByClassName("webgl");
					var ytwi;
					var ytwl = ytwebgl.length;
					for(ytwi = 0; ytwi < ytwl; ytwi++){ ytwebgl[ytwi].style.display = "none"; }
				}

			});
		}
	}

	// reflection
	function drawReflection(reflectionid){
		var calcreflection = (100 - reflectionamount) / 100;
		try{
			if(reflectionid.paused || reflectionid.ended || $("movie_player").getPlayerState() == 0 || $("movie_player").getPlayerState() == 2){
				if(window.location.href.match(/((http:\/\/(.*youtube\.com\/.*))|(https:\/\/(.*youtube\.com\/.*)))/i)){
					// var youtubewindow = $("watch-player") || $("watch7-player") || $("player-api");
					let youtubewindow = $("movie_player");
					youtubewindow.style.webkitBoxReflect = "";
				}else{
					reflectionid.style.webkitBoxReflect = "";
				}
				return false;
			}
		}catch(e){ console.log(e); }

		try{
			if(window.location.href.match(/((http:\/\/(.*youtube\.com\/.*))|(https:\/\/(.*youtube\.com\/.*)))/i)){
				// var youtubewindow = $("watch-player") || $("watch7-player") || $("player-api");
				let youtubewindow = $("movie_player");
				youtubewindow.style.webkitBoxReflect = "below 0px -webkit-gradient(linear, left top, left bottom, from(transparent), to(black),color-stop(" + calcreflection + ", transparent))";
			}else{
				reflectionid.style.webkitBoxReflect = "below 0px -webkit-gradient(linear, left top, left bottom, from(transparent), to(black),color-stop(" + calcreflection + ", transparent))";
			}
		}catch(e){ console.log(e); }
	}

	var startreflection;
	function runreflectioncheck(){
		if(reflection == true){
			startreflection = window.setInterval(function(){
				try{
					var reflectionplayer = document.getElementsByTagName("video") || null;
					var reflectionid = null;
					var refk;
					var l = reflectionplayer.length;
					for(refk = 0; refk < l; refk++){
						if(reflectionplayer[refk].play){ reflectionid = reflectionplayer[refk]; drawReflection(reflectionid); }
					}
				}catch(e){ console.log(e); } // I see nothing, that is good
			}, 20); // 20 refreshing it
		}
	} // end reflection
	runreflectioncheck();

	function isMacintosh(){
		return navigator.platform.indexOf("Mac") > -1;
	}

	function getPosition(el){
		var xPos = 0; var yPos = 0;
		while(el){ xPos += (el.offsetLeft - el.scrollLeft + el.clientLeft); yPos += (el.offsetTop - el.scrollTop + el.clientTop); el = el.offsetParent; }
		return{x:xPos, y:yPos};
	}

	// Mouse Volume Scroll
	var myListenerWithContextvolume;
	var observervideovolume;
	var scrollTimer = -1;
	var rundoscrollfunc = false;

	function onKeyDown(){
		rundoscrollfunc = true;
	}

	function onKeyUp(){
		rundoscrollfunc = false;
	}

	// ----youtube
	function setyoutubevolumemeter(volume){
		if(window.location.href.match(/((http:\/\/(.*youtube\.com\/.*))|(https:\/\/(.*youtube\.com\/.*)))/i)){
			var SVGpath = document.getElementById("ytp-id-15");
			if(SVGpath){
				if(volume <= 0.01){
					SVGpath.setAttribute("d", "M12.39,15.54 L10,15.54 L10,20.44 L12.4,20.44 L17,25.50 L17,10.48 L12.39,15.54 Z");
				}else if(volume <= 0.5){
					SVGpath.setAttribute("d", "M12.39,15.54 L10,15.54 L10,20.44 L12.4,20.44 L17,25.50 L17,10.48 L12.39,15.54 Z M22,17.99 C22,16.4 20.74,15.05 19,14.54 L19,21.44 C20.74,20.93 22,19.59 22,17.99 Z");
				}else{
					SVGpath.setAttribute("d", "M12.39,15.54 L10,15.54 L10,20.44 L12.4,20.44 L17,25.50 L17,10.48 L12.39,15.54 Z M22,17.99 C22,16.4 20.74,15.05 19,14.54 L19,21.44 C20.74,20.93 22,19.59 22,17.99 Z M19,24.31 L19,26 C22.99,25.24 26,21.94 26,18 C26,14.05 22.99,10.75 19,10 L19,11.68 C22.01,12.41 24.24,14.84 24.24,18 C24.24,21.15 22.01,23.58 19,24.31 Z");
				}
			}
			document.querySelector(".ytp-volume-panel").setAttribute("aria-valuenow", (volume * 100).toFixed(0));
			document.querySelector(".ytp-volume-slider-handle").style.left = ((volume * 100) * 0.4) + "px";
		}
	}
	//---

	var doscroll = function(e){

		if(videovolumealt == true){
			window.addEventListener("keydown", onKeyDown, true);
			window.addEventListener("keyup", onKeyUp, true);
		}else{
			rundoscrollfunc = true; // regular run with no keys down
		}

		if(rundoscrollfunc == true){
			e = window.event || e;
			var pop;

			var that = null;
			// if there is one video element on the page, then continue the code
			if(document.getElementsByTagName("video")[0]){
			// get all the path below this mouse scroll
				var stack = [];
				var test = document.elementFromPoint(e.clientX, e.clientY);
				stack.push(test);

				if(test.nodeName == "VIDEO"){
					var value = test.getAttribute("data-video");
					if(typeof value == "string" && value.length){
						pop = test.getAttribute("data-video");
						that = test;
					}
				}else{
					var m;
					var ml = 5; // limit search to the first 5 - for performance reason
					for(m = 0; m < ml; m++){
						test.classList.add("totlpointereventsnone");
						test = document.elementFromPoint(e.clientX, e.clientY);
						stack.push(test);
						if(test.nodeName == "VIDEO"){
							var getattvalue = test.getAttribute("data-video");
							if(typeof getattvalue == "string" && getattvalue.length){
								pop = test.getAttribute("data-video");
								that = test;
							}
						}
					}
				}

				// Clean it up
				var i = 0, il = stack.length;
				for(; i < il; i += 1){
					stack[i].classList.remove("totlpointereventsnone");
				}
			}

			// if no video number, then stop the code here
			if(that == null){
				return;
			}else{
				var delta = Math.max(-1, Math.min(1, (e.deltaY || e.wheelDelta || -e.detail)));
				if(that.muted == true){ that.volume = 0; }

				if(videovolumesteps != 0.01){
					that.volume = Math.round(that.volume / videovolumesteps) * videovolumesteps; // fix the correct ceil level (steps of the user)
				}

				var isMac = isMacintosh();
				if(videovolumescrolla == true){
					if(isMac == true){
						if(delta == -1 && that.volume > 0.00){
							that.volume -= videovolumesteps;
						}
						if(delta == 1 && that.volume <= 0.99){
							that.volume += videovolumesteps;
						}
					}else{
						if(delta == -1 && that.volume <= 0.99){
							that.volume += videovolumesteps;
						}
						if(delta == 1 && that.volume > 0.00){
							that.volume -= videovolumesteps;
						}
					}
				}else if(videovolumescrollb == true){
					if(delta == -1 && that.volume > 0.00){
						that.volume -= videovolumesteps;
					}
					if(delta == 1 && that.volume <= 0.99){
						that.volume += videovolumesteps;
					}
				}else if(videovolumescrollc == true){
					if(delta == -1 && that.volume <= 0.99){
						that.volume += videovolumesteps;
					}
					if(delta == 1 && that.volume > 0.00){
						that.volume -= videovolumesteps;
					}
				}
				that.volume = Math.round(that.volume * 100) / 100;
				setyoutubevolumemeter(that.volume);

				document.getElementById("volumecontrol" + pop).value = Math.round(that.volume * 100);
				if(videovolumelabel == true){ document.getElementById("lblvolume" + pop).textContent = Math.round(that.volume * 100) + "%"; }
				if(that.volume <= 0){ that.muted = true; }else{ that.muted = false; }

				var el = document.getElementsByClassName("totlmousewheelvideo");
				if(el[pop]){
					el[pop].classList.remove("totlhidevolume");
					el[pop].classList.add("totlvisiblevolume");
				}

				if(scrollTimer != -1){ window.clearTimeout(scrollTimer); }
				scrollTimer = window.setTimeout(function(){
					if(el[pop]){
						el[pop].classList.remove("totlvisiblevolume");
						el[pop].classList.add("totlhidevolume");
					}
				}, 750);

				e.preventDefault();
			}
		}
	};

	function addvolume(){
		// inside video - scroll mouse action
		if(videovolume == true){
			window.addEventListener("wheel", doscroll, {passive: false});
			window.addEventListener("DOMMouseScroll", doscroll, false);
		}

		var volumevideos = document.getElementsByTagName("video");
		var i;
		var l = volumevideos.length;
		for(i = 0; i < l; i++){
			var myElement = document.getElementsByTagName("video")[i];
			var position = getPosition(myElement);
			var tempxmidvideo = myElement.offsetWidth / 2 - 250 / 2;
			var tempymidvideo = myElement.offsetHeight / 2 - 20 / 2;

			var newmousewheelvideo = document.createElement("div");
			newmousewheelvideo.setAttribute("data-video", i);
			newmousewheelvideo.setAttribute("class", "totlmousewheelvideo totlhidevolume");

			if(videovolumeposa == true){
				newmousewheelvideo.style.top = position.y + tempymidvideo + "px";
				newmousewheelvideo.style.left = position.x + tempxmidvideo + "px";
			}else if(videovolumeposb == true || videovolumeposd == true){
				newmousewheelvideo.style.top = position.y + 35 + "px";
				newmousewheelvideo.style.left = position.x + 25 + "px";
			}else if(videovolumeposc == true || videovolumepose == true){
				newmousewheelvideo.style.top = position.y + 35 + "px";
				newmousewheelvideo.style.left = position.x + myElement.offsetWidth - 85 + "px";
			}

			document.body.appendChild(newmousewheelvideo);

			if(videovolumelabel == true){
				var newlabelvideo = document.createElement("div");
				newlabelvideo.setAttribute("id", "lblvolume" + i);
				if(videovolumeposb == true || videovolumeposc == true || videovolumeposd == true || videovolumepose == true){
					newlabelvideo.setAttribute("class", "totlvideovolumelabellarge");
				}else{
					newlabelvideo.setAttribute("class", "totlvideovolumelabel");
				}
				newmousewheelvideo.appendChild(newlabelvideo);
			}

			var newprogress = document.createElement("progress");
			newprogress.setAttribute("id", "volumecontrol" + i);
			newprogress.setAttribute("value", "100");
			newprogress.setAttribute("max", "100");
			if(videovolumeposd == true){
				newprogress.style.position = "absolute";
				newprogress.style.top = "2px";
				newprogress.style.left = "90px";
			}else if(videovolumepose == true){
				newprogress.style.position = "absolute";
				newprogress.style.top = "2px";
				newprogress.style.left = "-270px";
			}
			newmousewheelvideo.appendChild(newprogress);
			if(videovolumeposb == true || videovolumeposc == true){
				newprogress.setAttribute("class", "totlvideovolumeprogresshidden");
			}

			// inside video - mouse click hold action
			if(videovolumehold == true){
				var last_position = {};
				var myListener = function(event){
					if(event.button === 0 || event.button === 1){
						var pop = 0;// current video player only

						// check to make sure there is data to compare against
						if(typeof(last_position.x) != "undefined"){

							// get the change from last position to this position
							var deltaX = last_position.x - event.clientX,
								deltaY = last_position.y - event.clientY;

							// check which direction had the highest amplitude and then figure out direction by checking if the value is greater or less than zero
							if((Math.abs(deltaX) > Math.abs(deltaY) && deltaX > 0) || (Math.abs(deltaY) > Math.abs(deltaX) && deltaY < 0)){
								if(document.getElementsByTagName("video")[pop].volume > 0.00){ document.getElementsByTagName("video")[pop].volume -= videovolumesteps; document.getElementsByTagName("video")[pop].volume = Math.round(document.getElementsByTagName("video")[pop].volume * 100) / 100; }
								// left and down
							}else if((Math.abs(deltaX) > Math.abs(deltaY) && deltaX < 0) || (Math.abs(deltaY) > Math.abs(deltaX) && deltaY > 0)){
								if(document.getElementsByTagName("video")[pop].volume <= 0.99){ document.getElementsByTagName("video")[pop].volume += videovolumesteps; document.getElementsByTagName("video")[pop].volume = Math.round(document.getElementsByTagName("video")[pop].volume * 100) / 100; }
								// right and up
							}
						}

						document.getElementById("volumecontrol" + pop).value = Math.round(document.getElementsByTagName("video")[pop].volume * 100);
						if(videovolumelabel == true){ document.getElementById("lblvolume" + pop).textContent = Math.round(document.getElementsByTagName("video")[pop].volume * 100) + "%"; }
						if(document.getElementsByTagName("video")[pop].volume <= 0){ document.getElementsByTagName("video")[pop].muted = true; }else{ document.getElementsByTagName("video")[pop].muted = false; }

						var el = document.getElementsByClassName("totlmousewheelvideo");
						el[pop].classList.remove("totlhidevolume");
						el[pop].classList.add("totlvisiblevolume");

						if(scrollTimer != -1){ window.clearTimeout(scrollTimer); }
						scrollTimer = window.setTimeout(function(){ el[pop].classList.remove("totlvisiblevolume"); el[pop].classList.add("totlhidevolume"); }, 750);

						event.preventDefault();

						// set the new last position to the current for next time
						last_position = {x : event.clientX, y : event.clientY};
					}
				};

				document.body.addEventListener("pointerdown", function(){
					document.body.addEventListener("pointermove", myListener, false);
				}, false);

				document.body.addEventListener("pointerup", function(){
					document.body.removeEventListener("pointermove", myListener, false);
				}, false);
			}

		}
	}

	function videovolumefunction(){
		if(videovolume == true || videovolumehold == true || gamepad == true){
			videovolumesteps = Math.round(videovolumesteps * 100) / 10000;

			// inject CSS for the progress bar
			try{
				var totlvideovolume = ".totlmousewheelvideo progress[value]::-webkit-progress-value{background:" + videovolumecolor + "!important;background-color:" + videovolumecolor + "!important;border-radius:2px!important}.totlmousewheelvideo progress[value]::-moz-progress-bar{background:" + videovolumecolor + "!important;background-color:" + videovolumecolor + "!important;border-radius:2px!important}.totlmousewheelvideo progress[value]::progress-value{background:" + videovolumecolor + "!important;background-color:" + videovolumecolor + "!important;border-radius:2px!important}";

				if($("csstotlvolume")){
					var elem = document.getElementById("csstotlvolume");
					elem.parentElement.removeChild(elem);
				}

				var css = document.createElement("style");
				css.setAttribute("id", "csstotlvolume");
				css.type = "text/css";
				css.appendChild(document.createTextNode(totlvideovolume));
				document.getElementsByTagName("head")[0].appendChild(css);
			}catch(e){ console.error(e); }

			addvolume();

			var myListenervolume = function(){
				var elements = document.getElementsByClassName("totlmousewheelvideo");
				while(elements.length > 0){
					elements[0].parentNode.removeChild(elements[0]);
				}
				addvolume();
			};
			myListenerWithContextvolume = myListenervolume.bind(this);
			window.addEventListener("resize", myListenerWithContextvolume);

			// Observe a specific DOM element
			// New Mutation Summary API Reference
			if(MutationObserver){
				// setup MutationSummary observer
				var videolist = document.body;
				observervideovolume = new MutationObserver(function(mutations){
					mutations.forEach(function(mutation){

						if(mutation.target.tagName == "VIDEO"){
							if(mutation.attributeName === "src" && mutation.target.currentSrc != ""){
								if(videovolume == true || videovolumehold == true || gamepad == true){
									refreshvolume();
								}
							}
						}
						// dynamic add and remove video
						if(mutation.type == "childList"){
							var i;
							var la = mutation.addedNodes.length;
							for(i = 0; i < la; i++){
								if(mutation.addedNodes[i].tagName == "VIDEO"){
									if(videovolume == true || videovolumehold == true || gamepad == true){
										refreshvolume();
									}
								}
							}
							var j;
							var lr = mutation.removedNodes.length;
							for(j = 0; j < lr; j++){
								if(mutation.removedNodes[j].tagName == "VIDEO"){
									if(videovolume == true || videovolumehold == true || gamepad == true){
										refreshvolume();
									}
								}
							}
						}
						// detect change style - this for floating box in div detection
						if(mutation.attributeName == "style"){
							if(mutation.target.tagName == "VIDEO"){
								if(videovolume == true || videovolumehold == true || gamepad == true){
									refreshvolume();
								}
							}
						}

					});
				});

				observervideovolume.observe(videolist, {
					subtree: true, // observe the subtree rooted at ...videolist...
					childList: true, // include childNode insertion/removals
					characterData: false, // include textContent changes
					attributes: true // include changes to attributes within the subtree
				});

			}
			//---
		}
	} // end videovolume

	function runvideovolumecheck(){
		if(videovolume == true || gamepad == true){
			if(videovolumeonly == true){
				var currenturl = window.location.protocol + "//" + window.location.host;
				var videovolumerabbit = false;
				if(typeof videovolumeDomains == "string"){
					videovolumeDomains = JSON.parse(videovolumeDomains);
					var vvbbuf = [];
					var domain;
					for(domain in videovolumeDomains)
						vvbbuf.push(domain);
					vvbbuf.sort();
					var i;
					var l = vvbbuf.length;
					for(i = 0; i < l; i++){
						if(videovolumechecklistwhite == true){
							if(vvbbuf[i].includes("*")){
								// regex test
								if(checkregdomaininside(vvbbuf[i], currenturl) == true){
									videovolumefunction();
								}
							}else{
								if(currenturl == vvbbuf[i]){ videovolumefunction(); }
							}
						}else if(videovolumechecklistblack == true){
							if(vvbbuf[i].includes("*")){
								// regex test
								if(checkregdomaininside(vvbbuf[i], currenturl) == true){
									videovolumerabbit = true;
								}
							}else{
								// regular text
								if(currenturl == vvbbuf[i]){ videovolumerabbit = true; }
							}
						}
					}
				}
				if(videovolumechecklistblack == true && videovolumerabbit == false){ videovolumefunction(); }
			}else{ videovolumefunction(); }
		} // option videotool on end
	}
	runvideovolumecheck();

	function refreshvolume(){
		adddatavideo(); // recheck remove and add video ID

		var elements = document.getElementsByClassName("totlmousewheelvideo");
		while(elements.length > 0){
			elements[0].parentNode.removeChild(elements[0]);
		}
		addvolume();
	}

	// Game controller
	function rungamepadcheck(){
		if(gamepad == true){
			if(gamepadonly == true){
				var currenturl = window.location.protocol + "//" + window.location.host;
				var gamepadrabbit = false;
				if(typeof gamepadDomains == "string"){
					gamepadDomains = JSON.parse(gamepadDomains);
					var gmbbuf = [];
					var domain;
					for(domain in gamepadDomains)
						gmbbuf.push(domain);
					gmbbuf.sort();
					var i;
					var l = gmbbuf.length;
					for(i = 0; i < l; i++){
						if(gamepadchecklistwhite == true){
							if(gmbbuf[i].includes("*")){
								// regex test
								if(checkregdomaininside(gmbbuf[i], currenturl) == true){
									gamepadfunction();
								}
							}else{
								if(currenturl == gmbbuf[i]){ gamepadfunction(); }
							}
						}else if(gamepadchecklistblack == true){
							if(gmbbuf[i].includes("*")){
								// regex test
								if(checkregdomaininside(gmbbuf[i], currenturl) == true){
									gamepadrabbit = true;
								}
							}else{
								// regular text
								if(currenturl == gmbbuf[i]){ gamepadrabbit = true; }
							}
						}
					}
				}
				if(videovolumechecklistblack == true && gamepadrabbit == false){ gamepadfunction(); }
			}else{ gamepadfunction(); }
		} // option videotool on end
	}
	rungamepadcheck();

	function gamepadfunction(){
		// control the current video with your remote gamepad controller
		window.addEventListener("gamepadconnected", gpstartconnnected);
		window.addEventListener("gamepaddisconnected", gpdisconnected);
	}

	function gpstartconnnected(e){
		// console.log("Gamepad connected at index %d: %s. %d buttons, %d axes.", e.gamepad.index, e.gamepad.id, e.gamepad.buttons.length, e.gamepad.axes.length);
		updategamepadbuttons();
		updategamepadaxes();
		var devicename = e.gamepad.id; statusremotebadge(devicename, "add");
	}

	function gpdisconnected(e){
		// console.log("Gamepad disconnected from index %d: %s", e.gamepad.index, e.gamepad.id);
		var devicename = e.gamepad.id; statusremotebadge(devicename, "dis");
		window.cancelAnimationFrame(updategamepadbuttons);
		window.cancelAnimationFrame(updategamepadaxes);
	}

	var buttonsstate = [];
	var logoclicked = false;
	function actionlogo(){
		if(logoclicked == false){
			logoclicked = true;
			window.setTimeout(function(){
				window.open(linkgamepad, "_blank");
				logoclicked = false;
			}, 2500);
		}
	}

	function actiongamepad(n){
		switch(parseInt(n)){
		case 0:
			changevolume("-");
			break;
		case 1:
			playnext();
			break;
		case 2:
			playprev();
			break;
		case 3:
			changevolume("+");
			break;
		case 4:
			onesecondbackward();
			break;
		case 5:
			onesecondforward();
			break;
		case 6:
			threesecondbackward();
			break;
		case 7:
			threesecondforward();
			break;
		case 8:
			exitzoom(0);
			break;
		case 9:
			gamepadplaypause();
			break;
		case 10:
			resetzoom(0);
			break;
		case 11:
			zoompaddirection(0, [1, 0, 0, 0]);
			break;
		case 12:
			zoompaddirection(0, [0, 0, 1, 0]);
			break;
		case 13:
			zoompaddirection(0, [0, 1, 0, 0]);
			break;
		case 14:
			zoompaddirection(0, [0, 0, 0, 1]);
			break;
		case 15:
			actionlogo();
			break;
		}
	}

	const updategamepadbuttons = () => {
		const myGamepad = navigator.getGamepads()[0];
		if(myGamepad){
			myGamepad.buttons.forEach((button, index) => {
				// pressed => one action
				if(index == 16){
					// PlayStation Logo
					if(button.pressed && buttonsstate[index] != true){
						// console.log("Click 16 on pressed:", button.pressed, "arry set on:", buttonsstate[index]);
						buttonsstate[index] = true;
						// set delay to prevent double openening new tab when open this on the other web browser tab
						actiongamepad(gpbtnlogo);
					}
				}

				if(button.pressed){
					if(buttonsstate[index] != true){
						buttonsstate[index] = true;
						// console.log(`Pressed button ${index}`, "on status=",button.pressed, "compare with=",buttonsstate[index]);
						var video = document.getElementsByTagName("video")[0];
						if(video){
							// playstation
							switch(index){
							case 0:
								// X
								actiongamepad(gpbtnx);
								break;
							case 1:
								// O
								actiongamepad(gpbtno);
								break;
							case 2:
								// Square
								actiongamepad(gpbtnsquare);
								break;
							case 3:
								// Triangle
								actiongamepad(gpbtntriangle);
								break;
							case 4:
								// L1
								actiongamepad(gpbtnlb);
								break;
							case 5:
								// R1
								actiongamepad(gpbtnrb);
								break;
							case 6:
								// L2
								actiongamepad(gpbtnlt);
								break;
							case 7:
								// R2
								actiongamepad(gpbtnrt);
								break;
							case 8:
								// Share
								actiongamepad(gpbtnshare);
								break;
							case 9:
								// Options
								actiongamepad(gpbtnmenu);
								break;
							case 10:
								// Left Stick Pressed
								actiongamepad(gpbtnleftstick);
								break;
							case 11:
								// Right Stick Pressed
								actiongamepad(gpbtnrightstick);
								break;
							}
						}
					}

					// pressed => continue actions loop
					if(document.getElementsByTagName("video")[0]){
						if(index == 12){
							// Directional Up
							actiongamepad(gpbtndirup);
						}else if(index == 13){
							// Directional Down
							actiongamepad(gpbtndirdown);
						}else if(index == 14){
							// Directional Left
							actiongamepad(gpbtndirleft);
						}else if(index == 15){
							// Directional Right
							actiongamepad(gpbtndirright);
						}
					}
				}else{
					// console.log("NOT pressed anymore",index, "status=",button.pressed)
					buttonsstate[index] = false;
				}
			});
		}
		window.requestAnimFrame(updategamepadbuttons);
	};

	function actionzoominout(myGamepad, a){
		var currentaxesleft = Number(myGamepad.axes[a]).toFixed(1);

		if(currentaxesleft > 0.1){
			camerazoomrotate(0, -0.05, "");
		}else if(Math.abs(currentaxesleft) == 0.0){
			// do nothing
		}else if(currentaxesleft < -0.1){
			camerazoomrotate(0, +0.05, "");
		}
	}

	function actionzoompad(myGamepad, a, b){
		var currentaxesrighthoz = Number(myGamepad.axes[a]).toFixed(1);
		if(currentaxesrighthoz > 0.1){
			zoompaddirection(0, [0, 0, 0, 1]);
		}else if(Math.abs(currentaxesrighthoz) == 0.0){
			// do nothing
		}else if(currentaxesrighthoz < -0.1){
			zoompaddirection(0, [0, 1, 0, 0]);
		}

		var currentaxesrightvert = Number(myGamepad.axes[b]).toFixed(1);
		if(currentaxesrightvert > 0.1){
			zoompaddirection(0, [0, 0, 1, 0]);
		}else if(Math.abs(currentaxesrightvert) == 0.0){
			// do nothing
		}else if(currentaxesrightvert < -0.1){
			zoompaddirection(0, [1, 0, 0, 0]);
		}
	}

	const updategamepadaxes = () => {
		if(document.getElementsByTagName("video")[0]){
			const myGamepad = navigator.getGamepads()[0]; // use the first gamepad
			// console.log(`Left stick at (${myGamepad.axes[0]}, ${myGamepad.axes[1]})` );
			// console.log(`Right stick at (${myGamepad.axes[2]}, ${myGamepad.axes[3]})` );
			if(myGamepad != null){
				// left stick
				if(gpleftstick == 0){
					actionzoominout(myGamepad, 1);
				}else if(gpleftstick == 1){
					actionzoompad(myGamepad, 0, 1);
				}

				// right stick
				if(gprightstick == 0){
					actionzoominout(myGamepad, 3);
				}else if(gprightstick == 1){
					actionzoompad(myGamepad, 2, 3);
				}
			}
		}
		window.requestAnimFrame(updategamepadaxes);
	};

	function shortname(name){
		var shortname;
		if(name.includes("PLAYSTATION")){
			shortname = "PlayStation Controller";
		}else if(name.includes("Xbox")){
			shortname = "Xbox Controller";
		}else{
			shortname = "Game Controller";
		}
		return shortname;
	}

	var i18ntitelgpconnect = chrome.i18n.getMessage("titelgpconnect");
	var i18ntitelgpdisconnect = chrome.i18n.getMessage("titelgpdisconnect");

	function statusremotebadge(name, status){
		var div = document.createElement("div");
		div.setAttribute("id", "stefanvdremoteadd");
		div.className = "stefanvdremote";
		document.body.appendChild(div);

		var h3 = document.createElement("h3");
		h3.innerText = shortname(name);
		div.appendChild(h3);

		var p = document.createElement("p");
		if(status == "add"){
			p.innerText = i18ntitelgpconnect;
		}else{
			p.innerText = i18ntitelgpdisconnect;
		}
		div.appendChild(p);

		window.setTimeout(function(){
			var element = document.getElementById("stefanvdremoteadd");
			element.parentNode.removeChild(element);
		}, 4000);
	}

	function playnext(){
		var nextButton = document.getElementsByClassName("ytp-next-button")[0];
		if(nextButton){
			nextButton.click();
		}
	}

	function playprev(){
		var prevButton = document.getElementsByClassName("ytp-prev-button")[0];
		if(prevButton){
			prevButton.click();
		}
	}

	var cdv = 0;
	function changevolume(a){
		var that = document.getElementsByTagName("video")[0];
		if(that){
			if(videovolumesteps != 0.01){
				that.volume = Math.round(that.volume / videovolumesteps) * videovolumesteps; // fix the correct ceil level (steps of the user)
			}

			if(a == "+"){
				if(that.volume <= 0.99){ that.volume += videovolumesteps; }
			}else{
				if(that.volume > 0.00){ that.volume -= videovolumesteps; }
			}
			that.volume = Math.round(that.volume * 100) / 100;
			setyoutubevolumemeter(that.volume);

			document.getElementById("volumecontrol" + cdv).value = Math.round(that.volume * 100);
			if(videovolumelabel == true){ document.getElementById("lblvolume" + cdv).textContent = Math.round(that.volume * 100) + "%"; }
			if(that.volume <= 0){ that.muted = true; }else{ that.muted = false; }

			var el = document.getElementsByClassName("totlmousewheelvideo");
			if(el[cdv]){
				el[cdv].classList.remove("totlhidevolume");
				el[cdv].classList.add("totlvisiblevolume");
			}

			if(scrollTimer != -1){ window.clearTimeout(scrollTimer); }
			scrollTimer = window.setTimeout(function(){
				if(el[cdv]){
					el[cdv].classList.remove("totlvisiblevolume");
					el[cdv].classList.add("totlhidevolume");
				}
			}, 750);
		}
	}

	function exitzoom(a){
		var onevideo = $("stefanvdzoomcanvas" + a);
		onevideo.setAttribute("data-zoom", "false");
		vzoom[a] = 1;
		vrotate[a] = 0;
		onevideo.style.top = 0 + "px";
		onevideo.style.left = 0 + "px";
		onevideo.style["transform"] = "scale(" + vzoom[a] + ") rotate(" + vrotate[a] + "deg)";
		if($("stefanvdzoomstage" + a)){ $("stefanvdzoomstage" + a).style.display = "none"; }
		if($("stefanvdzoomexit" + a)){ $("stefanvdzoomexit" + a).style.setProperty("display", "none", "important"); }
		if($("stefanvdzoompanel" + a)){ $("stefanvdzoompanel" + a).style.display = "none"; }
	}

	function resetzoom(a){
		if($("stefanvdzoomstage" + a)){ $("stefanvdzoomstage" + a).style.display = "block"; }
		if($("stefanvdzoomexit" + a)){ $("stefanvdzoomexit" + a).style.setProperty("display", "block", "important"); }
		var onevideo = $("stefanvdzoomcanvas" + a);
		onevideo.setAttribute("data-zoom", "true");
		vzoom[a] = 1;
		vrotate[a] = 0;
		onevideo.style.top = 0 + "px";
		onevideo.style.left = 0 + "px";
		onevideo.style["transform"] = "scale(" + vzoom[a] + ") rotate(" + vrotate[a] + "deg)";
	}

	var zoompaused = [];
	function drawframezoom(a){
		if(zoompaused[a]){ return; }
		var onevideo = document.getElementsByTagName("video")[a];
		if($("stefanvdzoomcanvas" + a).getAttribute("data-zoom") == "true"){
			var newzoomcontext = $("stefanvdzoomcanvas" + a).getContext("2d", {desynchronized: true});
			newzoomcontext.drawImage(onevideo, 0, 0, onevideo.offsetWidth, onevideo.clientHeight);
			$("stefanvdzoomcanvas" + a).style.width = onevideo.offsetWidth + "px";
			$("stefanvdzoomcanvas" + a).style.height = onevideo.clientHeight + "px";
			window.requestAnimFrame(function(){ drawframezoom(a); });
		}
	}

	function camerazoomrotate(a, b, c){
		if($("stefanvdzoomstage" + a)){ $("stefanvdzoomstage" + a).style.display = "block"; }
		if($("stefanvdzoomexit" + a)){ $("stefanvdzoomexit" + a).style.setProperty("display", "block", "important"); }
		var onevideo = $("stefanvdzoomcanvas" + a);
		onevideo.setAttribute("data-zoom", "true");
		if(b != ""){
			vzoom[a] = vzoom[a] + b;
		}else if(c != ""){
			vrotate[a] = vrotate[a] + c;
		}
		onevideo.style["transform"] = "scale(" + vzoom[a] + ") rotate(" + vrotate[a] + "deg)";
		// start zoom canvas animation
		window.requestAnimFrame(function(){ drawframezoom(a); });
	}

	// b: [top, left, bottom, right]
	function zoompaddirection(a, b){
		if($("stefanvdzoomstage" + a)){ $("stefanvdzoomstage" + a).style.display = "block"; }
		if($("stefanvdzoomexit" + a)){ $("stefanvdzoomexit" + a).style.setProperty("display", "block", "important"); }
		var onevideo = $("stefanvdzoomcanvas" + a);
		onevideo.setAttribute("data-zoom", "true");
		if(b[0] == 1){
			onevideo.style.top = (parseInt(onevideo.style.top, 10) - 5) + "px";
		}else if(b[1] == 1){
			onevideo.style.left = (parseInt(onevideo.style.left, 10) - 5) + "px";
		}else if(b[2] == 1){
			onevideo.style.top = (parseInt(onevideo.style.top, 10) + 5) + "px";
		}else if(b[3] == 1){
			onevideo.style.left = (parseInt(onevideo.style.left, 10) + 5) + "px";
		}
		// start zoom canvas animation
		window.requestAnimFrame(function(){ drawframezoom(a); });
	}

	function gamepadplaypause(){
		var videoPlayer = document.getElementsByTagName("video")[0];
		if(videoPlayer){
			if(videoPlayer.paused == true){
				videoPlayer.play();
			}else{
				videoPlayer.pause();
			}
		}
	}

	function seek(secs){
		var videoPlayer = document.getElementsByTagName("video")[0];
		if(videoPlayer){
			let time = videoPlayer.currentTime + secs;
			if(time < 0){
				time = 0;
			}
			videoPlayer.currentTime = time;
		}
	}

	function onesecondbackward(){
		seek(-1);
	}

	function threesecondbackward(){
		seek(-3);
	}

	function onesecondforward(){
		seek(1);
	}

	function threesecondforward(){
		seek(3);
	}

	// YouTube embed iframe
	if(customqualityyoutube == true){
		var newvideoid;
		var ytembed = document.getElementsByTagName("iframe");
		var z;
		var q = ytembed.length;
		for(z = 0; z < q; z++){
			var ytembedurl = ytembed[z].src;
			if(ytembedurl != undefined || ytembedurl != ""){
				var regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;
				var match = ytembedurl.match(regExp);
				if(match && match[7].length == 11){
					var video_id = ytembedurl.split("embed/")[1];
					if(video_id.indexOf("vq=") != -1){
						if(video_id.indexOf("vq=highres")){ video_id.replace("vq=highres", "vq=" + maxquality + ""); }else if(video_id.indexOf("vq=hd4320")){ video_id.replace("vq=hd4320", "vq=" + maxquality + ""); }else if(video_id.indexOf("vq=hd2160")){ video_id.replace("vq=hd2160", "vq=" + maxquality + ""); }else if(video_id.indexOf("vq=hd1440")){ video_id.replace("vq=hd1440", "vq=" + maxquality + ""); }else if(video_id.indexOf("vq=hd1080")){ video_id.replace("vq=hd1080", "vq=" + maxquality + ""); }else if(video_id.indexOf("vq=hd720")){ video_id.replace("vq=hd720", "vq=" + maxquality + ""); }else if(video_id.indexOf("vq=large")){ video_id.replace("vq=large", "vq=" + maxquality + ""); }else if(video_id.indexOf("vq=medium")){ video_id.replace("vq=medium", "vq=" + maxquality + ""); }else if(video_id.indexOf("vq=small")){ video_id.replace("vq=small", "vq=" + maxquality + ""); }else if(video_id.indexOf("vq=tiny")){ video_id.replace("vq=tiny", "vq=" + maxquality + ""); }else if(video_id.indexOf("vq=default")){ video_id.replace("vq=default", "vq=" + maxquality + ""); }
						newvideoid = video_id + "&vq=" + maxquality + "";
					}else{
						if(video_id.indexOf("?") != -1){ newvideoid = video_id + "&vq=" + maxquality + ""; }else{ newvideoid = video_id + "?vq=" + maxquality + ""; }
					}
					ytembed[z].src = "https://www.youtube.com/embed/" + encodeURIComponent(newvideoid);
				}
			}
		}
	}

	// YouTube auto width the video player content
	// URL control for YouTube only
	if(window.location.href.match(/((http:\/\/(.*youtube\.com\/.*))|(https:\/\/(.*youtube\.com\/.*)))/i)){
		if(no360youtube == true){
			var ytfullvideo = document.getElementsByTagName("video");
			var ytfulli;
			var ytfulll = ytfullvideo.length;
			for(ytfulli = 0; ytfulli < ytfulll; ytfulli++){
				ytfullvideo[ytfulli].classList.add("stefanvdvideotop");
			}
			var ytwebgl = document.getElementsByClassName("webgl");
			var ytgli;
			var ytgll = ytwebgl.length;
			for(ytgli = 0; ytgli < ytgll; ytgli++){ ytwebgl[ytgli].style.display = "none"; }
		}

		// new YouTube october 2013
		var appbarguidemenu = $("appbar-guide-menu");
		if(appbarguidemenu){ $("appbar-guide-menu").style.zIndex = "10"; }

		var appbarguideiframemask = $("appbar-guide-iframe-mask");
		if(appbarguideiframemask){ $("appbar-guide-iframe-mask").style.zIndex = "-1"; }

		// fix self YouTube.com outline to none
		var fixselfyoutubeplayeroutline = $("movie_player");
		if(fixselfyoutubeplayeroutline){ $("movie_player").style.outline = "none"; }

		if(autowidthyoutube == true){
			var yt = yt;
			yt = yt || {};
			yt.playerConfig = {"player_wide": 1};
			document.cookie = "wide=1; domain=.youtube.com; expires=31536e3; path=/";

			// with playlist hide
			if($("watch7-container")){ $("watch7-container").className = "watch-wide watch-playlist-collapsed"; }
			// YouTube wide June 2015
			if($("page")){ $("page").className = "  watch clearfix watch-stage-mode watch-wide"; }
		}

		if(customqualityyoutube == true){
			const params = new URLSearchParams();
			params.set("maxquality", maxquality);
			var script = document.createElement("script"); script.type = "text/javascript"; script.src = chrome.runtime.getURL(`js/hdinject.js?${params}`); document.getElementsByTagName("head")[0].appendChild(script);
		}
	} // end check youtube.com website

	function removeElement(elementId){
		var element = document.getElementById(elementId);
		element.parentNode.removeChild(element);
	}

	function removevideotool(){
		var removespeedelement = document.getElementsByClassName("stefanvdspeed");
		while(removespeedelement.length > 0){
			removespeedelement[0].parentNode.removeChild(removespeedelement[0]);
		}
		var removezoomstageelement = document.getElementsByClassName("stefanvdzoomstage");
		while(removezoomstageelement.length > 0){
			removezoomstageelement[0].parentNode.removeChild(removezoomstageelement[0]);
		}
		var removezoomelement = document.getElementsByClassName("stefanvdzoom");
		while(removezoomelement.length > 0){
			removezoomelement[0].parentNode.removeChild(removezoomelement[0]);
		}
		var removevisualizationelement = document.getElementsByClassName("stefanvdvisualization");
		while(removevisualizationelement.length > 0){
			removevisualizationelement[0].parentNode.removeChild(removevisualizationelement[0]);
		}
		var removeviselement = document.getElementsByClassName("stefanvdvis");
		while(removeviselement.length > 0){
			removeviselement[0].parentNode.removeChild(removeviselement[0]);
		}
	}

	// PIP
	var pipblockarray, pipbars, pipbarx, pipbarwidth, pipbarheight;

	var requestvideopiploop;
	var pipbuffer1;
	var pipbuffer2;
	var pipbctx1;
	var pipbctx2;
	var piprtick = 0;
	var pipgtick = 0;
	var pipbtick = 0;
	var piptimeloop;
	var pipgradient = null;

	var g = 0;
	function pipsetTime(){ ++g; }

	function pipanalamp(hz){
		let l = hz / audiocontext[0].sampleRate * analyser[0].freq.length | 0;
		let sum;
		let i;
		for(sum = 0, i = 0; i < l;) sum += analyser[0].freq[i++];
		return sum / l / 255;
	}

	function pipvideovisualloop(){
		var pipvisualnumber = pipvisualtype;
		if(document.getElementById("stefanvdpipvisualizationcanvas")){
			var canvas = document.getElementById("stefanvdpipvisualizationcanvas");
			var ctx = canvas.getContext("2d", {desynchronized: true});

			requestvideopiploop = window.requestAnimFrame(function(){ pipvideovisualloop(); });
			analyser[0].fftSize = 2048;
			var bufferLength = analyser[0].fftSize;
			var dataArray = new Uint8Array(bufferLength);
			analyser[0].getByteTimeDomainData(dataArray);
			analyser[0].getByteFrequencyData(analyser[0].freq);
			analyser[0].getByteTimeDomainData(analyser[0].wave);
			piptimeloop = window.setInterval(pipsetTime, 1000);

			var w = canvas.width = canvas.clientWidth;
			var h = canvas.height = canvas.clientHeight;

			if(pipvisualnumber == 1){
				pipblockarray = new Uint8Array(analyser[0].frequencyBinCount);
				analyser[0].getByteFrequencyData(pipblockarray);
				ctx.clearRect(0, 0, w, h);
				ctx.fillStyle = "rgba(0,0,0,1)";
				ctx.fillRect(0, 0, w, h);

				pipgradient = ctx.createLinearGradient(0, 0, 0, h + h / 4);
				pipgradient.addColorStop(1, "#0f0");
				pipgradient.addColorStop(0.5, "#ff0");
				pipgradient.addColorStop(0, "#f00");
				ctx.fillStyle = pipgradient;

				pipbars = 500;
				var i;
				for(i = 0; i < pipbars; i++){
					pipbarx = i * 5;
					pipbarwidth = 4;
					pipbarheight = -(pipblockarray[i]);
					ctx.fillRect(pipbarx, h, pipbarwidth, pipbarheight);
				}
			}else if(pipvisualnumber == 2){
				ctx.clearRect(0, 0, w, h);
				analyser[0].getByteTimeDomainData(dataArray);

				ctx.fillStyle = "rgba(0,0,0,1)";
				ctx.fillRect(0, 0, w, h);
				ctx.lineWidth = 2;
				ctx.strokeStyle = "#3cfd2a";
				ctx.beginPath();

				var sliceWidth = w * 1.0 / bufferLength;
				let x = 0;
				let i;
				for(i = 0; i < bufferLength; i++){
					var v = dataArray[i] / 128.0;
					var y = v * h / 2;
					if(i === 0){
						ctx.moveTo(x, y);
					}else{
						ctx.lineTo(x, y);
					}
					x += sliceWidth;
				}
				ctx.lineTo(w, h / 2);
				ctx.stroke();
			}else if(pipvisualnumber == 3){
				ctx.clearRect(0, 0, w, h);
				ctx.fillStyle = "rgba(0,0,0,1)";
				ctx.fillRect(0, 0, w, h);

				if(!pipbuffer1){
					pipbuffer1 = document.createElement("canvas");
					pipbuffer1.width = w;
					pipbuffer1.height = h;

					pipbuffer2 = document.createElement("canvas");
					pipbuffer2.width = w;
					pipbuffer2.height = h;
				}

				pipbctx1 = pipbuffer1.getContext("2d", {desynchronized: true});
				pipbctx2 = pipbuffer2.getContext("2d", {desynchronized: true});

				// copy buffer1 to buffer2
				pipbctx2.drawImage(pipbuffer1, 0, 0);

				// get audio data
				var data = new Uint8Array(2048);
				analyser[0].getByteFrequencyData(data);

				var currenvisvideoplayer = document.getElementsByTagName("video")[0];
				var amp = currenvisvideoplayer.duration ? Math.min(1, Math.pow(1.25 * pipanalamp(10e3), 2)) : 0.5 - 0.25 * Math.cos(g);

				// draw the audio into buffer 2
				piprtick = (piprtick + 1) % 255;
				pipgtick = (pipgtick + 2) % 255;
				pipbtick = (pipbtick + 3) % 255;
				pipbctx2.fillStyle = "rgba(" + piprtick + "," + pipgtick + "," + pipbtick + "," + amp * 3 + ")";
				pipbctx2.strokeStyle = "rgba(" + 20 + "," + 20 + "," + 20 + "," + amp * 3 + ")";
				pipbctx2.lineWidth = 2 * amp;
				pipbctx2.beginPath();

				let i;
				// let j = analyser[0].wave.length;
				let a;
				let r;
				for(i = (data.length / 2) - 1; i >= 0; i--){
					a = i / 22 * 2 * Math.PI;
					r = amp * 256 / 2 * (0.5 + analyser[0].wave[i] / 255);
					pipbctx2.lineTo(r * Math.sin(a) + w / 2, r * Math.cos(a) + h / 2);
				}

				pipbctx2.fill();
				pipbctx2.stroke();

				// copy buffer2 to buffer1, stretched
				// draw more onto buffer
				pipbctx1.drawImage(pipbuffer2, 0, 0, w, h, -25, -25, w + 50, h + 50);
				// draw buffer1 back to screen
				ctx.drawImage(pipbuffer1, 0, 0);
			}
		}
	}

	function removepipvisual(){
		window.cancelAnimationFrame(requestvideopiploop);
		window.clearInterval(piptimeloop);
		g = 0;
		requestvideopiploop = null;
		var elemcanvas = document.getElementById("stefanvdpipvisualizationcanvas");
		if(elemcanvas){ elemcanvas.parentNode.removeChild(elemcanvas); }
		var elemvideo = document.getElementById("stefanvdpipvisualizationvideo");
		if(elemvideo){ elemvideo.parentNode.removeChild(elemvideo); }
	}

	//---
	chrome.runtime.onMessage.addListener(function(request){
		if((request.action === "receivescreenshot")){
			let allowedHosts = [linkcapturescreenshot];
			// completed support hosts
			if(allowedHosts.includes(window.location.href)){
				if($("capturevideoframe")){ $("capturevideoframe").src = request.value; }
				if($("browserextensioninstalled")){ $("browserextensioninstalled").style.display = "none"; }
			}
		}else if(request.action == "gorefresheyelight"){
			chrome.storage.sync.get(["eyea", "eyen"], function(items){
				if(items["eyea"]){ eyea = items["eyea"]; }else{ eyea = items["eyea"]; }
				if(items["eyen"]){ eyen = items["eyen"]; }else{ eyen = items["eyen"]; }
			});
			var blackon = $("stefanvdlightareoff1");
			if(blackon){ chrome.runtime.sendMessage({name: "automatic"}); }
		}else if(request.action == "gorefresheyedark"){
			chrome.storage.sync.get(["eyea", "eyen"], function(items){
				if(items["eyea"]){ eyea = items["eyea"]; }else{ eyea = items["eyea"]; }
				if(items["eyen"]){ eyen = items["eyen"]; }else{ eyen = items["eyen"]; }
				gonighttime();
			});
		}else if(request.action == "goclearscreenshader"){
			var stefanscreenshader = $("stefanvdscreenshader");
			if(stefanscreenshader){
				document.documentElement.removeChild(stefanscreenshader);
			}
		}else if(request.action == "goremovelightoff"){
			let blackon = $("stefanvdlightareoff1");
			if(blackon){ chrome.runtime.sendMessage({name: "automatic"}); }
		}else if(request.action == "goaddlightoff"){
			let blackon = $("stefanvdlightareoff1");
			if(blackon == null){ chrome.runtime.sendMessage({name: "automatic"}); }
		}else if(request.action == "masterclick"){
			let blackon = $("stefanvdlightareoff1");
			if(blackon){ chrome.runtime.sendMessage({name: "mastertabdark", value: true}); }else{ chrome.runtime.sendMessage({name: "mastertabdark", value: false}); }
		}else if(request.action == "gorefreshvideonumber"){
			adddatavideo();// recheck the video content on the current web page
		}else if(request.action == "goenableatmos"){
			chrome.storage.sync.get(["ambilight", "ambilightfixcolor", "ambilight4color", "ambilightvarcolor", "atmosvivid", "vpause", "atmosfpsauto", "atmosfpsmanual", "drawatmosfps", "ambilightcolorhex", "ambilight1colorhex", "ambilight2colorhex", "ambilight3colorhex", "ambilight4colorhex", "ambilightrangeblurradius", "ambilightrangespreadradius", "atmosontotlmode", "atmosphereonly", "atmosphereDomains"], function(items){

				if(items["ambilightfixcolor"]){
					ambilightfixcolor = true;
					ambilight4color = false;
					ambilightvarcolor = false;
				}
				if(items["ambilight4color"]){
					ambilightfixcolor = false;
					ambilight4color = true;
					ambilightvarcolor = false;
				}
				if(items["ambilightvarcolor"]){
					ambilightfixcolor = false;
					ambilight4color = false;
					ambilightvarcolor = true;
				}
				vpause = items["vpause"];
				atmosfpsauto = items["atmosfpsauto"];
				atmosfpsmanual = items["atmosfpsmanual"];
				drawatmosfps = items["drawatmosfps"];
				ambilightcolorhex = items["ambilightcolorhex"];
				ambilight1colorhex = items["ambilight1colorhex"];
				ambilight2colorhex = items["ambilight2colorhex"];
				ambilight3colorhex = items["ambilight3colorhex"];
				ambilight4colorhex = items["ambilight4colorhex"];
				ambilightrangeblurradius = items["ambilightrangeblurradius"];
				ambilightrangespreadradius = items["ambilightrangespreadradius"];
				atmosontotlmode = items["atmosontotlmode"];
				atmosphereonly = items["atmosphereonly"];
				atmosphereDomains = items["atmosphereDomains"];

				if(items["atmosvivid"]){
					atmosvivid = true;

					var htmlplayer = document.getElementsByTagName("video");
					var j;
					var l = htmlplayer.length;
					for(j = 0; j < l; j++){
						if(htmlplayer[j]){
							htmlplayer[j].style["boxShadow"] = "none";
							if($("stefanvdvivideffect" + htmlplayer[j].getAttribute("data-video"))){
								var stefanvdvivideffect = $("stefanvdvivideffect" + htmlplayer[j].getAttribute("data-video"));
								stefanvdvivideffect.parentNode.removeChild(stefanvdvivideffect);
							}
						}
					}
					if(window.location.href.match(/((http:\/\/(.*youtube\.com\/.*))|(https:\/\/(.*youtube\.com\/.*)))/i)){
						var youtubewindow = $("movie_player") || document.getElementsByTagName("ytg-persistent-player")[0];
						youtubewindow.style["boxShadow"] = "none";
					}
				}else{
					atmosvivid = false;
					let htmlplayer = document.getElementsByTagName("video");
					let j;
					let l = htmlplayer.length;
					for(j = 0; j < l; j++){
						if(htmlplayer[j]){
							if($("stefanvdvivideffect" + htmlplayer[j].getAttribute("data-video"))){
								let stefanvdvivideffect = $("stefanvdvivideffect" + htmlplayer[j].getAttribute("data-video"));
								stefanvdvivideffect.parentNode.removeChild(stefanvdvivideffect);
							}
						}
					}
				}

				if(items["ambilight"]){
					ambilight = true;
					stop = false;
					ambilightfunction();
				}else{
					ambilight = false;
					stop = true;
					stopAnimation();

					let htmlplayer = document.getElementsByTagName("video");
					let j;
					let l = htmlplayer.length;
					for(j = 0; j < l; j++){
						if(htmlplayer[j]){
							htmlplayer[j].style["boxShadow"] = "none";
							if($("stefanvdvivideffect" + htmlplayer[j].getAttribute("data-video"))){
								let stefanvdvivideffect = $("stefanvdvivideffect" + htmlplayer[j].getAttribute("data-video"));
								stefanvdvivideffect.parentNode.removeChild(stefanvdvivideffect);
							}
						}
					}
					if(window.location.href.match(/((http:\/\/(.*youtube\.com\/.*))|(https:\/\/(.*youtube\.com\/.*)))/i)){
						let youtubewindow = $("movie_player") || document.getElementsByTagName("ytg-persistent-player")[0];
						youtubewindow.style["boxShadow"] = "none";
					}
				}
			});
		}else if(request.action == "gorefreshautodim"){
			chrome.storage.sync.get(["autodim", "mousespotlights", "autodimDomains", "autodimchecklistwhite", "autodimchecklistblack", "autodimonly", "aplay", "apause", "astop", "autodimdelay", "autodimdelaytime"], function(items){
				autodim = items["autodim"];
				mousespotlights = items["mousespotlights"];
				autodimDomains = response["autodimDomains"];
				autodimchecklistwhite = items["autodimchecklistwhite"];
				autodimchecklistblack = items["autodimchecklistblack"];
				autodimonly = items["autodimonly"];
				aplay = items["aplay"];
				apause = items["apause"];
				astop = items["astop"];
				autodimdelay = items["autodimdelay"];
				autodimdelaytime = items["autodimdelaytime"];

				// remove
				window.clearInterval(startautodim);
				if(document.getElementById("totlautodim")){
					removeElement("totlautodim");
				}
				if(document.getElementById("stefanvdcinemamessage")){
					removeElement("stefanvdcinemamessage");
				}

				if(autodim == true){
					addautodimfile();
					runautodimcheck();
				}
			});
		}else if(request.action == "gorefreshvideotoolbar"){
			chrome.storage.sync.get(["videotool", "videotoolonly", "videotoolDomains", "videotoolchecklistwhite", "videotoolchecklistblack", "speedtoolbar", "videozoom", "visopacity", "videotoolcolor"], function(items){
				videotool = items["videotool"];
				videotoolonly = items["videotoolonly"];
				videotoolDomains = items["videotoolDomains"];
				videotoolchecklistwhite = items["videotoolchecklistwhite"];
				videotoolchecklistblack = items["videotoolchecklistblack"];
				speedtoolbar = items["speedtoolbar"];
				videozoom = items["videozoom"];
				visopacity = items["visopacity"];
				videotoolcolor = items["videotoolcolor"];

				// remove
				if(MutationObserver){
					if(typeof observervideotoolbar != "undefined"){
						observervideotoolbar.disconnect();
					}
				}

				window.removeEventListener("resize", myListenerWithContext);

				removevideotool();

				if(videotool == true){
					runvideotoolbarcheck();
				}
			});
		}else if(request.action == "gorefreshmousescroll"){
			chrome.storage.sync.get(["videovolume", "videovolumealt", "videovolumehold", "videovolumeposa", "videovolumeposb", "videovolumeposc", "videovolumecolor", "videovolumelabel", "videovolumesteps", "videovolumeonly", "videovolumeDomains", "videovolumechecklistwhite", "videovolumechecklistblack", "videovolumescrolla", "videovolumescrollb", "videovolumescrollc", "videovolumeposd", "videovolumepose"], function(items){
				videovolume = items["videovolume"];
				videovolumealt = items["videovolumealt"];
				videovolumehold = items["videovolumehold"];
				videovolumeposa = items["videovolumeposa"];
				videovolumeposb = items["videovolumeposb"];
				videovolumeposc = items["videovolumeposc"];
				videovolumecolor = items["videovolumecolor"];
				videovolumelabel = items["videovolumelabel"];
				videovolumesteps = items["videovolumesteps"];
				videovolumeonly = items["videovolumeonly"];
				videovolumeDomains = items["videovolumeDomains"];
				videovolumechecklistwhite = items["videovolumechecklistwhite"];
				videovolumechecklistblack = items["videovolumechecklistblack"];
				videovolumescrolla = items["videovolumescrolla"];
				videovolumescrollb = items["videovolumescrollb"];
				videovolumescrollc = items["videovolumescrollc"];
				videovolumeposd = items["videovolumeposd"];
				videovolumepose = items["videovolumepose"];

				// remove
				if(MutationObserver){
					if(typeof observervideovolume != "undefined"){
						observervideovolume.disconnect();
					}
				}

				window.removeEventListener("resize", myListenerWithContextvolume);

				window.removeEventListener("wheel", doscroll, {passive: false});
				window.removeEventListener("DOMMouseScroll", doscroll, false);

				rundoscrollfunc = false;
				if(document.getElementById("csstotlvolume")){
					var element = document.getElementById("csstotlvolume");
					element.parentNode.removeChild(element);
				}

				var elements = document.getElementsByClassName("totlmousewheelvideo");
				while(elements.length > 0){
					elements[0].parentNode.removeChild(elements[0]);
				}

				if(videovolume == true){
					runvideovolumecheck();
				}
			});
		}else if(request.action == "gorefreshreflection"){
			chrome.storage.sync.get(["reflection", "reflectionamount"], function(items){
				reflection = items["reflection"];
				reflectionamount = items["reflectionamount"];

				// remove
				window.clearInterval(startreflection);

				var reflectionplayer = document.getElementsByTagName("video") || null;
				var refk;
				var l = reflectionplayer.length;
				for(refk = 0; refk < l; refk++){
					reflectionplayer[refk].style.webkitBoxReflect = "";
				}

				if(reflection == true){
					runreflectioncheck();
				}
			});
		}else if(request.action == "gorefreshhovervideo"){
			chrome.storage.sync.get(["hovervideo", "hovervideoamount"], function(items){
				hovervideo = items["hovervideo"];
				hovervideoamount = items["hovervideoamount"];

				// remove
				window.clearTimeout(htimer);

				var hvids = document.getElementsByTagName("video");
				var i;
				var l = hvids.length;
				for(i = 0; i < l; i++){
					hvids.item(i).removeEventListener("pointerover", hoveractionover);
					hvids.item(i).removeEventListener("pointerout", hoveractionout);
				}

				if(hovervideo == true){
					runhovervideocheck();
				}
			});
		}else if(request.action == "gorefreshplayrate"){
			chrome.storage.sync.get(["playrate", "playrateamount"], function(items){
				playrate = items["playrate"];
				playrateamount = items["playrateamount"];

				// remove
				var ratevideos = document.getElementsByTagName("video");
				var i;
				var l = ratevideos.length;
				for(i = 0; i < l; i++){
					var myElement = document.getElementsByTagName("video")[i];
					myElement.playbackRate = 1;// default value
				}

				if(playrate == true){
					runplayratecheck();
				}
			});
		}else if(request.action == "gorefresheyesaver"){
			chrome.storage.sync.get(["ecosaver", "ecosavertime"], function(items){
				ecosaver = items["ecosaver"];
				ecosavertime = items["ecosavertime"];

				// remove
				screenactiondone = false;
				centralmove = false;
				centralkey = false;
				centralscroll = false;
				window.clearTimeout(ecothreadmove);
				window.clearTimeout(ecothreadkey);
				window.clearTimeout(ecothreadscroll);
				window.removeEventListener("pointermove", ecomousemove);
				window.removeEventListener("keydown", ecomousekey);
				window.removeEventListener("wheel", ecomousescroll);

				gonighttime();
			});
		}else if(request.action == "gorefreshnighttime"){
			chrome.storage.sync.get(["nighttime", "begintime", "endtime"], function(items){
				nighttime = items["nighttime"];
				begintime = items["begintime"];
				endtime = items["endtime"];

				// remove
				screenactiondone = false;
				centralmove = false;
				centralkey = false;
				centralscroll = false;
				window.clearTimeout(ecothreadmove);
				window.clearTimeout(ecothreadkey);
				window.clearTimeout(ecothreadscroll);
				window.removeEventListener("pointermove", ecomousemove);
				window.removeEventListener("keydown", ecomousekey);
				window.removeEventListener("wheel", ecomousescroll);

				gonighttime();
			});
		}else if(request.action == "gorefreshpipvisualtype"){
			chrome.storage.sync.get(["pipvisualtype"], function(items){
				pipvisualtype = items["pipvisualtype"];
			});
		}else if(request.action == "gopipvisual"){
			var videotopipvisual = document.getElementsByTagName("video")[0];
			if(videotopipvisual){
				if(!document.getElementById("stefanvdpipvisualizationcanvas")){
					var pipcanvas = document.createElement("canvas");
					pipcanvas.id = "stefanvdpipvisualizationcanvas";
					pipcanvas.style.width = "640" + "px";
					pipcanvas.style.height = "360" + "px";
					document.body.appendChild(pipcanvas);

					var pipvideo = document.createElement("video");
					pipvideo.id = "stefanvdpipvisualizationvideo";
					pipvideo.playsinline = true;
					pipvideo.autoplay = true;
					// pipvideo.muted = true; // disable else it will not render
					document.body.appendChild(pipvideo);
				}

				if(typeof audiocontext[0] == "undefined"){
					// I am new now
					audiocontext[0] = new AudioContext();
					analyser[0] = audiocontext[0].createAnalyser();
				}
				var myElement = document.getElementsByTagName("video")[0];

				// Fix Chrome 71
				audiocontext[0].resume().then(() =>{
				// console.log("Turn Off the Lights - Visualization resumed successfully");
				// refresh the visualization
					if(typeof audiocontext[0] != "undefined"){
						if(vissources[0] == undefined){
							try{
								vissources[0] = audiocontext[0].createMediaElementSource(myElement);
								vissources[0].connect(analyser[0]);
							}catch(e){ console.error(e); }
						}
						analyser[0].connect(audiocontext[0].destination);
					}
				});
				analyser[0].wave = new Uint8Array(analyser[0].frequencyBinCount * 2);
				analyser[0].freq = new Uint8Array(analyser[0].frequencyBinCount);

				pipvideovisualloop();

				const canvas = document.getElementById("stefanvdpipvisualizationcanvas");
				const videopipvisual = document.getElementById("stefanvdpipvisualizationvideo");

				const stream = canvas.captureStream();
				videopipvisual.srcObject = stream;

				videopipvisual.addEventListener("leavepictureinpicture", () => {
					removepipvisual();
				});
			}
		}else if(request.action == "gorefreshgamepad"){
			chrome.storage.sync.get(["gamepad", "gpleftstick", "gprightstick", "gpbtnx", "gpbtno", "gpbtnsquare", "gpbtntriangle", "gpbtnlb", "gpbtnrb", "gpbtnlt", "gpbtnrt", "gpbtnshare", "gpbtnmenu", "gpbtnrightstick", "gpbtnleftstick", "gpbtndirup", "gpbtndirdown", "gpbtndirleft", "gpbtndirright", "gpbtnlogo", "gamepadonly", "gamepadDomains", "gamepadchecklistwhite", "gamepadchecklistblack"], function(items){
				gamepad = items["gamepad"];
				gpleftstick = items["gpleftstick"];
				gprightstick = items["gprightstick"];
				gpbtnx = items["gpbtnx"];
				gpbtno = items["gpbtno"];
				gpbtnsquare = items["gpbtnsquare"];
				gpbtntriangle = items["gpbtntriangle"];
				gpbtnlb = items["gpbtnlb"];
				gpbtnrb = items["gpbtnrb"];
				gpbtnlt = items["gpbtnlt"];
				gpbtnrt = response["gpbtnrt"];
				gpbtnshare = items["gpbtnshare"];
				gpbtnmenu = items["gpbtnmenu"];
				gpbtnrightstick = items["gpbtnrightstick"];
				gpbtnleftstick = items["gpbtnleftstick"];
				gpbtndirup = items["gpbtndirup"];
				gpbtndirdown = items["gpbtndirdown"];
				gpbtndirleft = items["gpbtndirleft"];
				gpbtndirright = items["gpbtndirright"];
				gpbtnlogo = items["gpbtnlogo"];
				gamepadonly = items["gamepadonly"];
				gamepadDomains = items["gamepadDomains"];
				gamepadchecklistwhite = items["gamepadchecklistwhite"];
				gamepadchecklistblack = items["gamepadchecklistblack"];

				window.cancelAnimationFrame(updategamepadbuttons);
				window.cancelAnimationFrame(updategamepadaxes);
				window.removeEventListener("gamepadconnected", gpstartconnnected);
				window.removeEventListener("gamepaddisconnected", gpdisconnected);

				if(gamepad == true){
					rungamepadcheck();
				}
			});
		}
	});

});