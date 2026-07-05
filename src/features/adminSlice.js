import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  getAdminDashboard,
  getAdminUsers,
  updateUserStatus,
  verifyTeacher,
  getDocuments,
  reviewDocument,
  getSupportTickets,
  replySupportTicket,
  getNotifications,
  markNotificationAsRead,
  getMyReferral,
  createExamRequest,
  getMyExams,
  updateExam,
} from "./API";

const getErrorMessage = (error, fallback) => {
  return (
    error?.response?.data?.message ||
    error?.response?.data?.error ||
    error?.message ||
    fallback
  );
};

export const fetchAdminDashboard = createAsyncThunk("admin/fetchDashboard", async (_, { rejectWithValue }) => {
  try {
    const { data } = await getAdminDashboard();
    return data;
  } catch (error) {
    return rejectWithValue(getErrorMessage(error, "Failed to fetch admin dashboard"));
  }
});

export const fetchAdminUsers = createAsyncThunk("admin/fetchUsers", async (_, { rejectWithValue }) => {
  try {
    const { data } = await getAdminUsers();
    return data;
  } catch (error) {
    return rejectWithValue(getErrorMessage(error, "Failed to fetch users"));
  }
});

export const changeUserStatus = createAsyncThunk(
  "admin/changeUserStatus",
  async ({ id, status }, { rejectWithValue }) => {
    try {
      const { data } = await updateUserStatus(id, status);
      return data;
    } catch (error) {
      return rejectWithValue(getErrorMessage(error, "Failed to update user status"));
    }
  }
);

export const teacherVerify = createAsyncThunk("admin/teacherVerify", async (teacherId, { rejectWithValue }) => {
  try {
    const { data } = await verifyTeacher(teacherId);
    return data;
  } catch (error) {
    return rejectWithValue(getErrorMessage(error, "Teacher verification failed"));
  }
});

export const fetchDocuments = createAsyncThunk("admin/fetchDocuments", async (_, { rejectWithValue }) => {
  try {
    const { data } = await getDocuments();
    return data;
  } catch (error) {
    return rejectWithValue(getErrorMessage(error, "Failed to fetch documents"));
  }
});

export const documentReview = createAsyncThunk(
  "admin/documentReview",
  async ({ id, formData }, { rejectWithValue }) => {
    try {
      const { data } = await reviewDocument(id, formData);
      return data;
    } catch (error) {
      return rejectWithValue(getErrorMessage(error, "Document review failed"));
    }
  }
);

export const fetchSupportTickets = createAsyncThunk("admin/fetchSupportTickets", async (_, { rejectWithValue }) => {
  try {
    const { data } = await getSupportTickets();
    return data;
  } catch (error) {
    return rejectWithValue(getErrorMessage(error, "Failed to fetch tickets"));
  }
});

export const replyTicket = createAsyncThunk(
  "admin/replyTicket",
  async ({ id, formData }, { rejectWithValue }) => {
    try {
      const { data } = await replySupportTicket(id, formData);
      return data;
    } catch (error) {
      return rejectWithValue(getErrorMessage(error, "Reply failed"));
    }
  }
);

export const fetchNotifications = createAsyncThunk("admin/fetchNotifications", async (_, { rejectWithValue }) => {
  try {
    const { data } = await getNotifications();
    return data;
  } catch (error) {
    return rejectWithValue(getErrorMessage(error, "Failed to fetch notifications"));
  }
});

export const readNotification = createAsyncThunk("admin/readNotification", async (id, { rejectWithValue }) => {
  try {
    const { data } = await markNotificationAsRead(id);
    return data;
  } catch (error) {
    return rejectWithValue(getErrorMessage(error, "Failed to mark notification"));
  }
});

export const fetchMyReferral = createAsyncThunk("admin/fetchMyReferral", async (_, { rejectWithValue }) => {
  try {
    const { data } = await getMyReferral();
    return data;
  } catch (error) {
    return rejectWithValue(getErrorMessage(error, "Failed to fetch referral"));
  }
});

export const addExamRequest = createAsyncThunk("admin/addExamRequest", async (formData, { rejectWithValue }) => {
  try {
    const { data } = await createExamRequest(formData);
    return data;
  } catch (error) {
    return rejectWithValue(getErrorMessage(error, "Exam request failed"));
  }
});

export const fetchMyExams = createAsyncThunk("admin/fetchMyExams", async (_, { rejectWithValue }) => {
  try {
    const { data } = await getMyExams();
    return data;
  } catch (error) {
    return rejectWithValue(getErrorMessage(error, "Failed to fetch exams"));
  }
});

export const examUpdate = createAsyncThunk(
  "admin/examUpdate",
  async ({ id, formData }, { rejectWithValue }) => {
    try {
      const { data } = await updateExam(id, formData);
      return data;
    } catch (error) {
      return rejectWithValue(getErrorMessage(error, "Exam update failed"));
    }
  }
);

const initialState = {
  dashboard: null,
  users: [],
  documents: [],
  tickets: [],
  notifications: [],
  referral: null,
  exams: [],
  loading: false,
  error: null,
  success: false,
  message: null,
};

const adminSlice = createSlice({
  name: "admin",
  initialState,
  reducers: {
    clearAdminState: (state) => {
      state.loading = false;
      state.error = null;
      state.success = false;
      state.message = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addMatcher(
        (action) => action.type.startsWith("admin/") && action.type.endsWith("/pending"),
        (state) => {
          state.loading = true;
          state.error = null;
          state.success = false;
        }
      )
      .addMatcher(
        (action) => action.type.startsWith("admin/") && action.type.endsWith("/rejected"),
        (state, action) => {
          state.loading = false;
          state.error = action.payload;
        }
      )
      .addCase(fetchAdminDashboard.fulfilled, (state, action) => {
        state.loading = false;
        state.dashboard = action.payload?.data || action.payload;
      })
      .addCase(fetchAdminUsers.fulfilled, (state, action) => {
        state.loading = false;
        const payload = action.payload?.data || action.payload;
        state.users = Array.isArray(payload) ? payload : payload?.users || [];
      })
      .addCase(fetchDocuments.fulfilled, (state, action) => {
        state.loading = false;
        const payload = action.payload?.data || action.payload;
        state.documents = Array.isArray(payload) ? payload : payload?.documents || [];
      })
      .addCase(fetchSupportTickets.fulfilled, (state, action) => {
        state.loading = false;
        const payload = action.payload?.data || action.payload;
        state.tickets = Array.isArray(payload) ? payload : payload?.tickets || [];
      })
      .addCase(fetchNotifications.fulfilled, (state, action) => {
        state.loading = false;
        const payload = action.payload?.data || action.payload;
        state.notifications = Array.isArray(payload) ? payload : payload?.notifications || [];
      })
      .addCase(fetchMyReferral.fulfilled, (state, action) => {
        state.loading = false;
        state.referral = action.payload?.data || action.payload;
      })
      .addCase(fetchMyExams.fulfilled, (state, action) => {
        state.loading = false;
        const payload = action.payload?.data || action.payload;
        state.exams = Array.isArray(payload) ? payload : payload?.exams || [];
      });
  },
});

export const { clearAdminState } = adminSlice.actions;
export default adminSlice.reducer;
