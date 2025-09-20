import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

test.describe('Accessibility Tests', () => {
    test('Homepage should be accessible', async ({ page }) => {
        await page.goto('/');

        // Wait for the page to load completely
        await page.waitForLoadState('networkidle');

        // Run accessibility check
        const accessibilityScanResults = await new AxeBuilder({ page }).analyze();
        expect(accessibilityScanResults.violations).toEqual([]);
    });

    test('About page should be accessible', async ({ page }) => {
        await page.goto('/about');
        await page.waitForLoadState('networkidle');
        const accessibilityScanResults = await new AxeBuilder({ page }).analyze();
        expect(accessibilityScanResults.violations).toEqual([]);
    });

    test('Work page should be accessible', async ({ page }) => {
        await page.goto('/work');
        await page.waitForLoadState('networkidle');
        const accessibilityScanResults = await new AxeBuilder({ page }).analyze();
        expect(accessibilityScanResults.violations).toEqual([]);
    });

    test('Resume page should be accessible', async ({ page }) => {
        await page.goto('/resume');
        await page.waitForLoadState('networkidle');
        const accessibilityScanResults = await new AxeBuilder({ page }).analyze();
        expect(accessibilityScanResults.violations).toEqual([]);
    });

    test('Contact page should be accessible', async ({ page }) => {
        await page.goto('/contact');
        await page.waitForLoadState('networkidle');
        const accessibilityScanResults = await new AxeBuilder({ page }).analyze();
        expect(accessibilityScanResults.violations).toEqual([]);
    });

    test('Navigation should be keyboard accessible', async ({ page }) => {
        await page.goto('/');
        await page.waitForLoadState('networkidle');

        // Test keyboard navigation
        await page.keyboard.press('Tab');
        const focusedElement = await page.evaluate(() => document.activeElement?.tagName);
        expect(focusedElement).toBeTruthy();

        // Check that navigation links are reachable via keyboard
        for (let i = 0; i < 5; i++) {
            await page.keyboard.press('Tab');
        }

        const accessibilityScanResults = await new AxeBuilder({ page }).analyze();
        expect(accessibilityScanResults.violations).toEqual([]);
    });

    test('Forms should be accessible', async ({ page }) => {
        await page.goto('/contact');
        await page.waitForLoadState('networkidle');

        // Test form labels
        const nameInput = page.locator('input[name="name"]');
        const nameLabel = page.locator('label[for="name"]');

        await expect(nameInput).toBeVisible();
        await expect(nameLabel).toBeVisible();

        // Check form accessibility
        const accessibilityScanResults = await new AxeBuilder({ page })
            .include('form')
            .withTags(['wcag2a', 'wcag2aa', 'wcag21aa'])
            .analyze();
        expect(accessibilityScanResults.violations).toEqual([]);
    });

    test('Images should have proper alt text', async ({ page }) => {
        await page.goto('/');

        // Check that all images have alt text
        const images = await page.locator('img').all();

        for (const image of images) {
            const alt = await image.getAttribute('alt');
            expect(alt).toBeTruthy();
            expect(alt).not.toBe('');
        }
    });

    test('Color contrast should meet WCAG AAA standards', async ({ page }) => {
        await page.goto('/');
        await page.waitForLoadState('networkidle');

        const accessibilityScanResults = await new AxeBuilder({ page })
            .withRules(['color-contrast-enhanced'])
            .analyze();
        expect(accessibilityScanResults.violations).toEqual([]);
    });
});
