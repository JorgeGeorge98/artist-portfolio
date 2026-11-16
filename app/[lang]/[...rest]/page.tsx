import { notFound } from "next/navigation";

// Unknown URLs resolve on the server so the 404 keeps the requested language.
export const instant = false;

export default async function MissingPage({ params }: { params: Promise<{ lang: string; rest: string[] }> }) {
  await params;
  notFound();
}
