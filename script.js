const intro = document.getElementById('intro');
const gameContainer = document.getElementById('gameContainer');
const stickman = document.getElementById('stickman');
const block = document.getElementById('block');
const scoreDisplay = document.getElementById('score');
const jumpBtn = document.getElementById('jumpBtn');

let isJumping = false;
let score = 0;
let gameSpeed = 2000;

// Start Game
document.getElementById('startBtn').addEventListener('click', () => {
    intro.classList.add('hidden');
    gameContainer.classList.remove('hidden');
    startGame();
});

// Jump Action
jumpBtn.addEventListener('click', () => {
    if (!isJumping) {
        isJumping = true;
        stickman.style.bottom = '100px';
        setTimeout(() => {
            stickman.style.bottom = '20px';
            isJumping = false;
        }, 500);
    }
});

// Game Logic
function startGame() {
    let blockInterval = setInterval(() => {
        const stickmanRect = stickman.getBoundingClientRect();
        const blockRect = block.getBoundingClientRect();

        // Collision Detection
        if (
            stickmanRect.left < blockRect.right &&
            stickmanRect.right > blockRect.left &&
            stickmanRect.bottom > blockRect.top
        ) {
            alert('Game Over!');
            clearInterval(blockInterval);
            window.location.reload();
        }

        // Increase Score and Speed
        score++;
        scoreDisplay.textContent = `Score: ${score}`;
        if (score % 100 === 0) {
            gameSpeed *= 0.9;
            block.style.animationDuration = `${gameSpeed / 1000}s`;
        }

        // Check for Hidden Ending
        if (score >= 1000000 && Math.random() > 0.5) {
            alert('You Found the Hidden Ending!');
            clearInterval(blockInterval);
            window.location.reload();
        }
    }, 50);
}
