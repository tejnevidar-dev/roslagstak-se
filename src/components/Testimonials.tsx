import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import Reveal from "@/components/Reveal";
import SectionHeading from "@/components/SectionHeading";
import GoogleReviews from "@/components/GoogleReviews";

const Testimonials = () => {
  return (
    <section className="border-b border-border bg-secondary py-24 md:py-36" aria-labelledby="testimonials-heading">
      <div className="mx-auto max-w-7xl px-6">
        <SectionHeading
          meta="Omdömen"
          index="03 / 04"
          id="testimonials-heading"
          title="Läs vad kunderna skriver — direkt på Google"
          className="mb-12"
        />

        <Reveal>
          <GoogleReviews
            title="Riktiga omdömen, i original"
            intro="Vi lägger inga egenskrivna omdömen på sajten. Alla recensioner finns publikt på vår Google-företagsprofil, med namn och datum, så att du kan bedöma dem själv."
          />
        </Reveal>

        <div className="mt-10">
          <Link
            to="/recensioner"
            className="inline-flex items-center gap-2 text-sm font-semibold text-foreground hover:text-primary"
          >
            Mer om hur vi jobbar med omdömen <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
