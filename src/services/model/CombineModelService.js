import BaseModelService from "services/model/BaseModelService";
import CombineModel from "models/CombineModel";

class CombineModelService extends BaseModelService {
  async findIsCreated(user, clothesIds) {
    const existingCombine = await this.model.findOne({
      userId: user._id,
      clothesIds: { $all: clothesIds },
    });
    return !!existingCombine;
  }
}

export default new CombineModelService(CombineModel);
