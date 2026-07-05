import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  createBooking,
  getBookings,
  getBooking,
  confirmBooking,
  cancelBooking,
  getLessons,
  getLesson,
  startLesson,
  confirmAttendance,
  completeLesson,
  createPayment,
  verifyPayment,
  getPayments,
  getInvoices,
  getInvoice,
} from "./API";

const getErrorMessage = (error, fallback) => {
  return (
    error?.response?.data?.message ||
    error?.response?.data?.error ||
    error?.message ||
    fallback
  );
};

export const addBooking = createAsyncThunk("booking/addBooking", async (formData, { rejectWithValue }) => {
  try {
    const { data } = await createBooking(formData);
    return data;
  } catch (error) {
    return rejectWithValue(getErrorMessage(error, "Booking failed"));
  }
});

export const fetchBookings = createAsyncThunk("booking/fetchBookings", async (_, { rejectWithValue }) => {
  try {
    const { data } = await getBookings();
    return data;
  } catch (error) {
    return rejectWithValue(getErrorMessage(error, "Failed to fetch bookings"));
  }
});

export const fetchBooking = createAsyncThunk("booking/fetchBooking", async (id, { rejectWithValue }) => {
  try {
    const { data } = await getBooking(id);
    return data;
  } catch (error) {
    return rejectWithValue(getErrorMessage(error, "Failed to fetch booking"));
  }
});

export const bookingConfirm = createAsyncThunk("booking/confirm", async (id, { rejectWithValue }) => {
  try {
    const { data } = await confirmBooking(id);
    return data;
  } catch (error) {
    return rejectWithValue(getErrorMessage(error, "Booking confirmation failed"));
  }
});

export const bookingCancel = createAsyncThunk("booking/cancel", async (id, { rejectWithValue }) => {
  try {
    const { data } = await cancelBooking(id);
    return data;
  } catch (error) {
    return rejectWithValue(getErrorMessage(error, "Booking cancellation failed"));
  }
});

export const fetchLessons = createAsyncThunk("booking/fetchLessons", async (_, { rejectWithValue }) => {
  try {
    const { data } = await getLessons();
    return data;
  } catch (error) {
    return rejectWithValue(getErrorMessage(error, "Failed to fetch lessons"));
  }
});

export const fetchLesson = createAsyncThunk("booking/fetchLesson", async (id, { rejectWithValue }) => {
  try {
    const { data } = await getLesson(id);
    return data;
  } catch (error) {
    return rejectWithValue(getErrorMessage(error, "Failed to fetch lesson"));
  }
});

export const lessonStart = createAsyncThunk("booking/lessonStart", async (id, { rejectWithValue }) => {
  try {
    const { data } = await startLesson(id);
    return data;
  } catch (error) {
    return rejectWithValue(getErrorMessage(error, "Failed to start lesson"));
  }
});

export const attendanceConfirm = createAsyncThunk(
  "booking/attendanceConfirm",
  async ({ id, formData }, { rejectWithValue }) => {
    try {
      const { data } = await confirmAttendance(id, formData);
      return data;
    } catch (error) {
      return rejectWithValue(getErrorMessage(error, "Attendance confirmation failed"));
    }
  }
);

export const lessonComplete = createAsyncThunk("booking/lessonComplete", async (id, { rejectWithValue }) => {
  try {
    const { data } = await completeLesson(id);
    return data;
  } catch (error) {
    return rejectWithValue(getErrorMessage(error, "Failed to complete lesson"));
  }
});

export const addPayment = createAsyncThunk("booking/addPayment", async (formData, { rejectWithValue }) => {
  try {
    const { data } = await createPayment(formData);
    return data;
  } catch (error) {
    return rejectWithValue(getErrorMessage(error, "Payment failed"));
  }
});

export const paymentVerify = createAsyncThunk(
  "booking/paymentVerify",
  async ({ id, formData }, { rejectWithValue }) => {
    try {
      const { data } = await verifyPayment(id, formData);
      return data;
    } catch (error) {
      return rejectWithValue(getErrorMessage(error, "Payment verification failed"));
    }
  }
);

export const fetchPayments = createAsyncThunk("booking/fetchPayments", async (_, { rejectWithValue }) => {
  try {
    const { data } = await getPayments();
    return data;
  } catch (error) {
    return rejectWithValue(getErrorMessage(error, "Failed to fetch payments"));
  }
});

export const fetchInvoices = createAsyncThunk("booking/fetchInvoices", async (_, { rejectWithValue }) => {
  try {
    const { data } = await getInvoices();
    return data;
  } catch (error) {
    return rejectWithValue(getErrorMessage(error, "Failed to fetch invoices"));
  }
});

export const fetchInvoice = createAsyncThunk("booking/fetchInvoice", async (id, { rejectWithValue }) => {
  try {
    const { data } = await getInvoice(id);
    return data;
  } catch (error) {
    return rejectWithValue(getErrorMessage(error, "Failed to fetch invoice"));
  }
});

const initialState = {
  bookings: [],
  booking: null,
  lessons: [],
  lesson: null,
  payments: [],
  invoices: [],
  invoice: null,
  loading: false,
  error: null,
  success: false,
  message: null,
};

const bookingSlice = createSlice({
  name: "booking",
  initialState,
  reducers: {
    clearBookingState: (state) => {
      state.loading = false;
      state.error = null;
      state.success = false;
      state.message = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addMatcher(
        (action) => action.type.startsWith("booking/") && action.type.endsWith("/pending"),
        (state) => {
          state.loading = true;
          state.error = null;
          state.success = false;
        }
      )
      .addMatcher(
        (action) => action.type.startsWith("booking/") && action.type.endsWith("/rejected"),
        (state, action) => {
          state.loading = false;
          state.error = action.payload;
        }
      )

      .addCase(addBooking.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.message = action.payload?.message || "Booking created";
      })
      .addCase(fetchBookings.fulfilled, (state, action) => {
        state.loading = false;
        const payload = action.payload?.data || action.payload;
        state.bookings = Array.isArray(payload) ? payload : payload?.bookings || [];
      })
      .addCase(fetchBooking.fulfilled, (state, action) => {
        state.loading = false;
        state.booking = action.payload?.data || action.payload;
      })
      .addCase(fetchLessons.fulfilled, (state, action) => {
        state.loading = false;
        const payload = action.payload?.data || action.payload;
        state.lessons = Array.isArray(payload) ? payload : payload?.lessons || [];
      })
      .addCase(fetchLesson.fulfilled, (state, action) => {
        state.loading = false;
        state.lesson = action.payload?.data || action.payload;
      })
      .addCase(fetchPayments.fulfilled, (state, action) => {
        state.loading = false;
        const payload = action.payload?.data || action.payload;
        state.payments = Array.isArray(payload) ? payload : payload?.payments || [];
      })
      .addCase(fetchInvoices.fulfilled, (state, action) => {
        state.loading = false;
        const payload = action.payload?.data || action.payload;
        state.invoices = Array.isArray(payload) ? payload : payload?.invoices || [];
      })
      .addCase(fetchInvoice.fulfilled, (state, action) => {
        state.loading = false;
        state.invoice = action.payload?.data || action.payload;
      });
  },
});

export const { clearBookingState } = bookingSlice.actions;
export default bookingSlice.reducer;
