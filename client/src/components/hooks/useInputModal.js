import { useState, useCallback, useMemo } from "react";
import { fetchApiWithLock, formatDate } from "../../module/fetchModule";

const useInputModal = (initialFormState) => {
    const [showModal, setShowModal] = useState(false);
    const [form, setForm] = useState(initialFormState);
    const [operationType, setOperationType] = useState(null);

    // モーダルの開閉
    const openModal = (type, item = {}) => {
        setOperationType(type);
        setForm({ ...initialFormState, ...item });
        setShowModal(true);
    };
    const closeModal = () => {
        setShowModal(false);
        setForm(initialFormState);
        setOperationType(null);
    };

    // フォームの入力値変更ハンドラ
    const handleFormChange = useCallback((e, data) => {
        if (data) {
            // 行選択の入力値変更
            setForm((prev) => ({ ...prev, ...data }));
        } else if (!e.target) {
            // 直接データをセットする場合
            setForm((prev) => ({ ...prev, ...e }));
        }
    }, []);

    return {
        showModal,
        form,
        operationType,
        handleFormChange,
        openModal,
        closeModal,
    };
};

export default useInputModal;
