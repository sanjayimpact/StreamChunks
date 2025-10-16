import multer from 'multer';
import path from 'path';
import fs from 'fs';
import { CloudinaryStorage } from "multer-storage-cloudinary";
import cloudinary from '../config/cloudinary.js';

// const uploadDir=path.join(process.cwd(),"uploads");
// //condition if the uploadDirectory is not present
// if(!fs.existsSync(uploadDir)){
//     fs.mkdirSync(uploadDir,{recursive:true})
// }
// const storage  = multer.diskStorage({
//     destination:(req,file,cb)=>{
//         cb(null,uploadDir);
//     },
//     filename:(req,file,cb)=>{
//         const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
//         const ext =path.extname(file.originalname);
//         cb(null,file.fieldname + "-" +uniqueSuffix + ext);
//     },
// }); 
const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "videos",
    resource_type: "video",
    format: async (req, file) => "mp4",
    public_id: (req, file) => file.originalname.split(".")[0],
  },
});


export const upload = multer({ storage });