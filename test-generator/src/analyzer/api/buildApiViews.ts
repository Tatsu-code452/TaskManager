import { AnalyzedSource, ApiView } from "../core/types";

export function buildApiViews(source: AnalyzedSource): ApiView[] {
    return source.exports
        .filter((e) => e.kind === "api")
        .map((exp) => ({
            name: exp.name,
            endpoints: exp.methods.map((m) => ({
                name: m.name,
                params: m.params,
                calls: m.calls,
            })),
        }));
}
