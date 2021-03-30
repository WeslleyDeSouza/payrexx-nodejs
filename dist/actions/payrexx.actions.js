"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PayrexxActions = void 0;
class PayrexxActions {
    successHandler(response, typ = null) {
        if (typ == 'create')
            return response.data.data;
        return response.data;
    }
    errorHandler(response, typ = null) {
        if (response) {
            console.log(response.response.data);
        }
        return undefined;
    }
}
exports.PayrexxActions = PayrexxActions;
//# sourceMappingURL=payrexx.actions.js.map