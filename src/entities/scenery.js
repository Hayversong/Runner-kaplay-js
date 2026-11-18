import k from "../kaplayCtx";

const BG_PIECE_WIDTH = 1920;
const BG_SCALE = 2;
const BG_SPEED = 100;
const PLATFORM_WIDTH = 1280;
const PLATFORM_SCALE = 4;
const PLATFORM_Y = 450;

// Cenário infinito: duas cópias de cada camada andam lado a lado.
// Quando a da frente sai da tela, ela vai para trás da outra e as duas trocam de papel.
function makeLoopingLayer(spriteName, width, scale, y, options = []) {
    const step = width * scale;
    const pieces = [
        k.add([k.sprite(spriteName), k.pos(0, y), k.scale(scale), ...options]),
        k.add([k.sprite(spriteName), k.pos(step, y), k.scale(scale), ...options]),
    ];

    return (speed) => {
        if (pieces[1].pos.x < 0) {
            pieces[0].moveTo(pieces[1].pos.x + step, y);
            pieces.push(pieces.shift());
        }

        pieces[0].move(-speed, 0);
        pieces[1].moveTo(pieces[0].pos.x + step, y);
    };
}

export function makeScenery() {
    const updateBackground = makeLoopingLayer("chemical-bg", BG_PIECE_WIDTH, BG_SCALE, 0, [k.opacity(0.8)]);
    const updatePlatforms = makeLoopingLayer("platforms", PLATFORM_WIDTH, PLATFORM_SCALE, PLATFORM_Y);

    return {
        // O fundo anda devagar e as plataformas na velocidade do jogo: é isso que cria o parallax.
        update(platformSpeed) {
            updateBackground(BG_SPEED);
            updatePlatforms(platformSpeed);
        },
    };
}
