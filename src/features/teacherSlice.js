import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  getPublicTeachers,
  getTeacherDashboard,
  getTeacherProfile,
  updateTeacherProfile,
  getTeacherVehicles,
  addTeacherVehicle,
  getTeacherLocations,
  addTeacherLocation,
  getTeacherReviews,
} from "./API";

const getErrorMessage = (error, fallback) => {
  return (
    error?.response?.data?.message ||
    error?.response?.data?.error ||
    error?.message ||
    fallback
  );
};

export const fetchPublicTeachers = createAsyncThunk(
  "teacher/fetchPublicTeachers",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await getPublicTeachers();
      return data;
    } catch (error) {
      return rejectWithValue(getErrorMessage(error, "Failed to fetch teachers"));
    }
  }
);

export const fetchTeacherDashboard = createAsyncThunk(
  "teacher/fetchTeacherDashboard",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await getTeacherDashboard();
      return data;
    } catch (error) {
      return rejectWithValue(getErrorMessage(error, "Failed to fetch dashboard"));
    }
  }
);

export const fetchTeacherProfile = createAsyncThunk(
  "teacher/fetchTeacherProfile",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await getTeacherProfile();
      return data;
    } catch (error) {
      return rejectWithValue(getErrorMessage(error, "Failed to fetch profile"));
    }
  }
);

export const updateTeacher = createAsyncThunk(
  "teacher/updateTeacher",
  async (formData, { rejectWithValue }) => {
    try {
      const { data } = await updateTeacherProfile(formData);
      return data;
    } catch (error) {
      return rejectWithValue(getErrorMessage(error, "Failed to update profile"));
    }
  }
);

export const fetchTeacherVehicles = createAsyncThunk(
  "teacher/fetchTeacherVehicles",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await getTeacherVehicles();
      return data;
    } catch (error) {
      return rejectWithValue(getErrorMessage(error, "Failed to fetch vehicles"));
    }
  }
);

export const createTeacherVehicle = createAsyncThunk(
  "teacher/createTeacherVehicle",
  async (formData, { rejectWithValue }) => {
    try {
      const { data } = await addTeacherVehicle(formData);
      return data;
    } catch (error) {
      return rejectWithValue(getErrorMessage(error, "Failed to add vehicle"));
    }
  }
);

export const fetchTeacherLocations = createAsyncThunk(
  "teacher/fetchTeacherLocations",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await getTeacherLocations();
      return data;
    } catch (error) {
      return rejectWithValue(getErrorMessage(error, "Failed to fetch locations"));
    }
  }
);

export const createTeacherLocation = createAsyncThunk(
  "teacher/createTeacherLocation",
  async (formData, { rejectWithValue }) => {
    try {
      const { data } = await addTeacherLocation(formData);
      return data;
    } catch (error) {
      return rejectWithValue(getErrorMessage(error, "Failed to add location"));
    }
  }
);

export const fetchTeacherReviews = createAsyncThunk(
  "teacher/fetchTeacherReviews",
  async (teacherId, { rejectWithValue }) => {
    try {
      const { data } = await getTeacherReviews(teacherId);
      return data;
    } catch (error) {
      return rejectWithValue(getErrorMessage(error, "Failed to fetch reviews"));
    }
  }
);

const initialState = {
  teachers: [],
  teacherDashboard: null,
  teacherProfile: null,
  vehicles: [],
  locations: [],
  reviews: [],
  loading: false,
  error: null,
  success: false,
  message: null,
};

const teacherSlice = createSlice({
  name: "teacher",
  initialState,
  reducers: {
    clearTeacherState: (state) => {
      state.loading = false;
      state.error = null;
      state.success = false;
      state.message = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPublicTeachers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPublicTeachers.fulfilled, (state, action) => {
        state.loading = false;
        const payload = action.payload?.data || action.payload;
        state.teachers = Array.isArray(payload) ? payload : payload?.teachers || [];
      })
      .addCase(fetchPublicTeachers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(fetchTeacherDashboard.fulfilled, (state, action) => {
        state.teacherDashboard = action.payload?.data || action.payload;
      })
      .addCase(fetchTeacherProfile.fulfilled, (state, action) => {
        state.teacherProfile = action.payload?.data || action.payload;
      })
      .addCase(updateTeacher.fulfilled, (state, action) => {
        state.success = true;
        state.teacherProfile = action.payload?.data || action.payload;
        state.message = action.payload?.message || "Teacher profile updated";
      })
      .addCase(fetchTeacherVehicles.fulfilled, (state, action) => {
        const payload = action.payload?.data || action.payload;
        state.vehicles = Array.isArray(payload) ? payload : payload?.vehicles || [];
      })
      .addCase(createTeacherVehicle.fulfilled, (state, action) => {
        state.success = true;
        state.message = action.payload?.message || "Vehicle added";
      })
      .addCase(fetchTeacherLocations.fulfilled, (state, action) => {
        const payload = action.payload?.data || action.payload;
        state.locations = Array.isArray(payload) ? payload : payload?.locations || [];
      })
      .addCase(createTeacherLocation.fulfilled, (state, action) => {
        state.success = true;
        state.message = action.payload?.message || "Location added";
      })
      .addCase(fetchTeacherReviews.fulfilled, (state, action) => {
        const payload = action.payload?.data || action.payload;
        state.reviews = Array.isArray(payload) ? payload : payload?.reviews || [];
      });
  },
});

export const { clearTeacherState } = teacherSlice.actions;
export default teacherSlice.reducer;
