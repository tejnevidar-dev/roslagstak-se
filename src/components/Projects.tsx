import roofProject from "@/assets/roof-project.jpg";
import heroImg from "@/assets/hero-roof.jpg";

const projects = [
  {
    img: roofProject,
    title: "Kustvillal på Ljusterö",
    description: "Komplett takomläggning med dubbelfalsat plåttak och ny takavvattning. Anpassat för havsklimat.",
  },
  {
    img: heroImg,
    title: "Skärgårdsstuga vid Singö",
    description: "Nytt TP20 plåttak med råspontbyte och gångbrygga. Transport med egen båt till ön.",
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

        <div className="grid md:grid-cols-2 gap-8">
          {projects.map((project) => (
            <article key={project.title} className="group overflow-hidden rounded-lg border border-border bg-card">
              <div className="overflow-hidden aspect-[16/10]">
                <img
                  src={project.img}
                  alt={project.title}
                  width={800}
                  height={500}
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
      </div>
    </section>
  );
};

export default Projects;