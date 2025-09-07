import {test, expect} from '@playwright/test';

test('should delete a task', async({page}) => {
    await page.goto('https://todomvc.com/examples/react/dist/');

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