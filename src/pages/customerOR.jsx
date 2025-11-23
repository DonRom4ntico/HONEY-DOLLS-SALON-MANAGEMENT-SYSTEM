// src/pages/CustomerOR.jsx
import { Bell, Printer } from 'lucide-react';

export default function CustomerOR() {
  const receipt = {
    customerName: 'Jessa Mae',
    staffName: 'Anna (Cashier)',
    dateIssued: 'Oct 27, 2025',
    orderId: 'HD-20251027-0023',
    items: [
      { name: 'Haircut & Styling', qty: 1, unitPrice: 500, amount: 500 },
      { name: 'Hair Spa', qty: 1, unitPrice: 400, amount: 400 },
      { name: 'Shampoo', qty: 1, unitPrice: 150, amount: 150 },
    ],
    subtotal: 1050,
    vat: 126,
    total: 1176,
    cash: 1200,
    change: 24,
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-50 to-pink-50 flex flex-col">

      {/* ====================== HEADER ====================== */}
      <header className="bg-gradient-to-r from-[#ffd36e] to-[#f59e9e] shadow-sm">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img
              src="/logo.png"
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

      {/* ====================== MAIN ====================== */}
      <main className="flex-1 px-6 py-8 max-w-7xl mx-auto w-full flex items-center justify-center">
        <div className="bg-white rounded-2xl shadow-lg p-8 w-full max-w-3xl">

          {/* Receipt Content */}
          <div className="space-y-6">

            {/* Header */}
            <div className="flex flex-col sm:flex-row justify-between items-start gap-4">
              <div>
                <h2 className="text-xl font-bold text-gray-900">Honey Dolls — Customer Receipt</h2>
                <p className="text-sm text-gray-600 mt-1">
                  Customer Name: <span className="font-medium">{receipt.customerName}</span>
                </p>
                <p className="text-sm text-gray-600">
                  Staff: <span className="font-medium">{receipt.staffName}</span>
                </p>
              </div>
              <div className="text-left sm:text-right w-full sm:w-auto">
                <p className="text-sm text-gray-600">Date Issued: {receipt.dateIssued}</p>
                <p className="text-sm font-medium text-gray-900">Order #: {receipt.orderId}</p>
              </div>
            </div>

            {/* Table */}
            <div className="border-t border-dashed border-gray-300 pt-4">
              <div className="hidden sm:grid grid-cols-4 text-sm font-medium text-gray-700 pb-2">
                <div>Item</div>
                <div className="text-center">Qty</div>
                <div className="text-center">Unit Price</div>
                <div className="text-right">Amount</div>
              </div>

              {receipt.items.map((item, idx) => (
                <div key={idx} className="py-3 border-b border-dashed border-gray-200">
                  {/* Mobile Layout */}
                  <div className="sm:hidden space-y-1">
                    <div className="font-medium text-gray-900">{item.name}</div>
                    <div className="text-xs text-gray-600 grid grid-cols-3">
                      <span>Qty: {item.qty}</span>
                      <span className="text-center">₱{item.unitPrice}</span>
                      <span className="text-right font-medium">₱{item.amount}</span>
                    </div>
                  </div>

                  {/* Desktop Grid */}
                  <div className="hidden sm:grid grid-cols-4 text-sm">
                    <div className="font-medium">{item.name}</div>
                    <div className="text-center">{item.qty}</div>
                    <div className="text-center">₱{item.unitPrice}</div>
                    <div className="text-right font-medium">₱{item.amount}</div>
                  </div>
                </div>
              ))}
            </div>

            {/* Totals */}
            <div className="border-t border-dashed border-gray-300 pt-4 space-y-2 text-sm">
              <div className="flex justify-between">
                <span>Subtotal:</span>
                <span className="font-medium">₱{receipt.subtotal}</span>
              </div>
              <div className="flex justify-between">
                <span>VAT (12%):</span>
                <span className="font-medium">₱{receipt.vat}</span>
              </div>
              <div className="flex justify-between text-base font-bold text-gray-900">
                <span>Total:</span>
                <span>₱{receipt.total}</span>
              </div>
              <div className="flex justify-between">
                <span>Cash:</span>
                <span className="font-medium">₱{receipt.cash}</span>
              </div>
              <div className="flex justify-between">
                <span>Change:</span>
                <span className="font-medium text-green-600">₱{receipt.change}</span>
              </div>
            </div>

            {/* Footer */}
            <div className="border-t border-dashed border-gray-300 pt-4 text-center">
              <p className="font-bold text-gray-900">Thank you for choosing Honey Dolls</p>
              <p className="text-xs text-gray-600">Open daily • Davao Branch</p>
            </div>
          </div>

          {/* FIXED BUTTONS — Now Perfect on Mobile & Desktop */}
          <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 gap-4">
            <button className="w-full px-6 py-4 bg-gradient-to-r from-[#ffd36e] to-[#f59e9e] text-white font-bold rounded-full shadow-lg hover:shadow-xl transition flex items-center justify-center gap-3 text-base">
              <Printer className="w-5 h-5" />
              Print Receipt
            </button>
            <button className="w-full px-6 py-4 border-2 border-gray-300 text-gray-700 rounded-full hover:bg-gray-50 transition font-medium text-base">
              Back to POS
            </button>
          </div>
        </div>
      </main>

      {/* ====================== FOOTER ====================== */}
      <footer className="bg-white/80 py-3 border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-6">
          <p className="text-xs text-gray-600 text-center">
            Honey Dolls • Brilliant Beauty Hub — Davao | Open Daily 9:00AM–9:00PM
          </p>
        </div>
      </footer>
    </div>
  );
}