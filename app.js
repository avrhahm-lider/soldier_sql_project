import express from 'express'
import soldiersRouter from './router/soldier.js'
import dotenv from 'dotenv'
import { creatTable } from './dal/soldiers.js'

dotenv.config()

const app = express()

app.use(express.json())
app.use("/soldiers", soldiersRouter)
creatTable()
app.listen(process.env.PORT,()=>{
    console.log(`sever runung on http://localhost${process.env.PORT}`);
    
})
