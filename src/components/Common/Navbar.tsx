import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import iconShrimps from "../../assets/icon_shrimp.png";

export const Navbar: React.FC = () => {
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const navItems = [
    { path: "/", label: "Deteksi Udang" },
    { path: "/history", label: "History" },
    { path: "/tentang", label: "Tentang" },
  ];

  // Shadow saat scroll
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Tutup menu saat route berubah
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location.pathname]);

  return (
    <nav
      className={`bg-white sticky top-0 z-50 transition-all duration-300 ${
        scrolled ? "shadow-md" : "shadow-sm border-b border-gray-100"
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* ── Logo ── */}
          <Link to="/" className="flex items-center gap-2 group">
            <div className="w-8 h-8 flex items-center justify-center rounded-lg bg-blue-50 group-hover:bg-blue-100 transition-colors duration-200">
              <img
                src={iconShrimps}
                alt="Udang Icon"
                className="w-5 h-5 object-contain transition-transform duration-300 group-hover:scale-110 group-hover:rotate-6"
              />
            </div>
            <span className="font-bold text-xl text-gray-800 group-hover:text-blue-600 transition-colors duration-200">
              udang<span className="text-blue-600">Bio</span>
            </span>
          </Link>

          {/* ── Desktop Menu ── */}
          <div className="hidden md:flex items-center gap-1">
            {navItems.map(({ path, label }) => {
              const isActive = location.pathname === path;
              return (
                <Link
                  key={path}
                  to={path}
                  className={`relative flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                    isActive
                      ? "text-blue-600 bg-blue-50"
                      : "text-gray-500 hover:text-gray-800 hover:bg-gray-100"
                  }`}
                >
                  {label}
                  {/* Active indicator line */}
                  <span
                    className={`absolute bottom-0 left-1/2 -translate-x-1/2 h-0.5 rounded-full bg-blue-500 transition-all duration-300 ${
                      isActive ? "w-4/5 opacity-100" : "w-0 opacity-0"
                    }`}
                  />
                </Link>
              );
            })}
          </div>

          {/* ── Mobile Hamburger ── */}
          <button
            onClick={() => setIsMenuOpen((prev) => !prev)}
            className="md:hidden relative w-9 h-9 flex items-center justify-center rounded-lg text-gray-600 hover:bg-gray-100 transition-colors duration-200"
            aria-label="Toggle menu"
          >
            {/* Animated hamburger → X */}
            <span
              className={`absolute transition-all duration-300 ${
                isMenuOpen ? "opacity-100 rotate-0" : "opacity-0 rotate-90"
              }`}
            >
              <X className="w-5 h-5" />
            </span>
            <span
              className={`absolute transition-all duration-300 ${
                isMenuOpen ? "opacity-0 -rotate-90" : "opacity-100 rotate-0"
              }`}
            >
              <Menu className="w-5 h-5" />
            </span>
          </button>
        </div>

        {/* ── Mobile Menu Dropdown ── */}
        <div
          className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${
            isMenuOpen ? "max-h-64 opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          <div className="border-t border-gray-100 py-2 space-y-1 pb-3">
            {navItems.map(({ path, label }, i) => {
              const isActive = location.pathname === path;
              return (
                <Link
                  key={path}
                  to={path}
                  style={{
                    transitionDelay: isMenuOpen ? `${i * 60}ms` : "0ms",
                  }}
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl mx-1 transition-all duration-200 ${
                    isActive
                      ? "text-blue-600 bg-blue-50 font-semibold"
                      : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                  } ${
                    isMenuOpen
                      ? "translate-x-0 opacity-100"
                      : "-translate-x-2 opacity-0"
                  }`}
                >
                  <span className="text-base"></span>
                  <span className="text-sm font-medium">{label}</span>
                  {isActive && (
                    <span className="ml-auto w-1.5 h-5 rounded-full bg-blue-500" />
                  )}
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </nav>
  );
};
