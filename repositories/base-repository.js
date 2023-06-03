class BaseRepository {
  constructor(model) {
    this.model = model;
  }

  async store(data) {
    const model = new this.model(data);
    return await model.save();
  }

  async find() {
    let data = null;

    try {
      data = await this.model.find();
    } catch (err) {
      console.log(err);
    }

    return data;
  }

  async findById(id) {
    let data = null;

    try {
      data = await this.model.findOne({ id });
    } catch (err) {
      console.log(err);
    }

    return data;
  }

  async findByKey(key, value) {
    let data = null;

    try {
      data = await this.model.find({ [key]: value });
    } catch (err) {
      console.log(err);
    }

    return data;
  }

  async findOneBy(key, value) {
    let data = null;

    try {
      data = await this.model.findOne({ [key]: value });
    } catch (err) {
      console.log(err);
    }

    return data;
  }

  async update(id, update) {
    let data = null;

    try {
      await this.model.findOneAndUpdate({ id }, update);
      data = await this.model.findOne({ id });
    } catch (err) {
      console.log(err);
    }

    return data;
  }

  async delete(id) {
    let data = null;

    try {
      data = await this.model.deleteOne({ id });
    } catch (err) {
      console.log(err);
    }

    return data;
  }
}

module.exports = BaseRepository;
