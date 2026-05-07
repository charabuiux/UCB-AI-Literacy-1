"use client";

import { useAppStore, Role } from "@/lib/store";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Home() {
  const { login, userRole } = useAppStore();
  const router = useRouter();

  // If already logged in, redirect to dashboard
  useEffect(() => {
    if (userRole) {
      router.push("/dashboard");
    }
  }, [userRole, router]);

  const handleLogin = (role: Role) => {
    login(role);
    router.push("/dashboard");
  };

  if (userRole) return null; // Avoid flicker during redirect

  return (
    <div className="flex flex-col items-center justify-center flex-grow bg-slate-50 px-4">
      <div className="max-w-md w-full bg-white p-8 rounded-xl shadow-lg border border-slate-100">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-[var(--color-berkeley-blue)] mb-2">
            CalNet SSO Simulated Login
          </h1>
          <p className="text-sm text-slate-500">
            For MVP testing purposes only. Select a role to proceed.
          </p>
        </div>

        <div className="space-y-4">
          <button
            onClick={() => handleLogin("learner")}
            className="w-full py-3 px-4 bg-[var(--color-berkeley-blue)] text-white rounded-lg font-medium hover:bg-[var(--color-berkeley-blue-hover)] transition-colors shadow-sm"
          >
            Login as Learner
          </button>
          
          <button
            onClick={() => handleLogin("admin")}
            className="w-full py-3 px-4 bg-white border border-[var(--color-berkeley-blue)] text-[var(--color-berkeley-blue)] rounded-lg font-medium hover:bg-slate-50 transition-colors shadow-sm"
          >
            Login as Admin
          </button>
        </div>

        <div className="mt-8 text-center text-xs text-slate-400">
          By logging in, you agree to the UC Berkeley Acceptable Use Policy.
        </div>
      </div>
    </div>
  );
}
