import React, { useState } from 'react';
import MasterTabs from '../components/MasterTabs';
import MasterList from '../components/MasterList';
import MasterEditModal from '../components/MasterEditModal';
import MasterEditForm from '../components/MasterEditForm';
import { MasterItem } from '../types';

const MasterPage: React.FC = () => {
  const [items, setItems] = useState<MasterItem[]>([]);
  const [type, setType] = useState<'project' | 'phase' | 'category' | 'status'>('project');
  const [editItem, setEditItem] = useState<MasterItem | undefined>(undefined);
  const [modalOpen, setModalOpen] = useState(false);

  // TODO: API連携

  return (
    <div>
      <h2>マスタ管理</h2>
      <MasterTabs type={type} onChange={setType} />
      <button onClick={() => setEditItem(undefined)}>新規登録</button>
      <MasterList items={items} type={type} onEdit={id => setEditItem(items.find(i => i.id === id))} onDelete={id => {}} />
      <MasterEditModal
        item={editItem}
        type={type}
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        onSubmit={item => {}}
        onCancel={() => setEditItem(undefined)}
      />
      {editItem !== undefined && <MasterEditForm item={editItem} type={type} onSubmit={item => {}} onCancel={() => setEditItem(undefined)} />}
    </div>
  );
};

export default MasterPage;
