//================================================
/*

Turn Off the Lights
The entire page will be fading to dark, so you can watch the video as if you were in the cinema.
Copyright (C) 2024 Stefan vd
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

var totlCinema;
(totlCinema = {
	players: {objs: [], active: 0},
	messageEvent: new Event("stefanvdcinemamessage"),
	playerStateChange: function(stateId){
		var message = document.getElementById("stefanvdcinemamessage"),
			stateIO = "playerStateChange:".concat(stateId);
		// console.log("Debug " + message.textContent + " " + stateIO);
		if(message && message.textContent !== stateIO){
			message.textContent = stateIO;
			message.dispatchEvent(totlCinema.messageEvent);
		}
	},
	initialize: function(){
		this.initvideoinject();
		var MutationObserver = window.MutationObserver || window.WebKitMutationObserver || window.MozMutationObserver;
		if(MutationObserver){
			var videolist = document.querySelector("body"),
				observer = new MutationObserver(function(mutations){
					mutations.forEach(function(mutation){
						if(
							mutation.target.tagName === "VIDEO" ||
                            Array.from(mutation.addedNodes).some((node) => node.tagName === "VIDEO") ||
                            Array.from(mutation.removedNodes).some((node) => node.tagName === "VIDEO")
						){
							totlCinema.initvideoinject();
						}

						// Check for attribute changes in video elements
						if(mutation.type === "attributes" && mutation.attributeName === "src"){
							var video = mutation.target;
							if(video.tagName === "VIDEO" && !video.src){
								totlCinema.handleVideoRemoval(video);
							}
						}
					});
				});
			observer.observe(videolist, {
				subtree: true, // observe the subtree rooted at videolist
				childList: true, // include childNode insertion/removals
				attributes: true // include changes to attributes within the subtree
			});
		}else{
			// Fallback for older browsers
			document.addEventListener("DOMNodeRemoved", totlCinema.initvideoinject, false);
			document.addEventListener("DOMNodeInserted", totlCinema.initvideoinject, false);
		}
	},
	initvideoinject: function(){
		var htmlplayers = document.getElementsByTagName("video");
		var existingPlayers = Array.from(htmlplayers);

		// Remove event listeners and clean up removed videos
		totlCinema.players.objs = totlCinema.players.objs.filter(function(video){
			if(!existingPlayers.includes(video)){
				video.removeEventListener("pause", video._events.pause);
				video.removeEventListener("play", video._events.play);
				video.removeEventListener("ended", video._events.ended);
				totlCinema.players.active -= video._events.isActive ? 1 : 0;
				console.log("Video removed", video);
				return false;
			}
			return true;
		});

		// Add event listeners to new videos
		for(let i = 0; i < htmlplayers.length; i++){
			let video = htmlplayers[i];
			if(!totlCinema.players.objs.includes(video)){
				let ev = {
					isActive: false,
					pause: function(){
						if(!video.ended){
							totlCinema.players.active -= 1;
							ev.isActive = false;
						}
						if(totlCinema.players.active < 1){
							totlCinema.players.active = 0; // Ensure active count doesn't go negative
							totlCinema.playerStateChange(2);
						}
					},
					play: function(){
						if(!ev.isActive){
							totlCinema.players.active += 1;
							ev.isActive = true;
						}
						totlCinema.playerStateChange(1);
					},
					ended: function(){
						totlCinema.players.active -= 1;
						ev.isActive = false;
						if(totlCinema.players.active < 1){
							totlCinema.players.active = 0; // Ensure active count doesn't go negative
							totlCinema.playerStateChange(0);
						}
					}
				};
				video._events = ev; // Store event handlers to the video element
				video.addEventListener("pause", ev.pause);
				video.addEventListener("play", ev.play);
				video.addEventListener("ended", ev.ended);
				totlCinema.players.objs.push(video);

				// Trigger the play event if the video is already playing (autoplay case)
				if(!video.paused && !video.ended){
					ev.play();
				}
			}
		}
	},
	handleVideoRemoval: function(video){
		if(video._events && video._events.isActive){
			totlCinema.players.active -= 1;
			if(totlCinema.players.active < 1){
				totlCinema.players.active = 0; // Ensure active count doesn't go negative
				totlCinema.playerStateChange(2);
			}
		}
	}
}).initialize();