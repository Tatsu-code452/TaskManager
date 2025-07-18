import express from "express";
import taskDao from "../dao/taskDao";
import * as alarm from "../common/alarm";

const router = express.Router();

// タスク一覧取得API（GET）
router.get("/tasks", async (req, res) => {
    try {
        const tasks = await taskDao.find();
        return alarm.createOkResponse(res, { data: tasks }, "取得成功");
    } catch (err) {
        return alarm.createInternalErrorResponse(res, err, req);
    }
});

// タスク詳細取得API（GET）
router.get("/tasks/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const task = await taskDao.findById(id);
        if (!task) {
            return alarm.createBadRequestResponse(res, "タスクが見つかりません");
        }
        return alarm.createOkResponse(res, { data: task }, "取得成功");
    } catch (err) {
        return alarm.createInternalErrorResponse(res, err, req);
    }
});

// タスク新規登録API（POST）
router.post("/tasks", async (req, res) => {
    try {
        const { data } = req.body;
        if (!data || !data.name || !data.project_id) {
            return alarm.createBadRequestResponse(res, "必須フィールドが不足しています");
        }
        const ret = await taskDao.insert(data);
        return alarm.createCreatedResponse(res, { task: ret }, "タスク作成");
    } catch (err) {
        return alarm.createInternalErrorResponse(res, err, req);
    }
});

// タスク情報更新API（PUT）
router.put("/tasks/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const { data } = req.body;
        if (!data) {
            return alarm.createBadRequestResponse(res, "データがありません");
        }
        const ret = await taskDao.update(id, data);
        return alarm.createOkResponse(res, { updated: ret }, "更新完了");
    } catch (err) {
        return alarm.createInternalErrorResponse(res, err, req);
    }
});

// タスク削除API（DELETE）
router.delete("/tasks/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const ret = await taskDao.remove(id);
        return alarm.createOkResponse(res, { deleted: ret }, "削除完了");
    } catch (err) {
        return alarm.createInternalErrorResponse(res, err, req);
    }
});

export default router;
