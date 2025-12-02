import express from "express";
import phaseDao from "../dao/phase.dao";
import * as alarm from "../common/alarm";

const router = express.Router();

// フェーズ一覧取得API（GET）
router.get("/", async (req, res) => {
    try {
        const phases = await phaseDao.find({}, undefined);
        return alarm.createOkResponse(res, { data: phases }, "取得成功");
    } catch (err) {
        return alarm.createInternalErrorResponse(res, err, req);
    }
});

// フェーズ詳細取得API（GET）
router.get("/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const phase = await phaseDao.findById(id, undefined);
        if (!phase) {
            return alarm.createBadRequestResponse(res, "フェーズが見つかりません");
        }
        return alarm.createOkResponse(res, { data: phase }, "取得成功");
    } catch (err) {
        return alarm.createInternalErrorResponse(res, err, req);
    }
});

// フェーズ新規登録API（POST）
router.post("/", async (req, res) => {
    try {
        const { data } = req.body;
        if (!data || !data.id) {
            return alarm.createBadRequestResponse(res, "必須フィールドが不足しています");
        }
        // トランザクションで登録
        const ret = await phaseDao.transaction(async (client) => {
            return await phaseDao.insert(data, client);
        });
        return alarm.createCreatedResponse(res, { phase: ret }, "フェーズ作成");
    } catch (err) {
        return alarm.createInternalErrorResponse(res, err, req);
    }
});

// フェーズ情報更新API（PUT）
router.put("/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const { data } = req.body;
        if (!data) {
            return alarm.createBadRequestResponse(res, "データがありません");
        }
        // トランザクションで更新
        const ret = await phaseDao.transaction(async (client) => {
            return await phaseDao.update(id, data, client);
        });
        return alarm.createOkResponse(res, { updated: ret }, "更新完了");
    } catch (err) {
        return alarm.createInternalErrorResponse(res, err, req);
    }
});

// フェーズ削除API（DELETE）
router.delete("/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const ret = await phaseDao.transaction(async (client) => {
            return await phaseDao.remove(id, client);
        });
        return alarm.createOkResponse(res, { deleted: ret }, "削除完了");
    } catch (err) {
        return alarm.createInternalErrorResponse(res, err, req);
    }
});

export default router;
