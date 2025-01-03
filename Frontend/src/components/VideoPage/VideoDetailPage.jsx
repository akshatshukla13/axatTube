import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { fetchPerticularVideoDetails } from "@/app/slices/videoSlice";
import { fetchVideoComments } from "@/app/slices/commentSlice";

function VideoDetailPage() {
  const navigate = useNavigate();
  var { id } = useParams();
  const dispatch = useDispatch();
  const videoData = useSelector((state) => state.video.perticularVideoData);
  const commentData = useSelector((state) => state.comment.data);
  const [sideVideoData, setSideVideoData] = useState(null);
  const [comment, setComment] = useState("");
  const [like, setLike] = useState(null);

  useEffect(() => {
    dispatch(fetchPerticularVideoDetails({ id }));
    dispatch(fetchVideoComments({ id }));
  }, []);

  useEffect(() => {
    (async () => {
      try {
        const response = await axios.get("https://videotube-two.vercel.app/videos/");
        const data = await response.data.data;
        setSideVideoData(data);
      } catch (error) {
        console.error("Error fetching video data:", error);
      }
    })();
  }, []);

  const handleInputChange = (event) => {
    setComment(event.target.value);
  };

  const handleCommentForm = async () => {
    console.log("cmdata:", commentData.data);
    setComment("")
    //here send comment through api
    const formData = new FormData();
    formData.append("content", comment);
    if (comment.trim() != "") {
      const resp = await axios({
        method: "post",
        url: `https://videotube-two.vercel.app/comment/${videoData.data._id}`,
        data: formData,
        withCredentials: true,
      });
      // console.log(videoData.data._id);
      // console.log(resp.data);
      dispatch(fetchVideoComments({ id }));
    }
  };

  const likeHandler = async (e) => {
    e.preventDefault()
    if (like != null) return
    setLike(videoData.data.noOfLikes + 1);
    const resp = await axios({
      method: "post",
      url: `https://videotube-two.vercel.app/like/toggle/v/${videoData.data._id}`,
      withCredentials: true,
    });
  }

  return (
    videoData && (
      <>
        <div class="h-screen overflow-y-auto bg-[#121212] text-white">
          <div class="flex min-h-[calc(100vh-66px)] sm:min-h-[calc(100vh-82px)]">
            <section class="w-full pb-[70px] sm:ml-[70px] sm:pb-0">
              <div class="flex w-full flex-wrap gap-4 p-4 lg:flex-nowrap">
                {/* main section starts */}
                {videoData.data && (
                  <div class="col-span-12 w-full">
                    {/* video starts */}
                    <div class="relative mb-4 w-full pt-[56%]">
                      <div class="absolute inset-0">
                        <video class="h-full w-full" controls autoPlay muted>
                          <source
                            src={videoData.data.videoFile}
                            type="video/mp4"
                          />
                        </video>
                      </div>
                    </div>
                    {/* videends */}

                    {/* below video box starts */}
                    <div
                      class="group mb-4 w-full rounded-lg border p-4 duration-200 hover:bg-white/5 focus:bg-white/5"
                      role="button"
                      tabindex="0"
                    >
                      {/* save to playlist start */}
                      <div class="flex flex-wrap gap-y-2">
                        <div class="w-full md:w-1/2 lg:w-full xl:w-1/2">
                          <h1 class="text-lg font-bold">
                            {videoData.data.title}
                          </h1>
                          <p class="flex text-sm text-gray-200">
                            {videoData.data.views} Views ·
                            {videoData.data.createdAt}
                          </p>
                        </div>
                        <div class="w-full md:w-1/2 lg:w-full xl:w-1/2">
                          <div class="flex items-center justify-between gap-x-4 md:justify-end lg:justify-between xl:justify-end">
                            <div class="flex overflow-hidden rounded-lg border">
                              <button
                                onClick={likeHandler}
                                class="group/btn flex items-center gap-x-2 border-r border-gray-700 px-4 py-1.5 after:content-[attr(data-like)] hover:bg-white/10 focus:after:content-[attr(data-like-alt)]"
                              // data-like={videoData.data.noOfLikes}
                              // data-like-alt={videoData.data.noOfLikes+1}
                              >
                                {/* <h1>45</h1> */}
                                <span class="inline-block w-5 group-focus/btn:text-[#ae7aff]">
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke-width="1.5"
                                    stroke="currentColor"
                                    aria-hidden="true"
                                  >
                                    <path
                                      stroke-linecap="round"
                                      stroke-linejoin="round"
                                      d="M6.633 10.5c.806 0 1.533-.446 2.031-1.08a9.041 9.041 0 012.861-2.4c.723-.384 1.35-.956 1.653-1.715a4.498 4.498 0 00.322-1.672V3a.75.75 0 01.75-.75A2.25 2.25 0 0116.5 4.5c0 1.152-.26 2.243-.723 3.218-.266.558.107 1.282.725 1.282h3.126c1.026 0 1.945.694 2.054 1.715.045.422.068.85.068 1.285a11.95 11.95 0 01-2.649 7.521c-.388.482-.987.729-1.605.729H13.48c-.483 0-.964-.078-1.423-.23l-3.114-1.04a4.501 4.501 0 00-1.423-.23H5.904M14.25 9h2.25M5.904 18.75c.083.205.173.405.27.602.197.4-.078.898-.523.898h-.908c-.889 0-1.713-.518-1.972-1.368a12 12 0 01-.521-3.507c0-1.553.295-3.036.831-4.398C3.387 10.203 4.167 9.75 5 9.75h1.053c.472 0 .745.556.5.96a8.958 8.958 0 00-1.302 4.665c0 1.194.232 2.333.654 3.375z"
                                    ></path>
                                  </svg>

                                </span>

                                <h2>{like || videoData.data.noOfLikes}</h2> {/* like count */}
                              </button>
                              <button
                                class="group/btn flex items-center gap-x-2 px-4 py-1.5 after:content-[attr(data-like)] hover:bg-white/10 focus:after:content-[attr(data-like-alt)]"

                              >
                                <span class="inline-block w-5 group-focus/btn:text-[#ae7aff]">
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke-width="1.5"
                                    stroke="currentColor"
                                    aria-hidden="true"
                                  >
                                    <path
                                      stroke-linecap="round"
                                      stroke-linejoin="round"
                                      d="M7.5 15h2.25m8.024-9.75c.011.05.028.1.052.148.591 1.2.924 2.55.924 3.977a8.96 8.96 0 01-.999 4.125m.023-8.25c-.076-.365.183-.75.575-.75h.908c.889 0 1.713.518 1.972 1.368.339 1.11.521 2.287.521 3.507 0 1.553-.295 3.036-.831 4.398C20.613 14.547 19.833 15 19 15h-1.053c-.472 0-.745-.556-.5-.96a8.95 8.95 0 00.303-.54m.023-8.25H16.48a4.5 4.5 0 01-1.423-.23l-3.114-1.04a4.5 4.5 0 00-1.423-.23H6.504c-.618 0-1.217.247-1.605.729A11.95 11.95 0 002.25 12c0 .434.023.863.068 1.285C2.427 14.306 3.346 15 4.372 15h3.126c.618 0 .991.724.725 1.282A7.471 7.471 0 007.5 19.5a2.25 2.25 0 002.25 2.25.75.75 0 00.75-.75v-.633c0-.573.11-1.14.322-1.672.304-.76.93-1.33 1.653-1.715a9.04 9.04 0 002.86-2.4c.498-.634 1.226-1.08 2.032-1.08h.384"
                                    ></path>
                                  </svg>
                                </span>
                              </button>
                            </div>
                            <div class="relative block">
                              <button class="peer flex items-center gap-x-2 rounded-lg bg-white px-4 py-1.5 text-black">
                                <span class="inline-block w-5">
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke-width="1.5"
                                    stroke="currentColor"
                                    aria-hidden="true"
                                  >
                                    <path
                                      stroke-linecap="round"
                                      stroke-linejoin="round"
                                      d="M12 10.5v6m3-3H9m4.06-7.19l-2.12-2.12a1.5 1.5 0 00-1.061-.44H4.5A2.25 2.25 0 002.25 6v12a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9a2.25 2.25 0 00-2.25-2.25h-5.379a1.5 1.5 0 01-1.06-.44z"
                                    ></path>
                                  </svg>
                                </span>
                                Save
                              </button>
                              <div class="absolute right-0 top-full z-10 hidden w-64 overflow-hidden rounded-lg bg-[#121212] p-4 shadow shadow-slate-50/30 hover:block peer-focus:block">
                                <h3 class="mb-4 text-center text-lg font-semibold">
                                  Save to playlist
                                </h3>
                                <ul class="mb-4">
                                  <li class="mb-2 last:mb-0">
                                    <label
                                      class="group/label inline-flex cursor-pointer items-center gap-x-3"
                                      for="Collections-checkbox"
                                    >
                                      <input
                                        type="checkbox"
                                        class="peer hidden"
                                        id="Collections-checkbox"
                                      />
                                      <span class="inline-flex h-4 w-4 items-center justify-center rounded-[4px] border border-transparent bg-white text-white group-hover/label:border-[#ae7aff] peer-checked:border-[#ae7aff] peer-checked:text-[#ae7aff]">
                                        <svg
                                          xmlns="http://www.w3.org/2000/svg"
                                          fill="none"
                                          viewBox="0 0 24 24"
                                          stroke-width="3"
                                          stroke="currentColor"
                                          aria-hidden="true"
                                        >
                                          <path
                                            stroke-linecap="round"
                                            stroke-linejoin="round"
                                            d="M4.5 12.75l6 6 9-13.5"
                                          ></path>
                                        </svg>
                                      </span>
                                      Dashboard
                                    </label>
                                  </li>
                                  <li class="mb-2 last:mb-0">
                                    <label
                                      class="group/label inline-flex cursor-pointer items-center gap-x-3"
                                      for="JavaScript Basics-checkbox"
                                    >
                                      <input
                                        type="checkbox"
                                        class="peer hidden"
                                        id="JavaScript Basics-checkbox"
                                      />
                                      <span class="inline-flex h-4 w-4 items-center justify-center rounded-[4px] border border-transparent bg-white text-white group-hover/label:border-[#ae7aff] peer-checked:border-[#ae7aff] peer-checked:text-[#ae7aff]">
                                        <svg
                                          xmlns="http://www.w3.org/2000/svg"
                                          fill="none"
                                          viewBox="0 0 24 24"
                                          stroke-width="3"
                                          stroke="currentColor"
                                          aria-hidden="true"
                                        >
                                          <path
                                            stroke-linecap="round"
                                            stroke-linejoin="round"
                                            d="M4.5 12.75l6 6 9-13.5"
                                          ></path>
                                        </svg>
                                      </span>
                                      JavaScript Basics
                                    </label>
                                  </li>
                                  <li class="mb-2 last:mb-0">
                                    <label
                                      class="group/label inline-flex cursor-pointer items-center gap-x-3"
                                      for="C++ Tuts-checkbox"
                                    >
                                      <input
                                        type="checkbox"
                                        class="peer hidden"
                                        id="C++ Tuts-checkbox"
                                      />
                                      <span class="inline-flex h-4 w-4 items-center justify-center rounded-[4px] border border-transparent bg-white text-white group-hover/label:border-[#ae7aff] peer-checked:border-[#ae7aff] peer-checked:text-[#ae7aff]">
                                        <svg
                                          xmlns="http://www.w3.org/2000/svg"
                                          fill="none"
                                          viewBox="0 0 24 24"
                                          stroke-width="3"
                                          stroke="currentColor"
                                          aria-hidden="true"
                                        >
                                          <path
                                            stroke-linecap="round"
                                            stroke-linejoin="round"
                                            d="M4.5 12.75l6 6 9-13.5"
                                          ></path>
                                        </svg>
                                      </span>
                                      C++ Tuts
                                    </label>
                                  </li>
                                  <li class="mb-2 last:mb-0">
                                    <label
                                      class="group/label inline-flex cursor-pointer items-center gap-x-3"
                                      for="Feel Good Music-checkbox"
                                    >
                                      <input
                                        type="checkbox"
                                        class="peer hidden"
                                        id="Feel Good Music-checkbox"
                                      />
                                      <span class="inline-flex h-4 w-4 items-center justify-center rounded-[4px] border border-transparent bg-white text-white group-hover/label:border-[#ae7aff] peer-checked:border-[#ae7aff] peer-checked:text-[#ae7aff]">
                                        <svg
                                          xmlns="http://www.w3.org/2000/svg"
                                          fill="none"
                                          viewBox="0 0 24 24"
                                          stroke-width="3"
                                          stroke="currentColor"
                                          aria-hidden="true"
                                        >
                                          <path
                                            stroke-linecap="round"
                                            stroke-linejoin="round"
                                            d="M4.5 12.75l6 6 9-13.5"
                                          ></path>
                                        </svg>
                                      </span>
                                      Feel Good Music
                                    </label>
                                  </li>
                                  <li class="mb-2 last:mb-0">
                                    <label
                                      class="group/label inline-flex cursor-pointer items-center gap-x-3"
                                      for="Ed Sheeran-checkbox"
                                    >
                                      <input
                                        type="checkbox"
                                        class="peer hidden"
                                        id="Ed Sheeran-checkbox"
                                      />
                                      <span class="inline-flex h-4 w-4 items-center justify-center rounded-[4px] border border-transparent bg-white text-white group-hover/label:border-[#ae7aff] peer-checked:border-[#ae7aff] peer-checked:text-[#ae7aff]">
                                        <svg
                                          xmlns="http://www.w3.org/2000/svg"
                                          fill="none"
                                          viewBox="0 0 24 24"
                                          stroke-width="3"
                                          stroke="currentColor"
                                          aria-hidden="true"
                                        >
                                          <path
                                            stroke-linecap="round"
                                            stroke-linejoin="round"
                                            d="M4.5 12.75l6 6 9-13.5"
                                          ></path>
                                        </svg>
                                      </span>
                                      Ed Sheeran
                                    </label>
                                  </li>
                                  <li class="mb-2 last:mb-0">
                                    <label
                                      class="group/label inline-flex cursor-pointer items-center gap-x-3"
                                      for="Python-checkbox"
                                    >
                                      <input
                                        type="checkbox"
                                        class="peer hidden"
                                        id="Python-checkbox"
                                      />
                                      <span class="inline-flex h-4 w-4 items-center justify-center rounded-[4px] border border-transparent bg-white text-white group-hover/label:border-[#ae7aff] peer-checked:border-[#ae7aff] peer-checked:text-[#ae7aff]">
                                        <svg
                                          xmlns="http://www.w3.org/2000/svg"
                                          fill="none"
                                          viewBox="0 0 24 24"
                                          stroke-width="3"
                                          stroke="currentColor"
                                          aria-hidden="true"
                                        >
                                          <path
                                            stroke-linecap="round"
                                            stroke-linejoin="round"
                                            d="M4.5 12.75l6 6 9-13.5"
                                          ></path>
                                        </svg>
                                      </span>
                                      Python
                                    </label>
                                  </li>
                                </ul>
                                <div class="flex flex-col">
                                  <label
                                    for="playlist-name"
                                    class="mb-1 inline-block cursor-pointer"
                                  >
                                    Name
                                  </label>
                                  <input
                                    class="w-full rounded-lg border border-transparent bg-white px-3 py-2 text-black outline-none focus:border-[#ae7aff]"
                                    id="playlist-name"
                                    placeholder="Enter playlist name"
                                  />
                                  <button class="mx-auto mt-4 rounded-lg bg-[#ae7aff] px-4 py-2 text-black">
                                    Create new playlist
                                  </button>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      {/* save to playlist end */}

                      {/* subscriber subscribed area starts */}
                      <div class="mt-4 flex items-center justify-between">
                        <div onClick={() => { navigate(`/channel/${videoData.data.owner.userName}`); }} class="border border-red-500 flex items-center gap-x-4">
                          <div class=" mt-2 h-12 w-12 shrink-0">
                            <img
                              src={videoData.data.owner.avatar}
                              alt={videoData.data.owner.userName}
                              class="h-full w-full rounded-full"
                            />
                          </div>
                          <div class="block">
                            <p class="text-gray-200">
                              {videoData.data.owner.userName}
                            </p>
                            <p class="text-sm text-gray-400">
                              757K Subscribers
                            </p>
                          </div>
                        </div>
                        <div class="block">
                          <button class="group/btn mr-1 flex w-full items-center gap-x-2 bg-[#ae7aff] px-3 py-2 text-center font-bold text-black shadow-[5px_5px_0px_0px_#4f4e4e] transition-all duration-150 ease-in-out active:translate-x-[5px] active:translate-y-[5px] active:shadow-[0px_0px_0px_0px_#4f4e4e] sm:w-auto">
                            <span class="inline-block w-5">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke-width="2"
                                stroke="currentColor"
                                aria-hidden="true"
                              >
                                <path
                                  stroke-linecap="round"
                                  stroke-linejoin="round"
                                  d="M19 7.5v3m0 0v3m0-3h3m-3 0h-3m-2.25-4.125a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zM4 19.235v-.11a6.375 6.375 0 0112.75 0v.109A12.318 12.318 0 0110.374 21c-2.331 0-4.512-.645-6.374-1.766z"
                                ></path>
                              </svg>
                            </span>
                            <span class="group-focus/btn:hidden">
                              Subscribe
                            </span>
                            <span class="hidden group-focus/btn:block">
                              Subscribed
                            </span>
                          </button>
                        </div>
                      </div>
                      {/* subscriber subscribed area ends */}

                      <hr class="my-4 border-white" />

                      {/* discription starts */}
                      <div class="h-5 overflow-hidden group-focus:h-auto">
                        <p class="text-sm">{videoData.data.discription}</p>
                      </div>
                      {/* discription ends */}
                    </div>
                    {/* below video box ends */}

                    <button class="peer w-full rounded-lg border p-4 text-left duration-200 hover:bg-white/5 focus:bg-white/5 sm:hidden">
                      <h6 class="font-semibold">573 Comments...</h6>
                    </button>

                    {/* comments starts */}
                    <div class="fixed inset-x-0 top-full z-[60] h-[calc(100%-69px)] overflow-auto rounded-lg border bg-[#121212] p-4 duration-200 hover:top-[67px] peer-focus:top-[67px] sm:static sm:h-auto sm:max-h-[500px] lg:max-h-none">
                      <div class="block">
                        <h6 class="mb-4 font-semibold">573 Comments</h6>

                        <input
                          type="text"
                          class="w-full rounded-lg border bg-transparent px-2 py-1 placeholder-white"
                          placeholder="Add a Comment"
                          value={comment}
                          onChange={handleInputChange}
                        />
                        <button
                          class="border text-white font-sans hover:bg-black px-3 rounded-full m-2"
                          onClick={handleCommentForm}
                        >
                          Submit
                        </button>
                      </div>
                      <hr class="my-4 border-white" />
                      <h1>hii</h1>
                      {
                        commentData && commentData.data.map((data) => (
                          <div>
                            <div class="flex gap-x-4">
                              <div class="mt-2 h-11 w-11 shrink-0">
                                <img
                                  src="https://images.pexels.com/photos/18148932/pexels-photo-18148932/free-photo-of-woman-reading-book-on-a-bench.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                                  alt="sarahjv"
                                  class="h-full w-full rounded-full"
                                />
                              </div>
                              <div class="block">
                                <p class="flex items-center text-gray-200">
                                  {data.owner.fullName}·
                                  <span class="text-sm">{"{" + data.createdAt + "}"}</span>
                                </p>
                                <p class="text-sm text-gray-200">
                                  {"@" + data.owner.userName}
                                </p>
                                <p class="mt-3 text-sm">
                                  {data.content}
                                </p>
                              </div>
                            </div>
                            <hr class="my-4 border-white" />
                          </div>
                        ))
                      }

                      <div>
                        <div class="flex gap-x-4">
                          <div class="mt-2 h-11 w-11 shrink-0">
                            <img
                              src="https://images.pexels.com/photos/18148932/pexels-photo-18148932/free-photo-of-woman-reading-book-on-a-bench.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                              alt="sarahjv"
                              class="h-full w-full rounded-full"
                            />
                          </div>
                          <div class="block">
                            <p class="flex items-center text-gray-200">
                              Sarah Johnson ·
                              <span class="text-sm">17 hour ago</span>
                            </p>
                            <p class="text-sm text-gray-200">@sarahjv</p>
                            <p class="mt-3 text-sm">
                              This series is exactly what I&#x27;ve been looking
                              for! Excited to dive into these advanced React
                              patterns. Thanks for putting this together!
                            </p>
                          </div>
                        </div>
                        <hr class="my-4 border-white" />
                      </div>
                    </div>
                    {/* comments ends */}
                  </div>
                )}
                {/* main section ends */}

                {/* side section starts*/}
                <div class="col-span-12 flex w-full shrink-0 flex-col gap-3 lg:w-[350px] xl:w-[400px]">
                  {sideVideoData &&
                    sideVideoData.map((e) => (
                      <>
                        {/* single side video */}
                        <div
                          onClick={() => {
                            id = e._id;
                            navigate("/video/" + id);
                            location.reload();
                          }}
                          class="w-full gap-x-2 border pr-2 md:flex"
                        >
                          <div class="relative mb-2 w-full md:mb-0 md:w-5/12">
                            <div class="w-full pt-[56%]">
                              <div class="absolute inset-0">
                                <img
                                  src={e.thumbnail}
                                  alt={e.title}
                                  class="h-full w-full"
                                />
                              </div>
                              <span class="absolute bottom-1 right-1 inline-block rounded bg-black px-1.5 text-sm">
                                {e.duration}
                              </span>
                            </div>
                          </div>
                          <div class="flex gap-x-2 px-2 pb-4 pt-1 md:w-7/12 md:px-0 md:py-0.5">
                            <div class="h-12 w-12 shrink-0 md:hidden">
                              <img
                                src={e.owner.avatar}
                                alt={e.owner.username}
                                class="h-full w-full rounded-full"
                              />
                            </div>
                            <div class="w-full pt-1 md:pt-0">
                              <h6 class="mb-1 text-sm font-semibold">
                                {e.title}
                              </h6>
                              <p class="mb-0.5 mt-2 text-sm text-gray-200">
                                {e.owner.userName}
                              </p>
                              <p class="flex text-sm text-gray-200">
                                {e.views} Views · {e.createdAt}
                              </p>
                            </div>
                          </div>
                        </div>
                        {/* single side video ends */}
                      </>
                    ))}

                  <div class="w-full gap-x-2 border pr-2 md:flex">
                    <div class="relative mb-2 w-full md:mb-0 md:w-5/12">
                      <div class="w-full pt-[56%]">
                        <div class="absolute inset-0">
                          <img
                            src="https://images.pexels.com/photos/2519817/pexels-photo-2519817.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                            alt="Getting Started with Express.js"
                            class="h-full w-full"
                          />
                        </div>
                        <span class="absolute bottom-1 right-1 inline-block rounded bg-black px-1.5 text-sm">
                          22:18
                        </span>
                      </div>
                    </div>
                    <div class="flex gap-x-2 px-2 pb-4 pt-1 md:w-7/12 md:px-0 md:py-0.5">
                      <div class="h-12 w-12 shrink-0 md:hidden">
                        <img
                          src="https://images.pexels.com/photos/18264716/pexels-photo-18264716/free-photo-of-man-people-laptop-internet.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                          alt="reactpatterns"
                          class="h-full w-full rounded-full"
                        />
                      </div>
                      <div class="w-full pt-1 md:pt-0">
                        <h6 class="mb-1 text-sm font-semibold">
                          Getting Started with Express.js
                        </h6>
                        <p class="mb-0.5 mt-2 text-sm text-gray-200">
                          Express Learner
                        </p>
                        <p class="flex text-sm text-gray-200">
                          11.k Views · 5 hours ago
                        </p>
                      </div>
                    </div>
                  </div>
                  <div class="w-full gap-x-2 border pr-2 md:flex">
                    <div class="relative mb-2 w-full md:mb-0 md:w-5/12">
                      <div class="w-full pt-[56%]">
                        <div class="absolute inset-0">
                          <img
                            src="https://images.pexels.com/photos/1739849/pexels-photo-1739849.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                            alt="Building a RESTful API with Node.js and Express"
                            class="h-full w-full"
                          />
                        </div>
                        <span class="absolute bottom-1 right-1 inline-block rounded bg-black px-1.5 text-sm">
                          24:33
                        </span>
                      </div>
                    </div>
                    <div class="flex gap-x-2 px-2 pb-4 pt-1 md:w-7/12 md:px-0 md:py-0.5">
                      <div class="h-12 w-12 shrink-0 md:hidden">
                        <img
                          src="https://images.pexels.com/photos/18264716/pexels-photo-18264716/free-photo-of-man-people-laptop-internet.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                          alt="reactpatterns"
                          class="h-full w-full rounded-full"
                        />
                      </div>
                      <div class="w-full pt-1 md:pt-0">
                        <h6 class="mb-1 text-sm font-semibold">
                          Building a RESTful API with Node.js and Express
                        </h6>
                        <p class="mb-0.5 mt-2 text-sm text-gray-200">
                          API Builder
                        </p>
                        <p class="flex text-sm text-gray-200">
                          14.5k Views · 7 hours ago
                        </p>
                      </div>
                    </div>
                  </div>
                  <div class="w-full gap-x-2 border pr-2 md:flex">
                    <div class="relative mb-2 w-full md:mb-0 md:w-5/12">
                      <div class="w-full pt-[56%]">
                        <div class="absolute inset-0">
                          <img
                            src="https://images.pexels.com/photos/1739854/pexels-photo-1739854.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                            alt="Introduction to React Native"
                            class="h-full w-full"
                          />
                        </div>
                        <span class="absolute bottom-1 right-1 inline-block rounded bg-black px-1.5 text-sm">
                          19:58
                        </span>
                      </div>
                    </div>
                    <div class="flex gap-x-2 px-2 pb-4 pt-1 md:w-7/12 md:px-0 md:py-0.5">
                      <div class="h-12 w-12 shrink-0 md:hidden">
                        <img
                          src="https://images.pexels.com/photos/18264716/pexels-photo-18264716/free-photo-of-man-people-laptop-internet.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                          alt="reactpatterns"
                          class="h-full w-full rounded-full"
                        />
                      </div>
                      <div class="w-full pt-1 md:pt-0">
                        <h6 class="mb-1 text-sm font-semibold">
                          Introduction to React Native
                        </h6>
                        <p class="mb-0.5 mt-2 text-sm text-gray-200">
                          React Native Dev
                        </p>
                        <p class="flex text-sm text-gray-200">
                          10.9k Views · 8 hours ago
                        </p>
                      </div>
                    </div>
                  </div>
                  <div class="w-full gap-x-2 border pr-2 md:flex">
                    <div class="relative mb-2 w-full md:mb-0 md:w-5/12">
                      <div class="w-full pt-[56%]">
                        <div class="absolute inset-0">
                          <img
                            src="https://images.pexels.com/photos/1144256/pexels-photo-1144256.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                            alt="Creating Custom Hooks in React"
                            class="h-full w-full"
                          />
                        </div>
                        <span class="absolute bottom-1 right-1 inline-block rounded bg-black px-1.5 text-sm">
                          16:37
                        </span>
                      </div>
                    </div>
                    <div class="flex gap-x-2 px-2 pb-4 pt-1 md:w-7/12 md:px-0 md:py-0.5">
                      <div class="h-12 w-12 shrink-0 md:hidden">
                        <img
                          src="https://images.pexels.com/photos/18264716/pexels-photo-18264716/free-photo-of-man-people-laptop-internet.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                          alt="reactpatterns"
                          class="h-full w-full rounded-full"
                        />
                      </div>
                      <div class="w-full pt-1 md:pt-0">
                        <h6 class="mb-1 text-sm font-semibold">
                          Creating Custom Hooks in React
                        </h6>
                        <p class="mb-0.5 mt-2 text-sm text-gray-200">
                          Hook Master
                        </p>
                        <p class="flex text-sm text-gray-200">
                          9.3k Views · 9 hours ago
                        </p>
                      </div>
                    </div>
                  </div>
                  <div class="w-full gap-x-2 border pr-2 md:flex">
                    <div class="relative mb-2 w-full md:mb-0 md:w-5/12">
                      <div class="w-full pt-[56%]">
                        <div class="absolute inset-0">
                          <img
                            src="https://images.pexels.com/photos/1144260/pexels-photo-1144260.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                            alt="Building Scalable Web Applications with Django"
                            class="h-full w-full"
                          />
                        </div>
                        <span class="absolute bottom-1 right-1 inline-block rounded bg-black px-1.5 text-sm">
                          32:18
                        </span>
                      </div>
                    </div>
                    <div class="flex gap-x-2 px-2 pb-4 pt-1 md:w-7/12 md:px-0 md:py-0.5">
                      <div class="h-12 w-12 shrink-0 md:hidden">
                        <img
                          src="https://images.pexels.com/photos/18264716/pexels-photo-18264716/free-photo-of-man-people-laptop-internet.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                          alt="reactpatterns"
                          class="h-full w-full rounded-full"
                        />
                      </div>
                      <div class="w-full pt-1 md:pt-0">
                        <h6 class="mb-1 text-sm font-semibold">
                          Building Scalable Web Applications with Django
                        </h6>
                        <p class="mb-0.5 mt-2 text-sm text-gray-200">
                          Django Master
                        </p>
                        <p class="flex text-sm text-gray-200">
                          18.9M Views · 12 hours ago
                        </p>
                      </div>
                    </div>
                  </div>
                  <div class="w-full gap-x-2 border pr-2 md:flex">
                    <div class="relative mb-2 w-full md:mb-0 md:w-5/12">
                      <div class="w-full pt-[56%]">
                        <div class="absolute inset-0">
                          <img
                            src="https://images.pexels.com/photos/1144276/pexels-photo-1144276.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                            alt="Creating Interactive UIs with React and D3"
                            class="h-full w-full"
                          />
                        </div>
                        <span class="absolute bottom-1 right-1 inline-block rounded bg-black px-1.5 text-sm">
                          29:30
                        </span>
                      </div>
                    </div>
                    <div class="flex gap-x-2 px-2 pb-4 pt-1 md:w-7/12 md:px-0 md:py-0.5">
                      <div class="h-12 w-12 shrink-0 md:hidden">
                        <img
                          src="https://images.pexels.com/photos/18264716/pexels-photo-18264716/free-photo-of-man-people-laptop-internet.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                          alt="reactpatterns"
                          class="h-full w-full rounded-full"
                        />
                      </div>
                      <div class="w-full pt-1 md:pt-0">
                        <h6 class="mb-1 text-sm font-semibold">
                          Creating Interactive UIs with React and D3
                        </h6>
                        <p class="mb-0.5 mt-2 text-sm text-gray-200">ReactD3</p>
                        <p class="flex text-sm text-gray-200">
                          20.1k Views · 14 hours ago
                        </p>
                      </div>
                    </div>
                  </div>
                  <div class="w-full gap-x-2 border pr-2 md:flex">
                    <div class="relative mb-2 w-full md:mb-0 md:w-5/12">
                      <div class="w-full pt-[56%]">
                        <div class="absolute inset-0">
                          <img
                            src="https://images.pexels.com/photos/1144274/pexels-photo-1144274.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                            alt="Node.js Authentication with Passport.js"
                            class="h-full w-full"
                          />
                        </div>
                        <span class="absolute bottom-1 right-1 inline-block rounded bg-black px-1.5 text-sm">
                          26:58
                        </span>
                      </div>
                    </div>
                    <div class="flex gap-x-2 px-2 pb-4 pt-1 md:w-7/12 md:px-0 md:py-0.5">
                      <div class="h-12 w-12 shrink-0 md:hidden">
                        <img
                          src="https://images.pexels.com/photos/18264716/pexels-photo-18264716/free-photo-of-man-people-laptop-internet.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                          alt="reactpatterns"
                          class="h-full w-full rounded-full"
                        />
                      </div>
                      <div class="w-full pt-1 md:pt-0">
                        <h6 class="mb-1 text-sm font-semibold">
                          Node.js Authentication with Passport.js
                        </h6>
                        <p class="mb-0.5 mt-2 text-sm text-gray-200">
                          Passport Pro
                        </p>
                        <p class="flex text-sm text-gray-200">
                          21.2k Views · 15 hours ago
                        </p>
                      </div>
                    </div>
                  </div>
                  <div class="w-full gap-x-2 border pr-2 md:flex">
                    <div class="relative mb-2 w-full md:mb-0 md:w-5/12">
                      <div class="w-full pt-[56%]">
                        <div class="absolute inset-0">
                          <img
                            src="https://images.pexels.com/photos/1144231/pexels-photo-1144231.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                            alt="Data Visualization with Tableau"
                            class="h-full w-full"
                          />
                        </div>
                        <span class="absolute bottom-1 right-1 inline-block rounded bg-black px-1.5 text-sm">
                          32:14
                        </span>
                      </div>
                    </div>
                    <div class="flex gap-x-2 px-2 pb-4 pt-1 md:w-7/12 md:px-0 md:py-0.5">
                      <div class="h-12 w-12 shrink-0 md:hidden">
                        <img
                          src="https://images.pexels.com/photos/18264716/pexels-photo-18264716/free-photo-of-man-people-laptop-internet.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                          alt="reactpatterns"
                          class="h-full w-full rounded-full"
                        />
                      </div>
                      <div class="w-full pt-1 md:pt-0">
                        <h6 class="mb-1 text-sm font-semibold">
                          Data Visualization with Tableau
                        </h6>
                        <p class="mb-0.5 mt-2 text-sm text-gray-200">
                          Tableau Master
                        </p>
                        <p class="flex text-sm text-gray-200">
                          24.5k Views · 18 hours ago
                        </p>
                      </div>
                    </div>
                  </div>
                  <div class="w-full gap-x-2 border pr-2 md:flex">
                    <div class="relative mb-2 w-full md:mb-0 md:w-5/12">
                      <div class="w-full pt-[56%]">
                        <div class="absolute inset-0">
                          <img
                            src="https://images.pexels.com/photos/1144250/pexels-photo-1144250.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                            alt="Building Real-Time Applications with Socket.IO"
                            class="h-full w-full"
                          />
                        </div>
                        <span class="absolute bottom-1 right-1 inline-block rounded bg-black px-1.5 text-sm">
                          27:37
                        </span>
                      </div>
                    </div>
                    <div class="flex gap-x-2 px-2 pb-4 pt-1 md:w-7/12 md:px-0 md:py-0.5">
                      <div class="h-12 w-12 shrink-0 md:hidden">
                        <img
                          src="https://images.pexels.com/photos/18264716/pexels-photo-18264716/free-photo-of-man-people-laptop-internet.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                          alt="reactpatterns"
                          class="h-full w-full rounded-full"
                        />
                      </div>
                      <div class="w-full pt-1 md:pt-0">
                        <h6 class="mb-1 text-sm font-semibold">
                          Building Real-Time Applications with Socket.IO
                        </h6>
                        <p class="mb-0.5 mt-2 text-sm text-gray-200">
                          Socket.IO Expert
                        </p>
                        <p class="flex text-sm text-gray-200">
                          25.6k Views · 19 hours ago
                        </p>
                      </div>
                    </div>
                  </div>
                  <div class="w-full gap-x-2 border pr-2 md:flex">
                    <div class="relative mb-2 w-full md:mb-0 md:w-5/12">
                      <div class="w-full pt-[56%]">
                        <div class="absolute inset-0">
                          <img
                            src="https://images.pexels.com/photos/1115824/pexels-photo-1115824.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                            alt="Advanced CSS: Animations and Transitions"
                            class="h-full w-full"
                          />
                        </div>
                        <span class="absolute bottom-1 right-1 inline-block rounded bg-black px-1.5 text-sm">
                          31:55
                        </span>
                      </div>
                    </div>
                    <div class="flex gap-x-2 px-2 pb-4 pt-1 md:w-7/12 md:px-0 md:py-0.5">
                      <div class="h-12 w-12 shrink-0 md:hidden">
                        <img
                          src="https://images.pexels.com/photos/18264716/pexels-photo-18264716/free-photo-of-man-people-laptop-internet.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                          alt="reactpatterns"
                          class="h-full w-full rounded-full"
                        />
                      </div>
                      <div class="w-full pt-1 md:pt-0">
                        <h6 class="mb-1 text-sm font-semibold">
                          Advanced CSS: Animations and Transitions
                        </h6>
                        <p class="mb-0.5 mt-2 text-sm text-gray-200">
                          CSS Animations
                        </p>
                        <p class="flex text-sm text-gray-200">
                          28.9k Views · 22 hours ago
                        </p>
                      </div>
                    </div>
                  </div>
                  <div class="w-full gap-x-2 border pr-2 md:flex">
                    <div class="relative mb-2 w-full md:mb-0 md:w-5/12">
                      <div class="w-full pt-[56%]">
                        <div class="absolute inset-0">
                          <img
                            src="https://images.pexels.com/photos/1115808/pexels-photo-1115808.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                            alt="Advanced React Patterns"
                            class="h-full w-full"
                          />
                        </div>
                        <span class="absolute bottom-1 right-1 inline-block rounded bg-black px-1.5 text-sm">
                          30:25
                        </span>
                      </div>
                    </div>
                    <div class="flex gap-x-2 px-2 pb-4 pt-1 md:w-7/12 md:px-0 md:py-0.5">
                      <div class="h-12 w-12 shrink-0 md:hidden">
                        <img
                          src="https://images.pexels.com/photos/18264716/pexels-photo-18264716/free-photo-of-man-people-laptop-internet.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                          alt="reactpatterns"
                          class="h-full w-full rounded-full"
                        />
                      </div>
                      <div class="w-full pt-1 md:pt-0">
                        <h6 class="mb-1 text-sm font-semibold">
                          Advanced React Patterns
                        </h6>
                        <p class="mb-0.5 mt-2 text-sm text-gray-200">
                          React Patterns
                        </p>
                        <p class="flex text-sm text-gray-200">
                          30.1k Views · 1 day ago
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                {/* side section ends*/}
              </div>
            </section>
          </div>
        </div>
      </>
    )
  );
}

export default VideoDetailPage;
