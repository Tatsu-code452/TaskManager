import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import MasterTabs from '../components/MasterTabs';
import MasterList from '../components/MasterList';
import MasterEditModal from '../components/MasterEditModal';
import MasterEditForm from '../components/MasterEditForm';
const MasterPage = () => {
    const [items, setItems] = useState([]);
    const [type, setType] = useState('project');
    const [editItem, setEditItem] = useState(undefined);
    const [modalOpen, setModalOpen] = useState(false);
    // TODO: API連携
    return (_jsxs("div", { children: [_jsx("h2", { children: "\u30DE\u30B9\u30BF\u7BA1\u7406" }), _jsx(MasterTabs, { type: type, onChange: setType }), _jsx("button", { onClick: () => setEditItem(undefined), children: "\u65B0\u898F\u767B\u9332" }), _jsx(MasterList, { items: items, type: type, onEdit: id => setEditItem(items.find(i => i.id === id)), onDelete: id => { } }), _jsx(MasterEditModal, { item: editItem, type: type, open: modalOpen, onClose: () => setModalOpen(false), onSubmit: item => { }, onCancel: () => setEditItem(undefined) }), editItem !== undefined && _jsx(MasterEditForm, { item: editItem, type: type, onSubmit: item => { }, onCancel: () => setEditItem(undefined) })] }));
};
export default MasterPage;
