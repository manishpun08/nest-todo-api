"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MessageUtil = exports.SuccessMessageUtil = void 0;
class SuccessMessageUtil {
    static created(entity) {
        return `${entity} created successfully`;
    }
    static login(entity) {
        return `${entity} logged in successfully`;
    }
    static updated(entity) {
        return `${entity} updated successfully`;
    }
    static deleted(entity) {
        return `${entity} deleted successfully`;
    }
    static fetched(entity) {
        return `${entity} fetched successfully`;
    }
    static listFetched(entity) {
        return `${entity}s fetched successfully`;
    }
}
exports.SuccessMessageUtil = SuccessMessageUtil;
exports.MessageUtil = SuccessMessageUtil;
//# sourceMappingURL=message.util.js.map