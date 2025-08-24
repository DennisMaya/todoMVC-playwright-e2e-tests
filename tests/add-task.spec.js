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

    test('should add 3 new todos in order', async({page}) => {
        const todos = ['Task 1', 'Task 2', 'Task3']

        for (const todo of todos){
            await page.getByTestId('text-input').fill(todo);
            await page.keyboard.press('Enter');
        }
        //Check that there are exactly 3 todos
        const todoItems = page.locator('.todo-list li');
        await expect(todoItems).toHaveCount(3);

        //Check that the todos text matches in the same order
        const texts = await todoItems.allTextContents();
        expect(texts).toEqual(todos);
    });

    test('should trim white space from text input after adding todo', async ({page}) => {
        await page.getByTestId('text-input').fill(' walk the dog ');
        await page.keyboard.press('Enter');
        await expect(page.locator('.todo-list li')).toHaveText(['walk the dog']);
    });

    test('should not add a todo for an empty string', async ({page}) => {
       await page.getByTestId('text-input') .fill('');
       await page.keyboard.press('Enter');
       await expect(page.locator('.todo-list li')).toHaveCount(0);
    });
});
