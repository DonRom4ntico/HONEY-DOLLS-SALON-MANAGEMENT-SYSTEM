// src/pages/AddStaff.jsx
import { Search, ChevronDown, Plus, X, Upload, Eye, EyeOff } from 'lucide-react';
import AdminLayout from "../../../layout/adminLayout.jsx";
import { useState } from 'react';

export default function AddStaff() {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortOrder, setSortOrder] = useState('created-desc');
  const [currentPage, setCurrentPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showPassword, setShowPassword] = useState({}); // Toggle per staff
  const itemsPerPage = 6;

  const [newStaff, setNewStaff] = useState({
    firstName: '', lastName: '', username: '', address: '', contact: '', email: '', password: '', image: null
  });

  const [staffList, setStaffList] = useState([
    { id: 1, firstName: 'Maria', lastName: 'Santos', username: 'maria.s', address: 'Purok 5, Matina', contact: '0917-123-4567', email: 'maria@salon.com', password: 'staff123!', createdAt: 'Oct 15, 2025', updatedAt: 'Nov 10, 2025', image: null },
    { id: 2, firstName: 'Jessa', lastName: 'Reyes', username: 'jessa.r', address: 'Buhangin, Davao', contact: '0918-987-6543', email: 'jessa@salon.com', password: 'jessa2025', createdAt: 'Oct 20, 2025', updatedAt: 'Nov 18, 2025', image: null },
    { id: 3, firstName: 'Anna', lastName: 'Cruz', username: 'anna.c', address: 'Toril, Davao City', contact: '0906-555-1234', email: 'anna@salon.com', password: 'annaPass99', createdAt: 'Nov 01, 2025', updatedAt: 'Nov 14, 2025', image: null },
    { id: 4, firstName: 'Liza', lastName: 'Garcia', username: 'liza.g', address: 'Bajada, Davao City', contact: '0922-444-5678', email: 'liza@salon.com', password: 'lizaSecure1', createdAt: 'Nov 05, 2025', updatedAt: 'Nov 16, 2025', image: null },
  ]);

  // Filter & Sort
  let filtered = staffList.filter(staff =>
    staff.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    staff.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    staff.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
    staff.email.toLowerCase().includes(searchTerm.toLowerCase())
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
      setNewStaff(prev => ({ ...prev, image: reader.result }));
    };
    reader.readAsDataURL(file);
  };

  const handleAddStaff = () => {
    if (!newStaff.firstName || !newStaff.lastName || !newStaff.username || !newStaff.email || !newStaff.password) return;

    const today = new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });

    setStaffList(prev => [...prev, {
      id: prev.length + 1,
      firstName: newStaff.firstName,
      lastName: newStaff.lastName,
      username: newStaff.username,
      address: newStaff.address,
      contact: newStaff.contact,
      email: newStaff.email,
      password: newStaff.password,
      createdAt: today,
      updatedAt: today,
      image: newStaff.image
    }]);

    setNewStaff({ firstName: '', lastName: '', username: '', address: '', contact: '', email: '', password: '', image: null });
    setIsModalOpen(false);
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to remove this staff member?")) {
      setStaffList(prev => prev.filter(staff => staff.id !== id));
    }
  };

  const togglePassword = (id) => {
    setShowPassword(prev => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <AdminLayout title="Staff Management">
      <div className="bg-white rounded-2xl shadow-lg p-8 max-w-full mx-auto">

        {/* Header + Add Button */}
        <div className="flex justify-between items-start mb-8">
          <div>
            <h1 className="text-2xl lg:text-3xl font-bold text-gray-900">Honey Dolls • Brilliant Beauty Hub</h1>
            <p className="text-sm text-gray-600 mt-2">
              Staff Management<br />
              Add and manage your salon team
            </p>
          </div>

          <button
            onClick={() => setIsModalOpen(true)}
            style={{ background: 'linear-gradient(to right, #ec4899, #f97316)', boxShadow: '0 10px 30px rgba(236, 72, 153, 0.5)' }}
            className="text-white font-bold text-lg px-8 py-4 rounded-full shadow-2xl hover:shadow-pink-500/50 transition-all duration-300 flex items-center gap-3 hover:scale-105"
          >
            <Plus className="w-7 h-7" />
            Add Staff
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
              className="w-full pl-12 pr-5 py-4 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-400 text-sm"
            />
          </div>
          <div className="relative min-w-[200px]">
            <select
              value={sortOrder}
              onChange={(e) => setSortOrder(e.target.value)}
              className="w-full pl-4 pr-10 py-4 border border-gray-300 rounded-xl appearance-none focus:outline-none focus:ring-2 focus:ring-orange-400 text-sm bg-white cursor-pointer"
            >
              <option value="created-desc">Created: Newest</option>
              <option value="created-asc">Created: Oldest</option>
              <option value="updated-desc">Updated: Recent</option>
              <option value="updated-asc">Updated: Oldest</option>
            </select>
            <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
          </div>
        </div>

        {/* Staff Table - NOW WITH PASSWORD + EYE TOGGLE */}
        <div className="overflow-x-auto rounded-xl border border-gray-200">
          <table className="w-full min-w-[1400px] text-sm">
            <thead>
              <tr className="bg-gradient-to-r from-orange-50 to-pink-50">
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
              {paginated.map((staff) => (
                <tr key={staff.id} className="border-t hover:bg-orange-50/30 transition-colors">
                  <td className="py-4 px-6">
                    {staff.image ? (
                      <img src={staff.image} alt={staff.firstName} className="w-12 h-12 rounded-full object-cover shadow" />
                    ) : (
                      <div className="w-12 h-12 bg-gradient-to-br from-pink-200 to-orange-200 rounded-full flex items-center justify-center text-white font-bold text-lg">
                        {staff.firstName[0]}{staff.lastName[0]}
                      </div>
                    )}
                  </td>
                  <td className="py-4 px-6 font-medium">{staff.firstName}</td>
                  <td className="py-4 px-6 font-medium">{staff.lastName}</td>
                  <td className="py-4 px-6 font-mono text-orange-700">{staff.username}</td>
                  <td className="py-4 px-6 text-gray-600">{staff.address}</td>
                  <td className="py-4 px-6">{staff.contact}</td>
                  <td className="py-4 px-6 text-blue-700">{staff.email}</td>
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-2">
                      <span className={`font-mono ${showPassword[staff.id] ? 'text-gray-800' : 'text-gray-500'} tracking-wider`}>
                        {showPassword[staff.id] ? staff.password : '••••••••••'}
                      </span>
                      <button
                        onClick={() => togglePassword(staff.id)}
                        className="text-gray-500 hover:text-orange-600 transition"
                      >
                        {showPassword[staff.id] ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <div className="flex justify-center gap-3">
                      <button className="px-6 py-2 rounded-lg text-white font-semibold text-xs bg-gradient-to-r from-[#FFD873] to-[#FF9B52] shadow-sm hover:brightness-110 transition-all hover:scale-105">
                        Edit
                      </button>
                      <button 
                        onClick={() => handleDelete(staff.id)}
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
              className="px-4 py-2 border rounded-lg hover:bg-gray-100 disabled:opacity-50">
              Previous
            </button>
            <span className="font-medium">Page {currentPage} of {totalPages || 1}</span>
            <button onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))} disabled={currentPage === totalPages}
              className="px-4 py-2 border rounded-lg hover:bg-gray-100 disabled:opacity-50">
              Next
            </button>
          </div>
        </div>

        {/* ADD STAFF MODAL - unchanged */}
        {isModalOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-2xl max-h-screen overflow-y-auto">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-900">Add New Staff Member</h2>
                <button onClick={() => setIsModalOpen(false)} className="text-gray-500 hover:text-gray-700">
                  <X className="w-6 h-6" />
                </button>
              </div>

              <div className="mb-8 text-center">
                <label className="block text-sm font-medium text-gray-700 mb-4">Staff Photo (Optional)</label>
                <label htmlFor="staff-image" className="cursor-pointer inline-block">
                  <div className="w-32 h-32 mx-auto border-4 border-dashed border-orange-300 rounded-full overflow-hidden bg-gradient-to-br from-pink-50 to-orange-50 hover:border-orange-500 transition-all">
                    {newStaff.image ? (
                      <img src={newStaff.image} alt="Preview" className="w-full h-full object-cover" />
                    ) : (
                      <div className="flex flex-col items-center justify-center h-full text-gray-500">
                        <Upload className="w-10 h-10 mb-2" />
                        <span className="text-xs">Upload Photo</span>
                      </div>
                    )}
                  </div>
                </label>
                <input id="staff-image" type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div><label className="block text-sm font-medium text-gray-700 mb-2">First Name</label>
                  <input type="text" value={newStaff.firstName} onChange={(e) => setNewStaff({ ...newStaff, firstName: e.target.value })} placeholder="Maria" className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-400" required />
                </div>
                <div><label className="block text-sm font-medium text-gray-700 mb-2">Last Name</label>
                  <input type="text" value={newStaff.lastName} onChange={(e) => setNewStaff({ ...newStaff, lastName: e.target.value })} placeholder="Santos" className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-400" required />
                </div>
                <div><label className="block text-sm font-medium text-gray-700 mb-2">Username</label>
                  <input type="text" value={newStaff.username} onChange={(e) => setNewStaff({ ...newStaff, username: e.target.value })} placeholder="maria.s" className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-400" required />
                </div>
                <div><label className="block text-sm font-medium text-gray-700 mb-2">Contact Number</label>
                  <input type="text" value={newStaff.contact} onChange={(e) => setNewStaff({ ...newStaff, contact: e.target.value })} placeholder="0917-123-4567" className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-400" />
                </div>
                <div className="md:col-span-2"><label className="block text-sm font-medium text-gray-700 mb-2">Address</label>
                  <input type="text" value={newStaff.address} onChange={(e) => setNewStaff({ ...newStaff, address: e.target.value })} placeholder="Purok 5, Matina, Davao City" className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-400" />
                </div>
                <div className="md:col-span-2"><label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                  <input type="email" value={newStaff.email} onChange={(e) => setNewStaff({ ...newStaff, email: e.target.value })} placeholder="maria@salon.com" className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-400" required />
                </div>
                <div className="md:col-span-2"><label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
                  <input type="password" value={newStaff.password} onChange={(e) => setNewStaff({ ...newStaff, password: e.target.value })} placeholder="Enter strong password" className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-400" required />
                </div>
              </div>

              <div className="flex gap-4 mt-8">
                <button onClick={() => setIsModalOpen(false)} className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 font-semibold rounded-xl hover:bg-gray-50 transition">
                  Cancel
                </button>
                <button
                  onClick={handleAddStaff}
                  disabled={!newStaff.firstName || !newStaff.lastName || !newStaff.username || !newStaff.email || !newStaff.password}
                  style={{
                    background: (newStaff.firstName && newStaff.lastName && newStaff.username && newStaff.email && newStaff.password)
                      ? 'linear-gradient(to right, #ec4899, #f97316)'
                      : '#cccccc',
                  }}
                  className="flex-1 px-6 py-3 text-white font-bold rounded-xl shadow-lg hover:shadow-xl transition-all disabled:cursor-not-allowed"
                >
                  Add Staff Member
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </AdminLayout>
  );
}