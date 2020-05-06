const express=require('express')
const http=require('http')
const path=require("path")
const socketio=require("socket.io")
const createMssg=require('./funLib/messages.js').createMssg

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
    socket.emit('mssg',createMssg('Welcome :))'))
    socket.broadcast.emit('mssg',createMssg('A new user has joined the grp'))
    socket.on('user-messaged',(mssg,callback)=>
    {
        io.emit('mssg',mssg)
        callback()
    })

    socket.on('disconnect',()=>
    {
        io.emit('mssg',createMssg('a user has left'))
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