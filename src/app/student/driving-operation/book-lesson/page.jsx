"use client";

import GooglePlaceAutocomplete from "@/components/maps/GooglePlaceAutocomplete";
import {
  GoogleMap,
  MarkerF,
  OverlayView,
  OverlayViewF,
  useJsApiLoader,
} from "@react-google-maps/api";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import {
  FaCarSide,
  FaChevronDown,
  FaChevronUp,
  FaClock,
  FaHeart,
  FaMapMarkerAlt,
  FaRegHeart,
  FaStar,
} from "react-icons/fa";
import { IoChevronBack } from "react-icons/io5";

import {
  addFavoriteTeacher,
  createLocationBooking,
  getAvailableBookingSlots,
  getMyFavoriteTeachers,
  getNearbyTeachers,
  getTeacherReviews,
  removeFavoriteTeacher,
} from "@/features/API";
import { mediaUrl } from "@/utils/mediaUrl";

const MAP_LIBRARIES = ["places"];
const DEFAULT_CENTER = { lat: 48.8566, lng: 2.3522 };
const MAP_OPTIONS = {
  disableDefaultUI: true,
  zoomControl: true,
  clickableIcons: false,
};

const unwrap = (response, fallback = null) =>
  response?.data?.data ?? response?.data ?? fallback;

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

const dateKey = (date) => {
  const offset = date.getTimezoneOffset();
  return new Date(date.getTime() - offset * 60000).toISOString().slice(0, 10);
};

const futureDates = (count = 7) =>
  Array.from({ length: count }, (_, index) => {
    const date = new Date();
    date.setDate(date.getDate() + index);
    return dateKey(date);
  });

const formatDate = (value) =>
  new Intl.DateTimeFormat("en-GB", {
    weekday: "long",
    month: "long",
    day: "2-digit",
  }).format(new Date(`${value}T12:00:00`));

const formatBookingDate = (value) =>
  new Intl.DateTimeFormat("en-GB", {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
  }).format(new Date(value));

const teacherName = (teacher) =>
  teacher?.user?.name || teacher?.user?.fullName || "Driving Instructor";

const vehicleFor = (teacher, type) => {
  const vehicles = (teacher?.vehicles || []).filter(
    (vehicle) => vehicle.vehicleType === type,
  );
  return vehicles.find((vehicle) => vehicle.isDefault) || vehicles[0] || null;
};

function BackHeader({ onBack }) {
  return (
    <header className="mb-4 flex items-center gap-3 sm:mb-7 sm:gap-4">
      <button
        type="button"
        onClick={onBack}
        className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#eef2f8] sm:h-11 sm:w-11"
      >
        <IoChevronBack size={22} />
      </button>
      <h1 className="text-xl font-bold text-[#123f88] sm:text-[24px]">
        Book Lesson
      </h1>
    </header>
  );
}

function Notice({ error }) {
  if (!error) return null;
  return (
    <div className="mb-5 rounded-xl border border-red-200 bg-red-50 p-4 text-sm font-semibold text-red-700">
      {error}
    </div>
  );
}

function Avatar({ teacher, className = "h-12 w-12" }) {
  return teacher?.user?.avatar ? (
    <img
      src={mediaUrl(teacher.user.avatar)}
      alt={teacherName(teacher)}
      className={`${className} rounded-full object-cover`}
    />
  ) : (
    <div
      className={`${className} flex items-center justify-center rounded-full bg-[#dbe7f7] text-lg font-black text-[#123f88]`}
    >
      {teacherName(teacher).charAt(0)}
    </div>
  );
}

function RatingStars({ value = 0, className = "" }) {
  const rating = Math.max(0, Math.min(5, Number(value) || 0));
  return (
    <div className={`flex items-center gap-1 text-amber-400 ${className}`}>
      {Array.from({ length: 5 }).map((_, index) => (
        <FaStar
          key={index}
          className={index < Math.round(rating) ? "" : "text-slate-300"}
        />
      ))}
    </div>
  );
}

export default function BookLessonPage() {
  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY?.trim();
  const { isLoaded, loadError } = useJsApiLoader({
    id: "permisgo-booking-map",
    googleMapsApiKey: apiKey || "",
    libraries: MAP_LIBRARIES,
    language: "en",
    region: "FR",
  });

  if (!apiKey) return <MapMessage text="Google Maps key is missing." />;
  if (loadError) return <MapMessage text="Google Maps could not be loaded." />;
  if (!isLoaded) return <MapMessage text="Loading booking map..." />;
  return <BookingFlow />;
}

function MapMessage({ text }) {
  return (
    <main className="min-h-screen bg-white p-6">
      <div className="rounded-xl bg-[#e8eef7] p-10 text-center font-semibold text-[#123f88]">
        {text}
      </div>
    </main>
  );
}

function BookingFlow() {
  const router = useRouter();
  const mapRef = useRef(null);
  const [step, setStep] = useState("map");
  const [search, setSearch] = useState({
    address: "",
    placeId: "",
    lat: DEFAULT_CENTER.lat,
    lng: DEFAULT_CENTER.lng,
  });
  const [vehicleType, setVehicleType] = useState("manual");
  const [teachers, setTeachers] = useState([]);
  const [selectedTeacher, setSelectedTeacher] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [favorite, setFavorite] = useState(false);
  const [favoriteTeacherIds, setFavoriteTeacherIds] = useState(new Set());
  const [savingFavorite, setSavingFavorite] = useState(false);
  const [duration, setDuration] = useState(60);
  const [schedule, setSchedule] = useState([]);
  const [openDate, setOpenDate] = useState("");
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [loadingTeachers, setLoadingTeachers] = useState(false);
  const [loadingSchedule, setLoadingSchedule] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [confirmation, setConfirmation] = useState(null);
  const [error, setError] = useState("");
  const [requestedTeacherId, setRequestedTeacherId] = useState("");

  useEffect(() => {
    setRequestedTeacherId(
      new URLSearchParams(window.location.search).get("teacherId") || "",
    );
  }, []);

  useEffect(() => {
    if (!requestedTeacherId || !teachers.length) return;
    const requestedTeacher = teachers.find(
      (teacher) => String(teacher.user?._id) === requestedTeacherId,
    );
    if (requestedTeacher) {
      setSelectedTeacher(requestedTeacher);
      setStep("teacher");
    }
  }, [requestedTeacherId, teachers]);

  const center = useMemo(
    () => ({ lat: Number(search.lat), lng: Number(search.lng) }),
    [search.lat, search.lng],
  );

  const loadTeachers = useCallback(async (location, type) => {
    setLoadingTeachers(true);
    setError("");
    try {
      const response = await getNearbyTeachers({
        lat: location.lat,
        lng: location.lng,
        radius: 20,
        vehicleType: type,
      });
      const list = unwrap(response, []);
      setTeachers(Array.isArray(list) ? list : []);
      setSelectedTeacher(null);
    } catch (requestError) {
      setTeachers([]);
      setError(
        requestError.response?.data?.message ||
          "Nearby instructors could not be loaded.",
      );
    } finally {
      setLoadingTeachers(false);
    }
  }, []);

  useEffect(() => {
    loadTeachers(search, vehicleType);
  }, [vehicleType]); // Search location changes are handled by place selection.

  useEffect(() => {
    getMyFavoriteTeachers()
      .then((response) => {
        const list = unwrap(response, []);
        setFavoriteTeacherIds(
          new Set(
            (Array.isArray(list) ? list : [])
              .map((item) => String(item.user?._id))
              .filter(Boolean),
          ),
        );
      })
      .catch(() => setFavoriteTeacherIds(new Set()));
  }, []);

  const selectPlace = (place) => {
    const location = {
      address: place.address,
      placeId: place.placeId,
      lat: place.lat,
      lng: place.lng,
    };
    setSearch(location);
    mapRef.current?.panTo({ lat: place.lat, lng: place.lng });
    mapRef.current?.setZoom(13);
    loadTeachers(location, vehicleType);
  };

  const openTeacher = async (teacher) => {
    setSelectedTeacher(teacher);
    setFavorite(favoriteTeacherIds.has(String(teacher.user._id)));
    setError("");
    setReviews([]);
    try {
      const response = await getTeacherReviews(teacher.user._id);
      const loadedReviews = unwrap(response, []);
      setReviews(loadedReviews);
      const average = loadedReviews.length
        ? loadedReviews.reduce(
            (total, review) => total + Number(review.rating || 0),
            0,
          ) / loadedReviews.length
        : 0;
      setSelectedTeacher((current) => ({
        ...current,
        rating: { average, totalReviews: loadedReviews.length },
      }));
    } catch {
      setReviews([]);
    }
    setStep("teacher");
  };

  const toggleFavorite = async () => {
    const teacherId = selectedTeacher?.user?._id;
    if (!teacherId || savingFavorite) return;
    setSavingFavorite(true);
    setError("");
    try {
      if (favorite) await removeFavoriteTeacher(teacherId);
      else await addFavoriteTeacher(teacherId);
      const nextFavorite = !favorite;
      setFavorite(nextFavorite);
      setFavoriteTeacherIds((current) => {
        const next = new Set(current);
        if (nextFavorite) next.add(String(teacherId));
        else next.delete(String(teacherId));
        return next;
      });
    } catch (requestError) {
      setError(
        requestError.response?.data?.message ||
          "Favorite teacher could not be updated.",
      );
    } finally {
      setSavingFavorite(false);
    }
  };

  const loadSchedule = useCallback(async () => {
    if (!selectedTeacher?.user?._id) return;
    setLoadingSchedule(true);
    setError("");
    setSelectedSlot(null);
    try {
      const dates = futureDates(7);
      const responses = await Promise.all(
        dates.map((date) =>
          getAvailableBookingSlots({
            teacher: selectedTeacher.user._id,
            date,
            duration,
          }).catch(() => null),
        ),
      );
      const rows = dates.map((date, index) => ({
        date,
        slots: unwrap(responses[index], {})?.availableSlots || [],
      }));
      setSchedule(rows);
      setOpenDate(
        rows.find((row) => row.slots.length)?.date || rows[0]?.date || "",
      );
    } finally {
      setLoadingSchedule(false);
    }
  }, [duration, selectedTeacher]);

  useEffect(() => {
    if (step === "schedule") loadSchedule();
  }, [loadSchedule, step]);

  const book = async () => {
    const location = selectedTeacher?.nearestLocation;
    const vehicle = vehicleFor(selectedTeacher, vehicleType);
    if (!selectedSlot || !location?._id || !vehicle?._id) {
      setError("Select an available lesson time.");
      return;
    }

    setSubmitting(true);
    setError("");
    try {
      const response = await createLocationBooking({
        teacher: selectedTeacher.user._id,
        locationId: location._id,
        teacherVehicleId: vehicle._id,
        vehicleType,
        bookingDate: selectedSlot.date,
        startTime: selectedSlot.startTime,
        endTime: selectedSlot.endTime,
        meetingPreference: "teacher_location",
        studentLocation: search,
      });
      const booking = unwrap(response, null);
      setConfirmation(booking);
      setStep("confirmation");
    } catch (requestError) {
      setError(
        requestError.response?.data?.message ||
          "This slot could not be booked. Please choose another one.",
      );
      await loadSchedule();
    } finally {
      setSubmitting(false);
    }
  };

  const back = () => {
    setError("");
    if (step === "confirmation")
      return router.push("/student/lessons?tab=upcoming");
    if (step === "schedule") return setStep("teacher");
    if (step === "teacher") return setStep("map");
    router.back();
  };

  return (
    <main className="min-h-screen overflow-x-hidden bg-white px-2 py-4 pb-24 sm:px-6 sm:py-6 sm:pb-8">
      <BackHeader onBack={back} />
      <Notice error={error} />
      {step === "map" && (
        <MapStep
          search={search}
          selectPlace={selectPlace}
          vehicleType={vehicleType}
          setVehicleType={setVehicleType}
          teachers={teachers}
          selectedTeacher={selectedTeacher}
          setSelectedTeacher={setSelectedTeacher}
          openTeacher={openTeacher}
          loading={loadingTeachers}
          center={center}
          mapRef={mapRef}
          onLocationError={setError}
        />
      )}
      {step === "teacher" && (
        <TeacherStep
          teacher={selectedTeacher}
          reviews={reviews}
          favorite={favorite}
          toggleFavorite={toggleFavorite}
          savingFavorite={savingFavorite}
          vehicleType={vehicleType}
          onSlots={() => setStep("schedule")}
        />
      )}
      {step === "schedule" && (
        <ScheduleStep
          teacher={selectedTeacher}
          duration={duration}
          setDuration={setDuration}
          schedule={schedule}
          loading={loadingSchedule}
          openDate={openDate}
          setOpenDate={setOpenDate}
          selectedSlot={selectedSlot}
          setSelectedSlot={setSelectedSlot}
          submitting={submitting}
          book={book}
        />
      )}
      {step === "confirmation" && (
        <ConfirmationStep
          booking={confirmation}
          teacher={selectedTeacher}
          router={router}
        />
      )}
    </main>
  );
}

function MapStep({
  search,
  selectPlace,
  vehicleType,
  setVehicleType,
  teachers,
  selectedTeacher,
  setSelectedTeacher,
  openTeacher,
  loading,
  center,
  mapRef,
  onLocationError,
}) {
  return (
    <section className="rounded-xl bg-[#e8eef7] p-2.5 sm:p-5">
      <div className="relative z-20 mb-3 grid gap-3 sm:mb-4 lg:grid-cols-[310px_1fr] lg:gap-4">
        <div className="min-w-0 max-w-full overflow-visible">
          <GooglePlaceAutocomplete
            value={search.address}
            placeholder="Search a location"
            onPlaceSelect={selectPlace}
            onError={onLocationError}
          />
        </div>
        <div className="flex min-w-0 justify-stretch sm:justify-end">
          <div className="grid w-full grid-cols-2 rounded-full bg-white p-1 sm:inline-flex sm:w-auto">
            {["manual", "automatic"].map((type) => (
              <button
                key={type}
                type="button"
                onClick={() => setVehicleType(type)}
                className={`min-w-0 rounded-full px-2 py-2 text-[11px] font-bold capitalize sm:px-5 sm:text-xs ${vehicleType === type ? "bg-[#16499a] text-white" : "text-slate-700"}`}
              >
                {type} transmission
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="grid overflow-hidden rounded-xl lg:min-h-[620px] lg:grid-cols-[310px_1fr]">
        <aside className="order-2 max-h-[340px] space-y-2 overflow-y-auto bg-[#eef2f8] p-2.5 sm:max-h-[420px] sm:space-y-3 sm:p-3 lg:order-1 lg:max-h-[620px]">
          <p className="px-1 text-xs text-slate-500">
            The {teachers.length} closest meeting points to this address
          </p>
          {loading ? (
            Array.from({ length: 5 }).map((_, index) => (
              <div
                key={index}
                className="h-24 animate-pulse rounded-xl bg-white"
              />
            ))
          ) : teachers.length ? (
            teachers.map((teacher) => {
              const location = teacher.nearestLocation;
              const vehicle = vehicleFor(teacher, vehicleType);
              return (
                <button
                  key={teacher.user._id}
                  type="button"
                  onClick={() => {
                    setSelectedTeacher(teacher);
                    const point = teacherPoint(teacher);
                    if (point) {
                      mapRef.current?.panTo(point);
                      mapRef.current?.setZoom(14);
                      window.setTimeout(() => mapRef.current?.panBy(0, -45), 0);
                    }
                  }}
                  className="w-full rounded-xl bg-white p-3 text-left shadow-sm transition hover:ring-2 hover:ring-[#174a9b] sm:p-4"
                >
                  <p className="flex items-center gap-2 text-sm font-bold">
                    <FaMapMarkerAlt className="text-[#174a9b]" />
                    {location?.title || location?.address || "Meeting point"}
                  </p>
                  <p className="ml-5 mt-1 text-xs text-slate-500">
                    {teacher.distanceKm || 0} km
                  </p>
                  <div className="mt-3 flex items-center gap-2 border-t border-slate-100 pt-3">
                    <Avatar teacher={teacher} className="h-8 w-8" />
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-xs font-bold text-[#123f88]">
                        {teacherName(teacher)}
                      </p>
                      <p className="truncate text-[10px] text-slate-500">
                        {[vehicle?.brand, vehicle?.model]
                          .filter(Boolean)
                          .join(" ") || `${vehicleType} vehicle`}
                      </p>
                    </div>
                    <span className="rounded bg-[#e7edf6] px-2 py-1 text-[10px] font-bold text-[#174a9b]">
                      Details
                    </span>
                  </div>
                </button>
              );
            })
          ) : (
            <div className="rounded-xl bg-white p-6 text-center text-sm text-slate-500">
              No available instructor found near this location.
            </div>
          )}
        </aside>

        <div className="relative order-1 h-[330px] min-w-0 sm:h-[420px] lg:order-2 lg:h-auto lg:min-h-[500px]">
          <GoogleMap
            mapContainerStyle={{ width: "100%", height: "100%" }}
            center={center}
            zoom={12}
            options={MAP_OPTIONS}
            onLoad={(map) => {
              mapRef.current = map;
            }}
          >
            {teachers.map((teacher) => {
              const position = teacherPoint(teacher);
              return position ? (
                <MarkerF
                  key={teacher.user._id}
                  position={position}
                  onClick={() => {
                    setSelectedTeacher(teacher);
                    mapRef.current?.panTo(position);
                    window.setTimeout(() => mapRef.current?.panBy(0, -45), 0);
                  }}
                />
              ) : null;
            })}
            {selectedTeacher && teacherPoint(selectedTeacher) && (
              <OverlayViewF
                position={teacherPoint(selectedTeacher)}
                mapPaneName={OverlayView.FLOAT_PANE}
                getPixelPositionOffset={(width, height) => ({
                  x: -(width / 2),
                  y: -(height + 42),
                })}
              >
                <div className="relative w-[180px] overflow-hidden rounded-lg border border-[#174a9b] bg-white p-2 text-slate-900 shadow-xl sm:w-[270px] sm:rounded-xl sm:border-2 sm:p-4 sm:shadow-2xl">
                  <button
                    type="button"
                    onClick={() => setSelectedTeacher(null)}
                    aria-label="Close teacher details"
                    className="absolute right-1.5 top-1.5 z-10 flex h-5 w-5 items-center justify-center rounded-full bg-slate-100 text-sm leading-none text-slate-600 hover:bg-slate-200 sm:right-2 sm:top-2 sm:h-7 sm:w-7 sm:text-lg"
                  >
                    ×
                  </button>
                  <div className="flex min-w-0 items-center gap-1.5 pr-5 sm:gap-3 sm:pr-7">
                    <Avatar
                      teacher={selectedTeacher}
                      className="h-7 w-7 sm:h-12 sm:w-12"
                    />
                    <div className="min-w-0 flex-1">
                      <h3 className="truncate text-[10px] font-bold leading-3 text-[#123f88] sm:text-base sm:leading-normal">
                        {teacherName(selectedTeacher)}
                      </h3>
                      <p className="truncate text-[7px] leading-3 text-slate-500 sm:text-xs sm:leading-normal">
                        Experience {selectedTeacher.experienceYears || 0} Years
                      </p>
                    </div>
                  </div>
                  <div className="mt-1 flex items-center justify-between gap-1 sm:mt-2 sm:gap-2">
                    <RatingStars
                      value={selectedTeacher.rating?.average}
                      className="gap-px text-[8px] sm:gap-1 sm:text-sm"
                    />
                    <span className="shrink-0 text-[7px] text-slate-500 sm:text-[10px]">
                      {selectedTeacher.rating?.totalReviews || 0} reviews
                    </span>
                  </div>
                  <dl className="mt-1 space-y-1 rounded bg-[#eef2f8] p-1.5 text-[8px] leading-3 text-slate-600 sm:mt-2 sm:space-y-1.5 sm:rounded-md sm:p-2 sm:text-[10px] sm:leading-4">
                    <div className="grid grid-cols-[58px_minmax(0,1fr)] items-start gap-1 sm:grid-cols-[76px_minmax(0,1fr)]">
                      <dt className="font-bold">Meeting point:</dt>
                      <dd className="min-w-0 break-words">
                        {selectedTeacher.nearestLocation?.title ||
                          selectedTeacher.nearestLocation?.address ||
                          "Not provided"}
                      </dd>
                    </div>
                    <div className="grid grid-cols-[58px_minmax(0,1fr)] items-start gap-1 sm:grid-cols-[76px_minmax(0,1fr)]">
                      <dt className="font-bold">Vehicle:</dt>
                      <dd className="min-w-0 break-words">
                        {[
                          vehicleFor(selectedTeacher, vehicleType)?.brand,
                          vehicleFor(selectedTeacher, vehicleType)?.model,
                        ]
                          .filter(Boolean)
                          .join(" ") || "Not provided"}
                      </dd>
                    </div>
                    <div className="grid grid-cols-[58px_minmax(0,1fr)] items-start gap-1 sm:grid-cols-[76px_minmax(0,1fr)]">
                      <dt className="font-bold">Transmission:</dt>
                      <dd className="min-w-0 break-words capitalize">
                        {vehicleType}
                      </dd>
                    </div>
                  </dl>
                  <button
                    type="button"
                    onClick={() => openTeacher(selectedTeacher)}
                    className="mt-1.5 w-full rounded bg-[#df2339] py-1.5 text-[8px] font-bold text-white sm:mt-2.5 sm:rounded-md sm:py-2 sm:text-xs"
                  >
                    View Details
                  </button>
                  <span className="absolute -bottom-2 left-1/2 h-4 w-4 -translate-x-1/2 rotate-45 border-b-2 border-r-2 border-[#174a9b] bg-white" />
                </div>
              </OverlayViewF>
            )}
          </GoogleMap>
        </div>
      </div>
    </section>
  );
}

function TeacherStep({
  teacher,
  reviews,
  favorite,
  toggleFavorite,
  savingFavorite,
  vehicleType,
  onSlots,
}) {
  const location = teacher.nearestLocation;
  const vehicle = vehicleFor(teacher, vehicleType);
  const rating = Number(teacher.rating?.average || 0);
  const [showAllReviews, setShowAllReviews] = useState(false);
  const visibleReviews = showAllReviews ? reviews : reviews.slice(0, 4);
  return (
    <section className="rounded-xl bg-[#e8eef7] p-2.5 sm:p-4">
      <div className="grid gap-3 lg:grid-cols-[290px_minmax(0,1fr)]">
        <div>
          <div className="rounded-xl bg-[#174a9b] p-3 text-white">
            <div className="relative rounded-lg bg-white px-4 py-3 text-center text-[#123f88]">
              <button
                type="button"
                onClick={toggleFavorite}
                disabled={savingFavorite}
                aria-label={
                  favorite ? "Remove favorite teacher" : "Add favorite teacher"
                }
                title={favorite ? "Remove from favorites" : "Add to favorites"}
                className="absolute right-4 top-4 text-xl text-slate-800 disabled:opacity-50"
              >
                {favorite ? (
                  <FaHeart className="text-red-500" />
                ) : (
                  <FaRegHeart />
                )}
              </button>
              <Avatar teacher={teacher} className="mx-auto h-11 w-11" />
              <h2 className="mt-1 text-sm font-bold">{teacherName(teacher)}</h2>
            </div>
            <div className="mt-2 grid grid-cols-2 gap-2">
              <div className="rounded-lg bg-white/15 p-3 text-center">
                <p className="text-sm font-bold">
                  <FaStar className="mr-1 inline" />
                  {rating.toFixed(2)}
                </p>
                <p className="mt-1 text-[10px] leading-4">
                  Ratings based on
                  <br />
                  {teacher.rating?.totalReviews || 0} reviews
                </p>
              </div>
              <div className="rounded-lg bg-white/15 p-3 text-center">
                <p className="text-sm font-bold">
                  {Number(teacher.hoursWorked || 0).toLocaleString()}
                </p>
                <p className="mt-1 text-[10px] leading-4">Hours worked</p>
              </div>
            </div>
            <div className="mt-2 rounded-lg bg-white p-3 text-xs text-slate-800">
              <FaMapMarkerAlt className="mr-2 inline text-slate-500" />
              <b>Meeting point</b>
              <p className="mt-1 text-[10px] text-slate-500">
                {location?.address || location?.title || "Address unavailable"}
              </p>
            </div>
            <div className="mt-2 rounded-lg bg-white p-3 text-xs text-slate-800">
              <FaCarSide className="mr-2 inline text-slate-500" />
              <b>Vehicle</b>
              <p className="mt-1 text-[10px] capitalize text-slate-500">
                {vehicleType} transmission (
                {[vehicle?.brand, vehicle?.model].filter(Boolean).join(" ") ||
                  vehicle?.vehicleName ||
                  "vehicle unavailable"}
                )
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onSlots}
            className="mt-3 w-full rounded-lg bg-[#df2339] px-4 py-3 text-xs font-bold text-white sm:w-auto sm:py-2.5"
          >
            View Available Slot
          </button>
        </div>

        <div className="rounded-xl bg-[#e3e9f3] p-3 sm:p-4">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-lg font-bold text-[#123f88]">
              Clients’ Review
            </h2>
            {reviews.length > 4 && (
              <button
                type="button"
                onClick={() => setShowAllReviews(!showAllReviews)}
                className="text-[10px] font-bold text-[#123f88] underline"
              >
                {showAllReviews ? "Show Less" : "See All"}
              </button>
            )}
          </div>
          {reviews.length ? (
            <div className="grid gap-3 sm:grid-cols-2">
              {visibleReviews.map((review) => (
                <article key={review._id} className="rounded-xl bg-white p-4">
                  <p className="min-h-[48px] text-xs leading-5 text-slate-700">
                    {review.comment || "The student rated this instructor."}
                  </p>
                  <RatingStars value={review.rating} className="mt-3 text-sm" />
                  <div className="mt-3 flex items-center gap-2">
                    {review.student?.avatar ? (
                      <img
                        src={mediaUrl(review.student.avatar)}
                        alt=""
                        className="h-8 w-8 rounded-full object-cover"
                      />
                    ) : (
                      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#dbe7f7] text-xs font-bold text-[#123f88]">
                        {review.student?.name?.charAt(0) || "S"}
                      </div>
                    )}
                    <div>
                      <p className="text-xs font-bold">
                        {review.student?.name || "Student"}
                      </p>
                      <p className="text-[10px] text-slate-500">
                        Learner driver
                      </p>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          ) : (
            <div className="rounded-xl bg-white p-10 text-center text-sm text-slate-500">
              No client review yet.
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

function ScheduleStep({
  teacher,
  duration,
  setDuration,
  schedule,
  loading,
  openDate,
  setOpenDate,
  selectedSlot,
  setSelectedSlot,
  submitting,
  book,
}) {
  return (
    <section className="flex min-h-[520px] items-start justify-center rounded-xl bg-[#e8eef7] p-2.5 sm:min-h-[620px] sm:items-center sm:p-8">
      <div className="w-full max-w-[430px]">
        <div className="rounded-xl bg-white p-3.5 sm:p-5">
          <div className="rounded-xl bg-[#174a9b] p-4 text-center text-white sm:p-5">
            <Avatar
              teacher={teacher}
              className="mx-auto h-12 w-12 sm:h-14 sm:w-14"
            />
            <h2 className="mt-2 font-bold">{teacherName(teacher)}</h2>
            <p className="mt-1 text-xs">Book a lesson</p>
          </div>
          <h3 className="mt-5 text-sm font-bold text-[#123f88]">
            Choose the duration
          </h3>
          <p className="mt-3 rounded-xl border border-[#174a9b] bg-[#eef2f8] p-4 text-xs leading-6 text-slate-600">
            For your first lesson with this instructor, we recommend a one-hour
            session. This allows us to properly assess your level and
            personalize your future lessons.
          </p>
          <div className="mt-3 flex gap-2">
            {[60, 120].map((value) => (
              <button
                key={value}
                type="button"
                onClick={() => setDuration(value)}
                className={`rounded-full px-4 py-2 text-xs font-bold ${duration === value ? "bg-[#174a9b] text-white" : "bg-[#eef2f8]"}`}
              >
                {value / 60} hour{value > 60 ? "s" : ""}
              </button>
            ))}
          </div>
          <h3 className="mt-5 text-sm font-bold text-[#123f88]">
            Choose the Date
          </h3>
          <div className="mt-3 space-y-3">
            {loading
              ? Array.from({ length: 3 }).map((_, index) => (
                  <div
                    key={index}
                    className="h-14 animate-pulse rounded-xl bg-[#eef2f8]"
                  />
                ))
              : schedule.slice(0, 4).map((row) => (
                  <div
                    key={row.date}
                    className="overflow-hidden rounded-xl bg-[#eef2f8]"
                  >
                    <button
                      type="button"
                      onClick={() =>
                        setOpenDate(openDate === row.date ? "" : row.date)
                      }
                      className="flex w-full items-center justify-between p-4 text-left text-sm font-semibold"
                    >
                      <span>{formatDate(row.date)}</span>
                      {openDate === row.date ? (
                        <FaChevronUp />
                      ) : (
                        <FaChevronDown />
                      )}
                    </button>
                    {openDate === row.date && (
                      <div className="flex flex-wrap gap-2 px-4 pb-4">
                        {row.slots.length ? (
                          row.slots.slice(0, 8).map((slot) => {
                            const active =
                              selectedSlot?.date === row.date &&
                              selectedSlot?.startTime === slot.startTime;
                            return (
                              <button
                                key={slot.startTime}
                                type="button"
                                onClick={() =>
                                  setSelectedSlot({ ...slot, date: row.date })
                                }
                                className={`rounded-full border px-4 py-2 text-xs font-bold ${active ? "border-[#174a9b] bg-[#174a9b] text-white" : "border-slate-300 bg-white"}`}
                              >
                                {slot.startTime}
                              </button>
                            );
                          })
                        ) : (
                          <p className="text-xs text-slate-500">
                            No available slots.
                          </p>
                        )}
                      </div>
                    )}
                  </div>
                ))}
          </div>
        </div>
        <button
          type="button"
          disabled={!selectedSlot || submitting}
          onClick={book}
          className="mt-4 w-full rounded-lg bg-[#df2339] py-3 text-sm font-bold text-white disabled:cursor-not-allowed disabled:opacity-50"
        >
          {submitting ? "Booking..." : "Book Now"}
        </button>
      </div>
    </section>
  );
}

function ConfirmationStep({ booking, teacher, router }) {
  return (
    <section className="flex min-h-[440px] items-start justify-center rounded-xl bg-[#e8eef7] p-3 pt-8 sm:min-h-[500px] sm:p-6 sm:pt-16">
      <div className="w-full max-w-[390px] rounded-xl bg-white p-4 sm:p-5">
        <h2 className="font-bold text-[#123f88]">Confirmation Message</h2>
        <div className="mt-4 rounded-xl border border-green-400 bg-green-50 p-4 text-sm leading-6 text-slate-600">
          Your {booking?.duration ? `${booking.duration / 60}-hour` : "driving"}{" "}
          lesson with Mr. {teacherName(teacher)} has been successfully booked
          for{" "}
          {booking?.bookingDate
            ? formatBookingDate(booking.bookingDate)
            : "the selected date"}{" "}
          at {booking?.startTime}. Your lesson is confirmed.
        </div>
        <button
          type="button"
          onClick={() => router.push("/student/lessons")}
          className="mt-4 w-full rounded-lg border border-[#174a9b] bg-white py-3 text-sm font-bold text-[#df2339]"
        >
          Go to My Lessons
        </button>
        <p className="mt-3 text-center text-xs text-slate-500">
          <FaClock className="mr-1 inline" />
          Students cannot cancel a confirmed booking.
        </p>
      </div>
    </section>
  );
}
