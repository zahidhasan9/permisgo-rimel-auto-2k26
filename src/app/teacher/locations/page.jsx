"use client";

import {
  Autocomplete,
  GoogleMap,
  MarkerF,
  useJsApiLoader,
} from "@react-google-maps/api";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
  FaCalendarAlt,
  FaClock,
  FaEdit,
  FaLocationArrow,
  FaMapMarkerAlt,
  FaPlus,
  FaSave,
  FaTrash,
} from "react-icons/fa";
import {
  createTeacherLocation,
  deleteTeacherLocation,
  getTeacherAvailability,
  getTeacherLocations,
  updateTeacherAvailability,
  updateTeacherLocation,
} from "@/features/API";

const MAP_LIBRARIES = ["places"];
const MAP_CONTAINER_STYLE = { width: "100%", height: "420px" };
const DEFAULT_CENTER = { lat: 48.8566, lng: 2.3522 };
const DAYS = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

const EMPTY_LOCATION = {
  id: "",
  title: "Lesson meeting point",
  address: "",
  city: "",
  postalCode: "",
  placeId: "",
  lat: null,
  lng: null,
  serviceRadiusKm: 10,
  meetingType: "teacher_location",
  status: "active",
};

const defaultSchedule = () =>
  DAYS.map((_, dayOfWeek) => ({
    dayOfWeek,
    enabled: dayOfWeek >= 1 && dayOfWeek <= 5,
    startTime: "09:00",
    endTime: "18:00",
  }));

const unwrap = (response, fallback = null) =>
  response?.data?.data ?? response?.data ?? fallback;

const errorMessage = (error, fallback) =>
  error?.response?.data?.message || error?.message || fallback;

const getAddressPart = (components = [], type) =>
  components.find((component) => component.types?.includes(type))?.long_name ||
  "";

const hasCoordinate = (value) =>
  value !== null && value !== "" && Number.isFinite(Number(value));

const locationToForm = (location) => ({
  id: location?._id || "",
  title: location?.title || "Lesson meeting point",
  address: location?.address || "",
  city: location?.city || "",
  postalCode: location?.postalCode || "",
  placeId: location?.placeId || "",
  lat: Number(
    location?.coordinates?.lat ?? location?.geoLocation?.coordinates?.[1],
  ),
  lng: Number(
    location?.coordinates?.lng ?? location?.geoLocation?.coordinates?.[0],
  ),
  serviceRadiusKm: Number(location?.serviceRadiusKm || 10),
  meetingType: location?.meetingType || "teacher_location",
  status: location?.status || "active",
});

function MissingGoogleKey() {
  return (
    <div className="mx-auto max-w-4xl p-6">
      <div className="rounded-3xl border border-amber-200 bg-amber-50 p-6 text-amber-900">
        <h1 className="text-2xl font-black">Google Maps key is missing</h1>
        <p className="mt-2 text-sm leading-6">
          Add <code>NEXT_PUBLIC_GOOGLE_MAPS_API_KEY</code> to your frontend
          <code> .env.local</code>, restart Next.js, and open this page again.
        </p>
      </div>
    </div>
  );
}

export default function TeacherLocationsPage() {
  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;
  if (!apiKey) return <MissingGoogleKey />;
  return <TeacherLocationsManager apiKey={apiKey} />;
}

function TeacherLocationsManager({ apiKey }) {
  const { isLoaded, loadError } = useJsApiLoader({
    id: "permisgo-google-map",
    googleMapsApiKey: apiKey,
    libraries: MAP_LIBRARIES,
  });

  const autocompleteRef = useRef(null);
  const mapRef = useRef(null);
  const [locations, setLocations] = useState([]);
  const [form, setForm] = useState(EMPTY_LOCATION);
  const [schedule, setSchedule] = useState(defaultSchedule);
  const [availabilityOptions, setAvailabilityOptions] = useState({
    timezone: "Europe/Paris",
    bufferMinutes: 15,
    slotIntervalMinutes: 30,
    lessonDurationOptions: [30, 60, 90, 120],
  });
  const [loading, setLoading] = useState(true);
  const [savingLocation, setSavingLocation] = useState(false);
  const [savingSchedule, setSavingSchedule] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const center = useMemo(() => {
    const lat = Number(form.lat);
    const lng = Number(form.lng);
    return hasCoordinate(form.lat) && hasCoordinate(form.lng)
      ? { lat, lng }
      : DEFAULT_CENTER;
  }, [form.lat, form.lng]);

  const loadData = useCallback(async () => {
    setLoading(true);
    setError("");

    const [locationResult, availabilityResult] = await Promise.allSettled([
      getTeacherLocations(),
      getTeacherAvailability(),
    ]);

    if (locationResult.status === "fulfilled") {
      const data = unwrap(locationResult.value, []);
      setLocations(Array.isArray(data) ? data : []);
    } else {
      setError(
        errorMessage(
          locationResult.reason,
          "Teacher locations could not be loaded.",
        ),
      );
    }

    if (availabilityResult.status === "fulfilled") {
      const data = unwrap(availabilityResult.value, null);
      if (data) {
        const savedDays = new Map(
          (data.weeklySchedule || []).map((day) => [
            Number(day.dayOfWeek),
            day,
          ]),
        );
        setSchedule(
          DAYS.map((_, dayOfWeek) => {
            const saved = savedDays.get(dayOfWeek);
            const firstSlot = saved?.slots?.[0];
            return {
              dayOfWeek,
              enabled: Boolean(saved?.enabled),
              startTime: firstSlot?.startTime || "09:00",
              endTime: firstSlot?.endTime || "18:00",
            };
          }),
        );
        setAvailabilityOptions({
          timezone: data.timezone || "Europe/Paris",
          bufferMinutes: Number(data.bufferMinutes ?? 15),
          slotIntervalMinutes: Number(data.slotIntervalMinutes ?? 30),
          lessonDurationOptions: Array.isArray(data.lessonDurationOptions)
            ? data.lessonDurationOptions
            : [30, 60, 90, 120],
        });
      }
    }

    setLoading(false);
  }, []);

  useEffect(() => {
    loadData();
  }, [loadData]);

  useEffect(() => {
    if (!message) return undefined;
    const timer = window.setTimeout(() => setMessage(""), 4500);
    return () => window.clearTimeout(timer);
  }, [message]);

  const setCoordinates = useCallback((lat, lng) => {
    setForm((current) => ({ ...current, lat, lng }));
    const point = { lat, lng };
    mapRef.current?.panTo(point);
    mapRef.current?.setZoom(15);
  }, []);

  const reverseGeocode = useCallback((lat, lng) => {
    if (!window.google) return;
    const geocoder = new window.google.maps.Geocoder();
    geocoder.geocode({ location: { lat, lng } }, (results, status) => {
      if (status !== "OK" || !results?.[0]) return;
      const result = results[0];
      setForm((current) => ({
        ...current,
        address: result.formatted_address || current.address,
        city:
          getAddressPart(result.address_components, "locality") ||
          getAddressPart(
            result.address_components,
            "administrative_area_level_2",
          ) ||
          current.city,
        postalCode:
          getAddressPart(result.address_components, "postal_code") ||
          current.postalCode,
        placeId: result.place_id || current.placeId,
      }));
    });
  }, []);

  const choosePoint = useCallback(
    (lat, lng, shouldReverseGeocode = true) => {
      setCoordinates(lat, lng);
      if (shouldReverseGeocode) reverseGeocode(lat, lng);
    },
    [reverseGeocode, setCoordinates],
  );

  const useCurrentLocation = () => {
    setError("");
    if (!navigator.geolocation) {
      setError("This browser does not support location access.");
      return;
    }
    navigator.geolocation.getCurrentPosition(
      ({ coords }) => choosePoint(coords.latitude, coords.longitude, true),
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
      setError("Please select an address from Google suggestions.");
      return;
    }

    setForm((current) => ({
      ...current,
      address: place.formatted_address || place.name || current.address,
      city:
        getAddressPart(place.address_components, "locality") ||
        getAddressPart(place.address_components, "administrative_area_level_2"),
      postalCode: getAddressPart(place.address_components, "postal_code"),
      placeId: place.place_id || "",
      lat,
      lng,
    }));
    setCoordinates(lat, lng);
    setError("");
  };

  const resetForm = () => {
    setForm(EMPTY_LOCATION);
    setError("");
    mapRef.current?.panTo(DEFAULT_CENTER);
    mapRef.current?.setZoom(11);
  };

  const editLocation = (location) => {
    const next = locationToForm(location);
    setForm(next);
    const point = { lat: Number(next.lat), lng: Number(next.lng) };
    if (Number.isFinite(point.lat) && Number.isFinite(point.lng)) {
      mapRef.current?.panTo(point);
      mapRef.current?.setZoom(15);
    }
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const submitLocation = async (event) => {
    event.preventDefault();
    setError("");
    setMessage("");

    if (!form.address.trim()) {
      setError("Select or enter a complete address.");
      return;
    }
    if (!hasCoordinate(form.lat) || !hasCoordinate(form.lng)) {
      setError("Select an address, click the map, or use current location.");
      return;
    }

    const payload = {
      title: form.title,
      address: form.address,
      city: form.city,
      postalCode: form.postalCode,
      placeId: form.placeId,
      lat: Number(form.lat),
      lng: Number(form.lng),
      serviceRadiusKm: Number(form.serviceRadiusKm),
      meetingType: form.meetingType,
      status: form.status,
    };

    setSavingLocation(true);
    try {
      const response = form.id
        ? await updateTeacherLocation(form.id, payload)
        : await createTeacherLocation(payload);
      const saved = unwrap(response, null);
      if (saved?._id) {
        setLocations((current) => {
          const exists = current.some((item) => item._id === saved._id);
          return exists
            ? current.map((item) => (item._id === saved._id ? saved : item))
            : [saved, ...current];
        });
      } else {
        await loadData();
      }
      setMessage(
        form.id
          ? "Location updated successfully."
          : "Location added successfully.",
      );
      resetForm();
    } catch (requestError) {
      setError(errorMessage(requestError, "Location could not be saved."));
    } finally {
      setSavingLocation(false);
    }
  };

  const removeLocation = async (location) => {
    const confirmed = window.confirm(
      `Delete “${location.title || location.address}”?`,
    );
    if (!confirmed) return;

    setError("");
    try {
      await deleteTeacherLocation(location._id);
      setLocations((current) =>
        current.filter((item) => item._id !== location._id),
      );
      if (form.id === location._id) resetForm();
      setMessage("Location deleted successfully.");
    } catch (requestError) {
      setError(errorMessage(requestError, "Location could not be deleted."));
    }
  };

  const updateScheduleDay = (dayOfWeek, field, value) => {
    setSchedule((current) =>
      current.map((day) =>
        day.dayOfWeek === dayOfWeek ? { ...day, [field]: value } : day,
      ),
    );
  };

  const saveSchedule = async () => {
    setSavingSchedule(true);
    setError("");
    setMessage("");
    try {
      await updateTeacherAvailability({
        ...availabilityOptions,
        weeklySchedule: schedule.map((day) => ({
          dayOfWeek: day.dayOfWeek,
          enabled: day.enabled,
          slots: day.enabled
            ? [{ startTime: day.startTime, endTime: day.endTime }]
            : [],
        })),
      });
      setMessage("Weekly availability saved successfully.");
    } catch (requestError) {
      setError(errorMessage(requestError, "Availability could not be saved."));
    } finally {
      setSavingSchedule(false);
    }
  };

  if (loadError) {
    return (
      <div className="p-6 text-red-700">
        Google Maps failed to load: {loadError.message}
      </div>
    );
  }

  if (!isLoaded || loading) {
    return (
      <div className="p-6 font-semibold text-slate-600">
        Loading location manager...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F5F7FB] p-4 sm:p-6 lg:p-8">
      <div className="mx-auto max-w-7xl space-y-6">
        <header className="rounded-3xl bg-gradient-to-r from-[#153E75] to-[#1F63B5] p-6 text-white shadow-lg sm:p-8">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-sm font-bold uppercase tracking-[0.2em] text-blue-100">
                Teacher setup
              </p>
              <h1 className="mt-2 text-3xl font-black">
                Locations & availability
              </h1>
              <p className="mt-2 max-w-2xl text-sm leading-6 text-blue-100">
                Add exact meeting points, set a service radius, and define the
                hours when students can book you.
              </p>
            </div>
            <button
              type="button"
              onClick={resetForm}
              className="inline-flex items-center justify-center gap-2 rounded-2xl bg-white px-5 py-3 font-bold text-[#174A9B] shadow-sm"
            >
              <FaPlus /> New location
            </button>
          </div>
        </header>

        {error && (
          <div className="rounded-2xl border border-red-200 bg-red-50 px-5 py-4 text-sm font-semibold text-red-700">
            {error}
          </div>
        )}
        {message && (
          <div className="rounded-2xl border border-emerald-200 bg-emerald-50 px-5 py-4 text-sm font-semibold text-emerald-700">
            {message}
          </div>
        )}

        <section className="grid gap-6 xl:grid-cols-[1.05fr_0.95fr]">
          <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
            <GoogleMap
              mapContainerStyle={MAP_CONTAINER_STYLE}
              center={center}
              zoom={form.address ? 15 : 11}
              onLoad={(map) => {
                mapRef.current = map;
              }}
              onClick={(event) =>
                choosePoint(event.latLng.lat(), event.latLng.lng(), true)
              }
              options={{
                streetViewControl: false,
                mapTypeControl: false,
                fullscreenControl: true,
              }}
            >
              {hasCoordinate(form.lat) && hasCoordinate(form.lng) && (
                <MarkerF
                  position={center}
                  draggable
                  onDragEnd={(event) =>
                    choosePoint(event.latLng.lat(), event.latLng.lng(), true)
                  }
                />
              )}
            </GoogleMap>
            <div className="border-t border-slate-100 p-4 text-sm text-slate-600">
              Click the map or drag the marker to set the exact lesson meeting
              point.
            </div>
          </div>

          <form
            onSubmit={submitLocation}
            className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6"
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-sm font-bold text-[#174A9B]">
                  {form.id ? "Edit location" : "Add location"}
                </p>
                <h2 className="mt-1 text-2xl font-black text-slate-900">
                  Lesson meeting point
                </h2>
              </div>
              <button
                type="button"
                onClick={useCurrentLocation}
                className="inline-flex items-center gap-2 rounded-xl bg-blue-50 px-3 py-2 text-sm font-bold text-[#174A9B]"
              >
                <FaLocationArrow /> Use current
              </button>
            </div>

            <div className="mt-5 space-y-4">
              <label className="block">
                <span className="mb-2 block text-sm font-bold text-slate-700">
                  Search address
                </span>
                <Autocomplete
                  onLoad={(instance) => {
                    autocompleteRef.current = instance;
                  }}
                  onPlaceChanged={handlePlaceChanged}
                >
                  <input
                    value={form.address}
                    onChange={(event) =>
                      setForm((current) => ({
                        ...current,
                        address: event.target.value,
                      }))
                    }
                    placeholder="Start typing a full address"
                    className="w-full rounded-2xl border border-slate-200 px-4 py-3 outline-none transition focus:border-[#174A9B] focus:ring-4 focus:ring-blue-100"
                  />
                </Autocomplete>
              </label>

              <div className="grid gap-4 sm:grid-cols-2">
                <Field
                  label="Location title"
                  value={form.title}
                  onChange={(value) =>
                    setForm((current) => ({ ...current, title: value }))
                  }
                  placeholder="Central meeting point"
                />
                <Field
                  label="City"
                  value={form.city}
                  onChange={(value) =>
                    setForm((current) => ({ ...current, city: value }))
                  }
                  placeholder="Paris"
                />
                <Field
                  label="Postal code"
                  value={form.postalCode}
                  onChange={(value) =>
                    setForm((current) => ({ ...current, postalCode: value }))
                  }
                  placeholder="75001"
                />
                <label className="block">
                  <span className="mb-2 block text-sm font-bold text-slate-700">
                    Service radius
                  </span>
                  <select
                    value={form.serviceRadiusKm}
                    onChange={(event) =>
                      setForm((current) => ({
                        ...current,
                        serviceRadiusKm: Number(event.target.value),
                      }))
                    }
                    className="w-full rounded-2xl border border-slate-200 px-4 py-3 outline-none focus:border-[#174A9B]"
                  >
                    {[3, 5, 10, 15, 20, 30, 50].map((radius) => (
                      <option key={radius} value={radius}>
                        {radius} km
                      </option>
                    ))}
                  </select>
                </label>
                <label className="block">
                  <span className="mb-2 block text-sm font-bold text-slate-700">
                    Lesson arrangement
                  </span>
                  <select
                    value={form.meetingType}
                    onChange={(event) =>
                      setForm((current) => ({
                        ...current,
                        meetingType: event.target.value,
                      }))
                    }
                    className="w-full rounded-2xl border border-slate-200 px-4 py-3 outline-none focus:border-[#174A9B]"
                  >
                    <option value="teacher_location">Student comes here</option>
                    <option value="student_pickup">Student pickup</option>
                    <option value="both">Both options</option>
                  </select>
                </label>
                <label className="block">
                  <span className="mb-2 block text-sm font-bold text-slate-700">
                    Status
                  </span>
                  <select
                    value={form.status}
                    onChange={(event) =>
                      setForm((current) => ({
                        ...current,
                        status: event.target.value,
                      }))
                    }
                    className="w-full rounded-2xl border border-slate-200 px-4 py-3 outline-none focus:border-[#174A9B]"
                  >
                    <option value="active">Active</option>
                    <option value="inactive">Inactive</option>
                  </select>
                </label>
              </div>

              <div className="grid grid-cols-2 gap-3 rounded-2xl bg-slate-50 p-3 text-xs text-slate-600">
                <span>
                  Lat:{" "}
                  {hasCoordinate(form.lat) ? Number(form.lat).toFixed(6) : "--"}
                </span>
                <span>
                  Lng:{" "}
                  {hasCoordinate(form.lng) ? Number(form.lng).toFixed(6) : "--"}
                </span>
              </div>

              <button
                type="submit"
                disabled={savingLocation}
                className="flex w-full items-center justify-center gap-2 rounded-2xl bg-[#174A9B] px-5 py-3.5 font-black text-white shadow-sm transition hover:bg-[#123D82] disabled:opacity-60"
              >
                <FaSave />
                {savingLocation
                  ? "Saving..."
                  : form.id
                    ? "Update location"
                    : "Save location"}
              </button>
            </div>
          </form>
        </section>

        <section className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-blue-50 text-[#174A9B]">
              <FaMapMarkerAlt />
            </div>
            <div>
              <h2 className="text-xl font-black text-slate-900">
                Saved locations
              </h2>
              <p className="text-sm text-slate-500">
                Students only see active locations inside the selected search
                radius.
              </p>
            </div>
          </div>

          <div className="mt-5 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {locations.length ? (
              locations.map((location) => (
                <article
                  key={location._id}
                  className="rounded-2xl border border-slate-200 p-4"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <h3 className="font-black text-slate-900">
                        {location.title || "Lesson meeting point"}
                      </h3>
                      <p className="mt-1 text-sm leading-5 text-slate-600">
                        {[location.address, location.city, location.postalCode]
                          .filter(Boolean)
                          .join(", ")}
                      </p>
                    </div>
                    <span
                      className={`rounded-full px-2.5 py-1 text-xs font-black ${
                        location.status === "active"
                          ? "bg-emerald-100 text-emerald-700"
                          : "bg-slate-100 text-slate-600"
                      }`}
                    >
                      {location.status}
                    </span>
                  </div>
                  <div className="mt-4 flex flex-wrap gap-2 text-xs font-bold text-slate-600">
                    <span className="rounded-full bg-slate-100 px-3 py-1.5">
                      {location.serviceRadiusKm || 10} km radius
                    </span>
                    <span className="rounded-full bg-slate-100 px-3 py-1.5">
                      {(location.meetingType || "teacher_location").replaceAll(
                        "_",
                        " ",
                      )}
                    </span>
                  </div>
                  <div className="mt-4 flex gap-2">
                    <button
                      type="button"
                      onClick={() => editLocation(location)}
                      className="inline-flex flex-1 items-center justify-center gap-2 rounded-xl bg-blue-50 px-3 py-2 text-sm font-bold text-[#174A9B]"
                    >
                      <FaEdit /> Edit
                    </button>
                    <button
                      type="button"
                      onClick={() => removeLocation(location)}
                      className="inline-flex items-center justify-center gap-2 rounded-xl bg-red-50 px-3 py-2 text-sm font-bold text-red-700"
                    >
                      <FaTrash />
                    </button>
                  </div>
                </article>
              ))
            ) : (
              <div className="col-span-full rounded-2xl border border-dashed border-slate-300 p-8 text-center text-slate-500">
                No location saved yet. Add your first lesson meeting point
                above.
              </div>
            )}
          </div>
        </section>

        <section className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-blue-50 text-[#174A9B]">
                <FaCalendarAlt />
              </div>
              <div>
                <h2 className="text-xl font-black text-slate-900">
                  Weekly availability
                </h2>
                <p className="text-sm text-slate-500">
                  A student can only book inside these working hours.
                </p>
              </div>
            </div>
            <div className="flex flex-wrap gap-3">
              <label className="text-sm font-bold text-slate-600">
                Buffer
                <select
                  value={availabilityOptions.bufferMinutes}
                  onChange={(event) =>
                    setAvailabilityOptions((current) => ({
                      ...current,
                      bufferMinutes: Number(event.target.value),
                    }))
                  }
                  className="ml-2 rounded-xl border border-slate-200 px-3 py-2"
                >
                  {[0, 10, 15, 20, 30, 45, 60].map((value) => (
                    <option key={value} value={value}>
                      {value} min
                    </option>
                  ))}
                </select>
              </label>
              <label className="text-sm font-bold text-slate-600">
                Slot interval
                <select
                  value={availabilityOptions.slotIntervalMinutes}
                  onChange={(event) =>
                    setAvailabilityOptions((current) => ({
                      ...current,
                      slotIntervalMinutes: Number(event.target.value),
                    }))
                  }
                  className="ml-2 rounded-xl border border-slate-200 px-3 py-2"
                >
                  {[15, 30, 45, 60].map((value) => (
                    <option key={value} value={value}>
                      {value} min
                    </option>
                  ))}
                </select>
              </label>
            </div>
          </div>

          <div className="mt-5 space-y-3">
            {schedule.map((day) => (
              <div
                key={day.dayOfWeek}
                className="grid gap-3 rounded-2xl border border-slate-200 p-4 sm:grid-cols-[170px_1fr] sm:items-center"
              >
                <label className="flex items-center gap-3 font-black text-slate-800">
                  <input
                    type="checkbox"
                    checked={day.enabled}
                    onChange={(event) =>
                      updateScheduleDay(
                        day.dayOfWeek,
                        "enabled",
                        event.target.checked,
                      )
                    }
                    className="h-5 w-5 rounded border-slate-300"
                  />
                  {DAYS[day.dayOfWeek]}
                </label>
                {day.enabled ? (
                  <div className="flex flex-wrap items-center gap-3">
                    <FaClock className="text-[#174A9B]" />
                    <input
                      type="time"
                      value={day.startTime}
                      onChange={(event) =>
                        updateScheduleDay(
                          day.dayOfWeek,
                          "startTime",
                          event.target.value,
                        )
                      }
                      className="rounded-xl border border-slate-200 px-3 py-2"
                    />
                    <span className="text-sm font-bold text-slate-400">to</span>
                    <input
                      type="time"
                      value={day.endTime}
                      onChange={(event) =>
                        updateScheduleDay(
                          day.dayOfWeek,
                          "endTime",
                          event.target.value,
                        )
                      }
                      className="rounded-xl border border-slate-200 px-3 py-2"
                    />
                  </div>
                ) : (
                  <span className="text-sm font-semibold text-slate-400">
                    Unavailable
                  </span>
                )}
              </div>
            ))}
          </div>

          <button
            type="button"
            onClick={saveSchedule}
            disabled={savingSchedule}
            className="mt-5 inline-flex items-center gap-2 rounded-2xl bg-[#174A9B] px-5 py-3 font-black text-white disabled:opacity-60"
          >
            <FaSave />{" "}
            {savingSchedule ? "Saving schedule..." : "Save availability"}
          </button>
        </section>
      </div>
    </div>
  );
}

function Field({ label, value, onChange, placeholder }) {
  return (
    <label className="block">
      <span className="mb-2 block text-sm font-bold text-slate-700">
        {label}
      </span>
      <input
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
        className="w-full rounded-2xl border border-slate-200 px-4 py-3 outline-none transition focus:border-[#174A9B] focus:ring-4 focus:ring-blue-100"
      />
    </label>
  );
}
