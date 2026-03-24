import { motion } from "motion/react";
import { useTheme } from "../ThemeContext";
import { cn } from "../utils";

export function Footer() {
  const { theme } = useTheme();

  return (
    <footer 
      className={cn(
        "py-32 px-6 transition-colors duration-1000 border-t",
        theme === 'death' ? "bg-zinc-950 text-white border-white/10" : "bg-[#FFF5F5] text-black border-black/10"
      )}
    >
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16">
        
        <div className="space-y-8 lg:col-span-2">
          <h2 className="font-display text-5xl md:text-7xl uppercase leading-none tracking-wider">
            Join the <br /> Experiment.
          </h2>
          <p className="font-mono text-sm uppercase tracking-widest opacity-80 max-w-md leading-relaxed">
            Subscribe to be notified of new drops, studio updates, and the results of the latest rolls.
          </p>
          
          <form className="flex flex-col sm:flex-row gap-4 max-w-md">
            <input 
              type="email" 
              placeholder="Enter your email" 
              className={cn(
                "flex-1 px-6 py-4 font-mono text-sm bg-transparent border focus:outline-none transition-colors duration-300",
                theme === 'death' 
                  ? "border-white/30 focus:border-white placeholder:text-white/50" 
                  : "border-black/30 focus:border-black placeholder:text-black/50"
              )}
            />
            <button 
              type="submit"
              className={cn(
                "px-8 py-4 font-mono text-sm uppercase tracking-widest border transition-all duration-300",
                theme === 'death'
                  ? "bg-white text-black border-white hover:bg-transparent hover:text-white"
                  : "bg-black text-white border-black hover:bg-transparent hover:text-black"
              )}
            >
              Subscribe
            </button>
          </form>
        </div>

        <div className="space-y-6 font-mono text-sm uppercase tracking-widest">
          <h3 className="font-bold opacity-50 mb-8">Navigation</h3>
          <ul className="space-y-4">
            <li><a href="#gallery" className="hover:opacity-50 transition-opacity">Gallery</a></li>
            <li><a href="#concept" className="hover:opacity-50 transition-opacity">Concept</a></li>
            <li><a href="#fate" className="hover:opacity-50 transition-opacity">The System</a></li>
            <li><a href="#about" className="hover:opacity-50 transition-opacity">About me</a></li>
          </ul>
        </div>

        <div className="space-y-6 font-mono text-sm uppercase tracking-widest">
          <h3 className="font-bold opacity-50 mb-8">Social</h3>
          <ul className="space-y-4">
            <li>
              <a 
                href="https://www.instagram.com/stories/highlights/17966166136695755/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="hover:opacity-50 transition-opacity flex items-center gap-2"
              >
                Instagram
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M7 17L17 7M17 7H7M17 7V17" />
                </svg>
              </a>
            </li>
            <li><a href="#twitter" className="hover:opacity-50 transition-opacity">Twitter</a></li>
            <li><a href="#tiktok" className="hover:opacity-50 transition-opacity">TikTok</a></li>
          </ul>
        </div>

      </div>

      <div className="max-w-7xl mx-auto mt-32 pt-8 border-t flex flex-col md:flex-row justify-between items-center gap-4 font-mono text-xs uppercase tracking-widest opacity-50">
        <p>&copy; {new Date().getFullYear()} Death or Ice Cream. All rights reserved.</p>
        <p>Chance dictates all.</p>
      </div>
    </footer>
  );
}
