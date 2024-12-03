function race(asyncFuncArr){
    return function(mainCallback, initData){
        // `completed` tracks if any of this async functions was completed or not
        let completed = false;
        asyncFuncArr.forEach((element, id)=>{
            const callbackMeWhenCompleted = (error, result) =>{
                // If any of the async functions is completed, return away
                if(completed)
                    return;
                // Mark `completed` as true, which indicates the race among the async functions is completed
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
            asyncFunc(callbackMeWhenCompleted, initData)
        })
    }
}


const promisify = (asyncFunc) =>{
    // We return a function which will promisify the `asyncFunc`
    return function(...args){
        // wrap the `asyncFunc` in a promise object and return the promise
        return new Promise((resolve, reject)=>{
            const errorFirstCallback = (error, result) =>{
                if(error instanceof Error)
                    reject(error)
                else
                resolve(result);
            }
            // Now call the async function and pass the `errorFirstCallback`
            asyncFunc(errorFirstCallback, ...args)
        })
    }

    function race(asyncFuncArr){
        
        return function(mainCallback, initialData){
            // `completed` tracks if any of this async functions was completed or not
            let completed = false;

            asyncFuncArr.forEach((element, id) =>{
                const promisifiedAsyncFunc = promisify(element);
                promisifiedAsyncFunc(initialData).then(result=>{
                    if(completed)
                        return;
                    // Mark `completed` as true, which indicates the race among the async functions is completed
                    completed = true;
                    // Call `mainCallback` with the result value
                    mainCallback(undefined, result);
                }).catch(error=>{
                    if(completed)
                        return;
                    completed = true;
                    // Call `mainCallback` with the same error value
                    mainCallback(error, undefined)
                })
            })
        }
    }
}