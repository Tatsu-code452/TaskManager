import express from "express";
import path from "path";
import applySecurity from "./middleware/security";
import env from "./common/env";
import mainRouter from "./routes/main";

const app = express();

// JSON 解析などミドルウェア
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// セキュリティ設定を適用
// applySecurity(app);

// APIルーティング
app.use("/api", mainRouter);

// // 静的ファイル（Viteの dist）を配信
// const distPath = path.resolve(__dirname, "../dist");
// app.use(express.static(distPath));

// // SPAのための catch-all（React Router対応）
// app.get("*", (req, res) => {
//   res.sendFile(path.join(distPath, "index.html"));
// });

// サーバー起動
app.listen(env.PORT, () => {
  console.log(`Server running at http://localhost:${env.PORT}`);
});