function classNames(...args){
    let output= "";
    let i=0;
    while(i<args.length){
        if(typeof args[i] === "object")
            for(const value of args){
               console.log(123, value)
               if(value===true){

               }
            }
      
       i++;
    }

    return output.toString().trim();
}


// let result = classNames('foo', 'bar')
// console.log(result)

let result = classNames('foo', {bar: true});
console.log(result)