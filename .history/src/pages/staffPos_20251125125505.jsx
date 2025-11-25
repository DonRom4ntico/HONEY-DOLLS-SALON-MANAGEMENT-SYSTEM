import { Bell, Search, Plus, Minus, Trash2 } from "lucide-react";
import { useState, useEffect } from "react";
import axios from "axios";

const API_BASE = import.meta.env.VITE_API_BASE;

export default function StaffPOS() {
  const [searchTerm, setSearchTerm] = useState("");
  const [cart, setCart] = useState([]);
  const [products, setProducts] = useState([]);
  const [services, setServices] = useState([]);
  const [amountPaid, setAmountPaid] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("Cash");
  const [referenceCode, setReferenceCode] = useState("");

  // ---------------- Generate Reference Code ----------------
  const generateReferenceCode = () => {
    const code = Math.floor(1000000000 + Math.random() * 9000000000); // 10 digits
    setReferenceCode(code);
    return code;
  };

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
    generateReferenceCode();
  }, []);

  // ---------------- Cart Helpers ----------------
  const subtotal = cart.reduce(
    (sum, item) => sum + item.unit_price * item.quantity,
    0
  );

  const VAT_RATE = 0.12;
  const vatAmount = subtotal * VAT_RATE;
  const totalWithVAT = subtotal + vatAmount;

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
          unit_price: item.amount || item.price,
          type,
          quantity: 1,
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

  // ---------------- Printable Receipt ----------------
  const openPrintableReceipt = (orderId, refCode) => {
    const receiptWindow = window.open("", "_blank");
    if (!receiptWindow) return;

    const itemsHtml = cart
      .map(
        (i) => `
      <tr>
        <td>${i.quantity} x ${i.name}</td>
        <td style="text-align:right;">₱${(i.quantity * i.unit_price).toFixed(
          2
        )}</td>
      </tr>`
      )
      .join("");

    receiptWindow.document.write(`
      <html>
      <head>
        <title>Receipt #${orderId}</title>
        <style>
          body { font-family: Arial; padding: 20px; }
          table { width: 100%; margin-top: 20px; }
          td { padding: 6px 0; }
          h2 { margin-bottom: 0; }
        </style>
      </head>
      <body>
        <h2>Honey Dolls & Brilliant</h2>
        <p>Davao City</p>
        <hr />

        <p><strong>Order ID:</strong> ${orderId}</p>
        <p><strong>Reference Code:</strong> ${refCode}</p>

        <table>
          ${itemsHtml}
        </table>

        <hr />
        <p><strong>Subtotal:</strong> ₱${subtotal.toFixed(2)}</p>
        <p><strong>VAT (12%):</strong> ₱${vatAmount.toFixed(2)}</p>
        <p><strong>Total:</strong> ₱${totalWithVAT.toFixed(2)}</p>
        <p><strong>Payment Method:</strong> ${paymentMethod}</p>
        <hr />

        <script>
          window.print();
        </script>
      </body>
      </html>
    `);

    receiptWindow.document.close();
  };

  // ---------------- Submit Order + Payment ----------------
  const handleConfirmPay = async () => {
    if (cart.length === 0) return;

    try {
      const token = localStorage.getItem("token");

      const newRef = generateReferenceCode();

      const payload = {
        items: cart.map((i) => ({
          productid: i.type === "product" ? i.id : null,
          serviceid: i.type === "service" ? i.id : null,
          quantity: i.quantity,
          unit_price: i.unit_price,
        })),
        reference_code: newRef,
        partialamountpaid: amountPaid,
        method: paymentMethod,
      };

      const res = await axios.post(`${API_BASE}/orders/pay`, payload, {
        headers: { Authorization: `Bearer ${token}` },
      });

      const orderId = res.data.orderid;

      openPrintableReceipt(orderId, newRef);

      clearCart();
      setAmountPaid("");
    } catch (err) {
      console.error(err);
      alert(
        "Failed to process payment: " +
          (err.response?.data?.message || err.message)
      );
    }
  };

  // ---------------- Render ----------------
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
          <Bell className="w-6 h-6 text-yellow-600" />
        </div>
      </header>

      {/* MAIN */}
      <main className="flex-1 px-6 py-8 max-w-7xl mx-auto w-full">
        <div className="grid lg:grid-cols-[2fr_1fr] gap-8 h-[calc(100vh-100px)]">
          {/* LEFT: Services + Products */}
          <div className="overflow-y-auto pr-2">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-bold text-gray-900">
                Services & Products
              </h2>

              <div className="relative">
                <Search className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 pr-4 py-3 w-64 border rounded-xl"
                />
              </div>
            </div>

            {/* Two-column grid */}
            <div className="grid grid-cols-2 gap-4">
              {[...services, ...products]
                .filter((item) => {
                  const name = item.servicename || item.prodname;
                  return name.toLowerCase().includes(searchTerm.toLowerCase());
                })
                .map((item) => {
                  const type = item.serviceid ? "service" : "product";
                  const name = item.servicename || item.prodname;
                  const price = item.amount || item.price;

                  return (
                    <div
                      key={`${type}-${item.serviceid || item.productid}`}
                      className="bg-gray-50 rounded-2xl p-4 shadow hover:shadow-md"
                    >
                      <h3 className="font-semibold text-gray-900">{name}</h3>
                      <p className="text-gray-600">₱{price}</p>
                      <button
                        onClick={() => addToCart(item, type)}
                        className="mt-2 w-full bg-yellow-400 py-2 rounded-lg font-medium"
                      >
                        Add
                      </button>
                    </div>
                  );
                })}
            </div>
          </div>

          {/* RIGHT: Receipt */}
          <div className="bg-gray-50 rounded-2xl p-5 flex flex-col h-full overflow-y-auto">
            <h3 className="font-bold text-gray-900 mb-4">Receipt</h3>

            <p className="text-sm text-gray-700 mb-3">
              <strong>Reference Code:</strong> {referenceCode}
            </p>

            <div className="flex-1 space-y-2 mb-4">
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
                    <div className="flex-1">
                      <p className="font-medium">
                        {item.quantity} x {item.name}
                      </p>
                      <p className="text-gray-600">
                        ₱{(item.quantity * item.unit_price).toFixed(2)}
                      </p>
                    </div>
                    <div className="flex items-center gap-1">
                      <button
                        onClick={() => updateQty(item.id, -1)}
                        className="w-6 h-6 bg-gray-200 rounded-full flex items-center justify-center"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="w-6 text-center">{item.quantity}</span>
                      <button
                        onClick={() => updateQty(item.id, 1)}
                        className="w-6 h-6 bg-gray-200 rounded-full flex items-center justify-center"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="ml-2 text-red-500"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>

            <div className="border-t pt-3 mb-4 text-sm">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>₱{subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>VAT (12%)</span>
                <span>₱{vatAmount.toFixed(2)}</span>
              </div>
              <div className="flex justify-between font-bold text-lg">
                <span>Total</span>
                <span>₱{totalWithVAT.toFixed(2)}</span>
              </div>
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium">Amount Paid</label>
              <input
                type="number"
                value={amountPaid}
                onChange={(e) => setAmountPaid(e.target.value)}
                className="w-full px-4 py-2 border rounded-xl"
              />
            </div>

            <div className="mb-6">
              <label className="block text-sm font-medium">
                Payment Method
              </label>
              <div className="grid grid-cols-2 gap-2">
                {["Cash", "GCash"].map((method) => (
                  <button
                    key={method}
                    onClick={() => setPaymentMethod(method)}
                    className={`py-2 rounded-xl border ${
                      paymentMethod === method
                        ? "bg-orange-500 text-white"
                        : "bg-white"
                    }`}
                  >
                    {method}
                  </button>
                ))}
              </div>
            </div>

            <button
              onClick={handleConfirmPay}
              disabled={cart.length === 0}
              className="w-full bg-gradient-to-r from-[#ffd36e] to-[#f59e9e] text-white font-bold py-3 rounded-full shadow disabled:opacity-50"
            >
              Confirm & Print Receipt
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}
