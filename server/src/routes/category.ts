import express from "express";
import categoryDao from "../dao/category.dao";
import * as alarm from "../common/alarm";

const router = express.Router();

// カテゴリ一覧取得API（GET）
router.get("/", async (req, res) => {
    try {
        const categories = await categoryDao.find({}, undefined);
        return alarm.createOkResponse(res, { data: categories }, "取得成功");
    } catch (err) {
        return alarm.createInternalErrorResponse(res, err, req);
    }
});

// カテゴリ詳細取得API（GET）
router.get("/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const category = await categoryDao.findById(id, undefined);
        if (!category) {
            return alarm.createBadRequestResponse(res, "カテゴリが見つかりません");
        }
        return alarm.createOkResponse(res, { data: category }, "取得成功");
    } catch (err) {
        return alarm.createInternalErrorResponse(res, err, req);
    }
});

// カテゴリ新規登録API（POST）
router.post("/", async (req, res) => {
    try {
        const { data } = req.body;
        if (!data || !data.id) {
            return alarm.createBadRequestResponse(res, "必須フィールドが不足しています");
        }
        // トランザクションで登録
        const ret = await categoryDao.transaction(async (client) => {
            return await categoryDao.insert(data, client);
        });
        return alarm.createCreatedResponse(res, { category: ret }, "カテゴリ作成");
    } catch (err) {
        return alarm.createInternalErrorResponse(res, err, req);
    }
});

// カテゴリ情報更新API（PUT）
router.put("/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const { data } = req.body;
        if (!data) {
            return alarm.createBadRequestResponse(res, "データがありません");
        }
        // トランザクションで更新
        const ret = await categoryDao.transaction(async (client) => {
            return await categoryDao.update(id, data, client);
        });
        return alarm.createOkResponse(res, { updated: ret }, "更新完了");
    } catch (err) {
        return alarm.createInternalErrorResponse(res, err, req);
    }
});

// カテゴリ削除API（DELETE）
router.delete("/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const ret = await categoryDao.transaction(async (client) => {
            return await categoryDao.remove(id, client);
        });
        return alarm.createOkResponse(res, { deleted: ret }, "削除完了");
    } catch (err) {
        return alarm.createInternalErrorResponse(res, err, req);
    }
});

export default router;
