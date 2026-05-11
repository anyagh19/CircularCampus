'use client'

import React, { useState } from 'react';
import { 
  Search, 
  UserPlus, 
  MoreVertical, 
  Filter, 
  GraduationCap, 
  Mail, 
  ChevronRight 
} from 'lucide-react';
import Link from 'next/link';

const page = () => {
  const [searchTerm, setSearchTerm] = useState('');

  // Mock Data - Representing a typical API response structure
  const students = [
    { id: 1, name: "Arjun Mehta", email: "arjun@university.edu", major: "Computer Science", year: "Senior", status: "Active" },
    { id: 2, name: "Sarah Chen", email: "schen@university.edu", major: "Data Science", year: "Junior", status: "On Leave" },
    { id: 3, name: "Marcus Wright", email: "mwright@university.edu", major: "AI & ML", year: "Freshman", status: "Active" },
  ];

  return (
    <div className="min-h-screen bg-slate-50/50 p-4 md:p-8">
      {/* Header Section */}
      <div className="max-w-7xl mx-auto space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Student Directory</h1>
            <p className="text-slate-500 text-sm">Manage and monitor student enrollments across all departments.</p>
          </div>
          
          <Link href={"/campus/students/add"}>
            <button className="inline-flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2.5 rounded-lg font-medium transition-all shadow-sm shadow-indigo-200">
              <UserPlus size={18} />
              Add Student
            </button>
          </Link>
        </div>

        {/* Action Bar: Search and Filters */}
        <div className="bg-white border border-slate-200 p-3 rounded-xl flex flex-col md:flex-row gap-3 items-center shadow-sm">
          <div className="relative w-full md:flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <input 
              type="text"
              placeholder="Search by name, email or department..."
              className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <button className="flex items-center gap-2 px-4 py-2 text-slate-600 border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors w-full md:w-auto">
            <Filter size={18} />
            Filters
          </button>
        </div>

        {/* Students Table */}
        <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50 border-bottom border-slate-200">
                  <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Student</th>
                  <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Major</th>
                  <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Academic Year</th>
                  <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider"></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {students.map((student) => (
                  <tr key={student.id} className="hover:bg-slate-50/80 transition-colors group">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="h-10 w-10 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center font-bold">
                          {student.name.charAt(0)}
                        </div>
                        <div>
                          <div className="font-medium text-slate-900">{student.name}</div>
                          <div className="text-xs text-slate-500 flex items-center gap-1">
                            <Mail size={12} /> {student.email}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2 text-slate-600 text-sm">
                        <GraduationCap size={16} className="text-slate-400" />
                        {student.major}
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-slate-600">{student.year}</td>
                    <td className="px-6 py-4">
                      <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${
                        student.status === 'Active' 
                        ? 'bg-emerald-50 text-emerald-700 border border-emerald-100' 
                        : 'bg-amber-50 text-amber-700 border border-amber-100'
                      }`}>
                        {student.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <button className="p-1 hover:bg-slate-200 rounded text-slate-400 transition-colors">
                        <MoreVertical size={18} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          {/* Pagination Footer */}
          <div className="px-6 py-4 bg-slate-50 border-t border-slate-200 flex items-center justify-between">
            <span className="text-sm text-slate-500">Showing 3 of 48 students</span>
            <div className="flex gap-2">
              <button className="px-3 py-1 text-sm border border-slate-300 rounded bg-white hover:bg-slate-50 disabled:opacity-50">Previous</button>
              <button className="px-3 py-1 text-sm border border-slate-300 rounded bg-white hover:bg-slate-50">Next</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;