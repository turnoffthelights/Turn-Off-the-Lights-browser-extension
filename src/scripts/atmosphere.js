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

// Global variables
function $(id){ return document.getElementById(id); }

function rgbToHex(r, g, b){
	if(r > 255 || g > 255 || b > 255)
		throw"Invalid color component";
	return((r << 16) | (g << 8) | b).toString(16);
}

var ambilight = null;
var ambilightrangeblurradius = null;
var ambilightrangespreadradius = null;
var ambilightfixcolor = null;
var ambilightvarcolor = null;
var ambilightcolorhex = null;
var ambilight4color = null;
var ambilight1colorhex = null;
var ambilight2colorhex = null;
var ambilight3colorhex = null;
var ambilight4colorhex = null;
var atmosphereonly = null;
var atmosphereDomains = null;
var atmosvivid = null;
var drawatmosfps = null;
var atmosontotlmode = null;
var vpause = null;
var atmosfpsauto = null;
var atmosfpsmanual = null;
var requestId = 0;
var stop = false;
var fpsInterval, now, then, elapsed;
var countA = [], countB = [], countC = [];
var textcountA;
var textcountB;
var textcountC;
var p1; var p2; var p3; var p4;
var hex1; var hex2; var hex3; var hex4;
var totlshowtime;
var youtubewindow;
var totlmode = false;

function fixyoutubeatmos(){
	if(window.location.href.match(/((http:\/\/(.*youtube\.com\/.*))|(https:\/\/(.*youtube\.com\/.*)))/i)){
		var youtubewatchplayershadow = $("watch-player"); // YouTube video page
		if(youtubewatchplayershadow){ youtubewatchplayershadow.style.overflow = "visible"; } // show the overflow out the video element
		var youtubevideoplayershadow = $("video-player"); // YouTube video page
		if(youtubevideoplayershadow){ youtubevideoplayershadow.style.overflow = "visible"; } // show the overflow out the video element
		var youtubewatchvideoshadow = $("watch-video"); // YouTube video page
		if(youtubewatchvideoshadow){ youtubewatchvideoshadow.style.overflow = "visible"; } // show the overflow out the video element
		var youtubewindow = $("watch-player") || $("watch7-player") || $("player-api");
		if(youtubewindow){ youtubewindow.classList.add("stefanvdvideocontrolsitem"); }
		var youtubemovieplayer = $("movie_player"); // YouTube video page
		if(youtubemovieplayer){ youtubemovieplayer.style.borderRadius = "12px"; youtubemovieplayer.classList.add("stefanvdvideocontrolsitem"); } // show the overflow out the video element
		var youtubeytdplayer = $("ytd-player"); // YouTube video page
		if(youtubeytdplayer){ youtubeytdplayer.style.overflow = "visible"; }
		var youtubeplayer = $("player"); // YouTube video page
		if(youtubeplayer){ youtubeplayer.style.overflow = "visible"; }
		var youtubeplayercontainerid = $("player-container-id"); // YouTube video page
		if(youtubeplayercontainerid){ youtubeplayercontainerid.style.overflow = "visible"; }
		var ytdwatch = document.getElementsByTagName("ytd-watch")[0];
		if(ytdwatch){ ytdwatch.style.overflow = "visible"; } // show the overflow out the video element
		var ytdpagemanager = document.getElementsByTagName("ytd-page-manager")[0];
		if(ytdpagemanager){ ytdpagemanager.style.overflow = "visible"; } // show the overflow out the video element
	}
}

function subDomain(url){
// IF THERE, REMOVE WHITE SPACE FROM BOTH ENDS
	url = url.replace(new RegExp(/^\s+/), ""); // START
	url = url.replace(new RegExp(/\s+$/), ""); // END
	// IF FOUND, CONVERT BACK SLASHES TO FORWARD SLASHES
	url = url.replace(new RegExp(/\\/g), "/");
	// IF THERE, REMOVES "http://", "https://" or "ftp://" FROM THE START
	url = url.replace(new RegExp(/^http:\/\/|^https:\/\/|^ftp:\/\//i), "");
	// IF THERE, REMOVES "www." FROM THE START OF THE STRING
	url = url.replace(new RegExp(/^www\./i), "");
	// REMOVE COMPLETE STRING FROM FIRST FORWARD SLASH ON
	url = url.replace(new RegExp(/\/(.*)/), "");
	// REMOVES ".??.??" OR ".???.??" FROM END - e.g. ".CO.UK", ".COM.AU"
	if(url.match(new RegExp(/\.[a-z]{2,3}\.[a-z]{2}$/i))){
		url = url.replace(new RegExp(/\.[a-z]{2,3}\.[a-z]{2}$/i), "");
		// REMOVES ".??" or ".???" or ".????" FROM END - e.g. ".US", ".COM", ".INFO"
	}else if(url.match(new RegExp(/\.[a-z]{2,4}$/i))){
		url = url.replace(new RegExp(/\.[a-z]{2,4}$/i), "");
	}
	// CHECK TO SEE IF THERE IS A DOT "." LEFT IN THE STRING
	var subDomain = (url.match(new RegExp(/\./g))) ? true : false;

	return(subDomain);
}

function stopAnimation(){
	window.cancelAnimationFrame(requestId);
}

function startAnimating(fps){
	fpsInterval = 1000 / fps;
	then = window.performance.now();
	// startTime = then;
	// console.log(startTime);
	animate();
}

function atmostotlmode(){
	if(atmosontotlmode == true){
		if($("stefanvdlightareoff1")){
			totlmode = true;
		}else{
			totlmode = false;
		}
	}else{
		totlmode = true;
	}
}

function animate(){
	// stop
	if(stop){ return; }

	// use only for "vivi mode" and "atmosfpsauto" are both enabled
	if(atmosfpsauto == true && atmosvivid == true){
		atmostotlmode();
		if(document.visibilityState === "visible"){
			var htmlplayer = document.getElementsByTagName("video") || null;
			var playerid = null, item = null;
			var j;
			var l = htmlplayer.length;
			for(j = 0; j < l; j++){
				if(htmlplayer[j].play || htmlplayer[j].paused){
					playerid = htmlplayer[j];
					item = j + 1;
					drawAtmos(playerid, item, totlmode);
					htmlplayer[j].requestVideoFrameCallback(animate);
				}
			}
		}

		// YouTube flash detect play
		fixyoutubeatmos();
	}else{
		// request another frame
		requestId = window.requestAnimationFrame(animate);

		// calc elapsed time since last loop
		now = window.performance.now();
		elapsed = now - then;

		// if enough time has elapsed, draw the next frame
		if(elapsed > fpsInterval){

			// Get ready for next frame by setting then=now, but...
			// Also, adjust for fpsInterval not being multiple of 16.67
			then = now - (elapsed % fpsInterval);

			atmostotlmode();
			if(document.visibilityState === "visible"){
				let htmlplayer = document.getElementsByTagName("video") || null;
				let playerid = null, item = null;
				let j;
				let l = htmlplayer.length;
				for(j = 0; j < l; j++){
					if(htmlplayer[j].play){ playerid = htmlplayer[j]; item = j + 1; drawAtmos(playerid, item, totlmode); }
				}
			}

			// YouTube flash detect play
			fixyoutubeatmos();

		// TESTING...Report #seconds since start and achieved fps.
		// var sinceStart = now - startTime;
		// var currentFps = Math.round(1000 / (sinceStart / ++frameCount) * 100) / 100;
		// console.log("Elapsed time= " + Math.round(sinceStart / 1000 * 100) / 100 + " secs @ " + currentFps + " fps.");
		}
	}
}

function autoframeglow(){
	var htmlplayer = document.getElementsByTagName("video");
	var j;
	var l = htmlplayer.length;
	for(j = 0; j < l; j++){
		htmlplayer[j].addEventListener("playing", function(){
			animate();
		});
		htmlplayer[j].addEventListener("pause", function(){
			animate();
		});
	}
}

// Atmosphere Lighting
function runreal(){
	try{
		if(atmosvivid == true){
			var calcvividscale = 1 + (ambilightrangespreadradius / 100);
			if($("stefanvdvivideffect" + totlshowtime.getAttribute("data-video"))){
				var stefanvdvivideffect = $("stefanvdvivideffect" + totlshowtime.getAttribute("data-video"));
				if((stefanvdvivideffect.style.height != totlshowtime.style.height) && (totlshowtime.style.height != "")){
					stefanvdvivideffect.style.height = totlshowtime.offsetHeight;
					stefanvdvivideffect.style.width = totlshowtime.offsetWidth;
				}
				var vividctx = stefanvdvivideffect.getContext("2d", {desynchronized: true}); var vividx = Math.floor(totlshowtime.offsetWidth * 0.08); var vividy = Math.floor(totlshowtime.offsetHeight * 0.08);
				vividctx.drawImage(totlshowtime, 0, 0, vividx, vividy);
				if(!totlshowtime.classList.contains("stefanvdvideotop")){ totlshowtime.classList.add("stefanvdvideotop"); }
				// start first glow out
				stefanvdvivideffect.style.transform = "scale3d(" + calcvividscale + "," + calcvividscale + "," + calcvividscale + ")";
			}else{
				// if first run, or paused or stoped video before
				// create the vivid effect layer (again)
				if(totlshowtime.getAttribute("data-video") != null){

					if(!window.location.href.match(/((http:\/\/(.*youtube\.com\/.*))|(https:\/\/(.*youtube\.com\/.*)))/i)){
						// update background html video
						var path = [];
						var el = totlshowtime;
						do{
							var qq = path.unshift(el.nodeName);
							var yta;
							if(el.currentStyle){
								yta = qq.currentStyle["z-Index"];
							}else{
								yta = document.defaultView.getComputedStyle(el, null).getPropertyValue("z-Index");
							}
							if(yta != "auto"){
								// if it is not the <video> player element,
								// and if otherdown class is inside, then remove it
								if(el.tagName != "VIDEO"){
									if(el.classList.contains("stefanvdotherdown")){ el.classList.remove("stefanvdotherdown"); }
									el.classList.add("stefanvdvideoauto");
								}
							}
						}while((el.nodeName.toLowerCase() != "html") && (el = el.parentNode));
					}

					var newpositionvivid = window.getPosition(totlshowtime);
					var tempwidthvideo = totlshowtime.offsetWidth;
					var tempheightvideo = totlshowtime.offsetHeight;
					// var tempvisscrollleft = window.pageXOffset || document.documentElement.scrollLeft;
					// var tempvisscrolltop = window.pageYOffset || document.documentElement.scrollTop;
					totlshowtime.setAttribute("class", "stefanvdvideotop");
					var newvivid = document.createElement("canvas");
					newvivid.setAttribute("id", "stefanvdvivideffect" + totlshowtime.getAttribute("data-video"));
					newvivid.setAttribute("data-video", totlshowtime.getAttribute("data-video"));
					newvivid.setAttribute("class", "stefanvdvivideffect");
					newvivid.style.transform = "scale3d(0,0,0)";
					newvivid.style.filter = "blur(" + ambilightrangeblurradius + "px)";
					newvivid.style.top = newpositionvivid.y + "px"; // with NO    +tempvisscrolltop
					newvivid.style.left = newpositionvivid.x + "px"; // with NO    +tempvisscrollleft
					newvivid.style.width = tempwidthvideo + "px";
					newvivid.style.height = tempheightvideo + "px";
					newvivid.width = Math.floor(tempwidthvideo * 0.08);
					newvivid.height = Math.floor(tempheightvideo * 0.08);
					if(typeof exbrowser !== "undefined" && exbrowser == "safari"){
						// Fix Safari use backdropfilter to show correct the box shadow in realtime
						newvivid.style.backdropFilter = "opacity(0)";
					}
					document.body.appendChild(newvivid);
				}
			}
		}else{
			var sourceWidth = totlshowtime.videoWidth;
			var sourceHeight = totlshowtime.videoHeight;

			var k = totlshowtime.getAttribute("data-video");

			var totlcheckcanvas = $("totlCanvas" + k + "");
			if(totlcheckcanvas == null){
				var totlnewcanvas = document.createElement("canvas");
				totlnewcanvas.setAttribute("id", "totlCanvas" + k + "");
				totlnewcanvas.width = "4";
				totlnewcanvas.height = "1";
				totlnewcanvas.style.display = "none";
				document.body.appendChild(totlnewcanvas);
			}

			var canvas = $("totlCanvas" + k + "");
			var context = canvas.getContext("2d", {desynchronized: true, willReadFrequently: true});

			var colorlamp1X = (sourceWidth * 50) / 100; // up midden
			var colorlamp1Y = (sourceHeight * 95) / 100;
			var colorlamp2X = (sourceWidth * 95) / 100; // right midden
			var colorlamp2Y = (sourceHeight * 50) / 100;
			var colorlamp3X = (sourceWidth * 50) / 100; // down midden
			var colorlamp3Y = (sourceHeight * 5) / 100;
			var colorlamp4X = (sourceWidth * 5) / 100; // left midden
			var colorlamp4Y = (sourceHeight * 50) / 100;

			context.drawImage(totlshowtime, colorlamp1X, colorlamp1Y, 1, 1, 0, 0, 1, 1);
			context.drawImage(totlshowtime, colorlamp2X, colorlamp2Y, 1, 1, 1, 0, 1, 1);
			context.drawImage(totlshowtime, colorlamp3X, colorlamp3Y, 1, 1, 2, 0, 1, 1);
			context.drawImage(totlshowtime, colorlamp4X, colorlamp4Y, 1, 1, 3, 0, 1, 1);

			p1 = context.getImageData(0, 0, 1, 1).data;
			p2 = context.getImageData(1, 0, 1, 1).data;
			p3 = context.getImageData(2, 0, 1, 1).data;
			p4 = context.getImageData(3, 0, 1, 1).data;
			hex1 = "#" + ("000000" + rgbToHex(p1[0], p1[1], p1[2])).slice(-6);
			hex2 = "#" + ("000000" + rgbToHex(p2[0], p2[1], p2[2])).slice(-6);
			hex3 = "#" + ("000000" + rgbToHex(p3[0], p3[1], p3[2])).slice(-6);
			hex4 = "#" + ("000000" + rgbToHex(p4[0], p4[1], p4[2])).slice(-6);

			if(window.location.href.match(/((http:\/\/(.*youtube\.com\/.*))|(https:\/\/(.*youtube\.com\/.*)))/i)){
				// var youtubewindow = $("watch-player") || $("watch7-player") || $("player-api");
				youtubewindow = $("movie_player") || document.getElementsByTagName("ytg-persistent-player")[0];
				if(youtubewindow){
					setatmosplayer(youtubewindow, [textcountC, textcountB, textcountA], [hex1, hex2, hex3, hex4]);
				}
			}else{
				setatmosplayer(totlshowtime, [textcountC, textcountB, textcountA], [hex1, hex2, hex3, hex4]);
			}
		}
	}catch{
		rundefault();
	}
}

// if catch error in URL
function rundefault(){
	if(window.location.href.match(/((http:\/\/(.*youtube\.com\/.*))|(https:\/\/(.*youtube\.com\/.*)))/i)){
		// var youtubewindow = $("watch-player") || $("watch7-player") || $("player-api");
		youtubewindow = $("movie_player") || document.getElementsByTagName("ytg-persistent-player")[0];
		if(youtubewindow){
			setatmosplayer(youtubewindow, [textcountC, textcountB, textcountA], [ambilightcolorhex, ambilightcolorhex, ambilightcolorhex, ambilightcolorhex]);
		}
	}else{ setatmosplayer(totlshowtime, [textcountC, textcountB, textcountA], [ambilightcolorhex, ambilightcolorhex, ambilightcolorhex, ambilightcolorhex]); }
}

function setatmosplayer(v, a, b){
	v.style.boxShadow = "0px 0px 0px black , 0px -" + a[0] + " " + a[1] + " " + a[2] + " " + b[0] + ", 0px " + a[0] + " " + a[1] + " " + a[2] + " " + b[1] + ", " + a[0] + " 0px " + a[1] + " " + a[2] + " " + b[2] + ", -" + a[0] + " 0px " + a[1] + " " + a[2] + " " + b[3] + "";
}

function removeatmosvivid(playerid){
	if($("stefanvdvivideffect" + playerid.getAttribute("data-video"))){
		let stefanvdvivideffect = $("stefanvdvivideffect" + playerid.getAttribute("data-video"));
		stefanvdvivideffect.style.transform = "scale3d(0,0,0)"; // glow in
		stefanvdvivideffect.addEventListener("transitionend", function(){
			if(stefanvdvivideffect.parentNode){
				if(stefanvdvivideffect.style.transform == "scale3d(0, 0, 0)"){
					stefanvdvivideffect.parentNode.removeChild(stefanvdvivideffect);
				}
			}
		});
	}
}

// ambilight draw code
function drawAtmos(playerid, item, totlmode){
	var statusdetectvideo;
	if(vpause == true){ statusdetectvideo = playerid.ended; }else{ statusdetectvideo = playerid.paused || playerid.ended; }

	if((statusdetectvideo) || totlmode == false){
		// animation go out
		if(ambilightfixcolor == true || ambilight4color == true || (ambilightvarcolor == true && atmosvivid == false)){
			if(typeof countA[item] == "undefined"){ countA[item] = 0; }
			if(typeof countB[item] == "undefined"){ countB[item] = 0; }
			if(typeof countC[item] == "undefined"){ countC[item] = 0; }
			countA[item] = countA[item] - 1; if(countA[item] <= 0){ countA[item] = 0; }
			countB[item] = countB[item] - 1; if(countB[item] <= 0){ countB[item] = 0; }
			countC[item] = countC[item] - 1; if(countC[item] <= 0){ countC[item] = 0; }
			textcountA = countA[item] + "px";
			textcountB = countB[item] + "px";
			textcountC = countC[item] + "px";
		}

		if(ambilightvarcolor == true){
			if(atmosvivid == true){
				// regular glow effect
			}else{
				if(typeof item == "undefined"){
					return;
				}
				var canvas = $("totlCanvas" + item + "");
				if(canvas){
					var context = canvas.getContext("2d", {desynchronized: true, willReadFrequently: true});

					p1 = context.getImageData(0, 0, 1, 1).data;
					p2 = context.getImageData(1, 0, 1, 1).data;
					p3 = context.getImageData(2, 0, 1, 1).data;
					p4 = context.getImageData(3, 0, 1, 1).data;
					hex1 = "#" + ("000000" + rgbToHex(p1[0], p1[1], p1[2])).slice(-6);
					hex2 = "#" + ("000000" + rgbToHex(p2[0], p2[1], p2[2])).slice(-6);
					hex3 = "#" + ("000000" + rgbToHex(p3[0], p3[1], p3[2])).slice(-6);
					hex4 = "#" + ("000000" + rgbToHex(p4[0], p4[1], p4[2])).slice(-6);
				}
				var downhex1 = hex1; if(!hex1){ hex1 = "#000000"; } // previous value
				var downhex2 = hex2; if(!hex2){ hex2 = "#000000"; } // previous value
				var downhex3 = hex3; if(!hex3){ hex3 = "#000000"; } // previous value
				var downhex4 = hex4; if(!hex4){ hex4 = "#000000"; } // previous value
			}
		}
		// ----

		if(window.location.href.match(/((http:\/\/(.*youtube\.com\/.*))|(https:\/\/(.*youtube\.com\/.*)))/i)){
			// var youtubewindow = $("watch-player") || $("watch7-player") || $("player-api");
			var youtubewindow = $("movie_player") || document.getElementsByTagName("ytg-persistent-player")[0];
			if(youtubewindow){
				if(ambilightvarcolor == true){
					if(atmosvivid == true){
						removeatmosvivid(playerid);
					}else{
						if(typeof downhex1 != "undefined" || typeof downhex2 != "undefined" || typeof downhex3 != "undefined" || typeof downhex4 != "undefined"){
							try{
								setatmosplayer(youtubewindow, [textcountC, textcountB, textcountA], [downhex1, downhex2, downhex3, downhex4]);
							}catch{
								// Ignore errors
							}
						}else{
							setatmosplayer(youtubewindow, [textcountC, textcountB, textcountA], [ambilightcolorhex, ambilightcolorhex, ambilightcolorhex, ambilightcolorhex]);
						}
					}
				}else if(ambilightfixcolor == true){
					setatmosplayer(youtubewindow, [textcountC, textcountB, textcountA], [ambilightcolorhex, ambilightcolorhex, ambilightcolorhex, ambilightcolorhex]);
				}else if(ambilight4color == true){
					setatmosplayer(youtubewindow, [textcountC, textcountB, textcountA], [ambilight1colorhex, ambilight2colorhex, ambilight3colorhex, ambilight4colorhex]);
				}
			}
		}else{
			if(ambilightvarcolor == true){
				if(atmosvivid == true){
					removeatmosvivid(playerid);
				}else{
					setatmosplayer(playerid, [textcountC, textcountB, textcountA], [downhex1, downhex2, downhex3, downhex4]);
				}
			}else if(ambilightfixcolor == true){
				setatmosplayer(playerid, [textcountC, textcountB, textcountA], [ambilightcolorhex, ambilightcolorhex, ambilightcolorhex, ambilightcolorhex]);
			}else if(ambilight4color == true){
				setatmosplayer(playerid, [textcountC, textcountB, textcountA], [ambilight1colorhex, ambilight2colorhex, ambilight3colorhex, ambilight4colorhex]);
			}
		}

		return false;
	}

	if(totlmode == false){ return; }

	try{
		if(typeof item == "undefined"){
			return;
		}
	}catch(e){ console.log(e); }

	totlshowtime = playerid;
	// var youtubewindow = $("watch-player") || $("watch7-player") || $("player-api");
	youtubewindow = $("movie_player") || document.getElementsByTagName("ytg-persistent-player")[0];

	// animate out and in
	// but not for the vivid mode
	if(ambilightfixcolor == true || ambilight4color == true || (ambilightvarcolor == true && atmosvivid == false)){
		if(typeof countA[item] == "undefined"){ countA[item] = 0; }
		if(typeof countB[item] == "undefined"){ countB[item] = 0; }
		if(typeof countC[item] == "undefined"){ countC[item] = 0; }
		if(countA[item] < ambilightrangespreadradius){ countA[item] = countA[item] + 1; }
		if(countB[item] < ambilightrangeblurradius){ countB[item] = countB[item] + 1; }
		if(countC[item] < 20){ countC[item] = countC[item] + .5; }
		textcountA = countA[item] + "px";
		textcountB = countB[item] + "px";
		textcountC = countC[item] + "px";
	}

	if(ambilightvarcolor == true){
		// Cross detection
		// if url is the same as the video source
		// then posible to play real ambilight
		var cross = null;

		// check for the current page URL
		var pageurl = window.location.protocol + "//" + window.location.host; // https://www.stefanvd.net
		var pageurllengt = pageurl.length; // lengte url

		var yesornosubdomain = subDomain(pageurl);

		var insideitemlengt;
		if(typeof HTMLVideoElement !== "undefined" && totlshowtime instanceof HTMLVideoElement){
			var insideitem = totlshowtime.src;
			insideitemlengt = 0;
			if(insideitem){ insideitemlengt = insideitem.length; } // length URL
		}else{ insideitemlengt = "undefined"; }

		// begin mission control
		if((insideitemlengt == 0) && (yesornosubdomain == false)){
			// check for video -> source URL
			var items = totlshowtime.getElementsByTagName("source");
			var i;
			for(i = 0; i < 1; i++){ // 1 source needed
				cross = items[i].getAttribute("src");
			}
			if(cross.substring(0, pageurllengt) == pageurl){ runreal(); }else if(cross.substring(0, 2) == "./"){ runreal(); }else if(cross.substring(0, 3) == "../"){ runreal(); }else if((cross.substring(0, 4) != "http") && (cross.substring(0, 5) != "https") && (cross.substring(0, 3) != "ftp")){ runreal(); }else{ rundefault(); }
		}else if((insideitemlengt > 0) && (yesornosubdomain == false)){
			if(insideitem.substring(0, pageurllengt) == pageurl){ runreal(); }else if(insideitem.substring(0, 2) == "./"){ runreal(); }else if(insideitem.substring(0, 3) == "../"){ runreal(); }else if((insideitem.substring(0, 4) != "http") && (insideitem.substring(0, 5) != "https") && (insideitem.substring(0, 3) != "ftp")){ runreal(); }else{ runreal(); }
			// inside not OK go to rundefault();
		}else{ rundefault(); }
		// end mission control

	}else if(ambilightfixcolor == true){
		if(window.location.href.match(/((http:\/\/(.*youtube\.com\/.*))|(https:\/\/(.*youtube\.com\/.*)))/i)){
			if(youtubewindow){
				setatmosplayer(youtubewindow, [textcountC, textcountB, textcountA], [ambilightcolorhex, ambilightcolorhex, ambilightcolorhex, ambilightcolorhex]);
			}
		}else{ totlshowtime.style.boxShadow = "0px 0px 0px black , 0px -" + textcountC + " " + textcountB + " " + textcountA + " " + ambilightcolorhex + ", 0px " + textcountC + " " + textcountB + " " + textcountA + " " + ambilightcolorhex + ", " + textcountC + " 0px " + textcountB + " " + textcountA + " " + ambilightcolorhex + ", -" + textcountC + " 0px " + textcountB + " " + textcountA + " " + ambilightcolorhex + ""; }
	}else if(ambilight4color == true){
		if(window.location.href.match(/((http:\/\/(.*youtube\.com\/.*))|(https:\/\/(.*youtube\.com\/.*)))/i)){
			if(youtubewindow){
				setatmosplayer(youtubewindow, [textcountC, textcountB, textcountA], [ambilight1colorhex, ambilight2colorhex, ambilight3colorhex, ambilight4colorhex]);
			}
		}else{ setatmosplayer(totlshowtime, [textcountC, textcountB, textcountA], [ambilight1colorhex, ambilight2colorhex, ambilight3colorhex, ambilight4colorhex]); }
	}

}

function ambilightfunction(){
// yes show time
// ambilight play detect
	if(atmosfpsauto == true && atmosvivid == true){
	// auto
		autoframeglow();
	}else{
	// regular
		startAnimating(drawatmosfps);
	}

	// Observe a specific DOM element
	// New MutationSummary API Reference
	if(MutationObserver){
	// Setup MutationSummary observer
		var videolist = document.body;
		var observer = new MutationObserver(function(mutations){
			mutations.forEach(function(mutation){

				// detect change style - this for floating box in div detection
				if(mutation.attributeName == "style"){
					if(mutation.target.tagName == "VIDEO"){
						if(mutation.target.hasAttribute("data-video")){
						// update the style
							if(ambilight == true && ambilightvarcolor == true && atmosvivid == true){
								var potvis = mutation.target.getAttribute("data-video");
								var visposition = window.getPosition(mutation.target);
								if(document.getElementById("stefanvdvivideffect" + potvis)){
									document.getElementById("stefanvdvivideffect" + potvis).style.width = mutation.target.offsetWidth + "px";
									document.getElementById("stefanvdvivideffect" + potvis).style.height = mutation.target.offsetHeight + "px";
									// only update is higher or equal to the value 0
									// that to preven the animation on YouTube video ended to go upwards
									if(visposition.y >= 0){
										document.getElementById("stefanvdvivideffect" + potvis).style.top = visposition.y + "px";
									}
									if(visposition.x >= 0){
										document.getElementById("stefanvdvivideffect" + potvis).style.left = visposition.x + "px";
									}
									//---
								}
								if(mutation.target.play){
									animate();
								}
							}
						//---
						}
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

function runambilight(){
	window.checkDomainFeature(ambilight == true, atmosphereDomains, true, false, atmosphereonly, ambilightfunction);
}

// Listen for settings changes from options page (register immediately)
chrome.runtime.onMessage.addListener(function(request){
	if(request.action === "goenableatmos"){
		chrome.storage.sync.get(["ambilight", "ambilightfixcolor", "ambilight4color", "ambilightvarcolor", "atmosvivid", "vpause", "atmosfpsauto", "atmosfpsmanual", "drawatmosfps", "ambilightcolorhex", "ambilight1colorhex", "ambilight2colorhex", "ambilight3colorhex", "ambilight4colorhex", "ambilightrangeblurradius", "ambilightrangespreadradius", "atmosontotlmode", "atmosphereonly", "atmosphereDomains"], function(items){

			ambilightfixcolor = items["ambilightfixcolor"]; if(ambilightfixcolor == null)ambilightfixcolor = true;
			ambilight4color = items["ambilight4color"]; if(ambilight4color == null)ambilight4color = false;
			ambilightvarcolor = items["ambilightvarcolor"]; if(ambilightvarcolor == null)ambilightvarcolor = false;
			atmosvivid = items["atmosvivid"]; if(atmosvivid == null)atmosvivid = false;

			vpause = items["vpause"];
			atmosfpsauto = items["atmosfpsauto"]; if(atmosfpsauto == null){ atmosfpsauto = false; }
			atmosfpsmanual = items["atmosfpsmanual"]; if(atmosfpsmanual == null){ atmosfpsmanual = true; }
			drawatmosfps = items["drawatmosfps"]; if(drawatmosfps == null){ drawatmosfps = 12; }
			ambilightcolorhex = items["ambilightcolorhex"]; if(ambilightcolorhex == null){ ambilightcolorhex = "#47C2FF"; }
			ambilight1colorhex = items["ambilight1colorhex"]; if(ambilight1colorhex == null){ ambilight1colorhex = "#FF0000"; }
			ambilight2colorhex = items["ambilight2colorhex"]; if(ambilight2colorhex == null){ ambilight2colorhex = "#FFEE00"; }
			ambilight3colorhex = items["ambilight3colorhex"]; if(ambilight3colorhex == null){ ambilight3colorhex = "#00FF00"; }
			ambilight4colorhex = items["ambilight4colorhex"]; if(ambilight4colorhex == null){ ambilight4colorhex = "#0000FF"; }
			ambilightrangeblurradius = items["ambilightrangeblurradius"]; if(ambilightrangeblurradius == null){ ambilightrangeblurradius = 70; }
			ambilightrangespreadradius = items["ambilightrangespreadradius"]; if(ambilightrangespreadradius == null){ ambilightrangespreadradius = 20; }
			atmosontotlmode = items["atmosontotlmode"];
			atmosphereonly = items["atmosphereonly"];
			atmosphereDomains = items["atmosphereDomains"];

			if(atmosvivid){
				var htmlplayer = document.getElementsByTagName("video");
				var j;
				var l = htmlplayer.length;
				for(j = 0; j < l; j++){
					if(htmlplayer[j]){
						htmlplayer[j].style["boxShadow"] = "none";
						if($("stefanvdvivideffect" + htmlplayer[j].getAttribute("data-video"))){
							var stefanvdvivideffect = $("stefanvdvivideffect" + htmlplayer[j].getAttribute("data-video"));
							stefanvdvivideffect.parentNode.removeChild(stefanvdvivideffect);
						}
					}
				}
				if(window.location.href.match(/((http:\/\/(.*youtube\.com\/.*))|(https:\/\/(.*youtube\.com\/.*)))/i)){
					var youtubewindow = $("movie_player") || document.getElementsByTagName("ytg-persistent-player")[0];
					youtubewindow.style["boxShadow"] = "none";
				}
			}else{
				let htmlplayer = document.getElementsByTagName("video");
				let j;
				let l = htmlplayer.length;
				for(j = 0; j < l; j++){
					if(htmlplayer[j]){
						if($("stefanvdvivideffect" + htmlplayer[j].getAttribute("data-video"))){
							let stefanvdvivideffect = $("stefanvdvivideffect" + htmlplayer[j].getAttribute("data-video"));
							stefanvdvivideffect.parentNode.removeChild(stefanvdvivideffect);
						}
					}
				}
			}

			if(items["ambilight"]){
				ambilight = true;
				stop = false;
				ambilightfunction();
			}else{
				ambilight = false;
				stop = true;
				stopAnimation();

				let htmlplayer = document.getElementsByTagName("video");
				let j;
				let l = htmlplayer.length;
				for(j = 0; j < l; j++){
					if(htmlplayer[j]){
						htmlplayer[j].style["boxShadow"] = "none";
						if($("stefanvdvivideffect" + htmlplayer[j].getAttribute("data-video"))){
							let stefanvdvivideffect = $("stefanvdvivideffect" + htmlplayer[j].getAttribute("data-video"));
							stefanvdvivideffect.parentNode.removeChild(stefanvdvivideffect);
						}
					}
				}
				if(window.location.href.match(/((http:\/\/(.*youtube\.com\/.*))|(https:\/\/(.*youtube\.com\/.*)))/i)){
					let youtubewindow = $("movie_player") || document.getElementsByTagName("ytg-persistent-player")[0];
					youtubewindow.style["boxShadow"] = "none";
				}
			}
		});
	}
});

// Load settings and start
chrome.storage.sync.get(["ambilight", "ambilightfixcolor", "ambilight4color", "ambilightvarcolor", "atmosvivid", "vpause", "atmosfpsauto", "atmosfpsmanual", "drawatmosfps", "ambilightcolorhex", "ambilight1colorhex", "ambilight2colorhex", "ambilight3colorhex", "ambilight4colorhex", "ambilightrangeblurradius", "ambilightrangespreadradius", "atmosontotlmode", "atmosphereonly", "atmosphereDomains"], function(items){
	ambilight = items["ambilight"];
	ambilightrangeblurradius = items["ambilightrangeblurradius"]; if(ambilightrangeblurradius == null)ambilightrangeblurradius = 70;
	ambilightrangespreadradius = items["ambilightrangespreadradius"]; if(ambilightrangespreadradius == null)ambilightrangespreadradius = 20;
	ambilightfixcolor = items["ambilightfixcolor"]; if(ambilightfixcolor == null)ambilightfixcolor = true;
	ambilightvarcolor = items["ambilightvarcolor"]; if(ambilightvarcolor == null)ambilightvarcolor = false;
	ambilightcolorhex = items["ambilightcolorhex"]; if(ambilightcolorhex == null)ambilightcolorhex = "#47C2FF";
	ambilight4color = items["ambilight4color"]; if(ambilight4color == null)ambilight4color = false;
	ambilight1colorhex = items["ambilight1colorhex"]; if(ambilight1colorhex == null)ambilight1colorhex = "#FF0000";
	ambilight2colorhex = items["ambilight2colorhex"]; if(ambilight2colorhex == null)ambilight2colorhex = "#FFEE00";
	ambilight3colorhex = items["ambilight3colorhex"]; if(ambilight3colorhex == null)ambilight3colorhex = "#00FF00";
	ambilight4colorhex = items["ambilight4colorhex"]; if(ambilight4colorhex == null)ambilight4colorhex = "#0000FF";
	atmosphereonly = items["atmosphereonly"];
	atmosphereDomains = items["atmosphereDomains"];
	atmosvivid = items["atmosvivid"];
	drawatmosfps = items["drawatmosfps"]; if(drawatmosfps == null)drawatmosfps = 12;
	atmosontotlmode = items["atmosontotlmode"];
	vpause = items["vpause"];
	atmosfpsauto = items["atmosfpsauto"]; if(atmosfpsauto == null)atmosfpsauto = false;
	atmosfpsmanual = items["atmosfpsmanual"]; if(atmosfpsmanual == null)atmosfpsmanual = true;

	runambilight();
});
