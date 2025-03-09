//version-01
function Calculator(initialValue = 0){
    this.value = initialValue;
    console.log(1111, this.value);
    this.add = function(num){
        console.log(2222, num)
        this.value = this.value + num;
        return this;
    };
    this.sub = function(num){
        this.value = this.value - num;
        return this;
    };

    this.mul = function(num){
        this.value = this.value *num;
        return this;
    };

    this.divide = function(num){
        this.value = this.value /num;
        return this;
    };

    this.showResult = function(){
        return this.value;
    };
}
const calc = new Calculator();
console.log(calc.add(5).sub(2).mul(3).divide(2).showResult());

//version-02
const Calc = {
    value : 0,

    add : function(num){
        this.value = this.value+ num;
        return this;
    },

    sub : function(num){
        this.value = this.value - num;
        return this;
    },

    mul : function(num){
        this.value = this.value * num;
        return this;
    },

    divide : function(num){
        this.value = this.value/num;
        return this;
    },

    showResult : function(){
        return this.value;
    }

}

console.log(Calc.add(5).sub(3).add(10).mul(2).divide(3).showResult())

//Prototypical Inheritance

function Person(name){
    this.name = name;
}

// Adding a method to the prototype
Person.prototype.sayHello = function(){
    console.log(`Greetings! .${this.name}`)
}

const john = new Person("John");
const jane = new Person("Jane");

john.sayHello();
jane.sayHello();

// Checking prototype chain
console.log(john.__proto__ === Person.prototype);

function Animal(name){
    this.name = name;
}

Animal.prototype.speak = function(){
    console.log(`Animal Speaking ${this.name}`)
}

function Dog(name, breed){
    Animal.call(this,name);
    this.breed = breed;
}

Dog.prototype = Object.create(Animal.prototype);
Dog.prototype.constructor = Dog;
Dog.prototype.speak = function(){
    console.log(`Dog Barking ${this.name}`)
}

const dog = new Dog("Rex", "Labrador");
console.log(dog.speak());


///3. call()
Function.prototype.myCall = function(thisContext, ...args){
 const fn = this;
 const context = Object(thisContext);
 const key = Symbol();
 context[key] = fn;
 const result = context[key](...args)
 delete context[key]
 return result;
}
///apply
Function.prototype.myApply = function(context, ...args){
   const fn = this;
   const context = Object(context);
   const key = Symbol()
   context[key] = fn;
   const result = context[key](...args);
   delete context[key];
   return result;
}

///bind

Function.prototype.bind = function(context, ...args){
    const fn = this;
    const context = Object(context);
    const key = Symbol();
    context[key] = fn;
    return function(){
        return context[key](...args)
    }
}


///map
Array.prototype.myMap = function(callback){
    const result = []

    for(let i =0; i<this.length; i++){
        result.push(callback(this[i], i, this))
    }
    return result;
}

///filter

Array.prototype.myFilter = function(callback){
    const result = [];

    for(let i =0; i<this.length; i++){
        if(callback(this[i], i, this)){
            result.push(this[i])
        }
    }
    return result;
}


////reducer

Array.prototype.myreduce = function(callback, initialValue){
    let accumulator = initialValue === undefined? this[0] : initialValue;
    const start = initialValue === undefined? 1: 0;
    for(let i = start; i<this.length; i++){
        accumulator = callback(accumulator, this[i], i, this);
    }
    return accumulator;
}

///FlattenNestedArrayUsingRecursion

function flattenArray(arr){
    return arr.reduce((acc, curVal)=>acc.concat(Array.isArray(curVal)? flattenArray(curVal) : curVal), [])
}

////Flatten a complex Object

function flattenObject(obj, prefix = ""){
    const result = {};

    for(const key in obj){
        const newKey = prefix ? `${prefix}.${key}` : key;
        if(typeof(obj[key]=== "object") && obj[key]!==null){
             Object.assign(result, flattenObject(obj[key], newKey))
        }
        else{
            result[key] = obj[key];
        }
    }
    return result;
}
console.log(flattenObject({ a: { b: { c: 1 } }, d: 2 }));

////Debounce
function debouncing (mainFn, delay){
     let timer;
    return debounced = () => {
      clearTimeout(timer);
      timer = setTimeout(()=>{
        mainFn.apply(this, args)
      }, delay)
    }
}

///Throttle

function throttle (mainFn, delay){
    let lastCall = 0;
    return function(...args){
        let now = Date.now();
        if(lastCall - now>delay){
            lastCall =  now;
            mainFn.apply(this, args)
        }
    }
}

/**Merge Two Sorted Arrays */
function mergeSortedArrays(array1, array2){
    let result = [];
    let i = 0, j = 0;

    while(i<array1.length && j<array2.length){
        if(array1[i]<array2[j]){
            result.push(array1[i])
            i++;
        }
        else{
            result.push(array2[j])
            j++;
        }
    }
    return result.concat(array1.slice(i)).concat(array2.slice(j));
}
console.log(mergeSortedArrays([1, 3, 5], [2, 4, 6]));

/*** Promises in Sequence */
function delays(ms, value){
    return new Promise((resolve)=>{
        setTimeout(()=>{
            console.log(`Resolved after ${ms}ms with value: ${value}`);
            resolve(value);
        }, ms)
    })
}

//Tasks to execute in sequence
const tasks = [()=>delays(1000, "Task1"), 
               ()=>delays(2000,"Task2"),
               ()=>delays(3000, "Task3")]

// Execute promises in sequence
function executeInSequence(tasks){
   let result = Promise.resolve();

   tasks.forEach(element => {
    result = result.then(element)
   });

   return result;
}

executeInSequence(tasks).then(()=>{
    console.log("All tasks completed.");
})

async function executeInSequencewithAsyncAwait(tasks){
    for(const task in tasks){
        await task();
    }
    console.log("All tasks completed.");
}

executeInSequencewithAsyncAwait();

//retryPromises

function retryPromises(fetchData, retryCount){
    return new Promise((resolve, reject)=>{
        (autoRetry(
            fetchData.then((value)=>resolve(value)).catch((error)=>{
                if(retryCount-->0){
                    autoRetry()
                }
                else{
                    reject(error)
                }
            })
        ))()
    })
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

  autoRetryPromises(fetchData, 5).then((result)=>console.log(result)).catch((error)=>console.error(error))