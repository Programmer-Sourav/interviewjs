const button = document.getElementById("button")
button.textContent = "Open Dialog"
button.setAttribute("id", "myButton") //adds an id attribute
button.classList.add("btn", "btn-primary") // Adds multiple classes
button.style.backgroundColor = "blue";// Adds inline style

document.body.appendChild(button); // Append to <body>


const div = document.createElement("div")
div.classList.add("card")

const heading = document.createElement("h2")
heading.textContent = "H2 header"

const paragraph = document.createElement("p")
paragraph.textContent = "This is a dummy paragraph";

div.appendChild(heading);
div.appendChild(paragraph);

document.body.appendChild(div);

const fragment = document.createDocumentFragment();

for(let i =0; i<=5; i++){
    const listItem = document.createElement("li");
    listItem.textContent = `listItem ${i}`
    fragment.appendChild(listItem);
}

document.getElementById("list").appendChild(fragment); // Add all at once