import { Phone, ArrowRight } from "lucide-react";
import { useState, useEffect } from "react";

const StickyMobileCTA = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setVisible(window.scrollY > window.innerHeight * 0.8);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
      className={`fixed bottom-0 left-0 right-0 z-50 md:hidden bg-accent/95 backdrop-blur-sm border-t border-border shadow-[0_-8px_24px_-4px_hsl(var(--foreground)/0.15)] px-4 py-3 flex gap-3 transition-transform duration-500 ease-out ${
        visible ? "translate-y-0" : "translate-y-full"
      }`}
    >
      <a
        href="tel:0701543639"
        className="flex-1 flex items-center justify-center gap-2 bg-primary text-primary-foreground py-3 rounded-md text-sm font-semibold"
      >
        <Phone className="w-4 h-4" />
        Ring oss
      </a>
      <a
        href="/#offert"
        className="flex-1 flex items-center justify-center gap-2 border border-primary text-primary py-3 rounded-md text-sm font-semibold"
      >
        Få offert
        <ArrowRight className="w-4 h-4" />
      </a>
    </div>
  );
};

export default StickyMobileCTA;
