// src/pages/productDisplay.jsx
import { useState, useEffect } from "react";
import axios from "axios";

const API_BASE = import.meta.env.VITE_API_BASE;
// MUST be:  http://localhost:4000/api/products

export default function ProductDisplay() {
  const [products, setProducts] = useState([]);
  const [showModal, setShowModal] = useState(false);

  const [prodname, setProdname] = useState("");
  const [prodcat, setProdcat] = useState("");
  const [price, setPrice] = useState("");
  const [prodimage, setProdimage] = useState(null);

  // ---------------------------------------------------------
  // FETCH PRODUCTS
  // ---------------------------------------------------------
  const fetchProducts = async () => {
    try {
      const res = await axios.get(`${API_BASE}/all`);
      setProducts(res.data.products || []);
    } catch (error) {
      console.error("Failed to fetch products:", error);
      alert("Failed to fetch products");
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // ---------------------------------------------------------
  // ADD PRODUCT
  // ---------------------------------------------------------
  const handleAddProduct = async (e) => {
    e.preventDefault();

    if (!prodname || !prodcat || !price) {
      alert("Please fill out all fields");
      return;
    }

    const formData = new FormData();
    formData.append("prodname", prodname);
    formData.append("prodcat", prodcat);
    formData.append("price", price);
    if (prodimage) formData.append("prodimage", prodimage);

    try {
      const res = await axios.post(`${API_BASE}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      console.log("Product Added:", res.data);
      alert("Product added successfully!");

      setShowModal(false);
      fetchProducts();
    } catch (error) {
      console.error("Failed to add product:", error);
      alert("Failed to add product");
    }
  };

  return (
    <div className="p-6">
      {/* HEADER */}
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Products</h1>
        <button
          className="bg-blue-600 text-white px-4 py-2 rounded"
          onClick={() => setShowModal(true)}
        >
          Add Product
        </button>
      </div>

      {/* PRODUCT TABLE */}
      <table className="w-full border-collapse border text-left">
        <thead>
          <tr className="bg-gray-200">
            <th className="p-2 border">Image</th>
            <th className="p-2 border">Name</th>
            <th className="p-2 border">Category</th>
            <th className="p-2 border">Price</th>
          </tr>
        </thead>
        <tbody>
          {products.length > 0 ? (
            products.map((p) => (
              <tr key={p.productid}>
                <td className="p-2 border">
                  {p.prodimage ? (
                    <img
                      src={`http://localhost:4000/uploads/${p.prodimage}`}
                      alt="product"
                      className="w-16 h-16 object-cover rounded"
                    />
                  ) : (
                    <span>No image</span>
                  )}
                </td>
                <td className="p-2 border">{p.prodname}</td>
                <td className="p-2 border">{p.prodcat}</td>
                <td className="p-2 border">₱{p.price}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td className="p-4 border text-center" colSpan="4">
                No products found
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {/* -----------------------------------------------------
          MODAL
      ----------------------------------------------------- */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center">
          <div className="bg-white p-6 rounded shadow-md w-96">
            <h2 className="text-xl font-bold mb-4">Add Product</h2>

            <form onSubmit={handleAddProduct}>
              <label className="block mb-2">Product Name</label>
              <input
                className="w-full border p-2 mb-3"
                type="text"
                value={prodname}
                onChange={(e) => setProdname(e.target.value)}
                required
              />

              <label className="block mb-2">Category</label>
              <input
                className="w-full border p-2 mb-3"
                type="text"
                value={prodcat}
                onChange={(e) => setProdcat(e.target.value)}
                required
              />

              <label className="block mb-2">Price</label>
              <input
                className="w-full border p-2 mb-3"
                type="number"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                required
              />

              <label className="block mb-2">Product Image</label>
              <input
                className="w-full border p-2 mb-4"
                type="file"
                accept="image/*"
                onChange={(e) => setProdimage(e.target.files[0])}
              />

              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  className="px-4 py-2 bg-gray-400 text-white rounded"
                  onClick={() => setShowModal(false)}
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="px-4 py-2 bg-green-600 text-white rounded"
                >
                  Add
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
