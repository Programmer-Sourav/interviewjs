const curry = (mainFun) =>{
    return curried = (...args) => {
          if(args.length>= mainFun.length){
            return mainFun(...args)
          }
          else{
            return curried.bind(null, ...args)
          }
    }
}