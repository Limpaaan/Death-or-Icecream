import { motion } from "motion/react";
import { cn } from "../utils";

export type PaintingState = {
  motive?: 'death' | 'icecream';
  skullType?: number;
  colorTheme?: string;
  container?: string;
  subtype?: number;
  iceCreamType?: string;
  scoopCount?: number;
  bite?: boolean;
  biteOrientation?: string;
  melting?: boolean;
  meltingPosition?: string;
  size?: string;
};

export function EvolvingPainting({ state, theme }: { state: PaintingState, theme: string }) {
  const isDark = theme === 'death';
  
  let bgColor = isDark ? '#09090b' : '#fff5f5';
  let strokeColor = isDark ? '#ffffff' : '#000000';
  let fillColor = 'transparent';

  if (state.colorTheme === 'Red') {
    bgColor = '#ef4444';
    strokeColor = '#ef4444';
    fillColor = '#ffffff';
  } else if (state.colorTheme === 'Blue') {
    bgColor = '#2563eb';
    strokeColor = '#2563eb';
    fillColor = '#ffffff';
  } else if (state.colorTheme === 'Black') {
    bgColor = '#000000';
    strokeColor = '#000000';
    fillColor = '#ffffff';
  }

  return (
    <div 
      className="w-full aspect-square max-w-md mx-auto border-4 relative flex items-center justify-center p-8 transition-colors duration-1000"
      style={{ backgroundColor: bgColor, borderColor: isDark && !state.colorTheme ? '#ffffff' : '#000000' }}
    >
      {/* Canvas Label */}
      <div className="absolute bottom-4 right-4 font-mono text-xs opacity-50 uppercase tracking-widest" style={{ color: state.colorTheme ? '#ffffff' : 'inherit' }}>
        {state.size || "Awaiting Size..."}
      </div>

      <svg viewBox="0 0 100 100" className="w-full h-full overflow-visible">
        <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1 }}>
          {state.motive === 'death' && (
            <g>
              {/* Skull Base */}
              <motion.path 
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 1.5 }}
                d="M 20 40 C 20 10, 80 10, 80 40 C 80 60, 70 70, 65 90 L 35 90 C 30 70, 20 60, 20 40 Z" 
                fill={state.colorTheme ? fillColor : 'transparent'} 
                stroke={strokeColor} 
                strokeWidth="2" 
              />
              {/* Eyes */}
              <circle cx="35" cy="45" r="8" fill={state.colorTheme ? strokeColor : bgColor} stroke={strokeColor} strokeWidth="2" />
              <circle cx="65" cy="45" r="8" fill={state.colorTheme ? strokeColor : bgColor} stroke={strokeColor} strokeWidth="2" />
              {/* Nose */}
              <path d="M 50 55 L 45 65 L 55 65 Z" fill={state.colorTheme ? strokeColor : bgColor} stroke={strokeColor} strokeWidth="2" />
              {/* Teeth */}
              <line x1="40" y1="90" x2="40" y2="80" stroke={strokeColor} strokeWidth="2" />
              <line x1="50" y1="90" x2="50" y2="80" stroke={strokeColor} strokeWidth="2" />
              <line x1="60" y1="90" x2="60" y2="80" stroke={strokeColor} strokeWidth="2" />
              
              {/* Skull Type Variations */}
              {state.skullType && (
                <path 
                  d={`M 50 15 Q ${50 + (state.skullType - 10) * 2} 25 50 35`} 
                  fill="none" 
                  stroke={strokeColor} 
                  strokeWidth="2" 
                  opacity="0.5" 
                />
              )}
            </g>
          )}

          {state.motive === 'icecream' && (
            <g>
              {/* Container */}
              {state.container === 'Cup' && (
                <motion.path initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 1 }} d="M 30 90 L 70 90 L 80 50 L 20 50 Z" fill={state.colorTheme ? fillColor : 'transparent'} stroke={strokeColor} strokeWidth="2" />
              )}
              {state.container === 'Cone' && (
                <motion.path initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 1 }} d="M 50 95 L 20 40 L 80 40 Z" fill={state.colorTheme ? fillColor : 'transparent'} stroke={strokeColor} strokeWidth="2" />
              )}
              {state.container === 'Popsicle stick' && (
                <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1 }}>
                  <rect x="45" y="70" width="10" height="25" fill={state.colorTheme ? fillColor : 'transparent'} stroke={strokeColor} strokeWidth="2" />
                  <rect x="30" y="10" width="40" height="60" rx="20" fill={state.colorTheme ? fillColor : 'transparent'} stroke={strokeColor} strokeWidth="2" />
                </motion.g>
              )}

              {/* Ice Cream Type (only for Cup/Cone) */}
              {state.container !== 'Popsicle stick' && state.iceCreamType === 'Scooped Icecream' && (
                <g fill={state.colorTheme ? fillColor : 'transparent'} stroke={strokeColor} strokeWidth="2">
                  <motion.circle initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring" }} cx="50" cy="35" r="22" />
                  {state.scoopCount && state.scoopCount >= 2 && (
                    <motion.circle initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring", delay: 0.2 }} cx="50" cy="12" r="18" />
                  )}
                  {state.scoopCount && state.scoopCount >= 3 && (
                    <motion.circle initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring", delay: 0.4 }} cx="50" cy="-5" r="15" />
                  )}
                </g>
              )}
              {state.container !== 'Popsicle stick' && state.iceCreamType === 'Softserve' && (
                <motion.path initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 1 }} d="M 25 40 C 20 20, 80 20, 75 40 C 85 20, 50 5, 50 5 C 50 5, 15 20, 25 40 Z" fill={state.colorTheme ? fillColor : 'transparent'} stroke={strokeColor} strokeWidth="2" />
              )}

              {/* Subtype decorations */}
              {state.subtype === 1 && (
                <circle cx="50" cy={state.container === 'Popsicle stick' ? 25 : 10} r="5" fill={strokeColor} />
              )}
              {state.subtype === 2 && (
                <g stroke={strokeColor} strokeWidth="2">
                  <line x1="40" y1="25" x2="45" y2="30" />
                  <line x1="60" y1="20" x2="55" y2="25" />
                  <line x1="50" y1="35" x2="55" y2="35" />
                </g>
              )}
              {state.subtype === 3 && (
                <path d="M 35 40 L 35 50 A 5 5 0 0 0 45 50 L 45 40 M 55 40 L 55 55 A 5 5 0 0 0 65 55 L 65 40" fill="none" stroke={strokeColor} strokeWidth="2" />
              )}

              {/* Melting */}
              {state.melting && state.meltingPosition && (
                <motion.line
                  initial={{ y2: 40 }} animate={{ y2: state.meltingPosition === 'Middle' ? 65 : 60 }}
                  x1={state.meltingPosition === 'Left side' ? 30 : state.meltingPosition === 'Middle' ? 50 : 70}
                  y1="40"
                  x2={state.meltingPosition === 'Left side' ? 30 : state.meltingPosition === 'Middle' ? 50 : 70}
                  stroke={state.colorTheme ? fillColor : strokeColor}
                  strokeWidth="6"
                  strokeLinecap="round"
                />
              )}

              {/* Bite */}
              {state.bite && state.biteOrientation && (
                <motion.circle 
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  cx={state.biteOrientation === 'Top' ? 50 : state.biteOrientation === 'Left side' ? 25 : 75} 
                  cy={state.biteOrientation === 'Top' ? 15 : 35} 
                  r="15" 
                  fill={bgColor} 
                  stroke={bgColor} 
                  strokeWidth="3" 
                />
              )}
            </g>
          )}
        </motion.g>
      </svg>
    </div>
  );
}
