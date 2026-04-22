function About() {
  return (
    <section className="w-full bg-[#121212] px-4 py-8 text-white sm:ml-[70px] lg:ml-0">
      <div className="mx-auto max-w-4xl space-y-6 rounded-xl border border-gray-700 p-6">
        <h1 className="text-3xl font-bold text-[#ae7aff]">What is AxatTube?</h1>
        <p className="text-gray-200">
          AxatTube is a video-sharing platform where creators upload videos, build channels,
          and engage through likes, comments, playlists, and subscriptions.
        </p>
        <div className="grid gap-4 md:grid-cols-2">
          <div className="rounded-lg border border-gray-700 p-4">
            <h2 className="mb-2 text-lg font-semibold">For viewers</h2>
            <ul className="list-disc space-y-1 pl-5 text-sm text-gray-300">
              <li>Discover trending and recent videos</li>
              <li>Watch, like, and comment on content</li>
              <li>Track watch history and subscriptions</li>
            </ul>
          </div>
          <div className="rounded-lg border border-gray-700 p-4">
            <h2 className="mb-2 text-lg font-semibold">For creators</h2>
            <ul className="list-disc space-y-1 pl-5 text-sm text-gray-300">
              <li>Upload videos with thumbnail and metadata</li>
              <li>Manage your channel and content library</li>
              <li>Monitor engagement from your audience</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

export default About;
