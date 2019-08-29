/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/
var scores, roundScores, activePlayer,isOver, prevDice, target;

init();

document.getElementById('tgt').addEventListener('input', function(){
    target = document.getElementById('tgt').value;
})

document.querySelector(".btn-roll").addEventListener('click', function(){
    console.log(isOver);
    if(!isOver) {
    var dice = Math.floor(Math.random()*6) +1;
    var dice1 = Math.floor(Math.random()*6)+1;

    var diceDOM = document.querySelector('.dice');
    var diceDOM1 = document.querySelector('.dice1');
    diceDOM.style.display = 'block';
    diceDOM1.style.display = 'block';

    diceDOM.src = 'dice-' + dice  + '.png';
    diceDOM1.src = 'dice-'+ dice1 +'.png';




        if(dice === 6 && dice1 === 6){
            scores[activePlayer] = 0;
            document.getElementById('score-'+activePlayer).textContent = '0';
            nextPlayer();
            prevDice = 0;
        }
       else if (dice !== 1 && dice1 !== 1) {
            roundScores += dice;
            roundScores += dice1;
            document.querySelector('#current-' + activePlayer).textContent = roundScores;

        }
        else {
            nextPlayer();
        }

        prevDice = dice;
    }
});

document.querySelector('.btn-hold').addEventListener('click', function(){
    scores[activePlayer] += roundScores;
    document.getElementById('score-'+activePlayer).textContent = scores[activePlayer];
    roundScores = 0;

    if(scores[activePlayer] >= target){

        document.querySelector('#name-'+activePlayer).textContent = 'Winner';
        document.querySelector('.dice').style.display ='none';
        document.querySelector('.dice1').style.display ='none';
        document.querySelector('.player-'+activePlayer+'-panel').classList.add('winner');
        document.querySelector('.player-'+activePlayer+'-panel').classList.remove('active');
        isOver = true;
    }
    else{
        nextPlayer();
    }




})

document.querySelector('.btn-new').addEventListener('click',init)

function nextPlayer(){
    roundScores = 0;
    document.querySelector('.dice').style.display = 'none';
    document.querySelector('.dice1').style.display = 'none';
    document.querySelector('#current-' + activePlayer).textContent = 0;
    document.querySelector('.player-0-panel').classList.toggle('active');
    document.querySelector('.player-1-panel').classList.toggle('active');
    activePlayer = activePlayer === 1 ? 0 : 1;
}

function reset() {
    document.getElementById('name-'+activePlayer).textContent = 'Winner';
    document.querySelector('.dice').style.display = 'none';
}

function init(){
    scores = [0,0];
    activePlayer = 0;
    roundScores = 0;
    document.querySelector('.dice').style.display = 'none';
    document.querySelector('.dice1').style.display = 'none';
    document.getElementById('score-0').textContent = '0';
    document.getElementById('score-1').textContent = '0';
    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';
    document.querySelector('#name-0').textContent = 'PLAYER 1';
    document.querySelector('#name-1').textContent = 'PLAYER 2';
    document.querySelector('.player-0-panel').classList.add('active');
    document.querySelector('.player-0-panel').classList.remove('winner');
    document.querySelector('.player-1-panel').classList.remove('winner');
    isOver = false;
    target = 20;

}




// document.querySelector("#current-" + activePlayer).textContent = dice;
// document.querySelector("#current-" + activePlayer).innerHTML = '<em>' + dice + '</em>';
// var x = document.querySelector('#score-0').textContent;