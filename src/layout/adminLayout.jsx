// src/layout/AdminLayout.jsx
import { 
  Bell, Home, Calendar, Megaphone, Box, ArrowRightLeft, Trash2, AlertTriangle, 
  Package, Users, Building, FileText, DollarSign, Archive, PlusCircle, 
  ChevronLeft, ChevronRight, ChevronDown, ChevronUp, Store, LogOut 
} from 'lucide-react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useState } from 'react';

export default function AdminLayout({ children, title }) {
  const location = useLocation();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const menuItems = [
    { icon: Home, label: 'Dashboard', path: '/adminDashboard' },
    { icon: Calendar, label: 'Staff Schedule', path: '/adminStaffSchedule' },
    { icon: Megaphone, label: 'Announcements', path: '/adminAnnouncement' },
    { header: 'Products' },
    { icon: ArrowRightLeft, label: 'Products Transfer', path: '/adminProductTransfer' },
    { icon: Box, label: 'Products Sold', path: '/adminProductSold' },
    { icon: Trash2, label: 'Products Wasted', path: '/adminProductWaste' },
    { icon: AlertTriangle, label: 'Products Damaged', path: '/adminProductDamage' },
    {
      icon: Package,
      label: 'Returned Products',
      dropdown: true,
      items: [
        { icon: Users, label: 'Customer', path: '/customerReturnedProducts' },
        { icon: Store, label: 'Supplier', path: '/supplier' },
        { icon: Building, label: 'Branches', path: '/branches' },
      ],
    },
    { header: 'Action' },
    { icon: FileText, label: 'Record Product Usage', path: '/staff-prod-usage' },
    { icon: DollarSign, label: 'Supplier Purchases', path: '/supplier-purchases' },
    { icon: PlusCircle, label: 'Add Product Display', path: '/adminDisplayProduct' },
    { icon: Archive, label: 'Transaction', path: '/Transaction' },
    { icon: Box, label: 'Inventory', path: '/inventory' },
  ];

  const currentPath = location.pathname;
  const isReturnedProductsActive = ['/customerReturnedProducts', '/supplier', '/branches'].includes(currentPath);

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-50 to-pink-50 flex flex-col">
      {/* NAVBAR */}
      <header className="bg-gradient-to-r from-[#ffd36e] to-[#f59e9e] shadow-sm">
        <div className="max-w-full mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-md">
              <span className="text-orange-600 font-bold text-xl">HD</span>
            </div>
            <div>
              <h1 className="text-xl font-bold text-orange-900">Honey Dolls & Brilliant</h1>
              <p className="text-sm text-orange-800 font-medium">Beauty Hub — Davao</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Bell className="w-6 h-6 text-yellow-600" />
            <span className="text-orange-900 font-medium text-sm hidden sm:inline">
              Welcome, <span className="text-yellow-600">Alfa Smith</span>
            </span>
          </div>
        </div>
      </header>

      <div className="flex flex-1">
        {/* SIDEBAR */}
        <aside className={`${sidebarOpen ? 'w-64' : 'w-20'} bg-white shadow-lg transition-all duration-300 flex flex-col`}>
          <div className="p-4 border-b flex items-center justify-between">
            {sidebarOpen && <h2 className="text-sm font-bold text-orange-900">Admin</h2>}
            <button onClick={() => setSidebarOpen(!sidebarOpen)} className="text-gray-500 hover:text-orange-600">
              {sidebarOpen ? <ChevronLeft className="w-5 h-5" /> : <ChevronRight className="w-5 h-5" />}
            </button>
          </div>

          <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
            {menuItems.map((item, idx) => {
              if (item.header) {
                return sidebarOpen ? (
                  <div key={idx} className="text-xs font-semibold text-gray-500 uppercase mt-6 mb-2 px-3">
                    {item.header}
                  </div>
                ) : null;
              }

              const Icon = item.icon;
              const isActive = currentPath === item.path;

              if (item.dropdown) {
                return (
                  <div key={idx}>
                    <button
                      onClick={() => setDropdownOpen(!dropdownOpen)}
                      className={`w-full flex items-center justify-between px-3 py-2 rounded-lg transition relative overflow-hidden ${
                        isReturnedProductsActive
                          ? sidebarOpen
                            ? 'bg-orange-100 text-orange-700 font-medium pl-1'
                            : 'bg-gray-300 text-gray-900'
                          : 'text-gray-700 hover:bg-gray-100'
                      }`}
                    >
                      {isReturnedProductsActive && sidebarOpen && (
                        <div className="absolute inset-y-0 left-0 w-1 bg-blue-600"></div>
                      )}
                      <div className="flex items-center gap-3">
                        <Icon className="w-5 h-5 flex-shrink-0" />
                        {sidebarOpen && <span className="text-sm">{item.label}</span>}
                      </div>
                      {sidebarOpen && (dropdownOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />)}
                    </button>

                    {dropdownOpen && sidebarOpen && (
                      <div className="ml-8 mt-1 space-y-1">
                        {item.items.map((sub, i) => {
                          const SubIcon = sub.icon;
                          const subActive = currentPath === sub.path;
                          return (
                            <Link
                              key={i}
                              to={sub.path}
                              className={`flex items-center gap-3 px-3 py-2 rounded-lg transition relative overflow-hidden ${
                                subActive
                                  ? 'bg-orange-100 text-orange-700 font-medium pl-1'
                                  : 'text-gray-600 hover:bg-gray-50'
                              }`}
                            >
                              {subActive && <div className="absolute inset-y-0 left-0 w-1 bg-blue-600"></div>}
                              <SubIcon className="w-4 h-4 flex-shrink-0" />
                              <span className="text-sm">{sub.label}</span>
                            </Link>
                          );
                        })}
                      </div>
                    )}
                  </div>
                );
              }

              return (
                <Link
                  key={idx}
                  to={item.path}
                  className={`flex items-center gap-3 px-3 py-2 rounded-lg transition relative overflow-hidden ${
                    isActive
                      ? item.path === '/adminDashboard'
                        ? 'bg-gray-300 text-gray-900 font-medium'
                        : sidebarOpen
                          ? 'bg-orange-100 text-orange-700 font-medium pl-1'
                          : 'bg-gray-300 text-gray-900'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  {isActive && sidebarOpen && item.path !== '/adminDashboard' && (
                    <div className="absolute inset-y-0 left-0 w-1 bg-blue-600"></div>
                  )}
                  <Icon className="w-5 h-5 flex-shrink-0" />
                  {sidebarOpen && <span className="text-sm">{item.label}</span>}
                </Link>
              );
            })}
          </nav>

          {/* LOGOUT BUTTON */}
          <div className="p-4 border-t">
            <button
              onClick={handleLogout}
              className="w-full flex items-center gap-3 px-3 py-3 rounded-lg text-red-600 hover:bg-red-50 transition font-medium"
            >
              <LogOut className="w-5 h-5 flex-shrink-0" />
              {sidebarOpen && <span className="text-sm">Logout</span>}
            </button>
          </div>
        </aside>

        {/* MAIN CONTENT — FIXED WITH SCROLL */}
        <main className="flex-1 p-6 overflow-y-auto">
          <div className="bg-white rounded-2xl shadow-lg p-6 min-h-full">
            {title && <h2 className="text-xl font-bold text-gray-900 mb-6">{title}</h2>}
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
