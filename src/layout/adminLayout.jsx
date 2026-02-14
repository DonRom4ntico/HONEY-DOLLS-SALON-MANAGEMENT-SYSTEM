// src/layout/AdminLayout.jsx
import React, { useState, useEffect } from "react";
import {
  Home,
  Megaphone,
  Box,
  ArrowRightLeft,
  Trash2,
  AlertTriangle,
  Package,
  Users,
  Building,
  FileText,
  DollarSign,
  Archive,
  PlusCircle,
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  ChevronUp,
  Store,
  LogOut,
  PlusSquare,
  User,
  Plus,
  ShieldAlert,
  Settings,
} from "lucide-react";
import axios from "axios";

import { Link, useLocation, useNavigate } from "react-router-dom";

export default function AdminLayout({ children, title }) {
  const location = useLocation();
  const navigate = useNavigate();

  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const iconSize = sidebarOpen ? "w-5 h-5" : "w-6 h-6";

  const menuItems = [
    { icon: Home, label: "Dashboard", path: "/adminDashboard" },
    { icon: FileText, label: "Sales", path: "/adminSales" },
    { icon: User, label: "Add New Staff", path: "/addStaff" },
    { icon: ShieldAlert, label: "Add New Admin", path: "/addAdmin" },
    { icon: Megaphone, label: "Announcements", path: "/adminAnnouncement" },

    { header: "Products" },
    {
      icon: ArrowRightLeft,
      label: "Products Transfer",
      path: "/adminProductTransfer",
    },
    { icon: Box, label: "Products Sold", path: "/adminProductSold" },
    { icon: FileText, label: "Product Usage", path: "/adminProductUsage" },
    { icon: Trash2, label: "Products Wasted", path: "/adminProductWaste" },
    {
      icon: AlertTriangle,
      label: "Products Damaged",
      path: "/adminProductDamage",
    },
    {
      icon: Package,
      label: "Returned Products",
      dropdown: true,
      items: [
        { icon: Users, label: "Customer", path: "/customerReturnedProducts" },
        { icon: Store, label: "Supplier", path: "/supplierReturn" },
        { icon: Building, label: "Branches", path: "/branchReturn" },
      ],
    },

    { header: "Action" },
    {
      icon: DollarSign,
      label: "Supplier Purchases",
      path: "/supplierPurchases",
    },
    {
      icon: PlusSquare,
      label: "Supplier Purchases Record",
      path: "/supplierPurRecord",
    },
    {
      icon: PlusCircle,
      label: "Add Product Display",
      path: "/productDisplay",
    },
    { icon: Plus, label: "Service Display", path: "/serviceDisplay" },
    { icon: Archive, label: "Transaction", path: "/Transaction" },
    { icon: Box, label: "Inventory", path: "/inventory" },
  ];

  const currentPath = location.pathname;

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    navigate("/login");
  };
  const [adminName, setAdminName] = useState(""); // store admin name
  const [loadingAdmin, setLoadingAdmin] = useState(true);

  useEffect(() => {
    const fetchAdmin = async () => {
      try {
        const token = localStorage.getItem("authToken"); // your admin token
        if (!token) {
          setAdminName("Guest Admin");
          setLoadingAdmin(false);
          return;
        }

        const res = await axios.get(`${API_BASE}/user/me`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        // Adjust based on your API response structure
        setAdminName(res.data.fullName || res.data.username || "Admin");
      } catch (err) {
        console.error(
          "Failed to fetch admin:",
          err.response?.data || err.message,
        );
        setAdminName("Guest Admin");
      } finally {
        setLoadingAdmin(false);
      }
    };

    fetchAdmin();
  }, []);

  return (
    <div className="min-h-screen flex bg-gradient-to-b from-orange-50 to-pink-50">
      {/* SIDEBAR */}
      <aside
        className={`bg-white shadow-xl transition-all duration-300 ${
          sidebarOpen ? "w-64" : "w-20"
        }`}
      >
        {/* BRAND HEADER */}
        <div className="h-20 border-b flex items-center justify-between px-4">
          <div className="flex items-center gap-3">
            <img
              src="/src/assets/nigga.png"
              alt="Honey Dolls Salon"
              className={`transition-all duration-300 rounded-full ${
                sidebarOpen ? "w-10 h-10" : "w-8 h-8"
              }`}
              onError={(e) => {
                e.target.src =
                  "https://via.placeholder.com/80/fbcfe8/000000?text=HD";
              }}
            />
            {sidebarOpen && (
              <div className="leading-tight">
                <p className="text-sm font-bold text-orange-900">
                  {loadingAdmin ? "Loading..." : adminName}
                </p>
                <p className="text-xs text-gray-500">Admin Panel</p>
              </div>
            )}
          </div>

          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="text-gray-500 hover:text-orange-600"
          >
            {sidebarOpen ? (
              <ChevronLeft className="w-5 h-5" />
            ) : (
              <ChevronRight className="w-5 h-5" />
            )}
          </button>
        </div>

        {/* NAV */}
        <nav className="p-4 space-y-1 overflow-y-auto h-[calc(100vh-200px)]">
          {menuItems.map((item, idx) => {
            if (item.header)
              return sidebarOpen ? (
                <div
                  key={idx}
                  className="text-xs font-semibold text-gray-500 uppercase mt-6 mb-2 px-3"
                >
                  {item.header}
                </div>
              ) : null;

            const Icon = item.icon;
            const isActive = currentPath === item.path;

            // Dropdown Menu
            if (item.dropdown) {
              return (
                <div key={idx}>
                  <button
                    onClick={() => {
                      // Only toggle dropdown if sidebar is open
                      if (sidebarOpen) setDropdownOpen(!dropdownOpen);
                    }}
                    className={`w-full flex items-center justify-between px-3 py-2 rounded-lg transition
                      ${
                        dropdownOpen
                          ? "bg-orange-100 text-orange-700"
                          : "text-gray-700 hover:bg-gray-100"
                      }
                      ${!sidebarOpen ? "justify-center" : ""}
                    `}
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className={`flex items-center justify-center ${
                          sidebarOpen ? "" : "w-12 h-12"
                        }`}
                      >
                        <Icon className={iconSize} />
                      </div>
                      {sidebarOpen && <span>{item.label}</span>}
                    </div>

                    {sidebarOpen &&
                      (dropdownOpen ? (
                        <ChevronUp className="w-4 h-4" />
                      ) : (
                        <ChevronDown className="w-4 h-4" />
                      ))}
                  </button>

                  {/* Render sub-items only when sidebar is open and dropdownOpen */}
                  {sidebarOpen &&
                    dropdownOpen &&
                    item.items.map((subItem, subIdx) => {
                      const SubIcon = subItem.icon;
                      const isSubActive = currentPath === subItem.path;
                      return (
                        <Link
                          key={subIdx}
                          to={subItem.path}
                          className={`flex items-center gap-3 px-8 py-2 rounded-lg transition
                            ${
                              isSubActive
                                ? "bg-orange-100 text-orange-700 font-medium"
                                : "text-gray-700 hover:bg-gray-100"
                            }`}
                        >
                          <SubIcon className="w-4 h-4" />
                          <span>{subItem.label}</span>
                        </Link>
                      );
                    })}
                </div>
              );
            }

            // Normal link
            return (
              <Link
                key={idx}
                to={item.path}
                className={`flex items-center gap-3 px-3 py-2 rounded-lg transition
                  ${
                    isActive
                      ? "bg-orange-100 text-orange-700 font-medium"
                      : "text-gray-700 hover:bg-gray-100"
                  }
                  ${!sidebarOpen ? "justify-center" : ""}
                `}
              >
                <div
                  className={`flex items-center justify-center ${!sidebarOpen ? "w-12 h-12" : ""}`}
                >
                  <Icon className={iconSize} />
                </div>
                {sidebarOpen && <span>{item.label}</span>}
              </Link>
            );
          })}
        </nav>
        {/* PROFILE & LOGOUT */}
        <div className="border-t p-4 mt-auto space-y-1">
          <button
            onClick={handleLogout}
            className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-red-600 hover:bg-red-50 transition ${
              !sidebarOpen ? "justify-center" : ""
            }`}
          >
            <div
              className={`flex items-center justify-center ${!sidebarOpen ? "w-12 h-12" : ""}`}
            >
              <LogOut className={iconSize} />
            </div>
            {sidebarOpen && <span>Logout</span>}
          </button>
        </div>
      </aside>

      {/* MAIN */}
      <main className="flex-1 p-6 lg:p-8 overflow-y-auto">
        <div className="min-h-full">
          {title && (
            <h2 className="text-2xl font-bold text-gray-900 mb-6">{title}</h2>
          )}
          {children}
        </div>
      </main>
    </div>
  );
}
