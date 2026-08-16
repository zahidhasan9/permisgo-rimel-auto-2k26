"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import {
  FaCarSide,
  FaCheck,
  FaClock,
  FaGraduationCap,
  FaStar,
  FaUser,
} from "react-icons/fa";
import { IoChevronBack } from "react-icons/io5";

import { getBookedInstructorProfile, getTeacherReviews } from "@/features/API";
import { mediaUrl } from "@/utils/mediaUrl";

const unwrap = (response, fallback = null) =>
  response?.data?.data ?? response?.data ?? fallback;
const days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
const value = (item, fallback = "Not provided") => item || fallback;

function Panel({ icon, title, children }) {
  return (
    <section className="rounded-xl bg-[#e8eef7] p-4">
      <h2 className="flex items-center gap-2 border-b border-slate-500 pb-2 text-xs font-bold text-[#123f88]">
        {icon}
        {title}
      </h2>
      <div className="mt-3 space-y-3 text-[11px] text-slate-700">
        {children}
      </div>
    </section>
  );
}

function Row({ children, green = false }) {
  return (
    <p className="flex items-start gap-2">
      {green ? (
        <span className="flex h-4 w-4 shrink-0 items-center justify-center rounded bg-[#26c33d] text-[9px] text-white">
          <FaCheck />
        </span>
      ) : (
        <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-slate-900" />
      )}
      {children}
    </p>
  );
}

export default function InstructorProfilePage() {
  const { teacherId } = useParams();
  const router = useRouter();
  const [profile, setProfile] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let active = true;
    Promise.all([
      getBookedInstructorProfile(teacherId),
      getTeacherReviews(teacherId).catch(() => ({ data: { data: [] } })),
    ])
      .then(([profileResponse, reviewResponse]) => {
        if (active) {
          setProfile(unwrap(profileResponse));
          setReviews(unwrap(reviewResponse, []));
        }
      })
      .catch((requestError) => {
        if (active)
          setError(
            requestError.response?.data?.message ||
              "Instructor profile could not be loaded.",
          );
      })
      .finally(() => {
        if (active) setLoading(false);
      });
    return () => {
      active = false;
    };
  }, [teacherId]);

  if (loading)
    return (
      <main className="min-h-screen bg-[#edf1f8] p-5">
        <div className="rounded-xl bg-white p-10 text-center text-sm text-[#123f88]">
          Loading instructor profile...
        </div>
      </main>
    );
  if (error || !profile)
    return (
      <main className="min-h-screen bg-[#edf1f8] p-5">
        <div className="rounded-xl bg-red-50 p-10 text-center text-sm text-red-700">
          {error || "Instructor not found."}
        </div>
      </main>
    );

  const user = profile.user || {};
  const vehicle =
    profile.vehicles?.find((item) => item.isDefault) ||
    profile.vehicles?.[0] ||
    {};
  const location = profile.locations?.[0] || {};
  const schedule = profile.availability?.weeklySchedule || [];
  const stats = profile.stats || {};
  const approvedDocs = profile.documents || [];
  const name = user.name || user.fullName || "Instructor";

  return (
    <main className="min-h-screen bg-[#edf1f8] p-2 sm:p-4">
      <div className="mx-auto rounded-xl bg-white p-4">
        <header className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => router.back()}
            className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#e8edf5]"
          >
            <IoChevronBack size={22} />
          </button>
          <h1 className="text-xl font-bold text-[#123f88]">
            Instructor Profile
          </h1>
        </header>

        <section className="mt-5 flex flex-col gap-4 border-b border-slate-500 pb-5 sm:flex-row sm:items-center">
          {user.avatar ? (
            <img
              src={mediaUrl(user.avatar)}
              alt={name}
              className="h-24 w-24 rounded-full object-cover"
            />
          ) : (
            <div className="flex h-24 w-24 items-center justify-center rounded-full bg-[#e8eef7] text-3xl font-bold text-[#123f88]">
              {name.charAt(0)}
            </div>
          )}
          <div className="min-w-0 flex-1">
            <h2 className="text-lg font-bold">{name}</h2>
            <p className="mt-1 text-xs">
              {profile.qualification || "Certified Driving Instructor"}
            </p>
            <div className="mt-3 inline-block rounded-lg bg-[#e8eef7] px-4 py-3">
              <p className="text-[10px] text-slate-500">
                Experience {profile.experienceYears || 0} Years+
              </p>
              <div className="mt-1 flex gap-1 text-[#174a9b]">
                {Array.from({ length: 5 }).map((_, index) => (
                  <FaStar
                    key={index}
                    className={
                      index < Math.round(profile.rating?.average || 0)
                        ? ""
                        : "text-slate-300"
                    }
                  />
                ))}
              </div>
            </div>
          </div>
          <Link
            href="/student/driving-operation/book-lesson"
            className="self-start rounded-lg bg-[#df2339] px-5 py-2.5 text-xs font-bold text-white"
          >
            Book Now
          </Link>
        </section>

        <div className="mt-4 grid gap-4 md:grid-cols-2">
          <Panel icon={<FaUser />} title="Personal Information">
            <Row>Full Name: {name}</Row>
            <Row>
              Date of Birth:{" "}
              {user.dateOfBirth
                ? new Intl.DateTimeFormat("en-GB", {
                    dateStyle: "long",
                  }).format(new Date(user.dateOfBirth))
                : "Not provided"}
            </Row>
            <Row>Email: {value(user.email)}</Row>
            <Row>Phone: {value(user.phone)}</Row>
            <Row>
              Location:{" "}
              {value(
                location.address ||
                  [location.city, location.postalCode]
                    .filter(Boolean)
                    .join(", ") ||
                  user.address ||
                  user.city,
              )}
            </Row>
          </Panel>
          <Panel icon={<FaCarSide />} title="Vehicle Information">
            <Row>Vehicle Type: {value(vehicle.vehicleType)}</Row>
            <Row>
              Car Model:{" "}
              {value(
                [vehicle.brand, vehicle.model].filter(Boolean).join(" ") ||
                  vehicle.vehicleName,
              )}
            </Row>
            <Row>Transmission: {value(vehicle.vehicleType)}</Row>
            <Row>Vehicle Status: {value(vehicle.approvalStatus)}</Row>
            <Row>Location: {value(location.city || location.address)}</Row>
          </Panel>
          <Panel icon={<FaGraduationCap />} title="Lesson Offered">
            {profile.lessonTypes?.length ? (
              profile.lessonTypes.map((item) => (
                <Row key={item}>
                  {item.charAt(0).toUpperCase() + item.slice(1)} driving lesson
                </Row>
              ))
            ) : (
              <Row>No lesson type provided</Row>
            )}
          </Panel>
          <Panel icon={<FaClock />} title="Availability">
            {schedule.filter((day) => day.enabled).length ? (
              schedule
                .filter((day) => day.enabled)
                .map((day) => (
                  <Row green key={day.dayOfWeek}>
                    {days[day.dayOfWeek]}:{" "}
                    {day.slots?.length
                      ? day.slots
                          .map((slot) => `${slot.startTime} – ${slot.endTime}`)
                          .join(", ")
                      : "Available"}
                  </Row>
                ))
            ) : (
              <Row>No weekly availability provided</Row>
            )}
          </Panel>
        </div>

        <section className="mt-4 grid grid-cols-2 gap-3 rounded-xl bg-[#e8eef7] p-3 sm:grid-cols-4">
          <Stat label="Students Trained" number={stats.studentsTrained || 0} />
          <Stat
            label="Completion Rate"
            number={`${stats.completionRate || 0}%`}
          />
          <Stat
            label="Lessons Completed"
            number={stats.lessonsCompleted || 0}
          />
          <Stat label="Reviews" number={stats.reviews || 0} />
        </section>

        <div className="mt-4 grid gap-4 md:grid-cols-2">
          <Panel icon={<FaGraduationCap />} title="Verification">
            {["license", "identity", "certificate"].map((type) => {
              const document = approvedDocs.find(
                (item) =>
                  item.type === type || item.requirementKey?.includes(type),
              );
              return (
                <Row green={document?.status === "approved"} key={type}>
                  {type.charAt(0).toUpperCase() + type.slice(1)}:{" "}
                  {document?.status || "Not submitted"}
                </Row>
              );
            })}
          </Panel>
          <section className="rounded-xl bg-[#e8eef7] p-3">
            {reviews.length ? (
              <div className="grid gap-3 sm:grid-cols-2">
                {reviews.slice(0, 2).map((review) => (
                  <article key={review._id} className="rounded-xl bg-white p-4">
                    <p className="min-h-[45px] text-[11px] leading-4">
                      {review.comment || "The student rated this instructor."}
                    </p>
                    <div className="mt-2 flex gap-1 text-amber-400">
                      {Array.from({ length: 5 }).map((_, index) => (
                        <FaStar
                          key={index}
                          className={
                            index < review.rating ? "" : "text-slate-200"
                          }
                        />
                      ))}
                    </div>
                    <div className="mt-3 flex items-center gap-2">
                      {review.student?.avatar ? (
                        <img
                          src={mediaUrl(review.student.avatar)}
                          alt=""
                          className="h-8 w-8 rounded-full object-cover"
                        />
                      ) : (
                        <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#e8eef7] text-xs font-bold">
                          {review.student?.name?.charAt(0) || "S"}
                        </span>
                      )}
                      <div>
                        <p className="text-[10px] font-bold">
                          {review.student?.name || "Student"}
                        </p>
                        <p className="text-[9px] text-slate-500">
                          Learner driver
                        </p>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            ) : (
              <div className="p-10 text-center text-xs text-slate-500">
                No reviews yet.
              </div>
            )}
          </section>
        </div>
      </div>
    </main>
  );
}

function Stat({ label, number }) {
  return (
    <div className="rounded-xl bg-white p-4 text-center">
      <p className="text-[11px] font-bold">{label}</p>
      <p className="mt-1 text-lg font-black text-[#123f88]">{number}</p>
    </div>
  );
}
