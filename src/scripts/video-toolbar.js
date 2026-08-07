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

// Video Toolbar (visualization, filters, zoom, speed) for HTML5 video players

function $(id){ return document.getElementById(id); }

// settings
var videotool = null, videotoolonly = null, videotoolDomains = null, videotoolchecklistwhite = null, videotoolchecklistblack = null, visopacity = null, videotoolcolor = null, videozoom = null, speedtoolbar = null, gamepad = null, videofilled = null, playrateamount = null;

// audio visualization state, shared with the PIP visualization in content.js
window.totlaudioctx = window.totlaudioctx || [];
window.totlanalyser = window.totlanalyser || [];
window.totlvissources = window.totlvissources || [];
var audioCtx = window.totlaudioctx;
var analyser = window.totlanalyser;
var vissources = window.totlvissources;
var visualnumber = [];

var vzoom = [];
var vrotate = [];

var myListenerWithContext;
var myFullscreenListener;
var observervideotoolbar;

function runvideotoolbarcheck(){
	window.checkDomainFeature(videotool == true || gamepad == true, videotoolDomains, videotoolchecklistwhite, videotoolchecklistblack, videotoolonly, videotoolfunction);
}

function createVideoButton(config){
	var button = document.createElement("div");
	button.textContent = config.text;
	button.setAttribute("data-video", config.videoIndex);
	if(config.accessKey) button.accessKey = config.accessKey;
	if(config.title) button.title = config.title;
	if(config.id) button.setAttribute("id", config.id);
	if(config.style) button.style.cssText = config.style;

	if(config.onClick){
		button.addEventListener("click", function(){
			config.onClick(this.getAttribute("data-video"));
		}, false);
	}

	if(config.onHold){
		var interval;
		button.addEventListener("mousedown", function(){
			config.onHold(this.getAttribute("data-video"));
			interval = setInterval(() => {
				config.onHold(this.getAttribute("data-video"));
			}, 100);
		}, false);
		button.addEventListener("mouseup", function(){
			clearInterval(interval);
		}, false);
		button.addEventListener("mouseleave", function(){
			clearInterval(interval);
		}, false);
	}

	config.parent.appendChild(button);
	return button;
}

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

function videotoolfunction(){
	// HTML5 video visualization
	// Videotool filters
	var blockarray, bars, barx, barwidth, barheight;

	var vis; var tempvis = 0;
	var dovisenable = function(){
		vis = this.getAttribute("data-video");
		tempvis = parseInt(vis);

		if(visualnumber[tempvis] == undefined){
			visualnumber[tempvis] = 1;
		}

		if(typeof audioCtx[vis] == "undefined"){
		// I am new now
			audioCtx[vis] = new AudioContext();
			analyser[vis] = audioCtx[vis].createAnalyser();
		}
		var myElement = document.getElementsByTagName("video")[tempvis];

		// Fix Chrome 71
		audioCtx[vis].resume().then(() =>{
		// console.log("Turn Off the Lights - Visualization resumed successfully");
		// refresh the visualization
			if(typeof audioCtx[tempvis] != "undefined"){
				if(vissources[tempvis] == undefined){
					try{
						vissources[tempvis] = audioCtx[tempvis].createMediaElementSource(myElement);
						vissources[tempvis].connect(analyser[tempvis]);
					}catch(e){ console.error(e); }
				}
				analyser[tempvis].connect(audioCtx[tempvis].destination);
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
			// source.disconnect(audioCtx.destination);
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

	var currentVideoFilters = {}; // Store filter state for each video

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

	function settoolbarrange(item, array, status){
		item.step = array[0];
		item.min = array[1];
		item.max = array[2];
		item.value = array[3];
		item.disabled = status;
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

	function setElementDisplay(id, display){
		const el = document.getElementById(id);
		if(el) el.style.display = display;
	}

	function changevideotoolbarrange(){
		var brownvis = this.getAttribute("data-video");
		var onevideo = document.getElementsByTagName("video")[brownvis];
		var gsvtrange = document.getElementById("stefanvdvideotoolrange" + brownvis).value;
		onevideo.style.filter = filtertype === "hue-rotate" ? `${filtertype}(${gsvtrange}deg)` : `${filtertype}(${gsvtrange})`;
	}

	function videoframestep(){
		rock = this.getAttribute("data-video");
		if($("stefanvdzoomcanvas" + rock)){
			if(!this.paused && !this.ended){
				if($("stefanvdzoomplay" + rock)){ $("stefanvdzoomplay" + rock).textContent = "❙❙"; }
				zoompaused[rock] = false;
				window.requestAnimationFrame(function(){ drawframezoom(rock); });
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

			var visposition = window.getPosition(myElement);
			var tempwidthvideo = myElement.offsetWidth;
			var tempheightvideo = myElement.offsetHeight;

			myElement.addEventListener("pointerover", function(){
				rock = this.getAttribute("data-video");
				setElementDisplay("stefanvdvispanel" + rock, "block");
				if(this.classList.contains("stefanvdvideowindow")){
					setElementDisplay("stefanvdzoompanel" + rock, "none");
					setElementDisplay("stefanvdspeedpanel" + rock, "none");
				}else{
					setElementDisplay("stefanvdzoompanel" + rock, "block");
					setElementDisplay("stefanvdspeedpanel" + rock, "block");
				}
			}, false);

			myElement.addEventListener("pointerout", function(){
				setElementDisplay("stefanvdvispanel" + rock, "none");
				setElementDisplay("stefanvdzoompanel" + rock, "none");
				setElementDisplay("stefanvdspeedpanel" + rock, "none");
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
				newzoompanel.style.display = "none"; // default not visible
				newzoompanel.style.top = visposition.y + "px";
				newzoompanel.style.left = tempwidthvideo + visposition.x + "px";
				newzoompanel.style.width = "62px";
				newzoompanel.style.height = tempheightvideo - 40 + "px";
				newzoompanel.style.paddingTop = "40px";
				newzoompanel.addEventListener("pointerover", function(){
					setElementDisplay("stefanvdzoompanel" + rock, "block");
				}, false);
				newzoompanel.addEventListener("pointerout", function(){
					setElementDisplay("stefanvdzoompanel" + rock, "none");
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
				newzoomstage.style.display = "none"; // default not visible
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
				newzoomcanvas.style.top = "0px";
				newzoomcanvas.style.left = "0px";
				newzoomcanvas.width = tempwidthvideo;
				newzoomcanvas.height = tempheightvideo;
				newzoomstage.appendChild(newzoomcanvas);

				myElement.addEventListener("playing", videoframestep, 0);
				myElement.addEventListener("pause", videoframestep, 0);
				// End zoom canvas ---

				if(newzoompanel){
					// Zoom button configurations
					const zoomButtons = [
						{text: "+", accessKey: "i", title: "ctrl+alt+i", action: (v) => camerazoomrotate(v, +0.1, "")},
						{text: "-", accessKey: "o", title: "ctrl+alt+o", action: (v) => camerazoomrotate(v, -0.05, "")},
						{text: "⇠", accessKey: "l", title: "ctrl+alt+l", action: (v) => zoompaddirection(v, [0, 1, 0, 0])},
						{text: "⇢", accessKey: "r", title: "ctrl+alt+r", action: (v) => zoompaddirection(v, [0, 0, 0, 1])},
						{text: "⇡", accessKey: "u", title: "ctrl+alt+u", action: (v) => zoompaddirection(v, [1, 0, 0, 0])},
						{text: "⇣", accessKey: "d", title: "ctrl+alt+d", action: (v) => zoompaddirection(v, [0, 0, 1, 0])},
						{text: "↻", accessKey: "a", title: "ctrl+alt+a", action: (v) => camerazoomrotate(v, "", +5)},
						{text: "↺", accessKey: "q", title: "ctrl+alt+q", action: (v) => camerazoomrotate(v, "", -5)}
					];

					// Create zoom buttons with hold support
					zoomButtons.forEach((btn) => {
						const action = (v) => { initialdrawframezoom(v); btn.action(v); };
						createVideoButton({
							text: btn.text,
							accessKey: btn.accessKey,
							title: btn.title,
							videoIndex: i,
							parent: newzoompanel,
							onClick: action,
							onHold: action
						});
					});

					// Reset button (no hold)
					createVideoButton({
						text: "Reset",
						accessKey: "s",
						title: "ctrl+alt+s",
						videoIndex: i,
						parent: newzoompanel,
						onClick: (v) => resetzoom(v)
					});

					// Play/Pause button
					createVideoButton({
						id: "stefanvdzoomplay" + i,
						text: myElement.paused === false ? "❙❙" : "►",
						videoIndex: i,
						parent: newzoompanel,
						onClick: function(v){
							var onevideo = document.getElementsByTagName("video")[v];
							if(onevideo.paused === false){
								onevideo.pause();
								$("stefanvdzoomplay" + v).textContent = "►";
							}else{
								onevideo.play();
								$("stefanvdzoomplay" + v).textContent = "❙❙";
							}
						}
					});

					// Exit button
					createVideoButton({
						id: "stefanvdzoomexit" + i,
						text: "EXIT ZOOM EDIT",
						videoIndex: i,
						parent: newzoompanel,
						style: "display:none",
						onClick: (v) => exitzoom(v)
					});
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
				newspeedpanel.style.display = "none"; // default not visible
				newspeedpanel.style.top = visposition.y + "px";
				newspeedpanel.style.left = visposition.x - 64 + "px";
				newspeedpanel.style.width = 64 + "px";
				newspeedpanel.style.height = tempheightvideo - 40 + "px";
				newspeedpanel.style.paddingTop = "40px";
				newspeedpanel.addEventListener("pointerover", function(){
					setElementDisplay("stefanvdspeedpanel" + rock, "block");
				}, false);
				newspeedpanel.addEventListener("pointerout", function(){
					setElementDisplay("stefanvdspeedpanel" + rock, "none");
				}, false);
				document.body.appendChild(newspeedpanel);

				// Speed button configurations
				const speedButtons = [
					{id: "stefanvdspeedN2step", text: "-2", value: 2.0, type: "rewind"},
					{id: "stefanvdspeedN15step", text: "-1.5", value: 1.5, type: "rewind"},
					{id: "stefanvdspeedN125step", text: "-1.25", value: 1.25, type: "rewind"},
					{id: "stefanvdspeedN1step", text: "-1", value: 1.0, type: "rewind"},
					{id: "stefanvdspeedN075step", text: "-0.75", value: 0.5, type: "rewind"},
					{id: "stefanvdspeedN05step", text: "-0.5", value: 0.5, type: "rewind"},
					{id: "stefanvdspeedN025step", text: "-0.25", value: 0.25, type: "rewind"},
					{id: "stefanvdspeedP025step", text: "+0.25", value: 0.25, type: "playrate"},
					{id: "stefanvdspeedP05step", text: "+0.5", value: 0.5, type: "playrate"},
					{id: "stefanvdspeedP075step", text: "+0.75", value: 0.75, type: "playrate"},
					{id: "stefanvdspeedP1step", text: "+1", value: 1.0, type: "playrate"},
					{id: "stefanvdspeedP125step", text: "+1.25", value: 1.25, type: "playrate"},
					{id: "stefanvdspeedP15step", text: "+1.5", value: 1.5, type: "playrate"},
					{id: "stefanvdspeedP2step", text: "+2", value: 2.0, type: "playrate"}
				];

				// Create speed buttons
				speedButtons.forEach((btn) => {
					createVideoButton({
						id: btn.id + i,
						text: btn.text,
						videoIndex: i,
						parent: newspeedpanel,
						onClick: (v) => {
							if(btn.type === "rewind"){
								rewind(btn.value, v);
							}else{
								playrate(v, btn.value);
							}
						}
					});
				});

				// Zero speed button (special case)
				createVideoButton({
					id: "stefanvdspeedzerostep" + i,
					text: "0",
					videoIndex: i,
					parent: newspeedpanel,
					onClick: function(v){
						var onevideo = document.getElementsByTagName("video")[v];
						window.clearInterval(intervalRewind);
						onevideo.playbackRate = 1.0;
						onevideo.pause();
					}
				});
			}
			//---

			if(videotool == true){
				if($("stefanvdvisualizationcanvas" + i) == null){
					var newvisualizationvideo = document.createElement("canvas");
					newvisualizationvideo.setAttribute("id", "stefanvdvisualizationcanvas" + i);
					newvisualizationvideo.setAttribute("class", "stefanvdvisualization");
					newvisualizationvideo.style.position = "absolute";
					newvisualizationvideo.style.display = "none"; // default not visible
					newvisualizationvideo.style.top = visposition.y + "px";
					newvisualizationvideo.style.left = visposition.x + "px";
					newvisualizationvideo.style.width = tempwidthvideo + "px";
					newvisualizationvideo.style.height = tempheightvideo + "px";
					document.body.appendChild(newvisualizationvideo);

					var newonvispanel = document.createElement("div");
					newonvispanel.setAttribute("id", "stefanvdvispanel" + i);
					newonvispanel.setAttribute("class", "stefanvdvis");
					newonvispanel.style.background = hexToRGB(videotoolcolor, 0.4);
					newonvispanel.style.display = "none"; // default not visible
					newonvispanel.style.top = visposition.y + "px";
					newonvispanel.style.left = visposition.x + "px";
					newonvispanel.style.width = tempwidthvideo + "px";
					newonvispanel.style.height = 36 + "px";
					newonvispanel.addEventListener("pointerover", function(){
						setElementDisplay("stefanvdvispanel" + rock, "block");
					}, false);
					newonvispanel.addEventListener("pointerout", function(){
						setElementDisplay("stefanvdvispanel" + rock, "none");
					}, false);
					document.body.appendChild(newonvispanel);

					var newtoolbar = document.createElement("div");
					newtoolbar.className = "stefanvdvistoolbar";
					newonvispanel.appendChild(newtoolbar);

					var newonbutton = document.createElement("div");
					newonbutton.setAttribute("id", "stefanvdvisbutton" + i);
					newonbutton.setAttribute("data-video", i);
					newonbutton.addEventListener("click", dovisenable, true);
					newonbutton.style.background = "url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAACXBIWXMAAAsTAAALEwEAmpwYAAAF+klEQVRoge2ZaajVRRTAf88lp+OTzNRcHmIuaCpJkfmhUhJacEtLMTTzgUsGQSGCFKhZH7LNID9UZqYkYaWlZmogZiokmUhmpZbPLbXUJ6X9zx1MeX2Yub2/1/vf7rugiAcuM3PmrHfmf+bMmYq6ujquBmh0uQ0oF1xz5EqDa45cadCknMJUbXfgHuAOoBfQGmjhp/8CTgI/ATuALSLmcLl0V5Qj/Kra8UA1MCgj6xpgsYhZ0VAbGuSIqh0DvAD0LJiqAfYAh4C/gQqgJdAJuBXoXEC/HZglYtaXaktJjqjaFsAHwKMh9I/AUmCtiNmdwN8XGAGMB7qGpt4TMVMyG0QJjqjaPsA6oMqj9gAzRczyIrSNgOYAIuZshLwpwBygnUftAh4SMcczGVZXV5f6FwS5u4Igdz4IcnX+Ny+Gdm4Q5I4GQe6M/x0Ogty0CNrKIMgtDsk9EQS5zllsS70iPiL9AjT2qPEiZmkMfS3QqgC9S8T0jeGZBrzhh6eBHiLmVBr7Up0jqvY6YCv1TgxNcKI17uMuhA5+uxUFETMPmOSHrYAtaeyD9AfiZ0Bb3x8nYr5MoO8dIbs10C2OUcS8Dzzvhz1V7btpDEx0RNUOB4b44Vsi5qMUcnuXOAeAiHkZ+MIPp6jafkk8aVZkoW+PiJhnUtAD9ClxLgyjgJzvL0oijnVE1Y4F2vhhlvge96+nckTEnAOm53lU7YA4+tiopWq3A3cCe0VM4ekdx3cB9yfV4U75RsAtfvoPEdM+g6xTwE3AShEzMoouckVUbRXOCYC3Myge7OXOADqLmG4ipgvuBH8RaKNqb0srj/ptNUTVShRR3NZ6INRfnUHxaaC3iHk1nN2KmBoRMxuXGVdkkLfSt02BgVFEcWl8fjUOiZgDabWKmG35vqodBTwInAdWi5h1ImZXWlkevgcCXKrTD5ceXQJxK9Ldt1kVA6BqFwOf4g64qcBaVftaVjn+o/+5wKZLIM6R/AF4NI1CVdtK1bb1/XHAhCJk01XtIE/TyWfRaSBvQ2SQiHOkuW/PJGnx95JtwAWPqo4hf8K3TYGdqvbeJPlAPnMu6WPPf5CxWaWqnQAsAzqImNoUchsDiJj9uEi2WdUOiaFPtCFJYf5UjVx+VTsHWOyH51RtU9//OEbuMs9bhQsCAGtU7dMxPJUFNl0CcY6c9G3HYpOq9kNgVgh1IzAaQMQswN3HC2FhKOF8nIuj5nxV+2aELR18+2eUsXGO/Obbi+4PqvYGVbvVG1IIr+c7ImYYLq1ZBSwHxoqYyV5GS2BmEf5nVe0qVZu/LqBqm1Cf8vwaZWxkiqJqnwTe8cMuIuaAqu2IC8eFF6YwbMZdVYtuA1XbDtiIK0JEwX7gdhFzVtX2xwUSgGEipthKx67IV6H+w761xDsBMABQVTvDX8jyDrRQta8AxxOcALgZ+Nf3h/v2ArApiiHutnaQ+sNwqsfVAs8lGPE7Lq04ycXR5ryfWwWcSJAxScRY35/o2/Ui5p8ohqTstxpX9gG4X8Rs8Pgj1FdRwMX5lcDnuFTkAjGgaq/HrfJI3zYLTX8nYvp7ugnUR8X/9Wd2xAs7jYtIB0XMLR7XC/ct7AaWeONro6XEym8PDMUFhipcwnm6QPc+EdMjVlCKEtBjoTLN3HAJJ0u5JmW5yYT6S0N6707iTatgU0joiHI7UETfUyF9S8pW1/LJ3THqT9hBIubrUrZSCl1j8Kc/UCNiusbR5yFVOciXO8N35o2q9pFsJiaDqp1MvRMBkCahBDI89IiYncB9IdQKVftSWv44ULUVqnY+sMCjAqC/iDmWWkgJ+7efr83m9/COIMgNbsD3MDoIcvtC8mqCINctq5xSnxXa4OL74BD6W4/bIGJqEvh7eN4JXJzLfQJUR6U3cdDQh56JuCeBwgz5B2AvrhSUN6oSVy7tgXuWC8NeYLaIiUv/Y6HBT2+qthkujajGFQeywGZgkYhZ0iAjKNMbYh78I9BAnEPdcPeISlzOdRYXwvfhntq+ETF7yqW7rI5cTrhq3tmvOXKlwTVHrjT4D4NKaA2hYpQ+AAAAAElFTkSuQmCC)";
					newonbutton.title = i18ntitelvisenable;
					newtoolbar.appendChild(newonbutton);

					var newonchoosebutton = document.createElement("div");
					newonchoosebutton.setAttribute("id", "stefanvdvischoosebutton" + i);
					newonchoosebutton.addEventListener("click", dovischoose, true);
					newonchoosebutton.setAttribute("data-video", i);
					newonchoosebutton.textContent = "❋ " + i18ntitelvisblocks;
					newonchoosebutton.title = i18ntitelvischoose;
					newtoolbar.appendChild(newonchoosebutton);

					var newonlikebutton = document.createElement("div");
					newonlikebutton.setAttribute("id", "stefanvdlikebutton" + i);
					newonlikebutton.addEventListener("click", function(){ window.open("https://www.turnoffthelights.com/youtube/totlfb.html", "_blank"); }, false);
					newonlikebutton.setAttribute("data-video", i);
					newonlikebutton.style.background = "url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAACdUlEQVRoQ+2Z7TEEQRCG+83AZUAEiAARIAMiQASIgAwQASJwIkAEXASIoNWrZlSf2p2Zve1Vc2rnl3K7ff1Mf/dB/snBP+GQEaQ2S/6JRVR1RUTWReQTwPMQlzA4SIB4EJGNAPAhIocA7jyBBgVpgLC673vCDAaSgSDQB4CJl1UGAWmBuBGRMxF5NcpvesWMO0gbBIADAqiqGpAdAFMPq7iCFECs/rLIBACDv/dxA8lBBGvcishe0PoFQMxkdYAsAEHFmYKvexMEAb0tUgjBm38ySj8C2PaCoJxeICUQwaWOReQiKD5jcfSKjXgZSRDTWrRd3qWp2HzmJmYn+4Kqsorvhv/xb76XPQAesw+VuJaq0vxsL0pOI0SwiE25JbLiM28hlrIpOmeRUpAURKmMFGC23nQFsabeMt/c+kWqykL4XQw7Hit/CmAn9X4nEAA/zw9VoaOyDW6dLJ7VgjTEVtK9qgVR1bnaY72hycVqBmFcXQWls+1MzSCsNUcBpDUrlhbEudT5x8HOliY2ldm+rGaL2CKaHcCqBPmdenOBTveqFcQ2mUWdcq0gtsk8B8BZP3lqBeGCgmMxT9HaqDqQMDq8m+tfA8AueLksoqqc6Tnb88wARMssHQjj4TRofQ8gLiuWDoRDVGzhTwCUTZMpzFQ+H6qNV1XGB7f3PNmBqsoWRVXnFnglhbBWkE4dr/WmTuk3LKHj+7ZIcdGWTZGZDEp3Ikh0q6JCuJBFcrnc8fNPFsQuu6+uFnHUtVUUF3h7XX9uyIFwHihKfw6E/G3xedF9cK+VqYPybiJGELerdBI0WsTpIt3EjBZxu0onQaNFnC7STcwXkMeXQh73qawAAAAASUVORK5CYII=)";
					newonlikebutton.title = i18ntitelvideotoollike;
					newtoolbar.appendChild(newonlikebutton);

					var newonytsbutton = document.createElement("div");
					newonytsbutton.setAttribute("id", "stefanvdyoutubebutton" + i);
					newonytsbutton.addEventListener("click", function(){ window.open(linkyoutube, "_blank"); }, false);
					newonytsbutton.setAttribute("data-video", i);
					newonytsbutton.style.background = "url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAACm0lEQVRoQ+1ZgXETMRDcqwA6gA6gA5IKAhUAHaQD0klCB0kFJB1ABYQOoIJl9kfnkZ3/l/SR/O+MbuZnbL9s3d7une7Phhdi9kJwoAPZGpOdkc5IowicnLRIvgbwAcBHM/vqcTkJICTfArgAcCYAO+fNdv5vFgjJ98F5Oa7XT8y2CoSkoi7HFXmxMGubARL0Hjsv/U/ZHwA/A0vDmlWBRHr/MiWZCMkvADcAbs3skaSY+rFajpAcqky45iTzD8C9HA/O/43pOTqQuEQG51OSGZw3MwGYtKMAmSqRE15JMnL+xsyk+yxrBiSnREYe3rlspPcszw8WVQVSUCKld0nFZbOn96ZAQoRfjWyiBPX6ntK7J6oAVLVsRkhqc1WYEvMSeV+i95INfG0LINL7IJulel8LiE7VrBK5xMHc7yxl5NzMqus81+mxdR1IZ+Q5+qnRohyU354jjQjB0mRXMxe3FeqP1KHqDFnFlgKZc3ZoQwA8nNqBOAdKzOkpTqCyW/IllJYwomnFWFMYN41jTaX7NcgvtC7VJZgNJCdKJJmzLuSXt/F3Zna8Nj7lYHgK/B2tO4+GZu8S349BrftgNUdtAOmTQI14UnmlPu57SV61lNansYEBSSX/5xTD4b7Y8c56Nq9qA5FEPOKqUuoAdvonqXnV9YH8dF+f6ynzTYYEtceTvKoNZG9IFpJaDMhZ3dPlppIcv9fp7BVQwFJ55aVdoOoP6EheAfiWiKyGD2dzORDmXz64E+BUaRewutN4kpcABGhs8wcAlyWJrKCQjEGlJFhv9htFVHLR5f3Ys0/4MNFxYKMSXHWInVnJ9pZFeSX57Ur7yQGJUQUVDOeVmalgDLbZf6xKmetASiPWen1npHWES3+/M1Iasdbr/wNE7m5C7M5pcAAAAABJRU5ErkJggg==)";
					newonytsbutton.title = i18ntitelvideotoolsubscribe;
					newtoolbar.appendChild(newonytsbutton);

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
					newtoolbar.appendChild(newonrepeatbutton);

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
							const filterConfigs = [
								{type: "grayscale", range: ["0.1", "0", "1", "1"], value: "1", i18n: i18ntitelvideotoolgrayscale},
								{type: "sepia", range: ["0.1", "0", "1", "1"], value: "1", i18n: i18ntitelvideotoolsepia},
								{type: "invert", range: ["0.1", "0", "1", "1"], value: "1", i18n: i18ntitelvideotoolinvert},
								{type: "contrast", range: ["0.1", "0", "10", "10"], value: "10", i18n: i18ntitelvideotoolcontrast},
								{type: "saturate", range: ["0.1", "0", "10", "10"], value: "10", i18n: i18ntitelvideotoolsaturate},
								{type: "hue-rotate", range: ["30", "0", "360", "90"], value: "90deg", i18n: i18ntitelvideotoolhueroration},
								{type: "brightness", range: ["0.1", "0", "10", "0.5"], value: "1.5", i18n: i18ntitelvideotoolbrightness},
								{type: "normal", range: ["0.1", "0", "10", "1"], value: "", i18n: i18ntitelvideotoolnormal, reset: true}
							];

							const config = filterConfigs[currentvideostepfilter];
							if(config){
								filtertype = config.type;
								settoolbarrange(getstefanvdvideotoolrange, config.range, config.reset || false);
								onevideo.style.filter = config.type === "normal" ? "" : `${config.type}(${config.value})`;
								currentvideostepfilter = config.reset ? 0 : currentvideostepfilter + 1;
								currentVideoFilters[yellowvis] = {
									type: filtertype,
									name: config.i18n
								};
								newvcpartiaspan.textContent = config.i18n;
							}
							document.getElementById("stefanvdvideofiltername" + yellowvis).innerText = filtertype;
						}
					}, false);
					newonfilterbutton.style.background = "url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAC80lEQVRoQ+1Z23EUMRDsjgAywEQAjgATATgC7AiACIAIgAg4R2ATASYC7AxMBkcEQ7WRKNWedvXaFWzVTtV9nE+P6Xn1jEx0EDN7D+AdgB3J8yWu5BKHDs80M/N/I7nInYscGgGyA/AKwFeSL5cwXhcgSyg+PHMRIGb2FMCe5F0PELpjdiBm9gbARwfgmORNDzBNQJzlvdJeX3njofsij+R65YKkcqlKWoGcAPhWdfPhpg8kVaarZAMis5nZEYAz93nkTHmREU7ap3Is+SmiBHBN8rrKHXMlu5lJgWdOiecphcwsDMnvJPW9SZpCy9+8Afljic0jYSxuoRVaI5UjZiaCfALgluR+tcluZj8AiPHvSD5eM5A9gAfyouaRNQPRDKJmUhPibrVAhky3AZng/uby6yqSkln9k6S0RVGbr7lFeVQtcwC5BBDO4clhys0xAu/liuRpNYrWpjF45vE6vCX5KUehwSSpLf9mHhkkrBQpfiExsysALwLgybAcM1JVaLk5RKHhR9pbACelce7ySyOAWF+iPFFo5o7Hf3HVAvFMrYN+ORBVjwwuXwTmnjAB3JA8zgnPcE0xEDP74iZCf855y6OBDjEzTZk610vx02oRkMiFCoUqT0QsHr6+6OciA2UDcSGgFxOfF6XeL10vIyn5swyVBSRCeqVK1a4XCIFJkmUukCHp6V8DxZUlE406hDBfssgyCaSF9DIVP1gWIcsk0U4CmYP0GsAUkeUokEheVJFeAxAVlZAs76fLYmaPlNpkM1ir9Ni+SHM5WpKnPBK69jNJTXjdxczUhL52F+vFXuR5IFNAwmfQps60Bf2g2Iw+5q3NI6Md9hSQsP8pYtkWD4R7I91EVY6oaoj0fFcqMHr+F9suRYYeh0hRvZeM6VsiddlHYyyf4hGNsGL1/0FOSaoARSWH2QVGnvCe6Q1KnjibAiGFkkC0yJGjAOnTs/uVB9RrzdM09nZBzX1ZHqk5uPeeDUhvi6fu2zySslDv338DROiFQsyzoMoAAAAASUVORK5CYII=)";
					newonfilterbutton.title = i18ntitelvideotoolfilter;
					newtoolbar.appendChild(newonfilterbutton);

					// Modify the video filter name span creation
					var newvcpartiaspan = document.createElement("div");
					newvcpartiaspan.setAttribute("id", "stefanvdvideofiltername" + i);
					newvcpartiaspan.setAttribute("data-video", i);
					newvcpartiaspan.textContent = currentVideoFilters[i] ? currentVideoFilters[i].name : i18ntitelvideotoolnormal;
					newvcpartiaspan.addEventListener("click", function(){
						var orangevis = this.getAttribute("data-video");
						document.getElementById("stefanvdfilterbutton" + orangevis).click();
					}, false);
					if(tempwidthvideo <= 360){ newvcpartiaspan.style.cssText = "display:none!important"; }
					newtoolbar.appendChild(newvcpartiaspan);

					var newvcpartiarange = document.createElement("input");
					newvcpartiarange.setAttribute("id", "stefanvdvideotoolrange" + i);
					newvcpartiarange.setAttribute("class", "stefanvdvideotoolrange");
					newvcpartiarange.setAttribute("data-video", i);
					newvcpartiarange.setAttribute("type", "range");
					newvcpartiarange.setAttribute("step", "0.1");
					newvcpartiarange.setAttribute("min", "0");
					newvcpartiarange.setAttribute("max", "10");
					newvcpartiarange.value = "1";
					newvcpartiarange.disabled = true;
					newvcpartiarange.addEventListener("change", changevideotoolbarrange, false);
					newvcpartiarange.addEventListener("input", changevideotoolbarrange, false);
					if(tempwidthvideo <= 360){ newvcpartiarange.style.cssText = "display:none!important"; }
					newtoolbar.appendChild(newvcpartiarange);

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
					newtoolbar.appendChild(newscreenshotbutton);

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
									// var playertheater = document.getElementById("player-theater-container");
									var playercontrols = document.getElementsByClassName("ytp-chrome-bottom")[0];
									var playercontainer = document.getElementById("ytd-player");

									var masthead = $("masthead-container");
									if(masthead)masthead.style.cssText = "z-index:auto !important";

									if(playercontainer){
										var stefanvdregularhtmlplayer = document.getElementsByClassName("stefanvdvideowindow")[0];
										var original = document.getElementsByClassName("ytp-size-button")[0];
										var watchContainer = document.querySelector("ytd-watch-flexy");
										if(stefanvdregularhtmlplayer){
											if(!initialtheatermode){
												original.click();
											}
											playercontainer.classList.remove("stefanvdvideowindow");
											// playertheater.classList.remove("stefanvdvideotheather");
											playercontrols.classList.remove("stefanvdvideocontrols");
											document.getElementsByTagName("video")[0].classList.remove("stefanvdvideowindow");
											document.getElementsByTagName("video")[0].classList.remove("stefanvdvideocontain", "stefanvdvideofilled");
											videowindow = false;
										}else{
											checktheatermode = watchContainer ? watchContainer.hasAttribute("theater") : true;
											initialtheatermode = checktheatermode;
											if(!checktheatermode){
												original.click();
												checktheatermode = true;
											}
											playercontainer.classList.add("stefanvdvideowindow");
											// playertheater.classList.add("stefanvdvideotheather");
											playercontrols.classList.add("stefanvdvideocontrols");
											document.getElementsByTagName("video")[0].classList.add("stefanvdvideowindow");

											// Remove any video-related state classes first
											document.getElementsByTagName("video")[0].classList.remove("stefanvdvideocontain", "stefanvdvideofilled");
											if(videofilled == true){
												document.getElementsByTagName("video")[0].classList.add("stefanvdvideofilled");
											}else{
												document.getElementsByTagName("video")[0].classList.add("stefanvdvideocontain");
											}
											videowindow = true;
										}
									}

									// Refresh mouse volume scroll in the dynamically loaded script
									chrome.storage.sync.get(["videovolume", "videovolumehold", "gamepad"], function(items){
										if(items["videovolume"] == true || items["videovolumehold"] == true || items["gamepad"] == true){
											chrome.runtime.sendMessage({action: "refreshvolume"});
										}
									});
								}else{
									// regular HTML5 video
									var stefanvdregularhtmlplayerb = document.getElementsByClassName("stefanvdvideowindow")[0];
									if(stefanvdregularhtmlplayerb){
										onevideo.classList.remove("stefanvdvideowindow");
										onevideo.classList.remove("stefanvdvideocontain", "stefanvdvideofilled");
										if(thatPrevControlEnabled == true){
											onevideo.controls = true;
										}else{
											onevideo.controls = false;
										}
										videowindow = false;
									}else{
										onevideo.classList.add("stefanvdvideowindow");

										// Remove any video-related state classes first
										onevideo.classList.remove("stefanvdvideocontain", "stefanvdvideofilled");
										if(videofilled == true){
											onevideo.classList.add("stefanvdvideofilled");
										}else{
											onevideo.classList.add("stefanvdvideocontain");
										}

										if(onevideo.hasAttribute("controls")){
											thatPrevControlEnabled = true;
										}
										onevideo.controls = true;
										videowindow = true;
									}

									// Refresh mouse volume scroll in the dynamically loaded script
									chrome.storage.sync.get(["videovolume", "videovolumehold", "gamepad"], function(items){
										if(items["videovolume"] == true || items["videovolumehold"] == true || items["gamepad"] == true){
											chrome.runtime.sendMessage({action: "refreshvolume"});
										}
									});
								}
							}
						}
					}, false);
					newonfwbutton.style.background = "url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAACVUlEQVRoQ+2Z21EDMQxFryqADqAD6ACohNABdEAqACqAVAJ0AB1AB0kFYu7MesbjrNcvOQmw+snH+qFjKXrYgj8i8kc4MIMcmiVni/wai6jqI4CzCoXvRORjap6qngN4qFj7U0Rux+ZFXUtV3wBcVGx2JSKcGxVVvQTwWrH2u4hw7pb8W5A1gKfESb6IyFfCIqcAFhNjjgFcA+CvL6YWoaI3FW6RNUVVqTzdjv+jUJpBNgCOvFW7wEQgPr2g0wyyBEB3oLmdmMJEIFYAXrzA0A4iIveqykXNYWIQIrIIIpwNCE1hDTMFMeznh2o7EEuYFER3EAuYHIidgLTA5ELsDKQGpgRipyAlMKUQViDMrK5E+MooO8LQ/BRWqiOF6IohNlHOUAeX5dexytq0sfJCMyuBy3DToXxnZcwqIQmRVdMMg0xBBldgH8OsP9qTDDCLWF9Rorw/1hykVpHWeTNI6wlaz58tEjtRVX0GwOKO4XhLVJXh9sK6OTO1yADh8sJNCDNAEJRi2s9MXT4wCbmu8DsjIVJBP7lt5YmaFmCoBty11KY4IQZZeMnGKuFOkxBubilMt8YqhAnciZ+TGbsEZicgNRCllukO0gJRAtMVxAIiF6YbiCVEDkwXkB4QKRhzEAAnqTzRWj+NRTNGQcsLOl5e+xfKyRBbCzUCw77GdYjN91q+Xt0gJtzMfTID4emMvhh5pHxVogWjEpQdsXHsNMMbeTOQHI+ZX6wyTqnKImOmzdgLt5mPoVy/VD6KH0NLd9j3eNPGap8wM8g+T39s79kih2aRH8NkAVGMEdb6AAAAAElFTkSuQmCC)";
					newonfwbutton.title = i18ntitelvideotoolfullwindow;
					newtoolbar.appendChild(newonfwbutton);
				}
			}
		}
	}

	// Run immediately if page is already loaded, otherwise wait for load event
	if(document.readyState === "complete"){
		addvisual();
	}else{
		window.addEventListener("load", addvisual);
	}

	var t = 0;
	function setTime(){ ++t; }

	function analamp(hz, v){
		let l = hz / audioCtx[v].sampleRate * analyser[v].freq.length | 0;
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
			var ctx = canvas.getContext("2d", {desynchronized: true, willReadFrequently: true});

			requestvideovisualloop[tovis] = window.requestAnimationFrame(function(){ videovisualloop(tovis); });
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
				ctx.fillStyle = "rgba(0,0,0," + visopacity / 100 + ")";
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

				ctx.fillStyle = "rgba(0,0,0," + visopacity / 100 + ")";
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

	// Track fullscreen state
	let isFullscreen = false;

	var myListenervideotoolbar = function(){
		// Continue when fullscreen is not active
		if(!getFullscreenElement() && isFullscreen == false){
			removevideotool();
			window.adddatavideo(); // recheck remove and add video ID
			addvisual();
		}
	};
	myListenerWithContext = myListenervideotoolbar.bind(this);
	window.addEventListener("resize", myListenerWithContext);

	function getFullscreenElement(){
		return document.fullscreenElement;
	}

	// Fullscreen change handler
	function onFullscreenChange(){
		const fs = getFullscreenElement();
		if(fs){
			// Wait for fullscreen transition to complete
			setTimeout(() => {
				initialdrawframezoom(0);
				isFullscreen = true;
			}, 100);
		}else{
			// Wait for exit fullscreen transition to complete
			setTimeout(() => {
				initialdrawframezoom(0);
				isFullscreen = false;
			}, 100);
		}
	}
	if(videozoom == true){
		if(myFullscreenListener){
			document.removeEventListener("fullscreenchange", myFullscreenListener);
		}
		myFullscreenListener = onFullscreenChange;
		document.addEventListener("fullscreenchange", myFullscreenListener);
	}

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
	// Setup MutationSummary observer
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
						var visposition = window.getPosition(mutation.target);
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

function exitzoom(a){
	var onevideo = $("stefanvdzoomcanvas" + a);
	onevideo.setAttribute("data-zoom", "false");
	vzoom[a] = 1;
	vrotate[a] = 0;
	onevideo.style.top = "0px";
	onevideo.style.left = "0px";
	onevideo.style["transform"] = "scale(" + vzoom[a] + ") rotate(" + vrotate[a] + "deg)";
	if($("stefanvdzoomstage" + a)){ $("stefanvdzoomstage" + a).style.display = "none"; }
	if($("stefanvdzoomexit" + a)){ $("stefanvdzoomexit" + a).style.setProperty("display", "none", "important"); }
	if($("stefanvdzoompanel" + a)){ $("stefanvdzoompanel" + a).style.display = "none"; }
}
window.exitzoom = exitzoom;

function resetzoom(a){
	if($("stefanvdzoomstage" + a)){ $("stefanvdzoomstage" + a).style.display = "block"; }
	if($("stefanvdzoomexit" + a)){ $("stefanvdzoomexit" + a).style.setProperty("display", "block", "important"); }
	var onevideo = $("stefanvdzoomcanvas" + a);
	onevideo.setAttribute("data-zoom", "true");
	vzoom[a] = 1;
	vrotate[a] = 0;
	onevideo.style.top = "0px";
	onevideo.style.left = "0px";
	onevideo.style["transform"] = "scale(" + vzoom[a] + ") rotate(" + vrotate[a] + "deg)";
}
window.resetzoom = resetzoom;

function initialdrawframezoom(a){
	var onevideo = document.getElementsByTagName("video")[a];
	var newzoomcontext = $("stefanvdzoomcanvas" + a).getContext("2d", {desynchronized: true});
	newzoomcontext.drawImage(onevideo, 0, 0, onevideo.offsetWidth, onevideo.clientHeight);
	$("stefanvdzoomcanvas" + a).style.width = onevideo.offsetWidth + "px";
	$("stefanvdzoomcanvas" + a).style.height = onevideo.clientHeight + "px";
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
		window.requestAnimationFrame(function(){ drawframezoom(a); });
	}
}

function camerazoomrotate(a, b, c){
	if($("stefanvdzoomstage" + a)){ $("stefanvdzoomstage" + a).style.display = "block"; }
	if($("stefanvdzoomexit" + a)){ $("stefanvdzoomexit" + a).style.setProperty("display", "block", "important"); }
	var onevideo = $("stefanvdzoomcanvas" + a);
	onevideo.setAttribute("data-zoom", "true");

	// Zoom change
	if(b != ""){
		// If b is a small fractional value (< 1), treat it as a relative percent step:
		//  +0.1 => scale *= 1.1  (10% bigger)
		//  -0.1 => scale *= 0.9  (10% smaller)
		var step = Number(b);
		if(!isNaN(step) && Math.abs(step) < 1){
			var factor = 1 + step;
			vzoom[a] = vzoom[a] * factor;
		}else{
			// Fallback: additive change (preserve old behaviour for large values)
			vzoom[a] = vzoom[a] + Number(b);
		}

		// Clamp and round to avoid tiny changes due to floating point
		var MIN_ZOOM = 0.1;
		var MAX_ZOOM = 16;
		vzoom[a] = Math.max(MIN_ZOOM, Math.min(MAX_ZOOM, Math.round(vzoom[a] * 100) / 100));
	}else if(c != ""){
		// Rotation (unchanged)
		vrotate[a] = vrotate[a] + c;
	}

	onevideo.style["transform"] = "scale(" + vzoom[a] + ") rotate(" + vrotate[a] + "deg)";
	// start zoom canvas animation
	window.requestAnimationFrame(function(){ drawframezoom(a); });
}
window.camerazoomrotate = camerazoomrotate;

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
	window.requestAnimationFrame(function(){ drawframezoom(a); });
}
window.zoompaddirection = zoompaddirection;

function removevideotool(){
	["stefanvdspeed", "stefanvdzoomstage", "stefanvdzoom", "stefanvdvisualization", "stefanvdvis"].forEach(window.removeAllByClass);
}

if(window.stefanvdvideotoolbarloaded !== true){
	window.stefanvdvideotoolbarloaded = true;

	chrome.runtime.onMessage.addListener(function(request){
		if(request.action === "gorefreshvideotoolbar"){
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

				if(MutationObserver){
					if(typeof observervideotoolbar != "undefined"){
						observervideotoolbar.disconnect();
					}
				}

				window.removeEventListener("resize", myListenerWithContext);
				if(myFullscreenListener){
					document.removeEventListener("fullscreenchange", myFullscreenListener);
					myFullscreenListener = null;
				}

				removevideotool();

				if(videotool == true){
					if(window.adddatavideo){
						window.adddatavideo();
					}
					runvideotoolbarcheck();
				}else{
					// If toolbar disabled, still rebuild it for gamepad
					if(gamepad == true){
						if(window.adddatavideo){
							window.adddatavideo();
						}
						runvideotoolbarcheck();
					}
				}
			});
		}else if(request.action === "gorefreshvideofilled"){
			chrome.storage.sync.get(["videofilled"], function(items){
				videofilled = items["videofilled"];
			});
		}
	});

	// Load settings and start
	chrome.storage.sync.get(["videotool", "videotoolonly", "videotoolDomains", "videotoolchecklistwhite", "videotoolchecklistblack", "visopacity", "videotoolcolor", "videozoom", "speedtoolbar", "gamepad", "videofilled", "playrateamount"], function(items){
		videotool = items["videotool"];
		videotoolonly = items["videotoolonly"];
		videotoolDomains = items["videotoolDomains"];
		videotoolchecklistwhite = items["videotoolchecklistwhite"];
		videotoolchecklistblack = items["videotoolchecklistblack"];
		visopacity = items["visopacity"]; if(visopacity == null)visopacity = 80;
		videotoolcolor = items["videotoolcolor"]; if(videotoolcolor == null)videotoolcolor = "#000000";
		videozoom = items["videozoom"];
		speedtoolbar = items["speedtoolbar"];
		gamepad = items["gamepad"];
		videofilled = items["videofilled"];
		playrateamount = items["playrateamount"]; if(playrateamount == null)playrateamount = 1;

		// Run toolbar check if either videotool or gamepad is enabled
		if(videotool == true || gamepad == true){
			runvideotoolbarcheck();
		}
	});
}