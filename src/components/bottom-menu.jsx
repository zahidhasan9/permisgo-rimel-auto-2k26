import Link from "next/link";

// Icons
import { FaCar } from "react-icons/fa";
import { MdLocalOffer, MdOutlineDirections } from "react-icons/md";
import { RiProfileLine } from "react-icons/ri";

const menuItems = [
  {
    title: "Code",
    href: "#",
    icon: MdOutlineDirections,
  },
  {
    title: "Conduite",
    href: "#",
    icon: FaCar,
  },
  {
    title: "Offer",
    href: "#",
    icon: MdLocalOffer,
  },
  {
    title: "Profile",
    href: "#",
    icon: RiProfileLine,
  },
];

const BottomMenu = () => {
  return (
    <nav className="fixed bottom-0 left-0 right-0 z-[999] hidden rounded-t-xl bg-white px-5 py-2 shadow-[0_-4px_20px_rgba(0,0,0,0.08)] max-[500px]:block">
      <div className="flex items-center justify-between">
        {menuItems.map((item) => {
          const Icon = item.icon;

          return (
            <Link
              key={item.title}
              href={item.href}
              className="flex flex-1 flex-col items-center justify-center gap-1 text-black no-underline transition-all duration-200 hover:text-blue-600"
            >
              <Icon className="text-[22px]" />

              <p className="mb-0 text-[14px] leading-none">{item.title}</p>
            </Link>
          );
        })}
      </div>
    </nav>
  );
};

export default BottomMenu;
