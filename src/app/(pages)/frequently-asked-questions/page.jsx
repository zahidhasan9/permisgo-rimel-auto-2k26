"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { getFaqs } from "@/features/API";
import useCurrentLanguage from "@/hooks/useCurrentLanguage";
import useCmsPageContent from "@/hooks/useCmsPageContent";
import { FaChevronDown, FaWhatsappSquare } from "react-icons/fa";

const fallbackFaqs = [
  {
    id: 1,
    question: "Accordion Item #1",
    answer:
      "This is the first item's accordion body. It is shown by default, until the collapse plugin adds the appropriate classes that we use to style each element. These classes control the overall appearance, as well as the showing and hiding via CSS transitions.",
  },
  {
    id: 2,
    question: "Accordion Item #2",
    answer:
      "This is the second item's accordion body. It is hidden by default, until the collapse plugin adds the appropriate classes that we use to style each element. These classes control the overall appearance, as well as the showing and hiding via CSS transitions.",
  },
  {
    id: 3,
    question: "Accordion Item #3",
    answer:
      "This is the third item's accordion body. It is hidden by default, until the collapse plugin adds the appropriate classes that we use to style each element. These classes control the overall appearance, as well as the showing and hiding via CSS transitions.",
  },
  {
    id: 4,
    question: "Accordion Item #4",
    answer:
      "This is the fourth item's accordion body. It is hidden by default, until the collapse plugin adds the appropriate classes that we use to style each element. These classes control the overall appearance, as well as the showing and hiding via CSS transitions.",
  },
];

const Faq = () => {
  const language = useCurrentLanguage();
  const { content } = useCmsPageContent("frequently-asked-questions");
  const settings = content?.settings || {};
  const copy = (key, fallback) => settings[key]?.trim?.() || fallback;
  const [faqs, setFaqs] = useState(fallbackFaqs);
  const [activeFaq, setActiveFaq] = useState(1);

  useEffect(() => {
    if (!language) return;
    let active = true;
    getFaqs({ section: "general", lang: language }).then(({ data }) => {
      if (!active) return;
      const items = data?.data || [];
      if (items.length) {
        setFaqs(items);
        setActiveFaq(items[0]._id);
      }
    });
    return () => {
      active = false;
    };
  }, [language]);

  const toggleFaq = (id) => {
    setActiveFaq(activeFaq === id ? null : id);
  };

  return (
    <>
      <section className="py-[50px] max-[500px]:py-[30px]">
        <div className="mx-auto w-full max-w-[1140px] px-4">
          <div className="text-center">
            <h1 className="text-[50px] font-bold leading-tight text-blue-900 max-[500px]:text-[35px]">
              {copy("heroTitle", "Frequently Asked Questions")}
            </h1>

            <p className="mx-auto mt-4 max-w-3xl text-base leading-relaxed text-gray-600">
              {copy("heroDescription", "Find clear answers to common questions about lessons, exams, payments and your PermisGo account.")}
            </p>
          </div>
        </div>
      </section>

      <section className="pb-[50px] max-[500px]:py-[30px]">
        <div className="mx-auto w-full max-w-[1140px] px-4">
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
            <div className="lg:col-span-8">
              <div
                data-no-translate
                className="overflow-hidden space-y-2 rounded-md border border-gray-200"
              >
                {faqs.map((item, index) => (
                  <div
                    key={item._id || item.id}
                    className={`border-gray-200 bg-white ${
                      index !== faqs.length - 1 ? "border-b" : ""
                    }`}
                  >
                    <button
                      type="button"
                      onClick={() => toggleFaq(item._id || item.id)}
                      className={`flex w-full items-center justify-between px-5 py-4 text-left text-base font-medium transition duration-300 ${
                        activeFaq === (item._id || item.id)
                          ? "bg-white text-blue-900"
                          : "bg-blue-100 text-gray-900 "
                      }`}
                    >
                      <span>{item.question}</span>

                      <FaChevronDown
                        className={`text-lg transition duration-300 ${
                          activeFaq === (item._id || item.id)
                            ? "rotate-180"
                            : ""
                        }`}
                      />
                    </button>

                    <div
                      className={`grid transition-all duration-300 ease-in-out ${
                        activeFaq === (item._id || item.id)
                          ? "grid-rows-[1fr]"
                          : "grid-rows-[0fr]"
                      }`}
                    >
                      <div className="overflow-hidden">
                        <div className="px-5 py-4 text-base leading-relaxed text-gray-600">
                          <strong className="font-semibold text-gray-900">
                            {item.answer.split(".")[0]}.
                          </strong>{" "}
                          {item.answer.split(".").slice(1).join(".")}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="lg:col-span-4">
              <div className="rounded-[10px] border-[3px] border-blue-200 p-[30px]">
                <div className="text-center">
                  <h3 className="text-2xl font-bold leading-snug text-gray-900">
                    {copy("ctaTitle", "Do you have more questions?")}
                  </h3>

                  <p className="mt-3 text-base leading-relaxed text-gray-600">
                    {copy("sectionDescription", "Our friendly support team is ready to help with any question not answered here.")}
                  </p>

                  <div className="mt-4">
                    <Link
                      href="#"
                      className="inline-flex items-center justify-center gap-2 rounded-md bg-orange-500 px-6 py-3 text-lg font-semibold text-white transition duration-300 hover:bg-blue-900"
                    >
                      <FaWhatsappSquare className="text-2xl" />
                      +847 4545 4587
                    </Link>
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

export default Faq;
