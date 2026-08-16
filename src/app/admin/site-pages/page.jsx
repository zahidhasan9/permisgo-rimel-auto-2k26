"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { FaEdit, FaSearch } from "react-icons/fa";
import { getAdminCmsPages } from "@/features/API";
import { priorityCmsRoutes } from "@/lib/priorityCmsRoutes";

export default function DesignedPagesAdmin() {
  const [pages, setPages] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    getAdminCmsPages().then(({ data }) => setPages(data?.data || [])).finally(() => setLoading(false));
  }, []);
  const bySlug = useMemo(() => new Map(pages.map((page) => [page.slug, page])), [pages]);
  const visible = priorityCmsRoutes.filter((slug) => slug.includes(search.trim().toLowerCase()));
  return <div className="mx-auto max-w-7xl space-y-5">
    <header><h1 className="text-2xl font-black text-slate-900">Designed Public Pages</h1><p className="mt-1 text-sm text-slate-500">Edit the content and SEO of existing designed pages without changing their layout.</p></header>
    <label className="flex max-w-xl items-center gap-2 rounded-xl border bg-white px-4 shadow-sm"><FaSearch className="text-slate-400" /><input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Search designed pages…" className="w-full py-3 text-sm outline-none" /></label>
    {loading ? <p className="rounded-xl bg-white p-6">Loading pages…</p> : <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">{visible.map((slug) => { const page = bySlug.get(slug); return <Link key={slug} href={`/admin/site-pages/${slug}`} className="group flex min-h-24 items-center justify-between rounded-2xl border border-slate-200 bg-white p-4 shadow-sm transition hover:border-blue-300 hover:shadow-md"><div className="min-w-0"><p className="truncate font-black text-slate-800">/{slug}</p><div className="mt-2 flex gap-2"><span className={`rounded-full px-2 py-0.5 text-[9px] font-black uppercase ${page?.status === "published" ? "bg-green-100 text-green-700" : "bg-amber-100 text-amber-700"}`}>{page?.status || "not configured"}</span><span className="rounded-full bg-blue-50 px-2 py-0.5 text-[9px] font-black text-blue-700">EN · BN · FR</span></div></div><FaEdit className="ml-3 text-[#123f88] transition group-hover:scale-110" /></Link>; })}</div>}
  </div>;
}
