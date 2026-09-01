"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.successResponse = successResponse;
function successResponse(data, message, statusCode = 200) {
    return {
        success: true,
        statusCode,
        message,
        data,
    };
}
//# sourceMappingURL=response.util.js.map