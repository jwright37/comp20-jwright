//things i need to do:
	//load googlemap api
	//find,parse waldo
	//place the red line with fancy markers

google.maps.event.addDomListener(window, 'load', load);	
	
//manages program flow...
function load()
{
	draw();
	findwaldo();
	markstations();
}

//draws the map
var map;
function draw()
{
	var roughcenter = new google.maps.LatLng(42,-71);
	var mapOptions = {
		center: roughcenter,
		zoom: 13,
		mapTypeId: google.maps.MapTypeId.ROADMAP
	};
	map = new google.maps.Map(document.getElementById('map_canvas'), mapOptions);
	
//get my location
	if(navigator.geolocation) {
		navigator.geolocation.getCurrentPosition(function(position) {
			var mypos = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
			var infowindow = new google.maps.InfoWindow({
				map: map,
				position: mypos,
				content: 'I am here at ' + mypos.lat() + ', ' + mypos.lng()
			});
			map.setCenter(mypos);
			var mymark = new google.maps.Marker({
				position: mypos,
				map: map,
				title: "Your Location"
			});
		});
	}
}

//get location of waldo and carmen
function findwaldo() {
	var request = new XMLHttpRequest();
	
	try{
			request.open("GET", "http://messagehub.herokuapp.com/a3.json", false);
			request.send();
			str = request.responseText;
			list = JSON.parse(str);
			for (i=0;i<list.length;i++){
				if(list[i].name == "Waldo"){
					var wlatlng = new google.maps.LatLng(list[i].loc.latitude,list[i].loc.longitude);
					var wmark = new google.maps.Marker({
						position: wlatlng,
						map: map,
						title: list[i].loc.note,
						icon: 'waldo.png'
					});
				}
				if(list[i].name == "Carmen Sandiego"){
					var cslatlng = new google.maps.LatLng(list[i].loc.latitude,list[i].loc.longitude);
					var wmark = new google.maps.Marker({
						position: cslatlng,
						map: map,
						title: list[i].loc.note,
						icon: 'carmen.png'
					});
				}
			}
	}
	catch (error){
		
	}
}

//gonna hardcode the station json in
function markstations() {
	var stnarray = [
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
			title: stnarray[i].station
		});
		stnmark.setMap(map);
		//make info window
	}
}
