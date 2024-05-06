function set(obj, path, value){
    if(obj===null || typeof obj!== Object){
        return;
    }

    let keys = [];

    if(!Array.isArray(path)){
        path = path.replaceAll('[', '.');
        path = path.replaceAll(']', '.');
        keys = path.split('.');
    }
    else{
        keys = path;
    }

    const curKey = keys[0];

    if(keys.length ===1){
        obj[curKey] = value;
    }
    else {
        // If `currKey` is not defined yet on `obj`, we need to define it
        if (!obj.hasOwnProperty(curKey)) {
        // --> There can be 2 possibilities that the currKey can be either an object (or) array
        // How to decide that? - This depends on the type of the key for the `nextKey` which we would need to assign
        // If nextKey is a number format, then array, else an
        object
        // Example : 'a[1]' -> 'a.1' -> currKey=a, nextKey=1 -> So define array
        // Example : 'a.b' -> currKey=a, nextKey=b -> So define object
        // Verify if `nextKey` is not a number
        const nextKey = keys[1];
        const num = Number(nextKey);
        // check if is Not a Number
        const isNotANumber = isNaN(num);
        obj[curKey] = (isNotANumber) ? {} : [];
        }
        // Continue processing the path recursively
        set(obj[curKey], keys.slice(1), value);
    }
}


const obj = {
    a: {
    b: 'Hello',
    e: [{ name: 'Peter Parker' }],
    h: {
    i: {
    j: 'Iron Man'
    }
    }
    },
    f: {
    g: undefined
    }
    }
    set(obj, 'a.c', null);
 