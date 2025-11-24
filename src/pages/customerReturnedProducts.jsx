// src/pages/customerReturnedProducts.jsx
import { Upload, X } from 'lucide-react';
import { useState } from 'react';
import AdminLayout from '../layout/adminLayout';

export default function CustomerReturnedProducts() {
  const [images, setImages] = useState([]);

  const generateReturnId = () => {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const day = String(now.getDate()).padStart(2, '0');
    const random = String(Math.floor(Math.random() * 1000)).padStart(3, '0');
    return `RET-${year}${month}${day}-${random}`;
  };

  const returnId = generateReturnId();

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    const newImages = files.map(file => ({
      file,
      preview: URL.createObjectURL(file),
      name: file.name,
    }));
    setImages(prev => [...prev, ...newImages]);
  };

  const removeImage = (index) => {
    setImages(prev => prev.filter((_, i) => i !== index));
  };

  return (
    <AdminLayout title="Customer Return Form">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white/90 backdrop-blur rounded-2xl shadow-lg p-8 border border-gray-100">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            Honey Dolls • Customer Return Form
          </h1>
          <p className="text-sm text-gray-600 mb-8">
            Please complete the details below to record a returned order.
          </p>

          <form className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Customer Name
                </label>
                <input
                  type="text"
                  defaultValue="Juan Dela Cruz"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-orange-400 transition"
                  placeholder="Enter customer name"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Return ID
                </label>
                <div className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg font-medium">
                  #{returnId}{' '}
                  <span className="text-xs text-gray-500">(auto-generated)</span>
                </div>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Reason for Return
              </label>
              <textarea
                rows={4}
                placeholder="Describe reason for return..."
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-orange-400 resize-none transition"
              />
            </div>

            <div className="grid md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Product Name
                </label>
                <input
                  type="text"
                  defaultValue="Hair Serum"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-orange-400 transition"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Quantity
                </label>
                <input
                  type="text"
                  defaultValue="2"
                  readOnly
                  className="w-full px-4 py-2 bg-gray-200 text-gray-700 rounded-lg text-center"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Total Amount
                </label>
                <input
                  type="text"
                  defaultValue="₱950.00"
                  readOnly
                  className="w-full px-4 py-2 bg-gray-200 text-gray-700 rounded-lg text-center"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Evidence (Upload Image)
              </label>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-orange-400 transition">
                <input
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                  id="file-upload"
                />
                <label
                  htmlFor="file-upload"
                  className="cursor-pointer flex flex-col items-center gap-3"
                >
                  <Upload className="w-10 h-10 text-gray-400" />
                  <div>
                    <span className="text-sm text-gray-600 font-medium">
                      Click to upload or drag and drop
                    </span>
                    <p className="text-xs text-gray-500 mt-1">PNG, JPG up to 10MB</p>
                  </div>
                </label>
              </div>

              {images.length > 0 && (
                <div className="mt-6 grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-4">
                  {images.map((img, idx) => (
                    <div key={idx} className="relative group">
                      <img
                        src={img.preview}
                        alt={`Upload ${idx + 1}`}
                        className="w-full h-24 object-cover rounded-lg border shadow-sm"
                      />
                      <button
                        type="button"
                        onClick={() => removeImage(idx)}
                        className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1.5 opacity-0 group-hover:opacity-100 transition"
                      >
                        <X className="w-4 h-4" />
                      </button>
                      <p className="text-xs text-gray-600 mt-1 truncate text-center">
                        {img.name}
                      </p>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="flex justify-end gap-4 pt-8 border-t border-gray-200">
              <button
                type="button"
                className="px-8 py-3 border border-gray-300 text-gray-700 rounded-full hover:bg-gray-50 transition font-medium"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-8 py-3 bg-gradient-to-r from-[#ffd36e] to-[#f59e9e] text-white font-bold rounded-full shadow hover:shadow-lg transition"
              >
                Submit Return Request
              </button>
            </div>
          </form>
        </div>
      </div>
    </AdminLayout>
  );
}