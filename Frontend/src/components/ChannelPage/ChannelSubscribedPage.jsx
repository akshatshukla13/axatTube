import React, { useMemo, useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import API_BASE_URL from "@/config/api.config";
import { toast } from "react-toastify";

function ChannelSubscribedPage() {
  const subscribedChannels = useSelector((state) => state.channel.channelSubscribedData)
  const [searchText, setSearchText] = useState("");

  const filteredChannels = useMemo(() => {
    if (!subscribedChannels) return [];
    return subscribedChannels.filter((subs) => {
      const fullName = subs.fullName || "";
      const userName = subs.userName || subs.username || "";
      const text = searchText.toLowerCase();
      return (
        fullName.toLowerCase().includes(text) ||
        userName.toLowerCase().includes(text)
      );
    });
  }, [searchText, subscribedChannels]);

  const handleToggleSubscribe = async (channelId) => {
    try {
      const response = await axios.post(
        `${API_BASE_URL}/subscribe/u/${channelId}`,
        {},
        { withCredentials: true },
      );
      toast.success(response?.data?.message || "Subscription updated");
    } catch (error) {
      toast.error(error?.response?.data?.message || "Failed to update subscription");
    }
  };

  return (
    <>

      <div class="flex flex-col gap-y-4 py-4">
        <div class=" relative mb-2 rounded-lg bg-white py-2 pl-8 pr-3 text-black">
          <span class="absolute left-2 top-1/2 -translate-y-1/2 text-gray-400">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="2"
              stroke="currentColor"
              aria-hidden="true"
              class="h-5 w-5"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
              ></path>
            </svg>
          </span>
          <input
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            class="w-full bg-transparent outline-none"
            placeholder="Search"
          />
        </div>

        {filteredChannels.length > 0 ? (
          filteredChannels.map((subs) => (
            <div key={subs._id} class="flex w-full justify-between rounded border border-gray-700 p-2">
              <div class="flex items-center gap-x-2">
                <div class="h-14 w-14 shrink-0">
                  <img
                    src={subs.avatar}
                    alt={subs.fullName || "subscriber"}
                    class="h-full w-full rounded-full"
                  />
                </div>
                <div class="block">
                  <h6 class="font-semibold">{subs.fullName}</h6>
                  <p class="text-sm text-gray-300">{subs.subcriberCount || 0} Subscribers</p>
                </div>
              </div>
              <div class="block">
                <button
                  onClick={() => handleToggleSubscribe(subs._id)}
                  class="group/btn px-3 py-2 text-black bg-[#ae7aff]"
                >
                  {subs.isSubscribed ? "Unsubscribe" : "Subscribe"}
                </button>
              </div>
            </div>))
        ) : (
          <p className="py-6 text-sm text-gray-400">
            {searchText ? "No matching channels found." : "No subscribed channels found."}
          </p>
        )}


      </div>
    </>
  )
}

export default ChannelSubscribedPage;
