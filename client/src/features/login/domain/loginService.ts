import { login } from "../../../api/auth";

export const loginService = {
    loginUser: async (username: string, password: string) => {
        return login(username, password);
    }
}