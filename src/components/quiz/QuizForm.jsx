// "use client";

// import { useEffect, useState } from "react";
// import { mediaUrl } from "@/utils/mediaUrl";

// const defaultForm = {
//   title: "",
//   type: "simple_series",
//   description: "",
//   durationMinutes: 30,
//   passingScore: 60,
//   status: "active",
//   order: 0,
//   isPaid: false,
// };

// export default function QuizForm({
//   initialValues = null,
//   onSubmit,
//   loading = false,
//   submitText = "Save Quiz",
// }) {
//   const [form, setForm] = useState(defaultForm);
//   const [coverImage, setCoverImage] = useState(null);

//   useEffect(() => {
//     if (initialValues) {
//       setForm({
//         title: initialValues.title || "",
//         type: initialValues.type || "simple_series",
//         description: initialValues.description || "",
//         durationMinutes: initialValues.durationMinutes || 30,
//         passingScore: initialValues.passingScore || 60,
//         status: initialValues.status || "active",
//         order: initialValues.order || 0,
//         isPaid: Boolean(initialValues.isPaid),
//       });
//     }
//   }, [initialValues]);

//   const handleChange = (e) => {
//     const { name, value, type, checked } = e.target;

//     setForm((prev) => ({
//       ...prev,
//       [name]: type === "checkbox" ? checked : value,
//     }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     const formData = new FormData();

//     Object.entries(form).forEach(([key, value]) => {
//       formData.append(key, value);
//     });

//     if (coverImage) {
//       formData.append("coverImage", coverImage);
//     }

//     await onSubmit(formData);
//   };

//   return (
//     <div className="mx-auto max-w-5xl rounded-3xl bg-white p-8 shadow-2xl">
//       <form onSubmit={handleSubmit} className="space-y-8">
//         {/* Header */}

//         <div>
//           <h2 className="text-3xl font-bold text-slate-800">
//             Quiz Information
//           </h2>

//           <p className="mt-2 text-slate-500">
//             Fill all required information about the quiz.
//           </p>
//         </div>

//         {/* Grid */}

//         <div className="grid gap-6 md:grid-cols-2">
//           {/* Title */}

//           <div className="md:col-span-2">
//             <label className="mb-2 block font-semibold text-slate-700">
//               Quiz Title
//             </label>

//             <input
//               name="title"
//               value={form.title}
//               onChange={handleChange}
//               required
//               className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100"
//               placeholder="Enter quiz title"
//             />
//           </div>

//           {/* Type */}

//           <div>
//             <label className="mb-2 block font-semibold text-slate-700">
//               Quiz Type
//             </label>

//             <select
//               name="type"
//               value={form.type}
//               onChange={handleChange}
//               className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100"
//             >
//               <option value="simple_series">Simple Series</option>
//               <option value="mock_test">Mock Test</option>
//               <option value="thematic_series">Thematic Series</option>
//               <option value="crash_test">Crash Test</option>
//               <option value="road_sign">Road Sign</option>
//             </select>
//           </div>

//           {/* Status */}

//           <div>
//             <label className="mb-2 block font-semibold text-slate-700">
//               Status
//             </label>

//             <select
//               name="status"
//               value={form.status}
//               onChange={handleChange}
//               className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100"
//             >
//               <option value="active">Active</option>
//               <option value="inactive">Inactive</option>
//             </select>
//           </div>

//           {/* Description */}

//           <div className="md:col-span-2">
//             <label className="mb-2 block font-semibold text-slate-700">
//               Description
//             </label>

//             <textarea
//               rows={5}
//               name="description"
//               value={form.description}
//               onChange={handleChange}
//               placeholder="Write quiz description..."
//               className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100"
//             />
//           </div>

//           {/* Duration */}

//           <div>
//             <label className="mb-2 block font-semibold text-slate-700">
//               Duration (Minutes)
//             </label>

//             <input
//               type="number"
//               min={1}
//               name="durationMinutes"
//               value={form.durationMinutes}
//               onChange={handleChange}
//               className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100"
//             />
//           </div>

//           {/* Passing */}

//           <div>
//             <label className="mb-2 block font-semibold text-slate-700">
//               Passing Score (%)
//             </label>

//             <input
//               type="number"
//               min={0}
//               max={100}
//               name="passingScore"
//               value={form.passingScore}
//               onChange={handleChange}
//               className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100"
//             />
//           </div>

//           {/* Order */}

//           <div>
//             <label className="mb-2 block font-semibold text-slate-700">
//               Display Order
//             </label>

//             <input
//               type="number"
//               name="order"
//               value={form.order}
//               onChange={handleChange}
//               className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100"
//             />
//           </div>

//           {/* Paid */}

//           <div className="flex items-center pt-9">
//             <label className="flex cursor-pointer items-center gap-3">
//               <input
//                 id="isPaid"
//                 type="checkbox"
//                 name="isPaid"
//                 checked={form.isPaid}
//                 onChange={handleChange}
//                 className="h-5 w-5 accent-indigo-600"
//               />

//               <span className="font-medium text-slate-700">Paid Quiz</span>
//             </label>
//           </div>

//           {/* Upload */}

//           <div className="md:col-span-2">
//             <label className="mb-2 block font-semibold text-slate-700">
//               Cover Image
//             </label>

//             <input
//               type="file"
//               accept="image/*"
//               onChange={(e) => setCoverImage(e.target.files?.[0] || null)}
//               className="block w-full rounded-xl border border-dashed border-slate-300 bg-slate-50 p-4 file:mr-4 file:rounded-lg file:border-0 file:bg-indigo-600 file:px-4 file:py-2 file:text-white hover:file:bg-indigo-700"
//             />

//             {initialValues?.coverImage && (
//               <img
//                 src={mediaUrl(initialValues.coverImage)}
//                 alt="Cover"
//                 className="mt-5 h-44 w-72 rounded-2xl border object-cover shadow-lg"
//               />
//             )}
//           </div>
//         </div>

//         {/* Button */}

//         <div className="border-t pt-6">
//           <button
//             type="submit"
//             disabled={loading}
//             className="rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 px-8 py-3 font-semibold text-white shadow-lg transition hover:scale-105 hover:shadow-xl disabled:opacity-50"
//           >
//             {loading ? "Saving..." : submitText}
//           </button>
//         </div>
//       </form>
//     </div>
//   );
// }

"use client";

import { useEffect, useMemo, useState } from "react";
import {
  FaCheckCircle,
  FaClock,
  FaCloudUploadAlt,
  FaFileAlt,
  FaImage,
  FaInfoCircle,
  FaLayerGroup,
  FaMoneyBillWave,
  FaPercent,
  FaSave,
  FaSortNumericDown,
} from "react-icons/fa";
import { mediaUrl } from "@/utils/mediaUrl";

const defaultForm = {
  title: "",
  type: "simple_series",
  description: "",
  durationMinutes: 30,
  passingScore: 60,
  status: "active",
  order: 0,
  isPaid: false,
};

const quizTypes = [
  { label: "Simple Series", value: "simple_series" },
  { label: "Mock Test", value: "mock_test" },
  { label: "Thematic Series", value: "thematic_series" },
  { label: "Crash Test", value: "crash_test" },
];

function FieldLabel({ icon: Icon, children }) {
  return (
    <label className="mb-1.5 flex items-center gap-2 text-xs font-bold text-slate-600">
      {Icon && <Icon className="text-[11px] text-slate-400" />}
      {children}
    </label>
  );
}

function inputClass(extra = "") {
  return `h-10 w-full rounded-xl border border-slate-200 bg-[#f8f8fb] px-3 text-xs font-semibold text-slate-700 outline-none transition placeholder:text-slate-400 focus:border-violet-300 focus:bg-white focus:ring-4 focus:ring-violet-50 ${extra}`;
}

export default function QuizForm({
  initialValues = null,
  onSubmit,
  loading = false,
  submitText = "Save Quiz",
}) {
  const [form, setForm] = useState(defaultForm);
  const [coverImage, setCoverImage] = useState(null);

  useEffect(() => {
    if (initialValues) {
      setForm({
        title: initialValues.title || "",
        type: initialValues.type || "simple_series",
        description: initialValues.description || "",
        durationMinutes: initialValues.durationMinutes || 30,
        passingScore: initialValues.passingScore || 60,
        status: initialValues.status || "active",
        order: initialValues.order || 0,
        isPaid: Boolean(initialValues.isPaid),
      });
    }
  }, [initialValues]);

  const previewUrl = useMemo(() => {
    if (coverImage) return URL.createObjectURL(coverImage);
    if (initialValues?.coverImage) return mediaUrl(initialValues.coverImage);
    return "";
  }, [coverImage, initialValues?.coverImage]);

  useEffect(() => {
    return () => {
      if (coverImage && previewUrl?.startsWith("blob:")) {
        URL.revokeObjectURL(previewUrl);
      }
    };
  }, [coverImage, previewUrl]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();

    Object.entries(form).forEach(([key, value]) => {
      formData.append(key, value);
    });

    if (coverImage) {
      formData.append("coverImage", coverImage);
    }

    await onSubmit(formData);
  };

  return (
    <div className="w-full overflow-hidden rounded-[16px] border border-slate-200 bg-white shadow-[0_8px_22px_rgba(15,23,42,0.04)]">
      <div className="flex flex-col justify-between gap-2 border-b border-slate-100 bg-[#fbfbfd] px-3.5 py-3 sm:flex-row sm:items-center">
        <div className="flex items-center gap-2.5">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-violet-50 text-violet-600">
            <FaFileAlt className="text-sm" />
          </div>

          <div>
            <h2 className="text-base font-bold text-slate-900">
              Quiz Information
            </h2>

            <p className="mt-0.5 text-[11px] font-medium text-slate-400">
              Fill all required information about the quiz.
            </p>
          </div>
        </div>

        <span className="w-fit rounded-full border border-violet-200 bg-violet-50 px-2.5 py-1 text-[11px] font-bold text-violet-700">
          {form.status === "active" ? "Active" : "Inactive"}
        </span>
      </div>

      <form onSubmit={handleSubmit} className="p-3.5">
        <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-4">
          <div className="md:col-span-2 xl:col-span-2">
            <FieldLabel icon={FaFileAlt}>Quiz Title</FieldLabel>

            <input
              name="title"
              value={form.title}
              onChange={handleChange}
              required
              className={inputClass()}
              placeholder="Enter quiz title"
            />
          </div>

          <div>
            <FieldLabel icon={FaLayerGroup}>Quiz Type</FieldLabel>

            <select
              name="type"
              value={form.type}
              onChange={handleChange}
              disabled={initialValues?.type === "road_sign"}
              className={inputClass("cursor-pointer")}
            >
              {initialValues?.type === "road_sign" && (
                <option value="road_sign">Road Sign (Legacy)</option>
              )}
              {quizTypes.map((item) => (
                <option key={item.value} value={item.value}>
                  {item.label}
                </option>
              ))}
            </select>
          </div>

          <div>
            <FieldLabel icon={FaCheckCircle}>Status</FieldLabel>

            <select
              name="status"
              value={form.status}
              onChange={handleChange}
              className={inputClass("cursor-pointer")}
            >
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>
          </div>

          <div className="md:col-span-2 xl:col-span-4">
            <FieldLabel icon={FaInfoCircle}>Description</FieldLabel>

            <textarea
              rows={3}
              name="description"
              value={form.description}
              onChange={handleChange}
              placeholder="Write quiz description..."
              className="min-h-[78px] w-full resize-y rounded-xl border border-slate-200 bg-[#f8f8fb] px-3 py-2 text-xs font-semibold leading-5 text-slate-700 outline-none transition placeholder:text-slate-400 focus:border-violet-300 focus:bg-white focus:ring-4 focus:ring-violet-50"
            />
          </div>

          <div>
            <FieldLabel icon={FaClock}>Duration</FieldLabel>

            <input
              type="number"
              min={1}
              name="durationMinutes"
              value={form.durationMinutes}
              onChange={handleChange}
              className={inputClass()}
              placeholder="Minutes"
            />
          </div>

          <div>
            <FieldLabel icon={FaPercent}>Passing Score</FieldLabel>

            <input
              type="number"
              min={0}
              max={100}
              name="passingScore"
              value={form.passingScore}
              onChange={handleChange}
              className={inputClass()}
              placeholder="Percentage"
            />
          </div>

          <div>
            <FieldLabel icon={FaSortNumericDown}>Display Order</FieldLabel>

            <input
              type="number"
              name="order"
              value={form.order}
              onChange={handleChange}
              className={inputClass()}
              placeholder="Order"
            />
          </div>

          <div>
            <FieldLabel icon={FaMoneyBillWave}>Payment</FieldLabel>

            <label className="flex h-10 cursor-pointer items-center justify-between rounded-xl border border-slate-200 bg-[#f8f8fb] px-3 transition hover:bg-white">
              <span className="text-xs font-bold text-slate-700">
                Paid Quiz
              </span>

              <input
                id="isPaid"
                type="checkbox"
                name="isPaid"
                checked={form.isPaid}
                onChange={handleChange}
                className="h-4 w-4 accent-violet-600"
              />
            </label>
          </div>

          <div className="md:col-span-2 xl:col-span-4">
            <FieldLabel icon={FaImage}>Cover Image</FieldLabel>

            <div className="grid gap-3 lg:grid-cols-[1fr_180px]">
              <label className="flex min-h-[88px] cursor-pointer flex-col items-center justify-center rounded-xl border border-dashed border-slate-300 bg-[#f8f8fb] px-3 py-3 text-center transition hover:border-violet-300 hover:bg-violet-50/40">
                <FaCloudUploadAlt className="mb-2 text-xl text-violet-500" />

                <p className="text-xs font-bold text-slate-700">
                  Click to upload cover image
                </p>

                <p className="mt-1 text-[11px] font-medium text-slate-400">
                  JPG, PNG or WEBP
                </p>

                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => setCoverImage(e.target.files?.[0] || null)}
                  className="hidden"
                />
              </label>

              <div className="flex h-[88px] items-center justify-center overflow-hidden rounded-xl border border-slate-200 bg-slate-50">
                {previewUrl ? (
                  <img
                    src={previewUrl}
                    alt="Cover"
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <div className="text-center">
                    <FaImage className="mx-auto mb-1 text-lg text-slate-300" />
                    <p className="text-[11px] font-bold text-slate-400">
                      No Image
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="mt-3 flex flex-col justify-between gap-2 border-t border-slate-100 pt-3 sm:flex-row sm:items-center">
          <p className="text-[11px] font-medium text-slate-400">
            Check all quiz information before saving.
          </p>

          <button
            type="submit"
            disabled={loading}
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-slate-900 px-4 py-2.5 text-xs font-bold text-white shadow-sm transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-60"
          >
            <FaSave />
            {loading ? "Saving..." : submitText}
          </button>
        </div>
      </form>
    </div>
  );
}
