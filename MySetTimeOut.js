function createMySetTimeout(){
    let timerId = 0;

    const timerMap = {};

    function mySetTimeOut(callback, delay, ...args){
        const id =  scheduleTimer();
        const startTime = Date.now();

        function check(){
            if(!timerMap[id]){
                return;
            }
            if(Date.now() - startTime >= delay){
                callback(...args);
            }
            else{
                requestIdleCallback(()=>check());
            }
        }
        requestIdleCallback(()=>check());
        return id;
    }

    function myClearTimeout(){
        if(timerMap[id])
            delete timerMap[id];
    }
    function scheduleTimer(){
         const id = ++timerId;
         console.log(111, id);
         timerMap[id] = true;
         console.log(222, timerMap[id]);
         return id;
    }
    return {mySetTimeOut, myClearTimeout}
}


const { mySetTimeout, myClearTimeout } = createMySetTimeout();

const print = () => console.log(`Timer executed after
${Date.now() - startTime} ms`);
const startTime = Date.now();
const id1 = mySetTimeout(print, 4000)
// Timer executed after 4001 ms
const id2 = mySetTimeout(print, 1000)
// Timer executed after 1001 ms
const id3 = mySetTimeout(print, 1000)
// Timer executed after 1008 ms
// Case : Clear timers before execution
const id4 = mySetTimeout(print, 3000)
const id5 = mySetTimeout(print, 1000)
const id6 = mySetTimeout(print, 2000)
mySetTimeout(() => myClearTimeout(id4), 2750)
mySetTimeout(() => myClearTimeout(id6), 1900)
