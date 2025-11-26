// src/pages/AddAdmin.jsx
import { Search, ChevronDown, Plus, X, Upload, Shield, Edit, Trash2, Eye, EyeOff } from 'lucide-react';
import AdminLayout from "../../../layout/adminLayout.jsx";
import { useState } from 'react';

export default function AddAdmin() {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortOrder, setSortOrder] = useState('created-desc');
  const [currentPage, setCurrentPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showPassword, setShowPassword] = useState({}); // for toggling per row
  const itemsPerPage = 6;

  const [newAdmin, setNewAdmin] = useState({
    firstName: '', lastName: '', username: '', address: '', contact: '', email: '', password: '', image: null
  });

  const [adminList, setAdminList] = useState([
    { id: 1, firstName: 'Christine', lastName: 'Lim', username: 'christine.owner', address: 'Buhangin, Davao City', contact: '0917-888-9999', email: 'owner@honeybrilliant.com', password: 'Admin2025!', createdAt: 'Jan 10, 2025', updatedAt: 'Nov 20, 2025', image: null },
    { id: 2, firstName: 'Michelle', lastName: 'Tan', username: 'michelle.admin', address: 'Lanang, Davao City', contact: '0905-123-4567', email: 'michelle@honeybrilliant.com', password: 'SecurePass123', createdAt: 'Feb 15, 2025', updatedAt: 'Nov 18, 2025', image: null },
  ]);

  // Filter & Sort
  let filtered = adminList.filter(admin =>
    admin.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    admin.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    admin.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
    admin.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  filtered.sort((a, b) => {
    if (sortOrder === 'created-desc') return new Date(b.createdAt) - new Date(a.createdAt);
    if (sortOrder === 'created-asc') return new Date(a.createdAt) - new Date(b.createdAt);
    if (sortOrder === 'updated-desc') return new Date(b.updatedAt) - new Date(a.updatedAt);
    return new Date(a.updatedAt) - new Date(b.updatedAt);
  });

  const totalPages = Math.ceil(filtered.length / itemsPerPage);
  const paginated = filtered.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const handleImageUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () => {
      setNewAdmin(prev => ({ ...prev, image: reader.result }));
    };
    reader.readAsDataURL(file);
  };

  const handleAddAdmin = () => {
    if (!newAdmin.firstName || !newAdmin.lastName || !newAdmin.username || !newAdmin.email || !newAdmin.password) return;

    const today = new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });

    setAdminList(prev => [...prev, {
      id: prev.length + 1,
      firstName: newAdmin.firstName,
      lastName: newAdmin.lastName,
      username: newAdmin.username,
      address: newAdmin.address,
      contact: newAdmin.contact,
      email: newAdmin.email,
      password: newAdmin.password,
      createdAt: today,
      updatedAt: today,
      image: newAdmin.image
    }]);

    setNewAdmin({ firstName: '', lastName: '', username: '', address: '', contact: '', email: '', password: '', image: null });
    setIsModalOpen(false);
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to remove this administrator?")) {
      setAdminList(prev => prev.filter(admin => admin.id !== id));
    }
  };

  const togglePassword = (id) => {
    setShowPassword(prev => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <AdminLayout title="Admin Management">
      <div className="bg-white rounded-2xl shadow-lg p-8 max-w-full mx-auto">

        {/* Header + Add Button */}
        <div className="flex justify-between items-start mb-8">
          <div>
            <h1 className="text-2xl lg:text-3xl font-bold text-gray-900">Honey Dolls • Brilliant Beauty Hub</h1>
            <p className="text-sm text-gray-600 mt-2">
              Administrator Management<br />
              Manage salon owners and super admins
            </p>
          </div>

          <button
            onClick={() => setIsModalOpen(true)}
            style={{ background: 'linear-gradient(to right, #a855f7, #ec4899)', boxShadow: '0 10px 30px rgba(168, 85, 247, 0.5)' }}
            className="text-white font-bold text-lg px-8 py-4 rounded-full shadow-2xl hover:shadow-purple-500/50 transition-all duration-300 flex items-center gap-3 hover:scale-105"
          >
            <Shield className="w-7 h-7" />
            Add Administrator
          </button>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap gap-4 mb-8 items-center">
          <div className="relative flex-1 min-w-[300px]">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search by name, username, or email..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-5 py-4 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-400 text-sm"
            />
          </div>
          <div className="relative min-w-[200px]">
            <select
              value={sortOrder}
              onChange={(e) => setSortOrder(e.target.value)}
              className="w-full pl-4 pr-10 py-4 border border-gray-300 rounded-xl appearance-none focus:outline-none focus:ring-2 focus:ring-purple-400 text-sm bg-white cursor-pointer"
            >
              <option value="created-desc">Created: Newest</option>
              <option value="created-asc">Created: Oldest</option>
              <option value="updated-desc">Updated: Recent</option>
              <option value="updated-asc">Updated: Oldest</option>
            </select>
            <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
          </div>
        </div>

        {/* Admin Table - WITH EYE TOGGLE & SAME ACTION BUTTONS AS STAFF */}
        <div className="overflow-x-auto rounded-xl border border-gray-200">
          <table className="w-full min-w-[1500px] text-sm">
            <thead>
              <tr className="bg-gradient-to-r from-purple-50 to-pink-50">
                <th className="text-left py-4 px-6 font-semibold">Photo</th>
                <th className="text-left py-4 px-6 font-semibold">First Name</th>
                <th className="text-left py-4 px-6 font-semibold">Last Name</th>
                <th className="text-left py-4 px-6 font-semibold">Username</th>
                <th className="text-left py-4 px-6 font-semibold">Address</th>
                <th className="text-left py-4 px-6 font-semibold">Contact</th>
                <th className="text-left py-4 px-6 font-semibold">Email</th>
                <th className="text-left py-4 px-6 font-semibold">Password</th>
                <th className="text-center py-4 px-6 font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody>
              {paginated.map((admin) => (
                <tr key={admin.id} className="border-t hover:bg-purple-50/30 transition-colors">
                  <td className="py-4 px-6">
                    {admin.image ? (
                      <img src={admin.image} alt={admin.firstName} className="w-12 h-12 rounded-full object-cover shadow-lg ring-2 ring-purple-300" />
                    ) : (
                      <div className="w-12 h-12 bg-gradient-to-br from-purple-400 to-pink-400 rounded-full flex items-center justify-center text-white font-bold text-lg shadow-lg">
                        {admin.firstName[0]}{admin.lastName[0]}
                      </div>
                    )}
                  </td>
                  <td className="py-4 px-6 font-medium">{admin.firstName}</td>
                  <td className="py-4 px-6 font-medium">{admin.lastName}</td>
                  <td className="py-4 px-6 font-mono text-purple-700 font-bold">{admin.username}</td>
                  <td className="py-4 px-6 text-gray-600">{admin.address}</td>
                  <td className="py-4 px-6">{admin.contact}</td>
                  <td className="py-4 px-6 text-purple-700 font-medium">{admin.email}</td>
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-2">
                      <span className={`font-mono ${showPassword[admin.id] ? 'text-gray-800' : 'text-gray-500'} tracking-wider`}>
                        {showPassword[admin.id] ? admin.password : '••••••••••'}
                      </span>
                      <button
                        onClick={() => togglePassword(admin.id)}
                        className="text-gray-500 hover:text-purple-600 transition"
                      >
                        {showPassword[admin.id] ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <div className="flex justify-center gap-3">
                      {/* SAME AS ADDSTAFF.JSX */}
                      <button className="px-6 py-2 rounded-lg text-white font-semibold text-xs bg-gradient-to-r from-[#FFD873] to-[#FF9B52] shadow-sm hover:brightness-110 transition-all hover:scale-105">
                        Edit
                      </button>
                      <button 
                        onClick={() => handleDelete(admin.id)}
                        className="px-6 py-2 rounded-lg text-white font-semibold text-xs bg-gradient-to-r from-[#FF8A80] to-[#FF5252] shadow-sm hover:brightness-110 transition-all hover:scale-105"
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

        {/* Pagination */}
        <div className="flex justify-center mt-8">
          <div className="flex items-center gap-4 text-sm">
            <button onClick={() => setCurrentPage(p => Math.max(1, p - 1))} disabled={currentPage === 1}
              className="px-4 py-2 border border-purple-300 rounded-lg hover:bg-purple-50 disabled:opacity-50 transition">
              Previous
            </button>
            <span className="font-medium text-purple-700">Page {currentPage} of {totalPages || 1}</span>
            <button onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))} disabled={currentPage === totalPages}
              className="px-4 py-2 border border-purple-300 rounded-lg hover:bg-purple-50 disabled:opacity-50 transition">
              Next
            </button>
          </div>
        </div>

        {/* ADD ADMIN MODAL - unchanged, still beautiful */}
        {isModalOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-2xl max-h-screen overflow-y-auto border border-purple-200">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-3">
                  <Shield className="w-8 h-8 text-purple-600" />
                  Add New Administrator
                </h2>
                <button onClick={() => setIsModalOpen(false)} className="text-gray-500 hover:text-gray-700">
                  <X className="w-6 h-6" />
                </button>
              </div>

              {/* Photo + Form same as before */}
              <div className="mb-8 text-center">
                <label className="block text-sm font-medium text-gray-700 mb-4">Admin Photo (Optional)</label>
                <label htmlFor="admin-image" className="cursor-pointer inline-block">
                  <div className="w-32 h-32 mx-auto border-4 border-dashed border-purple-400 rounded-full overflow-hidden bg-gradient-to-br from-purple-50 to-pink-50 hover:border-purple-600 transition-all">
                    {newAdmin.image ? (
                      <img src={newAdmin.image} alt="Preview" className="w-full h-full object-cover" />
                    ) : (
                      <div className="flex flex-col items-center justify-center h-full text-purple-600">
                        <Upload className="w-10 h-10 mb-2" />
                        <span className="text-xs font-medium">Upload Photo</span>
                      </div>
                    )}
                  </div>
                </label>
                <input id="admin-image" type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div><label className="block text-sm font-medium text-gray-700 mb-2">First Name</label>
                  <input type="text" value={newAdmin.firstName} onChange={(e) => setNewAdmin({ ...newAdmin, firstName: e.target.value })} placeholder="Christine" className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-400" required />
                </div>
                <div><label className="block text-sm font-medium text-gray-700 mb-2">Last Name</label>
                  <input type="text" value={newAdmin.lastName} onChange={(e) => setNewAdmin({ ...newAdmin, lastName: e.target.value })} placeholder="Lim" className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-400" required />
                </div>
                <div><label className="block text-sm font-medium text-gray-700 mb-2">Username</label>
                  <input type="text" value={newAdmin.username} onChange={(e) => setNewAdmin({ ...newAdmin, username: e.target.value })} placeholder="christine.owner" className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-400" required />
                </div>
                <div><label className="block text-sm font-medium text-gray-700 mb-2">Contact Number</label>
                  <input type="text" value={newAdmin.contact} onChange={(e) => setNewAdmin({ ...newAdmin, contact: e.target.value })} placeholder="0917-888-9999" className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-400" />
                </div>
                <div className="md:col-span-2"><label className="block text-sm font-medium text-gray-700 mb-2">Address</label>
                  <input type="text" value={newAdmin.address} onChange={(e) => setNewAdmin({ ...newAdmin, address: e.target.value })} placeholder="Buhangin, Davao City" className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-400" />
                </div>
                <div className="md:col-span-2"><label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                  <input type="email" value={newAdmin.email} onChange={(e) => setNewAdmin({ ...newAdmin, email: e.target.value })} placeholder="owner@honeybrilliant.com" className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-400" required />
                </div>
                <div className="md:col-span-2"><label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
                  <input type="password" value={newAdmin.password} onChange={(e) => setNewAdmin({ ...newAdmin, password: e.target.value })} placeholder="Enter strong password" className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-400" required />
                </div>
              </div>

              <div className="flex gap-4 mt-8">
                <button onClick={() => setIsModalOpen(false)} className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 font-semibold rounded-xl hover:bg-gray-50 transition">
                  Cancel
                </button>
                <button
                  onClick={handleAddAdmin}
                  disabled={!newAdmin.firstName || !newAdmin.lastName || !newAdmin.username || !newAdmin.email || !newAdmin.password}
                  style={{
                    background: (newAdmin.firstName && newAdmin.lastName && newAdmin.username && newAdmin.email && newAdmin.password)
                      ? 'linear-gradient(to right, #a855f7, #ec4899)'
                      : '#cccccc',
                  }}
                  className="flex-1 px-6 py-3 text-white font-bold rounded-xl shadow-lg hover:shadow-xl transition-all disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  <Shield className="w-5 h-5" />
                  Add Administrator
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </AdminLayout>
  );
}