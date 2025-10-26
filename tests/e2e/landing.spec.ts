import { test, expect } from '@playwright/test';

test('hero renders and CTAs are visible', async ({ page }) => {
  await page.goto('/lumigrid-lander/');
  await expect(page.getByRole('heading', { name: /light that tells/i })).toBeVisible();
  await expect(page.getByRole('link', { name: /see how/i })).toBeVisible();
  await expect(page.getByRole('link', { name: /try led control/i })).toBeVisible();
});

test('effect editor updates LED speed and node pulse', async ({ page }) => {
  await page.goto('/lumigrid-lander/#editor');
  const slider = page.locator('#editor input[type="range"]').first();
  const strip = page.locator('#demo .strip').first().locator('i');
  const before = await strip.evaluate((element) => getComputedStyle(element).getPropertyValue('animation-duration'));
  await slider.focus();
  await slider.press('End');
  await expect
    .poll(async () => strip.evaluate((element) => getComputedStyle(element).getPropertyValue('animation-duration')))
    .not.toBe(before);
});

test('node toggles with keyboard', async ({ page }) => {
  await page.goto('/lumigrid-lander/#mesh');
  const node = page.locator('svg g').first();
  await node.focus();
  await page.keyboard.press('Enter');
  const stroke = await page.locator('svg g circle').first().evaluate((element) => element.getAttribute('stroke') || '');
  expect(stroke.length).toBeGreaterThan(0);
});
