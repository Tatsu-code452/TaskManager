import express from "express";
import applySecurity from "./middleware/security";
import env from "./common/env";
import mainRouter from "./routes/main";

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// セキュリティ設定を適用
applySecurity(app);

// ルーティング
app.use("/", mainRouter);
app.get("/", (req, res) => {
  res.send(`Secure Express Server 🛡️ [ENV: ${env.NODE_ENV}]`);
});

app.listen(env.PORT, () => {
  console.log(`Server running at http://localhost:${env.PORT}`);
});

