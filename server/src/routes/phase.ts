import express from "express";
import phaseDao from "../dao/phaseDao";
import * as alarm from "../common/alarm";

const router = express.Router();

// 一覧取得API（GET）
router.get("/phases", async (req, res) => {
    try {
        const phases = await phaseDao.find();
        return alarm.createOkResponse(res, { data: phases }, "取得成功");
    } catch (err) {
        return alarm.createInternalErrorResponse(res, err, req);
    }
});

// 追加API（POST）
router.post("/phases", async (req, res) => {
    try {
        const { data } = req.body;
        if (!data || !data.name) {
            return alarm.createBadRequestResponse(res, "必須フィールドが不足しています");
        }
        const ret = await phaseDao.insert(data);
        return alarm.createCreatedResponse(res, { phase: ret }, "フェーズ作成");
    } catch (err) {
        return alarm.createInternalErrorResponse(res, err, req);
    }
});

// 更新API（PUT）
router.put("/phases/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const { data } = req.body;
        if (!data || !data.name) {
            return alarm.createBadRequestResponse(res, "必須フィールドが不足しています");
        }
        const ret = await phaseDao.update(id, data);
        return alarm.createOkResponse(res, { updated: ret }, "更新完了");
    } catch (err) {
        return alarm.createInternalErrorResponse(res, err, req);
    }
});

// 削除API（DELETE）
router.delete("/phases/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const ret = await phaseDao.remove(id);
        return alarm.createOkResponse(res, { deleted: ret }, "削除完了");
    } catch (err) {
        return alarm.createInternalErrorResponse(res, err, req);
    }
});

export default router;
