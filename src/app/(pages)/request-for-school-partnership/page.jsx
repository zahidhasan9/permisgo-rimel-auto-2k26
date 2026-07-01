import Image from "next/image";
import Link from "next/link";

// Images
import requestHero from "../../../../public/image/request-hero.png";
import request2_1 from "../../../../public/image/request2-1.png";
import request2_2 from "../../../../public/image/request2-2.png";
import trustpilot from "../../../../public/image/trustpilot-Logo.png";

// Icons
import { FaStar, FaStarHalfAlt } from "react-icons/fa";

const benefits = [
  "Discounts on Driving Licence Packages",
  "Uncapped Earning Opportunities",
  "Competitions & Prize Draws",
  "Campus Tours with Goodies & Entertainment",
  "Partner program (Connect with partners that support student life)",
];

const RequestForSchoolPartner = () => {
  return (
    <>
      {/* Hero Section */}
      <section className="px-[50px] py-[50px] max-[900px]:px-[10px] max-[900px]:py-[30px]">
        <div className="w-full">
          <div className="grid grid-cols-1 items-center gap-8 md:grid-cols-2">
            <div>
              <h1 className="text-4xl font-semibold leading-tight text-slate-950 md:text-5xl">
                Grow Your Driving School with PermisGo
              </h1>

              <p className="mt-4 text-[18px] leading-relaxed text-slate-700">
                Join a network of 300+ partner schools across France and unlock
                powerful tools, increased visibility, and exclusive benefits to
                scale your business.
              </p>

              <Link
                href="#"
                className="mt-[20px] inline-block rounded-md bg-[#bb1e2f] px-6 py-3 text-lg font-semibold text-white transition duration-300 hover:bg-[#20ba2b]"
              >
                Apply for Partnership
              </Link>
            </div>

            <div className="max-[500px]:mt-[15px]">
              <Image
                src={requestHero}
                alt="Driving school partnership with PermisGo"
                priority
                sizes="(max-width: 768px) 100vw, 50vw"
                className="h-auto w-full"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Partnership Benefits Section */}
      <section className="bg-white px-[50px] py-[50px] max-[900px]:px-0 max-[900px]:py-[30px]">
        <div className="w-full">
          <div className="text-center">
            <h2 className="mb-[20px] text-[40px] font-semibold leading-tight text-slate-950 max-[500px]:text-[30px]">
              A partnership for your school ?
            </h2>
          </div>

          <div className="grid grid-cols-1 items-end gap-6 lg:grid-cols-12">
            <div className="lg:col-span-2 max-[900px]:hidden">
              <Image
                src={request2_1}
                alt="Partnership benefit illustration"
                sizes="120px"
                className="h-auto w-[120px]"
              />
            </div>

            <div className="lg:col-span-8">
              <div className="rounded-[15px] bg-[#023389] p-[30px] max-[500px]:p-[10px]">
                <div className="text-center">
                  <h4 className="mb-[20px] text-2xl font-semibold text-white">
                    Exclusive Benefits
                  </h4>

                  <ul>
                    {benefits.map((benefit, index) => (
                      <li
                        key={index}
                        className="m-[20px] skew-x-[-8deg] rounded-[5px] bg-white px-0 py-[10px] text-[20px] font-semibold text-slate-950 max-[500px]:p-[10px]"
                      >
                        <div className="skew-x-[8deg]">{benefit}</div>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            <div className="lg:col-span-2 max-[900px]:hidden">
              <Image
                src={request2_2}
                alt="Partnership benefit illustration"
                sizes="150px"
                className="h-auto w-[150px]"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Partnership Form Section */}
      <section className="bg-[#f1f1f1] px-[50px] py-[50px] max-[900px]:px-0 max-[900px]:py-[30px]">
        <div className="w-full">
          <div className="text-center">
            <h2 className="text-[40px] font-semibold leading-tight text-slate-950 max-[500px]:text-[30px]">
              Request for School Partnership
            </h2>

            <p className="mt-2 text-[18px] text-slate-700">
              Fill out this form with necessary information
            </p>
          </div>

          <div className="mx-auto mt-6 max-w-[960px] px-4">
            <div className="rounded-[10px] bg-white p-[30px] shadow-sm max-[500px]:p-5">
              <h4 className="text-2xl font-semibold text-slate-950">
                School Information
              </h4>

              <div className="mt-3">
                <form>
                  <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
                    <div>
                      <label className="mb-2 block font-medium text-slate-800">
                        School Name
                      </label>
                      <input
                        type="text"
                        placeholder="Write name here"
                        className="w-full rounded-md border border-slate-300 bg-white px-4 py-3 text-lg text-slate-900 outline-none transition duration-300 placeholder:text-slate-400 focus:border-[#023389]"
                      />
                    </div>

                    <div>
                      <label className="mb-2 block font-medium text-slate-800">
                        Type of School
                      </label>
                      <select className="w-full rounded-md border border-slate-300 bg-white px-4 py-3 text-lg text-slate-900 outline-none transition duration-300 focus:border-[#023389]">
                        <option value="">-- Select School --</option>
                      </select>
                    </div>

                    <div>
                      <label className="mb-2 block font-medium text-slate-800">
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        placeholder="Write name here"
                        className="w-full rounded-md border border-slate-300 bg-white px-4 py-3 text-lg text-slate-900 outline-none transition duration-300 placeholder:text-slate-400 focus:border-[#023389]"
                      />
                    </div>

                    <div>
                      <label className="mb-2 block font-medium text-slate-800">
                        Email Address
                      </label>
                      <input
                        type="email"
                        placeholder="Write name here"
                        className="w-full rounded-md border border-slate-300 bg-white px-4 py-3 text-lg text-slate-900 outline-none transition duration-300 placeholder:text-slate-400 focus:border-[#023389]"
                      />
                    </div>

                    <div>
                      <label className="mb-2 block font-medium text-slate-800">
                        City
                      </label>
                      <input
                        type="text"
                        placeholder="Write name here"
                        className="w-full rounded-md border border-slate-300 bg-white px-4 py-3 text-lg text-slate-900 outline-none transition duration-300 placeholder:text-slate-400 focus:border-[#023389]"
                      />
                    </div>

                    <div>
                      <label className="mb-2 block font-medium text-slate-800">
                        Address
                      </label>
                      <input
                        type="text"
                        placeholder="Write name here"
                        className="w-full rounded-md border border-slate-300 bg-white px-4 py-3 text-lg text-slate-900 outline-none transition duration-300 placeholder:text-slate-400 focus:border-[#023389]"
                      />
                    </div>

                    <div>
                      <label className="mb-2 block font-medium text-slate-800">
                        Number of Students
                      </label>
                      <select className="w-full rounded-md border border-slate-300 bg-white px-4 py-3 text-lg text-slate-900 outline-none transition duration-300 focus:border-[#023389]">
                        <option value="">-- Select Student Number --</option>
                      </select>
                    </div>

                    <div>
                      <label className="mb-2 block font-medium text-slate-800">
                        Type of Association
                      </label>
                      <select className="w-full rounded-md border border-slate-300 bg-white px-4 py-3 text-lg text-slate-900 outline-none transition duration-300 focus:border-[#023389]">
                        <option value="">-- Select Association --</option>
                      </select>
                    </div>

                    <div className="lg:col-span-2">
                      <p className="mb-3 text-[18px] text-slate-800">
                        Is there another driving school on your campus?
                      </p>

                      <div className="flex flex-wrap gap-6">
                        <label
                          htmlFor="campus-school-yes"
                          className="inline-flex items-center gap-2 text-slate-800"
                        >
                          <input
                            id="campus-school-yes"
                            type="checkbox"
                            value="yes"
                            defaultChecked
                            className="h-4 w-4 accent-[#bb1e2f]"
                          />
                          Yes
                        </label>

                        <label
                          htmlFor="campus-school-no"
                          className="inline-flex items-center gap-2 text-slate-800"
                        >
                          <input
                            id="campus-school-no"
                            type="checkbox"
                            value="no"
                            className="h-4 w-4 accent-[#bb1e2f]"
                          />
                          No
                        </label>
                      </div>
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="mt-4 rounded-md bg-[#bb1e2f] px-6 py-3 text-lg font-medium text-white transition duration-300 hover:bg-[#023389]"
                  >
                    Submit
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Video & Trustpilot Section */}
      <section className="px-[50px] py-[50px] max-[900px]:px-0 max-[900px]:py-[30px]">
        <div className="w-full">
          <div className="text-center">
            <h2 className="mb-[30px] text-[40px] font-semibold leading-tight text-slate-950 max-[500px]:text-[30px]">
              The students&apos; favorite driving school!
            </h2>
          </div>

          <div className="grid grid-cols-1 items-center gap-8 md:grid-cols-12">
            <div className="md:col-span-7">
              <iframe
                width="100%"
                height="500"
                className="rounded-2xl"
                src="https://www.youtube.com/embed/v3YLlDYHpXg?si=BSV3elC2FONWf7_F"
                title="YouTube video player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
              ></iframe>
            </div>

            <div className="md:col-span-5">
              <h4 className="mb-4 text-2xl font-semibold text-slate-950 max-[500px]:mt-[15px]">
                Our partners recommend us!
              </h4>

              <div className="rounded-[20px] bg-[#f1f1f1] p-[20px] outline outline-4 outline-[#d6e5ff]">
                <div className="text-center">
                  <h3 className="text-2xl font-semibold text-slate-950">
                    Trustpilot Ratings
                  </h3>

                  <Image
                    src={trustpilot}
                    alt="Trustpilot logo"
                    sizes="170px"
                    className="mx-auto mt-4 h-auto w-[170px]"
                  />

                  <ul className="mt-4 flex items-center justify-center gap-[20px] text-[#ffc400]">
                    <li>
                      <FaStar />
                    </li>
                    <li>
                      <FaStar />
                    </li>
                    <li>
                      <FaStar />
                    </li>
                    <li>
                      <FaStar />
                    </li>
                    <li>
                      <FaStarHalfAlt />
                    </li>
                  </ul>

                  <p className="mb-0 mt-3 text-[18px] text-slate-700">
                    04 out of 05
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="bg-[#023389] px-[50px] py-[50px] max-[900px]:px-[10px] max-[900px]:py-[30px]">
        <div className="w-full">
          <div className="rounded-[15px] bg-[#023389] py-[50px]">
            <div className="text-center">
              <h3 className="text-[40px] font-semibold leading-tight text-white max-[900px]:text-[30px]">
                Start Your Driving Journey Today
              </h3>

              <Link
                className="mt-[20px] inline-block rounded-md bg-[#bb1e2f] px-6 py-3 text-lg font-semibold text-white transition duration-300 hover:bg-[#20ba2b]"
                href="/login-to-my-partner-area"
              >
                Apply for Partnership
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default RequestForSchoolPartner;
