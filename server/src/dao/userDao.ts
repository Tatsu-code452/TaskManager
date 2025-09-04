import { createDao } from "./commonDao";

export type User = {
    id: number;
    password: string;
    name: string;
    role: string;
    created_at: string;
    updated_at: string;
};

const TABLE_NAME = "users";
const COLUMN_NAMES: (keyof User)[] = [
    "id",
    "password",
    "name",
    "role",
    "created_at",
    "updated_at",
];

export default createDao<User>(TABLE_NAME, COLUMN_NAMES);
