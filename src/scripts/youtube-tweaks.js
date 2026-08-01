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

var observeDOM = (function(){
	return function(obj, callback){
		var obs = new MutationObserver(function(mutations){
			if(mutations[0].addedNodes.length || mutations[0].removedNodes.length)
				callback();
		});
		obs.observe(obj, {childList:true, subtree:true});
	};
})();

chrome.storage.sync.get(["no360youtube", "autowidthyoutube", "customqualityyoutube", "maxquality"], function(items){
	var no360youtube = items.no360youtube;
	var autowidthyoutube = items.autowidthyoutube;
	var customqualityyoutube = items.customqualityyoutube;
	var maxquality = items.maxquality;

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

	// Observe a specific DOM element for the no360 live update
	if(no360youtube == true){
		if(document.getElementById("content")){
			observeDOM(document.getElementById("content"), function(){
				var ytfullvideo = document.getElementsByTagName("video");
				var ytfui;
				var ytful = ytfullvideo.length;
				for(ytfui = 0; ytfui < ytful; ytfui++){ ytfullvideo[ytfui].classList.add("stefanvdvideotop"); }
				var ytwebgl = document.getElementsByClassName("webgl");
				var ytwi;
				var ytwl = ytwebgl.length;
				for(ytwi = 0; ytwi < ytwl; ytwi++){ ytwebgl[ytwi].style.display = "none"; }
			});
		}
	}

	if(customqualityyoutube == true){
		var script = document.createElement("script"); script.type = "text/javascript"; script.setAttribute("data-maxquality", maxquality); script.src = chrome.runtime.getURL("scripts/hd-quality.js"); document.getElementsByTagName("head")[0].appendChild(script);
	}
});