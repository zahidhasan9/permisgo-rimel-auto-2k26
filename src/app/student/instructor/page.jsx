"use client";

import {
  IoCalendarClearOutline,
  IoCarSportOutline,
  IoCheckmarkCircle,
  IoChevronBack,
  IoLocationOutline,
  IoMailOutline,
  IoMedalOutline,
  IoPersonOutline,
  IoPhonePortraitOutline,
  IoRibbonOutline,
  IoShieldCheckmarkOutline,
  IoStar,
  IoTimeOutline,
  IoTrophyOutline,
} from "react-icons/io5";

const instructor = {
  name: "John Doe",
  role: "Certified Driving Instructor",
  location: "Paris, France",
  experience: "05 Years+",
  rating: "4.9",
  reviews: "320+",
  avatar:
    "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80",
};

const stats = [
  { label: "Students Trained", value: "1200+", icon: <IoPersonOutline /> },
  { label: "Pass Rate", value: "95%", icon: <IoTrophyOutline /> },
  { label: "Lessons Completed", value: "5000+", icon: <IoCarSportOutline /> },
  { label: "Reviews", value: "320+", icon: <IoStar /> },
];

const personalInfo = [
  { label: "Full Name", value: "John Doe", icon: <IoPersonOutline /> },
  {
    label: "Date of Birth",
    value: "12 March 1990",
    icon: <IoCalendarClearOutline />,
  },
  { label: "Email", value: "john.doe@email.com", icon: <IoMailOutline /> },
  {
    label: "Phone",
    value: "+33 123 456 789",
    icon: <IoPhonePortraitOutline />,
  },
  { label: "Location", value: "Paris, France", icon: <IoLocationOutline /> },
];

const vehicleInfo = [
  { label: "Vehicle Type", value: "Automatic" },
  { label: "Car Model", value: "Toyota Yaris" },
  { label: "Transmission", value: "Automatic" },
  { label: "Vehicle Status", value: "Approved" },
  { label: "Location", value: "Paris, France" },
];

const lessons = [
  "Permis B Boîte Manuelle",
  "Eco Permit",
  "Zen Code",
  "Success Code",
];

const availability = [
  "Monday: 9:00 AM – 5:00 PM",
  "Tuesday: 10:00 AM – 6:00 PM",
  "Wednesday: Available",
  "Thursday: 9:00 AM – 4:00 PM",
  "Friday: Available",
];

const verification = [
  "Driving License Verified",
  "Identity Document Verified",
  "Certification Approved",
];

const reviews = [
  {
    name: "Esther Howard",
    role: "Web Designer",
    text: "Thanks to the instructor, I passed my driving test on the first try.",
    avatar:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=140&q=80",
  },
  {
    name: "Brooklyn Simmons",
    role: "Student",
    text: "Very calm, professional and easy to understand. Highly recommended.",
    avatar:
      "https://images.unsplash.com/photo-1502685104226-ee32379fefbe?auto=format&fit=crop&w=140&q=80",
  },
];

export default function InstructorProfilePage() {
  return (
    <main className="min-h-screen bg-[#F7F9FC] px-4 py-4 antialiased sm:px-6 lg:px-8">
      <div className="mx-auto max-w-[1120px]">
        {/* Header */}
        <header className="mb-5 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => window.history.back()}
              className="flex h-10 w-10 items-center justify-center rounded-[14px] bg-white text-[#344054] shadow-[0_1px_2px_rgba(16,24,40,0.04)] ring-1 ring-black/[0.04] transition active:scale-95"
            >
              <IoChevronBack className="text-[21px]" />
            </button>

            <div>
              <h1 className="text-[22px] font-semibold tracking-[-0.035em] text-[#1B3F73] sm:text-[26px]">
                Instructor Profile
              </h1>
              <p className="mt-0.5 text-xs text-[#7A8495]">
                Professional driving instructor details and booking overview.
              </p>
            </div>
          </div>

          <button className="hidden rounded-[14px] bg-[#D92D20] px-5 py-2.5 text-xs font-medium text-white shadow-[0_10px_22px_rgba(217,45,32,0.16)] transition hover:bg-[#B42318] active:scale-[0.98] sm:block">
            Book Now
          </button>
        </header>

        {/* Profile Hero */}
        <section className="mb-4 overflow-hidden rounded-[26px] bg-white p-3 shadow-[0_1px_3px_rgba(16,24,40,0.04)] ring-1 ring-black/[0.04] sm:p-4">
          <div className="relative overflow-hidden rounded-[22px] bg-gradient-to-br from-[#EAF1FA] via-[#F7F9FC] to-white p-5">
            <div className="absolute -right-16 -top-16 h-44 w-44 rounded-full bg-[#B7D4FF]/30 blur-3xl" />
            <div className="absolute -bottom-20 left-20 h-52 w-52 rounded-full bg-[#DCEBFF]/60 blur-3xl" />

            <div className="relative z-10 flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
                <div className="relative h-[118px] w-[118px] shrink-0">
                  <img
                    src={instructor.avatar}
                    alt={instructor.name}
                    className="h-full w-full rounded-[30px] object-cover shadow-[0_16px_34px_rgba(16,24,40,0.14)] ring-4 ring-white"
                  />
                  <span className="absolute -bottom-2 -right-2 flex h-9 w-9 items-center justify-center rounded-full bg-[#12B76A] text-white shadow-lg ring-4 ring-white">
                    <IoCheckmarkCircle className="text-[21px]" />
                  </span>
                </div>

                <div>
                  <div className="mb-2 inline-flex items-center gap-1.5 rounded-full bg-white px-3 py-1.5 text-[11px] font-medium text-[#477DBA] shadow-sm ring-1 ring-black/[0.04]">
                    <IoShieldCheckmarkOutline className="text-[14px]" />
                    Verified Instructor
                  </div>

                  <h2 className="text-[27px] font-semibold tracking-[-0.04em] text-[#263241] sm:text-[34px]">
                    {instructor.name}
                  </h2>

                  <p className="mt-1 text-sm text-[#667085]">
                    {instructor.role}
                  </p>

                  <div className="mt-3 flex flex-wrap items-center gap-2 text-xs text-[#7A8495]">
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-white px-3 py-1.5 shadow-sm ring-1 ring-black/[0.04]">
                      <IoLocationOutline className="text-[#477DBA]" />
                      {instructor.location}
                    </span>

                    <span className="inline-flex items-center gap-1.5 rounded-full bg-white px-3 py-1.5 shadow-sm ring-1 ring-black/[0.04]">
                      <IoRibbonOutline className="text-[#477DBA]" />
                      {instructor.experience}
                    </span>

                    <span className="inline-flex items-center gap-1.5 rounded-full bg-white px-3 py-1.5 shadow-sm ring-1 ring-black/[0.04]">
                      <IoStar className="text-[#F6B700]" />
                      {instructor.rating} Rating
                    </span>
                  </div>
                </div>
              </div>

              <div className="rounded-[22px] bg-white/80 p-4 shadow-[0_10px_28px_rgba(16,24,40,0.06)] ring-1 ring-white/70 backdrop-blur-md lg:w-[260px]">
                <p className="text-xs text-[#8A94A6]">Instructor Rating</p>

                <div className="mt-2 flex items-end gap-2">
                  <h3 className="text-[34px] font-semibold leading-none tracking-[-0.05em] text-[#263241]">
                    4.9
                  </h3>
                  <p className="pb-1 text-xs text-[#7A8495]">out of 5</p>
                </div>

                <div className="mt-3 flex gap-1 text-[#F6B700]">
                  {Array.from({ length: 5 }).map((_, index) => (
                    <IoStar key={index} className="text-[18px]" />
                  ))}
                </div>

                <button className="mt-4 h-10 w-full rounded-[14px] bg-[#1D4E89] text-xs font-medium text-white shadow-[0_10px_22px_rgba(29,78,137,0.16)] transition hover:bg-[#193F70] active:scale-[0.98]">
                  Book a Lesson
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Stats */}
        <section className="mb-4 grid grid-cols-2 gap-3 lg:grid-cols-4">
          {stats.map((item) => (
            <div
              key={item.label}
              className="rounded-[22px] bg-white p-4 shadow-[0_1px_3px_rgba(16,24,40,0.04)] ring-1 ring-black/[0.04]"
            >
              <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-[14px] bg-[#EEF5FF] text-[19px] text-[#477DBA]">
                {item.icon}
              </div>

              <h3 className="text-[22px] font-semibold leading-none tracking-[-0.04em] text-[#263241]">
                {item.value}
              </h3>
              <p className="mt-1.5 text-xs text-[#7A8495]">{item.label}</p>
            </div>
          ))}
        </section>

        {/* Main Content */}
        <section className="grid gap-4 lg:grid-cols-[1fr_1fr]">
          <InfoCard title="Personal Information" icon={<IoPersonOutline />}>
            <div className="grid gap-2">
              {personalInfo.map((item) => (
                <InfoRow
                  key={item.label}
                  icon={item.icon}
                  label={item.label}
                  value={item.value}
                />
              ))}
            </div>
          </InfoCard>

          <InfoCard title="Vehicle Information" icon={<IoCarSportOutline />}>
            <div className="grid gap-2">
              {vehicleInfo.map((item) => (
                <SimpleRow
                  key={item.label}
                  label={item.label}
                  value={item.value}
                />
              ))}
            </div>
          </InfoCard>

          <InfoCard title="Lessons Offered" icon={<IoRibbonOutline />}>
            <div className="grid gap-2 sm:grid-cols-2">
              {lessons.map((lesson) => (
                <div
                  key={lesson}
                  className="flex items-center gap-2 rounded-[15px] bg-[#FAFBFD] px-3 py-3 ring-1 ring-black/[0.04]"
                >
                  <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[#EEF5FF] text-[#477DBA]">
                    <IoCheckmarkCircle className="text-[14px]" />
                  </span>
                  <p className="text-xs font-medium text-[#344054]">{lesson}</p>
                </div>
              ))}
            </div>
          </InfoCard>

          <InfoCard title="Availability" icon={<IoTimeOutline />}>
            <div className="grid gap-2">
              {availability.map((item) => (
                <div
                  key={item}
                  className="flex items-center gap-2 rounded-[15px] bg-[#FAFBFD] px-3 py-3 ring-1 ring-black/[0.04]"
                >
                  <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[#ECFDF3] text-[#12A150]">
                    <IoCheckmarkCircle className="text-[14px]" />
                  </span>
                  <p className="text-xs text-[#667085]">{item}</p>
                </div>
              ))}
            </div>
          </InfoCard>
        </section>

        {/* Bottom */}
        <section className="mt-4 grid gap-4 lg:grid-cols-[0.78fr_1.22fr]">
          <InfoCard title="Verification" icon={<IoMedalOutline />}>
            <div className="grid gap-2">
              {verification.map((item) => (
                <div
                  key={item}
                  className="flex items-center justify-between rounded-[15px] bg-[#FAFBFD] px-3 py-3 ring-1 ring-black/[0.04]"
                >
                  <div className="flex items-center gap-2">
                    <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[#ECFDF3] text-[#12A150]">
                      <IoCheckmarkCircle className="text-[14px]" />
                    </span>
                    <p className="text-xs text-[#667085]">{item}</p>
                  </div>

                  <span className="rounded-full bg-[#ECFDF3] px-2.5 py-1 text-[10px] font-medium text-[#12A150]">
                    Approved
                  </span>
                </div>
              ))}
            </div>
          </InfoCard>

          <div className="rounded-[24px] bg-white p-4 shadow-[0_1px_3px_rgba(16,24,40,0.04)] ring-1 ring-black/[0.04]">
            <div className="mb-4">
              <h3 className="text-[16px] font-semibold tracking-[-0.02em] text-[#263241]">
                Student Reviews
              </h3>
              <p className="mt-0.5 text-xs text-[#8A94A6]">
                Recent feedback from learners.
              </p>
            </div>

            <div className="grid gap-3 sm:grid-cols-2">
              {reviews.map((review) => (
                <ReviewCard key={review.name} review={review} />
              ))}
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}

function InfoCard({ title, icon, children }) {
  return (
    <div className="rounded-[24px] bg-white p-4 shadow-[0_1px_3px_rgba(16,24,40,0.04)] ring-1 ring-black/[0.04]">
      <div className="mb-4 flex items-center gap-2">
        <div className="flex h-9 w-9 items-center justify-center rounded-[13px] bg-[#EEF5FF] text-[18px] text-[#477DBA]">
          {icon}
        </div>
        <div>
          <h3 className="text-[16px] font-semibold tracking-[-0.02em] text-[#263241]">
            {title}
          </h3>
          <p className="text-xs text-[#8A94A6]">Instructor profile details</p>
        </div>
      </div>

      {children}
    </div>
  );
}

function InfoRow({ icon, label, value }) {
  return (
    <div className="flex items-center gap-3 rounded-[15px] bg-[#FAFBFD] px-3 py-3 ring-1 ring-black/[0.04]">
      <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-[12px] bg-white text-[#477DBA] shadow-sm ring-1 ring-black/[0.04]">
        {icon}
      </span>

      <div className="min-w-0">
        <p className="text-[10px] text-[#98A2B3]">{label}</p>
        <p className="mt-0.5 truncate text-xs font-medium text-[#344054]">
          {value}
        </p>
      </div>
    </div>
  );
}

function SimpleRow({ label, value }) {
  return (
    <div className="flex items-center justify-between gap-3 rounded-[15px] bg-[#FAFBFD] px-3 py-3 ring-1 ring-black/[0.04]">
      <p className="text-xs text-[#8A94A6]">{label}</p>
      <p className="text-xs font-medium text-[#344054]">{value}</p>
    </div>
  );
}

function ReviewCard({ review }) {
  return (
    <article className="rounded-[20px] bg-[#FAFBFD] p-4 ring-1 ring-black/[0.04]">
      <div className="mb-3 flex gap-1 text-[#F6B700]">
        {Array.from({ length: 5 }).map((_, index) => (
          <IoStar key={index} className="text-[15px]" />
        ))}
      </div>

      <p className="text-sm leading-6 text-[#667085]">“{review.text}”</p>

      <div className="mt-4 flex items-center gap-3">
        <img
          src={review.avatar}
          alt={review.name}
          className="h-10 w-10 rounded-full object-cover"
        />

        <div>
          <h4 className="text-sm font-semibold text-[#263241]">
            {review.name}
          </h4>
          <p className="text-xs text-[#8A94A6]">{review.role}</p>
        </div>
      </div>
    </article>
  );
}
