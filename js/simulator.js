function importTeam(units, team, colors) {
    $("#hero1-name").html(team[0]);
    $("#hero2-name").html(team[1]);
    $("#hero3-name").html(team[2]);
    $("#hero4-name").html(team[3]);

    for(var i=0; i<team.length; i++) {
        hero = team[i];
        id = "#hero" + (i+1);
        $(id+"name").html(team[i]);

    }

    $("#hero1").css("border-color", colors[units[team[0]].Color]);
    $("#hero2").css("border-color", colors[units[team[1]].Color]);
    $("#hero3").css("border-color", colors[units[team[2]].Color]);
    $("#hero4").css("border-color", colors[units[team[3]].Color]);
}