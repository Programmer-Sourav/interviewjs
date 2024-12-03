//forEach polyfil

let data = ["sai", "krishna"]

Array.prototype.customForEach = function(callback){
   for(let i =0; i<this.length - 1; i++){
    callback(this[i], i)
   }
}
console.log(222, Array.prototype.customForEach)

data.customForEach((element, i)=>{
    console.log(123, element, i)
})

//map
Array.prototype.customMap = function(callback) {
    let result = [];
    for(let i =0; i<this.length; i++){
        //apply the callback and return an array
        callback(result.push(this[i]))
    }
    return result;
}


const data2 = [1, 2, 3]

data2.customMap((data)=>console.log(data))