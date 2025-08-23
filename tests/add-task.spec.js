import {test, expect} from '@playwright/test';

test('should add a new todo', async({page}) => {
    await page.goto('https://todomvc.com/examples/react/dist/');
    await page.getByTestId('text-input').fill('Buy milk');
    await page.keyboard.press('Enter');
    await expect(page.locator('.todo-list li')).toHaveText(['Buy milk']);
});