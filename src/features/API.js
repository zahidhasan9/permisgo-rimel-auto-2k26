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
export const getPublicTeachers = () => axios.get("/teachers/public");
export const getTeacherDashboard = () => axios.get("/teachers/dashboard");
export const getTeacherProfile = () => axios.get("/teachers/profile");
export const updateTeacherProfile = (data) =>
  axios.patch("/teachers/profile", data);
export const getTeacherVehicles = () => axios.get("/teachers/vehicles");
export const addTeacherVehicle = (data) =>
  axios.post("/teachers/vehicles", data);
export const getTeacherLocations = () => axios.get("/teachers/locations");
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
  return axiosInstance.patch(`/admin/teachers/${teacherId}/verify`, {
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
// ========================
export const createBooking = (data) => axios.post("/bookings", data);
export const getBookings = () => axios.get("/bookings");
export const getBooking = (id) => axios.get(`/bookings/${id}`);
export const confirmBooking = (id) => axios.patch(`/bookings/${id}/confirm`);
export const cancelBooking = (id) => axios.patch(`/bookings/${id}/cancel`);

// =======================
// Lessons
// =======================
export const getLessons = () => axios.get("/lessons");
export const getLesson = (id) => axios.get(`/lessons/${id}`);
export const startLesson = (id) => axios.patch(`/lessons/${id}/start`);
export const confirmAttendance = (id, data) =>
  axios.patch(`/lessons/${id}/attendance`, data);
export const completeLesson = (id) => axios.patch(`/lessons/${id}/complete`);

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
export const uploadDocument = (formData) =>
  axios.post("/documents", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
export const getDocuments = () => axios.get("/documents");
export const reviewDocument = (id, data) =>
  axios.patch(`/documents/${id}/review`, data);

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

// =======================
// Code Quiz APIs
// Add at the bottom of src/features/API.js
// =======================

export const getStudentCodeQuizzes = () => axios.get("/quizzes");

export const startCodeQuizAttempt = (quizId) =>
  axios.post(`/quizzes/${quizId}/attempts/start`);

export const submitCodeQuizAnswer = (attemptId, data) =>
  axios.post(`/quizzes/attempts/${attemptId}/answer`, data);

export const finishCodeQuizAttempt = (attemptId) =>
  axios.post(`/quizzes/attempts/${attemptId}/finish`);

export const getMyCodeQuizAttempts = () => axios.get("/quizzes/attempts/me");

export const getCodeQuizAttemptReview = (attemptId) =>
  axios.get(`/quizzes/attempts/${attemptId}/review`);
// --------------------------------------------

export const getQuizzes = () => axios.get("/quizzes");
export const getQuizQuestions = (quizId) =>
  axios.get(`/quizzes/${quizId}/questions`);
export const getRoadSigns = () => axios.get("/quizzes/road-signs/list");
export const createQuiz = (data) => axios.post("/quizzes", data);

export const createQuizQuestion = (quizId, data) =>
  axios.post(`/quizzes/${quizId}/questions`, data);

export const createRoadSign = (data) => axios.post("/quizzes/road-signs", data);

export const getAdminQuizzes = (params = {}) =>
  axios.get("/quizzes/admin/all", { params });

export const getAdminQuizStats = () => axios.get("/quizzes/admin/stats");

export const getQuizById = (quizId) => axios.get(`/quizzes/${quizId}`);
export const updateQuiz = (quizId, data) =>
  axios.patch(`/quizzes/${quizId}`, data, {
    headers:
      data instanceof FormData ? { "Content-Type": "multipart/form-data" } : {},
  });
export const deleteQuiz = (quizId) => axios.delete(`/quizzes/${quizId}`);

export const getAdminQuizQuestions = (quizId) =>
  axios.get(`/quizzes/${quizId}/admin-questions`);
export const getQuestionById = (questionId) =>
  axios.get(`/quizzes/questions/${questionId}`);
export const createQuizWithForm = (data) =>
  axios.post("/quizzes", data, {
    headers:
      data instanceof FormData ? { "Content-Type": "multipart/form-data" } : {},
  });
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

export const startQuizAttempt = (quizId) =>
  axios.post(`/quizzes/${quizId}/attempts/start`);
export const submitQuizAnswer = (attemptId, data) =>
  axios.post(`/quizzes/attempts/${attemptId}/answer`, data);
export const finishQuizAttempt = (attemptId) =>
  axios.post(`/quizzes/attempts/${attemptId}/finish`);
export const getMyQuizAttempts = () => axios.get("/quizzes/attempts/me");
export const getQuizAttemptReview = (attemptId) =>
  axios.get(`/quizzes/attempts/${attemptId}/review`);
export const getAdminQuizAttempts = () => axios.get("/quizzes/admin/attempts");

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
