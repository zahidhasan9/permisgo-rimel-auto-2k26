import Image from "next/image";
import Link from "next/link";

import {
  FaEnvelope,
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaLocationDot,
  FaPhone,
  FaPinterestP,
  FaWhatsapp,
  FaYoutube,
} from "react-icons/fa6";

const fields = [
  {
    id: "first-name",
    label: "First name",
    placeholder: "Write name here",
    type: "text",
  },
  {
    id: "last-name",
    label: "First name",
    placeholder: "Write name here",
    type: "text",
  },
  {
    id: "email",
    label: "First name",
    placeholder: "Write name here",
    type: "email",
  },
  {
    id: "phone",
    label: "First name",
    placeholder: "Write name here",
    type: "tel",
  },
];

const socialLinks = [
  { label: "Facebook", icon: FaFacebookF },
  { label: "Pinterest", icon: FaPinterestP },
  { label: "Instagram", icon: FaInstagram },
  { label: "YouTube", icon: FaYoutube },
  { label: "LinkedIn", icon: FaLinkedinIn },
];

const inputClass =
  "h-[46px] w-full rounded-[11px] border border-[#b9c9e4] bg-[#f6f8fc] px-4 !text-[14px] font-medium text-[#222] outline-none transition-all duration-300 placeholder:text-[#969696] focus:border-[#174a9b] focus:bg-white focus:ring-4 focus:ring-[#174a9b]/10";

function InfoIcon({ children }) {
  return (
    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-[2px] bg-[#174a9b] text-[20px] text-white transition-transform duration-300 group-hover:scale-105">
      {children}
    </span>
  );
}

export default function ContactUsPage() {
  return (
    <div className="bg-[#eef3fb] text-[#1d1d1f]">
      <section className="mx-auto w-full max-w-[1360px] px-5 pb-20 pt-20 sm:px-8 lg:px-10 lg:pt-20">
        {/* Heading */}
        <header className="mx-auto max-w-[760px] text-center">
          <h1 className="text-[36px] font-extrabold leading-tight tracking-[-0.025em] text-[#1d1d1f] sm:text-[40px]">
            Contact Our Team
          </h1>
          <p className="mx-auto mt-7 max-w-[665px] !text-[15px] font-medium leading-[1.65] text-[#3f3f3f] sm:!text-[16px]">
            Got any questions about the product or scaling on our platform?
            We&apos;re here to help. Chat to our friendly team 24sqrt(7) and get
            onboard in less than 5 minutes.
          </p>
        </header>

        {/* Form and contact details */}
        <div className="mt-9 grid gap-10 lg:grid-cols-[1.28fr_0.92fr] lg:gap-20 xl:grid-cols-[650px_460px] xl:gap-[86px]">
          <form
            action=""
            className="rounded-[12px] bg-white px-6 py-8 sm:px-10 sm:py-10 lg:min-h-[585px] lg:py-9"
          >
            <div className="grid gap-x-16 gap-y-6 sm:grid-cols-2">
              {fields.map((field) => (
                <div key={field.id}>
                  <label
                    htmlFor={field.id}
                    className="mb-2.5 block !text-[14px] font-medium text-[#333]"
                  >
                    {field.label}
                  </label>
                  <input
                    id={field.id}
                    name={field.id}
                    type={field.type}
                    placeholder={field.placeholder}
                    className={inputClass}
                  />
                </div>
              ))}
            </div>

            <div className="mt-5">
              <label
                htmlFor="subject"
                className="mb-2.5 block !text-[14px] font-medium text-[#333]"
              >
                First name
              </label>
              <input
                id="subject"
                name="subject"
                type="text"
                placeholder="Write name here"
                className={inputClass}
              />
            </div>

            <div className="mt-5">
              <label
                htmlFor="message"
                className="mb-2.5 block !text-[14px] font-medium text-[#333]"
              >
                First name
              </label>
              <textarea
                id="message"
                name="message"
                rows={7}
                placeholder="Write name here"
                className="min-h-[200px] w-full resize-none rounded-[11px] border border-[#b9c9e4] bg-[#f6f8fc] px-4 py-3 !text-[14px] font-medium text-[#222] outline-none transition-all duration-300 placeholder:text-[#969696] focus:border-[#174a9b] focus:bg-white focus:ring-4 focus:ring-[#174a9b]/10"
              />
            </div>

            <button
              type="submit"
              className="mt-5 inline-flex min-h-12 items-center justify-center rounded-[11px] bg-[#e2233d] px-5 !text-[14px] font-extrabold text-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:bg-[#174a9b] hover:shadow-lg"
            >
              Send Message
            </button>
          </form>

          <aside className="border-l border-[#9ca3af] pl-6 sm:pl-8">
            <section className="border-b border-[#9ca3af] pb-7">
              <h2 className="text-[22px] font-extrabold text-[#e2233d]">
                Contact
              </h2>
              <p className="mt-2 !text-[14px] font-medium text-[#333]">
                Speak to our friendly team via live chat.
              </p>

              <div className="mt-4 space-y-3">
                <Link
                  href="tel:+94814585584"
                  className="group flex items-center gap-3 !text-[14px] font-medium text-[#252525] transition-colors hover:text-[#e2233d]"
                >
                  <InfoIcon>
                    <FaPhone />
                  </InfoIcon>
                  <span>| +948 1458 5584</span>
                </Link>
                <Link
                  href="https://wa.me/94814585584"
                  className="group flex items-center gap-3 !text-[14px] font-medium text-[#252525] transition-colors hover:text-[#e2233d]"
                >
                  <InfoIcon>
                    <FaWhatsapp />
                  </InfoIcon>
                  <span>| +948 1458 5584</span>
                </Link>
                <Link
                  href="mailto:info@permisgoautoecole.com"
                  className="group flex items-center gap-3 !text-[14px] font-medium text-[#252525] transition-colors hover:text-[#e2233d]"
                >
                  <InfoIcon>
                    <FaEnvelope />
                  </InfoIcon>
                  <span className="break-all">
                    | info@permisgoautoecole.com
                  </span>
                </Link>
              </div>
            </section>

            <section className="border-b border-[#9ca3af] py-9">
              <h2 className="text-[22px] font-extrabold text-[#e2233d]">
                Visit Us
              </h2>
              <p className="mt-2 !text-[14px] font-medium text-[#333]">
                Speak to our friendly team via live chat.
              </p>
              <div className="group mt-4 flex items-center gap-3 !text-[14px] font-medium text-[#252525]">
                <InfoIcon>
                  <FaLocationDot />
                </InfoIcon>
                <span>| 100 Smith Street, Collingwood VIC 3066</span>
              </div>
            </section>

            <section className="border-b border-[#9ca3af] py-9">
              <h2 className="text-[22px] font-extrabold text-[#e2233d]">
                Social Media
              </h2>
              <p className="mt-2 !text-[14px] font-medium text-[#333]">
                Speak to our friendly team via live chat.
              </p>
              <div className="mt-4 flex flex-wrap gap-3">
                {socialLinks.map(({ label, icon: Icon }) => (
                  <Link
                    key={label}
                    href="#"
                    aria-label={label}
                    className="flex h-9 w-9 items-center justify-center rounded-[3px] bg-[#174a9b] text-[17px] text-white transition-all duration-300 hover:-translate-y-1 hover:bg-[#e2233d] hover:shadow-lg"
                  >
                    <Icon />
                  </Link>
                ))}
              </div>
            </section>
          </aside>
        </div>
      </section>

      {/* Full-width location map */}
      <section
        id="location"
        className="relative h-[360px] w-full overflow-hidden bg-[#d7dfeb] sm:h-[420px] lg:h-[465px]"
      >
        <Image
          src="/image/contact-map.jpg"
          alt="Road map showing the area around Forchheim and Pegnitz"
          fill
          sizes="100vw"
          className="object-cover"
        />
      </section>
    </div>
  );
}
