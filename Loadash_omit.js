function loadashomit(obj, path){
    if(obj=== null || typeof obj!== 'object'){
        return;
    }
    let keys = []
    if(!Array.isArray(path)){
        path = path.replaceAll('[','.');
        path = path.replaceAll('[', '.');
        keys = path.split(".");
    }
    else{
        keys = path;
    }
    const curKey = keys[0];

    if(keys.length===1){
        if (Array.isArray(obj[curKey])) {
            // For arrays, we need to delete the element at index splice method
          obj[curKey].splice(currKey, 1);
            }
        else {
            // For objects, we can use the delete keyword to remove the property
           delete obj[curKey];
            }
    }
    else{
        //recursive call
        // Else we continue traversing the path recursively until we find the last key which needs to be omitted
        loadashomit(obj[curKey], keys.slice(1));
    }
}