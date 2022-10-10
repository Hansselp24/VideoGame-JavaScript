const canvas = document.querySelector(`#game`);
const game = canvas.getContext(`2d`);
let canvasSize;
let elementSize;


window.addEventListener(`load`, setCanvasSize);
window.addEventListener(`resize`, setCanvasSize);
    // game.font = `25px Verdana`;
    // game.fillStyle = `purple`;
    // game.textAlign = `start`;
    //game.clearRect(0, 0, 0, 0);
    //game.fillRect(0, 0, 0, 0); 
    // game.fillText(`Puto`, 25, 25);


function setCanvasSize() {
    if (window.innerHeight > window.innerWidth) {
        canvasSize = window.innerWidth * 0.8;
    }else {
        canvasSize = window.innerHeight * 0.8;
    }

    canvas.setAttribute('width', canvasSize);
    canvas.setAttribute('height', canvasSize);

    elementSize = canvasSize / 10;

    startGame();
}

function startGame() {
    
    game.font = elementSize + 'px Verdana';
    game.textAlign = 'end';
    
    for (let i = 1; i <= 10; i++) {
        game.fillText(emojis['X'], elementSize * i, elementSize); 
        
    }
}


