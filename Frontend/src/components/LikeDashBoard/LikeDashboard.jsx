import { fetchLikedVideos } from "@/app/slices/likeSlice";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

function LikeDashboard() {
    const dispatch = useDispatch();
    const likedVideos = useSelector((state) => state.like.likedVideosData);

    useEffect(() => {
        dispatch(fetchLikedVideos());
    }, []);

    return (
        likedVideos && (
            <>
                <section class="h-screen overflow-y-auto bg-[#121212] text-white w-full pb-[90px] sm:ml-[70px] sm:pb-0 lg:ml-0">
                    <div class="flex flex-col gap-4 p-4">
                        {likedVideos.map((vids) => (
                            <div class="w-full max-w-5xl gap-x-4 md:flex">
                                <div class="relative mb-2 w-full md:mb-0 md:w-5/12">
                                    <div class="w-full pt-[56%]">
                                        <div class="absolute inset-0">
                                            <img
                                                src={vids.video.thumbnail}
                                                alt="JavaScript Fundamentals: Variables and Data Types"
                                                class="h-full w-full"
                                            />
                                        </div>
                                        <span class="absolute bottom-1 right-1 inline-block rounded bg-black px-1.5 text-sm">
                                            20:45
                                        </span>
                                    </div>
                                </div>
                                <div class="flex gap-x-2 md:w-10/12">
                                    <div class="h-10 w-10 shrink-0 md:hidden">
                                        <img
                                            src={vids.video.owner.avatar}
                                            alt="codemaster"
                                            class="h-full w-full rounded-full"
                                        />
                                    </div>
                                    <div class="w-full">
                                        <h6 class="mb-1 font-semibold md:max-w-[75%]">
                                            {vids.video.title}
                                        </h6>
                                        <p class="flex text-sm text-gray-200 sm:mt-3">
                                            {vids.video.views} Views · {vids.video.createdAt} ago
                                        </p>
                                        <div class="flex items-center gap-x-4">
                                            <div class="mt-2 hidden h-10 w-10 shrink-0 md:block">
                                                <img
                                                    src={vids.video.owner.avatar}
                                                    alt="codemaster"
                                                    class="h-full w-full rounded-full"
                                                />
                                            </div>
                                            <p class="text-sm text-gray-200">
                                                {vids.video.owner.userName}
                                            </p>
                                        </div>
                                        <p class="mt-2 hidden text-sm md:block">
                                            {vids.video.discription}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>
            </>
        )
    );
}

export default LikeDashboard;
