import express from "express";
import projectDao from "../dao/projectDao";
import * as alarm from "../common/alarm";

const router = express.Router();

// --- project API ---

// 一覧取得API（GET）
router.get("/projects", async (req, res) => {
    try {
        const projects = await projectDao.find();

        const result = projects.map((proj) => ({
            id: proj.id,
            name: proj.name,
            description: proj.description,
            startDate: proj.start_date,
            endDate: proj.end_date,
            createDate: proj.created_at,
            updateDate: proj.updated_at,
        }));

        return alarm.createOkResponse(res, { data: result }, "取得成功");
    } catch (err) {
        console.error("DB接続エラー:", err);
        return alarm.createInternalErrorResponse(res, err, req);
    }
});

// 追加API（POST）
router.post("/projects", async (req, res) => {
    try {
        const { data } = req.body;

        if (!data || typeof data !== "object") {
            return alarm.createBadRequestResponse(res, "無効なデータ形式です");
        }

        if (!data.name || !data.startDate) {
            return alarm.createBadRequestResponse(
                res,
                "必須フィールドが不足しています"
            );
        }

        const formattedData = {
            name: data.name,
            description: data.description || "",
            start_date: data.startDate,
            end_date: data.endDate || null,
        };

        const ret = await projectDao.insert(formattedData);
        return alarm.createCreatedResponse(
            res,
            { project: ret },
            "プロジェクトが作成されました"
        );
    } catch (err) {
        console.error("DB追加エラー:", err);
        return alarm.createInternalErrorResponse(res, err, req);
    }
});

// 更新API（PUT）
router.put("/projects/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const { data } = req.body;

        if (!data || typeof data !== "object") {
            return alarm.createBadRequestResponse(res, "無効なデータ形式です");
        }

        if (!data.name || !data.startDate) {
            return alarm.createBadRequestResponse(
                res,
                "必須フィールドが不足しています"
            );
        }

        const formattedData = {
            name: data.name,
            description: data.description || "",
            start_date: data.startDate,
            end_date: data.endDate || null,
        };

        const ret = await projectDao.update(id, formattedData);
        return alarm.createOkResponse(res, { updated: ret }, "更新完了");
    } catch (err) {
        console.error("DB更新エラー:", err);
        return alarm.createInternalErrorResponse(res, err, req);
    }
});

// 削除API（DELETE）
router.delete("/projects/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const ret = await projectDao.remove(id);
        return alarm.createOkResponse(res, { deleted: ret }, "削除完了");
    } catch (err) {
        console.error("DB削除エラー:", err);
        return alarm.createInternalErrorResponse(res, err, req);
    }
});

module.exports = router;
