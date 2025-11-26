import React, { useState, useEffect } from "react";
import axios from "axios";

const API_BASE = import.meta.env.VITE_API_BASE;

export default function StaffPOS() {
  const [products, setProducts] = useState([]);
  const [services, setServices] = useState([]);
  const [cart, setCart] = useState([]);
  const [referenceCode, setReferenceCode] = useState(null);
  const [createdOrder, setCreatedOrder] = useState(null);

  // Fetch Products + Services
  useEffect(() => {
    const fetchData = async () => {
      try {
        const prodRes = await axios.get(`${API_BASE}/products`);
        const servRes = await axios.get(`${API_BASE}/services`);
        setProducts(prodRes.data);
        setServices(servRes.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchData();
  }, []);

  // Add to cart
  const addToCart = (item, type) => {
    const existing = cart.find((x) => x.id === item.id && x.type === type);

    if (existing) {
      setCart(
        cart.map((x) =>
          x.id === item.id && x.type === type ? { ...x, qty: x.qty + 1 } : x
        )
      );
    } else {
      setCart([...cart, { ...item, qty: 1, type }]);
    }
  };

  const updateQty = (id, type, amount) => {
    setCart((prev) =>
      prev
        .map((item) =>
          item.id === id && item.type === type
            ? { ...item, qty: Math.max(1, item.qty + amount) }
            : item
        )
        .filter((i) => i.qty > 0)
    );
  };

  const removeItem = (id, type) => {
    setCart(cart.filter((item) => !(item.id === id && item.type === type)));
  };

  const computeSubtotal = (item) => item.price * item.qty;

  const computeTotal = () =>
    cart.reduce((sum, item) => sum + computeSubtotal(item), 0);

  // VAT 12%
  const VAT = (computeTotal() * 0.12).toFixed(2);
  const totalWithVAT = (computeTotal() + parseFloat(VAT)).toFixed(2);

  // Create Order + Payment
  const handlePayment = async () => {
    try {
      // Generate reference code
      const ref = Date.now();
      setReferenceCode(ref);

      // 1. Create order
      const orderRes = await axios.post(`${API_BASE}/orders`, {
        items: cart.map((c) => ({
          id: c.id,
          qty: c.qty,
          type: c.type,
          price: c.price,
        })),
      });

      const orderId = orderRes.data.orderid;
      setCreatedOrder(orderId);

      // 2. Save payment
      await axios.post(`${API_BASE}/customerpayment`, {
        orderid: orderId,
        reference_code: ref,
        partialamountpaid: totalWithVAT,
        method: "CASH",
      });

      alert("Payment successful! Receipt ready to print.");
    } catch (err) {
      console.error(err);
      alert("Payment failed.");
    }
  };

  const printReceipt = () => {
    const printWindow = window.open("", "", "width=600,height=800");
    printWindow.document.write(`
      <html>
      <head>
        <title>Receipt</title>
        <style>
          body { font-family: Arial; padding: 20px; }
          h2 { margin-bottom: 5px; }
          table { width: 100%; border-collapse: collapse; margin-top: 10px; }
          td, th { border-bottom: 1px solid #ccc; padding: 8px; text-align: left; }
        </style>
      </head>
      <body>
        <h2>💗 HONEY DOLLS SALON</h2>
        <p><strong>Reference Code:</strong> ${referenceCode}</p>
        <p><strong>Order ID:</strong> ${createdOrder}</p>

        <table>
          <tr><th>Item</th><th>Qty</th><th>Subtotal</th></tr>
          ${cart
            .map(
              (item) => `
              <tr>
                <td>${item.name}</td>
                <td>${item.qty}</td>
                <td>${computeSubtotal(item).toFixed(2)}</td>
              </tr>`
            )
            .join("")}
        </table>

        <h3>VAT (12%): ₱${VAT}</h3>
        <h2>Total: ₱${totalWithVAT}</h2>
        <p>Thank you for your purchase!</p>
      </body>
      </html>
    `);
    printWindow.document.close();
    printWindow.print();
  };

  return (
    <div className="flex h-screen p-4 gap-4">
      {/* LEFT SIDEBAR FILTER (static placeholder) */}
      <div className="w-1/5 bg-gray-100 p-4 rounded-xl overflow-y-auto">
        <h2 className="font-bold mb-2">Filters</h2>
        <p>All Products & Services</p>
      </div>

      {/* PRODUCT & SERVICES DISPLAY – SCROLLABLE */}
      <div className="w-2/5 overflow-y-auto grid grid-cols-2 gap-4 p-2">
        {[
          ...products.map((p) => ({ ...p, type: "product" })),
          ...services.map((s) => ({ ...s, type: "service" })),
        ].map((item) => (
          <div
            key={`${item.id}-${item.type}`}
            className="bg-white shadow p-3 rounded-lg cursor-pointer border hover:scale-105 transition"
            onClick={() =>
              addToCart(
                {
                  id: item.productid || item.serviceid,
                  name: item.prodname || item.servicename,
                  price: parseFloat(item.price || item.amount),
                },
                item.type
              )
            }
          >
            {item.prodimage && (
              <img
                src={item.prodimage}
                alt={item.prodname}
                className="w-full h-28 object-cover rounded"
              />
            )}
            <h3 className="font-bold mt-2">
              {item.prodname || item.servicename}
            </h3>
            <p>₱{(item.price || item.amount).toFixed(2)}</p>
          </div>
        ))}
      </div>

      {/* CART / RECEIPT PREVIEW */}
      <div className="w-2/5 bg-white p-4 rounded-xl shadow overflow-y-auto">
        <h2 className="font-bold text-xl mb-3">Receipt Preview</h2>

        {cart.map((item) => (
          <div
            key={`${item.id}-${item.type}`}
            className="flex justify-between mb-2 border-b pb-2"
          >
            <div>
              <p className="font-semibold">{item.name}</p>
              <p>
                ₱{item.price} x {item.qty}
              </p>
            </div>
            <div>
              <button
                className="px-2"
                onClick={() => updateQty(item.id, item.type, -1)}
              >
                -
              </button>
              <button
                className="px-2"
                onClick={() => updateQty(item.id, item.type, 1)}
              >
                +
              </button>
              <button
                className="text-red-500 ml-2"
                onClick={() => removeItem(item.id, item.type)}
              >
                x
              </button>
            </div>
          </div>
        ))}

        <hr className="my-3" />
        <p>VAT (12%): ₱{VAT}</p>
        <h2 className="font-bold text-lg">Total: ₱{totalWithVAT}</h2>

        <button
          className="bg-green-600 text-white p-2 w-full rounded mt-4"
          onClick={handlePayment}
        >
          Confirm Payment
        </button>
        <button
          className="bg-blue-600 text-white p-2 w-full rounded mt-2"
          onClick={printReceipt}
        >
          Print Receipt
        </button>
        <button
          className="bg-gray-500 text-white p-2 w-full rounded mt-2"
          onClick={() => setCart([])}
        >
          Clear Cart
        </button>
      </div>
    </div>
  );
}
