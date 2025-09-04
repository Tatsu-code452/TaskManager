import { createDao } from "./commonDao";

export type Category = {
	id: number;
	name: string;
	created_at: string;
	updated_at: string;
};

const TABLE_NAME = "categories";
const COLUMN_NAMES: (keyof Category)[] = ["id", "name", "created_at", "updated_at"];

export default createDao<Category>(TABLE_NAME, COLUMN_NAMES);
