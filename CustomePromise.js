// new Promise((resolve, reject)=>{

// })

const STATE = {
    PENDING: "PENDING",
    FULFILLED: "FULFILLED",
    REJECTED: "REJECTED"
}

class MyPromise{
    constructor(callback){
        this.state = STATE.PENDING;
        this.value = undefined;
        this.handlers = []
        try{
         callback(this._resolve, this._reject);
        }
        catch(error){
          this._reject(error)
        }
    }
    // using arrow functions for _resolve() and _reject() methods since we don't want to lose context of "this" when these methods are called

    _resolve = (value) =>{
        this.updateResult(value, STATE.FULFILLED);
    }

    _reject = (error) =>{
        this.updateResult(error, STATE.REJECTED);
    }

    updateResult(value, state) {
       setTimeout(()=>{
        if(this.state!== STATE.PENDING){
            return;
        }

        if(value instanceof MyPromise){
            return value.then(this._resolve, this._reject)
        }
        this.value = value;
        this.state = state;
        this.executeHandler();
       },0);
    }
   then(onSuccess, onFailure){
    return new MyPromise((resolve, reject)=>{
        this.addHandlers({
              onSuccess : function(value){
                if(!onSuccess)
                    return resolve(value)

                try{
                 return resolve(onSuccess(value))
                }
                catch(error){
                    return reject(error)
                }
              },

              onFailure: function(value){
                if(!onFailure)
                    return reject(value)
                try{
                  return reject(onFailure(value))
                }
                catch(error){
                  return reject(error)
                }
              }
        });
    });
   }
   
   addHandlers = (handler) =>{
   this.handlers.push(handler);
   this.executeHandlers();
   }

   executeHandlers(){
    if(this.state=== STATE.PENDING){
       return;
    }

    this.handlers.forEach((handler)=>{
        if(this.state===STATE.FULFILLED){
            handler.onSuccess(this.value);
        }
        else{
            handler.onFailure(this.value);
        }
    });
    this.handlers = [];
   }

   catch(onFailure) {
    return this.then(null, onFailure);
    }
    finally(callback) {
    return new MyPromise((resolve, reject) => {
    let val;
    let wasRejected;
    this.then((value) => {
    wasRejected = false;
    val = value;
    return callback();
    }, (err) => {
        wasRejected = true;
val = err;
return callback();
})
.then(() => {
if (!wasRejected) {
return resolve(val);
}
return reject(val);
})
.catch((err) => {
return reject(err);
})
})
}
}