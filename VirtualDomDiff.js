const deepDiff = (obj1, obj2) =>{
    if(obj1 === obj2) return true;
    if(typeof obj1!=="object" || typeof obj2!=="object" || obj1===null || obj2===null){
        return false;
    }

    const keys = new Set([...Object.keys(obj1),...Object.keys(obj2)]); //Merge all keys from both the objects

    for(let key of keys){
        if(!deepDiff(obj1[key], obj2[key])){
            return false;
        }
    }
    return true;
}


// // Example Usage
// const tree1 = { tag: "div", props: { id: "root", className: "container" }, children: [{ tag: "p", props: {}, children: ["Hello"] }] };
// const tree2 = { tag: "div", props: { id: "root", className: "container" }, children: [{ tag: "p", props: {}, children: ["Hello", " World!"] }] };
// const tree3 = { tag: "div", props: { id: "root", className: "wrapper" }, children: [{ tag: "p", props: {}, children: ["Hello"] }] };

// console.log(deepDiff(tree1, tree2)); // false (text changed)
// console.log(deepDiff(tree1, tree3)); // false (className changed)
// console.log(deepDiff(tree1, tree1)); // true (same object)


// Why This Works Better for Virtual DOM?
// Doesn't rely on key length → Supports structural changes where new properties or children may be added.
// Uses a Set to get all unique keys from both objects.
// Recursively checks properties → Ensures deep comparison while allowing missing or extra nodes.
// This is closer to how Virtual DOM diffing works in libraries like React, where only necessary parts of the tree are updated.