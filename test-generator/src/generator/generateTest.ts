import fs from "fs/promises";
import Handlebars from "handlebars";
import path from "path";

// ★ eq ヘルパー登録（必須）
Handlebars.registerHelper("eq", function (a, b) {
    return a === b;
});

Handlebars.registerHelper("json", function (context) {
    return JSON.stringify(context, null, 2);
});

export async function generateTest(data: unknown, templateName: string, outputPath: string) {
    const templateFile = await fs.readFile(
        path.join(__dirname, "../templates", templateName),
        "utf-8"
    );

    const template = Handlebars.compile(templateFile);
    const result = template(data);

    await fs.writeFile(outputPath, result, "utf-8");
}
