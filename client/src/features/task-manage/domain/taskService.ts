import { fetchTasks as mockFetchTasks } from "./mock/mockApi";
import { fetchTasks } from "./taskApi";

const isTest = true;
const _fetchTasks = isTest ? mockFetchTasks : fetchTasks;

export const taskService = () => {
    return {
        fetchTasks: (params) => {
            const res = _fetchTasks(params);
            console.log(res);
            return res;
        },
    }
}