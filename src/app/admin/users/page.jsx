// "use client";

// import { useCallback, useEffect, useMemo, useState } from "react";
// import {
//   FaSearch,
//   FaUsers,
//   FaUserCheck,
//   FaUserSlash,
//   FaUserShield,
//   FaTrashAlt,
//   FaSyncAlt,
// } from "react-icons/fa";
// import {
//   deleteAdminUser,
//   getAdminUsers,
//   updateUserRole,
//   updateUserStatus,
// } from "@/features/API";

// const roleOptions = ["all", "student", "teacher", "admin"];
// const statusOptions = ["all", "active", "inactive", "blocked"];

// const roleBadgeClass = {
//   admin: "bg-purple-100 text-purple-700 border-purple-200",
//   teacher: "bg-blue-100 text-blue-700 border-blue-200",
//   student: "bg-emerald-100 text-emerald-700 border-emerald-200",
// };

// const statusBadgeClass = {
//   active: "bg-emerald-100 text-emerald-700 border-emerald-200",
//   inactive: "bg-amber-100 text-amber-700 border-amber-200",
//   blocked: "bg-red-100 text-red-700 border-red-200",
// };

// function getMessage(error) {
//   return (
//     error?.response?.data?.message ||
//     error?.message ||
//     "Something went wrong. Please try again."
//   );
// }

// function getInitials(name = "User") {
//   return name
//     .split(" ")
//     .map((part) => part?.[0])
//     .join("")
//     .slice(0, 2)
//     .toUpperCase();
// }

// function formatDate(date) {
//   if (!date) return "N/A";
//   return new Date(date).toLocaleDateString("en-GB", {
//     day: "2-digit",
//     month: "short",
//     year: "numeric",
//   });
// }

// export default function AdminUsersPage() {
//   const [users, setUsers] = useState([]);
//   const [meta, setMeta] = useState({
//     page: 1,
//     limit: 20,
//     total: 0,
//     totalPages: 1,
//   });

//   const [filters, setFilters] = useState({
//     search: "",
//     role: "all",
//     status: "all",
//   });

//   const [loading, setLoading] = useState(true);
//   const [actionId, setActionId] = useState("");
//   const [error, setError] = useState("");

//   const fetchUsers = useCallback(
//     async (page = 1) => {
//       try {
//         setLoading(true);
//         setError("");

//         const params = {
//           page,
//           limit: meta.limit || 20,
//         };

//         if (filters.search.trim()) params.search = filters.search.trim();
//         if (filters.role !== "all") params.role = filters.role;
//         if (filters.status !== "all") params.status = filters.status;

//         const response = await getAdminUsers(params);

//         const responseUsers = Array.isArray(response?.data?.data)
//           ? response.data.data
//           : [];

//         const responseMeta = response?.data?.meta || {};

//         setUsers(responseUsers);
//         setMeta({
//           page: responseMeta.page || page,
//           limit: responseMeta.limit || 20,
//           total: responseMeta.total || responseUsers.length,
//           totalPages: responseMeta.totalPages || 1,
//         });
//       } catch (err) {
//         setError(getMessage(err));
//       } finally {
//         setLoading(false);
//       }
//     },
//     [filters, meta.limit],
//   );

//   useEffect(() => {
//     const timer = setTimeout(() => {
//       fetchUsers(1);
//     }, 300);

//     return () => clearTimeout(timer);
//   }, [fetchUsers]);

//   const stats = useMemo(() => {
//     return {
//       total: meta.total || users.length,
//       active: users.filter((user) => user.status === "active").length,
//       blocked: users.filter((user) => user.status === "blocked").length,
//       admins: users.filter((user) => user.role === "admin").length,
//     };
//   }, [users, meta.total]);

//   const handleFilterChange = (field, value) => {
//     setFilters((prev) => ({
//       ...prev,
//       [field]: value,
//     }));
//   };

//   const resetFilters = () => {
//     setFilters({
//       search: "",
//       role: "all",
//       status: "all",
//     });
//   };

//   const handleStatusChange = async (userId, status) => {
//     try {
//       setActionId(userId);
//       setError("");

//       const response = await updateUserStatus(userId, status);
//       const updatedUser = response?.data?.data;

//       setUsers((prev) =>
//         prev.map((user) =>
//           user._id === userId
//             ? { ...user, status: updatedUser?.status || status }
//             : user,
//         ),
//       );
//     } catch (err) {
//       setError(getMessage(err));
//     } finally {
//       setActionId("");
//     }
//   };

//   const handleRoleChange = async (userId, role) => {
//     try {
//       setActionId(userId);
//       setError("");

//       const response = await updateUserRole(userId, role);
//       const updatedUser = response?.data?.data;

//       setUsers((prev) =>
//         prev.map((user) =>
//           user._id === userId
//             ? { ...user, role: updatedUser?.role || role }
//             : user,
//         ),
//       );
//     } catch (err) {
//       setError(getMessage(err));
//     } finally {
//       setActionId("");
//     }
//   };

//   const handleDeleteUser = async (userId, userName) => {
//     const confirmed = window.confirm(
//       `Are you sure you want to delete ${userName || "this user"}?`,
//     );

//     if (!confirmed) return;

//     try {
//       setActionId(userId);
//       setError("");

//       await deleteAdminUser(userId);

//       setUsers((prev) => prev.filter((user) => user._id !== userId));
//       setMeta((prev) => ({
//         ...prev,
//         total: Math.max((prev.total || 1) - 1, 0),
//       }));
//     } catch (err) {
//       setError(getMessage(err));
//     } finally {
//       setActionId("");
//     }
//   };

//   const StatCard = ({ icon: Icon, title, value, note }) => (
//     <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
//       <div className="flex items-center justify-between gap-4">
//         <div>
//           <p className="text-sm font-medium text-slate-500">{title}</p>
//           <h3 className="mt-2 text-3xl font-bold text-slate-900">{value}</h3>
//           <p className="mt-1 text-xs text-slate-400">{note}</p>
//         </div>
//         <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-slate-100 text-slate-700">
//           <Icon />
//         </div>
//       </div>
//     </div>
//   );

//   return (
//     <section className="min-h-screen bg-slate-50 p-4 md:p-6">
//       <div className="mx-auto max-w-7xl">
//         <div className="mb-6 flex flex-col justify-between gap-4 rounded-2xl bg-gradient-to-r from-slate-900 to-slate-700 p-6 text-white shadow-sm md:flex-row md:items-center">
//           <div>
//             <p className="text-sm font-medium uppercase tracking-wide text-slate-300">
//               Admin Panel
//             </p>
//             <h1 className="mt-1 text-2xl font-bold md:text-3xl">
//               User Management
//             </h1>
//             <p className="mt-2 max-w-2xl text-sm text-slate-300">
//               Manage students, teachers and admins from one clean dashboard.
//             </p>
//           </div>

//           <button
//             onClick={() => fetchUsers(meta.page || 1)}
//             disabled={loading}
//             className="inline-flex items-center justify-center gap-2 rounded-xl bg-white px-4 py-3 text-sm font-semibold text-slate-900 shadow-sm transition hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-70"
//           >
//             <FaSyncAlt className={loading ? "animate-spin" : ""} />
//             Refresh
//           </button>
//         </div>

//         <div className="mb-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
//           <StatCard
//             icon={FaUsers}
//             title="Total Users"
//             value={stats.total}
//             note="All registered users"
//           />
//           <StatCard
//             icon={FaUserCheck}
//             title="Active"
//             value={stats.active}
//             note="Currently active accounts"
//           />
//           <StatCard
//             icon={FaUserSlash}
//             title="Blocked"
//             value={stats.blocked}
//             note="Restricted accounts"
//           />
//           <StatCard
//             icon={FaUserShield}
//             title="Admins"
//             value={stats.admins}
//             note="Admin role users"
//           />
//         </div>

//         <div className="mb-6 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
//           <div className="grid gap-4 lg:grid-cols-[1fr_180px_180px_auto]">
//             <div className="relative">
//               <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
//               <input
//                 type="text"
//                 value={filters.search}
//                 onChange={(e) => handleFilterChange("search", e.target.value)}
//                 placeholder="Search by name, email or phone..."
//                 className="w-full rounded-xl border border-slate-200 bg-slate-50 py-3 pl-11 pr-4 text-sm text-slate-800 outline-none transition focus:border-slate-400 focus:bg-white"
//               />
//             </div>

//             <select
//               value={filters.role}
//               onChange={(e) => handleFilterChange("role", e.target.value)}
//               className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-medium text-slate-700 outline-none transition focus:border-slate-400 focus:bg-white"
//             >
//               {roleOptions.map((role) => (
//                 <option key={role} value={role}>
//                   {role === "all" ? "All Roles" : role}
//                 </option>
//               ))}
//             </select>

//             <select
//               value={filters.status}
//               onChange={(e) => handleFilterChange("status", e.target.value)}
//               className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-medium text-slate-700 outline-none transition focus:border-slate-400 focus:bg-white"
//             >
//               {statusOptions.map((status) => (
//                 <option key={status} value={status}>
//                   {status === "all" ? "All Status" : status}
//                 </option>
//               ))}
//             </select>

//             <button
//               onClick={resetFilters}
//               className="rounded-xl border border-slate-200 px-4 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
//             >
//               Reset
//             </button>
//           </div>
//         </div>

//         {error && (
//           <div className="mb-6 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-700">
//             {error}
//           </div>
//         )}

//         <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
//           <div className="flex items-center justify-between border-b border-slate-200 px-5 py-4">
//             <div>
//               <h2 className="text-lg font-bold text-slate-900">All Users</h2>
//               <p className="text-sm text-slate-500">
//                 Showing {users.length} of {meta.total || users.length} users
//               </p>
//             </div>
//           </div>

//           {loading ? (
//             <div className="flex min-h-[320px] items-center justify-center">
//               <div className="text-center">
//                 <FaSyncAlt className="mx-auto mb-3 animate-spin text-2xl text-slate-500" />
//                 <p className="text-sm font-medium text-slate-500">
//                   Loading users...
//                 </p>
//               </div>
//             </div>
//           ) : users.length === 0 ? (
//             <div className="flex min-h-[320px] items-center justify-center p-6 text-center">
//               <div>
//                 <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-slate-100 text-slate-500">
//                   <FaUsers />
//                 </div>
//                 <h3 className="text-lg font-bold text-slate-900">
//                   No users found
//                 </h3>
//                 <p className="mt-1 text-sm text-slate-500">
//                   Try changing your search or filters.
//                 </p>
//               </div>
//             </div>
//           ) : (
//             <>
//               <div className="hidden overflow-x-auto lg:block">
//                 <table className="w-full min-w-[900px] text-left">
//                   <thead className="bg-slate-50">
//                     <tr>
//                       <th className="px-5 py-4 text-xs font-bold uppercase tracking-wide text-slate-500">
//                         User
//                       </th>
//                       <th className="px-5 py-4 text-xs font-bold uppercase tracking-wide text-slate-500">
//                         Phone
//                       </th>
//                       <th className="px-5 py-4 text-xs font-bold uppercase tracking-wide text-slate-500">
//                         Role
//                       </th>
//                       <th className="px-5 py-4 text-xs font-bold uppercase tracking-wide text-slate-500">
//                         Status
//                       </th>
//                       <th className="px-5 py-4 text-xs font-bold uppercase tracking-wide text-slate-500">
//                         Joined
//                       </th>
//                       <th className="px-5 py-4 text-right text-xs font-bold uppercase tracking-wide text-slate-500">
//                         Action
//                       </th>
//                     </tr>
//                   </thead>

//                   <tbody className="divide-y divide-slate-100">
//                     {users.map((user) => (
//                       <tr
//                         key={user._id}
//                         className="transition hover:bg-slate-50/80"
//                       >
//                         <td className="px-5 py-4">
//                           <div className="flex items-center gap-3">
//                             <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-slate-900 text-sm font-bold text-white">
//                               {getInitials(user.name)}
//                             </div>
//                             <div>
//                               <p className="font-semibold text-slate-900">
//                                 {user.name || "Unnamed User"}
//                               </p>
//                               <p className="text-sm text-slate-500">
//                                 {user.email || "No email"}
//                               </p>
//                             </div>
//                           </div>
//                         </td>

//                         <td className="px-5 py-4 text-sm text-slate-600">
//                           {user.phone || "N/A"}
//                         </td>

//                         <td className="px-5 py-4">
//                           <div className="flex items-center gap-2">
//                             <span
//                               className={`rounded-full border px-3 py-1 text-xs font-bold capitalize ${
//                                 roleBadgeClass[user.role] ||
//                                 "border-slate-200 bg-slate-100 text-slate-700"
//                               }`}
//                             >
//                               {user.role}
//                             </span>

//                             <select
//                               value={user.role}
//                               disabled={actionId === user._id}
//                               onChange={(e) =>
//                                 handleRoleChange(user._id, e.target.value)
//                               }
//                               className="rounded-lg border border-slate-200 bg-white px-2 py-1 text-xs font-semibold text-slate-700 outline-none disabled:opacity-60"
//                             >
//                               {allowedRoleSelectOptions().map((role) => (
//                                 <option key={role} value={role}>
//                                   {role}
//                                 </option>
//                               ))}
//                             </select>
//                           </div>
//                         </td>

//                         <td className="px-5 py-4">
//                           <div className="flex items-center gap-2">
//                             <span
//                               className={`rounded-full border px-3 py-1 text-xs font-bold capitalize ${
//                                 statusBadgeClass[user.status] ||
//                                 "border-slate-200 bg-slate-100 text-slate-700"
//                               }`}
//                             >
//                               {user.status}
//                             </span>

//                             <select
//                               value={user.status}
//                               disabled={actionId === user._id}
//                               onChange={(e) =>
//                                 handleStatusChange(user._id, e.target.value)
//                               }
//                               className="rounded-lg border border-slate-200 bg-white px-2 py-1 text-xs font-semibold text-slate-700 outline-none disabled:opacity-60"
//                             >
//                               {allowedStatusSelectOptions().map((status) => (
//                                 <option key={status} value={status}>
//                                   {status}
//                                 </option>
//                               ))}
//                             </select>
//                           </div>
//                         </td>

//                         <td className="px-5 py-4 text-sm text-slate-600">
//                           {formatDate(user.createdAt)}
//                         </td>

//                         <td className="px-5 py-4 text-right">
//                           <button
//                             onClick={() =>
//                               handleDeleteUser(user._id, user.name)
//                             }
//                             disabled={actionId === user._id}
//                             className="inline-flex items-center justify-center gap-2 rounded-lg border border-red-200 px-3 py-2 text-xs font-bold text-red-600 transition hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-60"
//                           >
//                             <FaTrashAlt />
//                             Delete
//                           </button>
//                         </td>
//                       </tr>
//                     ))}
//                   </tbody>
//                 </table>
//               </div>

//               <div className="grid gap-4 p-4 lg:hidden">
//                 {users.map((user) => (
//                   <div
//                     key={user._id}
//                     className="rounded-2xl border border-slate-200 bg-white p-4"
//                   >
//                     <div className="flex items-start gap-3">
//                       <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-slate-900 text-sm font-bold text-white">
//                         {getInitials(user.name)}
//                       </div>

//                       <div className="min-w-0 flex-1">
//                         <h3 className="font-bold text-slate-900">
//                           {user.name || "Unnamed User"}
//                         </h3>
//                         <p className="break-all text-sm text-slate-500">
//                           {user.email || "No email"}
//                         </p>
//                         <p className="mt-1 text-sm text-slate-500">
//                           Phone: {user.phone || "N/A"}
//                         </p>
//                       </div>
//                     </div>

//                     <div className="mt-4 grid gap-3 sm:grid-cols-2">
//                       <label className="text-xs font-bold uppercase text-slate-500">
//                         Role
//                         <select
//                           value={user.role}
//                           disabled={actionId === user._id}
//                           onChange={(e) =>
//                             handleRoleChange(user._id, e.target.value)
//                           }
//                           className="mt-1 w-full rounded-xl border border-slate-200 px-3 py-2 text-sm font-semibold capitalize text-slate-700 outline-none"
//                         >
//                           {allowedRoleSelectOptions().map((role) => (
//                             <option key={role} value={role}>
//                               {role}
//                             </option>
//                           ))}
//                         </select>
//                       </label>

//                       <label className="text-xs font-bold uppercase text-slate-500">
//                         Status
//                         <select
//                           value={user.status}
//                           disabled={actionId === user._id}
//                           onChange={(e) =>
//                             handleStatusChange(user._id, e.target.value)
//                           }
//                           className="mt-1 w-full rounded-xl border border-slate-200 px-3 py-2 text-sm font-semibold capitalize text-slate-700 outline-none"
//                         >
//                           {allowedStatusSelectOptions().map((status) => (
//                             <option key={status} value={status}>
//                               {status}
//                             </option>
//                           ))}
//                         </select>
//                       </label>
//                     </div>

//                     <div className="mt-4 flex items-center justify-between border-t border-slate-100 pt-4">
//                       <p className="text-xs text-slate-500">
//                         Joined: {formatDate(user.createdAt)}
//                       </p>

//                       <button
//                         onClick={() => handleDeleteUser(user._id, user.name)}
//                         disabled={actionId === user._id}
//                         className="inline-flex items-center gap-2 rounded-lg border border-red-200 px-3 py-2 text-xs font-bold text-red-600 hover:bg-red-50 disabled:opacity-60"
//                       >
//                         <FaTrashAlt />
//                         Delete
//                       </button>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             </>
//           )}

//           {!loading && users.length > 0 && (
//             <div className="flex flex-col items-center justify-between gap-3 border-t border-slate-200 px-5 py-4 sm:flex-row">
//               <p className="text-sm text-slate-500">
//                 Page {meta.page} of {meta.totalPages}
//               </p>

//               <div className="flex gap-2">
//                 <button
//                   onClick={() => fetchUsers(Math.max(meta.page - 1, 1))}
//                   disabled={meta.page <= 1}
//                   className="rounded-lg border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-50"
//                 >
//                   Previous
//                 </button>

//                 <button
//                   onClick={() =>
//                     fetchUsers(Math.min(meta.page + 1, meta.totalPages))
//                   }
//                   disabled={meta.page >= meta.totalPages}
//                   className="rounded-lg border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-50"
//                 >
//                   Next
//                 </button>
//               </div>
//             </div>
//           )}
//         </div>
//       </div>
//     </section>
//   );
// }

// function allowedRoleSelectOptions() {
//   return ["student", "teacher", "admin"];
// }

// function allowedStatusSelectOptions() {
//   return ["active", "inactive", "blocked"];
// }

"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import {
  FaSearch,
  FaUsers,
  FaUserCheck,
  FaUserSlash,
  FaUserShield,
  FaTrashAlt,
  FaSyncAlt,
  FaFilter,
  FaChevronLeft,
  FaChevronRight,
  FaEnvelope,
  FaPhoneAlt,
  FaCalendarAlt,
  FaTimes,
  FaExclamationTriangle,
} from "react-icons/fa";
import {
  deleteAdminUser,
  getAdminUsers,
  updateUserRole,
  updateUserStatus,
} from "@/features/API";

const roleOptions = ["all", "student", "teacher", "admin"];
const statusOptions = ["all", "active", "inactive", "blocked"];

const roleBadgeClass = {
  admin: "bg-violet-50 text-violet-700 border-violet-200",
  teacher: "bg-sky-50 text-sky-700 border-sky-200",
  student: "bg-emerald-50 text-emerald-700 border-emerald-200",
};

const statusBadgeClass = {
  active: "bg-emerald-50 text-emerald-700 border-emerald-200",
  inactive: "bg-amber-50 text-amber-700 border-amber-200",
  blocked: "bg-rose-50 text-rose-700 border-rose-200",
};

function getMessage(error) {
  return (
    error?.response?.data?.message ||
    error?.message ||
    "Something went wrong. Please try again."
  );
}

function getInitials(name = "User") {
  return name
    .split(" ")
    .map((part) => part?.[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

function formatDate(date) {
  if (!date) return "N/A";
  return new Date(date).toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

function allowedRoleSelectOptions() {
  return ["student", "teacher", "admin"];
}

function allowedStatusSelectOptions() {
  return ["active", "inactive", "blocked"];
}

export default function AdminUsersPage() {
  const [users, setUsers] = useState([]);
  const [meta, setMeta] = useState({
    page: 1,
    limit: 20,
    total: 0,
    totalPages: 1,
  });

  const [filters, setFilters] = useState({
    search: "",
    role: "all",
    status: "all",
  });

  const [loading, setLoading] = useState(true);
  const [actionId, setActionId] = useState("");
  const [error, setError] = useState("");
  const [toast, setToast] = useState("");
  const [deleteTarget, setDeleteTarget] = useState(null);

  const fetchUsers = useCallback(
    async (page = 1) => {
      try {
        setLoading(true);
        setError("");

        const params = {
          page,
          limit: meta.limit || 20,
        };

        if (filters.search.trim()) params.search = filters.search.trim();
        if (filters.role !== "all") params.role = filters.role;
        if (filters.status !== "all") params.status = filters.status;

        const response = await getAdminUsers(params);

        const responseUsers = Array.isArray(response?.data?.data)
          ? response.data.data
          : [];

        const responseMeta = response?.data?.meta || {};

        setUsers(responseUsers);
        setMeta({
          page: responseMeta.page || page,
          limit: responseMeta.limit || 20,
          total: responseMeta.total || responseUsers.length,
          totalPages: responseMeta.totalPages || 1,
        });
      } catch (err) {
        setError(getMessage(err));
      } finally {
        setLoading(false);
      }
    },
    [filters, meta.limit],
  );

  useEffect(() => {
    const timer = setTimeout(() => {
      fetchUsers(1);
    }, 350);

    return () => clearTimeout(timer);
  }, [fetchUsers]);

  useEffect(() => {
    if (!toast) return;

    const timer = setTimeout(() => {
      setToast("");
    }, 2500);

    return () => clearTimeout(timer);
  }, [toast]);

  const stats = useMemo(() => {
    return {
      total: meta.total || users.length,
      active: users.filter((user) => user.status === "active").length,
      blocked: users.filter((user) => user.status === "blocked").length,
      admins: users.filter((user) => user.role === "admin").length,
    };
  }, [users, meta.total]);

  const activeFilterCount = useMemo(() => {
    let count = 0;
    if (filters.search.trim()) count += 1;
    if (filters.role !== "all") count += 1;
    if (filters.status !== "all") count += 1;
    return count;
  }, [filters]);

  const handleFilterChange = (field, value) => {
    setFilters((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const resetFilters = () => {
    setFilters({
      search: "",
      role: "all",
      status: "all",
    });
  };

  const handleStatusChange = async (userId, status) => {
    try {
      setActionId(userId);
      setError("");

      const response = await updateUserStatus(userId, status);
      const updatedUser = response?.data?.data;

      setUsers((prev) =>
        prev.map((user) =>
          user._id === userId
            ? { ...user, status: updatedUser?.status || status }
            : user,
        ),
      );

      setToast("User status updated successfully.");
    } catch (err) {
      setError(getMessage(err));
    } finally {
      setActionId("");
    }
  };

  const handleRoleChange = async (userId, role) => {
    try {
      setActionId(userId);
      setError("");

      const response = await updateUserRole(userId, role);
      const updatedUser = response?.data?.data;

      setUsers((prev) =>
        prev.map((user) =>
          user._id === userId
            ? { ...user, role: updatedUser?.role || role }
            : user,
        ),
      );

      setToast("User role updated successfully.");
    } catch (err) {
      setError(getMessage(err));
    } finally {
      setActionId("");
    }
  };

  const handleDeleteUser = async () => {
    if (!deleteTarget?._id) return;

    try {
      setActionId(deleteTarget._id);
      setError("");

      await deleteAdminUser(deleteTarget._id);

      setUsers((prev) => prev.filter((user) => user._id !== deleteTarget._id));
      setMeta((prev) => ({
        ...prev,
        total: Math.max((prev.total || 1) - 1, 0),
      }));

      setToast("User deleted successfully.");
      setDeleteTarget(null);
    } catch (err) {
      setError(getMessage(err));
    } finally {
      setActionId("");
    }
  };

  const StatCard = ({ icon: Icon, title, value, note, accent }) => (
    <div className="group rounded-[1.4rem] border border-slate-200 bg-white p-5 shadow-[0_10px_30px_rgba(15,23,42,0.04)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_18px_45px_rgba(15,23,42,0.08)]">
      <div className="flex items-center justify-between gap-5">
        <div>
          <p className="text-sm font-semibold text-slate-500">{title}</p>
          <h3 className="mt-2 text-3xl font-bold tracking-tight text-slate-900">
            {value}
          </h3>
          <p className="mt-1 text-xs font-medium text-slate-400">{note}</p>
        </div>

        <div
          className={`flex h-13 w-13 items-center justify-center rounded-2xl ${accent}`}
        >
          <Icon className="text-lg" />
        </div>
      </div>
    </div>
  );

  return (
    <section className="min-h-screen bg-[#f8f8fb] px-4 py-5 md:px-6 lg:px-8">
      <div className="mx-auto max-w-[1500px]">
        {toast && (
          <div className="fixed right-5 top-5 z-50 rounded-2xl border border-emerald-200 bg-white px-5 py-3 text-sm font-semibold text-emerald-700 shadow-xl">
            {toast}
          </div>
        )}

        <div className="mb-6 flex flex-col justify-between gap-4 lg:flex-row lg:items-center">
          <div>
            <div className="mb-2 flex items-center gap-2 text-sm font-semibold text-slate-400">
              <span>Admin</span>
              <span>/</span>
              <span className="text-slate-600">User Management</span>
            </div>

            <h1 className="text-2xl font-bold tracking-tight text-slate-900 md:text-3xl">
              User Management
            </h1>

            <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-500">
              Manage students, teachers and admin users with quick filters,
              smart actions and a clean responsive table.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <div className="rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-600 shadow-sm">
              Total Records:
              <span className="ml-2 text-slate-950">{meta.total || 0}</span>
            </div>

            <button
              onClick={() => fetchUsers(meta.page || 1)}
              disabled={loading}
              className="inline-flex items-center justify-center gap-2 rounded-2xl bg-slate-900 px-5 py-3 text-sm font-bold text-white shadow-sm transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-70"
            >
              <FaSyncAlt className={loading ? "animate-spin" : ""} />
              Refresh
            </button>
          </div>
        </div>

        <div className="mb-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          <StatCard
            icon={FaUsers}
            title="Total Users"
            value={stats.total}
            note="All registered accounts"
            accent="bg-violet-50 text-violet-600"
          />

          <StatCard
            icon={FaUserCheck}
            title="Active Users"
            value={stats.active}
            note="Current page active users"
            accent="bg-emerald-50 text-emerald-600"
          />

          <StatCard
            icon={FaUserSlash}
            title="Blocked Users"
            value={stats.blocked}
            note="Current page blocked users"
            accent="bg-rose-50 text-rose-600"
          />

          <StatCard
            icon={FaUserShield}
            title="Admins"
            value={stats.admins}
            note="Current page admin users"
            accent="bg-sky-50 text-sky-600"
          />
        </div>

        <div className="mb-6 rounded-[1.4rem] border border-slate-200 bg-white p-4 shadow-[0_10px_30px_rgba(15,23,42,0.04)]">
          <div className="mb-4 flex items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-slate-100 text-slate-600">
                <FaFilter />
              </div>

              <div>
                <h2 className="text-base font-bold text-slate-900">
                  Filter Users
                </h2>
                <p className="text-xs font-medium text-slate-400">
                  {activeFilterCount > 0
                    ? `${activeFilterCount} filter active`
                    : "Search and filter user records"}
                </p>
              </div>
            </div>

            <button
              onClick={resetFilters}
              className="rounded-xl border border-slate-200 px-4 py-2 text-xs font-bold text-slate-600 transition hover:bg-slate-50"
            >
              Clear Filters
            </button>
          </div>

          <div className="grid gap-4 lg:grid-cols-[1fr_180px_180px]">
            <div className="relative">
              <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                value={filters.search}
                onChange={(e) => handleFilterChange("search", e.target.value)}
                placeholder="Search by name, email or phone..."
                className="h-12 w-full rounded-2xl border border-slate-200 bg-[#f8f8fb] pl-11 pr-4 text-sm font-medium text-slate-700 outline-none transition placeholder:text-slate-400 focus:border-violet-300 focus:bg-white focus:ring-4 focus:ring-violet-50"
              />
            </div>

            <select
              value={filters.role}
              onChange={(e) => handleFilterChange("role", e.target.value)}
              className="h-12 rounded-2xl border border-slate-200 bg-[#f8f8fb] px-4 text-sm font-bold capitalize text-slate-700 outline-none transition focus:border-violet-300 focus:bg-white focus:ring-4 focus:ring-violet-50"
            >
              {roleOptions.map((role) => (
                <option key={role} value={role}>
                  {role === "all" ? "All Roles" : role}
                </option>
              ))}
            </select>

            <select
              value={filters.status}
              onChange={(e) => handleFilterChange("status", e.target.value)}
              className="h-12 rounded-2xl border border-slate-200 bg-[#f8f8fb] px-4 text-sm font-bold capitalize text-slate-700 outline-none transition focus:border-violet-300 focus:bg-white focus:ring-4 focus:ring-violet-50"
            >
              {statusOptions.map((status) => (
                <option key={status} value={status}>
                  {status === "all" ? "All Status" : status}
                </option>
              ))}
            </select>
          </div>
        </div>

        {error && (
          <div className="mb-6 flex items-start gap-3 rounded-2xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm font-semibold text-rose-700">
            <FaExclamationTriangle className="mt-0.5 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        <div className="overflow-hidden rounded-[1.4rem] border border-slate-200 bg-white shadow-[0_10px_30px_rgba(15,23,42,0.04)]">
          <div className="flex flex-col justify-between gap-3 border-b border-slate-100 px-5 py-5 md:flex-row md:items-center">
            <div>
              <h2 className="text-lg font-bold text-slate-900">All Users</h2>
              <p className="mt-1 text-sm font-medium text-slate-400">
                Showing {users.length} of {meta.total || users.length} users
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <span className="rounded-full bg-violet-50 px-3 py-1.5 text-xs font-bold text-violet-700">
                Page {meta.page}
              </span>
              <span className="rounded-full bg-slate-100 px-3 py-1.5 text-xs font-bold text-slate-600">
                {meta.totalPages} pages
              </span>
            </div>
          </div>

          {loading ? (
            <div className="flex min-h-[360px] items-center justify-center">
              <div className="text-center">
                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-slate-100 text-slate-500">
                  <FaSyncAlt className="animate-spin text-2xl" />
                </div>
                <p className="text-sm font-bold text-slate-600">
                  Loading users...
                </p>
              </div>
            </div>
          ) : users.length === 0 ? (
            <div className="flex min-h-[360px] items-center justify-center p-6 text-center">
              <div>
                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-slate-100 text-slate-500">
                  <FaUsers className="text-2xl" />
                </div>
                <h3 className="text-lg font-bold text-slate-900">
                  No users found
                </h3>
                <p className="mt-2 text-sm font-medium text-slate-400">
                  Try changing your search keyword or filter options.
                </p>
              </div>
            </div>
          ) : (
            <>
              <div className="hidden overflow-x-auto xl:block">
                <table className="w-full min-w-[1050px] text-left">
                  <thead>
                    <tr className="border-b border-slate-100 bg-[#fbfbfd]">
                      <th className="px-5 py-4 text-xs font-bold uppercase tracking-wide text-slate-400">
                        User
                      </th>
                      <th className="px-5 py-4 text-xs font-bold uppercase tracking-wide text-slate-400">
                        Contact
                      </th>
                      <th className="px-5 py-4 text-xs font-bold uppercase tracking-wide text-slate-400">
                        Role
                      </th>
                      <th className="px-5 py-4 text-xs font-bold uppercase tracking-wide text-slate-400">
                        Status
                      </th>
                      <th className="px-5 py-4 text-xs font-bold uppercase tracking-wide text-slate-400">
                        Joined
                      </th>
                      <th className="px-5 py-4 text-right text-xs font-bold uppercase tracking-wide text-slate-400">
                        Action
                      </th>
                    </tr>
                  </thead>

                  <tbody className="divide-y divide-slate-100">
                    {users.map((user) => (
                      <tr
                        key={user._id}
                        className="transition duration-200 hover:bg-[#fbfbfd]"
                      >
                        <td className="px-5 py-4">
                          <div className="flex items-center gap-3">
                            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-violet-600 to-slate-900 text-sm font-bold text-white shadow-sm">
                              {getInitials(user.name)}
                            </div>

                            <div className="min-w-0">
                              <p className="truncate font-bold text-slate-900">
                                {user.name || "Unnamed User"}
                              </p>
                              <p className="mt-1 truncate text-xs font-medium capitalize text-slate-400">
                                {user.role || "No role"}
                              </p>
                            </div>
                          </div>
                        </td>

                        <td className="px-5 py-4">
                          <div className="space-y-1">
                            <p className="flex items-center gap-2 text-sm font-semibold text-slate-600">
                              <FaEnvelope className="text-slate-300" />
                              <span className="max-w-[220px] truncate">
                                {user.email || "No email"}
                              </span>
                            </p>

                            <p className="flex items-center gap-2 text-xs font-medium text-slate-400">
                              <FaPhoneAlt className="text-slate-300" />
                              {user.phone || "No phone"}
                            </p>
                          </div>
                        </td>

                        <td className="px-5 py-4">
                          <div className="flex flex-col gap-2">
                            <span
                              className={`w-fit rounded-full border px-3 py-1 text-xs font-bold capitalize ${
                                roleBadgeClass[user.role] ||
                                "border-slate-200 bg-slate-50 text-slate-600"
                              }`}
                            >
                              {user.role || "N/A"}
                            </span>

                            <select
                              value={user.role || "student"}
                              disabled={actionId === user._id}
                              onChange={(e) =>
                                handleRoleChange(user._id, e.target.value)
                              }
                              className="h-9 w-32 rounded-xl border border-slate-200 bg-white px-3 text-xs font-bold capitalize text-slate-600 outline-none transition focus:border-violet-300 focus:ring-4 focus:ring-violet-50 disabled:opacity-60"
                            >
                              {allowedRoleSelectOptions().map((role) => (
                                <option key={role} value={role}>
                                  {role}
                                </option>
                              ))}
                            </select>
                          </div>
                        </td>

                        <td className="px-5 py-4">
                          <div className="flex flex-col gap-2">
                            <span
                              className={`w-fit rounded-full border px-3 py-1 text-xs font-bold capitalize ${
                                statusBadgeClass[user.status] ||
                                "border-slate-200 bg-slate-50 text-slate-600"
                              }`}
                            >
                              {user.status || "N/A"}
                            </span>

                            <select
                              value={user.status || "active"}
                              disabled={actionId === user._id}
                              onChange={(e) =>
                                handleStatusChange(user._id, e.target.value)
                              }
                              className="h-9 w-32 rounded-xl border border-slate-200 bg-white px-3 text-xs font-bold capitalize text-slate-600 outline-none transition focus:border-violet-300 focus:ring-4 focus:ring-violet-50 disabled:opacity-60"
                            >
                              {allowedStatusSelectOptions().map((status) => (
                                <option key={status} value={status}>
                                  {status}
                                </option>
                              ))}
                            </select>
                          </div>
                        </td>

                        <td className="px-5 py-4">
                          <p className="flex items-center gap-2 text-sm font-semibold text-slate-600">
                            <FaCalendarAlt className="text-slate-300" />
                            {formatDate(user.createdAt)}
                          </p>
                        </td>

                        <td className="px-5 py-4 text-right">
                          <button
                            onClick={() => setDeleteTarget(user)}
                            disabled={actionId === user._id}
                            className="inline-flex items-center justify-center gap-2 rounded-xl border border-rose-200 bg-white px-3 py-2 text-xs font-bold text-rose-600 transition hover:bg-rose-50 disabled:cursor-not-allowed disabled:opacity-60"
                          >
                            <FaTrashAlt />
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="grid gap-4 p-4 xl:hidden">
                {users.map((user) => (
                  <div
                    key={user._id}
                    className="rounded-[1.3rem] border border-slate-200 bg-white p-4 shadow-sm"
                  >
                    <div className="flex items-start gap-3">
                      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-violet-600 to-slate-900 text-sm font-bold text-white">
                        {getInitials(user.name)}
                      </div>

                      <div className="min-w-0 flex-1">
                        <h3 className="font-bold text-slate-900">
                          {user.name || "Unnamed User"}
                        </h3>

                        <p className="mt-1 flex items-center gap-2 break-all text-sm font-medium text-slate-500">
                          <FaEnvelope className="shrink-0 text-slate-300" />
                          {user.email || "No email"}
                        </p>

                        <p className="mt-1 flex items-center gap-2 text-sm font-medium text-slate-500">
                          <FaPhoneAlt className="shrink-0 text-slate-300" />
                          {user.phone || "No phone"}
                        </p>
                      </div>
                    </div>

                    <div className="mt-4 grid gap-3 sm:grid-cols-2">
                      <label className="text-xs font-bold uppercase text-slate-400">
                        Role
                        <select
                          value={user.role || "student"}
                          disabled={actionId === user._id}
                          onChange={(e) =>
                            handleRoleChange(user._id, e.target.value)
                          }
                          className="mt-1 h-11 w-full rounded-2xl border border-slate-200 bg-[#f8f8fb] px-3 text-sm font-bold capitalize text-slate-700 outline-none focus:border-violet-300 focus:bg-white focus:ring-4 focus:ring-violet-50 disabled:opacity-60"
                        >
                          {allowedRoleSelectOptions().map((role) => (
                            <option key={role} value={role}>
                              {role}
                            </option>
                          ))}
                        </select>
                      </label>

                      <label className="text-xs font-bold uppercase text-slate-400">
                        Status
                        <select
                          value={user.status || "active"}
                          disabled={actionId === user._id}
                          onChange={(e) =>
                            handleStatusChange(user._id, e.target.value)
                          }
                          className="mt-1 h-11 w-full rounded-2xl border border-slate-200 bg-[#f8f8fb] px-3 text-sm font-bold capitalize text-slate-700 outline-none focus:border-violet-300 focus:bg-white focus:ring-4 focus:ring-violet-50 disabled:opacity-60"
                        >
                          {allowedStatusSelectOptions().map((status) => (
                            <option key={status} value={status}>
                              {status}
                            </option>
                          ))}
                        </select>
                      </label>
                    </div>

                    <div className="mt-4 flex items-center justify-between gap-3 border-t border-slate-100 pt-4">
                      <p className="flex items-center gap-2 text-xs font-semibold text-slate-400">
                        <FaCalendarAlt />
                        {formatDate(user.createdAt)}
                      </p>

                      <button
                        onClick={() => setDeleteTarget(user)}
                        disabled={actionId === user._id}
                        className="inline-flex items-center gap-2 rounded-xl border border-rose-200 px-3 py-2 text-xs font-bold text-rose-600 hover:bg-rose-50 disabled:opacity-60"
                      >
                        <FaTrashAlt />
                        Delete
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}

          {!loading && users.length > 0 && (
            <div className="flex flex-col items-center justify-between gap-3 border-t border-slate-100 px-5 py-4 sm:flex-row">
              <p className="text-sm font-semibold text-slate-400">
                Page <span className="text-slate-800">{meta.page}</span> of{" "}
                <span className="text-slate-800">{meta.totalPages}</span>
              </p>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => fetchUsers(Math.max(meta.page - 1, 1))}
                  disabled={meta.page <= 1}
                  className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-bold text-slate-600 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  <FaChevronLeft className="text-xs" />
                  Previous
                </button>

                <button
                  onClick={() =>
                    fetchUsers(Math.min(meta.page + 1, meta.totalPages))
                  }
                  disabled={meta.page >= meta.totalPages}
                  className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-bold text-slate-600 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  Next
                  <FaChevronRight className="text-xs" />
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {deleteTarget && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/50 px-4 backdrop-blur-sm">
          <div className="w-full max-w-md rounded-[1.4rem] bg-white p-6 shadow-2xl">
            <div className="mb-5 flex items-start justify-between gap-4">
              <div className="flex gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-rose-50 text-rose-600">
                  <FaTrashAlt />
                </div>

                <div>
                  <h3 className="text-lg font-bold text-slate-900">
                    Delete User
                  </h3>
                  <p className="mt-1 text-sm leading-6 text-slate-500">
                    Are you sure you want to delete{" "}
                    <span className="font-bold text-slate-800">
                      {deleteTarget.name || "this user"}
                    </span>
                    ? This action cannot be undone.
                  </p>
                </div>
              </div>

              <button
                onClick={() => setDeleteTarget(null)}
                className="rounded-full p-2 text-slate-400 transition hover:bg-slate-100 hover:text-slate-700"
              >
                <FaTimes />
              </button>
            </div>

            <div className="flex justify-end gap-3">
              <button
                onClick={() => setDeleteTarget(null)}
                className="rounded-xl border border-slate-200 px-4 py-2.5 text-sm font-bold text-slate-600 transition hover:bg-slate-50"
              >
                Cancel
              </button>

              <button
                onClick={handleDeleteUser}
                disabled={actionId === deleteTarget._id}
                className="inline-flex items-center gap-2 rounded-xl bg-rose-600 px-4 py-2.5 text-sm font-bold text-white transition hover:bg-rose-700 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {actionId === deleteTarget._id ? (
                  <FaSyncAlt className="animate-spin" />
                ) : (
                  <FaTrashAlt />
                )}
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
