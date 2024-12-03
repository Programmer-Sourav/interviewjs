//We perform a series of asynchronous operations utilizing the Promise Chaning Mechanism.

const producer = new Promise(function(resolve, reject){
    setTimeout(()=>resolve(1), 1000)
}).then(function(result){
    console.log(result)
    return result*2;
}).then(function(result){
    console.log(result)
    return result*3;
}).then(function(result){
    console.log(result)
    return result*4
})

console.log(producer.then((result)=>console.log(result)))

//Here, we are not utilising the promise chaining. We are simply calling .then multiple times on a single promise. 

const producer1 = new Promise(function(resolve, reject){
    setTimeout(()=>resolve(1), 1000)
})

producer1.then(function(result){
    console.log(result)
    return result*2;
})

producer1.then(function(result){
    console.log(result)
    return result*3;
})

producer1.then(function(result){
    console.log(result)
    return result*3;
})

producer1.then(function(result){
    console.log(result)
    return result*4;
})

console.log(producer1.then((result)=>console.log(result)))

//returning promises
// A handler, used in .then(handler) may create and return a promise.
// In that case further handlers wait until it settles, and then get its result.

const producer3 = new Promise(function(resolve, reject){
    setTimeout(()=>resolve(1), 1000)
}).then(function(result){
    console.log(result)
    return new Promise(function(resolve, reject){
        setTimeout(()=>resolve(result*2), 1000)
        
    })
}).then(function(result){
    console.log(result)
    return new Promise(function(resolve, reject){
        setTimeout(()=>resolve(result*2), 1000)
    })
})
// .then(function(result){
//     console.log(result)
//     return result;
// })
console.log(producer3.then((result)=>console.log(result)))