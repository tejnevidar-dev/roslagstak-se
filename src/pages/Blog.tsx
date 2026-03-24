import { Link } from "react-router-dom";
import { ArrowRight, Calendar, Clock } from "lucide-react";
import SEOHead from "@/components/SEOHead";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { blogPosts } from "@/data/blog-posts";

const Blog = () => {
  return (
    <>
      <SEOHead
        title="Blogg — Tips om takbyte & takrenovering i Roslagen"
        description="Artiklar och guider om takbyte, takrenovering, ROT-avdrag och takval i Roslagens skärgård. Från takläggare RoslagsTak."
        canonical="https://roslagstak.se/blogg"
      />
      <Header />
      <main className="pt-24 pb-20">
        <div className="container mx-auto px-4">
          <nav className="flex items-center gap-2 text-sm text-muted-foreground mb-8" aria-label="Breadcrumb">
            <Link to="/" className="hover:text-primary transition-colors">Startsidan</Link>
            <span>/</span>
            <span className="text-foreground font-medium">Blogg</span>
          </nav>

          <div className="max-w-3xl mx-auto text-center mb-16">
            <p className="text-primary text-sm font-semibold uppercase tracking-widest mb-3">Blogg & tips</p>
            <h1 className="font-display text-3xl md:text-4xl lg:text-5xl text-foreground mb-4">
              Allt om tak i Roslagen
            </h1>
            <p className="text-muted-foreground leading-relaxed">
              Tips, guider och nyheter om takbyte, takrenovering och takläggning i Roslagens skärgård.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {blogPosts.map((post) => (
              <Link
                key={post.slug}
                to={`/blogg/${post.slug}`}
                className="group bg-card border border-border rounded-lg overflow-hidden hover:shadow-lg hover:border-primary/30 transition-all"
              >
                <div className="p-6">
                  <div className="flex items-center gap-4 text-xs text-muted-foreground mb-3">
                    <span className="inline-flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      {new Date(post.date).toLocaleDateString("sv-SE")}
                    </span>
                    <span className="inline-flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {post.readTime}
                    </span>
                  </div>
                  <h2 className="font-display text-lg text-card-foreground mb-2 group-hover:text-primary transition-colors">
                    {post.title}
                  </h2>
                  <p className="text-muted-foreground text-sm leading-relaxed mb-4">
                    {post.excerpt}
                  </p>
                  <span className="inline-flex items-center gap-1 text-primary text-sm font-semibold group-hover:gap-2 transition-all">
                    Läs mer <ArrowRight className="w-4 h-4" />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default Blog;
