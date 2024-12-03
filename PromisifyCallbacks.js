const promisify = (asyncCallback)  =>{
// We return a function which will promisify the `asyncFunc`
    return function (...args){
// wrap the `asyncFunc` in a promise object and return the promise
        return new Promise((resolve, reject)=>{
              const errorfirstCallback = (error, result) =>{
                if(error instanceof Error){
                    reject(error)
                }
                else{
                    resolve(result)
                }
              }
              // Now call the async function and pass the `errorFirstCallback`
              asyncCallback(errorfirstCallback, ...args)
        })
    }

}