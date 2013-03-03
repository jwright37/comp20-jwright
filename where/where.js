//things i need to do:
	//load googlemap api
	//find,parse waldo
	//find my location and put it on the map
	//place the red line with fancy markers

google.maps.event.addDomListener(window, 'load', load);	
	
//manages program flow...
function load()
{
	draw();
}

//draws the map
function draw()
{
	var map;
	var mapOptions = {
		zoom: 13,
		mapTypeId: google.maps.MapTypeId.ROADMAP
	};
	map = new google.maps.Map(document.getElementById("map_canvas"), mapOptions);
	
//get location of ME
	if(navigator.geolocation){
		navigator.geolocation.getCurrentPosition(function(position) {
			var mypos = new google.maps.LatLng(position.coords.latitude, position.coords.longitiude);
			var infowindow = new google.maps.InfoWindow({
				map: map,
				position: mypos,
				content: 'You are here...'
			});
			map.setCenter(pos);
		});
	}
}

//get location of waldo and carmen
/*function findwaldo() {
	var request = new XMLHttpRequest();
	
	try {
			request.open("GET", "http://messagehub.herokuapp.com/a3.json", true);
			request.send();
			parsify();
	}
	catch (error){
		alert("No Waldo");
	}
}

//needs to have separate markers for carmen and waldo
function parsify(){
	str = request.responseText;
	list = JSON.parse(str);
	for (i=0;i<list.length;i++){
		placewaldo(list[i]);
	}
}
*/