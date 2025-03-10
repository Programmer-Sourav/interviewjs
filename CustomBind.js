Function.prototype.bind = function customBind(thisArg, ...args){
    // Get the actual function that needs to be invoked and on
    //which we need to set the "this" context
    const fn = this;
    // We know the fact that the "this" context for a method will
    //be set based on the object which calls it
    // `thisArg` will be our object or context we need to set
    const context = Object(thisArg)
// Note: We wrap `thisArg` in an Object constructor, to
 //handle primitive values as well like null, undefined, number,
//string, which returns their wrapper objects
// Generate a unique key using `Symbol()` to avoid object
//property conflicts
    const key = Symbol()
    // Set the invoking function `fn` as a value for the unique
//`key` as a property on the object `context`
    context[key] = fn;
// This is the only major change we did, by wrapping it in a
//new function
    return function(){
        // Now all we need to do is invoke `fn` via `context`
//object and pass the additional args as well
        const result = context[key](...args)
        // We won't be deleting `context[key]` since this
//returned function can be invoked many times, so we need to
//persist it
// Return away the result generated by invoking the
//function `fn`
        return result;
    }
}

Function.prototype.bind = function customBind(thisArg, ...args){
  const fn = this;
  const context = Object(thisArg);
  const key = Symbol()
  context[key] = fn;
  return function(){
    return context[key](...args)
  }
}