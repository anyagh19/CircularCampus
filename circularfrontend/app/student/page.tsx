"use client"

import React, { useState } from 'react';
import { Mail, Phone, MapPin, Building, Award, Pencil, LogOut, ChevronRight, ShoppingBag, User, Link } from 'lucide-react';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/Components/ui/dropdown-menu';

function Page() {
  const [student, setStudent] = useState({
    name: "Anya Smith",
    id: "EN22186641",
    bio: "Computer Science Senior · Full‑Stack & UI/UX",
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
    <div className="min-h-screen bg-neutral-50 font-sans text-neutral-900 antialiased">
      {/* Main Container */}
      <div className="max-w-3xl mx-auto px-4 py-8 md:py-12">
        {/* Header Row: Title + Actions */}
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-2xl font-semibold tracking-tight text-neutral-900">Profile</h1>
          <div className="flex items-center gap-2">
            <button className="flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium text-neutral-600 bg-white hover:bg-neutral-100 rounded-lg border border-neutral-200 transition">
              <Pencil size={14} />
              <span className="hidden sm:inline">Edit</span>
            </button>
            <button className="flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium text-red-600 bg-white hover:bg-red-50 rounded-lg border border-red-200 transition">
              <LogOut size={14} />
              <span className="hidden sm:inline">Logout</span>
            </button>
          </div>
        </div>

        {/* Profile Card */}
        <div className="bg-white rounded-2xl border border-neutral-200 shadow-sm p-6 md:p-8 mb-8">
          <div className="flex items-start gap-5">
            {/* Initial Avatar */}
            <div className="w-14 h-14 rounded-full bg-neutral-100 border border-neutral-200 flex items-center justify-center flex-shrink-0">
              <span className="text-xl font-semibold text-neutral-500">
                {student.name.split(' ').map(n => n[0]).join('')}
              </span>
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex flex-col sm:flex-row sm:items-baseline gap-1">
                <h2 className="text-xl font-semibold text-neutral-900 truncate">{student.name}</h2>
                <span className="text-xs text-neutral-500 font-mono">ID: {student.id}</span>
              </div>
              <p className="text-sm text-neutral-600 mt-1 leading-relaxed">{student.bio}</p>
              <div className="flex flex-wrap items-center gap-3 mt-3 text-xs text-neutral-500">
                <span className="flex items-center gap-1">
                  <Building size={14} />
                  {student.campus.code}
                </span>
                <span>·</span>
                <span className="flex items-center gap-1">
                  <Award size={14} />
                  GPA {student.gpa.toFixed(2)}
                </span>
                <span>·</span>
                <span className="px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 font-medium">Verified</span>
              </div>
            </div>
          </div>
        </div>

        {/* Two-Column Detail Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Contact */}
          <div>
            <h3 className="text-sm font-semibold text-neutral-500 uppercase tracking-wider mb-4">Contact</h3>
            <ul className="space-y-3">
              <li className="flex items-center gap-3">
                <Mail size={16} className="text-neutral-400" />
                <div>
                  <p className="text-xs text-neutral-500">Personal Email</p>
                  <p className="text-sm font-medium text-neutral-800">{student.contact.personalEmail}</p>
                </div>
              </li>
              <li className="flex items-center gap-3">
                <Phone size={16} className="text-neutral-400" />
                <div>
                  <p className="text-xs text-neutral-500">Phone</p>
                  <p className="text-sm font-medium text-neutral-800">{student.contact.phone}</p>
                </div>
              </li>
              <li className="flex items-center gap-3">
                <MapPin size={16} className="text-neutral-400" />
                <div>
                  <p className="text-xs text-neutral-500">Mailing</p>
                  <p className="text-sm font-medium text-neutral-800">123 University Ave, Apt 4</p>
                </div>
              </li>
            </ul>
          </div>

          {/* Campus & Settings */}
          <div>
            <h3 className="text-sm font-semibold text-neutral-500 uppercase tracking-wider mb-4">Campus</h3>
            <ul className="space-y-3 mb-6">
              <li className="flex items-center gap-3">
                <Building size={16} className="text-neutral-400" />
                <div>
                  <p className="text-xs text-neutral-500">Campus</p>
                  <p className="text-sm font-medium text-neutral-800">{student.campus.name}</p>
                </div>
              </li>
              <li className="flex items-center gap-3">
                <Mail size={16} className="text-neutral-400" />
                <div>
                  <p className="text-xs text-neutral-500">Official Email</p>
                  <p className="text-sm font-medium text-neutral-800">{student.campus.email}</p>
                </div>
              </li>
            </ul>

            <h3 className="text-sm font-semibold text-neutral-500 uppercase tracking-wider mb-3">Settings</h3>
            <div className="space-y-2">
              <button className="w-full flex items-center justify-between px-4 py-3 text-sm bg-neutral-50 hover:bg-neutral-100 rounded-lg transition text-neutral-700">
                Change Password
                <ChevronRight size={14} />
              </button>
              <button className="w-full flex items-center justify-between px-4 py-3 text-sm bg-neutral-50 hover:bg-neutral-100 rounded-lg transition text-neutral-700">
                Privacy Settings
                <ChevronRight size={14} />
              </button>
              <button className="w-full flex items-center justify-between px-4 py-3 text-sm bg-neutral-50 hover:bg-neutral-100 rounded-lg transition text-neutral-700">
                Verification Details
                <ChevronRight size={14} />
              </button>
            </div>
          </div>
        </div>

        {/* Academic Timeline – simplified */}
        <div className="mt-8 pt-8 border-t border-neutral-200">
          <h3 className="text-sm font-semibold text-neutral-500 uppercase tracking-wider mb-5">Recent Activity</h3>
          <div className="space-y-4">
            <TimelineItem date="Jan 2026" title="Dean's List · Fall Semester" />
            <TimelineItem date="Nov 2025" title="Elected Club President" />
            <TimelineItem date="Aug 2025" title="Completed Internship at TechCorp" last />
          </div>
        </div>
      </div>
    </div>
  );
}

const TimelineItem = ({ date, title, last = false }) => (
  <div className="flex gap-4">
    <div className="text-xs font-mono text-neutral-400 w-16 pt-0.5">{date}</div>
    <div className="flex-1">
      <p className="text-sm text-neutral-800">{title}</p>
      {!last && <div className="w-px h-4 bg-neutral-100 mt-1 ml-1.5"></div>}
    </div>
  </div>
);

export default Page;