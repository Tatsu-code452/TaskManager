import GenericDao from "./common.dao";
import { Phase } from "../types/phase.interface";

type PhaseRow = Phase & Record<string, unknown>;
const TABLE_NAME = "phases";
const COLUMN_NAMES: (keyof Phase)[] = ["id", "name", "sort_no", "created_at", "updated_at"];

export default new GenericDao<PhaseRow>(TABLE_NAME, COLUMN_NAMES);
