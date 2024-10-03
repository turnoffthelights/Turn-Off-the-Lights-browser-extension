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

const src = new URL(document.currentScript.src);
const maxquality = src.searchParams.get("maxquality");
// https://developers.google.com/youtube/iframe_api_reference?csw=1#setPlaybackQuality
// one of "highres", "hd4320", "hd2880", "hd1080", "hd2160", "hd1440", "hd1080", "hd720", "large", "medium", "small", "tiny" or "default" to let YouTube pick
const mplayer = document.getElementById("movie_player") || document.querySelector(".ytp-embed");

function setQuality(quality){
	if(mplayer.setPlaybackQualityRange !== undefined){
		mplayer.setPlaybackQualityRange(quality, quality);
	}
	mplayer.setPlaybackQuality(quality);
}

function updateQuality(){
	var aq = mplayer.getAvailableQualityLevels();
	if(aq.indexOf(maxquality) == -1){
		// console.log("Set to highest available level: " + aq[0]);
		setQuality(aq[0]);
	}else{
		// console.log("Set to " + maxquality + " in accordance with user settings");
		setQuality(maxquality);
	}
}

updateQuality();