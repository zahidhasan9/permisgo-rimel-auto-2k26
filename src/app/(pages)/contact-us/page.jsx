import Link from "next/link";

// Icons
import {
  FaInstagram,
  FaLinkedin,
  FaPhoneAlt,
  FaPinterestP,
  FaWhatsapp,
  FaYoutube,
} from "react-icons/fa";
import { FaFacebookF } from "react-icons/fa6";
import { GrLocation } from "react-icons/gr";
import { MdOutlineEmail } from "react-icons/md";

const Contact = () => {
  return (
    <main className="min-h-screen bg-[#f5f5f7] px-4 py-10 sm:px-6 lg:px-10">
      <div className="mx-auto max-w-[1120px]">
        {/* Header */}
        <section className="mx-auto max-w-[760px] pb-10 pt-4 text-center">
          <span className="mb-5 inline-flex rounded-full bg-white px-4 py-2 text-[12px] font-semibold tracking-wide text-[#6e6e73] shadow-sm">
            Contact Support
          </span>

          <h1 className="text-[40px] font-semibold leading-[1.05] tracking-[-0.045em] text-[#1d1d1f] sm:text-[56px] lg:text-[64px]">
            Let&apos;s talk about your driving journey.
          </h1>

          <p className="mx-auto mt-5 max-w-[620px] text-[16px] leading-7 text-[#6e6e73] sm:text-[18px]">
            Have a question about courses, registration, schedules, or support?
            Send us a message and our team will get back to you.
          </p>
        </section>

        {/* Top Contact Cards */}
        <section className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-3">
          <Link
            href="tel:+94814585584"
            className="group rounded-[26px] bg-white p-6 shadow-[0_12px_35px_rgba(0,0,0,0.045)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_18px_45px_rgba(0,0,0,0.07)]"
          >
            <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-full bg-[#f5f5f7] text-[#0071e3]">
              <FaPhoneAlt />
            </div>

            <h3 className="text-[19px] font-semibold tracking-[-0.02em] text-[#1d1d1f]">
              Call us
            </h3>

            <p className="mt-2 text-[14px] leading-6 text-[#6e6e73]">
              Speak directly with our support team.
            </p>

            <p className="mt-4 text-[14px] font-semibold text-[#0071e3]">
              +948 1458 5584
            </p>
          </Link>

          <Link
            href="mailto:info@permisgoautoecole.com"
            className="group rounded-[26px] bg-white p-6 shadow-[0_12px_35px_rgba(0,0,0,0.045)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_18px_45px_rgba(0,0,0,0.07)]"
          >
            <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-full bg-[#f5f5f7] text-[#0071e3]">
              <MdOutlineEmail className="text-[21px]" />
            </div>

            <h3 className="text-[19px] font-semibold tracking-[-0.02em] text-[#1d1d1f]">
              Email us
            </h3>

            <p className="mt-2 text-[14px] leading-6 text-[#6e6e73]">
              Send your question anytime.
            </p>

            <p className="mt-4 break-all text-[14px] font-semibold text-[#0071e3]">
              info@permisgoautoecole.com
            </p>
          </Link>

          <Link
            href="#location"
            className="group rounded-[26px] bg-white p-6 shadow-[0_12px_35px_rgba(0,0,0,0.045)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_18px_45px_rgba(0,0,0,0.07)]"
          >
            <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-full bg-[#f5f5f7] text-[#0071e3]">
              <GrLocation />
            </div>

            <h3 className="text-[19px] font-semibold tracking-[-0.02em] text-[#1d1d1f]">
              Visit us
            </h3>

            <p className="mt-2 text-[14px] leading-6 text-[#6e6e73]">
              Come to our office location.
            </p>

            <p className="mt-4 text-[14px] font-semibold text-[#0071e3]">
              View location
            </p>
          </Link>
        </section>

        {/* Main Contact Panel */}
        <section className="overflow-hidden rounded-[34px] bg-white shadow-[0_18px_55px_rgba(0,0,0,0.06)]">
          <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr]">
            {/* Form */}
            <div className="p-6 sm:p-8 lg:p-10">
              <div className="mb-8">
                <h2 className="text-[30px] font-semibold tracking-[-0.035em] text-[#1d1d1f] sm:text-[36px]">
                  Send us a message
                </h2>

                <p className="mt-2 max-w-[520px] text-[15px] leading-7 text-[#6e6e73]">
                  Fill out the form below. We&apos;ll reply with the right
                  information as soon as possible.
                </p>
              </div>

              <form action="" className="space-y-4">
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div>
                    <label
                      htmlFor="firstName"
                      className="mb-2 block text-[13px] font-semibold text-[#1d1d1f]"
                    >
                      First Name
                    </label>

                    <input
                      id="firstName"
                      type="text"
                      placeholder="First Name"
                      required
                      className="h-12 w-full rounded-2xl border border-transparent bg-[#f5f5f7] px-4 text-[14px] text-[#1d1d1f] outline-none transition placeholder:text-[#86868b] focus:border-[#0071e3] focus:bg-white focus:ring-4 focus:ring-[#0071e3]/10"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="lastName"
                      className="mb-2 block text-[13px] font-semibold text-[#1d1d1f]"
                    >
                      Last Name
                    </label>

                    <input
                      id="lastName"
                      type="text"
                      placeholder="Last Name"
                      required
                      className="h-12 w-full rounded-2xl border border-transparent bg-[#f5f5f7] px-4 text-[14px] text-[#1d1d1f] outline-none transition placeholder:text-[#86868b] focus:border-[#0071e3] focus:bg-white focus:ring-4 focus:ring-[#0071e3]/10"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div>
                    <label
                      htmlFor="phone"
                      className="mb-2 block text-[13px] font-semibold text-[#1d1d1f]"
                    >
                      Phone Number
                    </label>

                    <input
                      id="phone"
                      type="tel"
                      placeholder="Phone"
                      required
                      className="h-12 w-full rounded-2xl border border-transparent bg-[#f5f5f7] px-4 text-[14px] text-[#1d1d1f] outline-none transition placeholder:text-[#86868b] focus:border-[#0071e3] focus:bg-white focus:ring-4 focus:ring-[#0071e3]/10"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="email"
                      className="mb-2 block text-[13px] font-semibold text-[#1d1d1f]"
                    >
                      Email
                    </label>

                    <input
                      id="email"
                      type="email"
                      placeholder="Email"
                      required
                      className="h-12 w-full rounded-2xl border border-transparent bg-[#f5f5f7] px-4 text-[14px] text-[#1d1d1f] outline-none transition placeholder:text-[#86868b] focus:border-[#0071e3] focus:bg-white focus:ring-4 focus:ring-[#0071e3]/10"
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="subject"
                    className="mb-2 block text-[13px] font-semibold text-[#1d1d1f]"
                  >
                    Subject
                  </label>

                  <input
                    id="subject"
                    type="text"
                    placeholder="Subject"
                    className="h-12 w-full rounded-2xl border border-transparent bg-[#f5f5f7] px-4 text-[14px] text-[#1d1d1f] outline-none transition placeholder:text-[#86868b] focus:border-[#0071e3] focus:bg-white focus:ring-4 focus:ring-[#0071e3]/10"
                  />
                </div>

                <div>
                  <label
                    htmlFor="message"
                    className="mb-2 block text-[13px] font-semibold text-[#1d1d1f]"
                  >
                    Message
                  </label>

                  <textarea
                    id="message"
                    rows={5}
                    placeholder="Write your message..."
                    className="w-full resize-none rounded-2xl border border-transparent bg-[#f5f5f7] px-4 py-4 text-[14px] text-[#1d1d1f] outline-none transition placeholder:text-[#86868b] focus:border-[#0071e3] focus:bg-white focus:ring-4 focus:ring-[#0071e3]/10"
                  />
                </div>

                <button
                  type="submit"
                  className="inline-flex h-12 items-center justify-center rounded-full bg-[#0071e3] px-7 text-[14px] font-semibold text-white transition hover:bg-[#0066cc]"
                >
                  Send Message
                </button>
              </form>
            </div>

            {/* Right Info Panel */}
            <div className="bg-[#1d1d1f] p-6 text-white sm:p-8 lg:p-10">
              <div className="flex h-full flex-col justify-between gap-10">
                <div>
                  <span className="inline-flex rounded-full bg-white/10 px-4 py-2 text-[12px] font-semibold text-white/70">
                    We&apos;re here to help
                  </span>

                  <h2 className="mt-6 text-[32px] font-semibold leading-tight tracking-[-0.04em] sm:text-[40px]">
                    Get the right support, faster.
                  </h2>

                  <p className="mt-4 text-[15px] leading-7 text-white/65">
                    Contact us for course information, admission support,
                    schedule details, and student guidance.
                  </p>
                </div>

                <div className="space-y-4">
                  <Link
                    href="tel:+94814585584"
                    className="flex items-center gap-4 rounded-[22px] bg-white/8 p-4 transition hover:bg-white/12"
                  >
                    <span className="flex h-11 w-11 items-center justify-center rounded-full bg-white text-[#0071e3]">
                      <FaPhoneAlt />
                    </span>

                    <div>
                      <p className="text-[13px] text-white/55">Phone</p>
                      <p className="text-[15px] font-semibold">
                        +948 1458 5584
                      </p>
                    </div>
                  </Link>

                  <Link
                    href="https://wa.me/94814585584"
                    className="flex items-center gap-4 rounded-[22px] bg-white/8 p-4 transition hover:bg-white/12"
                  >
                    <span className="flex h-11 w-11 items-center justify-center rounded-full bg-white text-[#0071e3]">
                      <FaWhatsapp />
                    </span>

                    <div>
                      <p className="text-[13px] text-white/55">WhatsApp</p>
                      <p className="text-[15px] font-semibold">
                        +948 1458 5584
                      </p>
                    </div>
                  </Link>

                  <Link
                    href="mailto:info@permisgoautoecole.com"
                    className="flex items-center gap-4 rounded-[22px] bg-white/8 p-4 transition hover:bg-white/12"
                  >
                    <span className="flex h-11 w-11 items-center justify-center rounded-full bg-white text-[#0071e3]">
                      <MdOutlineEmail className="text-[22px]" />
                    </span>

                    <div>
                      <p className="text-[13px] text-white/55">Email</p>
                      <p className="break-all text-[15px] font-semibold">
                        info@permisgoautoecole.com
                      </p>
                    </div>
                  </Link>
                </div>

                <div>
                  <p className="mb-4 text-[13px] font-semibold text-white/55">
                    Follow us
                  </p>

                  <div className="flex flex-wrap gap-3">
                    {[
                      { icon: <FaFacebookF />, label: "Facebook" },
                      { icon: <FaInstagram />, label: "Instagram" },
                      { icon: <FaLinkedin />, label: "LinkedIn" },
                      { icon: <FaPinterestP />, label: "Pinterest" },
                      { icon: <FaYoutube />, label: "YouTube" },
                    ].map((social) => (
                      <Link
                        key={social.label}
                        href="#"
                        aria-label={social.label}
                        className="flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-white transition hover:bg-white hover:text-[#0071e3]"
                      >
                        {social.icon}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Visit Section */}
        <section
          id="location"
          className="mt-8 grid grid-cols-1 gap-5 lg:grid-cols-[0.8fr_1.2fr]"
        >
          <div className="rounded-[30px] bg-white p-7 shadow-[0_14px_40px_rgba(0,0,0,0.05)] sm:p-8">
            <span className="mb-5 flex h-12 w-12 items-center justify-center rounded-full bg-[#f5f5f7] text-[#0071e3]">
              <GrLocation />
            </span>

            <h2 className="text-[30px] font-semibold tracking-[-0.035em] text-[#1d1d1f]">
              Visit our office
            </h2>

            <p className="mt-3 text-[15px] leading-7 text-[#6e6e73]">
              We welcome students and visitors during office hours. Contact us
              before visiting for faster assistance.
            </p>

            <p className="mt-5 text-[15px] font-semibold leading-7 text-[#1d1d1f]">
              100 Smith Street,
              <br />
              Collingwood VIC 3066
            </p>
          </div>

          <div className="overflow-hidden rounded-[30px] bg-white shadow-[0_14px_40px_rgba(0,0,0,0.05)]">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d8828.30495950775!2d2.2811378894284364!3d48.864488194411784!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47e66ffbef6382f9%3A0x7449a3de106d1a2!2s2%20Av.%20Georges%20Mandel%2C%2075016%20Paris%2C%20France!5e0!3m2!1sen!2sbd!4v1771927684953!5m2!1sen!2sbd"
              width="100%"
              height="360"
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="h-[300px] w-full border-0 sm:h-[360px]"
            />
          </div>
        </section>
      </div>
    </main>
  );
};

export default Contact;
