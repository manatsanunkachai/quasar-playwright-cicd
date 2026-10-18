
import { test, expect } from '@playwright/test'

test.describe('Quasar Form - E2E', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/')
  })

  test('แจ้งเตือนเมื่อยังไม่ยอมรับเงื่อนไข', async ({ page }) => {
    await page.getByTestId('btn-submit').click()

    await expect(page.locator('.q-notification')).toContainText(
      'You need to accept the license and terms first'
    )
  })

  test('แสดงข้อความ validate เมื่อกรอกไม่ถูกต้อง', async ({ page }) => {
    await page.getByTestId('input-name').fill('')
    await page.getByTestId('input-age').fill('-5')
    await page.getByTestId('toggle-accept').click()
    await page.getByTestId('btn-submit').click()

    await expect(page.getByText('Please type something')).toBeVisible()
    await expect(page.getByText('Please type a real age')).toBeVisible()
  })

  test('ส่งฟอร์มสำเร็จเมื่อข้อมูลถูกต้องครบถ้วน', async ({ page }) => {
    await page.getByTestId('input-name').fill('Somnuk Sin')
    await page.getByTestId('input-age').fill('30')
    await page.getByTestId('toggle-accept').click()
    await page.getByTestId('btn-submit').click()

    await expect(page.locator('.q-notification')).toContainText('Submitted')
  })

  test('ปุ่ม Reset ล้างค่าทุกฟิลด์', async ({ page }) => {
    const name = page.getByTestId('input-name')
    const age = page.getByTestId('input-age')
    const accept = page.getByTestId('toggle-accept')

    await name.fill('Alice')
    await age.fill('25')
    await accept.click()

    await page.getByTestId('btn-reset').click()

    await expect(name).toHaveValue('')
    await expect(age).toHaveValue('')
    await expect(accept).not.toBeChecked()
  })
})
