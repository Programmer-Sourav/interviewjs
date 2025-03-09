//Fetch Data with Promise

const fetchData = new Promise((resolve, reject) =>{
    const url = "https://jsonplaceholder.typicode.com/todos/";
  setTimeout(()=>{fetch(url).then((response)=>{
    if(!response.ok){
        reject(new Error(`HTTP Error! status: ${response.status}`)) // Explicitly reject on bad status
    }
    else{
        response.json().then(resolve).catch(reject) // Explicitly resolve or reject after parsing JSON
    }
  }).catch((error)=>reject(error)) // Explicitly reject on fetch error
}, 1000)
})

fetchData.then((value)=>console.log(value)).catch(err=>console.log(err))

async function fetchDataAsync(){
    try{
    const data = await fetchData();
    console.log(data);
    }
    catch(error){
        console.error("Error "+error);
    }
}