//things i need to do:
	//load googlemap api
	//find,parse waldo
	//place the red line with fancy markers

//onload listener
google.maps.event.addDomListener(window, 'load', load);	

//global variables
var map;
var mypos;
var stnarray = [];

//manages program flow...
function load()
{
	draw();
	findwaldo();
	makestations();
	makepoly(stnarray);
	placeme();
}

//draw the map
function draw()
{
	var roughcenter = new google.maps.LatLng(42,-71);
	var mapOptions = {
		center: roughcenter,
		zoom: 13,
		mapTypeId: google.maps.MapTypeId.ROADMAP
	};
	map = new google.maps.Map(document.getElementById('map_canvas'), mapOptions);
}

//get my location
function placeme() {
	if(navigator.geolocation) {
		navigator.geolocation.getCurrentPosition(function(position) {
			mypos = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
			map.setCenter(mypos);
			
			var dist = closeststn();
			var myinfowindow = new google.maps.InfoWindow({
				map: map,
				position: mypos,
			});
			var contentstr = 'I am here at ' + mypos.lat ', ' +mypos.lng
							+ '<br>The closest T stop is ' + stnarray[dist[0]].name
							+ '<br>The station is ' + dist[1] + 'miles away.';
			myinfowindow.setContent(contentstr);
			
			var mymark = new google.maps.Marker({
				position: mypos,
				map: map,
				title: "Your Location"
			});
		});
	}
}

//get location of waldo and carmen
//and list distance in infowindow
function findwaldo() {
	var request = new XMLHttpRequest();
	
	try{
			request.open("GET", "http://messagehub.herokuapp.com/a3.json", false);
			request.send();
			var str = request.responseText;
			var list = JSON.parse(str);
			//mark their locations
			for (i=0;i<list.length;i++){
				if(list[i].name == "Waldo"){
					var wlatlng = new google.maps.LatLng(list[i].loc.latitude,list[i].loc.longitude);
					var wmark = new google.maps.Marker({
						position: wlatlng,
						map: map,
						title: list[i].loc.note,
						icon: 'waldo.png'
					});
					google.maps.event.addListener(wmark, 'click', function() {
						var dist = calcdist(mypos, wlatlng);
						var winfo = new google.maps.InfoWindow({
							position: wlatlng,
							map: map,
							content: 'Waldo is ' + dist + 'miles away.'
						});
					}
				}
				if(list[i].name == "Carmen Sandiego"){
					var cslatlng = new google.maps.LatLng(list[i].loc.latitude,list[i].loc.longitude);
					var csmark = new google.maps.Marker({
						position: cslatlng,
						map: map,
						title: list[i].loc.note,
						icon: 'carmen.png'
					});
					google.maps.event.addListener(csmark, 'click', function() {
						var dist = calcdist(mypos, cslatlng);
						var csinfo = new google.maps.InfoWindow({
							position: cslatlng,
							map: map,
							content: 'Carmen is ' + dist + 'miles away.'
						});
					}
				}
			}
	}
	catch (error){
		//do something here
	}
}

//gonna hardcode the station json in
function makestations() {
	stnarray = [
		{"station":"Alewife","lat":42.395428,"lng":-71.142483},
		{"station":"Davis","lat":42.39674,"lng":-71.121815},
		{"station":"Porter","lat":42.3884,"lng":-71.119149},
		{"station":"Harvard","lat":42.373362,"lng":-71.118956},
		{"station":"Central","lat":42.365486,"lng":-71.103802},
		{"station":"Kendall/MIT","lat":42.36249079,"lng":-71.08617653},
		{"station":"Charles/MGH","lat":42.361166,"lng":-71.070628},
		{"station":"Part St.","lat":42.35639457,"lng":-71.0624242},
		{"station":"Downtown Crossing","lat":42.355518,"lng":-71.060225},
		{"station":"South","lat":42.352271,"lng":-71.055242},
		{"station":"Broadway","lat":42.342622,"lng":-71.056967},
		{"station":"Andrew","lat":42.330154,"lng":-71.057655},
		{"station":"JFK/UMass","lat":42.320685,"lng":-71.052391},
		{"station":"Savin Hill","lat":42.31129,"lng":-71.053331},
		{"station":"Fields Corner","lat":42.300093,"lng":-71.061667},
		{"station":"Shawmut","lat":42.29312583,"lng":-71.06573796},
		{"station":"Ashmont","lat":42.284652,"lng":-71.064489},
		{"station":"North Quincy","lat":42.275275,"lng":-71.029583},
		{"station":"Wollaston","lat":42.2665139,"lng":-71.0203369},
		{"station":"Quincy Center","lat":42.251809,"lng":-71.005409},
		{"station":"Quincy Adams","lat":42.233391,"lng":-71.007153},
		{"station":"Braintree","lat":42.2078543,"lng":-71.0011385}];

	for(i=0;i<stnarray.length;i++){
		var latlng = new google.maps.LatLng(stnarray[i].lat,stnarray[i].lng);
		var stnmark = new google.maps.Marker({
			position: latlng,
			map: map,
			title: stnarray[i].station,
			icon: 'thomas.jpg'
		});
		stnmark.setMap(map);
		//make info window
	}
}

//polyline
function makepoly(array) {
	var mainarr = [];
	var brancharr = [];
	
	for(i=0;i<17;i++){
		mainarr[i] = new google.maps.LatLng(array[i].lat, array[i].lng);
	}
	
	for(i=1;i<6;i++){
		brancharr[i] = new google.maps.LatLng(array[i+16].lat, array[i+16].lng);
	}
	brancharr[0] = new google.maps.LatLng(array[13].lat, array[13].lng);
	
	var mainpoly = new google.maps.Polyline({
		path: mainarr,
		strokeColor: "#FF0000",
		strokeOpacity: 1.0,
		strokeWeight: 4,
	});
	
	var branchpoly = new google.maps.Polyline({
		path: brancharr,
		strokeColor: "#FF0000",
		strokeOpacity: 1.0,
		strokeWeight: 4,
	});
	
	mainpoly.setMap(map);
	branchpoly.setMap(map);
}

//calculate the distance between two points using the haversine formula
function calcdist(coord1, coord2){
	var lat1 = coord1.lat;
	var lat2 = coord2.lat;
	var lng1 = coord1.lng;
	var lng2 = coord2.lng;
	var R = 3963.1676; //miles
	
	var dLat = (lat2-lat1).toRad();
	var dLng = (lng2-lng1).toRad();
	var lat1 = lat1.toRad();
	var lat2 = lat2.toRad();

	var a = Math.sin(dLat/2) * Math.sin(dLat/2) +
        Math.sin(dLng/2) * Math.sin(dLng/2) * Math.cos(lat1) * Math.cos(lat2); 
	var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
	var d = R * c;
	return d;
}

function closeststn() {
	var mindist = 1000;
	var stncoord;
	var minindex = -1;
	
	for(i=0;i<stnarray.length;i++){
		stncoord = new google.maps.LatLng(stnarray[i].lat, stnarray[i].lng);
		var dist = calcdist(mypos,stncoord);
		if(dist < mindist){
			mindist = dist;
			minindex = i;
		}
	}
	return [minindex, mindist];
}
//make schedule info boxes
/*function getsched() {
	var schedrqst = new XMLHttpRequest();
	
	try{
		schedrqst.open("GET", "http://mbtamap-cedar.herokuapp.com/mapper/redline.json", false);
		schedrqst.send();
		var schedstr = responseText;
		var schedlist = JSON.parse(schedstr);
	
}*/
