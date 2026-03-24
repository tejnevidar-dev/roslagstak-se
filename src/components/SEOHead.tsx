import { Helmet } from "react-helmet-async";

interface SEOHeadProps {
  title: string;
  description: string;
  canonical?: string;
  type?: string;
}

const SEOHead = ({ title, description, canonical, type = "website" }: SEOHeadProps) => {
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
    </Helmet>
  );
};

export default SEOHead;
