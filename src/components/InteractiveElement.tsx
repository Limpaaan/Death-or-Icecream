import { motion, AnimatePresence } from "motion/react";
import { useState, useRef, useEffect } from "react";
import { useTheme } from "../ThemeContext";
import { cn } from "../utils";
import { Roller, RollerType } from "./Roller";
import { EvolvingPainting, PaintingState } from "./EvolvingPainting";

type RollHistory = {
  id: string;
  type: RollerType;
  label: string;
  result: string | number;
  rawResult?: string | number;
};

const delay = (ms: number) => new Promise(res => setTimeout(res, ms));

export function InteractiveElement() {
  const { theme, setTheme } = useTheme();
  const [isRolling, setIsRolling] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const [history, setHistory] = useState<RollHistory[]>([]);
  const [paintingState, setPaintingState] = useState<PaintingState>({});
  const [currentAction, setCurrentAction] = useState<{ type: RollerType, label: string } | null>(null);
  
  const historyContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (historyContainerRef.current) {
      historyContainerRef.current.scrollTop = historyContainerRef.current.scrollHeight;
    }
  }, [history, currentAction]);

  const addHistory = (type: RollerType, label: string, result: string | number, rawResult?: string | number) => {
    setHistory(h => [...h, { id: Math.random().toString(), type, label, result, rawResult }]);
  };

  const rollD = (sides: number) => Math.floor(Math.random() * sides) + 1;
  const flipCoin = () => Math.random() > 0.5 ? 'Heads' : 'Tails';

  const handleRoll = async () => {
    setIsRolling(true);
    setIsComplete(false);
    setHistory([]);
    setPaintingState({});
    
    // 1. Motive
    setCurrentAction({ type: 'coin', label: 'Flipping for Motive...' });
    await delay(2000);
    const motiveCoin = flipCoin();
    const motive = motiveCoin === 'Heads' ? 'death' : 'icecream';
    addHistory('coin', 'Motive', motive === 'death' ? 'Skull (Death)' : 'Ice Cream', motiveCoin);
    setPaintingState(p => ({ ...p, motive }));
    setTheme(motive);
    setCurrentAction(null);
    await delay(1500);

    if (motive === 'death') {
      // Skull Type
      setCurrentAction({ type: 'd20', label: 'Rolling D20 for Skull Type...' });
      await delay(2000);
      const skullType = rollD(20);
      addHistory('d20', 'Skull Type', `Type #${skullType}`, skullType);
      setPaintingState(p => ({ ...p, skullType }));
      setCurrentAction(null);
      await delay(1500);

      // Color Theme
      setCurrentAction({ type: 'd3', label: 'Rolling D3 for Color Theme...' });
      await delay(2000);
      const colorRoll = rollD(3);
      const colors = ["Red", "Blue", "Black"];
      const colorTheme = colors[colorRoll - 1];
      addHistory('d3', 'Color Theme', colorTheme, colorRoll);
      setPaintingState(p => ({ ...p, colorTheme }));
      setCurrentAction(null);
      await delay(1500);
    } else {
      // Container
      setCurrentAction({ type: 'd3', label: 'Rolling D3 for Container...' });
      await delay(2000);
      const containerRoll = rollD(3);
      const containers = ["Cup", "Cone", "Popsicle stick"];
      const container = containers[containerRoll - 1];
      addHistory('d3', 'Container', container, containerRoll);
      setPaintingState(p => ({ ...p, container }));
      setCurrentAction(null);
      await delay(1500);

      // Subtype
      setCurrentAction({ type: 'd3', label: 'Rolling D3 for Subtype...' });
      await delay(2000);
      const subtype = rollD(3);
      addHistory('d3', 'Subtype', `Subtype #${subtype}`, subtype);
      setPaintingState(p => ({ ...p, subtype }));
      setCurrentAction(null);
      await delay(1500);

      // Ice Cream Type (if Cup or Cone)
      // Ice Cream Type (if Cup or Cone)
      let iceCreamType = '';
      if (containerRoll === 1 || containerRoll === 2) {
        setCurrentAction({ type: 'coin', label: 'Flipping for Ice Cream Type...' });
        await delay(2000);
        const typeCoin = flipCoin();
        iceCreamType = typeCoin === 'Heads' ? 'Softserve' : 'Scooped Icecream';
        addHistory('coin', 'Ice Cream Type', iceCreamType, typeCoin);
        setPaintingState(p => ({ ...p, iceCreamType }));
        setCurrentAction(null);
        await delay(1500);
      }

      // Scoop Count (if Scooped Icecream)
      if (iceCreamType === 'Scooped Icecream') {
        setCurrentAction({ type: 'd3', label: 'Rolling D3 for Scoop Count...' });
        await delay(2000);
        const scoopCount = rollD(3);
        addHistory('d3', 'Scoop Count', `${scoopCount} Scoop${scoopCount > 1 ? 's' : ''}`, scoopCount);
        setPaintingState(p => ({ ...p, scoopCount }));
        setCurrentAction(null);
        await delay(1500);
      }

      // Bite
      setCurrentAction({ type: 'coin', label: 'Flipping for Bite...' });
      await delay(2000);
      const biteCoin = flipCoin();
      const bite = biteCoin === 'Heads';
      addHistory('coin', 'Bite', bite ? 'Yes' : 'No', biteCoin);
      setPaintingState(p => ({ ...p, bite }));
      setCurrentAction(null);
      await delay(1500);

      if (bite) {
        setCurrentAction({ type: 'd3', label: 'Rolling D3 for Bite Orientation...' });
        await delay(2000);
        const biteRoll = rollD(3);
        const orientations = ["Top", "Left side", "Right side"];
        const biteOrientation = orientations[biteRoll - 1];
        addHistory('d3', 'Bite Orientation', biteOrientation, biteRoll);
        setPaintingState(p => ({ ...p, biteOrientation }));
        setCurrentAction(null);
        await delay(1500);
      }

      // Melting
      setCurrentAction({ type: 'coin', label: 'Flipping for Melting...' });
      await delay(2000);
      const meltingCoin = flipCoin();
      const melting = meltingCoin === 'Heads';
      addHistory('coin', 'Melting', melting ? 'Yes' : 'No', meltingCoin);
      setPaintingState(p => ({ ...p, melting }));
      setCurrentAction(null);
      await delay(1500);

      if (melting) {
        setCurrentAction({ type: 'd3', label: 'Rolling D3 for Melting Position...' });
        await delay(2000);
        const meltRoll = rollD(3);
        const meltPositions = ["Left side", "Middle", "Right side"];
        const meltingPosition = meltPositions[meltRoll - 1];
        addHistory('d3', 'Melting Position', meltingPosition, meltRoll);
        setPaintingState(p => ({ ...p, meltingPosition }));
        setCurrentAction(null);
        await delay(1500);
      }

      // Color Theme
      setCurrentAction({ type: 'd3', label: 'Rolling D3 for Color Theme...' });
      await delay(2000);
      const colorRoll = rollD(3);
      const colors = ["Red", "Blue", "Black"];
      const colorTheme = colors[colorRoll - 1];
      addHistory('d3', 'Color Theme', colorTheme, colorRoll);
      setPaintingState(p => ({ ...p, colorTheme }));
      setCurrentAction(null);
      await delay(1500);
    }

    // Size (Both)
    setCurrentAction({ type: 'd20', label: 'Rolling D20 & D10 for Size...' });
    await delay(2000);
    let d20 = rollD(20);
    let d10 = rollD(10);
    addHistory('d20', 'Size D20', d20, d20);
    addHistory('d10', 'Size D10', d10, d10);
    setCurrentAction(null);
    await delay(1500);

    let is2x2 = false;
    let is1x1 = false;
    let isHalf = (d20 === 1);

    if (d20 === 20) {
      setCurrentAction({ type: 'd20', label: 'D20 was 20. Rerolling D20...' });
      await delay(2000);
      let d20_2 = rollD(20);
      addHistory('d20', 'Size D20 Reroll', d20_2, d20_2);
      setCurrentAction(null);
      await delay(1500);
      if (d20_2 === 20) {
        is2x2 = true;
      }
    }

    if (d10 === 1) {
      setCurrentAction({ type: 'd10', label: 'D10 was 1. Rerolling D10...' });
      await delay(2000);
      let d10_2 = rollD(10);
      addHistory('d10', 'Size D10 Reroll', d10_2, d10_2);
      setCurrentAction(null);
      await delay(1500);
      if (d10_2 === 1) {
        is1x1 = true;
      }
    }

    let size = "Standard Size";
    if (is2x2) size = "2x2m";
    else if (is1x1) size = "1x1m";
    else if (isHalf) size = "0.5x0.5m";

    addHistory('canvas', 'Final Size', size);
    setPaintingState(p => ({ ...p, size }));

    setIsRolling(false);
    setIsComplete(true);
  };

  return (
    <section 
      id="fate"
      className={cn(
        "py-32 md:py-48 px-6 min-h-screen flex flex-col items-center justify-center transition-colors duration-1000",
        theme === 'death' ? "bg-zinc-950 text-white" : "bg-pink-50 text-black"
      )}
    >
      <div className="max-w-7xl w-full mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
        
        {/* Left: Controls & History */}
        <div className="space-y-12">
          <div className="space-y-6">
            <h2 className="font-display text-5xl md:text-7xl uppercase leading-none tracking-wider">
              Test Your Fate
            </h2>
            <p className="font-mono text-lg opacity-80 max-w-md">
              Initiate the sequence. The system dictates the motive, the palette, the scale, and the future.
            </p>
          </div>

          {!isRolling && !isComplete && (
            <button 
              onClick={handleRoll}
              className={cn(
                "px-8 py-4 font-mono font-bold uppercase tracking-widest text-sm border-2 transition-all duration-300 hover:scale-105",
                theme === 'death' ? "border-white hover:bg-white hover:text-black" : "border-black hover:bg-black hover:text-white"
              )}
            >
              Initiate Sequence
            </button>
          )}

          {isComplete && (
            <button 
              onClick={handleRoll}
              className={cn(
                "px-8 py-4 font-mono font-bold uppercase tracking-widest text-sm border-2 transition-all duration-300 hover:scale-105",
                theme === 'death' ? "border-white/50 hover:bg-white hover:text-black" : "border-black/50 hover:bg-black hover:text-white"
              )}
            >
              Run Again
            </button>
          )}

          {/* History Container */}
          <div 
            ref={historyContainerRef}
            className="space-y-4 max-h-[50vh] overflow-y-auto pr-4 scrollbar-hide"
          >
            <AnimatePresence>
              {history.map(h => (
                <motion.div 
                  key={h.id} 
                  initial={{ opacity: 0, x: -20 }} 
                  animate={{ opacity: 1, x: 0 }} 
                  className="flex items-center gap-6 font-mono text-sm"
                >
                  <div className="flex-shrink-0">
                    <Roller type={h.type} rolling={false} result={h.rawResult} theme={theme} />
                  </div>
                  <div>
                    <div className="opacity-50 text-xs uppercase tracking-widest">{h.label}</div>
                    <div className="font-bold text-lg">{h.result}</div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>

            {/* Current Action */}
            {currentAction && (
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className={cn(
                  "flex items-center gap-6 p-4 border rounded-xl",
                  theme === 'death' ? "border-white/20 bg-white/5" : "border-black/20 bg-black/5"
                )}
              >
                <div className="flex-shrink-0">
                  <Roller type={currentAction.type} rolling={true} theme={theme} />
                </div>
                <span className="font-mono font-bold uppercase tracking-widest animate-pulse">
                  {currentAction.label}
                </span>
              </motion.div>
            )}
          </div>
        </div>

        {/* Right: Evolving Painting */}
        <div className="lg:sticky lg:top-32">
          <EvolvingPainting state={paintingState} theme={theme} />
        </div>

      </div>
    </section>
  );
}
