//03. Find a first pair whose sum is zero using indexing
//Use the two-pointer approach for a sorted array:
const firstPair = (arr) =>{

    let left = 0, right = arr.length-1;
    while(left<right){
     const sum = arr[left] + arr[right]
     if(sum===0)
        return [arr[left] , arr[right]];
     sum<0 ? left ++ : right--;
    }
    return null;

}

console.log(firstPair([-3, -2, 0, 2, 3]))

//04. Find the largest elements from the 2D array
const largestFrom2D = (matrix) =>matrix.map((row)=>Math.max(...row))
console.log(largestFrom2D([[1, 2, 3], [4, 5, 6], [7, 8, 9]]))

//05. Calculate the sum of all the numbers in a nested array
const sumNestedArray = (arr) =>{
    return arr.reduce((sum, curr)=> Array.isArray(curr) ? sum + sumNestedArray(curr) : sum + curr, 0)
}
console.log(sumNestedArray([1, [2, [3, 4]]]))
//06. Max word length in an array
const maxWordLength = (arr) => Math.max(...arr.map((word)=>word.length))
console.log(maxWordLength(["apple", "banana", "cherry"]))
//08. Get the last N elements of an array
const getLastNElements = (arr, n) => arr.slice(-n)
console.log(getLastNElements([1, 2, 3, 4, 5], 3))
//11. Find the occurrence in a given array in JavaScript
const countOccurances = (arr) =>{
    return arr.reduce((acc, curr)=>{
        acc[curr] = (acc[curr] || 0) + 1
        return acc;
    }, {})
}
console.log(countOccurances(["a", "b", "a"]))
//12. Find the first two numbers that sum up to 0
const findTwoSumZero = (arr) =>{
    const seen = new Set();

    for(const num of arr){
        if(seen.has(-num)) return [num, -num]
        seen.add(num)
    }
    return null;
}
console.log(findTwoSumZero([1, -1, 2, -2]))
//13. Find the largest difference of the elements inside the array
const maxDifference = (arr) => Math.max(...arr) - Math.min(...arr)
console.log(maxDifference([2, 3, 10, 6]))
//15. Sort given array of objects with age in JavaScript
const sortByAge = (arr) => arr.sort((a,b)=>a.age - b.age)
console.log(sortByAge([{name: "A", age: 30}, {name: "B", age: 25}]))
//17. Missing Number in an Array
const findMissingNumber = (arr, n) =>{
  const sum = n*(n+1)/2;
  const foundSum = arr.reduce((acc, curr)=>acc+curr, 0)
  return sum -foundSum;
}
console.log(findMissingNumber([1, 2, 4, 6, 3, 7, 8], 8))
//18. Support Negative Index in Arrays in JavaScript
const getElement = (arr, index) => index<0? arr[arr.length+index] : arr[index] 
console.log(getElement([10, 20, 30, 40], -1))