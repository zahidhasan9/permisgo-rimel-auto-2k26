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
    getAdminCmsPages()
      .then(({ data }) => setPages(data?.data || []))
      .finally(() => setLoading(false));
  }, []);
  const bySlug = useMemo(
    () => new Map(pages.map((page) => [page.slug, page])),
    [pages],
  );
  const visible = priorityCmsRoutes.filter((slug) =>
    slug.includes(search.trim().toLowerCase()),
  );
  return (
    <div className="mx-auto max-w-7xl space-y-5">
      <header className="flex flex-col gap-4 rounded-2xl bg-gradient-to-r from-[#123f88] to-[#2563c9] p-5 text-white sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-black">Website Page Editor</h1>
          <p className="mt-1 text-sm text-blue-100">
            Edit the content and SEO of existing pages without changing their layout.
          </p>
        </div>
        <Link
          href="/admin/site-pages/home"
          className="inline-flex min-h-11 shrink-0 items-center justify-center gap-2 rounded-xl bg-white px-5 text-sm font-black text-[#123f88] shadow-sm transition hover:bg-blue-50"
        >
          <FaEdit /> Edit Home Page
        </Link>
      </header>
      <label className="flex max-w-xl items-center gap-2 rounded-xl border bg-white px-4 shadow-sm">
        <FaSearch className="text-slate-400" />
        <input
          value={search}
          onChange={(event) => setSearch(event.target.value)}
          placeholder="Search designed pages…"
          className="w-full py-3 text-sm outline-none"
        />
      </label>
      {loading ? (
        <p className="rounded-xl bg-white p-6">Loading pages…</p>
      ) : (
        <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
          {visible.map((slug) => {
            const page = bySlug.get(slug);
            return (
              <Link
                key={slug}
                href={`/admin/site-pages/${slug}`}
                className="group flex min-h-24 items-center justify-between rounded-2xl border border-slate-200 bg-white p-4 shadow-sm transition hover:border-blue-300 hover:shadow-md"
              >
                <div className="min-w-0">
                  <p className="truncate font-black text-slate-800">
                    {slug === "home" ? "Home Page ( / )" : `/${slug}`}
                  </p>
                  <div className="mt-2 flex gap-2">
                    <span
                      className={`rounded-full px-2 py-0.5 text-[9px] font-black uppercase ${page?.status === "published" ? "bg-green-100 text-green-700" : "bg-amber-100 text-amber-700"}`}
                    >
                      {page?.status || "not configured"}
                    </span>
                    <span className="rounded-full bg-blue-50 px-2 py-0.5 text-[9px] font-black text-blue-700">
                      EN · BN · FR
                    </span>
                  </div>
                </div>
                <FaEdit className="ml-3 text-[#123f88] transition group-hover:scale-110" />
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}
