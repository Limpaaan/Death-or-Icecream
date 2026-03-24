import { motion } from "motion/react";
import { Dice } from "./Dice";

export function Intro({ onComplete }: { key?: string; onComplete: (result: 'death' | 'icecream') => void }) {
  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, y: -50 }}
      transition={{ duration: 1, ease: "easeInOut" }}
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black text-white font-mono"
    >
      <div className="mb-12 text-center space-y-4">
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="font-display text-5xl md:text-7xl uppercase tracking-wider"
        >
          Death or Ice Cream
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="text-sm md:text-base text-gray-400 tracking-widest uppercase"
        >
          The dice decides the fate.
        </motion.p>
      </div>
      
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 2 }}
      >
        <Dice onRollComplete={onComplete} />
      </motion.div>
    </motion.div>
  );
}
