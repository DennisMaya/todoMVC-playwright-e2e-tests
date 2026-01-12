import {test, expect} from '@playwright/test';

test.describe('TodoMVC - Delete Todo Workflow', () => {
    test.beforeEach(async ({page}) => {
        await page.goto('https://todomvc.com/examples/react/dist/');
    });

    test('should delete a task', async({page}) => {
        //Add a task
        await page.getByTestId('text-input').fill('Buy milk');
        await page.keyboard.press('Enter');

        //Mark it as completed
        await page.getByTestId('todo-item-toggle').check();

        //Delete the task
        await page.getByTestId('todo-item-button').click();

        //Assert the task is deleted
        await expect(page.locator('todo-list')).toHaveCount(0);
    });

    test('should display an emtpy list after all tasks are deleted', async({page}) => {
        const tasks = ['Buy milk', 'Buy eggs', 'Buy butter'];

        //Add a tasks
        for (const task of tasks) {
            await page.locator('.new-todo').fill(task);
            await page.keyboard.press('Enter');
        }


        // Delete all tasks one by one
        const items = page.locator('.todo-list li');
        const count = await items.count();

        for (let i = 0; i < count; i++) {
            await items.nth(0).hover();  
            await items.nth(0).locator('.destroy').click();
        }

        // Assert list is empty
        await expect(page.locator('.todo-list li')).toHaveCount(0);

    });

});