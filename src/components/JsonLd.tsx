import { Helmet } from "react-helmet-async";

interface JsonLdProps {
  /** Ett schema-objekt eller en lista med scheman som skrivs till <head>. */
  data: Record<string, unknown> | Record<string, unknown>[];
}

/** Renderar JSON-LD i <head> via Helmet så att crawlers hittar det direkt. */
const JsonLd = ({ data }: JsonLdProps) => {
  const items = Array.isArray(data) ? data : [data];
  return (
    <Helmet>
      {items.map((item, i) => (
        <script key={i} type="application/ld+json">
          {JSON.stringify(item)}
        </script>
      ))}
    </Helmet>
  );
};

export default JsonLd;
