"use client";

import { useEffect, useState } from "react";
import { FaSave, FaSpinner } from "react-icons/fa";
import {
  getAdminDrivingSettings,
  updateAdminDrivingSettings,
} from "@/features/API";
import { defaultSiteSettings } from "@/hooks/useSiteSettings";
import { showToast } from "@/utils/showToast";

const fields = [
  ["companyName", "Company name", "text"],
  ["domainName", "Domain name", "text"],
  ["websiteUrl", "Website URL", "url"],
  ["supportEmail", "Support email", "email"],
  ["admissionEmail", "Admission email", "email"],
  ["phone", "Telephone", "tel"],
  ["mobile", "Mobile number", "tel"],
  ["whatsappNumber", "WhatsApp number", "tel"],
  ["whatsappUrl", "WhatsApp link", "url"],
  ["address", "Primary address", "text"],
  ["address2", "Second address", "text"],
  ["googleMapUrl", "Google Map link", "url"],
  ["facebookUrl", "Facebook link", "url"],
  ["instagramUrl", "Instagram link", "url"],
  ["tiktokUrl", "TikTok link", "url"],
  ["youtubeUrl", "YouTube link", "url"],
];

const inputClass =
  "mt-2 h-12 w-full rounded-xl border border-slate-200 bg-white px-4 text-sm outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100 disabled:opacity-60";

export default function AdminSettingsPage() {
  const [form, setForm] = useState({
    requiredHours: "20",
    requiredSkillsPercentage: "60",
    contactRecipientEmail: "",
    ...defaultSiteSettings,
  });
  const [saved, setSaved] = useState(form);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    getAdminDrivingSettings()
      .then((response) => {
        const data = { ...defaultSiteSettings, ...(response.data?.data || {}) };
        const next = {
          ...data,
          requiredHours: String(data.requiredHours || 20),
          requiredSkillsPercentage: String(data.requiredSkillsPercentage || 60),
          contactRecipientEmail: data.contactRecipientEmail || "",
        };
        setForm(next);
        setSaved(next);
      })
      .catch((error) =>
        showToast.error(
          error.response?.data?.message || "Settings could not be loaded.",
        ),
      )
      .finally(() => setLoading(false));
  }, []);

  const update = (key, value) =>
    setForm((current) => ({ ...current, [key]: value }));
  const save = async () => {
    const hours = Number(form.requiredHours);
    const skills = Number(form.requiredSkillsPercentage);
    if (!Number.isFinite(hours) || hours < 1 || hours > 200)
      return showToast.error("Required hours must be between 1 and 200.");
    if (!Number.isFinite(skills) || skills < 1 || skills > 100)
      return showToast.error(
        "Required skills must be between 1 and 100 percent.",
      );
    setSaving(true);
    try {
      const siteSettings = Object.fromEntries(
        Object.keys(defaultSiteSettings).map((key) => [
          key,
          form[key]?.trim() || "",
        ]),
      );
      const response = await updateAdminDrivingSettings(
        hours,
        skills,
        form.contactRecipientEmail.trim(),
        siteSettings,
      );
      const next = {
        ...form,
        ...(response.data?.data || {}),
        requiredHours: String(response.data?.data?.requiredHours || hours),
        requiredSkillsPercentage: String(
          response.data?.data?.requiredSkillsPercentage || skills,
        ),
      };
      setForm(next);
      setSaved(next);
      showToast.success("Company and platform settings updated.");
    } catch (error) {
      showToast.error(
        error.response?.data?.message || "Settings could not be saved.",
      );
    } finally {
      setSaving(false);
    }
  };

  const section = (title, description, content) => (
    <section className="mt-6 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
      <header className="border-b border-slate-100 px-5 py-5 sm:px-6">
        <h2 className="font-bold text-slate-900">{title}</h2>
        <p className="mt-1 text-sm text-slate-500">{description}</p>
      </header>
      {content}
    </section>
  );

  return (
    <main className="min-h-screen bg-slate-50 px-4 py-6 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-5xl">
        <h1 className="text-2xl font-bold text-slate-900">Settings</h1>
        <p className="mt-2 text-sm text-slate-500">
          Manage company details and platform-wide configuration.
        </p>
        {section(
          "Driving requirements",
          "These targets apply to every student.",
          <div className="grid gap-5 p-5 sm:p-6 md:grid-cols-2">
            <Field label="Required driving hours">
              <input
                type="number"
                min="1"
                max="200"
                value={form.requiredHours}
                onChange={(e) => update("requiredHours", e.target.value)}
                className={inputClass}
              />
            </Field>
            <Field label="Required skills percentage">
              <input
                type="number"
                min="1"
                max="100"
                value={form.requiredSkillsPercentage}
                onChange={(e) =>
                  update("requiredSkillsPercentage", e.target.value)
                }
                className={inputClass}
              />
            </Field>
          </div>,
        )}
        {section(
          "Contact notification",
          "New contact submissions are emailed to this address when SMTP is configured.",
          <div className="p-5 sm:p-6">
            <Field label="Notification recipient email">
              <input
                type="email"
                value={form.contactRecipientEmail}
                onChange={(e) =>
                  update("contactRecipientEmail", e.target.value)
                }
                className={inputClass}
              />
            </Field>
          </div>,
        )}
        {section(
          "Company, contact and social details",
          "These details appear across the public website.",
          <div className="grid gap-5 p-5 sm:p-6 md:grid-cols-2">
            {fields.map(([key, label, type]) => (
              <div
                key={key}
                className={
                  key === "address" || key === "address2" ? "md:col-span-2" : ""
                }
              >
                <Field label={label}>
                  <input
                    type={type}
                    value={form[key] || ""}
                    onChange={(e) => update(key, e.target.value)}
                    className={inputClass}
                  />
                </Field>
              </div>
            ))}
          </div>,
        )}
        <button
          type="button"
          onClick={save}
          disabled={
            loading || saving || JSON.stringify(form) === JSON.stringify(saved)
          }
          className="mt-6 inline-flex h-12 items-center gap-2 rounded-xl bg-[#174A9B] px-6 text-sm font-bold text-white disabled:opacity-50"
        >
          {loading || saving ? (
            <FaSpinner className="animate-spin" />
          ) : (
            <FaSave />
          )}{" "}
          Save all settings
        </button>
      </div>
    </main>
  );
}

function Field({ label, children }) {
  return (
    <label className="block text-sm font-bold text-slate-800">
      {label}
      {children}
    </label>
  );
}
