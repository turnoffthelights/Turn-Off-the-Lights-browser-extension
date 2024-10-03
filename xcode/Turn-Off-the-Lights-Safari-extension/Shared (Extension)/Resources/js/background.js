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

// Importing the constants
// eslint-disable-next-line no-undef
importScripts("constants.js");

chrome.runtime.onMessage.addListener(function request(request, sender){
	// eye protection & autodim & shortcut
	switch(request.name){
	case"bckreload":
		installation();
		break;
	case"redirectionoptions":
		chrome.tabs.query({active:true, currentWindow:true}, function(tabs){
			chrome.tabs.remove(tabs[0].id);
			chrome.runtime.openOptionsPage();
		});
		break;
	case"automatic":
		chrome.scripting.executeScript({
			target: {tabId: sender.tab.id},
			files: ["js/light.js"]
		});
		break;
	case"screenshot":
		var checkcapturewebsite = linkcapturescreenshot;
		chrome.tabs.create({url: checkcapturewebsite}, function(tab){
			var currenttabid = tab.id;
			chrome.tabs.onUpdated.addListener(function(tabId, changeInfo){
				if(changeInfo.status == "complete"){
					chrome.tabs.sendMessage(currenttabid, {action: "receivescreenshot", value: request.value});
				}
			});
		});
		break;
	case"contextmenuon":
		checkcontextmenus();
		break;
	case"contextmenuoff":
		removecontexmenus();
		break;
	case"sendlightcss":
		restcontent("/css/light.css", "injectlightcss", sender.tab.id);
		break;
	case"emergencyalf":
		chrome.tabs.query({}, function(tabs){
			var i, l = tabs.length;
			for(i = 0; i < l; i++){
				chrome.scripting.executeScript({
					target: {tabId: tabs[i].id},
					files: ["js/light.js"]
				});
			}
		}
		);
		break;
	case"eyesaveme":
		if(request.value == true){ chrome.storage.sync.set({"eyea": true, "eyen": false}); chromerefreshalltabs("gorefresheyedark"); }else{ chrome.storage.sync.set({"eyea": false, "eyen": true}); chromerefreshalltabs("gorefresheyelight"); }
		break;
	case"nmcustomvalues":
		if(request.valuex && request.valuey){ chrome.storage.sync.set({"nmcustomx": request.valuex, "nmcustomy": request.valuey}); }
		break;
	case"mastertabnight":
		// Night Owl profile
		var nightowlprofile, nightenabletheme;
		chrome.storage.sync.get(["nightowlprofile", "nightenabletheme"], function(response){
			nightowlprofile = response["nightowlprofile"];
			nightenabletheme = response["nightenabletheme"];
			if(nightowlprofile == true && nightenabletheme == true){
				chrome.storage.sync.set({"nightowlprofile": false});
				chrome.storage.sync.set({"nightenabletheme": false});
			}else{
				chrome.storage.sync.set({"nightowlprofile": true});
				chrome.storage.sync.set({"nightenabletheme": true});
			}
		});
		break;
	case"mastertabdark":
		if(request.value == true){
			chromerefreshalltabs("goremovelightoff");
		}else{
			chromerefreshalltabs("goaddlightoff");
		}
		break;
	case"browsertheme":
		if(request.value == "dark"){
			if(typeof browser !== "undefined"){
				var qtest = browser.theme.update;
				if(typeof qtest !== "undefined"){
					browser.theme.update({
						images: {
							theme_frame: "",
						},
						colors: {
							"frame": "black",
							"tab_background_text": "#fff",
							"toolbar": "#333333",
							"toolbar_field": "black",
							"toolbar_field_text": "white",
							"toolbar_field_border": "#505050",
							"tab_line": "#3e82f7",
							"popup": "black",
							"popup_text": "white",
							"popup_border": "gray"
						}
					});
				}
			}
			// set white icon
			chrome.tabs.query({}, function(tabs){
				var i, l = tabs.length;
				for(i = 0; i < l; i++){
					chrome.action.setIcon({tabId : tabs[i].id, path : {"19": "/icons/iconwhite19.png", "38": "/icons/iconwhite38.png"}});
				}
			});
		}else{
			if(typeof browser !== "undefined"){
				var qtestbrowsertheme = browser.theme.update;
				if(typeof qtestbrowsertheme !== "undefined"){
					browser.theme.reset();
				}
			}
			// return default icon
			chrome.storage.sync.get(["icon"], function(items){
				if(items["icon"] == undefined){
					if(exbrowser == "safari"){
						items["icon"] = "/icons/iconstick38safari.png";
					}else{
						items["icon"] = "/icons/iconstick38.png";
					}
				}
				chrome.tabs.query({}, function(tabs){
					var i, l = tabs.length;
					for(i = 0; i < l; i++){
						chrome.action.setIcon({tabId : tabs[i].id, path : {"19": items["icon"], "38": items["icon"]}});
					}
				});
			});
		}
		break;
	case"sendnightmodeindark":
		chrome.tabs.sendMessage(sender.tab.id, {action: "goinnightmode", value:request.value});
		break;
	case"sendclearscreenshader":
		chrome.storage.sync.set({"screenshader": false});
		chromerefreshalltabs("goclearscreenshader");
		break;
	case"getallpermissions":
		var result = "";
		chrome.permissions.getAll(function(permissions){
			result = permissions.permissions;
			chrome.tabs.sendMessage(sender.tab.id, {text: "receiveallpermissions", value: result});
		});
		break;
	case"pip":
		chrome.tabs.query({active: true, lastFocusedWindow: true}, function(tabs){
			chrome.tabs.sendMessage(tabs[0].id, {action: "gopipvisual"});
		});
		break;
	}
	return true;
});

// Not for Safari web browser, it use the content script way in the manifest.json file
// because Safari 15.4 and 16.0 do not support script "injectImmediately" and not stable "webNavigation.onCommitted" on iOS
// Inject before displaying the website
if(exbrowser != "safari"){
	chrome.webNavigation.onCommitted.addListener(({tabId, frameId, url}) => {
		// Filter out non main window events.
		if(frameId !== 0)return;
		injectScriptsTo(tabId, url);
	});
}else{
    // https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/API/scripting
    // Safari no support "executeScript.injectImmediately"
    // Use this content script in iOS 16.4 and higher
    chrome.scripting.registerContentScripts([
        {
          id: "session-script",
          js: ["js/screen-shader.js", "js/night-mode.js"],
          matches: ["<all_urls>"],
          runAt: "document_start"
        },
      ])
    .then(() => console.log("registration complete"))
    .catch((err) => console.warn("unexpected error", err));
}

// screen-shader.js = Screen Shader
// night-mode.js = Night Mode
const scriptList = ["js/screen-shader.js", "js/night-mode.js"];
const injectScriptsTo = (tabId, url) => {
	if(url.match(/^http/i) || url.match(/^file/i)){
		scriptList.forEach((script) => {
			chrome.scripting.executeScript({
				target: {tabId: tabId},
				files: [`${script}`],
				injectImmediately: true
			}, () => void chrome.runtime.lastError);
		});
	}
};
//---

function restcontent(path, name, sendertab){
	fetch(path)
		.then(function(response){
			// console.log("The content = " + response.text());
			chrome.tabs.sendMessage(sendertab, {name: name, message: response.text()});
		});
}

chrome.tabs.onActivated.addListener(async(activeInfo) => {
	chrome.tabs.get(activeInfo.tabId).then((thattab) => {
		chrome.storage.sync.get(["icon"], function(items){
			if(items["icon"] == undefined){
				if(exbrowser == "safari"){
					items["icon"] = "/icons/iconstick38safari.png";
				}else{
					items["icon"] = "/icons/iconstick38.png";
				}
			}
			chrome.action.setIcon({tabId : thattab.tabId, path : {"19": items["icon"], "38": items["icon"]}});
		});
	});
});

chrome.tabs.onUpdated.addListener(function(){
	getCurrentTab().then((thattab) => {
		if(thattab.status == "complete"){
			if(thattab.url.match(/^http/i)){
				chrome.tabs.sendMessage(thattab.id, {action: "gorefreshvideonumber"});
			}
		}

		chrome.storage.sync.get(["icon"], function(items){
			if(items["icon"] == undefined){
				if(exbrowser == "safari"){
					items["icon"] = "/icons/iconstick38safari.png";
				}else{
					items["icon"] = "/icons/iconstick38.png";
				}
			}
			chrome.action.setIcon({tabId : thattab.id, path : {"19": items["icon"], "38": items["icon"]}});
		});
	});
});

async function getCurrentTab(){
	let queryOptions = {active: true, currentWindow: true};
	let tabs = await chrome.tabs.query(queryOptions);
	return tabs[0];
}

// Set click to zero at beginning
let clickbutton = 0;
// Declare a timer variable
let timer;
chrome.action.onClicked.addListener(function(tab){
	if(tab.url.match(/^http/i) || tab.url.match(/^file/i)){
		if((new URL(tab.url)).origin == browserstore || tab.url == browsernewtab){
			chrome.action.setPopup({tabId: tab.id, popup:"popup.html"});
		}else{
			clickbutton += 1;
			if(clickbutton == 2){
				// console.log("Doubleclick");
				clearTimeout(timer);
				chrome.action.setPopup({tabId: tab.id, popup:"palette.html"});
				chrome.action.openPopup();
			}

			timer = setTimeout(function(){
				// console.log("Singelclick");
				if(clickbutton == 1){
					chrome.storage.sync.get(["alllightsoff", "mousespotlights"], function(chromeset){
						if((chromeset["mousespotlights"] != true)){ // regular lamp
							if((chromeset["alllightsoff"] != true)){
								chrome.scripting.executeScript({
									target: {tabId: tab.id},
									files: ["js/light.js"]
								});
							}else{
								chrome.tabs.sendMessage(tab.id, {action: "masterclick"});
							}
						}else{ // all tabs
							// Night Mode profile
							// Eye Protection profile
							chrome.tabs.sendMessage(tab.id, {action: "masterclick"});
						}
					});
				}
				clickbutton = 0;
				// Clear all timers
				clearTimeout(timer);
				chrome.action.setPopup({tabId: tab.id, popup:""});
			}, 250);
		}
	}else{
		chrome.action.setPopup({tabId: tab.id, popup:"popup.html"});
	}
});

function codenight(){
	if(document.getElementById("totldark")){
		chrome.runtime.sendMessage({name: "sendnightmodeindark", value: "day"});
	}else{
		chrome.runtime.sendMessage({name: "sendnightmodeindark", value: "night"});
	}
}

var lampandnightmode;
chrome.commands.onCommand.addListener(function(command){
	if(command == "toggle-feature-nightmode"){
		chrome.storage.sync.get(["lampandnightmode"], function(response){
			lampandnightmode = response["lampandnightmode"];
			if(lampandnightmode == true){
				chrome.runtime.sendMessage({name: "mastertabnight"});
			}else{
				getCurrentTab().then((thattab) => {
					chrome.scripting.executeScript({
						target: {tabId: thattab.id},
						func: codenight
					});
				});
			}
		});
	}
});

// contextMenus
function onClickHandler(info, tab){
	var str = info.menuItemId;
	switch(true){
	case(str.includes("totlvideo") || str.includes("totlpage")):
		chrome.scripting.executeScript({
			target: {tabId: tab.id},
			files: ["js/light.js"]
		});
		break;
	case(str.includes("totlguideemenu")): chrome.tabs.create({url: linkguide, active:true});
		break;
	case(str.includes("totldevelopmenu")): chrome.tabs.create({url: linkdonate, active:true});
		break;
	case(str.includes("totlratemen")): chrome.tabs.create({url: writereview, active:true});
		break;
	case(str.includes("totlshareemail")): var sturnoffthelightemail = "mailto:your@email.com?subject=" + chrome.i18n.getMessage("sharetexta") + "&body=" + chrome.i18n.getMessage("sharetextb") + " " + linkproduct; chrome.tabs.create({url: sturnoffthelightemail, active:true});
		break;
	case(str.includes("totlsharetwitter")): var slinkproductcodeurl = encodeURIComponent(chrome.i18n.getMessage("sharetextd") + " " + linkproduct); chrome.tabs.create({url: "https://twitter.com/intent/tweet?text=" + slinkproductcodeurl, active:true});
		break;
	case(str.includes("totlsharefacebook")): chrome.tabs.create({url: "https://www.facebook.com/sharer/sharer.php?u=" + linkproduct, active:true});
		break;
	case(str.includes("totlshareqq")): chrome.tabs.create({url: "https://connect.qq.com/widget/shareqq/index.html?url=" + encodeURIComponent(linkproduct) + "&title=" + encodeURIComponent(chrome.i18n.getMessage("sharetextd")), active:true});
		break;
	case(str.includes("totlshareweibo")): chrome.tabs.create({url: "https://service.weibo.com/share/share.php?url=" + linkproduct + "&title=" + encodeURIComponent(chrome.i18n.getMessage("sharetextd")), active:true});
		break;
	case(str.includes("totlsharevkontakte")): chrome.tabs.create({url: "https://vk.com/share.php?url=" + linkproduct, active:true});
		break;
	case(str.includes("totlsharewhatsapp")): chrome.tabs.create({url: "https://api.whatsapp.com/send?text=" + chrome.i18n.getMessage("sharetextd") + "%0a" + linkproduct, active:true});
		break;
	case(str.includes("totlsubscribe")): chrome.tabs.create({url: linkyoutube, active:true});
		break;
	}
}

// check to remove all contextmenus
if(chrome.contextMenus){
	chrome.contextMenus.removeAll(function(){
	// console.log("contextMenus.removeAll callback");
	});
}

var sharemenusharetitle = chrome.i18n.getMessage("sharemenusharetitle");
var sharemenuwelcomeguidetitle = chrome.i18n.getMessage("sharemenuwelcomeguidetitle");
var sharemenutellafriend = chrome.i18n.getMessage("sharemenutellafriend");
var sharemenusendatweet = chrome.i18n.getMessage("sharemenusendatweet");
var sharemenupostonfacebook = chrome.i18n.getMessage("sharemenupostonfacebook");
var sharemenuratetitle = chrome.i18n.getMessage("sharemenuratetitle");
var sharemenudonatetitle = chrome.i18n.getMessage("sharemenudonatetitle");
var sharemenusubscribetitle = chrome.i18n.getMessage("desremyoutube");
var sharemenupostonweibo = chrome.i18n.getMessage("sharemenupostonweibo");
var sharemenupostonvkontakte = chrome.i18n.getMessage("sharemenupostonvkontakte");
var sharemenupostonwhatsapp = chrome.i18n.getMessage("sharemenupostonwhatsapp");
var sharemenupostonqq = chrome.i18n.getMessage("sharemenupostonqq");

function browsercontext(a, b, c, d){
	var item = {"title": a, "type": "normal", "id": b, "contexts": contexts};
	var newitem;
	if(d != ""){
		item = Object.assign({}, item, {parentId: d});
	}
	if(c != ""){
		newitem = Object.assign({}, item, {icons: c});
	}
	try{
		// try show web browsers that do support "icons"
		// Firefox, Opera, Microsoft Edge
		return chrome.contextMenus.create(newitem);
	}catch(e){
		// catch web browsers that do NOT show the icon
		// Google Chrome
		return chrome.contextMenus.create(item);
	}
}

var actionmenuadded = false;
if(chrome.contextMenus){
	if(actionmenuadded == false){
		actionmenuadded = true;

		var contexts = ["action"];
		browsercontext(sharemenuwelcomeguidetitle, "totlguideemenu", {"16": "images/IconGuide.png", "32": "images/IconGuide@2x.png"});
		browsercontext(sharemenudonatetitle, "totldevelopmenu", {"16": "images/IconDonate.png", "32": "images/IconDonate@2x.png"});
		browsercontext(sharemenuratetitle, "totlratemenu", {"16": "images/IconStar.png", "32": "images/IconStar@2x.png"});

		// Create a parent item and two children.
		var parent = null;
		parent = browsercontext(sharemenusharetitle, "totlsharemenu", {"16": "images/IconShare.png", "32": "images/IconShare@2x.png"});
		browsercontext(sharemenutellafriend, "totlshareemail", {"16": "images/IconEmail.png", "32": "images/IconEmail@2x.png"}, parent);
		chrome.contextMenus.create({"title": "", "type":"separator", "id": "totlsepartorshare", "contexts": contexts, "parentId": parent});

		var uiLanguage = chrome.i18n.getUILanguage();
		if(uiLanguage.includes("zh")){
			// Chinese users
			browsercontext(sharemenupostonweibo, "totlshareweibo", {"16": "images/IconWeibo.png", "32": "images/IconWeibo@2x.png"}, parent);
			browsercontext(sharemenupostonqq, "totlshareqq", {"16": "images/IconQQ.png", "32": "images/IconQQ@2x.png"}, parent);
		}else if(uiLanguage.includes("ru")){
			// Russian users
			browsercontext(sharemenupostonvkontakte, "totlsharevkontakte", {"16": "images/IconVkontakte.png", "32": "images/IconVkontakte@2x.png"}, parent);
			browsercontext(sharemenupostonfacebook, "totlsharefacebook", {"16": "images/IconFacebook.png", "32": "images/IconFacebook@2x.png"}, parent);
			browsercontext(sharemenupostonwhatsapp, "totlsharewhatsapp", {"16": "images/IconWhatsApp.png", "32": "images/IconWhatsApp@2x.png"}, parent);
			browsercontext(sharemenusendatweet, "totlsharetwitter", {"16": "images/IconTwitter.png", "32": "images/IconTwitter@2x.png"}, parent);
		}else{
			// all users
			browsercontext(sharemenupostonfacebook, "totlsharefacebook", {"16": "images/IconFacebook.png", "32": "images/IconFacebook@2x.png"}, parent);
			browsercontext(sharemenupostonwhatsapp, "totlsharewhatsapp", {"16": "images/IconWhatsApp.png", "32": "images/IconWhatsApp@2x.png"}, parent);
			browsercontext(sharemenusendatweet, "totlsharetwitter", {"16": "images/IconTwitter.png", "32": "images/IconTwitter@2x.png"}, parent);
		}

		chrome.contextMenus.create({"title": "", "type":"separator", "id": "totlsepartor", "contexts": contexts});
		browsercontext(sharemenusubscribetitle, "totlsubscribe", {"16": "images/IconYouTube.png", "32": "images/IconYouTube@2x.png"});

		chrome.contextMenus.onClicked.addListener(onClickHandler);
	}
}

// context menu for page and video
var menuitems = null;
var contextmenuadded = false;
var contextarrayvideo = [];
var contextarraypage = [];

function addwebpagecontext(a, b, c, d){
	var k;
	var addvideolength = b.length;
	for(k = 0; k < addvideolength; k++){
		var contextvideo = b[k];
		menuitems = chrome.contextMenus.create({"title": a, "type":"normal", "id": d + k, "contexts":[contextvideo]});
		c.push(menuitems);
	}
}

function checkcontextmenus(){
	if(chrome.contextMenus){
		if(contextmenuadded == false){
			contextmenuadded = true;
			// video
			var videotitle = chrome.i18n.getMessage("videotitle");
			var contextsvideo = ["video"];
			addwebpagecontext(videotitle, contextsvideo, contextarrayvideo, "totlvideo");
			// page
			var pagetitle = chrome.i18n.getMessage("pagetitle");
			var contexts = ["page", "selection", "link", "editable", "image", "audio"];
			addwebpagecontext(pagetitle, contexts, contextarraypage, "totlpage");
		}
	}
}

function cleanrightclickmenu(menu){
	if(menu.length > 0){
		menu.forEach(function(item){
			if(item != null){ chrome.contextMenus.remove(item); }
		});
	}
	menu.length = 0;
}

function removecontexmenus(){
	if(chrome.contextMenus){
		cleanrightclickmenu(contextarrayvideo);
		cleanrightclickmenu(contextarraypage);
		contextmenuadded = false;
	}
}

function checkreturnpolicyvalues(a, b, c){
	if(a[b] && Object.prototype.hasOwnProperty.call(policygrouparray, c)){
		if(a[b].newValue != policygrouparray[c]){
			chrome.storage.sync.set({b: policygrouparray[c]});
		}
	}
}

function onchangestorage(a, b, c, d){
	if(a[b]){
		if(a[b].newValue == true){ c(); }else{ d(); }
	}
}

var key;
chrome.storage.onChanged.addListener(function(changes){
	for(key in changes){
		onchangestorage(changes, "contextmenus", checkcontextmenus, removecontexmenus);
		if(changes["icon"]){
			if(changes["icon"].newValue){
				chrome.tabs.query({}, function(tabs){
					var i, l = tabs.length;
					for(i = 0; i < l; i++){
						chrome.action.setIcon({tabId : tabs[i].id,
							path : {
								"19": changes["icon"].newValue,
								"38": changes["icon"].newValue
							}
						});
					}
				}
				);
			}
		}
		if(changes["ecosaver"]){
			if(changes["ecosaver"].newValue){
				chromerefreshalltabs("gorefresheyelight");
			}
		}

		var changenameautodim = ["autodim", "mousespotlights", "autodimDomains", "autodimchecklistwhite", "autodimchecklistblack", "autodimonly", "aplay", "apause", "astop", "autodimdelay", "autodimdelaytime"];
		if(changenameautodim.includes(key)){
			chromerefreshalltabs("gorefreshautodim");
		}

		var changenamevideotoolbar = ["videotool", "videotoolonly", "videotoolDomains", "videotoolchecklistwhite", "videotoolchecklistblack", "speedtoolbar", "videozoom", "visopacity", "videotoolcolor"];
		if(changenamevideotoolbar.includes(key)){
			chromerefreshalltabs("gorefreshvideotoolbar");
		}

		var changenamevolume = ["videovolume", "videovolumealt", "videovolumehold", "videovolumeposa", "videovolumeposb", "videovolumeposc", "videovolumecolor", "videovolumelabel", "videovolumesteps", "videovolumeonly", "videovolumeDomains", "videovolumechecklistwhite", "videovolumechecklistblack", "videovolumescrolla", "videovolumescrollb", "videovolumescrollc", "videovolumeposd", "videovolumepose"];
		if(changenamevolume.includes(key)){
			chromerefreshalltabs("gorefreshmousescroll");
		}

		var changenameatmos = ["ambilight", "ambilightfixcolor", "ambilight4color", "ambilightvarcolor", "atmosvivid", "vpause", "atmosfpsauto", "atmosfpsmanual", "drawatmosfps", "ambilightcolorhex", "ambilight1colorhex", "ambilight2colorhex", "ambilight3colorhex", "ambilight4colorhex", "ambilightrangeblurradius", "ambilightrangespreadradius", "atmosontotlmode", "atmosphereonly", "atmosphereDomains"];
		if(changenameatmos.includes(key)){
			chromerefreshalltabs("goenableatmos");
		}

		if(changes["reflection"] || changes["reflectionamount"]){
			chromerefreshalltabs("gorefreshreflection");
		}
		if(changes["hovervideo"] || changes["hovervideoamount"]){
			chromerefreshalltabs("gorefreshhovervideo");
		}
		if(changes["playrate"] || changes["playrateamount"]){
			chromerefreshalltabs("gorefreshplayrate");
		}
		if(changes["nightmodebck"] || changes["nightmodetxt"] || changes["nightmodehyperlink"] || changes["nightmodebutton"] || changes["nightmodeborder"] || changes["nmimagedark"] || changes["nmimagegray"]){
			chromerefreshalltabs("gonightmodecolors");
		}

		var changenamenight = ["nighttheme", "lampandnightmode", "nightmodeswitchhide", "nightmodeswitchhidetime", "nightonly", "nightmodechecklistwhite", "nightmodechecklistblack", "nightDomains", "nightmodebydomain", "nightmodebypage", "nightactivetime", "nmbegintime", "nmendtime", "nightenabletheme", "nighthover", "nmtopleft", "nmtopright", "nmbottomright", "nmbottomleft", "nmcustom", "nightmodegesture", "nightmodeos", "nmautoclock", "nmautobegintime", "nmautoendtime", "nightmodeimage"];
		if(changenamenight.includes(key)){
			chromerefreshalltabs("goenablenightmode");
		}

		if(changes["nightmodegesture"]){
			chromerefreshalltabs("gorefreshnightmodegesture");
		}
		if(changes["ecosaver"] || changes["ecosavertime"]){
			chromerefreshalltabs("gorefresheyesaver");
		}
		if(changes["nighttime"] || changes["begintime"] || changes["endtime"]){
			chromerefreshalltabs("gorefreshnighttime");
		}
		if(changes["pipvisualtype"]){
			chromerefreshalltabs("gorefreshpipvisualtype");
		}

		var changenamegamepad = ["gamepad", "gpleftstick", "gprightstick", "gpbtnx", "gpbtno", "gpbtnsquare", "gpbtntriangle", "gpbtnlb", "gpbtnrb", "gpbtnlt", "gpbtnrt", "gpbtnshare", "gpbtnmenu", "gpbtnrightstick", "gpbtnleftstick", "gpbtndirup", "gpbtndirdown", "gpbtndirleft", "gpbtndirright", "gpbtnlogo", "gamepadonly", "gamepadDomains", "gamepadchecklistwhite", "gamepadchecklistblack"];
		if(changenamegamepad.includes(key)){
			chromerefreshalltabs("gorefreshgamepad");
		}

		// Group Policy
		// check the values with group policy, if different values. Then change it back
		checkreturnpolicyvalues(changes, "autodim", "AutoDim");
		checkreturnpolicyvalues(changes, "autostop", "AutoStop");
		checkreturnpolicyvalues(changes, "customqualityyoutube", "AutoHD");
		checkreturnpolicyvalues(changes, "maxquality", "AutoHDQuality");
		checkreturnpolicyvalues(changes, "block60fps", "Block60FPS");
		checkreturnpolicyvalues(changes, "nighttheme", "NightModeSwitch");
		checkreturnpolicyvalues(changes, "videovolume", "MouseVolumeScroll");
		checkreturnpolicyvalues(changes, "videotool", "VideoToolbar");
	}
});

function chromerefreshalltabs(name){
	chrome.tabs.query({}, function(tabs){
		var i, l = tabs.length;
		for(i = 0; i < l; i++){
			var protocol = tabs[i].url.split(":")[0];
			if(protocol == "http" || protocol == "https"){
				chrome.tabs.sendMessage(tabs[i].id, {action: name});
			}
		}
	});
}

// omnibox
var i18nomninightmode = chrome.i18n.getMessage("omninightmode").toLowerCase();
var i18nomnidaymode = chrome.i18n.getMessage("omnidaymode").toLowerCase();
var i18nomnilightoff = chrome.i18n.getMessage("omnilightoff").toLowerCase();
var i18nomnilighton = chrome.i18n.getMessage("omnilighton").toLowerCase();
var i18nomnihelp = chrome.i18n.getMessage("omnihelp").toLowerCase();
if(typeof chrome.omnibox !== "undefined"){
	chrome.omnibox.onInputChanged.addListener(
		function(text, suggest){
			var suggtext;
			if(text == ""){ suggtext = "Turn Off the Lights"; }else{ suggtext = text; }
			chrome.omnibox.setDefaultSuggestion({description: suggtext});
			suggest([
				{content: i18nomninightmode, description: "night mode"},
				{content: i18nomnidaymode, description: "day mode"},
				{content: i18nomnilightoff, description: "light off"},
				{content: i18nomnilighton, description: "light on"}
			]);
		});

	chrome.omnibox.onInputEntered.addListener(
		function(text){
			var onmniresult = text.toLowerCase();
			if(onmniresult == i18nomninightmode){
				omnidaynightmode(1);
			}else if(onmniresult == i18nomnidaymode){
				omnidaynightmode(0);
			}else if(onmniresult == i18nomnilightoff || text == i18nomnilighton){
				getCurrentTab().then((thattab) => {
					chrome.scripting.executeScript({
						target: {tabId: thattab.id},
						files: ["js/light.js"]
					});
				});
			}else if(onmniresult == i18nomnihelp){
				getCurrentTab().then((thattab) => {
					chrome.tabs.update(thattab.id, {url: linksupport});
				});
			}
		});
}

function omnidaynightmode(a){
	var result = "";
	if(a == 0){ result = "day"; }else{ result = "night"; }
	getCurrentTab().then((thattab) => {
		chrome.tabs.sendMessage(thattab.id, {action: "goinnightmode", value:result});
	});
}

chrome.runtime.setUninstallURL(linkuninstall);

function initwelcome(){
	chrome.storage.sync.get(["firstRun"], function(chromeset){
		if((chromeset["firstRun"] != "false") && (chromeset["firstRun"] != false)){
			chrome.tabs.create({url: linkwelcome, active:true});
			chrome.tabs.create({url: linkguide, active:false});
			var crrinstall = new Date().getTime();
			chrome.storage.sync.set({"firstRun": false, "version": "2.4", "firstDate": crrinstall});
		}
	});
}

// saving group policy values
var savinggroup = {};
function setsavegroup(a, b){
	if(a == true){ savinggroup[b] = true; }else if(a == false){ savinggroup[b] = false; }
}

function readgrouppolicy(items){
	if(chrome.runtime.lastError){
		// console.error("managed error: " + chrome.runtime.lastError.message);
	}else{
		// console.log("items", items);
		if(items.SuppressWelcomePage == true){
			var crrinstall = new Date().getTime();
			chrome.storage.sync.set({"firstRun": false, "version": "2.4", "firstDate": crrinstall});
		}else{
			// no value, then show the page
			initwelcome();
		}

		setsavegroup(items.AutoDim, "autodim");
		setsavegroup(items.AutoStop, "autostop");
		setsavegroup(items.AutoHD, "customqualityyoutube");

		if(items.AutoHDQuality != ""){ savinggroup["maxquality"] = items.AutoHDQuality; }

		setsavegroup(items.Block60FPS, "block60fps");
		setsavegroup(items.NightModeSwitch, "nighttheme");
		setsavegroup(items.MouseVolumeScroll, "videovolume");
		setsavegroup(items.VideoToolbar, "videotool");

		// save total group policy
		chrome.storage.sync.set(savinggroup);
	}
}

var policygrouparray = {};
if(chrome.storage.managed){
	chrome.storage.managed.onChanged.addListener(function(changes){
		// save in memory
		Object.keys(changes).forEach(function(policyName){
			policygrouparray[policyName] = changes[policyName].newValue;
		});

		// update saving group policy values
		var updatesavinggroup = {};

		if(changes["AutoDim"]){
			updatesavinggroup["autodim"] = changes["AutoDim"].newValue;
		}
		if(changes["AutoStop"]){
			updatesavinggroup["autostop"] = changes["AutoStop"].newValue;
		}
		if(changes["AutoHD"]){
			updatesavinggroup["customqualityyoutube"] = changes["AutoHD"].newValue;
		}
		if(changes["AutoHDQuality"]){
			updatesavinggroup["maxquality"] = changes["AutoHDQuality"].newValue;
		}
		if(changes["Block60FPS"]){
			updatesavinggroup["block60fps"] = changes["Block60FPS"].newValue;
		}
		if(changes["NightModeSwitch"]){
			updatesavinggroup["nighttheme"] = changes["NightModeSwitch"].newValue;
		}
		if(changes["MouseVolumeScroll"]){
			updatesavinggroup["videovolume"] = changes["MouseVolumeScroll"].newValue;
		}
		if(changes["VideoToolbar"]){
			updatesavinggroup["videotool"] = changes["VideoToolbar"].newValue;
		}

		// update save total group policy
		chrome.storage.sync.set(updatesavinggroup);
	});
}

function installation(){
	if(chrome.storage.managed){
		chrome.storage.managed.get(function(items){
			readgrouppolicy(items);
			// save in memory
			Object.keys(items).forEach(function(policyName){
				policygrouparray[policyName] = items[policyName];
			});
		});
	}else{
		initwelcome();
	}
}

chrome.runtime.onInstalled.addListener(function(){
	installation();
});
