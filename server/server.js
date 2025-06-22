const express = require("express");
const path = require("path");
const applySecurity = require("./middleware/security");
const mainRouter = require("./routes/main");

const app = express();
const PORT = process.env.PORT || 3001;

// JSON解析などの基本ミドルウェア
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// セキュリティミドルウェア
applySecurity(app);

// ルーティング
app.use("/", mainRouter);

// 静的ファイル（Reactのビルド）
app.use(express.static(path.join(__dirname, "../client/build")));

// SPAルーティング fallback
// app.get("*", (req, res) => {
//     res.sendFile(path.join(__dirname, "../client/build/index.html"));
// });

// エラーハンドリング（任意）
app.use((req, res) => {
    res.status(404).json({ message: "Not Found" });
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
