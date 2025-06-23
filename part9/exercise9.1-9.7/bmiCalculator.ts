require.main === module

type Prognosis = 'normal range' | 'overweight' | 'under weight' | 'obese' | 'invalid input';

interface bmivalues {
    value1: number
    value2:number
}
export  const dataFromCli = ( args: string [] ):bmivalues=> {
    if(args.length < 4) throw new Error('less arguments than expected') 
    if(args.length > 4) throw new Error('too much arguments than expected') 

        if (isNaN(Number(args[2])) || isNaN(Number(args[3]))) {
            throw new Error('Provided values were not number!');
        } else {
            return {
                value1: Number(args[2]),
                value2: Number(args[3])
            };
        }
    }
export const calculateBmi = (height: number, weight: number): Prognosis => {
    
    if (height <= 0 || weight <= 0 || isNaN(height) || isNaN(weight)) {
        return 'invalid input';
      }
    
      const heightInMeters = height / 100;
      const bmi = weight / (heightInMeters * heightInMeters);
    
      if (bmi < 18.5) {
        return 'under weight';
      } else if (bmi <= 24.9) {
        return 'normal range';
      } else if (bmi <= 29.9) {
        return 'overweight';
      } else if (bmi >= 30) {
        return 'obese';
      } else {
        return 'invalid input';
      }
}

try {
    const {value1, value2} = dataFromCli(process.argv);
    console.log(`Prognosis: ${calculateBmi(value1,value2)}`);
}catch (error: unknown) {
 let errorMessage= 'An error occured'
 if(error instanceof Error) {
    errorMessage +='Error: ' + error.message;
 }
 console.log(errorMessage);
}