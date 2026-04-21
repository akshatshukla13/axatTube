import React, { useState } from "react";
import axios from "axios";
import API_BASE_URL from "@/config/api.config";
import { toast } from "react-toastify";

function CommentActionsModal({ isOpen, onClose, comment, onCommentUpdated, onCommentDeleted }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedContent, setEditedContent] = useState(comment?.content || "");
  const [isLoading, setIsLoading] = useState(false);

  const handleEditComment = async () => {
    if (!editedContent.trim()) {
      toast.error("Comment cannot be empty");
      return;
    }

    if (editedContent === comment.content) {
      toast.info("No changes made");
      setIsEditing(false);
      return;
    }

    setIsLoading(true);
    try {
      const response = await axios.patch(
        `${API_BASE_URL}/comment/c/${comment._id}`,
        { content: editedContent },
        { withCredentials: true }
      );

      if (response.status === 200) {
        toast.success("Comment updated successfully!");
        onCommentUpdated();
        setIsEditing(false);
        onClose();
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to update comment");
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteComment = async () => {
    if (!window.confirm("Are you sure you want to delete this comment?")) {
      return;
    }

    setIsLoading(true);
    try {
      const response = await axios.delete(
        `${API_BASE_URL}/comment/c/${comment._id}`,
        { withCredentials: true }
      );

      if (response.status === 200) {
        toast.success("Comment deleted successfully!");
        onCommentDeleted();
        onClose();
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to delete comment");
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen || !comment) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="w-full max-w-md rounded-lg bg-[#1a1a1a] p-6 text-white">
        <h2 className="mb-4 text-2xl font-bold">
          {isEditing ? "Edit Comment" : "Comment Actions"}
        </h2>

        {isEditing ? (
          <form onSubmit={(e) => { e.preventDefault(); handleEditComment(); }}>
            <div className="mb-4">
              <label htmlFor="editComment" className="mb-2 block text-sm font-semibold">
                Edit your comment
              </label>
              <textarea
                id="editComment"
                value={editedContent}
                onChange={(e) => setEditedContent(e.target.value)}
                rows="4"
                maxLength="500"
                className="w-full rounded-lg border border-gray-600 bg-transparent px-3 py-2 outline-none focus:border-[#ae7aff]"
              />
              <p className="mt-1 text-xs text-gray-400">{editedContent.length}/500</p>
            </div>

            <div className="flex gap-2">
              <button
                type="submit"
                disabled={isLoading}
                className="flex-1 rounded-lg bg-[#ae7aff] px-4 py-2 font-semibold text-black transition hover:bg-[#9d68d4] disabled:opacity-50"
              >
                {isLoading ? "Updating..." : "Update Comment"}
              </button>
              <button
                type="button"
                onClick={() => {
                  setIsEditing(false);
                  setEditedContent(comment.content);
                }}
                className="flex-1 rounded-lg border border-gray-600 px-4 py-2 font-semibold transition hover:bg-white/10"
              >
                Cancel
              </button>
            </div>
          </form>
        ) : (
          <>
            <div className="mb-4 rounded-lg border border-gray-600 p-4">
              <p className="text-sm">{comment.content}</p>
            </div>

            <div className="flex gap-2">
              <button
                onClick={() => setIsEditing(true)}
                disabled={isLoading}
                className="flex-1 rounded-lg bg-blue-600 px-4 py-2 font-semibold transition hover:bg-blue-700 disabled:opacity-50"
              >
                Edit
              </button>
              <button
                onClick={handleDeleteComment}
                disabled={isLoading}
                className="flex-1 rounded-lg bg-red-600 px-4 py-2 font-semibold transition hover:bg-red-700 disabled:opacity-50"
              >
                {isLoading ? "Deleting..." : "Delete"}
              </button>
              <button
                onClick={onClose}
                className="flex-1 rounded-lg border border-gray-600 px-4 py-2 font-semibold transition hover:bg-white/10"
              >
                Close
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default CommentActionsModal;
