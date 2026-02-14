import React from "react";
// src/pages/AddAdmin.jsx
import {
  Search,
  ChevronDown,
  Shield,
  X,
  Upload,
  Eye,
  EyeOff,
} from "lucide-react";
import AdminLayout from "../../../layout/adminLayout.jsx";
import { useState } from "react";

export default function AddAdmin() {
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOrder, setSortOrder] = useState("created-desc");
  const [currentPage, setCurrentPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showPassword, setShowPassword] = useState({});
  const itemsPerPage = 6;

  const [newAdmin, setNewAdmin] = useState({
    firstName: "",
    lastName: "",
    username: "",
    address: "",
    contact: "",
    email: "",
    password: "",
    image: null,
  });

  const [adminList, setAdminList] = useState([
    {
      id: 1,
      firstName: "Christine",
      lastName: "Lim",
      username: "christine.owner",
      address: "Buhangin, Davao City",
      contact: "0917-888-9999",
      email: "owner@honeybrilliant.com",
      password: "Admin2025!",
      createdAt: "Jan 10, 2025",
      updatedAt: "Nov 20, 2025",
      image: null,
    },
  ]);

  /* ================= FILTER & SORT ================= */
  let filtered = adminList.filter(
    (admin) =>
      admin.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      admin.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      admin.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
      admin.email.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  filtered.sort((a, b) => {
    if (sortOrder === "created-desc")
      return new Date(b.createdAt) - new Date(a.createdAt);
    if (sortOrder === "created-asc")
      return new Date(a.createdAt) - new Date(b.createdAt);
    if (sortOrder === "updated-desc")
      return new Date(b.updatedAt) - new Date(a.updatedAt);
    return new Date(a.updatedAt) - new Date(b.updatedAt);
  });

  const totalPages = Math.ceil(filtered.length / itemsPerPage);
  const paginated = filtered.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage,
  );

  const handleImageUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () =>
      setNewAdmin((prev) => ({ ...prev, image: reader.result }));
    reader.readAsDataURL(file);
  };

  const togglePassword = (id) => {
    setShowPassword((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const handleAddAdmin = () => {
    if (
      !newAdmin.firstName ||
      !newAdmin.lastName ||
      !newAdmin.username ||
      !newAdmin.email ||
      !newAdmin.password
    )
      return;

    const today = new Date().toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });

    setAdminList((prev) => [
      ...prev,
      {
        ...newAdmin,
        id: prev.length + 1,
        createdAt: today,
        updatedAt: today,
      },
    ]);

    setNewAdmin({
      firstName: "",
      lastName: "",
      username: "",
      address: "",
      contact: "",
      email: "",
      password: "",
      image: null,
    });
    setIsModalOpen(false);
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to remove this administrator?")) {
      setAdminList((prev) => prev.filter((admin) => admin.id !== id));
    }
  };

  return (
    <AdminLayout title="Admin Management">
      <div className="bg-white rounded-2xl shadow-lg p-6 sm:p-8 max-w-full mx-auto">
        {/* ================= HEADER ================= */}
        <div className="flex flex-col lg:flex-row justify-between items-start gap-4 mb-8">
          <div>
            <h1 className="text-2xl lg:text-3xl font-bold text-gray-900">
              Honey Dolls • Brilliant Beauty Hub
            </h1>
            <p className="text-sm text-gray-600 mt-2">
              Administrator Management <br />
              Manage owners and super admins
            </p>
          </div>

          <button
            onClick={() => setIsModalOpen(true)}
            style={{
              background: "linear-gradient(to right, #a855f7, #ec4899)",
            }}
            className="text-white font-semibold text-sm px-4 py-2 rounded-lg shadow hover:scale-105 transition flex items-center gap-2"
          >
            <Shield className="w-5 h-5" />
            Add Admin
          </button>
        </div>

        {/* ================= FILTERS ================= */}
        <div className="flex flex-wrap gap-4 mb-8 items-center">
          <div className="relative flex-1 min-w-[200px]">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search by name, username, or email..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-5 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-400 text-sm"
            />
          </div>

          <div className="relative min-w-[160px]">
            <select
              value={sortOrder}
              onChange={(e) => setSortOrder(e.target.value)}
              className="w-full pl-4 pr-8 py-3 border border-gray-300 rounded-xl appearance-none focus:ring-2 focus:ring-purple-400 text-sm bg-white"
            >
              <option value="created-desc">Created: Newest</option>
              <option value="created-asc">Created: Oldest</option>
              <option value="updated-desc">Updated: Recent</option>
              <option value="updated-asc">Updated: Oldest</option>
            </select>
            <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          </div>
        </div>

        {/* ================= TABLE ================= */}
        <div className="overflow-x-auto rounded-xl border border-gray-200">
          <table className="w-full min-w-[1200px] text-sm">
            <thead>
              <tr className="bg-gradient-to-r from-purple-50 to-pink-50">
                {[
                  "Photo",
                  "First Name",
                  "Last Name",
                  "Username",
                  "Address",
                  "Contact",
                  "Email",
                  "Password",
                  "Actions",
                ].map((h) => (
                  <th key={h} className="py-4 px-4 text-left font-semibold">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>

            <tbody>
              {paginated.map((admin) => (
                <tr key={admin.id} className="border-t hover:bg-purple-50/30">
                  <td className="py-3 px-4">
                    {admin.image ? (
                      <img
                        src={admin.image}
                        className="w-10 h-10 rounded-full object-cover"
                      />
                    ) : (
                      <div className="w-10 h-10 rounded-full bg-purple-400 text-white flex items-center justify-center font-bold text-sm">
                        {admin.firstName[0]}
                        {admin.lastName[0]}
                      </div>
                    )}
                  </td>

                  <td className="py-3 px-4">{admin.firstName}</td>
                  <td className="py-3 px-4">{admin.lastName}</td>
                  <td className="py-3 px-4 font-mono text-purple-700">
                    {admin.username}
                  </td>
                  <td className="py-3 px-4">{admin.address}</td>
                  <td className="py-3 px-4">{admin.contact}</td>
                  <td className="py-3 px-4 text-purple-700">{admin.email}</td>

                  <td className="py-3 px-4">
                    <div className="flex items-center gap-2">
                      <span className="font-mono">
                        {showPassword[admin.id] ? admin.password : "••••••••••"}
                      </span>
                      <button onClick={() => togglePassword(admin.id)}>
                        {showPassword[admin.id] ? (
                          <EyeOff className="w-4 h-4" />
                        ) : (
                          <Eye className="w-4 h-4" />
                        )}
                      </button>
                    </div>
                  </td>

                  <td className="py-3 px-4">
                    <div className="flex flex-wrap justify-center gap-2">
                      <button className="px-4 py-2 text-xs rounded-lg text-white bg-gradient-to-r from-[#FFD873] to-[#FF9B52]">
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(admin.id)}
                        className="px-4 py-2 text-xs rounded-lg text-white bg-gradient-to-r from-[#FF8A80] to-[#FF5252]"
                      >
                        Remove
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* ================= PAGINATION ================= */}
        <div className="flex flex-col sm:flex-row justify-center items-center gap-4 mt-6">
          <button
            onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
            disabled={currentPage === 1}
            className="px-4 py-2 border rounded-lg"
          >
            Previous
          </button>
          <span className="font-medium">
            Page {currentPage} of {totalPages || 1}
          </span>
          <button
            onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
            disabled={currentPage === totalPages}
            className="px-4 py-2 border rounded-lg"
          >
            Next
          </button>
        </div>

        {/* ================= MODAL (SAME BREAKPOINTS AS STAFF) ================= */}
        {isModalOpen && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl shadow-2xl p-6 sm:p-8 w-full max-w-2xl max-h-screen overflow-y-auto">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl sm:text-2xl font-bold">
                  Add New Administrator
                </h2>
                <button onClick={() => setIsModalOpen(false)}>
                  <X />
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <input
                  type="text"
                  placeholder="First Name"
                  value={newAdmin.firstName}
                  onChange={(e) =>
                    setNewAdmin({ ...newAdmin, firstName: e.target.value })
                  }
                  className="w-full p-3 border rounded-lg text-sm"
                />
                <input
                  type="text"
                  placeholder="Last Name"
                  value={newAdmin.lastName}
                  onChange={(e) =>
                    setNewAdmin({ ...newAdmin, lastName: e.target.value })
                  }
                  className="w-full p-3 border rounded-lg text-sm"
                />
                <input
                  type="text"
                  placeholder="Username"
                  value={newAdmin.username}
                  onChange={(e) =>
                    setNewAdmin({ ...newAdmin, username: e.target.value })
                  }
                  className="w-full p-3 border rounded-lg text-sm col-span-2"
                />
                <input
                  type="email"
                  placeholder="Email"
                  value={newAdmin.email}
                  onChange={(e) =>
                    setNewAdmin({ ...newAdmin, email: e.target.value })
                  }
                  className="w-full p-3 border rounded-lg text-sm col-span-2"
                />
                <input
                  type={showPassword.new ? "text" : "password"}
                  placeholder="Password"
                  value={newAdmin.password}
                  onChange={(e) =>
                    setNewAdmin({ ...newAdmin, password: e.target.value })
                  }
                  className="w-full p-3 border rounded-lg text-sm col-span-2"
                />
                <button
                  onClick={() =>
                    setShowPassword((prev) => ({ ...prev, new: !prev.new }))
                  }
                  className="text-purple-600 font-medium col-span-2 text-left"
                >
                  {showPassword.new ? "Hide Password" : "Show Password"}
                </button>
                <input
                  type="text"
                  placeholder="Address"
                  value={newAdmin.address}
                  onChange={(e) =>
                    setNewAdmin({ ...newAdmin, address: e.target.value })
                  }
                  className="w-full p-3 border rounded-lg text-sm col-span-2"
                />
                <input
                  type="text"
                  placeholder="Contact"
                  value={newAdmin.contact}
                  onChange={(e) =>
                    setNewAdmin({ ...newAdmin, contact: e.target.value })
                  }
                  className="w-full p-3 border rounded-lg text-sm col-span-2"
                />
                <input
                  type="file"
                  onChange={handleImageUpload}
                  className="w-full text-sm col-span-2"
                />
              </div>

              <button
                onClick={handleAddAdmin}
                className="mt-6 w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white py-3 rounded-lg font-semibold hover:scale-105 transition"
              >
                Add Administrator
              </button>
            </div>
          </div>
        )}
      </div>
    </AdminLayout>
  );
}
