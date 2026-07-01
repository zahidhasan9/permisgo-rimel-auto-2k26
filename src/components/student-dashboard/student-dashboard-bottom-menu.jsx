// import Link from "next/link";

// // Styles
// // import studentDashboardBottomMenuCss from "../../../styles/student-dashboard-bottom-menu.module.css";

// // Icon
// import { BsFillQuestionOctagonFill } from "react-icons/bs";
// import { FaBell } from "react-icons/fa";
// import { FaCartShopping } from "react-icons/fa6";
// import { MdOutlineMessage } from "react-icons/md";

// const studentDashboardBottomMenu = () => {
//   return (
//     <>
//       <div className={studentDashboardBottomMenuCss.bottomMenuBox}>
//         <div className="d-flex justify-content-between align-items-center">
//           <div>
//             <Link href="">
//               <FaBell />
//             </Link>
//           </div>
//           <div>
//             <Link href="">
//               <MdOutlineMessage />
//             </Link>
//           </div>
//           <div>
//             <Link href="">
//               <FaCartShopping />
//             </Link>
//           </div>
//           <div>
//             <Link href="">
//               <BsFillQuestionOctagonFill />
//             </Link>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default studentDashboardBottomMenu;

import Link from "next/link";

// Icons
import { BsFillQuestionOctagonFill } from "react-icons/bs";
import { FaBell } from "react-icons/fa";
import { FaCartShopping } from "react-icons/fa6";
import { MdOutlineMessage } from "react-icons/md";

const StudentDashboardBottomMenu = () => {
  return (
    <div className="fixed bottom-0 left-0 w-full bg-white border-t shadow-lg z-50">
      <div className="flex justify-between items-center px-8 py-4">
        <Link href="/" className="text-gray-600 hover:text-blue-600 text-2xl">
          <FaBell />
        </Link>

        <Link href="/" className="text-gray-600 hover:text-blue-600 text-2xl">
          <MdOutlineMessage />
        </Link>

        <Link href="/" className="text-gray-600 hover:text-blue-600 text-2xl">
          <FaCartShopping />
        </Link>

        <Link href="/" className="text-gray-600 hover:text-blue-600 text-2xl">
          <BsFillQuestionOctagonFill />
        </Link>
      </div>
    </div>
  );
};

export default StudentDashboardBottomMenu;
