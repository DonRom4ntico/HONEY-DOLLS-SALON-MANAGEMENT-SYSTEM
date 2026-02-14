// src/pages/AddStaff.jsx
import {
  Search,
  ChevronDown,
  Plus,
  X,
  Upload,
  Eye,
  EyeOff,
} from "lucide-react";
import AdminLayout from "../../../layout/adminLayout.jsx";
import { useState } from "react";
import axios from "axios";

const API_BASE = import.meta.env.VITE_API_BASE;

export default function AddStaff() {
  const [newStaff, setNewStaff] = useState({
    firstName: "",
    lastName: "",
    username: "",
    address: "",
    contact: "",
    email: "",
    password: "",
    branchid: "",
    image: null,
  });
  const [staffList, setStaffList] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleImageUpload = (e) => {
    setNewStaff((prev) => ({ ...prev, image: e.target.files[0] }));
  };

  const handleAddStaff = async () => {
    if (
      !newStaff.firstName ||
      !newStaff.lastName ||
      !newStaff.username ||
      !newStaff.email ||
      !newStaff.password
    )
      return;

    const formData = new FormData();
    formData.append("firstname", newStaff.firstName);
    formData.append("lastname", newStaff.lastName);
    formData.append("username", newStaff.username);
    formData.append("contact", newStaff.contact);
    formData.append("branchid", newStaff.branchid || 1); // default branch
    formData.append("email", newStaff.email);
    formData.append("password", newStaff.password);
    if (newStaff.image) formData.append("image", newStaff.image);

    try {
      const res = await axios.post(
        `${API_BASE}/auth/register-staff`,
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      setStaffList((prev) => [...prev, res.data.staff]);
      setNewStaff({
        firstName: "",
        lastName: "",
        username: "",
        address: "",
        contact: "",
        email: "",
        password: "",
        branchid: "",
        image: null,
      });
      setIsModalOpen(false);
    } catch (err) {
      console.error(err.response?.data || err.message);
    }
  };

  return (
    <AdminLayout title="Staff Management">
      <div className="bg-white rounded-2xl shadow-lg p-8 max-w-full mx-auto">
        <div className="flex justify-between items-start mb-8">
          <h1 className="text-2xl font-bold text-gray-900">Staff Management</h1>
          <button
            onClick={() => setIsModalOpen(true)}
            className="bg-orange-500 text-white px-4 py-2 rounded-full flex items-center gap-2"
          >
            <Plus className="w-5 h-5" /> Add Staff
          </button>
        </div>

        {isModalOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-2xl overflow-y-auto">
              <h2 className="text-2xl font-bold mb-4">Add New Staff</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input
                  type="text"
                  placeholder="First Name"
                  value={newStaff.firstName}
                  onChange={(e) =>
                    setNewStaff({ ...newStaff, firstName: e.target.value })
                  }
                  className="p-2 border rounded"
                />
                <input
                  type="text"
                  placeholder="Last Name"
                  value={newStaff.lastName}
                  onChange={(e) =>
                    setNewStaff({ ...newStaff, lastName: e.target.value })
                  }
                  className="p-2 border rounded"
                />
                <input
                  type="text"
                  placeholder="Username"
                  value={newStaff.username}
                  onChange={(e) =>
                    setNewStaff({ ...newStaff, username: e.target.value })
                  }
                  className="p-2 border rounded"
                />
                <input
                  type="text"
                  placeholder="Contact"
                  value={newStaff.contact}
                  onChange={(e) =>
                    setNewStaff({ ...newStaff, contact: e.target.value })
                  }
                  className="p-2 border rounded"
                />
                <input
                  type="text"
                  placeholder="Email"
                  value={newStaff.email}
                  onChange={(e) =>
                    setNewStaff({ ...newStaff, email: e.target.value })
                  }
                  className="p-2 border rounded"
                />
                <input
                  type="password"
                  placeholder="Password"
                  value={newStaff.password}
                  onChange={(e) =>
                    setNewStaff({ ...newStaff, password: e.target.value })
                  }
                  className="p-2 border rounded"
                />
                <input
                  type="file"
                  onChange={handleImageUpload}
                  className="p-2 border rounded col-span-2"
                />
              </div>
              <div className="flex gap-4 mt-4">
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="flex-1 p-2 border rounded"
                >
                  Cancel
                </button>
                <button
                  onClick={handleAddStaff}
                  className="flex-1 p-2 bg-orange-500 text-white rounded"
                >
                  Add Staff
                </button>
              </div>
            </div>
          </div>
        )}

        <div className="mt-8">
          {staffList.map((staff) => (
            <div
              key={staff.id}
              className="flex items-center gap-4 p-2 border-b"
            >
              {staff.image ? (
                <img
                  src={`http://localhost:3000/uploads/${staff.image}`}
                  className="w-12 h-12 rounded-full"
                />
              ) : (
                <div className="w-12 h-12 bg-gray-300 rounded-full" />
              )}
              <span>
                {staff.firstname} {staff.lastname}
              </span>
              <span>{staff.username}</span>
              <span>{staff.email}</span>
            </div>
          ))}
        </div>
      </div>
    </AdminLayout>
  );
}
