function createMySetInterval(){
    let intervalId = 0;
    const intervalMap = {};

    function mySetInterval(callback, delay, ...args){
         const id = ++intervalId;

         function scheduleInterval(){
            intervalMap[id] = setTimeout(()=>{
                callback(...args);
                if(intervalMap[id]) scheduleInterval();
            }, delay)
         }
         scheduleInterval();
         return id;
    }

    function myClearIntervalId(id){
         if(intervalMap[id]){
            clearTimeout(intervalMap[id]);
        delete intervalMap[id];
         }
    }
    return {mySetInterval, myClearIntervalId}
}



const { mySetInterval, myClearInterval } =createMySetInterval();
const print = () => console.log(`Interval executed at
${Date.now() - startTime} ms`);
const startTime = Date.now();
const id1 = mySetInterval(print, 1000);
const id2 = mySetInterval(print, 2000);
setTimeout(() => myClearInterval(id2), 7000);
const id3 = mySetInterval(print, 4000);
setTimeout(() => myClearInterval(id3), 19000);