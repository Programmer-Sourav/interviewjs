// We initialize an empty array results to store the results of the promises.
// We track the current index being processed (index) and the number of promises currently pending (pending).
// We define a processNext function to process the next batch of promises.
// Inside processNext, we iterate over the promises array and execute promises in batches of size max.
// We increment pending for each promise being processed and decrement it when a promise is settled (fulfilled or rejected).
// When all promises have been processed and there are no pending promises, we resolve the promise with the results array.
// You can use this throttlePromises function to throttle the execution of promises and limit the number of promises being processed concurrently.


function throttlePromises(promises, max){
    return new Promise((resolve, reject)=>{
        const results = [];
        let index = 0;
        let pending = 0;

        const processNext = () =>{
            if(index>=promises.length && pending===0){
                resolve(results);
                return;
            }

            while(pending<max && index<promises.length){
                const currentIndex = index++;
                const currentPromise = promises[currentIndex]();
                pending++;

                currentPromise.then(result=>{
                    results[currentIndex] = result;
                }).catch(error=>{
                    results[currentIndex] = {error};
                }).finally(()=>{
                    pending--;
                    processNext();
                });
            }
        };
           processNext();
    })
}



const getRandomTimer = () => Math.round(Math.random() * 1000);
const getFulfillingPromise = (value) => {
return new Promise(resolve => {
setTimeout(() => resolve(value), getRandomTimer())
})
}
const getRejectingPromise = (value) => {
return new Promise((resolve, reject) => {
setTimeout(() => reject(value), getRandomTimer())
})
}
const input1 = new Array(10).fill(null).map((elem, index) => ()=> getFulfillingPromise(index));
const input2 = new Array(10).fill(null).map((elem, index) => {
if (index === 6)
return () => getRejectingPromise(index);
else
return () => getFulfillingPromise(index);
})


throttlePromises(input1, 5)
.then(data => console.log('Resolved with', data))
.catch(error => console.log('Rejected with', error))
// Resolved with [ 0, 1, 2, 3, 4, 5, 6, 7, 8, 9 ]
// ---------------------------------------
throttlePromises(input1, 3)
.then(data => console.log('Resolved with', data))
.catch(error => console.log('Rejected with', error))
// Resolved with [ 0, 1, 2, 3, 4, 5, 6, 7, 8, 9 ]
// ---------------------------------------
throttlePromises(input2, 4)
.then(data => console.log('Resolved with', data))
.catch(error => console.log('Rejected with', error))