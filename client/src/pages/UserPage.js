import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import UserList from '../components/UserList';
import UserEditModal from '../components/UserEditModal';
import UserEditForm from '../components/UserEditForm';
const UserPage = () => {
    const [users, setUsers] = useState([]);
    const [editUser, setEditUser] = useState(undefined);
    const [modalOpen, setModalOpen] = useState(false);
    // TODO: API連携
    return (_jsxs("div", { children: [_jsx("h2", { children: "\u30E6\u30FC\u30B6\u7BA1\u7406" }), _jsx("button", { onClick: () => setEditUser(undefined), children: "\u65B0\u898F\u767B\u9332" }), _jsx(UserList, { users: users, onEdit: id => setEditUser(users.find(u => u.id === id)), onDelete: id => { } }), _jsx(UserEditModal, { user: editUser, open: modalOpen, onClose: () => setModalOpen(false), onSubmit: user => { }, onCancel: () => setEditUser(undefined) }), editUser !== undefined && _jsx(UserEditForm, { user: editUser, onSubmit: user => { }, onCancel: () => setEditUser(undefined) })] }));
};
export default UserPage;
