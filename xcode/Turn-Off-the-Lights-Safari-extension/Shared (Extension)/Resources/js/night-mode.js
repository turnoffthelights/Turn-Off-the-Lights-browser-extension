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
var nighttheme = null, nightonly = null, nightDomains = null, nightenabletheme = null, nighthover = null, nmbegintime = null, nmendtime = null, nightmodechecklistblack = null, nightmodechecklistwhite = null, nmtopleft = null, nmtopright = null, nmbottomright = null, nmbottomleft = null, nmcustom = null, nmcustomx = null, nmcustomy = null, nightmodebck = null, nightmodetxt = null, nightmodehyperlink = null, nightmodebydomain = null, nightmodebypage = null, nightmodegesture = null, nightactivetime = null, nightmodeswitchhide = null, nightmodeswitchhidetime = null, nightmodebutton = null, nightmodeos = null, nightmodeborder = null, nmautobegintime = null, nmautoendtime = null, nmautoclock = null, nightmodeimage = null, nmimagedark = null, nmimagegray = null;

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

var currennightthemedark = "#ffffff";
var currentnightthemelight = "#ffffff";
function getdefaultnightmetatheme(){
	if($("stefanvdtheme")){
		var myElement = document.getElementById("stefanvdtheme");
		currentnightthemelight = myElement.getAttribute("data-themelight");
		currennightthemedark = myElement.getAttribute("data-themedark");
	}else{
		const metas = document.getElementsByTagName("meta");
		let i, l = metas.length;
		for(i = 0; i < l; i++){
			if(metas[i].getAttribute("name") == "theme-color"){
				if(metas[i].getAttribute("media")){
					if(metas[i].getAttribute("media") == "(prefers-color-scheme: light)"){
						currentnightthemelight = metas[i].getAttribute("content");
					}else if(metas[i].getAttribute("media") == "(prefers-color-scheme: dark)"){
						currennightthemedark = metas[i].getAttribute("content");
					}
				}else{
					currennightthemedark = currentnightthemelight = metas[i].getAttribute("content");
				}
			}
		}
		const newDiv = document.createElement("div");
		newDiv.id = "stefanvdtheme";
		newDiv.className = "totltheme";
		newDiv.setAttribute("data-themelight", currentnightthemelight);
		newDiv.setAttribute("data-themedark", currennightthemedark);
		document.body.appendChild(newDiv);
	}
}

function setnightmetatheme(a){
	const metas = document.getElementsByTagName("meta");
	var darktheme, lighttheme;

	var newnightmodetcolor = nightmodebck;
	if(a == true){
		// night mode is disable
		darktheme = currennightthemedark;
		lighttheme = currentnightthemelight;
	}else{
		// night mode is active
		darktheme = newnightmodetcolor;
		lighttheme = newnightmodetcolor;
	}

	var i, l = metas.length;
	for(i = 0; i < l; i++){
		if(metas[i].getAttribute("name") == "theme-color"){
			if(metas[i].getAttribute("media")){
				if(metas[i].getAttribute("media") == "(prefers-color-scheme: light)"){ metas[i].setAttribute("content", lighttheme); }else if(metas[i].getAttribute("media") == "(prefers-color-scheme: dark)"){ metas[i].setAttribute("content", darktheme); }
			}else{
				metas[i].setAttribute("content", lighttheme);
			}
		}
	}

	var x = document.querySelector("meta[name=\"theme-color\"]");
	if(x == null){
		// create one theme-color
		var newmeta = document.createElement("meta");
		newmeta.name = "theme-color";
		newmeta.setAttribute("content", lighttheme);
		document.getElementsByTagName("head")[0].appendChild(newmeta);
	}
}

function returntimetoseconds(a){
	return a.split(":")[0] * 3600 + a.split(":")[1] * 60;
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

const afterBodyReady = () => {
	chrome.storage.sync.get(["nighttheme", "nightonly", "nightDomains", "nightenabletheme", "nighthover", "nmbegintime", "nmendtime", "nightmodechecklistblack", "nightmodechecklistwhite", "nmtopleft", "nmtopright", "nmbottomright", "nmbottomleft", "nmcustom", "nmcustomx", "nmcustomy", "nightmodebck", "nightmodetxt", "nightmodehyperlink", "nightmodebydomain", "nightmodebypage", "nightmodegesture", "nightactivetime", "nightmodeswitchhide", "nightmodeswitchhidetime", "nightmodebutton", "nightmodeos", "nightmodeborder", "nmautobegintime", "nmautoendtime", "nmautoclock", "nightmodeimage", "nmimagedark", "nmimagegray"], function(response){
		nighttheme = response["nighttheme"];
		nightonly = response["nightonly"];
		nightDomains = response["nightDomains"];
		nightenabletheme = response["nightenabletheme"];
		nighthover = response["nighthover"];
		nmbegintime = response["nmbegintime"];
		nmendtime = response["nmendtime"];
		nightmodechecklistblack = response["nightmodechecklistblack"];
		nightmodechecklistwhite = response["nightmodechecklistwhite"];
		nmtopleft = response["nmtopleft"]; if(nmtopleft == null)nmtopleft = false;
		nmtopright = response["nmtopright"]; if(nmtopright == null)nmtopright = false;
		nmbottomright = response["nmbottomright"]; if(nmbottomright == null)nmbottomright = false;
		nmbottomleft = response["nmbottomleft"]; if(nmbottomleft == null)nmbottomleft = true;
		nmcustom = response["nmcustom"];
		nmcustomx = response["nmcustomx"]; if(nmcustomx == null)nmcustomx = "15px";
		nmcustomy = response["nmcustomy"]; if(nmcustomy == null)nmcustomy = "15px";
		nightmodebck = response["nightmodebck"]; if(nightmodebck == null)nightmodebck = "#1e1e1e";
		nightmodetxt = response["nightmodetxt"]; if(nightmodetxt == null)nightmodetxt = "#ffffff";
		nightmodehyperlink = response["nightmodehyperlink"]; if(nightmodehyperlink == null)nightmodehyperlink = "#ffffff";
		nightmodebydomain = response["nightmodebydomain"]; if(nightmodebydomain == null)nightmodebydomain = true;
		nightmodebypage = response["nightmodebypage"]; if(nightmodebypage == null)nightmodebypage = false;
		nightmodegesture = response["nightmodegesture"];
		nightactivetime = response["nightactivetime"];
		nightmodeswitchhide = response["nightmodeswitchhide"];
		nightmodeswitchhidetime = response["nightmodeswitchhidetime"]; if(nightmodeswitchhidetime == null)nightmodeswitchhidetime = 3;
		nightmodebutton = response["nightmodebutton"]; if(nightmodebutton == null)nightmodebutton = "#353535";
		nightmodeos = response["nightmodeos"];
		nightmodeborder = response["nightmodeborder"]; if(nightmodeborder == null)nightmodeborder = "#545454";
		nmautobegintime = response["nmautobegintime"];
		nmautoendtime = response["nmautoendtime"];
		nmautoclock = response["nmautoclock"];
		nightmodeimage = response["nightmodeimage"]; if(nightmodeimage == null)nightmodeimage = false;
		nmimagedark = response["nmimagedark"]; nmimagedark = parseInt(100 - nmimagedark); if(nmimagedark == null)nmimagedark = 60;
		nmimagegray = response["nmimagegray"]; if(nmimagegray == null)nmimagegray = 50;

		var windark = window.matchMedia("(prefers-color-scheme: dark)");

		var isitdark = false;
		// Observe a specific DOM element:
		if(window.location.href.match(/((http:\/\/(.*youtube\.com\/.*))|(https:\/\/(.*youtube\.com\/.*)))/i)){
			if(document.getElementById("content")){ // from youtube website
				observeDOM(document.getElementById("content"), function(){

					// for the night mode live update
					if(isitdark == true){
						sun = true; gogonightmode(); // make it dark

						var i, frames;
						frames = document.getElementsByTagName("iframe");
						for(i = 0; i < frames.length; ++i){
							frames[i].onload = function(){
								sun = true; gogonightmode(); // make it dark
							};
						}
					}

				});
			}
		}

		// night mode: elements added or removed
		observeDOM(document.body, function(){
			if(nighttheme == true){
				if(nightonly != true){
					// switch not available? then add it back!
					if(!document.getElementById("stefanvdnighttheme")){
						showswitchtricker();
						if(isitdark == true){
							sun = false;
							if($("stefanvdnighti")){
								$("stefanvdnighti").setAttribute("id", "stefanvdnightin"); // change day background button
							}
							if($("stefanvdnightthemecheckbox")){ $("stefanvdnightthemecheckbox").checked = true; }
						}else{
							sun = true;
							if($("stefanvdnightin")){
								$("stefanvdnightin").setAttribute("id", "stefanvdnighti"); // change night background button
							}
							if($("stefanvdnightthemecheckbox")){ $("stefanvdnightthemecheckbox").checked = false; }
						}
					}
				}
			}
		});

		var nightobserver = new MutationObserver(function(mutations){
			mutations.forEach(function(mutation){

				// console.log('Mutation type: ' + mutation.type);
				if(mutation.type == "childList"){
					if(mutation.addedNodes.length >= 1){
						mutation.addedNodes.forEach(function(node){
							if(typeof node.getElementsByTagName !== "function"){
								return;
							}
							// parent node
							convertwebnight(node);
							// childs node
							var aninside = node.getElementsByTagName("*");
							var k;
							var l = aninside.length;
							for(k = 0; k < l; k++){
								convertwebnight(aninside[k]);
							}
						});
					}
				}else if(mutation.type == "attributes"){
					// only for class and style, disable temporally the mutation observer and then enable it back
					var attributeValue = mutation.target.getAttribute(mutation.attributeName);
					if(attributeValue != null){
						// End mutation observer
						nightobserver.disconnect();
						if(mutation.attributeName === "class"){
							convertwebnight(mutation.target);
						}
						// Start mutation observer
						nightobserver.observe(targetNode, observerConfig);
					}
					// night mode style changed
					if(mutation.attributeName == "style"){
						convertwebnight(mutation.target);
					}
				}

			});
		});

		var observerConfig = {
			subtree: true, // observe the subtree rooted at ...videolist...
			childList: true, // include childNode insertion/removals
			characterData: false, // include textContent changes
			attributes: true, // include changes to attributes within the subtree
			attributeFilter: ["style", "class"]
		};

		// Listen to all changes to body and child nodes
		var targetNode = document.body;

		function occurrences(string, subString, allowOverlapping){
			string += "";
			subString += "";
			if(subString.length <= 0)return(string.length + 1);

			var n = 0,
				pos = 0,
				step = allowOverlapping ? 1 : subString.length;

			var tempwhile = true;
			while(tempwhile){
				pos = string.indexOf(subString, pos);
				if(pos >= 0){
					++n;
					pos += step;
				}else break;
			}
			return n;
		}

		function convertwebnight(node){
			if(typeof(node) == "undefined" && node != null){
				return;
			}
			if(typeof(node.tagName) == "undefined" && node.tagName != null){
				return;
			}
			// console.log("node id:" + node.id + " tag:" + node.tagName + " class:" + node.className);
			if(node.className == "stefanvdlightareoff" && node != null){
				return;
			}
			if(node.id == "stefanvdtheme" && node != null){
				return;
			}
			if(node.id == "totldark" && node != null){
				return;
			}

			var parent = document.getElementById("stefanvdnighttheme");
			if(parent && parent.contains(node)){
				// console.log("Node inside? = Yes " + node.className);
			}else{
				// console.log("Node inside? = No " + node.className);
				switch(node.tagName){
				case"IMG":
					// search all images and add dimmed effect
					if(nightmodeimage == true){
						node.classList.add("stefanvdnightimage");
					}
					break;
				case"STYLE":
				case"SCRIPT":
				case"HEAD":
				case"META":
				case"LINK":
				case"TITLE":
				case"IFRAME":
				case"svg":
				case"path":
				case"PICTURE":
				case"SOURCE":
				case"VIDEO":
				case"AUDIO":
				case"FIGURE":
				case"CANVAS":
				case"MAP":
				case"TRACK":
				case"AREA":
				case"NOSCRIPT":
				case"BASE":
				case"BR":
				// do nothing
					break;
				default:
					var st, y, z, x, w, v;
					// if night class is already added, skip this node
					// Else create it
					if(node.classList.contains("stefanvdnightbck") == false){
						var thatbckishere = false;
						var thatskipimage = false;
						if(node.currentStyle){
							y = node.currentStyle["background-color"];
							z = node.currentStyle["background-image"];
							x = node.currentStyle["border-color"];
							w = node.currentStyle["box-shadow"];
							v = node.currentStyle["text-shadow"];
						}else if(window.getComputedStyle){
							st = document.defaultView.getComputedStyle(node, null);
							y = st.getPropertyValue("background-color");
							z = st.getPropertyValue("background-image");
							x = st.getPropertyValue("border-color");
							w = st.getPropertyValue("box-shadow");
							v = st.getPropertyValue("text-shadow");
						}

						if(y == "rgba(0, 0, 0, 0)" || y.includes("rgba(0, 0, 0, 0")){
							thatbckishere = false;
							thatskipimage = false;
							if(z == "none"){
								var alpha = y.replace(/^.*,(.+)\)/, "$1");
								if(alpha > .1){
									// alpha value higher than 10%
									thatbckishere = true;
								}
							}else if(z.indexOf("linear-gradient") || z.indexOf("radial-gradient")){
								// if bigger then width 24px
								if(node.clientWidth >= 24){
									// check if use more than 1X gradient white
									var bla = occurrences(z, "rgb(255, 255, 255)");
									if(bla >= 1){ // check if includes it 1 item or more
										thatbckishere = true;
									}
									// check if use more than 1X transparent or rgba(0, 0, 0, 0)
									var blb = occurrences(z, "rgba(0, 0, 0, 0)");
									if(blb >= 1){ // check if includes it 1 item or more
										thatbckishere = true;
									}
								}
							}else{
								// div with background image url inside
								// thatbckishere = true;
							}
						}else{
							thatbckishere = true;
						}

						// check div do have a background but is smaller then 150px
						if(z != "none" && !z.indexOf("linear-gradient") && !z.indexOf("radial-gradient")){
							if(node.clientHeight < 150 && node.clientWidth < 150){
								thatskipimage = true;
							}
						}

						// background color is transparent, then add only the text color
						if(node.tagName == "BUTTON" || (node.tagName == "INPUT" && node.type == "submit")){
							if(thatbckishere == true){
								// if no background then do nothing
								node.classList.add("stefanvdnightbutton");
							}else{
								// if no background then do nothing
								node.classList.add("stefanvdnight");
							}
						}else{
							// skip image do not get the night background and text color
							if(thatskipimage != true){
								if(thatbckishere == true){
									node.classList.add("stefanvdnightbck", "stefanvdnight");
								}else{
									node.classList.add("stefanvdnight");
								}
							}
						}
						// <a> with background change it to night button color
						if(node.tagName == "A"){
							if(y != "rgba(0, 0, 0, 0)"){
								node.classList.add("stefanvdnightbutton");
							}
						}

						// change border color
						if(x !== null){
							node.classList.add("stefanvdnightborder");
						}

						// box shadow that look also as a single border line
						var partw = w.includes("0px 0px 0px 1px");
						if(partw){
							node.classList.add("stefanvdnightboxshadow");
						}

						// textshadow
						var parts = v.includes("rgb(255, 255, 255)");
						if(parts != "none"){
							node.classList.add("stefanvdnighttextshadow");
						}

						// pseudo before
						var pseudobefore = window.getComputedStyle(node, ":before").getPropertyValue("background");
						if(pseudobefore.includes("rgb(255, 255, 255)")){
							node.classList.add("stefanvdnightpseudobefore");
						}else if(pseudobefore.includes(".svg")){
							// do nothing
						}else{
							node.classList.add("stefanvdnightpseudobefore");
						}

						var pseudoafter = window.getComputedStyle(node, ":after").getPropertyValue("background");
						if(pseudoafter.includes("rgb(255, 255, 255)")){
							node.classList.add("stefanvdnightpseudoafter");
						}else if(pseudoafter.includes(".svg")){
							// do nothing
						}else{
							node.classList.add("stefanvdnightpseudoafter");
						}
					}
				}
			}
		}

		function addcsstext(a, b){
			var head = document.head || document.getElementsByTagName("head")[0], style = document.createElement("style");
			if($(a)){
				$(a).innerText = b;
			}else{
				style.type = "text/css";
				style.setAttribute("id", a);
				style.appendChild(document.createTextNode(b));
				head.appendChild(style);
			}
		}

		// Night Theme feature
		var sun = true;
		var oldbackgroundImage = document.body.style.backgroundImage;
		var oldbackgroundColor = document.body.style.backgroundColor;
		var oldbackground = document.body.style.background;
		var oldtextcolor = document.body.style.color;
		var oldbackgroundColorhtml = document.getElementsByTagName("html")[0].style.background;

		function webgonightmode(){
			return new Promise(function(fulfill){
				if(sun == true){
					sun = false;
					if($("stefanvdnighti")){
						$("stefanvdnighti").setAttribute("id", "stefanvdnightin"); // change day background button
					}
					if($("stefanvdnightthemecheckbox")){ $("stefanvdnightthemecheckbox").checked = true; }

					// extern get that the Night Mode is activated
					if(!$("totldark")){
						const newDiv = document.createElement("div");
						newDiv.id = "totldark";
						document.body.appendChild(newDiv);
					}

					if(!window.location.href.match(/((http:\/\/(.*youtube\.com\/.*))|(https:\/\/(.*youtube\.com\/.*)))/i)){
						if(document.getElementsByTagName("html")[0].classList.contains("stefanvdnightbck") || document.getElementsByTagName("html")[0].classList.contains("stefanvdnight")){
						// do nothing
						}else{
							document.getElementsByTagName("html")[0].classList.add("stefanvdnightbck", "stefanvdnight");
						}

						if(document.body.classList.contains("stefanvdnightbck") || document.body.classList.contains("stefanvdnight")){
						// do nothing
						}else{
							document.body.classList.add("stefanvdnightbck", "stefanvdnight");
						}

						// search all elements and add night class
						var n = document.body.getElementsByTagName("*");
						var i;
						var l = n.length;
						for(i = 0; i < l; i++){
							convertwebnight(n[i]);
						}
					}
					//---
					if(window.location.href.match(/((http:\/\/(.*youtube\.com\/.*))|(https:\/\/(.*youtube\.com\/.*)))/i)){
						document.body.style.backgroundColor = nightmodebck;
						document.body.style.background = nightmodebck;
						document.body.style.color = nightmodetxt;
						document.querySelector("html").style.backgroundColor = nightmodebck;

						if($("logo-container")){ $("logo-container").style.cssText = "-webkit-filter: grayscale(100%) brightness(100%) contrast(100%);"; }
						if($("watch7-action-buttons")){ $("watch7-action-buttons").style.cssText = "-webkit-filter: grayscale(0%) brightness(100%) contrast(0%);"; }
						if($("watch7-content")){ $("watch7-content").style.background = nightmodebck; } // #fff
						if($("yt-masthead-container")){ $("yt-masthead-container").style.background = nightmodebck; } // #f1f1f1
						if($("watch7-sidebar")){ $("watch7-sidebar").style.background = nightmodebck; } // #fff
						if($("watch7-headline")){ $("watch7-headline").style.background = nightmodebck; } // #fff
						if($("watch7-user-header")){ $("watch7-user-header").style.background = nightmodebck; } // #fff
						if($("footer-container")){ $("footer-container").style.background = nightmodebck; } // #f2f2f2
						if($("c4-shelves-container")){ $("c4-shelves-container").style.background = nightmodebck; } // #fff
						if($("watch7-creator-bar")){ $("watch7-creator-bar").style.background = nightmodebck; } // #fff
						if($("non-appbar-vm-video-actions-bar")){ $("non-appbar-vm-video-actions-bar").style.background = nightmodebck; } // #fff
						if($("masthead-search-terms")){ $("masthead-search-terms").style.background = nightmodebck; } // #fff
						if($("watch7-action-panel-footer")){ $("watch7-action-panel-footer").style.background = nightmodebck; } // #fff
						var ytbranddiv = document.querySelectorAll("div.branded-page-v2-primary-col");
						var ytbrai;
						var ytbral = ytbranddiv.length;
						for(ytbrai = 0; ytbrai < ytbral; ytbrai++){ ytbranddiv[ytbrai].style.background = nightmodebck; } // #fff
						var ytheaddiv = document.querySelectorAll("div.secondary-header-contents");
						var ytheai;
						var ytheal = ytheaddiv.length;
						for(ytheai = 0; ytheai < ytheal; ytheai++){ ytheaddiv[ytheai].style.background = nightmodebck; } // #fff
						var ytmastersearchtermdiv = document.querySelectorAll("div.masthead-search-terms-border");
						var ytmasi;
						var ytmasl = ytmastersearchtermdiv.length;
						for(ytmasi = 0; ytmasi < ytmasl; ytmasi++){ ytmastersearchtermdiv[ytmasi].style.border = "1px solid #414141"; } // #414141
						var ytuixbuttondiv = document.querySelectorAll("button.yt-uix-button-default");
						var ytuxi;
						var ytuxl = ytuixbuttondiv.length;
						for(ytuxi = 0; ytuxi < ytuxl; ytuxi++){ ytuixbuttondiv[ytuxi].style.background = "#333333"; ytuixbuttondiv[ytuxi].style.color = "#fff"; ytuixbuttondiv[ytuxi].style.borderColor = "#5E5E5E"; }
						var ytuixadiv = document.querySelectorAll("a.yt-uix-button-default");
						var ytuxai;
						var ytuxal = ytuixadiv.length;
						for(ytuxai = 0; ytuxai < ytuxal; ytuxai++){ ytuixadiv[ytuxai].style.background = "#333333"; ytuixadiv[ytuxai].style.color = "#fff"; ytuixadiv[ytuxai].style.borderColor = "#5E5E5E"; }
						var ytuploadlidiv = document.querySelectorAll("li.vm-video-item");
						var ytupli;
						var ytupll = ytuploadlidiv.length;
						for(ytupli = 0; ytupli < ytupll; ytupli++){ ytuploadlidiv[ytupli].style.background = nightmodebck; }
						var ytuploadmetrixdiv = document.querySelectorAll("div.vm-video-metrics");
						var ytuploi;
						var ytuplol = ytuploadmetrixdiv.length;
						for(ytuploi = 0; ytuploi < ytuplol; ytuploi++){ ytuploadmetrixdiv[ytuploi].style.backgroundImage = "linear-gradient(to right,#000000 0,#000 11px)"; }
						var ytmetadatadiv = document.querySelectorAll("button.metadata-inline");
						var ytmetai;
						var ytmetal = ytmetadatadiv.length;
						for(ytmetai = 0; ytmetai < ytmetal; ytmetai++){ ytmetadatadiv[ytmetai].style.background = nightmodebck; }
						if($("watch7-container")){ $("watch7-container").style.background = nightmodebck; } // #fff
						if($("masthead-appbar")){ $("masthead-appbar").style.background = nightmodebck; } // #fff
						if($("gh-activityfeed")){ $("gh-activityfeed").style.background = nightmodebck; } // #fff
						if($("appbar-guide-menu")){ $("appbar-guide-menu").style.background = nightmodebck; } // #fff
						if($("gh-overviewtab")){ $("gh-overviewtab").style.background = nightmodebck; } // #fff
						if($("c4-primary-header-contents")){ $("c4-primary-header-contents").style.background = nightmodebck; } // #fff
						if($("channel-subheader")){ $("channel-subheader").style.background = nightmodebck; } // #fff
						if($("eow-title")){ $("eow-title").style.color = "#7C7C7C"; }
						var ytcard = document.querySelectorAll(".yt-card");
						var ytcardi;
						var ytcardl = ytcard.length;
						for(ytcardi = 0; ytcardi < ytcardl; ytcardi++){ ytcard[ytcardi].style.background = nightmodebck; ytcard[ytcardi].style.color = "#7C7C7C"; }
						// update 11 may 2014
						var ytguideitem = document.querySelectorAll("a.guide-item");
						var ytguidei;
						var ytguidel = ytguideitem.length;
						for(ytguidei = 0; ytguidei < ytguidel; ytguidei++){ ytguideitem[ytguidei].style.color = "#999"; }
						var ytuiellipsis = document.querySelectorAll("a.yt-ui-ellipsis");
						var ytelpi;
						var ytelpl = ytuiellipsis.length;
						for(ytelpi = 0; ytelpi < ytelpl; ytelpi++){ ytuiellipsis[ytelpi].style.background = nightmodebck; }
						var ytnbc = document.querySelectorAll("div.nbc");
						var ytni;
						var ytnl = ytnbc.length;
						for(ytni = 0; ytni < ytnl; ytni++){ ytnbc[ytni].style.backgroundColor = nightmodebck; }
						if($("watch-description-clip")){ $("watch-description-clip").style.color = "#999"; }
						if($("masthead-expanded-container")){ $("masthead-expanded-container").style.background = nightmodebck; }
						// update 12 june 2014
						var ytselectedguideitem = document.querySelectorAll("a.guide-item-selected");
						var ytselci;
						var ytselcl = ytselectedguideitem.length;
						for(ytselci = 0; ytselci < ytselcl; ytselci++){ ytselectedguideitem[ytselci].style.color = "#999"; }
						if($("masthead-search-term")){ $("masthead-search-term").style.color = "white"; }
						var ytuiellipsisdv = document.querySelectorAll("div.yt-ui-ellipsis");
						var ytuieli;
						var ytuiell = ytuiellipsisdv.length;
						for(ytuieli = 0; ytuieli < ytuiell; ytuieli++){ ytuiellipsisdv[ytuieli].style.background = nightmodebck; }
						var ytgssbmtable = document.querySelectorAll("table.gssb_m");
						var ytgssmi;
						var ytgssml = ytgssbmtable.length;
						for(ytgssmi = 0; ytgssmi < ytgssml; ytgssmi++){ ytgssbmtable[ytgssmi].style.background = nightmodebck; ytgssbmtable[ytgssmi].style.color = "white"; }
						var ytdivytuixexpander = document.querySelectorAll("div.yt-uix-expander-ellipsis");
						var ytdivi;
						var ytdivl = ytdivytuixexpander.length;
						for(ytdivi = 0; ytdivi < ytdivl; ytdivi++){ ytdivytuixexpander[ytdivi].style.background = nightmodebck; }
						// update 3 april 2015
						var ytdivallcomments = document.querySelectorAll("div.all-comments");
						var ytalldivi;
						var ytalldivl = ytdivallcomments.length;
						for(ytalldivi = 0; ytalldivi < ytalldivl; ytalldivi++){ ytdivallcomments[ytalldivi].style.background = nightmodebck; }
						var ytbtnuixdiv = document.querySelectorAll("button.yt-uix-button");
						var ytbtni;
						var ytbtnl = ytbtnuixdiv.length;
						for(ytbtni = 0; ytbtni < ytbtnl; ytbtni++){ ytbtnuixdiv[ytbtni].style.background = "#333333"; ytbtnuixdiv[ytbtni].style.color = "#fff"; }
						// update 16 april 2015
						var ytdivcomments = document.querySelectorAll("div.comments");
						var ytcommi;
						var ytcomml = ytdivcomments.length;
						for(ytcommi = 0; ytcommi < ytcomml; ytcommi++){ ytdivcomments[ytcommi].style.color = "#999"; }
						// update new YouTube layout 19 december 2016
						var ytytdapp = document.querySelectorAll("ytd-app");
						var ytappi;
						var ytappl = ytytdapp.length;
						for(ytappi = 0; ytappi < ytappl; ytappi++){ ytytdapp[ytappi].style.background = nightmodebck; }
						// var ytdotytdapp = document.querySelectorAll(".ytd-app");
						// var i;
						// var l = ytdotytdapp.length;
						// for(i = 0; i < l; i++){ytdotytdapp[i].style.background = nightmodebck;}
						var ytironicon = document.querySelectorAll("iron-icon");
						var ytrioni;
						var ytrionl = ytironicon.length;
						for(ytrioni = 0; ytrioni < ytrionl; ytrioni++){ ytironicon[ytrioni].style.cssText = "-webkit-filter: grayscale(0%) brightness(0%) contrast(0%);"; }
						if($("masthead")){ $("masthead").style.background = nightmodebck; }
						if($("contents")){ $("contents").style.color = nightmodetxt; }
						var yth3ytd = document.querySelectorAll("h3.ytd-compact-video-renderer");
						var yt3di;
						var yt3dl = yth3ytd.length;
						for(yt3di = 0; yt3di < yt3dl; yt3di++){ yth3ytd[yt3di].style.color = nightmodetxt; }
						var ytbyline = document.querySelectorAll("#byline.ytd-video-meta-block");
						var ytlinei;
						var ytlinel = ytbyline.length;
						for(ytlinei = 0; ytlinei < ytlinel; ytlinei++){ ytbyline[ytlinei].style.color = nightmodetxt; }
						var ytmetadata = document.querySelectorAll("#metadata-line.ytd-video-meta-block");
						var ytdatai;
						var ytdatal = ytmetadata.length;
						for(ytdatai = 0; ytdatai < ytdatal; ytdatai++){ ytmetadata[ytdatai].style.color = nightmodetxt; }
						var ytironicona = document.querySelectorAll(".iron-icon-0");
						var ytironi;
						var ytironl = ytironicona.length;
						for(ytironi = 0; ytironi < ytironl; ytironi++){ ytironicona[ytironi].style.color = nightmodetxt; }
						var ytverifiedbox = document.querySelectorAll("#guide-icon.ytd-topbar-logo-renderer");
						var ytveri;
						var ytverl = ytverifiedbox.length;
						for(ytveri = 0; ytveri < ytverl; ytveri++){ ytverifiedbox[ytveri].style.fill = nightmodetxt; }
						var yttitlevideo = document.querySelectorAll(".ytd-video-primary-info-renderer");
						var yttiti;
						var yttitl = yttitlevideo.length;
						for(yttiti = 0; yttiti < yttitl; yttiti++){ yttitlevideo[yttiti].style.color = nightmodetxt; }
						var ytforview = document.querySelectorAll(".yt-view-count-renderer");
						var ytfori;
						var ytforl = ytforview.length;
						for(ytfori = 0; ytfori < ytforl; ytfori++){ ytforview[ytfori].style.color = nightmodetxt; }
						var ytsecondinfo = document.querySelectorAll(".ytd-video-secondary-info-renderer");
						var ytseci;
						var ytsecl = ytsecondinfo.length;
						for(ytseci = 0; ytseci < ytsecl; ytseci++){ ytsecondinfo[ytseci].style.color = nightmodetxt; }
						var ytcommentshead = document.querySelectorAll(".ytd-comments-header-renderer");
						var ytcomi;
						var ytcoml = ytcommentshead.length;
						for(ytcomi = 0; ytcomi < ytcoml; ytcomi++){ ytcommentshead[ytcomi].style.color = nightmodetxt; }
						var ytcommentsimplebox = document.querySelectorAll(".ytd-comment-simplebox-renderer");
						var ytcomsimi;
						var ytcomsiml = ytcommentsimplebox.length;
						for(ytcomsimi = 0; ytcomsimi < ytcomsiml; ytcomsimi++){ ytcommentsimplebox[ytcomsimi].style.color = nightmodetxt; }
						var ytcommentrender = document.querySelectorAll(".ytd-comment-renderer");
						var ytcomreni;
						var ytcomrenl = ytcommentrender.length;
						for(ytcomreni = 0; ytcomreni < ytcomrenl; ytcomreni++){ ytcommentrender[ytcomreni].style.color = nightmodetxt; }
						var ytcommentaction = document.querySelectorAll(".ytd-comment-action-buttons-renderer");
						var ytcomaci;
						var ytcomacl = ytcommentaction.length;
						for(ytcomaci = 0; ytcomaci < ytcomacl; ytcomaci++){ ytcommentaction[ytcomaci].style.color = nightmodetxt; }
						var ytsigninpromo = document.querySelectorAll(".ytd-guide-signin-promo-renderer");
						var ytsigni;
						var ytsignl = ytsigninpromo.length;
						for(ytsigni = 0; ytsigni < ytsignl; ytsigni++){ ytsigninpromo[ytsigni].style.color = nightmodetxt; }
						var ytguidesectionrenderer = document.querySelectorAll(".ytd-guide-section-renderer");
						var ytguidseci;
						var ytguidsecl = ytguidesectionrenderer.length;
						for(ytguidseci = 0; ytguidseci < ytguidsecl; ytguidseci++){ ytguidesectionrenderer[ytguidseci].style.color = nightmodetxt; }
						var ytguideentryhover = document.querySelectorAll(".ytd-guide-entry-renderer:hover");
						var ytguidebi;
						var ytguidebl = ytguideentryhover.length;
						for(ytguidebi = 0; ytguidebi < ytguidebl; ytguidebi++){ ytguideentryhover[ytguidebi].style.backgroundColor = "#292929"; }
						var ytgridrenderer = document.querySelectorAll(".ytd-grid-renderer");
						var ytgridai;
						var ytgridal = ytgridrenderer.length;
						for(ytgridai = 0; ytgridai < ytgridal; ytgridai++){ ytgridrenderer[ytgridai].style.color = nightmodetxt; }
						var ytaccountsettings = document.querySelectorAll(".ytd-account-settings-0");
						var ytacci;
						var ytaccl = ytaccountsettings.length;
						for(ytacci = 0; ytacci < ytaccl; ytacci++){ ytaccountsettings[ytacci].style.backgroundColor = nightmodebck; }
						var ytmultipagerenderer = document.querySelectorAll(".ytd-multi-page-menu-renderer-0");
						var ytmultii;
						var ytmultil = ytmultipagerenderer.length;
						for(ytmultii = 0; ytmultii < ytmultil; ytmultii++){ ytmultipagerenderer[ytmultii].style.backgroundColor = nightmodebck; }
						var ytheadchannelname = document.querySelectorAll(".yt-endpoint-1");
						var ytheadi;
						var ytheadl = ytheadchannelname.length;
						for(ytheadi = 0; ytheadi < ytheadl; ytheadi++){ ytheadchannelname[ytheadi].style.color = nightmodetxt; }
						var ytendpoint = document.querySelectorAll(".yt-endpoint-3");
						var ytendi;
						var ytendl = ytendpoint.length;
						for(ytendi = 0; ytendi < ytendl; ytendi++){ ytendpoint[ytendi].style.color = nightmodetxt; }
						var ytendpointfour = document.querySelectorAll(".yt-endpoint-4");
						var ytendfi;
						var ytendfl = ytendpointfour.length;
						for(ytendfi = 0; ytendfi < ytendfl; ytendfi++){ ytendpointfour[ytendfi].style.color = nightmodetxt; }
						var ytformatstring = document.querySelectorAll("yt-formatted-string");
						var ytformi;
						var ytforml = ytformatstring.length;
						for(ytformi = 0; ytformi < ytforml; ytformi++){ ytformatstring[ytformi].style.color = nightmodetxt; }
						// update YouTube 27 December 2017
						var ytpagemanager = document.querySelectorAll("ytd-page-manager");
						var ytpai;
						var ytpal = ytpagemanager.length;
						for(ytpai = 0; ytpai < ytpal; ytpai++){ ytpagemanager[ytpai].style.color = nightmodetxt; ytpagemanager[ytpai].style.backgroundColor = nightmodebck; }
						var ytwatch = document.querySelectorAll("ytd-watch");
						var ytwi;
						var ytwl = ytwatch.length;
						for(ytwi = 0; ytwi < ytwl; ytwi++){ ytwatch[ytwi].style.color = nightmodetxt; ytwatch[ytwi].style.backgroundColor = nightmodebck; }
						var ytdtopbarlogorenderer = document.querySelectorAll("ytd-topbar-logo-renderer");
						var ytdtoi;
						var ytdtol = ytdtopbarlogorenderer.length;
						for(ytdtoi = 0; ytdtoi < ytdtol; ytdtoi++){ ytdtopbarlogorenderer[ytdtoi].style.cssText = "-webkit-filter: invert(1) grayscale(1);"; }
						if($("guide-button")){ $("guide-button").style.cssText = "-webkit-filter: invert(1) grayscale(1);"; }
						if($("buttons")){ $("buttons").style.cssText = "-webkit-filter: invert(1) grayscale(1);"; }
						if($("guide-content")){ $("guide-content").style.color = nightmodetxt; $("guide-content").style.backgroundColor = nightmodebck; }
						var ytdguidenentry = document.querySelectorAll(".ytd-guide-entry-renderer");
						var ytdguidei;
						var ytdguidel = ytdguidenentry.length;
						for(ytdguidei = 0; ytdguidei < ytdguidel; ytdguidei++){ ytdguidenentry[ytdguidei].style.color = nightmodetxt; ytdguidenentry[ytdguidei].style.backgroundColor = nightmodebck; }
						var ytdguidenentryc = document.querySelectorAll(".ytd-toggle-button-renderer");
						var ytguideni;
						var ytguidenl = ytdguidenentryc.length;
						for(ytguideni = 0; ytguideni < ytguidenl; ytguideni++){ ytdguidenentryc[ytguideni].style.color = nightmodetxt; }
						var ytdbuttonrenderer = document.querySelectorAll("yt-icon");
						var ytdbuti;
						var ytdbutl = ytdbuttonrenderer.length;
						for(ytdbuti = 0; ytdbuti < ytdbutl; ytdbuti++){ ytdbuttonrenderer[ytdbuti].style.cssText = "-webkit-filter: invert(1) grayscale(1) contrast(0);"; }
						var paperbutton = document.querySelectorAll("paper-button");
						var papi;
						var papl = paperbutton.length;
						for(papi = 0; papi < papl; papi++){ paperbutton[papi].style.color = nightmodetxt; }
						var ytsimple = document.querySelectorAll(".yt-simple-endpoint style-scope ytd-guide-entry-renderer a");
						var ytsimi;
						var ytsiml = ytsimple.length;
						for(ytsimi = 0; ytsimi < ytsiml; ytsimi++){ ytsimple[ytsimi].style.color = nightmodetxt; }
						var ytcompact = document.querySelectorAll(".ytd-compact-autoplay-renderer");
						var ytcoi;
						var ytcol = ytcompact.length;
						for(ytcoi = 0; ytcoi < ytcol; ytcoi++){ ytcompact[ytcoi].style.color = nightmodetxt; }
						var ytgridvideorenderera = document.querySelectorAll(".style-scope ytd-grid-video-renderer a");
						var ytgridi;
						var ytgridl = ytgridvideorenderera.length;
						for(ytgridi = 0; ytgridi < ytgridl; ytgridi++){ ytgridvideorenderera[ytgridi].style.color = nightmodetxt; }
						var ytgridvideorendererspan = document.querySelectorAll(".style-scope ytd-grid-video-renderer span");
						var ytgrivi;
						var ytgrivl = ytgridvideorendererspan.length;
						for(ytgrivi = 0; ytgrivi < ytgrivl; ytgrivi++){ ytgridvideorendererspan[ytgrivi].style.color = nightmodetxt; }
						var ytshelfspan = document.querySelectorAll(".style-scope ytd-shelf-renderer span");
						var ytsheli;
						var ytshell = ytshelfspan.length;
						for(ytsheli = 0; ytsheli < ytshell; ytsheli++){ ytshelfspan[ytsheli].style.color = nightmodetxt; }
						// update YouTube 8 March 2018
						var ytdbrowse = document.querySelectorAll("ytd-browse");
						var ytdbri;
						var ytdbrl = ytdbrowse.length;
						for(ytdbri = 0; ytdbri < ytdbrl; ytdbri++){ ytdbrowse[ytdbri].style.color = nightmodetxt; ytdbrowse[ytdbri].style.backgroundColor = nightmodebck; }
						if($("channel-container")){ $("channel-container").style.color = nightmodetxt; $("channel-container").style.backgroundColor = nightmodebck; }
						if($("channel-header")){ $("channel-header").style.color = nightmodetxt; $("channel-header").style.backgroundColor = nightmodebck; }
						if($("channel-title")){ $("channel-title").style.color = nightmodetxt; }
						if($("tabs-inner-container")){ $("tabs-inner-container").style.color = nightmodetxt; $("tabs-inner-container").style.backgroundColor = nightmodebck; }
						var tabsinnerpapertabs = document.querySelectorAll("#tabs-inner-container paper-tabs");
						var tabsini;
						var tabsinl = tabsinnerpapertabs.length;
						for(tabsini = 0; tabsini < tabsinl; tabsini++){ tabsinnerpapertabs[tabsini].style.color = nightmodetxt; }
						var ytdsearchboxcont = document.querySelectorAll("ytd-searchbox #container");
						var ytseai;
						var ytseal = ytdsearchboxcont.length;
						for(ytseai = 0; ytseai < ytseal; ytseai++){ ytdsearchboxcont[ytseai].style.color = nightmodetxt; ytdsearchboxcont[ytseai].style.backgroundColor = nightmodebck; }
						var h3ytdcompact = document.querySelectorAll("h3.ytd-compact-radio-renderer");
						var h3ytdi;
						var h3ytdl = h3ytdcompact.length;
						for(h3ytdi = 0; h3ytdi < h3ytdl; h3ytdi++){ h3ytdcompact[h3ytdi].style.color = nightmodetxt; }
						// 27 June 2018
						var ytdbrowsea = document.querySelectorAll(".ytd-watch-flexy");
						var ytbrowi;
						var ytbrowl = ytdbrowse.length;
						for(ytbrowi = 0; ytbrowi < ytbrowl; ytbrowi++){ ytdbrowsea[ytbrowi].style.color = nightmodetxt; ytdbrowsea[ytbrowi].style.backgroundColor = nightmodebck; }
						// 14 December 2018
						var papertabselected = document.querySelectorAll(".iron-selected");
						var patabi;
						var patabl = papertabselected.length;
						for(patabi = 0; patabi < patabl; patabi++){ papertabselected[patabi].style.color = nightmodetxt; }
						var searchboxtext = document.querySelectorAll(".ytd-searchbox");
						var seari;
						var searl = searchboxtext.length;
						for(seari = 0; seari < searl; seari++){ searchboxtext[seari].style.color = nightmodetxt; }
						var titleytmini = document.querySelectorAll(".title.ytd-mini-channel-renderer");
						var titleai;
						var titleal = titleytmini.length;
						for(titleai = 0; titleai < titleal; titleai++){ titleytmini[titleai].style.color = nightmodetxt; }
						var ytverticalsection = document.querySelectorAll(".ytd-vertical-channel-section-renderer");
						var ytverti;
						var ytvertl = ytverticalsection.length;
						for(ytverti = 0; ytverti < ytvertl; ytverti++){ ytverticalsection[ytverti].style.color = nightmodetxt; }
						var ytformattedstring = document.querySelectorAll(".yt-formatted-string");
						var ytfromi;
						var ytfroml = ytformattedstring.length;
						for(ytfromi = 0; ytfromi < ytfroml; ytfromi++){ ytformattedstring[ytfromi].style.color = nightmodetxt; }
						var ytdrichgridvideorenderer = document.querySelectorAll(".ytd-rich-grid-video-renderer");
						var ytrichrendi;
						var ytrichrendl = ytdrichgridvideorenderer.length;
						for(ytrichrendi = 0; ytrichrendi < ytrichrendl; ytrichrendi++){ ytdrichgridvideorenderer[ytrichrendi].style.color = nightmodetxt; }
						var ytdrichgridrenderer = document.querySelectorAll(".ytd-rich-grid-renderer");
						var ytdgri;
						var ytdgrl = ytdrichgridrenderer.length;
						for(ytdgri = 0; ytdgri < ytdgrl; ytdgri++){ ytdrichgridrenderer[ytdgri].style.color = nightmodetxt; }
						var ytdrichshelfrenderer = document.querySelectorAll(".ytd-rich-shelf-renderer");
						var ytselfri;
						var ytselfrl = ytdrichshelfrenderer.length;
						for(ytselfri = 0; ytselfri < ytselfrl; ytselfri++){ ytdrichshelfrenderer[ytselfri].style.color = nightmodetxt; }
						var ytdrichitemrenderer = document.querySelectorAll(".ytd-rich-item-renderer");
						var ytremi;
						var ytreml = ytdrichitemrenderer.length;
						for(ytremi = 0; ytremi < ytreml; ytremi++){ ytdrichitemrenderer[ytremi].style.backgroundColor = nightmodebck; }
						var ytdvideorenderer = document.querySelectorAll(".ytd-video-renderer");
						var ytdreni;
						var ytdrenl = ytdvideorenderer.length;
						for(ytdreni = 0; ytdreni < ytdrenl; ytdreni++){ ytdvideorenderer[ytdreni].style.color = nightmodetxt; }
						var ytdminiguiderenderer = document.querySelectorAll("ytd-mini-guide-renderer");
						var ytmiguidi;
						var ytmiguidl = ytdminiguiderenderer.length;
						for(ytmiguidi = 0; ytmiguidi < ytmiguidl; ytmiguidi++){ ytdminiguiderenderer[ytmiguidi].style.backgroundColor = nightmodebck; }
						var ytdminiguideentryrenderera = document.querySelectorAll("ytd-mini-guide-entry-renderer");
						var ytmiguidai;
						var ytmiguidal = ytdminiguideentryrenderera.length;
						for(ytmiguidai = 0; ytmiguidai < ytmiguidal; ytmiguidai++){ ytdminiguideentryrenderera[ytmiguidai].style.backgroundColor = nightmodebck; }
						var ytchipcloudrenderera = document.querySelectorAll("yt-chip-cloud-renderer");
						var ytchipi;
						var ytchipl = ytchipcloudrenderera.length;
						for(ytchipi = 0; ytchipi < ytchipl; ytchipi++){ ytchipcloudrenderera[ytchipi].style.backgroundColor = nightmodebck; }
						var yttvfilmrenderera = document.querySelectorAll("ytd-tvfilm-offer-module-renderer");
						var yttvfilmi;
						var yttvfilml = yttvfilmrenderera.length;
						for(yttvfilmi = 0; yttvfilmi < yttvfilml; yttvfilmi++){ yttvfilmrenderera[yttvfilmi].style.backgroundColor = nightmodebck; }
						var ytheadtvfilmrenderera = document.querySelectorAll("#header.ytd-tvfilm-offer-module-renderer");
						var ytheadtvfilmi;
						var ytheadtvfilml = ytheadtvfilmrenderera.length;
						for(ytheadtvfilmi = 0; ytheadtvfilmi < ytheadtvfilml; ytheadtvfilmi++){ ytheadtvfilmrenderera[ytheadtvfilmi].style.backgroundColor = nightmodebck; }
						var ytleftchipclouda = document.querySelectorAll("#left-arrow-button.yt-chip-cloud-renderer");
						var ytleftchipcloudi;
						var ytleftchipcloudl = ytleftchipclouda.length;
						for(ytleftchipcloudi = 0; ytleftchipcloudi < ytleftchipcloudl; ytleftchipcloudi++){ ytleftchipclouda[ytleftchipcloudi].style.backgroundColor = nightmodebck; }
						var ytrightchipclouda = document.querySelectorAll("#right-arrow-button.yt-chip-cloud-renderer");
						var ytrightchipcloudi;
						var ytrightchipcloudl = ytrightchipclouda.length;
						for(ytrightchipcloudi = 0; ytrightchipcloudi < ytrightchipcloudl; ytrightchipcloudi++){ ytrightchipclouda[ytrightchipcloudi].style.backgroundColor = nightmodebck; }
					}
				//-----
				}else{
					// End mutation observer
					nightobserver.disconnect();

					sun = true;
					if($("stefanvdnightin")){
						$("stefanvdnightin").setAttribute("id", "stefanvdnighti"); // change night background button
					}
					if($("stefanvdnightthemecheckbox")){ $("stefanvdnightthemecheckbox").checked = false; }

					if(window.location.href.match(/((http:\/\/(.*youtube\.com\/.*))|(https:\/\/(.*youtube\.com\/.*)))/i)){
						document.body.style.backgroundImage = oldbackgroundImage;
						document.body.style.backgroundColor = oldbackgroundColor;
						document.body.style.backgroundColor = oldbackground;
						document.body.style.color = oldtextcolor;
						document.querySelector("html").style.backgroundColor = oldbackgroundColorhtml;
					}else{
						// search all elements and remove night class
						var elemsnight = document.querySelectorAll(".stefanvdnight");
						[].forEach.call(elemsnight, function(el){
							el.classList.remove("stefanvdnight");
						});

						var elemsbcka = document.querySelectorAll(".stefanvdnightbck");
						[].forEach.call(elemsbcka, function(el){
							el.classList.remove("stefanvdnightbck");
						});

						var elemsbttn = document.querySelectorAll(".stefanvdnightbutton");
						[].forEach.call(elemsbttn, function(el){
							el.classList.remove("stefanvdnightbutton");
						});

						var elemsbrdr = document.querySelectorAll(".stefanvdnightborder");
						[].forEach.call(elemsbrdr, function(el){
							el.classList.remove("stefanvdnightborder");
						});

						var elemsbxshw = document.querySelectorAll(".stefanvdnightboxshadow");
						[].forEach.call(elemsbxshw, function(el){
							el.classList.remove("stefanvdnightboxshadow");
						});

						var elemstxshw = document.querySelectorAll(".stefanvdnighttextshadow");
						[].forEach.call(elemstxshw, function(el){
							el.classList.remove("stefanvdnighttextshadow");
						});

						var elemspseubefore = document.querySelectorAll(".stefanvdnightpseudobefore");
						[].forEach.call(elemspseubefore, function(el){
							el.classList.remove("stefanvdnightpseudobefore");
						});

						var elemspseuafter = document.querySelectorAll(".stefanvdnightpseudoafter");
						[].forEach.call(elemspseuafter, function(el){
							el.classList.remove("stefanvdnightpseudoafter");
						});

						var elemsngimage = document.querySelectorAll(".stefanvdnightimage");
						[].forEach.call(elemsngimage, function(el){
							el.classList.remove("stefanvdnightimage");
						});
					}

					// remove the extern Night Mode is activated
					if($("totldark")){
						var elem = $("totldark");
						elem.parentNode.removeChild(elem);
					}

					//---

					if(window.location.href.match(/((http:\/\/(.*youtube\.com\/.*))|(https:\/\/(.*youtube\.com\/.*)))/i)){
						if($("logo-container")){ $("logo-container").style.cssText = ""; }
						if($("watch7-action-buttons")){ $("watch7-action-buttons").style.cssText = ""; }
						if($("watch7-content")){ $("watch7-content").style.background = "#fff"; } // #fff
						if($("yt-masthead-container")){ $("yt-masthead-container").style.background = "white"; } // #f1f1f1
						if($("watch7-sidebar")){ $("watch7-sidebar").style.background = "#fff"; } // #fff
						if($("watch7-headline")){ $("watch7-headline").style.background = "#fff"; } // #fff
						if($("watch7-user-header")){ $("watch7-user-header").style.background = "#fff"; } // #fff
						if($("footer-container")){ $("footer-container").style.background = "#f2f2f2"; } // #f2f2f2
						if($("c4-shelves-container")){ $("c4-shelves-container").style.background = "#fff"; } // #fff
						if($("watch7-creator-bar")){ $("watch7-creator-bar").style.background = "#fff"; } // #fff
						if($("masthead-search-terms")){ $("masthead-search-terms").style.background = "#fff"; } // #fff
						if($("non-appbar-vm-video-actions-bar")){ $("non-appbar-vm-video-actions-bar").style.background = "#fff"; } // #fff
						if($("watch7-action-panel-footer")){ $("watch7-action-panel-footer").style.background = "#fff"; } // #fff
						var ytbranddiva = document.querySelectorAll("div.branded-page-v2-primary-col");
						var ytbandi;
						var ytbandl = ytbranddiva.length;
						for(ytbandi = 0; ytbandi < ytbandl; ytbandi++){ ytbranddiva[ytbandi].style.background = "#fff"; } // #fff
						var ytheaddiva = document.querySelectorAll("div.secondary-header-contents");
						var ythadi;
						var ythadl = ytheaddiva.length;
						for(ythadi = 0; ythadi < ythadl; ythadi++){ ytheaddiva[ythadi].style.background = "#fff"; } // #fff
						var ytmastersearchtermdiva = document.querySelectorAll("div.masthead-search-terms-border");
						var ytmastai;
						var ytmastal = ytmastersearchtermdiva.length;
						for(ytmastai = 0; ytmastai < ytmastal; ytmastai++){ ytmastersearchtermdiva[ytmastai].style.border = "1px solid #b9b9b9"; } // #b9b9b9
						var ytuixbuttondiva = document.querySelectorAll("button.yt-uix-button-default");
						var ytdivai;
						var ytdival = ytuixbuttondiva.length;
						for(ytdivai = 0; ytdivai < ytdival; ytdivai++){ ytuixbuttondiva[ytdivai].style.background = "#f8f8f8"; ytuixbuttondiva[ytdivai].style.color = "#333"; ytuixbuttondiva[ytdivai].style.borderColor = "#d3d3d3"; }
						var ytuixadiva = document.querySelectorAll("a.yt-uix-button-default");
						var ytuixi;
						var ytuixl = ytuixadiva.length;
						for(ytuixi = 0; ytuixi < ytuixl; ytuixi++){ ytuixadiva[ytuixi].style.background = "#f8f8f8"; ytuixadiva[ytuixi].style.color = "#333"; ytuixadiva[ytuixi].style.borderColor = "#d3d3d3"; }
						var ytuploadlidiva = document.querySelectorAll("li.vm-video-item");
						var ytploadi;
						var ytploadl = ytuploadlidiva.length;
						for(ytploadi = 0; ytploadi < ytploadl; ytploadi++){ ytuploadlidiva[ytploadi].style.background = "#fff"; }
						var ytuploadmetrixdiva = document.querySelectorAll("div.vm-video-metrics");
						var ytmedpli;
						var ytmedpll = ytuploadmetrixdiva.length;
						for(ytmedpli = 0; ytmedpli < ytmedpll; ytmedpli++){ ytuploadmetrixdiva[ytmedpli].style.backgroundImage = "linear-gradient(to right,#f9f9f9 0,#FFF 11px)"; }
						var ytmetadatadivb = document.querySelectorAll("button.metadata-inline");
						var ytmtbi;
						var ytmtbl = ytmetadatadivb.length;
						for(ytmtbi = 0; ytmtbi < ytmtbl; ytmtbi++){ ytmetadatadivb[ytmtbi].style.background = "#fff"; }
						if($("watch7-container")){ $("watch7-container").style.background = "#fff"; } // #fff
						if($("masthead-appbar")){ $("masthead-appbar").style.background = "#fff"; } // #fff
						if($("gh-activityfeed")){ $("gh-activityfeed").style.background = "#fff"; } // #fff
						if($("appbar-guide-menu")){ $("appbar-guide-menu").style.background = "#fff"; } // #fff
						if($("gh-overviewtab")){ $("gh-overviewtab").style.background = "#fff"; } // #fff
						if($("c4-primary-header-contents")){ $("c4-primary-header-contents").style.background = "#fff"; } // #fff
						if($("channel-subheader")){ $("channel-subheader").style.background = "#fff"; } // #fff
						if($("eow-title")){ $("eow-title").style.color = "black"; }
						var ytcardc = document.querySelectorAll(".yt-card");
						var ytrdci;
						var ytrdcl = ytcardc.length;
						for(ytrdci = 0; ytrdci < ytrdcl; ytrdci++){ ytcardc[ytrdci].style.background = "#fff"; ytcardc[ytrdci].style.color = "black"; }
						// update 11 may 2014
						var ytguideitemc = document.querySelectorAll("a.guide-item");
						var ytguici;
						var ytguicl = ytguideitemc.length;
						for(ytguici = 0; ytguici < ytguicl; ytguici++){ ytguideitemc[ytguici].style.color = "#222"; }
						var ytuiellipsisc = document.querySelectorAll("a.yt-ui-ellipsis");
						var ytuillipi;
						var ytuillipl = ytuiellipsisc.length;
						for(ytuillipi = 0; ytuillipi < ytuillipl; ytuillipi++){ ytuiellipsisc[ytuillipi].style.background = "white"; }
						var ytnbcc = document.querySelectorAll("div.nbc");
						var ytnbcci;
						var ytnbccl = ytnbcc.length;
						for(ytnbcci = 0; ytnbcci < ytnbccl; ytnbcci++){ ytnbcc[ytnbcci].style.backgroundColor = "white"; }
						if($("watch-description-clip")){ $("watch-description-clip").style.color = "#333"; }
						if($("masthead-expanded-container")){ $("masthead-expanded-container").style.background = "white"; }
						// update 12 june 2014
						var ytselectedguideitemc = document.querySelectorAll("a.guide-item-selected");
						var ytselcguici;
						var ytselcguicl = ytselectedguideitemc.length;
						for(ytselcguici = 0; ytselcguici < ytselcguicl; ytselcguici++){ ytselectedguideitemc[ytselcguici].style.color = "white"; }
						if($("masthead-search-term")){ $("masthead-search-term").style.color = "black"; }
						var ytuiellipsisdve = document.querySelectorAll("div.yt-ui-ellipsis");
						var ysisi;
						var ysisl = ytuiellipsisdve.length;
						for(ysisi = 0; ysisi < ysisl; ysisi++){ ytuiellipsisdve[ysisi].style.background = "white"; }
						var ytgssbmtablee = document.querySelectorAll("table.gssb_m");
						var ytsmsi;
						var ytsmsl = ytgssbmtablee.length;
						for(ytsmsi = 0; ytsmsi < ytsmsl; ytsmsi++){ ytgssbmtablee[ytsmsi].style.background = "white"; ytgssbmtablee[ytsmsi].style.color = "black"; }
						var ytdivytuixexpanderr = document.querySelectorAll("div.yt-uix-expander-ellipsis");
						var ytpanredi;
						var ytpanredl = ytdivytuixexpanderr.length;
						for(ytpanredi = 0; ytpanredi < ytpanredl; ytpanredi++){ ytdivytuixexpanderr[ytpanredi].style.background = "white"; }
						// update 3 april 2015
						var ytdivallcommentse = document.querySelectorAll("div.all-comments");
						var ytalwi;
						var ytalwl = ytdivallcommentse.length;
						for(ytalwi = 0; ytalwi < ytalwl; ytalwi++){ ytdivallcommentse[ytalwi].style.background = "white"; }
						var ytbtnuixdivv = document.querySelectorAll("button.yt-uix-button");
						var ytnuxi;
						var ytnuxl = ytbtnuixdivv.length;
						for(ytnuxi = 0; ytnuxi < ytnuxl; ytnuxi++){ ytbtnuixdivv[ytnuxi].style.background = "white"; ytbtnuixdivv[ytnuxi].style.color = "#777"; }
						// update 16 april 2015
						var ytdivcommentss = document.querySelectorAll("div.comments");
						var ytcomsi;
						var ytcomsl = ytdivcommentss.length;
						for(ytcomsi = 0; ytcomsi < ytcomsl; ytcomsi++){ ytdivcommentss[ytcomsi].style.color = "black"; }
						// update new YouTube layout 19 december 2016
						var ytytdappp = document.querySelectorAll("ytd-app");
						var ytyti;
						var ytytl = ytytdappp.length;
						for(ytyti = 0; ytyti < ytytl; ytyti++){ ytytdappp[ytyti].style.background = "white"; }
						// var ytdotytdapp = document.querySelectorAll(".ytd-app");
						// var i;
						// var l = ytdotytdapp.length;
						// for(i = 0; i < l; i++){ytdotytdapp[i].style.background = "white";}
						var ytironiconv = document.querySelectorAll("iron-icon");
						var ytconvi;
						var ytconvl = ytironiconv.length;
						for(ytconvi = 0; ytconvi < ytconvl; ytconvi++){ ytironiconv[ytconvi].style.cssText = ""; }
						if($("masthead")){ $("masthead").style.background = "white"; }
						if($("contents")){ $("contents").style.color = ""; }
						var yth3ytdd = document.querySelectorAll("h3.ytd-compact-video-renderer");
						var th3si;
						var th3sl = yth3ytdd.length;
						for(th3si = 0; th3si < th3sl; th3si++){ yth3ytdd[th3si].style.color = "black"; }
						var ytbylinee = document.querySelectorAll("#byline.ytd-video-meta-block");
						var ytlini;
						var ytlinl = ytbylinee.length;
						for(ytlini = 0; ytlini < ytlinl; ytlini++){ ytbylinee[ytlini].style.color = "black"; }
						var ytmetadataa = document.querySelectorAll("#metadata-line.ytd-video-meta-block");
						var ytetasi;
						var ytetasl = ytmetadataa.length;
						for(ytetasi = 0; ytetasi < ytetasl; ytetasi++){ ytmetadataa[ytetasi].style.color = "hsla(0, 0%, 6.7%, .6)"; }
						var ytironiconb = document.querySelectorAll(".iron-icon-0");
						var ytroni;
						var ytronl = ytironiconb.length;
						for(ytroni = 0; ytroni < ytronl; ytroni++){ ytironiconb[ytroni].style.color = "hsla(0, 0%, 6.7%, .4)"; }
						var ytverifiedboxx = document.querySelectorAll("#guide-icon.ytd-topbar-logo-renderer");
						var ytverfixi;
						var ytverfixl = ytverifiedboxx.length;
						for(ytverfixi = 0; ytverfixi < ytverfixl; ytverfixi++){ ytverifiedboxx[ytverfixi].style.fill = "hsla(0, 0%, 6.7%, .4)"; }
						var yttitlevideow = document.querySelectorAll(".ytd-video-primary-info-renderer");
						var ytviewbi;
						var ytviewbl = yttitlevideow.length;
						for(ytviewbi = 0; ytviewbi < ytviewbl; ytviewbi++){ yttitlevideow[ytviewbi].style.color = "black"; }
						var ytforvieww = document.querySelectorAll(".yt-view-count-renderer");
						var ytinfovi;
						var ytinfovl = ytforvieww.length;
						for(ytinfovi = 0; ytinfovi < ytinfovl; ytinfovi++){ ytforvieww[ytinfovi].style.color = "hsla(0, 0%, 6.7%, .6)"; }
						var ytsecondinfob = document.querySelectorAll(".ytd-video-secondary-info-renderer");
						var ytseondi;
						var ytseondl = ytsecondinfob.length;
						for(ytseondi = 0; ytseondi < ytseondl; ytseondi++){ ytsecondinfob[ytseondi].style.color = ""; }
						var ytcommentsheadq = document.querySelectorAll(".ytd-comments-header-renderer");
						var ytsqi;
						var ytsql = ytcommentsheadq.length;
						for(ytsqi = 0; ytsqi < ytsql; ytsqi++){ ytcommentsheadq[ytsqi].style.color = "hsl(0, 0%, 6.7%)"; }
						var ytcommentsimpleboxq = document.querySelectorAll(".ytd-comment-simplebox-renderer");
						var ytboxi;
						var ytboxl = ytcommentsimpleboxq.length;
						for(ytboxi = 0; ytboxi < ytboxl; ytboxi++){ ytcommentsimpleboxq[ytboxi].style.color = "hsla(0, 0%, 6.7%, .6)"; }
						var ytcommentrenderq = document.querySelectorAll(".ytd-comment-renderer");
						var ytrenqi;
						var ytrenql = ytcommentrenderq.length;
						for(ytrenqi = 0; ytrenqi < ytrenql; ytrenqi++){ ytcommentrenderq[ytrenqi].style.color = "hsl(0, 0%, 6.7%)"; }
						var ytcommentactionb = document.querySelectorAll(".ytd-comment-action-buttons-renderer");
						var ytmmeni;
						var ytmmenl = ytcommentactionb.length;
						for(ytmmeni = 0; ytmmeni < ytmmenl; ytmmeni++){ ytcommentactionb[ytmmeni].style.color = "hsl(0, 0%, 6.7%)"; }
						var ytsigninpromob = document.querySelectorAll(".ytd-guide-signin-promo-renderer");
						var ytsini;
						var ytsinl = ytsigninpromob.length;
						for(ytsini = 0; ytsini < ytsinl; ytsini++){ ytsigninpromob[ytsini].style.color = "hsl(0, 0%, 6.7%)"; }
						var ytguidesectionrendererm = document.querySelectorAll(".ytd-guide-section-renderer");
						var ytsecmi;
						var ytsecml = ytguidesectionrendererm.length;
						for(ytsecmi = 0; ytsecmi < ytsecml; ytsecmi++){ ytguidesectionrendererm[ytsecmi].style.color = "hsla(0, 0%, 6.7%, .6)"; }
						var ytguideentryhoverb = document.querySelectorAll(".ytd-guide-entry-renderer:hover");
						var ythovi;
						var ythovl = ytguideentryhoverb.length;
						for(ythovi = 0; ythovi < ythovl; ythovi++){ ytguideentryhoverb[ythovi].style.backgroundColor = "hsl(0, 0%, 93.3%)"; }
						var ytgridrendererx = document.querySelectorAll(".ytd-grid-renderer");
						var grixi;
						var grixl = ytgridrendererx.length;
						for(grixi = 0; grixi < grixl; grixi++){ ytgridrendererx[grixi].style.color = "hsla(0, 0%, 6.7%, .6)"; }
						var ytaccountsettingsc = document.querySelectorAll(".ytd-account-settings-0");
						var ytacouni;
						var ytacounl = ytaccountsettingsc.length;
						for(ytacouni = 0; ytacouni < ytacounl; ytacouni++){ ytaccountsettingsc[ytacouni].style.backgroundColor = "hsl(0, 0%, 100%)"; }
						var ytmultipagerendererp = document.querySelectorAll(".ytd-multi-page-menu-renderer-0");
						var ytultiei;
						var ytultiel = ytmultipagerendererp.length;
						for(ytultiei = 0; ytultiei < ytultiel; ytultiei++){ ytmultipagerendererp[ytultiei].style.backgroundColor = "hsl(0, 0%, 100%)"; }
						var ytheadchannelnamec = document.querySelectorAll(".yt-endpoint-1");
						var ythedi;
						var ythedl = ytheadchannelnamec.length;
						for(ythedi = 0; ythedi < ythedl; ythedi++){ ytheadchannelnamec[ythedi].style.color = ""; }
						var ytendpointh = document.querySelectorAll(".yt-endpoint-3");
						var ytendpointhi;
						var ytendpointhl = ytendpointh.length;
						for(ytendpointhi = 0; ytendpointhi < ytendpointhl; ytendpointhi++){ ytendpointh[ytendpointhi].style.color = ""; }
						var ytendpointfourd = document.querySelectorAll(".yt-endpoint-4");
						var ytenddi;
						var ytenddl = ytendpointfourd.length;
						for(ytenddi = 0; ytenddi < ytenddl; ytenddi++){ ytendpointfourd[ytenddi].style.color = ""; }
						var ytformatstringm = document.querySelectorAll("yt-formatted-string");
						var ytmi;
						var ytml = ytformatstringm.length;
						for(ytmi = 0; ytmi < ytml; ytmi++){ ytformatstringm[ytmi].style.color = ""; }
						// update YouTube 3 August 2017
						var ytpagemanagera = document.querySelectorAll("ytd-page-manager");
						var ytpagemi;
						var ytpageml = ytpagemanagera.length;
						for(ytpagemi = 0; ytpagemi < ytpageml; ytpagemi++){ ytpagemanagera[ytpagemi].style.color = "black"; ytpagemanagera[ytpagemi].style.backgroundColor = "white"; }
						var ytwatcha = document.querySelectorAll("ytd-watch");
						var ytwai;
						var ytwal = ytwatcha.length;
						for(ytwai = 0; ytwai < ytwal; ytwai++){ ytwatcha[ytwai].style.color = "black"; ytwatcha[ytwai].style.backgroundColor = "white"; }
						var ytdtopbarlogorendererd = document.querySelectorAll("ytd-topbar-logo-renderer");
						var ytdtopi;
						var ytdtopl = ytdtopbarlogorendererd.length;
						for(ytdtopi = 0; ytdtopi < ytdtopl; ytdtopi++){ ytdtopbarlogorendererd[ytdtopi].style.cssText = ""; }
						if($("guide-button")){ $("guide-button").style.cssText = ""; }
						if($("buttons")){ $("buttons").style.cssText = ""; }
						if($("guide-content")){ $("guide-content").style.color = "black"; $("guide-content").style.backgroundColor = "white"; }
						var ytdguidenentryh = document.querySelectorAll(".ytd-guide-entry-renderer");
						var ythui;
						var ythul = ytdguidenentryh.length;
						for(ythui = 0; ythui < ythul; ythui++){ ytdguidenentryh[ythui].style.color = "black"; ytdguidenentryh[ythui].style.backgroundColor = "white"; }
						var ytdguidenentryb = document.querySelectorAll(".ytd-toggle-button-renderer");
						var yguidei;
						var yguidel = ytdguidenentryb.length;
						for(yguidei = 0; yguidei < yguidel; yguidei++){ ytdguidenentryb[yguidei].style.color = ""; }
						var ytdbuttonrenderera = document.querySelectorAll("yt-icon");
						var ytbuttonsi;
						var ytbuttonsl = ytdbuttonrenderera.length;
						for(ytbuttonsi = 0; ytbuttonsi < ytbuttonsl; ytbuttonsi++){ ytdbuttonrenderera[ytbuttonsi].style.cssText = ""; }
						var paperbuttonc = document.querySelectorAll("paper-button");
						var papdi;
						var papdl = paperbuttonc.length;
						for(papdi = 0; papdi < papdl; papdi++){ paperbuttonc[papdi].style.color = ""; }
						var ytsimplea = document.querySelectorAll(".yt-simple-endpoint style-scope ytd-guide-entry-renderer a");
						var ytsimpai;
						var ytsimpal = ytsimplea.length;
						for(ytsimpai = 0; ytsimpai < ytsimpal; ytsimpai++){ ytsimplea[ytsimpai].style.color = ""; }
						var ytcompactd = document.querySelectorAll(".ytd-compact-autoplay-renderer");
						var ytpaci;
						var ytpacl = ytcompactd.length;
						for(ytpaci = 0; ytpaci < ytpacl; ytpaci++){ ytcompactd[ytpaci].style.color = ""; }
						var ytgridvideorendererac = document.querySelectorAll(".style-scope ytd-grid-video-renderer a");
						var ytuioi;
						var ytuiol = ytgridvideorendererac.length;
						for(ytuioi = 0; ytuioi < ytuiol; ytuioi++){ ytgridvideorendererac[ytuioi].style.color = ""; }
						var ytgridvideorendererspana = document.querySelectorAll(".style-scope ytd-grid-video-renderer span");
						var ytrgridi;
						var ytrgridl = ytgridvideorendererspana.length;
						for(ytrgridi = 0; ytrgridi < ytrgridl; ytrgridi++){ ytgridvideorendererspana[ytrgridi].style.color = ""; }
						var ytshelfspanc = document.querySelectorAll(".style-scope ytd-shelf-renderer span");
						var ytselsi;
						var ytselsl = ytshelfspanc.length;
						for(ytselsi = 0; ytselsi < ytselsl; ytselsi++){ ytshelfspanc[ytselsi].style.color = ""; }
						// update YouTube 8 March 2018
						var ytdbrowsed = document.querySelectorAll("ytd-browse");
						var ytbosi;
						var ytbosl = ytdbrowsed.length;
						for(ytbosi = 0; ytbosi < ytbosl; ytbosi++){ ytdbrowsed[ytbosi].style.color = ""; ytdbrowsed[ytbosi].style.backgroundColor = ""; }
						if($("channel-container")){ $("channel-container").style.color = ""; $("channel-container").style.backgroundColor = ""; }
						if($("channel-header")){ $("channel-header").style.color = ""; $("channel-header").style.backgroundColor = ""; }
						if($("channel-title")){ $("channel-title").style.color = ""; }
						if($("tabs-inner-container")){ $("tabs-inner-container").style.color = ""; $("tabs-inner-container").style.backgroundColor = ""; }
						var tabsinnerpapertabsa = document.querySelectorAll("#tabs-inner-container paper-tabs");
						var tabintabi;
						var tabintabl = tabsinnerpapertabsa.length;
						for(tabintabi = 0; tabintabi < tabintabl; tabintabi++){ tabsinnerpapertabsa[tabintabi].style.color = ""; }
						var ytdsearchboxconta = document.querySelectorAll("ytd-searchbox #container");
						var ytboxcoi;
						var ytboxcol = ytdsearchboxconta.length;
						for(ytboxcoi = 0; ytboxcoi < ytboxcol; ytboxcoi++){ ytdsearchboxconta[ytboxcoi].style.color = ""; ytdsearchboxconta[ytboxcoi].style.backgroundColor = ""; }
						var h3ytdcompacta = document.querySelectorAll("h3.ytd-compact-radio-renderer");
						var h3comi;
						var h3coml = h3ytdcompacta.length;
						for(h3comi = 0; h3comi < h3coml; h3comi++){ h3ytdcompacta[h3comi].style.color = ""; }
						// 27 June 2018
						var ytdbrowseb = document.querySelectorAll(".ytd-watch-flexy");
						var ytowi;
						var ytowl = ytdbrowseb.length;
						for(ytowi = 0; ytowi < ytowl; ytowi++){ ytdbrowseb[ytowi].style.color = nightmodetxt; ytdbrowseb[ytowi].style.backgroundColor = ""; }
						// 14 December 2018
						var papertabselecteda = document.querySelectorAll(".iron-selected");
						var pai;
						var pal = papertabselecteda.length;
						for(pai = 0; pai < pal; pai++){ papertabselecteda[pai].style.color = ""; }
						var searchboxtexta = document.querySelectorAll(".ytd-searchbox");
						var searchi;
						var searchl = searchboxtexta.length;
						for(searchi = 0; searchi < searchl; searchi++){ searchboxtexta[searchi].style.color = ""; }
						var titleytminia = document.querySelectorAll(".title.ytd-mini-channel-renderer");
						var yttii;
						var yttil = titleytminia.length;
						for(yttii = 0; yttii < yttil; yttii++){ titleytminia[yttii].style.color = ""; }
						var ytverticalsectiona = document.querySelectorAll(".ytd-vertical-channel-section-renderer");
						var ytvertai;
						var ytvertal = ytverticalsectiona.length;
						for(ytvertai = 0; ytvertai < ytvertal; ytvertai++){ ytverticalsectiona[ytvertai].style.color = ""; }
						var ytformattedstringc = document.querySelectorAll(".yt-formatted-string");
						var ytfotti;
						var ytfottl = ytformattedstringc.length;
						for(ytfotti = 0; ytfotti < ytfottl; ytfotti++){ ytformattedstringc[ytfotti].style.color = ""; }
						var ytdrichgridvideorendererh = document.querySelectorAll(".ytd-rich-grid-video-renderer");
						var ytrichrei;
						var ytrichrel = ytdrichgridvideorendererh.length;
						for(ytrichrei = 0; ytrichrei < ytrichrel; ytrichrei++){ ytdrichgridvideorendererh[ytrichrei].style.color = ""; }
						var ytdrichgridrendererg = document.querySelectorAll(".ytd-rich-grid-renderer");
						var ytrigri;
						var ytrigrl = ytdrichgridrendererg.length;
						for(ytrigri = 0; ytrigri < ytrigrl; ytrigri++){ ytdrichgridrendererg[ytrigri].style.color = ""; }
						var ytdrichshelfrendererf = document.querySelectorAll(".ytd-rich-shelf-renderer");
						var ytrichshi;
						var ytrichshl = ytdrichshelfrendererf.length;
						for(ytrichshi = 0; ytrichshi < ytrichshl; ytrichshi++){ ytdrichshelfrendererf[ytrichshi].style.color = ""; }
						var ytdrichitemrenderera = document.querySelectorAll(".ytd-rich-item-renderer");
						var ytrichi;
						var ytrichl = ytdrichitemrenderera.length;
						for(ytrichi = 0; ytrichi < ytrichl; ytrichi++){ ytdrichitemrenderera[ytrichi].style.backgroundColor = ""; }
						var ytdvideorendererd = document.querySelectorAll(".ytd-video-renderer");
						var ytviei;
						var ytviel = ytdvideorendererd.length;
						for(ytviei = 0; ytviei < ytviel; ytviei++){ ytdvideorendererd[ytviei].style.color = ""; }
						var ytdminiguiderendererc = document.querySelectorAll("ytd-mini-guide-renderer");
						var ytminiguidi;
						var ytminiguidl = ytdminiguiderendererc.length;
						for(ytminiguidi = 0; ytminiguidi < ytminiguidl; ytminiguidi++){ ytdminiguiderendererc[ytminiguidi].style.backgroundColor = ""; }
						var ytdminiguideentryrendererb = document.querySelectorAll("ytd-mini-guide-entry-renderer");
						var ytminiguideentryi;
						var ytminiguideentryl = ytdminiguideentryrendererb.length;
						for(ytminiguideentryi = 0; ytminiguideentryi < ytminiguideentryl; ytminiguideentryi++){ ytdminiguideentryrendererb[ytminiguideentryi].style.backgroundColor = ""; }
						var ytchipcloudrendererb = document.querySelectorAll("yt-chip-cloud-renderer");
						var ytchipbi;
						var ytchipbl = ytchipcloudrendererb.length;
						for(ytchipbi = 0; ytchipbi < ytchipbl; ytchipbi++){ ytchipcloudrendererb[ytchipbi].style.backgroundColor = ""; }
						var yttvfilmrendererb = document.querySelectorAll("ytd-tvfilm-offer-module-renderer");
						var yttvfilmbi;
						var yttvfilmbl = yttvfilmrendererb.length;
						for(yttvfilmbi = 0; yttvfilmbi < yttvfilmbl; yttvfilmbi++){ yttvfilmrendererb[yttvfilmbi].style.backgroundColor = ""; }
						var ytheadtvfilmrendererb = document.querySelectorAll("#header.ytd-tvfilm-offer-module-renderer");
						var ytheadtvfilmbi;
						var ytheadtvfilmbl = ytheadtvfilmrendererb.length;
						for(ytheadtvfilmbi = 0; ytheadtvfilmbi < ytheadtvfilmbl; ytheadtvfilmbi++){ ytheadtvfilmrendererb[ytheadtvfilmbi].style.backgroundColor = ""; }
						var ytleftchipcloudb = document.querySelectorAll("#left-arrow-button.yt-chip-cloud-renderer");
						var ytleftchipcloudbi;
						var ytleftchipcloudbl = ytleftchipcloudb.length;
						for(ytleftchipcloudbi = 0; ytleftchipcloudbi < ytleftchipcloudbl; ytleftchipcloudbi++){ ytleftchipcloudb[ytleftchipcloudbi].style.backgroundColor = ""; }
						var ytrightchipcloudb = document.querySelectorAll("#right-arrow-button.yt-chip-cloud-renderer");
						var ytrightchipcloudbi;
						var ytrightchipcloudbl = ytrightchipcloudb.length;
						for(ytrightchipcloudbi = 0; ytrightchipcloudbi < ytrightchipcloudbl; ytrightchipcloudbi++){ ytrightchipcloudb[ytrightchipcloudbi].style.backgroundColor = ""; }
					}
				}

				// do stuff
				fulfill(); // if the action succeeded
			// reject(error); //if the action did not succeed
			});
		}

		// convert pdf file in dark version
		function convertpdfnight(){
			if(isitdark == true){
				if(document.getElementById("stefanvdnightpdf")){
					document.getElementById("stefanvdnightpdf").style.display = "none";
				}
			}else{
			// if current web page is a PDF file
				if(window.location.href.indexOf(".pdf") != -1){
				// it is a PDF file
					if(document.getElementById("stefanvdnightpdf")){
						document.getElementById("stefanvdnightpdf").style.display = "block";
					}else{
						var pdfcover = document.createElement("div");
						let css = "position: fixed; pointer-events: none; top: 0; left: 0; width: 100vw; height: 100vh; background-color: " + nightmodebck + "; -webkit-filter: invert(1);filter: invert(1);mix-blend-mode: difference;";
						pdfcover.setAttribute("style", css);
						pdfcover.id = "stefanvdnightpdf";
						document.body.appendChild(pdfcover);
					}
				}
			}
		}

		// gogo night mode
		function gogonightmode(){
			// PDF detection
			convertpdfnight();
			//---

			var css = ".stefanvdnightbck{background:" + nightmodebck + "!important;background-color:" + nightmodebck + "!important;}.stefanvdnight::placeholder{color:" + nightmodetxt + "!important;}.stefanvdnight{color:" + nightmodetxt + "!important;}.stefanvdnight a{color:" + nightmodehyperlink + "!important}.stefanvdnight a *{color:" + nightmodehyperlink + "!important}.stefanvdnightbutton{background:" + nightmodebutton + "!important;background-color:" + nightmodebutton + "!important;color:" + nightmodetxt + "!important}.stefanvdnightborder{border-color:" + nightmodeborder + "!important}.stefanvdnightboxshadow{box-shadow: 0 0 0 1px " + nightmodeborder + "!important}.stefanvdnighttextshadow{text-shadow:inherit!important}.stefanvdnightpseudobefore:before,.stefanvdnightpseudoafter:after{background:transparent!important}.stefanvdnightimage{filter:brightness(" + nmimagedark + "%) grayscale(" + nmimagegray + "%)!important}";

			addcsstext("totlnightmodestyle", css);

			getdefaultnightmetatheme();
			//---
			webgonightmode().then(function(){
				// this function is executed after function
				if(sun == false){
					isitdark = true;
					setnightmetatheme(false);
					// Start mutation observer
					nightobserver.observe(targetNode, observerConfig);
				}else{
					isitdark = false;
					setnightmetatheme(true);
				}
			});
		}

		function hideclassswitch(){
			if($("stefanvdnighttheme")){
				if($("stefanvdnighttheme").classList.contains("stefanvdswitchhidden")){
					$("stefanvdnighttheme").classList.remove("stefanvdswitchhidden");
				}
			}
		}

		var timernightswitch;
		var mousemoveswitchhide = function(){
			window.clearTimeout(timernightswitch);
			hideclassswitch();
			timernightswitch = window.setTimeout(function(){
				if($("stefanvdnighttheme")){
					$("stefanvdnighttheme").classList.add("stefanvdswitchhidden");
				}
			}, nightmodeswitchhidetime * 1000);
		};

		// automatically hide the switch when video is in full screen (playing and pause status)
		function gohideswitchonplay(){
			if(nightcurrentvideoplaying == true){
				if($("stefanvdnighttheme")){ $("stefanvdnighttheme").classList.add("stefanvdswitchhidden"); }
			}
		}

		function goshowswitchonpause(){
			if(!nightmodeswitchhide){ // auto hide switch is not enabled
				hideclassswitch();
			}
		}

		var fullscreenswitch = function(){
			if(document.fullscreenElement){
			// fullscreen is activated
				gohideswitchonplay();
			}else{
			// fullscreen is cancelled
				goshowswitchonpause();
			}
		};

		var nightcurrentvideoplaying = false;
		var playnightfullscreen = function(){
			nightcurrentvideoplaying = true;
			if(document.fullscreenElement){ gohideswitchonplay(); }
		};
		var pausenightfullscreen = function(){
			nightcurrentvideoplaying = false;
			goshowswitchonpause();
		};

		function nightfunction(){
			if($("stefanvdnighttheme") == null){
				var newnight = document.createElement("label");
				newnight.setAttribute("id", "stefanvdnighttheme");
				document.body.appendChild(newnight);
				if(nighthover == true){
					newnight.style.opacity = ".2";
					var item = document.getElementById("stefanvdnighttheme");
					item.addEventListener("pointerover", function(){ item.style.opacity = "1"; }, false);
					item.addEventListener("pointerout", function(){ item.style.opacity = ".2"; }, false);
				}
				if(nmcustom == true){ newnight.style.left = "calc(" + nmcustomx + " + env(safe-area-inset-left))"; newnight.style.bottom = "calc(" + nmcustomy + " + env(safe-area-inset-bottom))"; }else if(nmtopleft == true){ newnight.style.left = "calc(15px + env(safe-area-inset-left))"; newnight.style.top = "calc(15px + env(safe-area-inset-top))"; }else if(nmtopright == true){ newnight.style.right = "calc(15px + env(safe-area-inset-right))"; newnight.style.top = "calc(15px + env(safe-area-inset-top))"; }else if(nmbottomright == true){ newnight.style.right = "calc(15px + env(safe-area-inset-right))"; newnight.style.bottom = "calc(15px + env(safe-area-inset-bottom))"; }else if(nmbottomleft == true){ newnight.style.left = "calc(15px + env(safe-area-inset-left))"; newnight.style.bottom = "calc(15px + env(safe-area-inset-bottom))"; }

				var newnightinput = document.createElement("input");
				newnightinput.setAttribute("type", "checkbox");
				newnightinput.setAttribute("id", "stefanvdnightthemecheckbox");
				if(nightenabletheme == true){
					if(nightmodeos == true){
						if(window.matchMedia && windark.matches){
							// dark mode
							newnightinput.setAttribute("checked", false);
						}
					}else{
						newnightinput.setAttribute("checked", true);
					}
				}
				newnight.appendChild(newnightinput);

				var newnightspan = document.createElement("span");
				newnightspan.setAttribute("id", "stefanvdnightthemeslider");
				newnight.appendChild(newnightspan);

				var newnightspansun = document.createElement("span");
				newnightspansun.setAttribute("class", "sun");
				newnightspan.appendChild(newnightspansun);
				var newnightspansunspan = document.createElement("span");
				newnightspansun.appendChild(newnightspansunspan);

				var newnightspannight = document.createElement("span");
				newnightspannight.setAttribute("class", "night");
				newnightspan.appendChild(newnightspannight);
				var newnightspannightspan = document.createElement("span");
				newnightspannight.appendChild(newnightspannightspan);

				var newnightspanblock = document.createElement("span");
				newnightspanblock.setAttribute("id", "sliderblock");
				newnightspan.appendChild(newnightspanblock);
				var newnightspanblockspan = document.createElement("span");
				newnightspanblockspan.setAttribute("id", "stefanvdnighti");
				newnightspanblockspan.setAttribute("class", "turnoffthelightsdrag");
				newnightspanblockspan.textContent = "≡";
				newnightspanblock.appendChild(newnightspanblockspan);

				$("stefanvdnighttheme").addEventListener("change", function(){ gogonightmode(); }, false);

				// automatically hide the switch
				if(nightmodeswitchhide == true){
					document.addEventListener("pointermove", mousemoveswitchhide);
				}

				var x = document.getElementsByTagName("video")[0];
				if(x){
					x.addEventListener("playing", playnightfullscreen);
					x.addEventListener("pause", pausenightfullscreen);
				}

				document.addEventListener("fullscreenchange", fullscreenswitch);
			}
		}

		function checknightswitchactivetime(){
			if(nightactivetime == true){
				var now = new Date(); var hours = now.getHours(); var minutes = now.getMinutes(); var gettime = hours + ":" + minutes;
				var gettimesecond = gettime.split(":")[0] * 3600 + gettime.split(":")[1] * 60;

				var seconds1 = returntimetoseconds(nmbegintime);
				var seconds2 = returntimetoseconds(nmendtime);

				// example
				// if begintime set 10:00 but endtime is 18:00
				// then do this
				if(seconds1 <= seconds2){ // default for user
					if((seconds1 <= gettimesecond) && (gettimesecond <= seconds2)){ return true; }
				}else if(seconds1 > seconds2){
					var getotherdaypart = 86400; // ... to 24:00 end
					var getothernightpart = 0; // start from 0:00 to seconds2 (example 11:00)

					if(((seconds1 <= gettimesecond) && (gettimesecond <= getotherdaypart)) || ((getothernightpart <= gettimesecond) && (gettimesecond <= seconds2))){ // 13 -> 24 OR 0 -> 11
						return true;
					}
				}
			}else{
				return true;
			}
			return false;
		}

		function checknightactiveclock(){
			if(nmautoclock == true){
				var now = new Date(); var hours = now.getHours(); var minutes = now.getMinutes(); var gettime = hours + ":" + minutes;
				var gettimesecond = gettime.split(":")[0] * 3600 + gettime.split(":")[1] * 60;

				var seconds1 = returntimetoseconds(nmautobegintime);
				var seconds2 = returntimetoseconds(nmautoendtime);

				// example
				// if begintime set 10:00 but endtime is 18:00
				// then do this
				if(seconds1 <= seconds2){ // default for user
					if((seconds1 <= gettimesecond) && (gettimesecond <= seconds2)){ return true; }
				}else if(seconds1 > seconds2){
					var getotherdaypart = 86400; // ... to 24:00 end
					var getothernightpart = 0; // start from 0:00 to seconds2 (example 11:00)

					if(((seconds1 <= gettimesecond) && (gettimesecond <= getotherdaypart)) || ((getothernightpart <= gettimesecond) && (gettimesecond <= seconds2))){ // 13 -> 24 OR 0 -> 11
						return true;
					}
				}
			}else{
				return true;
			}
			return false;
		}

		// tricker the switch
		function showswitchtricker(){
			if(checknightswitchactivetime() == true){
				nightfunction();
			}
		}

		function donightpack(){
			if(nighttheme == true){ showswitchtricker(); }
			if(nightenabletheme == true || nightmodeos == true){ timergonighttricker(); }
		}

		// show all options the night switch CSS
		// but not the "only" websites
		var currenturl;
		function runnightmodecheck(){
			if(nighttheme == true && nightonly != true){
				showswitchtricker();
			}

			if(nightonly == true){
				if(nightmodebydomain == true){
					// Only the domain
					currenturl = window.location.protocol + "//" + window.location.host;
				}else{
					// The full URL
					// WITH no end slash
					currenturl = window.location.href;
					if(currenturl.substr(-1) === "/"){
					// NO end slash
						currenturl = currenturl.substr(0, currenturl.length - 1);
					}
				}

				var nightrabbit = false;
				if(typeof nightDomains == "string"){
					nightDomains = JSON.parse(nightDomains);
					var nbuf = [], domain;
					for(domain in nightDomains)
						nbuf.push(domain);
					nbuf.sort();
					var i, l = nbuf.length;
					for(i = 0; i < l; i++){
						if(nightmodechecklistwhite == true){
							if(nbuf[i].includes("*")){
								// regex test
								if(checkregdomaininside(nbuf[i], currenturl) == true){
									donightpack();
								}
							}else{
								// regular text
								if(currenturl == nbuf[i]){
									donightpack();
								}
							}
						}else if(nightmodechecklistblack == true){
							if(nbuf[i].includes("*")){
								// regex test
								if(checkregdomaininside(nbuf[i], currenturl) == true){
									nightrabbit = true;
								}
							}else{
								// regular text
								if(currenturl == nbuf[i]){
									nightrabbit = true;
								}
							}
						}
					}
				}
				if(nightmodechecklistblack == true){
					if(nightrabbit == false){
						donightpack();
					}
				}
			}else{
				if(nightenabletheme == true || nightmodeos == true){
					timergonighttricker();
				} // auto the night mode
			}
		}
		runnightmodecheck();

		function osdarkmodecheck(e){
			const newColorScheme = e.matches ? "dark" : "light";
			if(newColorScheme == "dark"){
				sun = true; gogonightmode(); // make it dark
			}else if(newColorScheme == "light"){
				sun = false; gogonightmode(); // sun go up
			}
		}

		function timergonighttricker(){
			if(checknightactiveclock() == true){
				if(nightmodeos == true){
					if(window.matchMedia && windark.matches){
						// dark mode
						gogonightmode();
					}
					windark.addEventListener("change", osdarkmodecheck);
				}else{
					gogonightmode();
				}
			}
		}

		// draggable object for the Night Mode feature switch
		var dragobject = {z: 0, x: 0, y: 0, offsetx : null, offsety : null, targetobj : null, dragapproved : 0,
			initialize:function(){
				document.addEventListener("pointerdown", this.drag);
				document.addEventListener("pointerup", this.dragup);
			},
			dragup:function(){
				this.dragapproved = 0;
				// save the x and y value
				if(nmcustom == true){
					var left = window.getComputedStyle($("stefanvdnighttheme"), null).getPropertyValue("left");
					var bottom = window.getComputedStyle($("stefanvdnighttheme"), null).getPropertyValue("bottom");
					chrome.runtime.sendMessage({name: "nmcustomvalues", valuex: left, valuey: bottom});
				}
			},
			drag:function(e){
				var evtobj = window.event ? window.event : e;
				if(e.target.className == "turnoffthelightsdrag"){
					this.dragapproved = 1;
					var left = window.getComputedStyle($("stefanvdnighttheme"), null).getPropertyValue("left");
					var bottom = window.getComputedStyle($("stefanvdnighttheme"), null).getPropertyValue("bottom");
					$("stefanvdnighttheme").offsetx = parseInt(left);
					$("stefanvdnighttheme").offsety = parseInt(bottom);
					$("stefanvdnighttheme").x = evtobj.clientX; $("stefanvdnighttheme").y = evtobj.clientY;
					if(evtobj.preventDefault)evtobj.preventDefault();
					document.addEventListener("pointermove", dragobject.moveit);
				}
			},
			moveit:function(e){
				var evtobj = window.event ? window.event : e;
				if(this.dragapproved == 1){
					if(nmcustom == true || nmbottomleft == true){
						$("stefanvdnighttheme").style.left = $("stefanvdnighttheme").offsetx + evtobj.clientX - $("stefanvdnighttheme").x + "px";
						$("stefanvdnighttheme").style.bottom = $("stefanvdnighttheme").offsety - evtobj.clientY + $("stefanvdnighttheme").y + "px";
					}else if(nmtopleft == true){
						$("stefanvdnighttheme").style.left = $("stefanvdnighttheme").offsetx + evtobj.clientX - $("stefanvdnighttheme").x + "px";
						$("stefanvdnighttheme").style.top = $("stefanvdnighttheme").offsety - evtobj.clientY + $("stefanvdnighttheme").y + "px";
					}else if(nmtopright == true){
						$("stefanvdnighttheme").style.right = $("stefanvdnighttheme").offsetx + evtobj.clientX - $("stefanvdnighttheme").x + "px";
						$("stefanvdnighttheme").style.top = $("stefanvdnighttheme").offsety - evtobj.clientY + $("stefanvdnighttheme").y + "px";
					}else if(nmbottomright == true){
						$("stefanvdnighttheme").style.left = $("stefanvdnighttheme").offsetx + evtobj.clientX - $("stefanvdnighttheme").x + "px";
						$("stefanvdnighttheme").style.bottom = $("stefanvdnighttheme").offsety - evtobj.clientY + $("stefanvdnighttheme").y + "px";
					}
					return false;
				}
			}
		};

		function addswitchdrag(){
			if($("stefanvdnighttheme")){
				if(nmcustom == true){
					dragobject.initialize();
				}
			}
		}
		addswitchdrag();

		// night mode gesture
		var bnode = document.body;
		var presstimer = null;
		var presstimeraction = null;
		var cancelgesture = function(){
			touchstatus = false;

			document.body.removeEventListener("pointermove", cancelmovegesture);

			if(presstimer !== null){
				window.clearTimeout(presstimer);
				presstimer = null;
				window.clearTimeout(presstimeraction);
				presstimeraction = null;
			}

			var elementList = bnode.getElementsByTagName("*");
			var i;
			var l = elementList.length;
			for(i = 0; i < l; i++){
				elementList[i].classList.remove("stefanvdlongpress");
			}
			document.getElementsByTagName("html")[0].classList.remove("stefanvdnightblur");
		};

		var cancelmovegesture = function(){
			touchstatus = false;
		};

		var touchstatus = true;
		var startgesture = function(e){
			touchstatus = true;
			if(e.type === "pointerdown" && e.button !== 0){
				return;
			}

			// if it is a click on: A, INPUT, etc do nothing
			var targetlongpress = e.target.nodeName;
			switch(targetlongpress){
			case"A":
			case"INPUT":
			case"OPTION":
			case"NAV":
			case"METER":
			case"PROGRESS":
			case"SELECT":
			case"BUTTON":
			case"VIDEO":
			case"AUDIO":
				return;
			}

			// if click on night switch, then do nothing
			if(e.target.id){
				if(e.target.id.includes("stefanvdnighttheme")){
					return;
				}
			}

			// delay after 0.5 seconds start to work this code
			presstimer = window.setTimeout(function(){
				if(touchstatus == true){
					document.getElementsByTagName("html")[0].classList.add("stefanvdnightblur");
					presstimeraction = window.setTimeout(function(){
						gogonightmode();
						if(navigator.vibrate){
							window.navigator.vibrate([100, 30, 200]);
						}
					}, 800);
				}
			}, 500);

			document.addEventListener("pointermove", cancelmovegesture, false);

			return false;
		};

		var nightseectionchange = function(){
			if(window.getSelection){
				var selectObj = window.getSelection();
				// if text selection, stop the function
				if(selectObj.isCollapsed){
					// console.log("NO TEXT selected here!");
				}else{
					// console.log("TEXT selected here! + CANCEL");
					cancelgesture();
				}
			}
		};

		function runnightmodegesturecheck(){
			if(nightmodegesture == true){
				var nightblurcss = ".stefanvdnightblur{-webkit-animation:0.8s nightblind;animation:0.8s nightblind}@-webkit-keyframes nightblind{0%,20%{filter:blur(0);-webkit-filter:blur(0)}100%{filter:blur(10px);-webkit-filter:blur(10px)}}@keyframes nightblind{0%,20%{filter:blur(0);-webkit-filter:blur(0)}100%{filter:blur(10px);-webkit-filter:blur(10px)}}.stefanvdlongpress{-webkit-animation:0.8s longpress;animation:0.8s longpress}@-webkit-keyframes longpress{0%,20%{background:" + window.getComputedStyle(document.body, null).getPropertyValue("background-color") + "}100%{background:" + nightmodebck + "}}@keyframes longpress{0%,20%{background:" + window.getComputedStyle(document.body, null).getPropertyValue("background-color") + "}100%{background:" + nightmodebck + "}}";

				addcsstext("totlnightgesturestyle", nightblurcss);

				document.addEventListener("selectionchange", nightseectionchange);

				bnode.addEventListener("pointerdown", startgesture);
				bnode.addEventListener("pointerup", cancelgesture);
				bnode.addEventListener("contextmenu", cancelgesture);
			}
		}
		runnightmodegesturecheck();

		chrome.runtime.onMessage.addListener(function(request){
			if(request.action == "goinnightmode"){
				if(request.value == "day"){
					sun = false; gogonightmode(); // sun go up
				}else if(request.value == "night"){
					sun = true; gogonightmode(); // make it dark
				}
			}else if(request.action == "gonightmodecolors"){
				chrome.storage.sync.get(["nightmodebck", "nightmodetxt", "nightmodehyperlink", "nightmodebutton", "nightmodeborder", "nmimagedark", "nmimagegray"], function(items){
					if(items["nightmodebck"]){ nightmodebck = items["nightmodebck"]; }else{ nightmodebck = "#1e1e1e"; }
					if(items["nightmodetxt"]){ nightmodetxt = items["nightmodetxt"]; }else{ nightmodetxt = "#ffffff"; }
					if(items["nightmodehyperlink"]){ nightmodehyperlink = items["nightmodehyperlink"]; }else{ nightmodehyperlink = "#ffffff"; }
					if(items["nightmodebutton"]){ nightmodebutton = items["nightmodebutton"]; }else{ nightmodebutton = "#353535"; }
					if(items["nightmodeborder"]){ nightmodeborder = items["nightmodeborder"]; }else{ nightmodeborder = "#545454"; }

					if(items["nmimagedark"]){ nmimagedark = parseInt(100 - items["nmimagedark"]); }else{ nmimagedark = 60; }
					if(items["nmimagegray"]){ nmimagegray = items["nmimagegray"]; }else{ nmimagegray = 50; }

					if(document.getElementById("totlnightmodestyle")){
						document.getElementById("totlnightmodestyle").innerText = ".stefanvdnightbck{background:" + nightmodebck + "!important;background-color:" + nightmodebck + "!important;}.stefanvdnight::placeholder{color:" + nightmodetxt + "!important;}.stefanvdnight{color:" + nightmodetxt + "!important;}.stefanvdnight a{color:" + nightmodehyperlink + "!important}.stefanvdnight a *{color:" + nightmodehyperlink + "!important}.stefanvdnightbutton{background:" + nightmodebutton + "!important;background-color:" + nightmodebutton + "!important;color:" + nightmodetxt + "!important}.stefanvdnightborder{border-color:" + nightmodeborder + "!important}.stefanvdnightboxshadow{box-shadow: 0 0 0 1px " + nightmodeborder + "!important}.stefanvdnighttextshadow{text-shadow:inherit!important}.stefanvdnightpseudobefore:before,.stefanvdnightpseudoafter:after{background:transparent!important}.stefanvdnightimage{filter:brightness(" + nmimagedark + "%) grayscale(" + nmimagegray + "%)!important}";
					}

					// refresh the meta color
					setnightmetatheme(false);
				});
			}else if(request.action == "goenablenightmode"){
				chrome.storage.sync.get(["nighttheme", "nightmodeswitchhide", "nightmodeswitchhidetime", "nightonly", "nightmodechecklistwhite", "nightmodechecklistblack", "nightDomains", "nightmodebydomain", "nightmodebypage", "nightactivetime", "nmbegintime", "nmendtime", "nightenabletheme", "nighthover", "nmtopleft", "nmtopright", "nmbottomright", "nmbottomleft", "nmcustom", "nightmodegesture", "nightmodeos", "nmautoclock", "nmautobegintime", "nmautoendtime", "nightmodeimage"], function(items){
					nighttheme = items["nighttheme"];
					nightmodeswitchhide = items["nightmodeswitchhide"];
					nightmodeswitchhidetime = items["nightmodeswitchhidetime"];
					nightonly = items["nightonly"];
					nightmodechecklistwhite = items["nightmodechecklistwhite"];
					nightmodechecklistblack = items["nightmodechecklistblack"];
					nightDomains = items["nightDomains"];
					nightmodebydomain = items["nightmodebydomain"];
					nightmodebypage = items["nightmodebypage"];
					nightactivetime = items["nightactivetime"];
					nmbegintime = items["nmbegintime"];
					nmendtime = items["nmendtime"];
					nightenabletheme = items["nightenabletheme"];
					nighthover = items["nighthover"];
					nmtopleft = items["nmtopleft"];
					nmtopright = items["nmtopright"];
					nmbottomright = items["nmbottomright"];
					nmbottomleft = items["nmbottomleft"];
					nmcustom = items["nmcustom"];
					nightmodegesture = items["nightmodegesture"];
					nightmodeos = items["nightmodeos"];
					nmautoclock = items["nmautoclock"];
					nmautobegintime = items["nmautobegintime"];
					nmautoendtime = items["nmautoendtime"];
					nightmodeimage = items["nightmodeimage"];

					nightobserver.disconnect();
					setnightmetatheme(true);

					// remove
					window.clearTimeout(timernightswitch);
					document.removeEventListener("pointermove", mousemoveswitchhide);
					document.removeEventListener("fullscreenchange", fullscreenswitch);
					windark.removeEventListener("change", osdarkmodecheck);

					nightcurrentvideoplaying = false;
					var x = document.getElementsByTagName("video")[0];
					if(x){
						x.removeEventListener("playing", playnightfullscreen);
						x.removeEventListener("pause", pausenightfullscreen);
					}

					document.removeEventListener("pointerdown", dragobject.drag);
					document.removeEventListener("pointerup", dragobject.dragup);
					document.removeEventListener("pointerover", dragobject.moveit);

					sun = true; isitdark = false;
					// search all elements and remove night class
					var elemsnight = document.querySelectorAll(".stefanvdnight");
					[].forEach.call(elemsnight, function(el){
						el.classList.remove("stefanvdnight");
					});

					var elemsbcka = document.querySelectorAll(".stefanvdnightbck");
					[].forEach.call(elemsbcka, function(el){
						el.classList.remove("stefanvdnightbck");
					});

					var elemsbttn = document.querySelectorAll(".stefanvdnightbutton");
					[].forEach.call(elemsbttn, function(el){
						el.classList.remove("stefanvdnightbutton");
					});

					var elemsbrdr = document.querySelectorAll(".stefanvdnightborder");
					[].forEach.call(elemsbrdr, function(el){
						el.classList.remove("stefanvdnightborder");
					});

					var elemsbxshw = document.querySelectorAll(".stefanvdnightboxshadow");
					[].forEach.call(elemsbxshw, function(el){
						el.classList.remove("stefanvdnightboxshadow");
					});

					var elemstxshw = document.querySelectorAll(".stefanvdnighttextshadow");
					[].forEach.call(elemstxshw, function(el){
						el.classList.remove("stefanvdnighttextshadow");
					});

					var elemspseubefore = document.querySelectorAll(".stefanvdnightpseudobefore");
					[].forEach.call(elemspseubefore, function(el){
						el.classList.remove("stefanvdnightpseudobefore");
					});

					var elemspseuafter = document.querySelectorAll(".stefanvdnightpseudoafter");
					[].forEach.call(elemspseuafter, function(el){
						el.classList.remove("stefanvdnightpseudoafter");
					});

					var elemsngimage = document.querySelectorAll(".stefanvdnightimage");
					[].forEach.call(elemsngimage, function(el){
						el.classList.remove("stefanvdnightimage");
					});

					// remove the extern Night Mode is activated
					if(document.getElementById("totldark")){
						var elem = document.getElementById("totldark");
						elem.parentNode.removeChild(elem);
					}

					var elemstyle = document.getElementById("totlnightmodestyle");
					if(elemstyle){ elemstyle.parentElement.removeChild(elemstyle); }
					var elemswitch = document.getElementById("stefanvdnighttheme");
					if(elemswitch){ elemswitch.parentElement.removeChild(elemswitch); }

					runnightmodecheck();
					addswitchdrag();
				});
			}else if(request.action == "gorefreshnightmodegesture"){
				chrome.storage.sync.get(["nightmodegesture"], function(items){
					nightmodegesture = items["nightmodegesture"];

					// remove
					if(document.getElementById("totlnightgesturestyle")){
						var element = document.getElementById("totlnightgesturestyle");
						element.parentNode.removeChild(element);
					}
					document.removeEventListener("selectionchange", nightseectionchange);

					document.body.removeEventListener("pointerdown", startgesture);
					document.body.removeEventListener("pointerup", cancelgesture);
					document.body.removeEventListener("contextmenu", cancelgesture);

					if(nightmodegesture == true){
						runnightmodegesturecheck();
					}
				});
			}
		});

	});

}; // afterbody

if(document.body){
	afterBodyReady();
}else{
	const bodyObserver = new MutationObserver((recordList, observer) => {
		// Wait for 'document.body' get the definition
		if(!document.body)return;

		afterBodyReady();
		observer.disconnect();
	});
	bodyObserver.observe(document.documentElement, {childList: true});
}