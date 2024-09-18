import express from 'express'

const app = express()
const PORT = process.env.PORT ?? 3000

app.use(routerTablero)

app.listen(PORT,()=>{
    console.log('escuchando..');
    
})

