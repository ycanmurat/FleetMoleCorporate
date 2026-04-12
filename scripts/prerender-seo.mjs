import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { createServer } from 'vite';

const [, , mode, maybeProductSlug, maybeOutDir] = process.argv;
const scriptDir = path.dirname(fileURLToPath(import.meta.url));
const repoRoot = path.resolve(scriptDir, '..');

if (!mode || !['corporate', 'product'].includes(mode)) {
  console.error('Usage: node scripts/prerender-seo.mjs <corporate|product> [productSlug] [outDir]');
  process.exit(1);
}

if (mode === 'product' && !maybeProductSlug) {
  console.error('Product prerender requires a product slug.');
  process.exit(1);
}

const productSlug = mode === 'product' ? maybeProductSlug : null;
const outDirArg = mode === 'product' ? maybeOutDir ?? 'dist' : maybeProductSlug ?? 'dist';
const outDir = path.resolve(process.cwd(), outDirArg);

const seoTagPatterns = [
  /<title>[\s\S]*?<\/title>\s*/i,
  /<meta[^>]+name="application-name"[^>]*>\s*/gi,
  /<meta[^>]+name="description"[^>]*>\s*/gi,
  /<meta[^>]+name="robots"[^>]*>\s*/gi,
  /<meta[^>]+name="theme-color"[^>]*>\s*/gi,
  /<meta[^>]+property="og:[^"]+"[^>]*>\s*/gi,
  /<meta[^>]+name="twitter:[^"]+"[^>]*>\s*/gi,
  /<link[^>]+rel="canonical"[^>]*>\s*/gi,
  /<link[^>]+rel="alternate"[^>]*>\s*/gi,
  /<link[^>]+rel="icon"[^>]*>\s*/gi,
  /<script[^>]+type="application\/ld\+json"[^>]*>[\s\S]*?<\/script>\s*/gi,
];

const cleanSeoTags = (template) =>
  seoTagPatterns.reduce((output, pattern) => output.replace(pattern, ''), template);

const setHtmlLocale = (template, locale) =>
  template.replace(/<html([^>]*)>/i, (_, attrs) => {
    const cleanedAttrs = attrs.replace(/\s(?:lang|dir|data-locale)="[^"]*"/gi, '');
    return `<html${cleanedAttrs} lang="${locale}" dir="ltr" data-locale="${locale}">`;
  });

const injectRenderedHtml = (template, rendered) => {
  const cleanedTemplate = setHtmlLocale(cleanSeoTags(template), rendered.locale);
  const headMarkup = `    ${rendered.headHtml}\n`;
  const withHead = cleanedTemplate.includes('<!--seo-head-->')
    ? cleanedTemplate.replace('<!--seo-head-->', headMarkup.trimEnd())
    : cleanedTemplate.replace('</head>', `${headMarkup}</head>`);

  return withHead.replace(/<div id="root">[\s\S]*?<\/div>/i, `<div id="root">${rendered.appHtml}</div>`);
};

const getRouteHtmlPath = (rootDir, routePath) => {
  const normalized = routePath.replace(/^\/+/, '').replace(/\/+$/, '');
  return normalized ? path.join(rootDir, normalized, 'index.html') : path.join(rootDir, 'index.html');
};

const viteServer = await createServer({
  appType: 'custom',
  logLevel: 'error',
  root: repoRoot,
  server: {
    hmr: false,
    middlewareMode: true,
  },
});

try {
  const prerenderModule = await viteServer.ssrLoadModule('/src/seo/prerender.tsx');
  const template = await fs.readFile(path.join(outDir, 'index.html'), 'utf8');

  const routes =
    mode === 'corporate'
      ? prerenderModule.getCorporatePrerenderRoutes()
      : prerenderModule.getProductSitePrerenderRoutes(productSlug);

  for (const route of routes) {
    const rendered =
      mode === 'corporate'
        ? prerenderModule.renderCorporateRoute(route.path)
        : prerenderModule.renderProductSiteRoute(productSlug, route.path);
    const outputPath = getRouteHtmlPath(outDir, route.path);

    await fs.mkdir(path.dirname(outputPath), { recursive: true });
    await fs.writeFile(outputPath, injectRenderedHtml(template, rendered), 'utf8');
  }

  await fs.writeFile(path.join(outDir, 'sitemap.xml'), prerenderModule.buildSitemapXml(routes), 'utf8');
  await fs.writeFile(path.join(outDir, 'robots.txt'), prerenderModule.buildRobotsTxt(), 'utf8');

  console.log(
    `Prerendered ${routes.length} route(s) for ${mode === 'corporate' ? 'corporate site' : productSlug}.`,
  );
} finally {
  await viteServer.close();
}
