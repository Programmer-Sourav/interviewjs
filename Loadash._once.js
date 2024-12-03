function loadash_once(mainFn){
// stores the `result` of mainFn when it was called for 1st time
let result;

// Tracks if the `mainFn` was called once or not
let calledOnce = false;

return function(...args){
    // If not called once, call it and store the result
    if(!calledOnce){
    // using the `call` method of functions, so persist the context of "this" which the function is called
        result = mainFn.call(this, ...args)
        calledOnce = true;
    }
    return result;
}
}