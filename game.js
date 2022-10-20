const canvas = document.querySelector(`#game`);
const game = canvas.getContext(`2d`);
const btnUp = document.querySelector(`#up`);
const btnDown = document.querySelector(`#down`);
const btnRight = document.querySelector(`#right`);
const btnLeft = document.querySelector(`#left`);
const spanLives = document.querySelector(`#lives`);

let canvasSize;
let elementSize;

let level = 0;
let lives = 3;


const playerPosition = {
    x: undefined,
    y: undefined
};

const giftPosition = {
    x: undefined,
    y: undefined,
};

let enemyPositions = [];


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

    const mapsArr = maps[level];

    if(!mapsArr){
        gameWin();
        return;
    }

    const mapRows = mapsArr.trim().split(`\n`);
    const mapRowCol = mapRows.map(row => row.trim().split(''));

    showLives();

    enemyPositions = [];

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
            else if(col === `X`) { enemyPositions.push({
                x: posX,
                y: posY,
                });
            }
        });
    });
    //console.log({mapsArr,mapRowCol});
    movePlayer();
}   

function movePlayer(){
    //si la posicion del jugador es igual a la posicion del regalo nos imprimira que pasamos a otro nivel.
    const giftCollisionX = playerPosition.x.toFixed(3) === giftPosition.x.toFixed(3);
    const giftCollisionY = playerPosition.y.toFixed(3) === giftPosition.y.toFixed(3);
    const giftCollision = giftCollisionX && giftCollisionY;
    //esto nos imprime
    if(giftCollision){
     levelWin();  
    }
//si la posicion del jugador es igual a la posicion de la bomba(enemyPositions) nos va arrogar un console log de que chocamos con una bomba.
    const enemyCollision = enemyPositions.find((enemy) => {
        const enemyCollisionX = enemy.x.toFixed(3) == playerPosition.x.toFixed(3);
        const enemyCollisionY = enemy.y.toFixed(3)  == playerPosition.y.toFixed(3) ;
        return enemyCollisionX && enemyCollisionY;
    });
//si chocamos se imprime esto--
    if(enemyCollision){ 
        levelFail();
       }

    game.fillText(emojis[`PLAYER`], playerPosition.x, playerPosition.y);

}

function levelWin() {
    console.log(`subiste de nivel`);
    level++;
    startGame();
}

function levelFail(){
    console.log(`Chocaste con una Bomba`);
    lives--;// se encarga de restarle vidas 
    console.log(lives);
// esta condicional se encarga de reducir nuestra cantidad de vidas cada vez que perdemos(son 3 vidas) cuando el contados de lives llegue a 0 nos recargara hasta el nivel 0, osea que perdimos.
    if (lives <= 0){
        level = 0;
        console.log(`Perdiste, inicias de nuevo`);
        lives = 3;
    }  
    playerPosition.x = undefined;
    playerPosition.y = undefined;
    startGame();
}

function gameWin() {
    console.log(`Terminaste el juego`);
}

function showLives() {
   const heartsArray = Array(lives).fill(emojis['HEART']);
    
   spanLives.innerHTML = "";
   heartsArray.forEach(heart => {spanLives.append(heart);}
    )
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
    if(playerPosition.y < elementSize + 1){
       console.log("out up");
    }else {
        playerPosition.y -= elementSize;
        startGame();
    }
    
}
function moveDown(){
    console.log(`moverme hacia abajo`);
    if(playerPosition.y > (elementSize + 1) * 9){
      console.log(`out down`);
    }else {
        playerPosition.y += elementSize; 
        startGame();
    }
}    
function moveLeft(){
    console.log(`moverme hacia la izquierda`);
    if(playerPosition.x < (elementSize + 10) * 1){
       console.log(`out left`);  
    }else {
        playerPosition.x -= elementSize;
        startGame();
    }
    
}
function moveRight(){
    console.log(`moverme hacia la derecha`);
    if (playerPosition.x > (elementSize + 1) * 9) {
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
