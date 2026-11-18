import k from "../kaplayCtx";
import { getRank } from "../utils/rank";

export default function gameover(citySfx){
    citySfx.paused = true;
    let bestScore = k.getData("best-score");
    const currentScore = k.getData("current-score");

    let currentRank = getRank(currentScore);
    let bestRank = getRank(bestScore);
    const isNewRecord = bestScore < currentScore;

    if (isNewRecord) {
        k.setData("best-score", currentScore);
        bestScore = currentScore;
        bestRank = currentRank;
    }

    if (isNewRecord) {
        const recordText = k.add([
            k.text("NOVO RECORDE!", { font: "mania", size: 64 }),
            k.color(255, 220, 0),
            k.anchor("center"),
            k.pos(k.center().x, k.center().y - 420),
            k.opacity(1),
        ]);
        recordText.onUpdate(() => {
            recordText.opacity = 0.55 + 0.45 * Math.sin(k.time() * 6);
        });
    }
    k.add([
        k.text("GAME OVER", { font: "mania", size: 96 }),
        k.anchor("center"),
        k.pos(k.center().x, k.center().y - 300),
    ]);
    k.add([
        k.text(`MELHOR SCORE : ${bestScore}`, {
            font: "mania",
            size: 64,
        }),
        k.anchor("center"),
        k.pos(k.center().x - 400, k.center().y - 200),
    ]);
    k.add([
        k.text(`SCORE ATUAL : ${currentScore}`, {
            font: "mania",
            size: 64,
        }),
        k.anchor("center"),
        k.pos(k.center().x + 400, k.center().y - 200),
    ]);

    const bestRankBox = k.add([
        k.rect(400, 400, { radius: 4 }),
        k.color(0, 0, 0),
        k.area(),
        k.anchor("center"),
        k.outline(6, k.Color.fromArray([255, 255, 255])),
        k.pos(k.center().x - 400, k.center().y + 50),
    ]);

    bestRankBox.add([
        k.text(bestRank, { font: "mania", size: 100 }),
        k.anchor("center"),
    ]);

    const currentRankBox = k.add([
        k.rect(400, 400, { radius: 4 }),
        k.color(0, 0, 0),
        k.area(),
        k.anchor("center"),
        k.outline(6, k.Color.fromArray([255, 255, 255])),
        k.pos(k.center().x + 400, k.center().y + 50),
    ]);

    currentRankBox.add([
        k.text(currentRank, { font: "mania", size: 100 }),
        k.anchor("center"),
    ]);

    k.wait(1, () => {
        k.add([
            k.text("Pressione espaço/Clique/Toque para jogar de novo", {
                font: "mania",
                size: 64,
        }),
            k.anchor("center"),
            k.pos(k.center().x, k.center().y + 350),
        ]);
        k.onButtonPress("jump", () => k.go("game"));
    });
}