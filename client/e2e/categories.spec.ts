import { expect, test } from "@playwright/test";

test("a user can add and delete a category", async ({ page }) => {
    // Unique name so we can find exactly our own row later.
    const name = `Travel ${Date.now()}`;

    await page.goto("/");

    // --- SWITCH VIEW ---
    await page.getByRole("button", { name: "Categories" }).click();

    // --- ADD ---
    await page.getByPlaceholder("Category name").fill(name);
    await page.getByRole("button", { name: "Add" }).click();

    // Find our category's row and confirm it's there.
    const row = page.getByRole("listitem").filter({ hasText: name });
    await expect(row).toBeVisible();

    // --- DELETE --- (scope to the row, then click its Delete)
    await row.getByRole("button", { name: "Delete" }).click();
    await expect(row).toBeHidden();
});
