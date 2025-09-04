import { createDao } from "./commonDao";

export type Phase = {
	id: number;
	name: string;
	sort_no: number;
	created_at: string;
	updated_at: string;
};

const TABLE_NAME = "phases";
const COLUMN_NAMES: (keyof Phase)[] = ["id", "name", "sort_no", "created_at", "updated_at"];

export default createDao<Phase>(TABLE_NAME, COLUMN_NAMES);
