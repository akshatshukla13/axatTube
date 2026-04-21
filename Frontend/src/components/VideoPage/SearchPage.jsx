import React, { useState, useEffect } from "react";
import axios from "axios";
import API_BASE_URL from "@/config/api.config";
import { toast } from "react-toastify";

function SearchPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);

  const handleSearch = async (e) => {
    e.preventDefault();

    if (!searchQuery.trim()) {
      toast.error("Please enter a search query");
      return;
    }

    setIsLoading(true);
    setHasSearched(true);
    try {
      // Since backend doesn't have search endpoint, we fetch all videos and filter client-side
      const response = await axios.get(`${API_BASE_URL}/videos/`, {
        withCredentials: true,
      });

      const allVideos = response.data.data || [];
      const filtered = allVideos.filter((video) => {
        const query = searchQuery.toLowerCase();
        return (
          video.title.toLowerCase().includes(query) ||
          video.description.toLowerCase().includes(query) ||
          video.owner?.userName?.toLowerCase().includes(query) ||
          video.owner?.fullName?.toLowerCase().includes(query)
        );
      });

      setSearchResults(filtered);

      if (filtered.length === 0) {
        toast.info("No videos found matching your search");
      }
    } catch (error) {
      toast.error("Failed to search videos");
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleVideoClick = (videoId) => {
    window.location.href = `/watch/${videoId}`;
  };

  return (
    <div className="h-screen overflow-y-auto bg-[#121212] text-white">
      <div className="flex min-h-[calc(100vh-66px)] sm:min-h-[calc(100vh-82px)]">
        <section className="w-full pb-[70px] sm:ml-[70px] sm:pb-0">
          <div className="w-full p-4">
            {/* Search Form */}
            <form onSubmit={handleSearch} className="mb-6">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search videos, channels..."
                  className="flex-1 rounded-lg border border-gray-600 bg-transparent px-4 py-3 outline-none focus:border-[#ae7aff]"
                />
                <button
                  type="submit"
                  disabled={isLoading}
                  className="rounded-lg bg-[#ae7aff] px-6 py-3 font-semibold text-black transition hover:bg-[#9d68d4] disabled:opacity-50"
                >
                  {isLoading ? "Searching..." : "Search"}
                </button>
              </div>
            </form>

            {/* Results */}
            {hasSearched && searchResults.length > 0 && (
              <div>
                <h2 className="mb-4 text-xl font-bold">
                  Found {searchResults.length} result{searchResults.length !== 1 ? "s" : ""}
                </h2>
                <div className="grid gap-4 sm:grid-cols-[repeat(auto-fill,minmax(300px,1fr))]">
                  {searchResults.map((video) => (
                    <div
                      key={video._id}
                      onClick={() => handleVideoClick(video._id)}
                      className="group cursor-pointer rounded-lg border border-gray-700 overflow-hidden transition hover:border-[#ae7aff]"
                    >
                      {/* Thumbnail */}
                      <div className="relative mb-2 w-full pt-[56%]">
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
                        <h3 className="mb-2 font-semibold line-clamp-2">{video.title}</h3>

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

                        <div className="flex items-center justify-between text-xs text-gray-400">
                          <span>{video.views || 0} Views</span>
                          <span>
                            {new Date(video.createdAt).toLocaleDateString()}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* No Results */}
            {hasSearched && searchResults.length === 0 && (
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
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
                <h3 className="mb-2 text-xl font-semibold">No results found</h3>
                <p className="text-gray-400">Try searching with different keywords</p>
              </div>
            )}

            {/* Initial State */}
            {!hasSearched && (
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
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
                <h3 className="mb-2 text-xl font-semibold">Search for videos</h3>
                <p className="text-gray-400">Find videos by title, description, or channel</p>
              </div>
            )}
          </div>
        </section>
      </div>
    </div>
  );
}

export default SearchPage;
