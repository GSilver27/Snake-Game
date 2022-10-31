let canvas = document.getElementById('game');
let context = canvas.getContext('2d');
let grid = 16;
let count = 0;
let snake = {
    x: 160,
    y: 160,
    dx: grid,
    dy: 0,
    cells: [],
    maxCells: 4
};
let apple = {
    x: 320,
    y: 320
};
// УПРАВЛЕНИЕ МОБИЛЬНЫЕ УСТРОЙСТВА
let up = document.querySelector('.btn-up');
let left = document.querySelector('.btn-left');
let right = document.querySelector('.btn-right');
let down = document.querySelector('.btn-down');

function getRandomInt(min, max) {
    return  Math.floor(Math.random() * (max - min) + min);
}

// главный игровой цикл
function loop() {
    // настройка фрейм-рейта в зависимости от герцовки
    // для 60герцовых мониторов дефольное значение = 4
    requestAnimationFrame(loop);
    if (++count < 4) {
        return;
    }
    count = 0;
    context.clearRect(0, 0, canvas.width, canvas.height);

    // движение
    snake.x += snake.dx;
    snake.y += snake.dy;

    // выходы за рамки
    if (snake.x < 0) {
        snake.x = canvas.width - grid;
    }
    else if (snake.x >= canvas.width) {
        snake.x = 0;
    }
    if (snake.y < 0) {
        snake.y = canvas.height - grid;
    }
    else if (snake.y >= canvas.height) {
        snake.y = 0;
    }

    // добавление головы/убирание хвоста
    snake.cells.unshift( {x: snake.x, y: snake.y} );
    if (snake.cells.length > snake.maxCells) {
        snake.cells.pop();
    }

    // рисуем яблоко
    context.fillStyle = 'red';
    context.fillRect(apple.x, apple.y, grid - 1, grid - 1);

    // рисуем змейку
    context.fillStyle = 'green';
    snake.cells.forEach(function (cell, index) {
        context.fillRect(cell.x, cell.y, grid - 1, grid - 1);

        // съедаем яблоко, делаем новое
        if (cell.x === apple.x && cell.y === apple.y) {
            snake.maxCells++;
            apple.x = getRandomInt(0, 25) * grid;
            apple.y = getRandomInt(0, 25) * grid;
        }

        // не съела ли змейка себя
        for (let i = index + 1; i < snake.cells.length; i++) {
            if (cell.x === snake.cells[i].x && cell.y === snake.cells[i].y) {
                snake.x = 160;
                snake.y = 160;
                snake.cells = [];
                snake.maxCells = 4;
                snake.dx = grid;
                snake.dy = 0;

                apple.x = getRandomInt(0, 25) * grid;
                apple.y = getRandomInt(0, 25) * grid;
            }
        }
    });
}

// управление клавиатурой
document.addEventListener('keydown', function (e) {
    //проверяем такой момент: если змейка движется, например, влево, то ещё одно нажатие влево или вправо
    // ничего не поменяет — змейка продолжит двигаться в ту же сторону, что и раньше.
    // Это сделано для того, чтобы не разворачивать весь массив со змейкой на лету и не усложнять код игры.

    // стрелка вверх
    // если нажата стрелка вверх, и при этом змейка никуда не движется по вертикали
    if (e.which === 38 && snake.dy === 0) {
        // то даём ей движение по вертикали, вверх, а горизонтальное — останавливаем
        snake.dy = -grid;
        snake.dx = 0;
    }
    // стрелка влево
    else if (e.which === 37 && snake.dx === 0) {
        snake.dx = -grid;
        snake.dy = 0;
    }
    // стрелка вправо
    else if (e.which === 39 && snake.dx === 0) {
        snake.dx = grid;
        snake.dy = 0;
    }
    // стрелка вниз
    else if (e.which === 40 && snake.dy === 0) {
        snake.dy = grid;
        snake.dx = 0;
    }
});

//  управление нажатиями
function clickUp() {
    if (snake.dy === 0) {
        snake.dy = -grid;
        snake.dx = 0;
    }
}

function clickLeft() {
    if (snake.dx === 0) {
        snake.dx = -grid;
        snake.dy = 0;
    }
}
function clickRight() {
    if (snake.dx === 0) {
        snake.dx = grid;
        snake.dy = 0;
    }
}

function clickDown() {
    if (snake.dy === 0) {
        snake.dy = grid;
        snake.dx = 0;
    }
}


requestAnimationFrame(loop);