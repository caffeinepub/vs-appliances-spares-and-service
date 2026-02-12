import { readFileSync, writeFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Read the site URL from environment variable
const siteUrl = process.env.VITE_SITE_URL;

if (!siteUrl) {
  console.error('\n❌ ERROR: VITE_SITE_URL environment variable is required for sitemap generation.');
  console.error('Please set VITE_SITE_URL to your deployed site URL (e.g., https://your-canister-id.ic0.app)');
  console.error('Example: VITE_SITE_URL=https://your-canister-id.ic0.app npm run build\n');
  process.exit(1);
}

// Validate URL format
try {
  new URL(siteUrl);
} catch (error) {
  console.error('\n❌ ERROR: VITE_SITE_URL must be a valid URL.');
  console.error(`Received: ${siteUrl}`);
  console.error('Example: https://your-canister-id.ic0.app\n');
  process.exit(1);
}

// Remove trailing slash if present
const cleanSiteUrl = siteUrl.replace(/\/$/, '');

// Read the template
const templatePath = join(__dirname, '../public/sitemap.template.xml');
const outputPath = join(__dirname, '../public/sitemap.xml');

try {
  const template = readFileSync(templatePath, 'utf-8');
  
  // Replace the placeholder with the actual site URL
  const sitemap = template.replace(/\{\{SITE_URL\}\}/g, cleanSiteUrl);
  
  // Write the generated sitemap
  writeFileSync(outputPath, sitemap, 'utf-8');
  
  console.log(`✅ Sitemap generated successfully at ${outputPath}`);
  console.log(`   Base URL: ${cleanSiteUrl}`);
} catch (error) {
  console.error('\n❌ ERROR: Failed to generate sitemap');
  console.error(error.message);
  process.exit(1);
}
