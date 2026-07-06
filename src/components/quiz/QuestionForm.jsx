// "use client";

// import { useEffect, useState } from "react";
// import { mediaUrl } from "@/utils/mediaUrl";

// const emptyOptions = [
//   { text: "", image: "", order: 0 },
//   { text: "", image: "", order: 1 },
//   { text: "", image: "", order: 2 },
//   { text: "", image: "", order: 3 },
// ];

// export default function QuestionForm({ initialValues = null, onSubmit, loading = false, submitText = "Save Question" }) {
//   const [questionText, setQuestionText] = useState("");
//   const [voiceText, setVoiceText] = useState("");
//   const [options, setOptions] = useState(emptyOptions);
//   const [correctOptionIndex, setCorrectOptionIndex] = useState(0);
//   const [explanationText, setExplanationText] = useState("");
//   const [topic, setTopic] = useState("");
//   const [difficulty, setDifficulty] = useState("medium");
//   const [order, setOrder] = useState(0);
//   const [status, setStatus] = useState("active");

//   const [questionImage, setQuestionImage] = useState(null);
//   const [explanationImage, setExplanationImage] = useState(null);
//   const [markedAnswerImage, setMarkedAnswerImage] = useState(null);
//   const [optionImages, setOptionImages] = useState([null, null, null, null]);

//   useEffect(() => {
//     if (initialValues) {
//       setQuestionText(initialValues.questionText || "");
//       setVoiceText(initialValues.voiceText || "");
//       setOptions(initialValues.options?.length === 4 ? initialValues.options : emptyOptions);
//       setCorrectOptionIndex(Number(initialValues.correctOptionIndex || 0));
//       setExplanationText(initialValues.explanationText || "");
//       setTopic(initialValues.topic || "");
//       setDifficulty(initialValues.difficulty || "medium");
//       setOrder(initialValues.order || 0);
//       setStatus(initialValues.status || "active");
//     }
//   }, [initialValues]);

//   const updateOptionText = (index, value) => {
//     setOptions((prev) => prev.map((option, i) => (i === index ? { ...option, text: value } : option)));
//   };

//   const updateOptionImage = (index, file) => {
//     setOptionImages((prev) => prev.map((item, i) => (i === index ? file : item)));
//   };

//   const handleSubmit = async (event) => {
//     event.preventDefault();

//     const formData = new FormData();
//     formData.append("questionText", questionText);
//     formData.append("voiceText", voiceText);
//     formData.append("options", JSON.stringify(options));
//     formData.append("correctOptionIndex", String(correctOptionIndex));
//     formData.append("explanationText", explanationText);
//     formData.append("topic", topic);
//     formData.append("difficulty", difficulty);
//     formData.append("order", String(order));
//     formData.append("status", status);

//     if (questionImage) formData.append("questionImage", questionImage);
//     if (explanationImage) formData.append("explanationImage", explanationImage);
//     if (markedAnswerImage) formData.append("markedAnswerImage", markedAnswerImage);

//     optionImages.forEach((file, index) => {
//       if (file) formData.append(`optionImage${index}`, file);
//     });

//     await onSubmit(formData);
//   };

//   return (
//     <form onSubmit={handleSubmit} className="card shadow-sm border-0 p-4">
//       <div className="row g-3">
//         <div className="col-12">
//           <label className="form-label fw-semibold">Question Text</label>
//           <textarea value={questionText} onChange={(e) => setQuestionText(e.target.value)} rows={3} className="form-control" required />
//         </div>

//         <div className="col-12">
//           <label className="form-label fw-semibold">Voice Text Optional</label>
//           <textarea value={voiceText} onChange={(e) => setVoiceText(e.target.value)} rows={2} className="form-control" placeholder="Empty থাকলে question text read করবে" />
//         </div>

//         <div className="col-md-6">
//           <label className="form-label fw-semibold">Question Image</label>
//           <input type="file" accept="image/*" className="form-control" onChange={(e) => setQuestionImage(e.target.files?.[0] || null)} />
//           {initialValues?.questionImage && <img src={mediaUrl(initialValues.questionImage)} alt="Question" className="mt-2 rounded border" style={{ maxWidth: 220 }} />}
//         </div>

//         <div className="col-md-6">
//           <label className="form-label fw-semibold">Marked Answer Image</label>
//           <input type="file" accept="image/*" className="form-control" onChange={(e) => setMarkedAnswerImage(e.target.files?.[0] || null)} />
//           {initialValues?.markedAnswerImage && <img src={mediaUrl(initialValues.markedAnswerImage)} alt="Marked answer" className="mt-2 rounded border" style={{ maxWidth: 220 }} />}
//         </div>

//         <div className="col-12">
//           <h5 className="mt-2">4 Options</h5>
//           {options.map((option, index) => (
//             <div key={index} className="border rounded p-3 mb-3">
//               <div className="row g-2 align-items-center">
//                 <div className="col-md-1 fw-bold">{String.fromCharCode(65 + index)}</div>
//                 <div className="col-md-6">
//                   <input value={option.text} onChange={(e) => updateOptionText(index, e.target.value)} className="form-control" placeholder={`Option ${index + 1}`} required />
//                 </div>
//                 <div className="col-md-4">
//                   <input type="file" accept="image/*" className="form-control" onChange={(e) => updateOptionImage(index, e.target.files?.[0] || null)} />
//                   {option.image && <img src={mediaUrl(option.image)} alt="Option" className="mt-2 rounded border" style={{ maxWidth: 120 }} />}
//                 </div>
//                 <div className="col-md-1 text-center">
//                   <input type="radio" name="correct" checked={correctOptionIndex === index} onChange={() => setCorrectOptionIndex(index)} className="form-check-input" title="Correct answer" />
//                 </div>
//               </div>
//             </div>
//           ))}
//           <small className="text-muted">যেটা correct answer, সেই option-এর radio select করুন।</small>
//         </div>

//         <div className="col-12">
//           <label className="form-label fw-semibold">Small Explanation</label>
//           <textarea value={explanationText} onChange={(e) => setExplanationText(e.target.value)} rows={3} className="form-control" />
//         </div>

//         <div className="col-md-6">
//           <label className="form-label fw-semibold">Explanation Image</label>
//           <input type="file" accept="image/*" className="form-control" onChange={(e) => setExplanationImage(e.target.files?.[0] || null)} />
//           {initialValues?.explanationImage && <img src={mediaUrl(initialValues.explanationImage)} alt="Explanation" className="mt-2 rounded border" style={{ maxWidth: 220 }} />}
//         </div>

//         <div className="col-md-2">
//           <label className="form-label fw-semibold">Topic</label>
//           <input value={topic} onChange={(e) => setTopic(e.target.value)} className="form-control" />
//         </div>

//         <div className="col-md-2">
//           <label className="form-label fw-semibold">Difficulty</label>
//           <select value={difficulty} onChange={(e) => setDifficulty(e.target.value)} className="form-select">
//             <option value="easy">Easy</option>
//             <option value="medium">Medium</option>
//             <option value="hard">Hard</option>
//           </select>
//         </div>

//         <div className="col-md-1">
//           <label className="form-label fw-semibold">Order</label>
//           <input type="number" value={order} onChange={(e) => setOrder(e.target.value)} className="form-control" />
//         </div>

//         <div className="col-md-1">
//           <label className="form-label fw-semibold">Status</label>
//           <select value={status} onChange={(e) => setStatus(e.target.value)} className="form-select">
//             <option value="active">Active</option>
//             <option value="inactive">Inactive</option>
//           </select>
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

const emptyOptions = [
  { text: "", image: "", order: 0 },
  { text: "", image: "", order: 1 },
  { text: "", image: "", order: 2 },
  { text: "", image: "", order: 3 },
];

export default function QuestionForm({
  initialValues = null,
  onSubmit,
  loading = false,
  submitText = "Save Question",
}) {
  const [questionText, setQuestionText] = useState("");
  const [voiceText, setVoiceText] = useState("");
  const [options, setOptions] = useState(emptyOptions);
  const [correctOptionIndex, setCorrectOptionIndex] = useState(0);
  const [explanationText, setExplanationText] = useState("");
  const [topic, setTopic] = useState("");
  const [difficulty, setDifficulty] = useState("medium");
  const [order, setOrder] = useState(0);
  const [status, setStatus] = useState("active");

  const [questionImage, setQuestionImage] = useState(null);
  const [explanationImage, setExplanationImage] = useState(null);
  const [markedAnswerImage, setMarkedAnswerImage] = useState(null);
  const [optionImages, setOptionImages] = useState([null, null, null, null]);

  useEffect(() => {
    if (initialValues) {
      setQuestionText(initialValues.questionText || "");
      setVoiceText(initialValues.voiceText || "");
      setOptions(
        initialValues.options?.length === 4
          ? initialValues.options
          : emptyOptions,
      );
      setCorrectOptionIndex(Number(initialValues.correctOptionIndex || 0));
      setExplanationText(initialValues.explanationText || "");
      setTopic(initialValues.topic || "");
      setDifficulty(initialValues.difficulty || "medium");
      setOrder(initialValues.order || 0);
      setStatus(initialValues.status || "active");
    }
  }, [initialValues]);

  const updateOptionText = (index, value) => {
    setOptions((prev) =>
      prev.map((option, i) =>
        i === index ? { ...option, text: value } : option,
      ),
    );
  };

  const updateOptionImage = (index, file) => {
    setOptionImages((prev) =>
      prev.map((item, i) => (i === index ? file : item)),
    );
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append("questionText", questionText);
    formData.append("voiceText", voiceText);
    formData.append("options", JSON.stringify(options));
    formData.append("correctOptionIndex", String(correctOptionIndex));
    formData.append("explanationText", explanationText);
    formData.append("topic", topic);
    formData.append("difficulty", difficulty);
    formData.append("order", String(order));
    formData.append("status", status);

    if (questionImage) formData.append("questionImage", questionImage);
    if (explanationImage) formData.append("explanationImage", explanationImage);
    if (markedAnswerImage)
      formData.append("markedAnswerImage", markedAnswerImage);

    optionImages.forEach((file, index) => {
      if (file) formData.append(`optionImage${index}`, file);
    });

    await onSubmit(formData);
  };

  const inputClass =
    "w-full rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm text-gray-800 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100";

  const labelClass = "mb-2 block text-sm font-semibold text-gray-700";

  const imagePreviewClass =
    "mt-3 max-h-44 max-w-[220px] rounded-lg border border-gray-200 object-contain shadow-sm";

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm md:p-6"
    >
      <div className="grid grid-cols-1 gap-5 md:grid-cols-12">
        {/* Question Text */}
        <div className="md:col-span-12">
          <label className={labelClass}>Question Text</label>
          <textarea
            value={questionText}
            onChange={(e) => setQuestionText(e.target.value)}
            rows={3}
            className={inputClass}
            required
          />
        </div>

        {/* Voice Text */}
        <div className="md:col-span-12">
          <label className={labelClass}>Voice Text Optional</label>
          <textarea
            value={voiceText}
            onChange={(e) => setVoiceText(e.target.value)}
            rows={2}
            className={inputClass}
            placeholder="Empty থাকলে question text read করবে"
          />
        </div>

        {/* Question Image */}
        <div className="md:col-span-6">
          <label className={labelClass}>Question Image</label>
          <input
            type="file"
            accept="image/*"
            className="w-full rounded-lg border border-gray-300 bg-white text-sm text-gray-700 file:mr-4 file:border-0 file:bg-blue-50 file:px-4 file:py-2.5 file:text-sm file:font-semibold file:text-blue-700 hover:file:bg-blue-100"
            onChange={(e) => setQuestionImage(e.target.files?.[0] || null)}
          />

          {initialValues?.questionImage && (
            <img
              src={mediaUrl(initialValues.questionImage)}
              alt="Question"
              className={imagePreviewClass}
            />
          )}
        </div>

        {/* Marked Answer Image */}
        <div className="md:col-span-6">
          <label className={labelClass}>Marked Answer Image</label>
          <input
            type="file"
            accept="image/*"
            className="w-full rounded-lg border border-gray-300 bg-white text-sm text-gray-700 file:mr-4 file:border-0 file:bg-blue-50 file:px-4 file:py-2.5 file:text-sm file:font-semibold file:text-blue-700 hover:file:bg-blue-100"
            onChange={(e) => setMarkedAnswerImage(e.target.files?.[0] || null)}
          />

          {initialValues?.markedAnswerImage && (
            <img
              src={mediaUrl(initialValues.markedAnswerImage)}
              alt="Marked answer"
              className={imagePreviewClass}
            />
          )}
        </div>

        {/* Options */}
        <div className="md:col-span-12">
          <h5 className="mb-4 mt-2 text-lg font-bold text-gray-800">
            4 Options
          </h5>

          <div className="space-y-4">
            {options.map((option, index) => (
              <div
                key={index}
                className={`rounded-xl border p-4 transition ${
                  correctOptionIndex === index
                    ? "border-blue-400 bg-blue-50"
                    : "border-gray-200 bg-white"
                }`}
              >
                <div className="grid grid-cols-1 items-center gap-3 md:grid-cols-12">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-100 text-base font-bold text-gray-700 md:col-span-1">
                    {String.fromCharCode(65 + index)}
                  </div>

                  <div className="md:col-span-6">
                    <input
                      value={option.text}
                      onChange={(e) => updateOptionText(index, e.target.value)}
                      className={inputClass}
                      placeholder={`Option ${index + 1}`}
                      required
                    />
                  </div>

                  <div className="md:col-span-4">
                    <input
                      type="file"
                      accept="image/*"
                      className="w-full rounded-lg border border-gray-300 bg-white text-sm text-gray-700 file:mr-3 file:border-0 file:bg-gray-100 file:px-3 file:py-2.5 file:text-sm file:font-medium file:text-gray-700 hover:file:bg-gray-200"
                      onChange={(e) =>
                        updateOptionImage(index, e.target.files?.[0] || null)
                      }
                    />

                    {option.image && (
                      <img
                        src={mediaUrl(option.image)}
                        alt="Option"
                        className="mt-3 max-h-28 max-w-[120px] rounded-lg border border-gray-200 object-contain shadow-sm"
                      />
                    )}
                  </div>

                  <div className="flex items-center justify-start md:col-span-1 md:justify-center">
                    <label className="flex cursor-pointer items-center gap-2 text-sm font-medium text-gray-700">
                      <input
                        type="radio"
                        name="correct"
                        checked={correctOptionIndex === index}
                        onChange={() => setCorrectOptionIndex(index)}
                        className="h-5 w-5 cursor-pointer accent-blue-600"
                        title="Correct answer"
                      />
                      <span className="md:hidden">Correct</span>
                    </label>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <p className="mt-3 text-sm text-gray-500">
            যেটা correct answer, সেই option-এর radio select করুন।
          </p>
        </div>

        {/* Explanation */}
        <div className="md:col-span-12">
          <label className={labelClass}>Small Explanation</label>
          <textarea
            value={explanationText}
            onChange={(e) => setExplanationText(e.target.value)}
            rows={3}
            className={inputClass}
          />
        </div>

        {/* Explanation Image */}
        <div className="md:col-span-6">
          <label className={labelClass}>Explanation Image</label>
          <input
            type="file"
            accept="image/*"
            className="w-full rounded-lg border border-gray-300 bg-white text-sm text-gray-700 file:mr-4 file:border-0 file:bg-blue-50 file:px-4 file:py-2.5 file:text-sm file:font-semibold file:text-blue-700 hover:file:bg-blue-100"
            onChange={(e) => setExplanationImage(e.target.files?.[0] || null)}
          />

          {initialValues?.explanationImage && (
            <img
              src={mediaUrl(initialValues.explanationImage)}
              alt="Explanation"
              className={imagePreviewClass}
            />
          )}
        </div>

        {/* Topic */}
        <div className="md:col-span-2">
          <label className={labelClass}>Topic</label>
          <input
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            className={inputClass}
          />
        </div>

        {/* Difficulty */}
        <div className="md:col-span-2">
          <label className={labelClass}>Difficulty</label>
          <select
            value={difficulty}
            onChange={(e) => setDifficulty(e.target.value)}
            className={inputClass}
          >
            <option value="easy">Easy</option>
            <option value="medium">Medium</option>
            <option value="hard">Hard</option>
          </select>
        </div>

        {/* Order */}
        <div className="md:col-span-1">
          <label className={labelClass}>Order</label>
          <input
            type="number"
            value={order}
            onChange={(e) => setOrder(e.target.value)}
            className={inputClass}
          />
        </div>

        {/* Status */}
        <div className="md:col-span-1">
          <label className={labelClass}>Status</label>
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className={inputClass}
          >
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </select>
        </div>
      </div>

      <button
        type="submit"
        disabled={loading}
        className="mt-6 inline-flex items-center justify-center rounded-lg bg-blue-600 px-6 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {loading ? "Saving..." : submitText}
      </button>
    </form>
  );
}
