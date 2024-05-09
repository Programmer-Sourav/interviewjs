// Create an IIFE which sets the wrapper for the setTimeout,clearTimeout, which will help us in implementing the logic for our clearAllTimers
(function createSetTimeout() {
// We need to keep track of all the timers, so that we can clear all the timers when required to
const timerMap = {};
// Store the native methods
const nativeSetTimeout = window.setTimeout;
const nativeClearTimeout = window.clearTimeout;
// Create a wrapper around `setTimeout`
window.setTimeout = (callback, delay, ...args) => {
    const id = nativeSetTimeout(callback, delay, ...args);
// add the new unique timer identifier `id` to the `timerMap` to track it
timerMap[id] = true;
console.log(444, timerMap[id], id);
}
// Create a wrapper around `clearTimeout`
window.clearTimeout = (id) => {
nativeClearTimeout(id);
// When `clearTimeout` is called we also need to clear the timer from our tracker `timerMap` as well
delete timerMap[id];
}
// Our original solution to the problem of clearing all timers
window.clearAllTimers = () => {
for (let id in timerMap) {
clearTimeout(id);
}
}
})()

const startTime = Date.now();
const print = () => console.log(`Timer executed after ${Date.now() - startTime} ms`);
setTimeout(print, 750)
setTimeout(print, 1000)
setTimeout(print, 1250)

setTimeout(print, 1500)
// This method is highly useful since we need not remember all the timers, and can clear all at once
clearAllTimers();
// Output: Nothing prints out since all the timers are cleared
// ---------------------------------------
setTimeout(print, 750)
setTimeout(print, 1000)
setTimeout(print, 1250)
setTimeout(print, 1500)

// Since we're clearing all the timers after 1200 ms, the timers scheduled before 1200ms will be executed
setTimeout(() => clearAllTimers(), 1200);
// Output:
// Timer executed after 753 ms
// Timer executed after 1001 ms
