const calculateBmi = (height: number, weight: number): string => {
    const bmiNumber: number = weight / (height / 100) ** 2;
    let bmiText: string = '';
    if (bmiNumber < 18.5) {
        bmiText = 'Underweight';
    } else if (bmiNumber < 25) {
        bmiText = 'Normal range';
    } else if (bmiNumber < 30) {
        bmiText = 'Overweight';
    } else {
        bmiText = 'Phat af';
    }
    return 'you be ' + bmiText;
};

const height: number = parseInt(process.argv[2]);
const weight: number = parseInt(process.argv[3]);

console.log(calculateBmi(height, weight));

export default calculateBmi;
