import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import AlarmFilter from '../components/AlarmFilter';
import AlarmList from '../components/AlarmList';
import AlarmDetailModal from '../components/AlarmDetailModal';
const AlarmHistoryPage = () => {
    const [alarms, setAlarms] = useState([]);
    const [selectedAlarm, setSelectedAlarm] = useState(null);
    const [modalOpen, setModalOpen] = useState(false);
    // TODO: API連携
    return (_jsxs("div", { children: [_jsx("h2", { children: "\u30A2\u30E9\u30FC\u30E0\u5C65\u6B74" }), _jsx(AlarmFilter, {}), _jsx(AlarmList, { alarms: alarms, onDetail: id => { setSelectedAlarm(alarms.find(a => a.id === id) || null); setModalOpen(true); } }), _jsx(AlarmDetailModal, { alarm: selectedAlarm, open: modalOpen, onClose: () => setModalOpen(false) })] }));
};
export default AlarmHistoryPage;
