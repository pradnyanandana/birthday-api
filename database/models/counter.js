const mongoose = require("mongoose");

const CounterSchema = mongoose.Schema({
  _id: { type: String, required: true },
  seq: { type: Number, default: 0 },
});

const counter = mongoose.model("Counters", CounterSchema);

const autoIncrementModelID = async (doc, modelName, next) => {
  try {
    const newCounter = await counter.findByIdAndUpdate(
      modelName,
      { $inc: { seq: 1 } },
      { new: true, upsert: true }
    );

    doc.id = newCounter.seq;
    next();
  } catch (error) {
    return next(error);
  }
};

const preSave = (doc, modelName, next) => {
  if (!doc.isNew) {
    next();
    return;
  }

  autoIncrementModelID(doc, modelName, next);
};

const Counters = (module.exports = preSave);
