import { expect, test } from "@playwright/test";

test("a user can add, edit, and delete an expense", async ({ page }) => {
	// Unique description so we can find exactly our own row later.
	const description = `Coffee ${Date.now()}`;

	await page.goto("/");

	// --- ADD ---
	await page.getByPlaceholder("Description").fill(description);
	await page.getByPlaceholder("Amount (€)").fill("3.50");
	await page.getByPlaceholder("dd.mm.yyyy").fill("10.08.2026");
	await page.getByRole("button", { name: "Add" }).click();

	// Find our expense's row and confirm it's there, showing 3.50 €.
	const row = page.getByRole("listitem").filter({ hasText: description });
	await expect(row).toBeVisible();
	await expect(row).toContainText("3.50 €");

	// --- EDIT --- (the version that works)
	await row.getByRole("button", { name: "Edit" }).click();

	// The editing row is the one with a Save button. That's unique — only one
	// row edits at a time.
	const editingRow = page
		.getByRole("listitem")
		.filter({ has: page.getByRole("button", { name: "Save" }) });

	await editingRow.getByRole("spinbutton").fill("4.00");
	await editingRow.getByRole("button", { name: "Save" }).click();

	// Back in view mode, the description is text again — re-find the row.
	const updatedRow = page
		.getByRole("listitem")
		.filter({ hasText: description });
	await expect(updatedRow).toContainText("4.00 €");

	// --- DELETE --- (we'll slot EDIT in between once we've sorted it out)
	await row.getByRole("button", { name: "Delete" }).click();
	await expect(page.getByText(description)).toBeHidden();
});
