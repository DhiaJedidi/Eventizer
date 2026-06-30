import { chromium } from 'playwright'

const URL = process.argv[2] || 'http://localhost:3000/'
const errors = []
const failed = []

const browser = await chromium.launch()
const page = await browser.newPage()

page.on('console', (msg) => {
  if (msg.type() === 'error') errors.push(`[console.error] ${msg.text()}`)
})
page.on('pageerror', (err) => errors.push(`[pageerror] ${err.message}`))
page.on('requestfailed', (req) =>
  failed.push(`[requestfailed] ${req.url()} — ${req.failure()?.errorText}`),
)

try {
  await page.goto(URL, { waitUntil: 'networkidle', timeout: 60000 })
  // Give hydration + GSAP a moment.
  await page.waitForTimeout(2500)
  const h1 = await page.locator('h1').first().textContent()
  await page.screenshot({ path: 'shot-hero.png', fullPage: false })
  // Scroll through to trigger reveals, then a full-page capture.
  await page.evaluate(async () => {
    for (let y = 0; y < document.body.scrollHeight; y += 700) {
      window.scrollTo(0, y)
      await new Promise((r) => setTimeout(r, 120))
    }
    window.scrollTo(0, 0)
  })
  await page.waitForTimeout(800)
  await page.screenshot({ path: 'shot-full.png', fullPage: true })
  console.log('H1:', JSON.stringify(h1))
  console.log('Screenshots: shot-hero.png, shot-full.png')
} catch (e) {
  console.log('NAVIGATION ERROR:', e.message)
}

console.log('\n=== Console / page errors:', errors.length, '===')
errors.forEach((e) => console.log(e))
console.log('\n=== Failed requests:', failed.length, '===')
failed.slice(0, 20).forEach((f) => console.log(f))

await browser.close()
console.log('\nRESULT:', errors.length === 0 ? 'CLEAN ✓' : 'ERRORS FOUND ✗')
