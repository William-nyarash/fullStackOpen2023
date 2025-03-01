// import { url } from "inspector"
// import { title } from "process"

// const exp = require("constants")

const loginUser = async (page, username, password)  => {
  await page.getByRole('button', { name: 'login' }).click()
  await page.getByTestId('username').fill(username)
  await page.getByTestId('password').fill(password)
  await page.getByRole('button', { name: 'Login' }).click()
}

const Blog = async (page, title,author,url ) => {

  await page.getByRole('button', { name: /new blog/i }).click()  || page.getByTestId('new_blog')
  await page.getByTestId('title').fill(title)
  await page.getByTestId('author').fill(author)
  await page.getByTestId('url').fill(url)
  await page.getByRole('button', {name: 'create'}).click()
  

}
export { loginUser,Blog }