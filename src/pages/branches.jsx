// src/pages/Branches.jsx
import AdminLayout from '../layout/adminLayout';

export default function Branches() {
  const branches = [
    { id: 1, name: 'Davao Main', address: 'Quimpo Blvd, Ecoland', manager: 'Maria Santos', contact: '0917-123-4567' },
    { id: 2, name: 'Davao North', address: 'Buhangin, Davao City', manager: 'John Reyes', contact: '0918-987-6543' },
  ];

  return (
    <AdminLayout title="Honey Dolls & Brilliant Beauty Hub — Davao | Branches">
      <div className="space-y-4">
        {branches.map((branch) => (
          <div key={branch.id} className="bg-gray-50 rounded-xl p-4 flex items-center justify-between">
            <div>
              <h3 className="font-medium text-gray-900">{branch.name}</h3>
              <p className="text-sm text-gray-600">{branch.address}</p>
              <p className="text-xs text-gray-500">Manager: {branch.manager} • {branch.contact}</p>
            </div>
            <button className="text-orange-600 hover:text-orange-700 font-medium text-sm">
              View Details
            </button>
          </div>
        ))}
      </div>
    </AdminLayout>
  );
}