import ArrayUtils from "helpers/utils/ArrayUtils";
import BadRequestError from "errors/BadRequestError";
import { ClothesConstants } from "models/ClothesModel";
import ErrorMessages from "helpers/utils/ErrorMessages";
import Validator from "helpers/Validator";

export default {
  categories: {
    options: (categories) => {
      const isArray = Array.isArray(categories);
      const hasLength = !!categories?.length;

      if (!isArray || !hasLength) {
        throw new BadRequestError(ErrorMessages.invalid("Categories"));
      }

      const contains = ArrayUtils.contains(
        categories,
        ClothesConstants.categories
      );

      if (!contains) {
        throw new BadRequestError(ErrorMessages.invalid("Categories"));
      }

      return true;
    },
  },
  phoneNumber: {
    options: (phoneNumber) => {
      const isPhoneNumber = Validator.validatePhoneNumber(phoneNumber);
      if (!isPhoneNumber) {
        throw new BadRequestError(ErrorMessages.invalid("PhoneNumber"));
      }
      return phoneNumber;
    },
  },
};
