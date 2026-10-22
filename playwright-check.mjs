import { test } from '@playwright/test';

test('experience page loads', async ({ page }) => {
  page.on('console', (msg) => console.log('BROWSER_CONSOLE', msg.type(), msg.text()));
  page.on('pageerror', (err) => console.log('PAGE_ERROR', err.message));
  page.on('requestfailed', (req) => console.log('REQUEST_FAILED', req.url(), req.failure() && req.failure().errorText));
  await page.goto('http://localhost:5173/experiences', { waitUntil: 'networkidle', timeout: 30000 });
  console.log('TITLE', await page.title());
  console.log('BODY_LEN', (await page.locator('body').innerText()).length);
  await page.evaluate(() => window.scrollTo({ top: document.body.scrollHeight, behavior: 'auto' }));
  await page.waitForTimeout(2000);
  console.log('SCROLLED');
});
