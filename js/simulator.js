var units, weapons, assists, specials, skillsA, skillsB, skillsC, team, colors;

var redSwords = [];
var blueLances = [];
var greenAxes = [];
var redTomes = [];
var blueTomes = [];
var greenTomes = [];
var breathWeapons = [];
var bows = [];
var daggers = [];
var staves = [];

var heroStats = [
    {
        HP: {total: 0, base: 0, skill: 0, iv: 0},
        ATK: {total: 0, base: 0, weapon: 0, skill: 0, iv: 0, buff: 0, debuff: 0, spur: 0},
        SPD: {total: 0, base: 0, skill: 0, iv: 0, buff: 0, debuff: 0,spur: 0},
        DEF: {total: 0, base: 0, skill: 0, iv: 0, buff: 0, debuff: 0,spur: 0},
        RES: {total: 0, base: 0, skill: 0, iv: 0, buff: 0, debuff: 0,spur: 0}
    },
    {
        HP: {total: 0, base: 0, skill: 0, iv: 0},
        ATK: {total: 0, base: 0, weapon: 0, skill: 0, iv: 0, buff: 0, debuff: 0, spur: 0},
        SPD: {total: 0, base: 0, skill: 0, iv: 0, buff: 0, debuff: 0,spur: 0},
        DEF: {total: 0, base: 0, skill: 0, iv: 0, buff: 0, debuff: 0,spur: 0},
        RES: {total: 0, base: 0, skill: 0, iv: 0, buff: 0, debuff: 0,spur: 0}
    },
    {
        HP: {total: 0, base: 0, skill: 0, iv: 0},
        ATK: {total: 0, base: 0, weapon: 0, skill: 0, iv: 0, buff: 0, debuff: 0, spur: 0},
        SPD: {total: 0, base: 0, skill: 0, iv: 0, buff: 0, debuff: 0,spur: 0},
        DEF: {total: 0, base: 0, skill: 0, iv: 0, buff: 0, debuff: 0,spur: 0},
        RES: {total: 0, base: 0, skill: 0, iv: 0, buff: 0, debuff: 0,spur: 0}    },
    {
        HP: {total: 0, base: 0, skill: 0, iv: 0},
        ATK: {total: 0, base: 0, weapon: 0, skill: 0, iv: 0, buff: 0, debuff: 0, spur: 0},
        SPD: {total: 0, base: 0, skill: 0, iv: 0, buff: 0, debuff: 0,spur: 0},
        DEF: {total: 0, base: 0, skill: 0, iv: 0, buff: 0, debuff: 0,spur: 0},
        RES: {total: 0, base: 0, skill: 0, iv: 0, buff: 0, debuff: 0,spur: 0}
    }];

var simSingleHero = {
    HP: {total: 0, base: 0, skill: 0, iv: 0},
    ATK: {total: 0, base: 0, weapon: 0, skill: 0, iv: 0, buff: 0, debuff: 0, spur: 0},
    SPD: {total: 0, base: 0, skill: 0, iv: 0, buff: 0, debuff: 0,spur: 0},
    DEF: {total: 0, base: 0, skill: 0, iv: 0, buff: 0, debuff: 0,spur: 0},
    RES: {total: 0, base: 0, skill: 0, iv: 0, buff: 0, debuff: 0,spur: 0}
}

function loadData(u, w, a, s, sA, sB, sC, t, c) {
    units = u;
    weapons = w;
    assists = a;
    specials = s;
    skillsA = sA;
    skillsB = sB;
    skillsC = sC;
    team = t;
    colors = c;
}

function importTeam() {

    console.log(heroStats);

    /* putting generic/inheritable weapons into arrays for later */
    for(var i in weapons) {
        if(weapons[i].Color == "Red" && weapons[i]["Weapon Type"] == "Sword" && !weapons[i].Legendary) {
            redSwords.push(i);
        } else if(weapons[i].Color == "Red" && weapons[i]["Weapon Type"] == "Tome" && !weapons[i].Legendary) {
            redTomes.push(i);
        } else if(weapons[i].Color == "Blue" && weapons[i]["Weapon Type"] == "Lance" && !weapons[i].Legendary) {
            blueLances.push(i);
        } else if(weapons[i].Color == "Blue" && weapons[i]["Weapon Type"] == "Tome" && !weapons[i].Legendary) {
            blueTomes.push(i);
        } else if(weapons[i].Color == "Green" && weapons[i]["Weapon Type"] == "Axe" && !weapons[i].Legendary) {
            greenAxes.push(i);
        } else if(weapons[i].Color == "Green" && weapons[i]["Weapon Type"] == "Tome" && !weapons[i].Legendary) {
            greenTomes.push(i);
        } else if(weapons[i]["Weapon Type"] == "Dragonstone" && !weapons[i].Legendary) {
            breathWeapons.push(i);
        } else if(weapons[i].Color == "Colorless" && weapons[i]["Weapon Type"] == "Bow" && !weapons[i].Legendary) {
            bows.push(i);
        } else if(weapons[i].Color == "Colorless" && weapons[i]["Weapon Type"] == "Daggers" && !weapons[i].Legendary) {
            daggers.push(i);
        } else if(weapons[i].Color == "Colorless" && weapons[i]["Weapon Type"] == "Staff" && !weapons[i].Legendary) {
            staves.push(i);
        }
    }

    if(!$("sim-unit-select").val()) {
        for(var i in units) {
            $("#sim-unit-select").append($("<option></option>").attr("value", units[i].Name).text(units[i].Name));
        }
        $("#sim-unit-select").val("Abel");
        simHeroStats();
    }

    for(var i=0; i<team.length; i++) {
        hero = team[i];
        id = "#hero" + (i+1);
        if($(id+"-name").html() != hero) {
            $(id+"-name").html(team[i]);

            var hp, atk, spd, def, res;

            $(id).css("border-color", colors[units[hero].Color]);
            var weaponList;
            if(units[hero].Color == "Red" && units[hero]["Weapon Type"] == "Sword") {
                weaponList = redSwords;
            } else if(units[hero].Color == "Red" && units[hero]["Weapon Type"] == "Tome") {
                weaponList = redTomes;
            } else if(units[hero].Color == "Blue" && units[hero]["Weapon Type"] == "Lance") {
                weaponList = blueLances;
            } else if(units[hero].Color == "Blue" && units[hero]["Weapon Type"] == "Tome") {
                weaponList = blueTomes;
            } else if(units[hero].Color == "Green" && units[hero]["Weapon Type"] == "Axe") {
                weaponList = greenAxes;
            } else if(units[hero].Color == "Green" && units[hero]["Weapon Type"] == "Tome") {
                weaponList = greenTomes;
            } else if(units[hero]["Weapon Type"] == "Dragonstone") {
                weaponList = breathWeapons;
            } else if(units[hero].Color == "Colorless" && units[hero]["Weapon Type"] == "Bow") {
                weaponList = bows;
            } else if(units[hero].Color == "Colorless" && units[hero]["Weapon Type"] == "Dagger") {
                weaponList = daggers;
            } else if(units[hero].Color == "Colorless" && units[hero]["Weapon Type"] == "Staff") {
                weaponList = staves;
            }

            /* update weapons menu */
            $(id+"-Weapon-choice").empty();
            if(weapons[units[hero].Weapon].Legendary) {
                $(id+"-Weapon-choice").append($("<option></option>").attr("value", units[hero].Weapon).text(units[hero].Weapon));
            }
            for(var j in weaponList) {
                $(id+"-Weapon-choice").append($("<option></option>").attr("value", weaponList[j]).text(weaponList[j]));
            }
            $(id+"-Weapon-choice").val(units[hero].Weapon);

            /* update assists menu */
            $(id+"-Assist-choice").empty();
            for(var j in assists) {
                if(assists[j].Restriction == "none" && assists[j].Exclusive == "none") {
                    $(id+"-Assist-choice").append($("<option></option>").attr("value", assists[j].Name).text(assists[j].Name));
                } else if(assists[j].Restriction == "none" && assists[j].Exclusive[1] == units[hero][assists[j].Exclusive[0]] && assists[j].Exclusive != "Unit") {
                    $(id+"-Assist-choice").append($("<option></option>").attr("value", assists[j].Name).text(assists[j].Name));
                } else if(assists[j].Restriction[1] != units[hero][assists[j].Restriction[0]] && assists[j].Exclusive == "none") {
                    $(id+"-Assist-choice").append($("<option></option>").attr("value", assists[j].Name).text(assists[j].Name));
                } else if(assists[j].Exclusive == "Unit" && assists[j].Name == units[hero].Assist) {
                    $(id+"-Assist-choice").append($("<option></option>").attr("value", assists[j].Name).text(assists[j].Name));
                }
            }
            $(id+"-Assist-choice").append($("<option></option>").attr("value", "none").text("-"));
            if(units[hero].Assist == "") {
                $(id+"-Assist-choice").val("none");
            } else {
                $(id+"-Assist-choice").val(units[hero].Assist);
            }

            /* update specials menu */
            $(id+"-Special-choice").empty();
            for(var j in specials) {
                if(specials[j].Restriction == "none" && specials[j].Exclusive == "none") {
                    $(id+"-Special-choice").append($("<option></option>").attr("value", specials[j].Name).text(specials[j].Name));
                } else if(specials[j].Restriction == "none" && specials[j].Exclusive[1] == units[hero][specials[j].Exclusive[0]]) {
                    $(id+"-Special-choice").append($("<option></option>").attr("value", specials[j].Name).text(specials[j].Name));
                } else if(specials[j].Restriction[1] != units[hero][specials[j].Restriction[0]] && specials[j].Exclusive == "none") {
                    $(id+"-Special-choice").append($("<option></option>").attr("value", specials[j].Name).text(specials[j].Name));
                }
            }
            $(id+"-Special-choice").append($("<option></option>").attr("value", "none").text("-"));
            if(units[hero].Special == "") {
                $(id+"-Special-choice").val("none");
            } else {
                $(id+"-Special-choice").val(units[hero].Special);
                $(id+"-totalcharge").html("/ "+specials[units[hero].Special].Turns);
            }

            /* update A-skills menu */
            $(id+"-SkillA-choice").empty();
            for(var j in skillsA) {
                if(skillsA[j].Restriction == "none" && skillsA[j].Exclusive == "none") {
                    $(id+"-SkillA-choice").append($("<option></option>").attr("value", skillsA[j].Name).text(skillsA[j].Name));
                } else if(skillsA[j].Restriction == "none" && skillsA[j].Exclusive[1] == units[hero][skillsA[j].Exclusive[0]]) {
                    $(id+"-SkillA-choice").append($("<option></option>").attr("value", skillsA[j].Name).text(skillsA[j].Name));
                } else if(skillsA[j].Restriction[1] != units[hero][skillsA[j].Restriction[0]] && skillsA[j].Exclusive == "none") {
                    $(id+"-SkillA-choice").append($("<option></option>").attr("value", skillsA[j].Name).text(skillsA[j].Name));
                }
            }
            $(id+"-SkillA-choice").append($("<option></option>").attr("value", "none").text("-"));
            if(units[hero].SkillA == "") {
                $(id+"-SkillA-choice").val("none");
            } else {
                $(id+"-SkillA-choice").val(units[hero].SkillA);
            }

            /* update B-skills menu */
            $(id+"-SkillB-choice").empty();
            for(var j in skillsB) {
                if(skillsB[j].Restriction == "none" && skillsB[j].Exclusive == "none") {
                    $(id+"-SkillB-choice").append($("<option></option>").attr("value", skillsB[j].Name).text(skillsB[j].Name));
                } else if(skillsB[j].Restriction == "none" && skillsB[j].Exclusive[1] == units[hero][skillsB[j].Exclusive[0]]) {
                    $(id+"-SkillB-choice").append($("<option></option>").attr("value", skillsB[j].Name).text(skillsB[j].Name));
                } else if(skillsB[j].Restriction[1] != units[hero][skillsB[j].Restriction[0]] && skillsB[j].Exclusive == "none") {
                    $(id+"-SkillB-choice").append($("<option></option>").attr("value", skillsB[j].Name).text(skillsB[j].Name));
                }
            }
            $(id+"-SkillB-choice").append($("<option></option>").attr("value", "none").text("-"));
            if(units[hero].SkillB == "") {
                $(id+"-SkillB-choice").val("none");
            } else {
                $(id+"-SkillB-choice").val(units[hero].SkillB);
            }

            /* update C-skills menu */
            $(id+"-SkillC-choice").empty();
            for(var j in skillsC) {
                if(skillsC[j].Exclusive == "none") {
                    $(id+"-SkillC-choice").append($("<option></option>").attr("value", skillsC[j].Name).text(skillsC[j].Name));
                } else if(skillsC[j].Exclusive[1] == units[hero][skillsC[j].Exclusive[0]]) {
                    $(id+"-SkillC-choice").append($("<option></option>").attr("value", skillsC[j].Name).text(skillsC[j].Name));
                }
            }
            $(id+"-SkillC-choice").append($("<option></option>").attr("value", "none").text("-"));
            if(units[hero].SkillC == "") {
                $(id+"-SkillC-choice").val("none");
            } else {
                $(id+"-SkillC-choice").val(units[hero].SkillC);
            }

            heroStats[i].HP.base = units[team[i]].HP;

            heroStats[i].ATK.base = units[team[i]].ATK;
            heroStats[i].ATK.weapon = weapons[units[hero].Weapon].Mt;

            heroStats[i].SPD.base = units[team[i]].SPD;

            heroStats[i].DEF.base = units[team[i]].DEF;

            heroStats[i].RES.base = units[team[i]].RES;

            var increases;
            if(skillsA[units[hero].SkillA].Type == "stat") {
                increases = skillsA[units[hero].SkillA].Effect.split(",");
                console.log(increases);
                for(var j in increases) {
                    heroStats[i][increases[j].split("+")[0]].skill = +increases[j].split("+")[1];
                }
            } else if(skillsA[units[hero].SkillA].Type == "fury") {
                heroStats[i].ATK.skill = +skillsA[units[hero].SkillA].Effect;
                heroStats[i].SPD.skill = +skillsA[units[hero].SkillA].Effect;
                heroStats[i].DEF.skill = +skillsA[units[hero].SkillA].Effect;
                heroStats[i].RES.skill = +skillsA[units[hero].SkillA].Effect;
            }

            $(id+"-Boon").val("neutral");
            $(id+"-Bane").val("neutral");

            for(var skill in heroStats[i]) {
                total = heroStats[i][skill].base
                    +heroStats[i][skill].skill
                    +heroStats[i][skill].iv
                    +(skill != "HP" ? heroStats[i][skill].buff : 0)
                    +(skill != "HP" ? heroStats[i][skill].debuff : 0)
                    +(skill != "HP" ? heroStats[i][skill].spur : 0)
                    +(skill == "ATK" ? heroStats[i].ATK.weapon : 0)
                    +(skill == "SPD" && weapons[$(id+"-Weapon-choice").val()].Tag == "brave" ? -5 : 0);
                heroStats[i][skill].total = total;
                $(id+"-"+skill).html(total)
            }
        }
    }
}

function simHeroStats() {
    hero = $("#sim-unit-select").val();
    id = "#simhero";

    $("#battle-sim-controls").css("border-color", colors[units[hero].Color]);
    var weaponList;
    if(units[hero].Color == "Red" && units[hero]["Weapon Type"] == "Sword") {
        weaponList = redSwords;
    } else if(units[hero].Color == "Red" && units[hero]["Weapon Type"] == "Tome") {
        weaponList = redTomes;
    } else if(units[hero].Color == "Blue" && units[hero]["Weapon Type"] == "Lance") {
        weaponList = blueLances;
    } else if(units[hero].Color == "Blue" && units[hero]["Weapon Type"] == "Tome") {
        weaponList = blueTomes;
    } else if(units[hero].Color == "Green" && units[hero]["Weapon Type"] == "Axe") {
        weaponList = greenAxes;
    } else if(units[hero].Color == "Green" && units[hero]["Weapon Type"] == "Tome") {
        weaponList = greenTomes;
    } else if(units[hero]["Weapon Type"] == "Dragonstone") {
        weaponList = breathWeapons;
    } else if(units[hero].Color == "Colorless" && units[hero]["Weapon Type"] == "Bow") {
        weaponList = bows;
    } else if(units[hero].Color == "Colorless" && units[hero]["Weapon Type"] == "Dagger") {
        weaponList = daggers;
    } else if(units[hero].Color == "Colorless" && units[hero]["Weapon Type"] == "Staff") {
        weaponList = staves;
    }

    /* update weapons menu */
    $(id+"-Weapon-choice").empty();
    if(weapons[units[hero].Weapon].Legendary) {
        $(id+"-Weapon-choice").append($("<option></option>").attr("value", units[hero].Weapon).text(units[hero].Weapon));
    }
    for(var j in weaponList) {
        $(id+"-Weapon-choice").append($("<option></option>").attr("value", weaponList[j]).text(weaponList[j]));
    }
    $(id+"-Weapon-choice").val(units[hero].Weapon);

    /* update assists menu */
    $(id+"-Assist-choice").empty();
    for(var j in assists) {
        if(assists[j].Restriction == "none" && assists[j].Exclusive == "none") {
            $(id+"-Assist-choice").append($("<option></option>").attr("value", assists[j].Name).text(assists[j].Name));
        } else if(assists[j].Restriction == "none" && assists[j].Exclusive[1] == units[hero][assists[j].Exclusive[0]] && assists[j].Exclusive != "Unit") {
            $(id+"-Assist-choice").append($("<option></option>").attr("value", assists[j].Name).text(assists[j].Name));
        } else if(assists[j].Restriction[1] != units[hero][assists[j].Restriction[0]] && assists[j].Exclusive == "none") {
            $(id+"-Assist-choice").append($("<option></option>").attr("value", assists[j].Name).text(assists[j].Name));
        } else if(assists[j].Exclusive == "Unit" && assists[j].Name == units[hero].Assist) {
            $(id+"-Assist-choice").append($("<option></option>").attr("value", assists[j].Name).text(assists[j].Name));
        }
    }
    $(id+"-Assist-choice").append($("<option></option>").attr("value", "none").text("-"));
    if(units[hero].Assist == "") {
        $(id+"-Assist-choice").val("none");
    } else {
        $(id+"-Assist-choice").val(units[hero].Assist);
    }

    /* update specials menu */
    $(id+"-Special-choice").empty();
    for(var j in specials) {
        if(specials[j].Restriction == "none" && specials[j].Exclusive == "none") {
            $(id+"-Special-choice").append($("<option></option>").attr("value", specials[j].Name).text(specials[j].Name));
        } else if(specials[j].Restriction == "none" && specials[j].Exclusive[1] == units[hero][specials[j].Exclusive[0]]) {
            $(id+"-Special-choice").append($("<option></option>").attr("value", specials[j].Name).text(specials[j].Name));
        } else if(specials[j].Restriction[1] != units[hero][specials[j].Restriction[0]] && specials[j].Exclusive == "none") {
            $(id+"-Special-choice").append($("<option></option>").attr("value", specials[j].Name).text(specials[j].Name));
        }
    }
    $(id+"-Special-choice").append($("<option></option>").attr("value", "none").text("-"));
    if(units[hero].Special == "") {
        $(id+"-Special-choice").val("none");
    } else {
        $(id+"-Special-choice").val(units[hero].Special);
        $(id+"-totalcharge").html("/ "+specials[units[hero].Special].Turns);
    }

    /* update A-skills menu */
    $(id+"-SkillA-choice").empty();
    for(var j in skillsA) {
        if(skillsA[j].Restriction == "none" && skillsA[j].Exclusive == "none") {
            $(id+"-SkillA-choice").append($("<option></option>").attr("value", skillsA[j].Name).text(skillsA[j].Name));
        } else if(skillsA[j].Restriction == "none" && skillsA[j].Exclusive[1] == units[hero][skillsA[j].Exclusive[0]]) {
            $(id+"-SkillA-choice").append($("<option></option>").attr("value", skillsA[j].Name).text(skillsA[j].Name));
        } else if(skillsA[j].Restriction[1] != units[hero][skillsA[j].Restriction[0]] && skillsA[j].Exclusive == "none") {
            $(id+"-SkillA-choice").append($("<option></option>").attr("value", skillsA[j].Name).text(skillsA[j].Name));
        }
    }
    $(id+"-SkillA-choice").append($("<option></option>").attr("value", "none").text("-"));
    if(units[hero].SkillA == "") {
        $(id+"-SkillA-choice").val("none");
    } else {
        $(id+"-SkillA-choice").val(units[hero].SkillA);
    }

    /* update B-skills menu */
    $(id+"-SkillB-choice").empty();
    for(var j in skillsB) {
        if(skillsB[j].Restriction == "none" && skillsB[j].Exclusive == "none") {
            $(id+"-SkillB-choice").append($("<option></option>").attr("value", skillsB[j].Name).text(skillsB[j].Name));
        } else if(skillsB[j].Restriction == "none" && skillsB[j].Exclusive[1] == units[hero][skillsB[j].Exclusive[0]]) {
            $(id+"-SkillB-choice").append($("<option></option>").attr("value", skillsB[j].Name).text(skillsB[j].Name));
        } else if(skillsB[j].Restriction[1] != units[hero][skillsB[j].Restriction[0]] && skillsB[j].Exclusive == "none") {
            $(id+"-SkillB-choice").append($("<option></option>").attr("value", skillsB[j].Name).text(skillsB[j].Name));
        }
    }
    $(id+"-SkillB-choice").append($("<option></option>").attr("value", "none").text("-"));
    if(units[hero].SkillB == "") {
        $(id+"-SkillB-choice").val("none");
    } else {
        $(id+"-SkillB-choice").val(units[hero].SkillB);
    }

    /* update C-skills menu */
    $(id+"-SkillC-choice").empty();
    for(var j in skillsC) {
        if(skillsC[j].Exclusive == "none") {
            $(id+"-SkillC-choice").append($("<option></option>").attr("value", skillsC[j].Name).text(skillsC[j].Name));
        } else if(skillsC[j].Exclusive[1] == units[hero][skillsC[j].Exclusive[0]]) {
            $(id+"-SkillC-choice").append($("<option></option>").attr("value", skillsC[j].Name).text(skillsC[j].Name));
        }
    }
    $(id+"-SkillC-choice").append($("<option></option>").attr("value", "none").text("-"));
    if(units[hero].SkillC == "") {
        $(id+"-SkillC-choice").val("none");
    } else {
        $(id+"-SkillC-choice").val(units[hero].SkillC);
    }
    simSingleHero.HP.base = units[hero].HP;

    simSingleHero.ATK.base = units[hero].ATK;
    simSingleHero.ATK.weapon = weapons[units[hero].Weapon].Mt;

    simSingleHero.SPD.base = units[hero].SPD;

    simSingleHero.DEF.base = units[hero].DEF;

    simSingleHero.RES.base = units[hero].RES;

    var increases;
    if(skillsA[units[hero].SkillA].Type == "stat") {
        increases = skillsA[units[hero].SkillA].Effect.split(",");
        console.log(increases);
        for(var j in increases) {
            simSingleHero[increases[j].split("+")[0]].skill = +increases[j].split("+")[1];
        }
    } else if(skillsA[units[hero].SkillA].Type == "fury") {
        simSingleHero.ATK.skill = +skillsA[units[hero].SkillA].Effect;
        simSingleHero.SPD.skill = +skillsA[units[hero].SkillA].Effect;
        simSingleHero.DEF.skill = +skillsA[units[hero].SkillA].Effect;
        simSingleHero.RES.skill = +skillsA[units[hero].SkillA].Effect;
    }

    $(id+"-Boon").val("neutral");
    $(id+"-Bane").val("neutral");

    for(var skill in simSingleHero) {
        total = simSingleHero[skill].base
            +simSingleHero[skill].skill
            +simSingleHero[skill].iv
            +(skill != "HP" ? simSingleHero[skill].buff : 0)
            +(skill != "HP" ? simSingleHero[skill].debuff : 0)
            +(skill != "HP" ? simSingleHero[skill].spur : 0)
            +(skill == "ATK" ? simSingleHero.ATK.weapon : 0)
            +(skill == "SPD" && weapons[$(id+"-Weapon-choice").val()].Tag == "brave" ? -5 : 0);
        simSingleHero[skill].total = total;
        $(id+"-"+skill).html(total)
    }
}



function updateStats(id, i) {
    var total;
    if(id == "#simhero") {
        for(var skill in simSingleHero) {
            total = simSingleHero[skill].base
                +simSingleHero[skill].skill
                +simSingleHero[skill].iv
                +(skill != "HP" ? simSingleHero[skill].buff : 0)
                +(skill != "HP" ? simSingleHero[skill].debuff : 0)
                +(skill != "HP" ? simSingleHero[skill].spur : 0)
                +(skill == "ATK" ? simSingleHero.ATK.weapon : 0)
                +(skill == "SPD" && weapons[$(id+"-Weapon-choice").val()].Tag == "brave" ? -5 : 0);
            simSingleHero[skill].total = total;
            $(id+"-"+skill).html(total)
        }
    } else {
        for(var skill in heroStats[i]) {
            total = heroStats[i][skill].base
                +heroStats[i][skill].skill
                +heroStats[i][skill].iv
                +(skill != "HP" ? heroStats[i][skill].buff : 0)
                +(skill != "HP" ? heroStats[i][skill].debuff : 0)
                +(skill != "HP" ? heroStats[i][skill].spur : 0)
                +(skill == "ATK" ? heroStats[i].ATK.weapon : 0)
                +(skill == "SPD" && weapons[$(id+"-Weapon-choice").val()].Tag == "brave" ? -5 : 0)
            heroStats[i][skill].total = total;
            $(id+"-"+skill).html(total)
        }
    }
}

function calcAttack(attacker, defender, i) {
    var atk;
    var heroID;
    if(i == "simhero") {
        atk = simSingleHero.ATK.total;
        heroID = "#simhero";
    } else {
        atk = heroStats[i].ATK.total;
        heroID = "#hero"+(+i+1);
    }
    var results = "";
    if(heroID != "#simhero") {
        if($(heroID+"-SkillA-choice").val().includes("Death Blow")) {
            var combatBonus = +skillsA[$(heroID+"-SkillA-choice").val()].Effect.split("+")[1];
            atk += +skillsA[$(heroID+"-SkillA-choice").val()].Effect.split("+")[1];
            results += "<p>"+attacker+" gains "+combatBonus+" ATK from "+$(heroID+"-SkillA-choice").val()+"</p>";
        } else if($(heroID+"-SkillA-choice").val().includes("Swift Sparrow")) {
            atk += +skillsA[$(heroID+"-SkillA-choice").val()].Effect.split(",")[0].split("+")[1];
            results += "<p>"+attacker+" gains "+combatBonus+" ATK from "+$(heroID+"-SkillA-choice").val()+"</p>";
        }
    }
    var attackerWTA = 1;
    var effective = 1;
    if(heroID == "#simhero") {
        if(weapons[$("#simhero-Weapon-choice").val()].Effective != "none") {
            if(weapons[$("#simhero-Weapon-choice").val()].Effective[1] == units[attacker].Movement) {
                effective = 1.5;
                results += "<p>"+defender+"'s ATK is multiplied by "+effective+" because "+$("#simhero-Weapon-choice").val()+" is effective vs "+units[attacker].Movement+" Units</p>";
            }
            if(weapons[$("#simhero-Weapon-choice").val()].Effective[1] == units[attacker]["Weapon Type"]) {
                effective = 1.5;
                results += "<p>"+defender+"'s ATK is multiplied by "+effective+" because "+$("#simhero-Weapon-choice").val()+" is effective vs Dragons</p>";
            }
        }
    } else {
        if(weapons[$(heroID+"-Weapon-choice").val()].Effective != "none") {
            if(weapons[$(heroID+"-Weapon-choice").val()].Effective[1] == units[defender].Movement) {
                effective = 1.5;
                results += "<p>"+attacker+"'s ATK is multiplied by "+effective+" because "+$(heroID+"-Weapon-choice").val()+" is effective vs "+units[defender].Movement+" Units</p>";
            }
            if(weapons[$(heroID+"-Weapon-choice").val()].Effective[1] == units[defender]["Weapon Type"]) {
                effective = 1.5;
                results += "<p>"+attacker+"'s ATK is multiplied by "+effective+" because "+$(heroID+"-Weapon-choice").val()+" is effective vs Dragons</p>";
            }
        }
    }

    switch(units[attacker].Color) {
        case "Red":
            switch(units[defender].Color) {
                case "Blue":
                    attackerWTA = 0.8;
                    results += "<p>"+attacker+"'s ATK is multiplied by "+attackerWTA+" due to Weapon Triangle Advantage</p>";
                    break;
                case "Green":
                    attackerWTA = 1.2;
                    results += "<p>"+attacker+"'s ATK is multiplied by "+attackerWTA+" due to Weapon Triangle Advantage</p>";
                    break;
            }
            break;
        case "Blue":
            switch(units[defender].Color) {
                case "Green":
                    attackerWTA = 0.8;
                    results += "<p>"+attacker+"'s ATK is multiplied by "+attackerWTA+" due to Weapon Triangle Advantage</p>";
                    break;
                case "Red":
                    attackerWTA = 1.2;
                    results += "<p>"+attacker+"'s ATK is multiplied by "+attackerWTA+" due to Weapon Triangle Advantage</p>";
                    break;
            }
            break;
        case "Green":
            switch(units[defender].Color) {
                case "Red":
                    attackerWTA = 0.8;
                    results += "<p>"+attacker+"'s ATK is multiplied by "+attackerWTA+" due to Weapon Triangle Advantage</p>";
                    break;
                case "Blue":
                    attackerWTA = 1.2;
                    results += "<p>"+attacker+"'s ATK is multiplied by "+attackerWTA+" due to Weapon Triangle Advantage</p>";
                    break;
            }
            break;
    }
    return [Math.floor(attackerWTA*effective*atk), results];
};

function calcSpeed(attacker, i) {
    var spd;
    var heroID;
    var results = "";
    if(i == "simhero") {
        spd = simSingleHero.SPD.total;
        heroID = "#simhero";
    } else {
        spd = heroStats[i].SPD.total;
        heroID = "#hero"+(+i+1);
    }
    if(heroID != "#simhero") {
        if($(heroID+"-SkillA-choice").val().includes("Darting Blow")) {
            var combatBonus = +skillsA[$(heroID+"-SkillA-choice").val()].Effect.split("+")[1];
            spd += +skillsA[$(heroID+"-SkillA-choice").val()].Effect.split("+")[1];
            results += "<p>"+attacker+" gains "+combatBonus+" SPD from "+$(heroID+"-SkillA-choice").val()+"</p>";
        }   else if($(heroID+"-SkillA-choice").val().includes("Swift Sparrow")) {
            spd += +skillsA[$(heroID+"-SkillA-choice").val()].Effect.split(",")[1].split("+")[1];
            results += "<p>"+attacker+" gains "+combatBonus+" SPD from "+$(heroID+"-SkillA-choice").val()+"</p>";
        }
    }
    return [spd,results];
}

function calcDefense(attacker, i) {
    var def;
    var heroID;
    var results = "";
    if(i == "simhero") {
        def = simSingleHero.DEF.total;
        heroID = "#simhero";
    } else {
        def = heroStats[i].DEF.total;
        heroID = "#hero"+(+i+1);
    }
    console.log("DEF: " + def);
    if(heroID != "#simhero") {
        if($(heroID+"-SkillA-choice").val().includes("Armored Blow")) {
            var combatBonus = +skillsA[$(heroID+"-SkillA-choice").val()].Effect.split("+")[1];
            def += +skillsA[$(heroID+"-SkillA-choice").val()].Effect.split("+")[1];
            results += "<p>"+attacker+" gains "+combatBonus+" DEF from "+$(heroID+"-SkillA-choice").val()+"</p>";
        }
    }
    console.log("DEF: " + def);
    return [def,results];
}

function calcResistance(attacker, i) {
    var res;
    var heroID;
    var results = "";
    if(i == "simhero") {
        def = simSingleHero.RES.total;
        heroID = "#simhero";
    } else {
        def = heroStats[i].RES.total;
        heroID = "#hero"+(+i+1);
    }
    if(heroID != "#simhero") {
        if($(heroID+"-SkillA-choice").val().includes("Warding Blow")) {
            var combatBonus = +skillsA[$(heroID+"-SkillA-choice").val()].Effect.split("+")[1];
            def += +skillsA[$(heroID+"-SkillA-choice").val()].Effect.split("+")[1];
            results += "<p>"+attacker+" gains "+combatBonus+" RES from "+$(heroID+"-SkillA-choice").val()+"</p>";
        }
    }
    return [res,results];
}

function victory(attacker, defender, attackerRemainingHP) {
    var results = ("<p>"+attacker+" wins, "+attackerRemainingHP+" HP remaining</p>");
    return results;
}

function combat() {
    var heroID;
    var results;
    var damageDealt;
    var attackerDouble = false;
    var defenderDouble = false;
    var counter = true;
    var attacker;
    var attackerID;
    var attackerATKinCombat;
    var defenderATKinCombat;
    var attackerSPDinCombat;
    var defenderSPDinCombat;
    var attackerDEFinCombat;
    var defenderDEFinCombat;
    var attackerRESinCombat;
    var defenderRESinCombat;
    var defenderRemainingHP;
    var attackerWTA;
    var defenderWTA;
    var attackerCharges;
    var defenderCharges;
    var attackerTotalCharges;
    var defenderTotalCharges;
    var defender = $("#sim-unit-select").val();
    for(var i in team) {
        attackerDouble = false;
        defenderDouble = false;
        counter = true;
        results = "";
        attacker = team[i];
        heroID = "#hero"+(+i+1);
        attackerCharges = +$(heroID+"-charge").val();
        defenderCharges = +$("#simhero-charge").val();
        attackerTotalCharges = +$(heroID+"-totalcharge").html().split(" ")[1];
        defenderTotalCharges = +$("#simhero-totalcharge").html().split(" ")[1];
        attackerRemainingHP = heroStats[i].HP.total;
        defenderRemainingHP = simSingleHero.HP.total;

        attackerATKinCombat = calcAttack(attacker, defender, i);
        results += attackerATKinCombat[1];
        attackerATKinCombat = attackerATKinCombat[0];

        attackerSPDinCombat = calcSpeed(attacker, i);
        results += attackerSPDinCombat[1];
        attackerSPDinCombat = attackerSPDinCombat[0];
        defenderSPDinCombat = calcSpeed(defender, "simhero")[0];

        attackerDEFinCombat = calcDefense(attacker, i);
        results += attackerDEFinCombat[1];
        attackerDEFinCombat = attackerDEFinCombat[0];
        defenderDEFinCombat = calcDefense(defender, "simhero")[0];

        attackerRESinCombat = calcResistance(attacker, i);
        results += attackerRESinCombat[1];
        attackerRESinCombat = attackerRESinCombat[0];
        defenderRESinCombat = calcResistance(defender, "simhero")[0];

        if(attackerSPDinCombat - defenderSPDinCombat >= 5) {
            attackerDouble = true;
        } else if (defenderSPDinCombat - attackerSPDinCombat >= 5) {
            defenderDouble = true;
        } else if ($("#simhero-SkillB-choice").val().includes("Quick Riposte")) {
            defenderDouble = true;
        }

        /* attacker -> defender */
        damageDealt = (attackerATKinCombat - defenderDEFinCombat >= 0 ? attackerATKinCombat - defenderDEFinCombat : 0);
        if(attackerCharges == attackerTotalCharges) {
            results += "<p>"+attacker+" activates "+$(heroID+"-Special-choice").val()+"</p>";
            var boost = specialHandler(attacker, $(heroID+"-Special-choice").val());
            damageDealt += boost;
            results += "<p>"+attacker+" deals an additional "+boost+" damage!</p>";
            attackerCharges == 0;
        }
        results += "<p>"+attacker+" deals "+damageDealt+" damage to "+defender+"</p>";
        defenderRemainingHP = (defenderRemainingHP - damageDealt >=0 ? defenderRemainingHP - damageDealt : 0);
        results += "<p>"+attacker+": "+attackerRemainingHP+" HP // "+defender+": "+defenderRemainingHP+" HP</p>"
        if(defenderRemainingHP == 0) {
            results+=victory(attacker, defender, attackerRemainingHP);
            counter = false;
            attackerDouble = false;
        } else if(weapons[$(heroID+"-Weapon-choice").val()].Tag == "brave") {
            results += "<p>"+attacker+" attacks again immediately due to "+$(heroID+"-Weapon-choice").val()+"</p>";
            results += "<p>"+attacker+" deals "+damageDealt+" damage to "+defender+"</p>";
            defenderRemainingHP = (defenderRemainingHP - damageDealt >=0 ? defenderRemainingHP - damageDealt : 0);
            results += "<p>"+attacker+": "+attackerRemainingHP+" HP // "+defender+": "+defenderRemainingHP+" HP</p>";
            if(defenderRemainingHP == 0) {
                results+=victory(attacker, defender, attackerRemainingHP);
                counter = false;
                attackerDouble = false;
            }
        }

        /* check to see if defender can counter */
        if(units[attacker].Range == "Melee" && units[defender].Range != "Melee" && units[defender].SkillA != "Close Counter") {
            counter = false;
        }
        if(units[attacker].Range == "Ranged" && units[defender].Range != "Ranged" && units[defender].SkillA != "Distant Counter") {
            counter = false;
        }

        /* defender -> attacker */
        if(counter) {
            defenderATKinCombat = calcAttack(defender, attacker, "simhero");
            results += defenderATKinCombat[1];
            defenderATKinCombat = defenderATKinCombat[0];
            damageDealt = (defenderATKinCombat - attackerDEFinCombat >= 0 ? defenderATKinCombat - attackerDEFinCombat : 0);
            results += "<p>"+defender+" counterattacks and deals "+damageDealt+" damage to "+attacker+"</p>";
            attackerRemainingHP = (attackerRemainingHP - damageDealt >=0 ? attackerRemainingHP - damageDealt : 0);
            results += "<p>"+attacker+": "+attackerRemainingHP+" HP // "+defender+": "+defenderRemainingHP+" HP</p>"
            if(attackerRemainingHP == 0) {
                results+=victory(defender, attacker, defenderRemainingHP);
                counter = false;
                attackerDouble = false;
            }
        }

        /* attacker double */
        if(attackerDouble) {
            results += "<p>"+attacker+" makes a follow-up attack</p>";
            damageDealt = (attackerATKinCombat - defenderDEFinCombat >= 0 ? attackerATKinCombat - defenderDEFinCombat : 0);
            results += "<p>"+attacker+" deals "+damageDealt+" damage to "+defender+"</p>";
            defenderRemainingHP = (defenderRemainingHP - damageDealt >=0 ? defenderRemainingHP - damageDealt : 0);
            results += "<p>"+attacker+": "+attackerRemainingHP+" HP // "+defender+": "+defenderRemainingHP+" HP</p>";
            if(defenderRemainingHP == 0) {
                results+=victory(attacker, defender, attackerRemainingHP);
                counter = false;
                attackerDouble = false;
            } else if (weapons[$(heroID+"-Weapon-choice").val()].Tag == "brave") {
                results += "<p>"+attacker+" attacks again immediately due to "+$(heroID+"-Weapon-choice").val()+"</p>";
                results += "<p>"+attacker+" deals "+damageDealt+" damage to "+defender+"</p>";
                defenderRemainingHP -= damageDealt;
                results += "<p>"+attacker+": "+attackerRemainingHP+" HP // "+defender+": "+defenderRemainingHP+" HP</p>";
                if(defenderRemainingHP == 0) {
                    results+=victory(attacker, defender, attackerRemainingHP);
                    counter = false;
                    attackerDouble = false;
                }
            }
        }

        if ($("#simhero-SkillB-choice").val().includes("Quick Riposte")) {
            results += "<p>"+defender+" activates Quick Riposte</p>";
            defenderDouble = true;
        }

        /* defender double OR quick riposte */
        if(counter && defenderDouble) {
            results += "<p>"+attacker+" makes a follow-up attack</p>";
            damageDealt = (defenderATKinCombat - attackerDEFinCombat >= 0 ? defenderATKinCombat - attackerDEFinCombat : 0);
            results += "<p>"+defender+" makes a follow-up counterattacks and deals "+damageDealt+" damage to "+attacker+"</p>";
            attackerRemainingHP = (attackerRemainingHP - damageDealt >=0 ? attackerRemainingHP - damageDealt : 0);
            results += "<p>"+attacker+": "+attackerRemainingHP+" HP // "+defender+": "+defenderRemainingHP+" HP</p>";
            if(attackerRemainingHP == 0) {
                results+=victory(defender, attacker, defenderRemainingHP);
            }
        }

        if($(heroID+"-SkillA-choice").val().includes("Fury")) {
            var furydmg = skillsA[$(heroID+"-SkillA-choice").val()].Effect;
            attackerRemainingHP -= furydmg;
            results += "<p>"+attacker+" takes "+furydmg+" from Fury</p>"
            results += "<p>"+attacker+": "+attackerRemainingHP+" HP // "+defender+": "+defenderRemainingHP+" HP</p>"
        }
        $(heroID+"-single-results").append(results);
        if($(heroID+"-single-results").css("display") == "none") {
            $(heroID+"-single-results").slideToggle("slow");
        }
    }
}

function specialHandler(hero, special) {
    if(specials[special].Tag == "boost") {
        var stat = specials[special].Effect.split(",")[0];
        var mult = +specials[special].Effect.split(",")[1];
        var boost = units[hero][stat]*mult;
        return Math.floor(boost);
    }
}

$(document).ready(function(){
    $("#sim-unit-select").change(function() {
        var hero = $(this).val();
        $("#simhero-Weapon-choice").empty();
        $("#simhero-Assist-choice").empty();
        $("#simhero-Special-choice").empty();
        $("#simhero-SkillA-choice").empty();
        $("#simhero-SkillB-choice").empty();
        $("#simhero-SkillC-choice").empty();
        simHeroStats();
    });

    /* stat changes upon selecting a new weapon/skill */
    $(".sim-selector").change(function() {
        var hero = this.id.split("-")[0];
        var id;
        if(hero == "simhero") {
            hero = $("#sim-unit-select").val();
            id = "#simhero";
        } else {
            id = "#"+hero;
            var i = +hero.split("o")[1] - 1;
            hero = team[+hero.split("o")[1] - 1];
        }
        var skill = this.id.split("-")[1];
        console.log(id);
        if(skill == "Weapon") {
            if(id == "#simhero") {
                simSingleHero.ATK.weapon = weapons[$(this).val()].Mt;
                updateStats(id, 0);
            } else {
                heroStats[i].ATK.weapon = weapons[$(this).val()].Mt;
                updateStats(id, i);
            }
        } else if(skill == "SkillA") {
            var increases;
            if(skillsA[$(this).val()].Type == "stat") {
                increases = skillsA[$(this).val()].Effect.split(",");
                console.log(increases);
                for(var j in increases) {
                    if(id == "#simhero") {
                        simSingleHero[increases[j].split("+")[0]].skill = +increases[j].split("+")[1];
                        updateStats(id, 0);
                    } else {
                        heroStats[i][increases[j].split("+")[0]].skill = +increases[j].split("+")[1];
                        updateStats(id, i);
                    }
                }
            } else if(skillsA[$(this).val()].Type == "fury") {
                if(id == "#simhero") {
                    simSingleHero.ATK.skill = +skillsA[$(this).val()].Effect;
                    simSingleHero.SPD.skill = +skillsA[$(this).val()].Effect;
                    simSingleHero.DEF.skill = +skillsA[$(this).val()].Effect;
                    simSingleHero.RES.skill = +skillsA[$(this).val()].Effect;
                    updateStats(id, i);
                } else {
                    heroStats[i].ATK.skill = +skillsA[$(this).val()].Effect;
                    heroStats[i].SPD.skill = +skillsA[$(this).val()].Effect;
                    heroStats[i].DEF.skill = +skillsA[$(this).val()].Effect;
                    heroStats[i].RES.skill = +skillsA[$(this).val()].Effect;
                    updateStats(id, i);
                }
            }
        } else if(skill == "Special") {
            $(id+"-totalcharge").html("/ "+specials[$(this).val()].Turns);
            $(id+"-totalcharge").val(specials[$(this).val()].Turns);
        }
        var text;
        var toDisplay = "#"+this.id.split("-")[0]+"-"+this.id.split("-")[1]+"-info";
        var choice = "#"+this.id;
        if(choice.split("-")[1] == "Weapon") {
            text = "<p>Mt: "+weapons[$(choice).val()].Mt+"</p>"
            +"<p>Effect: "+weapons[$(choice).val()].Desc+"</p>";
        } else if(choice.split("-")[1] == "Assist") {
            text ="<p>"+assists[$(choice).val()].Desc+"</p>";
        } else if(choice.split("-")[1] == "Special") {
            text ="<p>"+specials[$(choice).val()].Desc+"</p>";
        } else if(choice.split("-")[1] == "SkillA") {
            text ="<p>"+skillsA[$(choice).val()].Desc+"</p>";
        } else if(choice.split("-")[1] == "SkillB") {
            text ="<p>"+skillsB[$(choice).val()].Desc+"</p>";
        } else if(choice.split("-")[1] == "SkillC") {
            text ="<p>"+skillsC[$(choice).val()].Desc+"</p>";
        } else if(choice.split("-")[1] == "SkillS") {
            text ="<p>"+skillsS[$(choice).val()].Desc+"</p>";
        }
        $(toDisplay).html(text);
    })

    /* boon and bane stat changes */
    $(".boon-selector").change(function() {
        var hero = this.id.split("-")[0];
        var id = "#"+hero;
        var i = +hero.split("o")[1] - 1;
        hero = team[+hero.split("o")[1] - 1];
        var skill = $(this).val();
        increase = 3;
        for(var j in heroStats[i]) {
            if($(id+"-Bane").val() != j) {
                heroStats[i][j].iv = 0;
            }
        }
        if(skill != "neutral") {
            for(var j in units[hero].Boon4) {
                if(skill == units[hero].Boon4[j]) {
                    increase = 4;
                }
            }
            heroStats[i][skill].iv = increase;
        }
        if(skill == $(id+"-Bane").val()) {
            $(id+"-Bane").val("neutral");
        }
        updateStats(id, i);
    })
    $(".bane-selector").change(function() {
        var hero = this.id.split("-")[0];
        var id = "#"+hero;
        var i = +hero.split("o")[1] - 1;
        hero = team[+hero.split("o")[1] - 1];
        var skill = $(this).val();
        decrease = -3;
        for(var j in heroStats[i]) {
            if($(id+"-Boon").val() != j) {
                console.log(j)
                heroStats[i][j].iv = 0;
            }
        }
        if(skill != "neutral") {
            for(var j in units[hero].Bane4) {
                if(skill == units[hero].Bane4[j]) {
                    decrease = -4;
                }
            }
            heroStats[i][skill].iv = decrease;
        }
        if(skill == $(id+"-Boon").val()) {
            $(id+"-Boon").val("neutral");
        }
        updateStats(id, i);
    })
    $(".skill-label").click(function() {
        var hero = this.id.split("-")[0];
        var toDisplay = "#"+this.id+"-info";
        var skill = this.id.split("-")[1];
        hero = team[+hero.split("o")[1] - 1];
        var choice = "#"+this.id +"-choice";
        var text;
        if($(choice).val() != "none") {
            if(choice.split("-")[1] == "Weapon") {
                text = "<p>Mt: "+weapons[$(choice).val()].Mt+"<br>"
                +"Effect: "+weapons[$(choice).val()].Desc+"</p>";
            } else if(choice.split("-")[1] == "Assist") {
                text ="<p>"+assists[$(choice).val()].Desc+"</p>";
            } else if(choice.split("-")[1] == "Special") {
                text ="<p>"+specials[$(choice).val()].Desc+"</p>";
            } else if(choice.split("-")[1] == "SkillA") {
                text ="<p>"+skillsA[$(choice).val()].Desc+"</p>";
            } else if(choice.split("-")[1] == "SkillB") {
                text ="<p>"+skillsB[$(choice).val()].Desc+"</p>";
            } else if(choice.split("-")[1] == "SkillC") {
                text ="<p>"+skillsC[$(choice).val()].Desc+"</p>";
            } else if(choice.split("-")[1] == "SkillS") {
                text ="<p>"+skillsS[$(choice).val()].Desc+"</p>";
            }
            $(toDisplay).html(text);
            $(toDisplay).slideToggle("slow");
        }
    });
    $(".skill-label").hover(function() {
        var hero = this.id.split("-")[0];
        if(hero == "simhero") {
            hero = $("#sim-unit-select").val();
        } else {
            hero = team[+hero.split("o")[1] - 1];
        }
        $(this).css("color", colors[units[hero].Color]);
    }, function() {
        $(this).css("color", "black");
    });
    $("#single-unit-sim").hover(function() {
        hero = $("#sim-unit-select").val();
        $(this).css("color", colors[units[hero].Color]);
        $(this).css("border", "2px solid black");
    }, function() {
        $(this).css("color", "black");
        $(this).css("border", "2px solid white");
    })
    $("#single-unit-sim").click(function() {
        $("#sim-single-results").empty();
        $("#hero1-single-results").empty();
        $("#hero2-single-results").empty();
        $("#hero3-single-results").empty();
        $("#hero4-single-results").empty();
        combat();
    })
});

