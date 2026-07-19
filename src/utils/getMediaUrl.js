import axiosInstance from "../Apiutils/axiosInstance";

export default function getMediaUrl(fileUrl, fallback = "/image/car.jpg") {
  if (!fileUrl) return fallback;

  const normalizedFileUrl = String(fileUrl).replace(/\\/g, "/");

  if (/^https?:\/\//i.test(normalizedFileUrl)) {
    return normalizedFileUrl;
  }

  const configuredBaseUrl = String(
    axiosInstance.defaults.baseURL || "",
  ).replace(/\/+$/, "");

  try {
    const apiUrl = new URL(configuredBaseUrl);
    const cleanPath = normalizedFileUrl.startsWith("/")
      ? normalizedFileUrl
      : `/${normalizedFileUrl}`;

    return `${apiUrl.origin}${cleanPath}`;
  } catch {
    return normalizedFileUrl.startsWith("/")
      ? normalizedFileUrl
      : `/${normalizedFileUrl}`;
  }
}
