import ArrayUtils from "helpers/utils/ArrayUtils";
import ClothesModelService from "services/model/ClothesModelService";
import CombineModelService from "services/model/CombineModelService";

export default class GetUserCombinesEndpointController {
  static async respond(request) {
    const data = request.getData();
    const user = request.getUser();
    const page = data?.page || 1;

    const combines = await CombineModelService.findUserCombines(user, { page });
    const clothesIds = combines.reduce(
      (ids, combine) => [...ids, ...combine.clothesIds],
      []
    );
    const uniqueClothesIds = [...new Set(clothesIds)];
    const clothes = await ClothesModelService.findManyByIds(uniqueClothesIds);
    const clothesMap = ArrayUtils.mapify(clothes, "_id");

    const combinesWithClothes = combines.map((combine) => {
      const { clothesIds: ids } = combine;
      const combineClothes = ids.reduce(
        (items, id) => [...items, clothesMap[id]],
        []
      );
      return { ...combine.toObject(), clothes: combineClothes };
    });

    request.respondJSON({ combines: combinesWithClothes });
  }
}
