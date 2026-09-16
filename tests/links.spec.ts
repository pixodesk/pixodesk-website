import { test, expect, type Page } from '@playwright/test';

async function expectNotFound(page: Page, href: string) {
  const response = await page.goto(href);
  expect(response?.status(), `${href} returned 404`).not.toBe(404);
}

// ──────────────────────────────────────────────────────────
// STORE URLS  —  single source of truth
// Update here if a store listing URL ever changes.
// ──────────────────────────────────────────────────────────
const storeUrls = {
  animator: {
    microsoft: 'https://apps.microsoft.com/detail/9ppd94xqfpc9',
    apple: 'https://apps.apple.com/gb/app/pixodesk-animator/id1632981604',
  },
  svgEditor: {
    microsoft: 'https://apps.microsoft.com/detail/9pczdhjv026p',
    apple: 'https://apps.apple.com/gb/app/pixodesk-svg/id6476456257',
  },
};

// ──────────────────────────────────────────────────────────
// NAV MENU  (logo + 4 main items)
// ──────────────────────────────────────────────────────────
test.describe('nav menu', () => {
  const links = [
    { label: 'Pixodesk', href: '/' },
    { label: 'Lottie Animator', href: '/animator' },
    { label: 'SVG Animator', href: '/svg-animator' },
    { label: 'SVG Editor', href: '/svg-editor' },
    { label: 'Pricing', href: '/pricing' },
  ];

  for (const { label, href } of links) {
    test(`"${label}" link goes to ${href}`, async ({ page }) => {
      await page.goto('/');
      const link = page.locator(`nav a[href="${href}"]`).first();
      await expect(link).toHaveAttribute('href', href);
      await expect(link).toHaveText(label);
      await expectNotFound(page, href);
    });
  }
});

// ──────────────────────────────────────────────────────────
// NAV SUBMENUS
// ──────────────────────────────────────────────────────────
test.describe('nav submenu links', () => {
  const sections = [
    {
      section: 'Lottie Animator',
      parentHref: '/animator',
      subLinks: [
        { label: 'Lottie Animation', href: '/animator/lottie-animation' },
        { label: 'Tutorials', href: '/animator/tutorials' },
        { label: 'Features', href: '/animator/features' },
        { label: 'Preview Player', href: '/animator/player' },
        { label: 'Releases', href: '/animator/releases' },
        { label: 'Docs', href: '/docs/2d-lottie' },
        { label: 'Download', href: '/animator/download' },
      ],
    },
    {
      section: 'SVG Animator',
      parentHref: '/svg-animator',
      subLinks: [
        { label: 'Features', href: '/svg-animator/features' },
        { label: 'Preview Player', href: '/svg-animator/player' },
        { label: 'Docs', href: '/docs/svga' },
        { label: 'Download', href: '/svg-animator/download' },
      ],
    },
    {
      section: 'SVG Editor',
      parentHref: '/svg-editor',
      subLinks: [
        { label: 'Features', href: '/svg-editor/features' },
        { label: 'Releases', href: '/svg-editor/releases' },
        { label: 'Download', href: '/svg-editor/download' },
      ],
    },
  ];

  for (const { section, parentHref, subLinks } of sections) {
    test.describe(section, () => {
      for (const { label, href } of subLinks) {
        test(`"${label}" link goes to ${href}`, async ({ page }) => {
          await page.goto(parentHref);
          const link = page.locator(`nav a[href="${href}"]`).first();
          await expect(link).toHaveAttribute('href', href);
          await expect(link).toHaveText(label);
          await expectNotFound(page, href);
        });
      }
    });
  }

  // An app's Docs link is a cross-link: on a docs page the Docs submenu must still win,
  // not the app whose submenu happens to link there.
  for (const { path, docsLink } of [
    { path: '/docs/svga/format', docsLink: '/docs/svga/player-library' },
    { path: '/docs/2d-lottie', docsLink: '/docs/2d-lottie/add-lottie-animation-to-your-project' },
    { path: '/docs/svga/editor/canvas', docsLink: '/docs/svga/player-library' },
  ]) {
    test(`${path} keeps the Docs submenu`, async ({ page }) => {
      await page.goto(path);
      await expect(page.locator(`nav a[href="${docsLink}"]`).first()).toHaveCount(1);
    });
  }
});

// ──────────────────────────────────────────────────────────
// INDEX PAGE  →  3 app cards
// ──────────────────────────────────────────────────────────
test.describe('index page - app cards', () => {
  // hrefs are relative in the source ("./svg-editor" etc.)
  const cards = [
    { name: 'SVG Editor', href: './svg-editor', resolvedPath: '/svg-editor' },
    { name: 'Lottie Animator', href: './animator', resolvedPath: '/animator' },
    { name: 'SVG Animator', href: './svg-animator', resolvedPath: '/svg-animator' },
  ];

  for (const { name, href, resolvedPath } of cards) {
    test(`"${name}" card href is correct and page is not 404`, async ({ page }) => {
      await page.goto('/');
      const card = page.locator(`a.studio-card[href="${href}"]`);
      await expect(card).toHaveAttribute('href', href);
      await expectNotFound(page, resolvedPath);
    });
  }
});

// ──────────────────────────────────────────────────────────
// PRICING PAGE  →  3 download links
// ──────────────────────────────────────────────────────────
test.describe('pricing page - download buttons', () => {
  const links = [
    { name: 'SVG Editor', href: '/svg-editor/download' },
    { name: 'Lottie Animator', href: '/animator/download' },
    { name: 'SVG Animator', href: '/svg-animator/download' },
  ];

  for (const { name, href } of links) {
    test(`"${name}" button href is correct and page is not 404`, async ({ page }) => {
      await page.goto('/pricing');
      const button = page.locator(`a.button[href="${href}"]`);
      await expect(button).toHaveAttribute('href', href);
      await expectNotFound(page, href);
    });
  }
});

// ──────────────────────────────────────────────────────────
// MAIN APP PAGES  →  hero section store links (href check only)
// ──────────────────────────────────────────────────────────
test.describe('app pages - hero store button hrefs', () => {
  const pages = [
    { path: '/animator', ...storeUrls.animator },
    { path: '/svg-editor', ...storeUrls.svgEditor },
  ];

  for (const { path, microsoft, apple } of pages) {
    test(`${path} - Microsoft Store href`, async ({ page }) => {
      await page.goto(path);
      await expect(page.locator(`a[href="${microsoft}"]`).first()).toHaveAttribute('href', microsoft);
    });

    test(`${path} - Apple Store href`, async ({ page }) => {
      await page.goto(path);
      await expect(page.locator(`a[href="${apple}"]`).first()).toHaveAttribute('href', apple);
    });
  }
});

// ──────────────────────────────────────────────────────────
// DOWNLOAD PAGES  →  store links (href check only, no navigation)
// ──────────────────────────────────────────────────────────
test.describe('download pages - store button hrefs', () => {
  const pages = [
    { path: '/animator/download', ...storeUrls.animator },
    { path: '/svg-editor/download', ...storeUrls.svgEditor },
  ];

  for (const { path, microsoft, apple } of pages) {
    test(`${path} - Microsoft Store href`, async ({ page }) => {
      await page.goto(path);
      await expect(page.locator(`a[href="${microsoft}"]`)).toHaveAttribute('href', microsoft);
    });

    test(`${path} - Apple Store href`, async ({ page }) => {
      await page.goto(path);
      await expect(page.locator(`a[href="${apple}"]`)).toHaveAttribute('href', apple);
    });
  }
});
