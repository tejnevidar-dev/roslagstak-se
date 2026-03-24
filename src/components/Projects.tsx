import { Star, ExternalLink } from "lucide-react";
import projectCottage from "@/assets/project-coastal-cottage.jpg";
import projectVilla from "@/assets/project-villa-copper.jpg";
import projectIsland from "@/assets/project-island-cabin.jpg";

const projects = [
  {
    img: projectCottage,
    title: "Skärgårdsstuga, Blidö",
    description: "Komplett takomläggning från gammalt papptak till nytt TP20 plåttak i grafitgrå. Inklusive råspontbyte och ny takavvattning.",
  },
  {
    img: projectVilla,
    title: "Kustvillal i Norrtälje",
    description: "Dubbelfalsat kopparplåttak med ny takkupa och komplett avvattningssystem. Bandtäckning för maximal täthet och livslängd.",
  },
  {
    img: projectIsland,
    title: "Sjöbod på Arholma",
    description: "Nytt plåttak på sjöbod i ytterskärgården. Transport av material med båt. Aluminiumplåt vald för bästa korrosionsbeständighet.",
  },
];

const Projects = () => {
  return (
    <section id="projekt" className="py-20 md:py-28 bg-background" aria-labelledby="projects-heading">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto text-center mb-16">
          <p className="text-primary text-sm font-semibold uppercase tracking-widest mb-3">Våra projekt</p>
          <h2 id="projects-heading" className="font-display text-3xl md:text-4xl text-foreground mb-4">
            Takprojekt längs Roslagens kust
          </h2>
          <p className="text-muted-foreground leading-relaxed">
            Från öar i ytterskärgården till kuststäder — här ser du ett urval av våra senaste projekt.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {projects.map((project) => (
            <article key={project.title} className="group overflow-hidden rounded-lg border border-border bg-card">
              <div className="overflow-hidden aspect-[16/10]">
                <img
                  src={project.img}
                  alt={project.title}
                  width={1024}
                  height={640}
                  loading="lazy"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="p-6">
                <h3 className="font-display text-xl text-card-foreground mb-2">{project.title}</h3>
                <p className="text-muted-foreground text-sm">{project.description}</p>
              </div>
            </article>
          ))}
        </div>

        {/* Google Reviews CTA */}
        <div className="mt-16 max-w-2xl mx-auto">
          <a
            href="https://share.google/FsdpfTq9H3amLoTPe"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-between gap-4 bg-card border border-border rounded-lg p-6 hover:border-primary/40 hover:shadow-lg transition-all group"
          >
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                <Star className="w-6 h-6 text-primary fill-primary" />
              </div>
              <div>
                <p className="font-display text-lg text-card-foreground">Läs våra Google-recensioner</p>
                <p className="text-muted-foreground text-sm mt-0.5">
                  Se vad våra kunder skriver om oss på Google.
                </p>
              </div>
            </div>
            <ExternalLink className="w-5 h-5 text-primary flex-shrink-0 group-hover:translate-x-1 transition-transform" />
          </a>
        </div>
      </div>
    </section>
  );
};

export default Projects;
