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

function isKeyInObject(obj, key){
	var res = Object.keys(obj).some((v) => v == key);
	return res;
}

function setnewtable(a, b, c){
	var value = parseFloat(Math.round(c[b] / 60 * 100) / 100).toFixed(2);
	var app = isKeyInObject(a, b);
	if(app == true){
		var currentnumber = parseInt(a[b]);
		currentnumber += parseFloat(value);
		var rest = currentnumber;
		a[b] = rest;
	}else{
		a[b] = value;
	}
}

// http://data.iana.org/TLD/tlds-alpha-by-domain.txt
var TLDs = ["ac", "ad", "ae", "aero", "af", "ag", "ai", "al", "am", "an", "ao", "app", "aq", "ar", "arpa", "as", "asia", "at", "au", "aw", "ax", "az", "ba", "bb", "bd", "be", "bf", "bg", "bh", "bi", "biz", "bj", "bm", "bn", "bo", "br", "bs", "bt", "bv", "bw", "by", "bz", "ca", "cat", "cc", "cd", "cf", "cg", "ch", "ci", "ck", "cl", "cm", "cn", "co", "com", "coop", "cr", "cu", "cv", "cx", "cy", "cz", "de", "dj", "dk", "dm", "do", "dz", "ec", "edu", "ee", "eg", "er", "es", "et", "eu", "fi", "fj", "fk", "fm", "fo", "fr", "ga", "gb", "gd", "ge", "gf", "gg", "gh", "gi", "gl", "gm", "gn", "gov", "gp", "gq", "gr", "gs", "gt", "gu", "gw", "gy", "hk", "hm", "hn", "hr", "ht", "hu", "id", "ie", "il", "im", "in", "info", "int", "io", "iq", "ir", "is", "it", "je", "jm", "jo", "jobs", "jp", "ke", "kg", "kh", "ki", "km", "kn", "kp", "kr", "kw", "ky", "kz", "la", "lb", "lc", "li", "lk", "lr", "ls", "lt", "lu", "lv", "ly", "ma", "mc", "md", "me", "mg", "mh", "mil", "mk", "ml", "mm", "mn", "mo", "mobi", "mp", "mq", "mr", "ms", "mt", "mu", "museum", "mv", "mw", "mx", "my", "mz", "na", "name", "nc", "ne", "net", "nf", "ng", "ni", "nl", "no", "np", "nr", "nu", "nz", "om", "org", "pa", "pe", "pf", "pg", "ph", "pk", "pl", "pm", "pn", "pr", "pro", "ps", "pt", "pw", "py", "qa", "re", "ro", "rs", "ru", "rw", "sa", "sb", "sc", "sd", "se", "sg", "sh", "si", "sj", "sk", "sl", "sm", "sn", "so", "sr", "st", "su", "sv", "sy", "sz", "tc", "td", "tel", "tf", "tg", "th", "tj", "tk", "tl", "tm", "tn", "to", "tp", "tr", "travel", "tt", "tv", "tw", "tz", "ua", "ug", "uk", "us", "uy", "uz", "va", "vc", "ve", "vg", "vi", "video", "vn", "vu", "wf", "ws", "xn--0zwm56d", "xn--11b5bs3a9aj6g", "xn--3e0b707e", "xn--45brj9c", "xn--80akhbyknj4f", "xn--90a3ac", "xn--9t4b11yi5a", "xn--clchc0ea0b2g2a9gcd", "xn--deba0ad", "xn--fiqs8s", "xn--fiqz9s", "xn--fpcrj9c3d", "xn--fzc2c9e2c", "xn--g6w251d", "xn--gecrj9c", "xn--h2brj9c", "xn--hgbk6aj7f53bba", "xn--hlcj6aya9esc7a", "xn--j6w193g", "xn--jxalpdlp", "xn--kgbechtv", "xn--kprw13d", "xn--kpry57d", "xn--lgbbat1ad8j", "xn--mgbaam7a8h", "xn--mgbayh7gpa", "xn--mgbbh1a71e", "xn--mgbc0a9azcg", "xn--mgberp4a5d4ar", "xn--o3cw4h", "xn--ogbpf8fl", "xn--p1ai", "xn--pgbs0dh", "xn--s9brj9c", "xn--wgbh1c", "xn--wgbl6a", "xn--xkc2al3hye2a", "xn--xkc2dl3a5ee0h", "xn--yfro4i67o", "xn--ygbi2ammx", "xn--zckzah", "xxx", "ye", "yt", "za", "zm", "zw"].join();

// Begin chart drawing functions
function createTooltip(){
	let tooltip = document.getElementById("chart-tooltip");
	if(!tooltip){
		tooltip = document.createElement("div");
		tooltip.id = "chart-tooltip";
		tooltip.style.position = "fixed";
		tooltip.style.background = "rgba(0, 0, 0, 0.8)";
		tooltip.style.color = "white";
		tooltip.style.padding = "5px 10px";
		tooltip.style.borderRadius = "4px";
		tooltip.style.fontSize = "12px";
		tooltip.style.pointerEvents = "none";
		tooltip.style.zIndex = "1000";
		tooltip.style.display = "none";
		document.body.appendChild(tooltip);
	}
	return tooltip;
}

function showTooltip(text, x, y){
	const tooltip = createTooltip();
	tooltip.textContent = text;
	tooltip.style.left = (x + 10) + "px";
	tooltip.style.top = (y - 10) + "px";
	tooltip.style.display = "block";
}

function hideTooltip(){
	const tooltip = document.getElementById("chart-tooltip");
	if(tooltip){
		tooltip.style.display = "none";
	}
}

function drawLineChart(canvas, labels, datasets){
	// Make canvas responsive
	const container = canvas.parentElement;
	const containerWidth = container.clientWidth;
	const containerHeight = container.clientHeight;

	canvas.width = containerWidth > 0 ? containerWidth : 942;
	canvas.height = containerHeight > 0 ? containerHeight : 440;
	canvas.style.width = "100%";
	canvas.style.height = "100%";

	const ctx = canvas.getContext("2d");
	const width = canvas.width;
	const height = canvas.height;
	const padding = 60;
	const chartTop = 40;
	const chartWidth = width - 2 * padding;
	const chartHeight = height - chartTop - padding;

	// Find max values
	let maxY = 0;
	datasets.forEach((dataset) => {
		dataset.data.forEach((val) => {
			if(val > maxY) maxY = val;
		});
	});
	if(maxY === 0) maxY = 1;

	function drawChart(highlightPoint = null){
		// Clear canvas
		ctx.clearRect(0, 0, width, height);

		// Draw grid and labels first
		ctx.strokeStyle = "#ddd";
		ctx.lineWidth = 1;
		ctx.fillStyle = "#333";
		ctx.font = "12px Arial";

		// Y axis grid lines and labels
		for(let i = 0; i <= 5; i++){
			const y = chartTop + (chartHeight - (i * chartHeight / 5));
			// Horizontal grid line
			ctx.beginPath();
			ctx.moveTo(padding, y);
			ctx.lineTo(width - padding, y);
			ctx.stroke();
			// Y axis tick
			ctx.beginPath();
			ctx.moveTo(padding - 5, y);
			ctx.lineTo(padding + 5, y);
			ctx.stroke();
			ctx.fillText((maxY * i / 5).toFixed(1), padding - 40, y + 4);
		}

		// X axis grid lines and labels (show more labels)
		const maxLabels = Math.min(labels.length, 15); // Show up to 15 labels
		const step = Math.max(1, Math.floor(labels.length / maxLabels));
		for(let i = 0; i < labels.length; i += step){
			const x = padding + (i * chartWidth / (labels.length - 1));
			// Vertical grid line
			ctx.beginPath();
			ctx.moveTo(x, chartTop);
			ctx.lineTo(x, height - padding);
			ctx.stroke();
			// X axis tick
			ctx.beginPath();
			ctx.moveTo(x, height - padding - 5);
			ctx.lineTo(x, height - padding + 5);
			ctx.stroke();
			// Label
			ctx.save();
			ctx.translate(x - 5, height - padding + 20);
			// ctx.rotate(-Math.PI / 8);
			ctx.fillText(labels[i], 0, 0);
			ctx.restore();
		}

		// Draw axes on top
		ctx.strokeStyle = "#333";
		ctx.lineWidth = 2;
		ctx.beginPath();
		ctx.moveTo(padding, chartTop);
		ctx.lineTo(padding, height - padding);
		ctx.lineTo(width - padding, height - padding);
		ctx.stroke();

		// Draw datasets lines
		datasets.forEach((dataset) => {
			ctx.strokeStyle = dataset.borderColor || "#000";
			ctx.lineWidth = dataset.borderWidth || 2;
			ctx.beginPath();
			dataset.data.forEach((val, i) => {
				const x = padding + (i * chartWidth / (dataset.data.length - 1));
				const y = chartTop + chartHeight - (val * chartHeight / maxY);
				if(i === 0){
					ctx.moveTo(x, y);
				}else{
					ctx.lineTo(x, y);
				}
			});
			ctx.stroke();
		});

		// Draw points
		datasets.forEach((dataset) => {
			ctx.fillStyle = dataset.borderColor || "#000";
			dataset.data.forEach((val, i) => {
				const x = padding + (i * chartWidth / (dataset.data.length - 1));
				const y = chartTop + chartHeight - (val * chartHeight / maxY);
				const isHighlight = highlightPoint && highlightPoint.x === x && highlightPoint.y === y;
				ctx.beginPath();
				ctx.arc(x, y, isHighlight ? 6 : 4, 0, 2 * Math.PI);
				ctx.fill();
				if(isHighlight){
					ctx.strokeStyle = "#fff";
					ctx.lineWidth = 2;
					ctx.stroke();
				}
			});
		});

		// Draw legend
		const legendY = 10;
		let legendX = padding;
		datasets.forEach((dataset, index) => {
			// Draw color box
			ctx.fillStyle = dataset.borderColor || "#000";
			ctx.fillRect(legendX, legendY, 15, 15);
			// Draw label
			ctx.fillStyle = "#333";
			ctx.font = "12px Arial";
			const labelText = dataset.label || `Dataset ${index + 1}`;
			ctx.fillText(labelText, legendX + 20, legendY + 12);
			// Calculate text width and add padding
			const textWidth = ctx.measureText(labelText).width;
			legendX += 25 + textWidth + 20; // 15 (box) + 10 (padding) + textWidth + 20 (spacing)
		});
	}

	// Draw chart initially
	drawChart();

	// Add tooltip functionality
	canvas.addEventListener("mousemove", function(e){
		const rect = canvas.getBoundingClientRect();
		const mouseX = e.clientX - rect.left;
		const mouseY = e.clientY - rect.top;

		let closestPoint = null;
		let minDistance = Infinity;
		let tooltipText = "";

		datasets.forEach((dataset) => {
			dataset.data.forEach((val, i) => {
				const x = padding + (i * chartWidth / (dataset.data.length - 1));
				const y = chartTop + chartHeight - (val * chartHeight / maxY);
				const distance = Math.sqrt((mouseX - x) ** 2 + (mouseY - y) ** 2);
				if(distance < minDistance && distance < 10){ // 10px threshold for points
					minDistance = distance;
					closestPoint = {x, y};
					tooltipText = `${labels[i]}: ${val}`;
				}
			});
		});

		if(closestPoint){
			drawChart(closestPoint);
			showTooltip(tooltipText, e.clientX, e.clientY);
		}else{
			drawChart();
			hideTooltip();
		}
	});

	canvas.addEventListener("mouseleave", function(){
		drawChart();
		hideTooltip();
	});
}

function drawDoughnutChart(canvas, labels, data, colors, title){
	// Make canvas responsive
	const container = canvas.parentElement;
	const containerWidth = container.clientWidth;
	const containerHeight = container.clientHeight;

	canvas.width = containerWidth > 0 ? containerWidth : 400;
	canvas.height = containerHeight > 0 ? containerHeight : 300;
	canvas.style.width = "100%";
	canvas.style.height = "100%";

	const ctx = canvas.getContext("2d");
	const width = canvas.width;
	const height = canvas.height;
	const centerX = width / 2;
	const centerY = height / 2;
	const radius = Math.min(width, height) / 2 - 40;
	const innerRadius = radius * 0.6;

	// Clear canvas
	ctx.clearRect(0, 0, width, height);

	// Draw title
	if(title){
		ctx.fillStyle = "#333";
		ctx.font = "16px Arial";
		ctx.textAlign = "center";
		ctx.fillText(title, centerX, 30);
	}

	let total = data.reduce((sum, val) => sum + val, 0);
	if(total === 0)return;

	let startAngle = -Math.PI / 2;
	data.forEach((val, i) => {
		const sliceAngle = (val / total) * 2 * Math.PI;
		const endAngle = startAngle + sliceAngle;

		// Draw outer arc
		ctx.beginPath();
		ctx.arc(centerX, centerY, radius, startAngle, endAngle);
		ctx.arc(centerX, centerY, innerRadius, endAngle, startAngle, true);
		ctx.closePath();
		ctx.fillStyle = colors[i % colors.length];
		ctx.fill();
		ctx.strokeStyle = "#fff";
		ctx.lineWidth = 2;
		ctx.stroke();

		startAngle = endAngle;
	});

	// Draw legend
	ctx.textAlign = "left";
	ctx.font = "12px Arial";
	labels.forEach((label, i) => {
		const x = 20;
		const y = height - 20 - (labels.length - 1 - i) * 20;
		ctx.fillStyle = colors[i % colors.length];
		ctx.fillRect(x, y - 10, 15, 15);
		ctx.fillStyle = "#333";
		ctx.fillText(label + ": " + data[i], x + 20, y + 4);
	});

	// Add tooltip functionality
	canvas.addEventListener("mousemove", function(e){
		const rect = canvas.getBoundingClientRect();
		const mouseX = e.clientX - rect.left;
		const mouseY = e.clientY - rect.top;

		const dx = mouseX - centerX;
		const dy = mouseY - centerY;
		const distance = Math.sqrt(dx * dx + dy * dy);

		if(distance >= innerRadius && distance <= radius){
			const angle = Math.atan2(dy, dx) + Math.PI / 2;
			let normalizedAngle = angle < 0 ? angle + 2 * Math.PI : angle;

			let cumulativeAngle = 0;
			for(let i = 0; i < data.length; i++){
				const sliceAngle = (data[i] / total) * 2 * Math.PI;
				if(normalizedAngle >= cumulativeAngle && normalizedAngle < cumulativeAngle + sliceAngle){
					showTooltip(`${labels[i]}: ${data[i]}`, e.clientX, e.clientY);
					return;
				}
				cumulativeAngle += sliceAngle;
			}
		}
		hideTooltip();
	});

	canvas.addEventListener("mouseleave", hideTooltip);
}
// End chart drawing functions

function getDomain(url){
	url = url.replace(/.*?:\/\//g, "");
	url = url.replace(/www./g, "");
	var parts = url.split("/");
	url = parts[0];
	parts = url.split(".");
	if(parts[0] === "www" && parts[1] !== "com"){
		parts.shift();
	}

	var ln = parts.length, i = ln, minLength = parts[parts.length - 1].length, part;
	// iterate backwards
	while((part = parts[--i])){
		// stop when we find a non-TLD part
		if(i === 0 // 'asia.com' (last remaining must be the SLD)
				|| i < ln - 2 // TLDs only span 2 levels
				|| part.length < minLength // 'www.cn.com' (valid TLD as second-level domain)
				|| TLDs.indexOf(part) < 0 // officialy not a TLD
		){
			var actual_domain = part;
			break;
			// return part
		}
	}
	var tid;
	if(typeof parts[ln - 1] != "undefined" && TLDs.indexOf(parts[ln - 1]) >= 0){ tid = "." + parts[ln - 1]; }
	if(typeof parts[ln - 2] != "undefined" && TLDs.indexOf(parts[ln - 2]) >= 0){ tid = "." + parts[ln - 2] + tid; }
	if(typeof tid != "undefined"){ actual_domain = actual_domain + tid; }else{ actual_domain = actual_domain + ".com"; }
	return actual_domain;
}


function add(a, b){ return a + b; }

var factorpower = 0.6; // factor: power lower to 40%
var labelsvals = [];
var activevals = [];
var timevalm = [];
var currentkwh;

var time30days = [];

var kwhwithregu30days;
var kwhwithdark30days;
var currentkwh30days;

var avgdayschedule = [];
var shareenergytext;
var sharelovetext;

var newtablesite = {};
var sortable = [];
var newtablesitedomain = {};
var sortabledomain = [];

var ct7sinminutes;
var ct1sinminutes;
var ct7favoritedayweek;

document.addEventListener("DOMContentLoaded", domcontentloaded);

function shareanalyticx(message){
	var stefanvdaacodeurl = encodeURIComponent(linkdeveloperwebsite);
	window.open("https://x.com/share?url=" + stefanvdaacodeurl + "&text=" + message + "&via=turnoffthelight", "Share to X", "width=600,height=460,menubar=no,location=no,status=no");
}

function settext(id, message){
	document.getElementById(id).innerText = message;
}

function domcontentloaded(){
	// reset
	document.getElementById("btnresetanalytics").addEventListener("click", function(){
		chrome.storage.sync.set({"analytics":null, "siteengagement":null});
		location.reload();
	}, false);

	document.getElementById("sharestatsenergysaved").addEventListener("click", function(){
		shareanalyticx(shareenergytext);
	}, false);

	document.getElementById("sharestatslove").addEventListener("click", function(){
		shareanalyticx(sharelovetext);
	}, false);

	// Collect data
	var analytics; var siteengagement;
	chrome.storage.sync.get(["analytics", "siteengagement"], function(items){
		if(items["analytics"]){
			analytics = items["analytics"];
			// ----Cards
			var last7days;
			var days = [chrome.i18n.getMessage("sunday"), chrome.i18n.getMessage("monday"), chrome.i18n.getMessage("tuesday"), chrome.i18n.getMessage("wednesday"), chrome.i18n.getMessage("thursday"), chrome.i18n.getMessage("friday"), chrome.i18n.getMessage("saturday")];

			if(analytics.length > 7){
				last7days = analytics.slice(-7);
				var time7everything = last7days.map(function(a){
					return a.details.time; // in minutes
				});
				var ct7s = time7everything.reduce(add, 0);
				ct7sinminutes = ct7s / 60;

				var memhigh = 0;
				var memdayweek = "";
				var countday = 0;
				last7days.map(function(a){
					if(a.details.time > memhigh){
						memhigh = a.details.time; memdayweek = a.name;
					}
					countday++;
					// last item
					if(countday == 7){
						var newcomp = memdayweek.split("/");
						var suprisenew = newcomp[2] + "/" + newcomp[1] + "/" + newcomp[0];
						var abc = new Date(suprisenew);
						ct7favoritedayweek = days[abc.getDay()];
					}
				});

			}else{
				ct7sinminutes = 0;
				var zz = new Date();
				ct7favoritedayweek = days[zz.getDay()];
			}

			if(memhigh == 0){
				ct7sinminutes = 0;
				var zzm = new Date();
				ct7favoritedayweek = days[zzm.getDay()];
			}

			var lastdays;
			if(analytics.length > 2){
				lastdays = analytics[analytics.length - 2]; // in minutes
				ct1sinminutes = lastdays.details.time / 60;
			}else{ ct1sinminutes = 0; }

			// ----Share Energy saved
			var timeeverything = analytics.map(function(a){
				return a.details.time; // in minutes
			});
			var currentimeseconds = timeeverything.reduce(add, 0);
			// current time
			var currenttimeinhours = currentimeseconds / 3600;
			// default laptop 65W
			var kwhwithdark = currenttimeinhours * (65 * factorpower) / 1000;
			var kwhwithregu = currenttimeinhours * (65 * 1) / 1000;
			currentkwh = (kwhwithregu - kwhwithdark).toFixed(5);
			// if less then 1W
			var newsharewattvalue;
			if(currentkwh < 1){
				newsharewattvalue = (currentkwh * 1000).toFixed(2);
				shareenergytext = chrome.i18n.getMessage("shareanalyticenergyWh", "" + newsharewattvalue + "");
			}else{
				// if more then 1000W = 1kW
				newsharewattvalue = currentkwh;
				shareenergytext = chrome.i18n.getMessage("shareanalyticenergy", "" + newsharewattvalue + "");
			}
			document.getElementById("shareenergytext").innerText = shareenergytext;

			// ----Chart1
			var last90daysa;
			if(analytics.length > 90){
				last90daysa = analytics.slice(90);
			}else{ last90daysa = analytics; }
			labelsvals = last90daysa.map(function(a){ return a.name; });
			activevals = last90daysa.map(function(a){ return a.details.active; });
			last90daysa.map(function(a){
				timevalm.push(parseFloat(Math.round(a.details.time / 60 * 100) / 100).toFixed(2)); // in minutes
				return a.details.time; // in minutes
			});

			// ----Chart2
			var last30days;
			if(analytics.length > 30){
				last30days = analytics.slice(30);
			}else{ last30days = analytics; }
			last30days.map(function(a){ return a.name; });
			last30days.map(function(a){ return a.details.active; });
			time30days = last30days.map(function(a){
				return a.details.time;
			});

			var currentimeseconds30days = time30days.reduce(add, 0);
			// current time
			var currenttimeinhours30days = currentimeseconds30days / 3600;
			// default laptop 65W
			kwhwithdark30days = currenttimeinhours30days * (65 * factorpower) / 1000;
			kwhwithregu30days = currenttimeinhours30days * (65 * 1) / 1000;
			currentkwh30days = Math.round((kwhwithregu30days - kwhwithdark30days) * 100) / 100;

			// ----Chart3
			var last90days;
			if(analytics.length > 90){
				last90days = analytics.slice(90);
			}else{ last90days = analytics; }
			var day0 = last90days.map(function(a){ return a.details.day["0"]; });
			var day1 = last90days.map(function(a){ return a.details.day["1"]; });
			var day2 = last90days.map(function(a){ return a.details.day["2"]; });
			var day3 = last90days.map(function(a){ return a.details.day["3"]; });
			var day4 = last90days.map(function(a){ return a.details.day["4"]; });
			var day5 = last90days.map(function(a){ return a.details.day["5"]; });
			var day6 = last90days.map(function(a){ return a.details.day["6"]; });
			var day7 = last90days.map(function(a){ return a.details.day["7"]; });
			var day8 = last90days.map(function(a){ return a.details.day["8"]; });
			var day9 = last90days.map(function(a){ return a.details.day["9"]; });
			var day10 = last90days.map(function(a){ return a.details.day["10"]; });
			var day11 = last90days.map(function(a){ return a.details.day["11"]; });
			var day12 = last90days.map(function(a){ return a.details.day["12"]; });
			var day13 = last90days.map(function(a){ return a.details.day["13"]; });
			var day14 = last90days.map(function(a){ return a.details.day["14"]; });
			var day15 = last90days.map(function(a){ return a.details.day["15"]; });
			var day16 = last90days.map(function(a){ return a.details.day["16"]; });
			var day17 = last90days.map(function(a){ return a.details.day["17"]; });
			var day18 = last90days.map(function(a){ return a.details.day["18"]; });
			var day19 = last90days.map(function(a){ return a.details.day["19"]; });
			var day20 = last90days.map(function(a){ return a.details.day["20"]; });
			var day21 = last90days.map(function(a){ return a.details.day["21"]; });
			var day22 = last90days.map(function(a){ return a.details.day["22"]; });
			var day23 = last90days.map(function(a){ return a.details.day["23"]; });
			var totalday0 = day0.reduce(add, 0);
			var totalday1 = day1.reduce(add, 0);
			var totalday2 = day2.reduce(add, 0);
			var totalday3 = day3.reduce(add, 0);
			var totalday4 = day4.reduce(add, 0);
			var totalday5 = day5.reduce(add, 0);
			var totalday6 = day6.reduce(add, 0);
			var totalday7 = day7.reduce(add, 0);
			var totalday8 = day8.reduce(add, 0);
			var totalday9 = day9.reduce(add, 0);
			var totalday10 = day10.reduce(add, 0);
			var totalday11 = day11.reduce(add, 0);
			var totalday12 = day12.reduce(add, 0);
			var totalday13 = day13.reduce(add, 0);
			var totalday14 = day14.reduce(add, 0);
			var totalday15 = day15.reduce(add, 0);
			var totalday16 = day16.reduce(add, 0);
			var totalday17 = day17.reduce(add, 0);
			var totalday18 = day18.reduce(add, 0);
			var totalday19 = day19.reduce(add, 0);
			var totalday20 = day20.reduce(add, 0);
			var totalday21 = day21.reduce(add, 0);
			var totalday22 = day22.reduce(add, 0);
			var totalday23 = day23.reduce(add, 0);
			avgdayschedule = [totalday0, totalday1, totalday2, totalday3, totalday4, totalday5, totalday6, totalday7, totalday8, totalday9, totalday10, totalday11, totalday12, totalday13, totalday14, totalday15, totalday16, totalday17, totalday18, totalday19, totalday20, totalday21, totalday22, totalday23];

			createcharts();
		}
		if(items["siteengagement"]){
			siteengagement = items["siteengagement"];
			// ----Table1
			var last30daysb;
			if(siteengagement.length > 30){
				last30daysb = siteengagement.slice(30);
			}else{ last30daysb = siteengagement; }
			var i;
			for(i in last30daysb){
				if(last30daysb[i]){
					var key;
					var omaa = last30daysb[i];
					for(key in omaa){
						if(key != "name" && Object.prototype.hasOwnProperty.call(omaa, key)){ // key is not the date
							setnewtable(newtablesite, key, omaa);
						}
					}
				}
			}

			var e;
			for(e in newtablesite){
				sortable.push([e, newtablesite[e]]);
			}

			sortable.sort(function(a, b){
				return b[1] - a[1];
			});

			// ----Chart data domains only
			var last30daysdomainonly;
			if(siteengagement.length > 30){
				last30daysdomainonly = siteengagement.slice(30);
			}else{ last30daysdomainonly = siteengagement; }
			var v;

			for(v in last30daysdomainonly){
				if(last30daysdomainonly[v]){
					var oma = last30daysdomainonly[v];
					for(key in oma){
						if(key !== "name" && Object.prototype.hasOwnProperty.call(oma, key)){
							// strip extra quotes
							var cleanKey = key.replace(/^'+|'+$/g, "");

							// get domain
							var dom = getDomain(cleanKey);

							// temporarily make the object have the domain as a key
							var tempOma = {};
							tempOma[dom] = oma[key];

							setnewtable(newtablesitedomain, dom, tempOma);
						}
					}
				}
			}

			var h;
			for(h in newtablesitedomain){
				sortabledomain.push([h, newtablesitedomain[h]]);
			}

			sortabledomain.sort(function(a, b){
				return b[1] - a[1];
			});

			createtables();
			showcard();
		}
	});

	function createcharts(){
		// --- Begin chart1
		var canvas1 = document.getElementById("myChart");
		var datasets1 = [
			{label: chrome.i18n.getMessage("charttitletotaltime"), data: timevalm, borderColor: "rgba(229,57,53,1)", borderWidth: 2},
			{label: chrome.i18n.getMessage("charttitlelayeractive"), data: activevals, borderColor: "rgba(30,136,229,1)", borderWidth: 2}
		];
		drawLineChart(canvas1, labelsvals, datasets1, {});
		// --- End chart1
		// --- Begin chart3
		var canvas3 = document.getElementById("myChartthree");
		var labels3 = [chrome.i18n.getMessage("charttitlelblenergysaved"), chrome.i18n.getMessage("charttitlelblenergytotal")];
		var data3 = [currentkwh30days, kwhwithregu30days];
		var colors3 = ["#43A047"];
		var title3 = chrome.i18n.getMessage("charttitle30dayssaved");
		drawDoughnutChart(canvas3, labels3, data3, colors3, title3);
		// --- End chart3
		// --- Begin chart4
		var canvas4 = document.getElementById("myChartfour");
		var datasets4 = [{label: chrome.i18n.getMessage("charttitleavgday"), data: avgdayschedule, borderColor: "rgba(229,57,53,1)", borderWidth: 2}];
		var labels4 = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "20", "21", "22", "23"];
		drawLineChart(canvas4, labels4, datasets4, {});
		// --- End chart4
	}
	function createtables(){
		// --- Begin chart2
		var testlove = false;
		var sitenamedomain = [];
		var sitevaluedomain = [];
		var key;
		for(key in sortabledomain){
			if(testlove == false){
				var mostuseddoman = getDomain(sortabledomain[key][0]);
				sharelovetext = chrome.i18n.getMessage("shareanalyticlove", "" + mostuseddoman + "");
				document.getElementById("sharelovetext").innerText = sharelovetext;
				testlove = true;
			}
			var value = sortabledomain[key][1];
			sitenamedomain.push([sortabledomain[key][0]]);
			sitevaluedomain.push([value]);
		}
		if(typeof key == "undefined"){
			sharelovetext = chrome.i18n.getMessage("shareanalyticlove", "turnoffthelights.com");
			document.getElementById("sharelovetext").innerText = sharelovetext;
		}
		var canvas2 = document.getElementById("myCharttwo");
		var colors2 = ["#D32F2F", "#0288D1", "#388E3C", "#FFD600", "#FFA000", "#C51162", "#7B1FA2", "#0097A7", "#00BFA5", "#689F38", "#FF6D00", "#616161"];
		var title2 = chrome.i18n.getMessage("charttitlelblwebsiteused");
		// Flatten arrays and ensure data is numeric
		var flatLabels = sitenamedomain.flat();
		var flatData = sitevaluedomain.flat().map((val) => parseFloat(val));
		drawDoughnutChart(canvas2, flatLabels, flatData, colors2, title2);
		// --- End chart2

		// --- Share Love
		// --- Begin table1
		var table = document.getElementById("tablesiteeng");
		var keyb;
		for(keyb in sortable){
			var valuee = sortable[keyb][1];
			var row = document.createElement("tr");
			var cella = document.createElement("td");
			var cellaText = sortable[keyb][0];
			cellaText = cellaText.replace(/^'|'$/g, "");
			var link = document.createElement("a");
			link.textContent = cellaText;
			link.target = "blank";
			link.href = cellaText;
			cella.appendChild(link);
			row.appendChild(cella);
			var cellb = document.createElement("td");
			var cellbText = document.createTextNode(valuee);
			cellb.appendChild(cellbText);
			row.appendChild(cellb);
			table.appendChild(row);
		}
	// --- End table1
	}

	function multitext(a, b){
		return chrome.i18n.getMessage(a) + ": " + b;
	}

	function showcard(){
		var ct7 = multitext("cardtextfavdayweek", ct7favoritedayweek);
		var ctm = multitext("cardtextyestime", parseFloat(Math.round(ct1sinminutes * 100) / 100).toFixed(2));
		var ct7w = multitext("cardavgprevweektime", parseFloat(Math.round(ct7sinminutes * 100) / 100).toFixed(2));
		var elemarray = ["txtdayweek", "txtyestime", "txtavgweektime"];
		var desarray = [ct7, ctm, ct7w];
		for(var itab = 0; itab < desarray.length; itab++){
			settext(elemarray[itab], desarray[itab]);
		}
	}
//---
}