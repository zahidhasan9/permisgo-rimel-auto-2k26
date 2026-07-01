// import Image from "next/image";
// import Link from "next/link";

// // Image
// import offerThree from "../../../../public/image/offer3.png";
// import firstImage from "../../../../public/image/price1.webp";

// // Icons
// import { FaTimes } from "react-icons/fa";
// import { LuBadgeCheck } from "react-icons/lu";

// // Styles
// import pricingStyle from "./styles/pricing.module.css";

// const pricing = () => {
//   return (
//     <>
//       <section>
//         <div className={pricingStyle.first_pricing}>
//           <div className="container-fluid">
//             <div className="row align-items-center">
//               <div className="col-lg-6">
//                 <div className={pricingStyle.first_pricing_section}>
//                   <h1 className="mb-4">
//                     Our prices are up to <span>30% cheaper</span> *
//                   </h1>
//                   <p>
//                     Lorem ipsum dolor sit amet consectetur adipisicing elit.
//                     Delectus voluptatibus voluptates tempora illo. Fuga ullam
//                     aperiam ex officia aspernatur dolore, soluta ipsam minima
//                     tenetur amet temporibus, impedit recusandae repudiandae rem,
//                     quod quasi voluptates asperiores iusto! Dolorum nihil maxime
//                     corporis dignissimos.
//                   </p>
//                   <div className="mt-5">
//                     <Link href="" className="btn btn-lg">
//                       To Be Accompanied by an Advisor
//                     </Link>
//                   </div>
//                 </div>
//               </div>
//               <div className="col-lg-6">
//                 <div className="text-center">
//                   <Image
//                     className={pricingStyle.firstImage}
//                     src={firstImage}
//                     layout="responsive"
//                     alt=""
//                   ></Image>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </section>

//       <section>
//         <div className={pricingStyle.second_pricing_section}>
//           <div className="container">
//             <ul
//               className="nav nav-tabs d-flex justify-content-evenly"
//               id="myTab"
//               role="tablist"
//             >
//               <li className="nav-item" role="presentation">
//                 <button
//                   className="nav-link active"
//                   id="license-tab"
//                   data-bs-toggle="tab"
//                   data-bs-target="#license-tab-pane"
//                   type="button"
//                   role="tab"
//                   aria-controls="license-tab-pane"
//                   aria-selected="true"
//                 >
//                   Driving License
//                 </button>
//               </li>
//               <li className="nav-item" role="presentation">
//                 <button
//                   className="nav-link"
//                   id="supervised-tab"
//                   data-bs-toggle="tab"
//                   data-bs-target="#supervised-tab-pane"
//                   type="button"
//                   role="tab"
//                   aria-controls="supervised-tab-pane"
//                   aria-selected="false"
//                 >
//                   Accompanied Driving
//                 </button>
//               </li>
//               <li className="nav-item" role="presentation">
//                 <button
//                   className="nav-link"
//                   id="carte-tab"
//                   data-bs-toggle="tab"
//                   data-bs-target="#carte-tab-pane"
//                   type="button"
//                   role="tab"
//                   aria-controls="carte-tab-pane"
//                   aria-selected="false"
//                 >
//                   A la carte
//                 </button>
//               </li>
//               <li className="nav-item" role="presentation">
//                 <button
//                   className="nav-link"
//                   id="code-tab"
//                   data-bs-toggle="tab"
//                   data-bs-target="#code-tab-pane"
//                   type="button"
//                   role="tab"
//                   aria-controls="code-tab-pane"
//                   aria-selected="false"
//                 >
//                   Code
//                 </button>
//               </li>
//               <li className="nav-item" role="presentation">
//                 <button
//                   className="nav-link"
//                   id="cpf-tab"
//                   data-bs-toggle="tab"
//                   data-bs-target="#cpf-tab-pane"
//                   type="button"
//                   role="tab"
//                   aria-controls="cpf-tab-pane"
//                   aria-selected="false"
//                 >
//                   CPF Offers
//                 </button>
//               </li>
//             </ul>
//             <hr />
//             <div className="tab-content" id="myTabContent">
//               {/* license */}
//               <div
//                 className="tab-pane fade show active"
//                 id="license-tab-pane"
//                 role="tabpanel"
//                 aria-labelledby="license-tab"
//                 tabIndex="0"
//               >
//                 <div className="pt-4">
//                   <div
//                     className="d-flex justify-content-between align-items-center"
//                     id={pricingStyle.mobileLicenseTitle}
//                   >
//                     <div className="text-center">
//                       <h2 className="mt-3">
//                         Our <span>Rates</span>
//                       </h2>
//                     </div>
//                     <ul className="nav nav-tabs" id="myTab" role="tablist">
//                       <li className="nav-item" role="presentation">
//                         <button
//                           className="nav-link active"
//                           id="license-menual-tab"
//                           data-bs-toggle="tab"
//                           data-bs-target="#license-menual-tab-pane"
//                           type="button"
//                           role="tab"
//                           aria-controls="license-menual-tab-pane"
//                           aria-selected="true"
//                         >
//                           Menual
//                         </button>
//                       </li>
//                       <li className="nav-item" role="presentation">
//                         <button
//                           className="nav-link"
//                           id="license-auto-tab"
//                           data-bs-toggle="tab"
//                           data-bs-target="#license-auto-tab-pane"
//                           type="button"
//                           role="tab"
//                           aria-controls="license-auto-tab-pane"
//                           aria-selected="false"
//                         >
//                           Automatic
//                         </button>
//                       </li>
//                     </ul>
//                   </div>
//                   <div className="tab-content" id="myTabContent">
//                     <div
//                       className="tab-pane fade show active"
//                       id="license-menual-tab-pane"
//                       role="tabpanel"
//                       aria-labelledby="license-menual-tab"
//                       tabIndex="0"
//                     >
//                       <div id={pricingStyle.tab_border}>
//                         <ul
//                           className="nav nav-tabs d-flex justify-content-center gap-3"
//                           id="myTab"
//                           role="tablist"
//                         >
//                           <li className="nav-item" role="presentation">
//                             <button
//                               className="nav-link active"
//                               id="five-tab"
//                               data-bs-toggle="tab"
//                               data-bs-target="#five-tab-pane"
//                               type="button"
//                               role="tab"
//                               aria-controls="five-tab-pane"
//                               aria-selected="true"
//                             >
//                               5 Course
//                             </button>
//                           </li>
//                           <li className="nav-item" role="presentation">
//                             <button
//                               className="nav-link"
//                               id="ten-tab"
//                               data-bs-toggle="tab"
//                               data-bs-target="#ten-tab-pane"
//                               type="button"
//                               role="tab"
//                               aria-controls="ten-tab-pane"
//                               aria-selected="false"
//                             >
//                               10 Course
//                             </button>
//                           </li>
//                           <li className="nav-item" role="presentation">
//                             <button
//                               className="nav-link"
//                               id="twenty-tab"
//                               data-bs-toggle="tab"
//                               data-bs-target="#twenty-tab-pane"
//                               type="button"
//                               role="tab"
//                               aria-controls="twenty-tab-pane"
//                               aria-selected="false"
//                             >
//                               20 Course
//                             </button>
//                           </li>
//                           <li className="nav-item" role="presentation">
//                             <button
//                               className="nav-link"
//                               id="thirty-tab"
//                               data-bs-toggle="tab"
//                               data-bs-target="#thirty-tab-pane"
//                               type="button"
//                               role="tab"
//                               aria-controls="thirty-tab-pane"
//                               aria-selected="false"
//                             >
//                               30 Course
//                             </button>
//                           </li>
//                         </ul>
//                       </div>
//                       <div className="tab-content" id="myTabContent">
//                         <div
//                           className="tab-pane fade show active"
//                           id="five-tab-pane"
//                           role="tabpanel"
//                           aria-labelledby="five-tab"
//                           tabIndex="0"
//                         >
//                           <div className="mt-5">
//                             <div className="row">
//                               <div className="col-lg-4">
//                                 <div
//                                   className={pricingStyle.license_menual_box}
//                                 >
//                                   <div className="text-center">
//                                     <h3>Zen Permit</h3>
//                                     <p className="mb-0">
//                                       Theory test + 20 driving lessons
//                                     </p>
//                                     <p className="mb-0">
//                                       Most economical offer
//                                     </p>
//                                   </div>
//                                   <hr />
//                                   <div
//                                     className={pricingStyle.license_pricing_box}
//                                   >
//                                     <div className="d-flex justify-content-between">
//                                       <div>
//                                         <h5 className="mb-0">Extension</h5>
//                                         <p className="mb-0">from</p>
//                                       </div>
//                                       <div>
//                                         <h5
//                                           className="mb-0"
//                                           id={
//                                             pricingStyle.license_regular_price
//                                           }
//                                         >
//                                           &849
//                                         </h5>
//                                         <p className="mb-0">retail price</p>
//                                       </div>
//                                     </div>
//                                     <div className="py-4">
//                                       <h2>&599*</h2>
//                                     </div>
//                                     <p className="mb-0">
//                                       Enter your postal code to view your
//                                       agency's rates.
//                                     </p>
//                                   </div>

//                                   <h4>Package contents:</h4>
//                                   <div
//                                     className={
//                                       pricingStyle.license_feature_list
//                                     }
//                                   >
//                                     <ul>
//                                       <li>
//                                         <LuBadgeCheck
//                                           className={pricingStyle.checkIcon}
//                                         />{" "}
//                                         20 driving lessons
//                                       </li>
//                                       <li>
//                                         <LuBadgeCheck
//                                           className={pricingStyle.checkIcon}
//                                         />{" "}
//                                         Initial assessment
//                                       </li>
//                                       <li>
//                                         <LuBadgeCheck
//                                           className={pricingStyle.checkIcon}
//                                         />{" "}
//                                         Code Training
//                                       </li>
//                                       <li>
//                                         <LuBadgeCheck
//                                           className={pricingStyle.checkIcon}
//                                         />{" "}
//                                         30-day training course
//                                       </li>
//                                       <li>
//                                         <LuBadgeCheck
//                                           className={pricingStyle.checkIcon}
//                                         />{" "}
//                                         Exam date within 30 days
//                                       </li>
//                                     </ul>
//                                   </div>
//                                   <div className="mt-4">
//                                     <Link href="" className="btn">
//                                       Sign Up
//                                     </Link>
//                                   </div>
//                                 </div>
//                               </div>
//                               <div className="col-lg-4">
//                                 <div
//                                   className={pricingStyle.license_menual_box}
//                                 >
//                                   <div className="text-center">
//                                     <h3>Premium Permit</h3>
//                                     <p className="mb-0">
//                                       Theory test + 20 driving lessons
//                                     </p>
//                                     <p className="mb-0">
//                                       Practical exam date within 30 days
//                                     </p>
//                                   </div>
//                                   <hr />
//                                   <div
//                                     className={pricingStyle.license_pricing_box}
//                                   >
//                                     <div className="d-flex justify-content-between">
//                                       <div>
//                                         <h5 className="mb-0">Extension</h5>
//                                         <p className="mb-0">from</p>
//                                       </div>
//                                       <div>
//                                         <h5
//                                           className="mb-0"
//                                           id={
//                                             pricingStyle.license_regular_price
//                                           }
//                                         >
//                                           &849
//                                         </h5>
//                                         <p className="mb-0">retail price</p>
//                                       </div>
//                                     </div>
//                                     <div className="py-4">
//                                       <h2>&599*</h2>
//                                     </div>
//                                     <p className="mb-0">
//                                       Enter your postal code to view your
//                                       agency's rates.
//                                     </p>
//                                   </div>

//                                   <h4>Package contents:</h4>
//                                   <div
//                                     className={
//                                       pricingStyle.license_feature_list
//                                     }
//                                   >
//                                     <ul>
//                                       <li>
//                                         <LuBadgeCheck
//                                           className={pricingStyle.checkIcon}
//                                         />{" "}
//                                         20 driving lessons
//                                       </li>
//                                       <li>
//                                         <LuBadgeCheck
//                                           className={pricingStyle.checkIcon}
//                                         />{" "}
//                                         Initial assessment
//                                       </li>
//                                       <li>
//                                         <LuBadgeCheck
//                                           className={pricingStyle.checkIcon}
//                                         />{" "}
//                                         Code Training
//                                       </li>
//                                       <li>
//                                         <LuBadgeCheck
//                                           className={pricingStyle.checkIcon}
//                                         />{" "}
//                                         30-day training course
//                                       </li>
//                                       <li>
//                                         <LuBadgeCheck
//                                           className={pricingStyle.checkIcon}
//                                         />{" "}
//                                         Exam date within 30 days
//                                       </li>
//                                     </ul>
//                                   </div>
//                                   <div className="mt-4">
//                                     <Link href="" className="btn">
//                                       Sign Up
//                                     </Link>
//                                   </div>
//                                 </div>
//                               </div>
//                               <div className="col-lg-4">
//                                 <div
//                                   className={pricingStyle.license_menual_box}
//                                 >
//                                   <div className="text-center">
//                                     <h3>Accelerated Permit</h3>
//                                     <p className="mb-0">
//                                       Theory test + 20 driving lessons
//                                     </p>
//                                     <p className="mb-0">
//                                       30-day training course
//                                     </p>
//                                   </div>
//                                   <hr />
//                                   <div
//                                     className={pricingStyle.license_pricing_box}
//                                   >
//                                     <div className="d-flex justify-content-between">
//                                       <div>
//                                         <h5 className="mb-0">Extension</h5>
//                                         <p className="mb-0">from</p>
//                                       </div>
//                                       <div>
//                                         <h5
//                                           className="mb-0"
//                                           id={
//                                             pricingStyle.license_regular_price
//                                           }
//                                         >
//                                           &849
//                                         </h5>
//                                         <p className="mb-0">retail price</p>
//                                       </div>
//                                     </div>
//                                     <div className="py-4">
//                                       <h2>&599*</h2>
//                                     </div>
//                                     <p className="mb-0">
//                                       Enter your postal code to view your
//                                       agency's rates.
//                                     </p>
//                                   </div>

//                                   <h4>Package contents:</h4>
//                                   <div
//                                     className={
//                                       pricingStyle.license_feature_list
//                                     }
//                                   >
//                                     <ul>
//                                       <li>
//                                         <LuBadgeCheck
//                                           className={pricingStyle.checkIcon}
//                                         />{" "}
//                                         20 driving lessons
//                                       </li>
//                                       <li>
//                                         <LuBadgeCheck
//                                           className={pricingStyle.checkIcon}
//                                         />{" "}
//                                         Initial assessment
//                                       </li>
//                                       <li>
//                                         <LuBadgeCheck
//                                           className={pricingStyle.checkIcon}
//                                         />{" "}
//                                         Code Training
//                                       </li>
//                                       <li>
//                                         <LuBadgeCheck
//                                           className={pricingStyle.checkIcon}
//                                         />{" "}
//                                         30-day training course
//                                       </li>
//                                       <li>
//                                         <LuBadgeCheck
//                                           className={pricingStyle.checkIcon}
//                                         />{" "}
//                                         20 driving lessons
//                                       </li>
//                                       <li>
//                                         <LuBadgeCheck
//                                           className={pricingStyle.checkIcon}
//                                         />{" "}
//                                         Exam date within 30 days
//                                       </li>
//                                       <li>
//                                         <LuBadgeCheck
//                                           className={pricingStyle.checkIcon}
//                                         />{" "}
//                                         Code Training
//                                       </li>
//                                       <li>
//                                         <LuBadgeCheck
//                                           className={pricingStyle.checkIcon}
//                                         />{" "}
//                                         30-day training course
//                                       </li>
//                                     </ul>
//                                   </div>
//                                   <div className="mt-4">
//                                     <Link href="" className="btn">
//                                       Sign Up
//                                     </Link>
//                                   </div>
//                                 </div>
//                               </div>
//                             </div>
//                           </div>
//                         </div>
//                         <div
//                           className="tab-pane fade"
//                           id="ten-tab-pane"
//                           role="tabpanel"
//                           aria-labelledby="ten-tab"
//                           tabIndex="0"
//                         >
//                           <div className="mt-5">
//                             <div className="row">
//                               <div className="col-lg-4">
//                                 <div
//                                   className={pricingStyle.license_menual_box}
//                                 >
//                                   <div className="text-center">
//                                     <h3>Zen Permit</h3>
//                                     <p className="mb-0">
//                                       Theory test + 20 driving lessons
//                                     </p>
//                                     <p className="mb-0">
//                                       Most economical offer
//                                     </p>
//                                   </div>
//                                   <hr />
//                                   <div
//                                     className={pricingStyle.license_pricing_box}
//                                   >
//                                     <div className="d-flex justify-content-between">
//                                       <div>
//                                         <h5 className="mb-0">Extension</h5>
//                                         <p className="mb-0">from</p>
//                                       </div>
//                                       <div>
//                                         <h5
//                                           className="mb-0"
//                                           id={
//                                             pricingStyle.license_regular_price
//                                           }
//                                         >
//                                           &849
//                                         </h5>
//                                         <p className="mb-0">retail price</p>
//                                       </div>
//                                     </div>
//                                     <div className="py-4">
//                                       <h2>&599*</h2>
//                                     </div>
//                                     <p className="mb-0">
//                                       Enter your postal code to view your
//                                       agency's rates.
//                                     </p>
//                                   </div>

//                                   <h4>Package contents:</h4>
//                                   <div
//                                     className={
//                                       pricingStyle.license_feature_list
//                                     }
//                                   >
//                                     <ul>
//                                       <li>
//                                         <LuBadgeCheck
//                                           className={pricingStyle.checkIcon}
//                                         />{" "}
//                                         20 driving lessons
//                                       </li>
//                                       <li>
//                                         <LuBadgeCheck
//                                           className={pricingStyle.checkIcon}
//                                         />{" "}
//                                         Initial assessment
//                                       </li>
//                                       <li>
//                                         <LuBadgeCheck
//                                           className={pricingStyle.checkIcon}
//                                         />{" "}
//                                         Code Training
//                                       </li>
//                                       <li>
//                                         <LuBadgeCheck
//                                           className={pricingStyle.checkIcon}
//                                         />{" "}
//                                         30-day training course
//                                       </li>
//                                       <li>
//                                         <LuBadgeCheck
//                                           className={pricingStyle.checkIcon}
//                                         />{" "}
//                                         Exam date within 30 days
//                                       </li>
//                                     </ul>
//                                   </div>
//                                   <div className="mt-4">
//                                     <Link href="" className="btn">
//                                       Sign Up
//                                     </Link>
//                                   </div>
//                                 </div>
//                               </div>
//                               <div className="col-lg-4">
//                                 <div
//                                   className={pricingStyle.license_menual_box}
//                                 >
//                                   <div className="text-center">
//                                     <h3>Premium Permit</h3>
//                                     <p className="mb-0">
//                                       Theory test + 20 driving lessons
//                                     </p>
//                                     <p className="mb-0">
//                                       Practical exam date within 30 days
//                                     </p>
//                                   </div>
//                                   <hr />
//                                   <div
//                                     className={pricingStyle.license_pricing_box}
//                                   >
//                                     <div className="d-flex justify-content-between">
//                                       <div>
//                                         <h5 className="mb-0">Extension</h5>
//                                         <p className="mb-0">from</p>
//                                       </div>
//                                       <div>
//                                         <h5
//                                           className="mb-0"
//                                           id={
//                                             pricingStyle.license_regular_price
//                                           }
//                                         >
//                                           &849
//                                         </h5>
//                                         <p className="mb-0">retail price</p>
//                                       </div>
//                                     </div>
//                                     <div className="py-4">
//                                       <h2>&599*</h2>
//                                     </div>
//                                     <p className="mb-0">
//                                       Enter your postal code to view your
//                                       agency's rates.
//                                     </p>
//                                   </div>

//                                   <h4>Package contents:</h4>
//                                   <div
//                                     className={
//                                       pricingStyle.license_feature_list
//                                     }
//                                   >
//                                     <ul>
//                                       <li>
//                                         <LuBadgeCheck
//                                           className={pricingStyle.checkIcon}
//                                         />{" "}
//                                         20 driving lessons
//                                       </li>
//                                       <li>
//                                         <LuBadgeCheck
//                                           className={pricingStyle.checkIcon}
//                                         />{" "}
//                                         Initial assessment
//                                       </li>
//                                       <li>
//                                         <LuBadgeCheck
//                                           className={pricingStyle.checkIcon}
//                                         />{" "}
//                                         Code Training
//                                       </li>
//                                       <li>
//                                         <LuBadgeCheck
//                                           className={pricingStyle.checkIcon}
//                                         />{" "}
//                                         30-day training course
//                                       </li>
//                                       <li>
//                                         <LuBadgeCheck
//                                           className={pricingStyle.checkIcon}
//                                         />{" "}
//                                         Exam date within 30 days
//                                       </li>
//                                     </ul>
//                                   </div>
//                                   <div className="mt-4">
//                                     <Link href="" className="btn">
//                                       Sign Up
//                                     </Link>
//                                   </div>
//                                 </div>
//                               </div>
//                               <div className="col-lg-4">
//                                 <div
//                                   className={pricingStyle.license_menual_box}
//                                 >
//                                   <div className="text-center">
//                                     <h3>Accelerated Permit</h3>
//                                     <p className="mb-0">
//                                       Theory test + 20 driving lessons
//                                     </p>
//                                     <p className="mb-0">
//                                       30-day training course
//                                     </p>
//                                   </div>
//                                   <hr />
//                                   <div
//                                     className={pricingStyle.license_pricing_box}
//                                   >
//                                     <div className="d-flex justify-content-between">
//                                       <div>
//                                         <h5 className="mb-0">Extension</h5>
//                                         <p className="mb-0">from</p>
//                                       </div>
//                                       <div>
//                                         <h5
//                                           className="mb-0"
//                                           id={
//                                             pricingStyle.license_regular_price
//                                           }
//                                         >
//                                           &849
//                                         </h5>
//                                         <p className="mb-0">retail price</p>
//                                       </div>
//                                     </div>
//                                     <div className="py-4">
//                                       <h2>&599*</h2>
//                                     </div>
//                                     <p className="mb-0">
//                                       Enter your postal code to view your
//                                       agency's rates.
//                                     </p>
//                                   </div>

//                                   <h4>Package contents:</h4>
//                                   <div
//                                     className={
//                                       pricingStyle.license_feature_list
//                                     }
//                                   >
//                                     <ul>
//                                       <li>
//                                         <LuBadgeCheck
//                                           className={pricingStyle.checkIcon}
//                                         />{" "}
//                                         20 driving lessons
//                                       </li>
//                                       <li>
//                                         <LuBadgeCheck
//                                           className={pricingStyle.checkIcon}
//                                         />{" "}
//                                         Initial assessment
//                                       </li>
//                                       <li>
//                                         <LuBadgeCheck
//                                           className={pricingStyle.checkIcon}
//                                         />{" "}
//                                         Code Training
//                                       </li>
//                                       <li>
//                                         <LuBadgeCheck
//                                           className={pricingStyle.checkIcon}
//                                         />{" "}
//                                         30-day training course
//                                       </li>
//                                       <li>
//                                         <LuBadgeCheck
//                                           className={pricingStyle.checkIcon}
//                                         />{" "}
//                                         20 driving lessons
//                                       </li>
//                                       <li>
//                                         <LuBadgeCheck
//                                           className={pricingStyle.checkIcon}
//                                         />{" "}
//                                         Exam date within 30 days
//                                       </li>
//                                       <li>
//                                         <LuBadgeCheck
//                                           className={pricingStyle.checkIcon}
//                                         />{" "}
//                                         Code Training
//                                       </li>
//                                       <li>
//                                         <LuBadgeCheck
//                                           className={pricingStyle.checkIcon}
//                                         />{" "}
//                                         30-day training course
//                                       </li>
//                                     </ul>
//                                   </div>
//                                   <div className="mt-4">
//                                     <Link href="" className="btn">
//                                       Sign Up
//                                     </Link>
//                                   </div>
//                                 </div>
//                               </div>
//                             </div>
//                           </div>
//                         </div>
//                         <div
//                           className="tab-pane fade"
//                           id="twenty-tab-pane"
//                           role="tabpanel"
//                           aria-labelledby="twenty-tab"
//                           tabIndex="0"
//                         >
//                           <div className="mt-5">
//                             <div className="row">
//                               <div className="col-lg-4">
//                                 <div
//                                   className={pricingStyle.license_menual_box}
//                                 >
//                                   <div className="text-center">
//                                     <h3>Zen Permit</h3>
//                                     <p className="mb-0">
//                                       Theory test + 20 driving lessons
//                                     </p>
//                                     <p className="mb-0">
//                                       Most economical offer
//                                     </p>
//                                   </div>
//                                   <hr />
//                                   <div
//                                     className={pricingStyle.license_pricing_box}
//                                   >
//                                     <div className="d-flex justify-content-between">
//                                       <div>
//                                         <h5 className="mb-0">Extension</h5>
//                                         <p className="mb-0">from</p>
//                                       </div>
//                                       <div>
//                                         <h5
//                                           className="mb-0"
//                                           id={
//                                             pricingStyle.license_regular_price
//                                           }
//                                         >
//                                           &849
//                                         </h5>
//                                         <p className="mb-0">retail price</p>
//                                       </div>
//                                     </div>
//                                     <div className="py-4">
//                                       <h2>&599*</h2>
//                                     </div>
//                                     <p className="mb-0">
//                                       Enter your postal code to view your
//                                       agency's rates.
//                                     </p>
//                                   </div>

//                                   <h4>Package contents:</h4>
//                                   <div
//                                     className={
//                                       pricingStyle.license_feature_list
//                                     }
//                                   >
//                                     <ul>
//                                       <li>
//                                         <LuBadgeCheck
//                                           className={pricingStyle.checkIcon}
//                                         />{" "}
//                                         20 driving lessons
//                                       </li>
//                                       <li>
//                                         <LuBadgeCheck
//                                           className={pricingStyle.checkIcon}
//                                         />{" "}
//                                         Initial assessment
//                                       </li>
//                                       <li>
//                                         <LuBadgeCheck
//                                           className={pricingStyle.checkIcon}
//                                         />{" "}
//                                         Code Training
//                                       </li>
//                                       <li>
//                                         <LuBadgeCheck
//                                           className={pricingStyle.checkIcon}
//                                         />{" "}
//                                         30-day training course
//                                       </li>
//                                       <li>
//                                         <LuBadgeCheck
//                                           className={pricingStyle.checkIcon}
//                                         />{" "}
//                                         Exam date within 30 days
//                                       </li>
//                                     </ul>
//                                   </div>
//                                   <div className="mt-4">
//                                     <Link href="" className="btn">
//                                       Sign Up
//                                     </Link>
//                                   </div>
//                                 </div>
//                               </div>
//                               <div className="col-lg-4">
//                                 <div
//                                   className={pricingStyle.license_menual_box}
//                                 >
//                                   <div className="text-center">
//                                     <h3>Premium Permit</h3>
//                                     <p className="mb-0">
//                                       Theory test + 20 driving lessons
//                                     </p>
//                                     <p className="mb-0">
//                                       Practical exam date within 30 days
//                                     </p>
//                                   </div>
//                                   <hr />
//                                   <div
//                                     className={pricingStyle.license_pricing_box}
//                                   >
//                                     <div className="d-flex justify-content-between">
//                                       <div>
//                                         <h5 className="mb-0">Extension</h5>
//                                         <p className="mb-0">from</p>
//                                       </div>
//                                       <div>
//                                         <h5
//                                           className="mb-0"
//                                           id={
//                                             pricingStyle.license_regular_price
//                                           }
//                                         >
//                                           &849
//                                         </h5>
//                                         <p className="mb-0">retail price</p>
//                                       </div>
//                                     </div>
//                                     <div className="py-4">
//                                       <h2>&599*</h2>
//                                     </div>
//                                     <p className="mb-0">
//                                       Enter your postal code to view your
//                                       agency's rates.
//                                     </p>
//                                   </div>

//                                   <h4>Package contents:</h4>
//                                   <div
//                                     className={
//                                       pricingStyle.license_feature_list
//                                     }
//                                   >
//                                     <ul>
//                                       <li>
//                                         <LuBadgeCheck
//                                           className={pricingStyle.checkIcon}
//                                         />{" "}
//                                         20 driving lessons
//                                       </li>
//                                       <li>
//                                         <LuBadgeCheck
//                                           className={pricingStyle.checkIcon}
//                                         />{" "}
//                                         Initial assessment
//                                       </li>
//                                       <li>
//                                         <LuBadgeCheck
//                                           className={pricingStyle.checkIcon}
//                                         />{" "}
//                                         Code Training
//                                       </li>
//                                       <li>
//                                         <LuBadgeCheck
//                                           className={pricingStyle.checkIcon}
//                                         />{" "}
//                                         30-day training course
//                                       </li>
//                                       <li>
//                                         <LuBadgeCheck
//                                           className={pricingStyle.checkIcon}
//                                         />{" "}
//                                         Exam date within 30 days
//                                       </li>
//                                     </ul>
//                                   </div>
//                                   <div className="mt-4">
//                                     <Link href="" className="btn">
//                                       Sign Up
//                                     </Link>
//                                   </div>
//                                 </div>
//                               </div>
//                               <div className="col-lg-4">
//                                 <div
//                                   className={pricingStyle.license_menual_box}
//                                 >
//                                   <div className="text-center">
//                                     <h3>Accelerated Permit</h3>
//                                     <p className="mb-0">
//                                       Theory test + 20 driving lessons
//                                     </p>
//                                     <p className="mb-0">
//                                       30-day training course
//                                     </p>
//                                   </div>
//                                   <hr />
//                                   <div
//                                     className={pricingStyle.license_pricing_box}
//                                   >
//                                     <div className="d-flex justify-content-between">
//                                       <div>
//                                         <h5 className="mb-0">Extension</h5>
//                                         <p className="mb-0">from</p>
//                                       </div>
//                                       <div>
//                                         <h5
//                                           className="mb-0"
//                                           id={
//                                             pricingStyle.license_regular_price
//                                           }
//                                         >
//                                           &849
//                                         </h5>
//                                         <p className="mb-0">retail price</p>
//                                       </div>
//                                     </div>
//                                     <div className="py-4">
//                                       <h2>&599*</h2>
//                                     </div>
//                                     <p className="mb-0">
//                                       Enter your postal code to view your
//                                       agency's rates.
//                                     </p>
//                                   </div>

//                                   <h4>Package contents:</h4>
//                                   <div
//                                     className={
//                                       pricingStyle.license_feature_list
//                                     }
//                                   >
//                                     <ul>
//                                       <li>
//                                         <LuBadgeCheck
//                                           className={pricingStyle.checkIcon}
//                                         />{" "}
//                                         20 driving lessons
//                                       </li>
//                                       <li>
//                                         <LuBadgeCheck
//                                           className={pricingStyle.checkIcon}
//                                         />{" "}
//                                         Initial assessment
//                                       </li>
//                                       <li>
//                                         <LuBadgeCheck
//                                           className={pricingStyle.checkIcon}
//                                         />{" "}
//                                         Code Training
//                                       </li>
//                                       <li>
//                                         <LuBadgeCheck
//                                           className={pricingStyle.checkIcon}
//                                         />{" "}
//                                         30-day training course
//                                       </li>
//                                       <li>
//                                         <LuBadgeCheck
//                                           className={pricingStyle.checkIcon}
//                                         />{" "}
//                                         20 driving lessons
//                                       </li>
//                                       <li>
//                                         <LuBadgeCheck
//                                           className={pricingStyle.checkIcon}
//                                         />{" "}
//                                         Exam date within 30 days
//                                       </li>
//                                       <li>
//                                         <LuBadgeCheck
//                                           className={pricingStyle.checkIcon}
//                                         />{" "}
//                                         Code Training
//                                       </li>
//                                       <li>
//                                         <LuBadgeCheck
//                                           className={pricingStyle.checkIcon}
//                                         />{" "}
//                                         30-day training course
//                                       </li>
//                                     </ul>
//                                   </div>
//                                   <div className="mt-4">
//                                     <Link href="" className="btn">
//                                       Sign Up
//                                     </Link>
//                                   </div>
//                                 </div>
//                               </div>
//                             </div>
//                           </div>
//                         </div>
//                         <div
//                           className="tab-pane fade"
//                           id="thirty-tab-pane"
//                           role="tabpanel"
//                           aria-labelledby="thirty-tab"
//                           tabIndex="0"
//                         >
//                           <div className="mt-5">
//                             <div className="row">
//                               <div className="col-lg-4">
//                                 <div
//                                   className={pricingStyle.license_menual_box}
//                                 >
//                                   <div className="text-center">
//                                     <h3>Zen Permit</h3>
//                                     <p className="mb-0">
//                                       Theory test + 20 driving lessons
//                                     </p>
//                                     <p className="mb-0">
//                                       Most economical offer
//                                     </p>
//                                   </div>
//                                   <hr />
//                                   <div
//                                     className={pricingStyle.license_pricing_box}
//                                   >
//                                     <div className="d-flex justify-content-between">
//                                       <div>
//                                         <h5 className="mb-0">Extension</h5>
//                                         <p className="mb-0">from</p>
//                                       </div>
//                                       <div>
//                                         <h5
//                                           className="mb-0"
//                                           id={
//                                             pricingStyle.license_regular_price
//                                           }
//                                         >
//                                           &849
//                                         </h5>
//                                         <p className="mb-0">retail price</p>
//                                       </div>
//                                     </div>
//                                     <div className="py-4">
//                                       <h2>&599*</h2>
//                                     </div>
//                                     <p className="mb-0">
//                                       Enter your postal code to view your
//                                       agency's rates.
//                                     </p>
//                                   </div>

//                                   <h4>Package contents:</h4>
//                                   <div
//                                     className={
//                                       pricingStyle.license_feature_list
//                                     }
//                                   >
//                                     <ul>
//                                       <li>
//                                         <LuBadgeCheck
//                                           className={pricingStyle.checkIcon}
//                                         />{" "}
//                                         20 driving lessons
//                                       </li>
//                                       <li>
//                                         <LuBadgeCheck
//                                           className={pricingStyle.checkIcon}
//                                         />{" "}
//                                         Initial assessment
//                                       </li>
//                                       <li>
//                                         <LuBadgeCheck
//                                           className={pricingStyle.checkIcon}
//                                         />{" "}
//                                         Code Training
//                                       </li>
//                                       <li>
//                                         <LuBadgeCheck
//                                           className={pricingStyle.checkIcon}
//                                         />{" "}
//                                         30-day training course
//                                       </li>
//                                       <li>
//                                         <LuBadgeCheck
//                                           className={pricingStyle.checkIcon}
//                                         />{" "}
//                                         Exam date within 30 days
//                                       </li>
//                                     </ul>
//                                   </div>
//                                   <div className="mt-4">
//                                     <Link href="" className="btn">
//                                       Sign Up
//                                     </Link>
//                                   </div>
//                                 </div>
//                               </div>
//                               <div className="col-lg-4">
//                                 <div
//                                   className={pricingStyle.license_menual_box}
//                                 >
//                                   <div className="text-center">
//                                     <h3>Premium Permit</h3>
//                                     <p className="mb-0">
//                                       Theory test + 20 driving lessons
//                                     </p>
//                                     <p className="mb-0">
//                                       Practical exam date within 30 days
//                                     </p>
//                                   </div>
//                                   <hr />
//                                   <div
//                                     className={pricingStyle.license_pricing_box}
//                                   >
//                                     <div className="d-flex justify-content-between">
//                                       <div>
//                                         <h5 className="mb-0">Extension</h5>
//                                         <p className="mb-0">from</p>
//                                       </div>
//                                       <div>
//                                         <h5
//                                           className="mb-0"
//                                           id={
//                                             pricingStyle.license_regular_price
//                                           }
//                                         >
//                                           &849
//                                         </h5>
//                                         <p className="mb-0">retail price</p>
//                                       </div>
//                                     </div>
//                                     <div className="py-4">
//                                       <h2>&599*</h2>
//                                     </div>
//                                     <p className="mb-0">
//                                       Enter your postal code to view your
//                                       agency's rates.
//                                     </p>
//                                   </div>

//                                   <h4>Package contents:</h4>
//                                   <div
//                                     className={
//                                       pricingStyle.license_feature_list
//                                     }
//                                   >
//                                     <ul>
//                                       <li>
//                                         <LuBadgeCheck
//                                           className={pricingStyle.checkIcon}
//                                         />{" "}
//                                         20 driving lessons
//                                       </li>
//                                       <li>
//                                         <LuBadgeCheck
//                                           className={pricingStyle.checkIcon}
//                                         />{" "}
//                                         Initial assessment
//                                       </li>
//                                       <li>
//                                         <LuBadgeCheck
//                                           className={pricingStyle.checkIcon}
//                                         />{" "}
//                                         Code Training
//                                       </li>
//                                       <li>
//                                         <LuBadgeCheck
//                                           className={pricingStyle.checkIcon}
//                                         />{" "}
//                                         30-day training course
//                                       </li>
//                                       <li>
//                                         <LuBadgeCheck
//                                           className={pricingStyle.checkIcon}
//                                         />{" "}
//                                         Exam date within 30 days
//                                       </li>
//                                     </ul>
//                                   </div>
//                                   <div className="mt-4">
//                                     <Link href="" className="btn">
//                                       Sign Up
//                                     </Link>
//                                   </div>
//                                 </div>
//                               </div>
//                               <div className="col-lg-4">
//                                 <div
//                                   className={pricingStyle.license_menual_box}
//                                 >
//                                   <div className="text-center">
//                                     <h3>Accelerated Permit</h3>
//                                     <p className="mb-0">
//                                       Theory test + 20 driving lessons
//                                     </p>
//                                     <p className="mb-0">
//                                       30-day training course
//                                     </p>
//                                   </div>
//                                   <hr />
//                                   <div
//                                     className={pricingStyle.license_pricing_box}
//                                   >
//                                     <div className="d-flex justify-content-between">
//                                       <div>
//                                         <h5 className="mb-0">Extension</h5>
//                                         <p className="mb-0">from</p>
//                                       </div>
//                                       <div>
//                                         <h5
//                                           className="mb-0"
//                                           id={
//                                             pricingStyle.license_regular_price
//                                           }
//                                         >
//                                           &849
//                                         </h5>
//                                         <p className="mb-0">retail price</p>
//                                       </div>
//                                     </div>
//                                     <div className="py-4">
//                                       <h2>&599*</h2>
//                                     </div>
//                                     <p className="mb-0">
//                                       Enter your postal code to view your
//                                       agency's rates.
//                                     </p>
//                                   </div>

//                                   <h4>Package contents:</h4>
//                                   <div
//                                     className={
//                                       pricingStyle.license_feature_list
//                                     }
//                                   >
//                                     <ul>
//                                       <li>
//                                         <LuBadgeCheck
//                                           className={pricingStyle.checkIcon}
//                                         />{" "}
//                                         20 driving lessons
//                                       </li>
//                                       <li>
//                                         <LuBadgeCheck
//                                           className={pricingStyle.checkIcon}
//                                         />{" "}
//                                         Initial assessment
//                                       </li>
//                                       <li>
//                                         <LuBadgeCheck
//                                           className={pricingStyle.checkIcon}
//                                         />{" "}
//                                         Code Training
//                                       </li>
//                                       <li>
//                                         <LuBadgeCheck
//                                           className={pricingStyle.checkIcon}
//                                         />{" "}
//                                         30-day training course
//                                       </li>
//                                       <li>
//                                         <LuBadgeCheck
//                                           className={pricingStyle.checkIcon}
//                                         />{" "}
//                                         20 driving lessons
//                                       </li>
//                                       <li>
//                                         <LuBadgeCheck
//                                           className={pricingStyle.checkIcon}
//                                         />{" "}
//                                         Exam date within 30 days
//                                       </li>
//                                       <li>
//                                         <LuBadgeCheck
//                                           className={pricingStyle.checkIcon}
//                                         />{" "}
//                                         Code Training
//                                       </li>
//                                       <li>
//                                         <LuBadgeCheck
//                                           className={pricingStyle.checkIcon}
//                                         />{" "}
//                                         30-day training course
//                                       </li>
//                                     </ul>
//                                   </div>
//                                   <div className="mt-4">
//                                     <Link href="" className="btn">
//                                       Sign Up
//                                     </Link>
//                                   </div>
//                                 </div>
//                               </div>
//                             </div>
//                           </div>
//                         </div>
//                       </div>
//                     </div>

//                     <div
//                       className="tab-pane fade"
//                       id="license-auto-tab-pane"
//                       role="tabpanel"
//                       aria-labelledby="license-auto-tab"
//                       tabIndex="0"
//                     >
//                       <div id={pricingStyle.tab_border}>
//                         <ul
//                           className="nav nav-tabs d-flex justify-content-center gap-3"
//                           id="myTab"
//                           role="tablist"
//                         >
//                           <li className="nav-item" role="presentation">
//                             <button
//                               className="nav-link active"
//                               id="five-auto-tab"
//                               data-bs-toggle="tab"
//                               data-bs-target="#five-auto-tab-pane"
//                               type="button"
//                               role="tab"
//                               aria-controls="five-auto-tab-pane"
//                               aria-selected="true"
//                             >
//                               5 Course
//                             </button>
//                           </li>
//                           <li className="nav-item" role="presentation">
//                             <button
//                               className="nav-link"
//                               id="ten-auto-tab"
//                               data-bs-toggle="tab"
//                               data-bs-target="#ten-auto-tab-pane"
//                               type="button"
//                               role="tab"
//                               aria-controls="ten-auto-tab-pane"
//                               aria-selected="false"
//                             >
//                               10 Course
//                             </button>
//                           </li>
//                           <li className="nav-item" role="presentation">
//                             <button
//                               className="nav-link"
//                               id="twenty-auto-tab"
//                               data-bs-toggle="tab"
//                               data-bs-target="#twenty-auto-tab-pane"
//                               type="button"
//                               role="tab"
//                               aria-controls="twenty-auto-tab-pane"
//                               aria-selected="false"
//                             >
//                               20 Course
//                             </button>
//                           </li>
//                           <li className="nav-item" role="presentation">
//                             <button
//                               className="nav-link"
//                               id="thirty-auto-tab"
//                               data-bs-toggle="tab"
//                               data-bs-target="#thirty-auto-tab-pane"
//                               type="button"
//                               role="tab"
//                               aria-controls="thirty-auto-tab-pane"
//                               aria-selected="false"
//                             >
//                               30 Course
//                             </button>
//                           </li>
//                         </ul>
//                       </div>
//                       <div className="tab-content" id="myTabContent">
//                         <div
//                           className="tab-pane fade show active"
//                           id="five-auto-tab-pane"
//                           role="tabpanel"
//                           aria-labelledby="five-auto-tab"
//                           tabIndex="0"
//                         >
//                           <div className="mt-5">
//                             <div className="row">
//                               <div className="col-lg-4">
//                                 <div
//                                   className={pricingStyle.license_menual_box}
//                                 >
//                                   <div className="text-center">
//                                     <h3>Zen Permit</h3>
//                                     <p className="mb-0">
//                                       Theory test + 20 driving lessons
//                                     </p>
//                                     <p className="mb-0">
//                                       Most economical offer
//                                     </p>
//                                   </div>
//                                   <hr />
//                                   <div
//                                     className={pricingStyle.license_pricing_box}
//                                   >
//                                     <div className="d-flex justify-content-between">
//                                       <div>
//                                         <h5 className="mb-0">Extension</h5>
//                                         <p className="mb-0">from</p>
//                                       </div>
//                                       <div>
//                                         <h5
//                                           className="mb-0"
//                                           id={
//                                             pricingStyle.license_regular_price
//                                           }
//                                         >
//                                           &849
//                                         </h5>
//                                         <p className="mb-0">retail price</p>
//                                       </div>
//                                     </div>
//                                     <div className="py-4">
//                                       <h2>&599*</h2>
//                                     </div>
//                                     <p className="mb-0">
//                                       Enter your postal code to view your
//                                       agency's rates.
//                                     </p>
//                                   </div>

//                                   <h4>Package contents:</h4>
//                                   <div
//                                     className={
//                                       pricingStyle.license_feature_list
//                                     }
//                                   >
//                                     <ul>
//                                       <li>
//                                         <LuBadgeCheck
//                                           className={pricingStyle.checkIcon}
//                                         />{" "}
//                                         20 driving lessons
//                                       </li>
//                                       <li>
//                                         <LuBadgeCheck
//                                           className={pricingStyle.checkIcon}
//                                         />{" "}
//                                         Initial assessment
//                                       </li>
//                                       <li>
//                                         <LuBadgeCheck
//                                           className={pricingStyle.checkIcon}
//                                         />{" "}
//                                         Code Training
//                                       </li>
//                                       <li>
//                                         <LuBadgeCheck
//                                           className={pricingStyle.checkIcon}
//                                         />{" "}
//                                         30-day training course
//                                       </li>
//                                       <li>
//                                         <LuBadgeCheck
//                                           className={pricingStyle.checkIcon}
//                                         />{" "}
//                                         Exam date within 30 days
//                                       </li>
//                                     </ul>
//                                   </div>
//                                   <div className="mt-4">
//                                     <Link href="" className="btn">
//                                       Sign Up
//                                     </Link>
//                                   </div>
//                                 </div>
//                               </div>
//                               <div className="col-lg-4">
//                                 <div
//                                   className={pricingStyle.license_menual_box}
//                                 >
//                                   <div className="text-center">
//                                     <h3>Premium Permit</h3>
//                                     <p className="mb-0">
//                                       Theory test + 20 driving lessons
//                                     </p>
//                                     <p className="mb-0">
//                                       Practical exam date within 30 days
//                                     </p>
//                                   </div>
//                                   <hr />
//                                   <div
//                                     className={pricingStyle.license_pricing_box}
//                                   >
//                                     <div className="d-flex justify-content-between">
//                                       <div>
//                                         <h5 className="mb-0">Extension</h5>
//                                         <p className="mb-0">from</p>
//                                       </div>
//                                       <div>
//                                         <h5
//                                           className="mb-0"
//                                           id={
//                                             pricingStyle.license_regular_price
//                                           }
//                                         >
//                                           &849
//                                         </h5>
//                                         <p className="mb-0">retail price</p>
//                                       </div>
//                                     </div>
//                                     <div className="py-4">
//                                       <h2>&599*</h2>
//                                     </div>
//                                     <p className="mb-0">
//                                       Enter your postal code to view your
//                                       agency's rates.
//                                     </p>
//                                   </div>

//                                   <h4>Package contents:</h4>
//                                   <div
//                                     className={
//                                       pricingStyle.license_feature_list
//                                     }
//                                   >
//                                     <ul>
//                                       <li>
//                                         <LuBadgeCheck
//                                           className={pricingStyle.checkIcon}
//                                         />{" "}
//                                         20 driving lessons
//                                       </li>
//                                       <li>
//                                         <LuBadgeCheck
//                                           className={pricingStyle.checkIcon}
//                                         />{" "}
//                                         Initial assessment
//                                       </li>
//                                       <li>
//                                         <LuBadgeCheck
//                                           className={pricingStyle.checkIcon}
//                                         />{" "}
//                                         Code Training
//                                       </li>
//                                       <li>
//                                         <LuBadgeCheck
//                                           className={pricingStyle.checkIcon}
//                                         />{" "}
//                                         30-day training course
//                                       </li>
//                                       <li>
//                                         <LuBadgeCheck
//                                           className={pricingStyle.checkIcon}
//                                         />{" "}
//                                         Exam date within 30 days
//                                       </li>
//                                     </ul>
//                                   </div>
//                                   <div className="mt-4">
//                                     <Link href="" className="btn">
//                                       Sign Up
//                                     </Link>
//                                   </div>
//                                 </div>
//                               </div>
//                               <div className="col-lg-4">
//                                 <div
//                                   className={pricingStyle.license_menual_box}
//                                 >
//                                   <div className="text-center">
//                                     <h3>Accelerated Permit</h3>
//                                     <p className="mb-0">
//                                       Theory test + 20 driving lessons
//                                     </p>
//                                     <p className="mb-0">
//                                       30-day training course
//                                     </p>
//                                   </div>
//                                   <hr />
//                                   <div
//                                     className={pricingStyle.license_pricing_box}
//                                   >
//                                     <div className="d-flex justify-content-between">
//                                       <div>
//                                         <h5 className="mb-0">Extension</h5>
//                                         <p className="mb-0">from</p>
//                                       </div>
//                                       <div>
//                                         <h5
//                                           className="mb-0"
//                                           id={
//                                             pricingStyle.license_regular_price
//                                           }
//                                         >
//                                           &849
//                                         </h5>
//                                         <p className="mb-0">retail price</p>
//                                       </div>
//                                     </div>
//                                     <div className="py-4">
//                                       <h2>&599*</h2>
//                                     </div>
//                                     <p className="mb-0">
//                                       Enter your postal code to view your
//                                       agency's rates.
//                                     </p>
//                                   </div>

//                                   <h4>Package contents:</h4>
//                                   <div
//                                     className={
//                                       pricingStyle.license_feature_list
//                                     }
//                                   >
//                                     <ul>
//                                       <li>
//                                         <LuBadgeCheck
//                                           className={pricingStyle.checkIcon}
//                                         />{" "}
//                                         20 driving lessons
//                                       </li>
//                                       <li>
//                                         <LuBadgeCheck
//                                           className={pricingStyle.checkIcon}
//                                         />{" "}
//                                         Initial assessment
//                                       </li>
//                                       <li>
//                                         <LuBadgeCheck
//                                           className={pricingStyle.checkIcon}
//                                         />{" "}
//                                         Code Training
//                                       </li>
//                                       <li>
//                                         <LuBadgeCheck
//                                           className={pricingStyle.checkIcon}
//                                         />{" "}
//                                         30-day training course
//                                       </li>
//                                       <li>
//                                         <LuBadgeCheck
//                                           className={pricingStyle.checkIcon}
//                                         />{" "}
//                                         20 driving lessons
//                                       </li>
//                                       <li>
//                                         <LuBadgeCheck
//                                           className={pricingStyle.checkIcon}
//                                         />{" "}
//                                         Exam date within 30 days
//                                       </li>
//                                       <li>
//                                         <LuBadgeCheck
//                                           className={pricingStyle.checkIcon}
//                                         />{" "}
//                                         Code Training
//                                       </li>
//                                       <li>
//                                         <LuBadgeCheck
//                                           className={pricingStyle.checkIcon}
//                                         />{" "}
//                                         30-day training course
//                                       </li>
//                                     </ul>
//                                   </div>
//                                   <div className="mt-4">
//                                     <Link href="" className="btn">
//                                       Sign Up
//                                     </Link>
//                                   </div>
//                                 </div>
//                               </div>
//                             </div>
//                           </div>
//                         </div>
//                         <div
//                           className="tab-pane fade"
//                           id="ten-auto-tab-pane"
//                           role="tabpanel"
//                           aria-labelledby="ten-auto-tab"
//                           tabIndex="0"
//                         >
//                           <div className="mt-5">
//                             <div className="row">
//                               <div className="col-lg-4">
//                                 <div
//                                   className={pricingStyle.license_menual_box}
//                                 >
//                                   <div className="text-center">
//                                     <h3>Zen Permit</h3>
//                                     <p className="mb-0">
//                                       Theory test + 20 driving lessons
//                                     </p>
//                                     <p className="mb-0">
//                                       Most economical offer
//                                     </p>
//                                   </div>
//                                   <hr />
//                                   <div
//                                     className={pricingStyle.license_pricing_box}
//                                   >
//                                     <div className="d-flex justify-content-between">
//                                       <div>
//                                         <h5 className="mb-0">Extension</h5>
//                                         <p className="mb-0">from</p>
//                                       </div>
//                                       <div>
//                                         <h5
//                                           className="mb-0"
//                                           id={
//                                             pricingStyle.license_regular_price
//                                           }
//                                         >
//                                           &849
//                                         </h5>
//                                         <p className="mb-0">retail price</p>
//                                       </div>
//                                     </div>
//                                     <div className="py-4">
//                                       <h2>&599*</h2>
//                                     </div>
//                                     <p className="mb-0">
//                                       Enter your postal code to view your
//                                       agency's rates.
//                                     </p>
//                                   </div>

//                                   <h4>Package contents:</h4>
//                                   <div
//                                     className={
//                                       pricingStyle.license_feature_list
//                                     }
//                                   >
//                                     <ul>
//                                       <li>
//                                         <LuBadgeCheck
//                                           className={pricingStyle.checkIcon}
//                                         />{" "}
//                                         20 driving lessons
//                                       </li>
//                                       <li>
//                                         <LuBadgeCheck
//                                           className={pricingStyle.checkIcon}
//                                         />{" "}
//                                         Initial assessment
//                                       </li>
//                                       <li>
//                                         <LuBadgeCheck
//                                           className={pricingStyle.checkIcon}
//                                         />{" "}
//                                         Code Training
//                                       </li>
//                                       <li>
//                                         <LuBadgeCheck
//                                           className={pricingStyle.checkIcon}
//                                         />{" "}
//                                         30-day training course
//                                       </li>
//                                       <li>
//                                         <LuBadgeCheck
//                                           className={pricingStyle.checkIcon}
//                                         />{" "}
//                                         Exam date within 30 days
//                                       </li>
//                                     </ul>
//                                   </div>
//                                   <div className="mt-4">
//                                     <Link href="" className="btn">
//                                       Sign Up
//                                     </Link>
//                                   </div>
//                                 </div>
//                               </div>
//                               <div className="col-lg-4">
//                                 <div
//                                   className={pricingStyle.license_menual_box}
//                                 >
//                                   <div className="text-center">
//                                     <h3>Premium Permit</h3>
//                                     <p className="mb-0">
//                                       Theory test + 20 driving lessons
//                                     </p>
//                                     <p className="mb-0">
//                                       Practical exam date within 30 days
//                                     </p>
//                                   </div>
//                                   <hr />
//                                   <div
//                                     className={pricingStyle.license_pricing_box}
//                                   >
//                                     <div className="d-flex justify-content-between">
//                                       <div>
//                                         <h5 className="mb-0">Extension</h5>
//                                         <p className="mb-0">from</p>
//                                       </div>
//                                       <div>
//                                         <h5
//                                           className="mb-0"
//                                           id={
//                                             pricingStyle.license_regular_price
//                                           }
//                                         >
//                                           &849
//                                         </h5>
//                                         <p className="mb-0">retail price</p>
//                                       </div>
//                                     </div>
//                                     <div className="py-4">
//                                       <h2>&599*</h2>
//                                     </div>
//                                     <p className="mb-0">
//                                       Enter your postal code to view your
//                                       agency's rates.
//                                     </p>
//                                   </div>

//                                   <h4>Package contents:</h4>
//                                   <div
//                                     className={
//                                       pricingStyle.license_feature_list
//                                     }
//                                   >
//                                     <ul>
//                                       <li>
//                                         <LuBadgeCheck
//                                           className={pricingStyle.checkIcon}
//                                         />{" "}
//                                         20 driving lessons
//                                       </li>
//                                       <li>
//                                         <LuBadgeCheck
//                                           className={pricingStyle.checkIcon}
//                                         />{" "}
//                                         Initial assessment
//                                       </li>
//                                       <li>
//                                         <LuBadgeCheck
//                                           className={pricingStyle.checkIcon}
//                                         />{" "}
//                                         Code Training
//                                       </li>
//                                       <li>
//                                         <LuBadgeCheck
//                                           className={pricingStyle.checkIcon}
//                                         />{" "}
//                                         30-day training course
//                                       </li>
//                                       <li>
//                                         <LuBadgeCheck
//                                           className={pricingStyle.checkIcon}
//                                         />{" "}
//                                         Exam date within 30 days
//                                       </li>
//                                     </ul>
//                                   </div>
//                                   <div className="mt-4">
//                                     <Link href="" className="btn">
//                                       Sign Up
//                                     </Link>
//                                   </div>
//                                 </div>
//                               </div>
//                               <div className="col-lg-4">
//                                 <div
//                                   className={pricingStyle.license_menual_box}
//                                 >
//                                   <div className="text-center">
//                                     <h3>Accelerated Permit</h3>
//                                     <p className="mb-0">
//                                       Theory test + 20 driving lessons
//                                     </p>
//                                     <p className="mb-0">
//                                       30-day training course
//                                     </p>
//                                   </div>
//                                   <hr />
//                                   <div
//                                     className={pricingStyle.license_pricing_box}
//                                   >
//                                     <div className="d-flex justify-content-between">
//                                       <div>
//                                         <h5 className="mb-0">Extension</h5>
//                                         <p className="mb-0">from</p>
//                                       </div>
//                                       <div>
//                                         <h5
//                                           className="mb-0"
//                                           id={
//                                             pricingStyle.license_regular_price
//                                           }
//                                         >
//                                           &849
//                                         </h5>
//                                         <p className="mb-0">retail price</p>
//                                       </div>
//                                     </div>
//                                     <div className="py-4">
//                                       <h2>&599*</h2>
//                                     </div>
//                                     <p className="mb-0">
//                                       Enter your postal code to view your
//                                       agency's rates.
//                                     </p>
//                                   </div>

//                                   <h4>Package contents:</h4>
//                                   <div
//                                     className={
//                                       pricingStyle.license_feature_list
//                                     }
//                                   >
//                                     <ul>
//                                       <li>
//                                         <LuBadgeCheck
//                                           className={pricingStyle.checkIcon}
//                                         />{" "}
//                                         20 driving lessons
//                                       </li>
//                                       <li>
//                                         <LuBadgeCheck
//                                           className={pricingStyle.checkIcon}
//                                         />{" "}
//                                         Initial assessment
//                                       </li>
//                                       <li>
//                                         <LuBadgeCheck
//                                           className={pricingStyle.checkIcon}
//                                         />{" "}
//                                         Code Training
//                                       </li>
//                                       <li>
//                                         <LuBadgeCheck
//                                           className={pricingStyle.checkIcon}
//                                         />{" "}
//                                         30-day training course
//                                       </li>
//                                       <li>
//                                         <LuBadgeCheck
//                                           className={pricingStyle.checkIcon}
//                                         />{" "}
//                                         20 driving lessons
//                                       </li>
//                                       <li>
//                                         <LuBadgeCheck
//                                           className={pricingStyle.checkIcon}
//                                         />{" "}
//                                         Exam date within 30 days
//                                       </li>
//                                       <li>
//                                         <LuBadgeCheck
//                                           className={pricingStyle.checkIcon}
//                                         />{" "}
//                                         Code Training
//                                       </li>
//                                       <li>
//                                         <LuBadgeCheck
//                                           className={pricingStyle.checkIcon}
//                                         />{" "}
//                                         30-day training course
//                                       </li>
//                                     </ul>
//                                   </div>
//                                   <div className="mt-4">
//                                     <Link href="" className="btn">
//                                       Sign Up
//                                     </Link>
//                                   </div>
//                                 </div>
//                               </div>
//                             </div>
//                           </div>
//                         </div>
//                         <div
//                           className="tab-pane fade"
//                           id="twenty-auto-tab-pane"
//                           role="tabpanel"
//                           aria-labelledby="twenty-auto-tab"
//                           tabIndex="0"
//                         >
//                           <div className="mt-5">
//                             <div className="row">
//                               <div className="col-lg-4">
//                                 <div
//                                   className={pricingStyle.license_menual_box}
//                                 >
//                                   <div className="text-center">
//                                     <h3>Zen Permit</h3>
//                                     <p className="mb-0">
//                                       Theory test + 20 driving lessons
//                                     </p>
//                                     <p className="mb-0">
//                                       Most economical offer
//                                     </p>
//                                   </div>
//                                   <hr />
//                                   <div
//                                     className={pricingStyle.license_pricing_box}
//                                   >
//                                     <div className="d-flex justify-content-between">
//                                       <div>
//                                         <h5 className="mb-0">Extension</h5>
//                                         <p className="mb-0">from</p>
//                                       </div>
//                                       <div>
//                                         <h5
//                                           className="mb-0"
//                                           id={
//                                             pricingStyle.license_regular_price
//                                           }
//                                         >
//                                           &849
//                                         </h5>
//                                         <p className="mb-0">retail price</p>
//                                       </div>
//                                     </div>
//                                     <div className="py-4">
//                                       <h2>&599*</h2>
//                                     </div>
//                                     <p className="mb-0">
//                                       Enter your postal code to view your
//                                       agency's rates.
//                                     </p>
//                                   </div>

//                                   <h4>Package contents:</h4>
//                                   <div
//                                     className={
//                                       pricingStyle.license_feature_list
//                                     }
//                                   >
//                                     <ul>
//                                       <li>
//                                         <LuBadgeCheck
//                                           className={pricingStyle.checkIcon}
//                                         />{" "}
//                                         20 driving lessons
//                                       </li>
//                                       <li>
//                                         <LuBadgeCheck
//                                           className={pricingStyle.checkIcon}
//                                         />{" "}
//                                         Initial assessment
//                                       </li>
//                                       <li>
//                                         <LuBadgeCheck
//                                           className={pricingStyle.checkIcon}
//                                         />{" "}
//                                         Code Training
//                                       </li>
//                                       <li>
//                                         <LuBadgeCheck
//                                           className={pricingStyle.checkIcon}
//                                         />{" "}
//                                         30-day training course
//                                       </li>
//                                       <li>
//                                         <LuBadgeCheck
//                                           className={pricingStyle.checkIcon}
//                                         />{" "}
//                                         Exam date within 30 days
//                                       </li>
//                                     </ul>
//                                   </div>
//                                   <div className="mt-4">
//                                     <Link href="" className="btn">
//                                       Sign Up
//                                     </Link>
//                                   </div>
//                                 </div>
//                               </div>
//                               <div className="col-lg-4">
//                                 <div
//                                   className={pricingStyle.license_menual_box}
//                                 >
//                                   <div className="text-center">
//                                     <h3>Premium Permit</h3>
//                                     <p className="mb-0">
//                                       Theory test + 20 driving lessons
//                                     </p>
//                                     <p className="mb-0">
//                                       Practical exam date within 30 days
//                                     </p>
//                                   </div>
//                                   <hr />
//                                   <div
//                                     className={pricingStyle.license_pricing_box}
//                                   >
//                                     <div className="d-flex justify-content-between">
//                                       <div>
//                                         <h5 className="mb-0">Extension</h5>
//                                         <p className="mb-0">from</p>
//                                       </div>
//                                       <div>
//                                         <h5
//                                           className="mb-0"
//                                           id={
//                                             pricingStyle.license_regular_price
//                                           }
//                                         >
//                                           &849
//                                         </h5>
//                                         <p className="mb-0">retail price</p>
//                                       </div>
//                                     </div>
//                                     <div className="py-4">
//                                       <h2>&599*</h2>
//                                     </div>
//                                     <p className="mb-0">
//                                       Enter your postal code to view your
//                                       agency's rates.
//                                     </p>
//                                   </div>

//                                   <h4>Package contents:</h4>
//                                   <div
//                                     className={
//                                       pricingStyle.license_feature_list
//                                     }
//                                   >
//                                     <ul>
//                                       <li>
//                                         <LuBadgeCheck
//                                           className={pricingStyle.checkIcon}
//                                         />{" "}
//                                         20 driving lessons
//                                       </li>
//                                       <li>
//                                         <LuBadgeCheck
//                                           className={pricingStyle.checkIcon}
//                                         />{" "}
//                                         Initial assessment
//                                       </li>
//                                       <li>
//                                         <LuBadgeCheck
//                                           className={pricingStyle.checkIcon}
//                                         />{" "}
//                                         Code Training
//                                       </li>
//                                       <li>
//                                         <LuBadgeCheck
//                                           className={pricingStyle.checkIcon}
//                                         />{" "}
//                                         30-day training course
//                                       </li>
//                                       <li>
//                                         <LuBadgeCheck
//                                           className={pricingStyle.checkIcon}
//                                         />{" "}
//                                         Exam date within 30 days
//                                       </li>
//                                     </ul>
//                                   </div>
//                                   <div className="mt-4">
//                                     <Link href="" className="btn">
//                                       Sign Up
//                                     </Link>
//                                   </div>
//                                 </div>
//                               </div>
//                               <div className="col-lg-4">
//                                 <div
//                                   className={pricingStyle.license_menual_box}
//                                 >
//                                   <div className="text-center">
//                                     <h3>Accelerated Permit</h3>
//                                     <p className="mb-0">
//                                       Theory test + 20 driving lessons
//                                     </p>
//                                     <p className="mb-0">
//                                       30-day training course
//                                     </p>
//                                   </div>
//                                   <hr />
//                                   <div
//                                     className={pricingStyle.license_pricing_box}
//                                   >
//                                     <div className="d-flex justify-content-between">
//                                       <div>
//                                         <h5 className="mb-0">Extension</h5>
//                                         <p className="mb-0">from</p>
//                                       </div>
//                                       <div>
//                                         <h5
//                                           className="mb-0"
//                                           id={
//                                             pricingStyle.license_regular_price
//                                           }
//                                         >
//                                           &849
//                                         </h5>
//                                         <p className="mb-0">retail price</p>
//                                       </div>
//                                     </div>
//                                     <div className="py-4">
//                                       <h2>&599*</h2>
//                                     </div>
//                                     <p className="mb-0">
//                                       Enter your postal code to view your
//                                       agency's rates.
//                                     </p>
//                                   </div>

//                                   <h4>Package contents:</h4>
//                                   <div
//                                     className={
//                                       pricingStyle.license_feature_list
//                                     }
//                                   >
//                                     <ul>
//                                       <li>
//                                         <LuBadgeCheck
//                                           className={pricingStyle.checkIcon}
//                                         />{" "}
//                                         20 driving lessons
//                                       </li>
//                                       <li>
//                                         <LuBadgeCheck
//                                           className={pricingStyle.checkIcon}
//                                         />{" "}
//                                         Initial assessment
//                                       </li>
//                                       <li>
//                                         <LuBadgeCheck
//                                           className={pricingStyle.checkIcon}
//                                         />{" "}
//                                         Code Training
//                                       </li>
//                                       <li>
//                                         <LuBadgeCheck
//                                           className={pricingStyle.checkIcon}
//                                         />{" "}
//                                         30-day training course
//                                       </li>
//                                       <li>
//                                         <LuBadgeCheck
//                                           className={pricingStyle.checkIcon}
//                                         />{" "}
//                                         20 driving lessons
//                                       </li>
//                                       <li>
//                                         <LuBadgeCheck
//                                           className={pricingStyle.checkIcon}
//                                         />{" "}
//                                         Exam date within 30 days
//                                       </li>
//                                       <li>
//                                         <LuBadgeCheck
//                                           className={pricingStyle.checkIcon}
//                                         />{" "}
//                                         Code Training
//                                       </li>
//                                       <li>
//                                         <LuBadgeCheck
//                                           className={pricingStyle.checkIcon}
//                                         />{" "}
//                                         30-day training course
//                                       </li>
//                                     </ul>
//                                   </div>
//                                   <div className="mt-4">
//                                     <Link href="" className="btn">
//                                       Sign Up
//                                     </Link>
//                                   </div>
//                                 </div>
//                               </div>
//                             </div>
//                           </div>
//                         </div>
//                         <div
//                           className="tab-pane fade"
//                           id="thirty-auto-tab-pane"
//                           role="tabpanel"
//                           aria-labelledby="thirty-auto-tab"
//                           tabIndex="0"
//                         >
//                           <div className="mt-5">
//                             <div className="row">
//                               <div className="col-lg-4">
//                                 <div
//                                   className={pricingStyle.license_menual_box}
//                                 >
//                                   <div className="text-center">
//                                     <h3>Zen Permit</h3>
//                                     <p className="mb-0">
//                                       Theory test + 20 driving lessons
//                                     </p>
//                                     <p className="mb-0">
//                                       Most economical offer
//                                     </p>
//                                   </div>
//                                   <hr />
//                                   <div
//                                     className={pricingStyle.license_pricing_box}
//                                   >
//                                     <div className="d-flex justify-content-between">
//                                       <div>
//                                         <h5 className="mb-0">Extension</h5>
//                                         <p className="mb-0">from</p>
//                                       </div>
//                                       <div>
//                                         <h5
//                                           className="mb-0"
//                                           id={
//                                             pricingStyle.license_regular_price
//                                           }
//                                         >
//                                           &849
//                                         </h5>
//                                         <p className="mb-0">retail price</p>
//                                       </div>
//                                     </div>
//                                     <div className="py-4">
//                                       <h2>&599*</h2>
//                                     </div>
//                                     <p className="mb-0">
//                                       Enter your postal code to view your
//                                       agency's rates.
//                                     </p>
//                                   </div>

//                                   <h4>Package contents:</h4>
//                                   <div
//                                     className={
//                                       pricingStyle.license_feature_list
//                                     }
//                                   >
//                                     <ul>
//                                       <li>
//                                         <LuBadgeCheck
//                                           className={pricingStyle.checkIcon}
//                                         />{" "}
//                                         20 driving lessons
//                                       </li>
//                                       <li>
//                                         <LuBadgeCheck
//                                           className={pricingStyle.checkIcon}
//                                         />{" "}
//                                         Initial assessment
//                                       </li>
//                                       <li>
//                                         <LuBadgeCheck
//                                           className={pricingStyle.checkIcon}
//                                         />{" "}
//                                         Code Training
//                                       </li>
//                                       <li>
//                                         <LuBadgeCheck
//                                           className={pricingStyle.checkIcon}
//                                         />{" "}
//                                         30-day training course
//                                       </li>
//                                       <li>
//                                         <LuBadgeCheck
//                                           className={pricingStyle.checkIcon}
//                                         />{" "}
//                                         Exam date within 30 days
//                                       </li>
//                                     </ul>
//                                   </div>
//                                   <div className="mt-4">
//                                     <Link href="" className="btn">
//                                       Sign Up
//                                     </Link>
//                                   </div>
//                                 </div>
//                               </div>
//                               <div className="col-lg-4">
//                                 <div
//                                   className={pricingStyle.license_menual_box}
//                                 >
//                                   <div className="text-center">
//                                     <h3>Premium Permit</h3>
//                                     <p className="mb-0">
//                                       Theory test + 20 driving lessons
//                                     </p>
//                                     <p className="mb-0">
//                                       Practical exam date within 30 days
//                                     </p>
//                                   </div>
//                                   <hr />
//                                   <div
//                                     className={pricingStyle.license_pricing_box}
//                                   >
//                                     <div className="d-flex justify-content-between">
//                                       <div>
//                                         <h5 className="mb-0">Extension</h5>
//                                         <p className="mb-0">from</p>
//                                       </div>
//                                       <div>
//                                         <h5
//                                           className="mb-0"
//                                           id={
//                                             pricingStyle.license_regular_price
//                                           }
//                                         >
//                                           &849
//                                         </h5>
//                                         <p className="mb-0">retail price</p>
//                                       </div>
//                                     </div>
//                                     <div className="py-4">
//                                       <h2>&599*</h2>
//                                     </div>
//                                     <p className="mb-0">
//                                       Enter your postal code to view your
//                                       agency's rates.
//                                     </p>
//                                   </div>

//                                   <h4>Package contents:</h4>
//                                   <div
//                                     className={
//                                       pricingStyle.license_feature_list
//                                     }
//                                   >
//                                     <ul>
//                                       <li>
//                                         <LuBadgeCheck
//                                           className={pricingStyle.checkIcon}
//                                         />{" "}
//                                         20 driving lessons
//                                       </li>
//                                       <li>
//                                         <LuBadgeCheck
//                                           className={pricingStyle.checkIcon}
//                                         />{" "}
//                                         Initial assessment
//                                       </li>
//                                       <li>
//                                         <LuBadgeCheck
//                                           className={pricingStyle.checkIcon}
//                                         />{" "}
//                                         Code Training
//                                       </li>
//                                       <li>
//                                         <LuBadgeCheck
//                                           className={pricingStyle.checkIcon}
//                                         />{" "}
//                                         30-day training course
//                                       </li>
//                                       <li>
//                                         <LuBadgeCheck
//                                           className={pricingStyle.checkIcon}
//                                         />{" "}
//                                         Exam date within 30 days
//                                       </li>
//                                     </ul>
//                                   </div>
//                                   <div className="mt-4">
//                                     <Link href="" className="btn">
//                                       Sign Up
//                                     </Link>
//                                   </div>
//                                 </div>
//                               </div>
//                               <div className="col-lg-4">
//                                 <div
//                                   className={pricingStyle.license_menual_box}
//                                 >
//                                   <div className="text-center">
//                                     <h3>Accelerated Permit</h3>
//                                     <p className="mb-0">
//                                       Theory test + 20 driving lessons
//                                     </p>
//                                     <p className="mb-0">
//                                       30-day training course
//                                     </p>
//                                   </div>
//                                   <hr />
//                                   <div
//                                     className={pricingStyle.license_pricing_box}
//                                   >
//                                     <div className="d-flex justify-content-between">
//                                       <div>
//                                         <h5 className="mb-0">Extension</h5>
//                                         <p className="mb-0">from</p>
//                                       </div>
//                                       <div>
//                                         <h5
//                                           className="mb-0"
//                                           id={
//                                             pricingStyle.license_regular_price
//                                           }
//                                         >
//                                           &849
//                                         </h5>
//                                         <p className="mb-0">retail price</p>
//                                       </div>
//                                     </div>
//                                     <div className="py-4">
//                                       <h2>&599*</h2>
//                                     </div>
//                                     <p className="mb-0">
//                                       Enter your postal code to view your
//                                       agency's rates.
//                                     </p>
//                                   </div>

//                                   <h4>Package contents:</h4>
//                                   <div
//                                     className={
//                                       pricingStyle.license_feature_list
//                                     }
//                                   >
//                                     <ul>
//                                       <li>
//                                         <LuBadgeCheck
//                                           className={pricingStyle.checkIcon}
//                                         />{" "}
//                                         20 driving lessons
//                                       </li>
//                                       <li>
//                                         <LuBadgeCheck
//                                           className={pricingStyle.checkIcon}
//                                         />{" "}
//                                         Initial assessment
//                                       </li>
//                                       <li>
//                                         <LuBadgeCheck
//                                           className={pricingStyle.checkIcon}
//                                         />{" "}
//                                         Code Training
//                                       </li>
//                                       <li>
//                                         <LuBadgeCheck
//                                           className={pricingStyle.checkIcon}
//                                         />{" "}
//                                         30-day training course
//                                       </li>
//                                       <li>
//                                         <LuBadgeCheck
//                                           className={pricingStyle.checkIcon}
//                                         />{" "}
//                                         20 driving lessons
//                                       </li>
//                                       <li>
//                                         <LuBadgeCheck
//                                           className={pricingStyle.checkIcon}
//                                         />{" "}
//                                         Exam date within 30 days
//                                       </li>
//                                       <li>
//                                         <LuBadgeCheck
//                                           className={pricingStyle.checkIcon}
//                                         />{" "}
//                                         Code Training
//                                       </li>
//                                       <li>
//                                         <LuBadgeCheck
//                                           className={pricingStyle.checkIcon}
//                                         />{" "}
//                                         30-day training course
//                                       </li>
//                                     </ul>
//                                   </div>
//                                   <div className="mt-4">
//                                     <Link href="" className="btn">
//                                       Sign Up
//                                     </Link>
//                                   </div>
//                                 </div>
//                               </div>
//                             </div>
//                           </div>
//                         </div>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               </div>

//               {/* Supervised Driving */}
//               <div
//                 className="tab-pane fade"
//                 id="supervised-tab-pane"
//                 role="tabpanel"
//                 aria-labelledby="supervised-tab"
//                 tabIndex="0"
//               >
//                 <div className="py-3">
//                   <div className="text-center">
//                     <h2 className="mt-3">
//                       Our Supervised <span>Driving</span> Package
//                     </h2>

//                     <div className="pt-4">
//                       <ul
//                         className="nav nav-tabs d-flex justify-content-center"
//                         id="myTab"
//                         role="tablist"
//                       >
//                         <li className="nav-item" role="presentation">
//                           <button
//                             className="nav-link active"
//                             id="menual-tab"
//                             data-bs-toggle="tab"
//                             data-bs-target="#menual-tab-pane"
//                             type="button"
//                             role="tab"
//                             aria-controls="menual-tab-pane"
//                             aria-selected="true"
//                           >
//                             Menual
//                           </button>
//                         </li>
//                         <li className="nav-item" role="presentation">
//                           <button
//                             className="nav-link"
//                             id="automatic-tab"
//                             data-bs-toggle="tab"
//                             data-bs-target="#automatic-tab-pane"
//                             type="button"
//                             role="tab"
//                             aria-controls="automatic-tab-pane"
//                             aria-selected="false"
//                           >
//                             Automatic
//                           </button>
//                         </li>
//                       </ul>
//                       <div className="tab-content mt-4" id="myTabContent">
//                         <div
//                           className="tab-pane fade show active"
//                           id="menual-tab-pane"
//                           role="tabpanel"
//                           aria-labelledby="menual-tab"
//                           tabIndex="0"
//                         >
//                           <div className={pricingStyle.secondPricingBox}>
//                             <h3>Supervised Driving</h3>
//                             <p>Theory test + 20 driving lessons</p>
//                             <div className="row">
//                               <div className="col-lg-6">
//                                 <div
//                                   className={pricingStyle.secondRealPricingBox}
//                                 >
//                                   <h4>Valentine's Day</h4>
//                                   <p>from</p>

//                                   <div className="d-flex justify-content-between align-items-center">
//                                     <div>
//                                       <h5>
//                                         Retail Price:{" "}
//                                         <span>
//                                           <br />
//                                           $1025
//                                         </span>
//                                       </h5>
//                                     </div>
//                                     <div>
//                                       <h3>$655</h3>
//                                     </div>
//                                   </div>

//                                   <p>
//                                     Enter your postal code to view your agency's
//                                     rates.
//                                   </p>

//                                   <Link
//                                     href="/register"
//                                     className="btn mx-auto"
//                                   >
//                                     Sign Up
//                                   </Link>
//                                 </div>
//                               </div>
//                               <div className="col-lg-6">
//                                 <ul
//                                   className={
//                                     pricingStyle.secondPricingBoxMenualList
//                                   }
//                                 >
//                                   <li>
//                                     <LuBadgeCheck
//                                       className={pricingStyle.checkIcon}
//                                     />{" "}
//                                     20 driving lessons
//                                   </li>
//                                   <li>
//                                     <LuBadgeCheck
//                                       className={pricingStyle.checkIcon}
//                                     />{" "}
//                                     Age: 15 years and older
//                                   </li>
//                                   <li>
//                                     <LuBadgeCheck
//                                       className={pricingStyle.checkIcon}
//                                     />{" "}
//                                     Initial assessment
//                                   </li>
//                                   <li>
//                                     <LuBadgeCheck
//                                       className={pricingStyle.checkIcon}
//                                     />{" "}
//                                     Code Training
//                                   </li>
//                                   <li>
//                                     <LuBadgeCheck
//                                       className={pricingStyle.checkIcon}
//                                     />{" "}
//                                     Training follow-up by a coach
//                                   </li>
//                                   <li>
//                                     <LuBadgeCheck
//                                       className={pricingStyle.checkIcon}
//                                     />{" "}
//                                     Learning booklet (online)
//                                   </li>
//                                   <li>
//                                     <LuBadgeCheck
//                                       className={pricingStyle.checkIcon}
//                                     />{" "}
//                                     Preliminary appointment for supervised
//                                     driving
//                                   </li>
//                                 </ul>
//                               </div>
//                             </div>
//                           </div>
//                         </div>
//                         <div
//                           className="tab-pane fade"
//                           id="automatic-tab-pane"
//                           role="tabpanel"
//                           aria-labelledby="automatic-tab"
//                           tabIndex="0"
//                         >
//                           <div className={pricingStyle.secondPricingBox}>
//                             <h3>
//                               Supervised driving with automatic transmission
//                             </h3>
//                             <p>Theory test + 13 driving lessons</p>
//                             <div className="row">
//                               <div className="col-lg-6">
//                                 <div
//                                   className={
//                                     pricingStyle.secondRealPricingBoxAuto
//                                   }
//                                 >
//                                   <h4>Valentine's Day</h4>
//                                   <p>from</p>

//                                   <div className="d-flex justify-content-between align-items-center">
//                                     <div>
//                                       <h5>
//                                         Retail Price:{" "}
//                                         <span>
//                                           <br />
//                                           $1025
//                                         </span>
//                                       </h5>
//                                     </div>
//                                     <div>
//                                       <h3>$655</h3>
//                                     </div>
//                                   </div>

//                                   <p>
//                                     Enter your postal code to view your agency's
//                                     rates.
//                                   </p>

//                                   <Link
//                                     href="/register"
//                                     className="btn mx-auto"
//                                   >
//                                     Sign Up
//                                   </Link>
//                                 </div>
//                               </div>
//                               <div className="col-lg-6">
//                                 <ul
//                                   className={
//                                     pricingStyle.secondPricingBoxAutoList
//                                   }
//                                 >
//                                   <li>
//                                     <LuBadgeCheck
//                                       className={pricingStyle.checkIcon}
//                                     />{" "}
//                                     20 driving lessons
//                                   </li>
//                                   <li>
//                                     <LuBadgeCheck
//                                       className={pricingStyle.checkIcon}
//                                     />{" "}
//                                     Age: 15 years and older
//                                   </li>
//                                   <li>
//                                     <LuBadgeCheck
//                                       className={pricingStyle.checkIcon}
//                                     />{" "}
//                                     Initial assessment
//                                   </li>
//                                   <li>
//                                     <LuBadgeCheck
//                                       className={pricingStyle.checkIcon}
//                                     />{" "}
//                                     Code Training
//                                   </li>
//                                   <li>
//                                     <LuBadgeCheck
//                                       className={pricingStyle.checkIcon}
//                                     />{" "}
//                                     Training follow-up by a coach
//                                   </li>
//                                   <li>
//                                     <LuBadgeCheck
//                                       className={pricingStyle.checkIcon}
//                                     />{" "}
//                                     Learning booklet (online)
//                                   </li>
//                                   <li>
//                                     <LuBadgeCheck
//                                       className={pricingStyle.checkIcon}
//                                     />{" "}
//                                     Preliminary appointment for supervised
//                                     driving
//                                   </li>
//                                 </ul>
//                               </div>
//                             </div>
//                           </div>
//                         </div>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               </div>

//               {/* A La Cart */}
//               <div
//                 className="tab-pane fade"
//                 id="carte-tab-pane"
//                 role="tabpanel"
//                 aria-labelledby="carte-tab"
//                 tabIndex="0"
//               >
//                 <div className="mt-4 text-center">
//                   <h2>
//                     Discover our <span>à la carte</span> offers
//                   </h2>
//                   <p>
//                     It is possible to choose your training program à la carte.
//                   </p>
//                 </div>

//                 <div className="mt-5">
//                   <div className={pricingStyle.priceThirdBox}>
//                     <div className="d-flex justify-content-between align-items-center">
//                       <div>
//                         <h5 className="mb-0">Driving lessons</h5>
//                       </div>
//                       <div>
//                         <div className="d-flex justify-content-between align-items-center gap-5">
//                           <div>
//                             <h4 className="mb-0">$487</h4>
//                           </div>
//                           <div>
//                             <Link href="" className="btn">
//                               Add
//                             </Link>
//                           </div>
//                         </div>
//                       </div>
//                     </div>
//                   </div>
//                   <div className={pricingStyle.priceThirdBox}>
//                     <div className="d-flex justify-content-between align-items-center">
//                       <div>
//                         <h5 className="mb-0">
//                           Automatic transmission driving course
//                         </h5>
//                       </div>
//                       <div>
//                         <div className="d-flex justify-content-between align-items-center gap-5">
//                           <div>
//                             <h4 className="mb-0">$587</h4>
//                           </div>
//                           <div>
//                             <Link href="" className="btn">
//                               Add
//                             </Link>
//                           </div>
//                         </div>
//                       </div>
//                     </div>
//                   </div>
//                   <div className={pricingStyle.priceThirdBox}>
//                     <div className="d-flex justify-content-between align-items-center">
//                       <div>
//                         <h5 className="mb-0">Preliminary appointment</h5>
//                       </div>
//                       <div>
//                         <div className="d-flex justify-content-between align-items-center gap-5">
//                           <div>
//                             <h4 className="mb-0">$387</h4>
//                           </div>
//                           <div>
//                             <Link href="" className="btn">
//                               Add
//                             </Link>
//                           </div>
//                         </div>
//                       </div>
//                     </div>
//                   </div>
//                   <div className={pricingStyle.priceThirdBox}>
//                     <div className="d-flex justify-content-between align-items-center">
//                       <div>
//                         <h5 className="mb-0">Educational meeting</h5>
//                       </div>
//                       <div>
//                         <div className="d-flex justify-content-between align-items-center gap-5">
//                           <div>
//                             <h4 className="mb-0">$487</h4>
//                           </div>
//                           <div>
//                             <Link href="" className="btn">
//                               Add
//                             </Link>
//                           </div>
//                         </div>
//                       </div>
//                     </div>
//                   </div>
//                   <div className={pricingStyle.priceThirdBox}>
//                     <div className="d-flex justify-content-between align-items-center">
//                       <div>
//                         <h5 className="mb-0">
//                           Support during the practical exam
//                         </h5>
//                       </div>
//                       <div>
//                         <div className="d-flex justify-content-between align-items-center gap-5">
//                           <div>
//                             <h4 className="mb-0">$487</h4>
//                           </div>
//                           <div>
//                             <Link href="" className="btn">
//                               Add
//                             </Link>
//                           </div>
//                         </div>
//                       </div>
//                     </div>
//                   </div>
//                   <div className={pricingStyle.priceThirdBox}>
//                     <div className="d-flex justify-content-between align-items-center">
//                       <div>
//                         <h5 className="mb-0">
//                           Support for the practical automatic test
//                         </h5>
//                       </div>
//                       <div>
//                         <div className="d-flex justify-content-between align-items-center gap-5">
//                           <div>
//                             <h4 className="mb-0">$487</h4>
//                           </div>
//                           <div>
//                             <Link href="" className="btn">
//                               Add
//                             </Link>
//                           </div>
//                         </div>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               </div>

//               {/* Code */}
//               <div
//                 className="tab-pane fade"
//                 id="code-tab-pane"
//                 role="tabpanel"
//                 aria-labelledby="code-tab"
//                 tabIndex="0"
//               >
//                 <div className="mt-4 text-center">
//                   <h2>
//                     Permisgo <span>Highway Code</span> Packs
//                   </h2>
//                   <p>What is your need?</p>
//                 </div>

//                 <div className="mt-4">
//                   <div className="row">
//                     <div className="col-lg-4">
//                       <div className={pricingStyle.forthPriceBox}>
//                         <h3>Eco Code</h3>
//                         <p>Complete review</p>
//                         <div className={pricingStyle.forthPriceNumberPart}>
//                           <div className="text-center">
//                             <h2>Free</h2>
//                           </div>
//                         </div>
//                         <h4 className="my-4">Package contents:</h4>
//                         <div className={pricingStyle.forthPricePackage}>
//                           <ul>
//                             <li>
//                               <LuBadgeCheck
//                                 className={pricingStyle.checkIcon}
//                               />{" "}
//                               Duration: Unlimited
//                             </li>
//                             <li>
//                               <LuBadgeCheck
//                                 className={pricingStyle.checkIcon}
//                               />{" "}
//                               Access to the code app
//                             </li>
//                             <li>
//                               <LuBadgeCheck
//                                 className={pricingStyle.checkIcon}
//                               />{" "}
//                               Video lessons and online manual
//                             </li>
//                             <li>
//                               <LuBadgeCheck
//                                 className={pricingStyle.checkIcon}
//                               />{" "}
//                               5000 questions and 30 practice exams
//                             </li>
//                           </ul>
//                         </div>
//                         <div className="mt-4">
//                           <Link href="" className="btn">
//                             Sign Up
//                           </Link>
//                         </div>
//                       </div>
//                     </div>
//                     <div className="col-lg-4">
//                       <div className={pricingStyle.forthPriceBox}>
//                         <h3>Zen Code</h3>
//                         <p>Complete review + Administrative procedures</p>
//                         <div className={pricingStyle.forthPriceNumberPart}>
//                           <div className="d-flex justify-content-between align-items-center">
//                             <div>
//                               <h2 className="mb-0">€9.99</h2>
//                               <p className="mb-0">Valentine's Day</p>
//                             </div>
//                             <div>
//                               <h5 className="mb-0">€19.99</h5>
//                               <small>retail price</small>
//                             </div>
//                           </div>
//                         </div>
//                         <h4 className="my-4">Package contents:</h4>
//                         <div className={pricingStyle.forthPricePackage}>
//                           <ul>
//                             <li>
//                               <LuBadgeCheck
//                                 className={pricingStyle.checkIcon}
//                               />{" "}
//                               Duration: 12-month package
//                             </li>
//                             <li>
//                               <LuBadgeCheck
//                                 className={pricingStyle.checkIcon}
//                               />{" "}
//                               Access to the code app
//                             </li>
//                             <li>
//                               <LuBadgeCheck
//                                 className={pricingStyle.checkIcon}
//                               />{" "}
//                               Video lessons and online manual
//                             </li>
//                             <li>
//                               <LuBadgeCheck
//                                 className={pricingStyle.checkIcon}
//                               />{" "}
//                               5000 questions and 30 practice exams
//                             </li>
//                             <li>
//                               <LuBadgeCheck
//                                 className={pricingStyle.checkIcon}
//                               />{" "}
//                               Administrative procedures & Coaching
//                             </li>
//                             <li>
//                               <FaTimes className={pricingStyle.checkIcon} /> A
//                               place to take the theory test
//                             </li>
//                           </ul>
//                         </div>
//                         <div className="mt-4">
//                           <Link href="" className="btn">
//                             Sign Up
//                           </Link>
//                         </div>
//                       </div>
//                     </div>
//                     <div className="col-lg-4">
//                       <div className={pricingStyle.forthPriceBox}>
//                         <h3>Success Code</h3>
//                         <p>Theory test slot included</p>
//                         <div className={pricingStyle.forthPriceNumberPart}>
//                           <div className="d-flex justify-content-between align-items-center">
//                             <div>
//                               <h2 className="mb-0">€9.99</h2>
//                               <p className="mb-0">Valentine's Day</p>
//                             </div>
//                             <div>
//                               <h5 className="mb-0">€19.99</h5>
//                               <small>retail price</small>
//                             </div>
//                           </div>
//                         </div>
//                         <h4 className="my-4">Package contents:</h4>
//                         <div className={pricingStyle.forthPricePackage}>
//                           <ul>
//                             <li>
//                               <LuBadgeCheck
//                                 className={pricingStyle.checkIcon}
//                               />{" "}
//                               Duration: 12-month package
//                             </li>
//                             <li>
//                               <LuBadgeCheck
//                                 className={pricingStyle.checkIcon}
//                               />{" "}
//                               Access to the code app
//                             </li>
//                             <li>
//                               <LuBadgeCheck
//                                 className={pricingStyle.checkIcon}
//                               />{" "}
//                               Video lessons and online manual
//                             </li>
//                             <li>
//                               <LuBadgeCheck
//                                 className={pricingStyle.checkIcon}
//                               />{" "}
//                               5000 questions and 30 practice exams
//                             </li>
//                             <li>
//                               <LuBadgeCheck
//                                 className={pricingStyle.checkIcon}
//                               />{" "}
//                               Administrative procedures & Coaching
//                             </li>
//                             <li>
//                               <LuBadgeCheck
//                                 className={pricingStyle.checkIcon}
//                               />{" "}
//                               A place to take the theory test
//                             </li>
//                           </ul>
//                         </div>
//                         <div className="mt-4">
//                           <Link href="" className="btn">
//                             Sign Up
//                           </Link>
//                         </div>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               </div>

//               {/* Code */}
//               <div
//                 className="tab-pane fade"
//                 id="cpf-tab-pane"
//                 role="tabpanel"
//                 aria-labelledby="cpf-tab"
//                 tabIndex="0"
//               >
//                 <div className="mt-4 text-center">
//                   <h2>
//                     Permisgo <span>Highway Code</span> Packs
//                   </h2>
//                   <p>What is your need?</p>
//                 </div>

//                 <div className="mt-4">
//                   <div className="row">
//                     <div className="col-lg-4">
//                       <div className={pricingStyle.forthPriceBox}>
//                         <h3>Eco Code</h3>
//                         <p>Complete review</p>
//                         <div className={pricingStyle.forthPriceNumberPart}>
//                           <div className="text-center">
//                             <h2>Free</h2>
//                           </div>
//                         </div>
//                         <h4 className="my-4">Package contents:</h4>
//                         <div className={pricingStyle.forthPricePackage}>
//                           <ul>
//                             <li>
//                               <LuBadgeCheck
//                                 className={pricingStyle.checkIcon}
//                               />{" "}
//                               Duration: Unlimited
//                             </li>
//                             <li>
//                               <LuBadgeCheck
//                                 className={pricingStyle.checkIcon}
//                               />{" "}
//                               Access to the code app
//                             </li>
//                             <li>
//                               <LuBadgeCheck
//                                 className={pricingStyle.checkIcon}
//                               />{" "}
//                               Video lessons and online manual
//                             </li>
//                             <li>
//                               <LuBadgeCheck
//                                 className={pricingStyle.checkIcon}
//                               />{" "}
//                               5000 questions and 30 practice exams
//                             </li>
//                           </ul>
//                         </div>
//                         <div className="mt-4">
//                           <Link href="" className="btn">
//                             Sign Up
//                           </Link>
//                         </div>
//                       </div>
//                     </div>
//                     <div className="col-lg-4">
//                       <div className={pricingStyle.forthPriceBox}>
//                         <h3>Zen Code</h3>
//                         <p>Complete review + Administrative procedures</p>
//                         <div className={pricingStyle.forthPriceNumberPart}>
//                           <div className="d-flex justify-content-between align-items-center">
//                             <div>
//                               <h2 className="mb-0">€9.99</h2>
//                               <p className="mb-0">Valentine's Day</p>
//                             </div>
//                             <div>
//                               <h5 className="mb-0">€19.99</h5>
//                               <small>retail price</small>
//                             </div>
//                           </div>
//                         </div>
//                         <h4 className="my-4">Package contents:</h4>
//                         <div className={pricingStyle.forthPricePackage}>
//                           <ul>
//                             <li>
//                               <LuBadgeCheck
//                                 className={pricingStyle.checkIcon}
//                               />{" "}
//                               Duration: 12-month package
//                             </li>
//                             <li>
//                               <LuBadgeCheck
//                                 className={pricingStyle.checkIcon}
//                               />{" "}
//                               Access to the code app
//                             </li>
//                             <li>
//                               <LuBadgeCheck
//                                 className={pricingStyle.checkIcon}
//                               />{" "}
//                               Video lessons and online manual
//                             </li>
//                             <li>
//                               <LuBadgeCheck
//                                 className={pricingStyle.checkIcon}
//                               />{" "}
//                               5000 questions and 30 practice exams
//                             </li>
//                             <li>
//                               <LuBadgeCheck
//                                 className={pricingStyle.checkIcon}
//                               />{" "}
//                               Administrative procedures & Coaching
//                             </li>
//                             <li>
//                               <FaTimes className={pricingStyle.checkIcon} /> A
//                               place to take the theory test
//                             </li>
//                           </ul>
//                         </div>
//                         <div className="mt-4">
//                           <Link href="" className="btn">
//                             Sign Up
//                           </Link>
//                         </div>
//                       </div>
//                     </div>
//                     <div className="col-lg-4">
//                       <div className={pricingStyle.forthPriceBox}>
//                         <h3>Success Code</h3>
//                         <p>Theory test slot included</p>
//                         <div className={pricingStyle.forthPriceNumberPart}>
//                           <div className="d-flex justify-content-between align-items-center">
//                             <div>
//                               <h2 className="mb-0">€9.99</h2>
//                               <p className="mb-0">Valentine's Day</p>
//                             </div>
//                             <div>
//                               <h5 className="mb-0">€19.99</h5>
//                               <small>retail price</small>
//                             </div>
//                           </div>
//                         </div>
//                         <h4 className="my-4">Package contents:</h4>
//                         <div className={pricingStyle.forthPricePackage}>
//                           <ul>
//                             <li>
//                               <LuBadgeCheck
//                                 className={pricingStyle.checkIcon}
//                               />{" "}
//                               Duration: 12-month package
//                             </li>
//                             <li>
//                               <LuBadgeCheck
//                                 className={pricingStyle.checkIcon}
//                               />{" "}
//                               Access to the code app
//                             </li>
//                             <li>
//                               <LuBadgeCheck
//                                 className={pricingStyle.checkIcon}
//                               />{" "}
//                               Video lessons and online manual
//                             </li>
//                             <li>
//                               <LuBadgeCheck
//                                 className={pricingStyle.checkIcon}
//                               />{" "}
//                               5000 questions and 30 practice exams
//                             </li>
//                             <li>
//                               <LuBadgeCheck
//                                 className={pricingStyle.checkIcon}
//                               />{" "}
//                               Administrative procedures & Coaching
//                             </li>
//                             <li>
//                               <LuBadgeCheck
//                                 className={pricingStyle.checkIcon}
//                               />{" "}
//                               A place to take the theory test
//                             </li>
//                           </ul>
//                         </div>
//                         <div className="mt-4">
//                           <Link href="" className="btn">
//                             Sign Up
//                           </Link>
//                         </div>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </section>

//       <section>
//         <div className={pricingStyle.pricing_third}>
//           <div className="container-fluid">
//             <div className={pricingStyle.pricing_third_inner}>
//               <div className="text-center">
//                 <h2>Manage your entire online training at the best price</h2>
//                 <div className="mt-4">
//                   <Link href="" className="btn">
//                     Discover our offers
//                   </Link>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </section>

//       <section>
//         <div className={pricingStyle.pricing_forth}>
//           <div className="container-fluid">
//             <div className={pricingStyle.pricing_forth_inner}>
//               <div className="row">
//                 <div className="col-lg-7">
//                   <h2>Get your driver's license using your CPF</h2>
//                   <p>
//                     Permisgo is Qualiopi certified and eligible for CPF funding.
//                     Finance your driving licence with your Personal Training
//                     Account (CPF).
//                   </p>
//                   <div className="mt-4">
//                     <Link href="" className="btn">
//                       Discover our CPF offers
//                     </Link>
//                   </div>
//                 </div>
//                 <div className="col-lg-5">
//                   <Image src={offerThree} layout="responsive" alt=""></Image>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </section>

//       <section>
//         <div id={pricingStyle.pricingFaq}>
//           <div className="container">
//             <div className="text-center">
//               <h2>Do you have any questions?</h2>
//               <p>Find all our answers in one click</p>
//             </div>

//             <div className="py-4">
//               <div className="accordion" id="accordionExample">
//                 <div className="accordion-item">
//                   <h2 className="accordion-header">
//                     <button
//                       className="accordion-button"
//                       type="button"
//                       data-bs-toggle="collapse"
//                       data-bs-target="#collapseOne"
//                       aria-expanded="true"
//                       aria-controls="collapseOne"
//                     >
//                       Accordion Item #1
//                     </button>
//                   </h2>
//                   <div
//                     id="collapseOne"
//                     className="accordion-collapse collapse show"
//                     data-bs-parent="#accordionExample"
//                   >
//                     <div className="accordion-body">
//                       <strong>This is the first item’s accordion body.</strong>{" "}
//                       It is shown by default, until the collapse plugin adds the
//                       appropriate classes that we use to style each element.
//                       These classes control the overall appearance, as well as
//                       the showing and hiding via CSS transitions. You can modify
//                       any of this with custom CSS or overriding our default
//                       variables. It’s also worth noting that just about any HTML
//                       can go within the <code>.accordion-body</code>, though the
//                       transition does limit overflow.
//                     </div>
//                   </div>
//                 </div>
//                 <div className="accordion-item">
//                   <h2 className="accordion-header">
//                     <button
//                       className="accordion-button collapsed"
//                       type="button"
//                       data-bs-toggle="collapse"
//                       data-bs-target="#collapseTwo"
//                       aria-expanded="false"
//                       aria-controls="collapseTwo"
//                     >
//                       Accordion Item #2
//                     </button>
//                   </h2>
//                   <div
//                     id="collapseTwo"
//                     className="accordion-collapse collapse"
//                     data-bs-parent="#accordionExample"
//                   >
//                     <div className="accordion-body">
//                       <strong>This is the second item’s accordion body.</strong>{" "}
//                       It is hidden by default, until the collapse plugin adds
//                       the appropriate classes that we use to style each element.
//                       These classes control the overall appearance, as well as
//                       the showing and hiding via CSS transitions. You can modify
//                       any of this with custom CSS or overriding our default
//                       variables. It’s also worth noting that just about any HTML
//                       can go within the <code>.accordion-body</code>, though the
//                       transition does limit overflow.
//                     </div>
//                   </div>
//                 </div>
//                 <div className="accordion-item">
//                   <h2 className="accordion-header">
//                     <button
//                       className="accordion-button collapsed"
//                       type="button"
//                       data-bs-toggle="collapse"
//                       data-bs-target="#collapseThree"
//                       aria-expanded="false"
//                       aria-controls="collapseThree"
//                     >
//                       Accordion Item #3
//                     </button>
//                   </h2>
//                   <div
//                     id="collapseThree"
//                     className="accordion-collapse collapse"
//                     data-bs-parent="#accordionExample"
//                   >
//                     <div className="accordion-body">
//                       <strong>This is the third item’s accordion body.</strong>{" "}
//                       It is hidden by default, until the collapse plugin adds
//                       the appropriate classes that we use to style each element.
//                       These classes control the overall appearance, as well as
//                       the showing and hiding via CSS transitions. You can modify
//                       any of this with custom CSS or overriding our default
//                       variables. It’s also worth noting that just about any HTML
//                       can go within the <code>.accordion-body</code>, though the
//                       transition does limit overflow.
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </section>
//     </>
//   );
// };

// export default pricing;

// // "use client";

// // import React, { useState } from "react";
// // import Image from "next/image";
// // import Link from "next/link";

// // import firstImage from "../../../../public/image/price1.webp";

// // import { LuBadgeCheck } from "react-icons/lu";
// // import { FaArrowRight } from "react-icons/fa6";

// // import pricingStyle from "./styles/pricing.module.css";

// // const categories = [
// //   "Driving License",
// //   "Accompanied Driving",
// //   "A la carte",
// //   "Code",
// //   "CPF Offers",
// // ];

// // const transmissions = ["Manual", "Automatic"];
// // const courses = ["5 Course", "10 Course", "20 Course", "30 Course"];

// // const plans = [
// //   {
// //     name: "Zen Permit",
// //     tag: "Most economical",
// //     description: "Theory test + 20 driving lessons",
// //     oldPrice: "€849",
// //     price: "€599",
// //     highlight: false,
// //     features: [
// //       "20 driving lessons",
// //       "Initial assessment",
// //       "Code training",
// //       "30-day training course",
// //       "Exam date within 30 days",
// //     ],
// //   },
// //   {
// //     name: "Premium Permit",
// //     tag: "Popular choice",
// //     description: "Practical exam date within 30 days",
// //     oldPrice: "€849",
// //     price: "€699",
// //     highlight: true,
// //     features: [
// //       "20 driving lessons",
// //       "Initial assessment",
// //       "Code training",
// //       "Priority booking",
// //       "Training follow-up by coach",
// //     ],
// //   },
// //   {
// //     name: "Accelerated Permit",
// //     tag: "Fast track",
// //     description: "Complete training in a shorter period",
// //     oldPrice: "€999",
// //     price: "€799",
// //     highlight: false,
// //     features: [
// //       "20 driving lessons",
// //       "Initial assessment",
// //       "Code training",
// //       "Intensive practice",
// //       "Fast exam preparation",
// //       "Exam date support",
// //     ],
// //   },
// // ];

// // const alaCarteOffers = [
// //   { title: "Driving lessons", price: "€487" },
// //   { title: "Automatic transmission driving course", price: "€587" },
// //   { title: "Preliminary appointment", price: "€387" },
// //   { title: "Educational meeting", price: "€487" },
// //   { title: "Support during the practical exam", price: "€487" },
// // ];

// // export default function Pricing() {
// //   const [activeCategory, setActiveCategory] = useState("Driving License");
// //   const [activeTransmission, setActiveTransmission] = useState("Manual");
// //   const [activeCourse, setActiveCourse] = useState("5 Course");

// //   return (
// //     <main className={pricingStyle.pricing_page}>
// //       <section className={pricingStyle.hero_section}>
// //         <div className="container">
// //           <div className="row align-items-center g-5">
// //             <div className="col-lg-6">
// //               <div className={pricingStyle.hero_content}>
// //                 <span className={pricingStyle.eyebrow}>Transparent pricing</span>

// //                 <h1>
// //                   Our prices are up to <span>30% cheaper</span>
// //                 </h1>

// //                 <p>
// //                   Choose a flexible driving package designed for your learning
// //                   style, schedule, and budget. Clean pricing, no hidden
// //                   surprises.
// //                 </p>

// //                 <div className={pricingStyle.hero_actions}>
// //                   <Link href="/register" className={pricingStyle.primary_btn}>
// //                     To Be Accompanied by an Advisor
// //                     <FaArrowRight />
// //                   </Link>

// //                   <Link href="#pricing-plans" className={pricingStyle.secondary_btn}>
// //                     View plans
// //                   </Link>
// //                 </div>
// //               </div>
// //             </div>

// //             <div className="col-lg-6">
// //               <div className={pricingStyle.hero_image_card}>
// //                 <Image
// //                   src={firstImage}
// //                   alt="Driving lesson pricing"
// //                   className={pricingStyle.hero_image}
// //                   priority
// //                 />
// //               </div>
// //             </div>
// //           </div>
// //         </div>
// //       </section>

// //       <section id="pricing-plans" className={pricingStyle.pricing_section}>
// //         <div className="container">
// //           <div className={pricingStyle.section_header}>
// //             <span className={pricingStyle.eyebrow}>Pricing plans</span>
// //             <h2>Choose the right package</h2>
// //             <p>
// //               Simple, modern and flexible offers for every stage of your driving
// //               journey.
// //             </p>
// //           </div>

// //           <div className={pricingStyle.category_tabs}>
// //             {categories.map((category) => (
// //               <button
// //                 key={category}
// //                 type="button"
// //                 onClick={() => setActiveCategory(category)}
// //                 className={
// //                   activeCategory === category ? pricingStyle.active_tab : ""
// //                 }
// //               >
// //                 {category}
// //               </button>
// //             ))}
// //           </div>

// //           {activeCategory === "Driving License" && (
// //             <>
// //               <div className={pricingStyle.controls_row}>
// //                 <div className={pricingStyle.segmented_control}>
// //                   {transmissions.map((item) => (
// //                     <button
// //                       key={item}
// //                       type="button"
// //                       onClick={() => setActiveTransmission(item)}
// //                       className={
// //                         activeTransmission === item ? pricingStyle.active_segment : ""
// //                       }
// //                     >
// //                       {item}
// //                     </button>
// //                   ))}
// //                 </div>

// //                 <div className={pricingStyle.course_pills}>
// //                   {courses.map((course) => (
// //                     <button
// //                       key={course}
// //                       type="button"
// //                       onClick={() => setActiveCourse(course)}
// //                       className={
// //                         activeCourse === course ? pricingStyle.active_course : ""
// //                       }
// //                     >
// //                       {course}
// //                     </button>
// //                   ))}
// //                 </div>
// //               </div>

// //               <div className="row g-4 mt-2">
// //                 {plans.map((plan) => (
// //                   <div className="col-md-6 col-xl-4" key={plan.name}>
// //                     <PricingCard plan={plan} />
// //                   </div>
// //                 ))}
// //               </div>
// //             </>
// //           )}

// //           {activeCategory === "Accompanied Driving" && (
// //             <div className={pricingStyle.feature_plan}>
// //               <div>
// //                 <span className={pricingStyle.eyebrow}>Supervised driving</span>
// //                 <h3>Learn with confidence and guided support</h3>
// //                 <p>
// //                   Includes theory preparation, driving lessons, learning booklet,
// //                   and coach follow-up.
// //                 </p>
// //               </div>

// //               <div className={pricingStyle.feature_price_box}>
// //                 <small>from</small>
// //                 <h2>€655</h2>
// //                 <Link href="/register" className={pricingStyle.primary_btn}>
// //                   Sign Up <FaArrowRight />
// //                 </Link>
// //               </div>
// //             </div>
// //           )}

// //           {activeCategory === "A la carte" && (
// //             <div className={pricingStyle.offer_list}>
// //               {alaCarteOffers.map((offer) => (
// //                 <div className={pricingStyle.offer_item} key={offer.title}>
// //                   <h5>{offer.title}</h5>

// //                   <div>
// //                     <strong>{offer.price}</strong>
// //                     <Link href="/register">Add</Link>
// //                   </div>
// //                 </div>
// //               ))}
// //             </div>
// //           )}

// //           {activeCategory === "Code" && (
// //             <div className="row g-4">
// //               <div className="col-md-6 col-xl-4">
// //                 <MiniPlan title="Eco Code" price="Free" />
// //               </div>
// //               <div className="col-md-6 col-xl-4">
// //                 <MiniPlan title="Zen Code" price="€9.99" />
// //               </div>
// //               <div className="col-md-6 col-xl-4">
// //                 <MiniPlan title="Premium Code" price="€19.99" />
// //               </div>
// //             </div>
// //           )}

// //           {activeCategory === "CPF Offers" && (
// //             <div className={pricingStyle.empty_state}>
// //               <h3>CPF offers are coming soon</h3>
// //               <p>We are preparing flexible CPF-supported packages for you.</p>
// //             </div>
// //           )}
// //         </div>
// //       </section>
// //     </main>
// //   );
// // }

// // function PricingCard({ plan }) {
// //   return (
// //     <article
// //       className={`${pricingStyle.pricing_card} ${
// //         plan.highlight ? pricingStyle.highlight_card : ""
// //       }`}
// //     >
// //       {plan.highlight && <span className={pricingStyle.popular_badge}>Popular</span>}

// //       <div className={pricingStyle.card_top}>
// //         <span>{plan.tag}</span>
// //         <h3>{plan.name}</h3>
// //         <p>{plan.description}</p>
// //       </div>

// //       <div className={pricingStyle.price_box}>
// //         <div>
// //           <small>Retail price</small>
// //           <del>{plan.oldPrice}</del>
// //         </div>

// //         <h2>
// //           {plan.price}
// //           <span>*</span>
// //         </h2>

// //         <p>Enter your postal code to view your agency’s rates.</p>
// //       </div>

// //       <div className={pricingStyle.feature_list}>
// //         <h4>Package contents</h4>

// //         <ul>
// //           {plan.features.map((feature) => (
// //             <li key={feature}>
// //               <LuBadgeCheck />
// //               {feature}
// //             </li>
// //           ))}
// //         </ul>
// //       </div>

// //       <Link href="/register" className={pricingStyle.card_btn}>
// //         Sign Up
// //       </Link>
// //     </article>
// //   );
// // }

// // function MiniPlan({ title, price }) {
// //   return (
// //     <article className={pricingStyle.pricing_card}>
// //       <div className={pricingStyle.card_top}>
// //         <span>Highway Code</span>
// //         <h3>{title}</h3>
// //         <p>Complete review with digital learning support.</p>
// //       </div>

// //       <div className={pricingStyle.price_box}>
// //         <h2>{price}</h2>
// //       </div>

// //       <div className={pricingStyle.feature_list}>
// //         <ul>
// //           <li>
// //             <LuBadgeCheck /> Unlimited access
// //           </li>
// //           <li>
// //             <LuBadgeCheck /> Video lessons
// //           </li>
// //           <li>
// //             <LuBadgeCheck /> Practice exams
// //           </li>
// //         </ul>
// //       </div>

// //       <Link href="/register" className={pricingStyle.card_btn}>
// //         Sign Up
// //       </Link>
// //     </article>
// //   );
// // }

"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

// Images
import offerThree from "../../../../public/image/offer3.png";
import firstImage from "../../../../public/image/price1.webp";

// Icons
import { FaChevronDown, FaTimes } from "react-icons/fa";
import { LuBadgeCheck } from "react-icons/lu";

const mainTabs = [
  "Driving License",
  "Accompanied Driving",
  "A la carte",
  "Code",
  "CPF Offers",
];

const courseTabs = ["5 Course", "10 Course", "20 Course", "30 Course"];

const licenseCards = [
  {
    title: "Zen Permit",
    subtitle: "Theory test + 20 driving lessons",
    note: "Most economical offer",
    oldPrice: "&849",
    price: "&599*",
    features: [
      "20 driving lessons",
      "Initial assessment",
      "Code Training",
      "30-day training course",
      "Exam date within 30 days",
    ],
  },
  {
    title: "Premium Permit",
    subtitle: "Theory test + 20 driving lessons",
    note: "Practical exam date within 30 days",
    oldPrice: "&849",
    price: "&599*",
    features: [
      "20 driving lessons",
      "Initial assessment",
      "Code Training",
      "30-day training course",
      "Exam date within 30 days",
    ],
  },
  {
    title: "Accelerated Permit",
    subtitle: "Theory test + 20 driving lessons",
    note: "30-day training course",
    oldPrice: "&849",
    price: "&599*",
    features: [
      "20 driving lessons",
      "Initial assessment",
      "Code Training",
      "30-day training course",
      "20 driving lessons",
      "Exam date within 30 days",
      "Code Training",
      "30-day training course",
    ],
  },
];

const supervisedFeatures = [
  "20 driving lessons",
  "Age: 15 years and older",
  "Initial assessment",
  "Code Training",
  "Training follow-up by a coach",
  "Learning booklet (online)",
  "Preliminary appointment for supervised driving",
];

const carteItems = [
  {
    title: "Driving lessons",
    price: "$487",
  },
  {
    title: "Automatic transmission driving course",
    price: "$587",
  },
  {
    title: "Preliminary appointment",
    price: "$387",
  },
  {
    title: "Educational meeting",
    price: "$487",
  },
  {
    title: "Support during the practical exam",
    price: "$487",
  },
  {
    title: "Support for the practical automatic test",
    price: "$487",
  },
];

const codePacks = [
  {
    title: "Eco Code",
    description: "Complete review",
    price: "Free",
    oldPrice: "",
    label: "",
    centerPrice: true,
    features: [
      { text: "Duration: Unlimited", available: true },
      { text: "Access to the code app", available: true },
      { text: "Video lessons and online manual", available: true },
      { text: "5000 questions and 30 practice exams", available: true },
    ],
  },
  {
    title: "Zen Code",
    description: "Complete review + Administrative procedures",
    price: "€9.99",
    oldPrice: "€19.99",
    label: "Valentine's Day",
    features: [
      { text: "Duration: 12-month package", available: true },
      { text: "Access to the code app", available: true },
      { text: "Video lessons and online manual", available: true },
      { text: "5000 questions and 30 practice exams", available: true },
      { text: "Administrative procedures & Coaching", available: true },
      { text: "A place to take the theory test", available: false },
    ],
  },
  {
    title: "Success Code",
    description: "Theory test slot included",
    price: "€9.99",
    oldPrice: "€19.99",
    label: "Valentine's Day",
    features: [
      { text: "Duration: 12-month package", available: true },
      { text: "Access to the code app", available: true },
      { text: "Video lessons and online manual", available: true },
      { text: "5000 questions and 30 practice exams", available: true },
      { text: "Administrative procedures & Coaching", available: true },
      { text: "A place to take the theory test", available: true },
    ],
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

const tabButtonClass = (active) =>
  active
    ? "rounded-md bg-[#023389] px-5 py-3 text-sm font-semibold text-white transition duration-300"
    : "rounded-md border border-[#d6e5ff] bg-white px-5 py-3 text-sm font-semibold text-[#023389] transition duration-300 hover:bg-[#d6e5ff]";

const ctaButtonClass =
  "inline-block rounded-md bg-[#bb1e2f] px-6 py-3 text-center font-semibold text-white transition duration-300 hover:bg-[#20ba2b]";

const fullCtaButtonClass =
  "inline-block w-full rounded-md bg-[#bb1e2f] px-6 py-3 text-center font-semibold text-white transition duration-300 hover:bg-[#20ba2b]";

const FeatureItem = ({ children, available = true }) => {
  return (
    <li className="flex items-start gap-2 pb-[10px] text-[18px] text-slate-700">
      {available ? (
        <LuBadgeCheck className="mt-1 shrink-0 text-[#bb1e2f]" />
      ) : (
        <FaTimes className="mt-1 shrink-0 text-[#bb1e2f]" />
      )}
      <span>{children}</span>
    </li>
  );
};

const LicenseCard = ({ card }) => {
  return (
    <div className="rounded-[10px] border-[3px] border-[#d6e5ff] p-[30px] max-[500px]:mb-[20px] max-[500px]:p-[10px]">
      <div className="text-center">
        <h3 className="text-[35px] font-bold leading-tight text-[#bb1e2f] max-[500px]:text-[30px]">
          {card.title}
        </h3>
        <p className="mb-0 text-slate-700">{card.subtitle}</p>
        <p className="mb-0 text-slate-700">{card.note}</p>
      </div>

      <hr className="my-4 border-slate-200" />

      <div className="rounded-[10px] bg-[#d9ffdc] p-[15px]">
        <div className="flex justify-between gap-4">
          <div>
            <h5 className="mb-0 font-semibold text-slate-900">Extension</h5>
            <p className="mb-0 text-slate-700">from</p>
          </div>

          <div className="text-right">
            <h5 className="mb-0 line-through text-slate-900">
              {card.oldPrice}
            </h5>
            <p className="mb-0 text-slate-700">retail price</p>
          </div>
        </div>

        <div className="py-4">
          <h2 className="text-[50px] font-bold leading-tight text-slate-950 max-[500px]:text-[40px]">
            {card.price}
          </h2>
        </div>

        <p className="mb-0 text-slate-700">
          Enter your postal code to view your agency&apos;s rates.
        </p>
      </div>

      <h4 className="mt-[20px] text-xl font-bold text-[#023389]">
        Package contents:
      </h4>

      <div className="mt-[20px] h-[200px] overflow-y-scroll pr-2">
        <ul>
          {card.features.map((feature, index) => (
            <FeatureItem key={index}>{feature}</FeatureItem>
          ))}
        </ul>
      </div>

      <div className="mt-4">
        <Link href="#" className={fullCtaButtonClass}>
          Sign Up
        </Link>
      </div>
    </div>
  );
};

const LicenseContent = () => {
  const [licenseType, setLicenseType] = useState("Menual");
  const [activeCourse, setActiveCourse] = useState("5 Course");

  return (
    <div className="pt-4">
      <div className="flex items-center justify-between gap-4 max-[500px]:mb-[20px] max-[500px]:flex-col">
        <div className="text-center">
          <h2 className="mt-3 text-[40px] font-bold leading-tight text-slate-950 max-[500px]:text-[30px]">
            Our <span className="text-[#bb1e2f]">Rates</span>
          </h2>
        </div>

        <div className="flex flex-wrap justify-center gap-3">
          {["Menual", "Automatic"].map((tab) => (
            <button
              key={tab}
              type="button"
              onClick={() => setLicenseType(tab)}
              className={tabButtonClass(licenseType === tab)}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-[20px] rounded-[10px] border-[3px] border-[#d6e5ff] p-[10px]">
        <div className="flex flex-wrap justify-center gap-3">
          {courseTabs.map((tab) => (
            <button
              key={tab}
              type="button"
              onClick={() => setActiveCourse(tab)}
              className={tabButtonClass(activeCourse === tab)}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-5">
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          {licenseCards.map((card) => (
            <LicenseCard
              key={`${licenseType}-${activeCourse}-${card.title}`}
              card={card}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

const SupervisedDrivingContent = () => {
  const [type, setType] = useState("Menual");

  const isManual = type === "Menual";

  return (
    <div className="py-3">
      <div className="text-center">
        <h2 className="mt-3 text-[40px] font-bold leading-tight text-slate-950 max-[500px]:text-[30px]">
          Our Supervised <span className="text-[#bb1e2f]">Driving</span> Package
        </h2>

        <div className="pt-4">
          <div className="flex flex-wrap justify-center gap-3">
            {["Menual", "Automatic"].map((tab) => (
              <button
                key={tab}
                type="button"
                onClick={() => setType(tab)}
                className={tabButtonClass(type === tab)}
              >
                {tab}
              </button>
            ))}
          </div>

          <div className="mt-4">
            <div className="rounded-[10px] border-[3px] border-[#d6e5ff] p-[30px] max-[500px]:p-[10px]">
              <h3 className="text-2xl font-bold text-slate-950">
                {isManual
                  ? "Supervised Driving"
                  : "Supervised driving with automatic transmission"}
              </h3>

              <p className="mt-2 text-slate-700">
                {isManual
                  ? "Theory test + 20 driving lessons"
                  : "Theory test + 13 driving lessons"}
              </p>

              <div className="mt-5 grid grid-cols-1 gap-6 lg:grid-cols-2">
                <div
                  className={`rounded-[10px] p-[30px] text-left max-[500px]:mb-[15px] ${
                    isManual ? "bg-[#d9ffdc]" : "bg-[#ffdadd]"
                  }`}
                >
                  <h4 className="text-xl font-bold text-slate-950">
                    Valentine&apos;s Day
                  </h4>
                  <p className="mt-2 text-slate-700">from</p>

                  <div className="flex items-center justify-between gap-4">
                    <div>
                      <h5 className="font-semibold text-slate-900">
                        Retail Price:
                        <br />
                        <span className="line-through">$1025</span>
                      </h5>
                    </div>

                    <div>
                      <h3 className="text-[50px] font-bold leading-tight text-slate-950 max-[500px]:text-[40px]">
                        $655
                      </h3>
                    </div>
                  </div>

                  <p className="mt-4 text-slate-700">
                    Enter your postal code to view your agency&apos;s rates.
                  </p>

                  <Link href="/register" className={fullCtaButtonClass}>
                    Sign Up
                  </Link>
                </div>

                <ul className="text-left">
                  {supervisedFeatures.map((feature, index) => (
                    <FeatureItem key={index}>{feature}</FeatureItem>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const CarteContent = () => {
  return (
    <>
      <div className="mt-4 text-center">
        <h2 className="text-[40px] font-bold leading-tight text-slate-950 max-[500px]:text-[30px]">
          Discover our <span className="text-[#bb1e2f]">à la carte</span> offers
        </h2>
        <p className="mt-2 text-slate-700">
          It is possible to choose your training program à la carte.
        </p>
      </div>

      <div className="mt-5">
        {carteItems.map((item, index) => (
          <div
            key={index}
            className="mb-[15px] rounded-[10px] border-[3px] border-[#d6e5ff] p-[30px]"
          >
            <div className="flex items-center justify-between gap-5 max-[500px]:flex-col max-[500px]:items-start">
              <h5 className="mb-0 text-lg font-semibold text-slate-950">
                {item.title}
              </h5>

              <div className="flex items-center gap-5">
                <h4 className="mb-0 text-xl font-bold text-slate-950">
                  {item.price}
                </h4>

                <Link href="#" className={ctaButtonClass}>
                  Add
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

const CodePackCard = ({ pack }) => {
  return (
    <div className="rounded-[10px] border-[3px] border-[#d6e5ff] p-[30px] max-[500px]:mb-[20px] max-[500px]:p-[10px]">
      <h3 className="text-[35px] font-bold leading-tight text-[#bb1e2f] max-[500px]:text-[30px]">
        {pack.title}
      </h3>

      <p className="mt-2 text-slate-700">{pack.description}</p>

      <div className="rounded-[10px] bg-[#ffdadd] p-[15px]">
        {pack.centerPrice ? (
          <div className="text-center">
            <h2 className="text-[50px] font-bold leading-tight text-slate-950 max-[500px]:text-[40px]">
              {pack.price}
            </h2>
          </div>
        ) : (
          <div className="flex items-center justify-between gap-4">
            <div>
              <h2 className="mb-0 text-[50px] font-bold leading-tight text-slate-950 max-[500px]:text-[40px]">
                {pack.price}
              </h2>
              <p className="mb-0 text-slate-700">{pack.label}</p>
            </div>

            <div className="text-right">
              <h5 className="mb-0 line-through text-slate-700">
                {pack.oldPrice}
              </h5>
              <small className="text-slate-600">retail price</small>
            </div>
          </div>
        )}
      </div>

      <h4 className="my-4 text-xl font-bold text-[#023389]">
        Package contents:
      </h4>

      <div className="h-[300px] overflow-y-scroll pr-2">
        <ul>
          {pack.features.map((feature, index) => (
            <FeatureItem key={index} available={feature.available}>
              {feature.text}
            </FeatureItem>
          ))}
        </ul>
      </div>

      <div className="mt-4">
        <Link href="#" className={fullCtaButtonClass}>
          Sign Up
        </Link>
      </div>
    </div>
  );
};

const CodeContent = () => {
  return (
    <>
      <div className="mt-4 text-center">
        <h2 className="text-[40px] font-bold leading-tight text-slate-950 max-[500px]:text-[30px]">
          Permisgo <span className="text-[#bb1e2f]">Highway Code</span> Packs
        </h2>
        <p className="mt-2 text-slate-700">What is your need?</p>
      </div>

      <div className="mt-4">
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          {codePacks.map((pack) => (
            <CodePackCard key={pack.title} pack={pack} />
          ))}
        </div>
      </div>
    </>
  );
};

const PricingFaq = () => {
  const [activeFaq, setActiveFaq] = useState(1);

  return (
    <section className="py-[50px] max-[500px]:py-[30px]">
      <div className="mx-auto w-full max-w-[1140px] px-4">
        <div className="text-center">
          <h2 className="text-[40px] font-bold leading-tight text-slate-950 max-[500px]:text-[30px]">
            Do you have any questions?
          </h2>
          <p className="mt-2 text-slate-700">
            Find all our answers in one click
          </p>
        </div>

        <div className="py-4">
          <div className="overflow-hidden rounded-xl border border-[#d6e5ff] bg-white">
            {faqs.map((item, index) => {
              const isActive = activeFaq === item.id;

              return (
                <div
                  key={item.id}
                  className={
                    index !== faqs.length - 1 ? "border-b border-[#d6e5ff]" : ""
                  }
                >
                  <button
                    type="button"
                    onClick={() => setActiveFaq(isActive ? null : item.id)}
                    className={`flex w-full items-center justify-between gap-4 px-5 py-4 text-left font-semibold transition duration-300 ${
                      isActive
                        ? "bg-[#023389] text-white"
                        : "bg-white text-slate-950 hover:bg-[#d6e5ff]"
                    }`}
                  >
                    <span>{item.question}</span>
                    <FaChevronDown
                      className={`transition duration-300 ${
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
                      <div className="px-5 py-4 text-slate-700">
                        <strong>{item.answer.split(".")[0]}.</strong>{" "}
                        {item.answer.split(".").slice(1).join(".")}
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
  );
};

const Pricing = () => {
  const [activeMainTab, setActiveMainTab] = useState("Driving License");

  return (
    <>
      {/* First Pricing Section */}
      <section className="bg-[#d6e5ff] px-[50px] max-[500px]:px-[10px]">
        <div className="mx-auto w-full">
          <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-2">
            <div className="py-[50px] max-[500px]:py-[30px]">
              <h1 className="mb-4 text-4xl font-bold leading-tight text-slate-950 md:text-5xl">
                Our prices are up to{" "}
                <span className="text-[50px] font-bold text-[#bb1e2f] max-[500px]:text-[35px]">
                  30% cheaper
                </span>{" "}
                *
              </h1>

              <p className="text-base leading-relaxed text-slate-700">
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Delectus voluptatibus voluptates tempora illo. Fuga ullam
                aperiam ex officia aspernatur dolore, soluta ipsam minima
                tenetur amet temporibus, impedit recusandae repudiandae rem,
                quod quasi voluptates asperiores iusto! Dolorum nihil maxime
                corporis dignissimos.
              </p>

              <div className="mt-5">
                <Link href="#" className={ctaButtonClass}>
                  To Be Accompanied by an Advisor
                </Link>
              </div>
            </div>

            <div className="text-center">
              <Image
                src={firstImage}
                alt="PermisGo pricing offer"
                priority
                sizes="(max-width: 500px) 100vw, 50vw"
                className="mx-auto h-auto w-[70%] max-[500px]:w-full"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Tabs Section */}
      <section className="py-[50px] max-[500px]:py-[30px]">
        <div className="mx-auto w-full max-w-[1140px] px-4">
          <div className="flex flex-wrap justify-evenly gap-3">
            {mainTabs.map((tab) => (
              <button
                key={tab}
                type="button"
                onClick={() => setActiveMainTab(tab)}
                className={tabButtonClass(activeMainTab === tab)}
              >
                {tab}
              </button>
            ))}
          </div>

          <hr className="my-5 border-slate-200" />

          {activeMainTab === "Driving License" && <LicenseContent />}
          {activeMainTab === "Accompanied Driving" && (
            <SupervisedDrivingContent />
          )}
          {activeMainTab === "A la carte" && <CarteContent />}
          {activeMainTab === "Code" && <CodeContent />}
          {activeMainTab === "CPF Offers" && <CodeContent />}
        </div>
      </section>

      {/* Pricing Third Section */}
      <section className="px-[50px] py-[50px] max-[500px]:px-[10px]">
        <div className="mx-auto w-full">
          <div className="bg-[#d6e5ff] py-[50px]">
            <div className="px-4 text-center">
              <h2 className="text-[40px] font-bold leading-tight text-slate-950 max-[500px]:text-[30px]">
                Manage your entire online training at the best price
              </h2>

              <div className="mt-4">
                <Link href="#" className={ctaButtonClass}>
                  Discover our offers
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CPF Offer Section */}
      <section className="px-[50px] pb-[50px] max-[500px]:px-[10px]">
        <div className="mx-auto w-full">
          <div className="rounded-[10px] bg-[#eef3fb] p-[30px]">
            <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-12">
              <div className="lg:col-span-7">
                <h2 className="text-[40px] font-bold leading-tight text-[#023389] max-[500px]:text-[30px]">
                  Get your driver&apos;s license using your CPF
                </h2>

                <p className="mt-4 text-base leading-relaxed text-slate-700">
                  Permisgo is Qualiopi certified and eligible for CPF funding.
                  Finance your driving licence with your Personal Training
                  Account (CPF).
                </p>

                <div className="mt-4">
                  <Link href="#" className={ctaButtonClass}>
                    Discover our CPF offers
                  </Link>
                </div>
              </div>

              <div className="lg:col-span-5">
                <Image
                  src={offerThree}
                  alt="CPF driving licence offer"
                  sizes="(max-width: 500px) 100vw, 40vw"
                  className="h-auto w-full"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <PricingFaq />
    </>
  );
};

export default Pricing;
