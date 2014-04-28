function getWeather(gps){
	// First, determine which location they have
	// Second, call appropriate location lookup to get city and state
	// Third, get weather at a particular date 
	var url = '';
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
		
  
  //$('#wrapper').append(url);
	$.ajax({
	  url : url,
	  dataType : "jsonp",
	  success : function(parsed_json) {
	  var city = parsed_json['location']['city'];
	  var state = parsed_json['location']['state'];
	  //var temp_f = parsed_json['current_observation']['temp_f'];
	  alert(city + ',' + state);
	  }
  	});
  
  
  
  
  
};


//function parse(xml) {
//	alert("parsed");
	
//}
// http://api.wunderground.com/api/77a956bf764dc788/geolookup/q/37.776289,-122.395234.json
// http://api.wunderground.com/api/77a956bf764dc788/geolookup/q/94107.json
//var url = 'http://api.wunderground.com/api/77a956bf764dc788/history_20140421/q/NC/Raleigh.json';
//var url = 'http://api.wunderground.com/api/77a956bf764dc788/geolookup/conditions/q/NC/Raleigh.json';
//jQuery(document).ready(function($) {
	  
//});