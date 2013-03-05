//onload listener
google.maps.event.addDomListener(window, 'load', load);	

//global variables
var map;
var mypos;
var schedlist;
var stnarray = [
		{"station":"Alewife","lat":42.395428,"lng":-71.142483,"platformkey1":"RALEN","platformkey2":"NONE"},
		{"station":"Davis","lat":42.39674,"lng":-71.121815,"platformkey1":"RDAVN","platformkey2":"RDAVS"},
		{"station":"Porter","lat":42.3884,"lng":-71.119149,"platformkey1":"RPORN","platformkey2":"RPORS"},
		{"station":"Harvard","lat":42.373362,"lng":-71.118956,"platformkey1":"RHARN","platformkey2":"RHARS"},
		{"station":"Central","lat":42.365486,"lng":-71.103802,"platformkey1":"RCENN","platformkey2":"RCENS"},
		{"station":"Kendall/MIT","lat":42.36249079,"lng":-71.08617653,"platformkey1":"RKENN","platformkey2":"RKENS"},
		{"station":"Charles/MGH","lat":42.361166,"lng":-71.070628,"platformkey1":"RMGHN","platformkey2":"RMGHS"},
		{"station":"Part St.","lat":42.35639457,"lng":-71.0624242,"platformkey1":"RPRKN","platformkey2":"RPRKS"},
		{"station":"Downtown Crossing","lat":42.355518,"lng":-71.060225,"platformkey1":"RDTCN","platformkey2":"RDTCS"},
		{"station":"South","lat":42.352271,"lng":-71.055242,"platformkey1":"RSOUN","platformkey2":"RSOUS"},
		{"station":"Broadway","lat":42.342622,"lng":-71.056967,"platformkey1":"RBRON","platformkey2":"RBROS"},
		{"station":"Andrew","lat":42.330154,"lng":-71.057655,"platformkey1":"RANDN","platformkey2":"RANDS"},
		{"station":"JFK/UMass","lat":42.320685,"lng":-71.052391,"platformkey1":"RJFKN","platformkey2":"RJFKS"},
		{"station":"Savin Hill","lat":42.31129,"lng":-71.053331,"platformkey1":"RSAVN","platformkey2":"RSAVS"},
		{"station":"Fields Corner","lat":42.300093,"lng":-71.061667,"platformkey1":"RFIEN","platformkey2":"RFIES"},
		{"station":"Shawmut","lat":42.29312583,"lng":-71.06573796,"platformkey1":"RSHAN","platformkey2":"RSHAS"},
		{"station":"Ashmont","lat":42.284652,"lng":-71.064489,"platformkey1":"NONE","platformkey2":"RASHS"},
		{"station":"North Quincy","lat":42.275275,"lng":-71.029583,"platformkey1":"RNQUN","platformkey2":"RNQUS"},
		{"station":"Wollaston","lat":42.2665139,"lng":-71.0203369,"platformkey1":"RWOLN","platformkey2":"RWOLS"},
		{"station":"Quincy Center","lat":42.251809,"lng":-71.005409,"platformkey1":"RQUCN","platformkey2":"RQUCS"},
		{"station":"Quincy Adams","lat":42.233391,"lng":-71.007153,"platformkey1":"RQUAN","platformkey2":"RQUAS"},
		{"station":"Braintree","lat":42.2078543,"lng":-71.0011385,"platformkey1":"NONE","platformkey2":"RBRAS"}];

//manages program flow...
function load()
{
	draw();
	placeme();
	findwaldo();
	getsched();
	makepoly();
}

//draw the map
function draw()
{
	var roughcenter = new google.maps.LatLng(42,-71); 	//used to render the map before 
	var mapOptions = {									//my position is found
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
			var dist = closeststn(); //returns array of [0] station index; [1] distance in miles
			var myinfowindow = new google.maps.InfoWindow({
				map: map,
				position: mypos,
			});
			var contentstr = '<div>' + 'You are here at ' + '<br>'
							+ mypos.lat() + ', ' + mypos.lng() + '.' + '<br>'
							+ 'The closest station is ' + stnarray[dist[0]].station + '<br>'
							+ 'which is ' + dist[1] + ' miles away.';
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
							content: 'Waldo is ' + dist + ' miles away.'
						});
					});
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
							content: 'Carmen is ' + dist + ' miles away.'
						});
					});
				}
			}
	}
	catch (error){
		//do something here
	}
}

//make array of schedule objects
function getsched() {
	request = new XMLHttpRequest();

	try{
		request.open("GET", "http://mbtamap-cedar.herokuapp.com/mapper/redline.json", true);
		request.send();
		request.onreadystatechange = markstations;
	}
	catch(error){
		//what do I put here?
	}
}

//mark all the stations and make their infowindows
function markstations() {
	if(request.readyState ==  4){
		sched = request.responseText;
		sched = JSON.parse(sched);
		
		for(i=0;i<stnarray.length;i++){
			var latlng = new google.maps.LatLng(stnarray[i].lat,stnarray[i].lng);
			var stnmark = new google.maps.Marker({
				position: latlng,
				map: map,
				title: stnarray[i].station,
				icon: 'thomas.jpg'
			});
			var stationwindow = new google.maps.InfoWindow({
				position: latlng,
				map:map
			});
			stnmark.setMap(map);
			var nbstring = "";
			var sbstring = "";
			for(j=0;j<sched.length;j++){
				if(sched[j].PlatformKey ==  stnarray[i].platformkey1){
					nbstring += 'Train Arrival in: ' + sched[j].TimeRemaining + '<br>';
				}
				if(sched[j].PlatformKey ==  stnarray[i].platformkey2){
					sbstring += 'Train Arrival in: ' + sched[j].TimeRemaining + '<br>';
				}
			}
			var content = '<div>' + stnarray[i].station + '<br>'
					+ 'NORTH BOUND' + '<br>'
					+ nbstring + '<br>'
					+ 'SOUTH BOUND' + '<br>'
					+ sbstring + '</div>';
			bindWindow(stnmark, content, stationwindow);
		}
	}
}

//attaches a listener to the marker
function bindWindow(marker, contentString, infowindow)
{
    google.maps.event.addListener(marker, 'click', function() {
        infowindow.setContent(contentString);
        infowindow.open(map, marker);
    });
}

//make the polyline
function makepoly() {
	var mainarr = [];
	var brancharr = [];
	
	//alewife to ashmont
	for(i=0;i<17;i++){
		mainarr[i] = new google.maps.LatLng(stnarray[i].lat, stnarray[i].lng);
	}
	
	//jfk to braintree
	for(i=1;i<6;i++){
		brancharr[i] = new google.maps.LatLng(stnarray[i+16].lat, stnarray[i+16].lng);
	}
	brancharr[0] = new google.maps.LatLng(stnarray[13].lat, stnarray[13].lng);
	
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
	var lat1 = coord1.lat();
	var lat2 = coord2.lat();
	var lng1 = coord1.lng();
	var lng2 = coord2.lng();
	var R = 3963.1676; //miles
	
	var x1 = lat2-lat1;
	var dLat = x1 * Math.PI / 180;
	var x2 = lng2-lng1;
	var dLng = x2 * Math.PI / 180;
	lat1 = lat1 * Math.PI / 180;
	lat2 = lat2 * Math.PI / 180;

	var a = Math.sin(dLat/2) * Math.sin(dLat/2) +
        Math.sin(dLng/2) * Math.sin(dLng/2) * Math.cos(lat1) * Math.cos(lat2); 
	var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
	var d = R * c;
	return d;
}

//find the station with the min distance
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