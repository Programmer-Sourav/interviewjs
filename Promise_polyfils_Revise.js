
// `Promise.all()` accepts an array of promises as input and
// returns a Promise object.
// 1. The returned promise will be resolved when all the
// promises in the input array are resolved.
// 2. If any of the promises in the input array is rejected, the
// returned promise will be rejected with the reason for the
// first rejected promise.






Promise.all = function(inputPromises){

    let result = [];
    let countOfResolved = 0;

    return new Promise((resolve, reject)=>{
      
        const totalResoved = () =>{
          if(countOfResolved === inputPromises.length){
            return resolve(result)
          }
        }

       for(let i =0; i<inputPromises.length; i++){
            Promise.resolve(inputPromises[i]).then((value)=>{
                result[i] = {status: "Fulfilled", value}
                countOfResolved++;
                totalResoved();
            }).catch((error)=>reject(error)) // Reject on the first error
       }
    })
}

Promise.allSettled = function(promises) {
    return new Promise((resolve) => {
        const results = [];
        let completedCount = 0;

        const checkResolved = () => {
            if (completedCount === promises.length) {
                resolve(results);
            }
        };

        promises.forEach((promise, index) => {
            Promise.resolve(promise)
                .then(value => {
                    results[index] = { status: "fulfilled", value };
                    completedCount++;
                    checkResolved();
                })
                .catch(error => {
                    results[index] = { status: "rejected", reason: error };
                    completedCount++;
                    checkResolved();
                });
        });
    });
};

Promise.any = function(promises) {
    return new Promise((resolve, reject) => {
        const errors = [];
        let rejectedCount = 0;

        promises.forEach((promise, index) => {
            Promise.resolve(promise)
                .then(value => {
                    // If one promise fulfills, resolve the outer promise
                    resolve(value);
                })
                .catch(error => {
                    // If a promise rejects, store the error
                    errors[index] = error;
                    rejectedCount++;
                    
                    // If all promises reject, reject with an AggregateError
                    if (rejectedCount === promises.length) {
                        reject(new AggregateError(errors, "All promises were rejected"));
                    }
                });
        });
    });
};

// Case 1: Promise.race resolves with the value if the first
// settled promise is resolved.
// Case 2: Promise.race also rejects with the reason if the first
// settled promise is rejected.


Promise.race = function(inputPromises){

    return new Promise((resolve, reject)=>{
        inputPromises.forEach((element, index)=>{
            Promise.resolve(element).then((value)=>resolve(value)).catch((error)=>reject(error))
        })
    })
}


// `.finally()` method of promises accepts a callback function to
// be called when the promise is settled (either fulfilled or
// rejected). The `.finally()` method also returns a new Promise
// object which ultimately allows you to chain calls of other
// promise methods like `.then()` and `.catch()`



//Here's how you could implement the Promise.prototype.finally method. 
// The finally method is called on a promise and takes a callback function that 
// executes regardless of whether the promise resolves or rejects. The key is to 
// ensure that the callback is always called, and if it returns a promise, we wait 
// for it to settle before resolving or rejecting the main promise.

Promise.prototype.finally = function(callback) {
    return this.then(
        (value) => {
            // If callback returns a promise, wait for it to resolve and then return the original value
            return Promise.resolve(callback()).then(() => value);
        },
        (error) => {
            // If callback returns a promise, wait for it to resolve and then throw the original error
            return Promise.resolve(callback()).then(() => { throw error });
        }
    );
};






























