console.log("Flappy Bird");

const som_Hit = new Audio();
som_Hit.src = "./efeitos/hit.wav";


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
function fazColisao(flappyBird, chao) {
    const flappyBirdY = flappyBird.posY + flappyBird.altura;
    const chaoY = chao.posY;
    if (flappyBirdY >= chaoY) {
        return true;
    }
    return false;
}


function criaFlappyBird() {
    const flappyBird = {
        spriteX: 0,
        spriteY: 0,
        largura: 33,
        altura: 24,
        posX: 10,
        posY: 50,
        pulo: 4.6,
        pula() {
            flappyBird.velocidade = -flappyBird.pulo;
        },
        gravidade: 0.25,
        velocidade: 0,

        atualiza() {
            if (fazColisao(flappyBird, chao)) {
                console.log("faz coli");
                som_Hit.play();
                setTimeout(() => {
                    mudaParaTela(Telas.INICIO);
                }, 500);
                return;

            }

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
    return flappyBird;
}

//FlappyBird//


/// mensagemGetReady

const mensagemGetReady = {
    spriteX: 134,
    spriteY: 0,
    largura: 174,
    altura: 152,
    posX: (canvas.width / 2) - 174 / 2,
    posY: 50,
    desenha() {
        contexto.drawImage(
            sprites,
            mensagemGetReady.spriteX, mensagemGetReady.spriteY,
            mensagemGetReady.largura, mensagemGetReady.altura,
            mensagemGetReady.posX, mensagemGetReady.posY,
            mensagemGetReady.largura, mensagemGetReady.altura,

        )
    }
}


//TELAS//

const Telas = {
    INICIO: {
        inicializa() {
            globais.flappyBird = criaFlappyBird();
        },
        desenha() {
            planoDeFundo.desenha();
            chao.desenha();
            globais.flappyBird.desenha();
            mensagemGetReady.desenha();

        },
        click() {
            mudaParaTela(Telas.JOGO);

        },
        atualiza() {

        }

    }
};
const globais = {};
let telaAtiva = {};
function mudaParaTela(novaTela) {
    telaAtiva = novaTela; '  '
    if (telaAtiva.inicializa) {
        telaAtiva.inicializa();
    }
}


Telas.JOGO = {
    desenha() {
        planoDeFundo.desenha();
        chao.desenha();
        globais.flappyBird.desenha();
    },
    click() {
        globais.flappyBird.pula();
    },
    atualiza() {
        globais.flappyBird.atualiza();
    }

};

function loop() {
    telaAtiva.desenha();
    telaAtiva.atualiza();
    requestAnimationFrame(loop);
}
window.addEventListener("click", function () {
    if (telaAtiva.click) {
        telaAtiva.click();
    }
});

mudaParaTela(Telas.INICIO);

loop();

