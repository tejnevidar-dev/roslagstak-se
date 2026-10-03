import { useParams, Link } from "react-router-dom";
import { ArrowRight, Phone } from "lucide-react";
import SEOHead from "@/components/SEOHead";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Breadcrumbs from "@/components/Breadcrumbs";
import RelatedLinks from "@/components/RelatedLinks";
import NotFound from "@/pages/NotFound";
import { getProblem, SAKERHETSRUTA, type Problem } from "@/data/problems";
import { guidesForTitle } from "@/data/related-posts";
import { getProject } from "@/data/projects";

const sections: { key: keyof Problem; heading: string }[] = [
  { key: "symptom", heading: "Symptom" },
  { key: "orsaker", heading: "Vanliga orsaker" },
  { key: "akut", heading: "När är det akut?" },
  { key: "undersokning", heading: "Så undersöks det" },
  { key: "atgarder", heading: "Åtgärder som används" },
  { key: "gorInteSjalv", heading: "Gör inte själv" },
];

const ProblemPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const problem = slug ? getProblem(slug) : undefined;

  if (!problem) return <NotFound />;

  const project = problem.relatedProject ? getProject(problem.relatedProject) : undefined;

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Startsidan", item: "https://roslagstak.se/" },
      { "@type": "ListItem", position: 2, name: "Takproblem", item: "https://roslagstak.se/takproblem" },
      { "@type": "ListItem", position: 3, name: problem.title, item: `https://roslagstak.se/takproblem/${problem.slug}` },
    ],
  };
  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    /* Bara rubriker som står som frågor på sidan, med exakt samma rubrik och text (fas 2.19). */
    mainEntity: sections
      .filter((sec) => sec.heading.endsWith("?"))
      .map((sec) => ({
        "@type": "Question",
        name: sec.heading,
        acceptedAnswer: { "@type": "Answer", text: problem[sec.key] as string },
      })),
  };

  return (
    <>
      <SEOHead
        title={problem.metaTitle}
        description={problem.metaDescription}
        canonical={`https://roslagstak.se/takproblem/${problem.slug}`}
      />
      <Header />
      <main>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
        <div className="pt-24">
          <Breadcrumbs
            items={[
              { name: "Startsidan", path: "/" },
              { name: "Takproblem", path: "/takproblem" },
              { name: problem.title },
            ]}
            withSchema={false}
          />
        </div>

        <div className="mx-auto max-w-3xl px-6 pt-6 pb-16">
          <h1 className="font-display text-3xl text-foreground md:text-4xl">{problem.title}</h1>
          <p className="mt-4 text-lg leading-relaxed text-muted-foreground">{problem.intro}</p>

          <div className="mt-10 space-y-8">
            {sections.map((s) => (
              <div key={s.heading}>
                <h2 className="font-display text-xl text-foreground">{s.heading}</h2>
                <p className="mt-2 leading-relaxed text-muted-foreground">{problem[s.key] as string}</p>
              </div>
            ))}
          </div>

          <div className="mt-10 rounded-2xl border border-border bg-secondary/40 p-6">
            <p className="text-[15px] leading-relaxed text-foreground">{SAKERHETSRUTA}</p>
          </div>

          {project && (
            <div className="mt-8 rounded-2xl border border-border bg-card p-6">
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-primary">
                Exempel på ett komplett takbyte
              </p>
              <p className="mt-2 leading-relaxed text-muted-foreground">
                Vi påstår inte att det här projektet hade just det här problemet — men det visar hur ett
                komplett takbyte kan se ut: {project.material}.
              </p>
              <Link
                to={`/projekt/${project.slug}`}
                className="mt-3 inline-flex items-center gap-2 text-sm font-semibold text-primary hover:underline"
              >
                {project.title} <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
              </Link>
            </div>
          )}

          <div className="mt-8 rounded-2xl bg-primary p-8 text-center text-primary-foreground">
            <p className="leading-relaxed">
              Osäker på hur allvarligt det är? Boka en kostnadsfri takkontroll utan förpliktelser: vi går
              upp på taket, och behöver något göras får du ett fast pris. Vi svarar inom 24 timmar.
            </p>
            <div className="mt-5 flex flex-wrap justify-center gap-3">
              <Link
                to="/takkontroll"
                className="inline-flex items-center gap-2 rounded-full bg-cta px-6 py-3 text-sm font-semibold text-cta-foreground transition-colors hover:bg-cta/90"
              >
                Boka kostnadsfri takkontroll <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
              <a
                href="tel:0701543639"
                className="inline-flex items-center gap-2 rounded-full border-2 border-primary-foreground/40 px-6 py-3 text-sm font-semibold transition-colors hover:bg-primary-foreground/10"
              >
                <Phone className="h-4 w-4" aria-hidden="true" /> 070-154 36 39
              </a>
            </div>
          </div>

          <div className="mt-10 flex flex-wrap gap-3">
            {[
              ...problem.related,
              ...(problem.related.some((r) => r.to === "/tjanster/takomlaggning")
                ? []
                : [{ to: "/tjanster/takomlaggning", label: "Takbyte och takomläggning" }]),
            ].map((r) => (
              <Link
                key={r.to}
                to={r.to}
                className="inline-flex items-center gap-2 rounded-full border border-primary/25 px-5 py-2.5 text-sm font-semibold text-foreground transition-colors hover:bg-secondary"
              >
                {r.label}
              </Link>
            ))}
          </div>
        </div>

        <RelatedLinks
          currentPath={`/takproblem/${problem.slug}`}
          title="Fler takproblem"
          extraLinks={[
            { to: "/takproblem", label: "Alla takproblem", description: "Fler vanliga tecken och åtgärder." },
            ...guidesForTitle(problem.title, 2).map((g) => ({ to: `/blogg/${g.slug}`, label: g.title, description: "Guide." })),
          ]}
        />
      </main>
      <Footer />
    </>
  );
};

export default ProblemPage;
