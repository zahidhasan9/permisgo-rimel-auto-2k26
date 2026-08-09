"use client";

import { useEffect, useState } from "react";
import { getPublicContactConfig } from "@/features/API";

export const defaultSiteSettings = {
  companyName: "Permis Go Auto École",
  domainName: "www.permisgo.fr",
  websiteUrl: "https://www.permisgoautoecole.com",
  supportEmail: "support@permisgo.fr",
  admissionEmail: "admission@permisgoautoecole.com",
  phone: "09 56 73 63 33",
  mobile: "06 24 82 40 09",
  whatsappNumber: "+33 6 24 82 40 09",
  whatsappUrl: "https://wa.me/33624824009",
  address: "100 Rue Danielle Casanova, 93300 Aubervilliers, France",
  address2: "37 Rue Bouret, 75019 Paris, France",
  googleMapUrl: "https://maps.app.goo.gl/iaFZNXTUhQ7vmzkc8",
  facebookUrl: "https://www.facebook.com/permisgoautoecole/",
  instagramUrl: "https://www.instagram.com/permisgoautoecole/",
  tiktokUrl: "https://www.tiktok.com/@permisgoautoecole",
  youtubeUrl: "https://www.youtube.com/@PermisGoAutoEcole",
};

export default function useSiteSettings() {
  const [settings, setSettings] = useState(defaultSiteSettings);
  useEffect(() => {
    let active = true;
    getPublicContactConfig().then((response) => {
      if (active) setSettings({ ...defaultSiteSettings, ...(response.data?.data || {}) });
    }).catch(() => {});
    return () => { active = false; };
  }, []);
  return settings;
}
