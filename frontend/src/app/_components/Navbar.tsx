"use client";
import Image from "next/image";
import { useContext, useState } from "react";
import { AuthContext } from "../_context/AuthProvider";
import { auth } from "@/firebaseAuth";
import { useEffect, useRef } from "react";
import skyLogo from "../../../public/sky-logo.svg";
import LoginModal from "./LoginModal";

import Link from "next/link";

export default function Navbar() {
  const { isSignedIn, user } = useContext(AuthContext);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [showLoginModal, setShowLoginModal] = useState(false);

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const logout = () => {
    auth.signOut().then(() => {
      console.log("Signed out");
      setDropdownOpen(false);
    });
  };

  useEffect(() => {
    const handleClickOutside = (event: any) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropdownRef]);

  return (
    <nav className="flex justify-between items-center h-32">
      {/* Logo */}
      <Link href="/">
        <Image src={skyLogo} width={80} alt="Sky logo" priority />
      </Link>

      {/* Links */}
      {isSignedIn === undefined ? null : isSignedIn && user ? (
        <div className="relative" ref={dropdownRef}>
          <button onClick={toggleDropdown}>
            {user.photoURL ? (
              <img
                src={user.photoURL}
                className="rounded-full w-14"
                alt="User profile photo"
              />
            ) : (
              <span className="rounded-full bg-skyBlue text-offWhite capitalize text-center w-14 h-14 flex items-center justify-center font-bold">
                {user.displayName?.charAt(0)}
              </span>
            )}
          </button>
          {dropdownOpen && (
            <div className="absolute z-50 right-0 mt-2 w-64 p-2 bg-white border rounded-md shadow-lg divide-y divide-gray-100">
              <div className="px-4 py-3">
                <h3 className="text-sm text-gray-800 font-bold">
                  {user.displayName}
                </h3>
                <p className="text-sm text-gray-600">{user.email}</p>
              </div>
              <div>
                <button
                  onClick={logout}
                  className="flex w-full px-4 py-2 text-sm text-left text-gray-800 hover:bg-gray-100 hover:text-gray-900"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    className="w-4 h-4 mr-2 mt-0.5"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17 16l4-4m0 0l-4-4m4 4H7"
                    />
                  </svg>
                  Sign Out
                </button>
              </div>
            </div>
          )}
        </div>
      ) : (
        <div>
          <button
            className="bg-skyBlue rounded-md py-2 px-4 text-offWhite font-bold"
            onClick={() => setShowLoginModal(true)}
          >
            Sign in
          </button>
        </div>
      )}

      <LoginModal
        isOpen={showLoginModal}
        onClose={() => setShowLoginModal(false)}
      />
    </nav>
  );
}
