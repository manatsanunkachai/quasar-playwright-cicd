\# System Testing



\## 1. Sort Product

\*\*Test Case:\*\* ST-05



\- เข้าสู่ระบบด้วย `standard\_user`

\- เลือกการเรียงสินค้าตามราคา จากน้อยไปมาก (Price Low to High)

\- ตรวจสอบว่าราคาสินค้าเรียงจากน้อยไปมากจริง

\- \*\*Expected Result:\*\* ราคาสินค้าเรียงจากน้อยไปมากอย่างถูกต้อง



\## 2. Remove Product before Checkout

\*\*Test Case:\*\* ST-06



\- เข้าสู่ระบบและเพิ่มสินค้าลงในตะกร้า 2 รายการ

\- ลบสินค้าออก 1 รายการ

\- ดำเนินการ Checkout และกรอกข้อมูลที่จำเป็น

\- ตรวจสอบหน้าสรุปคำสั่งซื้อ

\- \*\*Expected Result:\*\* หน้าสรุปคำสั่งซื้อมีสินค้าเหลือเพียง 1 รายการตามที่เลือกไว้



\## 3. Missing Postal Code

\*\*Test Case:\*\* ST-07



\- เข้าสู่ระบบและเพิ่มสินค้าลงในตะกร้า

\- เข้าสู่หน้า Checkout

\- กรอก First Name และ Last Name แต่เว้น Postal Code ว่างไว้

\- กด Continue

\- \*\*Expected Result:\*\* ระบบแสดงข้อความ `Postal Code is required` และยังอยู่ในหน้า Checkout



\## Test Execution



ใช้ Playwright ทดสอบด้วย Chromium



```bash

npm.cmd --prefix ./Playwright run test -- --project=chromium

```



\*\*Test Result:\*\* ผ่านการทดสอบรวมทั้งหมด 7 tests



