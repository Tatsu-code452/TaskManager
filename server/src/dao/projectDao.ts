import { createDao } from "./commonDao";

export type Project = {
    id: number;
    name: string;
    start_date: string;
    end_date: string;
    created_at: string;
    updated_at: string;
};

const TABLE_NAME = "projects";
const COLUMN_NAMES: (keyof Project)[] = [
    "id",
    "name",
    "start_date",
    "end_date",
    "created_at",
    "updated_at",
];

export default createDao<Project>(TABLE_NAME, COLUMN_NAMES);
