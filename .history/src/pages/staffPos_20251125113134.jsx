import { Search, Plus } from "lucide-react";
import { useState, useEffect } from "react";
import axios from "axios";

const API_BASE = import.meta.env.VITE_API_BASE;

export default function StaffPOS() {
  const [searchTerm, setSearchTerm] = useState("");
  const [products, setProducts] = useState([]);
  const [services, setServices] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedServiceType, setSelectedServiceType] = useState("All");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [prodRes, servRes] = await Promise.all([
          axios.get(`${API_BASE}/products`),
          axios.get(`${API_BASE}/services`),
        ]);

        const normalizedProducts = (prodRes.data.products || []).map((p) => ({
          id: p.productid,
          name: p.prodname,
          category: p.prodcat,
          price: parseFloat(p.price) || 0,
          type: "product",
        }));

        const normalizedServices = (servRes.data.services || []).map((s) => ({
          id: s.serviceid,
          name: s.servicename,
          servicetype: s.servicetype,
          price: parseFloat(s.amount) || 0,
          type: "service",
        }));

        setProducts(normalizedProducts);
        setServices(normalizedServices);
      } catch (err) {
        console.error("Failed to fetch products/services:", err);
      }
    };

    fetchData();
  }, []);

  // Filtered list
  const filteredProducts = products
    .filter((p) =>
      selectedCategory === "All" ? true : p.category === selectedCategory
    )
    .filter((p) => p.name.toLowerCase().includes(searchTerm.toLowerCase()));

  const filteredServices = services
    .filter((s) =>
      selectedServiceType === "All"
        ? true
        : s.servicetype === selectedServiceType
    )
    .filter((s) => s.name.toLowerCase().includes(searchTerm.toLowerCase()));

  const allItems = [...filteredServices, ...filteredProducts];

  return (
    <div className="min-h-screen flex bg-orange-50">
      {/* Sidebar Filters */}
      <aside className="w-64 bg-white shadow-md p-4">
        <h2 className="font-bold mb-3">Filters</h2>
        <div className="mb-4">
          <label className="block font-medium mb-1">Category</label>
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="w-full border px-2 py-1 rounded"
          >
            <option value="All">All</option>
            {Array.from(new Set(products.map((p) => p.category))).map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="block font-medium mb-1">Service Type</label>
          <select
            value={selectedServiceType}
            onChange={(e) => setSelectedServiceType(e.target.value)}
            className="w-full border px-2 py-1 rounded"
          >
            <option value="All">All</option>
            {Array.from(new Set(services.map((s) => s.servicetype))).map(
              (type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              )
            )}
          </select>
        </div>
      </aside>

      {/* Main Grid */}
      <main className="flex-1 p-6">
        <div className="mb-4 relative">
          <Search className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search products/services..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 pr-4 py-2 w-64 border rounded"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          {allItems.map((item) => (
            <div
              key={`${item.type}-${item.id}`}
              className="bg-white p-4 rounded shadow hover:shadow-md flex flex-col justify-between"
            >
              <div>
                <h3 className="font-bold">{item.name}</h3>
                <p className="text-sm text-gray-600">
                  {item.type === "product" ? item.category : item.servicetype}
                </p>
                <p className="text-sm font-medium mt-1">
                  ₱{item.price.toFixed(2)}
                </p>
              </div>
              <button className="mt-3 bg-yellow-400 hover:bg-yellow-500 text-gray-900 py-1 rounded font-medium flex items-center justify-center">
                <Plus className="w-4 h-4 mr-1" /> Add
              </button>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
