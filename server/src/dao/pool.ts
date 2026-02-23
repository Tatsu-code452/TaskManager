import pkg from "pg";
import env from "../common/env";

// date型(タイムゾーンなし日付)をpgがUTC 00:00と変換する仕様
// DB(date) → pg が UTC Date に変換 → クライアントで JSTに自動的に変わる(9時間マイナス) → 送信時に UTC → DB(date)
// 上記のループにより、徐々にデータの時間が戻っていく
//
// date型(OID指定)をそのまま返却して対策
// DB(date) → "YYYY-MM-DD" → クライアント → "YYYY-MM-DDT00:00:00Z" → DB(date)
pkg.types.setTypeParser(1082, (value) => value);

const { Pool } = pkg;

// pg.Pool に監視用プロパティを追加した型を定義
interface ExtendedPool extends pkg.Pool {
  totalCount: number;
  idleCount: number;
  waitingCount: number;
  expiredCount: number;
}

// 接続プールを初期化
const pool = new Pool({
  host: env.DB_HOST,
  port: typeof env.DB_PORT === "string" ? parseInt(env.DB_PORT, 10) : env.DB_PORT,
  user: env.DB_USER,
  password: env.DB_PASSWORD,
  database: env.DB_NAME,
  max: 20, // 必要に応じて最大接続数などを指定
  idleTimeoutMillis: 30000, // 必要に応じてアイドルタイムアウトなどを指定
}) as ExtendedPool;

// プロパティを初期化（pg が内部的に持っているが型定義されていない）

// PoolClient 型を外部に公開
export type PoolClient = pkg.PoolClient;

// 接続プールをエクスポート
export default pool;