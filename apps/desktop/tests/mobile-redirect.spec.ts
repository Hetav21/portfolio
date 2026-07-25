import { test, expect } from '@playwright/test';

test.use({ viewport: { width: 400, height: 800 } });

test.describe('Mobile Redirect', () => {
  test('should redirect to portfolio when loaded on mobile', async ({ page }) => {
    // Go to desktop app
    await page.goto('http://localhost:3003/');

    // In local dev, it might fail to reach the portfolio URL but the navigation happens
    await page
      .waitForURL((process.env.NEXT_PUBLIC_PORTFOLIO_URL || 'https://hetav.dev') + '/**', {
        timeout: 10000,
      })
      .catch(() => {
        // Ignore timeout, we just want to verify the URL changed
      });

    expect(page.url()).toContain(
      process.env.NEXT_PUBLIC_PORTFOLIO_URL
        ? new URL(process.env.NEXT_PUBLIC_PORTFOLIO_URL).hostname
        : 'hetav.dev'
    );
  });
});
