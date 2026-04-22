import React, { useMemo, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function ChannelSubscribedPage() {
  const subscribers = useSelector((state) => state.channel.channelSubscribersData)
  const [searchText, setSearchText] = useState("");
  const navigate = useNavigate();

  const filteredSubscribers = useMemo(() => {
    if (!subscribers) return [];
    return subscribers.filter((sub) => {
      const fullName = sub.fullName || "";
      const userName = sub.username || "";
      const text = searchText.toLowerCase();
      return (
        fullName.toLowerCase().includes(text) ||
        userName.toLowerCase().includes(text)
      );
    });
  }, [searchText, subscribers]);

  return (
    <>
      <div class="flex flex-col gap-y-4 py-4">
        <div class="relative mb-2 rounded-lg bg-white py-2 pl-8 pr-3 text-black">
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
            placeholder="Search subscribers"
          />
        </div>

        {filteredSubscribers.length > 0 ? (
          filteredSubscribers.map((subscriber) => (
            <div 
              key={subscriber._id} 
              class="flex w-full justify-between rounded border border-gray-700 p-2 cursor-pointer hover:bg-gray-800 transition"
              onClick={() => navigate(`/channel/${subscriber.username}`)}
            >
              <div class="flex items-center gap-x-2">
                <div class="h-14 w-14 shrink-0">
                  <img
                    src={subscriber.avatar}
                    alt={subscriber.fullName || "subscriber"}
                    class="h-full w-full rounded-full"
                  />
                </div>
                <div class="block">
                  <h6 class="font-semibold">{subscriber.fullName}</h6>
                  <p class="text-sm text-gray-300">@{subscriber.username}</p>
                  <p class="text-sm text-gray-400">{subscriber.subcriberCount || 0} Subscribers</p>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="py-6 text-sm text-gray-400">
            {searchText ? "No matching subscribers found." : "No subscribers yet."}
          </p>
        )}
      </div>
    </>
  )
}

export default ChannelSubscribedPage;
