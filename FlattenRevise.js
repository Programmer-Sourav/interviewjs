function flatten(arr, depth=1){
    // We've flattened up to required depth, so we return arr as it is
    if(depth===0){
        return arr;
    }
    const result = [];

    for(let i =0; i<result.length; i++){
        if(!Array.isArray(arr[i])){
            result.push(arr[i])
        }
        else{
            // Flatten curr elem which is an arr before pushing to result
            // Also, reduce `depth-1` since we need to flatten arr[i] which is one level more deep
            const flattenedArray = flatten(arr[i], depth-1)
            result.push(...flattenedArray)
        }
    }
    return result;
}

function flattenIterative(arr, depth=1){
const result = []
const stack = []
// In recursive approach, we had track of `depth` because we pass it along each function call
// Similarly, for iterative, we need to bind the current elem and it's `depth` together to keep track
// [curr, depth] is exactly similar to our recursive call flatten(curr, depth)

const newArr = arr.map((citem)=>[citem, depth]);
stack.push(newArr);

while(stack.length>0){
    const top = stack.pop()
    const [citem, depth] = top;

    if(depth===0){
        result.push(citem);
        continue;
    }

    if(!Array.isArray(citem)){
        result.push(citem);
    }
    else{
        //this is similar to our recursive call where we continue processing to flatten the array
        const newArr = citem.map(element =>[element, depth-1]);
        stack.push(...newArr)
    }
}
return result.reverse();

}

function flattenObj(inputObj){
    const result = {}

    for(let key in inputObj){
        if(typeof inputObj[key]==='object' && inputObj[key]!==null){
            result = {...result, ...flattenObj(inputObj[key])}
        }
        else{
            result[key] = inputObj[key]
        }
    }
    return result;
}

function flattenwithPrefix(input, prefix=""){
 let result = {}
 const pre = prefix.length>0? prefix +"." : "";

 for(let key in input){
    if(typeof input[key]==="object" && input[key]!==null){
        result = {...result, ...flattenwithPrefix(input[key], pre+key)}
    }
    else {
        // we assign the prefix as the new key to denote on how to access the current value in the original object
        result[pre + key] = input[key];
        }
 }
 return result;
}

function flattenwithPrefixRevise (input, prefix=""){
   let result = {}
   const pre = prefix.length>0? prefix +"." : "";
   console.log(333, pre)
   for(let key in input){
   if(typeof input[key]==="object" && input[key]!==null){
    console.log(334, pre)
      result = {...result, ...flattenwithPrefixRevise(input[key], pre+key)}
   }
   else{
    // we assign the prefix as the new key to denote on how to access the current value in the original object
    console.log(335, pre)
    result[pre+key] = input[key];
   }
   return result;
}
}

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
flattenwithPrefixRevise(obj2,"")
function deepflatten(input){
if(typeof input!=='object' || input!==null){
    return input;
}
if(Array.isArray(input)){
    return flattenArray(input)
}
else{
    return flattenObject(input)
}
}

function flattenArray(input){
    const flattened = []
   for(const elem of input){
    if(Array.isArray(elem)){
        flattened.push(...flattenArray(elem))
    }
    else if (typeof elem === 'object' && elem !== null) {
        flattened.push(flattenObject(elem));
        }
        else {
        flattened.push(elem);
        }
   }
   return flattened;
}

function flattenObject(input) {
    let flattened = {};
    // Our conditions are divided across 3 categories
    // 1. Arrays, 2. Objects, 3. Primitives
    for (const key in input) {
    const elem = input[key];
    if (Array.isArray(elem)) {
    // console.log(flattenArray(elem));
    flattened[key] = flattenArray(elem);
    }
    else if (!Array.isArray(elem) && typeof elem === 'object' && elem !== null) {
    flattened = { ...flattened, ...flattenObject(elem) };
    }
    else {
    flattened[key] = elem;
    }
    }
    return flattened;
    }

    ///flaten-IV

    function flattenFour(input){
        if(typeof input !=='object' || input === null){
            return input;
        }
        if(Array.isArray(input)){
           return flattenArray(input)
        }
        else {
          return flattenObject(input)
        }

        function flattenArray(input){
            let flattened = []

            for(let element of input){
                if(Array.isArray(element)){
                    flattened.push(...flattenArray(element))
                }
                else if(typeof element ==="object" && element!==null){
                     flattened.push(...flattenObject(element))
                }
                else{
                    flattened.push(element)
                }
            }
            return flattened;
        }

        function flattenObject(input){
            let flattened = {}

            for(let element in input){
                if(Array.isArray(element)){
                    flattened[key] = flattenArray(element)
                }
                else if(!Array.isArray(element) && typeof element==="object" && element!==null){
                    flattened = {...flattened, ...flattenObject(element)}
                }
                else{
                    flattened[key] = element;
                }
            }
            return flattened;
        }
    }