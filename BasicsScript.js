(function (){
console.log("IIFE");
})()


function welcome(name){
  
   var greetingInfo = function (message){
    console.log(message + " "+ name)
   }
   return greetingInfo;
}

var myFunction = welcome("John")
myFunction("Welcome ")
myFunction("Hello Mr. ")


/*let user = {
   name: "John", 
   age: 30, 
   isAdmin: true
}

let key = prompt("Enter Key", "name")
alert(user[key]);


let fruit = prompt("Which fruit to buy? ", "apple")
let bag = {
   [fruit] : 6
}

alert(bag.apple)

//for...in loop
for(let key in user){
   alert(key);
   alert(user[key]);
}

//order of objects
let codes = {
   "49": "Germany",
   "41": "Switzerland",
   "44": "Great Britain",
   // ..,
   "1": "USA"
 };
 
 for (let code in codes) {
   alert(code); // 1, 41, 44, 49
 }


 let salaries = {
  John: 100,
  Ann: 160,
  Pete: 130
 }

 let sum = 0;

 for(let key in salaries){
   sum = sum + salaries[key];
 }

 alert(sum);


 function multiplyNumeric(obj){
   for(let key in obj){
      if(typeof obj[key] == 'number'){
         obj[key] = obj[key] *2;
      }
   }
 }
   console.log(multiplyNumeric({'a' : 4, 'b': "What's up", "c": 3}))
   8
   VM993:1 What's up
   VM993:1 6

let a = {};
let b = a; // copy the reference

alert( a == b ); // true, both variables reference the same object
alert( a === b ); // true, basically, a=b={}

//two look alike objects
let a1 = {};
let b1 = {}; // two independent objects

alert( a1 == b1 ); // false



//copying an object variable creates one more reference to the same object.
let user2 = {
   name : "John", 
   age: 30
}

let clone = {};

//let's copy all user properties into it
for(let key in user2){
   clone[key] = user2[key]
}

// now clone is a fully independent object with the same content
clone.name = "Pete"; // changed the data in it

console.log( user2.name ); // still John in the original object
console.log( clone.name);


//Cloning and merging, Object.assign

//rechablity
// user has a reference to the object
let user4 = {
   name: "John"
 };
 
 let admin = user4;
 user4 = null;

 console.log("111", admin.name, user4)
 */

 function marry(man, woman) {
   console.log(1111, woman)
   console.log(2222, man)
   woman.husband = man;
   console.log(3333, woman)
   man.wife = woman;
   console.log(4444, man)

   return {
     father: man,
     mother: woman
   }
 }
 
 let family = marry({
   name: "John"
 }, {
   name: "Ann"
 });

 console.log(222, family);
//father: {name: "john", wife: {name: "Ann", husband: {name: "John", wife: {name: "Ann", husband: {name: "John"}}}}}
// mother: {name: "Ann", husband: {name: "john", wife: {name: "Ann", husband: {name: "john", wife: {name: "Ann"}}}}}
/** 
 * 
 * The optional chaining ?. is a safe way to access nested object properties, even if an intermediate property doesn’t exist.
 * 
 * 
 * The optional chaining ?. syntax has three forms:

obj?.prop – returns obj.prop if obj exists, otherwise undefined.
obj?.[prop] – returns obj[prop] if obj exists, otherwise undefined.
obj.method?.() – calls obj.method() if obj.method exists, otherwise returns undefined.
 * 
 *As we can see, all of them are straightforward and simple to use. The ?. checks the left part for null/undefined and allows the evaluation to proceed if it’s not so.

A chain of ?. allows to safely access nested properties.
 * 
 */

function makeCounter(){
   let count = 0;
   return function(){
      return count++;
   }
}

let counter = makeCounter();
counter();
counter();
counter();


let obj1 = {
   value : 42,

   valueOfThis : function(){
     return this.value;
   }
}

console.log(555, obj1.valueOfThis())


let obj2 = {
   value: 44, 

   valueOfThis : () =>{
     return this.value;
   }
}
//console.log(5551, obj2.valueOfThis())

// arrow functions do not have this. If this is accessed, it is taken from the outside.
// For instance, we can use it to iterate inside an object method:
//Here in forEach, the arrow function is used, so this.title in it is exactly the same as in the outer method showList.
// That is: group.title.
let group = {
   title: "Our Group",
   students: ["John", "Pete", "Alice"],
 
   showList() {
     this.students.forEach(
       student => console.log(this.title + ': ' + student)
     );
   }
 };
 
 group.showList();


 let group1 = {
   title: "Our Group",
   students: ["John", "Pete", "Alice"],
 
   showList() {
     this.students.forEach(function(student) {
       // Error: Cannot read property 'title' of undefined
       console.log(this.title + ': ' + student);
     });
   }
 };
 
 //group1.showList();


 ////Not having this naturally means another limitation: arrow functions can’t be used as constructors.
 /// They can’t be called with new


 function performTask(){
   value = 100;
   console.log(77,value);
   var value;
 }

 performTask();


 console.log(myMessage)
 var myMessage = "Greetings";

 sayHello();
 function sayHello(){
   console.log("Hello From Hoisted Function. I'm the function Defination")
 }

 const numbers = [1,2,3,4,5]

 const trippled = numbers.map((number)=>number*3)
 console.log(123, trippled);

 function trippleMultiplier(factor){
   return number => number * factor
 }

 const triple = trippleMultiplier(3);
 const tripledNos = numbers.map(triple);

 console.log(144, tripledNos);



/**** The execution context is an internal data structure that contains details about the execution of a function: where the control flow is now, the current variables, the value of this (we don’t use it here) and few other internal details.

One function call has exactly one execution context associated with it.

When a function makes a nested call, the following happens:

The current function is paused.
The execution context associated with it is remembered in a special data structure called execution context stack.
The nested call executes.
After it ends, the old execution context is retrieved from the stack, and the outer function is resumed from where it stopped. ***/

/*** 
 * 
 * 
 * 
 * Functions created with new Function, have [[Environment]] referencing the global Lexical Environment, 
 * not the outer one. Hence, they cannot use outer variables. But that’s actually good, because it insures us from errors.
 *  Passing parameters explicitly is a much better method architecturally and causes no problems with minifiers.
 * 
 * 
 * 
 * function getFunc() {
  let value = "test";

  let func = new Function('alert(value)');

  return func;
}

getFunc()(); // error: value is not defined

 * function getFunc() {
  let value = "test";

  let func = function() { alert(value); };

  return func;
}

getFunc()(); // "test", from the Lexical Environment of getFunc
 */

// Arrow functions are special: they don’t have their “own” this. 
//If we reference this from such a function, it’s taken from the outer “normal” function.
// For instance, here arrow() uses this from the outer user.sayHi() method:
let user = {
  firstName: "Lidya",

  sayHi(){
    let arrow = () =>console.log(this.firstName)
    arrow()
  }
}
user.sayHi();

// The value of this is defined at run-time.

// When a function is declared, it may use this, but that this has no value until the function is called.
// A function can be copied between objects.
// When a function is called in the “method” syntax: object.method(), the value of this during the call is object.

//The concept of run-time evaluated this has both pluses and minuses. On the one hand, a function can be reused for different objects. On the other hand, the greater flexibility creates more possibilities for mistakes.

function makeUser() {
  return {
    name: "John",
    ref: this
  };
}

let user2 = makeUser();
console.log(666, user2);

//console.log( 6661, user2.ref.name ); //""

/**
 * That’s because rules that set this do not look at object definition. Only the moment of call matters.

Here the value of this inside makeUser() is undefined, because it is called as a function, not as a method with “dot” syntax.

The value of this is one for the whole function, code blocks and object literals do not affect it.

So ref: this actually takes current this of the function.
 * 
 * 
 * 
 * 
 */
/**We can rewrite the function and return the same this with undefined value */
function makeUser2(){
  return this; // this time there's no object literal
}
//console.log(makeUser2().name ) //undefined

function makeUser3() {
  return {
    name: "John",
    ref() {
      return this;
    }
  };
}

let user3 = makeUser3();

console.log( 6666, user3.ref().name );
//Now it works, because user.ref() is a method. And the value of this is set to the object before dot ..


/****
 * 
 * Create an object calculator with three methods:

read() prompts for two values and saves them as object properties with names a and b respectively.
sum() returns the sum of saved values.
mul() multiplies saved values and returns the result.
 * 
 * 
 * 
 */
let calculator = {
  sum(){
    return this.a + this.b;
  },

  mul(){
    return this.a * this.b;
  },

  read(){
    this.a = +prompt('a?', 0);
    this.b = +prompt('b?', 0);
  }
}
calculator.read();

console.log(calculator.sum());
console.log(calculator.mul());



///To make the ladder object methods chainable, 
///each method needs to return the ladder object 
////itself after performing its operation. 
////This allows you to call another method on the ladder object immediately after the previous method.

let ladder = {
  step: 0,
  up() {
    this.step++;
    return this; // return the ladder object for chaining
  },
  down() {
    this.step--;
    return this; // return the ladder object for chaining
  },
  showStep() {
    console.log(this.step);
    return this; // return the ladder object for chaining
  }
};

// Example usage:
ladder.up().up().down().showStep().down().showStep(); // shows 1 then 0
let promise = new Promise((resolve, reject)=>{
  resolve(1)
  setTimeout(()=>resolve(2), 1000)
})

promise.then(alert)
//The second call to resolve is ignored, because only the first call of reject/resolve is taken into account.
// Further calls are ignored.

function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

delay(3000).then(() => alert('runs after 3 seconds'));

new Promise((resolve, reject)=>{
  setTimeout(()=>{resolve(1000), 1000})
}).then(function(result){
   console.log(result)
   return result*2;
}).then(function(result){
   console.log(result)
   return result * 2;
}).then(function(result){
  console.log(result)
  return result*2
})


new Promise(function(resolve, reject){
  setTimeout(()=>{resolve(1), 1000})
}).then(function(result){
  console.log(result)

  return new Promise((resolve, reject)=>{
    setTimeout(()=>resolve(result*2), 1000)
  })
}).then(function(result){
  console.log(result)
  return new Promise((resolve, reject)=>{
    setTimeout(()=>resolve(result*2), 1000)
  })
}).then(function(result){
  console.log(result)
})

/*** */

new Promise((resolve, reject) => {
  resolve("ok");
}).then((result) => {
  throw new Error("Whoops!"); // rejects the promise
}).catch(console.log()); // Error: Whoops!


Promise.all([
  new Promise(resolve => setTimeout(() => resolve(1111), 3000)), // 1
  new Promise(resolve => setTimeout(() => resolve(2222), 2000)), // 2
  new Promise(resolve => setTimeout(() => resolve(3333), 1000))  // 3
]).then(alert);



let urls = [
  'https://api.github.com/users/iliakan',
  'https://api.github.com/users/remy',
  'https://api.github.com/users/jeresig'
];

//map every url to the promise of the fetch
let requests = urls.map((url)=>fetch(url))

// Promise.all waits until all jobs are resolved
Promise.all(requests).then(responses=>responses.forEach(
  response => console.log(777,`${response.url}: ${response.status}`)
))

/**** 
 * await literally suspends the function execution until the promise settles, and then resumes it with the promise result.
 *  That doesn’t cost any CPU resources, because the JavaScript engine can do other jobs in the meantime:
 *  execute other scripts, handle events, etc.

It’s just a more elegant syntax of getting the promise result than promise.then. And, it’s easier to read and write.
 * 
 * 
 * 
 */
async function f(){
     const promise = new Promise((resolve, reject)=>{
      setTimeout(()=>{resolve("Done!")}, 1000)
     })

     // works only inside async functions
     let result = await promise; // function execution pauses in this line and wait until the promise resolves (*)
     console.log(result);
}


function fetchAvatar(){
fetch("/user.json")
.then((response)=>response.json())
.then((user)=>fetch(`https://api.github.com/users/${user.name}`))
.then((response)=>response.json()).then((githubUser)=> 
 new Promise((resolve, reject)=>{
   let img = document.createElement("img");
   img.src = githubUser.avatar_url;
   img.className = "avatar-image-css-design"
   document.body.append(img)

   setTimeout(()=>{
    img.remove();
    resolve(githubUser);
   }, 3000)
 })).then((githubUser =>console.log(`Finished showing ${githubUser.name}`)))
}

fetchAvatar()


//When we need to wait for multiple promises, we can wrap them in Promise.all and then await:

// wait for the array of results
let results = await Promise.all([
  fetch(url1),
  fetch(url2)
]);


async function loadJSON(url){

  const response = await fetch(url)  //All .then inside are replaced with await.

  if(response.status == 200){
    // let json = await response.json();
    // return json;
    return response.json();  //we can await or directly return response.json()
  }

  throw new Error(response.status);

}
loadJSON('https://javascript.info/no-such-user.json')
  .catch(alert); 


  /*** */

  class HttpError extends Error {
    constructor(response) {
      super(`${response.status} for ${response.url}`);
      this.name = 'HttpError';
      this.response = response;
    }
  }
  
  // function loadJson(url) {
  //   return fetch(url)
  //     .then(response => {
  //       if (response.status == 200) {
  //         return response.json();
  //       } else {
  //         throw new HttpError(response);
  //       }
  //     });
  // }

  async function loadJSON(url){
    const response = await fetch(url);

    if(response.status == 200){
      return response.json()
    }
    throw new HttpError(response)
  }
  
  // Ask for a user name until github returns a valid user
  // function demoGithubUser() {
  //   let name = prompt("Enter a name?", "iliakan");
  
  //   return loadJson(`https://api.github.com/users/${name}`)
  //     .then(user => {
  //       alert(`Full name: ${user.name}.`);
  //       return user;
  //     })
  //     .catch(err => {
  //       if (err instanceof HttpError && err.response.status == 404) {
  //         alert("No such user, please reenter.");
  //         return demoGithubUser();
  //       } else {
  //         throw err;
  //       }
  //     });
  // }

 // Ask for a user name until github returns a valid user
async function demoGithubUser() {

  let user;
  while(true) {
    let name = prompt("Enter a name?", "iliakan");

    try {
      user = await loadJSON(`https://api.github.com/users/${name}`);
      break; // no error, exit loop
    } catch(err) {
      if (err instanceof HttpError && err.response.status == 404) {
        // loop continues after the alert
        alert("No such user, please reenter.");
      } else {
        // unknown error, rethrow
        throw err;
      }
    }
  }
}
  demoGithubUser();


  async function wait(){
    await new Promise((resolve, reject)=>{
      setTimeout(resolve, 1000)
    })

    return 10;
  }

  function f(){
    //It's a promise, so write the consumer code
    console.log(123, wait())
    wait().then((result)=>console.log(result));
  }

  f();