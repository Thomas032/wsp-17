// client/src/components/CategoryForm.tsx
import { type FormEvent, useState } from "react";
import type { NewCategory } from "../types/category";

type CategoryFormProps = {
	onAdd: (category: NewCategory) => void;
};

// Form for adding a new category. Keeps its own draft state and resets
// itself after a successful submit.
export function CategoryForm({ onAdd }: CategoryFormProps) {
	const [name, setName] = useState("");

	function handleSubmit(event: FormEvent) {
		event.preventDefault();
		// TODO: call onAdd with { name }, then clear the field.
		onAdd({ name });

		setName("");
	}

	return (
		<form onSubmit={handleSubmit}>
			<input
				name="name"
				placeholder="Category name"
				value={name}
				onChange={(e) => setName(e.target.value)}
				required
			/>
			<button type="submit">Add</button>
		</form>
	);
}
