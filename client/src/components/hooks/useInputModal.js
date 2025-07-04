import { useState, useCallback } from "react";

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
        } else if (e.target) {
            // 直接データをセットする場合
            const { name, value } = e.target;
            setForm((prev) => ({ ...prev, [name]: value }));
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
