export const StatusCode = {
    OK: 200,
    CREATED: 201,
    BAD_REQUEST: 400,
    UNAUTHORIZED: 401,
    NOT_FOUND: 404,
    INTERNAL_SERVER_ERROR: 500,
};

export const createResponse = (res: any, status: number, success: boolean, data: any = null, message = "") => {
    const responsePayload: any = {
        success,
        message,
    };
    if (data && typeof data === "object" && !Array.isArray(data)) {
        Object.assign(responsePayload, data);
    } else if (data !== null) {
        responsePayload.data = data;
    }
    return res.status(status).json(responsePayload);
};

export const createOkResponse = (
    res: any,
    data: any = {},
    message = "リクエストは成功しました"
) => {
    return createResponse(res, StatusCode.OK, true, data, message);
};

export const createCreatedResponse = (
    res: any,
    data: any = {},
    message = "リソースが作成されました"
) => {
    return createResponse(res, StatusCode.CREATED, true, data, message);
};

export const createBadRequestResponse = (res: any, message = "不正なリクエスト") => {
    return createResponse(res, StatusCode.BAD_REQUEST, false, [], message);
};

export const createInternalErrorResponse = (res: any, err: any, req: any = null) => {
    const errorLog: any = {
        message: err?.message || "Unknown error",
        stack: err?.stack,
    };
    if (req) {
        errorLog.url = req.originalUrl;
    }
    console.error("Internal Server Error:", errorLog);
    return createResponse(
        res,
        StatusCode.INTERNAL_SERVER_ERROR,
        false,
        [],
        "サーバーエラー"
    );
};
