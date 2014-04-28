function hideThings(){
	$( ".hide" ).hide("fast", function() {
	    $( ".del"  ).remove();	
	    $( "#form").height(0);
	});
}