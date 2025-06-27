'use client';
import { useClerk } from "@clerk/nextjs";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  FiUser,
  FiShoppingBag,
  FiCheckCircle,
  FiXCircle,
  FiHeart,
  FiMapPin,
  FiPlus,
  FiSettings,
  FiLogOut,
  FiChevronDown,
  FiChevronRight,
} from "react-icons/fi";
import { useState } from "react";

const UserSideBar = () => {
  const pathname = usePathname();
  const isActive = (href) => pathname === href;
const { signOut } = useClerk();
  const [expanded, setExpanded] = useState({
    orders: false,
    addresses: false,
  });

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-bold">Account</h2>

      {/* Profile */}
      <Link
        href="/profile"
        className={`flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium ${
          isActive("/profile") ? "bg-blue-100 text-blue-600" : "text-gray-700 hover:bg-gray-100"
        }`}
      >
        <FiUser />
        My Profile
      </Link>

      {/* Orders */}
      <div>
        <button
          onClick={() => setExpanded(prev => ({ ...prev, orders: !prev.orders }))}
          className="flex items-center justify-between w-full text-sm font-semibold text-gray-600 px-3 py-2 hover:bg-gray-100 rounded-md"
        >
          <span className="flex items-center gap-2">
            <FiShoppingBag />
            Orders
          </span>
          {expanded.orders ? <FiChevronDown /> : <FiChevronRight />}
        </button>
        {expanded.orders && (
          <div className="ml-6 mt-1 space-y-1">
            <Link href="/profile/orders" className={`flex items-center gap-2 px-2 py-1 rounded-md text-sm ${
              isActive("/profile/orders") ? "text-blue-600" : "text-gray-700 hover:text-blue-500"
            }`}>
              All Orders
            </Link>
            <Link href="/profile/orders/completed" className={`flex items-center gap-2 px-2 py-1 rounded-md text-sm ${
              isActive("/profile/orders/completed") ? "text-blue-600" : "text-gray-700 hover:text-blue-500"
            }`}>
              Completed
            </Link>
            <Link href="/profile/orders/cancelled" className={`flex items-center gap-2 px-2 py-1 rounded-md text-sm ${
              isActive("/profile/orders/cancelled") ? "text-blue-600" : "text-gray-700 hover:text-blue-500"
            }`}>
              Cancelled
            </Link>
          </div>
        )}
      </div>

      {/* Addresses */}
      <div>
        <button
          onClick={() => setExpanded(prev => ({ ...prev, addresses: !prev.addresses }))}
          className="flex items-center justify-between w-full text-sm font-semibold text-gray-600 px-3 py-2 hover:bg-gray-100 rounded-md"
        >
          <span className="flex items-center gap-2">
            <FiMapPin />
           Manage Addresses
          </span>
          {expanded.addresses ? <FiChevronDown /> : <FiChevronRight />}
        </button>
        {expanded.addresses && (
          <div className="ml-6 mt-1 space-y-1">
            <Link href="/profile/addresses" className={`flex items-center gap-2 px-2 py-1 rounded-md text-sm ${
              isActive("/profile/addresses") ? "text-blue-600" : "text-gray-700 hover:text-blue-500"
            }`}>
              My Addresses
            </Link>
          </div>
        )}
      </div>

      {/* Wishlist */}
      <Link
        href="/profile/wishlist"
        className={`flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium ${
          isActive("/profile/wishlist") ? "bg-blue-100 text-blue-600" : "text-gray-700 hover:bg-gray-100"
        }`}
      >
        <FiHeart />
        Wishlist
      </Link>

      {/* Settings */}
      <Link
        href="/profile/settings"
        className={`flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium ${
          isActive("/profile/settings") ? "bg-blue-100 text-blue-600" : "text-gray-700 hover:bg-gray-100"
        }`}
      >
        <FiSettings />
        Settings
      </Link>

      {/* Logout */}
     <button
  onClick={() => signOut(() => window.location.href = "/")}
  className="flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium text-red-600 hover:bg-red-50 w-full text-left"
>
  <FiLogOut />
  Logout
</button>
    </div>
  );
};

export default UserSideBar;
