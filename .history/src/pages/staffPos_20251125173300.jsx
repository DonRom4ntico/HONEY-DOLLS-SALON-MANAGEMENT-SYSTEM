// src/pages/StaffPOS.jsx
import React, { useEffect, useState, useRef } from "react";
import { Bell, Search, Plus, Minus, Trash2, Printer } from "lucide-react";
import axios from "axios";

const API_BASE = import.meta.env.VITE_API_BASE || "http://localhost:3000/api";

export default function StaffPOS() {
  // Data
  const [products, setProducts] = useState([]);
  const [services, setServices] = useState([]);

  // POS state
  const [cart, setCart] = useState([]);
  const [amountPaid, setAmountPaid] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("Cash");
  const [searchTerm, setSearchTerm] = useState("");
  const [referenceCode, setReferenceCode] = useState(() =>
    String(Date.now())
  );
  const [createdOrderId, setCreatedOrderId] = useState(null);

  const receiptRef = useRef();

  // ---------- Helper: safe response parsing ----------
  function parseArrayResponse(res) {
    // Accepts: { products: [...] } or [...] or { data: [...] } or other shapes
    if (!res) return [];
    const data = res.data ?? res;
    // if data is array, return it
    if (Array.isArray(data)) return data;
    // if data has common wrapper
    if (Array.isArray(data.products)) return data.products;
    if (Array.isArray(data.services)) return data.services;
    if (Array.isArray(data.items)) return data.items;
    // fallback: try to coerce object's values to array if it looks like keyed list
    return [];
  }

  // ---------- Normalize image path ----------
  function normalizeImage(path) {
    if (!path) return null;
    // If already absolute or root path, return as-is (root path should be served by backend)
    if (path.startsWith("http") || path.startsWith("/")) return path;
    // otherwise assume backend returns relative path -> prefix with API_BASE origin (without /api)
    // If API_BASE is like http://localhost:3000/api, strip trailing /api for static files
    try {
      const url = new URL(API_BASE);
      // remove /api or trailing segment if present
      const origin = `${url.protocol}//${url.host}`;
      return `${origin}/${path.replace(/^\\//, "")}`;
    } catch {
      // fallback: prefix API_BASE directly
      return `${API_BASE.replace(/\\/$/, "")}/${path.replace(/^\\//, "")}`;
    }
  }

  // ---------- Fetch products & services ----------
  useEffect(() => {
    let mounted = true;
    const fetchAll = async () => {
      try {
        const [prodRes, servRes] = await Promise.all([
          axios.get(`${API_BASE}/products`),
          axios.get(`${API_BASE}/services`),
        ]);

        if (!mounted) return;

        const prodArr = parseArrayResponse(prodRes);
        const servArr = parseArrayResponse(servRes);

        setProducts(Array.isArray(prodArr) ? prodArr : []);
        setServices(Array.isArray(servArr) ? servArr : []);
      } catch (err) {
        console.error("Failed to load products/services", err);
        // keep empty arrays on error
        setProducts([]);
        setServices([]);
      }
    };

    fetchAll();
    return () => {
      mounted = false;
    };
  }, []);

  // ---------- Cart helpers ----------
  const addToCart = (item, type) => {
    // item may be product (productid, prodname, price, prodimage) or service (serviceid, servicename, amount)
    const id = item.productid ?? item.serviceid ?? item.id;
    const name = item.prodname ?? item.servicename ?? item.name ?? "Item";
    const unit_price = Number(item.price ?? item.amount ?? item.unit_price ?? 0);
    const image = normalizeImage(item.prodimage ?? item.image ?? null);

    setCart((prev) => {
      const existing = prev.find((c) => c.id === id && c.type === type);
      if (existing) {
        return prev.map((c) =>
          c.id === id && c.type === type ? { ...c, quantity: c.quantity + 1 } : c
        );
      }
      return [
        ...prev,
        { id, name, unit_price, type, quantity: 1, image },
      ];
    });
  };

  const updateQty = (id, delta) => {
    setCart((prev) =>
      prev
        .map((c) => {
          if (c.id === id) {
            const qty = c.quantity + delta;
            return qty > 0 ? { ...c, quantity: qty } : null;
          }
          return c;
        })
        .filter(Boolean)
    );
  };

  const removeFromCart = (id) => {
    setCart((prev) => prev.filter((c) => c.id !== id));
  };

  const clearCart = () => {
    setCart([]);
    setAmountPaid("");
    setCreatedOrderId(null);
    setReferenceCode(String(Date.now()));
  };

  // ---------- Totals ----------
  const subtotal = cart.reduce((s, it) => s + it.unit_price * it.quantity, 0);
  const VAT_RATE = 0.12;
  const vat = subtotal * VAT_RATE;
  const total = subtotal + vat;
  const change = amountPaid ? Math.max(Number(amountPaid) - total, 0) : 0;

  // ---------- Payment flow ----------
  const handleConfirmPay = async () => {
    if (cart.length === 0) return alert("Cart is empty.");
    if (!amountPaid || Number(amountPaid) < total) {
      return alert("Amount paid is not enough.");
    }

    try {
      const token = localStorage.getItem("token"); // optional
      const orderPayload = {
        items: cart.map((c) => ({
          productid: c.type === "product" ? c.id : null,
          serviceid: c.type === "service" ? c.id : null,
          quantity: c.quantity,
          unit_price: c.unit_price,
        })),
      };

      // Create order
      const orderRes = await axios.post(`${API_BASE}/orders`, orderPayload, {
        headers: token ? { Authorization: `Bearer ${token}` } : {},
      });

      const orderid = orderRes?.data?.orderid ?? orderRes?.data?.id ?? null;
      setCreatedOrderId(orderid);

      // Create payment record
      const paymentPayload = {
        orderid,
        reference_code: referenceCode,
        partialamountpaid: total,
        method: paymentMethod,
      };

      await axios.post(`${API_BASE}/customerpayment`, paymentPayload, {
        headers: token ? { Authorization: `Bearer ${token}` } : {},
      });

      // Do NOT clear cart — keep receipt available for print
      alert(`Payment successful. Order ID: ${orderid}`);
      // Prepare for next order: generate new ref code but keep cart until user clears if needed
      setReferenceCode(String(Date.now()));
      setAmountPaid("");
    } catch (err) {
      console.error("Payment error", err);
      alert("Payment failed: " + (err.response?.data?.message || err.message));
    }
  };

  // ---------- Print receipt (text-only, no images) ----------
  const handlePrintReceipt = () => {
    const printHtml = `
      <html>
      <head>
        <title>Receipt</title>
        <style>
          body { font-family: Arial, Helvetica, sans-serif; padding: 16px; color: #111 }
          .header { display:flex; align-items:center; gap:12px; }
          .logo { width:48px; height:48px; object-fit:cover; border-radius:6px }
          h1 { margin:0; font-size:18px }
          .muted { color:#555; font-size:12px }
          table { width:100%; border-collapse: collapse; margin-top:12px }
          td { padding:6px 0; }
          .right { text-align:right; }
          .total { font-weight:700; font-size:16px; margin-top:10px; }
        </style>
      </head>
      <body>
        <div class="header">
          <img src="/src/assets/honeydolls.jpg" class="logo" alt="logo" />
          <div>
            <h1>HONEY DOLLS SALON</h1>
            <div class="muted">Beauty Hub — Davao</div>
          </div>
        </div>

        <div style="margin-top:10px;">
          <div class="muted">Reference: <strong>${escapeHtml(referenceCode)}</strong></div>
          ${createdOrderId ? `<div class="muted">Order ID: <strong>${escapeHtml(createdOrderId)}</strong></div>` : ""}
        </div>

        <table>
          <tbody>
            ${cart
              .map(
                (it) =>
                  `<tr>
                    <td>${escapeHtml(it.name)} × ${it.quantity}</td>
                    <td class="right">₱${(it.unit_price * it.quantity).toFixed(2)}</td>
                  </tr>`
              )
              .join("")}
          </tbody>
        </table>

        <div class="total">
          <div style="display:flex; justify-content:space-between"><span>Subtotal</span><span>₱${subtotal.toFixed(2)}</span></div>
          <div style="display:flex; justify-content:space-between"><span>VAT (12%)</span><span>₱${vat.toFixed(2)}</span></div>
          <div style="display:flex; justify-content:space-between; margin-top:6px;"><strong>Total</strong><strong>₱${total.toFixed(2)}</strong></div>
          ${amountPaid ? `<div style="display:flex; justify-content:space-between; margin-top:6px;"><span>Paid</span><span>₱${Number(amountPaid).toFixed(2)}</span></div>` : ""}
          ${amountPaid ? `<div style="display:flex; justify-content:space-between; margin-top:6px; color:green;"><span>Change</span><span>₱${change.toFixed(2)}</span></div>` : ""}
        </div>

        <div style="margin-top:14px; font-size:12px; color:#666">Thank you for choosing Honey Dolls Salon.</div>
      </body>
      </html>
    `;

    const w = window.open("", "_blank", "width=420,height=700");
    if (!w) {
      return alert("Popup blocked. Allow popups to print receipt.");
    }
    w.document.write(printHtml);
    w.document.close();
    w.focus();
    setTimeout(() => w.print(), 300);
  };

  function escapeHtml(text) {
    if (text === null || text === undefined) return "";
    return String(text)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");
  }

  // ---------- Render UI ----------
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
              <h1 className="text-xl font-bold text-orange-900">Honey Dolls & Brilliant</h1>
              <p className="text-sm text-orange-800 font-medium">Beauty Hub — Davao</p>
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
          {/* LEFT: Selection grid (images here) */}
          <div className="overflow-y-auto pr-2">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-lg font-bold text-gray-900">Honey Dolls • Staff POS</h2>
                <p className="text-sm text-gray-600">Services & Products</p>
              </div>

              <div className="relative">
                <Search className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                <input
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Search services or products..."
                  className="pl-10 pr-4 py-3 w-64 border border-gray-300 rounded-xl focus:outline-none focus:border-orange-400 text-sm"
                />
              </div>
            </div>

            {/* grid: show services first then products (2-column) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[...services, ...products]
                .filter((item) => {
                  const name = item.servicename ?? item.prodname ?? item.name ?? "";
                  return name.toLowerCase().includes(searchTerm.toLowerCase());
                })
                .map((item) => {
                  const isService = !!item.serviceid;
                  const type = isService ? "service" : "product";
                  const id = item.serviceid ?? item.productid ?? item.id;
                  const name = item.servicename ?? item.prodname ?? item.name;
                  const price = Number(item.amount ?? item.price ?? 0);
                  const image = normalizeImage(item.prodimage ?? item.image ?? null);

                  const added = cart.reduce((acc, c) => (c.id === id ? c.quantity : acc), 0);

                  return (
                    <div
                      key={`${type}-${id}`}
                      className="bg-gray-50 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition cursor-pointer"
                    >
                      {image ? (
                        <img src={image} alt={name} className="w-full h-28 object-cover rounded-t-2xl" />
                      ) : (
                        <div className="bg-gray-200 w-full h-28 rounded-t-2xl flex items-center justify-center text-gray-400">
                          No Image
                        </div>
                      )}

                      <div className="p-3">
                        <h3 className="font-medium text-gray-900">{name}</h3>
                        <p className="text-sm text-gray-600">₱{price.toFixed(2)} • {isService ? item.servicetype ?? "Service" : item.prodcat ?? "Product"}</p>

                        <button
                          onClick={() => addToCart(item, type)}
                          className="mt-2 w-full bg-yellow-400 text-gray-900 font-medium py-2 rounded-full hover:bg-yellow-500 transition text-sm"
                        >
                          Add
                        </button>

                        {added > 0 && (
                          <div className="mt-1 text-sm text-gray-700">Added: {added}</div>
                        )}
                      </div>
                    </div>
                  );
                })}
            </div>
          </div>

          {/* RIGHT: Receipt (text-only) */}
          <div className="bg-gray-50 rounded-2xl p-5 flex flex-col h-full overflow-y-auto">
            {/* Receipt content (no images) */}
            <div ref={receiptRef}>
              <div className="flex items-center gap-3 mb-2">
                <img src="/src/assets/honeydolls.jpg" alt="logo" className="w-12 h-12 object-cover rounded" />
                <div>
                  <div className="font-bold">HONEY DOLLS SALON</div>
                  <div className="text-sm text-gray-600">Beauty Hub — Davao</div>
                </div>
              </div>

              <div className="text-sm mb-3">Reference: <strong>{referenceCode}</strong></div>

              <div className="border-t pt-2">
                {cart.length === 0 ? (
                  <p className="text-center text-gray-500 py-6">Cart is empty</p>
                ) : (
                  cart.map((item) => (
                    <div key={item.id} className="flex justify-between text-sm py-1">
                      <div>{item.name} × {item.quantity}</div>
                      <div>₱{(item.unit_price * item.quantity).toFixed(2)}</div>
                    </div>
                  ))
                )}
              </div>

              <div className="border-t pt-3 mt-3 text-sm">
                <div className="flex justify-between"><span>Subtotal</span><span>₱{subtotal.toFixed(2)}</span></div>
                <div className="flex justify-between"><span>VAT (12%)</span><span>₱{vat.toFixed(2)}</span></div>
                <div className="flex justify-between font-bold text-lg mt-2"><span>Total</span><span>₱{total.toFixed(2)}</span></div>

                {amountPaid && (
                  <div className="flex justify-between font-semibold mt-2 text-green-700"><span>Change</span><span>₱{change.toFixed(2)}</span></div>
                )}
              </div>
            </div>

            {/* Controls are outside the printable receipt area */}
            <div className="mt-4 space-y-3">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Amount Paid</label>
                <input
                  type="number"
                  value={amountPaid}
                  onChange={(e) => setAmountPaid(e.target.value)}
                  placeholder="0.00"
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:border-orange-400 text-sm"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Payment Method</label>
                <div className="grid grid-cols-2 gap-2">
                  {["Cash", "GCash"].map((m) => (
                    <button
                      key={m}
                      onClick={() => setPaymentMethod(m)}
                      className={`py-2 rounded-xl border text-sm font-medium ${paymentMethod === m ? "bg-orange-500 text-white border-orange-500" : "bg-white text-gray-700 border-gray-300 hover:bg-gray-50"}`}
                    >
                      {m}
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex gap-2">
                <button
                  onClick={handleConfirmPay}
                  disabled={cart.length === 0}
                  className="flex-1 w-full bg-gradient-to-r from-[#ffd36e] to-[#f59e9e] text-white font-bold py-3 rounded-full shadow hover:shadow-md transition disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Confirm & Pay
                </button>

                <button
                  onClick={handlePrintReceipt}
                  disabled={cart.length === 0}
                  className="w-14 h-12 flex items-center justify-center border rounded-full bg-white"
                  title="Print receipt"
                >
                  <Printer className="w-5 h-5 text-gray-600" />
                </button>
              </div>

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
