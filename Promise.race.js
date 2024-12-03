///Steps:

// Check if Promise.race exists:

// if (!Promise.race): Only define the polyfill if Promise.race is not already defined.
// Return a new Promise:

// return new Promise((resolve, reject) => { ... });: This new promise will resolve or reject based on the iterable.
// Iterate over the iterable:

// for (const promise of iterable) { ... }: Loop through each item in the iterable.
// Convert each item to a Promise:

// Promise.resolve(promise).then(resolve, reject);: Ensure each item is a 
// promise and attach then handlers to resolve or reject the outer promise based on the first settled promise.

if(!Promise.race)
    Promise.race = function(iterables){
           return new Promise((resolve, reject)=>{
               for(const promise of iterables){
                 Promise.resolve(promise).then(resolve, reject)
               }
           })
    }