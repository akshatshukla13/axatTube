import React from 'react'
import { useSelector } from 'react-redux'

function MyChannelSubedPage() {

  const subscribedChannels = useSelector((state) => state.myChannel.myChannelSubscribedData)

  return (
    <>

      <div class="flex flex-col gap-y-4 py-4">
        <div class=" relative mb-2 rounded-lg bg-white py-2 pl-8 pr-3 text-black">
          <span class="absolute left-2 top-1/2 -translate-y-1/2 text-gray-400">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="2"
              stroke="currentColor"
              aria-hidden="true"
              class="h-5 w-5"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
              ></path>
            </svg>
          </span>
          <input
            class="w-full bg-transparent outline-none"
            placeholder="Search"
          />
        </div>

        {subscribedChannels ? (
          subscribedChannels.map((subs) => (
            <div class="border border-red-500 flex w-full justify-between">
              <div class="flex items-center gap-x-2">
                <div class="h-14 w-14 shrink-0">
                  <img
                    src={subs.avatar}
                    alt="Code Master"
                    class="h-full w-full rounded-full"
                  />
                </div>
                <div class="block">
                  <h6 class="font-semibold">{subs.fullName}</h6>
                  <p class="text-sm text-gray-300">{subs.subcriberCount} Subscribers</p>
                </div>
              </div>
              <div class="block">
                <button class="group/btn px-3 py-2 text-black bg-[#ae7aff] focus:bg-white">
                  <span class="group-focus/btn:hidden">Subscribed</span>
                  <span class="hidden group-focus/btn:inline">
                    Subscribe
                  </span>
                </button>
              </div>
            </div>))
        ) : (<></>)}


      </div>
    </>
  )
}

export default MyChannelSubedPage
