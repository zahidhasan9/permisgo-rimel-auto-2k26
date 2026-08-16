import Link from "next/link";
import { FaHome, FaSearch } from "react-icons/fa";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 flex items-center justify-center px-6">
      <div className="text-center max-w-2xl">
        {/* 404 Number */}
        <h1 className="text-8xl md:text-9xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-cyan-400 to-purple-500">
          404
        </h1>

        {/* Title */}
        <h2 className="mt-6 text-3xl md:text-5xl font-bold text-white">
          Oops! Page Not Found
        </h2>

        {/* Description */}
        <p className="mt-4 text-gray-300 text-lg leading-relaxed">
          The page you're looking for doesn't exist or has been moved. Don't
          worry, you can head back to the homepage and continue exploring.
        </p>

        {/* Buttons */}
        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href="/"
            className="flex items-center gap-2 rounded-xl bg-blue-600 px-6 py-3 text-white font-semibold shadow-lg transition-all duration-300 hover:bg-blue-700 hover:scale-105"
          >
            <FaHome />
            Back to Home
          </Link>

          <Link
            href="/"
            className="flex items-center gap-2 rounded-xl border border-gray-600 px-6 py-3 text-gray-200 transition-all duration-300 hover:bg-white hover:text-gray-900 hover:scale-105"
          >
            <FaSearch />
            Explore
          </Link>
        </div>

        {/* Decorative Circle */}
        <div className="relative mt-16 flex justify-center">
          <div className="absolute h-44 w-44 rounded-full bg-blue-500/20 blur-3xl"></div>
          <div className="absolute h-32 w-32 rounded-full bg-purple-500/20 blur-2xl"></div>

          <div className="relative flex h-28 w-28 items-center justify-center rounded-full border border-white/20 bg-white/10 backdrop-blur-lg shadow-2xl">
            <span className="text-5xl">🚀</span>
          </div>
        </div>
      </div>
    </div>
  );
}
