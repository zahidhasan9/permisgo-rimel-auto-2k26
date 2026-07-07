// import Link from "next/link";
// import { FaArrowLeft, FaArrowRight } from "react-icons/fa6";
// import { IoChevronBack } from "react-icons/io5";
// import { LuClock3 } from "react-icons/lu";

// const signs = [
//   { id: 1, title: "Stop", desc: "Stop completely", type: "stop" },
//   { id: 2, title: "No Entry", desc: "Do not enter", type: "no-entry" },
//   { id: 3, title: "One Way", desc: "One direction only", type: "one-way" },
//   {
//     id: 4,
//     title: "No Overtaking",
//     desc: "Do not overtake",
//     type: "no-overtaking",
//   },

//   { id: 5, title: "Give Way", desc: "Yield to traffic", type: "give-way" },
//   { id: 6, title: "Speed Limit", desc: "Maximum 50 km/h", type: "speed-limit" },
//   {
//     id: 7,
//     title: "No Parking",
//     desc: "Parking prohibited",
//     type: "no-parking",
//   },
//   {
//     id: 8,
//     title: "No Stopping",
//     desc: "Stopping prohibited",
//     type: "no-stopping",
//   },

//   {
//     id: 9,
//     title: "Priority Road",
//     desc: "You have priority",
//     type: "priority-road",
//   },
//   {
//     id: 10,
//     title: "End Priority",
//     desc: "Priority road ends",
//     type: "end-priority",
//   },
//   {
//     id: 11,
//     title: "Pedestrian",
//     desc: "Pedestrian crossing",
//     type: "pedestrian",
//   },
//   { id: 12, title: "Roundabout", desc: "Roundabout ahead", type: "roundabout" },

//   {
//     id: 13,
//     title: "No Left Turn",
//     desc: "Left turn prohibited",
//     type: "no-left",
//   },
//   {
//     id: 14,
//     title: "No Right Turn",
//     desc: "Right turn prohibited",
//     type: "no-right",
//   },
//   { id: 15, title: "No U-Turn", desc: "U-turn prohibited", type: "no-u-turn" },
//   { id: 16, title: "Road Works", desc: "Work zone ahead", type: "road-works" },

//   { id: 17, title: "Children", desc: "School zone ahead", type: "children" },
//   {
//     id: 18,
//     title: "Slippery Road",
//     desc: "Road may be slippery",
//     type: "slippery",
//   },
//   {
//     id: 19,
//     title: "Traffic Lights",
//     desc: "Signals ahead",
//     type: "traffic-light",
//   },
//   { id: 20, title: "Danger", desc: "General warning", type: "danger" },

//   { id: 21, title: "Bicycle Lane", desc: "Cycle path", type: "bicycle" },
//   { id: 22, title: "Bus Lane", desc: "Bus route only", type: "bus" },
//   { id: 23, title: "Parking", desc: "Parking area", type: "parking" },
//   { id: 24, title: "Hospital", desc: "Hospital nearby", type: "hospital" },

//   { id: 25, title: "No Trucks", desc: "Trucks prohibited", type: "no-trucks" },
//   { id: 26, title: "Tunnel", desc: "Tunnel ahead", type: "tunnel" },
//   { id: 27, title: "Motorway", desc: "Motorway begins", type: "motorway" },
//   {
//     id: 28,
//     title: "End Motorway",
//     desc: "Motorway ends",
//     type: "end-motorway",
//   },

//   { id: 29, title: "Dead End", desc: "No through road", type: "dead-end" },
//   {
//     id: 30,
//     title: "Two Way Traffic",
//     desc: "Traffic both ways",
//     type: "two-way",
//   },
// ];

// const SignShell = ({ children }) => (
//   <svg viewBox="0 0 180 180" className="h-[112px] w-[112px]">
//     {children}
//   </svg>
// );

// const RedCircle = ({ children }) => (
//   <SignShell>
//     <circle cx="90" cy="90" r="68" fill="#ef1c1c" />
//     <circle cx="90" cy="90" r="55" fill="white" />
//     {children}
//   </SignShell>
// );

// const BlueSquare = ({ children }) => (
//   <SignShell>
//     <rect x="32" y="22" width="116" height="136" rx="6" fill="#42a6df" />
//     {children}
//   </SignShell>
// );

// const WarningTriangle = ({ children }) => (
//   <SignShell>
//     <polygon points="90,18 162,150 18,150" fill="#ef1c1c" />
//     <polygon points="90,38 143,138 37,138" fill="white" />
//     {children}
//   </SignShell>
// );

// const StopSign = () => (
//   <SignShell>
//     <polygon
//       points="63,18 117,18 162,63 162,117 117,162 63,162 18,117 18,63"
//       fill="#ef3434"
//     />
//     <polygon
//       points="67,29 113,29 151,67 151,113 113,151 67,151 29,113 29,67"
//       fill="none"
//       stroke="white"
//       strokeWidth="4"
//     />
//     <text
//       x="90"
//       y="104"
//       textAnchor="middle"
//       fontSize="38"
//       fontWeight="500"
//       letterSpacing="5"
//       fill="white"
//     >
//       STOP
//     </text>
//   </SignShell>
// );

// const NoEntrySign = () => (
//   <SignShell>
//     <circle cx="90" cy="90" r="66" fill="#ef3434" />
//     <rect x="43" y="76" width="94" height="28" rx="3" fill="white" />
//   </SignShell>
// );

// const OneWaySign = () => (
//   <BlueSquare>
//     <path
//       d="M90 45 L116 74 C120 78 120 84 116 88 C112 92 106 92 102 88 L100 86 L100 128 C100 134 96 139 90 139 C84 139 80 134 80 128 L80 86 L78 88 C74 92 68 92 64 88 C60 84 60 78 64 74 L90 45 Z"
//       fill="white"
//     />
//   </BlueSquare>
// );

// const NoOvertakingSign = () => (
//   <RedCircle>
//     <rect x="51" y="83" width="28" height="32" rx="5" fill="#222" />
//     <rect x="101" y="83" width="28" height="32" rx="5" fill="#f00" />
//     <circle cx="58" cy="118" r="5" fill="#222" />
//     <circle cx="72" cy="118" r="5" fill="#222" />
//     <circle cx="108" cy="118" r="5" fill="#f00" />
//     <circle cx="122" cy="118" r="5" fill="#f00" />
//   </RedCircle>
// );

// const GiveWaySign = () => (
//   <SignShell>
//     <polygon points="90,154 24,38 156,38" fill="#ef1c1c" />
//     <polygon points="90,132 44,52 136,52" fill="white" />
//   </SignShell>
// );

// const SpeedLimitSign = () => (
//   <RedCircle>
//     <text
//       x="90"
//       y="106"
//       textAnchor="middle"
//       fontSize="50"
//       fontWeight="800"
//       fill="#111"
//     >
//       50
//     </text>
//   </RedCircle>
// );

// const NoParkingSign = () => (
//   <SignShell>
//     <circle cx="90" cy="90" r="66" fill="#ef1c1c" />
//     <circle cx="90" cy="90" r="55" fill="#1f6fcb" />
//     <line x1="48" y1="132" x2="132" y2="48" stroke="#ef1c1c" strokeWidth="12" />
//     <text
//       x="90"
//       y="108"
//       textAnchor="middle"
//       fontSize="62"
//       fontWeight="800"
//       fill="white"
//     >
//       P
//     </text>
//   </SignShell>
// );

// const NoStoppingSign = () => (
//   <SignShell>
//     <circle cx="90" cy="90" r="66" fill="#ef1c1c" />
//     <circle cx="90" cy="90" r="55" fill="#1f6fcb" />
//     <line x1="48" y1="132" x2="132" y2="48" stroke="#ef1c1c" strokeWidth="12" />
//     <line x1="48" y1="48" x2="132" y2="132" stroke="#ef1c1c" strokeWidth="12" />
//   </SignShell>
// );

// const PriorityRoadSign = ({ end = false }) => (
//   <SignShell>
//     <rect
//       x="45"
//       y="45"
//       width="90"
//       height="90"
//       transform="rotate(45 90 90)"
//       fill="white"
//       stroke="#222"
//       strokeWidth="3"
//     />
//     <rect
//       x="59"
//       y="59"
//       width="62"
//       height="62"
//       transform="rotate(45 90 90)"
//       fill="#ffd83d"
//     />
//     {end && (
//       <line x1="43" y1="137" x2="137" y2="43" stroke="#222" strokeWidth="9" />
//     )}
//   </SignShell>
// );

// const PedestrianSign = () => (
//   <BlueSquare>
//     <polygon points="90,42 40,138 140,138" fill="white" />
//     <circle cx="90" cy="73" r="9" fill="#111" />
//     <path
//       d="M90 84 L80 110 L67 128 M90 84 L104 108 L118 128 M82 96 L66 98 M98 96 L114 98"
//       stroke="#111"
//       strokeWidth="7"
//       strokeLinecap="round"
//       fill="none"
//     />
//   </BlueSquare>
// );

// const RoundaboutSign = () => (
//   <BlueSquare>
//     <path
//       d="M90 45 C116 45 137 66 137 92 C137 112 124 130 105 136"
//       stroke="white"
//       strokeWidth="10"
//       strokeLinecap="round"
//       fill="none"
//     />
//     <path
//       d="M90 135 C64 135 43 114 43 88 C43 68 56 50 75 44"
//       stroke="white"
//       strokeWidth="10"
//       strokeLinecap="round"
//       fill="none"
//     />
//     <path d="M102 122 L107 143 L87 136 Z" fill="white" />
//     <path d="M78 58 L73 37 L93 44 Z" fill="white" />
//   </BlueSquare>
// );

// const NoTurn = ({ direction }) => (
//   <RedCircle>
//     <path
//       d={
//         direction === "left"
//           ? "M105 58 H78 C63 58 54 70 54 84 V116"
//           : "M75 58 H102 C117 58 126 70 126 84 V116"
//       }
//       stroke="#111"
//       strokeWidth="12"
//       strokeLinecap="round"
//       fill="none"
//     />
//     <path
//       d={
//         direction === "left"
//           ? "M80 40 L52 58 L80 76"
//           : "M100 40 L128 58 L100 76"
//       }
//       fill="none"
//       stroke="#111"
//       strokeWidth="12"
//       strokeLinecap="round"
//       strokeLinejoin="round"
//     />
//     <line x1="47" y1="133" x2="133" y2="47" stroke="#ef1c1c" strokeWidth="10" />
//   </RedCircle>
// );

// const NoUTurnSign = () => (
//   <RedCircle>
//     <path
//       d="M62 120 V75 C62 48 118 48 118 75 V120"
//       stroke="#111"
//       strokeWidth="12"
//       strokeLinecap="round"
//       fill="none"
//     />
//     <path
//       d="M46 92 L62 120 L78 92"
//       fill="none"
//       stroke="#111"
//       strokeWidth="12"
//       strokeLinecap="round"
//       strokeLinejoin="round"
//     />
//     <line x1="47" y1="133" x2="133" y2="47" stroke="#ef1c1c" strokeWidth="10" />
//   </RedCircle>
// );

// const RoadWorksSign = () => (
//   <WarningTriangle>
//     <circle cx="90" cy="70" r="7" fill="#111" />
//     <path d="M80 83 L100 83 L110 126 H70 Z" fill="#111" />
//     <path
//       d="M55 128 H125"
//       stroke="#111"
//       strokeWidth="7"
//       strokeLinecap="round"
//     />
//   </WarningTriangle>
// );

// const ChildrenSign = () => (
//   <WarningTriangle>
//     <circle cx="76" cy="78" r="7" fill="#111" />
//     <circle cx="101" cy="82" r="6" fill="#111" />
//     <path
//       d="M76 88 L66 121 M76 88 L88 121 M101 91 L91 121 M101 91 L113 121"
//       stroke="#111"
//       strokeWidth="6"
//       strokeLinecap="round"
//     />
//   </WarningTriangle>
// );

// const SlipperySign = () => (
//   <WarningTriangle>
//     <path
//       d="M54 78 C78 62 88 96 112 78"
//       stroke="#111"
//       strokeWidth="8"
//       fill="none"
//       strokeLinecap="round"
//     />
//     <path
//       d="M56 108 C78 92 92 124 116 106"
//       stroke="#111"
//       strokeWidth="8"
//       fill="none"
//       strokeLinecap="round"
//     />
//   </WarningTriangle>
// );

// const TrafficLightSign = () => (
//   <WarningTriangle>
//     <rect x="73" y="58" width="34" height="72" rx="8" fill="#111" />
//     <circle cx="90" cy="75" r="8" fill="#ef1c1c" />
//     <circle cx="90" cy="94" r="8" fill="#ffd83d" />
//     <circle cx="90" cy="113" r="8" fill="#20ba2b" />
//   </WarningTriangle>
// );

// const DangerSign = () => (
//   <WarningTriangle>
//     <text
//       x="90"
//       y="122"
//       textAnchor="middle"
//       fontSize="80"
//       fontWeight="900"
//       fill="#111"
//     >
//       !
//     </text>
//   </WarningTriangle>
// );

// const BicycleSign = () => (
//   <BlueSquare>
//     <circle
//       cx="62"
//       cy="112"
//       r="20"
//       fill="none"
//       stroke="white"
//       strokeWidth="7"
//     />
//     <circle
//       cx="116"
//       cy="112"
//       r="20"
//       fill="none"
//       stroke="white"
//       strokeWidth="7"
//     />
//     <path
//       d="M62 112 L82 84 H103 L116 112 M82 84 L94 112 H62"
//       stroke="white"
//       strokeWidth="7"
//       fill="none"
//       strokeLinecap="round"
//     />
//     <circle cx="94" cy="70" r="7" fill="white" />
//   </BlueSquare>
// );

// const BusSign = () => (
//   <BlueSquare>
//     <rect x="54" y="54" width="72" height="78" rx="8" fill="white" />
//     <rect x="62" y="64" width="56" height="28" rx="3" fill="#42a6df" />
//     <circle cx="70" cy="124" r="6" fill="#42a6df" />
//     <circle cx="110" cy="124" r="6" fill="#42a6df" />
//   </BlueSquare>
// );

// const ParkingSign = () => (
//   <BlueSquare>
//     <text
//       x="90"
//       y="124"
//       textAnchor="middle"
//       fontSize="88"
//       fontWeight="900"
//       fill="white"
//     >
//       P
//     </text>
//   </BlueSquare>
// );

// const HospitalSign = () => (
//   <BlueSquare>
//     <text
//       x="90"
//       y="122"
//       textAnchor="middle"
//       fontSize="80"
//       fontWeight="900"
//       fill="white"
//     >
//       H
//     </text>
//   </BlueSquare>
// );

// const NoTrucksSign = () => (
//   <RedCircle>
//     <rect x="50" y="82" width="48" height="25" rx="3" fill="#111" />
//     <rect x="98" y="90" width="28" height="17" rx="2" fill="#111" />
//     <circle cx="61" cy="112" r="6" fill="#111" />
//     <circle cx="111" cy="112" r="6" fill="#111" />
//     <line x1="47" y1="133" x2="133" y2="47" stroke="#ef1c1c" strokeWidth="10" />
//   </RedCircle>
// );

// const TextBlueSign = ({ text }) => (
//   <BlueSquare>
//     <text
//       x="90"
//       y="105"
//       textAnchor="middle"
//       fontSize="28"
//       fontWeight="900"
//       fill="white"
//     >
//       {text}
//     </text>
//   </BlueSquare>
// );

// const DeadEndSign = () => (
//   <BlueSquare>
//     <path
//       d="M90 130 V58"
//       stroke="white"
//       strokeWidth="14"
//       strokeLinecap="round"
//     />
//     <path
//       d="M60 58 H120"
//       stroke="#ef1c1c"
//       strokeWidth="18"
//       strokeLinecap="round"
//     />
//   </BlueSquare>
// );

// const TwoWaySign = () => (
//   <WarningTriangle>
//     <path d="M72 127 V63" stroke="#111" strokeWidth="9" strokeLinecap="round" />
//     <path d="M72 57 L55 77 H89 Z" fill="#111" />
//     <path
//       d="M108 53 V117"
//       stroke="#111"
//       strokeWidth="9"
//       strokeLinecap="round"
//     />
//     <path d="M108 123 L91 103 H125 Z" fill="#111" />
//   </WarningTriangle>
// );

// const SignIcon = ({ type }) => {
//   const icons = {
//     stop: <StopSign />,
//     "no-entry": <NoEntrySign />,
//     "one-way": <OneWaySign />,
//     "no-overtaking": <NoOvertakingSign />,
//     "give-way": <GiveWaySign />,
//     "speed-limit": <SpeedLimitSign />,
//     "no-parking": <NoParkingSign />,
//     "no-stopping": <NoStoppingSign />,
//     "priority-road": <PriorityRoadSign />,
//     "end-priority": <PriorityRoadSign end />,
//     pedestrian: <PedestrianSign />,
//     roundabout: <RoundaboutSign />,
//     "no-left": <NoTurn direction="left" />,
//     "no-right": <NoTurn direction="right" />,
//     "no-u-turn": <NoUTurnSign />,
//     "road-works": <RoadWorksSign />,
//     children: <ChildrenSign />,
//     slippery: <SlipperySign />,
//     "traffic-light": <TrafficLightSign />,
//     danger: <DangerSign />,
//     bicycle: <BicycleSign />,
//     bus: <BusSign />,
//     parking: <ParkingSign />,
//     hospital: <HospitalSign />,
//     "no-trucks": <NoTrucksSign />,
//     tunnel: <TextBlueSign text="TUNNEL" />,
//     motorway: <TextBlueSign text="AUTO" />,
//     "end-motorway": <TextBlueSign text="END" />,
//     "dead-end": <DeadEndSign />,
//     "two-way": <TwoWaySign />,
//   };

//   return icons[type] || <DangerSign />;
// };

// const RoadSignPage = () => {
//   return (
//     <main className="min-h-screen bg-white px-5 py-5 font-sans text-[#151515]">
//       <div className="mx-auto w-full max-w-[1085px]">
//         <header className="flex items-center justify-between">
//           <div className="flex items-center gap-4">
//             <Link
//               href="#"
//               className="flex h-10 w-10 items-center justify-center rounded-[11px] bg-[#e7ebf2] text-[22px] text-black"
//             >
//               <IoChevronBack />
//             </Link>

//             <h1 className="text-[24px] font-bold text-[#143f8d]">Road Sign</h1>
//           </div>

//           <div className="flex items-center gap-3">
//             <button className="flex h-9 w-9 items-center justify-center rounded-[11px] bg-[#e4eaf3] text-[15px] text-[#df2339]">
//               <FaArrowLeft />
//             </button>

//             <button className="flex h-9 w-9 items-center justify-center rounded-[11px] bg-[#df2339] text-[15px] text-white">
//               <FaArrowRight />
//             </button>
//           </div>
//         </header>

//         <section className="mt-8 rounded-[10px] bg-[#e8eef7] p-5">
//           <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
//             {signs.map((sign) => (
//               <div
//                 key={sign.id}
//                 className="flex h-[220px] flex-col items-center justify-center rounded-[10px] bg-white px-4 text-center"
//               >
//                 <div className="flex h-[118px] items-center justify-center">
//                   <SignIcon type={sign.type} />
//                 </div>

//                 <h2 className="mt-2 text-[19px] font-extrabold text-[#143f8d]">
//                   {sign.title}
//                 </h2>

//                 <p className="mt-1.5 text-[14px] text-[#202020]">{sign.desc}</p>
//               </div>
//             ))}
//           </div>
//         </section>

//         <section className="mt-8 rounded-[10px] bg-[#e8eef7] px-6 py-6">
//           <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
//             <div>
//               <h2 className="text-[20px] font-extrabold text-[#111111]">
//                 Road Signs Guide
//               </h2>

//               <div className="mt-3 flex items-center gap-2 text-[14px] text-[#606060]">
//                 <span className="flex h-[17px] w-[17px] items-center justify-center rounded-full bg-[#143f8d] text-[11px] text-white">
//                   <LuClock3 />
//                 </span>
//                 <span>3 minutes read</span>
//               </div>
//             </div>

//             <button className="h-10 w-[125px] rounded-[8px] bg-[#df2339] text-[12px] font-bold text-white transition hover:bg-[#c91f33]">
//               Download
//             </button>
//           </div>
//         </section>
//       </div>
//     </main>
//   );
// };

// export default RoadSignPage;

// apply backend

import LearningContentPage from "../_components/LearningContentPage";

export default function RoadSignsPage() {
  return (
    <LearningContentPage
      type="road-sign"
      title="Road Signs"
      subtitle="Learn road signs, meanings, categories and then take related tests."
      heroIcon="🚧"
      emptyText="No road signs added yet. Admin panel theke Road Signs add koren."
    />
  );
}
