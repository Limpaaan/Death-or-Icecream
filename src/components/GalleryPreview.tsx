import { motion } from "motion/react";
import { useTheme } from "../ThemeContext";
import { cn } from "../utils";

const works = [
  { id: 1, title: "Outcome #042", type: "death", image: "/d1.png" },
  { id: 2, title: "Outcome #043", type: "icecream", image: "/I1.png" },
  { id: 3, title: "Outcome #044", type: "death", image: "/d2.png" },
  { id: 4, title: "Outcome #045", type: "icecream", image: "/i2.png" },
  { id: 5, title: "Outcome #046", type: "death", image: "/d3.png" },
  { id: 6, title: "Outcome #047", type: "icecream", image: "/i3.png" },
  { id: 7, title: "Outcome #048", type: "death", image: "/d4.png" },
  { id: 8, title: "Outcome #049", type: "icecream", image: "/i4.png" },
  { id: 9, title: "Outcome #050", type: "death", image: "/d5.png" },
  { id: 10, title: "Outcome #051", type: "icecream", image: "/i5.png" },
  { id: 11, title: "Outcome #052", type: "death", image: "/d6.png" },
  { id: 12, title: "Outcome #053", type: "icecream", image: "/i6.png" },
  { id: 13, title: "Outcome #054", type: "death", image: "/d7.png" },
];

export function GalleryPreview() {
  const { theme } = useTheme();

  const filteredWorks = works.filter(w => w.type === theme);

  return (
    <section 
      id="gallery"
      className={cn(
        "py-32 md:py-48 px-6 transition-colors duration-1000",
        theme === 'death' ? "bg-black text-white" : "bg-[#FFF5F5] text-black"
      )}
    >
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16">
          <h2 className="font-display text-6xl md:text-8xl uppercase leading-none tracking-wider mb-8 md:mb-0">
            The Outcomes
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredWorks.map((work, index) => (
            <motion.div
              key={work.id}
              layout
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group relative aspect-[4/5] overflow-hidden bg-zinc-900 cursor-pointer"
            >
              <img 
                src={work.image} 
                alt={work.title}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              
              <div className={cn(
                "absolute inset-0 flex flex-col justify-end p-6 opacity-0 group-hover:opacity-100 transition-opacity duration-500",
                work.type === 'death' ? "bg-gradient-to-t from-black/80 to-transparent" : "bg-gradient-to-t from-pink-500/80 to-transparent"
              )}>
                <h3 className="text-2xl font-bold tracking-tighter uppercase text-white mb-2">
                  {work.title}
                </h3>
                <p className="font-mono text-sm uppercase tracking-widest text-white/80">
                  {work.type === 'death' ? 'The Void' : 'The Sweetness'}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="mt-24 text-center">
          <a 
            href="https://www.instagram.com/stories/highlights/17966166136695755/"
            target="_blank"
            rel="noopener noreferrer"
            className={cn(
              "inline-block px-12 py-4 text-sm font-mono uppercase tracking-widest border transition-all duration-300",
              theme === 'death'
                ? "border-white hover:bg-white hover:text-black"
                : "border-black hover:bg-black hover:text-white"
            )}
          >
            View Full Archive on Instagram
          </a>
        </div>
      </div>
    </section>
  );
}
