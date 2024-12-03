Promise.race = function(input){

return new Promise((resolve, reject)=>{
    input.forEach(element => {
        Promise.resolve(element).then((value)=>resolve(value))
        .catch((reason)=>reject(reason))
    });

})
}


const promise1 = Promise.race([
    Promise.reject(1),
    new Promise((resolve) => setTimeout(() => resolve(2), 2000)),
    Promise.reject(3),
    Promise.reject(4)
    ])
    promise1
    .then(value => console.log('Resolved with 1', value))
    .catch(value => console.log('Rejected with 1', value))



    const promise2 = Promise.race([
        new Promise((_, reject) => setTimeout(() => reject(3),
        2000)),
        Promise.reject(2),
        '4',
        new Promise((_, reject) => setTimeout(() => reject(1), 0)),
        Promise.reject(5)
        ])
        promise2
        .then(value => console.log('Resolved with 2', value))
        .catch(value => console.log('Rejected with 2', value))


        const promise3 = Promise.race([
            new Promise((_, reject) => setTimeout(() => reject(2), 0)),
            Promise.reject(3),
            Promise.reject(4)
])
promise3
.then(value => console.log('Resolved with 2', value))
.catch(value => console.log('Rejected with 3', value))

const promise4 = Promise.race([
    null,
    undefined,
    new Promise((resolve) => setTimeout(() => resolve(2), 350)),
    {},
    'Hello'
    ])
    promise4
    .then(value => console.log('Resolved with 4', value))
    .catch(value => console.log('Rejected with 4', value))


    