import React from 'react';

type MasterType = 'project' | 'phase' | 'category' | 'status';
const MasterTabs: React.FC<{ type: MasterType; onChange: (type: MasterType) => void }> = ({ type, onChange }) => {
  // TODO: タブUI
  return <div>マスタ管理タブ</div>;
};

export default MasterTabs;
