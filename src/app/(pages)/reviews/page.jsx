import Link from "next/link";
import Testimonials from "@/components/testimonials";

export default function ReviewsPage() {
  return (
    <div className="bg-[#f6f8fc]">
      <section className="relative overflow-hidden bg-[#103677] px-4 py-16 text-center text-white sm:px-6 sm:py-20">
        <div className="absolute -right-20 -top-24 h-72 w-72 rounded-full bg-[#e2233d]/20 blur-3xl" />
        <div className="relative mx-auto max-w-3xl">
          <p className="text-xs font-bold uppercase tracking-[0.24em] text-red-300">
            Student experiences
          </p>
          <h1 className="mt-4 text-4xl font-extrabold sm:text-5xl">
            What our learners say
          </h1>
          <p className="mx-auto mt-5 max-w-2xl leading-7 text-blue-100">
            Real stories from learners who trusted PermisGo to guide them
            towards safer, more confident driving.
          </p>
        </div>
      </section>
      <Testimonials />
      <section className="px-4 pb-16 sm:px-6">
        <div className="mx-auto max-w-7xl rounded-3xl bg-[#103677] p-8 text-center text-white sm:p-10">
          <h2 className="text-2xl font-extrabold sm:text-3xl">
            Ready to start your own success story?
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-sm leading-7 text-blue-100">
            Explore our offers and choose the learning path that fits your
            goals.
          </p>
          <Link
            href="/pricing"
            className="mt-6 inline-flex rounded-xl bg-[#e2233d] px-7 py-3.5 text-sm font-bold text-white transition hover:bg-white hover:text-[#103677]"
          >
            Explore our offers
          </Link>
        </div>
      </section>
    </div>
  );
}
