const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },

    userId: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    verified: {
      type: Boolean,
    },
  },
  { timestamp: true }
);

userSchema.pre("save", async function (next) {
  try {
    // const salt = await bcrypt.genSalt(10)
    const hash = await bcrypt.hash(this.password, 12);
    this.password = hash;
    next();
  } catch (error) {
    next(error);
  }
});

const Users = mongoose.model("users", userSchema);

module.exports = Users;
