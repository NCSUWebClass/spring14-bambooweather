function getWeather(gps){
  data = "";
  var url_str = 'http://api.wunderground.com/auto/wui/geo/WXCurrentObXML/index.xml?query='+ gps;
};


function parse(xml) {
	alert("parsed");
	
}

//var url = 'http://api.wunderground.com/api/77a956bf764dc788/history_20140421/q/NC/Raleigh.json';
var url = 'http://api.wunderground.com/api/77a956bf764dc788/geolookup/conditions/q/NC/Raleigh.json';
jQuery(document).ready(function($) {
	  $.ajax({
	  url : url,
	  dataType : "jsonp",
	  success : function(parsed_json) {
	  var location = parsed_json['location']['city'];
	  var temp_f = parsed_json['current_observation']['temp_f'];
	  alert("Current temperature in " + location + " is: " + temp_f);
	  }
	  });
});