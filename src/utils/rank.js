const RANK_GRADES = ["F", "E", "D", "C", "B", "A", "S"];
const RANK_VALUES = [50, 80, 100, 200, 300, 400, 500];

export function getRank(score) {
    let rank = "F";

    for (let i = 0; i < RANK_VALUES.length; i++) {
        if (RANK_VALUES[i] < score) rank = RANK_GRADES[i];
    }

    return rank;
}
