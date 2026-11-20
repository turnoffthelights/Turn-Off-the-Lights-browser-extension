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
window.stefanvdnightmodeinjected = true;
// The message listener is attached synchronously so messages sent right
// after injection are not lost. Messages that arrive before the settings
// are loaded are queued in "pendingnightaction" and replayed once
// "nightMessageHandler" is assigned inside afterBodyReady.
var nightMessageHandler = null;
var pendingnightaction = null;
chrome.runtime.onMessage.addListener(function(request){
	if(nightMessageHandler){ nightMessageHandler(request); }else{ pendingnightaction = request; }
});
var nighttheme = null, nightonly = null, nightDomains = null, nightenabletheme = null, nighthover = null, nmbegintime = null, nmendtime = null, nightmodechecklistblack = null, nightmodechecklistwhite = null, nmtopleft = null, nmtopright = null, nmbottomright = null, nmbottomleft = null, nmcustom = null, nmcustomx = null, nmcustomy = null, nightmodebck = null, nightmodetxt = null, nightmodehyperlink = null, nightmodebydomain = null, nightmodebypage = null, nightmodegesture = null, nightactivetime = null, nightmodeswitchhide = null, nightmodeswitchhidetime = null, nightmodebutton = null, nightmodeos = null, nightmodeborder = null, nmautobegintime = null, nmautoendtime = null, nmautoclock = null, nightmodeimage = null, nmimagedark = null, nmimagegray = null, nightmodestandard = null, nightmodepersonalized = null, nightdarkmodeactive = null, swnightmodeborder = null, swnightmodebutton = null, swnightmodehyperlink = null, swnightmodebck = null, swnightmodetxt = null, nightskipcolor = null;

// observeDOM - dynamic check
var observeDOM = (function(){
	return function(obj, callback){
		// define a new observer
		var obs = new MutationObserver(function(mutations){
			if(mutations[0].addedNodes.length || mutations[0].removedNodes.length)
				callback();
		});
		// have the observer observe foo for changes in children
		obs.observe(obj, {childList:true, subtree:true});
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
}

function isDarkMode(){
	const bg = getComputedStyle(document.body || document.documentElement).backgroundColor;
	const rgb = bg.match(/\d+/g);
	if(!rgb)return false;
	const[r, g, b] = rgb.map(Number);
	return(0.299 * r + 0.587 * g + 0.114 * b) < 128; // true = dark, false = light
}

function generateNightModeCSS(){
	let css = "";

	// Only add background styles if enabled
	if(swnightmodebck){
		css += `.stefanvdnightbck{background:${nightmodebck}!important;background-color:${nightmodebck}!important;}`;
	}

	// Only add text styles if enabled
	if(swnightmodetxt){
		css += `.stefanvdnight::placeholder{color:${nightmodetxt}!important;}`;
		css += `.stefanvdnight{color:${nightmodetxt}!important;}`;
	}

	// Only add hyperlink styles if enabled
	if(swnightmodehyperlink){
		css += `.stefanvdnight a{color:${nightmodehyperlink}!important}`;
		css += `.stefanvdnight a *{color:${nightmodehyperlink}!important}`;
	}

	// Only add button styles if enabled
	if(swnightmodebutton){
		css += `.stefanvdnightbutton{background:${nightmodebutton}!important;background-color:${nightmodebutton}!important;color:${nightmodetxt}!important}`;
	}

	// Only add border styles if enabled
	if(swnightmodeborder){
		css += `.stefanvdnightborder{border-color:${nightmodeborder}!important}`;
		css += `.stefanvdnightboxshadow{box-shadow: 0 0 0 1px ${nightmodeborder}!important}`;
	}

	// Always include these base styles
	css += ".stefanvdnighttextshadow{text-shadow:inherit!important}";
	css += ".stefanvdnightpseudobefore:before,.stefanvdnightpseudoafter:after{background:transparent!important}";
	css += `.stefanvdnightimage{filter:brightness(${nmimagedark}%) grayscale(${nmimagegray}%)!important}`;

	return css;
}

const afterBodyReady = () => {
	chrome.storage.sync.get(["nighttheme", "nightonly", "nightDomains", "nightenabletheme", "nighthover", "nmbegintime", "nmendtime", "nightmodechecklistblack", "nightmodechecklistwhite", "nmtopleft", "nmtopright", "nmbottomright", "nmbottomleft", "nmcustom", "nmcustomx", "nmcustomy", "nightmodebck", "nightmodetxt", "nightmodehyperlink", "nightmodebydomain", "nightmodebypage", "nightmodegesture", "nightactivetime", "nightmodeswitchhide", "nightmodeswitchhidetime", "nightmodebutton", "nightmodeos", "nightmodeborder", "nmautobegintime", "nmautoendtime", "nmautoclock", "nightmodeimage", "nmimagedark", "nmimagegray", "nightmodestandard", "nightmodepersonalized", "nightdarkmodeactive", "swnightmodeborder", "swnightmodebutton", "swnightmodehyperlink", "swnightmodebck", "swnightmodetxt", "nightskipcolor"], function(response){
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
		nightmodestandard = response["nightmodestandard"]; if(nightmodestandard == null)nightmodestandard = false;
		nightmodepersonalized = response["nightmodepersonalized"]; if(nightmodepersonalized == null)nightmodepersonalized = true;
		nightdarkmodeactive = response["nightdarkmodeactive"]; if(nightdarkmodeactive == null)nightdarkmodeactive = false;
		swnightmodeborder = response["swnightmodeborder"]; if(swnightmodeborder == null)swnightmodeborder = true;
		swnightmodebutton = response["swnightmodebutton"]; if(swnightmodebutton == null)swnightmodebutton = true;
		swnightmodehyperlink = response["swnightmodehyperlink"]; if(swnightmodehyperlink == null)swnightmodehyperlink = true;
		swnightmodebck = response["swnightmodebck"]; if(swnightmodebck == null)swnightmodebck = true;
		swnightmodetxt = response["swnightmodetxt"]; if(swnightmodetxt == null)swnightmodetxt = true;
		nightskipcolor = response["nightskipcolor"];

		var windark = window.matchMedia("(prefers-color-scheme: dark)");

		var isitdark = false;

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

		// Batched night-mode conversion: the mutation callback only
		// collects the affected nodes. The expensive convertwebnight()
		// work runs once per animation frame, so fast DOM changes on
		// heavy pages do not force a style recalculation for every
		// single mutation record.
		var nightqueuedeep = new Set(); // added nodes: convert the node and its descendants
		var nightqueueshallow = new Set(); // attribute changes: convert the node only
		var nightflushscheduled = false;

		function stopnightobserver(){
			nightobserver.disconnect();
			nightqueuedeep.clear();
			nightqueueshallow.clear();
		}

		function flushnightnodes(){
			nightflushscheduled = false;
			if(nightqueuedeep.size == 0 && nightqueueshallow.size == 0)return;
			// night mode was disabled while this pass was queued
			if(isitdark != true){
				nightqueuedeep.clear();
				nightqueueshallow.clear();
				return;
			}
			// Pause observing while converting: the classList.add() calls
			// inside convertwebnight() must not queue new mutation records
			// that would retrigger this pass.
			nightobserver.disconnect();
			nightqueuedeep.forEach(function(node){
				// skip nodes already covered by a queued ancestor
				var parentcheck = node.parentElement;
				while(parentcheck){
					if(nightqueuedeep.has(parentcheck))return;
					parentcheck = parentcheck.parentElement;
				}
				if(node.isConnected == false)return;
				convertwebnight(node);
				var aninside = node.getElementsByTagName("*");
				var k;
				var l = aninside.length;
				for(k = 0; k < l; k++){
					convertwebnight(aninside[k]);
				}
			});
			nightqueueshallow.forEach(function(node){
				if(node.isConnected == false)return;
				// skip nodes already covered by a queued subtree scan
				var parentcheck = node;
				while(parentcheck){
					if(nightqueuedeep.has(parentcheck))return;
					parentcheck = parentcheck.parentElement;
				}
				convertwebnight(node);
				// a class or style change here can also restyle descendants
				// through the cascade: re-check elements that are not converted
				var unconverted = node.querySelectorAll(":not(.stefanvdnightbck)");
				var k;
				var l = unconverted.length;
				for(k = 0; k < l; k++){
					convertwebnight(unconverted[k]);
				}
			});
			nightqueuedeep.clear();
			nightqueueshallow.clear();
			// resume observing
			nightobserver.observe(targetNode, observerConfig);
		}

		// Pages can also restyle elements without producing any mutation
		// records under document.body (for example via CSSOM insertRule).
		// A throttled re-scan on scroll keeps those elements dark as well.
		var scrollrescan = function(){
			if(isitdark != true)return;
			nightqueueshallow.add(document.body);
			if(nightflushscheduled == false){
				nightflushscheduled = true;
				requestAnimationFrame(flushnightnodes);
			}
		};

		var nightobserver = new MutationObserver(function(mutations){
			mutations.forEach(function(mutation){
				if(mutation.type == "childList"){
					mutation.addedNodes.forEach(function(node){
						if(typeof node.getElementsByTagName === "function"){
							nightqueuedeep.add(node);
						}
					});
				}else if(mutation.type == "attributes"){
					// class or style changed (attributeFilter limits this to those
					// two): re-evaluate the target and its descendants
					nightqueueshallow.add(mutation.target);
				}
			});
			if(nightflushscheduled == false){
				nightflushscheduled = true;
				requestAnimationFrame(flushnightnodes);
			}
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

		function isColorDark(color){
			// Convert color to RGB values
			let r, g, b;
			if(color.startsWith("rgb")){
				const rgbValues = color.match(/\d+/g);
				r = parseInt(rgbValues[0]);
				g = parseInt(rgbValues[1]);
				b = parseInt(rgbValues[2]);
			}else if(color.startsWith("#")){
				const hex = color.replace("#", "");
				r = parseInt(hex.substr(0, 2), 16);
				g = parseInt(hex.substr(2, 2), 16);
				b = parseInt(hex.substr(4, 2), 16);
			}else{
				return false; // If color format not recognized, do not consider it dark
			}

			// Check if color is grayscale (R=G=B) and dark
			const isGrayscale = Math.abs(r - g) < 30 && Math.abs(g - b) < 30 && Math.abs(r - b) < 30;
			const brightness = (r * 299 + g * 587 + b * 114) / 1000;

			return isGrayscale && brightness < 128;
		}

		function shouldApplyNightMode(element){
			if(!nightskipcolor)return true;

			const computedStyle = window.getComputedStyle(element);
			const color = computedStyle.color;
			return isColorDark(color);
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

			// keep the YouTube video player and its controls in the original style
			if(window.location.href.match(/((http:\/\/(.*youtube\.com\/.*))|(https:\/\/(.*youtube\.com\/.*)))/i)){
				if(node.closest && node.closest("ytd-player, .html5-video-player")){
					return;
				}

				// keep the YouTube sidebar scrim in the original style (it is a
				// translucent dim layer, not a solid background to convert)
				if(node.id == "scrim" && node.classList && node.classList.contains("tp-yt-app-drawer")){
					return;
				}
			}
			// end of YouTube-specific exclusions

			// Only apply text color changes if the text is dark/black when nightskipcolor is true
			const shouldApplyText = shouldApplyNightMode(node);

			if(swnightmodetxt && shouldApplyText){
				node.classList.add("stefanvdnight");
			}
			if(swnightmodebutton && node.tagName == "BUTTON" && shouldApplyText){
				node.classList.add("stefanvdnightbutton");
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
									// Only add stefanvdnight if we should apply text changes
									if(shouldApplyText){
										node.classList.add("stefanvdnightbck", "stefanvdnight");
									}else{
										node.classList.add("stefanvdnightbck");
									}
								}else if(shouldApplyText){ // Only add if we should apply text changes
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
				}else{
					// End mutation observer
					stopnightobserver();

					sun = true;
					if($("stefanvdnightin")){
						$("stefanvdnightin").setAttribute("id", "stefanvdnighti"); // change night background button
					}
					if($("stefanvdnightthemecheckbox")){ $("stefanvdnightthemecheckbox").checked = false; }

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
					if($("totldark")){
						var elem = $("totldark");
						elem.parentNode.removeChild(elem);
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
						let css = "position: fixed; pointer-events: none; top: 0; left: 0; width: 100vw; height: 100vh; background-color: " + nightmodebck + "; filter: invert(1);mix-blend-mode: difference;";
						pdfcover.setAttribute("style", css);
						pdfcover.id = "stefanvdnightpdf";
						pdfcover.setAttribute("aria-hidden", "true");
						document.body.appendChild(pdfcover);
					}
				}
			}
		}

		// gogo night mode
		async function gogonightmode(){
			// Add the check here, before any night mode changes are made
			if(nightdarkmodeactive == true){
				if(isDarkMode() == true){
					return;
				}
			}

			if(nightmodestandard == true){
				const styleId = "night-mode-standard-theme";
				const existingStyle = document.getElementById(styleId);

				if(existingStyle){
					existingStyle.remove();
				}else{
					const standardstyle = `
					/* Night Mode Standard Theme */
					html{filter:invert(85%) grayscale(0%) saturate(110%) contrast(115%) brightness(110%) hue-rotate(180deg)!important}
					html *{box-shadow:none!important}
					img,div[role=img],svg,video,
					*[style*="background-image"]{filter:invert(85%) grayscale(0%) saturate(110%) contrast(115%) brightness(110%) hue-rotate(180deg)!important}
					`;

					const newstyle = document.createElement("style");
					newstyle.id = styleId;
					newstyle.textContent = standardstyle;
					document.head.appendChild(newstyle);
				}
			}else{
				// PDF detection
				convertpdfnight();
				//---

				// Where you currently add the CSS styles
				var css = generateNightModeCSS();
				addcsstext("totlnightmodestyle", css);

				getdefaultnightmetatheme();
				//---
				await webgonightmode();
				// this function is executed after function
				if(sun == false){
					isitdark = true;
					setnightmetatheme(false);
					// Start mutation observer
					nightobserver.observe(targetNode, observerConfig);
					document.addEventListener("scroll", scrollrescan, {passive: true});
				}else{
					isitdark = false;
					setnightmetatheme(true);
					document.removeEventListener("scroll", scrollrescan);
				}
			}
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
				newnightinput.setAttribute("aria-label", chrome.i18n.getMessage("arianightmodeswitch"));
				if(nightenabletheme == true){
					if(nightmodeos == true){
						if(window.matchMedia && windark.matches){
							// dark mode
							newnightinput.checked = false;
						}
					}else{
						newnightinput.checked = true;
					}
				}
				newnight.appendChild(newnightinput);

				var newnightspan = document.createElement("span");
				newnightspan.setAttribute("id", "stefanvdnightthemeslider");
				newnightspan.setAttribute("aria-hidden", "true");
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
				var nightblurcss = ".stefanvdnightblur{animation:0.8s nightblind}@keyframes nightblind{0%,20%{filter:blur(0)}100%{filter:blur(10px)}}.stefanvdlongpress{animation:0.8s longpress}@keyframes longpress{0%,20%{background:" + window.getComputedStyle(document.body, null).getPropertyValue("background-color") + "}100%{background:" + nightmodebck + "}}";

				addcsstext("totlnightgesturestyle", nightblurcss);

				document.addEventListener("selectionchange", nightseectionchange);

				bnode.addEventListener("pointerdown", startgesture);
				bnode.addEventListener("pointerup", cancelgesture);
				bnode.addEventListener("contextmenu", cancelgesture);
			}
		}
		runnightmodegesturecheck();

		nightMessageHandler = function(request){
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
				chrome.storage.sync.get(["nighttheme", "nightmodeswitchhide", "nightmodeswitchhidetime", "nightonly", "nightmodechecklistwhite", "nightmodechecklistblack", "nightDomains", "nightmodebydomain", "nightmodebypage", "nightactivetime", "nmbegintime", "nmendtime", "nightenabletheme", "nighthover", "nmtopleft", "nmtopright", "nmbottomright", "nmbottomleft", "nmcustom", "nightmodegesture", "nightmodeos", "nmautoclock", "nmautobegintime", "nmautoendtime", "nightmodeimage", "nightmodestandard", "nightmodepersonalized", "swnightmodeborder", "swnightmodebutton", "swnightmodehyperlink", "swnightmodebck", "swnightmodetxt", "nightskipcolor"], function(items){
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
					nmtopleft = items["nmtopleft"]; if(nmtopleft == null)nmtopleft = false;
					nmtopright = items["nmtopright"]; if(nmtopright == null)nmtopright = false;
					nmbottomright = items["nmbottomright"]; if(nmbottomright == null)nmbottomright = false;
					nmbottomleft = items["nmbottomleft"]; if(nmbottomleft == null)nmbottomleft = true;
					nmcustom = items["nmcustom"];
					nightmodegesture = items["nightmodegesture"];
					nightmodeos = items["nightmodeos"];
					nmautoclock = items["nmautoclock"];
					nmautobegintime = items["nmautobegintime"];
					nmautoendtime = items["nmautoendtime"];
					nightmodeimage = items["nightmodeimage"];
					nightmodestandard = items["nightmodestandard"];
					nightmodepersonalized = items["nightmodepersonalized"];
					swnightmodeborder = items["swnightmodeborder"]; if(swnightmodeborder == null)swnightmodeborder = true;
					swnightmodebutton = items["swnightmodebutton"]; if(swnightmodebutton == null)swnightmodebutton = true;
					swnightmodehyperlink = items["swnightmodehyperlink"]; if(swnightmodehyperlink == null)swnightmodehyperlink = true;
					swnightmodebck = items["swnightmodebck"]; if(swnightmodebck == null)swnightmodebck = true;
					swnightmodetxt = items["swnightmodetxt"]; if(swnightmodetxt == null)swnightmodetxt = true;
					nightskipcolor = items["nightskipcolor"];

					stopnightobserver();
					setnightmetatheme(true);

					// remove
					window.clearTimeout(timernightswitch);
					document.removeEventListener("pointermove", mousemoveswitchhide);
					document.removeEventListener("fullscreenchange", fullscreenswitch);
					document.removeEventListener("scroll", scrollrescan);
					windark.removeEventListener("change", osdarkmodecheck);

					const existingStyle = document.getElementById("night-mode-standard-theme");
					if(existingStyle){
						existingStyle.remove();
					}

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
		};

		// handle a queued message that arrived before the settings were loaded
		if(pendingnightaction){
			var thataction = pendingnightaction;
			pendingnightaction = null;
			nightMessageHandler(thataction);
		}

	});

}; // afterbody

if(document.body){
	afterBodyReady();
}else{
	const bodyObserver = new MutationObserver((recordList, observer) => {
		// Wait for 'document.body' get the definition
		if(!document.body)return;
		observer.disconnect();
		afterBodyReady();
	});
	bodyObserver.observe(document.documentElement, {childList: true});
}