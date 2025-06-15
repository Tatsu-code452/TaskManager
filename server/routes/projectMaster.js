const express = require("express");
const router = express.Router();

const projectMasterDao = require("../dao/projectMasterDao");

// 一覧取得API（GET）
router.get("/projects", async (req, res) => {
    try {
        const projects = await projectMasterDao.find();

        const result = projects.map((proj) => {
            return {
                id: proj.id,
                name: proj.name,
                description: proj.description,
                startDate: proj.start_date,
                endDate: proj.end_date,
                createDate: proj.created_at,
                updateDate: proj.updated_at,
            };
        });
        return res.json(result);
    } catch (err) {
        console.error("DB接続エラー:", err);
        return res
            .status(500)
            .json({ success: false, message: "サーバーエラー" });
    }
});

// 追加API（POST）
router.post("/projects", async (req, res) => {
    try {
        const { data } = req.body;

        if (!data || typeof data !== "object") {
            return res
                .status(400)
                .json({ success: false, message: "無効なデータ形式です" });
        }

        if (!data.name || !data.startDate) {
            return res.status(400).json({
                success: false,
                message: "必須フィールドが不足しています",
            });
        }

        // データの整形
        const formattedData = {
            name: data.name,
            description: data.description || "",
            start_date: data.startDate,
            end_date: data.endDate || null,
        };
        const ret = await projectMasterDao.insert(formattedData);
        return res.status(201).json({ success: true, ret });
    } catch (err) {
        console.error("DB追加エラー:", err);
        return res
            .status(500)
            .json({ success: false, message: "サーバーエラー" });
    }
});

// 更新API（PUT）
router.put("/projects/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const { data } = req.body;

        if (!data || typeof data !== "object") {
            return res
                .status(400)
                .json({ success: false, message: "無効なデータ形式です" });
        }

        if (!data.name || !data.startDate) {
            return res.status(400).json({
                success: false,
                message: "必須フィールドが不足しています",
            });
        }

        // データの整形
        const formattedData = {
            name: data.name,
            description: data.description || "",
            start_date: data.startDate,
            end_date: data.endDate || null,
        };
        const ret = await projectMasterDao.update(id, formattedData);
        return res.status(200).json({ success: true, ret });
    } catch (err) {
        console.error("DB更新エラー:", err);
        return res
            .status(500)
            .json({ success: false, message: "サーバーエラー" });
    }
});

// 削除API（DELETE）
router.delete("/projects/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const ret = await projectMasterDao.remove(id);
        return res.status(200).json({ success: true, ret });
    } catch (err) {
        console.error("DB削除エラー:", err);
        return res
            .status(500)
            .json({ success: false, message: "サーバーエラー" });
    }
});
module.exports = router;
