export const getBackendBaseUrl = () => {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";
  return apiUrl.replace(/\/api\/?$/, "");
};

export const mediaUrl = (path) => {
  if (!path) return "";
  if (path.startsWith("http://") || path.startsWith("https://")) return path;
  const baseUrl = getBackendBaseUrl();
  return `${baseUrl}${path.startsWith("/") ? path : `/${path}`}`;
};
