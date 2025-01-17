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
    state: "",
    alternateMobile: "",
  });
  const [isEditing, setIsEditing] = useState(false);

  const statesWithCities = {
    Delhi: ["New Delhi", "Dwarka", "Karol Bagh"],
    Maharashtra: ["Mumbai", "Pune", "Nagpur"],
    Karnataka: ["Bangalore", "Mysore", "Mangalore"],
    Gujarat: ["Ahmedabad", "Surat", "Vadodara"],
    UttarPradesh: ["Lucknow", "Kanpur", "Varanasi"],
  };

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

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleEditToggle = () => {
    if (isEditing) {
      const requiredFields = [
        "fullName",
        "mobileNumber",
        "email",
        "gender",
        "dob",
        "pincode",
        "city",
        "state",
      ];
      let isValid = true;

      if (!validateEmail(userData.email)) {
        isValid = false;
        toast.error("Invalid email format!");
      }

      const mobileRegex = /^\d{10}$/;
      if (!mobileRegex.test(userData.mobileNumber)) {
        isValid = false;
        toast.error("Mobile number must be 10 digits!");
      }

      for (let field of requiredFields) {
        if (!userData[field]) {
          isValid = false;
          toast.error(`${field} is required!`);
          break;
        }
      }

      if (isValid) {
        localStorage.setItem("userData", JSON.stringify(userData));
        toast.success("Profile updated successfully!");
        setIsEditing(false);
      }
    } else {
      setIsEditing(true);
    }
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
          {Object.keys(userData).map((key) => (
            <div key={key} className="mb-4 flex justify-between items-center">
              <label className="font-bold capitalize">
                {key.replace(/([A-Z])/g, " $1")}
              </label>
              {isEditing ? (
                key === "dob" ? (
                  <DatePicker
                    selected={userData.dob ? new Date(userData.dob) : null}
                    onChange={(date) =>
                      handleChange(
                        "dob",
                        date ? date.toISOString().split("T")[0] : ""
                      )
                    }
                    dateFormat="yyyy-MM-dd"
                    className="border border-gray-300 rounded px-2"
                  />
                ) : key === "state" ? (
                  <select
                    value={userData.state}
                    onChange={(e) => handleChange("state", e.target.value)}
                    className="border border-gray-300 rounded px-2"
                  >
                    <option value="">Select State</option>
                    {Object.keys(statesWithCities).map((state) => (
                      <option key={state} value={state}>
                        {state}
                      </option>
                    ))}
                  </select>
                ) : key === "city" ? (
                  <select
                    value={userData.city}
                    onChange={(e) => handleChange("city", e.target.value)}
                    className="border border-gray-300 rounded px-2"
                    disabled={!userData.state}
                  >
                    <option value="">Select City</option>
                    {statesWithCities[userData.state]?.map((city) => (
                      <option key={city} value={city}>
                        {city}
                      </option>
                    ))}
                  </select>
                ) : (
                  <input
                    type="text"
                    value={userData[key]}
                    onChange={(e) => handleChange(key, e.target.value)}
                    className="border border-gray-300 rounded px-2"
                  />
                )
              ) : (
                <span>{userData[key] || "Not Provided"}</span>
              )}
            </div>
          ))}

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
