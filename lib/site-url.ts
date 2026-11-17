// Set SITE_URL to the production domain to keep SEO links stable across previews.
const deploymentUrl = process.env.SITE_URL
  || process.env.CF_PAGES_URL
  || (process.env.VERCEL_PROJECT_PRODUCTION_URL ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}` : undefined)
  || (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : undefined)
  || "http://localhost:3000";

export const siteUrl = new URL(deploymentUrl);
