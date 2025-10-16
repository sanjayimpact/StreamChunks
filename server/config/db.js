import mongoose from "mongoose";

export const connectdb = async()=>{
    try{
      let connect = await mongoose.connect('mongodb://localhost:27017/fileupload')
      if(connect){
        console.log('successfully connected')
      }
      else{
        console.log('database not connected ')
      }
    }catch(err){
        console.log(err)
    }
}
connectdb();