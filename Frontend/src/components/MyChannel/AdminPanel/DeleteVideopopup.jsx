import React, { useState } from "react";
import axios from "axios";
import API_BASE_URL from "@/config/api.config";
import { toast } from "react-toastify";

function DeleteVideopopup({ isOpen, video, onClose, onDeleted }) {
  const [isDeleting, setIsDeleting] = useState(false);

  if (!isOpen || !video) return null;

  const handleDelete = async () => {
    setIsDeleting(true);
    try {
      await axios.delete(`${API_BASE_URL}/videos/${video._id}`, {
        withCredentials: true,
      });
      toast.success("Video deleted");
      onDeleted?.(video._id);
      onClose?.();
    } catch (error) {
      toast.error(error?.response?.data?.message || "Failed to delete video");
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4">
      <div className="w-full max-w-md rounded-lg border border-gray-700 bg-[#121212] p-4 text-white">
        <h3 className="mb-2 text-lg font-semibold">Delete Video</h3>
        <p className="mb-4 text-sm text-gray-300">
          Are you sure you want to delete this video: {video.title}?
        </p>
        <div className="flex gap-3">
          <button
            onClick={handleDelete}
            disabled={isDeleting}
            className="rounded bg-red-600 px-4 py-2 font-semibold text-white disabled:opacity-60"
          >
            {isDeleting ? "Deleting..." : "Delete"}
          </button>
          <button onClick={onClose} className="rounded border border-gray-600 px-4 py-2">
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}

export default DeleteVideopopup;
