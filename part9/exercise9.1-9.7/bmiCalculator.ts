type Prognosis = 'normal range' | 'over weight' | 'under weight' | 'obese' | 'invalid input';

const calculateBmi = (height: number, weight: number): Prognosis => {
    if (height <= 0) {
        console.log(`Invalid input`);
        return 'invalid input';
    }

    const standardheight = height / 100;
    const result = weight / (standardheight * standardheight);
    let BMI = result;

    if (BMI < 18.5) {
        console.log( "normal")
    } else if (BMI >= 18.5 && BMI <= 24.9) {
         console.log('normal range');
    } else if (BMI >= 25 && BMI <= 29.9) {
        console.log('over weight');
    } else if (BMI >= 30) {
        return 'obese';
    } else {
        console.log(`Invalid input`);
        return 'invalid input';
    }
}
calculateBmi(180, 74);