import { fireEvent, render } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { TableHeader } from "../../ui/table/TableHeader";

describe("TableHeader", () => {
    const dates = ["2024-01-01", "2024-01-02", "2024-01-03"];
    it("日付グループ・日付セルが描画される", () => {
        const { getByText } = render(
            <TableHeader
                dates={dates}
                toggleAllPhases={() => {}}
                allCollapsed={false}
            />,
        );
        expect(getByText("2024-01")).toBeTruthy();
        expect(getByText("01")).toBeTruthy();
        expect(getByText("02")).toBeTruthy();
    });

    it("allCollapsed=trueで「全展開」ボタン、falseで「全折りたたみ」ボタン", () => {
        const { getByText, rerender } = render(
            <TableHeader
                dates={dates}
                toggleAllPhases={() => {}}
                allCollapsed={true}
            />,
        );
        expect(getByText("▶ 全展開")).toBeTruthy();
        rerender(
            <TableHeader
                dates={dates}
                toggleAllPhases={() => {}}
                allCollapsed={false}
            />,
        );
        expect(getByText("▼ 全折りたたみ")).toBeTruthy();
    });

    it("toggleAllPhasesがボタンクリックで呼ばれる", () => {
        const toggleAllPhases = vi.fn();
        const { getByText } = render(
            <TableHeader
                dates={dates}
                toggleAllPhases={toggleAllPhases}
                allCollapsed={true}
            />,
        );
        fireEvent.click(getByText("▶ 全展開"));
        expect(toggleAllPhases).toHaveBeenCalled();
    });
});
