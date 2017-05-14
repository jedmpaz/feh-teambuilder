function importTeam(units, weapons, assists, specials, skillsA, skillsB, skillsC, team, colors) {
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

    for(var i=0; i<team.length; i++) {
        hero = team[i];
        id = "#hero" + (i+1);
        if($(id+"-name").html() != hero) {
            $(id+"-name").html(team[i]);
            $(id+"-HP").html(units[team[i]].HP);
            $(id+"-ATK").html(units[team[i]].ATK);
            $(id+"-SPD").html(units[team[i]].SPD);
            $(id+"-DEF").html(units[team[i]].DEF);
            $(id+"-RES").html(units[team[i]].RES);
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
            } else if(units[hero].Color == "Colorless" && units[hero]["Weapon Type"] == "Bow") {
                daggers.push(i);
            } else if(units[hero].Color == "Colorless" && units[hero]["Weapon Type"] == "Bow") {
                staves.push(i);
            }

            /* update weapons menu */
            if(weapons[units[hero].Weapon].Legendary) {
                $(id+"-Weapon-choice").append($("<option></option>").attr("value", units[hero].Weapon).text(units[hero].Weapon));
            }
            for(var j in weaponList) {
                $(id+"-Weapon-choice").append($("<option></option>").attr("value", weaponList[j]).text(weaponList[j]));
            }
            $(id+"-Weapon-choice").val(units[hero].Weapon);

            /* update assists menu */
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
        }
    }
}