const debounced = (mainFunction, delay) =>{
    let timerId;
    return function(...args){
    clearTimeout(timerId);
    timerId = setTimeout(()=>{
        mainFunction(...args)
    }, delay)
    }
}

const throttle = (mainFunction, delay) =>{
    let timerId;
    return function(...args){

        if(timerId===null){
            mainFunction(...args);

            timerId = setTimeout(()=>{
                timerId === null;
            }, delay)
        }
    }
}

const curry = (mainFn) =>{
    return function curried(...args){
        if(args.length>= mainFn.length){
            return mainFn(...args);
        }
        else{
            return curried.bind(null, ...args);
        }
    }
}

const placeholder = "_";

function curry2(mainFn){
  return function curried(...args){
    const hasRequiredArgs = args.length>mainFn.length

    const hasAnyPlaceholders = args.slice(0, mainFn.length).includes(placeholder);

    const doesArgsSatisfy = hasRequiredArgs && !hasAnyPlaceholders;

    if(doesArgsSatisfy){
        return mainFn(...args)
    }
    else{
        return (...nextArgs) =>{
            const processedArgs = args.map((arg)=>{
                if(arg === placeholder && nextArgs.length>0){
                    return nextArgs.shift();
                }
                else{
                    return arg;
                }

            })
            const mergedArgs = [...processedArgs, ...nextArgs];
            return curried(...mergedArgs);
        }
    }
  }
}


function flatten(input){
    let result = {}

    for(let key in input){
        if(typeof input[key]==='object' && input[key]!==null){
           result = {...result, ...flatten(input[key])}
        }
        else{
            result[key] = input[key]
        }
    }

    return result;
}