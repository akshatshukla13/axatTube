import React, { useEffect, useState } from "react";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import UploadVideoPopout from "./UploadPopOut/UploadVideoPopout.jsx";
import UploadingVideoPopout from "./UploadPopOut/UploadingVideoPopout.jsx";
import UploadedSuccess from "./UploadPopOut/UploadedSuccess.jsx";
import { useDispatch, useSelector } from "react-redux";
import { videoSlice } from "@/app/slices/videoSlice.js";
import { fetchMyChannelDetails, fetchMyChannelPlaylists, fetchMyChannelTweets, fetchMyChannelVideos, fetchMySubscribedChannels } from "@/app/slices/myChannelSlice";

function MyChannel({ Compo }) {
  const { username } = useParams();
  const [uploadPannelVisibility, setUploadPannelVisibility] = useState(false);
  const uploading = useSelector((state) => state.video.isLoading);
  const dispatch = useDispatch();

  useEffect(() => {
    console.log("Username: ", username);
    dispatch(fetchMyChannelDetails({ username }))
    dispatch(fetchMyChannelVideos({ username }))
    dispatch(fetchMyChannelTweets({ username }))
    dispatch(fetchMyChannelPlaylists({ username }))
    dispatch(fetchMySubscribedChannels({ username }))
  }, [])

  const channelDetails = useSelector((state) => state.myChannel.myChannelData);
  



  useEffect(() => {
    if (uploading == true) {
      setUploadPannelVisibility((e) => !e);
    }
  }, [uploading])

  const changeVisibilityofVideoUploadPannel = () => {
    setUploadPannelVisibility((e) => !e);
  }

  const navigate = useNavigate();

  return (
    channelDetails &&
    <>
      <section class=" relative bg-[#121212] text-white w-full pb-[70px] sm:ml-[70px] sm:pb-0 lg:ml-0">
        <div class="border border-red-500 relative min-h-[150px] w-full pt-[16.28%]">
          <div class="absolute inset-0 overflow-hidden">
            <img
              src={channelDetails.ChannelDetails.coverImage}
              alt="cover-photo"
            />
          </div>
        </div>
        <div class="px-4 pb-4">
          <div class="flex flex-wrap gap-4 pb-4 pt-6">
            <span class="relative -mt-12 inline-block h-28 w-28 shrink-0 overflow-hidden rounded-full border-2">
              <img
                src={channelDetails.ChannelDetails.avatar}
                alt="Channel"
                class="h-full w-full"
              />
            </span>
            <div class="mr-auto inline-block">
              <h1 class="font-bolg text-xl">{channelDetails.ChannelDetails.fullName}</h1>
              <p class="text-sm text-gray-400">{"@" + channelDetails.ChannelDetails.userName}</p>
              <p class="text-sm text-gray-400">
                {channelDetails.totalSubscribers} Subscribers · {channelDetails.totalVideos} Videos
              </p>
            </div>
            <div class="flex p-3">
              <button class="group/btn mr-1 flex w-full items-center gap-x-2 bg-[#ae7aff] px-5 py-2 text-center font-bold text-black shadow-[5px_5px_0px_0px_#4f4e4e] transition-all duration-150 ease-in-out active:translate-x-[5px] active:translate-y-[5px] active:shadow-[0px_0px_0px_0px_#4f4e4e] sm:w-auto">
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
                      d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125"
                    ></path>
                  </svg>
                </span>
                Edit
              </button>
              <button
                onClick={changeVisibilityofVideoUploadPannel}
                class="mx-5 group/btn mr-1 flex w-full items-center gap-x-2 bg-[#ae7aff] px-3 py-2 text-center font-bold text-black shadow-[5px_5px_0px_0px_#4f4e4e] transition-all duration-150 ease-in-out active:translate-x-[5px] active:translate-y-[5px] active:shadow-[0px_0px_0px_0px_#4f4e4e] sm:w-auto"
              >
                <span class="inline-block w-5"></span>
                Upload
              </button>
            </div>
          </div>

          <ul class="no-scrollbar sticky top-[66px] z-[2] flex flex-row gap-x-2 overflow-auto border-b-2 border-gray-400 bg-[#121212] py-2 sm:top-[82px]">
            <NavLink
              to={`/@/${username}/videos`}
              className={({ isActive }) =>
                `w-full border-b-2 px-3 py-1.5 ${isActive ? 'bg-[#e0e0e0] text-[#5a00b3] border-[#5a00b3]' : 'bg-transparent text-gray-700 border-gray-300'
                }`
              }
            >
              <li className="w-full">
                <button
                  onClick={() => {
                    navigate(`/@/${username}/videos`);
                  }}
                  className="w-full"
                >
                  Videos
                </button>
              </li>
            </NavLink>

            <NavLink
              to={`/@/${username}/playlist`}
              className={({ isActive }) =>
                `w-full border-b-2 px-3 py-1.5 ${isActive ? 'bg-[#e0e0e0] text-[#5a00b3] border-[#5a00b3]' : 'bg-transparent text-gray-700 border-gray-300'
                }`
              }
            >
              <li className="w-full">
                <button className="w-full">Playlist</button>
              </li>
            </NavLink>

            <NavLink
              to={`/@/${username}/tweet`}
              className={({ isActive }) =>
                `w-full border-b-2 px-3 py-1.5 ${isActive ? 'bg-[#e0e0e0] text-[#5a00b3] border-[#5a00b3]' : 'bg-transparent text-gray-700 border-gray-300'
                }`
              }
            >
              <li className="w-full">
                <button className="w-full">Tweets</button>
              </li>
            </NavLink>

            <NavLink
              to={`/@/${username}/subscribed`}
              className={({ isActive }) =>
                `w-full border-b-2 px-3 py-1.5 ${isActive ? 'bg-[#e0e0e0] text-[#5a00b3] border-[#5a00b3]' : 'bg-transparent text-gray-700 border-gray-300'
                }`
              }
            >
              <li className="w-full">
                <button className="w-full">Subscribed</button>
              </li>
            </NavLink>



          </ul>
          <Compo />
        </div>
        {/* here upload */}
        {
          uploadPannelVisibility && <UploadVideoPopout />
        }
        {uploading && <UploadingVideoPopout />}
        <UploadedSuccess />
      </section>
    </>
  );
}

export default MyChannel;
