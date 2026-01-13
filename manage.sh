#!/bin/bash

while true; do
  echo "==== Project 管理メニュー ===="
  echo "1: client 管理メニューを起動"
  echo "2: server 管理メニューを起動"
  echo "3: 終了"
  read -p "番号を選択してください: " choice

  case $choice in
    1)
      if [ -d "client" ] && [ -f "client/manage.sh" ]; then
        (cd client && bash manage.sh)
      else
        echo "client/manage.sh が見つかりません"
      fi
      ;;
    2)
      if [ -d "server" ] && [ -f "server/manage.sh" ]; then
        (cd server && bash manage.sh)
      else
        echo "server/manage.sh が見つかりません"
      fi
      ;;
    3)
      echo "終了します"
      exit 0
      ;;
    *) echo "無効な選択です" ;;
  esac
  echo ""
done
