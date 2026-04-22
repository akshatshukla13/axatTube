import { fetchLikedVideos } from "@/app/slices/likeSlice";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import API_BASE_URL from "@/config/api.config";
import { toast } from "react-toastify";

function LikeDashboard() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const likedVideos = useSelector((state) => state.like.likedVideosData);
    const [localLikedVideos, setLocalLikedVideos] = useState([]);
    const [removingId, setRemovingId] = useState(null);

    useEffect(() => {
        dispatch(fetchLikedVideos());
    }, [dispatch]);

    useEffect(() => {
        setLocalLikedVideos(Array.isArray(likedVideos) ? likedVideos : []);
    }, [likedVideos]);

    const handleVideoClick = (videoId) => {
        navigate(`/video/${videoId}`);
    };

    const handleUnlike = async (videoId, event) => {
        event.stopPropagation();
        setRemovingId(videoId);
        try {
            await axios.post(
                `${API_BASE_URL}/like/toggle/v/${videoId}`,
                {},
                { withCredentials: true },
            );
            setLocalLikedVideos((prev) =>
                prev.filter((like) => like.video._id !== videoId)
            );
            toast.success("Video removed from likes");
        } catch (error) {
            toast.error("Failed to remove video from likes");
            console.error(error);
        } finally {
            setRemovingId(null);
        }
    };

    return (
        localLikedVideos && localLikedVideos.length > 0 ? (
            <>
                <section class="h-screen overflow-y-auto bg-[#121212] text-white w-full pb-[90px] sm:ml-[70px] sm:pb-0 lg:ml-0">
                    <div class="flex flex-col gap-4 p-4">
                        {localLikedVideos.map((vids) => (
                            <div 
                                key={vids._id} 
                                onClick={() => handleVideoClick(vids.video._id)}
                                class="w-full max-w-5xl gap-x-4 md:flex cursor-pointer hover:bg-white/10 rounded p-2 transition-colors"
                            >
                                <div class="relative mb-2 w-full md:mb-0 md:w-5/12">
                                    <div class="w-full pt-[56%]">
                                        <div class="absolute inset-0">
                                            <img
                                                src={vids.video.thumbnail}
                                                alt={vids.video.title}
                                                class="h-full w-full"
                                            />
                                        </div>
                                        <span class="absolute bottom-1 right-1 inline-block rounded bg-black px-1.5 text-sm">
                                            {vids.video.duration || "0:00"}
                                        </span>
                                    </div>
                                </div>
                                <div class="flex gap-x-2 md:w-10/12">
                                    <div class="h-10 w-10 shrink-0 md:hidden">
                                        <img
                                            src={vids.video.owner.avatar}
                                            alt={vids.video.owner.userName}
                                            class="h-full w-full rounded-full"
                                        />
                                    </div>
                                    <div class="w-full flex-1">
                                        <h6 class="mb-1 font-semibold md:max-w-[75%]">
                                            {vids.video.title}
                                        </h6>
                                        <p class="flex text-sm text-gray-200 sm:mt-3">
                                            {vids.video.views} Views · {vids.video.createdAt}
                                        </p>
                                        <div class="flex items-center gap-x-4">
                                            <div class="mt-2 hidden h-10 w-10 shrink-0 md:block">
                                                <img
                                                    src={vids.video.owner.avatar}
                                                    alt={vids.video.owner.userName}
                                                    class="h-full w-full rounded-full"
                                                />
                                            </div>
                                            <p class="text-sm text-gray-200">
                                                {vids.video.owner.userName}
                                            </p>
                                        </div>
                                        <p class="mt-2 hidden text-sm text-gray-300 md:block">
                                            {vids.video.discription}
                                        </p>
                                    </div>
                                    <div class="flex items-start">
                                        <button
                                            onClick={(e) => handleUnlike(vids.video._id, e)}
                                            disabled={removingId === vids.video._id}
                                            class="h-5 w-5 text-red-400 hover:text-red-600 disabled:opacity-50 shrink-0"
                                            title="Remove from likes"
                                        >
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                fill="currentColor"
                                                viewBox="0 0 24 24"
                                                stroke="currentColor"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth={2}
                                                    d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"
                                                />
                                            </svg>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>
            </>
        ) : (
            <section className="w-full p-6 text-sm text-gray-400">No liked videos yet.</section>
        )
    );
}

export default LikeDashboard;
