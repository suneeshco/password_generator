import express from 'express'

const app = express()

const port = 3002

app.get('/',(req,res)=>{
    res.send("hello guys")
})

app.listen(port,()=>{
    console.log(`server started at http://localhost:${port}`)
} )