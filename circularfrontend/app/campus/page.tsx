"use client"

import React, { useState, useEffect } from 'react'
import { 
  Menu, X, Users, LayoutDashboard, Megaphone, 
  Settings, LogOut, Search, Filter, MoreVertical, 
  ChevronRight, Bell
} from 'lucide-react'
import api from '@/api/api';
import Link from 'next/link';

function Page() {
  const [students, setStudents] = useState([]);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('Dashboard');

  const logoutUser = async () => {
    console.log("Logout triggered");
    try {
      await api.post('/Auth/logout' , {withCredentials: true});
      window.location.replace('/auth/login');
    } catch (error) {
      console.error("Logout Error:", error);
      window.location.replace('/auth/login');
    }
  }

  return (
    <div className="min-h-screen bg-[#f8fafc] text-slate-900 font-sans flex">
      
      {/* --- SIDEBAR --- */}
      <aside className={`
        fixed inset-y-0 left-0 z-50 w-72 bg-white border-r border-slate-200 transform transition-transform duration-300 ease-in-out
        lg:translate-x-0 lg:static lg:inset-0 ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        <div className="flex flex-col h-full">
          {/* Logo Area */}
          <div className="p-8">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center shadow-lg shadow-indigo-200">
                <LayoutDashboard className="text-white" size={24} />
              </div>
              <span className="text-xl font-bold tracking-tight text-slate-800">Circular</span>
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-4 space-y-1">
            <SidebarLink 
              icon={<LayoutDashboard size={20} />} 
              label="Dashboard" 
              active={activeTab === 'Dashboard'} 
              onClick={() => setActiveTab('Dashboard')}
            />
            <Link href={'/campus/students'}>
            <SidebarLink 
              icon={<Users size={20} />} 
              label="Students" 
              active={activeTab === 'Students'} 
              onClick={() => setActiveTab('Students')}
            /></Link>
            <SidebarLink 
              icon={<Megaphone size={20} />} 
              label="Broadcasts" 
              active={activeTab === 'Broadcasts'} 
              onClick={() => setActiveTab('Broadcasts')}
            />
            <SidebarLink 
              icon={<Settings size={20} />} 
              label="Settings" 
              active={activeTab === 'Settings'} 
              onClick={() => setActiveTab('Settings')}
            />
          </nav>

          {/* User Section / Logout */}
          <div className="p-4 border-t border-slate-100">
            <button 
              onClick={logoutUser}
              className="flex items-center gap-3 w-full p-4 rounded-2xl text-slate-500 hover:bg-red-50 hover:text-red-600 transition-all duration-200 group"
            >
              <LogOut size={20} className="group-hover:-translate-x-1 transition-transform" />
              <span className="font-semibold text-sm">Sign Out</span>
            </button>
          </div>
        </div>
      </aside>

      {/* --- MAIN CONTENT --- */}
      <main className="flex-1 flex flex-col min-w-0">
        
        {/* Top Header */}
        <header className="h-20 bg-white/80 backdrop-blur-md border-b border-slate-200 sticky top-0 z-30 px-4 md:px-8 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button 
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="lg:hidden p-2 text-slate-600 hover:bg-slate-100 rounded-lg"
            >
              {isSidebarOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
            <h1 className="text-lg font-semibold text-slate-800 hidden md:block">
              {activeTab}
            </h1>
          </div>

          <div className="flex items-center gap-3 md:gap-6">
            <div className="hidden sm:flex items-center bg-slate-100 rounded-full px-4 py-2 w-64 focus-within:ring-2 ring-indigo-500 transition-all">
              <Search size={18} className="text-slate-400" />
              <input type="text" placeholder="Search..." className="bg-transparent border-none outline-none text-sm px-2 w-full" />
            </div>
            <button className="relative p-2 text-slate-500 hover:bg-slate-100 rounded-full transition-colors">
                <Bell size={22} />
                <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
            </button>
            <div className="w-10 h-10 rounded-full bg-indigo-100 border border-indigo-200 flex items-center justify-center text-indigo-700 font-bold">
              AD
            </div>
          </div>
        </header>

        {/* Content Body */}
        <div className="p-4 md:p-8 max-w-7xl mx-auto w-full">
          
          {/* Welcome Banner */}
          <div className="mb-8 flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <p className="text-indigo-600 font-bold text-sm uppercase tracking-wider mb-1">Overview</p>
              <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">Campus Overview</h2>
              <p className="text-slate-500 mt-1">Managing campus code <span className="text-slate-900 font-mono font-bold px-2 py-1 bg-slate-200 rounded text-xs">4077</span></p>
            </div>
            <div className="flex gap-3">
              <button className="flex items-center gap-2 bg-white border border-slate-200 text-slate-700 px-4 py-2.5 rounded-xl hover:bg-slate-50 transition-all font-semibold shadow-sm text-sm">
                <Filter size={18} />
                Filter
              </button>
              <Link href={'/campus/students'}>
              <button className="bg-indigo-600 text-white px-5 py-2.5 rounded-xl hover:bg-indigo-700 transition-all font-semibold shadow-lg shadow-indigo-100 text-sm">
                Add Student
              </button>
              </Link>
            </div>
          </div>

          {/* Stats Section */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            <StatCard label="Total Students" value="1,284" change="+12.5%" />
            <StatCard label="Active Tokens" value="452" change="-2.1%" />
            <StatCard label="Security Status" value="Secure" color="text-emerald-600" />
          </div>

          {/* Table Card */}
          <div className="bg-white rounded-3xl shadow-sm border border-slate-200 overflow-hidden">
            <div className="px-6 py-5 border-b border-slate-100 flex items-center justify-between">
              <h3 className="font-bold text-slate-800">Recent Registrations</h3>
              <button className="text-indigo-600 text-sm font-bold hover:underline">View All</button>
            </div>
            
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="text-slate-400 text-[11px] uppercase tracking-widest border-b border-slate-100">
                    <th className="px-8 py-4 font-bold">Student Info</th>
                    <th className="px-8 py-4 font-bold">Registration Date</th>
                    <th className="px-8 py-4 font-bold">Status</th>
                    <th className="px-8 py-4 font-bold text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50">
                  <tr className="hover:bg-slate-50/50 transition-colors group">
                    <td className="px-8 py-5">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center font-bold text-slate-500 group-hover:bg-indigo-100 group-hover:text-indigo-600 transition-colors">
                          AS
                        </div>
                        <div>
                          <div className="font-bold text-slate-900">Anya Smith</div>
                          <div className="text-xs text-slate-400">EN22186641</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-8 py-5 text-sm text-slate-600">Oct 24, 2023</td>
                    <td className="px-8 py-5">
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-emerald-50 text-emerald-700 rounded-full text-[11px] font-bold">
                        <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full"></span>
                        Verified
                      </span>
                    </td>
                    <td className="px-8 py-5 text-right">
                      <button className="p-2 hover:bg-slate-100 rounded-lg transition-colors text-slate-400">
                        <MoreVertical size={18} />
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

// Sub-components
const SidebarLink = ({ icon, label, active, onClick }) => (
  <button 
    onClick={onClick}
    className={`
    flex items-center gap-4 w-full px-4 py-3.5 rounded-2xl transition-all duration-200 group
    ${active 
      ? 'bg-indigo-50 text-indigo-600 font-bold shadow-sm ring-1 ring-indigo-100' 
      : 'text-slate-500 hover:bg-slate-50 hover:text-slate-800'}
  `}>
    <span className={`${active ? 'text-indigo-600' : 'text-slate-400 group-hover:text-slate-600'}`}>
      {icon}
    </span>
    <span className="text-sm">{label}</span>
    {active && <ChevronRight size={16} className="ml-auto" />}
  </button>
);

const StatCard = ({ label, value, change, color = "text-slate-900" }) => (
  <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-200 hover:border-indigo-200 transition-all group">
    <div className="flex justify-between items-start mb-4">
      <p className="text-[11px] text-slate-400 uppercase font-extrabold tracking-widest">{label}</p>
      {change && (
        <span className={`text-[10px] font-bold px-2 py-0.5 rounded-md ${change.startsWith('+') ? 'bg-emerald-50 text-emerald-600' : 'bg-red-50 text-red-600'}`}>
          {change}
        </span>
      )}
    </div>
    <h3 className={`text-3xl font-black tracking-tight ${color}`}>{value}</h3>
  </div>
);

export default Page;