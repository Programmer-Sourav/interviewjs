function series(asyncFuncArr){
   return function(mainCallback, initialData){
    let index = 0;

    const callbackMeWhenCompleted = (error, result) =>{
        // Now, when this func `callbackMeWhenCompleted` is called, means the async task was completed - either with an
//`error` or with `result`

          if(error instanceof Error){
            // If the asyncFunc had an error, just return away by calling the `mainCallback` with the same `error`
           mainCallback(error, undefined);
          }
          else{
            // Increment `idx` to get the `nextAsyncFunc`
            // If not an error, pass current `result` to the nextAsyncFunc
            index++;
            const nextAsyncFunc = asyncFuncArr[index];
            // If we have `nextAyncFunc`, we continue execute in "series"
            if (nextAsyncFunc) {
                nextAsyncFunc(callbackMeWhenCompleted,result);
                }
                else{
                    mainCallback(undefined, result)
                }
          }
    }
    const firstAsyncFunc = asyncFuncArr[index];
    firstAsyncFunc(callbackMeWhenCompleted, initialData);
   }
}


const promisify = (asyncFunct) =>{
    // We return a function which will promisify the `asyncFunc`
    return function(...args){
        // wrap the `asyncFunc` in a promise object and return the promise
        return new Promise((resolve, reject)=>{
            const errorFirstCallback = (error, result) =>{
                if(error instanceof Error){
                    reject(error)
                }
                else{
                    resolve(result)
                }
            }
            // Now call the async function and pass the `errorFirstCallback`
            asyncFunct(errorFirstCallback, ...args);
        })
    }
}

function series2(asyncFuncArr){
    return function(mainCallback, initData){
        // Create your `initialPromise` to be passed to the `reduce` method as the initialValue
    const initialPromise = Promise.resolve(initData);
        // Iterate over all the `asyncFuncs` and reduces to a `finalPromise`
        // Ultimately this forms chains all of the promises promise, making the asyncFuncs to execute in "series"

        const finalPromise  = asyncFuncArr.reduce((resultPromise, nextAsyncFunc)=>{
            return resultPromise.then(result=>{
                // When resolved with result, promisify `nextAsyncFn`
                const promisifiedAsyncFunc = promisify(nextAsyncFunc);
                // Execute `promisifiedAsyncFunc` and return it to make it part of the promise chain
                return promisifiedAsyncFunc(result);
            }).catch(error => Promise.reject(error))
        }, initialPromise)
        // Finally when the `finalPromise` resolves/rejects, call the `mainCallback` based on the settled state of the promise
        finalPromise.then(finalResult =>mainCallback(undefined, finalResult)).catch(error=>mainCallback(error, undefined))
    }
}