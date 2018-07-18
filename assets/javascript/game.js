// 1. user selects their character to begin game

    // a. users character moves from current div to new div
    // b. banner changes to select enemy

// 2. user selects charcter to begin battling

    // a. enemy character moves from current div to new div
    // b. attack button appears
    // c. banner changes to click attack

// 3. user starts fight on attack press

    // a. banner disappears
    // b. hp and at of player decrease/increase
    // c. enemy hp goes down
    // d. rinse and repeat until win or loss protocol

// On User Win/Loss

    // 1. write result
    // 2. restart button appear

$(document).ready(function() {

    var luke = {
        photo:"../images/nWC25HX79HEF1.jpg" ,
        name: "Luke Skywalker",
        health: 120,
        attack: 20,
        counterAttack: 5    
    }
    $(".lukeName").html(luke.name);
    $(".lukeHealth").html("HP: " + luke.health);
    $(".lukeAttack").html("AT: " + luke.attack);

    var vader = {
        photo:"../images/images.jpg" ,
        name: "Darth Vader",
        health: 140,
        attack: 15,
        counterAttack: 10
    }
    $(".vaderName").html(vader.name);
    $(".vaderHealth").html("HP: " + vader.health);
    $(".vaderAttack").html("AT: " + vader.attack);

    var windu = {
        photo:"../images/download.jpg" ,
        name: "Mace Windu",
        health: 160,
        attack: 10,
        counterAttack: 15
    }
    $(".winduName").html(windu.name);
    $(".winduHealth").html("HP: " + windu.health);
    $(".winduAttack").html("AT: " + windu.attack);

    var revan = {
        photo:"../images/download-1.jpg" ,
        name: "Darth Revan",
        health: 180,
        attack: 5,
        counterAttack: 20
    }
    $(".revanName").html(revan.name);
    $(".revanHealth").html("HP: " + revan.health);
    $(".revanAttack").html("AT: " + revan.attack);


    // array of legends
    var arrLegends = [];

    // array that holds user fighter
    var arrUser = [];

    // array for enemy fighter
    var arrEnemy = [];

    // $(".luke").html(luke);


    function initializeGame() {

        arrUser = [];
        arrEnemy = [];
        arrLegends.push(luke , vader , windu , revan);
        console.log(arrLegends);

    };

   function playerSelect() {

        if (arrUser.length === 1){
            $(".banner2").addClass("invisible");
            $(".banner3").removeClass("invisible"); // "banner" changes instructions
            arrLegends.splice(this.index);
            arrEnemy.push(this);
            console.log(arrEnemy);
        }
            else {
                $(".banner").addClass("invisible");
                $(".banner2").removeClass("invisible"); // "banner" changes instructions
                arrLegends.slice(this.index);
                arrUser.push(this);
                console.log(this);
                console.log(arrUser);
            };

    };

    $(".luke").click(function() {

        // proto player select if else
        if (".userArea" === -1) {
            // progresses instructons
            $(".banner").addClass("invisible");
            $(".banner2").removeClass("invisible");
            // changes DOM
            $(".luke").appendTo(".userArea");
            // return true

        }
            else {
                $(".banner2").addClass("invisible");
                $(".banner3").removeClass("invisible");
                $(".luke").appendTo(".defenderArea");
            };
            
    });

    $(".vader").click(function() {

        // proto player select if else
        if (".userArea" === -1) {
            // progresses instructons
            $(".banner").addClass("invisible");
            $(".banner2").removeClass("invisible");
            // changes DOM
            $(".vader").appendTo(".userArea");
            // return true

        }
            else {
                $(".banner2").addClass("invisible");
                $(".banner3").removeClass("invisible");
                $(".vader").appendTo(".defenderArea");
            };
            
    });
    $(".windu").click(function() {

        // proto player select if else
        if (".userArea" === -1) {
            // progresses instructons
            $(".banner").addClass("invisible");
            $(".banner2").removeClass("invisible");
            // changes DOM
            $(".windu").appendTo(".userArea");
            // return true

        }
            else {
                $(".banner2").addClass("invisible");
                $(".banner3").removeClass("invisible");
                $(".windu").appendTo(".defenderArea");
            };
            
    });
    $(".revan").click(function() {

        // proto player select if else
        if (".userArea" === -1) {
            // progresses instructons
            $(".banner").addClass("invisible");
            $(".banner2").removeClass("invisible");
            // changes DOM
            $(".revan").appendTo(".userArea");
            // return true

        }
            else {
                $(".banner2").addClass("invisible");
                $(".banner3").removeClass("invisible");
                $(".revan").appendTo(".defenderArea");
            };
            
    });


    // $(".attackButton").click(function() {


    // });

    initializeGame();

});