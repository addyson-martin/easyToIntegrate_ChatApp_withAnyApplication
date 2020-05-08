const createMssg=(data,username)=>
{
return{
    mssgContent:data,
    deliveredAt: new Date().getTime(),
    username:username
}
}

module.exports=
{
    createMssg

}