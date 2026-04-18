"use client"

import React, { useState } from 'react';
import { Mail, Phone, CalendarDays, MapPin, Building, Briefcase, Award, Pencil, Star, LogOut } from 'lucide-react';

function Page() {
  // Mock data - replace with data from your API
  const [student, setStudent] = useState({
    name: "Anya Smith",
    id: "EN22186641",
    avatar: "https://images.unsplash.com/photo-1599566150163-29194dcaad36?&w=128&h=128&q=80&auto=format&fit=crop",
    bio: "Computer Science Senior passionate about Full-Stack Development and UI/UX Design. President of the University Coding Club.",
    status: "Verified Student",
    gpa: 3.85,
    campus: {
      name: "Engineering Main Campus",
      code: "4077",
      email: "eng.main@university.edu"
    },
    contact: {
      personalEmail: "anya.s.smith@gmail.com",
      phone: "+1 (555) 123-4567"
    }
  });

  return (
    <div className="min-h-screen bg-gray-50 font-sans text-gray-900 antialiased">
      {/* HEADER & COVER SECTION */}
      <div className="relative h-40 md:h-56 bg-gradient-to-r from-indigo-800 to-indigo-950">
        {/* Decorative pattern/blur for premium look */}
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10"></div>
        
        {/* Header Content */}
        <div className="absolute top-4 right-4 md:top-6 md:right-6 flex space-x-2">
            <button className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-white bg-indigo-700 hover:bg-indigo-600 rounded-full transition shadow-md">
                <Pencil size={14} />
                Edit Cover
            </button>
            <button className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-white bg-red-600 hover:bg-red-700 rounded-full transition shadow-md">
                <LogOut size={14} />
                Logout
            </button>
        </div>
      </div>

      {/* MAIN CONTAINER */}
      <div className="max-w-7xl mx-auto px-4 md:px-8 pb-12">
        {/* PROFILE HEADER CARD */}
        <div className="relative -top-16 md:-top-20 bg-white p-6 md:p-8 rounded-3xl shadow-xl border border-gray-100 mb-8">
          <div className="flex flex-col md:flex-row md:items-center gap-6">
            {/* Avatar */}
            <div className="relative flex-shrink-0">
                <img 
                    src={student.avatar} 
                    alt={student.name} 
                    className="w-32 h-32 md:w-36 md:h-36 rounded-full border-4 border-white shadow-lg object-cover"
                />
                <span className="absolute bottom-1 right-1 px-3 py-1 bg-green-100 text-green-700 rounded-full text-[10px] font-bold shadow-md">
                    {student.status}
                </span>
            </div>

            {/* Basic Info */}
            <div className="flex-1 space-y-3">
              <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
                <h1 className="text-3xl md:text-4xl font-extrabold tracking-tighter text-gray-950">{student.name}</h1>
                <div className="px-3 py-1 bg-gray-100 text-gray-600 rounded-full text-xs font-mono font-semibold">
                    ID: {student.id}
                </div>
              </div>
              <p className="text-gray-600 text-base md:text-lg max-w-2xl leading-relaxed">{student.bio}</p>
              
              {/* Stat Highlights */}
              <div className="flex items-center gap-6 pt-2">
                <Highlight label="Campus" value={student.campus.code} icon={<Building size={16} />} />
                <Highlight label="CGPA" value={student.gpa.toFixed(2)} icon={<Star size={16} className="text-yellow-500 fill-yellow-400" />} />
                <Highlight label="Verified" value="Active" icon={<Award size={16} className="text-green-600" />} />
              </div>
            </div>

            {/* Edit Button */}
            <div className="md:absolute md:top-8 md:right-8 mt-4 md:mt-0">
                <button className="flex items-center gap-1.5 px-5 py-2.5 text-sm font-semibold text-indigo-700 bg-indigo-50 hover:bg-indigo-100 rounded-xl transition border border-indigo-100">
                    <Pencil size={16} />
                    Edit Profile
                </button>
            </div>
          </div>
        </div>

        {/* TWO-COLUMN LAYOUT */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 relative -top-8">
          
          {/* LEFT COLUMN: Sidebar info (Contact, Campus) */}
          <div className="lg:col-span-1 space-y-8">
            
            {/* Contact Information Card */}
            <InfoCard title="Contact Details">
              <InfoItem icon={<Mail />} label="Personal Email" value={student.contact.personalEmail} copyable />
              <InfoItem icon={<Phone />} label="Phone Number" value={student.contact.phone} copyable />
              <InfoItem icon={<MapPin />} label="Mailing" value="123 University Ave, Apt 4" />
            </InfoCard>

            {/* Campus Information Card */}
            <InfoCard title="Official Campus Info">
                <InfoItem icon={<Building />} label="Campus Name" value={student.campus.name} />
                <InfoItem icon={<Mail />} label="Official Email" value={student.campus.email} />
                <InfoItem icon={<CalendarDays />} label="Joined Date" value="September 15, 2022" />
            </InfoCard>
          </div>

          {/* RIGHT COLUMN: Major/Detailed sections (Timeline, Settings) */}
          <div className="lg:col-span-2 space-y-8">
            {/* Academic Activity Timeline */}
            <div className="bg-white p-6 md:p-8 rounded-2xl shadow-sm border border-gray-100">
                <div className="flex items-center gap-3 mb-6">
                    <div className="p-3 bg-indigo-50 text-indigo-700 rounded-lg">
                        <Award size={22} />
                    </div>
                    <h2 className="text-2xl font-bold tracking-tight text-gray-950">Recent Academic Milestones</h2>
                </div>
                
                {/* Timeline Visualization */}
                <div className="space-y-6">
                    <TimelineItem 
                        date="Jan 2026" 
                        title="Dean's List - Fall Semester" 
                        desc="Awarded for maintaining a GPA above 3.8." 
                    />
                    <TimelineItem 
                        date="Nov 2025" 
                        title="Elected Club President" 
                        desc="Took leadership of the University Coding Club for the 2025-2026 term." 
                    />
                     <TimelineItem 
                        date="Aug 2025" 
                        title="Completed Summer Internship" 
                        desc="Worked as a Frontend Intern at TechCorp Inc." 
                        isLast
                    />
                </div>
            </div>

            {/* Account Settings Placeholder */}
            <div className="bg-white p-6 md:p-8 rounded-2xl shadow-sm border border-gray-100">
                <h2 className="text-xl font-bold mb-4 text-gray-950">Security & Settings</h2>
                <div className="flex flex-wrap gap-3">
                    <button className="px-4 py-2 text-sm bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition">Change Password</button>
                    <button className="px-4 py-2 text-sm bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition">Privacy Settings</button>
                    <button className="px-4 py-2 text-sm bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition">Verification Details</button>
                </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}

{/* --- HELPER COMPONENTS (Clean Code) --- */}

const Highlight = ({ icon, label, value }) => (
  <div className="flex items-center gap-1.5 text-sm">
    <div className="text-gray-400">{icon}</div>
    <span className="text-gray-500">{label}:</span>
    <span className="font-semibold text-gray-800">{value}</span>
  </div>
);

const InfoCard = ({ title, children }) => (
  <div className="bg-white p-6 md:p-8 rounded-2xl shadow-sm border border-gray-100">
    <h3 className="text-xl font-bold mb-6 tracking-tight text-gray-950">{title}</h3>
    <div className="space-y-5">{children}</div>
  </div>
);

const InfoItem = ({ icon, label, value, copyable = false }) => (
  <div className="flex items-start gap-3 text-sm">
    <div className="mt-0.5 p-1.5 bg-gray-100 text-gray-500 rounded-lg">
        {React.cloneElement(icon, { size: 16 })}
    </div>
    <div className="flex-1">
      <p className="text-xs text-gray-400 uppercase font-bold tracking-wider mb-0.5">{label}</p>
      <p className="font-medium text-gray-800">{value}</p>
    </div>
    {copyable && (
      <button className="text-xs text-indigo-600 hover:text-indigo-800 font-semibold" onClick={() => navigator.clipboard.writeText(value)}>
        Copy
      </button>
    )}
  </div>
);

const TimelineItem = ({ date, title, desc, isLast = false }) => (
    <div className={`flex gap-4 ${isLast ? '' : 'pb-6'}`}>
        <div className="flex flex-col items-center">
            <div className="w-10 h-10 bg-indigo-50 text-indigo-700 rounded-full flex items-center justify-center font-bold text-xs border border-indigo-100 shadow-inner">
                {date}
            </div>
            {!isLast && <div className="w-0.5 flex-1 bg-gray-100 mt-2"></div>}
        </div>
        <div className="flex-1 pt-1.5">
            <h4 className="font-bold text-gray-900">{title}</h4>
            <p className="text-gray-600 text-sm">{desc}</p>
        </div>
    </div>
);

export default Page;