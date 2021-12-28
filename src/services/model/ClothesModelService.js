import BaseModelService from "services/model/BaseModelService";
import ClothesModel from "models/ClothesModel";

class ClothesModelService extends BaseModelService {
  async findOneRandomBy(fields) {
    const [result] = await this.model.aggregate([
      { $match: fields },
      { $sample: { size: 1 } },
    ]);
    return result;
  }
}

export default new ClothesModelService(ClothesModel);
