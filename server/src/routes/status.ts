import express from "express";
import statusDao from "../dao/status.dao";
import * as alarm from "../common/alarm";

const router = express.Router();

// ステータス一覧取得API（GET）
router.get("/", async (req, res) => {
    try {
        const statuses = await statusDao.find({}, undefined);
        return alarm.createOkResponse(res, { data: statuses }, "取得成功");
    } catch (err) {
        return alarm.createInternalErrorResponse(res, err, req);
    }
});

// ステータス詳細取得API（GET）
router.get("/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const status = await statusDao.findById(id, undefined);
        if (!status) {
            return alarm.createBadRequestResponse(res, "ステータスが見つかりません");
        }
        return alarm.createOkResponse(res, { data: status }, "取得成功");
    } catch (err) {
        return alarm.createInternalErrorResponse(res, err, req);
    }
});

// ステータス新規登録API（POST）
router.post("/", async (req, res) => {
    try {
        const { data } = req.body;
        if (!data || !data.id) {
            return alarm.createBadRequestResponse(res, "必須フィールドが不足しています");
        }
        // トランザクションで登録
        const ret = await statusDao.transaction(async (client) => {
            return await statusDao.insert(data, client);
        });
        return alarm.createCreatedResponse(res, { status: ret }, "ステータス作成");
    } catch (err) {
        return alarm.createInternalErrorResponse(res, err, req);
    }
});

// ステータス情報更新API（PUT）
router.put("/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const { data } = req.body;
        if (!data) {
            return alarm.createBadRequestResponse(res, "データがありません");
        }
        // トランザクションで更新
        const ret = await statusDao.transaction(async (client) => {
            return await statusDao.update(id, data, client);
        });
        return alarm.createOkResponse(res, { updated: ret }, "更新完了");
    } catch (err) {
        return alarm.createInternalErrorResponse(res, err, req);
    }
});

// ステータス削除API（DELETE）
router.delete("/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const ret = await statusDao.transaction(async (client) => {
            return await statusDao.remove(id, client);
        });
        return alarm.createOkResponse(res, { deleted: ret }, "削除完了");
    } catch (err) {
        return alarm.createInternalErrorResponse(res, err, req);
    }
});

export default router;
