import { useAsyncGuard } from "../../../../utils/useAsyncGuard";
import { csvUseCase } from "../../domain/service/csvUseCase";

export const useCsvService = () => {
    const useCase = csvUseCase();
    const { run: importTasks } = useAsyncGuard(useCase.importTasks);

    return { importTasks };
};