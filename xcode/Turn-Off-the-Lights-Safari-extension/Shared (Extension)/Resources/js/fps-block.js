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

(function(){
	function mimetype(origtype){
		return function(type){
			if(type === undefined)return"";
			var fps = /framerate=(\d+)/.exec(type);
			if(fps && fps[1] > 30)return"";
			return origtype(type);
		};
	}

	var videoplayer = document.createElement("video");
	var origvideotype = videoplayer.canPlayType.bind(videoplayer);
	videoplayer.__proto__.canPlayType = mimetype(origvideotype);

	var mse = window.MediaSource;
	if(mse === undefined)return;
	var origmsetype = mse.isTypeSupported.bind(mse);
	mse.isTypeSupported = mimetype(origmsetype);
})();