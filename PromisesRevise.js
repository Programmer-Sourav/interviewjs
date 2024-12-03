Promise.all = function(inputPromises){
 //// result arr to store the results of each promise
 const result = []

 //// counter to keep track if all the promises are resolved
 const resolvedCount = 0;

 return new Promise((resolve, reject)=>{
    //If empty arr, we can immediately resolve with []
    if(inputPromises.length===0){
        return resolve(result)
    }
    
    inputPromises.forEach(element, index => {
        // We need to wrap each `elem` in Promise.resolve(),
// since `elem` can be any value other than a Promise as well
     Promise.resolve(element).then((value)=>result[index]=value)
     resolvedCount++;

     if(resolvedCount === inputPromises.length){
        resolve(result);
     }
    }).catch((error)=>reject(error))

})
}

///Promise.allSettled
Promise.allSettled = function(inputPromises){
    const result = [];
    const totalSettled = 0;

    return new Promise((resolve, reject)=>{
        if(inputPromises.length===0)
            return resolve(result);

        inputPromises.forEach(element, index =>{
            Promise.resolve(element).then((value)=>{result[index]= {status: "fulfilled", value};
             totalSettled++;
            
            if(totalSettled===inputPromises.length)
             resolve(result)})
        }).catch((reason)=>{
            result[index] = {status: "rejected", reason};
            totalSettled++;

            if(totalSettled===inputPromises.length){
                resolve(result);
            }
        })

    })
}

///Promise.any

Promise.any = function(inputPromises){
    const errors = []
    // counter to keep track if all the promises are rejected
    let totalRejected = 0;

    return new Promise((resolve, reject)=>{
        if(inputPromises.length===0)
            return reject(new AggregateError(errors, "Empty Array"))

        inputPromises.forEach((elem, index)=>{
            Promise.resolve(elem).then((value)=>{resolve(value)}).catch((reason)=>{ 
                errors[index] = reason;
                totalRejected++;

                if(totalRejected===inputPromises.length){
                    reject(new AggregateError(errors, "All promises rejected"))
                }
            })
        })
    })
}

// Finally returns a promise which fulfills or rejects based on original promise's state and value

Promise.finally = function(callback){
    return new Promise((resolve, reject)=>{
        //To track state and value of current promise when settled
        let val;
        let wasRejected;

        // we call the callback when our original promise is settled

        this.then((value)=>{
            wasRejected = false;
            val = value
            return callback()
        }, (err)=>{
            wasRejected = true;
            val = err;
            return callback();
        })
        .then(()=>{
            // The callback could also return a promise, so we should wait for it to settle before we resolve/reject
// If the callback didn't have any error we resolve/reject the promise based on promise state
if(!wasRejected)
    resolve(val)
else
reject(val)
        }).catch((err)=>{
// If the callback returns a rejected promise or if the callback throws error
// We must reject with this new error (as per thespec, refer MDN)
return reject(err)
        })
    })
}