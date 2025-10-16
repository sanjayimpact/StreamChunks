"use client";
import { useState, useRef } from "react";
import { motion } from "framer-motion";
import axios from "axios";

export default function UploadPage() {
  const [file, setFile] = useState(null);
  const [progress, setProgress] = useState(0);
  const inputRef = useRef(null);

  const handleDrop = (e) => {
    e.preventDefault();
    const droppedFile = e.dataTransfer.files[0];
    if (droppedFile && droppedFile.type.startsWith("video/")) {
      setFile(droppedFile);
      simulateUpload();
    }
  };

  const handleFileSelect = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile && selectedFile.type.startsWith("video/")) {
       savevideo(selectedFile);
      setFile(selectedFile);
      simulateUpload();
    }
  };
  const savevideo = async(videoFile)=>{
    try{ 
       const formData = new FormData();
       formData.append("video", videoFile);
       let res = await axios.post("http://localhost:4000/api/addprofile",formData);

    }catch(err){
      console.log(err);
    }
  }

  const simulateUpload = () => {
    setProgress(0);
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 5;
      });
    }, 200);
  };

  return (
    <div className="relative flex items-center justify-center min-h-screen overflow-hidden bg-gradient-to-br from-[#0f0c29] via-[#302b63] to-[#24243e] text-white p-6">
      {/* Animated background circles */}
      <motion.div
        className="absolute w-[600px] h-[600px] bg-pink-500/30 rounded-full blur-[180px]"
        animate={{ x: [0, 100, -100, 0], y: [0, 50, -50, 0] }}
        transition={{ repeat: Infinity, duration: 20, ease: "linear" }}
      />
      <motion.div
        className="absolute w-[500px] h-[500px] bg-indigo-500/20 rounded-full blur-[150px]"
        animate={{ x: [100, -50, 50, 100], y: [50, -100, 100, 50] }}
        transition={{ repeat: Infinity, duration: 25, ease: "linear" }}
      />

      {/* Upload card */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9, rotateY: -10 }}
        animate={{ opacity: 1, scale: 1, rotateY: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        whileHover={{ scale: 1.03, rotateY: 3 }}
        className="z-10 w-full max-w-md bg-white/10 backdrop-blur-2xl border border-white/20 shadow-2xl rounded-3xl p-8 text-center relative"
        onDrop={handleDrop}
        onDragOver={(e) => e.preventDefault()}
      >
        {/* Glowing border gradient */}
        <div className="absolute inset-0 rounded-3xl p-[2px] bg-gradient-to-tr from-pink-500 via-yellow-400 to-purple-600 blur-[2px] opacity-70"></div>

        <div className="relative z-10">
          <h1 className="text-4xl font-extrabold mb-6 bg-gradient-to-r from-pink-400 via-yellow-300 to-purple-400 bg-clip-text text-transparent animate-gradient">
            🎬 Upload Your Video
          </h1>

          <motion.div
            whileHover={{ scale: 1.02 }}
            onClick={() => inputRef.current.click()}
            className="cursor-pointer border-2 border-dashed border-white/40 rounded-2xl py-16 px-6 text-lg font-medium transition hover:bg-white/10 hover:border-pink-300"
          >
            {file ? (
              <p>
                <span className="text-pink-300">{file.name}</span> <br />
                ({Math.round(file.size / 1024 / 1024)} MB)
              </p>
            ) : (
              <p>
                Drag & drop your video here <br />
                or{" "}
                <span className="text-yellow-300 underline underline-offset-4">
                  click to browse
                </span>
              </p>
            )}
            <input
              type="file"
              accept="video/*"
              hidden
              ref={inputRef}
              onChange={handleFileSelect}
            />
          </motion.div>

          {file && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-8"
            >
              <div className="h-3 bg-white/20 rounded-full overflow-hidden shadow-inner">
                <motion.div
                  className="h-3 bg-gradient-to-r from-yellow-400 via-pink-400 to-purple-500 rounded-full"
                  style={{ width: `${progress}%` }}
                  transition={{ ease: "easeOut", duration: 0.3 }}
                />
              </div>
              <p className="mt-3 text-sm text-gray-200">
                {progress < 100
                  ? `Uploading... ${progress}%`
                  : "Upload Complete!"}
              </p>
            </motion.div>
          )}
        </div>
      </motion.div>
    </div>
  );
}
