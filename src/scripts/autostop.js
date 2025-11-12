//================================================
/*

Turn Off the Lights
The entire page will be fading to dark, so you can watch the video as if you were in the cinema.
Copyright (C) 2025 Stefan vd
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

chrome.storage.sync.get(["autostop", "autostoponly", "autostopDomains", "autostopchecklistwhite", "autostopchecklistblack", "autostopred", "autostopsize", "autostopsizepixelwidth", "autostopsizepixelheight"], function(response){
	var autostop = response["autostop"];
	var autostoponly = response["autostoponly"];
	var autostopDomains = response["autostopDomains"];
	var autostopchecklistwhite = response["autostopchecklistwhite"];
	var autostopchecklistblack = response["autostopchecklistblack"];
	var autostopred = response["autostopred"];
	var autostopsize = response["autostopsize"];
	var autostopsizepixelwidth = response["autostopsizepixelwidth"];
	var autostopsizepixelheight = response["autostopsizepixelheight"];

	function findAllVideos(root = document){
		const videos = new Set();
		const stack = [root];

		while(stack.length){
			const current = stack.pop();
			if(!current)continue;

			// If the current node is an element and a <video>, add it
			if(current.nodeType === Node.ELEMENT_NODE && current.tagName && current.tagName.toLowerCase() === "video"){
				videos.add(current);
				// We still continue to traverse children in case nested <video> (rare) or shadow DOM needs exploring
			}

			// If this node has an open shadow root, push its children onto the stack
			// shadowRoot is usually a DocumentFragment, treat like a subtree root
			if(current.shadowRoot && current.shadowRoot.mode === "open"){
				// Use querySelectorAll to find videos directly in shadow root
				current.shadowRoot.querySelectorAll("video").forEach((v) => videos.add(v));

				// Push all elements inside shadow root for deeper traversal
				const allElements = current.shadowRoot.querySelectorAll("*");
				for(let i = allElements.length - 1; i >= 0; i--){
					stack.push(allElements[i]);
				}
			}

			// Push normal children (Element children and other node children)
			const children = current.childNodes || [];
			for(let i = children.length - 1; i >= 0; i--){
				stack.push(children[i]);
			}
		}
		return Array.from(videos);
	}

	function getPosition(el){
		if(!el || typeof el.getBoundingClientRect !== "function"){
			return{x: 0, y: 0};
		}

		const rect = el.getBoundingClientRect();
		const scrollLeft = window.pageXOffset || document.documentElement.scrollLeft;
		const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

		return{
			x: rect.left + scrollLeft,
			y: rect.top + scrollTop
		};
	}

	var d; var w; var h; var t; var st;
	function refreshdesign(item, myElement){
		// design panel
		if(myElement.currentStyle){
			d = myElement.currentStyle["display"]; w = myElement.currentStyle["width"]; h = myElement.currentStyle["height"]; t = myElement.currentStyle["top"];
		}else if(window.getComputedStyle){
			st = document.defaultView.getComputedStyle(myElement, null); d = st.getPropertyValue("display"); w = st.getPropertyValue("width"); h = st.getPropertyValue("height"); t = st.getPropertyValue("top");
		}
		var visposition = getPosition(myElement);
		// YouTube if previous path is none, then hide it too
		var path = [];
		var current = myElement; // start from your element
		while(current && current.nodeType === 1){ // ensure it is an Element node
			path.unshift(current.nodeName);
			let adisplay;
			if(current.currentStyle){
				adisplay = current.currentStyle.display;
			}else{
				const st = window.getComputedStyle(current, null);
				adisplay = st.getPropertyValue("display");
			}
			if(adisplay === "none"){
				item.style.display = "none";
				break; // no need to keep going up
			}
			if(current.nodeName.toLowerCase() === "html")break;
			current = current.parentNode;
		}
		//---
		// YouTube video top position negative value, then minus the height
		if(parseInt(t, 10) < 0){ item.style.top = visposition.y - h + "px"; }else{ item.style.top = visposition.y + "px"; }
		item.style.left = visposition.x + "px";
		item.style.width = w;
		item.style.height = h;
		if(d == "none"){ item.style.display = "none"; }

		// refresh pointer events
		if(autostopred == true){
			if(autostopsize == true){
				let videoWidth;
				let videoHeight;
				if(myElement.currentStyle){
					videoWidth = myElement.currentStyle["width"]; videoHeight = myElement.currentStyle["height"];
				}else if(window.getComputedStyle){
					st = document.defaultView.getComputedStyle(myElement, null); videoWidth = st.getPropertyValue("width"); videoHeight = st.getPropertyValue("height");
				}
				const vw = parseFloat(videoWidth);
				const vh = parseFloat(videoHeight);

				if(autostopsizepixelwidth < vw && autostopsizepixelheight < vh){
					// regular panel
					item.style.setProperty("pointer-events", "auto", "important");
				}else{
					// click through panel
					item.style.setProperty("pointer-events", "none", "important");
				}
			}
		}
	}

	function autostopfunction(){
		// A regular on first run
		autostopdetectionstart();
		// B New Mutation Summary API Reference
		var MutationObserver = window.MutationObserver || window.WebKitMutationObserver || window.MozMutationObserver;
		if(MutationObserver){
			// setup MutationSummary observer
			// Removed videolist = document since it's not used by the observer
			var observer = new MutationObserver(function(mutations){
				mutations.forEach(function(mutation){
					// Detect video src changes
					if(mutation.target.tagName === "VIDEO" && mutation.attributeName === "src" && mutation.target.currentSrc !== ""){
						autostopdetectionstart();
					}

					// Detect added/removed nodes
					if(mutation.type === "childList"){
						let needsRefresh = false;

						mutation.addedNodes.forEach((node) => {
							if(!node)return;

							// Direct <video> added
							if(node.tagName === "VIDEO"){
								needsRefresh = true;
							}

							// Recursive check inside new shadow roots
							function traverseShadow(n){
								if(!n)return;

								// If element has open shadow root
								if(n.shadowRoot && n.shadowRoot.mode === "open"){
									const shadowVideos = n.shadowRoot.querySelectorAll("video");
									if(shadowVideos.length > 0){
										needsRefresh = true;
									}
									// Traverse deeper inside the shadow DOM
									n.shadowRoot.querySelectorAll("*").forEach(traverseShadow);
								}

								// Also traverse normal children
								if(n.children && n.children.length){
									Array.from(n.children).forEach(traverseShadow);
								}
							}

							traverseShadow(node);
						});

						mutation.removedNodes.forEach((node) => {
							if(node.tagName === "VIDEO"){
								needsRefresh = true;
							}
						});

						if(needsRefresh){
							autostopdetectionstart();
						}
					}

					// Detect style changes for floating boxes
					if(mutation.attributeName === "style"){
						if(mutation.target.className !== "stefanvdautostop"){
							refreshsize();
						}
					}
				});
			});

			observer.observe(document.body, {
				subtree: true,
				childList: true,
				characterData: false,
				attributes: true
			});
		}
	}

	function autostopdetectionstart(){
		// first remove the excisting autostop panels
		var firstautostopremove = document.getElementsByClassName("stefanvdautostop");
		while(firstautostopremove.length > 0){
			firstautostopremove[0].parentNode.removeChild(firstautostopremove[0]);
		}

		var visualvideos = findAllVideos(document);
		var i, l = visualvideos.length;
		for(i = 0; i < l; i++){
			let selectedvideo = visualvideos[i];
			selectedvideo.setAttribute("data-videonum", i);
			selectedvideo.setAttribute("data-stopvideo", "true");

			// Ensure all videos, including those in shadow DOM, are paused immediately
			if(selectedvideo.paused == false){
				selectedvideo.pause();
				selectedvideo.currentTime = 0;
			}

			var reqId;
			var stopTracking = function(){
				if(selectedvideo.getAttribute("data-stopvideo") == "true"){
					if(reqId){
						cancelAnimationFrame(reqId);
					}
				}
			};

			// Check if listener is already added to prevent duplicates on refresh
			if(!selectedvideo.getAttribute("data-autostop-listener")){
				selectedvideo.setAttribute("data-autostop-listener", "true");
				selectedvideo.addEventListener("playing", function(ev){
					const videoEl = ev.target;

					function playLoop(){
						// Check if the element still exists in the DOM
						// Now using findAllVideos for re-check to catch shadow DOM removal
						const allVids = findAllVideos(document);
						if(!allVids.includes(videoEl)){
							cancelAnimationFrame(reqId);
							return;
						}

						if(!videoEl.hasAttribute("data-stopvideo")){
							videoEl.setAttribute("data-stopvideo", "true");
						}

						if(videoEl.getAttribute("data-stopvideo") === "true"){
							if(!videoEl.paused){
								videoEl.pause();
								videoEl.currentTime = 0;
							}

							const rock = videoEl.getAttribute("data-videonum");
							const panel = document.getElementById("stefanvdautostoppanel" + rock);
							if(panel){
								panel.style.display = "block";
								refreshsize();
							}

							reqId = requestAnimationFrame(playLoop);
						}else{
							stopTracking();
						}
					}

					reqId = requestAnimationFrame(playLoop);
				}, false);

				selectedvideo.addEventListener("pause", stopTracking);
			}

			var newautostoppanel = document.createElement("div");
			newautostoppanel.setAttribute("id", "stefanvdautostoppanel" + i);
			newautostoppanel.setAttribute("data-videonum", i);
			newautostoppanel.className = "stefanvdautostop";
			if(autostopred == true){
				if(autostopsize == true){
					let videoWidth;
					let videoHeight;
					if(selectedvideo.currentStyle){
						videoWidth = selectedvideo.currentStyle["width"]; videoHeight = selectedvideo.currentStyle["height"];
					}else if(window.getComputedStyle){
						st = document.defaultView.getComputedStyle(selectedvideo, null); videoWidth = st.getPropertyValue("width"); videoHeight = st.getPropertyValue("height");
					}
					const vw = parseFloat(videoWidth);
					const vh = parseFloat(videoHeight);
					if(autostopsizepixelwidth < vw && autostopsizepixelheight < vh){
						// regular panel
						newautostoppanel.setAttribute("style", "background:rgba(165,8,0,0.88)!important;");
						newautostoppanel.style.setProperty("pointer-events", "auto", "important");
					}else{
						// click through panel
						newautostoppanel.setAttribute("style", "background:rgba(165,8,0,0.88)!important;");
						newautostoppanel.style.setProperty("pointer-events", "none", "important");
					}
				}else{
					// regular panel
					newautostoppanel.setAttribute("style", "background:rgba(165,8,0,0.88)!important;");
					newautostoppanel.style.setProperty("pointer-events", "auto", "important");
				}
			}
			refreshdesign(newautostoppanel, selectedvideo);
			newautostoppanel.addEventListener("click", function(event){
				var templearn = event.target.id;
				templearn = templearn.substr(0, 26);
				if(templearn != "stefanvdautostoppanellearn"){
					const rock = this.getAttribute("data-videonum");
					const allVideos = findAllVideos(document);
					const thisVideo = allVideos.find((v) => v.getAttribute("data-videonum") === rock);
					if(thisVideo){
						this.style.display = "none";
						thisVideo.setAttribute("data-stopvideo", "false");

						var playPromise = thisVideo.play();
						if(playPromise !== undefined){
							playPromise.then(() => {
								// Automatic playback started!
							})
								.catch((e) => {
									// Auto-play was prevented
									console.log(e);
								});
						}
					}
				}
			}, false);
			newautostoppanel.addEventListener("contextmenu", function(e){ e.preventDefault(); }, false);
			document.body.appendChild(newautostoppanel);

			if(autostopred == true){
				var newautostoptitel = document.createElement("div");
				newautostoptitel.className = "stefanvdautostoptitel";
				newautostoptitel.innerText = chrome.i18n.getMessage("autostopenabled");
				newautostoppanel.appendChild(newautostoptitel);

				var newautostopdes = document.createElement("div");
				newautostopdes.className = "stefanvdautostopdes";
				newautostopdes.innerText = chrome.i18n.getMessage("autostopclickme");
				newautostoppanel.appendChild(newautostopdes);

				var newautostoplearn = document.createElement("div");
				newautostoplearn.setAttribute("id", "stefanvdautostoppanellearn" + i);
				newautostoplearn.className = "stefanvdautostoplearn";
				newautostoplearn.addEventListener("click", function(){
					window.open("https://www.turnoffthelights.com/support/browser-extension/what-is-the-autostop-feature/", "_blank");
				}, false);
				newautostoplearn.innerText = chrome.i18n.getMessage("autostopdetails");
				newautostoppanel.appendChild(newautostoplearn);

				var newautostopfoot = document.createElement("div");
				newautostopfoot.className = "stefanvdautostopfoot";
				newautostopfoot.innerText = chrome.i18n.getMessage("autostopblocked");
				newautostoppanel.appendChild(newautostopfoot);
			}
		}
	}

	function refreshsize(){
		var panels = document.getElementsByClassName("stefanvdautostop");
		var allVideos = findAllVideos(document);
		for(let i = 0; i < panels.length; i++){
			var item = panels[i];
			const videoNum = item.getAttribute("data-videonum");
			const myElement = allVideos.find((v) => v.getAttribute("data-videonum") === videoNum);

			if(myElement) refreshdesign(item, myElement);
			else if(item) item.parentNode.removeChild(item);
		}
	}

	// Ensure autostop starts only after DOM is ready
	function safeAutostopStart(){
		if(document.readyState === "complete" || document.readyState === "interactive"){
			waitForVideosThenStart();
		}else{
			document.addEventListener("DOMContentLoaded", waitForVideosThenStart, {once: true});
		}
	}

	function waitForVideosThenStart(){
		let tries = 0;
		const maxTries = 60; // about 30 seconds (if every 500ms)
		const interval = setInterval(() => {
			const vids = findAllVideos(document);
			if(vids.length > 0 || tries >= maxTries){
				clearInterval(interval);
				// console.log("AutoStop initialized after waiting, found videos:", vids.length);
				autostopfunction();
			}else{
				tries++;
				// console.debug("Waiting for video elements... try", tries);
			}
		}, 500);
	}

	if(autostop == true){
		if(autostoponly == true){
			var currenturl = window.location.protocol + "//" + window.location.host;
			var stoprabbit = false;
			if(typeof autostopDomains == "string"){
				autostopDomains = JSON.parse(autostopDomains);
				var atbuf = [], domain;
				for(domain in autostopDomains)
					atbuf.push(domain);
				atbuf.sort();
				var i, l = atbuf.length;
				for(i = 0; i < l; i++){
					if(autostopchecklistwhite == true){
						if(currenturl == atbuf[i]){ safeAutostopStart(); }
					}else if(autostopchecklistblack == true){
						if(currenturl == atbuf[i]){ stoprabbit = true; }
					}
				}
			}
			if(autostopchecklistblack == true && stoprabbit == false){ safeAutostopStart(); }
		}else{ safeAutostopStart(); }

		window.addEventListener("resize", refreshsize, false);
		window.addEventListener("scroll", refreshsize, false);
	}
});