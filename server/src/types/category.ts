export type Category = {
	id: string;
	name: string;
};

export type NewCategory = Omit<Category, "id">;
