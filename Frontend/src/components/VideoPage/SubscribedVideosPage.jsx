import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import API_BASE_URL from "@/config/api.config";
import { toast } from "react-toastify";

function SubscribedVideosPage() {
  const navigate = useNavigate();
  const [subscribedVideos, setSubscribedVideos] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchSubscribedVideos();
  }, []);

  const fetchSubscribedVideos = async () => {
    setIsLoading(true);
    setError(null);
    try {
      // Fetch videos from subscribed channels using the backend endpoint
      const response = await axios.get(
        `${API_BASE_URL}/subscribe/videos`,
        { withCredentials: true }
      );
      
      const videos = response.data.data || [];
      setSubscribedVideos(videos);
    } catch (err) {
      console.error("Failed to fetch subscribed videos:", err);
      setError("Failed to load videos from subscribed channels");
      toast.error("Failed to load subscribed videos");
    } finally {
      setIsLoading(false);
    }
  };

  const handleVideoClick = (videoId) => {
    navigate(`/video/${videoId}`);
  };

  return (
    <section className="bg-[#121212] text-white w-full pb-[70px] sm:ml-[70px] sm:pb-0 lg:ml-0 min-h-screen">
      <div className="p-4">
        <h2 className="mb-6 text-2xl font-bold">Videos from Subscribed Channels</h2>

        {isLoading ? (
          <div className="flex justify-center items-center h-96">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-[#ae7aff]"></div>
          </div>
        ) : error ? (
          <div className="flex items-center justify-center h-96">
            <p className="text-red-400">{error}</p>
          </div>
        ) : subscribedVideos.length > 0 ? (
          <div className="grid grid-cols-[repeat(auto-fit,_minmax(300px,_1fr))] gap-4">
            {subscribedVideos.map((video) => (
              <div
                key={video._id}
                onClick={() => handleVideoClick(video._id)}
                className="w-full cursor-pointer hover:opacity-80 transition-opacity"
              >
                {/* Thumbnail */}
                <div className="relative mb-2 w-full pt-[56%]">
                  <div className="absolute inset-0">
                    <img
                      src={video.thumbnail}
                      alt={video.title}
                      className="h-full w-full object-cover rounded"
                    />
                  </div>
                  <span className="absolute bottom-1 right-1 inline-block rounded bg-black px-1.5 text-sm">
                    {video.duration || "0:00"}
                  </span>
                </div>

                {/* Video Info */}
                <div className="flex gap-x-2">
                  <div className="h-9 w-9 shrink-0">
                    <img
                      src={video.owner.avatar}
                      alt={video.owner.userName}
                      className="h-full w-full rounded-full"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h6 className="font-semibold text-sm line-clamp-2">
                      {video.title}
                    </h6>
                    <p className="text-xs text-gray-400 mt-1">
                      {video.owner.userName}
                    </p>
                    <p className="text-xs text-gray-400">
                      {video.views || 0} Views · {video.createdAt}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center h-96">
            <svg
              className="mb-4 h-20 w-20 text-gray-600"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"
              />
            </svg>
            <h3 className="text-xl font-semibold">No videos yet</h3>
            <p className="text-gray-400 mt-2">
              Subscribe to channels to see their latest videos here
            </p>
          </div>
        )}
      </div>
    </section>
  );
}

export default SubscribedVideosPage;
