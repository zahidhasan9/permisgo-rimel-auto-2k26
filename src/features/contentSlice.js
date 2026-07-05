import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  getOffers,
  getPackages,
  getOfferBySlug,
  createOffer,
  updateOffer,
  deleteOffer,
  createPackage,
  getBlogs,
  getBlog,
  createBlog,
  updateBlog,
  deleteBlog,
  getFaqs,
  createFaq,
  updateFaq,
  deleteFaq,
  getTestimonials,
  createTestimonial,
  updateTestimonial,
  deleteTestimonial,
  createPublicTicket,
  createSupportTicket,
  getQuizzes,
  getQuizQuestions,
  getRoadSigns,
  createQuiz,
  createQuizQuestion,
  createRoadSign,
} from "./API";

const getErrorMessage = (error, fallback) => {
  return (
    error?.response?.data?.message ||
    error?.response?.data?.error ||
    error?.message ||
    fallback
  );
};

const makeThunk = (type, apiCall, fallback) =>
  createAsyncThunk(type, async (payload, { rejectWithValue }) => {
    try {
      const { data } = await apiCall(payload);
      return data;
    } catch (error) {
      return rejectWithValue(getErrorMessage(error, fallback));
    }
  });

export const fetchOffers = makeThunk("content/fetchOffers", getOffers, "Failed to fetch offers");
export const fetchPackages = makeThunk("content/fetchPackages", getPackages, "Failed to fetch packages");
export const fetchOffer = makeThunk("content/fetchOffer", getOfferBySlug, "Failed to fetch offer");
export const addOffer = makeThunk("content/addOffer", createOffer, "Failed to create offer");
export const editOffer = createAsyncThunk("content/editOffer", async ({ id, formData }, { rejectWithValue }) => {
  try {
    const { data } = await updateOffer(id, formData);
    return data;
  } catch (error) {
    return rejectWithValue(getErrorMessage(error, "Failed to update offer"));
  }
});
export const removeOffer = makeThunk("content/removeOffer", deleteOffer, "Failed to delete offer");
export const addPackage = makeThunk("content/addPackage", createPackage, "Failed to create package");

export const fetchBlogs = makeThunk("content/fetchBlogs", getBlogs, "Failed to fetch blogs");
export const fetchBlog = makeThunk("content/fetchBlog", getBlog, "Failed to fetch blog");
export const addBlog = makeThunk("content/addBlog", createBlog, "Failed to create blog");
export const editBlog = createAsyncThunk("content/editBlog", async ({ id, formData }, { rejectWithValue }) => {
  try {
    const { data } = await updateBlog(id, formData);
    return data;
  } catch (error) {
    return rejectWithValue(getErrorMessage(error, "Failed to update blog"));
  }
});
export const removeBlog = makeThunk("content/removeBlog", deleteBlog, "Failed to delete blog");

export const fetchFaqs = makeThunk("content/fetchFaqs", getFaqs, "Failed to fetch FAQs");
export const addFaq = makeThunk("content/addFaq", createFaq, "Failed to create FAQ");
export const editFaq = createAsyncThunk("content/editFaq", async ({ id, formData }, { rejectWithValue }) => {
  try {
    const { data } = await updateFaq(id, formData);
    return data;
  } catch (error) {
    return rejectWithValue(getErrorMessage(error, "Failed to update FAQ"));
  }
});
export const removeFaq = makeThunk("content/removeFaq", deleteFaq, "Failed to delete FAQ");

export const fetchTestimonials = makeThunk("content/fetchTestimonials", getTestimonials, "Failed to fetch testimonials");
export const addTestimonial = makeThunk("content/addTestimonial", createTestimonial, "Failed to create testimonial");
export const editTestimonial = createAsyncThunk(
  "content/editTestimonial",
  async ({ id, formData }, { rejectWithValue }) => {
    try {
      const { data } = await updateTestimonial(id, formData);
      return data;
    } catch (error) {
      return rejectWithValue(getErrorMessage(error, "Failed to update testimonial"));
    }
  }
);
export const removeTestimonial = makeThunk(
  "content/removeTestimonial",
  deleteTestimonial,
  "Failed to delete testimonial"
);

export const addPublicTicket = makeThunk("content/addPublicTicket", createPublicTicket, "Ticket submit failed");
export const addSupportTicket = makeThunk("content/addSupportTicket", createSupportTicket, "Ticket submit failed");

export const fetchQuizzes = makeThunk("content/fetchQuizzes", getQuizzes, "Failed to fetch quizzes");
export const fetchQuizQuestions = makeThunk("content/fetchQuizQuestions", getQuizQuestions, "Failed to fetch questions");
export const fetchRoadSigns = makeThunk("content/fetchRoadSigns", getRoadSigns, "Failed to fetch road signs");
export const addQuiz = makeThunk("content/addQuiz", createQuiz, "Failed to create quiz");
export const addQuizQuestion = makeThunk("content/addQuizQuestion", createQuizQuestion, "Failed to create question");
export const addRoadSign = makeThunk("content/addRoadSign", createRoadSign, "Failed to create road sign");

const initialState = {
  offers: [],
  packages: [],
  offer: null,
  blogs: [],
  blog: null,
  faqs: [],
  testimonials: [],
  quizzes: [],
  quizQuestions: [],
  roadSigns: [],
  loading: false,
  error: null,
  success: false,
  message: null,
};

const contentSlice = createSlice({
  name: "content",
  initialState,
  reducers: {
    clearContentState: (state) => {
      state.loading = false;
      state.error = null;
      state.success = false;
      state.message = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addMatcher(
        (action) => action.type.startsWith("content/") && action.type.endsWith("/pending"),
        (state) => {
          state.loading = true;
          state.error = null;
          state.success = false;
        }
      )
      .addMatcher(
        (action) => action.type.startsWith("content/") && action.type.endsWith("/rejected"),
        (state, action) => {
          state.loading = false;
          state.error = action.payload;
        }
      )
      .addMatcher(
        (action) => action.type.startsWith("content/") && action.type.endsWith("/fulfilled"),
        (state, action) => {
          state.loading = false;
          state.success = true;
          state.message = action.payload?.message || null;
        }
      )
      .addCase(fetchOffers.fulfilled, (state, action) => {
        state.loading = false;
        const payload = action.payload?.data || action.payload;
        state.offers = Array.isArray(payload) ? payload : payload?.offers || [];
      })
      .addCase(fetchPackages.fulfilled, (state, action) => {
        state.loading = false;
        const payload = action.payload?.data || action.payload;
        state.packages = Array.isArray(payload) ? payload : payload?.packages || [];
      })
      .addCase(fetchOffer.fulfilled, (state, action) => {
        state.loading = false;
        state.offer = action.payload?.data || action.payload;
      })
      .addCase(fetchBlogs.fulfilled, (state, action) => {
        state.loading = false;
        const payload = action.payload?.data || action.payload;
        state.blogs = Array.isArray(payload) ? payload : payload?.blogs || [];
      })
      .addCase(fetchBlog.fulfilled, (state, action) => {
        state.loading = false;
        state.blog = action.payload?.data || action.payload;
      })
      .addCase(fetchFaqs.fulfilled, (state, action) => {
        state.loading = false;
        const payload = action.payload?.data || action.payload;
        state.faqs = Array.isArray(payload) ? payload : payload?.faqs || [];
      })
      .addCase(fetchTestimonials.fulfilled, (state, action) => {
        state.loading = false;
        const payload = action.payload?.data || action.payload;
        state.testimonials = Array.isArray(payload) ? payload : payload?.testimonials || [];
      })
      .addCase(fetchQuizzes.fulfilled, (state, action) => {
        state.loading = false;
        const payload = action.payload?.data || action.payload;
        state.quizzes = Array.isArray(payload) ? payload : payload?.quizzes || [];
      })
      .addCase(fetchQuizQuestions.fulfilled, (state, action) => {
        state.loading = false;
        const payload = action.payload?.data || action.payload;
        state.quizQuestions = Array.isArray(payload) ? payload : payload?.questions || [];
      })
      .addCase(fetchRoadSigns.fulfilled, (state, action) => {
        state.loading = false;
        const payload = action.payload?.data || action.payload;
        state.roadSigns = Array.isArray(payload) ? payload : payload?.roadSigns || [];
      });
  },
});

export const { clearContentState } = contentSlice.actions;
export default contentSlice.reducer;
