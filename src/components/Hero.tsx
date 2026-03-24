import { motion, AnimatePresence } from "motion/react";
import { useTheme } from "../ThemeContext";
import { cn } from "../utils";

export function Hero() {
  const { theme } = useTheme();

  return (
    <section className={cn(
      "relative min-h-screen flex items-center justify-center overflow-hidden transition-colors duration-1000",
      theme === 'death' ? "bg-black text-white" : "bg-[#FFF5F5] text-black"
    )}>
      {/* Background abstract shapes */}
      <div className="absolute inset-0 z-0 opacity-20 pointer-events-none">
        <AnimatePresence mode="wait">
          {theme === 'death' ? (
            <motion.div
              key="death-bg"
              initial={{ opacity: 0, scale: 1.1 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 1.5 }}
              className="absolute top-1/4 left-1/4 w-[50vw] h-[50vw] bg-zinc-900 rounded-full blur-3xl mix-blend-screen"
            />
          ) : (
            <motion.div
              key="icecream-bg"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.1 }}
              transition={{ duration: 1.5 }}
              className="absolute top-1/3 right-1/4 w-[40vw] h-[40vw] bg-pink-200 rounded-full blur-3xl mix-blend-multiply"
            />
          )}
        </AnimatePresence>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 flex flex-col items-center text-center">
        <AnimatePresence mode="wait">
          <motion.div
            key={theme}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="space-y-8"
          >
            <h1 className={cn(
              "font-display text-7xl md:text-9xl lg:text-[10rem] uppercase leading-none tracking-wider",
              theme === 'death' ? "text-white" : "text-black"
            )}>
              Death or Icecream
            </h1>
            
            <p className="max-w-2xl mx-auto text-lg md:text-2xl font-mono tracking-wide opacity-80 text-right pr-4 md:pr-12">
              -Anders Delbom
            </p>

            <div className="pt-12">
              <a 
                href="#gallery"
                className={cn(
                  "inline-block px-8 py-4 text-sm font-mono uppercase tracking-widest border transition-all duration-300",
                  theme === 'death'
                    ? "border-white hover:bg-white hover:text-black"
                    : "border-black hover:bg-black hover:text-white"
                )}
              >
                Enter the System
              </a>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Scroll indicator */}
      <motion.div 
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center space-y-2 opacity-50"
      >
        <span className="text-xs font-mono uppercase tracking-widest">Scroll</span>
        <div className={cn(
          "w-[1px] h-12",
          theme === 'death' ? "bg-white" : "bg-black"
        )} />
      </motion.div>
    </section>
  );
}
