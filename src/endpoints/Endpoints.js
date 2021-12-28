// Auth
import LoginEndpoint from "endpoints/auth/login/LoginEndpoint";
import ResetPasswordEndpoint from "endpoints/auth/resetPassword/ResetPasswordEndpoint";
import SendResetPasswordEmailEndpoint from "endpoints/auth/sendResetPasswordEmail/SendResetPasswordEmailEndpoint";
import SignupEndpoint from "endpoints/auth/signup/SignupEndpoint";

// Combine
import CreateCombineEndpoint from "endpoints/combines/create/CreateCombineEndpoint";
import GetUserCombinesEndpoint from "endpoints/combines/getUserCombines/GetUserCombinesEndpoint";

// User
import GetAllUsersEndpoint from "endpoints/users/getAllUsers/GetAllUsersEndpoint";

import getEndpointMiddlewares from "helpers/endpoint/getEndpointMiddlewares";

class Endpoints {
  constructor(router) {
    this.router = router;
    this.allowedMethods = ["get", "post", "patch", "delete"];
  }

  setEndpoints() {
    // Auth
    this._setEndpoint(LoginEndpoint);
    this._setEndpoint(ResetPasswordEndpoint);
    this._setEndpoint(SendResetPasswordEmailEndpoint);
    this._setEndpoint(SignupEndpoint);

    // Combine
    this._setEndpoint(CreateCombineEndpoint);
    this._setEndpoint(GetUserCombinesEndpoint);

    // User
    this._setEndpoint(GetAllUsersEndpoint);
  }

  _setEndpoint(endpoint) {
    const { method, path } = endpoint;
    const middlewares = getEndpointMiddlewares(endpoint);

    if (!this.allowedMethods.includes(method)) {
      throw new Error(
        `Unrecognized method ${method}. Method should be one of these ${this.allowedMethods.join(
          ","
        )}`
      );
    }

    this.router[method](path, ...middlewares);
  }
}

export default Endpoints;
