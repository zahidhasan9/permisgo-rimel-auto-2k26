"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { getOffers } from "@/features/API";

export const CATEGORY_BY_TAB = {
  Code: "code",
  "To Drive": "to drive",
  "Driving License": "to drive",
  CPF: "cpf",
  "CPF Offers": "cpf",
  Accompanied: "accompanied",
  "Accompanied Driving": "accompanied",
  "À la carte": "other",
};

export const formatOfferPrice = (value) =>
  Number(value) === 0 ? "FREE" : `€${Number(value || 0).toLocaleString()}`;

export const toCardOffer = (offer) => ({
  ...offer,
  price: formatOfferPrice(offer.salePrice),
  oldPrice: formatOfferPrice(offer.regularPrice),
  sale: formatOfferPrice(offer.salePrice),
  retail: formatOfferPrice(offer.regularPrice),
  subtitle: offer.description,
  hours: (offer.hourOptions || []).map((option) => option.label),
  active: Boolean(offer.isFeatured),
  best: Boolean(offer.isFeatured),
  badge: Boolean(offer.isFeatured),
});

export default function useOffers({ includeInactive = false } = {}) {
  const [offers, setOffers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const reload = useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      const params = { limit: 100 };
      if (!includeInactive) params.status = "active";
      const response = await getOffers(params);
      const payload = response.data?.data ?? response.data;
      setOffers(Array.isArray(payload) ? payload : payload?.items || []);
    } catch (err) {
      setError(err.response?.data?.message || "Unable to load offers.");
    } finally {
      setLoading(false);
    }
  }, [includeInactive]);

  useEffect(() => {
    reload();
    const refreshOnFocus = () => reload();
    window.addEventListener("focus", refreshOnFocus);
    return () => window.removeEventListener("focus", refreshOnFocus);
  }, [reload]);

  const cards = useMemo(() => offers.map(toCardOffer), [offers]);
  return { offers, cards, loading, error, reload };
}

export const filterOffers = (offers, category, transmission) =>
  offers.filter(
    (offer) =>
      (!category || offer.category === category) &&
      (!transmission ||
        offer.transmission === transmission ||
        offer.transmission === "both" ||
        !offer.transmission),
  );
