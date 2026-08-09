"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FaChevronLeft, FaChevronRight, FaSearch, FaTimes } from "react-icons/fa";
import { getTeacherExams } from "@/features/API";
import { mediaUrl } from "@/utils/mediaUrl";

const filters = [
  { key: "all", label: "All" },
  { key: "upcoming", label: "Upcoming exams" },
  { key: "passed", label: "Exam passed" },
  { key: "failed", label: "Failed" },
];
const PAGE_SIZE = 10;
const formatDate = (value) => value ? new Date(value).toLocaleDateString("en-US", { weekday: "short", month: "long", day: "numeric", year: "numeric" }) : "—";
const formatTime = (value) => { const match = String(value || "").match(/^(\d{1,2}):(\d{2})/); if (!match) return ""; const hour = Number(match[1]); return `${String(hour % 12 || 12).padStart(2, "0")}:${match[2]} ${hour >= 12 ? "PM" : "AM"}`; };

export default function ExaminationList() {
  const router = useRouter();
  const [rows, setRows] = useState([]);
  const [search, setSearch] = useState("");
  const [activeFilter, setActiveFilter] = useState("all");
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => { getTeacherExams().then(({ data }) => setRows(data?.data || [])).catch((requestError) => setError(requestError.response?.data?.message || "Exams could not be loaded.")).finally(() => setLoading(false)); }, []);
  useEffect(() => { setPage(1); }, [search, activeFilter]);
  const filtered = useMemo(() => rows.filter((item) => { const name = item.student?.name || item.student?.fullName || ""; return (!search || name.toLowerCase().includes(search.toLowerCase())) && (activeFilter === "all" || item.status === activeFilter); }), [rows, search, activeFilter]);
  const pages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const visible = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  return <main className="min-h-screen overflow-x-hidden bg-[#f8fafc] px-2.5 py-4 pb-24 sm:px-6 sm:py-5 sm:pb-8 lg:px-8"><section className="mx-auto min-w-0">
    <header className="mb-4 flex min-w-0 items-center gap-3 sm:mb-5"><button type="button" onClick={() => router.back()} className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white text-[#16458f] shadow-sm"><FaChevronLeft size={14} /></button><div className="min-w-0"><h1 className="truncate text-xl font-bold text-[#16458f] sm:text-2xl">Examination List</h1><p className="mt-1 text-[11px] font-semibold text-slate-500 sm:text-xs">Booklet target score: {rows[0]?.targetScore || 60}%</p></div></header>
    <div className="mb-4 rounded-2xl bg-white p-3 shadow-sm ring-1 ring-slate-100 sm:p-4"><div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between"><div className="flex h-11 w-full min-w-0 items-center gap-3 rounded-xl bg-[#eef2f7] px-3 sm:px-4 lg:max-w-md"><FaSearch className="shrink-0 text-slate-400" size={14} /><input placeholder="Search students" value={search} onChange={(e) => setSearch(e.target.value)} className="min-w-0 flex-1 bg-transparent text-sm outline-none" />{search && <button type="button" onClick={() => setSearch("")} className="shrink-0"><FaTimes size={14} /></button>}</div><div className="flex max-w-full gap-2 overflow-x-auto pb-1 lg:flex-wrap lg:overflow-visible lg:pb-0">{filters.map((filter) => <button key={filter.key} type="button" onClick={() => setActiveFilter(filter.key)} className={`h-9 shrink-0 whitespace-nowrap rounded-xl border px-3 text-xs font-semibold sm:h-10 sm:px-4 sm:text-sm ${activeFilter === filter.key ? "border-[#16458f] bg-[#d8e6ff] text-[#16458f]" : "border-slate-200 bg-white text-slate-600"}`}>{filter.label} ({filter.key === "all" ? rows.length : rows.filter((row) => row.status === filter.key).length})</button>)}</div></div></div>
    {error && <div className="mb-4 rounded-xl bg-red-50 p-4 text-sm font-semibold text-red-700">{error}</div>}
    <div className="overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-slate-100"><div className="hidden overflow-x-auto sm:block"><table className="w-full min-w-[900px] text-left"><thead><tr className="bg-[#16458f] text-white"><Th>Student name</Th><Th>Exam center</Th><Th>Date</Th><Th>Time</Th><Th>Booklet</Th><Th>Status</Th></tr></thead><tbody className="divide-y divide-slate-100">{loading ? <tr><td colSpan="6" className="p-12 text-center text-slate-500">Loading examinations...</td></tr> : visible.length ? visible.map((item) => { const student = item.student || {}; const name = student.name || student.fullName || "Student"; return <tr key={item._id} className="hover:bg-[#f8fafc]"><Td><div className="flex items-center gap-3">{student.avatar ? <img src={mediaUrl(student.avatar)} alt="" className="h-9 w-9 rounded-full object-cover" /> : <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[#16458f] text-xs font-bold text-white">{name.charAt(0).toUpperCase()}</span>}<span className="font-bold text-slate-800">{name}</span></div></Td><Td>{item.examCenter}</Td><Td>{formatDate(item.date)}</Td><Td>{formatTime(item.startTime)} - {formatTime(item.endTime)}</Td><Td><Link href={`/teacher/students/${student._id}/booklet`} className="font-bold text-[#16458f] underline underline-offset-2">View booklet ({item.bookletAverage}%)</Link></Td><Td><StatusBadge status={item.status} /></Td></tr>; }) : <tr><td colSpan="6" className="p-12 text-center text-slate-500">No examinations found.</td></tr>}</tbody></table></div>
      <div className="space-y-3 bg-[#f8fafc] p-2.5 sm:hidden">{loading ? <div className="rounded-xl bg-white p-10 text-center text-sm text-slate-500">Loading examinations...</div> : visible.length ? visible.map((item) => <MobileExamCard key={item._id} item={item} />) : <div className="rounded-xl bg-white p-10 text-center text-sm text-slate-500">No examinations found.</div>}</div>
      <div className="flex flex-col items-center justify-between gap-3 border-t px-3 py-3 min-[390px]:flex-row sm:px-4"><p className="text-xs text-slate-500 sm:text-sm">Showing {filtered.length ? (page - 1) * PAGE_SIZE + 1 : 0}-{Math.min(page * PAGE_SIZE, filtered.length)} of {filtered.length}</p><div className="flex items-center gap-2 sm:gap-3"><button disabled={page <= 1} onClick={() => setPage((value) => value - 1)} className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#eef2f7] disabled:opacity-40"><FaChevronLeft size={12} /></button><span className="whitespace-nowrap text-xs font-bold sm:text-sm">Page {page} of {pages}</span><button disabled={page >= pages} onClick={() => setPage((value) => value + 1)} className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#eef2f7] disabled:opacity-40"><FaChevronRight size={12} /></button></div></div>
    </div>
  </section></main>;
}
function Th({ children }) { return <th className="whitespace-nowrap px-4 py-3 text-sm font-bold">{children}</th>; }
function Td({ children }) { return <td className="whitespace-nowrap px-4 py-3 text-sm font-medium text-slate-600">{children}</td>; }
function StatusBadge({ status }) { const style = status === "passed" ? "bg-emerald-100 text-emerald-700 ring-emerald-200" : status === "failed" ? "bg-red-100 text-red-700 ring-red-200" : "bg-amber-100 text-amber-800 ring-amber-200"; return <span className={`inline-flex rounded-full px-3 py-1 text-xs font-bold capitalize ring-1 ${style}`}>{status}</span>; }
function MobileExamCard({ item }) { const student = item.student || {}; const name = student.name || student.fullName || "Student"; return <article className="rounded-2xl border border-slate-100 bg-white p-3.5 shadow-sm"><div className="flex min-w-0 items-center gap-3 border-b border-slate-100 pb-3">{student.avatar ? <img src={mediaUrl(student.avatar)} alt={name} className="h-11 w-11 shrink-0 rounded-full object-cover" /> : <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#16458f] text-sm font-bold text-white">{name.charAt(0).toUpperCase()}</span>}<div className="min-w-0 flex-1"><h3 className="truncate text-sm font-extrabold text-slate-900">{name}</h3><p className="mt-1 truncate text-[11px] text-slate-500">{item.examCenter || "Exam center not set"}</p></div><StatusBadge status={item.status} /></div><dl className="mt-3 grid grid-cols-2 gap-3 text-[11px]"><div><dt className="font-bold text-slate-400">Date</dt><dd className="mt-1 font-semibold leading-4 text-slate-700">{formatDate(item.date)}</dd></div><div><dt className="font-bold text-slate-400">Time</dt><dd className="mt-1 font-semibold leading-4 text-slate-700">{formatTime(item.startTime)} - {formatTime(item.endTime)}</dd></div></dl><Link href={`/teacher/students/${student._id}/booklet`} className="mt-3 flex w-full items-center justify-center rounded-xl bg-[#16458f] py-2.5 text-xs font-bold text-white">View booklet ({item.bookletAverage}%)</Link></article>; }
