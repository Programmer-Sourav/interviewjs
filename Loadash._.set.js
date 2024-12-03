function set(obj, path, defaultValue){

    // The `obj` passed should be a valid object
// Note: Array is also an object
   if(obj === null || typeof obj !== 'object'){
    return defaultValue;
   }
    // if the input is not an array and instead a string
    // First step is to replace all of the square bracket
    //notation [] with dot notation
   // This will work for accessing values from both Objects and arrays
   let keys = [];
   if(!Array.isArray(path)){
    path = path.replaceAll("[", ".");
    path = path.replaceAll("]", ".");
    keys = path.split(".");
   }
   else{
    keys = path;
   }

   const curKey = keys[0];
   // Means we have processed all the keys in the path, so just set the value for the key
   if(keys.length === 1){
    // Set the value, since we have traversed full path
// Note : The below assignment operation works fine for
// both arrays and objects
// Since internally an array is also an object
    obj[curKey] = value;
   }
   else{
    // If `currKey` is not defined yet on `obj`, we need to define it

    if(!obj.hasOwnProperty(curKey)){
        // --> There can be 2 possibilities that the currKey can be either an object (or) array
// How to decide that? - This depends on the type of the key for the `nextKey` which we would need to assign
// If nextKey is a number format, then array, else an object
// Example : 'a[1]' -> 'a.1' -> currKey=a, nextKey=1 -> So define array
// Example : 'a.b' -> currKey=a, nextKey=b -> So define object
// Verify if `nextKey` is not a number
const nextKey = keys[1];
const num = Number(nextKey);
//check if it is not a number
const isNotANumber = isNaN(num);
obj[curKey] = (isNotANumber) ? {} : [];
    }
    // Continue processing the path recursively
set(obj[curKey], keys.slice(1), value);
   }
}

function lodash_set(obj, path, value){

    if(obj===null || typeof(obj)!=="object" ){
        return;
    }

    let keys = [];

    if(!Array.isArray(path)){
        path = path.replaceAll("[", ".")
        path = path.replaceAll("]", ".")
        keys = path.split(".")
    }
    else{
        keys = path
    }

    const currentKey = keys[0];
     
     if(keys.length === 1){
        obj[currentKey] = value;
     }
     else{
        if(!obj.hasOwnProperty(currentKey)){
            const nextKey = keys[1];
            const num = Number(nextKey)
            const isNotANumber = isNaN(num)
            obj[currentKey] = (isNotANumber) ? {} : []
        }
     }
     set(obj[currentKey], keys.slice(1), value)

}