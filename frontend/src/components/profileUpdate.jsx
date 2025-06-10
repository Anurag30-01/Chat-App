import React, { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useAuthContext } from "../context/AuthContext"; // Assuming you have an AuthContext to manage user state
function ProfileUpdate({ user, onClose, onUpdate }) {
  const [fullName, setFullName] = useState(user.fullName || "");
  const [username, setUsername] = useState(user.username || "");
  const [profilePic, setProfilePic] = useState(null);
  const [preview, setPreview] = useState(user.profilePic || "");
  const { setAuthUser } = useAuthContext(); // Assuming you have a context to manage auth user
  const [loading, setLoading] = useState(false);
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setProfilePic(file);
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("fullName", fullName?.trim() || "");
    formData.append("username", username?.trim() || "");

    if (profilePic) formData.append("profilePic", profilePic);
    setLoading(true);
    try {
      const res = await axios.put(
        // "http://localhost:5000/api/users/update-profile",
        "https://chat-app-7mt7.onrender.com/api/users/update-profile",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          withCredentials: true,
        }
      );
      // ✅ Update localStorage
    localStorage.setItem("chat-user", JSON.stringify(res.data));

    // ✅ Update context
    setAuthUser(res.data);
      toast.success("Profile updated successfully ✅");
      onUpdate(res.data);
    } catch (err) {
      toast.error("Profile not updated ❌");
      console.error("Profile update failed:", err);
    }finally{
      setLoading(false);
       // Close the modal after submission
    }
  };

  return (
    <div className="bg-gray-900 text-white p-6 rounded-lg shadow-xl w-full max-w-md">
      <h2 className="text-xl font-semibold mb-4 text-center">Update Profile</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Profile Picture Preview */}
        <div className="flex flex-col items-center">
          <div className="w-24 h-24 rounded-full overflow-hidden border-2 border-gray-500 mb-4">
            <img
              src={preview || "/default-avatar.png"}
              alt="Preview"
              className="w-full h-full object-cover"
            />
          </div>
          <label className="text-sm mb-4">Change Profile Picture</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className=" text-sm text-gray-300 file:cursor-pointer file:mr-2 file:py-1 file:px-3 file:rounded file:border "
          />
        </div>

        {/* Full Name */}
         <div>
          <label className="block text-sm font-medium mb-1">Full Name</label>
          <input
            type="text"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            placeholder="Enter full name"
            className="w-full p-2 bg-gray-800 border border-gray-700 rounded text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        
        <div>
          <label className="block text-sm font-medium mb-1">Username</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Enter username"
            className="w-full p-2 bg-gray-800 border border-gray-700 rounded text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Buttons */}
        <div className="flex justify-end space-x-2 pt-4">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700 transition"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-cyan-600 text-white rounded hover:bg-cyan-700 transition"
          >
            {loading?<span className="loader"></span>:<p>Update</p>}
          </button>
        </div>
      </form>
    </div>
  );
}

export default ProfileUpdate;
