import Image from "next/image";
import Link from "next/link";

// Image
import DriveImage from "../../../../public/image/car-driver.jpg";

// Icons
import {
  FaInstagram,
  FaLinkedin,
  FaPhoneSquareAlt,
  FaPinterestSquare,
  FaRegCheckCircle,
  FaYoutube,
} from "react-icons/fa";
import { FaFacebook } from "react-icons/fa6";
import { FiUsers } from "react-icons/fi";
import { GrLocation } from "react-icons/gr";
import { IoBookOutline } from "react-icons/io5";
import { LuPhoneCall } from "react-icons/lu";
import { MdOutlineEmail } from "react-icons/md";
import { TbTargetArrow } from "react-icons/tb";

// Components
import WhyChoose from "@/components/why-choose";

const AboutUs = () => {
  return (
    <>
      {/* Hero Section */}
      <section className="px-[50px] py-[50px] max-[900px]:px-[10px] max-[900px]:py-[30px]">
        <div className="w-full">
          <div className="grid grid-cols-1 items-center gap-8 md:grid-cols-12">
            <div className="md:col-span-5">
              <h1 className="mb-[20px] text-[50px] font-bold leading-tight text-slate-950 max-[500px]:text-[40px]">
                Who{" "}
                <span className="bg-gradient-to-br from-[#023389] to-[#bb1e2f] bg-clip-text text-transparent">
                  are we?
                </span>
              </h1>

              <h4 className="mb-4 text-2xl font-semibold leading-snug text-slate-900">
                Permis Go is a driving school that connects candidates with
                state-certified driving instructors .
              </h4>

              <p className="text-[18px] leading-relaxed text-slate-700">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Ducimus
                quisquam voluptas doloremque pariatur voluptatibus. Distinctio
                sit blanditiis eius odit illo itaque, ratione, laudantium est
                sunt perspiciatis ullam corrupti, in sint.
              </p>

              <div className="mt-4">
                <Link
                  href="#"
                  className="inline-flex items-center gap-2 rounded-md bg-[#bb1e2f] px-6 py-3 text-lg font-semibold text-white transition duration-300 hover:bg-[#20ba2b]"
                >
                  <LuPhoneCall />
                  <span>|</span>
                  Book Your First Lesson
                </Link>
              </div>
            </div>

            <div className="md:col-span-7">
              <iframe
                width="100%"
                height="450"
                src="https://www.youtube.com/embed/PntTra6wJPE?si=o0SjX9qifWio2_fP"
                title="YouTube video player"
                className="rounded max-[500px]:mt-[20px]"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
              ></iframe>
            </div>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="px-[50px] py-[50px] max-[900px]:px-[10px] max-[900px]:py-[30px]">
        <div className="w-full">
          <div className="rounded-[10px] bg-[#ffdadd] p-[40px] max-[500px]:p-[25px]">
            <h3 className="mb-[15px] flex items-center gap-2 text-[35px] font-bold leading-tight text-slate-950 max-[500px]:text-[30px]">
              <TbTargetArrow />
              Our{" "}
              <span className="bg-gradient-to-br from-[#023389] to-[#bb1e2f] bg-clip-text text-transparent">
                Mission
              </span>
            </h3>

            <p className="mb-0 text-[18px] leading-relaxed text-slate-700">
              Our goal is to offer you quality training, tailored to your pace
              and needs. Whether you&apos;re a beginner or looking to improve
              your skills, we do everything we can to help you obtain your
              license with confidence.
            </p>
          </div>
        </div>
      </section>

      {/* Expert Mentor Programme */}
      <section className="px-[50px] py-[50px] max-[900px]:px-[10px] max-[900px]:py-[30px]">
        <div className="w-full">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {/* Mentor Box */}
            <div className="h-[400px] overflow-y-scroll rounded-[10px] bg-[#d9ffdc] p-[40px] max-[500px]:mb-[20px] max-[500px]:p-[25px]">
              <h3 className="mb-[15px] flex items-center gap-2 text-[35px] font-bold leading-tight text-slate-950 max-[500px]:text-[30px]">
                <FiUsers />
                Expert{" "}
                <span className="bg-gradient-to-br from-[#023389] to-[#bb1e2f] bg-clip-text text-transparent">
                  Monitors
                </span>
              </h3>

              <p className="mb-0 text-[18px] leading-relaxed text-slate-700">
                Our goal is to offer you quality training, tailored to your pace
                and needs. Whether you&apos;re a beginner or looking to improve
                your skills, we do everything we can to help you obtain your
                license with confidence.
              </p>

              <Image
                src={DriveImage}
                alt="Driving instructor with student"
                sizes="(max-width: 768px) 100vw, 50vw"
                className="mt-[20px] h-auto w-full rounded-[10px]"
              />
            </div>

            {/* Programme Box */}
            <div className="h-[400px] overflow-y-scroll rounded-[10px] bg-[#d6e5ff] p-[40px] max-[500px]:mb-[20px] max-[500px]:p-[25px]">
              <h3 className="mb-[15px] flex items-center gap-2 text-[35px] font-bold leading-tight text-slate-950 max-[500px]:text-[30px]">
                <IoBookOutline />
                Our{" "}
                <span className="bg-gradient-to-br from-[#023389] to-[#bb1e2f] bg-clip-text text-transparent">
                  Programs
                </span>
              </h3>

              <h4 className="text-xl font-semibold text-slate-900">
                We offer different packages to meet all needs:
              </h4>

              <div className="mt-4">
                <ul>
                  {[
                    "Category B driving licence (standard and accelerated)",
                    "Supervised driving (AAC)",
                    "Supervised driving",
                    "Highway Code in person and online",
                    "Advanced training courses",
                    "Supervised driving",
                    "Supervised driving (AAC)",
                  ].map((item, index) => (
                    <li
                      key={index}
                      className="flex items-start gap-2 pb-[15px] text-[18px] leading-relaxed text-slate-700"
                    >
                      <FaRegCheckCircle className="mt-1 shrink-0 text-[#bb1e2f]" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      <WhyChoose />

      {/* Adventure Section */}
      <section className="px-[50px] py-[50px] max-[900px]:px-0 max-[900px]:py-[30px]">
        <div className="w-full">
          <div className="mb-[50px] rounded-[20px] bg-[#bb1e2f] p-[50px] max-[900px]:p-[30px_10px]">
            <div className="pb-4 text-center">
              <h3 className="text-[40px] font-bold leading-tight text-white max-[500px]:text-[30px]">
                Ready to begin your driving adventure?
              </h3>

              <hr className="mt-4 border-white" />
            </div>

            <div className="mx-auto w-full max-w-[1140px]">
              <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-2">
                {/* Contact Info */}
                <div>
                  <ul>
                    <li className="mb-[10px] rounded-[5px] bg-white/20 p-[15px] text-[18px] text-white backdrop-blur-md transition duration-500 ease-in-out hover:translate-x-[10px] hover:bg-[#20ba2b]">
                      <p className="mb-0 flex items-center gap-2">
                        <GrLocation />
                        <span>|</span>
                        100 Rue Danielle Casanova 93300 Aubervilliers, France
                      </p>
                    </li>

                    <li className="mb-[10px] rounded-[5px] bg-white/20 p-[15px] text-[18px] text-white backdrop-blur-md transition duration-500 ease-in-out hover:translate-x-[10px] hover:bg-[#20ba2b]">
                      <p className="mb-0 flex items-center gap-2">
                        <FaPhoneSquareAlt />
                        <span>|</span>
                        09 56 73 63 33
                      </p>
                    </li>

                    <li className="mb-[10px] rounded-[5px] bg-white/20 p-[15px] text-[18px] text-white backdrop-blur-md transition duration-500 ease-in-out hover:translate-x-[10px] hover:bg-[#20ba2b]">
                      <p className="mb-0 flex items-center gap-2">
                        <MdOutlineEmail />
                        <span>|</span>
                        permisgo.fr@gmail.com
                      </p>
                    </li>
                  </ul>
                </div>

                {/* Button + Social */}
                <div>
                  <div className="text-center">
                    <Link
                      href="#"
                      className="mb-[15px] inline-block rounded-md bg-white px-6 py-3 text-lg font-semibold text-[#023389] transition duration-500 ease-in-out hover:-translate-y-[5px] hover:bg-[#20ba2b] hover:text-white max-[900px]:mt-[20px]"
                    >
                      Book Your First Lesson
                    </Link>

                    <div>
                      <ul className="flex items-center justify-center gap-5">
                        <li>
                          <Link
                            href="#"
                            className="text-[20px] text-white transition duration-300 hover:text-[#d6e5ff]"
                          >
                            <FaFacebook />
                          </Link>
                        </li>
                        <li>
                          <Link
                            href="#"
                            className="text-[20px] text-white transition duration-300 hover:text-[#d6e5ff]"
                          >
                            <FaInstagram />
                          </Link>
                        </li>
                        <li>
                          <Link
                            href="#"
                            className="text-[20px] text-white transition duration-300 hover:text-[#d6e5ff]"
                          >
                            <FaLinkedin />
                          </Link>
                        </li>
                        <li>
                          <Link
                            href="#"
                            className="text-[20px] text-white transition duration-300 hover:text-[#d6e5ff]"
                          >
                            <FaPinterestSquare />
                          </Link>
                        </li>
                        <li>
                          <Link
                            href="#"
                            className="text-[20px] text-white transition duration-300 hover:text-[#d6e5ff]"
                          >
                            <FaYoutube />
                          </Link>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default AboutUs;
