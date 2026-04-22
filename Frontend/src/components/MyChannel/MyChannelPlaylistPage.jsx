import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import PlaylistModal from './PlaylistModal';
import { fetchMyChannelPlaylists } from '@/app/slices/myChannelSlice';
import { useParams } from 'react-router-dom';

function MyChannelPlaylistPage() {

  const dispatch = useDispatch();
  const { username } = useParams();
  const [isPlaylistModalOpen, setIsPlaylistModalOpen] = useState(false);
  const channelPlaylists = useSelector((state) => state.myChannel.myChannelPlaylistData);

  const handlePlaylistCreated = () => {
    dispatch(fetchMyChannelPlaylists({ username }));
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
            <>
              {channelPlaylists.map((playlist) => (
                <div key={playlist._id} className="w-full mb-4">
                <div className="relative mb-2 w-full pt-[56%]">
                  <div className="absolute inset-0">
                  <img
                    src={playlist?.videos?.[0]?.thumbnail || "https://images.pexels.com/photos/1174775/pexels-photo-1174775.jpeg"}
                    alt="thumbnail"
                      className="h-full w-full object-cover rounded-lg"
                  />
                    <div className="absolute inset-x-0 bottom-0">
                      <div className="relative border-t bg-white/30 p-4 text-white backdrop-blur-sm before:absolute before:inset-0 before:bg-black/40">
                        <div className="relative z-[1]">
                          <p className="flex justify-between">
                            <span className="inline-block">Playlist</span>
                            <span className="inline-block">{playlist?.videos?.length || 0} videos</span>
                        </p>
                          <p className="text-sm text-gray-200">
                          Created {new Date(playlist.createdAt).toLocaleDateString()}
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
            </>
          ) : (
            <div className="rounded-lg border border-gray-700 bg-gray-900/50 p-8 text-center">
              <p className="text-gray-400">No playlists yet. Create one to get started!</p>
            </div>
          )}
        </div>
      </>
    );
  }

export default MyChannelPlaylistPage;
