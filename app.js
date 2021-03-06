/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- If a player rolls two 6 in a roll, he will lose his GLOBAL score. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLOBAL score. After that, it's the next player's turn
- The first player to reach the winning score set in the input field on GLOBAL score wins the game

*/

var scores, roundScore, lastScore, activePlayer, gamePlaying, winningScore;

init();

// roll button
document.querySelector('.btn-roll').addEventListener('click', function(){
    if (gamePlaying) {
        // 1. Produce a random number
        var dice = Math.ceil(Math.random() * 6);

        // 2. Display the result
        var diceDOM = document.querySelector('.dice');
        diceDOM.style.display = 'block';
        diceDOM.src = 'dice-' + dice + '.png';
        
        console.log(dice);
        // 3. Update the round score IF the rolled number was NOT a 1
        if (dice > 1) {
            // two 6 in a row
            if (lastScore === 6 && dice === 6) {
                scores[activePlayer] = 0;
                document.getElementById('score-' + activePlayer).textContent = 0;
                nextPlayer();               
            }
            // Add score
            else {
                roundScore += dice;
                lastScore = dice;
                document.getElementById('current-' + activePlayer).textContent = roundScore;
            }
        } else {
            // Next player
            nextPlayer()
        }
    }
});

// hold button
document.querySelector('.btn-hold').addEventListener('click', function() {
    if (gamePlaying) {
        // Add CURRENT score to GLOBAL score
        scores[activePlayer] += roundScore;

        // update the UI
        document.getElementById('score-' + activePlayer).textContent = scores[activePlayer];
        
        var input = document.querySelector('.final-score').value;
        
        // Undefined, 0, null, "" are coerced to False
        // Others are coerced to true
        if (input) {
            winnerScore = input;
        } else{
            winnerScore = 100;
        }
        // check IF player won the game
        if (scores[activePlayer] >= winningScore) {
            document.getElementById('name-' + activePlayer).textContent = 'Winner!'; 
            document.querySelector('.dice').style.display = 'none';  
            document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
            document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
            gamePlaying = false;
        } else {
        // next player
            nextPlayer();
        }
    }
});


// new game button
document.querySelector('.btn-new').addEventListener('click', init)


// Initialize the game
function init(){
    scores = [0, 0];
    roundScore = 0;
    lastScore = 0;
    activePlayer = 0;
    gamePlaying = true;

    document.getElementById('score-0').textContent = '0';
    document.getElementById('score-1').textContent = '0';
    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';
    document.getElementById('name-0').textContent = 'PLAYER 1';
    document.getElementById('name-1').textContent = 'PLAYER 2';
    document.querySelector('.player-0-panel').classList.remove('winner');
    document.querySelector('.player-1-panel').classList.remove('winner');
    document.querySelector('.player-0-panel').classList.remove('active');
    document.querySelector('.player-1-panel').classList.remove('active');
    document.querySelector('.player-0-panel').classList.add('active');
    
    document.querySelector('.dice').style.display = 'none';
}

// change to next player
function nextPlayer() {
    roundScore = 0;
    lastScore = 0;
    document.getElementById('current-' + activePlayer).textContent = '0';
               
    document.querySelector('.player-' + activePlayer + '-panel').classList.toggle('active');
    activePlayer = 1 - activePlayer;
    document.querySelector('.player-' + activePlayer + '-panel').classList.toggle('active');
        
    document.querySelector('.dice').style.display = 'none';    
}
