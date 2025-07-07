import { type BrowserContext, type Page, expect, test } from '@playwright/test';

test('chat between users', async ({ context }) => {
  const [userOneChat, userTwoChat] = await setupTwoUsers(context);

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

test('typing indicator test', async ({ context }) => {
  const [userOneChat, userTwoChat] = await setupTwoUsers(context);

  const textbox = userOneChat.getByRole('textbox', { name: 'Message John' });
  await textbox.click();

  const longMessage =
    'This is a very long message that should trigger the typing indicator. '.repeat(
      3
    );

  await textbox.pressSequentially(longMessage, { delay: 100 });

  await expect(userTwoChat.getByText('Alisha is typing...')).toBeVisible();

  await expect(userTwoChat.getByText('Alisha is typing...')).not.toBeVisible();
});

async function setupTwoUsers(context: BrowserContext): Promise<[Page, Page]> {
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

  return [userOneChat, userTwoChat];
}
