function Person(){
    let name = "John" // private variable
    return{
        getName: function(){
            console.log(name);
        },
        setName: function(suppliedName){
            name = suppliedName;
        }
    }
}

const person1 = Person()
console.log(person1.getName())
person1.setName("Jane")
console.log(person1.getName())


function fetchData(){
    const api = "https://api.example.com/data"

    setTimeout(()=>{
        console.log(`API ${api}`)
    }, 2000)
}

fetchData();

for(var i =0; i<=3; i++){
    (function(i){
        setTimeout(()=>{
            console.log("i "+i)
        }, 1000)
    })(i)
}