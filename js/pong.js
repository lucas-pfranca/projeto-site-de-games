var canvas = document.getElementById("mycanvas"); // usando o id "mycanvas" para colocar dentro da variavel canvas // 
    var ctx = canvas.getContext("2d"); // dando o contexto, tudo o que for desenhado na variavel canvas, sera em 2d // 

   // ctx.fillStyle = "white"; tudo o que for desenhado dentro da canvas sera na cor branca //
   // ctx.fillRect(250, 600, 50, 50) desenhar na cordenada (x0, y0, 50px por 50px) dentro do canvas//

    var teclas = {};
    var bola = {
        x: canvas.width / 2 - 15, // cordenada x da bola   canvas.largura dividido por 2 menos a metade da largura 
        y: canvas.height / 2 - 15, // cordenada y da bola   canvas.altura dividido por 2 menos a metade da altura 
        altura: 30, // altura da bolinha é igual a 30
        largura: 30, // largura da bolinha é igual a 30
        dirx: -1, // direção em x para onde a bolinha vai, no caso, ela começa indo para a esquerda, por isso decrementamos
        diry: 1, // direção em y para onde a bolinha vai, no caso, ela começa indo para a esquerda e para baixo, por isso incrementamos
        mod: 0, // modificador de velocidade da bolinha
        speed: 1 // velocidade inicial da bolinha

    };

    var esquerda = {
        x: 10, // queremos que x do bloco da esquerdo comece com 10 pixels da borda esquerda
        y: canvas.height / 2 - 60, // queremos y no centro da borda esquerda do canvas       canvas.altura dividido por 2 menos metade da altura
        altura: 120, // altura do bloco esquerdo é igual a 120
        largura: 30, // largura do bloco esquerdo é igual a 30
        score: 0, // pontuação do bloco esquerdo começa com 0
        speed: 10 // velocidade do bloco esquerdo é igual a 10

    };
    var direita = {
        x: canvas.width - 40, // queremos que o bloco direito comece em 560 no x, pois a largura total da canvas é 600px, então precisamos deixar 30 de largura e 10 de espaçamento para a borda direita 
        y: canvas.height / 2 - 60, // queremos y no centro da borda direita do canvas       canvas.altura dividido por 2 menos metade da altura
        altura: 120, // altura do bloco direito 
        largura: 30, // largura do bloco direito
        score: 0, // pontuação do bloco direito começa com 0
        speed: 10 // velocidade do bloco direito é igual a 10

    };

    document.addEventListener("keydown", function(e) { // toda vez que uma tecla for executada, ativará a função com o parametro "e"
        teclas[e.keyCode] = true; // atribuindo um valor verdadeiro para a variavel "teclas" // o keyCode serve para ver o número de cada tecla ao clica-la

    }, false);

    document.addEventListener("keyup", function(e){ // vai tirar da variavel teclas, a tecla que foi apertada
        delete teclas[e.keyCode];
    }, false)

    function moveBloco() { // função com o objetivo de fazer a movimentação dos blocos 
        if(87 in teclas && esquerda.y > 0)
            esquerda.y -= esquerda.speed;

         else if(83 in teclas && esquerda.y + esquerda.altura < canvas.height )       
            esquerda.y += esquerda.speed;
        
        if(38 in teclas && direita.y > 0)
            direita.y -= direita.speed;
        
        else if(40 in teclas && direita.y + direita.altura < canvas.height)
            direita.y += direita.speed;
    }

    function moveBola() {
        if(bola.y + bola.altura >= esquerda.y && bola.y <= esquerda.y + esquerda.altura && bola.x <= esquerda.x + esquerda.largura) {
            bola.dirx = 1;
            bola.mod += 0.2;
        }
        else if(bola.y + bola.altura >= direita.y && bola.y <= direita.y + direita.altura && bola.x + bola.largura >= direita.x) {
            bola.dirx = -1;
            bola.mod += 0.2;
        }
        if(bola.y <= 0 )
            bola.diry = 1;
        else if(bola.y + bola.altura >= canvas.height)
            bola.diry = -1;

        bola.x += (bola.speed + bola.mod) * bola.dirx;
        bola.y += (bola.speed + bola.mod) * bola.diry;

        if(bola.x < esquerda.x + esquerda.largura - 15)
            newGame("Player 2")
        else if(bola.x + bola.largura > direita.x + 15)
            newGame("Player 1")
    }

    function newGame(winner) {
        if(winner == "Player 1")
            esquerda.score++;
        else(winner == "Player 2")
            direita.score++;
        
        esquerda.y = canvas.height / 2 - esquerda.altura / 2;
        direita.y = esquerda.y
        bola.y = canvas.height / 2 - bola.altura / 2;
        bola.x = canvas.width / 2 - bola.largura / 2;
        bola.mod = 0;
    }

    function desenha() {

        ctx.clearRect(0, 0, canvas.width, canvas.height)
        moveBloco();
        moveBola();

        ctx.fillStyle = "white";
        ctx.fillRect(bola.x, bola.y, bola.largura, bola.altura)
        ctx.fillRect(esquerda.x, esquerda.y, esquerda.largura, esquerda.altura) // nessa parte do bloco dentro da função desenha, usamos o fillRect para preencher dentro de canvas
        ctx.fillRect(direita.x, direita.y, direita.largura, direita.altura)     // e o fillStyle para dar uma cor 

        ctx.font = '20px Arial'; // tamanho da fonte e estilo da fonte
        ctx.fillText("Player 1: " + esquerda.score, 50, 20); // Escrevendo "Player 1" dentro do canvas
        ctx.fillText("Player 2: " + direita.score, canvas.width - 150, 20); // Escrevendo "Player 2" dentro do canvas
    }

    setInterval(desenha, 5)