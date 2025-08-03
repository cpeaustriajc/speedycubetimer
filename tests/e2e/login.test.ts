import test, { expect } from '@playwright/test';

test('user can login an account', async ({ page }) => {
    await page.goto('http://localhost:3000');
    await page.goto('http://localhost:3000/login');

    await page.getByLabel('Email').fill(`testuser+1754127603408@example.com`);
    await page.getByLabel('Password', { exact: true }).fill('password123');
    page.getByRole('button', { name: 'Login' }).click();
    page.waitForURL('http://localhost:3000/');
    await expect(page).toHaveURL('http://localhost:3000');
});
