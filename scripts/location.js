var gps = "";
function getLocation()
{
	if (navigator.geolocation)
	{
		navigator.geolocation.getCurrentPosition(showPosition, error);
	}
	else{
		$('#input').append("<input id=\"zipcode\" class=\"inputField\" value=\"Zip Code\" onclick=\"this.value=\'\';\"/><br/>");
	}
}

function showPosition(position)
{
	gps = position.coords.latitude + "," + position.coords.longitude;
}

function error(err) {
	$('#input').append("<input id=\"zipcode\" class=\"inputField\" value=\"Zip Code\" onclick=\"this.value=\'\';\"/><br/>");
};
