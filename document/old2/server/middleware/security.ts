import session from "express-session";
import csrf from "csurf";
import helmet from "helmet";
import cors from "cors";
import env from "../common/env";

const applySecurity = (app: any) => {
    // CORSを最初に適用
    app.use(
        cors({
            origin: "http://localhost:3000",
            credentials: true,
        })
    );

    // セキュリティヘッダー（CSPをカスタマイズ）
    app.use(
        helmet.contentSecurityPolicy({
            directives: {
                defaultSrc: ["'self'"],
                scriptSrc: ["'self'", "https://cdn.jsdelivr.net"],
                styleSrc: ["'self'", "https://cdn.jsdelivr.net", "https://fonts.googleapis.com", "'unsafe-inline'"],
                fontSrc: ["'self'", "https://fonts.gstatic.com"],
                imgSrc: ["'self'", "data:"],
                connectSrc: ["'self'"],
                objectSrc: ["'none'"],
                upgradeInsecureRequests: [],
            },
        })
    );

    // セッション管理
    app.use(
        session({
            secret: env.SESSION_SECRET,
            resave: false,
            saveUninitialized: false,
            cookie: {
                httpOnly: true,
                secure: env.NODE_ENV === "production",
                sameSite: env.NODE_ENV === "production" ? "none" : "lax",
                maxAge: 30 * 60 * 1000,
            },
        })
    );

    // // CSRF対策（必要に応じて有効化）
    // app.use(csrf());
    // app.use((req, res, next) => {
    //   res.locals.csrfToken = req.csrfToken ? req.csrfToken() : '';
    //   next();
    // });
};

export default applySecurity;
