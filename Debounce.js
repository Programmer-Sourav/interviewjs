// Let’s break it down. As per the question, you will take in a
// mainFunction and a delay and return the debounced version
// of that function.

const debounced = (mainFunction, delay) =>{
    let timerId;
    return function(...args){
         clearTimeout(timerId);

         timerId = setTimeout(()=>{mainFunction(...args)}, delay)
    }
}

let startTime = Date.now();
const fetchData = () =>{
    console.log(`fetchData called after ${Date.now() - startTime}ms`)
}
const debounceFn = debounced(fetchData, 50);

setTimeout(debounceFn, 30);
setTimeout(debounceFn, 50)


/////Debounce Revise

const debouncedRevise = (mainFn, delay) =>{
  let timerId;
  return function(...args){
    clearInterval(timerId);
    timerId = setTimeout(()=>{mainFn(...args)}, delay)
  }
}