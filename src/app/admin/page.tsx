"use client";

import { useAppStore } from "@/lib/store";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { Users, BookOpen, GraduationCap, Download } from "lucide-react";

const mockCompletionData = [
  { dept: "HR / People Ops", total: 45, phase1: 38, phase2: 20 },
  { dept: "Finance & Budget", total: 32, phase1: 30, phase2: 15 },
  { dept: "Comms & Marketing", total: 28, phase1: 25, phase2: 22 },
  { dept: "Academic Support", total: 60, phase1: 50, phase2: 10 },
  { dept: "IT & Operations", total: 55, phase1: 55, phase2: 45 },
];

export default function AdminDashboard() {
  const { userRole } = useAppStore();
  const router = useRouter();

  useEffect(() => {
    if (userRole !== "admin") {
      router.push("/dashboard");
    }
  }, [userRole, router]);

  if (userRole !== "admin") return null;

  return (
    <div className="max-w-6xl mx-auto px-4 py-12 w-full">
      <div className="flex justify-between items-end mb-10">
        <div>
          <h1 className="text-3xl font-bold text-[var(--color-berkeley-blue)] mb-2">
            Admin Dashboard
          </h1>
          <p className="text-slate-600">
            Overview of AI Literacy Training completion across departments.
          </p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-[var(--color-berkeley-blue)] text-white rounded-lg text-sm font-medium hover:bg-[var(--color-berkeley-blue-hover)] transition shadow-sm">
          <Download className="w-4 h-4" />
          Export CSV
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-blue-50 text-blue-600 rounded-lg">
              <Users className="w-6 h-6" />
            </div>
            <div>
              <p className="text-sm font-medium text-slate-500">Total Enrolled</p>
              <p className="text-2xl font-bold text-slate-900">220</p>
            </div>
          </div>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-amber-50 text-amber-600 rounded-lg">
              <BookOpen className="w-6 h-6" />
            </div>
            <div>
              <p className="text-sm font-medium text-slate-500">Phase 1 Completions</p>
              <p className="text-2xl font-bold text-slate-900">198</p>
            </div>
          </div>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-green-50 text-green-600 rounded-lg">
              <GraduationCap className="w-6 h-6" />
            </div>
            <div>
              <p className="text-sm font-medium text-slate-500">Phase 2 Completions</p>
              <p className="text-2xl font-bold text-slate-900">112</p>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="px-6 py-4 border-b border-slate-200 bg-slate-50">
          <h2 className="font-semibold text-slate-800">Department Breakdown</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="text-xs text-slate-500 uppercase bg-white border-b border-slate-100">
              <tr>
                <th className="px-6 py-4 font-medium">Department</th>
                <th className="px-6 py-4 font-medium">Enrolled Staff</th>
                <th className="px-6 py-4 font-medium">Phase 1 Complete</th>
                <th className="px-6 py-4 font-medium">Phase 2 Complete</th>
                <th className="px-6 py-4 font-medium">Completion Rate</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-sm">
              {mockCompletionData.map((row, idx) => {
                const completionRate = Math.round((row.phase2 / row.total) * 100);
                return (
                  <tr key={idx} className="hover:bg-slate-50 transition-colors">
                    <td className="px-6 py-4 font-medium text-slate-800">{row.dept}</td>
                    <td className="px-6 py-4 text-slate-600">{row.total}</td>
                    <td className="px-6 py-4 text-slate-600">{row.phase1}</td>
                    <td className="px-6 py-4 text-slate-600">{row.phase2}</td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <span className="text-slate-700 font-medium w-8">{completionRate}%</span>
                        <div className="w-24 bg-slate-200 rounded-full h-2 flex-shrink-0">
                          <div
                            className="bg-[var(--color-california-gold)] h-2 rounded-full"
                            style={{ width: `${completionRate}%` }}
                          />
                        </div>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
