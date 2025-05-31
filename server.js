const fs = require("fs").promises;
const fs1 = require("fs");

async function readMultipleFiles(files){
    try{
     const fileReadPromises = files.map((filepath)=>fs.readFile(filepath, 'utf-8'))
     const fileContents = await Promise.all(fileReadPromises);
     return fileContents;
    }
    catch(error){
        console.error("Error "+error)
    }
}

const files = ["file1.txt", "file2.txt", "file3.txt"];

readMultipleFiles(files).then((value)=>{
    value.forEach((content, index)=>{
        console.log(`Contents of file ${index+1}`, content)
    });
});

//asynchrnous single file read

fs1.readFile("example.txt", 'utf-8', (err, data)=>{
   if(err){
    console.error("Error reading file ", err)
    return;
   }
   console.log("File Contents ", data)
})


async function readFileAsync(){
    try{
    const data = await fs.readFile('example.txt', 'utf-8')
    console.log('File contents:', data);
    }
    catch(err){
        console.error("Error reading file ", err)
    }
}

readFileAsync();