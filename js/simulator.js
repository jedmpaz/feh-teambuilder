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
        HP: {base: 0, skill: 0, iv: 0},
        ATK: {base: 0, weapon: 0, skill: 0, iv: 0, buff: 0, debuff: 0, spur: 0},
        SPD: {base: 0, skill: 0, iv: 0, buff: 0, debuff: 0,spur: 0},
        DEF: {base: 0, skill: 0, iv: 0, buff: 0, debuff: 0,spur: 0},
        RES: {base: 0, skill: 0, iv: 0, buff: 0, debuff: 0,spur: 0}
    },
    {
        HP: {base: 0, skill: 0, iv: 0},
        ATK: {base: 0, weapon: 0, skill: 0, iv: 0, buff: 0, debuff: 0, spur: 0},
        SPD: {base: 0, skill: 0, iv: 0, buff: 0, debuff: 0,spur: 0},
        DEF: {base: 0, skill: 0, iv: 0, buff: 0, debuff: 0,spur: 0},
        RES: {base: 0, skill: 0, iv: 0, buff: 0, debuff: 0,spur: 0}
    },
    {
        HP: {base: 0, skill: 0, iv: 0},
        ATK: {base: 0, weapon: 0, skill: 0, iv: 0, buff: 0, debuff: 0, spur: 0},
        SPD: {base: 0, skill: 0, iv: 0, buff: 0, debuff: 0,spur: 0},
        DEF: {base: 0, skill: 0, iv: 0, buff: 0, debuff: 0,spur: 0},
        RES: {base: 0, skill: 0, iv: 0, buff: 0, debuff: 0,spur: 0}
    },
    {
        HP: {base: 0, skill: 0, iv: 0},
        ATK: {base: 0, weapon: 0, skill: 0, iv: 0, buff: 0, debuff: 0, spur: 0},
        SPD: {base: 0, skill: 0, iv: 0, buff: 0, debuff: 0,spur: 0},
        DEF: {base: 0, skill: 0, iv: 0, buff: 0, debuff: 0,spur: 0},
        RES: {base: 0, skill: 0, iv: 0, buff: 0, debuff: 0,spur: 0}
    }];

var simSingleHero = {
    HP: {base: 0, skill: 0, iv: 0},
    ATK: {base: 0, weapon: 0, skill: 0, iv: 0, buff: 0, debuff: 0, spur: 0},
    SPD: {base: 0, skill: 0, iv: 0, buff: 0, debuff: 0,spur: 0},
    DEF: {base: 0, skill: 0, iv: 0, buff: 0, debuff: 0,spur: 0},
    RES: {base: 0, skill: 0, iv: 0, buff: 0, debuff: 0,spur: 0}
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

            $(id+"-HP").html(heroStats[i].HP.base + heroStats[i].HP.skill);
            $(id+"-ATK").html(heroStats[i].ATK.base + heroStats[i].ATK.weapon + heroStats[i].ATK.skill);
            $(id+"-SPD").html(heroStats[i].SPD.base + heroStats[i].SPD.skill + (weapons[$(id+"-Weapon-choice").val()].Tag == "brave" ? -5 : 0));
            $(id+"-DEF").html(heroStats[i].DEF.base + heroStats[i].DEF.skill);
            $(id+"-RES").html(heroStats[i].RES.base + heroStats[i].RES.skill);
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

    $(id+"-HP").html(simSingleHero.HP.base + simSingleHero.HP.skill);
    $(id+"-ATK").html(simSingleHero.ATK.base + simSingleHero.ATK.weapon + simSingleHero.ATK.skill);
    $(id+"-SPD").html(simSingleHero.SPD.base + simSingleHero.SPD.skill + (weapons[$(id+"-Weapon-choice").val()].Tag == "brave" ? -5 : 0));
    $(id+"-DEF").html(simSingleHero.DEF.base + simSingleHero.DEF.skill);
    $(id+"-RES").html(simSingleHero.RES.base + simSingleHero.RES.skill);
}

function updateStats(id, i) {
    if(id == "#simhero") {
        for(var skill in heroStats[i]) {
            $(id+"-"+skill).html(
                simSingleHero[skill].base
                +simSingleHero[skill].skill
                +simSingleHero[skill].iv
                +(skill != "HP" ? simSingleHero[skill].buff : 0)
                +(skill != "HP" ? simSingleHero[skill].debuff : 0)
                +(skill != "HP" ? simSingleHero[skill].spur : 0)
                +(skill == "ATK" ? simSingleHero.ATK.weapon : 0)
                +(skill == "SPD" && weapons[$(id+"-Weapon-choice").val()].Tag == "brave" ? -5 : 0)
            )
        }
    } else {
        for(var skill in heroStats[i]) {
            $(id+"-"+skill).html(
                heroStats[i][skill].base
                +heroStats[i][skill].skill
                +heroStats[i][skill].iv
                +(skill != "HP" ? heroStats[i][skill].buff : 0)
                +(skill != "HP" ? heroStats[i][skill].debuff : 0)
                +(skill != "HP" ? heroStats[i][skill].spur : 0)
                +(skill == "ATK" ? heroStats[i].ATK.weapon : 0)
                +(skill == "SPD" && weapons[$(id+"-Weapon-choice").val()].Tag == "brave" ? -5 : 0)
            )
        }
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
});

