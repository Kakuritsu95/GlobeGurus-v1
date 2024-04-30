const mongoose = require("mongoose");
const { Schema, model } = mongoose;
const bcrypt = require("bcrypt");

const userSchema = Schema(
  {
    email: { type: String, required: true },
    username: { type: String, required: true },
    password: { type: String, required: true },
    avatarUrl: {
      type: String,
      default:
        "https://cdn.pixabay.com/photo/2020/07/01/12/58/icon-5359553_640.png",
    },
    bookmarks: [{ type: Schema.Types.ObjectId }],
  },
  { timeStamps: true }
);

userSchema.pre("save", function (next) {
  if (!this.isNew) return next();
  const hashedPassword = bcrypt.hashSync(this.password, 10);
  if (!hashedPassword) throw new Error("Could not create user");
  this.password = hashedPassword;
  next();
});

module.exports = model("User", userSchema);
