console.log("Flappy Bird");

const sprites = new Image();
sprites.src = "./sprites.png";

const canvas = document.querySelector("canvas");
const contexto = canvas.getContext('2d');


//Plano de Fundo//
const planoDeFundo = {
    spriteX: 390,
    spriteY: 0,
    largura: 275,
    altura: 204,
    posX: 0,
    posY: canvas.height - 204,
    desenha() {
        contexto.fillStyle = "#07c5ce";
        contexto.fillRect(0, 0, canvas.width, canvas.height);
        contexto.drawImage(
            sprites,
            planoDeFundo.spriteX, planoDeFundo.spriteY,
            planoDeFundo.largura, planoDeFundo.altura,
            planoDeFundo.posX, planoDeFundo.posY,
            planoDeFundo.largura, planoDeFundo.altura,

        );

        contexto.drawImage(
            sprites,
            planoDeFundo.spriteX, planoDeFundo.spriteY,
            planoDeFundo.largura, planoDeFundo.altura,
            (planoDeFundo.posX + planoDeFundo.largura), planoDeFundo.posY,
            planoDeFundo.largura, planoDeFundo.altura,


        );
    },
};


//Chão//
const chao = {
    spriteX: 0,
    spriteY: 610,
    largura: 224,
    altura: 112,
    posX: 0,
    posY: canvas.height - 112,
    desenha() {
        contexto.drawImage(
            sprites,
            chao.spriteX, chao.spriteY,
            chao.largura, chao.altura,
            chao.posX, chao.posY,
            chao.largura, chao.altura,
        );
        contexto.drawImage(
            sprites,
            chao.spriteX, chao.spriteY,
            chao.largura, chao.altura,
            (chao.posX + chao.largura), chao.posY,
            chao.largura, chao.altura,
        );
    },
};

//FlappyBird//
const flappyBird = {
    spriteX: 0,
    spriteY: 0,
    largura: 33,
    altura: 24,
    posX: 10,
    posY: 50,
    gravidade: 0.25,
    velocidade:0,

    atualiza() {
        flappyBird.velocidade = flappyBird.velocidade + flappyBird.gravidade;
        flappyBird.posY = flappyBird.posY + flappyBird.velocidade;
    },
    desenha() { 
        contexto.drawImage(
            sprites,
            flappyBird.spriteX, flappyBird.spriteY, // Sprite X e Y /
            flappyBird.largura, flappyBird.altura, // Tamanho do recorte da Sprite //
            flappyBird.posX, flappyBird.posY,
            flappyBird.largura, flappyBird.altura,
        );
    }
}

function loop() {
    flappyBird.atualiza();
    planoDeFundo.desenha();
    flappyBird.desenha();
    chao.desenha();

    requestAnimationFrame(loop);
}

loop();