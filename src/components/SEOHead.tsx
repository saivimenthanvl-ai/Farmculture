import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";

export interface SEOProps {
  title?: string;
  description?: string;
  canonicalPath?: string;
  ogType?: "website" | "article";
}

const DEFAULT_TITLE = "Farmculture AI — Enterprise Agricultural Intelligence Platform";
const DEFAULT_DESCRIPTION = "Farmculture AI provides verifiable agricultural intelligence, APMC mandi rates, foliar diagnostic assistance, and localized weather telemetry for farmers and agribusinesses.";
const CANONICAL_ORIGIN = "https://farmculture.ai";

export const SEOHead: React.FC<SEOProps> = ({
  title,
  description = DEFAULT_DESCRIPTION,
  canonicalPath,
  ogType = "website",
}) => {
  const location = useLocation();
  const activePath = canonicalPath || location.pathname;
  const fullTitle = title ? `${title} | Farmculture AI` : DEFAULT_TITLE;
  const canonicalUrl = `${CANONICAL_ORIGIN}${activePath}`;

  useEffect(() => {
    // 1. Update Document Title
    document.title = fullTitle;

    // 2. Helper to set or create meta tag
    const setMetaTag = (attrName: string, attrVal: string, content: string) => {
      let tag = document.querySelector(`meta[${attrName}="${attrVal}"]`);
      if (!tag) {
        tag = document.createElement("meta");
        tag.setAttribute(attrName, attrVal);
        document.head.appendChild(tag);
      }
      tag.setAttribute("content", content);
    };

    // 3. Helper to set or create link tag
    const setLinkTag = (rel: string, href: string) => {
      let link = document.querySelector(`link[rel="${rel}"]`) as HTMLLinkElement | null;
      if (!link) {
        link = document.createElement("link");
        link.setAttribute("rel", rel);
        document.head.appendChild(link);
      }
      link.setAttribute("href", href);
    };

    // Standard SEO Tags
    setMetaTag("name", "description", description);
    setLinkTag("canonical", canonicalUrl);

    // Open Graph Tags
    setMetaTag("property", "og:title", fullTitle);
    setMetaTag("property", "og:description", description);
    setMetaTag("property", "og:url", canonicalUrl);
    setMetaTag("property", "og:type", ogType);
    setMetaTag("property", "og:site_name", "Farmculture AI");
    setMetaTag("property", "og:image", `${CANONICAL_ORIGIN}/farmculture.svg`);

    // Twitter / X Cards
    setMetaTag("name", "twitter:card", "summary_large_image");
    setMetaTag("name", "twitter:title", fullTitle);
    setMetaTag("name", "twitter:description", description);
    setMetaTag("name", "twitter:image", `${CANONICAL_ORIGIN}/farmculture.svg`);

    // Clean up or restore defaults on unmount
    return () => {
      document.title = DEFAULT_TITLE;
    };
  }, [fullTitle, description, canonicalUrl, ogType]);

  return null;
};

export default SEOHead;
