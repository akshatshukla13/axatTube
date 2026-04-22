import { resetUploadedVideo } from "@/app/slices/videoSlice";
import { useDispatch, useSelector } from "react-redux";

function UploadedSuccess({ uploadMeta, onClose }) {
  const uploaded = useSelector((state) => state.video.uploadedVideo);
  const dispatch = useDispatch();

  const changeVisibility = () => {
    dispatch(resetUploadedVideo());
    onClose?.();
  };

  if (!uploaded) return null;

  return (
    <div className="absolute inset-x-0 top-0 z-10 flex h-[calc(100vh-66px)] items-center justify-center bg-black/50 px-4 pb-[86px] pt-4 sm:h-[calc(100vh-82px)] sm:px-14 sm:py-8">
      <div className="w-full max-w-lg overflow-auto rounded-lg border border-gray-700 bg-[#121212] p-4">
        <div className="mb-4 flex items-start justify-between">
          <h2 className="text-xl font-semibold">
            Uploaded Video
            <span className="block text-sm text-gray-300">Your video is now live.</span>
          </h2>
          <button className="h-6 w-6" onClick={changeVisibility}>
            ✕
          </button>
        </div>
        <div className="mb-6 border p-3">
          <h6>{uploadMeta?.fileName || uploadMeta?.title || "Uploaded video"}</h6>
          <p className="text-sm text-gray-300">
            {typeof uploadMeta?.fileSize === "number"
              ? `${(uploadMeta.fileSize / (1024 * 1024)).toFixed(2)} MB`
              : "Upload complete"}
          </p>
          <p className="mt-2 text-sm text-[#ae7aff]">Uploaded successfully</p>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <button onClick={changeVisibility} className="border px-4 py-3">
            Close
          </button>
          <button onClick={changeVisibility} className="bg-[#ae7aff] px-4 py-3 text-black">
            Done
          </button>
        </div>
      </div>
    </div>
  );
}

export default UploadedSuccess;
