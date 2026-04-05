import React from "react";
import { Link, useLocation } from "react-router-dom";
import { History, Info } from "lucide-react";
import iconShrimps from "../../assets/icon_shrimp.png";

export const Navbar: React.FC = () => {
  const location = useLocation();

  const navItems = [
    { path: "/", label: "Deteksi Udang", icon: null },
    { path: "/history", label: "History", icon: History },
    { path: "/tentang", label: "Tentang", icon: Info },
  ];

  return (
    <nav className="bg-white shadow-md">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center gap-2">
            {/* Icon custom dari file lokal */}
            <img
              src={iconShrimps}
              alt="Udang Icon"
              className="w-6 h-6 object-contain"
            />
            <span className="font-bold text-xl text-gray-800">udangBio</span>
          </Link>

          <div className="flex gap-6">
            {navItems.map(({ path, label, icon: Icon }) => (
              <Link
                key={path}
                to={path}
                className={`flex items-center gap-1 px-3 py-2 rounded-lg transition-colors ${
                  location.pathname === path
                    ? "text-primary-600 bg-primary-50"
                    : "text-gray-600 hover:text-primary-600 hover:bg-gray-50"
                }`}
              >
                {Icon && <Icon className="w-4 h-4" />}
                <span>{label}</span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
};
