import express from "express";
import userDao from "../dao/userDao";
import * as alarm from "../common/alarm";

const router = express.Router();

// ユーザ一覧取得API（GET）
router.get("/users", async (req, res) => {
    try {
        const users = await userDao.find();
        return alarm.createOkResponse(res, { data: users }, "取得成功");
    } catch (err) {
        return alarm.createInternalErrorResponse(res, err, req);
    }
});

// ユーザ詳細取得API（GET）
router.get("/users/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const user = await userDao.findById(id);
        if (!user) {
            return alarm.createBadRequestResponse(res, "ユーザが見つかりません");
        }
        return alarm.createOkResponse(res, { data: user }, "取得成功");
    } catch (err) {
        return alarm.createInternalErrorResponse(res, err, req);
    }
});

// ユーザ新規登録API（POST）
router.post("/users", async (req, res) => {
    try {
        const { data } = req.body;
        if (!data || !data.userId || !data.password) {
            return alarm.createBadRequestResponse(res, "必須フィールドが不足しています");
        }
        const ret = await userDao.insert(data);
        return alarm.createCreatedResponse(res, { user: ret }, "ユーザ作成");
    } catch (err) {
        return alarm.createInternalErrorResponse(res, err, req);
    }
});

// ユーザ情報更新API（PUT）
router.put("/users/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const { data } = req.body;
        if (!data) {
            return alarm.createBadRequestResponse(res, "データがありません");
        }
        const ret = await userDao.update(id, data);
        return alarm.createOkResponse(res, { updated: ret }, "更新完了");
    } catch (err) {
        return alarm.createInternalErrorResponse(res, err, req);
    }
});

// ユーザ削除API（DELETE）
router.delete("/users/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const ret = await userDao.remove(id);
        return alarm.createOkResponse(res, { deleted: ret }, "削除完了");
    } catch (err) {
        return alarm.createInternalErrorResponse(res, err, req);
    }
});

export default router;
