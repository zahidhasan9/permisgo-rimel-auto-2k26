"use client";

import { useEffect, useMemo, useRef, useState } from "react";

import { getAdminUsers } from "@/features/API";
import { getErrorMessage, unwrap } from "@/features/lessonHelpers";
import useDebouncedValue from "@/hooks/useDebouncedValue";

const getUserLabel = (user) =>
  [user?.name, user?.email, user?.phone].filter(Boolean).join(" · ");

export default function AsyncUserSelect({
  role,
  label,
  value,
  selectedUser = null,
  disabled = false,
  required = false,
  onChange,
}) {
  const containerRef = useRef(null);
  const [query, setQuery] = useState("");
  const [options, setOptions] = useState([]);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const debouncedQuery = useDebouncedValue(query, 400);

  const currentLabel = useMemo(() => {
    if (!value) return "";
    const selected = options.find((user) => user._id === value) || selectedUser;
    return selected ? getUserLabel(selected) : value;
  }, [options, selectedUser, value]);

  useEffect(() => {
    const closeDropdown = (event) => {
      if (!containerRef.current?.contains(event.target)) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", closeDropdown);
    return () => document.removeEventListener("mousedown", closeDropdown);
  }, []);

  useEffect(() => {
    if (!open) return undefined;

    let cancelled = false;

    const loadUsers = async () => {
      setLoading(true);
      setError("");

      try {
        const response = await getAdminUsers({
          role,
          status: "active",
          search: debouncedQuery,
          page: 1,
          limit: 20,
        });

        const users = unwrap(response, []);

        if (!cancelled) {
          setOptions(Array.isArray(users) ? users : []);
        }
      } catch (requestError) {
        if (!cancelled) {
          setOptions([]);
          setError(getErrorMessage(requestError, "Users could not be loaded."));
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    };

    loadUsers();

    return () => {
      cancelled = true;
    };
  }, [debouncedQuery, open, role]);

  return (
    <div ref={containerRef} className="relative">
      <label className="block text-sm font-semibold text-slate-700">
        {label}
        <span className={required ? "text-rose-500" : "hidden"}> *</span>
      </label>

      <button
        type="button"
        disabled={disabled}
        onClick={() => setOpen((current) => !current)}
        className="mt-1 flex min-h-11 w-full items-center justify-between rounded-xl border border-slate-300 bg-white px-3 py-2 text-left text-sm disabled:cursor-not-allowed disabled:bg-slate-100"
      >
        <span className={currentLabel ? "text-slate-800" : "text-slate-400"}>
          {currentLabel || `Search ${role} by name, email or phone`}
        </span>
        <span className="text-slate-400">▾</span>
      </button>

      {required && (
        <input
          tabIndex={-1}
          className="pointer-events-none absolute bottom-0 left-2 h-0 w-0 opacity-0"
          required
          value={value || ""}
          onChange={() => {}}
        />
      )}

      {open && (
        <div className="absolute z-40 mt-2 w-full rounded-xl border border-slate-200 bg-white p-2 shadow-2xl">
          <input
            autoFocus
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder={`Type ${role} name, email or phone`}
            className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none focus:border-blue-500"
          />

          <div className="mt-2 max-h-64 overflow-y-auto">
            {loading ? (
              <p className="p-3 text-sm text-slate-500">Searching...</p>
            ) : error ? (
              <p className="p-3 text-sm text-rose-600">{error}</p>
            ) : options.length ? (
              options.map((user) => (
                <button
                  key={user._id}
                  type="button"
                  onClick={() => {
                    onChange(user);
                    setOpen(false);
                    setQuery("");
                  }}
                  className={`block w-full rounded-lg px-3 py-2 text-left text-sm hover:bg-blue-50 ${
                    value === user._id ? "bg-blue-50 text-blue-700" : ""
                  }`}
                >
                  <span className="block font-semibold">{user.name}</span>
                  <span className="mt-0.5 block text-xs text-slate-500">
                    {[user.email, user.phone].filter(Boolean).join(" · ")}
                  </span>
                </button>
              ))
            ) : (
              <p className="p-3 text-sm text-slate-500">No matching user.</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
