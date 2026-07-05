"use client";

import { toast } from "sonner";
import {
  FiCheck,
  FiX,
  FiAlertTriangle,
  FiInfo,
  FiLoader,
} from "react-icons/fi";

const toastStyle = {
  success: {
    title: "Success",
    Icon: FiCheck,
    accent: "bg-[#20ba2b]",
    iconBox: "bg-[#20ba2b]/10 text-[#20ba2b]",
    titleColor: "text-[#111827]",
  },

  error: {
    title: "Error",
    Icon: FiX,
    accent: "bg-[#bb1e2f]",
    iconBox: "bg-[#bb1e2f]/10 text-[#bb1e2f]",
    titleColor: "text-[#111827]",
  },

  danger: {
    title: "Danger",
    Icon: FiAlertTriangle,
    accent: "bg-[#bb1e2f]",
    iconBox: "bg-[#bb1e2f]/10 text-[#bb1e2f]",
    titleColor: "text-[#111827]",
  },

  pending: {
    title: "Processing",
    Icon: FiLoader,
    accent: "bg-[#023389]",
    iconBox: "bg-[#023389]/10 text-[#023389]",
    titleColor: "text-[#111827]",
  },

  warning: {
    title: "Warning",
    Icon: FiAlertTriangle,
    accent: "bg-[#ffc400]",
    iconBox: "bg-[#ffc400]/20 text-[#8a6a00]",
    titleColor: "text-[#111827]",
  },

  info: {
    title: "Info",
    Icon: FiInfo,
    accent: "bg-[#023389]",
    iconBox: "bg-[#023389]/10 text-[#023389]",
    titleColor: "text-[#111827]",
  },
};

function ToastCard({ id, type = "success", title, message }) {
  const item = toastStyle[type] || toastStyle.success;
  const Icon = item.Icon;

  return (
    <div
      className="
        group relative w-[calc(100vw-32px)] overflow-hidden rounded-[18px]
        border border-white/70 bg-white/85 shadow-[0_18px_55px_rgba(15,23,42,0.16)]
        backdrop-blur-xl sm:w-[360px]
      "
    >
      <div className={`absolute left-0 top-0 h-full w-[4px] ${item.accent}`} />

      <div className="flex items-start gap-3 px-4 py-3.5 pl-5">
        <div
          className={`
            mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-full
            text-[18px]
            ${item.iconBox}
          `}
        >
          <Icon className={type === "pending" ? "animate-spin" : ""} />
        </div>

        <div className="min-w-0 flex-1">
          <h6
            className={`
              m-0 text-[14px] font-semibold leading-5 tracking-[-0.01em]
              ${item.titleColor}
            `}
          >
            {title || item.title}
          </h6>

          {message && (
            <p className="m-0 mt-0.5 text-[13px] leading-5 text-[#6b7280]">
              {message}
            </p>
          )}
        </div>

        <button
          type="button"
          onClick={() => toast.dismiss(id)}
          className="
            -mr-1 flex h-7 w-7 shrink-0 items-center justify-center rounded-full
            text-[17px] leading-none text-[#9ca3af] opacity-70 transition
            hover:bg-black/5 hover:text-[#111827] group-hover:opacity-100
          "
          aria-label="Close toast"
        >
          <FiX />
        </button>
      </div>
    </div>
  );
}

const customToast = (type, message, options = {}) => {
  return toast.custom(
    (id) => (
      <ToastCard id={id} type={type} title={options.title} message={message} />
    ),
    {
      duration: options.duration ?? 3000,
    },
  );
};

export const showToast = {
  success: (message, options) => customToast("success", message, options),

  error: (message, options) => customToast("error", message, options),

  danger: (message, options) => customToast("danger", message, options),

  warning: (message, options) => customToast("warning", message, options),

  info: (message, options) => customToast("info", message, options),

  pending: (message = "Processing...", options = {}) =>
    customToast("pending", message, {
      duration: Infinity,
      ...options,
    }),

  dismiss: (id) => toast.dismiss(id),

  dismissAll: () => toast.dismiss(),
};

export const showPromiseToast = async (
  promise,
  {
    pending = "Processing...",
    success = "Completed successfully",
    error = "Something went wrong",
  } = {},
) => {
  const toastId = showToast.pending(pending);

  try {
    const result = await promise;

    showToast.dismiss(toastId);

    const successMessage =
      typeof success === "function" ? success(result) : success;

    showToast.success(successMessage);

    return result;
  } catch (err) {
    showToast.dismiss(toastId);

    const errorMessage =
      typeof error === "function" ? error(err) : err?.message || error;

    showToast.error(errorMessage);

    throw err;
  }
};
