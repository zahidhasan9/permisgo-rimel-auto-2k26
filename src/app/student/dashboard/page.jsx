"use client";

import { useEffect, useMemo, useRef } from "react";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import {
  FaArrowLeft,
  FaArrowRight,
  FaBrain,
  FaCalendarAlt,
  FaCarSide,
  FaClipboardCheck,
} from "react-icons/fa";
import { IoStatsChart } from "react-icons/io5";
import { MdChecklist } from "react-icons/md";
import { fetchLoggedInUser, fetchStudentDashboard } from "@/features/userSlice";

const STATIC_LESSON = {
  title: "City Driving Practice",
  lessonDate: "2026-03-02T00:00:00.000Z",
  startTime: "10:00",
  duration: 60,
  vehicleType: "automatic",
  instructorName: "Michael Carter",
  progressPercent: 20,
};

const DEFAULT_PROGRESS = {
  completed: 0,
  inProgress: 0,
  notCompleted: 0,
  average: 0,
};

const clampPercentage = (value) => {
  const number = Number(value);

  if (!Number.isFinite(number)) return 0;
  return Math.min(Math.max(Math.round(number), 0), 100);
};

const capitalize = (value) => {
  if (!value) return "Automatic";

  const text = String(value);
  return `${text.charAt(0).toUpperCase()}${text.slice(1)}`;
};

const formatTime = (value) => {
  if (!value) return "10:00 AM";

  if (/am|pm/i.test(String(value))) return String(value);

  const [hours, minutes = "00"] = String(value).split(":");
  const parsedHours = Number(hours);

  if (!Number.isFinite(parsedHours)) return String(value);

  const suffix = parsedHours >= 12 ? "PM" : "AM";
  const displayHours = parsedHours % 12 || 12;

  return `${displayHours}:${minutes} ${suffix}`;
};

const formatLessonDate = (dateValue, startTime) => {
  if (!dateValue) return "Monday, March 2, 2026, 10:00 AM";

  const date = new Date(dateValue);

  if (Number.isNaN(date.getTime())) {
    return "Monday, March 2, 2026, 10:00 AM";
  }

  const dateText = date.toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  return `${dateText}, ${formatTime(startTime)}`;
};

const getScheduleDateParts = (dateValue) => {
  if (!dateValue) return null;

  const date = new Date(dateValue);

  if (Number.isNaN(date.getTime())) return null;

  return {
    day: date.toLocaleDateString("en-US", { weekday: "short" }),
    date: date.toLocaleDateString("en-US", { day: "2-digit" }),
  };
};

const getMonthLabel = (dateValue) => {
  if (!dateValue) return "March, 2026";

  const date = new Date(dateValue);

  if (Number.isNaN(date.getTime())) return "March, 2026";

  return date.toLocaleDateString("en-US", {
    month: "long",
    year: "numeric",
  });
};

const fillLessonCards = (items) => {
  const safeItems = Array.isArray(items) ? items.slice(0, 3) : [];

  while (safeItems.length < 3) {
    safeItems.push({
      ...STATIC_LESSON,
      id: `static-lesson-${safeItems.length + 1}`,
    });
  }

  return safeItems;
};

const fillScheduleRows = (items) => {
  return Array.isArray(items)
    ? items.slice(0, 3).map((item) => {
        const parts = getScheduleDateParts(item.lessonDate);

        return {
          ...item,
          day: parts?.day,
          date: parts?.date,
        };
      })
    : [];
};

const formatStatValue = (value, pad = false) => {
  if (value === null || value === undefined || value === "") return "0";

  const number = Number(value);
  const text = Number.isFinite(number) ? String(number) : String(value);

  return pad && Number.isFinite(number) && number >= 0 && number < 10
    ? text.padStart(2, "0")
    : text;
};

function StatCard({ icon, title, value }) {
  return (
    <div className="min-w-0 rounded-[12px] bg-[#E8EEF8] px-3 py-4 sm:min-h-[142px] sm:px-4 sm:py-5">
      <div className="mx-auto flex h-9 w-9 items-center justify-center rounded-[10px] bg-white text-[16px] text-[#174A9B] sm:h-[38px] sm:w-[38px] sm:text-[18px]">
        {icon}
      </div>

      <h3 className="mt-3 truncate text-center text-[12px] font-[700] text-black sm:mt-4 sm:text-[14px]">
        {title}
      </h3>

      <p className="mt-2 text-center text-[21px] font-[700] leading-none text-[#2DBE42] sm:text-[25px]">
        {value}
      </p>
    </div>
  );
}

function LessonCard({ lesson }) {
  const progress = clampPercentage(lesson?.progressPercent ?? 20);

  return (
    <div className="min-w-0 rounded-[12px] bg-white p-3.5 sm:p-[18px]">
      <h3 className="mb-3 break-words text-[13px] font-[700] leading-[18px] text-[#174A9B] underline underline-offset-[3px] sm:mb-4 sm:text-[14px]">
        {lesson?.title || "City Driving Practice"}
      </h3>

      <div className="space-y-2 text-[11px] leading-[16px] sm:text-[12px] sm:leading-[17px]">
        <div className="grid grid-cols-[70px_minmax(0,1fr)] gap-2 sm:grid-cols-[82px_minmax(0,1fr)]">
          <span className="font-[500] text-[#6E7077]">Start Date</span>
          <span className="min-w-0 break-words font-[700] text-[#25272D]">
            {formatLessonDate(lesson?.lessonDate, lesson?.startTime)}
          </span>
        </div>

        <div className="grid grid-cols-[70px_minmax(0,1fr)] gap-2 sm:grid-cols-[82px_minmax(0,1fr)]">
          <span className="font-[500] text-[#6E7077]">Duration</span>
          <span className="font-[700] text-[#25272D]">
            {lesson?.duration ?? 60} Minutes
          </span>
        </div>

        <div className="grid grid-cols-[70px_minmax(0,1fr)] gap-2 sm:grid-cols-[82px_minmax(0,1fr)]">
          <span className="font-[500] text-[#6E7077]">Vehicle</span>
          <span className="min-w-0 break-words font-[700] text-[#25272D]">
            {capitalize(lesson?.vehicleType)} – Toyota Corolla
          </span>
        </div>

        <div className="grid grid-cols-[70px_minmax(0,1fr)] gap-2 sm:grid-cols-[82px_minmax(0,1fr)]">
          <span className="font-[500] text-[#6E7077]">Instructor</span>
          <span className="font-[700] text-[#174A9B]">
            {lesson?.instructorName || "Michael Carter"}
          </span>
        </div>
      </div>

      <div className="mt-4 rounded-full bg-[#D7DFEC] p-[2px]">
        <div
          className="h-[8px] w-[46%] rounded-full bg-[#174A9B]"
          style={{ width: `${progress}%` }}
        />
      </div>

      <p className="mt-2 text-[12px] font-[700] leading-none text-[#2DBE42]">
        {progress}% Progress
      </p>
    </div>
  );
}

function ScheduleRow({ item }) {
  return (
    <div className="flex min-h-[68px] min-w-0 gap-2.5 sm:min-h-[72px]">
      <div className="flex min-h-[68px] w-14 shrink-0 flex-col items-center justify-center rounded-[10px] bg-white sm:min-h-[72px] sm:w-[62px]">
        <p className="text-[12px] font-[700] leading-none text-[#858585] sm:text-[14px]">
          {item?.day || "Sat"}
        </p>
        <p className="mt-2 text-[20px] font-[700] leading-none text-[#E5273D] sm:mt-[10px] sm:text-[23px]">
          {item?.date || "10"}
        </p>
      </div>

      <div className="min-w-0 flex-1 rounded-[10px] bg-white px-3 py-3 sm:px-[15px] sm:py-[16px]">
        <h4 className="truncate text-[13px] font-[700] leading-tight text-black sm:text-[15px]">
          {item?.title || "Driving Lesson"}
        </h4>
        <p className="mt-2.5 text-[11px] font-[500] leading-none text-[#55565B] sm:mt-[13px] sm:text-[13px]">
          {formatTime(item?.startTime)} - {formatTime(item?.endTime)}
        </p>
        <p className="mt-2 truncate text-[10px] font-[600] text-[#174A9B] sm:text-[12px]">
          Instructor:{" "}
          {item?.instructorName || item?.teacher?.name || "Instructor"}
        </p>
      </div>
    </div>
  );
}

function SemiDonutChart({ statistics }) {
  const cx = 170;
  const cy = 170;
  const r = 108;
  const stroke = 52;
  const completed = Math.max(Number(statistics?.completed || 0), 0);
  const inProgress = Math.max(Number(statistics?.inProgress || 0), 0);
  const notCompleted = Math.max(Number(statistics?.notCompleted || 0), 0);
  const total = completed + inProgress + notCompleted;
  const chartValues =
    total > 0 ? [completed, inProgress, notCompleted] : [0, 0, 0];
  const chartTotal = chartValues.reduce((sum, value) => sum + value, 0);
  const chartColors = ["#174A9B", "#2DBE42", "#E5273D"];

  const polar = (angle) => {
    const rad = (Math.PI / 180) * angle;
    return {
      x: cx + r * Math.cos(rad),
      y: cy + r * Math.sin(rad),
    };
  };

  const arc = (start, end) => {
    const s = polar(start);
    const e = polar(end);
    const large = Math.abs(end - start) > 180 ? 1 : 0;
    return `M ${s.x} ${s.y} A ${r} ${r} 0 ${large} 1 ${e.x} ${e.y}`;
  };

  let currentAngle = 180;
  const paths =
    chartTotal > 0
      ? chartValues.map((value, index) => {
          const startAngle = currentAngle;
          const endAngle =
            index === chartValues.length - 1
              ? 360
              : currentAngle + (value / chartTotal) * 180;

          currentAngle = endAngle;

          return {
            color: chartColors[index],
            startAngle,
            endAngle,
            value,
          };
        })
      : [];

  const average = clampPercentage(
    statistics?.average ?? DEFAULT_PROGRESS.average,
  );

  return (
    <div className="relative mx-auto mt-3 h-[145px] w-full max-w-[270px] sm:mt-[22px] sm:h-[175px] sm:max-w-[310px]">
      <svg
        className="h-full w-full"
        viewBox="0 0 340 210"
        preserveAspectRatio="xMidYMid meet"
      >
        {chartTotal === 0 && (
          <path
            d={arc(180, 360)}
            fill="none"
            stroke="#D7DFEC"
            strokeWidth={stroke}
            strokeLinecap="butt"
          />
        )}
        {paths.map((path, index) =>
          path.value > 0 ? (
            <path
              key={`${path.color}-${index}`}
              d={arc(path.startAngle, path.endAngle)}
              fill="none"
              stroke={path.color}
              strokeWidth={stroke}
              strokeLinecap="butt"
            />
          ) : null,
        )}
      </svg>

      <p className="absolute bottom-[22px] left-0 right-0 text-center text-[15px] font-[700] text-[#174A9B] sm:bottom-[28px] sm:text-[18px]">
        {average}% Average
      </p>
    </div>
  );
}

function LegendItem({ color, label }) {
  return (
    <div className="flex items-center gap-[8px]">
      <span
        className="h-[14px] w-[14px] shrink-0 rounded-[4px]"
        style={{ backgroundColor: color }}
      />
      <span className="text-[12px] font-[500] text-[#30323A]">{label}</span>
    </div>
  );
}

function TrainingCard({ icon, text, helper, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="flex min-h-[112px] min-w-0 flex-1 flex-col items-center justify-center rounded-[12px] bg-white px-2 py-3 transition hover:-translate-y-0.5 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-[#174A9B] sm:min-h-[128px] sm:px-3 sm:py-4"
    >
      <div className="mb-2.5 flex h-8 w-8 items-center justify-center rounded-[8px] bg-[#E8EEF8] text-[15px] text-[#174A9B] sm:mb-[16px] sm:h-[34px] sm:w-[34px] sm:text-[16px]">
        {icon}
      </div>

      <p className="max-w-[105px] text-center text-[11px] font-[600] leading-4 text-[#101010] sm:text-[13px] sm:font-[500] sm:leading-[20px]">
        {text}
      </p>
      {helper && (
        <p className="mt-1.5 line-clamp-2 text-center text-[9px] font-semibold leading-3 text-[#6E7077] sm:mt-2 sm:text-[10px]">
          {helper}
        </p>
      )}
    </button>
  );
}

function Avatar({ src, name }) {
  const initial = String(name || "I")
    .trim()
    .charAt(0)
    .toUpperCase();
  return (
    <div className="flex h-[38px] w-[38px] shrink-0 items-center justify-center overflow-hidden rounded-full bg-[#174A9B] text-sm font-bold text-white">
      {src ? (
        <img
          src={src}
          alt={name || "Instructor"}
          className="h-full w-full object-cover"
        />
      ) : (
        initial
      )}
    </div>
  );
}

function MessageRow({ instructor, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="flex h-[52px] w-full items-center gap-[10px] rounded-[12px] bg-white px-[11px] text-left transition hover:shadow-sm"
    >
      <Avatar src={instructor.avatar} name={instructor.name} />

      <div className="min-w-0">
        <p className="truncate text-[12px] font-[700] leading-none text-black">
          {instructor.name}
        </p>
        <p className="mt-[6px] truncate text-[11px] font-[500] leading-none text-[#30323A]">
          Click to send a message
        </p>
      </div>
    </button>
  );
}

export default function Page() {
  const dispatch = useDispatch();
  const router = useRouter();
  const lessonCarouselRef = useRef(null);
  const { user, token, studentDashboard } = useSelector((state) => state.user);

  const scrollLessonCarousel = (direction) => {
    const carousel = lessonCarouselRef.current;

    if (!carousel) return;

    const firstCard = carousel.firstElementChild;
    const cardWidth =
      firstCard?.getBoundingClientRect().width || carousel.clientWidth;
    const gap = 12;

    carousel.scrollBy({
      left: direction * (cardWidth + gap),
      behavior: "smooth",
    });
  };

  useEffect(() => {
    dispatch(fetchStudentDashboard());

    if (!user && token) {
      dispatch(fetchLoggedInUser());
    }
  }, [dispatch, token, user]);

  const stats = studentDashboard?.stats || {};
  const lessonCards = useMemo(
    () => fillLessonCards(studentDashboard?.lessonProgress),
    [studentDashboard?.lessonProgress],
  );
  const scheduleRows = useMemo(
    () => fillScheduleRows(studentDashboard?.upcomingSchedule),
    [studentDashboard?.upcomingSchedule],
  );
  const progressStatistics =
    studentDashboard?.progressStatistics || DEFAULT_PROGRESS;
  const practiceDriving = studentDashboard?.practiceDriving;
  const bookedInstructors = studentDashboard?.bookedInstructors || [];
  const firstScheduleDate = studentDashboard?.upcomingSchedule?.[0]?.lessonDate;
  const studentName =
    user?.name || studentDashboard?.profile?.user?.name || "Robert";

  return (
    <>
      <main className="dashboard-poppins min-h-screen w-full min-w-0 overflow-x-hidden bg-white">
        <div className="mx-auto w-full px-2.5 pb-24 pt-4 sm:px-5 sm:pb-8 sm:pt-6 lg:px-6">
          <header>
            <h1 className="break-words text-[21px] font-[700] leading-tight text-[#174A9B] sm:text-[28px]">
              Welcome, {studentName}
            </h1>
            <p className="mt-2 text-[11px] font-[500] leading-[17px] text-[#6D6F76] sm:mt-[10px] sm:text-[13px] sm:leading-[19px]">
              Track your lessons, attendance, payments, and progress easily from
              one dashboard
            </p>
          </header>

          <section className="mt-4 grid grid-cols-2 gap-2.5 sm:mt-6 sm:gap-4 xl:grid-cols-4">
            <StatCard
              icon={<FaClipboardCheck />}
              title="Time Taken"
              value={formatStatValue(stats.timeTakenHours ?? 13)}
            />
            <StatCard
              icon={<FaCalendarAlt />}
              title="Time to Come"
              value={formatStatValue(stats.timeToComeMinutes ?? 560)}
            />
            <StatCard
              icon={<FaBrain />}
              title="Skills Acquired"
              value={formatStatValue(stats.skillsAcquired ?? 4, true)}
            />
            <StatCard
              icon={<FaBrain />}
              title="Hours Left"
              value={formatStatValue(stats.hoursLeft ?? 4, true)}
            />
          </section>

          <section className="mt-4 rounded-[14px] bg-[#E8EEF8] p-3 sm:mt-5 sm:p-5">
            <div className="flex items-start justify-between gap-4">
              <h2 className="text-[16px] font-[700] leading-tight text-[#174A9B] sm:text-[18px] sm:leading-none">
                Lesson Progress
              </h2>

              <div className="flex shrink-0 gap-[10px]">
                <button
                  type="button"
                  onClick={() => scrollLessonCarousel(-1)}
                  aria-label="Previous lesson"
                  className="flex h-[36px] w-[36px] items-center justify-center rounded-[11px] bg-[#DEE7F3] text-[14px] text-[#E5273D] transition active:scale-95"
                >
                  <FaArrowLeft />
                </button>
                <button
                  type="button"
                  onClick={() => scrollLessonCarousel(1)}
                  aria-label="Next lesson"
                  className="flex h-[36px] w-[36px] items-center justify-center rounded-[11px] bg-[#E5273D] text-[14px] text-white transition active:scale-95"
                >
                  <FaArrowRight />
                </button>
              </div>
            </div>

            <div
              ref={lessonCarouselRef}
              className="mt-3 flex snap-x snap-mandatory gap-3 overflow-x-auto scroll-smooth pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden sm:mt-5 sm:gap-4"
            >
              {lessonCards.map((lesson, index) => (
                <div
                  key={lesson.id || lesson._id || `lesson-${index}`}
                  className="w-[88%] shrink-0 snap-start sm:w-[calc(50%_-_8px)] xl:w-[calc(33.333%_-_11px)]"
                >
                  <LessonCard lesson={lesson} />
                </div>
              ))}
            </div>
          </section>

          <section className="mt-4 grid grid-cols-1 gap-4 sm:mt-5 sm:gap-5 xl:grid-cols-2">
            <div className="min-w-0 rounded-[14px] bg-[#E8EEF8] p-3 sm:p-5">
              <div className="flex items-start justify-between gap-4">
                <h2 className="text-[16px] font-[700] leading-tight text-[#174A9B] sm:text-[18px] sm:leading-none">
                  Upcoming Schedule
                </h2>

                <button
                  type="button"
                  onClick={() => router.push("/student/lessons")}
                  className="text-[12px] font-[700] leading-none text-[#174A9B] underline underline-offset-[2px]"
                >
                  See All
                </button>
              </div>

              <button
                type="button"
                className="mt-3 flex h-7 w-[104px] items-center justify-center gap-[7px] rounded-[6px] bg-white text-[11px] font-[500] text-[#30323A] sm:mt-5"
              >
                {getMonthLabel(firstScheduleDate)}
                <FaCalendarAlt className="text-[#174A9B]" />
              </button>

              <div className="mt-4 space-y-[10px]">
                {scheduleRows.length ? (
                  scheduleRows.map((item, index) => (
                    <ScheduleRow
                      key={item.id || item._id || `schedule-${index}`}
                      item={item}
                    />
                  ))
                ) : (
                  <div className="rounded-[10px] bg-white px-5 py-8 text-center text-sm font-semibold text-slate-500">
                    No upcoming booked lesson.
                  </div>
                )}
              </div>
            </div>

            <div className="min-w-0 rounded-[14px] bg-[#E8EEF8] p-3 sm:p-5">
              <h2 className="text-[16px] font-[700] leading-tight text-[#174A9B] sm:text-[18px] sm:leading-none">
                Total Progress Statistics
              </h2>

              <SemiDonutChart statistics={progressStatistics} />

              <div className="mt-1 flex flex-wrap justify-center gap-x-3 gap-y-2 sm:mt-2 sm:gap-x-4">
                <LegendItem color="#174A9B" label="Completed Quizzes" />
                <LegendItem color="#2DBE42" label="Quiz in progress" />
                <LegendItem color="#E5273D" label="Not completed" />
              </div>
            </div>
          </section>

          <section className="mt-4 grid grid-cols-1 gap-4 sm:mt-5 sm:gap-5 lg:grid-cols-2 xl:grid-cols-[minmax(0,1.55fr)_minmax(150px,0.55fr)_minmax(270px,1fr)]">
            <div className="min-w-0 rounded-[14px] bg-[#E8EEF8] p-3 sm:p-5">
              <h2 className="text-[16px] font-[700] leading-none text-[#174A9B] sm:text-[18px]">
                Training
              </h2>

              <h3 className="mt-3 text-[13px] font-[700] leading-none text-[#15233B] sm:mt-5 sm:text-[15px]">
                Traffic Laws
              </h3>

              <div className="mt-3 grid grid-cols-3 gap-2 sm:mt-4 sm:gap-4">
                <TrainingCard
                  icon={<MdChecklist />}
                  text="Start Revising"
                  helper="Continue your code lessons"
                  onClick={() => router.push("/student/code-learning")}
                />
                <TrainingCard
                  icon={<FaCarSide />}
                  text="Take Practice Exam"
                  helper={`${progressStatistics.totalAttempts || 0} attempts · ${progressStatistics.average || 0}% average`}
                  onClick={() =>
                    router.push("/student/code/simple-series-list")
                  }
                />
                <TrainingCard
                  icon={<IoStatsChart />}
                  text="Exam Registration"
                  helper="Open the reservation portal"
                  onClick={() =>
                    window.open(
                      "https://app.klaxo.fr/mon-compte/connecter",
                      "_blank",
                      "noopener,noreferrer",
                    )
                  }
                />
              </div>
            </div>

            <div className="rounded-[14px] bg-[#E8EEF8] p-3 sm:p-5">
              <h2 className="text-[16px] font-[700] leading-[22px] text-[#174A9B] sm:text-[18px] sm:leading-[25px]">
                Practice <span className="sm:block">Driving</span>
              </h2>

              <p className="mt-4 text-[12px] font-[500] leading-[18px] text-[#30323A]">
                Check your driving test readiness and stay updated on your
                progress.
              </p>

              <p className="mt-4 text-[12px] font-[700] leading-none text-[#2DBE42]">
                {practiceDriving?.scheduled ? "Scheduled" : "Not Scheduled"}
              </p>

              <button
                type="button"
                onClick={() => router.push("/student/book-driving")}
                className="mt-4 h-9 w-full rounded-[7px] bg-[#E5273D] text-[11px] font-[700] text-white sm:mt-6 sm:h-[32px] sm:max-w-[120px]"
              >
                Book Now
              </button>
            </div>

            <div className="min-w-0 rounded-[14px] bg-[#E8EEF8] p-3 sm:p-5 lg:col-span-2 xl:col-span-1">
              <div className="flex items-start justify-between gap-4">
                <h2 className="text-[16px] font-[700] leading-tight text-[#174A9B] sm:text-[18px] sm:leading-none">
                  Message Instructor
                </h2>

                <button
                  type="button"
                  onClick={() => router.push("/student/chat")}
                  className="shrink-0 text-[12px] font-[700] leading-none text-[#174A9B] underline underline-offset-[2px]"
                >
                  See All
                </button>
              </div>

              <div className="mt-4 space-y-[12px]">
                {bookedInstructors.length ? (
                  bookedInstructors
                    .slice(0, 3)
                    .map((instructor) => (
                      <MessageRow
                        key={instructor._id}
                        instructor={instructor}
                        onClick={() =>
                          router.push(`/student/chat?userId=${instructor._id}`)
                        }
                      />
                    ))
                ) : (
                  <div className="rounded-[12px] bg-white px-4 py-6 text-center text-[12px] font-semibold text-slate-500">
                    No booked instructor yet.
                  </div>
                )}
              </div>
            </div>
          </section>
        </div>
      </main>
    </>
  );
}
