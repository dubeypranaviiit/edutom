// "use client";

// import { useEffect, useState } from "react";
// import { useUser } from "@clerk/nextjs";
// import { FaUser, FaEnvelope, FaPhone, FaEdit, FaSave, FaVenusMars } from "react-icons/fa";
// import axios from "axios";

// const Page = () => {
//   const { user } = useUser();
//   const [profileData, setProfileData] = useState({
//     fullName: "",
//     email: "",
//     phone: "",
//     gender: ""
//   });

//   const [isEditing, setIsEditing] = useState(false);
//   const [errors, setErrors] = useState({});

//   useEffect(() => {
//     if (user?.id) {
//      axios
//   .get(`/api/users?clerkUserId=${user.id}`)
//   .then((res) => {
//     const { name, email, phone, gender } = res.data.user || {};
//     setProfileData({
//       fullName: name || "",
//       email: email || "",
//       phone: phone || "",
//       gender: gender || ""
//     });
//   })
//   .catch((err) => console.error("Error fetching user data:", err));
//     }
//   }, [user]);

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setProfileData((prev) => ({ ...prev, [name]: value }));
//   };

//   const validateForm = () => {
//     const newErrors = {};
//     if (!profileData.fullName.trim()) newErrors.fullName = "Full name is required";
//     setErrors(newErrors);
//     return Object.keys(newErrors).length === 0;
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!validateForm()) return;
//     try {
//       await axios.put("/api/users", {
//         clerkUserId: user.id,
//         name: profileData.fullName,
//         phone: profileData.phone,
//         gender: profileData.gender
//       });
//       setIsEditing(false);
//       alert("Profile updated successfully");
//     } catch (err) {
//       console.error("Error updating profile:", err);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-white text-black py-12 px-4 sm:px-6 lg:px-8">
//       <div className="max-w-3xl mx-auto">
//         <div className="bg-white shadow-xl rounded-lg overflow-hidden">
//           <div className="bg-gradient-to-r from-blue-500 to-blue-600 px-8 py-10 relative">
//             <div className="text-white text-center">
//               <h2 className="text-2xl font-semibold">{profileData.fullName || "Your Name"}</h2>
//               <p>{profileData.email}</p>
//             </div>
//             <button
//               onClick={() => setIsEditing(!isEditing)}
//               className="absolute top-4 right-4 text-white hover:text-gray-200"
//             >
//               <FaEdit className="text-xl" />
//             </button>
//           </div>

//           <form onSubmit={handleSubmit} className="p-8">
//             <div className="space-y-6">
//               <div>
//                 <label className="flex items-center text-gray-700 mb-2">
//                   <FaUser className="mr-2" /> Full Name
//                 </label>
//                 <input
//                   type="text"
//                   name="fullName"
//                   value={profileData.fullName}
//                   onChange={handleInputChange}
//                   disabled={!isEditing}
//                   className={`w-full p-3 border rounded-lg ${errors.fullName ? 'border-red-500' : 'border-gray-300'} ${!isEditing && 'bg-gray-50'}`}
//                 />
//                 {errors.fullName && <p className="text-red-500 text-sm mt-1">{errors.fullName}</p>}
//               </div>

//               <div>
//                 <label className="flex items-center text-gray-700 mb-2">
//                   <FaEnvelope className="mr-2" /> Email
//                 </label>
//                 <input
//                   type="email"
//                   name="email"
//                   value={profileData.email}
//                   disabled
//                   className="w-full p-3 border rounded-lg bg-gray-100"
//                 />
//               </div>

//               <div>
//                 <label className="flex items-center text-gray-700 mb-2">
//                   <FaPhone className="mr-2" /> Phone
//                 </label>
//                 <input
//                   type="tel"
//                   name="phone"
//                   value={profileData.phone}
//                   onChange={handleInputChange}
//                   disabled={!isEditing}
//                   className="w-full p-3 border rounded-lg border-gray-300"
//                 />
//               </div>

//               <div>
//                 <label className="flex items-center text-gray-700 mb-2">
//                   <FaVenusMars className="mr-2" /> Gender
//                 </label>
//                 <div className="flex space-x-6">
//                   {["Male", "Female", "Transgender"].map((option) => (
//                     <label key={option} className="flex items-center space-x-2">
//                       <input
//                         type="radio"
//                         name="gender"
//                         value={option}
//                         checked={profileData.gender === option}
//                         onChange={handleInputChange}
//                         disabled={!isEditing}
//                       />
//                       <span>{option}</span>
//                     </label>
//                   ))}
//                 </div>
//               </div>

//               {isEditing && (
//                 <button
//                   type="submit"
//                   className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 transition duration-300 flex items-center justify-center"
//                 >
//                   <FaSave className="mr-2" /> Save Changes
//                 </button>
//               )}
//             </div>
//           </form>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Page;
"use client";

import { useEffect, useState } from "react";
import { useUser } from "@clerk/nextjs";
import {
  FaUser,
  FaEnvelope,
  FaPhone,
  FaEdit,
  FaSave,
  FaVenusMars,
} from "react-icons/fa";
import { useUserStore } from "@/store/userStore";

const ProfilePage = () => {
  const { user: clerkUser } = useUser();
  const { user, fetchUser, updateUser, loading } = useUserStore();

  const [profileData, setProfileData] = useState({
    fullName: "",
    email: "",
    phone: "",
    gender: "",
  });
  const [isEditing, setIsEditing] = useState(false);
  const [errors, setErrors] = useState({});

  // fetch from zustand when logged in
  useEffect(() => {
    if (clerkUser?.id) {
      fetchUser(clerkUser.id);
    }
  }, [clerkUser?.id, fetchUser]);

  // sync zustand user → local state
  useEffect(() => {
    if (user) {
      setProfileData({
        fullName: user.name || "",
        email: user.email || "",
        phone: user.phone || "",
        gender: user.gender || "",
      });
    }
  }, [user]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfileData((prev) => ({ ...prev, [name]: value }));
  };

  const validateForm = () => {
    const newErrors = {};
    if (!profileData.fullName.trim())
      newErrors.fullName = "Full name is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    if (!clerkUser?.id) return;

    await updateUser(clerkUser.id, {
      name: profileData.fullName,
      phone: profileData.phone,
      gender: profileData.gender,
    });

    setIsEditing(false);
    alert("Profile updated successfully");
  };

  return (
    <div className="min-h-screen bg-white text-black py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="bg-white shadow-xl rounded-lg overflow-hidden">
          <div className="bg-gradient-to-r from-blue-500 to-blue-600 px-8 py-10 relative">
            <div className="text-white text-center">
              <h2 className="text-2xl font-semibold">
                {profileData.fullName || "Your Name"}
              </h2>
              <p>{profileData.email}</p>
            </div>
            <button
              onClick={() => setIsEditing(!isEditing)}
              className="absolute top-4 right-4 text-white hover:text-gray-200"
            >
              <FaEdit className="text-xl" />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="p-8">
            <div className="space-y-6">
              {/* Full Name */}
              <div>
                <label className="flex items-center text-gray-700 mb-2">
                  <FaUser className="mr-2" /> Full Name
                </label>
                <input
                  type="text"
                  name="fullName"
                  value={profileData.fullName}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                  className={`w-full p-3 border rounded-lg ${
                    errors.fullName ? "border-red-500" : "border-gray-300"
                  } ${!isEditing && "bg-gray-50"}`}
                />
                {errors.fullName && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.fullName}
                  </p>
                )}
              </div>

              {/* Email */}
              <div>
                <label className="flex items-center text-gray-700 mb-2">
                  <FaEnvelope className="mr-2" /> Email
                </label>
                <input
                  type="email"
                  name="email"
                  value={profileData.email}
                  disabled
                  className="w-full p-3 border rounded-lg bg-gray-100"
                />
              </div>

              {/* Phone */}
              <div>
                <label className="flex items-center text-gray-700 mb-2">
                  <FaPhone className="mr-2" /> Phone
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={profileData.phone}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                  className="w-full p-3 border rounded-lg border-gray-300"
                />
              </div>

              {/* Gender */}
              <div>
                <label className="flex items-center text-gray-700 mb-2">
                  <FaVenusMars className="mr-2" /> Gender
                </label>
                <div className="flex space-x-6">
                  {["Male", "Female", "Transgender"].map((option) => (
                    <label key={option} className="flex items-center space-x-2">
                      <input
                        type="radio"
                        name="gender"
                        value={option}
                        checked={profileData.gender === option}
                        onChange={handleInputChange}
                        disabled={!isEditing}
                      />
                      <span>{option}</span>
                    </label>
                  ))}
                </div>
              </div>

              {isEditing && (
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 transition duration-300 flex items-center justify-center"
                >
                  <FaSave className="mr-2" />{" "}
                  {loading ? "Saving..." : "Save Changes"}
                </button>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
