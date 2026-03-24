import { motion } from "motion/react";
import { useTheme } from "../ThemeContext";
import { cn } from "../utils";

export function About() {
  const { theme } = useTheme();

  return (
    <section 
      id="about"
      className={cn(
        "py-32 md:py-48 px-6 transition-colors duration-1000",
        theme === 'death' ? "bg-zinc-900 text-white" : "bg-pink-50 text-black"
      )}
    >
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="space-y-12"
        >
          <h2 className="font-display text-5xl md:text-7xl uppercase tracking-wider">
            About Me
          </h2>
          
          <div className="space-y-8 font-mono text-lg md:text-xl leading-relaxed opacity-90">
            <p>
              My name is Anders Delbom and I'm the person behind Death or Icecream — a daily art project where every painting is born from the randomness of dice rolls and coinflips. No planning. No rerolls. Just as close to true random as possible since 9 July 2022.
            </p>
            <p>
              This project is about showing up every day, letting go of perfection, and finding beauty in random. Death or icecream — either way, it's a treat.
            </p>
          </div>

          <div className="pt-8">
            <a 
              href="https://onkawara.co.uk/styled-112/?utm_source=ig&utm_medium=social&utm_content=link_in_bio"
              target="_blank"
              rel="noopener noreferrer"
              className={cn(
                "inline-block px-8 py-4 text-sm font-mono uppercase tracking-widest border transition-all duration-300",
                theme === 'death'
                  ? "border-white hover:bg-white hover:text-black"
                  : "border-black hover:bg-black hover:text-white"
              )}
            >
              On Kawara Inspiration
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
