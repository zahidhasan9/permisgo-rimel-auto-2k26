// import DashboardTopbar from "@/components/layout/DashboardTopbar";
// import StudentSidebar from "@/components/layout/StudentSidebar";

// export default function StudentLayout({ children }) {
//   return (
//     <div className="flex h-screen bg-gray-100">
//       {/* Desktop Sidebar ONLY */}
//       <div className="hidden md:block">
//         <StudentSidebar />
//       </div>

//       {/* Main Area */}
//       <div className="flex flex-col flex-1">
//         <DashboardTopbar />

//         <main className="flex-1 overflow-y-auto p-4 md:p-6">{children}</main>
//       </div>
//     </div>
//   );
// }

"use client";

import DashboardTopbar from "@/components/layout/DashboardTopbar";
import StudentSidebar from "@/components/layout/StudentSidebar";
import { useState } from "react";

export default function StudentLayout({ children }) {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="flex h-screen bg-gray-100">
      {/* DESKTOP SIDEBAR */}
      <div className="hidden md:block">
        <StudentSidebar />
      </div>

      {/* MAIN AREA */}
      <div className="flex flex-col flex-1">
        {/* TOPBAR */}
        <DashboardTopbar onMenuClick={() => setMobileOpen(true)} />

        {/* CONTENT */}
        <main className="flex-1 overflow-y-auto p-4 md:p-6">{children}</main>

        {/* MOBILE SIDEBAR OVERLAY */}
        {mobileOpen && (
          <>
            {/* BACKDROP */}
            <div
              className="fixed inset-0 bg-black/40 z-40 md:hidden"
              onClick={() => setMobileOpen(false)}
            />

            {/* DRAWER */}
            <div className="fixed left-0 top-0 h-full w-72 bg-white z-50 md:hidden">
              <StudentSidebar setMobileOpen={setMobileOpen} />
            </div>
          </>
        )}
      </div>
    </div>
  );
}
