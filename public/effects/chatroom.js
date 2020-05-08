const socket=io()
const $allmssgs=document.querySelector('#all-chat-mssgs')
const $msg_form=document.querySelector('#mssg-form')
const $input_mssg=document.querySelector('#message')
const $send_btn=document.querySelector('#send-btn')
const $temp_append=document.querySelector('#sidebar-user')

//rendering 

const $mssgbox=document.querySelector('#mssg-box').innerHTML
const $sidebarTemp=document.querySelector('#sidebar-templates').innerHTML
const $room_name=document.querySelector('#room-name-temp').innerHTML

const scroll = () => {
    const $newMessage = $allmssgs.lastElementChild
    const newMessageStyles = getComputedStyle($newMessage)
    const newMessageMargin = parseInt(newMessageStyles.marginBottom)
    const newMessageHeight = $newMessage.offsetHeight + newMessageMargin
    const visibleHeight = $allmssgs.offsetHeight
    const containerHeight = $allmssgs.scrollHeight
    const scrollOffset = $allmssgs.scrollTop + visibleHeight

    if (containerHeight - newMessageHeight <= scrollOffset) {
        $allmssgs.scrollTop = $allmssgs.scrollHeight
    }
}
$msg_form.addEventListener('submit',(e)=>
{
    e.preventDefault()
    $send_btn.setAttribute('disabled','disabled')
    const mssg= e.target.elements.message.value
    socket.emit('user-messaged',mssg,()=>
    {
        $send_btn.removeAttribute('disabled')
        $input_mssg.value=""
        $input_mssg.focus()
        console.log("delivered!");
        
    })
})
socket.emit('join',getQuery(),(mssg)=>
{
    alert(mssg);
    location.href='/'
    
})
socket.on('roommeta',(obj)=>
{
    const room_name=Mustache.render($room_name,{name:obj.room})
    let content=room_name
    const users=obj.usersinroom
    let buffer=null;
    users.forEach( (user)=> {
         buffer=Mustache.render($sidebarTemp,
            {
                sidebarData:user
            })
            content = content+buffer;
        });
        $temp_append.innerHTML=content
        console.log(content);  
        
    
})
socket.on('undefinedERR',(data)=>
{
    alert(data)
})
socket.on('mssg',(mssg)=>{
    // console.log(mssg.mssgContent,mssg.deliveredAt,mssg.username);
    const content=Mustache.render($mssgbox,
        {
            username:mssg.username,
            message:mssg.mssgContent,
            time:moment(mssg.deliveredAt).format('h:mm a')
        })
    $allmssgs.insertAdjacentHTML('beforeend',content)
    scroll()
})


 