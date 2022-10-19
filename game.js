const canvas = document.querySelector(`#game`);
const game = canvas.getContext(`2d`);
const btnUp = document.querySelector(`#up`);
const btnDown = document.querySelector(`#down`);
const btnRight = document.querySelector(`#right`);
const btnLeft = document.querySelector(`#left`);

let canvasSize;
let elementSize;
let flag = true;


const playerPosition = {
    x: undefined,
    y: undefined
};

const giftPosition = {
    x: undefined,
    y: undefined,
};


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

    elementSize = (canvasSize / 10) + -0.9;

    startGame();
}

function startGame() {

    game.font = elementSize + 'px Verdana';
    game.textAlign = 'end';

    const mapsArr = maps[1];
    const mapRows = mapsArr.trim().split(`\n`);
    const mapRowCol = mapRows.map(row => row.trim().split(''));

    game.clearRect(0,0,canvasSize,canvasSize);
    mapRowCol.forEach((row, rowI) => {
        row.forEach((col, colI) => {
            const emoji = emojis[col];
            const posY = elementSize * (rowI + 1);
            const posX = elementSize * (colI + 1);
            game.fillText(emoji, posX, posY);
            if(col ===`O`){
                if(!playerPosition.x && !playerPosition.y){
                    playerPosition.x = posX; 
                    playerPosition.y = posY;
                    console.log({playerPosition});
                }
            } else if(col === `I`) {
                giftPosition.x = posX;
                giftPosition.y = posY;
            }
        });
    });
    //console.log({mapsArr,mapRowCol});
    movePlayer();
}   

function movePlayer(){
    const giftCollisionX = playerPosition.x.toFixed(3) === giftPosition.x.toFixed(3);
    const giftCollisionY = playerPosition.y.toFixed(3) === giftPosition.y.toFixed(3);
    const giftCollision = giftCollisionX && giftCollisionY;
    if(giftCollision){
     console.log(`Subiste de nivel`);   
    }
    game.fillText(emojis[`PLAYER`], playerPosition.x, playerPosition.y);

}

window.addEventListener(`keydown`, moveByKeys)
btnUp.addEventListener(`click`, moveUp);
btnDown.addEventListener(`click`, moveDown);
btnRight.addEventListener(`click`, moveRight);
btnLeft.addEventListener(`click`, moveLeft);

function moveByKeys(event){
   if(event.key === `ArrowUp`){
    moveUp();
   } else if(event.key === `ArrowDown`) {
    moveDown();
   }else if(event.key === `ArrowLeft`){
    moveLeft();
   }else if(event.key === `ArrowRight`){
    moveRight();
   }
}

function moveUp(){
    console.log(`moverme hacia arriba`);
    if(playerPosition.y < elementSize){
       console.log("out up");
    }else {
        playerPosition.y -= elementSize;
        startGame();
    }
    
}
function moveDown(){
    console.log(`moverme hacia abajo`);
    if(playerPosition.y > elementSize * 9){
      console.log(`out down`);
    }else {
        playerPosition.y += elementSize; 
        startGame();
    }
}    
function moveLeft(){
    console.log(`moverme hacia la izquierda`);
    if(playerPosition.x < elementSize * 1){
       console.log(`out left`);  
    }else {
        playerPosition.x -= elementSize;
        startGame();
    }
    
}
function moveRight(){
    console.log(`moverme hacia la derecha`);
    if (playerPosition.x > elementSize * 9) {
        console.log(`out right`);
    } else {
        playerPosition.x += elementSize;
        startGame();
    }
    
}



/*// for (let x = 1; x <= 10; x++) {
    //     for(let y = 1; y <= 10; y++){
    //         game.fillText(emojis[mapRowCol[x-1][y-1]], elementSize * y, elementSize * x)
    //             }
    // }*/
