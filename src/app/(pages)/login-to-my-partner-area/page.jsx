import Link from "next/link";

const LoginPartner = () => {
  return (
    <>
      {/* Hero Section */}
      <section className="py-[50px] max-[500px]:py-[30px]">
        <div className="mx-auto w-full max-w-[1140px] px-4">
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="text-[50px] font-bold leading-tight text-blue-950 max-[500px]:text-[35px]">
              Manage Your Partnership with PermisGo
            </h1>

            <p className="mt-4 text-base leading-relaxed text-slate-600 md:text-lg">
              Log in to your PermisGo partner account to manage your school,
              track performance, and access exclusive tools and benefits.
            </p>
          </div>
        </div>
      </section>

      {/* Login Form Section */}
      <section className="pb-[50px] max-[500px]:pb-[30px]">
        <div className="mx-auto w-full max-w-[1140px] px-4">
          <div className="mx-auto max-w-[760px]">
            <div className="rounded-2xl border border-blue-100 bg-blue-50 p-4 shadow-lg shadow-slate-200/70">
              <div className="rounded-xl bg-white p-8 shadow-sm max-[500px]:p-5">
                <h4 className="mb-4 text-2xl font-bold text-blue-950">
                  Get to see you again
                </h4>

                <form>
                  <div className="mb-4">
                    <label
                      htmlFor="email"
                      className="mb-2 block text-sm font-semibold text-slate-800"
                    >
                      Email Address
                    </label>

                    <input
                      id="email"
                      type="email"
                      name="email"
                      placeholder="Enter your Email"
                      autoComplete="email"
                      className="w-full rounded-md border border-slate-300 bg-white px-4 py-3 text-base text-slate-900 outline-none transition duration-300 placeholder:text-slate-400 focus:border-orange-500 focus:ring-4 focus:ring-orange-500/20"
                    />
                  </div>

                  <div className="mb-4">
                    <label
                      htmlFor="password"
                      className="mb-2 block text-sm font-semibold text-slate-800"
                    >
                      Password
                    </label>

                    <input
                      id="password"
                      type="password"
                      name="password"
                      placeholder="Enter your password"
                      autoComplete="current-password"
                      className="w-full rounded-md border border-slate-300 bg-white px-4 py-3 text-base text-slate-900 outline-none transition duration-300 placeholder:text-slate-400 focus:border-orange-500 focus:ring-4 focus:ring-orange-500/20"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full rounded-md bg-orange-500 px-6 py-3 text-lg font-semibold text-white transition duration-300 hover:bg-blue-950"
                  >
                    Log In
                  </button>
                </form>

                <div className="py-4 text-center">
                  <Link
                    href="/forget-password"
                    className="font-semibold text-orange-500 transition duration-300 hover:text-blue-950"
                  >
                    Forgot Password?
                  </Link>
                </div>

                <div className="mt-3 text-center">
                  <p className="mb-3 text-slate-600">
                    You don’t have an account?
                  </p>

                  <Link
                    href="/admin-register"
                    className="inline-block rounded-md border border-slate-900 px-6 py-3 text-lg font-semibold text-slate-900 transition duration-300 hover:bg-slate-900 hover:text-white"
                  >
                    Create An Account
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default LoginPartner;
