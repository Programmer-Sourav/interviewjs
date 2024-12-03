const express = require('express');
const app = express();
const port = 3000;

app.use(express.json());


let books = [{id: 1, name: "book1", author: "author1"}, 
              {id: 2, name: "book2", author: "author2"}
];


app.post("/books", (req, res)=>{
    try{
       const bookDetails = req.body;
        if(bookDetails){
            books = [...books, bookDetails]
            res.status(200).json({statusCode: 200, data: books, message: "Successfully added a new book"})
        }
        else{
            res.status(400).json({statusCode: 400, message: "Book Details is a mandatory parameter"})
        }
    }
    catch(error){
        res.status(500).json({statusCode: 500, message: "Internal Server Error"})
    }
})

app.put("/books/:id", (req, res)=>{
    try{
       const bookId = req.params.id;
       const detailsToBeUpdated = req.body;
        if(bookId){
            const foundBook = books.find((book)=>book.id===bookId)
            if(foundBook){
                const updatedBook = books.map((book)=>(book.id===bookId ? {...book, name: detailsToBeUpdated.name, author: detailsToBeUpdated.author } : book))
                res.status(200).json({statusCode: 200, data: updatedBook, message: "Book details successfully updated"})
            }
        }
            else{
                res.status(400).json({statusCode: 400, message: "Book Details is a mandatory parameter"})
            }
        
    }
    catch(error){
        res.status(500).json({statusCode: 500, message: "Internal Server Error"})
    }
})

app.delete("/books/:id", (req, res)=>{
    try{
        const bookId = req.params.id;
        if(bookId){
            const deleteBook = books.filter((book)=>book.id!==bookId)
            res.status(200).json({statusCode: 200, message: "Book details deletion succesful!"})
        }
        else{
            res.status(400).json({statusCode: 400, message: "Mandatory parameter missing"})
        }
    }
    catch(error){
        res.status(500).json({statusCode: 500, message: "Internal Server Error"})
    }
})

app.get("/books/:bname", (req, res)=>{
    const bookName = req.params.bname;
    const allBooks = books.filter((book)=>book.name.toLowerCase()===bookName.toLowerCase());
    try{
        res.status(200).json({statusCode: 200, data: allBooks, message: "Book details Fetched Succesfully"})
    }
    catch(error){
        res.status(500).json({statusCode: 500, message: "Internal Server Error"})
    }
})


app.get("/books/:bname", (req, res)=>{
    const bookName = req.params.bname
    try{
        const specificBook = books.find((book)=>book.name===bookName)
        if(specificBook)
        res.status(200).json({statusCode: 200, data: specificBook, message: "Book details Fetched Succesfully"})
        else
        res.status(400).json({statusCode: 400, message: "Mandatory parameter missing"})
    }
    catch(error){
        res.status(500).json({statusCode: 500, message: "Internal Server Error"})
    }
})


app.listen(port, () => {
  console.log(`Library API listening at http://localhost:${port}`);
});


