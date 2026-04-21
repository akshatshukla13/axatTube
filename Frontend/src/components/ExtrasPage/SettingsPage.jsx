import React, { useState, useRef } from "react";
import axios from "axios";
import API_BASE_URL from "@/config/api.config";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import {
  validatePassword,
  validateEmail,
  validateFullName,
  validateUsername,
} from "@/utils/validation";

function SettingsPage() {
  const currentUser = useSelector((state) => state.auth.data);

  // Password Change State
  const [showPasswordForm, setShowPasswordForm] = useState(false);
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoadingPassword, setIsLoadingPassword] = useState(false);

  // Profile Update State
  const [showProfileForm, setShowProfileForm] = useState(false);
  const [email, setEmail] = useState(currentUser?.email || "");
  const [fullName, setFullName] = useState(currentUser?.fullName || "");
  const [userName, setUserName] = useState(currentUser?.userName || "");
  const [isLoadingProfile, setIsLoadingProfile] = useState(false);

  // Avatar & Cover State
  const [avatarFile, setAvatarFile] = useState(null);
  const [coverFile, setCoverFile] = useState(null);
  const [avatarPreview, setAvatarPreview] = useState(currentUser?.avatar || "");
  const [coverPreview, setCoverPreview] = useState(currentUser?.coverImage || "");
  const [isLoadingAvatar, setIsLoadingAvatar] = useState(false);
  const [isLoadingCover, setIsLoadingCover] = useState(false);

  const avatarInputRef = useRef(null);
  const coverInputRef = useRef(null);

  const handlePasswordChange = async (e) => {
    e.preventDefault();

    if (!oldPassword.trim()) {
      toast.error("Please enter your current password");
      return;
    }

    if (!validatePassword(newPassword)) {
      toast.error("New password must be at least 6 characters");
      return;
    }

    if (newPassword !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    if (oldPassword === newPassword) {
      toast.error("New password must be different from the current password");
      return;
    }

    setIsLoadingPassword(true);
    try {
      const response = await axios.post(
        `${API_BASE_URL}/users/change-password`,
        { oldPassword, newPassword },
        { withCredentials: true }
      );

      if (response.status === 200) {
        toast.success("Password changed successfully!");
        setOldPassword("");
        setNewPassword("");
        setConfirmPassword("");
        setShowPasswordForm(false);
      }
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Failed to change password"
      );
      console.error(error);
    } finally {
      setIsLoadingPassword(false);
    }
  };

  const handleProfileUpdate = async (e) => {
    e.preventDefault();

    if (!validateEmail(email)) {
      toast.error("Please enter a valid email address");
      return;
    }

    if (!validateFullName(fullName)) {
      toast.error("Full name must be at least 2 characters");
      return;
    }

    if (!validateUsername(userName)) {
      toast.error("Username must be 3-20 alphanumeric characters");
      return;
    }

    setIsLoadingProfile(true);
    try {
      const response = await axios.patch(
        `${API_BASE_URL}/users/update-account`,
        { email, fullName, userName },
        { withCredentials: true }
      );

      if (response.status === 200) {
        toast.success("Profile updated successfully!");
        setShowProfileForm(false);
      }
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Failed to update profile"
      );
      console.error(error);
    } finally {
      setIsLoadingProfile(false);
    }
  };

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setAvatarFile(file);
      setAvatarPreview(URL.createObjectURL(file));
    }
  };

  const handleUploadAvatar = async () => {
    if (!avatarFile) {
      toast.error("Please select an avatar image");
      return;
    }

    setIsLoadingAvatar(true);
    try {
      const formData = new FormData();
      formData.append("avatar", avatarFile);

      const response = await axios.patch(
        `${API_BASE_URL}/users/avatar`,
        formData,
        { withCredentials: true, headers: { "Content-Type": "multipart/form-data" } }
      );

      if (response.status === 200) {
        toast.success("Avatar updated successfully!");
        setAvatarFile(null);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to upload avatar");
      console.error(error);
    } finally {
      setIsLoadingAvatar(false);
    }
  };

  const handleCoverChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setCoverFile(file);
      setCoverPreview(URL.createObjectURL(file));
    }
  };

  const handleUploadCover = async () => {
    if (!coverFile) {
      toast.error("Please select a cover image");
      return;
    }

    setIsLoadingCover(true);
    try {
      const formData = new FormData();
      formData.append("coverImage", coverFile);

      const response = await axios.patch(
        `${API_BASE_URL}/users/coverImage`,
        formData,
        { withCredentials: true, headers: { "Content-Type": "multipart/form-data" } }
      );

      if (response.status === 200) {
        toast.success("Cover image updated successfully!");
        setCoverFile(null);
      }
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Failed to upload cover image"
      );
      console.error(error);
    } finally {
      setIsLoadingCover(false);
    }
  };

  return (
    <div className="h-screen overflow-y-auto bg-[#121212] text-white">
      <div className="mx-auto max-w-4xl px-4 py-8">
        <h1 className="mb-8 text-3xl font-bold">Settings</h1>

        {/* Avatar Section */}
        <div className="mb-8 rounded-lg border border-gray-700 p-6">
          <h2 className="mb-4 text-xl font-semibold">Profile Picture</h2>
          <div className="flex items-center gap-6">
            <div className="h-24 w-24 overflow-hidden rounded-full bg-gray-700">
              {avatarPreview && <img src={avatarPreview} alt="Avatar" className="h-full w-full object-cover" />}
            </div>
            <div className="flex-1">
              <button
                onClick={() => avatarInputRef.current?.click()}
                className="mb-2 rounded-lg bg-[#ae7aff] px-4 py-2 font-semibold text-black transition hover:bg-[#9d68d4]"
              >
                Choose Avatar
              </button>
              {avatarFile && (
                <button
                  onClick={handleUploadAvatar}
                  disabled={isLoadingAvatar}
                  className="ml-2 rounded-lg bg-green-600 px-4 py-2 font-semibold transition hover:bg-green-700 disabled:opacity-50"
                >
                  {isLoadingAvatar ? "Uploading..." : "Upload"}
                </button>
              )}
              <input
                ref={avatarInputRef}
                type="file"
                accept="image/*"
                onChange={handleAvatarChange}
                className="hidden"
              />
              <p className="mt-2 text-sm text-gray-400">PNG, JPG up to 10MB</p>
            </div>
          </div>
        </div>

        {/* Cover Image Section */}
        <div className="mb-8 rounded-lg border border-gray-700 p-6">
          <h2 className="mb-4 text-xl font-semibold">Cover Image</h2>
          {coverPreview && (
            <img src={coverPreview} alt="Cover" className="mb-4 h-40 w-full rounded-lg object-cover" />
          )}
          <div className="flex gap-2">
            <button
              onClick={() => coverInputRef.current?.click()}
              className="rounded-lg bg-[#ae7aff] px-4 py-2 font-semibold text-black transition hover:bg-[#9d68d4]"
            >
              Choose Cover Image
            </button>
            {coverFile && (
              <button
                onClick={handleUploadCover}
                disabled={isLoadingCover}
                className="rounded-lg bg-green-600 px-4 py-2 font-semibold transition hover:bg-green-700 disabled:opacity-50"
              >
                {isLoadingCover ? "Uploading..." : "Upload"}
              </button>
            )}
          </div>
          <input
            ref={coverInputRef}
            type="file"
            accept="image/*"
            onChange={handleCoverChange}
            className="hidden"
          />
          <p className="mt-2 text-sm text-gray-400">PNG, JPG up to 10MB</p>
        </div>

        {/* Profile Information Section */}
        <div className="mb-8 rounded-lg border border-gray-700 p-6">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-xl font-semibold">Profile Information</h2>
            {!showProfileForm && (
              <button
                onClick={() => setShowProfileForm(true)}
                className="rounded-lg bg-[#ae7aff] px-4 py-2 text-sm font-semibold text-black transition hover:bg-[#9d68d4]"
              >
                Edit
              </button>
            )}
          </div>

          {showProfileForm ? (
            <form onSubmit={handleProfileUpdate}>
              <div className="mb-4">
                <label htmlFor="email" className="mb-2 block text-sm font-semibold">
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full rounded-lg border border-gray-600 bg-transparent px-3 py-2 outline-none focus:border-[#ae7aff]"
                />
              </div>

              <div className="mb-4">
                <label htmlFor="fullName" className="mb-2 block text-sm font-semibold">
                  Full Name
                </label>
                <input
                  id="fullName"
                  type="text"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="w-full rounded-lg border border-gray-600 bg-transparent px-3 py-2 outline-none focus:border-[#ae7aff]"
                />
              </div>

              <div className="mb-4">
                <label htmlFor="userName" className="mb-2 block text-sm font-semibold">
                  Username
                </label>
                <input
                  id="userName"
                  type="text"
                  value={userName}
                  onChange={(e) => setUserName(e.target.value)}
                  className="w-full rounded-lg border border-gray-600 bg-transparent px-3 py-2 outline-none focus:border-[#ae7aff]"
                />
              </div>

              <div className="flex gap-2">
                <button
                  type="submit"
                  disabled={isLoadingProfile}
                  className="rounded-lg bg-[#ae7aff] px-4 py-2 font-semibold text-black transition hover:bg-[#9d68d4] disabled:opacity-50"
                >
                  {isLoadingProfile ? "Saving..." : "Save Changes"}
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setShowProfileForm(false);
                    setEmail(currentUser?.email || "");
                    setFullName(currentUser?.fullName || "");
                    setUserName(currentUser?.userName || "");
                  }}
                  className="rounded-lg border border-gray-600 px-4 py-2 font-semibold transition hover:bg-white/10"
                >
                  Cancel
                </button>
              </div>
            </form>
          ) : (
            <div className="space-y-2 text-gray-300">
              <p>
                <span className="font-semibold">Email:</span> {currentUser?.email}
              </p>
              <p>
                <span className="font-semibold">Full Name:</span> {currentUser?.fullName}
              </p>
              <p>
                <span className="font-semibold">Username:</span> @{currentUser?.userName}
              </p>
            </div>
          )}
        </div>

        {/* Password Section */}
        <div className="rounded-lg border border-gray-700 p-6">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-xl font-semibold">Password</h2>
            {!showPasswordForm && (
              <button
                onClick={() => setShowPasswordForm(true)}
                className="rounded-lg bg-[#ae7aff] px-4 py-2 text-sm font-semibold text-black transition hover:bg-[#9d68d4]"
              >
                Change Password
              </button>
            )}
          </div>

          {showPasswordForm && (
            <form onSubmit={handlePasswordChange}>
              <div className="mb-4">
                <label htmlFor="oldPassword" className="mb-2 block text-sm font-semibold">
                  Current Password
                </label>
                <input
                  id="oldPassword"
                  type="password"
                  value={oldPassword}
                  onChange={(e) => setOldPassword(e.target.value)}
                  className="w-full rounded-lg border border-gray-600 bg-transparent px-3 py-2 outline-none focus:border-[#ae7aff]"
                />
              </div>

              <div className="mb-4">
                <label htmlFor="newPassword" className="mb-2 block text-sm font-semibold">
                  New Password
                </label>
                <input
                  id="newPassword"
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="w-full rounded-lg border border-gray-600 bg-transparent px-3 py-2 outline-none focus:border-[#ae7aff]"
                />
                <p className="mt-1 text-xs text-gray-400">Minimum 6 characters</p>
              </div>

              <div className="mb-4">
                <label htmlFor="confirmPassword" className="mb-2 block text-sm font-semibold">
                  Confirm New Password
                </label>
                <input
                  id="confirmPassword"
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full rounded-lg border border-gray-600 bg-transparent px-3 py-2 outline-none focus:border-[#ae7aff]"
                />
              </div>

              <div className="flex gap-2">
                <button
                  type="submit"
                  disabled={isLoadingPassword}
                  className="rounded-lg bg-[#ae7aff] px-4 py-2 font-semibold text-black transition hover:bg-[#9d68d4] disabled:opacity-50"
                >
                  {isLoadingPassword ? "Updating..." : "Update Password"}
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setShowPasswordForm(false);
                    setOldPassword("");
                    setNewPassword("");
                    setConfirmPassword("");
                  }}
                  className="rounded-lg border border-gray-600 px-4 py-2 font-semibold transition hover:bg-white/10"
                >
                  Cancel
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}

export default SettingsPage;
