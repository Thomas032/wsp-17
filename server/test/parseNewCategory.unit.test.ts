import { describe, expect, it } from "vitest";
import { parseNewCategory } from "../src/routes/category.js";

describe("parseNewCategory", () => {
	it("returns the parsed expense when the body is valid", () => {
		const result = parseNewCategory({
			name: "Sports",
		});
		expect(result).toEqual({ name: "Sports" });
	});

	it("returns null when name is not a string", () => {
		const result = parseNewCategory({
			name: 999,
		});
		expect(result).toBeNull();
	});

	it("returns null for a completely empty body", () => {
		expect(parseNewCategory({})).toBeNull();
	});
});
