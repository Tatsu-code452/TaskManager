export const Messages = {
    E0000: "${0}",
    E0001: "${0}は必須です",
    E0002: "${0}は${1}以上である必要があります",
    E0003: "${0}は${1}以下である必要があります",
} as const;

export const getMessage = (
    message: string,
    ...args: string[]
) => {
    let template: string = message;

    args.forEach((arg, index) => {
        template = template.replace(`\${${index}}`, arg);
    });

    return template;
};
