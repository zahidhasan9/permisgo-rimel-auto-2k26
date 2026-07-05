import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  registerUser,
  loginUser,
  getLoggedInUser,
  forgotPassword,
  resetPassword,
  getStudentDashboard,
  getStudentProfile,
  updateStudentProfile,
  addFavoriteTeacher,
  removeFavoriteTeacher,
} from "./API";

const getToken = () => {
  if (typeof window === "undefined") return null;
  return localStorage.getItem("token");
};

const getErrorMessage = (error, fallback) => {
  return (
    error?.response?.data?.message ||
    error?.response?.data?.error ||
    error?.message ||
    fallback
  );
};

export const register = createAsyncThunk("user/register", async (userData, { rejectWithValue }) => {
  try {
    const { data } = await registerUser(userData);
    return data;
  } catch (error) {
    return rejectWithValue(getErrorMessage(error, "Registration failed"));
  }
});

export const login = createAsyncThunk("user/login", async (userData, { rejectWithValue }) => {
  try {
    const { data } = await loginUser(userData);
    return data;
  } catch (error) {
    return rejectWithValue(getErrorMessage(error, "Login failed"));
  }
});

export const fetchLoggedInUser = createAsyncThunk(
  "user/fetchLoggedInUser",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await getLoggedInUser();
      return data;
    } catch (error) {
      return rejectWithValue(getErrorMessage(error, "Failed to fetch user"));
    }
  }
);

export const forgotUserPassword = createAsyncThunk(
  "user/forgotPassword",
  async (formData, { rejectWithValue }) => {
    try {
      const { data } = await forgotPassword(formData);
      return data;
    } catch (error) {
      return rejectWithValue(getErrorMessage(error, "Failed to send reset request"));
    }
  }
);

export const resetUserPassword = createAsyncThunk(
  "user/resetPassword",
  async (formData, { rejectWithValue }) => {
    try {
      const { data } = await resetPassword(formData);
      return data;
    } catch (error) {
      return rejectWithValue(getErrorMessage(error, "Password reset failed"));
    }
  }
);

export const fetchStudentDashboard = createAsyncThunk(
  "user/fetchStudentDashboard",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await getStudentDashboard();
      return data;
    } catch (error) {
      return rejectWithValue(getErrorMessage(error, "Failed to fetch dashboard"));
    }
  }
);

export const fetchStudentProfile = createAsyncThunk(
  "user/fetchStudentProfile",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await getStudentProfile();
      return data;
    } catch (error) {
      return rejectWithValue(getErrorMessage(error, "Failed to fetch profile"));
    }
  }
);

export const updateStudent = createAsyncThunk(
  "user/updateStudent",
  async (formData, { rejectWithValue }) => {
    try {
      const { data } = await updateStudentProfile(formData);
      return data;
    } catch (error) {
      return rejectWithValue(getErrorMessage(error, "Failed to update profile"));
    }
  }
);

export const addFavorite = createAsyncThunk(
  "user/addFavoriteTeacher",
  async (teacherId, { rejectWithValue }) => {
    try {
      const { data } = await addFavoriteTeacher(teacherId);
      return { data, teacherId };
    } catch (error) {
      return rejectWithValue(getErrorMessage(error, "Failed to add favorite teacher"));
    }
  }
);

export const removeFavorite = createAsyncThunk(
  "user/removeFavoriteTeacher",
  async (teacherId, { rejectWithValue }) => {
    try {
      const { data } = await removeFavoriteTeacher(teacherId);
      return { data, teacherId };
    } catch (error) {
      return rejectWithValue(getErrorMessage(error, "Failed to remove favorite teacher"));
    }
  }
);

const initialState = {
  user: null,
  token: getToken(),
  role: null,
  isAuthenticated: Boolean(getToken()),
  loading: false,
  authLoading: false,
  authChecked: false,
  error: null,
  success: false,
  message: null,

  studentDashboard: null,
  studentProfile: null,
};

const setAuthData = (state, payload) => {
  const responseData = payload?.data || payload;
  const token = responseData?.token || payload?.token;
  const user = responseData?.user || payload?.user || responseData;

  state.user = user || null;
  state.token = token || state.token;
  state.role = user?.role || null;
  state.isAuthenticated = Boolean(state.token || user);
  state.message = payload?.message || null;

  if (typeof window !== "undefined" && token) {
    localStorage.setItem("token", token);
  }
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.role = null;
      state.isAuthenticated = false;
      state.loading = false;
      state.authLoading = false;
      state.authChecked = true;
      state.error = null;
      state.success = false;
      state.message = null;
      state.studentDashboard = null;
      state.studentProfile = null;

      if (typeof window !== "undefined") {
        localStorage.removeItem("token");
      }
    },

    clearUserState: (state) => {
      state.loading = false;
      state.authLoading = false;
      state.error = null;
      state.success = false;
      state.message = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Register
      .addCase(register.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        setAuthData(state, action.payload);
      })
      .addCase(register.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Login
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        setAuthData(state, action.payload);
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.isAuthenticated = false;
      })

      // Current user
      .addCase(fetchLoggedInUser.pending, (state) => {
        state.authLoading = true;
        state.error = null;
      })
      .addCase(fetchLoggedInUser.fulfilled, (state, action) => {
        const responseData = action.payload?.data || action.payload;
        const user = responseData?.user || responseData;

        state.authLoading = false;
        state.authChecked = true;
        state.user = user || null;
        state.role = user?.role || null;
        state.isAuthenticated = Boolean(user);
      })
      .addCase(fetchLoggedInUser.rejected, (state, action) => {
        state.authLoading = false;
        state.authChecked = true;
        state.user = null;
        state.token = null;
        state.role = null;
        state.isAuthenticated = false;
        state.error = action.payload;

        if (typeof window !== "undefined") {
          localStorage.removeItem("token");
        }
      })

      // Forgot password
      .addCase(forgotUserPassword.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(forgotUserPassword.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.message = action.payload?.message || "Password reset request sent";
      })
      .addCase(forgotUserPassword.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Reset password
      .addCase(resetUserPassword.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(resetUserPassword.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.message = action.payload?.message || "Password reset successful";
      })
      .addCase(resetUserPassword.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Student dashboard
      .addCase(fetchStudentDashboard.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchStudentDashboard.fulfilled, (state, action) => {
        state.loading = false;
        state.studentDashboard = action.payload?.data || action.payload;
      })
      .addCase(fetchStudentDashboard.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Student profile
      .addCase(fetchStudentProfile.fulfilled, (state, action) => {
        state.studentProfile = action.payload?.data || action.payload;
      })

      // Update student
      .addCase(updateStudent.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateStudent.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.studentProfile = action.payload?.data || action.payload;
        state.message = action.payload?.message || "Profile updated";
      })
      .addCase(updateStudent.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { logout, clearUserState } = userSlice.actions;
export default userSlice.reducer;
