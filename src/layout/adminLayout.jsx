// src/layout/AdminLayout.jsx
import { 
  Bell, Home, Calendar, Megaphone, Box, ArrowRightLeft, Trash2, AlertTriangle, 
  Package, Users, Building, FileText, DollarSign, Archive, PlusCircle, 
  ChevronLeft, ChevronRight, ChevronDown, ChevronUp, Store, LogOut, Menu, 
  PlusSquare
} from 'lucide-react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useState } from 'react';

export default function AdminLayout({ children, title }) {
  const location = useLocation();
  const navigate = useNavigate();

  const [sidebarOpen, setSidebarOpen] = useState(true); // Desktop
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false); // Mobile
  const [desktopDropdownOpen, setDesktopDropdownOpen] = useState(false);
  const [mobileDropdownOpen, setMobileDropdownOpen] = useState(false);

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
    { icon: FileText, label: 'Record Product Usage', path: '/adminProductUsage' },
    { icon: ArrowRightLeft, label: 'Transfer Products', path: '/adminProductTransfer' },
    { icon: Trash2, label: 'Record Product Waste', path: '/recordProductWaste' },
    { icon: AlertTriangle, label: 'Record Product Damaged', path: '/adminProductDamage' },
    { icon: DollarSign, label: 'Supplier Purchases', path: '/supplierPurchases' },
    { icon: PlusCircle, label: 'Supplier Purchases Record', path: '/supplierPurRecord' },
    { icon: PlusSquare, label: 'Product Display', path: '/productDisplay'},
    { icon: Archive, label: 'Transaction', path: '/transaction' },
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
      <header className="bg-gradient-to-r from-[#ffd36e] to-[#f59e9e] shadow-sm sticky top-0 z-50">
        <div className="px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            {/* Burger Menu - Mobile Only */}
            <button
              onClick={() => setMobileMenuOpen(prev => !prev)}
              className="lg:hidden text-orange-900"
            >
              <Menu className="w-7 h-7" />
            </button>

            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-md">
                <span className="text-orange-600 font-bold text-xl">HD</span>
              </div>
              <div>
                <h1 className="text-xl font-bold text-orange-900">Honey Dolls & Brilliant</h1>
                <p className="text-sm text-orange-800 font-medium">Beauty Hub — Davao</p>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <Bell className="w-6 h-6 text-yellow-600" />
            <span className="text-orange-900 font-medium hidden sm:inline">
              Welcome, <span className="text-yellow-600 font-bold">Alfa Smith</span>
            </span>
          </div>
        </div>
      </header>

      <div className="flex flex-1 relative">
        {/* DESKTOP SIDEBAR */}
        <aside className={` lg:flex flex-col bg-white shadow-lg transition-all duration-300 ${sidebarOpen ? 'w-64' : 'w-20'}`}>
          <div className="p-4 border-b flex items-center justify-between">
            {sidebarOpen && <h2 className="text-sm font-bold text-orange-900">Admin</h2>}
            <button onClick={() => setSidebarOpen(!sidebarOpen)} className="text-gray-500 hover:text-orange-600">
              {sidebarOpen ? <ChevronLeft className="w-5 h-5" /> : <ChevronRight className="w-5 h-5" />}
            </button>
          </div>

          <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
            {menuItems.map((item, idx) => {
              if (item.header) return sidebarOpen ? <div key={idx} className="text-xs font-semibold text-gray-500 uppercase mt-6 mb-2 px-3">{item.header}</div> : null;
              const Icon = item.icon;
              const isActive = currentPath === item.path;

              if (item.dropdown) {
                return (
                  <div key={idx}>
                    <button
                      onClick={() => setDesktopDropdownOpen(prev => !prev)}
                      className={`w-full flex items-center justify-between px-3 py-2 rounded-lg transition ${isReturnedProductsActive && sidebarOpen ? 'bg-orange-100 text-orange-700 font-medium' : 'text-gray-700 hover:bg-gray-100'} ${!sidebarOpen ? 'justify-center' : ''}`}
                    >
                      <div className="flex items-center gap-3">
                        <Icon className="w-5 h-5" />
                        {sidebarOpen && <span className="text-sm">{item.label}</span>}
                      </div>
                      {sidebarOpen && (desktopDropdownOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />)}
                    </button>
                    {desktopDropdownOpen && sidebarOpen && (
                      <div className="ml-8 mt-1 space-y-1">
                        {item.items.map((sub, i) => {
                          const subActive = currentPath === sub.path;
                          return (
                            <Link key={i} to={sub.path} className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition ${subActive ? 'bg-orange-100 text-orange-700 font-medium' : 'text-gray-600 hover:bg-gray-50'}`}>
                              <sub.icon className="w-4 h-4" />
                              <span>{sub.label}</span>
                            </Link>
                          );
                        })}
                      </div>
                    )}
                  </div>
                );
              }

              return (
                <Link key={idx} to={item.path} className={`flex items-center gap-3 px-3 py-2 rounded-lg transition relative ${isActive && sidebarOpen ? 'bg-orange-100 text-orange-700 font-medium' : 'text-gray-700 hover:bg-gray-100'} ${!sidebarOpen ? 'justify-center' : ''}`}>
                  {isActive && sidebarOpen && <div className="absolute inset-y-0 left-0 w-1 bg-orange-600" />}
                  <Icon className="w-5 h-5 flex-shrink-0" />
                  {sidebarOpen && <span className="text-sm">{item.label}</span>}
                </Link>
              );
            })}
          </nav>

          <div className="p-4 border-t">
            <button onClick={handleLogout} className={`w-full flex items-center gap-3 px-3 py-3 rounded-lg text-red-600 hover:bg-red-50 transition font-medium ${!sidebarOpen ? 'justify-center' : ''}`}>
              <LogOut className="w-5 h-5" />
              {sidebarOpen && <span className="text-sm">Logout</span>}
            </button>
          </div>
        </aside>

        {/* MOBILE SIDEBAR */}
        {mobileMenuOpen && (
          <>
            <div className="fixed inset-0 bg-black/50 z-40 lg:hidden" onClick={() => setMobileMenuOpen(false)} />
            <aside className="fixed top-0 left-0 bottom-0 w-72 bg-white shadow-2xl z-50 flex flex-col lg:hidden transition-transform duration-300 translate-x-0">
              <div className="h-20 bg-gradient-to-r from-[#ffd36e] to-[#f59e9e] flex items-center justify-between px-6">
                <h2 className="text-lg font-bold text-orange-900">Menu</h2>
                <button onClick={() => setMobileMenuOpen(false)} className="text-white">
                  <ChevronLeft className="w-8 h-8" />
                </button>
              </div>

              <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
                {menuItems.map((item, idx) => {
                  if (item.header) return <div key={idx} className="text-xs font-bold text-gray-500 uppercase mt-6 mb-3 px-3">{item.header}</div>;
                  const Icon = item.icon;
                  const isActive = currentPath === item.path;

                  if (item.dropdown) {
                    return (
                      <div key={idx}>
                        <button
                          onClick={() => setMobileDropdownOpen(prev => !prev)}
                          className={`w-full flex items-center justify-between px-4 py-3 rounded-xl transition ${isReturnedProductsActive ? 'bg-orange-100 text-orange-700 font-semibold' : 'hover:bg-gray-100'}`}
                        >
                          <div className="flex items-center gap-3">
                            <Icon className="w-5 h-5" />
                            <span className="font-medium">{item.label}</span>
                          </div>
                          {mobileDropdownOpen ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                        </button>
                        {mobileDropdownOpen && (
                          <div className="ml-10 mt-2 space-y-1 bg-gray-50 rounded-xl p-3">
                            {item.items.map((sub, i) => (
                              <Link key={i} to={sub.path} onClick={() => setMobileMenuOpen(false)} className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-orange-100 transition font-medium text-gray-700">
                                <sub.icon className="w-4 h-4" />
                                <span>{sub.label}</span>
                              </Link>
                            ))}
                          </div>
                        )}
                      </div>
                    );
                  }

                  return (
                    <Link key={idx} to={item.path} onClick={() => setMobileMenuOpen(false)} className={`flex items-center gap-3 px-4 py-3 rounded-xl transition font-medium ${isActive ? 'bg-orange-100 text-orange-700 shadow-sm' : 'hover:bg-gray-100'}`}>
                      <Icon className="w-5 h-5" />
                      <span>{item.label}</span>
                    </Link>
                  );
                })}
              </nav>

              <div className="p-4 border-t">
                <button onClick={handleLogout} className="w-full flex items-center gap-3 px-4 py-4 rounded-xl text-red-600 hover:bg-red-50 transition font-semibold">
                  <LogOut className="w-5 h-5" />
                  <span>Logout</span>
                </button>
              </div>
            </aside>
          </>
        )}

        {/* MAIN CONTENT */}
        <main className="flex-1 p-6 lg:p-8 overflow-y-auto">
          <div className="bg-white rounded-2xl shadow-lg p-6 lg:p-8 min-h-full">
            {title && <h2 className="text-2xl font-bold text-gray-900 mb-6">{title}</h2>}
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
