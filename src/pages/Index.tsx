import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Services from "@/components/Services";
import RoofTypes from "@/components/RoofTypes";
import QuoteConfigurator from "@/components/QuoteConfigurator";
import FreeConsultation from "@/components/FreeConsultation";
import About from "@/components/About";
import Projects from "@/components/Projects";
import Testimonials from "@/components/Testimonials";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Services />
        <RoofTypes />
        <QuoteConfigurator />
        <FreeConsultation />
        <About />
        <Projects />
        <Testimonials />
        <Contact />
      </main>
      <Footer />
    </>
  );
};

export default Index;