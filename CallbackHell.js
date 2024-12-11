function getUser(userId, callback){
    setTimeout(()=>{
     console.log('Getting user from database...');
     callback({userId:userId, username: "John Doe"})
    }, 1000)
}

function getPost(username, callback){
    setTimeout(()=>{
        console.log(`Getting posts for user ${username}...`);
     callback(["post1", "post2", "post3"])
    }, 1000)
}

function getComments(postId, callback){
    setTimeout(()=>{
        console.log(`Getting comments for post ${postId}`)
        callback(["Comment1", "Comment2", "Comment3"])
    }, 1000)
}


getUser(1, (user)=>{
    getPost(user.username, (postId)=>{
         getComments(postId[0], (comments)=>{
            console.log('Comments:', comments);
         })
    })
})

//Callback Hell Solution 1
//Promise

function getUser1(userId){
    return new Promise((resolve)=>{
        setTimeout(() => {
            console.log('Getting user from database...');
            resolve({ userId: userId, username: 'john_doe' });
        }, 1000);
    })
}

function getPost1(username){
    return new Promise((resolve)=>{
        setTimeout(()=>{
            console.log(`Getting Posts for the User ${username}`)
            resolve(["Post1", "Post2", "Post3" ])
        }, 1000)
    })
}

function getComments1(postId){
    return new Promise((resolve)=>{
        setTimeout(()=>{
            console.log(`Getting Comments from the Post ${postId}`)
            resolve(["Comment1", "Comment2", "Comment3"])
        }, 1000)
    })
}

const response = getUser1(1)
.then((user)=>getPost1(user.username))
.then((postId)=>getComments1(postId[0]))
.then((comments)=>console.log("Comments ", comments))
.then((error)=>console.error(error))


async function fetchComments(){
    try{
      const user = await getUser1(1)
      const posts = await getPost1(user.username)
      const comments = await getComments1(posts[0])
      console.log("Comments ", comments)
    }
    catch(error){

    }
}
fetchComments();