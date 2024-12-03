function get(obj, path, defaultValue){
    // The `obj` passed should be a valid object
    // Note: Array is also an object
    if(obj===null || typeof obj!== 'object'){
        return defaultValue;
    }
    // First step is to replace all of the square bracket
    // notation [] with dot notation
   // This will work for accessing values from both Objects and arrays
   let keys = [];

   if(!Array.isArray(path)){
    path = path.replace("[", ".");
    path = path.replace("]", ".");
    keys = path.split(".")
    console.log(222, keys)
   }
   else{
    keys = path;
    console.log(333, keys)
   }
   const currentKey = keys[0];

   console.log(1111, keys, currentKey)
   // Means we have processed all the keys in the path, so just return the value for the key
   if(keys.length === 1){
    // We use `hasOwnProperty` method to check if a key exists on the object
    // Using `obj[currKey]` is not good, since there can be a falsy value as well like null, undefined, '' (which are completely valid)
    // So the aim should be
    return obj.hasOwnProperty(currentKey) ? obj[currentKey] : defaultValue;
   }
   else{
    // Recursively continue traversing the path on the object to get the value
    if(obj.hasOwnProperty(currentKey)){
        return get(obj[currentKey], keys.splice(1), defaultValue)
    }
    return defaultValue;
   }

}

const obj = {
    a: {
    b: 'Hello',
    c: null,
    d: [1, 2, 'World'],
    e: [
    { name: 'Peter Parker' },
    { work: 'Spiderman' }
    ],
    h: {
    i: {
    j: 'Iron Man',
    k: 'Batman'
}
}
},
f: {
g: undefined
}
}

// console.log(get(obj, ['a', 'h', 'i', 'k'], 'Key Not Found'));
// console.log(get(obj, 'a[d].1', 'Key Not Found'));

console.log(lodash_get(obj, ['a', 'h', 'i', 'k'], 'Key Not Found'));
console.log(lodash_get(obj, 'a[d].1', 'Key Not Found'));

function lodash_get(obj, path, defaultValue){
     if(obj===null || typeof(obj)!=="object"){
        return defaultValue;
     }

     let keys = [];
   //path will be either string or array
   //if path is not an array, we will convert it into dot notation syntax
   if(!Array.isArray(path)){
      path = path.replace("[",".");
      path = path.replace("]", ".");
      keys = path.split('.'); 
      console.log("Keys ", keys)
   }
   else{
    keys = path;
   }
  

   const currentKey = keys[0];  //current element is the first element of the array

   //we will check, if obj to traverse has a valid property, 
   if(keys.length === 1){
    return obj.hasOwnProperty(currentKey) ? obj[currentKey] : defaultValue;
   }
   else{
    if(obj.hasOwnProperty(currentKey)){
        console.log(1234, keys.length, keys, keys.slice(1))
        return lodash_get(obj[currentKey], keys.slice(1), defaultValue)
    }

    return defaultValue;
   }


}