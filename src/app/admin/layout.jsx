// "use client";

// import DashboardTopbar from "@/components/layout/DashboardTopbar";
// import StudentSidebar from "@/components/layout/StudentSidebar";
// import { useState } from "react";

// export default function StudentLayout({ children }) {
//   const [mobileOpen, setMobileOpen] = useState(false);

//   return (
//     <div className="flex h-screen overflow-hidden bg-gray-100">
//       {/* DESKTOP SIDEBAR */}
//       <StudentSidebar variant="desktop" />

//       {/* MAIN AREA */}
//       <div className="flex min-w-0 flex-1 flex-col">
//         {/* TOPBAR */}
//         <DashboardTopbar onMenuClick={() => setMobileOpen(true)} />

//         {/* CONTENT */}
//         <main className="flex-1 overflow-y-auto p-4 md:p-6">{children}</main>
//       </div>

//       {/* MOBILE SIDEBAR OVERLAY */}
//       {mobileOpen && (
//         <>
//           <div
//             className="fixed inset-0 z-40 bg-black/40 md:hidden"
//             onClick={() => setMobileOpen(false)}
//           />

//           <div className="fixed left-0 top-0 z-50 h-full w-72 bg-white shadow-xl md:hidden">
//             <StudentSidebar
//               variant="mobile"
//               onClose={() => setMobileOpen(false)}
//             />
//           </div>
//         </>
//       )}
//     </div>
//   );
// }

"use client";
import ProtectedRoute from "@/components/auth/ProtectedRoute";
import DashboardTopbar from "@/components/layout/DashboardTopbar";
import AdminSidebar from "@/components/layout/AdminSidebar";
import { useState } from "react";

export default function AdmintLayout({ children }) {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <ProtectedRoute allowedRoles={["admin"]}>
      <div className="flex h-screen overflow-hidden bg-gray-100">
        {/* DESKTOP SIDEBAR */}
        <AdminSidebar variant="desktop" />

        {/* MAIN AREA */}
        <div className="flex min-w-0 flex-1 flex-col">
          {/* TOPBAR */}
          <DashboardTopbar onMenuClick={() => setMobileOpen(true)} />

          {/* CONTENT */}
          <main className="flex-1 overflow-y-auto p-4 md:p-6">{children}</main>
        </div>

        {/* MOBILE SIDEBAR OVERLAY */}
        {mobileOpen && (
          <>
            <div
              className="fixed inset-0 z-40 bg-black/40 md:hidden"
              onClick={() => setMobileOpen(false)}
            />

            <div className="fixed left-0 top-0 z-50 h-full w-72 bg-white shadow-xl md:hidden">
              <AdminSidebar
                variant="mobile"
                onClose={() => setMobileOpen(false)}
              />
            </div>
          </>
        )}
      </div>
    </ProtectedRoute>
  );
}
