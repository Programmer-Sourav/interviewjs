
//My Version
const myLocalStorage = () =>{
    console.log(123, "MyLocalStorage");
    
    const myStore = {  
       storage: window.localStorage,

       setItem : (key, value, expiry) =>{
        const currentDate = new Date()

        const data = {
            val: value,
            expiryTime: currentDate.getTime() + expiry
        }

        console.log(221, data);
        myStore.storage.setItem(key, JSON.stringify(data))
    },

    getItem : (key) =>{
        const currentTime = new Date().getTime();
        console.log(111, currentTime)
        const data = JSON.parse(myStore.storage.getItem(key))
        console.log(223, data)
        //suppose, now time is 13:00, expiry set for 5 mins,
        // If I check at 13:03, value should be available but if I check at 13:06
        //value should not be available
        //so, expiry time should be less than current time 
        console.log(555, data.expiryTime, currentTime)
        if(data.expiryTime < currentTime){
            //****looks like currenttime and expiry time are same, so not retrieving data
            console.log(444, data)
        }
    }
    }  
    const getItem = myStore.getItem;
    const setItem = myStore.setItem;
    return {getItem, setItem}
}

const locStorage = myLocalStorage();
console.log(1234, locStorage)
locStorage.setItem(123, "TestData", 1000)
const itemg = locStorage.getItem(123)
console.log(224, itemg)
