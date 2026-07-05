import axios from "../Apiutils/axiosInstance";

// =======================
// Auth / User
// =======================
export const registerUser = (userData) => axios.post("/auth/register", userData);
export const loginUser = (userData) => axios.post("/auth/login", userData);
export const getLoggedInUser = () => axios.get("/auth/me");
export const forgotPassword = (data) => axios.post("/auth/forgot-password", data);
export const resetPassword = (data) => axios.post("/auth/reset-password", data);

// =======================
// Student
// =======================
export const getStudentDashboard = () => axios.get("/students/dashboard");
export const getStudentProfile = () => axios.get("/students/profile");
export const updateStudentProfile = (data) => axios.patch("/students/profile", data);
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
export const updateTeacherProfile = (data) => axios.patch("/teachers/profile", data);
export const getTeacherVehicles = () => axios.get("/teachers/vehicles");
export const addTeacherVehicle = (data) => axios.post("/teachers/vehicles", data);
export const getTeacherLocations = () => axios.get("/teachers/locations");
export const addTeacherLocation = (data) => axios.post("/teachers/locations", data);

// =======================
// Admin
// =======================
export const getAdminDashboard = () => axios.get("/admin/dashboard");
export const getAdminUsers = () => axios.get("/admin/users");
export const updateUserStatus = (id, status) =>
  axios.patch(`/admin/users/${id}/status`, { status });
export const verifyTeacher = (teacherId) =>
  axios.patch(`/admin/teachers/${teacherId}/verify`);

// =======================
// Offers / Packages
// =======================
export const getOffers = () => axios.get("/offers");
export const getPackages = () => axios.get("/offers/packages");
export const getOfferBySlug = (slug) => axios.get(`/offers/${slug}`);
export const createOffer = (data) => axios.post("/offers", data);
export const updateOffer = (id, data) => axios.patch(`/offers/${id}`, data);
export const deleteOffer = (id) => axios.delete(`/offers/${id}`);
export const createPackage = (data) => axios.post("/offers/packages/create", data);

// =======================
// Bookings
// =======================
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
export const verifyPayment = (id, data) => axios.patch(`/payments/${id}/verify`, data);
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
export const reviewDocument = (id, data) => axios.patch(`/documents/${id}/review`, data);

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
export const updateTestimonial = (id, data) => axios.patch(`/testimonials/${id}`, data);
export const deleteTestimonial = (id) => axios.delete(`/testimonials/${id}`);

// =======================
// Support
// =======================
export const createPublicTicket = (data) => axios.post("/support/public", data);
export const createSupportTicket = (data) => axios.post("/support", data);
export const getSupportTickets = () => axios.get("/support");
export const replySupportTicket = (id, data) => axios.patch(`/support/${id}/reply`, data);

// =======================
// Notifications
// =======================
export const getNotifications = () => axios.get("/notifications");
export const markNotificationAsRead = (id) => axios.patch(`/notifications/${id}/read`);

// =======================
// Reviews
// =======================
export const getTeacherReviews = (teacherId) => axios.get(`/reviews/teacher/${teacherId}`);
export const createReview = (data) => axios.post("/reviews", data);

// =======================
// Referrals
// =======================
export const getMyReferral = () => axios.get("/referrals/me");

// =======================
// Quizzes / Road Signs
// =======================
export const getQuizzes = () => axios.get("/quizzes");
export const getQuizQuestions = (quizId) => axios.get(`/quizzes/${quizId}/questions`);
export const getRoadSigns = () => axios.get("/quizzes/road-signs/list");
export const createQuiz = (data) => axios.post("/quizzes", data);
export const createQuizQuestion = (data) => axios.post("/quizzes/questions", data);
export const createRoadSign = (data) => axios.post("/quizzes/road-signs", data);

// =======================
// Exams
// =======================
export const createExamRequest = (data) => axios.post("/exams", data);
export const getMyExams = () => axios.get("/exams/me");
export const updateExam = (id, data) => axios.patch(`/exams/${id}`, data);
