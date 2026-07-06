// "use client";

// import { useEffect, useMemo, useRef, useState } from "react";
// import { useParams, useRouter } from "next/navigation";
// import { finishQuizAttempt, startQuizAttempt, submitQuizAnswer } from "@/features/API";
// import { mediaUrl } from "@/utils/mediaUrl";

// const optionLetter = (index) => String.fromCharCode(65 + index);

// export default function QuizAttemptPage() {
//   const { quizId } = useParams();
//   const router = useRouter();
//   const hasStarted = useRef(false);
//   const hasFinished = useRef(false);

//   const [quiz, setQuiz] = useState(null);
//   const [attempt, setAttempt] = useState(null);
//   const [questions, setQuestions] = useState([]);
//   const [currentIndex, setCurrentIndex] = useState(0);
//   const [selectedIndex, setSelectedIndex] = useState(null);
//   const [feedback, setFeedback] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [submitting, setSubmitting] = useState(false);
//   const [error, setError] = useState("");
//   const [timeLeft, setTimeLeft] = useState(0);
//   const [questionStartTime, setQuestionStartTime] = useState(Date.now());

//   const currentQuestion = questions[currentIndex];
//   const progress = questions.length ? Math.round(((currentIndex + 1) / questions.length) * 100) : 0;

//   const formattedTime = useMemo(() => {
//     const minutes = Math.floor(timeLeft / 60).toString().padStart(2, "0");
//     const seconds = Math.floor(timeLeft % 60).toString().padStart(2, "0");
//     return `${minutes}:${seconds}`;
//   }, [timeLeft]);

//   useEffect(() => {
//     const start = async () => {
//       if (hasStarted.current) return;
//       hasStarted.current = true;
//       try {
//         setLoading(true);
//         const res = await startQuizAttempt(quizId);
//         const data = res.data?.data;
//         setQuiz(data.quiz);
//         setAttempt(data.attempt);
//         setQuestions(data.questions || []);
//         setTimeLeft((data.quiz?.durationMinutes || 30) * 60);
//         setQuestionStartTime(Date.now());
//       } catch (err) {
//         setError(err.response?.data?.message || err.message || "Failed to start quiz");
//       } finally {
//         setLoading(false);
//       }
//     };
//     if (quizId) start();
//   }, [quizId]);

//   const finishAttempt = async () => {
//     if (!attempt?._id || hasFinished.current) return;
//     hasFinished.current = true;
//     try {
//       const res = await finishQuizAttempt(attempt._id);
//       const finishedAttempt = res.data?.data;
//       router.push(`/student/quizzes/result/${finishedAttempt._id}`);
//     } catch (err) {
//       setError(err.response?.data?.message || err.message || "Failed to finish quiz");
//     }
//   };

//   useEffect(() => {
//     if (!attempt?._id || timeLeft <= 0 || hasFinished.current) return;
//     const timer = setInterval(() => {
//       setTimeLeft((prev) => {
//         if (prev <= 1) {
//           clearInterval(timer);
//           finishAttempt();
//           return 0;
//         }
//         return prev - 1;
//       });
//     }, 1000);

//     return () => clearInterval(timer);
//   }, [attempt?._id, timeLeft]);

//   const speakQuestion = () => {
//     if (!currentQuestion || typeof window === "undefined" || !window.speechSynthesis) return;
//     window.speechSynthesis.cancel();
//     const utterance = new SpeechSynthesisUtterance(currentQuestion.voiceText || currentQuestion.questionText);
//     utterance.lang = "fr-FR";
//     utterance.rate = 0.9;
//     window.speechSynthesis.speak(utterance);
//   };

//   const selectAnswer = async (index) => {
//     if (!attempt?._id || !currentQuestion?._id || feedback || submitting) return;

//     try {
//       setSubmitting(true);
//       setSelectedIndex(index);
//       const timeSpentSeconds = Math.max(Math.round((Date.now() - questionStartTime) / 1000), 0);
//       const res = await submitQuizAnswer(attempt._id, {
//         questionId: currentQuestion._id,
//         selectedOptionIndex: index,
//         timeSpentSeconds,
//       });
//       setFeedback(res.data?.data);
//     } catch (err) {
//       setError(err.response?.data?.message || err.message || "Failed to submit answer");
//     } finally {
//       setSubmitting(false);
//     }
//   };

//   const nextQuestion = () => {
//     setSelectedIndex(null);
//     setFeedback(null);
//     setQuestionStartTime(Date.now());

//     if (currentIndex + 1 >= questions.length) {
//       finishAttempt();
//       return;
//     }

//     setCurrentIndex((prev) => prev + 1);
//   };

//   const optionClassName = (index) => {
//     if (!feedback) return "btn btn-outline-dark text-start p-3 w-100";
//     if (index === feedback.correctOptionIndex) return "btn btn-success text-start p-3 w-100";
//     if (index === selectedIndex && !feedback.isCorrect) return "btn btn-danger text-start p-3 w-100";
//     return "btn btn-outline-secondary text-start p-3 w-100 disabled opacity-75";
//   };

//   if (loading) return <div className="container py-5"><div className="alert alert-info">Starting quiz...</div></div>;
//   if (error) return <div className="container py-5"><div className="alert alert-danger">{error}</div></div>;
//   if (!currentQuestion) return <div className="container py-5"><div className="alert alert-warning">No question found.</div></div>;

//   return (
//     <div className="container py-4">
//       <div className="card border-0 shadow-sm mb-4">
//         <div className="card-body">
//           <div className="d-flex justify-content-between align-items-start gap-3 mb-3">
//             <div>
//               <h4 className="mb-1">{quiz?.title}</h4>
//               <div className="text-muted">Question {currentIndex + 1} of {questions.length}</div>
//             </div>
//             <div className="badge bg-dark fs-6">{formattedTime}</div>
//           </div>
//           <div className="progress" role="progressbar" aria-valuenow={progress} aria-valuemin="0" aria-valuemax="100">
//             <div className="progress-bar" style={{ width: `${progress}%` }}>{progress}%</div>
//           </div>
//         </div>
//       </div>

//       <div className="card border-0 shadow-sm">
//         <div className="card-body p-4">
//           {currentQuestion.questionImage && (
//             <img src={mediaUrl(currentQuestion.questionImage)} alt="Question" className="rounded border mb-4" style={{ width: "100%", maxHeight: 360, objectFit: "contain" }} />
//           )}

//           <div className="d-flex gap-3 align-items-start mb-4">
//             <h3 className="flex-grow-1 mb-0">{currentQuestion.questionText}</h3>
//             <button type="button" onClick={speakQuestion} className="btn btn-outline-primary">🔊 Voice</button>
//           </div>

//           <div className="row g-3">
//             {currentQuestion.options.map((option, index) => (
//               <div key={index} className="col-md-6">
//                 <button type="button" disabled={Boolean(feedback) || submitting} onClick={() => selectAnswer(index)} className={optionClassName(index)}>
//                   <span className="fw-bold me-2">{optionLetter(index)}.</span>
//                   <span>{option.text}</span>
//                   {option.image && <img src={mediaUrl(option.image)} alt="Option" className="d-block rounded border mt-2" style={{ maxWidth: "100%", maxHeight: 140, objectFit: "contain" }} />}
//                 </button>
//               </div>
//             ))}
//           </div>

//           {feedback && (
//             <div className={`alert mt-4 ${feedback.isCorrect ? "alert-success" : "alert-danger"}`}>
//               <h5>{feedback.isCorrect ? "Correct Answer ✅" : "Wrong Answer ❌"}</h5>
//               {feedback.explanationText && <p className="mb-3">{feedback.explanationText}</p>}
//               <div className="row g-3">
//                 {feedback.markedAnswerImage && (
//                   <div className="col-md-6">
//                     <div className="fw-semibold mb-2">Marked Answer</div>
//                     <img src={mediaUrl(feedback.markedAnswerImage)} alt="Marked answer" className="rounded border bg-white" style={{ width: "100%", maxHeight: 300, objectFit: "contain" }} />
//                   </div>
//                 )}
//                 {feedback.explanationImage && (
//                   <div className="col-md-6">
//                     <div className="fw-semibold mb-2">Explanation Image</div>
//                     <img src={mediaUrl(feedback.explanationImage)} alt="Explanation" className="rounded border bg-white" style={{ width: "100%", maxHeight: 300, objectFit: "contain" }} />
//                   </div>
//                 )}
//               </div>
//               <button onClick={nextQuestion} className="btn btn-primary mt-4">
//                 {currentIndex + 1 >= questions.length ? "Finish Quiz" : "Next Question"}
//               </button>
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// }

"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import {
  finishQuizAttempt,
  startQuizAttempt,
  submitQuizAnswer,
} from "@/features/API";
import { mediaUrl } from "@/utils/mediaUrl";

const optionLetter = (index) => String.fromCharCode(65 + index);

export default function QuizAttemptPage() {
  const { quizId } = useParams();
  const router = useRouter();
  const hasStarted = useRef(false);
  const hasFinished = useRef(false);

  const [quiz, setQuiz] = useState(null);
  const [attempt, setAttempt] = useState(null);
  const [questions, setQuestions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [feedback, setFeedback] = useState(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [timeLeft, setTimeLeft] = useState(0);
  const [questionStartTime, setQuestionStartTime] = useState(Date.now());

  const currentQuestion = questions[currentIndex];

  const progress = questions.length
    ? Math.round(((currentIndex + 1) / questions.length) * 100)
    : 0;

  const formattedTime = useMemo(() => {
    const minutes = Math.floor(timeLeft / 60)
      .toString()
      .padStart(2, "0");
    const seconds = Math.floor(timeLeft % 60)
      .toString()
      .padStart(2, "0");
    return `${minutes}:${seconds}`;
  }, [timeLeft]);

  useEffect(() => {
    const start = async () => {
      if (hasStarted.current) return;
      hasStarted.current = true;

      try {
        setLoading(true);

        const res = await startQuizAttempt(quizId);
        const data = res.data?.data;

        setQuiz(data.quiz);
        setAttempt(data.attempt);
        setQuestions(data.questions || []);
        setTimeLeft((data.quiz?.durationMinutes || 30) * 60);
        setQuestionStartTime(Date.now());
      } catch (err) {
        setError(
          err.response?.data?.message || err.message || "Failed to start quiz",
        );
      } finally {
        setLoading(false);
      }
    };

    if (quizId) start();
  }, [quizId]);

  const finishAttempt = async () => {
    if (!attempt?._id || hasFinished.current) return;

    hasFinished.current = true;

    try {
      const res = await finishQuizAttempt(attempt._id);
      const finishedAttempt = res.data?.data;

      router.push(`/student/quizzes/result/${finishedAttempt._id}`);
    } catch (err) {
      setError(
        err.response?.data?.message || err.message || "Failed to finish quiz",
      );
    }
  };

  useEffect(() => {
    if (!attempt?._id || timeLeft <= 0 || hasFinished.current) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          finishAttempt();
          return 0;
        }

        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [attempt?._id, timeLeft]);

  const speakQuestion = () => {
    if (
      !currentQuestion ||
      typeof window === "undefined" ||
      !window.speechSynthesis
    )
      return;

    window.speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(
      currentQuestion.voiceText || currentQuestion.questionText,
    );

    utterance.lang = "fr-FR";
    utterance.rate = 0.9;

    window.speechSynthesis.speak(utterance);
  };

  const selectAnswer = async (index) => {
    if (!attempt?._id || !currentQuestion?._id || feedback || submitting)
      return;

    try {
      setSubmitting(true);
      setSelectedIndex(index);

      const timeSpentSeconds = Math.max(
        Math.round((Date.now() - questionStartTime) / 1000),
        0,
      );

      const res = await submitQuizAnswer(attempt._id, {
        questionId: currentQuestion._id,
        selectedOptionIndex: index,
        timeSpentSeconds,
      });

      setFeedback(res.data?.data);
    } catch (err) {
      setError(
        err.response?.data?.message || err.message || "Failed to submit answer",
      );
    } finally {
      setSubmitting(false);
    }
  };

  const nextQuestion = () => {
    setSelectedIndex(null);
    setFeedback(null);
    setQuestionStartTime(Date.now());

    if (currentIndex + 1 >= questions.length) {
      finishAttempt();
      return;
    }

    setCurrentIndex((prev) => prev + 1);
  };

  const optionClassName = (index) => {
    const base =
      "w-full rounded-xl border p-4 text-left transition duration-200";

    if (!feedback)
      return `${base} border-gray-300 bg-white hover:border-blue-500 hover:bg-blue-50`;

    if (index === feedback.correctOptionIndex)
      return `${base} border-green-600 bg-green-100 text-green-900`;

    if (index === selectedIndex && !feedback.isCorrect)
      return `${base} border-red-600 bg-red-100 text-red-900`;

    return `${base} border-gray-300 bg-gray-100 opacity-70 cursor-not-allowed`;
  };

  if (loading)
    return (
      <div className="mx-auto max-w-5xl p-6">
        <div className="rounded-xl bg-blue-100 p-4 text-blue-700">
          Starting quiz...
        </div>
      </div>
    );

  if (error)
    return (
      <div className="mx-auto max-w-5xl p-6">
        <div className="rounded-xl bg-red-100 p-4 text-red-700">{error}</div>
      </div>
    );

  if (!currentQuestion)
    return (
      <div className="mx-auto max-w-5xl p-6">
        <div className="rounded-xl bg-yellow-100 p-4 text-yellow-700">
          No question found.
        </div>
      </div>
    );

  return (
    <div className="mx-auto max-w-6xl space-y-6 p-6">
      {/* Header */}

      <div className="rounded-2xl bg-white shadow-lg">
        <div className="p-6">
          <div className="mb-5 flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
            <div>
              <h2 className="text-2xl font-bold">{quiz?.title}</h2>

              <p className="mt-1 text-gray-500">
                Question {currentIndex + 1} of {questions.length}
              </p>
            </div>

            <div className="rounded-xl bg-gray-900 px-5 py-2 text-lg font-bold text-white">
              {formattedTime}
            </div>
          </div>

          <div className="h-3 w-full overflow-hidden rounded-full bg-gray-200">
            <div
              className="flex h-full items-center justify-center bg-blue-600 text-xs font-semibold text-white"
              style={{ width: `${progress}%` }}
            >
              {progress}%
            </div>
          </div>
        </div>
      </div>

      {/* Question */}

      <div className="rounded-2xl bg-white shadow-lg">
        <div className="p-6">
          {currentQuestion.questionImage && (
            <img
              src={mediaUrl(currentQuestion.questionImage)}
              alt=""
              className="mb-6 h-[360px] w-full rounded-xl border object-contain"
            />
          )}

          <div className="mb-8 flex items-start justify-between gap-4">
            <h3 className="flex-1 text-2xl font-semibold">
              {currentQuestion.questionText}
            </h3>

            <button
              onClick={speakQuestion}
              className="rounded-lg border border-blue-600 px-4 py-2 font-medium text-blue-600 hover:bg-blue-600 hover:text-white"
            >
              🔊 Voice
            </button>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            {currentQuestion.options.map((option, index) => (
              <button
                key={index}
                disabled={Boolean(feedback) || submitting}
                onClick={() => selectAnswer(index)}
                className={optionClassName(index)}
              >
                <span className="mr-2 font-bold">{optionLetter(index)}.</span>

                {option.text}

                {option.image && (
                  <img
                    src={mediaUrl(option.image)}
                    alt=""
                    className="mt-3 max-h-36 w-full rounded-lg border object-contain"
                  />
                )}
              </button>
            ))}
          </div>

          {feedback && (
            <div
              className={`mt-8 rounded-xl border p-6 ${
                feedback.isCorrect
                  ? "border-green-300 bg-green-50"
                  : "border-red-300 bg-red-50"
              }`}
            >
              <h4 className="mb-3 text-xl font-bold">
                {feedback.isCorrect ? "✅ Correct Answer" : "❌ Wrong Answer"}
              </h4>

              {feedback.explanationText && (
                <p className="mb-6">{feedback.explanationText}</p>
              )}

              <div className="grid gap-6 md:grid-cols-2">
                {feedback.markedAnswerImage && (
                  <div>
                    <p className="mb-2 font-semibold">Marked Answer</p>

                    <img
                      src={mediaUrl(feedback.markedAnswerImage)}
                      alt=""
                      className="max-h-[300px] w-full rounded-xl border bg-white object-contain"
                    />
                  </div>
                )}

                {feedback.explanationImage && (
                  <div>
                    <p className="mb-2 font-semibold">Explanation Image</p>

                    <img
                      src={mediaUrl(feedback.explanationImage)}
                      alt=""
                      className="max-h-[300px] w-full rounded-xl border bg-white object-contain"
                    />
                  </div>
                )}
              </div>

              <button
                onClick={nextQuestion}
                className="mt-8 rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white transition hover:bg-blue-700"
              >
                {currentIndex + 1 >= questions.length
                  ? "Finish Quiz"
                  : "Next Question"}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
