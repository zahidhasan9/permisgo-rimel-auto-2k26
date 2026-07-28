import Image from "next/image";
import Link from "next/link";
import {
  FaCalendarAlt,
  FaCommentAlt,
  FaFolderOpen,
  FaUser,
} from "react-icons/fa";

import blogPage from "../../../../../public/image/blog-page.jpg";
import carDriver from "../../../../../public/image/car-driver.jpg";
import car from "../../../../../public/image/car.jpg";
import drivingInstructor from "../../../../../public/image/driving-instructor.webp";
import roadQuestion from "../../../../../public/image/road-question.png";

const posts = [
  {
    id: 1,
    title: "10 Tips to Pass Your Driving Test on the First Try",
    image: blogPage,
  },
  {
    id: 2,
    title: "Step-by-Step Guide to Passing Your Driving Test",
    image: carDriver,
  },
  {
    id: 3,
    title: "Common Traffic Mistakes and How to Avoid Them",
    image: car,
  },
  {
    id: 4,
    title: "Your Complete Guide to Becoming a Confident Driver",
    image: blogPage,
  },
  {
    id: 5,
    title: "How to Start Driving: The First Time Learner's Guide",
    image: drivingInstructor,
  },
  {
    id: 6,
    title: "Essential Road Signs Every Learner Should Know",
    image: roadQuestion,
  },
];

const articleSections = [
  {
    title: "Know the Test Requirements",
    text: "Before taking your test, make sure you understand what the examiner expects. Learn about the test format, scoring system, and common evaluation criteria. This will help you stay prepared and avoid surprises.",
  },
  {
    title: "Practice Regularly",
    text: "Consistent practice is key to becoming a confident driver. Try to practise in different environments such as busy roads, highways, and residential areas to gain real-world experience.",
  },
  {
    title: "Master the Basics",
    text: "Focus on essential driving skills like steering control, braking smoothly, and proper lane positioning. Strong fundamentals make a big difference during the test.",
  },
  {
    title: "Always Check Mirrors",
    text: "Examiners pay close attention to mirror usage. Make sure you check your mirrors frequently, especially before turning, stopping, or changing lanes.",
  },
  {
    title: "Follow Traffic Rules Strictly",
    text: "Obey all traffic signs, signals, and road markings. Even a small mistake like missing a stop sign can result in failure. Stay calm, take deep breaths, and focus on your driving instead of worrying about the result.",
  },
  {
    title: "Maintain Proper Speed",
    text: "Drive within the speed limit at all times. Avoid driving too fast or too slow, as both can create a negative impression.",
  },
  {
    title: "Practice Parking and Manoeuvres",
    text: "Make sure you are confident with parking techniques such as parallel parking, reverse parking, and three-point turns. These are often part of the test.",
  },
  {
    title: "Listen Carefully to the Examiner",
    text: "Pay close attention to the examiner’s instructions. If you don’t understand something, politely ask for clarification instead of guessing.",
  },
  {
    title: "Conclusion",
    text: "Before your actual test, take a mock driving test with your instructor. This helps you identify weaknesses and improves your confidence.",
  },
];

function PostMeta() {
  return (
    <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-2 text-[12px] font-medium text-slate-700 sm:text-[13px]">
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

export async function generateMetadata({ params }) {
  const { blog } = await params;
  const post = posts.find((item) => item.id === Number(blog)) || posts[0];
  return {
    title: post.title,
    description:
      "Practical driving advice from PermisGo to help learners prepare for their driving test.",
  };
}

export default async function BlogDetailsPage({ params }) {
  const { blog } = await params;
  const post = posts.find((item) => item.id === Number(blog)) || posts[0];
  const recentPosts = posts.filter((item) => item.id !== post.id).slice(0, 5);

  return (
    <section className="bg-white px-4 py-12 sm:px-6 sm:py-16 lg:px-8 lg:py-[72px]">
      <div className="mx-auto grid max-w-[1180px] items-start gap-6 lg:grid-cols-[minmax(0,1fr)_270px]">
        <article className="rounded-[12px] bg-[#dfe7f3] p-4 shadow-[0_2px_4px_rgba(15,54,119,0.06)] sm:p-[18px]">
          <h1 className="text-[19px] font-extrabold leading-snug text-[#161d2a] sm:text-[21px]">
            {post.title}
          </h1>

          <PostMeta />

          <div className="relative mt-4 aspect-[2.55/1] overflow-hidden rounded-[9px] bg-slate-200">
            <Image
              src={post.image}
              alt={post.title}
              fill
              priority
              placeholder="blur"
              sizes="(max-width: 1024px) 100vw, 850px"
              className="object-cover"
            />
          </div>

          <div className="pb-1 pt-5 text-[14px] leading-[1.65] text-slate-700 sm:text-[15px] sm:leading-[1.7]">
            <p>
              Passing your driving test on the first attempt is a goal for many
              learners. With the right preparation, mindset, and guidance, you
              can significantly increase your chances of success. Here are
              essential tips to help you pass your driving test confidently.
            </p>

            <div className="mt-7 space-y-7">
              {articleSections.map((section) => (
                <section key={section.title}>
                  <h2 className="text-[17px] font-extrabold text-[#20252d] sm:text-[18px]">
                    {section.title}
                  </h2>
                  <p className="mt-3">{section.text}</p>
                </section>
              ))}
            </div>
          </div>
        </article>

        <aside className="rounded-[12px] bg-[#dfe7f3] p-4 lg:sticky lg:top-5">
          <h2 className="rounded-[8px] bg-[#174a9b] px-4 py-3 text-center text-[15px] font-extrabold text-white">
            Our Recent Blog Post
          </h2>

          <div className="mt-4 space-y-3">
            {recentPosts.map((item) => (
              <Link
                key={item.id}
                href={`/blogs/${item.id}`}
                className="group grid grid-cols-[76px_1fr] items-center gap-3 rounded-[9px] bg-white p-2.5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
              >
                <div className="relative h-[56px] overflow-hidden rounded-[7px]">
                  <Image
                    src={item.image}
                    alt=""
                    fill
                    placeholder="blur"
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
