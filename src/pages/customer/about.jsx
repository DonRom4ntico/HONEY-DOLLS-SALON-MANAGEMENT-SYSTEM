// src/pages/About.jsx
import React from "react";
import CustomerLayout from "../../layout/customerLayout";
import { Scissors, User, Clock } from "lucide-react"; // ← THIS WAS MISSING!

export default function About() {
  return (
    <CustomerLayout>
      <main className="min-h-screen bg-gradient-to-b from-orange-50 to-pink-50 pt-20 pb-12">
        <div className="max-w-7xl mx-auto px-6 py-16">

          {/* Hero Section */}
          <section className="text-center mb-16">
            <h1 className="text-5xl md:text-6xl font-bold text-orange-900 mb-6">
              About Honey Dolls & Brilliant Beauty Hub
            </h1>
            <p className="text-xl text-gray-700 max-w-3xl mx-auto">
              Where self-care is not a luxury, but a necessity. Discover your inner beauty with our all-in-one beauty services in the heart of Davao.
            </p>
          </section>

          {/* Mission + Stats */}
          <section className="grid md:grid-cols-2 gap-12 mb-16 items-center">
            <div>
              <h2 className="text-3xl font-bold text-orange-900 mb-4">Our Mission</h2>
              <p className="text-lg text-gray-700 leading-relaxed">
                At Honey Dolls & Brilliant Beauty Hub, we empower every individual to embrace their unique beauty through personalized, high-quality services. 
                We believe in creating a welcoming space where you can relax, rejuvenate, and rediscover your confidence. Our commitment is to deliver exceptional 
                beauty experiences that leave you feeling radiant inside and out.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-6 mt-8 md:mt-0">
              <div className="bg-pink-50 p-6 rounded-2xl text-center shadow-md">
                <h3 className="text-2xl font-bold text-pink-600 mb-2">16K+</h3>
                <p className="text-gray-600">Happy Customers</p>
              </div>
              <div className="bg-yellow-50 p-6 rounded-2xl text-center shadow-md">
                <h3 className="text-2xl font-bold text-yellow-600 mb-2">50+</h3>
                <p className="text-gray-600">Services Offered</p>
              </div>
              <div className="bg-orange-50 p-6 rounded-2xl text-center shadow-md">
                <h3 className="text-2xl font-bold text-orange-600 mb-2">9AM-9PM</h3>
                <p className="text-gray-600">Daily Hours</p>
              </div>
              <div className="bg-pink-50 p-6 rounded-2xl text-center shadow-md">
                <h3 className="text-2xl font-bold text-pink-600 mb-2">5.0</h3>
                <p className="text-gray-600">Average Rating</p>
              </div>
            </div>
          </section>

          {/* Our Story */}
          <section className="bg-white rounded-3xl shadow-xl p-12 mb-16">
            <h2 className="text-3xl font-bold text-orange-900 text-center mb-8">Our Story</h2>
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div className="space-y-6 text-lg text-gray-700 leading-relaxed">
                <p>
                  Founded in the vibrant city of Davao, Honey Dolls & Brilliant Beauty Hub started as a small dream to bring world-class beauty services 
                  to our local community. What began as a passion for making women feel beautiful and empowered has grown into a beloved hub where thousands 
                  come to unwind and transform.
                </p>
                <p>
                  Located at <strong>DGGG Y10, CM Recto Corner Emilio Jacinto</strong> (in front of Vivaldi Residences Davao), we’re open daily from 
                  <strong> 9:00 AM – 9:00 PM</strong>.
                </p>
                <p>
                  We only use premium, safe products and our skilled stylists are always updated with the latest trends — ensuring every visit leaves you glowing.
                </p>
              </div>
              <div>
                <img
                  src="/src/assets/logoe.png" // ← Change this to your actual salon photo
                  alt="Honey Dolls & Brilliant Beauty Hub Interior"
                  className="w-full h-96 object-cover rounded-2xl shadow-lg"
                />
              </div>
            </div>
          </section>

          {/* Services Highlight */}
          <section className="mb-16">
            <h2 className="text-3xl font-bold text-orange-900 text-center mb-10">What We Offer</h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-pink-50 p-8 rounded-2xl text-center hover:shadow-xl transition">
                <div className="w-20 h-20 bg-pink-200 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <Scissors className="w-10 h-10 text-pink-600" />
                </div>
                <h3 className="text-xl font-bold text-pink-900 mb-3">Hair Styling</h3>
                <p className="text-gray-700">Cuts, colors, keratin, rebonding & more</p>
              </div>

              <div className="bg-yellow-50 p-8 rounded-2xl text-center hover:shadow-xl transition">
                <div className="w-20 h-20 bg-yellow-200 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <User className="w-10 h-10 text-yellow-600" />
                </div>
                <h3 className="text-xl font-bold text-yellow-900 mb-3">Nail Care</h3>
                <p className="text-gray-700">Manicure, pedicure, gel polish, extensions</p>
              </div>

              <div className="bg-orange-50 p-8 rounded-2xl text-center hover:shadow-xl transition">
                <div className="w-20 h-20 bg-orange-200 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <Clock className="w-10 h-10 text-orange-600" />
                </div>
                <h3 className="text-xl font-bold text-orange-900 mb-3">Facial & Skin Care</h3>
                <p className="text-gray-700">Diamond peel, hydrofacial, anti-acne treatments</p>
              </div>
            </div>
          </section>

          {/* Visit Us */}
          <section className="bg-gradient-to-r from-pink-100 to-orange-100 rounded-3xl p-12 text-center">
            <h2 className="text-3xl font-bold text-orange-900 mb-8">Visit Us Today</h2>
            <div className="grid md:grid-cols-3 gap-10 text-lg">
              <div>
                <h3 className="font-bold text-gray-800 mb-3">Location</h3>
                <p className="text-gray-700">
                  DGGG Y10, CM Recto Corner Emilio Jacinto<br />
                  (In front of Vivaldi Residences)<br />
                  Davao City, Philippines
                </p>
              </div>
              <div>
                <h3 className="font-bold text-gray-800 mb-3">Hours</h3>
                <p className="text-gray-700">
                  Monday – Sunday<br />
                  9:00 AM – 9:00 PM
                </p>
              </div>
              <div>
                <h3 className="font-bold text-gray-800 mb-3">Contact</h3>
                <p className="text-gray-700">
                  FB: Honey Dolls & Brilliant Beauty Hub<br />
                  Mobile: (0994) 912 6618
                </p>
              </div>
            </div>
            <button className="mt-10 bg-gradient-to-r from-[#FFD36E] to-[#F59E9E] text-white font-bold px-10 py-4 rounded-full text-lg hover:shadow-2xl transition transform hover:scale-105">
              Book Appointment Now
            </button>
          </section>

          {/* Team */}
          <section className="mt-20 text-center">
            <h2 className="text-3xl font-bold text-orange-900 mb-8">Meet Our Brilliant Team</h2>
            <div className="grid md:grid-cols-4 gap-8 max-w-5xl mx-auto">
              {["Anna", "Mariel", "Jessa", "Rico"].map((name) => (
                <div key={name} className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition">
                  <div className="w-28 h-28 bg-pink-100 rounded-full mx-auto mb-4 flex items-center justify-center">
                    <User className="w-14 h-14 text-pink-600" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-800">{name}</h3>
                  <p className="text-gray-600">Senior Stylist</p>
                </div>
              ))}
            </div>
          </section>

        </div>
      </main>
    </CustomerLayout>
  );
}