import {test, expect} from '@playwright/test';

test('should complete a task', async({page}) => {
    await page.goto('https://todomvc.com/examples/react/dist/');

    //Add a task
    await page.getByTestId('text-input').fill('Buy milk');
    await page.keyboard.press('Enter');

    //Mark it as completed
    const checkbox = page.getByTestId('todo-item-toggle');
    await checkbox.check()

    //Assert it is checked
    await expect(checkbox).toBeChecked();
});