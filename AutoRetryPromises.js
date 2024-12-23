/****
 * maxRetryLimit (say 5)
 * have a for loop of retry count
 * First execute the promise.
 * check Result, if it resolves, finish
 * if error occurs, 
 * continue executing until the loop finishes
 * 
 */


// function AutoRetryPromise(){
//   const maxRetry = 5;
//   let resolved = false;
//   for(let i = 0; i<maxRetry && resolved; i++){
//     new Promise((resolve, reject)=>{
//         fetchData().then((response)=>{resolve(response)
//                 resolved = true;
//         }).catch((error)=>{console.log(error)
//           resolved = false;
//         })
//     })
//   }
// }

function AutoRetryPromise(){
  const maxTry = 5;
  let attempt = 0;


  function tryFetch(){
    try {
      return  new Promise((resolve, reject) => {
        fetchData().then((response) => {
          console.log("Success ", response);
          resolve(response);
        });
      });
    } catch (error) {
      attempt++;
      console.log(`Attempt ${attempt} failed: ${error}`);
      if (attempt < maxTry) {
        console.log("Retrying...");
        tryFetch().then(resolve).catch(reject);
      }
      else {
        reject("Max retries reached.");
      }
    }
  }
}



function fetchData() {
  return new Promise((resolve, reject) => {
    const success = Math.random() > 0.7; // 30% chance of success
    setTimeout(() => {
      if (success) {
        resolve('Data fetched successfully!');
      } else {
        reject('Failed to fetch data.');
      }
    }, 1000);
  });
}


// Example usage of AutoRetryPromise
AutoRetryPromise()
  .then((result) => console.log('Final Success:', result))
  .catch((error) => console.error('Final Error:', error))


 //untill retry count reaches to zero, in the catch we will retry

 function autoRetryPromises(fetchData, retryCount){

     return new Promise((resolve, reject)=>{
           
      (function retryFetch(){
          fetchData().then((value)=>resolve(value)).catch((error)=>{
                 if(retryCount-->0)
                  retryFetch()
                 else
                 reject(error)
          })
      })()

     })
 }

 autoRetryPromises(fetchData(), 3)
.then(console.log)
.catch(console.log)