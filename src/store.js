import { configureStore } from "@reduxjs/toolkit";
import userReducer from "@/features/userSlice";
// import bookingReducer from "@/features/bookingSlice";
// import teacherReducer from "@/features/teacherSlice";
// import adminReducer from "@/features/adminSlice";
// import contentReducer from "@/features/contentSlice";
// import uiReducer from "@/features/uiSlice";

export const store = configureStore({
  reducer: {
    user: userReducer,
    // booking: bookingReducer,
    // teacher: teacherReducer,
    // admin: adminReducer,
    // content: contentReducer,
    // ui: uiReducer,
  },
});
