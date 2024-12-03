// state: can be either of `PENDING`, `FULFILLED` or
// `REJECTED`.
// ➔handlers: stores callbacks of then, catch, finally methods
// (these handlers will be executed only when a promise is
// settled i.e. resolved or rejected).
// ➔value: either the value when resolved or error when
//rejected.


const STATE = {
    PENDING: "PENDING", 
    FULFILLED: "FULFILLED",
    REJECTED: "REJECTED"
}

class MyPromise{
    constructor(executorFn){
        this.state = STATE.PENDING,
        this.value = undefined;
        this.handlers = []

        try{
          executorFn(this._resolve, this._reject)
        }
        catch(error){
           this._reject(error)
        }
    }

// The aim of these two methods is to update the `state` and
// `value` properties and call all the handlers which were
// attached to the then, catch, finally methods.

    _resolve = (value) =>{
       updateResult(value, STATE.FULFILLED)
    }
    _reject = (value) =>{
        updateResult(value, STATE.REJECTED)
    }

    updateResult = (value, state ) =>{
        setTimeout(()=>{
            if(this.state !==STATE.PENDING){
                return;
            }

            if(value instanceof MyPromise){
                return value.then(this._resolve, this._reject)
            }

            this.value = value;
            this.state = state;

            this.executeHandlers();

        }, 0)
    }

// The `then()` method will return a new Promise object which
// makes it possible to add the next `.then()` handler to that
// returned Promise object.
    then(onSuccess, onFailure){
        return new MyPromise((resolve, reject)=>{
            this.addHandlers({
                onSuccess: function(value){
                    if(!onSuccess){
                        return resolve(value)
                    }
                    try{
                        return resolve(onSuccess(value))
                    }
                    catch(error){
                        return reject(error)
                    }
                },

                onFailure : function(value){
                    if(!onFailure){
                        return reject(value)
                    }
                    try{
                        return resolve(onFailure(value))
                    }
                    catch(){
                        return reject(error)
                    }
                }
            })
        })
    }

    addHandlers(handler){
       this.handlers.push(handler);
       this.executeHandlers();
    }

    executeHandlers(){
        if(this.state === STATE.PENDING){
            return;
        }

        this.handlers.forEach((handler)=>{
             if(this.state=== STATE.FULFILLED){
                handler.onSuccess(this.value)
             }
             else{
                handler.onFailure(this.value)
             }
        })
        this.handlers = [];
    }
    catch(onFailure){
        return this.then(null, onFailure)
    }

    finally(callback){
        return new Promise((resolve, reject)=>{
            let val;
            let wasRejected;
            this.then((value)=>{
                wasRejected = false;
                val = value;
                return callback();
            }, (error)=>{
                wasRejected = true;
                val = error
                return callback();
            })
        .then(()=>{
            if(!wasRejected){
                return resolve(val)
            }
            return reject(val)
        }).catch((err)=>{
            return reject(err)
        })
    })
    }

}