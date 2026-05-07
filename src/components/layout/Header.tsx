"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAppStore } from "@/lib/store";
import { LogOut, BookOpen, LayoutDashboard, Settings, User } from "lucide-react";

export default function Header() {
  const { userRole, logout } = useAppStore();
  const pathname = usePathname();

  if (!userRole && pathname !== "/") return null;

  return (
    <header className="bg-[var(--color-berkeley-blue)] text-white sticky top-0 z-50 shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center gap-2">
            <Link href={userRole ? "/dashboard" : "/"} className="flex items-center gap-2">
              <span className="font-bold text-xl tracking-tight text-[var(--color-california-gold)]">UC BERKELEY</span>
              <span className="text-sm font-medium border-l border-white/30 pl-2 ml-1 hidden sm:block">
                AI Literacy Training
              </span>
            </Link>
          </div>

          {userRole && (
            <nav className="hidden md:flex space-x-8">
              <Link
                href="/dashboard"
                className={`flex items-center gap-1.5 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  pathname.startsWith("/dashboard")
                    ? "bg-white/10 text-[var(--color-california-gold)]"
                    : "hover:bg-white/5 hover:text-gray-200"
                }`}
              >
                <LayoutDashboard className="w-4 h-4" />
                Dashboard
              </Link>
              <Link
                href="/resources"
                className={`flex items-center gap-1.5 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  pathname.startsWith("/resources")
                    ? "bg-white/10 text-[var(--color-california-gold)]"
                    : "hover:bg-white/5 hover:text-gray-200"
                }`}
              >
                <BookOpen className="w-4 h-4" />
                Resources
              </Link>
              {userRole === "admin" && (
                <Link
                  href="/admin"
                  className={`flex items-center gap-1.5 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    pathname.startsWith("/admin")
                      ? "bg-white/10 text-[var(--color-california-gold)]"
                      : "hover:bg-white/5 hover:text-gray-200"
                  }`}
                >
                  <Settings className="w-4 h-4" />
                  Admin
                </Link>
              )}
            </nav>
          )}

          {userRole && (
            <div className="flex items-center gap-4">
              <div className="hidden sm:flex items-center gap-2 text-sm text-gray-300">
                <User className="w-4 h-4" />
                <span className="capitalize">{userRole}</span>
              </div>
              <button
                onClick={() => {
                  logout();
                  window.location.href = "/";
                }}
                className="flex items-center gap-1.5 text-sm font-medium text-white/80 hover:text-white transition-colors"
              >
                <LogOut className="w-4 h-4" />
                <span className="hidden sm:inline">Logout</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
