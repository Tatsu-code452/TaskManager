const express = require("express");
const router = express.Router();

const taskPlanDao = require("../dao/taskPlanDao");
const projectMasterDao = require("../dao/projectMasterDao");
const phaseMasterDao = require("../dao/phaseMasterDao");
const categoryMasterDao = require("../dao/categoryMasterDao");
const userDao = require("../dao/userDao");

const alarm = require("../common/alarm");

// Map utility
const createMap = (rows, key) =>
    new Map((rows || []).map((row) => [row[key], row]));

// タスク一覧取得API（GET）
router.get("/tasks", async (req, res) => {
    try {
        const [taskPlan, projects, phases, categories, users] =
            await Promise.all([
                taskPlanDao.find(),
                projectMasterDao.find(),
                phaseMasterDao.find(),
                categoryMasterDao.find(),
                userDao.find(),
            ]);

        const projectMap = createMap(projects, "id");
        const phaseMap = createMap(phases, "id");
        const categoryMap = createMap(categories, "id");
        const userMap = createMap(users, "id");

        const tasks = taskPlan.map((task) => {
            return {
                taskId: task.id,
                projectId: task.project_id,
                phaseId: task.phase_id,
                categoryId: task.category_id,
                userId: task.user_id,
                title: task.title,
                description: task.description,
                startDate: task.start_date,
                endDate: task.end_date,
                status: task.status,
                effort: task.effort,
                createDate: task.create_date,
                updateDate: task.update_date,
                projectName: projectMap.get(task.project_id)?.name ?? "未設定",
                phaseName: phaseMap.get(task.phase_id)?.name ?? "未設定",
                category: categoryMap.get(task.category_id)?.name ?? "未設定",
                assignee: userMap.get(task.user_id)?.username ?? "未設定",
            };
        });
        const result = {
            tasks: tasks,
            projects: projects,
            phases: phases,
            categories: categories,
            users: users,
        };

        return alarm.createOkResponse(res, { data: result }, "取得成功");
    } catch (err) {
        console.error("DB接続エラー:", err);
        return alarm.createInternalErrorResponse(res, err, req);
    }
});

// タスク追加API（POST）
router.post("/tasks", async (req, res) => {
    const { title, description } = req.body;
    try {
        const ret = await taskPlanDao.insert({ title, description });
        return alarm.createCreatedResponse(res, { ret: ret }, "作成成功");
    } catch (err) {
        console.error("DB追加エラー:", err);
        return alarm.createInternalErrorResponse(res, err, req);
    }
});

module.exports = router;
