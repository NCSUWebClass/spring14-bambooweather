function viewStress() {
var s = d3.selectAll("svg");
s = s.remove();
var userName = document.getElementById("userNameText").value;
var margin = {top: 150, right: 40, bottom: 150, left: 40},
width = 960 - margin.left - margin.right,
height = 500 - margin.top - margin.bottom;

var highs = [50, 60, 70, 80];
var lows = [20, 30, 40, 50];

var x = d3.time.scale()
.range([0, width]);
 
var y = d3.scale.linear()
.range([height, 0]);

var y2 = d3.scale.linear()
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
	d.high = +d.high;
	d.low = +d.low;
});
var highline = d3.svg.line()
	.x(function(d) {return x(d.date); })
	.y(function(d) {return y2(d.high); });
	
var lowline = d3.svg.line()
	.x(function(d) {return x(d.date); })
	.y(function(d) {return y2(d.low); });

x.domain(d3.extent(data, function(d) { return d.date; })).nice();
y.domain([0,5]);
y2.domain([0,100]);
	

svg.append("g")
	.attr("class", "x axis")
	.attr("transform", "translate(0," + height + ")")
	.call(d3.svg.axis().scale(x).orient("bottom").ticks(data.length).tickFormat(d3.time.format("%d-%m-%y")));
	 
// Add the y-axis.
svg.append("g")
	.attr("class", "y axis")
	.call(d3.svg.axis().scale(y).ticks(5).orient("left"));

// Add the second (temperature) y-axis.
svg.append("g")
	.attr("class", "y axis")
	.attr("transform", "translate(" + width + " ,0)")   
	.call(d3.svg.axis().scale(y2).ticks(5).orient("right"));

svg.append("text")
.attr("class", "y label")
.attr("text-anchor", "end")
.attr("y", -35)
.attr("x", -60)
.attr("dy", ".5em")
.attr("transform", "rotate(-90)")
.text("Stress")
.attr("font-family", "sans-serif")
.attr("font-size", "20px")
.attr("fill",d3.rgb("grey").darker());

svg.append("text")
.attr("class", "x label")
.attr("text-anchor", "end")
.attr("x", width / 2)
.attr("y", height + 40)
.text("Date (M/D/Y)")
.attr("font-family", "sans-serif")
.attr("font-size", "20px")
.attr("fill",d3.rgb("grey").darker());
 

// Add the points!
svg.selectAll(".point")
	.data(data)
	.enter().append("path")
	.attr("class", "point")
	.attr("d", d3.svg.symbol().type("triangle-up"))
	.attr("transform", function(d) { return "translate(" + x(d.date) + "," + y(d.stress) + ")"; })
	.attr("fill",d3.rgb("green"));

svg.append("path")
	.attr("class", "highline")
	.attr("d", highline(data));
	
svg.append("path")
	.attr("class", "lowline")
	.attr("d", lowline(data));	

});
};

function viewFatigue() {
var s = d3.selectAll("svg");
s = s.remove();		
var userName = document.getElementById("userNameText").value;
var margin = {top: 150, right: 40, bottom: 150, left: 40},
width = 960 - margin.left - margin.right,
height = 500 - margin.top - margin.bottom;

var highs = [50, 60, 70, 80];
var lows = [20, 30, 40, 50];

var x = d3.time.scale()
.range([0, width]);
 
var y = d3.scale.linear()
.range([height, 0]);

var y2 = d3.scale.linear()
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
	d.high = +d.high;
	d.low = +d.low;
});
var highline = d3.svg.line()
	.x(function(d) {return x(d.date); })
	.y(function(d) {return y2(d.high); });
	
var lowline = d3.svg.line()
	.x(function(d) {return x(d.date); })
	.y(function(d) {return y2(d.low); });

x.domain(d3.extent(data, function(d) { return d.date; })).nice();
y.domain([0,5]);
y2.domain([0,100]);	

 svg.append("g")
	.attr("class", "x axis")
	.attr("transform", "translate(0," + height + ")")
	.call(d3.svg.axis().scale(x).orient("bottom").ticks(data.length).tickFormat(d3.time.format("%d-%m-%y")));
	 
// Add the y-axis.
svg.append("g")
	.attr("class", "y axis")
	.call(d3.svg.axis().scale(y).orient("left").ticks(5));

// Add the second (temperature) y-axis.
svg.append("g")
	.attr("class", "y axis")
	.attr("transform", "translate(" + width + " ,0)")   
	.call(d3.svg.axis().scale(y2).ticks(5).orient("right"));

svg.append("text")
	.attr("class", "y label")
	.attr("text-anchor", "end")
	.attr("y", -35)
	.attr("x", -60)
	.attr("dy", ".5em")
	.attr("transform", "rotate(-90)")
	.text("Fatigue")
	.attr("font-family", "sans-serif")
	.attr("font-size", "20px")
	.attr("fill",d3.rgb("grey").darker());

svg.append("text")
	.attr("class", "x label")
	.attr("text-anchor", "end")
	.attr("x", width / 2)
	.attr("y", height + 40)
	.text("Date (M/D/Y)")
	.attr("font-family", "sans-serif")
	.attr("font-size", "20px")
	.attr("fill",d3.rgb("grey").darker());
	 
// Add the points!
svg.selectAll(".point")
	.data(data)
	.enter().append("path")
	.attr("class", "point")
	.attr("d", d3.svg.symbol().type("circle"))
	.attr("transform", function(d) { return "translate(" + x(d.date) + "," + y(d.fatigue) + ")"; })
	.attr("fill",d3.rgb("green"));

svg.append("path")
	.attr("class", "highline")
	.attr("d", highline(data));
	
svg.append("path")
	.attr("class", "lowline")
	.attr("d", lowline(data));
	});		
};
