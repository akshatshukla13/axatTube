import React, { useEffect, useState } from "react";
import axios from "axios";
import API_BASE_URL from "@/config/api.config";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

function WatchHistoryPage() {
  const [history, setHistory] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchWatchHistory = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/users/history`, {
          withCredentials: true,
        });

        if (response.data.data) {
          setHistory(response.data.data);
        }
      } catch (error) {
        toast.error("Failed to load watch history");
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchWatchHistory();
  }, []);

  const handleClearHistory = async () => {
    if (!window.confirm("Are you sure you want to clear your watch history?")) {
      return;
    }

    try {
      setHistory([]);
      toast.success("Watch history cleared");
    } catch (error) {
      toast.error("Failed to clear history");
      console.error(error);
    }
  };

  const handleRemoveFromHistory = (videoId) => {
    setHistory(history.filter((video) => video._id !== videoId));
  };

  const handleVideoClick = (videoId) => {
    navigate(`/watch/${videoId}`);
  };

  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center bg-[#121212]">
        <div className="text-white">
          <div className="mb-4 h-12 w-12 animate-spin rounded-full border-4 border-gray-600 border-t-[#ae7aff]"></div>
          <p>Loading watch history...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="h-screen overflow-y-auto bg-[#121212] text-white">
      <div className="flex min-h-[calc(100vh-66px)] sm:min-h-[calc(100vh-82px)]">
        <section className="w-full pb-[70px] sm:ml-[70px] sm:pb-0">
          <div className="w-full p-4">
            {/* Header */}
            <div className="mb-6 flex items-center justify-between">
              <h1 className="text-3xl font-bold">Watch History</h1>
              {history.length > 0 && (
                <button
                  onClick={handleClearHistory}
                  className="rounded-lg bg-red-600 px-4 py-2 font-semibold transition hover:bg-red-700"
                >
                  Clear History
                </button>
              )}
            </div>

            {/* Results */}
            {history.length > 0 ? (
              <div className="grid gap-4 sm:grid-cols-[repeat(auto-fill,minmax(300px,1fr))]">
                {history.map((video) => (
                  <div
                    key={video._id}
                    className="group rounded-lg border border-gray-700 overflow-hidden transition hover:border-[#ae7aff]"
                  >
                    {/* Thumbnail */}
                    <div
                      onClick={() => handleVideoClick(video._id)}
                      className="relative mb-2 w-full cursor-pointer pt-[56%]"
                    >
                      <div className="absolute inset-0">
                        <img
                          src={video.thumbnail}
                          alt={video.title}
                          className="h-full w-full object-cover transition group-hover:brightness-75"
                        />
                        <div className="absolute inset-0 flex items-center justify-center opacity-0 transition group-hover:opacity-100">
                          <svg
                            className="h-16 w-16 text-[#ae7aff]"
                            fill="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path d="M8 5v14l11-7z" />
                          </svg>
                        </div>
                      </div>
                    </div>

                    {/* Video Info */}
                    <div className="p-3">
                      <h3
                        onClick={() => handleVideoClick(video._id)}
                        className="mb-2 cursor-pointer font-semibold line-clamp-2 transition hover:text-[#ae7aff]"
                      >
                        {video.title}
                      </h3>

                      {video.owner && (
                        <div className="mb-2 flex items-center gap-2">
                          {video.owner.avatar && (
                            <img
                              src={video.owner.avatar}
                              alt={video.owner.userName}
                              className="h-6 w-6 rounded-full"
                            />
                          )}
                          <span className="text-sm text-gray-400">
                            {video.owner.fullName}
                          </span>
                        </div>
                      )}

                      <div className="mb-3 flex items-center justify-between text-xs text-gray-400">
                        <span>{video.views || 0} Views</span>
                        <span>
                          {new Date(video.createdAt).toLocaleDateString()}
                        </span>
                      </div>

                      <button
                        onClick={() => handleRemoveFromHistory(video._id)}
                        className="w-full rounded-lg bg-red-600/20 px-2 py-1 text-xs text-red-400 transition hover:bg-red-600/40"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="flex h-96 flex-col items-center justify-center">
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
                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <h3 className="mb-2 text-xl font-semibold">No watch history</h3>
                <p className="text-gray-400">Videos you watch will appear here</p>
              </div>
            )}
          </div>
        </section>
      </div>
    </div>
  );
}

export default WatchHistoryPage;
