// client/src/components/CategoryListItem.tsx
import { useState } from "react";
import type { Category, NewCategory } from "../types/category";

type CategoryListItemProps = {
	category: Category;
	onUpdate: (id: string, category: NewCategory) => void;
	onDelete: (id: string) => void;
};

// A single row, in either view or edit mode. Editing state is local to
// the row so rows don't need to know about each other.
export function CategoryListItem({
	category,
	onUpdate,
	onDelete,
}: CategoryListItemProps) {
	const [isEditing, setIsEditing] = useState(false);
	const [name, setName] = useState(category.name);

	function startEdit() {
		// TODO: re-seed `name` from category.name, then set editing true.
		setName(category.name);
		setIsEditing(true);
	}

	function handleSave() {
		// TODO: call onUpdate(category.id, { name }), then leave edit mode.
		onUpdate(category.id, { name });
		setIsEditing(false);
	}

	// TODO: when isEditing, render an <li> with a name <input>, a Save button
	// (calls handleSave) and a Cancel button (exits edit mode).
	// Otherwise render an <li> showing the name with Edit and Delete buttons.
	// Reference: ExpenseListItem — same structure, one field instead of three.
	if (isEditing) {
		return (
			<li>
				<input
					name="editName"
					value={name}
					onChange={(e) => setName(e.target.value)}
					required
				/>
				<button type="button" onClick={handleSave}>
					Save
				</button>
				<button type="button" onClick={() => setIsEditing(false)}>
					Cancel
				</button>
			</li>
		);
	}

	return (
		<li>
			<span className="name">{category.name}</span>
			<button type="button" onClick={startEdit}>
				Edit
			</button>
			<button type="button" onClick={() => onDelete(category.id)}>
				Delete
			</button>
		</li>
	);
}
