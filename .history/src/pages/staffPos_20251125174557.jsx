import { Bell, Search, Plus, Minus, Trash2, Printer } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import axios from "axios";
import { useReactToPrint } from "react-to-print";

const API_BASE = import.meta.env.VITE_API_BASE;

export default function StaffPOS() {
  const [searchTerm, setSearchTerm] = useState("");
  const [cart, setCart] = useState([]);
  const [products, setProducts] = useState([]);
  const [services, setServices] = useState([]);
  const [amountPaid, setAmountPaid] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("Cash");
  const [referenceCode, setReferenceCode] = useState(Date.now());

  const receiptRef = useRef();

  // ---------------- Fetch Products & Services ----------------
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [prodRes, servRes] = await Promise.all([
          axios.get(`${API_BASE}/products`),
          axios.get(`${API_BASE}/services`),
        ]);
        setProducts(prodRes.data.products);
        setServices(servRes.data.services);
      } catch (err) {
        console.error("Failed to fetch products/services:", err);
      }
    };
    fetchData();
  }, []);

  // ---------------- Cart Helpers ----------------
  const subtotal = cart.reduce(
    (sum, item) => sum + item.unit_price * item.quantity,
    0
  );
  const VAT_RATE = 0.12;
  const vat = subtotal * VAT_RATE;
  const total = subtotal + vat;
  const change = amountPaid ? Number(amountPaid) - total : 0;

  const addToCart = (item, type) => {
    const existing = cart.find(
      (i) => i.id === (item.serviceid || item.productid) && i.type === type
    );
    if (existing) {
      setCart(
        cart.map((i) =>
          i.id === (item.serviceid || item.productid) && i.type === type
            ? { ...i, quantity: i.quantity + 1 }
            : i
        )
      );
    } else {
      setCart([
        ...cart,
        {
          id: item.serviceid || item.productid,
          name: item.servicename || item.prodname,
          unit_price: Number(item.amount || item.price),
          type,
          quantity: 1,
          image: item.prodimage || null,
        },
      ]);
    }
  };

  const updateQty = (id, delta) => {
    setCart(
      cart
        .map((item) => {
          if (item.id === id) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean)
    );
  };

  const removeFromCart = (id) => {
    setCart(cart.filter((item) => item.id !== id));
  };

  const clearCart = () => setCart([]);

  // ---------------- Print Receipt ----------------
  const handlePrint = useReactToPrint({
    content: () => receiptRef.current,
    documentTitle: `Receipt-${referenceCode}`,
  });

  // ---------------- CONFIRM & PAY ----------------
  const handleConfirmPay = async () => {
    if (cart.length === 0) return alert("Cart is empty!");
    if (!amountPaid || Number(amountPaid) < total)
      return alert("Amount paid is not enough!");

    try {
      const token = localStorage.getItem("token");

      // 1️⃣ Create Order
      const orderPayload = {
        items: cart.map((i) => ({
          productid: i.type === "product" ? i.id : null,
          serviceid: i.type === "service" ? i.id : null,
          quantity: i.quantity,
          unit_price: i.unit_price,
        })),
      };

      const orderRes = await axios.post(`${API_BASE}/orders`, orderPayload, {
        headers: { Authorization: `Bearer ${token}` },
      });

      const orderId = orderRes.data.orderid;

      // 2️⃣ Insert Payment
      const paymentPayload = {
        orderid: orderId,
        reference_code: referenceCode,
        partialamountpaid: total,
        method: paymentMethod,
      };

      await axios.post(`${API_BASE}/customerpayment`, paymentPayload, {
        headers: { Authorization: `Bearer ${token}` },
      });

      alert(
        `Payment Successful!\nOrder ID: ${orderId}\nChange: ₱${change.toFixed(
          2
        )}`
      );

      clearCart();
      setAmountPaid("");
      setReferenceCode(Date.now());
    } catch (err) {
      console.error(err);
      alert("Payment failed: " + (err.response?.data?.message || err.message));
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-50 to-pink-50 flex flex-col">
      {/* HEADER */}
      <header className="bg-gradient-to-r from-[#ffd36e] to-[#f59e9e] shadow-sm">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img
              src="/src/assets/honeydolls.jpg"
              alt="Honey Dolls"
              className="w-14 h-14 rounded-full object-cover border-2 border-white shadow-sm"
            />
            <div>
              <h1 className="text-xl font-bold text-orange-900">
                Honey Dolls & Brilliant
              </h1>
              <p className="text-sm text-orange-800 font-medium">
                Beauty Hub — Davao
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Bell className="w-6 h-6 text-yellow-600" />
            <span className="text-orange-900 font-medium text-sm hidden sm:inline">
              Logged in: <span className="text-yellow-600">Anna (Staff)</span>
            </span>
          </div>
        </div>
      </header>

      {/* MAIN */}
      <main className="flex-1 px-6 py-8 max-w-7xl mx-auto w-full">
        <div className="grid lg:grid-cols-[2fr_1fr] gap-8 h-[calc(100vh-100px)]">
          {/* LEFT: Products & Services */}
          <div className="overflow-y-auto pr-2">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-lg font-bold text-gray-900">
                  Honey Dolls • Staff POS
                </h2>
                <p className="text-sm text-gray-600">Services & Products</p>
              </div>
              <div className="relative">
                <Search className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search services or products..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 pr-4 py-3 w-64 border border-gray-300 rounded-xl focus:outline-none focus:border-orange-400 text-sm"
                />
              </div>
            </div>

            {/* Grid 2 columns */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[...services, ...products]
                .filter((item) => {
                  const name = item.servicename || item.prodname;
                  return name.toLowerCase().includes(searchTerm.toLowerCase());
                })
                .map((item) => {
                  const type = item.serviceid ? "service" : "product";
                  const name = item.servicename || item.prodname;
                  const price = item.amount || item.price;
                  const image = item.prodimage
                    ? `${API_BASE}/${item.prodimage}`
                    : null;

                  const added = cart.reduce((acc, i) => {
                    if (i.id === (item.serviceid || item.productid))
                      return i.quantity;
                    return acc;
                  }, 0);

                  return (
                    <div
                      key={`${type}-${item.serviceid || item.productid}`}
                      className="bg-gray-50 rounded-2xl overflow-hidden shadow-sm hover:shadow transition cursor-pointer"
                    >
                      {image && (
                        <img
                          src={image}
                          alt={name}
                          className="w-full h-28 object-cover rounded-t-2xl"
                        />
                      )}
                      <div className="p-3">
                        <h3 className="font-medium text-gray-900">{name}</h3>
                        <p className="text-sm text-gray-600">
                          ₱{price} •{" "}
                          {type === "service" ? item.servicetype : "Product"}
                        </p>
                        <button
                          onClick={() => addToCart(item, type)}
                          className="mt-2 w-full bg-yellow-400 text-gray-900 font-medium py-2 rounded-full hover:bg-yellow-500 transition text-sm"
                        >
                          Add
                        </button>
                        {added > 0 && (
                          <div className="mt-1 text-sm text-gray-700">
                            Added: {added}
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
            </div>
          </div>

          {/* RIGHT: Cart/Receipt */}
          <div className="bg-gray-50 rounded-2xl p-5 flex flex-col h-full overflow-y-auto">
            <div
              ref={receiptRef}
              className="p-4 bg-white text-gray-900 rounded-2xl print:w-[300px] print:p-2 print:shadow-none"
            >
              {/* Your receipt content (cart items, totals, payment info) goes here */}
            </div>

            {/* BUTTONS */}
            <div className="space-y-3">
              <button
                onClick={handleConfirmPay}
                disabled={cart.length === 0}
                className="w-full bg-gradient-to-r from-[#ffd36e] to-[#f59e9e] text-white font-bold py-3 rounded-full shadow hover:shadow-md transition disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Confirm & Pay
              </button>

              <button
                onClick={handlePrint}
                disabled={cart.length === 0}
                className="w-full flex items-center justify-center gap-2 border border-gray-300 text-gray-700 py-3 rounded-full hover:bg-gray-50 transition font-medium text-sm"
              >
                <Printer className="w-4 h-4" /> Print Receipt
              </button>

              <button
                onClick={clearCart}
                className="w-full border border-gray-300 text-gray-700 py-3 rounded-full hover:bg-gray-50 transition font-medium text-sm"
              >
                Clear Cart
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
