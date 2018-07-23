$(document).ready(function() {

//******************************************************************************//
// Global Variables
//******************************************************************************//

    var legends = {
        "Luke Skywalker": {
            image: "assets/images/luke.jpg" ,
            name: "Luke Skywalker",
            health: 120,
            attack: 20,
            counterAttack: 5    
        },
        "Darth Vader": {
            image:"assets/images/vader.jpg" ,
            name: "Darth Vader",
            health: 140,
            attack: 15,
            counterAttack: 10
        },
        "Mace Windu": {
            image:"assets/images/windu.jpg" ,
            name: "Mace Windu",
            health: 160,
            attack: 10,
            counterAttack: 15
        },
        "Darth Revan": {
            image:"assets/images/revan.jpg" ,
            name: "Darth Revan",
            health: 180,
            attack: 5,
            counterAttack: 20
        }
    };

    var userLegend;
    var enemyLegend;
    var arrLegends = [];
    // Will keep track of turns during combat. Used for calculating player damage.
    var turnCounter = 1;
    // Tracks number of defeated opponents.
    var killCount = 0;

//******************************************************************************//
// "Game Initialize" Phase
//******************************************************************************//

    function initializeCharacters(character, renderArea) {
        // builds the character card and renders it to the page
        var charDiv = $("<div class='character' data-name='" + character.name + "'>");
        var charImage = $("<img alt='image' class='character-image'>").attr("src", character.image);
        var charName = $("<div class='character-name'>").text(character.name);
        var charHealth = $("<div class='character-health'>").text("HP: " + character.health);
        var charAttack = $("<div class='character-attack'>").text("AT: " + character.attack);
        charDiv.append(charImage).append(charName).append(charHealth).append(charAttack);
        $(renderArea).append(charDiv);
    };

    // makes character cards and resets game
    function initializeGame() {
        for (var key in legends) {
            initializeCharacters(legends[key], ".fighterStart");
        }
    };

    initializeGame();

//******************************************************************************//
//
//******************************************************************************//

    // updates character placement
    function updateCharacter(charObj, areaRender) {
        $(areaRender).empty();
        initializeCharacters(charObj, areaRender);
    };

    // renders the available-to-attack enemies
    function renderEnemies(array) {
        for (var i = 0; i < array.length; i++) {
        initializeCharacters(array[i], ".challengers");
        }
    };

    // Function which handles restarting the game after victory or defeat.
    function restartGame(resultMessage) {
        // When the 'Restart' button is clicked, reload the page.
        var restart = $("<button>Restart</button>").click(function() {
            location.reload();
        });

        // Build div that will display the victory/defeat message.
        var gameState = $("<div>").text(resultMessage);

        // Render the restart button and victory/defeat message to the page.
        $(".button").append(gameState);
        $(".button").append(restart);
    };

//******************************************************************************//
// Click Functions
//******************************************************************************//

     // On click event for selecting our character.
    $(".fighterStart").on("click", ".character", function() {
        // Saving the clicked character's name.
        var name = $(this).attr("data-name");

        // If a player character has not yet been chosen...
        if (!userLegend) {
            // We populate attacker with the selected character's information.
            userLegend = legends[name];
            // We then loop through the remaining characters and push them to the combatants array.
            for (var key in legends) {
                if (key !== name) {
                arrLegends.push(legends[key]);
                }
            }

            $(".fighterStart").hide();
            $(".banner").addClass("invisible");
            $(".banner2").removeClass("invisible");

            // Then render our selected character and our combatants.
            updateCharacter(userLegend, ".userArea");
            renderEnemies(arrLegends);
        }
    });

    // Creates an on click event for each enemy.
    $(".challengers").on("click", ".character", function() {
        // Saving the opponent's name.
        var name = $(this).attr("data-name");

        // If there is no defender, the clicked enemy will become the defender.
        if ($(".defenderArea").children().length === 0) {
            enemyLegend = legends[name];
            updateCharacter(enemyLegend, ".defenderArea");
            $(this).remove();
            $(".banner2").addClass("invisible");
            $(".banner3").removeClass("invisible");
            $("attackButton").removeClass("invisible");
        }
    });

});