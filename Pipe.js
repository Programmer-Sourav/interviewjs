// These are some of our utility functions, the main concept is
// below
// const getName = (input) => input.name;
// const getUppercaseName = (input) => input.toUpperCase();
// const getFirstName = (input) => input.split(' ')[0];
// const getReversedName = (input) =>
// input.split('').reverse().join('');
// // So you can see below that one function's output is passed as
// argument to next function
// // Just like a series (or) flow of data in pipes
// const name = getName({ name: 'JSGuy Senior' });
// const uppercaseName = getUppercaseName(name);
// const firstName = getFirstName(uppercaseName);
// const reverseName = getReversedName(firstName);
// // The above code can also be written something like this
// // Nesting or composing of sequence of functions
// getReversedName(getFirstName(getUppercaseName(getName({ name:
// 'JSGuy Senior' }))));
// // We have to make this sequence of steps much cleaner with pipe
// function. To something like this,
// pipe(
// getName,
// getUppercaseName,
// getFirstName,
// getReversedName
// );


function pipe(...args){
    return function(initialArgs){
      let result = initialArgs;
      for(let func in args){
        result = func(result)
      }
      return result;
    }
}

//using reduce

function pipe(...args){
    return function(initialFun){
           return args.reduce((accumulator, currentFun)=>{
            return currentFun(accumulator)
           }, initialFun)
    }
}