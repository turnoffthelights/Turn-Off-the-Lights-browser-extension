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

window.getPosition = function(el){
	var xPos = 0; var yPos = 0;
	while(el){ xPos += (el.offsetLeft - el.scrollLeft + el.clientLeft); yPos += (el.offsetTop - el.scrollTop + el.clientTop); el = el.offsetParent; }
	return{x:xPos, y:yPos};
};

window.removeAllByClass = function(className){
	const elements = document.getElementsByClassName(className);
	while(elements.length > 0) elements[0].parentNode.removeChild(elements[0]);
};

// Install on www.stefanvd.net
// Install on www.turnoffthelights.com
if(window.location.href.match(/^http(s)?:\/\/(www\.)?stefanvd.net/i) || window.location.href.match(/^http(s)?:\/\/(www\.)?turnoffthelights.com/i)){
	if($("turnoffthelights-" + exbrowser + "-install-button")){
		$("turnoffthelights-" + exbrowser + "-install-button").style.display = "none";
		$("turnoffthelights-" + exbrowser + "-thanks-button").style.display = "block";
	}
	if($("turnoffthelights-card")){
		$("turnoffthelights-card").style.display = "none";
	}
}

document.addEventListener("click", function(event){
	const anchor = event.target.closest("a[href^=\"turnoffthelights://\"]");
	if(anchor){
		event.preventDefault();
		try{
			const url = new URL(anchor.href);
			const action = url.searchParams.get("action");
			const tab = url.searchParams.get("tab");
			const jsonParam = url.searchParams.get("json");

			if(action === "options"){
				chrome.runtime.sendMessage({name: "redirectionoptionsnewtab", value:tab});
				return;
			}

			if(action === "nighttheme" && jsonParam){
				const decoded = decodeURIComponent(jsonParam);
				const theme = JSON.parse(decoded);

				const newvalues = {"nightmodestandard":false, "nightmodepersonalized":true};

				if(theme.bg) newvalues.nightmodebck = "#" + theme.bg;
				if(theme.text) newvalues.nightmodetxt = "#" + theme.text;
				if(theme.link) newvalues.nightmodehyperlink = "#" + theme.link;
				if(theme.button) newvalues.nightmodebutton = "#" + theme.button;
				if(theme.button_border) newvalues.nightmodeborder = "#" + theme.button_border;

				if(Object.keys(newvalues).length > 0){
					chrome.storage.sync.set(newvalues, function(){
						console.log("Theme settings saved.");
					});
				}
			}
		}catch(e){
			console.error("Failed to parse theme data:", e);
		}
	}
});

// settings
var eyen = null, eyea = null, eyealist = null, excludedDomains = null, nighttime = null, begintime = null, endtime = null, ecosaver = null, ecosavertime = null, customqualityyoutube = null, maxquality = null, eyechecklistwhite = null, eyechecklistblack = null, hovervideo = null, hovervideoamount = null, mouseshake = null, mouseshakesensitivity = null, playrate = null, playrateamount = null, pipvisualtype = null;
/* -------------------------------------------------- */
chrome.storage.sync.get(["eyen", "eyea", "eyealist", "excludedDomains", "nighttime", "begintime", "endtime", "ecosaver", "ecosavertime", "maxquality", "customqualityyoutube", "eyechecklistwhite", "eyechecklistblack", "hovervideo", "hovervideoamount", "mouseshake", "mouseshakesensitivity", "playrate", "playrateamount", "pipvisualtype"], function(items){
	eyen = items["eyen"];
	eyea = items["eyea"];
	eyealist = items["eyealist"];
	excludedDomains = items["excludedDomains"];
	nighttime = items["nighttime"];
	begintime = items["begintime"];
	endtime = items["endtime"];
	ecosaver = items["ecosaver"];
	ecosavertime = items["ecosavertime"];
	maxquality = items["maxquality"];
	customqualityyoutube = items["customqualityyoutube"];
	eyechecklistwhite = items["eyechecklistwhite"];
	eyechecklistblack = items["eyechecklistblack"];
	hovervideo = items["hovervideo"];
	hovervideoamount = items["hovervideoamount"]; if(hovervideoamount == null)hovervideoamount = 3;
	playrate = items["playrate"];
	playrateamount = items["playrateamount"]; if(playrateamount == null)playrateamount = 1;
	pipvisualtype = items["pipvisualtype"]; if(pipvisualtype == null)pipvisualtype = 1;
	mouseshake = items["mouseshake"]; if(mouseshake == null)mouseshake = false;
	mouseshakesensitivity = items["mouseshakesensitivity"]; if(mouseshakesensitivity == null)mouseshakesensitivity = 4;

	// Mark that we need to initialize mouse shake detection
	if(mouseshake == true){
		window.addEventListener("load", function(){
			window.addEventListener("mousemove", detectMouseShake);
		});
	}

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

	window.checkregdomaininside = function(thaturl, websiteurl){
		var rxUrlSplit = /((?:http|ftp)s?):\/\/([^/]+)(\/.*)?/;
		var prepUrl = "";
		var m;

		if((m = thaturl.match(rxUrlSplit)) !== null){
			// 1. Combine the full URL parts
			var fullPath = m[1] + "://" + m[2] + (m[3] || "");

			// 2. Escape regex special characters (except the asterisk for now)
			// We escape: . ? ( ) [ ] \ + ^ $ |
			prepUrl = fullPath.replace(/[?()[\]\\.+^$|]/g, "\\$&");

			// 3. Handle the asterisk:
			// In the previous step, '*' was NOT escaped, or if it was,
			// we now convert it to '.*'
			prepUrl = prepUrl.replace(/\*/g, ".*");

			// 4. Finally, escape all forward slashes to get the \/ format
			prepUrl = prepUrl.replace(/\//g, "\\/");
		}

		if(prepUrl){
			// Output will be: https:\/\/www\.youtube\.com\/watch.*
			// console.log("Generated Pattern:", prepUrl);
			var finalRegex = new RegExp("^" + prepUrl + "$", "i");
			return finalRegex.test(websiteurl);
		}
		return false;
	};

	window.checkDomainFeature = function(featureEnabled, domains, checklistWhite, checklistBlack, onlyMode, callback){
		if(featureEnabled){
			if(onlyMode){
				var currenturl = window.location.protocol + "//" + window.location.host;
				var currentfullurl = window.location.href;
				var blacklisted = false;
				if(typeof domains == "string"){
					domains = JSON.parse(domains);
					var domainList = [];
					var domain;
					for(domain in domains)
						domainList.push(domain);
					domainList.sort();
					var i;
					var l = domainList.length;
					for(i = 0; i < l; i++){
						if(checklistWhite == true){
							if(domainList[i].includes("*")){
								if(window.checkregdomaininside(domainList[i], currentfullurl) == true){
									callback();
									return;
								}
							}else{
								if(currenturl == domainList[i]){
									callback();
									return;
								}
							}
						}else if(checklistBlack == true){
							if(domainList[i].includes("*")){
								if(window.checkregdomaininside(domainList[i], currentfullurl) == true){
									blacklisted = true;
								}
							}else{
								if(currenturl == domainList[i]){ blacklisted = true; }
							}
						}
					}
				}
				if(checklistBlack == true && blacklisted == false){
					callback();
					return;
				}
			}else{
				callback();
				return;
			}
		}
	};

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
	window.adddatavideo = adddatavideo;

	// audio visualization state, shared with the video toolbar in video-toolbar.js
	window.totlaudioctx = window.totlaudioctx || [];
	window.totlanalyser = window.totlanalyser || [];
	window.totlvissources = window.totlvissources || [];
	var audioCtx = window.totlaudioctx;
	var analyser = window.totlanalyser;
	var vissources = window.totlvissources;

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
							if(window.checkregdomaininside(eyebuf[i], currenturl) == true){
								chrome.runtime.sendMessage({name: "automatic"});
							}
						}else{
							// regular text
							if(currenturl == eyebuf[i]){ chrome.runtime.sendMessage({name: "automatic"}); }
						}
					}else if(eyechecklistblack == true){
						if(eyebuf[i].includes("*")){
							// regex test
							if(window.checkregdomaininside(eyebuf[i], currenturl) == true){
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

	// Mouse shake detection variables
	var lastMouseX = null;
	var lastDirection = 0;
	var shakeReversals = [];
	var mouseShakeTimeWindow = 500; // Time window in ms to detect shake

	var detectMouseShake = function(e){
		if(!mouseshake)return;

		var mouseX = e.clientX;
		var now = Date.now();

		if(lastMouseX === null){
			lastMouseX = mouseX;
			return;
		}

		var dx = mouseX - lastMouseX;

		// Ignore tiny movements
		if(Math.abs(dx) < 10){
			return;
		}

		var direction = dx > 0 ? 1 : -1;

		if(lastDirection !== 0 && direction !== lastDirection){
			shakeReversals.push(now);

			// Keep only recent reversals
			shakeReversals = shakeReversals.filter(function(t){
				return now - t < mouseShakeTimeWindow;
			});

			// Adjust required direction changes based on sensitivity (1-20 scale, higher = more sensitive)
			// Sensitivity 1 = 8 changes, Sensitivity 7 = 2 changes
			var requiredChanges = Math.max(
				2,
				9 - mouseshakesensitivity
			);

			if(shakeReversals.length >= requiredChanges){
				shakeReversals = [];
				// shake action
				chrome.runtime.sendMessage({name: "automatic"});
			}
		}

		lastDirection = direction;
		lastMouseX = mouseX;
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



	function playnext(){
		var nextButton = document.getElementsByClassName("ytp-next-button")[0];
		if(nextButton){
			nextButton.click();
		}
	}
	window.playnext = playnext;

	function playprev(){
		var prevButton = document.getElementsByClassName("ytp-prev-button")[0];
		if(prevButton){
			prevButton.click();
		}
	}
	window.playprev = playprev;

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
	window.seek = seek;

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
						video_id = video_id.replace(/vq=(highres|hd4320|hd2160|hd1440|hd1080|hd720|large|medium|small|tiny|default)/, "vq=" + maxquality);
						newvideoid = video_id + "&vq=" + maxquality;
					}else{
						if(video_id.indexOf("?") != -1){ newvideoid = video_id + "&vq=" + maxquality + ""; }else{ newvideoid = video_id + "?vq=" + maxquality + ""; }
					}
					ytembed[z].src = "https://www.youtube.com/embed/" + encodeURIComponent(newvideoid);
				}
			}
		}
	}

	window.removeElement = function(elementId){
		var element = document.getElementById(elementId);
		if(element){
			element.parentNode.removeChild(element);
		}
	};

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
		let l = hz / audioCtx[0].sampleRate * analyser[0].freq.length | 0;
		let sum;
		let i;
		for(sum = 0, i = 0; i < l;) sum += analyser[0].freq[i++];
		return sum / l / 255;
	}

	function pipvideovisualloop(){
		var pipvisualnumber = pipvisualtype;
		if(document.getElementById("stefanvdpipvisualizationcanvas")){
			var canvas = document.getElementById("stefanvdpipvisualizationcanvas");
			var ctx = canvas.getContext("2d", {desynchronized: true, willReadFrequently: true});

			requestvideopiploop = window.requestAnimationFrame(function(){ pipvideovisualloop(); });
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
	// Helper function to show toggle notification
	function showToggleNotification(titleKey, domainsKey){
		chrome.storage.sync.get([domainsKey], function(items){
			var domains = items[domainsKey];
			var div = document.createElement("div");
			div.setAttribute("id", "stefanvdremoteadd");
			div.className = "stefanvdremote";
			document.body.appendChild(div);

			var h3 = document.createElement("h3");
			h3.innerText = chrome.i18n.getMessage(titleKey);
			div.appendChild(h3);

			var currenttoggledomain = window.location.protocol + "//" + window.location.hostname;
			var p = document.createElement("p");

			domains = JSON.parse(domains);
			if(domains[currenttoggledomain]){
				p.innerText = chrome.i18n.getMessage("deswebsiteon") + " " + currenttoggledomain;
			}else{
				p.innerText = chrome.i18n.getMessage("deswebsiteoff") + " " + currenttoggledomain;
			}
			div.appendChild(p);

			window.setTimeout(function(){
				var element = document.getElementById("stefanvdremoteadd");
				element.parentNode.removeChild(element);
			}, 4000);
		});
	}

	// Action handler map
	const actionHandlers = {
		receivescreenshot: function(request){
			let allowedHosts = [linkcapturescreenshot];
			if(allowedHosts.includes(window.location.href)){
				if($("capturevideoframe")){ $("capturevideoframe").src = request.value; }
				if($("browserextensioninstalled")){ $("browserextensioninstalled").style.display = "none"; }
			}
		},
		gorefresheyelight: function(){
			chrome.storage.sync.get(["eyea", "eyen"], function(items){
				eyea = items["eyea"];
				eyen = items["eyen"];
			});
			var blackon = $("stefanvdlightareoff1");
			if(blackon){ chrome.runtime.sendMessage({name: "automatic"}); }
		},
		gorefresheyedark: function(){
			chrome.storage.sync.get(["eyea", "eyen"], function(items){
				eyea = items["eyea"];
				eyen = items["eyen"];
				gonighttime();
			});
		},
		goclearscreenshader: function(){
			var stefanscreenshader = $("stefanvdscreenshader");
			if(stefanscreenshader){
				document.documentElement.removeChild(stefanscreenshader);
			}
		},
		goremovelightoff: function(){
			let blackon = $("stefanvdlightareoff1");
			if(blackon){ chrome.runtime.sendMessage({name: "automatic"}); }
		},
		goaddlightoff: function(){
			let blackon = $("stefanvdlightareoff1");
			if(blackon == null){ chrome.runtime.sendMessage({name: "automatic"}); }
		},
		masterclick: function(){
			let blackon = $("stefanvdlightareoff1");
			if(blackon){ chrome.runtime.sendMessage({name: "mastertabdark", value: true}); }else{ chrome.runtime.sendMessage({name: "mastertabdark", value: false}); }
		},
		gorefreshvideonumber: function(){
			adddatavideo();
		},
		gamepadplaypause: function(){
			var videoPlayer = document.getElementsByTagName("video")[0];
			if(videoPlayer){
				if(videoPlayer.paused == true){
					videoPlayer.play();
				}else{
					videoPlayer.pause();
				}
			}
		},
		playnext: function(){
			var nextButton = document.getElementsByClassName("ytp-next-button")[0];
			if(nextButton){
				nextButton.click();
			}
		},
		playprev: function(){
			var prevButton = document.getElementsByClassName("ytp-prev-button")[0];
			if(prevButton){
				prevButton.click();
			}
		},
		seek: function(request){
			seek(request.value);
		},
		gorefreshhovervideo: function(){
			chrome.storage.sync.get(["hovervideo", "hovervideoamount"], function(items){
				hovervideo = items["hovervideo"];
				hovervideoamount = items["hovervideoamount"];

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
		},
		gorefreshmouseshake: function(){
			chrome.storage.sync.get(["mouseshake", "mouseshakesensitivity"], function(items){
				mouseshake = items["mouseshake"];
				mouseshakesensitivity = items["mouseshakesensitivity"];
				window.removeEventListener("mousemove", detectMouseShake);

				if(mouseshake == true){
					window.addEventListener("mousemove", detectMouseShake);
				}
			});
		},
		gorefreshplayrate: function(){
			chrome.storage.sync.get(["playrate", "playrateamount"], function(items){
				playrate = items["playrate"];
				playrateamount = items["playrateamount"];

				// remove
				var ratevideos = document.getElementsByTagName("video");
				var i;
				var l = ratevideos.length;
				for(i = 0; i < l; i++){
					var myElement = document.getElementsByTagName("video")[i];
					myElement.playbackRate = 1;
				}

				if(playrate == true){
					runplayratecheck();
				}
			});
		},
		gorefresheyesaver: function(){
			chrome.storage.sync.get(["ecosaver", "ecosavertime"], function(items){
				ecosaver = items["ecosaver"];
				ecosavertime = items["ecosavertime"];

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
		},
		gorefreshnighttime: function(){
			chrome.storage.sync.get(["nighttime", "begintime", "endtime"], function(items){
				nighttime = items["nighttime"];
				begintime = items["begintime"];
				endtime = items["endtime"];

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
		},
		gorefreshpipvisualtype: function(){
			chrome.storage.sync.get(["pipvisualtype"], function(items){
				pipvisualtype = items["pipvisualtype"];
			});
		},
		gopipvisual: async function(){
			var videotopipvisual = document.getElementById("stefanvdpipvisualizationcanvas");
			if(!videotopipvisual){
				if(!document.getElementById("stefanvdpipvisualizationcanvas")){
					var pipcanvas = document.createElement("canvas");
					pipcanvas.id = "stefanvdpipvisualizationcanvas";
					pipcanvas.style.width = "640px";
					pipcanvas.style.height = "360px";
					document.body.appendChild(pipcanvas);

					var pipvideo = document.createElement("video");
					pipvideo.id = "stefanvdpipvisualizationvideo";
					pipvideo.playsinline = true;
					pipvideo.autoplay = true;
					// pipvideo.muted = true; // disable else it will not render
					document.body.appendChild(pipvideo);
				}

				if(typeof audioCtx[0] == "undefined"){
					audioCtx[0] = new AudioContext();
					analyser[0] = audioCtx[0].createAnalyser();
				}
				var myElement = document.getElementsByTagName("video")[0];

				// Fix Chrome 71
				await audioCtx[0].resume();
				// console.log("Turn Off the Lights - Visualization resumed successfully");
				// refresh the visualization
				if(typeof audioCtx[0] != "undefined"){
					if(vissources[0] == undefined){
						try{
							vissources[0] = audioCtx[0].createMediaElementSource(myElement);
							vissources[0].connect(analyser[0]);
						}catch(e){ console.error(e); }
					}
					analyser[0].connect(audioCtx[0].destination);
				}
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
		},
		gotoggleautodim: function(){
			showToggleNotification("titelautodim", "autodimDomains");
		},
		gotoggleautostop: function(){
			showToggleNotification("titelautostop", "autostopDomains");
		},
		gotogglenightmode: function(){
			showToggleNotification("titelnighttheme", "nightDomains");
		}
	};

	chrome.runtime.onMessage.addListener(function(request){
		const handler = actionHandlers[request.action];
		if(handler){
			handler(request);
		}
	});
});