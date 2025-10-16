"use client";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import axios from "axios";
export default function Page() {
  const [videos, setVideos] = useState([]);
  const [selectedVideo, setSelectedVideo] = useState(null);

  useEffect(() => {
    // Fetch from your backend (replace URL if needed)
    const fetchVideos = async () => {
      const res = await axios.get("http://localhost:4000/api/allvideos");
const {data} = res;

      setVideos(data.data);
    };
    fetchVideos();
  }, []);

  const  handleset = async(data)=>{
    console.log(data);
    setSelectedVideo(data);
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0f0c29] via-[#302b63] to-[#24243e] text-white p-10">
      {/* Header */}
      <div className="text-center mb-10">
        <h1 className="text-4xl font-extrabold bg-gradient-to-r from-pink-400 via-yellow-300 to-purple-400 bg-clip-text text-transparent animate-gradient">
          🎞️ Video Gallery
        </h1>
        <p className="text-gray-300 mt-2">Your uploaded videos with thumbnails</p>
      </div>

      {/* Video grid */}
      {videos.length === 0 ? (
        <p className="text-center text-gray-400">No videos found...</p>
      ) : (
        <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {videos.map((video) => (
            <motion.div
              key={video.id}
              className="relative group rounded-xl overflow-hidden shadow-lg hover:shadow-2xl border border-white/10 bg-white/10 backdrop-blur-lg cursor-pointer"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              onClick={() => handleset(video)}
            >
              {/* Thumbnail */}
              <div className="relative">
                <img
                  src={video.thumbnail}
                  alt={video.title}
                  className="w-full h-52 object-cover group-hover:opacity-40 transition duration-300"
                />
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition duration-300">
                  <motion.div
                    className="bg-pink-500/70 backdrop-blur-md px-4 py-2 rounded-full text-sm font-semibold"
                    whileHover={{ scale: 1.1 }}
                  >
                    ▶ Play
                  </motion.div>
                </div>
              </div>

              {/* Info */}
              <div className="p-4">
                <h3 className="text-lg font-semibold">{video.title}</h3>
                <p className="text-sm text-gray-400">Tap to view</p>
              </div>
            </motion.div>
          ))}
        </div>
      )}

      {/* Modal Player */}
      <AnimatePresence>
        {selectedVideo && (
          <motion.div
            className="fixed inset-0 bg-black/80 backdrop-blur-md flex items-center justify-center z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="relative w-[90%] max-w-3xl bg-white/10 rounded-2xl p-4 border border-white/20 shadow-2xl"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
            >
              <video
                src={`http://localhost:4000/api/stream?url=${selectedVideo.video}`}
                controls
                autoPlay
                className="w-full h-[60vh] rounded-lg object-contain bg-black"
              ></video>
              <div className="text-center mt-3">
                <h2 className="text-xl font-semibold">{selectedVideo.name}</h2>
              </div>

              {/* Close Button */}
              <button
                onClick={() => setSelectedVideo(null)}
                className="absolute top-2 right-2 bg-pink-500/80 text-white rounded-full px-3 py-1 hover:bg-pink-600 transition"
              >
                ✕
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
