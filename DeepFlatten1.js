function flatten(arr, depth=1){
    if(depth===0){
        return arr;
    }

    const result = []

    for(let i =0; i<arr.length; i++){
        if(!Array.isArray(arr[i])){
            result.push(arr[i]);
        }
        else{
            const flattenedArray = flatten(arr[i], depth - 1)
            result.push(...flattenedArray);
        }
    }
    return result;
}

function flattenSecondApproach(arr, depth = 1){
    const result = [];
    const stack = [];

    const newArr = arr.map((curr)=>[curr, depth]);
    stack.push(...newArr);

    while(stack.length>0){
        const top = stack.pop()
        const [curr, depth] = top;
        
        if(depth===0){
            result.push(curr)
            continue;
        }

        if(!Array.isArray(curr)){
            result.push(curr)
        }
        else{
            const newArr = curr.map(element =>[element, depth-1]);
            stack.push(...newArr); 
        }
    }
    return result.reverse();
}

const arr1 = [1, [2], [3, [4]]];
const arr2 = [1, 2, [3, 4, [5, 6]]];

console.log(flattenSecondApproach(arr1, 1));
// [1, 2, 3, [4]]
console.log(flattenSecondApproach(arr1, 2));
// [1, 2, 3, 4]
console.log(flattenSecondApproach(arr1, 2));
// [1, 2, 3, 4]
console.log(flattenSecondApproach(arr2, 2));


/*** Revise */
function flattenRevise(arr, depth=1){
  if(depth==0){
    return arr;
  }
  const result = [];
  for(let i =0; i<arr.length; i++){
     if(!Array.isArray(arr[i])){
        result.push(arr[i])
     }
     else{
        result.push(...flattenRevise(arr[i], depth-1))
     }
  }
}