//Follow this

// Check if finally is already implemented: If it doesn't exist on the Promise.prototype, it adds the polyfill.

// finally method: It takes a callback function and attaches it to the promise.

// Return a new promise: This ensures that the original promise's result or error 
// is maintained, but the callback is called regardless of the outcome.

if (!Promise.prototype.finally){

    Promise.prototype.finally = function (callback){
        const promise = this;
        
        const onFinally = function (){
            return Promise.resolve(callback())
        }

        return promise.then(
            (result)=> onFinally().then(()=>result), 
            (error)=>onFinally().then(()=>{throw(error)})
        )
    }

}