import {test, expect} from '@playwright/test';

test.describe('TodoMVC - Complete Todo Workdlow', () => {
    test.beforeEach(async ({page}) => {
        await page.goto('https://todomvc.com/examples/react/dist/');
        //Add a task
        await page.getByTestId('text-input').fill('Buy milk');
        await page.keyboard.press('Enter');
    });
    test('should complete a task', async({page}) => {
        //Mark it as completed
        const checkbox = page.getByTestId('todo-item-toggle');
        await checkbox.check()

        //Assert it is checked
        await expect(checkbox).toBeChecked();
    });
    
});

