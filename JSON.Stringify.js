function stringify(value){
    //handling for String value
    if( typeof value === "string"){
        return `"${value}"`
    }

    //handling for valid primitives
    if(typeof value === "number" || typeof value === "boolean"){
        return `${value}`
    }
   
   const isTypeNullCategory = (value) =>{
     if(value === null && typeof value === 'object') return true;
     if(typeof value === 'number' && Number.isNaN(value)) return true;
     if(typeof value === "number" && !Number.isFinite(value)) return true;
   }

   const isIgnorableTypeCategory = (value) =>{
    if(typeof value ==="symbol") return true;
    if(value === undefined || typeof value === "undefined") return true;
    if(typeof value === "function") return true;
   }

   if(isTypeNullCategory(value)){
    //return stringified version of null
    return `${null}`
   }

   if(isIgnorableTypeCategory(value)){
    // In this category we return `undefined` directly
    return undefined;
   }

   //handling for Date objects
   if(typeof value==="object" && value!=null && value instanceof Date){
    // return Date in the form of ISO string and wrap in double quotes
    return `"${value.toISOString()}"`
   }
   //handling the bigint
   if(typeof value === "bigint"){
    // BigInt type has no handling so we should throw an Error
   throw new Error('Do not know how to serialize a BigInt in stringified format');
   }
   //handling arrays
   if(typeof value=== "object" && Array.isArray(value)){
    // Since array can be deeply nested with values, process each element in array recursively
    const stringifiedResult = [];

    value.forEach(element => {
        // if val falls under nullable category type, we just process it as a `null` value
        if(isTypeNullCategory(value) || isIgnorableTypeCategory(value)){
            stringifiedResult.push(stringify(null))
        }
        else{
            stringifiedResult.push(stringify(element))
        }
    });
    // return stringified result in array representation  using square brackets `[]`
    return "[" + stringifiedResult.join(",") + "]";
   }

   // Handling for objects
   if(typeof value ==="object" && value!==null && !Array.isArray(value) ){
    // Since object can be deeply nested with values, process
    //each property (enumerable) of object
    const stringifiedResult = [];
    const keys = Object.keys(value);
    for(const key of keys){
        const val = value[key];
        // We'll ignore to process the properties whose values fall under ignorable category
        if(!isIgnorableTypeCategory(val)){
            const result = stringify(val);
            const stringifiedFormat = `"${key}":${result}`;
            stringifiedResult.push(stringifiedFormat)
        }
    }
    // return stringified result in object literal representation using curly braces `{}`
    return "{" + stringifiedResult.join(",") + "}";
   }

}

const testcase8 = {
    name: 'Peter',
    age: 29,
    spiderman: true,
    arr: [1, 2, Symbol(), 4, [undefined, 8, 9, [10, () => {}, new
    Date()]]],
    address: {
    city: 'New york',
    state: 'NY'
    }
    };
    console.log(stringify(testcase8));