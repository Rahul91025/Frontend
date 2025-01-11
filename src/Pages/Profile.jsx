// Import necessary libraries
import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../Context/ShopContext";

function AccountPage() {
  const { token } = useContext(ShopContext);
  const [profileImage, setProfileImage] = useState(null);
  const [userData, setUserData] = useState({
    fullName: "Name",
    mobileNumber: "79033xxxxx",
    email: "- not added -",
    gender: "MALE",
    dob: "- not added -",
    location: "- not added -",
    alternateMobile: "- not added -",
    hintName: "- not added -",
  });
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem("userData"));
    if (storedData) {
      setUserData(storedData);
    }
  }, []);

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setProfileImage(imageUrl);
    }
  };

  const handleEditToggle = () => {
    if (isEditing) {
      localStorage.setItem("userData", JSON.stringify(userData));
    }
    setIsEditing(!isEditing);
  };

  const handleChange = (field, value) => {
    setUserData((prevData) => ({ ...prevData, [field]: value }));
  };

  return (
    <div className="flex items-center justify-center bg-gray-100 h-screen">
      {/* Profile Box */}
      <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md">
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
          {Object.keys(userData).map((key) => (
            <div key={key} className="mb-4 flex justify-between">
              <span className="font-bold capitalize">
                {key.replace(/([A-Z])/g, " $1")}:
              </span>
              {isEditing ? (
                <input
                  type="text"
                  value={userData[key]}
                  onChange={(e) => handleChange(key, e.target.value)}
                  className="border border-gray-300 rounded px-2"
                />
              ) : (
                <span>{userData[key]}</span>
              )}
            </div>
          ))}
          <button
            onClick={handleEditToggle}
            className="bg-black text-white w-full py-2 rounded mt-4 hover:bg-gray-800"
          >
            {isEditing ? "Save" : "Edit"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default AccountPage;
