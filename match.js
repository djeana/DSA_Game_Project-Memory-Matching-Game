const grid = document.getElementById('grid');

const allImages = [
    'img1.jpg',
    'img2.jpg',
    'img3.jpg',
    'img4.jpg',
    'img5.jpg',
    'img6.jpg',
    'img7.jpg',
    'img8.jpg'
];

const urlParams = new URLSearchParams(window.location.search);
const difficulty = urlParams.get('mode') || 'easy';

let selectedImages;
let columns;

if (difficulty === 'easy') {
    selectedImages = allImages.slice(0, 4); 
    columns = 4;
} else if (difficulty === 'medium') {
    selectedImages = allImages.slice(0, 6);
    columns = 4;
} else {
    selectedImages = allImages;
    columns = 4;
}

let cards = [...selectedImages, ...selectedImages];
let flippedCards = [];
let lockBoard = false;

function shuffle(array) {
    return array.sort(() => Math.random() - 0.5);
}

function createBoard() {
    grid.innerHTML = '';
    grid.style.gridTemplateColumns = `repeat(${columns}, 1fr)`;
    shuffle(cards);

    cards.forEach((imgSrc) => {
        const card = document.createElement('div');
        card.classList.add('card');
        card.dataset.image = imgSrc;

        card.innerHTML = `
            <div class="card-face card-front"></div>
            <div class="card-face card-back">
                <img src="${imgSrc}" alt="Card">
            </div>
        `;

        card.addEventListener('click', flipCard);
        grid.appendChild(card);
    });
}

function flipCard() {
    if (lockBoard || this === flippedCards[0] || this.classList.contains('matched')) {
        return;
    }

    this.classList.add('flipped');
    flippedCards.push(this);

    if (flippedCards.length === 2) {
        checkForMatch();
    }
}

function checkForMatch() {
    const [card1, card2] = flippedCards;
    const isMatch = card1.dataset.image === card2.dataset.image;

    if (isMatch) {
        card1.classList.add('matched');
        card2.classList.add('matched');
        flippedCards = [];

        if (document.querySelectorAll('.matched').length === cards.length) {
            setTimeout(() => {
                alert('You won!');
                window.location.href = 'difficulty.html';
            }, 500);
        }
    } else {
        lockBoard = true;
        setTimeout(() => {
            card1.classList.remove('flipped');
            card2.classList.remove('flipped');
            flippedCards = [];
            lockBoard = false;
        }, 800);
    }
}

createBoard();