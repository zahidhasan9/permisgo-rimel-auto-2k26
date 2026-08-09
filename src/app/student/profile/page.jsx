"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { BsCheckSquareFill, BsPlusCircleFill } from "react-icons/bs";
import { FiEdit2, FiX } from "react-icons/fi";
import Link from "next/link";
import { IoChevronBack } from "react-icons/io5";
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import {
  getLoggedInUser,
  getStudentDashboard,
  getLearningContents,
  getLearningSummary,
  getLessons,
  getLessonStats,
  getStudentProfile,
  updateStudentProfile,
} from "@/features/API";

const BLUE = "#174A9B";

const fallbackChartData = [
  { x: 0, y: 7 },
  { x: 0.28, y: 17 },
  { x: 0.55, y: 20 },
  { x: 0.84, y: 14 },
  { x: 1.08, y: 15 },
  { x: 1.1, y: 27 },
  { x: 1.3, y: 29 },
  { x: 1.55, y: 22 },
  { x: 1.9, y: 21 },
  { x: 2.1, y: 25 },
  { x: 2.25, y: 36 },
  { x: 2.55, y: 38.7 },
  { x: 2.8, y: 35 },
  { x: 3.1, y: 26 },
  { x: 3.35, y: 24 },
  { x: 3.75, y: 28 },
  { x: 4.15, y: 37 },
];

const fallbackLearningRows = [
  ["Registration", "24/03/2026", "Theoretical exam"],
  ["Assessment", "24/03/2026", "Practical exam"],
  ["Entry Code", "24/03/2026", "Theoretical exam"],
  ["Registration", "24/03/2026", "Practical exam"],
  ["Entrance to the driveway", "24/03/2026", "Theoretical exam"],
];

const fallbackProfileSteps = [
  ["Account Setup", false],
  ["Profile Photo", false],
  ["Personal Info", false],
  ["Driving Info (+20%)", false],
  ["Contact", false],
  ["Documents (+20%)", false],
];

const getResponseData = (response) => response?.data?.data ?? null;

const getAvatarUrl = (avatar) => {
  if (!avatar) return "";

  // Cloudinary or any complete image URL
  if (avatar.startsWith("http://") || avatar.startsWith("https://")) {
    return avatar;
  }

  // Local backend image such as /uploads/profiles/photo.jpg
  const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";
  const backendUrl = apiUrl.replace(/\/api\/?$/, "");

  return `${backendUrl}${avatar.startsWith("/") ? avatar : `/${avatar}`}`;
};

const formatDate = (value, fallback = "Not added") => {
  if (!value) return fallback;

  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return fallback;

  return new Intl.DateTimeFormat("en-GB", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  }).format(date);
};

const formatLongDate = (value, fallback = "Not added") => {
  if (!value) return fallback;

  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return fallback;

  return new Intl.DateTimeFormat("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(date);
};

const toApiDate = (value) => {
  if (!value?.trim()) return null;

  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return undefined;

  return date.toISOString();
};

const formatHours = (minutes) => {
  const safeMinutes = Number(minutes) || 0;
  const hours = safeMinutes / 60;

  if (Number.isInteger(hours)) return `${hours} Hours`;
  return `${hours.toFixed(1)} Hours`;
};

const formatPlannedTime = (minutes) => {
  const safeMinutes = Math.max(Number(minutes) || 0, 0);

  if (safeMinutes < 60) return `${safeMinutes} min`;
  return formatHours(safeMinutes);
};

const formatClockTime = (minutes) => {
  const safeMinutes = Math.max(Number(minutes) || 0, 0);
  const hours = Math.floor(safeMinutes / 60);
  const remainingMinutes = safeMinutes % 60;

  return `${String(hours).padStart(2, "0")}:${String(remainingMinutes).padStart(
    2,
    "0",
  )}`;
};

const formatLearningType = (type) => {
  const labels = {
    "road-sign": "Road Sign",
    "code-ebook": "Code E-book",
    "knowledge-sheet": "Knowledge Sheet",
    "live-replay": "Live Replay",
  };

  return labels[type] || type || "Learning content";
};

const formatVehicleType = (value, fallback = "Automatic") => {
  if (!value) return fallback;

  const normalized = String(value).toLowerCase();
  if (normalized === "automatic") return "Automatic";
  if (normalized === "manual") return "Manual";

  return value;
};

const getVehicleTypeForApi = (value) => {
  return String(value || "")
    .toLowerCase()
    .includes("manual")
    ? "manual"
    : "automatic";
};

const createLessonChart = (lessons) => {
  const validLessonDates = lessons
    .map((lesson) => new Date(lesson?.lessonDate))
    .filter((date) => !Number.isNaN(date.getTime()));

  const latestLessonDate = validLessonDates.length
    ? new Date(Math.max(...validLessonDates.map((date) => date.getTime())))
    : new Date();

  const months = [];

  for (let offset = 4; offset >= 0; offset -= 1) {
    const date = new Date(
      latestLessonDate.getFullYear(),
      latestLessonDate.getMonth() - offset,
      1,
    );

    months.push({
      key: `${date.getFullYear()}-${date.getMonth()}`,
      label: new Intl.DateTimeFormat("en-US", { month: "short" }).format(date),
      year: date.getFullYear(),
      minutes: 0,
    });
  }

  const monthMap = new Map(months.map((month) => [month.key, month]));

  lessons.forEach((lesson) => {
    const date = new Date(lesson?.lessonDate);
    if (Number.isNaN(date.getTime())) return;

    const key = `${date.getFullYear()}-${date.getMonth()}`;
    const month = monthMap.get(key);

    if (month) {
      month.minutes += Number(lesson?.duration) || 0;
    }
  });

  const xPositions = [0.08, 1.02, 2, 2.95, 4];

  return {
    data: months.map((month, index) => ({
      x: xPositions[index],
      y: Number((month.minutes / 60).toFixed(2)),
    })),
    labels: months.map((month) => month.label),
    year: months.at(-1)?.year || new Date().getFullYear(),
  };
};

const createLearningRows = (contents, summary) => {
  const summaryMap = new Map(
    (Array.isArray(summary) ? summary : []).map((item) => [item.type, item]),
  );

  let rows = [];

  if (Array.isArray(contents) && contents.length) {
    rows = contents.slice(0, 5).map((item) => {
      const itemSummary = summaryMap.get(item?.type);
      const progressDate =
        item?.progress?.completedAt ||
        item?.progress?.updatedAt ||
        item?.updatedAt ||
        item?.createdAt;
      const progressLabel = itemSummary
        ? `${formatLearningType(item?.type)} · ${itemSummary.percentage || 0}%`
        : formatLearningType(item?.type);

      return [
        item?.title || "Learning content",
        formatDate(progressDate),
        progressLabel,
      ];
    });
  } else if (Array.isArray(summary) && summary.length) {
    rows = summary
      .slice(0, 5)
      .map((item) => [
        formatLearningType(item?.type),
        `${item?.completed || 0}/${item?.total || 0} completed`,
        `${item?.percentage || 0}% progress`,
      ]);
  }

  while (rows.length < 5) {
    rows.push(fallbackLearningRows[rows.length]);
  }

  return rows.slice(0, 5);
};

export default function Page() {
  const router = useRouter();

  const [profileHeader, setProfileHeader] = useState({
    name: "Student",
    role: "Driving Student",
    avatar: "",
  });

  const [personalInfo, setPersonalInfo] = useState([
    { label: "Date of Birth", value: "12 March 2000" },
    { label: "Email", value: "shahin@email.com" },
    { label: "Address", value: "Paris, France" },
  ]);

  const [drivingInfo, setDrivingInfo] = useState([
    { label: "NEPH Number", value: "250395301980" },
    { label: "Permit Type", value: "Accelerated Training" },
    { label: "License Type", value: "Automatic" },
  ]);

  const [lessonSummary, setLessonSummary] = useState([
    ["40 Hours", "Completed"],
    ["0 min", "Planned"],
    ["40:00", "Evaluated"],
  ]);
  const [chartData, setChartData] = useState(fallbackChartData);
  const [chartMonths, setChartMonths] = useState([
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ]);
  const [summaryYear, setSummaryYear] = useState(2026);
  const [learningRows, setLearningRows] = useState(fallbackLearningRows);
  const [profilePageLoading, setProfilePageLoading] = useState(true);
  const [profileCompletion, setProfileCompletion] = useState({
    percentage: 0,
    steps: fallbackProfileSteps,
  });
  const [instructorNote, setInstructorNote] = useState(null);
  const [saving, setSaving] = useState(false);

  const [modal, setModal] = useState({
    open: false,
    type: "",
    title: "",
    data: [],
  });

  const applyLoggedInUser = (user) => {
    if (!user) return;

    setProfileHeader({
      name: user.name || "Student",
      role: user.role === "student" ? "Driving Student" : user.role || "User",
      avatar: getAvatarUrl(user.avatar),
    });

    // Email also comes from /auth/me
    setPersonalInfo((current) =>
      current.map((item) =>
        item.label === "Email"
          ? { ...item, value: user.email || item.value }
          : item,
      ),
    );
  };

  const applyProfile = (profile) => {
    if (!profile) return;

    const user = profile?.user || {};
    const address =
      profile?.address ||
      [profile?.city, user?.country].filter(Boolean).join(", ");

    setPersonalInfo((current) => [
      {
        label: "Date of Birth",
        value: formatLongDate(profile?.dateOfBirth, current[0]?.value),
      },
      {
        label: "Email",
        value: current[1]?.value,
      },
      {
        label: "Address",
        value: address || current[2]?.value,
      },
    ]);

    setDrivingInfo((current) => [
      current[0],
      {
        label: "Permit Type",
        value: profile?.drivingInfo?.currentLevel || current[1]?.value,
      },
      {
        label: "License Type",
        value: formatVehicleType(
          profile?.drivingInfo?.preferredVehicleType ||
            profile?.drivingInfo?.licenseType,
          current[2]?.value,
        ),
      },
    ]);
  };

  const applyProfileCompletion = (completion) => {
    if (!Array.isArray(completion?.items)) return;

    setProfileCompletion({
      percentage: Math.min(
        100,
        Math.max(0, Number(completion?.percentage) || 0),
      ),
      steps: completion.items.map((item) => [
        item?.label || "Profile item",
        Boolean(item?.completed),
      ]),
    });
  };

  useEffect(() => {
    let isMounted = true;

    const loadProfilePage = async () => {
      // Logged-in user's name, role, email and avatar
      try {
        const meResponse = await getLoggedInUser();
        const loggedInUser = meResponse?.data?.data?.user;
        applyLoggedInUser(loggedInUser);
      } catch (error) {
        console.error(
          error?.response?.data?.message ||
            error?.message ||
            "Logged-in user could not be loaded",
        );
      }

      const results = await Promise.allSettled([
        getStudentProfile(),
        getLessonStats(),
        getLessons({ limit: 100, sortOrder: "asc" }),
        getLearningContents(),
        getLearningSummary(),
        getStudentDashboard(),
      ]);

      if (!isMounted) return;

      if (results[0].status === "fulfilled") {
        applyProfile(getResponseData(results[0].value));
      }

      const stats =
        results[1].status === "fulfilled"
          ? getResponseData(results[1].value)
          : null;

      if (results[2].status === "fulfilled") {
        const lessons = getResponseData(results[2].value);

        if (Array.isArray(lessons)) {
          const latestLessonWithNote = lessons
            .filter(
              (lesson) =>
                lesson?.status === "completed" &&
                String(lesson?.lessonProgress?.teacherNotes || "").trim(),
            )
            .sort((first, second) => {
              const firstDate = new Date(
                first?.lessonProgress?.teacherSubmittedAt ||
                  first?.lessonDate ||
                  0,
              ).getTime();
              const secondDate = new Date(
                second?.lessonProgress?.teacherSubmittedAt ||
                  second?.lessonDate ||
                  0,
              ).getTime();

              return secondDate - firstDate;
            })[0];

          setInstructorNote(
            latestLessonWithNote
              ? {
                  note: latestLessonWithNote.lessonProgress.teacherNotes,
                  teacher:
                    latestLessonWithNote?.teacher?.name ||
                    latestLessonWithNote?.teacher?.fullName ||
                    "Instructor",
                  date:
                    latestLessonWithNote?.lessonProgress?.teacherSubmittedAt ||
                    latestLessonWithNote?.lessonDate,
                  title:
                    latestLessonWithNote?.title ||
                    latestLessonWithNote?.booking?.title ||
                    "Driving lesson",
                }
              : null,
          );

          const completedMinutes = lessons
            .filter((lesson) => lesson?.status === "completed")
            .reduce(
              (total, lesson) => total + (Number(lesson?.duration) || 0),
              0,
            );

          const plannedMinutes = lessons
            .filter((lesson) =>
              ["scheduled", "in_progress", "awaiting_confirmation"].includes(
                lesson?.status,
              ),
            )
            .reduce(
              (total, lesson) => total + (Number(lesson?.duration) || 0),
              0,
            );

          const evaluatedMinutes = lessons
            .filter((lesson) => {
              const progress = lesson?.lessonProgress;

              return (
                lesson?.status === "completed" &&
                (progress?.rating ||
                  progress?.teacherSubmittedAt ||
                  (progress?.performance &&
                    progress.performance !== "not_assessed"))
              );
            })
            .reduce(
              (total, lesson) => total + (Number(lesson?.duration) || 0),
              0,
            );

          setLessonSummary([
            [formatHours(completedMinutes), "Completed"],
            [formatPlannedTime(plannedMinutes), "Planned"],
            [formatClockTime(evaluatedMinutes), "Evaluated"],
          ]);

          const chart = createLessonChart(lessons);
          setChartData(chart.data);
          setChartMonths(chart.labels);
          setSummaryYear(chart.year);
        }
      } else if (stats) {
        setLessonSummary([
          [`${stats?.completed || 0} Lessons`, "Completed"],
          [`${stats?.scheduled || 0} Lessons`, "Planned"],
          [`${stats?.awaiting_confirmation || 0} Lessons`, "Evaluated"],
        ]);
      }

      const contents =
        results[3].status === "fulfilled"
          ? getResponseData(results[3].value)
          : [];
      const learningSummary =
        results[4].status === "fulfilled"
          ? getResponseData(results[4].value)
          : [];

      if (
        (Array.isArray(contents) && contents.length) ||
        (Array.isArray(learningSummary) && learningSummary.length)
      ) {
        setLearningRows(createLearningRows(contents, learningSummary));
      }

      if (results[5].status === "fulfilled") {
        const dashboard = getResponseData(results[5].value);
        const completion = dashboard?.profileCompletion;

        applyProfileCompletion(completion);
      }

      setProfilePageLoading(false);
    };

    loadProfilePage();

    return () => {
      isMounted = false;
    };
  }, []);

  const handleBack = () => {
    router.back();
  };

  const closeModal = () => {
    if (saving) return;
    setModal({ open: false, type: "", title: "", data: [] });
  };

  const handleSave = async () => {
    if (saving) return;

    const values = Object.fromEntries(
      modal.data.map((item) => [item.label, item.value]),
    );

    try {
      setSaving(true);

      if (modal.type === "personal") {
        const dateOfBirth = toApiDate(values["Date of Birth"]);
        const payload = {
          address: values.Address?.trim() || "",
        };

        if (dateOfBirth !== undefined) {
          payload.dateOfBirth = dateOfBirth;
        }

        await updateStudentProfile(payload);
      }

      if (modal.type === "driving") {
        await updateStudentProfile({
          drivingInfo: {
            currentLevel: values["Permit Type"]?.trim() || "",
            licenseType: values["License Type"]?.trim() || "",
            preferredVehicleType: getVehicleTypeForApi(values["License Type"]),
          },
        });
      }

      const [refreshedProfile, refreshedDashboard] = await Promise.all([
        getStudentProfile(),
        getStudentDashboard(),
      ]);
      applyProfile(getResponseData(refreshedProfile));
      applyProfileCompletion(
        getResponseData(refreshedDashboard)?.profileCompletion,
      );

      setModal({ open: false, type: "", title: "", data: [] });
    } catch (error) {
      console.error(
        error?.response?.data?.message ||
          error?.message ||
          "Profile update failed",
      );
    } finally {
      setSaving(false);
    }
  };

  const isReadOnlyField = (item) => {
    return (
      (modal.type === "personal" && item.label === "Email") ||
      (modal.type === "driving" && item.label === "NEPH Number")
    );
  };

  return (
    <main className="min-h-screen overflow-x-hidden bg-[#F6F8FC] px-2.5 pb-24 pt-3 font-sans sm:px-5 sm:py-5 lg:px-6">
      <div className="mx-auto grid w-full min-w-0 grid-cols-1 gap-3 sm:gap-4 xl:grid-cols-[minmax(0,1fr)_280px]">
        {/* LEFT SIDE */}
        <div className="min-w-0 space-y-3 sm:space-y-4">
          {/* HEADER */}
          <header className="rounded-xl border border-slate-200 bg-white p-3 shadow-sm sm:rounded-2xl sm:p-5">
            <div className="flex min-w-0 gap-2.5 sm:gap-3">
              <button
                type="button"
                onClick={handleBack}
                className="flex h-9 w-9 shrink-0 items-center justify-center rounded-[10px] bg-[#EEF4FB] text-[21px] text-[#111827] sm:h-10 sm:w-10 sm:rounded-xl sm:text-[24px]"
              >
                <IoChevronBack />
              </button>

              <div className="min-w-0">
                <h1 className="text-lg font-bold text-[#174A9B] sm:text-2xl">
                  Profile
                </h1>
                <p className="mt-1 text-[11px] font-medium leading-[17px] text-[#767B84] sm:text-[13px] sm:leading-5">
                  Update your information to ensure accurate lesson scheduling
                  and communication.
                </p>
              </div>
            </div>
          </header>

          {/* PROFILE INFO */}
          <section className="min-w-0 rounded-xl border border-[#DCE7F5] bg-[#E8EEF8] p-3 shadow-sm sm:rounded-2xl sm:p-5">
            <div className="flex min-w-0 items-center gap-3 sm:gap-4">
              {/* AVATAR */}
              <div className="relative h-14 w-14 shrink-0 rounded-full border border-[#174A9B] bg-white p-[3px] sm:h-[66px] sm:w-[66px]">
                <div className="flex h-full w-full items-center justify-center overflow-hidden rounded-full bg-[#DDE9F7] text-[28px] font-bold text-[#174A9B]">
                  {profileHeader.avatar ? (
                    <img
                      src={profileHeader.avatar}
                      alt={profileHeader.name}
                      onError={() =>
                        setProfileHeader((current) => ({
                          ...current,
                          avatar: "",
                        }))
                      }
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    profileHeader.name?.charAt(0)?.toUpperCase() || "S"
                  )}
                </div>

                <div className="absolute bottom-0 right-0 flex h-5 w-5 items-center justify-center rounded-full border-2 border-white bg-[#174A9B] text-[12px] font-bold text-white">
                  +
                </div>
              </div>

              <div className="min-w-0">
                <h2 className="truncate text-base font-bold text-[#174A9B] sm:text-[21px]">
                  {profileHeader.name}
                </h2>
                <p className="mt-1 text-xs font-medium text-[#7C818A]">
                  {profileHeader.role}
                </p>
              </div>
            </div>

            {/* PERSONAL INFO */}
            <div className="mt-4 min-w-0 rounded-xl bg-white p-3 shadow-sm sm:mt-5 sm:rounded-2xl sm:p-4">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-bold text-[#174A9B]">
                  Personal information
                </h3>

                <button
                  type="button"
                  onClick={() =>
                    setModal({
                      open: true,
                      type: "personal",
                      title: "Personal information",
                      data: personalInfo.map((item) => ({ ...item })),
                    })
                  }
                  className="flex h-8 w-8 items-center justify-center rounded-full bg-[#EEF4FB] text-[#174A9B]"
                >
                  <FiEdit2 />
                </button>
              </div>

              <div className="mt-3 grid gap-2 sm:mt-4 sm:grid-cols-3 sm:gap-3">
                {personalInfo.map((item) => (
                  <div key={item.label} className="min-w-0 rounded-xl bg-slate-50 p-3">
                    <p className="text-[12px] font-bold text-[#292D33]">
                      {item.label}
                    </p>
                    <p className="mt-1 break-words text-[12px] font-medium text-[#777B84]">
                      {item.value}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* DRIVING INFO */}
            <div className="mt-3 min-w-0 rounded-xl bg-white p-3 shadow-sm sm:mt-4 sm:rounded-2xl sm:p-4">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-bold text-[#174A9B]">
                  Driving Information
                </h3>

                <button
                  type="button"
                  onClick={() =>
                    setModal({
                      open: true,
                      type: "driving",
                      title: "Driving Information",
                      data: drivingInfo.map((item) => ({ ...item })),
                    })
                  }
                  className="flex h-8 w-8 items-center justify-center rounded-full bg-[#EEF4FB] text-[#174A9B]"
                >
                  <FiEdit2 />
                </button>
              </div>

              <div className="mt-3 grid gap-2 sm:mt-4 sm:grid-cols-3 sm:gap-3">
                {drivingInfo.map((item) => (
                  <div key={item.label} className="min-w-0 rounded-xl bg-slate-50 p-3">
                    <p className="text-[12px] font-bold text-[#292D33]">
                      {item.label}
                    </p>
                    <p className="mt-1 break-words text-[12px] font-medium text-[#777B84]">
                      {item.value}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* LESSON SUMMARY */}
          <section className="min-w-0 rounded-xl border border-[#DCE7F5] bg-[#E8EEF8] p-3 shadow-sm sm:rounded-2xl sm:p-5">
            <div className="flex items-center justify-between">
              <h2 className="text-sm font-bold text-[#174A9B]">
                Lesson Summary
              </h2>
              <span className="rounded-full bg-white px-3 py-1 text-[11px] font-bold text-[#174A9B]">
                {summaryYear}
              </span>
            </div>

            <div className="mt-3 grid grid-cols-3 gap-2 sm:mt-4 sm:gap-3">
              {lessonSummary.map((item) => (
                <div
                  key={item[1]}
                  className="min-w-0 rounded-xl bg-white px-1.5 py-2.5 text-center shadow-sm sm:rounded-2xl sm:px-2 sm:py-3"
                >
                  <p className="break-words text-[11px] font-bold leading-4 text-[#30323A] sm:text-[13px]">
                    {item[0]}
                  </p>
                  <p className="mt-1 text-[11px] font-medium text-[#64748B]">
                    {item[1]}
                  </p>
                </div>
              ))}
            </div>

            <div className="mt-3 h-[200px] min-w-0 rounded-xl border border-[#B7CBE8] bg-white p-1.5 sm:mt-4 sm:h-[310px] sm:rounded-2xl sm:p-3">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart
                  data={chartData}
                  margin={{ top: 10, right: 8, bottom: 0, left: -25 }}
                >
                  <defs>
                    <linearGradient id="chartFill" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor={BLUE} stopOpacity={0.2} />
                      <stop offset="100%" stopColor={BLUE} stopOpacity={0.05} />
                    </linearGradient>
                  </defs>

                  <CartesianGrid
                    vertical={false}
                    stroke="#000000"
                    strokeOpacity={0.1}
                  />

                  <XAxis
                    dataKey="x"
                    type="number"
                    domain={[0, 4.15]}
                    ticks={[0.08, 1.02, 2, 2.95, 4]}
                    tickFormatter={(value) => {
                      const tickIndex = [0.08, 1.02, 2, 2.95, 4].findIndex(
                        (tick) => Math.abs(tick - value) < 0.01,
                      );

                      return chartMonths[tickIndex] || "";
                    }}
                    tick={{ fontSize: 11 }}
                  />

                  <YAxis
                    domain={[0, 40]}
                    ticks={[0, 10, 20, 30, 40]}
                    width={38}
                    tick={{ fontSize: 11 }}
                  />

                  <Tooltip
                    formatter={(value) => [`${value} Hours`, "Lesson time"]}
                    labelFormatter={(value) => {
                      const tickIndex = [0.08, 1.02, 2, 2.95, 4].reduce(
                        (closestIndex, tick, index, ticks) =>
                          Math.abs(tick - value) <
                          Math.abs(ticks[closestIndex] - value)
                            ? index
                            : closestIndex,
                        0,
                      );

                      return chartMonths[tickIndex] || "";
                    }}
                  />

                  <Area
                    type="monotone"
                    dataKey="y"
                    stroke={BLUE}
                    strokeWidth={2.2}
                    fill="url(#chartFill)"
                    dot={false}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </section>

          {/* LEARNING PROGRESS */}
          <section className="min-w-0 rounded-xl border border-[#DCE7F5] bg-[#E8EEF8] p-3 shadow-sm sm:rounded-2xl sm:p-5">
            <div className="min-w-0 rounded-xl bg-white p-3 shadow-sm sm:rounded-2xl sm:p-4">
              <h2 className="text-sm font-bold text-[#174A9B]">
                Learning Progress
              </h2>

              <div className="mt-3 space-y-2 md:hidden">
                {learningRows.map((row, index) => (
                  <div
                    key={`${row[0]}-${index}`}
                    className="min-w-0 rounded-xl bg-slate-50 p-3"
                  >
                    <p className="text-xs font-bold text-[#2D3036]">{row[0]}</p>
                    <p className="mt-1 break-words text-[11px] leading-4 text-[#7D828B]">
                      {row[1]} · {row[2]}
                    </p>

                    <button
                      type="button"
                      className="mt-2 flex items-center gap-2 text-[11px] font-bold text-[#174A9B]"
                    >
                      <BsPlusCircleFill className="text-[#F12B45]" />
                      Add Date
                    </button>
                  </div>
                ))}
              </div>

              <div className="mt-4 hidden overflow-x-auto md:block">
                <div className="min-w-[650px]">
                  {learningRows.map((row, index) => (
                    <div
                      key={`${row[0]}-${index}`}
                      className="grid grid-cols-[1.2fr_1fr_1.2fr_100px] items-center gap-3 border-b border-[#E4E8EF] py-3 last:border-b-0"
                    >
                      <p className="text-[12.5px] font-bold text-[#2D3036]">
                        {row[0]}
                      </p>
                      <p className="text-[12.5px] text-[#7D828B]">{row[1]}</p>
                      <p className="text-[12.5px] text-[#7D828B]">{row[2]}</p>

                      <button
                        type="button"
                        className="flex items-center gap-2 text-[12px] font-semibold text-[#174A9B]"
                      >
                        <BsPlusCircleFill className="text-[#F12B45]" />
                        Add Date
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* APPOINTMENTS + PERFORMANCE */}
          <section className="grid min-w-0 grid-cols-1 gap-3 rounded-xl border border-[#DCE7F5] bg-[#E8EEF8] p-3 shadow-sm sm:rounded-2xl sm:p-4 md:grid-cols-2 md:gap-4">
            <div className="min-w-0 rounded-xl bg-white p-3 shadow-sm sm:rounded-2xl sm:p-4">
              <h2 className="text-sm font-bold text-[#174A9B]">Appointments</h2>

              <div className="mt-4 space-y-3 text-[13px] text-[#747981]">
                <p>
                  Driving Lesson:{" "}
                  <span className="font-bold text-[#30323A]">40 Hours</span>
                </p>
                <p>
                  Simulator Lesson:{" "}
                  <span className="font-bold text-[#30323A]">5 Hours</span>
                </p>
                <p>
                  Coding Session:{" "}
                  <span className="font-bold text-[#30323A]">1 Hour</span>
                </p>
              </div>

              <p className="mt-5 text-sm font-bold text-[#174A9B]">
                Total Sessions: 46 Hour
              </p>
            </div>

            <div className="min-w-0 rounded-xl bg-white p-3 shadow-sm sm:rounded-2xl sm:p-4">
              <h2 className="text-sm font-bold text-[#174A9B]">
                Performance Overview
              </h2>

              <div className="mt-4 space-y-3 text-[13px] text-[#747981]">
                <p>
                  Students Like Rating:{" "}
                  <span className="font-bold text-[#30323A]">4.8</span>
                </p>
                <p>
                  Pass Probability:{" "}
                  <span className="font-bold text-[#174A9B]">High</span>
                </p>
                <p>
                  Progress Level:{" "}
                  <span className="font-bold text-[#30323A]">Intermediate</span>
                </p>
              </div>
            </div>
          </section>

          {/* ANTS */}
          <section className="min-w-0 rounded-xl border border-[#DCE7F5] bg-[#DEE7F2] p-3 shadow-sm sm:rounded-2xl sm:p-4 md:flex md:items-center md:justify-between">
            <div>
              <h2 className="text-base font-bold text-[#174A9B]">
                ANTS Registration
              </h2>
              <p className="mt-2 text-xs font-medium text-[#343841]">
                No applications are currently being processed.
              </p>
            </div>

            <button
              type="button"
              className="mt-4 min-h-10 w-full rounded-xl border border-[#174A9B] bg-white px-3 py-2 text-xs font-bold text-[#F12B45] md:mt-0 md:w-auto md:px-4"
            >
              Continue on ANTS website
            </button>
          </section>

          {/* BOOKLET */}
          <section className="min-w-0 rounded-xl border border-[#DCE7F5] bg-[#E8EEF8] p-3 shadow-sm sm:rounded-2xl sm:p-4">
            <h2 className="text-sm font-bold leading-5 text-[#174A9B] sm:text-base">
              Check your learning booklet and track your progress
            </h2>
            <Link href="/student/profile/booklet" className="mt-3 block">
              <button
                type="button"
                className="h-10 w-full rounded-xl bg-[#F12B45] px-4 text-xs font-bold text-white sm:w-auto"
              >
                Check Learning Booklet
              </button>
            </Link>
          </section>
        </div>

        {/* RIGHT SIDE */}
        <aside className="min-w-0 space-y-3 sm:space-y-4">
          {/* COMPLETE PROFILE */}
          <section className="rounded-xl border border-[#DCE7F5] bg-[#DEE7F2] p-3 shadow-sm sm:rounded-2xl sm:p-4">
            <h2 className="text-center text-sm font-bold text-[#174A9B]">
              Complete your profile
            </h2>

            {profilePageLoading ? (
              <div aria-label="Loading profile completion" className="animate-pulse">
                <div className="mx-auto mt-4 h-24 w-24 rounded-full border-[12px] border-white/80 sm:mt-5 sm:h-28 sm:w-28" />
                <div className="mt-4 grid grid-cols-2 gap-3 sm:mt-5 sm:grid-cols-1">
                  {fallbackProfileSteps.map(([label]) => (
                    <div key={label} className="flex items-center gap-2.5">
                      <span className="h-4 w-4 shrink-0 rounded bg-white" />
                      <span className="h-3 flex-1 rounded bg-white" />
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <>
                <div className="relative mx-auto mt-4 h-24 w-24 rounded-full sm:mt-5 sm:h-28 sm:w-28">
                  <div
                    className="absolute inset-0 rounded-full"
                    style={{
                      background: `conic-gradient(#174A9B 0deg, #174A9B ${
                        profileCompletion.percentage * 3.6
                      }deg, #ffffff ${
                        profileCompletion.percentage * 3.6
                      }deg, #ffffff 360deg)`,
                    }}
                  />
                  <div className="absolute inset-[12px] rounded-full bg-[#DEE7F2]" />
                  <div className="absolute inset-0 flex items-center justify-center text-lg font-bold text-[#174A9B]">
                    {profileCompletion.percentage}%
                  </div>
                </div>

                <div className="mt-4 grid grid-cols-2 gap-x-3 gap-y-2 sm:mt-5 sm:block sm:space-y-2 xl:grid-cols-1">
                  {profileCompletion.steps.map(([label, done]) => (
                    <div key={label} className="flex items-center gap-2.5">
                      {done ? (
                        <BsCheckSquareFill className="shrink-0 text-[#2DBE52]" />
                      ) : (
                        <span className="h-4 w-4 shrink-0 rounded border border-[#4F7EC5] bg-white" />
                      )}

                      <span
                        className={`min-w-0 text-[11px] font-medium sm:text-sm ${
                          done ? "text-[#30323A]" : "text-[#868A92]"
                        }`}
                      >
                        {label}
                      </span>
                    </div>
                  ))}
                </div>
              </>
            )}
          </section>

          {/* NOTES */}
          <section className="rounded-xl border border-[#DCE7F5] bg-[#DEE7F2] p-3 shadow-sm sm:rounded-2xl sm:p-4">
            <div className="flex items-start justify-between gap-3">
              <h2 className="text-sm font-bold text-[#174A9B]">
                Instructor Notes
              </h2>
              <Link
                href="/student/profile/booklet"
                className="shrink-0 text-[10px] font-bold text-[#174A9B] underline underline-offset-2"
              >
                View all
              </Link>
            </div>

            {profilePageLoading ? (
              <div aria-label="Loading instructor note" className="mt-3 animate-pulse rounded-xl border border-[#B7CBE8] bg-white p-3">
                <div className="h-3 w-full rounded bg-slate-100" />
                <div className="mt-2 h-3 w-4/5 rounded bg-slate-100" />
                <div className="mt-4 h-px bg-slate-100" />
                <div className="mt-3 h-3 w-1/2 rounded bg-slate-100" />
                <div className="mt-2 h-2.5 w-2/3 rounded bg-slate-100" />
              </div>
            ) : instructorNote ? (
              <div className="mt-3 rounded-xl border border-[#B7CBE8] bg-white p-3">
                <p className="break-words text-xs font-medium leading-5 text-[#30323A]">
                  {instructorNote.note}
                </p>
                <div className="mt-3 border-t border-slate-100 pt-2.5">
                  <p className="truncate text-[11px] font-bold text-[#174A9B]">
                    {instructorNote.teacher}
                  </p>
                  <p className="mt-1 truncate text-[10px] text-[#767B84]">
                    {instructorNote.title} · {formatLongDate(instructorNote.date)}
                  </p>
                </div>
              </div>
            ) : (
              <div className="mt-3 rounded-xl border border-dashed border-[#A6B9D8] bg-white px-3 py-5 text-center">
                <p className="text-xs font-semibold text-[#767B84]">
                  No instructor notes yet.
                </p>
                <p className="mt-1 text-[10px] leading-4 text-[#9297A0]">
                  Your teacher&apos;s feedback will appear here after a lesson is
                  completed and submitted.
                </p>
              </div>
            )}
          </section>
        </aside>
      </div>

      {/* EDIT MODAL */}
      {modal.open && (
        <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/40 p-2.5 sm:items-center sm:p-4">
          <div className="max-h-[calc(100dvh-20px)] w-full max-w-[430px] overflow-y-auto rounded-2xl bg-white p-3.5 shadow-2xl sm:p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-[11px] font-semibold uppercase text-slate-400">
                  Profile Update
                </p>
                <h2 className="mt-1 text-lg font-bold text-[#174A9B]">
                  Edit {modal.title}
                </h2>
              </div>

              <button
                type="button"
                onClick={closeModal}
                className="flex h-9 w-9 items-center justify-center rounded-full bg-[#EEF4FB] text-xl text-[#174A9B]"
              >
                <FiX />
              </button>
            </div>

            <div className="mt-4 space-y-3">
              {modal.data.map((item, index) => (
                <div key={item.label}>
                  <label className="mb-1.5 block text-xs font-bold text-[#292D33]">
                    {item.label}
                  </label>

                  <input
                    value={item.value}
                    readOnly={isReadOnlyField(item)}
                    onChange={(event) => {
                      const updatedData = modal.data.map((field, fieldIndex) =>
                        fieldIndex === index
                          ? { ...field, value: event.target.value }
                          : field,
                      );

                      setModal({ ...modal, data: updatedData });
                    }}
                    className="h-11 w-full rounded-xl border border-[#B7CBE8] px-3 text-base outline-none focus:border-[#174A9B] sm:h-10 sm:text-xs"
                  />
                </div>
              ))}
            </div>

            <div className="mt-5 grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={closeModal}
                disabled={saving}
                className="h-10 rounded-xl border border-[#B7CBE8] text-sm font-bold text-[#174A9B]"
              >
                Cancel
              </button>

              <button
                type="button"
                onClick={handleSave}
                disabled={saving}
                className="h-10 rounded-xl bg-[#174A9B] text-sm font-bold text-white"
              >
                {saving ? "Saving..." : "Save"}
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
