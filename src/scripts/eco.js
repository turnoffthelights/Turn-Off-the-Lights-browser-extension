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
var d = new Date();
var today = `${String(d.getDate()).padStart(2,"0")}/${String(d.getMonth()+1).padStart(2,"0")}/${d.getFullYear()}`;

function search(nameKey, myArray){
	var item = myArray.find((item) => item.name === nameKey);
	return item;
}

function autoanalyticscleanup(){
	// autoclean up to the last 7 days
	if(analytics.length > 7 && siteengagement.length > 7){
		chrome.storage.sync.set({"analytics":analytics.slice(-7), "siteengagement":siteengagement.slice(-7)});
	}
}

function logbytesanalytics(bytes){
	// cleanup the big files
	// item limit in Google Chrome => 8192
	if(bytes >= 5000){
		autoanalyticscleanup();
	}
}

var analytics;
var siteengagement;
var seeanalytics;
var emptyarray = [{name:today, details:{active:0, time:0, day:{0:0, 1:0, 2:0, 3:0, 4:0, 5:0, 6:0, 7:0, 8:0, 9:0, 10:0, 11:0, 12:0, 13:0, 14:0, 15:0, 16:0, 17:0, 18:0, 19:0, 20:0, 21:0, 22:0, 23:0}}}];
var todaysite = [{name:today}];
chrome.storage.sync.get(["analytics", "siteengagement", "seeanalytics"], function(items){
	seeanalytics = items["seeanalytics"]; if(seeanalytics == null)seeanalytics = true;
	if(seeanalytics == true){
		if(items["analytics"] && items["siteengagement"]){
			analytics = items["analytics"];
			siteengagement = items["siteengagement"];

			chrome.storage.sync.getBytesInUse(["analytics"], logbytesanalytics);
			chrome.storage.sync.getBytesInUse(["siteengagement"], logbytesanalytics);
			chrome.storage.sync.set({"analytics":analytics.concat(emptyarray), "siteengagement":siteengagement.concat(todaysite)}, function(){
				if(chrome.runtime.lastError == "QUOTA_BYTES" || chrome.runtime.lastError == "QUOTA_BYTES_PER_ITEM" || chrome.runtime.lastError == "MAX_ITEMS"){
					autoanalyticscleanup();
				}
			});
		}else{
			// if empty, create this empty day
			chrome.storage.sync.set({"analytics":emptyarray, "siteengagement":todaysite});
		}
	}
});

function setTime(){
	if(document.visibilityState === "visible"){
		++totalSeconds;
	}
}

var in_dom = false;
var totalSeconds = 0;
var refreshIntervalId;
var currentseconds;

function endlayer(){
	try{
		chrome.storage.sync.get(["analytics", "siteengagement", "seeanalytics"], function(items){
			seeanalytics = items["seeanalytics"]; if(seeanalytics == null)seeanalytics = true;
			if(seeanalytics == true){
				window.clearInterval(refreshIntervalId);
				analytics = items["analytics"];
				resultObject = search(today, analytics);
				currentseconds = resultObject.details.time || 0; currentseconds += totalSeconds;
				resultObject["details"]["time"] = currentseconds;
				siteengagement = items["siteengagement"];
				resultObject = search(today, siteengagement);
				var mes = resultObject[window.location.href] || 0;
				mes += totalSeconds;
				if(mes > 0){
					resultObject[window.location.href] = mes;
					chrome.storage.sync.set({"analytics":analytics, "siteengagement":siteengagement});
				}else{
					chrome.storage.sync.set({"analytics":analytics});
				}
				totalSeconds = 0;
			}
		});
	}catch{
		// Ignore errors
	}
}

var resultObject;
var targetId = "stefanvdlightareoff1";
var lightObserver = new MutationObserver(function(){
	var nowIn = !!document.getElementById(targetId);
	if(nowIn && !in_dom){
		in_dom = true;
		try{
			chrome.storage.sync.get(["analytics", "seeanalytics"], function(items){
				seeanalytics = items["seeanalytics"]; if(seeanalytics == null)seeanalytics = true;
				if(seeanalytics == true){
					if(items["analytics"]){
						analytics = items["analytics"];
						resultObject = search(today, analytics);
						var currentnumber = resultObject["details"]["active"] || 0;
						currentnumber += 1;
						resultObject["details"]["active"] = currentnumber;
						// what hour the light are off
						var n = new Date().getHours();
						var timenumber = resultObject["details"]["day"][n] || 0;
						timenumber += 1;
						resultObject["details"]["day"][n] = timenumber;
						// save
						chrome.storage.sync.set({"analytics":analytics}, function(){
							chrome.runtime.sendMessage({name: "badgeon"});
						});
						startcount();
					}
				}else{
					lightObserver.disconnect();
				}
			});
		}catch(e){
			console.log(e);
		}
	}
	if(!nowIn && in_dom){
		in_dom = false;
		endlayer();
	}
});
lightObserver.observe(document.body, {childList:true});

function startcount(){
	refreshIntervalId = window.setInterval(setTime, 1000);
}

// Event listener for visibility change
document.addEventListener("visibilitychange", function(){
	if(in_dom == true){
		if(document.visibilityState === "hidden"){
			endlayer();
		}else if(document.visibilityState === "visible"){
			refreshIntervalId = null;
			totalSeconds = 0;
			currentseconds = null;
			startcount();
		}
	}
});

// Clear interval on page unload to prevent memory leaks
window.addEventListener("beforeunload", function(){
	if(refreshIntervalId){
		window.clearInterval(refreshIntervalId);
		refreshIntervalId = null;
	}
});