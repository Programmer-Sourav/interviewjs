function getTypeOf(data){
    //function borrowing
  const type = Object.prototype.toString.call(data)  //'[object type]'

  // 1. Strip the square brackets []
  // 2. Split by empty space character and get the type alone at the 1st index
 // 3. Convert it to lowercase, to make it work exactly like the built-in `typeof` operator
 // 4. Finally return the value

  const dataType = type.slice(1, -1).split('')[1].toLowerCase();
  return dataType;

} 



const arr = [1,2,3];
getTypeOf(arr);
// 'array'
const date = new Date();
getTypeOf(date);
// 'date'
const regex = new RegExp();
getTypeOf(regex);
// 'regexp'
const bool = new Boolean(false);
getTypeOf(bool);
// 'boolean'
getTypeOf(JSON);
// 'json'
const map = new Map();
getTypeOf(map);
// 'map'
const err = new Error();
getTypeOf(err);
// 'error'
getTypeOf(null);
// 'null'
const arraybuffer = new ArrayBuffer();
getTypeOf(arraybuffer);
// 'arraybuffer'
