import Image from "next/image";
import Link from "next/link";
import { FaStar } from "react-icons/fa";

import requestHero from "../../../../public/image/request-hero.png";
import requestPerson from "../../../../public/image/request2-1.png";
import requestCar from "../../../../public/image/request2-2.png";
import trustLogo from "../../../../public/image/trustLogo.png";

const benefits = [
  "Discounts on Driving Licence Packages",
  "Uncapped Earning Opportunities",
  "Competitions & Prize Draws",
  "Campus Tours with Goodies & Entertainment",
  "Partner program (Connect with partners that support student life)",
];

const controlClass =
  "h-[45px] w-full rounded-[9px] border border-[#c9d6e9] bg-[#f6f8fb] px-4 !text-[14px] text-[#21262d] outline-none transition placeholder:!text-[13px] placeholder:text-[#a5abb2] focus:border-[#174a9b] focus:ring-2 focus:ring-[#174a9b]/10";

function Field({ label, type = "text", placeholder }) {
  return (
    <label className="block">
      <span className="mb-2 block !text-[13px] font-semibold text-[#292929]">{label}</span>
      <input type={type} placeholder={placeholder} className={controlClass} />
    </label>
  );
}

function SelectField({ label, placeholder }) {
  return (
    <label className="block">
      <span className="mb-2 block !text-[13px] font-semibold text-[#292929]">{label}</span>
      <select defaultValue="" className={`${controlClass} text-[#a5abb2]`}>
        <option value="" disabled>
          {placeholder}
        </option>
      </select>
    </label>
  );
}

export default function RequestForSchoolPartnershipPage() {
  return (
    <main className="overflow-hidden bg-white text-[#202124]">
      <section className="bg-[#eaf0f9]">
        <div className="mx-auto grid min-h-[560px] max-w-[1280px] grid-cols-[minmax(0,1fr)] items-center gap-10 px-5 py-14 sm:px-8 md:grid-cols-2 lg:px-10">
          <div className="max-w-[620px]">
            <h1 className="text-[35px] font-bold leading-[1.18] tracking-[-0.025em] text-[#202124] sm:text-[40px] lg:text-[42px]">
              Grow Your Driving School with
              <br className="hidden sm:block" /> PermisGo
            </h1>
            <p className="mt-7 max-w-[640px] !text-[16px] leading-7 text-[#72777d]">
              Join a network of 300+ partner schools across France and unlock powerful tools,
              increased visibility, and exclusive benefits to scale your business.
            </p>
            <Link
              href="#school-partnership-form"
              className="mt-10 inline-flex min-h-[48px] min-w-[300px] items-center justify-center rounded-[9px] bg-[#e4213c] px-8 !text-[15px] font-semibold text-white transition duration-300 hover:-translate-y-0.5 hover:bg-[#174a9b] hover:shadow-lg"
            >
              Apply for Partnership
            </Link>
          </div>

          <div className="flex justify-center md:justify-end">
            <Image
              src={requestHero}
              alt="Driving school partnership meeting"
              priority
              sizes="(max-width: 768px) 92vw, 560px"
              className="h-auto w-full max-w-[540px]"
            />
          </div>
        </div>
      </section>

      <section className="bg-white px-5 py-20 sm:px-8 lg:py-24">
        <div className="mx-auto max-w-[1120px]">
          <h2 className="text-center text-[34px] font-bold tracking-[-0.025em] text-[#222] lg:text-[38px]">
            A partnership for your school ?
          </h2>

          <div className="relative mt-12 flex min-h-[500px] items-end justify-center px-0 sm:px-12 lg:px-[115px]">
            <Image
              src={requestPerson}
              alt="Student"
              sizes="120px"
              className="absolute bottom-0 left-0 z-10 hidden h-auto w-[115px] lg:block"
            />

            <div className="flex min-h-[500px] w-full flex-col justify-center rounded-[10px] bg-[#174a9b] px-5 py-12 sm:px-12 lg:px-[100px]">
              <h3 className="text-center text-[21px] font-bold text-white">Exclusive Benefits</h3>
              <ul className="mt-8 space-y-5">
                {benefits.map((benefit) => (
                  <li
                    key={benefit}
                    className="skew-x-[-11deg] rounded-[8px] bg-[#edf3fb] px-5 py-[14px] text-center shadow-sm transition duration-300 hover:bg-white hover:shadow-lg"
                  >
                    <span className="block skew-x-[11deg] !text-[14px] font-semibold text-[#292d33]">
                      {benefit}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            <Image
              src={requestCar}
              alt="Driving school car"
              sizes="135px"
              className="absolute bottom-0 right-0 z-10 hidden h-auto w-[135px] lg:block"
            />
          </div>
        </div>
      </section>

      <section
        id="school-partnership-form"
        className="scroll-mt-24 bg-[#eaf0f9] px-5 py-20 sm:px-8 lg:py-24"
      >
        <div className="mx-auto max-w-[1060px]">
          <div className="text-center">
            <h2 className="text-[34px] font-bold tracking-[-0.025em] text-[#222] lg:text-[38px]">
              Request for School Partnership
            </h2>
            <p className="mt-4 !text-[14px] text-[#676c73]">
              Fill out this form with necessary information
            </p>
          </div>

          <form className="mt-12 rounded-[12px] bg-white p-5 shadow-sm sm:p-8 lg:p-[30px]">
            <h3 className="text-[20px] font-bold text-[#292929]">School Information</h3>

            <div className="mt-6 grid grid-cols-[minmax(0,1fr)] gap-x-7 gap-y-5 md:grid-cols-2">
              <Field label="School Name" placeholder="Write name here" />
              <SelectField label="Type of school" placeholder="Select one" />
              <Field label="Phone Number" type="tel" placeholder="Write name here" />
              <Field label="Email Address" type="email" placeholder="Write Email address" />
              <Field label="City" placeholder="Write phone number" />
              <Field label="Address" placeholder="Write Email address" />
              <SelectField label="Number of students" placeholder="Write phone number" />
              <SelectField label="Type of Association" placeholder="Write Email address" />

              <fieldset className="md:col-span-2">
                <legend className="!text-[13px] font-semibold text-[#292929]">
                  Is there another driving school on your campus?
                </legend>
                <div className="mt-3 flex items-center gap-8">
                  <label className="flex items-center gap-2 !text-[13px] text-[#43474c]">
                    <input type="checkbox" className="h-4 w-4 accent-[#174a9b]" />
                    Yes
                  </label>
                  <label className="flex items-center gap-2 !text-[13px] text-[#43474c]">
                    <input type="checkbox" defaultChecked className="h-4 w-4 accent-[#20c45a]" />
                    No
                  </label>
                </div>
              </fieldset>
            </div>

            <button
              type="button"
              className="mt-6 rounded-[8px] bg-[#e4213c] px-7 py-3 !text-[15px] font-semibold text-white transition duration-300 hover:bg-[#174a9b] hover:shadow-md"
            >
              Submit
            </button>
          </form>
        </div>
      </section>

      <section className="bg-white px-5 py-20 sm:px-8 lg:py-24">
        <div className="mx-auto max-w-[1060px]">
          <h2 className="text-center text-[34px] font-bold tracking-[-0.025em] text-[#222] lg:text-[38px]">
            The students&apos; favorite driving school !
          </h2>

          <div className="mt-12 grid grid-cols-[minmax(0,1fr)] items-center gap-8 md:grid-cols-[58%_42%]">
            <div className="overflow-hidden rounded-[10px] bg-[#eef2f8] shadow-sm">
              <iframe
                className="aspect-video w-full"
                src="https://www.youtube.com/embed/v3YLlDYHpXg?si=BSV3elC2FONWf7_F"
                title="PermisGo partner recommendation"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
              />
            </div>

            <div>
              <h3 className="text-[20px] font-bold text-[#174a9b]">
                Our partners recommend us!
              </h3>
              <article className="mt-5 rounded-[18px] border-[4px] border-[#e4eaf3] bg-[#f7f9fc] px-6 py-7 text-center transition duration-300 hover:-translate-y-1 hover:shadow-xl">
                <Image
                  src={trustLogo}
                  alt="Trustpilot"
                  sizes="42px"
                  className="mx-auto h-10 w-10 object-contain"
                />
                <h4 className="mt-2 text-[18px] font-bold text-[#282b2f]">Trustpilot Ratings</h4>
                <div className="mt-2 flex justify-center gap-3 text-[#ffc52c]" aria-label="Five stars">
                  {[0, 1, 2, 3, 4].map((star) => (
                    <FaStar key={star} className="text-[18px]" />
                  ))}
                </div>
                <p className="mt-2 !text-[14px] text-[#34373b]">04 out of 05</p>
              </article>
            </div>
          </div>

          <div className="mt-20 rounded-[10px] bg-[#174a9b] px-5 py-14 text-center">
            <h2 className="text-[24px] font-bold text-white sm:text-[27px]">
              Start Your Driving Journey Today
            </h2>
            <Link
              href="#school-partnership-form"
              className="mt-8 inline-flex min-h-[48px] min-w-[300px] items-center justify-center rounded-[9px] bg-[#e4213c] px-8 !text-[15px] font-semibold text-white transition duration-300 hover:-translate-y-0.5 hover:bg-white hover:text-[#174a9b] hover:shadow-lg"
            >
              Apply for Partnership
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
