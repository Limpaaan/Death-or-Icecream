import { motion } from "motion/react";
import { useTheme } from "../ThemeContext";
import { cn } from "../utils";

export function Navigation() {
  const { theme, toggleTheme } = useTheme();

  return (
    <motion.nav 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className={cn(
        "fixed top-0 left-0 right-0 z-40 px-6 py-4 flex items-center justify-between border-b transition-colors duration-700",
        theme === 'death' 
          ? "bg-black/80 backdrop-blur-md border-white/10 text-white" 
          : "bg-[#FFF5F5]/80 backdrop-blur-md border-black/10 text-black"
      )}
    >
      <div className="font-display uppercase text-2xl md:text-3xl tracking-wider">
        <span className={theme === 'death' ? "text-white" : "text-black"}>Death</span>
        <span className="mx-2 opacity-50 text-xl">or</span>
        <span className={theme === 'icecream' ? "text-pink-500" : "text-gray-500"}>Ice Cream</span>
      </div>

      <div className="hidden md:flex items-center space-x-8 text-sm font-mono uppercase tracking-widest">
        <a href="#gallery" className="hover:opacity-50 transition-opacity">Gallery</a>
        <a href="#concept" className="hover:opacity-50 transition-opacity">Concept</a>
        <a href="#fate" className="hover:opacity-50 transition-opacity">The System</a>
        <a href="#about" className="hover:opacity-50 transition-opacity">About me</a>
      </div>

      <a 
        href="#system"
        className={cn(
          "px-4 py-2 text-xs font-mono uppercase tracking-widest border rounded-full transition-all duration-300",
          theme === 'death'
            ? "border-white/30 hover:bg-white hover:text-black"
            : "border-black/30 hover:bg-black hover:text-white"
        )}
      >
        Test Fate
      </a>
    </motion.nav>
  );
}
