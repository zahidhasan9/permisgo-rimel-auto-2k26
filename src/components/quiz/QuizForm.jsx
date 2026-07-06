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

// export default function QuizForm({ initialValues = null, onSubmit, loading = false, submitText = "Save Quiz" }) {
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

//   const handleChange = (event) => {
//     const { name, value, type, checked } = event.target;
//     setForm((prev) => ({ ...prev, [name]: type === "checkbox" ? checked : value }));
//   };

//   const handleSubmit = async (event) => {
//     event.preventDefault();
//     const formData = new FormData();

//     Object.entries(form).forEach(([key, value]) => {
//       formData.append(key, value);
//     });

//     if (coverImage) formData.append("coverImage", coverImage);
//     await onSubmit(formData);
//   };

//   return (
//     <form onSubmit={handleSubmit} className="card shadow-sm border-0 p-4">
//       <div className="row g-3">
//         <div className="col-md-8">
//           <label className="form-label fw-semibold">Quiz Title</label>
//           <input name="title" value={form.title} onChange={handleChange} className="form-control" required />
//         </div>

//         <div className="col-md-4">
//           <label className="form-label fw-semibold">Quiz Type</label>
//           <select name="type" value={form.type} onChange={handleChange} className="form-select">
//             <option value="simple_series">Simple Series</option>
//             <option value="mock_test">Mock Test</option>
//             <option value="thematic_series">Thematic Series</option>
//             <option value="crash_test">Crash Test</option>
//             <option value="road_sign">Road Sign</option>
//           </select>
//         </div>

//         <div className="col-12">
//           <label className="form-label fw-semibold">Description</label>
//           <textarea name="description" value={form.description} onChange={handleChange} rows={4} className="form-control" />
//         </div>

//         <div className="col-md-3">
//           <label className="form-label fw-semibold">Duration Minutes</label>
//           <input type="number" name="durationMinutes" value={form.durationMinutes} onChange={handleChange} className="form-control" min="1" />
//         </div>

//         <div className="col-md-3">
//           <label className="form-label fw-semibold">Passing Score %</label>
//           <input type="number" name="passingScore" value={form.passingScore} onChange={handleChange} className="form-control" min="0" max="100" />
//         </div>

//         <div className="col-md-3">
//           <label className="form-label fw-semibold">Order</label>
//           <input type="number" name="order" value={form.order} onChange={handleChange} className="form-control" />
//         </div>

//         <div className="col-md-3">
//           <label className="form-label fw-semibold">Status</label>
//           <select name="status" value={form.status} onChange={handleChange} className="form-select">
//             <option value="active">Active</option>
//             <option value="inactive">Inactive</option>
//           </select>
//         </div>

//         <div className="col-md-6">
//           <label className="form-label fw-semibold">Cover Image</label>
//           <input type="file" accept="image/*" className="form-control" onChange={(e) => setCoverImage(e.target.files?.[0] || null)} />
//           {initialValues?.coverImage && (
//             <img src={mediaUrl(initialValues.coverImage)} alt="Cover" className="mt-2 rounded border" style={{ width: 160, height: 90, objectFit: "cover" }} />
//           )}
//         </div>

//         <div className="col-md-6 d-flex align-items-end">
//           <div className="form-check mb-2">
//             <input id="isPaid" type="checkbox" name="isPaid" checked={form.isPaid} onChange={handleChange} className="form-check-input" />
//             <label htmlFor="isPaid" className="form-check-label">Paid Quiz</label>
//           </div>
//         </div>
//       </div>

//       <button type="submit" disabled={loading} className="btn btn-primary mt-4">
//         {loading ? "Saving..." : submitText}
//       </button>
//     </form>
//   );
// }

"use client";

import { useEffect, useState } from "react";
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
    <div className="mx-auto max-w-5xl rounded-3xl bg-white p-8 shadow-2xl">
      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Header */}

        <div>
          <h2 className="text-3xl font-bold text-slate-800">
            Quiz Information
          </h2>

          <p className="mt-2 text-slate-500">
            Fill all required information about the quiz.
          </p>
        </div>

        {/* Grid */}

        <div className="grid gap-6 md:grid-cols-2">
          {/* Title */}

          <div className="md:col-span-2">
            <label className="mb-2 block font-semibold text-slate-700">
              Quiz Title
            </label>

            <input
              name="title"
              value={form.title}
              onChange={handleChange}
              required
              className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100"
              placeholder="Enter quiz title"
            />
          </div>

          {/* Type */}

          <div>
            <label className="mb-2 block font-semibold text-slate-700">
              Quiz Type
            </label>

            <select
              name="type"
              value={form.type}
              onChange={handleChange}
              className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100"
            >
              <option value="simple_series">Simple Series</option>
              <option value="mock_test">Mock Test</option>
              <option value="thematic_series">Thematic Series</option>
              <option value="crash_test">Crash Test</option>
              <option value="road_sign">Road Sign</option>
            </select>
          </div>

          {/* Status */}

          <div>
            <label className="mb-2 block font-semibold text-slate-700">
              Status
            </label>

            <select
              name="status"
              value={form.status}
              onChange={handleChange}
              className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100"
            >
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>
          </div>

          {/* Description */}

          <div className="md:col-span-2">
            <label className="mb-2 block font-semibold text-slate-700">
              Description
            </label>

            <textarea
              rows={5}
              name="description"
              value={form.description}
              onChange={handleChange}
              placeholder="Write quiz description..."
              className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100"
            />
          </div>

          {/* Duration */}

          <div>
            <label className="mb-2 block font-semibold text-slate-700">
              Duration (Minutes)
            </label>

            <input
              type="number"
              min={1}
              name="durationMinutes"
              value={form.durationMinutes}
              onChange={handleChange}
              className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100"
            />
          </div>

          {/* Passing */}

          <div>
            <label className="mb-2 block font-semibold text-slate-700">
              Passing Score (%)
            </label>

            <input
              type="number"
              min={0}
              max={100}
              name="passingScore"
              value={form.passingScore}
              onChange={handleChange}
              className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100"
            />
          </div>

          {/* Order */}

          <div>
            <label className="mb-2 block font-semibold text-slate-700">
              Display Order
            </label>

            <input
              type="number"
              name="order"
              value={form.order}
              onChange={handleChange}
              className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100"
            />
          </div>

          {/* Paid */}

          <div className="flex items-center pt-9">
            <label className="flex cursor-pointer items-center gap-3">
              <input
                id="isPaid"
                type="checkbox"
                name="isPaid"
                checked={form.isPaid}
                onChange={handleChange}
                className="h-5 w-5 accent-indigo-600"
              />

              <span className="font-medium text-slate-700">Paid Quiz</span>
            </label>
          </div>

          {/* Upload */}

          <div className="md:col-span-2">
            <label className="mb-2 block font-semibold text-slate-700">
              Cover Image
            </label>

            <input
              type="file"
              accept="image/*"
              onChange={(e) => setCoverImage(e.target.files?.[0] || null)}
              className="block w-full rounded-xl border border-dashed border-slate-300 bg-slate-50 p-4 file:mr-4 file:rounded-lg file:border-0 file:bg-indigo-600 file:px-4 file:py-2 file:text-white hover:file:bg-indigo-700"
            />

            {initialValues?.coverImage && (
              <img
                src={mediaUrl(initialValues.coverImage)}
                alt="Cover"
                className="mt-5 h-44 w-72 rounded-2xl border object-cover shadow-lg"
              />
            )}
          </div>
        </div>

        {/* Button */}

        <div className="border-t pt-6">
          <button
            type="submit"
            disabled={loading}
            className="rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 px-8 py-3 font-semibold text-white shadow-lg transition hover:scale-105 hover:shadow-xl disabled:opacity-50"
          >
            {loading ? "Saving..." : submitText}
          </button>
        </div>
      </form>
    </div>
  );
}
