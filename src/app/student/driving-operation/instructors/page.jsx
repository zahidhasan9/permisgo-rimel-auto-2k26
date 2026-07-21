"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { FaCalendar, FaCar, FaClock, FaSearch, FaStar } from "react-icons/fa";

import Pagination from "@/components/Pagination";
import { getPublicTeachers } from "@/features/API";
import { getErrorMessage, unwrap } from "@/features/lessonHelpers";
import { mediaUrl } from "@/utils/mediaUrl";

const INITIAL_LIMIT = 10;
const today = new Date(Date.now() - new Date().getTimezoneOffset() * 60000).toISOString().slice(0, 10);
const addMinutes = (time, duration) => {
  const [hour, minute] = time.split(":").map(Number);
  const total = hour * 60 + minute + Number(duration);
  return `${String(Math.floor(total / 60)).padStart(2, "0")}:${String(total % 60).padStart(2, "0")}`;
};

export default function InstructorsPage() {
  const [teachers, setTeachers] = useState([]);
  const [search, setSearch] = useState("");
  const [vehicleType, setVehicleType] = useState("");
  const [date, setDate] = useState(today);
  const [startTime, setStartTime] = useState("09:00");
  const [duration, setDuration] = useState(60);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(INITIAL_LIMIT);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let active = true;
    const loadTeachers = async () => {
      try {
        const response = await getPublicTeachers({
          vehicleType: vehicleType || undefined,
          date,
          startTime,
          endTime: addMinutes(startTime, duration),
        });
        const data = unwrap(response, []);
        if (active) setTeachers(Array.isArray(data) ? data : []);
      } catch (requestError) {
        if (active) setError(getErrorMessage(requestError, "Instructors could not be loaded."));
      } finally {
        if (active) setLoading(false);
      }
    };
    loadTeachers();
    return () => { active = false; };
  }, [date, duration, startTime, vehicleType]);

  const filteredTeachers = useMemo(() => {
    const term = search.trim().toLowerCase();
    return teachers.filter((teacher) => {
      const locations = teacher.locations || [];
      const vehicles = teacher.vehicles || [];
      const searchable = [
        teacher.user?.name,
        teacher.user?.city,
        ...locations.flatMap((location) => [location.title, location.address, location.city, location.postalCode]),
      ].filter(Boolean).join(" ").toLowerCase();
      const matchesSearch = !term || searchable.includes(term);
      const matchesVehicle = !vehicleType || vehicles.some((vehicle) => vehicle.vehicleType === vehicleType);
      return matchesSearch && matchesVehicle;
    });
  }, [search, teachers, vehicleType]);

  const totalPages = Math.max(1, Math.ceil(filteredTeachers.length / limit));
  const visibleTeachers = filteredTeachers.slice((page - 1) * limit, page * limit);

  useEffect(() => { setPage(1); }, [search, vehicleType]);
  useEffect(() => { if (page > totalPages) setPage(totalPages); }, [page, totalPages]);

  return (
    <main className="min-h-screen bg-gray-100 p-2 text-xs">
      <div className="mb-3 flex items-center justify-between gap-3">
        <div>
          <h1 className="text-base font-semibold text-blue-900">Instructors</h1>
          <p className="mt-0.5 text-[10px] text-gray-500">Verified instructors currently accepting bookings</p>
        </div>
        <span className="rounded-full bg-blue-50 px-2.5 py-1 font-semibold text-blue-900">{filteredTeachers.length} found</span>
      </div>

      <section className="mb-3 rounded-lg bg-gray-200 p-3">
        <h2 className="mb-2 font-semibold">Find an Instructor</h2>
        <div className="grid gap-2 sm:grid-cols-2 xl:grid-cols-[1fr_180px_150px_130px_120px_auto]">
          <label className="flex items-center gap-2 rounded-md bg-white p-2">
            <FaSearch className="text-gray-400" />
            <input value={search} onChange={(event) => setSearch(event.target.value)} className="w-full outline-none" placeholder="Name, city, address or postcode" />
          </label>
          <label className="flex items-center gap-2 rounded-md bg-white p-2">
            <FaCar className="text-gray-400" />
            <select value={vehicleType} onChange={(event) => setVehicleType(event.target.value)} className="w-full bg-white outline-none">
              <option value="">All vehicles</option>
              <option value="manual">Manual</option>
              <option value="automatic">Automatic</option>
              <option value="electric">Electric</option>
            </select>
          </label>
          <label className="flex items-center gap-2 rounded-md bg-white p-2">
            <FaCalendar className="text-gray-400" />
            <input type="date" min={today} value={date} onChange={(event) => setDate(event.target.value)} className="w-full outline-none" />
          </label>
          <label className="flex items-center gap-2 rounded-md bg-white p-2">
            <FaClock className="text-gray-400" />
            <input type="time" value={startTime} onChange={(event) => setStartTime(event.target.value)} className="w-full outline-none" />
          </label>
          <select value={duration} onChange={(event) => setDuration(Number(event.target.value))} className="rounded-md bg-white p-2 outline-none">
            {[30, 60, 90, 120].map((value) => <option key={value} value={value}>{value} min</option>)}
          </select>
          <button type="button" onClick={() => { setSearch(""); setVehicleType(""); setDate(today); setStartTime("09:00"); setDuration(60); }} className="rounded-md bg-red-600 px-4 py-2 font-semibold text-white hover:bg-red-700">Reset</button>
        </div>
      </section>

      {error && <div className="mb-3 rounded-lg border border-red-200 bg-red-50 p-3 text-red-700">{error}</div>}

      <section className="overflow-hidden rounded-lg bg-white shadow-sm">
        <div className="overflow-x-auto">
          <div className="min-w-[820px]">
            <div className="grid grid-cols-[1.3fr_1.3fr_.8fr_.8fr_.8fr] bg-blue-900 p-2 text-[10px] font-semibold text-white">
              <div>Name</div><div>Location</div><div>Experience</div><div>Vehicle</div><div className="text-right">Action</div>
            </div>

            {loading ? (
              <div className="p-10 text-center text-gray-500">Loading verified instructors...</div>
            ) : visibleTeachers.length ? visibleTeachers.map((teacher) => {
              const user = teacher.user || {};
              const location = teacher.locations?.[0];
              const vehicle = teacher.vehicles?.find((item) => item.isDefault) || teacher.vehicles?.[0];
              return (
                <div key={teacher._id} className="grid grid-cols-[1.3fr_1.3fr_.8fr_.8fr_.8fr] items-center border-b p-2 text-[10px] hover:bg-gray-50">
                  <div className="flex min-w-0 items-center gap-2 font-medium">
                    {user.avatar ? <img src={mediaUrl(user.avatar)} alt="" className="h-7 w-7 shrink-0 rounded-full object-cover" /> : <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-blue-900 font-bold text-white">{(user.name || "I")[0]}</span>}
                    <div className="min-w-0"><p className="truncate text-gray-900">{user.name || "Instructor"}</p><p className="flex items-center gap-1 text-[9px] text-amber-600"><FaStar /> {Number(teacher.rating?.average || 0).toFixed(1)} ({teacher.rating?.totalReviews || 0})</p></div>
                  </div>
                  <div className="truncate pr-3 text-gray-600" title={location?.address}>{[location?.city, location?.postalCode].filter(Boolean).join(", ") || user.city || "Location not set"}</div>
                  <div className="text-gray-600">{teacher.experienceYears || 0} years</div>
                  <div className="capitalize text-gray-600">{vehicle?.vehicleType || teacher.lessonTypes?.[0] || "Not set"}</div>
                  <div className="text-right"><Link href={{ pathname: "/student/book-driving", query: { teacher: user._id, lat: location?.coordinates?.lat, lng: location?.coordinates?.lng, address: location?.address, date, startTime, duration, vehicleType: vehicle?.vehicleType || vehicleType || "manual" } }} className="inline-flex rounded-md bg-red-600 px-3 py-1.5 font-semibold text-white hover:bg-red-700">View & book</Link></div>
                </div>
              );
            }) : (
              <div className="p-10 text-center"><p className="font-semibold text-gray-800">No instructors found</p><p className="mt-1 text-gray-500">Try another location or vehicle type.</p></div>
            )}
          </div>
        </div>
        <Pagination page={page} limit={limit} total={filteredTeachers.length} totalPages={totalPages} loading={loading} onPageChange={setPage} onLimitChange={(value) => { setLimit(value); setPage(1); }} />
      </section>
    </main>
  );
}
