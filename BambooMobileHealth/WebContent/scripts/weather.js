function getWeather(gps){
  data = "";
  var url_str = 'http://api.wunderground.com/auto/wui/geo/WXCurrentObXML/index.xml?query=' + gps;
};

function parse(xml) {
	alert("parsed");
}

