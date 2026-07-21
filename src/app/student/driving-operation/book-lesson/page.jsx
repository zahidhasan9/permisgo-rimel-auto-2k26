// "use client";

// import { useState } from "react";
// import { FaSearch, FaMapMarkerAlt } from "react-icons/fa";

// const places = ["Paris", "Jussieu", "Belleville", "Louvre", "Berlin"];

// const list = [
//   { name: "Jussieu Metro Station", km: "1.3 km", date: "Tue, April 14" },
//   { name: "Belleville", km: "2.5 km", date: "March 07 - 10" },
//   { name: "Louvre Station", km: "3.1 km", date: "March 09 - 12" },
//   { name: "Paris Central", km: "1.0 km", date: "March 11 - 15" },
// ];

// export default function Page() {
//   const [search, setSearch] = useState("");

//   const filtered = places.filter((p) =>
//     p.toLowerCase().includes(search.toLowerCase()),
//   );

//   return (
//     <div className="h-screen w-full bg-[#F3F6FB] flex flex-col p-2">
//       {/* HEADER (compact) */}
//       <div className="mb-2">
//         <h1 className="text-lg font-bold text-[#0F3D91]">Book Lesson</h1>
//       </div>

//       {/* MAIN WRAPPER */}
//       <div className="flex-1 bg-[#E6EBF5] rounded-xl p-3 flex gap-3 overflow-hidden">
//         {/* LEFT PANEL */}
//         <div className="w-[300px] flex flex-col gap-3">
//           {/* SEARCH */}
//           <div className="relative">
//             <FaSearch className="absolute left-3 top-3 text-gray-400 text-xs" />

//             <input
//               value={search}
//               onChange={(e) => setSearch(e.target.value)}
//               placeholder="Search location..."
//               className="w-full pl-9 pr-3 py-2 rounded-lg bg-white text-xs outline-none"
//             />

//             {search && (
//               <div className="absolute z-10 w-full bg-white mt-1 rounded-lg shadow border">
//                 {filtered.map((p, i) => (
//                   <div
//                     key={i}
//                     onClick={() => setSearch(p)}
//                     className="p-2 text-xs hover:bg-gray-100 cursor-pointer"
//                   >
//                     📍 {p}
//                   </div>
//                 ))}
//               </div>
//             )}
//           </div>

//           {/* BUTTONS */}
//           <button className="bg-[#0F3D91] text-white py-2 rounded-lg text-xs">
//             Manual
//           </button>

//           <button className="bg-white py-2 rounded-lg text-xs">
//             Automatic
//           </button>

//           {/* LIST */}
//           <div className="flex-1 overflow-auto space-y-2">
//             {list.map((item, i) => (
//               <div key={i} className="bg-white rounded-lg p-3 shadow-sm">
//                 <div className="flex gap-2">
//                   <FaMapMarkerAlt className="text-[#0F3D91] text-xs mt-1" />

//                   <div>
//                     <h3 className="text-xs font-semibold">{item.name}</h3>

//                     <p className="text-[10px] text-gray-500">{item.km}</p>

//                     <p className="text-[10px] text-[#0F3D91] mt-1">
//                       {item.date}
//                     </p>
//                   </div>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>

//         {/* RIGHT MAP */}
//         <div className="flex-1 rounded-xl overflow-hidden relative">
//           <iframe
//             src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2625.6313577021792!2d2.352085076463716!3d48.84616997133053!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47e671faaf02920b%3A0x53500e1db50cf704!2sJussieu!5e0!3m2!1sen!2sbd!4v1782977932097!5m2!1sen!2sbd"
//             className="w-full h-full border-0"
//             loading="lazy"
//           />

//           {/* FLOAT CARD (smaller) */}
//           <div className="absolute bottom-3 left-1/2 -translate-x-1/2 bg-white rounded-xl p-3 shadow-lg w-[240px]">
//             <div className="flex items-center gap-2">
//               <img
//                 src="https://i.pravatar.cc/80"
//                 className="w-8 h-8 rounded-full"
//                 alt=""
//               />

//               <div>
//                 <h3 className="text-xs font-semibold">Robert Fox</h3>

//                 <p className="text-[10px] text-gray-500">5+ Years</p>
//               </div>
//             </div>

//             <button className="mt-2 w-full bg-red-600 text-white py-1 rounded text-xs">
//               View Details
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

"use client";

import GooglePlaceAutocomplete from "@/components/maps/GooglePlaceAutocomplete";
import {
  CircleF,
  GoogleMap,
  MarkerF,
  useJsApiLoader,
} from "@react-google-maps/api";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
  FaCalendarAlt,
  FaCarSide,
  FaClock,
  FaLocationArrow,
  FaMapMarkerAlt,
  FaSearch,
  FaStar,
  FaTimesCircle,
  FaUserTie,
} from "react-icons/fa";
import {
  cancelLocationBooking,
  createLocationBooking,
  getAvailableBookingSlots,
  getLocationBookings,
  getNearbyTeachers,
} from "@/features/API";

const GOOGLE_MAP_LIBRARIES = ["places"];
const MAP_STYLE = { width: "100%", height: "620px" };
const DEFAULT_CENTER = { lat: 48.8566, lng: 2.3522 };

const getToday = () => {
  const now = new Date();
  const offset = now.getTimezoneOffset();
  return new Date(now.getTime() - offset * 60 * 1000)
    .toISOString()
    .slice(0, 10);
};

const initialSearch = () => ({
  address: "",
  placeId: "",
  lat: null,
  lng: null,
  vehicleType: "manual",
  date: getToday(),
  startTime: "09:00",
  duration: 60,
  radius: 10,
});

const unwrap = (response, fallback = null) =>
  response?.data?.data ?? response?.data ?? fallback;

const getErrorMessage = (error, fallback) =>
  error?.response?.data?.message || error?.message || fallback;

const hasCoordinate = (value) =>
  value !== null && value !== "" && Number.isFinite(Number(value));

const timeToMinutes = (value) => {
  const [hours, minutes] = String(value || "")
    .split(":")
    .map(Number);

  if (!Number.isFinite(hours) || !Number.isFinite(minutes)) return null;
  return hours * 60 + minutes;
};

const minutesToTime = (minutes) => {
  if (!Number.isFinite(minutes) || minutes < 0 || minutes >= 1440) return "";
  const hours = Math.floor(minutes / 60);
  const remainder = minutes % 60;
  return `${String(hours).padStart(2, "0")}:${String(remainder).padStart(2, "0")}`;
};

const calculateEndTime = (startTime, duration) => {
  const start = timeToMinutes(startTime);
  if (start === null) return "";
  return minutesToTime(start + Number(duration));
};

const formatDate = (value) => {
  if (!value) return "Date not set";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;

  return new Intl.DateTimeFormat("en-GB", {
    weekday: "short",
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(date);
};

const teacherPoint = (teacher) => {
  const location = teacher?.nearestLocation;
  const lat = Number(
    location?.coordinates?.lat ?? location?.geoLocation?.coordinates?.[1],
  );
  const lng = Number(
    location?.coordinates?.lng ?? location?.geoLocation?.coordinates?.[0],
  );

  return Number.isFinite(lat) && Number.isFinite(lng) ? { lat, lng } : null;
};

const statusClasses = (status) => {
  if (status === "confirmed") return "bg-emerald-100 text-emerald-700";
  if (status === "completed") return "bg-blue-100 text-blue-700";
  if (["cancelled", "rejected", "expired"].includes(status)) {
    return "bg-red-100 text-red-700";
  }
  return "bg-amber-100 text-amber-700";
};

function MapError({ message }) {
  return (
    <div className="rounded-3xl border border-red-200 bg-red-50 p-6 text-sm text-red-700">
      <p className="font-black">Google Maps could not load</p>
      <p className="mt-2">{message}</p>
      <p className="mt-3 text-xs leading-5">
        Put a valid key in <code>NEXT_PUBLIC_GOOGLE_MAPS_API_KEY</code>, then
        enable Maps JavaScript API and Places API (New).
      </p>
    </div>
  );
}

export default function BookLessonPage() {
  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY?.trim();

  if (!apiKey) {
    return (
      <MapError message="NEXT_PUBLIC_GOOGLE_MAPS_API_KEY is missing from .env.local." />
    );
  }

  return <BookLessonMap apiKey={apiKey} />;
}

function BookLessonMap({ apiKey }) {
  const { isLoaded, loadError } = useJsApiLoader({
    id: "permisgo-google-maps",
    googleMapsApiKey: apiKey,
    libraries: GOOGLE_MAP_LIBRARIES,
    version: "weekly",
    language: "en",
    region: "FR",
  });

  if (loadError) return <MapError message={loadError.message} />;

  if (!isLoaded) {
    return (
      <div className="rounded-3xl border border-slate-200 bg-white p-8 text-center font-bold text-slate-500">
        Loading Google Maps...
      </div>
    );
  }

  return <BookLessonContent />;
}

function BookLessonContent() {
  const mapRef = useRef(null);
  const [search, setSearch] = useState(initialSearch);
  const [teachers, setTeachers] = useState([]);
  const [selectedTeacherId, setSelectedTeacherId] = useState("");
  const [availableSlots, setAvailableSlots] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [searched, setSearched] = useState(false);
  const [searching, setSearching] = useState(false);
  const [loadingSlots, setLoadingSlots] = useState(false);
  const [loadingBookings, setLoadingBookings] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [cancellingId, setCancellingId] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const endTime = useMemo(
    () => calculateEndTime(search.startTime, search.duration),
    [search.startTime, search.duration],
  );

  const searchPoint = useMemo(() => {
    if (!hasCoordinate(search.lat) || !hasCoordinate(search.lng)) {
      return DEFAULT_CENTER;
    }

    return { lat: Number(search.lat), lng: Number(search.lng) };
  }, [search.lat, search.lng]);

  const selectedTeacher = useMemo(
    () =>
      teachers.find((teacher) => teacher?.user?._id === selectedTeacherId) ||
      null,
    [teachers, selectedTeacherId],
  );

  const selectedVehicle = useMemo(() => {
    const matchingVehicles = (selectedTeacher?.vehicles || []).filter(
      (vehicle) =>
        vehicle?._id &&
        vehicle.approvalStatus === "approved" &&
        vehicle.status === "active" &&
        vehicle.vehicleType === search.vehicleType,
    );
    return (
      matchingVehicles.find((vehicle) => vehicle.isDefault) ||
      matchingVehicles[0] ||
      null
    );
  }, [search.vehicleType, selectedTeacher]);

  const loadBookings = useCallback(async () => {
    setLoadingBookings(true);

    try {
      const response = await getLocationBookings();
      const data = unwrap(response, []);
      setBookings(Array.isArray(data) ? data : []);
    } catch (requestError) {
      setError(
        getErrorMessage(requestError, "Your bookings could not be loaded."),
      );
    } finally {
      setLoadingBookings(false);
    }
  }, []);

  useEffect(() => {
    loadBookings();
  }, [loadBookings]);

  useEffect(() => {
    if (!success) return undefined;
    const timer = window.setTimeout(() => setSuccess(""), 5000);
    return () => window.clearTimeout(timer);
  }, [success]);

  useEffect(() => {
    const teacherId = selectedTeacher?.user?._id;

    if (!teacherId || !search.date || !search.duration) {
      setAvailableSlots([]);
      return undefined;
    }

    let active = true;

    const loadSlots = async () => {
      setLoadingSlots(true);

      try {
        const response = await getAvailableBookingSlots({
          teacher: teacherId,
          date: search.date,
          duration: search.duration,
        });
        const data = unwrap(response, {});

        if (active) {
          setAvailableSlots(
            Array.isArray(data?.availableSlots) ? data.availableSlots : [],
          );
        }
      } catch {
        if (active) setAvailableSlots([]);
      } finally {
        if (active) setLoadingSlots(false);
      }
    };

    loadSlots();

    return () => {
      active = false;
    };
  }, [selectedTeacher, search.date, search.duration]);

  const reverseGeocode = useCallback((lat, lng) => {
    if (!window.google?.maps) return;

    const geocoder = new window.google.maps.Geocoder();
    geocoder.geocode({ location: { lat, lng } }, (results, status) => {
      if (status !== "OK" || !results?.[0]) return;

      const result = results[0];
      setSearch((current) => ({
        ...current,
        address: result.formatted_address || current.address,
        placeId: result.place_id || current.placeId,
      }));
    });
  }, []);

  const setSearchPoint = useCallback(
    (lat, lng, shouldReverse = true) => {
      setSearch((current) => ({ ...current, lat, lng }));
      mapRef.current?.panTo({ lat, lng });
      mapRef.current?.setZoom(14);

      if (shouldReverse) reverseGeocode(lat, lng);
    },
    [reverseGeocode],
  );

  const handlePlaceSelect = (place) => {
    setSearch((current) => ({
      ...current,
      address: place.address,
      placeId: place.placeId,
      lat: place.lat,
      lng: place.lng,
    }));

    mapRef.current?.panTo({ lat: place.lat, lng: place.lng });
    mapRef.current?.setZoom(14);
    setError("");
  };

  const useCurrentLocation = () => {
    setError("");

    if (!navigator.geolocation) {
      setError("This browser does not support location access.");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      ({ coords }) => setSearchPoint(coords.latitude, coords.longitude, true),
      (geoError) =>
        setError(geoError.message || "Location permission was denied."),
      { enableHighAccuracy: true, timeout: 12000 },
    );
  };

  const selectTeacher = (teacher) => {
    const teacherId = teacher?.user?._id;
    if (!teacherId) return;

    setSelectedTeacherId(teacherId);
    const point = teacherPoint(teacher);

    if (point) {
      mapRef.current?.panTo(point);
      mapRef.current?.setZoom(15);
    }
  };

  const runSearch = async (event) => {
    event?.preventDefault();
    setError("");
    setSuccess("");

    if (!hasCoordinate(search.lat) || !hasCoordinate(search.lng)) {
      setError("Select an address from Google suggestions first.");
      return;
    }

    if (!search.date || !search.startTime || !endTime) {
      setError("Choose a valid date, time and lesson duration.");
      return;
    }

    setSearching(true);

    try {
      const response = await getNearbyTeachers({
        lat: Number(search.lat),
        lng: Number(search.lng),
        radius: Number(search.radius),
        vehicleType: search.vehicleType,
        date: search.date,
        startTime: search.startTime,
        endTime,
      });

      const data = unwrap(response, []);
      const list = Array.isArray(data) ? data : [];

      setTeachers(list);
      setSelectedTeacherId(list[0]?.user?._id || "");
      setSearched(true);

      if (list.length && window.google?.maps) {
        const bounds = new window.google.maps.LatLngBounds();
        bounds.extend(searchPoint);

        list.forEach((teacher) => {
          const point = teacherPoint(teacher);
          if (point) bounds.extend(point);
        });

        mapRef.current?.fitBounds(bounds, 70);
      } else {
        mapRef.current?.panTo(searchPoint);
        mapRef.current?.setZoom(12);
      }
    } catch (requestError) {
      setTeachers([]);
      setSelectedTeacherId("");
      setSearched(true);
      setError(
        getErrorMessage(requestError, "Nearby teachers could not be searched."),
      );
    } finally {
      setSearching(false);
    }
  };

  const submitBooking = async () => {
    setError("");
    setSuccess("");

    if (!selectedTeacher) {
      setError("Select a teacher first.");
      return;
    }

    if (!selectedVehicle) {
      setError("The selected teacher has no approved active vehicle for this lesson type.");
      return;
    }

    const location = selectedTeacher.nearestLocation;
    if (!location?._id) {
      setError("The selected teacher has no usable location.");
      return;
    }

    setSubmitting(true);

    try {
      const response = await createLocationBooking({
        teacher: selectedTeacher.user._id,
        locationId: location._id,
        teacherVehicleId: selectedVehicle._id,
        vehicleType: selectedVehicle.vehicleType,
        bookingDate: search.date,
        startTime: search.startTime,
        endTime,
        studentLocation: {
          address: search.address,
          placeId: search.placeId,
          lat: Number(search.lat),
          lng: Number(search.lng),
        },
      });

      const booking = unwrap(response, null);
      if (booking?._id) {
        setBookings((current) => [booking, ...current]);
      } else {
        await loadBookings();
      }

      await runSearch();
      setSuccess(
        "Booking request submitted. The lesson will be created after the teacher confirms it.",
      );
    } catch (requestError) {
      setError(
        getErrorMessage(requestError, "Booking request could not be created."),
      );
    } finally {
      setSubmitting(false);
    }
  };

  const cancelBooking = async (booking) => {
    const reason = window.prompt("Why do you want to cancel this booking?");
    if (!reason?.trim()) return;

    setCancellingId(booking._id);
    setError("");

    try {
      const response = await cancelLocationBooking(booking._id, {
        reason: reason.trim(),
      });
      const updated = unwrap(response, null);

      setBookings((current) =>
        current.map((item) =>
          item._id === booking._id
            ? updated || { ...item, status: "cancelled" }
            : item,
        ),
      );
      setSuccess("Booking cancelled successfully.");
    } catch (requestError) {
      setError(
        getErrorMessage(requestError, "Booking could not be cancelled."),
      );
    } finally {
      setCancellingId("");
    }
  };

  return (
    <main className="space-y-6 pb-10">
      <section className="rounded-3xl bg-gradient-to-r from-[#123D7A] to-[#1E63B7] p-6 text-white shadow-lg">
        <p className="text-sm font-bold text-blue-100">
          Location-based booking
        </p>
        <h1 className="mt-1 text-3xl font-black">
          Find a driving teacher near you
        </h1>
        <p className="mt-2 max-w-3xl text-sm leading-6 text-blue-100">
          Select a real Google address, choose your vehicle and time, then book
          an available verified teacher.
        </p>
      </section>

      {error && (
        <div className="rounded-2xl border border-red-200 bg-red-50 px-5 py-4 text-sm font-semibold text-red-700">
          {error}
        </div>
      )}

      {success && (
        <div className="rounded-2xl border border-emerald-200 bg-emerald-50 px-5 py-4 text-sm font-semibold text-emerald-700">
          {success}
        </div>
      )}

      <section className="grid gap-6 xl:grid-cols-[430px_minmax(0,1fr)]">
        <form
          onSubmit={runSearch}
          className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm"
        >
          <h2 className="text-xl font-black text-slate-900">Search details</h2>

          <div className="mt-5 space-y-4">
            <div>
              <label className="mb-2 block text-sm font-black text-slate-700">
                Your location
              </label>
              <GooglePlaceAutocomplete
                value={search.address}
                placeholder="Type a street, city or landmark"
                onPlaceSelect={handlePlaceSelect}
                onError={setError}
              />
              {search.address && (
                <p className="mt-2 rounded-xl bg-blue-50 px-3 py-2 text-xs font-semibold text-blue-800">
                  <FaMapMarkerAlt className="mr-1 inline" /> {search.address}
                </p>
              )}
            </div>

            <button
              type="button"
              onClick={useCurrentLocation}
              className="flex w-full items-center justify-center gap-2 rounded-2xl border border-blue-200 bg-blue-50 px-4 py-3 text-sm font-black text-blue-700 hover:bg-blue-100"
            >
              <FaLocationArrow /> Use current location
            </button>

            <SelectField
              label="Vehicle"
              value={search.vehicleType}
              onChange={(value) =>
                setSearch((current) => ({
                  ...current,
                  vehicleType: value,
                }))
              }
              options={[
                { value: "manual", label: "Manual" },
                { value: "automatic", label: "Automatic" },
              ]}
            />

            <div className="grid grid-cols-2 gap-3">
              <InputField
                label="Date"
                type="date"
                value={search.date}
                min={getToday()}
                onChange={(value) =>
                  setSearch((current) => ({ ...current, date: value }))
                }
              />
              <InputField
                label="Start time"
                type="time"
                value={search.startTime}
                onChange={(value) =>
                  setSearch((current) => ({ ...current, startTime: value }))
                }
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <SelectField
                label="Duration"
                value={search.duration}
                onChange={(value) =>
                  setSearch((current) => ({
                    ...current,
                    duration: Number(value),
                  }))
                }
                options={[
                  { value: 30, label: "30 minutes" },
                  { value: 60, label: "1 hour" },
                  { value: 90, label: "1.5 hours" },
                  { value: 120, label: "2 hours" },
                ]}
              />
              <SelectField
                label="Search radius"
                value={search.radius}
                onChange={(value) =>
                  setSearch((current) => ({
                    ...current,
                    radius: Number(value),
                  }))
                }
                options={[3, 5, 10, 15, 20, 30, 50].map((value) => ({
                  value,
                  label: `${value} km`,
                }))}
              />
            </div>

            <div className="rounded-2xl bg-slate-50 px-4 py-3 text-sm font-bold text-slate-600">
              Requested time: {search.startTime || "--"} - {endTime || "--"}
            </div>

            <button
              type="submit"
              disabled={searching}
              className="flex w-full items-center justify-center gap-2 rounded-2xl bg-[#174A9B] px-5 py-3.5 text-sm font-black text-white shadow-md hover:bg-[#123D7A] disabled:opacity-60"
            >
              <FaSearch /> {searching ? "Searching..." : "Search teachers"}
            </button>
          </div>
        </form>

        <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white p-3 shadow-sm">
          <GoogleMap
            mapContainerStyle={MAP_STYLE}
            center={searchPoint}
            zoom={hasCoordinate(search.lat) ? 13 : 11}
            onLoad={(map) => {
              mapRef.current = map;
            }}
            onClick={(event) => {
              if (!event.latLng) return;
              setSearchPoint(event.latLng.lat(), event.latLng.lng(), true);
            }}
            options={{
              streetViewControl: false,
              mapTypeControl: false,
              fullscreenControl: true,
              clickableIcons: false,
            }}
          >
            {hasCoordinate(search.lat) && hasCoordinate(search.lng) && (
              <>
                <MarkerF
                  position={searchPoint}
                  draggable
                  onDragEnd={(event) => {
                    if (!event.latLng) return;
                    setSearchPoint(
                      event.latLng.lat(),
                      event.latLng.lng(),
                      true,
                    );
                  }}
                />
                <CircleF
                  center={searchPoint}
                  radius={Number(search.radius) * 1000}
                  options={{
                    fillOpacity: 0.08,
                    strokeOpacity: 0.45,
                    strokeWeight: 1.5,
                  }}
                />
              </>
            )}

            {teachers.map((teacher) => {
              const point = teacherPoint(teacher);
              if (!point) return null;

              return (
                <MarkerF
                  key={teacher.user?._id}
                  position={point}
                  onClick={() => selectTeacher(teacher)}
                />
              );
            })}
          </GoogleMap>
          <p className="px-2 pb-1 pt-3 text-xs font-semibold text-slate-500">
            You can also click the map or drag your marker to correct the exact
            search point.
          </p>
        </div>
      </section>

      <section className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_360px]">
        <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="flex items-center justify-between gap-3">
            <div>
              <p className="text-xs font-black uppercase tracking-wider text-blue-600">
                Nearby teachers
              </p>
              <h2 className="mt-1 text-xl font-black text-slate-900">
                Available for your request
              </h2>
            </div>
            <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-black text-blue-700">
              {teachers.length} found
            </span>
          </div>

          {teachers.length ? (
            <div className="mt-5 grid gap-4 md:grid-cols-2">
              {teachers.map((teacher) => (
                <TeacherCard
                  key={teacher.user?._id}
                  teacher={teacher}
                  vehicleType={search.vehicleType}
                  selected={teacher.user?._id === selectedTeacherId}
                  onSelect={() => selectTeacher(teacher)}
                />
              ))}
            </div>
          ) : searched ? (
            <div className="mt-5 rounded-2xl bg-slate-50 py-12 text-center">
              <FaUserTie className="mx-auto text-3xl text-slate-300" />
              <p className="mt-3 font-black text-slate-700">No teacher found</p>
              <p className="mt-1 text-sm text-slate-500">
                Try a larger radius, a different time, or another vehicle type.
              </p>
            </div>
          ) : (
            <div className="mt-5 rounded-2xl bg-slate-50 py-12 text-center text-sm font-bold text-slate-500">
              Select your location and search to see available teachers.
            </div>
          )}

          {selectedTeacher && (
            <div className="mt-6 rounded-2xl border border-blue-100 bg-blue-50 p-4">
              <h3 className="font-black text-slate-900">
                Available times on {formatDate(search.date)}
              </h3>
              <p className="mt-1 text-xs font-semibold text-slate-500">
                Select a slot to update the requested start time.
              </p>

              <div className="mt-4 flex flex-wrap gap-2">
                {loadingSlots ? (
                  <p className="text-sm font-bold text-slate-500">
                    Loading available slots...
                  </p>
                ) : availableSlots.length ? (
                  availableSlots.slice(0, 24).map((slot) => (
                    <button
                      key={`${slot.startTime}-${slot.endTime}`}
                      type="button"
                      onClick={() =>
                        setSearch((current) => ({
                          ...current,
                          startTime: slot.startTime,
                        }))
                      }
                      className={`rounded-xl px-3 py-2 text-xs font-black transition ${
                        search.startTime === slot.startTime
                          ? "bg-[#174A9B] text-white"
                          : "bg-white text-slate-700 hover:text-blue-700"
                      }`}
                    >
                      {slot.startTime} - {slot.endTime}
                    </button>
                  ))
                ) : (
                  <p className="text-sm font-bold text-slate-500">
                    No free slot is available for this duration.
                  </p>
                )}
              </div>
            </div>
          )}
        </div>

        <div className="space-y-6">
          {selectedTeacher ? (
            <BookingSummary
              teacher={selectedTeacher}
              search={search}
              endTime={endTime}
              submitting={submitting}
              onSubmit={submitBooking}
            />
          ) : (
            <div className="rounded-3xl border border-slate-200 bg-white p-6 text-center shadow-sm">
              <FaCarSide className="mx-auto text-3xl text-slate-300" />
              <p className="mt-3 font-black text-slate-700">Select a teacher</p>
              <p className="mt-1 text-sm text-slate-500">
                The booking summary will appear here.
              </p>
            </div>
          )}
        </div>
      </section>

      <section className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
        <div className="flex items-center justify-between gap-3">
          <div>
            <p className="text-xs font-black uppercase tracking-wider text-blue-600">
              My requests
            </p>
            <h2 className="mt-1 text-xl font-black text-slate-900">
              Driving lesson bookings
            </h2>
          </div>
          <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-black text-slate-700">
            {bookings.length}
          </span>
        </div>

        {loadingBookings ? (
          <p className="py-10 text-center font-bold text-slate-500">
            Loading bookings...
          </p>
        ) : bookings.length ? (
          <div className="mt-5 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {bookings.map((booking) => (
              <BookingCard
                key={booking._id}
                booking={booking}
                cancelling={cancellingId === booking._id}
                onCancel={() => cancelBooking(booking)}
              />
            ))}
          </div>
        ) : (
          <div className="mt-5 rounded-2xl bg-slate-50 py-10 text-center text-sm font-bold text-slate-500">
            You have no driving lesson booking yet.
          </div>
        )}
      </section>
    </main>
  );
}

function TeacherCard({ teacher, vehicleType, selected, onSelect }) {
  const user = teacher?.user || {};
  const location = teacher?.nearestLocation || {};
  const vehicle = (teacher?.vehicles || []).find(
    (item) => item.vehicleType === vehicleType,
  );

  return (
    <button
      type="button"
      onClick={onSelect}
      className={`rounded-2xl border p-4 text-left transition ${
        selected
          ? "border-blue-500 bg-blue-50 ring-4 ring-blue-100"
          : "border-slate-200 bg-white hover:border-blue-300"
      }`}
    >
      <div className="flex items-start gap-3">
        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#174A9B] font-black text-white">
          {(user.name || "T").charAt(0).toUpperCase()}
        </div>
        <div className="min-w-0 flex-1">
          <h3 className="truncate font-black text-slate-900">
            {user.name || "Driving teacher"}
          </h3>
          <p className="mt-1 text-xs font-bold text-slate-500">
            {teacher.experienceYears || 0} years experience
          </p>
        </div>
        <span className="rounded-full bg-white px-2.5 py-1 text-xs font-black text-blue-700">
          {Number(teacher.distanceKm || 0).toFixed(1)} km
        </span>
      </div>

      <div className="mt-4 flex flex-wrap gap-2 text-xs font-black">
        <span className="rounded-lg bg-amber-50 px-2.5 py-1.5 text-amber-700">
          <FaStar className="mr-1 inline" />
          {Number(teacher?.rating?.average || 0).toFixed(1)}
        </span>
        <span className="rounded-lg bg-slate-100 px-2.5 py-1.5 text-slate-700">
          <FaCarSide className="mr-1 inline" />
          {vehicle?.vehicleName || vehicleType}
        </span>
        <span className="rounded-lg bg-emerald-50 px-2.5 py-1.5 text-emerald-700">
          €{Number(teacher.hourlyRate || 0).toFixed(0)}/hour
        </span>
      </div>

      <p className="mt-4 text-xs font-semibold leading-5 text-slate-500">
        <FaMapMarkerAlt className="mr-1 inline text-blue-600" />
        {[location.address, location.city].filter(Boolean).join(", ") ||
          "Lesson meeting point"}
      </p>
    </button>
  );
}

function BookingSummary({ teacher, search, endTime, submitting, onSubmit }) {
  const location = teacher.nearestLocation || {};
  const price =
    (Number(teacher.hourlyRate || 0) * Number(search.duration || 0)) / 60;

  return (
    <aside className="sticky top-5 rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
      <h2 className="text-xl font-black text-slate-900">Booking summary</h2>

      <div className="mt-5 space-y-3">
        <SummaryRow label="Teacher" value={teacher.user?.name} />
        <SummaryRow label="Date" value={formatDate(search.date)} />
        <SummaryRow
          label="Time"
          value={`${search.startTime || "--"} - ${endTime || "--"}`}
        />
        <SummaryRow label="Vehicle" value={search.vehicleType} />
        <SummaryRow label="Duration" value={`${search.duration} minutes`} />
        <SummaryRow
          label="Meeting point"
          value={
            [location.address, location.city].filter(Boolean).join(", ") ||
            "Not set"
          }
        />
        <SummaryRow
          label="Estimated price"
          value={`€${price.toFixed(2)}`}
          strong
        />
      </div>

      <button
        type="button"
        onClick={onSubmit}
        disabled={submitting}
        className="mt-5 w-full rounded-2xl bg-[#174A9B] px-5 py-3.5 text-sm font-black text-white hover:bg-[#123D7A] disabled:opacity-60"
      >
        {submitting ? "Submitting..." : "Request booking"}
      </button>

      <p className="mt-3 text-center text-xs font-semibold leading-5 text-slate-500">
        The request remains pending until the teacher confirms it.
      </p>
    </aside>
  );
}

function BookingCard({ booking, cancelling, onCancel }) {
  const canCancel = ["pending", "confirmed"].includes(booking.status);

  return (
    <article className="rounded-2xl border border-slate-200 p-4">
      <div className="flex items-start justify-between gap-3">
        <div>
          <h3 className="font-black text-slate-900">
            {booking.teacher?.name || "Driving teacher"}
          </h3>
          <p className="mt-1 text-xs font-bold text-slate-500">
            {formatDate(booking.bookingDate)}
          </p>
        </div>
        <span
          className={`rounded-full px-2.5 py-1 text-[11px] font-black ${statusClasses(
            booking.status,
          )}`}
        >
          {booking.status}
        </span>
      </div>

      <div className="mt-4 grid grid-cols-2 gap-2">
        <MiniInfo
          icon={<FaClock />}
          label="Time"
          value={`${booking.startTime} - ${booking.endTime}`}
        />
        <MiniInfo
          icon={<FaCarSide />}
          label="Vehicle"
          value={booking.vehicleType}
        />
        <MiniInfo
          icon={<FaCalendarAlt />}
          label="Duration"
          value={`${booking.duration} min`}
        />
        <MiniInfo
          icon={<FaMapMarkerAlt />}
          label="Location"
          value={booking.location?.city || "Set"}
        />
      </div>

      {canCancel && (
        <button
          type="button"
          onClick={onCancel}
          disabled={cancelling}
          className="mt-4 w-full rounded-xl bg-red-50 px-3 py-2.5 text-xs font-black text-red-700 hover:bg-red-100 disabled:opacity-60"
        >
          <FaTimesCircle className="mr-1 inline" />
          {cancelling ? "Cancelling..." : "Cancel request"}
        </button>
      )}
    </article>
  );
}

function InputField({ label, type, value, onChange, min }) {
  return (
    <label className="block">
      <span className="mb-2 block text-sm font-black text-slate-700">
        {label}
      </span>
      <input
        type={type}
        value={value}
        min={min}
        onChange={(event) => onChange(event.target.value)}
        className="w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
      />
    </label>
  );
}

function SelectField({ label, value, onChange, options }) {
  return (
    <label className="block">
      <span className="mb-2 block text-sm font-black text-slate-700">
        {label}
      </span>
      <select
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </label>
  );
}

function SummaryRow({ label, value, strong = false }) {
  return (
    <div className="flex items-start justify-between gap-4 border-b border-slate-100 pb-3 text-sm">
      <span className="font-bold text-slate-500">{label}</span>
      <span
        className={`max-w-[60%] text-right ${
          strong
            ? "text-base font-black text-blue-700"
            : "font-black text-slate-800"
        }`}
      >
        {value || "--"}
      </span>
    </div>
  );
}

function MiniInfo({ icon, label, value }) {
  return (
    <div className="rounded-xl bg-slate-50 p-2.5">
      <p className="text-[10px] font-black uppercase tracking-wider text-slate-400">
        {icon} {label}
      </p>
      <p className="mt-1 truncate text-xs font-black capitalize text-slate-700">
        {value || "--"}
      </p>
    </div>
  );
}
