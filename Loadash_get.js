function get(obj, path, defaultValue){

    if(obj===null || typeof obj!== 'object'){
        return defaultValue;
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
    if(keys.length === 1){
        return obj.hasOwnProperty(curKey) ? obj[curKey] : defaultValue;
    }
    else{
        if(obj.hasOwnProperty(curKey)){
            return get(obj[curKey], keys.slice(1) , defaultValue)
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
console.log(get(obj, 'a.b', 'Key Not Found'));
// Hello
console.log(get(obj, ['a', 'h', 'i', 'k'], 'Key Not Found'));
// Batman
console.log(get(obj, 'a[b]', 'Key Not Found'));
// Hello
console.log(get(obj, ['a', 'e', '1', 'work'], 'Key Not Found'));
// Spiderman
console.log(get(obj, 'a[d].1', 'Key Not Found'));
// 2
console.log(get(obj, 'a.d.2', 'Key Not Found'));
// World
console.log(get(obj, 'a.d.3', 'Key Not Found'));
// Key Not Found
console.log(get(obj, 'a[d][0]', 'Key Not Found'));
// 1
console.log(get(obj, 'a.e.0.name', 'Key Not Found'));

console.log(get(obj, 'f.g', 'Key Not Found'));
// undefined
console.log(get(obj, 'f.g.h.i.j.k', 'Key Not Found'));