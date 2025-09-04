import express from "express";
import projectDao from "../dao/projectDao";
import * as alarm from "../common/alarm";

const router = express.Router();

// プロジェクト一覧取得API（GET）
router.get("/", async (req, res) => {
    try {
        const projects = await projectDao.find({}, undefined);
        return alarm.createOkResponse(res, { data: projects }, "取得成功");
    } catch (err) {
        return alarm.createInternalErrorResponse(res, err, req);
    }
});

// プロジェクト詳細取得API（GET）
router.get("/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const project = await projectDao.findById(id, undefined);
        if (!project) {
            return alarm.createBadRequestResponse(res, "プロジェクトが見つかりません");
        }
        return alarm.createOkResponse(res, { data: project }, "取得成功");
    } catch (err) {
        return alarm.createInternalErrorResponse(res, err, req);
    }
});

// プロジェクト新規登録API（POST）
router.post("/", async (req, res) => {
    try {
        const { data } = req.body;
        if (!data || !data.id) {
            return alarm.createBadRequestResponse(res, "必須フィールドが不足しています");
        }
        // トランザクションで登録
        const ret = await projectDao.transaction(async (client) => {
            return await projectDao.insert({
                name: data.name,
                start_date: data.startDate,
                end_date: data.endDate || null,
            }, client);
        });
        return alarm.createCreatedResponse(res, { project: ret }, "プロジェクト作成");
    } catch (err) {
        return alarm.createInternalErrorResponse(res, err, req);
    }
});

// プロジェクト情報更新API（PUT）
router.put("/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const { data } = req.body;
        if (!data) {
            return alarm.createBadRequestResponse(res, "データがありません");
        }
        // トランザクションで更新
        const ret = await projectDao.transaction(async (client) => {
            return await projectDao.update(id, data, client);
        });
        return alarm.createOkResponse(res, { updated: ret }, "更新完了");
    } catch (err) {
        return alarm.createInternalErrorResponse(res, err, req);
    }
});

// プロジェクト削除API（DELETE）
router.delete("/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const ret = await projectDao.transaction(async (client) => {
            return await projectDao.remove(id, client);
        });
        return alarm.createOkResponse(res, { deleted: ret }, "削除完了");
    } catch (err) {
        return alarm.createInternalErrorResponse(res, err, req);
    }
});

export default router;