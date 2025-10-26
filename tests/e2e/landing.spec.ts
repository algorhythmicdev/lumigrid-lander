import { test, expect } from '@playwright/test';

test('hero renders and CTAs are visible', async ({ page }) => {
  await page.goto('/lumigrid-lander/');
  await expect(page.getByRole('heading', { name: /led node by reclame fabriek r&d/i })).toBeVisible();
  await expect(page.getByRole('link', { name: /see how it works/i })).toBeVisible();
  await expect(page.getByRole('link', { name: /examples/i }).first()).toBeVisible();
});

test('strip wall palette and speed controls update summary', async ({ page }) => {
  await page.goto('/lumigrid-lander/');
  const wallHeading = page.getByRole('heading', { name: 'LED strip wall' });
  const wallSection = wallHeading.locator('xpath=..');
  const status = wallSection.getByRole('status');
  await expect(status).toHaveText(/sunset palette • 1.3× speed/i);

  await wallSection.getByRole('button', { name: 'Calm' }).click();
  await expect(status).toHaveText(/rf palette • 0.8× speed/i);

  const speedSlider = wallSection.getByLabel('Speed');
  await speedSlider.evaluate((slider: HTMLInputElement) => {
    slider.value = '3';
    slider.dispatchEvent(new Event('input', { bubbles: true }));
  });
  await expect(status).toHaveText(/3.0× speed/i);
});

test('node toggles with keyboard', async ({ page }) => {
  await page.goto('/lumigrid-lander/#mesh');
  const node = page.locator('svg g').first();
  await node.focus();
  await page.keyboard.press('Enter');
  const stroke = await page.locator('svg g circle').first().evaluate((element) => element.getAttribute('stroke') || '');
  expect(stroke.length).toBeGreaterThan(0);
});
