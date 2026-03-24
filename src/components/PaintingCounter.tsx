import { useEffect, useState } from 'react';

export function PaintingCounter() {
  const [count, setCount] = useState(1349);

  useEffect(() => {
    const calculateCount = () => {
      // Base time: March 23, 2026, 17:00:00 UTC (which is 18:00 CET)
      const baseDate = new Date(Date.UTC(2026, 2, 23, 17, 0, 0)).getTime();
      const now = Date.now();
      
      if (now < baseDate) return 1349;
      
      const diffMs = now - baseDate;
      const daysPassed = Math.floor(diffMs / (1000 * 60 * 60 * 24));
      return 1349 + daysPassed;
    };

    setCount(calculateCount());
    
    // Check every minute
    const interval = setInterval(() => {
      setCount(calculateCount());
    }, 60000);
    
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed bottom-6 left-6 font-mono text-xs opacity-50 tracking-widest z-50 pointer-events-none uppercase">
      Current Painting: #{count}
    </div>
  );
}
