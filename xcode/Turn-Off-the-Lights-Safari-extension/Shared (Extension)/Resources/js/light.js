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
// settings
var default_opacity = null, suggestions = null, playlist = null, videoheadline = null, flash = null, head = null, infobar = null, likebutton = null, sharebutton = null, viewcount = null, addvideobutton = null, likebar = null, mousespotlighto = null, mousespotlightc = null, mousespotlighta = null, lightcolor = null, lightimagea = null, lightimage = null, interval = null, fadein = null, fadeout = null, readera = null, readerlargestyle = null, mousespotlightt = null, password = null, enterpassword = null, hardflash = null, dynamic = null, dynamic1 = null, dynamic2 = null, dynamic3 = null, dynamic4 = null, dynamic5 = null, dynamic6 = null, dynamic7 = null, dynamic8 = null, dynamic9 = null, dynamic10 = null, hoveroptiondyn5 = null, blur = null, cinemaontop = null, spotlightradius = null, slideeffect = null, lightimagelin = null, linearsq = null, colora = null, intervallina = null, colorb = null, intervallinb = null, no360youtube = null, mousespotlights = null, titleinvertcolor = null, darkbrowsertheme = null, multiopacall = null, multiopacsel = null, multiopacityDomains = null, lampandnightmode = null;
// html elements used
var div = null, video = null;
// block lights
var activatelightsoff = true;

// Option page settings
chrome.storage.sync.get(["suggestions", "playlist", "videoheadline", "head", "infobar", "likebutton", "sharebutton", "viewcount", "addvideobutton", "likebar", "flash", "hardflash", "no360youtube", "mousespotlights", "titleinvertcolor"], function(response){
	suggestions = response["suggestions"];
	playlist = response["playlist"];
	videoheadline = response["videoheadline"];
	head = response["head"];
	infobar = response["infobar"];
	likebutton = response["likebutton"];
	sharebutton = response["sharebutton"];
	viewcount = response["viewcount"];
	addvideobutton = response["addvideobutton"];
	likebar = response["likebar"];
	flash = response["flash"];
	hardflash = response["hardflash"];
	no360youtube = response["no360youtube"];
	mousespotlights = response["mousespotlights"];
	titleinvertcolor = response["titleinvertcolor"]; if(titleinvertcolor)titleinvertcolor = response["titleinvertcolor"]; else titleinvertcolor = "#ffffff"; // default color white

	// check if CSS inject is on the current page
	var a; var span = document.createElement("span");
	span.setAttribute("id", "stefanvdtest");
	span.className = "stefanvdtest";
	document.body.appendChild(span);
	a = span.offsetTop;
	if(a != 88){
		chrome.runtime.sendMessage({name: "sendlightcss"});
	}
	removeId("stefanvdtest");

	chrome.runtime.onMessage.addListener(function(request){
		if(request.name == "injectlightcss"){ var style = document.createElement("style"); style.type = "text/css"; style.textContent = request.message; document.getElementsByTagName("head")[0].appendChild(style); }
	});

	function hasClass(a, b){
		return(" " + a.className + " ").indexOf(" " + b + " ") > -1;
	}

	// search video path function
	function searchvideopath(thatvideo){
		var el = thatvideo;
		var divpaddintop = false;
		do{
			if(el){
				var st = document.defaultView.getComputedStyle(el, null);
				var yta = st.getPropertyValue("z-Index");
				var tta = st.getPropertyValue("-webkit-transform") || st.getPropertyValue("-moz-transform") || st.getPropertyValue("-ms-transform") || st.getPropertyValue("-o-transform") || st.getPropertyValue("transform");
				var pta = st.getPropertyValue("position");
				var dta = st.getPropertyValue("padding-top");
				var hta = st.getPropertyValue("height");
				var dba = st.getPropertyValue("padding-bottom");

				var pbefore = document.defaultView.getComputedStyle(el, "::before");
				var beforedta = pbefore.getPropertyValue("padding-top");
				var beforedba = pbefore.getPropertyValue("padding-bottom");

				var pafter = document.defaultView.getComputedStyle(el, "::after");
				var afterdta = pafter.getPropertyValue("padding-top");
				var afterdba = pafter.getPropertyValue("padding-bottom");

				if(yta != "auto"){
					// if it is not the <video> player element,
					// and if otherdown class is inside, then remove it
					if(el.tagName != "VIDEO" && el.tagName != "OBJECT" && el.tagName != "EMBED" && el.tagName != "APPLET" && el.tagName != "IFRAME"){
						if(el.classList.contains("stefanvdotherdown")){ el.classList.remove("stefanvdotherdown"); }
						if(el.classList.contains("stefanvdvideocontrolstop")){ el.classList.remove("stefanvdvideocontrolstop"); }
						if(el.classList.contains("stefanvdvideocontrolsitem")){ el.classList.remove("stefanvdvideocontrolsitem"); }
						if(el.classList.contains("stefanvditemtop")){ el.classList.remove("stefanvditemtop"); }
						el.classList.add("stefanvdvideoauto");
					}
				}
				if(tta != "none"){ el.classList.add("stefanvdtransformauto"); }
				if(pta == "sticky"){ el.classList.add("stefanvdpossticky"); }
				if(pta == "fixed"){ el.classList.add("stefanvdposfixed"); }

				// if padding-top used
				// if padding-bottom used
				var parhta = parseInt(hta, 10);
				var pardba = parseInt(dba, 10);
				var pardta = parseInt(dta, 10);
				var parbefdba = parseInt(beforedba, 10);
				var parbefdta = parseInt(beforedta, 10);
				var parafdta = parseInt(afterdta, 10);
				var parafdba = parseInt(afterdba, 10);
				if((pardta > 0 && parhta == 0) || (pardta == parhta && (pardta > 0)) ||
					(pardba > 0 && parhta == 0) || (pardba == parhta && (pardba > 0)) ||
					(parbefdta > 0 && parhta == 0) || (parbefdta == parhta && (parbefdta > 0)) ||
					(parbefdba > 0 && parhta == 0) || (parbefdba == parhta && (parbefdba > 0)) ||
					(parafdta > 0 && parhta == 0) || (parafdta == parhta && (parafdta > 0)) ||
					(parafdba > 0 && parhta == 0) || (parafdba == parhta && (parafdba > 0))
				){
					// and there is a video in position absolute. Keep position absolute
					divpaddintop = true;
				}
			}
		}while((el.nodeName.toLowerCase() != "html") && (el = el.parentNode));

		return divpaddintop;
	}

	// function flexiwidthheightdetection(){
	// set height and width to a fixed value
	// embed iframe
	// var iframe = document.querySelectorAll("iframe");
	// var i;
	// var l = iframe.length;
	// for(i = 0; i < l; i++){
	// 	try{
	// 		var iheight = iframe[i].contentDocument.body.clientHeight;
	// 		var iwidth = iframe[i].contentDocument.body.clientWidth;
	// 		iframe[i].style.height = iheight + "px";
	// 		iframe[i].style.width = iwidth + "px";
	// 	}catch(e){ console.error(e); }
	// }

	// var embed = document.querySelectorAll('embed');
	// var i;
	// var l = embed.length;
	// for(i = 0; i < l; i++){
	// if(document.defaultView && document.defaultView.getComputedStyle){
	// try{
	// var targetComputedStyleHeight = document.defaultView.getComputedStyle(embed[i],null).getPropertyValue("height");
	// var spar = targetComputedStyleHeight.replace("px","");embed[i].style.height = Math.round(spar) + "px";
	// var targetComputedStyleWidth = document.defaultView.getComputedStyle(embed[i],null).getPropertyValue("width");
	// var been = targetComputedStyleWidth.replace("px","");embed[i].style.width = Math.round(been) + "px";
	// }catch(e){ console.error(e); }
	// }
	// }
	// }

	//-----------------------------------------------

	if(mousespotlights == true){
		// no video detection
	}else{
		// CSS for pseudo
		if($("csstotlpseudo") == null){
			var totlpseudo = "*:before,*:after,*::before,*::after{z-index:auto!important}";
			var css = document.createElement("style");
			css.setAttribute("id", "csstotlpseudo");
			css.type = "text/css";
			css.appendChild(document.createTextNode(totlpseudo));
			document.getElementsByTagName("head")[0].appendChild(css);
		}

		// intelligent video detection
		// detect if not higher then z-index 1000, then make it push down
		// search for the z-index, if found something give it 'auto'

		// remove this 'strict' and 'paint' for contain

		// detect if no -webkit-transform:translateZ(0) used, if so
		// remove this and place the 'none' value
		var q = document.getElementsByTagName("*");
		var i;
		var l = q.length;
		for(i = 0; i < l; i++){
			if(q[i]){
				var st = document.defaultView.getComputedStyle(q[i], null);
				var y = st.getPropertyValue("z-Index");
				var x = st.getPropertyValue("contain");
				// var t = st.getPropertyValue("-webkit-transform") || st.getPropertyValue("-moz-transform") || st.getPropertyValue("-ms-transform") || st.getPropertyValue("-o-transform") || st.getPropertyValue("transform");

				if(q[i].shadowRoot){
					// only for open shadowRoot
					if(q[i].shadowRoot.querySelector("#rootstefan") == null){
						var otherdowncss = ".stefanvdotherdown{z-index:950!important}",
							style = document.createElement("style");
						style.id = "rootstefan";
						style.type = "text/css";
						style.appendChild(document.createTextNode(otherdowncss));
						q[i].shadowRoot.appendChild(style);
					}
					var s = q[i].shadowRoot.querySelectorAll("*");
					var j;
					var shadowrootl = s.length;
					for(j = 0; j < shadowrootl; j++){
						var computerst = document.defaultView.getComputedStyle(s[j], null);
						var k = computerst.getPropertyValue("z-Index");
						if(k >= 1000){
							s[j].classList.add("stefanvdotherdown");
						}
					}
				}

				// push below the dark layer
				if(y >= 1000){
					var elementa = document.getElementsByTagName("screenshader")[0];// Stefan screenshader tag skip
					var elementstefanvd = q[i].id; elementstefanvd = elementstefanvd.substring(0, 8); // everthing with stefanvd element is whitelist
					if(elementa == q[i].parentNode || elementstefanvd == "stefanvd" || q[i].tagName == "VIDEO"){
						// Do nothing
					}else{
						q[i].classList.add("stefanvdotherdown");
					}
				} // its value from its parent element
				// remove contain that block z-index level
				if(x == "strict" || x == "paint"){ q[i].classList.add("stefanvdcontainauto"); }
				// if(t == "matrix(1, 0, 0, 1, 0, 0)"){q[i].style.webkitTransform = 'none'; q[i].style.MozTransform = 'none'; q[i].style.msTransform = 'none'; q[i].style.OTransform = 'none'; q[i].style.transform = 'none';}
			}
		}

		// ///////// API for Website Developer
		// id way
		var websiteidapi = $("dont-turn-off-the-lights");
		if(websiteidapi){ $("dont-turn-off-the-lights").classList.add("stefanvdvideotop"); }

		// class way
		var websiteclassapi = document.getElementsByClassName("dont-turn-off-the-lights");
		var classi;
		var classl = websiteclassapi.length;
		for(classi = 0; classi < classl; classi++){ websiteclassapi[classi].classList.add("stefanvdvideotop"); }

		// ///////// HTML5 video
		// default html5 video detection

		video = document.getElementsByTagName("video");
		var videoi;
		var videol = video.length;
		for(videoi = 0; videoi < videol; videoi++){
			var targetComputedStylePosition = document.defaultView.getComputedStyle(video[videoi], null).getPropertyValue("position");
			// search for the video player, and set the previous path all to z-index "auto"
			if(searchvideopath(video[videoi]) == true && targetComputedStylePosition == "absolute"){
				video[videoi].classList.add("stefanvdposfixed");
			}

			// other file then "mp3" then run this code
			if(video[videoi].currentSrc.lastIndexOf(".mp3") == -1){ video[videoi].classList.add("stefanvdvideotop"); if(video[videoi].classList.contains("stefanvdtransformauto")){ video[videoi].classList.remove("stefanvdtransformauto"); } }
			if(window.location.href.match(/((http:\/\/(.*youtube\.com\/.*))|(https:\/\/(.*youtube\.com\/.*)))/i)){
				if(no360youtube == true){
					video[videoi].style.cssText += "display:block !important";
					let webgl = document.querySelector(".webgl");
					if(webgl){ webgl.classList.add("stefanvdvideoauto"); }
				}else{
					// default the regular player
					// also the 360 frame push to front
					let webgl = document.querySelector(".webgl");
					if(webgl){ webgl.classList.add("stefanvdvideocontrolsitem"); }
				}
				var playerapi = $("player-api");
				if(playerapi){
					if(playerapi.classList.contains("stefanvdvideoauto")){ playerapi.classList.remove("stefanvdvideoauto"); }
					playerapi.classList.add("stefanvdvideocontrolsitem");
				}
			}
		}

		// default html5 video detection inside a iframe element
		/*
		try{
			var frames = document.getElementsByTagName("iframe");
			var i;
			var l = frames.length;
			for(i = 0; i < l; i++){
				var innerDoc = (frames.item(i).contentDocument) ? frames.item(i).contentDocument : frames.item(i).contentWindow.document;
				var iframeVideoTags = innerDoc.getElementsByTagName("video");
				var j;
				var q = iframeVideoTags.length;
				for(j = 0; j < q; j++){
					iframeVideoTags.item(j).classList.add('stefanvdvideotop');
				}
			}
		}catch(e){ console.error(e); }
		*/

		// Show all iframe embed video objects -> Flash detection
		if(flash == true){
			try{
				var flasht = ["object", "embed", "applet", "iframe"];
				var flashtlength = flasht.length;
				var flashj;
				for(flashj = 0; flashj < flashtlength; ++flashj){
					let a = document.getElementsByTagName(flasht);
					let i, l = a.length;
					for(i = 0; i < l; i++){
						// Can access the elements inside the local iframe inner document
						var innerDoc = a[i].contentDocument || a[i].contentWindow.document;
						if(innerDoc){
							let targetComputedStylePosition = document.defaultView.getComputedStyle(a[i], null).getPropertyValue("position");

							a[i].classList.add("stefanvdvideotop");

							// search for the video player, and set the previous path all to z-index "auto"
							if(searchvideopath(a[i]) == true && targetComputedStylePosition == "absolute"){
								a[i].classList.add("stefanvdposfixed");
							}
						}
					}
				}
			}catch(e){ console.error(e); }
		}else if(hardflash == true){
			var hardflasht = ["object", "embed", "applet", "iframe"];
			var hardflashtlength = hardflasht.length;
			var hardflashj;
			for(hardflashj = 0; hardflashj < hardflashtlength; ++hardflashj){
				let a = document.getElementsByTagName(hardflasht);
				let i, l = a.length;
				for(i = 0; i < l; i++){
					let targetComputedStylePosition = document.defaultView.getComputedStyle(a[i], null).getPropertyValue("position");

					a[i].classList.add("stefanvdvideotop");

					// search for the video player, and set the previous path all to z-index "auto"
					if(searchvideopath(a[i]) == true && targetComputedStylePosition == "absolute"){
						a[i].classList.add("stefanvdposfixed");
					}
				}
			}
		}

		// YouTube options
		if(window.location.href.match(/((http:\/\/(.*youtube\.com\/.*))|(https:\/\/(.*youtube\.com\/.*)))/i)){
			// Show the debug mode of YouTube
			var youtubedebuginfopanel = document.querySelectorAll("div.html5-video-info-panel");
			var ytdebuginfoi;
			var ytdebuginfol = youtubedebuginfopanel.length;
			for(ytdebuginfoi = 0; ytdebuginfoi < ytdebuginfol; ytdebuginfoi++){ youtubedebuginfopanel[ytdebuginfoi].style.zIndex = "1001"; }
			var youtubedebugpanel = document.querySelectorAll("div.ytp-dialog-holder");
			var ytdebugpani;
			var ytdebugpanl = youtubedebugpanel.length;
			for(ytdebugpani = 0; ytdebugpani < ytdebugpanl; ytdebugpani++){ youtubedebugpanel[ytdebugpani].style.zIndex = "1001"; }
			// 21 august 2015
			var youtubedebugcontextmenu = document.querySelectorAll("div.ytp-contextmenu");
			var ytdebugctxi;
			var ytdebugctxl = youtubedebugcontextmenu.length;
			for(ytdebugctxi = 0; ytdebugctxi < ytdebugctxl; ytdebugctxi++){ youtubedebugcontextmenu[ytdebugctxi].style.zIndex = "1001"; }

			// YouTube video OK
			var watch7 = $("watch7");
			if(watch7)$("watch7").style.zIndex = "auto";

			var watch7main = $("watch7-main");
			if(watch7main)$("watch7-main").style.zIndex = "auto";

			var watch7content = $("watch7-content");
			if(watch7content)$("watch7-content").style.zIndex = "auto";

			// temp fix watch7-video
			var watch7video = $("watch7-video");
			if(watch7video)$("watch7-video").style.zIndex = "auto";

			var pagemanager = $("page-manager");
			if(pagemanager)$("page-manager").style.cssText = "z-index:auto !important";

			// Shows YouTube Suggestions
			if(suggestions == true){
				// update YouTube material 21 march 2017
				var ytmaterialsuggestions = document.querySelector("ytd-watch-next-secondary-results-renderer");
				if(ytmaterialsuggestions){ ytmaterialsuggestions.classList.add("stefanvditemtop"); ytmaterialsuggestions.style.background = "white"; }
			}

			// Shows YouTube playlist
			if(playlist == true){
				// update YouTube material 21 march 2017
				var ytmaterialplaylist = document.querySelector("ytd-playlist-panel-renderer");
				if(ytmaterialplaylist){ ytmaterialplaylist.classList.add("stefanvditemtop"); }
			}

			// Shows video title
			if(videoheadline == true){
				// update YouTube material 21 march 2017
				var ytmaterialvideotitle = document.querySelector("ytd-video-primary-info-renderer");
				if(ytmaterialvideotitle){
					var ytgeth = ytmaterialvideotitle.querySelector("h1");
					if(ytgeth != null){ ytgeth.classList.add("stefanvditemtop"); ytgeth.style.color = titleinvertcolor; }
				}
			}

			// Shows YouTube Channel name
			if(head == true){
				// updated 15 january 2016
				var watch7userheader = $("watch7-user-header");
				if(watch7userheader){ $("watch7-user-header").style.zIndex = 1000; $("watch7-user-header").style.position = "relative"; }

				var ytuserinfoa = document.querySelector(".yt-user-info a");
				if(ytuserinfoa){ ytuserinfoa.style.color = "white"; }
				// update YouTube material 21 march 2017
				var ytmaterialhead = document.querySelector("ytd-video-owner-renderer");
				if(ytmaterialhead){ ytmaterialhead.classList.add("stefanvditemtop"); ytmaterialhead.style.background = "white"; }
			}

			// Shows Infobar
			if(infobar == true){
				// update YouTube material 21 march 2017
				var ytmaterialinfo = document.querySelector("ytd-video-secondary-info-renderer");
				if(ytmaterialinfo){ ytmaterialinfo.classList.add("stefanvditemtop"); ytmaterialinfo.style.background = "white"; }
			}

			// Shows like and unlike buttons
			if(likebutton == true){
				// update YouTube material 21 march 2017
				var ytmateriallikebutton = document.querySelectorAll("ytd-toggle-button-renderer");
				var ytmatlikei;
				var ytmatlikel = ytmateriallikebutton.length;
				for(ytmatlikei = 0; ytmatlikei < ytmatlikel; ytmatlikei++){
					var ytgetobject = ytmateriallikebutton[ytmatlikei].getElementsByTagName("button")[0];
					if(ytgetobject != null){
						var ytgetstring = ytgetobject.getAttribute("aria-label");
						if(ytgetstring != null){
							if(ytgetstring.substring(0, 7) == "dislike"){ ytmateriallikebutton[ytmatlikei].classList.add("stefanvditemtop"); ytmateriallikebutton[ytmatlikei].style.background = "white"; }else if(ytgetstring.substring(0, 4) == "like"){ ytmateriallikebutton[ytmatlikei].classList.add("stefanvditemtop"); ytmateriallikebutton[ytmatlikei].style.background = "white"; }
						}
					}
				}
			}

			// Shows share buttons
			if(sharebutton == true){
				// update YouTube material 21 march 2017
				var ytmaterialsharebutton = document.querySelectorAll("ytd-button-renderer");
				var ytmatsharei;
				var ytmatsharel = ytmaterialsharebutton.length;
				for(ytmatsharei = 0; ytmatsharei < ytmatsharel; ytmatsharei++){
					var ytgetshareobject = ytmaterialsharebutton[ytmatsharei].getElementsByTagName("button")[0];
					if(ytgetshareobject != null){
						var ytgetsharestring = ytgetshareobject.getAttribute("aria-label");
						if(ytgetsharestring != null){
							if(ytgetsharestring.substring(0, 5) == "Share"){ ytmaterialsharebutton[ytmatsharei].classList.add("stefanvditemtop"); ytmaterialsharebutton[ytmatsharei].style.background = "white"; }
						}
					}
				}
			}

			// Shows view count
			if(viewcount == true){
				// update YouTube material 21 march 2017
				var ytmaterialviewcount = document.querySelector("yt-view-count-renderer");
				if(ytmaterialviewcount){
					var ytgetformat = ytmaterialviewcount.querySelector(".view-count");
					if(ytgetformat != null){ ytgetformat.classList.add("stefanvditemtop"); ytgetformat.style.color = "white"; }
				}
			}

			// Shows save button
			if(addvideobutton == true){
				// update YouTube material 21 march 2017
				var ytmaterialaddbutton = document.querySelectorAll("ytd-button-renderer");
				var ytmati;
				var ytmatl = ytmaterialaddbutton.length;
				for(ytmati = 0; ytmati < ytmatl; ytmati++){
					var ytgetaddobject = ytmaterialaddbutton[ytmati].getElementsByTagName("button")[0];
					if(ytgetaddobject != null){
						var ytgetaddstring = ytgetaddobject.getAttribute("aria-label");
						if(ytgetaddstring != null){
							if(ytgetaddstring.substring(0, 4) == "Save"){ ytmaterialaddbutton[ytmati].classList.add("stefanvditemtop"); ytmaterialaddbutton[ytmati].style.background = "white"; }
						}
					}
				}
			}

			// Shows like/dislike bar
			if(likebar == true){
				// update YouTube material 21 march 2017
				var ytmateriallikebar = document.querySelector("ytd-sentiment-bar-renderer");
				if(ytmateriallikebar){ ytmateriallikebar.classList.add("stefanvditemtop"); }
			}

			// MAC & WINDOWS & LINUX
			// HTML5

			// show YouTube HTML5 annotation
			var showdiv = document.getElementsByTagName("div");
			var ytdivi;
			var ytdivl = showdiv.length;
			for(ytdivi = 0; ytdivi < ytdivl; ytdivi++){
				if(showdiv[ytdivi].className == ("video-annotations iv-module")){ showdiv[ytdivi].classList.add("stefanvdvideocontrolsitem"); }
			}

			// YouTube show annotation 25 february 2016
			var videoannotations = document.getElementsByTagName("div");
			var ytannotvidi;
			var ytannotvidl = videoannotations.length;
			for(ytannotvidi = 0; ytannotvidi < ytannotvidl; ytannotvidi++){
				if(videoannotations[ytannotvidi].className == ("video-annotations")){ videoannotations[ytannotvidi].classList.add("stefanvdvideocontrolsitem"); }
			}

			// YouTube show channel 29 february 2016
			var annotationbranding = document.getElementsByTagName("div");
			var ytannotbrandi;
			var ytannotbrandl = annotationbranding.length;
			for(ytannotbrandi = 0; ytannotbrandi < ytannotbrandl; ytannotbrandi++){ if(annotationbranding[ytannotbrandi].className == ("annotation annotation-type-custom iv-branding")){ annotationbranding[ytannotbrandi].classList.add("stefanvdvideocontrolstop"); } }

			var annotationtvpromo = document.getElementsByTagName("div");
			var ytanoti;
			var ytanotl = annotationtvpromo.length;
			for(ytanoti = 0; ytanoti < ytanotl; ytanoti++){ if(annotationtvpromo[ytanoti].className == ("annotation annotation-type-custom iv-promo iv-promo-video")){ annotationtvpromo[ytanoti].classList.add("stefanvdvideocontrolstop"); } }

			// info button
			var ytpcardsteaser = document.getElementsByTagName("div");
			var ytcardsteasi;
			var ytcardsteasl = ytpcardsteaser.length;
			for(ytcardsteasi = 0; ytcardsteasi < ytcardsteasl; ytcardsteasi++){ if(ytpcardsteaser[ytcardsteasi].className == ("ytp-cards-teaser")){ ytpcardsteaser[ytcardsteasi].classList.add("stefanvdvideocontrolsitem"); } }

			var ytpcardsbutton = document.getElementsByTagName("button");
			var ytcardi;
			var ytcardl = ytpcardsbutton.length;
			for(ytcardi = 0; ytcardi < ytcardl; ytcardi++){ if(ytpcardsbutton[ytcardi].className == ("ytp-button ytp-cards-button")){ ytpcardsbutton[ytcardi].classList.add("stefanvdvideocontrolstop"); } }

			// edit video card end screen
			var ytplayergridsafe = document.getElementsByTagName("div");
			var ytplaygridi;
			var ytplaygridl = ytplayergridsafe.length;
			for(ytplaygridi = 0; ytplaygridi < ytplaygridl; ytplaygridi++){ if(ytplayergridsafe[ytplaygridi].className == ("playergrid-safe-area")){ ytplayergridsafe[ytplaygridi].classList.add("stefanvdvideocontrolsitem"); } }

			// YouTube video sidebar info button
			var ivdrawer = document.getElementsByTagName("div");
			var ytsidebari;
			var ytsidebarl = ivdrawer.length;
			for(ytsidebari = 0; ytsidebari < ytsidebarl; ytsidebari++){ if(ivdrawer[ytsidebari].className == ("iv-drawer")){ ivdrawer[ytsidebari].classList.add("stefanvdvideocontrolsitem"); } }

			// channel page
			var c4player = $("c4-player");
			if(c4player){ c4player.classList.add("stefanvdvideocontrolsitem"); }
			var c4playercontainer = document.querySelector(".c4-player-container");
			if(c4playercontainer){ c4playercontainer.classList.add("stefanvdvideocontrolsitem"); }

			// new YouTube october 2013
			var appbarguidemenu = $("appbar-guide-menu");
			if(appbarguidemenu){ appbarguidemenu.style.zIndex = "10"; }

			var appbarguideiframemask = $("appbar-guide-iframe-mask");
			if(appbarguideiframemask){ appbarguideiframemask.style.zIndex = "-1"; }

			var guide = $("guide");
			if(guide){ guide.classList.add("stefanvdvideocontrolstop"); }

			// short and cleaner engine 2014
			var data = [["movie_player"], ["movie_player-html5"], ["watch-player"], ["html5-player"], ["video-player"], ["user_fullwidth_gadget"], ["ytp-share-panel"], ["player-container"]];
			var conf;
			for(conf in data){
				var temp = document.getElementById(data[conf][0]);
				if(temp){
					if(temp.classList.contains("stefanvdvideoauto")){ temp.classList.remove("stefanvdvideoauto"); }
					if(temp.classList.contains("stefanvdotherdown")){ temp.classList.remove("stefanvdotherdown"); }
					temp.classList.add("stefanvdvideocontrolsitem");
				}
			}

			// YouTube new player 27/04/2015 and 31/08/2015 and 29/02/2016 and 23/06/2016 and 14/09/2017
			var dclasses = ["ytp-upnext ytp-endscreen-upnext-autoplay-paused ytp-suggestion-set", "ytp-remote", "ytp-thumbnail-overlay ytp-cued-thumbnail-overlay", "ytp-spinner", "ytp-bezel", "ytp-gradient-top", "ytp-chrome-top", "ytp-gradient-bottom", "ytp-chrome-bottom", "ytp-panelpopup ytp-settings-menu", "ytp-share-panel", "ytp-playlist-menu", "ytp-related-menu", "ytp-webgl-spherical-control", "ytp-storyboard enabled", "ytp-storyboard-framepreview", "ytp-ad-progress-bar-container", "ytp-popup ytp-settings-menu", "ytp-panelpopup ytp-contextmenu", "ytp-multicam-menu", "video-controls", "html5-video-controls", "html5-video-controls ytp-block-autohide", "html5-video-controls disabled-control-seek"];
			var ytdivs = document.getElementsByTagName("div");
			var div;
			for(div in ytdivs){
				var ytelemi;
				var ytelemj = dclasses.length;
				for(ytelemi = 0; ytelemi < ytelemj; ytelemi++){
					if(hasClass(ytdivs[div], dclasses[ytelemi])){
						if(ytdivs[div].classList.contains("stefanvdvideoauto")){ ytdivs[div].classList.remove("stefanvdvideoauto"); }
						if(ytdivs[div].classList.contains("stefanvdotherdown")){ ytdivs[div].classList.remove("stefanvdotherdown"); }
						ytdivs[div].classList.add("stefanvdvideocontrolsitem");
					}
				}
			}

			// YouTube show sub title
			var subtitel = document.getElementsByTagName("div");
			var ytsubi;
			var ytsubl = subtitel.length;
			for(ytsubi = 0; ytsubi < ytsubl; ytsubi++){ if(subtitel[ytsubi].className == ("ytp-player-content ytp-subtitles-player-content")){ subtitel[i].classList.add("stefanvdvideocontrolsitem"); subtitel[ytsubi].style.pointerEvents = "none"; } }

			var ytbezel = document.getElementsByTagName("div");
			var ytbi;
			var ytbl = ytbezel.length;
			for(ytbi = 0; ytbi < ytbl; ytbi++){ if(ytbezel[ytbi].className == ("html5-bezel html5-center-overlay")){ ytbezel[ytbi].classList.add("stefanvdvideocontrolsitem"); } }

			// YouTube still showing the skip button for the ads
			var ytvideoadui = document.querySelector(".videoAdUi");
			if(ytvideoadui){ ytvideoadui.classList.add("stefanvdvideocontrolsitem"); }

			var ytvideoads = document.querySelector(".ad-overlay");
			if(ytvideoads){ ytvideoads.classList.add("stefanvdvideocontrolsitem"); }

			var ytadcon = document.querySelector(".ad-container");
			if(ytadcon){ ytadcon.classList.add("stefanvdvideocontrolsitem"); }

			// update 10 September 2018
			// fix for the TrueView video
			var ytdivvideoads = document.querySelector(".video-ads");
			if(ytdivvideoads){ ytdivvideoads.classList.add("stefanvdvideocontrolsitem"); }
			//---
			// update 14 December 2018
			var ytpadoverlayslot = document.querySelector(".ytp-ad-overlay-slot");
			if(ytpadoverlayslot){ ytpadoverlayslot.classList.add("stefanvdvideocontrolsitem"); }

			// show HTML5 controls
			var ytpprogress = document.getElementsByTagName("div");
			var ytpi;
			var ytpl = ytpprogress.length;
			for(ytpi = 0; ytpi < ytpl; ytpi++){ if(ytpprogress[ytpi].className == ("ytp-progress-bar-container")){ ytpprogress[ytpi].classList.add("stefanvdvideocontrolstop"); } }

			// popup share container
			var ytpopupsharecon = document.querySelector("ytd-popup-container");
			if(ytpopupsharecon){ ytpopupsharecon.classList.add("stefanvdvideocontrolstop"); ytpopupsharecon.style.position = "absolute"; }

			// end screen
			var ytendscreen = document.querySelector(".html5-endscreen");
			if(ytendscreen){ ytendscreen.classList.add("stefanvdvideocontrolsitem"); }

			// movie sidebar
			var ytmovieside = document.querySelector(".ytp-ypc-player-content");
			if(ytmovieside){ ytmovieside.classList.add("stefanvdvideocontrolsitem"); }
		} // end YouTube

		// iframe HTML5 video
		// see inside video-player-status.js

		// ///////// Turn Off the Lights -> on
		if(!window.location.href.match(/((http:\/\/(.*youtube\.com\/.*))|(https:\/\/(.*youtube\.com\/.*)))/i)){
			// flash detection off for youtube.com
			// video detection: iframe object embed
			var embedplayer = document.querySelectorAll("iframe,object,embed");
			var embedi;
			var embedl = embedplayer.length;
			for(embedi = 0; embedi < embedl; embedi++){
				// video list
				var insideframe = embedplayer[embedi].src;
				if(embedplayer[embedi].tagName == "IFRAME" || embedplayer[embedi].tagName == "EMBED"){ insideframe = embedplayer[embedi].src; }else if(embedplayer[embedi].tagName == "OBJECT"){ insideframe = embedplayer[embedi].data; }

				var allowedHosts = ["//www.youtube.com", "//www.youtube-nocookie.com", "http://www.youtube.com", "https://www.youtube.com", "http://www.youtube-nocookie.com", "https://www.youtube-nocookie.com", "https://youtube.com", "http://youtube.com", "http://vimeo.com", "https://vimeo.com", "http://player.vimeo.com", "https://player.vimeo.com", "https://secure-a.vimeocdn.com", "http://a.vimeocdn.com", "https://a.vimeocdn.com", "http://www.dailymotion.com", "https://www.dailymotion.com", "http://static1.dmcdn.net", "https://static1.dmcdn.net", "http://videoplayer.vevo.com", "https://videoplayer.vevo.com", "http://embed.itunes.apple.com", "https://embed.itunes.apple.com", "http://emp.bbc.com/emp", "https://emp.bbc.com/emp", "http://vk.com/video", "https://vk.com/video", "http://vk.com/swf", "https://vk.com/swf", "http://www.facebook.com/v/", "https://www.facebook.com/v/", "http://static.ak.fbcdn.net", "https://static.ak.fbcdn.net", "http://static.ak.facebook.com", "https://static.ak.facebook.com", "http://s-static.ak.facebook.com", "https://s-static.ak.facebook.com", "http://fbstatic-a.akamaihd.net", "https://fbstatic-a.akamaihd.net", "http://www.facebook.com/video/", "https://www.facebook.com/video/", "http://twitter.com/i/videos", "https://twitter.com/i/videos", "http://lads.myspace.com/videos", "https://lads.myspace.com/videos", "http://www.hulu.com/embed", "https://www.hulu.com/embed", "https://www.hulu.com/site-player", "http://www.hulu.com/site-player", "http://player.hulu.com", "https://player.hulu.com", "http://blip.tv", "http://blip.tv", "http://a.blip.tv", "https://a.blip.tv", "http://l.yimg.com", "https://l.yimg.com", "http://www.metacafe.com", "https://www.metacafe.com", "http://www-cdn.justin.tv", "https://www-cdn.justin.tv", "http://twitch.tv", "https://twitch.tv", "http://www-cdn.jtvnw.net", "https://www-cdn.jtvnw.net", "http://player.twitch.tv", "https://player.twitch.tv", "http://nl.ign.com", "https://nl.ign.com", "http://s.mcstatic.com", "https://s.mcstatic.com", "http://is4.myvideo.de", "https://is4.myvideo.de", "http://player.ooyala.com", "https://player.ooyala.com", "http://i.nflcdn.com", "https://i.nflcdn.com", "http://cfiles.5min.com", "https://cfiles.5min.com", "http://can.cbs.com", "https://can.cbs.com", "http://player.rts.ch", "https://player.rts.ch", "http://cdn.livestream.com", "https://cdn.livestream.com", "http://static-cdn1.ustream.tv", "https://static-cdn1.ustream.tv", "http://static.ak.crunchyroll.com", "https://static.ak.crunchyroll.com", "https://static.crunchyroll.com", "http://video.ted.com", "https://video.ted.com", "http://embed.ted.com", "https://embed.ted.com", "http://metatube.com", "https://metatube.com", "http://www.redditmedia.com/mediaembed", "https://www.redditmedia.com/mediaembed", "https://embeds.vice.com", "https://embeds.vice.com", "http://videohosting.sidereel.com", "https://videohosting.sidereel.com", "http://rutube.ru/video/embed", "https://rutube.ru/video/embed", "http://vine.co/v", "https://vine.co/v", "http://web.microsoftstream.com/embed/video", "https://web.microsoftstream.com/embed/video", "http://rtssatweb.videostreaming.rs/player.php", "http://rtssatweb.videostreaming.rs/player.php", "http://embed.break.com", "https://embed.break.com", "https://media1.break.com", "https://media1.break.com", "http://www.collegehumor.com", "https://www.collegehumor.com", "http://0.static.collegehumor.cvcdn.com", "https://0.static.collegehumor.cvcdn.com", "http://hub.video.msn.com", "https://hub.video.msn.com", "http://img.widgets.video.s-msn.com", "https://img.widgets.video.s-msn.com", "http://flash.pcworld.com/video", "https://flash.pcworld.com/video", "https://safe.txmblr.com/svc/embed/iframe", "https://safe.txmblr.com/svc/embed/iframe", "http://player.cntv.cn", "https://player.cntv.cn", "http://js.kankan.xunlei.com/player", "https://js.kankan.xunlei.com/player", "http://tv.sohu.com", "https://tv.sohu.com", "http://www.iqiyi.com", "https://www.iqiyi.com", "http://static1.mtime.cn", "https://static1.mtime.cn", "http://movie.mtime.com", "https://movie.mtime.com", "http://movie.douban.com", "https://movie.douban.com", "http://static.m1905.com", "https://static.m1905.com", "http://imgcache.qq.com", "https://imgcache.qq.com", "http://s1.56img.com", "https://s1.56img.com", "http://player.video.qiyi.com", "https://player.video.qiyi.com", "http://vxml.ifengimg.com/swf", "https://vxml.ifengimg.com/swf", "http://live.nicovideo.jp/embed", "https://live.nicovideo.jp/embed", "http://ssl.acfun.tv/block-player-homura.html", "https://ssl.acfun.tv/block-player-homura.html", "http://www.ceskatelevize.cz/ivysilani/embed", "https://www.ceskatelevize.cz/ivysilani/embed", "http://cdn.embedly.com/widgets", "https://cdn.embedly.com/widgets", "http://player.theplatform.com", "https://player.theplatform.com", "http://player.youku.com", "https://player.youku.com", "http://static.youku.com", "https://static.youku.com", "https://embed.tv.apple.com"];

				var p;
				for(p = 0; p < allowedHosts.length; p++){
					// website URL include in the whitelist array
					if(insideframe.startsWith(allowedHosts[p]) == true){
						// current video to front
						let targetComputedStyleHeight = document.defaultView.getComputedStyle(embedplayer[embedi], null).getPropertyValue("height");
						let spar = targetComputedStyleHeight.replace("px", "");
						let targetComputedStyleWidth = document.defaultView.getComputedStyle(embedplayer[embedi], null).getPropertyValue("width");
						let been = targetComputedStyleWidth.replace("px", "");
						let targetComputedStylePosition = document.defaultView.getComputedStyle(embedplayer[embedi], null).getPropertyValue("position");
						embedplayer[embedi].classList.add("stefanvdvideotop");
						embedplayer[embedi].style.cssText = "height:" + Math.round(spar) + "px; width:" + Math.round(been) + "px; display: block;";
						// search for the video player, and set the previous path all to z-index "auto"
						if(searchvideopath(embedplayer[embedi]) == true && targetComputedStylePosition == "absolute"){
							embedplayer[embedi].classList.add("stefanvdposfixed");
						}

						// double check to remove all other CSS classes
						if(embedplayer[embedi].classList.contains("stefanvdotherdown")){ embedplayer[embedi].classList.remove("stefanvdotherdown"); }
						if(embedplayer[embedi].classList.contains("stefanvdvideocontrolstop")){ embedplayer[embedi].classList.remove("stefanvdvideocontrolstop"); }
						if(embedplayer[embedi].classList.contains("stefanvdvideocontrolsitem")){ embedplayer[embedi].classList.remove("stefanvdvideocontrolsitem"); }
						if(embedplayer[embedi].classList.contains("stefanvditemtop")){ embedplayer[embedi].classList.remove("stefanvditemtop"); }
						if(embedplayer[embedi].classList.contains("stefanvdvideoauto")){ embedplayer[embedi].classList.remove("stefanvdvideoauto"); }
						//---
					}
				}

			}

		}

		// ///////// Video
		// Vimeo, fixed show video
		if(window.location.href.match(/((http:\/\/(.*vimeo\.com\/.*|.*vimeo\.com\/.*\/b\/.*|.*vimeo\.com\/.*\/w\/.*))|(https:\/\/(.*vimeo\.com\/.*|.*vimeo\.com\/.*\/b\/.*|.*vimeo\.com\/.*\/w\/.*)))/i)){
			// 30/03/2014 show the controls
			var vimeocontrols = document.querySelector(".controls");
			if(vimeocontrols){ vimeocontrols.classList.add("stefanvdvideocontrolsitem"); }

			var vimeosidedock = document.querySelector(".sidedock");
			if(vimeosidedock){ vimeosidedock.classList.add("stefanvdvideocontrolsitem"); }

			var vimeotitle = document.querySelector(".title");
			if(vimeotitle){ vimeotitle.classList.add("stefanvdvideocontrolsitem"); }

			var vimeotarget = document.querySelector(".target");
			if(vimeotarget){ vimeotarget.classList.add("stefanvdvideocontrolsitem"); }

			var vimeovideo = document.querySelector(".video");
			if(vimeovideo){ vimeovideo.classList.add("stefanvdvideocontrolsitem"); }
			// fixed 25/03/2016
			var vimeocontainer = document.querySelectorAll("div.player_container");
			var vimeoconi;
			var vimeoconl = vimeocontainer.length;
			for(vimeoconi = 0; vimeoconi < vimeoconl; vimeoconi++){ vimeocontainer[vimeoconi].style.transform = "initial"; vimeocontainer[vimeoconi].style.webkitTransform = "initial"; vimeocontainer[vimeoconi].style.margin = "auto"; vimeocontainer[vimeoconi].style.left = "0px"; vimeocontainer[vimeoconi].style.right = "0px"; }
			var vimeovideoplayerarea = document.querySelectorAll("div.player_area");
			var vemeoplayi;
			var vemeoplayl = vimeovideoplayerarea.length;
			for(vemeoplayi = 0; vemeoplayi < vemeoplayl; vemeoplayi++){ vimeovideoplayerarea[vemeoplayi].style.transformStyle = "initial"; vimeovideoplayerarea[vemeoplayi].style.webkitTransformStyle = "initial"; }

			var vimeoprogress = document.querySelector(".progress");
			if(vimeoprogress){ vimeoprogress.classList.add("stefanvdvideocontrolsitem"); }
			var vimeoplayed = document.querySelector(".played");
			if(vimeoplayed){ vimeoplayed.classList.add("stefanvdvideocontrolsitem"); }
			// 18/08/2018
			var vppreview = document.querySelector(".vp-preview");
			if(vppreview){ vppreview.classList.add("stefanvdvideocontrolsitem"); }

			var vpcontrols = document.querySelector(".vp-controls");
			if(vpcontrols){ vpcontrols.classList.add("stefanvdvideocontrolsitem"); }

			var vpsidedock = document.querySelector(".vp-sidedock");
			if(vpsidedock){ vpsidedock.classList.add("stefanvdvideocontrolsitem"); }

			var vptitle = document.querySelector(".vp-title");
			if(vptitle){ vptitle.classList.add("stefanvdvideocontrolsitem"); }
		}else if(window.location.href.match(/((http:\/\/(.*dailymotion\.com\/.*|.*dailymotion\.com\/video\/.*))|(https:\/\/(.*dailymotion\.com\/.*|.*dailymotion\.com\/video\/.*)))/i)){
			// Dailymotion, fixed show video
			// inject CSS for head
			try{
				var totldailymotion = ".np_ButtonWatermark,.np_Darken,.np_ControlsManager,.np_Gesture,.np_dialog,.np_menu,.np_MenuSettings,.np_row--info,.dmp_SubtitleView{z-index:1001!important}";

				if($("csstotldailymotion")){
					let elem = document.getElementById("csstotldailymotion");
					elem.parentElement.removeChild(elem);
				}

				var dailymotioncss = document.createElement("style");
				dailymotioncss.setAttribute("id", "csstotldailymotion");
				dailymotioncss.type = "text/css";
				dailymotioncss.appendChild(document.createTextNode(totldailymotion));
				document.getElementsByTagName("head")[0].appendChild(dailymotioncss);
			}catch(e){ console.error(e); }
		}else if(window.location.href.match(/((http:\/\/.*vk\.com\/.*)|(https:\/\/.*vk\.com\/.*))/i)){
			// vk.com, fixed show video
			var videoplayer = $("video_player");
			if(videoplayer){ $("video_player").classList.add("stefanvdvideocontrolsitem"); }

			var layerbg = $("layer_bg");
			if(layerbg){ layerbg.style.cssText += "position:absolute !important"; }

			var mvlayerwrap = $("mv_layer_wrap");
			if(mvlayerwrap){ mvlayerwrap.style.cssText += "position:absolute !important"; }
		}else if(window.location.href.match(/((http:\/\/.*steampowered\.com\/.*)|(https:\/\/.*steampowered\.com\/.*))/i)){
			// steampowered.com, fixed show control
			div = document.getElementsByTagName("div");
			var steampowi;
			var steampowl = div.length;
			for(steampowi = 0; steampowi < steampowl; steampowi++){ if(div[steampowi].className == ("html5_video_overlay")){ div[steampowi].classList.add("stefanvdvideocontrolsitem"); } }
		}else if(window.location.href.match(/((http:\/\/.*twitch\.tv\/.*)|(https:\/\/.*twitch\.tv\/.*))/i)){
			// twich.tv
			// fixed 15 january 2016
			div = document.getElementsByTagName("div");
			var twitchi;
			var twitchl = div.length;
			for(twitchi = 0; twitchi < twitchl; twitchi++){
				if(div[twitchi].className == ("player-video")){ div[twitchi].style.height = "100%"; }
			}

			var twzdefault = document.querySelectorAll(".tw-z-default");
			[].forEach.call(twzdefault, function(el){
				el.style.cssText += "z-index:auto !important";
			});

			// controls
			var playerui = document.querySelectorAll(".player-ui");
			[].forEach.call(playerui, function(el){
				el.classList.add("stefanvdvideocontrolsitem");
				el.style.position = "absolute";
				el.style.top = "0";
				el.style.right = "0";
				el.style.height = "100%";
				el.style.width = "100%";
			});
			// play button overlay
			var playoverlay = document.querySelectorAll(".player-play-overlay");
			[].forEach.call(playoverlay, function(el){
				el.classList.add("stefanvdvideocontrolsitem");
			});
			// play button
			var playerbutton = document.querySelectorAll(".player-button");
			[].forEach.call(playerbutton, function(el){
				el.classList.add("stefanvdvideocontrolsitem");
			});
		}else if(window.location.href.match(/((http:\/\/.*yahoo\.com\/.*)|(https:\/\/.*yahoo\.com\/.*))/i)){
			// yahoo
			// fixed 15 january 2016
			var elems = document.querySelectorAll(".yvp-bottom-bar");
			[].forEach.call(elems, function(el){
				el.classList.add("stefanvdvideocontrolstop");
			});
		}else if(window.location.href.match(/((http:\/\/.*facebook\.com\/.*)|(https:\/\/.*facebook\.com\/.*))/i)){
			// facebook.com - show the video player control
			// fixed 21 january 2016
			// separate video page
			var videoStage = document.getElementsByClassName("videoStage");
			var fbvideoi;
			var fbivideol = videoStage.length;
			for(fbvideoi = 0; fbvideoi < fbivideol; fbvideoi++){
				videoStage[fbvideoi].classList.add("stefanvdvideocontrolsitem");
				div = videoStage[fbvideoi].getElementsByTagName("div");
				let j;
				let q = div.length;
				for(j = 0; j < q; j++){
					// all div get a higher level
					div[j].classList.add("stefanvdvideocontrolsitem");
				}
			}
			// main facebook video control
			var i5q = document.getElementsByClassName("_i5q");
			var fbi;
			var fbl = i5q.length;
			for(fbi = 0; fbi < fbl; fbi++){
				i5q[fbi].classList.add("stefanvdvideocontrolsitem");
				div = i5q[fbi].getElementsByTagName("div");
				let j;
				let q = div.length;
				for(j = 0; j < q; j++){
					// all div get a higher level
					div[j].classList.add("stefanvdvideocontrolsitem");
				}
			}
		}else if(window.location.href.match(/((http:\/\/(.*netflix\.com\/watch\/.*))|(https:\/\/(.*netflix\.com\/watch\/.*)))/i)){
			// Netflix, fullscreen video player -> block
			// it's a video player. Then do nothing
			activatelightsoff = false;
			document.getElementsByTagName("video")[0].style.cssText += "z-index:auto !important;position:absolute;width:100%;height:100%";
		}

	}
}); // end storage

// Flash games
// Windows Media Player
// Silverlight
// Quicktime
// -> object,embed,applet,iframe
// -> turn on the flash detection

// /////////

// Black div on
var blackon = $("stefanvdlightareoff1");

function reader(){
	// save the current reader bar settings, before remove it
	if(readera == true){
		var readerontext;
		var readeronrange;
		var readerlargestyle;

		readerontext = $("totlgammaVal");
		readeronrange = $("totlrange");
		if(readerontext != null && readeronrange != null){
			chrome.storage.sync.set({"interval": readerontext.value});
		}

		readerlargestyle = $("stefanvdreaderbar");
		if(readerlargestyle != null){
			if(readerlargestyle.style.width == "30px"){ chrome.storage.sync.set({"readerlargestyle": false}); }else{ chrome.storage.sync.set({"readerlargestyle": true}); }
		}
	}

	var stefanvdreaderbar = $("stefanvdreaderbar");
	if(stefanvdreaderbar){ document.body.removeChild(stefanvdreaderbar); }

	// remove help div
	var stefanvdlightareoffcustom = $("stefanvdlightareoffcustom");
	if(stefanvdlightareoffcustom){
		document.body.removeChild(stefanvdlightareoffcustom);
		document.body.style.cursor = "default";
	}
	window.onpointermove = null;

	function ytresettxtcolor(a){
		if(a != null){ a.style.color = ""; }
	}

	// Set everything back to the default YouTube theme
	if(window.location.href.match(/((http:\/\/(.*youtube\.com\/.*))|(https:\/\/(.*youtube\.com\/.*)))/i)){
		// update YouTube material 6 August 2017
		var ytmaterialinfo = document.querySelector("ytd-video-secondary-info-renderer");
		if(ytmaterialinfo){ ytmaterialinfo.style.background = ""; }

		// YouTube like button
		var ytmateriallikebutton = document.querySelectorAll("ytd-toggle-button-renderer");
		var i;
		var l = ytmateriallikebutton.length;
		for(i = 0; i < l; i++){
			var ytgetobject = ytmateriallikebutton[i].getElementsByTagName("button")[0];
			if(ytgetobject != null){
				var ytgetstring = ytgetobject.getAttribute("aria-label");
				if(ytgetstring != null){
					if(ytgetstring.substring(0, 7) == "dislike"){ ytmateriallikebutton[i].style.background = ""; }else if(ytgetstring.substring(0, 4) == "like"){ ytmateriallikebutton[i].style.background = ""; }
				}
			}
		}

		// YouTube share button
		var ytmaterialsharebutton = document.querySelectorAll("ytd-button-renderer");
		var sharei;
		var sharel = ytmaterialsharebutton.length;
		for(sharei = 0; sharei < sharel; sharei++){
			var ytgetshareobject = ytmaterialsharebutton[sharei].getElementsByTagName("button")[0];
			if(ytgetshareobject != null){
				var ytgetsharestring = ytgetshareobject.getAttribute("aria-label");
				if(ytgetsharestring != null){
					if(ytgetsharestring.substring(0, 5) == "Share"){ ytmaterialsharebutton[sharei].style.background = ""; }
				}
			}
		}

		// YouTube save button
		var ytmaterialsavebutton = document.querySelectorAll("ytd-button-renderer");
		var savei;
		var savel = ytmaterialsavebutton.length;
		for(savei = 0; savei < savel; savei++){
			var ytgetsaveobject = ytmaterialsavebutton[savei].getElementsByTagName("button")[0];
			if(ytgetsaveobject != null){
				var ytgetsavestring = ytgetsaveobject.getAttribute("aria-label");
				if(ytgetsavestring != null){
					if(ytgetsavestring.substring(0, 4) == "Save"){ ytmaterialsavebutton[savei].style.background = ""; }
				}
			}
		}

		// YouTube head
		var ytmaterialhead = document.querySelector("ytd-video-owner-renderer");
		if(ytmaterialhead){ ytmaterialhead.style.background = ""; }

		// YouTube suggestions
		var ytmaterialsuggestions = document.querySelector("ytd-watch-next-secondary-results-renderer");
		if(ytmaterialsuggestions){ ytmaterialsuggestions.style.background = ""; }

		// YouTube video title
		var ytmaterialvideotitle = document.querySelector("ytd-video-primary-info-renderer");
		if(ytmaterialvideotitle){
			var ytgeth = ytmaterialvideotitle.querySelector("h1");
			ytresettxtcolor(ytgeth);
		}

		// YouTube view count
		var ytmaterialviewcount = document.querySelector("yt-view-count-renderer");
		if(ytmaterialviewcount){
			var ytgetformat = ytmaterialviewcount.querySelector(".view-count");
			ytresettxtcolor(ytgetformat);
		}

		// old YouTube -----
		// YouTube video suggestions (set back to default)
		var watch7sidebar = $("watch7-sidebar");
		if(watch7sidebar){ watch7sidebar.style.zIndex = "auto"; }

		// YouTube playlist (set back to default)
		var watchappbarplaylist = $("watch-appbar-playlist");
		if(watchappbarplaylist){ watchappbarplaylist.style.zIndex = "3"; }

		// YouTube video title (set back to default)
		var eowtitle = $("eow-title");
		if(eowtitle){ eowtitle.style.color = "#222"; eowtitle.style.zIndex = "auto"; eowtitle.style.position = "relative"; }

		// YouTube video channel link back black (set back to default)
		var watch7userheader = $("watch7-user-header");
		if(watch7userheader){ watch7userheader.style.zIndex = "auto"; watch7userheader.style.position = "relative"; }

		var ytuserinfoa = document.querySelector(".yt-user-info a");
		if(ytuserinfoa){ ytuserinfoa.style.color = "#333"; }

		// YouTube infobar (set back to default)
		var watchdescription = $("watch-description");
		if(watchdescription){ watchdescription.style.zIndex = "auto"; watchdescription.style.background = "transparent"; }

		// YouTube infobar (set back to default)
		var likebuttonrenderlike = document.querySelector(".like-button-renderer-like-button");
		if(likebuttonrenderlike){ likebuttonrenderlike.style.zIndex = "auto"; likebuttonrenderlike.style.position = "relative"; likebuttonrenderlike.style.background = "transparent"; }

		var likebuttonrenderdislike = document.querySelector(".like-button-renderer-dislike-button");
		if(likebuttonrenderdislike){ likebuttonrenderdislike.style.zIndex = "auto"; likebuttonrenderdislike.style.position = "relative"; likebuttonrenderdislike.style.background = "transparent"; }

		// YouTube share buttons (set back to default)
		var actionsharepanel = document.querySelector(".action-panel-trigger-share");
		if(actionsharepanel){ actionsharepanel.style.zIndex = "auto"; actionsharepanel.style.position = "relative"; actionsharepanel.style.background = "transparent"; }

		// YouTube video view count (set back to default)
		var watchviewcount = document.querySelector(".watch-view-count");
		if(watchviewcount){ watchviewcount.style.zIndex = "auto"; watchviewcount.style.color = "#333"; }

		// YouTube video save button (set back to default)
		var addtobutton = document.querySelector(".addto-button");
		if(addtobutton){ addtobutton.style.zIndex = "auto"; addtobutton.style.position = "relative"; addtobutton.style.background = "transparent"; }

		// YouTube like bar (set back to default)
		var videoextrasparkbars = document.querySelector(".video-extras-sparkbars");
		if(videoextrasparkbars){ videoextrasparkbars.style.zIndex = "auto"; videoextrasparkbars.style.position = "relative"; }
	}
}

function setAttributes(el, attrs){
	for(var key in attrs){
		el.setAttribute(key, attrs[key]);
	}
}

function multiaddEventListeners(action, attrs, runfunc){
	for(var key in attrs){
		attrs[key].addEventListener(action, runfunc, false);
	}
}

function removeId(idname){
	var elem = document.getElementById(idname);
	if(elem){ elem.parentNode.removeChild(elem); }
}

function removeClass(classelement){
	var videotopdiv = document.querySelectorAll("." + classelement), videotopi, videotopl = videotopdiv.length;
	for(videotopi = 0; videotopi < videotopl; videotopi++){
		videotopdiv[videotopi].classList.remove(classelement);
	}
}

function removenewframe(){
	// remove dark layers
	var removedarklayerid = ["stefanvdlightareoff1", "stefanvdlightareoff2", "stefanvdlightareoff3", "stefanvdlightareoff4", "stefanvdtheater", "stefanvdblurimage", "stefanvdlightcorner", "stefanvdtheme"];
	removedarklayerid.forEach(removeId);

	var csstotlpseudo = $("csstotlpseudo");
	if(csstotlpseudo){ document.getElementsByTagName("head")[0].removeChild(csstotlpseudo); }

	// remove video player on top
	var removetoplayerclass = ["stefanvdvideotop", "stefanvditemtop", "stefanvdvideoauto", "stefanvdotherdown", "stefanvdcontainauto", "stefanvdtransformauto", "stefanvdvideocontrolsitem", "stefanvdvideocontrolstop", "stefanvdposfixed", "stefanvdpossticky"];
	removetoplayerclass.forEach(removeClass);

	// inside the root
	var q = document.getElementsByTagName("*"), i, l = q.length;
	for(i = 0; i < l; i++){
		if(q[i].shadowRoot){
			if(q[i].shadowRoot.querySelector("#rootstefan")){ q[i].shadowRoot.removeChild(q[i].shadowRoot.querySelector("#rootstefan")); }
			var rootdiv = q[i].shadowRoot.querySelectorAll(".stefanvdotherdown"), k, m = rootdiv.length;
			for(k = 0; k < m; k++){ rootdiv[k].classList.remove("stefanvdotherdown"); }
		}
	}
}

function removenewdynamic(){
	removeId("stefanvddynamicbackground");
}

// Password in document
// lockscreen make it remove or not
var i18nlockentername = chrome.i18n.getMessage("lockentername");
var i18nlockwrongpassword = chrome.i18n.getMessage("lockwrongpassword");

function lockscreen(){
	setmetatheme(true);
	var pwon2 = $("stefanvdlightareoffpw");
	if(pwon2){
		var entername = window.prompt(i18nlockentername, "");
		if(enterpassword == entername){
			document.body.removeChild(pwon2);
			if(fadeout == true){ ReducingFinished = false; fader("hide"); reader(); removenewdynamic(); }else{ removenewframe(); reader(); removenewdynamic(); }
			if(darkbrowsertheme == true){
				chrome.runtime.sendMessage({name: "browsertheme", value: "light"});
			}
		}else{ window.alert(i18nlockwrongpassword); }
	}else{
		if(fadeout == true){ ReducingFinished = false; fader("hide"); reader(); removenewdynamic(); }else{ removenewframe(); reader(); removenewdynamic(); }
		if(darkbrowsertheme == true){
			chrome.runtime.sendMessage({name: "browsertheme", value: "light"});
		}
	}
	// lamp and night mode active with one click
	if(lampandnightmode == true){
		// deactivate the feature
		// chrome.runtime.sendMessage({name: "mastertabnight"});
		var nightowlprofile, nightenabletheme;
		chrome.storage.sync.get(["nightowlprofile", "nightenabletheme"], function(response){
			nightowlprofile = response["nightowlprofile"];
			nightenabletheme = response["nightenabletheme"];
			if(nightowlprofile == true && nightenabletheme == true){
				chrome.storage.sync.set({"nightowlprofile": false});
				chrome.storage.sync.set({"nightenabletheme": false});
			}
		});
	}
}

// Mouse Actions
// Spotlight
var spot;
var spotx = 0;
var spoty = 0;
var oldspotx = 0;
var oldspoty = 0;
var fullspotlightsize, borderspotlightsize, mousespotlightstyle;
function moveSpot(e){
	if(e.clientX || e.clientY){
		spotx = e.clientX; spoty = e.clientY;
		oldspotx = spotx; oldspoty = spoty;
	}
	mousespotlightstyle = "radial-gradient(circle at " + spotx + "px " + spoty + "px, transparent " + borderspotlightsize + "px, " + lightcolor + " " + fullspotlightsize + "px)";
	spot.style.opacity = default_opacity / 100;
	spot.style.backgroundImage = mousespotlightstyle;
}

var presstimer, countupsizetimer, mathfullsizeup, mathbordersizeup;
function spotmousedown(){
	presstimer = window.setTimeout(function(){

		countupsizetimer = window.setInterval(function(){
			mathfullsizeup = Math.abs(mathfullsizeup) + Math.abs(1);
			mathbordersizeup = Math.abs(mathbordersizeup) + Math.abs(1);
			spotx = oldspotx; spoty = oldspoty;
			mousespotlightstyle = "radial-gradient(circle at " + spotx + "px " + spoty + "px, transparent " + mathbordersizeup + "px, " + lightcolor + " " + mathfullsizeup + "px)";
			spot.style.backgroundImage = mousespotlightstyle;
		}, 5);

	}, 1500);
}

function spotmouseup(){
	window.clearInterval(countupsizetimer); window.clearTimeout(presstimer);
	mousespotlightstyle = "radial-gradient(circle at " + spotx + "px " + spoty + "px, transparent " + borderspotlightsize + "px, " + lightcolor + " " + fullspotlightsize + "px)";
	spot.style.backgroundImage = mousespotlightstyle;
	mathfullsizeup = fullspotlightsize;
	mathbordersizeup = borderspotlightsize;
}
//---
// Rectangle
// change size corner
var rect; var stretchable = false;
var width, height, xpos, ypos;
var mouseX, mouseY, rX, rY;
var rand = 20;

var beginxcordinate = null; var beginycordinate = null; var endxcordinate = null; var endycordinate = null;
var customview; var posx; var posy; var initx = false; var inity = false;
function watchMouse(e){
	width = parseInt(rect.style.width); height = parseInt(rect.style.height);
	xpos = parseInt(rect.style.left); ypos = parseInt(rect.style.top);

	// Include possible scroll values
	var sx = window.scrollX || document.documentElement.scrollLeft || 0;
	var sy = window.scrollY || document.documentElement.scrollTop || 0;

	if(!e) e = window.event;

	mouseX = e.clientX + sx;
	mouseY = e.clientY + sy;

	/* Direction of mouse movement
		deltaX: -1 for left, 1 for right
		deltaY: -1 for up, 1 for down
	*/
	var deltaX = mouseX - rX;
	var deltaY = mouseY - rY;
	// Store difference in global variables
	rX = mouseX;
	rY = mouseY;

	if(mouseX <= xpos + rand && mouseX > xpos){
		// left
		dragBorder("left", deltaX); document.body.style.cursor = "w-resize";
	}else if(mouseX >= xpos + width + rand && mouseX < xpos + width + 2 * rand){
		// right
		dragBorder("right", deltaX); document.body.style.cursor = "e-resize";
	}else if(mouseY <= ypos + rand && mouseY > ypos){
		// top
		dragBorder("top", deltaY); document.body.style.cursor = "n-resize";
	}else if(mouseY >= ypos + height + rand && mouseY < ypos + height + 2 * rand){
		// bottom
		dragBorder("bottom", deltaY); document.body.style.cursor = "s-resize";
	}else{
		// normal use
		document.body.style.cursor = "auto";
	}
}

function dragBorder(arg, delta){
	if(stretchable){
		switch(arg){
		case"right":
			rect.style.width = (width + delta) + "px";
			$("stefanvdlightareoff3").style.width = (parseInt($("stefanvdlightareoff3").style.width) + delta) + "px"; $("stefanvdlightareoff3").style.left = (parseInt($("stefanvdlightareoff3").style.left) + delta) + "px";
			break;
		case"left":
			rect.style.width = (width - delta) + "px"; rect.style.left = (parseInt(rect.style.left) + delta) + "px";
			$("stefanvdlightareoff2").style.width = (parseInt($("stefanvdlightareoff2").style.width) + delta) + "px";
			break;
		case"bottom":
			rect.style.height = (height + delta) + "px";
			$("stefanvdlightareoff4").style.height = (parseInt($("stefanvdlightareoff4").style.height) - delta) + "px"; $("stefanvdlightareoff4").style.top = (parseInt($("stefanvdlightareoff4").style.top) + delta) + "px";
			$("stefanvdlightareoff2").style.height = (parseInt($("stefanvdlightareoff2").style.height) + delta) + "px";
			$("stefanvdlightareoff3").style.height = (parseInt($("stefanvdlightareoff3").style.height) + delta) + "px";
			break;
		case"top":
			rect.style.height = (height - delta) + "px"; rect.style.top = (parseInt(rect.style.top) + delta) + "px";
			$("stefanvdlightareoff1").style.height = (parseInt($("stefanvdlightareoff1").style.height) + delta) + "px";
			$("stefanvdlightareoff2").style.height = (parseInt($("stefanvdlightareoff2").style.height) - delta) + "px"; $("stefanvdlightareoff2").style.top = (parseInt($("stefanvdlightareoff2").style.top) + delta) + "px";
			$("stefanvdlightareoff3").style.height = (parseInt($("stefanvdlightareoff3").style.height) - delta) + "px"; $("stefanvdlightareoff3").style.top = (parseInt($("stefanvdlightareoff3").style.top) + delta) + "px";
			break;
		}
	}
}

function stretchout(){
	stretchable = false; document.body.style.cursor = "auto";
}

var view1; var view2; var view3; var view4;
function getMouse(obj, e){
	posx = 0; posy = 0;
	var ev = (!e) ? window.event : e;
	if(ev.clientX){
		posx = ev.clientX;
		posy = ev.clientY;
	}else{ return 0; }

	obj.addEventListener("pointerdown", function(){
		initx = posx; inity = posy;
		beginxcordinate = posx; beginycordinate = posy;
		try{
			customview = $("stefanvdlightareoffcustom");
			customview.style.left = initx + "px"; customview.style.top = inity + "px";
			document.body.appendChild(customview);
		}catch(e){ console.log(e); }
	});
	obj.addEventListener("pointerup", function(){ initx = false; inity = false; });
	if(initx){
		customview.style.width = Math.abs(posx - initx) + "px"; customview.style.height = Math.abs(posy - inity) + "px";
		customview.style.left = posx - initx < 0 ? posx + "px" : initx + "px";
		customview.style.top = posy - inity < 0 ? posy + "px" : inity + "px";

		endxcordinate = posx; endycordinate = posy;
		// remove help div
		var stefanvdlightareoffcustom = $("stefanvdlightareoffcustom");
		if(stefanvdlightareoffcustom){ document.body.removeChild(stefanvdlightareoffcustom); }
		document.body.style.cursor = "default";

		// create corner
		var cornerison = $("stefanvdlightcorner");
		if(cornerison == null){
			var newcornerdiv = document.createElement("div");
			newcornerdiv.setAttribute("id", "stefanvdlightcorner");
			document.body.appendChild(newcornerdiv);
		}

		rect = $("stefanvdlightcorner"); rect.onpointermove = watchMouse;
		$("stefanvdlightcorner").addEventListener("pointerdown", function(){ stretchable = true; }, false);
		$("stefanvdlightcorner").addEventListener("pointerup", stretchout, false);
		$("stefanvdlightcorner").addEventListener("pointerout", stretchout, false);

		setAttributes($("stefanvdlightcorner"), {"top": parseInt(document.getElementById("stefanvdlightareoff1").style.height) - 10 + "px", "height": parseInt(document.getElementById("stefanvdlightareoff2").style.height) - 20 + "px", "left": parseInt(document.getElementById("stefanvdlightareoff2").style.width) - 10 + "px", "width": parseInt(document.getElementById("stefanvdlightareoff3").style.left) - parseInt(document.getElementById("stefanvdlightareoff2").style.width) - 20 + "px"});

	}else{ return false; }
	// var viewpartwidth = customview.style.width;
	var viewpartheight = customview.style.height;

	view1 = $("stefanvdlightareoff1");
	view1.className = "stefanvdlightareoff";
	view1.style.left = 0 + "px"; view1.style.top = 0 + "px";
	view1.style.width = "100%"; view1.style.height = beginycordinate + "px";
	view1.style.visibility = "visible";
	document.body.appendChild(view1);

	view2 = $("stefanvdlightareoff2");
	view2.className = "stefanvdlightareoff";
	view2.style.left = 0 + "px"; view2.style.top = beginycordinate + "px";
	view2.style.width = beginxcordinate + "px"; view2.style.height = viewpartheight;
	view2.style.visibility = "visible";
	document.body.appendChild(view2);

	view3 = $("stefanvdlightareoff3");
	var viewcall3awidth = window.innerWidth - beginxcordinate; // calc width
	view3.className = "stefanvdlightareoff";
	view3.style.left = endxcordinate + "px"; view3.style.top = beginycordinate + "px";
	view3.style.width = viewcall3awidth + "px"; view3.style.height = viewpartheight;
	view3.style.visibility = "visible";
	document.body.appendChild(view3);

	view4 = $("stefanvdlightareoff4");
	var viewcall4aheight = window.innerHeight - endycordinate; // calc height
	view4.className = "stefanvdlightareoff";
	view4.style.left = 0 + "px"; view4.style.top = endycordinate + "px";
	view4.style.width = "100%"; view4.style.height = viewcall4aheight + "px";
	view4.style.visibility = "visible";
	document.body.appendChild(view4);

	var calcpartx = endxcordinate - beginxcordinate;
	var calcparty = endycordinate - beginycordinate;
	if((calcpartx < 0) && ! (calcparty < 0)){ // X as automatic change view
		view1 = $("stefanvdlightareoff1");
		view1.className = "stefanvdlightareoff";
		view1.style.left = 0 + "px"; view1.style.top = 0 + "px";
		view1.style.width = "100%"; view1.style.height = beginycordinate + "px";
		view1.style.visibility = "visible";
		document.body.appendChild(view1);

		view2 = $("stefanvdlightareoff2");
		view2.className = "stefanvdlightareoff";
		view2.style.left = 0 + "px"; view2.style.top = beginycordinate + "px";
		view2.style.width = endxcordinate + "px"; view2.style.height = viewpartheight;
		view2.style.visibility = "visible";
		document.body.appendChild(view2);

		view3 = $("stefanvdlightareoff3");
		var viewcall3bwidth = window.innerWidth - beginxcordinate; // calc width
		view3.className = "stefanvdlightareoff";
		view3.style.left = beginxcordinate + "px"; view3.style.top = beginycordinate + "px";
		view3.style.width = viewcall3bwidth + "px"; view3.style.height = viewpartheight;
		view3.style.visibility = "visible";
		document.body.appendChild(view3);

		view4 = $("stefanvdlightareoff4");
		var viewcall4bheight = window.innerHeight - endycordinate; // calc height
		view4.className = "stefanvdlightareoff";
		view4.style.left = 0 + "px"; view4.style.top = endycordinate + "px";
		view4.style.width = "100%"; view4.style.height = viewcall4bheight + "px";
		view4.style.visibility = "visible";
		document.body.appendChild(view4);
	}else if((calcparty < 0) && ! (calcpartx < 0)){ // Y as automatic change view
		view1 = $("stefanvdlightareoff1");
		view1.className = "stefanvdlightareoff";
		view1.style.left = 0 + "px"; view1.style.top = 0 + "px";
		if(endycordinate < 0){ endycordinate = 0; }
		view1.style.width = "100%"; view1.style.height = endycordinate + "px";
		view1.style.visibility = "visible";
		document.body.appendChild(view1);

		view2 = $("stefanvdlightareoff2");
		view2.className = "stefanvdlightareoff";
		view2.style.left = 0 + "px"; view2.style.top = endycordinate + "px";
		view2.style.width = beginxcordinate + "px";
		if(endycordinate == 0){ view2.style.height = beginycordinate + "px"; }else{ view2.style.height = viewpartheight; }
		view2.style.visibility = "visible";
		document.body.appendChild(view2);

		view3 = $("stefanvdlightareoff3");
		var viewcall3cwidth = window.innerWidth - beginxcordinate; // calc width
		view3.className = "stefanvdlightareoff";
		view3.style.left = endxcordinate + "px"; view3.style.top = endycordinate + "px";
		view3.style.width = viewcall3cwidth + "px";
		if(endycordinate == 0){ view3.style.height = beginycordinate + "px"; }else{ view3.style.height = viewpartheight; }
		view3.style.visibility = "visible";
		document.body.appendChild(view3);

		view4 = $("stefanvdlightareoff4");
		var viewcall4cheight = window.innerHeight - endycordinate; // calc height
		view4.className = "stefanvdlightareoff";
		view4.style.left = 0 + "px"; view4.style.top = beginycordinate + "px";
		view4.style.width = "100%"; view4.style.height = viewcall4cheight + "px";
		view4.style.visibility = "visible";
		document.body.appendChild(view4);
	}else if((calcpartx < 0) && (calcparty < 0)){ // X en Y as automatic change view
		view1 = $("stefanvdlightareoff1");
		view1.className = "stefanvdlightareoff";
		view1.style.left = 0 + "px"; view1.style.top = 0 + "px";
		if(endycordinate < 0){ endycordinate = 0; }
		view1.style.width = "100%"; view1.style.height = endycordinate + "px";
		view1.style.visibility = "visible";
		document.body.appendChild(view1);

		view2 = $("stefanvdlightareoff2");
		view2.className = "stefanvdlightareoff";
		view2.style.left = 0 + "px"; view2.style.top = endycordinate + "px";
		view2.style.width = endxcordinate + "px";
		if(endycordinate == 0){ view2.style.height = beginycordinate + "px"; }else{ view2.style.height = viewpartheight; }
		view2.style.visibility = "visible";
		document.body.appendChild(view2);

		view3 = $("stefanvdlightareoff3");
		var viewcall3dwidth = window.innerWidth - beginxcordinate; // calc width
		view3.className = "stefanvdlightareoff";
		view3.style.left = beginxcordinate + "px"; view3.style.top = endycordinate + "px";
		view3.style.width = viewcall3dwidth + "px";
		if(endycordinate == 0){ view3.style.height = beginycordinate + "px"; }else{ view3.style.height = viewpartheight; }
		view3.style.visibility = "visible";
		document.body.appendChild(view3);

		view4 = $("stefanvdlightareoff4");
		var viewcall4dheight = window.innerHeight - beginycordinate; // calc height
		view4.className = "stefanvdlightareoff";
		view4.style.left = 0 + "px"; view4.style.top = beginycordinate + "px";
		view4.style.width = "100%"; view4.style.height = viewcall4dheight + "px";
		view4.style.visibility = "visible";
		document.body.appendChild(view4);
	}
}
//---
// script readerbar
function showValue(newValue){
	$("totlgammaVal").value = newValue; $("totlrange").value = newValue; div = document.getElementsByTagName("div");
	var i, l = div.length;
	for(i = 0; i < l; i++){ if(div[i].className == ("stefanvdlightareoff")){ div[i].style.opacity = (newValue / 100); } }
}

function settotlreaderstyle(a, b){
	var totlreader = $("stefanvdreaderbar"); var totlreadermin = $("stefanvdreaderbartop");
	totlreader.style.width = a; totlreader.style.height = a; totlreadermin.style.opacity = b;
}

function toggle_small(){
	var totlreader = $("stefanvdreaderbar");
	if(totlreader.style.width != "30px"){ settotlreaderstyle("30px", 0); }else{ settotlreaderstyle("", 1); }
}
//---

// Dynamic Background: Smoke
// Create an array to store our particles
var particles = [];

// The amount of particles to render
var particleCount = 30;

// The maximum velocity in each direction
var maxVelocity = 2;

// The target frames per second (how often do we want to update / redraw the scene)
var targetFPS = 20;

// Set the dimensions of the canvas as variables so they can be used.
var canvasWidth = 400;
var canvasHeight = 200;

// A function to create a particle object.
function Particle(context){
	// Set the initial x and y positions
	this.x = 0;
	this.y = 0;

	// Set the initial velocity
	this.xVelocity = 0;
	this.yVelocity = 0;

	// Set the radius
	this.radius = 5;

	// Store the context which will be used to draw the particle
	this.context = context;

	// The function to draw the particle on the canvas.
	this.draw = function(){

		// If an image is set draw it
		if(this.image){
			this.context.drawImage(this.image, this.x - 128, this.y - 128);
			// If the image is being rendered do not draw the circle so break out of the draw function
			return;
		}
		// Draw the circle as before, with the addition of using the position and the radius from this object.
		this.context.beginPath();
		this.context.arc(this.x, this.y, this.radius, 0, 2 * Math.PI, false);
		this.context.fillStyle = "rgba(88, 88, 88, 1)";
		this.context.fill();
		this.context.closePath();
	};

	// Update the particle.
	this.update = function(){
		// Update the position of the particle with the addition of the velocity.
		this.x += this.xVelocity;
		this.y += this.yVelocity;

		if(this.x >= canvasWidth){
			// Check if has crossed the right edge
			this.xVelocity = -this.xVelocity;
			this.x = canvasWidth;
		}else if(this.x <= 0){
			// Check if has crossed the left edge
			this.xVelocity = -this.xVelocity;
			this.x = 0;
		}

		if(this.y >= canvasHeight){
			// Check if has crossed the bottom edge
			this.yVelocity = -this.yVelocity;
			this.y = canvasHeight;
		}else if(this.y <= 0){
			// Check if has crossed the top edge
			this.yVelocity = -this.yVelocity;
			this.y = 0;
		}
	};

	// A function to set the position of the particle.
	this.setPosition = function(x, y){
		this.x = x;
		this.y = y;
	};

	// Function to set the velocity.
	this.setVelocity = function(x, y){
		this.xVelocity = x;
		this.yVelocity = y;
	};

	this.setImage = function(image){
		this.image = image;
	};
}

// A function to generate a random number between 2 values
function generateRandom(min, max){ return Math.random() * (max - min) + min; }

var smokecontext;
// Initialise the scene and set the context if possible
function runsmoke(){
	var canvas = document.getElementById("stefanvddynamicsmoke");
	if(canvas.getContext){
		// Set the context variable so it can be re-used
		smokecontext = canvas.getContext("2d", {desynchronized: true});
		// Create the particles and set their initial positions and velocities
		var i;
		for(i = 0; i < particleCount; ++i){
			var particle = new Particle(smokecontext);

			// Set the position to be inside the canvas bounds
			particle.setPosition(generateRandom(0, canvasWidth), generateRandom(0, canvasHeight));

			// Set the initial velocity to be either random and either negative or positive
			particle.setVelocity(generateRandom(-maxVelocity, maxVelocity), generateRandom(-maxVelocity, maxVelocity));
			particles.push(particle);
		}
	}
}

// The function to draw the scene
function smokedraw(){
	// Clear the drawing surface and fill it with a black background
	smokecontext.fillStyle = "rgba(0, 0, 0, 0.0)";
	smokecontext.fillRect(0, 0, 400, 400);

	// Go through all of the particles and draw them.
	particles.forEach(function(particle){
		particle.draw();
	});
}

// Update the scene
function smokeupdate(){
	particles.forEach(function(particle){
		particle.update();
	});
}
//---
// Dynamic Background: Cloud
var layers = [];
var objects = [];
var worldXAngle = 0; var worldYAngle = 0;
function createCloud(){
	var div = document.createElement("div");
	div.className = "stefanvdcloudBase";
	var x = 256 - (Math.random() * 512);
	var y = 256 - (Math.random() * 512);
	var z = 256 - (Math.random() * 512);
	var t = "translateX(" + x + "px) translateY(" + y + "px) translateZ(" + z + "px)";
	div.style.webkitTransform = t; div.style.MozTransform = t; div.style.oTransform = t;
	world.appendChild(div);

	var j;
	var lcalc = 5 + Math.round(Math.random() * 10);
	for(j = 0; j < lcalc; j++){
		var cloud = document.createElement("div");
		cloud.style.opacity = .8;
		cloud.className = "stefanvdcloudLayer";
		var cloudx = 256 - (Math.random() * 512);
		var cloudy = 256 - (Math.random() * 512);
		var cloudz = 100 - (Math.random() * 200);
		var clouda = Math.random() * 360;
		var clouds = .25 + Math.random();
		cloudx *= .2; cloudy *= .2;
		cloud.data = {x: cloudx, y: cloudy, z: cloudz, a: clouda, s: clouds, speed: .1 * Math.random()};
		var cloudt = "translateX(" + cloudx + "px) translateY(" + cloudy + "px) translateZ(" + cloudz + "px) rotateZ(" + clouda + "deg) scale(" + clouds + ")";
		cloud.style.webkitTransform = cloudt; cloud.style.MozTransform = cloudt; cloud.style.oTransform = cloudt;
		div.appendChild(cloud);
		layers.push(cloud);
	}
	return div;
}
var world;
function generate(){
	world = document.getElementById("stefanvdworld");
	objects = [];
	if(world.hasChildNodes()){
		while(world.childNodes.length >= 1){ world.removeChild(world.firstChild); }
	}
	var j;
	for(j = 0; j < 5; j++){ objects.push(createCloud()); }
}

function cloudupdate(){
	var j, l = layers.length;
	for(j = 0; j < l; j++){
		var layer = layers[j];
		layer.data.a += layer.data.speed;
		var t = "translateX(" + layer.data.x + "px) translateY(" + layer.data.y + "px) translateZ(" + layer.data.z + "px) rotateY(" + (- worldYAngle) + "deg) rotateX(" + (- worldXAngle) + "deg) rotateZ(" + layer.data.a + "deg) scale(" + layer.data.s + ")";
		layer.style.webkitTransform = t; layer.style.MozTransform = t; layer.style.oTransform = t;
	}
	requestAnimationFrame(cloudupdate);
}
//---
// Dynamic Background: Rain
var window_width = window.innerWidth * 1.5;
var window_height = window.innerHeight * 1.5;

var fall_speed = 0.7;
var wind_speed = 5;

var rain_weight = 0.11;
var rain_color = "255,255,255";

var drop_count;
var drops = [];

var stormcanvas;
var sky;

function randomFrom(min, max){
	return(Math.random() * (max - min) + min);
}

function resizer(){
	window_width = window.innerWidth * 1.5;
	window_height = window.innerHeight * 1.5;
	drop_count = window_width * rain_weight;
	setAttributes(stormcanvas, {"width": window_width, "height": window_height});
}

function paintSky(){
	if(document.visibilityState === "visible"){
		var i;
		for(i = 0; i < drop_count; i++){
			drops[i] = new drop();
			drops[i].reset();
		}

		rain();
	}
}

function rain(){
	sky.clearRect(0, 0, window_width, window_height);

	var drops_length = drops.length;
	var i;
	for(i = 0; i < drops_length; i++){
		var drop = drops[i];
		drop.fall();
		drop.draw();
	}

	window.requestAnimFrame(rain);
}

function drop(){
	this.reset = function(){
		this.r = randomFrom(0.8, 1.6);
		this.l = (this.r * 250);
		this.x = randomFrom((window_width * -0.25), (window_width * 1.125));
		this.y = randomFrom((window_height * -0.25), (window_height * -1));
		this.dx = randomFrom((wind_speed - 3), (wind_speed + 3));
		this.dy = (this.r * (100 * fall_speed));
		this.offset = (this.l * (this.dx / this.dy));
		this.opacity = (this.r * randomFrom(0.2, 0.6));
		this.drip = this.render();
	};

	this.render = function(){
		var canv = document.createElement("canvas");
		var ctx = canv.getContext("2d", {desynchronized: true});
		canv.setAttribute("width", Math.abs(this.offset) + this.r);
		canv.setAttribute("height", this.l);

		ctx.beginPath();

		var drip = ctx.createLinearGradient(0, 0, 0, this.l);
		drip.addColorStop(0, "rgba(" + rain_color + ", 0)");
		drip.addColorStop(1, "rgba(" + rain_color + ", " + this.opacity + ")");
		ctx.fillStyle = drip;

		// sky.rect(this.x, this.y, this.r, this.l);
		var startX = (this.offset >= 0) ? 0 : Math.abs(this.offset);
		ctx.moveTo(startX, 0);
		ctx.lineTo(startX + this.r, 0);
		ctx.lineTo(startX + this.r + this.offset, this.l);
		ctx.lineTo(startX + this.offset, this.l);

		ctx.closePath();
		ctx.fill();

		return canv;
	};

	this.draw = function(){
		sky.drawImage(this.drip, this.x, this.y);
	};

	this.fall = function(){
		this.x += this.dx;
		this.y += this.dy;

		if(this.y > (window_height * 1.25)){
			this.reset();
		}
	};
}
//---
// Dynamic Background: Triangle
var refreshDuration = 10000;
var refreshTimeout;
var numPointsX;
var numPointsY;
var unitWidth;
var unitHeight;
var points;

function trianglerun(){
	var triasvg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
	setAttributes(triasvg, {"width": window.innerWidth, "height": window.innerHeight});
	document.getElementById("triangle").appendChild(triasvg);

	var unitSize = (window.innerWidth + window.innerHeight) / 20;
	numPointsX = Math.ceil(window.innerWidth / unitSize) + 1;
	numPointsY = Math.ceil(window.innerHeight / unitSize) + 1;
	unitWidth = Math.ceil(window.innerWidth / (numPointsX - 1));
	unitHeight = Math.ceil(window.innerHeight / (numPointsY - 1));

	points = [];

	var y;
	for(y = 0; y < numPointsY; y++){
		var x;
		for(x = 0; x < numPointsX; x++){
			points.push({x:unitWidth * x, y:unitHeight * y, originX:unitWidth * x, originY:unitHeight * y});
		}
	}

	trianglerandomize();

	var i;
	var l = points.length;
	for(i = 0; i < l; i++){
		if(points[i].originX != unitWidth * (numPointsX - 1) && points[i].originY != unitHeight * (numPointsY - 1)){
			var topLeftX = points[i].x;
			var topLeftY = points[i].y;
			var topRightX = points[i + 1].x;
			var topRightY = points[i + 1].y;
			var bottomLeftX = points[i + numPointsX].x;
			var bottomLeftY = points[i + numPointsX].y;
			var bottomRightX = points[i + numPointsX + 1].x;
			var bottomRightY = points[i + numPointsX + 1].y;

			var rando = Math.floor(Math.random() * 2);

			var n;
			for(n = 0; n < 2; n++){
				var polygon = document.createElementNS(triasvg.namespaceURI, "polygon");

				if(rando == 0){
					if(n == 0){
						polygon.point1 = i;
						polygon.point2 = i + numPointsX;
						polygon.point3 = i + numPointsX + 1;
						polygon.setAttribute("points", topLeftX + "," + topLeftY + " " + bottomLeftX + "," + bottomLeftY + " " + bottomRightX + "," + bottomRightY);
					}else if(n == 1){
						polygon.point1 = i;
						polygon.point2 = i + 1;
						polygon.point3 = i + numPointsX + 1;
						polygon.setAttribute("points", topLeftX + "," + topLeftY + " " + topRightX + "," + topRightY + " " + bottomRightX + "," + bottomRightY);
					}
				}else if(rando == 1){
					if(n == 0){
						polygon.point1 = i;
						polygon.point2 = i + numPointsX;
						polygon.point3 = i + 1;
						polygon.setAttribute("points", topLeftX + "," + topLeftY + " " + bottomLeftX + "," + bottomLeftY + " " + topRightX + "," + topRightY);
					}else if(n == 1){
						polygon.point1 = i + numPointsX;
						polygon.point2 = i + 1;
						polygon.point3 = i + numPointsX + 1;
						polygon.setAttribute("points", bottomLeftX + "," + bottomLeftY + " " + topRightX + "," + topRightY + " " + bottomRightX + "," + bottomRightY);
					}
				}
				polygon.setAttribute("fill", "rgba(0,0,0," + (Math.random() / 3) + ")");
				var animate = document.createElementNS("http://www.w3.org/2000/svg", "animate");
				setAttributes(animate, {"fill": "freeze", "attributeName": "points", "dur": refreshDuration + "ms", "calcMode": "linear"});
				polygon.appendChild(animate);
				triasvg.appendChild(polygon);
			}
		}
	}
	trianglerefresh();
}

function trianglerandomize(){
	var i;
	var l = points.length;
	for(i = 0; i < l; i++){
		if(points[i].originX != 0 && points[i].originX != unitWidth * (numPointsX - 1)){
			points[i].x = points[i].originX + Math.random() * unitWidth - unitWidth / 2;
		}
		if(points[i].originY != 0 && points[i].originY != unitHeight * (numPointsY - 1)){
			points[i].y = points[i].originY + Math.random() * unitHeight - unitHeight / 2;
		}
	}
}

function trianglerefresh(){
	if(document.visibilityState === "visible"){
		trianglerandomize();
		var l = document.querySelector("#triangle svg").childNodes;
		l.forEach(function(item){
			var polygon = item;
			var animate = polygon.childNodes[0];
			if(animate.getAttribute("to")){
				animate.setAttribute("from", animate.getAttribute("to"));
			}
			animate.setAttribute("to", points[polygon.point1].x + "," + points[polygon.point1].y + " " + points[polygon.point2].x + "," + points[polygon.point2].y + " " + points[polygon.point3].x + "," + points[polygon.point3].y);
			animate.beginElement();
		});
		refreshTimeout = window.setTimeout(function(){ trianglerefresh(); }, refreshDuration);
	}
}

function onResize(){
	if(document.getElementById("stefanvddynamicbackground")){
		var elem = document.querySelector("#triangle svg");
		if(elem){ elem.parentNode.removeChild(elem); }
		window.clearTimeout(refreshTimeout);
		trianglerun();
	}
}

var fg_red, fg_green, fg_blue, result_red, result_green, result_blue, result;
function newconvertHex(hex, opacity){
	hex = hex.replace("#", "");
	var alpha = opacity / 100;
	fg_red = parseInt(hex.substring(0, 2), 16);
	fg_green = parseInt(hex.substring(2, 4), 16);
	fg_blue = parseInt(hex.substring(4, 6), 16);

	result_red = fg_red * alpha + 255 * (1 - alpha);
	result_green = fg_green * alpha + 255 * (1 - alpha);
	result_blue = fg_blue * alpha + 255 * (1 - alpha);

	result = "rgb(" + result_red + "," + result_green + "," + result_blue + ")";
	return result;
}

var currentwebthemelight = "#ffffff";
var currentwebthemedark = "#ffffff";
function getdefaultmetatheme(){
	if($("stefanvdtheme")){
		var myElement = document.getElementById("stefanvdtheme");
		currentwebthemelight = myElement.getAttribute("data-themelight");
		currentwebthemedark = myElement.getAttribute("data-themedark");
	}else{
		const metas = document.getElementsByTagName("meta");
		let i, l = metas.length;
		for(i = 0; i < l; i++){
			if(metas[i].getAttribute("name") == "theme-color"){
				if(metas[i].getAttribute("media")){
					if(metas[i].getAttribute("media") == "(prefers-color-scheme: light)"){
						currentwebthemelight = metas[i].getAttribute("content");
					}else if(metas[i].getAttribute("media") == "(prefers-color-scheme: dark)"){
						currentwebthemedark = metas[i].getAttribute("content");
					}
				}else{
					currentwebthemedark = currentwebthemelight = metas[i].getAttribute("content");
				}
			}
		}
		const newDiv = document.createElement("div");
		newDiv.id = "stefanvdtheme";
		newDiv.className = "totltheme";
		newDiv.setAttribute("data-themelight", currentwebthemelight);
		newDiv.setAttribute("data-themedark", currentwebthemedark);
		document.body.appendChild(newDiv);
	}
}

function setmetatheme(a){
	const metas = document.getElementsByTagName("meta");
	var darktheme;
	var lighttheme;

	var newlightoffcolor = newconvertHex(lightcolor, interval);
	if(a == true){
		// light is off
		darktheme = currentwebthemedark;
		lighttheme = currentwebthemelight;
	}else{
		// light is on
		darktheme = newlightoffcolor;
		lighttheme = newlightoffcolor;
	}

	let i, l = metas.length;
	for(i = 0; i < l; i++){
		if(metas[i].getAttribute("name") == "theme-color"){
			if(metas[i].getAttribute("media")){
				if(metas[i].getAttribute("media") == "(prefers-color-scheme: light)"){
					metas[i].setAttribute("content", lighttheme);
				}else if(metas[i].getAttribute("media") == "(prefers-color-scheme: dark)"){
					metas[i].setAttribute("content", darktheme);
				}
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

function lightsgoonoroff(){
	// save default meta theme color
	getdefaultmetatheme();

	// lamp and night mode active with one click
	if(lampandnightmode == true){
		chrome.runtime.sendMessage({name: "mastertabnight"});
		return;
	}

	if(blackon){
		lockscreen();
	}else{
		setmetatheme(false);

		if(darkbrowsertheme == true){
			chrome.runtime.sendMessage({name: "browsertheme", value: "dark"});
		}

		// multi opacity
		var currentURL = window.location.href;
		currentURL = currentURL.match(/^[\w-]+:\/*\[?([\w.:-]+)\]?(?::\d+)?/)[0];
		if(multiopacall == true){
			default_opacity = interval;
		}else{
			var atbbuf = [], domain;
			for(domain in multiopacityDomains){ atbbuf.push(domain); atbbuf.sort(); }
			var i, l = atbbuf.length;
			for(i = 0; i < l; i++){
				if(atbbuf[i] == currentURL){
					var editzoom = multiopacityDomains[atbbuf[i]];
					default_opacity = editzoom;
				}
			}
		}

		if(mousespotlighta == true){
			var newframe1always = document.createElement("div");
			setAttributes(newframe1always, {"id": "stefanvdlightareoff1", "class": "stefanvdlightareoff"});
			fullspotlightsize = spotlightradius;
			borderspotlightsize = spotlightradius - 8;
			mousespotlightstyle = "radial-gradient(circle at " + spotx + "px " + spoty + "px, transparent " + borderspotlightsize + "px, " + lightcolor + " " + fullspotlightsize + "px)";

			newframe1always.style.backgroundImage = mousespotlightstyle;
			newframe1always.style.pointerEvents = "none"; // make it possible to click on a link
			newframe1always.style.opacity = 0;
			newframe1always.style.zIndex = 999;
			document.body.appendChild(newframe1always);

			// fade out effect
			// no click possible

			// fade in effect
			if(fadein == true){ fader("show"); }else{ newframe1always.style.opacity = default_opacity / 100; } // no fade effect

			spot = $("stefanvdlightareoff1");
			// var width = document.documentElement.clientWidth;
			// var height = document.documentElement.clientHeight;

			window.onpointermove = moveSpot;
			window.addEventListener("touchmove", function(e){
				// stop touch event
				e.stopPropagation();

				// translate to mouse event
				var clkEvt = document.createEvent("MouseEvent");
				clkEvt.initMouseEvent("pointermove", true, true, window, e.detail, e.touches[0].screenX, e.touches[0].screenY, e.touches[0].clientX, e.touches[0].clientY, false, false, false, false, 0, null);
				window.dispatchEvent(clkEvt);

				// or just handle touch event
				moveSpot(e);
			}, {passive: false});

			// increase size by pressing
			mathfullsizeup = fullspotlightsize;
			mathbordersizeup = borderspotlightsize;

			document.addEventListener("pointerdown", function(){ spotmousedown(); });
			document.addEventListener("pointerup", function(){ spotmouseup(); });
		}else if(mousespotlightc == true){
			window.onpointermove = function(event){
				try{ getMouse(window, event); }catch(e){ console.log(e); }
			};

			var newframe1 = document.createElement("div");
			var newframe2 = document.createElement("div");
			var newframe3 = document.createElement("div");
			var newframe4 = document.createElement("div");
			var newframe5 = document.createElement("div");
			setAttributes(newframe1, {"id": "stefanvdlightareoff1", "class": "stefanvdlightareoff"});
			setAttributes(newframe2, {"id": "stefanvdlightareoff2", "class": "stefanvdlightareoff"});
			setAttributes(newframe3, {"id": "stefanvdlightareoff3", "class": "stefanvdlightareoff"});
			setAttributes(newframe4, {"id": "stefanvdlightareoff4", "class": "stefanvdlightareoff"});
			newframe5.setAttribute("id", "stefanvdlightareoffcustom");
			newframe1.style.background = lightcolor;
			newframe2.style.background = lightcolor;
			newframe3.style.background = lightcolor;
			newframe4.style.background = lightcolor;
			newframe2.style.visibility = "hidden";
			newframe3.style.visibility = "hidden";
			newframe4.style.visibility = "hidden";
			document.body.appendChild(newframe1);
			document.body.appendChild(newframe2);
			document.body.appendChild(newframe3);
			document.body.appendChild(newframe4);
			document.body.appendChild(newframe5);
			document.body.style.cursor = "crosshair"; // show cursor

			// fade out effect
			multiaddEventListeners("click", [newframe1, newframe2, newframe3, newframe4], lockscreen);

			// fade in effect
			if(fadein == true){ fader("show"); }else{ newframe1.style.opacity = default_opacity / 100; newframe2.style.opacity = default_opacity / 100; newframe3.style.opacity = default_opacity / 100; newframe4.style.opacity = default_opacity / 100; } // no fade effect
		}else{ // Begin normal lights off
			var newdiv = document.createElement("div");
			setAttributes(newdiv, {"id": "stefanvdlightareoff1", "class": "stefanvdlightareoff"});
			newdiv.style.width = "100%";
			newdiv.style.height = "100%";
			newdiv.style.left = 0;
			newdiv.style.top = 0;
			if(cinemaontop == true){
				newdiv.style.position = "absolute";

				if(window.innerHeight > 870){ // height cinema
					newdiv.style.height = "100%";
				}else{
					newdiv.style.height = "870px";
				}

			}else{
				newdiv.style.position = "fixed";
			}

			// make it possible to click on a link
			if(mousespotlightt == true){
				newdiv.style.pointerEvents = "none";
			}

			// if image background, load it then
			if(lightimagea == true){ newdiv.style.background = "url('" + lightimage + "')"; newdiv.style.backgroundSize = "100% 100%"; }else if(lightimagelin == true){ newdiv.style.background = "linear-gradient(to " + linearsq + ", " + colora + " " + intervallina + "%," + colorb + " " + intervallinb + "%)"; }else{ newdiv.style.background = lightcolor; }
			//---
			newdiv.style.opacity = 0;
			newdiv.style.zIndex = 999;

			// Motion fall down effect
			if(slideeffect == true){
				// -webkit-animation: totlbounceInDown 1.5s 0.0s linear 1;
				newdiv.style.WebkitAnimation = "totlbounceInDown 1.5s 0.0s linear 1";
				slideeffect = false;
				chrome.storage.sync.set({"slideeffect": false});
			}
			document.body.appendChild(newdiv);

			// fade out effect
			newdiv.addEventListener("click", function(){ lockscreen(); });

			// fade in effect
			if(fadein == true){ fader("show"); }else{ newdiv.style.opacity = default_opacity / 100; } // no fade effect
		}

		// blur effect
		if(blur == true){
			if($("stefanvdblurimage") == null){
				var newblur = document.createElement("div");
				newblur.setAttribute("id", "stefanvdblurimage");
				newblur.style.webkitBackdropFilter = "blur(6px)";
				newblur.style.backdropFilter = "blur(6px)";
				newblur.style.width = "100%";
				newblur.style.height = "100%";
				newblur.style.left = 0;
				newblur.style.top = 0;
				newblur.style.position = "fixed";
				document.body.appendChild(newblur);
			}
		}

		// ///////// Turn Off the Lights reader slider
		// Show always option
		if(readera == true){
			var stefanvdreaderbar = document.createElement("div");
			stefanvdreaderbar.setAttribute("id", "stefanvdreaderbar");
			document.body.appendChild(stefanvdreaderbar);
			var stefanvdreaderbardiv1 = document.createElement("div");
			stefanvdreaderbardiv1.setAttribute("id", "stefanvdreaderbarinnerbox");
			stefanvdreaderbar.appendChild(stefanvdreaderbardiv1);

			// if false then use small view
			if(readerlargestyle == false){ stefanvdreaderbar.style.width = "30px"; stefanvdreaderbar.style.height = "30px"; }

			// top
			var stefanvdreaderbartop = document.createElement("div");
			stefanvdreaderbartop.setAttribute("id", "stefanvdreaderbartop");
			stefanvdreaderbartop.setAttribute("class", "stefanvdreaderbartop");
			stefanvdreaderbartop.addEventListener("click", function(){ toggle_small(); }, true);
			stefanvdreaderbardiv1.appendChild(stefanvdreaderbartop);

			// if false then use small view
			if(readerlargestyle == false){ stefanvdreaderbartop.style.opacity = 0; }

			var stefanvdreaderbartxt1 = document.createTextNode("Turn Off the Lights");
			stefanvdreaderbartop.appendChild(stefanvdreaderbartxt1);

			var stefanvdreaderbarmin = document.createElement("div");
			stefanvdreaderbarmin.setAttribute("id", "stefanvdreaderbarmin");
			stefanvdreaderbarmin.innerText = "⎯";
			stefanvdreaderbartop.appendChild(stefanvdreaderbarmin);

			// bottom
			var stefanvdreaderbaroa = document.createElement("div");
			stefanvdreaderbaroa.setAttribute("class", "stefanvdreaderbaroa");
			stefanvdreaderbardiv1.appendChild(stefanvdreaderbaroa);

			var stefanvdreaderinput1 = document.createElement("input");
			setAttributes(stefanvdreaderinput1, {"type": "range", "id": "totlrange", "min": "0", "max": "100", "step": "1", "value": "0"});
			stefanvdreaderinput1.addEventListener("change", function(){ showValue(this.value); }, true);
			stefanvdreaderinput1.addEventListener("input", function(){ showValue(this.value); }, true);
			stefanvdreaderbaroa.appendChild(stefanvdreaderinput1);

			var stefanvdreaderbaran = document.createElement("div");
			stefanvdreaderbaran.setAttribute("class", "stefanvdreaderbaran");
			stefanvdreaderbardiv1.appendChild(stefanvdreaderbaran);

			var stefanvdreaderinput2 = document.createElement("input");
			setAttributes(stefanvdreaderinput2, {"id": "totlgammaVal", "maxlength": "3", "size": "3", "type": "text", "value": "0"});
			stefanvdreaderinput2.addEventListener("change", function(){ showValue(this.value); }, true);
			stefanvdreaderbaran.appendChild(stefanvdreaderinput2);

			// settings reader slider
			$("totlgammaVal").value = interval;
			$("totlrange").value = interval;
		} // End option always

		// start dynamic
		if(dynamic == true){
			var newdynmaster = document.createElement("div"); newdynmaster.setAttribute("id", "stefanvddynamicbackground"); document.body.appendChild(newdynmaster);
			if(dynamic1 == true){
				var newdynleft = document.createElement("div"); newdynleft.setAttribute("class", "stefanvddynamicbackgroundbubbleleft"); newdynmaster.appendChild(newdynleft);
				var dynlefti;
				for(dynlefti = 0; dynlefti < 5; dynlefti++){ var newdynbubbleleft = document.createElement("div"); newdynbubbleleft.setAttribute("class", "stefanvddynamicbackgroundbubbles stefanvddynamicbubbles" + dynlefti + ""); newdynleft.appendChild(newdynbubbleleft); }

				var newdynmid = document.createElement("div"); newdynmid.setAttribute("class", "stefanvddynamicbackgroundbubblemid"); newdynmaster.appendChild(newdynmid);
				var dynmidi;
				for(dynmidi = 6; dynmidi < 10; dynmidi++){ var newdynbubblemid = document.createElement("div"); newdynbubblemid.setAttribute("class", "stefanvddynamicbackgroundbubbles stefanvddynamicbubbles" + dynmidi + ""); newdynmid.appendChild(newdynbubblemid); }

				var newdynright = document.createElement("div"); newdynright.setAttribute("class", "stefanvddynamicbackgroundbubbleright"); newdynmaster.appendChild(newdynright);
				var dynrighti;
				for(dynrighti = 11; dynrighti < 16; dynrighti++){ var newdynbubble = document.createElement("div"); newdynbubble.setAttribute("class", "stefanvddynamicbackgroundbubbles stefanvddynamicbubbles" + dynrighti + ""); newdynright.appendChild(newdynbubble); }
			}else if(dynamic2 == true){
				var newdynblockleft = document.createElement("div"); newdynblockleft.setAttribute("class", "stefanvddynamicbackgroundblockleft"); newdynmaster.appendChild(newdynblockleft);
				var blockai;
				for(blockai = 1; blockai < 21; blockai++){ var newdynblocka = document.createElement("div"); newdynblocka.setAttribute("class", "stefanvddynamicbackgroundblocks stefanvddynamicblocks" + blockai + ""); newdynblockleft.appendChild(newdynblocka); }

				var newdynblockright = document.createElement("div"); newdynblockright.setAttribute("class", "stefanvddynamicbackgroundblockright"); newdynmaster.appendChild(newdynblockright);
				var blockbi;
				for(blockbi = 22; blockbi < 42; blockbi++){ var newdynblockb = document.createElement("div"); newdynblockb.setAttribute("class", "stefanvddynamicbackgroundblocks stefanvddynamicblocks" + blockbi + ""); newdynblockright.appendChild(newdynblockb); }
			}else if(dynamic3 == true){
				var newdynrainleft = document.createElement("div"); newdynrainleft.setAttribute("class", "stefanvddynamicbackgroundblockleft"); newdynmaster.appendChild(newdynrainleft);
				var rainlefti;
				for(rainlefti = 0; rainlefti < 15; rainlefti++){ var newdynraina = document.createElement("div"); newdynraina.setAttribute("class", "stefanvddynamicbackgroundraindrups b" + rainlefti + ""); newdynrainleft.appendChild(newdynraina); }

				var newdynrainright = document.createElement("div"); newdynrainright.setAttribute("class", "stefanvddynamicbackgroundblockright"); newdynmaster.appendChild(newdynrainright);
				var rainrighti;
				for(rainrighti = 16; rainrighti < 31; rainrighti++){ var newdynrainb = document.createElement("div"); newdynrainb.setAttribute("class", "stefanvddynamicbackgroundraindrups b" + rainrighti + ""); newdynrainright.appendChild(newdynrainb); }
			}else if(dynamic4 == true){
				var newdynworld = document.createElement("div"); newdynworld.setAttribute("id", "stefanvdworld"); newdynmaster.appendChild(newdynworld);
				(function(){
					var lastTime = 0;
					var vendors = ["ms", "moz", "webkit", "o"];
					var x;
					var vl = vendors.length;
					for(x = 0; x < vl && !window.requestAnimationFrame; ++x){
						window.requestAnimationFrame = window[vendors[x] + "RequestAnimationFrame"];
						window.cancelRequestAnimationFrame = window[vendors[x] + "CancelRequestAnimationFrame"];
					}
					if(!window.requestAnimationFrame)
						window.requestAnimationFrame = function(callback){
							var currTime = new Date().getTime();
							var timeToCall = Math.max(0, 16 - (currTime - lastTime));
							var id = window.setTimeout(function(){ callback(currTime + timeToCall); }, timeToCall);
							lastTime = currTime + timeToCall;
							return id;
						};

					if(!window.cancelAnimationFrame)window.cancelAnimationFrame = function(id){ window.clearTimeout(id); };
				}());

				var p = 400;
				newdynmaster.style.webkitPerspective = p; newdynmaster.style.MozPerspective = p; newdynmaster.style.oPerspective = p;
				generate();
				cloudupdate();
			}else if(dynamic5 == true){
				var flying = "";
				if(hoveroptiondyn5 != true){
					// with the letter n include, then it see the flying in effect
					flying = "n";
				}

				var newdynspaceworld;
				if(hoveroptiondyn5 != true){
					newdynspaceworld = document.createElement("div"); newdynspaceworld.setAttribute("id", "stefanvddynamicspacenoflying"); newdynmaster.appendChild(newdynspaceworld);
				}else{
					newdynspaceworld = document.createElement("div"); newdynspaceworld.setAttribute("id", "stefanvddynamicspace"); newdynmaster.appendChild(newdynspaceworld);
				}

				var spacej;
				for(spacej = 1; spacej < 17; spacej++){
					if(spacej <= 9){ spacej = "0" + spacej; }
					var newdynpart1 = document.createElement("div");
					newdynpart1.setAttribute("id", flying + "p" + spacej); newdynspaceworld.appendChild(newdynpart1);
					var spacei;
					for(spacei = 1; spacei < 31; spacei++){
						if(spacei <= 9){ spacei = "0" + spacei; }
						var newdynlow = document.createElement("b"); newdynlow.setAttribute("class", flying + "s0" + spacei + ""); newdynpart1.appendChild(newdynlow);
					}
				}
			}else if(dynamic6 == true){
				var smoke = document.createElement("div"); smoke.setAttribute("id", "smoke"); smoke.style.width = "100%"; smoke.style.height = "100%"; newdynmaster.appendChild(smoke);
				var newsmokecanvas = document.createElement("canvas"); newsmokecanvas.setAttribute("id", "stefanvddynamicsmoke"); newsmokecanvas.style.width = "100%"; newsmokecanvas.style.height = "100%"; smoke.appendChild(newsmokecanvas);

				// Create an image object (only need one instance)
				var imageObj = new Image();

				// Once the image has been downloaded then set the image on all of the particles
				imageObj.onload = function(){
					particles.forEach(function(particle){
						particle.setImage(imageObj);
					});
				};

				// Once the callback is arranged then set the source of the image
				imageObj.src = "data:image/png;base64,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";

				// Initialize the scene
				runsmoke();

				// If the context is set then we can draw the scene (if not then the browser does not support canvas)
				if(smokecontext){
					if(document.visibilityState === "visible"){
						window.setInterval(function(){
							// Update the scene before drawing
							smokeupdate();

							// Draw the scene
							smokedraw();
						}, 1000 / targetFPS);
					}
				}
			}else if(dynamic7 == true){
				var flyingdots = document.createElement("div"); flyingdots.setAttribute("id", "flyingdots"); newdynmaster.appendChild(flyingdots);
				var newdyndotsworld = document.createElement("div"); newdyndotsworld.setAttribute("id", "stefanvddynamicdots"); flyingdots.appendChild(newdyndotsworld);
				var flyingj;
				for(flyingj = 1; flyingj < 100; flyingj++){
					var newminic = document.createElement("div");
					newminic.className = "c";
					newdyndotsworld.appendChild(newminic);
				}
			}else if(dynamic8 == true){
				var storm = document.createElement("div"); storm.setAttribute("id", "storm"); newdynmaster.appendChild(storm);
				var newstormcanvas = document.createElement("canvas"); newstormcanvas.setAttribute("id", "stefanvddynamicstorm"); newstormcanvas.style.width = "100%"; newstormcanvas.style.height = "100%"; storm.appendChild(newstormcanvas);

				stormcanvas = document.getElementById("stefanvddynamicstorm");
				sky = stormcanvas.getContext("2d", {desynchronized: true});

				window.addEventListener("resize", resizer, false);

				resizer();
				paintSky();
			}else if(dynamic9 == true){
				var triangle = document.createElement("div"); triangle.setAttribute("id", "triangle"); newdynmaster.appendChild(triangle);
				trianglerun();
				window.onresize = onResize;
			}else if(dynamic10 == true){
				let stars = document.createElement("div"); stars.setAttribute("id", "stars"); newdynmaster.appendChild(stars);
				let j;
				for(j = 1; j < 3; j++){
					var newmstar = document.createElement("div");
					newmstar.id = "mstars" + [j];
					stars.appendChild(newmstar);
				}
			}
		} // end dynamic
	}

}

chrome.storage.sync.get(["mousespotlighto", "mousespotlightc", "mousespotlighta", "lightcolor", "lightimagea", "lightimage", "interval", "fadein", "fadeout", "readera", "readerlargestyle", "mousespotlightt", "enterpassword", "password", "dynamic", "dynamic1", "dynamic2", "dynamic3", "dynamic4", "dynamic5", "dynamic6", "dynamic7", "dynamic8", "dynamic9", "dynamic10", "hoveroptiondyn5", "blur", "cinemaontop", "spotlightradius", "slideeffect", "lightimagelin", "linearsq", "colora", "intervallina", "colorb", "intervallinb", "mousespotlights", "screenshader", "darkbrowsertheme", "multiopacall", "multiopacsel", "multiopacityDomains", "lampandnightmode"], function(response){
	mousespotlighto = response["mousespotlighto"]; if(mousespotlighto == null)mousespotlighto = true; // default mousespotlighto true
	mousespotlightc = response["mousespotlightc"]; if(mousespotlightc == null)mousespotlightc = false; // default mousespotlightc false
	mousespotlighta = response["mousespotlighta"]; if(mousespotlighta == null)mousespotlighta = false; // default mousespotlighta false
	lightcolor = response["lightcolor"]; if(lightcolor)lightcolor = response["lightcolor"]; else lightcolor = "#000000"; // default color black
	lightimagea = response["lightimagea"];
	lightimage = response["lightimage"];
	interval = response["interval"]; if(interval == null)interval = 80; default_opacity = interval; // default interval 80%
	fadein = response["fadein"]; if(fadein == null)fadein = true; // default fadein true
	fadeout = response["fadeout"]; if(fadeout == null)fadeout = true; // default fadeout true
	readera = response["readera"]; if(readera == null)readera = false; // default readera false
	readerlargestyle = response["readerlargestyle"]; if(readerlargestyle == null)readerlargestyle = true; // default large style
	mousespotlightt = response["mousespotlightt"]; if(mousespotlightt == null)mousespotlightt = false; // default mousespotlightt false
	enterpassword = response["enterpassword"];
	password = response["password"]; if(password == null)password = false;
	dynamic = response["dynamic"]; if(dynamic == null)dynamic = false; // default dynamic false
	dynamic1 = response["dynamic1"];
	dynamic2 = response["dynamic2"];
	dynamic3 = response["dynamic3"];
	dynamic4 = response["dynamic4"];
	dynamic5 = response["dynamic5"];
	dynamic6 = response["dynamic6"];
	dynamic7 = response["dynamic7"];
	dynamic8 = response["dynamic8"];
	dynamic9 = response["dynamic9"];
	dynamic10 = response["dynamic10"];
	hoveroptiondyn5 = response["hoveroptiondyn5"];
	blur = response["blur"];
	cinemaontop = response["cinemaontop"]; if(cinemaontop == null)cinemaontop = false; // default cinemaontop false
	spotlightradius = response["spotlightradius"]; if(spotlightradius == null)spotlightradius = 50; // default spotlightradius 50
	slideeffect = response["slideeffect"]; if(slideeffect == null)slideeffect = false; // default slideeffect false
	lightimagelin = response["lightimagelin"]; if(lightimagelin == null)lightimagelin = false; // default lightimagelin false
	linearsq = response["linearsq"];
	colora = response["colora"];
	intervallina = response["intervallina"];
	colorb = response["colorb"];
	intervallinb = response["intervallinb"];
	mousespotlights = response["mousespotlights"]; if(mousespotlights == null)mousespotlights = false; // default mousespotlights false
	darkbrowsertheme = response["darkbrowsertheme"];
	multiopacall = response["multiopacall"]; if(multiopacall == null)multiopacall = true; // default multiopacall true
	multiopacsel = response["multiopacsel"]; if(multiopacsel == null)multiopacsel = false; // default multiopacsel false
	multiopacityDomains = response["multiopacityDomains"];
	if(typeof multiopacityDomains == "undefined" || multiopacityDomains == null){
		multiopacityDomains = JSON.stringify({"https://www.example.com": ["90"], "https://www.nytimes.com": ["85"]});
	}
	multiopacityDomains = JSON.parse(multiopacityDomains);
	lampandnightmode = response["lampandnightmode"];

	if(mousespotlights == true){
		// the screen shader
		var stefanscreenshader = $("stefanvdscreenshader");
		if(stefanscreenshader){
			document.documentElement.removeChild(stefanscreenshader);
			chrome.storage.sync.set({"screenshader": false});
			setmetatheme(true);
		}else{
			if(document.documentElement){
				var newscreenshader = document.createElement("div");
				setAttributes(newscreenshader, {"id": "stefanvdscreenshader", "class": "stefanvdscreenshader"});
				newscreenshader.style.background = lightcolor;
				newscreenshader.style.mixBlendMode = "multiply";
				newscreenshader.style.opacity = default_opacity / 100;
				document.documentElement.insertBefore(newscreenshader, document.documentElement.firstChild);
				chrome.storage.sync.set({"screenshader": true});
				setmetatheme(false);
			}
		}
	}else{
		if(activatelightsoff == true){
			// Password enable
			var pwon = $("stefanvdlightareoffpw");
			if(password == true){
				if(pwon){
					var entername = window.prompt(i18nlockentername, "");
					if(enterpassword == entername){ document.body.removeChild(pwon); lightsgoonoroff(); }else{ window.alert(i18nlockwrongpassword); }
				}else{
					lightsgoonoroff();
					var newpw = document.createElement("div");
					newpw.setAttribute("id", "stefanvdlightareoffpw");
					newpw.style.display = "none";
					document.body.appendChild(newpw);
				}
			}else{
				lightsgoonoroff();
			}
		} // end activatelightsoff
	} // end mousespotlightt
});

// /////////
// animation browser engine
window.requestAnimFrame = function(){
	return(
		window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame ||
        function(/* function */ callback){ window.setTimeout(callback, 1000 / 60); }
	);
}();

// Fade engine
// Variable for the fade in and out effect
var opacity = 0;
var ReducingFinished = true;
var OpacityLevelIncrement = 10; // Percentage value: 1-100
var DIVElementById = null;

// Function determines whether we show or hide the item referenced by ElementID
function fader(ActionToTake){
	DIVElementById = $("stefanvdlightareoff1");
	if(ActionToTake == "hide"){ opacity = default_opacity; reduceOpacity(); }else if(ActionToTake == "show"){ increaseOpacity(); }
}

function setallopacity(opacity){
	// Control opacity for all <div>
	var div = document.querySelectorAll("div.stefanvdlightareoff"), i, l = div.length;
	for(i = 0; i < l; i++){ div[i].style.opacity = opacity / 100; }
}

// Makes div increase
function increaseOpacity(){
	// If opacity level is less than default_opacity, we can still increase the opacity
	if((opacity < default_opacity) && (ReducingFinished == true)){
		(opacity > (default_opacity - 10)) ? opacity += (default_opacity - opacity) : opacity += OpacityLevelIncrement;
		DIVElementById.style.opacity = opacity / 100;
		window.requestAnimFrame(increaseOpacity);
	}else{ ReducingFinished = false; }
	setallopacity(opacity);
}

// Makes div reduce
function reduceOpacity(){
	// If opacity level is greater than 0, we can still reduce the opacity
	if((opacity > 0) && (ReducingFinished == false)){
		opacity -= OpacityLevelIncrement;
		DIVElementById.style.opacity = opacity / 100;
		window.requestAnimFrame(reduceOpacity);
	}else{
		ReducingFinished = true;
		// When finished, make sure the DIVElementById is set to remove element
		if(DIVElementById.style.opacity <= 0){ removenewframe(); }
	}
	setallopacity(opacity);
}