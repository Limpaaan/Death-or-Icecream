/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from "react";
import { ThemeProvider } from "./ThemeContext";
import { Intro } from "./components/Intro";
import { Navigation } from "./components/Navigation";
import { Hero } from "./components/Hero";
import { Concept } from "./components/Concept";
import { GalleryPreview } from "./components/GalleryPreview";
import { About } from "./components/About";
import { InteractiveElement } from "./components/InteractiveElement";
import { Footer } from "./components/Footer";
import { PaintingCounter } from "./components/PaintingCounter";
import { AnimatePresence } from "motion/react";

export default function App() {
  const [introComplete, setIntroComplete] = useState(false);
  const [initialTheme, setInitialTheme] = useState<'death' | 'icecream'>('death');

  const handleIntroComplete = (result: 'death' | 'icecream') => {
    setInitialTheme(result);
    setIntroComplete(true);
  };

  return (
    <ThemeProvider initialTheme={initialTheme}>
      <AnimatePresence mode="wait">
        {!introComplete ? (
          <Intro key="intro" onComplete={handleIntroComplete} />
        ) : (
          <div key="main" className="min-h-screen font-sans selection:bg-pink-500 selection:text-white">
            <Navigation />
            <PaintingCounter />
            <main>
              <Hero />
              <Concept />
              <InteractiveElement />
              <GalleryPreview />
              <About />
            </main>
            <Footer />
          </div>
        )}
      </AnimatePresence>
    </ThemeProvider>
  );
}
