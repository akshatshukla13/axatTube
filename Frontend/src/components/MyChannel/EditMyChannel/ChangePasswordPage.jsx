import React from "react";
import { useNavigate, useParams } from "react-router-dom";

function ChangePasswordPage() {
  const { username } = useParams();
  const navigate = useNavigate();

  return (
    <section className="w-full bg-[#121212] p-6 text-white">
      <div className="mx-auto max-w-3xl rounded-lg border border-gray-700 bg-[#1a1a1a] p-6">
        <h2 className="mb-2 text-2xl font-semibold">Change Password</h2>
        <p className="mb-4 text-sm text-gray-300">
          Password updates are available in Settings.
        </p>
        <button
          onClick={() => navigate(`/@/${username}/setting`)}
          className="rounded bg-[#ae7aff] px-4 py-2 font-semibold text-black"
        >
          Open Settings
        </button>
      </div>
    </section>
  );
}

export default ChangePasswordPage;
