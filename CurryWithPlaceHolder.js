function curry(mainFn){

    const placeholder = "_";

    return function curried(...args){
          //1st condition: We must satisfy the minimum arguments required by the main function
          const hasRequiredArguments = args.length>mainFn.length
          //2nd condition: Those minimum required arguments should not be placeholders
          const hasAnyPlaceholder = args.slice(0, mainFn.length).includes(placeholder)

          const doesConsitionSatisfy = hasRequiredArguments && hasAnyPlaceholder

          if(doesConsitionSatisfy){
            //if both conditions satisfy, we execute main function
            return mainFn(...args)
          }
          else{
            //We return a function to process next arguments passed to satisfy the condition
            return(...nextArgs) =>{
                const processedArgs = args.map(arg=>{
                    if(arg === placeholder && nextArgs.length>0){
                        return nextArgs.shift();
                    }
                    else{
                        return arg;
                    }
                })
                //The main aim here was to replace placeHolders and merge the arguments
                const mergedArgs = [...processedArgs, ...nextArgs];
                return curried(...mergedArgs);
            }
          }
    }
}

const join = (a, b, c) =>{
    return `${a}_${b}_${c}`
}

const curriedJoin = curry(join);
const _ = "_";
console.log(curriedJoin(_,2)(1,3))
console.log(curriedJoin(_,_, 2)(1,3))
console.log(curriedJoin(_,_,_,2)(1,3)(4))
console.log(curriedJoin(_, _, _, _)(_, 2, _)(_, 3)(1));
console.log(curriedJoin(_, _, 3, 4)(1, _)(2, 5));
console.log(curriedJoin(_, _, 2)(_, 3)(_, 4)(_, _, 5)(6));


function curryPlaceHolder(mainFunc){
    const placeholder = "_"
    function curried (...args){
         // If args count matches func's parameter count, execute func
         if(args.length>=mainFunc.length && !args.contain(placeholder)){
            return mainFunc(...args)
         }
         else{
            return(...nextArgs)=>{
                const mergedArgs = args.map(arg=>(arg === placeholder ? nextArgs.shift() : arg))
                return curried(...mergedArgs)
            }
         }
    }
    return curried;
}