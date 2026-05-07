"use client";

import { useAppStore } from "@/lib/store";
import { promptLibrary, glossary } from "@/lib/mockData";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Copy, Check, Search, ExternalLink } from "lucide-react";

export default function Resources() {
  const { userRole } = useAppStore();
  const router = useRouter();
  
  const [activeTab, setActiveTab] = useState("prompts");
  const [roleFilter, setRoleFilter] = useState("All");
  const [taskFilter, setTaskFilter] = useState("All");
  const [copiedId, setCopiedId] = useState<number | null>(null);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    if (!userRole) {
      router.push("/");
    }
  }, [userRole, router]);

  if (!userRole) return null;

  const handleCopy = (id: number, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const filteredPrompts = promptLibrary.filter((prompt) => {
    return (
      (roleFilter === "All" || prompt.role === roleFilter) &&
      (taskFilter === "All" || prompt.task === taskFilter)
    );
  });

  const filteredGlossary = glossary.filter((item) =>
    item.term.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.definition.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const roles = ["All", ...Array.from(new Set(promptLibrary.map((p) => p.role)))];
  const tasks = ["All", ...Array.from(new Set(promptLibrary.map((p) => p.task)))];

  return (
    <div className="max-w-6xl mx-auto px-4 py-12 w-full">
      <div className="mb-10">
        <h1 className="text-3xl font-bold text-[var(--color-berkeley-blue)] mb-2">
          Resource Hub
        </h1>
        <p className="text-slate-600">
          Tools, references, and guidelines to support your AI journey.
        </p>
      </div>

      <div className="flex space-x-1 mb-8 bg-slate-100 p-1 rounded-lg w-full max-w-2xl">
        {["prompts", "glossary", "policy"].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`flex-1 py-2.5 px-4 rounded-md text-sm font-medium transition-all duration-200 capitalize ${
              activeTab === tab
                ? "bg-white text-[var(--color-berkeley-blue)] shadow-sm"
                : "text-slate-500 hover:text-slate-700"
            }`}
          >
            {tab === "prompts" ? "Prompt Library" : tab}
          </button>
        ))}
      </div>

      {activeTab === "prompts" && (
        <div className="animate-in fade-in slide-in-from-bottom-2 duration-500">
          <div className="flex flex-col sm:flex-row gap-4 mb-8">
            <div className="w-full sm:w-64">
              <label className="block text-sm font-medium text-slate-700 mb-1">Filter by Role</label>
              <select
                value={roleFilter}
                onChange={(e) => setRoleFilter(e.target.value)}
                className="w-full border-slate-300 rounded-lg shadow-sm p-2 bg-white"
              >
                {roles.map((r) => <option key={r} value={r}>{r}</option>)}
              </select>
            </div>
            <div className="w-full sm:w-64">
              <label className="block text-sm font-medium text-slate-700 mb-1">Filter by Task</label>
              <select
                value={taskFilter}
                onChange={(e) => setTaskFilter(e.target.value)}
                className="w-full border-slate-300 rounded-lg shadow-sm p-2 bg-white"
              >
                {tasks.map((t) => <option key={t} value={t}>{t}</option>)}
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredPrompts.map((prompt) => (
              <div key={prompt.id} className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden flex flex-col hover:shadow-md transition">
                <div className="p-5 flex-grow">
                  <div className="flex gap-2 mb-3">
                    <span className="text-xs font-semibold bg-blue-50 text-blue-700 px-2.5 py-1 rounded-full uppercase tracking-wider">{prompt.role}</span>
                    <span className="text-xs font-semibold bg-slate-100 text-slate-600 px-2.5 py-1 rounded-full uppercase tracking-wider">{prompt.task}</span>
                  </div>
                  <h3 className="font-bold text-slate-900 mb-2">{prompt.title}</h3>
                  <div className="bg-slate-50 p-4 rounded-lg font-mono text-sm text-slate-700">
                    "{prompt.text}"
                  </div>
                </div>
                <div className="bg-slate-50 p-3 border-t border-slate-100">
                  <button
                    onClick={() => handleCopy(prompt.id, prompt.text)}
                    className={`w-full flex justify-center items-center gap-2 py-2 rounded-lg text-sm font-medium transition-colors ${
                      copiedId === prompt.id
                        ? "bg-green-100 text-green-700"
                        : "bg-white border border-slate-200 text-slate-600 hover:bg-slate-100"
                    }`}
                  >
                    {copiedId === prompt.id ? (
                      <><Check className="w-4 h-4" /> Copied!</>
                    ) : (
                      <><Copy className="w-4 h-4" /> Copy Prompt</>
                    )}
                  </button>
                </div>
              </div>
            ))}
            {filteredPrompts.length === 0 && (
              <div className="col-span-full py-12 text-center text-slate-500">
                No prompts found for these filters.
              </div>
            )}
          </div>
        </div>
      )}

      {activeTab === "glossary" && (
        <div className="animate-in fade-in slide-in-from-bottom-2 duration-500 max-w-3xl">
          <div className="relative mb-8">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search terms..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-slate-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
            />
          </div>
          <div className="space-y-4">
            {filteredGlossary.map((item, idx) => (
              <div key={idx} className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
                <h3 className="font-bold text-lg text-[var(--color-berkeley-blue)] mb-2">{item.term}</h3>
                <p className="text-slate-700 leading-relaxed">{item.definition}</p>
              </div>
            ))}
            {filteredGlossary.length === 0 && (
              <div className="py-12 text-center text-slate-500">
                No terms found.
              </div>
            )}
          </div>
        </div>
      )}

      {activeTab === "policy" && (
        <div className="animate-in fade-in slide-in-from-bottom-2 duration-500 max-w-3xl">
          <div className="bg-white p-8 rounded-xl shadow-sm border border-slate-200">
            <h2 className="text-xl font-bold text-slate-900 mb-6">UC Berkeley AI Policies</h2>
            <div className="space-y-4">
              <a href="#" className="flex items-center justify-between p-4 rounded-lg border border-slate-200 hover:border-blue-300 hover:bg-blue-50 transition group">
                <div>
                  <h3 className="font-semibold text-[var(--color-berkeley-blue)] group-hover:underline">Campus AI Guidelines</h3>
                  <p className="text-sm text-slate-500 mt-1">Official guidelines for using AI at UC Berkeley.</p>
                </div>
                <ExternalLink className="w-5 h-5 text-slate-400 group-hover:text-blue-500" />
              </a>
              <a href="#" className="flex items-center justify-between p-4 rounded-lg border border-slate-200 hover:border-blue-300 hover:bg-blue-50 transition group">
                <div>
                  <h3 className="font-semibold text-[var(--color-berkeley-blue)] group-hover:underline">Data Privacy & FERPA</h3>
                  <p className="text-sm text-slate-500 mt-1">How AI tools interact with sensitive data.</p>
                </div>
                <ExternalLink className="w-5 h-5 text-slate-400 group-hover:text-blue-500" />
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
