import {test, expect} from '@playwright/test';

test.describe('TodoMVC - Edit Task Workflow', () => {
    test.beforeEach(async ({page}) => {
        await page.goto('https://todomvc.com/examples/react/dist/');
        //Add a todo item
        await page.getByTestId('text-input').fill('Buy Groceries');
        await page.keyboard.press('Enter');
        await expect(page.getByTestId('todo-list')).toHaveText(['Buy Groceries']);

    });
    test('User can edit a todo', async({page}) => {
        // const list = page.getByTestId('todo-list');
        // const todoItem = await list.getByTestId('todo-item');
        // await todoItem.dblclick();

        const todoItem = await page.locator('.todo-list li');
        await todoItem.getByText("Buy Groceries").dblclick();
        await todoItem.getByTestId('text-input').fill("Buy milk");
        await page.keyboard.press('Enter');
        await expect(todoItem).toHaveText(['Buy milk']);

    });
});