import React from 'react';
import MenuButton from '../components/MenuButton';

const MenuPage: React.FC = () => {
  const handleClick = (path: string) => {
    // TODO: 画面遷移処理
  };

  return (
    <div>
      <h2>メニュー</h2>
      <MenuButton label="タスク管理" onClick={() => handleClick('/tasks')} />
      <MenuButton label="ガントチャート" onClick={() => handleClick('/gantt')} />
      <MenuButton label="ユーザ管理" onClick={() => handleClick('/users')} />
      <MenuButton label="マスタ管理" onClick={() => handleClick('/master')} />
      <MenuButton label="アラーム履歴" onClick={() => handleClick('/alarms')} />
    </div>
  );
};

export default MenuPage;
