var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
/*
 * Error handling class. This class will handle all internal server errors, and will try to avoid
 */
//Generic greenlight error
var GreenlightError = /** @class */ (function (_super) {
    __extends(GreenlightError, _super);
    function GreenlightError(message, response) {
        var _this = _super.call(this, message) || this;
        if (response) {
            response.status(400).end(_this.stack);
        }
        return _this;
    }
    return GreenlightError;
}(Error));
export { GreenlightError };
//Backend related error
var BackendError = /** @class */ (function (_super) {
    __extends(BackendError, _super);
    function BackendError(message) {
        return _super.call(this, message) || this;
    }
    return BackendError;
}(Error));
export { BackendError };
