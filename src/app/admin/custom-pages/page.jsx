"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { FaEdit, FaPlus } from "react-icons/fa";
import { getAdminCmsPages } from "@/features/API";
import { priorityCmsRouteSet } from "@/lib/priorityCmsRoutes";

export default function CustomPagesAdmin() {
  const [pages, setPages] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => { getAdminCmsPages().then(({ data }) => setPages(data?.data || [])).finally(() => setLoading(false)); }, []);
  const customPages = useMemo(() => pages.filter((page) => !priorityCmsRouteSet.has(page.slug)), [pages]);
  return <div className="mx-auto max-w-7xl space-y-5">
    <header className="flex flex-col justify-between gap-3 sm:flex-row sm:items-end"><div><h1 className="text-2xl font-black">Custom Pages CMS</h1><p className="mt-1 text-sm text-slate-500">Create new content pages without affecting existing designed pages.</p></div><Link href="/admin/custom-pages/new" className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#123f88] px-5 py-3 text-sm font-bold text-white"><FaPlus /> Add new page</Link></header>
    {loading ? <p className="rounded-xl bg-white p-6">Loading…</p> : customPages.length ? <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">{customPages.map((page) => <Link key={page._id} href={`/admin/custom-pages/${page.slug}`} className="flex items-center justify-between rounded-2xl border bg-white p-4 shadow-sm"><div><p className="font-black">/{page.slug === "home" ? "" : page.slug}</p><p className="mt-1 text-xs uppercase text-slate-400">{page.status}</p></div><FaEdit className="text-[#123f88]" /></Link>)}</div> : <div className="rounded-2xl border border-dashed bg-white p-10 text-center text-slate-500">No custom pages yet. Create the first one.</div>}
  </div>;
}
