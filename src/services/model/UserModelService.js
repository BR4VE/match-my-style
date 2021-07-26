import BaseModelService from "services/model/BaseModelService";
import EventEmitter from "helpers/EventEmitter";
import HashService from "services/3rd/HashService";
import SlugService from "services/3rd/SlugService";
import UserModel from "models/UserModel";

import filterObjectFields from "helpers/utils/filterObjectFields";

const AllPublicFields = {
  _id: true,
  email: true,
  imageUrl: true,
  name: true,
  urlName: true,
};
const ReturnFields = {
  _id: true,
  email: true,
  imageUrl: true,
  name: true,
  urlName: true,
};

const getSelectFields = (additionalFields) => ({
  ...ReturnFields,
  ...filterObjectFields(additionalFields, AllPublicFields),
});

class UserModelService extends BaseModelService {
  async comparePasswords(userId, password) {
    const user = await this.model
      .findOne({ _id: userId })
      .select({ password: 1 });

    if (!user) {
      return false;
    }

    return HashService.compare(password, user.password);
  }

  async create(data) {
    const urlName = await this._findAvailableUrlNameByUserName(data.name);
    const hashedPassword = HashService.hash(data.password);
    const userFields = { ...data, password: hashedPassword, urlName };

    const user = await super.create(userFields);
    const filteredUser = filterObjectFields(user.toObject(), AllPublicFields);

    await EventEmitter.emit(EventEmitter.eventTypes.userCreated, {
      user: filteredUser,
    });

    return filteredUser;
  }

  findByEmail(email, additionalFields = {}) {
    return this.findBy({ email }).select(getSelectFields(additionalFields));
  }

  findById(userId, additionalFields = {}) {
    return super.findById(userId).select(getSelectFields(additionalFields));
  }

  findManyBy(searchFields, sortKey, additionalFields = {}) {
    const query = super
      .findManyBy(searchFields)
      .select(getSelectFields(additionalFields));

    return sortKey ? query.sort({ [sortKey]: 1 }) : query;
  }

  updatePassword(userId, password) {
    const hashedPassword = HashService.hash(password);
    return this.updateById(userId, { password: hashedPassword });
  }

  async _findAvailableUrlNameByUserName(userName) {
    const slugifiedUserName = SlugService.slugify(userName);
    const userWithBiggestUrlName = await this.findBy({
      urlName: { $regex: slugifiedUserName },
    })
      .select({ urlName: 1 })
      .sort({ urlName: -1 });

    if (!userWithBiggestUrlName) {
      return slugifiedUserName;
    }

    const urlNumber =
      Number(
        userWithBiggestUrlName.urlName.split(SlugService.separator).reverse()[0]
      ) || 0;

    return `${slugifiedUserName}${SlugService.separator}${urlNumber + 1}`;
  }
}

export default new UserModelService(UserModel);