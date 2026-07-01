import { useMemo, useState } from "react";

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

export default function AppointmentBooking() {
  const today = new Date();

  const [viewDate, setViewDate] = useState(
    new Date(today.getFullYear(), today.getMonth(), 1),
  );

  const [selectedDate, setSelectedDate] = useState(new Date());
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

  const calendarCells = useMemo(() => {
    const year = viewDate.getFullYear();
    const month = viewDate.getMonth();

    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const daysInPrev = new Date(year, month, 0).getDate();

    const cells = [];

    for (let i = firstDay - 1; i >= 0; i--) {
      cells.push({
        day: daysInPrev - i,
        muted: true,
        date: new Date(year, month - 1, daysInPrev - i),
      });
    }

    for (let d = 1; d <= daysInMonth; d++) {
      cells.push({
        day: d,
        muted: false,
        date: new Date(year, month, d),
      });
    }

    let next = 1;

    while (cells.length < 42) {
      cells.push({
        day: next,
        muted: true,
        date: new Date(year, month + 1, next),
      });
      next++;
    }

    return cells;
  }, [viewDate]);

  const isSameDay = (a, b) =>
    a &&
    b &&
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate();

  const formatDateInput = (date) => {
    const offset = date.getTimezoneOffset();
    const localDate = new Date(date.getTime() - offset * 60000);
    return localDate.toISOString().slice(0, 10);
  };

  const formatHeader = (date) =>
    `${date.toLocaleString("en-US", { weekday: "short" })}, ${date.toLocaleString(
      "en-US",
      { month: "long" },
    )}, ${date.getDate()}`;

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log({
      ...form,
      date: selectedDate,
      time: selectedTime,
    });

    alert("Appointment booked!");
  };

  const labelClass = "mb-1.5 block text-sm font-medium text-[#5b6478]";

  const inputClass =
    "w-full rounded-lg border border-[#e3e6ee] bg-white px-3 py-2.5 text-sm text-[#0f1729] outline-none transition focus:border-[#2f6bff] focus:ring-4 focus:ring-[#2f6bff]/10";

  return (
    <section className="min-h-screen bg-[#eef1fb] px-0 py-[30px] min-[501px]:px-[10px] min-[901px]:px-[50px] min-[901px]:py-[50px]">
      <div className="mx-auto w-full max-w-[1400px]">
        <h2 className="mb-6 text-center text-[30px] font-bold text-[#0f1729] min-[901px]:text-[40px]">
          Appointment Booking Form
        </h2>

        <div className="rounded-2xl bg-white p-3 shadow-[0_8px_30px_rgba(15,23,41,0.06)] md:p-6">
          <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
            {/* LEFT FORM */}
            <div className="h-full rounded-[14px] border border-[#eef0f5] bg-white p-4 md:p-6">
              <p className="mb-1 text-sm text-[#5b6478]">
                PermisGo Driving School
              </p>

              <h4 className="mb-2 text-xl font-bold text-[#0f1729]">
                Your Appointment with PermisGo
              </h4>

              <p className="mb-6 text-sm text-gray-500">
                To schedule an appointment, please fill out the information
                below.
              </p>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className={labelClass}>Course Title</label>
                  <input
                    type="text"
                    name="courseTitle"
                    value={form.courseTitle}
                    onChange={handleChange}
                    className={inputClass}
                  />
                </div>

                <div>
                  <label className={labelClass}>Choose Instructor</label>
                  <select
                    name="instructor"
                    value={form.instructor}
                    onChange={handleChange}
                    className={inputClass}
                  >
                    <option value="">Select instructor</option>
                    <option>John Doe</option>
                    <option>Marie Curie</option>
                    <option>Alex Smith</option>
                  </select>
                </div>

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div>
                    <label className={labelClass}>Select Date</label>
                    <input
                      type="date"
                      value={formatDateInput(selectedDate)}
                      onChange={(e) =>
                        setSelectedDate(new Date(`${e.target.value}T00:00:00`))
                      }
                      className={inputClass}
                    />
                  </div>

                  <div>
                    <label className={labelClass}>Select Time</label>
                    <select
                      value={selectedTime}
                      onChange={(e) => setSelectedTime(e.target.value)}
                      className={inputClass}
                    >
                      <option value="">--:--</option>
                      {TIME_SLOTS.map((time) => (
                        <option key={time}>{time}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div>
                    <label className={labelClass}>Duration</label>
                    <select
                      name="duration"
                      value={form.duration}
                      onChange={handleChange}
                      className={inputClass}
                    >
                      <option value="">Select</option>
                      <option>30 min</option>
                      <option>1 hour</option>
                      <option>2 hours</option>
                    </select>
                  </div>

                  <div>
                    <label className={labelClass}>Your Name</label>
                    <input
                      type="text"
                      name="name"
                      value={form.name}
                      onChange={handleChange}
                      className={inputClass}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div>
                    <label className={labelClass}>Email Address</label>
                    <input
                      type="email"
                      name="email"
                      value={form.email}
                      onChange={handleChange}
                      className={inputClass}
                    />
                  </div>

                  <div>
                    <label className={labelClass}>Phone Number</label>
                    <input
                      type="tel"
                      name="phone"
                      value={form.phone}
                      onChange={handleChange}
                      className={inputClass}
                    />
                  </div>
                </div>

                <div>
                  <label className={labelClass}>Additional Notes</label>
                  <textarea
                    name="notes"
                    rows="3"
                    placeholder="Write here"
                    value={form.notes}
                    onChange={handleChange}
                    className={inputClass}
                  />
                </div>

                <button
                  type="submit"
                  className="w-full rounded-[10px] bg-[#0E4D8C] px-4 py-3 font-semibold text-white transition hover:bg-[#08375f]"
                >
                  Submit
                </button>
              </form>
            </div>

            {/* RIGHT CALENDAR */}
            <div className="flex h-full flex-col rounded-[14px] border border-[#eef0f5] bg-white p-4 md:p-6">
              <div className="mb-4 flex items-center justify-between gap-4">
                <h6 className="font-semibold text-[#0f1729]">
                  {MONTHS[viewDate.getMonth()]} {viewDate.getFullYear()}
                </h6>

                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() =>
                      setViewDate(
                        new Date(
                          viewDate.getFullYear(),
                          viewDate.getMonth() - 1,
                          1,
                        ),
                      )
                    }
                    className="flex h-[30px] w-[30px] items-center justify-center rounded-md border border-[#e3e6ee] text-[#2f6bff] transition hover:bg-[#f3f6ff]"
                  >
                    ‹
                  </button>

                  <button
                    type="button"
                    onClick={() =>
                      setViewDate(
                        new Date(
                          viewDate.getFullYear(),
                          viewDate.getMonth() + 1,
                          1,
                        ),
                      )
                    }
                    className="flex h-[30px] w-[30px] items-center justify-center rounded-md border border-[#e3e6ee] text-[#2f6bff] transition hover:bg-[#f3f6ff]"
                  >
                    ›
                  </button>
                </div>
              </div>

              <div className="overflow-hidden rounded-[10px] border border-[#eef0f5]">
                <div className="grid grid-cols-7 bg-[#fafbff]">
                  {WEEKDAYS.map((day) => (
                    <div
                      key={day}
                      className="border border-[#f1f3f8] bg-[#fafbff] px-1 py-3 text-center text-sm font-semibold text-[#5b6478]"
                    >
                      {day}
                    </div>
                  ))}
                </div>

                <div className="grid grid-cols-7">
                  {calendarCells.map((cell, index) => {
                    const active =
                      isSameDay(cell.date, selectedDate) && !cell.muted;

                    return (
                      <button
                        key={index}
                        type="button"
                        disabled={cell.muted}
                        onClick={() =>
                          !cell.muted && setSelectedDate(cell.date)
                        }
                        className={[
                          "border border-[#f1f3f8] px-1 py-4 text-center text-sm transition",
                          cell.muted
                            ? "cursor-default bg-white text-[#c4c9d6]"
                            : "cursor-pointer bg-white text-[#0f1729] hover:bg-[#f3f6ff]",
                          active
                            ? "bg-[#2f6bff] font-semibold text-white hover:bg-[#2f6bff]"
                            : "",
                        ].join(" ")}
                      >
                        {String(cell.day).padStart(2, "0")}
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="mt-4 rounded-[10px] border border-[#eef0f5] bg-white p-4 lg:mt-auto">
                <p className="mb-4 font-semibold text-[#0f1729]">
                  {formatHeader(selectedDate)}
                </p>

                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                  {TIME_SLOTS.map((time) => (
                    <button
                      key={time}
                      type="button"
                      onClick={() => setSelectedTime(time)}
                      className={[
                        "w-full rounded-lg border px-4 py-3 text-sm font-medium transition",
                        selectedTime === time
                          ? "border-[#2f6bff] bg-[#2f6bff] text-white"
                          : "border-[#e3e6ee] bg-white text-[#0f1729] hover:bg-[#f3f6ff]",
                      ].join(" ")}
                    >
                      {time}
                    </button>
                  ))}
                </div>

                <p className="mt-4 text-sm text-gray-500">
                  🌐 France/ Paris 09:00 PM ▾
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
