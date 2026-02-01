import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="min-h-[70vh] flex items-center justify-center bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 px-4">
      <div className="text-center max-w-md w-full bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-10 shadow-2xl">
        <h1 className="text-7xl font-extrabold text-orange-500 mb-2">404</h1>
        <h2 className="text-2xl font-semibold text-white mb-3">
          Page Not Found
        </h2>
        <p className="text-gray-300 mb-6">
          Oops! Ye page exist nahi karta ya move ho chuka hai.
        </p>

        <Link
          to="/"
          className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-orange-500 text-white font-medium hover:bg-orange-600 transition-all duration-200 active:scale-95 shadow-lg"
        >
          ⬅️ Go back to Home
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
