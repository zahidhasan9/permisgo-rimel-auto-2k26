// "use client";

// import Image from "next/image";
// import Link from "next/link";
// import { useRef, useState } from "react";

// import { Swiper, SwiperSlide } from "swiper/react";

// import "swiper/css";
// import "swiper/css/free-mode";
// import "swiper/css/navigation";

// import { Autoplay, FreeMode, Navigation } from "swiper/modules";

// import Footer from "@/components/footer";
// import Navbar from "@/components/navbar";
// import Testimonials from "@/components/testimonials";

// import blogImg from "../../public/image/blog.jpg";
// import heroBg from "../../public/image/hero-bg.jpg";
// import broomLogo from "../../public/image/broomLogo.png";
// import carAnime from "../../public/image/car-animate.gif";
// import googleLogo from "../../public/image/googleLogo.png";
// import homePay from "../../public/image/home-pay.jpg";
// import trustLogo from "../../public/image/trustLogo.png";

// import payment1 from "../../public/image/payment1.jpg";
// import payment2 from "../../public/image/payment2.jpg";
// import payment3 from "../../public/image/payment3.jpg";
// import payment4 from "../../public/image/payment4.jpg";
// import payment5 from "../../public/image/payment5.jpg";
// import payment6 from "../../public/image/payment6.jpg";
// import payment7 from "../../public/image/payment7.jpg";
// import payment8 from "../../public/image/payment8.jpg";

// import instruc1 from "../../public/image/instrac1.png";
// import instruc2 from "../../public/image/instrac2.png";
// import instruc3 from "../../public/image/instrac3.png";
// import instruc4 from "../../public/image/instrac4.png";

// import hser1 from "../../public/image/hser1.png";
// import hser2 from "../../public/image/hser2.png";
// import hser3 from "../../public/image/hser3.png";
// import hser4 from "../../public/image/hser4.png";
// import hser5 from "../../public/image/hser5.png";
// import hser6 from "../../public/image/hser6.png";
// import hser7 from "../../public/image/hser7.png";
// import hser8 from "../../public/image/hser8.png";
// import hser9 from "../../public/image/hser9.png";

// import indicator1 from "../../public/image/indicate1.png";
// import indicator2 from "../../public/image/indicate2.png";
// import indicator3 from "../../public/image/indicate3.png";
// import indicator4 from "../../public/image/indicate4.png";

// import batch from "../../public/image/hero-batch.png";

// import { FaStar } from "react-icons/fa";
// import { FaArrowLeftLong, FaArrowRightLong } from "react-icons/fa6";

// const cn = (...classes) => classes.filter(Boolean).join(" ");

// const container = "mx-auto max-w-[1320px] px-4 sm:px-5 lg:px-6";
// const section = "py-9 md:py-12 lg:py-14";

// const badge =
//   "inline-flex items-center rounded-full bg-white px-3.5 py-1.5 text-[15px] font-bold tracking-wide text-orange-500 shadow-sm ring-1 ring-slate-100";

// const primaryBtn =
//   "inline-flex items-center justify-center rounded-full bg-blue-600 px-5 py-2.5 text-sm font-bold text-white shadow-sm transition duration-300 hover:bg-blue-900 hover:shadow-md";

// const outlineBtn =
//   "inline-flex items-center justify-center rounded-full border border-blue-600 bg-white px-5 py-2.5 text-sm font-bold text-blue-900 transition duration-300 hover:bg-blue-600 hover:text-white hover:shadow-md";

// const inputClass =
//   "w-full rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 text-sm font-medium text-slate-800 shadow-sm outline-none placeholder:text-slate-400 focus:border-blue-600 focus:ring-4 focus:ring-blue-100";

// const navBtn =
//   "flex h-10 w-10 items-center justify-center rounded-full bg-white text-sm text-blue-900 shadow-sm ring-1 ring-slate-100 transition duration-300 hover:bg-blue-600 hover:text-white hover:shadow-md";

// const cardHover =
//   "transition duration-300 hover:-translate-y-1 hover:border-blue-100 hover:shadow-xl";

// const indicators = [
//   { img: indicator1, title: "Moniteur diplômé" },
//   { img: indicator2, title: "+ 500 d’élève réussites" },
//   { img: indicator3, title: "Certifié Qualiopi" },
//   { img: indicator4, title: "Écoles de conduite labellisées" },
// ];

// const services = [
//   { img: hser1, title: "Permis B Conduite Manuelle", price: "20hr - 990£" },
//   { img: hser2, title: "Permis B Conduite Automatique", price: "20hr - 990£" },
//   { img: hser3, title: "Conduite Accompagnee", price: "20hr - 990£" },
//   { img: hser4, title: "Supervised driving (AAC)", price: "20hr - 990£" },
//   { img: hser5, title: "Code en salle", price: "20hr - 990£" },
//   { img: hser6, title: "Code en ligne", price: "20hr - 990£" },
//   { img: hser7, title: "Conduite Supervisee", price: "20hr - 990£" },
//   { img: hser8, title: "Permis Accelere", price: "20hr - 990£" },
//   { img: hser9, title: "Code Accelere", price: "20hr - 990£" },
// ];

// const instructors = [
//   instruc1,
//   instruc2,
//   instruc3,
//   instruc4,
//   instruc2,
//   instruc3,
//   instruc1,
//   instruc2,
//   instruc3,
//   instruc1,
// ];

// const reviews = [
//   { img: broomLogo, title: "VroomVroom" },
//   { img: googleLogo, title: "Google Ratings" },
//   { img: trustLogo, title: "Trustpilot Ratings" },
// ];

// const payments = [
//   payment1,
//   payment2,
//   payment3,
//   payment4,
//   payment5,
//   payment6,
//   payment7,
//   payment8,
// ];

// const mapTabs = [
//   { key: "manual", title: "Manual Transmission" },
//   { key: "auto", title: "Automatic Transmission" },
//   { key: "accelerated", title: "Accelerated" },
//   { key: "motorcycle", title: "Motorcycle" },
// ];

// const faqs = [
//   {
//     q: "Accordion Item #1",
//     a: "This is the first item's accordion body. It is shown by default, until the collapse plugin adds the appropriate classes that we use to style each element.",
//   },
//   {
//     q: "Accordion Item #2",
//     a: "This is the second item's accordion body. It is hidden by default, until the collapse plugin adds the appropriate classes that we use to style each element.",
//   },
//   {
//     q: "Accordion Item #3",
//     a: "This is the third item's accordion body. It is hidden by default, until the collapse plugin adds the appropriate classes that we use to style each element.",
//   },
//   {
//     q: "Accordion Item #4",
//     a: "This is the fourth item's accordion body. It is hidden by default, until the collapse plugin adds the appropriate classes that we use to style each element.",
//   },
//   {
//     q: "Accordion Item #5",
//     a: "This is the fifth item's accordion body. It is hidden by default, until the collapse plugin adds the appropriate classes that we use to style each element.",
//   },
// ];

// const mapSrc =
//   "https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d9627.36559924592!2d2.3512118557895323!3d48.86432615404459!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2sbd!4v1775120702448!5m2!1sen!2sbd";

// function SectionHeading({ small, title, desc }) {
//   return (
//     <div className="mx-auto mb-7 max-w-2xl text-center md:mb-9">
//       <h5 className={badge}>{small}</h5>

//       <h2 className="mt-3 text-2xl font-black leading-tight tracking-tight text-blue-900 sm:text-3xl lg:text-4xl">
//         {title}
//       </h2>

//       {desc && (
//         <p className="mx-auto mt-2 max-w-xl text-sm font-medium leading-6 text-slate-600">
//           {desc}
//         </p>
//       )}
//     </div>
//   );
// }

// function Stars({ center = true }) {
//   return (
//     <ul
//       className={cn(
//         "flex gap-1 text-sm text-yellow-400",
//         center && "justify-center",
//       )}
//     >
//       {[1, 2, 3, 4, 5].map((item) => (
//         <li key={item}>
//           <FaStar />
//         </li>
//       ))}
//     </ul>
//   );
// }

// export default function Home() {
//   const swiperRefOne = useRef(null);
//   const swiperRefThree = useRef(null);

//   const instructorInfo = [
//     {
//       name: "Robert Fox",
//       experience: "05 Years+",
//     },
//     {
//       name: "Ronald Richards",
//       experience: "05 Years+",
//     },
//     {
//       name: "Arlene McCoy",
//       experience: "05 Years+",
//     },
//     {
//       name: "Bessie Cooper",
//       experience: "05 Years+",
//     },
//   ];

//   const [activeInstructor, setActiveInstructor] = useState(0);

//   const [activeTab, setActiveTab] = useState("manual");
//   const [openFaq, setOpenFaq] = useState(0);

//   return (
//     <>
//       <Navbar />

//       {/* Hero Section */}
//       <section className="relative overflow-hidden bg-[#08275f]">
//         {/* Background image */}
//         <div
//           className="absolute inset-0 bg-cover bg-center bg-no-repeat"
//           style={{
//             backgroundImage: `url(${heroBg.src})`,
//           }}
//         />

//         {/* Very light overlay */}
//         <div className="pointer-events-none absolute inset-0 bg-[#00132f]/10" />

//         <div className="relative z-10 mx-auto w-full max-w-[1320px] px-5 sm:px-7 lg:px-8">
//           <div className="relative min-h-[520px] py-8 sm:py-10 lg:h-[520px] lg:py-[30px]">
//             {/* Left content */}
//             <div className="relative z-20 w-full lg:w-[59%]">
//               {/* Approval badge */}
//               <div className="inline-flex min-h-[28px] items-center justify-center rounded-full bg-gradient-to-r from-[#2476ef] to-[#a142e9] px-4 py-1.5 shadow-md">
//                 <span className="text-[10px] font-bold leading-none text-white sm:text-[11px]">
//                   Approved by the prefecture E 25 093 0029 0
//                 </span>
//               </div>

//               {/* Heading */}
//               <h1 className="mt-3 max-w-[680px] text-[31px] font-black leading-[1.12] tracking-[-0.7px] text-white drop-shadow-sm sm:text-[36px] lg:text-[39px] xl:text-[42px]">
//                 Conduisez vers la liberté, Per|
//               </h1>

//               {/* Description */}
//               <p className="mt-6 max-w-[460px] text-[12px] font-medium leading-5 text-white/95 sm:text-[13px]">
//                 Comprehensive training, guaranteed safety.
//               </p>

//               {/* Main button */}
//               <div className="mt-4">
//                 <Link
//                   href="#"
//                   className="inline-flex h-[39px] items-center justify-center rounded-[7px] bg-[#ef233c] px-[19px] text-[11px] font-extrabold text-white shadow-md transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#d71934] hover:shadow-lg"
//                 >
//                   Start the courses
//                 </Link>
//               </div>

//               {/* Offer cards */}
//               <div className="mt-7 flex w-full max-w-[345px] flex-col gap-3">
//                 {[
//                   {
//                     title: "Driving License 13H From",
//                     oldPrice: "€850",
//                     price: "€749",
//                   },
//                   {
//                     title: "Highway Code from",
//                     oldPrice: "€50",
//                     price: "€30",
//                   },
//                 ].map((offer, index) => (
//                   <div
//                     key={offer.title}
//                     className="relative min-h-[112px] overflow-hidden rounded-[9px] border border-[#9ab8ea] bg-[#05275c]/45 px-4 py-3 text-white shadow-[0_8px_25px_rgba(0,0,0,0.12)] backdrop-blur-[1px]"
//                   >
//                     {/* Card top */}
//                     <div className="flex items-start justify-between gap-4">
//                       <div>
//                         <h4 className="text-[13px] font-extrabold leading-[18px] text-white">
//                           {offer.title}
//                         </h4>

//                         <p className="mt-1 text-[11px] font-bold text-[#27d26b] line-through">
//                           {offer.oldPrice}
//                         </p>
//                       </div>

//                       <Image
//                         src={batch}
//                         alt={`${offer.title} badge`}
//                         sizes="40px"
//                         className="h-auto w-[36px] shrink-0 opacity-80"
//                       />
//                     </div>

//                     {/* Card bottom */}
//                     <div className="mt-3 flex items-end justify-between gap-4">
//                       <div>
//                         <p className="text-[9px] font-medium leading-none text-white/80">
//                           of the
//                         </p>

//                         <h3 className="mt-1 text-[22px] font-black leading-none text-white">
//                           {offer.price}
//                         </h3>
//                       </div>

//                       <Link
//                         href="#"
//                         className="inline-flex h-[31px] items-center justify-center rounded-[7px] bg-[#ef233c] px-[14px] text-[10px] font-extrabold text-white shadow-sm transition-all duration-300 hover:bg-[#d71934] hover:shadow-md"
//                       >
//                         Permit Offer
//                       </Link>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             </div>

//             {/* Right car image */}
//             <div className="relative z-10 mt-10 flex w-full items-end justify-center lg:absolute lg:bottom-0 lg:right-[-15px] lg:mt-0 lg:h-full lg:w-[58%] lg:justify-end">
//               <Image
//                 src={carAnime}
//                 alt="Driving school car"
//                 priority
//                 sizes="(max-width: 1024px) 100vw, 58vw"
//                 className="h-auto w-full max-w-[680px] object-contain object-bottom lg:max-h-[500px] xl:max-w-[750px]"
//               />
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* Indicators */}
//       <section className="bg-white pb-20 pt-[72px]">
//         <div className="mx-auto w-full max-w-[1260px] px-5 xl:px-0">
//           {/* Trust Indicator label */}
//           <div className="flex justify-center">
//             <div className="flex h-[42px] items-center justify-center rounded-[10px] bg-[#E7ECF4] px-[18px]">
//               <span className="text-[15px] font-semibold leading-none text-[#2BBF3A]">
//                 Trust Indicator
//               </span>
//             </div>
//           </div>

//           {/* Indicator cards */}
//           <div className="mt-12 grid grid-cols-1 gap-6 px-2 sm:grid-cols-2 lg:grid-cols-4 lg:gap-10 lg:px-0">
//             {indicators.map((item, index) => (
//               <div
//                 key={item.title || index}
//                 className="h-[112px] rounded-[18px] bg-[#E7ECF4] [transform:skewX(-8deg)]"
//               >
//                 <div className="flex h-full items-center gap-4 px-8 [transform:skewX(8deg)] lg:px-10">
//                   <div className="flex h-12 w-12 shrink-0 items-center justify-center">
//                     <Image
//                       src={item.img}
//                       alt={item.title}
//                       sizes="48px"
//                       className="h-auto max-h-12 w-auto max-w-12 object-contain"
//                     />
//                   </div>

//                   <h4 className="text-[16px] font-semibold leading-[22px] text-[#111111]">
//                     {item.title}
//                   </h4>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* Services */}
//       <section className="bg-white py-[60px] md:py-[78px]">
//         <div className="mx-auto w-full max-w-[1320px] px-4 sm:px-6">
//           {/* Section heading */}
//           <div className="text-center">
//             <span className="inline-flex min-h-[30px] items-center justify-center rounded-[7px] bg-[#E7ECF4] px-[14px] text-[15px] font-semibold text-[#20C943]">
//               Services
//             </span>

//             <h2 className="mt-5 text-[25px] font-extrabold leading-tight text-[#202020] md:text-[33px]">
//               Your driving licence with Permisgo
//             </h2>
//           </div>

//           {/* Services grid */}
//           <div className="relative mt-[42px]">
//             {/* Dotted connector line – second row */}
//             <div className="pointer-events-none absolute left-[21%] right-[21%] top-[350px] z-0 hidden border-t-2 border-dotted border-[#168BFF] xl:block" />

//             <div className="relative z-10 grid grid-cols-1 gap-[18px] sm:grid-cols-2 xl:grid-cols-3">
//               {services.map((service, index) => (
//                 <div
//                   key={service.title || index}
//                   className={cn(
//                     "group relative flex min-h-[280px] flex-col items-center justify-center overflow-hidden rounded-[8px] bg-[#E7ECF4] px-5 py-8 text-center",
//                     "transition-all duration-300 hover:-translate-y-1 hover:shadow-lg",
//                   )}
//                 >
//                   {/* Service icon */}
//                   <div className="flex h-[70px] w-[78px] items-center justify-center">
//                     <Image
//                       src={service.img}
//                       alt={service.title}
//                       sizes="78px"
//                       className="max-h-[70px] w-auto max-w-[78px] object-contain"
//                     />
//                   </div>

//                   {/* Service title */}
//                   <h4 className="mt-5 min-h-[42px] max-w-[240px] text-[17px] font-extrabold leading-[21px] text-[#101010]">
//                     {service.title}
//                   </h4>

//                   {/* Price */}
//                   <p className="mt-1 text-[18px] font-bold leading-5 text-[#16C53A]">
//                     {service.price}
//                   </p>

//                   {/* Button */}
//                   <Link
//                     href={service.href || "#"}
//                     className={cn(
//                       "mt-5 inline-flex min-h-[38px] items-center justify-center rounded-[7px]",
//                       "border border-[#064CB5] px-[18px]",
//                       "text-[12px] font-bold text-[#F02036]",
//                       "transition-all duration-300",
//                       "hover:border-[#ED1F3B] hover:bg-[#ED1F3B] hover:text-white",
//                       "focus:outline-none focus:ring-2 focus:ring-[#ED1F3B]/30",
//                     )}
//                   >
//                     Learn more
//                   </Link>
//                 </div>
//               ))}
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* Location */}
//       <section className="bg-[#F7F9FC] py-[60px] md:py-[80px]">
//         <div className="mx-auto w-full max-w-[1320px] px-4 sm:px-6 lg:px-8">
//           {/* Heading */}
//           <div className="mb-[46px] text-center">
//             <span className="inline-flex min-h-[28px] items-center justify-center rounded-[7px] bg-[#E8EDF4] px-[13px] text-[15px] font-semibold text-[#20C943]">
//               Location
//             </span>

//             <h2 className="mt-5 text-[26px] font-extrabold leading-tight text-[#202020] md:text-[33px]">
//               Permisgo near you
//             </h2>

//             <p className="mt-4 text-[12px] font-medium text-[#555B65] md:text-[15px]">
//               Lessons near your home, your work, your school… we&apos;re
//               everywhere!
//             </p>
//           </div>

//           <div className="grid grid-cols-1 gap-6 lg:grid-cols-12 lg:items-start">
//             {/* Left side */}
//             <div className="lg:col-span-5">
//               {/* Search */}
//               <div className="relative">
//                 <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2">
//                   <svg
//                     width="19"
//                     height="19"
//                     viewBox="0 0 24 24"
//                     fill="none"
//                     xmlns="http://www.w3.org/2000/svg"
//                   >
//                     <circle
//                       cx="11"
//                       cy="11"
//                       r="7"
//                       stroke="#68717E"
//                       strokeWidth="1.7"
//                     />
//                     <path
//                       d="M16.5 16.5L21 21"
//                       stroke="#68717E"
//                       strokeWidth="1.7"
//                       strokeLinecap="round"
//                     />
//                   </svg>
//                 </span>

//                 <input
//                   type="text"
//                   placeholder="Search by address, city..."
//                   className="h-[50px] w-full rounded-[10px] border-0 bg-[#E8EBF0] pl-12 pr-4 text-[13px] font-medium text-[#30343B] outline-none placeholder:text-[#707782] focus:ring-2 focus:ring-[#174FA5]/20"
//                 />
//               </div>

//               {/* Vehicle type */}
//               <div className="mt-8">
//                 <h4 className="mb-4 text-[17px] font-extrabold leading-6 text-[#17191D]">
//                   Find lessons based on your vehicle type
//                 </h4>

//                 <div className="rounded-[10px] bg-[#E9EDF5] p-4">
//                   <div className="grid grid-cols-2 gap-3">
//                     {mapTabs.map((tab) => (
//                       <button
//                         key={tab.key}
//                         type="button"
//                         onClick={() => setActiveTab(tab.key)}
//                         className={cn(
//                           "flex min-h-[39px] items-center justify-center rounded-[8px] border px-3",
//                           "text-center text-[11px] lg:text-[13px] font-bold leading-4 transition-all duration-300",
//                           activeTab === tab.key
//                             ? "border-[#174FA5] bg-[#B8C9E5] text-[#12458D]"
//                             : "border-transparent bg-white text-[#17191D] hover:border-[#174FA5] hover:text-[#174FA5]",
//                         )}
//                       >
//                         {tab.title}
//                       </button>
//                     ))}
//                   </div>
//                 </div>
//               </div>

//               {/* Available teacher */}
//               <div className="mt-8">
//                 <h4 className="mb-4 text-[16px] font-extrabold leading-6 text-[#17191D]">
//                   Find lessons based on available teacher near you
//                 </h4>

//                 <div className="rounded-[10px] bg-[#E9EDF5] p-4">
//                   <button
//                     type="button"
//                     className="flex h-[42px] w-full items-center justify-center rounded-[8px] border border-[#174FA5] bg-[#B8C9E5] px-4 text-[13px] font-bold text-[#123F7A] transition duration-300 hover:bg-[#174FA5] hover:text-white"
//                   >
//                     Start Searching
//                   </button>
//                 </div>
//               </div>
//             </div>

//             {/* Map side */}
//             <div className="lg:col-span-7">
//               <div className="relative min-h-[430px] overflow-hidden rounded-[8px] bg-[#DDE8EC]">
//                 <iframe
//                   src={mapSrc}
//                   width="100%"
//                   height="430"
//                   allowFullScreen
//                   loading="lazy"
//                   referrerPolicy="no-referrer-when-downgrade"
//                   className="block h-[430px] w-full border-0"
//                   title="Permisgo location map"
//                 />

//                 {/* Teacher information card */}
//                 <div className="absolute bottom-5 right-5 w-[300px] max-w-[calc(100%-40px)] rounded-[12px] border-2 border-[#174FA5] bg-white p-3 shadow-[0_12px_35px_rgba(15,44,88,0.24)]">
//                   {/* Card top */}
//                   <div className="flex items-start justify-between">
//                     <div className="flex items-center gap-3">
//                       <div className="flex h-[46px] w-[46px] shrink-0 items-center justify-center overflow-hidden rounded-full bg-[#D9E5F4] text-[12px] font-extrabold text-[#174FA5]">
//                         RF
//                       </div>

//                       <div>
//                         <h4 className="text-[13px] font-extrabold text-[#174FA5]">
//                           Robert Fox
//                         </h4>
//                       </div>
//                     </div>

//                     <div className="flex items-start gap-3">
//                       <div className="text-right">
//                         <p className="text-[10px] font-semibold text-[#555B65]">
//                           Experience 05 Years+
//                         </p>

//                         <div className="mt-1 text-[12px] leading-none tracking-[2px] text-[#174FA5]">
//                           ★★★★★
//                         </div>
//                       </div>

//                       <button
//                         type="button"
//                         aria-label="Close teacher card"
//                         className="flex h-5 w-5 items-center justify-center text-[18px] font-medium leading-none text-[#272B30]"
//                       >
//                         ×
//                       </button>
//                     </div>
//                   </div>

//                   {/* Availability */}
//                   <div className="mt-3 rounded-[8px] bg-[#EEF1F6] px-3 py-3">
//                     <p className="mb-3 text-[10px] font-medium text-[#7B828D]">
//                       Available Time
//                     </p>

//                     <div className="grid grid-cols-2 gap-x-4 gap-y-[7px]">
//                       <p className="text-[9px] font-semibold text-[#333840]">
//                         Mar&nbsp; 08h00 - 10h30
//                       </p>

//                       <p className="text-[9px] font-semibold text-[#333840]">
//                         Apr&nbsp; 08h00 - 10h30
//                       </p>

//                       <p className="text-[9px] font-semibold text-[#333840]">
//                         May&nbsp; 08h00 - 10h30
//                       </p>

//                       <p className="text-[9px] font-semibold text-[#333840]">
//                         Jun&nbsp; 08h00 - 10h30
//                       </p>

//                       <p className="text-[9px] font-semibold text-[#333840]">
//                         Nov&nbsp; 08h00 - 10h30
//                       </p>

//                       <p className="text-[9px] font-semibold text-[#333840]">
//                         Dec&nbsp; 08h00 - 10h30
//                       </p>
//                     </div>
//                   </div>

//                   <button
//                     type="button"
//                     className="mt-3 flex h-[40px] w-full items-center justify-center rounded-[7px] bg-[#E9243F] px-4 text-[10px] font-extrabold text-white transition duration-300 hover:bg-[#C91831]"
//                   >
//                     Book Now
//                   </button>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* Instructors */}
//       <section className="overflow-hidden bg-[#F5F7FA] pb-[82px] pt-[10px]">
//         <div className="mx-auto w-full max-w-[1320px] px-4 xl:px-0">
//           {/* Heading */}
//           <div className="mb-[54px] text-center">
//             <span className="inline-flex h-[38px] min-w-[100px] items-center justify-center rounded-[8px] bg-[#E7ECF4] px-4 text-[15px] font-medium leading-none text-[#28C34B]">
//               Instructors
//             </span>

//             <h2 className="mt-[22px] text-[27px] font-extrabold leading-[38px] text-[#171717] md:text-[31px]">
//               You&apos;ll love our instructors
//             </h2>
//           </div>

//           <Swiper
//             slidesPerView={1}
//             slidesPerGroup={1}
//             spaceBetween={24}
//             speed={600}
//             watchOverflow={true}
//             loop={instructors.length > 4}
//             autoplay={{
//               delay: 3000,
//               disableOnInteraction: false,
//             }}
//             breakpoints={{
//               480: {
//                 slidesPerView: 2,
//                 spaceBetween: 18,
//               },
//               768: {
//                 slidesPerView: 3,
//                 spaceBetween: 20,
//               },
//               1024: {
//                 slidesPerView: 4,
//                 spaceBetween: 24,
//               },
//             }}
//             modules={[Autoplay, Navigation]}
//             onSwiper={(swiper) => {
//               swiperRefOne.current = swiper;
//               setActiveInstructor(swiper.realIndex);
//             }}
//             onSlideChange={(swiper) => {
//               setActiveInstructor(swiper.realIndex);
//             }}
//             className="w-full"
//           >
//             {instructors.map((img, index) => {
//               const info = instructorInfo[index % instructorInfo.length];
//               const isActive = activeInstructor === index;

//               return (
//                 <SwiperSlide key={index} className="h-auto">
//                   <div
//                     className={cn(
//                       "box-border flex h-[308px] w-full flex-col items-center",
//                       "rounded-[10px] border-2 bg-[#E7ECF4]",
//                       "px-[24px] pb-[20px] pt-[24px] text-center",
//                       "transition-colors duration-300",
//                       isActive ? "border-[#245AA8]" : "border-transparent",
//                     )}
//                   >
//                     {/* Fixed avatar wrapper */}
//                     <div className="relative h-[64px] w-[64px] shrink-0 overflow-hidden rounded-full">
//                       <Image
//                         src={img}
//                         alt={info.name}
//                         fill
//                         sizes="64px"
//                         priority={index < 4}
//                         className="!h-full !w-full rounded-full object-cover"
//                       />
//                     </div>

//                     {/* Name */}
//                     <h4 className="mt-[22px] text-[15px] font-extrabold leading-[20px] text-[#123E8C]">
//                       {info.name}
//                     </h4>

//                     {/* Experience box */}
//                     <div className="mt-[17px] flex h-[88px] w-full shrink-0 flex-col items-center justify-center rounded-[8px] bg-white px-3">
//                       <p className="text-[11px] font-normal leading-[16px] text-[#70747B]">
//                         Experience{" "}
//                         <span className="font-extrabold text-[#20242A]">
//                           {info.experience}
//                         </span>
//                       </p>

//                       <div className="mt-[10px] flex items-center justify-center gap-[7px] text-[12px] leading-none text-[#123E8C]">
//                         <FaStar />
//                         <FaStar />
//                         <FaStar />
//                         <FaStar />
//                         <FaStar />
//                       </div>
//                     </div>

//                     {/* Buttons */}
//                     <div className="mt-[15px] grid w-full grid-cols-2 gap-[13px]">
//                       <Link
//                         href="#"
//                         className="flex h-[38px] items-center justify-center rounded-[6px] border border-[#D72638] bg-[#D72638] px-2 text-[10px] font-bold leading-none text-white transition-colors duration-300 hover:bg-[#B91F30]"
//                       >
//                         Book Now
//                       </Link>

//                       <Link
//                         href="#"
//                         className="flex h-[38px] items-center justify-center rounded-[6px] border border-[#D72638] bg-transparent px-2 text-[10px] font-bold leading-none text-[#123E8C] transition-colors duration-300 hover:bg-[#D72638] hover:text-white"
//                       >
//                         Message
//                       </Link>
//                     </div>
//                   </div>
//                 </SwiperSlide>
//               );
//             })}
//           </Swiper>

//           {/* Navigation */}
//           <div className="mt-[48px] flex items-center justify-center gap-[12px]">
//             <button
//               type="button"
//               aria-label="Previous instructor"
//               onClick={() => swiperRefOne.current?.slidePrev()}
//               className="flex h-[40px] w-[40px] items-center justify-center rounded-[10px] bg-[#E7ECF4] text-[14px] text-[#D72638] transition-colors duration-300 hover:bg-[#DDE3EC]"
//             >
//               <FaArrowLeftLong />
//             </button>

//             <button
//               type="button"
//               aria-label="Next instructor"
//               onClick={() => swiperRefOne.current?.slideNext()}
//               className="flex h-[40px] w-[40px] items-center justify-center rounded-[10px] bg-[#D72638] text-[14px] text-white transition-colors duration-300 hover:bg-[#B91F30]"
//             >
//               <FaArrowRightLong />
//             </button>
//           </div>
//         </div>
//       </section>

//       {/* Reviews */}
//       <section className={cn(section, "bg-blue-900")}>
//         <div className={container}>
//           <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
//             {reviews.map((review, index) => (
//               <div
//                 key={index}
//                 className="rounded-2xl border border-white/10 bg-white p-5 text-center shadow-lg"
//               >
//                 <Image
//                   src={review.img}
//                   alt={review.title}
//                   sizes="72px"
//                   className="mx-auto h-auto w-16"
//                 />

//                 <h4 className="mt-4 text-xl font-black text-blue-900">
//                   {review.title}
//                 </h4>

//                 <div className="mt-2">
//                   <Stars />
//                 </div>

//                 <p className="mt-2 text-sm font-bold text-slate-600">
//                   04 out of 05
//                 </p>
//               </div>
//             ))}
//           </div>
//         </div>
//       </section>

//       <Testimonials />

//       {/* Instructor CTA */}
//       <section className="relative overflow-hidden bg-slate-900 bg-[url('/image/driving-instructor.webp')] bg-cover bg-top bg-no-repeat">
//         <div className="absolute inset-0 bg-black/70" />

//         <div
//           className={cn(
//             container,
//             "relative flex min-h-[430px] items-end justify-center py-12 lg:min-h-[560px]",
//           )}
//         >
//           <div className="max-w-2xl text-center">
//             <h3 className="text-2xl font-black leading-tight tracking-tight text-white sm:text-3xl lg:text-4xl">
//               Are you a driving instructor? And super friendly?
//             </h3>

//             <p className="mt-3 text-base font-medium text-white/85">
//               Become a freelance driving instructor.
//             </p>

//             <div className="mt-6">
//               <Link href="#" className={primaryBtn}>
//                 Join us a driving instructor
//               </Link>
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* FAQ */}
//       {/* FAQ */}
//       <section className="bg-white py-[70px] md:py-[86px]">
//         <div className="mx-auto w-full max-w-[1320px] px-4 sm:px-6 lg:px-8">
//           {/* Heading */}
//           <div className="mb-[46px] text-center">
//             <span className="inline-flex h-[30px] min-w-[54px] items-center justify-center rounded-[7px] bg-[#E8EDF4] px-[13px] text-[15px] font-semibold leading-none text-[#27BF43]">
//               FAQ
//             </span>

//             <h2 className="mt-[19px] text-[27px] font-extrabold leading-[36px] text-[#1A1A1A] md:text-[33px]">
//               Frequently Asked Question
//             </h2>
//           </div>

//           {/* FAQ content */}
//           <div className="grid grid-cols-1 gap-[24px] lg:grid-cols-[460px_minmax(0,1fr)] lg:items-start">
//             {/* Left side */}
//             <div>
//               <div className="mb-[27px]">
//                 <h3 className="max-w-[390px] text-[25px] font-extrabold leading-[24px] text-[#202020]">
//                   Got a question about lessons,
//                   <br />
//                   courses, or documents?
//                 </h3>

//                 <p className="mt-[14px] text-[14px] font-medium leading-[18px] text-[#676D76]">
//                   Fill out the form below and we&apos;ll respond as soon as
//                   possible.
//                 </p>
//               </div>

//               {/* Form card */}
//               <div className="rounded-[8px] bg-[#E7ECF4] px-[24px] pb-[32px] pt-[27px]">
//                 <h4 className="text-[18px] font-extrabold leading-[20px] text-[#202020]">
//                   Get in touch
//                 </h4>

//                 <p className="mt-[13px] text-[14px] font-medium leading-[17px] text-[#646A73]">
//                   Fill out this form with necessary information
//                 </p>

//                 <form className="mt-[24px]">
//                   <div className="grid grid-cols-1 gap-x-[20px] gap-y-[18px] sm:grid-cols-2">
//                     {/* First name */}
//                     <div>
//                       <label
//                         htmlFor="first-name"
//                         className="mb-[8px] block text-[13px] font-semibold leading-none text-[#25282D]"
//                       >
//                         First Name
//                       </label>

//                       <input
//                         type="text"
//                         id="first-name"
//                         placeholder="Write name here"
//                         className="h-[38px] w-full rounded-[8px] border border-[#C8D1DD] bg-white px-[13px] text-[10px] font-medium text-[#25282D] outline-none placeholder:text-[#A0A5AD] focus:border-[#174B9B] focus:ring-2 focus:ring-[#174B9B]/10"
//                       />
//                     </div>

//                     {/* Last name */}
//                     <div>
//                       <label
//                         htmlFor="last-name"
//                         className="mb-[8px] block text-[13px] font-semibold leading-none text-[#25282D]"
//                       >
//                         Last Name
//                       </label>

//                       <input
//                         type="text"
//                         id="last-name"
//                         placeholder="Write name here"
//                         className="h-[38px] w-full rounded-[8px] border border-[#C8D1DD] bg-white px-[13px] text-[10px] font-medium text-[#25282D] outline-none placeholder:text-[#A0A5AD] focus:border-[#174B9B] focus:ring-2 focus:ring-[#174B9B]/10"
//                       />
//                     </div>

//                     {/* Email */}
//                     <div>
//                       <label
//                         htmlFor="email"
//                         className="mb-[8px] block text-[13px] font-semibold leading-none text-[#25282D]"
//                       >
//                         Email address
//                       </label>

//                       <input
//                         type="email"
//                         id="email"
//                         placeholder="Write Email address"
//                         className="h-[38px] w-full rounded-[8px] border border-[#C8D1DD] bg-white px-[13px] text-[10px] font-medium text-[#25282D] outline-none placeholder:text-[#A0A5AD] focus:border-[#174B9B] focus:ring-2 focus:ring-[#174B9B]/10"
//                       />
//                     </div>

//                     {/* Phone */}
//                     <div>
//                       <label
//                         htmlFor="phone-number"
//                         className="mb-[8px] block text-[13px] font-semibold leading-none text-[#25282D]"
//                       >
//                         Phone Number
//                       </label>

//                       <input
//                         type="tel"
//                         id="phone-number"
//                         placeholder="Write phone number"
//                         className="h-[38px] w-full rounded-[8px] border border-[#C8D1DD] bg-white px-[13px] text-[10px] font-medium text-[#25282D] outline-none placeholder:text-[#A0A5AD] focus:border-[#174B9B] focus:ring-2 focus:ring-[#174B9B]/10"
//                       />
//                     </div>

//                     {/* Message */}
//                     <div className="sm:col-span-2">
//                       <label
//                         htmlFor="question"
//                         className="mb-[8px] block text-[13px] font-semibold leading-none text-[#25282D]"
//                       >
//                         Message
//                       </label>

//                       <textarea
//                         id="question"
//                         placeholder="Write message"
//                         className="h-[172px] w-full resize-none rounded-[8px] border border-[#C8D1DD] bg-white px-[13px] py-[12px] text-[10px] font-medium leading-[16px] text-[#25282D] outline-none placeholder:text-[#A0A5AD] focus:border-[#174B9B] focus:ring-2 focus:ring-[#174B9B]/10"
//                       />
//                     </div>

//                     {/* Submit */}
//                     <div className="sm:col-span-2">
//                       <button
//                         type="submit"
//                         className="inline-flex h-[40px] min-w-[82px] items-center justify-center rounded-[7px] bg-[#E4223C] px-[20px] text-[13px] font-bold text-white transition-colors duration-300 hover:bg-[#C91830]"
//                       >
//                         Submit
//                       </button>
//                     </div>
//                   </div>
//                 </form>
//               </div>
//             </div>

//             {/* Right accordion */}
//             <div className="space-y-[20px]">
//               {faqs.map((faq, index) => {
//                 const isOpen = openFaq === index;

//                 return (
//                   <div
//                     key={index}
//                     className="overflow-hidden rounded-[8px] bg-[#F4F6F9]"
//                   >
//                     <button
//                       type="button"
//                       onClick={() => setOpenFaq(isOpen ? null : index)}
//                       aria-expanded={isOpen}
//                       className="flex min-h-[64px] w-full items-center justify-between gap-5 rounded-[8px] bg-[#194A99] px-[25px] py-[16px] text-left transition-colors duration-300 hover:bg-[#123F86]"
//                     >
//                       <span className="text-[16px] font-extrabold leading-[19px] text-white">
//                         {faq.q}
//                       </span>

//                       <span className="flex h-[20px] w-[20px] shrink-0 items-center justify-center text-[18px] font-normal leading-none text-white">
//                         {isOpen ? "−" : "+"}
//                       </span>
//                     </button>

//                     {isOpen && (
//                       <div className="bg-[#F4F6F9] px-[16px] pb-[18px] pt-[14px]">
//                         <p className="text-[14px] font-medium leading-[18px] text-[#4F555E]">
//                           {faq.a}
//                         </p>

//                         {faq.link && (
//                           <Link
//                             href="#"
//                             className="mt-[12px] inline-block text-[13px] font-medium text-[#194A99] underline underline-offset-2"
//                           >
//                             {faq.link}
//                           </Link>
//                         )}
//                       </div>
//                     )}
//                   </div>
//                 );
//               })}
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* Payment */}
//       <section className={cn(section, "bg-slate-50")}>
//         <div className={container}>
//           <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-12">
//             <div className="lg:col-span-8">
//               <div className="mb-6 max-w-xl">
//                 <h5 className={badge}>Payment System</h5>

//                 <h2 className="mt-3 text-2xl font-black leading-tight tracking-tight text-blue-900 sm:text-3xl lg:text-4xl">
//                   Secure & Flexible Payment System
//                 </h2>
//               </div>

//               <Swiper
//                 spaceBetween={14}
//                 breakpoints={{
//                   300: { slidesPerView: 2 },
//                   640: { slidesPerView: 3 },
//                   768: { slidesPerView: 4 },
//                   1024: { slidesPerView: 5 },
//                   1440: { slidesPerView: 6 },
//                 }}
//                 autoplay={{
//                   delay: 2000,
//                   disableOnInteraction: false,
//                 }}
//                 freeMode
//                 loop
//                 modules={[FreeMode, Autoplay, Navigation]}
//                 onSwiper={(swiper) => (swiperRefThree.current = swiper)}
//                 className="w-full"
//               >
//                 {payments.map((payment, index) => (
//                   <SwiperSlide key={index}>
//                     <div className="flex h-20 items-center justify-center rounded-2xl border border-slate-100 bg-white p-3 shadow-sm">
//                       <Image
//                         src={payment}
//                         alt={`Payment method ${index + 1}`}
//                         sizes="96px"
//                         className="max-h-10 w-auto object-contain"
//                       />
//                     </div>
//                   </SwiperSlide>
//                 ))}
//               </Swiper>

//               <div className="mt-6 flex gap-3">
//                 <button
//                   type="button"
//                   className={navBtn}
//                   onClick={() => swiperRefThree.current?.slidePrev()}
//                 >
//                   <FaArrowLeftLong />
//                 </button>

//                 <button
//                   type="button"
//                   className={navBtn}
//                   onClick={() => swiperRefThree.current?.slideNext()}
//                 >
//                   <FaArrowRightLong />
//                 </button>
//               </div>
//             </div>

//             <div className="hidden lg:col-span-4 lg:block">
//               <Image
//                 src={homePay}
//                 alt="Secure payment"
//                 sizes="33vw"
//                 className="h-auto w-full rounded-2xl object-cover shadow-lg"
//               />
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* Blog */}
//       <section className={cn(section, "bg-white")}>
//         <div className={container}>
//           <SectionHeading small="Blog" title="News and Insights" />

//           <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-4">
//             {[1, 2, 3, 4].map((item) => (
//               <div
//                 key={item}
//                 className={cn(
//                   "overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-sm",
//                   cardHover,
//                 )}
//               >
//                 <Image
//                   src={blogImg}
//                   alt="Blog thumbnail"
//                   sizes="(max-width: 768px) 100vw, 25vw"
//                   className="h-40 w-full object-cover"
//                 />

//                 <div className="p-4">
//                   <h4 className="text-base font-black leading-6 text-blue-900">
//                     <Link href="#">
//                       10 Tips to Pass Your Driving Test on the First Try
//                     </Link>
//                   </h4>

//                   <p className="mt-2 text-sm font-medium leading-6 text-slate-600">
//                     Nervous about your road test? Discover practical tips,
//                     common...
//                   </p>

//                   <div className="mt-4">
//                     <Link href="#" className={outlineBtn}>
//                       Read More
//                     </Link>
//                   </div>
//                 </div>
//               </div>
//             ))}
//           </div>

//           <div className="mt-8 text-center">
//             <Link href="/blogs" className={primaryBtn}>
//               Learn More
//             </Link>
//           </div>
//         </div>
//       </section>

//       <Footer />
//     </>
//   );
// }

"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { toast } from "sonner";

import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";

import { Autoplay, FreeMode, Navigation } from "swiper/modules";

import Footer from "@/components/footer";
import Navbar from "@/components/navbar";
import Testimonials from "@/components/testimonials";
import { createContactSubmission, getBlogs, getFaqs, getPublicTeachers } from "@/features/API";
import useCurrentLanguage from "@/hooks/useCurrentLanguage";
import { mediaUrl } from "@/utils/mediaUrl";

import blogImg from "../../public/image/blog.jpg";
import heroBg from "../../public/image/hero-bg.jpg";
import broomLogo from "../../public/image/broomLogo.png";
import carAnime from "../../public/image/car-animate.gif";
import googleLogo from "../../public/image/googleLogo.png";
import homePay from "../../public/image/home-pay.jpg";
import trustLogo from "../../public/image/trustLogo.png";

import payment1 from "../../public/image/payment1.jpg";
import payment2 from "../../public/image/payment2.jpg";
import payment3 from "../../public/image/payment3.jpg";
import payment4 from "../../public/image/payment4.jpg";
import payment5 from "../../public/image/payment5.jpg";
import payment6 from "../../public/image/payment6.jpg";
import payment7 from "../../public/image/payment7.jpg";
import payment8 from "../../public/image/payment8.jpg";

import instruc1 from "../../public/image/instrac1.png";
import instruc2 from "../../public/image/instrac2.png";
import instruc3 from "../../public/image/instrac3.png";
import instruc4 from "../../public/image/instrac4.png";
import drivingInstructor from "../../public/image/driving-instructor.webp";

import hser1 from "../../public/image/hser1.png";
import hser2 from "../../public/image/hser2.png";
import hser3 from "../../public/image/hser3.png";
import hser4 from "../../public/image/hser4.png";
import hser5 from "../../public/image/hser5.png";
import hser6 from "../../public/image/hser6.png";
import hser7 from "../../public/image/hser7.png";
import hser8 from "../../public/image/hser8.png";
import hser9 from "../../public/image/hser9.png";

import indicator1 from "../../public/image/indicate1.png";
import indicator2 from "../../public/image/indicate2.png";
import indicator3 from "../../public/image/indicate3.png";
import indicator4 from "../../public/image/indicate4.png";

import batch from "../../public/image/hero-batch.png";

import { FaStar } from "react-icons/fa";
import { FaArrowLeftLong, FaArrowRightLong } from "react-icons/fa6";

const cn = (...classes) => classes.filter(Boolean).join(" ");

const container = "mx-auto max-w-[1320px] px-4 sm:px-5 lg:px-6";
const section = "py-9 md:py-12 lg:py-14";

const badge =
  "inline-flex items-center rounded-full bg-white px-3.5 py-1.5 text-[15px] font-bold tracking-wide text-orange-500 shadow-sm ring-1 ring-slate-100";

const primaryBtn =
  "inline-flex items-center justify-center rounded-full bg-blue-600 px-5 py-2.5 text-sm font-bold text-white shadow-sm transition duration-300 hover:bg-blue-900 hover:shadow-md";

const outlineBtn =
  "inline-flex items-center justify-center rounded-full border border-blue-600 bg-white px-5 py-2.5 text-sm font-bold text-blue-900 transition duration-300 hover:bg-blue-600 hover:text-white hover:shadow-md";

const inputClass =
  "w-full rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 text-sm font-medium text-slate-800 shadow-sm outline-none placeholder:text-slate-400 focus:border-blue-600 focus:ring-4 focus:ring-blue-100";

const navBtn =
  "flex h-10 w-10 items-center justify-center rounded-full bg-white text-sm text-blue-900 shadow-sm ring-1 ring-slate-100 transition duration-300 hover:bg-blue-600 hover:text-white hover:shadow-md";

const cardHover =
  "transition duration-300 hover:-translate-y-1 hover:border-blue-100 hover:shadow-xl";

const indicators = [
  { img: indicator1, title: "Moniteur diplômé" },
  { img: indicator2, title: "+ 500 d’élève réussites" },
  { img: indicator3, title: "Certifié Qualiopi" },
  { img: indicator4, title: "Écoles de conduite labellisées" },
];

const services = [
  { img: hser1, title: "Permis B Conduite Manuelle", price: "20hr - 990£" },
  { img: hser2, title: "Permis B Conduite Automatique", price: "20hr - 990£" },
  { img: hser3, title: "Conduite Accompagnee", price: "20hr - 990£" },
  { img: hser4, title: "Supervised driving (AAC)", price: "20hr - 990£" },
  { img: hser5, title: "Code en salle", price: "20hr - 990£" },
  { img: hser6, title: "Code en ligne", price: "20hr - 990£" },
  { img: hser7, title: "Conduite Supervisee", price: "20hr - 990£" },
  { img: hser8, title: "Permis Accelere", price: "20hr - 990£" },
  { img: hser9, title: "Code Accelere", price: "20hr - 990£" },
];

const localizedHomeContent = {
  en: {
    heroTitle: "Drive toward freedom with PermisGo",
    servicesLabel: "Services",
    servicesTitle: "Your driving licence with PermisGo",
    learnMore: "Learn more",
    viewServices: "View Other Services",
    blogLabel: "Blog", blogTitle: "News and Insights", readMore: "Read More", viewBlogs: "View All Blogs",
    serviceTitles: ["Manual category B licence", "Automatic category B licence", "Accompanied driving", "Supervised driving (AAC)", "Classroom Highway Code", "Online Highway Code", "Supervised driving", "Accelerated licence", "Accelerated Highway Code"],
  },
  bn: {
    heroTitle: "PermisGo-এর সঙ্গে স্বাধীনতার পথে গাড়ি চালান",
    servicesLabel: "সেবাসমূহ",
    servicesTitle: "PermisGo-এর সঙ্গে আপনার ড্রাইভিং লাইসেন্স",
    learnMore: "আরও জানুন",
    viewServices: "অন্যান্য সেবা দেখুন",
    blogLabel: "ব্লগ", blogTitle: "সংবাদ ও গুরুত্বপূর্ণ তথ্য", readMore: "আরও পড়ুন", viewBlogs: "সব ব্লগ দেখুন",
    serviceTitles: ["ম্যানুয়াল ক্যাটাগরি বি লাইসেন্স", "অটোমেটিক ক্যাটাগরি বি লাইসেন্স", "সহযোগী ড্রাইভিং", "তত্ত্বাবধানে ড্রাইভিং (AAC)", "ক্লাসরুম হাইওয়ে কোড", "অনলাইন হাইওয়ে কোড", "তত্ত্বাবধানে ড্রাইভিং", "দ্রুত লাইসেন্স কোর্স", "দ্রুত হাইওয়ে কোড"],
  },
  fr: {
    heroTitle: "Conduisez vers la liberté avec PermisGo",
    servicesLabel: "Services",
    servicesTitle: "Votre permis de conduire avec PermisGo",
    learnMore: "En savoir plus",
    viewServices: "Voir les autres services",
    blogLabel: "Blog", blogTitle: "Actualités et conseils", readMore: "Lire la suite", viewBlogs: "Voir tous les articles",
    serviceTitles: ["Permis B conduite manuelle", "Permis B conduite automatique", "Conduite accompagnée", "Conduite supervisée (AAC)", "Code en salle", "Code en ligne", "Conduite supervisée", "Permis accéléré", "Code accéléré"],
  },
};

const banglaDigits = (value) => String(value).replace(/\d/g, (digit) => "০১২৩৪৫৬৭৮৯"[Number(digit)]);
const localizedHomePrice = (value, language) => {
  if (language !== "bn") return value;
  if (value === "20hr - 990£") return "২০ ঘণ্টা - ৯৯০£";
  return banglaDigits(value);
};

const instructors = [
  instruc1,
  instruc2,
  instruc3,
  instruc4,
  instruc2,
  instruc3,
  instruc1,
  instruc2,
  instruc3,
  instruc1,
];

const reviews = [
  { img: broomLogo, title: "VroomVroom" },
  { img: googleLogo, title: "Google Ratings" },
  { img: trustLogo, title: "Trustpilot Ratings" },
];

const payments = [
  payment1,
  payment2,
  payment3,
  payment4,
  payment5,
  payment6,
  payment7,
  payment8,
];

const mapTabs = [
  { key: "manual", title: "Manual Transmission" },
  { key: "auto", title: "Automatic Transmission" },
  { key: "accelerated", title: "Accelerated" },
  { key: "motorcycle", title: "Motorcycle" },
];

const fallbackFaqs = [
  {
    q: "Accordion Item #1",
    a: "This is the first item's accordion body. It is shown by default, until the collapse plugin adds the appropriate classes that we use to style each element.",
  },
  {
    q: "Accordion Item #2",
    a: "This is the second item's accordion body. It is hidden by default, until the collapse plugin adds the appropriate classes that we use to style each element.",
  },
  {
    q: "Accordion Item #3",
    a: "This is the third item's accordion body. It is hidden by default, until the collapse plugin adds the appropriate classes that we use to style each element.",
  },
  {
    q: "Accordion Item #4",
    a: "This is the fourth item's accordion body. It is hidden by default, until the collapse plugin adds the appropriate classes that we use to style each element.",
  },
  {
    q: "Accordion Item #5",
    a: "This is the fifth item's accordion body. It is hidden by default, until the collapse plugin adds the appropriate classes that we use to style each element.",
  },
];

const mapSrc =
  "https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d9627.36559924592!2d2.3512118557895323!3d48.86432615404459!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2sbd!4v1775120702448!5m2!1sen!2sbd";

function SectionHeading({ small, title, desc }) {
  return (
    <div className="mx-auto mb-7 max-w-2xl text-center md:mb-9">
      <h5 className={badge}>{small}</h5>

      <h2 className="mt-3 text-2xl font-black leading-tight tracking-tight text-blue-900 sm:text-3xl lg:text-4xl">
        {title}
      </h2>

      {desc && (
        <p className="mx-auto mt-2 max-w-xl text-sm font-medium leading-6 text-slate-600">
          {desc}
        </p>
      )}
    </div>
  );
}

function Stars({ center = true }) {
  return (
    <ul
      className={cn(
        "flex gap-1 text-sm text-yellow-400",
        center && "justify-center",
      )}
    >
      {[1, 2, 3, 4, 5].map((item) => (
        <li key={item}>
          <FaStar />
        </li>
      ))}
    </ul>
  );
}

export default function Home() {
  const language = useCurrentLanguage();
  const homeContent = localizedHomeContent[language] || localizedHomeContent.en;
  const router = useRouter();
  const { token, user, role } = useSelector((state) => state.user);
  const swiperRefOne = useRef(null);
  const swiperRefThree = useRef(null);

  const handleOfferNavigation = (event) => {
    event.preventDefault();

    const isLoggedIn =
      typeof window !== "undefined" && Boolean(localStorage.getItem("token"));

    router.push(isLoggedIn ? "/student/offers" : "/user-login");
  };

  const instructorInfo = [
    {
      name: "Robert Fox",
      experience: "05 Years+",
    },
    {
      name: "Ronald Richards",
      experience: "05 Years+",
    },
    {
      name: "Arlene McCoy",
      experience: "05 Years+",
    },
    {
      name: "Bessie Cooper",
      experience: "05 Years+",
    },
  ];

  const [activeInstructor, setActiveInstructor] = useState(0);

  const [activeTab, setActiveTab] = useState("manual");
  const [openFaq, setOpenFaq] = useState(0);
  const [homeBlogs, setHomeBlogs] = useState([]);
  const [homeFaqs, setHomeFaqs] = useState([]);
  const [homeFaqLoading, setHomeFaqLoading] = useState(true);
  const [homeFaqError, setHomeFaqError] = useState("");
  const [teacherSearch, setTeacherSearch] = useState("");
  const [nearbyTeachers, setNearbyTeachers] = useState([]);
  const [selectedNearbyTeacher, setSelectedNearbyTeacher] = useState(null);
  const [teacherSearchLoading, setTeacherSearchLoading] = useState(false);
  const [teacherSearchDone, setTeacherSearchDone] = useState(false);
  const [homeInstructors, setHomeInstructors] = useState([]);
  const [homeInstructorsLoading, setHomeInstructorsLoading] = useState(true);
  const [contactForm, setContactForm] = useState({ firstName:"",lastName:"",email:"",phone:"",subject:"",location:"",description:"" });
  const [contactSubmitting, setContactSubmitting] = useState(false);
  const updateContact = (event) => setContactForm((current) => ({ ...current, [event.target.name]: event.target.value }));
  const submitContact = async (event) => { event.preventDefault(); setContactSubmitting(true); try { await createContactSubmission(contactForm); setContactForm({ firstName:"",lastName:"",email:"",phone:"",subject:"",location:"",description:"" }); toast.success("Your message has been sent successfully."); } catch (error) { toast.error(error.response?.data?.message || "Your message could not be sent."); } finally { setContactSubmitting(false); } };

  const dynamicMapSrc = useMemo(() => {
    const location = selectedNearbyTeacher?.locations?.[0];
    const latitude = Number(
      location?.coordinates?.lat ?? location?.geoLocation?.coordinates?.[1],
    );
    const longitude = Number(
      location?.coordinates?.lng ?? location?.geoLocation?.coordinates?.[0],
    );
    const mapQuery =
      Number.isFinite(latitude) && Number.isFinite(longitude)
        ? `${latitude},${longitude}`
        : [location?.address, location?.city, location?.postalCode]
            .filter(Boolean)
            .join(", ");
    return mapQuery
      ? `https://www.google.com/maps?q=${encodeURIComponent(mapQuery)}&z=14&output=embed`
      : mapSrc;
  }, [selectedNearbyTeacher]);

  const findNearbyTeachers = async () => {
    setTeacherSearchLoading(true);
    setTeacherSearchDone(true);
    try {
      const vehicleType =
        activeTab === "manual"
          ? "manual"
          : activeTab === "auto"
            ? "automatic"
            : undefined;
      const response = await getPublicTeachers(
        vehicleType ? { vehicleType } : {},
      );
      const query = teacherSearch.trim().toLowerCase();
      const teachers = (response.data?.data || []).filter((teacher) => {
        if (!query) return true;
        const searchable = [
          teacher.user?.name,
          teacher.user?.city,
          teacher.user?.address,
          ...(teacher.locations || []).flatMap((location) => [
            location.title,
            location.address,
            location.city,
            location.postalCode,
          ]),
        ]
          .filter(Boolean)
          .join(" ")
          .toLowerCase();
        return searchable.includes(query);
      });
      setNearbyTeachers(teachers);
      setSelectedNearbyTeacher(teachers[0] || null);
    } catch (error) {
      setNearbyTeachers([]);
      setSelectedNearbyTeacher(null);
      toast.error(
        error.response?.data?.message || "Instructors could not be loaded.",
      );
    } finally {
      setTeacherSearchLoading(false);
    }
  };

  const bookTeacherFromHome = (teacher = selectedNearbyTeacher) => {
    const teacherId = teacher?.user?._id;
    if (!teacherId) return;
    const bookingPath = `/student/driving-operation/book-lesson?teacherId=${teacherId}`;
    if (!token) {
      sessionStorage.setItem("postLoginRedirect", bookingPath);
      router.push("/login/student");
      return;
    }
    const currentRole = user?.role || role;
    if (currentRole !== "student") {
      toast.error("Only student accounts can book an instructor.");
      return;
    }
    router.push(bookingPath);
  };

  useEffect(() => {
    if (!language) return;
    let active = true;
    getBlogs({ limit: 4, lang: language })
      .then(({ data }) => { if (active) setHomeBlogs(data?.data || []); })
      .catch(() => { if (active) setHomeBlogs([]); });
    return () => { active = false; };
  }, [language]);

  useEffect(() => {
    getPublicTeachers()
      .then((response) =>
        setHomeInstructors(
          Array.isArray(response.data?.data) ? response.data.data : [],
        ),
      )
      .catch(() => setHomeInstructors([]))
      .finally(() => setHomeInstructorsLoading(false));
  }, []);

  useEffect(() => {
    if (!language) return;
    let active = true;
    setHomeFaqLoading(true);
    setHomeFaqError("");
    getFaqs({ section: "home", lang: language })
      .then(({ data }) => {
        if (!active) return;
        const items = (data?.data || []).map((item) => ({ q: item.question, a: item.answer, id: item._id }));
        setHomeFaqs(items);
        setOpenFaq(items.length ? 0 : null);
      })
      .catch(() => {
        if (!active) return;
        setHomeFaqs([]);
        setHomeFaqError("FAQs could not be loaded. Please try again.");
      })
      .finally(() => { if (active) setHomeFaqLoading(false); });
    return () => { active = false; };
  }, [language]);

  return (
    <div className="permisgo-page">
      <Navbar />

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-[#08275f]">
        {/* Background image */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url(${heroBg.src})`,
          }}
        />

        {/* Very light overlay */}
        <div className="pointer-events-none absolute inset-0 bg-[#00132f]/10" />

        <div className="relative z-10 mx-auto w-full max-w-[1320px] px-5 sm:px-7 lg:px-8">
          <div className="relative min-h-[610px] py-8 sm:py-10 lg:h-[610px] lg:py-[30px]">
            {/* Left content */}
            <div className="relative z-20 w-full lg:w-[59%]">
              {/* Approval badge */}
              <div className="inline-flex min-h-[28px] items-center justify-center rounded-full bg-gradient-to-r from-[#2476ef] to-[#a142e9] px-4 py-1.5 shadow-md">
                <span className="text-[10px] font-bold leading-none text-white sm:text-[11px]">
                  Approved by the prefecture E 25 093 0029 0
                </span>
              </div>

              {/* Heading */}
              <h1 data-no-translate className="mt-3 max-w-[680px] text-[31px] font-black leading-[1.12] tracking-[-0.7px] text-white drop-shadow-sm sm:text-[36px] lg:text-[39px] xl:text-[42px]">
                {homeContent.heroTitle}
              </h1>

              {/* Description */}
              <p className="mt-6 max-w-[460px] text-[12px] font-medium leading-5 text-white/95 sm:text-[13px]">
                Comprehensive training, guaranteed safety.
              </p>

              {/* Main button */}
              <div className="mt-4">
                <Link
                  href="/user-login"
                  onClick={handleOfferNavigation}
                  className="inline-flex h-[39px] items-center justify-center rounded-[7px] bg-[#ef233c] px-[19px] text-[11px] font-extrabold text-white shadow-md transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#d71934] hover:shadow-lg"
                >
                  Start the courses
                </Link>
              </div>

              {/* Offer cards */}
              <div className="mt-7 flex w-full max-w-[345px] flex-col gap-3">
                {[
                  {
                    title: "Driving License 13H From",
                    oldPrice: "€850",
                    price: "€749",
                  },
                  {
                    title: "Highway Code from",
                    oldPrice: "€50",
                    price: "€30",
                  },
                ].map((offer, index) => (
                  <div
                    key={offer.title}
                    className="relative min-h-[112px] overflow-hidden rounded-[9px] border border-[#9ab8ea] bg-[#05275c]/45 px-4 py-3 text-white shadow-[0_8px_25px_rgba(0,0,0,0.12)] backdrop-blur-[1px]"
                  >
                    {/* Card top */}
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <h4 className="text-[13px] font-extrabold leading-[18px] text-white">
                          {offer.title}
                        </h4>

                        <p data-no-translate className="mt-1 text-[11px] font-bold text-[#27d26b] line-through">
                          {localizedHomePrice(offer.oldPrice, language)}
                        </p>
                      </div>

                      <Image
                        src={batch}
                        alt={`${offer.title} badge`}
                        sizes="40px"
                        className="h-auto w-[36px] shrink-0 opacity-80"
                      />
                    </div>

                    {/* Card bottom */}
                    <div className="mt-3 flex items-end justify-between gap-4">
                      <div>
                        <p className="text-[9px] font-medium leading-none text-white/80">
                          of the
                        </p>

                        <h3 data-no-translate className="mt-1 text-[22px] font-black leading-none text-white">
                          {localizedHomePrice(offer.price, language)}
                        </h3>
                      </div>

                      <Link
                        href="/user-login"
                        onClick={handleOfferNavigation}
                        className="inline-flex h-[31px] items-center justify-center rounded-[7px] bg-[#ef233c] px-[14px] text-[10px] font-extrabold text-white shadow-sm transition-all duration-300 hover:bg-[#d71934] hover:shadow-md"
                      >
                        Permit Offer
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right car image */}
            <div className="relative z-10 mt-10 flex w-full items-end justify-center lg:absolute lg:bottom-0 lg:right-[-15px] lg:mt-0 lg:h-full lg:w-[58%] lg:justify-end">
              <Image
                src={carAnime}
                alt="Driving school car"
                priority
                sizes="(max-width: 1024px) 100vw, 58vw"
                className="h-auto w-full max-w-[680px] object-contain object-bottom lg:max-h-[500px] xl:max-w-[750px]"
              />
            </div>
          </div>

        </div>
      </section>

      {/* Indicators */}
      <section className="bg-white pb-20 pt-[72px]">
        <div className="mx-auto w-full max-w-[1260px] px-5 xl:px-0">
          {/* Trust Indicator label */}
          <div className="flex justify-center">
            <div className="flex h-[42px] items-center justify-center rounded-[10px] bg-[#E7ECF4] px-[18px]">
              <span className="text-[15px] font-semibold leading-none text-[#2BBF3A]">
                Trust Indicator
              </span>
            </div>
          </div>

          {/* Indicator cards */}
          <div className="mt-12 grid grid-cols-1 gap-6 px-2 sm:grid-cols-2 lg:grid-cols-4 lg:gap-10 lg:px-0">
            {indicators.map((item, index) => (
              <div
                key={item.title || index}
                className="h-[112px] rounded-[18px] bg-[#E7ECF4] [transform:skewX(-8deg)]"
              >
                <div className="flex h-full items-center gap-4 px-8 [transform:skewX(8deg)] lg:px-10">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center">
                    <Image
                      src={item.img}
                      alt={item.title}
                      sizes="48px"
                      className="h-auto max-h-12 w-auto max-w-12 object-contain"
                    />
                  </div>

                  <h4 className="text-[16px] font-semibold leading-[22px] text-[#111111]">
                    {item.title}
                  </h4>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* Services */}
      <section data-no-translate className="bg-white py-[60px] md:py-[78px]">
        <div className="mx-auto w-full max-w-[1320px] px-4 sm:px-6">
          {/* Section heading */}
          <div className="text-center">
            <span className="inline-flex min-h-[30px] items-center justify-center rounded-[7px] bg-[#E7ECF4] px-[14px] text-[15px] font-semibold text-[#20C943]">
              {homeContent.servicesLabel}
            </span>

            <h2 className="mt-5 text-[25px] font-extrabold leading-tight text-[#202020] md:text-[33px]">
              {homeContent.servicesTitle}
            </h2>
          </div>

          {/* Services grid */}
          <div className="relative mt-[42px]">
            {/* Dotted connector line – second row */}
            <div className="pointer-events-none absolute left-[21%] right-[21%] top-[350px] z-0 hidden border-t-2 border-dotted border-[#168BFF] xl:block" />

            <div className="relative z-10 grid grid-cols-1 gap-[18px] sm:grid-cols-2 xl:grid-cols-3">
              {services.map((service, index) => (
                <div
                  key={service.title || index}
                  className={cn(
                    "group relative flex min-h-[280px] flex-col items-center justify-center overflow-hidden rounded-[8px] bg-[#E7ECF4] px-5 py-8 text-center",
                    "transition-all duration-300 hover:-translate-y-1 hover:shadow-lg",
                  )}
                >
                  {/* Service icon */}
                  <div className="flex h-[70px] w-[78px] items-center justify-center">
                    <Image
                      src={service.img}
                      alt=""
                      sizes="78px"
                      className="max-h-[70px] w-auto max-w-[78px] object-contain"
                    />
                  </div>

                  {/* Service title */}
                  <h4 className="mt-5 min-h-[42px] max-w-[240px] text-[17px] font-extrabold leading-[21px] text-[#101010]">
                    {homeContent.serviceTitles[index] || service.title}
                  </h4>

                  {/* Price */}
                  <p className="mt-1 text-[18px] font-bold leading-5 text-[#16C53A]">
                    {localizedHomePrice(service.price, language)}
                  </p>

                  {/* Button */}
                  <Link
                    href={service.href || "/contact-us"}
                    className={cn(
                      "mt-5 inline-flex min-h-[38px] items-center justify-center rounded-[7px]",
                      "border border-[#064CB5] px-[18px]",
                      "text-[12px] font-bold text-[#F02036]",
                      "transition-all duration-300",
                      "hover:border-[#ED1F3B] hover:bg-[#ED1F3B] hover:text-white",
                      "focus:outline-none focus:ring-2 focus:ring-[#ED1F3B]/30",
                    )}
                  >
                    {homeContent.learnMore}
                  </Link>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-10 flex justify-center">
            <Link
              href="/services"
              className="inline-flex min-h-[42px] items-center justify-center rounded-[8px] bg-[#E2233D] px-7 text-[13px] font-extrabold text-white shadow-md transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#174A9B]"
            >
              {homeContent.viewServices}
            </Link>
          </div>
        </div>
      </section>

      {/* Location */}
      <section className="bg-[#F7F9FC] py-[60px] md:py-[80px]">
        <div className="mx-auto w-full max-w-[1320px] px-4 sm:px-6 lg:px-8">
          {/* Heading */}
          <div className="mb-[46px] text-center">
            <span className="inline-flex min-h-[28px] items-center justify-center rounded-[7px] bg-[#E8EDF4] px-[13px] text-[15px] font-semibold text-[#20C943]">
              Location
            </span>

            <h2 className="mt-5 text-[26px] font-extrabold leading-tight text-[#202020] md:text-[33px]">
              Permisgo near you
            </h2>

            <p className="mt-4 text-[12px] font-medium text-[#555B65] md:text-[15px]">
              Lessons near your home, your work, your school… we&apos;re
              everywhere!
            </p>
          </div>

          <div className="grid grid-cols-1 gap-6 lg:grid-cols-12 lg:items-start">
            {/* Left side */}
            <div className="lg:col-span-5">
              {/* Search */}
              <div className="relative">
                <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2">
                  <svg
                    width="19"
                    height="19"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <circle
                      cx="11"
                      cy="11"
                      r="7"
                      stroke="#68717E"
                      strokeWidth="1.7"
                    />
                    <path
                      d="M16.5 16.5L21 21"
                      stroke="#68717E"
                      strokeWidth="1.7"
                      strokeLinecap="round"
                    />
                  </svg>
                </span>

                <input
                  type="text"
                  value={teacherSearch}
                  onChange={(event) => setTeacherSearch(event.target.value)}
                  onKeyDown={(event) => {
                    if (event.key === "Enter") findNearbyTeachers();
                  }}
                  placeholder="Search by address, city..."
                  className="h-[50px] w-full rounded-[10px] border-0 bg-[#E8EBF0] pl-12 pr-4 text-[13px] font-medium text-[#30343B] outline-none placeholder:text-[#707782] focus:ring-2 focus:ring-[#174FA5]/20"
                />
              </div>

              {/* Vehicle type */}
              <div className="mt-8">
                <h4 className="mb-4 text-[17px] font-extrabold leading-6 text-[#17191D]">
                  Find lessons based on your vehicle type
                </h4>

                <div className="rounded-[10px] bg-[#E9EDF5] p-4">
                  <div className="grid grid-cols-2 gap-3">
                    {mapTabs.map((tab) => (
                      <button
                        key={tab.key}
                        type="button"
                        onClick={() => setActiveTab(tab.key)}
                        className={cn(
                          "flex min-h-[39px] items-center justify-center rounded-[8px] border px-3",
                          "text-center text-[11px] lg:text-[13px] font-bold leading-4 transition-all duration-300",
                          activeTab === tab.key
                            ? "border-[#174FA5] bg-[#B8C9E5] text-[#12458D]"
                            : "border-transparent bg-white text-[#17191D] hover:border-[#174FA5] hover:text-[#174FA5]",
                        )}
                      >
                        {tab.title}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Available teacher */}
              <div className="mt-8">
                <h4 className="mb-4 text-[16px] font-extrabold leading-6 text-[#17191D]">
                  Find lessons based on available teacher near you
                </h4>

                <div className="rounded-[10px] bg-[#E9EDF5] p-4">
                  <button
                    type="button"
                    onClick={findNearbyTeachers}
                    disabled={teacherSearchLoading}
                    className="flex h-[42px] w-full items-center justify-center rounded-[8px] border border-[#174FA5] bg-[#B8C9E5] px-4 text-[13px] font-bold text-[#123F7A] transition duration-300 hover:bg-[#174FA5] hover:text-white"
                  >
                    {teacherSearchLoading ? "Searching..." : "Start Searching"}
                  </button>
                  {teacherSearchDone && (
                    <div className="mt-3 max-h-[190px] space-y-2 overflow-y-auto">
                      {nearbyTeachers.map((teacher) => (
                        <button key={teacher.user?._id} type="button" onClick={() => setSelectedNearbyTeacher(teacher)} className={cn("flex w-full items-center gap-3 rounded-[8px] border bg-white p-2 text-left transition", selectedNearbyTeacher?.user?._id === teacher.user?._id ? "border-[#174FA5] ring-2 ring-[#174FA5]/10" : "border-transparent hover:border-[#b8c9e5]")}>
                          {teacher.user?.avatar ? <img src={mediaUrl(teacher.user.avatar)} alt={teacher.user.name || "Instructor"} className="h-9 w-9 rounded-full object-cover" /> : <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[#d9e5f4] text-xs font-black text-[#174fa5]">{(teacher.user?.name || "I").charAt(0)}</span>}
                          <span className="min-w-0"><span className="block truncate text-xs font-extrabold text-[#174fa5]">{teacher.user?.name || "Driving Instructor"}</span><span className="block truncate text-[10px] text-slate-500">{teacher.locations?.[0]?.address || teacher.locations?.[0]?.city || "Location available"}</span></span>
                        </button>
                      ))}
                      {!nearbyTeachers.length && !teacherSearchLoading && <p className="rounded-lg bg-white p-3 text-center text-xs text-slate-500">No available instructor found.</p>}
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Map side */}
            <div className="lg:col-span-7">
              <div className="relative min-h-[430px] overflow-hidden rounded-[8px] bg-[#DDE8EC]">
                <iframe
                  key={dynamicMapSrc}
                  src={dynamicMapSrc}
                  width="100%"
                  height="430"
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="block h-[430px] w-full border-0"
                  title="Permisgo location map"
                />

                {/* Teacher information card */}
                {selectedNearbyTeacher && <div className="absolute bottom-5 right-5 w-[300px] max-w-[calc(100%-40px)] rounded-[12px] border-2 border-[#174FA5] bg-white p-3 shadow-[0_12px_35px_rgba(15,44,88,0.24)]">
                  {/* Card top */}
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      {selectedNearbyTeacher.user?.avatar ? <img src={mediaUrl(selectedNearbyTeacher.user.avatar)} alt={selectedNearbyTeacher.user?.name || "Instructor"} className="h-[46px] w-[46px] shrink-0 rounded-full object-cover" /> : <div className="flex h-[46px] w-[46px] shrink-0 items-center justify-center overflow-hidden rounded-full bg-[#D9E5F4] text-[12px] font-extrabold text-[#174FA5]">{(selectedNearbyTeacher.user?.name || "I").charAt(0)}</div>}

                      <div>
                        <h4 className="text-[13px] font-extrabold text-[#174FA5]">
                          {selectedNearbyTeacher.user?.name || "Driving Instructor"}
                        </h4>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <div className="text-right">
                        <p className="text-[10px] font-semibold text-[#555B65]">
                          Experience {Number(selectedNearbyTeacher.experienceYears || 0)} Years+
                        </p>

                        <div className="mt-1 text-[12px] leading-none tracking-[2px] text-[#174FA5]">
                          ★★★★★
                        </div>
                      </div>

                      <button
                        type="button"
                        onClick={() => setSelectedNearbyTeacher(null)}
                        aria-label="Close teacher card"
                        className="flex h-5 w-5 items-center justify-center text-[18px] font-medium leading-none text-[#272B30]"
                      >
                        ×
                      </button>
                    </div>
                  </div>

                  {/* Instructor details */}
                  <div className="mt-3 rounded-[8px] bg-[#EEF1F6] px-3 py-3">
                    <p className="mb-3 text-[10px] font-medium text-[#7B828D]">
                      Available location and vehicle
                    </p>
                    <p className="text-[10px] font-semibold text-[#333840]">{selectedNearbyTeacher.locations?.[0]?.address || selectedNearbyTeacher.locations?.[0]?.city || "Location available during booking"}</p>
                    <p className="mt-2 text-[10px] font-semibold capitalize text-[#333840]">{selectedNearbyTeacher.vehicles?.map((vehicle) => vehicle.vehicleType).filter((value, index, list) => list.indexOf(value) === index).join(" · ") || "Vehicle available"}</p>
                  </div>

                  <button
                    type="button"
                    onClick={bookTeacherFromHome}
                    className="mt-3 flex h-[40px] w-full items-center justify-center rounded-[7px] bg-[#E9243F] px-4 text-[10px] font-extrabold text-white transition duration-300 hover:bg-[#C91831]"
                  >
                    Book Now
                  </button>
                </div>}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Instructors */}
      <section className="overflow-hidden bg-[#F5F7FA] pb-[82px] pt-[10px]">
        <div className="mx-auto w-full max-w-[1320px] px-4 xl:px-0">
          {/* Heading */}
          <div className="mb-[54px] text-center">
            <span className="inline-flex h-[38px] min-w-[100px] items-center justify-center rounded-[8px] bg-[#E7ECF4] px-4 text-[15px] font-medium leading-none text-[#28C34B]">
              Instructors
            </span>

            <h2 className="mt-[22px] text-[27px] font-extrabold leading-[38px] text-[#171717] md:text-[31px]">
              You&apos;ll love our instructors
            </h2>
          </div>

          <Swiper
            slidesPerView={1}
            slidesPerGroup={1}
            spaceBetween={24}
            speed={600}
            watchOverflow={true}
            loop={homeInstructors.length > 4}
            autoplay={{
              delay: 3000,
              disableOnInteraction: false,
            }}
            breakpoints={{
              480: {
                slidesPerView: 2,
                spaceBetween: 18,
              },
              768: {
                slidesPerView: 3,
                spaceBetween: 20,
              },
              1024: {
                slidesPerView: 4,
                spaceBetween: 24,
              },
            }}
            modules={[Autoplay, Navigation]}
            onSwiper={(swiper) => {
              swiperRefOne.current = swiper;
              setActiveInstructor(swiper.realIndex);
            }}
            onSlideChange={(swiper) => {
              setActiveInstructor(swiper.realIndex);
            }}
            className="w-full"
          >
            {homeInstructors.map((teacher, index) => {
              const teacherName = teacher.user?.name || "Driving Instructor";
              const rating = Math.max(0, Math.min(5, Number(teacher.rating?.average || 0)));
              const isActive = activeInstructor === index;

              return (
                <SwiperSlide key={teacher.user?._id || index} className="h-auto">
                  <div
                    className={cn(
                      "box-border flex h-[308px] w-full flex-col items-center",
                      "rounded-[10px] border-2 bg-[#E7ECF4]",
                      "px-[24px] pb-[20px] pt-[24px] text-center",
                      "transition-colors duration-300",
                      isActive ? "border-[#245AA8]" : "border-transparent",
                    )}
                  >
                    {/* Fixed avatar wrapper */}
                    <div className="relative h-[64px] w-[64px] shrink-0 overflow-hidden rounded-full">
                      {teacher.user?.avatar ? <img src={mediaUrl(teacher.user.avatar)} alt={teacherName} className="h-full w-full rounded-full object-cover" /> : <span className="flex h-full w-full items-center justify-center bg-[#d9e5f4] text-lg font-black text-[#174fa5]">{teacherName.charAt(0)}</span>}
                    </div>

                    {/* Name */}
                    <h4 className="mt-[22px] text-[15px] font-extrabold leading-[20px] text-[#123E8C]">
                      {teacherName}
                    </h4>

                    {/* Experience box */}
                    <div className="mt-[17px] flex h-[88px] w-full shrink-0 flex-col items-center justify-center rounded-[8px] bg-white px-3">
                      <p className="text-[11px] font-normal leading-[16px] text-[#70747B]">
                        Experience{" "}
                        <span className="font-extrabold text-[#20242A]">
                          {Number(teacher.experienceYears || 0)} Years+
                        </span>
                      </p>

                      <div className="mt-[10px] flex items-center justify-center gap-[7px] text-[12px] leading-none text-[#123E8C]">
                        {[0, 1, 2, 3, 4].map((star) => <FaStar key={star} className={star < Math.round(rating) ? "" : "text-slate-300"} />)}
                      </div>
                    </div>

                    {/* Buttons */}
                    <div className="mt-[15px] grid w-full grid-cols-2 gap-[13px]">
                      <button
                        type="button"
                        onClick={() => bookTeacherFromHome(teacher)}
                        className="flex h-[38px] items-center justify-center rounded-[6px] border border-[#D72638] bg-[#D72638] px-2 text-[10px] font-bold leading-none text-white transition-colors duration-300 hover:bg-[#B91F30]"
                      >
                        Book Now
                      </button>

                      <button
                        type="button"
                        onClick={() => toast.info("Please message your instructor from the Student Dashboard.")}
                        className="flex h-[38px] items-center justify-center rounded-[6px] border border-[#D72638] bg-transparent px-2 text-[10px] font-bold leading-none text-[#123E8C] transition-colors duration-300 hover:bg-[#D72638] hover:text-white"
                      >
                        Message
                      </button>
                    </div>
                  </div>
                </SwiperSlide>
              );
            })}
          </Swiper>
          {homeInstructorsLoading && <p className="py-12 text-center text-sm font-semibold text-slate-500">Loading instructors...</p>}
          {!homeInstructorsLoading && !homeInstructors.length && <p className="rounded-xl bg-[#e7ecf4] py-12 text-center text-sm font-semibold text-slate-500">No available instructors found.</p>}

          {/* Navigation */}
          <div className="mt-[48px] flex items-center justify-center gap-[12px]">
            <button
              type="button"
              aria-label="Previous instructor"
              onClick={() => swiperRefOne.current?.slidePrev()}
              className="flex h-[40px] w-[40px] items-center justify-center rounded-[10px] bg-[#E7ECF4] text-[14px] text-[#D72638] transition-colors duration-300 hover:bg-[#DDE3EC]"
            >
              <FaArrowLeftLong />
            </button>

            <button
              type="button"
              aria-label="Next instructor"
              onClick={() => swiperRefOne.current?.slideNext()}
              className="flex h-[40px] w-[40px] items-center justify-center rounded-[10px] bg-[#D72638] text-[14px] text-white transition-colors duration-300 hover:bg-[#B91F30]"
            >
              <FaArrowRightLong />
            </button>
          </div>
        </div>
      </section>

      {/* Reviews */}
      <section className={cn(section, "bg-blue-900")}>
        <div className={container}>
          <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
            {reviews.map((review, index) => (
              <div
                key={index}
                className="rounded-2xl border border-white/10 bg-white p-5 text-center shadow-lg"
              >
                <Image
                  src={review.img}
                  alt={review.title}
                  sizes="72px"
                  className="mx-auto h-auto w-16"
                />

                <h4 className="mt-4 text-xl font-black text-blue-900">
                  {review.title}
                </h4>

                <div className="mt-2">
                  <Stars />
                </div>

                <p className="mt-2 text-sm font-bold text-slate-600">
                  04 out of 05
                </p>
              </div>
            ))}
          </div>

         
        </div>
      </section>

      <Testimonials />

      {/* Instructor CTA */}
      {/* Instructor CTA */}
      <section className="relative w-full overflow-hidden bg-slate-900">
        <div className="relative w-full">
          {/* Full-width image — no crop */}
          <Image
            src={drivingInstructor}
            alt="Professional driving instructor"
            priority
            sizes="100vw"
            className="block h-auto w-full"
          />

          {/* Overlay */}
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/85 via-black/35 to-black/5" />

          {/* Content */}
          <div className="absolute inset-0 z-10 flex items-end justify-center">
            <div className="w-full px-4 pb-4 text-center sm:px-6 sm:pb-7 md:pb-10 lg:pb-14">
              <div className="mx-auto max-w-3xl">
                <h3 className="text-[18px] font-black leading-tight tracking-tight text-white drop-shadow-lg sm:text-2xl md:text-3xl lg:text-4xl">
                  Are you a driving instructor? And super friendly?
                </h3>

                <p className="mx-auto mt-2 max-w-xl text-xs font-medium leading-5 text-white/90 drop-shadow sm:mt-3 sm:text-sm md:text-base">
                  Become a freelance driving instructor.
                </p>

                <div className="mt-3 flex justify-center sm:mt-5 md:mt-6">
                  <Link
                    href="/becoming-an-independent-instructor"
                    className="inline-flex min-h-[38px] items-center justify-center rounded-full bg-blue-600 px-4 py-2 text-[11px] font-bold text-white shadow-md transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#2BBF3A] hover:text-white hover:shadow-lg sm:min-h-[42px] sm:px-6 sm:text-sm"
                  >
                    Join us as a driving instructor
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      {/* FAQ */}
      <section className="bg-white py-[70px] md:py-[86px]">
        <div className="mx-auto w-full max-w-[1320px] px-4 sm:px-6 lg:px-8">
          {/* Heading */}
          <div className="mb-[46px] text-center">
            <span className="inline-flex h-[30px] min-w-[54px] items-center justify-center rounded-[7px] bg-[#E8EDF4] px-[13px] text-[15px] font-semibold leading-none text-[#27BF43]">
              FAQ
            </span>

            <h2 className="mt-[19px] text-[27px] font-extrabold leading-[36px] text-[#1A1A1A] md:text-[33px]">
              Frequently Asked Question
            </h2>
          </div>

          {/* FAQ content */}
          <div className="grid grid-cols-1 gap-[24px] lg:grid-cols-[460px_minmax(0,1fr)] lg:items-start">
            {/* Left side */}
            <div>
              <div className="mb-[27px]">
                <h3 className="max-w-[390px] text-[25px] font-extrabold leading-[24px] text-[#202020]">
                  Got a question about lessons,
                  <br />
                  courses, or documents?
                </h3>

                <p className="mt-[14px] text-[14px] font-medium leading-[18px] text-[#676D76]">
                  Fill out the form below and we&apos;ll respond as soon as
                  possible.
                </p>
              </div>

              {/* Form card */}
              <div className="rounded-[8px] bg-[#E7ECF4] px-[24px] pb-[32px] pt-[27px]">
                <h4 className="text-[18px] font-extrabold leading-[20px] text-[#202020]">
                  Get in touch
                </h4>

                <p className="mt-[13px] text-[14px] font-medium leading-[17px] text-[#646A73]">
                  Fill out this form with necessary information
                </p>

                <form className="mt-[24px]" onSubmit={submitContact}>
                  <div className="grid grid-cols-1 gap-x-[20px] gap-y-[18px] sm:grid-cols-2">
                    {/* First name */}
                    <div>
                      <label
                        htmlFor="first-name"
                        className="mb-[8px] block text-[13px] font-semibold leading-none text-[#25282D]"
                      >
                        First Name
                      </label>

                      <input
                        type="text"
                        id="first-name"
                        name="firstName"
                        value={contactForm.firstName}
                        onChange={updateContact}
                        required
                        placeholder="Write name here"
                        className="h-[38px] w-full rounded-[8px] border border-[#C8D1DD] bg-white px-[13px] text-[10px] font-medium text-[#25282D] outline-none placeholder:text-[#A0A5AD] focus:border-[#174B9B] focus:ring-2 focus:ring-[#174B9B]/10"
                      />
                    </div>

                    {/* Last name */}
                    <div>
                      <label
                        htmlFor="last-name"
                        className="mb-[8px] block text-[13px] font-semibold leading-none text-[#25282D]"
                      >
                        Last Name
                      </label>

                      <input
                        type="text"
                        id="last-name"
                        name="lastName"
                        value={contactForm.lastName}
                        onChange={updateContact}
                        required
                        placeholder="Write name here"
                        className="h-[38px] w-full rounded-[8px] border border-[#C8D1DD] bg-white px-[13px] text-[10px] font-medium text-[#25282D] outline-none placeholder:text-[#A0A5AD] focus:border-[#174B9B] focus:ring-2 focus:ring-[#174B9B]/10"
                      />
                    </div>

                    {/* Email */}
                    <div>
                      <label
                        htmlFor="email"
                        className="mb-[8px] block text-[13px] font-semibold leading-none text-[#25282D]"
                      >
                        Email address
                      </label>

                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={contactForm.email}
                        onChange={updateContact}
                        required
                        placeholder="Write Email address"
                        className="h-[38px] w-full rounded-[8px] border border-[#C8D1DD] bg-white px-[13px] text-[10px] font-medium text-[#25282D] outline-none placeholder:text-[#A0A5AD] focus:border-[#174B9B] focus:ring-2 focus:ring-[#174B9B]/10"
                      />
                    </div>

                    {/* Phone */}
                    <div>
                      <label
                        htmlFor="phone-number"
                        className="mb-[8px] block text-[13px] font-semibold leading-none text-[#25282D]"
                      >
                        Phone Number
                      </label>

                      <input
                        type="tel"
                        id="phone-number"
                        name="phone"
                        value={contactForm.phone}
                        onChange={updateContact}
                        required
                        placeholder="Write phone number"
                        className="h-[38px] w-full rounded-[8px] border border-[#C8D1DD] bg-white px-[13px] text-[10px] font-medium text-[#25282D] outline-none placeholder:text-[#A0A5AD] focus:border-[#174B9B] focus:ring-2 focus:ring-[#174B9B]/10"
                      />
                    </div>

                    <div><label htmlFor="contact-subject" className="mb-[8px] block text-[13px] font-semibold leading-none text-[#25282D]">Subject</label><input id="contact-subject" name="subject" value={contactForm.subject} onChange={updateContact} required placeholder="Write subject" className="h-[38px] w-full rounded-[8px] border border-[#C8D1DD] bg-white px-[13px] text-[10px] outline-none" /></div>
                    <div><label htmlFor="contact-location" className="mb-[8px] block text-[13px] font-semibold leading-none text-[#25282D]">Location</label><input id="contact-location" name="location" value={contactForm.location} onChange={updateContact} required placeholder="Write location" className="h-[38px] w-full rounded-[8px] border border-[#C8D1DD] bg-white px-[13px] text-[10px] outline-none" /></div>

                    {/* Message */}
                    <div className="sm:col-span-2">
                      <label
                        htmlFor="question"
                        className="mb-[8px] block text-[13px] font-semibold leading-none text-[#25282D]"
                      >
                        Message
                      </label>

                      <textarea
                        id="question"
                        name="description"
                        value={contactForm.description}
                        onChange={updateContact}
                        required
                        placeholder="Write message"
                        className="h-[172px] w-full resize-none rounded-[8px] border border-[#C8D1DD] bg-white px-[13px] py-[12px] text-[10px] font-medium leading-[16px] text-[#25282D] outline-none placeholder:text-[#A0A5AD] focus:border-[#174B9B] focus:ring-2 focus:ring-[#174B9B]/10"
                      />
                    </div>

                    {/* Submit */}
                    <div className="sm:col-span-2">
                      <button
                        type="submit"
                        disabled={contactSubmitting}
                        className="inline-flex h-[40px] min-w-[82px] items-center justify-center rounded-[7px] bg-[#E4223C] px-[20px] text-[13px] font-bold text-white transition-colors duration-300 hover:bg-[#C91830]"
                      >
                        {contactSubmitting ? "Sending..." : "Submit"}
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>

            {/* Right accordion */}
            <div data-no-translate className="space-y-[20px]">
              {homeFaqLoading && <p className="rounded-[8px] bg-[#F4F6F9] p-6 text-center text-sm text-[#4F555E]">Loading FAQs...</p>}
              {!homeFaqLoading && homeFaqError && <p className="rounded-[8px] bg-red-50 p-6 text-center text-sm text-red-600">{homeFaqError}</p>}
              {!homeFaqLoading && !homeFaqError && homeFaqs.length === 0 && <p className="rounded-[8px] bg-[#F4F6F9] p-6 text-center text-sm text-[#4F555E]">No FAQs are available.</p>}
              {homeFaqs.map((faq, index) => {
                const isOpen = openFaq === index;

                return (
                  <div
                    key={faq.id || index}
                    className="overflow-hidden rounded-[8px] bg-[#F4F6F9]"
                  >
                    <button
                      type="button"
                      onClick={() => setOpenFaq(isOpen ? null : index)}
                      aria-expanded={isOpen}
                      className="flex min-h-[64px] w-full items-center justify-between gap-5 rounded-[8px] bg-[#194A99] px-[25px] py-[16px] text-left transition-colors duration-300 hover:bg-[#123F86]"
                    >
                      <span className="text-[16px] font-extrabold leading-[19px] text-white">
                        {faq.q}
                      </span>

                      <span className="flex h-[20px] w-[20px] shrink-0 items-center justify-center text-[18px] font-normal leading-none text-white">
                        {isOpen ? "−" : "+"}
                      </span>
                    </button>

                    {isOpen && (
                      <div className="bg-[#F4F6F9] px-[16px] pb-[18px] pt-[14px]">
                        <p className="text-[14px] font-medium leading-[18px] text-[#4F555E]">
                          {faq.a}
                        </p>

                        {faq.link && (
                          <Link
                            href="#"
                            className="mt-[12px] inline-block text-[13px] font-medium text-[#194A99] underline underline-offset-2"
                          >
                            {faq.link}
                          </Link>
                        )}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Payment */}
      <section className={cn(section, "bg-slate-50")}>
        <div className={container}>
          <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-12">
            <div className="lg:col-span-8">
              <div className="mb-6 max-w-xl">
                <h5 className={badge}>Payment System</h5>

                <h2 className="mt-3 text-2xl font-black leading-tight tracking-tight text-blue-900 sm:text-3xl lg:text-4xl">
                  Secure & Flexible Payment System
                </h2>
              </div>

              <Swiper
                spaceBetween={14}
                breakpoints={{
                  300: { slidesPerView: 2 },
                  640: { slidesPerView: 3 },
                  768: { slidesPerView: 4 },
                  1024: { slidesPerView: 5 },
                  1440: { slidesPerView: 6 },
                }}
                autoplay={{
                  delay: 2000,
                  disableOnInteraction: false,
                }}
                freeMode
                loop
                modules={[FreeMode, Autoplay, Navigation]}
                onSwiper={(swiper) => (swiperRefThree.current = swiper)}
                className="w-full"
              >
                {payments.map((payment, index) => (
                  <SwiperSlide key={index}>
                    <div className="flex h-20 items-center justify-center rounded-2xl border border-slate-100 bg-white p-3 shadow-sm">
                      <Image
                        src={payment}
                        alt={`Payment method ${index + 1}`}
                        sizes="96px"
                        className="max-h-10 w-auto object-contain"
                      />
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>

              <div className="mt-6 flex gap-3">
                <button
                  type="button"
                  className={navBtn}
                  onClick={() => swiperRefThree.current?.slidePrev()}
                >
                  <FaArrowLeftLong />
                </button>

                <button
                  type="button"
                  className={navBtn}
                  onClick={() => swiperRefThree.current?.slideNext()}
                >
                  <FaArrowRightLong />
                </button>
              </div>
            </div>

            <div className="hidden lg:col-span-4 lg:block">
              <Image
                src={homePay}
                alt="Secure payment"
                sizes="33vw"
                className="h-auto w-full rounded-2xl object-cover shadow-lg"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Blog */}
      <section data-no-translate className={cn(section, "bg-white")}>
        <div className={container}>
          <SectionHeading small={homeContent.blogLabel} title={homeContent.blogTitle} />

          <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-4">
            {homeBlogs.map((item) => (
              <div
                key={item._id}
                className={cn(
                  "overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-sm",
                  cardHover,
                )}
              >
                <Image
                  src={item.coverImage || blogImg}
                  alt=""
                  width={500}
                  height={260}
                  sizes="(max-width: 768px) 100vw, 25vw"
                  className="h-40 w-full object-cover"
                />

                <div className="p-4">
                  <h4 className="text-base font-black leading-6 text-blue-900">
                    <Link href={`/blogs/${item.slug}`}>{item.title}</Link>
                  </h4>

                  <p className="mt-2 text-sm font-medium leading-6 text-slate-600">
                    {item.excerpt || item.content}
                  </p>

                  <div className="mt-4">
                    <Link href={`/blogs/${item.slug}`} className={outlineBtn}>
                      {homeContent.readMore}
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 text-center">
            <Link href="/blogs" className={primaryBtn}>
              {homeContent.viewBlogs}
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
