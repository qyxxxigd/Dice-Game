/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls 2 dice as many times as he whishes. Each result get added to his ROUND score
- BUT, one of two dices is a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/

var scores, roundScore, activePlayer, gamePlaying, winningScore;

init();

// roll button
document.querySelector('.btn-roll').addEventListener('click', function(){
    if (gamePlaying) {
        // 1. Produce a random number
        var dice1 = Math.ceil(Math.random() * 6);
        var dice2 = Math.ceil(Math.random() * 6);

        // 2. Display the result
        var diceDOM1 = document.querySelector('.dice1');
        diceDOM1.style.display = 'block';
        diceDOM1.src = 'dice-' + dice1 + '.png';
        
        var diceDOM2 = document.querySelector('.dice2');
        diceDOM2.style.display = 'block';
        diceDOM2.src = 'dice-' + dice2 + '.png';
        
        console.log(dice1 + " " + dice2);
        // 3. Update the round score IF the rolled number was NOT a 1
        if (dice1 > 1 && dice2 > 1) {
            // Add score
            roundScore += dice1 + dice2;
            document.getElementById('current-' + activePlayer).textContent = roundScore;
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

        // check IF player won the game
        if (scores[activePlayer] >= winningScore) {
            document.getElementById('name-' + activePlayer).textContent = 'Winner!'; 
            document.querySelector('.dice1').style.display = 'none'; 
            document.querySelector('.dice2').style.display = 'none'; 
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
    winningScore = prompt("please set the winning score: ");

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
    
    document.querySelector('.dice1').style.display = 'none';
    document.querySelector('.dice2').style.display = 'none';
}

// change to next player
function nextPlayer() {
    roundScore = 0;
    lastScore = 0;
    document.getElementById('current-' + activePlayer).textContent = '0';
               
    document.querySelector('.player-' + activePlayer + '-panel').classList.toggle('active');
    activePlayer = 1 - activePlayer;
    document.querySelector('.player-' + activePlayer + '-panel').classList.toggle('active');
        
    document.querySelector('.dice1').style.display = 'none'; 
    document.querySelector('.dice2').style.display = 'none'; 
}
