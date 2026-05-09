import {
  expectElement,
  getChildElement,
  setup,
} from "./InlineSelectEditorMock";

import { fireEvent, render } from "@testing-library/react";
import { describe, it } from "vitest";

import { MemoryRouter } from "react-router-dom";
import { InlineSelectEditor } from "./../../ui/InlineSelectEditor";
import { InlineSelectEditorMock } from "./mock";

describe("InlineSelectEditor UI", () => {
    let root: HTMLElement;

    beforeEach(() => {
        setup();

        const { container } = render(
            <MemoryRouter>
                <InlineSelectEditor<string> {...InlineSelectEditorMock} />,
            </MemoryRouter>,
        );
        root = container.querySelector("div")!;
    });

    it("should render without crash", async () => {
        expectElement({
            target: await getChildElement(root, 0),
            tagName: "SPAN",
            textContent:
                InlineSelectEditorMock.labelMap[InlineSelectEditorMock.value],
            className: InlineSelectEditorMock.className,
        });
    });

    it("should call onClick", async () => {
        fireEvent.click(root);

        const el = await getChildElement(root, 0);
        expectElement({
            target: el,
            tagName: "SELECT",
        });

        for (let index = 0; index < el.children.length; index++) {
            expectElement({
                target: await getChildElement(el, index),
                tagName: "OPTION",
                textContent:
                    InlineSelectEditorMock.labelMap[
                        InlineSelectEditorMock.options[index]
                    ],
            });
        }

        expect(InlineSelectEditorMock.onStartEdit).toHaveBeenCalled();
    });

    it("should call onChange", async () => {
        fireEvent.click(root);

        const select = await getChildElement(root, 0);

        fireEvent.change(select, {
            target: { value: InlineSelectEditorMock.options[1] },
        });

        expect(InlineSelectEditorMock.onChange).toHaveBeenCalledWith(
            InlineSelectEditorMock.options[1],
        );
    });

    it("should call onBlur", async () => {
        fireEvent.click(root);

        const select = await getChildElement(root, 0);

        fireEvent.blur(select);

        expect(InlineSelectEditorMock.onCommit).toHaveBeenCalled();
    });

    it("should call onKeyDown (Enter)", async () => {
        fireEvent.click(root);

        const select = await getChildElement(root, 0);

        fireEvent.keyDown(select, { key: "Enter" });

        expect(InlineSelectEditorMock.onCommit).toHaveBeenCalled();
    });

    it("should exit edit mode on Escape", async () => {
        fireEvent.click(root);

        const select = await getChildElement(root, 0);

        fireEvent.keyDown(select, { key: "Escape" });

        // Escape は onCommit を呼ばない
        expect(InlineSelectEditorMock.onCommit).not.toHaveBeenCalled();

        // 編集終了 → span に戻る
        const span = await getChildElement(root, 0);
        expectElement({
            target: span,
            tagName: "SPAN",
            textContent:
                InlineSelectEditorMock.labelMap[InlineSelectEditorMock.value],
        });
    });
});
