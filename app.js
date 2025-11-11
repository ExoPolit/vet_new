let canvas = document.getElementById("canvas");
let ctx = canvas.getContext("2d");
let rows = 20; // wert erhöhen um größes "Spielfeld" zu schaffen zb. 20;
let cols = 20;
let snake = [{ x: 19, y: 3 }];
let food = { x: 4, y: 5 };
let cellWidth = canvas.width / cols;
let cellHeight = canvas.height / rows;
let direction = "LEFT";
let foodCollected = false;
let playerScore = 0;


placeFood();
setInterval(gameLoop, 150);
document.addEventListener("keydown", keyDown);
draw();

function draw() {
  //Playground
  ctx.fillStyle = "black";
  ctx.fillRect(0, 0, canvas.width, canvas.height); // canvas.width + .height, für sppätere änderungen der Spielfeld größe
  //Snake
  ctx.fillStyle = "white";
  /* ctx.fillRect(130, 170, 30 -1, 30 -1);// zusätzliche vierecke hinzufügen = x-acshe erhöhen (130,y,...) (160,y,...)  // -1 erschafft eine lücke zwischen den verschiedenen vierecken */
  snake.forEach((part) => add(part.x, part.y));

  ctx.fillStyle = "yellow";
  add(food.x, food.y); //Food

  requestAnimationFrame(draw);
}


// Point counter


function updateScore(){
  const playerScorePara = document.querySelector('.playerScore'); // Use querySelector to select the element by its class
  if(foodCollected){
    playerScore += 1;
    playerScorePara.textContent = `Player: ${playerScore}`;
  } 
}






//GameOver
function testGameOver() {

  let firstPart = snake[0];
  let otherParts = snake.slice(1);
  let duplicatePart = otherParts.find(part => part.x == firstPart.x && part.y == firstPart.y)
  //1. Schlange läuft gegen die wand -- wenn x kooardinate kleiner als 0 ist -- || -- wenn unsere x koordinate größer ist als unsere Spalten(columns(cols) hier müssen wir wieder - 1 schreiben, weil wir bei 0 anfangen zu zählen -- || -- wenn snake[0].y < 0 -- Unsere y koordinate könnte auch kleiner als 0 sein -- || -- wenn snake[0].y > rows - 1 --
  if (
    snake[0].x < 0 ||
    snake[0].x > cols - 1 ||
    snake[0].y < 0 ||
    snake[0].y > rows - 1 ||
    duplicatePart
  ) {
    placeFood();
    snake = [{ x: 19, y: 3 }];
    direction = "LEFT";
    playerScore = 0;
    const playerScorePara = document.querySelector('.playerScore');
    playerScorePara.textContent = `Player: ${playerScore}`;
  }
}


// Futter random platzieren
function placeFood() {
  let randomX = Math.floor(Math.random() * cols); // math.floor zum abrunden der random generierten zahl / * cols damit wir eine höhere zahl als 1 generieren, da Math.random nur eine zahl zwischen 0 und 1 generiert
  let randomY = Math.floor(Math.random() * rows);

  food = { x: randomX, y: randomY };
}

function add(x, y) {
  ctx.fillRect(
    x * cellWidth,
    y * cellHeight,
    cellWidth - 1,
    cellHeight - 1
  );
}
function shiftSnake() {
  for (let i = snake.length - 1; i > 0; i--) {
    const part = snake[i];
    const lastPart = snake[i - 1];
    part.x = lastPart.x;
    part.y = lastPart.y;
  }
}

function gameLoop() {
  
  testGameOver();
  updateScore();
  if (foodCollected) {
    snake = [{ x: snake[0].x, y: snake[0].y }, ...snake];
    foodCollected = false;
  }
  shiftSnake();
  if (direction == "LEFT") {
    snake[0].x--;
  }
  if (direction == "RIGHT") {
    snake[0].x++;
  }
  if (direction == "UP") {
    snake[0].y--;
  }
  if (direction == "DOWN") {
    snake[0].y++;
  }

  if (snake[0].x == food.x && snake[0].y == food.y) {
    //Futter einsameln
    foodCollected = true;
    //Futter neu platzieren
    placeFood();
  }
}

function keyDown(e) {
  if (e.keyCode == 37) {
    direction = "LEFT";
  }
  if (e.keyCode == 38) {
    direction = "UP";
  }
  if (e.keyCode == 39) {
    direction = "RIGHT";
  }
  if (e.keyCode == 40) {
    direction = "DOWN";
  }
  const playerScorePara = document.getElementsByClassName('playerScore');


}