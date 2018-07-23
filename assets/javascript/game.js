$(document).ready(function() {

//******************************************************************************//
// Global Variables
//******************************************************************************//

    var legends = {
        "Luke Skywalker": {
            image: "assets/images/luke.jpg" ,
            name: "Luke Skywalker",
            health: 100,
            attack: 15,
            counterAttack: 5    
        },
        "Darth Vader": {
            image:"assets/images/vader.jpg" ,
            name: "Darth Vader",
            health: 140,
            attack: 10,
            counterAttack: 10
        },
        "Mace Windu": {
            image:"assets/images/windu.jpg" ,
            name: "Mace Windu",
            health: 160,
            attack: 5,
            counterAttack: 15
        },
        "Darth Revan": {
            image:"assets/images/revan.jpg" ,
            name: "Darth Revan",
            health: 180,
            attack: 7,
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
// Global Functions
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

    // handles rendering game messages
    function renderMessage(message) {
        var gameMessageSet = $(".game-message");
        var newMessage = $("<div>").text(message);
        gameMessageSet.append(newMessage);
    };


    // Function which handles restarting the game after victory or defeat.
    function restartGame(resultMessage) {
        // When the 'Restart' button is clicked, reload the page.
        var restart = $("<button class='restartButton'>Restart</button>").click(function() {
            location.reload();
        });

        var gameState = $("<div>").text(resultMessage);
        $(".banner2").append(gameState);
        $(".button").append(restart);
    };

    // Function to clear the game message section
    function clearMessage() {
        var gameMessage = $(".game-message");
        gameMessage.text("");
    };


    initializeGame();

//******************************************************************************//
// Click Functions
//******************************************************************************//

    // select your legend
    $(".fighterStart").on("click", ".character", function() {
        var name = $(this).attr("data-name");
        if (!userLegend) {
            // We populate attacker with the selected character's information.
            userLegend = legends[name];
            // We then loop through the remaining characters and push them to the combatants array.
            for (var key in legends) {
                if (key !== name) {
                arrLegends.push(legends[key]);
                }
            };

            $(".fighterStart").hide();
            $(".banner").addClass("invisible");
            $(".banner2").removeClass("invisible");

            // Then render our selected character and our combatants.
            updateCharacter(userLegend, ".userArea");
            renderEnemies(arrLegends);
        }
    });

    // select enemy legend
    $(".challengers").on("click", ".character", function() {
        var name = $(this).attr("data-name");
        if ($(".defenderArea").children().length === 0) {
            enemyLegend = legends[name];
            updateCharacter(enemyLegend, ".defenderArea");
            $(this).remove();
            $(".banner2").addClass("invisible");
            $(".banner3").removeClass("invisible");
            $(".attackButton").removeClass("invisible");
        }
    });

    // battle logic
    $(".attackButton").on("click", function() {
        // If there is a defender, combat will occur.
        if ($(".defenderArea").children().length !== 0) {
            // Creates messages for our attack and our opponents counter attack.
            var attackMessage = "You attacked " + enemyLegend.name + " for " + userLegend.attack * turnCounter + " damage.";
            var counterAttackMessage = enemyLegend.name + " attacked you back for " + enemyLegend.counterAttack + " damage.";
            clearMessage();

            // Reduce defender's health by your attack value.
            enemyLegend.health -= userLegend.attack * turnCounter;

            // If the enemy still has health..
            if (enemyLegend.health > 0) {
                // Render the enemy's updated character card.
                updateCharacter(enemyLegend, ".defenderArea");

                // Render the combat messages.
                renderMessage(attackMessage);
                renderMessage(counterAttackMessage);

                // Reduce your health by the opponent's attack value.
                userLegend.health -= enemyLegend.counterAttack;

                // Render the player's updated character card.
                updateCharacter(userLegend, ".userArea");

                // If you have less than zero health the game ends.
                // We call the restartGame function to allow the user to restart the game and play again.
                if (userLegend.health <= 0) {
                    clearMessage();
                    restartGame("You have been defeated...GAME OVER!!!");
                    $(".attackButton").off("click");
                };
            }
                else {
                    // If the enemy has less than zero health they are defeated.
                    // Remove your opponent's character card.
                    $(".defenderArea").empty();

                    var gameStateMessage = "You have defeated " + enemyLegend.name + ", you can choose to fight another enemy.";
                    renderMessage(gameStateMessage);

                    // Increment your kill count.
                    killCount++;

                    // If you have killed all of your opponents you win.
                    // Call the restartGame function to allow the user to restart the game and play again.
                    if (killCount >= arrLegends.length) {
                    clearMessage();
                    $(".attackButton").off("click");
                    restartGame("You Won!!!! GAME OVER!!!");
                    };
                };
        // Increment turn counter. This is used for determining how much damage the player does.
        turnCounter++;
        }
    });

});