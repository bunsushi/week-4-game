$(document).ready(function () {

    // PLAYING CARD VALUE ARRAY
    var suit = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13];

    // GLOBAL VARIABLES
    var targetNumber = Math.floor(Math.random() * (120 - 19 + 1) + 19); // random number between 19 and 120
    var playerTotal = 0; // start player total at 0
    var wins = 0; // start wins at 0
    var losses = 0; // start losses at 0
    var complete = false;

    // UPDATE DOM
    $("#target-number").text(targetNumber); // display target number
    $("#player-total").text(playerTotal); // display player total
    $("#wins").text(wins); // display wins
    $("#losses").text(losses); // display losses


    // GENERATE PLAYING CARDS
    function makePlayingCards() {
        for (var i = 0; i < 4; i++) {
            var currentCard = $("<img>");
            currentCard.addClass("card-back");
            currentCard.attr("src", "assets/images/playing-card-back.png");
            // ATTN Prohibit from repeating a card
            currentCard.attr("data-cardvalue", suit[Math.floor(Math.random() * suit.length)]);
            $("#card").append(currentCard);
        }
    }

    // RESET GAME
    function resetGame() {
        targetNumber = Math.floor(Math.random() * (120 - 19 + 1) + 19);
        $("#target-number").text(targetNumber);

        complete = false;

        $("#card").text("");
    }

    // WIN CONDITIONS
    function solved() {
        if (playerTotal === targetNumber) {
            wins++;
            $("#wins").text(wins);
            complete = true;
        }
    };

    // LOSS CONDITIONS
    function lost() {
        if (playerTotal > targetNumber) {
            losses++;
            $("#losses").text(losses);
            complete = true;
        }
    }

    makePlayingCards();


    // EVENT LISTENER
    $(document).on("click", ".card-back", function () {

        if (complete) {
            resetGame();
            playerTotal = 0;
            $("#player-total").text(playerTotal);
            complete = false;
            makePlayingCards(); // this generates new cards but no on-click     
        }

        else {
            var cardValue = ($(this).attr("data-cardvalue"));
            cardValue = parseInt(cardValue);
            console.log(cardValue);
            playerTotal += cardValue;
            console.log("Total: " + playerTotal);
            $("#player-total").text(playerTotal);

            solved(); // Checks if player won;
            lost(); // Checks if player lost
        }
    });

});