interface returnValue {
    periodLength: number;
    trainingDays: number;
    success: boolean;
    rating: number;
    ratingDescription: string;
    target: number;
    average: number;
}

interface RatingTypes {
    1: string;
    2: string;
    3: string;
}

const ratingTexts: RatingTypes = {
    1: "ain't not so good innit",
    2: 'it be aight, nothing special tho',
    3: 'HA DAMN!! let him cook',
};

const calculateExercises = (
    dailyExerciseHours: number[],
    targetHours: number
): returnValue => {
    const averageHours: number =
        dailyExerciseHours.reduce((x, y) => x + y, 0) /
        dailyExerciseHours.length;
    const r = averageHours / targetHours;
    let rating: 1 | 2 | 3;
    if (r < 0.4) {
        rating = 1;
    } else if (r < 0.8) {
        rating = 2;
    } else rating = 3;

    const returnObject: returnValue = {
        periodLength: dailyExerciseHours.length,
        trainingDays: dailyExerciseHours.reduce(
            (x, y) => (y != 0 ? 1 + x : x),
            0
        ),
        success: averageHours >= targetHours,
        rating: rating,
        ratingDescription: ratingTexts[rating],
        target: targetHours,
        average: averageHours,
    };
    return returnObject;
};
const expectedHours: number = parseInt(process.argv[2]);
const exerciseHours: number[] = process.argv.slice(3).map((x) => parseFloat(x));
console.log(calculateExercises(exerciseHours, expectedHours));

export { calculateExercises };
