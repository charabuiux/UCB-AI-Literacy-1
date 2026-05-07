"use client";

import { useAppStore } from "@/lib/store";
import { modules } from "@/lib/mockData";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import Link from "next/link";
import { CheckCircle, Lock, PlayCircle, Download } from "lucide-react";

export default function Dashboard() {
  const { userRole, completedModules } = useAppStore();
  const router = useRouter();

  useEffect(() => {
    if (!userRole) {
      router.push("/");
    }
  }, [userRole, router]);

  if (!userRole) return null;

  const phase1Modules = modules.filter((m) => m.phase === 1);
  const phase2Modules = modules.filter((m) => m.phase === 2);

  const isPhase1Complete = phase1Modules.every((m) =>
    completedModules.includes(m.id)
  );
  
  const isPhase2Complete = phase2Modules.every((m) =>
    completedModules.includes(m.id)
  );

  const calculateProgress = () => {
    return Math.round((completedModules.length / modules.length) * 100);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-12 w-full">
      <div className="mb-10">
        <h1 className="text-3xl font-bold text-[var(--color-berkeley-blue)] mb-2">
          Your Learning Dashboard
        </h1>
        <p className="text-slate-600">
          Complete the foundational modules before advancing to role-specific skills.
        </p>
      </div>

      {/* Progress Bar */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-100 mb-10">
        <div className="flex justify-between items-end mb-2">
          <div>
            <p className="text-sm font-medium text-slate-500 uppercase tracking-wider mb-1">
              Overall Progress
            </p>
            <p className="text-2xl font-bold text-slate-800">
              {completedModules.length} of {modules.length} Modules
            </p>
          </div>
          <p className="text-xl font-bold text-[var(--color-california-gold)]">
            {calculateProgress()}%
          </p>
        </div>
        <div className="w-full bg-slate-100 rounded-full h-3 mt-4">
          <div
            className="bg-[var(--color-california-gold)] h-3 rounded-full transition-all duration-500"
            style={{ width: `${calculateProgress()}%` }}
          ></div>
        </div>
      </div>

      {/* Phase 1 */}
      <div className="mb-12">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h2 className="text-2xl font-semibold text-slate-800">
              Phase 1: Foundation
            </h2>
            <p className="text-sm text-slate-500">Required for all staff.</p>
          </div>
          {isPhase1Complete && (
            <button className="flex items-center gap-2 text-sm font-medium text-[var(--color-berkeley-blue)] bg-blue-50 px-3 py-1.5 rounded-full hover:bg-blue-100 transition">
              <Download className="w-4 h-4" />
              Certificate
            </button>
          )}
        </div>
        <div className="grid gap-4">
          {phase1Modules.map((module) => {
            const isCompleted = completedModules.includes(module.id);
            return (
              <Link
                key={module.id}
                href={`/module/${module.slug}`}
                className="flex items-center p-5 bg-white rounded-xl shadow-sm border border-slate-100 hover:border-blue-200 hover:shadow-md transition group"
              >
                <div className="flex-shrink-0 mr-4">
                  {isCompleted ? (
                    <CheckCircle className="w-8 h-8 text-green-500" />
                  ) : (
                    <PlayCircle className="w-8 h-8 text-[var(--color-california-gold)] group-hover:text-[var(--color-berkeley-blue)] transition" />
                  )}
                </div>
                <div className="flex-grow">
                  <h3 className="font-semibold text-slate-800 text-lg">
                    {module.title}
                  </h3>
                  <p className="text-sm text-slate-500">{module.estimatedTime}</p>
                </div>
                <div className="text-[var(--color-berkeley-blue)] text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                  {isCompleted ? "Review" : "Start"} &rarr;
                </div>
              </Link>
            );
          })}
        </div>
      </div>

      {/* Phase 2 */}
      <div>
        <div className="flex justify-between items-center mb-6">
          <div>
            <h2 className="text-2xl font-semibold text-slate-800 flex items-center gap-2">
              Phase 2: Skills
              {!isPhase1Complete && <Lock className="w-5 h-5 text-slate-400" />}
            </h2>
            <p className="text-sm text-slate-500">
              {isPhase1Complete
                ? "Role-specific prompt engineering and workflows."
                : "Complete Phase 1 to unlock these modules."}
            </p>
          </div>
          {isPhase2Complete && (
            <button className="flex items-center gap-2 text-sm font-medium text-[var(--color-berkeley-blue)] bg-blue-50 px-3 py-1.5 rounded-full hover:bg-blue-100 transition">
              <Download className="w-4 h-4" />
              Certificate
            </button>
          )}
        </div>
        <div className="grid gap-4">
          {phase2Modules.map((module) => {
            const isCompleted = completedModules.includes(module.id);
            const content = (
              <div
                className={`flex items-center p-5 rounded-xl border transition ${
                  isPhase1Complete
                    ? "bg-white shadow-sm border-slate-100 hover:border-blue-200 hover:shadow-md group cursor-pointer"
                    : "bg-slate-50 border-slate-200 opacity-60 cursor-not-allowed"
                }`}
              >
                <div className="flex-shrink-0 mr-4">
                  {isCompleted ? (
                    <CheckCircle className="w-8 h-8 text-green-500" />
                  ) : isPhase1Complete ? (
                    <PlayCircle className="w-8 h-8 text-[var(--color-california-gold)] group-hover:text-[var(--color-berkeley-blue)] transition" />
                  ) : (
                    <Lock className="w-8 h-8 text-slate-400" />
                  )}
                </div>
                <div className="flex-grow">
                  <h3 className="font-semibold text-slate-800 text-lg">
                    {module.title}
                  </h3>
                  <p className="text-sm text-slate-500">{module.estimatedTime}</p>
                </div>
                {isPhase1Complete && (
                  <div className="text-[var(--color-berkeley-blue)] text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                    {isCompleted ? "Review" : "Start"} &rarr;
                  </div>
                )}
              </div>
            );

            return isPhase1Complete ? (
              <Link key={module.id} href={`/module/${module.slug}`}>
                {content}
              </Link>
            ) : (
              <div key={module.id}>{content}</div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
