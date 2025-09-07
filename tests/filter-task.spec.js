import {test, expect} from '@playwright/test';

test('should display active tasks', async({page}) => {
    await page.goto('https://todomvc.com/examples/react/dist/');

    //Add a task
    await page.getByTestId('text-input').fill('Buy milk');
    await page.keyboard.press('Enter');

    //Add another task
    await page.getByTestId('text-input').fill('Buy eggs');
    await page.keyboard.press('Enter');

    //Mark "Buy milk" task as completed
    await page
        .getByRole('listitem')
        .filter({hasText: 'Buy milk'})
        .getByTestId('todo-item-toggle')
        .check();

    //Click the Active filter
    await page.getByTestId('footer-navigation').getByText('Active').click();

    //Assert only "Buy eggs" is visible
    await expect(page.getByTestId('todo-list')).toHaveCount(1);
    await expect(page.getByTestId('todo-list')).toHaveText(['Buy eggs']);
});