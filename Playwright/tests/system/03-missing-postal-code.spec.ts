import { test, expect } from '@playwright/test'

test('ST-07: แจ้งเตือนเมื่อไม่กรอก Postal Code', async ({ page }) => {
  await page.goto('https://www.saucedemo.com/')

  await page.locator('#user-name').fill('standard_user')
  await page.locator('#password').fill('secret_sauce')
  await page.locator('#login-button').click()

  await expect(page).toHaveURL(/inventory\.html/)

  await page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click()
  await page.locator('.shopping_cart_link').click()

  await expect(page).toHaveURL(/cart\.html/)

  await page.locator('[data-test="checkout"]').click()
  await expect(page).toHaveURL(/checkout-step-one\.html/)

  await page.locator('#first-name').fill('Test')
  await page.locator('#last-name').fill('Student')
  await page.locator('#postal-code').fill('')

  await page.locator('[data-test="continue"]').click()

  await expect(page.locator('[data-test="error"]'))
    .toContainText('Postal Code is required')

  await expect(page).toHaveURL(/checkout-step-one\.html/)
})