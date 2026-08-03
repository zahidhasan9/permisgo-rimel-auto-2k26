"use client";

import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import {
  FaCalendarAlt,
  FaCommentAlt,
  FaFolderOpen,
  FaUser,
} from "react-icons/fa";

import { getBlog, getBlogs } from "@/features/API";

const formatDate = (value) =>
  new Date(value).toLocaleDateString("en-GB", {
    year: "numeric",
    month: "short",
    day: "2-digit",
  });

export default function BlogDetailsPage() {
  const { blog: slug } = useParams();
  const [post, setPost] = useState(null);
  const [recentPosts, setRecentPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([getBlog(slug), getBlogs({ limit: 6 })])
      .then(([postResponse, listResponse]) => {
        const current = postResponse.data?.data;
        setPost(current);
        setRecentPosts(
          (listResponse.data?.data || [])
            .filter((item) => item.slug !== current?.slug)
            .slice(0, 5),
        );
      })
      .finally(() => setLoading(false));
  }, [slug]);

  if (loading)
    return (
      <section className="bg-white px-4 py-20 text-center text-slate-600">
        Loading blog...
      </section>
    );
  if (!post)
    return (
      <section className="bg-white px-4 py-20 text-center">
        <h1 className="text-2xl font-bold text-slate-800">Blog not found</h1>
        <Link href="/blogs" className="mt-4 inline-block text-[#174a9b]">
          Back to blogs
        </Link>
      </section>
    );

  return (
    <section className="bg-white px-4 py-12 sm:px-6 sm:py-16 lg:px-8 lg:py-[72px]">
      <div className="mx-auto grid max-w-[1180px] items-start gap-6 lg:grid-cols-[minmax(0,1fr)_270px]">
        <article className="rounded-[12px] bg-[#dfe7f3] p-4 shadow-[0_2px_4px_rgba(15,54,119,0.06)] sm:p-[18px]">
          <h1 className="text-[19px] font-extrabold leading-snug text-[#161d2a] sm:text-[21px]">
            {post.title}
          </h1>
          <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-2 text-[12px] font-medium text-slate-700 sm:text-[13px]">
            <span className="flex items-center gap-1.5">
              <FaUser className="text-[#174a9b]" />{" "}
              {post.author?.name || "PermisGo"}
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
          <div className="relative mt-4 aspect-[2.55/1] overflow-hidden rounded-[9px] bg-slate-200">
            <Image
              src={post.coverImage}
              alt={post.title}
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 850px"
              className="object-cover"
            />
          </div>
          <div
            className="blog-article pb-1 pt-5 text-[14px] leading-[1.75] text-slate-700 sm:text-[15px]"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />
        </article>
        <aside className="rounded-[12px] bg-[#dfe7f3] p-4 lg:sticky lg:top-5">
          <h2 className="rounded-[8px] bg-[#174a9b] px-4 py-3 text-center text-[15px] font-extrabold text-white">
            Our Recent Blog Post
          </h2>
          <div className="mt-4 space-y-3">
            {recentPosts.map((item) => (
              <Link
                key={item._id}
                href={`/blogs/${item.slug}`}
                className="group grid grid-cols-[76px_1fr] items-center gap-3 rounded-[9px] bg-white p-2.5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
              >
                <div className="relative h-[56px] overflow-hidden rounded-[7px]">
                  <Image
                    src={item.coverImage}
                    alt=""
                    fill
                    sizes="76px"
                    className="object-cover transition duration-500 group-hover:scale-105"
                  />
                </div>
                <h3 className="line-clamp-2 text-[12px] font-semibold leading-[1.45] text-slate-800 transition group-hover:text-[#174a9b]">
                  {item.title}
                </h3>
              </Link>
            ))}
          </div>
        </aside>
      </div>
    </section>
  );
}
