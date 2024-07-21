import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import axios from "axios";

function VideoListingCardPage() {
  const [videoData, setVideoData] = useState(null);

  useEffect(() => {
    (async () => {
      try {
        const response = await axios.get("/api/videos/");
        const data = await response.data.data
        setVideoData(data)
        
      } catch (error) {
        console.error("Error fetching video data:", error); 
      }
    })();
  }, []);
  

  const navigate = useNavigate();
  return (
    <>

      <section class="bg-[#121212] text-white w-full pb-[70px] sm:ml-[70px] sm:pb-0 lg:ml-0">
        <div class="  grid grid-cols-[repeat(auto-fit,_minmax(300px,_1fr))] gap-4 p-4">

        {videoData && videoData.map((e)=> <>
        {/* imp video div */}
        <div class=" w-full">
          <div class="relative mb-2 w-full pt-[56%]">
            <div
              onClick={() => {
                navigate("/video/" + e._id);
              }}
              class="absolute inset-0"
            >
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

          <div class="flex gap-x-2">
            <div class="h-10 w-10 shrink-0">
              <img
                src={"https://images.pexels.com/photos/3532545/pexels-photo-3532545.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"}
                alt={e.owner.user}
                class="h-full w-full rounded-full"
              />
            </div>
            <div class="w-full">
              <h6 class="mb-1 font-semibold">
                {e.title}
              </h6>
              <p class="flex text-sm text-gray-200">
                {e.views} Views · {e.createdAt}
              </p>
              <p class="text-sm text-gray-200">{e.owner.userName}</p>
            </div>
          </div>
        </div>
        {/* imp video div end */}
        </>)}


     
        
     
          

          <div class="w-full">
            <div class="relative mb-2 w-full pt-[56%]">
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
            <div class="flex gap-x-2">
              <div class="h-10 w-10 shrink-0">
                <img
                  src="https://images.pexels.com/photos/2519812/pexels-photo-2519812.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                  alt="expresslearner"
                  class="h-full w-full rounded-full"
                />
              </div>
              <div class="w-full">
                <h6 class="mb-1 font-semibold">
                  Getting Started with Express.js
                </h6>
                <p class="flex text-sm text-gray-200">
                  11.k Views · 5 hours ago
                </p>
                <p class="text-sm text-gray-200">Express Learner</p>
              </div>
            </div>
          </div>
          <div class="w-full">
            <div class="relative mb-2 w-full pt-[56%]">
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
            <div class="flex gap-x-2">
              <div class="h-10 w-10 shrink-0">
                <img
                  src="https://images.pexels.com/photos/2519812/pexels-photo-2519812.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                  alt="expresslearner"
                  class="h-full w-full rounded-full"
                />
              </div>
              <div class="w-full">
                <h6 class="mb-1 font-semibold">
                  Getting Started with Express.js
                </h6>
                <p class="flex text-sm text-gray-200">
                  11.k Views · 5 hours ago
                </p>
                <p class="text-sm text-gray-200">Express Learner</p>
              </div>
            </div>
          </div>
          <div class="w-full">
            <div class="relative mb-2 w-full pt-[56%]">
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
            <div class="flex gap-x-2">
              <div class="h-10 w-10 shrink-0">
                <img
                  src="https://images.pexels.com/photos/2519812/pexels-photo-2519812.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                  alt="expresslearner"
                  class="h-full w-full rounded-full"
                />
              </div>
              <div class="w-full">
                <h6 class="mb-1 font-semibold">
                  Getting Started with Express.js
                </h6>
                <p class="flex text-sm text-gray-200">
                  11.k Views · 5 hours ago
                </p>
                <p class="text-sm text-gray-200">Express Learner</p>
              </div>
            </div>
          </div>
          <div class="w-full">
            <div class="relative mb-2 w-full pt-[56%]">
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
            <div class="flex gap-x-2">
              <div class="h-10 w-10 shrink-0">
                <img
                  src="https://images.pexels.com/photos/2519812/pexels-photo-2519812.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                  alt="expresslearner"
                  class="h-full w-full rounded-full"
                />
              </div>
              <div class="w-full">
                <h6 class="mb-1 font-semibold">
                  Getting Started with Express.js
                </h6>
                <p class="flex text-sm text-gray-200">
                  11.k Views · 5 hours ago
                </p>
                <p class="text-sm text-gray-200">Express Learner</p>
              </div>
            </div>
          </div>
          <div class="w-full">
            <div class="relative mb-2 w-full pt-[56%]">
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
            <div class="flex gap-x-2">
              <div class="h-10 w-10 shrink-0">
                <img
                  src="https://images.pexels.com/photos/2519812/pexels-photo-2519812.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                  alt="expresslearner"
                  class="h-full w-full rounded-full"
                />
              </div>
              <div class="w-full">
                <h6 class="mb-1 font-semibold">
                  Getting Started with Express.js
                </h6>
                <p class="flex text-sm text-gray-200">
                  11.k Views · 5 hours ago
                </p>
                <p class="text-sm text-gray-200">Express Learner</p>
              </div>
            </div>
          </div>
          <div class="w-full">
            <div class="relative mb-2 w-full pt-[56%]">
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
            <div class="flex gap-x-2">
              <div class="h-10 w-10 shrink-0">
                <img
                  src="https://images.pexels.com/photos/2519812/pexels-photo-2519812.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                  alt="expresslearner"
                  class="h-full w-full rounded-full"
                />
              </div>
              <div class="w-full">
                <h6 class="mb-1 font-semibold">
                  Getting Started with Express.js
                </h6>
                <p class="flex text-sm text-gray-200">
                  11.k Views · 5 hours ago
                </p>
                <p class="text-sm text-gray-200">Express Learner</p>
              </div>
            </div>
          </div>
          <div class="w-full">
            <div class="relative mb-2 w-full pt-[56%]">
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
            <div class="flex gap-x-2">
              <div class="h-10 w-10 shrink-0">
                <img
                  src="https://images.pexels.com/photos/2519812/pexels-photo-2519812.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                  alt="expresslearner"
                  class="h-full w-full rounded-full"
                />
              </div>
              <div class="w-full">
                <h6 class="mb-1 font-semibold">
                  Getting Started with Express.js
                </h6>
                <p class="flex text-sm text-gray-200">
                  11.k Views · 5 hours ago
                </p>
                <p class="text-sm text-gray-200">Express Learner</p>
              </div>
            </div>
          </div>
          <div class="w-full">
            <div class="relative mb-2 w-full pt-[56%]">
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
            <div class="flex gap-x-2">
              <div class="h-10 w-10 shrink-0">
                <img
                  src="https://images.pexels.com/photos/2519812/pexels-photo-2519812.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                  alt="expresslearner"
                  class="h-full w-full rounded-full"
                />
              </div>
              <div class="w-full">
                <h6 class="mb-1 font-semibold">
                  Getting Started with Express.js
                </h6>
                <p class="flex text-sm text-gray-200">
                  11.k Views · 5 hours ago
                </p>
                <p class="text-sm text-gray-200">Express Learner</p>
              </div>
            </div>
          </div>
          <div class="w-full">
            <div class="relative mb-2 w-full pt-[56%]">
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
            <div class="flex gap-x-2">
              <div class="h-10 w-10 shrink-0">
                <img
                  src="https://images.pexels.com/photos/2519812/pexels-photo-2519812.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                  alt="expresslearner"
                  class="h-full w-full rounded-full"
                />
              </div>
              <div class="w-full">
                <h6 class="mb-1 font-semibold">
                  Getting Started with Express.js
                </h6>
                <p class="flex text-sm text-gray-200">
                  11.k Views · 5 hours ago
                </p>
                <p class="text-sm text-gray-200">Express Learner</p>
              </div>
            </div>
          </div>
          <div class="w-full">
            <div class="relative mb-2 w-full pt-[56%]">
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
            <div class="flex gap-x-2">
              <div class="h-10 w-10 shrink-0">
                <img
                  src="https://images.pexels.com/photos/1739942/pexels-photo-1739942.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                  alt="apibuilder"
                  class="h-full w-full rounded-full"
                />
              </div>
              <div class="w-full">
                <h6 class="mb-1 font-semibold">
                  Building a RESTful API with Node.js and Express
                </h6>
                <p class="flex text-sm text-gray-200">
                  14.5k Views · 7 hours ago
                </p>
                <p class="text-sm text-gray-200">API Builder</p>
              </div>
            </div>
          </div>
          <div class="w-full">
            <div class="relative mb-2 w-full pt-[56%]">
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
            <div class="flex gap-x-2">
              <div class="h-10 w-10 shrink-0">
                <img
                  src="https://images.pexels.com/photos/1739856/pexels-photo-1739856.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                  alt="reactnativedev"
                  class="h-full w-full rounded-full"
                />
              </div>
              <div class="w-full">
                <h6 class="mb-1 font-semibold">Introduction to React Native</h6>
                <p class="flex text-sm text-gray-200">
                  10.9k Views · 8 hours ago
                </p>
                <p class="text-sm text-gray-200">React Native Dev</p>
              </div>
            </div>
          </div>
          <div class="w-full">
            <div class="relative mb-2 w-full pt-[56%]">
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
            <div class="flex gap-x-2">
              <div class="h-10 w-10 shrink-0">
                <img
                  src="https://images.pexels.com/photos/1144257/pexels-photo-1144257.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                  alt="hookmaster"
                  class="h-full w-full rounded-full"
                />
              </div>
              <div class="w-full">
                <h6 class="mb-1 font-semibold">
                  Creating Custom Hooks in React
                </h6>
                <p class="flex text-sm text-gray-200">
                  9.3k Views · 9 hours ago
                </p>
                <p class="text-sm text-gray-200">Hook Master</p>
              </div>
            </div>
          </div>
          <div class="w-full">
            <div class="relative mb-2 w-full pt-[56%]">
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
            <div class="flex gap-x-2">
              <div class="h-10 w-10 shrink-0">
                <img
                  src="https://images.pexels.com/photos/1144269/pexels-photo-1144269.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                  alt="djangomaster"
                  class="h-full w-full rounded-full"
                />
              </div>
              <div class="w-full">
                <h6 class="mb-1 font-semibold">
                  Building Scalable Web Applications with Django
                </h6>
                <p class="flex text-sm text-gray-200">
                  18.9M Views · 12 hours ago
                </p>
                <p class="text-sm text-gray-200">Django Master</p>
              </div>
            </div>
          </div>
          <div class="w-full">
            <div class="relative mb-2 w-full pt-[56%]">
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
            <div class="flex gap-x-2">
              <div class="h-10 w-10 shrink-0">
                <img
                  src="https://images.pexels.com/photos/1144277/pexels-photo-1144277.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                  alt="reactd3"
                  class="h-full w-full rounded-full"
                />
              </div>
              <div class="w-full">
                <h6 class="mb-1 font-semibold">
                  Creating Interactive UIs with React and D3
                </h6>
                <p class="flex text-sm text-gray-200">
                  20.1k Views · 14 hours ago
                </p>
                <p class="text-sm text-gray-200">ReactD3</p>
              </div>
            </div>
          </div>
          <div class="w-full">
            <div class="relative mb-2 w-full pt-[56%]">
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
            <div class="flex gap-x-2">
              <div class="h-10 w-10 shrink-0">
                <img
                  src="https://images.pexels.com/photos/1144270/pexels-photo-1144270.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                  alt="passportpro"
                  class="h-full w-full rounded-full"
                />
              </div>
              <div class="w-full">
                <h6 class="mb-1 font-semibold">
                  Node.js Authentication with Passport.js
                </h6>
                <p class="flex text-sm text-gray-200">
                  21.2k Views · 15 hours ago
                </p>
                <p class="text-sm text-gray-200">Passport Pro</p>
              </div>
            </div>
          </div>
          <div class="w-full">
            <div class="relative mb-2 w-full pt-[56%]">
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
            <div class="flex gap-x-2">
              <div class="h-10 w-10 shrink-0">
                <img
                  src="https://images.pexels.com/photos/18264716/pexels-photo-18264716/free-photo-of-man-people-laptop-internet.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                  alt="tableaumaster"
                  class="h-full w-full rounded-full"
                />
              </div>
              <div class="w-full">
                <h6 class="mb-1 font-semibold">
                  Data Visualization with Tableau
                </h6>
                <p class="flex text-sm text-gray-200">
                  24.5k Views · 18 hours ago
                </p>
                <p class="text-sm text-gray-200">Tableau Master</p>
              </div>
            </div>
          </div>
          <div class="w-full">
            <div class="relative mb-2 w-full pt-[56%]">
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
            <div class="flex gap-x-2">
              <div class="h-10 w-10 shrink-0">
                <img
                  src="https://images.pexels.com/photos/18264716/pexels-photo-18264716/free-photo-of-man-people-laptop-internet.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                  alt="socketioexpert"
                  class="h-full w-full rounded-full"
                />
              </div>
              <div class="w-full">
                <h6 class="mb-1 font-semibold">
                  Building Real-Time Applications with Socket.IO
                </h6>
                <p class="flex text-sm text-gray-200">
                  25.6k Views · 19 hours ago
                </p>
                <p class="text-sm text-gray-200">Socket.IO Expert</p>
              </div>
            </div>
          </div>
          <div class="w-full">
            <div class="relative mb-2 w-full pt-[56%]">
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
            <div class="flex gap-x-2">
              <div class="h-10 w-10 shrink-0">
                <img
                  src="https://images.pexels.com/photos/18264716/pexels-photo-18264716/free-photo-of-man-people-laptop-internet.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                  alt="cssanimations"
                  class="h-full w-full rounded-full"
                />
              </div>
              <div class="w-full">
                <h6 class="mb-1 font-semibold">
                  Advanced CSS: Animations and Transitions
                </h6>
                <p class="flex text-sm text-gray-200">
                  28.9k Views · 22 hours ago
                </p>
                <p class="text-sm text-gray-200">CSS Animations</p>
              </div>
            </div>
          </div>
          <div class="w-full">
            <div class="relative mb-2 w-full pt-[56%]">
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
            <div class="flex gap-x-2">
              <div class="h-10 w-10 shrink-0">
                <img
                  src="https://images.pexels.com/photos/18264716/pexels-photo-18264716/free-photo-of-man-people-laptop-internet.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                  alt="reactpatterns"
                  class="h-full w-full rounded-full"
                />
              </div>
              <div class="w-full">
                <h6 class="mb-1 font-semibold">Advanced React Patterns</h6>
                <p class="flex text-sm text-gray-200">
                  30.1k Views · 1 day ago
                </p>
                <p class="text-sm text-gray-200">React Patterns</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default VideoListingCardPage;
