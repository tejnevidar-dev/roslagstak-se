import { Helmet } from "react-helmet-async";

interface SEOHeadProps {
  title: string;
  description: string;
  canonical?: string;
  type?: string;
  geoPosition?: string;
  geoPlacename?: string;
}

const SEOHead = ({ title, description, canonical, type = "website", geoPosition, geoPlacename }: SEOHeadProps) => {
  const fullTitle = title.length > 55 ? title : `${title} | RoslagsTak`;
  const url = canonical || "https://roslagstak.se/";

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={url} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={url} />
      <meta property="og:type" content={type} />
      <meta property="og:locale" content="sv_SE" />
      <meta property="og:site_name" content="RoslagsTak" />
      <meta property="og:image" content="https://roslagstak.se/og-image.jpg" />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:image:alt" content={title} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content="https://roslagstak.se/og-image.jpg" />
      <link rel="alternate" hrefLang="sv" href={url} />
      <link rel="alternate" hrefLang="x-default" href={url} />
      <meta name="geo.region" content="SE-AB" />
      {geoPosition && <meta name="geo.position" content={geoPosition} />}
      {geoPosition && <meta name="ICBM" content={geoPosition.replace(";", ",")} />}
      {geoPlacename && <meta name="geo.placename" content={geoPlacename} />}
    </Helmet>
  );
};

export default SEOHead;
