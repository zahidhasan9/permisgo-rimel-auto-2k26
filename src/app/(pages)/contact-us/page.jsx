// "use client";

// import Link from "next/link";
// import { useState } from "react";
// import { createContactSubmission } from "@/features/API";

// import {
//   FaEnvelope,
//   FaFacebookF,
//   FaInstagram,
//   FaLinkedinIn,
//   FaLocationDot,
//   FaPhone,
//   FaPinterestP,
//   FaWhatsapp,
//   FaCheck,
//   FaXmark,
//   FaYoutube,
//   FaTiktok,
// } from "react-icons/fa6";
// import useSiteSettings from "@/hooks/useSiteSettings";
// import useCmsPageContent from "@/hooks/useCmsPageContent";

// const fields = [
//   {
//     id: "firstName",
//     label: "First name",
//     placeholder: "Write name here",
//     type: "text",
//   },
//   {
//     id: "lastName",
//     label: "Last name",
//     placeholder: "Write last name here",
//     type: "text",
//   },
//   {
//     id: "email",
//     label: "Email",
//     placeholder: "Write email here",
//     type: "email",
//   },
//   {
//     id: "phone",
//     label: "Phone",
//     placeholder: "Write phone number here",
//     type: "tel",
//   },
// ];

// const inputClass =
//   "h-[46px] w-full rounded-[11px] border border-[#b9c9e4] bg-[#f6f8fc] px-4 !text-[14px] font-medium text-[#222] outline-none transition-all duration-300 placeholder:text-[#969696] focus:border-[#174a9b] focus:bg-white focus:ring-4 focus:ring-[#174a9b]/10";

// function InfoIcon({ children }) {
//   return (
//     <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-[2px] bg-[#174a9b] text-[20px] text-white transition-transform duration-300 group-hover:scale-105">
//       {children}
//     </span>
//   );
// }

// export default function ContactUsPage() {
//   const site = useSiteSettings();
//   const { content } = useCmsPageContent("contact-us");
//   const settings = content?.settings || {};
//   const copy = (key, fallback) => settings[key]?.trim?.() || fallback;
//   const mapEmbedUrl = `https://www.google.com/maps?q=${encodeURIComponent(site.address)}&output=embed`;
//   const socialLinks = [
//     { label: "Facebook", icon: FaFacebookF, href: site.facebookUrl },
//     { label: "Instagram", icon: FaInstagram, href: site.instagramUrl },
//     { label: "TikTok", icon: FaTiktok, href: site.tiktokUrl },
//     { label: "YouTube", icon: FaYoutube, href: site.youtubeUrl },
//   ];
//   const initialForm = {
//     firstName: "",
//     lastName: "",
//     email: "",
//     phone: "",
//     subject: "",
//     location: "",
//     description: "",
//   };
//   const [form, setForm] = useState(initialForm);
//   const [submitting, setSubmitting] = useState(false);
//   const [error, setError] = useState("");
//   const [successOpen, setSuccessOpen] = useState(false);
//   const updateField = (event) =>
//     setForm((current) => ({
//       ...current,
//       [event.target.name]: event.target.value,
//     }));
//   const submitContact = async (event) => {
//     event.preventDefault();
//     setSubmitting(true);
//     setError("");
//     try {
//       await createContactSubmission(form);
//       setForm(initialForm);
//       setSuccessOpen(true);
//     } catch (requestError) {
//       setError(
//         requestError.response?.data?.message ||
//           "Your message could not be sent. Please try again.",
//       );
//     } finally {
//       setSubmitting(false);
//     }
//   };
//   return (
//     <div className="bg-[#eef3fb] text-[#1d1d1f]">
//       <section className="mx-auto w-full max-w-[1360px] px-5 pb-20 pt-20 sm:px-8 lg:px-10 lg:pt-20">
//         {/* Heading */}
//         <header className="mx-auto max-w-[760px] text-center">
//           <h1 className="text-[36px] font-extrabold leading-tight tracking-[-0.025em] text-[#1d1d1f] sm:text-[40px]">
//             {copy("heroTitle", "Contact Our Team")}
//           </h1>
//           <p className="mx-auto mt-7 max-w-[665px] !text-[15px] font-medium leading-[1.65] text-[#3f3f3f] sm:!text-[16px]">
//             {copy("heroDescription", "Got any questions about our driving services? We're here to help. Contact our friendly team and get the guidance you need.")}
//           </p>
//         </header>

//         {/* Form and contact details */}
//         <div className="mt-9 grid gap-10 lg:grid-cols-[1.28fr_0.92fr] lg:gap-20 xl:grid-cols-[650px_460px] xl:gap-[86px]">
//           <form
//             onSubmit={submitContact}
//             className="rounded-[12px] bg-white px-6 py-8 sm:px-10 sm:py-10 lg:min-h-[585px] lg:py-9"
//           >
//             <div className="grid gap-x-16 gap-y-6 sm:grid-cols-2">
//               {fields.map((field) => (
//                 <div key={field.id}>
//                   <label
//                     htmlFor={field.id}
//                     className="mb-2.5 block !text-[14px] font-medium text-[#333]"
//                   >
//                     {field.label}
//                   </label>
//                   <input
//                     id={field.id}
//                     name={field.id}
//                     value={form[field.id]}
//                     onChange={updateField}
//                     required
//                     type={field.type}
//                     placeholder={field.placeholder}
//                     className={inputClass}
//                   />
//                 </div>
//               ))}
//             </div>

//             <div className="mt-5">
//               <label
//                 htmlFor="subject"
//                 className="mb-2.5 block !text-[14px] font-medium text-[#333]"
//               >
//                 Subject
//               </label>
//               <input
//                 id="subject"
//                 name="subject"
//                 value={form.subject}
//                 onChange={updateField}
//                 required
//                 type="text"
//                 placeholder="Write subject here"
//                 className={inputClass}
//               />
//             </div>

//             <div className="mt-5">
//               <label
//                 htmlFor="location"
//                 className="mb-2.5 block !text-[14px] font-medium text-[#333]"
//               >
//                 Location
//               </label>
//               <input
//                 id="location"
//                 name="location"
//                 type="text"
//                 value={form.location}
//                 onChange={updateField}
//                 required
//                 placeholder="Write your location here"
//                 className={inputClass}
//               />
//             </div>

//             <div className="mt-5">
//               <label
//                 htmlFor="description"
//                 className="mb-2.5 block !text-[14px] font-medium text-[#333]"
//               >
//                 Description
//               </label>
//               <textarea
//                 id="description"
//                 name="description"
//                 value={form.description}
//                 onChange={updateField}
//                 required
//                 maxLength={3000}
//                 rows={7}
//                 placeholder="Write your message here"
//                 className="min-h-[200px] w-full resize-none rounded-[11px] border border-[#b9c9e4] bg-[#f6f8fc] px-4 py-3 !text-[14px] font-medium text-[#222] outline-none transition-all duration-300 placeholder:text-[#969696] focus:border-[#174a9b] focus:bg-white focus:ring-4 focus:ring-[#174a9b]/10"
//               />
//             </div>

//             {error && (
//               <p className="mt-4 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm font-semibold text-red-700">
//                 {error}
//               </p>
//             )}
//             <button
//               type="submit"
//               disabled={submitting}
//               className="mt-5 inline-flex min-h-12 items-center justify-center rounded-[11px] bg-[#e2233d] px-5 !text-[14px] font-extrabold text-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:bg-[#174a9b] hover:shadow-lg"
//             >
//               {submitting ? "Sending..." : copy("heroButton", "Send Message")}
//             </button>
//           </form>

//           <aside className="border-l border-[#9ca3af] pl-6 sm:pl-8">
//             <section className="border-b border-[#9ca3af] pb-7">
//               <h2 className="text-[22px] font-extrabold text-[#e2233d]">
//                 {copy("sectionTitle", "Contact")}
//               </h2>
//               <p className="mt-2 !text-[14px] font-medium text-[#333]">
//                 {copy("sectionDescription", "Speak to our friendly team via live chat.")}
//               </p>

//               <div className="mt-4 space-y-3">
//                 <Link
//                   href={`tel:${site.phone.replace(/\s/g, "")}`}
//                   className="group flex items-center gap-3 !text-[14px] font-medium text-[#252525] transition-colors hover:text-[#e2233d]"
//                 >
//                   <InfoIcon>
//                     <FaPhone />
//                   </InfoIcon>
//                   <span>| {site.phone}</span>
//                 </Link>
//                 <Link
//                   href={`tel:${site.mobile.replace(/\s/g, "")}`}
//                   className="group flex items-center gap-3 !text-[14px] font-medium text-[#252525] transition-colors hover:text-[#e2233d]"
//                 >
//                   <InfoIcon>
//                     <FaPhone />
//                   </InfoIcon>
//                   <span>| Mobile: {site.mobile}</span>
//                 </Link>
//                 <Link
//                   href={site.whatsappUrl}
//                   target="_blank"
//                   rel="noreferrer"
//                   className="group flex items-center gap-3 !text-[14px] font-medium text-[#252525] transition-colors hover:text-[#e2233d]"
//                 >
//                   <InfoIcon>
//                     <FaWhatsapp />
//                   </InfoIcon>
//                   <span>| {site.whatsappNumber}</span>
//                 </Link>
//                 <Link
//                   href={`mailto:${site.admissionEmail}`}
//                   className="group flex items-center gap-3 !text-[14px] font-medium text-[#252525] transition-colors hover:text-[#e2233d]"
//                 >
//                   <InfoIcon>
//                     <FaEnvelope />
//                   </InfoIcon>
//                   <span className="break-all">| {site.admissionEmail}</span>
//                 </Link>
//               </div>
//             </section>

//             <section className="border-b border-[#9ca3af] py-9">
//               <h2 className="text-[22px] font-extrabold text-[#e2233d]">
//                 {copy("ctaTitle", "Visit Us")}
//               </h2>
//               <p className="mt-2 !text-[14px] font-medium text-[#333]">
//                 Speak to our friendly team via live chat.
//               </p>
//               <div className="group mt-4 flex items-center gap-3 !text-[14px] font-medium text-[#252525]">
//                 <InfoIcon>
//                   <FaLocationDot />
//                 </InfoIcon>
//                 <span>
//                   | {site.address}
//                   <br />| {site.address2}
//                 </span>
//               </div>
//             </section>

//             <section className="border-b border-[#9ca3af] py-9">
//               <h2 className="text-[22px] font-extrabold text-[#e2233d]">
//                 Social Media
//               </h2>
//               <p className="mt-2 !text-[14px] font-medium text-[#333]">
//                 Speak to our friendly team via live chat.
//               </p>
//               <div className="mt-4 flex flex-wrap gap-3">
//                 {socialLinks.map(({ label, icon: Icon, href }) => (
//                   <Link
//                     key={label}
//                     href={href}
//                     target="_blank"
//                     rel="noreferrer"
//                     aria-label={label}
//                     className="flex h-9 w-9 items-center justify-center rounded-[3px] bg-[#174a9b] text-[17px] text-white transition-all duration-300 hover:-translate-y-1 hover:bg-[#e2233d] hover:shadow-lg"
//                   >
//                     <Icon />
//                   </Link>
//                 ))}
//               </div>
//             </section>
//           </aside>
//         </div>
//       </section>
//       {successOpen && (
//         <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-950/55 p-4">
//           <div className="relative w-full max-w-md rounded-2xl bg-white p-8 text-center shadow-2xl">
//             <button
//               type="button"
//               onClick={() => setSuccessOpen(false)}
//               aria-label="Close"
//               className="absolute right-4 top-4 text-slate-400 hover:text-slate-700"
//             >
//               <FaXmark />
//             </button>
//             <span className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100 text-2xl text-emerald-600">
//               <FaCheck />
//             </span>
//             <h2 className="mt-5 text-xl font-extrabold text-slate-900">
//               Message sent successfully
//             </h2>
//             <p className="mt-2 text-sm leading-6 text-slate-500">
//               Thank you for contacting us. Our team will review your message and
//               get back to you.
//             </p>
//             <button
//               type="button"
//               onClick={() => setSuccessOpen(false)}
//               className="mt-6 rounded-xl bg-[#174a9b] px-6 py-3 text-sm font-bold text-white"
//             >
//               Done
//             </button>
//           </div>
//         </div>
//       )}

//       {/* Full-width location map */}
//       <section
//         id="location"
//         className="relative h-[360px] w-full overflow-hidden bg-[#d7dfeb] sm:h-[420px] lg:h-[465px]"
//         aria-label="Open Permis Go Auto École in Google Maps"
//       >
//         <iframe
//           key={mapEmbedUrl}
//           src={mapEmbedUrl}
//           title={`${site.companyName} location on Google Maps`}
//           className="h-full w-full border-0"
//           loading="lazy"
//           referrerPolicy="no-referrer-when-downgrade"
//           allowFullScreen
//         />
//         <a
//           href={site.googleMapUrl}
//           target="_blank"
//           rel="noreferrer"
//           className="absolute bottom-5 left-1/2 z-10 -translate-x-1/2 whitespace-nowrap rounded-xl bg-[#174a9b] px-6 py-3 text-sm font-bold text-white shadow-xl transition hover:bg-[#e2233d]"
//         >
//           {copy("ctaButton", "Open in Google Maps")}
//         </a>
//       </section>
//     </div>
//   );
// }

"use client";

import Link from "next/link";
import { useState } from "react";

import {
  FaCheck,
  FaEnvelope,
  FaFacebookF,
  FaInstagram,
  FaLocationDot,
  FaPhone,
  FaTiktok,
  FaWhatsapp,
  FaXmark,
  FaYoutube,
} from "react-icons/fa6";

import { createContactSubmission } from "@/features/API";
import useSiteSettings from "@/hooks/useSiteSettings";
import useCmsPageContent from "@/hooks/useCmsPageContent";
import { CmsRichText, cmsButtonProps } from "@/components/cms/CmsContent";

const inputClass =
  "h-[46px] w-full rounded-[11px] border px-4 !text-[14px] font-medium text-[#222] outline-none transition-all duration-300 placeholder:text-[#969696] focus:bg-white focus:ring-4 focus:ring-[#174a9b]/10";

function InfoIcon({ children, color }) {
  return (
    <span
      className="flex h-9 w-9 shrink-0 items-center justify-center rounded-[2px] text-[20px] text-white transition-transform duration-300 group-hover:scale-105"
      style={{
        backgroundColor: color,
      }}
    >
      {children}
    </span>
  );
}

export default function ContactUsPage() {
  const site = useSiteSettings();

  const { content, loading } = useCmsPageContent("contact-us");

  const settings = content?.settings || {};

  const copy = (key, fallback = "") => {
    const value = settings?.[key];

    if (typeof value === "string" && value.trim()) {
      return value.trim();
    }

    return fallback ?? "";
  };

  // ==========================================
  // CMS COLORS
  // ==========================================

  const pageBackground = copy("pageBackground", "#eef3fb");
  const formBackground = copy("formBackground", "#ffffff");
  const inputBackground = copy("inputBackground", "#f6f8fc");
  const inputBorderColor = copy("inputBorderColor", "#b9c9e4");

  const primaryColor = copy("primaryColor", "#174a9b");
  const accentColor = copy("accentColor", "#e2233d");
  const dividerColor = copy("dividerColor", "#9ca3af");

  const submitButtonColor = copy("submitButtonColor", accentColor);

  const submitButtonTextColor = copy("submitButtonTextColor", "#ffffff");

  // ==========================================
  // CONTACT INFORMATION
  // Falls back to global Site Settings
  // ==========================================

  const phone = copy("contactPhone", site.phone);
  const mobile = copy("contactMobile", site.mobile);

  const whatsappNumber = copy("whatsappNumber", site.whatsappNumber);

  const whatsappUrl = copy("whatsappUrl", site.whatsappUrl);

  const contactEmail = copy("contactEmail", site.admissionEmail);

  const addressLine1 = copy("addressLine1", site.address);

  const addressLine2 = copy("addressLine2", site.address2);

  const googleMapUrl = copy("googleMapUrl", site.googleMapUrl);

  // ==========================================
  // MAP
  // ==========================================

  const mapAddress = [addressLine1, addressLine2].filter(Boolean).join(", ");

  const mapEmbedUrl = `https://www.google.com/maps?q=${encodeURIComponent(
    mapAddress,
  )}&output=embed`;

  const mapButtonProps = cmsButtonProps(settings, "ctaButton", {
    href: googleMapUrl || "#",
    style: {
      backgroundColor: primaryColor,
      color: "#ffffff",
    },
  });

  // ==========================================
  // SOCIAL LINKS
  // ==========================================

  const socialLinks = [
    {
      label: "Facebook",
      icon: FaFacebookF,
      href: copy("facebookUrl", site.facebookUrl),
    },
    {
      label: "Instagram",
      icon: FaInstagram,
      href: copy("instagramUrl", site.instagramUrl),
    },
    {
      label: "TikTok",
      icon: FaTiktok,
      href: copy("tiktokUrl", site.tiktokUrl),
    },
    {
      label: "YouTube",
      icon: FaYoutube,
      href: copy("youtubeUrl", site.youtubeUrl),
    },
  ].filter((item) => Boolean(item.href));

  // ==========================================
  // CONTACT FORM FIELDS
  // ==========================================

  const formFields = [
    {
      id: "firstName",
      label: copy("firstNameLabel", "First name"),
      placeholder: copy("firstNamePlaceholder", "Write name here"),
      type: "text",
    },
    {
      id: "lastName",
      label: copy("lastNameLabel", "Last name"),
      placeholder: copy("lastNamePlaceholder", "Write last name here"),
      type: "text",
    },
    {
      id: "email",
      label: copy("emailLabel", "Email"),
      placeholder: copy("emailPlaceholder", "Write email here"),
      type: "email",
    },
    {
      id: "phone",
      label: copy("phoneLabel", "Phone"),
      placeholder: copy("phonePlaceholder", "Write phone number here"),
      type: "tel",
    },
  ];

  const initialForm = {
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    subject: "",
    location: "",
    description: "",
  };

  const [form, setForm] = useState(initialForm);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [successOpen, setSuccessOpen] = useState(false);

  const updateField = (event) => {
    const { name, value } = event.target;

    setForm((current) => ({
      ...current,
      [name]: value,
    }));
  };

  const submitContact = async (event) => {
    event.preventDefault();

    setSubmitting(true);
    setError("");

    try {
      await createContactSubmission(form);

      setForm(initialForm);
      setSuccessOpen(true);
    } catch (requestError) {
      setError(
        requestError.response?.data?.message ||
          copy(
            "formErrorText",
            "Your message could not be sent. Please try again.",
          ),
      );
    } finally {
      setSubmitting(false);
    }
  };

  const fieldStyle = {
    backgroundColor: inputBackground,
    borderColor: inputBorderColor,
  };

  const cleanPhone = (value) => String(value || "").replace(/[^\d+]/g, "");

  // Prevent hard-coded text flashing before CMS loads.
  if (loading) {
    return (
      <div
        className="flex min-h-[60vh] items-center justify-center"
        style={{
          backgroundColor: pageBackground,
        }}
      >
        <div
          className="h-10 w-10 animate-spin rounded-full border-4"
          style={{
            borderColor: `${primaryColor}25`,
            borderTopColor: primaryColor,
          }}
          aria-label="Loading contact page"
        />
      </div>
    );
  }

  return (
    <div
      className="text-[#1d1d1f]"
      style={{
        backgroundColor: pageBackground,
      }}
    >
      <section className="mx-auto w-full max-w-[1360px] px-5 pb-20 pt-20 sm:px-8 lg:px-10 lg:pt-20">
        {/* =====================================
            PAGE HEADING
        ===================================== */}

        <header className="mx-auto max-w-[760px] text-center">
          <h1 className="text-[36px] font-extrabold leading-tight tracking-[-0.025em] text-[#1d1d1f] sm:text-[40px]">
            {copy("heroTitle", "Contact Our Team")}
          </h1>

          <CmsRichText
            as="div"
            html={settings.heroDescription}
            fallback="Got any questions about our driving services? We're here to help. Contact our friendly team and get the guidance you need."
            className="mx-auto mt-7 max-w-[665px] !text-[15px] font-medium leading-[1.65] text-[#3f3f3f] sm:!text-[16px]"
          />
        </header>

        {/* =====================================
            FORM + CONTACT INFORMATION
        ===================================== */}

        <div className="mt-9 grid gap-10 lg:grid-cols-[1.28fr_0.92fr] lg:gap-20 xl:grid-cols-[650px_460px] xl:gap-[86px]">
          {/* ==============================
              CONTACT FORM
          ============================== */}

          <form
            onSubmit={submitContact}
            className="rounded-[12px] px-6 py-8 sm:px-10 sm:py-10 lg:min-h-[585px] lg:py-9"
            style={{
              backgroundColor: formBackground,
            }}
          >
            <div className="grid gap-x-16 gap-y-6 sm:grid-cols-2">
              {formFields.map((field) => (
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
                    style={fieldStyle}
                  />
                </div>
              ))}
            </div>

            {/* Subject */}

            <div className="mt-5">
              <label
                htmlFor="subject"
                className="mb-2.5 block !text-[14px] font-medium text-[#333]"
              >
                {copy("subjectLabel", "Subject")}
              </label>

              <input
                id="subject"
                name="subject"
                value={form.subject}
                onChange={updateField}
                required
                type="text"
                placeholder={copy("subjectPlaceholder", "Write subject here")}
                className={inputClass}
                style={fieldStyle}
              />
            </div>

            {/* Location */}

            <div className="mt-5">
              <label
                htmlFor="location"
                className="mb-2.5 block !text-[14px] font-medium text-[#333]"
              >
                {copy("locationLabel", "Location")}
              </label>

              <input
                id="location"
                name="location"
                type="text"
                value={form.location}
                onChange={updateField}
                required
                placeholder={copy(
                  "locationPlaceholder",
                  "Write your location here",
                )}
                className={inputClass}
                style={fieldStyle}
              />
            </div>

            {/* Message */}

            <div className="mt-5">
              <label
                htmlFor="description"
                className="mb-2.5 block !text-[14px] font-medium text-[#333]"
              >
                {copy("messageLabel", "Description")}
              </label>

              <textarea
                id="description"
                name="description"
                value={form.description}
                onChange={updateField}
                required
                maxLength={3000}
                rows={7}
                placeholder={copy(
                  "messagePlaceholder",
                  "Write your message here",
                )}
                className="min-h-[200px] w-full resize-none rounded-[11px] border px-4 py-3 !text-[14px] font-medium text-[#222] outline-none transition-all duration-300 placeholder:text-[#969696] focus:bg-white focus:ring-4 focus:ring-[#174a9b]/10"
                style={fieldStyle}
              />
            </div>

            {/* Error */}

            {error && (
              <p className="mt-4 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm font-semibold text-red-700">
                {error}
              </p>
            )}

            {/* Submit */}

            <button
              type="submit"
              disabled={submitting}
              className="mt-5 inline-flex min-h-12 items-center justify-center rounded-[11px] px-5 !text-[14px] font-extrabold shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg disabled:cursor-not-allowed disabled:opacity-60"
              style={{
                backgroundColor: submitButtonColor,
                color: submitButtonTextColor,
              }}
            >
              {submitting
                ? copy("submittingText", "Sending...")
                : copy("heroButton", "Send Message")}
            </button>
          </form>

          {/* ==============================
              RIGHT SIDE INFORMATION
          ============================== */}

          <aside
            className="border-l pl-6 sm:pl-8"
            style={{
              borderColor: dividerColor,
            }}
          >
            {/* Contact */}

            <section
              className="border-b pb-7"
              style={{
                borderColor: dividerColor,
              }}
            >
              <h2
                className="text-[22px] font-extrabold"
                style={{
                  color: accentColor,
                }}
              >
                {copy("sectionTitle", "Contact")}
              </h2>

              <CmsRichText
                as="div"
                html={settings.sectionDescription}
                fallback="Speak to our friendly team via live chat."
                className="mt-2 !text-[14px] font-medium text-[#333]"
              />

              <div className="mt-4 space-y-3">
                {/* Phone */}

                {phone && (
                  <Link
                    href={`tel:${cleanPhone(phone)}`}
                    className="group flex items-center gap-3 !text-[14px] font-medium text-[#252525] transition-colors"
                  >
                    <InfoIcon color={primaryColor}>
                      <FaPhone />
                    </InfoIcon>

                    <span>| {phone}</span>
                  </Link>
                )}

                {/* Mobile */}

                {mobile && (
                  <Link
                    href={`tel:${cleanPhone(mobile)}`}
                    className="group flex items-center gap-3 !text-[14px] font-medium text-[#252525] transition-colors"
                  >
                    <InfoIcon color={primaryColor}>
                      <FaPhone />
                    </InfoIcon>

                    <span>| Mobile: {mobile}</span>
                  </Link>
                )}

                {/* WhatsApp */}

                {whatsappUrl && (
                  <Link
                    href={whatsappUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="group flex items-center gap-3 !text-[14px] font-medium text-[#252525] transition-colors"
                  >
                    <InfoIcon color={primaryColor}>
                      <FaWhatsapp />
                    </InfoIcon>

                    <span>| {whatsappNumber}</span>
                  </Link>
                )}

                {/* Email */}

                {contactEmail && (
                  <Link
                    href={`mailto:${contactEmail}`}
                    className="group flex items-center gap-3 !text-[14px] font-medium text-[#252525] transition-colors"
                  >
                    <InfoIcon color={primaryColor}>
                      <FaEnvelope />
                    </InfoIcon>

                    <span className="break-all">| {contactEmail}</span>
                  </Link>
                )}
              </div>
            </section>

            {/* Visit Us */}

            <section
              className="border-b py-9"
              style={{
                borderColor: dividerColor,
              }}
            >
              <h2
                className="text-[22px] font-extrabold"
                style={{
                  color: accentColor,
                }}
              >
                {copy("ctaTitle", "Visit Us")}
              </h2>

              <CmsRichText
                as="div"
                html={settings.ctaText}
                fallback="Visit our driving school and speak directly with our friendly team."
                className="mt-2 !text-[14px] font-medium text-[#333]"
              />

              <div className="group mt-4 flex items-center gap-3 !text-[14px] font-medium text-[#252525]">
                <InfoIcon color={primaryColor}>
                  <FaLocationDot />
                </InfoIcon>

                <span>
                  {addressLine1 && <>| {addressLine1}</>}

                  {addressLine2 && (
                    <>
                      <br />| {addressLine2}
                    </>
                  )}
                </span>
              </div>
            </section>

            {/* Social Media */}

            <section
              className="border-b py-9"
              style={{
                borderColor: dividerColor,
              }}
            >
              <h2
                className="text-[22px] font-extrabold"
                style={{
                  color: accentColor,
                }}
              >
                {copy("socialTitle", "Social Media")}
              </h2>

              <CmsRichText
                as="div"
                html={settings.socialDescription}
                fallback="Follow us on social media for updates, driving tips and news."
                className="mt-2 !text-[14px] font-medium text-[#333]"
              />

              <div className="mt-4 flex flex-wrap gap-3">
                {socialLinks.map(({ label, icon: Icon, href }) => (
                  <Link
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={label}
                    className="flex h-9 w-9 items-center justify-center rounded-[3px] text-[17px] text-white transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
                    style={{
                      backgroundColor: primaryColor,
                    }}
                  >
                    <Icon />
                  </Link>
                ))}
              </div>
            </section>
          </aside>
        </div>
      </section>

      {/* =====================================
          SUCCESS POPUP
      ===================================== */}

      {successOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-950/55 p-4">
          <div className="relative w-full max-w-md rounded-2xl bg-white p-8 text-center shadow-2xl">
            <button
              type="button"
              onClick={() => setSuccessOpen(false)}
              aria-label="Close"
              className="absolute right-4 top-4 text-slate-400 transition hover:text-slate-700"
            >
              <FaXmark />
            </button>

            <span className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100 text-2xl text-emerald-600">
              <FaCheck />
            </span>

            <h2 className="mt-5 text-xl font-extrabold text-slate-900">
              {copy("successTitle", "Message sent successfully")}
            </h2>

            <CmsRichText
              as="div"
              html={settings.successDescription}
              fallback="Thank you for contacting us. Our team will review your message and get back to you."
              className="mt-2 text-sm leading-6 text-slate-500"
            />

            <button
              type="button"
              onClick={() => setSuccessOpen(false)}
              className="mt-6 rounded-xl px-6 py-3 text-sm font-bold text-white"
              style={{
                backgroundColor: primaryColor,
              }}
            >
              {copy("successButton", "Done")}
            </button>
          </div>
        </div>
      )}

      {/* =====================================
          GOOGLE MAP
      ===================================== */}

      <section
        id="location"
        className="relative h-[360px] w-full overflow-hidden bg-[#d7dfeb] sm:h-[420px] lg:h-[465px]"
        aria-label={copy(
          "mapAriaLabel",
          `Open ${site.companyName || "Permis Go"} in Google Maps`,
        )}
      >
        <iframe
          key={mapEmbedUrl}
          src={mapEmbedUrl}
          title={`${site.companyName || "Permis Go"} location on Google Maps`}
          className="h-full w-full border-0"
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          allowFullScreen
        />

        {mapButtonProps.href && (
          <a
            href={mapButtonProps.href}
            target="_blank"
            rel="noreferrer"
            style={mapButtonProps.style}
            className="absolute bottom-5 left-1/2 z-10 -translate-x-1/2 whitespace-nowrap rounded-xl px-6 py-3 text-sm font-bold shadow-xl transition hover:-translate-y-[calc(50%+4px)]"
          >
            {copy("ctaButton", "Open in Google Maps")}
          </a>
        )}
      </section>
    </div>
  );
}
