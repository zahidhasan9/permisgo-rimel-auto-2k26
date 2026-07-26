"use client";

import Image from "next/image";
import Link from "next/link";

import Logo from "../../../../public/image/logo.png";
import StudentIcon from "../../../../public/image/student-login.png";
import TeacherIcon from "../../../../public/image/student.png";

const LoginRoleSelect = () => {
  return (
    <section className="min-h-[calc(100vh-64px)] bg-[#eef1f6] px-4 py-8 sm:px-6 sm:py-10 lg:py-12">
      <div className="mx-auto flex min-h-[calc(100vh-120px)] max-w-[920px] items-center justify-center">
        {/* Main Card */}
        <div className="w-full overflow-hidden rounded-[20px] bg-gradient-to-b from-[#0c3d8f] via-[#0d4598] to-[#0a3578] px-5 py-10 shadow-[0_20px_50px_rgba(13,69,152,0.35)] sm:px-10 sm:py-12 md:px-14 md:py-14">
          {/* Logo */}
          <div className="mb-8 flex justify-center sm:mb-10">
            <div className="rounded-xl  px-5 py-3 shadow-inner sm:px-6 sm:py-3.5">
              <Image
                src={Logo}
                alt="PermisGo Logo"
                priority
                className="h-auto w-[160px] object-contain sm:w-[180px] md:w-[200px]"
              />
            </div>
          </div>

          {/* Title */}
          <h1 className="mb-8 text-center text-[22px] font-semibold tracking-wide text-white sm:mb-10 sm:text-[24px] md:text-[26px]">
            Login as
          </h1>

          {/* Role Cards */}
          <div className="flex flex-col items-center justify-center gap-5 sm:flex-row sm:gap-6 md:gap-8">
            {/* Student Card */}
            <Link
              href="/login/student"
              className="group flex w-full max-w-[160px] flex-col items-center justify-center rounded-2xl border border-white/25 bg-white/5 px-5 py-6 transition-all duration-300 hover:-translate-y-1 hover:border-white/50 hover:bg-white/10 hover:shadow-lg sm:max-w-[170px] sm:px-6 sm:py-7"
            >
              <div className="mb-4 flex h-[90px] w-[90px] items-center justify-center sm:h-[100px] sm:w-[100px]">
                <Image
                  src={StudentIcon}
                  alt="Student"
                  className="h-full w-full object-contain"
                />
              </div>

              <span className="text-[16px] font-semibold text-white sm:text-[17px]">
                Student
              </span>
            </Link>

            {/* OR */}
            <span className="text-[15px] font-medium text-white/80 sm:text-[16px]">
              Or
            </span>

            {/* Teacher Card */}
            <Link
              href="/login/teacher"
              className="group flex w-full max-w-[160px] flex-col items-center justify-center rounded-2xl border border-white/25 bg-white/5 px-5 py-6 transition-all duration-300 hover:-translate-y-1 hover:border-white/50 hover:bg-white/10 hover:shadow-lg sm:max-w-[170px] sm:px-6 sm:py-7"
            >
              <div className="mb-4 flex h-[90px] w-[90px] items-center justify-center sm:h-[100px] sm:w-[100px]">
                <Image
                  src={TeacherIcon}
                  alt="Teacher"
                  className="h-full w-full object-contain"
                />
              </div>

              <span className="text-[16px] font-semibold text-white sm:text-[17px]">
                Teacher
              </span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LoginRoleSelect;
