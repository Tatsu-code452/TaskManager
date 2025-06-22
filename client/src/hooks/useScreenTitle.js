import { useEffect } from "react";

export default function useScreenTitle(title) {
    useEffect(() => {
        const titleElem = document.getElementById("screen-title");
        if (titleElem) {
            titleElem.textContent = title;
        }
    }, [title]);
}
