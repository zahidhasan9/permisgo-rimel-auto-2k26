import Image from "next/image";
import Link from "next/link";

// Image
import blogPage from "../../../../public/image/blog-page.jpg";

// Icons
import { FaArrowRight } from "react-icons/fa6";

export async function getPost() {
  const res = await fetch("https://jsonplaceholder.typicode.com/posts", {
    next: { revalidate: 3600 },
  });

  if (!res.ok) {
    throw new Error("Failed to fetch blog posts");
  }

  return await res.json();
}

const Blog = async () => {
  const posts = await getPost();

  const featuredPost = posts[0];
  const blogPosts = posts.slice(1, 13);

  return (
    <main className="min-h-screen bg-[#f5f5f7] px-4 py-10 sm:px-6 lg:px-10">
      <div className="mx-auto max-w-[1180px]">
        {/* Header */}
        <header className="mx-auto mb-12 max-w-[760px] text-center">
          <span className="mb-4 inline-flex rounded-full bg-white px-4 py-2 text-[12px] font-semibold tracking-wide text-slate-500 shadow-sm">
            Driving School Blog
          </span>

          <h1 className="text-[38px] font-semibold leading-[1.08] tracking-[-0.04em] text-[#1d1d1f] sm:text-[52px] lg:text-[64px]">
            Guides, tips, and stories for smarter learners.
          </h1>

          <p className="mx-auto mt-5 max-w-[620px] text-[16px] leading-7 text-[#6e6e73] sm:text-[18px]">
            Explore simple, useful, and practical driving school articles
            created to help students learn with confidence.
          </p>
        </header>

        {/* Featured Post */}
        {featuredPost && (
          <section className="mb-10">
            <Link
              href={`/blogs/${featuredPost.id}`}
              className="group grid overflow-hidden rounded-[28px] bg-white transition duration-300 hover:shadow-[0_20px_60px_rgba(0,0,0,0.08)] lg:grid-cols-2"
            >
              <div className="relative min-h-[260px] overflow-hidden sm:min-h-[340px] lg:min-h-[420px]">
                <Image
                  src={blogPage}
                  alt={featuredPost.title}
                  fill
                  priority
                  placeholder="blur"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover transition duration-700 group-hover:scale-[1.03]"
                />
              </div>

              <div className="flex flex-col justify-center p-7 sm:p-10 lg:p-12">
                <span className="mb-4 text-[13px] font-semibold text-[#0071e3]">
                  Featured Article
                </span>

                <h2 className="text-[30px] font-semibold capitalize leading-[1.12] tracking-[-0.03em] text-[#1d1d1f] sm:text-[42px]">
                  {featuredPost.title}
                </h2>

                <p className="mt-5 line-clamp-3 text-[15px] leading-7 text-[#6e6e73] sm:text-[16px]">
                  {featuredPost.body}
                </p>

                <div className="mt-7 inline-flex items-center gap-2 text-[15px] font-semibold text-[#0071e3]">
                  Read article
                  <FaArrowRight className="text-[12px] transition group-hover:translate-x-1" />
                </div>
              </div>
            </Link>
          </section>
        )}

        {/* Section Title */}
        <div className="mb-6 flex flex-col justify-between gap-3 sm:flex-row sm:items-end">
          <div>
            <h2 className="text-[28px] font-semibold tracking-[-0.03em] text-[#1d1d1f] sm:text-[36px]">
              Latest articles
            </h2>
            <p className="mt-2 text-[15px] text-[#6e6e73]">
              Organized learning resources for students.
            </p>
          </div>

          <Link
            href="#"
            className="text-[15px] font-semibold text-[#0071e3] hover:underline"
          >
            View all
          </Link>
        </div>

        {/* Blog Grid */}
        <section className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {blogPosts.map((post) => (
            <article
              key={post.id}
              className="group overflow-hidden rounded-[24px] bg-white transition duration-300 hover:-translate-y-1 hover:shadow-[0_18px_45px_rgba(0,0,0,0.07)]"
            >
              <Link href={`/blogs/${post.id}`} className="block">
                <div className="relative aspect-[16/10] overflow-hidden">
                  <Image
                    src={blogPage}
                    alt={post.title}
                    fill
                    placeholder="blur"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover transition duration-700 group-hover:scale-[1.04]"
                  />
                </div>

                <div className="p-6">
                  <div className="mb-3 flex items-center justify-between gap-3">
                    <span className="text-[12px] font-semibold text-[#0071e3]">
                      Driving Tips
                    </span>

                    <span className="text-[12px] text-[#86868b]">
                      Aug 03, 2023
                    </span>
                  </div>

                  <h3 className="line-clamp-2 text-[21px] font-semibold capitalize leading-[1.18] tracking-[-0.02em] text-[#1d1d1f]">
                    {post.title}
                  </h3>

                  <p className="mt-3 line-clamp-3 text-[14px] leading-6 text-[#6e6e73]">
                    {post.body}
                  </p>

                  <div className="mt-5 inline-flex items-center gap-2 text-[14px] font-semibold text-[#0071e3]">
                    Read more
                    <FaArrowRight className="text-[11px] transition group-hover:translate-x-1" />
                  </div>
                </div>
              </Link>
            </article>
          ))}
        </section>
      </div>
    </main>
  );
};

export default Blog;
