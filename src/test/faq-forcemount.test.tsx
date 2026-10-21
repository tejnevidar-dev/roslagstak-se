/**
 * Gren 174 (F1, seo-analys-2026-10-21/1-teknik-i-koden.md): svaren i stängda frågor ligger kvar i den renderade DOM:en (Radix forceMount), och stängda frågor döljs med CSS.
 * Före: Radix ritade inga barn i en stängd fråga, så den renderade sidan hade frågorna men inga svar, medan FAQPage-schemat beskrev svaren.
 */
import { describe, expect, it } from "vitest";
import { render, fireEvent } from "@testing-library/react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import FaqSection from "@/components/FaqSection";

describe("FAQ: svaren finns i DOM:en även när frågan är stängd", () => {
  it("Accordion: svaret är i DOM:en med data-state=closed och CSS-klassen som döljer det", () => {
    const { container } = render(
      <Accordion type="single" collapsible>
        <AccordionItem value="a">
          <AccordionTrigger>Hur lång tid tar det?</AccordionTrigger>
          <AccordionContent>Svaret ligger i DOM:en.</AccordionContent>
        </AccordionItem>
      </Accordion>,
    );
    expect(container.textContent).toContain("Svaret ligger i DOM:en.");
    const innehall = container.querySelector('[role="region"]')!;
    expect(innehall.getAttribute("data-state")).toBe("closed");
    expect(innehall.className).toContain("data-[state=closed]:hidden");
  });

  it("FaqSection: alla svar finns i DOM:en före första klicket, och frågan öppnas som förut", () => {
    const faqs = [
      { question: "Vad kostar det?", answer: "Priset beror på taket." },
      { question: "Hur bokar jag?", answer: "Ring eller fyll i formuläret." },
    ];
    const { container, getByText } = render(<FaqSection title="Frågor" faqs={faqs} path="/test" />);
    for (const f of faqs) {
      expect(container.textContent).toContain(f.question);
      expect(container.textContent).toContain(f.answer);
    }
    fireEvent.click(getByText("Vad kostar det?"));
    const regioner = [...container.querySelectorAll('[role="region"]')];
    expect(regioner[0].getAttribute("data-state")).toBe("open");
    expect(regioner[1].getAttribute("data-state")).toBe("closed");
  });
});
