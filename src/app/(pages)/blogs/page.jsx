"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import {
  FaCalendarAlt,
  FaCommentAlt,
  FaFolderOpen,
  FaUser,
} from "react-icons/fa";

import { getBlogs } from "@/features/API";
import useCurrentLanguage from "@/hooks/useCurrentLanguage";

const formatDate = (value) =>
  new Date(value).toLocaleDateString("en-GB", {
    year: "numeric",
    month: "short",
    day: "2-digit",
  });

function PostMeta({ post }) {
  return (
    <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-2 text-[12px] font-medium text-slate-700 sm:text-[13px]">
      <span className="flex items-center gap-1.5">
        <FaUser className="text-[#174a9b]" /> {post.author?.name || "PermisGo"}
      </span>
      <span className="flex items-center gap-1.5">
        <FaCalendarAlt className="text-[#174a9b]" />{" "}
        {formatDate(post.publishedAt || post.createdAt)}
      </span>
      <span className="flex items-center gap-1.5">
        <FaFolderOpen className="text-[#174a9b]" /> Driving school
      </span>
      <span className="flex items-center gap-1.5">
        <FaCommentAlt className="text-[#174a9b]" /> No comments
      </span>
    </div>
  );
}

export default function BlogsPage() {
  const language = useCurrentLanguage();
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!language) return;
    let active = true;
    setLoading(true);
    getBlogs({ limit: 50, lang: language })
      .then(({ data }) => {
        if (active) setPosts(data?.data || []);
      })
      .finally(() => {
        if (active) setLoading(false);
      });
    return () => {
      active = false;
    };
  }, [language]);

  const recentPosts = posts.slice(0, 5);
  return (
    <section className="bg-white px-4 py-12 sm:px-6 sm:py-16 lg:px-8 lg:py-[72px]">
      <div className="mx-auto grid max-w-[1180px] items-start gap-6 lg:grid-cols-[minmax(0,1fr)_270px]">
        <div className="space-y-7">
          {loading && (
            <p className="rounded-[12px] bg-[#dfe7f3] p-10 text-center text-slate-600">
              Loading blogs...
            </p>
          )}
          {!loading && posts.length === 0 && (
            <p className="rounded-[12px] bg-[#dfe7f3] p-10 text-center text-slate-600">
              No published blogs yet.
            </p>
          )}
          {posts.map((post, index) => (
            <article
              key={post._id}
              className="rounded-[12px] bg-[#dfe7f3] p-4 shadow-[0_2px_4px_rgba(15,54,119,0.06)] sm:p-[18px]"
            >
              <h2
                data-no-translate
                className="text-[17px] font-extrabold leading-snug text-[#161d2a] sm:text-[19px]"
              >
                <Link
                  href={`/blogs/${post.slug}`}
                  className="transition hover:text-[#174a9b]"
                >
                  {post.title}
                </Link>
              </h2>
              <PostMeta post={post} />
              <Link
                href={`/blogs/${post.slug}`}
                className="relative mt-4 block aspect-[2.55/1] overflow-hidden rounded-[9px] bg-slate-200"
              >
                <Image
                  src={post.coverImage}
                  alt={post.title}
                  fill
                  priority={index === 0}
                  sizes="(max-width: 1024px) 100vw, 850px"
                  className="object-cover transition duration-500 hover:scale-[1.02]"
                />
              </Link>
              <p
                data-no-translate
                className="mt-4 line-clamp-2 text-[13px] leading-[1.65] text-slate-700 sm:text-[14px]"
              >
                {post.excerpt || post.content}
              </p>
              <Link
                href={`/blogs/${post.slug}`}
                className="mt-3 inline-flex rounded-[7px] bg-[#e2233d] px-5 py-2.5 text-[12px] font-bold text-white shadow-sm transition hover:-translate-y-0.5 hover:bg-[#174a9b]"
              >
                Read More
              </Link>
            </article>
          ))}
        </div>
        <aside className="rounded-[12px] bg-[#dfe7f3] p-4 lg:sticky lg:top-5">
          <h2 className="rounded-[8px] bg-[#174a9b] px-4 py-3 text-center text-[15px] font-extrabold text-white">
            Our Recent Blog Post
          </h2>
          <div className="mt-4 space-y-3">
            {recentPosts.map((post) => (
              <Link
                key={post._id}
                href={`/blogs/${post.slug}`}
                className="group grid grid-cols-[76px_1fr] items-center gap-3 rounded-[9px] bg-white p-2.5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
              >
                <div className="relative h-[56px] overflow-hidden rounded-[7px]">
                  <Image
                    src={post.coverImage}
                    alt=""
                    fill
                    sizes="76px"
                    className="object-cover transition duration-500 group-hover:scale-105"
                  />
                </div>
                <h3 className="line-clamp-2 text-[12px] font-semibold leading-[1.45] text-slate-800 transition group-hover:text-[#174a9b]">
                  {post.title}
                </h3>
              </Link>
            ))}
          </div>
        </aside>
      </div>
    </section>
  );
}
