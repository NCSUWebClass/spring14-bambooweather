var url = '';
var city = '';
var state = '';
var maxtemps = new Array();
var mintemps = new Array();
var dates = new Array();
var numdays = 2;
var hasWeather = 0;

// Function that saves the city and state globally from a Wunderground API call 
// with zipcode or gps
function getCityState(gps){
	if( hasWeather == 1 )return;
	// First, determine which location they have
	if( gps == "" ){
		var zip = document.getElementById("zipcode").value;
		//alert('no gps, using zip: ' + zip);
		if(zip == 'Zip Code' || zip == ''){
			zip = '27606';
		}
		url = 'http://api.wunderground.com/api/77a956bf764dc788/geolookup/q/' + zip + '.json';
	}
	else {
		//alert('using gps: ' + gps);
		//$('#wrapper').append(gps);
		url = 'http://api.wunderground.com/api/77a956bf764dc788/geolookup/q/'+ gps + '.json';
	}
	// Second, call appropriate location lookup to get city and state	
	$.ajax({
	  url : url,
	  dataType : "jsonp",
	  success : function(parsed_json) {
	  city = parsed_json['location']['city'];
	  state = parsed_json['location']['state'];
	  getWeather();
	  },
	  async : false
  	});
}

// Retrieve the weather for the global city and state
function getWeather(){
	// Third, get weather for a date range
	// get today's date
	if(city != ''){
		var day = new Date();
		var curday = new Date();
		//alert(day.toDateString());
		for(var i = 0; i < numdays; i++){
			curday.setDate(day.getDate() - i);
			//alert(curday.toDateString());
			var dd = curday.getDate();
			var mm = getMonth(curday); //January is 0!
			var yyyy = curday.getFullYear();
			url = 'http://api.wunderground.com/api/77a956bf764dc788/history_' + yyyy + mm + dd + '/q/' + state + '/' + city + '.json';
			//url =  'http://api.wunderground.com/api/77a956bf764dc788/history_20140427/q/NC/Raleigh.json';
			$.ajax({
			  url : url,
			  dataType : "jsonp",
			  success : function(parsed_json) {
				  mintemps.push(parsed_json['history']['dailysummary'][0]['mintempi']);
				  maxtemps.push(parsed_json['history']['dailysummary'][0]['maxtempi']);
				  dates.push(parsed_json['history']['date']['pretty']);
				  printWeather();
			  },
			  async : false
			});
		}
	}
};

// For debugging, this outputs date and weather information.
function printWeather(){
	if( mintemps.length >= numdays){
		hasWeather = 1;
		//alert('done, length: ' + mintemps.length);
		for(var i = 0; i < numdays; i++){
			alert(i + ': On: ' + dates[i] + ' min: ' + mintemps[i] + ' max: ' + maxtemps[i]);
		}
	}
}

// For producing two character month
function getMonth(date) {
    var month = date.getMonth() + 1;
    return month < 10 ? '0' + month : month;
}  