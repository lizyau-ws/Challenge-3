//WEATHER//
function getAPIdata() {

	var url = 'https://api.openweathermap.org/data/2.5/weather';
	var apiKey ='aa56a992589afbd5d6947775cf0c7253';
	var city = document.getElementById('city').value;
	var request = url + '?' + 'appid=' + apiKey + '&' + 'q=' + city;


	// get current weather
	fetch(request)
	
	.then(function(response) {
		if(!response.ok) throw Error(response.statusText);
		return response.json();
	})
	
	// render weather per day
	.then(function(response) {
		// render weatherCondition
		onAPISucces(response);	
	})
	
	.catch(function (error) {
		onAPIError(error);
	})

}


function onAPISucces(response) {
	// get type of weather in string format
	var type = response.weather[0].description;

	// get temperature in Celcius
	var degC = Math.floor(response.main.temp - 273.15);

	// render weather in DOM
	var weatherBox = document.getElementById('weather');
	weatherBox.innerHTML = 'Temperature: ' + degC + '&#176;C <br>' + type +'<br>';

	//decide good location or not
	if( ( (degC >= -5) && (degC <= 25) ) && (type == "clear sky" || "few clouds" || "scattered clouds") ){
		weatherBox.innerHTML += "<br><span class='yes'>We can land here!</span><br>";
		weatherBox.innerHTML += '<img class= "yesImg" src= "img/welcome.png">';
	}
	else{
		weatherBox.innerHTML += "<br><span class='no'>We can't land here!</span>";
		weatherBox.innerHTML += '<img class= "noImg" src= "img/ohno.jpg">';
	}

	//fly to a new location
	map.flyTo({
		center: [response.coord.lon, response.coord.lat],
		zoom: 10,
		essential: true
	});

	var marker = new mapboxgl.Marker({
		color: "#82ffff",
		draggable: true
		}).setLngLat([response.coord.lon, response.coord.lat])
		.addTo(map);
}


function onAPIError(error) {
	console.error('Fetch request failed', error);
	var weatherBox = document.getElementById('weather');
	weatherBox.innerHTML = 'No weather data available <br /> Did you enter a valid city?'; 
}

// init data stream
document.getElementById('checkCondition').onclick = function(){
	getAPIdata();
};

//MAP//

// Set api token
mapboxgl.accessToken = 'pk.eyJ1IjoieWF1d3MiLCJhIjoiY2twcGFveTdjMzZlbTJvcmlmaHNyd3RjeSJ9.H4o74xa0LAvkREJAyP3ZEg';

// Initialate map
var map = new mapboxgl.Map({
  container: 'map',
  style: 'mapbox://styles/yauws/ckqtizao45lyk18pdqzrmslih',
  center: [4.322840, 52.067101],
  zoom: 8,

});



