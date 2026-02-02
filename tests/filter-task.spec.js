import {test, expect} from '@playwright/test';

test.describe('TodoMVC - Filter Todos Workflow', () => {
    test.beforeEach(async ({page}) => {
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

    });

    test('should display active tasks', async({page}) => {
        //Click the Active filter
        await page.getByTestId('footer-navigation').getByText('Active').click();

        //Assert only "Buy eggs" is visible
        const list = page.locator('.todo-list li');
        await expect(list).toHaveCount(1);
        await expect(list).toHaveText('Buy eggs');
    });

    test('should display completed tasks', async({page}) => {
        //click the Completed filter
        await page.getByTestId('footer-navigation').getByText('Completed').click();

        //Assert only "Buy milk" is visible
        const list = page.locator('.todo-list li');
        await expect(list).toHaveCount(1);
        await expect(list).toHaveText('Buy milk');
    });

});
