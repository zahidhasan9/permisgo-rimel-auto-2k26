"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import {
    FaChevronLeft,
  FaEnvelope,
  FaPhoneAlt,
  FaSearch,
  FaTimes,
  FaUserGraduate,
} from "react-icons/fa";

const students = [
  {
    name: "John Doe",
    email: "john@example.com",
    phone: "+880 1712 345678",
    course: "Beginner Driving Course",
    progress: 60,
    status: "Active",
  },
  {
    name: "Maria Smith",
    email: "maria@example.com",
    phone: "+880 1812 987654",
    course: "Road Test Preparation",
    progress: 80,
    status: "Active",
  },
  {
    name: "David Wilson",
    email: "david@example.com",
    phone: "+880 1912 111222",
    course: "Defensive Driving Course",
    progress: 35,
    status: "Pending",
  },
  {
    name: "Sophia Brown",
    email: "sophia@example.com",
    phone: "+880 1612 555777",
    course: "Refresher Driving Lessons",
    progress: 100,
    status: "Completed",
  },
];

const filterFields = [
  {
    label: "Name",
    name: "name",
    placeholder: "Search name",
    icon: FaSearch,
  },
  {
    label: "Email",
    name: "email",
    placeholder: "Search email",
    icon: FaEnvelope,
  },
  {
    label: "Phone",
    name: "phone",
    placeholder: "Search phone",
    icon: FaPhoneAlt,
  },
];

export default function Students() {
  const [filters, setFilters] = useState({
    name: "",
    email: "",
    phone: "",
  });
   const router = useRouter();
  const handleChange = (e) => {
    const { name, value } = e.target;

    setFilters((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const resetFilters = () => {
    setFilters({
      name: "",
      email: "",
      phone: "",
    });
  };

  const filteredStudents = useMemo(() => {
    return students.filter((student) => {
      const name = student.name.toLowerCase();
      const email = student.email.toLowerCase();
      const phone = student.phone.toLowerCase();

      return (
        name.includes(filters.name.toLowerCase()) &&
        email.includes(filters.email.toLowerCase()) &&
        phone.includes(filters.phone.toLowerCase())
      );
    });
  }, [filters]);

  return (
    <main className="min-h-screen bg-[#f8fafc] px-4 py-5 sm:px-6 lg:px-8">
      <section className="mx-auto ">
        {/* Header */}
        <header className="mb-5 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

           

          <div  className="flex items-center gap-3">
             <button
            type="button"
            onClick={() => router.back()}
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white text-[#16458f] shadow-sm transition hover:bg-blue-50"
          >
            <FaChevronLeft size={14} />
          </button>
           
            <div>

                <h1 className="text-2xl font-bold text-[#16458f]">Students</h1>
            
            </div>
          </div>

          {/* <div className="flex w-full items-center gap-3 rounded-2xl bg-white p-3 shadow-sm ring-1 ring-slate-100 sm:w-auto">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#eef4fb] text-[#16458f]">
              <FaUserGraduate size={19} />
            </div>

            <div>
              <p className="text-xs font-semibold text-slate-500">
                Total Students
              </p>
              <h3 className="text-xl font-black leading-none text-[#16458f]">
                {filteredStudents.length}
              </h3>
            </div>
          </div> */}
        </header>

        {/* Filter Card */}
        <div className="mb-4 rounded-2xl bg-white p-4 shadow-sm ring-1 ring-slate-100">
          <div className="grid gap-3 md:grid-cols-3">
            {filterFields.map((field) => {
              const Icon = field.icon;

              return (
                <div key={field.name}>
                  <label className="mb-1.5 block text-xs font-bold text-slate-600">
                    {field.label}
                  </label>

                  <div className="flex h-10 items-center gap-2.5 rounded-xl border border-slate-200 bg-[#f8fafc] px-3 transition focus-within:border-[#16458f] focus-within:ring-4 focus-within:ring-blue-50">
                    <Icon size={13} className="text-[#16458f]" />

                    <input
                      type="text"
                      name={field.name}
                      value={filters[field.name]}
                      onChange={handleChange}
                      placeholder={field.placeholder}
                      className="w-full bg-transparent text-sm font-medium text-slate-700 outline-none placeholder:text-slate-400"
                    />
                  </div>
                </div>
              );
            })}
            

                   
          </div>

           <div className="mt-3 flex justify-end">
            <button
              type="button"
              onClick={resetFilters}
              className="inline-flex h-9 items-center justify-center gap-2 rounded-lg bg-[#e2233d] px-4 text-xs font-bold text-white transition hover:bg-[#c91f35]"
            >
              <FaTimes size={11} />
              Reset Filter
            </button>
          </div>

         
        </div>

        {/* Table */}
        <div className="overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-slate-100">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[880px] text-left">
              <thead>
                <tr className="bg-[#16458f] text-white">
                  <TableHead>Student</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Phone</TableHead>
                  <TableHead>Course</TableHead>
                  <TableHead>Progress</TableHead>
                  <TableHead>Status</TableHead>
                </tr>
              </thead>

              <tbody className="divide-y divide-slate-100">
                {filteredStudents.length > 0 ? (
                  filteredStudents.map((student, index) => (
                    <tr key={index} className="transition hover:bg-[#f8fafc]">
                      <TableData>
                        <div className="flex items-center gap-3">
                          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#16458f] text-xs font-black text-white">
                            {student.name.charAt(0)}
                          </div>

                          <span className="font-bold text-slate-800">
                            {student.name}
                          </span>
                        </div>
                      </TableData>

                      <TableData>{student.email}</TableData>
                      <TableData>{student.phone}</TableData>
                      <TableData>{student.course}</TableData>

                      <TableData>
                        <div className="flex min-w-[135px] items-center gap-3">
                          <div className="h-2 w-24 overflow-hidden rounded-full bg-slate-200">
                            <div
                              className="h-full rounded-full bg-[#16458f]"
                              style={{ width: `${student.progress}%` }}
                            />
                          </div>

                          <span className="text-xs font-black text-[#16458f]">
                            {student.progress}%
                          </span>
                        </div>
                      </TableData>

                      <TableData>
                        <StatusBadge status={student.status} />
                      </TableData>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="6" className="px-4 py-10 text-center">
                      <h3 className="text-base font-bold text-slate-800">
                        No students found
                      </h3>
                      <p className="mt-1 text-sm text-slate-500">
                        Try changing your search filters.
                      </p>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </main>
  );
}

function TableHead({ children }) {
  return (
    <th className="whitespace-nowrap px-4 py-3 text-xs font-extrabold uppercase tracking-wide">
      {children}
    </th>
  );
}

function TableData({ children }) {
  return (
    <td className="whitespace-nowrap px-4 py-3 text-sm font-medium text-slate-600">
      {children}
    </td>
  );
}

function StatusBadge({ status }) {
  const statusClass =
    status === "Active"
      ? "bg-emerald-50 text-emerald-700 ring-emerald-100"
      : status === "Completed"
        ? "bg-blue-50 text-[#16458f] ring-blue-100"
        : "bg-amber-50 text-amber-700 ring-amber-100";

  return (
    <span
      className={`inline-flex rounded-full px-3 py-1 text-xs font-bold ring-1 ${statusClass}`}
    >
      {status}
    </span>
  );
}
