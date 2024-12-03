

document.getElementById("app").innerHTML = `
<h1>Hello JavaScript!</h1>
`;

const obj1 = {a:1, b:2, c: {d:3, e:4}} 
// if value includes {} for a key

function flatten(input){

    let flattened = {}

    for(let key in input){
        if(typeof input[key] === "object" && input[key]!==null ){
            flattened = {...flattened, ...flatten(input[key])}
        }
        else{
            flattened[key] = input[key]
        }
    }
    console.log(123, flattened)
   return flattened;
}

const result = flatten(obj1)
console.log(444, result)


const pObj1 = {a: 1, b:2, c: {d:3, e:4}}
// {a: 1, b:2, c.d: 3, c.e: 4}
const pObj2 = { a: 1, b:2, c: {d:3, e: 4, f: {g:5}, h:null}, j: "hi"}
//{a:1, b:2, c.d:3, c.e:4, c.f.g:5, h:null, j: "hi"}
function flattenWithPrefix(inputObject, prefix=""){
    let flattened = {}

    for(let key in inputObject){
        const prefixedKey = prefix? `${prefix}.${key}` : key
        if(typeof inputObject[key] === "object" && inputObject[key]!==null){
            console.log(111, inputObject[key])
            flattened = {...flattened, ...flattenWithPrefix(inputObject[key], prefixedKey)}
        }
        else{
            flattened[prefixedKey] = inputObject[key]
        }
    }
    console.log(666, flattened)
    return flattened;
}

flattenWithPrefix(pObj1)
flattenWithPrefix(pObj2)


//const input1 = {a:1, b:2, c:[3, {d:4, e: {f: null}}], h: {i: 6, j : {}, k: undefined}, l : "Hi"}
//{a:1, b:2, c: [3, {d:4, f:null}], i:6, k: undefined, l: 'Hi'}
//need to check if input itself is an array or an object
const input2 = [1,2, [3, {d:4, e:undefined, nestedArray: [[5, [6]], [7]]}], 
            {f: 8, g: null, h: { i: {}}}]
//[1,2,3, {d:4, e: undefined, nestedArr : [5, 6, 7]}, {f:8, g: null}]

// function deepFlatenV(input){
//    for(let key in input){
//     if(typeof input[key]==="object" && input[key]!=null ){
//         console.log(111, input[key])
//         flattenObject(input[key])
//     }
//     if(Array.isArray(input[key])){
//         flattenArray(input[key])
//     }
//    }
// }

// function flattenArray(inputArr){
//    console.log(333, inputArr)
// }

// function flattenObject(inputObj){
//    console.log(444, inputObj)
// }
// deepFlatenV(input1)


function flattenv(input){
    if(typeof input !== "object" || input===null){
        return input
    }

    if(Array.isArray(input)){
        return flattenArray(input)
    }
    else{
        return flattenObject(input)
    }

}

function flattenArray(input){
 let flattend = []
 //traverse array, if the element is an array pass it to flattenArray else push it to flattened
 for(const element in input){
    console.log(777, element)
    if(Array.isArray(element)){
    flattend.push(flattenArray(element))
    }
 else{
    flattend.push(element)
 }
}
}

function flattenObject(input){
 let flattenedObj = {}
 for(const key in input){
    if(typeof input[key]==="object" && input[key]!==null){
        flattenedObj = {...flattenedObj, ...flattenObject(input[key])}
    }
    else{
        flattenedObj[key] = input[key]
    }
 }
}

flattenv(input2)

function wrapNegative(){
    //if it given index is (-), then get the item from the end... index won't start with 0 for this case
    
}


const debounced = (mainFn, delay) =>{
    let timerId;

    return function(...args){
    clearTimeout(timerId)   
     timerId = setTimeout(()=>{mainFn(...args)}, delay)
    }
}

let startTime = Date.now();
const fetchData = () =>{
    console.log(`fetchData called after ${Date.now() - startTime}ms`)
}

const debounceFn = debounced(fetchData, 50);