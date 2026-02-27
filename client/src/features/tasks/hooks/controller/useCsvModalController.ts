import { useCsvService } from "../handler/useCsvService";
import { useCsvModalStates } from "../state/useCsvModalStates";

export const useCsvModalController = ({ addTasks, onClose }) => {
    const { text, errors,
        setText, setErrors, reset,
    } = useCsvModalStates();

    const csvService = useCsvService();

    const onChangeText = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setText(e.target.value);
    };

    const handleImport = async () => {
        const res = await csvService.importTasks(text);

        if (res.tasks) {
            addTasks(res.tasks);
            handleClose();
            return;
        }

        setErrors(res.errors);
    };

    const handleClose = () => {
        reset();
        onClose();
    };

    return {
        text,
        errors,
        onChangeText,
        handleImport,
        handleClose,
    };
};