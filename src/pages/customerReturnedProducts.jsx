// src/pages/CustomerReturnForm.jsx
import { Bell, Upload, X, ChevronDown } from 'lucide-react';
import AdminLayout from '../layout/adminLayout';
import { useState } from 'react';

export default function CustomerReturnForm() {
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
      <div className="bg-white rounded-2xl shadow-lg p-8 max-w-4xl mx-auto">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Honey Dolls • Customer Return Form</h1>
        <p className="text-sm text-gray-600 mb-8">Please complete the details below to record a returned order.</p>

        <form className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Customer Name</label>
              <input
                type="text"
                defaultValue="Juan Dela Cruz"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-orange-400"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Return ID</label>
              <div className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg font-medium">
                #{returnId} <span className="text-xs text-gray-500">(auto-generated)</span>
              </div>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Reason for Return</label>
            <textarea
              rows={3}
              placeholder="Describe reason for return..."
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-orange-400 resize-none"
            />
          </div>

          <div className="grid md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Product Name</label>
              <input
                type="text"
                defaultValue="Hair Serum"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-orange-400"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Quantity</label>
              <input
                type="text"
                defaultValue="2"
                readOnly
                className="w-full px-4 py-2 bg-gray-200 text-gray-700 rounded-lg text-center"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Total Amount</label>
              <input
                type="text"
                defaultValue="₱950.00"
                readOnly
                className="w-full px-4 py-2 bg-gray-200 text-gray-700 rounded-lg text-center"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Evidence (Upload Image)</label>
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
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
                className="cursor-pointer flex flex-col items-center gap-2"
              >
                <Upload className="w-8 h-8 text-gray-400" />
                <span className="text-sm text-gray-600">Click to upload or drag and drop</span>
                <span className="text-xs text-gray-500">PNG, JPG up to 10MB</span>
              </label>
            </div>

            {images.length > 0 && (
              <div className="mt-4 grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-3">
                {images.map((img, idx) => (
                  <div key={idx} className="relative group">
                    <img
                      src={img.preview}
                      alt={`Upload ${idx + 1}`}
                      className="w-full h-20 object-cover rounded-lg border"
                    />
                    <button
                      type="button"
                      onClick={() => removeImage(idx)}
                      className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition"
                    >
                      <X className="w-3 h-3" />
                    </button>
                    <p className="text-xs text-gray-600 mt-1 truncate">{img.name}</p>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="flex justify-end gap-3 pt-6">
            <button
              type="button"
              className="px-6 py-2 border border-gray-300 text-gray-700 rounded-full hover:bg-gray-50 transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2 bg-gradient-to-r from-[#ffd36e] to-[#f59e9e] text-white font-bold rounded-full shadow hover:shadow-md transition"
            >
              Request Return
            </button>
          </div>
        </form>
      </div>
    </AdminLayout>
  );
}