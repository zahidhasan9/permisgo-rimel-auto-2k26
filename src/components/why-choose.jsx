import Image from "next/image";

import indicate1 from "../../public/image/indicate1.png";
import indicate2 from "../../public/image/indicate2.png";
import indicate3 from "../../public/image/indicate3.png";
import indicate4 from "../../public/image/indicate4.png";

const chooseItems = [
  {
    img: indicate1,
    title: "Moniteur diplômé",
  },
  {
    img: indicate2,
    title: "+ 500 d’élève réussites",
  },
  {
    img: indicate3,
    title: "Certifié Qualiopi",
  },
  {
    img: indicate4,
    title: "Écoles de conduite labellisées",
  },
];

const WhyChoose = () => {
  return (
    <section className="bg-white py-10 sm:py-12 lg:py-14">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <div className="text-center">
          <h2 className="text-2xl font-black tracking-tight text-blue-900 sm:text-3xl lg:text-4xl">
            Why Choose <span className="text-orange-500">PermisGo?</span>
          </h2>

          <p className="mx-auto mt-2 max-w-xl text-sm font-medium leading-6 text-slate-600">
            Learn with trusted instructors and a reliable driving school system.
          </p>
        </div>

        {/* Cards */}
        <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {chooseItems.map((item, index) => (
            <div
              key={index}
              className="group rounded-2xl border border-slate-100 bg-white p-5 text-center shadow-sm ring-1 ring-slate-50 transition duration-300 hover:-translate-y-1 hover:border-blue-100 hover:shadow-xl"
            >
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-50 transition duration-300 group-hover:bg-blue-100">
                <Image
                  src={item.img}
                  alt={item.title}
                  sizes="64px"
                  className="h-auto w-10 object-contain"
                />
              </div>

              <h5 className="mt-4 text-sm font-black leading-5 text-blue-900 sm:text-base">
                {item.title}
              </h5>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChoose;
