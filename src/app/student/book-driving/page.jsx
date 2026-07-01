// "use client";

// import { FaCalendarAlt, FaCaretDown, FaStar, FaWhatsapp } from "react-icons/fa";
// import { IoChevronBack } from "react-icons/io5";

// const instructors = [
//   {
//     name: "Robert Fox",
//     phone: "089636789000",
//     avatar: "male1",
//   },
//   {
//     name: "Leslie Alexander",
//     phone: "089636789000",
//     avatar: "male2",
//   },
//   {
//     name: "Devon Lane",
//     phone: "089636789000",
//     avatar: "female",
//   },
// ];

// function Header() {
//   return (
//     <header className="flex items-center gap-[16px]">
//       <button className="flex h-[44px] w-[44px] shrink-0 items-center justify-center rounded-[12px] bg-[#EEF4FB] text-[27px] text-black">
//         <IoChevronBack />
//       </button>

//       <h1 className="text-[26px] font-[700] leading-none text-[#174A9B]">
//         Book Driving Lesson
//       </h1>
//     </header>
//   );
// }

// function Field({ label, value, icon, dropdown }) {
//   return (
//     <div>
//       <label className="mb-[13px] block text-[13.5px] font-[700] leading-none text-[#666666]">
//         {label}
//       </label>

//       <div className="flex h-[44px] items-center rounded-[11px] border border-[#AFC5EB] bg-[#F7FAFF] px-[16px]">
//         <span className="text-[14px] font-[500] text-[#222222]">{value}</span>

//         <div className="ml-auto flex items-center">
//           {icon}
//           {dropdown && <FaCaretDown className="text-[18px] text-[#222222]" />}
//         </div>
//       </div>
//     </div>
//   );
// }

// function PhoneField() {
//   return (
//     <div>
//       <label className="mb-[13px] block text-[13.5px] font-[700] leading-none text-[#666666]">
//         Phone Number
//       </label>

//       <div className="flex h-[44px] items-center rounded-[11px] border border-[#D2DDEC] bg-[#F7FAFF] px-[16px]">
//         <span className="mr-[13px] flex h-[19px] w-[19px] items-center justify-center rounded-full bg-[#006A4E]">
//           <span className="h-[13px] w-[13px] rounded-full bg-[#F42A41]" />
//         </span>

//         <span className="text-[14px] font-[500] text-[#222222]">
//           +880988900
//         </span>
//       </div>
//     </div>
//   );
// }

// function Avatar({ type }) {
//   if (type === "female") {
//     return (
//       <div className="relative h-[68px] w-[68px] overflow-hidden rounded-full bg-[#D6D9DD]">
//         <div className="absolute left-1/2 top-[8px] h-[45px] w-[46px] -translate-x-1/2 rounded-full bg-[#171717]" />
//         <div className="absolute left-1/2 top-[22px] h-[34px] w-[32px] -translate-x-1/2 rounded-full bg-[#C58A68]" />
//         <div className="absolute bottom-[-16px] left-1/2 h-[44px] w-[58px] -translate-x-1/2 rounded-t-full bg-[#111827]" />
//       </div>
//     );
//   }

//   if (type === "male2") {
//     return (
//       <div className="relative h-[68px] w-[68px] overflow-hidden rounded-full bg-[#0074A6]">
//         <div className="absolute left-1/2 top-[9px] h-[32px] w-[38px] -translate-x-1/2 rounded-full bg-[#111111]" />
//         <div className="absolute left-1/2 top-[20px] h-[36px] w-[34px] -translate-x-1/2 rounded-full bg-[#A87048]" />
//         <div className="absolute left-[21px] top-[31px] h-[6px] w-[27px] rounded-full border border-black" />
//         <div className="absolute bottom-[-17px] left-1/2 h-[45px] w-[58px] -translate-x-1/2 rounded-t-full bg-[#172032]" />
//       </div>
//     );
//   }

//   return (
//     <div className="relative h-[68px] w-[68px] overflow-hidden rounded-full bg-[#1E9AD7]">
//       <div className="absolute left-1/2 top-[10px] h-[31px] w-[38px] -translate-x-1/2 rounded-full bg-[#2A1B15]" />
//       <div className="absolute left-1/2 top-[19px] h-[38px] w-[34px] -translate-x-1/2 rounded-full bg-[#C98454]" />
//       <div className="absolute bottom-[-16px] left-1/2 h-[43px] w-[58px] -translate-x-1/2 rounded-t-full bg-[#F3F5F8]" />
//     </div>
//   );
// }

// function InstructorCard({ item }) {
//   return (
//     <div className="flex h-[319px] flex-col items-center rounded-[10px] bg-white px-[24px] pt-[17px]">
//       <Avatar type={item.avatar} />

//       <h3 className="mt-[17px] text-center text-[21px] font-[700] leading-none text-[#174A9B]">
//         {item.name}
//       </h3>

//       <div className="mt-[12px] flex items-center justify-center gap-[6px]">
//         <FaWhatsapp className="text-[15px] text-[#10B86F]" />
//         <span className="text-[14px] font-[500] leading-none text-[#666666]">
//           {item.phone}
//         </span>
//       </div>

//       <div className="mt-[18px] flex h-[76px] w-[214px] flex-col items-center justify-center rounded-[10px] bg-[#E8EEF8]">
//         <p className="text-[12px] font-[500] leading-none text-[#666666]">
//           Experience{" "}
//           <span className="font-[700] text-[#222222]">05 Years+</span>
//         </p>

//         <div className="mt-[14px] flex gap-[10px] text-[16px] text-[#174A9B]">
//           <FaStar />
//           <FaStar />
//           <FaStar />
//           <FaStar />
//           <FaStar />
//         </div>
//       </div>

//       <button className="mt-[16px] h-[41px] w-[214px] rounded-[8px] border border-[#E5273D] bg-white text-[12px] font-[700] text-[#174A9B]">
//         Book Now
//       </button>
//     </div>
//   );
// }

// function InstructorSection() {
//   return (
//     <section className="mt-[20px] rounded-[10px] bg-[#E8EEF8] px-[20px] pb-[22px] pt-[22px]">
//       <h2 className="text-[18px] font-[700] leading-none text-[#222222]">
//         Available Instructor
//       </h2>

//       <div className="mt-[25px] grid grid-cols-1 gap-[20px] md:grid-cols-2 xl:grid-cols-3">
//         {instructors.map((item) => (
//           <InstructorCard key={item.name} item={item} />
//         ))}
//       </div>
//     </section>
//   );
// }

// export default function Page() {
//   return (
//     <>
//       <style jsx global>{`
//         @import url("https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&display=swap");

//         * {
//           box-sizing: border-box;
//         }

//         html,
//         body {
//           margin: 0;
//           background: #ffffff;
//           font-family: "Poppins", sans-serif;
//           overflow-x: hidden;
//         }
//       `}</style>

//       <main className="min-h-screen bg-white">
//         <div className="mx-auto w-full max-w-[1132px] px-[24px] pb-[24px] pt-[24px]">
//           <Header />

//           <section className="mt-[34px] rounded-[10px] bg-[#E8EEF8] px-[24px] py-[24px]">
//             <div className="rounded-[10px] bg-white px-[24px] pb-[24px] pt-[28px] sm:px-[24px] xl:px-[24px]">
//               <h2 className="text-[22px] font-[700] leading-none text-[#111111]">
//                 Fill out this form
//               </h2>

//               <div className="mt-[29px] grid grid-cols-1 gap-x-[24px] gap-y-[24px] md:grid-cols-2">
//                 <Field label="First Name" value="Robert" />
//                 <Field label="Last Name" value="Fox" />

//                 <PhoneField />
//                 <Field label="Vehicle type" value="Manual Car" dropdown />

//                 <Field
//                   label="Select Date"
//                   value="10/12/2025"
//                   icon={
//                     <FaCalendarAlt className="text-[18px] text-[#222222]" />
//                   }
//                 />
//                 <Field label="Select Time" value="10 AM - 12 PM" dropdown />

//                 <Field label="Address" value="House no : 100, Dhaka" />
//                 <Field label="Your City" value="Dhaka" />
//               </div>

//               <InstructorSection />

//               <button className="mt-[39px] h-[49px] w-[96px] rounded-[11px] bg-[#E5273D] text-[15px] font-[700] text-white">
//                 Submit
//               </button>
//             </div>
//           </section>
//         </div>
//       </main>
//     </>
//   );
// }

"use client";

import Link from "next/link";
import { useState } from "react";
import {
  FaCalendarAlt,
  FaCarSide,
  FaClock,
  FaStar,
  FaWhatsapp,
} from "react-icons/fa";

import { FaMapMarkerAlt } from "react-icons/fa";
import {
  IoArrowForward,
  IoCallOutline,
  IoCarSportOutline,
  IoCheckmarkCircle,
  IoChevronBack,
  IoLocationOutline,
  IoPersonOutline,
  IoShieldCheckmarkOutline,
} from "react-icons/io5";

const instructors = [
  {
    name: "Robert Fox",
    phone: "089636789000",
    experience: "05 Years+",
    rating: "4.9",
    lessons: "1200+",
    avatar:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=300&q=80",
  },
  {
    name: "Leslie Alexander",
    phone: "089636789000",
    experience: "06 Years+",
    rating: "4.8",
    lessons: "980+",
    avatar:
      "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=300&q=80",
  },
  {
    name: "Devon Lane",
    phone: "089636789000",
    experience: "04 Years+",
    rating: "4.7",
    lessons: "860+",
    avatar:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=300&q=80",
  },
];

export default function Page() {
  const [selectedInstructor, setSelectedInstructor] = useState("Robert Fox");

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
                Book Driving Lesson
              </h1>
              <p className="mt-0.5 text-xs text-[#7A8495]">
                Choose your lesson details and book with a verified instructor.
              </p>
            </div>
          </div>

          <div className="hidden items-center gap-2 rounded-[14px] bg-white px-3.5 py-2.5 text-xs font-medium text-[#667085] shadow-[0_1px_2px_rgba(16,24,40,0.04)] ring-1 ring-black/[0.04] sm:flex">
            <IoShieldCheckmarkOutline className="text-[16px] text-[#477DBA]" />
            Secure Booking
          </div>
        </header>

        {/* Hero */}
        <section className="mb-4 overflow-hidden rounded-[26px] bg-white p-3 shadow-[0_1px_3px_rgba(16,24,40,0.04)] ring-1 ring-black/[0.04] sm:p-4">
          <div className="relative overflow-hidden rounded-[22px] bg-gradient-to-br from-[#477DBA] via-[#245A97] to-[#163A63] p-5 text-white">
            <div className="absolute -right-16 -top-16 h-44 w-44 rounded-full bg-white/10 blur-3xl" />
            <div className="absolute -bottom-20 left-20 h-52 w-52 rounded-full bg-[#B7D4FF]/20 blur-3xl" />

            <div className="relative z-10 grid gap-5 lg:grid-cols-[1.15fr_0.85fr] lg:items-center">
              <div>
                <div className="mb-3 inline-flex items-center gap-1.5 rounded-full bg-white/14 px-3 py-1.5 text-[11px] font-medium text-white/90 backdrop-blur-md">
                  <FaCarSide className="text-[#F8D57E]" />
                  Professional Driving Lesson
                </div>

                <h2 className="max-w-[620px] text-[28px] font-semibold leading-[1.08] tracking-[-0.04em] sm:text-[38px]">
                  Book your next driving lesson with expert instructors.
                </h2>

                <p className="mt-2 max-w-[560px] text-xs leading-5 text-white/72 sm:text-[13px]">
                  Select your vehicle type, preferred date, time, city and
                  available instructor in one clean booking flow.
                </p>
              </div>

              <div className="grid grid-cols-3 gap-2">
                <HeroStat label="Instructors" value="03" />
                <HeroStat label="Pass Rate" value="95%" />
                <HeroStat label="Rating" value="4.9" />
              </div>
            </div>
          </div>
        </section>

        <section className="grid gap-4 lg:grid-cols-[1fr_0.38fr]">
          {/* Main Form */}
          <div className="rounded-[26px] bg-white p-4 shadow-[0_1px_3px_rgba(16,24,40,0.04)] ring-1 ring-black/[0.04]">
            <div className="mb-5 flex items-center justify-between gap-3">
              <div>
                <h2 className="text-[18px] font-semibold tracking-[-0.03em] text-[#263241]">
                  Lesson Booking Details
                </h2>
                <p className="mt-0.5 text-xs text-[#8A94A6]">
                  Fill in your personal and lesson information.
                </p>
              </div>

              <span className="hidden rounded-full bg-[#EEF5FF] px-3 py-1.5 text-[11px] font-medium text-[#477DBA] sm:inline-flex">
                Step 1 of 2
              </span>
            </div>

            <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
              <FormField
                label="First Name"
                value="Robert"
                icon={<IoPersonOutline />}
              />
              <FormField
                label="Last Name"
                value="Fox"
                icon={<IoPersonOutline />}
              />
              <FormField
                label="Phone Number"
                value="+880 988 900"
                icon={<IoCallOutline />}
              />
              <SelectField
                label="Vehicle Type"
                value="Manual Car"
                icon={<IoCarSportOutline />}
              />
              <FormField
                label="Select Date"
                value="10/12/2025"
                icon={<FaCalendarAlt />}
              />
              <SelectField
                label="Select Time"
                value="10 AM - 12 PM"
                icon={<FaClock />}
              />
              <FormField
                label="Address"
                value="House no: 100, Dhaka"
                icon={<FaMapMarkerAlt />}
              />
              <FormField
                label="Your City"
                value="Dhaka"
                icon={<IoLocationOutline />}
              />
            </div>

            {/* Instructor Section */}
            <section className="mt-5 rounded-[24px] bg-[#F7F9FC] p-3.5 ring-1 ring-black/[0.04] sm:p-4">
              <div className="mb-4 flex items-center justify-between gap-3">
                <div>
                  <h3 className="text-[16px] font-semibold tracking-[-0.02em] text-[#263241]">
                    Available Instructors
                  </h3>
                  <p className="mt-0.5 text-xs text-[#8A94A6]">
                    Select the instructor you want to book.
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 gap-3 md:grid-cols-2 xl:grid-cols-3">
                {instructors.map((item) => (
                  <InstructorCard
                    key={item.name}
                    item={item}
                    selected={selectedInstructor === item.name}
                    onSelect={() => setSelectedInstructor(item.name)}
                  />
                ))}
              </div>
            </section>

            <div className="mt-5 flex flex-col-reverse gap-3 sm:flex-row sm:items-center sm:justify-between">
              <button className="h-11 rounded-[15px] bg-[#F2F5F9] px-5 text-sm font-medium text-[#667085] transition hover:bg-[#EAF1FA] active:scale-[0.98]">
                Cancel
              </button>

              <Link href="/student/instructor">
                <button className="inline-flex h-11 items-center justify-center gap-2 rounded-[15px] bg-[#D92D20] px-6 text-sm font-medium text-white shadow-[0_10px_22px_rgba(217,45,32,0.16)] transition hover:bg-[#B42318] active:scale-[0.98]">
                  Submit Booking
                  <IoArrowForward className="text-[16px]" />
                </button>
              </Link>
            </div>
          </div>

          {/* Booking Summary */}
          <aside className="space-y-4">
            <div className="rounded-[26px] bg-white p-4 shadow-[0_1px_3px_rgba(16,24,40,0.04)] ring-1 ring-black/[0.04]">
              <h3 className="text-[16px] font-semibold tracking-[-0.02em] text-[#263241]">
                Booking Summary
              </h3>
              <p className="mt-0.5 text-xs text-[#8A94A6]">
                Your selected lesson information.
              </p>

              <div className="mt-4 space-y-2">
                <SummaryRow label="Student" value="Robert Fox" />
                <SummaryRow label="Vehicle" value="Manual Car" />
                <SummaryRow label="Date" value="10/12/2025" />
                <SummaryRow label="Time" value="10 AM - 12 PM" />
                <SummaryRow label="City" value="Dhaka" />
                <SummaryRow label="Instructor" value={selectedInstructor} />
              </div>

              <div className="mt-4 rounded-[18px] bg-[#ECFDF3] p-3 ring-1 ring-[#ABEFC6]">
                <div className="flex items-center gap-2">
                  <IoCheckmarkCircle className="text-[18px] text-[#12A150]" />
                  <p className="text-xs font-medium text-[#067647]">
                    Instructor available for this slot
                  </p>
                </div>
              </div>
            </div>

            <div className="rounded-[26px] bg-[#EAF1FA] p-4 ring-1 ring-black/[0.03]">
              <div className="flex h-10 w-10 items-center justify-center rounded-[14px] bg-white text-[#477DBA] shadow-sm">
                <IoShieldCheckmarkOutline className="text-[20px]" />
              </div>

              <h3 className="mt-3 text-[15px] font-semibold tracking-[-0.02em] text-[#263241]">
                Why book here?
              </h3>

              <ul className="mt-2 space-y-2 text-xs leading-5 text-[#667085]">
                <li>• Verified driving instructors</li>
                <li>• Flexible date and time selection</li>
                <li>• Manual and automatic vehicle options</li>
                <li>• Easy booking confirmation</li>
              </ul>
            </div>
          </aside>
        </section>
      </div>
    </main>
  );
}

function HeroStat({ label, value }) {
  return (
    <div className="rounded-[18px] bg-white/12 p-3 text-white ring-1 ring-white/15 backdrop-blur-md">
      <h3 className="text-[22px] font-semibold leading-none tracking-[-0.04em]">
        {value}
      </h3>
      <p className="mt-1 text-[11px] text-white/70">{label}</p>
    </div>
  );
}

function FormField({ label, value, icon }) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-[11px] font-medium text-[#7A8495]">
        {label}
      </span>

      <div className="flex h-12 items-center gap-2.5 rounded-[16px] bg-[#FAFBFD] px-3.5 ring-1 ring-black/[0.04] transition-within:ring-[#477DBA]">
        <span className="text-[16px] text-[#477DBA]">{icon}</span>
        <input
          defaultValue={value}
          className="h-full w-full bg-transparent text-sm font-medium text-[#344054] outline-none placeholder:text-[#A8B0BE]"
        />
      </div>
    </label>
  );
}

function SelectField({ label, value, icon }) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-[11px] font-medium text-[#7A8495]">
        {label}
      </span>

      <div className="flex h-12 items-center gap-2.5 rounded-[16px] bg-[#FAFBFD] px-3.5 ring-1 ring-black/[0.04]">
        <span className="text-[16px] text-[#477DBA]">{icon}</span>

        <select
          defaultValue={value}
          className="h-full w-full bg-transparent text-sm font-medium text-[#344054] outline-none"
        >
          <option>{value}</option>
          <option>Automatic Car</option>
          <option>Manual Car</option>
          <option>Motorbike</option>
        </select>
      </div>
    </label>
  );
}

function InstructorCard({ item, selected, onSelect }) {
  return (
    <button
      type="button"
      onClick={onSelect}
      className={`group relative rounded-[22px] bg-white p-4 text-left transition-all duration-300 ${
        selected
          ? "shadow-[0_14px_34px_rgba(71,125,186,0.16)] ring-2 ring-[#477DBA]"
          : "shadow-[0_1px_2px_rgba(16,24,40,0.04)] ring-1 ring-black/[0.04] hover:-translate-y-0.5 hover:shadow-[0_12px_28px_rgba(16,24,40,0.07)]"
      }`}
    >
      {selected && (
        <span className="absolute right-3 top-3 flex h-7 w-7 items-center justify-center rounded-full bg-[#477DBA] text-white">
          <IoCheckmarkCircle className="text-[18px]" />
        </span>
      )}

      <div className="flex items-center gap-3">
        <img
          src={item.avatar}
          alt={item.name}
          className="h-14 w-14 rounded-[18px] object-cover ring-4 ring-[#F2F5F9]"
        />

        <div className="min-w-0">
          <h4 className="truncate text-[15px] font-semibold tracking-[-0.02em] text-[#263241]">
            {item.name}
          </h4>

          <div className="mt-1 flex items-center gap-1.5 text-xs text-[#7A8495]">
            <FaWhatsapp className="text-[#12B76A]" />
            {item.phone}
          </div>
        </div>
      </div>

      <div className="mt-4 grid grid-cols-3 gap-2">
        <MiniInfo label="Exp." value={item.experience} />
        <MiniInfo label="Rating" value={item.rating} />
        <MiniInfo label="Lessons" value={item.lessons} />
      </div>

      <div className="mt-4 flex items-center justify-between">
        <div className="flex gap-1 text-[#F6B700]">
          {Array.from({ length: 5 }).map((_, index) => (
            <FaStar key={index} className="text-[13px]" />
          ))}
        </div>

        <span
          className={`rounded-full px-3 py-1.5 text-[11px] font-medium ${
            selected
              ? "bg-[#EEF5FF] text-[#477DBA]"
              : "bg-[#F2F5F9] text-[#7A8495]"
          }`}
        >
          {selected ? "Selected" : "Choose"}
        </span>
      </div>
    </button>
  );
}

function MiniInfo({ label, value }) {
  return (
    <div className="rounded-[14px] bg-[#FAFBFD] p-2 ring-1 ring-black/[0.04]">
      <p className="text-[9px] text-[#98A2B3]">{label}</p>
      <p className="mt-0.5 truncate text-[11px] font-medium text-[#344054]">
        {value}
      </p>
    </div>
  );
}

function SummaryRow({ label, value }) {
  return (
    <div className="flex items-center justify-between gap-3 rounded-[15px] bg-[#FAFBFD] px-3 py-2.5 ring-1 ring-black/[0.04]">
      <p className="text-xs text-[#8A94A6]">{label}</p>
      <p className="truncate text-xs font-medium text-[#344054]">{value}</p>
    </div>
  );
}
