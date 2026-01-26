#!/bin/bash

# スクリプト自身のディレクトリを基準にパスを明示
SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
# PID ファイル（client 用）
PID_FILE="$SCRIPT_DIR/.dev_client.pid"
# ログファイル
LOG_FILE="$SCRIPT_DIR/dev.log"
# ログローテート閾値 (バイト) - 100MB
ROTATE_BYTES=$((100 * 1024 * 1024))
# 起動確認用ホスト/ポート (環境変数で上書き可)
CLIENT_HOST="${CLIENT_HOST:-localhost}"
CLIENT_PORT="${CLIENT_PORT:-3001}"

start_bg() {
  # バックグラウンドで dev を起動して PID を保存
  if [ -f "$PID_FILE" ]; then
    pid=$(cat "$PID_FILE")
    if kill -0 "$pid" >/dev/null 2>&1; then
      echo "開発サーバは既にバックグラウンドで動作しています (PID=$pid)"
      return
    else
      echo "古い PID ファイルを削除します"
      rm -f "$PID_FILE"
    fi
  fi

  # ログローテート
  rotate_log_if_needed

  # nohup を使って切り離し、出力はログファイルにリダイレクト
  nohup npm run dev >"$LOG_FILE" 2>&1 &
  echo $! > "$PID_FILE"
  echo "開発サーバをバックグラウンドで起動しました (PID=$(cat $PID_FILE))"
  echo "ログ: $LOG_FILE"
  # 起動確認
  if wait_for_port "$CLIENT_HOST" "$CLIENT_PORT" 30; then
    echo "クライアント dev が起動しました: http://$CLIENT_HOST:$CLIENT_PORT"
  else
    echo "クライアント dev の起動を待機中にタイムアウトしました (http://$CLIENT_HOST:$CLIENT_PORT)"
    echo "ログを確認してください: $LOG_FILE"
  fi
}

rotate_log_if_needed() {
  if [ -f "$LOG_FILE" ]; then
    size=$(wc -c < "$LOG_FILE" 2>/dev/null || echo 0)
    if [ "$size" -ge "$ROTATE_BYTES" ]; then
      ts=$(date +%Y%m%d%H%M%S)
      mv "$LOG_FILE" "$LOG_FILE.$ts"
      echo "ログをローテートしました: $LOG_FILE -> $LOG_FILE.$ts"
      # 新しいログファイルを作成
      touch "$LOG_FILE"
    fi
  fi
}

wait_for_port() {
  host="$1"; port="$2"; timeout="$3"
  for i in $(seq 1 "$timeout"); do
    # bash の /dev/tcp を使って確認
    (echo > /dev/tcp/$host/$port) >/dev/null 2>&1 && return 0
    sleep 1
  done
  return 1
}

stop_bg() {
  if [ ! -f "$PID_FILE" ]; then
    echo "PID ファイルが見つかりません。バックグラウンドサーバは動作していない可能性があります。"
    return
  fi
  pid=$(cat "$PID_FILE")
  if kill -0 "$pid" >/dev/null 2>&1; then
    kill "$pid" && echo "開発サーバ (PID=$pid) を停止しました"
  else
    echo "PID $pid のプロセスは存在しません"
  fi
  rm -f "$PID_FILE"
}

while true; do
  echo "==== Client 管理メニュー ===="
  echo "1: クリーン (clean)"
  echo "2: ビルド (clean:build)"
  echo "3: 開発サーバ起動 - フォアグラウンド (dev)"
  echo "4: 開発サーバ起動 - バックグラウンド (dev:bg)"
  echo "5: 開発サーバ停止 (dev:stop)"
  echo "6: プレビュー起動 (start)"
  echo "7: 型チェック (type-check)"
  echo "8: Lint (lint)"
  echo "q: 終了"
  read -p "番号を選択してください: " choice

  case $choice in
    1) npm run clean ;;
    2) npm run clean:build ;;
    3) npm run dev ;;
    4) start_bg ;;
    5) stop_bg ;;
    6) npm run start ;;
    7) npm run type-check ;;
    8) npm run lint ;;
    q) echo "終了します"; exit 0 ;;
    *) echo "無効な選択です" ;;
  esac
  echo ""
done
