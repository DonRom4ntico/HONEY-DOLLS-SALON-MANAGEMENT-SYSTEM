import { Search, Plus, Minus, Trash2 } from "lucide-react";
import { useState, useEffect } from "react";
import axios from "axios";

const API_BASE = import.meta.env.VITE_API_BASE;

export default function StaffPOS() {
  const [searchTerm, setSearchTerm] = useState("");
  const [cart, setCart] = useState([]);
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

  const subtotal = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const addToCart = (item) => {
    const existing = cart.find((i) => i.id === item.id && i.type === item.type);
    if (existing) {
      setCart(
        cart.map((i) =>
          i.id === item.id && i.type === item.type
            ? { ...i, quantity: i.quantity + 1 }
            : i
        )
      );
    } else {
      setCart([...cart, { ...item, quantity: 1 }]);
    }
  };

  const updateQty = (id, type, delta) => {
    setCart(
      cart
        .map((item) => {
          if (item.id === id && item.type === type) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean)
    );
  };

  const removeFromCart = (id, type) => {
    setCart(cart.filter((item) => !(item.id === id && item.type === type)));
  };

  const clearCart = () => setCart([]);

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
    <div className="min-h-screen bg-orange-50 flex flex-col">
      {/* HEADER */}
      <header className="bg-gradient-to-r from-[#ffd36e] to-[#f59e9e] shadow-sm">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <h1 className="font-bold text-orange-900 text-xl">
            Honey Dolls • Staff POS
          </h1>
        </div>
      </header>

      {/* MAIN 3-COLUMN LAYOUT */}
      <div className="flex flex-1 max-w-7xl mx-auto mt-4 px-4 gap-4">
        {/* LEFT SIDEBAR */}
        <aside className="w-64 bg-white shadow-md p-4 flex-shrink-0">
          <h2 className="font-bold mb-3">Filters</h2>
          <div className="mb-4">
            <label className="block font-medium mb-1">Category</label>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full border px-2 py-1 rounded"
            >
              <option value="All">All</option>
              {Array.from(new Set(products.map((p) => p.category))).map(
                (cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                )
              )}
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

        {/* CENTER: Products / Services */}
        <main className="flex-1 grid grid-cols-2 gap-4">
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
              <button
                onClick={() => addToCart(item)}
                className="mt-3 bg-yellow-400 hover:bg-yellow-500 text-gray-900 py-1 rounded font-medium flex items-center justify-center"
              >
                <Plus className="w-4 h-4 mr-1" /> Add
              </button>
            </div>
          ))}
        </main>

        {/* RIGHT SIDEBAR: Cart */}
        <aside className="w-80 bg-white shadow-md p-4 flex-shrink-0">
          <h2 className="font-bold mb-4">Cart / Receipt</h2>
          <div className="space-y-2 max-h-[600px] overflow-y-auto mb-4">
            {cart.length === 0 ? (
              <p className="text-center text-gray-500 py-8">Cart is empty</p>
            ) : (
              cart.map((item) => (
                <div
                  key={`${item.type}-${item.id}`}
                  className="flex justify-between items-center bg-gray-50 p-2 rounded"
                >
                  <div>
                    <p className="font-medium">
                      {item.quantity} x {item.name}
                    </p>
                    <p className="text-sm text-gray-600">
                      ₱{(item.price * item.quantity).toFixed(2)}
                    </p>
                  </div>
                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => updateQty(item.id, item.type, -1)}
                      className="w-6 h-6 bg-gray-200 rounded-full flex items-center justify-center hover:bg-gray-300"
                    >
                      <Minus className="w-3 h-3" />
                    </button>
                    <span className="w-6 text-center">{item.quantity}</span>
                    <button
                      onClick={() => updateQty(item.id, item.type, 1)}
                      className="w-6 h-6 bg-gray-200 rounded-full flex items-center justify-center hover:bg-gray-300"
                    >
                      <Plus className="w-3 h-3" />
                    </button>
                    <button
                      onClick={() => removeFromCart(item.id, item.type)}
                      className="ml-2 text-red-500 hover:text-red-700"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>

          <div className="border-t pt-3 mb-4">
            <div className="flex justify-between font-bold">
              <span>Subtotal</span>
              <span>₱{subtotal.toFixed(2)}</span>
            </div>
          </div>

          <button
            onClick={clearCart}
            className="w-full border border-gray-300 text-gray-700 py-2 rounded hover:bg-gray-50 font-medium mb-2"
          >
            Clear Cart
          </button>

          <button
            onClick={() => alert(`Total Payment: ₱${subtotal.toFixed(2)}`)}
            disabled={cart.length === 0}
            className="w-full bg-gradient-to-r from-[#ffd36e] to-[#f59e9e] text-white py-2 rounded font-bold disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Confirm & Pay
          </button>
        </aside>
      </div>
    </div>
  );
}
