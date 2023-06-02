const mongoose = require("mongoose");

const CounterSchema = mongoose.Schema({
  _id: { type: String, required: true },
  seq: { type: Number, default: 0 },
});

const counter = mongoose.model("Counters", CounterSchema);

const autoIncrementModelID = function (doc, modelName, next) {
  counter.findByIdAndUpdate(
    modelName,
    { $inc: { seq: 1 } },
    { new: true, upsert: true },
    function (error, counter) {
      if (error) return next(error);
      doc.id = counter.seq;
      next();
    }
  );
};

const preSave = function (doc, modelName, next) {
  if (!doc.isNew) {
    next();
    return;
  }

  autoIncrementModelID(doc, modelName, next);
};

const Counters = (module.exports = preSave);
