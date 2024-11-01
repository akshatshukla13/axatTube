import React from 'react'
import { useSelector } from 'react-redux';

function ChannelPlayListPage() {
  const channelPlaylists = useSelector((state) => state.channel.channelPlaylistData);

  return (
    channelPlaylists ? (
      <>
        <div class="border border-red-500 grid gap-4 pt-2 sm:grid-cols-[repeat(auto-fit,_minmax(400px,_1fr))]">

          {channelPlaylists.map((playlist) => (
            <div class=" w-full">
              <div class="relative mb-2 w-full pt-[56%]">
                <div class="absolute inset-0">
                  <img
                    // src={}
                    alt="thumbnail"
                    class="h-full w-full"
                  />
                  <div class="absolute inset-x-0 bottom-0">
                    <div class="relative border-t bg-white/30 p-4 text-white backdrop-blur-sm before:absolute before:inset-0 before:bg-black/40">
                      <div class="relative z-[1]">
                        <p class="flex justify-between">
                          <span class="inline-block">Playlist</span>
                          <span class="inline-block">{playlist.videos.length} videos</span>
                        </p>
                        <p class="text-sm text-gray-200">
                          100K Views · {playlist.createdAt} ago
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <h6 class="mb-1 font-semibold">{playlist.name}</h6>
              <p class="flex text-sm text-gray-200">
                {playlist.description}
              </p>
            </div>
          ))}
        </div>
      </>
    ) : (<></>)
  )
}

export default ChannelPlayListPage
