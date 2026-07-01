import Image from "next/image";
import Link from "next/link";

// Images
import helpFirst from "../../../../public/image/help-first.png";
import helpSecond1 from "../../../../public/image/help-second1.png";
import helpSecond2 from "../../../../public/image/help-second2.png";
import helpSecond3 from "../../../../public/image/help-second3.png";
import helpThird1 from "../../../../public/image/help-third1.png";
import helpThird2 from "../../../../public/image/help-third2.png";

// Icons
import { IoChatbubbleEllipsesOutline } from "react-icons/io5";

const drivingTips = [
  {
    id: 1,
    image: helpSecond1,
    title: "Discover By Car Permisgo",
    description:
      "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Impedit quidem totam autem molestias, corporis, excepturi officiis nisi tempore atque animi eum natus cupiditate laudantium, quibusdam ad error maiores esse. Nostrum.",
  },
  {
    id: 2,
    image: helpSecond2,
    title: "My Driving School File",
    description:
      "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Impedit quidem totam autem molestias, corporis, excepturi officiis nisi tempore atque animi eum natus cupiditate laudantium, quibusdam ad error maiores esse. Nostrum.",
  },
  {
    id: 3,
    image: helpSecond3,
    title: "Payments & Lesson Credit",
    description:
      "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Impedit quidem totam autem molestias, corporis, excepturi officiis nisi tempore atque animi eum natus cupiditate laudantium, quibusdam ad error maiores esse. Nostrum.",
  },
];

const Helps = () => {
  return (
    <>
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-blue-950 to-[#00215a] px-[50px] py-[50px] max-[900px]:px-[10px] max-[900px]:py-[30px]">
        <div className="w-full">
          <div className="rounded-[20px]">
            <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-2">
              <div>
                <h1 className="mb-[25px] text-[50px] font-bold leading-tight text-white max-[500px]:text-[35px]">
                  Need help? We're here to help!
                </h1>

                <h5 className="text-[30px] font-medium leading-snug text-white max-[500px]:text-[20px]">
                  Ask us all your questions about driving lessons, exams or
                  licenses!
                </h5>

                <div className="mt-5">
                  <input
                    type="text"
                    placeholder="🔎 Search...."
                    className="w-full rounded-md border border-gray-200 bg-white px-4 py-3 text-lg text-gray-900 outline-none transition duration-300 placeholder:text-gray-400 focus:border-orange-500 focus:ring-4 focus:ring-orange-500/20"
                  />
                </div>
              </div>

              <div className="text-right max-[900px]:hidden">
                <Image
                  src={helpFirst}
                  alt="Driving help support illustration"
                  width={600}
                  height={400}
                  priority
                  sizes="(max-width: 900px) 0px, 50vw"
                  className="ml-auto h-auto w-full max-w-[600px]"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Latest Driving Tips */}
      <section className="px-[50px] py-[50px] max-[900px]:px-[10px] max-[900px]:py-[30px]">
        <div className="w-full">
          <div className="text-center">
            <h2 className="text-[40px] font-bold leading-tight text-gray-900 max-[500px]:text-[30px]">
              Latest driving tips
            </h2>

            <p className="mt-2 text-base text-gray-600">
              Newly updated resources for students
            </p>
          </div>

          <div className="mt-4">
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
              {drivingTips.map((tip) => (
                <div
                  key={tip.id}
                  className="rounded-[10px] border-[3px] border-blue-200 p-[30px] text-center max-[900px]:mt-[15px]"
                >
                  <Image
                    src={tip.image}
                    alt={tip.title}
                    width={120}
                    height={120}
                    sizes="120px"
                    className="mx-auto mb-[20px] h-auto w-[120px]"
                  />

                  <h3 className="mb-[20px] text-[30px] font-bold leading-tight text-blue-950">
                    {tip.title}
                  </h3>

                  <p className="h-[130px] overflow-y-scroll text-base leading-relaxed text-gray-600">
                    {tip.description}
                  </p>

                  <div className="mt-4">
                    <Link
                      href="#"
                      className="inline-block w-full rounded-md bg-orange-500 px-5 py-3 font-semibold text-white transition duration-300 hover:bg-orange-600"
                    >
                      Read more
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Support CTA */}
      <section className="px-[50px] py-[50px] max-[900px]:px-[10px] max-[900px]:py-[30px]">
        <div className="w-full">
          <div className="relative overflow-hidden rounded-[20px] bg-blue-950 px-[50px] py-[100px] max-[900px]:px-0 max-[900px]:py-[50px] max-[500px]:px-[10px]">
            <Image
              src={helpThird1}
              alt="Decorative support shape"
              width={150}
              height={150}
              sizes="150px"
              className="absolute left-[-5px] top-0 h-auto w-[150px] rounded-[15px] max-[900px]:hidden"
            />

            <Image
              src={helpThird2}
              alt="Decorative support shape"
              width={150}
              height={150}
              sizes="150px"
              className="absolute bottom-[-5px] right-[-15px] h-auto w-[150px] rounded-[15px] max-[900px]:hidden"
            />

            <div className="relative text-center">
              <h3 className="text-[40px] font-bold leading-tight text-white max-[500px]:text-[30px]">
                Do you still have any questions ?
              </h3>

              <p className="mt-3 text-base text-white">
                Our friendly team is here to help you pass your driving test!
              </p>

              <div className="mt-5">
                <Link
                  href="/contact-us"
                  className="inline-flex items-center justify-center gap-2 rounded-md bg-white px-6 py-3 text-lg font-semibold text-orange-500 transition duration-300 hover:bg-orange-500 hover:text-white"
                >
                  <IoChatbubbleEllipsesOutline className="text-2xl" />
                  Chat with support
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Helps;
