//suppose input promises are 10
//maxLot is 5
//so first, 5 promises will process, run a for loop, resolve or reject
//keep track of pending promises
//once a promise is resolve or rejected, pending--, resolved++;
//once a promise is processed, go to the next promise to process it
//once max lot is completed, process the next lot

function throttlePromises(inputPromises, maxLot){

   const results = [];
   const resolved = 0;
   const pending = 0;
   let   index = 0; // To track the current index of promises being processed

   const processNextLot = () =>{

    for(let i =0; i<inputPromises.length && index<=maxLot; i++){
        const currentPromise = inputPromises[index];
        const currentIndex = index; // Capture current index for result tracking
        index++;  // Move to the next promise in the array
        pending++;


        currentPromise.then((result)=>{
           results[currentIndex] = result;
           resolved++;
           pending--;

           //If all promises are processed, resolve the main promise
           if(resolved === inputPromises.length){
            return length;
           }
            // Process more promises if pending slots open up
            if(pending<maxLot){
                processNextLot();
            }
        }).catch((error)=>{
           results[currentIndex] = error;
           resolved++;
           pending--;

           if(resolved === inputPromises.length){
            return results;
           }
           if(pending<maxLot){
            processNextLot();
           }
        }) 
}

    //start processing
    return new Promise((resolve, reject)=>{
        processNextLot();

        //continuously check if all promises are resolved
        const checkCompletion = setInterval(()=>{
            if(resolved === inputPromises.length){
                clearInterval(checkCompletion);
                resolve(results);
            }
        }, 50)
       
         
    })
}
}