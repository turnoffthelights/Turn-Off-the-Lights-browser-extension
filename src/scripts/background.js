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

// Importing the constants
// Execute if importScripts is support such as Google Chrome and not Firefox
if(typeof importScripts !== "undefined"){
	// eslint-disable-next-line no-undef
	importScripts("constants.js");
}

chrome.runtime.onMessage.addListener(async function request(request, sender, sendResponse){
	// eye protection & autodim & shortcut
	switch(request.name){
	case"bckreload":
		installation();
		break;
	case"redirectionoptions": {
		const[tab] = await chrome.tabs.query({active: true, currentWindow: true});
		await chrome.tabs.remove(tab.id);
		await chrome.runtime.openOptionsPage();
		break;
	}
	case"redirectionoptionsnewtab": {
		await chrome.tabs.query({active:true, currentWindow:true});
		var optionsnewtab = chrome.runtime.getURL("options.html?tab=" + request.value);
		chrome.tabs.create({url: optionsnewtab, active:true});
		break;
	}
	case"automatic":
		chrome.scripting.executeScript({
			target: {tabId: sender.tab.id},
			files: ["scripts/light.js"]
		});
		break;
	case"screenshot": {
		const checkcapturewebsite = linkcapturescreenshot;
		const tab = await chrome.tabs.create({url: checkcapturewebsite});
		const currenttabid = tab.id;
		const listener = function(tabId, changeInfo){
			if(tabId === currenttabid && changeInfo.status == "complete"){
				chrome.tabs.onUpdated.removeListener(listener);
				chrome.tabs.sendMessage(currenttabid, {action: "receivescreenshot", value: request.value});
			}
		};
		chrome.tabs.onUpdated.addListener(listener);
		break;
	}
	case"sendlightcss":
		restcontent("/styles/light.css", "injectlightcss", sender.tab.id);
		break;
	case"senddynamiccss":
		restcontent("/styles/dynamic.css", "injectdynamiccss", sender.tab.id);
		break;
	case"emergencyalf": {
		const allTabs = await chrome.tabs.query({});
		for(const tab of allTabs){
			chrome.scripting.executeScript({
				target: {tabId: tab.id},
				files: ["scripts/light.js"]
			});
		}
		break;
	}
	case"eyesaveme":
		if(request.value == true){ chrome.storage.sync.set({"eyea": true, "eyen": false}); chromerefreshalltabs("gorefresheyedark"); }else{ chrome.storage.sync.set({"eyea": false, "eyen": true}); chromerefreshalltabs("gorefresheyelight"); }
		break;
	case"nmcustomvalues":
		if(request.valuex && request.valuey){ chrome.storage.sync.set({"nmcustomx": request.valuex, "nmcustomy": request.valuey}); }
		break;
	case"mastertabnight": {
		// Night Owl profile
		const response = await chrome.storage.sync.get(["nightowlprofile", "nightenabletheme"]);
		const nightowlprofile = response["nightowlprofile"];
		const nightenabletheme = response["nightenabletheme"];
		if(nightowlprofile == true && nightenabletheme == true){
			await chrome.storage.sync.set({"nightowlprofile": false});
			await chrome.storage.sync.set({"nightenabletheme": false});
		}else{
			await chrome.storage.sync.set({"nightowlprofile": true});
			await chrome.storage.sync.set({"nightenabletheme": true});
		}
		break;
	}
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
			const allTabs = await chrome.tabs.query({});
			for(const tab of allTabs){
				chrome.action.setIcon({tabId : tab.id, path : {"19": "/images/iconwhite19.png", "38": "/images/iconwhite38.png"}});
			}
		}else{
			if(typeof browser !== "undefined"){
				var qtestbrowsertheme = browser.theme.update;
				if(typeof qtestbrowsertheme !== "undefined"){
					browser.theme.reset();
				}
			}
			// return default icon
			const items = await chrome.storage.sync.get(["icon"]);
			let iconPath = items["icon"];
			if(iconPath == undefined){
				if(exbrowser == "safari"){
					iconPath = "/images/iconstick38safari.png";
				}else{
					iconPath = "/images/iconstick38.png";
				}
			}
			const allTabs = await chrome.tabs.query({});
			for(const tab of allTabs){
				chrome.action.setIcon({tabId : tab.id, path : {"19": iconPath, "38": iconPath}});
			}
		}
		break;
	case"sendnightmodeindark":
		chrome.tabs.sendMessage(sender.tab.id, {action: "goinnightmode", value:request.value});
		break;
	case"sendclearscreenshader":
		chrome.storage.sync.set({"screenshader": false});
		chromerefreshalltabs("goclearscreenshader");
		break;
	case"getallpermissions": {
		const permissions = await chrome.permissions.getAll();
		sendResponse(permissions.permissions);
		return true;
	}
	}
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
	// https://developer.apple.com/documentation/safariservices/assessing-your-safari-web-extension-s-browser-compatibility
	// Safari no support "executeScript.injectImmediately"
	// See manifest.json "content_scripts"
}

// screen-shader.js = Screen Shader
// night-mode.js = Night Mode
const injectScriptsTo = async(tabId, url) => {
	if(url.match(/^http/i) || url.match(/^file/i)){
		// Check if screenshader is enabled before injecting
		const response = await chrome.storage.sync.get(["mousespotlights", "screenshader"]);
		const mousespotlights = response["mousespotlights"];
		const screenshader = response["screenshader"];

		// Build script list based on enabled features
		const scriptsToInject = ["scripts/night-mode.js"]; // Always inject night-mode.js
		if(mousespotlights === true && screenshader === true){
			scriptsToInject.push("scripts/screen-shader.js");
		}

		if(exbrowser != "safari"){
			scriptsToInject.forEach((script) => {
				chrome.scripting.executeScript({
					target: {tabId: tabId},
					files: [`${script}`],
					injectImmediately: true
				}, () => void chrome.runtime.lastError);
			});
		}else{
			scriptsToInject.forEach((script) => {
				chrome.scripting.executeScript({
					target: {tabId: tabId},
					files: [`${script}`]
				}, () => void chrome.runtime.lastError);
			});
		}
	}
};
//---

// Constants for script IDs
const SCRIPT_IDS = {
	autostop: "autostopScript",
	fps: "fpsScript",
	reflection: "reflectionScript",
	autodim: "autodimScript",
	atmosphere: "atmosphereScript",
	gamepad: "gamepadScript",
	videotoolbar: "videotoolbarScript",
	youtubetweaks: "youtubetweaksScript",
	keyboardshortcuts: "keyboardshortcutsScript",
	eastereggs: "eastereggsScript",
	mousevolumescroll: "mousevolumescrollScript"
};

// Configuration for content scripts
const CONTENT_SCRIPTS = {
	autostop: {
		id: SCRIPT_IDS.autostop,
		js: ["scripts/autostop.js"],
		matches: ["<all_urls>"],
		runAt: "document_start",
		allFrames: true,
		matchOriginAsFallback: true
	},
	fps: {
		id: SCRIPT_IDS.fps,
		js: ["scripts/fps.js"],
		matches: ["*://*.youtube.com/*"],
		runAt: "document_start",
		allFrames: true
	},
	reflection: {
		id: SCRIPT_IDS.reflection,
		js: ["scripts/reflection.js"],
		matches: ["<all_urls>"],
		runAt: "document_end"
	},
	autodim: {
		id: SCRIPT_IDS.autodim,
		js: ["scripts/autodim.js"],
		matches: ["<all_urls>"],
		runAt: "document_end"
	},
	atmosphere: {
		id: SCRIPT_IDS.atmosphere,
		js: ["scripts/atmosphere.js"],
		matches: ["<all_urls>"],
		runAt: "document_end"
	},
	gamepad: {
		id: SCRIPT_IDS.gamepad,
		js: ["scripts/gamepad.js"],
		matches: ["<all_urls>"],
		runAt: "document_end"
	},
	videotoolbar: {
		id: SCRIPT_IDS.videotoolbar,
		js: ["scripts/video-toolbar.js"],
		matches: ["<all_urls>"],
		runAt: "document_end"
	},
	youtubetweaks: {
		id: SCRIPT_IDS.youtubetweaks,
		js: ["scripts/youtube-tweaks.js"],
		matches: ["*://*.youtube.com/*"],
		runAt: "document_end"
	},
	keyboardshortcuts: {
		id: SCRIPT_IDS.keyboardshortcuts,
		js: ["scripts/keyboard-shortcuts.js"],
		matches: ["<all_urls>"],
		runAt: "document_end"
	},
	eastereggs: {
		id: SCRIPT_IDS.eastereggs,
		js: ["scripts/easter-egg.js"],
		matches: ["<all_urls>"],
		runAt: "document_end"
	},
	mousevolumescroll: {
		id: SCRIPT_IDS.mousevolumescroll,
		js: ["scripts/mouse-volume-scroll.js"],
		matches: ["<all_urls>"],
		runAt: "document_end"
	}
};

// Utility function to check if a specific content script is registered
async function isScriptRegistered(scriptId){
	const scripts = await chrome.scripting.getRegisteredContentScripts();
	return scripts.some((script) => script.id === scriptId);
}

// Utility function to register a content script based on configuration
async function registerContentScript(scriptConfig){
	const{id} = scriptConfig;
	if(!(await isScriptRegistered(id))){
		await chrome.scripting.registerContentScripts([scriptConfig]);
	}
}

// Utility function to unregister a content script by ID
async function unregisterContentScript(scriptId){
	if(await isScriptRegistered(scriptId)){
		await chrome.scripting.unregisterContentScripts({ids: [scriptId]});
	}
}

// Function to manage content script based on one or more storage settings
async function manageContentScript(settingKey, scriptConfig){
	try{
		const data = await chrome.storage.sync.get(settingKey);
		const enabled = Array.isArray(settingKey) ? settingKey.some((key) => data[key]) : data[settingKey];
		if(enabled){
			await registerContentScript(scriptConfig);
			// console.log(`Registered script for ${Array.isArray(settingKey) ? settingKey.join(",") : settingKey}`);
		}else{
			await unregisterContentScript(scriptConfig.id);
			// console.log(`Unregistered script for ${Array.isArray(settingKey) ? settingKey.join(",") : settingKey}`);
		}
	}catch(error){
		console.error(`Error managing script for ${Array.isArray(settingKey) ? settingKey.join(",") : settingKey}:`, error);
	}
}

// check and apply settings for each script
manageContentScript("autostop", CONTENT_SCRIPTS.autostop);
manageContentScript("block60fps", CONTENT_SCRIPTS.fps);
manageContentScript("reflection", CONTENT_SCRIPTS.reflection);
manageContentScript("ambilight", CONTENT_SCRIPTS.atmosphere);
manageContentScript("gamepad", CONTENT_SCRIPTS.gamepad);
manageContentScript(["videotool", "gamepad"], CONTENT_SCRIPTS.videotoolbar);
manageContentScript("autodim", CONTENT_SCRIPTS.autodim);
manageContentScript(["no360youtube", "autowidthyoutube", "customqualityyoutube"], CONTENT_SCRIPTS.youtubetweaks);
manageContentScript("shortcutlight", CONTENT_SCRIPTS.keyboardshortcuts);
manageContentScript("eastereggs", CONTENT_SCRIPTS.eastereggs);
manageContentScript("videovolume", CONTENT_SCRIPTS.mousevolumescroll);
//---

async function restcontent(path, name, sendertab){
	try{
		const response = await fetch(path);
		const text = await response.text();
		// console.log("The content = " + text);
		chrome.tabs.sendMessage(sendertab, {name: name, message: text});
	}catch(error){
		console.error("Error fetching content:", error);
	}
}

(async function(){
	const items = await chrome.storage.sync.get(["icon"]);
	let iconPath = items["icon"];
	if(iconPath == undefined){
		if(exbrowser == "safari"){
			iconPath = "/images/iconstick38safari.png";
		}else{
			iconPath = "/images/iconstick38.png";
		}
	}
	chrome.action.setIcon({
		path : {
			"19": iconPath,
			"38": iconPath
		}
	});
})();

chrome.tabs.onUpdated.addListener(async function(){
	const thattab = await getCurrentTab();
	if(thattab.status == "complete"){
		if(thattab.url.match(/^http/i)){
			chrome.tabs.sendMessage(thattab.id, {action: "gorefreshvideonumber"});
		}
	}

	const items = await chrome.storage.sync.get(["icon"]);
	let iconPath = items["icon"];
	if(iconPath == undefined){
		if(exbrowser == "safari"){
			iconPath = "/images/iconstick38safari.png";
		}else{
			iconPath = "/images/iconstick38.png";
		}
	}
	chrome.action.setIcon({tabId : thattab.id, path : {"19": iconPath, "38": iconPath}});
});

async function getCurrentTab(){
	let queryOptions = {active: true, currentWindow: true};
	let tabs = await chrome.tabs.query(queryOptions);
	return tabs[0];
}

async function getPopupOpenLength(){
	var total = (await chrome.runtime.getContexts({contextTypes: ["POPUP"]})).length;
	return total;
}

// Transient state for double-click detection (250ms window)
// Intentionally not persisted - resets on service worker termination
// This is acceptable as it only affects click detection timing
let clickbutton = 0;
let timer;

if(exbrowser != "safari"){
	chrome.action.onClicked.addListener(async(tab) => {
		if(tab.url.match(/^http/i) || tab.url.match(/^file/i)){
			if((new URL(tab.url)).origin == browserstore || tab.url == browsernewtab){
				chrome.action.setPopup({tabId: tab.id, popup:"popup.html"});
			}else{
				clickbutton += 1;
				timer = setTimeout(async function(){
					const thatpanellength = await getPopupOpenLength();
					if(thatpanellength != 0){
						// console.log("Doubleclick");
						// console.log("yes popup open")
						clickbutton = 0;
						clearTimeout(timer);
					}else{
						// console.log("no popup open")
						if(clickbutton == 1){
							chrome.storage.sync.get(["alllightsoff", "mousespotlights"], function(chromeset){
								if((chromeset["mousespotlights"] != true)){ // regular lamp
									if((chromeset["alllightsoff"] != true)){
										chrome.scripting.executeScript({
											target: {tabId: tab.id},
											files: ["scripts/light.js"]
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
					}
					chrome.action.setPopup({tabId: tab.id, popup:""});
				}, 250);
				chrome.action.setPopup({tabId: tab.id, popup:"palette.html"});
			}
		}else{
			chrome.action.setPopup({tabId: tab.id, popup:"popup.html"});
		}
	});
}else{
	// safari does not support "chrome.runtime.getContexts"
	// count click actions
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
					// reset flag shortly after popup opens or fails
					setTimeout(() => { chrome.action.setPopup({tabId: tab.id, popup:""}); }, 500);
				}

				timer = setTimeout(function(){
					// console.log("Singelclick");
					if(clickbutton == 1){
						chrome.storage.sync.get(["alllightsoff", "mousespotlights"], function(chromeset){
							if((chromeset["mousespotlights"] != true)){ // regular lamp
								if((chromeset["alllightsoff"] != true)){
									chrome.scripting.executeScript({
										target: {tabId: tab.id},
										files: ["scripts/light.js"]
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
				}, 250);
			}
		}else{
			chrome.action.setPopup({tabId: tab.id, popup:"popup.html"});
		}
	});
}

function codenight(){
	if(document.getElementById("totldark")){
		chrome.runtime.sendMessage({name: "sendnightmodeindark", value: "day"});
	}else{
		chrome.runtime.sendMessage({name: "sendnightmodeindark", value: "night"});
	}
}

var lampandnightmode;
// keyboard shortcuts only for desktop web browser
// and not for Firefox Android mobile web browser
if(chrome.commands && chrome.commands.onCommand){
	chrome.commands.onCommand.addListener(async function(command){
		if(command == "toggle-feature-nightmode"){
			const response = await chrome.storage.sync.get(["lampandnightmode"]);
			lampandnightmode = response["lampandnightmode"];
			if(lampandnightmode == true){
				chrome.runtime.sendMessage({name: "mastertabnight"});
			}else{
				const thattab = await getCurrentTab();
				chrome.scripting.executeScript({
					target: {tabId: thattab.id},
					func: codenight
				});
			}
		}
	});
}

// contextMenus
async function onClickHandler(info, tab){
	var str = info.menuItemId;
	switch(true){
	case(str.includes("totlvideo") || str.includes("totlpage")):
		chrome.scripting.executeScript({
			target: {tabId: tab.id},
			files: ["scripts/light.js"]
		});
		break;
	case(str.includes("autodimpage")): {
		const items = await chrome.storage.sync.get(["autodimDomains"]);
		var autodimDomains = items["autodimDomains"];
		// Check website is in the list
		// then add it or remove it
		var thaturldim = new URL(tab.url);
		var currenttoggledomain = thaturldim.protocol + "//" + thaturldim.hostname;
		autodimDomains = JSON.parse(autodimDomains);
		if(autodimDomains[currenttoggledomain]){
			// If it is in the list, remove it
			delete autodimDomains[currenttoggledomain];
		}else{
			// If it is not in the list, add it
			autodimDomains[currenttoggledomain] = true;
		}
		autodimDomains = JSON.stringify(autodimDomains);
		// enable the autodimonly feature because you are going to whitelist/blacklist this feature now
		await chrome.storage.sync.set({"autodim": true, "autodimonly": true, "autodimDomains": autodimDomains});
		// send notification message to the user
		chromerefreshalltabs("gotoggleautodim");
		break;
	}
	case(str.includes("autostoppage")): {
		const items = await chrome.storage.sync.get(["autostopDomains"]);
		var autostopDomains = items["autostopDomains"];
		// Check website is in the list
		// then add it or remove it
		var thaturlstop = new URL(tab.url);
		var currenttoggledomainstop = thaturlstop.protocol + "//" + thaturlstop.hostname;
		autostopDomains = JSON.parse(autostopDomains);
		if(autostopDomains[currenttoggledomainstop]){
			// If it is in the list, remove it
			delete autostopDomains[currenttoggledomainstop];
		}else{
			// If it is not in the list, add it
			autostopDomains[currenttoggledomainstop] = true;
		}
		autostopDomains = JSON.stringify(autostopDomains);
		// enable the autostoponly feature because you are going to whitelist/blacklist this feature now
		await chrome.storage.sync.set({"autostop": true, "autostoponly": true, "autostopDomains": autostopDomains});
		// send notification message to the user
		chromerefreshalltabs("gotoggleautostop");
		break;
	}
	case(str.includes("nightmodepage")): {
		const items = await chrome.storage.sync.get(["nightDomains"]);
		var nightDomains = items["nightDomains"];
		// Check website is in the list
		// then add it or remove it
		var thaturlnight = new URL(tab.url);
		var currenttoggledomainnight = thaturlnight.protocol + "//" + thaturlnight.hostname;
		nightDomains = JSON.parse(nightDomains);
		if(nightDomains[currenttoggledomainnight]){
			// If it is in the list, remove it
			delete nightDomains[currenttoggledomainnight];
		}else{
			// If it is not in the list, add it
			nightDomains[currenttoggledomainnight] = true;
		}
		nightDomains = JSON.stringify(nightDomains);
		// enable the nightonly feature because you are going to whitelist/blacklist this feature now
		await chrome.storage.sync.set({"nightonly": true, "nightDomains": nightDomains});
		// send notification message to the user
		chromerefreshalltabs("gotogglenightmode");
		break;
	}
	case(str.includes("totlguideemenu")): chrome.tabs.create({url: linkguide, active:true});
		break;
	case(str.includes("totldevelopmenu")): chrome.tabs.create({url: linkdonate, active:true});
		break;
	case(str.includes("totlsupport")): chrome.tabs.create({url: linksupport, active:true});
		break;
	case(str.includes("totlratemen")): chrome.tabs.create({url: writereview, active:true});
		break;
	case(str.includes("totlshareemail")): var sturnoffthelightemail = "mailto:your@email.com?subject=" + chrome.i18n.getMessage("sharetexta") + "&body=" + chrome.i18n.getMessage("sharetextb") + " " + linkproduct; chrome.tabs.create({url: sturnoffthelightemail, active:true});
		break;
	case(str.includes("totlsharex")): var slinkproductcodeurl = encodeURIComponent(chrome.i18n.getMessage("sharetextd") + " " + linkproduct); chrome.tabs.create({url: "https://x.com/intent/tweet?text=" + slinkproductcodeurl, active:true});
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
	case(str.includes("totloptions")):
		chrome.runtime.openOptionsPage();
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
var sharemenusendapost = chrome.i18n.getMessage("sharemenusendapost");
var sharemenupostonfacebook = chrome.i18n.getMessage("sharemenupostonfacebook");
var sharemenudonatetitle = chrome.i18n.getMessage("sharemenudonatetitle");
var sharemenusupporttitle = chrome.i18n.getMessage("reportbug");
var sharemenupostonweibo = chrome.i18n.getMessage("sharemenupostonweibo");
var sharemenupostonvkontakte = chrome.i18n.getMessage("sharemenupostonvkontakte");
var sharemenupostonwhatsapp = chrome.i18n.getMessage("sharemenupostonwhatsapp");
var sharemenupostonqq = chrome.i18n.getMessage("sharemenupostonqq");
var sharemenuoptions = chrome.i18n.getMessage("titelpopupoptions");

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
	}catch{
		// console.log(e);
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
		if(devdonate == true){
			browsercontext(sharemenusupporttitle, "totlsupport", {"16": "images/IconHelp.png", "32": "images/IconHelp@2x.png"});
		}else{
			browsercontext(sharemenudonatetitle, "totldevelopmenu", {"16": "images/IconDonate.png", "32": "images/IconDonate@2x.png"});
		}

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
			browsercontext(sharemenusendapost, "totlsharex", {"16": "images/IconX.png", "32": "images/IconX@2x.png"}, parent);
		}else{
			// all users
			browsercontext(sharemenupostonfacebook, "totlsharefacebook", {"16": "images/IconFacebook.png", "32": "images/IconFacebook@2x.png"}, parent);
			browsercontext(sharemenupostonwhatsapp, "totlsharewhatsapp", {"16": "images/IconWhatsApp.png", "32": "images/IconWhatsApp@2x.png"}, parent);
			browsercontext(sharemenusendapost, "totlsharex", {"16": "images/IconX.png", "32": "images/IconX@2x.png"}, parent);
		}

		if(exbrowser == "safari" || exbrowser == "firefox"){
			chrome.contextMenus.create({"title": "", "type":"separator", "id": "totlsepartor", "contexts": contexts});
			browsercontext(sharemenuoptions, "totloptions", {"16": "images/options.png", "32": "images/options@2x.png"});
		}

		chrome.contextMenus.onClicked.addListener(onClickHandler);
	}
}

var contextmenus; var pageautodim; var pageautostop; var pagenightmode;
chrome.storage.sync.get(["contextmenus", "pageautodim", "pageautostop", "pagenightmode"], function(items){
	contextmenus = items.contextmenus; if(contextmenus == null)contextmenus = false;
	pageautodim = items.pageautodim; if(pageautodim == null)pageautodim = false;
	pageautostop = items.pageautostop; if(pageautostop == null)pageautostop = false;
	pagenightmode = items.pagenightmode; if(pagenightmode == null)pagenightmode = false;
	if(items["contextmenus"]){ checkcontextmenus(); }
	if(items["pageautodim"]){ checkpageautodim(); }
	if(items["pageautostop"]){ checkpageautostop(); }
	if(items["pagenightmode"]){ checkpagenightmode(); }
});

// context menu for page and video
var menuitems = null;
var contextmenuadded = false;
var contextmenuautodimadded = false;
var contextmenuautostopadded = false;
var contextmenunightmodeadded = false;
var contextarrayvideo = [];
var contextarraypage = [];
var contextarrayautodim = [];
var contextarrayautostop = [];
var contextarraynightmode = [];

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

function checkpageautodim(){
	if(chrome.contextMenus){
		if(contextmenuautodimadded == false){
			contextmenuautodimadded = true;
			// Toggle AutoDim
			var pageautodimtitle = chrome.i18n.getMessage("pageautodimtitle");
			var contextsautodim = ["page"];
			addwebpagecontext(pageautodimtitle, contextsautodim, contextarrayautodim, "autodimpage");
		}
	}
}

function checkpageautostop(){
	if(chrome.contextMenus){
		if(contextmenuautostopadded == false){
			contextmenuautostopadded = true;
			// Toggle AutoDim
			var pageautostoptitle = chrome.i18n.getMessage("pageautostoptitle");
			var contextsautostop = ["page"];
			addwebpagecontext(pageautostoptitle, contextsautostop, contextarrayautostop, "autostoppage");
		}
	}
}

function checkpagenightmode(){
	if(chrome.contextMenus){
		if(contextmenunightmodeadded == false){
			contextmenunightmodeadded = true;
			// Toggle AutoDim
			var pagenightmodetitle = chrome.i18n.getMessage("pagenightmodetitle");
			var contextsnightmode = ["page"];
			addwebpagecontext(pagenightmodetitle, contextsnightmode, contextarraynightmode, "nightmodepage");
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

function removepageautodim(){
	if(chrome.contextMenus){
		cleanrightclickmenu(contextarrayautodim);
		contextmenuautodimadded = false;
	}
}


function removepageautostop(){
	if(chrome.contextMenus){
		cleanrightclickmenu(contextarrayautostop);
		contextmenuautostopadded = false;
	}
}

function removepagenightmode(){
	if(chrome.contextMenus){
		cleanrightclickmenu(contextarraynightmode);
		contextmenunightmodeadded = false;
	}
}

function checkreturnpolicyvalues(a, b, c){
	if(a[b] && Object.prototype.hasOwnProperty.call(policygrouparray, c)){
		if(a[b].newValue != policygrouparray[c]){
			chrome.storage.sync.set({[b]: policygrouparray[c]});
		}
	}
}

function onchangestorage(a, b, c, d){
	if(a[b]){
		if(a[b].newValue == true){ c(); }else{ d(); }
	}
}

var key;
chrome.storage.onChanged.addListener(async function(changes){
	for(key in changes){
		onchangestorage(changes, "contextmenus", checkcontextmenus, removecontexmenus);
		onchangestorage(changes, "pageautodim", checkpageautodim, removepageautodim);
		onchangestorage(changes, "pageautostop", checkpageautostop, removepageautostop);
		onchangestorage(changes, "pagenightmode", checkpagenightmode, removepagenightmode);

		// Handle autostop content script registration
		if(changes["autostop"]){
			if(changes["autostop"].newValue === true){
				manageContentScript("autostop", CONTENT_SCRIPTS.autostop);
			}else{
				unregisterContentScript(SCRIPT_IDS.autostop);
			}
		}

		// Handle youtube tweaks content script registration
		if(changes["no360youtube"] || changes["autowidthyoutube"] || changes["customqualityyoutube"]){
			manageContentScript(["no360youtube", "autowidthyoutube", "customqualityyoutube"], CONTENT_SCRIPTS.youtubetweaks);
		}

		// Handle keyboard shortcuts content script registration
		if(changes["shortcutlight"]){
			if(changes["shortcutlight"].newValue === true){
				manageContentScript("shortcutlight", CONTENT_SCRIPTS.keyboardshortcuts);
				// Inject script into existing tabs
				const tabs = await chrome.tabs.query({});
				for(const tab of tabs){
					if(tab.url && (tab.url.startsWith("http://") || tab.url.startsWith("https://"))){
						try{
							await chrome.scripting.executeScript({
								target: {tabId: tab.id},
								files: ["scripts/keyboard-shortcuts.js"]
							});
						}catch{
							// Ignore errors for tabs where script can't be injected
						}
					}
				}
			}else{
				unregisterContentScript(SCRIPT_IDS.keyboardshortcuts);
				// Stop keyboard shortcuts in existing tabs
				chromerefreshalltabs("gorefreshshortcut");
			}
		}

		// Handle eastereggs content script registration
		if(changes["eastereggs"]){
			if(changes["eastereggs"].newValue === true){
				manageContentScript("eastereggs", CONTENT_SCRIPTS.eastereggs);
				// Inject script into existing tabs
				const tabs = await chrome.tabs.query({});
				for(const tab of tabs){
					if(tab.url && (tab.url.startsWith("http://") || tab.url.startsWith("https://"))){
						try{
							await chrome.scripting.executeScript({
								target: {tabId: tab.id},
								files: ["scripts/easter-egg.js"]
							});
						}catch{
							// Ignore errors for tabs where script can't be injected
						}
					}
				}
			}else{
				unregisterContentScript(SCRIPT_IDS.eastereggs);
				// Stop eastereggs in existing tabs
				chromerefreshalltabs("gorefresheastereggs");
			}
		}

		// Handle reflection content script registration
		if(changes["reflection"]){
			if(changes["reflection"].newValue === true){
				manageContentScript("reflection", CONTENT_SCRIPTS.reflection);
				// Inject script into existing tabs
				const tabs = await chrome.tabs.query({});
				for(const tab of tabs){
					if(tab.url && (tab.url.startsWith("http://") || tab.url.startsWith("https://"))){
						try{
							await chrome.scripting.executeScript({
								target: {tabId: tab.id},
								files: ["scripts/reflection.js"]
							});
						}catch{
							// Ignore errors for tabs where script can't be injected
						}
					}
				}
			}else{
				unregisterContentScript(SCRIPT_IDS.reflection);
				// Stop reflection in existing tabs
				chromerefreshalltabs("gorefreshreflection");
			}
		}

		// Handle autodim content script registration
		if(changes["autodim"]){
			if(changes["autodim"].newValue === true){
				manageContentScript("autodim", CONTENT_SCRIPTS.autodim);
				// Inject script into existing tabs
				const tabs = await chrome.tabs.query({});
				for(const tab of tabs){
					if(tab.url && (tab.url.startsWith("http://") || tab.url.startsWith("https://"))){
						try{
							await chrome.scripting.executeScript({
								target: {tabId: tab.id},
								files: ["scripts/autodim.js"]
							});
						}catch{
							// Ignore errors for tabs where script can't be injected
						}
					}
				}
			}else{
				unregisterContentScript(SCRIPT_IDS.autodim);
				// Stop autodim in existing tabs
				chromerefreshalltabs("gorefreshautodim");
			}
		}

		// Handle block60fps content script registration
		if(changes["block60fps"]){
			if(changes["block60fps"].newValue === true){
				manageContentScript("block60fps", CONTENT_SCRIPTS.fps);
			}else{
				unregisterContentScript(SCRIPT_IDS.fps);
			}
		}

		// Handle gamepad content script registration
		if(changes["gamepad"]){
			if(changes["gamepad"].newValue === true){
				manageContentScript("gamepad", CONTENT_SCRIPTS.gamepad);
				// Inject script into existing tabs
				const tabs = await chrome.tabs.query({});
				for(const tab of tabs){
					if(tab.url && (tab.url.startsWith("http://") || tab.url.startsWith("https://"))){
						try{
							await chrome.scripting.executeScript({
								target: {tabId: tab.id},
								files: ["scripts/gamepad.js"]
							});
						}catch{
							// Ignore errors for tabs where script can't be injected
						}
					}
				}
			}else{
				unregisterContentScript(SCRIPT_IDS.gamepad);
				// Stop gamepad in existing tabs
				chromerefreshalltabs("gorefreshgamepad");
			}
		}

		// Handle video toolbar content script registration
		if(changes["videotool"] || changes["gamepad"]){
			await manageContentScript(["videotool", "gamepad"], CONTENT_SCRIPTS.videotoolbar);
			const videotoolbarenabled = (changes["videotool"] && changes["videotool"].newValue === true) || (changes["gamepad"] && changes["gamepad"].newValue === true);
			if(videotoolbarenabled){
				// Inject script into existing tabs
				const tabs = await chrome.tabs.query({});
				for(const tab of tabs){
					if(tab.url && (tab.url.startsWith("http://") || tab.url.startsWith("https://"))){
						try{
							await chrome.scripting.executeScript({
								target: {tabId: tab.id},
								files: ["scripts/video-toolbar.js"]
							});
						}catch{
							// Ignore errors for tabs where script can't be injected
						}
					}
				}
			}
		}

		// Handle ambilight content script registration
		if(changes["ambilight"]){
			if(changes["ambilight"].newValue === true){
				manageContentScript("ambilight", CONTENT_SCRIPTS.atmosphere);
				// Inject script into existing tabs
				const tabs = await chrome.tabs.query({});
				for(const tab of tabs){
					if(tab.url && (tab.url.startsWith("http://") || tab.url.startsWith("https://"))){
						try{
							await chrome.scripting.executeScript({
								target: {tabId: tab.id},
								files: ["scripts/atmosphere.js"]
							});
						}catch{
							// Ignore errors for tabs where script can't be injected
						}
					}
				}
			}else{
				unregisterContentScript(SCRIPT_IDS.atmosphere);
				// Stop atmosphere in existing tabs
				chromerefreshalltabs("goenableatmos");
			}
		}
		if(changes["icon"]){
			if(changes["icon"].newValue){
				const allTabs = await chrome.tabs.query({});
				for(const tab of allTabs){
					chrome.action.setIcon({tabId : tab.id,
						path : {
							"19": changes["icon"].newValue,
							"38": changes["icon"].newValue
						}
					});
				}
			}
		}
		if(changes["ecosaver"]){
			if(changes["ecosaver"].newValue){
				chromerefreshalltabs("gorefresheyelight");
			}
		}

		var changenameautodim = ["autodim", "mousespotlights", "autodimDomains", "autodimchecklistwhite", "autodimchecklistblack", "autodimonly", "aplay", "apause", "astop", "autodimdelay", "autodimdelaytime", "autodimsize", "autodimsizepixelheight", "autodimsizepixelwidth"];
		if(changenameautodim.includes(key)){
			chromerefreshalltabs("gorefreshautodim");
		}

		var changenamevideotoolbar = ["videotool", "videotoolonly", "videotoolDomains", "videotoolchecklistwhite", "videotoolchecklistblack", "speedtoolbar", "videozoom", "visopacity", "videotoolcolor"];
		if(changenamevideotoolbar.includes(key)){
			chromerefreshalltabs("gorefreshvideotoolbar");
		}

		if(changes["videofilled"]){
			chromerefreshalltabs("gorefreshvideofilled");
		}

		// Handle mouse volume scroll content script registration
		if(changes["videovolume"]){
			if(changes["videovolume"].newValue === true){
				manageContentScript("videovolume", CONTENT_SCRIPTS.mousevolumescroll);
				// Inject script into existing tabs
				const tabs = await chrome.tabs.query({});
				for(const tab of tabs){
					if(tab.url && (tab.url.startsWith("http://") || tab.url.startsWith("https://"))){
						try{
							await chrome.scripting.executeScript({
								target: {tabId: tab.id},
								files: ["scripts/mouse-volume-scroll.js"]
							});
						}catch{
							// Ignore errors for tabs where script can't be injected
						}
					}
				}
			}else{
				unregisterContentScript(SCRIPT_IDS.mousevolumescroll);
				// Stop mouse volume scroll in existing tabs
				chromerefreshalltabs("gorefreshmousescroll");
			}
		}

		var changenamevolume = ["videovolumealt", "videovolumehold", "videovolumeposa", "videovolumeposb", "videovolumeposc", "videovolumecolor", "videovolumelabel", "videovolumesteps", "videovolumeonly", "videovolumeDomains", "videovolumechecklistwhite", "videovolumechecklistblack", "videovolumescrolla", "videovolumescrollb", "videovolumescrollc", "videovolumeposd", "videovolumepose"];
		if(changenamevolume.includes(key)){
			// Refresh existing tabs with the new settings
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

		var changenamenight = ["nighttheme", "lampandnightmode", "nightmodeswitchhide", "nightmodeswitchhidetime", "nightonly", "nightmodechecklistwhite", "nightmodechecklistblack", "nightDomains", "nightmodebydomain", "nightmodebypage", "nightactivetime", "nmbegintime", "nmendtime", "nightenabletheme", "nighthover", "nmtopleft", "nmtopright", "nmbottomright", "nmbottomleft", "nmcustom", "nightmodegesture", "nightmodeos", "nmautoclock", "nmautobegintime", "nmautoendtime", "nightmodeimage", "nightmodestandard", "nightmodepersonalized", "swnightmodeborder", "swnightmodebutton", "swnightmodehyperlink", "swnightmodebck", "swnightmodetxt", "nightskipcolor"];
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

		var changenameshake = ["mouseshake", "mouseshakesensitivity"];
		if(changenameshake.includes(key)){
			chromerefreshalltabs("gorefreshmouseshake");
		}

		// Handle screenshader feature changes
		if(changes["mousespotlights"] || changes["screenshader"]){
			const response = await chrome.storage.sync.get(["mousespotlights", "screenshader"]);
			if(response["mousespotlights"] === true && response["screenshader"] === true){
				// Inject screen-shader.js into all existing tabs
				const tabs = await chrome.tabs.query({});
				for(const tab of tabs){
					if(tab.url && (tab.url.match(/^http/i) || tab.url.match(/^file/i))){
						if(exbrowser != "safari"){
							chrome.scripting.executeScript({
								target: {tabId: tab.id},
								files: ["scripts/screen-shader.js"],
								injectImmediately: true
							}, () => void chrome.runtime.lastError);
						}else{
							chrome.scripting.executeScript({
								target: {tabId: tab.id},
								files: ["scripts/screen-shader.js"]
							}, () => void chrome.runtime.lastError);
						}
					}
				}
			}else{
				// Remove screenshader from all existing tabs
				chromerefreshalltabs("goclearscreenshader");
			}
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

async function chromerefreshalltabs(name){
	const tabs = await chrome.tabs.query({});
	var i, l = tabs.length;
	for(i = 0; i < l; i++){
		var protocol = tabs[i].url.split(":")[0];
		if(protocol == "http" || protocol == "https"){
			// chrome.tabs.sendMessage(tabs[i].id, {action: name});
			try{
				await chrome.tabs.sendMessage(tabs[i].id, {action: name});
				// Callback Function Processes
				// console.log(response);
			}catch{
				// Error Handling Processes
				// This will hide the message when the browser extension is reloaded and the chrome.runtime.onMessage.addListener is not connected with this browser extension
				// console.log(error);
			}
		}
	}
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
		async function(text){
			var onmniresult = text.toLowerCase();
			if(onmniresult == i18nomninightmode){
				omnidaynightmode(1);
			}else if(onmniresult == i18nomnidaymode){
				omnidaynightmode(0);
			}else if(onmniresult == i18nomnilightoff || onmniresult == i18nomnilighton){
				const thattab = await getCurrentTab();
				chrome.scripting.executeScript({
					target: {tabId: thattab.id},
					files: ["scripts/light.js"]
				});
			}else if(onmniresult == i18nomnihelp){
				const thattab = await getCurrentTab();
				chrome.tabs.update(thattab.id, {url: linksupport});
			}
		});
}

async function omnidaynightmode(a){
	var result = "";
	if(a == 0){ result = "day"; }else{ result = "night"; }
	const thattab = await getCurrentTab();
	chrome.tabs.sendMessage(thattab.id, {action: "goinnightmode", value:result});
}

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

		// Default dimmed layer color
		if(items.DefaultDimColor){ savinggroup["lightcolor"] = items.DefaultDimColor; }

		// Default opacity
		if(items.DefaultOpacity != null){ savinggroup["interval"] = items.DefaultOpacity; }

		// Night mode scope
		if(items.NightModeScope == "domainlist"){
			savinggroup["nightonly"] = true;
		}else if(items.NightModeScope == "all"){
			savinggroup["nightonly"] = false;
		}

		// Night mode filter type
		if(items.NightModeFilterType == "whitelist"){
			savinggroup["nightmodechecklistwhite"] = true;
			savinggroup["nightmodechecklistblack"] = false;
		}else if(items.NightModeFilterType == "blacklist"){
			savinggroup["nightmodechecklistwhite"] = false;
			savinggroup["nightmodechecklistblack"] = true;
		}

		// Night mode domain list
		if(items.NightModeDomainList){
			savinggroup["nightDomains"] = JSON.stringify(items.NightModeDomainList);
		}

		// Night mode engine
		if(items.NightModeEngine == "standard"){
			savinggroup["nightmodestandard"] = true;
			savinggroup["nightmodepersonalized"] = false;
		}else if(items.NightModeEngine == "personalized"){
			savinggroup["nightmodestandard"] = false;
			savinggroup["nightmodepersonalized"] = true;
		}

		// Night mode colors
		if(items.NightModeBackgroundColor){ savinggroup["nightmodebck"] = items.NightModeBackgroundColor; }
		if(items.NightModeTextColor){ savinggroup["nightmodetxt"] = items.NightModeTextColor; }
		if(items.NightModeHyperlinkColor){ savinggroup["nightmodehyperlink"] = items.NightModeHyperlinkColor; }
		if(items.NightModeButtonColor){ savinggroup["nightmodebutton"] = items.NightModeButtonColor; }
		if(items.NightModeBorderColor){ savinggroup["nightmodeborder"] = items.NightModeBorderColor; }

		// Eye protection
		setsavegroup(items.EyeProtection, "eyen");

		// Eye protection scope
		if(items.EyeProtectionScope == "all"){
			savinggroup["eyea"] = true;
			savinggroup["eyealist"] = false;
		}else if(items.EyeProtectionScope == "domainlist"){
			savinggroup["eyea"] = false;
			savinggroup["eyealist"] = true;
		}

		// Eye protection filter type
		if(items.EyeProtectionFilterType == "whitelist"){
			savinggroup["eyechecklistwhite"] = true;
			savinggroup["eyechecklistblack"] = false;
		}else if(items.EyeProtectionFilterType == "blacklist"){
			savinggroup["eyechecklistwhite"] = false;
			savinggroup["eyechecklistblack"] = true;
		}

		// Eye protection domain list
		if(items.EyeProtectionDomainList){
			savinggroup["excludedDomains"] = JSON.stringify(items.EyeProtectionDomainList);
		}

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

		// Default dimmed layer color
		if(changes["DefaultDimColor"]){
			updatesavinggroup["lightcolor"] = changes["DefaultDimColor"].newValue;
		}

		// Default opacity
		if(changes["DefaultOpacity"]){
			updatesavinggroup["interval"] = changes["DefaultOpacity"].newValue;
		}

		// Night mode scope
		if(changes["NightModeScope"]){
			if(changes["NightModeScope"].newValue == "domainlist"){
				updatesavinggroup["nightonly"] = true;
			}else{
				updatesavinggroup["nightonly"] = false;
			}
		}

		// Night mode filter type
		if(changes["NightModeFilterType"]){
			if(changes["NightModeFilterType"].newValue == "whitelist"){
				updatesavinggroup["nightmodechecklistwhite"] = true;
				updatesavinggroup["nightmodechecklistblack"] = false;
			}else{
				updatesavinggroup["nightmodechecklistwhite"] = false;
				updatesavinggroup["nightmodechecklistblack"] = true;
			}
		}

		// Night mode domain list
		if(changes["NightModeDomainList"]){
			updatesavinggroup["nightDomains"] = JSON.stringify(changes["NightModeDomainList"].newValue);
		}

		// Night mode engine
		if(changes["NightModeEngine"]){
			if(changes["NightModeEngine"].newValue == "standard"){
				updatesavinggroup["nightmodestandard"] = true;
				updatesavinggroup["nightmodepersonalized"] = false;
			}else{
				updatesavinggroup["nightmodestandard"] = false;
				updatesavinggroup["nightmodepersonalized"] = true;
			}
		}

		// Night mode colors
		if(changes["NightModeBackgroundColor"]){
			updatesavinggroup["nightmodebck"] = changes["NightModeBackgroundColor"].newValue;
		}
		if(changes["NightModeTextColor"]){
			updatesavinggroup["nightmodetxt"] = changes["NightModeTextColor"].newValue;
		}
		if(changes["NightModeHyperlinkColor"]){
			updatesavinggroup["nightmodehyperlink"] = changes["NightModeHyperlinkColor"].newValue;
		}
		if(changes["NightModeButtonColor"]){
			updatesavinggroup["nightmodebutton"] = changes["NightModeButtonColor"].newValue;
		}
		if(changes["NightModeBorderColor"]){
			updatesavinggroup["nightmodeborder"] = changes["NightModeBorderColor"].newValue;
		}

		// Eye protection
		if(changes["EyeProtection"]){
			updatesavinggroup["eyen"] = changes["EyeProtection"].newValue;
		}

		// Eye protection scope
		if(changes["EyeProtectionScope"]){
			if(changes["EyeProtectionScope"].newValue == "all"){
				updatesavinggroup["eyea"] = true;
				updatesavinggroup["eyealist"] = false;
			}else{
				updatesavinggroup["eyea"] = false;
				updatesavinggroup["eyealist"] = true;
			}
		}

		// Eye protection filter type
		if(changes["EyeProtectionFilterType"]){
			if(changes["EyeProtectionFilterType"].newValue == "whitelist"){
				updatesavinggroup["eyechecklistwhite"] = true;
				updatesavinggroup["eyechecklistblack"] = false;
			}else{
				updatesavinggroup["eyechecklistwhite"] = false;
				updatesavinggroup["eyechecklistblack"] = true;
			}
		}

		// Eye protection domain list
		if(changes["EyeProtectionDomainList"]){
			updatesavinggroup["excludedDomains"] = JSON.stringify(changes["EyeProtectionDomainList"].newValue);
		}

		// update save total group policy
		chrome.storage.sync.set(updatesavinggroup);
	});
}

function installation(){
	if(chrome.storage.managed && exbrowser != "firefox"){
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
	if(chrome.runtime.setUninstallURL){
		chrome.runtime.setUninstallURL(linkuninstall);
	}
});