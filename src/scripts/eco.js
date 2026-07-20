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

// date today
const d = new Date();
const today = `${String(d.getDate()).padStart(2,"0")}/${String(d.getMonth()+1).padStart(2,"0")}/${d.getFullYear()}`;
const targetId = "stefanvdlightareoff1";

let inDom = false;
let startTime = null;
let seeanalytics = true;

const getStore = (keys) => new Promise(r => chrome.storage.sync.get(keys, r));
const setStore = (obj) => new Promise(r => chrome.storage.sync.set(obj, r));

function newDayEntry(){
	return {name:today, details:{active:0, time:0, day:Object.fromEntries(Array.from({length:24}, (_,i) => [i, 0]))}};
}

async function saveTime(){
	if(!startTime) return;
	const elapsed = Math.round((Date.now() - startTime) / 1000);
	startTime = null;
	if(elapsed <= 0) return;
	try{
		const items = await getStore(["analytics", "siteengagement", "seeanalytics"]);
		seeanalytics = items.seeanalytics ?? true;
		if(!seeanalytics) return;
		const analytics = items.analytics;
		const siteengagement = items.siteengagement;
		if(!analytics || !siteengagement) return;
		const aEntry = analytics.find(i => i.name === today);
		if(aEntry) aEntry.details.time = (aEntry.details.time || 0) + elapsed;
		const sEntry = siteengagement.find(i => i.name === today);
		if(sEntry) sEntry[window.location.href] = (sEntry[window.location.href] || 0) + elapsed;
		await setStore({"analytics":analytics, "siteengagement":siteengagement});
	}catch{ /* Ignore */ }
}

async function trackActive(){
	try{
		const items = await getStore(["analytics", "seeanalytics"]);
		seeanalytics = items.seeanalytics ?? true;
		if(!seeanalytics){ lightObserver.disconnect(); return; }
		if(!items.analytics) return;
		const analytics = items.analytics;
		const entry = analytics.find(i => i.name === today);
		if(!entry) return;
		entry.details.active = (entry.details.active || 0) + 1;
		const h = new Date().getHours();
		entry.details.day[h] = (entry.details.day[h] || 0) + 1;
		await setStore({"analytics":analytics});
		chrome.runtime.sendMessage({name:"badgeon"});
	}catch(e){
		console.log(e);
	}
}

// Initialize today's entry
(async () => {
	try{
		const items = await getStore(["analytics", "siteengagement", "seeanalytics"]);
		seeanalytics = items.seeanalytics ?? true;
		if(!seeanalytics) return;
		if(items.analytics && items.siteengagement){
			const analytics = items.analytics;
			const siteengagement = items.siteengagement;
			if(!analytics.some(i => i.name === today)){
				analytics.push(newDayEntry());
				siteengagement.push({name:today});
				await setStore({"analytics":analytics, "siteengagement":siteengagement});
			}
			// Cleanup if storage is large
			// item limit in Google Chrome => 8192
			if(chrome.storage.sync.getBytesInUse){
				const bytes = await chrome.storage.sync.getBytesInUse(["analytics", "siteengagement"]);
				if(bytes >= 5000 && analytics.length > 7 && siteengagement.length > 7){
					await setStore({"analytics":analytics.slice(-7), "siteengagement":siteengagement.slice(-7)});
				}
			}
		}else{
			await setStore({"analytics":[newDayEntry()], "siteengagement":[{name:today}]});
		}
	}catch{ /* Ignore */ }
})();

// Debounced MutationObserver — avoids excessive getElementById calls on busy pages
let obsTimer;
const lightObserver = new MutationObserver(() => {
	clearTimeout(obsTimer);
	obsTimer = setTimeout(() => {
		const nowIn = !!document.getElementById(targetId);
		if(nowIn && !inDom){
			inDom = true;
			startTime = Date.now();
			trackActive();
		}else if(!nowIn && inDom){
			inDom = false;
			saveTime();
		}
	}, 50);
});
lightObserver.observe(document.body, {childList:true});

// Save time when tab is hidden, resume when visible
document.addEventListener("visibilitychange", () => {
	if(!inDom) return;
	if(document.visibilityState === "hidden"){
		saveTime();
	}else if(document.visibilityState === "visible"){
		startTime = Date.now();
	}
});

// Best-effort save on page hide
window.addEventListener("pagehide", () => {
	if(startTime) saveTime();
});