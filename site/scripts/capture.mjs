import { chromium } from 'playwright'
import { mkdir } from 'node:fs/promises'
import { fileURLToPath } from 'node:url'
import { dirname, join } from 'node:path'

const BASE = process.env.BASE_URL ?? 'http://localhost:8080'
const EMAIL = process.env.DEMO_EMAIL ?? 'admin@aurora.com'
const SENHA = process.env.DEMO_SENHA ?? '123456'

const outDir = join(dirname(fileURLToPath(import.meta.url)), '..', 'public', 'screenshots')

async function main() {
  await mkdir(outDir, { recursive: true })

  const browser = await chromium.launch()
  const context = await browser.newContext({
    viewport: { width: 1440, height: 900 },
    deviceScaleFactor: 2,
    colorScheme: 'light',
    reducedMotion: 'reduce',
  })
  const page = await context.newPage()

  const shot = async (nome) => {
    await page.waitForTimeout(500)
    await page.screenshot({ path: join(outDir, `${nome}.png`) })
    console.log(`  ✓ ${nome}.png`)
  }

  const clicar = async (role, name) => {
    await page.getByRole(role, { name }).first().click()
    await page.waitForLoadState('networkidle').catch(() => {})
  }

  console.log(`Base URL: ${BASE}`)

  // 1. Login
  await page.goto(`${BASE}/login`, { waitUntil: 'networkidle' })
  await shot('login')

  await page.locator('input[type="email"]').fill(EMAIL)
  await page.locator('input[type="password"]').fill(SENHA)
  await page.getByRole('button', { name: /entrar/i }).click()
  await page.getByRole('link', { name: 'Dashboard geral' }).waitFor({ timeout: 15000 })
  await page.waitForLoadState('networkidle').catch(() => {})

  // 2. Dashboard geral
  await shot('dashboard')

  // 3. Andamento do projeto
  await clicar('button', 'Andamento do Projeto')
  await shot('andamento')
  await clicar('button', 'Visão Geral')

  // 4. Operações
  await clicar('link', 'Todas as operações')
  await shot('operacoes')

  // 5. Kanban (primeira operação)
  try {
    const card = page.locator('a.card-hover').first()
    if (await card.count()) {
      await card.click()
      await page.waitForLoadState('networkidle').catch(() => {})
      await clicar('button', 'Kanban')
      await shot('kanban')
    } else {
      console.warn('  ! nenhuma operação encontrada, pulando kanban')
    }
  } catch (e) {
    console.warn(`  ! kanban falhou: ${e.message}`)
  }

  // 6. Administração
  try {
    await clicar('link', 'Administração')
    await shot('admin')
  } catch (e) {
    console.warn(`  ! admin falhou: ${e.message}`)
  }

  // 7. Dashboard no tema escuro
  try {
    await clicar('link', 'Dashboard geral')
    await page.getByRole('button', { name: 'Ativar tema escuro' }).first().click()
    await page.waitForTimeout(400)
    await shot('dashboard-dark')
  } catch (e) {
    console.warn(`  ! tema escuro falhou: ${e.message}`)
  }

  await browser.close()
  console.log(`\nPrints salvos em: ${outDir}`)
}

main().catch(err => {
  console.error(err)
  process.exit(1)
})
