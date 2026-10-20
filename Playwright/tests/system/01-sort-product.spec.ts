import { test, expect } from '@playwright/test'

test('ST-05: เรียงสินค้าตามราคาจากน้อยไปมาก', async ({ page }) => {
  await page.goto('https://www.saucedemo.com/')

  await page.locator('#user-name').fill('standard_user')
  await page.locator('#password').fill('secret_sauce')
  await page.locator('#login-button').click()

  await expect(page).toHaveURL(/inventory\.html/)

  await page.locator('[data-test="product-sort-container"]').selectOption('lohi')

  const prices = await page.locator('.inventory_item_price').allTextContents()
  const numericPrices = prices.map(price => Number(price.replace('$', '')))

  expect(numericPrices.length).toBeGreaterThan(0)
  expect(numericPrices).toEqual([...numericPrices].sort((a, b) => a - b))
})