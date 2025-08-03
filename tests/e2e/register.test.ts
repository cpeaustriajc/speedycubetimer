import { test, expect } from '@playwright/test';
import fs from 'fs/promises';

test('user can register an account', async ({ page }, testInfo) => {
    await page.goto('http://localhost:3000');
    await page.goto('http://localhost:3000/register');

    const response = await page.request.get('https://picsum.photos/200/200');
    const buffer = await response.body();
    const filePath = testInfo.outputPath('avatar.jpg');
    await fs.writeFile(filePath, buffer);

    await page.getByLabel('Email').fill(`testuser+${Date.now()}@example.com`);
    await page.getByLabel('Name').fill(`testuser_${Date.now()}`);
    await page.getByLabel('Password', { exact: true }).fill('password123');
    await page
        .getByLabel('Confirm Password', { exact: true })
        .fill('password123');
    await page.setInputFiles('input[type="file"]', filePath);
    page.getByRole('button', { name: 'Register' }).click();
    page.waitForURL('http://localhost:3000/');
    await expect(page).toHaveURL('http://localhost:3000');
});
