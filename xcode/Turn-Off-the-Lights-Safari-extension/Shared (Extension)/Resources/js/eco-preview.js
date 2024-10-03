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

function shareanalytictwitter(message){
	var stefanvdaacodeurl = encodeURIComponent(linkdeveloperwebsite);
	window.open("https://twitter.com/share?url=" + stefanvdaacodeurl + "&text=" + message + "&via=turnoffthelight", "Share to Twitter", "width=600,height=460,menubar=no,location=no,status=no");
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
		shareanalytictwitter(shareenergytext);
	}, false);

	document.getElementById("sharestatslove").addEventListener("click", function(){
		shareanalytictwitter(sharelovetext);
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
						if(key != "name" && Object.prototype.hasOwnProperty.call(oma, key)){ // key is not the date
							var dom = getDomain(key);
							setnewtable(newtablesitedomain, dom, oma);
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
		var ctx1 = document.getElementById("myChart").getContext("2d");
		new Chart(ctx1, {type: "line", data: {datasets: [{label: chrome.i18n.getMessage("charttitletotaltime"), data: timevalm, backgroundColor: ["rgba(229,57,53,0)"], borderColor: ["rgba(229,57,53,1)"], borderWidth: 2}, {label: chrome.i18n.getMessage("charttitlelayeractive"), data: activevals, backgroundColor: ["rgba(30,136,229,0)"], borderColor: ["rgba(30,136,229,1)"], borderWidth: 2, type: "line"}], labels: labelsvals}, options: {legend: {labels: {usePointStyle: true}}, responsive: true, scales: {yAxes: [{ticks: {beginAtZero:true}}]}}});
		// --- End chart1
		// --- Begin chart3
		var ctx3 = document.getElementById("myChartthree").getContext("2d");
		var data = {labels: [chrome.i18n.getMessage("charttitlelblenergysaved"), chrome.i18n.getMessage("charttitlelblenergytotal")], datasets: [{fill: true, backgroundColor: ["#43A047"], data: [currentkwh30days, kwhwithregu30days], borderColor: ["#43A047"], borderWidth: 1}]};
		var options = {responsive: true, title: {display: true, text: chrome.i18n.getMessage("charttitle30dayssaved"), position: "top"}, rotation: -0.7 * Math.PI, legend: {display:false, position:"top"}};
		new Chart(ctx3, {type: "doughnut", data: data, options: options});
		// --- End chart3
		// --- Begin chart4
		var ctx4 = document.getElementById("myChartfour").getContext("2d");
		new Chart(ctx4, {type: "line", data: {datasets: [{label: chrome.i18n.getMessage("charttitleavgday"), data: avgdayschedule, backgroundColor: ["rgba(229,57,53,0)"], borderColor: ["rgba(229,57,53,1)"], borderWidth: 2}], labels: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23]}, options: {legend: {labels: {usePointStyle: true}}, responsive: true, scales: {yAxes: [{ticks: {beginAtZero:true}}]}}});
		// --- End chart4
	}
	function createtables(){
		// --- Begin chart2
		var testlove = false;
		var ctx2 = document.getElementById("myCharttwo").getContext("2d");
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
		var data = {labels: sitenamedomain, datasets: [{fill: true, backgroundColor: ["#D32F2F", "#0288D1", "#388E3C", "#FFD600", "#FFA000", "#C51162", "#7B1FA2", "#0097A7", "#00BFA5", "#689F38", "#FF6D00", "#616161"], data: sitevaluedomain, borderColor: ["#D32F2F", "#0288D1", "#388E3C", "#FFD600", "#FFA000", "#C51162", "#7B1FA2", "#0097A7", "#00BFA5", "#689F38", "#FF6D00", "#616161"], borderWidth: [2, 2]}]};

		var options = {responsive: true, title: {display: true, text: chrome.i18n.getMessage("charttitlelblwebsiteused"), position: "top"}, rotation: -0.7 * Math.PI, legend: {display:false, position:"top"}};

		new Chart(ctx2, {type: "doughnut", data: data, options: options});
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