import Link from "next/link";

const inputClass =
  "h-[46px] w-full rounded-[10px] border border-[#bdcde4] bg-[#f7f9fc] px-4 !text-[15px] text-[#222] outline-none transition placeholder:!text-[14px] placeholder:text-[#999da3] focus:border-[#174a9b] focus:ring-2 focus:ring-[#174a9b]/10";

export default function LoginPartnerPage() {
  return (
    <main className="overflow-hidden bg-white text-[#202124]">
      <section className="bg-[#174a9b] px-5 py-14 text-white sm:px-8 lg:py-[54px]">
        <div className="mx-auto max-w-[1040px] text-center">
          <h1 className="text-[35px] font-bold leading-tight tracking-[-0.025em] sm:text-[41px] lg:text-[44px]">
            Manage Your Partnership with PermisGo
          </h1>
          <p className="mx-auto mt-5 max-w-[800px] !text-[17px] leading-7 text-white/90">
            Log in to your PermisGo partner account to manage your school, track performance,
            <br className="hidden md:block" /> and access exclusive tools and benefits.
          </p>
        </div>
      </section>

      <section className="flex min-h-[780px] items-start justify-center bg-white px-5 pb-10 pt-20 sm:px-8">
        <div className="flex min-h-[600px] w-full max-w-[630px] items-center justify-center rounded-[12px] bg-[#e7edf6] p-5 sm:p-10 lg:p-[78px]">
          <div className="w-full rounded-[12px] bg-white px-5 py-8 shadow-sm sm:px-7 lg:px-[30px] lg:py-[34px]">
            <h2 className="text-[22px] font-bold text-[#262626]">Get to see you again</h2>

            <form className="mt-7">
              <div className="grid grid-cols-[minmax(0,1fr)] gap-5 sm:grid-cols-2">
                <label className="block">
                  <span className="mb-3 block !text-[14px] font-semibold text-[#2f3134]">
                    Email address
                  </span>
                  <input
                    type="email"
                    name="email"
                    autoComplete="email"
                    placeholder="Write Email address"
                    className={inputClass}
                  />
                </label>

                <label className="block">
                  <span className="mb-3 block !text-[14px] font-semibold text-[#2f3134]">
                    Password
                  </span>
                  <input
                    type="password"
                    name="password"
                    autoComplete="current-password"
                    placeholder="Write phone number"
                    className={inputClass}
                  />
                </label>
              </div>

              <button
                type="button"
                className="mt-5 min-h-[48px] w-full rounded-[9px] bg-[#e4213c] px-6 !text-[17px] font-semibold text-white transition duration-300 hover:-translate-y-0.5 hover:bg-[#174a9b] hover:shadow-lg"
              >
                Log in
              </button>
            </form>

            <div className="mt-7 text-center">
              <Link
                href="/forget-password"
                className="inline-block border-b border-[#b9c7dd] px-5 pb-2 !text-[16px] font-medium text-[#174a9b] transition duration-300 hover:border-[#e4213c] hover:text-[#e4213c]"
              >
                Forgot Your Password?
              </Link>
            </div>

            <div className="mt-7 text-center">
              <p className="!text-[16px] text-[#35383c]">You don&apos;t have an account?</p>
              <Link
                href="/register"
                className="mt-6 inline-flex min-h-[48px] items-center justify-center rounded-[9px] border-2 border-[#174a9b] px-7 !text-[16px] font-semibold text-[#174a9b] transition duration-300 hover:-translate-y-0.5 hover:bg-[#174a9b] hover:text-white hover:shadow-lg"
              >
                Create My Account
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
