// // "use client";

// // import { useEffect, useMemo, useState } from "react";
// // import Link from "next/link";
// // import {
// //   FaArrowRight,
// //   FaBookOpen,
// //   FaCar,
// //   FaCheckCircle,
// //   FaClock,
// //   FaCreditCard,
// //   FaExclamationTriangle,
// //   FaHeadset,
// //   FaSyncAlt,
// //   FaUserGraduate,
// //   FaUsers,
// //   FaUserTie,
// // } from "react-icons/fa";
// // import { MdDashboard, MdOutlineQuiz } from "react-icons/md";
// // import {
// //   getAdminDashboard,
// //   getAdminUsers,
// //   getBookings,
// //   getPayments,
// //   getQuizzes,
// //   getSupportTickets,
// // } from "@/features/API";

// // const defaultStats = {
// //   students: 0,
// //   teachers: 0,
// //   bookings: 0,
// //   lessons: 0,
// //   payments: 0,
// //   supportTickets: 0,
// //   pendingTeachers: 0,
// // };

// // function getData(payload) {
// //   return payload?.data?.data || payload?.data || null;
// // }

// // function normalizeList(payload) {
// //   const data = getData(payload);

// //   if (Array.isArray(data)) return data;
// //   if (Array.isArray(data?.items)) return data.items;
// //   if (Array.isArray(data?.docs)) return data.docs;
// //   if (Array.isArray(data?.results)) return data.results;

// //   return [];
// // }

// // function formatDate(date) {
// //   if (!date) return "-";

// //   return new Date(date).toLocaleDateString("en-US", {
// //     day: "2-digit",
// //     month: "short",
// //     year: "numeric",
// //   });
// // }

// // function formatMoney(value) {
// //   const amount = Number(value || 0);

// //   return new Intl.NumberFormat("en-US", {
// //     style: "currency",
// //     currency: "EUR",
// //     maximumFractionDigits: 0,
// //   }).format(amount);
// // }

// // function StatCard({ title, value, icon: Icon, href, tone = "blue", note }) {
// //   const toneClass =
// //     tone === "green"
// //       ? "bg-[#ECFDF3] text-[#027A48]"
// //       : tone === "red"
// //         ? "bg-[#FEF3F2] text-[#B42318]"
// //         : tone === "amber"
// //           ? "bg-[#FFFAEB] text-[#B54708]"
// //           : tone === "purple"
// //             ? "bg-[#F4F3FF] text-[#5925DC]"
// //             : "bg-[#EFF6FF] text-[#175CD3]";

// //   const card = (
// //     <div className="rounded-[18px] border border-black/[0.06] bg-white/90 p-4 shadow-[0_8px_22px_rgba(16,24,40,0.04)] transition hover:bg-white">
// //       <div className="flex items-start justify-between gap-3">
// //         <div className="min-w-0">
// //           <p className="text-[12px] font-semibold text-[#6E6E73]">{title}</p>

// //           <h3 className="mt-1 text-[28px] font-semibold leading-none tracking-[-0.03em] text-[#1D1D1F]">
// //             {value}
// //           </h3>

// //           {note ? (
// //             <p className="mt-2 text-xs font-medium text-[#86868B]">{note}</p>
// //           ) : null}
// //         </div>

// //         <div
// //           className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl ${toneClass}`}
// //         >
// //           <Icon size={18} />
// //         </div>
// //       </div>
// //     </div>
// //   );

// //   if (!href) return card;

// //   return <Link href={href}>{card}</Link>;
// // }

// // function CompactMetric({ label, value, tone = "default" }) {
// //   const textClass =
// //     tone === "green"
// //       ? "text-[#027A48]"
// //       : tone === "red"
// //         ? "text-[#B42318]"
// //         : tone === "amber"
// //           ? "text-[#B54708]"
// //           : "text-[#175CD3]";

// //   return (
// //     <div className="rounded-[16px] border border-black/[0.06] bg-white/90 px-4 py-3 shadow-[0_6px_18px_rgba(16,24,40,0.035)]">
// //       <p className="text-[12px] font-semibold text-[#6E6E73]">{label}</p>
// //       <p
// //         className={`mt-1 text-[18px] font-semibold tracking-[-0.02em] ${textClass}`}
// //       >
// //         {value}
// //       </p>
// //     </div>
// //   );
// // }

// // function SectionCard({
// //   title,
// //   subtitle,
// //   actionHref,
// //   actionText = "View all",
// //   children,
// // }) {
// //   return (
// //     <section className="rounded-[20px] border border-black/[0.06] bg-white/90 shadow-[0_8px_24px_rgba(16,24,40,0.04)]">
// //       <div className="flex items-center justify-between gap-3 border-b border-black/[0.06] px-4 py-3">
// //         <div>
// //           <h2 className="text-[15px] font-semibold tracking-[-0.01em] text-[#1D1D1F]">
// //             {title}
// //           </h2>

// //           {subtitle ? (
// //             <p className="mt-0.5 text-xs font-medium text-[#86868B]">
// //               {subtitle}
// //             </p>
// //           ) : null}
// //         </div>

// //         {actionHref ? (
// //           <Link
// //             href={actionHref}
// //             className="text-xs font-semibold text-[#175CD3] hover:underline"
// //           >
// //             {actionText}
// //           </Link>
// //         ) : null}
// //       </div>

// //       <div className="p-4">{children}</div>
// //     </section>
// //   );
// // }

// // function LoadingBlock() {
// //   return (
// //     <div className="animate-pulse rounded-[20px] border border-black/[0.06] bg-white/90 p-4">
// //       <div className="h-4 w-1/3 rounded bg-slate-200" />

// //       <div className="mt-4 space-y-3">
// //         <div className="h-11 rounded-xl bg-slate-200" />
// //         <div className="h-11 rounded-xl bg-slate-200" />
// //         <div className="h-11 rounded-xl bg-slate-200" />
// //       </div>
// //     </div>
// //   );
// // }

// // function StatusPill({ status }) {
// //   const normalized = String(status || "pending").toLowerCase();

// //   const className =
// //     normalized === "confirmed" ||
// //     normalized === "success" ||
// //     normalized === "paid" ||
// //     normalized === "completed" ||
// //     normalized === "active"
// //       ? "bg-[#ECFDF3] text-[#027A48]"
// //       : normalized === "cancelled" ||
// //           normalized === "failed" ||
// //           normalized === "closed"
// //         ? "bg-[#FEF3F2] text-[#B42318]"
// //         : "bg-[#FFFAEB] text-[#B54708]";

// //   return (
// //     <span
// //       className={`inline-flex rounded-full px-2.5 py-1 text-[10px] font-semibold uppercase ${className}`}
// //     >
// //       {normalized}
// //     </span>
// //   );
// // }

// // function RecentUserRow({ user }) {
// //   return (
// //     <div className="grid grid-cols-[1fr_auto] items-center gap-3 border-b border-black/[0.05] py-3 last:border-b-0">
// //       <div className="min-w-0">
// //         <p className="line-clamp-1 text-sm font-semibold text-[#1D1D1F]">
// //           {user.name || user.fullName || user.email || "Unnamed user"}
// //         </p>

// //         <p className="mt-0.5 line-clamp-1 text-xs font-medium text-[#86868B]">
// //           {user.email || "-"}
// //         </p>
// //       </div>

// //       <div className="text-right">
// //         <span className="rounded-full bg-[#EFF6FF] px-2.5 py-1 text-[10px] font-semibold uppercase text-[#175CD3]">
// //           {user.role || "user"}
// //         </span>

// //         <p className="mt-1 text-xs font-medium text-[#86868B]">
// //           {formatDate(user.createdAt)}
// //         </p>
// //       </div>
// //     </div>
// //   );
// // }

// // function RecentBookingRow({ booking }) {
// //   const studentName =
// //     booking.student?.name ||
// //     booking.student?.fullName ||
// //     booking.student?.email ||
// //     "Student";

// //   return (
// //     <div className="grid grid-cols-[1fr_auto] items-center gap-3 border-b border-black/[0.05] py-3 last:border-b-0">
// //       <div className="min-w-0">
// //         <p className="line-clamp-1 text-sm font-semibold text-[#1D1D1F]">
// //           {studentName}
// //         </p>

// //         <p className="mt-0.5 line-clamp-1 text-xs font-medium text-[#86868B]">
// //           {booking.location || booking.pickupLocation || "Driving booking"}
// //         </p>
// //       </div>

// //       <div className="text-right">
// //         <StatusPill status={booking.status} />

// //         <p className="mt-1 text-xs font-medium text-[#86868B]">
// //           {formatDate(booking.createdAt)}
// //         </p>
// //       </div>
// //     </div>
// //   );
// // }

// // function RecentPaymentRow({ payment }) {
// //   return (
// //     <div className="grid grid-cols-[1fr_auto] items-center gap-3 border-b border-black/[0.05] py-3 last:border-b-0">
// //       <div className="min-w-0">
// //         <p className="line-clamp-1 text-sm font-semibold text-[#1D1D1F]">
// //           {payment.user?.name ||
// //             payment.student?.name ||
// //             payment.user?.email ||
// //             "Payment"}
// //         </p>

// //         <p className="mt-0.5 text-xs font-medium text-[#86868B]">
// //           {formatDate(payment.createdAt)}
// //         </p>
// //       </div>

// //       <div className="text-right">
// //         <p className="text-sm font-semibold text-[#1D1D1F]">
// //           {formatMoney(payment.amount || payment.total || 0)}
// //         </p>

// //         <div className="mt-1">
// //           <StatusPill status={payment.status || "paid"} />
// //         </div>
// //       </div>
// //     </div>
// //   );
// // }

// // function QuickLink({ title, description, href, icon: Icon }) {
// //   return (
// //     <Link
// //       href={href}
// //       className="flex items-center justify-between rounded-2xl border border-black/[0.06] bg-[#F9FAFB] px-3 py-3 transition hover:bg-white"
// //     >
// //       <div className="flex min-w-0 items-center gap-3">
// //         <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-2xl bg-white text-[#175CD3] shadow-[0_4px_12px_rgba(16,24,40,0.05)]">
// //           <Icon size={15} />
// //         </span>

// //         <div className="min-w-0">
// //           <p className="line-clamp-1 text-sm font-semibold text-[#1D1D1F]">
// //             {title}
// //           </p>
// //           {description ? (
// //             <p className="mt-0.5 line-clamp-1 text-xs font-medium text-[#86868B]">
// //               {description}
// //             </p>
// //           ) : null}
// //         </div>
// //       </div>

// //       <FaArrowRight size={11} className="shrink-0 text-[#A1A1AA]" />
// //     </Link>
// //   );
// // }

// // export default function AdminDashboardPage() {
// //   const [stats, setStats] = useState(defaultStats);
// //   const [users, setUsers] = useState([]);
// //   const [bookings, setBookings] = useState([]);
// //   const [payments, setPayments] = useState([]);
// //   const [tickets, setTickets] = useState([]);
// //   const [quizzes, setQuizzes] = useState([]);

// //   const [loading, setLoading] = useState(true);
// //   const [error, setError] = useState("");

// //   const loadDashboard = async () => {
// //     try {
// //       setLoading(true);
// //       setError("");

// //       const [
// //         dashboardRes,
// //         usersRes,
// //         bookingsRes,
// //         paymentsRes,
// //         ticketsRes,
// //         quizzesRes,
// //       ] = await Promise.allSettled([
// //         getAdminDashboard(),
// //         getAdminUsers(),
// //         getBookings(),
// //         getPayments(),
// //         getSupportTickets(),
// //         getQuizzes(),
// //       ]);

// //       if (dashboardRes.status === "fulfilled") {
// //         setStats({
// //           ...defaultStats,
// //           ...(getData(dashboardRes.value) || {}),
// //         });
// //       }

// //       if (usersRes.status === "fulfilled") {
// //         setUsers(normalizeList(usersRes.value));
// //       }

// //       if (bookingsRes.status === "fulfilled") {
// //         setBookings(normalizeList(bookingsRes.value));
// //       }

// //       if (paymentsRes.status === "fulfilled") {
// //         setPayments(normalizeList(paymentsRes.value));
// //       }

// //       if (ticketsRes.status === "fulfilled") {
// //         setTickets(normalizeList(ticketsRes.value));
// //       }

// //       if (quizzesRes.status === "fulfilled") {
// //         setQuizzes(normalizeList(quizzesRes.value));
// //       }

// //       if (dashboardRes.status === "rejected") {
// //         setError(
// //           dashboardRes.reason?.response?.data?.message ||
// //             dashboardRes.reason?.message ||
// //             "Failed to load admin dashboard",
// //         );
// //       }
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   useEffect(() => {
// //     loadDashboard();
// //   }, []);

// //   const computed = useMemo(() => {
// //     const totalRevenue = payments.reduce((sum, payment) => {
// //       const amount = Number(payment.amount || payment.total || 0);
// //       const status = String(payment.status || "paid").toLowerCase();

// //       const isSuccess = ["success", "paid", "completed"].includes(status);

// //       return isSuccess ? sum + amount : sum;
// //     }, 0);

// //     const pendingBookings = bookings.filter(
// //       (item) => !item.status || item.status === "pending",
// //     ).length;

// //     const openTickets = tickets.filter(
// //       (item) => item.status !== "closed",
// //     ).length;

// //     const activeQuizzes = quizzes.filter(
// //       (item) => item.status === "active",
// //     ).length;

// //     const sortedUsers = [...users].sort(
// //       (a, b) => new Date(b.createdAt || 0) - new Date(a.createdAt || 0),
// //     );

// //     const sortedBookings = [...bookings].sort(
// //       (a, b) => new Date(b.createdAt || 0) - new Date(a.createdAt || 0),
// //     );

// //     const sortedPayments = [...payments].sort(
// //       (a, b) => new Date(b.createdAt || 0) - new Date(a.createdAt || 0),
// //     );

// //     return {
// //       totalRevenue,
// //       pendingBookings,
// //       openTickets,
// //       activeQuizzes,
// //       totalUsers: users.length,
// //       recentUsers: sortedUsers.slice(0, 5),
// //       recentBookings: sortedBookings.slice(0, 5),
// //       recentPayments: sortedPayments.slice(0, 5),
// //     };
// //   }, [payments, bookings, tickets, quizzes, users]);

// //   return (
// //     <main className="min-h-screen bg-[#F5F5F7] px-4 py-5 font-sans text-[#1D1D1F] sm:px-6 lg:px-8">
// //       <div className="mx-auto max-w-7xl">
// //         <header className="mb-5 rounded-[22px] border border-black/[0.06] bg-white/90 px-5 py-4 shadow-[0_8px_24px_rgba(16,24,40,0.04)]">
// //           <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
// //             <div className="flex items-center gap-3">
// //               <div className="flex h-11 w-11 items-center justify-center rounded-[18px] bg-[#EFF6FF] text-[#175CD3]">
// //                 <MdDashboard size={22} />
// //               </div>

// //               <div>
// //                 <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#86868B]">
// //                   Admin
// //                 </p>

// //                 <h1 className="mt-1 text-2xl font-semibold tracking-[-0.04em] text-[#1D1D1F]">
// //                   Dashboard
// //                 </h1>

// //                 <p className="mt-1 text-sm font-medium text-[#6E6E73]">
// //                   A clear view of your users, bookings, payments, support, and
// //                   quiz activity.
// //                 </p>
// //               </div>
// //             </div>

// //             <button
// //               type="button"
// //               onClick={loadDashboard}
// //               className="inline-flex h-10 items-center justify-center gap-2 rounded-full border border-black/[0.08] bg-white px-4 text-xs font-semibold text-[#175CD3] transition hover:bg-[#F9FAFB]"
// //             >
// //               <FaSyncAlt size={12} />
// //               Refresh
// //             </button>
// //           </div>
// //         </header>

// //         {error ? (
// //           <div className="mb-4 rounded-[18px] border border-red-100 bg-[#FEF3F2] p-4 text-sm font-semibold text-[#B42318]">
// //             {error}
// //           </div>
// //         ) : null}

// //         <section className="mb-4 grid grid-cols-2 gap-3 md:grid-cols-4 xl:grid-cols-7">
// //           <StatCard
// //             title="Students"
// //             value={loading ? "..." : stats.students}
// //             icon={FaUserGraduate}
// //             href="/admin/students"
// //             tone="blue"
// //             note="Enrolled learners"
// //           />

// //           <StatCard
// //             title="Instructors"
// //             value={loading ? "..." : stats.teachers}
// //             icon={FaUserTie}
// //             href="/admin/teachers"
// //             tone="purple"
// //             note="Teaching team"
// //           />

// //           <StatCard
// //             title="Bookings"
// //             value={loading ? "..." : stats.bookings}
// //             icon={FaCar}
// //             href="/admin/bookings"
// //             tone="amber"
// //             note="Driving requests"
// //           />

// //           <StatCard
// //             title="Lessons"
// //             value={loading ? "..." : stats.lessons}
// //             icon={FaBookOpen}
// //             href="/admin/lessons"
// //             tone="blue"
// //             note="Scheduled sessions"
// //           />

// //           <StatCard
// //             title="Payments"
// //             value={loading ? "..." : stats.payments}
// //             icon={FaCreditCard}
// //             href="/admin/payments"
// //             tone="green"
// //             note="Transactions"
// //           />

// //           <StatCard
// //             title="Support"
// //             value={loading ? "..." : stats.supportTickets}
// //             icon={FaHeadset}
// //             href="/admin/support"
// //             tone="red"
// //             note="User requests"
// //           />

// //           <StatCard
// //             title="Pending"
// //             value={loading ? "..." : stats.pendingTeachers}
// //             icon={FaClock}
// //             href="/admin/teachers"
// //             tone="amber"
// //             note="Instructor review"
// //           />
// //         </section>

// //         <section className="mb-5 grid grid-cols-2 gap-3 md:grid-cols-5">
// //           <CompactMetric
// //             label="Revenue"
// //             value={loading ? "..." : formatMoney(computed.totalRevenue)}
// //             tone="green"
// //           />

// //           <CompactMetric
// //             label="Users"
// //             value={loading ? "..." : computed.totalUsers}
// //           />

// //           <CompactMetric
// //             label="Waiting bookings"
// //             value={loading ? "..." : computed.pendingBookings}
// //             tone="amber"
// //           />

// //           <CompactMetric
// //             label="Open support"
// //             value={loading ? "..." : computed.openTickets}
// //             tone="red"
// //           />

// //           <CompactMetric
// //             label="Live quizzes"
// //             value={loading ? "..." : computed.activeQuizzes}
// //           />
// //         </section>

// //         {loading ? (
// //           <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
// //             <LoadingBlock />
// //             <LoadingBlock />
// //             <LoadingBlock />
// //           </div>
// //         ) : (
// //           <div className="grid grid-cols-1 gap-4 xl:grid-cols-[1fr_1fr_1fr_330px]">
// //             <SectionCard
// //               title="Recent users"
// //               subtitle="Latest accounts"
// //               actionHref="/admin/users"
// //             >
// //               {computed.recentUsers.length === 0 ? (
// //                 <p className="rounded-2xl bg-[#F9FAFB] p-4 text-sm font-medium text-[#86868B]">
// //                   No users found.
// //                 </p>
// //               ) : (
// //                 computed.recentUsers.map((user) => (
// //                   <RecentUserRow
// //                     key={user._id || user.id || user.email}
// //                     user={user}
// //                   />
// //                 ))
// //               )}
// //             </SectionCard>

// //             <SectionCard
// //               title="Recent bookings"
// //               subtitle="Latest driving requests"
// //               actionHref="/admin/bookings"
// //             >
// //               {computed.recentBookings.length === 0 ? (
// //                 <p className="rounded-2xl bg-[#F9FAFB] p-4 text-sm font-medium text-[#86868B]">
// //                   No bookings found.
// //                 </p>
// //               ) : (
// //                 computed.recentBookings.map((booking) => (
// //                   <RecentBookingRow
// //                     key={booking._id || booking.id}
// //                     booking={booking}
// //                   />
// //                 ))
// //               )}
// //             </SectionCard>

// //             <SectionCard
// //               title="Recent payments"
// //               subtitle="Latest transactions"
// //               actionHref="/admin/payments"
// //             >
// //               {computed.recentPayments.length === 0 ? (
// //                 <p className="rounded-2xl bg-[#F9FAFB] p-4 text-sm font-medium text-[#86868B]">
// //                   No payments found.
// //                 </p>
// //               ) : (
// //                 computed.recentPayments.map((payment) => (
// //                   <RecentPaymentRow
// //                     key={payment._id || payment.id}
// //                     payment={payment}
// //                   />
// //                 ))
// //               )}
// //             </SectionCard>

// //             <SectionCard title="Actions" subtitle="Common admin tasks">
// //               <div className="space-y-2">
// //                 <QuickLink
// //                   title="Create quiz"
// //                   description="Add a new code test"
// //                   href="/admin/quizzes/create"
// //                   icon={MdOutlineQuiz}
// //                 />

// //                 <QuickLink
// //                   title="Manage students"
// //                   description="View learner records"
// //                   href="/admin/students"
// //                   icon={FaUsers}
// //                 />

// //                 <QuickLink
// //                   title="Review payments"
// //                   description="Check transactions"
// //                   href="/admin/payments"
// //                   icon={FaCreditCard}
// //                 />

// //                 <QuickLink
// //                   title="Support tickets"
// //                   description="Respond to requests"
// //                   href="/admin/support"
// //                   icon={FaHeadset}
// //                 />

// //                 <QuickLink
// //                   title="Instructor review"
// //                   description="Approve pending teachers"
// //                   href="/admin/teachers"
// //                   icon={FaCheckCircle}
// //                 />

// //                 <QuickLink
// //                   title="Pending issues"
// //                   description="Resolve open problems"
// //                   href="/admin/support"
// //                   icon={FaExclamationTriangle}
// //                 />
// //               </div>
// //             </SectionCard>
// //           </div>
// //         )}
// //       </div>
// //     </main>
// //   );
// // }

// "use client";

// import { useEffect, useMemo, useState } from "react";
// import Link from "next/link";
// import {
//   FaArrowRight,
//   FaBookOpen,
//   FaCar,
//   FaCheckCircle,
//   FaClock,
//   FaCreditCard,
//   FaExclamationTriangle,
//   FaHeadset,
//   FaSyncAlt,
//   FaUserGraduate,
//   FaUsers,
//   FaUserTie,
// } from "react-icons/fa";
// import { MdDashboard, MdOutlineQuiz } from "react-icons/md";
// import {
//   getAdminDashboard,
//   getAdminUsers,
//   getBookings,
//   getPayments,
//   getQuizzes,
//   getSupportTickets,
// } from "@/features/API";

// const defaultStats = {
//   students: 0,
//   teachers: 0,
//   bookings: 0,
//   lessons: 0,
//   payments: 0,
//   supportTickets: 0,
//   pendingTeachers: 0,
// };

// function getData(payload) {
//   return payload?.data?.data || payload?.data || null;
// }

// function normalizeList(payload) {
//   const data = getData(payload);

//   if (Array.isArray(data)) return data;
//   if (Array.isArray(data?.items)) return data.items;
//   if (Array.isArray(data?.docs)) return data.docs;
//   if (Array.isArray(data?.results)) return data.results;

//   return [];
// }

// function formatDate(date) {
//   if (!date) return "-";

//   return new Date(date).toLocaleDateString("en-US", {
//     day: "2-digit",
//     month: "short",
//     year: "numeric",
//   });
// }

// function formatMoney(value) {
//   const amount = Number(value || 0);

//   return new Intl.NumberFormat("en-US", {
//     style: "currency",
//     currency: "EUR",
//     maximumFractionDigits: 0,
//   }).format(amount);
// }

// function getToneClass(tone) {
//   if (tone === "green") return "text-[#2DBE42]";
//   if (tone === "red") return "text-[#E5273D]";
//   if (tone === "amber") return "text-[#D98A00]";
//   return "text-[#174A9B]";
// }

// function StatCard({ title, value, icon: Icon, href, tone = "blue", note }) {
//   const card = (
//     <div className="min-h-[142px] rounded-[12px] bg-[#E8EEF8] px-4 py-5 transition hover:shadow-[0_10px_24px_rgba(23,74,155,0.10)]">
//       <div className="mx-auto flex h-[38px] w-[38px] items-center justify-center rounded-[11px] bg-white text-[18px] text-[#174A9B]">
//         <Icon />
//       </div>

//       <h3 className="mt-4 text-center text-[14px] font-[700] leading-[18px] text-black">
//         {title}
//       </h3>

//       <p
//         className={`mt-2 text-center text-[25px] font-[700] leading-none ${getToneClass(
//           tone,
//         )}`}
//       >
//         {value}
//       </p>

//       {note ? (
//         <p className="mt-2 text-center text-[11px] font-[500] leading-[16px] text-[#6D6F76]">
//           {note}
//         </p>
//       ) : null}
//     </div>
//   );

//   if (!href) return card;

//   return <Link href={href}>{card}</Link>;
// }

// function CompactMetric({ label, value, tone = "blue" }) {
//   return (
//     <div className="rounded-[12px] bg-white px-4 py-4">
//       <p className="text-[12px] font-[500] leading-none text-[#6E7077]">
//         {label}
//       </p>

//       <p
//         className={`mt-3 text-[20px] font-[700] leading-none ${getToneClass(
//           tone,
//         )}`}
//       >
//         {value}
//       </p>
//     </div>
//   );
// }

// function SectionCard({
//   title,
//   subtitle,
//   actionHref,
//   actionText = "View All",
//   children,
// }) {
//   return (
//     <section className="rounded-[14px] bg-[#E8EEF8] p-4 sm:p-5">
//       <div className="flex items-start justify-between gap-4">
//         <div className="min-w-0">
//           <h2 className="text-[18px] font-[700] leading-none text-[#174A9B]">
//             {title}
//           </h2>

//           {subtitle ? (
//             <p className="mt-[10px] text-[12px] font-[500] leading-[18px] text-[#6D6F76]">
//               {subtitle}
//             </p>
//           ) : null}
//         </div>

//         {actionHref ? (
//           <Link
//             href={actionHref}
//             className="shrink-0 text-[12px] font-[700] leading-none text-[#174A9B] underline underline-offset-[2px]"
//           >
//             {actionText}
//           </Link>
//         ) : null}
//       </div>

//       <div className="mt-4">{children}</div>
//     </section>
//   );
// }

// function LoadingBlock() {
//   return (
//     <div className="animate-pulse rounded-[14px] bg-[#E8EEF8] p-4 sm:p-5">
//       <div className="h-5 w-1/3 rounded-[8px] bg-white" />

//       <div className="mt-5 space-y-[10px]">
//         <div className="h-[62px] rounded-[12px] bg-white" />
//         <div className="h-[62px] rounded-[12px] bg-white" />
//         <div className="h-[62px] rounded-[12px] bg-white" />
//       </div>
//     </div>
//   );
// }

// function StatusPill({ status }) {
//   const normalized = String(status || "pending").toLowerCase();

//   const className =
//     normalized === "confirmed" ||
//     normalized === "success" ||
//     normalized === "paid" ||
//     normalized === "completed" ||
//     normalized === "active"
//       ? "bg-[#DFF7E3] text-[#2DBE42]"
//       : normalized === "cancelled" ||
//           normalized === "failed" ||
//           normalized === "closed"
//         ? "bg-[#FFE4E8] text-[#E5273D]"
//         : "bg-[#FFF2D8] text-[#D98A00]";

//   return (
//     <span
//       className={`inline-flex rounded-full px-3 py-1 text-[10px] font-[700] uppercase leading-none ${className}`}
//     >
//       {normalized}
//     </span>
//   );
// }

// function EmptyState({ text }) {
//   return (
//     <p className="rounded-[12px] bg-white p-4 text-[13px] font-[500] leading-[20px] text-[#6D6F76]">
//       {text}
//     </p>
//   );
// }

// function RecentUserRow({ user }) {
//   return (
//     <div className="flex min-h-[72px] items-center justify-between gap-3 rounded-[12px] bg-white px-[15px] py-[14px]">
//       <div className="min-w-0">
//         <p className="truncate text-[14px] font-[700] leading-none text-black">
//           {user.name || user.fullName || user.email || "Unnamed user"}
//         </p>

//         <p className="mt-[10px] truncate text-[12px] font-[500] leading-none text-[#6D6F76]">
//           {user.email || "-"}
//         </p>
//       </div>

//       <div className="shrink-0 text-right">
//         <span className="inline-flex rounded-full bg-[#D7DFEC] px-3 py-1 text-[10px] font-[700] uppercase leading-none text-[#174A9B]">
//           {user.role || "user"}
//         </span>

//         <p className="mt-[10px] text-[11px] font-[500] leading-none text-[#6D6F76]">
//           {formatDate(user.createdAt)}
//         </p>
//       </div>
//     </div>
//   );
// }

// function RecentBookingRow({ booking }) {
//   const studentName =
//     booking.student?.name ||
//     booking.student?.fullName ||
//     booking.student?.email ||
//     "Student";

//   return (
//     <div className="flex min-h-[72px] items-center justify-between gap-3 rounded-[12px] bg-white px-[15px] py-[14px]">
//       <div className="min-w-0">
//         <p className="truncate text-[14px] font-[700] leading-none text-black">
//           {studentName}
//         </p>

//         <p className="mt-[10px] truncate text-[12px] font-[500] leading-none text-[#6D6F76]">
//           {booking.location || booking.pickupLocation || "Driving booking"}
//         </p>
//       </div>

//       <div className="shrink-0 text-right">
//         <StatusPill status={booking.status} />

//         <p className="mt-[10px] text-[11px] font-[500] leading-none text-[#6D6F76]">
//           {formatDate(booking.createdAt)}
//         </p>
//       </div>
//     </div>
//   );
// }

// function RecentPaymentRow({ payment }) {
//   return (
//     <div className="flex min-h-[72px] items-center justify-between gap-3 rounded-[12px] bg-white px-[15px] py-[14px]">
//       <div className="min-w-0">
//         <p className="truncate text-[14px] font-[700] leading-none text-black">
//           {payment.user?.name ||
//             payment.student?.name ||
//             payment.user?.email ||
//             "Payment"}
//         </p>

//         <p className="mt-[10px] text-[12px] font-[500] leading-none text-[#6D6F76]">
//           {formatDate(payment.createdAt)}
//         </p>
//       </div>

//       <div className="shrink-0 text-right">
//         <p className="text-[14px] font-[700] leading-none text-[#2DBE42]">
//           {formatMoney(payment.amount || payment.total || 0)}
//         </p>

//         <div className="mt-[10px]">
//           <StatusPill status={payment.status || "paid"} />
//         </div>
//       </div>
//     </div>
//   );
// }

// function QuickLink({ title, description, href, icon: Icon }) {
//   return (
//     <Link
//       href={href}
//       className="flex min-h-[62px] items-center justify-between gap-3 rounded-[12px] bg-white px-[15px] py-[13px] transition hover:shadow-[0_8px_20px_rgba(23,74,155,0.10)]"
//     >
//       <div className="flex min-w-0 items-center gap-[10px]">
//         <span className="flex h-[34px] w-[34px] shrink-0 items-center justify-center rounded-[8px] bg-[#E8EEF8] text-[15px] text-[#174A9B]">
//           <Icon />
//         </span>

//         <div className="min-w-0">
//           <p className="truncate text-[13px] font-[700] leading-none text-black">
//             {title}
//           </p>

//           {description ? (
//             <p className="mt-[8px] truncate text-[11px] font-[500] leading-none text-[#6D6F76]">
//               {description}
//             </p>
//           ) : null}
//         </div>
//       </div>

//       <FaArrowRight className="shrink-0 text-[11px] text-[#E5273D]" />
//     </Link>
//   );
// }

// export default function AdminDashboardPage() {
//   const [stats, setStats] = useState(defaultStats);
//   const [users, setUsers] = useState([]);
//   const [bookings, setBookings] = useState([]);
//   const [payments, setPayments] = useState([]);
//   const [tickets, setTickets] = useState([]);
//   const [quizzes, setQuizzes] = useState([]);

//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");

//   const loadDashboard = async () => {
//     try {
//       setLoading(true);
//       setError("");

//       const [
//         dashboardRes,
//         usersRes,
//         bookingsRes,
//         paymentsRes,
//         ticketsRes,
//         quizzesRes,
//       ] = await Promise.allSettled([
//         getAdminDashboard(),
//         getAdminUsers(),
//         getBookings(),
//         getPayments(),
//         getSupportTickets(),
//         getQuizzes(),
//       ]);

//       if (dashboardRes.status === "fulfilled") {
//         setStats({
//           ...defaultStats,
//           ...(getData(dashboardRes.value) || {}),
//         });
//       }

//       if (usersRes.status === "fulfilled") {
//         setUsers(normalizeList(usersRes.value));
//       }

//       if (bookingsRes.status === "fulfilled") {
//         setBookings(normalizeList(bookingsRes.value));
//       }

//       if (paymentsRes.status === "fulfilled") {
//         setPayments(normalizeList(paymentsRes.value));
//       }

//       if (ticketsRes.status === "fulfilled") {
//         setTickets(normalizeList(ticketsRes.value));
//       }

//       if (quizzesRes.status === "fulfilled") {
//         setQuizzes(normalizeList(quizzesRes.value));
//       }

//       if (dashboardRes.status === "rejected") {
//         setError(
//           dashboardRes.reason?.response?.data?.message ||
//             dashboardRes.reason?.message ||
//             "Failed to load admin dashboard",
//         );
//       }
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     loadDashboard();
//   }, []);

//   const computed = useMemo(() => {
//     const totalRevenue = payments.reduce((sum, payment) => {
//       const amount = Number(payment.amount || payment.total || 0);
//       const status = String(payment.status || "paid").toLowerCase();

//       const isSuccess = ["success", "paid", "completed"].includes(status);

//       return isSuccess ? sum + amount : sum;
//     }, 0);

//     const pendingBookings = bookings.filter(
//       (item) => !item.status || item.status === "pending",
//     ).length;

//     const openTickets = tickets.filter(
//       (item) => item.status !== "closed",
//     ).length;

//     const activeQuizzes = quizzes.filter(
//       (item) => item.status === "active",
//     ).length;

//     const sortedUsers = [...users].sort(
//       (a, b) => new Date(b.createdAt || 0) - new Date(a.createdAt || 0),
//     );

//     const sortedBookings = [...bookings].sort(
//       (a, b) => new Date(b.createdAt || 0) - new Date(a.createdAt || 0),
//     );

//     const sortedPayments = [...payments].sort(
//       (a, b) => new Date(b.createdAt || 0) - new Date(a.createdAt || 0),
//     );

//     return {
//       totalRevenue,
//       pendingBookings,
//       openTickets,
//       activeQuizzes,
//       totalUsers: users.length,
//       recentUsers: sortedUsers.slice(0, 5),
//       recentBookings: sortedBookings.slice(0, 5),
//       recentPayments: sortedPayments.slice(0, 5),
//     };
//   }, [payments, bookings, tickets, quizzes, users]);

//   return (
//     <main className="min-h-screen w-full min-w-0 overflow-x-hidden bg-white">
//       <div className="mx-auto w-full max-w-[1080px] px-4 pb-6 pt-6 sm:px-5 lg:px-6">
//         <header>
//           <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
//             <div className="min-w-0">
//               <div className="flex items-center gap-[10px]">
//                 <div className="flex h-[38px] w-[38px] shrink-0 items-center justify-center rounded-[11px] bg-[#E8EEF8] text-[18px] text-[#174A9B]">
//                   <MdDashboard />
//                 </div>

//                 <div className="min-w-0">
//                   <p className="text-[11px] font-[700] uppercase tracking-[0.14em] text-[#6D6F76]">
//                     Admin Panel
//                   </p>

//                   <h1 className="mt-[5px] text-[24px] font-[700] leading-tight text-[#174A9B] sm:text-[28px]">
//                     Dashboard
//                   </h1>
//                 </div>
//               </div>

//               <p className="mt-[10px] max-w-[680px] text-[12px] font-[500] leading-[19px] text-[#6D6F76] sm:text-[13px]">
//                 Track users, bookings, payments, support tickets, instructor
//                 approval and quiz activity from one clean admin dashboard.
//               </p>
//             </div>

//             <button
//               type="button"
//               onClick={loadDashboard}
//               className="flex h-[36px] w-full items-center justify-center gap-[8px] rounded-[11px] bg-[#E5273D] px-4 text-[12px] font-[700] text-white transition hover:bg-[#c91f33] sm:w-auto"
//             >
//               <FaSyncAlt className="text-[12px]" />
//               Refresh
//             </button>
//           </div>
//         </header>

//         {error ? (
//           <div className="mt-5 rounded-[12px] bg-[#FFE4E8] p-4 text-[13px] font-[700] leading-[20px] text-[#E5273D]">
//             {error}
//           </div>
//         ) : null}

//         <section className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
//           <StatCard
//             title="Students"
//             value={loading ? "..." : stats.students}
//             icon={FaUserGraduate}
//             href="/admin/students"
//             tone="blue"
//             note="Enrolled learners"
//           />

//           <StatCard
//             title="Instructors"
//             value={loading ? "..." : stats.teachers}
//             icon={FaUserTie}
//             href="/admin/teachers"
//             tone="blue"
//             note="Teaching team"
//           />

//           <StatCard
//             title="Bookings"
//             value={loading ? "..." : stats.bookings}
//             icon={FaCar}
//             href="/admin/bookings"
//             tone="amber"
//             note="Driving requests"
//           />

//           <StatCard
//             title="Lessons"
//             value={loading ? "..." : stats.lessons}
//             icon={FaBookOpen}
//             href="/admin/lessons"
//             tone="blue"
//             note="Scheduled sessions"
//           />

//           <StatCard
//             title="Payments"
//             value={loading ? "..." : stats.payments}
//             icon={FaCreditCard}
//             href="/admin/payments"
//             tone="green"
//             note="Transactions"
//           />

//           <StatCard
//             title="Support"
//             value={loading ? "..." : stats.supportTickets}
//             icon={FaHeadset}
//             href="/admin/support"
//             tone="red"
//             note="User requests"
//           />

//           <StatCard
//             title="Pending"
//             value={loading ? "..." : stats.pendingTeachers}
//             icon={FaClock}
//             href="/admin/teachers"
//             tone="amber"
//             note="Instructor review"
//           />

//           <StatCard
//             title="Live Quizzes"
//             value={loading ? "..." : computed.activeQuizzes}
//             icon={MdOutlineQuiz}
//             href="/admin/quizzes"
//             tone="green"
//             note="Active quiz content"
//           />
//         </section>

//         <section className="mt-5 rounded-[14px] bg-[#E8EEF8] p-4 sm:p-5">
//           <div className="flex items-start justify-between gap-4">
//             <div>
//               <h2 className="text-[18px] font-[700] leading-none text-[#174A9B]">
//                 Business Overview
//               </h2>

//               <p className="mt-[10px] text-[12px] font-[500] leading-[18px] text-[#6D6F76]">
//                 Quick summary of revenue, users, bookings and support workload.
//               </p>
//             </div>
//           </div>

//           <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5">
//             <CompactMetric
//               label="Revenue"
//               value={loading ? "..." : formatMoney(computed.totalRevenue)}
//               tone="green"
//             />

//             <CompactMetric
//               label="Users"
//               value={loading ? "..." : computed.totalUsers}
//               tone="blue"
//             />

//             <CompactMetric
//               label="Waiting Bookings"
//               value={loading ? "..." : computed.pendingBookings}
//               tone="amber"
//             />

//             <CompactMetric
//               label="Open Support"
//               value={loading ? "..." : computed.openTickets}
//               tone="red"
//             />

//             <CompactMetric
//               label="Live Quizzes"
//               value={loading ? "..." : computed.activeQuizzes}
//               tone="green"
//             />
//           </div>
//         </section>

//         {loading ? (
//           <section className="mt-5 grid grid-cols-1 gap-5 lg:grid-cols-3">
//             <LoadingBlock />
//             <LoadingBlock />
//             <LoadingBlock />
//           </section>
//         ) : (
//           <section className="mt-5 grid grid-cols-1 gap-5 xl:grid-cols-[minmax(0,1fr)_minmax(0,1fr)_minmax(0,1fr)_minmax(270px,0.9fr)]">
//             <SectionCard
//               title="Recent Users"
//               subtitle="Latest registered accounts"
//               actionHref="/admin/users"
//             >
//               {computed.recentUsers.length === 0 ? (
//                 <EmptyState text="No users found." />
//               ) : (
//                 <div className="space-y-[10px]">
//                   {computed.recentUsers.map((user) => (
//                     <RecentUserRow
//                       key={user._id || user.id || user.email}
//                       user={user}
//                     />
//                   ))}
//                 </div>
//               )}
//             </SectionCard>

//             <SectionCard
//               title="Recent Bookings"
//               subtitle="Latest driving requests"
//               actionHref="/admin/bookings"
//             >
//               {computed.recentBookings.length === 0 ? (
//                 <EmptyState text="No bookings found." />
//               ) : (
//                 <div className="space-y-[10px]">
//                   {computed.recentBookings.map((booking) => (
//                     <RecentBookingRow
//                       key={booking._id || booking.id}
//                       booking={booking}
//                     />
//                   ))}
//                 </div>
//               )}
//             </SectionCard>

//             <SectionCard
//               title="Recent Payments"
//               subtitle="Latest transactions"
//               actionHref="/admin/payments"
//             >
//               {computed.recentPayments.length === 0 ? (
//                 <EmptyState text="No payments found." />
//               ) : (
//                 <div className="space-y-[10px]">
//                   {computed.recentPayments.map((payment) => (
//                     <RecentPaymentRow
//                       key={payment._id || payment.id}
//                       payment={payment}
//                     />
//                   ))}
//                 </div>
//               )}
//             </SectionCard>

//             <SectionCard title="Actions" subtitle="Common admin tasks">
//               <div className="space-y-[10px]">
//                 <QuickLink
//                   title="Create Quiz"
//                   description="Add a new code test"
//                   href="/admin/quizzes/create"
//                   icon={MdOutlineQuiz}
//                 />

//                 <QuickLink
//                   title="Manage Students"
//                   description="View learner records"
//                   href="/admin/students"
//                   icon={FaUsers}
//                 />

//                 <QuickLink
//                   title="Review Payments"
//                   description="Check transactions"
//                   href="/admin/payments"
//                   icon={FaCreditCard}
//                 />

//                 <QuickLink
//                   title="Support Tickets"
//                   description="Respond to requests"
//                   href="/admin/support"
//                   icon={FaHeadset}
//                 />

//                 <QuickLink
//                   title="Instructor Review"
//                   description="Approve pending teachers"
//                   href="/admin/teachers"
//                   icon={FaCheckCircle}
//                 />

//                 <QuickLink
//                   title="Pending Issues"
//                   description="Resolve open problems"
//                   href="/admin/support"
//                   icon={FaExclamationTriangle}
//                 />
//               </div>
//             </SectionCard>
//           </section>
//         )}
//       </div>
//     </main>
//   );
// }

"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import {
  FaArrowRight,
  FaBookOpen,
  FaCar,
  FaCheckCircle,
  FaClock,
  FaCreditCard,
  FaExclamationTriangle,
  FaHeadset,
  FaMoneyBillWave,
  FaSyncAlt,
  FaUserGraduate,
  FaUsers,
  FaUserTie,
} from "react-icons/fa";
import { MdDashboard, MdOutlineQuiz } from "react-icons/md";
import {
  getAdminDashboard,
  getAdminUsers,
  getBookings,
  getPayments,
  getQuizzes,
  getSupportTickets,
} from "@/features/API";

const defaultStats = {
  students: 0,
  teachers: 0,
  bookings: 0,
  lessons: 0,
  payments: 0,
  supportTickets: 0,
  pendingTeachers: 0,
};

function getData(payload) {
  return payload?.data?.data || payload?.data || null;
}

function normalizeList(payload) {
  const data = getData(payload);

  if (Array.isArray(data)) return data;
  if (Array.isArray(data?.items)) return data.items;
  if (Array.isArray(data?.docs)) return data.docs;
  if (Array.isArray(data?.results)) return data.results;
  if (Array.isArray(data?.users)) return data.users;

  return [];
}

function normalizeDashboardStats(payload) {
  const data = getData(payload) || {};

  return {
    students: data.students ?? data.users?.students ?? 0,
    teachers: data.teachers ?? data.users?.teachers ?? 0,
    bookings: data.bookings ?? data.business?.bookings ?? 0,
    lessons: data.lessons ?? data.business?.completedLessons ?? 0,
    payments: data.payments ?? data.business?.payments ?? 0,
    supportTickets: data.supportTickets ?? data.business?.openTickets ?? 0,
    pendingTeachers: data.pendingTeachers ?? data.users?.pendingTeachers ?? 0,
  };
}

function formatDate(date) {
  if (!date) return "-";

  return new Date(date).toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

function formatMoney(value) {
  const amount = Number(value || 0);

  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "EUR",
    maximumFractionDigits: 0,
  }).format(amount);
}

function formatLocation(location) {
  if (location === null || location === undefined || location === "") {
    return "";
  }

  if (typeof location === "string" || typeof location === "number") {
    return String(location).trim();
  }

  if (Array.isArray(location)) {
    return location
      .map((item) => formatLocation(item))
      .filter(Boolean)
      .join(", ");
  }

  if (typeof location === "object") {
    const parts = [
      location.formattedAddress,
      location.address,
      location.street,
      location.area,
      location.city,
      location.state,
      location.postalCode,
      location.country,
    ]
      .map((item) => {
        if (typeof item === "string" || typeof item === "number") {
          return String(item).trim();
        }

        return "";
      })
      .filter(Boolean);

    return [...new Set(parts)].join(", ");
  }

  return "";
}

function getBookingLocation(booking) {
  const candidates = [
    booking?.location,
    booking?.pickupLocation,
    booking?.meetingLocationSnapshot,
    booking?.studentPickupLocation,
    booking?.teacherLocation,
  ];

  for (const candidate of candidates) {
    const formatted = formatLocation(candidate);

    if (formatted) {
      return formatted;
    }
  }

  return "Driving booking";
}

function StatusPill({ status }) {
  const normalized = String(status || "pending").toLowerCase();

  const className =
    normalized === "confirmed" ||
    normalized === "success" ||
    normalized === "paid" ||
    normalized === "completed" ||
    normalized === "active"
      ? "border-emerald-200 bg-emerald-50 text-emerald-700"
      : normalized === "cancelled" ||
          normalized === "failed" ||
          normalized === "closed"
        ? "border-rose-200 bg-rose-50 text-rose-700"
        : "border-amber-200 bg-amber-50 text-amber-700";

  return (
    <span
      className={`inline-flex rounded-full border px-3 py-1 text-[10px] font-bold uppercase leading-none ${className}`}
    >
      {normalized}
    </span>
  );
}

function StatCard({ title, value, icon: Icon, href, tone = "violet", note }) {
  const toneClass =
    tone === "green"
      ? "bg-emerald-50 text-emerald-600"
      : tone === "red"
        ? "bg-rose-50 text-rose-600"
        : tone === "amber"
          ? "bg-amber-50 text-amber-600"
          : tone === "sky"
            ? "bg-sky-50 text-sky-600"
            : "bg-violet-50 text-violet-600";

  const card = (
    <div className="group min-h-[150px] rounded-[1.4rem] border border-slate-200 bg-white p-5 shadow-[0_10px_30px_rgba(15,23,42,0.04)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_18px_45px_rgba(15,23,42,0.08)]">
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0">
          <p className="text-sm font-semibold text-slate-500">{title}</p>

          <h3 className="mt-3 text-3xl font-bold tracking-tight text-slate-900">
            {value}
          </h3>

          {note ? (
            <p className="mt-2 text-xs font-medium text-slate-400">{note}</p>
          ) : null}
        </div>

        <div
          className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl ${toneClass}`}
        >
          <Icon className="text-lg" />
        </div>
      </div>
    </div>
  );

  if (!href) return card;

  return <Link href={href}>{card}</Link>;
}

function CompactMetric({ label, value, icon: Icon, tone = "violet" }) {
  const toneClass =
    tone === "green"
      ? "text-emerald-600 bg-emerald-50"
      : tone === "red"
        ? "text-rose-600 bg-rose-50"
        : tone === "amber"
          ? "text-amber-600 bg-amber-50"
          : "text-violet-600 bg-violet-50";

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
      <div className="flex items-center justify-between gap-3">
        <div>
          <p className="text-xs font-bold uppercase tracking-wide text-slate-400">
            {label}
          </p>

          <p className="mt-2 text-xl font-bold text-slate-900">{value}</p>
        </div>

        <div
          className={`flex h-10 w-10 items-center justify-center rounded-xl ${toneClass}`}
        >
          <Icon className="text-sm" />
        </div>
      </div>
    </div>
  );
}

function SectionCard({
  title,
  subtitle,
  actionHref,
  actionText = "View all",
  children,
}) {
  return (
    <section className="overflow-hidden rounded-[1.4rem] border border-slate-200 bg-white shadow-[0_10px_30px_rgba(15,23,42,0.04)]">
      <div className="flex items-center justify-between gap-3 border-b border-slate-100 px-5 py-4">
        <div className="min-w-0">
          <h2 className="text-base font-bold text-slate-900">{title}</h2>

          {subtitle ? (
            <p className="mt-1 text-sm font-medium text-slate-400">
              {subtitle}
            </p>
          ) : null}
        </div>

        {actionHref ? (
          <Link
            href={actionHref}
            className="shrink-0 rounded-full bg-violet-50 px-3 py-1.5 text-xs font-bold text-violet-700 transition hover:bg-violet-100"
          >
            {actionText}
          </Link>
        ) : null}
      </div>

      <div className="p-4">{children}</div>
    </section>
  );
}

function LoadingBlock() {
  return (
    <div className="animate-pulse rounded-[1.4rem] border border-slate-200 bg-white p-5 shadow-sm">
      <div className="h-5 w-1/3 rounded-full bg-slate-200" />

      <div className="mt-5 space-y-3">
        <div className="h-16 rounded-2xl bg-slate-100" />
        <div className="h-16 rounded-2xl bg-slate-100" />
        <div className="h-16 rounded-2xl bg-slate-100" />
      </div>
    </div>
  );
}

function EmptyState({ text }) {
  return (
    <div className="rounded-2xl border border-dashed border-slate-200 bg-slate-50 p-5 text-center text-sm font-semibold text-slate-400">
      {text}
    </div>
  );
}

function RecentUserRow({ user }) {
  const name = user.name || user.fullName || user.email || "Unnamed user";

  return (
    <div className="flex items-center justify-between gap-3 rounded-2xl border border-slate-100 bg-white px-4 py-3 transition hover:bg-slate-50">
      <div className="flex min-w-0 items-center gap-3">
        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-violet-600 to-slate-900 text-sm font-bold text-white">
          {String(name).slice(0, 2).toUpperCase()}
        </div>

        <div className="min-w-0">
          <p className="truncate text-sm font-bold text-slate-900">{name}</p>

          <p className="mt-1 truncate text-xs font-medium text-slate-400">
            {user.email || "-"}
          </p>
        </div>
      </div>

      <div className="shrink-0 text-right">
        <span className="inline-flex rounded-full border border-sky-200 bg-sky-50 px-3 py-1 text-[10px] font-bold uppercase text-sky-700">
          {user.role || "user"}
        </span>

        <p className="mt-2 text-xs font-medium text-slate-400">
          {formatDate(user.createdAt)}
        </p>
      </div>
    </div>
  );
}

function RecentBookingRow({ booking }) {
  const studentName =
    booking.student?.name ||
    booking.student?.fullName ||
    booking.student?.email ||
    "Student";

  const locationText = getBookingLocation(booking);

  return (
    <div className="flex items-center justify-between gap-3 rounded-2xl border border-slate-100 bg-white px-4 py-3 transition hover:bg-slate-50">
      <div className="min-w-0">
        <p className="truncate text-sm font-bold text-slate-900">
          {String(studentName)}
        </p>

        <p
          className="mt-1 truncate text-xs font-medium text-slate-400"
          title={locationText}
        >
          {locationText}
        </p>
      </div>

      <div className="shrink-0 text-right">
        <StatusPill status={booking.status} />

        <p className="mt-2 text-xs font-medium text-slate-400">
          {formatDate(booking.createdAt)}
        </p>
      </div>
    </div>
  );
}

function RecentPaymentRow({ payment }) {
  return (
    <div className="flex items-center justify-between gap-3 rounded-2xl border border-slate-100 bg-white px-4 py-3 transition hover:bg-slate-50">
      <div className="min-w-0">
        <p className="truncate text-sm font-bold text-slate-900">
          {payment.user?.name ||
            payment.student?.name ||
            payment.user?.email ||
            "Payment"}
        </p>

        <p className="mt-1 text-xs font-medium text-slate-400">
          {formatDate(payment.createdAt)}
        </p>
      </div>

      <div className="shrink-0 text-right">
        <p className="text-sm font-bold text-emerald-600">
          {formatMoney(payment.amount || payment.total || 0)}
        </p>

        <div className="mt-2">
          <StatusPill status={payment.status || "paid"} />
        </div>
      </div>
    </div>
  );
}

function QuickLink({ title, description, href, icon: Icon }) {
  return (
    <Link
      href={href}
      className="flex items-center justify-between gap-3 rounded-2xl border border-slate-100 bg-white px-4 py-3 transition hover:border-violet-100 hover:bg-violet-50/40"
    >
      <div className="flex min-w-0 items-center gap-3">
        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-violet-50 text-violet-600">
          <Icon className="text-sm" />
        </span>

        <div className="min-w-0">
          <p className="truncate text-sm font-bold text-slate-900">{title}</p>

          {description ? (
            <p className="mt-1 truncate text-xs font-medium text-slate-400">
              {description}
            </p>
          ) : null}
        </div>
      </div>

      <FaArrowRight className="shrink-0 text-xs text-slate-300" />
    </Link>
  );
}

export default function AdminDashboardPage() {
  const [stats, setStats] = useState(defaultStats);
  const [users, setUsers] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [payments, setPayments] = useState([]);
  const [tickets, setTickets] = useState([]);
  const [quizzes, setQuizzes] = useState([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const loadDashboard = async () => {
    try {
      setLoading(true);
      setError("");

      const [
        dashboardRes,
        usersRes,
        bookingsRes,
        paymentsRes,
        ticketsRes,
        quizzesRes,
      ] = await Promise.allSettled([
        getAdminDashboard(),
        getAdminUsers(),
        getBookings(),
        getPayments(),
        getSupportTickets(),
        getQuizzes(),
      ]);

      if (dashboardRes.status === "fulfilled") {
        setStats({
          ...defaultStats,
          ...normalizeDashboardStats(dashboardRes.value),
        });
      }

      if (usersRes.status === "fulfilled") {
        setUsers(normalizeList(usersRes.value));
      }

      if (bookingsRes.status === "fulfilled") {
        setBookings(normalizeList(bookingsRes.value));
      }

      if (paymentsRes.status === "fulfilled") {
        setPayments(normalizeList(paymentsRes.value));
      }

      if (ticketsRes.status === "fulfilled") {
        setTickets(normalizeList(ticketsRes.value));
      }

      if (quizzesRes.status === "fulfilled") {
        setQuizzes(normalizeList(quizzesRes.value));
      }

      if (dashboardRes.status === "rejected") {
        setError(
          dashboardRes.reason?.response?.data?.message ||
            dashboardRes.reason?.message ||
            "Failed to load admin dashboard.",
        );
      }
    } catch (err) {
      setError(err?.message || "Failed to load admin dashboard.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadDashboard();
  }, []);

  const computed = useMemo(() => {
    const totalRevenue = payments.reduce((sum, payment) => {
      const amount = Number(payment.amount || payment.total || 0);
      const status = String(payment.status || "paid").toLowerCase();

      const isSuccess = ["success", "paid", "completed"].includes(status);

      return isSuccess ? sum + amount : sum;
    }, 0);

    const pendingBookings = bookings.filter(
      (item) => !item.status || item.status === "pending",
    ).length;

    const openTickets = tickets.filter(
      (item) => item.status !== "closed",
    ).length;

    const activeQuizzes = quizzes.filter(
      (item) => item.status === "active",
    ).length;

    const sortedUsers = [...users].sort(
      (a, b) => new Date(b.createdAt || 0) - new Date(a.createdAt || 0),
    );

    const sortedBookings = [...bookings].sort(
      (a, b) => new Date(b.createdAt || 0) - new Date(a.createdAt || 0),
    );

    const sortedPayments = [...payments].sort(
      (a, b) => new Date(b.createdAt || 0) - new Date(a.createdAt || 0),
    );

    return {
      totalRevenue,
      pendingBookings,
      openTickets,
      activeQuizzes,
      totalUsers: users.length,
      recentUsers: sortedUsers.slice(0, 5),
      recentBookings: sortedBookings.slice(0, 5),
      recentPayments: sortedPayments.slice(0, 5),
    };
  }, [payments, bookings, tickets, quizzes, users]);

  return (
    <main className="min-h-screen bg-[#f8f8fb] px-4 py-5 md:px-6 lg:px-8">
      <div className="mx-auto max-w-[1500px]">
        <div className="mb-6 flex flex-col justify-between gap-4 lg:flex-row lg:items-center">
          <div>
            <div className="mb-2 flex items-center gap-2 text-sm font-semibold text-slate-400">
              <span>Admin</span>
              <span>/</span>
              <span className="text-slate-600">Dashboard</span>
            </div>

            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-violet-50 text-violet-600">
                <MdDashboard className="text-2xl" />
              </div>

              <div>
                <h1 className="text-2xl font-bold tracking-tight text-slate-900 md:text-3xl">
                  Dashboard
                </h1>

                <p className="mt-1 max-w-2xl text-sm leading-6 text-slate-500">
                  Track users, bookings, payments, support tickets, instructors
                  and quiz activity from one clean admin dashboard.
                </p>
              </div>
            </div>
          </div>

          <button
            type="button"
            onClick={loadDashboard}
            disabled={loading}
            className="inline-flex items-center justify-center gap-2 rounded-2xl bg-slate-900 px-5 py-3 text-sm font-bold text-white shadow-sm transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-70"
          >
            <FaSyncAlt className={loading ? "animate-spin" : ""} />
            Refresh
          </button>
        </div>

        {error ? (
          <div className="mb-6 flex items-start gap-3 rounded-2xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm font-semibold text-rose-700">
            <FaExclamationTriangle className="mt-0.5 shrink-0" />
            <span>{error}</span>
          </div>
        ) : null}

        <section className="mb-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4">
          <StatCard
            title="Students"
            value={loading ? "..." : stats.students}
            icon={FaUserGraduate}
            href="/admin/students"
            tone="sky"
            note="Enrolled learners"
          />

          <StatCard
            title="Instructors"
            value={loading ? "..." : stats.teachers}
            icon={FaUserTie}
            href="/admin/teachers"
            tone="violet"
            note="Teaching team"
          />

          <StatCard
            title="Bookings"
            value={loading ? "..." : stats.bookings}
            icon={FaCar}
            href="/admin/bookings"
            tone="amber"
            note="Driving requests"
          />

          <StatCard
            title="Lessons"
            value={loading ? "..." : stats.lessons}
            icon={FaBookOpen}
            href="/admin/lessons"
            tone="sky"
            note="Completed lessons"
          />

          <StatCard
            title="Payments"
            value={loading ? "..." : stats.payments}
            icon={FaCreditCard}
            href="/admin/payments"
            tone="green"
            note="Payment records"
          />

          <StatCard
            title="Support"
            value={loading ? "..." : stats.supportTickets}
            icon={FaHeadset}
            href="/admin/support"
            tone="red"
            note="Open support requests"
          />

          <StatCard
            title="Pending Teachers"
            value={loading ? "..." : stats.pendingTeachers}
            icon={FaClock}
            href="/admin/teachers"
            tone="amber"
            note="Instructor review"
          />

          <StatCard
            title="Live Quizzes"
            value={loading ? "..." : computed.activeQuizzes}
            icon={MdOutlineQuiz}
            href="/admin/quizzes"
            tone="green"
            note="Active quiz content"
          />
        </section>

        <section className="mb-6 rounded-[1.4rem] border border-slate-200 bg-white p-5 shadow-[0_10px_30px_rgba(15,23,42,0.04)]">
          <div className="mb-5 flex flex-col justify-between gap-3 md:flex-row md:items-center">
            <div>
              <h2 className="text-lg font-bold text-slate-900">
                Business Overview
              </h2>

              <p className="mt-1 text-sm font-medium text-slate-400">
                Quick summary of revenue, users, bookings and support workload.
              </p>
            </div>

            <span className="w-fit rounded-full bg-violet-50 px-4 py-2 text-xs font-bold text-violet-700">
              Live Summary
            </span>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
            <CompactMetric
              label="Revenue"
              value={loading ? "..." : formatMoney(computed.totalRevenue)}
              tone="green"
              icon={FaMoneyBillWave}
            />

            <CompactMetric
              label="Users"
              value={loading ? "..." : computed.totalUsers}
              tone="violet"
              icon={FaUsers}
            />

            <CompactMetric
              label="Waiting Bookings"
              value={loading ? "..." : computed.pendingBookings}
              tone="amber"
              icon={FaClock}
            />

            <CompactMetric
              label="Open Support"
              value={loading ? "..." : computed.openTickets}
              tone="red"
              icon={FaHeadset}
            />

            <CompactMetric
              label="Live Quizzes"
              value={loading ? "..." : computed.activeQuizzes}
              tone="green"
              icon={MdOutlineQuiz}
            />
          </div>
        </section>

        {loading ? (
          <section className="grid grid-cols-1 gap-5 lg:grid-cols-3">
            <LoadingBlock />
            <LoadingBlock />
            <LoadingBlock />
          </section>
        ) : (
          <section className="grid grid-cols-1 gap-5 xl:grid-cols-[minmax(0,1fr)_minmax(0,1fr)_minmax(0,1fr)_330px]">
            <SectionCard
              title="Recent Users"
              subtitle="Latest registered accounts"
              actionHref="/admin/users"
            >
              {computed.recentUsers.length === 0 ? (
                <EmptyState text="No users found." />
              ) : (
                <div className="space-y-3">
                  {computed.recentUsers.map((user) => (
                    <RecentUserRow
                      key={user._id || user.id || user.email}
                      user={user}
                    />
                  ))}
                </div>
              )}
            </SectionCard>

            <SectionCard
              title="Recent Bookings"
              subtitle="Latest driving requests"
              actionHref="/admin/bookings"
            >
              {computed.recentBookings.length === 0 ? (
                <EmptyState text="No bookings found." />
              ) : (
                <div className="space-y-3">
                  {computed.recentBookings.map((booking) => (
                    <RecentBookingRow
                      key={booking._id || booking.id}
                      booking={booking}
                    />
                  ))}
                </div>
              )}
            </SectionCard>

            <SectionCard
              title="Recent Payments"
              subtitle="Latest transactions"
              actionHref="/admin/payments"
            >
              {computed.recentPayments.length === 0 ? (
                <EmptyState text="No payments found." />
              ) : (
                <div className="space-y-3">
                  {computed.recentPayments.map((payment) => (
                    <RecentPaymentRow
                      key={payment._id || payment.id}
                      payment={payment}
                    />
                  ))}
                </div>
              )}
            </SectionCard>

            <SectionCard title="Quick Actions" subtitle="Common admin tasks">
              <div className="space-y-3">
                <QuickLink
                  title="Create Quiz"
                  description="Add a new code test"
                  href="/admin/quizzes/create"
                  icon={MdOutlineQuiz}
                />

                <QuickLink
                  title="Manage Users"
                  description="View all user records"
                  href="/admin/users"
                  icon={FaUsers}
                />

                <QuickLink
                  title="Manage Students"
                  description="View learner records"
                  href="/admin/students"
                  icon={FaUserGraduate}
                />

                <QuickLink
                  title="Review Payments"
                  description="Check transactions"
                  href="/admin/payments"
                  icon={FaCreditCard}
                />

                <QuickLink
                  title="Support Tickets"
                  description="Respond to requests"
                  href="/admin/support"
                  icon={FaHeadset}
                />

                <QuickLink
                  title="Instructor Review"
                  description="Approve pending teachers"
                  href="/admin/teachers"
                  icon={FaCheckCircle}
                />
              </div>
            </SectionCard>
          </section>
        )}
      </div>
    </main>
  );
}
