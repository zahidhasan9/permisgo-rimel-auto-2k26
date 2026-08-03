export const getLogoutRedirect = (role) =>
  String(role || "").toLowerCase() === "admin" ? "/login" : "/user-login";
