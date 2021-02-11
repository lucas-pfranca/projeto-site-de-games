var canvas = document.getElementById("snake")
var ctx = canvas.getContext("2d")
var box = 32
var snake = []
snake[0] = {
    x: 8*box,
    y: 8*box
}

var direcao = "RIGHT"

function desenharFundo() {
    ctx.fillStyle = 'black'
    ctx.fillRect(0, 0, 16*box, 16*box)
}

function desenharCobra() {
    for(i = 0; snake.length; i++) {
        ctx.fillStyle = 'cyan'
        ctx.fillRect(snake[i].x, snake[i].y, box, box)
    }
}

function desenha() {
    desenharFundo()
    desenharCobra()
}

var game = setInterval(desenha, 100)