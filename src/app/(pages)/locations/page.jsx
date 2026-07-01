"use client";

import {
  GoogleMap,
  InfoWindow,
  LoadScript,
  Marker,
} from "@react-google-maps/api";
import Link from "next/link";
import { useState } from "react";

// Icons
import { FaChevronDown, FaStar, FaStarHalfAlt } from "react-icons/fa";

const center = {
  lat: 48.856614,
  lng: 2.352221,
};

const locationsData = [
  {
    id: 1,
    name: "Dhaka City",
    description: "Capital of Bangladesh",
    lat: 48.862577,
    lng: 2.33162,
  },
  {
    id: 2,
    name: "Gulshan",
    description: "Business area in Dhaka",
    lat: 48.858488,
    lng: 2.353165,
  },
  {
    id: 3,
    name: "Dhanmondi",
    description: "Popular residential area",
    lat: 48.854004,
    lng: 2.347543,
  },
  {
    id: 4,
    name: "Place de la Bastille",
    description: "Popular residential area",
    lat: 48.85262,
    lng: 2.368776,
  },
  {
    id: 5,
    name: "Place de la Bastille",
    description: "Popular residential area",
    lat: 48.95262,
    lng: 2.268776,
  },
  {
    id: 6,
    name: "Place de la Bastille",
    description: "Popular residential area",
    lat: 48.94262,
    lng: 2.298776,
  },
  {
    id: 7,
    name: "Place de la Bastille",
    description: "Popular residential area",
    lat: 48.39262,
    lng: 2.298776,
  },
];

const reviews = [
  {
    id: 1,
    text: "Top-notch driving school! Everything went smoothly from start to finish...",
    author: "Guillaume B. on 05/02/2025",
  },
  {
    id: 2,
    text: "Top-notch driving school! Everything went smoothly from start to finish...",
    author: "Guillaume B. on 05/02/2025",
  },
  {
    id: 3,
    text: "Top-notch driving school! Everything went smoothly from start to finish...",
    author: "Guillaume B. on 05/02/2025",
  },
  {
    id: 4,
    text: "Top-notch driving school! Everything went smoothly from start to finish...",
    author: "Guillaume B. on 05/02/2025",
  },
];

const faqs = [
  {
    id: 1,
    question: "Accordion Item #1",
    answer:
      "This is the first item’s accordion body. It is shown by default, until the collapse plugin adds the appropriate classes that we use to style each element.",
  },
  {
    id: 2,
    question: "Accordion Item #2",
    answer:
      "This is the second item’s accordion body. It is hidden by default, until the collapse plugin adds the appropriate classes that we use to style each element.",
  },
  {
    id: 3,
    question: "Accordion Item #3",
    answer:
      "This is the third item’s accordion body. It is hidden by default, until the collapse plugin adds the appropriate classes that we use to style each element.",
  },
];

const RatingStars = ({ small = false }) => {
  return (
    <ul className="mt-3 flex items-center gap-2 text-yellow-400">
      <li className={small ? "text-base" : "text-[25px]"}>
        <FaStar />
      </li>
      <li className={small ? "text-base" : "text-[25px]"}>
        <FaStar />
      </li>
      <li className={small ? "text-base" : "text-[25px]"}>
        <FaStar />
      </li>
      <li className={small ? "text-base" : "text-[25px]"}>
        <FaStar />
      </li>
      <li className={small ? "text-base" : "text-[25px]"}>
        <FaStarHalfAlt />
      </li>
    </ul>
  );
};

const Locations = () => {
  const [activeMarker, setActiveMarker] = useState(null);
  const [activeFaq, setActiveFaq] = useState(1);

  const toggleFaq = (id) => {
    setActiveFaq(activeFaq === id ? null : id);
  };

  return (
    <>
      {/* Top Section */}
      <section className="py-[50px] max-[500px]:py-[30px]">
        <div className="mx-auto w-full max-w-[1140px] px-4">
          <div className="text-center">
            <h1 className="text-4xl font-bold leading-tight text-slate-950 max-[500px]:text-3xl">
              At every turn, an agency within easy reach
            </h1>

            <h4 className="mt-3 text-xl font-semibold text-orange-500">
              73 branches & 847 meeting points
            </h4>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="pb-[50px] max-[500px]:pb-[30px]">
        <div className="mx-auto w-full px-4">
          <LoadScript
            googleMapsApiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || ""}
          >
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
              {/* Sidebar */}
              <div className="lg:col-span-3">
                <div className="h-[500px] w-full overflow-y-scroll rounded-xl border border-slate-200 bg-white p-4 shadow-sm max-[500px]:mb-5 max-[500px]:h-[300px]">
                  <h3 className="text-2xl font-bold text-slate-950">
                    Locations
                  </h3>

                  <hr className="my-4 border-slate-200" />

                  <ul className="space-y-3">
                    {locationsData.map((loc) => (
                      <li
                        key={loc.id}
                        onClick={() => setActiveMarker(loc.id)}
                        className={`cursor-pointer rounded-md border-b border-slate-200 p-[10px] transition duration-300 ${
                          activeMarker === loc.id
                            ? "bg-orange-100"
                            : "bg-blue-50 hover:bg-blue-100"
                        }`}
                      >
                        <h5 className="text-lg font-bold text-slate-950">
                          {loc.name}
                        </h5>

                        <p className="mb-0 text-sm text-slate-600">
                          {loc.description}
                        </p>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Google Map */}
              <div className="lg:col-span-9">
                <div className="h-[500px] w-full overflow-hidden rounded-xl max-[500px]:h-[300px]">
                  <GoogleMap
                    mapContainerStyle={{
                      width: "100%",
                      height: "100%",
                    }}
                    center={center}
                    zoom={13}
                  >
                    {locationsData.map((loc) => (
                      <Marker
                        key={loc.id}
                        position={{ lat: loc.lat, lng: loc.lng }}
                        onClick={() => setActiveMarker(loc.id)}
                      >
                        {activeMarker === loc.id && (
                          <InfoWindow
                            onCloseClick={() => setActiveMarker(null)}
                          >
                            <div>
                              <h4 className="font-bold">{loc.name}</h4>
                              <p>{loc.description}</p>
                            </div>
                          </InfoWindow>
                        )}
                      </Marker>
                    ))}
                  </GoogleMap>
                </div>
              </div>
            </div>
          </LoadScript>
        </div>
      </section>

      {/* Trust Section */}
      <section className="bg-slate-50 py-[50px] max-[500px]:py-[30px]">
        <div className="mx-auto w-full max-w-[1140px] px-4">
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
            {/* Left */}
            <div className="lg:col-span-4">
              <div className="max-[500px]:mb-5">
                <h3 className="text-[40px] font-bold leading-tight text-blue-950 max-[500px]:text-[35px]">
                  They trust us
                </h3>

                <h5 className="mt-3 text-lg font-semibold text-slate-800">
                  Over 1,000,000 satisfied students
                </h5>

                <RatingStars />

                <h4 className="mt-3 text-xl font-semibold text-slate-900">
                  <span className="text-[45px] font-bold text-orange-500">
                    4.5
                  </span>{" "}
                  stars
                </h4>

                <p className="mt-3 text-base leading-relaxed text-slate-600">
                  on the App Store and the Google Play Store, but also on review
                  accreditation sites
                </p>

                <Link
                  href="/reviews"
                  className="mt-4 inline-block rounded-md bg-orange-500 px-6 py-3 text-lg font-semibold text-white transition duration-300 hover:bg-blue-950"
                >
                  Checkout Our Reviews
                </Link>
              </div>
            </div>

            {/* Reviews */}
            <div className="lg:col-span-8">
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                {reviews.map((review) => (
                  <div
                    key={review.id}
                    className="rounded-md bg-white p-[15px] shadow-sm"
                  >
                    <p className="text-base leading-relaxed text-slate-700">
                      {review.text}
                    </p>

                    <small className="text-sm text-slate-500">
                      {review.author}
                    </small>

                    <RatingStars small />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-[50px] max-[500px]:py-[30px]">
        <div className="mx-auto w-full max-w-[1140px] px-4">
          <div className="text-center">
            <h2 className="text-4xl font-bold text-blue-950 max-[500px]:text-3xl">
              Do you have any questions?
            </h2>

            <p className="mt-2 text-slate-600">
              Find all our answers in one click
            </p>
          </div>

          <div className="py-4">
            <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
              {faqs.map((item, index) => {
                const isActive = activeFaq === item.id;

                return (
                  <div
                    key={item.id}
                    className={
                      index !== faqs.length - 1
                        ? "border-b border-slate-200"
                        : ""
                    }
                  >
                    <button
                      type="button"
                      onClick={() => toggleFaq(item.id)}
                      className={`flex w-full items-center justify-between gap-4 px-5 py-4 text-left text-base font-semibold transition duration-300 ${
                        isActive
                          ? "bg-blue-950 text-white"
                          : "bg-white text-slate-900 hover:bg-orange-50"
                      }`}
                    >
                      <span>{item.question}</span>

                      <FaChevronDown
                        className={`text-base transition duration-300 ${
                          isActive ? "rotate-180" : ""
                        }`}
                      />
                    </button>

                    <div
                      className={`grid transition-all duration-300 ease-in-out ${
                        isActive ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                      }`}
                    >
                      <div className="overflow-hidden">
                        <div className="px-5 py-4 text-base leading-relaxed text-slate-600">
                          {item.answer}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Locations;
