"use client";

import Link from "next/link";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useSelector, useDispatch } from "react-redux";

import { Menu, X, Globe } from "lucide-react";
import { RootState, AppDispatch } from "@/redux/store";
import { logout } from "@/redux/features/auth/authSlice";

export function Header() {
  const { t, i18n } = useTranslation();
  const dispatch = useDispatch<AppDispatch>();
  const { isAuthenticated, user } = useSelector(
    (state: RootState) => state.cmAuth
  );
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLogout = () => {
    dispatch(logout()); // ✅ clear user from state
    // Optional: redirect to home
    window.location.href = "/";
  };

  return (
    <header className="sticky top-0 z-50 bg-background border-b border-border">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-lg">
                C
              </span>
            </div>
            <span className="font-serif font-bold text-xl hidden sm:inline">
              CourseMaster
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            <Link
              href="/"
              className="text-sm font-medium hover:text-primary transition"
            >
              {t("nav.home")}
            </Link>
            <Link
              href="/courses"
              className="text-sm font-medium hover:text-primary transition"
            >
              {t("nav.courses")}
            </Link>
            {isAuthenticated && (
              <>
                <Link
                  href="/dashboard"
                  className="text-sm font-medium hover:text-primary transition"
                >
                  {t("nav.dashboard")}
                </Link>
                {user?.role === "admin" && (
                  <Link
                    href="/admin"
                    className="text-sm font-medium hover:text-primary transition"
                  >
                    {t("nav.admin")}
                  </Link>
                )}
              </>
            )}
          </nav>

          {/* Right Section */}
          <div className="flex items-center gap-4">
            {isAuthenticated ? (
              <div className="flex items-center gap-4">
                <span className="hidden sm:inline text-sm text-muted-foreground">
                  {user?.name}
                </span>
                <button
                  onClick={handleLogout} // ✅ use button instead of Link
                  className="px-4 py-2 bg-destructive text-destructive-foreground rounded-lg text-sm font-medium hover:opacity-90 transition"
                >
                  {t("nav.logout")}
                </button>
              </div>
            ) : (
              <div className="hidden md:flex items-center gap-3">
                <Link
                  href="/login"
                  className="px-4 py-2 text-sm font-medium hover:bg-muted rounded-lg transition"
                >
                  {t("nav.login")}
                </Link>
                <Link
                  href="/signup"
                  className="px-4 py-2 bg-primary text-primary-foreground rounded-lg text-sm font-medium hover:opacity-90 transition"
                >
                  {t("nav.signup")}
                </Link>
              </div>
            )}

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 hover:bg-muted rounded-lg"
            >
              {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <nav className="md:hidden pb-4 space-y-2">
            <Link href="/" className="block px-4 py-2 hover:bg-muted rounded-lg">
              {t("nav.home")}
            </Link>
            <Link href="/courses" className="block px-4 py-2 hover:bg-muted rounded-lg">
              {t("nav.courses")}
            </Link>
            {isAuthenticated && (
              <>
                <Link
                  href="/dashboard"
                  className="block px-4 py-2 hover:bg-muted rounded-lg"
                >
                  {t("nav.dashboard")}
                </Link>
                {user?.role === "admin" && (
                  <Link
                    href="/admin"
                    className="block px-4 py-2 hover:bg-muted rounded-lg"
                  >
                    {t("nav.admin")}
                  </Link>
                )}
                <button
                  onClick={handleLogout}
                  className="block w-full text-left px-4 py-2 bg-destructive text-white rounded-lg hover:opacity-90 transition"
                >
                  {t("nav.logout")}
                </button>
              </>
            )}
            {!isAuthenticated && (
              <div className="flex gap-2 pt-2">
                <Link
                  href="/login"
                  className="flex-1 px-4 py-2 text-center hover:bg-muted rounded-lg"
                >
                  {t("nav.login")}
                </Link>
                <Link
                  href="/signup"
                  className="flex-1 px-4 py-2 bg-primary text-primary-foreground text-center rounded-lg"
                >
                  {t("nav.signup")}
                </Link>
              </div>
            )}
          </nav>
        )}
      </div>
    </header>
  );
}
