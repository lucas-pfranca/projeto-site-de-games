var canvas = document.getElementById("snake")
var ctx = canvas.getContext("2d")
var box = 32
var snake = []
snake[0] = {
    x: 8*box,
    y: 8*box
}

var direcao = "RIGHT"
var comida = {
    x: Math.floor(Math.random() * 15 + 1) * box,
    y: Math.floor(Math.random() * 15 + 1) * box
}

function desenharFundo() {
    ctx.fillStyle = 'black'
    ctx.fillRect(0, 0, 16*box, 16*box)
}

function desenharCobra() {
    for(i = 0;i < snake.length; i++) {
        ctx.fillStyle = 'green'
        ctx.fillRect(snake[i].x, snake[i].y, box, box)
    }
}

function desenharComida() {
    ctx.fillStyle = "red"
    ctx.fillRect(comida.x, comida.y, box, box)
}

document.addEventListener("keydown", updateDirection)

function updateDirection(event) {
    if(event.keyCode == 65 && direcao != "RIGHT") {
        direcao = "LEFT"
    }
    if(event.keyCode == 87 && direcao != "DOWN") {
        direcao = "UP"
    }
    if(event.keyCode == 68 && direcao != "LEFT") {
        direcao = "RIGHT"
    }
    if(event.keyCode == 83 && direcao != "UP") {
        direcao = "DOWN"
    }
}

function desenha() {

    if(snake[0].x > 15*box && direcao == "RIGHT") {
        snake[0].x = 0
    }
    if(snake[0].x < 0 && direcao == "LEFT") {
        snake[0].x = 16*box
    }
    if(snake[0].y > 15*box && direcao == "DOWN") {
        snake[0].y = 0
    }
    if(snake[0].y < 0 && direcao == "UP") {
        snake[0].y = 16*box
    }

    for(i = 1; i < snake.length; i++) {
        if(snake[0].x == snake[i].x && snake[0].y == snake[i].y) {
            clearInterval(game)
            alert("Game Over!")
            location.reload()
        }
    }

    desenharFundo()
    desenharCobra()
    desenharComida()

    var snakeX = snake[0].x
    var snakeY = snake[0].y

    if (direcao == "RIGHT") {
        snakeX += box
    }
    if (direcao == "LEFT") {
        snakeX -= box
    }
    if (direcao == "UP") {
        snakeY -= box
    }
    if (direcao == "DOWN") {
        snakeY += box
    }

    if(snakeX != comida.x || snakeY != comida.y) {
        snake.pop()
    }
    else {
        comida.x = Math.floor(Math.random() * 15 + 1) * box
        comida.y = Math.floor(Math.random() * 15 + 1) * box
    }

    var newHead = {
        x: snakeX,
        y: snakeY
    }

    snake.unshift(newHead)
}

var game = setInterval(desenha, 100)