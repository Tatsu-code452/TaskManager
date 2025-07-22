import { Application, Request, Response, NextFunction } from "express";
import helmet from "helmet";
import cors from "cors";
import session from "express-session";
import csrf from "csurf";
import cookieParser from "cookie-parser";
import xssClean from "xss-clean";
import rateLimit from "express-rate-limit";
import env from "../common/env";

const applySecurity = (app: Application) => {
  // CORS: AllowList方式
  const allowList = ["http://localhost:3000", "http://localhost:3001", "https://yourdomain.com"];
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

  // Cookieパーサー（CSRFに必要）
  app.use(cookieParser());

  // Helmetでヘッダー防御＋CSP
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

  // CSRF（Cookieベース）
  app.use(csrf({ cookie: true }));
  app.use((req: Request, res: Response, next: NextFunction) => {
    res.locals.csrfToken = req.csrfToken ? req.csrfToken() : "";
    next();
  });

  // XSS対策
  app.use(xssClean());

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

  // 簡易ログ
  app.use((req: Request, res: Response, next: NextFunction) => {
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.originalUrl}`);
    next();
  });
};

export default applySecurity;