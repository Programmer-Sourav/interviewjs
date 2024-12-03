// ➔Create a function `partial` which takes in the `mainFn`
// and the `partialArgs`. The `partialArgs` may contain
// placeholders "_".
// ➔Return a new function which takes in the `nextArgs`,
// whose values need to be replaced with the placeholders
// if it exists.
// ➔Then, take the remaining extra args from `nextArgs` and
// merge them all together as `args`.
// ➔Finally call the `mainFn` passing all the `args`.



partial.placeholder = "_"

function partial(mainFn, ...partialArgs){
    return function(nextArgs){
        // tracks the current element's index in nextArgs
        let i =0;
        const args = [...partialArgs];

        // Replace placeholders with values from `nextArgs`
        args.forEach((args, index)=>{
            if(element=== partial.placeholder){
                args[index] = nextArgs[i++]
            }
        })
        // Add the `remainingArgs` to the `args`
        const remainingArgs = nextArgs.slice(i);
        const finalArgs = [...args, ...remainingArgs]
        console.log(finalArgs)

        return mainFn(...finalArgs);
    }
}

const sumOfThree = (a, b, c) => a + b + c;
const productOfFour = (a, b, c, d) => a * b * c * d;
const partialSum = partial(sumOfThree, 1, '_', 3);
console.log(partialSum(2));
// 6
const partialProduct = partial(productOfFour, '_', '_', 3, '_');
console.log(partialProduct(1, 2, 4));