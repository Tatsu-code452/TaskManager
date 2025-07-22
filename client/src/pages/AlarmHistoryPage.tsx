import React, { useState } from 'react';
import AlarmFilter from '../components/AlarmFilter';
import AlarmList from '../components/AlarmList';
import AlarmDetailModal from '../components/AlarmDetailModal';
import { Alarm } from '../types';

const AlarmHistoryPage: React.FC = () => {
  const [alarms, setAlarms] = useState<Alarm[]>([]);
  const [selectedAlarm, setSelectedAlarm] = useState<Alarm | null>(null);
  const [modalOpen, setModalOpen] = useState(false);

  // TODO: API連携

  return (
    <div>
      <h2>アラーム履歴</h2>
      <AlarmFilter />
      <AlarmList alarms={alarms} onDetail={id => { setSelectedAlarm(alarms.find(a => a.id === id) || null); setModalOpen(true); }} />
      <AlarmDetailModal
        alarm={selectedAlarm}
        open={modalOpen}
        onClose={() => setModalOpen(false)}
      />
    </div>
  );
};

export default AlarmHistoryPage;
