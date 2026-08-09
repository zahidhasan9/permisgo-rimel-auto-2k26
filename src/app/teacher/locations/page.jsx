"use client";

import GooglePlaceAutocomplete from "@/components/maps/GooglePlaceAutocomplete";
import { GoogleMap, MarkerF, useJsApiLoader } from "@react-google-maps/api";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
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
  getTeacherLocations,
  updateTeacherLocation,
} from "@/features/API";

const GOOGLE_MAP_LIBRARIES = ["places"];
const DEFAULT_CENTER = { lat: 48.8566, lng: 2.3522 };

const emptyLocation = () => ({
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
});

const unwrap = (response, fallback = null) =>
  response?.data?.data ?? response?.data ?? fallback;

const getErrorMessage = (error, fallback) =>
  error?.response?.data?.message || error?.message || fallback;

const hasCoordinate = (value) =>
  value !== null && value !== "" && Number.isFinite(Number(value));

const getLocationPoint = (location) => {
  const lat = Number(
    location?.coordinates?.lat ?? location?.geoLocation?.coordinates?.[1],
  );
  const lng = Number(
    location?.coordinates?.lng ?? location?.geoLocation?.coordinates?.[0],
  );

  return Number.isFinite(lat) && Number.isFinite(lng) ? { lat, lng } : null;
};

const locationToForm = (location) => {
  const point = getLocationPoint(location);

  return {
    id: location?._id || "",
    title: location?.title || "Lesson meeting point",
    address: location?.address || "",
    city: location?.city || "",
    postalCode: location?.postalCode || "",
    placeId: location?.placeId || "",
    lat: point?.lat ?? null,
    lng: point?.lng ?? null,
    serviceRadiusKm: Number(location?.serviceRadiusKm || 10),
    meetingType: location?.meetingType || "teacher_location",
    status: location?.status || "active",
  };
};

function MapError({ message }) {
  return (
    <div className="rounded-3xl border border-red-200 bg-red-50 p-6 text-sm text-red-700">
      <p className="font-black">Google Maps could not load</p>
      <p className="mt-2">{message}</p>
      <p className="mt-3 text-xs leading-5">
        Use a valid key in <code>NEXT_PUBLIC_GOOGLE_MAPS_API_KEY</code> and
        enable Maps JavaScript API plus Places API (New).
      </p>
    </div>
  );
}

export default function TeacherLocationsPage() {
  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY?.trim();

  if (!apiKey) {
    return (
      <MapError message="NEXT_PUBLIC_GOOGLE_MAPS_API_KEY is missing from .env.local." />
    );
  }

  return <TeacherLocationsMap apiKey={apiKey} />;
}

function TeacherLocationsMap({ apiKey }) {
  const { isLoaded, loadError } = useJsApiLoader({
    id: "permisgo-google-maps",
    googleMapsApiKey: apiKey,
    libraries: GOOGLE_MAP_LIBRARIES,
    version: "weekly",
    language: "en",
    region: "FR",
  });

  if (loadError) {
    return <MapError message={loadError.message} />;
  }

  if (!isLoaded) {
    return (
      <div className="rounded-3xl border border-slate-200 bg-white p-8 text-center font-bold text-slate-500">
        Loading Google Maps...
      </div>
    );
  }

  return <LocationsContent />;
}

function LocationsContent() {
  const mapRef = useRef(null);
  const [locations, setLocations] = useState([]);
  const [form, setForm] = useState(emptyLocation);
  const [loading, setLoading] = useState(true);
  const [savingLocation, setSavingLocation] = useState(false);
  const [deletingId, setDeletingId] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const selectedPoint = useMemo(() => {
    if (!hasCoordinate(form.lat) || !hasCoordinate(form.lng)) {
      return DEFAULT_CENTER;
    }

    return { lat: Number(form.lat), lng: Number(form.lng) };
  }, [form.lat, form.lng]);

  const loadPageData = useCallback(async () => {
    setLoading(true);
    setError("");

    try {
      const locationResponse = await getTeacherLocations();

      const locationData = unwrap(locationResponse, []);

      setLocations(Array.isArray(locationData) ? locationData : []);
    } catch (requestError) {
      setError(
        getErrorMessage(
          requestError,
          "Locations could not be loaded.",
        ),
      );
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadPageData();
  }, [loadPageData]);

  useEffect(() => {
    if (!success) return undefined;
    const timer = window.setTimeout(() => setSuccess(""), 4500);
    return () => window.clearTimeout(timer);
  }, [success]);

  const reverseGeocode = useCallback((lat, lng) => {
    if (!window.google?.maps) return;

    const geocoder = new window.google.maps.Geocoder();
    geocoder.geocode({ location: { lat, lng } }, (results, status) => {
      if (status !== "OK" || !results?.[0]) return;

      const result = results[0];
      const components = result.address_components || [];
      const getPart = (type) =>
        components.find((item) => item.types?.includes(type))?.long_name || "";

      setForm((current) => ({
        ...current,
        address: result.formatted_address || current.address,
        placeId: result.place_id || current.placeId,
        city:
          getPart("locality") ||
          getPart("postal_town") ||
          getPart("administrative_area_level_2") ||
          current.city,
        postalCode: getPart("postal_code") || current.postalCode,
      }));
    });
  }, []);

  const setMapPoint = useCallback(
    (lat, lng, shouldReverse = true) => {
      setForm((current) => ({ ...current, lat, lng }));
      mapRef.current?.panTo({ lat, lng });
      mapRef.current?.setZoom(15);

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
      ({ coords }) => setMapPoint(coords.latitude, coords.longitude, true),
      (geoError) =>
        setError(geoError.message || "Location permission was denied."),
      { enableHighAccuracy: true, timeout: 12000 },
    );
  };

  const handlePlaceSelect = (place) => {
    setForm((current) => ({
      ...current,
      address: place.address,
      city: place.city || current.city,
      postalCode: place.postalCode || current.postalCode,
      placeId: place.placeId,
      lat: place.lat,
      lng: place.lng,
    }));

    mapRef.current?.panTo({ lat: place.lat, lng: place.lng });
    mapRef.current?.setZoom(15);
    setError("");
  };

  const resetForm = () => {
    setForm(emptyLocation());
    setError("");
    setSuccess("");
    mapRef.current?.panTo(DEFAULT_CENTER);
    mapRef.current?.setZoom(11);
  };

  const editLocation = (location) => {
    const nextForm = locationToForm(location);
    setForm(nextForm);
    setError("");
    setSuccess("");

    if (hasCoordinate(nextForm.lat) && hasCoordinate(nextForm.lng)) {
      mapRef.current?.panTo({
        lat: Number(nextForm.lat),
        lng: Number(nextForm.lng),
      });
      mapRef.current?.setZoom(15);
    }

    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const saveLocation = async (event) => {
    event.preventDefault();
    setError("");
    setSuccess("");

    if (!form.address.trim()) {
      setError("Select an address from the Google suggestions.");
      return;
    }

    if (!hasCoordinate(form.lat) || !hasCoordinate(form.lng)) {
      setError("The location coordinates are missing.");
      return;
    }

    const payload = {
      title: form.title.trim() || "Lesson meeting point",
      address: form.address.trim(),
      city: form.city.trim(),
      postalCode: form.postalCode.trim(),
      placeId: form.placeId,
      lat: Number(form.lat),
      lng: Number(form.lng),
      serviceRadiusKm: Number(form.serviceRadiusKm),
      meetingType: form.meetingType,
      status: form.status,
    };

    setSavingLocation(true);

    try {
      if (form.id) {
        await updateTeacherLocation(form.id, payload);
        setSuccess("Location updated successfully.");
      } else {
        await createTeacherLocation(payload);
        setSuccess("Location created successfully.");
      }

      await loadPageData();
      setForm(emptyLocation());
    } catch (requestError) {
      setError(
        getErrorMessage(requestError, "The location could not be saved."),
      );
    } finally {
      setSavingLocation(false);
    }
  };

  const removeLocation = async (location) => {
    const confirmed = window.confirm(
      `Delete ${location.title || "this location"}?`,
    );
    if (!confirmed) return;

    setDeletingId(location._id);
    setError("");
    setSuccess("");

    try {
      await deleteTeacherLocation(location._id);
      setLocations((current) =>
        current.filter((item) => item._id !== location._id),
      );
      if (form.id === location._id) setForm(emptyLocation());
      setSuccess("Location deleted successfully.");
    } catch (requestError) {
      setError(
        getErrorMessage(requestError, "The location could not be deleted."),
      );
    } finally {
      setDeletingId("");
    }
  };

  return (
    <main className="min-w-0 space-y-4 overflow-x-hidden pb-24 sm:space-y-6 sm:pb-10">
      <section className="rounded-2xl bg-gradient-to-r from-[#123D7A] to-[#1E63B7] p-4 text-white shadow-lg sm:rounded-3xl sm:p-6">
        <p className="text-xs font-bold text-blue-100 sm:text-sm">Teacher settings</p>
        <h1 className="mt-1 text-2xl font-black sm:text-3xl">Lesson locations</h1>
        <p className="mt-2 max-w-2xl text-xs leading-5 text-blue-100 sm:text-sm sm:leading-6">
          Add and manage accurate lesson meeting points for your students.
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

      <section className="grid min-w-0 gap-4 sm:gap-6 xl:grid-cols-[420px_minmax(0,1fr)]">
        <form
          onSubmit={saveLocation}
          className="min-w-0 rounded-2xl border border-slate-200 bg-white p-3.5 shadow-sm sm:rounded-3xl sm:p-5"
        >
          <div className="flex flex-col items-start gap-3 min-[390px]:flex-row min-[390px]:justify-between">
            <div className="min-w-0">
              <p className="text-xs font-black uppercase tracking-wider text-blue-600">
                {form.id ? "Edit location" : "New location"}
              </p>
              <h2 className="mt-1 text-lg font-black text-slate-900 sm:text-xl">
                Lesson meeting point
              </h2>
            </div>
            {form.id && (
              <button
                type="button"
                onClick={resetForm}
                className="w-full rounded-xl bg-slate-100 px-3 py-2 text-xs font-black text-slate-700 hover:bg-slate-200 min-[390px]:w-auto"
              >
                <FaPlus className="mr-1 inline" /> New
              </button>
            )}
          </div>

          <div className="mt-5 space-y-4">
            <TextField
              label="Location title"
              value={form.title}
              onChange={(value) =>
                setForm((current) => ({ ...current, title: value }))
              }
              placeholder="Example: Central Station meeting point"
            />

            <div>
              <label className="mb-2 block text-sm font-black text-slate-700">
                Search address
              </label>
              <GooglePlaceAutocomplete
                value={form.address}
                placeholder="Type a street, city or landmark"
                onPlaceSelect={handlePlaceSelect}
                onError={setError}
              />
              {form.address && (
                <p className="mt-2 break-words rounded-xl bg-blue-50 px-3 py-2 text-[11px] font-semibold leading-5 text-blue-800 sm:text-xs">
                  <FaMapMarkerAlt className="mr-1 inline" /> {form.address}
                </p>
              )}
            </div>

            <button
              type="button"
              onClick={useCurrentLocation}
              className="flex w-full items-center justify-center gap-2 rounded-2xl border border-blue-200 bg-blue-50 px-3 py-3 text-xs font-black text-blue-700 hover:bg-blue-100 sm:px-4 sm:text-sm"
            >
              <FaLocationArrow /> Use my current location
            </button>

            <div className="grid gap-3 min-[420px]:grid-cols-2">
              <TextField
                label="City"
                value={form.city}
                onChange={(value) =>
                  setForm((current) => ({ ...current, city: value }))
                }
              />
              <TextField
                label="Postal code"
                value={form.postalCode}
                onChange={(value) =>
                  setForm((current) => ({ ...current, postalCode: value }))
                }
              />
            </div>

            <SelectField
              label="Service radius"
              value={form.serviceRadiusKm}
              onChange={(value) =>
                setForm((current) => ({
                  ...current,
                  serviceRadiusKm: Number(value),
                }))
              }
              options={[5, 10, 15, 20, 30, 50].map((value) => ({
                value,
                label: `${value} km`,
              }))}
            />

            <SelectField
              label="Meeting type"
              value={form.meetingType}
              onChange={(value) =>
                setForm((current) => ({ ...current, meetingType: value }))
              }
              options={[
                { value: "teacher_location", label: "Teacher meeting point" },
                { value: "student_pickup", label: "Student pickup" },
                { value: "both", label: "Both options" },
              ]}
            />

            <SelectField
              label="Status"
              value={form.status}
              onChange={(value) =>
                setForm((current) => ({ ...current, status: value }))
              }
              options={[
                { value: "active", label: "Active" },
                { value: "inactive", label: "Inactive" },
              ]}
            />

            <button
              type="submit"
              disabled={savingLocation}
              className="flex w-full items-center justify-center gap-2 rounded-2xl bg-[#174A9B] px-5 py-3.5 text-sm font-black text-white shadow-md hover:bg-[#123D7A] disabled:cursor-not-allowed disabled:opacity-60"
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

        <div className="min-w-0 overflow-hidden rounded-2xl border border-slate-200 bg-white p-2 shadow-sm sm:rounded-3xl sm:p-3">
          <GoogleMap
            mapContainerClassName="h-[270px] w-full sm:h-[430px]"
            center={selectedPoint}
            zoom={hasCoordinate(form.lat) ? 15 : 11}
            onLoad={(map) => {
              mapRef.current = map;
            }}
            onClick={(event) => {
              if (!event.latLng) return;
              setMapPoint(event.latLng.lat(), event.latLng.lng(), true);
            }}
            options={{
              streetViewControl: false,
              mapTypeControl: false,
              fullscreenControl: true,
              clickableIcons: false,
            }}
          >
            {hasCoordinate(form.lat) && hasCoordinate(form.lng) && (
              <MarkerF
                position={{ lat: Number(form.lat), lng: Number(form.lng) }}
                draggable
                onDragEnd={(event) => {
                  if (!event.latLng) return;
                  setMapPoint(event.latLng.lat(), event.latLng.lng(), true);
                }}
              />
            )}

            {locations.map((location) => {
              const point = getLocationPoint(location);
              if (!point || location._id === form.id) return null;

              return (
                <MarkerF
                  key={location._id}
                  position={point}
                  onClick={() => editLocation(location)}
                />
              );
            })}
          </GoogleMap>
          <p className="px-1 pb-1 pt-2 text-[10px] font-semibold leading-4 text-slate-500 sm:px-2 sm:pt-3 sm:text-xs sm:leading-normal">
            Search an address, click the map, or drag the marker to correct the
            exact point.
          </p>
        </div>
      </section>

      <section className="min-w-0 rounded-2xl border border-slate-200 bg-white p-3.5 shadow-sm sm:rounded-3xl sm:p-5">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <p className="text-xs font-black uppercase tracking-wider text-blue-600">
              Saved locations
            </p>
            <h2 className="mt-1 text-xl font-black text-slate-900">
              Your lesson locations
            </h2>
          </div>
          <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-black text-blue-700">
            {locations.length} total
          </span>
        </div>

        {loading ? (
          <p className="py-8 text-center font-bold text-slate-500">
            Loading locations...
          </p>
        ) : locations.length ? (
          <div className="mt-5 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {locations.map((location) => (
              <article
                key={location._id}
                className="min-w-0 rounded-2xl border border-slate-200 p-3.5 sm:p-4"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <h3 className="truncate font-black text-slate-900">
                      {location.title || "Lesson meeting point"}
                    </h3>
                    <p className="mt-2 break-words text-xs leading-5 text-slate-600 sm:text-sm">
                      {location.address}
                    </p>
                  </div>
                  <span
                    className={`shrink-0 rounded-full px-2.5 py-1 text-[10px] font-black sm:text-[11px] ${
                      location.status === "active"
                        ? "bg-emerald-100 text-emerald-700"
                        : "bg-slate-100 text-slate-600"
                    }`}
                  >
                    {location.status || "active"}
                  </span>
                </div>

                <div className="mt-4 flex flex-wrap items-center justify-between gap-2 text-[11px] font-bold text-slate-500 sm:text-xs">
                  <span className="min-w-0 break-words">{location.city || "City not set"}</span>
                  <span className="shrink-0">{location.serviceRadiusKm || 10} km radius</span>
                </div>

                <div className="mt-4 grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => editLocation(location)}
                    className="rounded-xl bg-blue-50 px-3 py-2.5 text-xs font-black text-blue-700 hover:bg-blue-100"
                  >
                    <FaEdit className="mr-1 inline" /> Edit
                  </button>
                  <button
                    type="button"
                    disabled={deletingId === location._id}
                    onClick={() => removeLocation(location)}
                    className="rounded-xl bg-red-50 px-3 py-2.5 text-xs font-black text-red-700 hover:bg-red-100 disabled:opacity-60"
                  >
                    <FaTrash className="mr-1 inline" />
                    {deletingId === location._id ? "Deleting" : "Delete"}
                  </button>
                </div>
              </article>
            ))}
          </div>
        ) : (
          <div className="mt-5 rounded-2xl bg-slate-50 py-10 text-center text-sm font-bold text-slate-500">
            No lesson location has been added yet.
          </div>
        )}
      </section>

    </main>
  );
}

function TextField({ label, value, onChange, placeholder = "" }) {
  return (
    <label className="block">
      <span className="mb-2 block text-sm font-black text-slate-700">
        {label}
      </span>
      <input
        type="text"
        value={value}
        placeholder={placeholder}
        onChange={(event) => onChange(event.target.value)}
        className="w-full rounded-2xl border border-slate-200 px-3 py-3 text-base outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100 sm:px-4 sm:text-sm"
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
        className="w-full rounded-2xl border border-slate-200 bg-white px-3 py-3 text-base outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100 sm:px-4 sm:text-sm"
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
