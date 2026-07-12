"use client";

import { useState } from "react";

import Dashboard from "@/components/teacher-dashboard/Dashboard";
import Location from "@/components/teacher-dashboard/Location";
import PersonalInfo from "@/components/teacher-dashboard/PersonalInfo";
import Vehicles from "@/components/teacher-dashboard/Vehicles";
import Sidebar from "@/components/teacher-dashboard/sidebar";

import Account from "@/components/teacher-dashboard/Account";
import Calendar from "@/components/teacher-dashboard/Calendar";
import Exams from "@/components/teacher-dashboard/Exams";
import Lessons from "@/components/teacher-dashboard/Lessons";
import MyDocument from "@/components/teacher-dashboard/MyDocument";
import MyReferences from "@/components/teacher-dashboard/MyReferences";
import Offers from "@/components/teacher-dashboard/Offers";
import ResetPassword from "@/components/teacher-dashboard/ResetPassword";
import Students from "@/components/teacher-dashboard/Students";
import Profile from "@/components/teacher-dashboard/profile";

export default function TeacherDashboardPage() {
  const [activeTab, setActiveTab] = useState("dashboard");

  const tabComponents = {
    dashboard: <Dashboard />,
    personal: <PersonalInfo />,
    vehicles: <Vehicles />,
    location: <Location />,
    lessons: <Lessons />,
    calendar: <Calendar />,
    students: <Students />,
    exams: <Exams />,
    account: <Account />,
    references: <MyReferences />,
    offers: <Offers />,

    // Sub menu
    profile: <Profile />,
    "my-document": <MyDocument />,
    "reset-password": <ResetPassword />,
  };

  // return (
  //   <div className="flex min-h-screen w-full max-w-full bg-white max-md:flex-col">
  //     {/* Sidebar */}
  //     <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />

  //     {/* Main Content */}
  //     <main className="min-w-0 flex-1 overflow-x-hidden bg-white px-3 py-4 sm:px-5 md:px-5 lg:px-6 lg:py-6">
  //       <div className="w-full max-w-full min-w-0">
  //         {tabComponents[activeTab] || <Dashboard />}
  //       </div>
  //     </main>
  //   </div>
  // );

  return (
    <div className="flex min-h-screen w-full max-w-full bg-white max-md:flex-col">
      {/* <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} /> */}

      <main className="min-w-0 flex-1 overflow-x-hidden bg-white px-3 py-4 sm:px-5 lg:px-6">
        {tabComponents[activeTab] || <Dashboard />}
      </main>
    </div>
  );
}
