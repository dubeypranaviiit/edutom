// "use client";
// import { useEffect, useState } from "react";
// import { FaPlus, FaTrash, FaPencilAlt, FaStar } from "react-icons/fa";
// import axios from "axios";
// import { useUser } from "@clerk/nextjs";

// const initialForm = {
//   name: "",
//   address: "",
//   city: "",
//   state: "",
//   postalCode: "",
//   country: "",
//   phone: "",
//   alternatePhone: "",
//   email: "",
//   instructions: "",
//   isDefault: false,
// };

// export default function Address() {
//   const [addresses, setAddresses] = useState([]);
//   const [formData, setFormData] = useState(initialForm);
//   const [editing, setEditing] = useState(null);
//   const [modalOpen, setModalOpen] = useState(false);
//   const [deleteId, setDeleteId] = useState(null);

//   const { user } = useUser();

//   useEffect(() => {
//     if (user?.id) fetchAddresses();
//   }, [user]);

//   const fetchAddresses = async () => {
//     try {
//       const { data } = await axios.get(`/api/addresses?userId=${user.id}`);
//       setAddresses(data);
//     } catch (err) {
//       console.error(err);
//       alert("Failed to fetch addresses.");
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!user?.id) return alert("Login required.");

//     const payload = { ...formData, userId: user.id };

//     try {
//       if (editing) {
//         await axios.put("/api/addresses", { ...payload, _id: editing });
//       } else {
//         if (addresses.length >= 5) return alert("Maximum 5 addresses allowed.");
//         await axios.post("/api/addresses", payload);
//       }

//       setModalOpen(false);
//       setFormData(initialForm);
//       setEditing(null);
//       fetchAddresses();
//     } catch (err) {
//       const msg = err.response?.data?.message || "Error saving address.";
//       alert(msg);
//       console.error("Address save error:", err);
//     }
//   };

//   const handleDelete = async () => {
//     try {
//       await axios.delete(`/api/addresses?id=${deleteId}&userId=${user.id}`);
//       setDeleteId(null);
//       fetchAddresses();
//     } catch (err) {
//       alert("Delete failed.");
//       console.error("Delete error:", err);
//     }
//   };

//   return (
//     <div className="max-w-4xl mx-auto p-4">
//       <div className="flex justify-between items-center mb-6">
//         <h1 className="text-2xl font-bold">My Addresses</h1>
//         <button
//           onClick={() => {
//             setFormData(initialForm);
//             setModalOpen(true);
//           }}
//           className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded"
//         >
//           <FaPlus /> Add Address
//         </button>
//       </div>

//       {addresses.length === 0 ? (
//         <p>No addresses saved.</p>
//       ) : (
//         <div className="grid gap-4 grid-cols-1 md:grid-cols-2">
//           {addresses.map((addr) => (
//             <div key={addr._id} className="p-4 border rounded relative">
//               {addr.isDefault && (
//                 <span className="absolute top-2 right-2 text-yellow-500 flex items-center text-sm">
//                   <FaStar className="mr-1" /> Default
//                 </span>
//               )}
//               <h2 className="font-semibold text-lg">{addr.name}</h2>
//               <p>{addr.address}, {addr.city}, {addr.state}, {addr.postalCode}</p>
//               <p>{addr.country}</p>
//               <p>{addr.phone}</p>
//               {addr.email && <p>{addr.email}</p>}
//               {addr.instructions && <p className="italic text-sm text-gray-500">Note: {addr.instructions}</p>}
//               <div className="flex gap-2 mt-3">
//                 <button onClick={() => {
//                   setFormData(addr);
//                   setEditing(addr._id);
//                   setModalOpen(true);
//                 }} className="text-blue-600 hover:underline">
//                   <FaPencilAlt />
//                 </button>
//                 <button onClick={() => setDeleteId(addr._id)} className="text-red-600 hover:underline">
//                   <FaTrash />
//                 </button>
//               </div>
//             </div>
//           ))}
//         </div>
//       )}

//       {modalOpen && (
//         <div className="fixed inset-0 bg-white text-black bg-opacity-30 flex justify-center items-center z-50">
//           <div className="bg-white p-6 rounded w-full max-w-lg">
//             <h2 className="text-xl font-bold mb-4">{editing ? "Edit" : "Add"} Address</h2>
//             <form onSubmit={handleSubmit} className="space-y-3">
//               {Object.entries(initialForm).map(
//                 ([key]) =>
//                   key !== "isDefault" && (
//                     <input
//                       key={key}
//                       type="text"
//                       placeholder={key}
//                       value={formData[key] || ""}
//                       onChange={(e) =>
//                         setFormData({ ...formData, [key]: e.target.value })
//                       }
//                       className="w-full border p-2 rounded"
//                     />
//                   )
//               )}
//               <label className="flex items-center gap-2">
//                 <input
//                   type="checkbox"
//                   checked={formData.isDefault}
//                   onChange={(e) =>
//                     setFormData({
//                       ...formData,
//                       isDefault: e.target.checked,
//                     })
//                   }
//                 />
//                 Set as default address
//               </label>
//               <div className="flex justify-end gap-2">
//                 <button type="button" onClick={() => {
//                   setModalOpen(false);
//                   setEditing(null);
//                 }} className="px-4 py-2 border rounded">Cancel</button>
//                 <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded">{editing ? "Update" : "Save"}</button>
//               </div>
//             </form>
//           </div>
//         </div>
//       )}

//       {deleteId && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
//           <div className="bg-white p-6 rounded max-w-sm w-full">
//             <p>Are you sure you want to delete this address?</p>
//             <div className="flex justify-end gap-3 mt-4">
//               <button onClick={() => setDeleteId(null)} className="px-4 py-2 border rounded">Cancel</button>
//               <button onClick={handleDelete} className="px-4 py-2 bg-red-600 text-white rounded">Delete</button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }
"use client";
import { useEffect, useState } from "react";
import { FaPlus, FaTrash, FaPencilAlt, FaStar } from "react-icons/fa";
import { useUser } from "@clerk/nextjs";
import { useAddressStore } from "@/store/addressStore";

const initialForm = {
  name: "",
  address: "",
  city: "",
  state: "",
  postalCode: "",
  country: "",
  phone: "",
  alternatePhone: "",
  email: "",
  instructions: "",
  isDefault: false,
};

export default function Address() {
  const { user } = useUser();
  const { addresses, loading, error, fetchAddresses, addAddress, updateAddress, deleteAddress } =
    useAddressStore();

  const [formData, setFormData] = useState(initialForm);
  const [editing, setEditing] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [deleteId, setDeleteId] = useState(null);

  useEffect(() => {
    if (user?.id) fetchAddresses(user.id);
  }, [user, fetchAddresses]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user?.id) return alert("Login required.");

    try {
      if (editing) {
        await updateAddress({ ...formData, _id: editing }, user.id);
      } else {
        if (addresses.length >= 5) return alert("Maximum 5 addresses allowed.");
        await addAddress(formData, user.id);
      }
      setModalOpen(false);
      setFormData(initialForm);
      setEditing(null);
    } catch (err) {
      console.error("Save error:", err);
    }
  };

  const handleDelete = async () => {
    try {
      await deleteAddress(deleteId, user.id);
      setDeleteId(null);
    } catch (err) {
      console.error("Delete error:", err);
    }
  };

  return (
    <div className="max-w-5xl mx-auto p-4">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">My Addresses</h1>
        <button
          onClick={() => {
            setFormData(initialForm);
            setEditing(null);
            setModalOpen(true);
          }}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
        >
          <FaPlus /> Add Address
        </button>
      </div>

      {/* Errors */}
      {error && <p className="text-red-600">{error}</p>}

      {/* List */}
      {loading ? (
        <p>Loading...</p>
      ) : addresses.length === 0 ? (
        <p className="text-gray-600">No addresses saved.</p>
      ) : (
        <div className="grid gap-6 grid-cols-1 md:grid-cols-2">
          {addresses.map((addr) => (
            <div key={addr._id} className="p-6 bg-white shadow rounded-lg relative border">
              {addr.isDefault && (
                <span className="absolute top-3 right-3 flex items-center text-yellow-500 font-medium text-sm">
                  <FaStar className="mr-1" /> Default
                </span>
              )}
              <h2 className="font-semibold text-lg">{addr.name}</h2>
              <p className="text-gray-700">
                {addr.address}, {addr.city}, {addr.state}, {addr.postalCode}
              </p>
              <p className="text-gray-700">{addr.country}</p>
              <p className="text-gray-700">{addr.phone}</p>
              {addr.email && <p className="text-gray-600">{addr.email}</p>}
              {addr.instructions && (
                <p className="italic text-sm text-gray-500">Note: {addr.instructions}</p>
              )}

              <div className="flex gap-3 mt-4">
                <button
                  onClick={() => {
                    setFormData(addr);
                    setEditing(addr._id);
                    setModalOpen(true);
                  }}
                  className="flex items-center gap-1 text-blue-600 hover:text-blue-800"
                >
                  <FaPencilAlt /> Edit
                </button>
                <button
                  onClick={() => setDeleteId(addr._id)}
                  className="flex items-center gap-1 text-red-600 hover:text-red-800"
                >
                  <FaTrash /> Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Modal */}
      {modalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-xl shadow-lg w-full max-w-lg">
            <h2 className="text-xl font-bold mb-4">
              {editing ? "Edit Address" : "Add Address"}
            </h2>
            <form onSubmit={handleSubmit} className="space-y-3">
              {Object.entries(initialForm).map(
                ([key]) =>
                  key !== "isDefault" && (
                    <input
                      key={key}
                      type="text"
                      placeholder={key}
                      value={formData[key] || ""}
                      onChange={(e) =>
                        setFormData({ ...formData, [key]: e.target.value })
                      }
                      className="w-full border p-2 rounded"
                    />
                  )
              )}
              <label className="flex items-center gap-2 text-sm">
                <input
                  type="checkbox"
                  checked={formData.isDefault}
                  onChange={(e) =>
                    setFormData({ ...formData, isDefault: e.target.checked })
                  }
                />
                Set as default address
              </label>
              <div className="flex justify-end gap-2 mt-4">
                <button
                  type="button"
                  onClick={() => {
                    setModalOpen(false);
                    setEditing(null);
                  }}
                  className="px-4 py-2 border rounded-lg"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                >
                  {editing ? "Update" : "Save"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirm */}
      {deleteId && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-xl shadow-lg max-w-sm w-full">
            <p className="text-gray-700">Are you sure you want to delete this address?</p>
            <div className="flex justify-end gap-3 mt-4">
              <button
                onClick={() => setDeleteId(null)}
                className="px-4 py-2 border rounded-lg"
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
