import { createDao } from "./commonDao";

export type Status = {
	id: number;
	name: string;
	color: string;
	created_at: string;
	updated_at: string;
};

const TABLE_NAME = "statuses";
const COLUMN_NAMES: (keyof Status)[] = ["id", "name", "color", "created_at", "updated_at"];

export default createDao<Status>(TABLE_NAME, COLUMN_NAMES);
