import axios from "../Apiutils/axiosInstance";

// =======================
// Auth / User
// =======================
export const registerUser = (userData) =>
  axios.post("/auth/register", userData);
export const loginUser = (userData) => axios.post("/auth/login", userData);
export const getLoggedInUser = () => axios.get("/auth/me");
export const forgotPassword = (data) =>
  axios.post("/auth/forgot-password", data);
export const resetPassword = (data) => axios.post("/auth/reset-password", data);
export const logoutUser = () => axios.post("/auth/logout");
export const updateProfile = (data) =>
  axios.patch("/auth/profile", data, {
    headers:
      data instanceof FormData
        ? {
            "Content-Type": "multipart/form-data",
          }
        : {},
  });

export const changePassword = (data) =>
  axios.patch("/auth/change-password", data);

// =======================
// Student
// =======================
export const getStudentDashboard = () => axios.get("/students/dashboard");
export const getStudentProfile = () => axios.get("/students/profile");
export const updateStudentProfile = (data) =>
  axios.patch("/students/profile", data);
export const addFavoriteTeacher = (teacherId) =>
  axios.patch(`/students/favorite-teachers/${teacherId}`);
export const removeFavoriteTeacher = (teacherId) =>
  axios.delete(`/students/favorite-teachers/${teacherId}`);

// =======================
// Teacher
// =======================
export const getPublicTeachers = (params = {}) =>
  axios.get("/teachers/public", { params });
export const getTeacherDashboard = () => axios.get("/teachers/dashboard");
export const getTeacherStudents = (params = {}) =>
  axios.get("/teachers/students", { params });
export const getTeacherStudent = (studentId, params = {}) =>
  axios.get(`/teachers/students/${studentId}`, { params });
export const getTeacherProfile = () => axios.get("/teachers/profile");
export const updateTeacherProfile = (data) =>
  axios.patch("/teachers/profile", data);
export const getTeacherVehicles = () => axios.get("/teachers/vehicles");
export const addTeacherVehicle = (data) =>
  axios.post("/teachers/vehicles", data);
export const addTeacherLocation = (data) =>
  axios.post("/teachers/locations", data);

// =======================
// Admin
// =======================
// ================= ADMIN API =================

export const getAdminDashboard = () => {
  return axios.get("/admin/dashboard");
};

export const getAdminUsers = (params = {}) => {
  return axios.get("/admin/users", { params });
};

export const getAdminUserById = (id) => {
  return axios.get(`/admin/users/${id}`);
};

export const updateUserStatus = (id, status) => {
  return axios.patch(`/admin/users/${id}/status`, { status });
};

export const updateUserRole = (id, role) => {
  return axios.patch(`/admin/users/${id}/role`, { role });
};

export const deleteAdminUser = (id) => {
  return axios.delete(`/admin/users/${id}`);
};

export const verifyTeacher = (
  teacherId,
  verificationStatus,
  rejectionReason = "",
) => {
  return axios.patch(`/admin/teachers/${teacherId}/verify`, {
    verificationStatus,
    rejectionReason,
  });
};

// =======================
// Offers / Packages
// =======================
export const getOffers = () => axios.get("/offers");
export const getPackages = () => axios.get("/offers/packages");
export const getOfferBySlug = (slug) => axios.get(`/offers/${slug}`);
export const createOffer = (data) => axios.post("/offers", data);
export const updateOffer = (id, data) => axios.patch(`/offers/${id}`, data);
export const deleteOffer = (id) => axios.delete(`/offers/${id}`);
export const createPackage = (data) =>
  axios.post("/offers/packages/create", data);

// =======================
// Bookings
// =======================

export const createBooking = (data) => {
  return axios.post("/bookings", data);
};

export const getBookings = (params = {}) => {
  return axios.get("/bookings", {
    params,
  });
};

export const getBooking = (id) => {
  return axios.get(`/bookings/${id}`);
};

export const getTeacherBookingAvailability = (params) => {
  return axios.get("/bookings/availability", {
    params,
  });
};

export const confirmBooking = (id) => {
  return axios.patch(`/bookings/${id}/confirm`);
};

export const cancelBooking = (id, data) => {
  return axios.patch(`/bookings/${id}/cancel`, data);
};

// =======================
// Lessons
// =======================

export const getLessons = (params = {}) => axios.get("/lessons", { params });

export const getLessonStats = () => axios.get("/lessons/stats");

export const getLesson = (id) => axios.get(`/lessons/${id}`);

export const createLesson = (data) => axios.post("/lessons", data);

export const updateLesson = (id, data) => axios.patch(`/lessons/${id}`, data);

export const startLesson = (id) => axios.patch(`/lessons/${id}/start`);

export const confirmAttendance = (id, data = {}) =>
  axios.patch(`/lessons/${id}/attendance`, data);

export const completeLesson = (id, data = {}) =>
  axios.patch(`/lessons/${id}/complete`, data);

export const confirmLessonCompletion = (id) =>
  axios.patch(`/lessons/${id}/confirm-completion`);

export const submitLessonFeedback = (id, data) =>
  axios.patch(`/lessons/${id}/feedback`, data);

export const requestLessonReschedule = (id, data) =>
  axios.post(`/lessons/${id}/reschedule-request`, data);

export const resolveLessonReschedule = (id, data) =>
  axios.patch(`/lessons/${id}/resolve-reschedule`, data);

export const requestLessonCancellation = (id, data) =>
  axios.post(`/lessons/${id}/cancel-request`, data);

export const resolveLessonCancellation = (id, data) =>
  axios.patch(`/lessons/${id}/resolve-cancellation`, data);

export const cancelLesson = (id, data) =>
  axios.patch(`/lessons/${id}/cancel`, data);

export const markLessonNoShow = (id, data) =>
  axios.patch(`/lessons/${id}/no-show`, data);

// =======================
// Payments / Invoices
// =======================
export const createPayment = (data) => axios.post("/payments", data);
export const verifyPayment = (id, data) =>
  axios.patch(`/payments/${id}/verify`, data);
export const getPayments = () => axios.get("/payments");
export const getInvoices = () => axios.get("/payments/invoices");
export const getInvoice = (id) => axios.get(`/payments/invoices/${id}`);

// =======================
// Documents
// =======================

export const uploadDocument = (formData) => {
  return axios.post("/documents", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

export const getDocuments = (params = {}) => {
  return axios.get("/documents", {
    params,
  });
};

export const getDocumentUsers = (params = {}) => {
  return axios.get("/documents/users", {
    params,
  });
};

export const getUserDocuments = (userId) => {
  return axios.get(`/documents/user/${userId}`);
};

export const getDocumentStats = () => {
  return axios.get("/documents/stats");
};

export const getDocumentById = (documentId) => {
  return axios.get(`/documents/${documentId}`);
};

export const resubmitDocument = (documentId, formData) => {
  return axios.patch(`/documents/${documentId}/resubmit`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

export const reviewDocument = (documentId, data) => {
  return axios.patch(`/documents/${documentId}/review`, data);
};

export const deleteDocument = (documentId) => {
  return axios.delete(`/documents/${documentId}`);
};

// =======================
// Blogs
// =======================
export const getBlogs = () => axios.get("/blogs");
export const getBlog = (slug) => axios.get(`/blogs/${slug}`);
export const createBlog = (data) => axios.post("/blogs", data);
export const updateBlog = (id, data) => axios.patch(`/blogs/${id}`, data);
export const deleteBlog = (id) => axios.delete(`/blogs/${id}`);

// =======================
// FAQ
// =======================
export const getFaqs = () => axios.get("/faqs");
export const createFaq = (data) => axios.post("/faqs", data);
export const updateFaq = (id, data) => axios.patch(`/faqs/${id}`, data);
export const deleteFaq = (id) => axios.delete(`/faqs/${id}`);

// =======================
// Testimonials
// =======================
export const getTestimonials = () => axios.get("/testimonials");
export const createTestimonial = (data) => axios.post("/testimonials", data);
export const updateTestimonial = (id, data) =>
  axios.patch(`/testimonials/${id}`, data);
export const deleteTestimonial = (id) => axios.delete(`/testimonials/${id}`);

// =======================
// Support
// =======================
export const createPublicTicket = (data) => axios.post("/support/public", data);
export const createSupportTicket = (data) => axios.post("/support", data);
export const getSupportTickets = () => axios.get("/support");
export const replySupportTicket = (id, data) =>
  axios.patch(`/support/${id}/reply`, data);

// =======================
// Notifications
// =======================
export const getNotifications = () => axios.get("/notifications");
export const markNotificationAsRead = (id) =>
  axios.patch(`/notifications/${id}/read`);

// =======================
// Reviews
// =======================
export const getTeacherReviews = (teacherId) =>
  axios.get(`/reviews/teacher/${teacherId}`);
export const createReview = (data) => axios.post("/reviews", data);

// =======================
// Referrals
// =======================
export const getMyReferral = () => axios.get("/referrals/me");

// =======================
// Full Quiz System
// =======================

export const getQuizzes = () => axios.get("/quizzes");

export const getStudentCodeQuizzes = getQuizzes;

export const getQuizQuestions = (quizId) =>
  axios.get(`/quizzes/${quizId}/questions`);

export const getRoadSigns = () => axios.get("/quizzes/road-signs/list");

export const getQuizById = (quizId) => axios.get(`/quizzes/${quizId}`);

export const startQuizAttempt = (quizId) =>
  axios.post(`/quizzes/${quizId}/attempts/start`);

export const startCodeQuizAttempt = startQuizAttempt;

export const submitQuizAnswer = (attemptId, data) =>
  axios.post(`/quizzes/attempts/${attemptId}/answer`, data);

export const submitCodeQuizAnswer = submitQuizAnswer;

export const finishQuizAttempt = (attemptId) =>
  axios.post(`/quizzes/attempts/${attemptId}/finish`);

export const finishCodeQuizAttempt = finishQuizAttempt;

export const getMyQuizAttempts = () => axios.get("/quizzes/attempts/me");

export const getMyCodeQuizAttempts = getMyQuizAttempts;

export const getQuizAttemptReview = (attemptId) =>
  axios.get(`/quizzes/attempts/${attemptId}/review`);

export const getCodeQuizAttemptReview = getQuizAttemptReview;

export const getAdminQuizAttempts = () => axios.get("/quizzes/admin/attempts");

// Admin quiz management
export const createQuiz = (data) => axios.post("/quizzes", data);

export const createQuizWithForm = (data) =>
  axios.post("/quizzes", data, {
    headers:
      data instanceof FormData ? { "Content-Type": "multipart/form-data" } : {},
  });

export const updateQuiz = (quizId, data) =>
  axios.patch(`/quizzes/${quizId}`, data, {
    headers:
      data instanceof FormData ? { "Content-Type": "multipart/form-data" } : {},
  });

export const deleteQuiz = (quizId) => axios.delete(`/quizzes/${quizId}`);

export const getAdminQuizzes = (params = {}) =>
  axios.get("/quizzes/admin/all", { params });

export const getAdminQuizStats = () => axios.get("/quizzes/admin/stats");

export const getAdminQuizQuestions = (quizId) =>
  axios.get(`/quizzes/${quizId}/admin-questions`);

export const getQuestionById = (questionId) =>
  axios.get(`/quizzes/questions/${questionId}`);

export const createQuizQuestion = (quizId, data) =>
  axios.post(`/quizzes/${quizId}/questions`, data);

export const createQuizQuestionWithForm = (quizId, data) =>
  axios.post(`/quizzes/${quizId}/questions`, data, {
    headers:
      data instanceof FormData ? { "Content-Type": "multipart/form-data" } : {},
  });

export const updateQuizQuestion = (questionId, data) =>
  axios.patch(`/quizzes/questions/${questionId}`, data, {
    headers:
      data instanceof FormData ? { "Content-Type": "multipart/form-data" } : {},
  });

export const deleteQuizQuestion = (questionId) =>
  axios.delete(`/quizzes/questions/${questionId}`);

export const createRoadSign = (data) => axios.post("/quizzes/road-signs", data);

// =======================
// Exams
// =======================
export const createExamRequest = (data) => axios.post("/exams", data);
export const getMyExams = () => axios.get("/exams/me");
export const updateExam = (id, data) => axios.patch(`/exams/${id}`, data);

// ===============================
// Learning Content API
// ===============================

export const getAdminLearningContents = (params = {}) =>
  axios.get("/learning/admin/contents", { params });

export const createLearningContent = (data) =>
  axios.post("/learning/admin/contents", data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

export const updateLearningContent = (id, data) =>
  axios.patch(`/learning/admin/contents/${id}`, data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

export const deleteLearningContent = (id) =>
  axios.delete(`/learning/admin/contents/${id}`);

export const getLearningContents = (params = {}) =>
  axios.get("/learning/contents", { params });

export const getLearningSummary = () => axios.get("/learning/summary");

export const updateLearningProgress = (id, data) =>
  axios.post(`/learning/contents/${id}/progress`, data);

export const toggleLearningFavorite = (id) =>
  axios.patch(`/learning/contents/${id}/favorite`);

// =======================
// Admin Controlled Quiz Retake
// =======================

export const getAdminRetakePermissions = (params = {}) =>
  axios.get("/quizzes/admin/retake-permissions", { params });

export const grantQuizRetakePermission = (data) =>
  axios.post("/quizzes/admin/retake-permissions", data);

export const revokeQuizRetakePermission = (permissionId) =>
  axios.patch(`/quizzes/admin/retake-permissions/${permissionId}/revoke`);

export const getMyRetakePermissions = () =>
  axios.get("/quizzes/retake-permissions/me");

/////vehicle api

const formDataConfig = {
  headers: {
    "Content-Type": "multipart/form-data",
  },
};

export const getMyTeacherVehicles = () => axios.get("/teachers/vehicles");

export const createTeacherVehicle = (formData) =>
  axios.post("/teachers/vehicles", formData, formDataConfig);

export const updateTeacherVehicle = (vehicleId, formData) =>
  axios.patch(`/teachers/vehicles/${vehicleId}`, formData, formDataConfig);

export const getAdminTeacherVehicles = (params = {}) =>
  axios.get("/admin/teacher-vehicles", { params });

export const getAdminTeacherVehicleById = (vehicleId) =>
  axios.get(`/admin/teacher-vehicles/${vehicleId}`);

export const updateAdminTeacherVehicleApproval = (
  vehicleId,
  approvalStatus,
  adminNote = "",
) =>
  axios.patch(`/admin/teacher-vehicles/${vehicleId}/approval`, {
    approvalStatus,
    adminNote,
  });

export const deleteAdminTeacherVehicle = (vehicleId) =>
  axios.delete(`/admin/teacher-vehicles/${vehicleId}`);

/////////////////////////teacher booking

export const getNearbyTeachers = (params) =>
  axios.get("/teachers/nearby", { params });

export const getTeacherLocations = () => axios.get("/teachers/locations");

export const createTeacherLocation = (payload) =>
  axios.post("/teachers/locations", payload);

export const updateTeacherLocation = (locationId, payload) =>
  axios.patch(`/teachers/locations/${locationId}`, payload);

export const deleteTeacherLocation = (locationId) =>
  axios.delete(`/teachers/locations/${locationId}`);

export const getTeacherAvailability = () => axios.get("/teachers/availability");

export const updateTeacherAvailability = (payload) =>
  axios.put("/teachers/availability", payload);

export const getAvailableBookingSlots = (params) =>
  axios.get("/bookings/available-slots", { params });

export const createLocationBooking = (payload) =>
  axios.post("/bookings", payload);

export const getLocationBookings = (params = {}) =>
  axios.get("/bookings", { params });

export const cancelLocationBooking = (bookingId, payload) =>
  axios.patch(`/bookings/${bookingId}/cancel`, payload);

export const confirmLocationBooking = (bookingId) =>
  axios.patch(`/bookings/${bookingId}/confirm`);

export const rejectLocationBooking = (bookingId, payload) =>
  axios.patch(`/bookings/${bookingId}/reject`, payload);

////////////////////////////
