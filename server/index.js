import express from 'express';
import  cors from 'cors'
import { connectdb } from './config/db.js';
import { userRouter } from './routes/user.route.js';
const port = 4000;

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:true}))
app.use('/api',userRouter);
app.get('/',(req,res)=>{
    return res.json({message:"Welcome to the serve"})
})

app.listen(port,(err)=>{
    if(err){
       console.log(err)
    }
    console.log(`server is listen on port:${port}`)
})