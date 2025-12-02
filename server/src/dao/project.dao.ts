import GenericDao from "./common.dao";
import { Project } from "../types/project.interface";

type ProjectRow = Project & Record<string, unknown>;
const TABLE_NAME = "projects";
const COLUMN_NAMES: (keyof Project)[] = [
    "id",
    "name",
    "start_date",
    "end_date",
    "created_at",
    "updated_at",
];

export default new GenericDao<ProjectRow>(TABLE_NAME, COLUMN_NAMES);
