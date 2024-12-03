class EventEmitter{
    constructor(){
        this.eventsMap = {}
    }


addEventListener(eventName, callback){
    if(!this.eventsMap[eventName]){
        this.eventsMap[eventName] = []
    }
    this.eventsMap[eventName].push(callback)
}

removeEventListener(eventName, callback){
    const allCallbacks = this.eventsMap[eventName] || []
    this.eventsMap[eventName] = allCallbacks.filter((cb)=>callback !== cb)
}

emitEvent(eventName, ...args){
    const allCallbacks = this.eventsMap[eventName] || []
    allCallbacks.forEach(callback => {
        requestIdleCallback(()=>callback(...args))
    });
}
}