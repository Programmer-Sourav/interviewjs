const throttle = (mainFunction, delay) =>{
    let timerFlag = null

    return function(...args){
       if(timerFlag==null)
       mainFunction(...args)
       else 
       timerFlag = setTimeout(()=>{
               timerFlag = null;
    }, delay)
    }
}

let prev = Date.now();

const fetchData = () =>{
    console.log(`Fetchdata called after ${Date.now() - prev}ms`);
    prev = Date.now();
}

const throttledFn = throttle(fetchData, 40)
document.addEventListener('mousemove', throttledFn);