const mapAndReduce = () =>{
  const arr = [1,2,3,4,5,6]
  const map = arr.map((item)=>item+2)
  const reduced = map.reduce((acc, cur)=>(acc+cur), 0)
  console.log(reduced)
}