const users=[]

const appendUser= ({id,username,room})=>
{ 
    username=username.trim().toLowerCase()
    room=room.trim().toLowerCase()
    if(!username || !room)
    {
        return { error:"Please provide details to continue"}
    }

    const checkExistingUser = users.find((user)=>
    {
        return user.username===username && user.room===room
    })

    if(checkExistingUser)
    {
        return {error:"User already exist"}
    }
     
    const user = {id,username,room}
    // console.log(user);
    
    users.push(user)
    return {user}

}

const removeUser=(id)=>
{
    // username=username.trim().toLowerCase()
    const index=users.findIndex((user)=>
    {
        return user.id===id
    })

    if(index !==-1)
    {
        res= users.splice(index,1)[0]
        return {res}
    }
    else
    {
        return {err:'This id does not exist'}        
    }
}

const getuser=(id)=>
{
    // username=username.trim().toLowerCase()
    const res=users.find((user)=>
    {
        return user.id===id
    })

    return res
}
const getusersinroom=(room)=>
{
    room=room.trim().toLowerCase()
    const usersInRoom=[]
    users.forEach((user)=>
    {
        if(user.room===room)
        {
            usersInRoom.push(user.username)
        }
    });
    return usersInRoom
}

module.exports=
{
    appendUser,
    removeUser,
    getuser,
    getusersinroom
}