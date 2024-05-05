function flatten(input){
    let result = {}

    for(let key in input ){
        if(typeof input[key] === 'object' && input[key] !==null){
            result = {...result, ...flatten(input[key])}
        }
        else{
            result[key] = input[key]
        }
    }
    return result;
}

const obj1 = {
    a: 1,
    b: 2,
    c: {
    d: 3,
    e: 4
    }
    };


    const obj2 = {
        a: 1,
        b: 2,
        c: {
        d: 3,
        e: 4,
        f: {
            g: 5
},
h: null
},
j: 'Hi'
};
console.log(flatten(obj1));

console.log(flatten(obj2));