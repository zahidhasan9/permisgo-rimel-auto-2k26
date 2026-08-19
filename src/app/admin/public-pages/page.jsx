"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  FaCheckCircle,
  FaDesktop,
  FaEye,
  FaMobileAlt,
  FaSave,
  FaSearch,
  FaTimes,
  FaTrash,
} from "react-icons/fa";
import { deleteCmsPage, getAdminCmsPages, saveCmsPage, uploadCmsPageImage } from "@/features/API";
import { getSitePageSchema } from "@/lib/sitePageSchemas";
import CmsWordEditor from "@/components/cms/CmsWordEditor";

const languages = [
  { key: "en", label: "English", short: "EN" },
  { key: "bn", label: "বাংলা", short: "BN" },
  { key: "fr", label: "Français", short: "FR" },
];
const blankTranslation = {
  title: "",
  excerpt: "",
  content: "",
  seoTitle: "",
  seoDescription: "",
  keywords: [],
  imageAlt: "",
  settings: {},
};
const makeBlankPage = () => ({
  slug: "",
  translations: Object.fromEntries(
    languages.map(({ key }) => [key, { ...blankTranslation }]),
  ),
  ogImage: "",
  status: "draft",
  noIndex: false,
  showInFooter: true,
  footerSection: "services",
  footerOrder: 0,
  pageTemplate: "modern",
  accentColor: "#123f88",
  contentAlignment: "left",
  ctaUrl: "",
});
const inputClass =
  "mt-1.5 w-full rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 text-sm font-normal text-slate-800 outline-none transition focus:border-blue-400 focus:ring-4 focus:ring-blue-50";
const isComplete = (value) =>
  Boolean(
    value?.title?.trim() && value?.excerpt?.trim() && value?.content?.trim(),
  );
const normalizePage = (page) => ({
  ...makeBlankPage(),
  ...page,
  translations: Object.fromEntries(
    languages.map(({ key }) => [
      key,
      { ...blankTranslation, ...(page.translations?.[key] || {}) },
    ]),
  ),
});

function RichEditorField({ id, label, value, active, onActivate, onChange, editorKey }) {
  const plainText = String(value || "")
    .replace(/<[^>]*>/g, " ")
    .replace(/\s+/g, " ")
    .trim();
  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-3 sm:p-4">
      <div className="mb-3 flex items-center justify-between gap-3">
        <h3 className="text-sm font-black text-slate-800">{label}</h3>
        <button
          type="button"
          onClick={() => onActivate(active ? "" : id)}
          className="shrink-0 rounded-lg bg-blue-50 px-3 py-1.5 text-xs font-black text-[#174a9b] hover:bg-blue-100"
        >
          {active ? "Done editing" : "Edit content"}
        </button>
      </div>
      {active ? (
        <CmsWordEditor key={editorKey} value={value} onChange={onChange} />
      ) : (
        <button
          type="button"
          onClick={() => onActivate(id)}
          className="min-h-20 w-full rounded-xl bg-slate-50 p-4 text-left text-sm leading-6 text-slate-600 hover:bg-slate-100"
        >
          {plainText || "No content yet. Click to edit."}
        </button>
      )}
    </section>
  );
}

function PreviewModal({ form, language, onLanguage, onClose }) {
  const [device, setDevice] = useState("desktop");
  const content = form.translations[language] || blankTranslation;
  const paragraphs = String(content.content || "")
    .split(/\n\s*\n/)
    .filter(Boolean);
  return (
    <div className="fixed inset-0 z-[100] flex flex-col bg-slate-950/70 p-2 backdrop-blur-sm sm:p-5">
      <div className="mx-auto flex w-full max-w-7xl items-center justify-between rounded-t-2xl bg-slate-900 px-4 py-3 text-white">
        <div>
          <p className="font-bold">Unsaved page preview</p>
          <p className="text-xs text-slate-400">
            Current form values—saving is not required.
          </p>
        </div>
        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => setDevice("desktop")}
            className={`rounded-lg p-2 ${device === "desktop" ? "bg-white text-slate-900" : "bg-slate-800"}`}
          >
            <FaDesktop />
          </button>
          <button
            type="button"
            onClick={() => setDevice("mobile")}
            className={`rounded-lg p-2 ${device === "mobile" ? "bg-white text-slate-900" : "bg-slate-800"}`}
          >
            <FaMobileAlt />
          </button>
          <button
            type="button"
            onClick={onClose}
            className="ml-2 rounded-lg bg-red-500 p-2"
          >
            <FaTimes />
          </button>
        </div>
      </div>
      <div className="mx-auto flex min-h-0 w-full max-w-7xl flex-1 justify-center overflow-auto rounded-b-2xl bg-slate-200 p-2 sm:p-5">
        <article
          className={`min-h-full overflow-hidden bg-white shadow-xl transition-all ${device === "mobile" ? "w-[390px] max-w-full" : "w-full"}`}
        >
          <header className="bg-[#123f88] px-5 py-12 text-white sm:px-8">
            <div className="mx-auto max-w-5xl">
              <div className="mb-5 flex gap-2">
                {languages.map(({ key, short }) => (
                  <button
                    key={key}
                    type="button"
                    onClick={() => onLanguage(key)}
                    className={`rounded-full px-3 py-1 text-xs font-bold ${language === key ? "bg-white text-[#123f88]" : "bg-blue-800"}`}
                  >
                    {short}
                  </button>
                ))}
              </div>
              <h1 className="text-3xl font-black sm:text-5xl">
                {content.title || "Page title"}
              </h1>
              <p className="mt-4 max-w-3xl leading-7 text-blue-50">
                {content.excerpt || "Page introduction will appear here."}
              </p>
            </div>
          </header>
          <div className="mx-auto max-w-5xl px-5 py-10 sm:px-8">
            {form.ogImage && (
              <img
                src={form.ogImage}
                alt={content.imageAlt || content.title}
                className="mb-8 max-h-[460px] w-full rounded-2xl object-cover"
              />
            )}
            <div className="space-y-5 leading-8 text-slate-700">
              {paragraphs.length ? (
                paragraphs.map((paragraph, index) => (
                  <p key={index} className="whitespace-pre-line">
                    {paragraph}
                  </p>
                ))
              ) : (
                <p className="italic text-slate-400">
                  Page content will appear here.
                </p>
              )}
            </div>
            <div className="mt-12 rounded-xl border bg-slate-50 p-4">
              <p className="text-xs font-bold uppercase text-slate-400">
                Google preview
              </p>
              <p className="mt-2 text-lg text-blue-700">
                {content.seoTitle || content.title || "SEO title"}
              </p>
              <p className="text-sm text-green-700">
                /{language}/{form.slug || "page-slug"}
              </p>
              <p className="mt-1 text-sm text-slate-600">
                {content.seoDescription || content.excerpt || "SEO description"}
              </p>
            </div>
          </div>
        </article>
      </div>
    </div>
  );
}

export function PublicPagesCmsEditor({
  initialSlug = "",
  focused = false,
  designed = false,
  custom = false,
}) {
  const router = useRouter();
  const [pages, setPages] = useState([]),
    [form, setForm] = useState(makeBlankPage),
    [language, setLanguage] = useState("en"),
    [search, setSearch] = useState(""),
    [loading, setLoading] = useState(true),
    [saving, setSaving] = useState(false),
    [uploadingImage, setUploadingImage] = useState(""),
    [activeEditor, setActiveEditor] = useState(""),
    [message, setMessage] = useState(""),
    [preview, setPreview] = useState(false);
  const load = async (preferredSlug = "") => {
    setLoading(true);
    try {
      const { data } = await getAdminCmsPages();
      const items = data?.data || [];
      setPages(items);
      const preferred =
        preferredSlug && items.find((item) => item.slug === preferredSlug);
      if (preferred) setForm(normalizePage(preferred));
    } catch (error) {
      setMessage(error.response?.data?.message || "Pages could not be loaded.");
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    load(initialSlug);
  }, [initialSlug]);
  const selectPage = (page) => {
    setForm(normalizePage(page));
    setLanguage("en");
    setMessage("");
  };
  const current = form.translations[language];
  const englishSettings = form.translations.en?.settings || {};
  const settingValue = (key) =>
    current.settings?.[key] ??
    (language === "en" ? "" : (englishSettings[key] ?? ""));
  const updateTranslation = (field, value) =>
    setForm((old) => ({
      ...old,
      translations: {
        ...old.translations,
        [language]: { ...old.translations[language], [field]: value },
      },
    }));
  const updateSetting = (key, value) =>
    setForm((old) => ({
      ...old,
      translations: {
        ...old.translations,
        [language]: {
          ...old.translations[language],
          settings: {
            ...(old.translations[language].settings || {}),
            [key]: value,
          },
        },
      },
    }));
  const uploadImage = async (key, file) => {
    if (!file) return;
    setUploadingImage(key);
    setMessage("");
    setActiveEditor("");
    try {
      const body = new FormData();
      body.append("image", file);
      const { data } = await uploadCmsPageImage(body);
      updateSetting(key, data?.data?.url || "");
      setMessage("Image uploaded successfully. Save the page to publish it.");
    } catch (error) {
      setMessage(error.response?.data?.message || "Image upload failed.");
    } finally {
      setUploadingImage("");
    }
  };
  const uploadCoverImage = async (file) => {
    if (!file) return;
    setUploadingImage("ogImage");
    setMessage("");
    try {
      const body = new FormData();
      body.append("image", file);
      const { data } = await uploadCmsPageImage(body);
      setForm((old) => ({ ...old, ogImage: data?.data?.url || "" }));
      setMessage("Image uploaded successfully. Save the page to publish it.");
    } catch (error) {
      setMessage(error.response?.data?.message || "Image upload failed.");
    } finally {
      setUploadingImage("");
    }
  };
  const pageSchema = getSitePageSchema(form.slug || initialSlug);
  const previewPath = useMemo(
    () => (form.slug ? (form.slug === "home" ? "/" : `/${form.slug}`) : ""),
    [form.slug],
  );
  const filteredPages = useMemo(
    () =>
      pages.filter((page) =>
        page.slug.toLowerCase().includes(search.trim().toLowerCase()),
      ),
    [pages, search],
  );
  const submit = async (event) => {
    event.preventDefault();
    setSaving(true);
    setMessage("");
    try {
      const payload = {
        ...form,
        slug: form.slug.trim().replace(/^\/+|\/+$/g, "") || "home",
        translations: Object.fromEntries(
          languages.map(({ key }) => [
            key,
            {
              ...form.translations[key],
              keywords: Array.isArray(form.translations[key].keywords)
                ? form.translations[key].keywords
                : String(form.translations[key].keywords)
                    .split(",")
                    .map((item) => item.trim())
                    .filter(Boolean),
            },
          ]),
        ),
      };
      const { data } = await saveCmsPage(payload.slug, payload);
      selectPage(data?.data || payload);
      await load();
      setMessage("Page saved successfully.");
    } catch (error) {
      setMessage(
        error.response?.data?.message || error.message || "Save failed.",
      );
    } finally {
      setSaving(false);
    }
  };
  const removePage = async () => {
    if (
      !form.slug ||
      !window.confirm(`Delete /${form.slug}? This action cannot be undone.`)
    )
      return;
    setSaving(true);
    setMessage("");
    try {
      await deleteCmsPage(form.slug);
      router.push("/admin/custom-pages");
      router.refresh();
    } catch (error) {
      setMessage(error.response?.data?.message || "Page could not be deleted.");
      setSaving(false);
    }
  };

  return (
    <div className="mx-auto max-w-7xl space-y-4">
      <header>
        <div>
          {focused && (
            <Link
              href="/admin/public-pages"
              className="mb-2 inline-block text-sm font-bold text-blue-700"
            >
              ← All public pages
            </Link>
          )}
          <h1 className="text-2xl font-black text-slate-900">
            {focused ? `Edit /${initialSlug}` : "Public Pages CMS"}
          </h1>
          <p className="mt-1 text-sm text-slate-500">
            {focused
              ? "Edit each language, preview, then publish."
              : "Choose a page to open its dedicated editor."}
          </p>
        </div>
      </header>
      <div className="grid grid-cols-1 gap-4">
        {!focused && (
          <aside className="rounded-2xl bg-white p-4 shadow-sm">
            <label className="mb-4 flex items-center gap-2 rounded-xl border px-3">
              <FaSearch className="text-slate-400" />
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search pages…"
                className="w-full py-2.5 text-sm outline-none"
              />
            </label>
            <div className="grid gap-2 sm:grid-cols-2 xl:grid-cols-3">
              {loading ? (
                <p className="p-3 text-sm">Loading…</p>
              ) : (
                filteredPages.map((page) => (
                  <Link
                    key={page._id}
                    href={`/admin/public-pages/${encodeURIComponent(page.slug)}`}
                    className="flex min-h-16 items-center justify-between rounded-xl border border-slate-200 px-4 py-3 hover:border-blue-200 hover:bg-blue-50 hover:text-[#123f88]"
                  >
                    <span className="truncate text-sm font-bold">
                      /{page.slug === "home" ? "" : page.slug}
                    </span>
                    <span
                      className={`ml-2 rounded-full px-2 py-0.5 text-[9px] font-black uppercase ${page.status === "published" ? "bg-green-100 text-green-700" : "bg-amber-100 text-amber-700"}`}
                    >
                      {page.status}
                    </span>
                  </Link>
                ))
              )}
            </div>
          </aside>
        )}
        {focused && (
          <form
            onSubmit={submit}
            className="overflow-hidden rounded-2xl bg-white shadow-sm"
          >
            <div className="grid gap-4 border-b p-4 md:grid-cols-[1fr_180px] sm:p-5">
              <label className="text-sm font-bold">
                Page URL / slug
                <input
                  required
                  disabled={custom && Boolean(initialSlug)}
                  value={form.slug}
                  onChange={(e) => setForm({ ...form, slug: e.target.value })}
                  placeholder="pricing"
                  className={`${inputClass} disabled:cursor-not-allowed disabled:bg-slate-100 disabled:text-slate-500`}
                />
                <span className="mt-1 block text-[11px] font-normal text-slate-400">
                  {custom && initialSlug
                    ? "Slug is locked after creation to prevent duplicate pages."
                    : "No language or leading slash."}
                </span>
              </label>
              <label className="text-sm font-bold">
                Status
                <select
                  value={form.status}
                  onChange={(e) => setForm({ ...form, status: e.target.value })}
                  className={inputClass}
                >
                  <option value="draft">Draft</option>
                  <option value="published">Published</option>
                </select>
              </label>
            </div>
            {custom && (
              <div className="grid gap-4 border-b bg-blue-50/50 p-4 sm:grid-cols-3 sm:p-5">
                <label className="flex items-center gap-3 text-sm font-bold">
                  <input
                    type="checkbox"
                    checked={form.showInFooter}
                    onChange={(event) =>
                      setForm({ ...form, showInFooter: event.target.checked })
                    }
                    className="h-4 w-4"
                  />
                  <span>
                    Show this page in footer
                    <span
                      className={`mt-1 block text-xs font-medium ${form.showInFooter ? "text-green-700" : "text-amber-700"}`}
                    >
                      {form.showInFooter
                        ? "Will appear after this page is published and saved."
                        : "Currently hidden from the footer."}
                    </span>
                  </span>
                </label>
                <label className="text-sm font-bold">
                  Footer section
                  <select
                    value={form.footerSection}
                    onChange={(event) =>
                      setForm({ ...form, footerSection: event.target.value })
                    }
                    disabled={!form.showInFooter}
                    className={inputClass}
                  >
                    <option value="about">About</option>
                    <option value="partnership">Partnership Requests</option>
                    <option value="services">Our Service</option>
                    <option value="support">Bottom legal/support links</option>
                  </select>
                </label>
                <label className="text-sm font-bold">
                  Display order
                  <input
                    type="number"
                    min="0"
                    value={form.footerOrder}
                    onChange={(event) =>
                      setForm({
                        ...form,
                        footerOrder: Number(event.target.value),
                      })
                    }
                    disabled={!form.showInFooter}
                    className={inputClass}
                  />
                </label>
              </div>
            )}
            {custom && (
              <div className="border-b p-4 sm:p-5">
                <h2 className="font-black text-slate-900">Page appearance</h2>
                <p className="mt-1 text-xs text-slate-500">
                  Choose how this custom page will look without changing code.
                </p>
                <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                  <label className="text-sm font-bold">
                    Layout template
                    <select
                      value={form.pageTemplate}
                      onChange={(event) =>
                        setForm({ ...form, pageTemplate: event.target.value })
                      }
                      className={inputClass}
                    >
                      <option value="modern">Modern hero</option>
                      <option value="classic">Classic page</option>
                      <option value="minimal">Minimal</option>
                    </select>
                  </label>
                  <label className="text-sm font-bold">
                    Accent color
                    <div className="mt-1.5 flex gap-2">
                      <input
                        type="color"
                        value={form.accentColor}
                        onChange={(event) =>
                          setForm({ ...form, accentColor: event.target.value })
                        }
                        className="h-11 w-14 rounded-lg border p-1"
                      />
                      <input
                        value={form.accentColor}
                        onChange={(event) =>
                          setForm({ ...form, accentColor: event.target.value })
                        }
                        className="w-full rounded-xl border px-3 text-sm"
                      />
                    </div>
                  </label>
                  <label className="text-sm font-bold">
                    Text alignment
                    <select
                      value={form.contentAlignment}
                      onChange={(event) =>
                        setForm({
                          ...form,
                          contentAlignment: event.target.value,
                        })
                      }
                      className={inputClass}
                    >
                      <option value="left">Left aligned</option>
                      <option value="center">Centered</option>
                    </select>
                  </label>
                  <label className="text-sm font-bold">
                    CTA link
                    <input
                      value={form.ctaUrl}
                      onChange={(event) =>
                        setForm({ ...form, ctaUrl: event.target.value })
                      }
                      placeholder="/contact-us or https://…"
                      className={inputClass}
                    />
                  </label>
                </div>
              </div>
            )}
            <div className="border-b bg-slate-50 px-4 pt-4 sm:px-5">
              <p className="mb-2 text-xs font-bold uppercase tracking-wide text-slate-400">
                Language to edit
              </p>
              <div className="flex gap-2">
                {languages.map(({ key, label }) => (
                  <button
                    key={key}
                    type="button"
                    onClick={() => {
                      setActiveEditor("");
                      setLanguage(key);
                    }}
                    className={`rounded-t-xl border-x border-t px-4 py-3 text-sm font-bold ${language === key ? "border-slate-200 bg-white text-[#123f88]" : "border-transparent text-slate-500"}`}
                  >
                    {label}
                    {isComplete(form.translations[key]) && (
                      <FaCheckCircle className="ml-2 inline text-green-500" />
                    )}
                  </button>
                ))}
              </div>
            </div>
            <div className="space-y-5 p-4 sm:p-5">
              <section className="space-y-4">
                <div>
                  <h2 className="font-black">
                    {designed ? pageSchema.label : "Page content"} —{" "}
                    {languages.find((item) => item.key === language)?.label}
                  </h2>
                  <p className="text-xs text-slate-400">
                    {designed
                      ? language === "en"
                        ? "Empty fields keep the original designed-page value."
                        : "Fields not translated yet show the English value. Type here to override it for this language."
                      : "Visible to visitors."}
                  </p>
                </div>
                {designed ? (
                  <div className="grid gap-4">
                    {pageSchema.fields.map((item) =>
                      item.type === "button" ? (
                        <fieldset
                          key={item.key}
                          className="rounded-2xl border border-slate-200 bg-slate-50 p-4"
                        >
                          <legend className="px-2 text-sm font-black text-slate-800">
                            {item.label}
                          </legend>
                          <div className="grid gap-4 md:grid-cols-2">
                            <label className="block text-sm font-bold md:col-span-2">
                              Button text
                              <input
                                value={settingValue(item.key)}
                                onChange={(event) =>
                                  updateSetting(item.key, event.target.value)
                                }
                                placeholder="Leave empty to keep the original label"
                                className={inputClass}
                              />
                            </label>
                            <label className="block text-sm font-bold md:col-span-2">
                              Link URL
                              <input
                                value={settingValue(`${item.key}Url`)}
                                onChange={(event) =>
                                  updateSetting(`${item.key}Url`, event.target.value)
                                }
                                placeholder="/contact-us, #section or https://example.com"
                                className={inputClass}
                              />
                            </label>
                            {[['Color', 'Background color', '#e2233d'], ['TextColor', 'Text color', '#ffffff']].map(([suffix, label, fallback]) => {
                              const colorKey = `${item.key}${suffix}`;
                              const colorValue = settingValue(colorKey) || fallback;
                              return (
                                <label key={colorKey} className="block text-sm font-bold">
                                  {label}
                                  <div className="mt-1.5 flex gap-2">
                                    <input
                                      type="color"
                                      value={/^#[0-9a-f]{6}$/i.test(colorValue) ? colorValue : fallback}
                                      onChange={(event) => updateSetting(colorKey, event.target.value)}
                                      className="h-11 w-14 rounded-lg border p-1"
                                    />
                                    <input
                                      value={settingValue(colorKey)}
                                      onChange={(event) => updateSetting(colorKey, event.target.value)}
                                      placeholder={fallback}
                                      className="w-full rounded-xl border px-3 text-sm"
                                    />
                                  </div>
                                </label>
                              );
                            })}
                          </div>
                        </fieldset>
                      ) : item.type === "image" ? (
                        <fieldset key={item.key} className="rounded-2xl border border-slate-200 p-4">
                          <legend className="px-2 text-sm font-black">{item.label}</legend>
                          {settingValue(item.key) && (
                            <img src={settingValue(item.key)} alt="" className="mb-3 h-36 w-full rounded-xl object-cover" />
                          )}
                          <input
                            type="file"
                            accept="image/jpeg,image/png,image/webp"
                            disabled={uploadingImage === item.key}
                            onChange={(event) => uploadImage(item.key, event.target.files?.[0])}
                            className="block w-full text-sm"
                          />
                          <p className="mt-2 text-xs font-normal text-slate-500">
                            {uploadingImage === item.key ? "Uploading to Cloudinary…" : "JPG, PNG or WebP, maximum 5 MB."}
                          </p>
                        </fieldset>
                      ) : item.type === "color" ? (
                        <label key={item.key} className="block text-sm font-bold">
                          {item.label}
                          <div className="mt-1.5 flex gap-2">
                            <input
                              type="color"
                              value={/^#[0-9a-f]{6}$/i.test(settingValue(item.key)) ? settingValue(item.key) : "#ffffff"}
                              onChange={(event) => updateSetting(item.key, event.target.value)}
                              className="h-11 w-14 rounded-lg border p-1"
                            />
                            <input value={settingValue(item.key)} onChange={(event) => updateSetting(item.key, event.target.value)} placeholder="#ffffff" className="w-full rounded-xl border px-3 text-sm" />
                          </div>
                        </label>
                      ) : (
                        item.type === "textarea" || item.type === "longtext" ? (
                          <RichEditorField
                            key={item.key}
                            id={item.key}
                            label={item.label}
                            value={settingValue(item.key)}
                            active={activeEditor === item.key}
                            onActivate={setActiveEditor}
                            onChange={(value) => updateSetting(item.key, value)}
                            editorKey={`${form._id || initialSlug || "new"}-${language}-${item.key}`}
                          />
                        ) : (
                          <label key={item.key} className="block text-sm font-bold">
                            {item.label}
                            <input
                              value={settingValue(item.key)}
                              onChange={(event) => updateSetting(item.key, event.target.value)}
                              placeholder="Leave empty to keep the original content"
                              className={inputClass}
                            />
                          </label>
                        )
                      ),
                    )}
                  </div>
                ) : (
                  <>
                    <label className="block text-sm font-bold">
                      Page title
                      <input
                        required={language === "en"}
                        value={current.title}
                        onChange={(e) =>
                          updateTranslation("title", e.target.value)
                        }
                        className={inputClass}
                      />
                    </label>
                    {custom && (
                      <div className="grid gap-4 sm:grid-cols-2">
                        <label className="block text-sm font-bold">
                          Small badge / eyebrow
                          <input
                            value={current.settings?.badge || ""}
                            onChange={(e) =>
                              updateSetting("badge", e.target.value)
                            }
                            placeholder="Optional label above the title"
                            className={inputClass}
                          />
                        </label>
                        <label className="block text-sm font-bold">
                          CTA button text
                          <input
                            value={current.settings?.ctaLabel || ""}
                            onChange={(e) =>
                              updateSetting("ctaLabel", e.target.value)
                            }
                            placeholder="Example: Contact us"
                            className={inputClass}
                          />
                        </label>
                      </div>
                    )}
                    <RichEditorField id="excerpt" label="Short introduction" value={current.excerpt} active={activeEditor === "excerpt"} onActivate={setActiveEditor} onChange={(value) => updateTranslation("excerpt", value)} editorKey={`${form._id || initialSlug || "new"}-${language}-excerpt`} />
                    <RichEditorField id="content" label="Main content" value={current.content} active={activeEditor === "content"} onActivate={setActiveEditor} onChange={(value) => updateTranslation("content", value)} editorKey={`${form._id || initialSlug || "new"}-${language}-content`} />
                  </>
                )}
                <fieldset className="rounded-2xl border border-slate-200 p-4">
                  <legend className="px-2 text-sm font-black">Cover / social image</legend>
                  {form.ogImage && <img src={form.ogImage} alt="" className="mb-3 h-44 w-full rounded-xl object-cover" />}
                  <input type="file" accept="image/jpeg,image/png,image/webp" disabled={uploadingImage === "ogImage"} onChange={(event) => uploadCoverImage(event.target.files?.[0])} className="block w-full text-sm" />
                  <p className="mt-2 text-xs font-normal text-slate-500">
                    {uploadingImage === "ogImage" ? "Uploading to Cloudinary…" : "Uploaded to Cloudinary. JPG, PNG or WebP, maximum 5 MB."}
                  </p>
                </fieldset>
              </section>
              <details className="group rounded-2xl border bg-slate-50">
                <summary className="cursor-pointer list-none px-4 py-3 font-bold">
                  SEO settings{" "}
                  <span className="float-right text-xs font-normal text-slate-400 group-open:hidden">
                    Click to edit
                  </span>
                </summary>
                <div className="grid gap-4 border-t p-4">
                  <label className="text-sm font-bold">
                    SEO title{" "}
                    <span className="float-right text-xs font-normal text-slate-400">
                      {String(current.seoTitle || "").length}/70
                    </span>
                    <input
                      maxLength={70}
                      value={current.seoTitle}
                      onChange={(e) =>
                        updateTranslation("seoTitle", e.target.value)
                      }
                      placeholder={current.title}
                      className={inputClass}
                    />
                  </label>
                  <label className="text-sm font-bold">
                    SEO description{" "}
                    <span className="float-right text-xs font-normal text-slate-400">
                      {String(current.seoDescription || "").length}/180
                    </span>
                    <textarea
                      maxLength={180}
                      rows={3}
                      value={current.seoDescription}
                      onChange={(e) =>
                        updateTranslation("seoDescription", e.target.value)
                      }
                      placeholder={current.excerpt}
                      className={inputClass}
                    />
                  </label>
                  <div className="grid gap-4 md:grid-cols-2">
                    <label className="text-sm font-bold">
                      Keywords
                      <input
                        value={
                          Array.isArray(current.keywords)
                            ? current.keywords.join(", ")
                            : current.keywords
                        }
                        onChange={(e) =>
                          updateTranslation("keywords", e.target.value)
                        }
                        className={inputClass}
                      />
                    </label>
                    <label className="text-sm font-bold">
                      Image alt text
                      <input
                        value={current.imageAlt}
                        onChange={(e) =>
                          updateTranslation("imageAlt", e.target.value)
                        }
                        className={inputClass}
                      />
                    </label>
                  </div>
                  <label className="flex items-center gap-2 text-sm">
                    <input
                      type="checkbox"
                      checked={form.noIndex}
                      onChange={(e) =>
                        setForm({ ...form, noIndex: e.target.checked })
                      }
                    />{" "}
                    Hide from search engines
                  </label>
                </div>
              </details>
            </div>
            <div className="sticky bottom-0 flex flex-wrap items-center gap-3 border-t bg-white/95 px-4 py-3 backdrop-blur sm:px-5">
              <button
                disabled={saving}
                className="inline-flex items-center gap-2 rounded-xl bg-[#e2233d] px-5 py-2.5 text-sm font-bold text-white disabled:opacity-50"
              >
                <FaSave />{" "}
                {saving
                  ? "Saving…"
                  : form.status === "published"
                    ? "Save & publish"
                    : "Save draft"}
              </button>
              {previewPath && form.status === "published" && (
                <a
                  href={previewPath}
                  target="_blank"
                  rel="noreferrer"
                  className="text-sm font-bold text-blue-700"
                >
                  Open live page ↗
                </a>
              )}
              {custom && initialSlug && (
                <button
                  type="button"
                  onClick={removePage}
                  disabled={saving}
                  className="ml-auto inline-flex items-center gap-2 rounded-xl border border-red-200 px-4 py-2.5 text-sm font-bold text-red-600 transition hover:bg-red-50 disabled:opacity-50"
                >
                  <FaTrash /> Delete page
                </button>
              )}
            </div>
            {message && (
              <p
                className={`m-4 rounded-xl p-3 text-sm font-bold ${message.includes("successfully") ? "bg-green-50 text-green-700" : "bg-red-50 text-red-700"}`}
              >
                {message}
              </p>
            )}
          </form>
        )}
      </div>
      {preview && (
        <PreviewModal
          form={form}
          language={language}
          onLanguage={setLanguage}
          onClose={() => setPreview(false)}
        />
      )}
    </div>
  );
}

export default function PublicPagesCms() {
  return <PublicPagesCmsEditor />;
}
