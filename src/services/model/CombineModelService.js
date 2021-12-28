import BaseModelService from "services/model/BaseModelService";
import CombineModel from "models/CombineModel";

const LimitCount = 10;

class CombineModelService extends BaseModelService {
  async findIsCreated(user, clothesIds) {
    const existingCombine = await this.model.findOne({
      userId: user._id,
      clothesIds: { $all: clothesIds },
    });
    return !!existingCombine;
  }

  async findUserCombines(user, options = {}) {
    const { page = 1 } = options;
    return this.model
      .find({
        userId: user._id,
      })
      .sort({ createdAt: -1 })
      .skip((page - 1) * LimitCount)
      .limit(LimitCount);
  }
}

export default new CombineModelService(CombineModel);
