const StatusCode = {
    OK: 200,
    CREATED: 201,
    BAD_REQUEST: 400,
    UNAUTHORIZED: 401,
    NOT_FOUND: 404,
    INTERNAL_SERVER_ERROR: 500,
};

const createResponse = (res, status, success, data = null, message = "") => {
    const responsePayload = {
        success,
        message,
    };

    // dataがオブジェクトなら展開、配列やプリミティブならdataプロパティに格納
    if (data && typeof data === "object" && !Array.isArray(data)) {
        Object.assign(responsePayload, data);
    } else if (data !== null) {
        responsePayload.data = data;
    }

    return res.status(status).json(responsePayload);
};

const createOkResponse = (
    res,
    data = {},
    message = "リクエストは成功しました"
) => {
    return createResponse(res, StatusCode.OK, true, data, message);
};

const createCreatedResponse = (
    res,
    data = {},
    message = "リソースが作成されました"
) => {
    return createResponse(res, StatusCode.CREATED, true, data, message);
};

const createBadRequestResponse = (res, message = "不正なリクエスト") => {
    return createResponse(res, StatusCode.BAD_REQUEST, false, [], message);
};

const createInternalErrorResponse = (res, err, req = null) => {
    const errorLog = {
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

module.exports = {
    StatusCode,
    createResponse,
    createOkResponse,
    createCreatedResponse,
    createBadRequestResponse,
    createInternalErrorResponse,
};
