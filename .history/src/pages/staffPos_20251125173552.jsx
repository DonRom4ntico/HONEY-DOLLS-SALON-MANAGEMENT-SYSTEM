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

        setProducts(
          Array.isArray(prodRes.data.products) ? prodRes.data.products : []
        );
        setServices(
          Array.isArray(servRes.data.services) ? servRes.data.services : []
        );
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

  const removeFromCart = (id) => setCart(cart.filter((item) => item.id !== id));
  const clearCart = () => setCart([]);

  // ---------------- Print Receipt ----------------
  const handlePrint = () => {
    if (!receiptRef.current) return;
    const printContents = receiptRef.current.innerHTML;
    const original = document.body.innerHTML;

    document.body.innerHTML = printContents;
    window.print();
    document.body.innerHTML = original;
    window.location.reload();
  };

  // ---------------- Confirm & Pay ----------------
  const handleConfirmPay = async () => {
    if (cart.length === 0) return alert("Cart is empty!");
    if (!amountPaid || Number(amountPaid) < total)
      return alert("Amount paid is not enough!");

    try {
      const token = localStorage.getItem("token");

      // Create Order
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

      // Insert Payment
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

  // --------------------------------------------------------------------
  // ----------------------------- UI -----------------------------------
  // --------------------------------------------------------------------

  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-50 to-pink-50 flex flex-col">
      <header className="bg-gradient-to-r from-[#ffd36e] to-[#f59e9e] shadow-sm">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img
              src="/src/assets/honeydolls.jpg"
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
        </div>
      </header>

      <main className="flex-1 px-6 py-8 max-w-7xl mx-auto w-full">
        <div className="grid lg:grid-cols-[2fr_1fr] gap-8 h-[calc(100vh-100px)]">
          {/* LEFT: Products & Services */}
          <div className="overflow-y-auto pr-2">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[...services, ...products]
                .filter((item) => {
                  const name = item.servicename || item.prodname;
                  return name?.toLowerCase().includes(searchTerm.toLowerCase());
                })
                .map((item) => {
                  const type = item.serviceid ? "service" : "product";
                  const name = item.servicename || item.prodname;
                  const price = item.amount || item.price;
                  const image =
                    item.prodimage && `${API_BASE}/${item.prodimage}`;

                  return (
                    <div
                      key={`${type}-${item.serviceid || item.productid}`}
                      className="bg-gray-50 rounded-2xl overflow-hidden shadow"
                    >
                      {image && (
                        <img src={image} className="w-full h-28 object-cover" />
                      )}
                      <div className="p-3">
                        <h3 className="font-medium text-gray-900">{name}</h3>
                        <p className="text-sm text-gray-600">₱{price}</p>
                        <button
                          className="mt-2 w-full bg-yellow-400 text-gray-900 font-medium py-2 rounded-full"
                          onClick={() => addToCart(item, type)}
                        >
                          Add
                        </button>
                      </div>
                    </div>
                  );
                })}
            </div>
          </div>

          {/* RIGHT PANEL: Receipt / Cart */}
          <div className="bg-gray-50 rounded-2xl p-5 flex flex-col overflow-y-auto">
            <div ref={receiptRef}>
              <h2 className="text-xl font-bold text-gray-900 mb-4">Receipt</h2>
              <p>Reference: {referenceCode}</p>

              {cart.map((item) => (
                <div
                  key={item.id}
                  className="flex justify-between py-2 border-b"
                >
                  <span>
                    {item.quantity} x {item.name}
                  </span>
                  <span>₱{(item.quantity * item.unit_price).toFixed(2)}</span>
                </div>
              ))}

              <div className="mt-4 border-t pt-3">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>₱{subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>VAT (12%)</span>
                  <span>₱{vat.toFixed(2)}</span>
                </div>
                <div className="flex justify-between font-bold text-lg">
                  <span>Total</span>
                  <span>₱{total.toFixed(2)}</span>
                </div>
              </div>
            </div>

            {/* Payment */}
            <input
              type="number"
              value={amountPaid}
              onChange={(e) => setAmountPaid(e.target.value)}
              className="mt-4 w-full border p-2 rounded"
              placeholder="Amount Paid"
            />

            {amountPaid && (
              <div className="flex justify-between mt-2 font-bold text-green-700">
                <span>Change</span>
                <span>₱{change.toFixed(2)}</span>
              </div>
            )}

            {/* Buttons */}
            <button
              className="mt-4 bg-orange-500 text-white py-3 rounded-full"
              onClick={handleConfirmPay}
            >
              Confirm & Pay
            </button>

            <button
              className="mt-2 border py-3 rounded-full"
              onClick={handlePrint}
            >
              Print Receipt
            </button>

            <button
              className="mt-2 border py-3 rounded-full"
              onClick={clearCart}
            >
              Clear Cart
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}
