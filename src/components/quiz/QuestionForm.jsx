// "use client";

// import { useEffect, useState } from "react";
// import { mediaUrl } from "@/utils/mediaUrl";

// const emptyOptions = [
//   { text: "", image: "", order: 0 },
//   { text: "", image: "", order: 1 },
//   { text: "", image: "", order: 2 },
//   { text: "", image: "", order: 3 },
// ];

// export default function QuestionForm({
//   initialValues = null,
//   onSubmit,
//   loading = false,
//   submitText = "Save Question",
// }) {
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
//       setOptions(
//         initialValues.options?.length === 4
//           ? initialValues.options
//           : emptyOptions,
//       );
//       setCorrectOptionIndex(Number(initialValues.correctOptionIndex || 0));
//       setExplanationText(initialValues.explanationText || "");
//       setTopic(initialValues.topic || "");
//       setDifficulty(initialValues.difficulty || "medium");
//       setOrder(initialValues.order || 0);
//       setStatus(initialValues.status || "active");
//     }
//   }, [initialValues]);

//   const updateOptionText = (index, value) => {
//     setOptions((prev) =>
//       prev.map((option, i) =>
//         i === index ? { ...option, text: value } : option,
//       ),
//     );
//   };

//   const updateOptionImage = (index, file) => {
//     setOptionImages((prev) =>
//       prev.map((item, i) => (i === index ? file : item)),
//     );
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
//     if (markedAnswerImage)
//       formData.append("markedAnswerImage", markedAnswerImage);

//     optionImages.forEach((file, index) => {
//       if (file) formData.append(`optionImage${index}`, file);
//     });

//     await onSubmit(formData);
//   };

//   const inputClass =
//     "w-full rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm text-gray-800 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100";

//   const labelClass = "mb-2 block text-sm font-semibold text-gray-700";

//   const imagePreviewClass =
//     "mt-3 max-h-44 max-w-[220px] rounded-lg border border-gray-200 object-contain shadow-sm";

//   return (
//     <form
//       onSubmit={handleSubmit}
//       className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm md:p-6"
//     >
//       <div className="grid grid-cols-1 gap-5 md:grid-cols-12">
//         {/* Question Text */}
//         <div className="md:col-span-12">
//           <label className={labelClass}>Question Text</label>
//           <textarea
//             value={questionText}
//             onChange={(e) => setQuestionText(e.target.value)}
//             rows={3}
//             className={inputClass}
//             required
//           />
//         </div>

//         {/* Voice Text */}
//         <div className="md:col-span-12">
//           <label className={labelClass}>Voice Text Optional</label>
//           <textarea
//             value={voiceText}
//             onChange={(e) => setVoiceText(e.target.value)}
//             rows={2}
//             className={inputClass}
//             placeholder="Empty থাকলে question text read করবে"
//           />
//         </div>

//         {/* Question Image */}
//         <div className="md:col-span-6">
//           <label className={labelClass}>Question Image</label>
//           <input
//             type="file"
//             accept="image/*"
//             className="w-full rounded-lg border border-gray-300 bg-white text-sm text-gray-700 file:mr-4 file:border-0 file:bg-blue-50 file:px-4 file:py-2.5 file:text-sm file:font-semibold file:text-blue-700 hover:file:bg-blue-100"
//             onChange={(e) => setQuestionImage(e.target.files?.[0] || null)}
//           />

//           {initialValues?.questionImage && (
//             <img
//               src={mediaUrl(initialValues.questionImage)}
//               alt="Question"
//               className={imagePreviewClass}
//             />
//           )}
//         </div>

//         {/* Marked Answer Image */}
//         <div className="md:col-span-6">
//           <label className={labelClass}>Marked Answer Image</label>
//           <input
//             type="file"
//             accept="image/*"
//             className="w-full rounded-lg border border-gray-300 bg-white text-sm text-gray-700 file:mr-4 file:border-0 file:bg-blue-50 file:px-4 file:py-2.5 file:text-sm file:font-semibold file:text-blue-700 hover:file:bg-blue-100"
//             onChange={(e) => setMarkedAnswerImage(e.target.files?.[0] || null)}
//           />

//           {initialValues?.markedAnswerImage && (
//             <img
//               src={mediaUrl(initialValues.markedAnswerImage)}
//               alt="Marked answer"
//               className={imagePreviewClass}
//             />
//           )}
//         </div>

//         {/* Options */}
//         <div className="md:col-span-12">
//           <h5 className="mb-4 mt-2 text-lg font-bold text-gray-800">
//             4 Options
//           </h5>

//           <div className="space-y-4">
//             {options.map((option, index) => (
//               <div
//                 key={index}
//                 className={`rounded-xl border p-4 transition ${
//                   correctOptionIndex === index
//                     ? "border-blue-400 bg-blue-50"
//                     : "border-gray-200 bg-white"
//                 }`}
//               >
//                 <div className="grid grid-cols-1 items-center gap-3 md:grid-cols-12">
//                   <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-100 text-base font-bold text-gray-700 md:col-span-1">
//                     {String.fromCharCode(65 + index)}
//                   </div>

//                   <div className="md:col-span-6">
//                     <input
//                       value={option.text}
//                       onChange={(e) => updateOptionText(index, e.target.value)}
//                       className={inputClass}
//                       placeholder={`Option ${index + 1}`}
//                       required
//                     />
//                   </div>

//                   <div className="md:col-span-4">
//                     <input
//                       type="file"
//                       accept="image/*"
//                       className="w-full rounded-lg border border-gray-300 bg-white text-sm text-gray-700 file:mr-3 file:border-0 file:bg-gray-100 file:px-3 file:py-2.5 file:text-sm file:font-medium file:text-gray-700 hover:file:bg-gray-200"
//                       onChange={(e) =>
//                         updateOptionImage(index, e.target.files?.[0] || null)
//                       }
//                     />

//                     {option.image && (
//                       <img
//                         src={mediaUrl(option.image)}
//                         alt="Option"
//                         className="mt-3 max-h-28 max-w-[120px] rounded-lg border border-gray-200 object-contain shadow-sm"
//                       />
//                     )}
//                   </div>

//                   <div className="flex items-center justify-start md:col-span-1 md:justify-center">
//                     <label className="flex cursor-pointer items-center gap-2 text-sm font-medium text-gray-700">
//                       <input
//                         type="radio"
//                         name="correct"
//                         checked={correctOptionIndex === index}
//                         onChange={() => setCorrectOptionIndex(index)}
//                         className="h-5 w-5 cursor-pointer accent-blue-600"
//                         title="Correct answer"
//                       />
//                       <span className="md:hidden">Correct</span>
//                     </label>
//                   </div>
//                 </div>
//               </div>
//             ))}
//           </div>

//           <p className="mt-3 text-sm text-gray-500">
//             যেটা correct answer, সেই option-এর radio select করুন।
//           </p>
//         </div>

//         {/* Explanation */}
//         <div className="md:col-span-12">
//           <label className={labelClass}>Small Explanation</label>
//           <textarea
//             value={explanationText}
//             onChange={(e) => setExplanationText(e.target.value)}
//             rows={3}
//             className={inputClass}
//           />
//         </div>

//         {/* Explanation Image */}
//         <div className="md:col-span-6">
//           <label className={labelClass}>Explanation Image</label>
//           <input
//             type="file"
//             accept="image/*"
//             className="w-full rounded-lg border border-gray-300 bg-white text-sm text-gray-700 file:mr-4 file:border-0 file:bg-blue-50 file:px-4 file:py-2.5 file:text-sm file:font-semibold file:text-blue-700 hover:file:bg-blue-100"
//             onChange={(e) => setExplanationImage(e.target.files?.[0] || null)}
//           />

//           {initialValues?.explanationImage && (
//             <img
//               src={mediaUrl(initialValues.explanationImage)}
//               alt="Explanation"
//               className={imagePreviewClass}
//             />
//           )}
//         </div>

//         {/* Topic */}
//         <div className="md:col-span-2">
//           <label className={labelClass}>Topic</label>
//           <input
//             value={topic}
//             onChange={(e) => setTopic(e.target.value)}
//             className={inputClass}
//           />
//         </div>

//         {/* Difficulty */}
//         <div className="md:col-span-2">
//           <label className={labelClass}>Difficulty</label>
//           <select
//             value={difficulty}
//             onChange={(e) => setDifficulty(e.target.value)}
//             className={inputClass}
//           >
//             <option value="easy">Easy</option>
//             <option value="medium">Medium</option>
//             <option value="hard">Hard</option>
//           </select>
//         </div>

//         {/* Order */}
//         <div className="md:col-span-1">
//           <label className={labelClass}>Order</label>
//           <input
//             type="number"
//             value={order}
//             onChange={(e) => setOrder(e.target.value)}
//             className={inputClass}
//           />
//         </div>

//         {/* Status */}
//         <div className="md:col-span-1">
//           <label className={labelClass}>Status</label>
//           <select
//             value={status}
//             onChange={(e) => setStatus(e.target.value)}
//             className={inputClass}
//           >
//             <option value="active">Active</option>
//             <option value="inactive">Inactive</option>
//           </select>
//         </div>
//       </div>

//       <button
//         type="submit"
//         disabled={loading}
//         className="mt-6 inline-flex items-center justify-center rounded-lg bg-blue-600 px-6 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
//       >
//         {loading ? "Saving..." : submitText}
//       </button>
//     </form>
//   );
// }

"use client";

import { useEffect, useState } from "react";
import {
  FaCheckCircle,
  FaClock,
  FaCloudUploadAlt,
  FaFileAlt,
  FaImage,
  FaInfoCircle,
  FaLayerGroup,
  FaListOl,
  FaQuestionCircle,
  FaSave,
  FaSortNumericDown,
  FaVolumeUp,
} from "react-icons/fa";
import { mediaUrl } from "@/utils/mediaUrl";

const emptyOptions = [
  { text: "", image: "", order: 0 },
  { text: "", image: "", order: 1 },
  { text: "", image: "", order: 2 },
  { text: "", image: "", order: 3 },
];

const inputClass =
  "h-9 w-full rounded-xl border border-slate-200 bg-[#f8f8fb] px-3 text-xs font-semibold text-slate-700 outline-none transition placeholder:text-slate-400 focus:border-violet-300 focus:bg-white focus:ring-4 focus:ring-violet-50";

const textareaClass =
  "min-h-[70px] w-full resize-y rounded-xl border border-slate-200 bg-[#f8f8fb] px-3 py-2 text-xs font-semibold leading-5 text-slate-700 outline-none transition placeholder:text-slate-400 focus:border-violet-300 focus:bg-white focus:ring-4 focus:ring-violet-50";

const fileClass =
  "block h-9 w-full rounded-xl border border-slate-200 bg-[#f8f8fb] text-xs font-semibold text-slate-500 file:mr-3 file:h-9 file:border-0 file:bg-slate-900 file:px-3 file:text-xs file:font-bold file:text-white hover:file:bg-slate-800";

function FieldLabel({ icon: Icon, children }) {
  return (
    <label className="mb-1 flex items-center gap-1.5 text-xs font-bold text-slate-600">
      {Icon && <Icon className="text-[11px] text-slate-400" />}
      {children}
    </label>
  );
}

function Badge({ children, tone = "slate" }) {
  const toneClass =
    tone === "green"
      ? "border-emerald-200 bg-emerald-50 text-emerald-700"
      : tone === "red"
        ? "border-rose-200 bg-rose-50 text-rose-700"
        : tone === "amber"
          ? "border-amber-200 bg-amber-50 text-amber-700"
          : tone === "sky"
            ? "border-sky-200 bg-sky-50 text-sky-700"
            : tone === "violet"
              ? "border-violet-200 bg-violet-50 text-violet-700"
              : "border-slate-200 bg-slate-50 text-slate-600";

  return (
    <span
      className={`inline-flex w-fit items-center gap-1 rounded-full border px-2.5 py-1 text-[11px] font-bold capitalize leading-none ${toneClass}`}
    >
      {children}
    </span>
  );
}

function ImagePreview({ src, alt = "Preview" }) {
  if (!src) {
    return (
      <div className="flex h-16 w-20 items-center justify-center rounded-xl border border-slate-200 bg-slate-50 text-slate-300">
        <FaImage />
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      className="h-16 w-20 rounded-xl border border-slate-200 object-cover"
    />
  );
}

function FileUploadBox({ label, currentImage, selectedFile, onChange }) {
  return (
    <div>
      <FieldLabel icon={FaImage}>{label}</FieldLabel>

      <div className="grid gap-2 sm:grid-cols-[1fr_86px]">
        <label className="flex h-16 cursor-pointer flex-col items-center justify-center rounded-xl border border-dashed border-slate-300 bg-[#f8f8fb] px-3 text-center transition hover:border-violet-300 hover:bg-violet-50/40">
          <FaCloudUploadAlt className="mb-1 text-base text-violet-500" />

          <p className="text-[11px] font-bold text-slate-700">
            {selectedFile ? selectedFile.name : "Upload image"}
          </p>

          <input
            type="file"
            accept="image/*"
            onChange={onChange}
            className="hidden"
          />
        </label>

        <ImagePreview
          src={currentImage ? mediaUrl(currentImage) : ""}
          alt={label}
        />
      </div>
    </div>
  );
}

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

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full overflow-hidden rounded-[16px] border border-slate-200 bg-white shadow-[0_8px_22px_rgba(15,23,42,0.04)]"
    >
      <div className="flex flex-col justify-between gap-2 border-b border-slate-100 bg-[#fbfbfd] px-3.5 py-3 sm:flex-row sm:items-center">
        <div className="flex items-center gap-2.5">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-violet-50 text-violet-600">
            <FaQuestionCircle className="text-sm" />
          </div>

          <div>
            <h2 className="text-base font-bold text-slate-900">
              Question Information
            </h2>

            <p className="mt-0.5 text-[11px] font-medium text-slate-400">
              Add question, answer options, images and explanation.
            </p>
          </div>
        </div>

        <div className="flex flex-wrap gap-1.5">
          <Badge tone="violet">
            Correct: {String.fromCharCode(65 + Number(correctOptionIndex || 0))}
          </Badge>
          <Badge tone={status === "active" ? "green" : "slate"}>{status}</Badge>
        </div>
      </div>

      <div className="p-3.5">
        <div className="grid gap-3 xl:grid-cols-12">
          <div className="xl:col-span-8">
            <FieldLabel icon={FaFileAlt}>Question Text</FieldLabel>

            <textarea
              value={questionText}
              onChange={(e) => setQuestionText(e.target.value)}
              rows={3}
              className={textareaClass}
              placeholder="Write question text..."
              required
            />
          </div>

          <div className="xl:col-span-4">
            <FieldLabel icon={FaVolumeUp}>Voice Text Optional</FieldLabel>

            <textarea
              value={voiceText}
              onChange={(e) => setVoiceText(e.target.value)}
              rows={3}
              className={textareaClass}
              placeholder="Empty থাকলে question text read করবে"
            />
          </div>

          <div className="xl:col-span-6">
            <FileUploadBox
              label="Question Image"
              currentImage={initialValues?.questionImage}
              selectedFile={questionImage}
              onChange={(e) => setQuestionImage(e.target.files?.[0] || null)}
            />
          </div>

          <div className="xl:col-span-6">
            <FileUploadBox
              label="Marked Answer Image"
              currentImage={initialValues?.markedAnswerImage}
              selectedFile={markedAnswerImage}
              onChange={(e) =>
                setMarkedAnswerImage(e.target.files?.[0] || null)
              }
            />
          </div>

          <div className="xl:col-span-12">
            <div className="mb-2 flex flex-col justify-between gap-2 sm:flex-row sm:items-center">
              <div>
                <h3 className="text-sm font-bold text-slate-900">4 Options</h3>
                <p className="mt-0.5 text-[11px] font-medium text-slate-400">
                  Select the radio button for the correct answer.
                </p>
              </div>

              <Badge tone="sky">
                <FaListOl />
                Options
              </Badge>
            </div>

            <div className="grid gap-2.5 xl:grid-cols-2">
              {options.map((option, index) => {
                const isCorrect = correctOptionIndex === index;

                return (
                  <div
                    key={index}
                    className={`rounded-[14px] border p-2.5 transition ${
                      isCorrect
                        ? "border-violet-200 bg-violet-50"
                        : "border-slate-200 bg-white"
                    }`}
                  >
                    <div className="grid items-center gap-2 md:grid-cols-[34px_minmax(0,1fr)_170px_34px]">
                      <div
                        className={`flex h-8 w-8 items-center justify-center rounded-xl text-xs font-bold ${
                          isCorrect
                            ? "bg-violet-600 text-white"
                            : "bg-slate-100 text-slate-600"
                        }`}
                      >
                        {String.fromCharCode(65 + index)}
                      </div>

                      <input
                        value={option.text}
                        onChange={(e) =>
                          updateOptionText(index, e.target.value)
                        }
                        className={inputClass}
                        placeholder={`Option ${index + 1}`}
                        required
                      />

                      <label className="flex h-9 cursor-pointer items-center justify-center rounded-xl border border-dashed border-slate-300 bg-[#f8f8fb] px-2 text-center text-[11px] font-bold text-slate-600 transition hover:border-violet-300 hover:bg-violet-50/40">
                        <FaCloudUploadAlt className="mr-1.5 text-violet-500" />
                        {optionImages[index]
                          ? optionImages[index].name
                          : option.image
                            ? "Change image"
                            : "Option image"}

                        <input
                          type="file"
                          accept="image/*"
                          className="hidden"
                          onChange={(e) =>
                            updateOptionImage(
                              index,
                              e.target.files?.[0] || null,
                            )
                          }
                        />
                      </label>

                      <label className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-xl border border-slate-200 bg-white">
                        <input
                          type="radio"
                          name="correct"
                          checked={isCorrect}
                          onChange={() => setCorrectOptionIndex(index)}
                          className="h-4 w-4 cursor-pointer accent-violet-600"
                          title="Correct answer"
                        />
                      </label>
                    </div>

                    {option.image && (
                      <div className="mt-2 flex items-center gap-2">
                        <ImagePreview
                          src={mediaUrl(option.image)}
                          alt={`Option ${index + 1}`}
                        />

                        <p className="text-[11px] font-medium text-slate-400">
                          Existing option image
                        </p>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          <div className="xl:col-span-8">
            <FieldLabel icon={FaInfoCircle}>Small Explanation</FieldLabel>

            <textarea
              value={explanationText}
              onChange={(e) => setExplanationText(e.target.value)}
              rows={3}
              className={textareaClass}
              placeholder="Write short explanation..."
            />
          </div>

          <div className="xl:col-span-4">
            <FileUploadBox
              label="Explanation Image"
              currentImage={initialValues?.explanationImage}
              selectedFile={explanationImage}
              onChange={(e) => setExplanationImage(e.target.files?.[0] || null)}
            />
          </div>

          <div className="xl:col-span-4">
            <FieldLabel icon={FaLayerGroup}>Topic</FieldLabel>

            <select
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              className={inputClass}
              required
            >
              <option value="">Select topic</option>
              <option value="L">L — Legal provisions regarding road traffic</option>
              <option value="HAS">HAS — First aid</option>
              <option value="C">C — The Driver</option>
              <option value="P">P — Precautions when leaving the vehicle</option>
              <option value="R">R — The Road</option>
              <option value="M">M — Mechanical components & safety</option>
              <option value="U">U — Other road users</option>
              <option value="S">S — Vehicle safety equipment</option>
              <option value="D">D — General regulations</option>
              <option value="E">E — Ecology</option>
            </select>
          </div>

          <div className="xl:col-span-3">
            <FieldLabel icon={FaCheckCircle}>Difficulty</FieldLabel>

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

          <div className="xl:col-span-2">
            <FieldLabel icon={FaSortNumericDown}>Order</FieldLabel>

            <input
              type="number"
              value={order}
              onChange={(e) => setOrder(e.target.value)}
              className={inputClass}
            />
          </div>

          <div className="xl:col-span-3">
            <FieldLabel icon={FaCheckCircle}>Status</FieldLabel>

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

        <div className="mt-3 flex flex-col justify-between gap-2 border-t border-slate-100 pt-3 sm:flex-row sm:items-center">
          <p className="text-[11px] font-medium text-slate-400">
            যেটা correct answer, সেই option-এর radio select করুন।
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
      </div>
    </form>
  );
}
