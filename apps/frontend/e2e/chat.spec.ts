import { expect, test } from '@playwright/test';

test('test', async ({ context }) => {
  const userOneChat = await context.newPage();
  const userTwoChat = await context.newPage();

  await userOneChat.goto('http://localhost:5173/');
  await userTwoChat.goto('http://localhost:5173/');

  await userTwoChat
    .locator('div')
    .filter({ hasText: /^JohnSwitch to$/ })
    .getByRole('button')
    .click();

  await userOneChat
    .locator('div')
    .filter({ hasText: /^JohnMessage$/ })
    .getByRole('button')
    .click();

  await userTwoChat
    .locator('div')
    .filter({ hasText: /^AlishaMessage$/ })
    .getByRole('button')
    .click();

  await userOneChat
    .getByRole('textbox', { name: 'Message John' })
    .fill('Hello John');
  await userOneChat.getByRole('button', { name: 'Send' }).click();

  await userTwoChat
    .getByRole('textbox', { name: 'Message Alisha' })
    .fill('Hello Alisha');
  await userTwoChat.getByRole('button', { name: 'Send' }).click();

  await expect(userTwoChat.getByText('Hello John')).toBeVisible();
  await expect(userOneChat.getByText('Hello Alisha')).toBeVisible();
});
