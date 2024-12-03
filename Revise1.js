//Debouncing

const debounced = (mainFn, delay) =>{
   let timerId;
   return function(...args){
    clearTimeout(timerId);
    timerId = setTimeout(()=>{mainFn(args)}, delay)
   }
}

//N-Async Series
function nAsyncSeries(asyncFuncArr){
    return function (callbackFn, initialData){
        let index = 0;
        const callbackMeWhenCompleted = (error, result) =>{
            if(error instanceof Error){
                callbackFn(error, undefined);
            }
            else{
                   index++;
                   const nextAsyncFn = asyncFuncArr[index];
                   if(nextAsyncFn){
                       nextAsyncFn(callbackMeWhenCompleted, result)
                   }
                   else{
                       callbackFn(undefined, result)
                   }
            }
        }
        const firstAsyncFunc = asyncFuncArr[index];
        firstAsyncFunc(callbackMeWhenCompleted, initialData)
    }

}
//N-async parallel
function parallel(asyncFuncsArr){
  
    return function(callbackFn, initialData){
        let errorFound = false;
        let resultCount = 0;
        const resultArr = []

        asyncFuncsArr.forEach((asyncFunc, index) => {
            const callbackMeWhenCompleted = (error, result)=>{
                if(errorFound) return;

                if(error instanceof Error){
                    errorFound = true;
                    callbackFn(error, undefined)
                }
                else{
                    resultArr[index] = result;
                    resultCount++;
                }
               // When all of the asyncFuncs are completed, call the `mainCallback` passing the resultsArr as well
                if(resultCount === asyncFuncsArr.length){
                    callbackFn(undefined, resultArr)
                }
            }
            // Call all the asyncFunc with the same `initData`
            asyncFunc(callbackMeWhenCompleted, initialData);
        });

    }
}

//N-async Race

function race(asyncFuncArr){
    return function(mainCallback, initialData){
        let completed = false;

        asyncFuncArr.forEach((asyncFunc, index)=>{
            const callbackMeWhenCompleted = (error, result) =>{

                if(completed){
                    return;
                }
                completed = true;

                if(error instanceof Error){
                    mainCallback(error, undefined)
                }
                else{
                    mainCallback(undefined,result)
                }
            }
            asyncFunc(callbackMeWhenCompleted, initialData)
        })
    }
}