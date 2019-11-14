var a = {
    money: 10,
    value: 0,
    curr: [
        0, 0, 0, 0, 0, 0,
    ],
    gens: [
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0]
    ],
    price: [
        [1e+1, 1e+2, 1e+3, 1e+4],
        [1e+2, 1e+4, 1e+6, 1e+8],
        [1e+4, 1e+6, 1e+8, 1e+10],
        [1e+6, 1e+8, 1e+10, 1e+12],
        [1e+8, 1e+10, 1e+12, 1e+14],
        [1e+10, 1e+12, 1e+14, 1e+16]
    ],
    genName: ["Noobs: ", "", "", "Pros: "],
    upgrades: [
        [0, 0, 0, 0, 0],
        [100, 10000, 1000000, 100000000, 10000000000],
        ["CU", "JU", "PU", "SU", "NU"]
    ],
    side: 0,
    pp: 0 
};

var savegame = JSON.parse(localStorage.getItem("lucasClickerSave"));
if (savegame !== null) {
  a = savegame;
}

function getWidth() {
    return Math.max(
        document.body.scrollWidth,
        document.documentElement.scrollWidth,
        document.body.offsetWidth,
        document.documentElement.offsetWidth,
        document.documentElement.clientWidth
    );
}

function expo(x) {
    if (x >= 10000){
    var toReturn = Number.parseFloat(x).toExponential(1);
    return toReturn.replace("+", "");
    }
    return x;
}

function update(){
    var browserWidth = getWidth();
    if (browserWidth > 500){
        a.genName[1] = "Students: ";
        a.genName[2] = "Graduateds: ";
    } else{
        a.genName[1] = "Studs: ";
        a.genName[2] = "Grads: ";
    }
    if(a.pp > 0){
        document.getElementById("money").innerHTML = "You have: $" + expo(a.money) + " and " + expo(a.pp) + "PP";
    } else document.getElementById("money").innerHTML = "You have: $" + expo(a.money);
    document.getElementById("launch").innerHTML = "Launch page for: $" + expo(a.value);
    if (a.side == 0){
        document.getElementById("HA").innerHTML = "You have: " + expo(a.curr[0]) + " HTML";
        document.getElementById("CA").innerHTML = "You have: " + expo(a.curr[1]) + " CSS";
        document.getElementById("JA").innerHTML = "You have: " + expo(a.curr[2]) + " JS";
    }
    else{
        document.getElementById("HA").innerHTML = "You have: " + expo(a.curr[3]) + " PHP";
        document.getElementById("CA").innerHTML = "You have: " + expo(a.curr[4]) + " SQL";
        document.getElementById("JA").innerHTML = "You have: " + expo(a.curr[5]) + " Node.JS";
    }
    for (var i=0; i < 3; i++){
        for (var j=0; j < 4; j++){
            var aux = i.toString(10);
            aux += j.toString(10);
            var type = i + a.side * 3;
            document.getElementById(aux).innerHTML = 
            a.genName[j] + expo(a.gens[type][j]) + "<br>$" + expo(a.price[type][j]);
        }
    }
    if (a.side == 0) document.getElementById("side").innerHTML = "In Client Side";
    else document.getElementById("side").innerHTML = "In Server Side";
    if(a.gens[5][3] > 0){
        document.getElementById("prestige").style.display = "inline-block";
        document.getElementById("prestige").innerHTML = "Prestige for " + a.gens[5][3] + " PP"
    }
    else{
        document.getElementById("prestige").style.display = "none";
    }
}

function buyGen(x, y){
    x += a.side * 3;
    if(a.money >= a.price[x][y] && (x == 0 || a.upgrades[0][x-1])){
        a.gens[x][y]++;
        a.money -= a.price[x][y];
        a.price[x][y] = Math.trunc(a.price[x][y] * 1.25);
    }
}

function saveGame(automatic){
    localStorage.setItem("lucasClickerSave", JSON.stringify(a));
    if (!automatic){
    document.getElementById("save").style.backgroundColor = "#81F499";
    window.setTimeout(
        function(){document.getElementById("save").style.backgroundColor = "#899E8B";}, 2000
    )}
}

function deleteSave(){
    var input = window.prompt("THIS WILL REMOVE YOUR SAVE\nTYPE -DELETE MY SAVE- TO PROCEED");
    if (input == "DELETE MY SAVE"){
    localStorage.removeItem("lucasClickerSave");
    window.location.reload();
    }
}

function generate(){
    for (var i = 0; i < 6; i++){
        for (var j = 0; j < 4; j++){
            if (j==0){
                a.curr[i] += a.gens[i][j];
            }else{
                a.gens[i][j-1] += a.gens[i][j];
            }
        }
    }
    a.value = 0;
    for (var i = 0; i < 6; i++){
        a.value += a.curr[i] * Math.pow(8, i) * Math.trunc((a.pp) / 10 + 1);
    }
}

function launchPage(){
    a.money += a.value;
    a.curr = [0, 0, 0, 0, 0, 0];
}

function showUpgrades(){
    document.getElementById("upgrades").style.display = "table";
}

function hideUpgrades(){
    document.getElementById("upgrades").style.display = "none";
}

function buyUpgrade(num){
    if (a.money > a.upgrades[1][num] && (a.upgrades[0][num] == 0)){
        a.money -= a.upgrades[1][num];
        a.upgrades[0][num] = 1;
        document.getElementById(a.upgrades[2][num]).innerHTML = "Upgrade Unlocked"
    }
}

function changeSide(){
    if (a.side == 1){
        a.side = 0;
    } else{
        a.side = 1;
    }
}

function prestige(){
    a.pp += a.gens[5][3];
    for (var i=0; i < 6; i++){
        for (var j=0; j < 4; j++){
            a.gens[i][j] = 0;
        }
    }
    for (var i=0; i < 6; i++){
        a.curr[i] = 0;
    }
    a.money = 10;
}

window.setInterval(
    function(){
        update();
    }, 100
);

window.setInterval(
    function(){
        generate();
    }, 1000
);

window.setInterval(
    saveGame(true), 15000
)