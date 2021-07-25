const h3 = document.getElementById('score');
const recordBlock = document.getElementById('record');

let canvas = document.getElementById('canvas');
let context = canvas.getContext('2d');
const grid = 16;
let count = 0;
let score = 0;
let record = Number(localStorage.getItem("record"));
recordBlock.innerHTML = 'Record: <span>' + record + '</span>';

let snake = {
  x: 160,
  y: 160,
  dx: grid,
  dy: 0,
  cells: [],
  maxCells: 6
};

let apple = {
    x: 320,
    y: 320
}

function restart() {
  snake.x = 160;
  snake.y = 160;
  snake.cells = [];
  snake.maxCells = 6;
  snake.dx = grid;
  snake.dy = 0;
  
  score = 0;
  h3.innerHTML = 'Score: <span>' + score + '</span>';
        
  apple.x = getRandomInt(0, 25) * grid;
  apple.y = getRandomInt(0, 25) * grid;
}

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (25))
};

function loop() {
  requestAnimationFrame(loop)
  if (++count < (10 - Math.round(score / 10))) {
    return;
  }
  
  count = 0;
  context.clearRect(0, 0, canvas.width, canvas.height);
  
  snake.x += snake.dx;
  snake.y += snake.dy;
  
  if (snake.x < 0) {
    restart()
  }
  else if (snake.x >= canvas.width) {
    restart()
  }
  
  if (snake.y < 0) {
    restart()
  }
  else if (snake.y >= canvas.height) {
    restart()
  }
  
  snake.cells.unshift({ x: snake.x, y: snake.y });
  
  if (snake.cells.length > snake.maxCells) {
    snake.cells.pop();
  }
  
  context.fillStyle = 'red';
  context.fillRect(apple.x, apple.y, grid - 1, grid - 1);
  
  context.fillStyle = 'green';
  
  snake.cells.forEach(function (cell, index) {
    context.fillRect(cell.x, cell.y, grid - 1, grid - 1);
    
    if (cell.x === apple.x && cell.y === apple.y) {
      snake.maxCells++;
      score++;
      if (score > record) { 
        record++
        localStorage.setItem("record", record.toString())
      }
      h3.innerHTML = 'Score: <span>' + score + '</span>';
      recordBlock.innerHTML = 'Record: <span>' + record + '</span>';
        
      apple.x = getRandomInt(0, 25) * grid;
      apple.y = getRandomInt(0, 25) * grid;
    }
    
    for (var i = index + 1; i < snake.cells.length; i++) {
      
      if (cell.x === snake.cells[i].x && cell.y === snake.cells[i].y) {
        restart()
      }
    }
  });
}



document.addEventListener('keydown', (e) => {
  // Left
  if (e.which === 37 && snake.dx === 0) {
    snake.dx = -grid;
    snake.dy = 0;
  }
  // Up
  else if (e.which === 38 && snake.dy === 0) {
    snake.dy = -grid;
    snake.dx = 0;
  }
  // Right
  else if (e.which === 39 && snake.dx === 0) {
    snake.dx = grid;
    snake.dy = 0;
  }
  // Down
  else if (e.which === 40 && snake.dy === 0) {
    snake.dy = grid;
    snake.dx = 0;
  }
});

requestAnimationFrame(loop);