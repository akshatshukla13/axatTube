import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import API_BASE_URL from "@/config/api.config";
import { toast } from "react-toastify";

function SubscribedVideosPage() {
  const navigate = useNavigate();
  const [subscribedChannels, setSubscribedChannels] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchSubscribedChannels();
  }, []);

  const fetchSubscribedChannels = async () => {
    setIsLoading(true);
    setError(null);
    try {
      // Get current user first to get their username/id
      const userResponse = await axios.get(
        `${API_BASE_URL}/users/current-user/`,
        { withCredentials: true }
      );

      if (!userResponse.data?.data?._id) {
        setError("Could not fetch user information");
        toast.error("Could not fetch user information");
        return;
      }

      // Fetch subscribed channels for the current user
      const response = await axios.get(
        `${API_BASE_URL}/subscribe/c/${userResponse.data.data._id}`,
        { withCredentials: true }
      );
      
      const channels = response.data.data || [];
      setSubscribedChannels(channels);
    } catch (err) {
      console.error("Failed to fetch subscribed channels:", err);
      setError("Failed to load subscribed channels");
      toast.error("Failed to load subscribed channels");
    } finally {
      setIsLoading(false);
    }
  };

  const handleChannelClick = (username) => {
    navigate(`/channel/${username}`);
  };

  return (
    <section className="bg-[#121212] text-white w-full pb-[70px] sm:ml-[70px] sm:pb-0 lg:ml-0 min-h-screen">
      <div className="p-4">
        <h2 className="mb-6 text-2xl font-bold">Subscribed Channels</h2>

        {isLoading ? (
          <div className="flex justify-center items-center h-96">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-[#ae7aff]"></div>
          </div>
        ) : error ? (
          <div className="flex items-center justify-center h-96">
            <p className="text-red-400">{error}</p>
          </div>
        ) : subscribedChannels.length > 0 ? (
          <div className="grid grid-cols-[repeat(auto-fit,_minmax(250px,_1fr))] gap-4">
            {subscribedChannels.map((channel) => (
              <div
                key={channel._id}
                onClick={() => handleChannelClick(channel.userName)}
                className="w-full cursor-pointer hover:bg-gray-900 transition-colors rounded-lg overflow-hidden border border-gray-700"
              >
                {/* Channel Avatar */}
                <div className="flex flex-col items-center p-6">
                  <div className="h-20 w-20 mb-4 rounded-full overflow-hidden">
                    <img
                      src={channel.avatar}
                      alt={channel.fullName}
                      className="h-full w-full object-cover"
                    />
                  </div>
                  
                  {/* Channel Info */}
                  <h3 className="text-lg font-semibold text-center truncate">
                    {channel.fullName}
                  </h3>
                  <p className="text-sm text-gray-400 text-center">
                    @{channel.userName}
                  </p>
                  <p className="text-sm text-gray-400 mt-2">
                    {channel.subscribersCount || 0} Subscribers
                  </p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center h-96">
            <svg
              className="mb-4 h-16 w-16 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
              />
            </svg>
            <h3 className="text-xl font-semibold">No subscriptions yet</h3>
            <p className="text-gray-400 mt-2">
              Subscribe to channels to see them here
            </p>
          </div>
        )}
      </div>
    </section>
  );
}

export default SubscribedVideosPage;
