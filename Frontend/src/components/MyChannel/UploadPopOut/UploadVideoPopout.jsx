import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { uplaodVideo } from "@/app/slices/videoSlice";
import { toast } from "react-toastify";

function UploadVideoPopout({ isOpen, onClose, onUploadStart }) {
  const [videoFile, setVideoFile] = useState(null);
  const [videoURL, setVideoURL] = useState(null);
  const [thumbnailFile, setThumbnailFile] = useState(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const dispatch = useDispatch();
  const isUploading = useSelector((state) => state.video.isLoading);

  useEffect(() => {
    return () => {
      if (videoURL) {
        URL.revokeObjectURL(videoURL);
      }
    };
  }, [videoURL]);

  const handleVideoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (videoURL) {
        URL.revokeObjectURL(videoURL);
      }
      setVideoFile(file);
      setVideoURL(URL.createObjectURL(file));
    }
  };

  const handleCancel = () => {
    if (videoURL) {
      URL.revokeObjectURL(videoURL);
    }
    setVideoFile(null);
    setVideoURL(null);
  };

  const uploadToDB = async (e) => {
    e.preventDefault();

    if (!videoFile) {
      toast.error("Please select a video file");
      return;
    }
    if (!thumbnailFile) {
      toast.error("Please select a thumbnail image");
      return;
    }
    if (!title.trim()) {
      toast.error("Please enter a video title");
      return;
    }
    if (!description.trim()) {
      toast.error("Please enter a video description");
      return;
    }

    const formData = new FormData();
    formData.append("videoFile", videoFile);
    formData.append("thumbnail", thumbnailFile);
    formData.append("title", title);
    formData.append("description", description);

    onUploadStart?.({
      fileName: videoFile.name,
      fileSize: videoFile.size,
      title,
    });

    try {
      await dispatch(uplaodVideo({ formData })).unwrap();
      toast.success("Video uploaded successfully!");
      onClose?.();
      handleCancel();
      setThumbnailFile(null);
      setTitle("");
      setDescription("");
    } catch (error) {
      toast.error(error?.response?.data?.message || "Failed to upload video");
    }
  };

  if (!isOpen) return null;

  return (
    <>
      <div className="absolute inset-0 z-10 bg-black/50 px-4 pb-[86px] pt-4 sm:px-14 sm:py-8">
        <div className="h-auto overflow-auto border bg-[#121212]">
          <div className="flex items-center justify-between border-b p-4">
            <h2 className="text-xl font-semibold">Upload Videos</h2>
            <button
              onClick={uploadToDB}
              disabled={isUploading}
              className="group/btn mr-1 flex w-auto items-center gap-x-2 bg-[#ae7aff] px-3 py-2 text-center font-bold text-black shadow-[5px_5px_0px_0px_#4f4e4e] transition-all duration-150 ease-in-out disabled:cursor-not-allowed disabled:opacity-70 active:translate-x-[5px] active:translate-y-[5px] active:shadow-[0px_0px_0px_0px_#4f4e4e]"
            >
              {isUploading ? "Uploading..." : "Save"}
            </button>
            <button
              onClick={onClose}
              disabled={isUploading}
              className="group/btn mr-1 flex w-auto items-center gap-x-2 bg-[#ae7aff] px-3 py-2 text-center font-bold text-black shadow-[5px_5px_0px_0px_#4f4e4e] transition-all duration-150 ease-in-out active:translate-x-[5px] active:translate-y-[5px] active:shadow-[0px_0px_0px_0px_#4f4e4e]"
            >
              Cancel
            </button>
          </div>
          <div className="mx-auto flex w-full max-w-3xl flex-col gap-y-4 p-4">
            <div className="w-full border-2 border-dashed px-4 py-12 text-center">
              {!videoURL ? (
                <>
                  <span className="mb-4 inline-block w-24 rounded-full bg-[#E4D3FF] p-4 text-[#AE7AFF]">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                      aria-hidden="true"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5"
                      ></path>
                    </svg>
                  </span>
                  <h6 className="mb-2 font-semibold">Drag and drop video files to upload</h6>
                  <p className="text-gray-400">
                    Your videos will be private until you publish them.
                  </p>
                  <label
                    htmlFor="upload-video"
                    className="group/btn mt-4 inline-flex w-auto cursor-pointer items-center gap-x-2 bg-[#ae7aff] px-3 py-2 text-center font-bold text-black shadow-[5px_5px_0px_0px_#4f4e4e] transition-all duration-150 ease-in-out active:translate-x-[5px] active:translate-y-[5px] active:shadow-[0px_0px_0px_0px_#4f4e4e]"
                  >
                    <input
                      type="file"
                      id="upload-video"
                      className="sr-only"
                      accept="video/*"
                      onChange={handleVideoChange}
                    />
                    Select Files
                  </label>
                </>
              ) : (
                <div id="video-preview" className="relative">
                  <video id="preview-video" controls className="w-full">
                    <source src={videoURL} type={videoFile?.type} />
                    Your browser does not support the video tag.
                  </video>
                  <button
                    onClick={handleCancel}
                    className="absolute top-0 right-0 mt-2 mr-2 bg-red-500 px-3 py-1 text-white rounded"
                  >
                    Cancel
                  </button>
                </div>
              )}
            </div>

            <div className="w-full">
              <label htmlFor="thumbnail" className="mb-1 inline-block">
                Thumbnail<sup>*</sup>
              </label>
              <input
                id="thumbnail"
                type="file"
                accept="image/*"
                onChange={(e) => setThumbnailFile(e.target.files?.[0] || null)}
                className="w-full border p-1 file:mr-4 file:border-none file:bg-[#ae7aff] file:px-3 file:py-1.5"
              />
            </div>
            <div className="w-full">
              <label htmlFor="title" className="mb-1 inline-block">
                Title<sup>*</sup>
              </label>
              <input
                id="title"
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full border bg-transparent px-2 py-1 outline-none"
              />
            </div>
            <div className="w-full">
              <label htmlFor="desc" className="mb-1 inline-block">
                Description<sup>*</sup>
              </label>
              <textarea
                id="desc"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="h-40 w-full resize-none border bg-transparent px-2 py-1 outline-none"
              ></textarea>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default UploadVideoPopout;
