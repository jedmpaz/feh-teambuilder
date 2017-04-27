window.onload = start;

var raw_data = [];
var units = {};
var weapons = {};
var assists = {};
var specials = {};
var skillsA = {};
var skillsB = {};
var skillsC = {};
var skillsS = {};
var names = [];

var tip;

var s_width = 600,
        s_height = 600,
        s_padding = 50;
var margin = {
        top: 150,
        right: 100,
        bottom: 40,
        left: 100
    };

var x, y, xAxis, yAxis;


function start() {
    d3.select("#scatter")
        .append("svg")
        .attr("id", "scatterplot");

    tip = d3.select("body").append("div")
        .attr("class", "tooltip")
        .style("opacity", 0);

    var scatterplot = d3.select("#scatterplot")
        .attr("width",s_width)
        .attr("height",s_height);

    x = d3.scale.linear()
        .domain([0,1])
        .range([s_padding/2, s_width-s_padding]);

    xAxis = d3.svg.axis()
        .orient("bottom")
        .scale(x);

    y = d3.scale.linear()
        .domain([0,1])
        .range([s_height-s_padding, s_padding]);

    yAxis = d3.svg.axis()
        .orient("left")
        .scale(y);

    d3.csv("data/fehdata-units.csv", function(error, data) {
        if (error) throw error;
        console.log(data);
        raw_data = data;
        for (var i in data) {
            if (i != "columns") {
                var unit = data[i].Name;
                var boon4s = data[i].Boon4;
                var bane4s = data[i].Bane4;
                boon4s = boon4s.split(",");
                bane4s = bane4s.split(",")
                data[i].ATK = +data[i].ATK;
                data[i].SPD = +data[i].SPD;
                data[i].DEF = +data[i].DEF;
                data[i].RES = +data[i].RES;
                data[i].HP = +data[i].HP;
                data[i].Total = +data[i].Total;
                data[i].Boon4 = boon4s;
                data[i].Bane4 = bane4s;
                units[unit] = data[i];
                names.push(unit);
            }
        }

        x.domain([
            d3.min(data, function(d) {
                return +d.Total;
            })-1,
            d3.max(data, function(d) {
                return +d.Total;
            })+1]);

        console.log(x);

        y.domain([
            d3.min(data, function(d) {
                return +d.ATK;
            })-1,
            d3.max(data, function(d) {
                return +d.ATK;
            })+1]);

        scatterplot.selectAll(".dot").data(data)
            .enter().append("circle")
            .attr("class", "dot")
            .style("fill", "#d8d165")
            .style("stroke", "#969696")
            .attr("cx", function (d) {
                console.log(x(+d.Total) + "," + y(+d.ATK))
                return x(+d.Total);
            })
            .attr("cy", function (d) {
                return y(+d.ATK)
            })
            .attr("r", 5)
            .on("mouseover", function (d) {
                tip.transition()
                    .duration(300)
                    .style("opacity", .8);
                tip.html("<p><b>" + d.Name + "</b></p><p><b>Weapon:</b> <br>" + d.Weapon + "</p><p><b>Range:<br></b>" + d.Range + "</p><p><b>Damage Type:<br></b> " + d["Damage Type"])
                    .style("left", (d3.event.pageX)+5 + "px")
                    .style("top", (d3.event.pageY)+5 + "px");
                d3.select(this)
                    .transition()
                    .duration(300)
                    .attr("r", 10)
                    .style("fill", function (d) {
                        if (d.Color == "Red") {return "#a52512"};
                        if (d.Color == "Blue") {return "#1c2777"};
                        if (d.Color == "Green") {return "#0e7a2d"};
                        if (d.Color == "Colorless") {return "gray"};
                    })
            })
            .on("mouseout", function (d) {
                tip.transition()
                    .duration(500)
                    .style("opacity", 0);
                     d3.select(this)
                         .transition()
                         .duration(300)
                         .attr("r", 5)
                         .style("fill", "#d8d165");
            });

        scatterplot.append("g")
            .attr("transform", "translate(" + s_padding / 2 + ",0)")
            .attr("class", "y-axis")
            .call(yAxis)
            .append("text")
            .attr("transform", "rotate(-90)")
            .attr("x", 0 - (s_height / 2))
            .attr("y", 0 - margin.left)
            .style("text-anchor", "middle")
            .text("Danceability");

        scatterplot.append("g")
            .attr("transform", "translate(0," + (s_height - s_padding) + ")")
            .call(xAxis)
            .selectAll("text")
            .style("text-anchor", "end")
            .attr("dx", "-.8em")
            .attr("dy", ".15em")
            .attr("transform", function (d) {
                return "rotate(-65)"
            })

        console.log(units);
    });
}

/* Search & results functions */

$(function() {
    $("#search").autocomplete({
        source: names,
        minLength: 0
    });
});

function heroSearch() {
    var hero = $("#search").val();

    var heroStats = statBlock(units[hero]);

    var newElement =
    "<div class='hero-search-table' id='"+hero+"'>"
        +"<h3>"+hero+"</h3>"
            +"<div>"
                +"<table class='stats1'>"
                    +"<thead>"
                        +"<tr>"
                            +"<th>Skill</th>"
                            +"<th>Name</th>"
                        +"</tr>"
                    +"</thead>"
                    +"<tbody>"
                        +"<tr>"
                            +"<td>Weapon</td>"
                            +"<td>"+units[hero].Weapon+"</td>"
                        +"</tr>"
                        +"<tr>"
                            +"<td>Assist</td>"
                            +"<td>"+units[hero].Assist+"</td>"
                        +"</tr>"
                        +"<tr>"
                            +"<td>Special</td>"
                            +"<td>"+units[hero].Special+"</td>"
                        +"</tr>"
                        +"<tr>"
                            +"<td>A Slot</td>"
                            +"<td>"+units[hero].SkillA+"</td>"
                        +"</tr>"
                        +"<tr>"
                            +"<td>B Slot</td>"
                            +"<td>"+units[hero].SkillB+"</td>"
                        +"</tr>"
                        +"<tr>"
                            +"<td>C Slot</td>"
                            +"<td>"+units[hero].SkillC+"</td>"
                        +"</tr>"
                    +"</tbody>"
                +"</table>"
                +"<table class='stats2'>"
                    +"<thead>"
                        +"<tr>"
                            +"<th>Stat</th>"
                            +"<th>Value</th>"
                        +"</tr>"
                    +"</thead>"
                    +"<tbody>"
                        +"<tr>"
                            +"<td>HP</td>"
                            +"<td>"+heroStats.HP+"</td>"
                        +"</tr>"
                        +"<tr>"
                            +"<td>ATK</td>"
                            +"<td>"+heroStats.ATK+"</td>"
                        +"</tr>"
                        +"<tr>"
                            +"<td>SPD</td>"
                            +"<td>"+heroStats.SPD+"</td>"
                        +"</tr>"
                        +"<tr>"
                            +"<td>DEF</td>"
                            +"<td>"+heroStats.DEF+"</td>"
                        +"</tr>"
                        +"<tr>"
                            +"<td>RES</td>"
                            +"<td>"+heroStats.RES+"</td>"
                        +"</tr>"
                        +"<tr>"
                            +"<td>Total</td>"
                            +"<td>"+units[hero].Total+"</td>"
                        +"</tr>"
                    +"</tbody>"
                +"</table>"
            +"</div>"
    +"</div>";

    $(newElement).prependTo('.results').hide().slideDown(200);
}

function statBlock(hero) {
    var statBlock = {};
    statBlock["HP"] = statLine(hero,"HP");
    statBlock["ATK"] = statLine(hero,"ATK");
    statBlock["SPD"] = statLine(hero,"SPD");
    statBlock["DEF"] = statLine(hero,"DEF");
    statBlock["RES"] = statLine(hero,"RES");

    return statBlock;
}

function statLine(hero,stat) {
    var norm = hero[stat];
    var bane = norm - 3;
    var boon = norm + 3;

    for(var i in hero.Bane4) {
        if(stat == hero.Bane4[i]) {
            bane--;
        }
    }
    for(var i in hero.Boon4) {
        if(stat == hero.Boon4[i]) {
            boon++;
        }
    }
    var statline = '';
    statline += bane + " / " + norm + " / " + boon;
    return statline;
}