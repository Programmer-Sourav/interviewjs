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

const throttleFn = (mainFn, interval) =>{
    const lastCall = 0;
    return function(...args){
    const now = Date.now();
    if(now - lastCall>=interval){
        lastCall = now; 
        mainFn.apply(this, args);
    }   
    }
}

const throttledHandleScroll = throttleFn(()=>{console.log("Scroll Event Triggered!")}, 200)
window.addEventListener("scroll", throttledHandleScroll);

/******Functuin Throttle */

const throttleFnRevise = (mainFn, delayInterval) =>{
   const lastCall = 0;
   return function(...args){
    const now = Date.now();
    if(now - lastCall>=delayInterval){
        lastCall = now;
        mainFn.apply(this, args);
    }
   }
}