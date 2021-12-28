import ErrorMessages from "helpers/utils/ErrorMessages";
import SignupEndpointController from "endpoints/auth/signup/SignupEndpointController";
import SignupEndpointCredentialChecks from "endpoints/auth/signup/SignupEndpointCredentialChecks";

export default {
  controller: SignupEndpointController,
  credentialChecks: SignupEndpointCredentialChecks,
  method: "post",
  path: "/auth/signup",
  validation: {
    email: {
      in: ["body"],
      isEmail: {
        errorMessage: ErrorMessages.invalid("Email"),
      },
      normalizeEmail: true,
      trim: true,
    },
    name: {
      in: ["body"],
      isLength: {
        errorMessage: ErrorMessages.invalid("Name Length"),
        options: { min: 1, max: 100 },
      },
    },
    password: {
      in: ["body"],
      isLength: {
        errorMessage: ErrorMessages.invalid("Password Length"),
        options: { min: 8, max: 50 },
      },
      trim: true,
    },
  },
};
