// src/pages/Dashboard.jsx
import React from "react";
import { Link } from "react-router-dom"; // ← Added only this line
import CustomerLayout from "../../layout/customerLayout";

const Dashboard = () => {
  const scrollToServices = () => {
    document
      .getElementById("services-section")
      ?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <CustomerLayout>
      {/* ====================== HERO SECTION ====================== */}
      <section className="relative min-h-screen text-white overflow-hidden">
        {/* Background Image */}
        <div
          className="absolute inset-0 bg-center bg-no-repeat bg-cover blur-sm opacity-70"
          style={{ backgroundImage: "url('/src/assets/logoe.png')" }}
        />
        <div className="absolute inset-0 bg-black/40" />

        <div className="relative z-10 flex flex-col justify-between min-h-screen">
          {/* Hero Text */}
          <div className="flex flex-col items-center justify-center flex-1 text-center px-4 pt-20">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-semibold mb-6 leading-tight">
              Always Make Room for a{" "}
              <span className="text-pink-300">Little Beauty</span> in Your Life
            </h2>

            <div className="flex flex-wrap gap-4 justify-center">
              {/* ONLY CHANGE: button → Link (exact same style) */}
              <Link
                to="/custapp "
                className="bg-pink-400 hover:bg-pink-500 text-white px-5 py-2 rounded-md font-medium transition"
              >
                Book Appointment
              </Link>

              <button
                onClick={scrollToServices}
                className="border border-white px-5 py-2 rounded-md hover:bg-white/10 font-medium transition cursor-pointer"
              >
                Service Menu
              </button>
            </div>
          </div>

          {/* Footer */}
          <footer className="grid md:grid-cols-3 text-center gap-8 px-6 md:px-16 py-8 bg-black/30">
            <div>
              <h3 className="font-semibold mb-2 tracking-wide">CONTACT</h3>
              <p>FB: Honey Dolls & Brilliant Beauty Hub</p>
              <p>Mobile No: (0994) 912 6618</p>
            </div>
            <div>
              <h3 className="font-semibold mb-2 tracking-wide">HOURS</h3>
              <p>Mon to Sun: 9:00 am — 9:00 pm</p>
            </div>
            <div>
              <h3 className="font-semibold mb-2 tracking-wide">LOCATION</h3>
              <p>CM Recto Corner Emilio Jacinto</p>
              <p>(Infront of Vivaldi Residences Davao)</p>
              <p>Davao City, Philippines</p>
            </div>
          </footer>
        </div>
      </section>

      {/* ====================== SERVICES & PRICES ====================== */}
      <section
        id="services-section"
        className="bg-gradient-to-b from-[#ffd6d6] via-[#fcbaba] to-[#f7a8a8] py-24 px-6 md:px-16 text-[#6d1f2b]"
      >
        {/* Header */}
        <div className="max-w-5xl mx-auto text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 tracking-wide">
            Services and Prices
          </h2>
          <p className="italic text-[#80383f]">
            “Experience top-tier beauty services crafted just for you — all at prices that bring luxury within reach.”
          </p>
        </div>

        {/* Z-PATTERN SECTIONS */}
        <div className="max-w-7xl mx-auto space-y-32">
          {/* 1. LASHES */}
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <img
              src="/src/assets/Img.png"
              alt="Lashes"
              className="w-full h-80 md:h-96 object-cover rounded-2xl shadow-xl"
            />
            <div className="text-left">
              <h3 className="text-3xl font-bold mb-2">Lashes</h3>
              <p className="font-medium text-[#80383f] mb-4">
                Honey Dolls & Brilliant Beauty Hub
              </p>

              <div className="space-y-2 text-lg">
                {[
                  ["Mink", "only ₱199"],
                  ["Natural Classic", "only ₱299"],
                  ["Cat Eye Classic", "only ₱599"],
                  ["Wispy Classic", "only ₱599"],
                  ["Natural Taiwanyy", "only ₱449"],
                ].map(([name, price]) => (
                  <div
                    key={name}
                    className="flex justify-between border-b border-dashed border-[#d68a8a] pb-1"
                  >
                    <span>{name}</span>
                    <span className="font-semibold text-pink-700">{price}</span>
                  </div>
                ))}
              </div>

              <a className="block mt-4 text-sm underline text-pink-700">View all</a>
            </div>
          </div>

          {/* 2. HAIR STYLING */}
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="text-left">
              <h3 className="text-3xl font-bold mb-2">Hair Styling</h3>
              <p className="font-medium text-[#80383f] mb-4">
                Honey Dolls & Brilliant Beauty Hub
              </p>

              <div className="space-y-2 text-lg">
                {[
                  ["Keratin Treatment", "only ₱799"],
                  ["Hair Botox", "only ₱799"],
                  ["Full Hair Color", "only ₱799"],
                  ["Hair Digital Perming", "only ₱999"],
                  ["Hair Straight Rebond", "only ₱999"],
                ].map(([name, price]) => (
                  <div
                    key={name}
                    className="flex justify-between border-b border-dashed border-[#d68a8a] pb-1"
                  >
                    <span>{name}</span>
                    <span className="font-semibold text-pink-700">{price}</span>
                  </div>
                ))}
              </div>

              <a className="block mt-4 text-sm underline text-pink-700">View all</a>
            </div>

            <img
              src="/src/assets/Img2.png"
              alt="Hair"
              className="w-full h-80 md:h-96 object-cover rounded-2xl shadow-xl"
            />
          </div>

          {/* 3. NAIL CARE */}
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <img
              src="/src/assets/Img3.png"
              alt="Nail Care"
              className="w-full h-80 md:h-96 object-cover rounded-2xl shadow-xl"
            />
            <div className="text-left">
              <h3 className="text-3xl font-bold mb-2">Nail Care</h3>
              <p className="font-medium text-[#80383f] mb-4">
                Honey Dolls & Brilliant Beauty Hub
              </p>

              <div className="space-y-2 text-lg">
                {[
                  ["Classic Manicure", "only ₱120"],
                  ["Classic Pedicure", "only ₱150"],
                  ["Add Reg. Polish", "only ₱50"],
                  ["Handgel", "only ₱199"],
                  ["Footgel", "only ₱349"],
                ].map(([name, price]) => (
                  <div
                    key={name}
                    className="flex justify-between border-b border-dashed border-[#d68a8a] pb-1"
                  >
                    <span>{name}</span>
                    <span className="font-semibold text-pink-700">{price}</span>
                  </div>
                ))}
              </div>

              <a className="block mt-4 text-sm underline text-pink-700">View all</a>
            </div>
          </div>

          {/* 4. NAIL EXTENSION */}
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="text-left">
              <h3 className="text-3xl font-bold mb-2">Nail Extension</h3>
              <p className="font-medium text-[#80383f] mb-4">
                Honey Dolls & Brilliant Beauty Hub
              </p>

              <div className="space-y-2 text-lg">
                {[
                  ["Softgel Patch", "only ₱198"],
                  ["Acrygel Patch", "only ₱498"],
                  ["Overlay Builder", "only ₱198"],
                  ["Toenail", "only ₱498"],
                  ["Add Gel Polish", "only ₱259"],
                ].map(([name, price]) => (
                  <div
                    key={name}
                    className="flex justify-between border-b border-dashed border-[#d68a8a] pb-1"
                  >
                    <span>{name}</span>
                    <span className="font-semibold text-pink-700">{price}</span>
                  </div>
                ))}
              </div>

              <a className="block mt-4 text-sm underline text-pink-700">View all</a>
            </div>

            <img
              src="/src/assets/Img4.png"
              alt="Nail Extension"
              className="w-full h-80 md:h-96 object-cover rounded-2xl shadow-xl"
            />
          </div>

          {/* 5. FACIAL SERVICES */}
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <img
              src="/src/assets/Img5.png"
              alt="Facial Services"
              className="w-full h-80 md:h-96 object-cover rounded-2xl shadow-xl"
            />
            <div className="text-left">
              <h3 className="text-3xl font-bold mb-2">Facial Services</h3>
              <p className="font-medium text-[#80383f] mb-4">
                Honey Dolls & Brilliant Beauty Hub
              </p>

              <div className="space-y-2 text-lg">
                {[
                  ["Basic Facial", "only ₱299"],
                  ["Diamond Peel", "only ₱498"],
                  ["Anti-Acne", "only ₱498"],
                  ["Madonna 24k Gold", "only ₱599"],
                  ["Korean Hydrofacial", "only ₱898"],
                ].map(([name, price]) => (
                  <div
                    key={name}
                    className="flex justify-between border-b border-dashed border-[#d68a8a] pb-1"
                  >
                    <span>{name}</span>
                    <span className="font-semibold text-pink-700">{price}</span>
                  </div>
                ))}
              </div>

              <a className="block mt-4 text-sm underline text-pink-700">View all</a>
            </div>
          </div>
        </div>
      </section>
    </CustomerLayout>
  );
};

export default Dashboard;