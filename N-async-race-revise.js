function asyncRace(inputArrayOfCallbackFunctions){
  return function (mainCallback, initialData){
         // `completed` tracks if any of this async functions was completed or not
         let completed = false;
         inputArrayOfCallbackFunctions.forEach(asyncFuncelement => {
               const callbackMeWhenCompleted = (error, result) =>{
                // If any of the async functions is completed, return
                  if(completed)
                    return;

                  // Mark `completed` as true, which indicates the
                  //race among the async functions is completed
                   completed = true;

                   if(error instanceof Error){
                    // If error, call `mainCallback` with the same error
                    mainCallback(error, undefined)
                   }
                   else{
                    // Else call `mainCallback` with the result value
                    mainCallback(undefined, result)
                   }
               }

               asyncFuncelement(callbackMeWhenCompleted ,initialData)
               
         });
  }
}