import {test, expect} from '@playwright/test';

test.describe('TodoMVC - Add Todo Workflow', () => {
    test.beforeEach(async ({page}) => {
        await page.goto('https://todomvc.com/examples/react/dist/');
    });

    test('should add a new todo', async({page}) => {
        await page.getByTestId('text-input').fill('Buy milk');
        await page.keyboard.press('Enter');
        await expect(page.locator('.todo-list li')).toHaveText(['Buy milk']);
    });

    test('should clear input after adding todo', async ({page}) => {
        await page.getByTestId('text-input').fill('Buy eggs');
        await page.keyboard.press('Enter');
        await expect(page.getByTestId('text-input')).toHaveValue(''); 
    });
});
