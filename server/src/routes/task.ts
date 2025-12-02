import express from "express";
import taskDao from "../dao/task.dao";
import * as alarm from "../common/alarm";

const router = express.Router();

// タスク一覧取得API（GET）
router.get("/", async (req, res) => {
    try {
        const tasks = await taskDao.find({}, undefined);
        return alarm.createOkResponse(res, { data: tasks }, "取得成功");
    } catch (err) {
        return alarm.createInternalErrorResponse(res, err, req);
    }
});

// タスク詳細取得API（GET）
router.get("/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const task = await taskDao.findById(id, undefined);
        if (!task) {
            return alarm.createBadRequestResponse(res, "タスクが見つかりません");
        }
        return alarm.createOkResponse(res, { data: task }, "取得成功");
    } catch (err) {
        return alarm.createInternalErrorResponse(res, err, req);
    }
});

// タスク新規登録API（POST）
router.post("/", async (req, res) => {
    try {
        const { data } = req.body;
        if (!data || !data.id) {
            return alarm.createBadRequestResponse(res, "必須フィールドが不足しています");
        }
        // トランザクションで登録
        const ret = await taskDao.transaction(async (client) => {
            return await taskDao.insert(data, client);
        });
        return alarm.createCreatedResponse(res, { task: ret }, "タスク作成");
    } catch (err) {
        return alarm.createInternalErrorResponse(res, err, req);
    }
});

// タスク情報更新API（PUT）
router.put("/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const { data } = req.body;
        if (!data) {
            return alarm.createBadRequestResponse(res, "データがありません");
        }
        // トランザクションで更新
        const ret = await taskDao.transaction(async (client) => {
            return await taskDao.update(id, data, client);
        });
        return alarm.createOkResponse(res, { updated: ret }, "更新完了");
    } catch (err) {
        return alarm.createInternalErrorResponse(res, err, req);
    }
});

// タスク削除API（DELETE）
router.delete("/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const ret = await taskDao.transaction(async (client) => {
            return await taskDao.remove(id, client);
        });
        return alarm.createOkResponse(res, { deleted: ret }, "削除完了");
    } catch (err) {
        return alarm.createInternalErrorResponse(res, err, req);
    }
});

export default router;
