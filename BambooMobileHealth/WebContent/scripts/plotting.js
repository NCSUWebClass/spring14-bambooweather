function viewStress() {
var s = d3.selectAll("svg");
s = s.remove();
var userName = document.getElementById("userNameText").value;
var margin = {top: 150, right: 40, bottom: 150, left: 40},
width = 960 - margin.left - margin.right,
height = 500 - margin.top - margin.bottom;

var x = d3.time.scale()
.range([0, width]);
 
var y = d3.scale.linear()
.range([height, 0]);

var svg = d3.select("body").append("svg")
	.attr("width", width + margin.left + margin.right)
	.attr("height", height + margin.top + margin.bottom)
	.append("g")
	.attr("transform", "translate(" + margin.left + "," + margin.top + ")");
	 
d3.csv(userName + ".csv", function(data) {
var parseDate = d3.time.format("%d-%m-%y").parse;
	// Coerce the strings to numbers.
data.forEach(function(d) {
	d.date = parseDate(d.date);
	d.fatigue = +d.fatigue;
	d.stress = +d.stress;
});

x.domain(d3.extent(data, function(d) { return d.date; })).nice();
y.domain([0,5]);	

svg.append("g")
	.attr("class", "x axis")
	.attr("transform", "translate(0," + height + ")")
	.call(d3.svg.axis().scale(x).orient("bottom").ticks(data.length).tickFormat(d3.time.format("%d-%m-%y")));
	 
// Add the y-axis.
svg.append("g")
	.attr("class", "y axis")
	.call(d3.svg.axis().scale(y).ticks(5).orient("left"));
	 
// Add the points!
svg.selectAll(".point")
	.data(data)
	.enter().append("path")
	.attr("class", "point")
	.attr("d", d3.svg.symbol().type("triangle-up"))
	.attr("transform", function(d) { return "translate(" + x(d.date) + "," + y(d.stress) + ")"; });
	});
};

function viewFatigue() {
var s = d3.selectAll("svg");
s = s.remove();		
var userName = document.getElementById("userNameText").value;
var margin = {top: 150, right: 40, bottom: 150, left: 40},
width = 960 - margin.left - margin.right,
height = 500 - margin.top - margin.bottom;

var x = d3.time.scale()
.range([0, width]);
 
var y = d3.scale.linear()
.range([height, 0]);

var svg = d3.select("body").append("svg")
	.attr("width", width + margin.left + margin.right)
	.attr("height", height + margin.top + margin.bottom)
	.append("g")
	.attr("transform", "translate(" + margin.left + "," + margin.top + ")");
	 
d3.csv(userName + ".csv", function(data) {
var parseDate = d3.time.format("%d-%m-%y").parse;
	// Coerce the strings to numbers.
data.forEach(function(d) {
	d.date = parseDate(d.date);
	d.fatigue = +d.fatigue;
	d.stress = +d.stress;
});

x.domain(d3.extent(data, function(d) { return d.date; })).nice();
y.domain([0,5]);	

 svg.append("g")
	.attr("class", "x axis")
	.attr("transform", "translate(0," + height + ")")
	.call(d3.svg.axis().scale(x).orient("bottom").ticks(data.length).tickFormat(d3.time.format("%d-%m-%y")));
	 
// Add the y-axis.
svg.append("g")
	.attr("class", "y axis")
	.call(d3.svg.axis().scale(y).orient("left").ticks(5));
	 
// Add the points!
svg.selectAll(".point")
	.data(data)
	.enter().append("path")
	.attr("class", "point")
	.attr("d", d3.svg.symbol().type("triangle-up"))
	.attr("transform", function(d) { return "translate(" + x(d.date) + "," + y(d.fatigue) + ")"; });
	});		
};