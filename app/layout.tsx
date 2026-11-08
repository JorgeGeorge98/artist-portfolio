import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Daniela Salem — Contemporary Painting",
  description: "Explore the paintings of Daniela Salem: a world of expressive colour, intuitive gestures, and unexpected ways of seeing.",
  openGraph: {
    title: "Daniela Salem — Between feeling & colour",
    description: "Discover selected paintings by contemporary artist Daniela Salem.",
    type: "website",
    locale: "en_US",
  },
  icons: { icon: "/icon.svg" },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className="antialiased"
    >
      <body>{children}</body>
    </html>
  );
}
