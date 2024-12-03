function memoize(mainFun, resolver){

// Initialise a plain object, which will be used as cache to
// store the `result` of the `mainFn` call based on the arguments
// passed to it
    const cache = {}

     return function(...args){
// Get the key representation
// If resolver exists, it's generated based on args
//passed, else assign the first arg as key
        if(resolver){
            const key = resolver ? resolver(...args) : args[0]

            if(cache.hasOwnProperty(key)){
                // If `result` already exists in cache
                return cache[key]
            }
            else{
            // Else, calculate the `result` and store in the cache
           // Using `call` method to maintain the context of "this"
                const result = mainFun.call(this, ...args)
                cache[key] = result;
                return result;
            }
        }
     }
}

function sum(a, b, c) {
    return a + b + c;
    }
    const resolver = (...args) => args.join('_');
    const memoizedSum = memoize(sum, resolver);
    memoizedSum(1, 2, 3);
    // 6
    memoizedSum(1, 2, 3);
    // 6 (value retrieved from cache)
    memoizedSum(1, 2, 3);
    // 6 (value retrieved from cache)
    memoizedSum(2, 4, 3);
    // 9 (since new args passed, new result is generated, and this
    //will be cached from now on)
    memoizedSum(2, 4, 3);