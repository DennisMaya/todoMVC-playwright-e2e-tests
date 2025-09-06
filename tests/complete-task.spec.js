import {test, expect} from '@playwright/test';

test.describe('TodoMVC - Complete Todo Workflow', () => {
    test.beforeEach(async ({page}) => {
        await page.goto('https://todomvc.com/examples/react/dist/');
        //Add a task
        await page.getByTestId('text-input').fill('Task 1');
        await page.keyboard.press('Enter');
    });
    test('should mark a task as completed', async({page}) => {
        //Mark it as completed
        const checkbox = page.getByTestId('todo-item-toggle');
        await checkbox.check();

        //Assert it is checked
        await expect(checkbox).toBeChecked();
    });

    test('should untoggle a completed task', async({page}) => {
        const checkbox = page.getByTestId('todo-item-toggle');
        await checkbox.check();

        // Uncheck the checkbox
        await checkbox.uncheck();

        // Assert that the checkbox is now unchecked
        await expect(checkbox).not.toBeChecked();
    });

    test('should mark multiple tasks as completed', async({page}) => {
        const todos = ['Task 2', 'Task 3', 'Task 4'];

        for (const todo of todos){
            await page.getByTestId('text-input').fill(todo);
            await page.keyboard.press('Enter');
        }
        
        const checkboxes = page.locator('.todo-list li input[type="checkbox"]');
        const count = await checkboxes.count();

        for (let i = 0; i < count; i++){
            await checkboxes.nth(i).check();
        }

        for (let i = 0; i < count; i++){
            await expect(checkboxes.nth(i)).toBeChecked();
        }

    });

    test('should clear completed tasks', async({page}) => {
        const todos = ['Task 2', 'Task 3', 'Task 4'];

        for (const todo of todos){
            await page.getByTestId('text-input').fill(todo);
            await page.keyboard.press('Enter');
        }
        
        const checkboxes = page.locator('.todo-list li input[type="checkbox"]');
        const count = await checkboxes.count();

        for (let i = 0; i < count; i++){
            await checkboxes.nth(i).check();
        }

        const clearCompleted = await page.getByRole('button', {name: 'Clear completed'});
        await clearCompleted.click();

        const todoItems = page.locator('.todo-list li');
        await expect(todoItems).toHaveCount(0);

    });

    test('should only clear completed tasks', async({page}) => {
        const todos = ['Task 2', 'Task 3', 'Task 4'];

        for (const todo of todos){
            await page.getByTestId('text-input').fill(todo);
            await page.keyboard.press('Enter');
        }
        
        const checkboxes = page.locator('.todo-list li input[type="checkbox"]');
        const count = await checkboxes.count();

        for (let i = 0; i < count; i++){
            if ((i + 1) % 2 === 0) {
                await checkboxes.nth(i).check();
            }
        }

        const clearCompleted = await page.getByRole('button', {name: 'Clear completed'});
        await clearCompleted.click();

        const todoItems = page.locator('.todo-list li');
        await expect(todoItems).toHaveCount(Math.ceil(todos.length / 2));
    });

    test('should update items left counter', async({page}) => {
        const todos = ['Task 2', 'Task 3', 'Task 4'];

        for (const todo of todos){
            await page.getByTestId('text-input').fill(todo);
            await page.keyboard.press('Enter');
        }
        
        const counter = page.locator('.todo-count');
        const checkboxes = page.locator('.todo-list li input[type="checkbox"]');
        const count = await checkboxes.count();

        await expect(counter).toHaveText(`${count} items left!`);

        for (let i = 0; i < count; i++){
            await checkboxes.nth(i).check();
            const remaining = count - (i + 1);
            const label = remaining === 1 ? 'item' : 'items';
            await expect(counter).toHaveText(`${remaining} ${label} left!`);
        }
    });
});

