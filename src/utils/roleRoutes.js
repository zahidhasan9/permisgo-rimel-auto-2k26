export const ROLE_ROUTES = {
  admin: "/admin",
  teacher: "/teacher",
  student: "/student",
};

export const getDashboardRouteByRole = (role) => {
  return ROLE_ROUTES[role] || "/";
};
