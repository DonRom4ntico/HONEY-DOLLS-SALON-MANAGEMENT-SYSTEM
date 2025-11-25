import { Bell, Search, Plus, Minus, Trash2, Printer } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import axios from "axios";

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
          image:
            item.prodimage?.startsWith("http") ||
            item.prodimage?.startsWith("/")
              ? item.prodimage
              : `${API_BASE}/${item.prodimage}`,
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

  const removeFromCart = (id) => setCart(cart.filter((item) => item.id !== id));
  const clearCart = () => setCart([]);

  // ---------------- Print Receipt ----------------
  const handlePrint = () => {
    if (!receiptRef.current) return;
    const printContents = receiptRef.current.innerHTML;
    const printWindow = window.open("", "", "width=600,height=800");
    printWindow.document.write(
      "<html><head><title>Receipt</title></head><body>"
    );
    printWindow.document.write(printContents);
    printWindow.document.write("</body></html>");
    printWindow.document.close();
    printWindow.focus();
    printWindow.print();
  };

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

      // After payment, cart stays so receipt can still be printed
      setReferenceCode(Date.now()); // generate new reference for next order
      setAmountPaid("");
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
                  const image =
                    item.prodimage?.startsWith("http") ||
                    item.prodimage?.startsWith("/")
                      ? item.prodimage
                      : item.prodimage
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
            <div ref={receiptRef}>
              <h3 className="font-bold text-gray-900 mb-2">Cart / Receipt</h3>
              <p className="text-sm mb-2">Reference Code: {referenceCode}</p>

              {/* CART ITEMS */}
              <div className="space-y-2 mb-4">
                {cart.length === 0 ? (
                  <p className="text-center text-gray-500 text-sm py-8">
                    Cart is empty
                  </p>
                ) : (
                  cart.map((item) => (
                    <div
                      key={item.id}
                      className="bg-white rounded-xl p-3 flex items-center justify-between text-sm"
                    >
                      <div className="flex-1 flex items-center gap-2">
                        {item.image && (
                          <img
                            src={item.image}
                            alt={item.name}
                            className="w-12 h-12 object-cover rounded"
                          />
                        )}
                        <div>
                          <p className="font-medium">
                            {item.quantity} x {item.name}
                          </p>
                          <p className="text-gray-600">
                            ₱{(item.quantity * item.unit_price).toFixed(2)}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-1">
                        <button
                          onClick={() => updateQty(item.id, -1)}
                          className="w-6 h-6 bg-gray-200 rounded-full flex items-center justify-center hover:bg-gray-300"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="w-6 text-center">{item.quantity}</span>
                        <button
                          onClick={() => updateQty(item.id, 1)}
                          className="w-6 h-6 bg-gray-200 rounded-full flex items-center justify-center hover:bg-gray-300"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                        <button
                          onClick={() => removeFromCart(item.id)}
                          className="ml-2 text-red-500 hover:text-red-700"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))
                )}
              </div>

              {/* TOTALS */}
              <div className="border-t pt-3 mb-4 space-y-1 text-sm">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>₱{subtotal.toFixed(2)}</span>
                </div>

                <div className="flex justify-between">
                  <span>VAT (12%)</span>
                  <span>₱{vat.toFixed(2)}</span>
                </div>

                <div className="flex justify-between font-bold text-lg pt-1">
                  <span>Total</span>
                  <span>₱{total.toFixed(2)}</span>
                </div>
              </div>

              {/* AMOUNT PAID */}
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Amount Paid
                </label>
                <input
                  type="number"
                  value={amountPaid}
                  onChange={(e) => setAmountPaid(e.target.value)}
                  placeholder="0.00"
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:border-orange-400 text-sm"
                />
              </div>

              {/* CHANGE */}
              {amountPaid && (
                <div className="flex justify-between text-md font-semibold text-green-700 mb-4">
                  <span>Change</span>
                  <span>₱{change.toFixed(2)}</span>
                </div>
              )}
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
