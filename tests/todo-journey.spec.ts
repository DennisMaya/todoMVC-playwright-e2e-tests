import {test, expect} from '@playwright/test';

test.describe('TodoMVC - Complete User Journey Workflow', () => {
    test.beforeEach(async ({page}) => {
        await page.goto('https://todomvc.com/examples/react/dist/');

    });
    test('User can add, complete, and delete a todo', async({page}) => {
        //Add a todo item
        await page.getByTestId('text-input').fill('Buy Groceries');
        await page.keyboard.press('Enter');
        await expect(page.getByTestId('todo-list')).toHaveText(['Buy Groceries']);

        //Mark the todo item as completed
        const todoItem = page.getByTestId('todo-list')
            .getByTestId('todo-item')
            .filter({ hasText: 'Buy Groceries' });    
        const checkbox = todoItem.getByTestId('todo-item-toggle');
        checkbox.check()
        await expect(checkbox).toBeChecked();
        
        //Delete the completed todo item
        await todoItem.hover();
        await todoItem.getByTestId('todo-item-button').click();
        await expect(page.locator('.todo-list li')).toHaveCount(0);

    });
});