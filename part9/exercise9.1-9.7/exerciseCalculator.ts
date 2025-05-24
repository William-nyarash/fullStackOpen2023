interface sessions {
    periodLength: number
    trainingDays:number
    success: boolean
    rating:number
    ratingDescription: string
    target:number
    average:number
}
var exercise: number[] = [];

const calculateExercises = ( dailyExerciseHours: number[], target: number ) => {

    const periodLength =  dailyExerciseHours.length ;
    const trainingDays = dailyExerciseHours.filter(h => h > 0 ).length;
    const sumOfHours  = dailyExerciseHours.reduce((sum , h) => sum += h , 0);
    const average = sumOfHours / periodLength;

    let rating: number;
    let ratingDescription: string;
     console.log(`the average is : ${average}`);
     
     if (average >= target) {
        rating = 3;
        ratingDescription = 'Excellent! You reached your goal!';
      } else if (average >= target * 0.75) {
        rating = 2;
        ratingDescription = 'Not too bad but could be better';
      } else {
        rating = 1;
        ratingDescription = 'You need to put in more work!';
      }

      const success = average >= target;

      return {
        periodLength,
        trainingDays,
        success,
        rating,
        ratingDescription,
        target,
        average
      }

}
console.log(calculateExercises([3, 0, 2, 4.5, 0, 3, 1], 2));
