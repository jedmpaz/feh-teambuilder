var units = {};
var weapons = {};
var assists = {};
var specials = {};
var skillsA = {};
var skillsB = {};
var skillsC = {};
var skillsS = {};
var names = [];

d3.csv("data/fehdata-units.csv", function(error, data) {
    if (error) throw error;
    console.log(data);
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
    console.log(units);
});

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