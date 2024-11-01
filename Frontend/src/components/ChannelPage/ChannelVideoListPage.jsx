import React from "react";
import ChannelPlayListVideosPage from "./ChannelPlayListVideosPage";
import ChannelTweetPage from "./ChannelTweetPage";
import ChannelSubscribedPage from "./ChannelSubscribedPage";
import { useSelector } from "react-redux";

function ChannelVideoListPage() {
  const channelVideos = useSelector((state) => state.channel.channelVideosData);


  return (
    <>
      {channelVideos ? (

        <div class="grid grid-cols-[repeat(auto-fit,_minmax(300px,_1fr))] gap-4 pt-2">
          {channelVideos.map((video) => (
            <div class="w-full">
              <div class="relative mb-2 w-full pt-[56%]">
                <div class="absolute inset-0">
                  <img
                    src={video.thumbnail}
                    alt="JavaScript Fundamentals: Variables and Data Types"
                    class="h-full w-full"
                  />
                </div>
                <span class="absolute bottom-1 right-1 inline-block rounded bg-black px-1.5 text-sm">
                  {video.duration}
                </span>
              </div>
              <h6 class="mb-1 font-semibold">
                {video.title}
              </h6>
              <p class="flex text-sm text-gray-200">
                {video.views} Views · {video.createdAt} ago
              </p>
            </div>
          ))}
        </div>
      ) : null}
    </>
  )
}

export default ChannelVideoListPage;
