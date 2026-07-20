export const ROLE_ROUTES = {
  admin: "/admin/dashboard",
  teacher: "/teacher/dashboard",
  student: "/student/dashboard",
};

export const getDashboardRouteByRole = (role) => {
  return ROLE_ROUTES[role] || "/";
};
