import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import PlaylistModal from './PlaylistModal';

function MyChannelPlaylistPage() {

  const dispatch = useDispatch();
  const [isPlaylistModalOpen, setIsPlaylistModalOpen] = useState(false);
  const channelPlaylists = useSelector((state) => state.myChannel.myChannelPlaylistData);

  const handlePlaylistCreated = () => {
    // Refresh playlist data here if needed
  };

  return (
    <>
      <PlaylistModal 
        isOpen={isPlaylistModalOpen}
        onClose={() => setIsPlaylistModalOpen(false)}
        onPlaylistCreated={handlePlaylistCreated}
      />
      
      <div className="w-full">
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-2xl font-bold">My Playlists</h2>
          <button
            onClick={() => setIsPlaylistModalOpen(true)}
            className="rounded-lg bg-[#ae7aff] px-4 py-2 font-semibold text-black transition hover:bg-[#9d68d4]"
          >
            Create Playlist
          </button>
        </div>

        {channelPlaylists && channelPlaylists.length > 0 ? (
          <div className="border border-red-500 grid gap-4 pt-2 sm:grid-cols-[repeat(auto-fit,_minmax(400px,_1fr))]">

            {channelPlaylists.map((playlist) => (
              <div className="w-full" key={playlist._id}>
                <div className="relative mb-2 w-full pt-[56%]">
                  <div className="absolute inset-0">
                    <img
                      // src={}
                      alt="thumbnail"
                      className="h-full w-full"
                    />
                    <div className="absolute inset-x-0 bottom-0">
                      <div className="relative border-t bg-white/30 p-4 text-white backdrop-blur-sm before:absolute before:inset-0 before:bg-black/40">
                        <div className="relative z-[1]">
                          <p className="flex justify-between">
                            <span className="inline-block">Playlist</span>
                            <span className="inline-block">{playlist.videos.length} videos</span>
                          </p>
                          <p className="text-sm text-gray-200">
                            100K Views · {playlist.createdAt} ago
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <h6 className="mb-1 font-semibold">{playlist.name}</h6>
                <p className="flex text-sm text-gray-200">
                  {playlist.description}
                </p>
              </div>
            ))}
          </div>
        ) : (
          <div className="flex h-96 flex-col items-center justify-center rounded-lg border border-gray-700">
            <svg
              className="mb-4 h-16 w-16 text-gray-600"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <p className="mb-4 text-gray-400">No playlists yet</p>
            <button
              onClick={() => setIsPlaylistModalOpen(true)}
              className="rounded-lg bg-[#ae7aff] px-4 py-2 font-semibold text-black transition hover:bg-[#9d68d4]"
            >
              Create Your First Playlist
            </button>
          </div>
        )}
      </div>
    </>
  )
}

export default MyChannelPlaylistPage
