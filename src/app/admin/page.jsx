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

  return [];
}

function formatDate(date) {
  if (!date) return "-";

  return new Date(date).toLocaleDateString("en-US", {
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

function StatCard({ title, value, icon: Icon, href, tone = "blue", note }) {
  const toneClass =
    tone === "green"
      ? "bg-[#ECFDF3] text-[#027A48]"
      : tone === "red"
        ? "bg-[#FEF3F2] text-[#B42318]"
        : tone === "amber"
          ? "bg-[#FFFAEB] text-[#B54708]"
          : tone === "purple"
            ? "bg-[#F4F3FF] text-[#5925DC]"
            : "bg-[#EFF6FF] text-[#175CD3]";

  const card = (
    <div className="rounded-[18px] border border-black/[0.06] bg-white/90 p-4 shadow-[0_8px_22px_rgba(16,24,40,0.04)] transition hover:bg-white">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <p className="text-[12px] font-semibold text-[#6E6E73]">{title}</p>

          <h3 className="mt-1 text-[28px] font-semibold leading-none tracking-[-0.03em] text-[#1D1D1F]">
            {value}
          </h3>

          {note ? (
            <p className="mt-2 text-xs font-medium text-[#86868B]">{note}</p>
          ) : null}
        </div>

        <div
          className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl ${toneClass}`}
        >
          <Icon size={18} />
        </div>
      </div>
    </div>
  );

  if (!href) return card;

  return <Link href={href}>{card}</Link>;
}

function CompactMetric({ label, value, tone = "default" }) {
  const textClass =
    tone === "green"
      ? "text-[#027A48]"
      : tone === "red"
        ? "text-[#B42318]"
        : tone === "amber"
          ? "text-[#B54708]"
          : "text-[#175CD3]";

  return (
    <div className="rounded-[16px] border border-black/[0.06] bg-white/90 px-4 py-3 shadow-[0_6px_18px_rgba(16,24,40,0.035)]">
      <p className="text-[12px] font-semibold text-[#6E6E73]">{label}</p>
      <p
        className={`mt-1 text-[18px] font-semibold tracking-[-0.02em] ${textClass}`}
      >
        {value}
      </p>
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
    <section className="rounded-[20px] border border-black/[0.06] bg-white/90 shadow-[0_8px_24px_rgba(16,24,40,0.04)]">
      <div className="flex items-center justify-between gap-3 border-b border-black/[0.06] px-4 py-3">
        <div>
          <h2 className="text-[15px] font-semibold tracking-[-0.01em] text-[#1D1D1F]">
            {title}
          </h2>

          {subtitle ? (
            <p className="mt-0.5 text-xs font-medium text-[#86868B]">
              {subtitle}
            </p>
          ) : null}
        </div>

        {actionHref ? (
          <Link
            href={actionHref}
            className="text-xs font-semibold text-[#175CD3] hover:underline"
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
    <div className="animate-pulse rounded-[20px] border border-black/[0.06] bg-white/90 p-4">
      <div className="h-4 w-1/3 rounded bg-slate-200" />

      <div className="mt-4 space-y-3">
        <div className="h-11 rounded-xl bg-slate-200" />
        <div className="h-11 rounded-xl bg-slate-200" />
        <div className="h-11 rounded-xl bg-slate-200" />
      </div>
    </div>
  );
}

function StatusPill({ status }) {
  const normalized = String(status || "pending").toLowerCase();

  const className =
    normalized === "confirmed" ||
    normalized === "success" ||
    normalized === "paid" ||
    normalized === "completed" ||
    normalized === "active"
      ? "bg-[#ECFDF3] text-[#027A48]"
      : normalized === "cancelled" ||
          normalized === "failed" ||
          normalized === "closed"
        ? "bg-[#FEF3F2] text-[#B42318]"
        : "bg-[#FFFAEB] text-[#B54708]";

  return (
    <span
      className={`inline-flex rounded-full px-2.5 py-1 text-[10px] font-semibold uppercase ${className}`}
    >
      {normalized}
    </span>
  );
}

function RecentUserRow({ user }) {
  return (
    <div className="grid grid-cols-[1fr_auto] items-center gap-3 border-b border-black/[0.05] py-3 last:border-b-0">
      <div className="min-w-0">
        <p className="line-clamp-1 text-sm font-semibold text-[#1D1D1F]">
          {user.name || user.fullName || user.email || "Unnamed user"}
        </p>

        <p className="mt-0.5 line-clamp-1 text-xs font-medium text-[#86868B]">
          {user.email || "-"}
        </p>
      </div>

      <div className="text-right">
        <span className="rounded-full bg-[#EFF6FF] px-2.5 py-1 text-[10px] font-semibold uppercase text-[#175CD3]">
          {user.role || "user"}
        </span>

        <p className="mt-1 text-xs font-medium text-[#86868B]">
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

  return (
    <div className="grid grid-cols-[1fr_auto] items-center gap-3 border-b border-black/[0.05] py-3 last:border-b-0">
      <div className="min-w-0">
        <p className="line-clamp-1 text-sm font-semibold text-[#1D1D1F]">
          {studentName}
        </p>

        <p className="mt-0.5 line-clamp-1 text-xs font-medium text-[#86868B]">
          {booking.location || booking.pickupLocation || "Driving booking"}
        </p>
      </div>

      <div className="text-right">
        <StatusPill status={booking.status} />

        <p className="mt-1 text-xs font-medium text-[#86868B]">
          {formatDate(booking.createdAt)}
        </p>
      </div>
    </div>
  );
}

function RecentPaymentRow({ payment }) {
  return (
    <div className="grid grid-cols-[1fr_auto] items-center gap-3 border-b border-black/[0.05] py-3 last:border-b-0">
      <div className="min-w-0">
        <p className="line-clamp-1 text-sm font-semibold text-[#1D1D1F]">
          {payment.user?.name ||
            payment.student?.name ||
            payment.user?.email ||
            "Payment"}
        </p>

        <p className="mt-0.5 text-xs font-medium text-[#86868B]">
          {formatDate(payment.createdAt)}
        </p>
      </div>

      <div className="text-right">
        <p className="text-sm font-semibold text-[#1D1D1F]">
          {formatMoney(payment.amount || payment.total || 0)}
        </p>

        <div className="mt-1">
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
      className="flex items-center justify-between rounded-2xl border border-black/[0.06] bg-[#F9FAFB] px-3 py-3 transition hover:bg-white"
    >
      <div className="flex min-w-0 items-center gap-3">
        <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-2xl bg-white text-[#175CD3] shadow-[0_4px_12px_rgba(16,24,40,0.05)]">
          <Icon size={15} />
        </span>

        <div className="min-w-0">
          <p className="line-clamp-1 text-sm font-semibold text-[#1D1D1F]">
            {title}
          </p>
          {description ? (
            <p className="mt-0.5 line-clamp-1 text-xs font-medium text-[#86868B]">
              {description}
            </p>
          ) : null}
        </div>
      </div>

      <FaArrowRight size={11} className="shrink-0 text-[#A1A1AA]" />
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
          ...(getData(dashboardRes.value) || {}),
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
            "Failed to load admin dashboard",
        );
      }
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
    <main className="min-h-screen bg-[#F5F5F7] px-4 py-5 font-sans text-[#1D1D1F] sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <header className="mb-5 rounded-[22px] border border-black/[0.06] bg-white/90 px-5 py-4 shadow-[0_8px_24px_rgba(16,24,40,0.04)]">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-[18px] bg-[#EFF6FF] text-[#175CD3]">
                <MdDashboard size={22} />
              </div>

              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#86868B]">
                  Admin
                </p>

                <h1 className="mt-1 text-2xl font-semibold tracking-[-0.04em] text-[#1D1D1F]">
                  Dashboard
                </h1>

                <p className="mt-1 text-sm font-medium text-[#6E6E73]">
                  A clear view of your users, bookings, payments, support, and
                  quiz activity.
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={loadDashboard}
              className="inline-flex h-10 items-center justify-center gap-2 rounded-full border border-black/[0.08] bg-white px-4 text-xs font-semibold text-[#175CD3] transition hover:bg-[#F9FAFB]"
            >
              <FaSyncAlt size={12} />
              Refresh
            </button>
          </div>
        </header>

        {error ? (
          <div className="mb-4 rounded-[18px] border border-red-100 bg-[#FEF3F2] p-4 text-sm font-semibold text-[#B42318]">
            {error}
          </div>
        ) : null}

        <section className="mb-4 grid grid-cols-2 gap-3 md:grid-cols-4 xl:grid-cols-7">
          <StatCard
            title="Students"
            value={loading ? "..." : stats.students}
            icon={FaUserGraduate}
            href="/admin/students"
            tone="blue"
            note="Enrolled learners"
          />

          <StatCard
            title="Instructors"
            value={loading ? "..." : stats.teachers}
            icon={FaUserTie}
            href="/admin/teachers"
            tone="purple"
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
            tone="blue"
            note="Scheduled sessions"
          />

          <StatCard
            title="Payments"
            value={loading ? "..." : stats.payments}
            icon={FaCreditCard}
            href="/admin/payments"
            tone="green"
            note="Transactions"
          />

          <StatCard
            title="Support"
            value={loading ? "..." : stats.supportTickets}
            icon={FaHeadset}
            href="/admin/support"
            tone="red"
            note="User requests"
          />

          <StatCard
            title="Pending"
            value={loading ? "..." : stats.pendingTeachers}
            icon={FaClock}
            href="/admin/teachers"
            tone="amber"
            note="Instructor review"
          />
        </section>

        <section className="mb-5 grid grid-cols-2 gap-3 md:grid-cols-5">
          <CompactMetric
            label="Revenue"
            value={loading ? "..." : formatMoney(computed.totalRevenue)}
            tone="green"
          />

          <CompactMetric
            label="Users"
            value={loading ? "..." : computed.totalUsers}
          />

          <CompactMetric
            label="Waiting bookings"
            value={loading ? "..." : computed.pendingBookings}
            tone="amber"
          />

          <CompactMetric
            label="Open support"
            value={loading ? "..." : computed.openTickets}
            tone="red"
          />

          <CompactMetric
            label="Live quizzes"
            value={loading ? "..." : computed.activeQuizzes}
          />
        </section>

        {loading ? (
          <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
            <LoadingBlock />
            <LoadingBlock />
            <LoadingBlock />
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-4 xl:grid-cols-[1fr_1fr_1fr_330px]">
            <SectionCard
              title="Recent users"
              subtitle="Latest accounts"
              actionHref="/admin/users"
            >
              {computed.recentUsers.length === 0 ? (
                <p className="rounded-2xl bg-[#F9FAFB] p-4 text-sm font-medium text-[#86868B]">
                  No users found.
                </p>
              ) : (
                computed.recentUsers.map((user) => (
                  <RecentUserRow
                    key={user._id || user.id || user.email}
                    user={user}
                  />
                ))
              )}
            </SectionCard>

            <SectionCard
              title="Recent bookings"
              subtitle="Latest driving requests"
              actionHref="/admin/bookings"
            >
              {computed.recentBookings.length === 0 ? (
                <p className="rounded-2xl bg-[#F9FAFB] p-4 text-sm font-medium text-[#86868B]">
                  No bookings found.
                </p>
              ) : (
                computed.recentBookings.map((booking) => (
                  <RecentBookingRow
                    key={booking._id || booking.id}
                    booking={booking}
                  />
                ))
              )}
            </SectionCard>

            <SectionCard
              title="Recent payments"
              subtitle="Latest transactions"
              actionHref="/admin/payments"
            >
              {computed.recentPayments.length === 0 ? (
                <p className="rounded-2xl bg-[#F9FAFB] p-4 text-sm font-medium text-[#86868B]">
                  No payments found.
                </p>
              ) : (
                computed.recentPayments.map((payment) => (
                  <RecentPaymentRow
                    key={payment._id || payment.id}
                    payment={payment}
                  />
                ))
              )}
            </SectionCard>

            <SectionCard title="Actions" subtitle="Common admin tasks">
              <div className="space-y-2">
                <QuickLink
                  title="Create quiz"
                  description="Add a new code test"
                  href="/admin/quizzes/create"
                  icon={MdOutlineQuiz}
                />

                <QuickLink
                  title="Manage students"
                  description="View learner records"
                  href="/admin/students"
                  icon={FaUsers}
                />

                <QuickLink
                  title="Review payments"
                  description="Check transactions"
                  href="/admin/payments"
                  icon={FaCreditCard}
                />

                <QuickLink
                  title="Support tickets"
                  description="Respond to requests"
                  href="/admin/support"
                  icon={FaHeadset}
                />

                <QuickLink
                  title="Instructor review"
                  description="Approve pending teachers"
                  href="/admin/teachers"
                  icon={FaCheckCircle}
                />

                <QuickLink
                  title="Pending issues"
                  description="Resolve open problems"
                  href="/admin/support"
                  icon={FaExclamationTriangle}
                />
              </div>
            </SectionCard>
          </div>
        )}
      </div>
    </main>
  );
}
