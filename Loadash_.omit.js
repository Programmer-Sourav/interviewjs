function omit(obj, path){
    // The `obj` passed should be a valid object
    // Note: Array is also an object
    if(obj===null || typeof obj !=="object"){
        return;
    }

    // First step is to replace all of the square bracket
    //notation [] with dot notation
// This will work for accessing values from both Objects and
//arrays
   let keys = []
   if(!Array.isArray(path)){
    path = path.replace('[','.');
    path = path.replace(']','.');
    keys = path.split('.');
   }
   else{
    keys = path;
   }

   const currentKey = keys[0];

   // Means we have processed all the keys in the path, so just set the value for the key
   if(keys.length === 1){
    if(Array.isArray(obj[currentKey])){
        obj[currentKey].splice(currentKey, 1);
    }
   else{
    // For objects, we can use the delete keyword to remove the property
    delete obj[currentKey];
   }
}
else{
// Else we continue traversing the path recursively until we find the last key which needs to be omitted
omit(obj[currKey], keys.slice(1));
}
}