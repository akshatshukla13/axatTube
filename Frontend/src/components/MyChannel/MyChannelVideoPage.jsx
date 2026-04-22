import React from 'react'
import { useSelector } from 'react-redux';

function MyChannelVideoPage() {

  const channelVideos = useSelector((state) => state.myChannel.myChannelVideosData);


  return (
    <>
      {channelVideos && channelVideos.length > 0 ? (

        <div class="grid grid-cols-[repeat(auto-fit,_minmax(300px,_1fr))] gap-4 pt-2">
          {channelVideos.map((video) => (
            <div key={video._id} class="w-full">
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
      ) : (
        <p className="pt-6 text-sm text-gray-400">No videos uploaded yet.</p>
      )}
    </>
  )
}

export default MyChannelVideoPage
