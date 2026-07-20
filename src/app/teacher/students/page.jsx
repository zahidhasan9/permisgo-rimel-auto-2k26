"use client";

import { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  FaChevronLeft,
  FaEnvelope,
  FaPhoneAlt,
  FaSearch,
  FaTimes,
} from "react-icons/fa";

import Pagination from "@/components/Pagination";
import { getTeacherStudents } from "@/features/API";
import { getErrorMessage, unwrap } from "@/features/lessonHelpers";
import { mediaUrl } from "@/utils/mediaUrl";

const filterFields = [
  { label: "Name", name: "name", placeholder: "Search name", icon: FaSearch },
  { label: "Email", name: "email", placeholder: "Search email", icon: FaEnvelope },
  { label: "Phone", name: "phone", placeholder: "Search phone", icon: FaPhoneAlt },
];
const INITIAL_META = { page: 1, limit: 10, total: 0, totalPages: 1 };

export default function Students() {
  const [filters, setFilters] = useState({ name: "", email: "", phone: "" });
  const [query, setQuery] = useState(filters);
  const [students, setStudents] = useState([]);
  const [meta, setMeta] = useState(INITIAL_META);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const router = useRouter();

  useEffect(() => {
    const timer = window.setTimeout(() => {
      setQuery(filters);
      setPage(1);
    }, 400);
    return () => window.clearTimeout(timer);
  }, [filters]);

  const loadStudents = useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      const response = await getTeacherStudents({ page, limit, ...query });
      const data = unwrap(response, []);
      setStudents(Array.isArray(data) ? data : []);
      setMeta({ ...INITIAL_META, ...(response?.data?.meta || {}) });
    } catch (requestError) {
      setStudents([]);
      setError(getErrorMessage(requestError, "Students could not be loaded."));
    } finally {
      setLoading(false);
    }
  }, [limit, page, query]);

  useEffect(() => {
    loadStudents();
  }, [loadStudents]);

  const resetFilters = () => setFilters({ name: "", email: "", phone: "" });

  return (
    <main className="min-h-screen bg-[#f8fafc] px-4 py-5 sm:px-6 lg:px-8">
      <section className="mx-auto">
        <header className="mb-5 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => router.back()}
              className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white text-[#16458f] shadow-sm transition hover:bg-blue-50"
            >
              <FaChevronLeft size={14} />
            </button>
            <div>
              <h1 className="text-2xl font-bold text-[#16458f]">Students</h1>
              <p className="mt-1 text-xs font-semibold text-slate-500">
                {meta.total} student{meta.total === 1 ? "" : "s"}
              </p>
            </div>
          </div>
        </header>

        {error && (
          <div className="mb-4 rounded-xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm font-semibold text-rose-700">
            {error}
          </div>
        )}

        <div className="mb-4 rounded-2xl bg-white p-4 shadow-sm ring-1 ring-slate-100">
          <div className="grid gap-3 md:grid-cols-3">
            {filterFields.map((field) => {
              const Icon = field.icon;
              return (
                <div key={field.name}>
                  <label className="mb-1.5 block text-xs font-bold text-slate-600">
                    {field.label}
                  </label>
                  <div className="flex h-10 items-center gap-2.5 rounded-xl border border-slate-200 bg-[#f8fafc] px-3 transition focus-within:border-[#16458f] focus-within:ring-4 focus-within:ring-blue-50">
                    <Icon size={13} className="text-[#16458f]" />
                    <input
                      type="text"
                      name={field.name}
                      value={filters[field.name]}
                      onChange={(event) =>
                        setFilters((current) => ({
                          ...current,
                          [field.name]: event.target.value,
                        }))
                      }
                      placeholder={field.placeholder}
                      className="w-full bg-transparent text-sm font-medium text-slate-700 outline-none placeholder:text-slate-400"
                    />
                  </div>
                </div>
              );
            })}
          </div>
          <div className="mt-3 flex justify-end">
            <button
              type="button"
              onClick={resetFilters}
              className="inline-flex h-9 items-center justify-center gap-2 rounded-lg bg-[#e2233d] px-4 text-xs font-bold text-white transition hover:bg-[#c91f35]"
            >
              <FaTimes size={11} /> Reset Filter
            </button>
          </div>
        </div>

        <div className="overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-slate-100">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[880px] text-left">
              <thead>
                <tr className="bg-[#16458f] text-white">
                  <TableHead>Student</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Phone</TableHead>
                  <TableHead>Course</TableHead>
                  <TableHead>Progress</TableHead>
                  <TableHead>Status</TableHead>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {loading ? (
                  <tr><td colSpan={6} className="px-4 py-10 text-center text-sm text-slate-500">Loading students...</td></tr>
                ) : students.length ? (
                  students.map((student) => (
                    <tr
                      key={student._id}
                      tabIndex={0}
                      onClick={() => router.push(`/teacher/students/${student._id}`)}
                      onKeyDown={(event) => {
                        if (event.key === "Enter") router.push(`/teacher/students/${student._id}`);
                      }}
                      className="cursor-pointer transition hover:bg-[#f8fafc] focus:bg-blue-50 focus:outline-none"
                    >
                      <TableData>
                        <div className="flex items-center gap-3">
                          {student.avatar ? (
                            <img src={mediaUrl(student.avatar)} alt="" className="h-8 w-8 rounded-full object-cover" />
                          ) : (
                            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#16458f] text-xs font-black text-white">
                              {(student.name || "S").charAt(0).toUpperCase()}
                            </div>
                          )}
                          <span className="font-bold text-slate-800">{student.name}</span>
                        </div>
                      </TableData>
                      <TableData>{student.email || "—"}</TableData>
                      <TableData>{student.phone || "—"}</TableData>
                      <TableData><span className="capitalize">{student.course}</span></TableData>
                      <TableData>
                        <div className="flex min-w-[135px] items-center gap-3">
                          <div className="h-2 w-24 overflow-hidden rounded-full bg-slate-200">
                            <div className="h-full rounded-full bg-[#16458f]" style={{ width: `${student.progress}%` }} />
                          </div>
                          <span className="text-xs font-black text-[#16458f]">{student.progress}%</span>
                        </div>
                      </TableData>
                      <TableData><StatusBadge status={student.status} /></TableData>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={6} className="px-4 py-10 text-center">
                      <h3 className="text-base font-bold text-slate-800">No students found</h3>
                      <p className="mt-1 text-sm text-slate-500">Try changing your search filters.</p>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
          <Pagination
            page={meta.page}
            limit={meta.limit}
            total={meta.total}
            totalPages={meta.totalPages}
            loading={loading}
            onPageChange={setPage}
            onLimitChange={(value) => { setLimit(value); setPage(1); }}
          />
        </div>
      </section>
    </main>
  );
}

function TableHead({ children }) {
  return <th className="whitespace-nowrap px-4 py-3 text-xs font-extrabold uppercase tracking-wide">{children}</th>;
}
function TableData({ children }) {
  return <td className="whitespace-nowrap px-4 py-3 text-sm font-medium text-slate-600">{children}</td>;
}
function StatusBadge({ status }) {
  const color =
    status === "active"
      ? "bg-emerald-50 text-emerald-700 ring-emerald-100"
      : status === "completed"
        ? "bg-blue-50 text-[#16458f] ring-blue-100"
        : status === "pending"
          ? "bg-amber-50 text-amber-700 ring-amber-100"
          : "bg-slate-100 text-slate-600 ring-slate-200";
  return <span className={`inline-flex rounded-full px-3 py-1 text-xs font-bold capitalize ring-1 ${color}`}>{status}</span>;
}
