const container = document.querySelector(".container");


function loadImages(numImages = 10){
   for(let i = 0; i<numImages; i++){
    fetch('https://dog.ceo/api/breeds/image/random').
    then(response =>response.json())
    .then(data  =>{
        const img = document.createElement("img");
        img.src = `${data.message}`
        container.appendChild(img)
    })
   }
}


loadImages();

window.addEventListener("scroll", ()=>{
    console.log(window.scrollY);
    console.log(window.innerHeight);

    if(window.scrollY + window.innerHeight>= document.documentElement.scrollHeight ){
        loadImages();
    }
});
