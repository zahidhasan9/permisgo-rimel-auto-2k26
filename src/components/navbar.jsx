"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Select from "react-select";

// Icons
import {
  FaInstagram,
  FaLinkedin,
  FaPhoneSquareAlt,
  FaPinterestSquare,
  FaYoutube,
} from "react-icons/fa";
import { FaFacebook, FaTiktok } from "react-icons/fa6";
import { IoClose, IoMenu } from "react-icons/io5";
import { MdOutlineEmail } from "react-icons/md";

// Image
import Logo from "../../public/image/logo.png";
import useSiteSettings from "@/hooks/useSiteSettings";

const Navbar = () => {
  const [openMenu, setOpenMenu] = useState(false);
  const [language, setLanguage] = useState("");
  const pathname = usePathname();
  const router = useRouter();
  const site = useSiteSettings();

  useEffect(() => setLanguage((localStorage.getItem("permisgo-language") || "en").toUpperCase()), []);
  const changeLanguage = (option) => {
    const next = option?.value || "EN";
    setLanguage(next);
    localStorage.setItem("permisgo-language", next.toLowerCase());
    document.cookie = `permisgo-language=${next.toLowerCase()}; path=/; max-age=31536000; samesite=lax`;
    document.documentElement.lang = next.toLowerCase();
    window.dispatchEvent(new CustomEvent("permisgo-language-change", { detail: next.toLowerCase() }));
    router.refresh();
  };

  const options = [
    {
      value: "EN",
      label: "EN",
      img: "/image/eng-flag.png",
    },
    {
      value: "BN",
      label: "BN",
      img: "/image/ban-flag.png",
    },
    {
      value: "FR",
      label: "FR",
      img: "/image/fra-flag.png",
    },
  ];

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Offers", href: "/pricing" },
    { name: "Traffic Laws", href: "/traffic-laws" },
    { name: "Driving License", href: "/driving-license" },
    { name: "Contact", href: "/contact-us" },
    { name: "Appointment", href: "/appointment" },
    { name: "Help", href: "/helps" },
  ];

  const socialLinks = [
    { icon: <FaFacebook />, href: site.facebookUrl, label: "Facebook" },
    { icon: <FaInstagram />, href: site.instagramUrl, label: "Instagram" },
    { icon: <FaTiktok />, href: site.tiktokUrl, label: "TikTok" },
    { icon: <FaYoutube />, href: site.youtubeUrl, label: "YouTube" },
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
    `relative whitespace-nowrap rounded-full px-2.5 py-2 text-[13px] font-medium transition-all duration-300 2xl:px-3 2xl:text-[15px] ${
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
      <nav className="fixed inset-x-0 top-0 z-[997] w-full bg-white shadow-sm">
        {/* TOP BAR */}
        <div className="border-b border-slate-200 bg-slate-50">
          <div className="mx-auto flex h-[38px] max-w-[1320px] items-center justify-between px-4 sm:px-6 lg:px-8">
            <ul className="flex min-w-0 items-center gap-4">
              <li>
                <a
                  href={`tel:${site.phone.replace(/\s/g, "")}`}
                  className="flex items-center gap-1.5 whitespace-nowrap text-[13px] font-medium text-[#103677] transition hover:text-[#2563eb] sm:text-[14px]"
                >
                  <FaPhoneSquareAlt className="text-[15px]" />

                  <span>{site.phone}</span>
                </a>
              </li>

              <li className="hidden md:block">
                <a
                  href={`mailto:${site.supportEmail}`}
                  className="flex items-center gap-1.5 text-[14px] font-medium text-[#103677] transition hover:text-[#2563eb]"
                >
                  <MdOutlineEmail className="text-[17px]" />

                  <span>{site.supportEmail}</span>
                </a>
              </li>
            </ul>

            <div className="flex items-center gap-2 sm:gap-3">
              <div data-no-translate className="w-[82px] sm:w-[88px]">
                {language ? <Select
                  options={options}
                  value={options.find((option) => option.value === language) || options[0]}
                  onChange={changeLanguage}
                  placeholder={null}
                  isSearchable={false}
                  styles={selectStyles}
                  formatOptionLabel={(opt) => (
                    <div className="flex items-center">
                      <Image
                        key={`${opt.value}-${opt.img}`}
                        src={opt.img}
                        alt={opt.label}
                        width={18}
                        height={18}
                        className="mr-1.5 rounded-full"
                      />

                      <span>{opt.value}</span>
                    </div>
                  )}
                /> : <div className="h-8 w-full animate-pulse rounded-full bg-slate-200" aria-label="Loading saved language" />}
              </div>

              <ul className="hidden items-center gap-1 sm:flex lg:gap-2">
                {socialLinks.map((item, index) => (
                  <li key={index}>
                    <Link
                      href={item.href}
                      target="_blank"
                      rel="noreferrer"
                      aria-label={item.label}
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

        {/* MAIN NAVBAR */}
        <div className="bg-[#174a9b] shadow-[0_10px_30px_rgba(16,54,119,0.18)]">
          <div className="mx-auto flex h-[72px] max-w-[1320px] items-center justify-between px-4 sm:px-6 lg:px-8">
            {/* LOGO */}
            <Link
              href="/"
              className="flex h-full shrink-0 items-center pr-2 sm:pr-4 xl:px-2 2xl:px-4"
            >
              <Image
                src={Logo}
                alt="Permisgo Logo"
                priority
                className="h-auto w-[130px] sm:w-[145px] lg:w-[155px] xl:w-[145px] 2xl:w-[165px]"
              />
            </Link>

            {/* DESKTOP NAVIGATION - SHOW FROM 1280PX */}
            <div className="hidden min-w-0 flex-1 justify-center xl:flex">
              <ul className="flex items-center gap-0 2xl:gap-2">
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

            {/* RIGHT SIDE BUTTONS AND MENU */}
            <div className="ml-auto flex shrink-0 items-center gap-2 lg:gap-3">
              {/* LOGIN AND INSCRIPTION */}
              <div className="hidden items-center gap-2 md:flex lg:gap-3">
                <Link
                  href="/user-login"
                  className="inline-flex h-[40px] items-center justify-center whitespace-nowrap rounded-[10px] bg-[#e2233d] px-4 text-[13px] font-semibold text-white shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:bg-white hover:text-[#174a9b] lg:px-5 xl:px-4 2xl:px-7 2xl:text-[14px]"
                >
                  Login
                </Link>

                <Link
                  href="/inscription"
                  className="inline-flex h-[40px] items-center justify-center whitespace-nowrap rounded-[10px] border-2 border-[#e2233d] bg-transparent px-4 text-[13px] font-semibold text-white shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#e2233d] lg:px-5 xl:px-4 2xl:px-6 2xl:text-[14px]"
                >
                  Inscription
                </Link>
              </div>

              {/* MENU BUTTON - HIDE FROM 1280PX */}
              <button
                type="button"
                onClick={() => setOpenMenu(true)}
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-white/20 bg-white/10 text-[26px] text-white transition hover:bg-white/20 xl:hidden"
                aria-label="Open menu"
              >
                <IoMenu />
              </button>
            </div>
          </div>
        </div>
      </nav>

      <div className="h-[110px] w-full" aria-hidden="true" />

      {/* MOBILE AND TABLET OVERLAY */}
      {openMenu && (
        <div
          className="fixed inset-0 z-[998] bg-slate-950/55 backdrop-blur-[2px] xl:hidden"
          onClick={() => setOpenMenu(false)}
        />
      )}

      {/* MOBILE AND TABLET DRAWER */}
      <aside
        className={`fixed right-0 top-0 z-[999] h-full w-[320px] max-w-[86%] bg-white shadow-2xl transition-transform duration-300 xl:hidden ${
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

            {/* MOBILE LOGIN BUTTONS */}
            <div className="mt-6 grid grid-cols-1 gap-3 md:hidden">
              <Link
                href="/user-login"
                onClick={() => setOpenMenu(false)}
                className="rounded-xl border border-[#103677] px-5 py-3 text-center text-[16px] font-semibold text-[#103677] transition hover:bg-[#103677] hover:text-white"
              >
                Login
              </Link>

              <Link
                href="/inscription"
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
                    target="_blank"
                    rel="noreferrer"
                    aria-label={item.label}
                    className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-100 text-[18px] text-[#103677] transition hover:bg-[#103677] hover:text-white"
                  >
                    {item.icon}
                  </Link>
                </li>
              ))}
            </ul>

            <div className="mt-5 space-y-2 text-[14px] text-slate-600">
              <a
                href={`tel:${site.phone.replace(/\s/g, "")}`}
                className="flex items-center gap-2 transition hover:text-[#103677]"
              >
                <FaPhoneSquareAlt />

                <span>{site.phone}</span>
              </a>

              <a
                href={`mailto:${site.supportEmail}`}
                className="flex items-center gap-2 break-all transition hover:text-[#103677]"
              >
                <MdOutlineEmail />

                <span>{site.supportEmail}</span>
              </a>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
};

export default Navbar;
