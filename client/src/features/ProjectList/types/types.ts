import { ProjectSearchCondition } from "@comtypes/db/project";
import { useSearchController } from "@features/ProjectList/hooks/controller/useSearchController";
import { useProjectApi } from "@features/ProjectList/hooks/handler/useProjectApi";
import { useFormStates } from "@features/ProjectList/hooks/states/useStates";

export type States = ReturnType<typeof useFormStates>;
export type SearchController = ReturnType<typeof useSearchController>;
export type Api = ReturnType<typeof useProjectApi>;

export type SearchCondition = ProjectSearchCondition;