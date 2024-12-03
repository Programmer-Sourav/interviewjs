
Array.prototype.reduce = function reduce(callback, initialValue){

// Variable that accumulates the result after performing
// operation by executing the callback one-by-one on the array
// elements
let accumulator = initialValue;

// Note: `this` will be the actual array on which the
//`reduce()` method was called
let arr = this;

// Iterate on each element of arr

for(let i =0; i<arr.length; i++){
    if(!accumulator){

 // If initialValue was not passed, then accumulator
//will be undefined, so we initialize it with first element of arr

        accumulator = arr[i]
    }
    else{

        // Now, process by executing the callback by passing
// the each element to the array, and accumulating the result in
// `accumulator`
        accumulator = callback.call(this, accumulator, arr[i], i, arr);
    }
}
// Return the final accumulated result value
return accumulator;

}


const arr1 = [1, 2, 3, 4, 5];
const initialValue1 = 10;
const sum = (accumulator, currentValue) => {
    const sum = accumulator + currentValue;
return sum;
}
arr1.reduce(sum, initialValue1);
// 25
// -------------------------------------
// When `initialValue` is not passed
const arr2 = [1, 2, 3, 4, 5];
const initialValue2 = 10;
arr1.reduce((accumulator, currentValue) => {
const sum = accumulator + currentValue;
return sum;
});
// 15
// -------------------------------------
// Function piping using reduce
function increment(input) {
return input + 1;
}
function decrement(input) {
    return input - 1;
}
function double(input) {
return input * 2;
}

// Let's say we're give a number, which we need to increment
//first, then decrement the result of that, then double the last
//result
// So we just use simple arr, and add our methods
const arr3 = [increment, decrement, double];
const initialValue3 = 100;
const applyOperation = (accumulator, currentValue) => {
// `currentValue` will the functions added in the array
const result = currentValue(accumulator);
return result;
}
arr3.reduce(applyOperation, initialValue3);

