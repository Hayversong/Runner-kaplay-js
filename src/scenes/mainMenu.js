import { makeSonic } from "../entities/sonic";
import { makeScenery } from "../entities/scenery";
import k from "../kaplayCtx";
import { getRank } from "../utils/rank";

const MENU_PLATFORM_SPEED = 4000;

export default function mainMenu() {
    if (!k.getData("best-score")) k.setData("best-score", 0);
    const bestScore = k.getData("best-score");

    k.onButtonPress("jump", () => k.go("game"));

    const scenery = makeScenery();

    k.add([
        k.text("SONIC RUNNER", { font: "mania", size: 120 }),
        k.pos(k.center().x, 200),
        k.anchor("center"),
    ]);

    const startText = k.add([
        k.text("Pressione espaço / clique / toque para jogar", { font: "mania", size: 60 }),
        k.pos(k.center().x, 340),
        k.anchor("center"),
        k.opacity(1),
    ]);
    startText.onUpdate(() => {
        startText.opacity = 0.55 + 0.45 * Math.sin(k.time() * 4);
    });

    k.add([
        k.text("Pule em cima dos inimigos para encadear combos", { font: "mania", size: 40 }),
        k.color(255, 220, 0),
        k.pos(k.center().x, 430),
        k.anchor("center"),
    ]);

    if (bestScore > 0) {
        k.add([
            k.text(`MELHOR SCORE : ${bestScore}   ·   RANK ${getRank(bestScore)}`, {
                font: "mania",
                size: 44,
            }),
            k.pos(k.center().x, 510),
            k.anchor("center"),
        ]);
    }

    k.add([k.rect(1920, 64), k.color(0, 0, 0), k.opacity(0.6), k.pos(0, 1016)]);
    k.add([
        k.text("Fan game feito para estudo  ·  Sonic the Hedgehog © SEGA", { font: "mania", size: 28 }),
        k.pos(k.center().x, 1048),
        k.anchor("center"),
        k.opacity(0.85),
    ]);

    makeSonic(k.vec2(200, 745));

    k.onUpdate(() => scenery.update(MENU_PLATFORM_SPEED));
}
