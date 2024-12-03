Promise.all = function(promises){
    let result = []

    return new Promise((resolve, reject)=>{
          if(promises.length===0){
            resolve(result)
          }

          const checkResolved = () =>{
            if(completedCount === promises.length){
                return resolve(result)
            }
          }

          promises.forEach((element, index) => {
                Promise.resolve(element).then((value)=>{
                       result[index] = {status: "Fulfilled", value}
                       completedCount++;
                       checkResolved();
                }).catch((error)=>reject(error))
          });
    })
}


Promise.race = function(promises){

    return new Promise((resolve, reject)=>{
      promises.forEach((element, index)=>{
        Promise.resolve(element).then((value)=>resolve(value)).catch((reason)=>reject(reason))
      })
    })
}


Promise.allSettled = function(promises){
  

  return new Promise((resolve, reject)=>{
    const completedCount = 0;
    const result = [];
  
    const checkResolved = () =>{
      if(completedCount===promises.length)
      resolve(result);
  }  
  
  promises.forEach((element, index)=>{
    element.then((value)=>{
      result[index] = {status: "Fulfilled", value}
      completedCount++;
      checkResolved();
    }).catch(error=>{
      result[index] = {status: "Rejected", reason: error}
      completedCount++;
      checkResolved();
    })

  })
  })
}