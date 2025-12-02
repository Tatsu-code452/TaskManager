import GenericDao from "./common.dao";
import { Category } from "../types/category.interface";

type CategoryRow = Category & Record<string, unknown>;
const TABLE_NAME = "categories";
const COLUMN_NAMES: (keyof Category)[] = ["id", "name", "created_at", "updated_at"];
export default new GenericDao<CategoryRow>(TABLE_NAME, COLUMN_NAMES);

