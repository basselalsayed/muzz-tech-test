import { expect, test } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('http://localhost:5173/');
  await expect(page.getByRole('img', { name: 'Logo' })).toBeVisible();
  await expect(page.getByRole('heading', { name: 'Muzz' })).toBeVisible();
  await expect(page.getByText('Connect and chat with your')).toBeVisible();
  await expect(
    page
      .locator('div')
      .filter({ hasText: /^AlishaCurrently logged in as$/ })
      .first()
  ).toBeVisible();
  await expect(
    page.getByRole('heading', { name: 'Select Current User' })
  ).toBeVisible();
  await expect(
    page.getByRole('heading', { name: 'Message Someone' })
  ).toBeVisible();
  await page
    .locator('div')
    .filter({ hasText: /^JohnMessage$/ })
    .getByRole('button')
    .click();
  await expect(
    page
      .locator('div')
      .filter({ hasText: /^John$/ })
      .nth(1)
  ).toBeVisible();
  await expect(page.getByText('Chat', { exact: true })).toBeVisible();
  await expect(page.getByText('Profile')).toBeVisible();
  await expect(page.getByText('Jan 15, 2025 11:45 AM')).toBeVisible();
  await page.getByText('Profile').click();
  await expect(page.getByText('This tab is a placeholder -')).toBeVisible();
});
