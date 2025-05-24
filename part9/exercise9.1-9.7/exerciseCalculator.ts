interface sessions {
    periodLength: number
    trainingDays:number
    success: boolean
    rating:number
    ratingDescription: string
    target:number
    average:number
}

const parsedargs =(args: string []):{target: number ,dailyExerciseHours: number[]}=> {
    if( args.length < 4 ) throw new Error("Too few arguments");

    const target = Number(args[2]);
    if (isNaN(target)) throw new Error('Provided target value is not a number!');
    const dailyExerciseHours= args.slice(3).map( arg => {
        const value = Number(arg);
        if(isNaN(value)){
            throw new Error("Provided values should be numbers")
        }
        return  value
    });
    return { target, dailyExerciseHours}
}
const calculateExercises = ( dailyExerciseHours: number[], target: number ): sessions=> {
    const periodLength =  dailyExerciseHours.length ;
    const trainingDays = dailyExerciseHours.filter(h => h > 0 ).length;
    const sumOfHours  = dailyExerciseHours.reduce((sum , h) => sum += h , 0);
    const average = sumOfHours / periodLength;

    let rating: number;
    let ratingDescription: string;
     
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
try{
    const {target,dailyExerciseHours}= parsedargs(process.argv);
    console.log('the values are :', calculateExercises(dailyExerciseHours, target));
} catch (error: unknown) {
    let errorMessage = 'An error occurred: ';
    if (error instanceof Error) {
        errorMessage += error.message;
    }
    console.log(errorMessage);
}
