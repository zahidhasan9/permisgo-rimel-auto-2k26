"use client";

import { showToast } from "@/utils/showToast";

export default function Page() {
  return (
    <div className="flex gap-3">
      <button onClick={() => showToast.success("Data saved successfully")}>
        Success
      </button>

      <button onClick={() => showToast.error("Invalid email or password")}>
        Error
      </button>

      <button onClick={() => showToast.danger("This action is not allowed")}>
        Danger
      </button>

      <button onClick={() => showToast.warning("Please check all fields")}>
        Warning
      </button>

      <button onClick={() => showToast.info("New notification received")}>
        Info
      </button>
    </div>
  );
}
