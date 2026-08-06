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

function isMacintosh(){
	return navigator.platform.indexOf("Mac") > -1;
}

// Helper function to add data-video attributes to video elements
function adddatavideo(){
	var volumevideos = document.getElementsByTagName("video");
	var i;
	var l = volumevideos.length;
	for(i = 0; i < l; i++){
		var myElement = document.getElementsByTagName("video")[i];
		myElement.setAttribute("data-video", i);
	}
}

// Mouse Volume Scroll
var myListenerWithContextvolume;
var observervideovolume;
var scrollTimer = -1;
var rundoscrollfunc = false;

// settings
var videovolume = null, videovolumecolor = null, videovolumesteps = null, videovolumelabel = null, videovolumeposa = null, videovolumeposb = null, videovolumeposc = null, videovolumehold = null, videovolumealt = null, videovolumeonly = null, videovolumeDomains = null, videovolumechecklistwhite = null, videovolumechecklistblack = null, videovolumescrolla = null, videovolumescrollb = null, videovolumescrollc = null, videovolumeposd = null, videovolumepose = null, gamepad = null;

chrome.storage.sync.get(["videovolume", "videovolumecolor", "videovolumesteps", "videovolumelabel", "videovolumeposa", "videovolumeposb", "videovolumeposc", "videovolumehold", "videovolumealt", "videovolumeonly", "videovolumeDomains", "videovolumechecklistwhite", "videovolumechecklistblack", "videovolumescrolla", "videovolumescrollb", "videovolumescrollc", "videovolumeposd", "videovolumepose", "gamepad"], function(items){
	videovolume = items["videovolume"];
	videovolumecolor = items["videovolumecolor"]; if(videovolumecolor == null)videovolumecolor = "#167ac6";
	videovolumesteps = items["videovolumesteps"]; if(videovolumesteps == null)videovolumesteps = 5;
	videovolumelabel = items["videovolumelabel"]; if(videovolumelabel == null)videovolumelabel = true;
	videovolumeposa = items["videovolumeposa"];
	videovolumeposb = items["videovolumeposb"];
	videovolumeposc = items["videovolumeposc"];
	videovolumehold = items["videovolumehold"];
	videovolumealt = items["videovolumealt"];
	videovolumeonly = items["videovolumeonly"];
	videovolumeDomains = items["videovolumeDomains"];
	videovolumechecklistwhite = items["videovolumechecklistwhite"];
	videovolumechecklistblack = items["videovolumechecklistblack"];
	videovolumescrolla = items["videovolumescrolla"]; if(videovolumescrolla == null)videovolumescrolla = true;
	videovolumescrollb = items["videovolumescrollb"]; if(videovolumescrollb == null)videovolumescrollb = false;
	videovolumescrollc = items["videovolumescrollc"]; if(videovolumescrollc == null)videovolumescrollc = false;
	videovolumeposd = items["videovolumeposd"];
	videovolumepose = items["videovolumepose"];
	gamepad = items["gamepad"];

	runvideovolumecheck();
});

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
		var position = window.getPosition(myElement);
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
			window.removeAllByClass("totlmousewheelvideo");
			addvolume();
		};
		myListenerWithContextvolume = myListenervolume.bind(this);
		window.addEventListener("resize", myListenerWithContextvolume);

		// Observe a specific DOM element
		// New Mutation Summary API Reference
		if(MutationObserver){
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
	}
} // end videovolume

function runvideovolumecheck(){
	window.checkDomainFeature(videovolume == true || gamepad == true, videovolumeDomains, videovolumechecklistwhite, videovolumechecklistblack, videovolumeonly, videovolumefunction);
}

function refreshvolume(){
	adddatavideo(); // recheck remove and add video ID

	window.removeAllByClass("totlmousewheelvideo");
	addvolume();
}

// Volume control function for gamepad
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
window.changevolume = changevolume;

// Listen for messages from background.js
chrome.runtime.onMessage.addListener(function(request){
	if(request.action == "gorefreshmousescroll"){
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

			window.removeAllByClass("totlmousewheelvideo");

			// Re-initialize if enabled
			if(videovolume == true || videovolumehold == true || gamepad == true){
				runvideovolumecheck();
			}
		});
	}
	if(request.action == "changevolume"){
		changevolume(request.value);
	}
	if(request.action == "refreshvolume"){
		refreshvolume();
	}
});