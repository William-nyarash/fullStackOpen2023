const { test, describe, expect, beforeEach } = require('@playwright/test')
const {loginUser,Blog} = require('./helper')

describe('Blog app', () => {
  beforeEach(async ({ page, request }) => {
    await request.post('/api/testing/reset')
    await request.post('/api/users',{
      data: {
        name: 'playwright create',
        username:'wakren',
        password: '1234'
      }
    })
    await page.goto('/ ')
  })
  test('front page can be opened', async({ page }) => {
    const locator = await page.getByText('Blogs')
    await expect(locator).toBeVisible()
  })
  test('user can log in', async({ page })=> {
    await loginUser(page, 'wakren', '1234')
    await expect(page.getByText('playwright create logged in')).toBeVisible()
  })
  test('login fails withwrong credentials', async ({ page})=>{
    await loginUser(page , 'wakren', 'user3')
    const errorDiv =  page.locator('.error')
    await expect( errorDiv). toContainText('Invalid user')
    await expect(errorDiv).toHaveCSS('border-style' , 'solid')
  })
  describe('when logged in', () =>{
    beforeEach( async({page}) =>{
      await loginUser(page, 'wakren', '1234')
    })
  test('new blogs can be created', async({ page}) =>{
    await Blog(page, 'testing blog app using playwright', 'playwright create', 'http://example.com')

    await expect(page.getByText('A new blog "testing blog app using playwright" by playwright create added')).toBeVisible()
  })
  test('the blog details can be viewed', async({ page}) => {
    await Blog(page, 'testing blog app using playwright', 'playwright create', 'http://example.com')

    await page.getByRole('button' , {name: 'view'}).click()
    
    await expect(page.getByText('http://example.com')).toBeVisible()
  })
  // to impliment tomorrow
  test('user can like a blog post', async ({page}) =>{
    await Blog(page, 'testing blog app using playwright', 'playwright create', 'http://example.com')
    await page.getByRole('button' , {name: 'view'}).click()
    await page.getByRole('button' ,{name: 'Like'}).click()

    await expect(page.getByText('1')).toBeDefined()
  })
  test('user can delete their blog post', async ({ page }) => {
    await Blog(page, 'first blog by playwright create', 'playwright create', 'http://example-1-blog.com')
    const blogToDelete  = await page.getByTestId('blog-title')
    await expect(blogToDelete).toBeVisible()

    await page.getByRole('button', { name: 'View' }).click()
    page.on('dialog', (dialog) => dialog.accept())

    await page.getByRole('button', { name: 'delete' }).click()
    
    await expect(page.getByText('first blog by playwright create')).toHaveCount(0)
  })
  test('Only the user who created the blog can delete it', async({ page }) => {
    await loginUser(page, 'wakren', '1234')
    await Blog(page, 'the blog creator','playwright create', 'http://blog-delete.com')

    page.getByRole('button', {name: 'logout'}).click()
    await loginUser(page, 'normalUser','normal21')

    const delButton = await page.getByRole('button',{name:'delete'})
    await expect(delButton).toHaveCount(0)
  })

  test.only('Blogs with the most likes', async({ page })=>{
    await loginUser(page, 'wakren', '1234')
    await Blog(page,'Blog with more likes', 'normalUser', 'http://exampleofbloglikes1.com')
    await expect(page.getByText('create new')).toBeVisible()
    await Blog(page,'Blog with less likes', 'normalUser', 'http://exampleofbloglikes2.com')
    await page.getByText('Blog with more likes').getByRole('button',{name: 'View'}).click()
    await page.getByText('Blog with more likes').getByRole('button',{name: 'View'}).click()

    await page.getByText('Blog with less likes').locator('..').getByRole('button',{name: 'Like'}).click()
    await page.getByText('Blog with more likes').locator('..').getByRole('button',{name: 'Like'}).click()
    await page.getByText('Blog with more likes').locator('..').getByRole('button',{name: 'Like'}).click()  
    const likedblog = await page.locator('.blog').allTextContents()
    expect(likedblog[0]).toContain('Most liked blog')
    expect(likedblog[1]).toContain('Less liked blog')
  })
})
})
