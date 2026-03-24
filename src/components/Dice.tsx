import { motion } from "motion/react";
import { useEffect, useState } from "react";

export function Dice({ onRollComplete }: { onRollComplete: (result: 'death' | 'icecream') => void }) {
  const [rolling, setRolling] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setRolling(false);
      const result = Math.random() > 0.5 ? 'death' : 'icecream';
      setTimeout(() => onRollComplete(result), 1500);
    }, 2000);
    return () => clearTimeout(timer);
  }, [onRollComplete]);

  const dot = (cx: number, cy: number) => <circle cx={cx} cy={cy} r="10" fill="currentColor" />;

  const faces = [
    <svg viewBox="0 0 100 100" className="w-full h-full p-4">{dot(50, 50)}</svg>,
    <svg viewBox="0 0 100 100" className="w-full h-full p-4">{dot(25, 25)}{dot(75, 75)}</svg>,
    <svg viewBox="0 0 100 100" className="w-full h-full p-4">{dot(25, 25)}{dot(50, 50)}{dot(75, 75)}</svg>,
    <svg viewBox="0 0 100 100" className="w-full h-full p-4">{dot(25, 25)}{dot(75, 25)}{dot(25, 75)}{dot(75, 75)}</svg>,
    <svg viewBox="0 0 100 100" className="w-full h-full p-4">{dot(25, 25)}{dot(75, 25)}{dot(50, 50)}{dot(25, 75)}{dot(75, 75)}</svg>,
    <svg viewBox="0 0 100 100" className="w-full h-full p-4">{dot(25, 20)}{dot(75, 20)}{dot(25, 50)}{dot(75, 50)}{dot(25, 80)}{dot(75, 80)}</svg>,
  ];

  return (
    <div className="relative w-32 h-32" style={{ perspective: 1000 }}>
      <motion.div
        animate={
          rolling
            ? {
                rotateX: [0, 360, 720],
                rotateY: [0, 360, 720],
                rotateZ: [0, 180, 360],
              }
            : {
                rotateX: 0, // Lands on front face (6)
                rotateY: 0,
                rotateZ: 0,
              }
        }
        transition={
          rolling
            ? { duration: 2, ease: "linear", repeat: Infinity }
            : { duration: 0.5, ease: "easeOut" }
        }
        className="w-full h-full relative"
        style={{ transformStyle: "preserve-3d" }}
      >
        {/* Front - 6 */}
        <div className="absolute inset-0 border-4 border-white rounded-2xl bg-black flex items-center justify-center" style={{ transform: 'translateZ(64px)', backfaceVisibility: 'hidden' }}>
          {faces[5]}
        </div>
        {/* Back - 1 */}
        <div className="absolute inset-0 border-4 border-white rounded-2xl bg-black flex items-center justify-center" style={{ transform: 'rotateY(180deg) translateZ(64px)', backfaceVisibility: 'hidden' }}>
          {faces[0]}
        </div>
        {/* Right - 5 */}
        <div className="absolute inset-0 border-4 border-white rounded-2xl bg-black flex items-center justify-center" style={{ transform: 'rotateY(90deg) translateZ(64px)', backfaceVisibility: 'hidden' }}>
          {faces[4]}
        </div>
        {/* Left - 2 */}
        <div className="absolute inset-0 border-4 border-white rounded-2xl bg-black flex items-center justify-center" style={{ transform: 'rotateY(-90deg) translateZ(64px)', backfaceVisibility: 'hidden' }}>
          {faces[1]}
        </div>
        {/* Top - 4 */}
        <div className="absolute inset-0 border-4 border-white rounded-2xl bg-black flex items-center justify-center" style={{ transform: 'rotateX(90deg) translateZ(64px)', backfaceVisibility: 'hidden' }}>
          {faces[3]}
        </div>
        {/* Bottom - 3 */}
        <div className="absolute inset-0 border-4 border-white rounded-2xl bg-black flex items-center justify-center" style={{ transform: 'rotateX(-90deg) translateZ(64px)', backfaceVisibility: 'hidden' }}>
          {faces[2]}
        </div>
      </motion.div>
    </div>
  );
}
