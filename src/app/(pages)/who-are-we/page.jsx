import Image from "next/image";
import Link from "next/link";

import heroImage from "../../../../public/image/image2.jpeg";
import mentorImage from "../../../../public/image/image1.jpeg";
import indicator1 from "../../../../public/image/indicate1.png";
import indicator2 from "../../../../public/image/indicate2.png";
import indicator3 from "../../../../public/image/indicate3.png";
import indicator4 from "../../../../public/image/indicate4.png";

import {
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaLocationDot,
  FaPhone,
  FaPinterestP,
  FaYoutube,
} from "react-icons/fa6";
import { FaBookOpen, FaEnvelope, FaFileLines, FaUser } from "react-icons/fa6";
import { IoMdCheckbox } from "react-icons/io";

const container = "mx-auto w-full max-w-[1360px] px-5 sm:px-8 lg:px-10";

const programs = [
  "Category B driving licence (standard and accelerated)",
  "Supervised driving (AAC)",
  "Supervised driving",
  "Highway Code in person and online",
  "Advanced training courses",
  "Supervised driving",
  "Supervised driving (AAC)",
];

const reasons = [
  { image: indicator1, label: "Moniteur diplômé" },
  { image: indicator2, label: "+ 500 d’élève réussites" },
  { image: indicator3, label: "Certifié Qualiopi" },
  { image: indicator4, label: "Écoles de conduite labellisées" },
];

const socialLinks = [
  { icon: FaFacebookF, label: "Facebook" },
  { icon: FaPinterestP, label: "Pinterest" },
  { icon: FaInstagram, label: "Instagram" },
  { icon: FaYoutube, label: "YouTube" },
  { icon: FaLinkedinIn, label: "LinkedIn" },
];

function HeadingIcon({ children }) {
  return (
    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-[4px] bg-[#174a9b] text-[18px] text-white shadow-sm">
      {children}
    </span>
  );
}

export default function WhoAreWePage() {
  return (
    <div className="bg-[#eef3fb] text-[#1d1d1f]">
      {/* Introduction */}
      <section className={`${container} pb-10 pt-16 md:pb-11 md:pt-20`}>
        <div className="grid items-center gap-10 lg:grid-cols-[0.83fr_1.17fr] lg:gap-12">
          <div>
            <h1 className="text-[36px] font-extrabold leading-[1.15] tracking-[-0.025em] text-[#1d1d1f] sm:text-[40px]">
              Who are we?
            </h1>

            <h2 className="mt-5 max-w-[520px] text-[20px] font-extrabold leading-[1.55] text-[#242424] sm:text-[22px]">
              Permis Go is a driving school that connects candidates with
              state-certified driving instructors
            </h2>

            <p className="mt-7 max-w-[505px] !text-[15px] font-medium leading-[1.85] text-[#444] sm:!text-[16px]">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Ducimus
              quisquam voluptas doloremque pariatur voluptatibus. Distinctio
              sit blanditiis eius odit illo itaque, ratione, laudantium est sunt
              perspiciatis ullam corrupti, in sint.
            </p>

            <Link
              href="/book-lesson"
              className="mt-7 inline-flex min-h-12 items-center justify-center rounded-[10px] bg-[#e5273d] px-6 text-[15px] font-extrabold text-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:bg-[#174a9b] hover:shadow-lg"
            >
              Book Your Lesson
            </Link>
          </div>

          <div className="overflow-hidden rounded-[9px] bg-white shadow-sm">
            <Image
              src={heroImage}
              alt="Driver holding the steering wheel"
              priority
              sizes="(max-width: 1024px) 100vw, 58vw"
              className="aspect-[737/363] h-auto w-full object-cover transition-transform duration-700 hover:scale-[1.025]"
            />
          </div>
        </div>
      </section>

      {/* Mission */}
      <section className={`${container} pb-20`}>
        <div className="rounded-[12px] bg-[#ffd7db] px-6 py-6 sm:px-7">
          <h2 className="flex items-center gap-3 text-[25px] font-extrabold leading-tight tracking-[-0.02em] sm:text-[28px]">
            <HeadingIcon>
              <FaFileLines />
            </HeadingIcon>
            Our Mission
          </h2>
          <p className="mt-4 !text-[15px] font-medium leading-[1.75] text-[#333] sm:!text-[16px]">
            Our goal is to offer you quality training, tailored to your pace and
            needs. Whether you’re a beginner or looking to improve your skills,
            we do everything we can to help you obtain your license with
            confidence.
          </p>
        </div>
      </section>

      {/* Mentors and programmes */}
      <section className={`${container} pb-20`}>
        <div className="grid gap-6 lg:grid-cols-2">
          <article className="flex min-h-[455px] flex-col rounded-[12px] bg-[#d9ffdc] p-5 sm:p-6">
            <h2 className="flex items-center gap-3 text-[25px] font-extrabold leading-tight tracking-[-0.02em] sm:text-[28px]">
              <HeadingIcon>
                <FaUser />
              </HeadingIcon>
              Expert Mentors
            </h2>
            <p className="mt-5 !text-[15px] font-medium leading-[1.75] text-[#333] sm:!text-[16px]">
              Our goal is to offer you quality training, tailored to your pace
              and needs. Whether you’re a beginner or looking to improve your
              skills, we do everything we can to help you obtain your license
              with confidence.
            </p>
            <div className="mt-auto overflow-hidden rounded-[10px] pt-5">
              <Image
                src={mentorImage}
                alt="Student learning to drive with a mentor"
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="aspect-[588/239] h-auto w-full object-cover transition-transform duration-700 hover:scale-[1.025]"
              />
            </div>
          </article>

          <article className="min-h-[455px] rounded-[12px] bg-[#d6e5ff] p-5 sm:p-6">
            <h2 className="flex items-center gap-3 text-[25px] font-extrabold leading-tight tracking-[-0.02em] sm:text-[28px]">
              <HeadingIcon>
                <FaBookOpen />
              </HeadingIcon>
              Our Programs
            </h2>
            <h3 className="mt-5 text-[16px] font-extrabold leading-6 text-[#242424] sm:text-[17px]">
              We offer different packages to meet all needs:
            </h3>
            <ul className="mt-4 space-y-2">
              {programs.map((program, index) => (
                <li
                  key={`${program}-${index}`}
                  className="flex items-start gap-2.5 !text-[15px] font-medium leading-6 text-[#333] sm:!text-[16px]"
                >
                  <IoMdCheckbox className="mt-[3px] shrink-0 text-[19px] text-[#20ba2b]" />
                  <span>{program}</span>
                </li>
              ))}
            </ul>
          </article>
        </div>
      </section>

      {/* Why choose Permisgo */}
      <section className={`${container} pb-20`}>
        <h2 className="text-center text-[32px] font-extrabold leading-tight tracking-[-0.025em] text-[#1d1d1f] sm:text-[36px]">
          Why choose Permisgo
        </h2>

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {reasons.map((reason) => (
            <article
              key={reason.label}
              className="group flex min-h-[112px] rounded-md items-center justify-center gap-4 bg-white px-7 py-5 shadow-sm transition-all duration-300 [clip-path:polygon(7%_0,100%_0,93%_100%,0_100%)] hover:-translate-y-1.5 hover:bg-[#174a9b] hover:shadow-xl"
            >
              <Image
                src={reason.image}
                alt=""
                aria-hidden="true"
                sizes="48px"
                className="h-11 w-11 shrink-0 object-contain transition-transform duration-300 group-hover:scale-110"
              />
              <h3 className="!text-[15px] font-extrabold leading-6 text-[#222] transition-colors group-hover:text-white sm:!text-[16px]">
                {reason.label}
              </h3>
            </article>
          ))}
        </div>
      </section>

      {/* Contact CTA */}
      <section className={`${container} pb-10`}>
        <div className="rounded-[12px] bg-[#e2233d] px-6 py-16 text-white sm:px-10 lg:px-16 lg:py-20">
          <div className="mx-auto max-w-[760px]">
            <h2 className="text-center text-[30px] font-extrabold leading-tight tracking-[-0.025em] sm:text-[36px]">
              Ready to begin your driving adventure?
            </h2>
            <div className="mx-auto mt-7 h-px w-full bg-white/70" />

            <div className="mt-7 grid items-center gap-10 lg:grid-cols-[1.15fr_0.85fr]">
              <ul className="space-y-2.5">
                <li className="group flex items-start gap-3 rounded-[8px] border border-white/30 bg-white/20 px-4 py-3 !text-[14px] font-semibold leading-5 text-white transition-all duration-300 hover:translate-x-1.5 hover:bg-white/30">
                  <FaLocationDot className="mt-1 shrink-0" />
                  <span>
                    | 100 Rue Danielle Casanova 93300
                    <br />
                    Aubervilliers, France
                  </span>
                </li>
                <li className="group flex items-center gap-3 rounded-[8px] border border-white/30 bg-white/20 px-4 py-3 !text-[14px] font-semibold text-white transition-all duration-300 hover:translate-x-1.5 hover:bg-white/30">
                  <FaPhone className="shrink-0" />
                  <span>| +948 1458 5584</span>
                </li>
                <li className="group flex items-center gap-3 rounded-[8px] border border-white/30 bg-white/20 px-4 py-3 !text-[14px] font-semibold text-white transition-all duration-300 hover:translate-x-1.5 hover:bg-white/30">
                  <FaEnvelope className="shrink-0" />
                  <span>| permisgo.fr@gmail.com</span>
                </li>
              </ul>

              <div className="text-center">
                <Link
                  href="/book-lesson"
                  className="inline-flex min-h-12 items-center justify-center rounded-[8px] bg-white px-6 text-[14px] font-extrabold text-[#e2233d] shadow-sm transition-all duration-300 hover:-translate-y-1 hover:bg-[#174a9b] hover:text-white hover:shadow-xl"
                >
                  Book Your First Lesson
                </Link>
                <div className="mt-4 flex items-center justify-center gap-4">
                  {socialLinks.map(({ icon: Icon, label }) => (
                    <Link
                      key={label}
                      href="#"
                      aria-label={label}
                      className="text-[16px] text-white transition-all duration-300 hover:-translate-y-1 hover:text-[#d6e5ff]"
                    >
                      <Icon />
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
