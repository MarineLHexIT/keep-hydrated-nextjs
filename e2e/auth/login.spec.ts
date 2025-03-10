import { test, expect } from '@playwright/test';

test.describe('Login Page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/login');
  });

  test('should display login form', async ({ page }) => {
    await expect(page.getByRole('heading', { name: 'Welcome back' })).toBeVisible();
    await expect(page.getByLabel('Email')).toBeVisible();
    await expect(page.getByLabel('Password')).toBeVisible();
    await expect(page.getByRole('button', { name: 'Sign in' })).toBeVisible();
  });

  test('should show validation errors for empty form', async ({ page }) => {
    await page.getByRole('button', { name: 'Sign in' }).click();

    // Check for email validation error
    await expect(page.getByText('Email is required')).toBeVisible();
    
    // Check for password validation error
    await expect(page.getByText('Password is required')).toBeVisible();
  });

  test('should show validation error for invalid email', async ({ page }) => {
    await page.getByLabel('Email').fill('invalid-email');
    await page.getByLabel('Password').fill('password123');
    await page.getByRole('button', { name: 'Sign in' }).click();

    await expect(page.getByText('Invalid email address')).toBeVisible();
  });

  test('should show error for invalid credentials', async ({ page }) => {
    await page.getByLabel('Email').fill('test@example.com');
    await page.getByLabel('Password').fill('wrongpassword');
    await page.getByRole('button', { name: 'Sign in' }).click();

    await expect(page.getByText('Invalid email or password')).toBeVisible();
  });

  test('should show loading state during submission', async ({ page }) => {
    await page.getByLabel('Email').fill('test@example.com');
    await page.getByLabel('Password').fill('password123');
    
    const submitButton = page.getByRole('button', { name: 'Sign in' });
    await submitButton.click();

    await expect(submitButton).toBeDisabled();
    await expect(submitButton).toHaveText('Signing in...');
  });

  test('should redirect to dashboard after successful login', async ({ page }) => {
    // Mock successful login response
    await page.route('**/auth/login', async (route) => {
      await route.fulfill({
        status: 200,
        body: JSON.stringify({ access_token: 'fake-token' })
      });
    });

    await page.getByLabel('Email').fill('test@example.com');
    await page.getByLabel('Password').fill('password123');
    await page.getByRole('button', { name: 'Sign in' }).click();

    // Wait for navigation to dashboard
    await expect(page).toHaveURL('/dashboard');
  });

  test('should have working sign up link', async ({ page }) => {
    const signUpLink = page.getByRole('link', { name: 'Sign up' });
    await expect(signUpLink).toBeVisible();
    await signUpLink.click();
    await expect(page).toHaveURL('/register');
  });
}); 