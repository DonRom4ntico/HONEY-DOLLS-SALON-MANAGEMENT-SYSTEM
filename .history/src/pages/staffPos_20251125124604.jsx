import React, { useState, useEffect } from "react";
import axios from "axios";

const API = import.meta.env.VITE_API_BASE; // http://localhost:3000/api

export default function StaffPOS() {
  const [products, setProducts] = useState([]);
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);

  const [cart, setCart] = useState([]);

  // Fetch Products + Services
  useEffect(() => {
    const loadData = async () => {
      try {
        const prod = await axios.get(`${API}/products`);
        const serv = await axios.get(`${API}/services`);

        setProducts(prod.data.products || prod.data);
        setServices(serv.data.services || serv.data);

        setLoading(false);
      } catch (err) {
        console.error("Loading error:", err);
      }
    };

    loadData();
  }, []);

  // Add to cart
  const addToCart = (item, type) => {
    const idKey = type === "product" ? "productid" : "serviceid";

    setCart((prev) => {
      const existing = prev.find(
        (c) => c.type === type && c[idKey] === item[idKey]
      );

      if (existing) {
        return prev.map((c) => (c === existing ? { ...c, qty: c.qty + 1 } : c));
      }

      return [...prev, { ...item, type, qty: 1 }];
    });
  };

  // Increase qty
  const increaseQty = (i) => {
    setCart((prev) =>
      prev.map((c, index) => (index === i ? { ...c, qty: c.qty + 1 } : c))
    );
  };

  // Decrease qty
  const decreaseQty = (i) => {
    setCart((prev) =>
      prev
        .map((c, index) => (index === i ? { ...c, qty: c.qty - 1 } : c))
        .filter((c) => c.qty > 0)
    );
  };

  // Compute totals
  const subtotal = cart.reduce((acc, item) => {
    const price = Number(item.price || item.amount || 0);
    return acc + price * item.qty;
  }, 0);

  const vat = subtotal * 0.12; // 12%
  const total = subtotal + vat;

  // Submit Order + Payment
  const handleCheckout = async () => {
    try {
      // 1. Create order
      const order = await axios.post(`${API}/orders`, {
        items: cart.map((i) => ({
          type: i.type,
          id: i.productid || i.serviceid,
          qty: i.qty,
          price: Number(i.price || i.amount),
        })),
      });

      const orderId = order.data.orderid;

      // 2. Insert payment
      await axios.post(`${API}/customerpayment`, {
        orderid: orderId,
        reference_code: Date.now(),
        partialamountpaid: total,
        method: "CASH",
      });

      alert("Payment Successful!");

      setCart([]);
    } catch (err) {
      console.error(err);
      alert("Payment failed.");
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className="w-full h-screen flex bg-gray-100 p-4 gap-4">
      {/* LEFT SIDEBAR FILTERS */}
      <div className="w-[18%] bg-white p-4 rounded shadow">
        <h2 className="font-bold mb-2">Filters</h2>
        <p className="text-sm text-gray-500">Coming soon…</p>
      </div>

      {/* PRODUCT/SERVICE DISPLAY (SCROLLABLE) */}
      <div className="w-[50%] bg-white p-4 rounded shadow overflow-y-auto">
        <h2 className="font-bold mb-3 text-lg">Products</h2>

        <div className="grid grid-cols-2 gap-3 mb-6">
          {products.map((p) => (
            <div
              key={p.productid}
              className="border rounded p-3 cursor-pointer hover:bg-gray-50"
              onClick={() => addToCart(p, "product")}
            >
              <p className="font-semibold">{p.prodname}</p>
              <p className="text-sm text-gray-600">{p.prodcat}</p>
              <p className="font-bold mt-1">₱{Number(p.price).toFixed(2)}</p>
            </div>
          ))}
        </div>

        <h2 className="font-bold mb-3 text-lg">Services</h2>

        <div className="grid grid-cols-2 gap-3">
          {services.map((s) => (
            <div
              key={s.serviceid}
              className="border rounded p-3 cursor-pointer hover:bg-gray-50"
              onClick={() => addToCart(s, "service")}
            >
              <p className="font-semibold">{s.servicename}</p>
              <p className="text-sm text-gray-500">{s.servicetype}</p>
              <p className="font-bold mt-1">₱{Number(s.amount).toFixed(2)}</p>
            </div>
          ))}
        </div>
      </div>

      {/* CART / RECEIPT */}
      <div className="w-[30%] bg-white p-4 rounded shadow flex flex-col">
        <h2 className="font-bold text-lg">Receipt</h2>

        <div className="flex-1 overflow-y-auto mt-4">
          {cart.map((item, i) => (
            <div
              key={i}
              className="flex justify-between items-center border-b py-2"
            >
              <div>
                <p className="font-semibold">
                  {item.prodname || item.servicename}
                </p>
                <p className="text-sm text-gray-500">
                  ₱{Number(item.price || item.amount).toFixed(2)}
                </p>
              </div>

              <div className="flex items-center gap-2">
                <button
                  className="px-2 bg-gray-200 rounded"
                  onClick={() => decreaseQty(i)}
                >
                  -
                </button>
                <span>{item.qty}</span>
                <button
                  className="px-2 bg-gray-200 rounded"
                  onClick={() => increaseQty(i)}
                >
                  +
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* TOTALS */}
        <div className="border-t pt-4 mt-4">
          <div className="flex justify-between">
            <span>Subtotal:</span>
            <span>₱{subtotal.toFixed(2)}</span>
          </div>

          <div className="flex justify-between mt-1">
            <span>VAT (12%):</span>
            <span>₱{vat.toFixed(2)}</span>
          </div>

          <div className="flex justify-between font-bold text-lg mt-2">
            <span>Total:</span>
            <span>₱{total.toFixed(2)}</span>
          </div>

          <button
            className="w-full bg-blue-600 text-white p-3 rounded mt-4"
            onClick={handleCheckout}
          >
            Pay Now
          </button>
        </div>
      </div>
    </div>
  );
}
