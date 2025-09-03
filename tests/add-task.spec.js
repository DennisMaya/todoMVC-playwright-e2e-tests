import {test, expect} from '@playwright/test';
const { expectTextMatch } = require('../utils/expectTextMatch');
const fs = require('fs');
const path = require('path');
const decodeEntities = str =>
  str
    .replace(/&quot;/g, '"')
    .replace(/&amp;/g, '&')
    .replace(/&#x2F;/g, '/')
    .replace(/&#x27;/g, "'")
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>');

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

        //Adds 3 todos
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
        //Check that white space is trimmed from text input
        await page.getByTestId('text-input').fill(' walk the dog ');
        await page.keyboard.press('Enter');
        await expect(page.locator('.todo-list li')).toHaveText(['walk the dog']);
    });

    test('should not add a todo for an empty string', async ({page}) => {
        //Check that an empty string todo cannot be added
       await page.getByTestId('text-input').fill('');
       await page.keyboard.press('Enter');
       await expect(page.locator('.todo-list li')).toHaveCount(0);
    });

    test('should not add a todo of white space', async ({page}) => {
        //Check that a todo of whites pace cannot be added
        await page.getByTestId('text-input').fill('    ');
        await page.keyboard.press('Enter');
        await expect(page.locator('.todo-list li')).toHaveCount(0);
    });

    test('should add a todo with a long text input', async ({page}) =>{
        const longText = "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo. Nullam dictum felis eu pede mollis pretium. Integer tincidunt. Cras dapibus. Vivamus elementum semper nisi. Aenean vulputate eleifend tellus. Aenean leo ligula, porttitor eu, consequat vitae, eleifend ac, enim. Aliquam lorem ante, dapibus in, viverra quis, feugiat a, tellus. Phasellus viverra nulla ut metus varius laoreet. Quisque rutrum. Aenean imperdiet. Etiam ultricies nisi vel augue. Curabitur ullamcorper ultricies nisi. Nam eget dui. Etiam rhoncus. Maecenas tempus, tellus eget condimentum rhoncus, sem quam semper libero, sit amet adipiscing sem neque sed ipsum. Nam quam nunc, blandit vel, luctus pulvinar, hendrerit id, lorem. Maecenas nec odio et ante tincidunt tempus. Donec vitae sapien ut libero venenatis faucibus. Nullam quis ante. Etiam sit amet orci eget eros faucibus tincidunt. Duis leo. Sed fringilla mauris sit amet nibh. Donec sodales sagittis magna. Sed consequat, leo eget bibendum sodales, augue velit cursus nunc,";
        await page.getByTestId('text-input').fill(longText);
        await page.keyboard.press('Enter');
        await expect(page.locator('.todo-list li')).toHaveText([longText]);
    });

    test('should add a todo with special characters', async ({page}) =>{
        const filePath = path.resolve(__dirname, '../utils/special-text.txt')
        const fileContent = fs.readFileSync(filePath, 'utf-8')
        await page.getByTestId('text-input').fill(fileContent);
        await page.keyboard.press('Enter');
        const actualText = await page.locator('.todo-list li').first().innerText();
        expect(decodeEntities(actualText.trim())).toBe(fileContent.trim());
    });
});
