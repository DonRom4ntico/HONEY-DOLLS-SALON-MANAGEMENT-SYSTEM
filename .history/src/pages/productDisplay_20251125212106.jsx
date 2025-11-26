import { Search, ChevronDown, Plus, X, Upload } from "lucide-react";
import AdminLayout from "../layout/adminLayout";
import { useState, useEffect } from "react";
import axios from "axios";

const API_BASE = import.meta.env.VITE_API_BASE;

export default function ProductDisplay() {
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOrder, setSortOrder] = useState("created-desc");
  const [currentPage, setCurrentPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const itemsPerPage = 6;

  const categories = [
    "Hair Care",
    "Skincare",
    "Body Care",
    "Nail Care",
    "Makeup",
    "Fragrance",
  ];

  const [newProduct, setNewProduct] = useState({
    name: "",
    category: "",
    unitCost: "",
    image: null,
  });

  const [products, setProducts] = useState([]);

  // Fetch products from backend
  const fetchProducts = async () => {
    try {
      const res = await axios.get(`${API_BASE}/products`);
      // Map products to match frontend display
      const formatted = res.data.products.map((p) => ({
        id: p.productid, // original DB id
        name: p.prodname,
        unitCost: parseFloat(p.price),
        category: p.prodcat,
        image: p.prodimage ? `${API_BASE}/uploads/${p.prodimage}` : null,
        createdAt: new Date(p.created_at).toLocaleDateString("en-US", {
          month: "short",
          day: "numeric",
          year: "numeric",
        }),
        updatedAt: new Date(p.updated_at).toLocaleDateString("en-US", {
          month: "short",
          day: "numeric",
          year: "numeric",
        }),
      }));
      setProducts(formatted);
    } catch (err) {
      console.error("Failed to fetch products:", err);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // Filter & Sort
  let filtered = products.filter(
    (item) =>
      item.id.toString().toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  filtered.sort((a, b) => {
    if (sortOrder === "created-desc")
      return new Date(b.createdAt) - new Date(a.createdAt);
    if (sortOrder === "created-asc")
      return new Date(a.createdAt) - new Date(b.createdAt);
    if (sortOrder === "updated-desc")
      return new Date(b.updatedAt) - new Date(a.updatedAt);
    return new Date(a.updatedAt) - new Date(b.updatedAt);
  });

  const totalPages = Math.ceil(filtered.length / itemsPerPage);
  const paginated = filtered.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // Handle Image Upload
  const handleImageUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      setNewProduct((prev) => ({ ...prev, image: reader.result }));
    };
    reader.readAsDataURL(file);
  };

  // Add Product
  const handleAddProduct = async () => {
    if (!newProduct.name || !newProduct.category || !newProduct.unitCost)
      return;

    try {
      const formData = new FormData();
      formData.append("prodname", newProduct.name);
      formData.append("prodcat", newProduct.category);
      formData.append("price", newProduct.unitCost);
      if (newProduct.image) {
        // Convert base64 to Blob
        const blob = await (await fetch(newProduct.image)).blob();
        formData.append("prodimage", blob, "product.png");
      }

      const res = await axios.post(`${API_BASE}/products`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      // Add to local state
      const p = res.data.product;
      setProducts((prev) => [
        ...prev,
        {
          id: p.productid,
          name: p.prodname,
          unitCost: parseFloat(p.price),
          category: p.prodcat,
          image: p.prodimage ? `${API_BASE}/uploads/${p.prodimage}` : null,
          createdAt: new Date(p.created_at).toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
            year: "numeric",
          }),
          updatedAt: new Date(p.updated_at).toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
            year: "numeric",
          }),
        },
      ]);

      setNewProduct({ name: "", category: "", unitCost: "", image: null });
      setIsModalOpen(false);
    } catch (err) {
      console.error("Failed to add product:", err);
    }
  };

  return (
    // ... keep all your existing JSX (design) unchanged
    // just make sure table displays Product ID as PRD-{id}:
    <AdminLayout title="Product Display">
      {/* Table Example: */}
      <table>
        <tbody>
          {paginated.map((item) => (
            <tr key={item.id}>
              <td>PRD-{item.id}</td>
              <td>{item.name}</td>
              <td>₱{item.unitCost.toFixed(2)}</td>
              <td>{item.category}</td>
              <td>{item.createdAt}</td>
              <td>{item.updatedAt}</td>
              <td>Actions...</td>
            </tr>
          ))}
        </tbody>
      </table>
    </AdminLayout>
  );
}
