import Image from "next/image";
import Link from "next/link";

// Image
import blogPage from "../../../../../public/image/blog-page.jpg";

// Icon
import { FaArrowRight, FaRegCommentDots, FaUser } from "react-icons/fa";
import { MdOutlineDateRange } from "react-icons/md";

const getPost = async (blog) => {
  const res = await fetch(
    `https://jsonplaceholder.typicode.com/posts/${blog}`,
    {
      next: { revalidate: 3600 },
    },
  );

  if (!res.ok) {
    throw new Error("Failed to fetch blog post");
  }

  return await res.json();
};

const getRecentPosts = async () => {
  const res = await fetch("https://jsonplaceholder.typicode.com/posts", {
    next: { revalidate: 3600 },
  });

  if (!res.ok) {
    throw new Error("Failed to fetch recent posts");
  }

  return await res.json();
};

const SingleBlog = async ({ params }) => {
  const { blog } = await params;

  const post = await getPost(blog);
  const recentPosts = await getRecentPosts();
  const relatedPosts = recentPosts
    .filter((item) => item.id !== Number(blog))
    .slice(0, 3);

  return (
    <main className="min-h-screen bg-[#f5f5f7] px-4 py-10 sm:px-6 lg:px-10">
      <div className="mx-auto max-w-[980px]">
        {/* Back Link */}
        <div className="mb-6">
          <Link
            href="/blogs"
            className="inline-flex items-center text-[14px] font-medium text-[#0071e3] hover:underline"
          >
            ← Back to Blogs
          </Link>
        </div>

        {/* Article */}
        <article className="overflow-hidden rounded-[28px] bg-white shadow-[0_18px_50px_rgba(0,0,0,0.06)]">
          {/* Article Header */}
          <div className="px-6 pb-6 pt-8 sm:px-10 sm:pt-10">
            <span className="mb-4 inline-flex rounded-full bg-[#f5f5f7] px-4 py-2 text-[12px] font-semibold text-[#0071e3]">
              Driving School
            </span>

            <h1 className="max-w-[820px] text-[34px] font-semibold capitalize leading-[1.08] tracking-[-0.04em] text-[#1d1d1f] sm:text-[46px] lg:text-[54px]">
              {post.title}
            </h1>

            <div className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-2 text-[13px] font-medium text-[#6e6e73]">
              <span className="flex items-center gap-1.5">
                <FaUser className="text-[#0071e3]" />
                Ahmed Sadi
              </span>

              <span className="flex items-center gap-1.5">
                <MdOutlineDateRange className="text-[#0071e3]" />
                Aug 03, 2023
              </span>

              <span className="flex items-center gap-1.5">
                <FaRegCommentDots className="text-[#0071e3]" />3 Comments
              </span>
            </div>
          </div>

          {/* Image */}
          <div className="relative aspect-[16/8.5] w-full overflow-hidden">
            <Image
              src={blogPage}
              alt={post.title}
              fill
              priority
              placeholder="blur"
              sizes="(max-width: 1024px) 100vw, 980px"
              className="object-cover"
            />
          </div>

          {/* Article Body */}
          <div className="px-6 py-8 sm:px-10 sm:py-10">
            <p className="text-[17px] leading-8 text-[#424245] sm:text-[18px]">
              {post.body}
            </p>

            <p className="mt-6 text-[16px] leading-8 text-[#6e6e73]">
              Learning to drive becomes easier when students understand the
              basic rules, safe habits, and common mistakes before starting
              practical lessons. This article is designed to guide learners with
              simple and useful information.
            </p>
          </div>
        </article>

        {/* Comment Form */}
        <section className="mt-8 rounded-[28px] bg-white p-6 shadow-[0_14px_40px_rgba(0,0,0,0.05)] sm:p-8">
          <h2 className="text-[26px] font-semibold tracking-[-0.03em] text-[#1d1d1f]">
            Leave a Comment
          </h2>

          <p className="mt-2 text-[14px] text-[#6e6e73]">
            Share your thoughts about this article.
          </p>

          <form action="" className="mt-6 space-y-4">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <input
                type="text"
                placeholder="Enter your name"
                className="h-12 rounded-2xl border border-transparent bg-[#f5f5f7] px-4 text-[14px] font-medium text-[#1d1d1f] outline-none transition focus:border-[#0071e3] focus:bg-white focus:ring-4 focus:ring-[#0071e3]/10"
              />

              <input
                type="email"
                placeholder="Enter your email"
                className="h-12 rounded-2xl border border-transparent bg-[#f5f5f7] px-4 text-[14px] font-medium text-[#1d1d1f] outline-none transition focus:border-[#0071e3] focus:bg-white focus:ring-4 focus:ring-[#0071e3]/10"
              />
            </div>

            <textarea
              placeholder="Write your comment"
              rows={5}
              className="w-full resize-none rounded-2xl border border-transparent bg-[#f5f5f7] px-4 py-4 text-[14px] font-medium text-[#1d1d1f] outline-none transition focus:border-[#0071e3] focus:bg-white focus:ring-4 focus:ring-[#0071e3]/10"
            />

            <button
              type="submit"
              className="rounded-full bg-[#0071e3] px-6 py-3 text-[14px] font-semibold text-white transition hover:bg-[#0066cc]"
            >
              Post Comment
            </button>
          </form>
        </section>

        {/* Comments */}
        <section className="mt-8 rounded-[28px] bg-white p-6 shadow-[0_14px_40px_rgba(0,0,0,0.05)] sm:p-8">
          <h2 className="text-[26px] font-semibold tracking-[-0.03em] text-[#1d1d1f]">
            2 Comments
          </h2>

          <div className="mt-6 space-y-4">
            {[1, 2].map((comment) => (
              <div
                key={comment}
                className="rounded-2xl bg-[#f5f5f7] p-5 transition hover:bg-[#eeeeef]"
              >
                <small className="text-[12px] font-medium text-[#86868b]">
                  December 21, 2021 at 8:11 pm
                </small>

                <h3 className="mt-2 text-[17px] font-semibold text-[#1d1d1f]">
                  John Madword
                </h3>

                <p className="mt-2 text-[14px] leading-6 text-[#6e6e73]">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Porro
                  assumenda accusamus quis corporis unde dolor, saepe maxime
                  earum.
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Related Posts */}
        <section className="mt-10">
          <div className="mb-5 flex items-end justify-between gap-4">
            <div>
              <h2 className="text-[30px] font-semibold tracking-[-0.03em] text-[#1d1d1f]">
                Related articles
              </h2>
              <p className="mt-1 text-[14px] text-[#6e6e73]">
                More useful posts for learners.
              </p>
            </div>

            <Link
              href="/blogs"
              className="hidden text-[14px] font-semibold text-[#0071e3] hover:underline sm:inline-block"
            >
              View all
            </Link>
          </div>

          <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">
            {relatedPosts.map((item) => (
              <Link
                key={item.id}
                href={`/blogs/${item.id}`}
                className="group overflow-hidden rounded-[22px] bg-white transition duration-300 hover:-translate-y-1 hover:shadow-[0_16px_40px_rgba(0,0,0,0.07)]"
              >
                <div className="relative aspect-[16/10] overflow-hidden">
                  <Image
                    src={blogPage}
                    alt={item.title}
                    fill
                    placeholder="blur"
                    sizes="(max-width: 640px) 100vw, 33vw"
                    className="object-cover transition duration-700 group-hover:scale-[1.04]"
                  />
                </div>

                <div className="p-5">
                  <span className="text-[12px] font-semibold text-[#0071e3]">
                    Driving Tips
                  </span>

                  <h3 className="mt-2 line-clamp-2 text-[17px] font-semibold capitalize leading-6 tracking-[-0.02em] text-[#1d1d1f]">
                    {item.title}
                  </h3>

                  <div className="mt-4 inline-flex items-center gap-2 text-[13px] font-semibold text-[#0071e3]">
                    Read more
                    <FaArrowRight className="text-[11px] transition group-hover:translate-x-1" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
};

export default SingleBlog;
