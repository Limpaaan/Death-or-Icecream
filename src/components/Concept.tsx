import { motion } from "motion/react";
import { useTheme } from "../ThemeContext";
import { cn } from "../utils";

export function Concept() {
  const { theme } = useTheme();

  return (
    <section 
      id="concept"
      className={cn(
        "py-32 md:py-48 px-6 transition-colors duration-1000",
        theme === 'death' ? "bg-zinc-950 text-white" : "bg-white text-black"
      )}
    >
      <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="space-y-8"
        >
          <h2 className="font-display text-5xl md:text-7xl uppercase leading-none tracking-wider">
            The Author <br /> is Chance.
          </h2>
          <div className={cn(
            "w-12 h-1",
            theme === 'death' ? "bg-white" : "bg-black"
          )} />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="space-y-6 font-mono text-lg md:text-xl leading-relaxed opacity-80"
        >
          <p>
            Every canvas begins with a roll of the dice. The outcome dictates the subject, the mood, the palette.
          </p>
          <p>
            If the dice lands on Death, the work embraces the void, the stark, the inevitable.
          </p>
          <p>
            If it lands on Ice Cream, the work surrenders to sweetness, playfulness, and saturated chaos.
          </p>
          <p className="pt-4 font-bold tracking-widest uppercase text-sm opacity-100">
            Who truly creates the art? The hand that paints, or the chance that decides?
          </p>
        </motion.div>
      </div>
    </section>
  );
}
