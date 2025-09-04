import express from "express";
import userDao from "../dao/userDao";
import * as alarm from "../common/alarm";

const router = express.Router();

// ユーザ一覧取得API（GET）
router.get("/", async (req, res) => {
    try {
        const users = await userDao.find({}, undefined);
        return alarm.createOkResponse(res, { data: users }, "取得成功");
    } catch (err) {
        return alarm.createInternalErrorResponse(res, err, req);
    }
});

// ユーザ詳細取得API（GET）
router.get("/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const user = await userDao.findById(id, undefined);
        if (!user) {
            return alarm.createBadRequestResponse(res, "ユーザが見つかりません");
        }
        return alarm.createOkResponse(res, { data: user }, "取得成功");
    } catch (err) {
        return alarm.createInternalErrorResponse(res, err, req);
    }
});

// ユーザ新規登録API（POST）
router.post("/", async (req, res) => {
    try {
        const { data } = req.body;
        if (!data || !data.id || !data.password) {
            return alarm.createBadRequestResponse(res, "必須フィールドが不足しています");
        }
        // トランザクションで登録
        const ret = await userDao.transaction(async (client) => {
            return await userDao.insert(data, client);
        });
        return alarm.createCreatedResponse(res, { user: ret }, "ユーザ作成");
    } catch (err) {
        return alarm.createInternalErrorResponse(res, err, req);
    }
});

// ユーザ情報更新API（PUT）
router.put("/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const { data } = req.body;
        if (!data) {
            return alarm.createBadRequestResponse(res, "データがありません");
        }
        // トランザクションで更新
        const ret = await userDao.transaction(async (client) => {
            return await userDao.update(id, data, client);
        });
        return alarm.createOkResponse(res, { updated: ret }, "更新完了");
    } catch (err) {
        return alarm.createInternalErrorResponse(res, err, req);
    }
});

// ユーザ削除API（DELETE）
router.delete("/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const ret = await userDao.transaction(async (client) => {
            return await userDao.remove(id, client);
        });
        return alarm.createOkResponse(res, { deleted: ret }, "削除完了");
    } catch (err) {
        return alarm.createInternalErrorResponse(res, err, req);
    }
});

export default router;
