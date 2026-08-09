"use client";

import Link from "next/link";
import { useState } from "react";
import { createContactSubmission } from "@/features/API";

import {
  FaEnvelope,
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaLocationDot,
  FaPhone,
  FaPinterestP,
  FaWhatsapp,
  FaCheck,
  FaXmark,
  FaYoutube,
  FaTiktok,
} from "react-icons/fa6";
import useSiteSettings from "@/hooks/useSiteSettings";

const fields = [
  {
    id: "firstName",
    label: "First name",
    placeholder: "Write name here",
    type: "text",
  },
  {
    id: "lastName",
    label: "Last name",
    placeholder: "Write last name here",
    type: "text",
  },
  {
    id: "email",
    label: "Email",
    placeholder: "Write email here",
    type: "email",
  },
  {
    id: "phone",
    label: "Phone",
    placeholder: "Write phone number here",
    type: "tel",
  },
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
  const site = useSiteSettings();
  const mapEmbedUrl = `https://www.google.com/maps?q=${encodeURIComponent(site.address)}&output=embed`;
  const socialLinks = [
    { label: "Facebook", icon: FaFacebookF, href: site.facebookUrl },
    { label: "Instagram", icon: FaInstagram, href: site.instagramUrl },
    { label: "TikTok", icon: FaTiktok, href: site.tiktokUrl },
    { label: "YouTube", icon: FaYoutube, href: site.youtubeUrl },
  ];
  const initialForm = { firstName: "", lastName: "", email: "", phone: "", subject: "", location: "", description: "" };
  const [form, setForm] = useState(initialForm);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [successOpen, setSuccessOpen] = useState(false);
  const updateField = (event) => setForm((current) => ({ ...current, [event.target.name]: event.target.value }));
  const submitContact = async (event) => {
    event.preventDefault();
    setSubmitting(true);
    setError("");
    try {
      await createContactSubmission(form);
      setForm(initialForm);
      setSuccessOpen(true);
    } catch (requestError) {
      setError(requestError.response?.data?.message || "Your message could not be sent. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };
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
            onSubmit={submitContact}
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
                    value={form[field.id]}
                    onChange={updateField}
                    required
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
                Subject
              </label>
              <input
                id="subject"
                name="subject"
                value={form.subject}
                onChange={updateField}
                required
                type="text"
                placeholder="Write subject here"
                className={inputClass}
              />
            </div>

            <div className="mt-5">
              <label htmlFor="location" className="mb-2.5 block !text-[14px] font-medium text-[#333]">Location</label>
              <input id="location" name="location" type="text" value={form.location} onChange={updateField} required placeholder="Write your location here" className={inputClass} />
            </div>

            <div className="mt-5">
              <label
                htmlFor="description"
                className="mb-2.5 block !text-[14px] font-medium text-[#333]"
              >
                Description
              </label>
              <textarea
                id="description"
                name="description"
                value={form.description}
                onChange={updateField}
                required
                maxLength={3000}
                rows={7}
                placeholder="Write your message here"
                className="min-h-[200px] w-full resize-none rounded-[11px] border border-[#b9c9e4] bg-[#f6f8fc] px-4 py-3 !text-[14px] font-medium text-[#222] outline-none transition-all duration-300 placeholder:text-[#969696] focus:border-[#174a9b] focus:bg-white focus:ring-4 focus:ring-[#174a9b]/10"
              />
            </div>

            {error && <p className="mt-4 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm font-semibold text-red-700">{error}</p>}
            <button
              type="submit"
              disabled={submitting}
              className="mt-5 inline-flex min-h-12 items-center justify-center rounded-[11px] bg-[#e2233d] px-5 !text-[14px] font-extrabold text-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:bg-[#174a9b] hover:shadow-lg"
            >
              {submitting ? "Sending..." : "Send Message"}
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
                  href={`tel:${site.phone.replace(/\s/g, "")}`}
                  className="group flex items-center gap-3 !text-[14px] font-medium text-[#252525] transition-colors hover:text-[#e2233d]"
                >
                  <InfoIcon>
                    <FaPhone />
                  </InfoIcon>
                  <span>| {site.phone}</span>
                </Link>
                <Link
                  href={`tel:${site.mobile.replace(/\s/g, "")}`}
                  className="group flex items-center gap-3 !text-[14px] font-medium text-[#252525] transition-colors hover:text-[#e2233d]"
                >
                  <InfoIcon>
                    <FaPhone />
                  </InfoIcon>
                  <span>| Mobile: {site.mobile}</span>
                </Link>
                <Link
                  href={site.whatsappUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="group flex items-center gap-3 !text-[14px] font-medium text-[#252525] transition-colors hover:text-[#e2233d]"
                >
                  <InfoIcon>
                    <FaWhatsapp />
                  </InfoIcon>
                  <span>| {site.whatsappNumber}</span>
                </Link>
                <Link
                  href={`mailto:${site.admissionEmail}`}
                  className="group flex items-center gap-3 !text-[14px] font-medium text-[#252525] transition-colors hover:text-[#e2233d]"
                >
                  <InfoIcon>
                    <FaEnvelope />
                  </InfoIcon>
                  <span className="break-all">
                    | {site.admissionEmail}
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
                <span>| {site.address}<br />| {site.address2}</span>
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
                {socialLinks.map(({ label, icon: Icon, href }) => (
                  <Link
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noreferrer"
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
      {successOpen && <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-950/55 p-4"><div className="relative w-full max-w-md rounded-2xl bg-white p-8 text-center shadow-2xl"><button type="button" onClick={() => setSuccessOpen(false)} aria-label="Close" className="absolute right-4 top-4 text-slate-400 hover:text-slate-700"><FaXmark /></button><span className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100 text-2xl text-emerald-600"><FaCheck /></span><h2 className="mt-5 text-xl font-extrabold text-slate-900">Message sent successfully</h2><p className="mt-2 text-sm leading-6 text-slate-500">Thank you for contacting us. Our team will review your message and get back to you.</p><button type="button" onClick={() => setSuccessOpen(false)} className="mt-6 rounded-xl bg-[#174a9b] px-6 py-3 text-sm font-bold text-white">Done</button></div></div>}

      {/* Full-width location map */}
      <section
        id="location"
        className="relative h-[360px] w-full overflow-hidden bg-[#d7dfeb] sm:h-[420px] lg:h-[465px]"
        aria-label="Open Permis Go Auto École in Google Maps"
      >
        <iframe
          key={mapEmbedUrl}
          src={mapEmbedUrl}
          title={`${site.companyName} location on Google Maps`}
          className="h-full w-full border-0"
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          allowFullScreen
        />
        <a href={site.googleMapUrl} target="_blank" rel="noreferrer" className="absolute bottom-5 left-1/2 z-10 -translate-x-1/2 whitespace-nowrap rounded-xl bg-[#174a9b] px-6 py-3 text-sm font-bold text-white shadow-xl transition hover:bg-[#e2233d]">Open in Google Maps</a>
      </section>
    </div>
  );
}
