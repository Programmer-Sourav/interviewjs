function chunk(arr, chunksize){
   console.log(222, arr, chunksize)
   const result = []
   const subArray = []
   //subArray.length = chunksize;
   for(let i = 0; i<arr.length; i++){
      subArray.push(arr[i])
      if (subArray.length === chunksize || i === arr.length - 1) {
        result.push([...subArray]);
        subArray.length = 0;
        console.log(111, result);
    }
   }
   return result;
  
}

//chunk([1,2,3,4,5], 1) //[[1],[2],[3],[4],[5]]
chunk([1,2,3,4,5], 2) //[[1,2], [3,4], [5]]
// chunk([1,2,3,4,5], 3)
// chunk([1,2,3,4,5], 4)
//chunk([1,2,3,4,5], 5)


const count= (()=>{
    let counter = 0;
    function inner(){
        counter++;
        console.log(counter)
        return counter;
    }

    inner.reset = function (){
        counter = 0;
    }
    return inner;
})();

count()
count()
count()

count.reset();

count()