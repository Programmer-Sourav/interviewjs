// Finally returns a promise which fulfills or rejects based on
//original promise's state and value
Promise.finally = function(callback){
    return new MyPromise((resolve, reject)=>{
          let val;
          let wasRejected;

          this.then((value)=>{
            wasRejected = false;
            val = value;
            return callback();
          }, (err)=>{
             wasRejected = true;
             val = err;
             return callback();
          }).then(()=>{
            // The callback could also return a promise, so we should wait for it to settle before we resolve/reject
           // If the callback didn't have any error we resolve/reject the promise based on promise state
            if(!wasRejected)
                {
                    return resolve(val);
                }
                return reject(val);
          }).catch((err)=>{
            // If the callback returns a rejected promise or if the callback throws error
            // We must reject with this new error 
             return reject(err)
          })
    })
}

/***Analyze  o/p */
Promise.reject(3)
.finally(() => { throw 'New Error'; })
.catch(console.log)
// New Error
Promise.reject(3)
.finally(() => Promise.reject('Rejected Error'))
.catch(console.log)
// Rejected Error
Promise.resolve(10)
.then((value) => console.log('Resolved with', value))
.catch(((error) => console.log('Rejected with', error)))
.finally(() => console.log('Perform some cleanup (or) handling'))
// Resolved with 10
// Perform some cleanup (or) handling

Promise.reject(20)
.then((value) => console.log('Resolved with', value))
.catch(((error) => console.log('Rejected with', error)))
.finally(() => console.log('Perform some cleanup (or) handling'))
// Rejected with 20
// Perform some cleanup (or) handling