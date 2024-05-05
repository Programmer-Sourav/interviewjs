const curry = (mainFn) =>{
    return function curried(...args){
        if(args.length>=mainFn.length){
            return mainFn(...args)
        }
        else {
            return curried.bind(null, ...args);
        }
    }
}

const totalNumber = (a,b,c) =>{
    return a+b+c;
}
const curriedTotal = curry(totalNumber);

const getLogger = () =>{
    let count = 0;
    return(value) =>{
        console.log(`Output for input ${count+1} is`, value);
    }
}
const log = getLogger()

//analyse output
log(curriedTotal(10)(20)(30))
log(curriedTotal(10,20)(30))
log(curriedTotal(10)(20, 30))
log(curriedTotal(10,20))
log(curriedTotal(10)(20,30,40,50))
log(curriedTotal(10)(20,30)(40))