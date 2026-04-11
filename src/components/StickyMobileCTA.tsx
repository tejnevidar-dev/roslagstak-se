import { Phone, ArrowRight } from "lucide-react";

const StickyMobileCTA = () => {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 md:hidden bg-accent/95 backdrop-blur-sm border-t border-border px-4 py-3 flex gap-3">
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
