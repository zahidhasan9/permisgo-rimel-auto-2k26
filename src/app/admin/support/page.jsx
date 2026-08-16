"use client";

import { useCallback, useEffect, useState } from "react";
import {
  FaChevronLeft,
  FaChevronRight,
  FaEnvelope,
  FaEye,
  FaXmark,
} from "react-icons/fa6";
import {
  getContactSubmissions,
  updateContactSubmissionStatus,
} from "@/features/API";

const dateTime = (value) =>
  new Intl.DateTimeFormat("en-GB", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(new Date(value));
const badge = {
  new: "bg-amber-100 text-amber-700",
  read: "bg-blue-100 text-blue-700",
  resolved: "bg-emerald-100 text-emerald-700",
};

export default function AdminSupportPage() {
  const [data, setData] = useState({ items: [], total: 0, page: 1, pages: 1 });
  const [page, setPage] = useState(1);
  const [status, setStatus] = useState("all");
  const [selected, setSelected] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const load = useCallback(() => {
    setLoading(true);
    setError("");
    getContactSubmissions({ page, limit: 10, status })
      .then((response) =>
        setData(
          response.data?.data || { items: [], total: 0, page: 1, pages: 1 },
        ),
      )
      .catch((requestError) =>
        setError(
          requestError.response?.data?.message ||
            "Contact requests could not be loaded.",
        ),
      )
      .finally(() => setLoading(false));
  }, [page, status]);
  useEffect(() => {
    load();
  }, [load]);
  const changeStatus = async (id, nextStatus) => {
    await updateContactSubmissionStatus(id, nextStatus);
    setSelected((current) =>
      current?._id === id ? { ...current, status: nextStatus } : current,
    );
    load();
  };

  return (
    <main className="min-h-screen bg-slate-50 p-4 sm:p-6">
      <div className="mx-auto max-w-7xl">
        <header className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-slate-900">
              Contact requests
            </h1>
            <p className="mt-1 text-sm text-slate-500">
              Messages submitted from the public Contact Us page.
            </p>
          </div>
          <select
            value={status}
            onChange={(event) => {
              setStatus(event.target.value);
              setPage(1);
            }}
            className="h-11 rounded-xl border border-slate-200 bg-white px-4 text-sm font-semibold"
          >
            <option value="all">All status</option>
            <option value="new">New</option>
            <option value="read">Read</option>
            <option value="resolved">Resolved</option>
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
                    "Name",
                    "Contact",
                    "Subject",
                    "Location",
                    "Received",
                    "Status",
                    "Action",
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
                  <tr key={item._id} className="hover:bg-slate-50">
                    <td className="px-4 py-4 font-bold text-slate-800">
                      {item.firstName} {item.lastName}
                    </td>
                    <td className="px-4 py-4">
                      <a
                        href={`mailto:${item.email}`}
                        className="block text-[#174a9b]"
                      >
                        {item.email}
                      </a>
                      <span className="text-xs text-slate-500">
                        {item.phone}
                      </span>
                    </td>
                    <td className="max-w-[220px] truncate px-4 py-4">
                      {item.subject}
                    </td>
                    <td className="px-4 py-4 text-slate-600">
                      {item.location}
                    </td>
                    <td className="whitespace-nowrap px-4 py-4 text-xs text-slate-500">
                      {dateTime(item.createdAt)}
                    </td>
                    <td className="px-4 py-4">
                      <span
                        className={`rounded-full px-2.5 py-1 text-[10px] font-bold uppercase ${badge[item.status]}`}
                      >
                        {item.status}
                      </span>
                    </td>
                    <td className="px-4 py-4">
                      <button
                        type="button"
                        onClick={() => {
                          setSelected(item);
                          if (item.status === "new")
                            changeStatus(item._id, "read");
                        }}
                        className="inline-flex h-9 items-center gap-2 rounded-lg bg-blue-50 px-3 text-xs font-bold text-[#174a9b]"
                      >
                        <FaEye /> View
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {loading && (
            <p className="p-12 text-center text-sm text-slate-500">
              Loading contact requests...
            </p>
          )}
          {!loading && !data.items.length && (
            <div className="p-12 text-center">
              <FaEnvelope className="mx-auto text-3xl text-slate-300" />
              <p className="mt-3 text-sm font-semibold text-slate-500">
                No contact requests found.
              </p>
            </div>
          )}
          <footer className="flex items-center justify-between border-t border-slate-100 px-4 py-4 text-xs text-slate-500">
            <span>{data.total} requests</span>
            <div className="flex items-center gap-2">
              <button
                disabled={page <= 1}
                onClick={() => setPage((value) => value - 1)}
                className="rounded-lg border p-2 disabled:opacity-40"
              >
                <FaChevronLeft />
              </button>
              <strong>
                Page {data.page} of {data.pages}
              </strong>
              <button
                disabled={page >= data.pages}
                onClick={() => setPage((value) => value + 1)}
                className="rounded-lg border p-2 disabled:opacity-40"
              >
                <FaChevronRight />
              </button>
            </div>
          </footer>
        </section>
      </div>
      {selected && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-950/55 p-4">
          <div className="relative max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-2xl bg-white p-6 shadow-2xl">
            <button
              onClick={() => setSelected(null)}
              className="absolute right-5 top-5 text-slate-400"
            >
              <FaXmark />
            </button>
            <h2 className="pr-8 text-xl font-bold text-slate-900">
              {selected.subject}
            </h2>
            <div className="mt-5 grid gap-3 rounded-xl bg-slate-50 p-4 text-sm sm:grid-cols-2">
              <p>
                <strong>Name:</strong> {selected.firstName} {selected.lastName}
              </p>
              <p>
                <strong>Email:</strong> {selected.email}
              </p>
              <p>
                <strong>Phone:</strong> {selected.phone}
              </p>
              <p>
                <strong>Location:</strong> {selected.location}
              </p>
              <p className="sm:col-span-2">
                <strong>Received:</strong> {dateTime(selected.createdAt)}
              </p>
            </div>
            <div className="mt-5 whitespace-pre-wrap rounded-xl border border-slate-200 p-4 text-sm leading-7 text-slate-700">
              {selected.description}
            </div>
            <div className="mt-5 flex flex-wrap gap-3">
              <a
                href={`mailto:${selected.email}?subject=${encodeURIComponent(`Re: ${selected.subject}`)}`}
                className="rounded-xl bg-[#174a9b] px-5 py-3 text-sm font-bold text-white"
              >
                Reply by email
              </a>
              <button
                onClick={() => changeStatus(selected._id, "resolved")}
                disabled={selected.status === "resolved"}
                className="rounded-xl bg-emerald-600 px-5 py-3 text-sm font-bold text-white disabled:opacity-50"
              >
                Mark resolved
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
