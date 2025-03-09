const Singleton = (function(){
    let instance;

    function createInstance(){
        return {id : Math.random()};
    }


    return {
        getInstance(){
           if(!instance)
            instance = createInstance();
             return instance;
        }
    }
})()

const instance1 = Singleton.getInstance();
const instance2 = Singleton.getInstance();
console.log(instance1 === instance2); 