import GenericDao from "./common.dao";
import { User } from "../types/user.interface";

type UserRow = User & Record<string, unknown>;
const TABLE_NAME = "users";
const COLUMN_NAMES: (keyof User)[] = [
    "id",
    "password",
    "name",
    "role",
    "created_at",
    "updated_at",
];

export default new GenericDao<UserRow>(TABLE_NAME, COLUMN_NAMES);
