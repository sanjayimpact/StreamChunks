import { User } from "../models/user.model.js";
import axios from 'axios';

export const addprofile = async(req,res)=>{
  const {path} = req.file;
  const {name} = req.body;
    try{
      console.log(path);
      //save all the path in the database
      let savevideos = new User({
        name:name,
        video:path
      })
      await savevideos.save();
      return res.status(200).json({message:"Successfully fetched",success:true,data:savevideos})
    }catch(err){
        console.log(err);
    }
}

export const getvideo = async(req,res)=>{
  try{
      let result = await User.find({});
      return res.json({message:"Successfully fetched",success:true,data:result})
  }catch(err){
    console.log(err);
  }
}

export const stream = async (req, res) => {
  const { url } = req.query;
  const range = req.headers.range;

  if (!url) {
    return res.status(400).json({ message: "Missing video URL", success: false });
  }

  if (!range) {
    return res.status(400).json({ message: "Requires Range header", success: false });
  }

  try {
    // Get video size (HEAD request)
    const head = await axios.head(url);
    const videoSize = parseInt(head.headers["content-length"], 10);

    const CHUNK_SIZE = 1 * 1024 * 1024; // 1MB
    const start = Number(range.replace(/\D/g, ""));
    const end = Math.min(start + CHUNK_SIZE, videoSize - 1);

    const contentLength = end - start + 1;

    // Set headers
    const headers = {
      "Content-Range": `bytes ${start}-${end}/${videoSize}`,
      "Accept-Ranges": "bytes",
      "Content-Length": contentLength,
      "Content-Type": "video/mp4",
    };

    res.writeHead(206, headers);

    // Fetch the video chunk from Cloudinary
    const videoStream = await axios({
      method: "get",
      url,
      responseType: "stream",
      headers: { Range: `bytes=${start}-${end}` },
    });

    // Pipe to response
    videoStream.data.pipe(res);
  } catch (err) {
    console.error("❌ Stream Error:", err.message);
    return res.status(500).json({ message: "Error streaming video", success: false });
  }
};