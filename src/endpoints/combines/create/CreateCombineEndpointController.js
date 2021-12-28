import NotFoundError from "errors/NotFoundError";
import ArrayUtils from "helpers/utils/ArrayUtils";
import ClothesModelService from "services/model/ClothesModelService";
import CombineModelService from "services/model/CombineModelService";

const MaxIterationCount = 5;

export default class CreateCombineEndpointController {
  static async respond(request) {
    const { categories, mood, weatherType } = request.getData();
    const user = request.getUser();
    const filter = { categories, mood, weatherType };

    const combine = await this.generateUniqueCombine({
      user,
      filter,
    });

    if (!combine) {
      throw new NotFoundError(
        "Could not find a new combine with existing filter"
      );
    }

    request.respondJSON({ combine });
  }

  static async generateUniqueCombine({
    user,
    filter,
    excludedClothesIds = [],
    iterationCount = 1,
  }) {
    const { categories, mood, weatherType } = filter;
    const commonFilter = {
      ...(excludedClothesIds.length && { _id: { $nin: excludedClothesIds } }),
      ...(mood && { mood: { $in: [mood, null] } }),
      ...(weatherType && { weatherType: { $in: [weatherType, null] } }),
    };

    const clothes = (
      await Promise.all(
        categories.map((category) =>
          ClothesModelService.findOneRandomBy({ category, ...commonFilter })
        )
      )
    ).filter(Boolean);

    if (clothes.length !== categories.length) {
      return null;
    }

    const clothesIds = ArrayUtils.getKeys(clothes, "_id");
    const isCreated = await CombineModelService.findIsCreated(user, clothesIds);

    if (!isCreated) {
      const newCombine = await CombineModelService.create({
        userId: user._id,
        clothesIds,
      });
      return { ...newCombine.toObject(), clothes };
    }

    if (iterationCount > MaxIterationCount) {
      return null;
    }

    const newExcludedClothesIds = [...excludedClothesIds, ...clothesIds];
    return this.generateUniqueCombine({
      user,
      filter,
      excludedClothesIds: newExcludedClothesIds,
      iterationCount: iterationCount + 1,
    });
  }
}
