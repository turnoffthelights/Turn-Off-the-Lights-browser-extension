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

chrome.storage.sync.get(["autostop", "autostoponly", "autostopDomains", "autostopchecklistwhite", "autostopchecklistblack", "autostopred"], function(response){
	var autostop = response["autostop"];
	var autostoponly = response["autostoponly"];
	var autostopDomains = response["autostopDomains"];
	var autostopchecklistwhite = response["autostopchecklistwhite"];
	var autostopchecklistblack = response["autostopchecklistblack"];
	var autostopred = response["autostopred"];

	function getPosition(el){
		var xPos = 0; var yPos = 0;
		while(el){ xPos += (el.offsetLeft - el.scrollLeft + el.clientLeft); yPos += (el.offsetTop - el.scrollTop + el.clientTop); el = el.offsetParent; }
		return{x:xPos, y:yPos};
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
		// if previous path is none, then hide it too
		var path = [];
		do{
			var qq = path.unshift(myElement.nodeName);
			var adisplay;
			if(myElement.currentStyle){
				adisplay = qq.currentStyle["display"];
			}else{
				st = document.defaultView.getComputedStyle(myElement, null);
				adisplay = st.getPropertyValue("display");
			}
			if(adisplay == "none"){
				item.style.display = "none";
			}
		}while((myElement.nodeName.toLowerCase() != "html") && (myElement = myElement.parentNode));
		//---

		// YouTube video top position negative value, then minus the height
		if(parseInt(t, 10) < 0){ item.style.top = visposition.y - h + "px"; }else{ item.style.top = visposition.y + "px"; }
		item.style.left = visposition.x + "px";
		item.style.width = w;
		item.style.height = h;
		if(d == "none"){ item.style.display = "none"; }
	}

	function autostopfunction(){
	// A regular on first run
		autostopdetectionstart();
		// B New Mutation Summary API Reference
		var MutationObserver = window.MutationObserver || window.WebKitMutationObserver || window.MozMutationObserver;
		if(MutationObserver){
			// setup MutationSummary observer
			var videolist = document.body;
			var observer = new MutationObserver(function(mutations){
				mutations.forEach(function(mutation){
					if(mutation.target.tagName == "VIDEO" && mutation.attributeName === "src" && mutation.target.currentSrc != ""){
						autostopdetectionstart();
					}
					// dynamic add and remove video
					if(mutation.type == "childList"){
						var i, la = mutation.addedNodes.length;
						for(i = 0; i < la; i++){
							if(mutation.addedNodes[i].tagName == "VIDEO"){
								autostopdetectionstart();
							}
						}
						var j, lr = mutation.removedNodes.length;
						for(j = 0; j < lr; j++){
							if(mutation.removedNodes[j].tagName == "VIDEO"){
								autostopdetectionstart();
							}
						}
					}
					// inside it
					var k, l = mutation.addedNodes.length;
					for(k = 0; k < l; k++){
						if(mutation.addedNodes[k]){
							var n, lac = mutation.addedNodes[k].childNodes.length;
							for(n = 0; n < lac; n++){
								if(mutation.addedNodes[k].childNodes[n].nodeName == "VIDEO"){
									autostopdetectionstart();
								}
							}
						}
					}
					// detect change style - this for floating box in div detection
					if(mutation.attributeName == "style"){
						if(mutation.target.className != "stefanvdautostop"){
							refreshsize();
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

	function autostopdetectionstart(){
	// first remove the excisting autostop panels
		var firstautostopremove = document.getElementsByClassName("stefanvdautostop");
		while(firstautostopremove.length > 0){
			firstautostopremove[0].parentNode.removeChild(firstautostopremove[0]);
		}

		var visualvideos = document.getElementsByTagName("video"), selectedvideo = null, i, l = visualvideos.length;
		for(i = 0; i < l; i++){
			selectedvideo = visualvideos[i];
			selectedvideo.setAttribute("data-videonum", i);
			selectedvideo.setAttribute("data-stopvideo", "true");

			if(selectedvideo.paused == false){
				var playPromise = selectedvideo.play();
				if(playPromise !== undefined){
					playPromise.then(() => {
						// Automatic playback started!
						// Show playing UI.
						// We can now safely pause video...
						selectedvideo.pause(); selectedvideo.currentTime = 0;
					})
						.catch((e) => {
							// Auto-play was prevented
							// Show paused UI.
							console.log(e);
						});
				}
			}

			var reqId;
			var stopTracking = function(){
				if(selectedvideo.getAttribute("data-stopvideo") == "true"){
					if(reqId){
						cancelAnimationFrame(reqId);
					}
				}
			};
			selectedvideo.addEventListener("playing", function(ev){
				reqId = requestAnimationFrame(function play(){
					if(ev.target.getAttribute("data-stopvideo") == null){
						ev.target.setAttribute("data-stopvideo", "true");
					}
					if(ev.target.getAttribute("data-stopvideo")){
						if(ev.target.getAttribute("data-stopvideo") == "true"){
							if(!ev.target.paused){
								var playPromise = ev.target.play();
								if(playPromise !== undefined){
									playPromise.then(() => {
										// Automatic playback started!
										// Show playing UI.
										// We can now safely pause video...
										ev.target.pause(); ev.target.currentTime = 0;
										stopTracking();
									})
										.catch((e) => {
											// Auto-play was prevented
											// Show paused UI.
											console.log(e);
										});
								}
							}
							var rock = ev.target.getAttribute("data-videonum");
							if(document.getElementById("stefanvdautostoppanel" + rock)){
								document.getElementById("stefanvdautostoppanel" + rock).style.display = "block";
								refreshsize();
							}
							// console.log(Math.round(video.currentTime * 1000));
							reqId = requestAnimationFrame(play);
						}
					}
				});
			}, false);
			selectedvideo.addEventListener("pause", stopTracking);

			var newautostoppanel = document.createElement("div");
			newautostoppanel.setAttribute("id", "stefanvdautostoppanel" + i);
			newautostoppanel.setAttribute("data-videonum", i);

			newautostoppanel.className = "stefanvdautostop";
			if(autostopred == true){
				newautostoppanel.setAttribute("style", "background:rgba(165,8,0,0.88)!important");
			}

			var myElement = document.getElementsByTagName("video")[i];
			refreshdesign(newautostoppanel, myElement);

			newautostoppanel.addEventListener("click", function(event){
				var templearn = event.target.id;
				templearn = templearn.substr(0, 26);
				if(templearn != "stefanvdautostoppanellearn"){
					var rock = this.getAttribute("data-videonum");
					document.getElementById("stefanvdautostoppanel" + rock).style.display = "none";
					document.getElementsByTagName("video")[rock].setAttribute("data-stopvideo", "false");
					var playPromise = document.getElementsByTagName("video")[rock].play();
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
		var cusid_ele = document.getElementsByClassName("stefanvdautostop");
		var i, l = cusid_ele.length;
		for(i = 0; i < l; ++i){
			var item = cusid_ele[i], myElement = document.getElementsByTagName("video")[i];
			if(myElement){
				refreshdesign(item, myElement);
			}else{
				// remove this stop layer
				if(item){
					item.parentNode.removeChild(item);
				}
			}
		}
	}

	if(autostop == true){
		document.addEventListener("DOMContentLoaded", function(){
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
							if(currenturl == atbuf[i]){ autostopfunction(); }
						}else if(autostopchecklistblack == true){
							if(currenturl == atbuf[i]){ stoprabbit = true; }
						}
					}
				}
				if(autostopchecklistblack == true && stoprabbit == false){ autostopfunction(); }
			}else{ autostopfunction(); }
		}, false);

		window.addEventListener("resize", function(){ refreshsize(); }, false);
		window.addEventListener("scroll", function(){ refreshsize(); }, false);

	} // option autostop on end
});