

import React, { useEffect, useState } from "react";
import axios from "axios";

const YouTubeSection = () => {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const response = await axios.post("http://localhost:5000/api/youtube/farming-videos", {
          query: "farming",
          language: "en",
        });
        setVideos(response.data.videos);
      } catch (error) {
        console.error("Error fetching videos:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchVideos();
  }, []);

  return (
    <section className="py-16 px-8 bg-white text-center">
      <h2 className="text-3xl font-bold text-green-700">Latest Farming Videos</h2>
      <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
        {loading ? (
          <p>Loading videos...</p>
        ) : videos.length > 0 ? (
          videos.map((video) => (
            <iframe
              key={video.videoId}
              className="w-full h-56"
              src={`https://www.youtube.com/embed/${video.videoId}`}
              title={video.title}
              allowFullScreen
            ></iframe>
          ))
        ) : (
          <p>No videos found.</p>
        )}
      </div>
    </section>
  );
};

export default YouTubeSection;