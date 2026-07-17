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
var gamepad = null;
var gpleftstick = null;
var gprightstick = null;
var gpbtnx = null;
var gpbtno = null;
var gpbtnsquare = null;
var gpbtntriangle = null;
var gpbtnlb = null;
var gpbtnrb = null;
var gpbtnlt = null;
var gpbtnrt = null;
var gpbtnshare = null;
var gpbtnmenu = null;
var gpbtnrightstick = null;
var gpbtnleftstick = null;
var gpbtndirup = null;
var gpbtndirdown = null;
var gpbtndirleft = null;
var gpbtndirright = null;
var gpbtnlogo = null;
var gamepadonly = null;
var gamepadDomains = null;
var gamepadchecklistwhite = null;
var gamepadchecklistblack = null;

var buttonsstate = [];
var logoclicked = false;

var i18ntitelgpconnect = chrome.i18n.getMessage("titelgpconnect");
var i18ntitelgpdisconnect = chrome.i18n.getMessage("titelgpdisconnect");

function rungamepadcheck(){
	window.checkDomainFeature(gamepad == true, gamepadDomains, gamepadchecklistwhite, gamepadchecklistblack, gamepadonly, gamepadfunction);
}

function gamepadfunction(){
	// control the current video with your remote gamepad controller
	window.addEventListener("gamepadconnected", gpstartconnnected);
	window.addEventListener("gamepaddisconnected", gpdisconnected);
}

function gpstartconnnected(e){
	// console.log("Gamepad connected at index %d: %s. %d buttons, %d axes.", e.gamepad.index, e.gamepad.id, e.gamepad.buttons.length, e.gamepad.axes.length);
	updategamepadbuttons();
	updategamepadaxes();
	var devicename = e.gamepad.id; statusremotebadge(devicename, "add");
}

function gpdisconnected(e){
	// console.log("Gamepad disconnected from index %d: %s", e.gamepad.index, e.gamepad.id);
	var devicename = e.gamepad.id; statusremotebadge(devicename, "dis");
	window.cancelAnimationFrame(updategamepadbuttons);
	window.cancelAnimationFrame(updategamepadaxes);
}

function actionlogo(){
	if(logoclicked == false){
		logoclicked = true;
		window.setTimeout(function(){
			window.open(linkgamepad, "_blank");
			logoclicked = false;
		}, 2500);
	}
}

function actiongamepad(n){
	switch(parseInt(n)){
	case 0:
		window.changevolume("-");
		break;
	case 1:
		window.playnext();
		break;
	case 2:
		window.playprev();
		break;
	case 3:
		window.changevolume("+");
		break;
	case 4:
		window.seek(-1);
		break;
	case 5:
		window.seek(1);
		break;
	case 6:
		window.seek(-3);
		break;
	case 7:
		window.seek(3);
		break;
	case 8:
		window.exitzoom(0);
		break;
	case 9:
		gamepadplaypause();
		break;
	case 10:
		window.resetzoom(0);
		break;
	case 11:
		window.zoompaddirection(0, [1, 0, 0, 0]);
		break;
	case 12:
		window.zoompaddirection(0, [0, 0, 1, 0]);
		break;
	case 13:
		window.zoompaddirection(0, [0, 1, 0, 0]);
		break;
	case 14:
		window.zoompaddirection(0, [0, 0, 0, 1]);
		break;
	case 15:
		actionlogo();
		break;
	case 16:
		window.seek(-10);
		break;
	case 17:
		window.seek(10);
		break;
	}
}

const updategamepadbuttons = () => {
	const gamepads = navigator.getGamepads();
	let myGamepad = null;
	// Find the first connected gamepad (might not be at index 0)
	for(let i = 0; i < gamepads.length; i++){
		if(gamepads[i]){
			myGamepad = gamepads[i];
			// console.log("Found gamepad at index:", i);
			break;
		}
	}
	// console.log("updategamepadbuttons called, myGamepad:", myGamepad ? "connected" : "null");
	if(myGamepad){
		myGamepad.buttons.forEach((button, index) => {
			// pressed => one action
			if(index == 16){
				// PlayStation Logo
				if(button.pressed && buttonsstate[index] != true){
					// console.log("Click 16 on pressed:", button.pressed, "arry set on:", buttonsstate[index]);
					buttonsstate[index] = true;
					// set delay to prevent double openening new tab when open this on the other web browser tab
					actiongamepad(gpbtnlogo);
				}
			}

			if(button.pressed){
				// console.log(`Button ${index} pressed, current state:`, buttonsstate[index], "pressed:", button.pressed);
				if(buttonsstate[index] != true){
					buttonsstate[index] = true;
					// console.log(`Pressed button ${index}`, "on status=",button.pressed, "compare with=",buttonsstate[index]);
					var video = document.getElementsByTagName("video")[0];
					// console.log(`Video element found:`, video ? "yes" : "no");
					if(video){
						// playstation
						switch(index){
						case 0:
							// X
							actiongamepad(gpbtnx);
							break;
						case 1:
							// O
							actiongamepad(gpbtno);
							break;
						case 2:
							// Square
							actiongamepad(gpbtnsquare);
							break;
						case 3:
							// Triangle
							actiongamepad(gpbtntriangle);
							break;
						case 4:
							// L1
							actiongamepad(gpbtnlb);
							break;
						case 5:
							// R1
							actiongamepad(gpbtnrb);
							break;
						case 6:
							// L2
							actiongamepad(gpbtnlt);
							break;
						case 7:
							// R2
							actiongamepad(gpbtnrt);
							break;
						case 8:
							// Share
							actiongamepad(gpbtnshare);
							break;
						case 9:
							// Options
							actiongamepad(gpbtnmenu);
							break;
						case 10:
							// Left Stick Pressed
							actiongamepad(gpbtnleftstick);
							break;
						case 11:
							// Right Stick Pressed
							actiongamepad(gpbtnrightstick);
							break;
						}
					}
				}

				// pressed => continue actions loop
				if(document.getElementsByTagName("video")[0]){
					if(index == 12){
						// Directional Up
						actiongamepad(gpbtndirup);
					}else if(index == 13){
						// Directional Down
						actiongamepad(gpbtndirdown);
					}else if(index == 14){
						// Directional Left
						actiongamepad(gpbtndirleft);
					}else if(index == 15){
						// Directional Right
						actiongamepad(gpbtndirright);
					}
				}
			}else{
				// console.log("NOT pressed anymore",index, "status=",button.pressed, "resetting state to false");
				buttonsstate[index] = false;
			}
		});
	}
	window.requestAnimationFrame(updategamepadbuttons);
};

function actionzoominout(myGamepad, a){
	var currentaxesleft = Number(myGamepad.axes[a]).toFixed(1);

	if(currentaxesleft > 0.1){
		window.camerazoomrotate(0, -0.05, "");
	}else if(Math.abs(currentaxesleft) == 0.0){
		// do nothing
	}else if(currentaxesleft < -0.1){
		window.camerazoomrotate(0, +0.05, "");
	}
}

function actionzoompad(myGamepad, a, b){
	var currentaxesrighthoz = Number(myGamepad.axes[a]).toFixed(1);
	if(currentaxesrighthoz > 0.1){
		window.zoompaddirection(0, [0, 0, 0, 1]);
	}else if(Math.abs(currentaxesrighthoz) == 0.0){
		// do nothing
	}else if(currentaxesrighthoz < -0.1){
		window.zoompaddirection(0, [0, 1, 0, 0]);
	}

	var currentaxesrightvert = Number(myGamepad.axes[b]).toFixed(1);
	if(currentaxesrightvert > 0.1){
		window.zoompaddirection(0, [0, 0, 1, 0]);
	}else if(Math.abs(currentaxesrightvert) == 0.0){
		// do nothing
	}else if(currentaxesrightvert < -0.1){
		window.zoompaddirection(0, [1, 0, 0, 0]);
	}
}

const updategamepadaxes = () => {
	if(document.getElementsByTagName("video")[0]){
		const gamepads = navigator.getGamepads();
		let myGamepad = null;
		// Find the first connected gamepad (might not be at index 0)
		for(let i = 0; i < gamepads.length; i++){
			if(gamepads[i]){
				myGamepad = gamepads[i];
				break;
			}
		}
		// console.log(`Left stick at (${myGamepad.axes[0]}, ${myGamepad.axes[1]})` );
		// console.log(`Right stick at (${myGamepad.axes[2]}, ${myGamepad.axes[3]})` );
		if(myGamepad != null){
			// left stick
			if(gpleftstick == 0){
				actionzoominout(myGamepad, 1);
			}else if(gpleftstick == 1){
				actionzoompad(myGamepad, 0, 1);
			}

			// right stick
			if(gprightstick == 0){
				actionzoominout(myGamepad, 3);
			}else if(gprightstick == 1){
				actionzoompad(myGamepad, 2, 3);
			}
		}
	}
	window.requestAnimationFrame(updategamepadaxes);
};

function shortname(name){
	var shortname;
	if(name.includes("PLAYSTATION")){
		shortname = "PlayStation Controller";
	}else if(name.includes("Xbox")){
		shortname = "Xbox Controller";
	}else{
		shortname = "Game Controller";
	}
	return shortname;
}

function statusremotebadge(name, status){
	var div = document.createElement("div");
	div.setAttribute("id", "stefanvdremoteadd");
	div.className = "stefanvdremote";
	document.body.appendChild(div);

	var h3 = document.createElement("h3");
	h3.innerText = shortname(name);
	div.appendChild(h3);

	var p = document.createElement("p");
	if(status == "add"){
		p.innerText = i18ntitelgpconnect;
	}else{
		p.innerText = i18ntitelgpdisconnect;
	}
	div.appendChild(p);

	window.setTimeout(function(){
		var element = document.getElementById("stefanvdremoteadd");
		element.parentNode.removeChild(element);
	}, 4000);
}


function gamepadplaypause(){
	var videoPlayer = document.getElementsByTagName("video")[0];
	if(videoPlayer){
		if(videoPlayer.paused == true){
			videoPlayer.play();
		}else{
			videoPlayer.pause();
		}
	}
}

// Listen for settings changes from options page (register immediately)
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse){
	if(request.action === "gorefreshgamepad"){
		chrome.storage.sync.get(["gamepad", "gpleftstick", "gprightstick", "gpbtnx", "gpbtno", "gpbtnsquare", "gpbtntriangle", "gpbtnlb", "gpbtnrb", "gpbtnlt", "gpbtnrt", "gpbtnshare", "gpbtnmenu", "gpbtnrightstick", "gpbtnleftstick", "gpbtndirup", "gpbtndirdown", "gpbtndirleft", "gpbtndirright", "gpbtnlogo", "gamepadonly", "gamepadDomains", "gamepadchecklistwhite", "gamepadchecklistblack"], function(items){
			gamepad = items["gamepad"];
			gpleftstick = items["gpleftstick"];
			gprightstick = items["gprightstick"];
			gpbtnx = items["gpbtnx"];
			gpbtno = items["gpbtno"];
			gpbtnsquare = items["gpbtnsquare"];
			gpbtntriangle = items["gpbtntriangle"];
			gpbtnlb = items["gpbtnlb"];
			gpbtnrb = items["gpbtnrb"];
			gpbtnlt = items["gpbtnlt"];
			gpbtnrt = items["gpbtnrt"];
			gpbtnshare = items["gpbtnshare"];
			gpbtnmenu = items["gpbtnmenu"];
			gpbtnrightstick = items["gpbtnrightstick"];
			gpbtnleftstick = items["gpbtnleftstick"];
			gpbtndirup = items["gpbtndirup"];
			gpbtndirdown = items["gpbtndirdown"];
			gpbtndirleft = items["gpbtndirleft"];
			gpbtndirright = items["gpbtndirright"];
			gpbtnlogo = items["gpbtnlogo"];
			gamepadonly = items["gamepadonly"];
			gamepadDomains = items["gamepadDomains"];
			gamepadchecklistwhite = items["gamepadchecklistwhite"];
			gamepadchecklistblack = items["gamepadchecklistblack"];

			window.cancelAnimationFrame(updategamepadbuttons);
			window.cancelAnimationFrame(updategamepadaxes);
			window.removeEventListener("gamepadconnected", gpstartconnnected);
			window.removeEventListener("gamepaddisconnected", gpdisconnected);

			if(gamepad == true){
				rungamepadcheck();
			}
		});
	}
});

// Load settings and start
chrome.storage.sync.get(["gamepad", "gpleftstick", "gprightstick", "gpbtnx", "gpbtno", "gpbtnsquare", "gpbtntriangle", "gpbtnlb", "gpbtnrb", "gpbtnlt", "gpbtnrt", "gpbtnshare", "gpbtnmenu", "gpbtnrightstick", "gpbtnleftstick", "gpbtndirup", "gpbtndirdown", "gpbtndirleft", "gpbtndirright", "gpbtnlogo", "gamepadonly", "gamepadDomains", "gamepadchecklistwhite", "gamepadchecklistblack"], function(items){
	gamepad = items["gamepad"];
	gpleftstick = items["gpleftstick"]; if(gpleftstick == null)gpleftstick = 0;
	gprightstick = items["gprightstick"]; if(gprightstick == null)gprightstick = 1;
	gpbtnx = items["gpbtnx"]; if(gpbtnx == null)gpbtnx = 0;
	gpbtno = items["gpbtno"]; if(gpbtno == null)gpbtno = 1;
	gpbtnsquare = items["gpbtnsquare"]; if(gpbtnsquare == null)gpbtnsquare = 2;
	gpbtntriangle = items["gpbtntriangle"]; if(gpbtntriangle == null)gpbtntriangle = 3;
	gpbtnlb = items["gpbtnlb"]; if(gpbtnlb == null)gpbtnlb = 4;
	gpbtnrb = items["gpbtnrb"]; if(gpbtnrb == null)gpbtnrb = 5;
	gpbtnlt = items["gpbtnlt"]; if(gpbtnlt == null)gpbtnlt = 6;
	gpbtnrt = items["gpbtnrt"]; if(gpbtnrt == null)gpbtnrt = 7;
	gpbtnshare = items["gpbtnshare"]; if(gpbtnshare == null)gpbtnshare = 8;
	gpbtnmenu = items["gpbtnmenu"]; if(gpbtnmenu == null)gpbtnmenu = 9;
	gpbtnrightstick = items["gpbtnrightstick"]; if(gpbtnrightstick == null)gpbtnrightstick = 10;
	gpbtnleftstick = items["gpbtnleftstick"]; if(gpbtnleftstick == null)gpbtnleftstick = 10;
	gpbtndirup = items["gpbtndirup"]; if(gpbtndirup == null)gpbtndirup = 11;
	gpbtndirdown = items["gpbtndirdown"]; if(gpbtndirdown == null)gpbtndirdown = 12;
	gpbtndirleft = items["gpbtndirleft"]; if(gpbtndirleft == null)gpbtndirleft = 13;
	gpbtndirright = items["gpbtndirright"]; if(gpbtndirright == null)gpbtndirright = 14;
	gpbtnlogo = items["gpbtnlogo"]; if(gpbtnlogo == null)gpbtnlogo = 15;
	gamepadonly = items["gamepadonly"];
	gamepadDomains = items["gamepadDomains"];
	gamepadchecklistwhite = items["gamepadchecklistwhite"];
	gamepadchecklistblack = items["gamepadchecklistblack"];

	rungamepadcheck();
});
