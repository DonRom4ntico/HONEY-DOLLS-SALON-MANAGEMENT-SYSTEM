import React, { useState, useEffect } from "react";
import axios from "axios";
import CustomerLayout from "../layout/customerLayout";
import { Bell, X, Star, Minus, Plus, Filter } from "lucide-react";

const CustomerProd = () => {
  const [products, setProducts] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  // Fetch products from backend
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get("http://localhost:4000/api/products");
        setProducts(
          res.data.products.map((p) => ({
            id: p.productid,
            name: p.prodname,
            price: p.price,
            category: p.prodcat,
            image: `/uploads/${p.prodimage}`,
            description: p.description || "No description available.",
            rating: 4.8, // keep design consistent
            reviews: 120,
          }))
        );
      } catch (err) {
        console.error("Failed to load products", err);
      }
    };

    fetchProducts();
  }, []);

  // Filter logic
  const handleCategoryChange = (category) => {
    if (selectedCategories.includes(category)) {
      setSelectedCategories(selectedCategories.filter((c) => c !== category));
    } else {
      setSelectedCategories([...selectedCategories, category]);
    }
  };

  const filteredProducts =
    selectedCategories.length > 0
      ? products.filter((p) => selectedCategories.includes(p.category))
      : products;

  const FilterSidebar = () => (
    <aside className="w-56 bg-white rounded-xl p-6 shadow-sm h-fit">
      <h2 className="font-semibold text-lg text-gray-800 mb-4">Filters</h2>
      <hr className="border-gray-200 mb-4" />

      <label className="block text-sm font-medium mb-2">Sort By</label>
      <select className="w-full border rounded-lg p-3 mb-5 text-sm">
        <option>Relevance</option>
        <option>Price: Low to High</option>
        <option>Price: High to Low</option>
      </select>

      <label className="block text-sm font-medium mb-2">Price</label>
      <select className="w-full border rounded-lg p-3 mb-6 text-sm">
        <option>All Prices</option>
        <option>₱100 - ₱300</option>
        <option>₱301 - ₱500</option>
        <option>₱501+</option>
      </select>

      <p className="text-sm font-semibold text-gray-800 mb-3">
        Filter by Category
      </p>
      <div className="flex flex-col gap-3 mb-6">
        {["Hair Care", "Skin Care", "Body", "Nails"].map((category) => (
          <label
            key={category}
            className="flex items-center gap-3 cursor-pointer"
          >
            <input
              type="checkbox"
              checked={selectedCategories.includes(category)}
              onChange={() => handleCategoryChange(category)}
              className="w-4 h-4 accent-pink-500"
            />
            <span className="text-sm">{category}</span>
          </label>
        ))}
      </div>

      <button
        onClick={() => setSelectedCategories([])}
        className="w-full bg-[#fca9a9] hover:bg-[#fb8d8d] text-white py-3 rounded-lg font-semibold transition"
      >
        Clear Filters
      </button>
    </aside>
  );

  return (
    <CustomerLayout>
      <div className="min-h-screen bg-gradient-to-b from-orange-50 to-pink-50 pt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Mobile Filter Toggle */}
          <div className="lg:hidden flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-[#4b3b2b]">Our Products</h2>
            <button
              onClick={() => setIsFilterOpen(!isFilterOpen)}
              className="flex items-center gap-2 bg-white px-4 py-2 rounded-lg shadow-sm"
            >
              <Filter className="w-5 h-5" />
              Filters
            </button>
          </div>

          <div className="flex flex-col lg:flex-row gap-8">
            <div
              className={`${
                isFilterOpen ? "fixed inset-0 z-40 bg-black/50" : "hidden"
              } lg:block lg:static lg:z-auto`}
              onClick={() => setIsFilterOpen(false)}
            >
              <div
                className={`${
                  isFilterOpen
                    ? "fixed left-0 top-0 h-full w-80 bg-white shadow-2xl p-6 overflow-y-auto"
                    : ""
                } lg:w-64 lg:block`}
                onClick={(e) => e.stopPropagation()}
              >
                {isFilterOpen && (
                  <div className="flex justify-between items-center mb-6 lg:hidden">
                    <h3 className="text-lg font-bold">Filters</h3>
                    <button onClick={() => setIsFilterOpen(false)}>
                      <X className="w-6 h-6" />
                    </button>
                  </div>
                )}
                <FilterSidebar />
              </div>
            </div>

            {/* Product Grid */}
            <main className="flex-1">
              <h2 className="text-2xl font-bold text-[#4b3b2b] mb-6 hidden lg:block">
                Our Products
              </h2>

              <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
                {filteredProducts.map((product) => (
                  <div
                    key={product.id}
                    className="bg-white rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 p-4 text-center group cursor-pointer"
                  >
                    <div className="mb-4 overflow-hidden rounded-lg">
                      <img
                        src={product.prodimage}
                        alt={product.prodname}
                        className="w-full h-40 sm:h-48 object-contain mx-auto transition-transform group-hover:scale-105"
                      />
                    </div>

                    <h3 className="font-semibold text-gray-800 text-sm sm:text-base line-clamp-2">
                      {product.prodname}
                    </h3>

                    <p className="text-[#f97316] font-bold text-lg mt-2">
                      ₱{product.price}
                    </p>

                    <div className="flex items-center justify-center gap-1 mt-2">
                      <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      <span className="text-xs text-gray-600">
                        {product.rating} ({product.reviews})
                      </span>
                    </div>

                    {/* ADDED VIEW BUTTON */}
                    <button
                      onClick={() => {
                        setSelectedProduct(product);
                        setQuantity(1);
                      }}
                      className="mt-4 w-full bg-[#fca9a9] hover:bg-[#fb8d8d] text-white text-sm py-2 rounded-lg font-medium transition"
                    >
                      View Product
                    </button>
                  </div>
                ))}
              </div>
            </main>
          </div>
        </div>

        {/* MODAL */}
        {selectedProduct && (
          <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-3xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
              <div className="relative">
                <button
                  onClick={() => setSelectedProduct(null)}
                  className="absolute top-4 right-4 z-10 w-10 h-10 bg-pink-100 hover:bg-pink-200 rounded-full flex items-center justify-center transition"
                >
                  <X className="w-6 h-6 text-pink-600" />
                </button>

                <div className="grid grid-cols-1 md:grid-cols-2">
                  <div className="bg-gradient-to-br from-pink-50 to-orange-50 p-8 md:p-12 flex items-center justify-center">
                    <img
                      src={selectedProduct.image}
                      alt={selectedProduct.name}
                      className="max-w-full max-h-80 object-contain rounded-2xl"
                    />
                  </div>

                  <div className="p-6 md:p-10">
                    <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
                      {selectedProduct.prodname}
                    </h2>

                    <p className="text-gray-600 mt-1 text-sm md:text-base">
                      Category: {selectedProduct.prodcat}
                    </p>

                    <p className="text-3xl md:text-4xl font-bold text-orange-600 mt-6">
                      ₱{selectedProduct.price}.00
                    </p>

                    <h3 className="font-bold text-gray-800 mt-8 mb-3 text-lg">
                      Description
                    </h3>
                    <p className="text-gray-600 bg-pink-50 rounded-2xl p-5 leading-relaxed text-sm md:text-base">
                      {selectedProduct.description}
                    </p>

                    <div className="flex items-center gap-6 mt-10">
                      <span className="font-medium text-gray-700">
                        Quantity
                      </span>
                      <div className="flex items-center border-2 border-gray-300 rounded-xl">
                        <button
                          onClick={() => setQuantity(Math.max(1, quantity - 1))}
                          className="p-3 hover:bg-gray-100 rounded-l-xl transition"
                        >
                          <Minus className="w-5 h-5" />
                        </button>
                        <span className="w-16 text-center font-bold text-lg">
                          {quantity}
                        </span>
                        <button
                          onClick={() => setQuantity(quantity + 1)}
                          className="p-3 hover:bg-gray-100 rounded-r-xl transition"
                        >
                          <Plus className="w-5 h-5" />
                        </button>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-10">
                      <button className="py-4 bg-gradient-to-r from-[#FFD36E] to-[#F59E9E] text-white font-bold rounded-2xl shadow-lg hover:shadow-xl transition text-lg">
                        Add to Cart
                      </button>
                      <button className="py-4 bg-white border-2 border-gray-300 text-gray-800 font-bold rounded-2xl hover:bg-gray-50 transition text-lg">
                        Buy Now
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </CustomerLayout>
  );
};

export default CustomerProd;
