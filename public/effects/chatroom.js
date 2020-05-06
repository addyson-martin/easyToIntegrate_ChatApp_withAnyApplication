const socket=io()
const $allmssgs=document.querySelector('#all-chat-mssgs')
const $msg_form=document.querySelector('#mssg-form')
const $input_mssg=document.querySelector('#message')
const $send_btn=document.querySelector('#send-btn')

//rendering 

const $mssgbox=document.querySelector('#mssg-box').innerHTML



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

socket.on('mssg',(mssg)=>{
    console.log(mssg.mssgContent,mssg.deliveredAt);
    const content=Mustache.render($mssgbox,
        {
            message:mssg.mssgContent,
            time:moment(mssg.deliveredAt).format('h:mm a')
        })
    $allmssgs.insertAdjacentHTML('beforeend',content)
    
})
