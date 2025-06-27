import React from "react";
import UserSideBar from "@/components/profile/UserSideBar";

export default function ProfileLayout({ children }) {
  return (
    <div className="pt-16 flex flex-col md:flex-row w-full min-h-full">
      {/* Sidebar */}
      <aside className="w-full md:w-64 border-r bg-white p-4 md:sticky md:top-20 md:h-[calc(100vh-5rem)] overflow-y-auto">
        <UserSideBar />
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-4 bg-gray-50">
        {children}
      </main>
    </div>
  );
}
