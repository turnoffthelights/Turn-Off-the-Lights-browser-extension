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

// Helper function to get element by ID
function $(id){ return document.getElementById(id); }

// Global variables
var reflection = null;
var reflectionamount = null;
var startreflection = null;

function drawReflection(reflectionid){
	var calcreflection = (100 - reflectionamount) / 100;
	try{
		if(reflectionid.paused || reflectionid.ended){
			if(window.location.href.match(/((http:\/\/(.*youtube\.com\/.*))|(https:\/\/(.*youtube\.com\/.*)))/i)){
				// var youtubewindow = $("watch-player") || $("watch7-player") || $("player-api");
				let youtubewindow = $("ytd-player");
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
			let youtubewindow = $("ytd-player");
			youtubewindow.style.webkitBoxReflect = "below 0px -webkit-gradient(linear, left top, left bottom, from(transparent), to(black),color-stop(" + calcreflection + ", transparent))";
		}else{
			reflectionid.style.webkitBoxReflect = "below 0px -webkit-gradient(linear, left top, left bottom, from(transparent), to(black),color-stop(" + calcreflection + ", transparent))";
		}
	}catch(e){ console.log(e); }
}

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
			}catch(e){ console.log(e); }
		}, 20); // 20 refreshing it
	}
}

function stopreflectioncheck(){
	window.clearInterval(startreflection);
	// Clear reflection from video elements
	var reflectionplayer = document.getElementsByTagName("video") || null;
	var refk;
	var l = reflectionplayer.length;
	for(refk = 0; refk < l; refk++){
		reflectionplayer[refk].style.webkitBoxReflect = "";
	}
	// Clear reflection from YouTube player container
	if(window.location.href.match(/((http:\/\/(.*youtube\.com\/.*))|(https:\/\/(.*youtube\.com\/.*)))/i)){
		let youtubewindow = $("ytd-player");
		if(youtubewindow){
			youtubewindow.style.webkitBoxReflect = "";
		}
	}
}

// Listen for settings changes from options page (register immediately)
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse){
	if(request.action === "gorefreshreflection"){
		chrome.storage.sync.get(["reflection", "reflectionamount"], function(items){
			reflection = items["reflection"];
			reflectionamount = items["reflectionamount"];

			stopreflectioncheck();

			if(reflection == true){
				runreflectioncheck();
			}
		});
	}
});

// Load settings and start
chrome.storage.sync.get(["reflection", "reflectionamount"], function(response){
	reflection = response["reflection"];
	reflectionamount = response["reflectionamount"];
	runreflectioncheck();
});
