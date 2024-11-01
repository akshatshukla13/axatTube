import { LogedOutUser, resetAuthData } from '@/app/slices/authSlice';
import { fetchUserDetails, resetUserData } from '@/app/slices/userSlice';
import React from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

function Setting() {

    const navigate = useNavigate()
    const dispatch = useDispatch()

    const handleLogOut = () => {
        dispatch(LogedOutUser())
        // dispatch(resetAuthData())
        navigate("/")
        location.reload()
    }

    return (
        <div className="bg-[#121212] text-white min-h-screen p-6 font-sans">
            <h1 className="text-3xl font-bold mb-4">Settings</h1>
            <p className="mb-6 text-gray-400">Manage your account settings and preferences.</p>

            <div className="mt-8">
                <button onClick={handleLogOut} className="bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-4 rounded">
                    Logout
                </button>
            </div>
        </div>
    );
}

export default Setting;
