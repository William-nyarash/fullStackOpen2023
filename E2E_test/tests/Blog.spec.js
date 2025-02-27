const { test, describe, expect, beforeEach } = require('@playwright/test')

describe('Blog app', () => {
  beforeEach(async ({ page, request }) => {
    await request.post('http://localhost:3001/api/testing/reset')
    await request.post('http://localhost:3001/api/users',{
      data: {
        name: 'playwright create',
        username:'wakren',
        password: '1234'
      }
    })
    await page.goto('http://localhost:5173')
  })
  test('front page can be opened', async({ page }) => {
    const locator = await page.getByText('Blogs')
    await expect(locator).toBeVisible()
  })
  test('user can log in', async({ page })=> {
    await page.getByRole('button', {name: 'login' }).click()
    await page.getByTestId('username').fill('wakren')
    await page.getByTestId('password').fill('1234')
    await page.getByRole('button', {name: 'login'}).click()

    await expect(page.getByText('playwright create logged in')).toBeVisible()
  })
  describe('when logged in', () =>{
    beforeEach( async({page}) =>{
      await page.getByRole('button', {name: 'login' }).click()
      await page.getByTestId('username').fill('wakren')
      await page.getByTestId('password').fill('1234')
      await page.getByRole('button', {name: 'login'}).click()
    })
  test('new blogs can be created', async({ page}) =>{

    await page.getByRole('button', {name: 'new blog'}).click()
    await page.getByTestId('title').fill('testing blog app using playwright')
    await page.getByTestId('author').fill('playwright create')
    await page.getByTestId('url').fill('http://example.com')
  
    await page.getByRole('button', {name: 'create'}).click()
    await expect(page.getByText('playwright')).toBeVisible()
    await expect(page.getByText('testing blog app using playwright')).toBeVisible()
  })
  test('the blog details can be viewed', async({ page}) => {
    await page.getByRole('button', {name: 'new blog'}).click()
    await page.getByTestId('title').fill('testing blog app using playwright')
    await page.getByTestId('author').fill('playwright create')
    await page.getByTestId('url').fill('http://example.com')
    await page.getByRole('button', {name: 'create'}).click()
    await page.getByRole('button' , {name: 'view'}).click()
    
    await expect(page.getByText('http://example.com')).toBeVisible()
  })
})
})
