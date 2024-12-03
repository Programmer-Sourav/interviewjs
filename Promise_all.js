Promise.all = function(promises){
    const result = [];
    let completedCount = 0;

    return new Promise((resolve, reject)=>{
        if(promises.length === 0){
            return resolve(result)
        }
        const checkResolved = () =>{
            if(completedCount===promises.length)
            resolve(result);
        }

 promises.forEach((element, index) => {
// We need to wrap each `elem` in Promise.resolve(),
// since `elem` can be any value other than a Promise
//as well

Promise.resolve(element).then((value)=>{
    result[index] = {status: "fulfilled", value}
    completedCount ++;
    checkResolved();
}).catch((error)=>reject(error))
        });
    })
}

const promise1 = Promise.all([
    Promise.resolve(1),
    new Promise((resolve) => setTimeout(() => resolve(2), 2000)),
    Promise.resolve(3),
    4
    ])
    promise1
    .then(value => console.log('Resolved with 1', value))
    .catch(value => console.log('Rejected with 1', value))


    const promise2 = Promise.all([
        new Promise((resolve) => setTimeout(() => resolve(3), 2000)),
        Promise.resolve(2),
        '4',
        new Promise((resolve) => setTimeout(() => resolve(1), 0)),
        Promise.resolve(5),
        ])
        promise2
        .then(value => console.log('Resolved with 2', value))
        .catch(value => console.log('Rejected with 2', value))
        
        const promise3 = Promise.all([
            Promise.resolve(1),
            new Promise((resolve, reject) => setTimeout(() => reject(2),
            0)),
            new Promise((resolve) => setTimeout(() => resolve(3), 2000)),
            Promise.reject(4),
            Promise.reject(5)
            ])
            promise3
            .then(value => console.log('Resolved with 3', value))
            .catch(value => console.log('Rejected with 3', value))


            const promise4 = Promise.all([
                null,
                undefined,
                new Promise((resolve) => setTimeout(() => resolve(2), 350)),
                {},
                'Hello'
                ])
                promise4
                .then(value => console.log('Resolved with 4', value))
                .catch(value => console.log('Rejected with 4', value))


                const promise5 = Promise.all([])
promise5
.then(value => console.log('Resolved with 5', value))
.catch(value => console.log('Rejected with 5', value))