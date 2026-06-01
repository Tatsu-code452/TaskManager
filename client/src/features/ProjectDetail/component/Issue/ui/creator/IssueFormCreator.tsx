import { input, SectionDefinitions } from "@components/Form/FormCreator";
import TagAddRow from "@components/Tag/TagAddRow";
import { TagTypeLabel } from "@comtypes/db/common";
import { IssuePayload, IssuePriority, IssueStatus } from "@comtypes/db/issue";
import {
    IssuePriorityLabel,
    IssueStatusLabel,
} from "@features/ProjectDetail/component/Issue/types/issue";

export const sectionDefinitions: SectionDefinitions = {
    basic: {
        title: "基本情報",
        build: (form: IssuePayload, change) => [
            input.text("title", "タイトル", form.title, change),
            input.select(
                "priority",
                "優先度",
                form.priority,
                Object.values(IssuePriority),
                IssuePriorityLabel,
                change,
            ),
            input.select(
                "status",
                "ステータス",
                form.status,
                Object.values(IssueStatus),
                IssueStatusLabel,
                change,
            ),
        ],
    },

    description: {
        title: "備考",
        build: (form: IssuePayload, change) => [
            input.textarea("description", "備考", form.description, change),
        ],
    },

    schedule: {
        title: "スケジュール",
        build: (form: IssuePayload, change) => [
            input.date("due_date", "期日", form.due_date, change),
            input.text("owner", "担当者", form.owner, change),
            input.date("completed_date", "完了日", form.completed_date, change),
            input.text("reviewer", "確認者", form.reviewer, change),
        ],
    },

    tags: {
        title: "タグ",
        build: (form: IssuePayload, change) => [
            input.custom("addTag", () => (
                <TagAddRow
                    tags={form.tags}
                    tagTypeLabel={TagTypeLabel}
                    onAdd={(tag) => change("tags", [...form.tags, tag])}
                    onRemove={(tag) =>
                        change(
                            "tags",
                            form.tags.filter((t) => t !== tag),
                        )
                    }
                />
            )),
        ],
    },
};
