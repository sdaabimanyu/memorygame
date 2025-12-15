
const cards = document.querySelectorAll('.flip_card');
const restartBtn = document.getElementById('restart_btn');

let hasFlippedCard = false;
let firstCard, secondCard;
let lockBoard = false;

restartBtn.addEventListener('click', function (e) {
    
    unflipAllCards();
    resetBoard();
    enableCards();
    setTimeout(() => {
        shuffle();
    }, 1500);
})


function flipCard() {
    if (lockBoard) return;
    if (this === firstCard) return;
    this.classList.add('flip');

    if (!hasFlippedCard) {
        hasFlippedCard = true;
        firstCard = this;

        return;
    }

    secondCard = this;

    checkForMatch();
}

function checkForMatch() {
    if (firstCard.dataset.framework === secondCard.dataset.framework) {
        disableCards();
    } else {
        unflipCards();
    }
}

function unflipCards() {
    lockBoard = true;
    setTimeout(() => {
        firstCard.classList.remove('flip');
        secondCard.classList.remove('flip');
        lockBoard = false;
        resetBoard();
    }, 1000)

}

function unflipAllCards() {
    cards.forEach(card => card.classList.remove('flip'));
}


function disableCards() {
    firstCard.removeEventListener('click', flipCard);
    secondCard.removeEventListener('click', flipCard)
    resetBoard();
}

function resetBoard() {
    [hasFlippedCard, lockBoard] = [false, false];
    [firstCard, secondCard] = [null, null];
}

function enableCards() {
    cards.forEach(card => {
        card.addEventListener('click', flipCard);
    });
}


function shuffle() {
    cards.forEach(card => {
        let randomPos = Math.floor(Math.random() * 12);
        card.style.order = randomPos;
    });
}

(function shuffle() {
    cards.forEach(card => {
        let randomPos = Math.floor(Math.random() * 12);
        card.style.order = randomPos;
    });
})();

cards.forEach(card => card.addEventListener('click', flipCard));