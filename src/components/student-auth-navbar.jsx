import Image from "next/image";
import Link from "next/link";

// Icons
import { BsFillQuestionOctagonFill } from "react-icons/bs";
import { FaBell } from "react-icons/fa";
import { MdOutlineMessage } from "react-icons/md";

// Image
import Logo from "../../public/image/logo.png";

const DashboardNavbar = () => {
  const navIcons = [
    {
      icon: <FaBell />,
      href: "#",
      label: "Notification",
    },
    {
      icon: <MdOutlineMessage />,
      href: "#",
      label: "Message",
    },
    {
      icon: <BsFillQuestionOctagonFill />,
      href: "#",
      label: "Help",
    },
  ];

  return (
    <nav className="relative z-50 w-full">
      <div className="bg-[#103677] shadow-[0_6px_18px_rgba(16,54,119,0.16)]">
        <div className="mx-auto flex h-[58px] max-w-[1320px] items-center justify-between px-3 sm:h-[60px] sm:px-5 lg:h-[64px] lg:px-8">
          {/* Logo */}
          <Link href="/" className="flex shrink-0 items-center">
            <Image
              src={Logo}
              alt="Logo"
              priority
              sizes="(max-width: 640px) 128px, (max-width: 1024px) 145px, 155px"
              className="h-auto w-[128px] object-contain sm:w-[145px] lg:w-[155px]"
            />
          </Link>

          {/* Right Icons */}
          <ul className="flex shrink-0 items-center gap-1.5 sm:gap-2.5">
            {navIcons.map((item, index) => (
              <li key={index}>
                <Link
                  href={item.href}
                  aria-label={item.label}
                  className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/20 bg-white/10 text-[18px] text-white transition-all duration-300 hover:bg-white hover:text-[#103677] sm:h-10 sm:w-10 sm:text-[19px]"
                >
                  {item.icon}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default DashboardNavbar;
