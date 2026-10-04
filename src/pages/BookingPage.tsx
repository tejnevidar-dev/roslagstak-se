import { ArrowRight, Clock, Phone, Shield } from "lucide-react";
import { Link } from "react-router-dom";
import SEOHead from "@/components/SEOHead";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import LeadForm from "@/components/LeadForm";
import BookingWidget from "@/components/BookingWidget";
import { BOOKING_ENABLED } from "@/lib/booking";

const trust = [
  "10 års utförandegaranti",
  "30 års tätskiktsgaranti via MATAKI",
  "Fast pris, arbete enligt AMA",
  "Utan förpliktelser",
  "Svar inom 24 timmar",
  "En kontaktperson",
];

/**
 * Fristående annonssida för bokning av kostnadsfri takkontroll (noindex, som /offert/*).
 * Så länge BOOKING_ENABLED är av (väntar på att designen visas för Vidar) visas samma
 * vanliga förfrågningsformulär som på /takkontroll, så sidan fungerar och kan länkas till
 * redan nu utan att något halvfärdigt syns.
 */
const BookingPage = () => (
  <>
    <SEOHead
      title="Boka kostnadsfri takkontroll"
      description="Boka en kostnadsfri takkontroll: välj dag och tid. Vi ringer upp så snart vi kan. Fast pris, utan förpliktelser."
      canonical="https://roslagstak.se/boka-takkontroll"
      noindex
    />
    <Header />
    <main>
      <section className="border-b border-border bg-secondary" aria-labelledby="booking-heading">
        <div className="mx-auto grid max-w-7xl items-start gap-10 px-6 py-14 md:py-20 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-7">
            <p className="mb-5 text-[13px] font-bold uppercase tracking-[0.16em] text-primary">Boka takkontroll</p>
            <h1
              id="booking-heading"
              className="max-w-[20ch] font-display text-[clamp(2.1rem,4.6vw,3.5rem)] font-semibold leading-[1.07] tracking-[-0.025em] text-balance text-foreground"
            >
              Boka kostnadsfri takkontroll. <span className="italic text-accent">Välj dag, eller be oss ringa.</span>
            </h1>
            <p className="mt-6 max-w-[54ch] text-[18px] leading-relaxed text-muted-foreground">
              En av våra säljare tittar på taket på plats. Du får en rapport om takets skick, och behöver taket åtgärdas får du en offert med fast pris.
              Kostnadsfritt och utan förpliktelser. Vi svarar inom 24 timmar.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <a
                href="tel:0701543639"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-cta px-8 py-4 text-[17px] font-semibold text-cta-foreground transition-colors hover:bg-cta/90"
              >
                <Phone className="h-5 w-5" aria-hidden="true" /> Ring 070-154 36 39
              </a>
            </div>
            <ul className="mt-9 grid gap-x-6 gap-y-2.5 sm:grid-cols-2">
              {trust.map((t) => (
                <li key={t} className="flex items-start gap-2.5 text-[15px] text-foreground">
                  {t === "Utan förpliktelser" ? (
                    <Clock className="mt-0.5 h-4 w-4 shrink-0 text-accent" aria-hidden="true" />
                  ) : (
                    <Shield className="mt-0.5 h-4 w-4 shrink-0 text-accent" aria-hidden="true" />
                  )}
                  {t}
                </li>
              ))}
            </ul>
            <Link to="/takkontroll" className="mt-8 inline-flex items-center gap-1 text-sm font-semibold text-primary hover:underline">
              Läs mer om takkontrollen <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
            </Link>
          </div>
          <div className="lg:col-span-5">
            {BOOKING_ENABLED ? (
              <BookingWidget />
            ) : (
              <LeadForm source="Sida /boka-takkontroll" formName="booking" defaultTopic="Takkontroll" title="Begär kostnadsfri takkontroll" />
            )}
          </div>
        </div>
      </section>
    </main>
    <Footer />
  </>
);

export default BookingPage;
