const session = require("express-session");
const csrf = require("csurf");
const helmet = require("helmet");
const cors = require("cors");
const env = require("../common/env");

function applySecurity(app) {
    // CORSを最初に適用
    app.use(
        cors({
            origin: "http://localhost:3000", // ReactのURL
            credentials: true,
        })
    );

    // セキュリティヘッダー
    app.use(helmet());

    // セッション管理
    app.use(
        session({
            secret: env.SESSION_SECRET, // 環境変数から取得
            resave: false,
            saveUninitialized: false,
            cookie: {
                httpOnly: true,
                secure: env.NODE_ENV === "production",
                sameSite: env.NODE_ENV === "production" ? "none" : "lax",
                maxAge: 30 * 60 * 1000, // 30分
            },
        })
    );

    // // CSRF対策（必要に応じて有効化）
    // app.use(csrf());
    // app.use((req, res, next) => {
    //   res.locals.csrfToken = req.csrfToken ? req.csrfToken() : '';
    //   next();
    // });
}

module.exports = applySecurity;
