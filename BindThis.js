//Once a method is passed somewhere separately from the object – this is lost.
let user = {
    firstName: "John",
    sayHi() {
      alert(`Hello, ${this.firstName}!`);
    }
  };
  
  setTimeout(user.sayHi, 1000); // Hello, undefined!


  //solution
  //wrapping a function 

//Now it works, because it receives user from the outer lexical environment, and then calls the method normally.
  let user1 = {
       firstName: "John", 
       sayHi(){
        alert(`Hello, ${this.firstName}!`);
       }
  }

  setTimeout(function(){user.sayHi}, 1000) // Hello, John!

  //same but shorter (arrow function syntax)
  let user2 = {
    firstName: "John", 
    sayHi(){
     alert(`Hello, ${this.firstName}!`);
    }
}

setTimeout(()=>{user.sayHi()}, 1000) 

//In other words, calling boundFunc is like func with fixed this.
//For instance, here funcUser passes a call to func with this=user:

let user3 = {
    firstName: "John",
    sayHi(){
        alert(`Hello, ${this.firstName}!`);
    }
}

let sayHi = user3.sayHi.bind(user3);
// can run it without an object
sayHi(); // Hello, John!

setTimeout(sayHi, 1000); // Hello, John!

// even if the value of user changes within 1 second
// sayHi uses the pre-bound value which is reference to the old user object
user = {
  sayHi() { alert("Another user in setTimeout!"); }
};
//Here we can see that arguments are passed “as is”, only this is fixed by bind:
let user4 = {
  firstName: "John",
  say(phrase) {
    alert(`${phrase}, ${this.firstName}!`);
  }
};

let say = user4.say.bind(user);

say("Hello"); // Hello, John! ("Hello" argument is passed to say)
say("Bye"); // Bye, John! ("Bye" is passed to say)


// let num = 10;

// function changeValue(value){
//    //value = 20;
//    value = value + 2;
//    console.log(value);
// }
// changeValue(num);
// console.log(num)


// let dummy = [1,2,3]

// function changeArrayValue(value){
//    dummy.push(4)
//    console.log(dummy)
// }
// changeArrayValue(dummy)
// console.log(dummy)

