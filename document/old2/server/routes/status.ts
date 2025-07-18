import express from "express";
import statusDao from "../dao/statusDao";
import * as alarm from "../common/alarm";

const router = express.Router();

// 一覧取得API（GET）
router.get("/statuses", async (req, res) => {
    try {
        const statuses = await statusDao.find();
        return alarm.createOkResponse(res, { data: statuses }, "取得成功");
    } catch (err) {
        return alarm.createInternalErrorResponse(res, err, req);
    }
});

// 追加API（POST）
router.post("/statuses", async (req, res) => {
    try {
        const { data } = req.body;
        if (!data || !data.name) {
            return alarm.createBadRequestResponse(res, "必須フィールドが不足しています");
        }
        const ret = await statusDao.insert(data);
        return alarm.createCreatedResponse(res, { status: ret }, "ステータス作成");
    } catch (err) {
        return alarm.createInternalErrorResponse(res, err, req);
    }
});

// 更新API（PUT）
router.put("/statuses/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const { data } = req.body;
        if (!data || !data.name) {
            return alarm.createBadRequestResponse(res, "必須フィールドが不足しています");
        }
        const ret = await statusDao.update(id, data);
        return alarm.createOkResponse(res, { updated: ret }, "更新完了");
    } catch (err) {
        return alarm.createInternalErrorResponse(res, err, req);
    }
});

// 削除API（DELETE）
router.delete("/statuses/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const ret = await statusDao.remove(id);
        return alarm.createOkResponse(res, { deleted: ret }, "削除完了");
    } catch (err) {
        return alarm.createInternalErrorResponse(res, err, req);
    }
});

export default router;
