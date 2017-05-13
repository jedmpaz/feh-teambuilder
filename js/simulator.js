function importTeam(units, team, colors) {
    $("#hero1-name").html(team[0]);
    $("#hero2-name").html(team[1]);
    $("#hero3-name").html(team[2]);
    $("#hero4-name").html(team[3]);

    for(var i=0; i<team.length; i++) {
        hero = team[i];
        id = "#hero" + (i+1);
        $(id+"name").html(team[i]);
        console.log(units[team[i]].HP);
        $(id+"-HP").html(units[team[i]].HP);
        $(id+"-ATK").html(units[team[i]].ATK);
        $(id+"-SPD").html(units[team[i]].SPD);
        $(id+"-DEF").html(units[team[i]].DEF);
        $(id+"-RES").html(units[team[i]].RES);
    }
}