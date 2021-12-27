import CreateCombineEndpointController from "endpoints/combines/create/CreateCombineEndpointController";
import CreateCombineEndpointCredentialChecks from "endpoints/combines/create/CreateCombineEndpointCredentialChecks";
import CustomValidators from "helpers/endpoint/CustomValidators";
import ErrorMessages from "helpers/utils/ErrorMessages";
import { ClothesConstants } from "models/ClothesModel";

export default {
  // authentication: true,
  controller: CreateCombineEndpointController,
  credentialChecks: CreateCombineEndpointCredentialChecks,
  method: "post",
  path: "/combines/create",
  validation: {
    categories: {
      custom: CustomValidators.categories,
      in: ["body"],
    },
    mood: {
      in: ["body"],
      isIn: {
        options: ClothesConstants.moods,
        errorMessage: ErrorMessages.invalid("Mood"),
      },
      optional: { options: { nullable: true } },
    },
    weatherType: {
      in: ["body"],
      isIn: {
        options: ClothesConstants.weatherTypes,
        errorMessage: ErrorMessages.invalid("Whether"),
      },
      optional: { options: { nullable: true } },
    },
  },
};
