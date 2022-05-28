export default class GenericQueries {
  constructor(dao, model) {
    this.dao = dao;
    this.model = model;
  }

  getAll = async (options) => {
    return this.dao.getAll(options, this.model);
  };

  getOne = async (options) => {
    return this.dao.getOne(options, this.model);
  };

  getOneById = async (id) => {
    return this.dao.getOne({ _id: id }, this.model);
  };

  createOne = async (obj) => {
    return this.dao.createOne(obj, this.model);
  };

  updateOneById = async (id, obj) => {
    return this.dao.updateOneById(id, obj, this.model);
  };

  deleteOneById = async (id) => {
    return this.dao.deleteOneById(id, this.model);
  };
}
