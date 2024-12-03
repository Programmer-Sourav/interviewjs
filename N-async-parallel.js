function parallel(asyncFuncsArr){
    return (mainCallback, initData)=>{
        // tracks if any error has occurred in the asyncFuncs
        let errorFound = false;
        // tracks the count of the number of async functions that completed with result
        let resultCount = 0;
        // stores the result of all the asyncFuncs maintaining the index of the results
        const resultArr =[]

        asyncFuncsArr.forEach(element, idx => {
            const callbackMeWhenCompleted = (error, result)=>{
                // If an error was already found, just skip
                if (errorFound) {
                    return;
                    }
               // If the error occurs, call the `mainCallback` right way passing the error value
               if(error instanceof Error){
                errorFound = true;
                mainCallback(error, undefined);
               }  
               else{
                resultArr[idx] = result;
                resultCount++;
               } 
               // When all of the asyncFuncs are completed, call the `mainCallback` passing the resultsArr as well 

               if (resultCount === asyncFuncsArr.length) {
                mainCallback(undefined, resultArr);
                }
            }
            // Call all the asyncFunc with the same `initData`
          asyncFunc(callbackMeWhenCompleted, initData);
        });
    }
}

//2nd approach
//promisify

const promisify = (asyncFunc) =>{
// We return a function which will promisify the `asyncFunc`
return function(...args){
    // wrap the `asyncFunc` in a promise object and return the promise
    return new Promise((resolve, reject)=>{
        const errorFirstCallback = (error, result) =>{
            if(error instanceof Error)
                reject(error)
            else 
                resolve(result)
        }
        // Now call the async function and pass the `errorFirstCallback`
        asyncFunc(errorFirstCallback, ...args)
    })
}
}

function parallel(asyncFuncArr){
    // return a helper function which would help us parallelize the asyncFuncs
    return (mainCallback, initData) =>{
        // tracks if any error has occured in the asyncFuncs
        let errorFound = false;
        // tracks the count of the number of async functions that completed with result
        let resultCount = 0;
        // stores the result of all the asyncFuncs maintaining the index of the results
        const resultArr = []

        // iterate on each async funcs and execute them in parallel
        asyncFuncArr.forEach((element, id)=>{
            // Promisify the async function
            const promisifiedAsyncFunc = promisify(element);
            promisifiedAsyncFunc(initData).then((error)=>{
                if(errorFound)
                    return;
                resultArr[id] = result;
                resultCount++;
    
                // When all of the asyncFuncs are completed, call the `mainCallback` passing the resultsArr as well
                if (resultCount === asyncFuncArr.length) {
                    mainCallback(undefined, resultArr);
                     }
            }).catch(error => {
                if (errorFound) {
                return;
                }
                // If the error occurs, call the `mainCallback` right way passing the error value
                errorFound = true;
                mainCallback(error, undefined);
                })
        })

       
    }
}


