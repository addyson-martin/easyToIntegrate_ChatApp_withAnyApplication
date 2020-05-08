
const getQuery= ()=>{
const query={}
const params= location.search.slice(1)
const keys=params.split('&')
keys.forEach((e)=>
{
    const x=e.split('=')
    query[x[0]]=x[1]
})

console.log(query,'from funjs');
return query
}