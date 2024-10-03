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

function eventFunc(selector, event, callback){
	document.getElementById(selector).addEventListener(event, function(){
		callback();
	});
}

var lightcolor = null, darkmode = null, interval = null, nighttheme = null, lampandnightmode = null, ambilight = null, ambilightfixcolor = null, ambilight4color = null, ambilightvarcolor = null, atmosvivid = null, nightmodetxt = null, nightmodebck = null, nightmodehyperlink = null, multiopacall = null, multiopacsel = null, multiopacityDomains = null, firstDate = null, optionskipremember = null, firstsawrate = null, pipvisualtype = null, nightmodebutton = null, nightonly = null, nightDomains = null, nightmodebydomain = null, firstsawscroll = null, nightmodeborder = null, nightenabletheme = null, nightmodeimage = null, nmimagedark = null, nmimagegray = null;

function save_options(){
	var getpipvisualtype;
	if(document.getElementById("btnpipvisualA").checked == true){
		getpipvisualtype = 1;
	}else if(document.getElementById("btnpipvisualB").checked == true){
		getpipvisualtype = 2;
	}else if(document.getElementById("btnpipvisualC").checked == true){
		getpipvisualtype = 3;
	}

	chrome.storage.sync.set({"nighttheme":$("nighttheme").checked, "lampandnightmode":$("lampandnightmode").checked, "ambilight":$("ambilight").checked, "ambilightfixcolor":$("ambilightfixcolor").checked, "ambilight4color":$("ambilight4color").checked, "ambilightvarcolor":$("ambilightvarcolor").checked, "atmosvivid":$("atmosvivid").checked, "pipvisualtype": getpipvisualtype, "nightonly":$("nightonly").checked, "nightDomains": JSON.stringify(nightDomains), "nightenabletheme":$("nightenabletheme").checked, "nightmodeimage":$("nightmodeimage").checked, "nmimagedark":$("nmimagedark").value, "nmimagegray":$("nmimagegray").value});
}

function codenight(){
	if(document.getElementById("totldark")){
		chrome.runtime.sendMessage({name: "sendnightmodeindark", value: "day"});
	}else{
		chrome.runtime.sendMessage({name: "sendnightmodeindark", value: "night"});
	}
}

function executenightmode(){
	if(lampandnightmode == true){
		chrome.runtime.sendMessage({name: "mastertabnight"});
	}else{
		chrome.tabs.query({
			active: true,
			currentWindow: true
		}, function(tabs){
			chrome.scripting.executeScript({
				target: {tabId: tabs[0].id},
				func: codenight
			});
		});
	}
}

function openoptionspage(){
	chrome.runtime.openOptionsPage();
}

function opendonationpage(){
	chrome.tabs.create({url: linkdonate, active:true});
}

function opensupportpage(){
	chrome.tabs.create({url: linksupport, active:true});
}

function openaurorapage(){
	chrome.tabs.create({url: linkauroraplayerapp, active:true});
}

document.addEventListener("DOMContentLoaded", function(){
	// disable context menu
	document.addEventListener("contextmenu", function(e){
		e.preventDefault();
	}, false);

	chrome.storage.sync.get(["lightcolor", "darkmode", "interval", "nighttheme", "lampandnightmode", "ambilight", "ambilightfixcolor", "ambilight4color", "ambilightvarcolor", "atmosvivid", "nightmodebck", "nightmodetxt", "nightmodehyperlink", "multiopacall", "multiopacsel", "multiopacityDomains", "firstDate", "optionskipremember", "firstsawrate", "pipvisualtype", "nightonly", "nightDomains", "nightmodebydomain", "firstsawscroll", "nightenabletheme", "nightmodeimage", "nmimagedark", "nmimagegray"], function(items){
		lightcolor = items["lightcolor"]; if(lightcolor == null)lightcolor = "#000000"; // default color black
		currentlayercolor = lightcolor;
		darkmode = items["darkmode"]; if(darkmode == null)darkmode = 2; // default Operating System
		interval = items["interval"]; if(interval == null)interval = 80; // default 80%
		ambilight = items["ambilight"]; if(ambilight == null)ambilight = false; // default false
		ambilightfixcolor = items["ambilightfixcolor"]; if(ambilightfixcolor == null)ambilightfixcolor = true; // default true
		ambilight4color = items["ambilight4color"]; if(ambilight4color == null)ambilight4color = false; // default false
		ambilightvarcolor = items["ambilightvarcolor"]; if(ambilightvarcolor == null)ambilightvarcolor = false; // default false
		atmosvivid = items["atmosvivid"]; if(atmosvivid == null)atmosvivid = false; // default false

		multiopacall = items["multiopacall"]; if(multiopacall == null)multiopacall = true; // default true
		multiopacsel = items["multiopacsel"]; if(multiopacsel == null)multiopacsel = false; // default false
		multiopacityDomains = items["multiopacityDomains"];
		if(typeof multiopacityDomains == "undefined" || multiopacityDomains == null){
			multiopacityDomains = JSON.stringify({"https://www.example.com": ["90"], "https://www.nytimes.com": ["85"]});
		}
		multiopacityDomains = JSON.parse(multiopacityDomains);

		nighttheme = items["nighttheme"]; if(nighttheme == null)nighttheme = false; // default false
		lampandnightmode = items["lampandnightmode"]; if(lampandnightmode == null)lampandnightmode = false; // default false
		nightmodebck = items["nightmodebck"]; if(nightmodebck == null)nightmodebck = "#1e1e1e"; // default #1e1e1e
		nightmodetxt = items["nightmodetxt"]; if(nightmodetxt == null)nightmodetxt = "#ffffff"; // default #ffffff
		nightmodehyperlink = items["nightmodehyperlink"]; if(nightmodehyperlink == null)nightmodehyperlink = "#ffffff"; // default #ffffff
		nightmodebutton = items["nightmodebutton"]; if(nightmodebutton == null)nightmodebutton = "#353535"; // default #353535
		nightmodeborder = items["nightmodeborder"]; if(nightmodeborder == null)nightmodeborder = "#545454"; // default #545454
		nightonly = items["nightonly"]; if(nightonly == null)nightonly = false; // default false
		nightmodebydomain = items["nightmodebydomain"]; if(nightmodebydomain == null)nightmodebydomain = true; // default true
		nightDomains = items["nightDomains"];
		if(typeof nightDomains == "undefined" || nightDomains == null)
			nightDomains = JSON.stringify({"https://www.youtube.com": true, "https://www.nytimes.com": true, "http://192.168.1.1": true});

		nightenabletheme = items["nightenabletheme"]; if(nightenabletheme == null)nightenabletheme = false; // default false

		nightmodeimage = items["nightmodeimage"]; if(nightmodeimage == null)nightmodeimage = false; // default false
		nmimagedark = items["nmimagedark"]; if(nmimagedark == null)nmimagedark = 60; // default 60
		nmimagegray = items["nmimagegray"]; if(nmimagegray == null)nmimagegray = 50; // default 50
		pipvisualtype = items["pipvisualtype"]; if(pipvisualtype == null)pipvisualtype = 1; // default 1

		if(pipvisualtype == 1){
			document.getElementById("btnpipvisualA").checked = true;
		}else if(pipvisualtype == 2){
			document.getElementById("btnpipvisualB").checked = true;
		}else if(pipvisualtype == 3){
			document.getElementById("btnpipvisualC").checked = true;
		}

		if(nightmodeimage == true)$("nightmodeimage").checked = true;
		document.getElementById("nmimagedark").value = nmimagedark;
		document.getElementById("nmimagegray").value = nmimagegray;

		// dark mode
		var thattheme;
		switch(darkmode){
		case 1:
			thattheme = "dark";
			break;
		case 0:
			thattheme = "light";
			break;
		case 2:
			if(window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches){
				thattheme = "dark";
			}else{
				thattheme = "light";
			}
			break;
		}
		document.body.className = thattheme;

		var editzoom = interval;
		var editdone = false;
		if(multiopacall == true){
			// to nothing - regular thing
			if($("oslider")){ $("oslider").value = interval; }
			if($("otext")){ $("otext").innerText = interval; }
		}else{
			// multi opacity
			chrome.tabs.query({active: true, currentWindow: true},
				function(tabs){
					var job = tabs[0].url;
					var currentURL = job.match(/^[\w-]+:\/*\[?([\w.:-]+)\]?(?::\d+)?/)[0];
					var atbbuf = [];
					var domain;
					for(domain in multiopacityDomains){ atbbuf.push(domain); atbbuf.sort(); }
					var i;
					var l = atbbuf.length;
					for(i = 0; i < l; i++){
						if(atbbuf[i] == currentURL){
							editzoom = multiopacityDomains[atbbuf[i]];
							if($("oslider")){ $("oslider").value = editzoom; }
							if($("otext")){ $("otext").innerText = editzoom; }
							editdone = true;
						}
						if((i == atbbuf.length - 1) && (editdone == false)){
							if($("oslider")){ $("oslider").value = editzoom; }
							if($("otext")){ $("otext").innerText = editzoom; }
						}
					}
				});
		}

		if(nighttheme == true)$("nighttheme").checked = true;
		if(lampandnightmode == true)$("lampandnightmode").checked = true;
		if(nightenabletheme == true)$("nightenabletheme").checked = true;
		if(ambilight == true)$("ambilight").checked = true;
		if(ambilightfixcolor == true)$("ambilightfixcolor").checked = true;
		if(ambilight4color == true)$("ambilight4color").checked = true;
		if(ambilightvarcolor == true)$("ambilightvarcolor").checked = true;
		if(atmosvivid == true)$("atmosvivid").checked = true;

		if(optionskipremember){ optionskipremember = items["optionskipremember"]; }
		if(firstDate){ firstDate = items["firstDate"]; }
		if(firstsawrate){ firstsawrate = items["firstsawrate"]; }

		firstsawscroll = items["firstsawscroll"]; if(firstsawscroll == null)firstsawscroll = false; // default false

		$("colornightmodebckcustom").value = nightmodebck;
		$("colornightmodetxtcustom").value = nightmodetxt;
		$("colornightmodehyperlinkcustom").value = nightmodehyperlink;
		$("colornightmodebuttoncustom").value = nightmodebutton;
		$("colornightmodebordercustom").value = nightmodeborder;

		if(nightonly == true)$("nightonly").checked = true;

		// get current domain
		chrome.tabs.query({active: true, currentWindow: true},
			function(tabs){
				var job = tabs[0].url;
				let domain = (new URL(job));
				var domainname = domain.hostname.replace("www.", "");
				$("currentweburl").innerText = domainname;

				var currenturl;
				if(nightmodebydomain == true){
					currenturl = domain.protocol + "//" + domain.hostname;
				}else{
				// WITH end slash
					currenturl = job;
					if(currenturl.substr(-1) === "/"){
						// NO end slash
						currenturl = currenturl.substr(0, currenturl.length - 1);
					}
				}
				$("currentweburl").setAttribute("data-fullurl", currenturl);

				if(typeof nightDomains == "string"){
					nightDomains = JSON.parse(nightDomains);
					let domain;
					for(domain in nightDomains){
						if(domain == currenturl){
							$("sitecheck").checked = true;
						}
					}
				}
			}
		);

		// final
		test();

		// Show the scroll guide for the first time
		if(firstsawscroll == false){
			materialScrollAlert();
		}

		// show remember page
		var firstmonth = false;
		var currentDate = new Date().getTime();
		if(firstDate){
			var datestart = firstDate;
			var dateend = datestart + (30 * 24 * 60 * 60 * 1000);
			if(currentDate >= dateend){ firstmonth = false; }else{ firstmonth = true; }
		}else{
			chrome.storage.sync.set({"firstDate": currentDate});
			firstmonth = true;
		}

		if(firstmonth){
			// show nothing
		}else{
			if(optionskipremember != true){
				if(firstsawrate != true){
					materialRateAlert();
					chrome.storage.sync.set({"firstsawrate": true});
				}
			}
		}
	});

	// Detect click / change to save the page and test it.
	var inputs = document.querySelectorAll("input");
	var i, l = inputs.length;
	for(i = 0; i < l; i++){ inputs[i].addEventListener("change", test); inputs[i].addEventListener("change", save_options); }

	var pagearray = ["basicspanel", "morepanel", "atmospanel", "analyticspanel", "videopanel"];
	var tabarray = ["tab1", "tab2", "tab3", "tab4", "tab5"];
	function tabselected(id){
		for(var itab = 0; itab < tabarray.length; itab++){
			if(id == tabarray[itab]){
				$(tabarray[itab]).className = "tabbutton tabhighlight";
				$(pagearray[itab]).className = "";
			}else{
				$(tabarray[itab]).className = "tabbutton";
				$(pagearray[itab]).className = "hidden";
			}
		}
	}

	$("tab1").addEventListener("click", function(){
		tabselected("tab1");
	}, false);

	$("tab2").addEventListener("click", function(){
		tabselected("tab2");
	}, false);

	$("tab3").addEventListener("click", function(){
		tabselected("tab3");
	}, false);

	$("tab4").addEventListener("click", function(){
		tabselected("tab4");
	}, false);

	$("tab5").addEventListener("click", function(){
		tabselected("tab5");
	}, false);

	if(devdonate == true){
		$("btndonate").className = "hidden";
	}else{
		$("btnsupport").className = "hidden";
	}

	var tempcurrentpopup = "";
	function handle(delta){
		tempcurrentpopup = document.getElementById("oslider").value;
		if(delta < 0){
			if(tempcurrentpopup != 0){ tempcurrentpopup -= Number(1); document.getElementById("oslider").value = tempcurrentpopup; }
		}else{
			if(tempcurrentpopup <= 100){ tempcurrentpopup = Number(tempcurrentpopup) + Number(1); document.getElementById("oslider").value = tempcurrentpopup; }
		}
		opacitychange();
	}

	function wheel(event){
		var delta = 0;
		delta = event.deltaY;
		if(delta){ handle(delta); } // do the UP and DOWN job
		// prevent the mouse default actions using scroll
		if(event.preventDefault){ event.preventDefault(); }
		event.returnValue = false;
	}

	// mouse scroll
	$("oslider").addEventListener("wheel", wheel); // for modern
	$("oslider").addEventListener("change", opacitychange, false);
	$("oslider").addEventListener("input", opacitychange, false);
	$("oslider").addEventListener("dblclick", function(){ this.value = 80; opacitychange(); });

	var arraycolor = ["color1a", "color1b", "color1c", "color1d", "color1e", "color1f", "color1g", "color1h", "color2a", "color2b", "color2c", "color2d", "color2e", "color2f", "color2g", "color2h", "color3a", "color3b", "color3c", "color3d", "color3e", "color3f", "color3g", "color3h", "color4a", "color4b", "color4c", "color4d", "color4e", "color4f", "color4g", "color4h", "color5a", "color5b", "color5c", "color5d", "color5e", "color5f", "color5g", "color5h", "color6a", "color6b", "color6c", "color6d", "color6e", "color6f", "color6g", "color6h"];
	for(var icolor = 0; icolor < arraycolor.length; icolor++)
		document.getElementById(arraycolor[icolor]).addEventListener("click", colorchange);

	$("btnlights").addEventListener("click", function(){
		chrome.tabs.query({
			active: true,
			currentWindow: true
		}, function(tabs){
			chrome.scripting.executeScript({
				target: {tabId: tabs[0].id},
				files: ["js/light.js"]
			});
		});
	});

	var arraynm = ["colornightmodebck1", "colornightmodebck2", "colornightmodebck3", "colornightmodebck4", "colornightmodebck5", "colornightmodebck6", "colornightmodebck7", "colornightmodebck8", "colortitelnightmodetxt1", "colortitelnightmodetxt2", "colortitelnightmodetxt3", "colortitelnightmodetxt4", "colortitelnightmodetxt5", "colortitelnightmodetxt6", "colortitelnightmodetxt7", "colortitelnightmodetxt8", "colortitelnightmodehyperlink1", "colortitelnightmodehyperlink2", "colortitelnightmodehyperlink3", "colortitelnightmodehyperlink4", "colortitelnightmodehyperlink5", "colortitelnightmodehyperlink6", "colortitelnightmodehyperlink7", "colortitelnightmodehyperlink8", "colortitelnightmodebutton1", "colortitelnightmodebutton2", "colortitelnightmodebutton3", "colortitelnightmodebutton4", "colortitelnightmodebutton5", "colortitelnightmodebutton6", "colortitelnightmodebutton7", "colortitelnightmodebutton8", "colortitelnightmodeborder1", "colortitelnightmodeborder2", "colortitelnightmodeborder3", "colortitelnightmodeborder4", "colortitelnightmodeborder5", "colortitelnightmodeborder6", "colortitelnightmodeborder7", "colortitelnightmodeborder8"];
	for(var inm = 0; inm < arraynm.length; inm++){
		if(arraynm[inm].includes("colornightmodebck")){
			document.getElementById(arraynm[inm]).addEventListener("click", nightmodebckcolorchange);
		}else if(arraynm[inm].includes("colortitelnightmodetxt")){
			document.getElementById(arraynm[inm]).addEventListener("click", nightmodetextcolorchange);
		}else if(arraynm[inm].includes("colortitelnightmodehyperlink")){
			document.getElementById(arraynm[inm]).addEventListener("click", nightmodelinkcolorchange);
		}else if(arraynm[inm].includes("colortitelnightmodebutton")){
			document.getElementById(arraynm[inm]).addEventListener("click", nightmodebuttoncolorchange);
		}else if(arraynm[inm].includes("colortitelnightmodeborder")){
			document.getElementById(arraynm[inm]).addEventListener("click", nightmodebordercolorchange);
		}
	}

	eventFunc("colornightmodebckcustom", "input", nightmodebckcolorchangecustom);
	eventFunc("colornightmodetxtcustom", "input", nightmodetextcolorchangecustom);
	eventFunc("colornightmodehyperlinkcustom", "input", nightmodelinkcolorchangecustom);
	eventFunc("colornightmodebuttoncustom", "input", nightmodebuttoncolorchangecustom);
	eventFunc("colornightmodebordercustom", "input", nightmodebordercolorchangecustom);

	eventFunc("btngonight", "click", executenightmode);
	eventFunc("btnoptions", "click", openoptionspage);
	eventFunc("btndonate", "click", opendonationpage);
	eventFunc("btnsupport", "click", opensupportpage);
	eventFunc("btnauroraplayer", "click", openaurorapage);

	eventFunc("analtotal", "click", openoptionspage);

	var stefanvdurl = linkdeveloperwebsite;
	var stefanvdaacodeurl = encodeURIComponent(stefanvdurl);

	function add(a, b){ return a + b; }

	var analytics;
	var sharetext;
	chrome.storage.sync.get("analytics", function(items){
		if(items["analytics"]){
			analytics = items["analytics"];
			var timeeverything = analytics.map(function(a){
				return a.details.time; // in minutes
			});
			var currentimeseconds = timeeverything.reduce(add, 0);

			// current time
			var currenttimeinhours = currentimeseconds / 3600;
			// default laptop 65W
			var kwhwithdark = currenttimeinhours * (65 * 0.6) / 1000; // factor: power lower to 40%
			var kwhwithregu = currenttimeinhours * (65 * 1) / 1000;
			var currentkwh = (kwhwithregu - kwhwithdark).toFixed(5);
			if($("analtotalsavedkwh")){
				var showwatt;
				if(currentkwh < 0.01){
					currentkwh = currentkwh * 1000;
					currentkwh = parseFloat(Math.round(currentkwh * 100) / 100).toFixed(2);
					showwatt = currentkwh + "Wh";
				}else{
					showwatt = currentkwh + "kWh";
				}
				$("analtotalsavedkwh").innerText = showwatt;
			}
			sharetext = chrome.i18n.getMessage("shareanalyticenergy", "" + currentkwh + "");

			// kWh/hr
			var resultcomparedenergy;
			var x = currentkwh;
			switch(true){
			case(x < 0.01):
				resultcomparedenergy = chrome.i18n.getMessage("econothingthisyear");
				break;
			case(x >= 0.01 && x < 0.02):
				resultcomparedenergy = chrome.i18n.getMessage("ecothirtyminutes");
				break;
			case(x >= 0.02 && x < 0.04):
				resultcomparedenergy = chrome.i18n.getMessage("ecowatchtvfortwo"); // 2 hours of television on a 49” LCD screen
				break;
			case(x >= 0.04 && x < 0.06):
				resultcomparedenergy = chrome.i18n.getMessage("ecotoastermaking");
				break;
			case(x >= 0.06 && x < 0.12):
				resultcomparedenergy = chrome.i18n.getMessage("ecochargeiphone");// iPhone 6 up to 4 times
				break;
			case(x >= 0.12 && x < 0.15):
				resultcomparedenergy = chrome.i18n.getMessage("ecobrewsomecoffee");
				break;
			case(x >= 0.15 && x < 0.19):
				resultcomparedenergy = chrome.i18n.getMessage("ecoplayingxbox"); // One hour of gaming gaming
				break;
			case(x >= 0.19 && x < 0.25):
				resultcomparedenergy = chrome.i18n.getMessage("ecovacuumingfor");
				break;
			case(x >= 0.25 && x < 0.3):
				resultcomparedenergy = chrome.i18n.getMessage("ecoblowdrying");
				break;
			case(x >= 0.3 && x < 0.48):
				resultcomparedenergy = chrome.i18n.getMessage("ecowashingclothes");
				break;
			case(x >= 0.48 && x < 0.5):
				resultcomparedenergy = chrome.i18n.getMessage("ecowififoraday"); // over a 24h
				break;
			case(x >= 0.5 && x < 0.55):
				resultcomparedenergy = chrome.i18n.getMessage("ecorunningdishwasher");
				break;
			case(x >= 0.55 && x < 0.6):
				resultcomparedenergy = chrome.i18n.getMessage("ecochargelaptop"); // up to 2 times
				break;
			case(x >= 0.6 && x < 1.53):
				resultcomparedenergy = chrome.i18n.getMessage("ecokeeplightonforsix"); // Six hours of 10 LED indoor light bulbs at 10 watts
				break;
			case(x >= 1.53 && x < 2.5):
				resultcomparedenergy = chrome.i18n.getMessage("ecokeepfridgeday"); // a medium size
				break;
			case(x >= 2.5 && x < 3):
				resultcomparedenergy = chrome.i18n.getMessage("ecoloadlaundry");
				break;
			case(x >= 3 && x < 18):
				resultcomparedenergy = chrome.i18n.getMessage("ecoheatingtenshower");
				break;
			case(x >= 18 && x < 7.6):
				resultcomparedenergy = chrome.i18n.getMessage("ecotwentyfourghome"); // over a 24h
				break;
			case(x >= 7.6 && x < 85):
				resultcomparedenergy = chrome.i18n.getMessage("ecochargeteslacar"); // Top off your EV 7.6 kWh will fuel approximately 20 miles of driving in a Model S
				break;
			case(x >= 85 && x < 255):
				resultcomparedenergy = chrome.i18n.getMessage("ecochargeteslacarhundred"); // tesla Model S 85 KWh
				break;
			case(x >= 255 && x < 515):
				resultcomparedenergy = chrome.i18n.getMessage("ecochargeteslathreetimes"); // tesla Model S 85 KWh
				break;
			case(x >= 515 && x < 602):
				resultcomparedenergy = chrome.i18n.getMessage("ecopowerhawaiimonth"); // Hawaii – 515 kWh Per Month
				break;
			case(x >= 602 && x < 813):
				resultcomparedenergy = chrome.i18n.getMessage("ecopowernwymonth"); // New York – 602 kWh Per Month
				break;
			case(x >= 557 && x < 813):
				resultcomparedenergy = chrome.i18n.getMessage("ecopowercamonth"); // California – 557 kWh Per Month
				break;
			case(x >= 813 && x < 1589):
				resultcomparedenergy = chrome.i18n.getMessage("ecopowerbaseballgame"); // 813 kWh
				break;
			case(x >= 1589 && x < 6714):
				resultcomparedenergy = chrome.i18n.getMessage("ecopowereiffeltower");
				break;
			case(x >= 6714 && x < 8856):
				resultcomparedenergy = chrome.i18n.getMessage("ecopowereurostar"); // Eurostar Brussels to London 373km with 18kWh/km = 6714kWh total length
				break;
			case(x >= 8856 && x < 580000):
				resultcomparedenergy = chrome.i18n.getMessage("ecopowereurostarparis"); // Eurostar Paris to London 492 km with 18kWh/km = 8856 total length
				break;
			case(x >= 580000 && x < 5759190781):
				resultcomparedenergy = chrome.i18n.getMessage("ecoeiffeltoweryear"); // 580000 KWh/year
				break;
			case(x >= 5759190781 && x < 69614488162):
				resultcomparedenergy = chrome.i18n.getMessage("ecosfoyear"); // SFO 5759190781 KWh/year in 2016
				break;
			case(x >= 69614488162 && x < 70000000000):
				resultcomparedenergy = chrome.i18n.getMessage("ecolayear"); // LA 69614488162 KWh/year in 2016
				break;
			default:
				resultcomparedenergy = chrome.i18n.getMessage("ecoplanetearth");
				break;
			}

			$("energycompared").innerText = resultcomparedenergy;
		}
	});

	$("btnfacebook").addEventListener("click", function(){ window.open("https://www.facebook.com/sharer.php?u=" + stefanvdurl + "&t=" + sharetext + "", "Share to Facebook", "width=600,height=460,menubar=no,location=no,status=no"); });
	$("btntwitter").addEventListener("click", function(){ window.open("https://twitter.com/share?url=" + stefanvdaacodeurl + "&text=" + sharetext + "&via=turnoffthelight", "Share to Twitter", "width=600,height=460,menubar=no,location=no,status=no"); });

	eventFunc("energybox", "click", openoptionspage);

	// PIP
	function codepip(){
		var i18ntitelpiperror = chrome.i18n.getMessage("titelpiperror");
		var videotopipvideo = document.getElementsByTagName("video")[0];
		if(videotopipvideo){
			try{
				if(videotopipvideo !== document.pictureInPictureElement){
					videotopipvideo.requestPictureInPicture();
				}else{
					document.exitPictureInPicture();
				}
			}catch(reason){
				console.error(reason);
			}
		}else{
			window.alert(i18ntitelpiperror);
		}
	}
	function codepipvisual(){
		var i18ntitelpiperror = chrome.i18n.getMessage("titelpiperror");
		var videotopipvideo = document.getElementsByTagName("video")[0];
		var videopipvisual = document.getElementById("stefanvdpipvisualizationvideo");
		if(videotopipvideo){
			videopipvisual.addEventListener("loadedmetadata", () => {
				if(document.pictureInPictureElement){
					document.exitPictureInPicture();
				}else{
					if(document.pictureInPictureEnabled){
						videopipvisual.requestPictureInPicture();
					}
				}
			});
			// Show a play/pause button in the Picture-in-Picture window
			navigator.mediaSession.setActionHandler("play", function(){
				document.getElementsByTagName("video")[0].play();
				navigator.mediaSession.playbackState = "playing";
			});

			navigator.mediaSession.setActionHandler("pause", function(){
				document.getElementsByTagName("video")[0].pause();
				navigator.mediaSession.playbackState = "paused";
			});
		}else{
			window.alert(i18ntitelpiperror);
		}
	}

	$("btnpipvideo").addEventListener("click", function(){
		chrome.tabs.query({
			active: true,
			currentWindow: true
		}, function(tabs){
			chrome.scripting.executeScript({
				target: {tabId: tabs[0].id},
				func: codepip
			});
		});
	});
	$("btnpipvisual").addEventListener("click", function(){
		chrome.runtime.sendMessage({name: "pip", value: 1},
			function(){
				chrome.tabs.query({
					active: true,
					currentWindow: true
				}, function(tabs){
					chrome.scripting.executeScript({
						target: {tabId: tabs[0].id},
						func: codepipvisual
					});
				});
			}
		);
	});

	function showhidemodal(name, visible, status){
		document.getElementById(name).className = visible;
		document.getElementById(name).setAttribute("aria-disabled", status);
	}

	// rate
	function materialRateAlert(){
		showhidemodal("materialModalRate", "show", "false");
	}
	function closeMaterialRateAlert(e){
		e.stopPropagation();
		showhidemodal("materialModalRate", "hide", "true");
		chrome.storage.sync.set({"firstsawrate": false});
	}
	// scroll
	function materialScrollAlert(){
		showhidemodal("materialModalScroll", "show", "false");
	}
	function closeMaterialScrollAlert(e){
		e.stopPropagation();
		showhidemodal("materialModalScroll", "hide", "true");
		chrome.storage.sync.set({"firstsawscroll": true});
	}

	$("materialModalRateButtonOK").addEventListener("click", function(e){
		closeMaterialRateAlert(e);
		window.open(writereview); chrome.storage.sync.set({"reviewedlastonversion": chrome.runtime.getManifest().version});
	});
	$("materialModalRateButtonCANCEL").addEventListener("click", function(e){
		closeMaterialRateAlert(e);
	});
	$("materialModalScrollButtonOK").addEventListener("click", function(e){
		closeMaterialScrollAlert(e);
	});
});

function addtonight(){
	var thatopenurl = document.getElementById("currentweburl").getAttribute("data-fullurl");
	nightDomains[thatopenurl] = true;
}

function removetonight(){
	var thatopenurl = document.getElementById("currentweburl").getAttribute("data-fullurl");
	delete nightDomains[thatopenurl];
}

function test(){
	$("nightonly").checked == true ? $("sitecheck").disabled = false : $("sitecheck").disabled = true;
	$("sitecheck").checked == true ? addtonight() : removetonight();
	if($("ambilight").checked == true){
		atmosdisable(false); if($("ambilightvarcolor").checked){ $("atmosvivid").disabled = false; }else{ $("atmosvivid").disabled = true; }
	}else{
		atmosdisable(true); if($("ambilightvarcolor").checked){ $("atmosvivid").disabled = true; }else{ $("atmosvivid").disabled = true; }
	}
	if($("nightmodeimage").checked == true){
		$("nmimagedark").disabled = false;
		$("nmimagegray").disabled = false;
	}else{
		$("nmimagedark").disabled = true;
		$("nmimagegray").disabled = true;
	}
}

function atmosdisable(status){
	$("ambilightfixcolor").disabled = status;
	$("ambilight4color").disabled = status;
	$("ambilightvarcolor").disabled = status;
}

var currentlayercolor;
function colorchange(){
	var elem = this;
	var bckbutton = window.getComputedStyle(elem, null).getPropertyValue("background-color");
	currentlayercolor = rgb2hex(bckbutton);
	chrome.storage.sync.set({"lightcolor": currentlayercolor, "lightimagea": false, "lightimagen": true, "lightimagelin": false});
	executelivechange();
}

function opacitychange(){
	var thatvalue = $("oslider").value;
	$("otext").innerText = thatvalue;
	chrome.storage.sync.set({"interval": thatvalue});
	executelivechange();
}

function codetask(a, b, c){
	if(document.getElementById("stefanvdlightareoff1")){
		var div = document.getElementsByTagName("div");
		var i;
		var l = div.length;
		for(i = 0; i < l; i++){
			if(div[i].className == ("stefanvdlightareoff")){
				div[i].style.background = c;
				div[i].style.opacity = (b / 100);
			}
		}
		var metas = document.getElementsByTagName("meta");
		var m, p = metas.length;
		for(m = 0; m < p; m++){
			if(metas[m].getAttribute("name") == "theme-color"){
				if(metas[m].getAttribute("media")){
					if(metas[m].getAttribute("media") == "(prefers-color-scheme: light)"){
						metas[m].setAttribute("content", a);
					}else if(metas[m].getAttribute("media") == "(prefers-color-scheme: dark)"){
						metas[m].setAttribute("content", a);
					}
				}else{
					metas[m].setAttribute("content", a);
				}
			}
		}
	}
	if(document.getElementById("stefanvdscreenshader")){
		document.getElementById("stefanvdscreenshader").style.opacity = b; document.getElementById("stefanvdscreenshader").style.background = a;
	}
}

function executelivechange(){
	chrome.tabs.query({
		active: true,
		currentWindow: true
	}, function(tabs){
		var newlightoffcolor = newconvertHex(currentlayercolor, $("oslider").value);
		var currentopac = $("oslider").value;
		chrome.scripting.executeScript({
			target: {tabId: tabs[0].id},
			func: codetask,
			args: [newlightoffcolor, currentopac, currentlayercolor]
		});
	});
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

function rgb2hex(rgb){
	rgb = rgb.match(/^rgba?[\s+]?\([\s+]?(\d+)[\s+]?,[\s+]?(\d+)[\s+]?,[\s+]?(\d+)[\s+]?/i);
	return(rgb && rgb.length === 4) ? "#" +
  ("0" + parseInt(rgb[1], 10).toString(16)).slice(-2) +
  ("0" + parseInt(rgb[2], 10).toString(16)).slice(-2) +
  ("0" + parseInt(rgb[3], 10).toString(16)).slice(-2) : "";
}

function savecolorcustom(name, elem){
	var currentcolor = $(elem).value;
	var pair = {}; pair[name] = currentcolor;
	chrome.storage.sync.set(pair);
}

function savecolorchange(savename, elem, that){
	var currentcolor = window.getComputedStyle(that, null).getPropertyValue("background-color");
	$(elem).value = rgb2hex(currentcolor);
	savecolorcustom(savename, elem);
}

function nightmodebckcolorchange(){ savecolorchange("nightmodebck", "colornightmodebckcustom", this); }
function nightmodebckcolorchangecustom(){ savecolorcustom("nightmodebck", "colornightmodebckcustom"); }
function nightmodetextcolorchange(){ savecolorchange("nightmodetxt", "colornightmodetxtcustom", this); }
function nightmodetextcolorchangecustom(){ savecolorcustom("nightmodetxt", "colornightmodetxtcustom"); }
function nightmodelinkcolorchange(){ savecolorchange("nightmodehyperlink", "colornightmodehyperlinkcustom", this); }
function nightmodelinkcolorchangecustom(){ savecolorcustom("nightmodehyperlink", "colornightmodehyperlinkcustom"); }
function nightmodebuttoncolorchange(){ savecolorchange("nightmodebutton", "colornightmodebuttoncustom", this); }
function nightmodebuttoncolorchangecustom(){ savecolorcustom("nightmodebutton", "colornightmodebuttoncustom"); }
function nightmodebordercolorchange(){ savecolorchange("nightmodeborder", "colornightmodebordercustom", this); }
function nightmodebordercolorchangecustom(){ savecolorcustom("nightmodeborder", "colornightmodebordercustom"); }