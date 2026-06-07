import { test, expect } from '@playwright/test';

test.describe('Aplicación Vecino', () => {
  test('debería cargar la página principal', async ({ page }) => {
    await page.goto('/', { waitUntil: 'domcontentloaded' });
    await expect(page).toHaveTitle(/Vecino/);
  });

  test('debería mostrar el enlace de inicio de sesión', async ({ page }) => {
    await page.goto('/iniciar-sesion', { waitUntil: 'domcontentloaded' });
    const loginButton = page.getByRole('button', { name: /iniciar sesion/i });
    await expect(loginButton).toBeVisible({ timeout: 10000 });
  });

  test('debería mostrar el enlace de registro', async ({ page }) => {
    await page.goto('/iniciar-sesion', { waitUntil: 'domcontentloaded' });
    const registerLink = page.getByRole('link', { name: /crea una cuenta/i });
    await expect(registerLink).toBeVisible({ timeout: 10000 });
  });

  test('debería navegar a la página de registro', async ({ page }) => {
    await page.goto('/iniciar-sesion', { waitUntil: 'domcontentloaded' });
    const registerLink = page.getByRole('link', { name: /crea una cuenta/i });
    await registerLink.click();
    await page.waitForURL(/\/registro/, { timeout: 10000 });
  });
});
