import { resetMocks } from "@features/ProjectList/__tests__/hooks/utils";
import { InlineSelectEditorMock } from "@features/ProjectList/__tests__/ui/mock";
import { waitFor } from "@testing-library/react";

export const setup = () => resetMocks(InlineSelectEditorMock);

export const getChildElement = async (target: HTMLElement, childIndex?: number) => {
    return await waitFor(() => {
        if (childIndex !== undefined && childIndex < target.children.length) {
            return target.children[childIndex] as HTMLElement;
        } else {
            return target;
        }
    });
}

export const expectElement = ({
    target,
    tagName,
    textContent,
    className,
}: {
    target: HTMLElement,
    tagName: string,
    textContent?: string,
    className?: string
}) => {
    expect(target).toBeInTheDocument();
    expect(target.tagName).toEqual(tagName);
    if (textContent) expect(target.textContent).toEqual(textContent);
    if (className) expect(target.className).toContain(className);
}