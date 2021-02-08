const cards = document.querySelectorAll('.card');
let memoryGame = document.querySelector('.points');
points = document.getElementById('point')
gameOverDiv = document.getElementById("points")  

let hasFlippedCard = false;
let lockBoard = false;
let firstCard , secondCard
let score = 0;
let cardMatch = 0;


function flipCard() {
    if (lockBoard) return;
    if(this === firstCard) return;
    
    this.classList.add('flip');
    if (!hasFlippedCard) {        
        hasFlippedCard = true;
        firstCard = this;
        return;
    }

    secondCard = this;
    hasFlippedCard = false;
    
    checkForMatch();
}

function checkForMatch() {    
    if (firstCard.dataset.card ===  secondCard.dataset.card) {
        score += 100;
        cardMatch++
        updatePoints(score);        
        disableCards();
        verifyGameOver();
        return;
    }
    unFlipCards(); 
}

function disableCards() {
    
    firstCard.removeEventListener('click', flipCard);
    secondCard.removeEventListener('click', flipCard);
    resetBoard()
}
function unFlipCards() {

    lockBoard = true;
    setTimeout(() => {
        firstCard.classList.remove('flip');
        secondCard.classList.remove('flip');
        resetBoard()
    }, 1500)
    score -= 20;
    updatePoints(score); 
    
}
function updatePoints(score) {    
    points.innerHTML = score    
}
function verifyGameOver() {
    if (cardMatch === 6) {
        gameOver();
    }
}
function gameOver() {      
    gameOverDiv.innerHTML = `<div class='game-over'> 
                            <h3>Parabéns você concluiu o jogo </h3> </br> 
                            <p>
                            Sua pontuação foi de: ${score} 
                            </p> </br> 
                            <button onClick="window.location.reload()">
                            Reiniciar
                            </button> 
                            </div>`    
}

function resetBoard() {
    [hasFlippedCard, lockBoard] = [false , false];
    [firstCard, secondCard] = [null,null]
}
(function shuffle() {
    cards.forEach((card) => {
        let randomPosition = Math.floor(Math.random() * 12)
        card.style.order = randomPosition;
    })
})();
cards.forEach((card) => {
    card.addEventListener('click', flipCard);
})
