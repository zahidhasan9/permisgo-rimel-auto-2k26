"use client";

import { useCallback, useEffect, useState } from "react";
import { getAdminAppointments, updateAppointmentStatus } from "@/features/API";

const statuses = ["pending", "confirmed", "completed", "cancelled"];
const formatDate = (value) =>
  new Intl.DateTimeFormat("en-GB", { dateStyle: "medium" }).format(
    new Date(value),
  );

export default function AdminAppointmentsPage() {
  const [data, setData] = useState({ items: [], total: 0, page: 1, pages: 1 });
  const [page, setPage] = useState(1);
  const [status, setStatus] = useState("all");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const load = useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      const response = await getAdminAppointments({ page, limit: 10, status });
      setData(
        response.data?.data || { items: [], total: 0, page: 1, pages: 1 },
      );
    } catch (requestError) {
      setError(
        requestError.response?.data?.message ||
          "Appointments could not be loaded.",
      );
    } finally {
      setLoading(false);
    }
  }, [page, status]);

  useEffect(() => {
    load();
  }, [load]);

  const changeStatus = async (id, nextStatus) => {
    try {
      await updateAppointmentStatus(id, nextStatus);
      await load();
    } catch (requestError) {
      setError(
        requestError.response?.data?.message || "Status could not be updated.",
      );
    }
  };

  return (
    <main className="min-h-screen bg-slate-50 p-4 sm:p-6">
      <div className="mx-auto ">
        <header className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-slate-900">Appointments</h1>
            <p className="mt-1 text-sm text-slate-500">
              Requests submitted from the public appointment page.
            </p>
          </div>
          <select
            value={status}
            onChange={(e) => {
              setStatus(e.target.value);
              setPage(1);
            }}
            className="h-11 rounded-xl border border-slate-200 bg-white px-4 text-sm font-semibold"
          >
            <option value="all">All status</option>
            {statuses.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>
        </header>
        {error && (
          <p className="mt-5 rounded-xl bg-red-50 p-4 text-sm font-semibold text-red-700">
            {error}
          </p>
        )}
        <section className="mt-6 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
          <div className="overflow-x-auto">
            <table className="min-w-full text-left text-sm">
              <thead className="bg-[#174a9b] text-white">
                <tr>
                  {[
                    "Customer",
                    "Course / Instructor",
                    "Schedule",
                    "Contact",
                    "Notes",
                    "Status",
                  ].map((title) => (
                    <th
                      key={title}
                      className="whitespace-nowrap px-4 py-4 text-xs font-bold"
                    >
                      {title}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {data.items.map((item) => (
                  <tr key={item._id} className="align-top hover:bg-slate-50">
                    <td className="px-4 py-4 font-bold text-slate-800">
                      {item.name}
                    </td>
                    <td className="px-4 py-4">
                      <strong>{item.courseTitle}</strong>
                      <span className="mt-1 block text-xs text-slate-500">
                        {item.instructor}
                      </span>
                    </td>
                    <td className="whitespace-nowrap px-4 py-4">
                      {formatDate(item.appointmentDate)}
                      <span className="mt-1 block text-xs text-slate-500">
                        {item.appointmentTime} · {item.duration} min
                      </span>
                    </td>
                    <td className="px-4 py-4">
                      <a
                        className="text-[#174a9b]"
                        href={`mailto:${item.email}`}
                      >
                        {item.email}
                      </a>
                      <span className="block text-xs text-slate-500">
                        {item.phone}
                      </span>
                    </td>
                    <td className="max-w-[240px] whitespace-pre-wrap px-4 py-4 text-xs text-slate-600">
                      {item.notes || "—"}
                    </td>
                    <td className="px-4 py-4">
                      <select
                        value={item.status}
                        onChange={(e) => changeStatus(item._id, e.target.value)}
                        className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs font-bold"
                      >
                        {statuses.map((value) => (
                          <option key={value} value={value}>
                            {value}
                          </option>
                        ))}
                      </select>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {loading && (
            <p className="p-12 text-center text-sm text-slate-500">
              Loading appointments...
            </p>
          )}
          {!loading && !data.items.length && (
            <p className="p-12 text-center text-sm font-semibold text-slate-500">
              No appointments found.
            </p>
          )}
          <footer className="flex items-center justify-between border-t border-slate-100 px-4 py-4 text-xs text-slate-500">
            <span>{data.total} appointments</span>
            <div className="flex items-center gap-3">
              <button
                disabled={page <= 1}
                onClick={() => setPage((value) => value - 1)}
                className="rounded-lg border px-3 py-2 disabled:opacity-40"
              >
                Previous
              </button>
              <strong>
                Page {data.page} of {data.pages}
              </strong>
              <button
                disabled={page >= data.pages}
                onClick={() => setPage((value) => value + 1)}
                className="rounded-lg border px-3 py-2 disabled:opacity-40"
              >
                Next
              </button>
            </div>
          </footer>
        </section>
      </div>
    </main>
  );
}
