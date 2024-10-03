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

// support for older web browsers such as Safari 14 on macOS 10.15
var ft = ".png";
function support_format_webp(){
	var elem = document.createElement("canvas");
	if(elem.getContext && elem.getContext("2d")){
		// was able or not to get WebP representation
		return elem.toDataURL("image/webp").indexOf("data:image/webp") == 0;
	}else{
		// very old browser like IE 8, canvas not supported
		return false;
	}
}
if(support_format_webp() == true){
	ft = ".webp";
}else{
	ft = ".png";
}

function eventsubmitFunc(selector, callback){
	document.getElementById(selector).addEventListener("submit", function(e){
		e.preventDefault();
		callback();
	});
}

function getalldomains(a){
	var atmosphereDomainsBox = $(a);
	var atmosphereDomains = {};
	var atmospherei;
	var atmospherel = atmosphereDomainsBox.length;
	for(atmospherei = 0; atmospherei < atmospherel; atmospherei++){ atmosphereDomains[atmosphereDomainsBox.options[atmospherei].value] = true; }
	return JSON.stringify(atmosphereDomains);
}

function setdynimages(a){
	let n = 0;
	while(n < 10){
		n++;
		var path;
		if(a == 1){
			path = ["images/totldyn" + n + ft, "images/totldyn" + n + "@2x" + ft];
		}else{
			path = ["", ""];
		}
		$("bckdyn" + n + "").setAttribute("src", path[0]); $("bckdyn" + n + "").setAttribute("srcset", path[1]);
	}
}

var default_opacity = 80;
var default_arangeblur = 70;
var default_arangespread = 20;
var youtubeembed = "https://www.youtube.com/embed/?listType=playlist&list=PLF155F53B3D8D07CB";
var darkmode = false;

// Option to save current value to chrome.storage
function save_options(){
	chrome.runtime.sendMessage({name: "getallpermissions"});

	var gpleftstick = document.getElementById("gpleftstick");
	var gprightstick = document.getElementById("gprightstick");

	var gpbtnx = document.getElementById("gpbtnx");
	var gpbtno = document.getElementById("gpbtno");
	var gpbtnsquare = document.getElementById("gpbtnsquare");
	var gpbtntriangle = document.getElementById("gpbtntriangle");
	var gpbtnlb = document.getElementById("gpbtnlb");
	var gpbtnrb = document.getElementById("gpbtnrb");
	var gpbtnlt = document.getElementById("gpbtnlt");
	var gpbtnrt = document.getElementById("gpbtnrt");
	var gpbtnshare = document.getElementById("gpbtnshare");
	var gpbtnmenu = document.getElementById("gpbtnmenu");
	var gpbtnrightstick = document.getElementById("gpbtnrightstick");
	var gpbtnleftstick = document.getElementById("gpbtnleftstick");
	var gpbtndirup = document.getElementById("gpbtndirup");
	var gpbtndirdown = document.getElementById("gpbtndirdown");
	var gpbtndirleft = document.getElementById("gpbtndirleft");
	var gpbtndirright = document.getElementById("gpbtndirright");
	var gpbtnlogo = document.getElementById("gpbtnlogo");

	var ytselq = document.getElementById("maxquality");
	var html5volumesteps = document.getElementById("videovolumesteps");
	var linearsq = document.getElementById("linearsq");

	// multiopacity Excluded domains
	var multiopacityDomainsBox = $("multiopacityDomainsBox");
	var multiopacitynumberBox = $("multiopacitynumberBox");
	var websitemulti = {};
	var multiopacityi;
	var multiopacityl = multiopacityDomainsBox.length;
	for(multiopacityi = 0; multiopacityi < multiopacityl; multiopacityi++){
		var getnumber = multiopacitynumberBox.options[multiopacityi].text;
		websitemulti[multiopacityDomainsBox.options[multiopacityi].value] = getnumber;
	}

	chrome.storage.sync.set({"interval":$("interval").value, "lightcolor":$("lightcolor").value, "autodim":$("autodim").checked, "playlist":$("playlist").checked, "flash":$("flash").checked, "head":$("head").checked, "fadein":$("fadein").checked, "fadeout":$("fadeout").checked, "infobar":$("infobar").checked, "sharebutton":$("sharebutton").checked, "likebutton":$("likebutton").checked, "readera":$("readera").checked, "readern":$("readern").checked, "shortcutlight":$("shortcutlight").checked, "eyea":$("eyea").checked, "eyen":$("eyen").checked, "suggestions":$("suggestions").checked, "videoheadline":$("videoheadline").checked, "eastereggs":$("eastereggs").checked, "contextmenus":$("contextmenus").checked, "viewcount":$("viewcount").checked, "lightimage":$("lightimage").value, "lightimagea":$("lightimagea").checked, "lightimagen":$("lightimagen").checked, "eyealist":$("eyealist").checked, "mousespotlighto":$("mousespotlighto").checked, "mousespotlighta":$("mousespotlighta").checked, "mousespotlightc":$("mousespotlightc").checked, "nighttime":$("nighttime").checked, "begintime":$("begintime").value, "endtime":$("endtime").value, "addvideobutton":$("addvideobutton").checked, "likebar":$("likebar").checked, "ambilight":$("ambilight").checked, "ambilightrangeblurradius":$("ambilightrangeblurradius").value, "ambilightrangespreadradius":$("ambilightrangespreadradius").value, "mousespotlightt":$("mousespotlightt").checked, "ambilightfixcolor":$("ambilightfixcolor").checked, "ambilightvarcolor":$("ambilightvarcolor").checked, "ambilightcolorhex":$("ambilightcolorhex").value, "ambilight4color":$("ambilight4color").checked, "ambilight1colorhex":$("ambilight1colorhex").value, "ambilight2colorhex":$("ambilight2colorhex").value, "ambilight3colorhex":$("ambilight3colorhex").value, "ambilight4colorhex":$("ambilight4colorhex").value, "password":$("password").checked, "enterpassword":$("enterpassword").value, "noflash":$("noflash").checked, "hardflash":$("hardflash").checked, "ecosaver":$("ecosaver").checked, "ecosavertime":$("ecosavertime").value, "dynamic":$("dynamic").checked, "dynamic1":$("dynamic1").checked, "dynamic2":$("dynamic2").checked, "dynamic3":$("dynamic3").checked, "dynamic4":$("dynamic4").checked, "dynamic5":$("dynamic5").checked, "dynamic6":$("dynamic6").checked, "dynamic7":$("dynamic7").checked, "dynamic8":$("dynamic8").checked, "dynamic9":$("dynamic9").checked, "dynamic10":$("dynamic10").checked, "hoveroptiondyn5":$("hoveroptiondyn5").checked, "autodimonly":$("autodimonly").checked, "blur":$("blur").checked, "maxquality":ytselq.options[ytselq.selectedIndex].value, "autowidthyoutube":$("autowidthyoutube").checked, "customqualityyoutube":$("customqualityyoutube").checked, "cinemaontop":$("cinemaontop").checked, "alllightsoff":$("alllightsoff").checked, "spotlightradius":$("spotlightradius").value, "atmosphereonly":$("atmosphereonly").checked, "optionskipremember":$("optionskipremember").checked, "nighttheme":$("nighttheme").checked, "nightonly":$("nightonly").checked, "nightenabletheme":$("nightenabletheme").checked, "autodimdelay":$("autodimdelay").checked, "autodimdelaytime":$("autodimdelaytime").value, "lightimagelin":$("lightimagelin").checked, "linearsq":linearsq.options[linearsq.selectedIndex].value, "colora":$("colora").value, "intervallina":$("intervallina").value, "colorb":$("colorb").value, "intervallinb":$("intervallinb").value, "atmosvivid":$("atmosvivid").checked, "autodimchecklistwhite":$("autodimchecklistwhite").checked, "autodimchecklistblack":$("autodimchecklistblack").checked, "autostop":$("autostop").checked, "autostoponly":$("autostoponly").checked, "autostopchecklistwhite":$("autostopchecklistwhite").checked, "autostopchecklistblack":$("autostopchecklistblack").checked, "nighthover":$("nighthover").checked, "nightmodechecklistwhite":$("nightmodechecklistwhite").checked, "nightmodechecklistblack":$("nightmodechecklistblack").checked, "nmtopleft":$("nmtopleft").checked, "nmtopright":$("nmtopright").checked, "nmbottomright":$("nmbottomright").checked, "nmbottomleft":$("nmbottomleft").checked, "nmcustom":$("nmcustom").checked, "nightactivetime":$("nightactivetime").checked, "nmbegintime":$("nmbegintime").value, "nmendtime":$("nmendtime").value, "lampandnightmode":$("lampandnightmode").checked, "eyechecklistwhite":$("eyechecklistwhite").checked, "eyechecklistblack":$("eyechecklistblack").checked, "nightmodebck":$("nightmodebck").value, "nightmodetxt":$("nightmodetxt").value, "no360youtube":$("no360youtube").checked, "videotool":$("videotool").checked, "reflection":$("reflection").checked, "reflectionamount":$("reflectionamount").value, "videotoolonly":$("videotoolonly").checked, "videotoolchecklistwhite":$("videotoolchecklistwhite").checked, "videotoolchecklistblack":$("videotoolchecklistblack").checked, "nightmodehyperlink":$("nightmodehyperlink").value, "block60fps":$("block60fps").checked, "excludedDomains":getalldomains("excludedDomainsBox"), "autodimDomains":getalldomains("autodimDomainsBox"), "atmosphereDomains":getalldomains("atmosphereDomainsBox"), "nightDomains":getalldomains("nightDomainsBox"), "autostopDomains":getalldomains("autostopDomainsBox"), "videotoolDomains":getalldomains("videotoolDomainsBox"), "videovolume":$("videovolume").checked, "videovolumecolor":$("videovolumecolor").value, "videovolumesteps":html5volumesteps.options[html5volumesteps.selectedIndex].value, "videovolumelabel":$("videovolumelabel").checked, "icon":$("btnpreview").getAttribute("data-icon"), "visopacity":$("visopacity").value, "videotoolcolor":$("videotoolcolor").value, "hovervideo":$("hovervideo").checked, "hovervideoamount":$("hovervideoamount").value, "mousespotlights":$("mousespotlights").checked, "drawatmosfps":$("drawatmosfps").value, "aplay":$("aplay").checked, "apause":$("apause").checked, "astop":$("astop").checked, "videozoom":$("videozoom").checked, "playrate":$("playrate").checked, "playrateamount":$("playrateamount").value, "speedtoolbar":$("speedtoolbar").checked, "atmosontotlmode":$("atmosontotlmode").checked, "titleinvertcolor":$("titleinvertcolor").value, "vpause":$("vpause").checked, "darkbrowsertheme":$("darkbrowsertheme").checked, "autostopred":$("autostopred").checked, "autostoptrans":$("autostoptrans").checked, "videovolumeposa":$("videovolumeposa").checked, "videovolumeposb":$("videovolumeposb").checked, "videovolumeposc":$("videovolumeposc").checked, "videovolumehold":$("videovolumehold").checked, "multiopacall":$("multiopacall").checked, "multiopacsel":$("multiopacsel").checked, "multiopacityDomains":JSON.stringify(websitemulti), "videovolumealt":$("videovolumealt").checked, "nightmodebydomain":$("nightmodebydomain").checked, "nightmodebypage":$("nightmodebypage").checked, "seeanalytics":$("seeanalytics").checked, "nightmodegesture":$("nightmodegesture").checked, "nightmodeswitchhide":$("nightmodeswitchhide").checked, "nightmodeswitchhidetime":$("nightmodeswitchhidetime").value, "atmosfpsauto":$("atmosfpsauto").checked, "atmosfpsmanual":$("atmosfpsmanual").checked, "videovolumeonly":$("videovolumeonly").checked, "videovolumechecklistwhite":$("videovolumechecklistwhite").checked, "videovolumechecklistblack":$("videovolumechecklistblack").checked, "videovolumeDomains":getalldomains("videovolumeDomainsBox"), "videovolumescrolla":$("videovolumescrolla").checked, "videovolumescrollb":$("videovolumescrollb").checked, "videovolumescrollc":$("videovolumescrollc").checked, "videovolumeposd":$("videovolumeposd").checked, "videovolumepose":$("videovolumepose").checked, "nightmodebutton":$("nightmodebutton").value, "gamepad":$("gamepad").checked, "nightmodeos":$("nightmodeos").checked, "gpleftstick":gpleftstick.options[gpleftstick.selectedIndex].value, "gprightstick":gprightstick.options[gprightstick.selectedIndex].value, "gpbtnx":gpbtnx.options[gpbtnx.selectedIndex].value, "gpbtno":gpbtno.options[gpbtno.selectedIndex].value, "gpbtnsquare":gpbtnsquare.options[gpbtnsquare.selectedIndex].value, "gpbtntriangle":gpbtntriangle.options[gpbtntriangle.selectedIndex].value, "gpbtnlb":gpbtnlb.options[gpbtnlb.selectedIndex].value, "gpbtnrb":gpbtnrb.options[gpbtnrb.selectedIndex].value, "gpbtnlt":gpbtnlt.options[gpbtnlt.selectedIndex].value, "gpbtnrt":gpbtnrt.options[gpbtnrt.selectedIndex].value, "gpbtnshare":gpbtnshare.options[gpbtnshare.selectedIndex].value, "gpbtnmenu":gpbtnmenu.options[gpbtnmenu.selectedIndex].value, "gpbtnrightstick":gpbtnrightstick.options[gpbtnrightstick.selectedIndex].value, "gpbtnleftstick":gpbtnleftstick.options[gpbtnleftstick.selectedIndex].value, "gpbtndirup":gpbtndirup.options[gpbtndirup.selectedIndex].value, "gpbtndirdown":gpbtndirdown.options[gpbtndirdown.selectedIndex].value, "gpbtndirleft":gpbtndirleft.options[gpbtndirleft.selectedIndex].value, "gpbtndirright":gpbtndirright.options[gpbtndirright.selectedIndex].value, "gpbtnlogo":gpbtnlogo.options[gpbtnlogo.selectedIndex].value, "nightmodeborder":$("nightmodeborder").value, "nmautobegintime":$("nmautobegintime").value, "nmautoendtime":$("nmautoendtime").value, "nmautoclock":$("nmautoclock").checked, "gamepadDomains":getalldomains("gamepadDomainsBox"), "gamepadchecklistwhite":$("gamepadchecklistwhite").checked, "gamepadchecklistblack":$("gamepadchecklistblack").checked, "gamepadonly":$("gamepadonly").checked, "nightmodeimage":$("nightmodeimage").checked, "nmimagedark":$("nmimagedark").value, "nmimagegray":$("nmimagegray").value});
}

var firstdefaultvalues = {};
function defaultgetsettings(){
	// Option default value to read if there is no current value from chrome.storage AND init default value
	chrome.storage.sync.get(["lightcolor", "ambilightcolorhex", "ambilight1colorhex", "ambilight2colorhex", "ambilight3colorhex", "ambilight4colorhex", "colora", "colorb", "nightmodebck", "nightmodetxt", "nightmodehyperlink", "videovolumecolor", "videotoolcolor", "titleinvertcolor", "nightmodebutton", "lightimage", "spotlightradius", "linearsq", "intervallina", "intervallinb", "reflectionamount", "videovolumesteps", "nmbegintime", "nmendtime", "ecosavertime", "begintime", "endtime", "nightmodeswitchhidetime", "playrateamount", "drawatmosfps", "hovervideoamount", "visopacity", "autodimdelaytime", "autodimDomains", "atmosphereDomains", "nightDomains", "autostopDomains", "videotoolDomains", "videovolumeDomains", "multiopacityDomains", "fadein", "fadeout", "readera", "readern", "lightimagea", "lightimagen", "mousespotlighta", "mousespotlightc", "mousespotlighto", "mousespotlightt", "eyea", "eyen", "eyealist", "interval", "ambilightrangeblurradius", "ambilightrangespreadradius", "ambilightvarcolor", "ambilightfixcolor", "ambilight4color", "flash", "noflash", "noflash", "dynamic1", "dynamic2", "dynamic3", "dynamic4", "dynamic5", "dynamic6", "dynamic7", "dynamic8", "dynamic9", "dynamic10", "hoveroptiondyn5", "maxquality", "autodimchecklistwhite", "autodimchecklistblack", "autostopchecklistwhite", "autostopchecklistblack", "videotoolchecklistwhite", "videotoolchecklistblack", "nightmodechecklistwhite", "nightmodechecklistblack", "nmtopleft", "nmtopright", "nmbottomright", "nmbottomleft", "nmcustom", "eyechecklistwhite", "eyechecklistblack", "videovolumesteps", "videovolumelabel", "mousespotlights", "aplay", "apause", "astop", "autostopred", "autostoptrans", "videovolumeposa", "videovolumeposb", "videovolumeposc", "multiopacall", "multiopacsel", "nightmodebydomain", "nightmodebypage", "seeanalytics", "atmosfpsauto", "atmosfpsmanual", "videovolumechecklistwhite", "videovolumechecklistblack", "videovolumescrolla", "videovolumescrollb", "videovolumescrollc", "videovolumeposd", "videovolumepose", "gpleftstick", "gprightstick", "gpbtnx", "gpbtno", "gpbtnsquare", "gpbtntriangle", "gpbtnlb", "gpbtnrb", "gpbtnlt", "gpbtnrt", "gpbtnshare", "gpbtnmenu", "gpbtnrightstick", "gpbtnleftstick", "gpbtndirup", "gpbtndirdown", "gpbtndirleft", "gpbtndirright", "gpbtnlogo", "nightmodeborder", "nmautobegintime", "nmautoendtime", "gamepadDomains", "gamepadchecklistwhite", "gamepadchecklistblack", "nightmodeimage", "nmimagedark", "nmimagegray"], function(items){
		// find no localstore lightcolor
		if(items["lightcolor"] == null){ firstdefaultvalues["lightcolor"] = "#000000"; }
		// find no localstore ambilightcolorhex
		if(items["ambilightcolorhex"] == null){ firstdefaultvalues["ambilightcolorhex"] = "#47C2FF"; }
		// find no localstore ambilight1colorhex
		if(items["ambilight1colorhex"] == null){ firstdefaultvalues["ambilight1colorhex"] = "#FF0000"; }
		if(items["ambilight2colorhex"] == null){ firstdefaultvalues["ambilight2colorhex"] = "#FFEE00"; }
		if(items["ambilight3colorhex"] == null){ firstdefaultvalues["ambilight3colorhex"] = "#00FF00"; }
		if(items["ambilight4colorhex"] == null){ firstdefaultvalues["ambilight4colorhex"] = "#0000FF"; }

		if(items["colora"] == null){ firstdefaultvalues["colora"] = "#000000"; }
		if(items["colorb"] == null){ firstdefaultvalues["colorb"] = "#858585"; }

		if(items["nightmodebck"] == null){ firstdefaultvalues["nightmodebck"] = "#1e1e1e"; }
		if(items["nightmodetxt"] == null){ firstdefaultvalues["nightmodetxt"] = "#ffffff"; }
		if(items["nightmodehyperlink"] == null){ firstdefaultvalues["nightmodehyperlink"] = "#ffffff"; }

		if(items["videovolumecolor"] == null){ firstdefaultvalues["videovolumecolor"] = "#167ac6"; }

		if(items["videotoolcolor"] == null){ firstdefaultvalues["videotoolcolor"] = "#000000"; }

		if(items["titleinvertcolor"] == null){ firstdefaultvalues["titleinvertcolor"] = "#ffffff"; }

		if(items["nightmodebutton"] == null){ firstdefaultvalues["nightmodebutton"] = "#353535"; }

		if(items["nightmodeborder"] == null){ firstdefaultvalues["nightmodeborder"] = "#545454"; }

		if(items["lightimage"] == null){ firstdefaultvalues["lightimage"] = "https://www.turnoffthelights.com/extension/images/theater.jpg"; }

		if(items["spotlightradius"] == null){ firstdefaultvalues["spotlightradius"] = 50; }

		if(items["linearsq"] == null){ firstdefaultvalues["linearsq"] = "top"; }
		if(items["intervallina"] == null){ firstdefaultvalues["intervallina"] = 0; }
		if(items["intervallinb"] == null){ firstdefaultvalues["intervallinb"] = 100; }
		if(items["reflectionamount"] == null){ firstdefaultvalues["reflectionamount"] = 20; }
		if(items["videovolumesteps"] == null){ firstdefaultvalues["reflectionamount"] = 5; }

		if(items["nightmodeimage"] == null){ firstdefaultvalues["nightmodeimage"] = false; }
		if(items["nmimagedark"] == null){ firstdefaultvalues["nmimagedark"] = 60; }
		if(items["nmimagegray"] == null){ firstdefaultvalues["nmimagegray"] = 50; }

		if(items["nmbegintime"] == null){ firstdefaultvalues["nmbegintime"] = "21:00"; }
		if(items["nmendtime"] == null){ firstdefaultvalues["nmendtime"] = "23:45"; }

		if(items["nmautobegintime"] == null){ firstdefaultvalues["nmautobegintime"] = "21:00"; }
		if(items["nmautoendtime"] == null){ firstdefaultvalues["nmautoendtime"] = "23:45"; }

		if(items["ecosavertime"] == null){ firstdefaultvalues["ecosavertime"] = 60; }

		if(items["begintime"] == null){ firstdefaultvalues["begintime"] = "21:00"; }
		if(items["endtime"] == null){ firstdefaultvalues["endtime"] = "23:45"; }

		if(items["nightmodeswitchhidetime"] == null){ firstdefaultvalues["nightmodeswitchhidetime"] = 3; }
		if(items["playrateamount"] == null){ firstdefaultvalues["playrateamount"] = 1; }

		if(items["drawatmosfps"] == null){ firstdefaultvalues["drawatmosfps"] = 12; }

		if(items["hovervideoamount"] == null){ firstdefaultvalues["hovervideoamount"] = 3; }

		if(items["visopacity"] == null){ firstdefaultvalues["visopacity"] = 80; }

		if(items["autodimdelaytime"] == null){ firstdefaultvalues["autodimdelaytime"] = 3; }

		if(items["interval"] == null){ firstdefaultvalues["interval"] = 80; }

		if(items["ambilightrangeblurradius"] == null){ firstdefaultvalues["ambilightrangeblurradius"] = 70; }
		if(items["ambilightrangespreadradius"] == null){ firstdefaultvalues["ambilightrangespreadradius"] = 20; }

		if(items["nightDomains"] == null){ firstdefaultvalues["nightDomains"] = JSON.stringify({"https://www.youtube.com": true, "https://www.nytimes.com": true, "http://192.168.1.1": true}); }

		if(items["autodimDomains"] == null || items["atmosphereDomains"] == null || items["autostopDomains"] == null || items["videotoolDomains"] == null || items["videovolumeDomains"] == null || items["gamepadDomains"] == null){
			firstdefaultvalues["autodimDomains"] = firstdefaultvalues["atmosphereDomains"] = firstdefaultvalues["autostopDomains"] = firstdefaultvalues["videotoolDomains"] = firstdefaultvalues["videovolumeDomains"] = firstdefaultvalues["gamepadDomains"] = JSON.stringify({"https://www.youtube.com": true, "https://vimeo.com": true});
		}

		if(items["multiopacityDomains"] == null){ firstdefaultvalues["multiopacityDomains"] = JSON.stringify({"https://www.example.com": ["90"], "https://www.nytimes.com": ["85"]}); }

		// find no localstore fadein
		if(items["fadein"] == null){ firstdefaultvalues["fadein"] = true; }
		// find no localstore fadeout
		if(items["fadeout"] == null){ firstdefaultvalues["fadeout"] = true; }
		// find no localstore reader
		if(items["readera"] == null && items["readern"] == null){ firstdefaultvalues["readern"] = true; firstdefaultvalues["readera"] = false; }
		// find no localstore lightimage
		if(items["lightimagea"] == null && items["lightimagen"] == null){ firstdefaultvalues["lightimagen"] = true; firstdefaultvalues["lightimagea"] = false; }
		// find no localstore mouse
		if(items["mousespotlighta"] == null && items["mousespotlightc"] == null && items["mousespotlighto"] == null && items["mousespotlightt"] == null && items["mousespotlights"] == null){ firstdefaultvalues["mousespotlighto"] = true; firstdefaultvalues["mousespotlightc"] = false; firstdefaultvalues["mousespotlighta"] = false; firstdefaultvalues["mousespotlightt"] = false; firstdefaultvalues["mousespotlights"] = false; }
		// find no localstore eye
		if(items["eyea"] == null && items["eyen"] == null && items["eyealist"] == null){ firstdefaultvalues["eyen"] = true; firstdefaultvalues["eyea"] = false; firstdefaultvalues["eyealist"] = false; }

		// find no localstore atmos
		if(items["ambilightvarcolor"] == null && items["ambilightfixcolor"] == null && items["ambilight4color"] == null){ firstdefaultvalues["ambilightfixcolor"] = true; firstdefaultvalues["ambilightvarcolor"] = false; firstdefaultvalues["ambilight4color"] = false; }
		// find no localstore flash
		if(items["flash"] == null && items["noflash"] == null && items["noflash"] == null){ firstdefaultvalues["noflash"] = true; firstdefaultvalues["flash"] = false; firstdefaultvalues["hardflash"] = false; }
		// find no localstore dynamic
		if(items["dynamic1"] == null && items["dynamic2"] == null && items["dynamic3"] == null && items["dynamic4"] == null && items["dynamic5"] == null && items["dynamic6"] == null && items["dynamic7"] == null && items["dynamic8"] == null && items["dynamic9"] == null && items["dynamic10"] == null){ firstdefaultvalues["dynamic1"] = true; firstdefaultvalues["dynamic2"] = false; firstdefaultvalues["dynamic3"] = false; firstdefaultvalues["dynamic4"] = false; firstdefaultvalues["dynamic5"] = false; firstdefaultvalues["dynamic6"] = false; firstdefaultvalues["dynamic7"] = false; firstdefaultvalues["dynamic8"] = false; firstdefaultvalues["dynamic9"] = false; firstdefaultvalues["dynamic10"] = false; }
		// find no localstore hoverdyn
		if(items["hoveroptiondyn5"] == null){ firstdefaultvalues["hoveroptiondyn5"] = true; }
		// find no localstore maxquality
		if(items["maxquality"] == null){ firstdefaultvalues["maxquality"] = "hd1080"; }
		// find no localstore autodim whitelist
		if(items["autodimchecklistwhite"] == null && items["autodimchecklistblack"] == null){ firstdefaultvalues["autodimchecklistwhite"] = true; firstdefaultvalues["autodimchecklistblack"] = false; }
		// find no localstore autostop whitelist
		if(items["autostopchecklistwhite"] == null && items["autostopchecklistblack"] == null){ firstdefaultvalues["autostopchecklistwhite"] = true; firstdefaultvalues["autostopchecklistblack"] = false; }
		// find no localstore videotool whitelist
		if(items["videotoolchecklistwhite"] == null && items["videotoolchecklistblack"] == null){ firstdefaultvalues["videotoolchecklistwhite"] = true; firstdefaultvalues["videotoolchecklistblack"] = false; }
		// find no localstore gamepad whitelist
		if(items["gamepadchecklistwhite"] == null && items["gamepadchecklistblack"] == null){ firstdefaultvalues["gamepadchecklistwhite"] = true; firstdefaultvalues["gamepadchecklistblack"] = false; }
		// find no localstore nightmode whitelist
		if(items["nightmodechecklistwhite"] == null && items["nightmodechecklistblack"] == null){ firstdefaultvalues["nightmodechecklistwhite"] = true; firstdefaultvalues["nightmodechecklistblack"] = false; }
		// find no localstore eye
		if(items["nmtopleft"] == null && items["nmtopright"] == null && items["nmbottomright"] == null && items["nmbottomleft"] == null && items["nmcustom"] == null){ firstdefaultvalues["nmtopleft"] = false; firstdefaultvalues["nmtopright"] = false; firstdefaultvalues["nmbottomright"] = false; firstdefaultvalues["nmbottomleft"] = true; firstdefaultvalues["nmcustom"] = false; }
		// find no localstore eye whitelist
		if(items["eyechecklistwhite"] == null && items["eyechecklistblack"] == null){ firstdefaultvalues["eyechecklistwhite"] = true; firstdefaultvalues["eyechecklistblack"] = false; }
		if(items["videovolumechecklistwhite"] == null && items["videovolumechecklistblack"] == null){ firstdefaultvalues["videovolumechecklistwhite"] = true; firstdefaultvalues["videovolumechecklistblack"] = false; }

		// find no localstore volume steps
		if(items["videovolumesteps"] == null){ firstdefaultvalues["videovolumesteps"] = 5; }
		// find no localstore volume label
		if(items["videovolumelabel"] == null){ firstdefaultvalues["videovolumelabel"] = true; }

		// find no localstore a play pause and stop button
		if(items["aplay"] == null){ firstdefaultvalues["aplay"] = true; }
		if(items["apause"] == null){ firstdefaultvalues["apause"] = true; }
		if(items["astop"] == null){ firstdefaultvalues["astop"] = true; }

		// find no localstore a autostopred
		if(items["autostopred"] == null && items["autostoptrans"] == null){ firstdefaultvalues["autostopred"] = true; firstdefaultvalues["autostoptrans"] = false; }

		// find no localstore volume meter position
		if(items["videovolumeposa"] == null && items["videovolumeposb"] == null && items["videovolumeposc"] == null && items["videovolumeposd"] == null && items["videovolumepose"] == null){ firstdefaultvalues["videovolumeposa"] = true; firstdefaultvalues["videovolumeposb"] = false; firstdefaultvalues["videovolumeposc"] = false; firstdefaultvalues["videovolumeposd"] = false; firstdefaultvalues["videovolumepose"] = false; }

		// find no localstore a multiopacity
		if(items["multiopacall"] == null && items["multiopacsel"] == null){ firstdefaultvalues["multiopacall"] = true; firstdefaultvalues["multiopacsel"] = false; }

		// find no localstore a nightmodebydomain
		if(items["nightmodebydomain"] == null && items["nightmodebypage"] == null){ firstdefaultvalues["nightmodebydomain"] = true; firstdefaultvalues["nightmodebypage"] = false; }

		// find no localstore a seeanalytics
		if(items["seeanalytics"] == null){ firstdefaultvalues["seeanalytics"] = true; }

		// find no localstore atmos fps
		if(items["atmosfpsauto"] == null && items["atmosfpsmanual"] == null){ firstdefaultvalues["atmosfpsmanual"] = true; firstdefaultvalues["atmosfpsauto"] = false; }

		// find no localstore volume scroll direction
		if(items["videovolumescrolla"] == null && items["videovolumescrollb"] == null && items["videovolumescrollc"] == null){ firstdefaultvalues["videovolumescrolla"] = true; firstdefaultvalues["videovolumescrollb"] = false; firstdefaultvalues["videovolumescrollc"] = false; }

		// find no localstore gp
		if(items["gpleftstick"] == null){ firstdefaultvalues["gpleftstick"] = 0; }
		if(items["gprightstick"] == null){ firstdefaultvalues["gprightstick"] = 1; }

		if(items["gpbtnx"] == null){ firstdefaultvalues["gpbtnx"] = 0; }
		if(items["gpbtno"] == null){ firstdefaultvalues["gpbtno"] = 1; }
		if(items["gpbtnsquare"] == null){ firstdefaultvalues["gpbtnsquare"] = 2; }
		if(items["gpbtntriangle"] == null){ firstdefaultvalues["gpbtntriangle"] = 3; }
		if(items["gpbtnlb"] == null){ firstdefaultvalues["gpbtnlb"] = 4; }
		if(items["gpbtnrb"] == null){ firstdefaultvalues["gpbtnrb"] = 5; }
		if(items["gpbtnlt"] == null){ firstdefaultvalues["gpbtnlt"] = 6; }
		if(items["gpbtnrt"] == null){ firstdefaultvalues["gpbtnrt"] = 7; }
		if(items["gpbtnshare"] == null){ firstdefaultvalues["gpbtnshare"] = 8; }
		if(items["gpbtnmenu"] == null){ firstdefaultvalues["gpbtnmenu"] = 9; }
		if(items["gpbtnrightstick"] == null){ firstdefaultvalues["gpbtnrightstick"] = 10; }
		if(items["gpbtnleftstick"] == null){ firstdefaultvalues["gpbtnleftstick"] = 10; }
		if(items["gpbtndirup"] == null){ firstdefaultvalues["gpbtndirup"] = 11; }
		if(items["gpbtndirdown"] == null){ firstdefaultvalues["gpbtndirdown"] = 12; }
		if(items["gpbtndirleft"] == null){ firstdefaultvalues["gpbtndirleft"] = 13; }
		if(items["gpbtndirright"] == null){ firstdefaultvalues["gpbtndirright"] = 14; }
		if(items["gpbtnlogo"] == null){ firstdefaultvalues["gpbtnlogo"] = 15; }

		// Save the init value
		chrome.storage.sync.set(firstdefaultvalues, function(){
			// console.log('Settings saved');
			read_options();
		});
	});
}

function read_options(){
	// open multi opacity
	$("btnmultiopacity").addEventListener("click", function(){
		materialAlert();
	});

	$("materialModal").addEventListener("click", function(e){
		closeMaterialAlert(e);
	});
	$("materialModalContent").addEventListener("click", function(e){
		e.stopPropagation();
	});
	$("materialModalButtonOK").addEventListener("click", function(e){
		closeMaterialAlert(e);
	});
	$("materialModalButtonCANCEL").addEventListener("click", function(e){
		closeMaterialAlert(e);
	});

	// rate
	$("materialModalRate").addEventListener("click", function(e){
		closeMaterialRateAlert(e);
	});
	$("materialModalRateContent").addEventListener("click", function(e){
		e.stopPropagation();
	});
	$("materialModalRateButtonWriteOK").addEventListener("click", function(e){
		closeMaterialRateAlert(e);
		window.open(writereview); $("sectionreviewbox").style.display = "none"; chrome.storage.sync.set({"reviewedlastonversion": chrome.runtime.getManifest().version});
	});
	$("materialModalRateButtonWriteCANCEL").addEventListener("click", function(e){
		closeMaterialRateAlert(e);
		chrome.storage.sync.set({"firstsawrate": false});
	});
	$("materialModalButtonSupportOK").addEventListener("click", function(e){
		closeMaterialRateAlert(e);
		window.open(linksupport);
		chrome.storage.sync.set({"firstsawrate": false});
	});
	$("materialModalButtonSupportCANCEL").addEventListener("click", function(e){
		closeMaterialRateAlert(e);
		chrome.storage.sync.set({"firstsawrate": false});
	});
	$("materialModalRateButtonCANCEL").addEventListener("click", function(e){
		closeMaterialRateAlert(e);
		chrome.storage.sync.set({"firstsawrate": false});
	});

	if(document.querySelector("input[name=\"rating\"]")){
		document.querySelectorAll("input[name=\"rating\"]").forEach((elem) => {
			elem.addEventListener("change", function(event){
				var item = event.target.value;
				if(item == 5 || item == 4){
					// good stars
					$("ratepage0").classList.add("hidden");
					$("ratepage1high").classList.remove("hidden");
				}else if(item == 3 || item == 2 || item == 1){
					// low stars
					$("ratepage0").classList.add("hidden");
					$("ratepage1low").classList.remove("hidden");
				}
			});
		});
	}

	// youtube
	$("materialModalYouTubeButtonOK").addEventListener("click", function(e){
		closeMaterialYouTubeAlert(e);
		chrome.storage.sync.set({"firstsawyoutube": true});
	});

	$("materialModalYouTubeButtonCANCEL").addEventListener("click", function(e){
		closeMaterialYouTubeCancel(e);
	});

	function showhidemodal(name, visible, status){
		document.getElementById(name).className = visible;
		document.getElementById(name).setAttribute("aria-disabled", status);
		setmetathemepopup(status);
	}

	// dialog
	function materialAlert(){
		document.getElementById("materialModalButtonCANCEL").style.display = "none";
		showhidemodal("materialModal", "show", "false");
	}
	function closeMaterialAlert(e){
		e.stopPropagation();
		showhidemodal("materialModal", "hide", "true");
	}

	// rate
	function materialRateAlert(){
		showhidemodal("materialModalRate", "show", "false");
	}
	function closeMaterialRateAlert(e){
		e.stopPropagation();
		showhidemodal("materialModalRate", "hide", "true");
	}

	// youtube
	function materialYouTubeAlert(){
		showhidemodal("materialModalYouTube", "show", "false");
	}
	function closeMaterialYouTubeCancel(e){
		e.stopPropagation();
		showhidemodal("materialModalYouTube", "hide", "true");
	}
	function closeMaterialYouTubeAlert(e){
		e.stopPropagation();
		window.open(linkyoutube, "_blank");
		showhidemodal("materialModalYouTube", "hide", "true");
	}

	var settingscheckboxarray = ["lightimagea", "lightimagen", "autodim", "playlist", "flash", "head", "fadein", "fadeout", "infobar", "sharebutton", "likebutton", "readera", "readern", "shortcutlight", "eyea", "eyen", "suggestions", "videoheadline", "eastereggs", "contextmenus", "viewcount", "eyealist", "mousespotlighto", "mousespotlightc", "mousespotlighta", "nighttime", "addvideobutton", "likebar", "ambilight", "mousespotlightt", "ambilightfixcolor", "ambilightvarcolor", "ambilight4color", "password", "noflash", "hardflash", "ecosaver", "hoveroptiondyn5", "blur", "autowidthyoutube", "customqualityyoutube", "cinemaontop", "alllightsoff", "optionskipremember", "nighttheme", "nightenabletheme", "autodimdelay", "lightimagelin", "atmosvivid", "autodimchecklistwhite", "autodimchecklistblack", "autostop", "autostopchecklistwhite", "autostopchecklistblack", "nighthover", "nightmodechecklistwhite", "nightmodechecklistblack", "nmtopleft", "nmtopright", "nmbottomright", "nmbottomleft", "nmcustom", "nightactivetime", "eyechecklistwhite", "eyechecklistblack", "no360youtube", "videotool", "reflection", "videotoolonly", "videotoolchecklistwhite", "videotoolchecklistblack", "block60fps", "videovolume", "videovolumelabel", "hovervideo", "mousespotlights", "aplay", "apause", "astop", "videozoom", "playrate", "speedtoolbar", "atmosontotlmode", "vpause", "darkbrowsertheme", "autostopred", "autostoptrans", "videovolumeposa", "videovolumeposb", "videovolumeposc", "videovolumehold", "multiopacall", "multiopacsel", "videovolumealt", "nightmodebydomain", "nightmodebypage", "seeanalytics", "nightmodegesture", "nightmodeswitchhide", "atmosfpsauto", "atmosfpsmanual", "videovolumeonly", "videovolumechecklistwhite", "videovolumechecklistblack", "videovolumescrolla", "videovolumescrollb", "videovolumescrollc", "videovolumeposd", "videovolumepose", "gamepad", "dynamic", "dynamic1", "dynamic2", "dynamic3", "dynamic4", "dynamic5", "dynamic6", "dynamic7", "dynamic8", "dynamic9", "dynamic10", "autodimonly", "atmosphereonly", "nightonly", "autostoponly", "lampandnightmode", "nightmodeos", "nmautoclock", "gamepadchecklistwhite", "gamepadchecklistblack", "gamepadonly", "nightmodeimage"];
	function setcheckboxoptions(a){
		for(var iset = 0; iset < settingscheckboxarray.length; iset++){
			if(a[settingscheckboxarray[iset]] == true){ $(settingscheckboxarray[iset]).checked = true; }
		}
	}

	var settingsinputrarray = ["lightcolor", "ambilightcolorhex", "ambilight1colorhex", "ambilight2colorhex", "ambilight3colorhex", "ambilight4colorhex", "colora", "colorb", "nightmodebck", "nightmodetxt", "nightmodehyperlink", "videovolumecolor", "videotoolcolor", "titleinvertcolor", "nightmodebutton", "lightimage", "enterpassword", "spotlightradius", "linearsq", "intervallina", "intervallinb", "reflectionamount", "videovolumesteps", "nmbegintime", "nmendtime", "ecosavertime", "begintime", "endtime", "nightmodeswitchhidetime", "playrateamount", "drawatmosfps", "hovervideoamount", "visopacity", "autodimdelaytime", "maxquality", "interval", "ambilightrangeblurradius", "ambilightrangespreadradius", "gpleftstick", "gprightstick", "gpbtnx", "gpbtno", "gpbtnsquare", "gpbtntriangle", "gpbtnlb", "gpbtnrb", "gpbtnlt", "gpbtnrt", "gpbtnshare", "gpbtnmenu", "gpbtnrightstick", "gpbtnleftstick", "gpbtndirup", "gpbtndirdown", "gpbtndirleft", "gpbtndirright", "gpbtnlogo", "nightmodeborder", "nmautobegintime", "nmautoendtime", "nmimagedark", "nmimagegray"];
	function setinputoptions(a){
		for(var iset = 0; iset < settingsinputrarray.length; iset++){
			if(a[settingsinputrarray[iset]]){ $(settingsinputrarray[iset]).value = a[settingsinputrarray[iset]]; }
		}
	}

	var settingsmain = ["firstDate", "countremember", "excludedDomains", "autodimDomains", "atmosphereDomains", "nightDomains", "reviewedlastonversion", "applastonversion", "autostopDomains", "videotoolDomains", "icon", "multiopacityDomains", "firstsawrate", "videovolumeDomains", "firstsawyoutube", "firstsawnumber", "gamepadDomains"];
	var a = settingscheckboxarray, b = settingsinputrarray, c = settingsmain;
	var allsettings = a.concat(b, c);
	//---
	chrome.storage.sync.get(allsettings, function(items){
		setcheckboxoptions(items);
		setinputoptions(items);

		if(items["applastonversion"] == chrome.runtime.getManifest().version){ $("sectionauroraplayerappbox").style.display = "none"; }

		if(items["icon"]){ $("btnpreview").src = items["icon"]; $("btnpreview").setAttribute("data-icon", items["icon"]); }

		// show remember page
		var firstmonth = false;
		var currentDate = new Date().getTime();
		if(items["firstDate"]){
			var datestart = items["firstDate"];
			var dateend = datestart + (30 * 24 * 60 * 60 * 1000);
			if(currentDate >= dateend){ firstmonth = false; }else{ firstmonth = true; }
		}else{
			chrome.storage.sync.set({"firstDate": currentDate});
			firstmonth = true;
		}

		if(firstmonth){
			// show nothing
			$("sectionreviewbox").style.display = "none";
		}else{
			if($("optionskipremember").checked != true){
				$("sectionreviewbox").style.display = "block"; // show now always the banner
				if(items["firstsawrate"] != true){
					window.setTimeout(function(){
						materialRateAlert();
					}, 2500);
					chrome.storage.sync.set({"firstsawrate": true});
				}
			}else{
				$("sectionreviewbox").style.display = "none";
			}
		}

		var firstday = false;
		var startnum = items["firstsawnumber"];
		if($("optionskipremember").checked != true){
			var dateinstall = items["firstDate"];
			var datenextday = dateinstall + (1 * 24 * 60 * 60 * 1000);
			if(currentDate >= datenextday){ firstday = false; }else{ firstday = true; }

			if(firstday){
				// show nothing
			}else{
				// if the rate box is not visible, and never clicked, then show the YouTube channel box
				if(items["firstsawrate"] != true && items["firstsawyoutube"] != true){
					if(typeof startnum == "undefined" || startnum == null){ startnum = 1; }
					if(startnum == 4){
						window.setTimeout(function(){
							materialYouTubeAlert();
						}, 2500);
						startnum = 0;
					}
					startnum += 1;
					chrome.storage.sync.set({"firstsawnumber": startnum});
				}
			}
		}

		// donation bar
		if(devdonate == true){
			$("managed-prefs-banner").className = "hidden";
		}

		// load tab div
		var tabListItems = $("navbar").childNodes;
		var i, l = tabListItems.length;
		for(i = 0; i < l; i++){
			if(tabListItems[i].nodeName == "LI"){
				var tabLink = getFirstChildWithTagName(tabListItems[i], "A");
				var id = getHash(tabLink.getAttribute("data-tab"));
				tabLinks[id] = tabLink;
				contentDivs[id] = document.getElementById(id);
			}
		}

		// Assign onclick events to the tab links, and
		// highlight the first tab
		var tabi = 0;
		var tabid;
		for(tabid in tabLinks){
			tabLinks[tabid].onclick = showTab;
			tabLinks[tabid].onfocus = function(){ this.blur(); };
			if(tabi == 0) tabLinks[tabid].className = "navbar-item-selected";
			tabi++;
		}

		// Hide all content divs except the first
		var contenti = 0;
		var contentid;
		for(contentid in contentDivs){
			if(contenti != 0) contentDivs[contentid].className = "page hidden";
			contenti++;
		}

		// display version number
		var manifestData = chrome.runtime.getManifest();
		$("version_number").innerText = manifestData.version;

		// Excluded domains - sort these alphabetically
		var excludedDomains = items["excludedDomains"];
		if(typeof excludedDomains == "undefined" || excludedDomains == null)
			excludedDomains = JSON.stringify({"https://www.nytimes.com": true, "https://www.blogger.com": true});

		if(typeof excludedDomains == "string"){
			excludedDomains = JSON.parse(excludedDomains);
			let buf = [], domain;
			for(domain in excludedDomains)
				buf.push(domain);
			buf.sort();
			let i, l = buf.length;
			for(i = 0; i < l; i++)
				appendToListBox("excludedDomainsBox", buf[i]);
		}

		var requestId = 0;
		var stop = false;
		var fps, fpsInterval, now, then, elapsed;

		function stopAnimation(){
			window.cancelAnimationFrame(requestId);
		}

		// yes show time
		// ambilight play detect
		if($("ambilight").checked == true){
			fps = $("drawatmosfps").value;
			startAnimating(fps);
		}else{
			stopAnimation();
		}

		function startAnimating(fps){
			fpsInterval = 1000 / fps;
			then = window.performance.now();
			animate();
		}

		function setlistbox(a, b){
			if(typeof b == "string"){
				b = JSON.parse(b);
				let srbuf = [], domain;
				for(domain in b)
					srbuf.push(domain);
				srbuf.sort();
				let i, l = srbuf.length;
				for(i = 0; i < l; i++)
					appendToListBox(a, srbuf[i]);
			}
		}

		function animate(){
			// stop
			if(stop){ return; }

			// request another frame
			requestId = window.requestAnimFrame(animate);

			// calc elapsed time since last loop
			now = window.performance.now();
			elapsed = now - then;

			// if enough time has elapsed, draw the next frame
			if(elapsed > fpsInterval){

				// Get ready for next frame by setting then=now, but...
				// Also, adjust for fpsInterval not being multiple of 16.67
				then = now - (elapsed % fpsInterval);

				try{
					if(document.visibilityState === "visible"){
						var htmlvideo = document.getElementById("beeld");
						if(htmlvideo.play){ drawAtmos(); }
					}
				}catch(e){ console.log(e); }
			}
		}

		// default example2 is not display
		$("example2").style.opacity = 0; $("example2").style.display = "none";
		// default hide this buttons
		$("wallpapershow").className = "hidden"; $("dynamicshow").className = "hidden";
		// autodim - Excluded domains - sort these alphabetically
		var autodimDomains = items["autodimDomains"];
		setlistbox("autodimDomainsBox", autodimDomains);

		// atmosphere - Excluded domains - sort these alphabetically
		var atmosphereDomains = items["atmosphereDomains"];
		setlistbox("atmosphereDomainsBox", atmosphereDomains);

		// night - Excluded domains - sort these alphabetically
		var nightDomains = items["nightDomains"];
		setlistbox("nightDomainsBox", nightDomains);

		// autostop - Excluded domains - sort these alphabetically
		var autostopDomains = items["autostopDomains"];
		setlistbox("autostopDomainsBox", autostopDomains);

		// video tool bar - Excluded domains - sort these alphabetically
		var videotoolDomains = items["videotoolDomains"];
		setlistbox("videotoolDomainsBox", videotoolDomains);

		// video volume bar - Excluded domains - sort these alphabetically
		var videovolumeDomains = items["videovolumeDomains"];
		setlistbox("videovolumeDomainsBox", videovolumeDomains);

		// gamepad bar - Excluded domains - sort these alphabetically
		var gamepadDomains = items["gamepadDomains"];
		setlistbox("gamepadDomainsBox", gamepadDomains);

		// multi opacity Excluded domains - sort these alphabetically
		var multiopacityDomains = items["multiopacityDomains"];
		if(typeof multiopacityDomains == "string"){
			multiopacityDomains = JSON.parse(multiopacityDomains);
			let mpbbuf = [];
			let domain;
			for(domain in multiopacityDomains)
				mpbbuf.push(domain);
			mpbbuf.sort();
			let i;
			let l = mpbbuf.length;
			for(i = 0; i < l; i++){
				multiappendToListBox("multiopacityDomainsBox", mpbbuf[i], multiopacityDomains["" + mpbbuf[i] + ""]);
			}
		}

		test(); // everything readed, do the "test"
		ariacheck();
	});// chrome storage end
} // end read

// animation browser engine
window.requestAnimFrame = function(){
	return(
		window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame || function(/* function */ callback){
			window.setTimeout(callback, 1000 / 60);
		}
	);
}();

/* function getPosition(el){
var xPos = 0; var yPos = 0;
while(el){ xPos += (el.offsetLeft - el.scrollLeft + el.clientLeft); yPos += (el.offsetTop - el.scrollTop + el.clientTop); el = el.offsetParent; }
return{x:xPos,y:yPos};
}*/

var countA = 0, countB = 0, countC = 0; // start from zero (blur spread) and size (left right top under) position

function rgbToHex(r, g, b){
	if(r > 255 || g > 255 || b > 255)
		throw"Invalid color component";
	return((r << 16) | (g << 8) | b).toString(16);
}

var textcountA;
var textcountB;
var textcountC;
var p1; var p2; var p3; var p4;
var hex1; var hex2; var hex3; var hex4;

function setatmosplayer(v, a, b){
	v.style.boxShadow = "0px 0px 0px black , 0px -" + a[0] + " " + a[1] + " " + a[2] + " " + b[0] + ", 0px " + a[0] + " " + a[1] + " " + a[2] + " " + b[1] + ", " + a[0] + " 0px " + a[1] + " " + a[2] + " " + b[2] + ", -" + a[0] + " 0px " + a[1] + " " + a[2] + " " + b[3] + "";
}

// ambilight draw code
function drawAtmos(){
	var v = $("beeld");
	if(v.paused || v.ended){
	// animation go out
		countA = countA - 1; if(countA <= 0){ countA = 0; }
		countB = countB - 1; if(countB <= 0){ countB = 0; }
		countC = countC - 1; if(countC <= 0){ countC = 0; }
		textcountA = countA + "px";
		textcountB = countB + "px";
		textcountC = countC + "px";

		var canvas = $("totlCanvas1");
		if(canvas){
			var context = canvas.getContext("2d", {desynchronized: true});

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

		if($("stefanvdvivideffect1")){
			$("stefanvdvivideffect1").style.display = "none";
		}
		if($("ambilightvarcolor").checked == true){
			if($("atmosvivid").checked == true){
				if($("stefanvdvivideffect1")){
					$("stefanvdvivideffect1").style.display = "none";
				}
			}else{
				setatmosplayer(v, [textcountC, textcountB, textcountA], [downhex1, downhex2, downhex3, downhex4]);
			}
		}else if($("ambilightfixcolor").checked == true){
			setatmosplayer(v, [textcountC, textcountB, textcountA], [$("ambilightcolorhex").value, $("ambilightcolorhex").value, $("ambilightcolorhex").value, $("ambilightcolorhex").value]);
		}else if($("ambilight4color").checked == true){
			setatmosplayer(v, [textcountC, textcountB, textcountA], [$("ambilight1colorhex").value, $("ambilight2colorhex").value, $("ambilight3colorhex").value, $("ambilight4colorhex").value]);
		}
		// ----

		return false;
	}
	if($("ambilight").checked == true){
		var showtime = $("beeld");

		// animate out and in
		if(countA < $("ambilightrangespreadradius").value){ countA = countA + 1; }
		if(countB < $("ambilightrangeblurradius").value){ countB = countB + 1; }
		if(countC < 20){ countC = countC + .5; }
		textcountA = countA + "px";
		textcountB = countB + "px";
		textcountC = countC + "px";

		if($("ambilightvarcolor").checked == true){
			var sourceWidth = showtime.videoWidth;
			var sourceHeight = showtime.videoHeight;

			var totlcheckcanvas = $("totlCanvas1");
			if(totlcheckcanvas == null){
				var totlnewcanvas = document.createElement("canvas");
				totlnewcanvas.setAttribute("id", "totlCanvas1");
				totlnewcanvas.width = "4";
				totlnewcanvas.height = "1";
				totlnewcanvas.style.display = "none";
				document.body.appendChild(totlnewcanvas);
			}

			var totlcanvas = $("totlCanvas1");
			var colorcontext = totlcanvas.getContext("2d", {desynchronized: true});
			var colorlamp1X = (sourceWidth * 50) / 100; // up midden
			var colorlamp1Y = (sourceHeight * 95) / 100;
			var colorlamp2X = (sourceWidth * 95) / 100; // right midden
			var colorlamp2Y = (sourceHeight * 50) / 100;
			var colorlamp3X = (sourceWidth * 50) / 100; // down midden
			var colorlamp3Y = (sourceHeight * 5) / 100;
			var colorlamp4X = (sourceWidth * 5) / 100; // left midden
			var colorlamp4Y = (sourceHeight * 50) / 100;

			colorcontext.drawImage(showtime, colorlamp1X, colorlamp1Y, 1, 1, 0, 0, 1, 1);
			colorcontext.drawImage(showtime, colorlamp2X, colorlamp2Y, 1, 1, 1, 0, 1, 1);
			colorcontext.drawImage(showtime, colorlamp3X, colorlamp3Y, 1, 1, 2, 0, 1, 1);
			colorcontext.drawImage(showtime, colorlamp4X, colorlamp4Y, 1, 1, 3, 0, 1, 1);

			p1 = colorcontext.getImageData(0, 0, 1, 1).data;
			p2 = colorcontext.getImageData(1, 0, 1, 1).data;
			p3 = colorcontext.getImageData(2, 0, 1, 1).data;
			p4 = colorcontext.getImageData(3, 0, 1, 1).data;
			hex1 = "#" + ("000000" + rgbToHex(p1[0], p1[1], p1[2])).slice(-6);
			hex2 = "#" + ("000000" + rgbToHex(p2[0], p2[1], p2[2])).slice(-6);
			hex3 = "#" + ("000000" + rgbToHex(p3[0], p3[1], p3[2])).slice(-6);
			hex4 = "#" + ("000000" + rgbToHex(p4[0], p4[1], p4[2])).slice(-6);

			if($("atmosvivid").checked == true){
				if($("stefanvdvivideffect1")){
					showtime.style["boxShadow"] = "none";
					// var newpositionvivid = getPosition(showtime);
					var tempwidthvideo = showtime.offsetWidth;
					var tempheightvideo = showtime.offsetHeight;
					// var tempvisscrollleft = window.pageXOffset || document.documentElement.scrollLeft;
					// var tempvisscrolltop = window.pageYOffset || document.documentElement.scrollTop;
					var newvivid = $("stefanvdvivideffect1");
					newvivid.style.webkitTransform = "scale(" + 1.1 + ")";
					newvivid.style.webkitFilter = "blur(" + 30 + "px)";
					newvivid.style.top = 0;
					newvivid.style.bottom = 0;
					newvivid.style.right = 0;
					newvivid.style.left = 0;
					newvivid.style.opacity = .88;
					newvivid.style.display = "block";
					newvivid.width = Math.floor(tempwidthvideo * 0.08);
					newvivid.height = Math.floor(tempheightvideo * 0.08);
					var vividctx = newvivid.getContext("2d", {desynchronized: true}); var vividx = Math.floor(showtime.offsetWidth * 0.08); var vividy = Math.floor(showtime.offsetHeight * 0.08);
					vividctx.drawImage(showtime, 0, 0, vividx, vividy);
				}
			}else{
				if($("stefanvdvivideffect1")){ $("stefanvdvivideffect1").style.display = "none"; }
				setatmosplayer(v, [textcountC, textcountB, textcountA], [hex1, hex2, hex3, hex4]);
			}
		}else if($("ambilightfixcolor").checked == true){
			if($("stefanvdvivideffect1")){ $("stefanvdvivideffect1").style.display = "none"; }
			var fixhex = $("ambilightcolorhex").value;
			setatmosplayer(v, [textcountC, textcountB, textcountA], [fixhex, fixhex, fixhex, fixhex]);
		}else if($("ambilight4color").checked == true){
			if($("stefanvdvivideffect1")){ $("stefanvdvivideffect1").style.display = "none"; }
			setatmosplayer(v, [textcountC, textcountB, textcountA], [$("ambilight1colorhex").value, $("ambilight2colorhex").value, $("ambilight3colorhex").value, $("ambilight4colorhex").value]);
		}

	}else{ v.style.boxShadow = ""; if($("stefanvdvivideffect1")){ $("stefanvdvivideffect1").style.display = "none"; } }
}

function removeElement(elementId){
	var element = document.getElementById(elementId);
	if(element){ element.parentNode.removeChild(element); }
}

// Fade engine
// Variable for the fade in and out effect
var opacity = 0;
var ReducingFinished = true;
var OpacityLevelIncrement = 10; // Percentage value: 1-100
var DIVElementById = null;

// Function determines whether we show or hide the item referenced by ElementID
function fader(ActionToTake){
	DIVElementById = $("example2");
	if(ActionToTake == "hide"){ opacity = default_opacity; reduceOpacity(); }else if(ActionToTake == "show"){ increaseOpacity(); }
}

// Makes div increase
function increaseOpacity(){
	DIVElementById.style.display = "";
	// If opacity level is less than default_opacity, we can still increase the opacity
	if((opacity < default_opacity) && (ReducingFinished == true)){
		(opacity > (default_opacity - 10)) ? opacity += (default_opacity - opacity) : opacity += OpacityLevelIncrement;
		DIVElementById.style.opacity = opacity / 100;
		window.requestAnimFrame(increaseOpacity);
	}else{ ReducingFinished = false; }
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
		if(DIVElementById.style.opacity <= 0){ DIVElementById.style.display = "none"; }
	}
}

// Add a filter string to the list box.
function appendToListBox(boxId, text){ var elt = document.createElement("option"); elt.role = "option"; elt.text = text; elt.value = text; $(boxId).add(elt, null); }

function multiappendToListBox(boxId, text, phonenumber){
	var elt = document.createElement("option");
	elt.role = "option";
	elt.text = text;
	elt.value = text;
	$(boxId).add(elt, null);

	var phelt = document.createElement("option");
	phelt.role = "option";
	phelt.text = phonenumber;
	phelt.value = text;
	$("multiopacitynumberBox").add(phelt, null);
}

// tabel script
var tabLinks = new Array();
var contentDivs = new Array();

function showTab(){
	var selectedId = getHash(this.getAttribute("data-tab"));

	// Highlight the selected tab, and dim all others.
	// Also show the selected content div, and hide all others.
	var id;
	for(id in contentDivs){
		if(id == selectedId){
			tabLinks[id].className = "navbar-item-selected";
			contentDivs[id].className = "page";
		}else{
			tabLinks[id].className = "navbar-item";
			contentDivs[id].className = "page hidden";
		}
	}

	// Stop the browser following the link
	return false;
}

function getFirstChildWithTagName(element, tagName){
	var i;
	var l = element.childNodes.length;
	for(i = 0; i < l; i++){
		if(element.childNodes[i].nodeName == tagName)return element.childNodes[i];
	}
}

function getHash(url){
	var hashPos = url.lastIndexOf("#");
	return url.substring(hashPos + 1);
}

// whitelist eye domain
function addWhitelistDomain(){
	var domain = $("websiteurl").value;
	appendToListBox("excludedDomainsBox", domain);
	save_options();
}

// whitelist autodim domain
function autodimaddWhitelistDomain(){
	var domain = $("autodimwebsiteurl").value;
	appendToListBox("autodimDomainsBox", domain);
	save_options();
}

// whitelist atmosphere domain
function atmosphereaddWhitelistDomain(){
	var domain = $("atmospherewebsiteurl").value;
	appendToListBox("atmosphereDomainsBox", domain);
	save_options();
}

// whitelist night domain
function nightaddWhitelistDomain(){
	var domain = $("nightwebsiteurl").value;
	appendToListBox("nightDomainsBox", domain);
	save_options();
}

// whitelist autostop domain
function autostopaddWhitelistDomain(){
	var domain = $("autostopwebsiteurl").value;
	appendToListBox("autostopDomainsBox", domain);
	save_options();
}

// whitelist videotool domain
function videotooladdWhitelistDomain(){
	var domain = $("videotoolwebsiteurl").value;
	appendToListBox("videotoolDomainsBox", domain);
	save_options();
}

// whitelist gamepad domain
function gamepadaddWhitelistDomain(){
	var domain = $("gamepadwebsiteurl").value;
	appendToListBox("gamepadDomainsBox", domain);
	save_options();
}

function removedselectedwebsite(boxelement){
	var thisDomainsBox = $(boxelement);
	var i = thisDomainsBox.length - 1;
	for(i; i >= 0; i--){
		if(thisDomainsBox.options[i].selected)
			thisDomainsBox.remove(i);
	}
	save_options();
}

// whitelist multiopacity domain
function multiopacitychangeurl(){
	var selwzv = $("multiopacityDomainsBox").selectedIndex;
	$("multiopacitynumberBox").selectedIndex = selwzv;
}

function multiopacitychangenumberl(){
	var selwzv = $("multiopacitynumberBox").selectedIndex;
	$("multiopacityDomainsBox").selectedIndex = selwzv;
}

function multiopacityadd(){
	var domain = $("multiopacityname").value;
	var number = $("multiopacitynumber").value;
	if(domain == ""){ return; }
	if(number == ""){ return; }
	multiappendToListBox("multiopacityDomainsBox", domain, number);
	save_options();
}

function multiopacityremoveSelectedExcludedDomain(){
	var multiopacityDomainsBox = $("multiopacityDomainsBox");
	var multiopacitynumberBox = $("multiopacitynumberBox");
	var i = multiopacityDomainsBox.length - 1;
	for(i; i >= 0; i--){
		if(multiopacityDomainsBox.options[i].selected){
			multiopacityDomainsBox.remove(i);
			multiopacitynumberBox.remove(i);
		}
	}
	save_options();
}

// fade effects control -> not when loaded page
function lightscontrol(){
	default_opacity = $("interval").value;
	if($("onoffrange").value == 0){ lighton(); }else{ lightoff(); }
}

function lighton(){
	if($("fadeout").checked == true){ ReducingFinished = false; fader("hide"); }else{ $("example2").style.opacity = 0; $("example2").style.display = "none"; }
}

function lightoff(){
	if($("fadein").checked == true){ ReducingFinished = true; fader("show"); }else{ $("example2").style.opacity = default_opacity / 100; $("example2").style.display = ""; }
}

// remove dynamic elements
function removedynamic(){
	var dynarray = ["fishtanks", "blocks", "raindrops", "clouds", "space", "smoke", "flyingdots", "storm", "triangle", "stars"];
	for(var idyn = 0; idyn < dynarray.length; idyn++){
		removeElement(dynarray[idyn]);
	}
	window.onresize = null;
}

function previewyoutubeelement(a, b){
	if($(a).checked == true){ $(b).style.zIndex = 100; $(b).style.position = "relative"; }else{ $(b).style.zIndex = 1; $(b).style.position = "relative"; }
}

function previewyoutubecolor(a, b){
	if($(a).checked == true){
		$(b).style.color = "white";
	}else{
		$(b).style.color = "black";
	}
}

// test general
function test(){
	// check context menu support, if not hide it
	if(!chrome.contextMenus){
		$("supportcontextmenus").className = "hidden";
	}

	default_opacity = $("interval").value;
	$("slider").value = default_opacity;
	$("interval").setAttribute("aria-valuenow", default_opacity);
	$("slider").setAttribute("aria-valuenow", default_opacity);
	$("example1").style.opacity = (default_opacity / 100);
	$("example2").style.opacity = (default_opacity / 100);

	default_arangeblur = $("ambilightrangeblurradius").value;
	$("arangeblur").value = default_arangeblur;
	$("arangeblur").setAttribute("aria-valuenow", default_arangeblur);

	default_arangespread = $("ambilightrangespreadradius").value;
	$("arangespread").value = default_arangespread;
	$("arangespread").setAttribute("aria-valuenow", default_arangespread);

	if($("ambilight").checked == true){
		drawAtmos();
	}

	// show alert warning
	if($("ambilightvarcolor").checked == true){ $("showwarningambilight").style.display = ""; }else{ $("showwarningambilight").style.display = "none"; }

	// YouTube preview sample
	previewyoutubeelement("head", "samplechannel");
	previewyoutubeelement("infobar", "sampleinforbar");
	previewyoutubeelement("likebutton", "sampledislikebutton");
	previewyoutubeelement("sharebutton", "samplesharebutton");
	previewyoutubeelement("suggestions", "samplesug");

	previewyoutubeelement("videoheadline", "sampletitle");
	previewyoutubecolor("videoheadline", "sampletitle");

	previewyoutubeelement("viewcount", "sampleview");
	previewyoutubecolor("viewcount", "sampleview");

	previewyoutubeelement("addvideobutton", "sampleaddbutton");
	previewyoutubeelement("likebar", "samplelikebar");

	/* --- end YouTube preview --- */
	if($("ambilight").checked == true){
		$("arangespread").disabled = false; $("ambilightrangespreadradius").disabled = false; $("arangeblur").disabled = false; $("ambilightrangeblurradius").disabled = false; $("ambilightfixcolor").disabled = false; $("ambilightvarcolor").disabled = false; $("ambilightcolorhex").disabled = false; $("ambilight4color").disabled = false; $("ambilight1colorhex").disabled = false; $("ambilight2colorhex").disabled = false; $("ambilight3colorhex").disabled = false; $("ambilight4colorhex").disabled = false; $("atmosontotlmode").disabled = false; $("atmosphereonly").disabled = false; $("vpause").disabled = false;
		if($("ambilightvarcolor").checked == true){
			$("atmosvivid").disabled = false;
			if($("atmosvivid").checked == true){
				$("atmosfpsauto").disabled = false; $("atmosfpsmanual").disabled = false;
				if($("atmosfpsauto").checked == true){
					$("drawatmosfps").disabled = true;
				}else if($("atmosfpsmanual").checked == true){
					$("drawatmosfps").disabled = false;
				}
			}else{
				$("atmosfpsauto").disabled = true; $("atmosfpsmanual").disabled = true; $("drawatmosfps").disabled = true;
			}
		}else{
			$("atmosvivid").disabled = true; $("drawatmosfps").disabled = true; $("atmosfpsauto").disabled = true; $("atmosfpsmanual").disabled = true;
		}
	}else{
		$("arangespread").disabled = true; $("ambilightrangespreadradius").disabled = true; $("arangeblur").disabled = true; $("ambilightrangeblurradius").disabled = true; $("ambilightfixcolor").disabled = true; $("ambilightvarcolor").disabled = true; $("ambilightcolorhex").disabled = true; $("ambilight4color").disabled = true; $("ambilight1colorhex").disabled = true; $("ambilight2colorhex").disabled = true; $("ambilight3colorhex").disabled = true; $("ambilight4colorhex").disabled = true; $("atmosontotlmode").disabled = true; $("atmosphereonly").disabled = true; $("vpause").disabled = true; $("atmosvivid").disabled = true; $("drawatmosfps").disabled = true; $("atmosfpsauto").disabled = true; $("atmosfpsmanual").disabled = true;
	}

	if("requestVideoFrameCallback" in HTMLVideoElement.prototype){
		// do nothing
	}else{
		// the API is not supported
		$("boxfpsauto").className = "hidden";
	}

	if($("lightimagea").checked == true){
		$("lightimagen").checked = false; $("example1").style.backgroundSize = $("example2").style.backgroundSize = "cover"; $("example2").style.backgroundImage = $("example1").style.backgroundImage = "url(" + $("lightimage").value + ")"; $("lightimage").disabled = false; $("lightcolor").disabled = true;
		$("mousespotlighta").disabled = true; $("mousespotlightc").disabled = true; $("mousespotlighto").checked = true;
	}else if($("lightimagen").checked == true){
		$("lightimagen").checked = true; $("example1").style.background = $("lightcolor").value; $("example2").style.background = $("lightcolor").value; $("lightimage").disabled = true; $("lightcolor").disabled = false;
		$("mousespotlighta").disabled = false; $("mousespotlightc").disabled = false;
	}else if($("lightimagelin").checked == true){
		var linearsq = document.getElementById("linearsq");
		$("example1").style.background = $("example2").style.background = "linear-gradient(to " + linearsq.options[linearsq.selectedIndex].value + ", " + $("colora").value + " " + $("intervallina").value + "%," + $("colorb").value + " " + $("intervallinb").value + "%)";
		$("mousespotlighta").disabled = true; $("mousespotlightc").disabled = true;
		if($("mousespotlighta").checked == true || $("mousespotlightc").checked == true){ $("mousespotlighto").checked = true; }
	}

	if($("blur").checked == true){
		$("stefanvdblurimage").style.display = "";
	}else{
		$("stefanvdblurimage").style.display = "none";
	}

	if($("eyen").checked == true){ $("ecosaver").disabled = false; $("ecosavertime").disabled = false; $("helpeyeprotection").style.display = "none"; $("excludedDomainsBox").disabled = true; $("websiteurl").disabled = true; $("autodim").disabled = false; $("autodimdelay").disabled = false; $("autodimdelaytime").disabled = false; $("addbutton").disabled = true; $("removebutton").disabled = true; $("nighttime").disabled = false; $("begintime").disabled = false; $("endtime").disabled = false; $("helpautodim").style.display = "none"; $("eyechecklistwhite").disabled = true; $("eyechecklistblack").disabled = true; }else if($("eyea").checked == true){ $("ecosaver").disabled = false; $("ecosavertime").disabled = false; $("helpeyeprotection").style.display = ""; $("excludedDomainsBox").disabled = true; $("websiteurl").disabled = true; $("autodim").checked = false; $("autodimdelay").disabled = true; $("autodimdelaytime").disabled = true; $("addbutton").disabled = true; $("removebutton").disabled = true; $("nighttime").disabled = false; $("begintime").disabled = false; $("endtime").disabled = false; $("helpautodim").style.display = ""; $("eyechecklistwhite").disabled = true; $("eyechecklistblack").disabled = true; }else if($("eyealist").checked == true){ $("ecosaver").disabled = false; $("ecosavertime").disabled = false; $("helpeyeprotection").style.display = ""; $("excludedDomainsBox").disabled = false; $("websiteurl").disabled = false; $("autodim").checked = false; $("autodimdelay").disabled = true; $("autodimdelaytime").disabled = true; $("addbutton").disabled = false; $("removebutton").disabled = false; $("nighttime").disabled = false; $("begintime").disabled = false; $("endtime").disabled = false; $("helpautodim").style.display = ""; $("eyechecklistwhite").disabled = false; $("eyechecklistblack").disabled = false; }

	if($("mousespotlighto").checked == true){ /* eastereggs OFF*/ $("eastereggs").disabled = false; }else{ /* active box eastereggs */ $("eastereggs").disabled = true; $("eastereggs").checked = false; }

	if($("mousespotlighta").checked == true){ $("spotlightradius").disabled = false; }else{ $("spotlightradius").disabled = true; }

	if($("nighttime").checked == true){ /* see further */ }else{ $("begintime").disabled = true; $("endtime").disabled = true; }

	if($("password").checked == true){ $("enterpassword").disabled = false; $("confirmpassword").disabled = false; }else{ $("enterpassword").disabled = true; $("confirmpassword").disabled = true; }

	if($("ecosaver").checked == true){
		$("ecosavertime").disabled = false; $("nighttime").disabled = false;
		if($("eyen").checked == true){
			$("begintime").disabled = false; $("endtime").disabled = false;
		}
	}else{
		$("ecosavertime").disabled = true;
		if($("eyen").checked == true){
			$("nighttime").disabled = true; $("begintime").disabled = true; $("endtime").disabled = true;
		}
	}

	if($("autodimonly").checked == true){ $("autodimonly").checked = true; $("autodimDomainsBox").disabled = false; $("autodimwebsiteurl").disabled = false; $("autodimaddbutton").disabled = false; $("autodimremovebutton").disabled = false; $("autodimchecklistwhite").disabled = false; $("autodimchecklistblack").disabled = false; }else{ $("autodimonly").checked = false; $("autodimDomainsBox").disabled = true; $("autodimwebsiteurl").disabled = true; $("autodimaddbutton").disabled = true; $("autodimremovebutton").disabled = true; $("autodimchecklistwhite").disabled = true; $("autodimchecklistblack").disabled = true; }

	if($("atmosphereonly").checked == true){ $("atmosphereonly").checked = true; $("atmosphereDomainsBox").disabled = false; $("atmospherewebsiteurl").disabled = false; $("atmosphereaddbutton").disabled = false; $("atmosphereremovebutton").disabled = false; }else{ $("atmosphereonly").checked = false; $("atmosphereDomainsBox").disabled = true; $("atmospherewebsiteurl").disabled = true; $("atmosphereaddbutton").disabled = true; $("atmosphereremovebutton").disabled = true; }

	if($("nightonly").checked == true){ $("nightonly").checked = true; $("nightDomainsBox").disabled = false; $("nightwebsiteurl").disabled = false; $("nightaddbutton").disabled = false; $("nightremovebutton").disabled = false; $("nightmodechecklistwhite").disabled = false; $("nightmodechecklistblack").disabled = false; $("nightmodebydomain").disabled = false; $("nightmodebypage").disabled = false; }else{ $("nightonly").checked = false; $("nightDomainsBox").disabled = true; $("nightwebsiteurl").disabled = true; $("nightaddbutton").disabled = true; $("nightremovebutton").disabled = true; $("nightmodechecklistwhite").disabled = true; $("nightmodechecklistblack").disabled = true; $("nightmodebydomain").disabled = true; $("nightmodebypage").disabled = true; }

	if($("autodim").checked == true){
		$("aplay").disabled = false; $("apause").disabled = false; $("astop").disabled = false; $("eyen").checked = true; $("excludedDomainsBox").disabled = true; $("websiteurl").disabled = true; $("autodimdelay").disabled = false;
		if($("autodimdelay").checked == true){ $("autodimdelaytime").disabled = false; }else{ $("autodimdelaytime").disabled = true; }
	}else{
		$("aplay").disabled = true; $("apause").disabled = true; $("astop").disabled = true; $("autodimdelay").disabled = true;
		if($("autodimdelay").checked == true){ $("autodimdelaytime").disabled = false; }else{ $("autodimdelaytime").disabled = true; }
	}

	if($("videovolume").checked == true){ $("videovolumealt").disabled = false; }else{ $("videovolumealt").disabled = true; }

	if($("nightactivetime").checked == true && $("nighttheme").checked == true){ $("nmbegintime").disabled = false; $("nmendtime").disabled = false; }else{ $("nmbegintime").disabled = true; $("nmendtime").disabled = true; }

	if($("nightenabletheme").checked == true){ $("nmautoclock").disabled = false; }else{ $("nmautoclock").disabled = true; }

	if($("nightenabletheme").checked == true && $("nmautoclock").checked == true){ $("nmautobegintime").disabled = false; $("nmautoendtime").disabled = false; }else{ $("nmautobegintime").disabled = true; $("nmautoendtime").disabled = true; }

	if($("nighttheme").checked == true){ $("nighthover").disabled = false; $("nightmodeswitchhide").disabled = false; $("nightmodeswitchhidetime").disabled = false; $("nightactivetime").disabled = false; }else{ $("nighthover").disabled = true; $("nightmodeswitchhide").disabled = true; $("nightmodeswitchhidetime").disabled = true; $("nightactivetime").disabled = true; }

	if($("nightmodeimage").checked == true){ $("nmimagedark").disabled = false; $("nmimagegray").disabled = false; }else{ $("nmimagedark").disabled = true; $("nmimagegray").disabled = true; }

	if($("autostop").checked == true){ $("autostopred").disabled = false; $("autostoptrans").disabled = false; }else{ $("autostopred").disabled = true; $("autostoptrans").disabled = true; }

	if($("autostoponly").checked == true){ $("autostopchecklistwhite").disabled = false; $("autostopchecklistblack").disabled = false; $("autostopDomainsBox").disabled = false; $("autostopwebsiteurl").disabled = false; $("autostopaddbutton").disabled = false; $("autostopremovebutton").disabled = false; }else{ $("autostopchecklistwhite").disabled = true; $("autostopchecklistblack").disabled = true; $("autostopDomainsBox").disabled = true; $("autostopwebsiteurl").disabled = true; $("autostopaddbutton").disabled = true; $("autostopremovebutton").disabled = true; }

	if($("videotool").checked == true){ $("videozoom").disabled = false; $("speedtoolbar").disabled = false; $("videotoolonly").disabled = false; }else{ $("videozoom").disabled = true; $("speedtoolbar").disabled = true; $("videotoolonly").disabled = true; }

	if($("videotoolonly").checked == true){ $("videotoolchecklistwhite").disabled = false; $("videotoolchecklistblack").disabled = false; $("videotoolDomainsBox").disabled = false; $("videotoolwebsiteurl").disabled = false; $("videotooladdbutton").disabled = false; $("videotoolremovebutton").disabled = false; }else{ $("videotoolchecklistwhite").disabled = true; $("videotoolchecklistblack").disabled = true; $("videotoolDomainsBox").disabled = true; $("videotoolwebsiteurl").disabled = true; $("videotooladdbutton").disabled = true; $("videotoolremovebutton").disabled = true; }

	if($("gamepadonly").checked == true){ $("gamepadchecklistwhite").disabled = false; $("gamepadchecklistblack").disabled = false; $("gamepadDomainsBox").disabled = false; $("gamepadwebsiteurl").disabled = false; $("gamepadaddbutton").disabled = false; $("gamepadremovebutton").disabled = false; }else{ $("gamepadchecklistwhite").disabled = true; $("gamepadchecklistblack").disabled = true; $("gamepadDomainsBox").disabled = true; $("gamepadwebsiteurl").disabled = true; $("gamepadaddbutton").disabled = true; $("gamepadremovebutton").disabled = true; }

	if($("reflection").checked == true){ $("reflectionamount").disabled = false; $("beeld").style.webkitBoxReflect = "below 0px -webkit-gradient(linear, left top, left bottom, from(transparent), to(black),color-stop(" + (100 - $("reflectionamount").value) / 100 + ", transparent))"; }else{ $("reflectionamount").disabled = true; $("beeld").style.webkitBoxReflect = ""; }

	if($("multiopacall").checked == true){ $("multiopacityname").disabled = true; $("multiopacitynumber").disabled = true; $("multiopacityDomainsBox").disabled = true; $("multiopacitynumberBox").disabled = true; $("multiopacityremovebutton").disabled = true; $("multiopacityaddbutton").disabled = true; }else{ $("multiopacityname").disabled = false; $("multiopacitynumber").disabled = false; $("multiopacityDomainsBox").disabled = false; $("multiopacitynumberBox").disabled = false; $("multiopacityremovebutton").disabled = false; $("multiopacityaddbutton").disabled = false; }

	if($("hovervideo").checked == true){ $("hovervideoamount").disabled = false; }else{ $("hovervideoamount").disabled = true; }

	if($("playrate").checked == true){ $("playrateamount").disabled = false; }else{ $("playrateamount").disabled = true; }

	if($("customqualityyoutube").checked == true){ $("maxquality").disabled = false; $("block60fps").disabled = false; }else{ $("maxquality").disabled = true; $("block60fps").disabled = true; }

	if($("videovolumeonly").checked == true){ $("videovolumechecklistwhite").disabled = false; $("videovolumechecklistblack").disabled = false; $("videovolumeDomainsBox").disabled = false; $("videovolumewebsiteurl").disabled = false; $("videovolumeaddbutton").disabled = false; $("videovolumeremovebutton").disabled = false; }else{ $("videovolumechecklistwhite").disabled = true; $("videovolumechecklistblack").disabled = true; $("videovolumeDomainsBox").disabled = true; $("videovolumewebsiteurl").disabled = true; $("videovolumeaddbutton").disabled = true; $("videovolumeremovebutton").disabled = true; }

	if($("seeanalytics").checked == true){
		$("seeanalparta").style.display = "";
		$("seeanalpartb").style.display = "";
		$("seeanalpartc").style.display = "";
		$("seeanalpartd").style.display = "";
		$("seeanalparte").style.display = "";
		$("seeanalpartf").style.display = "";
		$("seeanalreset").style.display = "";
	}else{
		$("seeanalparta").style.display = "none";
		$("seeanalpartb").style.display = "none";
		$("seeanalpartc").style.display = "none";
		$("seeanalpartd").style.display = "none";
		$("seeanalparte").style.display = "none";
		$("seeanalpartf").style.display = "none";
		$("seeanalreset").style.display = "none";

		// reset the analytics
		chrome.storage.sync.set({"analytics":null, "siteengagement":null});
	}

	// done with reading
	// run now the dynamic background if enabled
	dynamictest();

	// wizard user profile
	$("ska").style.background = $("profileAcolor").value;
	$("ska").style.opacity = $("profileAopacity").value / 100;
	if($("profileAmouse").checked == true){
		$("ska").style.pointerEvents = "none";
	}else{
		$("ska").style.pointerEvents = "";
	}
	$("profileB").style.background = $("profileBnightback").value;
	$("profileB").style.color = $("profileBnighttext").value;
	$("profileBlink").style.color = $("profileBnightlink").value;
	$("skc").style.background = $("profileCcolor").value;
	$("skc").style.opacity = $("profileCopacity").value / 100;
	// end wizard ---

	// function available
	try{
		if(typeof browser !== "undefined"){
			if(typeof browser.theme.update !== "undefined" || browser.theme.update != null){
				$("brotheme").style.display = "block";
			}else{
				$("brotheme").style.display = "none";
			}
		}else{
			$("brotheme").style.display = "none";
		}
	}catch(e){
		$("brotheme").style.display = "none";
	}
}

function ariacheck(){
	var inputs = document.querySelectorAll("input[role='checkbox'], input[role='radio']"), i, l = inputs.length;
	for(i = 0; i < l; i++){
		inputs[i].checked == true ? inputs[i].setAttribute("aria-checked", true) : inputs[i].setAttribute("aria-checked", false);
	}
}

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
var canvasHeight = 400;

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
	var smokecanvas = document.getElementById("stefanvddynamicsmoke");
	if(smokecanvas.getContext){
		// Set the context variable so it can be re-used
		smokecontext = smokecanvas.getContext("2d", {desynchronized: true});
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
	var div = document.createElement("div"); div.className = "stefanvdcloudBase";
	var x = 256 - (Math.random() * 512); var y = 256 - (Math.random() * 512); var z = 256 - (Math.random() * 512);
	var t = "translateX(" + x + "px) translateY(" + y + "px) translateZ(" + z + "px)";
	div.style.webkitTransform = t; div.style.MozTransform = t; div.style.oTransform = t;
	world.appendChild(div);

	var j, l = 5 + Math.round(Math.random() * 10);
	for(j = 0; j < l; j++){
		var cloud = document.createElement("div");
		cloud.style.opacity = 0;
		cloud.style.opacity = .8;
		cloud.className = "stefanvdcloudLayer";
		var cloudx = 256 - (Math.random() * 512);
		var cloudy = 256 - (Math.random() * 512);
		var cloudz = 100 - (Math.random() * 200);
		var clouda = Math.random() * 360;
		var clouds = .25 + Math.random();
		x *= .2; y *= .2;
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
	var j;
	var l = layers.length;
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

function rainresizer(){
	window_width = window.innerWidth * 1.5;
	window_height = window.innerHeight * 1.5;
	drop_count = window_width * rain_weight;

	stormcanvas.setAttribute("width", window_width);
	stormcanvas.setAttribute("height", window_height);
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
	triasvg.setAttribute("width", window.innerWidth);
	triasvg.setAttribute("height", window.innerHeight);
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
				animate.setAttribute("fill", "freeze");
				animate.setAttribute("attributeName", "points");
				animate.setAttribute("dur", refreshDuration + "ms");
				animate.setAttribute("calcMode", "linear");
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
		if(document.getElementById("triangle")){
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
}

function onResize(){
	document.querySelector("#triangle svg").remove();
	window.clearTimeout(refreshTimeout);
	trianglerun();
}
//---
function setdynamiclabel(a){
	$("lightdynamic").value = a;
}

function dynamictest(){
	if($("dynamic").checked == true){
		$("lightdynamic").disabled = false;
		if($("dynamic5").checked == true){ $("hoveroptiondyn5").disabled = false; }else{ $("hoveroptiondyn5").disabled = true; }
	}else{
		$("lightdynamic").disabled = true;
		$("hoveroptiondyn5").disabled = true;
	}

	if($("dynamic1").checked == true){ setdynamiclabel(chrome.i18n.getMessage("desdynamicfishtank")); }else if($("dynamic2").checked == true){ setdynamiclabel(chrome.i18n.getMessage("desdynamicblocks")); }else if($("dynamic3").checked == true){ setdynamiclabel(chrome.i18n.getMessage("desdynamicraindrops")); }else if($("dynamic4").checked == true){ setdynamiclabel(chrome.i18n.getMessage("desdynamiccloud")); }else if($("dynamic5").checked == true){ setdynamiclabel(chrome.i18n.getMessage("desdynamicspace")); }else if($("dynamic6").checked == true){ setdynamiclabel(chrome.i18n.getMessage("desdynamicsmoke")); }else if($("dynamic7").checked == true){ setdynamiclabel(chrome.i18n.getMessage("desdynamicdotscolor")); }else if($("dynamic8").checked == true){ setdynamiclabel(chrome.i18n.getMessage("desdynamicstorm")); }else if($("dynamic9").checked == true){ setdynamiclabel(chrome.i18n.getMessage("desdynamictriangulation")); }else if($("dynamic10").checked == true){ setdynamiclabel(chrome.i18n.getMessage("desdynamicstars")); }

	var newdynmaster = $("stefanvddynamicbackground");
	if($("dynamic").checked == true){
		removedynamic();
		if($("dynamic1").checked == true){
			var fishtanks = document.createElement("div"); fishtanks.setAttribute("id", "fishtanks"); newdynmaster.appendChild(fishtanks);

			var newdynleft = document.createElement("div"); newdynleft.setAttribute("class", "stefanvddynamicbackgroundbubbleleft"); fishtanks.appendChild(newdynleft);
			var dynlefti;
			for(dynlefti = 0; dynlefti < 5; dynlefti++){ var newdynbubbleleft = document.createElement("div"); newdynbubbleleft.setAttribute("class", "stefanvddynamicbackgroundbubbles stefanvddynamicbubbles" + dynlefti + ""); newdynleft.appendChild(newdynbubbleleft); }

			var newdynmid = document.createElement("div"); newdynmid.setAttribute("class", "stefanvddynamicbackgroundbubblemid"); fishtanks.appendChild(newdynmid);
			var dynmidi;
			for(dynmidi = 6; dynmidi < 10; dynmidi++){ var newdynbubblemid = document.createElement("div"); newdynbubblemid.setAttribute("class", "stefanvddynamicbackgroundbubbles stefanvddynamicbubbles" + dynmidi + ""); newdynmid.appendChild(newdynbubblemid); }

			var newdynright = document.createElement("div"); newdynright.setAttribute("class", "stefanvddynamicbackgroundbubbleright"); fishtanks.appendChild(newdynright);
			var dynrighti;
			for(dynrighti = 11; dynrighti < 16; dynrighti++){ var newdynbubble = document.createElement("div"); newdynbubble.setAttribute("class", "stefanvddynamicbackgroundbubbles stefanvddynamicbubbles" + dynrighti + ""); newdynright.appendChild(newdynbubble); }
		}else if($("dynamic2").checked == true){
			var blocks = document.createElement("div"); blocks.setAttribute("id", "blocks"); newdynmaster.appendChild(blocks);

			var newdynblockleft = document.createElement("div"); newdynblockleft.setAttribute("class", "stefanvddynamicbackgroundblockleft"); blocks.appendChild(newdynblockleft);
			var blocki;
			for(blocki = 1; blocki < 21; blocki++){ var newdynblock = document.createElement("div"); newdynblock.setAttribute("class", "stefanvddynamicbackgroundblocks stefanvddynamicblocks" + blocki + ""); newdynblockleft.appendChild(newdynblock); }
		}else if($("dynamic3").checked == true){
			var raindrops = document.createElement("div"); raindrops.setAttribute("id", "raindrops"); newdynmaster.appendChild(raindrops);

			var newdynrainleft = document.createElement("div"); newdynrainleft.setAttribute("class", "stefanvddynamicbackgroundblockleft"); raindrops.appendChild(newdynrainleft);
			var rainlefti;
			for(rainlefti = 0; rainlefti < 15; rainlefti++){ var newdyn = document.createElement("div"); newdyn.setAttribute("class", "stefanvddynamicbackgroundraindrups b" + rainlefti + ""); newdynrainleft.appendChild(newdyn); }
		}else if($("dynamic4").checked == true){
			var clouds = document.createElement("div"); clouds.setAttribute("id", "clouds"); newdynmaster.appendChild(clouds);
			var newdynworld = document.createElement("div"); newdynworld.setAttribute("id", "stefanvdworld"); clouds.appendChild(newdynworld);
			(function(){
				var lastTime = 0;
				var vendors = ["ms", "moz", "webkit", "o"];
				var x;
				var lvendor = vendors.length;
				for(x = 0; x < lvendor && !window.requestAnimationFrame; ++x){
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
		}else if($("dynamic5").checked == true){
			var flying = "";
			if($("hoveroptiondyn5").checked != true){
				// with the letter n include, then it see the flying in effect
				flying = "n";
			}
			var space = document.createElement("div"); space.setAttribute("id", "space"); newdynmaster.appendChild(space);

			var newdynspaceworld;
			if($("hoveroptiondyn5").checked != true){
				newdynspaceworld = document.createElement("div"); newdynspaceworld.setAttribute("id", "stefanvddynamicspacenoflying"); space.appendChild(newdynspaceworld);
			}else{
				newdynspaceworld = document.createElement("div"); newdynspaceworld.setAttribute("id", "stefanvddynamicspace"); space.appendChild(newdynspaceworld);
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
		}else if($("dynamic6").checked == true){
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
			imageObj.src = "images/Smoke10" + ft;

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
		}else if($("dynamic7").checked == true){
			var flyingdots = document.createElement("div"); flyingdots.setAttribute("id", "flyingdots"); newdynmaster.appendChild(flyingdots);
			var newdyndotsworld = document.createElement("div"); newdyndotsworld.setAttribute("id", "stefanvddynamicdots"); flyingdots.appendChild(newdyndotsworld);
			var flyingj;
			for(flyingj = 1; flyingj < 100; flyingj++){
				var newminic = document.createElement("div");
				newminic.className = "c";
				newdyndotsworld.appendChild(newminic);
			}
		}else if($("dynamic8").checked == true){
			var storm = document.createElement("div"); storm.setAttribute("id", "storm"); newdynmaster.appendChild(storm);
			var newstormcanvas = document.createElement("canvas"); newstormcanvas.setAttribute("id", "stefanvddynamicstorm"); newstormcanvas.style.width = "100%"; newstormcanvas.style.height = "100%"; storm.appendChild(newstormcanvas);

			stormcanvas = document.getElementById("stefanvddynamicstorm");
			sky = stormcanvas.getContext("2d", {desynchronized: true});

			window.addEventListener("resize", rainresizer, false);

			rainresizer();
			paintSky();
		}else if($("dynamic9").checked == true){
			var triangle = document.createElement("div"); triangle.setAttribute("id", "triangle"); newdynmaster.appendChild(triangle);
			trianglerun();
			window.onresize = onResize;
		}else if($("dynamic10").checked == true){
			var stars = document.createElement("div"); stars.setAttribute("id", "stars"); newdynmaster.appendChild(stars);
			var starsj;
			for(starsj = 1; starsj < 3; starsj++){
				var newmstar = document.createElement("div");
				newmstar.id = "mstars" + [starsj];
				stars.appendChild(newmstar);
			}
		}

	}
}

// Current year
function yearnow(){
	var today = new Date(); var y0 = today.getFullYear(); $("yearnow").innerText = y0;
}

function setappearancemode(a, b, c){
	$("dropmenu").className = a;
	document.body.className = b;
	$("headlamp").style.webkitFilter = c;
	$("headlamp").style.filter = c;
	$("loadinglamp").style.webkitFilter = c;
	$("loadinglamp").style.filter = c;
}

function godarkmode(){
	$("dropmenu").className = "hide";
	setappearancemode("hide", "dark", "invert(1) brightness(2)");
}

function golightmode(){
	$("dropmenu").className = "hide";
	setappearancemode("hide", "light", "invert(0)");
}

function seticonstyle(a, b, c){
	$("icondarkauto").style.opacity = a;
	$("icondarkoff").style.opacity = b;
	$("icondarkon").style.opacity = c;
}

function checkdarkmode(){
	chrome.storage.sync.get(["darkmode"], function(items){
		darkmode = items["darkmode"]; if(darkmode == null)darkmode = 2; // default Operating System

		// dark mode
		if(darkmode == 1){
			godarkmode();
			seticonstyle(0, 0, 1);
		}else if(darkmode == 0){
			golightmode();
			seticonstyle(0, 1, 0);
		}else if(darkmode == 2){
			if(window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches){
				godarkmode();
			}else{
				golightmode();
			}
			seticonstyle(1, 0, 0);
		}
	});
}

// Listen for messages
chrome.runtime.onMessage.addListener(function(msg){
	// If the received message has the expected format...
	if(msg.text === "receiveallpermissions"){
		// empty ul first
		if($("permullist")){
			var ul = document.getElementById("permullist");
			if(ul){
				while(ul.firstChild){
					ul.removeChild(ul.firstChild);
				}
			}
		}
		var perm = msg.value;
		perm.forEach(function(x){
			if($("permissionlist")){
				if($("permullist") == null){
					var newpermtitle = document.createElement("h4");
					newpermtitle.textContent = chrome.i18n.getMessage("permissionrequired");
					$("permissionlist").appendChild(newpermtitle);

					var newpermul = document.createElement("ul");
					newpermul.setAttribute("id", "permullist");
					$("permissionlist").appendChild(newpermul);
				}

				var newperm = document.createElement("li");
				$("permullist").appendChild(newperm);

				var newpermspan = document.createElement("span");
				newpermspan.textContent = x + ": ";
				newperm.appendChild(newpermspan);

				var textperm = "";
				var newpermspandes = document.createElement("span");
				if(x == "activeTab"){ textperm = chrome.i18n.getMessage("permissionactivetab"); }else if(x == "contextMenus"){ textperm = chrome.i18n.getMessage("permissioncontextmenu"); }else if(x == "storage"){ textperm = chrome.i18n.getMessage("permissionstorage"); }else if(x == "tabs"){ textperm = chrome.i18n.getMessage("permissiontabs"); }else if(x == "theme"){ textperm = chrome.i18n.getMessage("permissiontheme"); }else if(x == "<all_urls>"){ textperm = chrome.i18n.getMessage("permissionallurl"); }else if(x == "webNavigation"){ textperm = chrome.i18n.getMessage("permissionwebnav"); }else if(x == "scripting"){ textperm = chrome.i18n.getMessage("permissionscripting"); }else if(x == "alarms"){ textperm = chrome.i18n.getMessage("permissionalarms"); }
				newpermspandes.textContent = textperm;
				newpermspandes.className = "item";
				newperm.appendChild(newpermspandes);
			}
		});
	}
});

function setmetatheme(a){
	const metas = document.getElementsByTagName("meta");
	var darktheme;
	var lighttheme;

	if(a == true){
		// top status bar color => if side bar is open
		darktheme = "#1c1c1c";
		lighttheme = "#f5f5f5";
	}else{
		darktheme = "#232323";
		lighttheme = "#ffffff";
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
			}
		}
	}
}

function setmetathemepopup(a){
	const metas = document.getElementsByTagName("meta");
	var darktheme;
	var lighttheme;

	if(a == true){
		// top status bar color => if popup is open
		darktheme = "#111111";
		lighttheme = "#7f7f7f";
	}else{
		darktheme = "#232323";
		lighttheme = "#ffffff";
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
			}
		}
	}
}

/* Option page body action */
// Read current value settings
window.addEventListener("load", function(){
	// remove loading screen
	$("loading").style.display = "none";
});

document.addEventListener("DOMContentLoaded", domcontentloaded);

function domcontentloaded(){
	checkdarkmode();
	window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", function(){
		checkdarkmode();
	});

	// Add the YouTube player
	$("dont-turn-off-the-lights").src = youtubeembed;
	defaultgetsettings();
	yearnow();

	// Remove remember
	var sharetext = chrome.i18n.getMessage("sharetextd");
	var stefanvdurl = linkproduct;
	var stefanvdaacodeurl = encodeURIComponent(stefanvdurl);

	if($("shareboxyoutube")){
		$("shareboxyoutube").addEventListener("click", function(){ window.open(linkyoutube, "_blank"); });
	}
	if($("shareboxfacebook")){
		$("shareboxfacebook").addEventListener("click", function(){ window.open("https://www.facebook.com/sharer.php?u=" + stefanvdurl + "&t=" + sharetext + "", "Share to Facebook", "width=600,height=460,menubar=no,location=no,status=no"); });
	}
	if($("shareboxtwitter")){
		$("shareboxtwitter").addEventListener("click", function(){ window.open("https://twitter.com/share?url=" + stefanvdaacodeurl + "&text=" + sharetext + "", "Share to Twitter", "width=600,height=460,menubar=no,location=no,status=no"); });
	}

	var isMenuClick = false;
	var menu = document.getElementById("dotmenu");
	document.addEventListener("click", ()=>{
		if(!isMenuClick){
			// Hide the menu here
			$("dropmenu").className = "hide";
		}
		// Reset isMenuClick
		isMenuClick = false;
	});
	menu.addEventListener("click", ()=>{
		isMenuClick = true;
	});

	$("dotmenu").addEventListener("click", function(){
		if($("dropmenu").className == "show"){
			$("dropmenu").className = "hide";
		}else{
			$("dropmenu").className = "show";
		}
	});

	$("darkpanel").addEventListener("click", function(){
		$("menuToggle").click();
	});

	$("titleex").addEventListener("click", function(){
		window.open(linkdeveloperwebsite);
	});

	$("btnsupport").addEventListener("click", function(){
		window.open(linksupport); $("dropmenu").className = "hide";
	});

	$("btnactivedarkmodeauto").addEventListener("click", function(){
		if(window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches){
			godarkmode();
		}else{
			golightmode();
		}
		seticonstyle(1, 0, 0);
		chrome.storage.sync.set({"darkmode":2});
	});

	$("btnactivedarkmodeoff").addEventListener("click", function(){
		golightmode();
		seticonstyle(0, 1, 0);
		chrome.storage.sync.set({"darkmode":0});
	});

	$("btnactivedarkmodeon").addEventListener("click", function(){
		godarkmode();
		seticonstyle(0, 0, 1);
		chrome.storage.sync.set({"darkmode":1});
	});

	// Detect click / change to save the page and test it.
	var inputs = document.querySelectorAll("input");
	var i, l = inputs.length;
	for(i = 0; i < l; i++){ inputs[i].addEventListener("change", test); inputs[i].addEventListener("change", ariacheck); inputs[i].addEventListener("change", save_options); }

	// show all the active permissions in a list
	chrome.runtime.sendMessage({name: "getallpermissions"});

	// Detect lightcolor change
	$("lightcolor").addEventListener("change", function(){ $("lightimagen").checked = true; $("example1").style.background = this.value; $("example2").style.background = this.value; save_options(); });

	// Detect image change
	$("lightimage").addEventListener("change", function(){
		function getImage(url){
			var bkimage = new Image();
			bkimage.onload = function(){
				save_options();
			};
			bkimage.onerror = function(){
				var optionwrongimg = chrome.i18n.getMessage("optionwrongimg"); window.alert(optionwrongimg);
				$("lightimage").value = "https://www.turnoffthelights.com/extension/images/theater.jpg";
				$("example1").style.background = $("example2").style.background = "url(https://www.turnoffthelights.com/extension/images/theater.jpg)";
				save_options();
			};
			bkimage.src = url;
			$("example1").style.backgroundSize = $("example2").style.backgroundSize = "cover";
		}
		getImage(this.value);
	});

	$("slider").value = default_opacity; $("example1").style.opacity = (default_opacity / 100); $("example2").style.opacity = (default_opacity / 100);
	$("arangeblur").value = default_arangeblur;
	$("arangespread").value = default_arangespread;
	function showValue(newValue){ $("interval").value = newValue; $("slider").value = newValue; $("interval").setAttribute("aria-valuenow", newValue); $("slider").setAttribute("aria-valuenow", newValue); $("example1").style.opacity = (newValue / 100); $("example2").style.opacity = (newValue / 100); }
	function showambilightblurValue(newValue){ $("ambilightrangeblurradius").value = newValue; $("arangeblur").value = newValue; $("ambilightrangeblurradius").setAttribute("aria-valuenow", newValue); $("arangeblur").setAttribute("aria-valuenow", newValue); }
	function showambilightspreadValue(newValue){ $("ambilightrangespreadradius").value = newValue; $("arangespread").value = newValue; $("ambilightrangespreadradius").setAttribute("aria-valuenow", newValue); $("arangespread").setAttribute("aria-valuenow", newValue); }

	// Close yellow bar
	$("managed-prefs-text-close").addEventListener("click", function(){ $("managed-prefs-banner").className = "hidden"; });

	// Slider
	$("slider").addEventListener("change", function(){ showValue(this.value); save_options(); });
	$("slider").addEventListener("input", function(){ showValue(this.value); save_options(); }, false);
	$("slider").addEventListener("dblclick", function(){ showValue(80); save_options(); });

	// Interval
	$("interval").addEventListener("change", function(){ showValue(this.value); save_options(); });

	// Light switch
	$("onoffrange").addEventListener("change", function(){ lightscontrol(); });

	// Arangeblur
	$("arangeblur").addEventListener("change", function(){ showambilightblurValue(this.value); save_options(); });
	$("arangeblur").addEventListener("input", function(){ showambilightblurValue(this.value); save_options(); }, false);
	$("ambilightrangeblurradius").addEventListener("change", function(){ showambilightblurValue(this.value); save_options(); });

	// Arangespread
	$("arangespread").addEventListener("change", function(){ showambilightspreadValue(this.value); save_options(); });
	$("arangespread").addEventListener("input", function(){ showambilightspreadValue(this.value); save_options(); }, false);
	$("ambilightrangespreadradius").addEventListener("change", function(){ showambilightspreadValue(this.value); save_options(); });

	// Add website
	eventsubmitFunc("formeyeprotection", addWhitelistDomain);

	// Remove website
	$("removebutton").addEventListener("click", function(){ removedselectedwebsite("excludedDomainsBox"); });

	// Password eye
	$("eyeopen").addEventListener("click", function(){
		$("eyeopen").classList.add("hidden");
		$("eyeclose").classList.remove("hidden");
		$("enterpassword").type = "text";
	});

	$("eyeclose").addEventListener("click", function(){
		$("eyeopen").classList.remove("hidden");
		$("eyeclose").classList.add("hidden");
		$("enterpassword").type = "password";
	});

	// Save password
	$("confirmpassword").addEventListener("click", function(){ save_options(); var optionpastemp = chrome.i18n.getMessage("optionpasswordsaved"); window.alert(optionpastemp); });

	// Change Night Mode to dark switch
	var nmcheckbox = $("samplestefanvdnighttheme").getElementsByTagName("input")[0];
	nmcheckbox.addEventListener("change", function(){
		if(nmcheckbox.checked == true){
			if($("stefanvdnighti")){
				$("stefanvdnighti").setAttribute("id", "stefanvdnightin"); // change day background button
			}
		}else{
			if($("stefanvdnightin")){
				$("stefanvdnightin").setAttribute("id", "stefanvdnighti"); // change night background button
			}
		}
	});

	var guidekb = true;
	function memguide(){
		if(guidekb == true){
			// already visible
		}else{
			if(devdonate == false){
				$("managed-prefs-banner").className = "";
			}
		}
	}

	function mobilecheck(){
		if(window.innerWidth < 480){ $("menuToggle").click(); }
	}

	$("reveal-menu").addEventListener("click", function(){
		if(this.checked == true){
			setmetatheme(true);
		}else{
			setmetatheme(false);
		}
	});

	// Save KB download
	$("tabbasic").addEventListener("click", function(){ Scrolltotop(); ONworkaroundbugpreview(); OFFworkaroundbugfromsafari(); $("welcomeguide").src = ""; memguide(); guidekb = true; mobilecheck(); });
	$("tabvisual").addEventListener("click", function(){ Scrolltotop(); ONworkaroundbugpreview(); $("welcomeguide").src = ""; memguide(); guidekb = true; mobilecheck(); });
	$("tabadvan").addEventListener("click", function(){ Scrolltotop(); ONworkaroundbugpreview(); OFFworkaroundbugpreview(); $("welcomeguide").src = ""; memguide(); guidekb = true; mobilecheck(); });
	$("tabnight").addEventListener("click", function(){ Scrolltotop(); ONworkaroundbugpreview(); OFFworkaroundnight(); $("welcomeguide").src = ""; memguide(); guidekb = true; mobilecheck(); });
	$("tabgamepad").addEventListener("click", function(){ Scrolltotop(); ONworkaroundbugpreview(); OFFworkaroundgamepad(); $("welcomeguide").src = ""; memguide(); guidekb = true; mobilecheck(); });
	$("tabguide").addEventListener("click", function(){ Scrolltotop(); ONworkaroundbugpreview(); $("welcomeguide").src = linkguide; $("managed-prefs-banner").className = "hidden"; guidekb = false; mobilecheck(); });
	$("tabanalytics").addEventListener("click", function(){ Scrolltotop(); ONworkaroundbugpreview(); $("welcomeguide").src = ""; memguide(); guidekb = true; mobilecheck(); });
	$("tabhelp").addEventListener("click", function(){ Scrolltotop(); ONworkaroundbugpreview(); $("welcomeguide").src = ""; memguide(); guidekb = true; mobilecheck(); });

	$("buttonreportissue").addEventListener("click", function(){ window.open(linksupport); });
	$("buttonchangelog").addEventListener("click", function(){ window.open(linkchangelog); });
	$("buttontranslateme").addEventListener("click", function(){ window.open(linktranslate); });

	function setpreviewlampicon(a){
		document.images["btnpreview"].setAttribute("data-icon", a); document.images["btnpreview"].src = a; save_options();
	}

	function setpreviewimagelayer(a){
		$("lightimage").value = a; test(); ariacheck(); save_options();
	}

	// scroll to top
	function Scrolltotop(){ $("mainview").scrollTop = 0; }

	// remove all videos
	function ONworkaroundbugpreview(){ $("dont-turn-off-the-lights").src = ""; $("videopreviewA").src = ""; $("videopreviewB").src = ""; $("videopreviewC").src = ""; $("videopreviewnight").src = ""; }

	// add a video
	function OFFworkaroundbugfromsafari(){
		$("dont-turn-off-the-lights").src = youtubeembed;
	}

	function OFFworkaroundbugpreview(){
		$("videopreviewA").src = "https://www.youtube.com/embed/videoseries?list=PLxPzk_0jENdBDJATUnIE3koQ-63Ld-4OX&amp;showinfo=0";
		$("videopreviewB").src = "https://www.youtube.com/embed/videoseries?list=PLxPzk_0jENdCGQd-Ftbhw73gyGA-hN71C&amp;showinfo=0";
		$("videopreviewC").src = "https://www.youtube.com/embed/videoseries?list=PLxPzk_0jENdCDL6HzWwYmTg2Xkp9AIP5F&amp;showinfo=0";
	}

	function OFFworkaroundnight(){
		$("videopreviewnight").src = "https://www.youtube.com/embed/videoseries?list=PLxPzk_0jENdC0jpbT-SOLhoRWcTZhIHcu&rel=0";
	}

	function OFFworkaroundgamepad(){
		$("videopreviewgamepad").src = "https://www.youtube.com/embed/videoseries?list=PLxPzk_0jENdBo2_HFGOtu8lRv6hhA86kg&rel=0";
	}

	// wizard profile
	$("submitbuttonA").addEventListener("click", function(){
		$("nightenabletheme").checked = false;
		if($("profileAmouse").checked == true){
			$("mousespotlightt").checked = true;
		}else{
			$("mousespotlighto").checked = true;
		}
		$("lightcolor").value = $("profileAcolor").value;
		$("interval").value = $("profileAopacity").value; $("slider").value = $("profileAopacity").value; showValue($("profileAopacity").value);
		$("lampandnightmode").checked = false;
		var profilesave = chrome.i18n.getMessage("optionprofilesaved"); window.alert(profilesave);
		save_options(); test(); ariacheck();
	});
	$("submitbuttonB").addEventListener("click", function(){
		$("nightmodebck").value = $("profileBnightback").value;
		$("nightmodetxt").value = $("profileBnighttext").value;
		$("nightmodehyperlink").value = $("profileBnightlink").value;
		$("nightmodebutton").value = $("profileBnightbutton").value;
		$("nightmodeborder").value = $("profileBnightborder").value;
		$("interval").value = 0; $("slider").value = 0; showValue(0);
		$("mousespotlightt").checked = true;
		$("lampandnightmode").checked = true;
		chrome.runtime.sendMessage({name: "sendclearscreenshader"});
		var profilesave = chrome.i18n.getMessage("optionprofilesaved"); window.alert(profilesave);
		save_options(); test(); ariacheck();
	});
	$("submitbuttonC").addEventListener("click", function(){
		$("nightenabletheme").checked = false;
		$("lightcolor").value = $("profileCcolor").value;
		$("interval").value = $("profileCopacity").value; $("slider").value = $("profileCopacity").value; showValue($("profileCopacity").value);
		$("lampandnightmode").checked = false;
		$("mousespotlights").checked = true;
		var profilesave = chrome.i18n.getMessage("optionprofilesaved"); window.alert(profilesave);
		save_options(); test(); ariacheck();
	});

	// Check screenshot
	$("wallpaperhide").addEventListener("click", function(){
		$("imagegallery").classList.remove("hidden"); $("wallpapershow").classList.remove("hidden"); $("wallpaperhide").className = "hidden";
		$("bckimage1").setAttribute("src", "images/totlminis1" + ft); $("bckimage1").setAttribute("src", "images/totlminis1@2x" + ft);
		$("bckimage2").setAttribute("src", "images/totlminis2" + ft); $("bckimage2").setAttribute("src", "images/totlminis2@2x" + ft);
		$("bckimage3").setAttribute("src", "images/totlminis3" + ft); $("bckimage3").setAttribute("src", "images/totlminis3@2x" + ft);
		$("bckimage4").setAttribute("src", "images/totlminis4" + ft); $("bckimage4").setAttribute("src", "images/totlminis4@2x" + ft);
		$("bckimage5").setAttribute("src", "images/totlminis5" + ft); $("bckimage5").setAttribute("src", "images/totlminis5@2x" + ft);
	});
	$("wallpapershow").addEventListener("click", function(){
		$("imagegallery").className = "hidden"; $("wallpapershow").className = "hidden"; $("wallpaperhide").classList.remove("hidden");
		$("bckimage1").setAttribute("src", ""); $("bckimage1").setAttribute("srcset", "");
		$("bckimage2").setAttribute("src", ""); $("bckimage2").setAttribute("srcset", "");
		$("bckimage3").setAttribute("src", ""); $("bckimage3").setAttribute("srcset", "");
		$("bckimage4").setAttribute("src", ""); $("bckimage4").setAttribute("srcset", "");
		$("bckimage5").setAttribute("src", ""); $("bckimage5").setAttribute("srcset", "");
	});
	$("totlswallpaper5").addEventListener("click", function(){ setpreviewimagelayer("https://www.turnoffthelights.com/extension/images/totls5.jpg"); });
	$("totlswallpaper4").addEventListener("click", function(){ setpreviewimagelayer("https://www.turnoffthelights.com/extension/images/totls4.jpg"); });
	$("totlswallpaper3").addEventListener("click", function(){ setpreviewimagelayer("https://www.turnoffthelights.com/extension/images/totls3.jpg"); });
	$("totlswallpaper2").addEventListener("click", function(){ setpreviewimagelayer("https://www.turnoffthelights.com/extension/images/totls2.jpg"); });
	$("totlswallpaper1").addEventListener("click", function(){ setpreviewimagelayer("https://www.turnoffthelights.com/extension/images/theater.jpg"); });

	// dynamic test
	$("dynamic").addEventListener("click", function(){
		if($("dynamic").checked == true){ dynamictest(); $("lightdynamic").disabled = false; }else{ removedynamic(); $("lightdynamic").disabled = true; }
	});

	// Check dynamic
	$("dynamichide").addEventListener("click", function(){
		$("dynamicgallery").classList.remove("hidden"); $("dynamicshow").classList.remove("hidden"); $("dynamichide").className = "hidden";
		setdynimages(1);
	});
	$("dynamicshow").addEventListener("click", function(){
		$("dynamicgallery").className = "hidden"; $("dynamicshow").className = "hidden"; $("dynamichide").classList.remove("hidden");
		setdynimages(0);
	});

	let dynn = 0;
	while(dynn < 10){
		dynn++;
		$("totldynpaper" + dynn + "").addEventListener("click", function(){ $("dynamic" + this.getAttribute("data-dyn") + "").checked = true; dynamictest(); save_options(); });
	}
	$("hoveroptiondyn5").addEventListener("click", function(){ $("dynamic5").checked = true; dynamictest(); save_options(); });

	// autodim Add website
	eventsubmitFunc("formautodim", autodimaddWhitelistDomain);

	// autodim Remove website
	$("autodimremovebutton").addEventListener("click", function(){ removedselectedwebsite("autodimDomainsBox"); });

	// YouTube quality
	$("maxquality").addEventListener("click", function(){ save_options(); });
	$("maxquality").addEventListener("change", function(){ save_options(); });

	// HTML5 video volume steps
	$("videovolumesteps").addEventListener("click", function(){ save_options(); });
	$("videovolumesteps").addEventListener("change", function(){ save_options(); });

	// atmosphere Add website
	eventsubmitFunc("formatmospherelighting", atmosphereaddWhitelistDomain);

	// atmosphere Remove website
	$("atmosphereremovebutton").addEventListener("click", function(){ removedselectedwebsite("atmosphereDomainsBox"); });

	// night Add website
	eventsubmitFunc("formnightmode", nightaddWhitelistDomain);

	// night Remove website
	$("nightremovebutton").addEventListener("click", function(){ removedselectedwebsite("nightDomainsBox"); });

	// autostop Add website
	eventsubmitFunc("formautostop", autostopaddWhitelistDomain);

	// autostop Remove website
	$("autostopremovebutton").addEventListener("click", function(){ removedselectedwebsite("autostopDomainsBox"); });

	// video Add website
	eventsubmitFunc("formvideotoolbar", videotooladdWhitelistDomain);

	// video Remove website
	$("videotoolremovebutton").addEventListener("click", function(){ removedselectedwebsite("videotoolDomainsBox"); });

	// gamepad Add website
	eventsubmitFunc("formgamepad", gamepadaddWhitelistDomain);

	// gamepad Remove website
	$("gamepadremovebutton").addEventListener("click", function(){ removedselectedwebsite("gamepadDomainsBox"); });

	// multi opacity Change
	$("multiopacityDomainsBox").addEventListener("click", function(){ multiopacitychangeurl(); });
	$("multiopacitynumberBox").addEventListener("click", function(){ multiopacitychangenumberl(); });

	// multi opacity Add
	eventsubmitFunc("formmultiopacity", multiopacityadd);

	// multi opacity Remove
	$("multiopacityremovebutton").addEventListener("click", function(){ multiopacityremoveSelectedExcludedDomain(); });

	// Reset settings
	$("resettotl").addEventListener("click", function(){ chrome.storage.sync.clear(); chrome.runtime.sendMessage({name: "bckreload"}); location.reload(); });

	// linearsq
	$("linearsq").addEventListener("click", function(){ test(); ariacheck(); save_options(); });
	$("linearsq").addEventListener("change", function(){ test(); ariacheck(); save_options(); });

	// Review box
	$("war").addEventListener("click", function(){ window.open(writereview); $("sectionreviewbox").style.display = "none"; chrome.storage.sync.set({"reviewedlastonversion": chrome.runtime.getManifest().version}); });
	$("nt").addEventListener("click", function(){ $("sectionreviewbox").style.display = "none"; chrome.storage.sync.set({"reviewedlastonversion": chrome.runtime.getManifest().version}); });

	// Aurora Player app box
	$("apgetapp").addEventListener("click", function(){ window.open(linkauroraplayerapp); $("sectionauroraplayerappbox").style.display = "none"; chrome.storage.sync.set({"applastonversion": chrome.runtime.getManifest().version}); });
	$("apnt").addEventListener("click", function(){ $("sectionauroraplayerappbox").style.display = "none"; chrome.storage.sync.set({"applastonversion": chrome.runtime.getManifest().version}); });

	// YouTube app box
	$("ytappbox").addEventListener("click", function(){ window.open(linkyoutube, "_blank"); });

	// Lamp Icons
	$("p1").addEventListener("click", function(){
		var custombrowser = "";
		if(exbrowser == "safari"){ custombrowser = "/icons/iconstick38safari.png"; }else{ custombrowser = "/icons/iconstick38.png"; }
		setpreviewlampicon(custombrowser);
	});
	$("p2").addEventListener("click", function(){
		var custombrowser = "";
		if(exbrowser == "safari"){ custombrowser = "/icons/icongold38safari.png"; }else{ custombrowser = "/icons/icongold38.png"; }
		setpreviewlampicon(custombrowser);
	});
	$("p3").addEventListener("click", function(){
		var custombrowser = "";
		if(exbrowser == "safari"){ custombrowser = "/icons/iconrose38safari.png"; }else{ custombrowser = "/icons/iconrose38.png"; }
		setpreviewlampicon(custombrowser);
	});
	$("p4").addEventListener("click", function(){
		var custombrowser = "";
		if(exbrowser == "safari"){ custombrowser = "/icons/iconrainbow38safari.png"; }else{ custombrowser = "/icons/iconrainbow38.png"; }
		setpreviewlampicon(custombrowser);
	});
	$("p5").addEventListener("click", function(){
		var custombrowser = "";
		if(exbrowser == "safari"){ custombrowser = "/icons/iconwhite38safari.png"; }else{ custombrowser = "/icons/iconwhite38.png"; }
		setpreviewlampicon(custombrowser);
	});

	// get permission
	$("darkbrowsertheme").addEventListener("click", function(){
		if($("darkbrowsertheme").checked == true){

			// Permissions must be requested from inside a user gesture, like a button's
			// click handler.
			chrome.permissions.request({
				permissions: ["theme"]
			}, function(granted){
				// The callback argument will be true if the user granted the permissions.
				if(granted){
					saveindarktheme();
				}else{
					removeindarktheme();
					$("darkbrowsertheme").checked = false; // disable it back
					save_options();
				}
			});

		}else{
			removeindarktheme();
		}
	});

	// GP
	var gparray = ["gpleftstick", "gprightstick", "gpbtnx", "gpbtno", "gpbtnsquare", "gpbtntriangle", "gpbtnlb", "gpbtnrb", "gpbtnlt", "gpbtnrt", "gpbtnshare", "gpbtnmenu", "gpbtnrightstick", "gpbtnleftstick", "gpbtndirup", "gpbtndirdown", "gpbtndirleft", "gpbtndirright", "gpbtnlogo"];
	for(var inm = 0; inm < gparray.length; inm++){
		$(gparray[inm]).addEventListener("click", function(){ save_options(); });
		$(gparray[inm]).addEventListener("change", function(){ save_options(); });
	}

	function saveindarktheme(){
		chrome.permissions.contains({
			permissions: ["theme"]
		}, function(result){
			if(result){
				// The extension has the permissions.
			}else{
				// The extension doesn't have the permissions.
			}
		});
	}

	function removeindarktheme(){
		chrome.permissions.remove({
			permissions: ["theme"]
		}, function(removed){
			if(removed){
				// The permissions have been removed.
			}else{
				// The permissions have not been removed (e.g., you tried to remove
				// required permissions).
			}
		});
	}

	var pagearray = ["colorpanel", "gradientpanel", "imagepanel", "dynamicpanel", "blurpanel"];
	var tabarray = ["sub1", "sub2", "sub3", "sub4", "sub5"];
	function subselected(id){
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

	$("sub1").addEventListener("click", function(){
		subselected("sub1");
	});

	$("sub2").addEventListener("click", function(){
		subselected("sub2");
	});

	$("sub3").addEventListener("click", function(){
		subselected("sub3");
	});

	$("sub4").addEventListener("click", function(){
		subselected("sub4");
	});

	$("sub5").addEventListener("click", function(){
		subselected("sub5");
	});

	/* atmos */
	var atpartarray = ["atmospanel", "atmosonepanel", "atmosfourpanel", "atmosvividpanel", "atmossettingspanel"];
	var tvarray = ["tv1", "tv2", "tv3", "tv4", "tv5"];
	function tvselected(id){
		for(var itab = 0; itab < tvarray.length; itab++){
			if(id == tvarray[itab]){
				$(tvarray[itab]).className = "tabbutton tabhighlight";
				$(atpartarray[itab]).className = "";
			}else{
				$(tvarray[itab]).className = "tabbutton";
				$(atpartarray[itab]).className = "hidden";
			}
		}
	}

	$("tv1").addEventListener("click", function(){
		tvselected("tv1");
	});

	$("tv2").addEventListener("click", function(){
		tvselected("tv2");
	});

	$("tv3").addEventListener("click", function(){
		tvselected("tv3");
	});

	$("tv4").addEventListener("click", function(){
		tvselected("tv4");
	});

	$("tv5").addEventListener("click", function(){
		tvselected("tv5");
	});

	// easter egg game - playground
	var myGameArea;
	var myGamePiece;
	var myObstacles = [];
	var myScore;
	var myHighScore;
	var myGameOver;
	var previoushigh = 0;
	var levels = [250, 500, 750, 1000, 1500, 2000, 5000, 10000];

	function restartGame(){
		document.getElementById("stefanvdbtnplaygroundfilter").style.display = "none";
		myGameArea.stop();
		myGameArea.clear();
		myGameArea = {};
		myGamePiece = {};
		myObstacles = [];
		myScore = {};
		document.getElementById("stefanvdplayground").innerHTML = "";
		startGame();
	}

	function startGame(){
		myGameArea = new gamearea();
		myGamePiece = new component(16, 30, "images/party-balloon@2x" + ft, 15, 30, "image");
		myGamePiece.gravity = 0.05;
		myScore = new component("15px", "Verdana", "black", 330, 25, "text");
		myHighScore = new component("15px", "Verdana", "black", 330, 45, "text");
		myGameArea.start();
	}

	function gamearea(){
		this.refreshSpeed = 25;
		this.canvas = document.createElement("canvas");
		document.body.addEventListener("keydown", function(){
			const key = event.key;
			if(key == "ArrowUp"){
				accelerate(-0.2);
			}
		}, false);
		document.body.addEventListener("keyup", function(){
			const key = event.key;
			if(key == "ArrowUp"){
				accelerate(0.05);
			}
		}, false);

		this.canvas.addEventListener("pointerup", function(){ accelerate(0.05); }, false);
		this.canvas.addEventListener("pointerdown", function(){ accelerate(-0.2); }, false);

		document.getElementById("stefanvdplayground").appendChild(this.canvas);
		this.context = this.canvas.getContext("2d", {desynchronized: true});

		// retina support
		this.canvas.width = 480 * 2;
		this.canvas.height = 270 * 2;
		// this.canvas.style.width = "480px";
		// this.canvas.style.height = "270px";
		this.context.scale(2, 2);
		//---

		this.pause = false;
		this.frameNo = 0;
		this.start = function(){
			this.stopped = false;
			updateGameArea();
		};
		this.stop = function(){
			this.pause = true;
			this.stopped = true;
		};
		this.clear = function(){
			this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
		};
	}

	function component(width, height, color, x, y, type){
		this.type = type;
		if(type == "image"){
			this.image = new Image();
			this.image.width = 16;
			this.image.height = 30;
			this.image.src = color;
		}
		this.score = 0;
		this.width = width;
		this.height = height;
		this.color = color;
		this.speedX = 0;
		this.speedY = 0;
		this.x = x;
		this.y = y;
		this.gravity = 0;
		this.gravitySpeed = 0;
		this.update = function(){
			var gamectx = myGameArea.context;
			if(this.type == "text"){
				gamectx.font = this.width + " " + this.height;
				gamectx.fillStyle = this.color;
				gamectx.shadowBlur = 1;
				gamectx.shadowColor = "rgba(255,255,255,1)";
				gamectx.fillText(this.text, this.x, this.y);
			}else if(type == "image"){
				gamectx.imageSmoothingEnabled = false;
				gamectx.drawImage(this.image, this.x, this.y, this.width, this.height);
			}else{
				gamectx.fillStyle = color;
				gamectx.fillRect(this.x, this.y, this.width, this.height);
			}
		};
		this.newPos = function(){
			this.gravitySpeed += this.gravity;
			this.x += this.speedX;
			this.y += this.speedY + this.gravitySpeed;
			this.hitBottom();
		};
		this.hitBottom = function(){
			var rockbottom = myGameArea.canvas.height / 2 - this.height;
			if(this.y > rockbottom){
				this.y = rockbottom;
				this.gravitySpeed = 0;
			}
		};
		this.crashWith = function(otherobj){
			var myleft = this.x;
			var myright = this.x + (this.width);
			var mytop = this.y;
			var mybottom = this.y + (this.height);
			var otherleft = otherobj.x;
			var otherright = otherobj.x + (otherobj.width);
			var othertop = otherobj.y;
			var otherbottom = otherobj.y + (otherobj.height);
			var crash = true;
			if((mybottom < othertop) || (mytop > otherbottom) || (myright < otherleft) || (myleft > otherright)){
				crash = false;
			}
			if(this.y < 0){ crash = true; }
			return crash;
		};
	}

	var AudioContext = window.AudioContext || window.webkitAudioContext;
	var gameaudiocontext;
	function updateGameArea(){
		if(myGameArea.stopped){ return; }
		var x, height, gap, minHeight, maxHeight, minGap, maxGap, i;
		for(i = 0; i < myObstacles.length; i += 1){
			if(myGamePiece.crashWith(myObstacles[i])){
				if(myGameArea.frameNo > previoushigh){
					previoushigh = myGameArea.frameNo;
				}
				myGameArea.stop();
				myGameOver = new component("15px", "Verdana", "black", 195, 110, "text");
				myGameOver.text = "Game Over";
				myGameOver.update();
				if(document.getElementById("stefanvdbtnplaygroundfilter")){
					document.getElementById("stefanvdbtnplaygroundfilter").style.display = "flex";
				}
				return;
			}
		}
		if(myGameArea.pause == false){
			myGameArea.clear();
			myGameArea.frameNo += 1;
			myScore.score += 1;
			if(myGameArea.frameNo == 1 || everyinterval(150)){
				x = myGameArea.canvas.width / 2;
				minHeight = 20;
				maxHeight = 200;
				height = Math.floor(Math.random() * (maxHeight - minHeight + 1) + minHeight);
				minGap = 50;
				maxGap = 200;
				gap = Math.floor(Math.random() * (maxGap - minGap + 1) + minGap);
				myObstacles.push(new component(10, height, "#666666", x, 0));
				myObstacles.push(new component(10, x - height - gap, "#666666", x, height + gap));
			}
			var obstaclesi;
			var obstaclesl = myObstacles.length;
			for(obstaclesi = 0; obstaclesi < obstaclesl; obstaclesi += 1){
				myObstacles[obstaclesi].x += -1;
				myObstacles[obstaclesi].update();
			}

			myScore.text = "SCORE: " + myScore.score;
			if(myScore.score % 100 == 0){
				var FREQUENCY = 440;
				var INTERVAL = 250;
				var RAMP_VALUE = 0.00001;
				var RAMP_DURATION = 1;

				var frequency = FREQUENCY;
				var interval = INTERVAL;

				var play = function(){
					gameaudiocontext.resume().then(() => {
						// console.log('Playback resumed successfully');
					});
					var currentTime = gameaudiocontext.currentTime;
					var osc = gameaudiocontext.createOscillator();
					var gain = gameaudiocontext.createGain();

					osc.connect(gain);
					gain.connect(gameaudiocontext.destination);

					gain.gain.setValueAtTime(gain.gain.value, currentTime);
					gain.gain.exponentialRampToValueAtTime(RAMP_VALUE, currentTime + RAMP_DURATION);

					osc.onended = function(){
						gain.disconnect(gameaudiocontext.destination);
						osc.disconnect(gain);
					};

					osc.type = "sine";
					osc.frequency.value = frequency;
					osc.start(currentTime);
					osc.stop(currentTime + RAMP_DURATION);
				};

				var beep = function(times){
					if(!times) times = 1; (function loop(i){
						play();
						if(++i < times) window.setTimeout(loop, interval, i);
					})(0);
				};

				beep();
				// blink text
				myScore.color = "rgb(0,0,0,.2)";
				myScore.update();
				window.setTimeout(function(){
					myScore.color = "rgb(0,0,0,1)";
					myScore.update();
				}, 100);
				window.setTimeout(function(){
					myScore.color = "rgb(0,0,0,.2)";
					myScore.update();
				}, 200);
				window.setTimeout(function(){
					myScore.color = "rgb(0,0,0,1)";
					myScore.update();
				}, 300);
				window.setTimeout(function(){
					myScore.color = "rgb(0,0,0,.2)";
					myScore.update();
				}, 400);
				window.setTimeout(function(){
					myScore.color = "rgb(0,0,0,1)";
					myScore.update();
				}, 500);
			}

			if(levels.indexOf(myScore.score) != -1){
				myGameArea.refreshSpeed -= 2;
				// console.log( 'level '+levels.indexOf(myScore.score) + '; refreshRate: '+ myGameArea.refreshSpeed);
			}
			myScore.update();
			if(previoushigh > 0){
				myHighScore.text = "HI: " + previoushigh;
				myHighScore.update();
			}
			myGamePiece.newPos();
			myGamePiece.update();

			window.setTimeout(updateGameArea, myGameArea.refreshSpeed);
		}
	}

	function everyinterval(n){
		if((myGameArea.frameNo / n) % 1 == 0){ return true; }
		return false;
	}

	function accelerate(n){
		myGamePiece.gravity = n;
	}

	// search
	function emptysearch(input){
		pageinsearch = false;
		input.blur();

		var sections = document.getElementsByTagName("section");
		var x;
		var l = sections.length;
		for(x = 0; x < l; x++){
			var section = sections[x];
			section.classList.remove("searchfoundnothing");
		}

		// set view back to the current selected tab
		// and hide back all videos
		var y = document.getElementsByClassName("navbar-item-selected");
		y[0].click();

		// hide preview toolbar tabs
		document.getElementsByClassName("tabbar")[0].classList.remove("hidden");
		$("colorpanel").className = "";
		$("gradientpanel").className = "hidden";
		$("imagepanel").className = "hidden";
		$("dynamicpanel").className = "hidden";
		$("blurpanel").className = "hidden";

		document.getElementsByClassName("tabbar")[1].classList.remove("hidden");
		$("atmospanel").className = "";
		$("atmosonepanel").className = "hidden";
		$("atmosfourpanel").className = "hidden";
		$("atmosvividpanel").className = "hidden";
		$("atmossettingspanel").className = "hidden";

		removeElement("stefanvdbtnplaygroundfilter");
		removeElement("stefanvdplayground");
	}

	function textsearch(input){
		if(pageinsearch == false){
			pageinsearch = true;
			// load all the videos
			OFFworkaroundbugfromsafari();
			OFFworkaroundbugpreview();
			OFFworkaroundnight();
			OFFworkaroundgamepad();

			document.getElementsByClassName("tabbar")[0].classList.add("hidden");
			$("colorpanel").className = "";
			$("gradientpanel").className = "";
			$("imagepanel").className = "";
			$("dynamicpanel").className = "";
			$("blurpanel").className = "";

			document.getElementsByClassName("tabbar")[1].classList.add("hidden");
			$("atmospanel").className = "";
			$("atmosonepanel").className = "";
			$("atmosfourpanel").className = "";
			$("atmosvividpanel").className = "";
			$("atmossettingspanel").className = "";
		}

		// receive the total tab pages
		var tabListItems = $("navbar").childNodes;
		var tabListi;
		var tabListl = tabListItems.length;
		for(tabListi = 0; tabListi < tabListl; tabListi++){
			if(tabListItems[tabListi].nodeName == "LI"){
				var tabLink = getFirstChildWithTagName(tabListItems[tabListi], "A");
				var id = getHash(tabLink.getAttribute("data-tab"));
				contentDivs[id] = document.getElementById(id);
			}
		}

		// show all tab pages
		var showaltabid;
		for(showaltabid in contentDivs){
			if(showaltabid != "tab4"){
				if((contentDivs[showaltabid])){
					contentDivs[showaltabid].className = "page";
				}
			}
		}
		//---
		var searchword = input.value;
		if(searchword == "balloon"){
			// easteregg Party Balloon
			if(!$("stefanvdplayground")){
				// user gesture activate the game audio ping
				gameaudiocontext = new AudioContext();

				var newplaygroundfilter = document.createElement("div");
				newplaygroundfilter.setAttribute("id", "stefanvdbtnplaygroundfilter");
				newplaygroundfilter.style.zIndex = 200;
				newplaygroundfilter.style.position = "absolute";
				newplaygroundfilter.style.width = "calc(100% - 46px)";
				newplaygroundfilter.style.height = "calc(100% - 3px)";
				newplaygroundfilter.style.background = "rgba(0,0,0,.6)";
				newplaygroundfilter.style.display = "none";
				newplaygroundfilter.style.alignItems = "center";
				newplaygroundfilter.style.justifyContent = "center";
				$("mainview-content").appendChild(newplaygroundfilter);

				var newplayground = document.createElement("div");
				newplayground.setAttribute("id", "stefanvdplayground");
				$("mainview-content").appendChild(newplayground);

				var newbtnplaygroundrestart = document.createElement("button");
				newbtnplaygroundrestart.setAttribute("id", "stefanvdbtnplaygroundrestart");
				newbtnplaygroundrestart.addEventListener("click", function(){ restartGame(); }, false);
				newbtnplaygroundrestart.innerText = "Restart";
				newplaygroundfilter.appendChild(newbtnplaygroundrestart);

				var newbtnplaygroundfb = document.createElement("div");
				newbtnplaygroundfb.setAttribute("id", "stefanvdbtnplaygroundfacebook");
				newbtnplaygroundfb.addEventListener("click", function(){ chrome.tabs.create({url: "https://www.facebook.com/sharer/sharer.php?u=" + linkproduct, active:true}); }, false);
				newplaygroundfilter.appendChild(newbtnplaygroundfb);

				var newbtnplaygroundtw = document.createElement("div");
				newbtnplaygroundtw.setAttribute("id", "stefanvdbtnplaygroundtwitter");
				newbtnplaygroundtw.addEventListener("click", function(){ var stringgame = chrome.i18n.getMessage("shareanalyticenergy", "" + previoushigh + ""); var slinkproductcodeurl = encodeURIComponent(stringgame + " " + linkproduct + "@turnoffthelight #chromeextension #firefoxextension #operaextension"); chrome.tabs.create({url: "https://twitter.com/home?status=" + slinkproductcodeurl, active:true}); }, false);
				newplaygroundfilter.appendChild(newbtnplaygroundtw);

				startGame();
			}
		}else{
			removeElement("stefanvdplayground");
		}

		var allsections = document.getElementsByTagName("section");
		var sectionsx;
		var sectionsl = allsections.length;
		for(sectionsx = 0; sectionsx < sectionsl; sectionsx++){
			var partsection = allsections[sectionsx];
			var content = partsection.innerHTML;

			// remove first the help message, because not a feature
			var i18nhelpautodim = chrome.i18n.getMessage("helpautodim");
			content = content.replace(i18nhelpautodim, "");
			var i18nhelpeyeprotection = chrome.i18n.getMessage("helpeyeprotection");
			content = content.replace(i18nhelpeyeprotection, "");

			if(content.search(new RegExp(searchword, "i")) < 1){
				partsection.classList.add("searchfoundnothing");
			}else{
				partsection.classList.remove("searchfoundnothing");
			}
		}

		// hide the h2 if there is no sections visible
		var pages = document.getElementsByClassName("page");
		var z;
		var tabpagelength = pages.length;
		for(z = 0; z < tabpagelength; z++){
			var tabsections = pages[z].getElementsByTagName("section");
			var countnothingcheck = 0;
			var w;
			var q = tabsections.length;
			for(w = 0; w < q; w++){
				var currenttabsection = tabsections[w];
				if(currenttabsection.classList.contains("searchfoundnothing")){
					countnothingcheck += 1;
				}
			}
			if(countnothingcheck == tabsections.length){
				// total sections with nothing inside is the same as all the section -> hide the page
				pages[z].classList.add("searchfoundnothing");
			}else{
				pages[z].classList.remove("searchfoundnothing");
			}
		}
	}

	var pageinsearch = false;
	function OnSearch(input){
		if(input.value == ""){
			emptysearch(input);
		}else{
			textsearch(input);
		}
	}

	if(document.getElementById("appsearch")){
		document.getElementById("appsearch").addEventListener("search", function(){ OnSearch(this); }, false);
		document.getElementById("appsearch").addEventListener("input", function(){ OnSearch(this); }, false);
		document.getElementById("btnsearchicon").addEventListener("input", function(){ OnSearch(this); }, false);
		document.getElementById("appsearch").placeholder = chrome.i18n.getMessage("searchplaceholder");
	}

}