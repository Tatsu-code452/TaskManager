import { Application, Request, Response, NextFunction } from "express";
import helmet from "helmet";
import cors from "cors";
import session from "express-session";
import csrf from "csurf";
import cookieParser from "cookie-parser";
import xssClean from "xss-clean";
import rateLimit from "express-rate-limit";
import env from "../common/env";
import bodyParser from "body-parser";

const applySecurity = (app: Application) => {
  // CORS: AllowList方式（環境変数対応）
  const allowList = (env.CORS_ALLOW_LIST).split(",");
  const corsOptions = {
    origin: (origin: string | undefined, callback: Function) => {
      if (!origin || allowList.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  };
  app.use(cors(corsOptions));
  // X-Powered-By削除（情報漏洩防止）
  app.disable("x-powered-by");

  // Cookieパーサー（CSRFに必要）
  app.use(cookieParser());

  // Helmetでヘッダー防御＋CSP＋Strict-Transport-Security
  app.use(
    helmet({
      contentSecurityPolicy: {
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
      },
      hsts: env.NODE_ENV === "production" ? { maxAge: 31536000, includeSubDomains: true, preload: true } : false,
    })
  );
  // リクエストBodyサイズ制限
  app.use(bodyParser.json({ limit: "1mb" }));
  app.use(bodyParser.urlencoded({ limit: "1mb", extended: true }));

  // セッション設定
  app.use(
    session({
      secret: env.SESSION_SECRET,
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

  // CSRF（Cookieベース）＋エラーハンドリング
  app.use(csrf({ cookie: true }));
  app.use((req: Request, res: Response, next: NextFunction) => {
    try {
      res.locals.csrfToken = req.csrfToken ? req.csrfToken() : "";
      next();
    } catch (err) {
      return res.status(403).json({ error: "Invalid CSRF token" });
    }
  });

  // XSS対策（xss-cleanはExpress v4以降非推奨のため削除）
  // 必要なら express-validator などで個別に対策してください。

  // リクエスト制限
  app.use(
    rateLimit({
      windowMs: 10 * 60 * 1000,
      max: 100,
      standardHeaders: true,
      legacyHeaders: false,
    })
  );

  // HTTPメソッド制限
  app.use((req: Request, res: Response, next: NextFunction) => {
    const allowedMethods = ["GET", "POST", "PUT", "DELETE"];
    if (!allowedMethods.includes(req.method)) {
      return res.status(405).send("Method Not Allowed");
    }
    next();
  });

  // 詳細ログ（IPアドレス等も記録）
  app.use((req: Request, res: Response, next: NextFunction) => {
    const ip = req.headers["x-forwarded-for"] || req.socket.remoteAddress;
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.originalUrl} IP:${ip}`);
    next();
  });
};

export default applySecurity;