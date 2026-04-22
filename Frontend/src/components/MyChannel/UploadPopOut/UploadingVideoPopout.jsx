function UploadingVideoPopout({ uploadMeta, uploadProgress = 0, onClose }) {
  return (
    <div className="absolute inset-x-0 top-0 z-10 flex h-[calc(100vh-66px)] items-center justify-center bg-black/50 px-4 pb-[86px] pt-4 sm:h-[calc(100vh-82px)] sm:px-14 sm:py-8">
      <div className="w-full max-w-lg overflow-auto rounded-lg border border-gray-700 bg-[#121212] p-4">
        <div className="mb-4 flex items-start justify-between">
          <h2 className="text-xl font-semibold">
            Uploading Video...
            <span className="block text-sm text-gray-300">
              Your video is being processed securely.
            </span>
          </h2>
          <button className="h-6 w-6" onClick={onClose}>
            ✕
          </button>
        </div>
        <div className="mb-6 flex flex-col gap-3 border p-3">
          <h6 className="font-medium">{uploadMeta?.fileName || "Uploading video"}</h6>
          <p className="text-sm text-gray-300">
            {typeof uploadMeta?.fileSize === "number"
              ? `${(uploadMeta.fileSize / (1024 * 1024)).toFixed(2)} MB`
              : "Preparing upload..."}
          </p>
          <div className="h-2 overflow-hidden rounded bg-gray-800">
            <div
              className="h-full bg-[#ae7aff] transition-all duration-300"
              style={{ width: `${Math.min(Math.max(uploadProgress, 0), 100)}%` }}
            />
          </div>
          <p className="text-sm text-[#ae7aff]">{uploadProgress}% uploaded</p>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <button className="border px-4 py-3" onClick={onClose}>
            Close
          </button>
          <button className="bg-[#ae7aff] px-4 py-3 text-black" disabled>
            Uploading...
          </button>
        </div>
      </div>
    </div>
  );
}

export default UploadingVideoPopout;
