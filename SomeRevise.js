const debounced = (mainFunction, delay) =>{
    let timerId;

    return function(...args){
         clearTimeout(timerId);

         timerId = setTimeout(()=>{mainFunction(...args)}, delay)
    }
}


const throttled = (mainFunction, delay) =>{
    let timerId = null;

    return function(...args){
        if(timerId === null){
            mainFunction(...args)

            timerId = setTimeout(()=>{
                timerId ===null;
            }, delay)
        }
    }
}


const curried = (mainFunc) =>{
    return function curriedVersion(...args){
        if(args.length>=mainFunc.length){
            return mainFunc(...args)
        }
        else{
            return curriedVersion.bind(null, ...args);
        }
    }
}


function flatten1(arr, depth=1){
   if(depth===0)
    return arr;
   const result = [];

   for(let i =0; i<arr.length; i++){
         if(!Array.isArray(arr[i]))
            result.push(arr[i])
        else{
            const flattenedArray = flatten1(arr[i], depth-1)
            result.push(...flattenedArray)
        }
   }
   return result;
}


function flatten2(input){
    let result = {}

    for(let key in input){
        if(typeof input[key]==="object" && input[key]!==null){
            result = {...result, ...flatten2(input[key])}
        }
        else{
            result[key] = input[key]
        }
    }
    return result;
}


function flatten3(input, prefix= ""){
    let result = {}

    const pre = prefix.length>0 ? prefix+'.' : ""

    for(let key in input){
        if(typeof input[key]==="object" && input[key]!==null){
            result = {...result, ...flatten3(input[key], pre+key)}
        }
        else{
            // we assign the prefix as the new key to denote on how to access the current value in the original object
            result[key+pre] = input[key]
        }
    }
    return result;
}


function flatten4(input){
    // If received input is itself a primitive
    if(typeof input!=="object" || input == null){
        return input;
    }
    if(Array.isArray(input)){
        return flattenArray(input)
    }
    else {
        return flattenObject(input)
    }
}


function flattenArray(input){
   let flattened = []

   for(const element of input){
    if(Array.isArray(element)){
        flattened.push(...flattenArray(element))
    }
    else if(typeof element==="object" && element!==null){
        flattened.push(flattenObject(element))
    }
    else{
        flattened.push(element)
    }
   }
   return flattened;
}

function flattenObject(input){
    let flattened = {}

    for(let key in input){
        if(Array.isArray(input[key])){
            flattened[key] = flattenArray(input[key])
        }
        else if(typeof input[key]==="object" && input[key]!==null){
              flattened = {...flattened, ...flattenObject(input[key])}
        }
        else{
            flattened[key] = input[key];
        }
    }
    return flattened;
}


/***
 * 
 * Function piping is a concept from Functional Programming
that encourages use of pure functions, immutability, and the
composition of functions to build more complex functionality.
 *
 *
 *const name = getName({ name: 'JSGuy Senior' });
const uppercaseName = getUppercaseName(name);
const firstName = getFirstName(uppercaseName);
const reverseName = getReversedName(firstName);
// The above code can also be written something like this
// Nesting or composing of sequence of functions
getReversedName(getFirstName(getUppercaseName(getName({ name:
'JSGuy Senior' }))));
 *
 * 
 */

function pipe(...funcs){
    // Accept list of functions using rest operator
// Return a new function to accept `initialArgument` required
return function(initialArgument){
    // Initially our result will be the initialArgument itself
    let result = initialArgument;
    //// Loop through calling each functions passed in sequence

    for(let fn of funcs){
        // update result, since output of one func will be the input for other func
      result = fn(result);
    }
    return result;
}
}

function fetchDummyData(){

}
function autoRetryPromises(){
   let promiseResolved = false;
   for(let i = 0; i<5 && resolved; i++){
    new Promise((resolve, reject)=>{
         fetchDummyData().then((response)=>resolve(response))
         promiseResolved = true;
    }).catch((error)=>
    reject(error))
    promiseResolved = false;
   }
}

if(!Array.prototype.myMap){
    Array.prototype.myMap = function(callback){
        let newArray = [];
        for(let i =0; i<this.length; i++){
            newArray.push(callback(this[i]))
        }
        return newArray;
    }
}
let arr = [1,2,3]
arr = arr.myMap((element)=>element*2)
console.log(arr)

/***Promise.all */
Promise.all = function (promises){
     const result = [];
     const completedCount = 0; 

     const checkResolved = () =>{
        if(completedCount===promises.length){
           return this.resolve(result)
        }
     }

     promises.forEach(promise, index =>{
        Promise.resolve(promise).then((value)=>{
            result[index] = {status: "Fulfilled", value}
            completedCount++;
            checkResolved();
        }).catch((error)=>this.reject(error))
     })

    return new Promise((resolve, reject)=>{
          if(promises.length===0)
            resolve(result)
    })  
}

/***Promise.allSettled */


Promise.allSettled = function (promises){
    const result = [];
    const completedCount = 0; 

    const checkResolved = () =>{
        if(completedCount===promises.length)
            resolve(results);
    }

    return new Promise((resolve, reject)=>{
        if(promises.length===0)
            return resolve(result)
        
        promises.forEach((promise, index)=>{
            Promise.resolve(promise).then((value)=>{
                result[index] = {status: "Fulfilled", value}
                completedCount++;
                checkResolved();
        }).catch((error)=>{
            result[index] = {status:  'rejected', reason: error}
            completedCount++;
            checkResolved();
        })
    })
})
}

//****Promise.race */

Promise.race = function(promises){
    return new Promise((resolve, reject)=>{
        promises.forEach((promise, index)=>{
            Promise.resolve(promise).then((value)=>resolve(value)).catch((reason)=>reject(reason))
        })
    })
}