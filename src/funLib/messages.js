const createMssg=(data)=>
{
return{
    mssgContent:data,
    deliveredAt: new Date().getTime()
}
}

module.exports=
{
    createMssg

}