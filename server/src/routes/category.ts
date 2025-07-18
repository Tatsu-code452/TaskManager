import express from "express";
import categoryDao from "../dao/categoryDao";
import * as alarm from "../common/alarm";

const router = express.Router();

// 一覧取得API（GET）
router.get("/categories", async (req, res) => {
    try {
        const categories = await categoryDao.find();
        return alarm.createOkResponse(res, { data: categories }, "取得成功");
    } catch (err) {
        return alarm.createInternalErrorResponse(res, err, req);
    }
});

// 追加API（POST）
router.post("/categories", async (req, res) => {
    try {
        const { data } = req.body;
        if (!data || !data.name) {
            return alarm.createBadRequestResponse(
                res,
                "必須フィールドが不足しています"
            );
        }
        const ret = await categoryDao.insert(data);
        return alarm.createCreatedResponse(
            res,
            { category: ret },
            "カテゴリ作成"
        );
    } catch (err) {
        return alarm.createInternalErrorResponse(res, err, req);
    }
});

// 更新API（PUT）
router.put("/categories/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const { data } = req.body;
        if (!data || !data.name) {
            return alarm.createBadRequestResponse(
                res,
                "必須フィールドが不足しています"
            );
        }
        const ret = await categoryDao.update(id, data);
        return alarm.createOkResponse(res, { updated: ret }, "更新完了");
    } catch (err) {
        return alarm.createInternalErrorResponse(res, err, req);
    }
});

// 削除API（DELETE）
router.delete("/categories/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const ret = await categoryDao.remove(id);
        return alarm.createOkResponse(res, { deleted: ret }, "削除完了");
    } catch (err) {
        return alarm.createInternalErrorResponse(res, err, req);
    }
});

export default router;
