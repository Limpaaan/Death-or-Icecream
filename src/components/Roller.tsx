import { motion } from "motion/react";

export type RollerType = 'coin' | 'd3' | 'd10' | 'd20' | 'canvas';

interface RollerProps {
  type: RollerType;
  rolling: boolean;
  result?: string | number;
  theme: string;
}

export function Roller({ type, rolling, result, theme }: RollerProps) {
  const stroke = theme === 'death' ? '#ffffff' : '#000000';
  const fill = theme === 'death' ? '#09090b' : '#fff5f5';

  const variants = {
    rolling: { 
      rotateY: 360, 
      rotateX: type === 'coin' ? 0 : 360, 
      transition: { duration: 0.6, repeat: Infinity, ease: "linear" } 
    },
    stopped: { 
      rotateY: 0, 
      rotateX: 0, 
      transition: { duration: 0.3 } 
    }
  };

  let displayResult = result;
  if (typeof result === 'string') {
    if (result === 'Heads') displayResult = 'H';
    else if (result === 'Tails') displayResult = 'T';
    else displayResult = '';
  }

  if (type === 'canvas') {
    return (
      <div className="w-12 h-12 flex items-center justify-center border-2" style={{ borderColor: stroke }}>
        <span style={{ color: stroke }} className="font-mono text-[10px] font-bold">RES</span>
      </div>
    );
  }

  return (
    <div className="w-12 h-12 flex items-center justify-center" style={{ perspective: 800 }}>
      <motion.div
        variants={variants}
        animate={rolling ? "rolling" : "stopped"}
        className="w-full h-full relative flex items-center justify-center"
        style={{ transformStyle: 'preserve-3d' }}
      >
        {type === 'coin' && (
          <svg viewBox="0 0 100 100" className="w-full h-full absolute">
            <circle cx="50" cy="50" r="45" fill={fill} stroke={stroke} strokeWidth="4" />
            {!rolling && displayResult && (
              <text x="50" y="62" textAnchor="middle" fill={stroke} fontSize="35" fontFamily="monospace" fontWeight="bold">
                {displayResult}
              </text>
            )}
          </svg>
        )}
        {type === 'd3' && (
          <svg viewBox="0 0 100 100" className="w-full h-full absolute">
            <polygon points="50,10 90,85 10,85" fill={fill} stroke={stroke} strokeWidth="4" strokeLinejoin="round" />
            {!rolling && displayResult && (
              <text x="50" y="70" textAnchor="middle" fill={stroke} fontSize="30" fontFamily="monospace" fontWeight="bold">
                {displayResult}
              </text>
            )}
          </svg>
        )}
        {type === 'd10' && (
          <svg viewBox="0 0 100 100" className="w-full h-full absolute">
            <polygon points="50,10 90,50 50,90 10,50" fill={fill} stroke={stroke} strokeWidth="4" strokeLinejoin="round" />
            {!rolling && displayResult && (
              <text x="50" y="60" textAnchor="middle" fill={stroke} fontSize="30" fontFamily="monospace" fontWeight="bold">
                {displayResult}
              </text>
            )}
          </svg>
        )}
        {type === 'd20' && (
          <svg viewBox="0 0 100 100" className="w-full h-full absolute">
            <polygon points="50,10 90,30 90,70 50,90 10,70 10,30" fill={fill} stroke={stroke} strokeWidth="4" strokeLinejoin="round" />
            <polyline points="50,10 50,50 90,30" fill="none" stroke={stroke} strokeWidth="2" opacity="0.5" />
            <polyline points="50,50 10,30" fill="none" stroke={stroke} strokeWidth="2" opacity="0.5" />
            <polyline points="50,50 50,90" fill="none" stroke={stroke} strokeWidth="2" opacity="0.5" />
            {!rolling && displayResult && (
              <text x="50" y="60" textAnchor="middle" fill={stroke} fontSize="24" fontFamily="monospace" fontWeight="bold">
                {displayResult}
              </text>
            )}
          </svg>
        )}
      </motion.div>
    </div>
  );
}
