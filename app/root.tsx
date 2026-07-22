import {
  isRouteErrorResponse,
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "react-router";

import type { Route } from "./+types/root";
import {
  DEFAULT_DESCRIPTION,
  DEFAULT_TITLE,
  OG_IMAGE,
  SITE_NAME,
  SITE_URL,
  organizationJsonLd,
  websiteJsonLd,
} from "~/lib/seo";
import "./app.css";

export const links: Route.LinksFunction = () => [
  { rel: "canonical", href: SITE_URL },
  { rel: "icon", href: "/favicon.svg", type: "image/svg+xml" },
  { rel: "apple-touch-icon", href: "/apple-touch-icon.png" },
  { rel: "preconnect", href: "https://fonts.googleapis.com" },
  {
    rel: "preconnect",
    href: "https://fonts.gstatic.com",
    crossOrigin: "anonymous",
  },
  {
    rel: "stylesheet",
    href: "https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&display=swap",
  },
];

export const meta: Route.MetaFunction = () => [
  { title: DEFAULT_TITLE },
  { name: "description", content: DEFAULT_DESCRIPTION },
  { name: "theme-color", content: "#f7f3ec" },
  { name: "robots", content: "index, follow, max-image-preview:large" },
  { name: "author", content: SITE_NAME },
  {
    name: "keywords",
    content:
      "Billion Animal Study, animal medical records, veterinary medicine, One Health, zoonotic disease, OpenAnimal, OpenVet, animal health data",
  },
  { property: "og:type", content: "website" },
  { property: "og:site_name", content: SITE_NAME },
  { property: "og:locale", content: "en_US" },
  { property: "og:url", content: SITE_URL },
  { property: "og:title", content: DEFAULT_TITLE },
  { property: "og:description", content: DEFAULT_DESCRIPTION },
  { property: "og:image", content: OG_IMAGE },
  { property: "og:image:width", content: "1200" },
  { property: "og:image:height", content: "630" },
  { property: "og:image:alt", content: "The Billion Animal Study" },
  { name: "twitter:card", content: "summary_large_image" },
  { name: "twitter:title", content: DEFAULT_TITLE },
  { name: "twitter:description", content: DEFAULT_DESCRIPTION },
  { name: "twitter:image", content: OG_IMAGE },
];

export function Layout({ children }: { children: React.ReactNode }) {
  const jsonLd = [organizationJsonLd(), websiteJsonLd()];

  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, viewport-fit=cover"
        />
        <Meta />
        <Links />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="antialiased">
        {children}
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export default function App() {
  return <Outlet />;
}

export function ErrorBoundary({ error }: Route.ErrorBoundaryProps) {
  let message = "Something went wrong";
  let details = "An unexpected error occurred.";

  if (isRouteErrorResponse(error)) {
    message = error.status === 404 ? "Page not found" : `Error ${error.status}`;
    details =
      error.status === 404
        ? "That page does not exist on the Billion Animal Study site."
        : error.statusText || details;
  } else if (import.meta.env.DEV && error instanceof Error) {
    details = error.message;
  }

  return (
    <main
      style={{
        minHeight: "100vh",
        display: "grid",
        placeItems: "center",
        padding: 32,
        background: "#f7f3ec",
        color: "#0b1f3a",
        fontFamily: '"Space Grotesk", sans-serif',
        textAlign: "center",
      }}
    >
      <div>
        <p
          style={{
            fontSize: 12,
            fontWeight: 900,
            letterSpacing: "0.18em",
            textTransform: "uppercase",
            color: "#3f5d78",
            marginBottom: 16,
          }}
        >
          Billion Animal Study
        </p>
        <h1
          style={{
            fontSize: "clamp(32px, 6vw, 56px)",
            fontWeight: 900,
            textTransform: "uppercase",
            letterSpacing: "-0.02em",
            marginBottom: 16,
          }}
        >
          {message}
        </h1>
        <p style={{ color: "#3f5d78", marginBottom: 28, maxWidth: 420 }}>
          {details}
        </p>
        <a
          href="/"
          style={{
            color: "#0057ff",
            fontWeight: 900,
            letterSpacing: "0.1em",
            textTransform: "uppercase",
            textDecoration: "none",
            fontSize: 13,
          }}
        >
          Back to home →
        </a>
      </div>
    </main>
  );
}
