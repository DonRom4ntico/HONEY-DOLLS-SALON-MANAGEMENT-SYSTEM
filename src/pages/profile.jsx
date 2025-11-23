// src/pages/Profile.jsx
import React, { useState } from "react";
import CustomerLayout from "../layout/customerLayout";
import { User, Mail, Phone, Calendar, MapPin, Camera, Edit2, Save, X } from "lucide-react";

export default function Profile() {
  const [isEditing, setIsEditing] = useState(false);

  const [profile, setProfile] = useState({
    name: "Alita Angel Pangaliban",
    email: "alita.angel@gmail.com",
    phone: "0917 123 4567",
    birthday: "1998-05-15",
    address: "Buhangin, Davao City",
    memberSince: "March 15, 2024"
  });

  const [editData, setEditData] = useState({ ...profile });

  const handleSave = () => {
    setProfile({ ...editData });
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditData({ ...profile });
    setIsEditing(false);
  };

  return (
    <CustomerLayout>
      <main className="min-h-screen bg-gradient-to-b from-orange-50 to-pink-50 pt-20 pb-16">
        <div className="max-w-4xl mx-auto px-6 py-10">

          {/* Page Title */}
          <h1 className="text-4xl font-bold text-orange-900 text-center mb-12">
            My Profile
          </h1>

          {/* Profile Card */}
          <div className="bg-white rounded-3xl shadow-2xl overflow-hidden">

            {/* Header - Avatar + Name */}
            <div className="bg-gradient-to-r from-[#FFD36E] to-[#F59E9E] p-12 text-center">
              <div className="relative inline-block">
                <div className="w-36 h-36 bg-white rounded-full flex items-center justify-center shadow-2xl border-4 border-white">
                  <User className="w-20 h-20 text-pink-600" />
                </div>
                <button className="absolute bottom-3 right-3 bg-white p-3 rounded-full shadow-lg hover:shadow-xl transition hover:scale-110">
                  <Camera className="w-6 h-6 text-gray-700" />
                </button>
              </div>
              <h2 className="text-3xl font-bold text-white mt-8">
                {profile.name}
              </h2>
              <p className="text-white/90 text-lg mt-2">Honey Dolls Member</p>
            </div>

            {/* Profile Details */}
            <div className="p-10">
              <div className="flex justify-between items-center mb-10">
                <h3 className="text-2xl font-bold text-orange-900">Personal Information</h3>
                {!isEditing ? (
                  <button
                    onClick={() => setIsEditing(true)}
                    className="flex items-center gap-2 px-6 py-3 bg-orange-500 text-white rounded-full hover:bg-orange-600 transition shadow-md"
                  >
                    <Edit2 className="w-5 h-5" />
                    Edit Profile
                  </button>
                ) : (
                  <div className="flex gap-3">
                    <button
                      onClick={handleSave}
                      className="flex items-center gap-2 px-7 py-3 bg-green-600 text-white rounded-full hover:bg-green-700 transition shadow-md"
                    >
                      <Save className="w-5 h-5" />
                      Save
                    </button>
                    <button
                      onClick={handleCancel}
                      className="flex items-center gap-2 px-7 py-3 bg-gray-500 text-white rounded-full hover:bg-gray-600 transition shadow-md"
                    >
                      <X className="w-5 h-5" />
                      Cancel
                    </button>
                  </div>
                )}
              </div>

              <div className="space-y-8">

                {/* Full Name */}
                <div className="flex items-center gap-6">
                  <div className="w-14 h-14 bg-pink-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <User className="w-7 h-7 text-pink-600" />
                  </div>
                  {isEditing ? (
                    <input
                      type="text"
                      value={editData.name}
                      onChange={(e) => setEditData({ ...editData, name: e.target.value })}
                      className="flex-1 px-5 py-4 border-2 border-gray-200 rounded-2xl focus:outline-none focus:border-orange-500 text-lg"
                      placeholder="Full Name"
                    />
                  ) : (
                    <div>
                      <p className="text-sm text-gray-500">Full Name</p>
                      <p className="text-xl font-semibold text-gray-800">{profile.name}</p>
                    </div>
                  )}
                </div>

                {/* Email */}
                <div className="flex items-center gap-6">
                  <div className="w-14 h-14 bg-yellow-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <Mail className="w-7 h-7 text-yellow-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Email Address</p>
                    <p className="text-xl font-semibold text-gray-800">{profile.email}</p>
                  </div>
                </div>

                {/* Phone */}
                <div className="flex items-center gap-6">
                  <div className="w-14 h-14 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <Phone className="w-7 h-7 text-green-600" />
                  </div>
                  {isEditing ? (
                    <input
                      type="text"
                      value={editData.phone}
                      onChange={(e) => setEditData({ ...editData, phone: e.target.value })}
                      className="flex-1 px-5 py-4 border-2 border-gray-200 rounded-2xl focus:outline-none focus:border-orange-500 text-lg"
                      placeholder="Phone Number"
                    />
                  ) : (
                    <div>
                      <p className="text-sm text-gray-500">Phone Number</p>
                      <p className="text-xl font-semibold text-gray-800">{profile.phone}</p>
                    </div>
                  )}
                </div>

                {/* Birthday */}
                <div className="flex items-center gap-6">
                  <div className="w-14 h-14 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <Calendar className="w-7 h-7 text-purple-600" />
                  </div>
                  {isEditing ? (
                    <input
                      type="date"
                      value={editData.birthday}
                      onChange={(e) => setEditData({ ...editData, birthday: e.target.value })}
                      className="flex-1 px-5 py-4 border-2 border-gray-200 rounded-2xl focus:outline-none focus:border-orange-500 text-lg"
                    />
                  ) : (
                    <div>
                      <p className="text-sm text-gray-500">Birthday</p>
                      <p className="text-xl font-semibold text-gray-800">
                        {new Date(profile.birthday).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                      </p>
                    </div>
                  )}
                </div>

                {/* Address */}
                <div className="flex items-center gap-6">
                  <div className="w-14 h-14 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-7 h-7 text-blue-600" />
                  </div>
                  {isEditing ? (
                    <input
                      type="text"
                      value={editData.address}
                      onChange={(e) => setEditData({ ...editData, address: e.target.value })}
                      className="flex-1 px-5 py-4 border-2 border-gray-200 rounded-2xl focus:outline-none focus:border-orange-500 text-lg"
                      placeholder="Address"
                    />
                  ) : (
                    <div>
                      <p className="text-sm text-gray-500">Address</p>
                      <p className="text-xl font-semibold text-gray-800">{profile.address}</p>
                    </div>
                  )}
                </div>

                {/* Member Since */}
                <div className="pt-8 border-t-2 border-gray-100 text-center">
                  <p className="text-sm text-gray-500">Member Since</p>
                  <p className="text-2xl font-bold text-orange-900">{profile.memberSince}</p>
                </div>

              </div>
            </div>
          </div>

          {/* Footer Message */}
          <div className="mt-12 text-center">
            <p className="text-lg text-gray-700">
              Thank you for being part of the <span className="font-bold text-pink-600">Honey Dolls Family</span>
            </p>
            <p className="text-sm text-gray-500 mt-2">
              We can’t wait to see you glowing again soon!
            </p>
          </div>

        </div>
      </main>
    </CustomerLayout>
  );
}