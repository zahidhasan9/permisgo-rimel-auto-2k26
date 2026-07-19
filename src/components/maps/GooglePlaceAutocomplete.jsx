"use client";

import { useEffect, useRef } from "react";

const getAddressValue = (components = [], type) => {
  const component = components.find((item) => item.types?.includes(type));
  return component?.longText || component?.long_name || "";
};

const getLatLng = (location) => {
  const lat =
    typeof location?.lat === "function"
      ? location.lat()
      : Number(location?.lat);
  const lng =
    typeof location?.lng === "function"
      ? location.lng()
      : Number(location?.lng);

  if (!Number.isFinite(lat) || !Number.isFinite(lng)) return null;
  return { lat, lng };
};

export default function GooglePlaceAutocomplete({
  value = "",
  placeholder = "Search an address",
  disabled = false,
  onPlaceSelect,
  onError,
}) {
  const containerRef = useRef(null);
  const autocompleteRef = useRef(null);
  const onPlaceSelectRef = useRef(onPlaceSelect);
  const onErrorRef = useRef(onError);

  useEffect(() => {
    onPlaceSelectRef.current = onPlaceSelect;
  }, [onPlaceSelect]);

  useEffect(() => {
    onErrorRef.current = onError;
  }, [onError]);

  useEffect(() => {
    let cancelled = false;
    let autocompleteElement = null;
    let handleSelect = null;
    let handleError = null;

    const initialiseAutocomplete = async () => {
      try {
        if (!containerRef.current || !window.google?.maps?.importLibrary) {
          return;
        }

        const { PlaceAutocompleteElement } =
          await window.google.maps.importLibrary("places");

        if (cancelled || !containerRef.current) return;

        autocompleteElement = new PlaceAutocompleteElement();
        autocompleteElement.placeholder = placeholder;
        autocompleteElement.style.width = "100%";
        autocompleteElement.style.display = "block";
        autocompleteElement.style.colorScheme = "light";

        if (value) autocompleteElement.value = value;
        if (disabled) autocompleteElement.setAttribute("disabled", "");

        handleSelect = async (event) => {
          try {
            const place = event.placePrediction?.toPlace
              ? event.placePrediction.toPlace()
              : event.place;

            if (!place) {
              throw new Error("Google did not return a selected place.");
            }

            await place.fetchFields({
              fields: [
                "id",
                "displayName",
                "formattedAddress",
                "location",
                "viewport",
                "addressComponents",
              ],
            });

            const point = getLatLng(place.location);
            if (!point) {
              throw new Error("The selected place has no coordinates.");
            }

            const components = place.addressComponents || [];
            const city =
              getAddressValue(components, "locality") ||
              getAddressValue(components, "postal_town") ||
              getAddressValue(components, "administrative_area_level_2") ||
              getAddressValue(components, "administrative_area_level_1");

            onPlaceSelectRef.current?.({
              address:
                place.formattedAddress || place.displayName || value || "",
              placeId: place.id || "",
              lat: point.lat,
              lng: point.lng,
              city,
              postalCode: getAddressValue(components, "postal_code"),
              viewport: place.viewport || null,
            });
          } catch (error) {
            onErrorRef.current?.(
              error?.message || "The selected address could not be loaded.",
            );
          }
        };

        handleError = () => {
          onErrorRef.current?.(
            "Google Places denied the request. Enable Places API (New) for this key and check the key restrictions.",
          );
        };

        autocompleteElement.addEventListener("gmp-select", handleSelect);
        autocompleteElement.addEventListener("gmp-error", handleError);

        containerRef.current.replaceChildren(autocompleteElement);
        autocompleteRef.current = autocompleteElement;
      } catch (error) {
        onErrorRef.current?.(
          error?.message || "Google Places autocomplete could not be loaded.",
        );
      }
    };

    initialiseAutocomplete();

    return () => {
      cancelled = true;

      if (autocompleteElement && handleSelect) {
        autocompleteElement.removeEventListener("gmp-select", handleSelect);
      }

      if (autocompleteElement && handleError) {
        autocompleteElement.removeEventListener("gmp-error", handleError);
      }

      if (containerRef.current) {
        containerRef.current.replaceChildren();
      }

      autocompleteRef.current = null;
    };
  }, [disabled, placeholder]);

  useEffect(() => {
    if (autocompleteRef.current && value !== undefined) {
      autocompleteRef.current.value = value || "";
    }
  }, [value]);

  return (
    <div
      ref={containerRef}
      className="min-h-[50px] w-full overflow-visible rounded-2xl border border-slate-200 bg-white px-1 py-1 shadow-sm focus-within:border-blue-500 focus-within:ring-4 focus-within:ring-blue-100"
    />
  );
}
