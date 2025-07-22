import React, { useState } from 'react';
import UserList from '../components/UserList';
import UserEditModal from '../components/UserEditModal';
import UserEditForm from '../components/UserEditForm';
import { User } from '../types';

const UserPage: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [editUser, setEditUser] = useState<User | undefined>(undefined);
  const [modalOpen, setModalOpen] = useState(false);

  // TODO: API連携

  return (
    <div>
      <h2>ユーザ管理</h2>
      <button onClick={() => setEditUser(undefined)}>新規登録</button>
      <UserList users={users} onEdit={id => setEditUser(users.find(u => u.id === id))} onDelete={id => {}} />
      <UserEditModal
        user={editUser}
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        onSubmit={user => {}}
        onCancel={() => setEditUser(undefined)}
      />
      {editUser !== undefined && <UserEditForm user={editUser} onSubmit={user => {}} onCancel={() => setEditUser(undefined)} />}
    </div>
  );
};

export default UserPage;
