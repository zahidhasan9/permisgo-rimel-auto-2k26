"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import Select from "react-select";

// Icons
import {
  FaInstagram,
  FaLinkedin,
  FaPhoneSquareAlt,
  FaPinterestSquare,
  FaYoutube,
} from "react-icons/fa";
import { FaFacebook } from "react-icons/fa6";
import { IoClose, IoMenu } from "react-icons/io5";
import { MdOutlineEmail } from "react-icons/md";

// Image
import Logo from "../../public/image/logo.png";

const Navbar = () => {
  const [openMenu, setOpenMenu] = useState(false);
  const pathname = usePathname();

  const options = [
    { value: "EN", label: "English", img: "/image/eng-flag.png" },
    { value: "BN", label: "Bangla", img: "/image/ban-flag.png" },
    { value: "FR", label: "Français", img: "/image/fra-flag.png" },
  ];

  const navLinks = [
    { name: "Offers", href: "/pricing" },
    { name: "Traffic Laws", href: "/traffic-laws" },
    { name: "Driving License", href: "/driving-license" },
    { name: "Contact Us", href: "/contact-us" },
    { name: "Appointment", href: "/appointment" },
    { name: "Help", href: "/helps" },
  ];

  const socialLinks = [
    { icon: <FaFacebook />, href: "" },
    { icon: <FaInstagram />, href: "" },
    { icon: <FaLinkedin />, href: "" },
    { icon: <FaPinterestSquare />, href: "" },
    { icon: <FaYoutube />, href: "" },
  ];

  const selectStyles = {
    control: (base) => ({
      ...base,
      minHeight: "32px",
      height: "32px",
      border: "1px solid rgba(16, 54, 119, 0.12)",
      boxShadow: "none",
      borderRadius: "999px",
      cursor: "pointer",
      fontSize: "13px",
      backgroundColor: "#ffffff",
      transition: "0.25s ease",
      ":hover": {
        borderColor: "rgba(16, 54, 119, 0.25)",
      },
    }),
    valueContainer: (base) => ({
      ...base,
      padding: "0 7px",
      height: "32px",
    }),
    singleValue: (base) => ({
      ...base,
      color: "#103677",
      fontWeight: 600,
    }),
    indicatorsContainer: (base) => ({
      ...base,
      height: "32px",
      paddingRight: "4px",
    }),
    dropdownIndicator: (base) => ({
      ...base,
      padding: "2px",
      color: "#103677",
    }),
    indicatorSeparator: () => ({
      display: "none",
    }),
    menu: (base) => ({
      ...base,
      zIndex: 9999,
      borderRadius: "12px",
      overflow: "hidden",
      boxShadow: "0 18px 40px rgba(15, 23, 42, 0.16)",
      border: "1px solid rgba(15, 23, 42, 0.08)",
    }),
    option: (base, state) => ({
      ...base,
      cursor: "pointer",
      backgroundColor: state.isSelected
        ? "#103677"
        : state.isFocused
          ? "#eef4ff"
          : "#ffffff",
      color: state.isSelected ? "#ffffff" : "#111827",
      fontSize: "13px",
      fontWeight: state.isSelected ? 600 : 500,
    }),
  };

  const desktopLinkClass = (href) =>
    `relative rounded-full px-3 py-2 text-[15px] font-medium transition-all duration-300 ${
      pathname === href
        ? "bg-white/15 text-white"
        : "text-white/90 hover:bg-white/10 hover:text-white"
    }`;

  const mobileLinkClass = (href) =>
    `block rounded-xl px-4 py-3 text-[16px] font-semibold transition-all duration-300 ${
      pathname === href
        ? "bg-[#103677] text-white"
        : "text-[#103677] hover:bg-[#eef4ff] hover:text-[#2563eb]"
    }`;

  return (
    <>
      <nav className="relative z-50 w-full bg-white">
        {/* Top Bar */}
        <div className="border-b border-slate-200 bg-slate-50">
          <div className="mx-auto flex h-[38px] max-w-[1320px] items-center justify-between px-4 sm:px-6 lg:px-8">
            <ul className="flex min-w-0 items-center gap-4">
              <li>
                <a
                  href="tel:+6145845887"
                  className="flex items-center gap-1.5 whitespace-nowrap text-[13px] font-medium text-[#103677] transition hover:text-[#2563eb] sm:text-[14px]"
                >
                  <FaPhoneSquareAlt className="text-[15px]" />
                  <span>+61 4584 5887</span>
                </a>
              </li>

              <li className="hidden md:block">
                <a
                  href="mailto:info@permisgoautoecole.com"
                  className="flex items-center gap-1.5 text-[14px] font-medium text-[#103677] transition hover:text-[#2563eb]"
                >
                  <MdOutlineEmail className="text-[17px]" />
                  <span>info@permisgoautoecole.com</span>
                </a>
              </li>
            </ul>

            <div className="flex items-center gap-3">
              <div className="w-[88px]">
                <Select
                  options={options}
                  defaultValue={options[0]}
                  placeholder={null}
                  isSearchable={false}
                  styles={selectStyles}
                  formatOptionLabel={(opt) => (
                    <div className="flex items-center">
                      <Image
                        src={opt.img}
                        alt={opt.label}
                        width={18}
                        height={18}
                        className="mr-1.5 rounded-full"
                      />
                      <span>{opt.value}</span>
                    </div>
                  )}
                />
              </div>

              <ul className="hidden items-center gap-2 sm:flex">
                {socialLinks.map((item, index) => (
                  <li key={index}>
                    <Link
                      href={item.href}
                      className="flex h-8 w-8 items-center justify-center rounded-full text-[16px] text-[#103677] transition-all duration-300 hover:bg-[#103677] hover:text-white"
                    >
                      {item.icon}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Main Navbar */}
        <div className="bg-[#103677] shadow-[0_10px_30px_rgba(16,54,119,0.18)]">
          <div className="mx-auto flex h-[72px] max-w-[1320px] items-center justify-between px-4 sm:px-6 lg:px-8">
            <Link href="/" className="flex shrink-0 items-center">
              <Image
                src={Logo}
                alt="Permisgo Logo"
                priority
                className="h-auto w-[145px] sm:w-[155px] lg:w-[165px]"
              />
            </Link>

            <div className="hidden lg:flex lg:flex-1 lg:justify-center">
              <ul className="flex items-center gap-1 xl:gap-2">
                {navLinks.map((link, index) => (
                  <li key={index}>
                    <Link
                      href={link.href}
                      className={desktopLinkClass(link.href)}
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div className="hidden shrink-0 items-center gap-3 md:flex">
              <Link
                href="/login"
                className="rounded-full bg-white px-5 py-2.5 text-[14px] font-semibold text-[#103677] shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#2563eb] hover:text-blue"
              >
                Login
              </Link>

              <Link
                href="/inscription"
                className="hidden rounded-full bg-[#2563eb] px-5 py-2.5 text-[14px] font-semibold text-white shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:bg-white  hover:!text-blue-600 xl:inline-flex"
              >
                Inscription
              </Link>
            </div>

            <button
              type="button"
              onClick={() => setOpenMenu(true)}
              className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/20 bg-white/10 text-[26px] text-white transition hover:bg-white/20 lg:hidden"
              aria-label="Open menu"
            >
              <IoMenu />
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Overlay */}
      {openMenu && (
        <div
          className="fixed inset-0 z-[998] bg-slate-950/55 backdrop-blur-[2px] lg:hidden"
          onClick={() => setOpenMenu(false)}
        />
      )}

      {/* Mobile Drawer */}
      <aside
        className={`fixed right-0 top-0 z-[999] h-full w-[320px] max-w-[86%] bg-white shadow-2xl transition-transform duration-300 lg:hidden ${
          openMenu ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex h-[76px] items-center justify-between border-b border-slate-200 px-5">
          <Link href="/" onClick={() => setOpenMenu(false)}>
            <Image
              src={Logo}
              alt="Permisgo Logo"
              priority
              className="h-auto w-[145px]"
            />
          </Link>

          <button
            type="button"
            onClick={() => setOpenMenu(false)}
            className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-100 text-[26px] text-slate-800 transition hover:bg-slate-200"
            aria-label="Close menu"
          >
            <IoClose />
          </button>
        </div>

        <div className="flex h-[calc(100%-76px)] flex-col justify-between overflow-y-auto px-5 py-5">
          <div>
            <ul className="space-y-1">
              {navLinks.map((link, index) => (
                <li key={index}>
                  <Link
                    href={link.href}
                    onClick={() => setOpenMenu(false)}
                    className={mobileLinkClass(link.href)}
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>

            <div className="mt-6 grid grid-cols-1 gap-3">
              <Link
                href="/user-login"
                onClick={() => setOpenMenu(false)}
                className="rounded-xl border border-[#103677] px-5 py-3 text-center text-[16px] font-semibold text-[#103677] transition hover:bg-[#103677] hover:text-white"
              >
                Login
              </Link>

              <Link
                href="/admin-register"
                onClick={() => setOpenMenu(false)}
                className="rounded-xl bg-[#2563eb] px-5 py-3 text-center text-[16px] font-semibold text-white transition hover:bg-[#103677]"
              >
                Inscription
              </Link>
            </div>
          </div>

          <div className="mt-8 border-t border-slate-200 pt-5">
            <p className="mb-3 text-[13px] font-semibold uppercase tracking-wide text-slate-500">
              Follow Us
            </p>

            <ul className="flex items-center gap-3">
              {socialLinks.map((item, index) => (
                <li key={index}>
                  <Link
                    href={item.href}
                    className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-100 text-[18px] text-[#103677] transition hover:bg-[#103677] hover:text-white"
                  >
                    {item.icon}
                  </Link>
                </li>
              ))}
            </ul>

            <div className="mt-5 space-y-2 text-[14px] text-slate-600">
              <a
                href="tel:+6145845887"
                className="flex items-center gap-2 transition hover:text-[#103677]"
              >
                <FaPhoneSquareAlt />
                +61 4584 5887
              </a>

              <a
                href="mailto:info@permisgoautoecole.com"
                className="flex items-center gap-2 break-all transition hover:text-[#103677]"
              >
                <MdOutlineEmail />
                info@permisgoautoecole.com
              </a>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
};

export default Navbar;
