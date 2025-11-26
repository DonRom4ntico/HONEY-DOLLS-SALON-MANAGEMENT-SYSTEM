// src/components/Custapp.jsx
import React, { useEffect, useState } from "react";
import { Bell } from "lucide-react";
import logo from "../../assets/logos.png";
import DatePicker from "react-datepicker";
import { Calendar } from "lucide-react";
import "react-datepicker/dist/react-datepicker.css";

const API_BASE = import.meta.env.VITE_API_BASE;

const Custapp = () => {
  const [formData, setFormData] = useState({
    date: "2025-11-18",
    time: "10:00",
    services: [],
    staff: "",
    recurrence: "None",
    smsReminder: true,
    agree: false,
    notes: "No metallic hair products",
    priority: "high",
  });

  const [services, setServices] = useState([]);
  const [staffList, setStaffList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const headers = token ? { Authorization: `Bearer ${token}` } : {};

    fetch(`${API_BASE}/services`, { headers })
      .then((r) => r.json())
      .then((data) => setServices(data.services || data))
      .catch(() => setError("Failed to load services"));

    fetch(`${API_BASE}/staff`, { headers })
      .then((r) => r.json())
      .then((data) => setStaffList(data.staff || data))
      .catch(() => setError("Failed to load staff"));
  }, []);

  const toggleService = (serviceid) => {
    const updated = formData.services.includes(serviceid)
      ? formData.services.filter((s) => s !== serviceid)
      : [...formData.services, serviceid];
    setFormData({ ...formData, services: updated });
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const formatDate = (dateObj) =>
    dateObj.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });

  const formatRecurrence = () => {
    if (formData.recurrence === "None") return "None — One-time appointment";
    if (formData.recurrence === "Weekly") return "Weekly — Every week";
    if (formData.recurrence === "Daily") return "Daily — Every day";
    if (formData.recurrence === "Monthly")
      return "Monthly — Same day each month";
    return formData.recurrence;
  };

  const handleSubmit = async () => {
    setError(null);

    if (!formData.services.length) {
      setError("Please select at least one service.");
      return;
    }
    if (!formData.staff) {
      setError("Please select a staff member.");
      return;
    }
    if (!formData.date || !formData.time) {
      setError("Please select date and time.");
      return;
    }

    // Combine preferred date and time as local date
    const [year, month, day] = formData.date.split("-").map(Number);
    const [hour, minute] = formData.time.split(":").map(Number);

    const st = new Date(year, month - 1, day, hour, minute, 0); // local starttime
    const durationHours = formData.services.length || 1;
    const et = new Date(st.getTime() + durationHours * 60 * 60 * 1000); // local endtime

    const pad = (n) => String(n).padStart(2, "0");
    const toYMDHMS = (d) =>
      `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}T${pad(
        d.getHours()
      )}:${pad(d.getMinutes())}:${pad(d.getSeconds())}`;

    const servicesPayload = formData.services.map((serviceid) => {
      const svc = services.find((s) => s.serviceid === serviceid);
      return {
        serviceid,
        quantity: 1,
        price: Number(svc?.amount ?? svc?.price ?? 0),
      };
    });

    const payload = {
      services: servicesPayload,
      starttime: toYMDHMS(st),
      endtime: toYMDHMS(et),
      staffid: Number(formData.staff),
      notes: formData.notes,
      priority: formData.priority,
      recurring: formData.recurrence !== "None",
      recurrencerule:
        formData.recurrence === "Weekly"
          ? "FREQ=WEEKLY;INTERVAL=1"
          : formData.recurrence === "Daily"
          ? "FREQ=DAILY;INTERVAL=1"
          : formData.recurrence === "Monthly"
          ? "FREQ=MONTHLY;INTERVAL=1"
          : null,
    };

    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      const headers = {
        "Content-Type": "application/json",
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      };

      const res = await fetch(`${API_BASE}/appointment`, {
        method: "POST",
        headers,
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (!res.ok) {
        const msg = data?.message || `Server returned ${res.status}`;
        setError(msg);
      } else {
        // Show success modal
        setShowSuccessModal(true);
        setFormData({ ...formData, services: [], staff: "", notes: "" });
      }
    } catch (err) {
      setError("Network error");
    } finally {
      setLoading(false);
    }
  };

  const estimatedHours = formData.services.length;

  const estimatedTotal = formData.services.length
    ? services
        .filter((s) => formData.services.includes(s.serviceid))
        .reduce((sum, s) => {
          const price = Number(s.amount ?? s.price ?? 0);
          return sum + (isNaN(price) ? 0 : price);
        }, 0)
    : 0;

  return (
    <CusomterLayout>
    <div className="min-h-screen bg-gradient-to-b from-orange-50 to-pink-50 flex flex-col">
      <header className="bg-gradient-to-r from-[#ffd36e] to-[#f59e9e]">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img
              src={logo}
              alt="Honey Dolls Logo"
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
          <div className="flex items-center gap-2">
            <Bell className="w-6 h-6 text-yellow-600" />
            <span className="text-orange-900 font-medium text-sm hidden sm:inline">
              Welcome, Keoski <span className="text-yellow-600">Hand Wave</span>
            </span>
          </div>
        </div>
      </header>

      <main className="flex-1 px-6 py-10">
        <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-8">
          <section className="md:col-span-2 bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
            <h2 className="text-lg font-semibold text-gray-800 mb-6">
              Schedule Your Visit
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Preferred Date
                </label>
                <input
                  type="date"
                  name="date"
                  value={formData.date}
                  min={new Date().toISOString().split("T")[0]}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 text-gray-700"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Preferred Time
                </label>
                <input
                  type="time"
                  name="time"
                  value={formData.time}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 text-gray-700"
                />
              </div>
            </div>

            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Choose Services
              </label>
              <div className="space-y-2">
                {services.length === 0 && (
                  <p className="text-sm text-gray-500">Loading services...</p>
                )}
                {services.map((svc) => (
                  <label
                    key={svc.serviceid}
                    className="flex items-center gap-2 text-sm"
                  >
                    <input
                      type="checkbox"
                      checked={formData.services.includes(svc.serviceid)}
                      onChange={() => toggleService(svc.serviceid)}
                      className="w-4 h-4 text-orange-500 rounded"
                    />
                    <span>
                      {svc.servicetype} — ₱{svc.amount ?? svc.price ?? "—"}
                    </span>
                  </label>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Preferred Staff
                </label>
                <select
                  name="staff"
                  value={formData.staff}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 text-gray-700"
                >
                  <option value="">Select Staff</option>
                  {staffList.map((s) => (
                    <option key={s.staffid} value={s.staffid}>
                      {s.firstname} {s.lastname}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Recurrence
                </label>
                <select
                  name="recurrence"
                  value={formData.recurrence}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 text-gray-700"
                >
                  <option value="None">None</option>
                  <option value="Daily">Daily — Every day</option>
                  <option value="Weekly">Weekly — Every week</option>
                  <option value="Monthly">Monthly — Same day each month</option>
                  <option value="Custom">Custom — Repeat N times</option>
                </select>
              </div>
            </div>

            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Notes
              </label>
              <textarea
                name="notes"
                value={formData.notes}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-md px-3 py-2 text-gray-700"
                rows={3}
              />
            </div>

            <div className="flex flex-col sm:flex-row gap-4 text-sm">
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  name="agree"
                  checked={formData.agree}
                  onChange={handleChange}
                  className="w-4 h-4 text-orange-500 rounded"
                />
                Agree to policies
              </label>
            </div>
          </section>

          <aside className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 h-fit sticky top-8">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">
              Appointment Summary
            </h2>

            <div className="space-y-2 text-sm text-gray-700">
              <p>
                <strong>Service(s):</strong>{" "}
                {formData.services.length
                  ? services
                      .filter((s) => formData.services.includes(s.serviceid))
                      .map((s) => s.servicetype)
                      .join(", ")
                  : "—"}
              </p>
              <p>
                <strong>Date:</strong> {formatDate(formData.date)}
              </p>
              <p>
                <strong>Time:</strong> {formData.time}
              </p>
              <p>
                <strong>Staff:</strong>{" "}
                {staffList.find(
                  (s) => String(s.staffid) === String(formData.staff)
                )
                  ? `${
                      staffList.find(
                        (s) => String(s.staffid) === String(formData.staff)
                      ).firstname
                    } ${
                      staffList.find(
                        (s) => String(s.staffid) === String(formData.staff)
                      ).lastname
                    }`
                  : "—"}
              </p>
              <p>
                <strong>Recurrence:</strong> {formatRecurrence()}
              </p>
              <p>
                <strong>Branch:</strong> Honey Dolls • Brilliant Beauty Hub —
                Davao
              </p>

              <p>
                <strong>Estimated Hours:</strong> {estimatedHours} hour
                {estimatedHours !== 1 ? "s" : ""}
              </p>

              <p>
                <strong>Notes:</strong> {formData.notes || "—"}
              </p>

              <p className="font-semibold text-right text-gray-800 mt-4 pt-2 border-t border-gray-200">
                Estimated Total:{" "}
                <span className="text-gray-900 font-bold text-lg">
                  ₱{estimatedTotal.toLocaleString()}
                </span>
              </p>
            </div>

            <div className="mt-6 flex flex-col gap-3">
              <button
                onClick={handleSubmit}
                disabled={loading}
                className={`w-full py-2.5 rounded-md text-white font-medium ${
                  loading
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-gradient-to-r from-[#ffd36e] to-[#f59e9e] hover:shadow-md"
                }`}
              >
                {loading ? "Booking..." : "Finalize Booking"}
              </button>

              {error && (
                <div className="mt-3 text-sm text-red-700 font-medium">
                  {error}
                </div>
              )}
            </div>
          </aside>
        </div>
      </main>

      <footer className="bg-white/80 py-3 border-t border-gray-200 mt-auto">
        <div className="max-w-7xl mx-auto px-6">
          <p className="text-xs text-gray-600 text-center">
            Honey Dolls • Brilliant Beauty Hub — Davao | Open Daily
            9:00AM–9:00PM | Call (0934) 912 6618
          </p>
        </div>
      </footer>

      {/* --- SUCCESS MODAL --- */}
      {showSuccessModal && (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-6 max-w-sm w-full text-center shadow-lg">
            <h3 className="text-lg font-semibold text-green-700 mb-4">
              Appointment Created Successfully!
            </h3>
            <button
              className="px-6 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
              onClick={() => setShowSuccessModal(false)}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
    </CusomterLayout>
  );
};

export default Custapp;
