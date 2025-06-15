const express = require("express");
const router = express.Router();

const taskPlanDao = require("../dao/taskPlanDao");
const projectMasterDao = require("../dao/projectMasterDao");
const phaseMasterDao = require("../dao/phaseMasterDao");
const categoryMasterDao = require("../dao/categoryMasterDao");
const userDao = require("../dao/userDao");

// Map utility
function createMap(rows, key) {
    const map = new Map();
    (rows || []).forEach((row) => {
        map.set(row[key], row);
    });
    return map;
}

// タスク一覧取得API（GET）
router.get("/tasks", async (req, res) => {
    try {
        const taskPlan = await taskPlanDao.find();
        // task_actualは未DAO化のため従来通り取得するか、必要に応じてDAOを追加
        // const taskActual = await taskActualDao.find();

        const project = createMap(await projectMasterDao.find(), "id");
        const phase = createMap(await phaseMasterDao.find(), "id");
        const category = createMap(await categoryMasterDao.find(), "id");
        const user = createMap(await userDao.find(), "id");

        const result = taskPlan.map((task) => {
            return {
                projectName: project.get(task.project_id)?.name || "未設定",
                phaseName: phase.get(task.phase_id)?.name || "未設定",
                taskId: task.id,
                title: task.title,
                description: task.description,
                status: task.status,
                assignee: user.get(task.assignee_id)?.username || "未設定",
                category: category.get(task.category_id)?.name || "未設定",
                startDate: task.start_date,
                endDate: task.end_date,
                workload: task.workload,
                createDate: task.create_date,
                updateDate: task.update_date,
            };
        });
        return res.json(result);
    } catch (err) {
        console.error("DB接続エラー:", err);
        return res.status(500).json({ success: false, message: "サーバーエラー" });
    }
});

// タスク追加API（POST）
router.post("/tasks", async (req, res) => {
    const { title, description } = req.body;
    if (!title || !description) {
        return res.status(400).json({
            success: false,
            message: "タイトルまたは説明が未入力です",
        });
    }
    try {
        const task = await taskPlanDao.insert({ title, description });
        return res.status(201).json({ success: true, task });
    } catch (err) {
        console.error("DB追加エラー:", err);
        return res.status(500).json({ success: false, message: "サーバーエラー" });
    }
});

module.exports = router;
