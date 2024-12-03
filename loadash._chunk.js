function chunk(arr, chunkSize){
    let chunkSizeCounter = 0;
    let result = [];
    let chunkArr = [];
   for(let i =0; i<arr.length; i++){
          chunkSizeCounter++;

        if(chunkSizeCounter<=chunkSize){
            chunkArr = [...chunkArr, arr[i]]
             }
             if(chunkSizeCounter === chunkSize || i === arr.length-1){
                result = [...result, chunkArr]
                chunkSizeCounter = 0;
                chunkArr = [];
             }  
   }
   return result;
}

//better version
function chunk2(arr, chunkSize){
    if (chunkSize <= 0) {
        throw new Error("Chunk size must be greater than 0");
    }

    let chunkArr = [];
    let result = [];

    for(let i =0; i<arr.length; i++){
        chunkArr.push(arr[i]);

        if(chunkArr.length===chunkSize || i=== arr.length - 1){
            result = [...result, chunkArr]
            chunkArr = []; // Reset the chunk array
        }
    }
    return result;
}

const resultant = chunk2([1,2,3,4,5], 1)
console.log(resultant)

const resultant1 = chunk2([1,2,3,4,5], 2)
console.log(resultant1)


const resultant3 = chunk([1,2,3,4,5], 1)
console.log(resultant3)

const resultant4 = chunk([1,2,3,4,5], 2)
console.log(resultant4)


const resultant5 = chunk([1,2,3,4,5], 3)
console.log(resultant5)

const resultant6 = chunk([1,2,3,4,5], 4)
console.log(resultant6)