import { test, expect } from '@playwright/test';

test.describe('Autenticación', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/iniciar-sesion', { waitUntil: 'domcontentloaded' });
  });

  test('debería mostrar el formulario de inicio de sesión', async ({ page }) => {
    await page.waitForLoadState('networkidle');
    await expect(page.getByText(/bienvenido de nuevo/i)).toBeVisible({ timeout: 10000 });
    await expect(page.getByLabel(/correo electronico/i)).toBeVisible({ timeout: 5000 });
    await expect(page.getByLabel(/contrasena/i)).toBeVisible({ timeout: 5000 });
  });

  test('debería navegar a la página de registro desde el login', async ({ page }) => {
    await page.waitForLoadState('networkidle');
    const registerLink = page.getByRole('link', { name: /crea una cuenta/i });
    await registerLink.click();
    await page.waitForURL(/\/registro/, { timeout: 10000 });
  });

  test('debería mostrar error con credenciales inválidas', async ({ page }) => {
    await page.waitForLoadState('networkidle');
    await page.getByLabel(/correo electronico/i).fill('test@example.com');
    await page.getByLabel(/contrasena/i).fill('wrongpassword');
    await page.getByRole('button', { name: /iniciar sesion/i }).click();
    
    // El mensaje de error puede tardar un poco dependiendo de la respuesta de Supabase
    const errorMsg = page.getByText(/no fue posible iniciar sesion/i);
    await expect(errorMsg).toBeVisible({ timeout: 10000 });
  });
});

test.describe('Registro', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/registro', { waitUntil: 'domcontentloaded' });
  });

  test('debería mostrar el formulario de registro', async ({ page }) => {
    await page.waitForLoadState('networkidle');
    await expect(page.getByText(/unete a la plaza/i)).toBeVisible({ timeout: 10000 });
    await expect(page.getByLabel(/nombre completo/i)).toBeVisible({ timeout: 5000 });
    await expect(page.getByLabel(/correo electronico/i)).toBeVisible({ timeout: 5000 });
    await expect(page.getByLabel(/contrasena/i)).toBeVisible({ timeout: 5000 });
  });

  test('debería navegar a la página de login desde el registro', async ({ page }) => {
    await page.waitForLoadState('networkidle');
    const loginLink = page.getByRole('link', { name: /inicia sesion/i });
    await loginLink.click();
    await page.waitForURL(/\/iniciar-sesion/, { timeout: 10000 });
  });
});
