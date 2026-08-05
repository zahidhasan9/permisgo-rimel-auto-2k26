"use client";

import { useEffect, useState } from "react";
import { FaCarSide, FaCheckCircle, FaExclamationTriangle, FaSave, FaSpinner } from "react-icons/fa";
import { getAdminDrivingSettings, updateAdminDrivingSettings } from "@/features/API";

const errorMessage = (error) =>
  error?.response?.data?.message || error?.message || "Something went wrong.";

export default function AdminSettingsPage() {
  const [requiredHours, setRequiredHours] = useState("20");
  const [savedHours, setSavedHours] = useState(20);
  const [requiredSkillsPercentage, setRequiredSkillsPercentage] = useState("60");
  const [savedSkillsPercentage, setSavedSkillsPercentage] = useState(60);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    getAdminDrivingSettings()
      .then((response) => {
        const value = Number(response?.data?.data?.requiredHours || 20);
        setRequiredHours(String(value));
        setSavedHours(value);
        const skillsValue = Number(response?.data?.data?.requiredSkillsPercentage || 60);
        setRequiredSkillsPercentage(String(skillsValue));
        setSavedSkillsPercentage(skillsValue);
      })
      .catch((requestError) => setError(errorMessage(requestError)))
      .finally(() => setLoading(false));
  }, []);

  const handleSave = async () => {
    const value = Number(requiredHours);
    if (!Number.isFinite(value) || value < 1 || value > 200) {
      setError("Required driving hours must be between 1 and 200.");
      return;
    }
    const skillsValue = Number(requiredSkillsPercentage);
    if (!Number.isFinite(skillsValue) || skillsValue < 1 || skillsValue > 100) {
      setError("Required skills percentage must be between 1 and 100.");
      return;
    }

    try {
      setSaving(true);
      setError("");
      setSuccess("");
      const response = await updateAdminDrivingSettings(value, skillsValue);
      const updated = Number(response?.data?.data?.requiredHours || value);
      const updatedSkills = Number(response?.data?.data?.requiredSkillsPercentage || skillsValue);
      setRequiredHours(String(updated));
      setSavedHours(updated);
      setRequiredSkillsPercentage(String(updatedSkills));
      setSavedSkillsPercentage(updatedSkills);
      setSuccess("Global driving requirements updated for all students.");
    } catch (requestError) {
      setError(errorMessage(requestError));
    } finally {
      setSaving(false);
    }
  };

  return (
    <main className="min-h-screen bg-slate-50 px-4 py-6 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-4xl">
        <header>
          <h1 className="text-2xl font-bold text-slate-900">Settings</h1>
          <p className="mt-2 text-sm text-slate-500">Manage platform-wide training requirements.</p>
        </header>

        {error && (
          <div className="mt-5 flex items-center gap-3 rounded-xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm font-semibold text-rose-700">
            <FaExclamationTriangle /> {error}
          </div>
        )}
        {success && (
          <div className="mt-5 flex items-center gap-3 rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm font-semibold text-emerald-700">
            <FaCheckCircle /> {success}
          </div>
        )}

        <section className="mt-6 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
          <div className="flex items-center gap-4 border-b border-slate-100 px-5 py-5 sm:px-6">
            <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50 text-xl text-[#174A9B]">
              <FaCarSide />
            </span>
            <div>
              <h2 className="font-bold text-slate-900">Driving lesson requirement</h2>
              <p className="mt-1 text-sm text-slate-500">This single target applies to every student.</p>
            </div>
          </div>

          <div className="p-5 sm:p-6">
            <div className="rounded-xl border border-blue-100 bg-blue-50/60 p-4 text-sm leading-6 text-slate-600">
              Current global targets: <strong className="text-[#174A9B]">{savedHours} hours</strong> and <strong className="text-[#174A9B]">{savedSkillsPercentage}% skills acquired</strong>. Student license journeys automatically use these values.
            </div>

            <div className="mt-6 grid max-w-3xl gap-5 sm:grid-cols-2">
              <div>
              <label htmlFor="required-hours" className="block text-sm font-bold text-slate-800">
                Required driving hours for all students
              </label>
              <p className="mt-1 text-xs text-slate-500">Enter a value between 1 and 200 hours.</p>
              <div className="mt-3">
                <div className="relative min-w-0 flex-1">
                  <input
                    id="required-hours"
                    type="number"
                    min="1"
                    max="200"
                    step="0.5"
                    value={requiredHours}
                    disabled={loading || saving}
                    onChange={(event) => setRequiredHours(event.target.value)}
                    className="h-12 w-full rounded-xl border border-slate-200 bg-white px-4 pr-16 text-base font-bold text-slate-800 outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100 disabled:opacity-60"
                  />
                  <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-sm font-semibold text-slate-400">hours</span>
                </div>
              </div>
              </div>

              <div>
                <label htmlFor="required-skills" className="block text-sm font-bold text-slate-800">Required skills percentage</label>
                <p className="mt-1 text-xs text-slate-500">Enter a value between 1 and 100 percent.</p>
                <div className="relative mt-3">
                  <input id="required-skills" type="number" min="1" max="100" step="1" value={requiredSkillsPercentage} disabled={loading || saving} onChange={(event) => setRequiredSkillsPercentage(event.target.value)} className="h-12 w-full rounded-xl border border-slate-200 bg-white px-4 pr-12 text-base font-bold text-slate-800 outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100 disabled:opacity-60" />
                  <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-sm font-semibold text-slate-400">%</span>
                </div>
              </div>
            </div>

            <button type="button" onClick={handleSave} disabled={loading || saving || (Number(requiredHours) === savedHours && Number(requiredSkillsPercentage) === savedSkillsPercentage)} className="mt-5 inline-flex h-12 items-center justify-center gap-2 rounded-xl bg-[#174A9B] px-5 text-sm font-bold text-white transition hover:bg-[#123d82] disabled:cursor-not-allowed disabled:opacity-50">
              {loading || saving ? <FaSpinner className="animate-spin" /> : <FaSave />} Save settings
            </button>
          </div>
        </section>
      </div>
    </main>
  );
}
