interface Result  { 
    periodLength: number;
    trainingDays: number;
    success: boolean;
    rating: number;
    ratingDescription: string;
    target: number;
    average: number; }


const parseArgs = (args: Array<string>): Array<number> => {
    if (args.length < 9) throw new Error('Not enough arguments');
    args.splice(0,2);
    return args.map(element => {
        if(!isNaN(Number(element)))
        {return Number(element);}
        else {
            throw new Error('Provided values were not numbers!');
        }
    });
    };
    

export const calculateExercises =  (array: Array<number>, target: number): Result => {
    const periodLength = array.length;
    const trainingDays = array.filter(n => n > 0).length;
    const average = array.reduce((a , b) => a + b)/periodLength;
    let rating;
    let ratingDescription;
    let success;
    if(average/target >= 1)
       { rating = 3;
        ratingDescription = 'good work';
        success = true;}
    else if (average/target > 0.5 && average/target < 1)
    {
        rating = 2;
        ratingDescription = 'not too bad but could be better';
        success = false;
    }
    else {
        rating = 1;
        ratingDescription = 'you should workout more';
        success = false;
    }
    return {
        periodLength,
        trainingDays,
        target,
        average,
        rating,
        ratingDescription,
        success
    };
    
};


try {
    const array = parseArgs(process.argv);
    const target = 2;
    console.log(calculateExercises(array, target));
  } catch (e) {
    console.log('Error, something bad happened, message: ', e.message);
  }
