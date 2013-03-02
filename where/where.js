//js for a3
//things i need to do:
	//load googlemap api
	//find,parse waldo
	//find my location and put it on the map
	//place the red line with fancy markers

function draw()
{
	//findme();
	mylat = 100;
	mylon = 100;
	var map;
	var mapOptions = {
		center: new google.maps.LatLng(mylat,mylon),
		zoom: 13,
		mapTypeId: google.maps.MapTypeId.ROADMAP
	};
	var map = new google.maps.Map(document.getElementById("map_canvas"), mapOptions);
}

function findme()
{
	if(navigator.geolocation){
		navigator.geolocation.getCurrentPosition(function(position)){
			mylat = position.coords.latitude;
			mylon = position.coords.longitude;
		}
	};
	else {
		alert("Geolocation not availible");
	}
}

function findwaldo() {
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

function parsify(){
	str = request.responseText;
	list = JSON.parse(str);
	for (i=0;i<list.length;i++){
		placewaldo(list[i]);
	}
}
