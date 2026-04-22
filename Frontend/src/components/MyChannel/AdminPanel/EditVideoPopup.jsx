import React, { useEffect, useState } from "react";
import axios from "axios";
import API_BASE_URL from "@/config/api.config";
import { toast } from "react-toastify";

function EditVideoPopup({ isOpen, video, onClose, onSaved }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [thumbnail, setThumbnail] = useState(null);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    setTitle(video?.title || "");
    setDescription(video?.discription || "");
    setThumbnail(null);
  }, [video]);

  if (!isOpen || !video) return null;

  const handleSave = async () => {
    if (!title.trim() && !description.trim() && !thumbnail) {
      toast.error("Please change at least one field.");
      return;
    }

    setIsSaving(true);
    try {
      const formData = new FormData();
      if (title.trim()) formData.append("title", title.trim());
      if (description.trim()) formData.append("description", description.trim());
      if (thumbnail) formData.append("thumbnail", thumbnail);

      const response = await axios.patch(
        `${API_BASE_URL}/videos/${video._id}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          withCredentials: true,
        },
      );

      toast.success("Video updated successfully");
      onSaved?.(response.data?.data);
      onClose?.();
    } catch (error) {
      toast.error(error?.response?.data?.message || "Failed to update video");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4">
      <div className="w-full max-w-lg rounded-lg border border-gray-700 bg-[#121212] p-4 text-white">
        <h3 className="mb-4 text-xl font-semibold">Edit Video</h3>

        <div className="mb-3">
          <label className="mb-1 block text-sm text-gray-300">Title</label>
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full rounded border border-gray-600 bg-transparent px-3 py-2 outline-none"
          />
        </div>

        <div className="mb-3">
          <label className="mb-1 block text-sm text-gray-300">Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="h-28 w-full resize-none rounded border border-gray-600 bg-transparent px-3 py-2 outline-none"
          />
        </div>

        <div className="mb-4">
          <label className="mb-1 block text-sm text-gray-300">Thumbnail (optional)</label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setThumbnail(e.target.files?.[0] || null)}
            className="w-full rounded border border-gray-600 bg-transparent px-2 py-2"
          />
        </div>

        <div className="flex gap-3">
          <button
            onClick={handleSave}
            disabled={isSaving}
            className="rounded bg-[#ae7aff] px-4 py-2 font-semibold text-black disabled:opacity-60"
          >
            {isSaving ? "Saving..." : "Save"}
          </button>
          <button
            onClick={onClose}
            className="rounded border border-gray-600 px-4 py-2"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}

export default EditVideoPopup;
