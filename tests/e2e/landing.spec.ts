import { test, expect } from '@playwright/test';

test('hero renders and CTAs are visible', async ({ page }) => {
  await page.goto('/');
  await expect(page.getByRole('heading', { name: /led node/i })).toBeVisible();
  await expect(page.getByRole('link', { name: /see examples/i })).toBeVisible();
  await expect(page.getByRole('link', { name: /talk to us/i })).toBeVisible();
});

test('feature grid shows all sections', async ({ page }) => {
  await page.goto('/');
  await expect(page.getByRole('heading', { name: /what led node does/i })).toBeVisible();
  await expect(page.getByRole('heading', { name: /simple control/i })).toBeVisible();
  await expect(page.getByRole('heading', { name: /plan the day/i })).toBeVisible();
  await expect(page.getByRole('heading', { name: /runs together/i })).toBeVisible();
  await expect(page.getByRole('heading', { name: /works anywhere/i })).toBeVisible();
});

test('process steps are numbered and visible', async ({ page }) => {
  await page.goto('/');
  await expect(page.getByRole('heading', { name: /how it works/i })).toBeVisible();
  await expect(page.getByText(/brief/i)).toBeVisible();
  await expect(page.getByText(/plan/i)).toBeVisible();
  await expect(page.getByText(/install/i)).toBeVisible();
  await expect(page.getByText(/support/i)).toBeVisible();
});
