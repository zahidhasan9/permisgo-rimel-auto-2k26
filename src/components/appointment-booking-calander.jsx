"use client";

import { useMemo, useState } from "react";
import {
  FaCalendarDays,
  FaChevronLeft,
  FaChevronRight,
  FaGlobe,
} from "react-icons/fa6";

const MONTHS = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const WEEKDAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const TIME_SLOTS = ["11:00 AM", "02:00 PM", "04:00 PM", "05:00 PM"];
const INITIAL_DATE = new Date(2021, 11, 23);

function buildCalendar(viewDate) {
  const year = viewDate.getFullYear();
  const month = viewDate.getMonth();
  const mondayFirstOffset = (new Date(year, month, 1).getDay() + 6) % 7;
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const daysInPreviousMonth = new Date(year, month, 0).getDate();
  const cells = [];

  for (let index = mondayFirstOffset - 1; index >= 0; index -= 1) {
    const day = daysInPreviousMonth - index;
    cells.push({
      day,
      muted: true,
      date: new Date(year, month - 1, day),
    });
  }

  for (let day = 1; day <= daysInMonth; day += 1) {
    cells.push({ day, muted: false, date: new Date(year, month, day) });
  }

  const requiredCells = cells.length > 35 ? 42 : 35;
  let nextDay = 1;

  while (cells.length < requiredCells) {
    cells.push({
      day: nextDay,
      muted: true,
      date: new Date(year, month + 1, nextDay),
    });
    nextDay += 1;
  }

  return cells;
}

function isSameDay(first, second) {
  return (
    first.getFullYear() === second.getFullYear() &&
    first.getMonth() === second.getMonth() &&
    first.getDate() === second.getDate()
  );
}

function formatInputDate(date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function formatCalendarHeader(date) {
  return `${MONTHS[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`;
}

function formatSelectedDate(date) {
  if (isSameDay(date, INITIAL_DATE)) return "Wed, December, 23";

  const weekday = date.toLocaleDateString("en-US", { weekday: "short" });
  return `${weekday}, ${MONTHS[date.getMonth()]}, ${date.getDate()}`;
}

const labelClass =
  "mb-2 block !text-[12px] font-semibold leading-none text-[#4b4b4b]";
const inputClass =
  "h-11 w-full rounded-[8px] border border-[#c2cfe2] bg-white px-3 !text-[13px] font-medium text-[#222] outline-none transition-all duration-300 [&::placeholder]:!text-[13px] [&::placeholder]:text-[#a0a0a0] focus:border-[#174a9b] focus:ring-4 focus:ring-[#174a9b]/10";

export default function AppointmentBooking() {
  const [viewDate, setViewDate] = useState(new Date(2021, 11, 1));
  const [selectedDate, setSelectedDate] = useState(INITIAL_DATE);
  const [selectedTime, setSelectedTime] = useState("");
  const [form, setForm] = useState({
    courseTitle: "",
    instructor: "",
    duration: "",
    name: "",
    email: "",
    phone: "",
    notes: "",
  });

  const calendarCells = useMemo(() => buildCalendar(viewDate), [viewDate]);

  const updateForm = (event) => {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
  };

  const changeMonth = (offset) => {
    const nextView = new Date(
      viewDate.getFullYear(),
      viewDate.getMonth() + offset,
      1,
    );
    setViewDate(nextView);
    setSelectedDate(nextView);
  };

  const selectCalendarDate = (date) => {
    setSelectedDate(date);
    setViewDate(new Date(date.getFullYear(), date.getMonth(), 1));
  };

  const selectInputDate = (value) => {
    if (!value) return;
    const [year, month, day] = value.split("-").map(Number);
    selectCalendarDate(new Date(year, month - 1, day));
  };

  return (
    <section
      id="appointment-booking"
      className="mx-auto min-w-0 w-full max-w-[1280px] overflow-hidden rounded-[12px] bg-white px-3 pb-6 pt-6 sm:px-6"
    >
      <h2 className="text-center text-[30px] font-extrabold tracking-[-0.02em] text-[#222] sm:text-[36px]">
        Appointment Booking Form
      </h2>

      <div className="mt-10 min-w-0 rounded-[12px] bg-[#dce4f1] p-3 sm:p-6">
        <div className="grid min-w-0 grid-cols-[minmax(0,1fr)] gap-6 lg:grid-cols-[1.12fr_1fr]">
          {/* Appointment form */}
          <div className="min-w-0 rounded-[12px] bg-white px-5 py-8 sm:px-10 lg:min-h-[980px] lg:px-12 lg:py-12">
            <p className="!text-[12px] font-medium text-[#494949]">
              PermisGo Driving School
            </p>
            <h3 className="mt-3 text-[24px] font-extrabold leading-tight text-[#181818] sm:text-[28px]">
              Your Appointment with PermisGo
            </h3>
            <p className="mt-3 !text-[12px] font-medium leading-5 text-[#7b7b7b]">
              To schedule an appointment, please fill out the information
              below.
            </p>

            <form
              className="mt-7 space-y-6"
              onSubmit={(event) => event.preventDefault()}
            >
              <div>
                <label htmlFor="course-title" className={labelClass}>
                  Course Title
                </label>
                <input
                  id="course-title"
                  name="courseTitle"
                  type="text"
                  value={form.courseTitle}
                  onChange={updateForm}
                  className={inputClass}
                />
              </div>

              <div>
                <label htmlFor="instructor" className={labelClass}>
                  Choose Instructor
                </label>
                <select
                  id="instructor"
                  name="instructor"
                  value={form.instructor}
                  onChange={updateForm}
                  className={inputClass}
                >
                  <option value="" aria-label="Select instructor" />
                  <option value="john-doe">John Doe</option>
                  <option value="marie-curie">Marie Curie</option>
                  <option value="alex-smith">Alex Smith</option>
                </select>
              </div>

              <div className="grid grid-cols-[minmax(0,1fr)] gap-5 sm:grid-cols-2">
                <div>
                  <label htmlFor="appointment-date" className={labelClass}>
                    Select Date
                  </label>
                  <div className="relative">
                    <input
                      id="appointment-date"
                      name="date"
                      type="date"
                      value={formatInputDate(selectedDate)}
                      onChange={(event) => selectInputDate(event.target.value)}
                      className={`${inputClass} pr-10 [&::-webkit-calendar-picker-indicator]:opacity-0`}
                    />
                    <FaCalendarDays
                      aria-hidden="true"
                      className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-[#202020]"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="appointment-time" className={labelClass}>
                    Select Time
                  </label>
                  <select
                    id="appointment-time"
                    name="time"
                    value={selectedTime}
                    onChange={(event) => setSelectedTime(event.target.value)}
                    className={inputClass}
                  >
                    <option value="" aria-label="Select time" />
                    {TIME_SLOTS.map((time) => (
                      <option key={time} value={time}>
                        {time}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-[minmax(0,1fr)] gap-5 sm:grid-cols-2">
                <div>
                  <label htmlFor="duration" className={labelClass}>
                    Duration
                  </label>
                  <select
                    id="duration"
                    name="duration"
                    value={form.duration}
                    onChange={updateForm}
                    className={inputClass}
                  >
                    <option value="" aria-label="Select duration" />
                    <option value="30">30 minutes</option>
                    <option value="60">1 hour</option>
                    <option value="120">2 hours</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="full-name" className={labelClass}>
                    Your Name
                  </label>
                  <input
                    id="full-name"
                    name="name"
                    type="text"
                    autoComplete="name"
                    value={form.name}
                    onChange={updateForm}
                    className={inputClass}
                  />
                </div>
              </div>

              <div className="grid grid-cols-[minmax(0,1fr)] gap-5 sm:grid-cols-2">
                <div>
                  <label htmlFor="email-address" className={labelClass}>
                    Email Address
                  </label>
                  <input
                    id="email-address"
                    name="email"
                    type="email"
                    autoComplete="email"
                    value={form.email}
                    onChange={updateForm}
                    className={inputClass}
                  />
                </div>

                <div>
                  <label htmlFor="phone-number" className={labelClass}>
                    Phone Number
                  </label>
                  <input
                    id="phone-number"
                    name="phone"
                    type="tel"
                    autoComplete="tel"
                    value={form.phone}
                    onChange={updateForm}
                    className={inputClass}
                  />
                </div>
              </div>

              <div>
                <label htmlFor="additional-notes" className={labelClass}>
                  Additional Notes
                </label>
                <textarea
                  id="additional-notes"
                  name="notes"
                  rows={4}
                  value={form.notes}
                  onChange={updateForm}
                  placeholder="Write here"
                  className={`${inputClass} min-h-[118px] resize-none py-3`}
                />
              </div>

              <button
                type="submit"
                className="flex h-12 w-full items-center justify-center rounded-[8px] bg-[#e2233d] px-5 !text-[13px] font-extrabold text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#174a9b] hover:shadow-lg"
              >
                Submit
              </button>
            </form>
          </div>

          {/* Calendar and time slots */}
          <div className="min-w-0">
            <div className="overflow-hidden rounded-[12px] bg-white">
              <div className="flex h-14 items-center justify-between border-b border-[#cbd5e3] px-5">
                <h3 className="!font-sans !text-[14px] font-extrabold text-[#242424]">
                  {formatCalendarHeader(selectedDate)}
                </h3>
                <div className="flex items-center gap-4 text-[#174a9b]">
                  <button
                    type="button"
                    onClick={() => changeMonth(-1)}
                    aria-label="Previous month"
                    className="transition-transform duration-300 hover:-translate-x-1 hover:text-[#e2233d]"
                  >
                    <FaChevronLeft />
                  </button>
                  <button
                    type="button"
                    onClick={() => changeMonth(1)}
                    aria-label="Next month"
                    className="transition-transform duration-300 hover:translate-x-1 hover:text-[#e2233d]"
                  >
                    <FaChevronRight />
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-7 border-b border-[#d3dae5]">
                {WEEKDAYS.map((weekday) => (
                  <div
                    key={weekday}
                    className="flex h-14 items-center justify-center !text-[12px] font-extrabold text-[#202020] lg:h-[100px]"
                  >
                    {weekday}
                  </div>
                ))}
              </div>

              <div className="grid grid-cols-7">
                {calendarCells.map((cell) => {
                  const active =
                    !cell.muted && isSameDay(cell.date, selectedDate);

                  return (
                    <button
                      key={cell.date.toISOString()}
                      type="button"
                      disabled={cell.muted}
                      onClick={() => selectCalendarDate(cell.date)}
                      aria-label={`${MONTHS[cell.date.getMonth()]} ${cell.day}, ${cell.date.getFullYear()}`}
                      aria-pressed={active}
                      className={`flex h-14 items-center justify-center border-b border-r border-[#e1e5eb] !text-[12px] font-bold transition-colors duration-300 [&:nth-child(7n)]:border-r-0 lg:h-[102px] ${
                        cell.muted
                          ? "cursor-default bg-white text-[#c1c1c1]"
                          : "bg-white text-[#333] hover:bg-[#edf3fb] hover:text-[#174a9b]"
                      }`}
                    >
                      <span
                        className={`flex h-10 w-10 items-center justify-center rounded-[7px] ${
                          active ? "bg-[#174a9b] text-white" : ""
                        }`}
                      >
                        {String(cell.day).padStart(2, "0")}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="mt-5 rounded-[12px] bg-white p-5">
              <h3 className="!font-sans !text-[14px] font-extrabold text-[#343434]">
                {formatSelectedDate(selectedDate)}
              </h3>
              <div className="mt-5 grid grid-cols-[minmax(0,1fr)] gap-3 sm:grid-cols-2">
                {TIME_SLOTS.map((time) => {
                  const active = selectedTime === time;
                  return (
                    <button
                      key={time}
                      type="button"
                      onClick={() => setSelectedTime(time)}
                      aria-pressed={active}
                      className={`h-11 rounded-[8px] border !text-[12px] font-semibold transition-all duration-300 ${
                        active
                          ? "border-[#174a9b] bg-[#174a9b] text-white"
                          : "border-[#174a9b] bg-white text-[#555] hover:bg-[#edf3fb]"
                      }`}
                    >
                      {time}
                    </button>
                  );
                })}
              </div>
            </div>

            <p className="mt-5 flex items-center gap-2 !text-[11px] font-semibold text-[#313131]">
              <FaGlobe className="text-[#174a9b]" />
              France/ Paris(09:00 PM)
              <span aria-hidden="true">▾</span>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
