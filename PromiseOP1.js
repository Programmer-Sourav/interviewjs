initiateBooking = (amount) =>{
    var bookingPrice = amount>=3000 ? true : false
    return new Promise((resolve, reject)=>{
        setTimeout(bookTicket, 2000, bookingPrice, resolve, reject)
    })
}

bookTicket = (bookingPrice, resolve, reject) =>{
    bookingPrice = true ? resolve() : reject();
}

console.log("Booking Initiated");


initiateBooking(3000).then(()=>{console.log("Booking Completed")}).catch(()=>{console.log("Booking Failed")})

console.log("Booking Processing");