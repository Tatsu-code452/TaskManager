const session = require('express-session');
const csrf = require('csurf');
const helmet = require('helmet');

function applySecurity(app) {
  // Helmetで各種ヘッダー追加（XSS等対策）
  app.use(helmet());

  // セッション管理
  app.use(session({
    secret: 'your-secret-key', // 本番は環境変数で管理
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 30 * 60 * 1000 // 30分
    }
  }));

  // セッションフィクセーション対策
  app.use((req, res, next) => {
    if (!req.session.regenerated) {
      req.session.regenerated = true;
      req.session.regenerate(() => {
        next();
      });
    } else {
      next();
    }
  });

  // // CSRF対策
  // app.use(csrf());
  // app.use((req, res, next) => {
  //   res.locals.csrfToken = req.csrfToken ? req.csrfToken() : '';
  //   next();
  // });
}

module.exports = applySecurity;
