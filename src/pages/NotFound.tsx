import { Link } from "react-router-dom";
import { motion } from "framer-motion"; // Optional: For animations

const NotFound = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-gray-900 to-slate-950 px-4 py-12 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl"></div>
        <div className="absolute top-1/3 -left-20 w-80 h-80 bg-orange-500/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-1/3 w-60 h-60 bg-blue-500/10 rounded-full blur-3xl"></div>
        
        {/* Grid Pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:40px_40px]"></div>
      </div>

      {/* Animated Floating Elements */}
      <div className="absolute top-1/4 left-10 animate-bounce">
        <div className="w-4 h-4 bg-orange-500 rounded-full"></div>
      </div>
      <div className="absolute bottom-1/3 right-10 animate-pulse">
        <div className="w-6 h-6 border-2 border-blue-500 rounded-full"></div>
      </div>

      <div className="container mx-auto max-w-6xl">
        <div className="flex flex-col lg:flex-row items-center justify-center min-h-[80vh] gap-12 lg:gap-20">
          {/* Left Side - Error Code */}
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="relative"
          >
            <div className="relative">
              <h1 className="text-[180px] lg:text-[250px] font-black text-slate-800/50 leading-none tracking-tighter">
                404
              </h1>
              <div className="absolute inset-0 flex items-center justify-center">
                <h1 className="text-[180px] lg:text-[250px] font-black bg-gradient-to-r from-orange-500 via-amber-500 to-orange-400 bg-clip-text text-transparent leading-none tracking-tighter">
                  404
                </h1>
              </div>
            </div>
            
            {/* Decorative Lines */}
            <div className="absolute -bottom-6 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-orange-500 to-transparent"></div>
          </motion.div>

          {/* Right Side - Content */}
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-left max-w-lg"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-6">
              <span className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></span>
              <span className="text-sm text-gray-300 font-medium">ERROR 404</span>
            </div>

            <h2 className="text-4xl lg:text-5xl font-bold text-white mb-4">
              Lost in the <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-amber-300">Digital Void</span>
            </h2>
            
            <p className="text-xl text-gray-300 mb-8 leading-relaxed">
              The page you're looking for seems to have wandered off into the digital ether. 
              It might have been moved, deleted, or perhaps it never existed at all.
            </p>

            <div className="space-y-6">
              <div className="bg-gradient-to-r from-white/5 to-white/[0.02] border-l-4 border-orange-500 p-4 rounded-r-lg">
                <p className="text-gray-300">
                  <span className="text-orange-400 font-semibold">Possible reasons:</span> Typos in URL, broken link, or the content has been relocated.
                </p>
              </div>

              <div className="flex flex-wrap gap-4 mt-8">
                <Link
                  to="/"
                  className="group relative flex items-center gap-3 px-8 py-4 rounded-xl bg-gradient-to-r from-orange-500 to-amber-500 text-white font-semibold hover:from-orange-600 hover:to-amber-600 transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] shadow-lg shadow-orange-500/20"
                >
                  <span className="relative z-10">🏠 Return Home</span>
                  <div className="absolute inset-0 rounded-xl bg-white/0 group-hover:bg-white/10 transition-colors duration-300"></div>
                  <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </Link>

                <button 
                  onClick={() => window.history.back()}
                  className="group flex items-center gap-3 px-6 py-4 rounded-xl bg-white/5 text-gray-300 font-medium hover:bg-white/10 border border-white/10 transition-all duration-300 hover:text-white"
                >
                  <svg className="w-5 h-5 group-hover:-translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                  </svg>
                  <span>Go Back</span>
                </button>

                <button 
                  onClick={() => window.location.reload()}
                  className="group flex items-center gap-3 px-6 py-4 rounded-xl bg-white/5 text-gray-300 font-medium hover:bg-white/10 border border-white/10 transition-all duration-300 hover:text-white"
                >
                  <svg className="w-5 h-5 group-hover:rotate-180 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                  </svg>
                  <span>Retry</span>
                </button>
              </div>

              {/* Search Bar */}
              <div className="mt-10 pt-8 border-t border-white/10">
                <p className="text-gray-400 mb-3">Or search for what you need:</p>
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Search our website..."
                    className="w-full px-6 py-4 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-orange-500/50 focus:border-orange-500/50 transition-all duration-300"
                  />
                  <button className="absolute right-3 top-1/2 -translate-y-1/2 px-4 py-2 rounded-lg bg-orange-500/20 text-orange-400 hover:bg-orange-500/30 transition-colors duration-300">
                    Search
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Footer Note */}
        <div className="text-center mt-16 pt-8 border-t border-white/10">
          <p className="text-gray-500 text-sm">
            Need help? <a href="/contact" className="text-orange-400 hover:text-orange-300 transition-colors duration-300 underline">Contact Support</a> • 
            <a href="/sitemap" className="text-gray-400 hover:text-white transition-colors duration-300 ml-4">Sitemap</a> • 
            <a href="/faq" className="text-gray-400 hover:text-white transition-colors duration-300 ml-4">FAQ</a>
          </p>
          <p className="text-gray-600 text-xs mt-2">
            © {new Date().getFullYear()} Your Company. All rights reserved.
          </p>
        </div>
      </div>
    </div>
  );
};

export default NotFound;