import Link from "next/link";
import { FaQuoteLeft, FaStar } from "react-icons/fa";

const reviews = [
  ["Guillaume B.", "The lessons were clear, reassuring and very well organised. My instructor helped me understand every mistake and I passed with confidence."],
  ["Sophie M.", "A professional team from registration through to test day. Booking lessons was simple and the support team always answered quickly."],
  ["Thomas R.", "I had not driven for years, but the personalised lessons helped me feel comfortable again. I highly recommend PermisGo."],
  ["Emma L.", "My instructor was patient and gave practical advice I could use immediately. The mock test made a huge difference."],
  ["Lucas D.", "Flexible lesson times, a friendly instructor and excellent preparation. Everything was smooth from beginning to end."],
  ["Chloé A.", "The online resources and driving lessons worked perfectly together. I knew exactly what to improve before my exam."],
];

function Stars() {
  return <div className="flex gap-1 text-sm text-amber-400">{[1,2,3,4,5].map((star) => <FaStar key={star} />)}</div>;
}

export default function ReviewsPage() {
  return (
    <div className="bg-[#f6f8fc]">
      <section className="relative overflow-hidden bg-[#103677] px-4 py-16 text-center text-white sm:px-6 sm:py-20">
        <div className="absolute -right-20 -top-24 h-72 w-72 rounded-full bg-[#e2233d]/20 blur-3xl" />
        <div className="relative mx-auto max-w-3xl">
          <p className="text-xs font-bold uppercase tracking-[0.24em] text-red-300">Student experiences</p>
          <h1 className="mt-4 text-4xl font-extrabold sm:text-5xl">What our learners say</h1>
          <p className="mx-auto mt-5 max-w-2xl leading-7 text-blue-100">Real stories from learners who trusted PermisGo to guide them towards safer, more confident driving.</p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 sm:py-20 lg:px-8">
        <div className="-mt-24 mb-12 grid overflow-hidden rounded-2xl bg-white shadow-xl sm:grid-cols-3">
          {[["4.8/5", "Average rating"], ["1,000+", "Happy learners"], ["96%", "Recommend PermisGo"]].map(([value, label]) => (
            <div key={label} className="border-b border-slate-100 p-7 text-center last:border-0 sm:border-b-0 sm:border-r">
              <p className="text-3xl font-black text-[#103677]">{value}</p>
              <p className="mt-1 text-sm font-semibold text-slate-500">{label}</p>
            </div>
          ))}
        </div>

        <div className="mb-9 text-center">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#e2233d]">Verified feedback</p>
          <h2 className="mt-2 text-3xl font-extrabold text-[#103677] sm:text-4xl">Learner success stories</h2>
        </div>

        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {reviews.map(([name, text], index) => (
            <article key={name} className="flex min-h-64 flex-col rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-lg">
              <div className="flex items-center justify-between"><Stars /><FaQuoteLeft className="text-2xl text-blue-100" /></div>
              <p className="mt-5 flex-1 text-sm leading-7 text-slate-600">“{text}”</p>
              <div className="mt-6 flex items-center gap-3 border-t border-slate-100 pt-5">
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-[#103677] font-extrabold text-white">{name[0]}</span>
                <div><h3 className="font-extrabold text-[#103677]">{name}</h3><p className="text-xs text-slate-400">PermisGo learner · {index + 1} month{index ? "s" : ""} ago</p></div>
              </div>
            </article>
          ))}
        </div>

        <div className="mt-12 rounded-3xl bg-[#103677] p-8 text-center text-white sm:p-10">
          <h2 className="text-2xl font-extrabold sm:text-3xl">Ready to start your own success story?</h2>
          <p className="mx-auto mt-3 max-w-xl text-sm leading-7 text-blue-100">Explore our offers and choose the learning path that fits your goals.</p>
          <Link href="/pricing" className="mt-6 inline-flex rounded-xl bg-[#e2233d] px-7 py-3.5 text-sm font-bold text-white transition hover:bg-white hover:text-[#103677]">Explore our offers</Link>
        </div>
      </section>
    </div>
  );
}
