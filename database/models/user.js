const mongoose = require("mongoose");
const Counters = require("./counter");

const UserSchema = mongoose.Schema(
  {
    id: Number,
    first_name: {
      type: String,
      required: true,
    },
    last_name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    location: {
      type: String,
      required: true,
    },
    birthdate: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: {
      createdAt: "created_at",
      updatedAt: "updated_at",
    },
  }
);

UserSchema.pre("save", function (next) {
  Counters(this, "User", next);
});

const User = (module.exports = mongoose.model("User", UserSchema));
