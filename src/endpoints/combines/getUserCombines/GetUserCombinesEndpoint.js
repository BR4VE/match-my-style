import GetUserCombinesEndpointController from "endpoints/combines/getUserCombines/GetUserCombinesEndpointController";
import GetUserCombinesEndpointCredentialChecks from "endpoints/combines/getUserCombines/GetUserCombinesEndpointCredentialChecks";
import ErrorMessages from "helpers/utils/ErrorMessages";

export default {
  authentication: true,
  controller: GetUserCombinesEndpointController,
  credentialChecks: GetUserCombinesEndpointCredentialChecks,
  method: "get",
  path: "/combines/getUserCombines",
  validation: {
    page: {
      errorMessage: ErrorMessages.invalid("Page"),
      in: ["query"],
      isInt: true,
      toInt: true,
      optional: { options: { nullable: true } },
    },
  },
};
