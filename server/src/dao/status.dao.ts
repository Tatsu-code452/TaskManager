import GenericDao from "./common.dao";
import { Status } from "../types/status.interface";

type StatusRow = Status & Record<string, unknown>;
const TABLE_NAME = "statuses";
const COLUMN_NAMES: (keyof Status)[] = ["id", "name", "color", "created_at", "updated_at"];

export default new GenericDao<StatusRow>(TABLE_NAME, COLUMN_NAMES);
