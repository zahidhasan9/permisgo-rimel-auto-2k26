import Image from "next/image";
import Link from "next/link";
import {
  FaCalendarAlt,
  FaCommentAlt,
  FaFolderOpen,
  FaUser,
} from "react-icons/fa";

import blogPage from "../../../../public/image/blog-page.jpg";
import carDriver from "../../../../public/image/car-driver.jpg";
import car from "../../../../public/image/car.jpg";
import drivingInstructor from "../../../../public/image/driving-instructor.webp";
import roadQuestion from "../../../../public/image/road-question.png";

const posts = [
  {
    id: 1,
    title: "10 Tips to Pass Your Driving Test on the First Try",
    image: blogPage,
    excerpt:
      "Passing your driving test on the first attempt is a goal for many learners. With the right preparation, mindset, and guidance, you can significantly increase your chances of success.",
  },
  {
    id: 2,
    title: "Step-by-Step Guide to Passing Your Driving Test",
    image: carDriver,
    excerpt:
      "From your first lesson to test day, discover the practical steps that help new drivers build confidence, develop safe habits, and stay calm behind the wheel.",
  },
  {
    id: 3,
    title: "Common Traffic Mistakes and How to Avoid Them",
    image: car,
    excerpt:
      "Small mistakes can quickly become unsafe habits. Learn the errors instructors see most often and the simple techniques you can use to correct them early.",
  },
  {
    id: 4,
    title: "Your Complete Guide to Becoming a Confident Driver",
    image: blogPage,
    excerpt:
      "Confidence comes from preparation and consistent practice. Use this guide to strengthen your observation, decision-making, and vehicle control skills.",
  },
  {
    id: 5,
    title: "How to Start Driving: The First Time Learner's Guide",
    image: drivingInstructor,
    excerpt:
      "Starting your driving journey can feel overwhelming. We explain what to expect from your first lesson and how to make every minute of training count.",
  },
  {
    id: 6,
    title: "Essential Road Signs Every Learner Should Know",
    image: roadQuestion,
    excerpt:
      "Recognising road signs quickly is essential for safe driving and theory test success. Review the signs and signals every learner should understand.",
  },
];

const recentPosts = posts.slice(1, 6);

function PostMeta() {
  return (
    <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-2 text-[12px] font-medium text-slate-700 sm:text-[13px]">
      <span className="flex items-center gap-1.5">
        <FaUser className="text-[#174a9b]" /> Ahmed Sadi
      </span>
      <span className="flex items-center gap-1.5">
        <FaCalendarAlt className="text-[#174a9b]" /> 2023-08-03
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
  return (
    <section className="bg-white px-4 py-12 sm:px-6 sm:py-16 lg:px-8 lg:py-[72px]">
      <div className="mx-auto grid max-w-[1180px] items-start gap-6 lg:grid-cols-[minmax(0,1fr)_270px]">
        <div className="space-y-7">
          {posts.map((post, index) => (
            <article
              key={post.id}
              className="rounded-[12px] bg-[#dfe7f3] p-4 shadow-[0_2px_4px_rgba(15,54,119,0.06)] sm:p-[18px]"
            >
              <h2 className="text-[17px] font-extrabold leading-snug text-[#161d2a] sm:text-[19px]">
                <Link
                  href={`/blogs/${post.id}`}
                  className="transition hover:text-[#174a9b]"
                >
                  {post.title}
                </Link>
              </h2>

              <PostMeta />

              <Link
                href={`/blogs/${post.id}`}
                className="relative mt-4 block aspect-[2.55/1] overflow-hidden rounded-[9px] bg-slate-200"
              >
                <Image
                  src={post.image}
                  alt={post.title}
                  fill
                  priority={index === 0}
                  placeholder="blur"
                  sizes="(max-width: 1024px) 100vw, 850px"
                  className="object-cover transition duration-500 hover:scale-[1.02]"
                />
              </Link>

              <p className="mt-4 line-clamp-2 text-[13px] leading-[1.65] text-slate-700 sm:text-[14px]">
                {post.excerpt} Here are practical tips to help you pass your
                driving test and become a safer driver.
              </p>

              <Link
                href={`/blogs/${post.id}`}
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
                key={post.id}
                href={`/blogs/${post.id}`}
                className="group grid grid-cols-[76px_1fr] items-center gap-3 rounded-[9px] bg-white p-2.5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
              >
                <div className="relative h-[56px] overflow-hidden rounded-[7px]">
                  <Image
                    src={post.image}
                    alt=""
                    fill
                    placeholder="blur"
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
