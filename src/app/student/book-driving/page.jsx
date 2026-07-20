

// "use client";

// import {
//   Autocomplete,
//   CircleF,
//   GoogleMap,
//   MarkerF,
//   useJsApiLoader,
// } from "@react-google-maps/api";
// import { useCallback, useEffect, useMemo, useRef, useState } from "react";
// import {
//   FaCalendarAlt,
//   FaCarSide,
//   FaClock,
//   FaLocationArrow,
//   FaMapMarkerAlt,
//   FaSearch,
//   FaStar,
//   FaTimesCircle,
//   FaUserTie,
// } from "react-icons/fa";
// import {
//   cancelLocationBooking,
//   createLocationBooking,
//   getAvailableBookingSlots,
//   getLocationBookings,
//   getNearbyTeachers,
// } from "@/features/API";

// const MAP_LIBRARIES = ["places"];
// const MAP_CONTAINER_STYLE = { width: "100%", height: "610px" };
// const DEFAULT_CENTER = { lat: 48.8566, lng: 2.3522 };

// const getToday = () => {
//   const now = new Date();
//   const offset = now.getTimezoneOffset();
//   return new Date(now.getTime() - offset * 60 * 1000)
//     .toISOString()
//     .slice(0, 10);
// };

// const EMPTY_SEARCH = {
//   address: "",
//   placeId: "",
//   lat: null,
//   lng: null,
//   vehicleType: "manual",
//   date: getToday(),
//   startTime: "09:00",
//   duration: 60,
//   radius: 10,
// };

// const unwrap = (response, fallback = null) =>
//   response?.data?.data ?? response?.data ?? fallback;

// const errorMessage = (error, fallback) =>
//   error?.response?.data?.message || error?.message || fallback;

// const getAddressPart = (components = [], type) =>
//   components.find((component) => component.types?.includes(type))?.long_name ||
//   "";

// const hasCoordinate = (value) =>
//   value !== null && value !== "" && Number.isFinite(Number(value));

// const timeToMinutes = (value) => {
//   const [hours, minutes] = String(value || "")
//     .split(":")
//     .map(Number);
//   if (!Number.isFinite(hours) || !Number.isFinite(minutes)) return null;
//   return hours * 60 + minutes;
// };

// const minutesToTime = (minutes) => {
//   if (!Number.isFinite(minutes) || minutes < 0 || minutes >= 1440) return "";
//   const hours = Math.floor(minutes / 60);
//   const remainder = minutes % 60;
//   return `${String(hours).padStart(2, "0")}:${String(remainder).padStart(2, "0")}`;
// };

// const calculateEndTime = (startTime, duration) => {
//   const start = timeToMinutes(startTime);
//   if (start === null) return "";
//   return minutesToTime(start + Number(duration));
// };

// const formatDate = (value) => {
//   if (!value) return "Date not set";
//   const date = new Date(value);
//   if (Number.isNaN(date.getTime())) return value;
//   return new Intl.DateTimeFormat("en-GB", {
//     weekday: "short",
//     day: "2-digit",
//     month: "short",
//     year: "numeric",
//   }).format(date);
// };

// const statusClass = (status) => {
//   if (status === "confirmed") return "bg-emerald-100 text-emerald-700";
//   if (status === "completed") return "bg-blue-100 text-blue-700";
//   if (["cancelled", "rejected", "expired"].includes(status)) {
//     return "bg-red-100 text-red-700";
//   }
//   return "bg-amber-100 text-amber-700";
// };

// const markerPosition = (teacher) => {
//   const location = teacher?.nearestLocation;
//   const lat = Number(
//     location?.coordinates?.lat ?? location?.geoLocation?.coordinates?.[1],
//   );
//   const lng = Number(
//     location?.coordinates?.lng ?? location?.geoLocation?.coordinates?.[0],
//   );
//   return Number.isFinite(lat) && Number.isFinite(lng) ? { lat, lng } : null;
// };

// function MissingGoogleKey() {
//   return (
//     <div className="mx-auto max-w-4xl p-6">
//       <div className="rounded-3xl border border-amber-200 bg-amber-50 p-6 text-amber-900">
//         <h1 className="text-2xl font-black">Google Maps key is missing</h1>
//         <p className="mt-2 text-sm leading-6">
//           Add <code>NEXT_PUBLIC_GOOGLE_MAPS_API_KEY</code> to frontend
//           <code> .env.local</code> and restart the frontend server.
//         </p>
//       </div>
//     </div>
//   );
// }

// export default function BookDrivingPage() {
//   const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;
//   if (!apiKey) return <MissingGoogleKey />;
//   return <LocationBookingPage apiKey={apiKey} />;
// }

// function LocationBookingPage({ apiKey }) {
//   const { isLoaded, loadError } = useJsApiLoader({
//     id: "permisgo-google-map",
//     googleMapsApiKey: apiKey,
//     libraries: MAP_LIBRARIES,
//   });

//   const autocompleteRef = useRef(null);
//   const mapRef = useRef(null);
//   const [search, setSearch] = useState(EMPTY_SEARCH);
//   const [teachers, setTeachers] = useState([]);
//   const [selectedTeacherId, setSelectedTeacherId] = useState("");
//   const [bookings, setBookings] = useState([]);
//   const [availableSlots, setAvailableSlots] = useState([]);
//   const [searched, setSearched] = useState(false);
//   const [searching, setSearching] = useState(false);
//   const [loadingBookings, setLoadingBookings] = useState(true);
//   const [loadingSlots, setLoadingSlots] = useState(false);
//   const [submitting, setSubmitting] = useState(false);
//   const [cancellingId, setCancellingId] = useState("");
//   const [error, setError] = useState("");
//   const [success, setSuccess] = useState("");

//   const endTime = useMemo(
//     () => calculateEndTime(search.startTime, search.duration),
//     [search.startTime, search.duration],
//   );

//   const selectedTeacher = useMemo(
//     () =>
//       teachers.find((teacher) => teacher?.user?._id === selectedTeacherId) ||
//       null,
//     [teachers, selectedTeacherId],
//   );

//   const searchCenter = useMemo(() => {
//     const lat = Number(search.lat);
//     const lng = Number(search.lng);
//     return hasCoordinate(search.lat) && hasCoordinate(search.lng)
//       ? { lat, lng }
//       : DEFAULT_CENTER;
//   }, [search.lat, search.lng]);

//   const loadBookings = useCallback(async () => {
//     setLoadingBookings(true);
//     try {
//       const response = await getLocationBookings();
//       const data = unwrap(response, []);
//       setBookings(Array.isArray(data) ? data : []);
//     } catch (requestError) {
//       setError(
//         errorMessage(requestError, "Your bookings could not be loaded."),
//       );
//     } finally {
//       setLoadingBookings(false);
//     }
//   }, []);

//   useEffect(() => {
//     loadBookings();
//   }, [loadBookings]);

//   useEffect(() => {
//     if (!success) return undefined;
//     const timer = window.setTimeout(() => setSuccess(""), 5000);
//     return () => window.clearTimeout(timer);
//   }, [success]);

//   useEffect(() => {
//     const teacherId = selectedTeacher?.user?._id;
//     if (!teacherId || !search.date || !search.duration) {
//       setAvailableSlots([]);
//       return;
//     }

//     let active = true;
//     const loadSlots = async () => {
//       setLoadingSlots(true);
//       try {
//         const response = await getAvailableBookingSlots({
//           teacher: teacherId,
//           date: search.date,
//           duration: search.duration,
//         });
//         const data = unwrap(response, {});
//         if (active) {
//           setAvailableSlots(
//             Array.isArray(data?.availableSlots) ? data.availableSlots : [],
//           );
//         }
//       } catch {
//         if (active) setAvailableSlots([]);
//       } finally {
//         if (active) setLoadingSlots(false);
//       }
//     };

//     loadSlots();
//     return () => {
//       active = false;
//     };
//   }, [selectedTeacher, search.date, search.duration]);

//   const reverseGeocode = useCallback((lat, lng) => {
//     if (!window.google) return;
//     const geocoder = new window.google.maps.Geocoder();
//     geocoder.geocode({ location: { lat, lng } }, (results, status) => {
//       if (status !== "OK" || !results?.[0]) return;
//       const result = results[0];
//       setSearch((current) => ({
//         ...current,
//         address: result.formatted_address || current.address,
//         placeId: result.place_id || current.placeId,
//       }));
//     });
//   }, []);

//   const setSearchPoint = useCallback(
//     (lat, lng, shouldReverse = true) => {
//       setSearch((current) => ({ ...current, lat, lng }));
//       const point = { lat, lng };
//       mapRef.current?.panTo(point);
//       mapRef.current?.setZoom(13);
//       if (shouldReverse) reverseGeocode(lat, lng);
//     },
//     [reverseGeocode],
//   );

//   const useCurrentLocation = () => {
//     setError("");
//     if (!navigator.geolocation) {
//       setError("This browser does not support location access.");
//       return;
//     }
//     navigator.geolocation.getCurrentPosition(
//       ({ coords }) => setSearchPoint(coords.latitude, coords.longitude, true),
//       (geoError) =>
//         setError(geoError.message || "Location permission was denied."),
//       { enableHighAccuracy: true, timeout: 12000 },
//     );
//   };

//   const handlePlaceChanged = () => {
//     const place = autocompleteRef.current?.getPlace();
//     const lat = place?.geometry?.location?.lat();
//     const lng = place?.geometry?.location?.lng();
//     if (!Number.isFinite(lat) || !Number.isFinite(lng)) {
//       setError("Select an address from Google suggestions.");
//       return;
//     }
//     setSearch((current) => ({
//       ...current,
//       address: place.formatted_address || place.name || "",
//       placeId: place.place_id || "",
//       lat,
//       lng,
//       city:
//         getAddressPart(place.address_components, "locality") ||
//         getAddressPart(place.address_components, "administrative_area_level_2"),
//     }));
//     setSearchPoint(lat, lng, false);
//     setError("");
//   };

//   const chooseTeacher = (teacher) => {
//     const id = teacher?.user?._id;
//     if (!id) return;
//     setSelectedTeacherId(id);
//     const point = markerPosition(teacher);
//     if (point) {
//       mapRef.current?.panTo(point);
//       mapRef.current?.setZoom(14);
//     }
//   };

//   const runSearch = async (event) => {
//     event?.preventDefault();
//     setError("");
//     setSuccess("");

//     if (!hasCoordinate(search.lat) || !hasCoordinate(search.lng)) {
//       setError("Select your location or use current location first.");
//       return;
//     }
//     if (!search.date || !search.startTime || !endTime) {
//       setError("Select a valid date, start time and lesson duration.");
//       return;
//     }

//     setSearching(true);
//     try {
//       const response = await getNearbyTeachers({
//         lat: Number(search.lat),
//         lng: Number(search.lng),
//         radius: Number(search.radius),
//         vehicleType: search.vehicleType,
//         date: search.date,
//         startTime: search.startTime,
//         endTime,
//       });
//       const data = unwrap(response, []);
//       const list = Array.isArray(data) ? data : [];
//       setTeachers(list);
//       setSelectedTeacherId(list[0]?.user?._id || "");
//       setSearched(true);

//       if (list.length) {
//         const bounds = new window.google.maps.LatLngBounds();
//         bounds.extend(searchCenter);
//         list.forEach((teacher) => {
//           const point = markerPosition(teacher);
//           if (point) bounds.extend(point);
//         });
//         mapRef.current?.fitBounds(bounds, 70);
//       } else {
//         mapRef.current?.panTo(searchCenter);
//         mapRef.current?.setZoom(12);
//       }
//     } catch (requestError) {
//       setTeachers([]);
//       setSelectedTeacherId("");
//       setSearched(true);
//       setError(
//         errorMessage(requestError, "Nearby teachers could not be searched."),
//       );
//     } finally {
//       setSearching(false);
//     }
//   };

//   const submitBooking = async () => {
//     setError("");
//     setSuccess("");
//     if (!selectedTeacher) {
//       setError("Select a teacher first.");
//       return;
//     }

//     const location = selectedTeacher.nearestLocation;
//     if (!location?._id) {
//       setError("The selected teacher has no usable location.");
//       return;
//     }

//     setSubmitting(true);
//     try {
//       const response = await createLocationBooking({
//         teacher: selectedTeacher.user._id,
//         locationId: location._id,
//         vehicleType: search.vehicleType,
//         bookingDate: search.date,
//         startTime: search.startTime,
//         endTime,
//         studentLocation: {
//           address: search.address,
//           placeId: search.placeId,
//           lat: Number(search.lat),
//           lng: Number(search.lng),
//         },
//       });
//       const booking = unwrap(response, null);
//       if (booking?._id) {
//         setBookings((current) => [booking, ...current]);
//       } else {
//         await loadBookings();
//       }
//       await runSearch();
//       setSuccess(
//         "Booking request submitted. The lesson will be created after the teacher confirms it.",
//       );
//     } catch (requestError) {
//       setError(
//         errorMessage(requestError, "Booking request could not be created."),
//       );
//     } finally {
//       setSubmitting(false);
//     }
//   };

//   const cancelBooking = async (booking) => {
//     const reason = window.prompt("Why do you want to cancel this booking?");
//     if (!reason?.trim()) return;
//     setCancellingId(booking._id);
//     setError("");
//     try {
//       const response = await cancelLocationBooking(booking._id, {
//         reason: reason.trim(),
//       });
//       const updated = unwrap(response, null);
//       setBookings((current) =>
//         current.map((item) =>
//           item._id === booking._id
//             ? updated || { ...item, status: "cancelled" }
//             : item,
//         ),
//       );
//       setSuccess("Booking cancelled successfully.");
//     } catch (requestError) {
//       setError(errorMessage(requestError, "Booking could not be cancelled."));
//     } finally {
//       setCancellingId("");
//     }
//   };

//   if (loadError) {
//     return (
//       <div className="p-6 text-red-700">
//         Google Maps failed to load: {loadError.message}
//       </div>
//     );
//   }

//   if (!isLoaded) {
//     return (
//       <div className="p-6 font-semibold text-slate-600">
//         Loading Google Maps...
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-[#F5F7FB] p-4 sm:p-6 lg:p-8">
//       <div className="mx-auto max-w-[1500px] space-y-6">
//         <header className="rounded-3xl bg-gradient-to-r from-[#153E75] to-[#1F63B5] p-6 text-white shadow-lg sm:p-8">
//           <p className="text-sm font-black uppercase tracking-[0.2em] text-blue-100">
//             Location-based booking
//           </p>
//           <h1 className="mt-2 text-3xl font-black sm:text-4xl">
//             Find a driving teacher near you
//           </h1>
//           <p className="mt-3 max-w-3xl text-sm leading-6 text-blue-100 sm:text-base">
//             Choose your location, vehicle, date and time. Only verified teachers
//             inside the search radius with a free slot are shown.
//           </p>
//         </header>

//         {error && (
//           <div className="rounded-2xl border border-red-200 bg-red-50 px-5 py-4 text-sm font-semibold text-red-700">
//             {error}
//           </div>
//         )}
//         {success && (
//           <div className="rounded-2xl border border-emerald-200 bg-emerald-50 px-5 py-4 text-sm font-semibold text-emerald-700">
//             {success}
//           </div>
//         )}

//         <form
//           onSubmit={runSearch}
//           className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6"
//         >
//           <div className="grid gap-4 lg:grid-cols-[2fr_repeat(5,minmax(130px,1fr))]">
//             <label className="block">
//               <span className="mb-2 block text-sm font-black text-slate-700">
//                 Your location
//               </span>
//               <div className="flex gap-2">
//                 <Autocomplete
//                   onLoad={(instance) => {
//                     autocompleteRef.current = instance;
//                   }}
//                   onPlaceChanged={handlePlaceChanged}
//                   className="min-w-0 flex-1"
//                 >
//                   <input
//                     value={search.address}
//                     onChange={(event) =>
//                       setSearch((current) => ({
//                         ...current,
//                         address: event.target.value,
//                       }))
//                     }
//                     placeholder="Enter an address"
//                     className="w-full rounded-2xl border border-slate-200 px-4 py-3 outline-none focus:border-[#174A9B] focus:ring-4 focus:ring-blue-100"
//                   />
//                 </Autocomplete>
//                 <button
//                   type="button"
//                   onClick={useCurrentLocation}
//                   title="Use current location"
//                   className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-blue-50 text-[#174A9B]"
//                 >
//                   <FaLocationArrow />
//                 </button>
//               </div>
//             </label>

//             <SelectField
//               label="Vehicle"
//               value={search.vehicleType}
//               onChange={(value) =>
//                 setSearch((current) => ({ ...current, vehicleType: value }))
//               }
//               options={[
//                 { value: "manual", label: "Manual" },
//                 { value: "automatic", label: "Automatic" },
//               ]}
//             />

//             <InputField
//               label="Date"
//               type="date"
//               min={getToday()}
//               value={search.date}
//               onChange={(value) =>
//                 setSearch((current) => ({ ...current, date: value }))
//               }
//             />

//             <InputField
//               label="Start time"
//               type="time"
//               value={search.startTime}
//               onChange={(value) =>
//                 setSearch((current) => ({ ...current, startTime: value }))
//               }
//             />

//             <SelectField
//               label="Duration"
//               value={search.duration}
//               onChange={(value) =>
//                 setSearch((current) => ({
//                   ...current,
//                   duration: Number(value),
//                 }))
//               }
//               options={[
//                 { value: 30, label: "30 min" },
//                 { value: 60, label: "1 hour" },
//                 { value: 90, label: "1.5 hours" },
//                 { value: 120, label: "2 hours" },
//               ]}
//             />

//             <SelectField
//               label="Radius"
//               value={search.radius}
//               onChange={(value) =>
//                 setSearch((current) => ({ ...current, radius: Number(value) }))
//               }
//               options={[3, 5, 10, 15, 20, 30, 50].map((value) => ({
//                 value,
//                 label: `${value} km`,
//               }))}
//             />
//           </div>

//           <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
//             <p className="text-sm font-semibold text-slate-500">
//               Requested slot: {search.startTime || "--"} -{" "}
//               {endTime || "invalid"}
//             </p>
//             <button
//               type="submit"
//               disabled={searching}
//               className="inline-flex items-center justify-center gap-2 rounded-2xl bg-[#174A9B] px-6 py-3.5 font-black text-white shadow-sm disabled:opacity-60"
//             >
//               <FaSearch />{" "}
//               {searching ? "Searching..." : "Search nearby teachers"}
//             </button>
//           </div>
//         </form>

//         <section className="grid gap-6 xl:grid-cols-[440px_1fr]">
//           <div className="order-2 space-y-4 xl:order-1">
//             <div className="flex items-center justify-between">
//               <div>
//                 <h2 className="text-xl font-black text-slate-900">
//                   Nearby teachers
//                 </h2>
//                 <p className="text-sm text-slate-500">
//                   Sorted by distance from your selected location.
//                 </p>
//               </div>
//               <span className="rounded-full bg-white px-3 py-1.5 text-sm font-black text-[#174A9B] shadow-sm">
//                 {teachers.length} found
//               </span>
//             </div>

//             {teachers.length ? (
//               teachers.map((teacher) => (
//                 <TeacherCard
//                   key={teacher.user?._id}
//                   teacher={teacher}
//                   selected={teacher.user?._id === selectedTeacherId}
//                   vehicleType={search.vehicleType}
//                   onSelect={() => chooseTeacher(teacher)}
//                 />
//               ))
//             ) : searched ? (
//               <div className="rounded-3xl border border-dashed border-slate-300 bg-white p-8 text-center">
//                 <FaUserTie className="mx-auto text-4xl text-slate-300" />
//                 <h3 className="mt-4 font-black text-slate-800">
//                   No teacher found
//                 </h3>
//                 <p className="mt-2 text-sm leading-6 text-slate-500">
//                   Try a larger radius, another time, or a different vehicle
//                   type.
//                 </p>
//               </div>
//             ) : (
//               <div className="rounded-3xl border border-dashed border-slate-300 bg-white p-8 text-center text-sm leading-6 text-slate-500">
//                 Select your location and search to see verified teachers nearby.
//               </div>
//             )}
//           </div>

//           <div className="order-1 overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm xl:order-2">
//             <GoogleMap
//               mapContainerStyle={MAP_CONTAINER_STYLE}
//               center={searchCenter}
//               zoom={12}
//               onLoad={(map) => {
//                 mapRef.current = map;
//               }}
//               options={{
//                 streetViewControl: false,
//                 mapTypeControl: false,
//                 fullscreenControl: true,
//               }}
//             >
//               {hasCoordinate(search.lat) && hasCoordinate(search.lng) && (
//                 <>
//                   <MarkerF
//                     position={searchCenter}
//                     title="Your location"
//                     draggable
//                     onDragEnd={(event) =>
//                       setSearchPoint(
//                         event.latLng.lat(),
//                         event.latLng.lng(),
//                         true,
//                       )
//                     }
//                   />
//                   <CircleF
//                     center={searchCenter}
//                     radius={Number(search.radius) * 1000}
//                     options={{
//                       fillOpacity: 0.08,
//                       strokeOpacity: 0.35,
//                       strokeWeight: 1.5,
//                     }}
//                   />
//                 </>
//               )}

//               {teachers.map((teacher) => {
//                 const position = markerPosition(teacher);
//                 if (!position) return null;
//                 return (
//                   <MarkerF
//                     key={teacher.user?._id}
//                     position={position}
//                     title={`${teacher.user?.name || "Teacher"} · ${teacher.distanceKm} km`}
//                     label={
//                       teacher.user?._id === selectedTeacherId
//                         ? { text: "T", color: "#ffffff", fontWeight: "700" }
//                         : undefined
//                     }
//                     onClick={() => chooseTeacher(teacher)}
//                   />
//                 );
//               })}
//             </GoogleMap>
//           </div>
//         </section>

//         {selectedTeacher && (
//           <section className="grid gap-6 lg:grid-cols-[1fr_360px]">
//             <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
//               <div className="flex items-center gap-3">
//                 <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-50 text-[#174A9B]">
//                   <FaClock />
//                 </div>
//                 <div>
//                   <h2 className="text-xl font-black text-slate-900">
//                     Available times on {formatDate(search.date)}
//                   </h2>
//                   <p className="text-sm text-slate-500">
//                     Selecting another slot updates your booking time.
//                   </p>
//                 </div>
//               </div>

//               <div className="mt-5 flex flex-wrap gap-2">
//                 {loadingSlots ? (
//                   <span className="text-sm font-semibold text-slate-500">
//                     Loading available slots...
//                   </span>
//                 ) : availableSlots.length ? (
//                   availableSlots.slice(0, 20).map((slot) => (
//                     <button
//                       key={`${slot.startTime}-${slot.endTime}`}
//                       type="button"
//                       onClick={() =>
//                         setSearch((current) => ({
//                           ...current,
//                           startTime: slot.startTime,
//                         }))
//                       }
//                       className={`rounded-xl px-4 py-2 text-sm font-black transition ${
//                         search.startTime === slot.startTime
//                           ? "bg-[#174A9B] text-white"
//                           : "bg-slate-100 text-slate-700 hover:bg-blue-50 hover:text-[#174A9B]"
//                       }`}
//                     >
//                       {slot.startTime} - {slot.endTime}
//                     </button>
//                   ))
//                 ) : (
//                   <span className="text-sm font-semibold text-red-600">
//                     No free slot is available for this duration.
//                   </span>
//                 )}
//               </div>
//             </div>

//             <BookingSummary
//               teacher={selectedTeacher}
//               search={search}
//               endTime={endTime}
//               submitting={submitting}
//               onSubmit={submitBooking}
//             />
//           </section>
//         )}

//         <section className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
//           <div className="flex items-center justify-between gap-4">
//             <div>
//               <h2 className="text-xl font-black text-slate-900">
//                 My booking requests
//               </h2>
//               <p className="text-sm text-slate-500">
//                 Confirmed requests automatically become scheduled lessons.
//               </p>
//             </div>
//             <span className="rounded-full bg-blue-50 px-3 py-1.5 text-sm font-black text-[#174A9B]">
//               {bookings.length}
//             </span>
//           </div>

//           {loadingBookings ? (
//             <p className="mt-5 text-sm font-semibold text-slate-500">
//               Loading bookings...
//             </p>
//           ) : bookings.length ? (
//             <div className="mt-5 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
//               {bookings.map((booking) => (
//                 <BookingCard
//                   key={booking._id}
//                   booking={booking}
//                   cancelling={cancellingId === booking._id}
//                   onCancel={() => cancelBooking(booking)}
//                 />
//               ))}
//             </div>
//           ) : (
//             <div className="mt-5 rounded-2xl border border-dashed border-slate-300 p-8 text-center text-sm text-slate-500">
//               You have no driving lesson booking yet.
//             </div>
//           )}
//         </section>
//       </div>
//     </div>
//   );
// }

// function TeacherCard({ teacher, selected, vehicleType, onSelect }) {
//   const user = teacher?.user || {};
//   const location = teacher?.nearestLocation || {};
//   const vehicles = teacher?.vehicles || [];
//   const matchingVehicle = vehicles.find(
//     (vehicle) => vehicle.vehicleType === vehicleType,
//   );

//   return (
//     <button
//       type="button"
//       onClick={onSelect}
//       className={`w-full rounded-3xl border p-5 text-left transition ${
//         selected
//           ? "border-[#174A9B] bg-blue-50 shadow-sm"
//           : "border-slate-200 bg-white hover:border-blue-300"
//       }`}
//     >
//       <div className="flex items-start gap-4">
//         <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-[#174A9B] text-xl font-black text-white">
//           {(user.name || "T").charAt(0).toUpperCase()}
//         </div>
//         <div className="min-w-0 flex-1">
//           <div className="flex items-start justify-between gap-3">
//             <div>
//               <h3 className="truncate text-lg font-black text-slate-900">
//                 {user.name || "Driving teacher"}
//               </h3>
//               <p className="mt-1 text-sm font-semibold text-slate-500">
//                 {teacher.experienceYears || 0} years experience
//               </p>
//             </div>
//             <span className="rounded-full bg-white px-2.5 py-1 text-xs font-black text-[#174A9B] shadow-sm">
//               {Number(teacher.distanceKm || 0).toFixed(1)} km
//             </span>
//           </div>

//           <div className="mt-3 flex flex-wrap items-center gap-2 text-xs font-bold">
//             <span className="inline-flex items-center gap-1 rounded-full bg-amber-50 px-2.5 py-1 text-amber-700">
//               <FaStar /> {Number(teacher?.rating?.average || 0).toFixed(1)}
//             </span>
//             <span className="rounded-full bg-white px-2.5 py-1 text-slate-600">
//               {matchingVehicle?.vehicleName || vehicleType}
//             </span>
//             <span className="rounded-full bg-white px-2.5 py-1 text-slate-600">
//               €{Number(teacher.hourlyRate || 0).toFixed(0)}/hour
//             </span>
//           </div>

//           <p className="mt-3 flex items-start gap-2 text-sm leading-5 text-slate-600">
//             <FaMapMarkerAlt className="mt-0.5 shrink-0 text-[#174A9B]" />
//             <span>
//               {[location.address, location.city].filter(Boolean).join(", ") ||
//                 "Lesson meeting point"}
//             </span>
//           </p>
//         </div>
//       </div>
//     </button>
//   );
// }

// function BookingSummary({ teacher, search, endTime, submitting, onSubmit }) {
//   const location = teacher.nearestLocation || {};
//   const price =
//     (Number(teacher.hourlyRate || 0) * Number(search.duration || 0)) / 60;

//   return (
//     <aside className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
//       <h2 className="text-xl font-black text-slate-900">Booking summary</h2>
//       <div className="mt-5 space-y-3 text-sm">
//         <SummaryRow label="Teacher" value={teacher.user?.name || "Teacher"} />
//         <SummaryRow label="Vehicle" value={search.vehicleType} />
//         <SummaryRow label="Date" value={formatDate(search.date)} />
//         <SummaryRow label="Time" value={`${search.startTime} - ${endTime}`} />
//         <SummaryRow label="Duration" value={`${search.duration} minutes`} />
//         <SummaryRow label="Distance" value={`${teacher.distanceKm} km`} />
//         <SummaryRow
//           label="Meeting point"
//           value={[location.address, location.city].filter(Boolean).join(", ")}
//         />
//         <div className="border-t border-slate-200 pt-3">
//           <SummaryRow
//             label="Estimated total"
//             value={`€${price.toFixed(2)}`}
//             strong
//           />
//         </div>
//       </div>
//       <button
//         type="button"
//         onClick={onSubmit}
//         disabled={submitting}
//         className="mt-5 flex w-full items-center justify-center gap-2 rounded-2xl bg-[#174A9B] px-5 py-3.5 font-black text-white disabled:opacity-60"
//       >
//         <FaCalendarAlt /> {submitting ? "Submitting..." : "Request booking"}
//       </button>
//       <p className="mt-3 text-center text-xs leading-5 text-slate-500">
//         The request stays pending until the teacher confirms it.
//       </p>
//     </aside>
//   );
// }

// function BookingCard({ booking, cancelling, onCancel }) {
//   const canCancel = ["pending", "confirmed"].includes(booking.status);
//   return (
//     <article className="rounded-2xl border border-slate-200 p-4">
//       <div className="flex items-start justify-between gap-3">
//         <div>
//           <h3 className="font-black text-slate-900">
//             {booking.teacher?.name || "Driving teacher"}
//           </h3>
//           <p className="mt-1 text-sm text-slate-500">
//             {formatDate(booking.bookingDate)} · {booking.startTime} -{" "}
//             {booking.endTime}
//           </p>
//         </div>
//         <span
//           className={`rounded-full px-2.5 py-1 text-xs font-black capitalize ${statusClass(
//             booking.status,
//           )}`}
//         >
//           {booking.status}
//         </span>
//       </div>

//       <div className="mt-4 grid grid-cols-2 gap-3 text-sm">
//         <MiniInfo
//           icon={<FaCarSide />}
//           label="Vehicle"
//           value={booking.vehicleType}
//         />
//         <MiniInfo
//           icon={<FaClock />}
//           label="Duration"
//           value={`${booking.duration} min`}
//         />
//       </div>

//       <p className="mt-4 flex gap-2 text-sm leading-5 text-slate-600">
//         <FaMapMarkerAlt className="mt-0.5 shrink-0 text-[#174A9B]" />
//         {[booking.location?.address, booking.location?.city]
//           .filter(Boolean)
//           .join(", ") || "Location not set"}
//       </p>

//       {canCancel && (
//         <button
//           type="button"
//           onClick={onCancel}
//           disabled={cancelling}
//           className="mt-4 inline-flex items-center gap-2 rounded-xl bg-red-50 px-4 py-2 text-sm font-black text-red-700 disabled:opacity-60"
//         >
//           <FaTimesCircle /> {cancelling ? "Cancelling..." : "Cancel request"}
//         </button>
//       )}
//     </article>
//   );
// }

// function InputField({ label, type, value, onChange, min }) {
//   return (
//     <label className="block">
//       <span className="mb-2 block text-sm font-black text-slate-700">
//         {label}
//       </span>
//       <input
//         type={type}
//         value={value}
//         min={min}
//         onChange={(event) => onChange(event.target.value)}
//         className="w-full rounded-2xl border border-slate-200 px-4 py-3 outline-none focus:border-[#174A9B] focus:ring-4 focus:ring-blue-100"
//       />
//     </label>
//   );
// }

// function SelectField({ label, value, onChange, options }) {
//   return (
//     <label className="block">
//       <span className="mb-2 block text-sm font-black text-slate-700">
//         {label}
//       </span>
//       <select
//         value={value}
//         onChange={(event) => onChange(event.target.value)}
//         className="w-full rounded-2xl border border-slate-200 px-4 py-3 outline-none focus:border-[#174A9B] focus:ring-4 focus:ring-blue-100"
//       >
//         {options.map((option) => (
//           <option key={option.value} value={option.value}>
//             {option.label}
//           </option>
//         ))}
//       </select>
//     </label>
//   );
// }

// function SummaryRow({ label, value, strong = false }) {
//   return (
//     <div className="flex items-start justify-between gap-4">
//       <span className="text-slate-500">{label}</span>
//       <span
//         className={`max-w-[210px] text-right capitalize ${
//           strong
//             ? "text-lg font-black text-[#174A9B]"
//             : "font-bold text-slate-800"
//         }`}
//       >
//         {value || "--"}
//       </span>
//     </div>
//   );
// }

// function MiniInfo({ icon, label, value }) {
//   return (
//     <div className="rounded-xl bg-slate-50 p-3">
//       <div className="flex items-center gap-2 text-xs font-bold text-slate-500">
//         <span className="text-[#174A9B]">{icon}</span>
//         {label}
//       </div>
//       <p className="mt-1 font-black capitalize text-slate-800">{value}</p>
//     </div>
//   );
// }



















"use client";

import {
  Autocomplete,
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

const MAP_LIBRARIES = ["places"];
const MAP_CONTAINER_STYLE = { width: "100%", height: "610px" };
const DEFAULT_CENTER = { lat: 48.8566, lng: 2.3522 };

const getToday = () => {
  const now = new Date();
  const offset = now.getTimezoneOffset();
  return new Date(now.getTime() - offset * 60 * 1000)
    .toISOString()
    .slice(0, 10);
};

const EMPTY_SEARCH = {
  address: "",
  placeId: "",
  lat: null,
  lng: null,
  vehicleType: "manual",
  date: getToday(),
  startTime: "09:00",
  duration: 60,
  radius: 10,
};

const unwrap = (response, fallback = null) =>
  response?.data?.data ?? response?.data ?? fallback;

const errorMessage = (error, fallback) =>
  error?.response?.data?.message || error?.message || fallback;

const getAddressPart = (components = [], type) =>
  components.find((component) => component.types?.includes(type))?.long_name ||
  "";

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

const statusClass = (status) => {
  if (status === "confirmed") return "bg-emerald-100 text-emerald-700";
  if (status === "completed") return "bg-blue-100 text-blue-700";
  if (["cancelled", "rejected", "expired"].includes(status)) {
    return "bg-red-100 text-red-700";
  }
  return "bg-amber-100 text-amber-700";
};

const markerPosition = (teacher) => {
  const location = teacher?.nearestLocation;
  const lat = Number(
    location?.coordinates?.lat ?? location?.geoLocation?.coordinates?.[1],
  );
  const lng = Number(
    location?.coordinates?.lng ?? location?.geoLocation?.coordinates?.[0],
  );
  return Number.isFinite(lat) && Number.isFinite(lng) ? { lat, lng } : null;
};

function MissingGoogleKey() {
  return (
    <div className="mx-auto max-w-4xl p-6">
      <div className="rounded-3xl border border-amber-200 bg-amber-50 p-6 text-amber-900">
        <h1 className="text-2xl font-black">Google Maps key is missing</h1>
        <p className="mt-2 text-sm leading-6">
          Add <code>NEXT_PUBLIC_GOOGLE_MAPS_API_KEY</code> to frontend
          <code> .env.local</code> and restart the frontend server.
        </p>
      </div>
    </div>
  );
}

export default function BookDrivingPage() {
  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;
  if (!apiKey) return <MissingGoogleKey />;
  return <LocationBookingPage apiKey={apiKey} />;
}

function LocationBookingPage({ apiKey }) {
  const { isLoaded, loadError } = useJsApiLoader({
    id: "permisgo-google-map",
    googleMapsApiKey: apiKey,
    libraries: MAP_LIBRARIES,
  });

  const autocompleteRef = useRef(null);
  const mapRef = useRef(null);
  const [search, setSearch] = useState(EMPTY_SEARCH);
  const [teachers, setTeachers] = useState([]);
  const [selectedTeacherId, setSelectedTeacherId] = useState("");
  const [selectedVehicleId, setSelectedVehicleId] = useState("");
  const [bookings, setBookings] = useState([]);
  const [availableSlots, setAvailableSlots] = useState([]);
  const [searched, setSearched] = useState(false);
  const [searching, setSearching] = useState(false);
  const [loadingBookings, setLoadingBookings] = useState(true);
  const [loadingSlots, setLoadingSlots] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [cancellingId, setCancellingId] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const endTime = useMemo(
    () => calculateEndTime(search.startTime, search.duration),
    [search.startTime, search.duration],
  );

  const selectedTeacher = useMemo(
    () =>
      teachers.find((teacher) => teacher?.user?._id === selectedTeacherId) ||
      null,
    [teachers, selectedTeacherId],
  );

  const selectableVehicles = useMemo(
    () =>
      (selectedTeacher?.vehicles || []).filter(
        (vehicle) =>
          vehicle?._id &&
          vehicle.approvalStatus === "approved" &&
          vehicle.status === "active" &&
          vehicle.vehicleType === search.vehicleType,
      ),
    [selectedTeacher, search.vehicleType],
  );

  const selectedVehicle = useMemo(
    () =>
      selectableVehicles.find(
        (vehicle) => String(vehicle._id) === String(selectedVehicleId),
      ) || null,
    [selectableVehicles, selectedVehicleId],
  );

  const searchCenter = useMemo(() => {
    const lat = Number(search.lat);
    const lng = Number(search.lng);
    return hasCoordinate(search.lat) && hasCoordinate(search.lng)
      ? { lat, lng }
      : DEFAULT_CENTER;
  }, [search.lat, search.lng]);

  const loadBookings = useCallback(async () => {
    setLoadingBookings(true);
    try {
      const response = await getLocationBookings();
      const data = unwrap(response, []);
      setBookings(Array.isArray(data) ? data : []);
    } catch (requestError) {
      setError(
        errorMessage(requestError, "Your bookings could not be loaded."),
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
    setSelectedVehicleId((current) => {
      const currentStillAvailable = selectableVehicles.some(
        (vehicle) => String(vehicle._id) === String(current),
      );
      if (currentStillAvailable) return current;

      const preferredVehicle =
        selectableVehicles.find((vehicle) => vehicle.isDefault) ||
        selectableVehicles[0];

      return preferredVehicle?._id || "";
    });
  }, [selectableVehicles]);

  useEffect(() => {
    const teacherId = selectedTeacher?.user?._id;
    if (!teacherId || !search.date || !search.duration) {
      setAvailableSlots([]);
      return;
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
    if (!window.google) return;
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
      const point = { lat, lng };
      mapRef.current?.panTo(point);
      mapRef.current?.setZoom(13);
      if (shouldReverse) reverseGeocode(lat, lng);
    },
    [reverseGeocode],
  );

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

  const handlePlaceChanged = () => {
    const place = autocompleteRef.current?.getPlace();
    const lat = place?.geometry?.location?.lat();
    const lng = place?.geometry?.location?.lng();
    if (!Number.isFinite(lat) || !Number.isFinite(lng)) {
      setError("Select an address from Google suggestions.");
      return;
    }
    setSearch((current) => ({
      ...current,
      address: place.formatted_address || place.name || "",
      placeId: place.place_id || "",
      lat,
      lng,
      city:
        getAddressPart(place.address_components, "locality") ||
        getAddressPart(place.address_components, "administrative_area_level_2"),
    }));
    setSearchPoint(lat, lng, false);
    setError("");
  };

  const chooseTeacher = (teacher) => {
    const id = teacher?.user?._id;
    if (!id) return;
    setSelectedTeacherId(id);
    setSelectedVehicleId("");
    const point = markerPosition(teacher);
    if (point) {
      mapRef.current?.panTo(point);
      mapRef.current?.setZoom(14);
    }
  };

  const runSearch = async (event) => {
    event?.preventDefault();
    setError("");
    setSuccess("");

    if (!hasCoordinate(search.lat) || !hasCoordinate(search.lng)) {
      setError("Select your location or use current location first.");
      return;
    }
    if (!search.date || !search.startTime || !endTime) {
      setError("Select a valid date, start time and lesson duration.");
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
      setSelectedVehicleId("");
      setSearched(true);

      if (list.length) {
        const bounds = new window.google.maps.LatLngBounds();
        bounds.extend(searchCenter);
        list.forEach((teacher) => {
          const point = markerPosition(teacher);
          if (point) bounds.extend(point);
        });
        mapRef.current?.fitBounds(bounds, 70);
      } else {
        mapRef.current?.panTo(searchCenter);
        mapRef.current?.setZoom(12);
      }
    } catch (requestError) {
      setTeachers([]);
      setSelectedTeacherId("");
      setSelectedVehicleId("");
      setSearched(true);
      setError(
        errorMessage(requestError, "Nearby teachers could not be searched."),
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
      setError("Select an admin-approved active vehicle first.");
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
        errorMessage(requestError, "Booking request could not be created."),
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
      setError(errorMessage(requestError, "Booking could not be cancelled."));
    } finally {
      setCancellingId("");
    }
  };

  if (loadError) {
    return (
      <div className="p-6 text-red-700">
        Google Maps failed to load: {loadError.message}
      </div>
    );
  }

  if (!isLoaded) {
    return (
      <div className="p-6 font-semibold text-slate-600">
        Loading Google Maps...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F5F7FB] p-4 sm:p-6 lg:p-8">
      <div className="mx-auto max-w-[1500px] space-y-6">
        <header className="rounded-3xl bg-gradient-to-r from-[#153E75] to-[#1F63B5] p-6 text-white shadow-lg sm:p-8">
          <p className="text-sm font-black uppercase tracking-[0.2em] text-blue-100">
            Location-based booking
          </p>
          <h1 className="mt-2 text-3xl font-black sm:text-4xl">
            Find a driving teacher near you
          </h1>
          <p className="mt-3 max-w-3xl text-sm leading-6 text-blue-100 sm:text-base">
            Choose your location, vehicle, date and time. Only verified teachers
            inside the search radius with a free slot are shown.
          </p>
        </header>

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

        <form
          onSubmit={runSearch}
          className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6"
        >
          <div className="grid gap-4 lg:grid-cols-[2fr_repeat(5,minmax(130px,1fr))]">
            <label className="block">
              <span className="mb-2 block text-sm font-black text-slate-700">
                Your location
              </span>
              <div className="flex gap-2">
                <Autocomplete
                  onLoad={(instance) => {
                    autocompleteRef.current = instance;
                  }}
                  onPlaceChanged={handlePlaceChanged}
                  className="min-w-0 flex-1"
                >
                  <input
                    value={search.address}
                    onChange={(event) =>
                      setSearch((current) => ({
                        ...current,
                        address: event.target.value,
                      }))
                    }
                    placeholder="Enter an address"
                    className="w-full rounded-2xl border border-slate-200 px-4 py-3 outline-none focus:border-[#174A9B] focus:ring-4 focus:ring-blue-100"
                  />
                </Autocomplete>
                <button
                  type="button"
                  onClick={useCurrentLocation}
                  title="Use current location"
                  className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-blue-50 text-[#174A9B]"
                >
                  <FaLocationArrow />
                </button>
              </div>
            </label>

            <SelectField
              label="Vehicle"
              value={search.vehicleType}
              onChange={(value) =>
                setSearch((current) => ({ ...current, vehicleType: value }))
              }
              options={[
                { value: "manual", label: "Manual" },
                { value: "automatic", label: "Automatic" },
              ]}
            />

            <InputField
              label="Date"
              type="date"
              min={getToday()}
              value={search.date}
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
                { value: 30, label: "30 min" },
                { value: 60, label: "1 hour" },
                { value: 90, label: "1.5 hours" },
                { value: 120, label: "2 hours" },
              ]}
            />

            <SelectField
              label="Radius"
              value={search.radius}
              onChange={(value) =>
                setSearch((current) => ({ ...current, radius: Number(value) }))
              }
              options={[3, 5, 10, 15, 20, 30, 50].map((value) => ({
                value,
                label: `${value} km`,
              }))}
            />
          </div>

          <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-sm font-semibold text-slate-500">
              Requested slot: {search.startTime || "--"} -{" "}
              {endTime || "invalid"}
            </p>
            <button
              type="submit"
              disabled={searching}
              className="inline-flex items-center justify-center gap-2 rounded-2xl bg-[#174A9B] px-6 py-3.5 font-black text-white shadow-sm disabled:opacity-60"
            >
              <FaSearch />{" "}
              {searching ? "Searching..." : "Search nearby teachers"}
            </button>
          </div>
        </form>

        <section className="grid gap-6 xl:grid-cols-[440px_1fr]">
          <div className="order-2 space-y-4 xl:order-1">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-black text-slate-900">
                  Nearby teachers
                </h2>
                <p className="text-sm text-slate-500">
                  Sorted by distance from your selected location.
                </p>
              </div>
              <span className="rounded-full bg-white px-3 py-1.5 text-sm font-black text-[#174A9B] shadow-sm">
                {teachers.length} found
              </span>
            </div>

            {teachers.length ? (
              teachers.map((teacher) => (
                <TeacherCard
                  key={teacher.user?._id}
                  teacher={teacher}
                  selected={teacher.user?._id === selectedTeacherId}
                  vehicleType={search.vehicleType}
                  onSelect={() => chooseTeacher(teacher)}
                />
              ))
            ) : searched ? (
              <div className="rounded-3xl border border-dashed border-slate-300 bg-white p-8 text-center">
                <FaUserTie className="mx-auto text-4xl text-slate-300" />
                <h3 className="mt-4 font-black text-slate-800">
                  No teacher found
                </h3>
                <p className="mt-2 text-sm leading-6 text-slate-500">
                  Try a larger radius, another time, or a different vehicle
                  type.
                </p>
              </div>
            ) : (
              <div className="rounded-3xl border border-dashed border-slate-300 bg-white p-8 text-center text-sm leading-6 text-slate-500">
                Select your location and search to see verified teachers nearby.
              </div>
            )}
          </div>

          <div className="order-1 overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm xl:order-2">
            <GoogleMap
              mapContainerStyle={MAP_CONTAINER_STYLE}
              center={searchCenter}
              zoom={12}
              onLoad={(map) => {
                mapRef.current = map;
              }}
              options={{
                streetViewControl: false,
                mapTypeControl: false,
                fullscreenControl: true,
              }}
            >
              {hasCoordinate(search.lat) && hasCoordinate(search.lng) && (
                <>
                  <MarkerF
                    position={searchCenter}
                    title="Your location"
                    draggable
                    onDragEnd={(event) =>
                      setSearchPoint(
                        event.latLng.lat(),
                        event.latLng.lng(),
                        true,
                      )
                    }
                  />
                  <CircleF
                    center={searchCenter}
                    radius={Number(search.radius) * 1000}
                    options={{
                      fillOpacity: 0.08,
                      strokeOpacity: 0.35,
                      strokeWeight: 1.5,
                    }}
                  />
                </>
              )}

              {teachers.map((teacher) => {
                const position = markerPosition(teacher);
                if (!position) return null;
                return (
                  <MarkerF
                    key={teacher.user?._id}
                    position={position}
                    title={`${teacher.user?.name || "Teacher"} · ${teacher.distanceKm} km`}
                    label={
                      teacher.user?._id === selectedTeacherId
                        ? { text: "T", color: "#ffffff", fontWeight: "700" }
                        : undefined
                    }
                    onClick={() => chooseTeacher(teacher)}
                  />
                );
              })}
            </GoogleMap>
          </div>
        </section>

        {selectedTeacher && (
          <section className="grid gap-6 lg:grid-cols-[1fr_360px]">
            <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
              <VehicleSelector
                vehicles={selectableVehicles}
                selectedVehicleId={selectedVehicleId}
                onSelect={setSelectedVehicleId}
              />

              <div className="mt-6 flex items-center gap-3 border-t border-slate-200 pt-6">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-50 text-[#174A9B]">
                  <FaClock />
                </div>
                <div>
                  <h2 className="text-xl font-black text-slate-900">
                    Available times on {formatDate(search.date)}
                  </h2>
                  <p className="text-sm text-slate-500">
                    Selecting another slot updates your booking time.
                  </p>
                </div>
              </div>

              <div className="mt-5 flex flex-wrap gap-2">
                {loadingSlots ? (
                  <span className="text-sm font-semibold text-slate-500">
                    Loading available slots...
                  </span>
                ) : availableSlots.length ? (
                  availableSlots.slice(0, 20).map((slot) => (
                    <button
                      key={`${slot.startTime}-${slot.endTime}`}
                      type="button"
                      onClick={() =>
                        setSearch((current) => ({
                          ...current,
                          startTime: slot.startTime,
                        }))
                      }
                      className={`rounded-xl px-4 py-2 text-sm font-black transition ${
                        search.startTime === slot.startTime
                          ? "bg-[#174A9B] text-white"
                          : "bg-slate-100 text-slate-700 hover:bg-blue-50 hover:text-[#174A9B]"
                      }`}
                    >
                      {slot.startTime} - {slot.endTime}
                    </button>
                  ))
                ) : (
                  <span className="text-sm font-semibold text-red-600">
                    No free slot is available for this duration.
                  </span>
                )}
              </div>
            </div>

            <BookingSummary
              teacher={selectedTeacher}
              vehicle={selectedVehicle}
              search={search}
              endTime={endTime}
              submitting={submitting}
              onSubmit={submitBooking}
            />
          </section>
        )}

        <section className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
          <div className="flex items-center justify-between gap-4">
            <div>
              <h2 className="text-xl font-black text-slate-900">
                My booking requests
              </h2>
              <p className="text-sm text-slate-500">
                Confirmed requests automatically become scheduled lessons.
              </p>
            </div>
            <span className="rounded-full bg-blue-50 px-3 py-1.5 text-sm font-black text-[#174A9B]">
              {bookings.length}
            </span>
          </div>

          {loadingBookings ? (
            <p className="mt-5 text-sm font-semibold text-slate-500">
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
            <div className="mt-5 rounded-2xl border border-dashed border-slate-300 p-8 text-center text-sm text-slate-500">
              You have no driving lesson booking yet.
            </div>
          )}
        </section>
      </div>
    </div>
  );
}

function TeacherCard({ teacher, selected, vehicleType, onSelect }) {
  const user = teacher?.user || {};
  const location = teacher?.nearestLocation || {};
  const vehicles = teacher?.vehicles || [];
  const matchingVehicle = vehicles.find(
    (vehicle) => vehicle.vehicleType === vehicleType,
  );

  return (
    <button
      type="button"
      onClick={onSelect}
      className={`w-full rounded-3xl border p-5 text-left transition ${
        selected
          ? "border-[#174A9B] bg-blue-50 shadow-sm"
          : "border-slate-200 bg-white hover:border-blue-300"
      }`}
    >
      <div className="flex items-start gap-4">
        <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-[#174A9B] text-xl font-black text-white">
          {(user.name || "T").charAt(0).toUpperCase()}
        </div>
        <div className="min-w-0 flex-1">
          <div className="flex items-start justify-between gap-3">
            <div>
              <h3 className="truncate text-lg font-black text-slate-900">
                {user.name || "Driving teacher"}
              </h3>
              <p className="mt-1 text-sm font-semibold text-slate-500">
                {teacher.experienceYears || 0} years experience
              </p>
            </div>
            <span className="rounded-full bg-white px-2.5 py-1 text-xs font-black text-[#174A9B] shadow-sm">
              {Number(teacher.distanceKm || 0).toFixed(1)} km
            </span>
          </div>

          <div className="mt-3 flex flex-wrap items-center gap-2 text-xs font-bold">
            <span className="inline-flex items-center gap-1 rounded-full bg-amber-50 px-2.5 py-1 text-amber-700">
              <FaStar /> {Number(teacher?.rating?.average || 0).toFixed(1)}
            </span>
            <span className="rounded-full bg-white px-2.5 py-1 text-slate-600">
              {matchingVehicle?.vehicleName || vehicleType}
            </span>
            <span className="rounded-full bg-white px-2.5 py-1 text-slate-600">
              €{Number(teacher.hourlyRate || 0).toFixed(0)}/hour
            </span>
          </div>

          <p className="mt-3 flex items-start gap-2 text-sm leading-5 text-slate-600">
            <FaMapMarkerAlt className="mt-0.5 shrink-0 text-[#174A9B]" />
            <span>
              {[location.address, location.city].filter(Boolean).join(", ") ||
                "Lesson meeting point"}
            </span>
          </p>
        </div>
      </div>
    </button>
  );
}

function VehicleSelector({ vehicles, selectedVehicleId, onSelect }) {
  return (
    <div>
      <div className="flex items-center gap-3">
        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-50 text-[#174A9B]">
          <FaCarSide />
        </div>
        <div>
          <h2 className="text-xl font-black text-slate-900">
            Choose exact vehicle
          </h2>
          <p className="text-sm text-slate-500">
            Only admin-approved and active vehicles are available.
          </p>
        </div>
      </div>

      {vehicles.length ? (
        <div className="mt-5 grid gap-3 sm:grid-cols-2">
          {vehicles.map((vehicle) => {
            const selected = String(vehicle._id) === String(selectedVehicleId);
            const details = [vehicle.brand, vehicle.model, vehicle.modelYear]
              .filter(Boolean)
              .join(" ");

            return (
              <button
                key={vehicle._id}
                type="button"
                onClick={() => onSelect(vehicle._id)}
                className={`overflow-hidden rounded-2xl border text-left transition ${
                  selected
                    ? "border-[#174A9B] bg-blue-50 ring-2 ring-blue-100"
                    : "border-slate-200 bg-white hover:border-blue-300"
                }`}
              >
                <div className="flex gap-3 p-3">
                  <div className="flex h-20 w-24 shrink-0 items-center justify-center overflow-hidden rounded-xl bg-slate-100 text-2xl text-slate-400">
                    {vehicle.vehicleImage ? (
                      <img
                        src={vehicle.vehicleImage}
                        alt={vehicle.vehicleName || "Teacher vehicle"}
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      <FaCarSide />
                    )}
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-start justify-between gap-2">
                      <h3 className="truncate font-black text-slate-900">
                        {vehicle.vehicleName || "Driving vehicle"}
                      </h3>
                      {selected && (
                        <span className="rounded-full bg-[#174A9B] px-2 py-1 text-[10px] font-black uppercase tracking-wide text-white">
                          Selected
                        </span>
                      )}
                    </div>
                    <p className="mt-1 text-xs font-semibold text-slate-500">
                      {details || "Vehicle details not added"}
                    </p>
                    <div className="mt-2 flex flex-wrap gap-1.5 text-[11px] font-black">
                      <span className="rounded-full bg-slate-100 px-2 py-1 capitalize text-slate-600">
                        {vehicle.vehicleType}
                      </span>
                      {vehicle.registrationNumber && (
                        <span className="rounded-full bg-emerald-50 px-2 py-1 text-emerald-700">
                          {vehicle.registrationNumber}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      ) : (
        <div className="mt-5 rounded-2xl border border-amber-200 bg-amber-50 p-4 text-sm font-semibold text-amber-800">
          This teacher has no admin-approved active{" "}
          <span className="capitalize">vehicle</span> for the selected type.
        </div>
      )}
    </div>
  );
}

function BookingSummary({
  teacher,
  vehicle,
  search,
  endTime,
  submitting,
  onSubmit,
}) {
  const location = teacher.nearestLocation || {};
  const price =
    (Number(teacher.hourlyRate || 0) * Number(search.duration || 0)) / 60;

  return (
    <aside className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
      <h2 className="text-xl font-black text-slate-900">Booking summary</h2>
      <div className="mt-5 space-y-3 text-sm">
        <SummaryRow label="Teacher" value={teacher.user?.name || "Teacher"} />
        <SummaryRow
          label="Vehicle"
          value={
            vehicle
              ? `${vehicle.vehicleName || "Vehicle"} (${vehicle.vehicleType})`
              : "Select a vehicle"
          }
        />
        {vehicle?.registrationNumber && (
          <SummaryRow label="Registration" value={vehicle.registrationNumber} />
        )}
        <SummaryRow label="Date" value={formatDate(search.date)} />
        <SummaryRow label="Time" value={`${search.startTime} - ${endTime}`} />
        <SummaryRow label="Duration" value={`${search.duration} minutes`} />
        <SummaryRow label="Distance" value={`${teacher.distanceKm} km`} />
        <SummaryRow
          label="Meeting point"
          value={[location.address, location.city].filter(Boolean).join(", ")}
        />
        <div className="border-t border-slate-200 pt-3">
          <SummaryRow
            label="Estimated total"
            value={`€${price.toFixed(2)}`}
            strong
          />
        </div>
      </div>
      <button
        type="button"
        onClick={onSubmit}
        disabled={submitting || !vehicle}
        className="mt-5 flex w-full items-center justify-center gap-2 rounded-2xl bg-[#174A9B] px-5 py-3.5 font-black text-white disabled:opacity-60"
      >
        <FaCalendarAlt /> {submitting ? "Submitting..." : "Request booking"}
      </button>
      <p className="mt-3 text-center text-xs leading-5 text-slate-500">
        The request stays pending until the teacher confirms it.
      </p>
    </aside>
  );
}

function BookingCard({ booking, cancelling, onCancel }) {
  const canCancel = ["pending", "confirmed"].includes(booking.status);
  const vehicle = booking.teacherVehicle || booking.vehicleSnapshot || {};
  const vehicleLabel = vehicle.vehicleName
    ? `${vehicle.vehicleName} (${vehicle.vehicleType || booking.vehicleType})`
    : booking.vehicleType;
  return (
    <article className="rounded-2xl border border-slate-200 p-4">
      <div className="flex items-start justify-between gap-3">
        <div>
          <h3 className="font-black text-slate-900">
            {booking.teacher?.name || "Driving teacher"}
          </h3>
          <p className="mt-1 text-sm text-slate-500">
            {formatDate(booking.bookingDate)} · {booking.startTime} -{" "}
            {booking.endTime}
          </p>
        </div>
        <span
          className={`rounded-full px-2.5 py-1 text-xs font-black capitalize ${statusClass(
            booking.status,
          )}`}
        >
          {booking.status}
        </span>
      </div>

      <div className="mt-4 grid grid-cols-2 gap-3 text-sm">
        <MiniInfo icon={<FaCarSide />} label="Vehicle" value={vehicleLabel} />
        <MiniInfo
          icon={<FaClock />}
          label="Duration"
          value={`${booking.duration} min`}
        />
      </div>

      <p className="mt-4 flex gap-2 text-sm leading-5 text-slate-600">
        <FaMapMarkerAlt className="mt-0.5 shrink-0 text-[#174A9B]" />
        {[booking.location?.address, booking.location?.city]
          .filter(Boolean)
          .join(", ") || "Location not set"}
      </p>

      {canCancel && (
        <button
          type="button"
          onClick={onCancel}
          disabled={cancelling}
          className="mt-4 inline-flex items-center gap-2 rounded-xl bg-red-50 px-4 py-2 text-sm font-black text-red-700 disabled:opacity-60"
        >
          <FaTimesCircle /> {cancelling ? "Cancelling..." : "Cancel request"}
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
        className="w-full rounded-2xl border border-slate-200 px-4 py-3 outline-none focus:border-[#174A9B] focus:ring-4 focus:ring-blue-100"
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
        className="w-full rounded-2xl border border-slate-200 px-4 py-3 outline-none focus:border-[#174A9B] focus:ring-4 focus:ring-blue-100"
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
    <div className="flex items-start justify-between gap-4">
      <span className="text-slate-500">{label}</span>
      <span
        className={`max-w-[210px] text-right capitalize ${
          strong
            ? "text-lg font-black text-[#174A9B]"
            : "font-bold text-slate-800"
        }`}
      >
        {value || "--"}
      </span>
    </div>
  );
}

function MiniInfo({ icon, label, value }) {
  return (
    <div className="rounded-xl bg-slate-50 p-3">
      <div className="flex items-center gap-2 text-xs font-bold text-slate-500">
        <span className="text-[#174A9B]">{icon}</span>
        {label}
      </div>
      <p className="mt-1 font-black capitalize text-slate-800">{value}</p>
    </div>
  );
}
