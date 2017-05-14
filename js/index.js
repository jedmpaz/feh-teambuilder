window.onload = start;

$.getScript("js/simulator.js");

/* global arrays for csvs */
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
var results = [];
var team = [];

var colors = {Red: "#a52512", Blue: "#1c2777", Green: "#0e7a2d", Colorless: "gray", Stat: "#d8d165"};

var tip;

/* scatter plot div sizes */
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

/* keep track of which button is pressed */
var hpClicked = false;
var atkClicked = true;
var spdClicked = false;
var defClicked = false;
var resClicked = false;
var redClicked = true;
var blueClicked = true;
var greenClicked = true;
var colorlessClicked = true;
var physClicked = true;
var magicClicked = true;

function start() {
    d3.select("#scatter")
        .append("svg")
        .attr("id", "scatterplot");

    tip = d3.select("body").append("div")
        .attr("class", "tooltip")
        .style("opacity", 0)
        .style("display", "none");

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

    d3.csv("data/fehdata-weapons.csv", function(error, data) {
        if(error) throw error;
        for (var i in data) {
            var weapon = data[i].Name;
            if (data[i].Effective != "") {
                data[i].Effective = data[i].Effective.split(",");
            } else {
                data[i].Effective = "none";
            }
            if(data[i].Legendary == "TRUE") {
                data[i].Legendary = true;
            } else {
                data[i].Legendary = false;
            }
            data[i].Mt = +data[i].Mt;
            data[i].Range = +data[i].Range;
            data[i].Skill = data[i].Skill.split(",");
            weapons[weapon] = data[i];
        }
        console.log(weapons);
    });

    d3.csv("data/fehdata-assists.csv", function(error, data) {
        if(error) throw error;
        for (var i in data) {
            var assist = data[i].Name;
            if(data[i].Restriction == "") {
                data[i].Restriction = "none";
            } else {
                data[i].Restriction = data[i].Restriction.split(",");
            }
            if(data[i].Exclusive == "") {
                data[i].Exclusive = "none";
            } else if (data[i].Exclusive != "Unit") {
                data[i].Exclusive = data[i].Exclusive.split(",");
            }
            assists[assist] = data[i];
        }
        console.log(assists);
    });

    d3.csv("data/fehdata-specials.csv", function(error, data) {
        if(error) throw error;
        for (var i in data) {
            var special = data[i].Name;
            data[i].Turns = +data[i].Turns;
            if(data[i].Restriction == "") {
                data[i].Restriction = "none";
            } else {
                data[i].Restriction = data[i].Restriction.split(",");
            }
            if(data[i].Exclusive == "") {
                data[i].Exclusive = "none";
            } else {
                data[i].Exclusive = data[i].Exclusive.split(",");
            }
            specials[special] = data[i];
        }
        console.log(specials);
    });

    d3.csv("data/fehdata-skills-a.csv", function(error, data) {
        if(error) throw error;
        for (var i in data) {
            var skillA = data[i].Name;
            if(data[i].Restriction == "") {
                data[i].Restriction = "none";
            } else {
                data[i].Restriction = data[i].Restriction.split(",");
            }
            if(data[i].Exclusive == "") {
                data[i].Exclusive = "none";
            } else {
                data[i].Exclusive = data[i].Exclusive.split(",");
            }
            skillsA[skillA] = data[i];
        }
        console.log(skillsA);
    });

    d3.csv("data/fehdata-skills-b.csv", function(error, data) {
        if(error) throw error;
        for (var i in data) {
            var skillB = data[i].Name;
            if(data[i].Restriction == "") {
                data[i].Restriction = "none";
            } else {
                data[i].Restriction = data[i].Restriction.split(",");
            }
            if(data[i].Exclusive == "") {
                data[i].Exclusive = "none";
            } else {
                data[i].Exclusive = data[i].Exclusive.split(",");
            }
            skillsB[skillB] = data[i];
        }
        console.log(skillsB);
    });

    d3.csv("data/fehdata-skills-c.csv", function(error, data) {
        if(error) throw error;
        for (var i in data) {
            var skillC = data[i].Name;
            if(data[i].Exclusive == "") {
                data[i].Exclusive = "none";
            } else {
                data[i].Exclusive = data[i].Exclusive.split(",");
            }
            skillsC[skillC] = data[i];
        }
        console.log(skillsC);
    });

    /* unit info */
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
                units[unit]["results"] = false;
                units[unit]["onTeam"] = false;
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

//        y.domain([10,62]);

        scatterplot.selectAll(".dot").data(data)
            .enter().append("circle")
            .attr("class", "dot")
            .attr("id", function(d) {
                return "dot-"+d.Name;
            })
            .style("fill", function (d) {
                if (d.Color == "Red") {return colors[d.Color]};
                if (d.Color == "Blue") {return colors[d.Color]};
                if (d.Color == "Green") {return colors[d.Color]};
                if (d.Color == "Colorless") {return colors[d.Color]};
            })
            .attr("cx", function (d) {
                return x(+d.Total);
            })
            .attr("cy", function (d) {
                return y(+d.ATK)
            })
            .attr("r", 6)
            .on("mouseover", function (d) {
                tip.transition()
                    .duration(300)
                    .style("display", "inline")
                    .style("opacity", .8);
                tip.html("<p><b>" + d.Name + "</b></p><p><b>Weapon:</b> <br>" + d.Weapon + "</p><p><b>Range:<br></b>" + d.Range + "</p><p><b>Damage Type:<br></b> " + d["Damage Type"])
                    .style("left", (d3.event.pageX)+5 + "px")
                    .style("top", (d3.event.pageY)+5 + "px");
                d3.select(this)
                    .transition()
                    .duration(300)
                    .attr("r", 10)
            })
            .on("mouseout", function (d) {
                tip.transition()
                    .duration(500)
                    .style("opacity", 0);
                     d3.select(this)
                         .transition()
                         .duration(300)
                         .attr("r", function(d) {
                            if(d.results) {
                                return 10;
                            } else {
                                return 6;
                            }
                         })
            })
            .on("click", function(d) {
                console.log("hi");
                heroSearch(d.Name);
            });

        scatterplot.append("g")
            .attr("transform", "translate(" + s_padding / 2 + ",0)")
            .attr("class", "axis")
            .attr("id", "y-axis")
            .call(yAxis)
            .append("text")
            .attr("transform", "rotate(-90)")
            .attr("x", 0 - (s_height / 2))
            .attr("y", 0 - margin.left)
            .style("text-anchor", "middle")
            .text("stat");

        scatterplot.append("g")
            .attr("transform", "translate(0," + (s_height - s_padding) + ")")
            .attr("class", "axis")
            .call(xAxis)
            .selectAll("text")
            .style("text-anchor", "end")
            .attr("dx", "-.8em")
            .attr("dy", ".15em")
            .attr("transform", function (d) {
                return "rotate(-65)"
            })


        /* update scatter plot y-axis and y-value for selected stat */
        d3.selectAll(".stat-button").on("click", function() {
            resetStatButtons();

            var stat;

            if(d3.select(this).attr('id') == "hpButton") {
                hpClicked = true;
                stat = "HP";
            } else if(d3.select(this).attr('id') == "atkButton") {
                atkClicked = true;
                stat = "ATK";
            } else if(d3.select(this).attr('id') == "spdButton") {
                spdClicked = true;
                stat = "SPD";
            } else if(d3.select(this).attr('id') == "defButton") {
                spdClicked = true;
                stat = "DEF";
            } else if(d3.select(this).attr('id') == "resButton") {
                spdClicked = true;
                stat = "RES";
            }

            d3.select(this)
                .transition()
                .delay(function (d, i) {
                    return i * 100;
                })
                .style("background-color", colors.Stat);

            y.domain([
                d3.min(data, function(d) {
                    return +d[stat];
                })-1,
                d3.max(data, function(d) {
                    return +d[stat];
                })+1]);

            d3.select("#y-axis")
                .transition()
                .duration(750)
                .call(yAxis);

            d3.selectAll(".dot").data(data)
                .transition()
                .duration(750)
                .attr("cy", function (d) {
                    return y(+d[stat]);
                })
        })

        d3.selectAll(".color-button").on("click", function() {
            var stat;

            if(d3.select(this).attr('id') == "redButton") {
                redClicked = !redClicked;
            } else if(d3.select(this).attr('id') == "blueButton") {
                blueClicked = !blueClicked;
            } else if(d3.select(this).attr('id') == "greenButton") {
                greenClicked = !greenClicked;
            } else if(d3.select(this).attr('id') == "colorlessButton") {
                colorlessClicked = !colorlessClicked;
            }

            d3.select(this)
                .transition()
                .duration(200)
                .style("background-color", function() {
                    if(d3.select(this).attr('id') == "redButton") {
                        if(redClicked) {
                            return colors.Red;
                        } else {
                            return "white";
                        }
                    } else if(d3.select(this).attr('id') == "blueButton") {
                        if(blueClicked) {
                            return colors.Blue;
                        } else {
                            console.log("white");
                            return "white";
                        }
                    } else if(d3.select(this).attr('id') == "greenButton") {
                        if(greenClicked) {
                            return colors.Green;
                        } else {
                            return "white";
                        }
                    } else if(d3.select(this).attr('id') == "colorlessButton") {
                        if(colorlessClicked) {
                            return colors.Colorless;
                        } else {
                            return "white";
                        }
                    }
                })
                .style("color", function() {
                    if(d3.select(this).attr('id') == "redButton") {
                        if(redClicked) {
                            return "white";
                        } else {
                            return "black";
                        }
                    } else if(d3.select(this).attr('id') == "blueButton") {
                        if(blueClicked) {
                            return "white";
                        } else {
                            return "black";
                        }
                    } else if(d3.select(this).attr('id') == "greenButton") {
                        if(greenClicked) {
                            return "white";
                        } else {
                            return "black";
                        }
                    } else if(d3.select(this).attr('id') == "colorlessButton") {
                        if(colorlessClicked) {
                          return "white";
                        } else {
                          return "black";
                        }
                    }
                })
                .style("border-color", function() {
                    if(d3.select(this).attr('id') == "redButton") {
                        if(redClicked) {
                            return "white";
                        } else {
                            return "black";
                        }
                    } else if(d3.select(this).attr('id') == "blueButton") {
                        if(blueClicked) {
                            return "white";
                        } else {
                            return "black";
                        }
                    } else if(d3.select(this).attr('id') == "greenButton") {
                        if(greenClicked) {
                          return "white";
                        } else {
                          return "black";
                        }
                    } else if(d3.select(this).attr('id') == "colorlessButton") {
                        if(colorlessClicked) {
                          return "white";
                        } else {
                          return "black";
                        }
                    }
                });

            d3.selectAll(".dot")
                .transition()
                .duration(200)
                .style("display", function(d) {
                    if(!redClicked && d.Color == "Red" && !d.results & !d.onTeam) {
                        return "none";
                    }
                    if(!blueClicked && d.Color == "Blue" && !d.results & !d.onTeam) {
                        return "none";
                    }
                    if(!greenClicked && d.Color == "Green" && !d.results & !d.onTeam) {
                        return "none";
                    }
                    if(!colorlessClicked && d.Color == "Colorless" && !d.results & !d.onTeam) {
                        return "none";
                    }
                 });
        })

        d3.selectAll(".type-button").on("click", function() {
            if(d3.select(this).attr('id') == "physicalButton") {
                physClicked = !physClicked;
            } else if(d3.select(this).attr('id') == "magicalButton") {
                magicClicked = !magicClicked;
            }

            d3.select(this)
                .transition()
                .duration(200)
                .style("background-color", function() {
                    if(d3.select(this).attr('id') == "physicalButton") {
                        if(physClicked) {
                            return colors.Colorless;
                        } else {
                            return "white";
                        }
                    } else if(d3.select(this).attr('id') == "magicalButton") {
                        if(magicClicked) {
                            return colors.Colorless;
                        } else {
                            return "white";
                        }
                    }
                })
                .style("color", function() {
                    if(d3.select(this).attr('id') == "physicalButton") {
                        if(physClicked) {
                            return "white";
                        } else {
                            return "black";
                        }
                    } else if(d3.select(this).attr('id') == "magicalButton") {
                        if(magicClicked) {
                            return "white";
                        } else {
                            return "black";
                        }
                    }
                })
                .style("border-color", function() {
                    if(d3.select(this).attr('id') == "physicalButton") {
                        if(physClicked) {
                            return "white";
                        } else {
                            return "black";
                        }
                    } else if(d3.select(this).attr('id') == "magica;Button") {
                        if(magicClicked) {
                            return "white";
                        } else {
                            return "black";
                        }
                    }
                });

            d3.selectAll(".dot")
                .transition()
                .duration(200)
                .style("display", function(d) {
                    if(!physClicked && d["Damage Type"] == "Physical" && !d.results & !d.onTeam) {
                        return "none";
                    }
                    if(!magicClicked && d["Damage Type"] == "Magic" && !d.results & !d.onTeam) {
                        return "none";
                    }
                 });
        })
        console.log(units);
    });
}

/* Stat, Color Buttons Functions */

function resetStatButtons() {
    hpClicked = false;
    atkClicked = false;
    spdClicked = false;
    defClicked = false;
    resClicked = false;
    d3.selectAll(".stat-button").style("background-color", "white");
}

/* Search & results functions */

$(function() {
    $("#search").autocomplete({
        source: names,
        minLength: 0
    });
});

function heroClear(e) {
    var hero = e.id.split("-")[1];

    units[hero].results = false;

    d3.select("#dot-"+hero)
        .transition()
        .duration(400)
        .attr("r", function(d) {
           if(!d.onTeam) {
               return 6;
           } else {
               return 10;
           }
        });

    $(e).parent().remove();
}

function heroAdd(e) {
    if(team.length < 4) {
        var hero = e.id.split("-")[1];
        units[hero].results = false;
        units[hero].onTeam = true;
        team.push(hero);
        var buttons = "<button id='remove-"+hero+"' class='team-remove-button' onclick='teamClear(this)'>x</button>"
        $($(e).parent()).prependTo('#team').hide().slideDown(200);

        $($(e).parent()).prepend(buttons);
        $($(e).parent()).find(".remove-button").remove();
        $($(e).parent()).find(".add-button").remove();
    }
}

function resultsClear() {
    console.log(results);
    $('.results > .hero-search-table-red').remove();
    $('.results > .hero-search-table-blue').remove();
    $('.results > .hero-search-table-green').remove();
    $('.results > .hero-search-table-colorless').remove();


    for(var i in results) {
        units[results[i]].results = false;
    }
    console.log(units);

    results = [];

    d3.selectAll(".dot")
        .transition()
        .duration(400)
        .attr("r", function(d) {
            if(!d.onTeam) {
                return 6;
            } else {
                return 10;
            }
        });
}

function teamClear(e) {
    var hero = e.id.split("-")[1];

    d3.select("#dot-"+hero)
        .transition()
        .duration(400)
        .attr("r", function(d) {
            return 6;
        });

    console.log(team);
    var hero = e.id.split("-")[1];
    var i = team.indexOf(hero);
    team.splice(i,1);
    $(e).parent().remove();
    console.log(team);
}

function heroSearch(input) {
    var hero;
    if(input == null) {
        hero = $("#search").val();
    } else {
        hero = input;
    }

    var heroStats = statBlock(units[hero]);

    var bgcolor;

    if(units[hero].Color == "Red") {
        bgcolor = "red";
    } else if(units[hero].Color == "Blue") {
        bgcolor = "blue";
    } else if(units[hero].Color == "Green") {
        bgcolor = "green";
    } else if(units[hero].Color == "Colorless") {
        bgcolor = "colorless";
    }

    var newElement =
    "<div class='hero-search-table-"+bgcolor+"' id='"+hero+"' style='display:table'>"
        +"<h3 style='display:inline-flex;'>"+hero+"</h3>"
        +"<button id='remove-"+hero+"' class='remove-button' onclick='heroClear(this)'>x</button>"
        +"<button id='add-"+hero+"' class='add-button' onclick='heroAdd(this)'>+</button>"
            +"<div class='stats-tables'>"
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

    units[hero].results = true;

    results.push(hero);

    d3.select("#dot-"+hero)
        .transition()
        .duration(400)
        .attr("r", function(d) {
            return 10;
        });

    console.log(units)
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

$(document).ready(function(){
    $("#sim-button").click(function() {
        if($("#sim-container").css("display") == "none") {
            $("#build-container").fadeToggle("slow");
            $("#sim-container").fadeToggle("slow");
            importTeam(units, weapons, assists, specials, skillsA, skillsB, skillsC, team, colors);
        }
    })
})

$(document).ready(function(){
    $("#build-button").click(function() {
        if($("#build-container").css("display") == "none") {
            $("#sim-container").fadeToggle("slow");
            $("#build-container").fadeToggle("slow");
        }
    })
})

$(document).ready(function(){
    $(".skill-label").click(function() {
        var hero = this.id.split("-")[0];
        var toDisplay = "#"+this.id+"-info";
        var skill = this.id.split("-")[1];
        hero = team[+hero.split("o")[1] - 1];
        console.log(hero);
        var choice = "#"+this.id +"-choice";
        var text;
        if(choice.split("-")[1] == "Weapon") {
            text = "<p>Mt: "+weapons[$(choice).val()].Mt+"</p>"
            +"<p>Effect: "+weapons[$(choice).val()].Desc+"</p>";
        }
        $(toDisplay).html(text);
        $(toDisplay).slideToggle("slow");
    })
})