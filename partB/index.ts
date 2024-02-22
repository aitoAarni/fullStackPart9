import express from 'express';
import { calculateExercises } from './exerciseCalculator';

const app = express();

app.use(express.json());
interface request {
    dailyExercises: string[];
    target: string; // testing
}

app.post('/exercises', (req, res) => {
    const { dailyExercises, target }: request = req.body; // eslint-disable-line @typescript-eslint/no-unsafe-assignment

    if (!dailyExercises || !target) {
        return res.status(400).send({ error: 'parameters missing' });
    }
    const numericExercises: number[] = dailyExercises.map((item) =>
        Number(item)
    );
    const numericTarget: number = Number(target);

    if (
        numericExercises.reduce((x, y) => x || isNaN(y), false) ||
        isNaN(Number(numericTarget))
    ) {
        return res.status(422).send({ error: 'malformatted parameters' });
    }

    const result = calculateExercises(numericExercises, numericTarget);
    return res.send(result);
});

const PORT = 3002;

app.listen(PORT, () => {
    console.log(`server be runnings on port ${PORT}`);
});
