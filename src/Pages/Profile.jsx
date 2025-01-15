import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../Context/ShopContext";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import toast, { Toaster } from "react-hot-toast";

function AccountPage() {
  const { token } = useContext(ShopContext);
  const [profileImage, setProfileImage] = useState(null);
  const [userData, setUserData] = useState({
    fullName: "",
    mobileNumber: "1234567890",
    email: "",
    gender: "MALE",
    dob: "",
    pincode: "110001",
    city: "",
    state: "Delhi",
    alternateMobile: "",
  });
  const [isEditing, setIsEditing] = useState(false);

  // Load data from localStorage on mount
  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem("userData"));
    const storedImage = localStorage.getItem(`profileImage-${token}`);
    if (storedData) {
      setUserData(storedData);
    }
    if (storedImage) {
      setProfileImage(storedImage);
    }
  }, [token]);

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        const base64Image = reader.result;
        setProfileImage(base64Image);
        localStorage.setItem(`profileImage-${token}`, base64Image);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleEditToggle = () => {
    // Check if any required field is empty
    if (
      !userData.fullName ||
      !userData.mobileNumber ||
      !userData.email ||
      !userData.dob ||
      !userData.pincode ||
      !userData.city ||
      !userData.state
    ) {
      toast.error("All fields are required!");
      return;
    }

    if (isEditing) {
      // Save user data to localStorage
      localStorage.setItem("userData", JSON.stringify(userData));
      toast.success("Profile updated successfully!");
    }
    setIsEditing(!isEditing);
  };

  const handleChange = (field, value) => {
    setUserData((prevData) => ({ ...prevData, [field]: value }));
  };

  return (
    <div className="flex items-center justify-center bg-gray-100 h-screen">
      <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md">
        <Toaster />
        <div className="flex flex-col items-center mb-6">
          <label
            htmlFor="profileImageInput"
            className="w-24 h-24 rounded-full bg-gray-200 overflow-hidden cursor-pointer"
          >
            {profileImage ? (
              <img
                src={profileImage}
                alt="Profile"
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="flex items-center justify-center w-full h-full text-gray-500">
                No Image
              </div>
            )}
          </label>
          <input
            id="profileImageInput"
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleImageChange}
          />
        </div>

        <h3 className="text-lg font-bold mb-4 text-center">Profile Details</h3>
        <hr className="border-gray-300 my-2" />
        <div className="border-t pt-4">
          {/* Full Name */}
          <div className="mb-4 flex justify-between items-center">
            <label className="font-bold">Full Name</label>
            {isEditing ? (
              <input
                type="text"
                value={userData.fullName}
                onChange={(e) => handleChange("fullName", e.target.value)}
                className="border border-gray-300 rounded px-2"
              />
            ) : (
              <span>{userData.fullName || "Not Provided"}</span>
            )}
          </div>

          {/* Mobile Number */}
          <div className="mb-4 flex justify-between items-center">
            <label className="font-bold">Mobile Number</label>
            {isEditing ? (
              <input
                type="text"
                value={userData.mobileNumber}
                onChange={(e) => handleChange("mobileNumber", e.target.value)}
                className="border border-gray-300 rounded px-2"
              />
            ) : (
              <span>{userData.mobileNumber || "Not Provided"}</span>
            )}
          </div>

          {/* Email */}
          <div className="mb-4 flex justify-between items-center">
            <label className="font-bold">Email</label>
            {isEditing ? (
              <input
                type="email"
                value={userData.email}
                onChange={(e) => handleChange("email", e.target.value)}
                className="border border-gray-300 rounded px-2"
              />
            ) : (
              <span>{userData.email || "Not Provided"}</span>
            )}
          </div>

          {/* Gender */}
          <div className="mb-4 flex justify-between items-center">
            <label className="font-bold">Gender</label>
            {isEditing ? (
              <select
                value={userData.gender}
                onChange={(e) => handleChange("gender", e.target.value)}
                className="border border-gray-300 rounded px-2"
              >
                <option value="MALE">Male</option>
                <option value="FEMALE">Female</option>
                <option value="OTHER">Other</option>
              </select>
            ) : (
              <span>{userData.gender}</span>
            )}
          </div>

          {/* Date of Birth */}
          <div className="mb-4 flex justify-between items-center">
            <label className="font-bold">Date of Birth</label>
            {isEditing ? (
              <DatePicker
                selected={userData.dob ? new Date(userData.dob) : null}
                onChange={(date) => handleChange("dob", date)}
                dateFormat="yyyy-MM-dd"
                className="border border-gray-300 rounded px-2"
              />
            ) : (
              <span>
                {userData.dob
                  ? new Date(userData.dob).toLocaleDateString()
                  : "Not Provided"}
              </span>
            )}
          </div>

          {/* Pincode */}
          <div className="mb-4 flex justify-between items-center">
            <label className="font-bold">Pincode</label>
            {isEditing ? (
              <input
                type="text"
                value={userData.pincode}
                onChange={(e) => handleChange("pincode", e.target.value)}
                className="border border-gray-300 rounded px-2"
              />
            ) : (
              <span>{userData.pincode || "Not Provided"}</span>
            )}
          </div>

          {/* City */}
          <div className="mb-4 flex justify-between items-center">
            <label className="font-bold">City</label>
            {isEditing ? (
              <input
                type="text"
                value={userData.city}
                onChange={(e) => handleChange("city", e.target.value)}
                className="border border-gray-300 rounded px-2"
              />
            ) : (
              <span>{userData.city || "Not Provided"}</span>
            )}
          </div>

          {/* State */}
          <div className="mb-4 flex justify-between items-center">
            <label className="font-bold">State</label>
            {isEditing ? (
              <input
                type="text"
                value={userData.state}
                onChange={(e) => handleChange("state", e.target.value)}
                className="border border-gray-300 rounded px-2"
              />
            ) : (
              <span>{userData.state || "Not Provided"}</span>
            )}
          </div>

          {/* Alternate Mobile */}
          <div className="mb-4 flex justify-between items-center">
            <label className="font-bold">Alternate Mobile</label>
            {isEditing ? (
              <input
                type="text"
                value={userData.alternateMobile}
                onChange={(e) =>
                  handleChange("alternateMobile", e.target.value)
                }
                className="border border-gray-300 rounded px-2"
              />
            ) : (
              <span>{userData.alternateMobile || "Not Provided"}</span>
            )}
          </div>

          <div className="mt-4 text-center">
            <button
              onClick={handleEditToggle}
              className="bg-blue-500 text-white px-4 py-2 rounded"
            >
              {isEditing ? "Save Changes" : "Edit Profile"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AccountPage;
