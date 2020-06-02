const express=require('express')
const http=require('http')
const path=require("path")
const socketio=require("socket.io")
const createMssg=require('./funLib/messages.js').createMssg
const {appendUser,getuser,removeUser,getusersinroom}=require('./funLib/users.js')

app=express()
const server=http.createServer(app)
//socketio takes a raw http model as an argument
const io=socketio(server)
const port=process.env.PORT || 3000
const pathToPublic=path.join(__dirname,"../public")
app.use(express.static(pathToPublic))

io.on('connection',(socket)=>
{
    console.log("New connection");
    socket.on('join',(obj,callback)=>
    {
        const room =obj.room
        const username=obj.username
        console.log(socket.id);
        socket.emit('sendclientid',socket.id)
        const {error,user}=appendUser({id:socket.id,username:username,room:room})
        if(error)
        {
            return callback(error)
        }
        socket.join(user.room)
        socket.emit('mssg',createMssg(`Welcome ${user.username} !!`,'Admin'))
        socket.broadcast.to(user.room).emit('mssg',createMssg(` ${user.username} has joined the grp`,'Admin'))
        io.to(user.room).emit('roommeta',
        {
            room:user.room,
            usersinroom:getusersinroom(user.room)
        })
    })
    socket.on('disconnect',()=>
        {
            const {res,err}=removeUser(socket.id)
            if(err){
                socket.emit('undefinedERR',err)
                return
            }
            io.to(res.room).emit('roommeta',
            {
                room:res.room,
                usersinroom:getusersinroom(res.room)
            })
            io.to(res.room).emit('mssg',createMssg(`${res.username} has left`,'Admin'))
        })
    socket.on('user-messaged',(mssg,callback)=>
        {
            const res=getuser(socket.id)
            io.to(res.room).emit('mssg',createMssg(mssg,res.username),socket.id)
            callback()
        })
    
})


app.get("",(req,res)=>
{
    res.send("hi")
})




server.listen(port,()=>
{
    console.log("App running on port 3000");
    
})
