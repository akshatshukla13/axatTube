import React, { useState } from "react";
import axios from "axios";
import API_BASE_URL from "@/config/api.config";
import { toast } from "react-toastify";
import { validatePlaylistName, validateDescription } from "@/utils/validation";

function PlaylistModal({ isOpen, onClose, onPlaylistCreated }) {
  const [playlistName, setPlaylistName] = useState("");
  const [playlistDescription, setPlaylistDescription] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleCreatePlaylist = async (e) => {
    e.preventDefault();

    if (!validatePlaylistName(playlistName)) {
      toast.error("Playlist name must be between 2-50 characters");
      return;
    }

    if (!playlistDescription.trim()) {
      toast.error("Please add a description for the playlist");
      return;
    }

    setIsLoading(true);
    try {
      const response = await axios.post(
        `${API_BASE_URL}/playlist/`,
        {
          name: playlistName,
          description: playlistDescription,
        },
        { withCredentials: true }
      );

      if (response.status === 201 || response.status === 200) {
        toast.success("Playlist created successfully!");
        setPlaylistName("");
        setPlaylistDescription("");
        onPlaylistCreated();
        onClose();
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to create playlist");
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="w-full max-w-md rounded-lg bg-[#1a1a1a] p-6 text-white">
        <h2 className="mb-4 text-2xl font-bold">Create New Playlist</h2>

        <form onSubmit={handleCreatePlaylist}>
          <div className="mb-4">
            <label htmlFor="playlistName" className="mb-2 block text-sm font-semibold">
              Playlist Name <span className="text-red-500">*</span>
            </label>
            <input
              id="playlistName"
              type="text"
              value={playlistName}
              onChange={(e) => setPlaylistName(e.target.value)}
              placeholder="Enter playlist name"
              maxLength="50"
              className="w-full rounded-lg border border-gray-600 bg-transparent px-3 py-2 outline-none focus:border-[#ae7aff]"
            />
            <p className="mt-1 text-xs text-gray-400">{playlistName.length}/50</p>
          </div>

          <div className="mb-6">
            <label htmlFor="playlistDescription" className="mb-2 block text-sm font-semibold">
              Description <span className="text-red-500">*</span>
            </label>
            <textarea
              id="playlistDescription"
              value={playlistDescription}
              onChange={(e) => setPlaylistDescription(e.target.value)}
              placeholder="Enter playlist description"
              rows="4"
              className="w-full rounded-lg border border-gray-600 bg-transparent px-3 py-2 outline-none focus:border-[#ae7aff]"
            />
            <p className="mt-1 text-xs text-gray-400">{playlistDescription.length}/500</p>
          </div>

          <div className="flex gap-2">
            <button
              type="submit"
              disabled={isLoading}
              className="flex-1 rounded-lg bg-[#ae7aff] px-4 py-2 font-semibold text-black transition hover:bg-[#9d68d4] disabled:opacity-50"
            >
              {isLoading ? "Creating..." : "Create Playlist"}
            </button>
            <button
              type="button"
              onClick={onClose}
              className="flex-1 rounded-lg border border-gray-600 px-4 py-2 font-semibold transition hover:bg-white/10"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default PlaylistModal;
