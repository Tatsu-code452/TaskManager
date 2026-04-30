import { CellPos } from "../types";

export class GridFocusManager {
    private refs = new Map<string, HTMLElement>();

    register(pos: CellPos, el: HTMLElement | null) {
        if (!el) return;
        this.refs.set(`${pos.row}-${pos.col}`, el);
    }

    focus(pos: CellPos) {
        const el = this.refs.get(`${pos.row}-${pos.col}`);
        el?.focus();
    }
}
