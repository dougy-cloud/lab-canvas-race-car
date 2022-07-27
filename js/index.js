const canvas = document.querySelector('canvas');
canvas.style.border = '1px solid gray';
let ctx = canvas.getContext("2d");
let startScreen = document.querySelector('.game-intro');

let intervalId = 0;
let isGameOver = false
let score = 0;
//ctx is like a penbrush
let background = new Image()
background.src = '../images/road.png';
// now we need to make that the full width of the canvas

let car = new Image()
car.src = '../images/car.png'
let carX = 250;
let carY = 400;
let carWidth = 80;
let carHeight = 130;

// random obstacles params
let minWidth = 50; // set params for the obstacles
let maxWidth = 450; // set params for the obstacles


//obstacle car
let obCar = new Image();
obCar.src = '../images/car.png';
let obCarX =  Math.floor(Math.random() * (maxWidth - minWidth));
let obCarY = -400;

// obstacle car2

let obCar2 = new Image();
obCar2.src = '../images/car.png';
let obCar2X =  Math.floor(Math.random() * (maxWidth - minWidth));
let obCar2Y = -600


window.onload = () => {
canvas.style.display='none'
    document.getElementById('start-button').onclick = () => {
    startGame();
  }

  // my car movement
  document.addEventListener('keydown', (event) =>{
    if(event.code === "ArrowRight" && carX + carWidth < canvas.width - 50) {
      carX += 10;
    } else if(event.code === "ArrowLeft" && carX > 50){
      carX -= 10
    }
  }
  );

  function startGame() {
    canvas.style.display='block';
    startScreen.style.display='none';

    // drawing the background and the cars
    ctx.drawImage(background, 0, 0, canvas.width, canvas.height);
    ctx.drawImage(car, carX, carY, carWidth, carHeight);
    ctx.drawImage(obCar, obCarX, obCarY, carWidth, carHeight)
    ctx.drawImage(obCar2, obCar2X, obCar2Y, carWidth, carHeight)
    ctx.font = '30px Courier New';

    //obCar movement

    obCarY +=4;
    if(obCarY > canvas.height){
      obCarY = -400;
      obCarX = Math.floor(Math.random() * (maxWidth - minWidth));
      score++
    }

    obCar2Y +=4;
    if (obCar2Y > canvas.height){
      obCar2Y = -400
      obCar2X = Math.floor(Math.random() * (maxWidth - minWidth));
      score++
    }


    //collision with cars
    if (carY < obCarY + carHeight - 5 && 
      carX < obCarX + carWidth && 
      carX + carWidth > obCarX && carY + carHeight > obCarY){
      isGameOver = true
    }

    else if (carY < obCar2Y + carHeight - 5 && 
      carX < obCar2X + carWidth && 
      carX + carWidth > obCar2X && carY + carHeight > obCar2Y){
      isGameOver = true
    }
/*
    else if(carY < obCar3Y + carHeight &&
      carX < obCar3X + carWidth - 10 &&
      carX + carWidth > obCar3X && carY + carHeight > obCar3Y){
        isGameOver = true
      }
*/

    //scoreboard
    ctx.fillText(`Score:${score}`, 100, 40);
    intervalId= requestAnimationFrame(startGame);


    if(isGameOver){
      cancelAnimationFrame(intervalId)

      //gameover screen
      ctx.fillRect(0, 0, canvas.width, canvas.height)
      ctx.font = '50px Courier New'
      ctx.fillStyle = "red"
      ctx.fillText('GAME OVER', 100, 200)
      ctx.font = '40px Courier New'
      ctx.fillStyle = 'white'
      ctx.fillText(`Your final score:`, 50, 250)
      ctx.font = '40px Courier New'
      ctx.fillStyle = 'white'
      ctx.fillText(`${score}`, 240, 300)
    }
  }
};


// const gameOverScreen = ctx.fillRect(0,0, canvas.width, canvas.height); ctx.fillText('Game Over')
//fillText(text, x, y, maxWidth) Fills a given text at the given (x,y) position. Optionally with a maximum width to draw.

//strokeText(text, x, y , maxWidth) Strokes a given text at the given (x,y) position. Optionally with a maximum width to draw.