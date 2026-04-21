import React, { useState } from "react";
import axios from "axios";
import API_BASE_URL from "@/config/api.config";
import { toast } from "react-toastify";
import { validateTweet } from "@/utils/validation";

function TweetCreationModal({ isOpen, onClose, onTweetCreated }) {
  const [tweetContent, setTweetContent] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleCreateTweet = async (e) => {
    e.preventDefault();

    if (!validateTweet(tweetContent)) {
      toast.error("Tweet must be between 1-280 characters");
      return;
    }

    setIsLoading(true);
    try {
      const response = await axios.post(
        `${API_BASE_URL}/tweets/`,
        { content: tweetContent },
        { withCredentials: true }
      );

      if (response.status === 201 || response.status === 200) {
        toast.success("Tweet posted successfully!");
        setTweetContent("");
        onTweetCreated();
        onClose();
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to post tweet");
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="w-full max-w-md rounded-lg bg-[#1a1a1a] p-6 text-white">
        <h2 className="mb-4 text-2xl font-bold">What's on your mind?</h2>

        <form onSubmit={handleCreateTweet}>
          <div className="mb-4">
            <textarea
              value={tweetContent}
              onChange={(e) => setTweetContent(e.target.value)}
              placeholder="Share your thoughts..."
              maxLength="280"
              rows="5"
              className="w-full rounded-lg border border-gray-600 bg-transparent px-3 py-2 outline-none focus:border-[#ae7aff]"
            />
            <p className="mt-1 text-xs text-gray-400">
              {tweetContent.length}/280 characters
            </p>
          </div>

          <div className="flex gap-2">
            <button
              type="submit"
              disabled={isLoading || !tweetContent.trim()}
              className="flex-1 rounded-lg bg-[#ae7aff] px-4 py-2 font-semibold text-black transition hover:bg-[#9d68d4] disabled:opacity-50"
            >
              {isLoading ? "Posting..." : "Post Tweet"}
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

export default TweetCreationModal;
