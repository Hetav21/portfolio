import { test, expect } from '@playwright/test';

test.describe('Portfolio E2E', () => {
  test('should load the main page and display hero section', async ({ page }) => {
    await page.goto('/');

    // Check Hero
    await expect(page.locator('h1', { hasText: 'Hetav Shah' })).toBeVisible();
    await expect(page.locator('h2', { hasText: 'Associate AI Engineer' })).toBeVisible();
  });

  test('should navigate using scrollspy header', async ({ page }) => {
    await page.goto('/');

    // Click on Experience link in header
    await page.getByRole('link', { name: 'Experience' }).click();

    // Verify experience section is visible
    await expect(page.locator('#experience')).toBeInViewport();
  });

  test('should display velite content in experience and projects', async ({ page }) => {
    await page.goto('/');

    // Check Experience content
    await expect(page.locator('h3', { hasText: 'Associate AI Engineer' })).toBeVisible();
    await expect(page.locator('h3', { hasText: 'B.Tech Computer Science' })).toBeVisible();

    // Check Projects content
    await expect(page.locator('h3', { hasText: 'QnA App' })).toBeVisible();
  });

  test('should verify external links in header', async ({ page }) => {
    await page.goto('/');
    // Blog link
    const blogLink = page.getByRole('link', { name: 'Blog' }).first();
    await expect(blogLink).toBeVisible();
    await expect(blogLink).toHaveAttribute(
      'href',
      process.env.NEXT_PUBLIC_BLOG_URL || 'https://blog.hetav.dev'
    );

    // Desktop link
    const desktopLink = page.getByRole('link', { name: 'Desktop' }).first();
    await expect(desktopLink).toBeVisible();
    await expect(desktopLink).toHaveAttribute(
      'href',
      process.env.NEXT_PUBLIC_DESKTOP_URL || 'https://desktop.hetav.dev'
    );
    await expect(desktopLink).toHaveAttribute('target', '_blank');
  });
});
