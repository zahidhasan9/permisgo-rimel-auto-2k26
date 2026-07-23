import Image from "next/image";
import Link from "next/link";
import { FaCarSide, FaHandshake, FaStar } from "react-icons/fa";

import googleLogo from "../../../../public/image/googleLogo.png";
import requestHero from "../../../../public/image/request-hero.png";
import trustLogo from "../../../../public/image/trustLogo.png";

const benefits = [
  "Exclusive discounts on Driving Licence Packages",
  "Competitions & prize draws",
  "Custom landing page with all partnership details",
  "Ongoing performance tracking and regular updates on results",
  "Early access to new features and offers",
];

const ratings = [
  { name: "VroomVroom", type: "icon" },
  { name: "Google Ratings", image: googleLogo },
  { name: "Trustpilot Ratings", image: trustLogo },
];

const controlClass =
  "h-[46px] w-full rounded-[10px] border border-[#c9d6e9] bg-[#f6f8fb] px-4 !text-[14px] text-[#1d2734] outline-none transition placeholder:!text-[14px] placeholder:text-[#a4a9af] focus:border-[#174a9b] focus:ring-2 focus:ring-[#174a9b]/10";

function Field({ label, type = "text", placeholder }) {
  return (
    <label className="block">
      <span className="mb-2 block !text-[14px] font-semibold text-[#222]">
        {label}
      </span>
      <input type={type} placeholder={placeholder} className={controlClass} />
    </label>
  );
}

function SelectField({ label, placeholder }) {
  return (
    <label className="block">
      <span className="mb-2 block !text-[14px] font-semibold text-[#222]">
        {label}
      </span>
      <select defaultValue="" className={`${controlClass} appearance-auto text-[#a4a9af]`}>
        <option value="" disabled>
          {placeholder}
        </option>
      </select>
    </label>
  );
}

export default function B2BPartnershipRequestPage() {
  return (
    <main className="overflow-hidden bg-[#eef3fb] text-[#202124]">
      <section className="bg-[#eaf0f9]">
        <div className="mx-auto grid min-h-[560px] max-w-[1350px] grid-cols-[minmax(0,1fr)] items-center gap-12 px-5 py-14 sm:px-8 md:grid-cols-2 lg:px-10">
          <div className="">
            <h1 className=" text-[34px] font-bold leading-[1.18] tracking-[-0.02em] text-[#202124] sm:text-[40px] lg:text-[42px]">
              Explore partnership opportunities
              <br className="hidden sm:block" /> with us
            </h1>
            <p className="mt-7 !text-[16px] text-[#767a80]">
              Benefit from a comprehensive package and exclusive advantages
            </p>
            <Link
              href="#partnership-form"
              className="mt-10 inline-flex min-h-[48px] min-w-[305px] items-center justify-center rounded-[9px] bg-[#e4213c] px-8 !text-[16px] font-semibold text-white transition duration-300 hover:-translate-y-0.5 hover:bg-[#174a9b] hover:shadow-lg"
            >
              Apply for Partnership
            </Link>
          </div>

          <div className="flex justify-center md:justify-end">
            <Image
              src={requestHero}
              alt="Business partnership handshake"
              priority
              sizes="(max-width: 768px) 92vw, 560px"
              className="h-auto w-full max-w-[540px]"
            />
          </div>
        </div>
      </section>

      <section className="bg-white px-5 py-20 sm:px-8 lg:py-24">
        <div className="mx-auto max-w-[1280px]">
          <h2 className="text-center text-[34px] font-bold tracking-[-0.02em] text-[#222] lg:text-[38px]">
            Are You a Company?
          </h2>

          <div className="mt-12 grid grid-cols-[minmax(0,1fr)] gap-6 lg:grid-cols-[365px_minmax(0,1fr)]">
            <div className="flex min-h-[500px] items-center justify-center overflow-hidden rounded-[12px] bg-[#e8eef8]">
              <div className="relative flex h-[300px] w-[300px] rotate-[-8deg] items-center justify-center rounded-[28px] bg-white shadow-sm">
                <div className="absolute -left-20 top-8 h-28 w-40 rotate-[20deg] bg-[#090916]" />
                <div className="absolute -right-20 bottom-8 h-28 w-40 rotate-[20deg] bg-[#090916]" />
                <FaHandshake className="relative z-10 text-[190px] text-[#e997a0] drop-shadow-sm" />
                <span className="absolute bottom-6 right-8 h-12 w-24 rotate-[10deg] rounded-sm bg-[#174a9b]" />
              </div>
            </div>

            <div className="flex min-h-[500px] flex-col justify-center rounded-[12px] bg-[#174a9b] px-5 py-12 sm:px-12 lg:px-20">
              <h3 className="text-center text-[21px] font-bold text-white">
                Exclusive Benefits
              </h3>
              <ul className="mt-8 space-y-5">
                {benefits.map((benefit) => (
                  <li
                    key={benefit}
                    className="skew-x-[-11deg] rounded-[9px] bg-[#edf3fb] px-5 py-[14px] text-center shadow-sm transition duration-300 hover:bg-white hover:shadow-md"
                  >
                    <span className="block skew-x-[11deg] !text-[14px] font-semibold text-[#292d33]">
                      {benefit}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section id="partnership-form" className="scroll-mt-24 bg-[#eaf0f9] px-5 py-20 sm:px-8 lg:py-24">
        <div className="mx-auto max-w-[1060px]">
          <div className="text-center">
            <h2 className="text-[34px] font-bold tracking-[-0.02em] text-[#222] lg:text-[38px]">
              Request for School Partnership
            </h2>
            <p className="mt-4 !text-[14px] text-[#666b73]">
              Fill out this form with necessary information
            </p>
          </div>

          <form className="mt-12 rounded-[12px] bg-white p-5 shadow-sm sm:p-8 lg:p-[30px]">
            <h3 className="text-[20px] font-bold text-[#252525]">
              Organization Information
            </h3>

            <div className="mt-6 grid grid-cols-[minmax(0,1fr)] gap-x-7 gap-y-5 md:grid-cols-2">
              <Field label="Name" placeholder="Write name here" />
              <SelectField label="Type of company" placeholder="Select one" />
              <Field label="Phone Number" type="tel" placeholder="Write name here" />
              <Field label="Email Address" type="email" placeholder="Write Email address" />
              <Field label="City" placeholder="Write phone number" />
              <Field label="Address" placeholder="Write Email address" />

              <label className="block md:col-span-2">
                <span className="block !text-[14px] font-semibold text-[#222]">
                  What do you expect from this partnership?
                </span>
                <span className="mb-2 block !text-[13px] text-[#6d7279]">
                  Please specify the objectives of this partnership so we can learn more!
                </span>
                <textarea
                  rows={7}
                  placeholder="Write message"
                  className="w-full resize-none rounded-[10px] border border-[#c9d6e9] bg-[#f6f8fb] p-4 !text-[14px] outline-none transition placeholder:!text-[14px] placeholder:text-[#a4a9af] focus:border-[#174a9b] focus:ring-2 focus:ring-[#174a9b]/10"
                />
              </label>

              <SelectField
                label="Approximate number of beneficiaries of the partnership*"
                placeholder="Write phone number"
              />
              <SelectField label="How did you hear about us?" placeholder="Write Email address" />
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

      <section className="bg-[#174a9b] px-5 py-16 sm:px-8 lg:py-20">
        <div className="mx-auto grid max-w-[1280px] grid-cols-[minmax(0,1fr)] gap-6 md:grid-cols-3">
          {ratings.map((rating) => (
            <article
              key={rating.name}
              className="flex min-h-[168px] flex-col items-center justify-center rounded-[22px] bg-[#f6f8fb] px-6 py-6 text-center shadow-sm transition duration-300 hover:-translate-y-1 hover:bg-white hover:shadow-xl"
            >
              {rating.type === "icon" ? (
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-[#1367ba] text-white">
                  <FaCarSide className="text-[20px]" />
                </span>
              ) : (
                <Image
                  src={rating.image}
                  alt=""
                  sizes="40px"
                  className="h-10 w-10 object-contain"
                />
              )}
              <h3 className="mt-2 text-[19px] font-bold text-[#292929]">{rating.name}</h3>
              <div className="mt-1 flex gap-[8px] text-[#ffc52c]" aria-label="Five stars">
                {[0, 1, 2, 3, 4].map((star) => (
                  <FaStar key={star} className="text-[18px]" />
                ))}
              </div>
              <p className="mt-1 !text-[14px] text-[#303030]">04 out of 05</p>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
