var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
import crypto from "crypto";
var GreenlightAuth = /** @class */ (function () {
    function GreenlightAuth() {
    }
    /**
        * Given a request, it will authenticate if an user has those credentials
        *
        *
        * @param {express.Request} Request - Request that handles the session
        * @param {Any} User - The User model that will be used for the query
        * @param {String} Username - The user to authenticated's username
        * @param {Password} Password - The user to authenticated's password
    */
    GreenlightAuth.login = function (Request, User, Username, Password) {
        return __awaiter(this, void 0, void 0, function () {
            var hash, data, PasswordHash, results;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        hash = crypto.createHash('sha512');
                        data = hash.update(Password);
                        PasswordHash = data.digest('hex');
                        return [4 /*yield*/, User.findOne({ where: { username: Username, password: PasswordHash } })];
                    case 1:
                        results = _a.sent();
                        if (results !== null)
                            Request.session.loggedIn = true;
                        return [2 /*return*/];
                }
            });
        });
    };
    /**
        * Given a request, it will deauthenticate the session
        *
        *
        * @param {express.Request} Request - Request that handles the session
    */
    GreenlightAuth.logout = function (Request) {
        Request.session.loggedIn = false;
    };
    /**
        * Creates a new User in the Users table. This will be done through Sequelize, so ensure to pass a GreenlightUser model to this method.
        *
        *
        * @param {Any} User - The User model that will be used for the query
        * @param {String} Username - The new user's username
        * @param {String} firstName - The new user's first name
        * @param {String} Password - The new user's password
        * @param {String} lastName - The new user's last name
        * @param {String} Email - The new user's Email
        */
    GreenlightAuth.signup = function (User, Username, firstName, Password, lastName, Email) {
        if (lastName === void 0) { lastName = ""; }
        if (Email === void 0) { Email = ""; }
        //creating hash object 
        var hash = crypto.createHash('sha512');
        //passing the data to be hashed
        var data = hash.update(Password);
        //Creating the hash in the required format
        var PasswordHash = data.digest('hex');
        //Building the user
        var new_user = User.build({ username: Username, firstName: firstName, password: PasswordHash, lastName: lastName, email: Email });
        //Saving the user
        new_user.save();
    };
    return GreenlightAuth;
}());
export default GreenlightAuth;
